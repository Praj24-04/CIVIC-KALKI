/**
 * npm run assistant:upgrade — brings an older database's assistant settings up to
 * date without deleting anything. Real database.
 */

const prisma = require('../db');
const { upgrade } = require('../scripts/upgradeAssistant');
const { createTestUser, trackEntityId, cleanupAll } = require('./helpers/authHelper');

describe('assistant settings upgrade', () => {
  afterAll(async () => {
    await upgrade({ log: () => {} }); // leave the database fully upgraded
    await cleanupAll();
    await prisma.$disconnect();
  });

  test('an older database is brought up to date, and no record loses an answer', async () => {
    const grievance = await prisma.entityType.findFirst({ where: { name: 'Grievance' } });
    const params = await prisma.parameterMaster.findMany({ where: { subsectionMaster: { sectionMaster: { formMaster: { entity_type_id: grievance.entity_type_id } } } } });
    const byKey = Object.fromEntries(params.map((p) => [p.field_key, p]));

    // A record with answers, as an existing database would have.
    const citizen = await createTestUser({ role: 'citizen' });
    const record = await prisma.entity.create({ data: { entity_type_id: grievance.entity_type_id, owner_user_id: citizen.user.user_id, name: 'Old record', status: 'submitted' } });
    trackEntityId(record.entity_id);
    await prisma.parameterValue.create({ data: { entity_id: record.entity_id, parameter_id: byKey.severity.parameter_id, value: 'Severe' } });

    // Make it look like a database from before the assistant settings existed.
    for (const p of params) {
      if (p.options && p.options.chat) {
        const { chat, ...rest } = p.options;
        await prisma.parameterMaster.update({ where: { parameter_id: p.parameter_id }, data: { options: Object.keys(rest).length ? rest : null } });
      }
    }
    await prisma.parameterValue.deleteMany({ where: { parameter_id: byKey.affected_scope.parameter_id } });
    await prisma.parameterMaster.delete({ where: { parameter_id: byKey.affected_scope.parameter_id } });
    await prisma.dashboardMaster.deleteMany({ where: { entity_type_id: grievance.entity_type_id, widget_name: 'assistant_config' } });
    await prisma.entityType.update({ where: { entity_type_id: grievance.entity_type_id }, data: { description: 'Automatically created or submitted grievance issue' } });

    // An admin had already customised one field on the Modules page: kept.
    await prisma.parameterMaster.update({
      where: { parameter_id: byKey.category.parameter_id },
      data: { options: { choices: byKey.category.options.choices, chat: { question: 'Admin wording: what kind of problem?' } } },
    });

    const first = await upgrade({ log: () => {} });
    expect(first.descriptions).toBeGreaterThanOrEqual(1);
    expect(first.fieldsAdded).toBe(1);
    expect(first.chatSettings).toBeGreaterThanOrEqual(4);
    expect(first.configRows).toBeGreaterThanOrEqual(1);

    const after = await prisma.parameterMaster.findMany({ where: { subsectionMaster: { sectionMaster: { formMaster: { entity_type_id: grievance.entity_type_id } } } } });
    const afterByKey = Object.fromEntries(after.map((p) => [p.field_key, p]));
    expect(afterByKey.affected_scope.options.chat).toMatchObject({ ask: true });
    expect(afterByKey.severity.options).toMatchObject({ choices: ['Minor', 'Moderate', 'Severe', 'Critical'], chat: { role: 'severity' } });
    expect(afterByKey.category.options.chat.question).toBe('Admin wording: what kind of problem?');
    expect((await prisma.entityType.findUnique({ where: { entity_type_id: grievance.entity_type_id } })).description).toMatch(/^Report a problem that needs fixing/);
    expect(await prisma.dashboardMaster.count({ where: { entity_type_id: grievance.entity_type_id, widget_name: 'assistant_config' } })).toBe(1);

    // The old record still has its answer.
    const kept = await prisma.parameterValue.findMany({ where: { entity_id: record.entity_id } });
    expect(kept.map((v) => v.value)).toEqual(['Severe']);

    // A second run changes nothing.
    expect(await upgrade({ log: () => {} })).toEqual({ descriptions: 0, chatSettings: 0, fieldsAdded: 0, configRows: 0 });

    // Put the admin-edited wording back to the seed's, for the other test files.
    await prisma.parameterMaster.update({ where: { parameter_id: afterByKey.category.parameter_id }, data: { options: { choices: byKey.category.options.choices, chat: byKey.category.options.chat } } });
  });
});
