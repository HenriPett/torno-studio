// Read-only checks of a public preview URL. Canonical stays on production;
// noindex can be an HTTP header or a meta tag. Usage: node scripts/test-blog-preview.mjs URL
import { parse } from 'parse5';
import { assert, attr, baselinePaths, blogIndices, caseSlugs, links, origin, runChecks, schemas, schemaTypes, sitemapUrls, tags } from './test-blog-common.mjs';

const preview = new URL(process.argv[2] ?? 'http://localhost:4321');
assert(preview.protocol === 'https:' || preview.hostname === 'localhost', 'preview deve usar HTTPS ou localhost');
const cases = blogIndices.map((path) => [`preview ${path}: canonical produção, noindex, vazio`, async () => {
  const response = await fetch(new URL(path, preview), { redirect: 'follow' });
  assert(response.status === 200, `HTTP ${response.status}`);
  const doc = parse(await response.text());
  assert(attr(links(doc, 'canonical')[0], 'href') === origin + path, 'canonical aponta para preview ou ausente');
  const headerNoindex = /noindex/i.test(response.headers.get('x-robots-tag') ?? '');
  assert(headerNoindex, 'preview sem X-Robots-Tag: noindex');
  assert(tags(doc, 'article').length === 0, 'preview com artigo fictício');
  const types = schemaTypes(schemas(doc));
  assert(types.includes('CollectionPage'), 'CollectionPage ausente');
  assert(!types.some((type) => ['Article', 'BlogPosting', 'NewsArticle'].includes(type)), 'schema de artigo fictício');
}]);

cases.push(['preview sitemap: 16 URLs preservadas + 2 índices, nenhum post', async () => {
  const index = await fetch(new URL('/sitemap-index.xml', preview));
  assert(index.status === 200, `sitemap index HTTP ${index.status}`);
  const maps = [...(await index.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  assert(maps.length > 0, 'sitemap index vazio');
  const entries = [];
  for (const path of maps) {
    const response = await fetch(new URL(path, preview));
    assert(response.status === 200, `${path} HTTP ${response.status}`);
    entries.push(...sitemapUrls(await response.text()));
  }
  const actual = entries.map((entry) => entry.url);
  const expected = [...baselinePaths, ...blogIndices].map((path) => origin + path);
  assert(actual.length === 18 && new Set(actual).size === 18, `sitemap contém ${actual.length} URLs, esperado 18 únicas`);
  for (const url of expected) assert(actual.includes(url), `sitemap sem ${url}`);
  for (const url of actual) assert(expected.includes(url), `sitemap com post/URL inesperada ${url}`);
}]);

cases.push(['preview seis cases PT/EN: HTTP 200 e canonical produção', async () => {
  for (const slug of caseSlugs) {
    for (const path of [`/cases/${slug}/`, `/en/cases/${slug}/`]) {
      const response = await fetch(new URL(path, preview));
      assert(response.status === 200, `${path} HTTP ${response.status}`);
      assert(/noindex/i.test(response.headers.get('x-robots-tag') ?? ''), `${path} sem X-Robots-Tag: noindex`);
      const doc = parse(await response.text());
      assert(attr(links(doc, 'canonical')[0], 'href') === origin + path, `${path} canonical não é produção`);
    }
  }
}]);

cases.push(['preview sem rota da fixture privada', async () => {
  for (const path of ['/blog/qa-registro-de-handover/', '/blog/qa-par-equivalente/', '/en/blog/qa-equivalent-pair/']) {
    const response = await fetch(new URL(path, preview));
    assert(response.status === 404, `${path} HTTP ${response.status}, esperado 404`);
  }
}]);
await runChecks(cases);
