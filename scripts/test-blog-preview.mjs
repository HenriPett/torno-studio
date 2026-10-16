// Read-only QA of a deploy preview, compared to an already-built release.
// Usage: node scripts/test-blog-preview.mjs URL [release-root]
import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { parse } from 'parse5';
import { assert, attr, blogIndices, links, origin, runChecks, tags } from './test-blog-common.mjs';

const preview = new URL(process.argv[2] ?? 'http://localhost:4321');
assert(preview.protocol === 'https:' || preview.hostname === 'localhost', 'preview deve usar HTTPS ou localhost');
const root = resolve(process.argv[3] ?? '.');
const dist = join(root, 'dist');
const manifest = JSON.parse(await readFile(join(root, '.astro/blog-manifest.json'), 'utf8'));
assert(manifest.entries.length === 5, `release deve ter cinco artigos; encontrados ${manifest.entries.length}`);
const checks = [];

for (const path of blogIndices) checks.push([`preview ${path}: canonical produção, noindex e conteúdo por idioma`, async () => {
  const response = await fetch(new URL(path, preview), { redirect: 'follow' });
  assert(response.status === 200, `${path} HTTP ${response.status}`);
  const html = await response.text();
  const doc = parse(html);
  assert(attr(links(doc, 'canonical')[0], 'href') === origin + path, 'canonical aponta para preview ou está ausente');
  assert(/noindex/i.test(response.headers.get('x-robots-tag') ?? '') || tags(doc, 'meta').some((node) => attr(node, 'name') === 'robots' && /noindex/i.test(attr(node, 'content') ?? '')), 'preview sem noindex');
  if (path === '/blog/') for (const entry of manifest.entries) assert(tags(doc, 'a').some((node) => attr(node, 'href') === entry.path), `índice PT sem ${entry.path}`);
  if (path === '/en/blog/') assert(html.includes('No articles are available in English yet.') && !manifest.entries.some((entry) => html.includes(entry.path)), 'índice EN não está honestamente vazio');
}]);

for (const entry of manifest.entries) checks.push([`preview ${entry.path}: noindex, canonical produção e bytes do artefato`, async () => {
  const response = await fetch(new URL(entry.path, preview), { redirect: 'follow' });
  assert(response.status === 200, `${entry.path} HTTP ${response.status}`);
  const html = await response.text();
  assert(/noindex/i.test(response.headers.get('x-robots-tag') ?? '') || /<meta\s+name="robots"[^>]*noindex/i.test(html), `${entry.path} preview sem noindex`);
  assert(html === await readFile(join(dist, entry.path.slice(1), 'index.html'), 'utf8'), `${entry.path} difere do artefato local`);
  const doc = parse(html);
  assert(attr(links(doc, 'canonical')[0], 'href') === origin + entry.path, `${entry.path} canonical aponta para preview`);
}]);

await runChecks(checks);
