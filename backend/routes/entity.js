/**
 * CIVIC-KALKI — Generic Entity Engine
 * Provides CRUD endpoints that work for ANY entity type.
 * Entity type identity is carried only by entity_type_id — same
 * endpoints serve Movements, Grievances, or any future type.
 *
 * Routes:
 *   POST   /entities
 *   GET    /entities
 *   GET    /entities/:id
 *   PUT    /entities/:id
 *   DELETE /entities/:id  (soft-delete: sets status = 'deleted')
 */

const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const { checkAndFireRules } = require('../services/ruleEngine');
const { generateIntelligenceReport } = require('../services/aiSuggestion');
const { executeWorkflowTransition, getWorkflowMasterRules, validateWorkflowTransition } = require('../services/workflowEngine');
const { applyLocationVisibility, applyLocationVisibilityMany } = require('../services/locationVisibility');
const prisma = require('../db');
const { getNotificationFeed } = require('../services/notificationFeed');
const { assertCanModifyEntity, assertOwnerOrStaff, viewerLevel, ownerSelectFor, isPublicStatus, PUBLIC_STATUS, STAFF_ROLES } = require('../services/entityAccess');

// Largest page a client may ask for.
const MAX_PAGE_SIZE = 100;

// ── Helper: create an HTTP-aware error ────────────────────────────────────────
function createError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

// ── Helper: parse a positive integer from a raw value ────────────────────────
function parsePositiveInt(value, fieldName) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw createError(
      `"${fieldName}" must be a positive integer. Received: ${value}`,
      400
    );
  }
  return parsed;
}

// ── Helper: validate coordinates (latitude [-90,90], longitude [-180,180]) ───
function validateCoordinates(latitude, longitude) {
  const hasLat = latitude !== undefined && latitude !== null && latitude !== '';
  const hasLng = longitude !== undefined && longitude !== null && longitude !== '';

  if (hasLat !== hasLng) {
    throw createError('Both "latitude" and "longitude" must be provided together, or neither.', 400);
  }

  if (hasLat && hasLng) {
    const lat = Number(latitude);
    const lng = Number(longitude);

    if (isNaN(lat) || typeof lat !== 'number' || lat < -90 || lat > 90) {
      throw createError('"latitude" must be a valid number between -90 and 90.', 400);
    }
    if (isNaN(lng) || typeof lng !== 'number' || lng < -180 || lng > 180) {
      throw createError('"longitude" must be a valid number between -180 and 180.', 400);
    }
    return { latitude: lat, longitude: lng };
  }

  return { latitude: null, longitude: null };
}

// ── Helper: exact Haversine distance in kilometers ───────────────────────────
function haversineDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// ── Helper: check owner or staff role permission on entity ──────────────────
function checkEntityOwnership(existingEntity, reqUser) {
  return assertCanModifyEntity(existingEntity, reqUser);
}

// ── GET /entities/entity-types — list all EntityTypes ────────────────────────
router.get('/entity-types', async (req, res, next) => {
  try {
    const types = await prisma.entityType.findMany({
      orderBy: { entity_type_id: 'asc' },
    });
    return res.status(200).json({ success: true, data: types });
  } catch (err) {
    return next(err);
  }
});

// ── POST /entities/entity-types — create a new EntityType ─────────────────────
router.post('/entity-types', verifyToken, checkRole(['admin', 'director']), async (req, res, next) => {
  try {
    const { name, description, domain_id } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return next(createError('"name" is required and must be a non-empty string.', 400));
    }
    const existing = await prisma.entityType.findFirst({
      where: { name: { equals: name.trim(), mode: 'insensitive' } },
    });
    if (existing) {
      return next(createError(`EntityType with name "${name.trim()}" already exists.`, 400));
    }
    let targetDomainId = domain_id ? Number(domain_id) : 1;
    let domain = await prisma.domain.findUnique({ where: { domain_id: targetDomainId } });
    if (!domain) {
      domain = await prisma.domain.findFirst();
      targetDomainId = domain ? domain.domain_id : 1;
    }
    const entityType = await prisma.entityType.create({
      data: {
        domain_id: targetDomainId,
        name: name.trim(),
        description: description ? String(description).trim() : null,
      },
    });
    return res.status(201).json({ success: true, data: entityType });
  } catch (err) {
    return next(err);
  }
});

// ── POST /entities/rules — create relationship rule ──────────────────────────
router.post('/rules', verifyToken, checkRole(['admin', 'director']), async (req, res, next) => {
  try {
    const { source_entity_type_id, target_entity_type_id, event, auto_create, auto_approve } = req.body;
    if (!source_entity_type_id || !target_entity_type_id) {
      return next(createError('"source_entity_type_id" and "target_entity_type_id" are required.', 400));
    }
    const rule = await prisma.entityRelationshipRule.create({
      data: {
        source_entity_type_id: Number(source_entity_type_id),
        target_entity_type_id: Number(target_entity_type_id),
        event: event ? String(event).trim() : 'approved',
        auto_create: auto_create !== undefined ? Boolean(auto_create) : true,
        auto_approve: auto_approve !== undefined ? Boolean(auto_approve) : false,
      },
    });
    return res.status(201).json({ success: true, data: rule });
  } catch (err) {
    return next(err);
  }
});

function isAllowedWorkflowTransition({
  currentStatus,
  targetStatus,
  actorRole,
  actorUserId,
  ownerUserId,
  actorAssignedArea,
  entityArea,
}) {
  const current = String(currentStatus || 'draft').trim().toLowerCase();
  const next = String(targetStatus).trim().toLowerCase();

  if (current === 'deleted') return false;
  if (!['draft', 'submitted', 'coordinator_approved', 'approved', 'rejected'].includes(current)) {
    return false;
  }

  if (current === 'approved' || current === 'rejected') return false;

  if (actorRole === 'citizen') {
    if (current === 'draft' && next === 'submitted') {
      return Number(actorUserId) === Number(ownerUserId);
    }
    return false;
  }

  if (actorRole === 'coordinator_area') {
    if (current === 'submitted') {
      if (next === 'coordinator_approved') {
        return String(entityArea || '').trim() === String(actorAssignedArea || '').trim();
      }
      if (next === 'rejected') {
        return String(entityArea || '').trim() === String(actorAssignedArea || '').trim();
      }
    }
    return false;
  }

  if (actorRole === 'coordinator_general') {
    if (current === 'submitted') {
      const normalizedArea = String(entityArea || '').trim();
      if (next === 'coordinator_approved') {
        return normalizedArea === 'Unassigned' || normalizedArea === '';
      }
      if (next === 'rejected') {
        return normalizedArea === 'Unassigned' || normalizedArea === '';
      }
    }
    return false;
  }

  if (actorRole === 'director') {
    if (current === 'coordinator_approved' && (next === 'approved' || next === 'rejected')) {
      return true;
    }
    return false;
  }

  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /entities
// Create a new entity (generic — entity_type_id determines "which type")
// ─────────────────────────────────────────────────────────────────────────────
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { entity_type_id, name, location, latitude, longitude, area, jurisdiction_id, status } = req.body;

    // ── Input validation ─────────────────────────────────────────────────────
    if (entity_type_id === undefined || entity_type_id === null) {
      return next(createError('"entity_type_id" is required.', 400));
    }
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return next(createError('"name" is required and must be a non-empty string.', 400));
    }

    // ── Coordinate validation ─────────────────────────────────────────────────
    const coords = validateCoordinates(latitude, longitude);

    const parsedTypeId = parsePositiveInt(entity_type_id, 'entity_type_id');

    // ── FK existence check — does entity_type_id exist? ──────────────────────
    const entityType = await prisma.entityType.findUnique({
      where: { entity_type_id: parsedTypeId },
    });
    if (!entityType) {
      return next(
        createError(
          `entity_type_id ${parsedTypeId} does not exist. Create the entity type first.`,
          400
        )
      );
    }
    if (entityType.name === 'Civic Campaign') {
      return next(createError('Civic Campaign entities must be created through the moderated Civic Buzz workflow.', 403));
    }

    // ── Jurisdiction validation and canonical area synchronization ───────────
    let parsedJurisdictionId = null;
    let resolvedArea = area !== undefined && area !== null ? String(area).trim() || null : null;

    if (jurisdiction_id !== undefined && jurisdiction_id !== null && jurisdiction_id !== '') {
      parsedJurisdictionId = parsePositiveInt(jurisdiction_id, 'jurisdiction_id');
      const jurisdictionNode = await prisma.jurisdictionMaster.findUnique({
        where: { jurisdiction_id: parsedJurisdictionId },
      });

      if (!jurisdictionNode) {
        return next(createError(`jurisdiction_id ${parsedJurisdictionId} does not exist.`, 400));
      }
      if (jurisdictionNode.status !== 'active') {
        return next(createError(`jurisdiction_id ${parsedJurisdictionId} is inactive.`, 400));
      }

      // Canonical synchronization: area is synchronized from leaf jurisdiction
      resolvedArea = jurisdictionNode.name;
    }

    // ── Create entity; the signed-in caller is the owner ──────────────────────
    const ownerUserId = req.user.user_id;

    // ── Initial status ────────────────────────────────────────────────────────
    // A client-supplied status is never trusted. Every entity starts as "draft".
    // If the client asks for another status, it is honoured only when the
    // module's workflow lets this caller move their own draft there (normally
    // draft → submitted); anything else, such as "approved", is ignored.
    let initialStatus = 'draft';
    const requestedStatus = typeof status === 'string' ? status.trim().toLowerCase() : '';
    if (requestedStatus && requestedStatus !== 'draft') {
      const check = await validateWorkflowTransition({
        entity: {
          entity_type_id: parsedTypeId,
          owner_user_id: ownerUserId,
          area: resolvedArea,
          status: 'draft',
        },
        targetStatus: requestedStatus,
        actorRole: req.user.role,
        actorUserId: ownerUserId,
        actorAssignedArea: req.user.assignedArea || req.user.assigned_area || null,
      });
      if (check.allowed) initialStatus = requestedStatus;
    }

    const entity = await prisma.$transaction(async (tx) => {
    const created = await tx.entity.create({
      data: {
        entity_type_id: parsedTypeId,
        owner_user_id: ownerUserId,
        jurisdiction_id: parsedJurisdictionId,
        name: name.trim(),
        location: location ? String(location).trim() : null,
        latitude: coords.latitude,
        longitude: coords.longitude,
        area: resolvedArea,
        status: initialStatus,
      },
      include: {
        entityType: {
          select: { entity_type_id: true, name: true, location_visibility: true },
        },
        jurisdiction: true,
      },
    });

      // A record that starts beyond "draft" has made a workflow move: record it
      // like any other transition, so audit, history and notifications see it.
      if (initialStatus !== 'draft') {
        await tx.auditLog.create({
          data: {
            entity_id: created.entity_id,
            actor_user_id: ownerUserId,
            action: 'status_transition',
            user: req.user.name,
            old_status: 'draft',
            new_status: initialStatus,
            reason: 'Submitted on creation',
          },
        });
        await tx.approvalHistory.create({
          data: {
            entity_id: created.entity_id,
            actor_user_id: ownerUserId,
            from_status: 'draft',
            to_status: initialStatus,
            reason: 'Submitted on creation',
          },
        });
      }
      return created;
    });

    const visibleEntity = applyLocationVisibility(entity, req.user);
    return res.status(201).json({ success: true, data: visibleEntity });
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /entities
// List entities with optional filtering, keyword search, and pagination.
// Query params:
//   ?entity_type_id=  ?status=  ?area=  ?owner_user_id=  ?name=
//   ?page=  ?limit=  (defaults: page=1, limit=20)
//   ?sort=  (updated_desc | id_asc, default: updated_desc)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', async (req, res, next) => {
  try {
    // ── Pagination ────────────────────────────────────────────────────────────
    const page = req.query.page ? parsePositiveInt(req.query.page, 'page') : 1;
    const limit = Math.min(
      req.query.limit ? parsePositiveInt(req.query.limit, 'limit') : 20,
      MAX_PAGE_SIZE
    );
    const skip = (page - 1) * limit;

    // ── Filters ───────────────────────────────────────────────────────────────
    const where = {};
    const campaignType = await prisma.entityType.findFirst({
      where: { name: 'Civic Campaign' },
      select: { entity_type_id: true },
    });
    if (campaignType) where.NOT = { entity_type_id: campaignType.entity_type_id };

    if (req.query.entity_type_id !== undefined) {
      where.entity_type_id = parsePositiveInt(
        req.query.entity_type_id,
        'entity_type_id'
      );
    }

    if (req.query.status !== undefined && req.query.status !== '') {
      where.status = String(req.query.status).trim();
    }

    if (req.query.area !== undefined && req.query.area !== '') {
      where.area = String(req.query.area).trim();
    }

    // Anonymous visitors see approved records only, whatever status they ask for
    if (!req.user) {
      where.status = { equals: PUBLIC_STATUS, mode: 'insensitive' };
    }

    // Citizens can strictly only view entities initiated by themselves
    if (req.user && req.user.role === 'citizen') {
      where.owner_user_id = Number(req.user.user_id);
    } else if (req.query.owner_user_id !== undefined) {
      where.owner_user_id = parsePositiveInt(req.query.owner_user_id, 'owner_user_id');
    }

    // Keyword search on name (case-insensitive contains)
    if (req.query.name !== undefined && req.query.name !== '') {
      where.name = { contains: String(req.query.name).trim(), mode: 'insensitive' };
    }

    // ── Sort ──────────────────────────────────────────────────────────────────
    const orderBy = req.query.sort === 'id_asc'
      ? { entity_id: 'asc' }
      : { entity_id: 'desc' };

    // ── Query ─────────────────────────────────────────────────────────────────
    const [total, entities] = await Promise.all([
      prisma.entity.count({ where }),
      prisma.entity.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          entityType: {
            select: { entity_type_id: true, name: true, location_visibility: true },
          },
          owner: {
            // Citizens only ever list their own records, so their own email is all they can see here.
            select: req.user && req.user.role === 'citizen'
              ? { user_id: true, name: true, email: true }
              : ownerSelectFor(req.user),
          },
          jurisdiction: true,
        },
      }),
    ]);

    const visibleEntities = applyLocationVisibilityMany(entities, req.user);

    return res.status(200).json({
      success: true,
      data: visibleEntities,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /entities/nearby
// Find approved public entities within a given radius using exact Haversine.
// Declared BEFORE /:id route so 'nearby' is not parsed as an integer id.
// Query params: ?lat= &lng= &radius_km= (default 10, max 50)
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// GET /entities/notifications
// The signed-in user's notification feed, derived from the audit trail and
// the workflow metadata (services/notificationFeed.js). Nothing is stored.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/notifications', verifyToken, async (req, res, next) => {
  try {
    const items = await getNotificationFeed(req.user, { limit: req.query.limit });
    return res.status(200).json({ success: true, data: items });
  } catch (err) {
    return next(err);
  }
});

router.get('/nearby', async (req, res, next) => {
  try {
    const { lat, lng, radius_km } = req.query;

    if (lat === undefined || lat === null || lat === '' || lng === undefined || lng === null || lng === '') {
      return next(createError('"lat" and "lng" query parameters are required.', 400));
    }

    const centerLat = Number(lat);
    const centerLng = Number(lng);

    if (isNaN(centerLat) || centerLat < -90 || centerLat > 90) {
      return next(createError('"lat" must be a valid number between -90 and 90.', 400));
    }
    if (isNaN(centerLng) || centerLng < -180 || centerLng > 180) {
      return next(createError('"lng" must be a valid number between -180 and 180.', 400));
    }

    let radius = 10;
    if (radius_km !== undefined && radius_km !== '') {
      const parsedRadius = Number(radius_km);
      if (isNaN(parsedRadius) || parsedRadius <= 0) {
        return next(createError('"radius_km" must be a positive number.', 400));
      }
      radius = Math.min(parsedRadius, 50);
    }

    // Bounding-box pre-filtering in Prisma
    const latDelta = radius / 111.0;
    const lngDelta = radius / (111.0 * Math.max(0.01, Math.cos((centerLat * Math.PI) / 180)));

    const minLat = centerLat - latDelta;
    const maxLat = centerLat + latDelta;
    const minLng = centerLng - lngDelta;
    const maxLng = centerLng + lngDelta;

    const candidates = await prisma.entity.findMany({
      where: {
        entityType: {
          location_visibility: 'public_when_approved',
        },
        status: { equals: 'approved', mode: 'insensitive' },
        latitude: {
          not: null,
          gte: minLat,
          lte: maxLat,
        },
        longitude: {
          not: null,
          gte: minLng,
          lte: maxLng,
        },
      },
      include: {
        entityType: { select: { entity_type_id: true, name: true, location_visibility: true } },
      },
    });

    const results = [];
    for (const ent of candidates) {
      const dist = haversineDistanceKm(centerLat, centerLng, ent.latitude, ent.longitude);
      if (dist <= radius) {
        results.push({
          entity_id: ent.entity_id,
          name: ent.name,
          latitude: ent.latitude,
          longitude: ent.longitude,
          distance_km: Number(dist.toFixed(1)),
          maps_url: `https://www.google.com/maps/dir/?api=1&destination=${ent.latitude},${ent.longitude}`,
        });
      }
    }

    results.sort((a, b) => a.distance_km - b.distance_km);
    const limited = results.slice(0, 50);

    return res.status(200).json({
      success: true,
      data: limited,
      count: limited.length,
    });
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /entities/:id
// Fetch a single entity by entity_id, including entity_type and jurisdiction info.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const entityId = parsePositiveInt(req.params.id, 'id');

    const entity = await prisma.entity.findUnique({
      where: { entity_id: entityId },
      include: {
        entityType: true,
        owner: {
          select: { user_id: true, name: true, email: true },
        },
        jurisdiction: {
          include: {
            parent: {
              include: {
                parent: {
                  include: {
                    parent: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!entity) {
      return next(
        createError(`Entity with id ${entityId} was not found.`, 404)
      );
    }
    if (entity.entityType?.name === 'Civic Campaign') {
      return next(createError('Civic Campaign content is available only through the Civic Buzz endpoints.', 404));
    }
    // Anonymous visitors can read approved records only. Anything else answers
    // exactly like a record that does not exist.
    // The same goes for a signed-in citizen looking at someone else's record:
    // only staff and the owner can read a record that is not approved.
    if (viewerLevel(entity, req.user) === 'none') {
      return next(createError(`Entity with id ${entityId} was not found.`, 404));
    }

    // The owner's email goes only to staff and to the owner themselves.
    if (entity.owner) {
      const isOwner = req.user && Number(req.user.user_id) === Number(entity.owner_user_id);
      const isStaff = req.user && STAFF_ROLES.includes(req.user.role);
      if (!isOwner && !isStaff) delete entity.owner.email;
    }

    const visibleEntity = applyLocationVisibility(entity, req.user);
    return res.status(200).json({ success: true, data: visibleEntity });
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// PUT /entities/:id
// Partial update — only fields present in body are updated.
// ─────────────────────────────────────────────────────────────────────────────
router.put('/:id', verifyToken, async (req, res, next) => {
  try {
    const entityId = parsePositiveInt(req.params.id, 'id');
    const { entity_type_id, name, location, area, jurisdiction_id, status } = req.body;

    // ── At least one field required ───────────────────────────────────────────
    if (
      entity_type_id === undefined &&
      name === undefined &&
      location === undefined &&
      area === undefined &&
      jurisdiction_id === undefined &&
      status === undefined
    ) {
      return next(
        createError(
          'Request body must include at least one field to update: entity_type_id, name, location, area, or jurisdiction_id.',
          400
        )
      );
    }

    if (status !== undefined) {
      return next(
        createError('Status updates must go through POST /entities/:id/transition.', 400)
      );
    }

    // ── Check entity exists ───────────────────────────────────────────────────
    const existing = await prisma.entity.findUnique({
      where: { entity_id: entityId },
    });
    if (!existing) {
      return next(
        createError(`Entity with id ${entityId} was not found.`, 404)
      );
    }
    const existingType = await prisma.entityType.findUnique({
      where: { entity_type_id: existing.entity_type_id },
      select: { name: true },
    });
    if (existingType?.name === 'Civic Campaign') {
      return next(createError('Civic Campaign drafts must be edited through the Civic Buzz workflow.', 403));
    }

    // ── Ownership protection: owner or privileged staff required ──────────────
    checkEntityOwnership(existing, req.user);

    // ── Build update payload (only provided fields) ───────────────────────────
    const updateData = {};

    if (req.body.latitude !== undefined || req.body.longitude !== undefined) {
      const coords = validateCoordinates(req.body.latitude, req.body.longitude);
      updateData.latitude = coords.latitude;
      updateData.longitude = coords.longitude;
    }

    if (entity_type_id !== undefined) {
      const parsedTypeId = parsePositiveInt(entity_type_id, 'entity_type_id');
      // FK check
      const entityType = await prisma.entityType.findUnique({
        where: { entity_type_id: parsedTypeId },
      });
      if (!entityType) {
        return next(
          createError(
            `entity_type_id ${parsedTypeId} does not exist.`,
            400
          )
        );
      }
      updateData.entity_type_id = parsedTypeId;
    }

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim() === '') {
        return next(createError('"name" must be a non-empty string.', 400));
      }
      updateData.name = name.trim();
    }

    if (location !== undefined) {
      updateData.location = location === null ? null : String(location).trim();
    }

    if (area !== undefined) {
      updateData.area = area === null ? null : String(area).trim();
    }

    if (jurisdiction_id !== undefined) {
      if (jurisdiction_id === null || jurisdiction_id === '') {
        updateData.jurisdiction_id = null;
      } else {
        const parsedJId = parsePositiveInt(jurisdiction_id, 'jurisdiction_id');
        const jNode = await prisma.jurisdictionMaster.findUnique({
          where: { jurisdiction_id: parsedJId },
        });
        if (!jNode) {
          return next(createError(`jurisdiction_id ${parsedJId} does not exist.`, 400));
        }
        if (jNode.status !== 'active') {
          return next(createError(`jurisdiction_id ${parsedJId} is inactive.`, 400));
        }
        updateData.jurisdiction_id = parsedJId;
        // Synchronize area from leaf jurisdiction
        updateData.area = jNode.name;
      }
    }

    // ── Perform update ────────────────────────────────────────────────────────
    const updated = await prisma.entity.update({
      where: { entity_id: entityId },
      data: updateData,
      include: {
        entityType: {
          select: { entity_type_id: true, name: true, location_visibility: true },
        },
        jurisdiction: true,
      },
    });

    // ── Fire rule engine (non-blocking) if status was changed ────────────────
    // Entity update succeeds regardless of rule engine outcome.
    if (status !== undefined && typeof status === 'string' && status.trim() !== '') {
      const eventType = status.trim().toLowerCase();
      checkAndFireRules(entityId, eventType)
        .then((ruleResult) => {
          if (ruleResult.rulesFired > 0) {
            console.log(
              `[RULE ENGINE] ${ruleResult.rulesFired} rule(s) fired for entity #${entityId}, event "${eventType}". ` +
              `Created: ${ruleResult.createdEntities.map((e) => `#${e.entity_id}`).join(', ')}`
            );
          }
        })
        .catch((ruleErr) => {
          // Log the error server-side but never fail the update response
          console.error(
            `[RULE ENGINE ERROR] Failed to process rules for entity #${entityId}, event "${eventType}":`,
            ruleErr
          );
        });
    }

    const visibleUpdated = applyLocationVisibility(updated, req.user);
    return res.status(200).json({ success: true, data: visibleUpdated });
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /entities/:id  — SOFT DELETE
// Sets entity.status = 'deleted'. No rows are physically removed.
// Children (parameter_value, file_repository, audit_log) are untouched.
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    const entityId = parsePositiveInt(req.params.id, 'id');

    // ── Check entity exists ───────────────────────────────────────────────────
    const existing = await prisma.entity.findUnique({
      where: { entity_id: entityId },
    });
    if (!existing) {
      return next(
        createError(`Entity with id ${entityId} was not found.`, 404)
      );
    }
    const type = await prisma.entityType.findUnique({
      where: { entity_type_id: existing.entity_type_id },
      select: { name: true },
    });
    if (type?.name === 'Civic Campaign') {
      return next(createError('Civic Campaign posts must be unpublished through the Civic Buzz workflow.', 403));
    }

    // ── Ownership protection: owner or privileged staff required ──────────────
    checkEntityOwnership(existing, req.user);

    // ── Guard: already soft-deleted ───────────────────────────────────────────
    if (existing.status === 'deleted') {
      return res.status(200).json({
        success: true,
        message: `Entity ${entityId} is already marked as deleted.`,
      });
    }

    // ── Soft delete ───────────────────────────────────────────────────────────
    const softDeleted = await prisma.entity.update({
      where: { entity_id: entityId },
      data: { status: 'deleted' },
    });

    return res.status(200).json({
      success: true,
      message: `Entity ${entityId} has been soft-deleted (status set to 'deleted'). Related records are preserved.`,
      data: { entity_id: softDeleted.entity_id, status: softDeleted.status },
    });
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /entities/:id/transition
// Protected workflow step: the actor is taken from the JWT and the audit log is
// written in the same request.
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// GET /entities/:id/workflow
// Returns applicable WorkflowMaster rules and allowed transitions for current user.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id/workflow', verifyToken, async (req, res, next) => {
  try {
    const entityId = parsePositiveInt(req.params.id, 'id');
    const entity = await prisma.entity.findUnique({
      where: { entity_id: entityId },
      include: { entityType: true },
    });

    if (!entity) {
      return next(createError(`Entity with id ${entityId} was not found.`, 404));
    }
    if (viewerLevel(entity, req.user) === 'none') {
      return next(createError(`Entity with id ${entityId} was not found.`, 404));
    }

    const rules = await getWorkflowMasterRules(entity.entity_type_id);
    let actorAssignedArea = req.user.assignedArea || req.user.assigned_area || null;
    let actorRole = req.user.role;

    if (req.user && req.user.user_id) {
      const dbUser = await prisma.user.findUnique({
        where: { user_id: Number(req.user.user_id) },
        select: { role: true, assignedArea: true },
      });
      if (dbUser) {
        actorRole = dbUser.role;
        actorAssignedArea = dbUser.assignedArea || null;
        req.user.role = dbUser.role;
        req.user.assignedArea = dbUser.assignedArea;
        req.user.assigned_area = dbUser.assignedArea;
      }
    }

    const allowed = [];
    const seenActions = new Set();
    const currentStatus = String(entity.status || 'draft').trim().toLowerCase();

    for (const rule of rules) {
      const ruleTrigger = String(rule.trigger || '').trim().toLowerCase();
      const ruleAction = String(rule.action || '').trim().toLowerCase();
      const ruleStage = String(rule.stage || '').trim().toLowerCase();

      // Only evaluate rules whose trigger matches the entity's current state
      if (ruleTrigger !== currentStatus) continue;

      // Only evaluate rules permitted for the actor's current role
      const stageRoles = ruleStage.split(',').map(s => s.trim());
      if (!stageRoles.includes(actorRole.toLowerCase())) continue;

      // Deduplicate multiple identical target actions
      if (seenActions.has(ruleAction)) continue;

      const v = await validateWorkflowTransition({
        entity,
        targetStatus: rule.action,
        actorRole,
        actorUserId: req.user.user_id,
        actorAssignedArea,
      });

      if (v.allowed) {
        seenActions.add(ruleAction);
        allowed.push({
          from: rule.trigger,
          to: rule.action,
          action: rule.action,
          to_status: rule.action,
          role: rule.stage,
        });
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        currentStatus: entity.status || 'draft',
        entityTypeId: entity.entity_type_id,
        isMetadataDriven: rules.length > 0,
        configuredRulesCount: rules.length,
        allowedTransitions: allowed,
      },
    });
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /entities/:id/transition
// Protected metadata-driven workflow step: executes state transition.
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/transition', verifyToken, checkRole(['citizen', 'coordinator_area', 'coordinator_general', 'director', 'admin']), async (req, res, next) => {
  try {
    const entityId = parsePositiveInt(req.params.id, 'id');
    const { to_status, reason } = req.body;

    if (!to_status || typeof to_status !== 'string' || to_status.trim() === '') {
      return next(createError('"to_status" is required and must be a non-empty string.', 400));
    }

    const normalizedToStatus = to_status.trim().toLowerCase();
    if (normalizedToStatus === 'rejected' && (!reason || typeof reason !== 'string' || reason.trim() === '')) {
      return next(createError('A reason is required when rejecting an entity.', 400));
    }

    const target = await prisma.entity.findUnique({
      where: { entity_id: entityId },
      include: { entityType: { select: { name: true } } },
    });
    if (target?.entityType?.name === 'Civic Campaign') {
      return next(createError('Civic Campaign status changes must use the moderated Civic Buzz workflow.', 403));
    }

    const result = await executeWorkflowTransition({
      entityId,
      toStatus: normalizedToStatus,
      reason,
      user: req.user,
    });

    // Apply location visibility to the updated entity before returning
    const visibleTransitioned = applyLocationVisibility(result.updatedEntity, req.user);

    // Also sanitize any auto-created child entities from the rule engine
    const visibleRuleCreated = result.ruleResult && Array.isArray(result.ruleResult.createdEntities)
      ? applyLocationVisibilityMany(result.ruleResult.createdEntities, req.user)
      : result.ruleResult?.createdEntities;

    const sanitizedRuleResult = result.ruleResult
      ? { ...result.ruleResult, createdEntities: visibleRuleCreated }
      : result.ruleResult;

    return res.status(200).json({
      success: true,
      data: visibleTransitioned,
      ruleResult: sanitizedRuleResult,
      workflowSource: result.workflowSource,
      message: `Entity ${entityId} transitioned from "${result.previousStatus}" to "${result.newStatus}".`,
    });
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /entities/:id/fire-rules
// Direct / standalone trigger for the rule engine — useful for testing.
// Body: { "eventType": "approved" }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/fire-rules', verifyToken, checkRole(['admin', 'director']), async (req, res, next) => {
  try {
    const entityId = parsePositiveInt(req.params.id, 'id');
    const entity = await prisma.entity.findUnique({
      where: { entity_id: entityId },
      include: { entityType: { select: { name: true } } },
    });
    if (entity?.entityType?.name === 'Civic Campaign') {
      return next(createError('Civic Buzz workflow rules cannot be triggered through the generic entity endpoint.', 403));
    }
    const { eventType } = req.body;

    if (!eventType || typeof eventType !== 'string' || eventType.trim() === '') {
      return next(
        createError('"eventType" is required and must be a non-empty string.', 400)
      );
    }

    const ruleResult = await checkAndFireRules(entityId, eventType.trim().toLowerCase());

    return res.status(200).json({ success: true, data: ruleResult });
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /entities/:id/audit
// Fetch audit log for a single entity.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id/audit', verifyToken, async (req, res, next) => {
  try {
    const entityId = parsePositiveInt(req.params.id, 'id');

    const entity = await prisma.entity.findUnique({
      where: { entity_id: entityId },
      include: { entityType: { select: { name: true } } },
    });
    if (!entity) {
      return next(createError(`Entity with id ${entityId} was not found.`, 404));
    }
    if (entity.entityType?.name === 'Civic Campaign') {
      return next(createError('Civic Buzz moderation history is not available through generic entity endpoints.', 404));
    }
    assertOwnerOrStaff(entity, req.user);

    const [auditLogs, approvalHistory] = await Promise.all([
      prisma.auditLog.findMany({
        where: { entity_id: entityId },
        orderBy: { datetime: 'desc' },
        include: {
          actorUser: { select: { user_id: true, name: true, email: true, role: true } },
        },
      }),
      prisma.approvalHistory.findMany({
        where: { entity_id: entityId },
        orderBy: { created_date: 'desc' },
        include: {
          actorUser: { select: { user_id: true, name: true, email: true, role: true } },
        },
      }),
    ]);

    return res.status(200).json({ success: true, data: { auditLogs, approvalHistory } });
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /entities/:id/lineage
// Fetch complete ecosystem lineage graph for an entity.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id/lineage', verifyToken, async (req, res, next) => {
  try {
    const entityId = parsePositiveInt(req.params.id, 'id');

    const entity = await prisma.entity.findUnique({
      where: { entity_id: entityId },
      include: { entityType: true, owner: { select: { user_id: true, name: true, role: true } } },
    });

    if (!entity) {
      return next(createError(`Entity with id ${entityId} was not found.`, 404));
    }
    assertOwnerOrStaff(entity, req.user);

    // 1. Configured Rules for this entity's entityType
    const activeRules = await prisma.entityRelationshipRule.findMany({
      where: { source_entity_type_id: entity.entity_type_id },
      include: { targetEntityType: { select: { entity_type_id: true, name: true } } },
    });

    // 2. Child entities created BY this entity via the Rule Engine.
    // The link is the source columns the engine writes (Entity.source_entity_id,
    // Entity.source_rule_id), not text matching.
    const linkedChildren = await prisma.entity.findMany({
      where: { source_entity_id: entityId },
      include: {
        entityType: { select: { entity_type_id: true, name: true } },
        auditLogs: { where: { action: 'auto_created' }, orderBy: { datetime: 'asc' }, take: 1 },
      },
      orderBy: { entity_id: 'asc' },
    });

    const children = linkedChildren.map((child) => ({
      entity_id: child.entity_id,
      name: child.name,
      entity_type_id: child.entity_type_id,
      type_name: child.entityType?.name || 'Unknown',
      status: child.status,
      created_at: child.auditLogs[0]?.datetime || null,
      reason: child.auditLogs[0]?.reason || `Created by rule ${child.source_rule_id ?? 'unknown'}`,
      source_rule_id: child.source_rule_id,
    }));

    // Records auto-created before the source columns existed carry the link only
    // in their audit text. Match it exactly: "source entity #5 (" cannot match #50.
    const legacyLogs = await prisma.auditLog.findMany({
      where: {
        action: 'auto_created',
        reason: { contains: `source entity #${entityId} (` },
        entity: { source_entity_id: null },
      },
      include: {
        entity: { include: { entityType: { select: { entity_type_id: true, name: true } } } },
      },
      orderBy: { datetime: 'asc' },
    });
    for (const log of legacyLogs) {
      if (log.entity_id === entityId || children.some((c) => c.entity_id === log.entity_id)) continue;
      children.push({
        entity_id: log.entity.entity_id,
        name: log.entity.name,
        entity_type_id: log.entity.entity_type_id,
        type_name: log.entity.entityType?.name || 'Unknown',
        status: log.entity.status,
        created_at: log.datetime,
        reason: log.reason,
        source_rule_id: null,
      });
    }

    // 3. Parent entity, if this entity was auto-created from a source entity
    let parentEntity = null;
    if (entity.source_entity_id) {
      parentEntity = await prisma.entity.findUnique({
        where: { entity_id: entity.source_entity_id },
        include: { entityType: { select: { entity_type_id: true, name: true } } },
      });
    } else {
      const selfAuditLog = await prisma.auditLog.findFirst({
        where: { entity_id: entityId, action: 'auto_created' },
      });
      const match = selfAuditLog?.reason?.match(/source entity #(\d+) \(/);
      if (match) {
        parentEntity = await prisma.entity.findUnique({
          where: { entity_id: Number(match[1]) },
          include: { entityType: { select: { entity_type_id: true, name: true } } },
        });
      }
    }

    // Apply location visibility to current and parent entities
    const visibleCurrent = applyLocationVisibility(entity, req.user);
    const visibleParent = parentEntity ? applyLocationVisibility(parentEntity, req.user) : null;

    return res.status(200).json({
      success: true,
      data: {
        current: visibleCurrent,
        parent: visibleParent,
        children,
        rules: activeRules,
      },
    });
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /entities/:id/ai-analysis
// Generate Gemini AI Decision Intelligence Report for Director/Admin review.
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/ai-analysis', verifyToken, checkRole(['coordinator_area', 'coordinator_general', 'director', 'admin']), async (req, res, next) => {
  try {
    const entityId = parsePositiveInt(req.params.id, 'id');
    const { report, logId } = await generateIntelligenceReport(entityId, req.user.user_id);
    return res.status(200).json({
      success: true,
      data: report,
      log_id: logId,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
