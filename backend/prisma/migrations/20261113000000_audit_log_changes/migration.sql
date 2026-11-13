-- Field-level old/new values for audited data writes (edit, values, files).
ALTER TABLE "AuditLog" ADD COLUMN "changes" JSONB;
