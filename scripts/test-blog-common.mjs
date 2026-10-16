import { readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { parse } from 'parse5';

export const origin = 'https://tornostudio.com';
export const baselinePaths = [
  '/', '/en/',
  '/cases/loopt/', '/cases/bom-capital/', '/cases/ascende/',
  '/en/cases/loopt/', '/en/cases/bom-capital/', '/en/cases/ascende/',
  '/recuperacao-de-projeto/', '/en/software-project-rescue/',
  '/lovable-em-producao/', '/en/lovable-to-production/',
  '/guias/rls-multiempresa/', '/en/guides/multi-tenant-rls/',
  '/privacidade/', '/en/privacy/',
];
export const blogIndices = ['/blog/', '/en/blog/'];
export const caseSlugs = ['loopt', 'bom-capital', 'ascende'];

export function assert(value, message) {
  if (!value) throw new Error(message);
}

export function all(node, predicate, found = []) {
  if (predicate(node)) found.push(node);
  for (const child of node.childNodes ?? []) all(child, predicate, found);
  return found;
}

export function attr(node, name) {
  return node.attrs?.find((entry) => entry.name === name)?.value ?? null;
}

export function text(node) {
  if (node.nodeName === '#text') return node.value ?? '';
  return (node.childNodes ?? []).map(text).join('');
}

export function tags(doc, name) {
  return all(doc, (node) => node.tagName === name);
}

export function head(doc) {
  return tags(doc, 'head')[0];
}

export function links(doc, rel) {
  return tags(head(doc), 'link').filter((node) => attr(node, 'rel') === rel);
}

export function metas(doc, key, value) {
  return tags(head(doc), 'meta').filter((node) => attr(node, key) === value);
}

export function schemas(doc) {
  return tags(doc, 'script')
    .filter((node) => attr(node, 'type') === 'application/ld+json')
    .map((node) => JSON.parse(text(node)));
}

export function schemaTypes(value) {
  if (Array.isArray(value)) return value.flatMap(schemaTypes);
  if (!value || typeof value !== 'object') return [];
  return [value['@type'], ...schemaTypes(value['@graph'] ?? [])].flat().filter(Boolean);
}

export async function fileFor(dist, path) {
  const relative = path === '/' ? 'index.html' : join(path.slice(1), 'index.html');
  const file = resolve(dist, relative);
  assert(file.startsWith(`${resolve(dist)}/`) || file === resolve(dist, 'index.html'), `path fora de dist: ${path}`);
  await stat(file);
  return file;
}

export async function page(dist, path) {
  const html = await readFile(await fileFor(dist, path), 'utf8');
  return { html, doc: parse(html) };
}

export function sitemapUrls(xml) {
  return [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>([\s\S]*?)<\/url>/g)].map((match) => ({
    url: match[1],
    alternates: [...match[2].matchAll(/<xhtml:link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"\s*\/>/g)]
      .map((link) => ({ lang: link[1], href: link[2] })),
  }));
}

export async function runChecks(cases) {
  let failed = 0;
  for (const [name, fn] of cases) {
    try {
      await fn();
      console.log(`PASS ${name}`);
    } catch (error) {
      failed++;
      console.error(`FAIL ${name}: ${error.message}`);
    }
  }
  console.log(`RESULT ${cases.length - failed}/${cases.length} checks passed`);
  if (failed) process.exitCode = 1;
}
