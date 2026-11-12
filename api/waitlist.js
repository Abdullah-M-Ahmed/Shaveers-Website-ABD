import { createHmac } from 'node:crypto';
import { put } from '@vercel/blob';

const LEGAL_VERSION = '2026-11-12';

function normalizePhone(value) {
  if (typeof value !== 'string' || value.length > 40) return null;
  let p = value.replace(/[\s().-]/g, '');
  if (/^03\d{9}$/.test(p)) p = '+92' + p.slice(1);
  else if (/^3\d{9}$/.test(p)) p = '+92' + p;
  else if (/^923\d{9}$/.test(p)) p = '+' + p;
  if (!/^\+[1-9]\d{7,14}$/.test(p)) return null;
  if (p.startsWith('+92') && !/^\+923\d{9}$/.test(p)) return null;
  return p;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  if (req.headers['content-type']?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
    return res.status(415).json({ ok: false, error: 'JSON required' });
  }
  if (Number(req.headers['content-length'] || 0) > 2048) {
    return res.status(413).json({ ok: false, error: 'Invalid request' });
  }
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ ok: false, error: 'Invalid request' }); }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ ok: false, error: 'Invalid request' });
  }
  // Hidden honeypot catches basic bot submissions without saving anything.
  if (body.website) return res.status(200).json({ ok: true });
  const phone = normalizePhone(body.phone);
  if (!phone) return res.status(400).json({ ok: false, error: 'Invalid phone number' });
  if (body.consent !== true || body.legalVersion !== LEGAL_VERSION) {
    return res.status(400).json({ ok: false, error: 'Current terms and privacy consent required' });
  }
  const recordKey = process.env.WAITLIST_RECORD_KEY;
  if (!recordKey) {
    return res.status(503).json({ ok: false, error: 'Collector is not configured' });
  }
  try {
    const recordId = createHmac('sha256', recordKey).update(phone).digest('hex');
    const registration = {
      phone_e164: phone,
      consent_at: new Date().toISOString(),
      consent_channel: 'sms-whatsapp',
      legal_version: LEGAL_VERSION,
      source: 'launch-page',
    };
    await put(`registrations/${recordId}.json`, JSON.stringify(registration), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
    });
    // Same response for new and duplicate entries to avoid revealing registrations.
    return res.status(200).json({ ok: true });
  } catch {
    // Do not log phone numbers or connection-string details.
    return res.status(503).json({ ok: false, error: 'Unable to save right now' });
  }
}
