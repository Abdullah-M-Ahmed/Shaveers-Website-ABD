import { get, list } from '@vercel/blob';

const columns = ['phone_e164', 'consent_at', 'consent_channel', 'legal_version', 'source'];
const csvCell = (value) => '"' + String(value).replaceAll('"', '""') + '"';
const records = [];
let cursor;

do {
  const page = await list({ prefix: 'registrations/', limit: 50, cursor });
  const batch = await Promise.all(page.blobs.map(async ({ pathname }) => {
    const result = await get(pathname, { access: 'private', useCache: false });
    return result?.statusCode === 200 ? new Response(result.stream).json() : null;
  }));
  records.push(...batch.filter(Boolean));
  cursor = page.hasMore ? page.cursor : undefined;
} while (cursor);

records.sort((first, second) => second.consent_at.localeCompare(first.consent_at));
process.stdout.write(columns.join(',') + '\n');
for (const record of records) {
  const row = columns.map((column) => {
    const value = record[column] ?? '';
    return csvCell(column === 'phone_e164' && value.startsWith('+') ? "'" + value : value);
  });
  process.stdout.write(row.join(',') + '\n');
}
