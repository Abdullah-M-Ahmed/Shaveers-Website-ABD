import { get, list } from '@vercel/blob';

const columns = ['phone_e164', 'consent_at', 'consent_channel', 'legal_version', 'source'];

export async function readWaitlist(signal = AbortSignal.timeout(20000)) {
  const records = [];
  let cursor;

  do {
    const page = await list({ prefix: 'registrations/', limit: 25, cursor, abortSignal: signal });
    const batch = await Promise.all(page.blobs.map(async ({ url }) => {
      const result = await get(url, { access: 'private', useCache: false, abortSignal: signal });
      return result?.statusCode === 200 ? new Response(result.stream).json() : null;
    }));
    records.push(...batch.filter(Boolean));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return records.sort((first, second) => second.consent_at.localeCompare(first.consent_at));
}

function spreadsheetCell(value) {
  const text = String(value ?? '');
  const safe = /^[\s]*[=+\-@]|^[\t\r\n]/.test(text) ? "'" + text : text;
  return '"' + safe.replaceAll('"', '""') + '"';
}

export function waitlistCsv(records) {
  const rows = records.map((record) => columns.map((column) => spreadsheetCell(record[column])).join(','));
  return [columns.join(','), ...rows].join('\r\n') + '\r\n';
}
