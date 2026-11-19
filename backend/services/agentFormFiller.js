/**
 * CIVIC-KALKI — Civic assistant: conversation engine
 *
 * A citizen says what they need in their own words; the assistant works out
 * which service that is, asks only for what is still missing, one question at
 * a time, reads it back, and files the real record once the citizen says yes.
 *
 * Everything that matters is decided HERE, in code, from metadata:
 *   - which services exist and which this person may start
 *       (EntityType + FormMaster + a WorkflowMaster step out of "draft" for their role);
 *   - what has to be known before filing (the form's mandatory fields, and a ward,
 *       because work is routed by area);
 *   - whether each answer is acceptable (field type, options, validation rule);
 *   - that nothing is created before validation passes AND the citizen confirms;
 *   - that filing goes through the workflow engine as the citizen, so
 *       permissions, audit, approval history and rules apply as for any record.
 * The understanding layer (agentIntentRouter.js) only reads language. With no
 * AI available it falls back to rules and the conversation still works.
 *
 * Replies are fixed sentences written here, in plain language. The model never
 * writes to the citizen.
 */

const fs = require('fs');
const prisma = require('../db');
const understanding = require('./agentIntentRouter');
const voice = require('./agentVoice');
const aiClient = require('./aiClient');
const language = require('./agentLanguage');
const { validateWorkflowTransition, executeWorkflowTransition } = require('./workflowEngine');
const { firstWorkflowStatus } = require('./ruleEngine');

const SESSION_TTL_MS = 30 * 60 * 1000;
const FILE_FIELD_TYPES = new Set(['file', 'upload', 'image', 'attachment']);
// Handled by the moderated Civic Buzz flow, not by the generic record engine.
const NOT_GENERIC = new Set(['civic campaign']);

/** @type {Map<string, object>} */
const sessions = new Map();

// ── Sessions ─────────────────────────────────────────────────────────────────

function touchSession(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return;
  if (session._timer) clearTimeout(session._timer);
  session._timer = setTimeout(() => {
    discardPendingFiles(session);
    sessions.delete(sessionId);
  }, SESSION_TTL_MS);
  // Do not keep the process (or a Jest run) alive just for session expiry.
  if (typeof session._timer.unref === 'function') session._timer.unref();
}

function newSession(userId, userRole) {
  return {
    phase: 'open',            // open → choosing → collecting → confirming → done
    userId,
    userRole,
    service: null,            // { id, label, fields, fileFields, firstStatus }
    choices: [],              // service ids offered when the request was ambiguous
    draft: {},                // { field key: validated value }
    ward: null,               // { id, name }
    place: null,              // free-text landmark
    coords: null,             // { latitude, longitude } from the device, if shared
    askedPlace: false,        // the exact spot is asked once; the citizen may skip it
    askedPhoto: false,        // a photo is asked for once; the citizen may skip it
    asked: null,              // key of the question just asked ('__ward', '__place', '__photo')
    said: [],                 // what the citizen has said (for context)
    pendingFiles: [],
    lastAiFailure: 0,
  };
}

function getSession(sessionId, userId, userRole) {
  const existing = sessions.get(sessionId);
  if (existing && existing.userId === userId) {
    touchSession(sessionId);
    return existing;
  }
  const session = newSession(userId, userRole);
  sessions.set(sessionId, session);
  touchSession(sessionId);
  return session;
}

function discardPendingFiles(session) {
  for (const f of session.pendingFiles || []) {
    if (f.diskPath && fs.existsSync(f.diskPath)) fs.unlink(f.diskPath, () => {});
  }
  session.pendingFiles = [];
}

function clearSession(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return;
  if (session._timer) clearTimeout(session._timer);
  if (session.phase !== 'done') discardPendingFiles(session);
  sessions.delete(sessionId);
}

// ── Metadata: services, fields, wards ────────────────────────────────────────

// A service description that reads as something the citizen does.
const ACTION_START = /^(report|start|apply|register|request|join|offer|volunteer|post|create|record|track|file|book|raise|tell|ask|share|propose|sign up|list|find|get|set up|build|organi[sz]e)\b/i;

/** "It sounds like you want to report a problem…", or a plain fallback for a description that is not an action. */
function soundsLike(service) {
  const label = String(service.label || '').trim();
  if (ACTION_START.test(label)) return `It sounds like you want to ${label.charAt(0).toLowerCase()}${label.slice(1)}.`;
  return `It sounds like this is a ${String(service.name || 'request').toLowerCase()} request.`;
}

function plainLabelOfService(type) {
  // The first sentence of the description is how the service is described to a citizen.
  const d = String(type.description || '').split(/[:.]/)[0].trim();
  return d || type.name;
}

/**
 * The services this role may start: a real entity type, with a form, whose
 * workflow lets this role move a draft forward. Nothing else can be filed.
 */
async function loadServiceCatalog(role) {
  const types = await prisma.entityType.findMany({
    where: {
      formMasters: { some: {} },
      workflowMasters: { some: { trigger: 'draft', stage: role } },
    },
    include: {
      formMasters: {
        orderBy: { form_id: 'asc' },
        take: 1,
        include: { sections: { include: { subsections: { include: { parameters: true } } } } },
      },
      dashboardMasters: { where: { widget_name: ASSISTANT_CONFIG_WIDGET }, orderBy: { dashboard_id: 'desc' }, take: 1 },
    },
    orderBy: { entity_type_id: 'asc' },
  });

  return types
    .filter((t) => !NOT_GENERIC.has(String(t.name).toLowerCase()))
    .map((t) => {
      const form = t.formMasters[0];
      const params = form.sections.flatMap((s) => s.subsections.flatMap((ss) => ss.parameters));
      const strong = new Set([...understanding.tokens(t.name), ...understanding.tokens(t.description)]);
      const weak = new Set();
      for (const s of form.sections) understanding.tokens(s.section_name).forEach((w) => weak.add(w));
      for (const p of params) {
        understanding.tokens(p.label).forEach((w) => weak.add(w));
        optionsOf(p).forEach((o) => understanding.tokens(o).forEach((w) => weak.add(w)));
      }
      return {
        id: t.entity_type_id,
        name: t.name,
        label: plainLabelOfService(t),
        description: t.description || '',
        keywords: { strong, weak },
        params,
        asks: parseAsks(t.dashboardMasters),
      };
    });
}

function optionsOf(param) {
  const o = param.options;
  if (Array.isArray(o)) return o.map(String);
  if (o && Array.isArray(o.choices)) return o.choices.map(String);
  return [];
}

function fieldType(param) {
  const t = String(param.field_type || param.control_type || 'text').toLowerCase();
  if (FILE_FIELD_TYPES.has(t)) return 'file';
  if (['select', 'dropdown', 'radio'].includes(t)) return 'choice';
  if (['number', 'integer', 'decimal', 'currency'].includes(t)) return 'number';
  if (t === 'date' || t === 'datepicker') return 'date';
  if (t === 'email') return 'email';
  if (t === 'phone' || t === 'tel') return 'phone';
  if (t === 'location') return 'location';
  return t === 'textarea' ? 'longtext' : 'text';
}

/** Words in a field label that are jargon to a citizen: the service's own name. */
function plainFieldLabel(label, serviceName) {
  const drop = new Set(understanding.tokens(serviceName));
  const words = String(label || '').split(/\s+/).filter((w) => !drop.has(understanding.tokens(w)[0] || ''));
  return (words.join(' ') || String(label || '')).replace(/\s*\/\s*/g, ' or ').trim().toLowerCase();
}

const TITLE_KEY = /^(title|name|subject|summary)$/i;
const PERSON_NAME = /(reporter|applicant|complainant|your|full|citizen).*name|^name$/i;

function describeService(svc) {
  const fields = [];
  const fileFields = [];
  for (const p of [...svc.params].sort((a, b) => (a.display_order - b.display_order) || (a.parameter_id - b.parameter_id))) {
    const type = fieldType(p);
    const base = {
      key: p.field_key || `field_${p.parameter_id}`,
      parameterId: p.parameter_id,
      label: p.label || p.field_key,
      plain: plainFieldLabel(p.label || p.field_key, svc.name),
      type,
      mandatory: Boolean(p.mandatory),
      options: optionsOf(p),
      rule: String(p.validation_rule || ''),
      dependsOn: p.options && p.options.depends_on ? p.options.depends_on : null,
      defaultValue: p.options && p.options.default !== undefined ? String(p.options.default) : null,
      // Form metadata can ask the assistant to ask an optional field too, in its
      // own words: options.chat = { ask: true, question: "Since when…?" }.
      chatAsk: Boolean(p.options && p.options.chat && p.options.chat.ask),
      chatQuestion: p.options && p.options.chat && typeof p.options.chat.question === 'string' ? p.options.chat.question : null,
      chatOrder: p.options && p.options.chat && Number.isFinite(Number(p.options.chat.order)) ? Number(p.options.chat.order) : 999,
      // What the field is for, declared in metadata (options.chat.role).
      role: p.options && p.options.chat && FIELD_ROLES.has(p.options.chat.role) ? p.options.chat.role : null,
    };
    if (type === 'file') fileFields.push(base);
    else if (type !== 'location' && !TITLE_KEY.test(base.key)) fields.push(base);
  }

  // A form that declares roles is read by its roles only. An older form without
  // any role falls back to recognising fields by their names.
  const usesRoles = [...fields, ...fileFields].some((f) => f.role);
  const byRole = (list, role) => list.find((f) => f.role === role) || null;
  const roles = usesRoles
    ? {
      description: byRole(fields, 'description'),
      photo: byRole(fileFields, 'photo'),
      personName: byRole(fields, 'person_name'),
      contactPhone: byRole(fields, 'contact_phone'),
    }
    : {
      description: fields.find((f) => f.type === 'longtext' && f.mandatory) || null,
      photo: fileFields.find((f) => PHOTO_FIELD.test(f.key) || PHOTO_FIELD.test(f.label)) || null,
      personName: fields.find((f) => PERSON_NAME.test(f.key) || PERSON_NAME.test(f.label)) || null,
      contactPhone: null,
    };
  // How serious it is: only the citizen says (see agentIntentRouter.isJudgement).
  for (const f of fields) f.judgement = usesRoles ? f.role === 'severity' : JUDGEMENT_NAME.test(`${f.key} ${f.label}`);

  return { id: svc.id, name: svc.name, label: svc.label, fields, fileFields, roles, asks: svc.asks || { ...DEFAULT_ASKS } };
}

const FIELD_ROLES = new Set(['description', 'photo', 'severity', 'person_name', 'contact_phone']);
const JUDGEMENT_NAME = /sever|urgen|priorit|serious|criticality|impact/i;

/**
 * Per-module assistant settings, kept like the case panel's settings: one
 * DashboardMaster row (widget_name 'assistant_config') whose filter holds JSON
 * { "ask_area": true, "ask_spot": true, "ask_photo": true }. Missing keys mean true.
 */
const { ASSISTANT_CONFIG_WIDGET } = require('./assistantSettings');
const DEFAULT_ASKS = { area: true, spot: true, photo: true };
function parseAsks(rows) {
  const row = (rows || []).find((r) => r.widget_name === ASSISTANT_CONFIG_WIDGET);
  if (!row || !row.filter) return { ...DEFAULT_ASKS };
  try {
    const c = JSON.parse(row.filter);
    return { area: c.ask_area !== false, spot: c.ask_spot !== false, photo: c.ask_photo !== false };
  } catch (err) {
    return { ...DEFAULT_ASKS };
  }
}

/** Wards: the most specific active areas. A record must sit on one of these. */
async function loadWards() {
  const all = await prisma.jurisdictionMaster.findMany({
    where: { status: 'active' },
    select: { jurisdiction_id: true, name: true, parent_id: true, type: true },
    take: 5000,
  });
  const parents = new Set(all.map((j) => j.parent_id).filter(Boolean));
  return all
    .filter((j) => !parents.has(j.jurisdiction_id))
    // A country or state with nothing under it is not a place a record can sit.
    .filter((j) => j.parent_id || !TOP_LEVEL_TYPES.has(String(j.type || '').toLowerCase()))
    .map((j) => ({ id: j.jurisdiction_id, name: j.name }));
}
const TOP_LEVEL_TYPES = new Set(['country', 'state']);

// ── Validation (the only way a value gets into the draft) ────────────────────

function parseDate(text) {
  const n = understanding.normalize(text);
  const today = new Date();
  const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  if (/\btoday\b|\bjust now\b|\bthis morning\b/.test(n)) return iso(today);
  if (/\byesterday\b|\blast night\b/.test(n)) return iso(new Date(today.getTime() - 86400000));
  const ago = n.match(/(\d{1,3})\s+days?\s+ago/);
  if (ago) return iso(new Date(today.getTime() - Number(ago[1]) * 86400000));
  // "since 3 days", "for 2 days", "2 din se" (Hindi): counted back from today.
  const forDays = n.match(/(?:since|for|from|past|last)\s+(\d{1,3})\s+(days?|weeks?)\b|(\d{1,3})\s+(din|days?)\s+(?:se|now)\b/);
  if (forDays) {
    const count = Number(forDays[1] || forDays[3]);
    const unitDays = /week/.test(forDays[2] || '') ? 7 : 1;
    return iso(new Date(today.getTime() - count * unitDays * 86400000));
  }
  if (/\b(?:since|for)\s+(?:a|one)\s+week\b|\blast week\b/.test(n)) return iso(new Date(today.getTime() - 7 * 86400000));
  // "since Monday": the most recent such day before today.
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const named = days.findIndex((d) => new RegExp(`\\b${d}\\b`).test(n));
  if (named >= 0) {
    const back = ((today.getDay() - named + 7) % 7) || 7;
    return iso(new Date(today.getTime() - back * 86400000));
  }
  let m = String(text).match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
  m = String(text).match(/(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})/);
  if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  const parsed = Date.parse(text);
  return Number.isNaN(parsed) ? null : iso(new Date(parsed));
}

/**
 * Check one value against its field's metadata.
 * @returns {{ ok: true, value: string } | { ok: false, why: string }}
 */
function validateValue(field, raw) {
  const text = String(raw ?? '').trim();
  if (!text) return { ok: false, why: 'I need an answer for that.' };

  if (field.type === 'choice') {
    const picked = understanding.findOption(text, field.options);
    return picked ? { ok: true, value: picked } : { ok: false, why: `Please pick one of: ${listOf(field.options)}.` };
  }
  if (field.type === 'number') {
    const num = Number(text.replace(/[, ]/g, '').match(/-?\d+(\.\d+)?/)?.[0]);
    if (!Number.isFinite(num)) return { ok: false, why: 'I need a number for that.' };
    return { ok: true, value: String(num) };
  }
  if (field.type === 'date') {
    const d = parseDate(text);
    if (!d) return { ok: false, why: 'I could not read that as a date. Try "today", "yesterday" or a date like 12/11/2026.' };
    return { ok: true, value: d };
  }
  if (field.type === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) ? { ok: true, value: text } : { ok: false, why: 'That does not look like an email address.' };
  }
  if (field.type === 'phone') {
    const digits = text.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15 ? { ok: true, value: text } : { ok: false, why: 'That does not look like a phone number.' };
  }
  const min = Number(field.rule.match(/min:(\d+)/)?.[1] || 0);
  const max = Number(field.rule.match(/max:(\d+)/)?.[1] || 4000);
  if (text.length < min) return { ok: false, why: 'Could you say a little more? A sentence or two is enough.' };
  if (text.length > max) return { ok: false, why: 'That is a bit long. Could you shorten it?' };
  return { ok: true, value: text };
}

function isActive(field, draft, fields) {
  if (!field.dependsOn) return true;
  const other = fields.find((f) => f.key === field.dependsOn.field_key);
  return other ? String(draft[other.key] ?? other.defaultValue ?? '') === String(field.dependsOn.value) : true;
}

const PHOTO_FIELD = /photo|image|picture|evidence|pic/i;

/** The service's photo field, if it takes one (by role, or by name on an older form). */
function photoField(service) {
  return service.roles ? service.roles.photo : null;
}

/**
 * What still has to be asked, in form order. A ward is always needed. The exact
 * spot and a photo are asked for once each (the citizen may skip them): they are
 * what a field team needs to find and judge the problem.
 */
function missing(session) {
  const { fields } = session.service;
  const open = (f) => isActive(f, session.draft, fields) && session.draft[f.key] === undefined;
  const skipped = session.skipped || [];
  return {
    detail: Boolean(session.needDetail),
    fields: fields.filter((f) => f.mandatory && open(f)),
    ward: session.service.asks.area && !session.ward,
    place: session.service.asks.spot && !session.place && !session.askedPlace,
    // Optional details the form asks the assistant to collect; each can be skipped.
    extras: fields.filter((f) => !f.mandatory && f.chatAsk && open(f) && !skipped.includes(f.key))
      .sort((a, b) => a.chatOrder - b.chatOrder),
    photo: session.service.asks.photo && Boolean(photoField(session.service)) && !session.pendingFiles.length && !session.askedPhoto,
  };
}

// ── Plain-language wording ───────────────────────────────────────────────────

function listOf(items) {
  const a = items.map(String);
  if (a.length <= 1) return a.join('');
  return `${a.slice(0, -1).join(', ')} or ${a[a.length - 1]}`;
}

/** Answers the citizen can tap instead of typing, when the choices are few. */
function quickReplies(values) {
  const list = (values || []).map(String);
  return list.length && list.length <= 8 ? list.map((v) => ({ label: v, value: v })) : undefined;
}

function questionFor(field) {
  // The form's own wording for the assistant, when it has one.
  if (field.chatQuestion) return field.chatQuestion;
  if (field.type === 'choice') return `Which ${field.plain} fits best: ${listOf(field.options)}?`;
  if (field.type === 'date') return `When was this? You can say "today", "yesterday" or give a date.`;
  if (field.type === 'number') return `What is the ${field.plain}? A number is fine.`;
  if (field.type === 'longtext') return `Could you tell me a little more about the ${field.plain}? A sentence or two is enough.`;
  return `What is the ${field.plain}?`;
}

/**
 * Ask for the area without reading out this city's list of names. If the phone
 * shared where the resident is, offer that area; the list of areas is shown only
 * after an answer that matches none of them.
 */
function wardQuestion(session) {
  if (session.nearWard) {
    return {
      text: `Which area is this in? You seem to be in ${session.nearWard.name} right now. Is it there, or somewhere else?`,
      options: [{ label: session.nearWard.name, value: session.nearWard.name }, { label: 'Somewhere else', value: 'somewhere else' }],
      mustInclude: [session.nearWard.name],
    };
  }
  return { text: 'Which area or neighbourhood is this in?', options: undefined, mustInclude: [] };
}

const SOMEWHERE_ELSE = /^(somewhere else|some where else|elsewhere|another (area|place|one)|a different (area|place)|different (area|place)|other (area|place)|not (there|here)|no)$/;

// Words that only say "I am complaining" or name a topic, not what is wrong.
const VAGUE_LIST = ['complaint', 'complain', 'complaints', 'grievance', 'issue', 'issues', 'problem', 'problems',
  'regarding', 'about', 'related', 'lodge', 'file', 'register', 'raise', 'report', 'want', 'like', 'need', 'help',
  'please', 'kindly', 'sir', 'madam', 'there', 'some', 'any', 'one', 'my', 'our', 'area', 'side', 'thing', 'things'];
// Compared in the same shortened form the tokenizer produces ("regarding" -> "regard").
const VAGUE_WORDS = new Set([...VAGUE_LIST, ...VAGUE_LIST.flatMap((w) => understanding.tokens(w))]);

/**
 * Does the opening say what is actually wrong? "I want to lodge a complaint
 * regarding water" names a topic; "no water since Monday" says what is wrong.
 * A coordinator cannot act on a topic alone.
 */
function isThin(text) {
  const words = understanding.tokens(ruleSubject(text));
  const content = words.filter((w) => !VAGUE_WORDS.has(w));
  return content.length <= 1;
}

function detailQuestion(session) {
  const topic = understanding.tokens(ruleSubject(session.said[0] || '')).filter((w) => !VAGUE_WORDS.has(w))[0];
  const about = topic ? ` with the ${topic}` : '';
  return `What exactly is happening${about}? Tell me what you see, in a sentence or two, so the team knows what to fix.`;
}

function placeQuestion(session) {
  return `Where exactly is it${session.ward ? ` in ${session.ward.name}` : ''}? A landmark or street name helps the team find the spot.`;
}

const PHOTO_QUESTION = 'Do you have a photo of it? A picture helps the team see the problem. You can add one now, or say "no photo".';

// Words a reworded question must still contain to be about the same thing.
const PLACE_WORDS = ['where', 'landmark', 'street', 'spot', 'location', 'exactly', 'road', 'near'];
const PHOTO_WORDS = ['photo', 'picture', 'image'];
const PLACE_CHIPS = [{ label: '📍 Use where I am', value: '__share_location' }, { label: 'Skip', value: 'skip' }];
const PHOTO_CHIPS = [{ label: '📷 Add a photo', value: '__attach_photo' }, { label: 'No photo', value: 'no photo' }];
const SKIP = /^(skip|no|nope|none|nothing|no photo|no photos|no picture|not now|later|i don t have (one|any|a photo)|dont have (one|any)|don t have (one|any)|i don t know|not sure|n a)$/;
const HERE = /(__share_location|share location|where i am|right here|it s here|this spot|my location|current location)/;

const STATUS_WORDS = {
  draft: 'saved, not sent yet',
  submitted: 'received, waiting for review',
  coordinator_approved: 'checked, waiting for final approval',
  approved: 'approved',
  rejected: 'not accepted',
};
const plainStatus = (s) => STATUS_WORDS[String(s || '').toLowerCase()] || String(s || 'in progress').replace(/_/g, ' ');
const reference = (id) => `PR-${String(id).padStart(5, '0')}`;

// Openings that say "I am complaining", not what the problem is. Stripped
// repeatedly, in any order, from the start of what the resident said.
const TITLE_PREAMBLES = [
  /^(?:hi|hello|hey|namaste|good (?:morning|afternoon|evening)|dear sir|respected sir|sir|madam|ma'?am)\b[,!.]?\s*/i,
  /^(?:please|kindly|actually|so|ok|okay)\b[,]?\s*/i,
  /^(?:i|we)\s+(?:want|would like|wish|need|am writing|have come|am here)\s+to\s+(?:lodge|file|register|raise|make|submit|report|log|give|put|complain)\b\s*/i,
  /^(?:i'?d|we'?d)\s+like\s+to\s+(?:lodge|file|register|raise|make|submit|report|log|complain)\b\s*/i,
  /^(?:i|we)\s+(?:have|got)\s+(?:a|an|one|some)?\s*(?=(?:complaint|grievance|issue|problem|report|request)\b)/i,
  /^(?:i|we)\s+(?:want to|would like to)?\s*report\b\s*/i,
  /^(?:a|an|my|our|one|this)\s+(?=(?:complaint|grievance|issue|problem|report|request)\b)/i,
  /^(?:complaint|complain|grievance|report|request)s?\b\s*/i,
  /^(?:issue|problem)s?\s+(?=(?:regarding|about|on|for|of|with|related|concerning)\b)/i,
  /^(?:regarding|about|on|for|of|against|related to|concerning|with)\s+/i,
  /^(?:there'?s|there is|there are|there has been)\s+/i,
  /^that\s+/i,
];
// Only once an opening was removed: "a complaint about the drain" -> "drain…",
// but "The drain on our road is blocked" keeps its own first word.
const LEADING_ARTICLE = /^(?:an?|the|some)\s+/i;

/** The subject of the request, in the resident's words, without the openings. */
function ruleSubject(source) {
  const original = String(source || '').replace(/\[.*?\]/g, '').split(/[.!?\n]/)[0].trim();
  let t = original;
  for (let pass = 0; pass < 8; pass += 1) {
    const before = t;
    for (const re of TITLE_PREAMBLES) t = t.replace(re, '').trim();
    if (t === before) break;
  }
  if (t !== original) t = t.replace(LEADING_ARTICLE, '').trim();
  // A long first sentence: its first clause is usually the problem itself.
  const clause = t.split(/[,;]| - /)[0].trim();
  if (clause !== t && clause.split(/\s+/).length >= 3) t = clause;
  return t;
}

/** What the title is made from: the description field, or the first thing they said. */
function titleSource(session) {
  const d = session.service.roles.description;
  const long = d && session.draft[d.key] ? d : session.service.fields.find((f) => f.type === 'longtext' && session.draft[f.key]);
  return String((long ? session.draft[long.key] : session.said[0]) || '');
}

/**
 * The record's title: what the problem is, and where. An AI-suggested subject
 * (checked in agentVoice.acceptableTitle) is used when there is one for the
 * current description; otherwise the resident's words without the openings.
 */
function titleFrom(session) {
  const source = titleSource(session);
  const ai = session.aiTitle && session.aiTitleFor === source ? session.aiTitle : null;
  let subject = ai || ruleSubject(source);
  if (subject.length < 3) subject = session.service.label;
  subject = subject.charAt(0).toUpperCase() + subject.slice(1);
  const ward = session.ward && session.ward.name;
  const suffix = ward && !subject.toLowerCase().includes(ward.toLowerCase()) ? ` in ${ward}` : '';
  const room = 80 - suffix.length;
  if (subject.length > room) subject = `${subject.slice(0, room - 1).trim()}…`;
  return subject + suffix;
}

function titleIsAi(session) {
  return Boolean(session.aiTitle && session.aiTitleFor === titleSource(session));
}

function summaryOf(session) {
  const rows = [{ label: titleIsAi(session) ? 'What (title worded by AI)' : 'What', value: titleFrom(session) }];
  const where = [session.ward?.name, session.place].filter(Boolean).join(', ');
  if (where) rows.push({ label: 'Where', value: where });
  if (session.coords) rows.push({ label: 'Map pin', value: 'Your shared location' });
  for (const f of session.service.fields) {
    if (session.draft[f.key] === undefined) continue;
    const label = session.service.roles.personName && f.key === session.service.roles.personName.key ? 'Your name' : f.plain.charAt(0).toUpperCase() + f.plain.slice(1);
    rows.push({ label, value: String(session.draft[f.key]) });
  }
  if (session.pendingFiles.length) rows.push({ label: 'Attached', value: session.pendingFiles.map((f) => f.originalName).join(', ') });
  return rows;
}

function confirmReply(session, lead = 'Here is what I will send:') {
  const summary = summaryOf(session);
  // The record is filed under exactly the title the citizen is shown here.
  session.confirmedTitle = summary[0].value;
  session.phase = 'confirming';
  session.asked = null;
  const lines = summary.map((r) => `**${r.label}:** ${r.value}`).join('\n');
  return {
    type: 'confirm',
    text: `${lead}\n\n${lines}\n\nShall I send it? Say **yes**, or tell me what to change.`,
    lead,
    summary,
    ready: true,
  };
}

// ── Attachments ──────────────────────────────────────────────────────────────

function matchFileToParameter(fileParams, attachedFile) {
  if (!Array.isArray(fileParams) || fileParams.length === 0 || !attachedFile) return null;
  const isImage = attachedFile.mimeType && attachedFile.mimeType.startsWith('image/');
  const re = isImage ? /photo|image|evidence|picture|pic/i : /doc|document|supporting|proof|file|attachment/i;
  return fileParams.find((p) => re.test(p.field_key || p.key || '') || re.test(p.label || '')) || fileParams[0];
}

function parseDeviceLocation(message) {
  const m = String(message || '').match(/\[(?:User )?location:\s*([^()\]]+?)(?:\s*\(([0-9.-]+)[°]?[NS]?,\s*([0-9.-]+)[°]?[EW]?\))?\]/i);
  if (!m) return null;
  return { text: m[1].trim(), latitude: m[2] ? parseFloat(m[2]) : null, longitude: m[3] ? parseFloat(m[3]) : null };
}

// ── Filing: the only place a record is created ───────────────────────────────

/**
 * Create the record and start its workflow, as the citizen.
 * Preconditions are re-checked here, whatever the conversation believed.
 */
async function fileRequest(session, user, sessionId) {
  const svc = session.service;

  // 1. The service must still be one this person may start.
  const catalog = await loadServiceCatalog(user.role);
  if (!catalog.some((s) => s.id === svc.id)) {
    throw Object.assign(new Error('That service is not available to you.'), { statusCode: 403 });
  }
  // 2. Every required detail must be present and valid; a ward must be set,
  //    unless the module's assistant settings say it does not ask for one.
  const gaps = missing(session);
  if (gaps.fields.length || gaps.ward) throw Object.assign(new Error('Some required details are missing.'), { statusCode: 400 });
  for (const f of svc.fields) {
    if (session.draft[f.key] === undefined) continue;
    if (!validateValue(f, session.draft[f.key]).ok) throw Object.assign(new Error('A detail is not valid.'), { statusCode: 400 });
  }
  let ward = null;
  if (session.ward) {
    ward = await prisma.jurisdictionMaster.findFirst({ where: { jurisdiction_id: session.ward.id, status: 'active' } });
    if (!ward) throw Object.assign(new Error('That area is not available.'), { statusCode: 400 });
  }
  // No area: the record has none, which puts it in the general coordinator's queue.
  const area = ward ? ward.name : null;

  // 3. The workflow must let this person send their own draft.
  const firstStatus = await firstWorkflowStatus(prisma, svc.id);
  const allowed = await validateWorkflowTransition({
    entity: { entity_type_id: svc.id, owner_user_id: user.user_id, area, status: 'draft' },
    targetStatus: firstStatus,
    actorRole: user.role,
    actorUserId: user.user_id,
    actorAssignedArea: user.assignedArea || null,
  });
  if (!allowed.allowed) throw Object.assign(new Error('You are not allowed to send this.'), { statusCode: 403 });

  // 4. Save the draft with its details in one transaction…
  const entity = await prisma.$transaction(async (tx) => {
    const created = await tx.entity.create({
      data: {
        entity_type_id: svc.id,
        owner_user_id: user.user_id,
        jurisdiction_id: ward ? ward.jurisdiction_id : null,
        name: session.confirmedTitle || titleFrom(session),
        area,
        location: session.place || null,
        latitude: session.coords?.latitude ?? null,
        longitude: session.coords?.longitude ?? null,
        status: 'draft',
      },
    });
    for (const f of svc.fields) {
      if (session.draft[f.key] === undefined) continue;
      await tx.parameterValue.create({ data: { entity_id: created.entity_id, parameter_id: f.parameterId, value: String(session.draft[f.key]) } });
    }
    for (const file of session.pendingFiles) {
      await tx.fileRepository.create({ data: { entity_id: created.entity_id, parameter_id: file.parameter_id, file_name: file.originalName, path: file.storedName } });
      await tx.parameterValue.create({ data: { entity_id: created.entity_id, parameter_id: file.parameter_id, value: file.originalName } });
    }
    await tx.auditLog.create({
      data: {
        entity_id: created.entity_id,
        actor_user_id: user.user_id,
        action: 'created',
        user: user.name || `user ${user.user_id}`,
        reason: 'Filed through the civic assistant after the citizen confirmed the summary',
      },
    });
    return created;
  }, { maxWait: 10000, timeout: 20000 });

  // 5. …then send it through the workflow engine, like any other record
  //    (permission check, status change, audit, approval history, rules).
  try {
    await executeWorkflowTransition({
      entityId: entity.entity_id,
      toStatus: firstStatus,
      reason: 'Sent by the citizen through the civic assistant',
      user: { user_id: user.user_id, name: user.name || `user ${user.user_id}`, role: user.role },
    });
  } catch (err) {
    // Nothing half-filed is left behind.
    await prisma.$transaction([
      prisma.fileRepository.deleteMany({ where: { entity_id: entity.entity_id } }),
      prisma.parameterValue.deleteMany({ where: { entity_id: entity.entity_id } }),
      prisma.approvalHistory.deleteMany({ where: { entity_id: entity.entity_id } }),
      prisma.auditLog.deleteMany({ where: { entity_id: entity.entity_id } }),
      prisma.entity.delete({ where: { entity_id: entity.entity_id } }),
    ]).catch(() => {});
    throw err;
  }

  // Who looks at it next, from the workflow.
  const next = await prisma.workflowMaster.findMany({ where: { entity_type_id: svc.id, trigger: firstStatus }, select: { stage: true } });
  const stages = new Set(next.map((n) => n.stage));
  let who = 'A reviewer';
  if (stages.has('coordinator_area') && ward) who = `The ${ward.name} area coordinator`;
  else if (stages.has('coordinator_general')) who = 'A coordinator';
  else if (stages.has('director')) who = 'The director';

  void sessionId;
  return { entity, firstStatus, who };
}

// ── The conversation ─────────────────────────────────────────────────────────

const OPENING = 'Tell me what is going on, in your own words. I can also check on requests you have already sent.';

function useAi(session) {
  // After an AI failure, do not wait on it again for a minute.
  return Date.now() - session.lastAiFailure > 60000;
}
function noteAi(session, result) {
  if (result.aiUnavailable) session.lastAiFailure = Date.now();
}

async function statusReply(user) {
  const mine = await prisma.entity.findMany({
    where: { owner_user_id: user.user_id, status: { not: 'deleted' } },
    orderBy: { entity_id: 'desc' },
    take: 5,
    select: { entity_id: true, name: true, status: true },
  });
  if (!mine.length) return { type: 'status', text: 'You have not sent anything yet. Tell me what is going on and I will file it for you.' };
  const lines = mine.map((e) => `**${reference(e.entity_id)}** ${e.name}: ${plainStatus(e.status)}`).join('\n');
  return { type: 'status', text: `Here are your latest requests:\n\n${lines}\n\nYou can open any of them under My requests.` };
}

/** Put validated values into the draft; return what was accepted and what was refused. */
function absorb(session, values) {
  const accepted = [];
  const refused = [];
  for (const [key, raw] of Object.entries(values || {})) {
    const field = session.service.fields.find((f) => f.key === key);
    if (!field) continue; // not a real field of this service: ignored
    const check = validateValue(field, raw);
    if (check.ok) {
      if (session.draft[key] !== check.value) accepted.push(field);
      session.draft[key] = check.value;
    } else refused.push({ field, why: check.why });
  }
  return { accepted, refused };
}

/**
 * Ask the next thing that is missing, or move to confirmation.
 * A question carries `_ask` (what it is about, its words and choices) so its
 * wording can be made more human afterwards; the question itself never changes.
 */
function nextStep(session, wards, lead = '') {
  const gaps = missing(session);
  const say = (text) => (lead ? `${lead} ${text}` : text);
  const ask = (key, text, options, subjectWords, mustInclude = []) => {
    session.phase = 'collecting';
    session.asked = key;
    // _ask.question is the question alone, without the lead ("Thanks."): AI
    // rewording writes its own acknowledgement in place of the lead, never beside it.
    return { type: 'question', text: say(text), options, _ask: { subjectWords, mustInclude, question: text } };
  };
  if (gaps.detail) {
    return ask('__detail', detailQuestion(session), undefined, ['what', 'happening', 'tell', 'describe', 'see']);
  }
  if (gaps.fields.length) {
    const f = gaps.fields[0];
    const words = [...understanding.tokens(f.plain), f.plain, ...(f.type === 'date' ? ['when'] : [])];
    // A long list of choices is not reworded: it stays exactly as the engine wrote it.
    if (f.options.length > 8) return ask(f.key, questionFor(f), quickReplies(f.options), []);
    return ask(f.key, questionFor(f), quickReplies(f.options), words, f.options);
  }
  if (gaps.ward) {
    const q = wardQuestion(session);
    return ask('__ward', q.text, q.options, ['area', 'ward', 'neighbourhood', 'neighborhood', 'where'], q.mustInclude);
  }
  if (gaps.place) {
    session.askedPlace = true;
    return ask('__place', placeQuestion(session), PLACE_CHIPS, PLACE_WORDS);
  }
  if (gaps.photo) {
    session.askedPhoto = true;
    return ask('__photo', PHOTO_QUESTION, PHOTO_CHIPS, PHOTO_WORDS);
  }
  // Last, a few quick optional details the form asks for (since when, who is
  // affected, a number to call back): each can be skipped.
  if (gaps.extras.length) {
    const f = gaps.extras[0];
    const words = [...understanding.tokens(f.plain), f.plain, ...(f.type === 'date' ? ['when', 'since'] : [])];
    const chips = [...(quickReplies(f.options) || []), { label: 'Skip', value: 'skip' }];
    return ask(f.key, questionFor(f), chips, f.options.length > 8 ? [] : words, f.options.length > 8 ? [] : f.options);
  }
  return confirmReply(session, lead ? `${lead} Here is what I will send:` : 'Here is what I will send:');
}

async function startService(session, svc, user, wards, firstMessage) {
  session.service = describeService(svc);
  session.choices = [];
  session.phase = 'collecting';

  // What is already known without asking.
  const dbUser = await prisma.user.findUnique({ where: { user_id: user.user_id }, select: { name: true } }).catch(() => null);
  for (const f of session.service.fields) {
    if (session.service.roles.personName && f.key === session.service.roles.personName.key && dbUser?.name) session.draft[f.key] = dbUser.name;
  }
  // The citizen's own words are the description, if they say what is wrong.
  // A topic alone ("a complaint regarding water") is followed by one question
  // about what exactly is happening, before anything else.
  const story = session.service.roles.description;
  const words = String(firstMessage || '').replace(/\[.*?\]/g, '').trim();
  session.needDetail = Boolean(story) && isThin(words);
  if (story && !session.needDetail && validateValue(story, words).ok && understanding.tokens(words).length >= 2) session.draft[story.key] = words;

  const read = await understanding.readDetails({
    message: firstMessage, fields: session.service.fields, wards, askedKey: null, history: [], phase: 'collect', useAi: useAi(session),
  });
  noteAi(session, read);
  // The opening message is the description itself; do not let it fill other long answers.
  const values = Object.fromEntries(Object.entries(read.values).filter(([k]) => {
    const f = session.service.fields.find((x) => x.key === k);
    return f && (f.type !== 'longtext' || (k === story?.key && !session.needDetail));
  }));
  absorb(session, values);
  if (read.ward) session.ward = read.ward;
  if (read.place) session.place = read.place;
  return nextStep(session, wards, session.needDetail
    ? 'I am sorry you are dealing with this.'
    : 'Thanks for telling me, I am sorry you are dealing with this. I will help you report it.');
}

/**
 * One turn of the conversation.
 * @param {string} sessionId
 * @param {string} userMessage
 * @param {{ user_id:number, role:string, name?:string, assignedArea?:string }} user
 * @param {Array} _unused  kept for the route's call signature
 * @param {object|null} attachedFile
 */
/**
 * What the chat page shows as the live form card: the same plain-language rows
 * as the summary, and how many required things are still to come.
 */
function progressOf(session) {
  if (!session || !session.service) return null;
  const gaps = missing(session);
  return {
    service: session.service.label,
    rows: summaryOf(session).filter((r) => r.value),
    remaining: gaps.fields.length + (gaps.ward ? 1 : 0),
  };
}

/**
 * Ask the AI for a title in the background as soon as the description is known,
 * so it is usually ready by the summary and never adds a wait to a question.
 */
function ensureTitle(session, user) {
  if (!session || !session.service || !aiClient.isConfigured() || !useAi(session)) return;
  const source = titleSource(session);
  if (!source.trim() || session.titleRequestedFor === source) return;
  session.titleRequestedFor = source;
  const facts = summaryOf(session).filter((r) => !/^(What|Your name|Map pin|Attached)/.test(r.label));
  session.titlePromise = voice.suggestTitle({ citizenSaid: source, facts, personNames: [user && user.name] })
    .then((title) => {
      if (title && titleSource(session) === source) { session.aiTitle = title; session.aiTitleFor = source; }
    })
    .catch(() => {});
}

// How long the summary may wait for a title still being written (env AI_TITLE_WAIT_MS).
function titleWaitMs() {
  const n = Number(process.env.AI_TITLE_WAIT_MS);
  return Number.isFinite(n) && n >= 0 ? n : 2500;
}

/**
 * One turn, answered in the citizen's language. The engine builds the reply in
 * English; with the AI on it is then translated (agentLanguage.localizeReply).
 * @param {object} [options] { lang } the language picked in the app
 */
async function continueFormFilling(sessionId, userMessage, user, _unused = [], attachedFile = null, options = {}) {
  const lang = language.replyLanguage(options && options.lang, userMessage);
  const reply = await englishTurn(sessionId, userMessage, user, attachedFile, lang);
  const session = sessions.get(sessionId);
  if (session && session.userId === user.user_id) session.replyLang = lang;
  return language.localizeReply(reply, lang);
}

async function englishTurn(sessionId, userMessage, user, attachedFile = null, lang = 'en') {
  let reply = await conversationTurn(sessionId, userMessage, user, attachedFile);
  const ask = reply && reply._ask;
  if (reply) delete reply._ask;
  const session = sessions.get(sessionId);
  if (!reply || !['question', 'confirm'].includes(reply.type)) return reply;

  if (reply.type === 'confirm') {
    if (session && session.service) {
      ensureTitle(session, user);
      if (session.titlePromise) {
        await voice.withinBudget(session.titlePromise, titleWaitMs());
        if (titleIsAi(session)) reply = { ...reply, ...confirmReply(session, reply.lead || undefined) };
      }
    }
    const progress = progressOf(session);
    return progress ? { ...reply, progress } : reply;
  }

  // A question. Its wording may be made more human (AI, checked); the question
  // itself is fixed. The wording request goes first, since the citizen waits on
  // it; the title is written alongside it.
  const progress = progressOf(session);
  if (progress) reply.progress = progress;
  const said = String(userMessage || '').replace(/\[(?:User )?location:[^\]]*\]/gi, '').trim();
  // A short answer (a tapped choice, "skip", an area name) gets the next
  // question straight away; rewording is kept for replies in the resident's own words.
  const short = /^__/.test(said) || said.split(/\s+/).filter(Boolean).length <= 3;
  // Rewording is checked against English words; another language is translated instead.
  if (!ask || !session || !session.service || reply.invalid || !ask.subjectWords.length || short || lang !== 'en') {
    ensureTitle(session, user);
    return { ...reply, voice: 'rules' };
  }
  const wording = voice.speak({
    reply: { ...reply, text: ask.question || reply.text },
    citizenSaid: said,
    serviceLabel: session.service.label,
    known: summaryOf(session).filter((r) => r.label !== 'Your name'),
    subjectWords: ask.subjectWords,
    mustInclude: ask.mustInclude,
    firstName: String(user.name || '').split(/\s+/)[0] || null,
    useAi: useAi(session),
  });
  ensureTitle(session, user);
  const worded = await wording;
  noteAi(session, worded);
  // AI wording replaces lead and question; otherwise the engine's full sentence stays.
  return worded.voice === 'ai' ? { ...reply, text: worded.text, voice: 'ai' } : { ...reply, voice: 'rules' };
}

async function conversationTurn(sessionId, userMessage, user, attachedFile) {
  let session = getSession(sessionId, user.user_id, user.role);
  if (session.phase === 'done') {
    clearSession(sessionId);
    session = getSession(sessionId, user.user_id, user.role);
  }

  const device = parseDeviceLocation(userMessage);
  if (device && device.latitude !== null) session.coords = { latitude: device.latitude, longitude: device.longitude };
  const message = String(userMessage || '').replace(/\[(?:User )?location:[^\]]*\]/gi, '').trim();
  const onlyAttachment = Boolean(attachedFile) && /^i have uploaded an attachment/i.test(message);

  // A chip's internal value is an action for the screen, never words from the
  // resident. If a screen sends one anyway, it is answered, not filed as text.
  if (/^__[a-z_]+$/.test(message) && message !== '__share_location' && !attachedFile) {
    const s0 = sessions.get(sessionId);
    if (message === '__attach_photo') {
      return { type: 'question', text: 'Please add the photo with the camera or paperclip button below, or say "no photo".', options: PHOTO_CHIPS };
    }
    return s0 && s0.service ? nextStep(s0, await loadWards()) : { type: 'guidance', text: OPENING };
  }

  const [catalog, wards] = await Promise.all([loadServiceCatalog(user.role), loadWards()]);
  // The phone's position names an area we cover: offer it when asking where.
  if (device && device.text && !session.declinedNearWard) session.nearWard = understanding.findWard(device.text, wards) || session.nearWard || null;
  if (!catalog.length) {
    return { type: 'guidance', text: 'There is nothing you can file from here with your account. You can still browse records from the menu.' };
  }
  if (message && !onlyAttachment) session.said.push(message);

  // ── An attachment is kept until the request is sent ───────────────────────
  let attachedNote = '';
  if (attachedFile) {
    if (session.service) {
      const param = matchFileToParameter(session.service.fileFields, attachedFile);
      if (param) {
        session.pendingFiles.push({ ...attachedFile, parameter_id: param.parameterId });
        attachedNote = 'I have attached your file.';
      } else {
        if (attachedFile.diskPath) fs.unlink(attachedFile.diskPath, () => {});
        attachedNote = 'This kind of request cannot take attachments, so I left the file out.';
      }
    } else {
      session.heldFile = attachedFile;
    }
  }

  // ── No service yet: work out what they need ───────────────────────────────
  if (!session.service) {
    let pick = null;
    if (session.phase === 'choosing' && session.choices.length) {
      // They are answering "which of these?"
      const offered = catalog.filter((s) => session.choices.includes(s.id));
      const n = understanding.normalize(message);
      const byNumber = n.match(/^(\d)$|^(first|second|third)$/);
      if (byNumber) pick = offered[byNumber[1] ? Number(byNumber[1]) - 1 : ['first', 'second', 'third'].indexOf(byNumber[2])] || null;
      // "Is that right?" about a single service: yes takes it, no starts again.
      if (!pick && offered.length === 1) {
        const yn = understanding.ruleIntent(message);
        if (yn === 'confirm') pick = offered[0];
        else if (yn === 'deny') {
          session.phase = 'open'; session.choices = []; session.said = [];
          return { type: 'guidance', text: `No problem. ${OPENING}` };
        }
      }
      if (!pick) {
        const ranked = understanding.scoreServices(message, offered);
        if (ranked[0] && ranked[0].score > 0 && (!ranked[1] || ranked[0].score > ranked[1].score)) pick = offered.find((s) => s.id === ranked[0].id);
      }
    }
    if (!pick) {
      const all = session.said.join('. ');
      const choice = await understanding.chooseService(all, catalog, { useAi: useAi(session) });
      noteAi(session, choice);
      if (choice.intent === 'status') return statusReply(user);
      if (choice.intent === 'cancel') { clearSession(sessionId); return { type: 'cancelled', text: 'Okay, nothing was sent.' }; }
      // A bare "yes" or "no" with nothing to answer is not a request.
      if (['confirm', 'deny'].includes(choice.intent)) { session.said.pop(); return { type: 'guidance', text: OPENING }; }
      // Only a service that really exists in this person's catalog can be chosen.
      pick = choice.serviceId ? catalog.find((s) => s.id === choice.serviceId) || null : null;
      if (!pick) {
        const offered = catalog.filter((s) => choice.candidates.includes(s.id)).slice(0, 3);
        if (offered.length >= 2) {
          session.phase = 'choosing';
          session.choices = offered.map((s) => s.id);
          const options = offered.map((s, i) => `${i + 1}. ${s.label}`).join('\n');
          return {
            type: 'question',
            text: `I want to send this to the right place. Which is closest to what you need?\n\n${options}`,
            options: offered.map((s, i) => ({ label: s.label, value: String(i + 1) })),
          };
        }
        if (offered.length === 1) {
          // One possible match, but not a sure one: check before going further.
          session.phase = 'choosing';
          session.choices = [offered[0].id];
          return {
            type: 'question',
            text: `${soundsLike(offered[0])} Is that right?`,
            options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
          };
        }
      }
      if (!pick) {
        session.phase = 'open';
        const examples = catalog.slice(0, 3).map((s) => s.label.toLowerCase());
        return { type: 'guidance', text: `${session.said.length > 1 ? 'I am not sure what you need yet. ' : ''}${OPENING} For example, I can help you ${listOf(examples)}.` };
      }
    }
    // A "yes" or a number that only picked the service is not part of the story.
    if (session.said.length > 1 && (understanding.ruleIntent(message) === 'confirm' || /^\d$/.test(message.trim()))) session.said.pop();
    const reply = await startService(session, pick, user, wards, session.said.join('. '));
    if (session.heldFile) {
      const param = matchFileToParameter(session.service.fileFields, session.heldFile);
      if (param) session.pendingFiles.push({ ...session.heldFile, parameter_id: param.parameterId });
      session.heldFile = null;
      if (reply.type === 'confirm') return confirmReply(session);
    }
    return reply;
  }

  // ── A service is chosen: read this message against its fields ─────────────
  if (onlyAttachment) return nextStep(session, wards, attachedNote);

  const asked = session.asked;

  // "Somewhere else" to the suggested area: ask openly, without a list of names.
  if (asked === '__ward' && SOMEWHERE_ELSE.test(understanding.normalize(message))) {
    session.nearWard = null;
    session.declinedNearWard = true;
    return nextStep(session, wards, 'Okay.');
  }

  // ── Answers to "where exactly?" and "any photo?" ──────────────────────────
  // ── Answer to "what exactly is happening?" ────────────────────────────────
  let detailGiven = false;
  if (asked === '__detail') {
    const story = session.service.roles.description;
    const n = understanding.normalize(message);
    const opening = String(session.said[0] || '').trim();
    const topicWord = understanding.tokens(ruleSubject(opening)).filter((w) => !VAGUE_WORDS.has(w))[0] || '';
    let text = message.trim();
    if (SKIP.test(n) || !understanding.tokens(text).length) text = opening; // they cannot say more: keep what we have
    else if (topicWord && !understanding.tokens(text).includes(topicWord)) text = `${topicWord.charAt(0).toUpperCase()}${topicWord.slice(1)}: ${text}`;
    const check = story ? validateValue(story, text) : { ok: true, value: text };
    session.detailTries = (session.detailTries || 0) + 1;
    if (!check.ok && session.detailTries < 2) {
      return { type: 'question', text: 'A little more detail helps the team, for example what you see and since when.', invalid: '__detail' };
    }
    if (story) session.draft[story.key] = check.ok ? check.value : `${text} (${opening})`.slice(0, 2000);
    session.needDetail = false;
    detailGiven = true;
  }

  // ── Optional details the form asks for: each one can be skipped ──────────
  const askedExtra = asked && !asked.startsWith('__') ? session.service.fields.find((f) => f.key === asked && !f.mandatory && f.chatAsk) : null;
  if (askedExtra && SKIP.test(understanding.normalize(message))) {
    session.skipped = [...(session.skipped || []), asked];
    return nextStep(session, wards, 'No problem.');
  }

  if (asked === '__place' || asked === '__photo') {
    const n = understanding.normalize(message);
    if (asked === '__place') {
      if (SKIP.test(n)) return nextStep(session, wards, 'No problem.');
      if (HERE.test(message.toLowerCase()) || HERE.test(n)) {
        return nextStep(session, wards, session.coords ? 'Thanks, I have your location.' : 'I could not get your location, so I will leave the exact spot out.');
      }
      if (understanding.tokens(message).length) {
        const ward = understanding.findWard(message, wards);
        if (ward && (!session.ward || ward.id !== session.ward.id)) session.ward = ward;
        session.place = message.slice(0, 120);
        return nextStep(session, wards, 'Thanks.');
      }
    } else if (SKIP.test(n)) {
      return nextStep(session, wards, 'That is fine.');
    }
    // Anything else is read as an ordinary message below.
  }

  // An answer in the resident's own words to a choice question ("pretty bad" for
  // severity) cannot be matched by rules. Ask the AI for it even during the
  // pause after an AI failure, or the resident would be stuck repeating it.
  const askedChoice = asked ? session.service.fields.find((f) => f.key === asked && f.type === 'choice') : null;
  const ownWords = Boolean(askedChoice) && !understanding.findOption(message, askedChoice.options);
  const read = await understanding.readDetails({
    message,
    fields: session.service.fields,
    wards,
    askedKey: asked,
    history: session.said.slice(0, -1),
    phase: session.phase === 'confirming' ? 'confirm' : 'collect',
    useAi: useAi(session) || (ownWords && aiClient.isConfigured()),
  });
  noteAi(session, read);

  if (read.intent === 'cancel') {
    clearSession(sessionId);
    return { type: 'cancelled', text: 'Okay, I have dropped it. Nothing was sent.' };
  }
  if (read.intent === 'status') return statusReply(user);

  // ── Confirmation: only a plain yes sends it ───────────────────────────────
  if (session.phase === 'confirming') {
    if (read.intent === 'confirm') {
      // A second "yes" (double tap, retry) while the first is being filed must not
      // file it again. Checked and set with no await in between.
      if (session.filing) return { type: 'busy', text: 'I am sending it now, one moment.' };
      session.filing = true;
      try {
        const { entity, who } = await fileRequest(session, user, sessionId);
        const files = session.pendingFiles.map((f) => f.originalName);
        session.pendingFiles = [];
        session.phase = 'done';
        const ref = reference(entity.entity_id);
        return {
          type: 'submitted',
          text: `Done. Your reference is **${ref}**.\n\n${who} looks at it next. You will get a notification each time it moves, and you can follow it under My requests.`,
          entity_id: entity.entity_id,
          entity_name: entity.name,
          reference: ref,
          capability: session.service.label,
          files,
        };
      } catch (err) {
        console.error('[CIVIC ASSISTANT] Filing failed:', err.message);
        // Still unconfirmed-and-unsent: the citizen can try again with one word.
        return { type: 'error', text: 'Sorry, I could not send that just now, and nothing was saved. Say **yes** to try again, or tell me what to change.' };
      } finally {
        session.filing = false;
      }
    }
    if (read.intent === 'deny' && !Object.keys(read.values).length && !read.ward) {
      return { type: 'question', text: 'No problem. What should I change?' };
    }
  }

  // ── Take in what this message said: answers, extra details, corrections ───
  const values = { ...read.values };
  if (detailGiven) {
    for (const f of session.service.fields) if (f.type === 'longtext') delete values[f.key];
  }
  const askedField = asked && asked !== '__ward' ? session.service.fields.find((f) => f.key === asked) : null;
  // A free-text answer to the question just asked.
  if (askedField && values[asked] === undefined && !['choice'].includes(askedField.type) && read.intent !== 'correct') values[asked] = message;
  if (askedField && askedField.type === 'choice' && values[asked] === undefined) values[asked] = message;

  const before = { ...session.draft };
  const wardBefore = session.ward;
  const { accepted, refused } = absorb(session, values);
  if (read.ward && (!session.ward || read.ward.id !== session.ward.id)) session.ward = read.ward;
  if (read.place) session.place = read.place;

  // The asked question got an answer that does not pass: say why, ask again.
  const failedAsked = refused.find((r) => r.field.key === asked);
  // They answered a choice with a description ("no water since 2 days, the whole
  // building…"): keep it as detail for the team, then ask the choice again.
  const story = session.service.roles.description;
  if (failedAsked && failedAsked.field.type === 'choice' && story && understanding.tokens(message).length >= 5) {
    const before = String(session.draft[story.key] || '').trim();
    if (!before.toLowerCase().includes(message.toLowerCase())) {
      const joined = before ? `${before}. ${message}` : message;
      if (validateValue(story, joined).ok) session.draft[story.key] = validateValue(story, joined).value;
    }
    return {
      type: 'question',
      text: `Thanks, I have added that to the details. ${questionFor(failedAsked.field)}`,
      invalid: asked,
      options: quickReplies(failedAsked.field.options),
    };
  }
  if (failedAsked) {
    return {
      type: 'question',
      text: `${failedAsked.why}${failedAsked.field.type === 'choice' ? '' : ` ${questionFor(failedAsked.field)}`}`,
      invalid: asked,
      options: quickReplies(failedAsked.field.options),
    };
  }
  if (asked === '__ward' && !session.ward && !accepted.length) {
    // A near miss ("kothrood"): ask about the closest names only.
    const close = understanding.closeWards(message, wards);
    if (close.length) {
      return {
        type: 'question',
        text: `Did you mean ${listOf(close.map((w) => w.name))}?`,
        invalid: '__ward',
        options: [...close.map((w) => ({ label: w.name, value: w.name })), { label: 'Somewhere else', value: 'somewhere else' }],
      };
    }
    const names = wards.slice(0, 8).map((w) => w.name);
    const list = wards.length <= 8 ? ` The areas I can file under are ${listOf(names)}. Which is it in, or closest to?` : ' Could you give the name of the ward or a well-known area nearby?';
    return { type: 'question', text: `I could not find "${message.slice(0, 40)}" among the areas we cover.${list}`, invalid: '__ward', options: quickReplies(wards.map((w) => w.name)) };
  }

  // Say what changed, when something already given was changed.
  const changed = accepted.filter((f) => before[f.key] !== undefined && before[f.key] !== session.draft[f.key]);
  // A longer description is "added to the details", not read back word for word.
  const addedDetails = changed.some((f) => f.type === 'longtext');
  const changes = changed.filter((f) => f.type !== 'longtext').map((f) => `${f.plain} is now ${session.draft[f.key]}`);
  if (wardBefore && session.ward && wardBefore.id !== session.ward.id) changes.push(`the area is now ${session.ward.name}`);
  let lead = changes.length ? `Changed: ${changes.join('; ')}.` : (attachedNote || '');
  if (addedDetails) lead = `${lead ? `${lead} ` : ''}Thanks, I have added that to the details.`;

  if (session.phase === 'confirming' && !changes.length && !accepted.length) {
    return { type: 'question', text: 'Say **yes** to send it, or tell me what to change, for example "the area is Aundh".' };
  }
  if (!lead && detailGiven) lead = 'Thanks, that helps.';
  if (!lead && accepted.length) lead = 'Thanks.';
  return nextStep(session, wards, lead);
}

module.exports = {
  continueFormFilling,
  clearSession,
  matchFileToParameter,
  // exposed for tests
  _sessions: sessions,
  _loadServiceCatalog: loadServiceCatalog,
  _validateValue: validateValue,
  _loadWards: loadWards,
  _soundsLike: soundsLike,
  _isThin: isThin,
  _ruleSubject: ruleSubject,
  _describeService: describeService,
};
