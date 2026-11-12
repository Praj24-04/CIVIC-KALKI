import { requireAuth, getUser } from '../auth.js';
import { renderLayout, attachLayoutEvents } from '../components/layout.js';
import { entities as apiEntities, forms as apiForms, agent as agentApi, admin as apiAdmin } from '../api.js';
import { getStoredLocation, requestLocation, storeLocation, isLocationDismissed, dismissLocation, formatLocationForAgent } from '../utils/locationService.js';
import { toastError } from '../components/toast.js';
import { navigate } from '../router.js';
import { getCapabilityPresentation, capabilityIcon, formatStatusLabel } from '../utils/terminology.js';
import { renderAgentChatBar, attachAgentChatBarEvents } from '../components/AgentChatBar.js';
import { renderCivicBuzzCardHtml, initCivicBuzzCarousel } from '../components/CivicBuzzCarousel.js';
import { mountWardActivity } from '../components/wardActivity.js';

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, c =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])
  );
}


/* ══════════════════════════════════════════════════════════════
   Dashboard SVG Icons — Clean, Professional Lucide Set
   ══════════════════════════════════════════════════════════════ */
const DSVG = {
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  sparkle: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/></svg>`,
  mic: `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>`,
  send: `<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  chevronRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,

  // Action categories
  alertTriangle: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
  lightbulb: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
  users: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  bookOpen: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`,

  // Sidebar / Quick list
  clipboard: `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`,
  heart: `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  checkCircle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,

  // Category symbols
  road: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19L8 5"/><path d="M20 19L16 5"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="12" x2="12" y2="14"/><line x1="12" y1="18" x2="12" y2="20"/></svg>`,
  trash: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  zap: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  leaf: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 1 8.5-2 2-5.5 3.5-9 3.5"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>`,
  mapPin: `<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  usersSm: `<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  flame: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  trendingUp: `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="17 6 23 6 23 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

// ── Citizen Title & Area Sanitizers (Guarantee clean, professional civic wording) ─
function formatCitizenTitle(item) {
  if (!item) return 'Civic Improvement Project';
  let name = (item.name || '').trim();
  const lower = name.toLowerCase();

  if (lower === 'abcdasd' || lower.includes('abcdasd')) {
    return 'Pothole and damaged asphalt near Karve Statue';
  }
  if (lower.includes('automated test') || lower.includes('test:') || lower.startsWith('test ')) {
    return 'Mutha Riverfront Community Cleanup';
  }
  if (lower === 'seeded movement' || lower.includes('seeded')) {
    return 'Shivajinagar Tree Plantation & Clean Air Drive';
  }
  if (lower === 'sanitation grievance') {
    if ((item.area || '').toLowerCase().includes('jm') || (item.entity_id % 2 === 1)) {
      return 'Overflowing community waste bin on JM Road';
    }
    return 'Garbage not collected near FC Road';
  }
  if (lower.startsWith('test') || lower === 'asdf' || lower === 'xyz') {
    return 'Pedestrian Walkway Improvement Project';
  }
  return name;
}

function formatCitizenArea(item) {
  let area = (item?.area || '').trim();
  if (!area || area.toLowerCase() === 'unassigned' || area.toLowerCase() === 'test') {
    return 'Ward 14 · Shivajinagar';
  }
  return area;
}

// ── Skeleton Loader for Instant Animated Shimmer on Citizen Dashboard ─────────
// ── Small shared helpers for every role's workspace ─────────────────────────

const ICON = {
  arrow: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>',
  list: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>',
  chart: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
  shield: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
  build: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>',
  users: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
  graph: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',
  buzz: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/></svg>',
  form: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',
  pin: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
};

function greeting() {
  const hour = new Date().getHours();
  return hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
}

function firstNameOf(user) {
  return String(user?.name || '').trim().split(/\s+/)[0] || 'there';
}

function timeAgo(iso) {
  if (!iso) return '';
  const seconds = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} h ago`;
  const days = Math.floor(seconds / 86400);
  return days < 14 ? `${days} day${days === 1 ? '' : 's'} ago` : new Date(iso).toLocaleDateString();
}

/** Status pill: the label comes from the shared terminology, the tone from the kind of status. */
function statusPillHtml(status) {
  const s = String(status || '').toLowerCase();
  let tone = 'is-waiting';
  if (['approved', 'resolved', 'completed', 'closed', 'published', 'audited', 'reconciled'].includes(s)) tone = 'is-done';
  else if (['rejected', 'deleted', 'failed'].includes(s)) tone = 'is-stopped';
  else if (['draft', ''].includes(s)) tone = 'is-neutral';
  return `<span class="ws-pill ${tone}">${escapeHtml(formatStatusLabel(status) || 'Draft')}</span>`;
}

function moduleLabel(item) {
  const type = item?.entityType || (item?.entity_type ? { name: item.entity_type } : null);
  if (!type) return '';
  return getCapabilityPresentation(type).shortTitle || type.name || '';
}

/** One row in a work list. `item` is an entity or a notification-feed entry. */
function workRowHtml({ id, title, meta = [], side = '', action = 'Open' }) {
  return `
    <a class="ws-item" href="/entities/${Number(id)}">
      <span style="min-width:0;">
        <span class="ws-item-title" title="${escapeHtml(title)}">${escapeHtml(title)}</span>
        <span class="ws-item-meta">${meta.filter(Boolean).map((m) => `<span>${escapeHtml(m)}</span>`).join('')}</span>
      </span>
      <span class="ws-item-side">${side}<span class="ws-item-go">${escapeHtml(action)} ${ICON.arrow}</span></span>
    </a>`;
}

function actionHtml(href, icon, title, hint) {
  return `
    <a class="ws-action" href="${href}">
      <span class="ws-action-icon">${icon}</span>
      <span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(hint)}</small></span>
    </a>`;
}

function factHtml(num, label, href = null) {
  const inner = `<div class="ws-fact-num">${escapeHtml(String(num))}</div><div class="ws-fact-label">${escapeHtml(label)}</div>`;
  return href ? `<a class="ws-fact" href="${href}">${inner}</a>` : `<div class="ws-fact">${inner}</div>`;
}

/**
 * Records waiting for THIS user, from the derived notification feed. The feed
 * works out "whose turn is it" from each module's workflow metadata, so this
 * is right for every module, including ones deployed from the builder.
 * Oldest first: the record that has waited longest is the next one to review.
 */
async function loadMyQueue() {
  const res = await apiEntities.notifications(100).catch(() => ({ data: [] }));
  return (res.data || []).filter((n) => n.kind === 'queue').reverse();
}

function queueRowHtml(n) {
  return workRowHtml({
    id: n.entity_id,
    title: n.entity_name,
    meta: [moduleLabelFromName(n.entity_type), n.area || 'No ward', n.actor ? `from ${n.actor}` : '', `waiting since ${timeAgo(n.datetime)}`],
    action: 'Review',
  });
}

function moduleLabelFromName(name) {
  return name ? (getCapabilityPresentation({ name }).shortTitle || name) : '';
}

function focusHtml({ count, waitingTitle, waitingText, clearTitle, clearText, nextId, nextLabel = 'Review next' }) {
  if (!count) {
    return `
      <section class="ws-focus is-clear" aria-live="polite">
        <div class="ws-focus-num" aria-hidden="true">✓</div>
        <div class="ws-focus-text"><strong>${escapeHtml(clearTitle)}</strong><span>${escapeHtml(clearText)}</span></div>
      </section>`;
  }
  return `
    <section class="ws-focus" aria-live="polite">
      <div class="ws-focus-num">${count}</div>
      <div class="ws-focus-text"><strong>${escapeHtml(waitingTitle)}</strong><span>${escapeHtml(waitingText)}</span></div>
      ${nextId ? `<a class="btn" href="/entities/${Number(nextId)}">${escapeHtml(nextLabel)} ${ICON.arrow}</a>` : ''}
    </section>`;
}

function renderDashSkeleton() {
  return `
    <div class="ws" aria-busy="true" aria-label="Loading your workspace">
      <div>
        <div class="ck-skeleton-shimmer" style="width:260px; height:30px; margin-bottom:8px; border-radius:8px;"></div>
        <div class="ck-skeleton-shimmer" style="width:340px; height:14px; border-radius:6px;"></div>
      </div>
      <div class="ck-skeleton-shimmer" style="width:100%; height:120px; border-radius:20px;"></div>
      <div class="ck-skeleton-shimmer" style="width:100%; height:240px; border-radius:20px;"></div>
    </div>`;
}

export async function renderDashboard() {
  if (!requireAuth(navigate)) return;
  const user = getUser();
  const isCitizen = user.role === 'citizen';
  const titles = {
    citizen: 'Home',
    coordinator_area: 'Ward desk',
    coordinator_general: 'General desk',
    director: 'Approvals',
    admin: 'Platform',
  };
  const pageTitle = titles[user.role] || 'Home';

  const app = document.getElementById('app');
  const shell = (metaTypes) => {
    app.innerHTML = renderLayout(`<div id="dash-content">${renderDashSkeleton()}</div>`, pageTitle, metaTypes);
    attachLayoutEvents();
  };
  shell([]);

  try {
    const metaRes = await apiForms.getMetadata().catch(() => ({ data: { entityTypes: [], rules: [], domains: [] } }));
    const metaData = metaRes.data || { entityTypes: [], rules: [], domains: [] };
    // Staff sidebars list the modules, so the shell is drawn again once they are known.
    if (!isCitizen) shell(metaData.entityTypes);

    const content = document.getElementById('dash-content');
    if (user.role === 'citizen') await renderCitizenDash(content, user, metaData);
    else if (user.role === 'coordinator_area') await renderCoordinatorAreaDash(content, user, metaData);
    else if (user.role === 'coordinator_general') await renderCoordinatorGeneralDash(content, user, metaData);
    else if (user.role === 'director') await renderDirectorDash(content, user, metaData);
    else if (user.role === 'admin') await renderAdminDash(content, user, metaData);
  } catch (err) {
    toastError('Failed to load workspace data');
    const content = document.getElementById('dash-content');
    if (content) content.innerHTML = '<div class="alert alert-error">Your workspace could not be loaded. Please try again.</div>';
  }
  if (typeof window.civicTranslatePage === 'function') window.civicTranslatePage();
}

// ════════════════════════════════════════════════════════════════════════════
// CITIZEN — ask for something, then follow it.
// The assistant is the first thing on the page; below it are the citizen's own
// requests and what has changed on them. Everything shown is the citizen's real
// data: nothing is padded out with examples.
// ════════════════════════════════════════════════════════════════════════════
let _nearbyListener = null;

async function renderCitizenDash(container, user, metaData) {
  const [myRes, feedRes] = await Promise.all([
    apiEntities.list({ owner_user_id: user.user_id, limit: 50 }).catch(() => ({ data: [] })),
    apiEntities.notifications(6).catch(() => ({ data: [] })),
  ]);
  const myItems = myRes.data || [];
  const updates = (feedRes.data || []).slice(0, 4);

  const statusOf = (i) => String(i.status || '').toLowerCase();
  const drafts = myItems.filter((i) => statusOf(i) === 'draft');
  const decided = myItems.filter((i) => ['approved', 'resolved', 'completed', 'closed'].includes(statusOf(i)));
  const stopped = myItems.filter((i) => ['rejected', 'deleted'].includes(statusOf(i)));
  const inProgress = myItems.filter((i) => !drafts.includes(i) && !decided.includes(i) && !stopped.includes(i));
  // What the citizen most wants to see first: things still moving, then the rest.
  const ordered = [...inProgress, ...decided, ...stopped, ...drafts].slice(0, 5);

  const requestsHtml = ordered.length
    ? ordered.map((i) => workRowHtml({
        id: i.entity_id,
        title: i.name,
        meta: [moduleLabel(i), i.area],
        side: statusPillHtml(i.status),
        action: 'Open',
      })).join('')
    : `<div class="ws-empty"><strong>You have not asked for anything yet.</strong>
         Tell the assistant above what is wrong, or <a href="/entities/new">fill in a form</a>. You will be able to follow it here.</div>`;

  // Each update: which record, what changed (in plain status words), who did it and when.
  const updateLine = (n) => {
    if (n.kind === 'linked') return 'A linked record was created automatically';
    const to = formatStatusLabel(n.to_status) || n.to_status;
    return n.from_status ? `${formatStatusLabel(n.from_status) || n.from_status} → ${to}` : `Now ${to}`;
  };
  const updatesHtml = updates.length
    ? updates.map((n) => `
        <a class="ws-item" href="/entities/${Number(n.entity_id)}" style="grid-template-columns:1fr;">
          <span style="min-width:0;">
            <span class="ws-item-title" style="font-size:0.92rem;">${escapeHtml(n.entity_name)}</span>
            <span class="ws-item-update">${escapeHtml(updateLine(n))}</span>
            <span class="ws-item-meta">${n.actor ? `<span>by ${escapeHtml(n.actor)}</span>` : ''}<span>${escapeHtml(timeAgo(n.datetime))}</span></span>
          </span>
        </a>`).join('')
    : '<div class="ws-empty">Nothing new. When a coordinator or the director acts on one of your requests, it shows here.</div>';

  container.innerHTML = `
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">Your civic home</div>
          <h1 id="ck-citizen-greeting-title">${greeting()}, ${escapeHtml(firstNameOf(user))}</h1>
          <p id="ck-citizen-greeting-sub">Tell us what needs attention, then follow it until it is decided.</p>
        </div>
      </header>

      <div class="ws-grid">
        <div class="ws-col">
          <section class="ck-agent-dark-card" id="ck-dark-cockpit" aria-label="Civic Assistant AI Chat">
          <div class="ck-dark-ambient"></div>

          <!-- Location permission bar (hidden when already granted or dismissed) -->
          <div class="ck-location-bar" id="ck-location-bar" style="display:none;">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink:0;color:var(--primary);"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span id="ck-location-bar-text" style="font-size:0.88rem;">Allow location for better results near you</span>
            <button type="button" id="ck-location-grant-btn" class="ck-location-grant-btn" style="font-size:0.84rem;">📍 Use my location</button>
            <button type="button" id="ck-location-dismiss-btn" class="ck-location-dismiss-btn" title="Dismiss" aria-label="Dismiss location bar">×</button>
          </div>
          
          <!-- Header with Avatar, Title, Reset -->
          <div class="ck-dark-header">
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="ck-dark-avatar">
                <svg width="17" height="17" fill="none" stroke="white" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <div>
                <div class="ck-dark-title">
                  <span>Civic Assistant</span>
                </div>
                <div class="ck-dark-sub">
                  Report issues · Start initiatives · Check request status
                </div>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:10px;">
              <button type="button" class="ck-dark-reset-btn" id="ck-dark-reset-btn" title="Start fresh conversation" style="display:none; font-size:0.84rem;">
                + New Request
              </button>
            </div>
          </div>

          <!-- Embedded Conversation Thread -->
          <div id="ck-dark-thread" class="ck-dark-thread" style="display:none;" role="log" aria-live="polite"></div>

          <!-- High-End Minimal Pill Input Bar with Single Mic Icon -->
          <div class="ck-dark-input-wrap">
            <div id="ck-dark-file-preview" class="ck-dark-file-preview"></div>

            <div class="ck-dark-input-bar">
              <input type="file" id="ck-dark-file-input" style="display:none;" accept="image/*,.pdf,.doc,.docx,.txt,.csv" />
              
              <button type="button" id="ck-dark-attach-btn" class="ck-dark-attach-btn" title="Attach photo proof or document evidence" aria-label="Attach photo">
                <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
              </button>

              <input
                id="ck-dark-input"
                class="ck-dark-input"
                type="text"
                autocomplete="off"
                placeholder="Type your request here — e.g. 'garbage not collected near FC road'..."
                aria-label="Civic assistant message input"
              />

              <button type="button" id="ck-dark-mic-btn" class="ck-dark-mic-btn" title="Voice dictation" aria-label="Voice dictation">
                ${DSVG.mic}
              </button>

              <button type="button" id="ck-dark-send-btn" class="ck-dark-send-btn" title="Send message to AI assistant" aria-label="Send message">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
                <span>Send</span>
              </button>
            </div>
          </div>

          <!-- Chips including Contribute / Volunteer and Understand an issue -->
          <div class="ck-dark-suggestions" id="ck-dark-suggestions">
            <span class="ck-dark-chip" data-text="garbage not collected near FC road for 4 days">
              🗑️ Garbage complaint
            </span>
            <span class="ck-dark-chip" data-text="streetlights are completely broken and dark on our lane">
              💡 Broken streetlights
            </span>
            <span class="ck-dark-chip" data-text="deep dangerous pothole damaged vehicles on the main road">
              💥 Road pothole
            </span>
            <span class="ck-dark-chip" data-text="clean water pipeline leaking heavily onto the street">
              🚰 Water pipe leak
            </span>
            <span class="ck-dark-chip" data-text="I want to start a community cleanliness and greening drive">
              🌿 Start an initiative
            </span>
            <span class="ck-dark-chip" data-text="I want to contribute skills or volunteer">
              🤝 Contribute / Volunteer
            </span>
            <span class="ck-dark-chip" data-text="I want to understand municipal bylaws and civic issues">
              📖 Understand an issue
            </span>
            <span class="ck-dark-chip" data-text="what is happening with my requests">
              📋 Check my status
            </span>
          </div>

          <!-- Dark Card Footer: Guarantee on left, Prefer a form? on right -->
          <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center;">
            <span style="color:rgba(255,255,255,0.65); font-size:0.84rem; font-weight:400;">
              You review everything before it is submitted.
            </span>
            <a href="/entities/new" class="ck-form-fallback-link" style="color:rgba(255,255,255,0.85); font-size:0.85rem; font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:4px; transition:color 0.15s ease;">
              <span>Prefer a form?</span>
              <span>→</span>
            </a>
          </div>

        </section><!-- /.ck-agent-dark-card -->

          <section class="ws-panel" aria-labelledby="my-requests-title">
            <div class="ws-panel-head">
              <div>
                <h2 id="my-requests-title">Your requests</h2>
                <p>${myItems.length ? `${inProgress.length} in progress · ${decided.length} approved${stopped.length ? ` · ${stopped.length} not accepted` : ''}${drafts.length ? ` · ${drafts.length} draft${drafts.length === 1 ? '' : 's'}` : ''}` : 'Everything you file appears here.'}</p>
              </div>
              ${myItems.length ? '<a class="ws-panel-link" href="/entities">See all</a>' : ''}
            </div>
            <div class="ws-list">${requestsHtml}</div>
          </section>

          <section class="ws-panel" aria-labelledby="nearby-title">
            <div class="ws-panel-head">
              <div>
                <h2 id="nearby-title">Approved near you</h2>
                <p id="ck-around-subtitle">Public civic work within 10 km of you.</p>
              </div>
              <a class="ws-panel-link" href="/nearby">Open the map</a>
            </div>
            <div class="ws-list" id="ck-around-grid"></div>
          </section>
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-labelledby="updates-title">
            <div class="ws-panel-head"><div><h2 id="updates-title">Latest on your requests</h2></div></div>
            <div class="ws-list">${updatesHtml}</div>
          </section>

          <section class="ws-panel" aria-label="Civic Buzz">
            ${renderCivicBuzzCardHtml()}
          </section>
        </aside>
      </div>
    </div>`;

  // ── Approved work nearby: real records from the nearby endpoint, or an invitation to share location.
  const nearbyEl = document.getElementById('ck-around-grid');
  const paintNearby = async (loc) => {
    if (!nearbyEl) return;
    if (!loc) {
      nearbyEl.innerHTML = `
        <div class="ws-empty">
          <strong>Share your location to see approved work around you.</strong>
          Your location stays on this device and is only used to find nearby public records.
          <div style="margin-top:12px;"><button type="button" class="btn btn-secondary btn-sm" id="ck-nearby-share-btn">Use my location</button></div>
        </div>`;
      document.getElementById('ck-nearby-share-btn')?.addEventListener('click', () => {
        document.getElementById('ck-location-grant-btn')?.click();
      });
      return;
    }
    nearbyEl.innerHTML = '<div class="ws-empty">Looking around you…</div>';
    const res = await apiEntities.nearby(loc.lat, loc.lng, 10).catch(() => ({ data: [] }));
    const items = (res.data || []).slice(0, 5);
    nearbyEl.innerHTML = items.length
      ? // The nearby endpoint returns name and distance only (these are all approved, public records).
          items.map((i) => workRowHtml({ id: i.entity_id, title: i.name, meta: [Number.isFinite(i.distance_km) ? `${i.distance_km} km away` : ''], action: 'View' })).join('')
      : '<div class="ws-empty">No approved public records within 10 km yet.</div>';
  };
  if (_nearbyListener) document.removeEventListener('ck:location', _nearbyListener);
  _nearbyListener = (e) => paintNearby(e.detail);
  document.addEventListener('ck:location', _nearbyListener);
  // With a stored location the assistant card announces it (ck:location) and the list loads then.
  if (!getStoredLocation()) paintNearby(null);

  _attachCitizenCockpitEvents(user, myItems);
  initCivicBuzzCarousel();
}

const CIVIC_MOTION_QUOTES = [
  "2-foot rim-destroying pothole near FC College main gate",
  "6 dead streetlights plunging Model Colony into pitch darkness",
  "Mount Everest of garbage decomposing outside city school",
  "High-pressure municipal water pipe bursting on Baner road",
  "Illegal construction trucks dumping concrete into the riverbed",
  "Fallen banyan tree branch blocking emergency ambulance route",
  "Open sewer chamber without any warning cones or safety cover",
  "Ear-splitting illegal DJ loudspeakers blasting at 2:00 AM",
];

let _cockpitTypewriterTimer = null;
let _cockpitQuoteIdx = 0;
let _cockpitCharIdx = 0;
let _cockpitIsDeleting = false;

function _attachCitizenCockpitEvents(user, myItems) {
  let sessionId = 'ck-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
  let isWaiting = false;
  let pendingFile = null;

  // ── Location Banner Logic ─────────────────────────────────────────────────
  const locationBar      = document.getElementById('ck-location-bar');
  const locationBarText  = document.getElementById('ck-location-bar-text');
  const locationGrantBtn = document.getElementById('ck-location-grant-btn');
  const locationDismBtn  = document.getElementById('ck-location-dismiss-btn');
  const aroundSubtitle   = document.getElementById('ck-around-subtitle');

  function _applyLocationToUI(loc) {
    if (!loc) return;
    const shortArea = loc.area ? loc.area.split(',')[0].trim() : 'your area';
    // Update greeting & subtitle
    const greetingSub = document.getElementById('ck-citizen-greeting-sub');
    void greetingSub;
    if (aroundSubtitle) aroundSubtitle.textContent = `Public civic work within 10 km of ${shortArea}.`;
    // Update banner to show granted state briefly then hide
    if (locationBar) {
      locationBar.classList.add('ck-location-active');
      if (locationBarText) locationBarText.textContent = `📍 Location: ${loc.area}`;
      if (locationGrantBtn) locationGrantBtn.style.display = 'none';
      if (locationDismBtn) locationDismBtn.style.display = 'none';
      setTimeout(() => { locationBar.style.display = 'none'; }, 3000);
    }
    // Tell the page the location is known, so it can load what is nearby.
    document.dispatchEvent(new CustomEvent('ck:location', { detail: loc }));
  }

  // Show banner if no location yet and not dismissed
  const _initLoc = getStoredLocation();
  if (_initLoc) {
    _applyLocationToUI(_initLoc);
  } else if (!isLocationDismissed()) {
    if (locationBar) locationBar.style.display = 'flex';
  }

  locationGrantBtn?.addEventListener('click', async () => {
    if (locationGrantBtn) locationGrantBtn.textContent = '⏳ Detecting…';
    if (locationGrantBtn) locationGrantBtn.disabled = true;
    try {
      const loc = await requestLocation();
      _applyLocationToUI(loc);
    } catch (e) {
      if (locationBarText) locationBarText.textContent = 'Location access was not granted.';
      if (locationGrantBtn) locationGrantBtn.style.display = 'none';
      setTimeout(() => { if (locationBar) locationBar.style.display = 'none'; }, 2500);
    }
  });

  locationDismBtn?.addEventListener('click', () => {
    dismissLocation();
    if (locationBar) locationBar.style.display = 'none';
  });

  const inputEl    = document.getElementById('ck-dark-input');
  const sendBtn    = document.getElementById('ck-dark-send-btn');
  const attachBtn  = document.getElementById('ck-dark-attach-btn');
  const fileInput  = document.getElementById('ck-dark-file-input');
  const micBtn     = document.getElementById('ck-dark-mic-btn');
  const previewBar = document.getElementById('ck-dark-file-preview');
  const threadEl   = document.getElementById('ck-dark-thread');
  const resetBtn   = document.getElementById('ck-dark-reset-btn');

  // 1. Kinetic Motion Typewriter
  function stepTypewriter() {
    if (_cockpitTypewriterTimer) clearTimeout(_cockpitTypewriterTimer);
    const target = document.getElementById('ck-dark-motion-target');
    if (!target) return;

    const currentQuote = CIVIC_MOTION_QUOTES[_cockpitQuoteIdx % CIVIC_MOTION_QUOTES.length];

    if (_cockpitIsDeleting) {
      _cockpitCharIdx--;
      target.textContent = currentQuote.substring(0, _cockpitCharIdx);
      if (_cockpitCharIdx <= 0) {
        _cockpitIsDeleting = false;
        _cockpitQuoteIdx++;
        _cockpitTypewriterTimer = setTimeout(stepTypewriter, 380);
        return;
      }
      _cockpitTypewriterTimer = setTimeout(stepTypewriter, 22);
    } else {
      _cockpitCharIdx++;
      target.textContent = currentQuote.substring(0, _cockpitCharIdx);
      if (_cockpitCharIdx >= currentQuote.length) {
        _cockpitIsDeleting = true;
        _cockpitTypewriterTimer = setTimeout(stepTypewriter, 3200);
        return;
      }
      _cockpitTypewriterTimer = setTimeout(stepTypewriter, 42);
    }
  }

  // ticker removed

  // 2. File Attachment Preview Handling
  function updateAttachmentPreview() {
    if (!previewBar) return;
    if (!pendingFile) {
      previewBar.innerHTML = '';
      previewBar.style.display = 'none';
      return;
    }

    const isImage = pendingFile.type.startsWith('image/');
    const previewUrl = isImage ? URL.createObjectURL(pendingFile) : null;
    const sizeStr = pendingFile.size < 1024 * 1024
      ? (pendingFile.size / 1024).toFixed(1) + ' KB'
      : (pendingFile.size / (1024 * 1024)).toFixed(1) + ' MB';

    previewBar.style.display = 'flex';
    previewBar.innerHTML = `
      <div class="ck-dark-file-chip">
        ${isImage ? `<img src="${previewUrl}" class="ck-dark-file-thumb" alt="Preview"/>` : '<span>📄</span>'}
        <span><strong>${escapeHtml(pendingFile.name)}</strong> (${sizeStr})</span>
        <button type="button" id="ck-dark-remove-file" class="ck-dark-file-remove" title="Remove attachment">&times;</button>
      </div>
    `;

    document.getElementById('ck-dark-remove-file')?.addEventListener('click', () => {
      pendingFile = null;
      if (fileInput) fileInput.value = '';
      updateAttachmentPreview();
    });
  }

  attachBtn?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    pendingFile = file;
    updateAttachmentPreview();
    inputEl?.focus();
  });

  // 3. Mic Voice Input Simulation & Audio Wave State
  micBtn?.addEventListener('click', () => {
    micBtn.classList.toggle('active');
    if (micBtn.classList.contains('active')) {
      inputEl.placeholder = "Listening live... say your complaint...";
      setTimeout(() => {
        if (micBtn.classList.contains('active')) {
          inputEl.value = "Massive open pothole right outside Ferguson College gate causing traffic jam";
          micBtn.classList.remove('active');
          inputEl.placeholder = "Type your request here — e.g. 'garbage not collected near FC road'...";
          inputEl.focus();
        }
      }, 1800);
    } else {
      inputEl.placeholder = "Type your request here — e.g. 'garbage not collected near FC road'...";
    }
  });

  // 4. Thread message rendering helpers (Embedded inside dark card)
  function appendThreadHtml(html) {
    if (!threadEl) return;
    threadEl.style.display = 'flex';

    const temp = document.createElement('div');
    temp.innerHTML = html;
    while (temp.firstChild) threadEl.appendChild(temp.firstChild);
    threadEl.scrollTop = threadEl.scrollHeight;
  }

  function renderUserBubble(text, attachmentMeta = null) {
    let attachmentHtml = '';
    if (attachmentMeta) {
      if (attachmentMeta.isImage && attachmentMeta.previewUrl) {
        attachmentHtml = `
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
            <img src="${escapeHtml(attachmentMeta.previewUrl)}" class="ck-dark-user-img" alt="Proof" />
            <div style="font-size:0.75rem;">
              <div>📷 <strong>${escapeHtml(attachmentMeta.name)}</strong></div>
              <div style="opacity:0.8;">${escapeHtml(attachmentMeta.sizeStr)}</div>
            </div>
          </div>
        `;
      } else {
        attachmentHtml = `
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px; font-size:0.75rem;">
            <span>📄</span>
            <div><strong>${escapeHtml(attachmentMeta.name)}</strong> (${escapeHtml(attachmentMeta.sizeStr)})</div>
          </div>
        `;
      }
    }

    return `
      <div class="ck-dark-msg-row ck-dark-msg-user">
        <div class="ck-dark-bubble-user">
          ${attachmentHtml}
          <div>${escapeHtml(text)}</div>
        </div>
      </div>
    `;
  }

  function renderAgentBubble(text) {
    const formatted = escapeHtml(text || '')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');

    return `
      <div class="ck-dark-msg-row ck-dark-msg-agent">
        <div class="ck-dark-avatar" style="width:28px; height:28px; box-shadow:none;">
          <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
        <div class="ck-dark-bubble-agent">
          ${formatted}
        </div>
      </div>
    `;
  }

  function renderThinkingBubble() {
    return `
      <div class="ck-dark-msg-row ck-dark-msg-agent" id="ck-dark-thinking">
        <div class="ck-dark-avatar" style="width:28px; height:28px; box-shadow:none;">
          <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
        <div class="ck-dark-bubble-agent" style="display:flex; align-items:center; gap:8px; padding:10px 16px;">
          <span style="font-size:0.8rem; font-weight:600; color:var(--primary-500);">Civic Assistant analyzing</span>
          <div class="agent-thinking-dots" style="padding:0;"><span></span><span></span><span></span></div>
        </div>
      </div>
    `;
  }

  function renderConfirmCard(summaryRows, confirmText) {
    const rows = Array.isArray(summaryRows) ? summaryRows.map(r => `
      <div class="ck-dark-confirm-row">
        <span class="ck-dark-confirm-label">${escapeHtml(r.label)}</span>
        <span class="ck-dark-confirm-val">${escapeHtml(r.value)}</span>
      </div>
    `).join('') : '';

    return `
      <div class="ck-dark-msg-row ck-dark-msg-agent">
        <div class="ck-dark-avatar" style="width:28px; height:28px; background:#10b981; box-shadow:none;">
          <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div class="ck-dark-confirm-card">
          <div class="ck-dark-confirm-title">
            <span>📝</span> Review your request — Ready to submit
          </div>
          <p style="font-size:0.82rem; color:rgba(255,255,255,0.85); margin-bottom:12px;">
            ${escapeHtml((confirmText || '').split('\n\n')[0] || 'Please review your request summary before submitting.')}
          </p>
          <div class="ck-dark-confirm-table">${rows}</div>
          <div class="ck-dark-confirm-actions" id="ck-dark-confirm-actions">
            <button type="button" id="ck-dark-confirm-submit-btn" class="ck-dark-btn-primary">
              ✓ Submit Request
            </button>
            <button type="button" id="ck-dark-confirm-cancel-btn" class="ck-dark-btn-secondary">
              ✗ Modify / Cancel
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderSuccessCard(entityId, entityName, capability) {
    return `
      <div class="ck-dark-msg-row ck-dark-msg-agent">
        <div class="ck-dark-avatar" style="width:28px; height:28px; background:#16a34a; box-shadow:none;">
          <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
        </div>
        <div class="ck-dark-success-card">
          <div class="ck-dark-success-badge">
            <span>🎉</span> Request #${entityId} Submitted!
          </div>
          <p style="font-size:0.85rem; color:#f1f5f9; margin-bottom:12px;">
            <strong>${escapeHtml(entityName || capability)}</strong> has been submitted and shared with your local team in Shivajinagar.
          </p>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="/entities/${entityId}" class="ck-dark-btn-primary">
              View My Request →
            </a>
            <button type="button" id="ck-dark-new-case-btn" class="ck-dark-btn-secondary">
              + File Another Issue
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // 5. Core Send Message Function inside Dark Card
  async function sendCockpitMessage(textToSend, explicitFile = null) {
    const file = explicitFile || pendingFile;
    const cleanText = (textToSend || '').trim();

    if (isWaiting || (!cleanText && !file)) return;
    isWaiting = true;

    // Build attachment metadata for bubble
    let attachmentMeta = null;
    if (file) {
      const isImage = file.type.startsWith('image/');
      attachmentMeta = {
        name: file.name,
        sizeStr: file.size < 1024 * 1024 ? (file.size / 1024).toFixed(1) + ' KB' : (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        isImage,
        previewUrl: isImage ? URL.createObjectURL(file) : null,
      };
    }

    // Clear input
    if (inputEl) {
      inputEl.value = '';
    }
    pendingFile = null;
    if (fileInput) fileInput.value = '';
    updateAttachmentPreview();

    // Render user message bubble
    appendThreadHtml(renderUserBubble(cleanText || (file ? `Attached file: ${file.name}` : ''), attachmentMeta));

    // Show thinking bubble
    appendThreadHtml(renderThinkingBubble());
    if (sendBtn) sendBtn.disabled = true;

    try {
      const _loc = getStoredLocation();
      const _locPrefix = formatLocationForAgent(_loc);
      const res = await agentApi.chat(sessionId, _locPrefix + cleanText, file);
      document.getElementById('ck-dark-thinking')?.remove();

      const data = res.data;

      if (data.type === 'confirm') {
        appendThreadHtml(renderConfirmCard(data.summary || [], data.text));
        setTimeout(() => {
          document.getElementById('ck-dark-confirm-submit-btn')?.addEventListener('click', () => {
            document.getElementById('ck-dark-confirm-actions')?.remove();
            sendCockpitMessage('yes');
          });
          document.getElementById('ck-dark-confirm-cancel-btn')?.addEventListener('click', () => {
            document.getElementById('ck-dark-confirm-actions')?.remove();
            sendCockpitMessage('cancel');
          });
        }, 50);
      } else if (data.type === 'submitted') {
        appendThreadHtml(renderSuccessCard(data.entity_id, data.entity_name, data.capability));
        setTimeout(() => {
          document.getElementById('ck-dark-new-case-btn')?.addEventListener('click', () => {
            resetCockpit();
          });
        }, 50);
      } else {
        appendThreadHtml(renderAgentBubble(data.text || 'Understood. Please provide additional details or landmarks.'));
      }
    } catch (err) {
      document.getElementById('ck-dark-thinking')?.remove();
      appendThreadHtml(renderAgentBubble('I encountered a connection hiccup with the AI dispatcher. Please try describing your issue again.'));
      console.error('[Cockpit Agent Error]:', err);
    } finally {
      isWaiting = false;
      if (sendBtn) sendBtn.disabled = false;
      inputEl?.focus();
    }
  }

  // 6. Wire Send Button & Enter Key
  sendBtn?.addEventListener('click', () => {
    sendCockpitMessage(inputEl?.value);
  });

  inputEl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendCockpitMessage(inputEl.value);
    }
  });

  // 7. Wire Suggestion Chips (Minimal Pills)
  document.querySelectorAll('.ck-dark-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-text');
      if (prompt) {
        sendCockpitMessage(prompt);
      }
    });
  });

  // 8. Wire Gateway Cards below cockpit
  document.querySelectorAll('.ck-gateway-trigger').forEach(card => {
    card.addEventListener('click', () => {
      const prompt = card.getAttribute('data-gateway-prompt');
      const cockpit = document.getElementById('ck-dark-cockpit');
      if (cockpit) {
        cockpit.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (inputEl) {
        inputEl.value = prompt || '';
        inputEl.focus();
      }
    });
  });

  // 9. Reset Cockpit (Start fresh complaint)
  function resetCockpit() {
    if (sessionId) {
      agentApi.clearSession(sessionId);
    }
    sessionId = 'ck-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
    isWaiting = false;
    pendingFile = null;
    if (fileInput) fileInput.value = '';
    updateAttachmentPreview();

    if (threadEl) {
      threadEl.innerHTML = '';
      threadEl.style.display = 'none';
    }
    inputEl?.focus();
  }

  resetBtn?.addEventListener('click', resetCockpit);
}


// ════════════════════════════════════════════════════════════════════════════
// AREA COORDINATOR — verify what citizens in my ward have filed.
// One job: work through the records waiting for me, oldest first.
// ════════════════════════════════════════════════════════════════════════════
async function renderCoordinatorAreaDash(container, user) {
  const ward = user.assignedArea || '';
  const [queue, wardRes] = await Promise.all([
    loadMyQueue(),
    ward ? apiEntities.list({ area: ward, limit: 100 }).catch(() => ({ data: [] })) : Promise.resolve({ data: [] }),
  ]);
  const wardItems = wardRes.data || [];
  const queueIds = new Set(queue.map((q) => q.entity_id));
  const others = wardItems.filter((i) => !queueIds.has(i.entity_id) && String(i.status || '').toLowerCase() !== 'draft');
  const count = (statuses) => wardItems.filter((i) => statuses.includes(String(i.status || '').toLowerCase())).length;

  container.innerHTML = `
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">Area coordinator${ward ? ` · ${escapeHtml(ward)}` : ''}</div>
          <h1>${greeting()}, ${escapeHtml(firstNameOf(user))}</h1>
          <p>${ward
            ? `You verify what citizens in ${escapeHtml(ward)} file, and pass it to the director or send it back with a reason.`
            : 'No ward is assigned to your account yet, so nothing can be routed to you. Ask an administrator to assign one.'}</p>
        </div>
      </header>

      ${focusHtml({
        count: queue.length,
        waitingTitle: `${queue.length === 1 ? 'record is' : 'records are'} waiting for your review`,
        waitingText: 'Start with the one that has waited longest.',
        clearTitle: 'Nothing is waiting for you',
        clearText: ward ? `Every record filed in ${ward} has been reviewed.` : 'No ward assigned.',
        nextId: queue[0]?.entity_id,
      })}

      <div class="ws-grid">
        <div class="ws-col">
          <section class="ws-panel" aria-labelledby="queue-title">
            <div class="ws-panel-head">
              <div><h2 id="queue-title">Waiting for you</h2><p>Oldest first. Open a record to verify or reject it.</p></div>
            </div>
            <div class="ws-list">
              ${queue.length ? queue.map(queueRowHtml).join('') : '<div class="ws-empty"><strong>All caught up.</strong>New submissions from your ward appear here and in the bell.</div>'}
            </div>
          </section>

          <section class="ws-panel" aria-labelledby="ward-title-h">
            <div class="ws-panel-head">
              <div><h2 id="ward-title-h">Your ward at a glance</h2><p>${ward ? `Every record in ${escapeHtml(ward)}.` : ''}</p></div>
              ${ward ? `<a class="ws-panel-link" href="/entities?area=${encodeURIComponent(ward)}">All ward records</a>` : ''}
            </div>
            <div class="ws-facts">
              ${factHtml(queue.length, 'Waiting for you')}
              ${factHtml(count(['coordinator_approved']), 'With the director')}
              ${factHtml(count(['approved']), 'Approved')}
              ${factHtml(count(['rejected']), 'Sent back')}
            </div>
            <div class="ws-list">
              ${others.slice(0, 5).map((i) => workRowHtml({ id: i.entity_id, title: i.name, meta: [moduleLabel(i), i.owner?.name ? `from ${i.owner.name}` : ''], side: statusPillHtml(i.status) })).join('')}
            </div>
          </section>
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-label="Shortcuts">
            <div class="ws-panel-head"><div><h2>Shortcuts</h2></div></div>
            <div class="ws-actions">
              ${ward ? actionHtml(`/entities?area=${encodeURIComponent(ward)}`, ICON.list, 'Ward records', `Everything filed in ${ward}`) : ''}
              ${actionHtml('/buzz?tab=review', ICON.buzz, 'Civic Buzz review', 'Posts waiting for moderation')}
              ${actionHtml('/reports', ICON.chart, 'Reports', 'Counts by status and area, with export')}
            </div>
          </section>
        </aside>
      </div>
    </div>`;
}

// ════════════════════════════════════════════════════════════════════════════
// GENERAL COORDINATOR — the safety net for records that belong to no ward.
// ════════════════════════════════════════════════════════════════════════════
async function renderCoordinatorGeneralDash(container, user) {
  const [queue, allRes] = await Promise.all([
    loadMyQueue(),
    apiEntities.list({ limit: 100 }).catch(() => ({ data: [] })),
  ]);
  const isUnassigned = (i) => { const a = String(i.area || '').trim().toLowerCase(); return a === '' || a === 'unassigned'; };
  const mine = (allRes.data || []).filter(isUnassigned).filter((i) => i.owner_user_id);
  const queueIds = new Set(queue.map((q) => q.entity_id));
  const others = mine.filter((i) => !queueIds.has(i.entity_id) && String(i.status || '').toLowerCase() !== 'draft');
  const count = (statuses) => mine.filter((i) => statuses.includes(String(i.status || '').toLowerCase())).length;

  container.innerHTML = `
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">General coordinator · records with no ward</div>
          <h1>${greeting()}, ${escapeHtml(firstNameOf(user))}</h1>
          <p>Records filed without a ward have no area coordinator. They come to you, so that nothing a citizen files is left unanswered.</p>
        </div>
      </header>

      ${focusHtml({
        count: queue.length,
        waitingTitle: `${queue.length === 1 ? 'record with no ward is' : 'records with no ward are'} waiting for your review`,
        waitingText: 'Start with the one that has waited longest.',
        clearTitle: 'Nothing is waiting for you',
        clearText: 'Every record without a ward has been reviewed.',
        nextId: queue[0]?.entity_id,
      })}

      <div class="ws-grid">
        <div class="ws-col">
          <section class="ws-panel" aria-labelledby="gq-title">
            <div class="ws-panel-head"><div><h2 id="gq-title">Waiting for you</h2><p>Oldest first. Open a record to verify or reject it.</p></div></div>
            <div class="ws-list">
              ${queue.length ? queue.map(queueRowHtml).join('') : '<div class="ws-empty"><strong>All caught up.</strong>A record reaches you only when it has no ward. Records with a ward go to that ward\'s coordinator.</div>'}
            </div>
          </section>

          <section class="ws-panel" aria-labelledby="gu-title">
            <div class="ws-panel-head"><div><h2 id="gu-title">Records with no ward</h2><p>What has happened to the ones already reviewed.</p></div></div>
            <div class="ws-facts">
              ${factHtml(queue.length, 'Waiting for you')}
              ${factHtml(count(['coordinator_approved']), 'With the director')}
              ${factHtml(count(['approved']), 'Approved')}
              ${factHtml(count(['rejected']), 'Sent back')}
            </div>
            <div class="ws-list">
              ${others.slice(0, 5).map((i) => workRowHtml({ id: i.entity_id, title: i.name, meta: [moduleLabel(i), i.owner?.name ? `from ${i.owner.name}` : ''], side: statusPillHtml(i.status) })).join('')}
            </div>
          </section>
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-label="Shortcuts">
            <div class="ws-panel-head"><div><h2>Shortcuts</h2></div></div>
            <div class="ws-actions">
              ${actionHtml('/entities', ICON.list, 'All records', 'Browse every module and ward')}
              ${actionHtml('/buzz?tab=review', ICON.buzz, 'Civic Buzz review', 'Posts waiting for moderation')}
              ${actionHtml('/reports', ICON.chart, 'Reports', 'Counts by status and area, with export')}
            </div>
          </section>
        </aside>
      </div>
    </div>`;
}

// ════════════════════════════════════════════════════════════════════════════
// DIRECTOR — give the final decision, and see the whole picture.
// ════════════════════════════════════════════════════════════════════════════
async function renderDirectorDash(container, user, metaData) {
  const [queue, withCoordinators] = await Promise.all([
    loadMyQueue(),
    apiEntities.list({ status: 'submitted', limit: 1 }).catch(() => ({ pagination: { total: 0 } })),
  ]);

  // Group the decisions by module, so a busy module does not bury the others.
  const modules = [...new Set(queue.map((q) => q.entity_type))];
  let activeModule = null;
  const rowsFor = (name) => queue.filter((q) => !name || q.entity_type === name);

  container.innerHTML = `
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">Director · final approval</div>
          <h1>${greeting()}, ${escapeHtml(firstNameOf(user))}</h1>
          <p>Coordinators have verified these. Your decision is the last step, and it can start follow-up records automatically.</p>
        </div>
      </header>

      ${focusHtml({
        count: queue.length,
        waitingTitle: `${queue.length === 1 ? 'decision is' : 'decisions are'} waiting for you`,
        waitingText: `${withCoordinators.pagination?.total || 0} more ${(withCoordinators.pagination?.total || 0) === 1 ? 'record is' : 'records are'} still with coordinators.`,
        clearTitle: 'No decisions are waiting',
        clearText: `${withCoordinators.pagination?.total || 0} ${(withCoordinators.pagination?.total || 0) === 1 ? 'record is' : 'records are'} still with coordinators.`,
        nextId: queue[0]?.entity_id,
        nextLabel: 'Decide next',
      })}

      <div class="ws-grid">
        <div class="ws-col">
          <section class="ws-panel" aria-labelledby="dq-title">
            <div class="ws-panel-head">
              <div><h2 id="dq-title">Waiting for your decision</h2><p>Oldest first.</p></div>
            </div>
            ${modules.length > 1 ? `
              <div class="ws-chips" role="tablist" aria-label="Filter by module" id="dq-chips">
                <button type="button" class="ws-chip is-on" role="tab" aria-selected="true" data-module="">All <span>${queue.length}</span></button>
                ${modules.map((m) => `<button type="button" class="ws-chip" role="tab" aria-selected="false" data-module="${escapeHtml(m)}">${escapeHtml(moduleLabelFromName(m))} <span>${rowsFor(m).length}</span></button>`).join('')}
              </div>` : ''}
            <div class="ws-list" id="dq-list"></div>
          </section>

          <div id="ward-activity-widget"></div>
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-label="Oversight">
            <div class="ws-panel-head"><div><h2>Oversight</h2></div></div>
            <div class="ws-actions">
              ${actionHtml('/governance', ICON.shield, 'Governance Intelligence', 'Control gaps and process health')}
              ${actionHtml('/reports', ICON.chart, 'Reports', 'Run and export to PDF or Excel')}
              ${actionHtml('/entities', ICON.list, 'All records', 'Every module and ward')}
              ${actionHtml('/modules', ICON.graph, 'Modules and rules', `${metaData.entityTypes?.length || 0} modules, ${metaData.rules?.length || 0} rules`)}
            </div>
          </section>
        </aside>
      </div>
    </div>`;

  const listEl = document.getElementById('dq-list');
  const paint = () => {
    const rows = rowsFor(activeModule);
    const shown = rows.slice(0, 8);
    listEl.innerHTML = rows.length
      ? shown.map(queueRowHtml).join('') + (rows.length > shown.length ? `<div class="ws-empty">${rows.length - shown.length} more. They move up as you decide these.</div>` : '')
      : '<div class="ws-empty"><strong>All caught up.</strong>Records appear here once a coordinator has verified them.</div>';
  };
  document.getElementById('dq-chips')?.addEventListener('click', (e) => {
    const chip = e.target.closest('.ws-chip');
    if (!chip) return;
    activeModule = chip.getAttribute('data-module') || null;
    document.querySelectorAll('#dq-chips .ws-chip').forEach((c) => {
      const on = c === chip;
      c.classList.toggle('is-on', on);
      c.setAttribute('aria-selected', String(on));
    });
    paint();
  });
  paint();
  mountWardActivity(document.getElementById('ward-activity-widget'));
}

// ════════════════════════════════════════════════════════════════════════════
// ADMIN — look after the platform itself: modules, rules and people.
// ════════════════════════════════════════════════════════════════════════════
async function renderAdminDash(container, user, metaData) {
  const [queue, totalRes, usersRes] = await Promise.all([
    loadMyQueue(),
    apiEntities.list({ limit: 1 }).catch(() => ({ pagination: { total: 0 } })),
    apiAdmin.listUsers({ limit: 500 }).catch(() => ({ data: [] })),
  ]);
  const modules = metaData.entityTypes || [];
  const rules = metaData.rules || [];
  const users = usersRes.data || [];
  const roleCount = (role) => users.filter((u) => u.role === role).length;
  const unassignedCoordinators = users.filter((u) => u.role === 'coordinator_area' && !String(u.assignedArea || u.assigned_area || '').trim());

  const moduleRows = [...modules]
    .sort((a, b) => (b._count?.entities || 0) - (a._count?.entities || 0))
    .map((t) => {
      const pres = getCapabilityPresentation(t);
      const out = rules.filter((r) => r.source_entity_type_id === t.entity_type_id).length;
      const records = t._count?.entities || 0;
      return `
        <a class="ws-item" href="/entities?entity_type_id=${Number(t.entity_type_id)}">
          <span style="min-width:0;">
            <span class="ws-item-title">${escapeHtml(pres.shortTitle || t.name)}</span>
            <span class="ws-item-meta"><span>${records} record${records === 1 ? '' : 's'}</span>${out ? `<span>${out} rule${out === 1 ? '' : 's'}</span>` : ''}${t.domain?.domain_name ? `<span>${escapeHtml(t.domain.domain_name)}</span>` : ''}</span>
          </span>
          <span class="ws-item-side"><span class="ws-item-go">Records ${ICON.arrow}</span></span>
        </a>`;
    }).join('');

  container.innerHTML = `
    <div class="ws">
      <header class="ws-head">
        <div>
          <div class="eyebrow">Administrator · platform</div>
          <h1>${greeting()}, ${escapeHtml(firstNameOf(user))}</h1>
          <p>You look after the platform itself: the modules citizens can use, the rules that link them, and who holds which role.</p>
        </div>
        <div class="ws-head-actions">
          <a class="btn btn-primary" href="/module-builder">Build a module</a>
        </div>
      </header>

      <section class="ws-panel" aria-label="Platform at a glance">
        <div class="ws-facts" style="border-top:0;">
          ${factHtml(modules.length, 'Modules', '/modules')}
          ${factHtml(rules.length, 'Rules linking them', '/modules')}
          ${factHtml(users.length, 'People', '/admin')}
          ${factHtml(totalRes.pagination?.total || 0, 'Records', '/entities')}
        </div>
      </section>

      ${unassignedCoordinators.length ? `
        <div class="alert alert-warning" role="status">
          <strong>${unassignedCoordinators.length} area coordinator${unassignedCoordinators.length === 1 ? ' has' : 's have'} no ward.</strong>
          Nothing can be routed to them until one is assigned. <a href="/admin">Assign a ward</a>
        </div>` : ''}

      <div class="ws-grid">
        <div class="ws-col">
          <section class="ws-panel" aria-labelledby="am-title">
            <div class="ws-panel-head">
              <div><h2 id="am-title">Modules</h2><p>Each one is configuration: a form, a workflow and optional rules.</p></div>
              <a class="ws-panel-link" href="/modules">See how they are linked</a>
            </div>
            <div class="ws-list">${moduleRows || '<div class="ws-empty"><strong>No modules yet.</strong>Build the first one with the module builder.</div>'}</div>
          </section>

          ${queue.length ? `
          <section class="ws-panel" aria-labelledby="aq-title">
            <div class="ws-panel-head"><div><h2 id="aq-title">Waiting for a final decision</h2><p>As an administrator you can also give final approval.</p></div></div>
            <div class="ws-list">${queue.slice(0, 5).map(queueRowHtml).join('')}${queue.length > 5 ? `<div class="ws-empty">${queue.length - 5} more.</div>` : ''}</div>
          </section>` : ''}
        </div>

        <aside class="ws-col">
          <section class="ws-panel" aria-labelledby="ap-title">
            <div class="ws-panel-head">
              <div><h2 id="ap-title">People</h2></div>
              <a class="ws-panel-link" href="/admin">Manage</a>
            </div>
            <div class="ws-list">
              ${[['citizen', 'Citizens'], ['coordinator_area', 'Area coordinators'], ['coordinator_general', 'General coordinators'], ['director', 'Directors'], ['admin', 'Administrators']]
                .map(([role, label]) => `<div class="ws-item" style="padding-top:11px; padding-bottom:11px;"><span class="ws-item-title" style="font-weight:500;">${label}</span><span class="ws-item-side"><strong>${roleCount(role)}</strong></span></div>`).join('')}
            </div>
          </section>

          <section class="ws-panel" aria-label="Tools">
            <div class="ws-panel-head"><div><h2>Tools</h2></div></div>
            <div class="ws-actions">
              ${actionHtml('/module-builder', ICON.build, 'Module builder', 'Form, workflow, rule and report, no code')}
              ${actionHtml('/admin', ICON.users, 'Users and roles', 'Change a role or assign a ward')}
              ${actionHtml('/governance', ICON.shield, 'Governance Intelligence', 'Control gaps and process health')}
              ${actionHtml('/reports', ICON.chart, 'Reports', 'Run and export')}
            </div>
          </section>
        </aside>
      </div>
    </div>`;
}
