import AxeBuilder from '@axe-core/playwright';
import { test as pure } from '@playwright/test';

import { BANNER_ON, expect, test } from './fixtures';
import { DIAGNOSTICO, hits, norm, readableText, word } from './helpers';

/**
 * Landing /diagnostico/ (docs/landing/DIAGNOSTICO-SPEC.md; reescrita para o diagnóstico industrial, estratégia 2026-11 §6).
 * Os casos de consentimento (CS-a..n) rodam também nesta rota em consent.spec.ts (BOOKING_PAGES).
 */

const PATH = DIAGNOSTICO.path;
const BOOKING = process.env.QA_BOOKING_URL ?? '';

test.describe('/diagnostico/', () => {
  test('D1 responde 200, lang pt-BR, meta robots noindex,follow; canonical não aponta para a home', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    const robots = (await page.locator('meta[name="robots"]').getAttribute('content')) ?? '';
    expect(robots).toMatch(/noindex/);
    expect(robots).toMatch(/(^|,\s*)follow/);
    expect(robots).not.toMatch(/nofollow/);
    // Rota de campanha sem canonical (decisão do Compasso); se um dia tiver, nunca aponta para a home.
    const canon = page.locator('link[rel="canonical"]');
    if ((await canon.count()) > 0) expect(new URL((await canon.first().getAttribute('href'))!).pathname).toBe(PATH);
  });

  test('D2 fora do sitemap; robots.txt não bloqueia (AdsBot precisa rastrear)', async ({ request }) => {
    const index = await (await request.get('/sitemap-index.xml')).text();
    for (const loc of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const xml = await (await request.get(new URL(loc[1]!).pathname)).text();
      expect(xml).not.toContain('/diagnostico');
    }
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).not.toMatch(/Disallow:\s*\/(diagnostico|\s*$)/m);
    expect(robots).not.toMatch(/AdsBot[\s\S]*?Disallow:\s*\//);
  });

  test('D3 sem par EN quebrado: hreflang (se houver) responde 200; seletor de idioma leva a /en/', async ({ page }) => {
    await page.goto(PATH);
    for (const href of await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) => els.map((e) => e.getAttribute('href') ?? ''))) {
      expect((await page.request.get(new URL(href).pathname)).status(), href).toBe(200);
    }
    const sw = page.locator('header [data-lang-switch], header a[hreflang="en"]');
    if ((await sw.count()) > 0) await expect(sw.first()).toHaveAttribute('href', '/en/');
    expect(await page.locator('a[href*="/en/diagnostic"]').count()).toBe(0);
  });

  test('D4 conteúdo proibido: voz em 1ª pessoa, preço, métricas vetadas, clientes da Loopt, oferta antiga', async ({ page }) => {
    await page.goto(PATH);
    const text = await readableText(page);
    const main = norm((await page.locator('main').textContent()) ?? '');
    const rules: [string, RegExp, string][] = [
      ['Lovable', /lovable/i, text],
      ['FinPlan', /fin\s?plan/i, text],
      ['clientes da Loopt', /deicmar|eco\s?-?porto|tbsa|santos brasil|transbrasa|marimex|maersk|bandeirantes|alian[çc]a|bissani|gutierres/i, text],
      ['−41/−31%', /[−\-–]\s?(41|31)\s?%/u, text],
      ['Studio (fora do domínio tornostudio.com)', /studio(?!\.com)/i, text],
      ['eu/meu (voz da marca é "nós")', word('(eu|meu|minha|meus|minhas|comigo)'), main],
      ['preço', /R\$|US\$|mais barat[oa]|\d+\s?[x×](?![\p{L}\p{N}])/iu, main],
      ['oferta antiga', /product sprint|production-ready|mvp plus|garantia de 60 dias|founding engineer/i, text],
      ['neptune com link', /neptune\.ai\/blog/i, text],
      ['TODO/undefined', /TODO|undefined|NaN/, text],
    ];
    const found = rules.flatMap(([id, re, source]) => hits(source, re).map((h) => `${id}: ${h}`));
    expect(found).toEqual([]);
  });

  test('D5 placeholder "[Mote:" ausente (bloqueia o build de produção)', async ({ page }) => {
    await page.goto(PATH);
    const html = await page.content();
    expect(hits(html, /\[Mote:/)).toEqual([]);
  });

  test('D6 links de saída: nenhum linkedin.com nem Bom.Capital; fora do CTA, só a fonte pública (MundoLogística)', async ({ page, baseURL }) => {
    await page.goto(PATH);
    await expect(page.locator('a[href*="linkedin.com" i]')).toHaveCount(0);
    await expect(page.locator('a[href*="bom.capital" i], a[href*="bomcapital" i]')).toHaveCount(0);
    const origin = new URL(baseURL!).origin;
    // Fora do consentimento: só Calendly (CTA) e a matéria da MundoLogística. No diálogo: só as políticas dos fornecedores.
    const external = await page.locator('a[href]').evaluateAll((els, o) =>
      els
        .map((a) => ({ href: (a as HTMLAnchorElement).href, consent: !!a.closest('dialog[data-consent-dialog], [data-consent-banner]') }))
        .filter((l) => l.href.startsWith('http') && !l.href.startsWith(o)), origin);
    const onPage = external
      .filter((l) => !l.consent && !/^https:\/\/(calendly\.com\/henriquepett\/|mundologistica\.com\.br\/noticias\/loopt-ia-terminais-de-conteineres)/.test(l.href))
      .map((l) => l.href);
    const vendor = external.filter((l) => l.consent && !/^https:\/\/(calendly\.com\/legal\/|policies\.google\.com\/)/.test(l.href)).map((l) => l.href);
    expect(onPage).toEqual([]);
    expect(vendor).toEqual([]);
  });

  test('D7 provas: métrica da Loopt atribuída e com fonte; Bom.Capital como relato ("em média 48 horas"), sem link nem logo', async ({ page }) => {
    await page.goto(PATH);
    const provas = page.locator('#provas');
    await expect(provas).toContainText(/[−-]27\s?%/);
    await expect(provas).toContainText(/\+21\s?%/);
    await expect(provas).toContainText('segundo a Loopt');
    expect(await provas.locator('a[href^="https://mundologistica.com.br/"]').count()).toBeGreaterThanOrEqual(1);
    const bom = provas.locator('li').filter({ hasText: 'Bom.Capital' }).last();
    await expect(bom).toContainText(/em média,?\s*48 horas/i);
    await expect(bom).toContainText(/relato/i);
    await expect(bom.locator('a, img')).toHaveCount(0);
  });

  test('D8 sem preço: nenhum valor em R$/US$ e nenhuma escada de preços', async ({ page }) => {
    await page.goto(PATH);
    await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
    expect(hits(norm((await page.locator('main').textContent()) ?? ''), /R\$|US\$/)).toEqual([]);
    await expect(page.locator('main li[data-step], main .price')).toHaveCount(0);
  });

  test('D9 CTA único, repetido no header, no hero e no final, com o mesmo destino; header sem menu', async ({ page }) => {
    await page.goto(PATH);
    const ctas = page.locator('a[data-booking-cta]');
    expect(await page.locator('header a[data-booking-cta]').count()).toBeGreaterThan(0);
    expect(await ctas.count()).toBeGreaterThanOrEqual(3);
    const hrefs = new Set(await ctas.evaluateAll((els) => els.map((a) => a.getAttribute('href'))));
    expect(hrefs.size).toBe(1);
    if (BOOKING) expect([...hrefs][0]).toBe(BOOKING);
    expect(await page.locator('header nav a[href*="#"]').count(), 'header enxuto: sem menu de âncoras').toBe(0);
  });

  test('D10 footer com Privacidade e Preferências de cookies', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('footer a[href="/privacidade/"]')).toHaveCount(1);
    if (BANNER_ON) await expect(page.locator('footer [data-consent-open]')).toBeVisible();
  });

  test('D11 axe sem violação séria/crítica (claro e escuro, 360 e 1280)', async ({ page }) => {
    for (const theme of ['light', 'dark'] as const) {
      for (const width of [360, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ colorScheme: theme });
        await page.goto(PATH);
        await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
        const { violations } = await new AxeBuilder({ page }).analyze();
        expect(violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${theme} ${width}: ${v.id}`)).toEqual([]);
      }
    }
  });

  test('D12 um H1; sem scroll horizontal de 320 a 1920', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('h1')).toHaveCount(1);
    for (const width of [320, 360, 768, 1280, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(PATH);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${width}px`).toBeLessThanOrEqual(0);
    }
  });
});

pure('D13 CTA visível sem rolar em 360×640 com o banner aberto, sem ser coberto', async ({ page }) => {
  pure.skip(!BANNER_ON, 'banner só existe com PUBLIC_GADS_ID');
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto(PATH);
  const banner = page.locator('[data-consent-banner]');
  await expect(banner).toBeVisible();
  const cta = page.locator('main a[data-booking-cta]').first();
  await expect(cta).toBeInViewport({ ratio: 1 });
  const [b, c] = await Promise.all([banner.boundingBox(), cta.boundingBox()]);
  expect(b && c && (c.y + c.height <= b.y || c.y >= b.y + b.height), `CTA ${JSON.stringify(c)} x banner ${JSON.stringify(b)}`).toBe(true);
  expect(norm(await cta.innerText()).length).toBeGreaterThan(0);
});
