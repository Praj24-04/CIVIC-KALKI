/**
 * CIVIC-KALKI — in-app notifications as a derived feed.
 *
 * Nothing is stored. The feed is computed on request from what the engine
 * already records:
 *   - AuditLog rows that carry a status change (old_status → new_status), and
 *   - AuditLog rows written when the rule engine auto-creates a linked entity.
 *
 * Who is told about a status change is metadata:
 *   1. If the WorkflowMaster transition that happened has NotificationRule rows,
 *      their notify_role values are the recipients ("owner" = the record's owner).
 *   2. Otherwise: the record's owner, plus every role that WorkflowMaster allows
 *      to act on the new status (the record has entered their queue).
 *
 * Area scoping matches the workflow engine: an area coordinator is told only
 * about records in their assigned area, a general coordinator only about
 * records with no area. Nobody is notified of their own action. A queue entry
 * disappears once the record has left that status.
 */

const prisma = require('../db');

const LOOKBACK_ROWS = 300;
const SEED_ACTOR_PREFIX = 'system/seed';
const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 100;
const OWNER_ROLES = new Set(['owner', 'citizen']);
const ADMIN_ROLES = new Set(['admin', 'director']);

function isUnassigned(area) {
  const a = String(area || '').trim().toLowerCase();
  return a === '' || a === 'unassigned';
}

/** Does a role-addressed notification about `entity` reach this user? */
function roleReaches(role, user, entity) {
  if (user.role !== role) return false;
  if (role === 'coordinator_area') {
    return String(entity.area || '').trim() !== '' &&
      String(entity.area).trim() === String(user.assignedArea || '').trim();
  }
  if (role === 'coordinator_general') return isUnassigned(entity.area);
  return true;
}

/**
 * @param {{ user_id:number, role:string, assignedArea?:string|null }} user
 * @param {{ limit?: number }} [options]
 * @returns {Promise<Array<object>>} newest first
 */
async function getNotificationFeed(user, options = {}) {
  const limit = Math.min(Math.max(1, Number(options.limit) || DEFAULT_LIMIT), MAX_LIMIT);
  const userId = Number(user.user_id);

  const [rows, workflows] = await Promise.all([
    prisma.auditLog.findMany({
      where: {
        OR: [{ new_status: { not: null } }, { action: 'auto_created' }],
        // Rows written by seeding ("system/seed…") describe simulated history, not
        // something a person did or needs to act on, so they notify nobody.
        AND: [{ OR: [{ user: null }, { NOT: { user: { startsWith: SEED_ACTOR_PREFIX } } }] }],
        entity: { entityType: { name: { not: 'Civic Campaign' } } },
      },
      orderBy: { datetime: 'desc' },
      take: LOOKBACK_ROWS,
      include: {
        actorUser: { select: { user_id: true, name: true, role: true } },
        entity: {
          select: {
            entity_id: true, name: true, area: true, status: true, owner_user_id: true,
            entity_type_id: true,
            entityType: { select: { name: true } },
            sourceEntity: { select: { entity_id: true, name: true, owner_user_id: true } },
          },
        },
      },
    }),
    prisma.workflowMaster.findMany({
      select: {
        entity_type_id: true, trigger: true, action: true, stage: true,
        notificationRules: { select: { notify_role: true } },
      },
    }),
  ]);

  const norm = (s) => String(s || '').trim().toLowerCase();
  const items = [];

  for (const row of rows) {
    const entity = row.entity;
    if (!entity) continue;
    if (row.actor_user_id !== null && Number(row.actor_user_id) === userId) continue;

    const base = {
      id: row.audit_id,
      datetime: row.datetime,
      entity_id: entity.entity_id,
      entity_name: entity.name,
      entity_type: entity.entityType?.name || null,
      area: entity.area || null,
      actor: row.actorUser ? row.actorUser.name : null,
    };

    // ── A linked entity was auto-created by a rule ──────────────────────────
    if (row.action === 'auto_created') {
      const source = entity.sourceEntity;
      const isSourceOwner = source && Number(source.owner_user_id) === userId;
      if (isSourceOwner || ADMIN_ROLES.has(user.role)) {
        items.push({
          ...base,
          kind: 'linked',
          message: source
            ? `A linked ${base.entity_type} "${entity.name}" was created automatically from "${source.name}".`
            : `A linked ${base.entity_type} "${entity.name}" was created automatically.`,
        });
        continue;
      }
      // Everyone else: fall through. The new record entered its workflow at
      // row.new_status, so whoever acts on that status gets it in their queue.
      if (!row.new_status) continue;
    }

    // ── A status change ─────────────────────────────────────────────────────
    const from = norm(row.old_status);
    const to = norm(row.new_status);
    if (!to || from === to) continue;

    const typeWorkflows = workflows.filter((w) => w.entity_type_id === entity.entity_type_id);
    const happened = typeWorkflows.filter((w) => norm(w.trigger) === from && norm(w.action) === to);
    const configured = happened.flatMap((w) => w.notificationRules.map((r) => norm(r.notify_role))).filter(Boolean);
    const nextRoles = typeWorkflows.filter((w) => norm(w.trigger) === to).map((w) => norm(w.stage)).filter(Boolean);

    const recipients = new Set(configured.length ? configured : ['owner', ...nextRoles]);
    const isOwner = entity.owner_user_id !== null && Number(entity.owner_user_id) === userId;

    if (isOwner && [...recipients].some((r) => OWNER_ROLES.has(r))) {
      items.push({
        ...base,
        kind: 'status',
        from_status: from || null,
        to_status: to,
        message: `Your ${base.entity_type} "${entity.name}" moved from "${from || 'new'}" to "${to}".`,
      });
      continue;
    }

    const roleHit = [...recipients].some((r) => !OWNER_ROLES.has(r) && roleReaches(r, user, entity));
    if (roleHit) {
      // Recipients named by a NotificationRule are told about the change itself;
      // only the default "next approver" recipients get a queue entry.
      const waiting = configured.length === 0 && nextRoles.includes(norm(user.role));
      // "Waiting for your review" is only true while the record is still in that
      // status. Once it has moved on, the old queue entry is dropped.
      if (waiting && norm(entity.status) !== to) continue;
      items.push({
        ...base,
        kind: waiting ? 'queue' : 'status',
        from_status: from || null,
        to_status: to,
        message: waiting
          ? `${base.entity_type} "${entity.name}"${entity.area ? ` (${entity.area})` : ''} is now "${to}" and waiting for your review.`
          : `${base.entity_type} "${entity.name}" moved from "${from || 'new'}" to "${to}".`,
      });
    }
  }

  return items.slice(0, limit);
}

module.exports = { getNotificationFeed };
