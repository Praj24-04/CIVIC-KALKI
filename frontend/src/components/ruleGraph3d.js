/**
 * CIVIC-KALKI — 3D view of the rule and dependency graph.
 *
 * Loaded on demand by ruleGraph.js (this module pulls in three.js). It shows the
 * same modules and rules as the 2D diagram; the 2D diagram and the rules table
 * remain the reference and the accessible equivalent.
 *
 * Encoding in 3D:
 *   sphere size      number of records in the module
 *   arrow            a rule, pointing at the module it creates a record in
 *   moving dots      the created record is approved automatically
 *   no dots          the created record waits for review
 */

import ForceGraph3D from '3d-force-graph';
import SpriteText from 'three-spritetext';

const MIN_FPS = 30;

/** Can this browser draw WebGL at all? */
export function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Mount the 3D graph in `mount`.
 * @returns {{ destroy: () => void, measureFps: () => Promise<number> }}
 */
export function mountRuleGraph3d(mount, { entityTypes, rules }, { onNodeClick } = {}) {
  const css = getComputedStyle(document.documentElement);
  const ink = (css.getPropertyValue('--text-primary') || '#0f172a').trim() || '#0f172a';
  const muted = (css.getPropertyValue('--text-secondary') || '#475569').trim() || '#475569';
  const surface = (css.getPropertyValue('--surface') || '#ffffff').trim() || '#ffffff';

  const known = new Set(entityTypes.map((t) => t.entity_type_id));
  const nodes = entityTypes.map((t) => ({
    id: t.entity_type_id,
    name: t.name,
    count: t._count?.entities ?? 0,
  }));
  const links = rules
    .filter((r) => known.has(r.source_entity_type_id) && known.has(r.target_entity_type_id))
    .map((r) => ({
      source: r.source_entity_type_id,
      target: r.target_entity_type_id,
      event: r.event || 'change',
      autoApprove: Boolean(r.auto_approve),
      label: `on ${r.event || 'change'} → ${r.auto_approve ? 'approved automatically' : 'waits for review'}`,
    }));

  const graph = new ForceGraph3D(mount, { controlType: 'orbit' })
    .width(mount.clientWidth)
    .height(mount.clientHeight)
    .backgroundColor(surface)
    .showNavInfo(false)
    .graphData({ nodes, links })
    .nodeLabel((n) => `${n.name} — ${n.count} record(s)`)
    .nodeRelSize(5)
    .nodeVal((n) => 1 + Math.min(n.count, 40) / 8)
    .nodeColor(() => muted)
    .nodeOpacity(0.9)
    .nodeThreeObjectExtend(true)
    .nodeThreeObject((n) => {
      const text = new SpriteText(n.name);
      text.color = ink;
      text.textHeight = 9;
      text.fontWeight = '600';
      text.backgroundColor = surface;
      text.padding = 1.5;
      text.borderRadius = 2;
      text.position.set(0, 18, 0);
      return text;
    })
    .linkLabel((l) => l.label)
    .linkColor(() => ink)
    .linkOpacity(0.7)
    .linkWidth(1.2)
    .linkCurvature((l) => (l.source === l.target || l.source?.id === l.target?.id ? 0.8 : 0))
    .linkDirectionalArrowLength(8)
    .linkDirectionalArrowRelPos(1)
    .linkDirectionalArrowColor(() => ink)
    .linkDirectionalParticles((l) => (l.autoApprove ? 3 : 0))
    .linkDirectionalParticleWidth(2.5)
    .linkDirectionalParticleColor(() => ink)
    .onNodeClick((n) => { if (onNodeClick) onNodeClick(n.id); });

  // Keep the modules close together so names stay readable, then frame them:
  // put the camera just far enough back to see the whole cluster.
  graph.d3Force('charge').strength(-35);
  graph.d3Force('link').distance(60);
  graph.cooldownTime(2500);
  const frame = (ms) => {
    try {
      const placed = graph.graphData().nodes.filter((n) => Number.isFinite(n.x));
      if (!placed.length) return;
      const c = ['x', 'y', 'z'].map((k) => placed.reduce((sum, n) => sum + n[k], 0) / placed.length);
      const radius = Math.max(40, ...placed.map((n) => Math.hypot(n.x - c[0], n.y - c[1], n.z - c[2])));
      graph.cameraPosition({ x: c[0], y: c[1], z: c[2] + radius * 2.1 + 40 }, { x: c[0], y: c[1], z: c[2] }, ms);
    } catch { /* destroyed */ }
  };
  setTimeout(() => frame(0), 400);
  setTimeout(() => frame(300), 1400);
  graph.onEngineStop(() => frame(300));

  // Do not render while the widget is off screen or the tab is hidden.
  let visible = true;
  const applyRunState = () => {
    if (visible && !document.hidden) graph.resumeAnimation();
    else graph.pauseAnimation();
  };
  const observer = new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting);
    applyRunState();
  });
  observer.observe(mount);
  document.addEventListener('visibilitychange', applyRunState);

  const onResize = () => graph.width(mount.clientWidth).height(mount.clientHeight);
  window.addEventListener('resize', onResize);

  return {
    /** Average frames per second over about one second. */
    measureFps() {
      return new Promise((resolve) => {
        let frames = 0;
        const start = performance.now();
        const tick = (now) => {
          frames += 1;
          if (now - start >= 1000) resolve((frames * 1000) / (now - start));
          else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    destroy() {
      observer.disconnect();
      document.removeEventListener('visibilitychange', applyRunState);
      window.removeEventListener('resize', onResize);
      try { graph.pauseAnimation(); graph._destructor(); } catch { /* already gone */ }
      mount.innerHTML = '';
    },
  };
}

export { MIN_FPS };
