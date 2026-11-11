-- B2: link an auto-created entity to the entity and rule that created it.
-- Nullable columns, unique together; no new table.
-- AlterTable
ALTER TABLE "Entity" ADD COLUMN     "source_entity_id" INTEGER,
ADD COLUMN     "source_rule_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Entity_source_entity_id_source_rule_id_key" ON "Entity"("source_entity_id", "source_rule_id");

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_source_entity_id_fkey" FOREIGN KEY ("source_entity_id") REFERENCES "Entity"("entity_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_source_rule_id_fkey" FOREIGN KEY ("source_rule_id") REFERENCES "EntityRelationshipRule"("rule_id") ON DELETE SET NULL ON UPDATE CASCADE;

