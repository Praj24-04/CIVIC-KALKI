#!/usr/bin/env node
/**
 * CIVIC-KALKI — one-command local setup (`npm run setup`).
 *
 * 1. backend/.env        created from .env.local.example if missing
 * 2. database            local Postgres started with Docker if nothing is listening
 * 3. dependencies        npm ci in backend/ and frontend/
 * 4. schema              prisma migrate deploy
 * 5. data                modules, demo accounts, demo records (npm run seed:all)
 *
 * Safe to run again. Step 5 rebuilds the forms of the seven core modules, which
 * drops the field values of records in those modules, so do not point this at a
 * database whose records you want to keep.
 */

const { spawnSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const net = require('net');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BACKEND = path.join(ROOT, 'backend');
const FRONTEND = path.join(ROOT, 'frontend');
const ENV_FILE = path.join(BACKEND, '.env');
const ENV_TEMPLATE = path.join(BACKEND, '.env.local.example');
const NPM = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const NPX = process.platform === 'win32' ? 'npx.cmd' : 'npx';

function step(title) {
  console.log(`\n━━ ${title}`);
}

function run(cmd, args, cwd) {
  const res = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
  if (res.error || res.status !== 0) {
    console.error(`\nSetup stopped: "${cmd} ${args.join(' ')}" failed in ${path.relative(ROOT, cwd) || '.'}.`);
    process.exit(1);
  }
}

function ensureEnv() {
  if (fs.existsSync(ENV_FILE)) {
    console.log('backend/.env already exists; left unchanged.');
    return;
  }
  const secret = crypto.randomBytes(64).toString('hex');
  const text = fs.readFileSync(ENV_TEMPLATE, 'utf8').replace(/^JWT_SECRET=.*$/m, `JWT_SECRET=${secret}`);
  fs.writeFileSync(ENV_FILE, text);
  console.log('Created backend/.env for the local database, with a new JWT secret.');
}

function readDatabaseUrl() {
  const line = fs.readFileSync(ENV_FILE, 'utf8').split(/\r?\n/).find((l) => /^\s*DATABASE_URL\s*=/.test(l));
  if (!line) return null;
  const value = line.replace(/^\s*DATABASE_URL\s*=\s*/, '').trim().replace(/^["']|["']$/g, '');
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function canConnect(host, port, timeoutMs = 1500) {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port });
    const done = (ok) => { socket.destroy(); resolve(ok); };
    socket.setTimeout(timeoutMs);
    socket.once('connect', () => done(true));
    socket.once('timeout', () => done(false));
    socket.once('error', () => done(false));
  });
}

async function ensureDatabase() {
  const url = readDatabaseUrl();
  if (!url) {
    console.error('backend/.env has no valid DATABASE_URL.');
    process.exit(1);
  }
  const host = url.hostname;
  const port = Number(url.port || 5432);
  const isLocal = ['localhost', '127.0.0.1', '::1', '[::1]'].includes(host);

  if (await canConnect(host, port)) {
    console.log(`Database is reachable at ${host}:${port}.`);
    return;
  }
  if (!isLocal) {
    console.error(`Cannot reach the database at ${host}:${port}. Check the network or DATABASE_URL in backend/.env.`);
    process.exit(1);
  }

  console.log(`Nothing is listening on ${host}:${port}; starting Postgres with Docker…`);
  const res = spawnSync('docker', ['compose', 'up', '-d', '--wait'], { cwd: ROOT, stdio: 'inherit' });
  if (res.error || res.status !== 0) {
    console.error(
      '\nCould not start Postgres with Docker. Either start Docker and run "npm run setup" again,\n' +
      'or start your own Postgres and put its URL in DATABASE_URL in backend/.env.'
    );
    process.exit(1);
  }
  for (let i = 0; i < 30; i += 1) {
    if (await canConnect(host, port)) return;
    await new Promise((r) => setTimeout(r, 1000));
  }
  console.error(`Postgres did not come up on ${host}:${port}.`);
  process.exit(1);
}

(async () => {
  step('1/5 Environment file');
  ensureEnv();

  step('2/5 Database');
  await ensureDatabase();

  step('3/5 Dependencies');
  run(NPM, ['ci', '--no-audit', '--no-fund'], BACKEND);
  run(NPM, ['ci', '--no-audit', '--no-fund'], FRONTEND);

  step('4/5 Database schema');
  run(NPX, ['prisma', 'migrate', 'deploy'], BACKEND);
  run(NPX, ['prisma', 'generate'], BACKEND);

  step('5/5 Modules, demo accounts and demo records');
  run(NPM, ['run', 'seed:all'], BACKEND);

  console.log('\nSetup complete. Start the app with:  npm run dev');
  console.log('Then open http://localhost:5173 and sign in with citizen@example.com / Password123.');
})();
