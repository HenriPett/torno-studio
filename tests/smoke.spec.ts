import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

/** Pares de páginas equivalentes (espelha src/config/routes.mjs). */
const pairs = [
  { pt: '/', en: '/en/' },
  { pt: '/privacidade/', en: '/en/privacy/' },
];

const pages = pairs.flatMap(({ pt, en }) => [
  { path: pt, lang: 'pt-BR', pair: { pt, en } },
  { path: en, lang: 'en', pair: { pt, en } },
]);

async function hreflangs(page: Page): Promise<Record<string, string>> {
  const links = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) =>
    els.map((el) => [el.getAttribute('hreflang') ?? '', new URL(el.getAttribute('href') ?? '').pathname]),
  );
  return Object.fromEntries(links);
}

for (const { path, lang, pair } of pages) {
  test.describe(path, () => {
    test('lang, canonical e hreflang', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(new URL(canonical ?? '').pathname).toBe(path);

      expect(await hreflangs(page)).toEqual({ 'pt-BR': pair.pt, en: pair.en, 'x-default': pair.en });
    });

    test('marca vem de SITE_BRAND no title, header, footer e og:site_name', async ({ page }) => {
      await page.goto(path);
      const brand = (await page.locator('meta[property="og:site_name"]').getAttribute('content')) ?? '';
      expect(brand).not.toBe('');
      await expect(page).toHaveTitle(new RegExp(brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      await expect(page.locator('header [data-brand]')).toHaveText(brand);
      await expect(page.locator('footer [data-brand]')).toHaveText(brand);
    });

    test('sem violações axe sérias ou críticas', async ({ page }) => {
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page }).analyze();
      const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(blocking.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });
  });
}

test('seletor de idioma leva à página equivalente', async ({ page }) => {
  await page.goto('/privacidade/');
  await page.locator('header a[hreflang="en"]').click();
  await expect(page).toHaveURL(/\/en\/privacy\/$/);
});

test('404 é noindex e sem canonical/hreflang', async ({ page }) => {
  const response = await page.goto('/nao-existe/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
});

test('robots.txt e sitemap', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toMatch(/Sitemap: .+\/sitemap-index\.xml/);
  const sitemap = await request.get('/sitemap-0.xml');
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  for (const { pt, en } of pairs) {
    expect(xml).toContain(`${pt}</loc>`);
    expect(xml).toContain(`${en}</loc>`);
  }
  expect(xml).toContain('hreflang="x-default"');
});

// B3: a privacidade sempre mostra um canal de contato. Sem PUBLIC_CONTACT_EMAIL (preview/dev), o LinkedIn.
// Para testar o outro estado: PUBLIC_CONTACT_EMAIL=x@y.z npm test (o build e o teste leem a mesma env).
for (const path of ['/privacidade/', '/en/privacy/']) {
  test(`${path} tem canal de contato`, async ({ page }) => {
    await page.goto(path);
    const email = (process.env.PUBLIC_CONTACT_EMAIL ?? '').trim();
    if (email) {
      await expect(page.locator(`[data-contact="email"] a[href="mailto:${email}"]`)).toHaveCount(1);
      await expect(page.locator('[data-contact="linkedin"]')).toHaveCount(0);
    } else {
      await expect(page.locator('[data-contact="linkedin"] a[href*="linkedin.com"]')).toHaveCount(1);
      await expect(page.locator('[data-contact="email"]')).toHaveCount(0);
    }
  });
}
