import { readWaitlist, waitlistCsv } from '../server/waitlist-records.js';

const dateFormat = new Intl.DateTimeFormat('en-PK', {
  timeZone: 'Asia/Karachi',
  dateStyle: 'medium',
  timeStyle: 'short',
});
const htmlEntities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (text) => String(text ?? '').replace(/[&<>"']/g, (character) => htmlEntities[character]);

function page({ records, unavailable = false }) {
  const count = records.length;
  const rows = records.map((record) => `<tr>
    <td class="phone">${escapeHtml(record.phone_e164)}</td>
    <td>${escapeHtml(dateFormat.format(new Date(record.consent_at)))}</td>
    <td>${escapeHtml(record.legal_version)}</td>
  </tr>`).join('');

  const list = count
    ? `<div class="table-wrap"><table>
        <thead><tr><th scope="col">Phone number</th><th scope="col">Consent time (PKT)</th><th scope="col">Terms version</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>`
    : '<p class="empty">No signups yet. New signups will appear here after visitors join the waitlist.</p>';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Waitlist signups | Shaveers</title>
  <style>
    :root { color-scheme: light; background: #f6f3ea; color: #1a1916; font: 16px/1.5 system-ui, sans-serif; }
    * { box-sizing: border-box; }
    body { margin: 0; }
    main { width: min(100% - 32px, 900px); margin: 56px auto; }
    header { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap; margin-bottom: 24px; }
    h1 { font: 500 clamp(2rem, 7vw, 3rem)/1.08 Georgia, serif; margin: 4px 0 8px; }
    p { margin: 0; }
    .brand { color: #524a3d; font-weight: 700; }
    .count, .empty { color: #524a3d; }
    .button { display: inline-flex; min-height: 44px; align-items: center; padding: 10px 16px; border-radius: 6px; background: #1a1916; color: white; font-weight: 600; text-decoration: none; }
    .button:focus-visible { outline: 2px solid #1a1916; outline-offset: 4px; }
    .table-wrap { overflow: auto; border: 1px solid #d7d0c0; border-radius: 8px; background: #fffdf7; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    td, th { padding: 12px 16px; border-bottom: 1px solid #e6e0d4; }
    th { background: #efeadf; font-size: .875rem; }
    tr:last-child td { border-bottom: 0; }
    .phone { white-space: nowrap; font-variant-numeric: tabular-nums; }
    .empty { background: #fffdf7; border: 1px solid #d7d0c0; border-radius: 8px; padding: 24px; }
    @media (max-width: 520px) { main { margin: 28px auto; } td, th { padding: 10px; } }
  </style>
</head>
<body>
  <main>
    <header>
      <div>
        <p class="brand">Shaveers</p>
        <h1>Waitlist signups</h1>
        ${unavailable ? '' : `<p class="count">${count.toLocaleString('en-PK')} ${count === 1 ? 'signup' : 'signups'}</p>`}
      </div>
      ${unavailable ? '' : '<a class="button" href="?download=csv">Download CSV</a>'}
    </header>
    ${unavailable ? '<p class="empty">The list could not load. Refresh the page to try again.</p>' : list}
  </main>
</body>
</html>`;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'");

  // Vercel Authentication protects the branch alias. Refuse all other hosts and environments.
  const branchHost = process.env.VERCEL_BRANCH_URL;
  if (!branchHost || req.headers.host !== branchHost || process.env.VERCEL_ENV !== 'preview'
    || process.env.VERCEL_GIT_COMMIT_REF !== 'waitlist-dashboard') {
    return res.status(404).send('Not found');
  }
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send('Method not allowed');
  }

  try {
    const records = await readWaitlist();
    const url = new URL(req.url, 'https://waitlist.invalid');
    if (url.searchParams.get('download') === 'csv') {
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="shaveers-waitlist.csv"');
      return res.status(200).send(waitlistCsv(records));
    }
    const html = page({ records });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(503).send(page({ records: [], unavailable: true }));
  }
}
