/**
 * A1 — single AI client: timeout, bounded retry, model name from configuration,
 * and labeled fallbacks when the AI cannot be reached.
 *
 * The SDK is mocked; `mockGenerate` decides what each call does.
 */

const mockGenerate = jest.fn();
const mockGetGenerativeModel = jest.fn(() => ({ generateContent: mockGenerate }));
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: mockGetGenerativeModel,
  })),
}));

const request = require('supertest');
const app = require('../index');
const prisma = require('../db');
const aiClient = require('../services/aiClient');
const { routeIntent } = require('../services/agentIntentRouter');
const { createTestUser, cleanupAll } = require('./helpers/authHelper');

const TIMEOUT_MS = 200;
const never = () => new Promise(() => {});
const reply = (text) => ({ response: { text: () => text } });

describe('A1 — AI client', () => {
  const saved = {};
  let citizen, director, movementType;

  beforeAll(async () => {
    for (const k of ['GEMINI_API_KEY', 'GEMINI_MODEL', 'AI_TIMEOUT_MS']) saved[k] = process.env[k];
    citizen = await createTestUser({ role: 'citizen' });
    director = await createTestUser({ role: 'director' });
    movementType = await prisma.entityType.findFirst({ where: { name: 'Movement' } });
  });

  beforeEach(() => {
    mockGenerate.mockReset();
    process.env.GEMINI_API_KEY = 'test-key';
    process.env.AI_TIMEOUT_MS = String(TIMEOUT_MS);
    delete process.env.GEMINI_MODEL;
  });

  afterAll(async () => {
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
    await prisma.aIExecutionLog.deleteMany({ where: { requested_by_user_id: director.user.user_id } });
    await cleanupAll();
    await prisma.$disconnect();
  });

  describe('client', () => {
    test('no key: getModel throws AiUnavailableError', () => {
      delete process.env.GEMINI_API_KEY;
      expect(aiClient.isConfigured()).toBe(false);
      expect(() => aiClient.getModel()).toThrow(aiClient.AiUnavailableError);
    });

    test('model name comes from GEMINI_MODEL, with a default', () => {
      aiClient.getModel({ generationConfig: { temperature: 0.1 } });
      expect(mockGetGenerativeModel).toHaveBeenLastCalledWith(
        { generationConfig: { temperature: 0.1 }, model: aiClient.DEFAULT_MODEL },
        { timeout: TIMEOUT_MS }
      );
      process.env.GEMINI_MODEL = 'some-other-model';
      const model = aiClient.getModel();
      expect(model.modelName).toBe('some-other-model');
      expect(mockGetGenerativeModel.mock.calls.at(-1)[0].model).toBe('some-other-model');
    });

    test('a call that never answers is cut off at the timeout, and is not retried', async () => {
      mockGenerate.mockImplementation(never);
      const model = aiClient.getModel();

      const started = Date.now();
      await expect(model.generateContent('x')).rejects.toMatchObject({ code: 'AI_UNAVAILABLE' });
      const elapsed = Date.now() - started;
      expect(elapsed).toBeGreaterThanOrEqual(TIMEOUT_MS - 20);
      expect(elapsed).toBeLessThan(TIMEOUT_MS + 500);

      // A caller's "try again" on the same handle fails at once, without a second network call.
      const again = Date.now();
      await expect(model.generateContent('x')).rejects.toMatchObject({ code: 'AI_UNAVAILABLE' });
      expect(Date.now() - again).toBeLessThan(50);
      expect(mockGenerate).toHaveBeenCalledTimes(1);
    });

    test('a provider or network error is not retried either', async () => {
      mockGenerate.mockRejectedValue(new Error('fetch failed'));
      const model = aiClient.getModel();
      await expect(model.generateContent('x')).rejects.toMatchObject({ code: 'AI_UNAVAILABLE' });
      await expect(model.generateContent('x')).rejects.toMatchObject({ code: 'AI_UNAVAILABLE' });
      expect(mockGenerate).toHaveBeenCalledTimes(1);
    });
  });

  describe('retry on parse failure only', () => {
    test('unparseable answer: exactly one retry, then "unclear" (AI was reachable)', async () => {
      mockGenerate.mockResolvedValue(reply('this is not json'));
      const intent = await routeIntent('hello', []);
      expect(intent).toMatchObject({ action_type: 'unclear', ai_unavailable: false });
      expect(mockGenerate).toHaveBeenCalledTimes(2);
    });

    test('unparseable answer then a valid one: the retry is used', async () => {
      mockGenerate
        .mockResolvedValueOnce(reply('not json'))
        .mockResolvedValueOnce(reply('{"action_type":"status_check","matched_capability":null,"confidence":"high"}'));
      const intent = await routeIntent('status of my requests', []);
      expect(intent.action_type).toBe('status_check');
      expect(mockGenerate).toHaveBeenCalledTimes(2);
    });

    test('AI unreachable: one call, one timeout, flagged ai_unavailable', async () => {
      mockGenerate.mockImplementation(never);
      const started = Date.now();
      const intent = await routeIntent('hello', []);
      expect(intent).toMatchObject({ action_type: 'unclear', ai_unavailable: true });
      expect(Date.now() - started).toBeLessThan(TIMEOUT_MS + 500);
      expect(mockGenerate).toHaveBeenCalledTimes(1);
    });
  });

  describe('director report status codes', () => {
    const makeEntity = () => prisma.entity.create({
      data: { entity_type_id: movementType.entity_type_id, owner_user_id: citizen.user.user_id, name: 'A1 Status Entity', status: 'coordinator_approved' },
    });
    const run = async (entity) => {
      const res = await request(app).post(`/entities/${entity.entity_id}/ai-analysis`).set(director.headers).send({});
      await prisma.aIExecutionLog.deleteMany({ where: { entity_id: entity.entity_id } });
      return res;
    };

    test('no key: 503', async () => {
      delete process.env.GEMINI_API_KEY;
      expect((await run(await makeEntity())).status).toBe(503);
    });

    test('network error: 503, with a message safe to show', async () => {
      mockGenerate.mockRejectedValue(new Error('fetch failed: secret-internal-detail'));
      const res = await run(await makeEntity());
      expect(res.status).toBe(503);
      expect(JSON.stringify(res.body)).not.toContain('secret-internal-detail');
    });

    test('the AI answers but the answer is unusable: 502, not treated as unreachable', async () => {
      mockGenerate.mockResolvedValue(reply('this is not a report'));
      const res = await run(await makeEntity());
      expect(res.status).toBe(502);
      expect(mockGenerate).toHaveBeenCalledTimes(2);
    });
  });

  describe('labeled fallbacks through the API', () => {
    const chat = (message) =>
      request(app).post('/agent/chat').set(citizen.headers)
        .send({ sessionId: `a1-${Date.now()}-${Math.random()}`, message });

    test.each([
      ['no key', () => { delete process.env.GEMINI_API_KEY; }],
      ['AI never answers', () => { mockGenerate.mockImplementation(never); }],
      ['network error', () => { mockGenerate.mockRejectedValue(new Error('fetch failed')); }],
    ])('assistant, %s: says it is unavailable and points to the manual form', async (_label, arrange) => {
      arrange();
      const started = Date.now();
      const res = await chat('There is a broken streetlight near my house');
      expect(Date.now() - started).toBeLessThan(TIMEOUT_MS + 2000);
      expect(res.status).toBe(200);
      const body = JSON.stringify(res.body);
      expect(body).toContain('ai_unavailable');
      expect(body).toMatch(/AI assistant is unavailable/);
      expect(body).toMatch(/not an AI answer/);
      expect(body).toContain('/entities/new');
    });

    test('director report, AI never answers: fails closed within the timeout and is logged', async () => {
      mockGenerate.mockImplementation(never);
      const entity = await prisma.entity.create({
        data: {
          entity_type_id: movementType.entity_type_id,
          owner_user_id: citizen.user.user_id,
          name: 'A1 Report Entity',
          status: 'coordinator_approved',
        },
      });

      const started = Date.now();
      const res = await request(app).post(`/entities/${entity.entity_id}/ai-analysis`).set(director.headers).send({});
      expect(Date.now() - started).toBeLessThan(TIMEOUT_MS + 2000);
      // 503 tells the page that no AI answer exists, so it can show its labeled non-AI summary.
      expect(res.status).toBe(503);
      expect(res.body.error).toMatch(/could not be reached/i);
      expect(res.body.success).toBe(false);
      expect(res.body.data).toBeUndefined();
      expect(mockGenerate).toHaveBeenCalledTimes(1);

      const logs = await prisma.aIExecutionLog.findMany({ where: { entity_id: entity.entity_id } });
      expect(logs.length).toBeGreaterThan(0);
      expect(logs.every((l) => l.status !== 'success')).toBe(true);
      await prisma.aIExecutionLog.deleteMany({ where: { entity_id: entity.entity_id } });
    });
  });
});
