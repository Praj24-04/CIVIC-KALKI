/**
 * CIVIC-KALKI — export an on-screen table as PDF or Excel.
 *
 * Generic: it reads the header and body cells of whatever <table> it is given,
 * so every report (and any future table) exports exactly the rows the user is
 * looking at, with no per-report code and no server endpoint.
 *
 * The PDF and Excel libraries are loaded only when an export is requested.
 */

/** Read a table element into { headers: string[], rows: string[][] }. */
export function readTable(tableEl) {
  const text = (cell) => (cell.textContent || '').replace(/\s+/g, ' ').trim();
  const headers = Array.from(tableEl.querySelectorAll('thead th')).map(text);
  const rows = Array.from(tableEl.querySelectorAll('tbody tr')).map((tr) =>
    Array.from(tr.querySelectorAll('td, th')).map(text)
  );
  return { headers, rows };
}

/** A cell that is entirely a number is exported as a number, so Excel can sum it. */
function asNumber(value) {
  return /^-?\d+(\.\d+)?$/.test(value) ? Number(value) : null;
}

function fileBase(title) {
  const slug = String(title || 'report')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'report';
  return `${slug}-${new Date().toISOString().slice(0, 10)}`;
}

/**
 * @param {{ title: string, subtitle?: string, headers: string[], rows: string[][] }} data
 * @returns {Promise<string>} the file name
 */
export async function exportTablePdf({ title, subtitle, headers, rows }) {
  const [{ jsPDF }, { autoTable }] = await Promise.all([import('jspdf'), import('jspdf-autotable')]);
  const doc = new jsPDF({ orientation: headers.length > 5 ? 'landscape' : 'portrait' });

  doc.setFontSize(14);
  doc.text(String(title || 'Report'), 14, 16);
  doc.setFontSize(9);
  doc.setTextColor(100);
  const meta = [subtitle, `Generated ${new Date().toLocaleString()}`, `${rows.length} row(s)`].filter(Boolean);
  doc.text(meta.join('  ·  '), 14, 23, { maxWidth: doc.internal.pageSize.getWidth() - 28 });

  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 30,
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [37, 99, 235] },
  });

  const fileName = `${fileBase(title)}.pdf`;
  doc.save(fileName);
  return fileName;
}

/**
 * @param {{ title: string, headers: string[], rows: string[][] }} data
 * @returns {Promise<string>} the file name
 */
export async function exportTableExcel({ title, headers, rows }) {
  const { default: writeExcelFile } = await import('write-excel-file/browser');

  const sheetData = [
    headers.map((h) => ({ value: h, fontWeight: 'bold' })),
    ...rows.map((row) =>
      row.map((value) => {
        const n = asNumber(value);
        return n === null ? { value, type: String } : { value: n, type: Number };
      })
    ),
  ];
  const columns = headers.map((h, i) => ({
    width: Math.min(60, Math.max(12, h.length + 2, ...rows.map((r) => String(r[i] ?? '').length + 2))),
  }));

  const fileName = `${fileBase(title)}.xlsx`;
  await writeExcelFile(sheetData, { columns }).toFile(fileName);
  return fileName;
}
