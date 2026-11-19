/**
 * CIVIC-KALKI — edit the civic assistant's summary before sending.
 *
 * The server sends, with each summary, the list of things the citizen may change
 * (`editable`: key, label, value, type, options, optional). This draws one input
 * per item and collects only what was changed. The server checks every value
 * again, exactly like an answer typed in the chat. Used by both chat screens.
 */

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function ensureStyles() {
  if (document.getElementById('summary-editor-styles')) return;
  const style = document.createElement('style');
  style.id = 'summary-editor-styles';
  // Works on the light chat page and on the dark home card alike.
  style.textContent = `
    .summary-editor { display:flex; flex-direction:column; gap:10px; margin:6px 0 12px; }
    .summary-editor label { display:flex; flex-direction:column; gap:4px; font-size:0.78rem; font-weight:600; opacity:0.85; }
    .summary-editor .se-input { width:100%; box-sizing:border-box; padding:8px 10px; border-radius:8px; font:inherit; font-size:0.875rem;
      color:inherit; background:rgba(127,127,127,0.08); border:1px solid rgba(127,127,127,0.45); }
    .summary-editor .se-input:focus { outline:2px solid rgba(127,127,127,0.6); outline-offset:1px; }
    .summary-editor select.se-input option { color:#111; }
    .summary-editor textarea.se-input { min-height:72px; resize:vertical; }
    .summary-editor .se-hint { font-weight:400; opacity:0.7; }
    /* On the dark home card: light text and fields that stand out. */
    .ck-dark-confirm-card .summary-editor label { color:rgba(255,255,255,0.88); opacity:1; }
    .ck-dark-confirm-card .summary-editor .se-input { color:#fff; background:rgba(255,255,255,0.07); border-color:rgba(255,255,255,0.28); }
    .ck-dark-confirm-card .summary-editor .se-input:focus { outline-color:rgba(255,255,255,0.55); }
    .ck-dark-confirm-card .summary-editor input[type="date"].se-input { color-scheme:dark; }
    /* On the light chat page: the page's own text colours. */
    .agent-confirm-card .summary-editor label { color:var(--text-secondary, #45525b); opacity:1; }
    .agent-confirm-card .summary-editor .se-input { color:var(--text-primary, #14212b); background:var(--surface, #fff); border-color:var(--border-strong, #d3ccc0); }
    /* Parts of the summary card that are switched off while editing (their own CSS sets display). */
    .agent-confirm-card [hidden], .ck-dark-confirm-card [hidden] { display:none !important; }
  `;
  document.head.appendChild(style);
}

function inputFor(item) {
  const common = `class="se-input" data-key="${esc(item.key)}" data-original="${esc(item.value)}" data-label="${esc(item.label)}"`;
  if (item.type === 'choice' && Array.isArray(item.options) && item.options.length) {
    const opts = item.options.map((o) => `<option value="${esc(o)}" ${String(o) === String(item.value) ? 'selected' : ''}>${esc(o)}</option>`).join('');
    const blank = item.optional || !item.value ? `<option value="" ${item.value ? '' : 'selected'}>${item.optional ? 'Not given' : 'Choose…'}</option>` : '';
    return `<select ${common}>${blank}${opts}</select>`;
  }
  if (item.type === 'longtext') return `<textarea ${common} maxlength="2000">${esc(item.value)}</textarea>`;
  const type = { date: 'date', number: 'number', phone: 'tel', email: 'email' }[item.type] || 'text';
  const max = item.max ? ` maxlength="${Number(item.max)}"` : ' maxlength="2000"';
  return `<input type="${type}" ${common} value="${esc(item.value)}"${type === 'text' || type === 'tel' || type === 'email' ? max : ''}>`;
}

/** The editing form for a summary. */
export function renderSummaryEditor(editable) {
  ensureStyles();
  const items = Array.isArray(editable) ? editable : [];
  return `
    <div class="summary-editor" role="group" aria-label="Edit the details before sending">
      ${items.map((item) => `
        <label>
          <span>${esc(item.label)}${item.optional ? ' <span class="se-hint">(optional)</span>' : ''}</span>
          ${inputFor(item)}
        </label>`).join('')}
    </div>`;
}

/**
 * What was changed in an editor: `edits` for the server ({ key: value }) and
 * `changes` for a readable line in the chat.
 */
export function collectEdits(container) {
  const edits = {};
  const changes = [];
  container.querySelectorAll('.se-input[data-key]').forEach((el) => {
    const value = String(el.value ?? '').trim();
    const original = String(el.getAttribute('data-original') ?? '').trim();
    if (value === original) return;
    edits[el.getAttribute('data-key')] = value;
    changes.push(`${el.getAttribute('data-label')}: ${value || '(removed)'}`);
  });
  return { edits, changes };
}
