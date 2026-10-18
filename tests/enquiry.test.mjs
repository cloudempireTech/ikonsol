import test from 'node:test';
import assert from 'node:assert/strict';
import { handler } from '../netlify/functions/enquiry.mjs';
import { siteConfig } from '../site-config.mjs';

let nextIp = 1;
const request = (overrides = {}) => ({
  httpMethod: 'POST',
  headers: { 'content-type': 'application/json', origin: 'https://ikonsol.co.in', host: 'ikonsol.co.in', 'x-nf-client-connection-ip': `test-${nextIp++}` },
  body: JSON.stringify({ name: 'Test Student', phone: '+91 90000 00000', email: 'student@example.com', course: 'Engineering', message: 'Please send course information.', startedAt: Date.now() - 5000, website: '', ...overrides }),
});

test('valid enquiry is delivered to the reference-verified mailbox', async () => {
  const original = globalThis.fetch;
  process.env.RESEND_API_KEY = 'test-key';
  process.env.RESEND_FROM_EMAIL = 'IKONSOL <enquiries@ikonsol.co.in>';
  let payload;
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    assert.equal(options.headers.Authorization, 'Bearer test-key');
    payload = JSON.parse(options.body);
    return { ok: true };
  };
  try {
    const result = await handler(request());
    assert.equal(result.statusCode, 200);
    assert.deepEqual(payload.to, [siteConfig.email]);
    assert.match(payload.text, /Please send course information/);
  } finally { globalThis.fetch = original; }
});

test('invalid contact and spam trap are rejected before delivery', async () => {
  const invalid = await handler(request({ phone: '', email: '' }));
  assert.equal(invalid.statusCode, 400);
  const trap = await handler(request({ website: 'spam.example' }));
  assert.equal(trap.statusCode, 200);
});

test('provider failure returns a clear error', async () => {
  const original = globalThis.fetch;
  process.env.RESEND_API_KEY = 'test-key';
  process.env.RESEND_FROM_EMAIL = 'IKONSOL <enquiries@ikonsol.co.in>';
  globalThis.fetch = async () => ({ ok: false });
  try {
    const result = await handler(request());
    assert.equal(result.statusCode, 502);
    assert.match(JSON.parse(result.body).message, /could not send/);
  } finally { globalThis.fetch = original; }
});
