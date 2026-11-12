/**
 * CIVIC-KALKI — homepage 3D scene: the civic ecosystem.
 *
 * What it shows is the product's idea, drawn from this installation's own
 * public metadata:
 *   - the core in the middle is the one engine;
 *   - the ring around it holds the modules that are actually configured
 *     (names and record counts from GET /forms/metadata);
 *   - coral arcs are the real rules between modules;
 *   - the outer tiles are the real wards (GET /jurisdictions?tree=true);
 *   - moving dots are requests travelling citizen → module → engine → ward.
 * Nothing is invented: with no modules or wards, those parts are simply absent.
 *
 * Loaded on demand (it pulls in three.js). It pauses when off screen or when
 * the tab is hidden, and is never mounted for reduced-motion users or without
 * WebGL — the page shows a static drawing instead.
 */

import * as THREE from 'three';
import SpriteText from 'three-spritetext';

const INK = '#14212b';
const TEAL = '#0f5257';
const TEAL_LIGHT = '#2f7f84';
const CORAL = '#e8623a';
const SUN = '#f0b450';
const SAND = '#e9e2d6';
const SAND_DARK = '#d9cfbf';

function label(text, { size = 0.3, weight = '600', color = INK } = {}) {
  const s = new SpriteText(text, size, color);
  s.fontFace = 'Inter Variable, Inter, system-ui, sans-serif';
  s.fontWeight = weight;
  s.backgroundColor = 'rgba(255,255,255,0.92)';
  // Padding and radius are in the same world units as the text height.
  s.padding = [size * 0.55, size * 0.3];
  s.borderRadius = size * 0.45;
  s.material.depthTest = false;
  s.renderOrder = 10;
  return s;
}

function haloTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(240,180,80,0.85)');
  grad.addColorStop(0.35, 'rgba(240,180,80,0.28)');
  grad.addColorStop(1, 'rgba(240,180,80,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

/**
 * @param {HTMLElement} mount
 * @param {{ modules: {id:number,name:string,count:number}[], rules: {source:number,target:number}[], wards: string[] }} data
 * @returns {{ destroy: () => void }}
 */
export function mountCivicScene(mount, data) {
  const modules = data.modules.slice(0, 12);
  const wards = data.wards.slice(0, 14);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 10.8, 22.5);
  camera.lookAt(0, 1.1, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xf3ead9, 2.1));
  const sun = new THREE.DirectionalLight(0xfff1d6, 1.6);
  sun.position.set(6, 10, 4);
  scene.add(sun);

  const world = new THREE.Group();
  scene.add(world);

  // ── Ground: the city, with orbit rings ───────────────────────────────────
  const ground = new THREE.Mesh(
    new THREE.CylinderGeometry(7.6, 7.6, 0.16, 96),
    // Unlit, so the city stays the same pale paper colour from every angle.
    [new THREE.MeshBasicMaterial({ color: '#e6ddcd' }), new THREE.MeshBasicMaterial({ color: '#fbf7f0' }), new THREE.MeshBasicMaterial({ color: '#e6ddcd' })]
  );
  ground.position.y = -0.08;
  world.add(ground);
  for (const [r, opacity] of [[4.3, 0.2], [6.6, 0.12]]) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(r - 0.012, r + 0.012, 128),
      new THREE.MeshBasicMaterial({ color: INK, transparent: true, opacity, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.012;
    world.add(ring);
  }

  // ── Core: the one engine ─────────────────────────────────────────────────
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.95, 1),
    new THREE.MeshStandardMaterial({ color: TEAL_LIGHT, flatShading: true, roughness: 0.5, emissive: TEAL, emissiveIntensity: 0.45 })
  );
  core.position.y = 1.7;
  world.add(core);
  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.32, 1),
    new THREE.MeshBasicMaterial({ color: CORAL, wireframe: true, transparent: true, opacity: 0.35 })
  );
  shell.position.copy(core.position);
  world.add(shell);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTexture(), transparent: true, depthWrite: false }));
  halo.scale.set(6.4, 6.4, 1);
  halo.position.copy(core.position);
  world.add(halo);
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.16, 1.1, 12),
    new THREE.MeshStandardMaterial({ color: SAND_DARK, roughness: 0.9 })
  );
  stem.position.y = 0.55;
  world.add(stem);
  const coreLabel = label('One engine', { size: 0.36, weight: '700' });
  coreLabel.position.set(0, 3.5, 0);
  world.add(coreLabel);

  // ── Modules: what is actually configured ─────────────────────────────────
  const modulePos = new Map();
  const moduleMeshes = [];
  modules.forEach((m, i) => {
    const angle = (i / Math.max(1, modules.length)) * Math.PI * 2 + Math.PI / 7;
    const pos = new THREE.Vector3(Math.cos(angle) * 4.3, 1.1 + (i % 3) * 0.55, Math.sin(angle) * 4.3);
    modulePos.set(m.id, pos);

    const radius = 0.26 + Math.min(m.count, 24) * 0.007;
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 28, 20),
      new THREE.MeshStandardMaterial({ color: '#3f9499', roughness: 0.45, emissive: TEAL, emissiveIntensity: 0.3 })
    );
    node.position.copy(pos);
    world.add(node);
    moduleMeshes.push(node);

    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, pos.y, 6),
      new THREE.MeshBasicMaterial({ color: INK, transparent: true, opacity: 0.16 })
    );
    post.position.set(pos.x, pos.y / 2, pos.z);
    world.add(post);

    const spoke = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([core.position, pos]),
      new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: 0.3 })
    );
    world.add(spoke);

    const text = label(m.name);
    text.position.set(pos.x, pos.y + radius + 0.42, pos.z);
    world.add(text);
  });

  // ── Rules: real links between modules ────────────────────────────────────
  const ruleCurves = [];
  for (const r of data.rules) {
    const a = modulePos.get(r.source);
    const b = modulePos.get(r.target);
    if (!a || !b || a === b) continue;
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.y += 1.5;
    mid.multiplyScalar(1.12);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    ruleCurves.push(curve);
    world.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)),
      new THREE.LineBasicMaterial({ color: CORAL, transparent: true, opacity: 0.9 })
    ));
  }

  // ── Wards: the places the work lands ─────────────────────────────────────
  const wardTiles = [];
  wards.forEach((name, i) => {
    const angle = (i / wards.length) * Math.PI * 2;
    const height = 0.34;
    const tile = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, height, 0.95),
      new THREE.MeshStandardMaterial({ color: '#f3ecdf', roughness: 0.9, emissive: TEAL, emissiveIntensity: 0 })
    );
    tile.position.set(Math.cos(angle) * 6.6, height / 2, Math.sin(angle) * 6.6);
    tile.rotation.y = -angle + Math.PI / 2;
    world.add(tile);
    const text = label(name, { size: 0.27, weight: '500', color: '#45525b' });
    text.position.set(Math.cos(angle) * 6.6, height + 0.42, Math.sin(angle) * 6.6);
    world.add(text);
    wardTiles.push({ tile, glow: 0, top: new THREE.Vector3(Math.cos(angle) * 6.6, height + 0.05, Math.sin(angle) * 6.6) });
  });

  // ── Requests in motion: citizen → module → engine → ward ─────────────────
  const pulseGeo = new THREE.SphereGeometry(0.11, 12, 10);
  const pulses = [];
  if (modules.length) {
    const count = Math.min(10, Math.max(4, modules.length));
    for (let i = 0; i < count; i += 1) {
      const m = modules[i % modules.length];
      const mPos = modulePos.get(m.id);
      const startAngle = Math.atan2(mPos.z, mPos.x) + (i % 2 ? 0.5 : -0.5);
      const start = new THREE.Vector3(Math.cos(startAngle) * 7.3, 0.2, Math.sin(startAngle) * 7.3);
      const ward = wardTiles.length ? wardTiles[(i * 3) % wardTiles.length] : null;
      const points = [start, mPos.clone(), core.position.clone()];
      if (ward) points.push(ward.top.clone().setY(1.2).multiplyScalar(0.62).setY(1.5), ward.top.clone());
      const mesh = new THREE.Mesh(pulseGeo, new THREE.MeshBasicMaterial({ color: CORAL }));
      world.add(mesh);
      pulses.push({ mesh, curve: new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.35), t: i / count, speed: 0.055 + (i % 3) * 0.008, ward });
    }
  }
  const rulePulses = ruleCurves.map((curve, i) => {
    const mesh = new THREE.Mesh(pulseGeo, new THREE.MeshBasicMaterial({ color: SUN }));
    world.add(mesh);
    return { mesh, curve, t: i * 0.37 };
  });

  // ── Size, pointer, loop ──────────────────────────────────────────────────
  const resize = () => {
    const w = mount.clientWidth || 1;
    const h = mount.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Keep the whole city in view on narrow panels.
    camera.fov = w / h < 0.95 ? 46 : 34;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(mount);
  resize();

  const pointer = { x: 0, y: 0 };
  const onPointer = (e) => {
    const rect = mount.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  let running = true;
  let visible = true;
  let raf = 0;
  let last = performance.now();
  let spin = 0;
  const tmp = new THREE.Vector3();

  const frame = (now) => {
    raf = 0;
    if (!mount.isConnected) { api.destroy(); return; } // the page was left
    if (!running || !visible || document.hidden) return;
    // The first frame's timestamp can be a hair before `last`; never step backwards.
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;

    spin += dt * 0.07;
    world.rotation.y = spin + pointer.x * 0.22;
    world.rotation.x = THREE.MathUtils.lerp(world.rotation.x, pointer.y * 0.05, 0.05);

    core.rotation.y += dt * 0.35;
    core.rotation.x += dt * 0.12;
    shell.rotation.y -= dt * 0.2;
    shell.rotation.z += dt * 0.08;
    const breathe = 1 + Math.sin(now / 900) * 0.035;
    halo.scale.set(6.4 * breathe, 6.4 * breathe, 1);

    for (const p of pulses) {
      p.t += dt * p.speed;
      if (p.t >= 1) { p.t = 0; if (p.ward) p.ward.glow = 1; }
      p.curve.getPointAt(p.t, tmp);
      p.mesh.position.copy(tmp);
    }
    for (const p of rulePulses) {
      p.t = (p.t + dt * 0.22) % 1;
      p.curve.getPointAt(p.t, tmp);
      p.mesh.position.copy(tmp);
    }
    for (const w of wardTiles) {
      if (w.glow > 0) w.glow = Math.max(0, w.glow - dt * 0.7);
      w.tile.material.emissiveIntensity = w.glow * 0.55;
    }
    moduleMeshes.forEach((m, i) => { m.position.y += Math.sin(now / 1100 + i) * 0.0009; });

    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf && running) { last = performance.now(); raf = requestAnimationFrame(frame); } };

  const io = new IntersectionObserver((entries) => { visible = entries.some((e) => e.isIntersecting); if (visible) kick(); });
  io.observe(mount);
  const onVisibility = () => { if (!document.hidden) kick(); };
  document.addEventListener('visibilitychange', onVisibility);
  kick();

  const api = {
    destroy() {
      if (!running) return;
      running = false;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) { if (o.material.map) o.material.map.dispose(); o.material.dispose(); }
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
  return api;
}
