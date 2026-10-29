import assert from 'node:assert/strict';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import tls from 'node:tls';

// Run against a real Netlify deploy: Astro preview cannot execute Edge Functions.
const origin = process.env.AGENT_BASE_URL || 'https://tornostudio.com';
const report = { origin, checkedAt: new Date().toISOString(), checks: [] };
const record = (name, detail) => { report.checks.push({ name, ...detail }); console.log(`PASS ${name}`); };
async function get(path, accept, status = 200) {
  const response = await fetch(new URL(path, origin), { headers: accept ? { Accept: accept } : {}, redirect: 'follow' });
  const body = await response.text();
  assert.equal(response.status, status, `${path} Accept=${accept}: ${response.status}`);
  return { response, body };
}
const hasVary = r => assert.match(r.headers.get('vary') || '', /(?:^|,)\s*accept\s*(?:,|$)/i);
const assertMd = (r, body) => { assert.match(r.headers.get('content-type') || '', /^text\/markdown(?:;|$)/i); assert(body.trim().length >= 20); assert(!/^\s*<!doctype|<html[ >]/i.test(body)); };
const assertHtml = (r, body) => { assert.match(r.headers.get('content-type') || '', /^text\/html(?:;|$)/i); assert.match(body, /<h1[ >]/i); };

for (const [accept, md] of [
  ['text/markdown', true], ['text/html', false], ['text/markdown', true],
  ['*/*', false], [null, false], ['TEXT/MARKDOWN', true],
  ['text/markdown;q=0,text/*;q=1', false], ['text/markdown;Q=0,*/*;q=1', false],
  ['text/markdown;q=0.1,text/html;q=1', false], ['text/markdown;q=1,text/html;q=0.1', true],
  ['text/markdown;profile="x,y";q=0,text/html;q=1', false],
  ['text/html', false], ['text/markdown', true], ['text/html', false],
]) {
  const { response, body } = await get('/', accept); hasVary(response);
  (md ? assertMd : assertHtml)(response, body); assert(body.includes('Torno Studio'));
  record(`home negotiation ${accept}`, { status: response.status, type: response.headers.get('content-type'), vary: response.headers.get('vary') });
}

const files = (await readdir(resolve('dist'), { recursive: true })).filter(f => f.endsWith('.html'));
for (const file of files) {
  const path = `/${file.endsWith('index.html') ? file.slice(0, -10) : file}`;
  for (const accept of ['text/html', 'text/markdown']) {
    const { response, body } = await get(path, accept); hasVary(response);
    (accept === 'text/html' ? assertHtml : assertMd)(response, body);
    if (accept === 'text/markdown') {
      const expected = await readFile(resolve('dist', file.replace(/\.html$/, '.md')), 'utf8');
      assert.equal(body, expected, `Markdown byte parity: ${path}`);
      if (path === '/diagnostico/') assert.match(response.headers.get('x-robots-tag') || '', /noindex/);
    }
    record(`${path} ${accept}`, { status: response.status, chars: body.length });
  }
  const { response, body } = await get(`/${file.replace(/\.html$/, '.md')}`, 'text/markdown');
  assertMd(response, body); record(`${path} direct Markdown`, { status: response.status, chars: body.length });
}

for (const accept of ['text/markdown', 'text/html']) {
  const { response, body } = await get('/__ora-404-probe-torno-agent-readiness-20261020', accept, 404); hasVary(response);
  (accept === 'text/html' ? assertHtml : assertMd)(response, body);
  if (accept === 'text/markdown') { assert(body.includes('](/llms.txt)')); assert.match(response.headers.get('x-robots-tag') || '', /noindex/); }
  record(`404 ${accept}`, { status: response.status, chars: body.length });
}

for (const path of ['/privacy', '/privacy/']) {
  const first = await fetch(new URL(path, origin), { redirect: 'manual', headers: { Accept: 'text/markdown' } });
  assert.equal(first.status, 301); assert.equal(new URL(first.headers.get('location'), origin).pathname, '/privacidade/');
  const { response, body } = await get(path, 'text/markdown'); assertMd(response, body); assert.equal(new URL(response.url).pathname, '/privacidade/');
  record(`${path} policy redirect`, { status: first.status, final: response.url });
}

for (const [path, mime] of [['/robots.txt', 'text/plain'], ['/llms.txt', 'text/plain'], ['/sitemap-index.xml', 'xml'], ['/sitemap-0.xml', 'xml'], ['/favicon.svg', 'image/svg+xml'], ['/og/pt-BR.png', 'image/png']]) {
  const { response, body } = await get(path, 'text/markdown');
  assert((response.headers.get('content-type') || '').includes(mime), `${path} MIME`); assert(body.length > 20);
  if (path === '/llms.txt') for (const [, href] of body.matchAll(/\]\((https:\/\/[^)]+)\)/g)) { const linked = await get(new URL(href).pathname, 'text/markdown'); assert(linked.body.length > 20); }
  record(`${path} preserves machine/asset response`, { type: response.headers.get('content-type'), chars: body.length });
}
// Per-article social images must resolve as real images, never negotiated Markdown.
const articleImages = (await readdir(resolve('dist/og/blog'))).filter(file => file.endsWith('.png'));
for (const file of articleImages) {
  const path = `/og/blog/${file}`;
  const response = await fetch(new URL(path, origin), { headers: { Accept: 'text/markdown' } });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') || '', /^image\/png/);
  const png = Buffer.from(await response.arrayBuffer());
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(png.readUInt32BE(16), 1200); assert.equal(png.readUInt32BE(20), 630);
  record(`article image ${file}`, { status: response.status, bytes: png.length });
}

// Existing hashed CSS, JS, font and images retain their bytes/MIME under Accept: Markdown.
const assets = (await readdir(resolve('dist/_astro'))).filter(f => /\.(?:css|js|woff2|avif)$/.test(f));
for (const extension of ['css','js','woff2','avif']) {
  const asset = assets.find(f => f.endsWith(`.${extension}`)); assert(asset);
  const response = await fetch(new URL(`/_astro/${asset}`, origin), { headers: { Accept: 'text/markdown' } });
  assert.equal(response.status, 200); assert(!(response.headers.get('content-type') || '').includes('text/markdown'));
  const actual = Buffer.from(await response.arrayBuffer());
  const htmlVariant = await fetch(new URL(`/_astro/${asset}`, origin), { headers: { Accept: 'text/html' } });
  assert.equal(htmlVariant.status, 200);
  assert.deepEqual(actual, Buffer.from(await htmlVariant.arrayBuffer()), 'Asset bytes must be identical for HTML/Markdown clients');
  assert.equal(response.headers.get('content-type'), htmlVariant.headers.get('content-type'));
  record(`asset .${extension}`, { type: response.headers.get('content-type'), bytes: actual.length });
}

function rawHead(path, accept) {
  const url = new URL(path, origin);
  return new Promise((resolveHead, reject) => {
    const chunks = [];
    const socket = tls.connect({ host: url.hostname, port: Number(url.port) || 443, servername: url.hostname, ALPNProtocols: ['http/1.1'] }, () => socket.write(`HEAD ${url.pathname} HTTP/1.1\r\nHost: ${url.host}\r\nAccept: ${accept}\r\nConnection: close\r\n\r\n`));
    socket.setTimeout(15000, () => socket.destroy(new Error('HEAD timeout')));
    socket.on('data', c => chunks.push(c)); socket.on('error', reject);
    socket.on('end', () => resolveHead(Buffer.concat(chunks).toString()));
  });
}
for (const path of ['/', '/__ora-404-probe-torno-agent-readiness-20261020']) for (const accept of ['text/html','text/markdown']) {
  const wire = await rawHead(path, accept); const boundary = wire.indexOf('\r\n\r\n'); assert(boundary > 0);
  const headers = wire.slice(0, boundary); const body = wire.slice(boundary + 4);
  assert.match(headers, path === '/' ? /^HTTP\/1\.1 200/ : /^HTTP\/1\.1 404/); assert.equal(body.length, 0, 'HEAD sent body bytes');
  assert(headers.toLowerCase().includes(`content-type: ${accept}`));
  record(`wire HEAD ${path} ${accept}`, { bodyBytes: body.length });
}
if (process.env.AGENT_REPORT_PATH) await writeFile(process.env.AGENT_REPORT_PATH, JSON.stringify(report, null, 2));
console.log(`RESULT ${report.checks.length} checks passed; ${files.length} public HTML/negotiated/direct Markdown pages verified.`);
