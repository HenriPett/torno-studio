import { expect, test } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import AxeBuilder from '@axe-core/playwright';

type HtmlNode = { tagName?: string; value?: string; children?: HtmlNode[]; properties?: Record<string, unknown> };
const nodes = (node: HtmlNode): HtmlNode[] => [node, ...(node.children || []).flatMap(nodes)];
const nodeText = (node: HtmlNode): string => node.value || (node.children || []).map(nodeText).join('');

for (const path of ['/', '/en/', '/about/', '/contact/', '/en/about/', '/en/contact/', '/privacidade/', '/en/privacy/']) {
  test(`${path}: meaningful raw content, H1 first, sequential headings and organization where applicable`, async ({ request }) => {
    const response = await request.get(path); expect(response.status()).toBe(200);
    const tree = nodes(unified().use(rehypeParse).parse(await response.text()) as HtmlNode);
    const main = tree.find(n => n.tagName === 'main'); expect(main).toBeTruthy();
    expect(nodeText(main!).length).toBeGreaterThan(500);
    const headings = tree.filter(n => /^h[1-6]$/.test(n.tagName || '')).map(n => Number(n.tagName![1]));
    expect(headings[0]).toBe(1); expect(headings.filter(n => n === 1)).toHaveLength(1);
    for (let i = 1; i < headings.length; i++) expect(headings[i]! - headings[i-1]!).toBeLessThanOrEqual(1);
    if (!path.includes('privac')) {
      const json = tree.filter(n => n.tagName === 'script' && n.properties?.type === 'application/ld+json').map(nodeText);
      const org = json.map(j => JSON.parse(j)).find(j => j['@type'] === 'Organization');
      expect(org.name.length).toBeGreaterThan(0); expect(new URL(org.url).pathname).toBe('/');
      const mail = tree.find(n => n.tagName === 'a' && String(n.properties?.href).startsWith('mailto:'));
      if (mail) { expect(org.contactPoint.contactType).toBe('sales'); expect(org.contactPoint.email).toBe(String(mail.properties!.href).slice(7)); }
      else expect(org.contactPoint).toBeUndefined();
      expect(org.sameAs).toEqual(['https://www.linkedin.com/company/torno-studio-software/']);
      expect(org.location.address['@type']).toBe('PostalAddress'); expect(org.address).toBeUndefined();
    }
    expect(tree.some(n => n.tagName === 'link' && (n.properties?.rel as string[] | undefined)?.includes('describedby') && n.properties?.href === '/llms.txt')).toBe(true);
    expect(tree.filter(n => n.tagName === 'dialog')).toHaveLength(1);
  });
}

for (const path of ['/about/', '/contact/', '/en/about/', '/en/contact/']) {
  test(`${path}: accessible trust page and working language switch`, async ({ page }) => {
    await page.goto(path);
    expect((await new AxeBuilder({ page }).analyze()).violations.filter(v => ['serious','critical'].includes(v.impact ?? '')).map(v => v.id)).toEqual([]);
    const expected = path.startsWith('/en/') ? path.replace('/en', '') : `/en${path}`;
    await page.locator('header a[hreflang]').click(); await expect(page).toHaveURL(new RegExp(`${expected}$`));
  });
}

test('llms.txt follows file-list format, gives actionable guidance, and only links public files', async ({ request }) => {
  const r = await request.get('/llms.txt'); expect(r.ok()).toBe(true);
  expect(r.headers()['content-type']).toContain('text/plain'); const body = await r.text();
  expect(body).toMatch(/^# [^\n]+\n\n> /); expect(body).toContain('When to use this'); expect(body).toContain('How to engage');
  for (const section of body.split(/^## /m).slice(1)) for (const line of section.split('\n').slice(1).filter(Boolean)) expect(line).toMatch(/^- \[[^\]]+\]\(https:\/\/[^)]+\)/);
  for (const [, href] of body.matchAll(/\]\((https:\/\/[^)]+)\)/g)) {
    const path = new URL(href!).pathname; const linked = await request.get(path); expect(linked.ok(), path).toBe(true);
  }
});

test('every public rendered page has nonempty Markdown; sitemap includes trust pages', async ({ request }) => {
  const files = (await readdir(resolve('dist'), { recursive: true })).filter(f => f.endsWith('index.html'));
  for (const file of files) {
    const md = await readFile(resolve('dist', file.replace(/\.html$/, '.md')), 'utf8');
    const html = await readFile(resolve('dist', file), 'utf8');
    const title = nodes(unified().use(rehypeParse).parse(html) as HtmlNode).find(n => n.tagName === 'title');
    expect(md).toContain(`> ${nodeText(title!)}`);
    expect(md.length, file).toBeGreaterThan(20); expect(md, file).not.toMatch(/<script|<style|data-consent-dialog/);
  }
  const xml = await (await request.get('/sitemap-0.xml')).text();
  for (const path of ['/about/', '/contact/', '/en/about/', '/en/contact/']) expect(xml).toContain(`${path}</loc>`);
});
