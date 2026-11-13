/**
 * CIVIC-KALKI — Generic Workflow Engine Service
 *
 * Provides metadata-driven workflow evaluation and transition execution
 * using the WorkflowMaster table (entity_type_id, trigger, action, stage).
 *
 * Mapping:
 * - trigger: starting state (e.g. "draft", "submitted", "coordinator_approved")
 * - action: target state (e.g. "submitted", "coordinator_approved", "approved", "rejected")
 * - stage: allowed role (e.g. "citizen", "coordinator_area", "coordinator_general", "director", "admin")
 */

const prisma = require('../db');
const { checkAndFireRules } = require('./ruleEngine');

function createHttpError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

/**
 * Fetch configured WorkflowMaster transition rules for an EntityType.
 */
async function getWorkflowMasterRules(entityTypeId) {
  return prisma.workflowMaster.findMany({
    where: { entity_type_id: Number(entityTypeId) },
    orderBy: { workflow_id: 'asc' },
  });
}

const STAFF_ROLES = ['admin', 'director', 'coordinator_area', 'coordinator_general'];
const TERMINAL_STATUSES = ['approved', 'rejected', 'deleted'];
const FALLBACK_TARGETS = ['submitted', 'coordinator_approved', 'approved', 'rejected'];

/**
 * The area scope of a coordinator: an area coordinator handles their own ward,
 * a general coordinator the records with no ward. Returns a reason when the
 * record is outside the actor's scope, null otherwise (other roles: no area limit).
 */
function areaScopeError(entity, actorRole, actorAssignedArea) {
  const role = String(actorRole || '').trim().toLowerCase();
  const entityArea = String(entity.area || '').trim();
  if (role === 'coordinator_area') {
    const assignedArea = String(actorAssignedArea || '').trim();
    if (!entityArea || entityArea !== assignedArea) {
      return `Area Coordinator assigned to "${assignedArea}" cannot review entity in area "${entityArea || 'Unassigned'}".`;
    }
  } else if (role === 'coordinator_general') {
    if (entityArea && entityArea !== 'Unassigned') {
      return 'General Coordinator can only handle entities in unassigned areas.';
    }
  }
  return null;
}

/**
 * Who may change a record's own data (fields, values, files) or withdraw it.
 * One rule, used by every write route and by the "deleted" transition:
 *   - staff must be within their area scope; other users must own the record (403);
 *   - approved, rejected and deleted records are locked for everyone (409);
 *   - a draft may be changed by its owner or by in-scope staff;
 *   - past draft, only while the workflow gives this actor a move from the
 *     record's current status (it is their turn); otherwise locked (409).
 * Returns { allowed, code, reason }.
 */
async function canActorWrite({ entity, actorRole, actorUserId, actorAssignedArea }) {
  const status = String(entity.status || 'draft').trim().toLowerCase();
  const role = String(actorRole || '').trim().toLowerCase();

  const isStaff = STAFF_ROLES.includes(role);
  const isOwner = entity.owner_user_id !== null && entity.owner_user_id !== undefined
    && Number(entity.owner_user_id) === Number(actorUserId);

  if (isStaff) {
    const scopeError = areaScopeError(entity, role, actorAssignedArea);
    if (scopeError) return { allowed: false, code: 403, reason: scopeError };
  } else if (!isOwner) {
    return { allowed: false, code: 403, reason: 'You do not have permission to modify this entity.' };
  }

  if (TERMINAL_STATUSES.includes(status)) {
    return { allowed: false, code: 409, reason: `This record is "${status}" and can no longer be changed.` };
  }

  if (status === 'draft') return { allowed: true };

  const rules = await getWorkflowMasterRules(entity.entity_type_id);
  const targets = rules.length > 0
    ? [...new Set(rules
      .filter((r) => String(r.trigger || '').trim().toLowerCase() === status)
      .map((r) => String(r.action || '').trim().toLowerCase()))]
    : FALLBACK_TARGETS;

  for (const target of targets) {
    if (target === 'deleted') continue;
    const v = await validateWorkflowTransition({ entity, targetStatus: target, actorRole: role, actorUserId, actorAssignedArea });
    if (v.allowed) return { allowed: true };
  }
  return {
    allowed: false,
    code: 409,
    reason: `This record is "${status}" and is locked for you; it can change only through its workflow.`,
  };
}

/**
 * Check if a workflow transition is permitted by metadata or fallback rules.
 */
async function validateWorkflowTransition({
  entity,
  targetStatus,
  actorRole,
  actorUserId,
  actorAssignedArea,
}) {
  const currentStatus = String(entity.status || 'draft').trim().toLowerCase();
  const normalizedTarget = String(targetStatus).trim().toLowerCase();

  if (currentStatus === 'deleted') {
    return { allowed: false, reason: 'Deleted entities cannot transition states.' };
  }

  if (currentStatus === 'approved' || currentStatus === 'rejected') {
    return { allowed: false, reason: `Entity is in terminal state "${currentStatus}".` };
  }

  // Deleting is a workflow move: whoever may still change the record may withdraw
  // it. A module may also grant it explicitly in WorkflowMaster (checked below).
  if (normalizedTarget === 'deleted') {
    const write = await canActorWrite({ entity, actorRole, actorUserId, actorAssignedArea });
    if (write.allowed) return { allowed: true, source: 'write-rule' };
  }

  // Fetch WorkflowMaster rules for entity's EntityType
  const workflowRules = await getWorkflowMasterRules(entity.entity_type_id);

  if (workflowRules.length > 0) {
    // ── Metadata-Driven Workflow Validation ─────────────────────────────────
    const matchingRule = workflowRules.find((r) => {
      const trig = String(r.trigger || '').trim().toLowerCase();
      const act = String(r.action || '').trim().toLowerCase();
      const stg = String(r.stage || '').trim().toLowerCase();
      
      const triggerMatches = trig === currentStatus;
      const actionMatches = act === normalizedTarget;
      const roleMatches = stg === actorRole.toLowerCase() || stg.split(',').map(s => s.trim()).includes(actorRole.toLowerCase());

      return triggerMatches && actionMatches && roleMatches;
    });

    if (!matchingRule) {
      return {
        allowed: false,
        reason: `WorkflowMaster metadata does not permit role "${actorRole}" to transition from "${currentStatus}" to "${normalizedTarget}".`,
        source: 'metadata',
      };
    }

    // Role-specific ownership and area constraints
    if (actorRole === 'citizen') {
      if (entity.owner_user_id && Number(actorUserId) !== Number(entity.owner_user_id)) {
        return { allowed: false, reason: 'Only the entity owner can perform this citizen transition.', source: 'metadata' };
      }
    } else {
      const scopeError = areaScopeError(entity, actorRole, actorAssignedArea);
      if (scopeError) return { allowed: false, reason: scopeError, source: 'metadata' };
    }

    return { allowed: true, rule: matchingRule, source: 'metadata' };

  } else {
    // ── Fallback: Legacy Standard Workflow Validation ────────────────────────
    console.warn(`[WORKFLOW ENGINE FALLBACK] No WorkflowMaster rules found for entity_type_id ${entity.entity_type_id}. Using standard fallback lifecycle.`);

    let allowed = false;

    if (actorRole === 'citizen' && currentStatus === 'draft' && normalizedTarget === 'submitted') {
      allowed = Number(actorUserId) === Number(entity.owner_user_id);
    } else if (actorRole === 'coordinator_area' && currentStatus === 'submitted') {
      const entityArea = String(entity.area || '').trim();
      const assignedArea = String(actorAssignedArea || '').trim();
      if (['coordinator_approved', 'rejected'].includes(normalizedTarget)) {
        allowed = entityArea === assignedArea;
      }
    } else if (actorRole === 'coordinator_general' && currentStatus === 'submitted') {
      const entityArea = String(entity.area || '').trim();
      if (['coordinator_approved', 'rejected'].includes(normalizedTarget)) {
        allowed = !entityArea || entityArea === 'Unassigned';
      }
    } else if (['director', 'admin'].includes(actorRole) && currentStatus === 'coordinator_approved') {
      if (['approved', 'rejected'].includes(normalizedTarget)) {
        allowed = true;
      }
    }

    return {
      allowed,
      reason: allowed ? null : `Fallback workflow does not allow role "${actorRole}" to transition from "${currentStatus}" to "${normalizedTarget}".`,
      source: 'fallback',
    };
  }
}

/**
 * Execute a valid status transition for an entity.
 */
async function executeWorkflowTransition({
  entityId,
  toStatus,
  reason,
  user,
}) {
  const parsedId = Number(entityId);

  const entity = await prisma.entity.findUnique({
    where: { entity_id: parsedId },
    include: { entityType: true },
  });

  if (!entity) {
    throw createHttpError(`Entity with id ${parsedId} was not found.`, 404);
  }

  const normalizedToStatus = String(toStatus).trim().toLowerCase();

  // Fetch actor assigned area and role from DB if user_id is provided
  let actorAssignedArea = user.assignedArea || user.assigned_area || null;
  let actorRole = user.role;
  if (user.user_id) {
    const dbUser = await prisma.user.findUnique({
      where: { user_id: Number(user.user_id) },
      select: { assignedArea: true, role: true },
    });
    if (dbUser) {
      actorAssignedArea = dbUser.assignedArea || null;
      if (dbUser.role) actorRole = dbUser.role;
    }
  }

  const validation = await validateWorkflowTransition({
    entity,
    targetStatus: normalizedToStatus,
    actorRole,
    actorUserId: user.user_id,
    actorAssignedArea,
  });

  if (!validation.allowed) {
    throw createHttpError(validation.reason || `Cannot transition entity from ${entity.status} to ${normalizedToStatus}.`, 400);
  }

  const previousStatus = entity.status || 'draft';

  // One transaction: status change, audit log, approval history, and — on approval —
  // every entity the rule engine creates. If a rule fails, nothing is committed and
  // the entity keeps its previous status.
  const { updatedEntity, ruleResult } = await prisma.$transaction(async (tx) => {
    // Compare-and-set: the write only applies if the entity still has the status
    // the transition was validated against. A concurrent or repeated request
    // finds nothing to update and gets 409 without writing audit or history rows.
    const { count } = await tx.entity.updateMany({
      where: { entity_id: parsedId, status: entity.status },
      data: { status: normalizedToStatus },
    });
    if (count !== 1) {
      throw createHttpError(
        `Entity ${parsedId} is no longer in status "${previousStatus}"; it was changed by another request. Reload and try again.`,
        409
      );
    }
    const updated = await tx.entity.findUnique({ where: { entity_id: parsedId } });

    await tx.auditLog.create({
      data: {
        entity_id: parsedId,
        actor_user_id: user.user_id,
        action: 'status_transition',
        user: user.name,
        old_status: previousStatus,
        new_status: normalizedToStatus,
        reason: reason ? String(reason).trim() : null,
      },
    });

    await tx.approvalHistory.create({
      data: {
        entity_id: parsedId,
        actor_user_id: user.user_id,
        from_status: previousStatus,
        to_status: normalizedToStatus,
        reason: reason ? String(reason).trim() : null,
      },
    });

    let fired = null;
    if (normalizedToStatus === 'approved') {
      try {
        fired = await checkAndFireRules(parsedId, 'approved', { tx });
      } catch (ruleErr) {
        console.error(`[RULE ENGINE ERROR] Rules failed for entity #${parsedId}; the approval was rolled back:`, ruleErr);
        throw ruleErr;
      }
    }

    return { updatedEntity: updated, ruleResult: fired };
  }, { maxWait: 10000, timeout: 20000 });

  return {
    updatedEntity,
    previousStatus,
    newStatus: normalizedToStatus,
    workflowSource: validation.source,
    ruleResult,
  };
}

module.exports = {
  getWorkflowMasterRules,
  validateWorkflowTransition,
  executeWorkflowTransition,
  canActorWrite,
  areaScopeError,
};
