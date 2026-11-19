/**
 * CIVIC-KALKI — civic assistant settings, kept in metadata.
 *
 * Per field (ParameterMaster.options.chat):
 *   { ask: true|false, question: "…", order: 1, role: "description" | "photo" |
 *     "severity" | "person_name" | "contact_phone" }
 *   ask      also ask this optional field in chat (mandatory fields are always asked)
 *   question how the assistant asks it
 *   order    position among the optional questions
 *   role     what the field is for; each role at most once per form
 *
 * Per module (one DashboardMaster row, widget_name 'assistant_config', like the
 * case panel's 'case_flag_config'): { ask_area, ask_spot, ask_photo }.
 *
 * Used by the No-Code Builder and by the settings routes, so both accept and
 * refuse exactly the same things.
 */

const ASSISTANT_CONFIG_WIDGET = 'assistant_config';
const ROLES = ['description', 'photo', 'severity', 'person_name', 'contact_phone'];
const MAX_QUESTION = 300;

// Which field types each role can sit on.
const ROLE_TYPES = {
  description: ['textarea', 'text'],
  photo: ['file', 'upload', 'image', 'attachment'],
  severity: ['select', 'dropdown', 'radio'],
  person_name: ['text'],
  contact_phone: ['phone', 'tel', 'text'],
};

/**
 * Clean one field's chat settings. Unknown keys are dropped.
 * @returns {{ chat: object|null, errors: string[] }}
 */
function sanitizeChat(raw, fieldType, label = 'field') {
  const errors = [];
  if (raw === undefined || raw === null) return { chat: null, errors };
  if (typeof raw !== 'object' || Array.isArray(raw)) return { chat: null, errors: [`Chat settings for "${label}" must be an object.`] };
  const chat = {};
  if (raw.ask !== undefined) chat.ask = Boolean(raw.ask);
  if (raw.question !== undefined && raw.question !== null && String(raw.question).trim() !== '') {
    const q = String(raw.question).trim();
    if (q.length > MAX_QUESTION) errors.push(`The chat question for "${label}" is longer than ${MAX_QUESTION} characters.`);
    else chat.question = q;
  }
  if (raw.order !== undefined && raw.order !== null && raw.order !== '') {
    const n = Number(raw.order);
    if (!Number.isInteger(n) || n < 0 || n > 999) errors.push(`The chat order for "${label}" must be a whole number from 0 to 999.`);
    else chat.order = n;
  }
  if (raw.role !== undefined && raw.role !== null && raw.role !== '') {
    if (!ROLES.includes(raw.role)) errors.push(`Unknown role "${raw.role}" for "${label}". Use one of: ${ROLES.join(', ')}.`);
    else if (!ROLE_TYPES[raw.role].includes(String(fieldType || 'text').toLowerCase())) {
      errors.push(`The role "${raw.role}" does not fit "${label}" (a ${fieldType || 'text'} field).`);
    } else chat.role = raw.role;
  }
  return { chat: Object.keys(chat).length ? chat : null, errors };
}

/** Each role at most once per form. @param {Array<{label, chat}>} fields */
function roleErrors(fields) {
  const seen = new Map();
  const errors = [];
  for (const f of fields) {
    const role = f.chat && f.chat.role;
    if (!role) continue;
    if (seen.has(role)) errors.push(`Only one field can have the role "${role}" ("${seen.get(role)}" and "${f.label}").`);
    else seen.set(role, f.label);
  }
  return errors;
}

/** Field options with the chat settings merged in (choices etc. are kept). */
function withChat(options, chat) {
  const base = options && typeof options === 'object' && !Array.isArray(options)
    ? { ...options }
    : (Array.isArray(options) && options.length ? { choices: options } : {});
  delete base.chat;
  if (chat) base.chat = chat;
  return Object.keys(base).length ? base : null;
}

/** Clean module settings: missing keys mean "ask". */
function sanitizeAsks(raw) {
  const r = raw && typeof raw === 'object' ? raw : {};
  return { ask_area: r.ask_area !== false, ask_spot: r.ask_spot !== false, ask_photo: r.ask_photo !== false };
}

async function readAsks(client, entityTypeId) {
  const row = await client.dashboardMaster.findFirst({
    where: { entity_type_id: Number(entityTypeId), widget_name: ASSISTANT_CONFIG_WIDGET },
    orderBy: { dashboard_id: 'desc' },
  });
  if (!row || !row.filter) return sanitizeAsks(null);
  try { return sanitizeAsks(JSON.parse(row.filter)); } catch (err) { return sanitizeAsks(null); }
}

/** Create or replace the module's settings row (inside the caller's transaction if given one). */
async function writeAsks(client, entityTypeId, raw) {
  const asks = sanitizeAsks(raw);
  const existing = await client.dashboardMaster.findFirst({
    where: { entity_type_id: Number(entityTypeId), widget_name: ASSISTANT_CONFIG_WIDGET },
    orderBy: { dashboard_id: 'desc' },
  });
  if (existing) {
    await client.dashboardMaster.update({ where: { dashboard_id: existing.dashboard_id }, data: { filter: JSON.stringify(asks) } });
  } else {
    await client.dashboardMaster.create({
      data: { entity_type_id: Number(entityTypeId), widget_name: ASSISTANT_CONFIG_WIDGET, metric: 'config', display_type: 'config', filter: JSON.stringify(asks) },
    });
  }
  return asks;
}

module.exports = {
  ASSISTANT_CONFIG_WIDGET,
  ROLES,
  ROLE_TYPES,
  sanitizeChat,
  roleErrors,
  withChat,
  sanitizeAsks,
  readAsks,
  writeAsks,
};
