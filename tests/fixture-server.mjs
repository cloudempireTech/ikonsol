/** Local browser-test fixture. It never calls the live mail provider. */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, join, extname } from 'node:path';
import { handler } from '../netlify/functions/enquiry.mjs';

process.env.RESEND_API_KEY = 'browser-test-only';
process.env.RESEND_FROM_EMAIL = 'IKONSOL Test <test@ikonsol.co.in>';
globalThis.fetch = async (url, options) => {
  if (url !== 'https://api.resend.com/emails') throw new Error('Unexpected provider URL');
  const body = JSON.parse(options.body);
  console.log(`MOCK DELIVERY to=${body.to.join(',')} subject=${body.subject}`);
  return { ok: true };
};

const root = resolve('dist');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4' };
createServer(async (req, res) => {
  if (req.url === '/.netlify/functions/enquiry') {
    let body = '';
    for await (const chunk of req) body += chunk;
    const answer = await handler({ httpMethod: req.method, headers: req.headers, body });
    res.writeHead(answer.statusCode, answer.headers);
    res.end(answer.body);
    return;
  }
  const path = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  const file = resolve(join(root, path.replace(/^\//, '')));
  if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
  try { const bytes = await readFile(file); res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }); res.end(bytes); }
  catch { res.writeHead(404); res.end(); }
}).listen(4174, '127.0.0.1', () => console.log('Browser fixture: http://127.0.0.1:4174'));
