/**
 * CIVIC-KALKI — who may modify an entity's own data (fields, values, files).
 *
 * Shared by the entity, value and file routes so the rule is written once:
 *   - the caller must be signed in;
 *   - the owner may modify their entity;
 *   - staff roles may modify any entity;
 *   - an entity with no owner (for example one created by the rule engine)
 *     may be modified by staff only.
 *
 * Status changes are not covered here: they go through the workflow engine.
 */

const STAFF_ROLES = ['admin', 'director', 'coordinator_area', 'coordinator_general'];

function httpError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

/**
 * Throws 401 or 403 if `user` may not modify `entity`; returns true otherwise.
 */
function assertCanModifyEntity(entity, user) {
  if (!user || !user.user_id) {
    throw httpError('Authentication is required to modify this entity.', 401);
  }
  if (STAFF_ROLES.includes(user.role)) return true;

  const ownerId = entity ? entity.owner_user_id : null;
  if (ownerId !== null && ownerId !== undefined && Number(ownerId) === Number(user.user_id)) {
    return true;
  }
  throw httpError('You do not have permission to modify this entity.', 403);
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

/**
 * Owner fields safe to return to this caller: an email address only goes to
 * staff and to the owner themselves, never to anonymous visitors or other citizens.
 */
function ownerSelectFor(user) {
  return { user_id: true, name: true, email: Boolean(user && STAFF_ROLES.includes(user.role)) };
}

module.exports = {
  assertCanModifyEntity,
  assertCanReadEntityData,
  assertOwnerOrStaff,
  viewerLevel,
  ownerSelectFor,
  isPublicStatus,
  STAFF_ROLES,
  PUBLIC_STATUS,
};
