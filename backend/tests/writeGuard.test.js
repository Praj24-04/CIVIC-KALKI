/**
 * Write guard — one rule for every route that changes a record's own data
 * (PUT /entities/:id, DELETE /entities/:id, /entities/:id/values, /files):
 *   - area scope: a coordinator writes only inside their scope (403 outside);
 *   - status lock: approved/rejected/deleted records are locked (409), and past
 *     draft only the actor whose workflow turn it is may write;
 *   - every allowed write leaves an audit row with old and new values;
 *   - delete is a workflow transition (audit + approval history).
 */

const request = require('supertest');
const app = require('../index');
const prisma = require('../db');
const { createTestUser, cleanupAll } = require('./helpers/authHelper');

const CSRF = { 'X-Requested-With': 'ck-web' };
const tag = `WG${Date.now()}`;
const WARD_A = `${tag} Ward A`;
const WARD_B = `${tag} Ward B`;

describe('Write guard — scope, status lock and audit on every entity write', () => {
  let owner, coordA, admin;
  let typeId, parameterId, parameterKey;

  const makeEntity = (data) => prisma.entity.create({
    data: { entity_type_id: typeId, owner_user_id: owner.user.user_id, name: `${tag} record`, status: 'draft', ...data },
  });
  const auditRows = (entityId) => prisma.auditLog.findMany({ where: { entity_id: entityId }, orderBy: { audit_id: 'asc' } });

  // The four writes, each as (agent headers, entity) => supertest request.
  const writes = {
    edit: (h, e) => request(app).put(`/entities/${e.entity_id}`).set(CSRF).set(h).send({ name: `${tag} renamed` }),
    delete: (h, e) => request(app).delete(`/entities/${e.entity_id}`).set(CSRF).set(h),
    values: (h, e) => request(app).put(`/entities/${e.entity_id}/values`).set(CSRF).set(h)
      .send({ values: [{ parameter_id: parameterId, value: `${tag} value` }] }),
    attach: (h, e) => request(app).post('/files/upload').set(CSRF).set(h)
      .field('entity_id', String(e.entity_id))
      .field('parameter_id', String(parameterId))
      .attach('files', Buffer.from('hello'), { filename: 'wg.txt', contentType: 'text/plain' }),
  };

  beforeAll(async () => {
    owner = await createTestUser({ role: 'citizen' });
    coordA = await createTestUser({ role: 'coordinator_area', assignedArea: WARD_A });
    admin = await createTestUser({ role: 'admin' });

    const movement = await prisma.entityType.findFirst({ where: { name: 'Movement' } });
    typeId = movement.entity_type_id;
    const form = await prisma.formMaster.findFirst({
      where: { entity_type_id: typeId },
      include: { sections: { include: { subsections: { include: { parameters: true } } } } },
    });
    const param = form.sections.flatMap((s) => s.subsections).flatMap((s) => s.parameters)
      .find((p) => !['file', 'location'].includes(String(p.field_type || '').toLowerCase()) && !p.mandatory);
    parameterId = param.parameter_id;
    parameterKey = param.field_key;
  });

  afterAll(async () => {
    const files = await prisma.fileRepository.findMany({ where: { file_name: 'wg.txt' }, select: { path: true } });
    const fs = require('fs');
    const path = require('path');
    for (const f of files) {
      const p = path.join(__dirname, '..', 'uploads', f.path);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
    await cleanupAll();
    await prisma.$disconnect();
  });

  describe('cross-ward writes are rejected, and change nothing', () => {
    test.each(Object.keys(writes))('%s by a ward A coordinator on a ward B record → 403', async (kind) => {
      const entity = await makeEntity({ area: WARD_B, status: 'submitted' });
      const res = await writes[kind](coordA.headers, entity);
      expect(res.status).toBe(403);

      const after = await prisma.entity.findUnique({ where: { entity_id: entity.entity_id } });
      expect(after.name).toBe(entity.name);
      expect(after.status).toBe('submitted');
      expect(await prisma.parameterValue.count({ where: { entity_id: entity.entity_id } })).toBe(0);
      expect(await prisma.fileRepository.count({ where: { entity_id: entity.entity_id } })).toBe(0);
      expect(await auditRows(entity.entity_id)).toHaveLength(0);
    });
  });

  describe('status lock', () => {
    test.each(Object.keys(writes))('%s after approval → 409, for the owner and for an admin', async (kind) => {
      const entity = await makeEntity({ area: WARD_A, status: 'approved' });
      for (const who of [owner, admin]) {
        const res = await writes[kind](who.headers, entity);
        expect(res.status).toBe(409);
      }
      const after = await prisma.entity.findUnique({ where: { entity_id: entity.entity_id } });
      expect(after.name).toBe(entity.name);
      expect(after.status).toBe('approved');
      expect(await auditRows(entity.entity_id)).toHaveLength(0);
    });

    test('the owner cannot edit once submitted (not their turn) → 409', async () => {
      const entity = await makeEntity({ area: WARD_A, status: 'submitted' });
      const res = await writes.edit(owner.headers, entity);
      expect(res.status).toBe(409);
    });

    test('a stranger to the record gets 403 even on a locked record (no status leak)', async () => {
      const stranger = await createTestUser({ role: 'citizen' });
      const entity = await makeEntity({ area: WARD_A, status: 'approved' });
      expect((await writes.edit(stranger.headers, entity)).status).toBe(403);
    });
  });

  describe('every allowed write creates an audit row with old and new values', () => {
    test('edit by the owner of a draft', async () => {
      const entity = await makeEntity({ area: WARD_A });
      const res = await writes.edit(owner.headers, entity);
      expect(res.status).toBe(200);
      const rows = await auditRows(entity.entity_id);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({ action: 'entity_updated', actor_user_id: owner.user.user_id });
      expect(rows[0].changes).toEqual({ name: { old: `${tag} record`, new: `${tag} renamed` } });
    });

    test('edit by the in-ward coordinator while it is their turn (submitted)', async () => {
      const entity = await makeEntity({ area: WARD_A, status: 'submitted' });
      const res = await writes.edit(coordA.headers, entity);
      expect(res.status).toBe(200);
      const rows = await auditRows(entity.entity_id);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({ action: 'entity_updated', actor_user_id: coordA.user.user_id });
    });

    test('values: first write records old = null, the next records the previous value', async () => {
      const entity = await makeEntity({ area: WARD_A });
      expect((await writes.values(owner.headers, entity)).status).toBe(200);
      const second = await request(app).put(`/entities/${entity.entity_id}/values`).set(CSRF).set(owner.headers)
        .send({ values: [{ parameter_id: parameterId, value: `${tag} second` }] });
      expect(second.status).toBe(200);

      const rows = await auditRows(entity.entity_id);
      expect(rows.map((r) => r.action)).toEqual(['values_updated', 'values_updated']);
      expect(rows[0].changes[parameterKey]).toMatchObject({ old: null, new: `${tag} value` });
      expect(rows[1].changes[parameterKey]).toMatchObject({ old: `${tag} value`, new: `${tag} second` });
    });

    test('file attach, then file removal', async () => {
      const entity = await makeEntity({ area: WARD_A });
      const up = await writes.attach(owner.headers, entity);
      expect(up.status).toBe(201);
      const fileId = up.body.data[0].file_id;

      const del = await request(app).delete(`/files/${fileId}`).set(CSRF).set(owner.headers);
      expect(del.status).toBe(200);

      const rows = await auditRows(entity.entity_id);
      expect(rows.map((r) => r.action)).toEqual(['file_attached', 'file_removed']);
      expect(rows[0].changes.files.new).toEqual([{ file_id: fileId, file_name: 'wg.txt' }]);
      expect(rows[1].changes.files.old).toMatchObject({ file_id: fileId, file_name: 'wg.txt' });
    });

    test('delete is a workflow transition: status, audit row and approval history', async () => {
      const entity = await makeEntity({ area: WARD_A });
      const res = await request(app).delete(`/entities/${entity.entity_id}`).set(CSRF).set(owner.headers)
        .send({ reason: 'filed twice' });
      expect(res.status).toBe(200);

      const after = await prisma.entity.findUnique({ where: { entity_id: entity.entity_id } });
      expect(after.status).toBe('deleted');
      const rows = await auditRows(entity.entity_id);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({ action: 'status_transition', old_status: 'draft', new_status: 'deleted', reason: 'filed twice' });
      const history = await prisma.approvalHistory.findMany({ where: { entity_id: entity.entity_id } });
      expect(history).toHaveLength(1);
      expect(history[0]).toMatchObject({ from_status: 'draft', to_status: 'deleted' });

      // Repeating it is harmless and writes nothing more
      expect((await writes.delete(owner.headers, entity)).status).toBe(200);
      expect(await auditRows(entity.entity_id)).toHaveLength(1);
    });
  });
});
