/**
 * CIVIC-KALKI — File Upload Engine
 * Handles file uploads for entity parameters with field_type 'file'.
 * Files are stored locally in the /uploads directory and tracked via FileRepository.
 *
 * Routes:
 *   POST   /files/upload          — Upload one or more files for an entity+parameter
 *   GET    /files/entity/:id      — List all files for an entity
 *   GET    /files/:fileId         — Download a specific file
 *   DELETE /files/:fileId         — Remove a file record and its physical file
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const prisma = require('../db');
const { verifyToken } = require('../middleware/auth');
const { assertCanWriteEntity, writeAudit, assertCanReadEntityData, assertOwnerOrStaff } = require('../services/entityAccess');

// ── Ensure uploads directory exists ──────────────────────────────────────────
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// ── Multer configuration ─────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    const ext = path.extname(file.originalname);
    const safeName = file.originalname
      .replace(ext, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 60);
    cb(null, `${safeName}-${uniqueSuffix}${ext}`);
  },
});

const ALLOWED_MIME_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'application/pdf',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain', 'text/csv',
  'application/zip', 'application/x-zip-compressed',
];

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type "${file.mimetype}" is not allowed. Accepted: images, PDF, Word, Excel, CSV, text, ZIP.`));
    }
  },
});

// ── Helper ───────────────────────────────────────────────────────────────────
function createError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

function parsePositiveInt(value, fieldName) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw createError(`"${fieldName}" must be a positive integer. Received: ${value}`, 400);
  }
  return parsed;
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /files/upload
// Upload files for an entity parameter.
// Form fields: entity_id, parameter_id  |  File field: files (multipart)
// ─────────────────────────────────────────────────────────────────────────────
// Remove files multer already wrote when the request is then refused.
function discardUploadedFiles(files) {
  for (const file of files || []) {
    if (file && file.path) fs.unlink(file.path, () => {});
  }
}

router.post('/upload', verifyToken, upload.array('files', 5), async (req, res, next) => {
  try {
    const { entity_id, parameter_id } = req.body;

    if (!entity_id) return next(createError('"entity_id" is required.', 400));
    if (!parameter_id) return next(createError('"parameter_id" is required.', 400));

    const parsedEntityId = parsePositiveInt(entity_id, 'entity_id');
    const parsedParamId = parsePositiveInt(parameter_id, 'parameter_id');

    // Verify entity exists
    const entity = await prisma.entity.findUnique({
      where: { entity_id: parsedEntityId },
      include: { entityType: { select: { name: true } } },
    });
    if (!entity) return next(createError(`Entity ${parsedEntityId} not found.`, 404));
    if (entity.entityType?.name === 'Civic Campaign') {
      return next(createError('Campaign photos must use the scoped Civic Buzz upload endpoint.', 403));
    }
    await assertCanWriteEntity(entity, req.user);

    // Verify parameter exists and is a file type
    const param = await prisma.parameterMaster.findUnique({ where: { parameter_id: parsedParamId } });
    if (!param) return next(createError(`Parameter ${parsedParamId} not found.`, 404));

    if (!req.files || req.files.length === 0) {
      return next(createError('No files were uploaded.', 400));
    }

    // File records, the ParameterValue holding the filename(s) and the audit row
    // are written in one transaction.
    const fileNames = req.files.map(f => f.originalname).join(', ');
    const fileRecords = await prisma.$transaction(async (tx) => {
      const records = [];
      for (const file of req.files) {
        const record = await tx.fileRepository.create({
          data: {
            entity_id: parsedEntityId,
            parameter_id: parsedParamId,
            file_name: file.originalname,
            path: file.filename, // stored filename on disk
          },
        });
        records.push({
          ...record,
          size: file.size,
          mimetype: file.mimetype,
        });
      }

      const existingPv = await tx.parameterValue.findFirst({
        where: { entity_id: parsedEntityId, parameter_id: parsedParamId },
      });
      if (existingPv) {
        await tx.parameterValue.update({
          where: { value_id: existingPv.value_id },
          data: { value: fileNames },
        });
      } else {
        await tx.parameterValue.create({
          data: { entity_id: parsedEntityId, parameter_id: parsedParamId, value: fileNames },
        });
      }

      await writeAudit(tx, {
        entityId: parsedEntityId,
        user: req.user,
        action: 'file_attached',
        changes: {
          [param.field_key || `parameter_${parsedParamId}`]: {
            parameter_id: parsedParamId,
            old: existingPv ? existingPv.value : null,
            new: fileNames,
          },
          files: { old: null, new: records.map((r) => ({ file_id: r.file_id, file_name: r.file_name })) },
        },
      });
      return records;
    });

    return res.status(201).json({ success: true, data: fileRecords });
  } catch (err) {
    discardUploadedFiles(req.files);
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /files/entity/:id
// List all files for an entity
// ─────────────────────────────────────────────────────────────────────────────
router.get('/entity/:id', async (req, res, next) => {
  try {
    const entityId = parsePositiveInt(req.params.id, 'id');
    const entity = await prisma.entity.findUnique({
      where: { entity_id: entityId },
      include: { entityType: { select: { name: true } } },
    });
    if (!entity) return next(createError(`Entity ${entityId} not found.`, 404));
    if (entity.entityType?.name === 'Civic Campaign') {
      return next(createError('Campaign photos are served only through the scoped Civic Buzz endpoint.', 404));
    }
    // Attachments are for the owner and staff only. A public viewer of an
    // approved record gets an empty list, never the files.
    const viewer = assertCanReadEntityData(entity, req.user);
    if (viewer === 'public') return res.status(200).json({ success: true, data: [] });
    const files = await prisma.fileRepository.findMany({
      where: { entity_id: entityId },
      include: {
        parameterMaster: { select: { parameter_id: true, label: true, field_key: true } },
      },
      orderBy: { file_id: 'desc' },
    });
    return res.status(200).json({ success: true, data: files });
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /files/:fileId
// Download / serve a specific file
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:fileId', async (req, res, next) => {
  try {
    const fileId = parsePositiveInt(req.params.fileId, 'fileId');
    const record = await prisma.fileRepository.findUnique({
      where: { file_id: fileId },
      include: { entity: { include: { entityType: { select: { name: true } } } } },
    });
    if (!record) return next(createError(`File ${fileId} not found.`, 404));
    if (record.entity.entityType?.name === 'Civic Campaign') {
      return next(createError('Campaign photos are served only through the scoped Civic Buzz endpoint.', 404));
    }
    // Downloading is for the owner and staff only, whatever the record's status.
    assertOwnerOrStaff(record.entity, req.user);

    const filePath = path.join(UPLOAD_DIR, record.path);
    if (!fs.existsSync(filePath)) {
      return next(createError('File not found on disk.', 404));
    }

    res.download(filePath, record.file_name);
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /files/:fileId
// Remove file record and physical file
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/:fileId', verifyToken, async (req, res, next) => {
  try {
    const fileId = parsePositiveInt(req.params.fileId, 'fileId');
    const record = await prisma.fileRepository.findUnique({
      where: { file_id: fileId },
      include: { entity: { include: { entityType: { select: { name: true } } } } },
    });
    if (!record) return next(createError(`File ${fileId} not found.`, 404));
    if (record.entity.entityType?.name === 'Civic Campaign') {
      return next(createError('Campaign photos are managed only through the Civic Buzz workflow.', 404));
    }
    await assertCanWriteEntity(record.entity, req.user);

    // Remove the record and audit it together; the physical file goes only after commit
    await prisma.$transaction(async (tx) => {
      await tx.fileRepository.delete({ where: { file_id: fileId } });
      await writeAudit(tx, {
        entityId: record.entity_id,
        user: req.user,
        action: 'file_removed',
        changes: {
          files: { old: { file_id: record.file_id, file_name: record.file_name, parameter_id: record.parameter_id }, new: null },
        },
      });
    });

    // Delete physical file (best effort)
    const filePath = path.join(UPLOAD_DIR, record.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return res.status(200).json({ success: true, message: `File ${fileId} deleted.` });
  } catch (err) {
    return next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /uploads/:name  (mounted in index.js in place of a public static folder)
// A file in the uploads folder is served by name only when the caller may see it:
//   - Civic Buzz card images (buzz-card-*) are public artwork for public posts;
//   - a record's attachment goes to the record's owner and to staff only;
//   - anything else (for example a file never attached to a record) is not served.
// ─────────────────────────────────────────────────────────────────────────────
async function serveUpload(req, res, next) {
  try {
    const name = path.basename(String(req.params.name || ''));
    const filePath = path.join(UPLOAD_DIR, name);
    if (!name || !fs.existsSync(filePath)) return next(createError('File not found.', 404));

    if (!/^buzz-card-[\w.-]+$/.test(name)) {
      const record = await prisma.fileRepository.findFirst({
        where: { path: name },
        include: { entity: true },
      });
      if (!record) {
        if (!req.user) return next(createError('Sign in to view this file.', 401));
        return next(createError('File not found.', 404));
      }
      assertOwnerOrStaff(record.entity, req.user);
    }
    return res.sendFile(filePath);
  } catch (err) {
    return next(err);
  }
}

module.exports = router;
module.exports.serveUpload = serveUpload;
