import { requireAuth, getUser } from '../auth.js';
import { renderLayout, attachLayoutEvents } from '../components/layout.js';
import { entities as apiEntities, values as apiValues, reports as apiReports } from '../api.js';
import { toastError, toastSuccess } from '../components/toast.js';
import { showModal, closeModal } from '../components/modal.js';
import { navigate } from '../router.js';
import { getCapabilityPresentation, formatStatusLabel } from '../utils/terminology.js';
import { renderReadOnlyMapHTML, initReadOnlyMaps } from '../components/ReadOnlyMap.js';

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, c =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])
  );
}

export async function renderEntityDetail({ id }) {
  // Defensive guard: 'new' must never be handled as an entity detail case ID
  const cleanId = String(id || '').split('?')[0].split('#')[0];
  if (!cleanId || cleanId === 'new') {
    navigate('/entities/new' + (window.location.search || ''));
    return;
  }

  if (!requireAuth(navigate)) return;
  const user = getUser();
  
  const app = document.getElementById('app');
  app.innerHTML = renderLayout(`
    <div class="page-header mb-4" style="display:flex; justify-content:space-between; align-items:flex-start;">
      <div class="page-header-left">
        <div class="topbar-breadcrumb mb-2"><a href="/entities" class="text-link">My Requests</a> / Case #${cleanId}</div>
        <h1 id="header-title">Loading Case...</h1>
      </div>
      <div id="header-extra-actions" style="display:flex; gap:10px;"></div>
    </div>
    
    <div id="detail-content">
      <div class="loading-overlay"><div class="spinner spinner-lg"></div></div>
    </div>
  `, `Case #${cleanId}`);
  attachLayoutEvents();

  try {
    const [entityRes, valuesRes, auditRes, lineageRes, wfRes] = await Promise.all([
      apiEntities.get(cleanId),
      apiValues.list(cleanId).catch(() => ({ data: [] })),
      apiEntities.audit(cleanId).catch(() => ({ data: { auditLogs: [], approvalHistory: [] } })),
      apiEntities.getLineage(cleanId).catch(() => ({ data: { current: null, parent: null, children: [], rules: [] } })),
      apiEntities.workflow(cleanId).catch(() => ({ data: { allowedTransitions: [] } })),
    ]);
    
    const entity = entityRes.data;
    const values = valuesRes.data || [];
    const audit = auditRes.data || { auditLogs: [], approvalHistory: [] };
    const lineage = lineageRes.data || { current: null, parent: null, children: [], rules: [] };
    const workflowMeta = wfRes.data || { allowedTransitions: [] };

    let moduleReports = [];
    try {
      const repRes = await apiReports.list({ entity_type_id: entity.entity_type_id });
      moduleReports = repRes.data || [];
    } catch (err) {
      moduleReports = [];
    }
    
    document.getElementById('header-title').textContent = entity.name;
    const memeEligibleStatuses = ['approved', 'coordinator_approved', 'verified', 'in_progress', 'resolved', 'closed'];
    const isMemeEligible = memeEligibleStatuses.includes(String(entity.status || '').toLowerCase()) && entity.entityType?.name !== 'Civic Campaign';
    if (isMemeEligible) {
      const extraActions = document.getElementById('header-extra-actions');
      if (extraActions) {
        extraActions.innerHTML = `
          <a href="/meme/studio/${entity.entity_id}" class="btn btn-secondary" style="display:inline-flex; align-items:center; gap:6px; font-weight:700; border-color:#f59e0b; color:#d97706; background:#fffbeb;">
            <span>⚡</span> Create Civic Meme
          </a>
        `;
      }
    }
    renderContent(document.getElementById('detail-content'), entity, values, audit, lineage, workflowMeta, moduleReports, user);
  } catch (err) {
    console.error('Failed to load case detail:', err);
    toastError('Failed to load case details');
    document.getElementById('detail-content').innerHTML = `<div class="alert alert-error">Failed to load case #${cleanId}. It may not exist.</div>`;
  }
}

function renderContent(container, entity, values, audit, lineage, workflowMeta, moduleReports, user) {
  const capability = getCapabilityPresentation(entity.entityType);

  // Workflow progress step diagram
  const steps = ['draft', 'submitted', 'coordinator_approved', 'approved'];
  const currentIndex = steps.indexOf(entity.status) !== -1 ? steps.indexOf(entity.status) : -1;
  const isRejected = entity.status === 'rejected';
  
  let workflowHTML = '<div class="workflow-steps mt-4 mb-2">';
  steps.forEach((step, idx) => {
    const isDone = idx < currentIndex || (idx === currentIndex && !isRejected && entity.status === 'approved');
    const isCurrent = idx === currentIndex && entity.status !== 'approved';
    const classStr = isRejected && idx === currentIndex ? 'rejected' : (isDone ? 'done' : (isCurrent ? 'current' : ''));
    
    workflowHTML += `
      <div class="workflow-step">
        <div class="workflow-step-node">
          <div class="workflow-step-circle ${classStr}">${idx + 1}</div>
          <div class="workflow-step-label mt-1">${formatStepName(step)}</div>
        </div>
        ${idx < steps.length - 1 ? `<div class="workflow-step-connector ${isDone ? 'done' : ''}"></div>` : ''}
      </div>
    `;
  });
  if (isRejected) {
    workflowHTML += `
      <div class="workflow-step">
        <div class="workflow-step-connector"></div>
        <div class="workflow-step-node">
          <div class="workflow-step-circle rejected">!</div>
          <div class="workflow-step-label mt-1 text-red-600">Rejected</div>
        </div>
      </div>
    `;
  }
  workflowHTML += '</div>';

  const actionsHTML = renderDynamicActions(entity, workflowMeta.allowedTransitions || [], user);

  // AI Decision Intelligence Card for Officer / Director / Admin
  const isStaffOrAdmin = user && ['coordinator_area', 'coordinator_general', 'director', 'admin'].includes(user.role);
  let aiCardHTML = '';
  if (isStaffOrAdmin && entity.status !== 'deleted') {
    aiCardHTML = `
      <div class="card mb-6" id="case-panel-card" style="border:1px solid var(--primary-border);">
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; padding:0.85rem 1.25rem;">
          <h3 class="card-title" style="margin:0;">Case panel</h3>
          <span style="font-size:12px; color:var(--text-muted);">Only the summary is AI; everything else follows rules.</span>
        </div>
        <div class="card-body" id="case-panel-body" style="padding:1rem 1.25rem;">
          <div class="text-muted text-sm">Loading case panel…</div>
        </div>
        <details id="case-deeper" style="border-top:1px solid var(--border); padding:0.75rem 1.25rem;">
          <summary style="cursor:pointer; font-size:13px; font-weight:600; color:var(--text-secondary);">Deeper analysis (optional, general commentary)</summary>
          <div style="font-size:12px; color:var(--text-muted); margin:8px 0;">
            General AI commentary on this case. It is not checked against the record, is not used for the checklist, flags or suggested action, and may contain statements that do not come from this case.
          </div>
          <div id="ai-report-source" style="font-size:12px; color:var(--text-muted); margin-bottom:8px;"></div>
          <span id="ai-report-badge" class="badge badge-pending" style="display:none;"></span>
          <div id="ai-report-body">
            <button id="btn-generate-ai" class="btn btn-secondary btn-sm">Run deeper analysis</button>
          </div>
        </details>
      </div>
    `;
  }

  // Automation Visibility Box (Rule Engine auto-created child entities)
  let automationBoxHTML = '';
  if (lineage.children && lineage.children.length > 0) {
    automationBoxHTML = `
      <div class="card mb-6" style="border-top:4px solid var(--green-600); background:#f0fdf4; border-color:#bbf7d0;">
        <div class="card-body" style="padding:16px;">
          <div style="display:flex; align-items:flex-start; gap:12px;">
            <div style="display:flex; align-items:center; padding-top:2px; color:#16a34a;">
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div style="flex:1;">
              <h4 style="font-size:1rem; font-weight:700; color:#166534; margin-bottom:4px;">
                Civic Automation Executed
              </h4>
              <p style="font-size:0.875rem; color:#15803d; margin-bottom:12px;">
                This case approval automatically triggered <strong>${lineage.children.length} related civic record(s)</strong> via configured metadata automation rules.
              </p>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${lineage.children.map(ch => `
                  <div style="padding:10px 14px; background:#ffffff; border:1px solid #a7f3d0; border-radius:6px; font-size:0.875rem; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                      <strong style="color:var(--text-primary);">#PR-${String(ch.entity_id).padStart(5, '0')} ${escapeHtml(ch.name)}</strong>
                      <span class="badge badge-secondary ml-2">${escapeHtml(ch.type_name)}</span>
                    </div>
                    <a href="/entities/${ch.entity_id}" class="btn btn-secondary btn-sm" style="font-size:12px;">View Related Record →</a>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Dynamic Parameter Values Table
  const valuesRows = values.map(v => `
    <tr>
      <td class="param-key" style="font-weight:600; width:35%; font-size:0.875rem;">${escapeHtml(v.parameterMaster?.label || v.parameterMaster?.field_key || `Parameter #${v.parameter_id}`)}</td>
      <td class="param-val" style="font-size:0.875rem;">${escapeHtml(v.value || '—')}</td>
    </tr>
  `).join('');
  
  const valuesHTML = values.length > 0 
    ? `<div class="table-container"><table class="table"><tbody>${valuesRows}</tbody></table></div>`
    : `<div class="text-muted p-4">No custom parameter values submitted for this case.</div>`;

  // Activity & Accountability Timeline (Combining AuditLog + ApprovalHistory)
  const auditLogs = audit.auditLogs || [];
  const approvals = audit.approvalHistory || [];
  
  const timelineHTML = auditLogs.map(log => `
    <div class="timeline-item mb-3" style="padding:12px; border-left:3px solid var(--primary); background:var(--gray-50); border-radius:4px;">
      <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-muted);">
        <span><strong>${escapeHtml(log.user || 'System')}</strong> (${escapeHtml(log.role || 'User')})</span>
        <span>${new Date(log.datetime).toLocaleString()}</span>
      </div>
      <div style="font-size:0.875rem; color:var(--text-primary); margin-top:4px; font-weight:500;">
        ${log.action === 'status_transition' 
          ? `Status Transition: <strong>${formatStatusLabel(log.old_status)}</strong> → <strong>${formatStatusLabel(log.new_status)}</strong>`
          : `Action Executed: <strong>${log.action}</strong>`}
      </div>
      ${log.reason ? `<div style="font-size:0.8rem; color:var(--text-secondary); font-style:italic; margin-top:4px; background:#fff; padding:6px; border-radius:4px; border:1px solid var(--border);">"${escapeHtml(log.reason)}"</div>` : ''}
    </div>
  `).join('');
  
  const auditHTML = auditLogs.length > 0
    ? `<div>${timelineHTML}</div>`
    : `<div class="text-muted p-4">No audit logs recorded yet for this case.</div>`;

  // Module Reports Shortcuts section
  let reportsShortcutHTML = '';
  // Executing reports is a director/admin action (docs/ROLE_MATRIX.md).
  const canExecuteReports = user && ['director', 'admin'].includes(user.role);
  if (canExecuteReports && moduleReports.length > 0) {
    reportsShortcutHTML = `
      <div class="card mb-6" style="border-top:3px solid var(--green-600);">
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
          <div class="card-title" style="display:flex; align-items:center; gap:8px;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            Civic Reports
          </div>
          <span class="badge badge-success">${moduleReports.length} Reports</span>
        </div>
        <div class="card-body" style="padding:16px;">
          <div style="display:flex; flex-wrap:wrap; gap:10px;">
            ${moduleReports.map(r => `
              <button type="button" class="btn btn-secondary btn-sm execute-rep-btn" data-repid="${r.report_id}" style="display:inline-flex; align-items:center; gap:6px;">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Execute "${escapeHtml(r.report_name)}"
              </button>
            `).join('')}
          </div>
          <div id="report-result-output" class="mt-4" style="display:none;"></div>
        </div>
      </div>
    `;
  }

  // Civic Lineage View
  let lineageHTML = '';
  if (lineage.parent || (lineage.children && lineage.children.length > 0)) {
    lineageHTML = `
      <div class="card mb-6" style="border-top:3px solid var(--primary);">
        <div class="card-header">
          <div class="card-title" style="display:flex; align-items:center; gap:8px;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            Civic Lineage
          </div>
          <div class="card-subtitle">Connected parent and auto-created child civic activities</div>
        </div>
        <div class="card-body" style="padding:16px;">
          ${lineage.parent ? `
            <div style="margin-bottom:12px; padding:12px; background:var(--primary-light); border:1px solid var(--primary-border); border-radius:6px; font-size:13px;">
              <div style="font-size:0.75rem; color:var(--primary); font-weight:700; text-transform:uppercase; margin-bottom:2px;">Parent Case</div>
              <a href="/entities/${lineage.parent.entity_id}" class="text-link font-medium">#PR-${String(lineage.parent.entity_id).padStart(5, '0')} ${escapeHtml(lineage.parent.name)} (${escapeHtml(lineage.parent.entityType?.name || 'Capability')})</a>
            </div>
          ` : ''}
          ${lineage.children && lineage.children.length > 0 ? `
            <div style="font-size:13px; font-weight:600; color:var(--text-primary); margin-bottom:8px;">Linked Child Activities:</div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              ${lineage.children.map(ch => `
                <div style="padding:10px; background:var(--surface); border:1px solid var(--border); border-radius:6px; font-size:13px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <a href="/entities/${ch.entity_id}" class="text-link font-medium">#PR-${String(ch.entity_id).padStart(5, '0')} ${escapeHtml(ch.name)}</a>
                    <span class="badge badge-secondary ml-2">${escapeHtml(ch.type_name)}</span>
                  </div>
                  <span class="badge badge-${ch.status}">${formatStatusLabel(ch.status)}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <!-- Top Case Summary Card -->
    <div class="card mb-6">
      <div class="card-body" style="padding: 1.5rem;">
        <div class="flex justify-between items-start flex-wrap gap-4 mb-2">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="badge badge-primary font-semibold">${escapeHtml(capability.title)}</span>
              <span class="badge badge-${entity.status}">${formatStatusLabel(entity.status)}</span>
            </div>
            <h2 style="font-size:1.5rem; font-weight:800; color:var(--text-primary); margin:4px 0;">${escapeHtml(entity.name)}</h2>
            <div style="font-size:13px; color:var(--text-muted);">
              Submitted by <strong>${escapeHtml(entity.owner?.name || (entity.source_entity_id ? 'System' : 'a citizen'))}</strong> • Jurisdiction Area: <strong>${escapeHtml(entity.area || '—')}</strong> • Location: <strong>${escapeHtml(entity.location || '—')}</strong>
            </div>
          </div>
        </div>
        ${workflowHTML}
      </div>
    </div>

    ${automationBoxHTML}
    ${aiCardHTML}
    ${renderReadOnlyMapHTML(entity)}
    ${reportsShortcutHTML}
    ${lineageHTML}

    <!-- Main Detail & Actions Layout -->
    <div class="entity-detail-layout" style="display:grid; grid-template-columns: 2fr 1fr; gap: 20px;">
      <div>
        <div class="card">
          <div class="card-header border-b">
            <div class="tabs">
              <button class="tab-btn active" id="tab-info">Case Details & Parameters</button>
              <button class="tab-btn" id="tab-audit">Activity & Accountability Log</button>
            </div>
          </div>
          <div class="card-body" id="tab-content">
            ${valuesHTML}
          </div>
        </div>
      </div>

      <div>
        <!-- Dynamic Workflow Actions Box -->
        <div class="card" style="border-top: 4px solid var(--primary);">
          <div class="card-header">
            <div class="card-title" style="display:flex; align-items:center; gap:8px;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Available Actions
          </div>
            <div class="card-subtitle">Role-permitted workflow actions</div>
          </div>
          <div class="card-body" style="padding:16px;">
            <div class="workflow-actions flex-col gap-2">
              ${actionsHTML}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Tab Listeners
  const tabInfo = document.getElementById('tab-info');
  const tabAudit = document.getElementById('tab-audit');
  const tabContent = document.getElementById('tab-content');
  
  if (tabInfo && tabAudit && tabContent) {
    tabInfo.addEventListener('click', () => {
      tabInfo.classList.add('active'); tabAudit.classList.remove('active');
      tabContent.innerHTML = valuesHTML;
    });
    
    tabAudit.addEventListener('click', () => {
      tabAudit.classList.add('active'); tabInfo.classList.remove('active');
      tabContent.innerHTML = auditHTML;
    });
  }

  // Attach AI Analysis Listener
  const btnGenerate = document.getElementById('btn-generate-ai');
  if (btnGenerate) {
    btnGenerate.addEventListener('click', () => handleGenerateAIReport(entity, values));
  }

  // Attach Report Execution Listeners
  const repBtns = document.querySelectorAll('.execute-rep-btn');
  repBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const repId = btn.getAttribute('data-repid');
      handleExecuteReport(repId);
    });
  });

  // Attach Dynamic Action Button Listeners
  attachActionListeners(entity.entity_id);
  if (document.getElementById('case-panel-body')) loadCasePanel(entity);

  // Initialize ReadOnlyMap if coordinates are present in entity response
  initReadOnlyMaps();

  // Trigger full localization for dynamic entity fields and tabs
  if (typeof window.civicTranslatePage === 'function') {
    window.civicTranslatePage();
  }
}

function renderDynamicActions(entity, allowedTransitions, user) {
  const actions = [];
  const currentStatus = String(entity.status || 'draft').trim().toLowerCase();
  const seenTargets = new Set();

  if (Array.isArray(allowedTransitions) && allowedTransitions.length > 0) {
    allowedTransitions.forEach((tr) => {
      const target = tr.action || tr.to || tr.to_status;
      if (!target || seenTargets.has(target)) return;
      seenTargets.add(target);

      const isReject = target === 'rejected';
      const label = formatActionLabel(currentStatus, target);
      const btnClass = isReject ? 'btn-danger' : 'btn-primary';

      actions.push(`
        <button class="btn ${btnClass} btn-full wf-action-btn mt-2" 
          data-to="${escapeHtml(target)}" 
          data-label="${escapeHtml(label)}"
          data-reason="${isReject ? 'true' : 'false'}">
          ${escapeHtml(label)}
        </button>
      `);
    });
  }

  if (user && user.role === 'admin') {
    actions.push(`
      <button class="btn btn-secondary btn-full mt-3" id="btn-fire-rules" data-rule="true" style="display:inline-flex; align-items:center; gap:8px; justify-content:center;">
        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        Execute Automation Rules
      </button>
    `);
  }

  if (actions.length === 0) {
    if (user && user.role === 'coordinator_area') {
      const userArea = user.assignedArea || user.assigned_area;
      const entityArea = entity.area;
      if (userArea && entityArea && userArea.toLowerCase() !== entityArea.toLowerCase()) {
        return `
          <div style="padding:14px; background:#fff7ed; border:1px solid #fed7aa; border-radius:8px; font-size:13px; color:#9a3412; line-height:1.4;">
            <div style="font-weight:700; color:#c2410c; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              Jurisdiction Boundary Constraint
            </div>
            Your coordinator account is assigned to <strong>"${escapeHtml(userArea)}"</strong>, but this case belongs to <strong>"${escapeHtml(entityArea)}"</strong>.
            <div style="margin-top:8px; font-size:12px; color:#7c2d12;">
              Area Coordinators are strictly authorized to verify cases within their own jurisdiction. Only a Coordinator assigned to <strong>${escapeHtml(entityArea)}</strong> (or a General Coordinator) can verify this case.
            </div>
          </div>
        `;
      }
    }
    return `<div class="text-muted text-sm text-center py-2">No workflow actions currently permitted for your role (${escapeHtml(user?.role || 'user')}) at status "${escapeHtml(formatStatusLabel(currentStatus))}".</div>`;
  }

  return actions.join('');
}

function formatActionLabel(from, to) {
  const normTo = String(to || '').toLowerCase();
  const normFrom = String(from || '').toLowerCase();

  if (normFrom === 'draft' && normTo === 'submitted') return 'Submit Request';
  if (normFrom === 'submitted' && (normTo === 'coordinator_approved' || normTo === 'verified')) {
    return 'Verify & Recommend Approval';
  }
  if (normFrom === 'coordinator_approved' && normTo === 'approved') return 'Executive Approval (Director)';
  if (normFrom === 'verified' && normTo === 'approved') return 'Executive Approval (Director)';
  if (normTo === 'rejected') return 'Reject Request';
  return `Transition to ${to}`;
}

function formatStepName(step) {
  if (step === 'draft') return 'Draft';
  if (step === 'submitted') return 'Submitted';
  if (step === 'coordinator_approved') return 'Coord Approved';
  if (step === 'verified') return 'Verified';
  if (step === 'approved') return 'Approved';
  if (step === 'rejected') return 'Rejected';
  return step;
}

function attachActionListeners(entityId) {
  const handleAction = (btn) => {
    const toStatus = btn.getAttribute('data-to');
    const label = btn.getAttribute('data-label') || `Transition to ${toStatus}`;
    const needsReason = btn.getAttribute('data-reason') === 'true';
    const isRule = btn.getAttribute('data-rule') === 'true';

    if (isRule) {
      handleFireRules(entityId);
      return;
    }

    if (needsReason) {
      showModal({
        title: 'Provide Reason for Rejection',
        content: `
          <div class="form-group mb-4">
            <label class="form-label" for="action-reason">Reason for Rejection <span class="required">*</span></label>
            <textarea id="action-reason" class="form-control" rows="3" placeholder="Please state rationale for rejecting this case..." required></textarea>
          </div>
        `,
        footer: `
          <button class="btn btn-ghost" id="cancel-modal-btn">Cancel</button>
          <button class="btn btn-danger" id="confirm-action-btn">Confirm Rejection</button>
        `,
        onClose: () => {}
      });

      document.getElementById('cancel-modal-btn').addEventListener('click', closeModal);
      document.getElementById('confirm-action-btn').addEventListener('click', async () => {
        const reason = document.getElementById('action-reason').value.trim();
        if (!reason) {
          toastError('Reason is required for rejection');
          return;
        }
        closeModal();
        executeTransition(entityId, toStatus, reason);
      });
    } else {
      showModal({
        title: `Confirm Action: ${label}`,
        content: `
          <p style="font-size:0.9rem; color:var(--text-secondary);">
            Are you sure you want to execute <strong>${escapeHtml(label)}</strong> for case #${entityId}?
          </p>
        `,
        footer: `
          <button class="btn btn-ghost" id="cancel-modal-btn">Cancel</button>
          <button class="btn btn-primary" id="confirm-action-btn">Confirm Transition</button>
        `,
        onClose: () => {}
      });

      document.getElementById('cancel-modal-btn').addEventListener('click', closeModal);
      document.getElementById('confirm-action-btn').addEventListener('click', async () => {
        closeModal();
        executeTransition(entityId, toStatus, null);
      });
    }
  };

  const actionButtons = document.querySelectorAll('.wf-action-btn, #btn-fire-rules');
  actionButtons.forEach(btn => {
    btn.addEventListener('click', () => handleAction(btn));
  });
}

async function executeTransition(entityId, toStatus, reason) {
  try {
    const res = await apiEntities.transition(entityId, toStatus, reason);
    toastSuccess(res.message || `Status updated to ${toStatus}`);
    renderEntityDetail({ id: entityId });
  } catch (err) {
    toastError(err.message || 'Transition failed');
  }
}

async function handleFireRules(entityId) {
  try {
    const res = await apiEntities.fireRules(entityId, 'approved');
    toastSuccess(`Rule Engine executed! ${res.data?.createdEntities?.length || 0} entity created.`);
    renderEntityDetail({ id: entityId });
  } catch (err) {
    toastError(err.message || 'Rule trigger failed');
  }
}

async function handleExecuteReport(reportId) {
  const out = document.getElementById('report-result-output');
  if (!out) return;

  out.style.display = 'block';
  out.innerHTML = '<div class="spinner spinner-sm"></div> Running report...';

  try {
    const res = await apiReports.execute(reportId);
    const data = res.data;
    
    let rowsHTML = (data.rows || []).map(r => `
      <tr>
        <td>${escapeHtml(r[data.groupBy] || r.area || 'Total')}</td>
        <td style="font-weight:bold;">${r[data.metric?.toLowerCase()] || r.count || r.total_count || 0}</td>
      </tr>
    `).join('');

    out.innerHTML = `
      <div style="background:var(--green-50); border:1px solid var(--green-100); border-radius:6px; padding:12px; font-size:13px;">
        <div style="font-weight:bold; color:var(--green-700); margin-bottom:6px; display:flex; align-items:center; gap:6px;">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10"/></svg>
          Execution Result: "${escapeHtml(data.reportName)}"
        </div>
        <table class="table-sm" style="width:100%; font-size:12px;">
          <thead><tr><th>${escapeHtml(data.groupBy || 'Group')}</th><th>${escapeHtml(data.metric)}</th></tr></thead>
          <tbody>${rowsHTML}</tbody>
        </table>
      </div>
    `;
  } catch (err) {
    out.innerHTML = `<div class="alert alert-error">Report execution failed: ${escapeHtml(err.message)}</div>`;
  }
}

// ── Case panel ───────────────────────────────────────────────────────────────
// Data comes from GET /entities/:id/case-panel (no AI call). The brief is asked
// for separately and only when none is cached for this state of the record.
// The suggested action is a button onto the normal workflow transition; nothing
// here changes the record without the coordinator confirming.

async function loadCasePanel(entity) {
  const body = document.getElementById('case-panel-body');
  if (!body) return;
  let panel;
  try {
    panel = (await apiEntities.casePanel(entity.entity_id)).data;
  } catch (err) {
    body.innerHTML = err.status === 403
      ? `<div class="text-muted text-sm">${escapeHtml(err.message || 'This case is outside your scope.')}</div>`
      : `<div class="alert alert-error">Case panel could not be loaded: ${escapeHtml(err.message || '')}</div>`;
    const deeper = document.getElementById('case-deeper');
    if (deeper && err.status === 403) deeper.remove();
    return;
  }
  body.innerHTML = renderCasePanel(panel, entity);
  attachCasePanelEvents(panel, entity);

  if (!panel.brief && panel.brief_pending) {
    try {
      const res = (await apiEntities.caseBrief(entity.entity_id)).data;
      const slot = document.getElementById('case-brief');
      if (slot) slot.innerHTML = renderBrief(res.brief, res.unavailable_reason, false);
    } catch (err) {
      const slot = document.getElementById('case-brief');
      if (slot) slot.innerHTML = renderBrief(null, 'The AI brief could not be generated.', false);
    }
  }
}

function plural(n, word) {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}

function renderBrief(brief, unavailableReason, pending) {
  if (brief) {
    return `
      <ul class="cp-brief-lines">
        ${brief.lines.map((l) => `<li>${escapeHtml(l)}</li>`).join('')}
      </ul>
      <div class="cp-foot">Written from this record only · review before acting · ${escapeHtml(brief.model || '')}</div>`;
  }
  if (pending) {
    return `<div class="cp-brief-wait"><span class="spinner" style="width:14px;height:14px;border-width:2px;"></span> Writing a short summary of this case…</div>`;
  }
  return `<div class="cp-muted">No AI summary: ${escapeHtml(String(unavailableReason || 'not available').replace(/\.$/, ''))}. Everything else in this panel is rule-based and unaffected.</div>`;
}

// The one-line verdict at the top: what the rules say to do, coloured by how
// much attention the case needs. Rule-based; the coordinator always decides.
function caseVerdict(panel, entity) {
  const s = panel.suggestion;
  const missing = panel.checklist.filter((i) => i.required && !i.present);
  if (!s) {
    return { tone: 'idle', icon: '•', title: 'No action for you right now', detail: panel.suggestion_none_reason || 'No rule points to a single action.' };
  }
  if (s.outcome === 'dismissed') {
    return { tone: 'idle', icon: '•', title: 'Suggestion dismissed', detail: 'All workflow actions are still available in the actions box.' };
  }
  const label = formatActionLabel(entity.status, s.to_status);
  if (s.to_status === 'rejected') {
    return { tone: 'stop', icon: '!', title: `${plural(missing.length || 1, 'required item')} missing`, detail: s.reason, label };
  }
  if (panel.flags.length) {
    return { tone: 'review', icon: '?', title: `Complete, but ${plural(panel.flags.length, 'flag')} to check`, detail: s.reason, label };
  }
  return { tone: 'go', icon: '✓', title: 'Complete and ready', detail: s.reason, label };
}

function renderCasePanel(panel, entity) {
  const v = caseVerdict(panel, entity);
  const s = panel.suggestion;
  const showActions = s && s.outcome !== 'dismissed';
  const verdict = `
    <div class="cp-verdict cp-${v.tone}">
      <div class="cp-verdict-icon" aria-hidden="true">${v.icon}</div>
      <div class="cp-verdict-text">
        <div class="cp-verdict-title">${escapeHtml(v.title)}</div>
        <div class="cp-verdict-detail">${escapeHtml(v.detail)}</div>
        ${showActions ? '<div class="cp-foot">Rule-based suggestion · nothing happens until you confirm · your choice is logged</div>' : ''}
      </div>
      ${showActions ? `
      <div class="cp-verdict-actions">
        <button class="btn ${s.to_status === 'rejected' ? 'btn-danger' : 'btn-primary'} btn-sm" id="case-suggestion-act">${escapeHtml(v.label)}…</button>
        <button class="btn btn-ghost btn-sm" id="case-suggestion-dismiss">Dismiss</button>
      </div>` : ''}
    </div>`;

  // ── At a glance ──
  const required = panel.checklist.filter((i) => i.required);
  const requiredPresent = required.filter((i) => i.present).length;
  const waiting = panel.days_in_status;
  const stat = (value, label, tone, hint) => `
    <div class="cp-stat ${tone ? `cp-stat-${tone}` : ''}" ${hint ? `title="${escapeHtml(hint)}"` : ''}>
      <div class="cp-stat-value">${value}</div>
      <div class="cp-stat-label">${label}</div>
    </div>`;
  const requiredTone = !required.length ? '' : (requiredPresent < required.length ? 'stop' : 'go');
  const stats = `
    <div class="cp-stats">
      ${stat(required.length ? `${requiredPresent}/${required.length}` : '—', 'Required items', requiredTone)}
      ${stat(panel.flags.length, panel.flags.length === 1 ? 'Flag' : 'Flags', panel.flags.length ? 'review' : '', `${plural(panel.flag_rules_configured, 'configured rule')} for this service`)}
      ${stat(panel.similar_cases.length, 'Similar nearby', '', `Same service and area, last ${panel.similar_window_days} days`)}
      ${stat(waiting === null || waiting === undefined ? '—' : `${waiting}d`, `In "${escapeHtml(formatStatusLabel(entity.status))}"`, '', panel.filed_at ? `Filed ${new Date(panel.filed_at).toLocaleDateString()}` : '')}
    </div>`;

  // ── AI summary ──
  const brief = `
    <div class="cp-block cp-brief">
      <div class="cp-block-head"><span>Case summary</span><span class="cp-tag cp-tag-ai">AI</span></div>
      <div id="case-brief">${renderBrief(panel.brief, panel.brief_unavailable_reason, panel.brief_pending)}</div>
    </div>`;

  // ── Checklist: what is missing comes first ──
  const order = (i) => (i.present ? 2 : (i.required ? 0 : 1));
  const items = [...panel.checklist].sort((a, b) => order(a) - order(b));
  const itemRow = (i) => {
    const state = i.present ? 'ok' : (i.required ? 'miss' : 'opt');
    const mark = i.present ? '✓' : (i.required ? '✕' : '–');
    const meta = [
      i.kind === 'document' ? (i.present && i.count ? plural(i.count, 'file') : 'document') : null,
      i.required ? null : 'optional',
    ].filter(Boolean).join(' · ');
    return `
      <li class="cp-item cp-item-${state}">
        <span class="cp-mark" aria-hidden="true">${mark}</span>
        <span class="cp-item-label">${escapeHtml(i.label)}</span>
        ${meta ? `<span class="cp-item-meta">${escapeHtml(meta)}</span>` : ''}
      </li>`;
  };
  const checklist = `
    <div class="cp-block">
      <div class="cp-block-head"><span>Checklist</span><span class="cp-tag">Rule-based</span></div>
      ${items.length ? `<ul class="cp-list">${items.map(itemRow).join('')}</ul>` : '<div class="cp-muted">This form defines no required fields or documents.</div>'}
    </div>`;

  // ── Flags and similar cases ──
  const flagItems = panel.flags.map((f) => `
    <li class="cp-flag">
      <div class="cp-flag-label">${escapeHtml(f.label)}</div>
      <div class="cp-item-meta">${escapeHtml(f.source_label)}: ${escapeHtml(f.value)}</div>
    </li>`).join('');
  const flags = `
    <div class="cp-block">
      <div class="cp-block-head"><span>Flags</span><span class="cp-tag">Rule-based</span></div>
      ${panel.flags.length ? `<ul class="cp-list">${flagItems}</ul>`
        : `<div class="cp-muted">${panel.flag_rules_configured ? 'Nothing raised.' : 'No flag rules set up for this service.'}</div>`}
    </div>`;
  const similarItems = panel.similar_cases.map((c) => `
    <li class="cp-similar">
      <a href="/entities/${c.entity_id}" data-link>#${c.entity_id} ${escapeHtml(c.name)}</a>
      <span class="badge badge-${escapeHtml(String(c.status || '').toLowerCase())}">${escapeHtml(formatStatusLabel(c.status))}</span>
    </li>`).join('');
  const similar = `
    <div class="cp-block">
      <div class="cp-block-head"><span>Similar nearby</span><span class="cp-item-meta">last ${panel.similar_window_days} days</span></div>
      ${panel.similar_cases.length ? `<ul class="cp-list">${similarItems}</ul>` : '<div class="cp-muted">None in this area.</div>'}
    </div>`;

  return `${verdict}${stats}${brief}<div class="cp-grid">${checklist}<div class="cp-col">${flags}${similar}</div></div>`;
}

function attachCasePanelEvents(panel, entity) {
  const s = panel.suggestion;
  if (!s) return;
  const entityId = entity.entity_id;
  const log = (outcome, finalReason) => apiEntities
    .caseSuggestionOutcome(entityId, { suggestion_id: s.suggestion_id, outcome, final_reason: finalReason })
    .catch(() => {});

  document.getElementById('case-suggestion-dismiss')?.addEventListener('click', async () => {
    await log('dismissed');
    loadCasePanel(entity);
  });

  document.getElementById('case-suggestion-act')?.addEventListener('click', () => {
    const isReject = s.to_status === 'rejected';
    const label = formatActionLabel(entity.status, s.to_status);
    showModal({
      title: `Confirm: ${label}`,
      content: isReject ? `
        <div class="form-group mb-4">
          <label class="form-label" for="case-suggestion-reason">Reason for rejection <span class="required">*</span></label>
          <textarea id="case-suggestion-reason" class="form-control" rows="3" required>${escapeHtml(s.reason)}</textarea>
          <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">Suggested by rule. Edit it before confirming if it is not right; the citizen sees this reason.</div>
        </div>` : `
        <p style="font-size:0.9rem; color:var(--text-secondary);">
          Execute <strong>${escapeHtml(label)}</strong> for case #${entityId}?
        </p>`,
      footer: `
        <button class="btn btn-ghost" id="cancel-modal-btn">Cancel</button>
        <button class="btn ${isReject ? 'btn-danger' : 'btn-primary'}" id="confirm-action-btn">Confirm</button>`,
      onClose: () => {},
    });
    document.getElementById('cancel-modal-btn').addEventListener('click', closeModal);
    document.getElementById('confirm-action-btn').addEventListener('click', async () => {
      const reason = isReject ? document.getElementById('case-suggestion-reason').value.trim() : null;
      if (isReject && !reason) {
        toastError('Reason is required for rejection');
        return;
      }
      closeModal();
      try {
        const res = await apiEntities.transition(entityId, s.to_status, reason);
        const edited = isReject && reason !== s.reason;
        await log(edited ? 'edited' : 'accepted', edited ? reason : undefined);
        toastSuccess(res.message || `Status updated to ${s.to_status}`);
        renderEntityDetail({ id: entityId });
      } catch (err) {
        toastError(err.message || 'Transition failed');
      }
    });
  });
}

async function handleGenerateAIReport(entity, values = []) {
  const entityId = entity.entity_id;
  const reportBody = document.getElementById('ai-report-body');
  if (!reportBody) return;

  reportBody.innerHTML = `
    <div style="text-align:center; padding: 2rem 1rem;">
      <div class="spinner spinner-lg mb-3" style="border-top-color:var(--primary); margin:0 auto 12px auto;"></div>
      <div style="font-weight:600; color:var(--text-primary); font-size:15px;">Running deeper analysis...</div>
      <div style="color:var(--text-muted); font-size:13px; margin-top:4px;">Evaluating observations, patterns, recommendations, and evidence.</div>
    </div>
  `;

  try {
    const res = await apiEntities.aiAnalysis(entityId);
    
    setReportSourceLabel('ai');
    reportBody.innerHTML = renderReportSections(res.data);
  } catch (err) {
    // 503 means no AI answer exists: either no key is configured, or the AI could
    // not be reached. Both get the same labeled non-AI summary; any other failure
    // (for example an unusable AI answer) is shown as an error.
    const isKeyError = String(err.message || '').includes('GEMINI_API_KEY') || String(err.message || '').includes('Gemini API key');
    if (isKeyError || err.status === 503) {
      const why = isKeyError ? 'AI is not configured.' : 'The AI service could not be reached.';
      toastError(`${why} Showing a deterministic summary of the case fields instead.`);
      setReportSourceLabel('deterministic');
      reportBody.innerHTML = renderDeterministicSummary(entity, values, isKeyError ? 'no-key' : 'unreachable');
    } else {
      toastError(err.message || 'Could not generate AI report');
      reportBody.innerHTML = `<div class="alert alert-error">AI Analysis failed: ${escapeHtml(err.message)}</div>`;
    }
  }
}

/**
 * Label the report card with where its content came from, so text that was not
 * written by the AI never sits under an AI heading.
 */
function setReportSourceLabel(source) {
  const sourceEl = document.getElementById('ai-report-source');
  const badgeEl = document.getElementById('ai-report-badge');
  if (!sourceEl || !badgeEl) return;
  if (source === 'deterministic') {
    sourceEl.textContent = 'Deterministic summary — not AI output';
    badgeEl.textContent = 'Not AI';
    badgeEl.style.display = '';
    badgeEl.className = 'badge badge-pending';
  } else {
    sourceEl.textContent = 'AI-generated general commentary — review before acting';
    badgeEl.textContent = 'AI output';
    badgeEl.style.display = '';
    badgeEl.className = 'badge badge-primary';
  }
}

/**
 * Deterministic fallback shown when the AI is not configured: the record's own
 * facts and submitted field values, listed as they are. It contains no
 * analysis, no risks and no recommendations, and it is NOT AI output; the card
 * is labelled by setReportSourceLabel('deterministic').
 */
function renderDeterministicSummary(entity, values = [], reason = 'no-key') {
  const facts = [
    ['Record', `#${entity.entity_id} ${entity.name || ''}`],
    ['Type', entity.entityType?.name],
    ['Status', entity.status],
    ['Area', entity.area],
    ['Location', entity.location],
    ['Submitted by', entity.owner?.name],
  ].filter(([, value]) => value !== null && value !== undefined && String(value).trim() !== '');

  const fields = (Array.isArray(values) ? values : [])
    .filter((v) => v && v.value !== null && v.value !== undefined && String(v.value).trim() !== '')
    .map((v) => [v.parameterMaster?.label || v.parameterMaster?.field_key || `Field ${v.parameter_id}`, v.value]);

  const rowsHtml = (rows) => rows.map(([label, value]) => `
        <tr>
          <th scope="row" style="text-align:left; width:34%; font-weight:600; color:var(--text-secondary); padding:6px 10px; vertical-align:top;">${escapeHtml(String(label))}</th>
          <td style="padding:6px 10px;">${escapeHtml(String(value))}</td>
        </tr>`).join('');

  return `
    <div style="font-size:13px; color:var(--text-primary); line-height:1.5;">
      <div style="margin-bottom:12px; padding:10px 12px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; font-size:12px; color:#1e40af;">
        <strong>Deterministic summary, not AI output.</strong>
        ${reason === 'unreachable'
          ? 'The AI service could not be reached, so this lists the record\'s own fields exactly as submitted.'
          : 'No AI key is configured, so this lists the record\'s own fields exactly as submitted.'}
        It contains no analysis, risks or recommendations.
        ${reason === 'unreachable'
          ? 'Try again when the network is back for an AI-generated report.'
          : 'Set GEMINI_API_KEY in backend/.env for an AI-generated report.'}
      </div>
      <div class="table-container">
        <table>
          <tbody>${rowsHtml(facts)}</tbody>
        </table>
      </div>
      <h4 style="margin:16px 0 8px; font-size:13px;">Submitted fields (${fields.length})</h4>
      ${fields.length
        ? `<div class="table-container"><table><tbody>${rowsHtml(fields)}</tbody></table></div>`
        : '<div class="text-muted">No field values were submitted with this record.</div>'}
    </div>
  `;
}

function renderReportSections(report) {
  const recommendations = Array.isArray(report.recommendation)
    ? report.recommendation
    : (Array.isArray(report.actionable_recommendations) ? report.actionable_recommendations : [report.recommendation || report.actionable_recommendations || 'Proceed with field verification.']);

  const rootCauses = Array.isArray(report.root_cause_analysis)
    ? report.root_cause_analysis
    : [report.root_cause_analysis || 'No root cause factors recorded.'];

  const stakeholders = Array.isArray(report.stakeholder_analysis)
    ? report.stakeholder_analysis
    : [];

  const risks = Array.isArray(report.risk_register)
    ? report.risk_register
    : [];

  return `
    <div style="font-size:13px; color:var(--text-primary); line-height:1.5;">
      ${report.notice ? `
        <div style="margin-bottom:12px; padding:10px 12px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; font-size:12px; color:#1e40af; display:flex; align-items:center; gap:8px;">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><strong>Notice:</strong> ${escapeHtml(report.notice)}</div>
        </div>
      ` : ''}

      <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
        <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">1. Observations & Problem Scope</strong>
        <p style="margin:0; color:var(--text-secondary);">${escapeHtml(report.problem_summary)}</p>
      </div>
      
      <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
        <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">2. Patterns & Root Cause Analysis</strong>
        <ul style="margin:0; padding-left:18px; color:var(--text-secondary);">
          ${rootCauses.map(rc => `<li style="margin-bottom:4px;">${escapeHtml(rc)}</li>`).join('')}
        </ul>
      </div>

      ${stakeholders.length > 0 ? `
        <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
          <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">3. Stakeholder Impact Analysis</strong>
          <div style="display:flex; flex-direction:column; gap:6px;">
            ${stakeholders.map(st => `
              <div style="font-size:12px; background:var(--surface); padding:6px 10px; border-radius:4px; border:1px solid var(--border);">
                <strong style="color:var(--text-primary);">${escapeHtml(st.group || 'Stakeholder')}:</strong>
                <span style="color:var(--text-secondary); margin-left:4px;">${escapeHtml(st.interest || '')}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${risks.length > 0 ? `
        <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
          <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">4. Risk Register & Feasibility</strong>
          <div style="display:flex; flex-direction:column; gap:6px;">
            ${risks.map(rk => {
              const sev = String(rk.severity || 'Medium').toLowerCase();
              const badgeStyle = sev === 'high' 
                ? 'background:#fee2e2; color:#b91c1c; border:1px solid #fca5a5;'
                : (sev === 'low' ? 'background:#dcfce7; color:#15803d; border:1px solid #86efac;' : 'background:#fef3c7; color:#b45309; border:1px solid #fcd34d;');
              return `
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; background:var(--surface); padding:6px 10px; border-radius:4px; border:1px solid var(--border);">
                  <span style="color:var(--text-primary);">${escapeHtml(rk.risk || '')}</span>
                  <span style="padding:2px 8px; border-radius:12px; font-weight:700; font-size:11px; ${badgeStyle}">${escapeHtml(rk.severity || 'Medium')}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <div style="margin-bottom:12px; padding:12px; background:#fff; border-radius:6px; border:1px solid var(--border);">
        <strong style="color:var(--primary); font-size:14px; display:block; margin-bottom:6px;">5. Recommendations for Coordinator / Executive Action</strong>
        <ul style="margin:0; padding-left:18px; color:var(--text-secondary);">
          ${recommendations.map(rc => `<li style="margin-bottom:4px;">${escapeHtml(rc)}</li>`).join('')}
        </ul>
      </div>

      <div style="padding:10px 12px; background:var(--yellow-50); border:1px solid var(--yellow-100); border-radius:6px; font-size:12px; color:var(--yellow-700); display:flex; align-items:center; gap:8px;">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink:0;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        <span><strong>Civic Intelligence Protocol:</strong> This automated advisory report is generated to assist municipal coordinators and directors. Ground evidence and field verification must precede final sanction.</span>
      </div>
    </div>
  `;
}
