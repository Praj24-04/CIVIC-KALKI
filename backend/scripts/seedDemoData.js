/**
 * CIVIC-KALKI — Demo data
 *
 * Seeds the localities and the handful of realistic records the demo starts from.
 * Idempotent: every row is looked up by name first, nothing is deleted.
 * For a clean slate use `npm run demo:reset` (scripts/resetDemo.js).
 *
 * Run after seed.js, seedMeme.js and seed-demo-users.js:
 *   node scripts/seedDemoData.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// The area coordinator demo account is assigned to this ward, so every
// "submitted" record below that sits in it can be approved on the first try.
const DEMO_AREA = 'Kothrud';
const CITIZEN_EMAIL = 'citizen@example.com';

async function findOrCreateJurisdiction({ name, type, code, parent_id }) {
  const existing = await prisma.jurisdictionMaster.findFirst({ where: { parent_id, name } });
  if (existing) return existing;
  return prisma.jurisdictionMaster.create({ data: { name, type, code, status: 'active', parent_id } });
}

// The workflow steps a record has been through to reach each seeded status.
const HISTORY = {
  submitted: [['draft', 'submitted']],
  coordinator_approved: [['draft', 'submitted'], ['submitted', 'coordinator_approved']],
  approved: [['draft', 'submitted'], ['submitted', 'coordinator_approved'], ['coordinator_approved', 'approved']],
};

async function findOrCreateEntity(data, citizen) {
  const existing = await prisma.entity.findFirst({ where: { name: data.name } });
  if (existing) return { entity: existing, created: false };
  const entity = await prisma.entity.create({ data });

  // Give the record the audit trail and approval history it would have if it had
  // gone through the workflow, so the activity log and the notification feed are
  // not empty at the start of the demo. Steps not taken by the citizen are
  // attributed to "Demo seed", not to a real account.
  const steps = HISTORY[data.status] || [];
  const start = Date.now() - steps.length * 60 * 60 * 1000;
  for (const [i, [from, to]] of steps.entries()) {
    const byCitizen = from === 'draft';
    const when = new Date(start + i * 60 * 60 * 1000);
    const reason = 'Demo seed data';
    await prisma.auditLog.create({
      data: {
        entity_id: entity.entity_id,
        actor_user_id: byCitizen ? citizen.user_id : null,
        action: 'status_transition',
        user: byCitizen ? citizen.name : 'Demo seed',
        old_status: from,
        new_status: to,
        datetime: when,
        reason,
      },
    });
    await prisma.approvalHistory.create({
      data: {
        entity_id: entity.entity_id,
        actor_user_id: byCitizen ? citizen.user_id : null,
        from_status: from,
        to_status: to,
        created_date: when,
        reason,
      },
    });
  }
  console.log(`  ${data.status.padEnd(20)} #${entity.entity_id} ${entity.name} (${data.area})`);
  return { entity, created: true };
}

async function main() {
  console.log('── Seeding demo data ──');

  const citizen = await prisma.user.findUnique({ where: { email: CITIZEN_EMAIL } });
  if (!citizen) {
    throw new Error(`${CITIZEN_EMAIL} not found. Run "node scripts/seed-demo-users.js" first.`);
  }

  // Localities: India → Maharashtra → Pune → wards
  const india = await findOrCreateJurisdiction({ name: 'India', type: 'country', code: 'IND', parent_id: null });
  const state = await findOrCreateJurisdiction({ name: 'Maharashtra', type: 'state', code: 'MH', parent_id: india.jurisdiction_id });
  const pune = await findOrCreateJurisdiction({ name: 'Pune', type: 'city', code: 'PNQ', parent_id: state.jurisdiction_id });
  const ward = {};
  for (const w of [
    { name: 'Kothrud', code: 'KOTH' },
    { name: 'Shivajinagar', code: 'SHIV' },
    { name: 'Aundh', code: 'AUNDH' },
    { name: 'Hadapsar', code: 'HADP' },
  ]) {
    ward[w.name] = await findOrCreateJurisdiction({ ...w, type: 'ward', parent_id: pune.jurisdiction_id });
  }
  console.log('  Localities: India → Maharashtra → Pune → Kothrud, Shivajinagar, Aundh, Hadapsar');

  const typeByName = async (name) => prisma.entityType.findFirst({ where: { name } });
  const movementType = await typeByName('Movement');
  const grievanceType = await typeByName('Grievance');
  if (!movementType || !grievanceType) {
    throw new Error('Core modules not found. Run "node seed.js" first.');
  }

  const record = (type, name, area, location, status) => ({
    entity_type_id: type.entity_type_id,
    owner_user_id: citizen.user_id,
    jurisdiction_id: ward[area].jurisdiction_id,
    name,
    area,
    location,
    status,
  });

  const records = [
    // Waiting for the Kothrud area coordinator
    record(movementType, 'Safe Streets Pune', DEMO_AREA, 'Kothrud Main Boulevard', 'submitted'),
    record(movementType, 'Kothrud Park Greenery Restoration', DEMO_AREA, 'Kothrud Vanaz Corner', 'submitted'),
    record(grievanceType, 'Damaged Streetlights on Kothrud Boulevard', DEMO_AREA, 'Kothrud Stand Stop', 'submitted'),
    // Waiting for the director
    record(movementType, 'Kothrud Lake Clean-up Drive', DEMO_AREA, 'Kothrud Lake Road', 'coordinator_approved'),
    record(movementType, 'Aundh Community Park Upgrade', 'Aundh', 'Aundh Sector 2', 'coordinator_approved'),
    // Other wards, already decided or outside the demo coordinator's area
    record(movementType, 'Clean Pune Initiative', 'Shivajinagar', 'JM Road & Deccan Gymkhana', 'approved'),
    record(grievanceType, 'Broken Playground Swings in Shivaji Park', 'Shivajinagar', 'Shivaji Park Playground', 'approved'),
    record(grievanceType, 'Garbage Accumulation near JM Road Market', 'Shivajinagar', 'JM Road Lane 3', 'submitted'),
  ];

  let createdCount = 0;
  for (const data of records) {
    const { created } = await findOrCreateEntity(data, citizen);
    if (created) createdCount += 1;
  }

  // Two published Civic Buzz posts on approved records, so the Buzz page is not
  // empty when the demo runs without AI (new posts need the AI safety check).
  // These captions were written for the seed; they are not AI output.
  const buzzPosts = [
    {
      linkedName: 'Broken Playground Swings in Shivaji Park',
      linked_type: 'issue',
      template: 'awareness',
      style: 'informative',
      caption: 'Broken swings in Shivaji Park. The repair is approved. Follow it here.',
      cta_text: 'Follow this issue',
    },
    {
      linkedName: 'Clean Pune Initiative',
      linked_type: 'initiative',
      template: 'initiative',
      style: 'emotional',
      caption: 'Clean Pune starts on JM Road. One street, one weekend, everyone welcome.',
      cta_text: 'Join the initiative',
    },
  ];
  let buzzCreated = 0;
  for (const post of buzzPosts) {
    const linked = await prisma.entity.findFirst({ where: { name: post.linkedName, status: 'approved' } });
    if (!linked) continue;
    const exists = await prisma.buzzPost.findFirst({ where: { linked_id: linked.entity_id, caption: post.caption } });
    if (exists) continue;
    await prisma.buzzPost.create({
      data: {
        author_id: citizen.user_id,
        linked_type: post.linked_type,
        linked_id: linked.entity_id,
        template: post.template,
        style: post.style,
        caption: post.caption,
        cta_text: post.cta_text,
        status: 'published',
      },
    });
    buzzCreated += 1;
  }
  if (buzzCreated) console.log(`  Civic Buzz: ${buzzCreated} published post(s)`);

  console.log(`── Demo data ready (${createdCount} new, ${records.length - createdCount} already present) ──`);
}

main()
  .catch((err) => {
    console.error('Demo data seeding failed:', err.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
