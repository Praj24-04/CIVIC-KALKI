/**
 * CIVIC-KALKI — who may modify an entity's own data (fields, values, files).
 *
 * Shared by the entity, value and file routes so the rule is written once:
 *   - the caller must be signed in;
 *   - the owner may modify their entity, staff only within their area scope;
 *   - an entity with no owner (for example one created by the rule engine)
 *     may be modified by staff only;
 *   - the record's status may lock it (see canActorWrite in workflowEngine).
 *
 * Status changes are not covered here: they go through the workflow engine.
 *
 * assertCanWriteEntity is the write guard every modifying route uses (edit,
 * values, files, delete): area scope, status lock and ownership, decided by the
 * workflow engine's canActorWrite. writeAudit records each change with its old
 * and new values, inside the same transaction as the change.
 */

const { canActorWrite } = require('./workflowEngine');

const STAFF_ROLES = ['admin', 'director', 'coordinator_area', 'coordinator_general'];

function httpError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

// The one status at which a record is public. Compared the way the location
// rules compare it: trimmed and case-insensitive ("Approved" counts).
const PUBLIC_STATUS = 'approved';

function isPublicStatus(status) {
  return String(status || '').trim().toLowerCase() === PUBLIC_STATUS;
}

/**
 * How much of a record this caller may see:
 *   'staff'  — a staff role: everything;
 *   'owner'  — the citizen who filed it: everything about their own record;
 *   'public' — anyone else, signed in or not, when the record is approved;
 *   'none'   — anyone else when it is not approved.
 * Being signed in gives a citizen no access to another citizen's record.
 */
function viewerLevel(entity, user) {
  if (user && user.user_id) {
    if (STAFF_ROLES.includes(user.role)) return 'staff';
    const ownerId = entity ? entity.owner_user_id : null;
    if (ownerId !== null && ownerId !== undefined && Number(ownerId) === Number(user.user_id)) return 'owner';
  }
  return entity && isPublicStatus(entity.status) ? 'public' : 'none';
}

/**
 * Throws unless the caller may read the record; returns the viewer level.
 * A record the caller may not read answers like one that does not exist (404),
 * except that an anonymous caller is told to sign in (401).
 */
function assertCanReadEntityData(entity, user) {
  const level = viewerLevel(entity, user);
  if (level !== 'none') return level;
  if (!user || !user.user_id) throw httpError('Sign in to view this record.', 401);
  throw httpError(`Entity with id ${entity ? entity.entity_id : ''} was not found.`, 404);
}

/**
 * The parts of a record that are about the people involved — its audit trail,
 * lineage and workflow — are for the owner and staff only, whatever its status.
 */
function assertOwnerOrStaff(entity, user) {
  const level = viewerLevel(entity, user);
  if (level === 'staff' || level === 'owner') return level;
  if (!user || !user.user_id) throw httpError('Sign in to view this record.', 401);
  throw httpError(`Entity with id ${entity ? entity.entity_id : ''} was not found.`, 404);
}

// ── What a public viewer never gets ─────────────────────────────────────────
// Fields that identify or reach a person, and anything attached. Decided from
// the field's own metadata (type, key, label), so it applies to every module,
// including ones built in the app.
const PRIVATE_FIELD_TYPES = new Set(['email', 'phone', 'tel', 'file', 'image', 'signature']);
const PRIVATE_FIELD_NAME = /(report(er|ed[_ ]?by)|complainant|applicant|contact|phone|mobile|whats ?app|e-?mail|aadhaa?r|\bpan\b|passport[_ ]?n|date[_ ]?of[_ ]?birth|\bdob\b|home[_ ]?address|guardian|next[_ ]?of[_ ]?kin)/i;

/** True if a field (ParameterMaster) holds contact details, identity details or an attachment. */
function isPrivateField(parameter) {
  if (!parameter) return true; // no metadata: do not publish what cannot be classified
  const types = [parameter.field_type, parameter.control_type].map((t) => String(t || '').toLowerCase());
  if (types.some((t) => PRIVATE_FIELD_TYPES.has(t))) return true;
  return PRIVATE_FIELD_NAME.test(String(parameter.field_key || '')) || PRIVATE_FIELD_NAME.test(String(parameter.label || ''));
}

/**
 * Remove who filed a record when the caller is only a public viewer of it:
 * no name, no email, no user id. Returns the same object.
 */
function redactOwnerForViewer(entity, user) {
  if (entity && viewerLevel(entity, user) === 'public') {
    if ('owner' in entity) entity.owner = null;
    entity.owner_user_id = null;
  }
  return entity;
}

/** The field values a public viewer may see: everything except private fields. */
function publicValues(values) {
  return (values || []).filter((v) => !isPrivateField(v.parameterMaster));
}

/**
 * Owner fields safe to return to this caller: an email address only goes to
 * staff and to the owner themselves, never to anonymous visitors or other citizens.
 */
function ownerSelectFor(user) {
  return { user_id: true, name: true, email: Boolean(user && STAFF_ROLES.includes(user.role)) };
}

/**
 * The write guard. Throws 401 (not signed in), 403 (not the owner, or outside the
 * caller's area scope) or 409 (the record's status locks it for this caller).
 */
async function assertCanWriteEntity(entity, user) {
  if (!user || !user.user_id) {
    throw httpError('Authentication is required to modify this entity.', 401);
  }
  const result = await canActorWrite({
    entity,
    actorRole: user.role,
    actorUserId: user.user_id,
    actorAssignedArea: user.assignedArea || user.assigned_area || null,
  });
  if (!result.allowed) throw httpError(result.reason, result.code);
  return true;
}

/**
 * { field: { old, new } } for every key in `after` whose value differs from `before`.
 */
function diffChanges(before, after) {
  const changes = {};
  for (const key of Object.keys(after)) {
    const oldValue = before[key] === undefined ? null : before[key];
    const newValue = after[key] === undefined ? null : after[key];
    if (String(oldValue) !== String(newValue)) changes[key] = { old: oldValue, new: newValue };
  }
  return changes;
}

/**
 * Writes one audit row for a data change. Pass the transaction client so the row
 * commits or rolls back with the change itself.
 */
function writeAudit(tx, { entityId, user, action, changes, reason }) {
  return tx.auditLog.create({
    data: {
      entity_id: Number(entityId),
      actor_user_id: Number(user.user_id),
      user: user.name || null,
      action,
      changes: changes || {},
      reason: reason || null,
    },
  });
}

module.exports = {
  assertCanWriteEntity,
  diffChanges,
  writeAudit,
  assertCanReadEntityData,
  assertOwnerOrStaff,
  viewerLevel,
  isPrivateField,
  redactOwnerForViewer,
  publicValues,
  ownerSelectFor,
  isPublicStatus,
  STAFF_ROLES,
  PUBLIC_STATUS,
};
