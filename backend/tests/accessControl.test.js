/**
 * S1 — every write requires a signed-in caller with the right role or ownership.
 * S2 — anonymous visitors read approved records only, and never see an email.
 *
 * Anonymous callers get 401, signed-in callers without the role or ownership
 * get 403, and a client-supplied status cannot skip the approval workflow.
 */

const request = require('supertest');
const app = require('../index');
const prisma = require('../db');
const { createTestUser, cleanupAll } = require('./helpers/authHelper');

const CSRF = { 'X-Requested-With': 'ck-web' };

describe('S1 and S2 — access control', () => {
  let owner, otherCitizen, admin;
  let movementType, parameterId, subsectionId, sectionId, formId;
  let ownedEntity, unownedEntity;
  const createdEntityTypeIds = [];
  const createdRuleIds = [];

  beforeAll(async () => {
    owner = await createTestUser({ role: 'citizen' });
    otherCitizen = await createTestUser({ role: 'citizen' });
    admin = await createTestUser({ role: 'admin' });

    movementType = await prisma.entityType.findFirst({ where: { name: 'Movement' } });
    const form = await prisma.formMaster.findFirst({
      where: { entity_type_id: movementType.entity_type_id },
      include: { sections: { include: { subsections: { include: { parameters: true } } } } },
    });
    formId = form.form_id;
    sectionId = form.sections[0].section_id;
    subsectionId = form.sections[0].subsections[0].subsection_id;
    const textParam = form.sections
      .flatMap((s) => s.subsections)
      .flatMap((s) => s.parameters)
      .find((p) => !['file', 'location'].includes(String(p.field_type || '').toLowerCase()) && !p.mandatory)
      || form.sections[0].subsections[0].parameters[0];
    parameterId = textParam.parameter_id;

    ownedEntity = await prisma.entity.create({
      data: {
        entity_type_id: movementType.entity_type_id,
        owner_user_id: owner.user.user_id,
        name: 'Access Control Owned Entity',
        status: 'draft',
      },
    });
    unownedEntity = await prisma.entity.create({
      data: {
        entity_type_id: movementType.entity_type_id,
        owner_user_id: null,
        name: 'Access Control Unowned Entity',
        status: 'draft',
      },
    });
  });

  afterAll(async () => {
    if (createdRuleIds.length) {
      await prisma.entityRelationshipRule.deleteMany({ where: { rule_id: { in: createdRuleIds } } });
    }
    await prisma.parameterValue.deleteMany({
      where: { entity_id: { in: [ownedEntity.entity_id, unownedEntity.entity_id] } },
    });
    await cleanupAll();
    if (createdEntityTypeIds.length) {
      await prisma.entityType.deleteMany({ where: { entity_type_id: { in: createdEntityTypeIds } } });
    }
    await prisma.$disconnect();
  });

  // Each entry: [label, (agent) => request]. Bodies are valid, so the only
  // reason for a refusal is who is calling.
  const metadataMutations = () => [
    ['POST /entities/entity-types', (r) => r.post('/entities/entity-types').send({ name: `AC Type ${Date.now()}`, domain_id: movementType.domain_id })],
    ['POST /entities/rules', (r) => r.post('/entities/rules').send({
      source_entity_type_id: movementType.entity_type_id,
      target_entity_type_id: movementType.entity_type_id,
      event: 'ac_never_fired',
      auto_create: false,
    })],
    ['POST /forms', (r) => r.post('/forms').send({ entity_type_id: movementType.entity_type_id, form_name: 'AC Form' })],
    ['POST /forms/:formId/sections', (r) => r.post(`/forms/${formId}/sections`).send({ section_name: 'AC Section' })],
    ['POST /sections/:sectionId/subsections', (r) => r.post(`/sections/${sectionId}/subsections`).send({ subsection_name: 'AC Subsection' })],
    ['POST /subsections/:subsectionId/parameters', (r) => r.post(`/subsections/${subsectionId}/parameters`).send({
      category_id: 1, field_key: 'ac_field', label: 'AC Field', field_type: 'text',
    })],
  ];

  const entityDataMutations = (entityId) => [
    ['PUT /entities/:id', (r) => r.put(`/entities/${entityId}`).send({ name: 'AC Renamed' })],
    ['DELETE /entities/:id', (r) => r.delete(`/entities/${entityId}`)],
    ['POST /entities/:id/values', (r) => r.post(`/entities/${entityId}/values`).send({ values: [{ parameter_id: parameterId, value: 'x' }] })],
    ['PUT /entities/:id/values', (r) => r.put(`/entities/${entityId}/values`).send({ values: [{ parameter_id: parameterId, value: 'x' }] })],
    ['POST /files/upload', (r) => r.post('/files/upload')
      .field('entity_id', String(entityId))
      .field('parameter_id', String(parameterId))
      .attach('files', Buffer.from('hello'), { filename: 'ac.txt', contentType: 'text/plain' })],
  ];

  describe('anonymous callers get 401', () => {
    test('metadata mutations', async () => {
      for (const [label, call] of metadataMutations()) {
        const res = await call(request(app)).set(CSRF);
        expect([label, res.status]).toEqual([label, 401]);
      }
    });

    test('entity create, update, delete, values and files', async () => {
      const create = await request(app).post('/entities').set(CSRF)
        .send({ entity_type_id: movementType.entity_type_id, name: 'AC Anonymous Entity' });
      expect(create.status).toBe(401);

      for (const [label, call] of entityDataMutations(ownedEntity.entity_id)) {
        const res = await call(request(app)).set(CSRF);
        expect([label, res.status]).toEqual([label, 401]);
      }
      const del = await request(app).delete('/files/1').set(CSRF);
      expect(del.status).toBe(401);
    });

    test('nothing was written', async () => {
      const entity = await prisma.entity.findUnique({ where: { entity_id: ownedEntity.entity_id } });
      expect(entity.name).toBe('Access Control Owned Entity');
      expect(await prisma.parameterValue.count({ where: { entity_id: ownedEntity.entity_id } })).toBe(0);
      expect(await prisma.fileRepository.count({ where: { entity_id: ownedEntity.entity_id } })).toBe(0);
      expect(await prisma.entity.count({ where: { name: 'AC Anonymous Entity' } })).toBe(0);
    });
  });

  describe('citizens get 403 where they have no role or ownership', () => {
    test('metadata mutations', async () => {
      for (const [label, call] of metadataMutations()) {
        const res = await call(request(app)).set(owner.headers);
        expect([label, res.status]).toEqual([label, 403]);
      }
      expect(await prisma.entityRelationshipRule.count({ where: { event: 'ac_never_fired' } })).toBe(0);
      expect(await prisma.parameterMaster.count({ where: { field_key: 'ac_field' } })).toBe(0);
    });

    test("another citizen's entity: update, delete, values, files", async () => {
      for (const [label, call] of entityDataMutations(ownedEntity.entity_id)) {
        const res = await call(request(app)).set(otherCitizen.headers);
        expect([label, res.status]).toEqual([label, 403]);
      }
      const entity = await prisma.entity.findUnique({ where: { entity_id: ownedEntity.entity_id } });
      expect(entity.name).toBe('Access Control Owned Entity');
      expect(await prisma.parameterValue.count({ where: { entity_id: ownedEntity.entity_id } })).toBe(0);
      expect(await prisma.fileRepository.count({ where: { entity_id: ownedEntity.entity_id } })).toBe(0);
    });

    test('an entity with no owner: values', async () => {
      const res = await request(app)
        .post(`/entities/${unownedEntity.entity_id}/values`)
        .set(owner.headers)
        .send({ values: [{ parameter_id: parameterId, value: 'x' }] });
      expect(res.status).toBe(403);
    });
  });

  describe('allowed callers still succeed', () => {
    test('owner can write values on their own entity', async () => {
      const res = await request(app)
        .post(`/entities/${ownedEntity.entity_id}/values`)
        .set(owner.headers)
        .send({ values: [{ parameter_id: parameterId, value: 'owner value' }] });
      expect(res.status).toBe(201);
    });

    test('admin can write values on an entity with no owner', async () => {
      const res = await request(app)
        .post(`/entities/${unownedEntity.entity_id}/values`)
        .set(admin.headers)
        .send({ values: [{ parameter_id: parameterId, value: 'staff value' }] });
      expect(res.status).toBe(201);
    });

    test('admin can create an entity type and a rule', async () => {
      const type = await request(app).post('/entities/entity-types').set(admin.headers)
        .send({ name: `AC Admin Type ${Date.now()}`, domain_id: movementType.domain_id });
      expect(type.status).toBe(201);
      createdEntityTypeIds.push(type.body.data.entity_type_id);

      const rule = await request(app).post('/entities/rules').set(admin.headers).send({
        source_entity_type_id: type.body.data.entity_type_id,
        target_entity_type_id: movementType.entity_type_id,
        event: 'ac_admin_event',
        auto_create: false,
      });
      expect(rule.status).toBe(201);
      createdRuleIds.push(rule.body.data.rule_id);
    });
  });

  // ── S2: what anonymous visitors can read ──
  describe('S2 — anonymous reads', () => {
    let approvedEntity;

    // Collect every "email" key anywhere in a JSON body.
    const emailKeys = (value, path = '$') => {
      if (Array.isArray(value)) return value.flatMap((v, i) => emailKeys(v, `${path}[${i}]`));
      if (value && typeof value === 'object') {
        return Object.entries(value).flatMap(([k, v]) =>
          (k.toLowerCase().includes('email') ? [`${path}.${k}`] : []).concat(emailKeys(v, `${path}.${k}`))
        );
      }
      return [];
    };

    beforeAll(async () => {
      approvedEntity = await prisma.entity.create({
        data: {
          entity_type_id: movementType.entity_type_id,
          owner_user_id: owner.user.user_id,
          name: 'Access Control Approved Entity',
          status: 'approved',
        },
      });
    });

    test('GET /entities returns approved records only, with no email', async () => {
      for (const query of ['', '?status=draft', '?status=submitted', `?owner_user_id=${owner.user.user_id}`]) {
        const res = await request(app).get(`/entities${query}`);
        expect(res.status).toBe(200);
        expect(res.body.data.every((e) => String(e.status).toLowerCase() === 'approved')).toBe(true);
        expect(emailKeys(res.body)).toEqual([]);
      }
      const mine = await request(app).get(`/entities?owner_user_id=${owner.user.user_id}`);
      expect(mine.body.data.map((e) => e.entity_id)).toContain(approvedEntity.entity_id);
      expect(mine.body.data.map((e) => e.entity_id)).not.toContain(ownedEntity.entity_id);
    });

    test('GET /entities/:id for an approved record has no email', async () => {
      const res = await request(app).get(`/entities/${approvedEntity.entity_id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.owner.name).toBeDefined();
      expect(emailKeys(res.body)).toEqual([]);
    });

    test('GET /entities/:id for a record that is not approved answers 404, like a missing one', async () => {
      const draft = await request(app).get(`/entities/${ownedEntity.entity_id}`);
      const missing = await request(app).get('/entities/2147483000');
      expect(draft.status).toBe(404);
      expect(missing.status).toBe(404);
      expect(draft.body.data).toBeUndefined();
      expect(JSON.stringify(draft.body)).not.toContain('Access Control Owned Entity');

      const asOwner = await request(app).get(`/entities/${ownedEntity.entity_id}`).set(owner.headers);
      expect(asOwner.status).toBe(200);
    });

    test('audit and lineage require login', async () => {
      for (const path of ['audit', 'lineage']) {
        const anon = await request(app).get(`/entities/${approvedEntity.entity_id}/${path}`);
        expect([path, anon.status]).toEqual([path, 401]);
        const signedIn = await request(app).get(`/entities/${approvedEntity.entity_id}/${path}`).set(admin.headers);
        expect([path, signedIn.status]).toEqual([path, 200]);
      }
    });

    test('values and files: approved records only', async () => {
      for (const path of [
        (id) => `/entities/${id}/values`,
        (id) => `/files/entity/${id}`,
      ]) {
        const draft = await request(app).get(path(ownedEntity.entity_id));
        expect([path(0), draft.status]).toEqual([path(0), 401]);
        const approved = await request(app).get(path(approvedEntity.entity_id));
        expect([path(0), approved.status]).toEqual([path(0), 200]);
        expect(emailKeys(approved.body)).toEqual([]);
        const ownerRead = await request(app).get(path(ownedEntity.entity_id)).set(owner.headers);
        expect([path(0), ownerRead.status]).toEqual([path(0), 200]);
      }
    });

    test('other public read endpoints return no email', async () => {
      for (const path of ['/entities/entity-types', '/forms/metadata', '/jurisdictions', '/buzz', '/meme/feed',
        '/entities/nearby?lat=18.5&lng=73.8&radius_km=50']) {
        const res = await request(app).get(path);
        expect([path, res.status]).toEqual([path, 200]);
        expect([path, emailKeys(res.body)]).toEqual([path, []]);
      }
    });

    test('limit is capped at 100', async () => {
      const res = await request(app).get('/entities?limit=100000').set(admin.headers);
      expect(res.status).toBe(200);
      expect(res.body.pagination.limit).toBe(100);
      expect(res.body.data.length).toBeLessThanOrEqual(100);
    });

    test('email visibility for signed-in callers: staff and owner yes, other citizens no', async () => {
      const path = `/entities/${approvedEntity.entity_id}`;
      const asStaff = await request(app).get(path).set(admin.headers);
      expect(asStaff.body.data.owner.email).toBe(owner.user.email);
      const asOwner = await request(app).get(path).set(owner.headers);
      expect(asOwner.body.data.owner.email).toBe(owner.user.email);
      const asOther = await request(app).get(path).set(otherCitizen.headers);
      expect(asOther.status).toBe(200);
      expect(asOther.body.data.owner.email).toBeUndefined();
    });
  });

  // ── Bug 1: a signed-in citizen has no more access to another citizen's record than a visitor ──
  describe("another citizen's record", () => {
    let submitted, approved;

    beforeAll(async () => {
      const mk = (name, status) => prisma.entity.create({
        data: { entity_type_id: movementType.entity_type_id, owner_user_id: owner.user.user_id, name, status, area: 'Sector 5' },
      });
      submitted = await mk('Access Control Private Complaint', 'submitted');
      approved = await mk('Access Control Public Complaint', 'approved');
      await prisma.parameterValue.create({ data: { entity_id: submitted.entity_id, parameter_id: parameterId, value: 'private detail' } });
      for (const e of [submitted, approved]) {
        await prisma.auditLog.create({ data: { entity_id: e.entity_id, actor_user_id: admin.user.user_id, action: 'status_transition', user: admin.user.name, old_status: 'draft', new_status: e.status } });
      }
    });

    afterAll(async () => {
      await prisma.parameterValue.deleteMany({ where: { entity_id: submitted.entity_id } });
    });

    const paths = (id) => [`/entities/${id}`, `/entities/${id}/values`, `/entities/${id}/audit`, `/entities/${id}/lineage`, `/entities/${id}/workflow`, `/files/entity/${id}`];

    test('not approved: every read answers 404 and returns nothing about it', async () => {
      for (const path of paths(submitted.entity_id)) {
        const res = await request(app).get(path).set(otherCitizen.headers);
        expect([path, res.status]).toEqual([path, 404]);
        const body = JSON.stringify(res.body);
        expect(body).not.toContain('Access Control Private Complaint');
        expect(body).not.toContain('private detail');
        expect(body).not.toMatch(/@/);
      }
    });

    test('not approved: the owner and staff can still read everything', async () => {
      for (const who of [owner, admin]) {
        for (const path of paths(submitted.entity_id)) {
          const res = await request(app).get(path).set(who.headers);
          expect([path, res.status]).toEqual([path, 200]);
        }
      }
    });

    test('approved: the record is public, but its audit trail and lineage are not', async () => {
      const id = approved.entity_id;
      expect((await request(app).get(`/entities/${id}`).set(otherCitizen.headers)).status).toBe(200);
      for (const path of [`/entities/${id}/audit`, `/entities/${id}/lineage`]) {
        const res = await request(app).get(path).set(otherCitizen.headers);
        expect([path, res.status]).toEqual([path, 404]);
        expect(JSON.stringify(res.body)).not.toMatch(/@/);
      }
      expect((await request(app).get(`/entities/${id}/audit`).set(owner.headers)).status).toBe(200);
    });

    test("a citizen's own list never includes another citizen's records", async () => {
      const res = await request(app).get(`/entities?limit=100&owner_user_id=${owner.user.user_id}`).set(otherCitizen.headers);
      expect(res.status).toBe(200);
      expect(res.body.data.every((e) => e.owner_user_id === otherCitizen.user.user_id)).toBe(true);
    });
  });

  describe('client-supplied status on create', () => {
    const create = (headers, status) =>
      request(app).post('/entities').set(headers)
        .send({ entity_type_id: movementType.entity_type_id, name: `AC Status ${status}`, area: 'Sector 5', status });

    test.each(['approved', 'coordinator_approved', 'rejected', 'APPROVED'])(
      'citizen asking for "%s" gets a draft',
      async (status) => {
        const res = await create(owner.headers, status);
        expect(res.status).toBe(201);
        expect(res.body.data.status).toBe('draft');
        const row = await prisma.entity.findUnique({ where: { entity_id: res.body.data.entity_id } });
        expect(row.status).toBe('draft');
        expect(row.owner_user_id).toBe(owner.user.user_id);
      }
    );

    test('admin asking for "approved" also gets a draft', async () => {
      const res = await create(admin.headers, 'approved');
      expect(res.status).toBe(201);
      expect(res.body.data.status).toBe('draft');
    });

    test('citizen asking for "submitted" (allowed by the workflow) gets it', async () => {
      const res = await create(owner.headers, 'submitted');
      expect(res.status).toBe(201);
      expect(res.body.data.status).toBe('submitted');
    });
  });
});
