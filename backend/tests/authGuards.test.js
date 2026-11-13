/**
 * Audit findings 5, 6, 7:
 *   5. POST /translate stays open to signed-out visitors (public pages), with
 *      bounded input and a rate limit per user, or per IP when signed out.
 *   6. A valid token whose user no longer exists is refused (401), never trusted.
 *   7. checkRole compares whole role names, never substrings.
 */

const request = require('supertest');
const app = require('../index');
const prisma = require('../db');
const { createTestUser, cleanupAll } = require('./helpers/authHelper');
const { limits } = require('../routes/translate');

const CSRF = { 'X-Requested-With': 'ck-web' };

afterAll(async () => {
  await cleanupAll();
  await prisma.$disconnect();
});

describe('5 — POST /translate', () => {
  // targetLang "en" answers without calling the external service.
  const translate = (headers, body) => request(app).post('/translate').set(CSRF).set(headers || {}).send(body);

  test('signed-out visitors can translate (the homepage needs no login)', async () => {
    const res = await translate(null, { texts: ['Hello'], targetLang: 'en' });
    expect(res.status).toBe(200);
    expect(res.body.translations).toEqual({ Hello: 'Hello' });
  });

  test('signed-out visitors get the same input bounds → 400', async () => {
    const many = Array.from({ length: limits.MAX_TEXTS + 1 }, (_, i) => `t${i}`);
    expect((await translate(null, { texts: many, targetLang: 'en' })).status).toBe(400);
  });

  test('bounded input: too many texts, a too-long text, or a bad language code → 400', async () => {
    const { headers } = await createTestUser({ role: 'citizen' });
    const many = Array.from({ length: limits.MAX_TEXTS + 1 }, (_, i) => `t${i}`);
    expect((await translate(headers, { texts: many, targetLang: 'en' })).status).toBe(400);
    expect((await translate(headers, { texts: ['x'.repeat(limits.MAX_TEXT_LENGTH + 1)], targetLang: 'en' })).status).toBe(400);
    expect((await translate(headers, { texts: ['Hello'], targetLang: 'hi&q=evil' })).status).toBe(400);
    expect((await translate(headers, { texts: ['Hello'], targetLang: 'en' })).status).toBe(200);
  });

  test(`rate limit: request ${limits.RATE_LIMIT + 1} within a minute gets 429`, async () => {
    const { headers } = await createTestUser({ role: 'citizen' });
    for (let i = 0; i < limits.RATE_LIMIT; i += 1) {
      const ok = await translate(headers, { texts: ['Hello'], targetLang: 'en' });
      expect(ok.status).toBe(200);
    }
    const limited = await translate(headers, { texts: ['Hello'], targetLang: 'en' });
    expect(limited.status).toBe(429);

    // The limit is per user: someone else is unaffected
    const other = await createTestUser({ role: 'citizen' });
    expect((await translate(other.headers, { texts: ['Hello'], targetLang: 'en' })).status).toBe(200);
  });

  // Runs last in this block: it uses up this test client's per-IP budget.
  test('signed-out visitors are rate-limited per IP, separately from signed-in users', async () => {
    let status = 200;
    let sent = 0;
    while (status === 200 && sent <= limits.RATE_LIMIT) {
      status = (await translate(null, { texts: ['Hello'], targetLang: 'en' })).status;
      sent += 1;
    }
    expect(status).toBe(429);

    const { headers } = await createTestUser({ role: 'citizen' });
    expect((await translate(headers, { texts: ['Hello'], targetLang: 'en' })).status).toBe(200);
  });
});

describe('6 — a token for a deleted user', () => {
  test('is refused with 401 on protected and optional-auth routes', async () => {
    const { user, headers } = await createTestUser({ role: 'admin' });
    expect((await request(app).get('/auth/me').set(headers)).status).toBe(200);

    await prisma.user.delete({ where: { user_id: user.user_id } });

    expect((await request(app).get('/auth/me').set(headers)).status).toBe(401);          // verifyToken
    expect((await request(app).get('/entities').set(headers)).status).toBe(401);         // optionalAuth
    expect((await request(app).get('/admin/users').set(headers)).status).toBe(401);      // admin role in token no longer counts
  });
});

describe('7 — checkRole matches whole role names', () => {
  test('a role that is a substring of "admin" cannot create, edit or delete jurisdictions', async () => {
    const { headers } = await createTestUser({ role: 'dmi' });
    const create = await request(app).post('/jurisdictions').set(CSRF).set(headers)
      .send({ name: `AG ${Date.now()}`, type: 'country' });
    expect(create.status).toBe(403);
    expect((await request(app).put('/jurisdictions/1').set(CSRF).set(headers).send({ name: 'x' })).status).toBe(403);
    expect((await request(app).delete('/jurisdictions/1').set(CSRF).set(headers)).status).toBe(403);
  });
});
