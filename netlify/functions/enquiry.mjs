import { siteConfig } from '../../site-config.mjs';

const requests = new Map();
const json = (statusCode, data) => ({ statusCode, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, body: JSON.stringify(data) });
const clean = (value, limit) => typeof value === 'string' ? value.trim().slice(0, limit) : '';
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validPhone = (value) => /^[+\d\s()-]{7,20}$/.test(value);
const allowedCourses = new Set(['General courses', 'Engineering', 'Management', 'Agriculture', 'Paramedical', 'Computer applications', 'Law', 'Certificate courses', 'Hotel management', 'Other / unsure']);

export async function handler(event) {
  if (event.httpMethod !== 'POST') return json(405, { ok: false, message: 'Use the enquiry form to send a message.' });
  const headers = Object.fromEntries(Object.entries(event.headers || {}).map(([key, value]) => [key.toLowerCase(), value]));
  const origin = headers.origin;
  const host = headers['x-forwarded-host'] || headers.host;
  if (origin && host) {
    try { if (new URL(origin).host !== host) return json(403, { ok: false, message: 'Request origin is not allowed.' }); }
    catch { return json(403, { ok: false, message: 'Request origin is not allowed.' }); }
  }
  if (!headers['content-type']?.startsWith('application/json') || (event.body || '').length > 12000) return json(415, { ok: false, message: 'Invalid enquiry format.' });
  let body;
  try { body = JSON.parse(event.body || ''); }
  catch { return json(400, { ok: false, message: 'Invalid enquiry format.' }); }
  if (body.website) return json(200, { ok: true }); // Honeypot: do not reveal why this was ignored.
  const elapsed = Date.now() - Number(body.startedAt);
  if (!Number.isFinite(elapsed) || elapsed < 2000 || elapsed > 86400000) return json(400, { ok: false, message: 'Please refresh the page and try again.' });
  const name = clean(body.name, 100);
  const phone = clean(body.phone, 20);
  const email = clean(body.email, 254);
  const course = clean(body.course, 60);
  const message = clean(body.message, 2000);
  if (name.length < 2 || (!phone && !email) || (phone && !validPhone(phone)) || (email && !validEmail(email)) || !allowedCourses.has(course) || message.length < 10) return json(400, { ok: false, message: 'Please check the required fields and contact details.' });
  const ip = headers['x-nf-client-connection-ip'] || headers['x-forwarded-for']?.split(',')[0] || 'unknown';
  const now = Date.now();
  const recent = (requests.get(ip) || []).filter((time) => now - time < 3600000);
  if (recent.length >= 5) return json(429, { ok: false, message: 'Too many enquiries. Please try again later or call us.' });
  recent.push(now);
  requests.set(ip, recent);
  if (requests.size > 1000) for (const [key, times] of requests) if (times.every((time) => now - time >= 3600000)) requests.delete(key);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return json(503, { ok: false, message: 'Online enquiries are temporarily unavailable.' });
  const lines = [`New IKONSOL website enquiry`, `Name: ${name}`, `Phone: ${phone || 'Not provided'}`, `Email: ${email || 'Not provided'}`, `Course: ${course}`, '', message];
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [siteConfig.email], subject: `IKONSOL enquiry: ${course}`, text: lines.join('\n'), ...(email ? { reply_to: email } : {}) }),
    });
    if (!response.ok) return json(502, { ok: false, message: 'We could not send your enquiry. Please call or WhatsApp us.' });
    return json(200, { ok: true });
  } catch {
    return json(502, { ok: false, message: 'We could not send your enquiry. Please call or WhatsApp us.' });
  }
}
