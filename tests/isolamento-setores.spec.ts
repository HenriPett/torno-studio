import { expect, test, type APIRequestContext } from '@playwright/test';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { checkSectorIsolation } from '../scripts/check-sector-isolation.mjs';

/**
 * Isolamento das landings de setor (docs/estrategia-2026-11-torno-industria.md §7.2), contra o preview do dist/.
 * 1. Um crawler parte de /, /en/, dos blogs, do llms.txt, do robots.txt e dos sitemaps, segue links internos
 *    (HTML, Markdown, XML, TXT) e falha se alcançar ou citar qualquer /para/.
 * 2. Cada landing existente (dist/para/<slug>/index.html) é noindex, sem canonical/hreflang e não linka outra.
 * O build já roda a mesma regra sobre os arquivos (scripts/check-sector-isolation.mjs); aqui é o site servido.
 */

const SEEDS = ['/', '/en/', '/blog/', '/en/blog/', '/llms.txt', '/robots.txt', '/sitemap-index.xml'];
const OWN_HOST = /^(?:[a-z0-9-]+\.)*(?:tornostudio\.com|netlify\.app)$|^localhost$|^127\.0\.0\.1$/i;
const PARA = /^\/para(?:\/|$)/;
const FOLLOW = /(?:\/|\.html|\.md|\.xml|\.txt)$/;
const MAX_PAGES = 800;

/** URLs em atributos HTML, <loc> de XML e links Markdown/llms.txt. */
function urlsIn(body: string): string[] {
  const out: string[] = [];
  for (const m of body.matchAll(/\s(?:href|src|action|content|poster)\s*=\s*["']([^"']+)["']/gi)) out.push(m[1]!);
  for (const m of body.matchAll(/\ssrcset\s*=\s*["']([^"']+)["']/gi)) out.push(...m[1]!.split(',').map((p) => p.trim().split(/\s+/)[0]!));
  for (const m of body.matchAll(/<loc>([^<]+)<\/loc>/g)) out.push(m[1]!);
  for (const m of body.matchAll(/\]\(([^)\s]+)\)/g)) out.push(m[1]!);
  for (const m of body.matchAll(/^(?:Sitemap|Allow|Disallow):\s*(\S+)/gim)) out.push(m[1]!);
  return out;
}

/** Caminho interno (o site servido ou o domínio de produção), ou null para externo/não navegável. */
function internalPath(raw: string, from: URL): string | null {
  const value = raw.trim().replace(/&amp;/g, '&');
  if (!value || /^(?:mailto|tel|data|javascript):/i.test(value)) return null;
  let url: URL;
  try { url = new URL(value, from); } catch { return null; }
  if (url.origin !== from.origin && !OWN_HOST.test(url.hostname)) return null;
  try { return decodeURIComponent(url.pathname); } catch { return url.pathname; }
}

/** Menções textuais a /para/ do próprio site (ignora URLs absolutas de outros domínios). */
function textMentions(body: string): string[] {
  const found: string[] = [];
  for (const m of body.matchAll(/((?:https?:)?\/\/[^\s"'<>()\\]*?)?(?:\\\/|\/|%2F)para(?:\\\/|\/|%2F)/gi)) {
    if (m[1]) {
      try { if (!OWN_HOST.test(new URL(m[1].startsWith('//') ? `https:${m[1]}` : m[1]).hostname)) continue; } catch { /* conta */ }
    }
    found.push(body.slice(Math.max(0, (m.index ?? 0) - 40), (m.index ?? 0) + 40).replace(/\s+/g, ' '));
  }
  return found;
}

async function crawl(request: APIRequestContext, baseURL: string) {
  const seen = new Set<string>();
  const queue = [...SEEDS];
  const leaks: string[] = [];
  while (queue.length && seen.size < MAX_PAGES) {
    const path = queue.shift()!;
    if (seen.has(path)) continue;
    seen.add(path);
    const res = await request.get(path, { maxRedirects: 0 });
    const location = res.headers()['location'];
    if (location) {
      const next = internalPath(location, new URL(path, baseURL));
      if (next && PARA.test(next)) leaks.push(`${path} redireciona para ${next}`);
      else if (next) queue.push(next);
      continue;
    }
    if (!res.ok()) continue;
    const type = res.headers()['content-type'] ?? '';
    if (!/text\/|xml|markdown/.test(type)) continue;
    const body = await res.text();
    const from = new URL(path, baseURL);
    for (const mention of textMentions(body)) leaks.push(`${path} cita /para/: …${mention}…`);
    for (const raw of urlsIn(body)) {
      const target = internalPath(raw, from);
      if (!target) continue;
      if (PARA.test(target)) { leaks.push(`${path} linka ${target}`); continue; }
      if (target.startsWith('/_astro/') || target.startsWith('/og/')) continue;
      if (FOLLOW.test(target) && !seen.has(target)) queue.push(target);
    }
  }
  return { seen, leaks: [...new Set(leaks)] };
}

test('crawler a partir de /, /en/, blogs, llms.txt, robots.txt e sitemaps nunca alcança /para/', async ({ request, baseURL }) => {
  test.setTimeout(240_000);
  const { seen, leaks } = await crawl(request, baseURL!);
  expect(seen.size, 'o crawler precisa ter visitado o site').toBeGreaterThan(20);
  for (const seed of SEEDS) expect(seen.has(seed)).toBe(true);
  expect(leaks).toEqual([]);
});

test('/para/ não tem índice (404)', async ({ request }) => {
  expect((await request.get('/para/')).status()).toBe(404);
});

test('robots.txt não revela /para/ e sitemap não lista landings', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).not.toMatch(/para/i);
  const index = await (await request.get('/sitemap-index.xml')).text();
  for (const [, loc] of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const xml = await (await request.get(new URL(loc!).pathname)).text();
    expect(xml).not.toMatch(/\/para\//);
  }
});

/** Landings existentes no build (criadas por src/pages/para/<slug>.astro). */
async function landings(): Promise<string[]> {
  try {
    const dirs = await readdir(resolve('dist/para'), { withFileTypes: true });
    const slugs: string[] = [];
    for (const dir of dirs) {
      if (!dir.isDirectory()) continue;
      try { await readFile(resolve('dist/para', dir.name, 'index.html')); slugs.push(dir.name); } catch { /* sem página */ }
    }
    return slugs.sort();
  } catch {
    return [];
  }
}

test('cada landing: 200, noindex, sem canonical/hreflang/Markdown e sem link para outra landing', async ({ request, baseURL }) => {
  const slugs = await landings();
  // Sem landings no build: nada a checar (o teste passa vazio).
  for (const slug of slugs) {
    const path = `/para/${slug}/`;
    expect(slug).toMatch(/^[a-z-]+$/);
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    const html = await res.text();
    const head = html.split('</head>')[0] ?? '';
    expect(head, `${path} robots`).toMatch(/<meta name="robots" content="[^"]*noindex[^"]*"/);
    expect(head, `${path} canonical`).not.toMatch(/rel="canonical"/);
    expect(head, `${path} hreflang`).not.toMatch(/hreflang=/);
    expect(head, `${path} Markdown`).not.toMatch(/type="text\/markdown"/);
    const others = urlsIn(html)
      .map((raw) => internalPath(raw, new URL(path, baseURL)))
      .filter((target): target is string => Boolean(target && PARA.test(target) && target.split('/')[2] !== slug));
    expect(others, `${path} não pode linkar outra landing`).toEqual([]);
    const otherSlugs = slugs.filter((s) => s !== slug);
    for (const other of otherSlugs) expect(html, `${path} cita /para/${other}/`).not.toContain(`/para/${other}/`);
    expect((await request.get(`${path}index.md`)).status(), `${path} sem .md`).toBe(404);
  }
});

test('netlify.toml manda X-Robots-Tag noindex, nofollow para /para/*', async () => {
  const toml = await readFile(resolve('netlify.toml'), 'utf8');
  expect(toml).toMatch(/for = "\/para\/\*"\s*\n\s*\[headers\.values\]\s*\n\s*X-Robots-Tag = "noindex, nofollow"/);
});

test('verificador do build (scripts/check-sector-isolation.mjs) acusa cada tipo de violação', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'isolamento-'));
  const page = (robots: string, body: string, head = '') => `<!doctype html><html><head>${robots ? `<meta name="robots" content="${robots}">` : ''}${head}</head><body>${body}</body></html>`;
  try {
    await mkdir(join(dir, 'para/a'), { recursive: true });
    await mkdir(join(dir, 'para/b'), { recursive: true });
    await writeFile(join(dir, 'para/a/index.html'), page('noindex, nofollow', '<a href="/">home</a><a href="/para/a/#faq">self</a><a href="https://www.gov.br/para/x">fonte externa</a>'));
    await writeFile(join(dir, 'para/b/index.html'), page('noindex, nofollow', '<a href="/cases/">cases</a>'));
    await writeFile(join(dir, 'index.html'), page('', '<a href="/about/">sobre</a>'));
    await writeFile(join(dir, 'llms.txt'), '- [Home](https://tornostudio.com/index.md)\n');
    expect((await checkSectorIsolation(dir)).errors).toEqual([]);

    await writeFile(join(dir, 'index.html'), page('', '<a href="para/a/">x</a><script type="application/ld+json">{"url":"https://tornostudio.com/para/b/"}</script>'));
    await writeFile(join(dir, 'sitemap-0.xml'), '<urlset><url><loc>https://tornostudio.com/para/a/</loc></url></urlset>');
    await writeFile(join(dir, 'para/a/index.html'), page('noindex, nofollow', '<a href="/para/b/">outra</a>'));
    await writeFile(join(dir, 'para/b/index.html'), page('', 'x', '<link rel="canonical" href="https://tornostudio.com/para/b/"><link rel="alternate" hreflang="en" href="/en/">'));
    await writeFile(join(dir, 'para/index.html'), 'x');
    await writeFile(join(dir, 'para/b/index.md'), '# b');
    const { errors } = await checkSectorIsolation(dir);
    const has = (re: RegExp) => expect(errors.some((e) => re.test(e)), `${re}\n${errors.join('\n')}`).toBe(true);
    has(/^\(a\) dist\/index\.html aponta para \/para\/a\//);
    has(/^\(a\) dist\/index\.html cita \/para\/ em texto/);
    has(/^\(a\) dist\/sitemap-0\.xml/);
    has(/^\(b\) dist\/para\/a\/index\.html .* \/para\/b\//);
    has(/^\(c\) dist\/para\/b\/index\.html: falta <meta name="robots"/);
    has(/^\(c\) dist\/para\/b\/index\.html: .*canonical/);
    has(/^\(c\) dist\/para\/b\/index\.html: .*hreflang/);
    has(/^\(c\) dist\/para\/b\/index\.md/);
    has(/^\(d\) dist\/para\/index\.html/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
