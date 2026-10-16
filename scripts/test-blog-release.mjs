// Read-only QA of a built static release. Run after the implementation's build:
// node scripts/test-blog-release.mjs /path/to/dist
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  all, assert, attr, baselinePaths, blogIndices, caseSlugs, head, links, metas,
  origin, page, runChecks, schemas, schemaTypes, sitemapUrls, tags, text,
} from './test-blog-common.mjs';

const dist = resolve(process.argv[2] ?? 'dist');
const expected = [...baselinePaths, ...blogIndices];
const expectedUrls = new Set(expected.map((path) => origin + path));
const cases = [];

cases.push(['sitemap mantém as 16 URLs existentes e acrescenta apenas os dois índices', async () => {
  const index = await readFile(resolve(dist, 'sitemap-index.xml'), 'utf8');
  const sitemapPaths = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  assert(sitemapPaths.length > 0, 'sitemap index vazio');
  const entries = (await Promise.all(sitemapPaths.map(async (path) =>
    sitemapUrls(await readFile(resolve(dist, path.slice(1)), 'utf8'))))).flat();
  const actual = entries.map((entry) => entry.url);
  assert(actual.length === 18, `esperadas 18 URLs; encontradas ${actual.length}`);
  assert(new Set(actual).size === actual.length, 'URL duplicada no sitemap');
  for (const url of expectedUrls) assert(actual.includes(url), `URL ausente: ${url}`);
  for (const url of actual) assert(expectedUrls.has(url), `URL inesperada: ${url}`);
  for (const entry of entries) {
    const path = new URL(entry.url).pathname;
    const { doc } = await page(dist, path);
    assert(attr(links(doc, 'canonical')[0], 'href') === entry.url, `canonical diverge do sitemap em ${path}`);
    const htmlAlternates = links(doc, 'alternate').filter((node) => attr(node, 'hreflang'))
      .map((node) => `${attr(node, 'hreflang')}=${attr(node, 'href')}`).sort();
    const xmlAlternates = entry.alternates.map((alt) => `${alt.lang}=${alt.href}`).sort();
    assert(JSON.stringify(htmlAlternates) === JSON.stringify(xmlAlternates), `alternates HTML/sitemap divergem em ${path}`);
  }
}]);

for (const [path, locale, empty] of [
  ['/blog/', 'pt-BR', 'Ainda não há artigos publicados em português.'],
  ['/en/blog/', 'en', 'No articles are available in English yet.'],
]) {
  cases.push([`índice ${path}: vazio real, metadata, i18n e CTA`, async () => {
    const { html, doc } = await page(dist, path);
    const htmlNode = tags(doc, 'html')[0];
    assert(attr(htmlNode, 'lang') === locale, `lang incorreto: ${attr(htmlNode, 'lang')}`);
    const h1 = tags(doc, 'h1');
    assert(h1.length === 1 && text(h1[0]).trim() === 'Blog', 'H1 do índice ausente ou duplicado');
    assert(tags(doc, 'main').length === 1 && tags(doc, 'header').length >= 1 && tags(doc, 'footer').length === 1, 'landmarks principais ausentes');
    assert(tags(doc, 'a').some((node) => attr(node, 'href') === '#conteudo'), 'skip link para main ausente');
    assert(tags(doc, 'main')[0] && attr(tags(doc, 'main')[0], 'id') === 'conteudo', 'destino do skip link ausente');
    assert(text(doc).includes(empty), `microcopy vazia ausente: ${empty}`);
    assert(tags(doc, 'article').length === 0, 'índice vazio contém <article>');
    const types = schemaTypes(schemas(doc));
    assert(types.includes('CollectionPage'), 'CollectionPage verdadeiro ausente');
    assert(!types.some((type) => ['Article', 'BlogPosting', 'NewsArticle'].includes(type)), 'índice vazio contém schema de artigo');
    assert(!schemas(doc).some((item) => JSON.stringify(item).includes('itemListElement')), 'CollectionPage vazio contém item fictício');
    assert(attr(links(doc, 'canonical')[0], 'href') === origin + path, 'canonical não é self');
    assert(!metas(doc, 'name', 'robots').some((node) => /noindex/i.test(attr(node, 'content') ?? '')), 'índice indexável marcado noindex');
    assert(text(tags(head(doc), 'title')[0]).trim().length > 10, 'title ausente/curto');
    assert((attr(metas(doc, 'name', 'description')[0], 'content') ?? '').length > 30, 'description ausente/curta');
    assert(attr(metas(doc, 'property', 'og:url')[0], 'content') === origin + path, 'og:url incorreto');
    const alt = Object.fromEntries(links(doc, 'alternate').filter((node) => attr(node, 'hreflang'))
      .map((node) => [attr(node, 'hreflang'), attr(node, 'href')]));
    assert(alt['pt-BR'] === origin + '/blog/' && alt.en === origin + '/en/blog/' && alt['x-default'] === origin + '/en/blog/', 'par hreflang do índice incorreto');
    const cta = all(doc, (node) => node.tagName === 'a' && /calendly\.com\/henriquepett\/45min/.test(attr(node, 'href') ?? ''));
    assert(cta.length > 0, 'CTA de agendamento ausente');
    assert(!/\{(?:verified author|nome do autor|data real)/i.test(html), 'placeholder editorial público');
    assert(!/Quanto custa sistema sob medida|Prot[oó]tipo para produ[cç][aã]o/i.test(text(doc)), 'pauta no_go publicada no índice');
  }]);
}

cases.push(['navegação interna do blog resolve no artefato', async () => {
  for (const path of blogIndices) {
    const { doc } = await page(dist, path);
    for (const node of tags(doc, 'a')) {
      const href = attr(node, 'href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) continue;
      const url = new URL(href, origin);
      if (/\.[a-z0-9]+$/i.test(url.pathname)) continue;
      await page(dist, url.pathname);
    }
  }
}]);

cases.push(['sem artefatos de artigo ou pauta histórica no release zero-artigos', async () => {
  const blogDir = await readdir(resolve(dist, 'blog'), { withFileTypes: true });
  const enBlogDir = await readdir(resolve(dist, 'en/blog'), { withFileTypes: true });
  assert(blogDir.every((entry) => !entry.isDirectory()) && enBlogDir.every((entry) => !entry.isDirectory()), 'release zero-artigos gerou subdiretório de artigo');
  for (const path of ['/blog/quanto-custa-sistema-sob-medida/', '/blog/prototipo-para-producao/']) {
    const file = resolve(dist, path.slice(1), 'index.html');
    let present = true;
    try { await readFile(file); } catch (error) { if (error.code === 'ENOENT') present = false; else throw error; }
    assert(!present, `pauta no_go gerou HTML: ${path}`);
  }
  const xml = await readFile(resolve(dist, 'sitemap-0.xml'), 'utf8');
  assert(!/<loc>[^<]*\/blog\/[^<]+\/</.test(xml), 'artigo público inesperado no sitemap');
  for (const path of expected) {
    const { html } = await page(dist, path);
    assert(!html.includes('QA-PRIVATE-') && !html.includes('/private/tmp/torno-blog-fixtures'), `fixture privada vazou em ${path}`);
  }
}]);

const expectedH1 = {
  '/cases/loopt/': 'Loopt: do modelo de IA à operação do pátio',
  '/cases/bom-capital/': 'Bom.Capital: da proposta de crédito à resposta em menos de 2 horas',
  '/cases/ascende/': 'Ascende: uma frase que vira registros organizados',
  '/en/cases/loopt/': 'Loopt: from an ML model to yard operations',
  '/en/cases/bom-capital/': 'Bom.Capital: from a credit application to a response in under 2 hours',
  '/en/cases/ascende/': 'Ascende: one sentence becomes organized records',
};
for (const slug of caseSlugs) for (const lang of ['', 'en/']) {
  const path = `/${lang}cases/${slug}/`;
  const pair = lang ? `/cases/${slug}/` : `/en/cases/${slug}/`;
  cases.push([`regressão case ${path}: conteúdo, SEO, imagem e oferta`, async () => {
    const { doc } = await page(dist, path);
    assert(text(tags(doc, 'h1')[0]).trim() === expectedH1[path], 'H1 mudou da baseline de produção');
    assert(attr(links(doc, 'canonical')[0], 'href') === origin + path, 'canonical case incorreto');
    assert(links(doc, 'alternate').some((node) => attr(node, 'href') === origin + pair), 'par i18n ausente');
    assert(schemaTypes(schemas(doc)).includes('Article'), 'Article schema do case ausente');
    assert(tags(doc, 'a').some((node) => /calendly\.com\/henriquepett\/45min/.test(attr(node, 'href') ?? '')), 'oferta/CTA de diagnóstico ausente');
    assert(tags(doc, 'a').some((node) => (attr(node, 'href') ?? '').includes('#precos')), 'link da oferta/preços ausente');
    for (const image of tags(doc, 'img')) assert((attr(image, 'alt') ?? '').trim().length > 10, 'imagem do case sem alt descritivo');
    if (slug !== 'bom-capital') assert(tags(doc, 'img').length > 0, 'imagem pública do case desapareceu');
  }]);
}

cases.push(['home PT/EN: retrato, consentimento e descoberta do blog', async () => {
  for (const path of ['/', '/en/']) {
    const { doc } = await page(dist, path);
    assert(tags(doc, 'img').some((node) => /henrique/i.test(attr(node, 'alt') ?? '')), `retrato sem alt/ausente em ${path}`);
    assert(all(doc, (node) => attr(node, 'data-consent-open') !== null).length > 0, `preferências de consentimento ausentes em ${path}`);
    const target = path === '/' ? '/blog/' : '/en/blog/';
    assert(tags(doc, 'a').some((node) => attr(node, 'href') === target), `link de descoberta do blog ausente em ${path}`);
  }
}]);

await runChecks(cases);
