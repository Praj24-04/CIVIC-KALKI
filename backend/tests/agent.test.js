/**
 * CIVIC-KALKI — Civic assistant
 *
 * These run the real conversation engine against the real database. Only the
 * AI SDK is mocked: by default no key is set, so the assistant runs on rules;
 * the AI tests set a key and script the model's answers.
 */

const mockGenerate = jest.fn();
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn(() => ({ generateContent: mockGenerate })),
  })),
}));

// The workflow engine is real; one test makes its transition fail on purpose.
const mockFail = { next: false };
jest.mock('../services/workflowEngine', () => {
  const real = jest.requireActual('../services/workflowEngine');
  return {
    ...real,
    executeWorkflowTransition: jest.fn(async (args) => {
      if (mockFail.next) { mockFail.next = false; throw new Error('forced failure'); }
      return real.executeWorkflowTransition(args);
    }),
  };
});

const request = require('supertest');
const app = require('../index');
const prisma = require('../db');
const { createTestUser, cleanupAll } = require('./helpers/authHelper');
const { continueFormFilling, clearSession, matchFileToParameter, _sessions, _validateValue, _loadServiceCatalog } = require('../services/agentFormFiller');

const reply = (obj) => ({ response: { text: () => JSON.stringify(obj) } });
const never = () => new Promise(() => {});

describe('Civic assistant', () => {
  const saved = {};
  const WARD = `Testward${Date.now()}`;
  const OTHER_WARD = `Otherward${Date.now()}`;
  let citizen, citizenUser, director, coordinator, grievance, wardRow, otherWardRow;
  let seq = 0;
  const sid = () => `assistant-test-${Date.now()}-${seq += 1}`;
  const say = (id, text, who = citizenUser) => continueFormFilling(id, text, who);
  const recordsNamed = (fragment) => prisma.entity.findMany({ where: { owner_user_id: citizen.user.user_id, name: { contains: fragment } } });
  // The exact spot and a photo are asked for once each; these flows skip them.
  const skipExtras = async (id, r) => {
    let out = r;
    while (out.type === 'question' && ['__place', '__photo'].includes(_sessions.get(id)?.asked)) out = await say(id, 'skip');
    return out;
  };

  beforeAll(async () => {
    for (const k of ['GEMINI_API_KEY', 'AI_TIMEOUT_MS']) saved[k] = process.env[k];
    citizen = await createTestUser({ role: 'citizen' });
    director = await createTestUser({ role: 'director' });
    coordinator = await createTestUser({ role: 'coordinator_area', assignedArea: WARD });
    citizenUser = { user_id: citizen.user.user_id, role: 'citizen', name: citizen.user.name };
    grievance = await prisma.entityType.findFirst({ where: { name: 'Grievance' } });
    wardRow = await prisma.jurisdictionMaster.create({ data: { name: WARD, type: 'ward', status: 'active' } });
    otherWardRow = await prisma.jurisdictionMaster.create({ data: { name: OTHER_WARD, type: 'ward', status: 'active' } });
  });

  beforeEach(() => {
    mockGenerate.mockReset();
    delete process.env.GEMINI_API_KEY; // rules only, unless a test sets a key
    process.env.AI_TIMEOUT_MS = '250';
    mockFail.next = false;
  });

  afterAll(async () => {
    for (const [k, v] of Object.entries(saved)) { if (v === undefined) delete process.env[k]; else process.env[k] = v; }
    await prisma.fileRepository.deleteMany({ where: { entity: { owner_user_id: citizen.user.user_id } } });
    await prisma.parameterValue.deleteMany({ where: { entity: { owner_user_id: citizen.user.user_id } } });
    await prisma.entity.updateMany({ where: { jurisdiction_id: { in: [wardRow.jurisdiction_id, otherWardRow.jurisdiction_id] } }, data: { jurisdiction_id: null } });
    await cleanupAll();
    await prisma.jurisdictionMaster.deleteMany({ where: { jurisdiction_id: { in: [wardRow.jurisdiction_id, otherWardRow.jurisdiction_id] } } });
    await prisma.$disconnect();
  });

  // ── The acceptance test ────────────────────────────────────────────────────
  describe('pothole: from one sentence to a traceable complaint', () => {
    test('asks only what is missing, confirms, then files the real record', async () => {
      const id = sid();
      const asked = [];
      let r = await say(id, "There's a pothole outside my building");
      expect(r.type).toBe('question');
      asked.push(r.text);

      // Nothing exists yet.
      expect(await recordsNamed('Pothole outside my building')).toHaveLength(0);

      r = await say(id, 'infrastructure'); expect(r.type).toBe('question'); asked.push(r.text);
      r = await say(id, 'severe'); expect(r.type).toBe('question'); asked.push(r.text);
      r = await skipExtras(id, await say(id, WARD));

      // One question per turn, none repeated, none about things already known.
      expect(new Set(asked).size).toBe(asked.length);
      for (const q of asked) expect((q.match(/\?/g) || []).length).toBe(1);
      expect(asked.join(' ')).not.toMatch(/your name|what happened|describe/i);

      // Read back for confirmation, still nothing created.
      expect(r.type).toBe('confirm');
      expect(r.text).toMatch(/Pothole outside my building/);
      expect(r.text).toContain(WARD);
      expect(r.text).toMatch(/Infrastructure/);
      expect(r.text).toMatch(/Severe/);
      expect(r.text).toMatch(/Shall I send it\?/);
      expect(await recordsNamed('Pothole outside my building')).toHaveLength(0);

      r = await say(id, 'yes');
      expect(r.type).toBe('submitted');
      expect(r.reference).toMatch(/^PR-\d{5}$/);
      expect(r.text).toContain(r.reference);
      expect(r.text).toContain(`${WARD} area coordinator`);
      expect(r.text).toMatch(/notification/);

      // The real record, in the real workflow.
      const e = await prisma.entity.findUnique({
        where: { entity_id: r.entity_id },
        include: { parameterValues: { include: { parameterMaster: true } }, approvalHistory: true, auditLogs: true },
      });
      expect(e.entity_type_id).toBe(grievance.entity_type_id);
      expect(e.owner_user_id).toBe(citizen.user.user_id);
      expect(e.status).toBe('submitted');
      expect(e.area).toBe(WARD);
      expect(e.jurisdiction_id).toBe(wardRow.jurisdiction_id);
      const values = Object.fromEntries(e.parameterValues.map((v) => [v.parameterMaster.field_key, v.value]));
      expect(values).toMatchObject({ category: 'Infrastructure', severity: 'Severe', reporter_name: citizen.user.name });
      expect(values.complaint_details).toMatch(/pothole outside my building/i);
      expect(e.approvalHistory.map((h) => `${h.from_status}>${h.to_status}`)).toEqual(['draft>submitted']);
      expect(e.auditLogs.some((a) => a.action === 'status_transition' && a.actor_user_id === citizen.user.user_id)).toBe(true);

      // It reaches the ward's coordinator like any other record.
      const feed = await request(app).get('/entities/notifications?limit=100').set(coordinator.headers);
      expect(feed.body.data.some((n) => n.entity_id === e.entity_id && n.kind === 'queue')).toBe(true);
    });

    test('speaks plainly: no module, field or system words in anything it says', async () => {
      const id = sid();
      const said = [];
      for (const t of ["There's a pothole outside my building", 'infrastructure', 'severe', WARD, 'yes']) said.push((await say(id, t)).text);
      const all = said.join('\n');
      expect(all).not.toMatch(/grievance|entity|module|parameter|field|workflow|metadata|complaint_details|reporter_name|form\b/i);
    });

    test('the same journey over HTTP', async () => {
      const id = sid();
      const post = (message) => request(app).post('/agent/chat').set(citizen.headers).send({ sessionId: id, message });
      let res;
      for (const t of ['The streetlight on my lane is broken and it is dark at night', 'safety', 'moderate', WARD]) res = await post(t);
      while (res.body.data.type === 'question' && ['__place', '__photo'].includes(_sessions.get(id)?.asked)) res = await post('skip');
      expect(res.body.data.type).toBe('confirm');
      res = await post('yes');
      expect(res.status).toBe(200);
      expect(res.body.data.type).toBe('submitted');
      const e = await prisma.entity.findUnique({ where: { entity_id: res.body.data.entity_id } });
      expect(e.status).toBe('submitted');
    });
  });

  // ── Corrections ────────────────────────────────────────────────────────────
  describe('corrections', () => {
    test('changes an earlier answer mid-way and at the summary, without asking again', async () => {
      const id = sid();
      await say(id, 'Garbage has not been collected on our street for a week');
      await say(id, 'sanitation');
      let r = await say(id, 'minor');
      expect(r.text).toMatch(/area/i);

      // Corrects the previous answer instead of answering the question.
      r = await say(id, 'actually make it critical');
      expect(r.text).toMatch(/severity is now Critical/i);
      expect(r.text).toMatch(/area/i); // carries on with what is still missing

      r = await skipExtras(id, await say(id, WARD));
      expect(r.type).toBe('confirm');
      expect(r.text).toMatch(/Critical/);

      // Corrects at the summary: the summary is shown again, nothing is sent.
      r = await say(id, `sorry, it is in ${OTHER_WARD}`);
      expect(r.type).toBe('confirm');
      expect(r.text).toMatch(new RegExp(`area is now ${OTHER_WARD}`));
      expect(r.text).toContain(OTHER_WARD);
      expect(await recordsNamed('Garbage has not been collected')).toHaveLength(0);

      r = await say(id, 'yes');
      const e = await prisma.entity.findUnique({ where: { entity_id: r.entity_id }, include: { parameterValues: { include: { parameterMaster: true } } } });
      expect(e.area).toBe(OTHER_WARD);
      expect(e.parameterValues.find((v) => v.parameterMaster.field_key === 'severity').value).toBe('Critical');
    });

    test('"no" at the summary asks what to change; "cancel" drops it', async () => {
      const id = sid();
      let r;
      for (const t of ['Water is leaking from a pipe on the main road', 'water supply', 'severe', WARD]) r = await say(id, t);
      await skipExtras(id, r);
      r = await say(id, 'no');
      expect(r.type).toBe('question');
      expect(r.text).toMatch(/what should I change/i);
      r = await say(id, 'cancel');
      expect(r.type).toBe('cancelled');
      expect(await recordsNamed('Water is leaking')).toHaveLength(0);
    });
  });

  // ── Ambiguity ──────────────────────────────────────────────────────────────
  describe('ambiguity', () => {
    test('offers the real services that could fit, then follows the choice', async () => {
      const id = sid();
      let r = await say(id, 'I want to volunteer for a cleanup drive');
      expect(r.type).toBe('question');
      const options = r.text.split('\n').filter((l) => /^\d\./.test(l));
      expect(options.length).toBeGreaterThanOrEqual(2);
      // Every option is a real service this citizen may start.
      const catalog = await _loadServiceCatalog('citizen');
      for (const o of options) expect(catalog.some((s) => o.includes(s.label))).toBe(true);

      r = await say(id, '1');
      expect(r.type).toBe('question');
      expect(_sessions.get(id).service).toBeTruthy();
      expect(options[0]).toContain(_sessions.get(id).service.label);
    });

    test('too vague to act on: asks, creates nothing', async () => {
      const id = sid();
      const before = await prisma.entity.count({ where: { owner_user_id: citizen.user.user_id } });
      const r = await say(id, 'hello');
      expect(r.type).toBe('guidance');
      expect(r.text).toMatch(/your own words/);
      expect(await prisma.entity.count({ where: { owner_user_id: citizen.user.user_id } })).toBe(before);
    });
  });

  // ── Validation ─────────────────────────────────────────────────────────────
  describe('validation', () => {
    test('an answer that is not one of the choices is refused, with the choices', async () => {
      const id = sid();
      await say(id, 'There is a big pothole near the school gate');
      let r = await say(id, 'banana');
      expect(r.type).toBe('question');
      expect(r.invalid).toBe('category');
      expect(r.text).toMatch(/pick one of/i);
      expect(r.text).toMatch(/Infrastructure/);
      expect(_sessions.get(id).draft.category).toBeUndefined();
      r = await say(id, 'Infrastructure');
      expect(r.invalid).toBeUndefined();
      expect(_sessions.get(id).draft.category).toBe('Infrastructure');
    });

    test('an area that does not exist is not accepted', async () => {
      const id = sid();
      for (const t of ['There is a big pothole near the school gate', 'infrastructure', 'severe']) await say(id, t);
      const r = await say(id, 'Atlantis');
      expect(r.type).toBe('question');
      expect(r.invalid).toBe('__ward');
      expect(_sessions.get(id).ward).toBeNull();
    });

    test('too little to go on: asks for more instead of filing a one-word complaint', async () => {
      const id = sid();
      const r = await say(id, 'pothole');
      expect(r.type).toBe('question');
      expect(r.text).toMatch(/sentence or two/i);
    });

    test('each kind of answer is checked against the field metadata', () => {
      const f = (type, extra = {}) => ({ key: 'k', type, options: [], rule: '', plain: 'thing', ...extra });
      expect(_validateValue(f('choice', { options: ['Minor', 'Severe'] }), 'severe')).toEqual({ ok: true, value: 'Severe' });
      expect(_validateValue(f('choice', { options: ['Minor', 'Severe'] }), 'purple').ok).toBe(false);
      expect(_validateValue(f('number'), 'about 12').value).toBe('12');
      expect(_validateValue(f('number'), 'lots').ok).toBe(false);
      expect(_validateValue(f('date'), '12/11/2026').value).toBe('2026-11-12');
      expect(_validateValue(f('date'), 'whenever').ok).toBe(false);
      expect(_validateValue(f('email'), 'not-an-email').ok).toBe(false);
      expect(_validateValue(f('phone'), '12').ok).toBe(false);
      expect(_validateValue(f('longtext', { rule: 'required|min:20' }), 'too short').ok).toBe(false);
    });
  });

  // ── A failed action ────────────────────────────────────────────────────────
  describe('when sending fails', () => {
    test('says so honestly, leaves nothing half-saved, and a second yes works', async () => {
      const id = sid();
      let r;
      for (const t of ['The drain on our road is blocked and overflowing', 'sanitation', 'severe', WARD]) r = await say(id, t);
      await skipExtras(id, r);
      mockFail.next = true;
      r = await say(id, 'yes');
      expect(r.type).toBe('error');
      expect(r.text).toMatch(/could not send/i);
      expect(r.text).toMatch(/nothing was saved/i);
      expect(r.entity_id).toBeUndefined();
      expect(await recordsNamed('The drain on our road')).toHaveLength(0);
      expect(_sessions.get(id).phase).toBe('confirming');

      r = await say(id, 'yes');
      expect(r.type).toBe('submitted');
      expect(await recordsNamed('The drain on our road')).toHaveLength(1);
    });
  });

  // ── Rules enforced in code, whatever the model says ────────────────────────
  describe('enforcement', () => {
    beforeEach(() => { process.env.GEMINI_API_KEY = 'test-key'; });

    test('a service the model invents is ignored', async () => {
      mockGenerate.mockResolvedValue(reply({ intent: 'file', service_id: 987654, candidate_ids: [987654] }));
      const id = sid();
      const r = await say(id, 'please renew my parking permit');
      expect(['guidance', 'question']).toContain(r.type);
      expect(_sessions.get(id).service).toBeNull();
    });

    test('a real service the citizen may not start cannot be chosen', async () => {
      const donation = await prisma.entityType.findFirst({ where: { name: 'Donation Transaction' } });
      expect((await _loadServiceCatalog('citizen')).some((s) => s.id === donation.entity_type_id)).toBe(false);
      mockGenerate.mockResolvedValue(reply({ intent: 'file', service_id: donation.entity_type_id, candidate_ids: [donation.entity_type_id] }));
      const id = sid();
      await say(id, 'record a donation of 5000 rupees');
      expect(_sessions.get(id).service).toBeNull();
    });

    test('invented fields and invalid values from the model never reach the draft', async () => {
      const id = sid();
      mockGenerate
        .mockResolvedValueOnce(reply({ intent: 'file', service_id: grievance.entity_type_id, candidate_ids: [] }))
        .mockResolvedValueOnce(reply({ intent: 'answer', values: { category: 'Teleportation', is_admin: 'true', severity: 'Severe', reporter_phone: '99999 00000' }, area: 'Atlantis', place: null }));
      const r = await say(id, 'There is a pothole outside my building, it is severe');
      const draft = _sessions.get(id).draft;
      expect(draft.is_admin).toBeUndefined();
      expect(draft.category).toBeUndefined();     // not one of the options
      expect(draft.severity).toBe('Severe');      // valid, and the citizen said it
      expect(_sessions.get(id).ward).toBeNull();  // not a real area
      expect(r.type).toBe('question');
    });

    test('"yes" before the summary files nothing', async () => {
      delete process.env.GEMINI_API_KEY;
      const id = sid();
      await say(id, 'There is a pothole outside the library entrance');
      const r = await say(id, 'yes');
      expect(r.type).toBe('question');
      expect(await recordsNamed('Pothole outside the library')).toHaveLength(0);
    });

    test('a role with nothing to file is told so', async () => {
      delete process.env.GEMINI_API_KEY;
      const r = await continueFormFilling(sid(), 'There is a pothole outside my building', { user_id: director.user.user_id, role: 'director', name: 'D' });
      expect(r.type).toBe('guidance');
      expect(r.text).toMatch(/nothing you can file/i);
    });

    test('a session belongs to one person', async () => {
      delete process.env.GEMINI_API_KEY;
      const id = sid();
      await say(id, 'There is a pothole outside my building');
      const other = await createTestUser({ role: 'citizen' });
      const r = await continueFormFilling(id, 'yes', { user_id: other.user.user_id, role: 'citizen', name: 'Other' });
      expect(r.type).not.toBe('submitted');
      expect(_sessions.get(id).userId).toBe(other.user.user_id);
      expect(_sessions.get(id).service).toBeNull();
    });
  });

  // ── With the AI understanding the words ────────────────────────────────────
  describe('with AI', () => {
    beforeEach(() => { process.env.GEMINI_API_KEY = 'test-key'; });

    test('fewer questions: what plainly follows from the message is not asked', async () => {
      const id = sid();
      mockGenerate
        .mockResolvedValueOnce(reply({ intent: 'file', service_id: grievance.entity_type_id, candidate_ids: [] }))
        .mockResolvedValueOnce(reply({ intent: 'answer', values: { category: 'Infrastructure' }, area: WARD, place: 'outside my building' }));
      let r = await say(id, `There's a pothole outside my building in ${WARD}`);
      expect(r.type).toBe('question');
      expect(r.text).toMatch(/severity/i); // the only thing still unknown
      mockGenerate.mockResolvedValueOnce(reply({ intent: 'answer', values: { severity: 'Severe' }, area: null, place: null }));
      r = await say(id, 'it is pretty bad, cars keep swerving');
      // The spot is known ("outside my building"), so only the photo is asked for.
      expect(r.type).toBe('question');
      expect(r.text).toMatch(/photo/i);
      r = await say(id, 'no photo');
      expect(r.type).toBe('confirm');
      expect(_sessions.get(id).draft).toMatchObject({ category: 'Infrastructure', severity: 'Severe' });
    });

    // One message that names the service, category, severity and area, but no spot.
    const streetlight = () => mockGenerate
      .mockResolvedValueOnce(reply({ intent: 'file', service_id: grievance.entity_type_id, candidate_ids: [] }))
      .mockResolvedValueOnce(reply({ intent: 'answer', values: { category: 'Safety', severity: 'Moderate' }, area: WARD, place: null }));

    test('asks where exactly, then for a photo: once each, and both can be skipped or answered', async () => {
      const id = sid();
      streetlight();
      let r = await say(id, 'The streetlight is broken and the lane is dark at night');
      expect(r.type).toBe('question');
      expect(r.text).toMatch(/where exactly/i);
      expect(r.options.map((o) => o.value)).toEqual(['__share_location', 'skip']);

      r = await say(id, 'Near the old temple on Main Road');
      expect(r.type).toBe('question');
      expect(r.text).toMatch(/photo/i);
      expect(r.options.map((o) => o.value)).toEqual(['__attach_photo', 'no photo']);

      r = await say(id, 'no photo');
      expect(r.type).toBe('confirm');
      expect(r.text).toMatch(/Near the old temple on Main Road/);
      // Neither is asked again, even after a change at the summary.
      expect(_sessions.get(id)).toMatchObject({ askedPlace: true, askedPhoto: true });
    });

    test('"use where I am" keeps the shared map pin; "skip" leaves the spot out', async () => {
      const id = sid();
      streetlight();
      await say(id, 'The streetlight is broken and the lane is dark at night');
      let r = await say(id, "[User location: Pune (18.5204°N, 73.8567°E)] It's right where I am");
      expect(r.text).toMatch(/photo/i);
      expect(_sessions.get(id).coords).toEqual({ latitude: 18.5204, longitude: 73.8567 });

      const other = sid();
      streetlight();
      await say(other, 'The streetlight is broken and the lane is dark at night');
      r = await say(other, 'skip');
      expect(r.text).toMatch(/photo/i);
      expect(_sessions.get(other).place).toBeNull();
    });

    test('AI may reword a question, labelled as AI; the question itself stays the same', async () => {
      const id = sid();
      streetlight();
      const worded = 'Sorry to hear the streetlight is out. Where exactly is it, is there a landmark or street name nearby?';
      mockGenerate.mockResolvedValueOnce(reply({ text: worded }));
      const r = await say(id, 'The streetlight is broken and the lane is dark at night');
      expect(r.voice).toBe('ai');
      expect(r.text).toBe(worded);
      expect(_sessions.get(id).asked).toBe('__place');
      expect(r.options.map((o) => o.value)).toEqual(['__share_location', 'skip']);
    });

    test.each([
      ['a promise', 'We will fix this within 2 days. Where exactly is it?'],
      ['system words', 'Thanks, I have updated the form. Where exactly is it?'],
      ['a different question', 'Thanks for telling me. How severe is it?'],
      ['no question', 'Thanks, noted the broken streetlight.'],
    ])('AI wording with %s is thrown away and the rule-written question is used', async (_label, bad) => {
      const id = sid();
      streetlight();
      mockGenerate.mockResolvedValueOnce(reply({ text: bad }));
      const r = await say(id, 'The streetlight is broken and the lane is dark at night');
      expect(r.voice).toBe('rules');
      expect(r.text).toMatch(/Where exactly is it in/);
    });

    test.each([
      ['plain rewording', 'Thanks. Where exactly is it?', '', true],
      ['an invented "no one was hurt"', 'Glad no one was hurt. Where exactly is it?', 'two scooters fell', false],
      ['"hurt" when the resident said it', 'Sorry someone got hurt. Where exactly is it?', 'my neighbour got hurt', true],
      ['a judgement of seriousness', 'That sounds dangerous. Where exactly is it?', 'a pothole', false],
      ['a number nobody said', 'Thanks. Where exactly is it, near house 42?', 'a pothole', false],
    ])('wording check: %s', (_label, text, said, ok) => {
      const { acceptable } = require('../services/agentVoice');
      expect(acceptable(text, { subjectWords: ['where'], knownText: said, citizenSaid: said })).toBe(ok);
    });

    test('if the AI does not answer, the conversation carries on with rules', async () => {
      mockGenerate.mockImplementation(never);
      const id = sid();
      const started = Date.now();
      const r = await say(id, "There's a pothole outside my building");
      expect(Date.now() - started).toBeLessThan(1500);
      expect(r.type).toBe('question');
      expect(_sessions.get(id).service.id).toBe(grievance.entity_type_id);
      // It does not wait on the AI again straight away.
      const calls = mockGenerate.mock.calls.length;
      await say(id, 'infrastructure');
      expect(mockGenerate.mock.calls.length).toBe(calls);
    });
  });

  // ── Around the conversation ────────────────────────────────────────────────
  describe('status, attachments and the HTTP edge', () => {
    test('"what is happening with my requests" lists them with references', async () => {
      const r = await say(sid(), 'what is the status of my requests');
      expect(r.type).toBe('status');
      expect(r.text).toMatch(/PR-\d{5}/);
      expect(r.text).toMatch(/waiting for review/);
    });

    test('a photo sent during the conversation is attached to the record', async () => {
      const id = sid();
      const post = (message) => request(app).post('/agent/chat').set(citizen.headers).send({ sessionId: id, message });
      await post('The footpath tiles are broken near the market and people trip');
      const up = await request(app).post('/agent/chat').set(citizen.headers)
        .field('sessionId', id).field('message', '')
        .attach('attachment', Buffer.from('fake image bytes'), { filename: 'tiles.png', contentType: 'image/png' });
      expect(up.status).toBe(200);
      for (const t of ['infrastructure', 'moderate', WARD]) await post(t);
      const res = await post('yes');
      expect(res.body.data.type).toBe('submitted');
      expect(res.body.data.files).toEqual(['tiles.png']);
      const files = await prisma.fileRepository.findMany({ where: { entity_id: res.body.data.entity_id } });
      expect(files.map((f) => f.file_name)).toEqual(['tiles.png']);
    });

    test('matchFileToParameter picks the photo field for an image and the document field for a PDF', () => {
      const fields = [{ key: 'photo_evidence', label: 'Photo Evidence' }, { key: 'supporting_document', label: 'Supporting Document' }];
      expect(matchFileToParameter(fields, { mimeType: 'image/jpeg' }).key).toBe('photo_evidence');
      expect(matchFileToParameter(fields, { mimeType: 'application/pdf' }).key).toBe('supporting_document');
      expect(matchFileToParameter([], { mimeType: 'image/jpeg' })).toBeNull();
    });

    test('401 without a session; 400 for a missing session id, an empty or an over-long message', async () => {
      expect((await request(app).post('/agent/chat').set('X-Requested-With', 'ck-web').send({ sessionId: 'x', message: 'hi' })).status).toBe(401);
      expect((await request(app).post('/agent/chat').set(citizen.headers).send({ message: 'hi' })).status).toBe(400);
      expect((await request(app).post('/agent/chat').set(citizen.headers).send({ sessionId: 'x' })).status).toBe(400);
      expect((await request(app).post('/agent/chat').set(citizen.headers).send({ sessionId: 'x', message: 'a'.repeat(2001) })).status).toBe(400);
    });

    test('clearing a session forgets it', async () => {
      const id = sid();
      await say(id, 'There is a pothole outside my building');
      expect(_sessions.has(id)).toBe(true);
      clearSession(id);
      expect(_sessions.has(id)).toBe(false);
    });
  });
});
