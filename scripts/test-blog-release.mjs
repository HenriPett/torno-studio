// Read-only QA for the complete published blog source. Run after npm run build.
// Usage: node scripts/test-blog-release.mjs [release-root]
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import {
  assert, attr, baselinePaths, blogIndices, links, metas, origin, page,
  runChecks, schemas, schemaTypes, sitemapUrls, tags, text,
} from './test-blog-common.mjs';

const root = resolve(process.argv[2] ?? '.');
const dist = join(root, 'dist');
const manifest = JSON.parse(await readFile(join(root, '.astro/blog-manifest.json'), 'utf8'));
const expected = [
  ['torno-artigo-pt-20261014-planilhas', '/blog/quando-automatizar-processos-planilhas/', 'a84d4826d4b1d68efc03767aea2c09dd2ba8386a7b1ddaee87f235cc15974d66', []],
  ['torno-artigo-pt-20261015-criterios-aceite-mvp', '/blog/criterios-aceite-mvp/', 'bfee8c6b195d2ee2b3946327aa0e010348921bde6edc64c29169ab00e5d151e2', ['torno.svg']],
  ['torno-artigo-pt-20261015-integracao-erp-briefing', '/blog/integracao-erp-briefing-orcamento/', '133f80ab8567ba74e30f4a178000ec0414b8a2771b182e052ef85d991deaf235', ['integracao-erp-fluxo.svg', 'integracao-erp-pendencias.svg']],
  ['torno-artigo-pt-20261015-antes-de-refazer-sistema-evidencias', '/blog/antes-de-refazer-sistema-evidencias/', '3b64339e8b72d2d8b3359b3275c568e5d6924261bd09de3cec630e705a93d79d', ['evidencias-decisao.svg', 'exemplo-aprovacao.svg']],
  ['torno-artigo-pt-20261016-custo-manutencao-software-apos-lancamento', '/blog/custo-manutencao-software-apos-lancamento/', '560cb0f8a33dbba8d7db6018507c9d2c122cf420da4d82a2382d88505f3757e8', ['orcamento-apos-lancamento.svg']],
  ['torno-artigo-pt-20261016-migracao-dados-validacao', '/blog/migracao-dados-validacao-troca-sistema/', '7558a4d1482fb7dfbf8cfccc495efa997de243f8d82d8f5ac182c6489710a86d', ['migracao-validacao.svg', 'migracao-corte.svg']],
  ['torno-artigo-pt-20261019-passagem-tecnica-fornecedor', '/blog/troca-fornecedor-software-passagem-tecnica/', '26e905dd66382c942f9f7a6ac4aa7295e5e4a2a25444eff92683eebf3126ff27', ['torno-inventario-passagem.svg', 'torno-transferencia-verificacao.svg']],
  ['torno-artigo-pt-20261019-erro-intermitente-evidencias', '/blog/erro-intermitente-software-evidencias/', '8c2fd8158c8ebf143cc081e1fc1230c16c182fbf41db6aae4e2a8d256feff6a8', ['torno-ficha-erro-intermitente.svg', 'torno-fluxo-erro-intermitente.svg']],
  ['torno-artigo-pt-20261019-priorizar-mudancas-mvp', '/blog/mvp-pos-lancamento-priorizar-mudancas/', '665b96f5b6df7b8076203b693ebf5b929f06c9657a0e5ad0c8f1b7485590a8ae', ['torno-sinais-ficha-decisao.svg', 'torno-ciclo-priorizacao-mvp.svg']],
  ['torno-artigo-pt-20261020-prova-restauracao-backup', '/blog/prova-restauracao-backup-software/', '3578ab18ab6527c8d5665df7bc3bd73f60adb8f0b911bee96fd819bb6949f6b4', ['torno-prova-fluxo-restauracao.svg', 'torno-ficha-prova-restauracao.svg']],
];
const expectedById = new Map(expected.map(([id, path, contentHash, assets]) => [id, { id, path, contentHash, assets }]));
const expectedUrls = new Set([...baselinePaths, ...blogIndices, ...expected.map(([, path]) => path)].map((path) => origin + path));
const checks = [];

checks.push(['manifesto inclui exatamente os dez artigos autorizados e suas aprovações', async () => {
  assert(manifest.entries.length === expected.length, `esperados ${expected.length} artigos; encontrados ${manifest.entries.length}`);
  for (const entry of manifest.entries) {
    const wanted = expectedById.get(entry.id);
    assert(wanted, `artigo fora da lista publicada: ${entry.id}`);
    assert(entry.path === wanted.path && entry.locale === 'pt-BR' && entry.contentHash === wanted.contentHash, `identidade/hash diverge: ${entry.id}`);
    assert(manifest.sourceHashes[entry.file] === entry.hash, `hash do arquivo fonte diverge: ${entry.id}`);
  }
}]);

checks.push(['sitemap contém 28 URLs únicas: baseline, dois índices e dez artigos PT', async () => {
  const index = await readFile(join(dist, 'sitemap-index.xml'), 'utf8');
  const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const entries = (await Promise.all(maps.map(async (path) => sitemapUrls(await readFile(join(dist, path.slice(1)), 'utf8'))))).flat();
  const urls = entries.map((entry) => entry.url);
  assert(urls.length === expectedUrls.size && new Set(urls).size === urls.length, `sitemap tem ${urls.length} URLs, esperado ${expectedUrls.size} únicas`);
  for (const url of expectedUrls) assert(urls.includes(url), `URL ausente: ${url}`);
  for (const url of urls) assert(expectedUrls.has(url), `URL inesperada: ${url}`);
  for (const entry of entries) assert(attr(links((await page(dist, new URL(entry.url).pathname)).doc, 'canonical')[0], 'href') === entry.url, `canonical diverge do sitemap: ${entry.url}`);
}]);

checks.push(['índice PT lista todos os artigos aprovados e índice EN permanece vazio', async () => {
  const pt = (await page(dist, '/blog/')).doc;
  for (const [, path] of expected) assert(tags(pt, 'a').some((node) => attr(node, 'href') === path), `índice PT sem ${path}`);
  const en = (await page(dist, '/en/blog/')).doc;
  assert(text(en).includes('No articles are available in English yet.'), 'microcopy do índice EN vazio ausente');
  for (const [, path] of expected) assert(!tags(en, 'a').some((node) => attr(node, 'href') === path), `artigo PT vazou no índice EN: ${path}`);
}]);

for (const [id, path, contentHash, assetNames] of expected) {
  checks.push([`artigo ${path}: canonical, indexabilidade, schema e figuras`, async () => {
    const { html, doc } = await page(dist, path);
    const entry = manifest.entries.find((item) => item.id === id);
    assert(entry?.contentHash === contentHash, 'content hash fora da aprovação');
    assert(attr(links(doc, 'canonical')[0], 'href') === origin + path, 'canonical não é self');
    assert(!metas(doc, 'name', 'robots').some((node) => /noindex/i.test(attr(node, 'content') ?? '')), 'artigo marcado noindex');
    assert(tags(doc, 'h1').length === 1, 'deve existir um H1');
    assert((attr(metas(doc, 'name', 'description')[0], 'content') ?? '').length > 30, 'description ausente/curta');
    assert(!html.includes('[Marca]') && !html.includes('href="#agendar"'), 'preview local sem marca/CTA configurados');
    assert(schemaTypes(schemas(doc)).includes('BlogPosting'), 'BlogPosting ausente');
    const posting = schemas(doc).find((item) => item['@type'] === 'BlogPosting');
    assert(posting && !Object.hasOwn(posting, 'author') && !Object.hasOwn(posting, 'datePublished') && !Object.hasOwn(posting, 'dateModified'), 'autor ou data não comprovados no schema');
    assert(!/Publicado em|Atualizado em/.test(text(doc)), 'byline/data não comprovada visível');
    assert(tags(doc, 'figure').length === assetNames.length, `esperadas ${assetNames.length} figuras`);
    const imagePaths = tags(doc, 'img').map((node) => attr(node, 'src'));
    assert(imagePaths.length === assetNames.length, `esperadas ${assetNames.length} assets de artigo`);
    assert(JSON.stringify(imagePaths.map((src) => src?.match(/([^/]+\.svg)$/)?.[1].split('.')[0]).sort()) === JSON.stringify([...assetNames].map((name) => name.replace(/\.svg$/, '')).sort()), 'assets runtime não correspondem aos SVGs aprovados');
    for (const src of imagePaths) {
      assert(src?.startsWith('/_astro/') && src.endsWith('.svg'), `asset fora do runtime aprovado: ${src}`);
      const filename = src.split('/').at(-1);
      const output = await readFile(join(dist, '_astro', filename));
      const basename = filename.match(/^(.+?)\.[^.]+\.svg$/)?.[1];
      const source = await readFile(join(root, 'src/content/blog', `${basename}.svg`));
      assert(createHash('sha256').update(output).digest('hex') === createHash('sha256').update(source).digest('hex'), `bytes do SVG mudaram: ${basename}`);
    }
    for (const figure of tags(doc, 'figure')) {
      assert(tags(figure, 'img').length === 1 && (attr(tags(figure, 'img')[0], 'alt') ?? '').trim().length > 20, 'figura sem imagem/alt descritivo');
      assert(tags(figure, 'figcaption').length === 1, 'figura sem legenda semântica');
    }
    assert(!html.includes('/private/tmp/') && !html.includes('QA-PRIVATE-'), 'caminho ou fixture privada vazou');
  }]);
}

checks.push(['pauta de custo de construção em HOLD não gera URL pública', async () => {
  for (const path of ['/blog/custo-mvp-web-escopo-orcamento/', '/blog/quanto-custa-sistema-sob-medida/', '/blog/prototipo-para-producao/']) {
    let exists = true;
    try { await readFile(join(dist, path.slice(1), 'index.html')); } catch (error) { if (error.code === 'ENOENT') exists = false; else throw error; }
    assert(!exists, `rota não aprovada gerada: ${path}`);
  }
}]);

await runChecks(checks);
