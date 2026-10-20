import { expect, test } from '@playwright/test';
import handler, { prefersMarkdown, varyAccept } from '../netlify/edge-functions/agent-content';
import { mainMarkdown } from '../scripts/agent-markdown.mjs';

for (const [accept, expected] of [
  [null, false], ['*/*', false], ['text/*', false], ['text/html', false],
  ['text/markdown', true], ['TEXT/MARKDOWN', true],
  ['text/markdown;q=0,text/*;q=1', false], ['text/markdown;Q=0,*/*;q=1', false],
  ['text/markdown;q=0.1,text/html;q=1', false], ['text/markdown;q=1,text/html;q=0.1', true],
  ['text/markdown;q=0.4,text/html;q=0.8,*/*;q=1', false],
  ['text/markdown;profile="x,y";q=0,text/html;q=1', false],
  ['text/markdown;profile="x;y";q=1,text/html;q=0.5', false],
  ['text/markdown;charset="utf-8";q=1,text/html;q=0.5', true],
  ['text/markdown;profile=unsupported', false],
  ['text/markdown;q=bogus', false], ['text/markdown;q=1.1', false],
] as const) test(`Accept ${accept} => markdown ${expected}`, () => expect(prefersMarkdown(accept)).toBe(expected));

test('Vary preserves existing values and is idempotent', () => {
  const h = new Headers({ Vary: 'Accept-Encoding' });
  varyAccept(h); varyAccept(h);
  expect(h.get('vary')).toBe('Accept-Encoding, Accept');
  const wildcard = new Headers({ Vary: '*' }); varyAccept(wildcard);
  expect(wildcard.get('vary')).toBe('*');
});

test('conversion keeps rendered headings, links, tables and excludes unrelated markup', () => {
  const md = mainMarkdown('<title>Torno Studio | Service</title><header>navigation</header><main><h1>Service</h1><p>Useful <a href="/contact/">contact</a></p><table><tr><th>Plan</th><th>Price</th></tr><tr><td>Sprint</td><td>6000</td></tr></table><script>secret()</script><p hidden>hidden</p></main><footer>footer</footer>', 'https://tornostudio.com/');
  expect(md).toContain('> Torno Studio | Service'); expect(md).toContain('# Service'); expect(md).toContain('[contact](https://tornostudio.com/contact/)');
  expect(md).toMatch(/\| Plan\s+\| Price/); expect(md).toContain('6000');
  expect(md).not.toMatch(/navigation|secret|hidden|footer/);
});

const original = (status = 200, type = 'text/html') => new Response('<h1>HTML</h1>', { status, headers: {
  'content-type': type, Vary: 'Accept-Encoding', ETag: 'html-only', 'Content-Encoding': 'gzip',
  'Content-Length': '99', 'Content-Security-Policy': "default-src 'self'",
} });
const req = (path = '/', accept = 'text/markdown', method = 'GET') => new Request(`https://tornostudio.com${path}`, { method, headers: { Accept: accept } });

test('negotiated Markdown uses static public bytes, preserves security and removes HTML validators', async () => {
  const saved = globalThis.fetch;
  let fetched = '';
  globalThis.fetch = async (url) => { fetched = String(url); return new Response('# Published content with complete public details\n', { headers: { 'Content-Type': 'text/markdown' } }); };
  try {
    const r = await handler(req(), { next: async () => original() });
    expect(r.status).toBe(200); expect(r.headers.get('content-type')).toContain('text/markdown');
    expect(r.headers.get('vary')).toBe('Accept-Encoding, Accept');
    expect(r.headers.get('content-security-policy')).toBe("default-src 'self'");
    for (const h of ['etag', 'content-encoding', 'content-length']) expect(r.headers.get(h)).toBeNull();
    expect(await r.text()).toBe('# Published content with complete public details\n'); expect(fetched).toBe('https://tornostudio.com/index.md');
  } finally { globalThis.fetch = saved; }
});

test('404 stays 404 in both formats; Markdown explains error and provides discovery links', async () => {
  for (const accept of ['text/html', 'text/markdown']) {
    const r = await handler(req('/unknown', accept), { next: async () => original(404) });
    expect(r.status).toBe(404); expect(r.headers.get('vary')).toContain('Accept');
    const body = await r.text();
    if (accept === 'text/markdown') {
      expect(body.length).toBeGreaterThan(20); expect(body).toContain('](/llms.txt)');
      expect(r.headers.get('content-type')).toContain('text/markdown'); expect(r.headers.get('x-robots-tag')).toBe('noindex');
    } else expect(body).toContain('<h1>HTML</h1>');
  }
});

test('existing machine files/assets, redirects and POST keep their original responses', async () => {
  for (const [path, type] of [['/robots.txt', 'text/plain'], ['/sitemap-0.xml', 'application/xml'], ['/llms.txt', 'text/plain'], ['/asset.css', 'text/css'], ['/asset.js', 'text/javascript'], ['/og/pt-BR.png', 'image/png'], ['/index.md', 'text/markdown']]) {
    const response = original(200, type); expect(await handler(req(path), { next: async () => response })).toBe(response);
  }
  const redirect = new Response(null, { status: 301, headers: { Location: '/privacidade/' } });
  expect(await handler(req('/privacy/'), { next: async () => redirect })).toBe(redirect);
  const post = original(405); expect(await handler(req('/', 'text/markdown', 'POST'), { next: async () => post })).toBe(post);
});

test('HEAD has no body for negotiated home and 404', async () => {
  const saved = globalThis.fetch; globalThis.fetch = async () => new Response('# Published content longer than twenty characters', { headers: { 'Content-Type': 'text/markdown' } });
  try {
    for (const status of [200, 404]) for (const accept of ['text/markdown', 'text/html']) {
      const r = await handler(req('/', accept, 'HEAD'), { next: async () => original(status) });
      expect(r.status).toBe(status); expect(await r.text()).toBe('');
    }
  } finally { globalThis.fetch = saved; }
});

test('missing generated Markdown is an explicit temporary failure, never a false success', async () => {
  const saved = globalThis.fetch; globalThis.fetch = async () => new Response('missing', { status: 404 });
  try { expect((await handler(req(), { next: async () => original() })).status).toBe(503); }
  finally { globalThis.fetch = saved; }
});


test('internal failure keeps security/Vary and no body on HEAD; rejects HTML and failed fetch', async () => {
  const saved = globalThis.fetch;
  try {
    for (const failure of ['404', 'html', 'network', 'empty']) for (const method of ['GET', 'HEAD']) {
      globalThis.fetch = async () => {
        if (failure === 'network') throw new Error('offline');
        return new Response(failure === 'empty' ? '' : 'unexpected', { status: failure === '404' ? 404 : 200, headers: { 'Content-Type': failure === 'html' ? 'text/html' : 'text/markdown' } });
      };
      const r = await handler(req('/', 'text/markdown', method), { next: async () => original() });
      expect(r.status).toBe(503); expect(r.headers.get('vary')).toBe('Accept-Encoding, Accept');
      expect(r.headers.get('content-security-policy')).toBe("default-src 'self'");
      expect(r.headers.get('etag')).toBeNull(); expect(r.headers.get('content-encoding')).toBeNull();
      if (method === 'HEAD') expect(await r.text()).toBe('');
    }
  } finally { globalThis.fetch = saved; }
});


test('negotiated representation preserves HTML noindex for campaign/preview pages', async () => {
  const saved = globalThis.fetch;
  globalThis.fetch = async () => new Response('# Complete public content for the page', { headers: { 'Content-Type': 'text/markdown' } });
  try {
    const r = await handler(req('/diagnostico/'), { next: async () => new Response('<meta name="robots" content="noindex, follow"><main>Campaign</main>', { headers: { 'Content-Type': 'text/html' } }) });
    expect(r.headers.get('x-robots-tag')).toBe('noindex, follow');
  } finally { globalThis.fetch = saved; }
});
