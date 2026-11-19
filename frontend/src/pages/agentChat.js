/**
 * CIVIC-KALKI — Conversational Agent Chat Page (v2 — with Photo/Doc Upload)
 *
 * Route: /agent/chat?sessionId=<uuid>&message=<first message>
 *
 * Features:
 *  - Alternating user/agent bubbles with rich Markdown formatting
 *  - Multimodal doc and photo upload directly via chat input bar
 *  - Real-time attachment preview thumbnail and chip before sending
 *  - Agent AI vision extraction from uploaded photos (road damage, garbage, notice text, etc.)
 *  - Automatic binding of files to form parameters (photo_evidence, supporting_document)
 *  - Distinct confirmation card showing both text fields and attached files
 *  - Explicit Yes/No confirmation before submission (never auto-submits)
 *  - Success card with link to created entity
 *
 * Reuses: renderLayout, existing CSS variables, existing button classes
 */

import { requireAuth } from '../auth.js';
import { renderLayout, attachLayoutEvents } from '../components/layout.js';
import { agent as agentApi } from '../api.js';
import { getCurrentLanguage } from '../components/languageSelector.js';
import { getStoredLocation, requestLocation, storeLocation, isLocationDismissed, dismissLocation, formatLocationForAgent } from '../utils/locationService.js';
import { navigate } from '../router.js';

// ── State (per-page-load, not persistent) ────────────────────────────────────
let sessionId = null;
let isWaiting = false;         // prevent double-sends while agent is thinking
let pendingConfirmData = null; // holds summary when agent is waiting for yes/no
let pendingFile = null;        // File object waiting to be sent with message

// ── Utilities ─────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

/** Convert **bold** and \n to HTML */
function renderMarkdownLite(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function formatFileSize(bytes) {
  if (!bytes || isNaN(bytes)) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ── Message rendering ─────────────────────────────────────────────────────────

function renderUserBubble(text, attachment = null) {
  let attachmentHtml = '';
  if (attachment) {
    if (attachment.isImage && attachment.previewUrl) {
      attachmentHtml = `
        <div class="agent-user-attachment">
          <img src="${escapeHtml(attachment.previewUrl)}" alt="${escapeHtml(attachment.name)}" class="agent-attachment-thumb" />
          <div class="agent-attachment-meta">
            <span class="agent-attachment-name">📷 ${escapeHtml(attachment.name)}</span>
            <span class="agent-attachment-size">${escapeHtml(attachment.sizeStr)}</span>
          </div>
        </div>
      `;
    } else {
      attachmentHtml = `
        <div class="agent-user-attachment agent-attachment-doc">
          <span class="agent-attachment-icon">📄</span>
          <div class="agent-attachment-meta">
            <span class="agent-attachment-name">${escapeHtml(attachment.name)}</span>
            <span class="agent-attachment-size">${escapeHtml(attachment.sizeStr)}</span>
          </div>
        </div>
      `;
    }
  }

  const textHtml = text ? `<div class="agent-bubble-text">${escapeHtml(text)}</div>` : '';

  return `
    <div class="agent-msg-row agent-msg-user">
      <div class="agent-bubble agent-bubble-user">
        ${attachmentHtml}
        ${textHtml}
      </div>
    </div>
  `;
}

/** `voice` is 'ai' when the wording (not the question) was written by AI. */
function renderAgentBubble(text, voice = null) {
  return `
    <div class="agent-msg-row agent-msg-agent">
      <div class="agent-bubble-avatar" aria-hidden="true">
        <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      </div>
      <div class="agent-bubble agent-bubble-agent">${renderMarkdownLite(text)}${voice === 'ai'
        ? '<div class="assist-ai-note" title="The question is set by rules; AI only worded it.">AI-worded</div>' : ''}</div>
    </div>
  `;
}

/** Tappable answers under a question, when the assistant offers a short list. */
function renderQuickReplies(options) {
  if (!Array.isArray(options) || !options.length) return '';
  return `
    <div class="assist-chips" role="group" aria-label="Suggested answers">
      ${options.map((o) => `<button type="button" class="assist-chip" data-reply="${escapeHtml(o.value)}">${escapeHtml(o.label)}</button>`).join('')}
    </div>`;
}

function renderConfirmCard(summaryRows, confirmText) {
  const rows = Array.isArray(summaryRows)
    ? summaryRows.map(r => `
        <div class="agent-confirm-row ${r.isFile ? 'agent-confirm-file-row' : ''}">
          <span class="agent-confirm-label">${escapeHtml(r.label)}</span>
          <span class="agent-confirm-value">${escapeHtml(r.value)}</span>
        </div>`).join('')
    : '';

  const intro = confirmText
    ? `<p style="color:var(--text-secondary); font-size:0.875rem; margin-bottom:12px;">${renderMarkdownLite(confirmText.split('\n\n')[0])}</p>`
    : '';

  return `
    <div class="agent-msg-row agent-msg-agent">
      <div class="agent-bubble-avatar" aria-hidden="true">
        <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <div class="agent-confirm-card">
        <div class="agent-confirm-title">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--primary);flex-shrink:0;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          Ready to send. Is this right?
        </div>
        ${intro}
        <div class="agent-confirm-table">${rows}</div>
        <div class="agent-confirm-note">Nothing is sent until you say so.</div>
        <div class="agent-confirm-actions" id="agent-confirm-btns">
          <button id="agent-submit-btn" class="btn btn-primary" style="min-width:120px;">
            Send it
          </button>
          <button id="agent-change-btn" class="btn btn-secondary" type="button">Change something</button>
          <button id="agent-cancel-btn" class="btn btn-ghost" type="button">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

function renderSuccessCard(data) {
  const files = Array.isArray(data.files) && data.files.length
    ? `<div class="assist-success-meta">Attached: ${data.files.map(escapeHtml).join(', ')}</div>` : '';
  // The assistant's own words say who looks at it next; the first line (the reference) is shown above.
  const next = String(data.text || '').split('\n').slice(1).join('\n').trim();
  return `
    <div class="agent-msg-row agent-msg-agent">
      <div class="agent-bubble-avatar assist-avatar-done" aria-hidden="true">
        <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
      </div>
      <div class="agent-success-card" role="status">
        <div class="assist-success-title">Sent</div>
        <div class="assist-success-ref">${escapeHtml(data.reference || `#${data.entity_id}`)}</div>
        <div class="assist-success-name">${escapeHtml(data.entity_name || '')}</div>
        ${files}
        ${next ? `<p class="assist-success-next">${renderMarkdownLite(next)}</p>` : ''}
        <div class="assist-success-actions">
          <a href="/entities/${Number(data.entity_id)}" class="btn btn-sm btn-primary">Open my request</a>
          <button id="agent-new-request-btn" class="btn btn-sm btn-ghost" type="button">Something else</button>
        </div>
      </div>
    </div>
  `;
}

function renderThinkingBubble() {
  return `
    <div class="agent-msg-row agent-msg-agent" id="agent-thinking">
      <div class="agent-bubble-avatar" aria-hidden="true">
        <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      </div>
      <div class="agent-bubble agent-bubble-agent agent-thinking-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
}

// ── Thread management ─────────────────────────────────────────────────────────

// A reply the assistant already wrote in the citizen's language is left alone by
// the page translator (it would otherwise translate it a second time).
function inReplyLanguage(data, html) {
  return data && data.lang && data.lang !== 'en'
    ? `<div class="notranslate" style="display:contents" lang="${escapeHtml(data.lang)}">${html}</div>`
    : html;
}

function getThread() { return document.getElementById('agent-thread'); }
function getInput() { return document.getElementById('agent-input'); }
function getSendBtn() { return document.getElementById('agent-send-btn'); }
function getAttachBtn() { return document.getElementById('agent-attach-btn'); }
function getFileInput() { return document.getElementById('agent-file-input'); }
function getCameraInput() { return document.getElementById('agent-camera-input'); }

// ── Photos are shrunk in the browser before upload ────────────────────────────
// A phone photo is often 4–8 MB; the assistant only needs to see the problem.
// Larger than 1600 px on its long side, or bigger than 1 MB, becomes a JPEG at
// that size. If the browser cannot read the image, the original is sent.
const MAX_PHOTO_SIDE = 1600;
const SHRINK_ABOVE_BYTES = 1024 * 1024;
const SERVER_LIMIT_BYTES = 10 * 1024 * 1024;

async function shrinkPhoto(file) {
  if (!file || !/^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_PHOTO_SIDE / Math.max(bitmap.width, bitmap.height));
    const isJpeg = /jpe?g/i.test(file.type);
    if (scale === 1 && file.size <= SHRINK_ABOVE_BYTES && isJpeg) { bitmap.close?.(); return file; }
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
    if (!blob || (blob.size >= file.size && isJpeg)) return file;
    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], name, { type: 'image/jpeg', lastModified: Date.now() });
  } catch {
    return file;
  }
}

async function takeFile(file) {
  if (!file) return;
  const ready = await shrinkPhoto(file);
  if (ready.size > SERVER_LIMIT_BYTES) {
    appendHtml(renderAgentBubble('That file is larger than 10 MB, so I cannot take it. Please choose a smaller one.'));
    return;
  }
  pendingFile = ready;
  updateAttachmentPreview();
  getInput()?.focus();
}

// ── Live form card: what has been filled in so far ─────────────────────────────

function updateFormCard(progress) {
  const card = document.getElementById('agent-form-card');
  if (!card) return;
  if (!progress || !Array.isArray(progress.rows)) {
    card.hidden = true;
    card.innerHTML = '';
    return;
  }
  const rows = progress.rows.map((r) => `
    <div class="agent-form-card-row"><span>${escapeHtml(r.label)}</span><strong>${escapeHtml(r.value)}</strong></div>`).join('');
  const left = Number(progress.remaining) || 0;
  card.innerHTML = `
    <div class="agent-form-card-head">
      <span>${escapeHtml(progress.service || 'Your request')}</span>
      <span class="agent-form-card-left">${left === 0 ? 'Ready to check' : `${left} more to go`}</span>
    </div>
    <div class="agent-form-card-rows">${rows}</div>`;
  card.hidden = false;
}

function appendHtml(html) {
  getThread()?.querySelectorAll('.assist-chips').forEach((el) => el.remove());
  const thread = getThread();
  if (!thread) return;
  const temp = document.createElement('div');
  temp.innerHTML = html;
  while (temp.firstChild) thread.appendChild(temp.firstChild);
  thread.scrollTop = thread.scrollHeight;
}

function removeThinking() {
  const el = document.getElementById('agent-thinking');
  if (el) el.remove();
}

function setInputEnabled(enabled) {
  const input = getInput();
  const sendBtn = getSendBtn();
  const attachBtn = getAttachBtn();
  if (input) input.disabled = !enabled;
  if (sendBtn) {
    sendBtn.disabled = !enabled;
    sendBtn.style.opacity = enabled ? '1' : '0.5';
  }
  for (const btn of [attachBtn, document.getElementById('agent-camera-btn')]) {
    if (!btn) continue;
    btn.disabled = !enabled;
    btn.style.opacity = enabled ? '1' : '0.5';
  }
}

// ── Attachment Preview Bar ────────────────────────────────────────────────────

function updateAttachmentPreview() {
  const bar = document.getElementById('agent-file-preview-bar');
  if (!bar) return;

  if (!pendingFile) {
    bar.innerHTML = '';
    bar.style.display = 'none';
    return;
  }

  const isImage = pendingFile.type.startsWith('image/');
  const previewUrl = isImage ? URL.createObjectURL(pendingFile) : null;

  bar.style.display = 'flex';
  bar.innerHTML = `
    <div class="agent-preview-chip">
      ${isImage ? `<img src="${previewUrl}" class="agent-preview-thumb" alt="Preview" />` : '<span class="agent-preview-icon">📄</span>'}
      <div class="agent-preview-info">
        <span class="agent-preview-filename">${escapeHtml(pendingFile.name)}</span>
        <span class="agent-preview-filesize">${formatFileSize(pendingFile.size)}</span>
      </div>
      <button type="button" id="agent-remove-file-btn" class="agent-preview-remove" title="Remove attachment" aria-label="Remove attachment">&times;</button>
    </div>
  `;

  document.getElementById('agent-remove-file-btn')?.addEventListener('click', () => {
    pendingFile = null;
    const fileInput = getFileInput();
    if (fileInput) fileInput.value = '';
    updateAttachmentPreview();
  });
}

// ── Core: send a message turn ─────────────────────────────────────────────────

async function sendMessage(message, explicitFile = null) {
  const fileToUpload = explicitFile || pendingFile;
  const cleanMsg = (message || '').trim();

  // If nothing to send, return
  if (isWaiting || (!cleanMsg && !fileToUpload)) return;
  isWaiting = true;

  // Build attachment metadata for user bubble
  let attachmentMeta = null;
  if (fileToUpload) {
    const isImage = fileToUpload.type.startsWith('image/');
    attachmentMeta = {
      name: fileToUpload.name,
      sizeStr: formatFileSize(fileToUpload.size),
      isImage,
      previewUrl: isImage ? URL.createObjectURL(fileToUpload) : null,
    };
  }

  // Clear input and pending file immediately
  const input = getInput();
  if (input) {
    input.value = '';
    input.style.height = 'auto';
  }
  pendingFile = null;
  const fileInput = getFileInput();
  if (fileInput) fileInput.value = '';
  updateAttachmentPreview();

  // Render user bubble with text and attachment
  appendHtml(renderUserBubble(cleanMsg || (fileToUpload ? `Uploaded: ${fileToUpload.name}` : ''), attachmentMeta));
  setInputEnabled(false);

  // Show thinking animation
  appendHtml(renderThinkingBubble());

  try {
    const _agentLoc = getStoredLocation();
    const _locPfx = formatLocationForAgent(_agentLoc);
    const res = await agentApi.chat(sessionId, _locPfx + cleanMsg, fileToUpload, getCurrentLanguage());
    removeThinking();

    const data = res.data;
    pendingConfirmData = null;
    if (data.progress) updateFormCard(data.progress);
    else if (['submitted', 'cancelled', 'status'].includes(data.type)) updateFormCard(null);

    if (data.type === 'confirm') {
      pendingConfirmData = data;
      appendHtml(inReplyLanguage(data, renderConfirmCard(data.summary || [], data.lead || 'Here is what I will send:')));

      // Wire confirm/cancel buttons
      setTimeout(() => {
        const submitBtn = document.getElementById('agent-submit-btn');
        const cancelBtn = document.getElementById('agent-cancel-btn');
        document.getElementById('agent-change-btn')?.addEventListener('click', () => {
          document.getElementById('agent-confirm-btns')?.remove();
          sendMessage('no');
        });

        if (submitBtn) {
          submitBtn.addEventListener('click', () => {
            document.getElementById('agent-confirm-btns')?.remove();
            sendMessage('yes');
          });
        }
        if (cancelBtn) {
          cancelBtn.addEventListener('click', () => {
            document.getElementById('agent-confirm-btns')?.remove();
            sendMessage('cancel');
          });
        }
      }, 50);
    } else if (data.type === 'submitted') {
      appendHtml(inReplyLanguage(data, renderSuccessCard(data)));
      setInputEnabled(false); // Finished

      setTimeout(() => {
        const newBtn = document.getElementById('agent-new-request-btn');
        if (newBtn) {
          newBtn.addEventListener('click', () => {
            navigate('/agent/chat');
          });
        }
      }, 50);
    } else {
      // question, status, guidance, unclear, cancelled, error
      appendHtml(inReplyLanguage(data, renderAgentBubble(data.text || 'Something went wrong. Please try again.', data.voice) + renderQuickReplies(data.options)));
    }
  } catch (err) {
    removeThinking();
    appendHtml(renderAgentBubble('Sorry, I could not reach the service just now. Nothing was sent. Please try again in a moment.'));
    console.error('[Agent Chat] Error:', err);
  } finally {
    isWaiting = false;
    if (document.getElementById('agent-input')) {
      setInputEnabled(true);
      const inEl = getInput();
      if (inEl && !inEl.disabled) inEl.focus();
    }
  }
}

// ── Page render ───────────────────────────────────────────────────────────────

export async function renderAgentChat(params = {}, searchParams = null) {
  if (!requireAuth(navigate)) return;

  // Reset page state
  sessionId = null;
  isWaiting = false;
  pendingConfirmData = null;
  pendingFile = null;

  const urlParams = searchParams || new URLSearchParams(window.location.search);
  const incomingSessionId = urlParams.get('sessionId');
  const firstMessage = urlParams.get('message');

  // Reuse incoming sessionId or generate fresh
  sessionId = incomingSessionId || ('ck-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9));

  const app = document.getElementById('app');
  app.innerHTML = renderLayout(`
    <style>
      /* ── Agent chat layout ── */
      .agent-chat-wrap {
        display: flex; flex-direction: column; height: calc(100vh - 140px);
        max-width: 780px; margin: 0 auto;
      }
      .agent-chat-header {
        display:flex; align-items:center; gap:12px;
        padding:16px 20px; background:var(--surface);
        border:1px solid var(--border); border-radius:12px 12px 0 0;
        border-bottom:none;
      }
      .agent-chat-avatar-wrap {
        width:38px;height:38px;border-radius:50%;
        background:linear-gradient(135deg,var(--primary),#e03c22);
        display:flex;align-items:center;justify-content:center;flex-shrink:0;
      }
      #agent-thread {
        flex:1; overflow-y:auto; padding:20px;
        background:var(--surface); border:1px solid var(--border);
        display:flex; flex-direction:column; gap:12px;
      }
      /* Input bar & Attachment preview */
      .agent-input-container {
        display: flex; flex-direction: column;
        background:var(--surface); border:1px solid var(--border);
        border-radius:0 0 12px 12px; border-top: 1px solid var(--border-strong);
      }
      .agent-file-preview-bar {
        display: none; padding: 8px 16px 0 16px;
      }
      .agent-preview-chip {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 5px 10px; background: var(--bg); border: 1px solid var(--border-strong);
        border-radius: 8px; font-size: 0.8rem;
      }
      .agent-preview-thumb {
        width: 28px; height: 28px; object-fit: cover; border-radius: 4px;
      }
      .agent-preview-icon { font-size: 1.1rem; }
      .agent-preview-info { display: flex; flex-direction: column; line-height: 1.2; }
      .agent-preview-filename { font-weight: 600; color: var(--text-primary); max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .agent-preview-filesize { font-size: 0.7rem; color: var(--text-muted); }
      .agent-preview-remove {
        background: none; border: none; font-size: 1rem; color: var(--text-muted);
        cursor: pointer; padding: 0 4px; line-height: 1;
      }
      .agent-preview-remove:hover { color: var(--red-600, #dc2626); }

      .agent-input-bar {
        display:flex; gap:8px; align-items:center;
        padding:12px 16px;
      }
      .agent-attach-btn {
        background: none; border: none; color: var(--text-secondary);
        cursor: pointer; padding: 8px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.2s, color 0.2s;
      }
      .agent-attach-btn:hover {
        background: var(--bg); color: var(--primary);
      }
      .agent-form-card {
        background: var(--surface-2, var(--surface)); border: 1px solid var(--border);
        border-top: none; padding: 10px 20px; font-size: 0.82rem;
      }
      .agent-form-card[hidden] { display: none; }
      .agent-form-card-head {
        display: flex; justify-content: space-between; gap: 12px;
        font-weight: 700; color: var(--text-primary); margin-bottom: 6px;
      }
      .agent-form-card-left { font-weight: 600; color: var(--primary); }
      .agent-form-card-rows { display: flex; flex-wrap: wrap; gap: 4px 18px; }
      .agent-form-card-row { display: flex; gap: 6px; min-width: 0; max-width: 100%; }
      .agent-form-card-row span { color: var(--text-muted); flex-shrink: 0; }
      .agent-form-card-row strong {
        font-weight: 600; color: var(--text-primary);
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 260px;
      }
      @media (max-width: 600px) {
        .agent-form-card { padding: 8px 14px; }
        .agent-form-card-rows { max-height: 64px; overflow-y: auto; }
        .agent-form-card-row strong { max-width: 200px; }
      }
      #agent-input {
        flex:1; padding:10px 14px; border-radius:20px;
        border:1px solid var(--border-strong); background:var(--bg);
        color:var(--text-primary); font-size:0.9rem; font-family:inherit;
        resize:none; outline:none; min-height:40px; max-height:120px;
        transition: border-color 0.2s;
      }
      #agent-input:focus { border-color:var(--primary); }

      /* Message rows */
      .agent-msg-row { display:flex; gap:8px; max-width:88%; }
      .agent-msg-user { align-self:flex-end; flex-direction:row-reverse; max-width:75%; }
      .agent-msg-agent { align-self:flex-start; }
      .agent-bubble {
        padding:10px 16px; border-radius:18px; font-size:0.875rem;
        line-height:1.55; word-break:break-word;
      }
      .agent-bubble-user {
        background:linear-gradient(135deg,var(--primary),#e03c22);
        color:white; border-bottom-right-radius:4px;
      }
      .agent-bubble-agent {
        background:var(--surface-2,#f9f9fb); color:var(--text-primary);
        border:1px solid var(--border); border-bottom-left-radius:4px;
      }
      .agent-bubble-avatar {
        width:28px;height:28px;border-radius:50%;flex-shrink:0;margin-top:2px;
        background:linear-gradient(135deg,var(--primary),#e03c22);
        display:flex;align-items:center;justify-content:center;
      }

      /* Attachment in bubble */
      .agent-user-attachment {
        display: flex; align-items: center; gap: 8px; margin-bottom: 6px;
        background: rgba(0,0,0,0.15); padding: 6px 10px; border-radius: 10px;
      }
      .agent-attachment-thumb {
        width: 48px; height: 48px; object-fit: cover; border-radius: 6px; border: 1px solid rgba(255,255,255,0.4);
      }
      .agent-attachment-icon { font-size: 1.5rem; }
      .agent-attachment-meta { display: flex; flex-direction: column; }
      .agent-attachment-name { font-weight: 600; font-size: 0.8rem; }
      .agent-attachment-size { font-size: 0.7rem; opacity: 0.85; }

      /* Thinking animation */
      .agent-thinking-dots { display:flex; gap:4px; padding:12px 16px; align-items:center; }
      .agent-thinking-dots span {
        width:7px;height:7px;background:var(--text-muted);border-radius:50%;
        animation:agent-dot-bounce 1.2s infinite ease-in-out;
      }
      .agent-thinking-dots span:nth-child(1){animation-delay:0s;}
      .agent-thinking-dots span:nth-child(2){animation-delay:0.2s;}
      .agent-thinking-dots span:nth-child(3){animation-delay:0.4s;}
      @keyframes agent-dot-bounce {
        0%,80%,100%{transform:scale(0.7);opacity:0.5;}
        40%{transform:scale(1);opacity:1;}
      }

      /* Confirm card */
      .agent-confirm-card {
        background:var(--surface); border:2px solid var(--primary);
        border-radius:12px; padding:18px 20px; max-width:480px;
      }
      .agent-confirm-title {
        font-weight:700; font-size:0.9rem; color:var(--text-primary);
        margin-bottom:12px; display:flex; align-items:center; gap:8px;
      }
      .agent-confirm-table { display:flex; flex-direction:column; gap:6px; }
      .agent-confirm-row {
        display:flex; gap:12px; font-size:0.83rem;
        padding:5px 0; border-bottom:1px solid var(--border);
      }
      .agent-confirm-file-row {
        background: rgba(var(--primary-rgb), 0.05); padding: 6px 8px; border-radius: 6px;
      }
      .agent-confirm-row:last-child { border-bottom:none; }
      .agent-confirm-label { font-weight:600; color:var(--text-secondary); min-width:130px; flex-shrink:0; }
      .agent-confirm-value { color:var(--text-primary); font-weight:500; }
      .agent-confirm-actions { display:flex; gap:10px; margin-top:16px; }

      /* Success card */
      .agent-success-card {
        background:var(--green-50,#f0fdf4); border:1px solid var(--green-200,#bbf7d0);
        border-radius:12px; padding:18px 20px; max-width:400px;
      }
    </style>

    <div class="agent-chat-wrap">
      <div class="agent-chat-header">
        <div class="agent-chat-avatar-wrap">
          <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>
        <div>
          <div style="font-weight:700; font-size:0.95rem;">Civic assistant</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">
            Say it in your own words. Nothing is sent until you confirm.
          </div>
        </div>
        <div style="margin-left:auto; display:flex; align-items:center; gap:8px;">
          <div id="agent-loc-status" style="display:none; font-size:0.72rem; color:var(--text-muted); align-items:center; gap:4px;">
            <svg width="11" height="11" fill="none" stroke="var(--primary)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span id="agent-loc-text"></span>
          </div>
          <button type="button" id="agent-loc-btn" class="btn btn-ghost btn-sm" title="Share your location for better help" style="font-size:0.72rem; padding:4px 10px; display:none;">
            📍 Share location
          </button>
          <a href="/dashboard" class="btn btn-ghost btn-sm">← Dashboard</a>
        </div>
      </div>

      <div id="agent-form-card" class="agent-form-card" hidden aria-live="polite" aria-label="Details filled in so far"></div>

      <div id="agent-thread" role="log" aria-live="polite" aria-label="Conversation with Civic Assistant">
        <!-- Initial greeting -->
        ${renderAgentBubble('Hi. Tell me what is going on, in your own words, for example **there is a pothole outside my building**. I will ask only what I need, read it back to you, and send it when you say yes. You can add a photo with the paperclip, or take one with the camera.')}
      </div>

      <div class="agent-input-container">
        <!-- Attachment preview chip -->
        <div id="agent-file-preview-bar" class="agent-file-preview-bar"></div>

        <div class="agent-input-bar">
          <button
            id="agent-attach-btn"
            type="button"
            class="agent-attach-btn"
            title="Attach photo or document evidence"
            aria-label="Attach photo or document evidence"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input
            type="file"
            id="agent-file-input"
            style="display:none;"
            accept="image/*,.pdf,.doc,.docx,.txt,.csv"
          />
          <button
            id="agent-camera-btn"
            type="button"
            class="agent-attach-btn"
            title="Take a photo"
            aria-label="Take a photo"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <circle cx="12" cy="13" r="3.5" stroke-width="2" />
            </svg>
          </button>
          <!-- capture opens the rear camera on phones; desktops show a file picker -->
          <input
            type="file"
            id="agent-camera-input"
            style="display:none;"
            accept="image/*"
            capture="environment"
          />

          <textarea
            id="agent-input"
            placeholder="Type your message or attach a photo…"
            rows="1"
            autocomplete="off"
            aria-label="Message to civic assistant"
          ></textarea>

          <button
            id="agent-send-btn"
            class="btn btn-primary"
            style="border-radius:20px; padding:10px 18px; white-space:nowrap;"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  `, 'Civic Assistant');
  attachLayoutEvents();

  // ── Location button wiring ────────────────────────────────────────────────
  const _locBtn    = document.getElementById('agent-loc-btn');
  const _locStatus = document.getElementById('agent-loc-status');
  const _locText   = document.getElementById('agent-loc-text');

  function _showLocStatus(loc) {
    if (_locStatus) { _locStatus.style.display = 'flex'; }
    if (_locText) _locText.textContent = loc.area;
    if (_locBtn) _locBtn.style.display = 'none';
  }

  const _initLoc = getStoredLocation();
  if (_initLoc) {
    _showLocStatus(_initLoc);
  } else if (!isLocationDismissed()) {
    if (_locBtn) _locBtn.style.display = '';
  }

  _locBtn?.addEventListener('click', async () => {
    if (_locBtn) { _locBtn.textContent = '⏳ Detecting…'; _locBtn.disabled = true; }
    try {
      const loc = await requestLocation();
      _showLocStatus(loc);
    } catch {
      if (_locBtn) { _locBtn.textContent = '📍 Share location'; _locBtn.disabled = false; }
    }
  });

  // ── Wire input events ──────────────────────────────────────────────────────
  const inputEl = document.getElementById('agent-input');
  const sendBtn = document.getElementById('agent-send-btn');
  const attachBtn = document.getElementById('agent-attach-btn');
  const fileInput = document.getElementById('agent-file-input');

  if (!inputEl || !sendBtn) return;

  // Attachment button click
  attachBtn?.addEventListener('click', () => {
    fileInput?.click();
  });

  fileInput?.addEventListener('change', (e) => takeFile(e.target.files?.[0]));

  const cameraBtn = document.getElementById('agent-camera-btn');
  const cameraInput = getCameraInput();
  cameraBtn?.addEventListener('click', () => cameraInput?.click());
  cameraInput?.addEventListener('change', (e) => {
    takeFile(e.target.files?.[0]);
    e.target.value = '';
  });

  // Auto-grow textarea
  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
  });

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputEl.value);
    }
  });

  sendBtn.addEventListener('click', () => {
    sendMessage(inputEl.value);
  });

  // A tapped suggestion is sent as the answer.
  // Two chips act on the device instead: share the location, or pick a photo.
  getThread()?.addEventListener('click', async (e) => {
    const chip = e.target.closest('.assist-chip');
    if (!chip) return;
    const reply = chip.getAttribute('data-reply');
    if (reply === '__attach_photo') {
      fileInput?.click();
      return;
    }
    if (reply === '__share_location') {
      if (!getStoredLocation()) {
        try {
          _showLocStatus(await requestLocation());
        } catch {
          appendHtml(renderAgentBubble('I could not get your location. You can type a landmark or street name instead.'));
          return;
        }
      }
      sendMessage("It's right where I am");
      return;
    }
    sendMessage(reply);
  });

  // ── If launched from ChatBar — send first message immediately ──────────────
  if (firstMessage && firstMessage.trim()) {
    setTimeout(() => sendMessage(decodeURIComponent(firstMessage)), 120);
  } else {
    inputEl.focus();
  }

  // ── Clean up session on page unload ───────────────────────────────────────
  window.addEventListener('beforeunload', () => {
    if (sessionId) agentApi.clearSession(sessionId);
  }, { once: true });
}
