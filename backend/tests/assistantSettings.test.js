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
