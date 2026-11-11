/**
 * CIVIC-KALKI — header notification bell.
 *
 * Shows the signed-in user's feed from GET /entities/notifications, which the
 * server derives from the audit trail and workflow metadata. Nothing is stored
 * on the server; "unread" is simply "newer than the last time this user opened
 * the bell on this browser".
 */

import { entities as apiEntities } from '../api.js';
import { getUser } from '../auth.js';
import { navigate } from '../router.js';

const REFRESH_MS = 30000;
let refreshTimer = null;
let outsideClickHandler = null;

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function seenKey() {
  const user = getUser();
  return `ck_notifications_seen_${user ? user.user_id : 'anon'}`;
}

function lastSeen() {
  try { return Number(localStorage.getItem(seenKey())) || 0; } catch { return 0; }
}

function markSeen(timestamp) {
  try { localStorage.setItem(seenKey(), String(timestamp)); } catch { /* storage unavailable */ }
}

function timeAgo(iso) {
  const seconds = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} h ago`;
  return new Date(iso).toLocaleDateString();
}

const KIND_LABEL = { queue: 'Needs your review', status: 'Status change', linked: 'Linked record' };

export function renderNotificationBell() {
  return `
    <div class="notif-container">
      <button class="notif-bell-btn" id="notif-bell-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Notifications">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0m6 0H9"/></svg>
        <span class="notif-count" id="notif-count" hidden></span>
      </button>
      <div class="notif-panel" id="notif-panel" role="region" aria-label="Notifications">
        <div class="notif-panel-header">Notifications</div>
        <div class="notif-list" id="notif-list" aria-live="polite">
          <div class="notif-empty">Loading…</div>
        </div>
      </div>
    </div>
  `;
}

function renderItems(items, seenAt) {
  if (!items.length) return '<div class="notif-empty">Nothing yet. Status changes and records waiting for you appear here.</div>';
  return items.map((n) => {
    const unread = new Date(n.datetime).getTime() > seenAt;
    return `
      <button type="button" class="notif-item${unread ? ' unread' : ''}" data-entity-id="${Number(n.entity_id)}">
        <span class="notif-kind notif-kind-${escapeHtml(n.kind)}">${escapeHtml(KIND_LABEL[n.kind] || 'Update')}</span>
        <span class="notif-message">${escapeHtml(n.message)}</span>
        <span class="notif-meta">${escapeHtml(n.actor ? `${n.actor} · ` : '')}${escapeHtml(timeAgo(n.datetime))}</span>
      </button>`;
  }).join('');
}

export function attachNotificationBell() {
  const btn = document.getElementById('notif-bell-btn');
  const panel = document.getElementById('notif-panel');
  const list = document.getElementById('notif-list');
  const count = document.getElementById('notif-count');
  if (!btn || !panel || !list || !count) return;

  let items = [];

  const paint = () => {
    const seenAt = lastSeen();
    const unread = items.filter((n) => new Date(n.datetime).getTime() > seenAt).length;
    count.textContent = unread > 9 ? '9+' : String(unread);
    count.hidden = unread === 0;
    btn.setAttribute('aria-label', unread ? `Notifications, ${unread} new` : 'Notifications');
    list.innerHTML = renderItems(items, seenAt);
  };

  const load = async () => {
    if (!document.body.contains(btn)) return; // the layout was re-rendered
    try {
      const res = await apiEntities.notifications();
      items = Array.isArray(res.data) ? res.data : [];
      paint();
    } catch {
      list.innerHTML = '<div class="notif-empty">Notifications could not be loaded.</div>';
    }
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = panel.classList.toggle('show');
    btn.setAttribute('aria-expanded', String(open));
    if (open) {
      // Keep the "new" highlight for this viewing; clear the counter.
      const newest = items.length ? new Date(items[0].datetime).getTime() : Date.now();
      list.innerHTML = renderItems(items, lastSeen());
      markSeen(Math.max(newest, lastSeen()));
      count.hidden = true;
    }
  });

  list.addEventListener('click', (e) => {
    const item = e.target.closest('.notif-item');
    if (!item) return;
    panel.classList.remove('show');
    navigate(`/entities/${item.getAttribute('data-entity-id')}`);
  });

  // One outside-click handler and one timer, however often the layout re-renders.
  if (outsideClickHandler) document.removeEventListener('click', outsideClickHandler);
  outsideClickHandler = (e) => {
    const p = document.getElementById('notif-panel');
    const b = document.getElementById('notif-bell-btn');
    if (p && b && !p.contains(e.target) && !b.contains(e.target)) {
      p.classList.remove('show');
      b.setAttribute('aria-expanded', 'false');
    }
  };
  document.addEventListener('click', outsideClickHandler);

  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = setInterval(load, REFRESH_MS);
  load();
}
