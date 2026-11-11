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

async function findOrCreateEntity(data) {
  const existing = await prisma.entity.findFirst({ where: { name: data.name } });
  if (existing) return { entity: existing, created: false };
  const entity = await prisma.entity.create({ data });
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
    const { created } = await findOrCreateEntity(data);
    if (created) createdCount += 1;
  }

  console.log(`── Demo data ready (${createdCount} new, ${records.length - createdCount} already present) ──`);
}

main()
  .catch((err) => {
    console.error('Demo data seeding failed:', err.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
