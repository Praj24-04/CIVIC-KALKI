/**
 * N1 — in-app notifications as a derived feed (no stored notifications).
 * The citizen sees each status change; coordinator and director see records
 * entering their queue; NotificationRule metadata overrides the default recipients.
 */

const request = require('supertest');
const app = require('../index');
const prisma = require('../db');
const { createTestUser, cleanupAll } = require('./helpers/authHelper');

describe('N1 — notification feed', () => {
  const AREA = `NotifArea-${Date.now()}`;
  let citizen, coordinator, otherCoordinator, director, admin;
  let movementType, entityId;
  let templateId = null;
  const ruleIds = [];

  const feedFor = async (who) => {
    const res = await request(app).get('/entities/notifications?limit=100').set(who.headers);
    expect(res.status).toBe(200);
    return res.body.data.filter((n) => n.entity_id === entityId || n.message.includes('Notif Movement'));
  };
  const transition = (who, to_status) =>
    request(app).post(`/entities/${entityId}/transition`).set(who.headers).send({ to_status });

  beforeAll(async () => {
    citizen = await createTestUser({ role: 'citizen' });
    coordinator = await createTestUser({ role: 'coordinator_area', assignedArea: AREA });
    otherCoordinator = await createTestUser({ role: 'coordinator_area', assignedArea: `${AREA}-other` });
    director = await createTestUser({ role: 'director' });
    admin = await createTestUser({ role: 'admin' });
    movementType = await prisma.entityType.findFirst({ where: { name: 'Movement' } });
  });

  afterAll(async () => {
    if (ruleIds.length) await prisma.notificationRule.deleteMany({ where: { notification_id: { in: ruleIds } } });
    if (templateId) await prisma.emailTemplate.delete({ where: { template_id: templateId } });
    await cleanupAll();
    await prisma.$disconnect();
  });

  test('requires login', async () => {
    const res = await request(app).get('/entities/notifications');
    expect(res.status).toBe(401);
  });

  test('a submitted record enters the area coordinator queue, and nobody else is told', async () => {
    const create = await request(app).post('/entities').set(citizen.headers)
      .send({ entity_type_id: movementType.entity_type_id, name: 'Notif Movement', area: AREA, status: 'submitted' });
    expect(create.status).toBe(201);
    expect(create.body.data.status).toBe('submitted');
    entityId = create.body.data.entity_id;

    const coord = await feedFor(coordinator);
    expect(coord).toHaveLength(1);
    expect(coord[0]).toMatchObject({ kind: 'queue', entity_id: entityId, to_status: 'submitted', area: AREA });
    expect(coord[0].message).toMatch(/waiting for your review/);

    expect(await feedFor(otherCoordinator)).toHaveLength(0); // different area
    expect(await feedFor(director)).toHaveLength(0);         // not their stage yet
    expect(await feedFor(citizen)).toHaveLength(0);          // own action
  });

  test('coordinator approval: the citizen sees the change, the director gets it in their queue', async () => {
    expect((await transition(coordinator, 'coordinator_approved')).status).toBe(200);

    const mine = await feedFor(citizen);
    expect(mine).toHaveLength(1);
    expect(mine[0]).toMatchObject({ kind: 'status', from_status: 'submitted', to_status: 'coordinator_approved' });
    expect(mine[0].actor).toBe(coordinator.user.name);

    const dir = await feedFor(director);
    expect(dir).toHaveLength(1);
    expect(dir[0]).toMatchObject({ kind: 'queue', to_status: 'coordinator_approved' });

    // The coordinator is not notified of their own action, and the record has left
    // their queue, so the earlier "waiting for your review" entry is gone.
    expect(await feedFor(coordinator)).toHaveLength(0);
  });

  test('director approval: the citizen sees the approval and the linked record the rule created', async () => {
    const res = await transition(director, 'approved');
    expect(res.status).toBe(200);
    expect(res.body.ruleResult.rulesFired).toBeGreaterThan(0);

    // The director acted on it, so it is no longer waiting; they only see the linked record.
    expect((await feedFor(director)).map((n) => n.kind)).toEqual(Array(res.body.ruleResult.rulesFired).fill('linked'));

    const mine = await feedFor(citizen);
    const statuses = mine.filter((n) => n.kind === 'status').map((n) => n.to_status);
    expect(statuses).toEqual(['approved', 'coordinator_approved']); // newest first, every change
    const linked = mine.filter((n) => n.kind === 'linked');
    expect(linked.length).toBe(res.body.ruleResult.rulesFired);
    expect(linked[0].message).toContain('created automatically from "Notif Movement"');

    // Feed items carry no email addresses.
    expect(JSON.stringify(mine)).not.toMatch(/@/);
  });

  test('NotificationRule metadata overrides the default recipients', async () => {
    // Tell only admins (not the owner, not the next approver) about submitted → coordinator_approved.
    const template = await prisma.emailTemplate.create({ data: { template_name: 'Notif test template' } });
    templateId = template.template_id;
    const transitions = await prisma.workflowMaster.findMany({
      where: { entity_type_id: movementType.entity_type_id, trigger: 'submitted', action: 'coordinator_approved' },
    });
    for (const wf of transitions) {
      const rule = await prisma.notificationRule.create({
        data: { workflow_id: wf.workflow_id, template_id: templateId, event_name: 'coordinator_approved', notify_role: 'admin' },
      });
      ruleIds.push(rule.notification_id);
    }

    const forChange = (items) => items.filter((n) => n.to_status === 'coordinator_approved');
    expect(forChange(await feedFor(admin))).toHaveLength(1);
    expect(forChange(await feedFor(director))).toHaveLength(0);
    expect(forChange(await feedFor(citizen))).toHaveLength(0);

    // Other transitions are unaffected.
    expect((await feedFor(citizen)).some((n) => n.to_status === 'approved')).toBe(true);
  });
});
