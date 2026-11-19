import { requireAuth, getUser } from '../auth.js';
import { renderLayout, attachLayoutEvents } from '../components/layout.js';
import { entities as apiEntities, forms as apiForms } from '../api.js';
import { renderRuleGraph } from '../components/ruleGraph.js';
import { toastError, toastSuccess } from '../components/toast.js';
import { navigate } from '../router.js';
import { getCapabilityPresentation, capabilityIcon } from '../utils/terminology.js';

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, c =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])
  );
}

export async function renderModules() {
  if (!requireAuth(navigate)) return;

  const app = document.getElementById('app');
  app.innerHTML = renderLayout(`
    <div class="page-header mb-6">
      <div class="page-header-left">
        <h1>Modules</h1>
        <p>Explore all available civic operations, initiatives, and request modules.</p>
      </div>
    </div>
    <div id="modules-container">
      <div class="loading-overlay"><div class="spinner spinner-lg"></div></div>
    </div>
  `, 'Modules');
  attachLayoutEvents();

  try {
    const typesRes = await apiEntities.listTypes().catch(() => ({ data: [] }));
    const entityTypes = typesRes.data || [];

    app.innerHTML = renderLayout(`
      <div class="page-header mb-6">
        <div class="page-header-left">
          <h1>Modules</h1>
          <p style="color:var(--text-secondary); margin-top:2px;">
            Select a civic capability to initiate requests, grievances, community initiatives, or civic actions.
          </p>
        </div>
      </div>

      <div id="modules-container"></div>
      <div id="assistant-settings-panel"></div>
      <div id="rule-graph-container"></div>
    `, 'Modules', entityTypes);
    attachLayoutEvents();

    renderCapabilityDirectory(document.getElementById('modules-container'), entityTypes);

    // Rule and dependency graph, drawn from the same metadata the engine runs on.
    const graphEl = document.getElementById('rule-graph-container');
    try {
      const metaRes = await apiForms.getMetadata();
      renderRuleGraph(graphEl, metaRes.data);
    } catch (graphErr) {
      graphEl.innerHTML = '<div class="alert alert-error" style="margin-top:24px;">The module link diagram could not be loaded.</div>';
    }
  } catch (err) {
    toastError('Failed to load civic capabilities');
    document.getElementById('modules-container').innerHTML = `
      <div class="alert alert-error">Unable to load capabilities catalog. Please try again.</div>
    `;
  }
}

function renderCapabilityDirectory(container, entityTypes) {
  if (!entityTypes || entityTypes.length === 0) {
    container.innerHTML = `
      <div class="card p-8 text-center" style="padding:48px 24px; text-align:center;">
        <div style="display:flex; align-items:center; justify-content:center; width:56px; height:56px; border-radius:50%; background:var(--gray-100); color:var(--text-muted); margin:0 auto 12px;">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <h3 style="font-size:1.15rem; font-weight:600; margin-bottom:6px; color:var(--text-primary);">No capabilities configured</h3>
        <p style="font-size:0.875rem; color:var(--text-muted); max-width:400px; margin:0 auto;">
          Administrators can publish new civic capabilities using the No-Code Module Builder.
        </p>
      </div>
    `;
    return;
  }

  const cardsHTML = entityTypes.map(t => {
    const pres = getCapabilityPresentation(t);
    const count = t._count?.entities || 0;

    return `
      <div class="card capability-card" style="padding:24px; border-top:3px solid rgba(var(--primary-rgb), 0.45); display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--shadow-xs);">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <div style="display:flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:12px; background:rgba(var(--primary-rgb), 0.12); color:var(--primary);">
              ${capabilityIcon(pres.iconKey, 24)}
            </div>
            <span class="badge badge-secondary" style="font-size:11px;">${count} Active Cases</span>
          </div>

          <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--primary); margin-bottom:4px;">
            ${escapeHtml(pres.category)}
          </div>

          <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin-bottom:8px;">
            ${escapeHtml(pres.title)}
          </h3>

          <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:20px; line-height:1.5;">
            ${escapeHtml(pres.description)}
          </p>
        </div>

        <div style="display:flex; gap:10px; padding-top:16px; border-top:1px solid var(--border);">
          <a href="/entities?entity_type_id=${t.entity_type_id}" class="btn btn-secondary" style="flex:1; text-align:center; font-size:0.85rem;">
            Explore Cases
          </a>
          <a href="/entities/new?entity_type_id=${t.entity_type_id}" class="btn btn-translucent-orange" style="flex:1; text-align:center; font-size:0.85rem;">
            ${escapeHtml(pres.actionLabel)} →
          </a>
        </div>
        ${canEditAssistant() ? `
        <button type="button" class="btn btn-ghost btn-sm" data-assistant-settings="${t.entity_type_id}" style="margin-top:10px; align-self:flex-start; font-size:0.8rem;">
          Assistant settings
        </button>` : ''}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:24px;">
      ${cardsHTML}
    </div>
  `;
  container.querySelectorAll('[data-assistant-settings]').forEach((btn) => {
    btn.addEventListener('click', () => openAssistantSettings(Number(btn.getAttribute('data-assistant-settings'))));
  });
}

// ── Civic assistant settings (admin, director) ───────────────────────────────

const ROLE_LABELS = {
  '': 'None',
  description: 'The problem in their words',
  severity: 'How serious (the resident decides)',
  person_name: "The resident's name",
  contact_phone: 'Call-back number',
  photo: 'Photo of the problem',
};

function canEditAssistant() {
  const role = (getUser() || {}).role;
  return role === 'admin' || role === 'director';
}

async function openAssistantSettings(entityTypeId) {
  const panel = document.getElementById('assistant-settings-panel');
  if (!panel) return;
  panel.innerHTML = '<div class="card" style="margin-top:24px; padding:24px;"><div class="spinner"></div></div>';
  let data;
  try {
    data = (await apiForms.getAssistant(entityTypeId)).data;
  } catch (err) {
    panel.innerHTML = '';
    toastError('Could not load the assistant settings for this module.');
    return;
  }
  const typeFits = (role, fieldType) => !role || (data.role_types[role] || []).includes(String(fieldType || 'text').toLowerCase());
  const rows = data.fields.map((f) => {
    const chat = f.chat || {};
    const roleOptions = ['', ...data.roles].filter((r) => typeFits(r, f.field_type))
      .map((r) => `<option value="${r}" ${String(chat.role || '') === r ? 'selected' : ''}>${escapeHtml(ROLE_LABELS[r] || r)}</option>`).join('');
    const isFile = ['file', 'upload', 'image', 'attachment'].includes(String(f.field_type).toLowerCase());
    return `
      <tr data-param="${f.parameter_id}">
        <td style="padding:8px; vertical-align:top;"><strong>${escapeHtml(f.label)}</strong><div style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(f.field_type || 'text')}${f.mandatory ? ' · required' : ''}</div></td>
        <td style="padding:8px; vertical-align:top;"><select class="form-control" data-k="role">${roleOptions}</select></td>
        <td style="padding:8px; vertical-align:top; text-align:center;">${f.mandatory || isFile ? '<span style="font-size:0.75rem; color:var(--text-muted);">' + (f.mandatory ? 'always' : '—') + '</span>' : `<input type="checkbox" data-k="ask" ${chat.ask ? 'checked' : ''} aria-label="Ask ${escapeHtml(f.label)} in chat">`}</td>
        <td style="padding:8px; vertical-align:top;">${isFile ? '' : `<input type="text" class="form-control" data-k="question" maxlength="300" value="${escapeHtml(chat.question || '')}" placeholder="Default wording">`}</td>
        <td style="padding:8px; vertical-align:top; width:80px;">${f.mandatory || isFile ? '' : `<input type="number" class="form-control" data-k="order" min="0" max="999" value="${chat.order ?? ''}" aria-label="Order">`}</td>
      </tr>`;
  }).join('');

  panel.innerHTML = `
    <div class="card" style="margin-top:24px;">
      <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div class="card-title">Assistant settings: ${escapeHtml(data.name)}</div>
          <div class="card-subtitle">What the civic assistant asks for this module. Changes apply to new conversations at once.</div>
        </div>
        <button type="button" class="btn btn-ghost btn-sm" id="assistant-close">Close</button>
      </div>
      <div class="card-body">
        <div style="display:flex; gap:18px; flex-wrap:wrap; margin-bottom:16px; font-size:0.9rem;">
          <span style="font-weight:600;">Also ask for:</span>
          <label style="display:flex; gap:6px; align-items:center;"><input type="checkbox" id="ask-area" ${data.asks.ask_area ? 'checked' : ''}> The area (ward)</label>
          <label style="display:flex; gap:6px; align-items:center;"><input type="checkbox" id="ask-spot" ${data.asks.ask_spot ? 'checked' : ''}> The exact spot</label>
          <label style="display:flex; gap:6px; align-items:center;"><input type="checkbox" id="ask-photo" ${data.asks.ask_photo ? 'checked' : ''}> A photo</label>
        </div>
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:0.875rem;">
            <thead><tr style="text-align:left; border-bottom:1px solid var(--border);">
              <th style="padding:8px;">Field</th><th style="padding:8px;">This field is</th><th style="padding:8px;">Ask in chat</th><th style="padding:8px;">How the assistant asks it</th><th style="padding:8px;">Order</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div style="display:flex; gap:10px; margin-top:16px;">
          <button type="button" class="btn btn-primary" id="assistant-save">Save settings</button>
        </div>
      </div>
    </div>`;
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });

  document.getElementById('assistant-close').addEventListener('click', () => { panel.innerHTML = ''; });
  document.getElementById('assistant-save').addEventListener('click', async () => {
    const fields = [...panel.querySelectorAll('tr[data-param]')].map((tr) => {
      const get = (k) => tr.querySelector(`[data-k="${k}"]`);
      const chat = {};
      if (get('role') && get('role').value) chat.role = get('role').value;
      if (get('ask') && get('ask').checked) chat.ask = true;
      if (get('question') && get('question').value.trim()) chat.question = get('question').value.trim();
      if (get('order') && get('order').value !== '') chat.order = Number(get('order').value);
      return { parameter_id: Number(tr.getAttribute('data-param')), chat: Object.keys(chat).length ? chat : null };
    });
    const asks = {
      ask_area: document.getElementById('ask-area').checked,
      ask_spot: document.getElementById('ask-spot').checked,
      ask_photo: document.getElementById('ask-photo').checked,
    };
    try {
      await apiForms.saveAssistant(entityTypeId, { fields, asks });
      toastSuccess('Assistant settings saved.');
    } catch (err) {
      toastError(err.message || 'Could not save the assistant settings.');
    }
  });
}
