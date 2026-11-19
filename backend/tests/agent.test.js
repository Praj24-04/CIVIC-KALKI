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
  // Optional questions (the exact spot, a photo, and the form's optional details
  // such as since when or a call-back number) can each be skipped; these flows skip them.
  const isOptionalAsk = (id) => {
    const s = _sessions.get(id);
    if (!s || !s.asked) return false;
    if (['__place', '__photo'].includes(s.asked)) return true;
    const f = s.service && s.service.fields.find((x) => x.key === s.asked);
    return Boolean(f && !f.mandatory && f.chatAsk);
  };
  const skipExtras = async (id, r) => {
    let out = r;
    while (out.type === 'question' && isOptionalAsk(id)) out = await say(id, 'skip');
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
      while (res.body.data.type === 'question' && isOptionalAsk(id)) res = await post('skip');
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

    test('every question and the summary carry the live form card', async () => {
      const id = sid();
      let r = await say(id, 'The garbage bins on my street have not been emptied for a week');
      expect(r.progress.service).toBeTruthy();
      expect(r.progress.rows.find((row) => row.label === 'What').value).toMatch(/garbage bins/i);
      const before = r.progress.remaining;
      expect(before).toBeGreaterThan(0);
      r = await say(id, 'sanitation');
      expect(r.progress.remaining).toBe(before - 1);
      expect(r.progress.rows.map((row) => row.value)).toContain('Sanitation');
      for (const t of ['moderate', WARD]) r = await say(id, t);
      r = await skipExtras(id, r);
      expect(r.type).toBe('confirm');
      expect(r.progress.remaining).toBe(0);
      const cancelled = await say(id, 'cancel');
      expect(cancelled.progress).toBeUndefined();
    });

    test('two "yes" at the same moment (double tap) file one record', async () => {
      const id = sid();
      let r;
      for (const t of ['The water tank on our street has been leaking for days', 'utilities', 'moderate', WARD]) r = await say(id, t);
      r = await skipExtras(id, r);
      expect(r.type).toBe('confirm');
      const [a, b] = await Promise.all([say(id, 'yes'), say(id, 'yes')]);
      expect([a.type, b.type].sort()).toEqual(['busy', 'submitted']);
      expect(await recordsNamed('The water tank on our street')).toHaveLength(1);
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
  // ── Bugs seen in the home card (19 Nov) ──────────────────────────────────
  describe('one acknowledgement, and chip values are never words', () => {
    test('AI wording gets the bare question, so the reply never apologises or thanks twice', async () => {
      process.env.GEMINI_API_KEY = 'test-key';
      let voicePrompt = '';
      mockGenerate.mockImplementation(async (payload) => {
        const p = Array.isArray(payload) ? payload[0] : String(payload);
        if (p.includes('Decide what they want')) return reply({ intent: 'file', service_id: grievance.entity_type_id, candidate_ids: [] });
        if (p.includes('extract facts')) return reply({ intent: 'answer', values: {}, area: null, place: null });
        if (p.includes('voice of a city')) {
          voicePrompt = p;
          return reply({ text: 'Sorry to hear about the food. What exactly is happening with the food, what do you see?' });
        }
        return reply({ title: 'Food problem' });
      });
      const id = sid();
      const r = await say(id, 'i want to lodge a complaint about food issue');
      expect(_sessions.get(id).asked).toBe('__detail');
      const asked = voicePrompt.match(/MUST ASK EXACTLY THIS \(same meaning, nothing else\): "([^"]*)"/)[1];
      expect(asked).toMatch(/^What exactly is happening with the food\?/);
      expect(asked).not.toMatch(/sorry/i);
      expect(r.voice).toBe('ai');
      expect(r.text).toBe('Sorry to hear about the food. What exactly is happening with the food, what do you see?');
      expect((r.text.match(/sorry/gi) || []).length).toBe(1);
    });

    test('without usable AI wording, the engine says sorry once, then asks', async () => {
      const id = sid();
      let r = await say(id, 'i want to lodge a complaint about food issue');
      if (/Is that right\?/.test(r.text)) r = await say(id, 'yes'); // rules check which service first
      expect(r.text).toBe('I am sorry you are dealing with this. What exactly is happening with the food? Tell me what you see, in a sentence or two, so the team knows what to fix.');
    });

    test('"__attach_photo" sent as a message asks for the photo and is never filed as text', async () => {
      const id = sid();
      let r = await say(id, "There's a pothole outside my building");
      for (const t of ['infrastructure', 'severe', WARD]) r = await say(id, t);
      expect(_sessions.get(id).asked).toBe('__photo');
      const before = JSON.stringify(_sessions.get(id).draft);
      r = await say(id, '__attach_photo');
      expect(r.text).toMatch(/add the photo with the camera or paperclip/);
      expect(JSON.stringify(_sessions.get(id).draft)).toBe(before);
      expect(_sessions.get(id).said).not.toContain('__attach_photo');
    });
  });

  // ── The citizen's language (A2) ───────────────────────────────────────────
  describe("the citizen's language", () => {
    const L = require('../services/agentLanguage');
    // A scripted translator: Marathi = "[mr] " + the English, in Devanagari letters for the script check.
    const translateLike = (prefix) => async (payload) => {
      const p = Array.isArray(payload) ? payload[0] : String(payload);
      if (p.includes('Translate these messages')) {
        const items = JSON.parse(p.slice(p.indexOf('MESSAGES:') + 9, p.indexOf('Return JSON only')).trim());
        return reply({ translations: items.map((t) => `${prefix} ${t}`) });
      }
      if (p.includes('Decide what they want')) return reply({ intent: 'file', service_id: grievance.entity_type_id, candidate_ids: [] });
      if (p.includes('extract facts')) return reply({ intent: 'answer', values: {}, area: null, place: null });
      return reply({ text: 'not usable' });
    };
    beforeEach(() => { L._cache.clear(); process.env.GEMINI_API_KEY = 'test-key'; });

    test('the reply language follows what the citizen typed, then the language they picked', () => {
      expect(L.replyLanguage('mr', 'आमच्या सोसायटीत पाणी येत नाही')).toBe('mr');
      expect(L.replyLanguage('en', 'हमारी गली में पानी नहीं आ रहा')).toBe('hi'); // Devanagari, nothing picked
      expect(L.replyLanguage('en', 'எங்கள் தெருவில் விளக்கு எரியவில்லை')).toBe('ta');
      expect(L.replyLanguage('as', 'আমাৰ ৰাস্তাত পানী নাই')).toBe('as');
      expect(L.replyLanguage('mr', 'no water since 2 days')).toBe('mr'); // typed in English, Marathi picked
      expect(L.replyLanguage('xx', 'hello')).toBe('en');
    });

    test('text, chip labels and summary labels are translated; chip values and answers are not', async () => {
      mockGenerate.mockImplementation(translateLike('मराठी'));
      const out = await L.localizeReply({
        type: 'confirm', text: 'Here is what I will send. Ref PR-00042?', lead: 'Here is what I will send:',
        options: [{ label: 'Somewhere else', value: 'somewhere else' }],
        summary: [{ label: 'Severity', value: 'Severe' }],
      }, 'mr');
      expect(out.lang).toBe('mr');
      expect(out.text).toBe('मराठी Here is what I will send. Ref PR-00042?');
      expect(out.options).toEqual([{ label: 'मराठी Somewhere else', value: 'somewhere else' }]);
      expect(out.summary).toEqual([{ label: 'मराठी Severity', value: 'Severe' }]);
      // Cached: the same sentences again need no AI call.
      mockGenerate.mockClear();
      await L.localizeReply({ type: 'question', text: 'Here is what I will send. Ref PR-00042?' }, 'mr');
      expect(mockGenerate).not.toHaveBeenCalled();
    });

    test('a translation in the wrong script, or one that drops a number, is not shown', async () => {
      mockGenerate.mockImplementation(async () => reply({ translations: ['ಧನ್ಯವಾದಗಳು ಇದು ಯಾವ area?'] }));
      const wrongScript = await L.localizeReply({ type: 'question', text: 'Thanks. Which area is this in?' }, 'mr');
      expect(wrongScript.text).toBe('Thanks. Which area is this in?');
      expect(wrongScript.lang).toBeUndefined();
      mockGenerate.mockImplementation(async () => reply({ translations: ['तुमचा संदर्भ PR-00 आहे'] }));
      const lostNumber = await L.localizeReply({ type: 'submitted', text: 'Done. Your reference is PR-00042.' }, 'mr');
      expect(lostNumber.text).toBe('Done. Your reference is PR-00042.');
    });

    test('without AI, or in English, the reply is unchanged', async () => {
      delete process.env.GEMINI_API_KEY;
      const r = { type: 'question', text: 'Which area is this in?' };
      expect(await L.localizeReply(r, 'mr')).toBe(r);
      process.env.GEMINI_API_KEY = 'test-key';
      expect(await L.localizeReply(r, 'en')).toBe(r);
    });

    test('a whole conversation in Marathi: questions translated, the form still filled with its own choices', async () => {
      mockGenerate.mockImplementation(translateLike('मराठी'));
      const id = sid();
      const sayIn = (text) => continueFormFilling(id, text, citizenUser, [], null, { lang: 'mr' });
      let r = await sayIn("There's a pothole outside my building");
      expect(r.lang).toBe('mr');
      expect(r.text).toMatch(/^मराठी /);
      expect(r.options.map((o) => o.value)).toEqual(['Infrastructure', 'Sanitation', 'Safety', 'Utilities', 'Public Transport', 'Water Supply', 'Noise Pollution', 'Other']);
      r = await sayIn('Infrastructure'); // a tapped chip sends the English value
      expect(_sessions.get(id).draft.category).toBe('Infrastructure');
      expect(r.voice).toBe('rules'); // no English rewording on a translated reply
    });

    test('the chat route passes the picked language through', async () => {
      mockGenerate.mockImplementation(translateLike('मराठी'));
      const res = await request(app).post('/agent/chat').set(citizen.headers)
        .send({ sessionId: sid(), message: "There's a pothole outside my building", lang: 'mr' });
      expect(res.status).toBe(200);
      expect(res.body.data.lang).toBe('mr');
      const unknown = await request(app).post('/agent/chat').set(citizen.headers)
        .send({ sessionId: sid(), message: "There's a pothole outside my building", lang: 'klingon' });
      expect(unknown.body.data.lang).toBeUndefined(); // unknown language: English
    });
  });

  // ── Field roles and module settings come from metadata (A1a) ─────────────
  describe('field roles and module settings', () => {
    let custom; // a module built like the No-Code Builder would, with odd field names
    const made = {};

    beforeAll(async () => {
      const form0 = await prisma.formMaster.findFirst({ where: { entity_type_id: grievance.entity_type_id }, include: { sections: { include: { subsections: { include: { parameters: true } } } } } });
      const categoryId = form0.sections[0].subsections[0].parameters[0].category_id;
      const tag = Date.now();
      made.type = await prisma.entityType.create({ data: { domain_id: grievance.domain_id, name: `Tree Care ${tag}`, description: 'Report a fallen or dangerous tree, or a tree that needs trimming' } });
      made.form = await prisma.formMaster.create({ data: { entity_type_id: made.type.entity_type_id, form_name: 'Tree form' } });
      made.section = await prisma.sectionMaster.create({ data: { form_id: made.form.form_id, section_name: 'Main', display_order: 1 } });
      made.sub = await prisma.subsectionMaster.create({ data: { section_id: made.section.section_id, subsection_name: 'Main' } });
      const param = (field_key, label, field_type, mandatory, options, display_order) => prisma.parameterMaster.create({ data: {
        subsection_id: made.sub.subsection_id, category_id: categoryId, field_key, label, field_type, control_type: field_type, mandatory, options, display_order,
      } });
      await param('what_we_saw', 'Observation', 'textarea', true, { chat: { role: 'description' } }, 1);
      await param('how_risky', 'Risk Level', 'select', true, { choices: ['Low', 'Medium', 'High'], chat: { role: 'severity', question: 'How risky is it: Low, Medium or High?' } }, 2);
      await param('filed_by', 'Filed By', 'text', true, { chat: { role: 'person_name' } }, 3);
      await param('snap', 'Snap', 'file', false, { chat: { role: 'photo' } }, 4);
      await param('evidence_pdf', 'Evidence', 'file', false, null, 5); // named like a photo, but not one
      await prisma.workflowMaster.create({ data: { entity_type_id: made.type.entity_type_id, trigger: 'draft', action: 'submitted', stage: 'citizen' } });
      custom = made.type;
    });

    afterAll(async () => {
      const ids = (await prisma.entity.findMany({ where: { entity_type_id: made.type.entity_type_id }, select: { entity_id: true } })).map((e) => e.entity_id);
      await prisma.parameterValue.deleteMany({ where: { entity_id: { in: ids } } });
      await prisma.approvalHistory.deleteMany({ where: { entity_id: { in: ids } } });
      await prisma.auditLog.deleteMany({ where: { entity_id: { in: ids } } });
      await prisma.fileRepository.deleteMany({ where: { entity_id: { in: ids } } });
      await prisma.entity.deleteMany({ where: { entity_id: { in: ids } } });
      await prisma.parameterMaster.deleteMany({ where: { subsection_id: made.sub.subsection_id } });
      await prisma.subsectionMaster.delete({ where: { subsection_id: made.sub.subsection_id } });
      await prisma.sectionMaster.delete({ where: { section_id: made.section.section_id } });
      await prisma.formMaster.delete({ where: { form_id: made.form.form_id } });
      await prisma.workflowMaster.deleteMany({ where: { entity_type_id: made.type.entity_type_id } });
      await prisma.dashboardMaster.deleteMany({ where: { entity_type_id: made.type.entity_type_id } });
      await prisma.entityType.delete({ where: { entity_type_id: made.type.entity_type_id } });
    });

    const startCustom = async (id, text) => {
      await say(id, 'hello');
      const s = _sessions.get(id);
      s.phase = 'choosing'; s.choices = [custom.entity_type_id]; s.said = [text];
      return say(id, 'yes');
    };

    test('a module with roles needs no field-name conventions', async () => {
      const id = sid();
      let r = await startCustom(id, 'A big branch of the old tree has cracked and is hanging over the footpath');
      const svc = _sessions.get(id).service;
      expect(svc.roles.description.key).toBe('what_we_saw');
      expect(svc.roles.photo.key).toBe('snap'); // "Evidence" is not taken for the photo
      expect(_sessions.get(id).draft.what_we_saw).toMatch(/branch of the old tree/); // the description, by role
      expect(_sessions.get(id).draft.filed_by).toBe(citizen.user.name); // the name, by role
      expect(_sessions.get(id).asked).toBe('how_risky');
      expect(r.text).toMatch(/How risky is it: Low, Medium or High\?/);
      for (const [asked, answer] of [['how_risky', 'High'], ['__ward', WARD], ['__place', 'near the bus stop'], ['__photo', 'no photo']]) {
        expect(_sessions.get(id).asked).toBe(asked);
        r = await say(id, answer);
      }
      expect(r.type).toBe('confirm');
      r = await say(id, 'yes');
      expect(r.type).toBe('submitted');
    });

    test('a severity role is the citizen\'s to answer, whatever the field is called', async () => {
      process.env.GEMINI_API_KEY = 'test-key';
      mockGenerate.mockImplementation(async (payload) => {
        const p = Array.isArray(payload) ? payload[0] : String(payload);
        if (p.includes('extract facts')) return reply({ intent: 'answer', values: { how_risky: 'High' }, area: null, place: null });
        return reply({ text: 'x' });
      });
      const id = sid();
      await startCustom(id, 'A big branch of the old tree has cracked and is hanging over the footpath');
      expect(_sessions.get(id).draft.how_risky).toBeUndefined();
      expect(_sessions.get(id).asked).toBe('how_risky');
    });

    test('module settings can switch off the area, spot and photo questions; the record has no area then', async () => {
      const row = await prisma.dashboardMaster.create({ data: {
        entity_type_id: custom.entity_type_id, widget_name: 'assistant_config', metric: 'config', display_type: 'config',
        filter: JSON.stringify({ ask_area: false, ask_spot: false, ask_photo: false }),
      } });
      try {
        const id = sid();
        let r = await startCustom(id, 'A big branch of the old tree has cracked and is hanging over the footpath');
        const asked = [];
        for (let i = 0; i < 6 && r.type === 'question'; i += 1) { asked.push(_sessions.get(id).asked); r = await say(id, 'High'); }
        expect(asked).toEqual(['how_risky']);
        expect(r.type).toBe('confirm');
        r = await say(id, 'yes');
        expect(r.type).toBe('submitted');
        expect(r.text).not.toMatch(/area coordinator/);
        const e = await prisma.entity.findUnique({ where: { entity_id: r.entity_id } });
        expect(e.area).toBeNull();
        expect(e.jurisdiction_id).toBeNull();
      } finally {
        await prisma.dashboardMaster.delete({ where: { dashboard_id: row.dashboard_id } });
      }
    });

    test('a profile photo is not mistaken for a photo of a problem', async () => {
      const passport = await prisma.entityType.findFirst({ where: { name: 'Citizen Passport' } });
      const catalog = await _loadServiceCatalog('citizen');
      const svc = catalog.find((x) => x.id === passport.entity_type_id);
      expect(svc).toBeTruthy();
      const { _describeService } = require('../services/agentFormFiller');
      const described = _describeService(svc);
      expect(described.roles.photo).toBeNull();
      expect(described.asks).toEqual({ area: false, spot: false, photo: false });
    });
  });

  // ── What a coordinator needs (19 Nov) ────────────────────────────────────
  describe('what a coordinator needs', () => {
    const { _soundsLike, _isThin } = require('../services/agentFormFiller');
    const answer = async (id, r, plan) => {
      let out = r;
      for (let i = 0; i < 14 && out.type === 'question'; i += 1) {
        const asked = _sessions.get(id).asked;
        out = await say(id, plan[asked] !== undefined ? plan[asked] : 'skip');
      }
      return out;
    };

    test('a topic alone is not a complaint: it asks what exactly is happening, first', async () => {
      expect(_isThin('i want to lodge a complain regarding water')).toBe(true);
      expect(_isThin('I have a complaint about the road')).toBe(true);
      expect(_isThin('no water in our taps since Monday')).toBe(false);
      expect(_isThin("There's a pothole outside my building")).toBe(false);

      const id = sid();
      let r = await say(id, 'i want to lodge a complain regarding water');
      expect(_sessions.get(id).asked).toBe('__detail');
      expect(r.text).toMatch(/What exactly is happening with the water\?/);
      r = await say(id, 'no water is coming in our taps since 2 days, the whole building is without water');
      expect(r.text).toMatch(/^Thanks, that helps\./);
      expect(_sessions.get(id).draft.complaint_details).toBe('no water is coming in our taps since 2 days, the whole building is without water');
    });

    test('the "yes" that confirms which service is never added to the complaint', async () => {
      const id = sid();
      await say(id, 'hello');
      const s = _sessions.get(id);
      s.phase = 'choosing';
      s.choices = [grievance.entity_type_id];
      s.said = ['i want to lodge a complain regarding water'];
      let r = await say(id, 'yes');
      expect(_sessions.get(id).asked).toBe('__detail');
      r = await say(id, 'the pipeline near our gate burst and water is flowing on the road');
      expect(_sessions.get(id).draft.complaint_details).not.toMatch(/\byes\b/i);
      expect(_sessions.get(id).draft.complaint_details).toBe('the pipeline near our gate burst and water is flowing on the road');
    });

    test('the record carries what a coordinator needs: since when, who is affected, the spot, a call-back number', async () => {
      const id = sid();
      let r = await say(id, 'no water is coming in our taps since 2 days, the whole building is without water');
      r = await answer(id, r, {
        category: 'Water Supply', severity: 'Severe', __ward: WARD, __place: 'near the main gate', __photo: 'no photo',
        date_of_incident: 'since 2 days', affected_scope: 'My building or society', reporter_phone: '98765 43210',
      });
      expect(r.type).toBe('confirm');
      const twoDaysAgo = new Date(Date.now() - 2 * 86400000);
      const iso = new Date(twoDaysAgo.getTime() - twoDaysAgo.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      expect(_sessions.get(id).draft).toMatchObject({
        category: 'Water Supply', severity: 'Severe', date_of_incident: iso,
        affected_scope: 'My building or society', reporter_phone: '98765 43210',
      });
      r = await say(id, 'yes');
      const e = await prisma.entity.findUnique({ where: { entity_id: r.entity_id }, include: { parameterValues: { include: { parameterMaster: true } } } });
      const values = Object.fromEntries(e.parameterValues.map((v) => [v.parameterMaster.field_key, v.value]));
      expect(values).toMatchObject({ affected_scope: 'My building or society', date_of_incident: iso });
      expect(e.location).toBe('near the main gate');
    });

    test('"outside my building" is a place, not an answer to "who is affected"', async () => {
      const id = sid();
      await say(id, "There's a pothole outside my building");
      expect(_sessions.get(id).draft.affected_scope).toBeUndefined();
      expect(_sessions.get(id).place).toMatch(/my building/);
    });

    test('a topic answer gets its topic added when the answer does not name it', async () => {
      const id = sid();
      await say(id, 'i want to lodge a complain regarding water');
      await say(id, 'it has been dirty and smelly for three days now');
      expect(_sessions.get(id).draft.complaint_details).toBe('Water: it has been dirty and smelly for three days now');
    });

    test('every optional question can be skipped, and comes after the problem questions', async () => {
      const id = sid();
      let r = await say(id, "There's a pothole outside my building");
      const order = [];
      for (let i = 0; i < 14 && r.type === 'question'; i += 1) {
        const asked = _sessions.get(id).asked;
        order.push(asked);
        r = await say(id, { category: 'Infrastructure', severity: 'Severe', __ward: WARD }[asked] || 'skip');
      }
      expect(r.type).toBe('confirm');
      expect(order.slice(-3)).toEqual(['date_of_incident', 'affected_scope', 'reporter_phone']);
      expect(order.indexOf('__photo')).toBeLessThan(order.indexOf('date_of_incident'));
    });

    test('a description given as a choice answer is kept as detail, and the choice is asked again', async () => {
      const id = sid();
      let r = await say(id, "There's a pothole outside my building");
      r = await say(id, 'infrastructure');
      expect(_sessions.get(id).asked).toBe('severity');
      r = await say(id, 'two scooters slipped there last night and it fills with water when it rains');
      expect(r.text).toMatch(/^Thanks, I have added that to the details\./);
      expect(_sessions.get(id).asked).toBe('severity');
      expect(_sessions.get(id).draft.complaint_details).toMatch(/two scooters slipped there last night/);
    });

    test('area names are forgiving: spacing, extra words, small typos; a near miss asks "did you mean"', async () => {
      const id = sid();
      let r = await say(id, "There's a pothole outside my building");
      for (const t of ['infrastructure', 'severe']) r = await say(id, t);
      expect(_sessions.get(id).asked).toBe('__ward');
      const spaced = WARD.replace(/^Testward/, 'test ward '); // "test ward 1795…" = "Testward1795…"
      r = await say(id, `its in ${spaced}`);
      expect(_sessions.get(id).ward.name).toBe(WARD);

      const { closeWards, findWard } = require('../services/agentIntentRouter');
      const W = ['Kothrud', 'Shivajinagar', 'Aundh', 'Hadapsar'].map((name, i) => ({ id: i, name }));
      expect(findWard('its in shivaji nagar', W).name).toBe('Shivajinagar');
      expect(findWard('shivajinagr', W).name).toBe('Shivajinagar');
      expect(findWard('kothrood', W)).toBeNull();
      expect(closeWards('kothrood', W).map((w) => w.name)).toEqual(['Kothrud']);
      expect(closeWards('Atlantis', W)).toEqual([]);
    });

    test('a service description that is not an action is not read out as one', () => {
      expect(_soundsLike({ label: 'Automatically created or submitted grievance issue', name: 'Grievance' }))
        .toBe('It sounds like this is a grievance request.');
      expect(_soundsLike({ label: 'Report a problem that needs fixing', name: 'Grievance' }))
        .toBe('It sounds like you want to report a problem that needs fixing.');
    });
  });

  // ── Area question, title and speed (19 Nov) ───────────────────────────────
  describe('area question, title and speed', () => {
    const { _loadWards, _ruleSubject } = require('../services/agentFormFiller');
    const { acceptableTitle } = require('../services/agentVoice');
    const toWard = async (id, first) => {
      let r = await say(id, first);
      for (const t of ['infrastructure', 'severe']) if (r.type === 'question' && _sessions.get(id).asked !== '__ward') r = await say(id, t);
      return r;
    };

    test('without the phone\'s location, the area is asked openly, with no list of names', async () => {
      const id = sid();
      const r = await toWard(id, "There's a pothole outside my building");
      expect(_sessions.get(id).asked).toBe('__ward');
      expect(r.text).toMatch(/^(Thanks\. )?Which area or neighbourhood is this in\?$/);
      expect(r.options).toBeUndefined();
      expect(r.text).not.toContain(WARD);
      // Only an answer that matches no area brings up the areas this city covers.
      const miss = await say(id, 'Atlantis');
      expect(miss.text).toMatch(/I could not find "Atlantis" among the areas we cover/);
    });

    test('with the phone\'s location, the area it is in is offered; "somewhere else" asks openly and is remembered', async () => {
      const id = sid();
      const tag = `[User location: ${WARD}, Some City (18.5000°N, 73.8000°E)] `;
      let r = await say(id, `${tag}There's a pothole outside my building`);
      for (const t of ['infrastructure', 'severe']) if (_sessions.get(id).asked !== '__ward') r = await say(id, tag + t);
      expect(r.text).toMatch(new RegExp(`You seem to be in ${WARD}`));
      expect(r.options.map((o) => o.value)).toEqual([WARD, 'somewhere else']);
      r = await say(id, `${tag}somewhere else`);
      expect(r.text).toMatch(/Which area or neighbourhood is this in\?/);
      expect(r.options).toBeUndefined();
      r = await say(id, `${tag}${OTHER_WARD}`);
      expect(_sessions.get(id).ward.name).toBe(OTHER_WARD);
    });

    test('a country or state with nothing under it is never offered as an area', async () => {
      const lone = await prisma.jurisdictionMaster.create({ data: { name: `Lonecountry${Date.now()}`, type: 'country', status: 'active' } });
      try {
        const names = (await _loadWards()).map((w) => w.name);
        expect(names).not.toContain(lone.name);
        expect(names).toContain(WARD); // a top-level ward still counts
      } finally {
        await prisma.jurisdictionMaster.delete({ where: { jurisdiction_id: lone.jurisdiction_id } });
      }
    });

    test('the title names the problem, not "I want to lodge a complaint…"', () => {
      expect(_ruleSubject('I want to lodge a complaint regarding food issue')).toBe('food issue');
      expect(_ruleSubject('Hello sir, I would like to report that the streetlight near my house is broken')).toBe('streetlight near my house is broken');
      expect(_ruleSubject('I have a complaint about the garbage not collected for a week')).toBe('garbage not collected for a week');
      expect(_ruleSubject('The drain on our road is blocked')).toBe('The drain on our road is blocked');
    });

    test('the filed record carries the generated title and the area', async () => {
      const id = sid();
      let r = await toWard(id, 'I want to lodge a complaint regarding the pothole outside my building gate');
      r = await skipExtras(id, await say(id, WARD));
      expect(r.type).toBe('confirm');
      expect(r.summary[0]).toEqual({ label: 'What', value: `Pothole outside my building gate in ${WARD}` });
      r = await say(id, 'yes');
      const e = await prisma.entity.findUnique({ where: { entity_id: r.entity_id } });
      expect(e.name).toBe(`Pothole outside my building gate in ${WARD}`);
    });

    describe('with AI', () => {
      const kinds = [];
      let title = 'Pothole near the building gate';
      beforeEach(() => {
        process.env.GEMINI_API_KEY = 'test-key';
        kinds.length = 0;
        title = 'Pothole near the building gate';
        mockGenerate.mockImplementation(async (payload) => {
          const p = Array.isArray(payload) ? payload[0] : String(payload);
          const kind = p.includes('Decide what they want') ? 'choose' : p.includes('extract facts') ? 'read' : p.includes('voice of a city') ? 'voice' : p.includes('short title') ? 'title' : 'other';
          kinds.push(kind);
          if (kind === 'choose') return reply({ intent: 'file', service_id: grievance.entity_type_id, candidate_ids: [] });
          if (kind === 'read') return reply({ intent: 'answer', values: {}, area: null, place: null });
          if (kind === 'title') return reply({ title });
          return reply({ text: 'not a usable wording' });
        });
      });

      test('a tapped choice, "skip" or an area name is answered without any AI call', async () => {
        const id = sid();
        let r = await say(id, 'I want to lodge a complaint regarding the pothole outside my building gate');
        expect(kinds).toEqual(expect.arrayContaining(['choose', 'read']));
        for (const t of ['Infrastructure', 'Severe', WARD, 'skip', 'no photo', 'skip', 'skip', 'skip']) {
          if (r.type === 'confirm') break;
          kinds.length = 0;
          r = await say(id, t);
          expect(kinds).toEqual([]);
        }
        expect(r.type).toBe('confirm');
      });

      test('an AI title is used, labelled, and is exactly what gets filed', async () => {
        const id = sid();
        let r = await say(id, 'I want to lodge a complaint regarding the pothole outside my building gate');
        for (const t of ['Infrastructure', 'Severe', WARD, 'skip', 'no photo', 'skip', 'skip', 'skip']) if (r.type !== 'confirm') r = await say(id, t);
        expect(r.type).toBe('confirm');
        expect(r.summary[0]).toEqual({ label: 'What (title worded by AI)', value: `Pothole near the building gate in ${WARD}` });
        r = await say(id, 'yes');
        const e = await prisma.entity.findUnique({ where: { entity_id: r.entity_id } });
        expect(e.name).toBe(`Pothole near the building gate in ${WARD}`);
      });

      test('severity is the citizen\'s to say: an AI guess from the description is not used', async () => {
        mockGenerate.mockImplementation(async (payload) => {
          const p = Array.isArray(payload) ? payload[0] : String(payload);
          if (p.includes('Decide what they want')) return reply({ intent: 'file', service_id: grievance.entity_type_id, candidate_ids: [] });
          if (p.includes('extract facts')) {
            expect(p).toContain(`TODAY IS: ${new Date().toISOString().slice(0, 10)}`);
            return reply({ intent: 'answer', values: { category: 'Infrastructure', severity: 'Critical' }, area: WARD, place: null });
          }
          return reply({ text: 'x' });
        });
        const id = sid();
        const r = await say(id, 'big pothole on the main road');
        expect(_sessions.get(id).draft.category).toBe('Infrastructure');
        expect(_sessions.get(id).draft.severity).toBeUndefined();
        expect(_sessions.get(id).asked).toBe('severity');
        expect(r.text).toMatch(/severity/i);
      });

      test('an answer in own words to a choice is read by the AI even during the pause after an AI failure', async () => {
        const id = sid();
        let r = await say(id, 'I want to lodge a complaint regarding the pothole outside my building gate');
        r = await say(id, 'Infrastructure');
        expect(_sessions.get(id).asked).toBe('severity');
        _sessions.get(id).lastAiFailure = Date.now(); // the AI just failed: rules for a minute
        mockGenerate.mockImplementation(async (payload) => {
          const p = Array.isArray(payload) ? payload[0] : String(payload);
          kinds.push(p.includes('extract facts') ? 'read' : 'other');
          if (p.includes('extract facts')) return reply({ intent: 'answer', values: { severity: 'Severe' }, area: null, place: null });
          return reply({ text: 'x' });
        });
        kinds.length = 0;
        r = await say(id, 'pretty bad, two bikes fell yesterday');
        expect(kinds).toContain('read');
        expect(_sessions.get(id).draft.severity).toBe('Severe');
      });

      test('an AI title that talks about complaining, names a person or makes a claim is thrown away', async () => {
        title = 'Complaint regarding pothole';
        const id = sid();
        let r = await say(id, 'I want to lodge a complaint regarding the pothole outside my building gate');
        for (const t of ['Infrastructure', 'Severe', WARD, 'skip', 'no photo', 'skip', 'skip', 'skip']) if (r.type !== 'confirm') r = await say(id, t);
        expect(r.summary[0]).toEqual({ label: 'What', value: `Pothole outside my building gate in ${WARD}` });

        expect(acceptableTitle('Overflowing garbage bins on main road')).toBe(true);
        expect(acceptableTitle('Pothole reported by Asha Patil', { personNames: ['Asha Patil'] })).toBe(false);
        expect(acceptableTitle('Dangerous pothole', { citizenSaid: 'a pothole' })).toBe(false);
        expect(acceptableTitle('Pothole to be fixed within 2 days')).toBe(false);
        expect(acceptableTitle('I want to report a pothole')).toBe(false);
      });
    });
  });

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
      r = await skipExtras(id, await say(id, 'no photo'));
      expect(r.type).toBe('confirm');
      expect(_sessions.get(id).draft).toMatchObject({ category: 'Infrastructure', severity: 'Severe' });
    });

    // One message that names the service, category, severity and area, but no spot.
    // The resident states the severity themselves ("a moderate problem"): an AI
    // guess of how serious it is would not be used.
    const streetlight = () => mockGenerate
      .mockResolvedValueOnce(reply({ intent: 'file', service_id: grievance.entity_type_id, candidate_ids: [] }))
      .mockResolvedValueOnce(reply({ intent: 'answer', values: { category: 'Safety', severity: 'Moderate' }, area: WARD, place: null }));

    test('asks where exactly, then for a photo: once each, and both can be skipped or answered', async () => {
      const id = sid();
      streetlight();
      let r = await say(id, 'The streetlight is broken and the lane is dark at night, a moderate problem');
      expect(r.type).toBe('question');
      expect(r.text).toMatch(/where exactly/i);
      expect(r.options.map((o) => o.value)).toEqual(['__share_location', 'skip']);

      r = await say(id, 'Near the old temple on Main Road');
      expect(r.type).toBe('question');
      expect(r.text).toMatch(/photo/i);
      expect(r.options.map((o) => o.value)).toEqual(['__attach_photo', 'no photo']);

      r = await skipExtras(id, await say(id, 'no photo'));
      expect(r.type).toBe('confirm');
      expect(r.text).toMatch(/Near the old temple on Main Road/);
      // Neither is asked again, even after a change at the summary.
      expect(_sessions.get(id)).toMatchObject({ askedPlace: true, askedPhoto: true });
    });

    test('"use where I am" keeps the shared map pin; "skip" leaves the spot out', async () => {
      const id = sid();
      streetlight();
      await say(id, 'The streetlight is broken and the lane is dark at night, a moderate problem');
      let r = await say(id, "[User location: Pune (18.5204°N, 73.8567°E)] It's right where I am");
      expect(r.text).toMatch(/photo/i);
      expect(_sessions.get(id).coords).toEqual({ latitude: 18.5204, longitude: 73.8567 });

      const other = sid();
      streetlight();
      await say(other, 'The streetlight is broken and the lane is dark at night, a moderate problem');
      r = await say(other, 'skip');
      expect(r.text).toMatch(/photo/i);
      expect(_sessions.get(other).place).toBeNull();
    });

    test('AI may reword a question, labelled as AI; the question itself stays the same', async () => {
      const id = sid();
      streetlight();
      const worded = 'Sorry to hear the streetlight is out. Where exactly is it, is there a landmark or street name nearby?';
      mockGenerate.mockResolvedValueOnce(reply({ text: worded }));
      const r = await say(id, 'The streetlight is broken and the lane is dark at night, a moderate problem');
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
      const r = await say(id, 'The streetlight is broken and the lane is dark at night, a moderate problem');
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
      let last;
      for (const t of ['infrastructure', 'moderate', WARD]) last = await post(t);
      while (last.body.data.type === 'question' && isOptionalAsk(id)) last = await post('skip');
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
