/**
 * Case panel: checklist, flags, similar cases, one suggested action, cached AI
 * brief and the suggestion audit. Real local Postgres; only the Gemini SDK is mocked.
 */
const mockGenerate = jest.fn();
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn(() => ({ generateContent: (...args) => mockGenerate(...args) })),
  })),
}));

const request = require('supertest');
const app = require('../index');
const prisma = require('../db');
const { createTestUser, cleanupAll } = require('./helpers/authHelper');
const casePanel = require('../services/casePanel');

const answer = (obj) => ({ response: { text: () => JSON.stringify(obj) } });
const GOOD_BRIEF = { lines: ['A grievance about a broken streetlight was filed in Kothrud.', 'The reported severity is Severe and the category is Infrastructure.'] };

describe('Case panel', () => {
  let citizen, areaCoord, otherAreaCoord, director;
  let grievanceType, params, kothrudCase, otherCase;
  let savedKey;

  const param = (key) => params.find((p) => p.field_key === key);
  const setValue = async (entityId, key, value) => {
    const p = param(key);
    await prisma.parameterValue.deleteMany({ where: { entity_id: entityId, parameter_id: p.parameter_id } });
    if (value !== null) await prisma.parameterValue.create({ data: { entity_id: entityId, parameter_id: p.parameter_id, value } });
  };
  const makeCase = async (area, name) => {
    const entity = await prisma.entity.create({
      data: { name, area, status: 'submitted', entity_type_id: grievanceType.entity_type_id, owner_user_id: citizen.user.user_id },
    });
    await prisma.auditLog.create({
      data: { entity_id: entity.entity_id, actor_user_id: citizen.user.user_id, action: 'status_transition', user: 'Test Citizen', old_status: 'draft', new_status: 'submitted' },
    });
    await setValue(entity.entity_id, 'complaint_details', 'The streetlight outside the school gate has been broken for two weeks.');
    await setValue(entity.entity_id, 'category', 'Infrastructure');
    await setValue(entity.entity_id, 'severity', 'Severe');
    await setValue(entity.entity_id, 'reporter_name', 'Private Person');
    await setValue(entity.entity_id, 'reporter_phone', '9999900000');
    return entity;
  };
  const panel = (id, who) => request(app).get(`/entities/${id}/case-panel`).set(who.headers);
  const brief = (id, who) => request(app).post(`/entities/${id}/case-panel/brief`).set(who.headers);
  const statusOf = async (id) => (await prisma.entity.findUnique({ where: { entity_id: id } })).status;

  beforeAll(async () => {
    savedKey = process.env.GEMINI_API_KEY;
    process.env.GEMINI_API_KEY = 'test-key';
    citizen = await createTestUser({ role: 'citizen' });
    areaCoord = await createTestUser({ role: 'coordinator_area', assignedArea: 'Kothrud' });
    otherAreaCoord = await createTestUser({ role: 'coordinator_area', assignedArea: 'Shivajinagar' });
    director = await createTestUser({ role: 'director' });

    grievanceType = await prisma.entityType.findFirst({ where: { name: 'Grievance' } });
    params = await prisma.parameterMaster.findMany({
      where: { subsectionMaster: { sectionMaster: { formMaster: { entity_type_id: grievanceType.entity_type_id, status: 'active' } } } },
    });
    kothrudCase = await makeCase('Kothrud', 'Case panel test: broken streetlight');
    otherCase = await makeCase('Shivajinagar', 'Case panel test: other area');
  });

  afterAll(async () => {
    if (savedKey === undefined) delete process.env.GEMINI_API_KEY; else process.env.GEMINI_API_KEY = savedKey;
    await cleanupAll();
    await prisma.$disconnect();
  });

  beforeEach(() => {
    mockGenerate.mockReset();
    mockGenerate.mockResolvedValue(answer(GOOD_BRIEF));
  });

  describe('scope', () => {
    it('area coordinator opens a case in their area', async () => {
      const res = await panel(kothrudCase.entity_id, areaCoord);
      expect(res.status).toBe(200);
      expect(res.body.data.entity_id).toBe(kothrudCase.entity_id);
    });

    it("area coordinator cannot open another area's case: panel, brief, suggestion audit and deeper analysis all 403", async () => {
      const id = otherCase.entity_id;
      expect((await panel(id, areaCoord)).status).toBe(403);
      expect((await brief(id, areaCoord)).status).toBe(403);
      const audit = await request(app).post(`/entities/${id}/case-panel/suggestion`).set(areaCoord.headers).send({ suggestion_id: 1, outcome: 'dismissed' });
      expect(audit.status).toBe(403);
      expect((await request(app).post(`/entities/${id}/ai-analysis`).set(areaCoord.headers)).status).toBe(403);
      expect(mockGenerate).not.toHaveBeenCalled();
    });

    it('citizen (even the owner) gets 403; signed-out gets 401', async () => {
      expect((await panel(kothrudCase.entity_id, citizen)).status).toBe(403);
      expect((await request(app).get(`/entities/${kothrudCase.entity_id}/case-panel`)).status).toBe(401);
    });

    it('director opens any area', async () => {
      expect((await panel(otherCase.entity_id, director)).status).toBe(200);
    });
  });

  describe('checklist', () => {
    it('marks a missing document missing, and present once a file is attached', async () => {
      const before = (await panel(kothrudCase.entity_id, areaCoord)).body.data.checklist;
      const doc = before.find((i) => i.field_key === 'photo_evidence');
      expect(doc).toMatchObject({ kind: 'document', present: false, count: 0 });

      await prisma.fileRepository.create({
        data: { entity_id: kothrudCase.entity_id, parameter_id: param('photo_evidence').parameter_id, file_name: 'light.jpg', path: 'case-panel-test-light.jpg' },
      });
      const after = (await panel(kothrudCase.entity_id, areaCoord)).body.data.checklist;
      expect(after.find((i) => i.field_key === 'photo_evidence')).toMatchObject({ present: true, count: 1 });
      expect(after.find((i) => i.field_key === 'supporting_document')).toMatchObject({ present: false });
    });

    it('lists every mandatory field of the form with its real state', async () => {
      const list = (await panel(kothrudCase.entity_id, areaCoord)).body.data.checklist;
      const mandatoryKeys = params.filter((p) => p.mandatory).map((p) => p.field_key).sort();
      expect(list.filter((i) => i.required).map((i) => i.field_key).sort()).toEqual(mandatoryKeys);
      expect(list.filter((i) => i.required).every((i) => i.present)).toBe(true);
    });

    it('a required document that is missing is reported as required and missing (pure function)', () => {
      const parameters = [
        { parameter_id: 1, field_key: 'details', label: 'Details', field_type: 'textarea', mandatory: true },
        { parameter_id: 2, field_key: 'id_proof', label: 'ID proof', field_type: 'file', control_type: 'file', mandatory: true },
      ];
      const list = casePanel.buildChecklist(parameters, new Map([[1, 'text']]), new Map());
      expect(list).toEqual([
        { field_key: 'details', label: 'Details', kind: 'field', required: true, present: true },
        { field_key: 'id_proof', label: 'ID proof', kind: 'document', required: true, present: false, count: 0 },
      ]);
      const s = casePanel.suggestAction({ allowed: ['coordinator_approved', 'rejected'], checklist: list, flags: [] });
      expect(s.suggestion.to_status).toBe('rejected');
      expect(s.suggestion.reason).toContain('ID proof');
    });
  });

  describe('flags', () => {
    it('raises only configured rules, each with its source field and value', async () => {
      const data = (await panel(kothrudCase.entity_id, areaCoord)).body.data;
      expect(data.flag_rules_configured).toBeGreaterThan(0);
      expect(data.flags).toEqual([expect.objectContaining({ id: 'severity_high', source_field: 'severity', value: 'Severe' })]);

      await setValue(kothrudCase.entity_id, 'severity', 'Minor');
      expect((await panel(kothrudCase.entity_id, areaCoord)).body.data.flags).toEqual([]);
      await setValue(kothrudCase.entity_id, 'severity', 'Severe');
    });

    it('a module with no flag configuration raises nothing', () => {
      expect(casePanel.evaluateFlags([], { parameters: [], values: new Map(), builtIns: {}, status: 'submitted' })).toEqual([]);
    });
  });

  describe('similar cases', () => {
    it('returns same-module cases in the same area only', async () => {
      const twin = await makeCase('Kothrud', 'Case panel test: second Kothrud case');
      const data = (await panel(kothrudCase.entity_id, areaCoord)).body.data;
      const ids = data.similar_cases.map((c) => c.entity_id);
      expect(ids).toContain(twin.entity_id);
      expect(ids).not.toContain(otherCase.entity_id);
      expect(ids).not.toContain(kothrudCase.entity_id);
      expect(data.similar_cases.every((c) => c.area === 'Kothrud')).toBe(true);
    });
  });

  describe('suggested action', () => {
    it('is exactly one transition the coordinator is permitted to take', async () => {
      const data = (await panel(kothrudCase.entity_id, areaCoord)).body.data;
      expect(data.suggestion.to_status).toBe('coordinator_approved');
      expect(data.allowed_transitions).toContain(data.suggestion.to_status);
      expect(typeof data.suggestion.reason).toBe('string');
    });

    it('suggests rejecting, naming the item, when a required field is missing', async () => {
      await setValue(kothrudCase.entity_id, 'category', null);
      const data = (await panel(kothrudCase.entity_id, areaCoord)).body.data;
      expect(data.suggestion.to_status).toBe('rejected');
      expect(data.suggestion.reason).toMatch(/category/i);
      await setValue(kothrudCase.entity_id, 'category', 'Infrastructure');
    });

    it('a director is offered nothing on a case still with the coordinator', async () => {
      const data = (await panel(kothrudCase.entity_id, director)).body.data;
      expect(data.suggestion).toBeNull();
      expect(data.allowed_transitions).toEqual([]);
    });
  });

  describe('the AI cannot trigger a transition', () => {
    it('panel, brief and an "accepted" audit leave the status and the workflow history untouched', async () => {
      const id = kothrudCase.entity_id;
      // A model that tries to act.
      mockGenerate.mockResolvedValue(answer({ ...GOOD_BRIEF, to_status: 'approved', action: 'approve', transition: { to_status: 'approved' } }));
      const auditBefore = await prisma.auditLog.count({ where: { entity_id: id } });
      const historyBefore = await prisma.approvalHistory.count({ where: { entity_id: id } });

      const p = (await panel(id, areaCoord)).body.data;
      const b = await brief(id, areaCoord);
      expect(b.status).toBe(200);
      expect(Object.keys(b.body.data.brief).sort()).toEqual(['generated_at', 'lines', 'log_id', 'model', 'prompt_version']);
      const a = await request(app).post(`/entities/${id}/case-panel/suggestion`).set(areaCoord.headers)
        .send({ suggestion_id: p.suggestion.suggestion_id, outcome: 'accepted', to_status: 'approved' });
      expect(a.status).toBe(201);

      expect(await statusOf(id)).toBe('submitted');
      expect(await prisma.auditLog.count({ where: { entity_id: id } })).toBe(auditBefore);
      expect(await prisma.approvalHistory.count({ where: { entity_id: id } })).toBe(historyBefore);
    });
  });

  describe('brief', () => {
    let caseId;
    beforeAll(async () => { caseId = (await makeCase('Kothrud', 'Case panel test: brief cache')).entity_id; });

    it('viewing the panel makes no AI call', async () => {
      await panel(caseId, areaCoord);
      await panel(caseId, areaCoord);
      expect(mockGenerate).not.toHaveBeenCalled();
    });

    it('is generated once, served from cache after that, and regenerated when the record changes', async () => {
      const first = await brief(caseId, areaCoord);
      expect(first.body.data).toMatchObject({ cached: false, brief: { lines: GOOD_BRIEF.lines, prompt_version: casePanel.PROMPT_VERSION } });
      expect(mockGenerate).toHaveBeenCalledTimes(1);

      const second = await brief(caseId, areaCoord);
      expect(second.body.data.cached).toBe(true);
      expect(second.body.data.brief.log_id).toBe(first.body.data.brief.log_id);
      expect((await panel(caseId, areaCoord)).body.data.brief.lines).toEqual(GOOD_BRIEF.lines);
      expect(mockGenerate).toHaveBeenCalledTimes(1);

      await setValue(caseId, 'complaint_details', 'The streetlight was repaired but the pole is now leaning over the road.');
      const stale = (await panel(caseId, areaCoord)).body.data;
      expect(stale.brief).toBeNull();
      expect(stale.brief_pending).toBe(true);
      expect(mockGenerate).toHaveBeenCalledTimes(1);

      const third = await brief(caseId, areaCoord);
      expect(third.body.data.cached).toBe(false);
      expect(third.body.data.brief.log_id).not.toBe(first.body.data.brief.log_id);
      expect(mockGenerate).toHaveBeenCalledTimes(2);
    });

    it('sends the model only non-private record fields: no reporter name, phone or owner', async () => {
      await setValue(caseId, 'date_of_incident', '2026-11-01');
      await brief(caseId, areaCoord);
      const prompt = String(mockGenerate.mock.calls[0][0]);
      expect(prompt).toContain('leaning over the road');
      expect(prompt).not.toContain('Private Person');
      expect(prompt).not.toContain('9999900000');
      expect(prompt).not.toContain(citizen.user.email);
    });

    it('discards an answer that is not grounded (opinion words, or a number not in the record) and shows no brief', async () => {
      await setValue(caseId, 'reference_number', 'REF-1');
      mockGenerate.mockResolvedValue(answer({ lines: ['Rapid urbanization puts stakeholders at high risk here.', 'There are 47 affected households.'] }));
      const res = await brief(caseId, areaCoord);
      expect(res.status).toBe(200);
      expect(res.body.data.brief).toBeNull();
      expect(res.body.data.unavailable_reason).toMatch(/not grounded/);
      // and the failure is not retried on the next view
      const again = await brief(caseId, areaCoord);
      expect(again.body.data.brief).toBeNull();
      expect(mockGenerate).toHaveBeenCalledTimes(2); // one call plus its single retry
    });

    it('fails closed when the AI is down: no brief, the rest of the panel still works', async () => {
      await setValue(caseId, 'reference_number', 'REF-2');
      mockGenerate.mockRejectedValue(new Error('network down'));
      const res = await brief(caseId, areaCoord);
      expect(res.status).toBe(200);
      expect(res.body.data.brief).toBeNull();
      const p = await panel(caseId, areaCoord);
      expect(p.status).toBe(200);
      expect(p.body.data.checklist.length).toBeGreaterThan(0);
    });
  });

  describe('suggestion audit', () => {
    let caseId;
    const rows = () => prisma.aIExecutionLog.findMany({
      where: { entity_id: caseId, analysis_type: 'case_suggestion' }, orderBy: { ai_execution_log_id: 'asc' },
    });
    beforeAll(async () => { caseId = (await makeCase('Kothrud', 'Case panel test: audit')).entity_id; });

    it('writes one "shown" row per user and suggestion, with user, case, suggestion and versions', async () => {
      await panel(caseId, areaCoord);
      await panel(caseId, areaCoord);
      const list = await rows();
      expect(list).toHaveLength(1);
      expect(list[0]).toMatchObject({ status: 'shown', entity_id: caseId, requested_by_user_id: areaCoord.user.user_id });
      expect(list[0].prompt).toContain(casePanel.RULES_VERSION);
      expect(list[0].prompt).toContain(casePanel.PROMPT_VERSION);
      expect(JSON.parse(list[0].response)).toMatchObject({ to_status: 'coordinator_approved' });
      expect(list[0].created_date).toBeInstanceOf(Date);
    });

    it('records dismissed, edited (with the final reason) and accepted', async () => {
      const { suggestion } = (await panel(caseId, areaCoord)).body.data;
      const post = (body) => request(app).post(`/entities/${caseId}/case-panel/suggestion`).set(areaCoord.headers).send({ suggestion_id: suggestion.suggestion_id, ...body });

      expect((await post({ outcome: 'dismissed' })).status).toBe(201);
      expect((await panel(caseId, areaCoord)).body.data.suggestion.outcome).toBe('dismissed');
      expect((await post({ outcome: 'edited', final_reason: 'Checked on site.' })).status).toBe(201);
      expect((await post({ outcome: 'accepted' })).status).toBe(201);
      expect((await post({ outcome: 'executed' })).status).toBe(400);

      const list = await rows();
      expect(list.map((r) => r.status)).toEqual(['shown', 'dismissed', 'edited', 'accepted']);
      expect(list.every((r) => r.requested_by_user_id === areaCoord.user.user_id)).toBe(true);
      expect(JSON.parse(list[2].response)).toMatchObject({ final_reason: 'Checked on site.', suggestion_id: suggestion.suggestion_id });
    });

    it("another user cannot answer a suggestion shown to someone else", async () => {
      const shown = (await rows())[0];
      const res = await request(app).post(`/entities/${caseId}/case-panel/suggestion`).set(director.headers)
        .send({ suggestion_id: shown.ai_execution_log_id, outcome: 'accepted' });
      expect(res.status).toBe(404);
    });

    it('the coordinator acts through the workflow endpoint, and only that changes the status', async () => {
      const res = await request(app).post(`/entities/${caseId}/transition`).set(areaCoord.headers).send({ to_status: 'coordinator_approved' });
      expect(res.status).toBe(200);
      expect(await statusOf(caseId)).toBe('coordinator_approved');
    });
  });
});
