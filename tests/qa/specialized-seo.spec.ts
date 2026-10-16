import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { pricing, formatMoney } from '../../src/config/pricing';

// Contrato independente do mapa de rotas da implementação: detecta pares errados.
const pairs = [
  ['/recuperacao-de-projeto/', '/en/software-project-rescue/'],
  ['/lovable-em-producao/', '/en/lovable-to-production/'],
  ['/guias/rls-multiempresa/', '/en/guides/multi-tenant-rls/'],
] as const;
const pages = pairs.flatMap((pair, group) => pair.map((path, index) => ({
  path, pair, group, lang: index === 0 ? 'pt-BR' as const : 'en' as const,
})));
const indexing = process.env.QA_INDEXING === 'true';
const origin = process.env.QA_CANONICAL_ORIGIN ?? (indexing ? 'https://tornostudio.com' : process.env.QA_BASE_URL);
const normalize = (text: string) => text.replace(/\s+/g, ' ').trim();
const consent = (page: Page, action: string) => page.locator(`[data-consent-action="${action}"]`);
const thirdParty = /(^|\.)(google(tagmanager|adservices|syndication)?\.[a-z.]+|doubleclick\.net|calendly\.com|gstatic\.com)$/i;
async function open(page: Page, path: string) {
  const response = await page.goto(path);
  expect(response?.status(), path).toBe(200);
  return response!;
}

for (const p of pages) {
  test.describe(p.path, () => {
    test('SEO: canonical limpo, par real recíproco e indexação', async ({ page }) => {
      expect(origin, 'defina QA_CANONICAL_ORIGIN ou QA_BASE_URL').toBeTruthy();
      const response = await open(page, `${p.path}?utm_source=qa&gclid=qa#conteudo`);
      await expect(page.locator('html')).toHaveAttribute('lang', p.lang);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new URL(p.path, origin).href);
      const expected = { 'pt-BR': new URL(p.pair[0], origin).href, en: new URL(p.pair[1], origin).href, 'x-default': new URL(p.pair[1], origin).href };
      const alternates = async () => page.locator('link[rel="alternate"][hreflang]').evaluateAll(els => els.map(el => ({ lang: el.getAttribute('hreflang'), href: el.getAttribute('href') })));
      const links = await alternates();
      expect(links).toHaveLength(3);
      expect(Object.fromEntries(links.map(l => [l.lang, l.href]))).toEqual(expected);
      const directives = `${await page.locator('meta[name="robots"]').getAttribute('content').catch(() => '')} ${response.headers()['x-robots-tag'] ?? ''}`;
      if (indexing) expect(directives).not.toMatch(/noindex|\bnone\b/i);
      else expect(directives).toMatch(/noindex/i);
      await expect(page.locator('main h1')).toHaveCount(1);
      expect(await page.title()).not.toMatch(/404|not found/i);
      expect((await page.locator('meta[name="description"]').getAttribute('content'))?.length).toBeGreaterThanOrEqual(50);
      await open(page, p.lang === 'en' ? p.pair[0] : p.pair[1]);
      expect(Object.fromEntries((await alternates()).map(l => [l.lang, l.href]))).toEqual(expected);
    });

    test('Links: destinos, âncoras, seletor equivalente e nenhuma UTM interna', async ({ page, request, baseURL }) => {
      await open(page, p.path);
      const target = p.lang === 'en' ? p.pair[0] : p.pair[1];
      const switcher = page.locator('header a[data-lang-switch]');
      await expect(switcher).toHaveAttribute('href', target);
      const links = await page.locator('a[href]').evaluateAll(els => els.map(el => el.getAttribute('href')!));
      const internal = links.map(h => new URL(h, new URL(p.path, baseURL))).filter(u => u.origin === new URL(baseURL!).origin || u.origin === origin);
      for (const url of internal) {
        expect([...url.searchParams.keys()].filter(k => /^utm_|^gclid$|^fbclid$/i.test(k)), url.href).toEqual([]);
      }
      for (const path of new Set(internal.map(u => u.pathname + u.search))) {
        const response = await request.get(path);
        expect(response.status(), path).toBe(200);
      }
      for (const hash of new Set(internal.filter(u => u.pathname === p.path && u.hash).map(u => decodeURIComponent(u.hash.slice(1))))) {
        expect(await page.evaluate(id => Boolean(document.getElementById(id)), hash), `âncora #${hash}`).toBe(true);
      }
      await switcher.click();
      await expect(page).toHaveURL(new RegExp(`${target}$`));
      await page.goBack();
      await expect(page).toHaveURL(new RegExp(`${p.path}$`));
    });

    for (const width of [360, 390, 768, 1280]) {
      test(`UI: ${width}px, axe, CTA acionável e sem overflow`, async ({ page }) => {
        await page.setViewportSize({ width, height: 844 });
        await open(page, p.path);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
        const violations = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations;
        expect(violations.map(v => ({ id: v.id, impact: v.impact, targets: v.nodes.map(n => n.target) }))).toEqual([]);
        const cta = page.locator('main a[data-booking-cta]').first();
        await expect(cta).toHaveAttribute('href', /^https:\/\/calendly\.com\//);
        await cta.click({ trial: true }); // Nunca agenda ou dispara conversão.
        await page.screenshot({ path: `docs/qa/seo-especializado-20261013/${p.group}-${p.lang}-${width}.png`, fullPage: true });
      });
    }

    test('Consentimento: primeira visita e recusa sem terceiros nem atribuição persistida', async ({ page, context }) => {
      const seen: string[] = [];
      page.on('request', req => { if (thirdParty.test(new URL(req.url()).hostname)) seen.push(req.url()); });
      await open(page, `${p.path}?utm_source=qa&utm_campaign=seo&gclid=nao-repassar`);
      await expect(page.locator('[data-consent-banner]')).toBeVisible();
      await page.waitForLoadState('networkidle');
      expect(seen).toEqual([]);
      expect(await page.evaluate(() => sessionStorage.getItem('ts-utm'))).toBeNull();
      await consent(page, 'reject').click();
      await page.reload({ waitUntil: 'networkidle' });
      expect(seen).toEqual([]);
      expect(await page.evaluate(() => sessionStorage.getItem('ts-utm'))).toBeNull();
      expect((await context.cookies()).filter(c => /^_ga|^_gcl_/.test(c.name))).toEqual([]);
      await expect(page.locator('main a[data-booking-cta]').first()).not.toHaveAttribute('href', /utm_|gclid/);
    });

    test('Atribuição: medição apenas, navegação interna preserva origem; Calendly simulado', async ({ page }) => {
      // Intercepta todos os recursos externos relevantes antes de qualquer consentimento.
      const google: string[] = [];
      await page.route(/google|doubleclick/i, route => { google.push(route.request().url()); return route.abort(); });
      await page.route(/https:\/\/assets\.calendly\.com\/.*widget\.css/, route => route.fulfill({ contentType: 'text/css', body: '' }));
      await page.route(/https:\/\/assets\.calendly\.com\/.*widget\.js/, route => route.fulfill({ contentType: 'application/javascript', body: 'window.__qaBookings=[];window.Calendly={initPopupWidget:o=>window.__qaBookings.push(o)};' }));
      await page.route(/https:\/\/(?:www\.)?calendly\.com\//, route => route.fulfill({ contentType: 'text/html', body: 'QA: agenda interceptada' }));
      await open(page, `${p.path}?utm_source=qa&utm_campaign=seo%20a%C3%A7%C3%A3o&gclid=nao-repassar`);
      await consent(page, 'customize').click();
      await page.locator('input[name="medicao"]').check();
      await expect(page.locator('input[name="publicidade"]')).not.toBeChecked();
      await consent(page, 'save').click();
      const arrived = await page.evaluate(() => JSON.parse(sessionStorage.getItem('ts-utm') ?? '{}'));
      expect(arrived).toEqual({ utmSource: 'qa', utmCampaign: 'seo ação' });
      await page.locator('header a[data-lang-switch]').click();
      expect(page.url()).not.toMatch(/utm_|gclid/);
      expect(await page.evaluate(() => JSON.parse(sessionStorage.getItem('ts-utm') ?? '{}'))).toEqual(arrived);
      await page.locator('main a[data-booking-cta]').first().click();
      await expect.poll(() => page.evaluate(() => (window as any).__qaBookings?.length ?? 0)).toBe(1);
      expect(await page.evaluate(() => (window as any).__qaBookings[0].utm)).toEqual(arrived);
      expect(google).toEqual([]);
      await page.locator('footer [data-consent-open]').click();
      await consent(page, 'reject-all').click();
      await expect.poll(() => page.evaluate(() => sessionStorage.getItem('ts-utm'))).toBeNull();
    });

    if (p.group < 2) test('FAQ: Tab, Enter, Espaço e foco visível', async ({ page }) => {
      await open(page, p.path);
      await consent(page, 'reject').click();
      const summary = page.locator('main details summary').first();
      const details = page.locator('main details').first();
      await summary.focus();
      await expect(summary).toBeFocused();
      await expect(details).not.toHaveAttribute('open');
      await page.keyboard.press('Enter');
      await expect(details).toHaveAttribute('open', '');
      await page.keyboard.press('Space');
      await expect(details).not.toHaveAttribute('open');
      await page.keyboard.press('Tab');
      await expect(page.locator('main details summary').nth(1)).toBeFocused();
      const focus = await page.locator(':focus').evaluate(el => {
        const style = getComputedStyle(el);
        return { visible: el.matches(':focus-visible'), outline: style.outlineStyle, width: style.outlineWidth };
      });
      expect(focus.visible).toBe(true);
      expect(focus.outline).not.toBe('none');
      expect(parseFloat(focus.width)).toBeGreaterThan(0);
    });

    if (p.group < 2) test('Comercial: preços aprovados, escopo e qualificação do cliente', async ({ page }) => {
      await open(page, p.path);
      const text = normalize(await page.locator('main').innerText());
      if (p.lang === 'pt-BR' && p.group === 0) expect(text).toMatch(/50\s*[–—-]\s*249/);
      for (const id of ['productionReady', 'sprint']) {
        const price = pricing[p.lang].steps.find(s => s.id === id)!.price;
        expect(price.kind).toBe('fixed');
        if (price.kind === 'fixed') expect(text).toContain(normalize(formatMoney(price.amount, p.lang)));
      }
      const patterns = p.lang === 'pt-BR'
        ? [/opera[çc][aã]o/i, /escopo/i, /or[çc]amento/i, /decisor|decis[aã]o/i, /acesso/i, /autoriz/i, /impacto/i]
        : [/funded|funding|revenue/i, /founder/i, /users?|pilot/i, /scope/i, /budget/i, /decision/i, /access/i, /authori[sz]/i, /impact/i];
      for (const pattern of patterns) expect(text).toMatch(pattern);
    });

    if (p.group === 2) test('Guia: SQL legível e conteúdo de isolamento multiempresa', async ({ page }) => {
      await open(page, p.path);
      const sql = (await page.locator('main pre code').allTextContents()).join('\n');
      expect(sql).toMatch(/enable row level security/i);
      expect(sql).toMatch(/create policy/i);
      expect(sql).toMatch(/auth\.uid\(\)/i);
      expect(sql).toMatch(/with check/i);
      expect(sql).toMatch(/tenant|organi[sz]ation|empresa/i);
      // Segurança efetiva exige também revisão manual/execução SQL; presença não prova isolamento.
    });
  });
}

test('@http Sitemap: 10 URLs, pares exatos, sem diagnóstico; robots permite crawler', async ({ request }) => {
  const expectedPaths = ['/', '/en/', '/privacidade/', '/en/privacy/', ...pages.map(p => p.path)];
  const index = await request.get('/sitemap-index.xml');
  expect(index.status()).toBe(200);
  const locations = [...(await index.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]!);
  expect(locations.length).toBeGreaterThan(0);
  const found: string[] = [];
  for (const map of locations) {
    expect(new URL(map).origin).toBe(new URL(origin!).origin);
    const response = await request.get(new URL(map).pathname);
    expect(response.status()).toBe(200);
    for (const block of (await response.text()).split('<url>').slice(1)) {
      const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
      expect(loc).toBeTruthy();
      expect(new URL(loc!).origin).toBe(new URL(origin!).origin);
      const path = new URL(loc!).pathname;
      found.push(path);
      const spec = pages.find(p => p.path === path);
      if (spec) {
        const links = [...block.matchAll(/<xhtml:link\b[^>]*>/g)].map(m => m[0]);
        expect(links).toHaveLength(3);
        const alts = Object.fromEntries(links.map(l => [l.match(/hreflang="([^"]+)"/)?.[1], l.match(/href="([^"]+)"/)?.[1]]));
        expect(alts).toEqual({ 'pt-BR': new URL(spec.pair[0], origin).href, en: new URL(spec.pair[1], origin).href, 'x-default': new URL(spec.pair[1], origin).href });
      }
    }
  }
  expect(found.sort()).toEqual(expectedPaths.sort());
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  const text = await robots.text();
  expect(text).not.toMatch(/Disallow:\s*\/\s*$/m);
  expect(text).toContain(new URL('/sitemap-index.xml', origin).href);
});

test('Diagnóstico continua noindex, sem canonical/hreflang', async ({ page }) => {
  await open(page, '/diagnostico/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('link[rel="canonical"], link[hreflang]')).toHaveCount(0);
});

test('Descoberta: home liga comerciais, comerciais ligam guia no idioma', async ({ page }) => {
  for (const [index, home] of ['/', '/en/'].entries()) {
    await open(page, home);
    for (const pair of pairs.slice(0, 2)) await expect(page.locator(`a[href="${pair[index]}"]`).first()).toBeVisible();
    for (const pair of pairs.slice(0, 2)) {
      await open(page, pair[index]!);
      await expect(page.locator(`main a[href="${pairs[2][index]}"]`).first()).toBeVisible();
    }
  }
});

// Runner sem Chromium. parse5 já está instalado transitivamente no projeto.
async function documentOf(html: string) {
  const { parse } = await import('parse5');
  const root = parse(html);
  const all: any[] = [];
  const walk = (node: any) => { all.push(node); for (const child of node.childNodes ?? []) walk(child); };
  walk(root);
  const attr = (node: any, key: string): string => node.attrs?.find((a: any) => a.name === key)?.value ?? '';
  const text = (node: any): string => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join(' ');
  return { all, attr, text };
}

for (const p of pages) test(`@http ${p.path} HTML, SEO, schema, conteúdo e links`, async ({ request }, testInfo) => {
  const response = await request.get(`${p.path}?utm_source=qa&gclid=qa`);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toMatch(/text\/html/);
  const html = await response.text();
  await testInfo.attach('html', { body: html, contentType: 'text/html' });
  const { all, attr, text } = await documentOf(html);
  const nodes = (tag: string) => all.filter(n => n.tagName === tag);
  const canonical = nodes('link').filter(n => attr(n, 'rel') === 'canonical');
  expect(canonical).toHaveLength(1);
  expect(attr(canonical[0], 'href')).toBe(new URL(p.path, origin).href);
  expect(attr(nodes('html')[0], 'lang')).toBe(p.lang);
  const alternates = nodes('link').filter(n => attr(n, 'hreflang'));
  expect(alternates).toHaveLength(3);
  expect(Object.fromEntries(alternates.map(n => [attr(n, 'hreflang'), attr(n, 'href')]))).toEqual({
    'pt-BR': new URL(p.pair[0], origin).href, en: new URL(p.pair[1], origin).href, 'x-default': new URL(p.pair[1], origin).href,
  });
  const edgeNoindex = process.env.QA_PREVIEW_EDGE_NOINDEX === 'true';
  const header = response.headers()['x-robots-tag'] ?? '';
  if (edgeNoindex) {
    expect(new URL(response.url()).hostname).toMatch(/--tornostudio\.netlify\.app$/);
    expect(header).toMatch(/noindex/i);
  }
  const directives = nodes('meta').filter(n => /^(robots|googlebot)$/i.test(attr(n, 'name'))).map(n => attr(n, 'content')).join(' ') + ' ' + (edgeNoindex ? '' : header);
  if (indexing) expect(directives).not.toMatch(/noindex|\bnone\b/i);
  else expect(directives).toMatch(/noindex/i);
  expect(nodes('h1')).toHaveLength(1);
  expect(text(nodes('title')[0]).length).toBeGreaterThan(10);
  const description = nodes('meta').find(n => attr(n, 'name') === 'description');
  expect(attr(description, 'content').length).toBeGreaterThanOrEqual(50);
  expect(attr(description, 'content').length).toBeLessThanOrEqual(160);
  const main = normalize(text(nodes('main')[0]));
  expect(main).not.toMatch(/\[Mote:|Lorem ipsum|TODO/);
  const booking = nodes('a').filter(n => n.attrs?.some((a: any) => a.name === 'data-booking-cta'));
  expect(booking.length).toBeGreaterThan(0);
  for (const link of booking) {
    expect(attr(link, 'href')).toMatch(/^https:\/\/calendly\.com\//);
    expect(attr(link, 'href')).not.toMatch(/utm_|gclid/);
    expect(normalize(text(link)).length).toBeGreaterThan(3);
  }
  const scripts = nodes('script').filter(n => attr(n, 'type') === 'application/ld+json');
  for (const script of scripts) {
    const schema = JSON.parse(text(script));
    expect(schema).toBeTruthy();
    expect(JSON.stringify(schema)).not.toMatch(/localhost|preview\.invalid|utm_/);
  }
  for (const image of nodes('img')) expect(image.attrs.some((a: any) => a.name === 'alt')).toBe(true);
  const internal = nodes('a').map(n => new URL(attr(n, 'href'), new URL(p.path, response.url()))).filter(u => [new URL(response.url()).origin, new URL(origin!).origin].includes(u.origin));
  for (const url of internal) expect([...url.searchParams.keys()].filter(k => /^utm_|^gclid$|^fbclid$/i.test(k)), url.href).toEqual([]);
  for (const path of new Set(internal.map(u => u.pathname))) {
    const target = await request.get(path);
    expect(target.status(), `${p.path} -> ${path}`).toBe(200);
    const hashes = internal.filter(u => u.pathname === path && u.hash).map(u => decodeURIComponent(u.hash.slice(1)));
    if (hashes.length) {
      const destination = await documentOf(await target.text());
      for (const hash of hashes) expect(destination.all.some(n => destination.attr(n, 'id') === hash), `${path}#${hash}`).toBe(true);
    }
  }
  for (const hash of internal.filter(u => u.pathname === p.path && u.hash).map(u => decodeURIComponent(u.hash.slice(1)))) expect(all.some(n => attr(n, 'id') === hash), `âncora ${hash}`).toBe(true);
  if (p.group < 2) {
    if (p.lang === 'pt-BR' && p.group === 0) expect(main).toMatch(/50\s*[–—-]\s*249/);
    for (const id of ['sprint', 'productionReady']) {
      const price = pricing[p.lang].steps.find(s => s.id === id)!.price;
      if (price.kind === 'fixed') expect(main).toContain(normalize(formatMoney(price.amount, p.lang)));
    }
    for (const pattern of p.lang === 'pt-BR' ? [/opera[çc][aã]o/i, /escopo/i, /or[çc]amento/i, /decisor|decis[aã]o/i, /acesso/i, /autoriz/i, /impacto/i] : [/funded|funding|revenue/i, /founder/i, /users?|pilot/i, /scope/i, /budget/i, /decision/i, /access/i, /authori[sz]/i, /impact/i]) expect(main).toMatch(pattern);
  } else {
    const sql = nodes('pre').map(text).join('\n');
    for (const pattern of [/enable row level security/i, /create policy/i, /auth\.uid\(\)/i, /with check/i]) expect(sql).toMatch(pattern);
  }
});

test('@http diagnóstico noindex e descoberta nas homes', async ({ request }) => {
  const response = await request.get('/diagnostico/');
  expect(response.status()).toBe(200);
  const { all, attr } = await documentOf(await response.text());
  expect(all.filter(n => n.tagName === 'meta' && attr(n, 'name') === 'robots').map(n => attr(n, 'content')).join(' ')).toMatch(/noindex/);
  expect(all.filter(n => n.tagName === 'link' && (attr(n, 'rel') === 'canonical' || attr(n, 'hreflang')))).toHaveLength(0);
  for (const [index, home] of ['/', '/en/'].entries()) {
    const response = await request.get(home);
    expect(response.status()).toBe(200);
    const doc = await documentOf(await response.text());
    for (const pair of pairs.slice(0, 2)) expect(doc.all.some(n => n.tagName === 'a' && doc.attr(n, 'href') === pair[index]), `${home} -> ${pair[index]}`).toBe(true);
  }
});
