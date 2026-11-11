/**
 * CIVIC-KALKI — rule and dependency graph (2D).
 *
 * Draws the modules (entity types) as boxes and the relationship rules between
 * them as arrows, straight from GET /forms/metadata. Nothing here knows any
 * module by name: deploying a module with a rule adds a box and an arrow.
 *
 * Encoding (no colour-only meaning):
 *   box        a module, with its record count and domain as text
 *   arrow      "when the source reaches <event>, create a target record"
 *   solid      the created record is approved automatically
 *   dashed     the created record waits for review
 * The same rules are listed in a table below the diagram, which is the
 * accessible equivalent and stays in the page for screen readers.
 */

const NODE_W = 190;
const NODE_H = 64;
const COL_GAP = 110;
const ROW_GAP = 26;
const PAD = 24;
const STANDALONE_GAP = 20;
const STANDALONE_PER_ROW = 4;
const SECTION_GAP = 56;

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function truncate(text, max) {
  const s = String(text ?? '');
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

/**
 * Layered layout: a module sits one column to the right of the furthest module
 * that creates it. Modules with no rules go in a wrapped grid underneath.
 * Cycles are tolerated: depth stops growing after one pass per module.
 */
export function layoutRuleGraph(entityTypes, rules) {
  const ids = entityTypes.map((t) => t.entity_type_id);
  const known = new Set(ids);
  const edges = rules.filter(
    (r) => known.has(r.source_entity_type_id) && known.has(r.target_entity_type_id)
  );

  const depth = new Map(ids.map((id) => [id, 0]));
  for (let pass = 0; pass < ids.length; pass += 1) {
    let changed = false;
    for (const e of edges) {
      if (e.source_entity_type_id === e.target_entity_type_id) continue;
      const want = depth.get(e.source_entity_type_id) + 1;
      if (want > depth.get(e.target_entity_type_id) && want < ids.length) {
        depth.set(e.target_entity_type_id, want);
        changed = true;
      }
    }
    if (!changed) break;
  }

  const linked = new Set(edges.flatMap((e) => [e.source_entity_type_id, e.target_entity_type_id]));

  // Linked modules: one column per depth.
  const columns = new Map();
  for (const t of entityTypes) {
    if (!linked.has(t.entity_type_id)) continue;
    const col = depth.get(t.entity_type_id);
    if (!columns.has(col)) columns.set(col, []);
    columns.get(col).push(t);
  }
  const sortedCols = [...columns.keys()].sort((a, b) => a - b);
  const tallest = Math.max(0, ...[...columns.values()].map((c) => c.length));
  // Extra room above the boxes for self-loops and edge labels.
  const linkedTop = PAD + (tallest ? 24 : 0);
  const linkedHeight = tallest ? tallest * NODE_H + (tallest - 1) * ROW_GAP : 0;
  const linkedWidth = sortedCols.length * NODE_W + Math.max(0, sortedCols.length - 1) * COL_GAP;

  // Modules with no rules: a wrapped grid underneath.
  const standalone = entityTypes.filter((t) => !linked.has(t.entity_type_id));
  const perRow = Math.max(1, Math.min(standalone.length, Math.max(STANDALONE_PER_ROW, Math.floor((linkedWidth + STANDALONE_GAP) / (NODE_W + STANDALONE_GAP)))));
  const standaloneRows = Math.ceil(standalone.length / perRow);
  const standaloneWidth = standalone.length ? perRow * NODE_W + (perRow - 1) * STANDALONE_GAP : 0;
  const standaloneTop = linkedTop + linkedHeight + (tallest && standalone.length ? SECTION_GAP : 0);
  const standaloneHeight = standaloneRows ? standaloneRows * NODE_H + (standaloneRows - 1) * ROW_GAP : 0;

  const width = PAD * 2 + Math.max(linkedWidth, standaloneWidth, NODE_W);
  const height = standaloneTop + standaloneHeight + PAD;

  const nodes = new Map();
  sortedCols.forEach((col, ci) => {
    const list = columns.get(col);
    const colHeight = list.length * NODE_H + (list.length - 1) * ROW_GAP;
    const top = linkedTop + (linkedHeight - colHeight) / 2;
    list.forEach((t, ri) => {
      nodes.set(t.entity_type_id, {
        type: t,
        x: PAD + ci * (NODE_W + COL_GAP),
        y: top + ri * (NODE_H + ROW_GAP),
        standalone: false,
      });
    });
  });
  standalone.forEach((t, i) => {
    nodes.set(t.entity_type_id, {
      type: t,
      x: PAD + (i % perRow) * (NODE_W + STANDALONE_GAP),
      y: standaloneTop + Math.floor(i / perRow) * (NODE_H + ROW_GAP),
      standalone: true,
    });
  });

  const standaloneLabelY = standalone.length && tallest ? standaloneTop - 14 : null;
  return { nodes, edges, width, height, standaloneLabelY };

}

function edgePath(from, to) {
  if (from === to) {
    // A rule from a module to itself: a loop above the box.
    const x = from.x + NODE_W / 2;
    return `M ${x - 26} ${from.y} C ${x - 60} ${from.y - 44}, ${x + 60} ${from.y - 44}, ${x + 26} ${from.y}`;
  }
  const forward = to.x >= from.x;
  const x1 = forward ? from.x + NODE_W : from.x;
  const x2 = forward ? to.x : to.x + NODE_W;
  const y1 = from.y + NODE_H / 2;
  const y2 = to.y + NODE_H / 2;
  const bend = Math.max(40, Math.abs(x2 - x1) / 2) * (forward ? 1 : -1);
  return `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
}

function ruleSentence(rule) {
  const source = rule.sourceEntityType?.name || `#${rule.source_entity_type_id}`;
  const target = rule.targetEntityType?.name || `#${rule.target_entity_type_id}`;
  const outcome = !rule.auto_create
    ? 'nothing is created (rule is switched off)'
    : `a ${target} is created ${rule.auto_approve ? 'and approved automatically' : 'and waits for review'}`;
  return `When a ${source} is ${rule.event || 'changed'}, ${outcome}.`;
}

function renderSvg({ nodes, edges, width, height, standaloneLabelY }) {
  const edgeSvg = edges.map((e) => {
    const from = nodes.get(e.source_entity_type_id);
    const to = nodes.get(e.target_entity_type_id);
    const d = edgePath(from, to);
    const midX = from === to ? from.x + NODE_W / 2 : (from.x + to.x + NODE_W) / 2;
    const midY = from === to ? from.y - 38 : (from.y + to.y + NODE_H) / 2 - 8;
    const cls = `rule-edge${e.auto_approve ? '' : ' rule-edge-pending'}${e.auto_create ? '' : ' rule-edge-off'}`;
    return `
      <g class="rule-edge-group" data-rule-id="${Number(e.rule_id)}">
        <title>${escapeHtml(ruleSentence(e))}</title>
        <path class="rule-edge-hit" d="${d}" />
        <path class="${cls}" d="${d}" marker-end="url(#rule-arrow)" />
        <text class="rule-edge-label" x="${midX}" y="${midY}" text-anchor="middle">on ${escapeHtml(e.event || 'change')}</text>
      </g>`;
  }).join('');

  const nodeSvg = [...nodes.values()].map(({ type, x, y, standalone }) => {
    const count = type._count?.entities ?? 0;
    const domain = type.domain?.domain_name || '';
    return `
      <a class="rule-node${standalone ? ' rule-node-standalone' : ''}" href="/entities?entity_type_id=${Number(type.entity_type_id)}"
         data-entity-type-id="${Number(type.entity_type_id)}" aria-label="${escapeHtml(`${type.name}, ${count} records. Open its records.`)}">
        <title>${escapeHtml(`${type.name} — ${count} record(s)${domain ? ` — ${domain}` : ''}`)}</title>
        <rect x="${x}" y="${y}" width="${NODE_W}" height="${NODE_H}" rx="10" />
        <text class="rule-node-name" x="${x + 14}" y="${y + 27}">${escapeHtml(truncate(type.name, 22))}</text>
        <text class="rule-node-meta" x="${x + 14}" y="${y + 47}">${count} record${count === 1 ? '' : 's'}${domain ? ` · ${escapeHtml(truncate(domain, 16))}` : ''}</text>
      </a>`;
  }).join('');

  return `
    <svg class="rule-graph-svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"
         role="img" aria-label="Diagram of modules and the rules that link them. The same rules are listed in the table below.">
      <defs>
        <marker id="rule-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" class="rule-arrow-head" />
        </marker>
      </defs>
      ${edgeSvg}
      ${standaloneLabelY !== null ? `<text class="rule-section-label" x="${PAD}" y="${standaloneLabelY}">Modules with no rules</text>` : ''}
      ${nodeSvg}
    </svg>`;
}

function renderTable(rules) {
  if (!rules.length) {
    return '<div class="text-muted">No rules are defined. Add one to a module in the No-Code Builder and it appears here.</div>';
  }
  const rows = rules.map((r) => `
        <tr data-rule-id="${Number(r.rule_id)}">
          <td>${escapeHtml(r.sourceEntityType?.name || r.source_entity_type_id)}</td>
          <td>${escapeHtml(r.event || '')}</td>
          <td>${escapeHtml(r.targetEntityType?.name || r.target_entity_type_id)}</td>
          <td>${r.auto_create ? 'Yes' : 'No'}</td>
          <td>${!r.auto_create ? '—' : (r.auto_approve ? 'Approved automatically' : 'Waits for review')}</td>
        </tr>`).join('');
  return `
    <div class="table-container">
      <table id="rule-graph-table">
        <caption class="rule-graph-caption">Rules: what is created when a record reaches a status</caption>
        <thead>
          <tr><th scope="col">When a record of</th><th scope="col">reaches</th><th scope="col">create a</th><th scope="col">Automatic</th><th scope="col">New record</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

/**
 * Render the graph and its table into `container`.
 * @param {HTMLElement} container
 * @param {{ entityTypes: object[], rules: object[] }} metadata  data of GET /forms/metadata
 */
export function renderRuleGraph(container, metadata) {
  const entityTypes = Array.isArray(metadata?.entityTypes) ? metadata.entityTypes : [];
  const rules = Array.isArray(metadata?.rules) ? metadata.rules : [];
  const layout = layoutRuleGraph(entityTypes, rules);

  container.innerHTML = `
    <section class="card rule-graph-card" aria-labelledby="rule-graph-title">
      <div class="card-header rule-graph-header">
        <div>
          <h2 class="card-title" id="rule-graph-title">How modules are linked</h2>
          <p class="rule-graph-sub">${entityTypes.length} module${entityTypes.length === 1 ? '' : 's'}, ${layout.edges.length} rule${layout.edges.length === 1 ? '' : 's'}. Read from the module metadata; nothing here is hard-coded.</p>
        </div>
        <ul class="rule-graph-legend" aria-label="Legend">
          <li><svg width="44" height="10" aria-hidden="true"><line x1="0" y1="5" x2="44" y2="5" class="rule-edge" /></svg> created and approved automatically</li>
          <li><svg width="44" height="10" aria-hidden="true"><line x1="0" y1="5" x2="44" y2="5" class="rule-edge rule-edge-pending" /></svg> created, waits for review</li>
        </ul>
      </div>
      <div class="card-body">
        ${entityTypes.length
          ? `<div class="rule-graph-scroll">${renderSvg(layout)}</div>`
          : '<div class="text-muted">No modules are configured yet.</div>'}
        <div class="rule-graph-table-wrap">${renderTable(layout.edges)}</div>
      </div>
    </section>`;

  // Hovering a table row highlights its arrow, and the other way round.
  const setActive = (ruleId, on) => {
    container.querySelectorAll(`[data-rule-id="${ruleId}"]`).forEach((el) => el.classList.toggle('is-active', on));
  };
  container.querySelectorAll('[data-rule-id]').forEach((el) => {
    const id = el.getAttribute('data-rule-id');
    el.addEventListener('mouseenter', () => setActive(id, true));
    el.addEventListener('mouseleave', () => setActive(id, false));
  });
}
