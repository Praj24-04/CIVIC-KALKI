/**
 * A1b/A1c — civic assistant settings come from metadata an admin can edit:
 * set in the No-Code Builder when a module is created, and changed later on an
 * existing module. Real database; the AI is off (rules only).
 */

const request = require('supertest');
const app = require('../index');
const prisma = require('../db');
const { createTestUser, cleanupAll } = require('./helpers/authHelper');
const { continueFormFilling, clearSession, _sessions } = require('../services/agentFormFiller');

describe('Civic assistant settings', () => {
  let admin, citizen, citizenUser;
  const deployed = [];
  let seq = 0;
  const sid = () => `settings-test-${Date.now()}-${seq += 1}`;

  async function removeModule(typeId) {
    const ids = (await prisma.entity.findMany({ where: { entity_type_id: typeId }, select: { entity_id: true } })).map((e) => e.entity_id);
    await prisma.parameterValue.deleteMany({ where: { entity_id: { in: ids } } });
    await prisma.approvalHistory.deleteMany({ where: { entity_id: { in: ids } } });
    await prisma.auditLog.deleteMany({ where: { entity_id: { in: ids } } });
    await prisma.fileRepository.deleteMany({ where: { entity_id: { in: ids } } });
    await prisma.entity.deleteMany({ where: { entity_type_id: typeId } });
    await prisma.reportMaster.deleteMany({ where: { entity_type_id: typeId } });
    await prisma.workflowMaster.deleteMany({ where: { entity_type_id: typeId } });
    await prisma.dashboardMaster.deleteMany({ where: { entity_type_id: typeId } });
    await prisma.entityRelationshipRule.deleteMany({ where: { source_entity_type_id: typeId } });
    for (const f of await prisma.formMaster.findMany({ where: { entity_type_id: typeId } })) {
      for (const s of await prisma.sectionMaster.findMany({ where: { form_id: f.form_id } })) {
        for (const sub of await prisma.subsectionMaster.findMany({ where: { section_id: s.section_id } })) {
          await prisma.parameterMaster.deleteMany({ where: { subsection_id: sub.subsection_id } });
        }
        await prisma.subsectionMaster.deleteMany({ where: { section_id: s.section_id } });
      }
      await prisma.sectionMaster.deleteMany({ where: { form_id: f.form_id } });
    }
    await prisma.formMaster.deleteMany({ where: { entity_type_id: typeId } });
    await prisma.entityType.delete({ where: { entity_type_id: typeId } });
  }

  const deploy = (payload) => request(app).post('/module-builder/deploy').set(admin.headers).send(payload);
  const modulePayload = (name, overrides = {}) => ({
    module: { name, description: 'Report a stray dog that is aggressive, injured or needs help' },
    form: {
      name: `${name} Form`,
      sections: [{
        name: 'Details',
        parameters: [
          { label: 'What Happened', field_type: 'textarea', mandatory: true, chat: { role: 'description' } },
          { label: 'Behaviour', field_type: 'select', mandatory: true, options: ['Calm', 'Scared', 'Aggressive'], chat: { role: 'severity', question: 'How is the dog behaving: Calm, Scared or Aggressive?' } },
          { label: 'Dog Count', field_type: 'number', mandatory: false, chat: { ask: true, question: 'How many dogs are there?' } },
          { label: 'Snapshot', field_type: 'file', mandatory: false, chat: { role: 'photo' } },
        ],
      }],
    },
    assistant: { ask_area: false, ask_spot: true, ask_photo: false },
    ...overrides,
  });

  beforeAll(async () => {
    admin = await createTestUser({ role: 'admin' });
    citizen = await createTestUser({ role: 'citizen' });
    citizenUser = { user_id: citizen.user.user_id, role: 'citizen', name: citizen.user.name };
  });

  afterAll(async () => {
    for (const [key] of _sessions) if (key.startsWith('settings-test-')) clearSession(key);
    for (const id of deployed) await removeModule(id);
    await cleanupAll();
    await prisma.$disconnect();
  });

  describe('editing an existing module (A1c)', () => {
    let typeId;
    let params;
    beforeAll(async () => {
      const res = await deploy(modulePayload(`Stray Dog Edit ${Date.now()}`));
      typeId = res.body.data.entityType.entity_type_id;
      deployed.push(typeId);
    });
    const get = (headers = admin.headers) => request(app).get(`/forms/assistant/${typeId}`).set(headers);
    const put = (body, headers = admin.headers) => request(app).put(`/forms/assistant/${typeId}`).set(headers).send(body);

    test('shows each field\'s chat settings and the module switches', async () => {
      const res = await get();
      expect(res.status).toBe(200);
      params = res.body.data.fields;
      expect(res.body.data.asks).toEqual({ ask_area: false, ask_spot: true, ask_photo: false });
      expect(params.find((f) => f.label === 'Behaviour').chat).toEqual({ role: 'severity', question: 'How is the dog behaving: Calm, Scared or Aggressive?' });
    });

    test('a changed question is used by the assistant on the next conversation', async () => {
      const behaviour = params.find((f) => f.label === 'Behaviour');
      const res = await put({ fields: [{ parameter_id: behaviour.parameter_id, chat: { role: 'severity', question: 'Is the dog Calm, Scared or Aggressive right now?' } }] });
      expect(res.status).toBe(200);
      // The choices on the field are untouched.
      const stored = await prisma.parameterMaster.findUnique({ where: { parameter_id: behaviour.parameter_id } });
      expect(stored.options.choices).toEqual(['Calm', 'Scared', 'Aggressive']);

      const id = sid();
      await continueFormFilling(id, 'hello', citizenUser);
      const s = _sessions.get(id);
      s.phase = 'choosing'; s.choices = [typeId]; s.said = ['A dog is barking at children and chasing bikes on our street'];
      const r = await continueFormFilling(id, 'yes', citizenUser);
      expect(r.text).toMatch(/Is the dog Calm, Scared or Aggressive right now\?/);
    });

    test('module switches can be changed: turning the area on makes the assistant ask it', async () => {
      const res = await put({ asks: { ask_area: true, ask_spot: false, ask_photo: false } });
      expect(res.status).toBe(200);
      expect(res.body.data.asks).toEqual({ ask_area: true, ask_spot: false, ask_photo: false });
      const id = sid();
      await continueFormFilling(id, 'hello', citizenUser);
      const s = _sessions.get(id);
      s.phase = 'choosing'; s.choices = [typeId]; s.said = ['A dog is barking at children and chasing bikes on our street'];
      let r = await continueFormFilling(id, 'yes', citizenUser);
      r = await continueFormFilling(id, 'Aggressive', citizenUser);
      expect(_sessions.get(id).asked).toBe('__ward');
    });

    test('a bad change is refused and nothing is saved', async () => {
      const count = params.find((f) => f.label === 'Dog Count');
      const desc = params.find((f) => f.label === 'What Happened');
      const before = await prisma.parameterMaster.findUnique({ where: { parameter_id: count.parameter_id } });
      const res = await put({ fields: [
        { parameter_id: count.parameter_id, chat: { ask: true, question: 'Changed?' } },
        { parameter_id: count.parameter_id + 999999, chat: { ask: true } },
      ] });
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/not part of this module/);
      const dup = await put({ fields: [{ parameter_id: count.parameter_id, chat: { role: 'description' } }] });
      expect(dup.status).toBe(400); // a number field cannot be the description, and there is one already
      const after = await prisma.parameterMaster.findUnique({ where: { parameter_id: count.parameter_id } });
      expect(after.options).toEqual(before.options);
      expect((await prisma.parameterMaster.findUnique({ where: { parameter_id: desc.parameter_id } })).options).toEqual({ chat: { role: 'description' } });
    });

    test('only an admin or director can read or change the settings', async () => {
      expect((await get(citizen.headers)).status).toBe(403);
      expect((await put({ asks: { ask_area: false } }, citizen.headers)).status).toBe(403);
      expect((await request(app).get(`/forms/assistant/${typeId}`).set('X-Requested-With', 'ck-web')).status).toBe(401);
    });
  });

  describe('No-Code Builder (A1b)', () => {
    let typeId;

    test('a module deployed with chat settings stores them, and the assistant follows them', async () => {
      const name = `Stray Dog Help ${Date.now()}`;
      const res = await deploy(modulePayload(name));
      expect(res.status).toBe(201);
      typeId = res.body.data.entityType.entity_type_id;
      deployed.push(typeId);

      const params = await prisma.parameterMaster.findMany({ where: { subsectionMaster: { sectionMaster: { formMaster: { entity_type_id: typeId } } } } });
      const byLabel = Object.fromEntries(params.map((p) => [p.label, p.options]));
      expect(byLabel['What Happened']).toEqual({ chat: { role: 'description' } });
      expect(byLabel.Behaviour).toEqual({ choices: ['Calm', 'Scared', 'Aggressive'], chat: { role: 'severity', question: 'How is the dog behaving: Calm, Scared or Aggressive?' } });
      expect(byLabel['Dog Count']).toEqual({ chat: { ask: true, question: 'How many dogs are there?' } });
      const config = await prisma.dashboardMaster.findFirst({ where: { entity_type_id: typeId, widget_name: 'assistant_config' } });
      expect(JSON.parse(config.filter)).toEqual({ ask_area: false, ask_spot: true, ask_photo: false });

      // A citizen files one through the chat, with the module's own questions.
      const id = sid();
      await continueFormFilling(id, 'hello', citizenUser);
      const s = _sessions.get(id);
      s.phase = 'choosing'; s.choices = [typeId]; s.said = ['A dog is barking at children and chasing bikes on our street'];
      let r = await continueFormFilling(id, 'yes', citizenUser);
      const asked = [];
      const answers = { behaviour: 'Aggressive', __place: 'near the school gate', dog_count: '2' };
      for (let i = 0; i < 8 && r.type === 'question'; i += 1) {
        const key = _sessions.get(id).asked;
        asked.push([key, r.text]);
        r = await continueFormFilling(id, answers[key] || 'skip', citizenUser);
      }
      expect(asked.map((a) => a[0])).toEqual(['behaviour', '__place', 'dog_count']); // no area, no photo
      expect(asked[0][1]).toMatch(/How is the dog behaving: Calm, Scared or Aggressive\?/);
      expect(asked[2][1]).toMatch(/How many dogs are there\?/);
      expect(r.type).toBe('confirm');
      r = await continueFormFilling(id, 'yes', citizenUser);
      expect(r.type).toBe('submitted');
      const e = await prisma.entity.findUnique({ where: { entity_id: r.entity_id } });
      expect(e.area).toBeNull();
      expect(e.location).toBe('near the school gate');
    });

    test.each([
      ['a role that does not fit the field type', { label: 'Phone', field_type: 'text', chat: { role: 'photo' } }, /does not fit/],
      ['an unknown role', { label: 'X', field_type: 'text', chat: { role: 'boss' } }, /Unknown role/],
      ['a question that is too long', { label: 'Y', field_type: 'text', chat: { ask: true, question: 'q'.repeat(301) } }, /longer than 300/],
    ])('refuses %s, and creates nothing', async (_label, badField, message) => {
      const name = `Bad Module ${Date.now()}`;
      const payload = modulePayload(name);
      payload.form.sections[0].parameters.push(badField);
      const res = await deploy(payload);
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(message);
      expect(await prisma.entityType.findFirst({ where: { name } })).toBeNull();
    });

    test('refuses two fields with the same role', async () => {
      const name = `Two Descriptions ${Date.now()}`;
      const payload = modulePayload(name);
      payload.form.sections[0].parameters.push({ label: 'Another Text', field_type: 'textarea', chat: { role: 'description' } });
      const res = await deploy(payload);
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Only one field can have the role "description"/);
    });
  });
});
