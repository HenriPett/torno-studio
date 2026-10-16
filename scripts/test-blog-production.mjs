// Read-only post-promotion HTTP gate for the approved article release.
// Usage: node scripts/test-blog-production.mjs https://tornostudio.com /private/tmp/torno-blog-release-article-candidate-r3-20261014
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from 'parse5';
import {
  assert, attr, baselinePaths, blogIndices, caseSlugs, links, origin,
  runChecks, schemas, schemaTypes, sitemapUrls, tags,
} from './test-blog-common.mjs';

const base = new URL(process.argv[2] ?? origin);
assert(base.protocol === 'https:', 'produção deve usar HTTPS');
const releaseRoot = process.argv[3] && resolve(process.argv[3]);
assert(releaseRoot, 'informe o candidato isolado para vincular content_id/hash ao artefato');
const articlePath = '/blog/quando-automatizar-processos-planilhas/';
const articleUrl = origin + articlePath;
const contentId = 'torno-artigo-pt-20261014-planilhas';
const contentHash = 'a84d4826d4b1d68efc03767aea2c09dd2ba8386a7b1ddaee87f235cc15974d66';
const releaseMeta = JSON.parse(await readFile(resolve(releaseRoot, 'build-meta.json'), 'utf8'));
const blogManifest = JSON.parse(await readFile(resolve(releaseRoot, '.astro/blog-manifest.json'), 'utf8'));
const sourceManifest = JSON.parse(await readFile(resolve(releaseRoot, 'source-sha256.json'), 'utf8'));
const artifactManifest = JSON.parse(await readFile(resolve(releaseRoot, 'artifact-sha256.json'), 'utf8'));
const entry = blogManifest.entries?.[0];
assert(releaseMeta.privateFixture === false && releaseMeta.publicArticles === 1, 'candidato não é release público com um artigo');
assert(blogManifest.entries.length === 1 && entry.id === contentId && entry.hash === contentHash && entry.path === articlePath && entry.locale === 'pt-BR', 'manifesto não corresponde ao content_id/hash/URL aprovado');
assert(sourceManifest[entry.file] === contentHash, 'source manifest não vincula o Markdown aprovado');
assert(createHash('sha256').update(await readFile(resolve(releaseRoot, entry.file))).digest('hex') === contentHash, 'bytes Markdown divergentes do hash aprovado');
const articleFile = resolve(releaseRoot, 'dist', articlePath.slice(1), 'index.html');
const articleArtifactHash = createHash('sha256').update(await readFile(articleFile)).digest('hex');
assert(artifactManifest[`${articlePath.slice(1)}index.html`] === articleArtifactHash, 'artifact manifest não vincula o HTML candidato');

const cases = [];

cases.push(['produção /blog/ e /en/blog/: HTTP 200, canonical self, indexáveis e estado por idioma', async () => {
  for (const path of blogIndices) {
    const response = await fetch(new URL(path, base));
    assert(response.status === 200, `${path} HTTP ${response.status}`);
    assert(!/noindex/i.test(response.headers.get('x-robots-tag') ?? ''), `${path} mantém X-Robots-Tag: noindex`);
    const html = await response.text();
    const doc = parse(html);
    assert(attr(links(doc, 'canonical')[0], 'href') === origin + path, `${path} canonical incorreto`);
    assert(!tags(doc, 'meta').some((node) => attr(node, 'name') === 'robots' && /noindex/i.test(attr(node, 'content') ?? '')), `${path} contém meta noindex`);
    const types = schemaTypes(schemas(doc));
    assert(types.includes('CollectionPage') && !types.some((type) => ['Article', 'BlogPosting', 'NewsArticle'].includes(type)), `${path} schema de índice inválido`);
    if (path === '/blog/') assert(html.includes(articlePath), 'índice PT não lista o artigo aprovado');
    if (path === '/en/blog/') assert(html.includes('No articles are available in English yet.') && !html.includes(articlePath), 'índice EN sugere tradução inexistente');
  }
}]);

cases.push(['produção sitemap: 18 URLs baseline preservadas + artigo PT aprovado', async () => {
  const index = await fetch(new URL('/sitemap-index.xml', base));
  assert(index.status === 200, `sitemap-index HTTP ${index.status}`);
  const maps = [...(await index.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  assert(maps.length > 0, 'sitemap index vazio');
  const entries = [];
  for (const path of maps) {
    const response = await fetch(new URL(path, base));
    assert(response.status === 200, `${path} HTTP ${response.status}`);
    entries.push(...sitemapUrls(await response.text()));
  }
  const actual = entries.map((entry) => entry.url);
  const expected = [...baselinePaths, ...blogIndices, articlePath].map((path) => origin + path);
  assert(actual.length === 19 && new Set(actual).size === 19, `sitemap contém ${actual.length} URLs, esperado 19 únicas`);
  for (const url of expected) assert(actual.includes(url), `sitemap sem ${url}`);
  for (const url of actual) assert(expected.includes(url), `sitemap com URL inesperada ${url}`);
  assert(actual.filter((url) => url === articleUrl).length === 1, 'artigo não aparece exatamente uma vez');
}]);

cases.push(['produção artigo PT: identidade/hash, HTTP, canonical, indexabilidade, schema e links', async () => {
  const response = await fetch(new URL(articlePath, base));
  assert(response.status === 200, `artigo HTTP ${response.status}`);
  assert(!/noindex/i.test(response.headers.get('x-robots-tag') ?? ''), 'artigo mantém X-Robots-Tag: noindex');
  const html = await response.text();
  const candidateHtml = await readFile(articleFile, 'utf8');
  assert(html === candidateHtml, 'HTML de produção difere do artefato candidato aprovado');
  const doc = parse(html);
  assert(attr(links(doc, 'canonical')[0], 'href') === articleUrl, 'canonical do artigo incorreto');
  assert(!tags(doc, 'meta').some((node) => attr(node, 'name') === 'robots' && /noindex/i.test(attr(node, 'content') ?? '')), 'artigo contém meta noindex');
  const h1 = tags(doc, 'h1');
  assert(h1.length === 1, `esperado um H1, encontrados ${h1.length}`);
  const articleSchema = schemas(doc).filter((item) => item['@type'] === 'BlogPosting');
  assert(articleSchema.length === 1, 'BlogPosting ausente ou duplicado');
  assert(!Object.hasOwn(articleSchema[0], 'author'), 'schema atribui autor não aprovado');
  assert(!Object.hasOwn(articleSchema[0], 'datePublished') && !Object.hasOwn(articleSchema[0], 'dateModified'), 'schema emite datas sem evidência');
  assert(articleSchema[0].url === articleUrl && articleSchema[0].mainEntityOfPage === articleUrl, 'links do BlogPosting não são canônicos');
  for (const anchor of tags(doc, 'a')) {
    const href = attr(anchor, 'href');
    if (!href) continue;
    const target = new URL(href, articleUrl);
    if (target.origin !== origin) { assert(target.protocol === 'https:', `link externo não HTTPS: ${href}`); continue; }
    const linkResponse = await fetch(target);
    assert(linkResponse.status === 200, `link interno quebrado ${href}: HTTP ${linkResponse.status}`);
  }
}]);

cases.push(['produção seis cases PT/EN: HTTP 200 e canonical self', async () => {
  for (const slug of caseSlugs) {
    for (const path of [`/cases/${slug}/`, `/en/cases/${slug}/`]) {
      const response = await fetch(new URL(path, base));
      assert(response.status === 200, `${path} HTTP ${response.status}`);
      const doc = parse(await response.text());
      assert(attr(links(doc, 'canonical')[0], 'href') === origin + path, `${path} canonical incorreto`);
    }
  }
}]);

cases.push(['produção fixture privada: três rotas HTTP 404', async () => {
  for (const path of ['/blog/qa-registro-de-handover/', '/blog/qa-par-equivalente/', '/en/blog/qa-equivalent-pair/']) {
    const response = await fetch(new URL(path, base));
    assert(response.status === 404, `${path} HTTP ${response.status}, esperado 404`);
  }
}]);

await runChecks(cases);
