/**
 * CIVIC-KALKI — Demo reset
 *
 * Empties every table that holds records (entities, values, files, audit,
 * approval history, AI logs, Buzz, campaign events) and restarts their ids.
 * Metadata (modules, forms, workflows, rules, reports, dashboards), localities
 * and users are kept. `npm run demo:reset` then reseeds the demo data.
 *
 * DESTRUCTIVE. It only runs against a database on this machine. It always
 * refuses a Supabase host; any other remote host needs --allow-remote.
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

// Children first is not required for TRUNCATE when every referencing table is listed.
const RECORD_TABLES = [
  'buzz_votes', 'buzz_follows', 'buzz_comments', 'buzz_events', 'buzz_reports', 'buzz_posts',
  'CivicCampaignEvent', 'FileRepository', 'ParameterValue',
  'AuditLog', 'ApprovalHistory', 'AIExecutionLog', 'Entity',
];

function checkTarget() {
  const raw = process.env.DATABASE_URL;
  if (!raw) throw new Error('DATABASE_URL is not set (expected in backend/.env).');
  let host;
  try {
    host = new URL(raw).hostname.toLowerCase();
  } catch {
    throw new Error('DATABASE_URL is not a valid URL.');
  }
  if (host.includes('supabase')) {
    throw new Error(`Refusing to reset a Supabase database (${host}). Point DATABASE_URL at the local database.`);
  }
  if (!LOCAL_HOSTS.has(host) && !process.argv.includes('--allow-remote')) {
    throw new Error(`Refusing to reset a remote database (${host}). Pass --allow-remote if you are sure.`);
  }
  return host;
}

async function main() {
  const host = checkTarget();
  const prisma = new PrismaClient();
  try {
    const list = RECORD_TABLES.map((t) => `"${t}"`).join(', ');
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${list} RESTART IDENTITY`);
    console.log(`Demo reset: emptied ${RECORD_TABLES.length} record tables on ${host}. Metadata, localities and users kept.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
