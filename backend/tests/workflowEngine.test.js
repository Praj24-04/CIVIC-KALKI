const request = require('supertest');
const app = require('../index');
const prisma = require('../db');
const { createTestUser, cleanupAll, trackEntityId } = require('./helpers/authHelper');

describe('Phase 1 — Metadata-Driven Workflow Engine Tests', () => {
  let citizenHeaders, coordinatorAreaHeaders, directorHeaders;
  let citizenUser, coordinatorAreaUser, directorUser;
  let movementEntityType;
  let customEntityType;

  beforeAll(async () => {
    // 1. Create ephemeral test users
    const cit = await createTestUser({ role: 'citizen' });
    citizenUser = cit.user;
    citizenHeaders = cit.headers;

    const coord = await createTestUser({ role: 'coordinator_area', assignedArea: 'Sector 5' });
    coordinatorAreaUser = coord.user;
    coordinatorAreaHeaders = coord.headers;

    const dir = await createTestUser({ role: 'director' });
    directorUser = dir.user;
    directorHeaders = dir.headers;

    // 2. Fetch Movement EntityType
    movementEntityType = await prisma.entityType.findFirst({ where: { name: 'Movement' } });

    // 3. Create a brand-new custom EntityType with custom non-standard workflow stages
    // Workflow: draft -> submitted -> verified -> approved
    customEntityType = await prisma.entityType.create({
      data: {
        domain_id: 1,
        name: `Park Renovation Request ${Date.now()}`,
        description: 'Custom metadata-driven module test',
      },
    });

    // Seed custom WorkflowMaster transitions for the custom EntityType
    await prisma.workflowMaster.createMany({
      data: [
        { entity_type_id: customEntityType.entity_type_id, trigger: 'draft', action: 'submitted', stage: 'citizen' },
        { entity_type_id: customEntityType.entity_type_id, trigger: 'submitted', action: 'verified', stage: 'coordinator_area' },
        { entity_type_id: customEntityType.entity_type_id, trigger: 'verified', action: 'approved', stage: 'director' },
      ],
    });
  });

  afterAll(async () => {
    // Clean up custom entity type and associated workflow rules
    if (customEntityType) {
      await prisma.workflowMaster.deleteMany({ where: { entity_type_id: customEntityType.entity_type_id } });
      await prisma.entity.deleteMany({ where: { entity_type_id: customEntityType.entity_type_id } });
      await prisma.entityType.delete({ where: { entity_type_id: customEntityType.entity_type_id } });
    }
    await cleanupAll();
    await prisma.$disconnect();
  });

  // ── Test 1: Valid metadata transition (draft -> submitted by citizen) ──
  test('Test 1: Valid metadata transition (draft -> submitted) succeeds for owner citizen', async () => {
    const entity = await prisma.entity.create({
      data: {
        entity_type_id: movementEntityType.entity_type_id,
        owner_user_id: citizenUser.user_id,
        name: 'Test Movement 1',
        status: 'draft',
      },
    });

    const res = await request(app)
      .post(`/entities/${entity.entity_id}/transition`)
      .set(citizenHeaders)
      .send({ to_status: 'submitted' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('submitted');

    // Clean up
    await prisma.approvalHistory.deleteMany({ where: { entity_id: entity.entity_id } });
    await prisma.auditLog.deleteMany({ where: { entity_id: entity.entity_id } });
    await prisma.entity.delete({ where: { entity_id: entity.entity_id } });
  });

  // ── Test 2: Invalid transition prohibited by metadata ──
  test('Test 2: Invalid transition (draft -> approved) fails via WorkflowMaster', async () => {
    const entity = await prisma.entity.create({
      data: {
        entity_type_id: movementEntityType.entity_type_id,
        owner_user_id: citizenUser.user_id,
        name: 'Test Movement 2',
        status: 'draft',
      },
    });

    const res = await request(app)
      .post(`/entities/${entity.entity_id}/transition`)
      .set(citizenHeaders)
      .send({ to_status: 'approved' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);

    // Clean up
    await prisma.approvalHistory.deleteMany({ where: { entity_id: entity.entity_id } });
    await prisma.auditLog.deleteMany({ where: { entity_id: entity.entity_id } });
    await prisma.entity.delete({ where: { entity_id: entity.entity_id } });
  });

  // ── Test 3: Unauthorized role transition fails ──
  test('Test 3: Citizen attempting director-only transition fails', async () => {
    const entity = await prisma.entity.create({
      data: {
        entity_type_id: movementEntityType.entity_type_id,
        owner_user_id: citizenUser.user_id,
        name: 'Test Movement 3',
        status: 'coordinator_approved',
      },
    });

    const res = await request(app)
      .post(`/entities/${entity.entity_id}/transition`)
      .set(citizenHeaders)
      .send({ to_status: 'approved' });

    expect(res.status).toBe(400);

    // Clean up
    await prisma.approvalHistory.deleteMany({ where: { entity_id: entity.entity_id } });
    await prisma.auditLog.deleteMany({ where: { entity_id: entity.entity_id } });
    await prisma.entity.delete({ where: { entity_id: entity.entity_id } });
  });

  // ── Test 4 & 18: Brand-new Custom Module Workflow (draft -> submitted -> verified -> approved) ──
  test('Test 4 & 18: Custom EntityType uses custom non-standard WorkflowMaster metadata', async () => {
    // Create custom entity
    const customEntity = await prisma.entity.create({
      data: {
        entity_type_id: customEntityType.entity_type_id,
        owner_user_id: citizenUser.user_id,
        name: 'Park Renovation Case #1',
        area: 'Sector 5',
        status: 'draft',
      },
    });

    // Step 1: Citizen submits (draft -> submitted)
    const step1 = await request(app)
      .post(`/entities/${customEntity.entity_id}/transition`)
      .set(citizenHeaders)
      .send({ to_status: 'submitted' });
    expect(step1.status).toBe(200);
    expect(step1.body.data.status).toBe('submitted');

    // Step 2: Coordinator verifies (submitted -> verified)
    const step2 = await request(app)
      .post(`/entities/${customEntity.entity_id}/transition`)
      .set(coordinatorAreaHeaders)
      .send({ to_status: 'verified' });
    expect(step2.status).toBe(200);
    expect(step2.body.data.status).toBe('verified');

    // Step 3: Director approves (verified -> approved)
    const step3 = await request(app)
      .post(`/entities/${customEntity.entity_id}/transition`)
      .set(directorHeaders)
      .send({ to_status: 'approved' });
    expect(step3.status).toBe(200);
    expect(step3.body.data.status).toBe('approved');

    // Clean up
    await prisma.approvalHistory.deleteMany({ where: { entity_id: customEntity.entity_id } });
    await prisma.auditLog.deleteMany({ where: { entity_id: customEntity.entity_id } });
    await prisma.entity.delete({ where: { entity_id: customEntity.entity_id } });
  });

  // ── Test 5: Approval history creation ──
  test('Test 5: Successful workflow transition creates ApprovalHistory record', async () => {
    const entity = await prisma.entity.create({
      data: {
        entity_type_id: movementEntityType.entity_type_id,
        owner_user_id: citizenUser.user_id,
        name: 'Approval History Test Entity',
        status: 'draft',
      },
    });

    await request(app)
      .post(`/entities/${entity.entity_id}/transition`)
      .set(citizenHeaders)
      .send({ to_status: 'submitted' });

    const history = await prisma.approvalHistory.findFirst({
      where: { entity_id: entity.entity_id },
    });

    expect(history).not.toBeNull();
    expect(history.from_status).toBe('draft');
    expect(history.to_status).toBe('submitted');

    // Clean up
    await prisma.approvalHistory.deleteMany({ where: { entity_id: entity.entity_id } });
    await prisma.auditLog.deleteMany({ where: { entity_id: entity.entity_id } });
    await prisma.entity.delete({ where: { entity_id: entity.entity_id } });
  });

  // ── Test 6: Audit log creation ──
  test('Test 6: Successful workflow transition creates AuditLog record', async () => {
    const entity = await prisma.entity.create({
      data: {
        entity_type_id: movementEntityType.entity_type_id,
        owner_user_id: citizenUser.user_id,
        name: 'Audit Log Test Entity',
        status: 'draft',
      },
    });

    await request(app)
      .post(`/entities/${entity.entity_id}/transition`)
      .set(citizenHeaders)
      .send({ to_status: 'submitted' });

    const audit = await prisma.auditLog.findFirst({
      where: { entity_id: entity.entity_id, action: 'status_transition' },
    });

    expect(audit).not.toBeNull();
    expect(audit.old_status).toBe('draft');
    expect(audit.new_status).toBe('submitted');

    // Clean up
    await prisma.approvalHistory.deleteMany({ where: { entity_id: entity.entity_id } });
    await prisma.auditLog.deleteMany({ where: { entity_id: entity.entity_id } });
    await prisma.entity.delete({ where: { entity_id: entity.entity_id } });
  });

  // ── Test 7: Rule Engine compatibility ──
  test('Test 7: Final approval triggers existing relationship rules', async () => {
    const entity = await prisma.entity.create({
      data: {
        entity_type_id: movementEntityType.entity_type_id,
        owner_user_id: citizenUser.user_id,
        name: 'Rule Trigger Test Movement',
        status: 'coordinator_approved',
      },
    });

    const res = await request(app)
      .post(`/entities/${entity.entity_id}/transition`)
      .set(directorHeaders)
      .send({ to_status: 'approved' });

    expect(res.status).toBe(200);
    expect(res.body.ruleResult).toBeDefined();

    // Clean up child entities created by rule engine
    const childEntities = await prisma.entity.findMany({
      where: { name: { contains: 'Rule Trigger Test Movement' } },
    });
    for (const child of childEntities) {
      if (child.entity_id !== entity.entity_id) {
        await prisma.parameterValue.deleteMany({ where: { entity_id: child.entity_id } });
        await prisma.approvalHistory.deleteMany({ where: { entity_id: child.entity_id } });
        await prisma.auditLog.deleteMany({ where: { entity_id: child.entity_id } });
        await prisma.entity.delete({ where: { entity_id: child.entity_id } });
      }
    }

    await prisma.approvalHistory.deleteMany({ where: { entity_id: entity.entity_id } });
    await prisma.auditLog.deleteMany({ where: { entity_id: entity.entity_id } });
    await prisma.entity.delete({ where: { entity_id: entity.entity_id } });
  });

  // ── Test 9 (B1): concurrent approvals are idempotent ──
  test('Test 9: 20 parallel approvals give exactly 1 success and 1 ApprovalHistory row', async () => {
    const entity = await prisma.entity.create({
      data: {
        entity_type_id: movementEntityType.entity_type_id,
        owner_user_id: citizenUser.user_id,
        name: 'Test Movement Concurrent Approval',
        area: 'Sector 5',
        status: 'submitted',
      },
    });

    const responses = await Promise.all(
      Array.from({ length: 20 }, () =>
        request(app)
          .post(`/entities/${entity.entity_id}/transition`)
          .set(coordinatorAreaHeaders)
          .send({ to_status: 'coordinator_approved' })
      )
    );

    const statuses = responses.map((r) => r.status);
    expect(statuses.filter((s) => s === 200)).toHaveLength(1);
    // Losers either lost the compare-and-set (409) or validated after the winner committed (400).
    expect(statuses.filter((s) => s === 409 || s === 400)).toHaveLength(19);
    expect(statuses.filter((s) => s === 409).length).toBeGreaterThan(0);

    const history = await prisma.approvalHistory.findMany({ where: { entity_id: entity.entity_id } });
    expect(history).toHaveLength(1);
    expect(history[0].from_status).toBe('submitted');
    expect(history[0].to_status).toBe('coordinator_approved');

    const audits = await prisma.auditLog.findMany({
      where: { entity_id: entity.entity_id, action: 'status_transition' },
    });
    expect(audits).toHaveLength(1);

    const after = await prisma.entity.findUnique({ where: { entity_id: entity.entity_id } });
    expect(after.status).toBe('coordinator_approved');
  });

  // ── Test 10 (B2): rule firing is idempotent ──
  test('Test 10: re-firing rules 10 times creates no extra entity', async () => {
    const entity = await prisma.entity.create({
      data: {
        entity_type_id: movementEntityType.entity_type_id,
        owner_user_id: citizenUser.user_id,
        name: 'Test Movement Idempotent Rules',
        area: 'Sector 5',
        status: 'coordinator_approved',
      },
    });

    const approve = await request(app)
      .post(`/entities/${entity.entity_id}/transition`)
      .set(directorHeaders)
      .send({ to_status: 'approved' });
    expect(approve.status).toBe(200);
    expect(approve.body.ruleResult.rulesFired).toBeGreaterThan(0);

    const childrenAfterApproval = await prisma.entity.findMany({
      where: { source_entity_id: entity.entity_id },
    });
    expect(childrenAfterApproval.length).toBe(approve.body.ruleResult.rulesFired);
    for (const child of childrenAfterApproval) {
      expect(child.source_rule_id).not.toBeNull();
    }

    // Re-fire: 5 one after another, then 5 at once.
    const refire = () =>
      request(app)
        .post(`/entities/${entity.entity_id}/fire-rules`)
        .set(directorHeaders)
        .send({ eventType: 'approved' });
    const responses = [];
    for (let i = 0; i < 5; i += 1) responses.push(await refire());
    responses.push(...(await Promise.all(Array.from({ length: 5 }, refire))));

    for (const res of responses) {
      expect(res.status).toBe(200);
      expect(res.body.data.rulesFired).toBe(0);
      expect(res.body.data.createdEntities).toHaveLength(0);
      expect(res.body.data.skippedExisting.length).toBe(childrenAfterApproval.length);
    }

    const childrenAfterRefire = await prisma.entity.findMany({
      where: { source_entity_id: entity.entity_id },
    });
    expect(childrenAfterRefire.map((c) => c.entity_id).sort()).toEqual(
      childrenAfterApproval.map((c) => c.entity_id).sort()
    );
    const sameName = await prisma.entity.count({
      where: { name: { startsWith: 'Test Movement Idempotent Rules - ' } },
    });
    expect(sameName).toBe(childrenAfterApproval.length);
  });

  // ── Test 12 (B2): concurrent first-time firing still creates one child per rule ──
  test('Test 12: 8 parallel first-time fire-rules calls create each child once', async () => {
    const ruleCount = await prisma.entityRelationshipRule.count({
      where: { source_entity_type_id: movementEntityType.entity_type_id, event: 'approved', auto_create: true },
    });
    expect(ruleCount).toBeGreaterThan(0);

    // Approved directly in the database, so no rule has fired for it yet.
    const entity = await prisma.entity.create({
      data: {
        entity_type_id: movementEntityType.entity_type_id,
        owner_user_id: citizenUser.user_id,
        name: 'Test Movement Racing Rules',
        area: 'Sector 5',
        status: 'approved',
      },
    });

    const responses = await Promise.all(
      Array.from({ length: 8 }, () =>
        request(app)
          .post(`/entities/${entity.entity_id}/fire-rules`)
          .set(directorHeaders)
          .send({ eventType: 'approved' })
      )
    );
    for (const res of responses) expect(res.status).toBe(200);

    const directChildren = await prisma.entity.count({ where: { source_entity_id: entity.entity_id } });
    expect(directChildren).toBe(ruleCount);
    const created = responses.reduce(
      (n, r) => n + r.body.data.createdEntities.filter((e) => e.name.startsWith('Test Movement Racing Rules - ')).length,
      0
    );
    expect(created).toBe(ruleCount);
    expect(
      await prisma.entity.count({ where: { name: { startsWith: 'Test Movement Racing Rules - ' } } })
    ).toBe(directChildren);
  });

  // ── Test 11 (B2): approval and rule firing are atomic ──
  test('Test 11: a forced rule failure leaves the status unchanged and writes nothing', async () => {
    const entity = await prisma.entity.create({
      data: {
        entity_type_id: movementEntityType.entity_type_id,
        owner_user_id: citizenUser.user_id,
        name: 'Test Movement Atomic Rules',
        area: 'Sector 5',
        status: 'coordinator_approved',
      },
    });

    // Make the rule engine fail part-way: after the child entity is created,
    // its form lookup throws.
    const realTransaction = prisma.$transaction;
    prisma.$transaction = function (arg1, arg2) {
      if (typeof arg1 !== 'function') return realTransaction.call(prisma, arg1, arg2);
      return realTransaction.call(prisma, async (tx) => {
        tx.formMaster.findMany = async () => {
          throw new Error('forced rule failure');
        };
        return arg1(tx);
      }, arg2);
    };

    let res;
    try {
      res = await request(app)
        .post(`/entities/${entity.entity_id}/transition`)
        .set(directorHeaders)
        .send({ to_status: 'approved' });
    } finally {
      prisma.$transaction = realTransaction;
    }

    expect(res.status).toBe(500);

    const after = await prisma.entity.findUnique({ where: { entity_id: entity.entity_id } });
    expect(after.status).toBe('coordinator_approved');
    expect(await prisma.approvalHistory.count({ where: { entity_id: entity.entity_id } })).toBe(0);
    expect(await prisma.auditLog.count({ where: { entity_id: entity.entity_id } })).toBe(0);
    expect(await prisma.entity.count({ where: { source_entity_id: entity.entity_id } })).toBe(0);
    expect(
      await prisma.entity.count({ where: { name: { startsWith: 'Test Movement Atomic Rules - ' } } })
    ).toBe(0);

    // The same approval succeeds once the failure is gone.
    const retry = await request(app)
      .post(`/entities/${entity.entity_id}/transition`)
      .set(directorHeaders)
      .send({ to_status: 'approved' });
    expect(retry.status).toBe(200);
    expect(await prisma.entity.count({ where: { source_entity_id: entity.entity_id } })).toBeGreaterThan(0);
  });

  // ── Test 13 (B7): lineage comes from the source link, not from text or values ──
  test('Test 13: lineage lists exactly the entities created from this one', async () => {
    const mk = (name, status = 'coordinator_approved') => prisma.entity.create({
      data: { entity_type_id: movementEntityType.entity_type_id, owner_user_id: citizenUser.user_id, name, area: 'Sector 5', status },
    });
    const parent = await mk('Test Movement Lineage Parent');
    const approve = await request(app).post(`/entities/${parent.entity_id}/transition`).set(directorHeaders).send({ to_status: 'approved' });
    expect(approve.status).toBe(200);
    const realChildren = await prisma.entity.findMany({ where: { source_entity_id: parent.entity_id } });
    expect(realChildren.length).toBeGreaterThan(0);

    // Decoys the old string matching would have picked up:
    // an unrelated entity holding the parent's id as a field value…
    const decoy = await mk('Test Movement Lineage Decoy', 'draft');
    const anyParam = await prisma.parameterMaster.findFirst();
    await prisma.parameterValue.create({
      data: { entity_id: decoy.entity_id, parameter_id: anyParam.parameter_id, value: String(parent.entity_id) },
    });
    // …and an audit row whose text names an id that merely starts with the parent's id.
    const prefixDecoy = await mk('Test Movement Lineage Prefix Decoy', 'draft');
    await prisma.auditLog.create({
      data: {
        entity_id: prefixDecoy.entity_id,
        action: 'auto_created',
        user: 'system/rule-engine',
        reason: `Rule 1 fired: | source entity #${parent.entity_id}7 (Some Other Entity) | event "approved"`,
      },
    });

    const res = await request(app).get(`/entities/${parent.entity_id}/lineage`).set(directorHeaders);
    expect(res.status).toBe(200);
    expect(res.body.data.children.map((c) => c.entity_id).sort()).toEqual(realChildren.map((c) => c.entity_id).sort());
    expect(res.body.data.parent).toBeNull();

    const childRes = await request(app).get(`/entities/${realChildren[0].entity_id}/lineage`).set(directorHeaders);
    expect(childRes.body.data.parent.entity_id).toBe(parent.entity_id);

    await prisma.parameterValue.deleteMany({ where: { entity_id: decoy.entity_id } });
  });

  // ── Test 8: GET /entities/:id/workflow API endpoint ──
  test('Test 8: GET /entities/:id/workflow returns metadata transitions', async () => {
    const entity = await prisma.entity.create({
      data: {
        entity_type_id: movementEntityType.entity_type_id,
        owner_user_id: citizenUser.user_id,
        name: 'Workflow Endpoint Test',
        status: 'draft',
      },
    });

    const res = await request(app)
      .get(`/entities/${entity.entity_id}/workflow`)
      .set(citizenHeaders);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.isMetadataDriven).toBe(true);
    expect(Array.isArray(res.body.data.allowedTransitions)).toBe(true);

    // Clean up
    await prisma.entity.delete({ where: { entity_id: entity.entity_id } });
  });
});
