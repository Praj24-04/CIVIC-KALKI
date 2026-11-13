/**
 * CIVIC-KALKI — Case panel (coordinator view of one record)
 *
 * Everything here is deterministic and read from the record or from metadata,
 * except the brief, which is the only AI output:
 *   - checklist   required fields and documents (ParameterMaster) with present/missing
 *   - flags       only rules configured in DashboardMaster 'case_flag_config'
 *   - similar     same module, same area, filed within SIMILAR_WINDOW_DAYS
 *   - suggestion  exactly one workflow transition the caller is permitted to take
 *   - brief       2-3 lines written by the model from the record only, cached
 *
 * Nothing in this file changes a record's status. The suggestion is a pointer to
 * POST /entities/:id/transition, which the coordinator calls themselves.
 */

'use strict';

const crypto = require('crypto');
const prisma = require('../db');
const aiClient = require('./aiClient');
const { getWorkflowMasterRules, validateWorkflowTransition } = require('./workflowEngine');
const { isPrivateField, STAFF_ROLES } = require('./entityAccess');

const PROMPT_VERSION = 'case-brief/v1';
const RULES_VERSION = 'case-rules/v1';
const FLAG_CONFIG_WIDGET = 'case_flag_config';
const SIMILAR_WINDOW_DAYS = 30;
const SIMILAR_LIMIT = 5;
const BRIEF_RETRY_AFTER_MS = 10 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const BRIEF_TYPE = 'case_brief';
const SUGGESTION_TYPE = 'case_suggestion';
const OUTCOMES = ['accepted', 'edited', 'dismissed'];

function httpError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

const norm = (v) => String(v === null || v === undefined ? '' : v).trim();
const lower = (v) => norm(v).toLowerCase();

// ── Scope ────────────────────────────────────────────────────────────────────

/**
 * Who may open the panel for this record. Same boundaries the workflow engine
 * applies to approvals: an area coordinator only their own area, the general
 * coordinator only records with no area, director and admin any record.
 */
function assertCasePanelScope(entity, user) {
  if (!user || !user.user_id) throw httpError('Authentication is required.', 401);
  if (!STAFF_ROLES.includes(user.role)) throw httpError('You do not have permission to perform this action.', 403);
  const area = norm(entity.area);
  if (user.role === 'coordinator_area') {
    const assigned = norm(user.assignedArea || user.assigned_area);
    if (!area || !assigned || area !== assigned) {
      throw httpError('This case is outside your assigned area.', 403);
    }
  } else if (user.role === 'coordinator_general') {
    if (area && area !== 'Unassigned') throw httpError('This case belongs to an area coordinator.', 403);
  }
  return true;
}

// ── Loading ──────────────────────────────────────────────────────────────────

async function loadCase(entityId) {
  const entity = await prisma.entity.findUnique({
    where: { entity_id: Number(entityId) },
    include: {
      entityType: true,
      parameterValues: true,
      fileRepositories: { select: { file_id: true, parameter_id: true } },
      auditLogs: { orderBy: { audit_id: 'asc' } },
    },
  });
  if (!entity || lower(entity.status) === 'deleted') {
    throw httpError(`Entity with id ${entityId} was not found.`, 404);
  }
  return entity;
}

/** The fields of the module's current form, in display order. */
async function loadFormParameters(entityTypeId) {
  const forms = await prisma.formMaster.findMany({
    where: { entity_type_id: Number(entityTypeId) },
    orderBy: { form_id: 'desc' },
    include: {
      sections: {
        orderBy: { display_order: 'asc' },
        include: { subsections: { include: { parameters: { orderBy: { display_order: 'asc' } } } } },
      },
    },
  });
  const form = forms.find((f) => lower(f.status) === 'active') || forms[0];
  if (!form) return [];
  return form.sections.flatMap((s) => s.subsections.flatMap((ss) => ss.parameters));
}

const isFileParam = (p) => [lower(p.field_type), lower(p.control_type)].some((t) => ['file', 'image'].includes(t));
const isLocationParam = (p) => lower(p.field_type) === 'location' || lower(p.control_type) === 'location';

function indexCase(entity) {
  const values = new Map();
  for (const v of entity.parameterValues || []) values.set(v.parameter_id, norm(v.value));
  const files = new Map();
  for (const f of entity.fileRepositories || []) files.set(f.parameter_id, (files.get(f.parameter_id) || 0) + 1);
  return { values, files };
}

// ── Checklist (deterministic) ────────────────────────────────────────────────

/**
 * Required fields and every document slot of the form, each present or missing.
 * A field that only applies when another field has a given value (options.depends_on)
 * is left out while that condition is not met.
 */
function buildChecklist(parameters, values, files) {
  const byKey = new Map(parameters.map((p) => [p.field_key, p]));
  const items = [];
  for (const p of parameters) {
    const isDoc = isFileParam(p);
    if (!p.mandatory && !isDoc) continue;
    const dep = p.options && p.options.depends_on;
    if (dep && dep.field_key) {
      const controller = byKey.get(dep.field_key);
      const actual = controller ? values.get(controller.parameter_id) : '';
      if (lower(actual) !== lower(dep.value)) continue;
    }
    const count = isDoc ? (files.get(p.parameter_id) || 0) : 0;
    items.push({
      field_key: p.field_key,
      label: p.label || p.field_key,
      kind: isDoc ? 'document' : 'field',
      required: Boolean(p.mandatory),
      present: isDoc ? count > 0 : Boolean(values.get(p.parameter_id)),
      ...(isDoc ? { count } : {}),
    });
  }
  return items;
}

// ── Flags (configured rules only) ────────────────────────────────────────────

async function loadFlagConfig(entityTypeId) {
  const row = await prisma.dashboardMaster.findFirst({
    where: { entity_type_id: Number(entityTypeId), widget_name: FLAG_CONFIG_WIDGET },
    orderBy: { dashboard_id: 'desc' },
  });
  if (!row || !row.filter) return [];
  try {
    const parsed = JSON.parse(row.filter);
    return Array.isArray(parsed.flags) ? parsed.flags : [];
  } catch (err) {
    return []; // unreadable configuration raises nothing
  }
}

const BUILT_IN_FIELDS = {
  days_in_status: 'Days at current status',
  days_since_filed: 'Days since filed',
  similar_cases: `Similar cases (same area, ${SIMILAR_WINDOW_DAYS} days)`,
};

function compare(op, actual, expected) {
  const num = (v) => (norm(v) === '' || Number.isNaN(Number(v)) ? null : Number(v));
  switch (op) {
    case 'eq': return lower(actual) === lower(expected);
    case 'in': return Array.isArray(expected) && expected.map(lower).includes(lower(actual));
    case 'empty': return norm(actual) === '';
    case 'gt': case 'gte': case 'lt': case 'lte': {
      const a = num(actual); const e = num(expected);
      if (a === null || e === null) return false;
      return op === 'gt' ? a > e : op === 'gte' ? a >= e : op === 'lt' ? a < e : a <= e;
    }
    default: return false; // unknown operator raises nothing
  }
}

/**
 * Evaluate the configured rules against the record. A flag is raised only when a
 * rule matches, and it carries the field and value it was raised from.
 */
function evaluateFlags(rules, { parameters, values, builtIns, status }) {
  const byKey = new Map(parameters.map((p) => [p.field_key, p]));
  const raised = [];
  for (const rule of rules || []) {
    if (!rule || !rule.field || !rule.op) continue;
    if (Array.isArray(rule.statuses) && !rule.statuses.map(lower).includes(lower(status))) continue;
    let actual; let sourceLabel;
    if (Object.prototype.hasOwnProperty.call(BUILT_IN_FIELDS, rule.field)) {
      actual = builtIns[rule.field];
      sourceLabel = BUILT_IN_FIELDS[rule.field];
    } else {
      const p = byKey.get(rule.field);
      if (!p) continue; // rule names a field this form does not have
      actual = values.get(p.parameter_id) || '';
      sourceLabel = p.label || p.field_key;
    }
    if (actual === null || actual === undefined) continue;
    if (!compare(rule.op, actual, rule.value)) continue;
    raised.push({
      id: rule.id || `${rule.field}:${rule.op}`,
      label: rule.label || `${sourceLabel} ${rule.op} ${Array.isArray(rule.value) ? rule.value.join(', ') : rule.value}`,
      source_field: rule.field,
      source_label: sourceLabel,
      value: String(actual),
      rule: `${rule.field} ${rule.op}${rule.value === undefined ? '' : ` ${Array.isArray(rule.value) ? rule.value.join(' | ') : rule.value}`}`,
    });
  }
  return raised;
}

// ── Dates (Entity has no created date: the audit trail is the record of time) ─

function caseDates(entity) {
  const logs = entity.auditLogs || [];
  const filedAt = logs.length ? logs[0].datetime : null;
  const status = lower(entity.status);
  const entered = [...logs].reverse().find((l) => lower(l.new_status) === status);
  const statusSince = entered ? entered.datetime : null;
  const days = (d) => (d ? Math.floor((Date.now() - new Date(d).getTime()) / DAY_MS) : null);
  return { filedAt, statusSince, daysSinceFiled: days(filedAt), daysInStatus: days(statusSince) };
}

// ── Similar cases (database query) ───────────────────────────────────────────

async function findSimilarCases(entity, filedAt) {
  const area = norm(entity.area);
  if (!filedAt) return [];
  const from = new Date(new Date(filedAt).getTime() - SIMILAR_WINDOW_DAYS * DAY_MS);
  const to = new Date(new Date(filedAt).getTime() + SIMILAR_WINDOW_DAYS * DAY_MS);
  const rows = await prisma.entity.findMany({
    where: {
      entity_type_id: entity.entity_type_id,
      entity_id: { not: entity.entity_id },
      area: area ? entity.area : null,
      NOT: { status: { in: ['deleted', 'draft'] } },
      auditLogs: { some: { datetime: { gte: from, lte: to } } },
    },
    select: {
      entity_id: true, name: true, status: true, area: true,
      auditLogs: { orderBy: { audit_id: 'asc' }, take: 1, select: { datetime: true } },
    },
    orderBy: { entity_id: 'desc' },
    take: 50,
  });
  return rows
    .map((r) => ({ entity_id: r.entity_id, name: r.name, status: r.status, area: r.area, filed_at: r.auditLogs[0] ? r.auditLogs[0].datetime : null }))
    .filter((r) => r.filed_at && r.filed_at >= from && r.filed_at <= to)
    .slice(0, SIMILAR_LIMIT);
}

// ── Transitions the caller may take ──────────────────────────────────────────

const FALLBACK_TARGETS = ['submitted', 'coordinator_approved', 'approved', 'rejected'];

async function allowedTransitions(entity, user) {
  const rules = await getWorkflowMasterRules(entity.entity_type_id);
  const status = lower(entity.status || 'draft');
  const targets = rules.length
    ? rules.filter((r) => lower(r.trigger) === status).map((r) => lower(r.action))
    : FALLBACK_TARGETS;
  const out = [];
  for (const target of [...new Set(targets)]) {
    const v = await validateWorkflowTransition({
      entity,
      targetStatus: target,
      actorRole: user.role,
      actorUserId: user.user_id,
      actorAssignedArea: user.assignedArea || user.assigned_area || null,
    });
    if (v.allowed) out.push(target);
  }
  return out;
}

/**
 * Exactly one suggested transition, or none. Decided by rule, never by the model:
 *   - a required item is missing and the caller may reject  → reject, naming the items
 *   - otherwise, if the caller may move the case forward    → that transition
 */
function suggestAction({ allowed, checklist, flags }) {
  if (!allowed.length) {
    return { suggestion: null, why_none: 'No workflow action is open to you at this status.' };
  }
  const required = checklist.filter((i) => i.required);
  const missing = required.filter((i) => !i.present);
  const forward = allowed.find((t) => t !== 'rejected');
  const canReject = allowed.includes('rejected');

  if (missing.length && canReject) {
    return {
      suggestion: {
        to_status: 'rejected',
        reason: `Required ${missing.length === 1 ? 'item is' : 'items are'} missing: ${missing.map((i) => i.label).join(', ')}.`,
        basis: missing.map((i) => `checklist:${i.field_key}`),
      },
    };
  }
  if (forward && !missing.length) {
    const flagText = flags.length
      ? `${flags.length} flag${flags.length === 1 ? '' : 's'} to review first (${flags.map((f) => f.label).join('; ')})`
      : 'no configured flag is raised';
    return {
      suggestion: {
        to_status: forward,
        reason: `All ${required.length} required items are present; ${flagText}.`,
        basis: ['checklist:complete', ...flags.map((f) => `flag:${f.id}`)],
      },
    };
  }
  return { suggestion: null, why_none: 'No rule points to a single action for this case.' };
}

// ── Brief (the only AI output) ───────────────────────────────────────────────

const MAX_VALUE_CHARS = 600;
// Rows the demo seed writes carry this reason; it is not a message about the case.
const SEED_REASON = /^demo seed data$/i;

/**
 * The only data the model is given: the record's own non-private field values,
 * which documents are attached, and the notes written on its transitions.
 * No contact details, no file names, no location, no owner.
 */
function briefInput(entity, parameters, values, files) {
  const fields = [];
  const documents = [];
  for (const p of parameters) {
    if (isFileParam(p)) {
      documents.push({ document: p.label || p.field_key, attached: files.get(p.parameter_id) || 0 });
      continue;
    }
    if (isLocationParam(p) || isPrivateField(p)) continue;
    const value = values.get(p.parameter_id);
    if (value) fields.push({ field: p.label || p.field_key, value: value.slice(0, MAX_VALUE_CHARS) });
  }
  const messages = (entity.auditLogs || [])
    .filter((l) => norm(l.reason) && !SEED_REASON.test(norm(l.reason)))
    .map((l) => ({ at_status: l.new_status || l.action || '', note: norm(l.reason).slice(0, MAX_VALUE_CHARS) }));
  return {
    service: entity.entityType ? entity.entityType.name : '',
    title: norm(entity.name),
    area: norm(entity.area) || 'Unassigned',
    status: norm(entity.status) || 'draft',
    fields,
    documents,
    messages,
  };
}

function fingerprintOf(input) {
  return crypto.createHash('sha256').update(`${PROMPT_VERSION}\n${JSON.stringify(input)}`).digest('hex');
}

function buildBriefPrompt(input) {
  return [
    'You write a case brief for a municipal coordinator.',
    'Use ONLY the JSON case data below. Write 2 or 3 lines. Each line is one plain factual sentence of at most 30 words that restates what the record says: what was reported or proposed, where, the details given, which documents are attached, and any note on record.',
    'Do not give advice, opinions, causes, risk or priority ratings, next steps or general statements. Do not mention anything that is not in the data. Do not use the words "stakeholder", "risk", "recommend", "should" or "likely".',
    'Return ONLY this JSON object: {"lines": ["...", "..."]}',
    '',
    'CASE DATA:',
    JSON.stringify(input),
  ].join('\n');
}

const BANNED = /\b(stakeholders?|urbani[sz]ation|risks?|recommend\w*|should|must|likely|suggests?|indicat\w+|root cause)\b/i;

/** A brief is kept only if it is 2-3 short lines and every number in it is in the record. */
function validBriefLines(data, input) {
  if (!data || !Array.isArray(data.lines)) return null;
  const lines = data.lines.map((l) => norm(l)).filter(Boolean);
  if (lines.length < 2 || lines.length > 3) return null;
  const haystack = JSON.stringify(input);
  for (const line of lines) {
    if (line.length < 10 || line.length > 260) return null;
    if (BANNED.test(line)) return null;
    for (const n of line.match(/\d+(?:[.,]\d+)*/g) || []) {
      if (!haystack.includes(n)) return null;
    }
  }
  return lines;
}

function cleanJson(text) {
  return String(text || '').replace(/^\s*```(?:json)?/i, '').replace(/```\s*$/, '').trim();
}

async function latestBriefLog(entityId) {
  return prisma.aIExecutionLog.findFirst({
    where: { entity_id: Number(entityId), analysis_type: BRIEF_TYPE },
    orderBy: { ai_execution_log_id: 'desc' },
  });
}

function parseLog(log) {
  try { return JSON.parse(log.response || '{}'); } catch (err) { return {}; }
}

/** The cached brief, if one was written for exactly this state of the record. */
async function cachedBrief(entityId, fingerprint) {
  const log = await latestBriefLog(entityId);
  if (!log) return { brief: null, log: null };
  const data = parseLog(log);
  if (data.fingerprint !== fingerprint) return { brief: null, log: null };
  if (log.status !== 'completed' || !Array.isArray(data.lines)) return { brief: null, log };
  return {
    brief: {
      lines: data.lines,
      model: log.model,
      prompt_version: data.prompt_version || PROMPT_VERSION,
      generated_at: log.created_date,
      log_id: log.ai_execution_log_id,
    },
    log,
  };
}

/**
 * Return the brief for the record as it is now. The model is called only when
 * no brief exists for this state of the record; a failure is not retried for
 * BRIEF_RETRY_AFTER_MS. Never throws for an AI failure: the brief is simply absent.
 */
async function getOrCreateBrief(entity, parameters, user) {
  const { values, files } = indexCase(entity);
  const input = briefInput(entity, parameters, values, files);
  const fingerprint = fingerprintOf(input);

  const cached = await cachedBrief(entity.entity_id, fingerprint);
  if (cached.brief) return { brief: cached.brief, cached: true, unavailable_reason: null };
  if (cached.log && Date.now() - new Date(cached.log.created_date).getTime() < BRIEF_RETRY_AFTER_MS) {
    return { brief: null, cached: true, unavailable_reason: cached.log.error_message || 'The AI brief could not be generated.' };
  }
  if (!aiClient.isConfigured()) {
    return { brief: null, cached: false, unavailable_reason: 'AI is not configured.' };
  }

  const prompt = buildBriefPrompt(input);
  let lines = null;
  let errorMessage = null;
  let modelName = aiClient.getModelName();
  try {
    const model = aiClient.getModel({ generationConfig: { temperature: 0.1, responseMimeType: 'application/json' } });
    modelName = model.modelName;
    for (let attempt = 1; attempt <= 2 && !lines; attempt += 1) {
      const result = await model.generateContent(
        attempt === 1 ? prompt : `${prompt}\n\nYour previous answer broke the rules above. Return ONLY the JSON object, 2 or 3 factual lines.`
      );
      try {
        lines = validBriefLines(JSON.parse(cleanJson(result.response.text())), input);
      } catch (err) {
        lines = null;
      }
    }
    if (!lines) errorMessage = 'The AI answer was not grounded in the record and was discarded.';
  } catch (err) {
    errorMessage = aiClient.isAiUnavailable(err) ? 'The AI service could not be reached.' : 'The AI brief could not be generated.';
  }

  const log = await prisma.aIExecutionLog.create({
    data: {
      entity_id: entity.entity_id,
      requested_by_user_id: user ? Number(user.user_id) : null,
      model: modelName,
      prompt,
      response: JSON.stringify({ lines: lines || null, fingerprint, prompt_version: PROMPT_VERSION }),
      status: lines ? 'completed' : 'failed',
      error_message: errorMessage,
      analysis_type: BRIEF_TYPE,
    },
  });

  if (!lines) return { brief: null, cached: false, unavailable_reason: errorMessage };
  return {
    brief: { lines, model: modelName, prompt_version: PROMPT_VERSION, generated_at: log.created_date, log_id: log.ai_execution_log_id },
    cached: false,
    unavailable_reason: null,
  };
}

// ── Suggestion audit ─────────────────────────────────────────────────────────

function suggestionKey(entity, suggestion) {
  return crypto.createHash('sha256')
    .update(`${RULES_VERSION}|${entity.entity_id}|${lower(entity.status)}|${suggestion.to_status}|${suggestion.reason}`)
    .digest('hex').slice(0, 32);
}

/**
 * Record that this suggestion was put in front of this user (once per user and
 * suggestion), and return that row's id and the user's answer to it, if any.
 */
async function recordSuggestionShown(entity, suggestion, user, briefModel) {
  const key = suggestionKey(entity, suggestion);
  const mine = await prisma.aIExecutionLog.findMany({
    where: { entity_id: entity.entity_id, requested_by_user_id: Number(user.user_id), analysis_type: SUGGESTION_TYPE },
    orderBy: { ai_execution_log_id: 'asc' },
  });
  const same = mine.filter((l) => parseLog(l).key === key);
  let shown = same.find((l) => l.status === 'shown');
  if (!shown) {
    shown = await prisma.aIExecutionLog.create({
      data: {
        entity_id: entity.entity_id,
        requested_by_user_id: Number(user.user_id),
        provider: 'rules',
        model: briefModel || null,
        prompt: `${RULES_VERSION}; ${PROMPT_VERSION}`,
        response: JSON.stringify({ key, to_status: suggestion.to_status, reason: suggestion.reason, basis: suggestion.basis }),
        status: 'shown',
        analysis_type: SUGGESTION_TYPE,
      },
    });
  }
  const answer = [...same].reverse().find((l) => OUTCOMES.includes(l.status));
  return { suggestion_id: shown.ai_execution_log_id, outcome: answer ? answer.status : null };
}

/**
 * Record what the user did with a suggestion they were shown. Writes one audit
 * row and nothing else: it does not, and cannot, change the record.
 */
async function recordSuggestionOutcome({ entityId, suggestionId, outcome, finalReason, user }) {
  if (!OUTCOMES.includes(outcome)) throw httpError(`"outcome" must be one of: ${OUTCOMES.join(', ')}.`, 400);
  const shown = await prisma.aIExecutionLog.findUnique({ where: { ai_execution_log_id: Number(suggestionId) || 0 } });
  if (!shown || shown.analysis_type !== SUGGESTION_TYPE || shown.status !== 'shown'
    || shown.entity_id !== Number(entityId) || shown.requested_by_user_id !== Number(user.user_id)) {
    throw httpError('That suggestion was not shown to you for this case.', 404);
  }
  const data = parseLog(shown);
  const row = await prisma.aIExecutionLog.create({
    data: {
      entity_id: shown.entity_id,
      requested_by_user_id: Number(user.user_id),
      provider: 'rules',
      model: shown.model,
      prompt: shown.prompt,
      response: JSON.stringify({
        ...data,
        suggestion_id: shown.ai_execution_log_id,
        ...(outcome === 'edited' ? { final_reason: norm(finalReason).slice(0, 1000) } : {}),
      }),
      status: outcome,
      analysis_type: SUGGESTION_TYPE,
    },
  });
  return { audit_id: row.ai_execution_log_id, outcome: row.status, recorded_at: row.created_date };
}

// ── The panel ────────────────────────────────────────────────────────────────

/**
 * Everything the panel shows except a freshly generated brief. Makes no AI call:
 * the brief is included only if one is already cached for this state of the record.
 */
async function buildCasePanel(entityId, user) {
  const entity = await loadCase(entityId);
  assertCasePanelScope(entity, user);

  const parameters = await loadFormParameters(entity.entity_type_id);
  const { values, files } = indexCase(entity);
  const dates = caseDates(entity);

  const checklist = buildChecklist(parameters, values, files);
  const similar = await findSimilarCases(entity, dates.filedAt);
  const rules = await loadFlagConfig(entity.entity_type_id);
  const flags = evaluateFlags(rules, {
    parameters,
    values,
    status: entity.status,
    builtIns: { days_in_status: dates.daysInStatus, days_since_filed: dates.daysSinceFiled, similar_cases: similar.length },
  });

  const allowed = await allowedTransitions(entity, user);
  const { suggestion, why_none: whyNone } = suggestAction({ allowed, checklist, flags });

  const fingerprint = fingerprintOf(briefInput(entity, parameters, values, files));
  const cached = await cachedBrief(entity.entity_id, fingerprint);

  let suggestionOut = null;
  if (suggestion) {
    const audit = await recordSuggestionShown(entity, suggestion, user, cached.brief ? cached.brief.model : null);
    suggestionOut = { ...suggestion, ...audit, rules_version: RULES_VERSION };
  }

  return {
    entity_id: entity.entity_id,
    status: entity.status,
    brief: cached.brief,
    // The page asks for a brief only when one can be generated now: none exists
    // for this state of the record, or the last attempt failed long enough ago.
    brief_pending: !cached.brief && aiClient.isConfigured()
      && (!cached.log || Date.now() - new Date(cached.log.created_date).getTime() >= BRIEF_RETRY_AFTER_MS),
    brief_unavailable_reason: cached.brief ? null
      : cached.log ? (cached.log.error_message || 'The AI brief could not be generated.')
        : aiClient.isConfigured() ? null : 'AI is not configured.',
    checklist,
    flags,
    flag_rules_configured: rules.length,
    similar_cases: similar,
    similar_window_days: SIMILAR_WINDOW_DAYS,
    filed_at: dates.filedAt,
    days_since_filed: dates.daysSinceFiled,
    days_in_status: dates.daysInStatus,
    suggestion: suggestionOut,
    suggestion_none_reason: suggestion ? null : whyNone,
    allowed_transitions: allowed,
  };
}

/** Generate (or return the cached) brief for a record the caller may open. */
async function briefForCase(entityId, user) {
  const entity = await loadCase(entityId);
  assertCasePanelScope(entity, user);
  const parameters = await loadFormParameters(entity.entity_type_id);
  return getOrCreateBrief(entity, parameters, user);
}

module.exports = {
  PROMPT_VERSION,
  RULES_VERSION,
  FLAG_CONFIG_WIDGET,
  assertCasePanelScope,
  buildChecklist,
  evaluateFlags,
  suggestAction,
  briefInput,
  validBriefLines,
  buildCasePanel,
  briefForCase,
  recordSuggestionOutcome,
  loadCase,
};
