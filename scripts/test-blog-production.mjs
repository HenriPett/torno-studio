// Read-only HTTP QA comparing public pages with the supplied, tested release.
// Usage: node scripts/test-blog-production.mjs https://tornostudio.com /path/to/release-root
import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { parse } from 'parse5';
import {
  assert, attr, baselinePaths, blogIndices, links, origin,
  runChecks, sitemapUrls, tags,
} from './test-blog-common.mjs';

const base = new URL(process.argv[2] ?? origin);
assert(base.protocol === 'https:', 'produção deve usar HTTPS');
const releaseRoot = resolve(process.argv[3] ?? '.');
const dist = join(releaseRoot, 'dist');
const manifest = JSON.parse(await readFile(join(releaseRoot, '.astro/blog-manifest.json'), 'utf8'));
const entries = manifest.entries;
assert(entries.length === 5, `release deve ter cinco artigos; encontrados ${entries.length}`);
const expectedUrls = new Set([...baselinePaths, ...blogIndices, ...entries.map((entry) => entry.path)].map((path) => origin + path));
const checks = [];

checks.push(['índices públicos PT/EN: canonical self, indexáveis, idioma correto', async () => {
  for (const path of blogIndices) {
    const response = await fetch(new URL(path, base), { redirect: 'follow' });
    assert(response.status === 200, `${path} HTTP ${response.status}`);
    assert(!/noindex/i.test(response.headers.get('x-robots-tag') ?? ''), `${path} tem X-Robots-Tag noindex`);
    const doc = parse(await response.text());
    assert(attr(links(doc, 'canonical')[0], 'href') === origin + path, `${path} canonical incorreto`);
    assert(!tags(doc, 'meta').some((node) => attr(node, 'name') === 'robots' && /noindex/i.test(attr(node, 'content') ?? '')), `${path} tem meta noindex`);
    assert(attr(tags(doc, 'html')[0], 'lang') === (path.startsWith('/en/') ? 'en' : 'pt-BR'), `${path} lang incorreto`);
  }
}]);

checks.push(['sitemap preserva baseline e lista cada um dos cinco artigos uma vez', async () => {
  const index = await fetch(new URL('/sitemap-index.xml', base));
  assert(index.status === 200, `sitemap-index HTTP ${index.status}`);
  const paths = [...(await index.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const items = [];
  for (const path of paths) {
    const response = await fetch(new URL(path, base));
    assert(response.status === 200, `${path} HTTP ${response.status}`);
    items.push(...sitemapUrls(await response.text()));
  }
  const urls = items.map((item) => item.url);
  assert(urls.length === expectedUrls.size && new Set(urls).size === urls.length, `sitemap tem ${urls.length} URLs; esperado ${expectedUrls.size}`);
  for (const url of expectedUrls) assert(urls.includes(url), `sitemap sem ${url}`);
  for (const url of urls) assert(expectedUrls.has(url), `URL inesperada no sitemap: ${url}`);
}]);

for (const entry of entries) checks.push([`produção ${entry.path}: bytes do artefato e canonical`, async () => {
  const response = await fetch(new URL(entry.path, base), { redirect: 'follow' });
  assert(response.status === 200, `${entry.path} HTTP ${response.status}`);
  assert(!/noindex/i.test(response.headers.get('x-robots-tag') ?? ''), `${entry.path} tem X-Robots-Tag noindex`);
  const html = await response.text();
  const candidate = await readFile(join(dist, entry.path.slice(1), 'index.html'), 'utf8');
  assert(html === candidate, `${entry.path} difere dos bytes do artefato testado`);
  const doc = parse(html);
  assert(attr(links(doc, 'canonical')[0], 'href') === origin + entry.path, `${entry.path} canonical incorreto`);
  assert(!tags(doc, 'meta').some((node) => attr(node, 'name') === 'robots' && /noindex/i.test(attr(node, 'content') ?? '')), `${entry.path} tem meta noindex`);
}]);

await runChecks(checks);
