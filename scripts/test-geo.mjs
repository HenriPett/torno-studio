import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { all, attr, tags, text, schemas, page, links, metas, runChecks, baselinePaths, blogIndices, origin } from './test-blog-common.mjs';

const manifest = JSON.parse(await readFile('.astro/blog-manifest.json', 'utf8'));
const attestation = JSON.parse(await readFile('src/config/blog-authorship.json', 'utf8'));
const checks = [];
const answers = new Set();
const flatten = doc => schemas(doc).flatMap(s => s['@graph'] ?? [s]);
const publicPaths = [...baselinePaths, ...blogIndices, ...manifest.entries.map(e => e.path)];

checks.push(['all current articles have an explicit, dated author attestation', () => {
  assert.equal(attestation.confirmedBy, 'Henrique Pett');
  assert.equal(attestation.confirmedOn, '2026-10-29');
  assert.deepEqual([...attestation.contentIds].sort(), manifest.entries.map(e => e.id).sort());
}]);

for (const path of publicPaths) checks.push([`${path}: complete discoverable identity and public content`, async () => {
  const { doc } = await page('dist', path);
  const canonical = origin + path;
  assert.equal(attr(links(doc, 'canonical')[0], 'href'), canonical);
  assert.equal(tags(doc, 'h1').length, 1);
  assert(!metas(doc, 'name', 'robots').some(n => /noindex/.test(attr(n, 'content'))));
  const entities = flatten(doc);
  const webpage = entities.find(s => s['@id'] === canonical + '#webpage');
  assert(webpage, 'stable WebPage identity missing');
  assert.equal(webpage.isPartOf['@id'], origin + '/#website');
  assert.equal(webpage.inLanguage, path.startsWith('/en/') ? 'en' : 'pt-BR');
  const person = entities.find(s => s['@type'] === 'Person');
  assert.equal(person?.['@id'], origin + '/autores/henrique-pett/#person');
  assert.equal(person.name, 'Henrique Pett');
  assert.equal(person.worksFor['@id'], origin + '/#organization');
  assert.equal(entities.find(s => s['@type'] === 'Organization')?.name, 'Torno Studio');
  const main = tags(doc, 'main')[0];
  for (const input of tags(main, 'input').filter(n=>attr(n,'type')==='checkbox')) assert(attr(input,'aria-label')?.trim(), 'task-list checkbox lacks accessible name');
  const md = await readFile('dist' + path + 'index.md', 'utf8');
  assert(md.length > 100);
  assert(!/author_basis|release_approval|confirmedBy|content_id/.test(md));
  // Every fragment introduced by navigation must resolve in its target document.
  const ids = all(doc, n => attr(n, 'id')).map(n => attr(n, 'id'));
  assert.equal(ids.length, new Set(ids).size, 'duplicate IDs');
  for (const a of tags(main, 'a')) {
    const href = attr(a, 'href');
    if (href?.startsWith('#')) assert(ids.includes(decodeURIComponent(href.slice(1))), `missing fragment ${href}`);
  }
  const headings = all(main, n => /^h[1-6]$/.test(n.tagName ?? '')).map(n => Number(n.tagName[1]));
  for (let i = 1; i < headings.length; i++) assert(headings[i] <= headings[i-1]+1, 'heading skips a level');
}]);

for (const entry of manifest.entries) checks.push([`${entry.path}: answer, byline, author profile, breadcrumbs and Markdown parity`, async () => {
  const { doc } = await page('dist', entry.path);
  const posting = schemas(doc).find(s => s['@type'] === 'BlogPosting');
  assert.equal(posting.author.name, 'Henrique Pett');
  assert.equal(posting.author.url, origin + '/autores/henrique-pett/');
  assert.equal(posting.publisher['@id'], origin + '/#organization');
  assert.equal(posting.mainEntityOfPage['@id'], entry.data.canonical_url + '#webpage');
  assert.equal(posting.image[0], origin + `/og/blog/${entry.locale}-${entry.slug}.png`);
  assert.equal(attr(metas(doc, 'property', 'og:image')[0], 'content'), posting.image[0]);
  const png=await readFile('dist'+new URL(posting.image[0]).pathname);
  assert.equal(png.readUInt32BE(16),1200);
  assert.equal(png.readUInt32BE(20),630);
  assert(!posting.datePublished && !posting.dateModified, 'no fabricated historical dates');
  assert.equal(attr(metas(doc, 'name', 'author')[0], 'content'), 'Henrique Pett');
  const main = tags(doc, 'main')[0];
  assert.match(text(main), /Escrito por Henrique Pett/);
  const authorLinks = tags(main, 'a').filter(a => attr(a, 'rel') === 'author');
  assert(authorLinks.length >= 2);
  assert(authorLinks.every(a => attr(a, 'href') === '/autores/henrique-pett/'));
  const answer = all(main, n => (attr(n, 'class') ?? '').split(' ').includes('article-answer'))[0];
  assert(answer, 'missing direct answer');
  const answerText = text(tags(answer, 'p')[0]);
  assert(answerText.length > 100);
  assert(!answers.has(answerText), 'duplicated answer across articles');
  answers.add(answerText);
  assert.equal(tags(answer, 'li').length, 3);
  const toc = tags(main, 'nav').find(n => attr(n, 'aria-label') === 'Neste artigo');
  assert(toc && tags(toc, 'a').length > 1);
  const breadcrumbs = schemas(doc).find(s => s['@type'] === 'BreadcrumbList');
  assert.equal(breadcrumbs.itemListElement.at(-1).item, entry.data.canonical_url);
  const md = await readFile('dist' + entry.path + 'index.md', 'utf8');
  assert(md.includes(answerText));
  assert.match(md, /Escrito por \[Henrique Pett\]/);
  assert(md.includes(origin + '/autores/henrique-pett/'));
}]);

for (const path of ['/autores/henrique-pett/','/en/authors/henrique-pett/']) checks.push([`${path}: verified ProfilePage and author archive`, async () => {
  const { doc } = await page('dist', path);
  const profile = flatten(doc).find(s => s['@type'] === 'ProfilePage');
  assert.equal(profile.mainEntity.name, 'Henrique Pett');
  assert.equal(profile.mainEntity['@id'], origin + '/autores/henrique-pett/#person');
  const alts = links(doc, 'alternate').filter(n => attr(n, 'hreflang'));
  assert.equal(alts.length, 3);
  if (!path.startsWith('/en/')) for (const e of manifest.entries) assert(tags(doc, 'a').some(a => attr(a, 'href') === e.path));
}]);

for (const path of baselinePaths.filter(p => !p.includes('/autores/') && !p.includes('/authors/'))) checks.push([`${path}: specific visible answer in HTML and Markdown`, async () => {
  const { doc } = await page('dist', path);
  const blocks = all(doc, n => (attr(n, 'class') ?? '').split(' ').includes('page-answer'));
  assert.equal(blocks.length, 1);
  assert.equal(tags(blocks[0], 'h2').length, 1);
  const answer = text(tags(blocks[0], 'p')[0]);
  assert(answer.length > 150);
  const md = await readFile('dist' + path + 'index.md', 'utf8');
  assert(md.includes(answer));
}]);

for (const path of blogIndices) checks.push([`${path}: author discovery and language-specific archive`, async () => {
  const { doc } = await page('dist', path);
  const archive = schemas(doc).find(s => s['@type'] === 'ItemList');
  if (path.startsWith('/en/')) assert(!archive, 'English archive must not claim untranslated articles');
  else {
    assert.equal(archive.numberOfItems, manifest.entries.length);
    for (const entry of manifest.entries) assert(archive.itemListElement.some(i => i.url === entry.data.canonical_url));
  }
  assert(tags(doc, 'a').some(a => attr(a, 'rel') === 'author'));
}]);

checks.push(['llms.txt exposes every public article and the author profiles', async () => {
  const body = await readFile('dist/llms.txt', 'utf8');
  for (const e of manifest.entries) assert(body.includes(e.path + 'index.md'));
  assert(body.includes('/autores/henrique-pett/index.md'));
  assert(!/author_basis|release_approval|status: review/.test(body));
}]);

for (const path of ['/diagnostico/','/404.html']) checks.push([`${path}: indexation policy preserved`, async () => {
  const { parse } = await import('parse5');
  const html = await readFile(path.endsWith('.html') ? 'dist' + path : 'dist' + path + 'index.html', 'utf8');
  const doc = parse(html);
  assert(metas(doc, 'name', 'robots').some(n => /noindex/.test(attr(n, 'content'))));
  assert.equal(links(doc, 'canonical').length, 0);
}]);

await runChecks(checks);
if (!process.exitCode) await writeFile('docs/qa/geo-20261029/local-verification.json', JSON.stringify({ checkedAt: new Date().toISOString(), pages: publicPaths.length, articles: manifest.entries.length, checks: checks.length, passed: true }, null, 2) + '\n');
