/**
 * CIVIC-KALKI — "Civic activity across wards" widget.
 *
 * Metadata-driven: it lists every ReportMaster definition that opts in with
 * `"widget": "ward_activity"` in its configuration and is grouped by area, and
 * runs it through the existing GET /reports/:id/execute. Which statuses count
 * as "waiting for approval" also comes from the report configuration
 * (`awaiting_statuses`). There is no ward-specific endpoint or table.
 *
 * Shown as horizontal bars (one per ward) plus a sortable table, which is the
 * accessible equivalent. Bar length = records in the ward; the dark part =
 * records waiting for approval. Numbers are always printed next to the bars.
 */

import { reports as apiReports } from '../api.js';

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const countOf = (row) => Number(row.count ?? row.total_count ?? 0) || 0;

/** Run one report: totals per ward, and how many of them are waiting for approval. */
async function loadWardRows(report) {
  const awaiting = Array.isArray(report.parsed_config?.awaiting_statuses) ? report.parsed_config.awaiting_statuses : [];
  const [all, ...waiting] = await Promise.all([
    apiReports.execute(report.report_id),
    ...awaiting.map((status) => apiReports.execute(report.report_id, { status })),
  ]);
  const key = all.data.groupBy || 'area';
  const wards = new Map();
  for (const row of all.data.rows || []) {
    wards.set(String(row[key]), { ward: String(row[key]), total: countOf(row), awaiting: 0 });
  }
  for (const res of waiting) {
    for (const row of res.data.rows || []) {
      const ward = wards.get(String(row[key]));
      if (ward) ward.awaiting += countOf(row);
    }
  }
  return [...wards.values()];
}

function renderBars(rows, report) {
  const max = Math.max(1, ...rows.map((r) => r.total));
  return rows.map((r) => {
    const totalPct = (r.total / max) * 100;
    const awaitingPct = r.total ? (r.awaiting / r.total) * 100 : 0;
    const href = `/entities?entity_type_id=${Number(report.entity_type_id)}&area=${encodeURIComponent(r.ward)}`;
    return `
      <a class="ward-row" href="${href}" title="${escapeHtml(`${r.ward}: ${r.total} record(s), ${r.awaiting} waiting for approval. Open the list.`)}">
        <span class="ward-name">${escapeHtml(r.ward)}</span>
        <span class="ward-track" aria-hidden="true">
          <span class="ward-bar" style="width:${totalPct.toFixed(1)}%">
            <span class="ward-bar-awaiting" style="width:${awaitingPct.toFixed(1)}%"></span>
          </span>
        </span>
        <span class="ward-numbers"><strong>${r.total}</strong> · ${r.awaiting} waiting</span>
      </a>`;
  }).join('');
}

function renderTable(rows) {
  return `
    <table class="ward-table">
      <caption class="ward-caption">Same figures as a table. Select a column heading to sort.</caption>
      <thead>
        <tr>
          <th scope="col"><button type="button" class="ward-sort" data-sort="ward">Ward</button></th>
          <th scope="col"><button type="button" class="ward-sort" data-sort="total">Records</button></th>
          <th scope="col"><button type="button" class="ward-sort" data-sort="awaiting">Waiting for approval</button></th>
          <th scope="col"><button type="button" class="ward-sort" data-sort="share">Share waiting</button></th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((r) => `
        <tr>
          <th scope="row">${escapeHtml(r.ward)}</th>
          <td>${r.total}</td>
          <td>${r.awaiting}</td>
          <td>${r.total ? Math.round((r.awaiting / r.total) * 100) : 0}%</td>
        </tr>`).join('')}
      </tbody>
    </table>`;
}

/**
 * Mount the widget in `container`. Renders nothing if no report opts in.
 */
export async function mountWardActivity(container) {
  if (!container) return;
  let definitions = [];
  try {
    const res = await apiReports.list();
    definitions = (res.data || []).filter((r) =>
      r.parsed_config?.widget === 'ward_activity' &&
      String(r.parsed_config?.groupBy || r.parsed_config?.group_by || '').toLowerCase() === 'area'
    );
  } catch {
    return;
  }
  if (!definitions.length) return;

  container.innerHTML = `
    <section class="card mb-6 ward-card" aria-labelledby="ward-title">
      <div class="card-header border-b ward-header">
        <div>
          <div class="card-title" id="ward-title">Civic activity across wards</div>
          <div class="card-subtitle">Records per ward, and how many are waiting for approval. Select a ward to open its list.</div>
        </div>
        <label class="ward-select-label">Report
          <select id="ward-report-select" class="form-control">
            ${definitions.map((d) => `<option value="${Number(d.report_id)}">${escapeHtml(d.report_name)}</option>`).join('')}
          </select>
        </label>
      </div>
      <div class="card-body">
        <ul class="ward-legend" aria-label="Legend">
          <li><span class="ward-swatch"></span> all records in the ward</li>
          <li><span class="ward-swatch ward-swatch-awaiting"></span> waiting for approval</li>
        </ul>
        <div id="ward-bars" class="ward-bars" aria-live="polite"></div>
        <div id="ward-table-wrap" class="table-container ward-table-wrap"></div>
      </div>
    </section>`;

  const select = container.querySelector('#ward-report-select');
  const bars = container.querySelector('#ward-bars');
  const tableWrap = container.querySelector('#ward-table-wrap');
  let rows = [];
  let sort = { key: 'total', dir: -1 };

  const paint = () => {
    const report = definitions.find((d) => String(d.report_id) === select.value);
    const value = (r) => (sort.key === 'share' ? (r.total ? r.awaiting / r.total : 0) : r[sort.key]);
    const sorted = [...rows].sort((a, b) => {
      const [x, y] = [value(a), value(b)];
      return (typeof x === 'string' ? x.localeCompare(y) : x - y) * sort.dir;
    });
    if (!sorted.length) {
      bars.innerHTML = '<div class="text-muted">This report has no records yet.</div>';
      tableWrap.innerHTML = '';
      return;
    }
    bars.innerHTML = renderBars(sorted, report);
    tableWrap.innerHTML = renderTable(sorted);
    tableWrap.querySelectorAll('.ward-sort').forEach((btn) => {
      const active = btn.getAttribute('data-sort') === sort.key;
      btn.closest('th').setAttribute('aria-sort', active ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none');
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-sort');
        sort = { key, dir: sort.key === key ? -sort.dir : (key === 'ward' ? 1 : -1) };
        paint();
      });
    });
  };

  const load = async () => {
    bars.innerHTML = '<div class="text-muted">Loading…</div>';
    tableWrap.innerHTML = '';
    try {
      rows = await loadWardRows(definitions.find((d) => String(d.report_id) === select.value));
      paint();
    } catch (err) {
      bars.innerHTML = `<div class="alert alert-error">Ward activity could not be loaded: ${escapeHtml(err.message || err)}</div>`;
    }
  };

  select.addEventListener('change', load);
  await load();
}
