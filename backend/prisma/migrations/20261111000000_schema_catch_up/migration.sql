-- Catch-up migration.
-- The Prisma schema had moved ahead of the migrations (changes were applied to the
-- shared database with `prisma db push`), so `prisma migrate deploy` on an empty
-- database did not produce the schema the code expects.
-- Every statement is written to be a no-op where the change already exists, so
-- this is safe on a database that was brought up to date with `db push`.

-- JurisdictionMaster
CREATE TABLE IF NOT EXISTS "JurisdictionMaster" (
    "jurisdiction_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "parent_id" INTEGER,
    "code" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "JurisdictionMaster_pkey" PRIMARY KEY ("jurisdiction_id")
);
CREATE INDEX IF NOT EXISTS "JurisdictionMaster_parent_id_idx" ON "JurisdictionMaster"("parent_id");
CREATE INDEX IF NOT EXISTS "JurisdictionMaster_type_idx" ON "JurisdictionMaster"("type");
CREATE INDEX IF NOT EXISTS "JurisdictionMaster_status_idx" ON "JurisdictionMaster"("status");
CREATE UNIQUE INDEX IF NOT EXISTS "JurisdictionMaster_parent_id_name_key" ON "JurisdictionMaster"("parent_id", "name");

-- New columns
ALTER TABLE "AIExecutionLog" ADD COLUMN IF NOT EXISTS "analysis_type" TEXT;
ALTER TABLE "AIExecutionLog" ALTER COLUMN "entity_id" DROP NOT NULL;
ALTER TABLE "Entity" ADD COLUMN IF NOT EXISTS "jurisdiction_id" INTEGER;
ALTER TABLE "Entity" ADD COLUMN IF NOT EXISTS "latitude" DOUBLE PRECISION;
ALTER TABLE "Entity" ADD COLUMN IF NOT EXISTS "longitude" DOUBLE PRECISION;
ALTER TABLE "EntityType" ADD COLUMN IF NOT EXISTS "location_visibility" TEXT NOT NULL DEFAULT 'hidden';
ALTER TABLE "buzz_posts" ALTER COLUMN "updated_at" DROP DEFAULT;

CREATE INDEX IF NOT EXISTS "AIExecutionLog_analysis_type_created_date_idx" ON "AIExecutionLog"("analysis_type", "created_date");
CREATE INDEX IF NOT EXISTS "Entity_latitude_longitude_idx" ON "Entity"("latitude", "longitude");
CREATE INDEX IF NOT EXISTS "Entity_jurisdiction_id_idx" ON "Entity"("jurisdiction_id");

-- Foreign keys (dropped first so the definition is the same everywhere)
ALTER TABLE "Entity" DROP CONSTRAINT IF EXISTS "Entity_jurisdiction_id_fkey";
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_jurisdiction_id_fkey" FOREIGN KEY ("jurisdiction_id") REFERENCES "JurisdictionMaster"("jurisdiction_id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "JurisdictionMaster" DROP CONSTRAINT IF EXISTS "JurisdictionMaster_parent_id_fkey";
ALTER TABLE "JurisdictionMaster" ADD CONSTRAINT "JurisdictionMaster_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "JurisdictionMaster"("jurisdiction_id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "AIExecutionLog" DROP CONSTRAINT IF EXISTS "AIExecutionLog_entity_id_fkey";
ALTER TABLE "AIExecutionLog" ADD CONSTRAINT "AIExecutionLog_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "Entity"("entity_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Index names: rename only where the old name exists and the new one does not.
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT * FROM (VALUES
      ('buzz_comments_post_id_idx',     'buzz_comments_post_id_created_at_idx'),
      ('buzz_events_created_idx',       'buzz_events_created_at_idx'),
      ('buzz_events_post_type_idx',     'buzz_events_post_id_type_idx'),
      ('buzz_follows_post_user_key',    'buzz_follows_post_id_user_id_key'),
      ('buzz_posts_linked_idx',         'buzz_posts_linked_type_linked_id_idx'),
      ('buzz_posts_status_created_idx', 'buzz_posts_status_created_at_idx'),
      ('buzz_reports_post_user_key',    'buzz_reports_post_id_user_id_key'),
      ('buzz_votes_post_user_key',      'buzz_votes_post_id_user_id_key')
    ) AS t(old_name, new_name)
  LOOP
    IF to_regclass(format('%I', r.old_name)) IS NOT NULL
       AND to_regclass(format('%I', r.new_name)) IS NULL THEN
      EXECUTE format('ALTER INDEX %I RENAME TO %I', r.old_name, r.new_name);
    END IF;
  END LOOP;
END $$;
