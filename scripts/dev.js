#!/usr/bin/env node
/**
 * CIVIC-KALKI — run backend and frontend together (`npm run dev`).
 * Ctrl+C stops both. If either one exits, the other is stopped too.
 */

const { spawn } = require('child_process');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const NPM = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const children = [
  { name: 'backend', cwd: path.join(ROOT, 'backend') },
  { name: 'frontend', cwd: path.join(ROOT, 'frontend') },
].map(({ name, cwd }) => {
  const child = spawn(NPM, ['run', 'dev'], { cwd, stdio: ['ignore', 'pipe', 'pipe'], shell: process.platform === 'win32' });
  const prefix = (stream, out) => {
    let rest = '';
    stream.on('data', (chunk) => {
      const lines = (rest + chunk).split('\n');
      rest = lines.pop();
      for (const line of lines) out.write(`[${name}] ${line}\n`);
    });
  };
  prefix(child.stdout, process.stdout);
  prefix(child.stderr, process.stderr);
  child.on('exit', (code) => {
    if (stopping) return;
    console.error(`[${name}] exited with code ${code}; stopping.`);
    stop(code || 1);
  });
  return child;
});

let stopping = false;
function stop(code) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill('SIGTERM');
  setTimeout(() => process.exit(code), 500);
}

process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));

console.log('Backend:  http://localhost:3000');
console.log('Frontend: http://localhost:5173  (open this one)\n');
