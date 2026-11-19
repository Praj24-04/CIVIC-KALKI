/**
 * CIVIC-KALKI — bring an existing database's civic assistant settings up to date,
 * without deleting anything.
 *
 *   npm run assistant:upgrade            (from the project root or backend/)
 *
 * Unlike re-running the seed (which rebuilds forms and deletes the answers on
 * existing records), this only adds and fills in:
 *   - module descriptions, as written in seed.js (how a service is recognised);
 *   - each field's chat settings (options.chat), only where the field has none,
 *     so settings an admin edited on the Modules page are kept;
 *   - fields that are new in seed.js (for example "Who Is Affected"), added to
 *     their subsection; existing fields and all records are left as they are;
 *   - a module's assistant_config row, only if it has none.
 * Running it twice changes nothing the second time.
 */

const prisma = require('../db');
const { MODULE_DEFINITIONS, ASSISTANT_CONFIG } = require('../seed');

async function upgrade({ log = console.log } = {}) {
  const report = { descriptions: 0, chatSettings: 0, fieldsAdded: 0, configRows: 0 };
  const category = await prisma.parameterCategory.findFirst({ where: { category_name: 'General' } })
    || await prisma.parameterCategory.findFirst();

  for (const def of MODULE_DEFINITIONS) {
    const type = await prisma.entityType.findFirst({ where: { name: def.entityTypeName } });
    if (!type) continue;

    if (def.entityTypeDescription && type.description !== def.entityTypeDescription) {
      await prisma.entityType.update({ where: { entity_type_id: type.entity_type_id }, data: { description: def.entityTypeDescription } });
      report.descriptions += 1;
    }

    const form = await prisma.formMaster.findFirst({
      where: { entity_type_id: type.entity_type_id },
      orderBy: { form_id: 'asc' },
      include: { sections: { include: { subsections: { include: { parameters: true } } } } },
    });
    if (!form) continue;
    const existing = new Map();
    for (const sec of form.sections) for (const sub of sec.subsections) for (const p of sub.parameters) existing.set(p.field_key, { p, sub, sec });

    for (const secDef of def.sections || []) {
      for (const subDef of secDef.subsections || [{ name: 'Main', parameters: secDef.parameters || [] }]) {
        for (const pDef of subDef.parameters || []) {
          const found = existing.get(pDef.field_key);
          const wanted = pDef.options && pDef.options.chat;
          if (found) {
            const opts = found.p.options && typeof found.p.options === 'object' && !Array.isArray(found.p.options) ? found.p.options : null;
            if (wanted && !(opts && opts.chat)) {
              await prisma.parameterMaster.update({
                where: { parameter_id: found.p.parameter_id },
                data: { options: { ...(Array.isArray(found.p.options) ? { choices: found.p.options } : (opts || {})), chat: wanted } },
              });
              report.chatSettings += 1;
            }
            continue;
          }
          // A field that is new in seed.js: add it to the subsection of the same name.
          const sec = form.sections.find((x) => x.section_name === secDef.name);
          const sub = sec && sec.subsections.find((x) => x.subsection_name === subDef.name);
          if (!sub || !category) continue;
          const lastOrder = Math.max(0, ...sub.parameters.map((x) => x.display_order || 0));
          const created = await prisma.parameterMaster.create({
            data: {
              subsection_id: sub.subsection_id,
              category_id: category.category_id,
              field_key: pDef.field_key,
              label: pDef.label,
              field_type: pDef.field_type,
              control_type: pDef.control_type,
              display_order: lastOrder + 1,
              options: pDef.options || null,
              mandatory: Boolean(pDef.mandatory),
              validation_rule: pDef.validation_rule || null,
            },
          });
          sub.parameters.push(created);
          existing.set(pDef.field_key, { p: created, sub, sec });
          report.fieldsAdded += 1;
          log(`  Added field "${pDef.label}" to ${def.entityTypeName}.`);
        }
      }
    }
  }

  for (const [name, config] of Object.entries(ASSISTANT_CONFIG)) {
    const type = await prisma.entityType.findFirst({ where: { name } });
    if (!type) continue;
    const row = await prisma.dashboardMaster.findFirst({ where: { entity_type_id: type.entity_type_id, widget_name: 'assistant_config' } });
    if (row) continue;
    await prisma.dashboardMaster.create({
      data: { entity_type_id: type.entity_type_id, widget_name: 'assistant_config', metric: 'config', display_type: 'config', filter: JSON.stringify(config) },
    });
    report.configRows += 1;
  }

  log(`Civic assistant settings upgraded: ${report.descriptions} description(s), ${report.chatSettings} field setting(s), ${report.fieldsAdded} new field(s), ${report.configRows} module setting row(s). Nothing was deleted.`);
  return report;
}

if (require.main === module) {
  upgrade()
    .then(() => prisma.$disconnect())
    .catch(async (err) => {
      console.error('Upgrade failed:', err.message);
      await prisma.$disconnect();
      process.exit(1);
    });
}

module.exports = { upgrade };
