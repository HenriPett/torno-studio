// Read-only assertions for an isolated, nonpublishable fixture build.
// Usage: node scripts/test-blog-fixture.mjs PRIVATE_DIST PRIVATE_EXPECTED_JSON
// The second argument must live under /private/tmp/torno-blog-fixtures-20261014/.
import { readFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import {
  assert, attr, baselinePaths, blogIndices, links, metas, origin, page,
  runChecks, schemas, schemaTypes, sitemapUrls, tags, text,
} from './test-blog-common.mjs';

const root = '/private/tmp/torno-blog-fixtures-20261014';
const dist = resolve(process.argv[2] ?? join(root, 'dist'));
const expectedFile = resolve(process.argv[3] ?? join(root, 'expected.json'));
assert(dist.startsWith('/private/tmp/torno-blog-qa-') && expectedFile.startsWith(`${root}/`), 'fixture e build devem ficar em caminhos privados acordados');
const expected = JSON.parse(await readFile(expectedFile, 'utf8'));
assert(Array.isArray(expected.visible) && Array.isArray(expected.hidden), 'expected.json inválido');
const visible = expected.visible.map((item) => item.path);
const hidden = expected.hidden.map((item) => item.path);
assert(new Set([...visible, ...hidden]).size === visible.length + hidden.length, 'paths de fixture duplicados');
const cases = [];

cases.push(['fixture: apenas publicados elegíveis entram no sitemap', async () => {
  const index = await readFile(join(dist, 'sitemap-index.xml'), 'utf8');
  const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const entries = (await Promise.all(maps.map(async (path) =>
    sitemapUrls(await readFile(join(dist, path.slice(1)), 'utf8'))))).flat();
  const urls = entries.map((entry) => entry.url);
  const wanted = new Set([...baselinePaths, ...blogIndices, ...visible].map((path) => origin + path));
  assert(urls.length === wanted.size, `sitemap: esperado ${wanted.size}, obtido ${urls.length}`);
  for (const url of wanted) assert(urls.includes(url), `sitemap sem ${url}`);
  for (const url of urls) assert(wanted.has(url), `sitemap com URL não elegível ${url}`);
}]);

cases.push(['fixture: índices mostram apenas artigos do próprio idioma', async () => {
  for (const indexPath of blogIndices) {
    const { doc } = await page(dist, indexPath);
    const html = text(doc);
    const locale = indexPath.startsWith('/en/') ? 'en' : 'pt-BR';
    for (const item of expected.visible) {
      const linked = tags(doc, 'a').some((node) => attr(node, 'href') === item.path);
      if (item.locale === locale) assert(linked, `índice ${indexPath} sem link para ${item.path}`);
      else assert(!linked, `índice ${indexPath} vazou link para ${item.path}`);
    }
    for (const item of expected.hidden) assert(!html.includes(item.marker), `índice ${indexPath} vazou ${item.marker}`);
  }
}]);

for (const item of expected.visible) cases.push([`fixture publicada ${item.path}: HTML/SEO/schema`, async () => {
  const { doc } = await page(dist, item.path);
  assert(text(doc).includes(item.marker), 'corpo da fixture ausente');
  assert(attr(links(doc, 'canonical')[0], 'href') === origin + item.path, 'canonical não self');
  assert(attr(tags(doc, 'html')[0], 'lang') === item.locale, 'lang incorreto');
  assert(tags(doc, 'h1').length === 1, 'H1 ausente ou duplicado');
  assert((attr(metas(doc, 'name', 'description')[0], 'content') ?? '').length > 30, 'description ausente');
  const types = schemaTypes(schemas(doc));
  if (item.publishedAt) {
    assert(types.includes('BlogPosting'), 'BlogPosting de artigo já publicado ausente');
    const post = schemas(doc).find((node) => schemaTypes(node).includes('BlogPosting'));
    assert(post.datePublished === item.publishedAt, `datePublished incorreto: ${post.datePublished}`);
    assert(!post.dateModified || post.dateModified === item.updatedAt, 'dateModified não corresponde a revisão substantiva');
    assert(post.author?.name === item.author, 'autoria real ausente/incorreta');
  } else {
    assert(types.includes('WebPage') || types.includes('BlogPosting'), 'schema de página/artigo ausente');
    assert(!JSON.stringify(schemas(doc)).includes('datePublished'), 'data de publicação inventada');
    assert(!JSON.stringify(schemas(doc)).includes('dateModified'), 'data de atualização inventada');
  }
  const alternates = Object.fromEntries(links(doc, 'alternate').filter((node) => attr(node, 'hreflang'))
    .map((node) => [attr(node, 'hreflang'), attr(node, 'href')]));
  if (item.pair) {
    assert(alternates['pt-BR'] && alternates.en, 'par real sem hreflang bilateral');
    assert(alternates[item.locale] === origin + item.path, 'alternate self incorreto');
    assert(alternates[item.locale === 'en' ? 'pt-BR' : 'en'] === origin + item.pair, 'alternate do par incorreto');
  } else {
    assert(!alternates.en && !alternates['x-default'], 'idioma único ganhou EN/x-default fictício');
  }
}]);

cases.push(['fixture: draft/review/approved/hold/retired/no_go/futuro não vazam', async () => {
  const files = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (/\.(html|xml)$/.test(path)) files.push(path);
    }
  }
  await walk(dist);
  const publicText = (await Promise.all(files.map((path) => readFile(path, 'utf8')))).join('\n');
  for (const item of expected.hidden) {
    assert(!publicText.includes(item.marker), `${item.status} vazou marcador ${item.marker}`);
    assert(!publicText.includes(origin + item.path), `${item.status} vazou URL ${item.path}`);
    let exists = true;
    try { await page(dist, item.path); } catch (error) { if (error.code === 'ENOENT') exists = false; else throw error; }
    assert(!exists, `${item.status} gerou HTML ${item.path}`);
  }
}]);

cases.push(['fixture: blocos largos acessíveis por teclado', async () => {
  const { doc } = await page(dist, '/blog/qa-registro-de-handover/');
  assert(tags(doc, 'pre').length > 0 && tags(doc, 'table').length > 0, 'fixture não contém código/tabela');
  for (const node of tags(doc, 'pre')) assert(attr(node, 'tabindex') === '0', 'código largo não recebe foco por Tab');
  const wrappers = tags(doc, 'div').filter((node) => (attr(node, 'class') ?? '').split(/\s+/).includes('blog-table-scroll'));
  assert(wrappers.length > 0, 'tabela não tem contêiner de rolagem');
  for (const node of wrappers) {
    assert(attr(node, 'tabindex') === '0', 'contêiner da tabela não recebe foco por Tab');
    assert(attr(node, 'role') === 'region', 'contêiner da tabela sem landmark region');
    assert((attr(node, 'aria-label') ?? '').length > 3, 'contêiner da tabela sem nome acessível');
  }
  const { doc: enDoc } = await page(dist, '/en/blog/qa-equivalent-pair/');
  const enWrappers = tags(enDoc, 'div').filter((node) => (attr(node, 'class') ?? '').split(/\s+/).includes('blog-table-scroll'));
  assert(enWrappers.length > 0, 'tabela EN sem contêiner rolável');
  for (const node of enWrappers) {
    assert(attr(node, 'tabindex') === '0' && attr(node, 'role') === 'region', 'tabela EN sem foco/region');
    assert(attr(node, 'aria-label') === 'Scrollable table', `aria-label EN incorreto: ${attr(node, 'aria-label')}`);
  }
  assert(text(enDoc).includes('Scroll horizontally if needed to see all columns.'), 'dica de rolagem EN ausente');
}]);

await runChecks(cases);
