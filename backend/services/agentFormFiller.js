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
    };
    if (type === 'file') fileFields.push(base);
    else if (type !== 'location' && !TITLE_KEY.test(base.key)) fields.push(base);
  }
  return { id: svc.id, name: svc.name, label: svc.label, fields, fileFields };
}

/** Wards: the most specific active areas. A record must sit on one of these. */
async function loadWards() {
  const all = await prisma.jurisdictionMaster.findMany({
    where: { status: 'active' },
    select: { jurisdiction_id: true, name: true, parent_id: true },
    take: 5000,
  });
  const parents = new Set(all.map((j) => j.parent_id).filter(Boolean));
  return all.filter((j) => !parents.has(j.jurisdiction_id)).map((j) => ({ id: j.jurisdiction_id, name: j.name }));
}

// ── Validation (the only way a value gets into the draft) ────────────────────

function parseDate(text) {
  const n = understanding.normalize(text);
  const today = new Date();
  const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  if (/\btoday\b|\bjust now\b|\bthis morning\b/.test(n)) return iso(today);
  if (/\byesterday\b|\blast night\b/.test(n)) return iso(new Date(today.getTime() - 86400000));
  const ago = n.match(/(\d{1,3})\s+days?\s+ago/);
  if (ago) return iso(new Date(today.getTime() - Number(ago[1]) * 86400000));
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

/** The service's photo field, if it takes one. */
function photoField(service) {
  return service.fileFields.find((f) => PHOTO_FIELD.test(f.key) || PHOTO_FIELD.test(f.label)) || null;
}

/**
 * What still has to be asked, in form order. A ward is always needed. The exact
 * spot and a photo are asked for once each (the citizen may skip them): they are
 * what a field team needs to find and judge the problem.
 */
function missing(session) {
  const { fields } = session.service;
  const out = fields.filter((f) => f.mandatory && isActive(f, session.draft, fields) && session.draft[f.key] === undefined);
  return {
    fields: out,
    ward: !session.ward,
    place: !session.place && !session.askedPlace,
    photo: Boolean(photoField(session.service)) && !session.pendingFiles.length && !session.askedPhoto,
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
  if (field.type === 'choice') return `Which ${field.plain} fits best: ${listOf(field.options)}?`;
  if (field.type === 'date') return `When was this? You can say "today", "yesterday" or give a date.`;
  if (field.type === 'number') return `What is the ${field.plain}? A number is fine.`;
  if (field.type === 'longtext') return `Could you tell me a little more about the ${field.plain}? A sentence or two is enough.`;
  return `What is the ${field.plain}?`;
}

function wardQuestion(wards) {
  if (!wards.length) return 'Which area is this in?';
  return wards.length <= 8
    ? `Which area is this in: ${listOf(wards.map((w) => w.name))}?`
    : 'Which area or ward is this in?';
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

function titleFrom(session) {
  const long = session.service.fields.find((f) => f.type === 'longtext' && session.draft[f.key]);
  const source = (long ? session.draft[long.key] : session.said[0]) || session.service.label;
  let t = String(source).replace(/\[.*?\]/g, '').split(/[.!?\n]/)[0].trim();
  t = t.replace(/^(hi|hello|hey)[,!. ]+/i, '').replace(/^(there'?s|there is|there are|i have|i want to report|i'd like to report)\s+(an?\s+|the\s+|some\s+)?/i, '');
  t = t.charAt(0).toUpperCase() + t.slice(1);
  return t.length > 80 ? `${t.slice(0, 77).trim()}…` : t || session.service.label;
}

function summaryOf(session) {
  const rows = [{ label: 'What', value: titleFrom(session) }];
  rows.push({ label: 'Where', value: [session.ward?.name, session.place].filter(Boolean).join(', ') });
  if (session.coords) rows.push({ label: 'Map pin', value: 'Your shared location' });
  for (const f of session.service.fields) {
    if (session.draft[f.key] === undefined) continue;
    const label = PERSON_NAME.test(f.key) || PERSON_NAME.test(f.label) ? 'Your name' : f.plain.charAt(0).toUpperCase() + f.plain.slice(1);
    rows.push({ label, value: String(session.draft[f.key]) });
  }
  if (session.pendingFiles.length) rows.push({ label: 'Attached', value: session.pendingFiles.map((f) => f.originalName).join(', ') });
  return rows;
}

function confirmReply(session, lead = 'Here is what I will send:') {
  const summary = summaryOf(session);
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
  // 2. Every required detail must be present and valid; a ward must be set.
  const gaps = missing(session);
  if (gaps.fields.length || gaps.ward) throw Object.assign(new Error('Some required details are missing.'), { statusCode: 400 });
  for (const f of svc.fields) {
    if (session.draft[f.key] === undefined) continue;
    if (!validateValue(f, session.draft[f.key]).ok) throw Object.assign(new Error('A detail is not valid.'), { statusCode: 400 });
  }
  const ward = await prisma.jurisdictionMaster.findFirst({ where: { jurisdiction_id: session.ward.id, status: 'active' } });
  if (!ward) throw Object.assign(new Error('That area is not available.'), { statusCode: 400 });

  // 3. The workflow must let this person send their own draft.
  const firstStatus = await firstWorkflowStatus(prisma, svc.id);
  const allowed = await validateWorkflowTransition({
    entity: { entity_type_id: svc.id, owner_user_id: user.user_id, area: ward.name, status: 'draft' },
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
        jurisdiction_id: ward.jurisdiction_id,
        name: titleFrom(session),
        area: ward.name,
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
  if (stages.has('coordinator_area')) who = `The ${ward.name} area coordinator`;
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
    return { type: 'question', text: say(text), options, _ask: { subjectWords, mustInclude } };
  };
  if (gaps.fields.length) {
    const f = gaps.fields[0];
    const words = [...understanding.tokens(f.plain), f.plain, ...(f.type === 'date' ? ['when'] : [])];
    // A long list of choices is not reworded: it stays exactly as the engine wrote it.
    if (f.options.length > 8) return ask(f.key, questionFor(f), quickReplies(f.options), []);
    return ask(f.key, questionFor(f), quickReplies(f.options), words, f.options);
  }
  if (gaps.ward) {
    const names = wards.map((w) => w.name);
    if (names.length > 8) return ask('__ward', wardQuestion(wards), quickReplies(names), []);
    return ask('__ward', wardQuestion(wards), quickReplies(names), ['area', 'ward', ...names], names);
  }
  if (gaps.place) {
    session.askedPlace = true;
    return ask('__place', placeQuestion(session), PLACE_CHIPS, PLACE_WORDS);
  }
  if (gaps.photo) {
    session.askedPhoto = true;
    return ask('__photo', PHOTO_QUESTION, PHOTO_CHIPS, PHOTO_WORDS);
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
    if ((PERSON_NAME.test(f.key) || PERSON_NAME.test(f.label)) && dbUser?.name) session.draft[f.key] = dbUser.name;
  }
  // The citizen's own words are the description, if they say enough.
  const story = session.service.fields.find((f) => f.type === 'longtext' && f.mandatory);
  const words = String(firstMessage || '').replace(/\[.*?\]/g, '').trim();
  if (story && validateValue(story, words).ok && understanding.tokens(words).length >= 2) session.draft[story.key] = words;

  const read = await understanding.readDetails({
    message: firstMessage, fields: session.service.fields, wards, askedKey: null, history: [], phase: 'collect', useAi: useAi(session),
  });
  noteAi(session, read);
  // The opening message is the description itself; do not let it fill other long answers.
  const values = Object.fromEntries(Object.entries(read.values).filter(([k]) => {
    const f = session.service.fields.find((x) => x.key === k);
    return f && (f.type !== 'longtext' || k === story?.key);
  }));
  absorb(session, values);
  if (read.ward) session.ward = read.ward;
  if (read.place) session.place = read.place;
  return nextStep(session, wards, 'Thanks for telling me, I can help you report this.');
}

/**
 * One turn of the conversation.
 * @param {string} sessionId
 * @param {string} userMessage
 * @param {{ user_id:number, role:string, name?:string, assignedArea?:string }} user
 * @param {Array} _unused  kept for the route's call signature
 * @param {object|null} attachedFile
 */
async function continueFormFilling(sessionId, userMessage, user, _unused = [], attachedFile = null) {
  const reply = await conversationTurn(sessionId, userMessage, user, attachedFile);
  const ask = reply && reply._ask;
  if (reply) delete reply._ask;
  if (!reply || reply.type !== 'question') return reply;

  // The question is fixed; only its wording may be made more human (AI, checked).
  const session = sessions.get(sessionId);
  if (!ask || !session || !session.service || reply.invalid || !ask.subjectWords.length) return { ...reply, voice: 'rules' };
  const said = String(userMessage || '').replace(/\[(?:User )?location:[^\]]*\]/gi, '').trim();
  const worded = await voice.speak({
    reply,
    citizenSaid: /^__/.test(said) ? '' : said,
    serviceLabel: session.service.label,
    known: summaryOf(session).filter((r) => r.label !== 'Your name'),
    subjectWords: ask.subjectWords,
    mustInclude: ask.mustInclude,
    firstName: String(user.name || '').split(/\s+/)[0] || null,
    useAi: useAi(session),
  });
  noteAi(session, worded);
  return { ...reply, text: worded.text, voice: worded.voice };
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

  const [catalog, wards] = await Promise.all([loadServiceCatalog(user.role), loadWards()]);
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
            text: `It sounds like you want to ${offered[0].label.charAt(0).toLowerCase()}${offered[0].label.slice(1)}. Is that right?`,
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

  // ── Answers to "where exactly?" and "any photo?" ──────────────────────────
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

  const read = await understanding.readDetails({
    message,
    fields: session.service.fields,
    wards,
    askedKey: asked,
    history: session.said.slice(0, -1),
    phase: session.phase === 'confirming' ? 'confirm' : 'collect',
    useAi: useAi(session),
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
      }
    }
    if (read.intent === 'deny' && !Object.keys(read.values).length && !read.ward) {
      return { type: 'question', text: 'No problem. What should I change?' };
    }
  }

  // ── Take in what this message said: answers, extra details, corrections ───
  const values = { ...read.values };
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
  if (failedAsked) {
    return {
      type: 'question',
      text: `${failedAsked.why}${failedAsked.field.type === 'choice' ? '' : ` ${questionFor(failedAsked.field)}`}`,
      invalid: asked,
      options: quickReplies(failedAsked.field.options),
    };
  }
  if (asked === '__ward' && !session.ward && !accepted.length) {
    const names = wards.slice(0, 8).map((w) => w.name);
    return { type: 'question', text: `I do not know that area yet. ${names.length ? `I can file it under ${listOf(names)}. Which is closest?` : 'Which ward is it in?'}`, invalid: '__ward', options: quickReplies(wards.map((w) => w.name)) };
  }

  // Say what changed, when something already given was changed.
  const changed = accepted.filter((f) => before[f.key] !== undefined && before[f.key] !== session.draft[f.key]);
  const changes = changed.map((f) => `${f.plain} is now ${session.draft[f.key]}`);
  if (wardBefore && session.ward && wardBefore.id !== session.ward.id) changes.push(`the area is now ${session.ward.name}`);
  let lead = changes.length ? `Changed: ${changes.join('; ')}.` : (attachedNote || '');

  if (session.phase === 'confirming' && !changes.length && !accepted.length) {
    return { type: 'question', text: 'Say **yes** to send it, or tell me what to change, for example "the area is Aundh".' };
  }
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
  _describeService: describeService,
};
