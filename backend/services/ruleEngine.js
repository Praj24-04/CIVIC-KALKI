/**
 * CIVIC-KALKI — Rule Engine Service
 * Core "no-code" auto-creation mechanism.
 *
 * When a defined event happens on an entity (e.g. status → "approved"),
 * this engine checks EntityRelationshipRule and automatically creates
 * any linked target entities — with zero hardcoded per-module logic.
 *
 * Supports recursive chaining: if a newly auto-created entity itself
 * has status "approved" (via auto_approve), the engine checks for
 * further rules, up to MAX_CHAIN_DEPTH to prevent infinite loops.
 *
 * Atomic: everything one call creates (children, their values, audit rows,
 * chained children) happens in a single transaction. Pass `options.tx` to run
 * inside the caller's transaction, so that a status change and the entities it
 * creates commit or roll back together.
 *
 * Idempotent: each child records its source entity and rule
 * (Entity.source_entity_id, Entity.source_rule_id, unique together). Firing the
 * same rule for the same source again creates nothing and reports the existing
 * child under `skippedExisting`.
 */

const prisma = require('../db');

// ── Constants ─────────────────────────────────────────────────────────────────
const MAX_CHAIN_DEPTH = 3;
// Interactive-transaction limits; generous because the database may be remote.
const TX_OPTIONS = { maxWait: 10000, timeout: 20000 };

/**
 * Check EntityRelationshipRule table for matching rules and fire them.
 *
 * @param {number}  entityId   The entity that just had something happen.
 * @param {string}  eventType  What happened (e.g. "approved", "created").
 * @param {object}  [options]
 * @param {object}  [options.tx]  Prisma transaction client to run inside. Without it
 *                                the engine opens its own transaction.
 * @returns {Promise<{ rulesFired: number, createdEntities: object[], skippedExisting: object[], chainDepth: number, warnings: string[] }>}
 */
async function checkAndFireRules(entityId, eventType, options = {}) {
  if (options.tx) {
    return fireRulesInTransaction(options.tx, entityId, eventType, 0);
  }
  // Two calls can race to create the same child: the unique (source, rule) pair
  // rejects the later one (P2002) and rolls its transaction back. By then the
  // winner's child is committed, so another pass finds it and reports it as skipped.
  const MAX_ATTEMPTS = 3;
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await prisma.$transaction((tx) => fireRulesInTransaction(tx, entityId, eventType, 0), TX_OPTIONS);
    } catch (err) {
      if (!(err && err.code === 'P2002') || attempt >= MAX_ATTEMPTS) throw err;
    }
  }
}

async function fireRulesInTransaction(tx, entityId, eventType, depth) {
  const result = {
    rulesFired: 0,
    createdEntities: [],
    skippedExisting: [],
    chainDepth: depth,
    warnings: [],
  };

  // ── Guard: chain depth limit ──────────────────────────────────────────────
  if (depth >= MAX_CHAIN_DEPTH) {
    const msg = `Rule engine chain depth limit (${MAX_CHAIN_DEPTH}) reached for entity ${entityId}, event "${eventType}". Stopping to prevent infinite loop.`;
    console.warn(`[RULE ENGINE WARNING] ${msg}`);
    result.warnings.push(msg);
    return result;
  }

  // ── 1. Fetch the source entity ────────────────────────────────────────────
  const sourceEntity = await tx.entity.findUnique({
    where: { entity_id: entityId },
    include: {
      entityType: true,
    },
  });

  if (!sourceEntity) {
    throw Object.assign(
      new Error(`Rule engine: entity with id ${entityId} was not found.`),
      { statusCode: 404 }
    );
  }

  // ── 2. Find matching rules ────────────────────────────────────────────────
  const matchingRules = await tx.entityRelationshipRule.findMany({
    where: {
      source_entity_type_id: sourceEntity.entity_type_id,
      event: eventType,
    },
    include: {
      targetEntityType: true,   // need the name to build default entity name
    },
    orderBy: { rule_id: 'asc' },
  });

  if (matchingRules.length === 0) {
    return result; // No rules matched — this is normal, not an error
  }

  // ── 3. Fire each matching rule ────────────────────────────────────────────
  for (const rule of matchingRules) {
    if (!rule.auto_create) {
      // Rule exists but auto_create is false — skip it, just log
      console.log(
        `[RULE ENGINE] Rule ${rule.rule_id} matched but auto_create is false — skipping.`
      );
      continue;
    }

    // ── Idempotency: this rule has already created a child for this source ──
    const existingChild = await tx.entity.findUnique({
      where: {
        source_entity_id_source_rule_id: {
          source_entity_id: sourceEntity.entity_id,
          source_rule_id: rule.rule_id,
        },
      },
      select: { entity_id: true, name: true, status: true },
    });
    if (existingChild) {
      result.skippedExisting.push({ ...existingChild, triggered_by_rule_id: rule.rule_id });
      continue;
    }

    const targetTypeName = rule.targetEntityType.name;
    const newEntityName = `${sourceEntity.name} - ${targetTypeName}`;
    // A record the engine creates enters its own module's workflow at the first
    // status, exactly as if a citizen had filed it, so the usual role can pick it up.
    const newStatus = rule.auto_approve ? 'approved' : await firstWorkflowStatus(tx, rule.target_entity_type_id);

    // Visibility-aware coordinate inheritance:
    // Never copy coordinates from a parent whose location_visibility is "restricted"
    // onto a child whose EntityType is "public_when_approved".
    const parentVisibility = sourceEntity.entityType?.location_visibility || 'restricted';
    const childVisibility = rule.targetEntityType?.location_visibility || 'restricted';
    const canCopyLocation = shouldCopyLocation(parentVisibility, childVisibility);

    // ── Create entity + default parameters + audit log (all in the surrounding transaction) ──
    const { newEntity, auditEntry } = await (async () => {
      const created = await tx.entity.create({
        data: {
          entity_type_id: rule.target_entity_type_id,
          name: newEntityName,
          location: canCopyLocation ? sourceEntity.location : null,
          latitude: canCopyLocation ? sourceEntity.latitude : null,
          longitude: canCopyLocation ? sourceEntity.longitude : null,
          area: sourceEntity.area, // inherit area from source
          status: newStatus,
          source_entity_id: sourceEntity.entity_id,
          source_rule_id: rule.rule_id,
        },
        include: {
          entityType: {
            select: { entity_type_id: true, name: true, location_visibility: true },
          },
        },
      });

      // Find parameters for target entity type and auto-seed parent references
      const targetForms = await tx.formMaster.findMany({
        where: { entity_type_id: rule.target_entity_type_id },
        select: {
          sections: {
            select: {
              subsections: {
                select: {
                  parameters: true,
                },
              },
            },
          },
        },
      });

      const allParams = [];
      for (const form of targetForms) {
        for (const sec of form.sections) {
          for (const sub of sec.subsections) {
            allParams.push(...sub.parameters);
          }
        }
      }

      for (const param of allParams) {
        const key = String(param.field_key || '').toLowerCase();
        let valToInsert = null;
        if (key === 'linked_movement_id' || key === 'movement_id') {
          valToInsert = String(sourceEntity.entity_id);
        } else if (key === 'reference_number') {
          valToInsert = `REF-${sourceEntity.entity_id}-${created.entity_id}`;
        }

        if (valToInsert !== null) {
          await tx.parameterValue.upsert({
            where: {
              entity_id_parameter_id: {
                entity_id: created.entity_id,
                parameter_id: param.parameter_id,
              },
            },
            update: { value: valToInsert },
            create: {
              entity_id: created.entity_id,
              parameter_id: param.parameter_id,
              value: valToInsert,
            },
          });
        }
      }

      const audit = await tx.auditLog.create({
        data: {
          entity_id: created.entity_id,
          action: 'auto_created',
          user: 'system/rule-engine',
          // The status it starts in, so the notification feed can tell whose turn it is.
          new_status: created.status,
          reason: [
            `Rule ${rule.rule_id} fired:`,
            `source entity #${sourceEntity.entity_id} (${sourceEntity.name})`,
            `event "${eventType}"`,
            `→ auto-created ${targetTypeName} entity #${created.entity_id}`,
            rule.auto_approve ? '(auto-approved)' : `(status: ${created.status})`,
          ].join(' | '),
        },
      });

      return { newEntity: created, auditEntry: audit };
    })();

    console.log(
      `[RULE ENGINE] Rule ${rule.rule_id}: auto-created entity #${newEntity.entity_id} ` +
      `"${newEntity.name}" (type: ${targetTypeName}, status: ${newEntity.status})`
    );

    result.rulesFired += 1;
    result.createdEntities.push({
      entity_id: newEntity.entity_id,
      name: newEntity.name,
      entity_type_id: newEntity.entity_type_id,
      status: newEntity.status,
      entityType: newEntity.entityType,
      triggered_by_rule_id: rule.rule_id,
      audit_id: auditEntry.audit_id,
    });

    // ── 4. Recursive chaining: if auto-approved, check for further rules ──
    if (rule.auto_approve) {
      console.log(
        `[RULE ENGINE] Entity #${newEntity.entity_id} was auto-approved — ` +
        `checking for chained rules (depth ${depth + 1})…`
      );

      const chainResult = await fireRulesInTransaction(
        tx,
        newEntity.entity_id,
        'approved',
        depth + 1
      );

      // Merge chain results into the top-level result
      result.rulesFired += chainResult.rulesFired;
      result.createdEntities.push(...chainResult.createdEntities);
      result.skippedExisting.push(...chainResult.skippedExisting);
      result.warnings.push(...chainResult.warnings);
    }
  }

  return result;
}

/**
 * The status a new record of this type starts its workflow in: where the
 * type's workflow takes a draft (normally "submitted"). Read from WorkflowMaster,
 * so it is right for every module, including ones built in the app. If the type
 * has no workflow at all, the old placeholder "pending" is kept.
 */
async function firstWorkflowStatus(tx, entityTypeId) {
  const steps = await tx.workflowMaster.findMany({
    where: { entity_type_id: entityTypeId },
    orderBy: { workflow_id: 'asc' },
    select: { trigger: true, action: true },
  });
  const norm = (s) => String(s || '').trim().toLowerCase();
  const fromDraft = steps.find((s) => norm(s.trigger) === 'draft' && norm(s.action));
  if (fromDraft) return norm(fromDraft.action);
  // No draft step: start at a status that the workflow leaves but never enters.
  const entered = new Set(steps.map((s) => norm(s.action)));
  const root = steps.map((s) => norm(s.trigger)).find((t) => t && !entered.has(t));
  return root || 'pending';
}

/**
 * Checks whether location/coordinates may be copied from parent to child entity.
 * Copying is allowed ONLY when it cannot make the location more visible.
 *
 * Matrix:
 * - restricted -> public_when_approved: FALSE (prevents leaking restricted coordinates to public)
 * - restricted -> restricted: TRUE (same visibility)
 * - public_when_approved -> public_when_approved: TRUE (same visibility)
 * - public_when_approved -> restricted: TRUE (becomes more restrictive, no leakage)
 */
function shouldCopyLocation(parentVisibility, childVisibility) {
  const normParent = String(parentVisibility || 'hidden').trim().toLowerCase();
  const normChild = String(childVisibility || 'hidden').trim().toLowerCase();

  const isParentHidden = normParent === 'hidden' || normParent === 'restricted';
  if (isParentHidden && normChild === 'public_when_approved') {
    return false;
  }
  return true;
}

module.exports = { checkAndFireRules, shouldCopyLocation, firstWorkflowStatus };
