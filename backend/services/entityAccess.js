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

module.exports = { assertCanModifyEntity, STAFF_ROLES };
