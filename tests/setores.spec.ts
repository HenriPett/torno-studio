import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Landings de setor (estratégia §7). Cada landing é testada sozinha: noindex, sem canonical/hreflang,
// estrutura de headings, acessibilidade, layout e selos de honestidade. Este arquivo NÃO importa o
// conteúdo dos setores (nenhum arquivo do projeto importa vários setores); só conhece os slugs.
// O teste global de isolamento do site (home, sitemap, llms.txt…) fica em outro spec.

const SLUGS = ['textil', 'alimentos', 'plasticos', 'maquinas', 'metalmecanica', 'moveis', 'eletroeletronicos', 'autopecas'];

for (const slug of SLUGS) {
  const path = `/para/${slug}/`;
  const others = SLUGS.filter((other) => other !== slug);

  test.describe(`landing ${path}`, () => {
    test('200, noindex, sem canonical e sem hreflang', async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
      await expect(page.locator('link[hreflang]')).toHaveCount(0);
    });

    test('uma H1 e headings sem pular nível', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('h1')).toHaveCount(1);
      const levels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((nodes) => nodes.map((node) => Number(node.tagName[1])));
      expect(levels[0]).toBe(1);
      for (let i = 1; i < levels.length; i++) expect(levels[i]! - levels[i - 1]!, `heading ${i}: h${levels[i - 1]} → h${levels[i]}`).toBeLessThanOrEqual(1);
    });

    for (const colorScheme of ['light', 'dark'] as const) {
      test(`axe sem violações serious/critical (${colorScheme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
        await page.goto(path);
        const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
        expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
      });
    }

    for (const width of [360, 768, 1280]) {
      test(`sem rolagem horizontal em ${width} px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path);
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scrollWidth).toBeLessThanOrEqual(width);
      });
    }

    test('CTA de agenda visível na primeira dobra em 390 px', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      const ctas = page.locator('a[data-booking-cta]');
      const inFold = await ctas.evaluateAll((nodes) =>
        nodes.some((node) => {
          const rect = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          return rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.bottom <= window.innerHeight && style.visibility !== 'hidden';
        }),
      );
      expect(inFold).toBe(true);
      // O CTA do hero (não só o do header) também cabe na dobra.
      await expect(page.locator('main a[data-booking-cta]').first()).toBeInViewport();
    });

    test('selos "Ilustração" e "Cenário ilustrativo" visíveis', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('.ds-mock__seal', { hasText: 'Ilustração' }).first()).toBeVisible();
      await expect(page.getByText('Cenário ilustrativo', { exact: true }).first()).toBeVisible();
    });

    test('fatos do contexto têm nota apontando para a lista de fontes, com links externos noopener', async ({ page }) => {
      await page.goto(path);
      const notes = page.locator('a[href^="#fonte-"]');
      expect(await notes.count()).toBeGreaterThan(0);
      for (const href of new Set(await notes.evaluateAll((nodes) => nodes.map((n) => n.getAttribute('href'))))) {
        await expect(page.locator(href!)).toHaveCount(1);
      }
      const sources = page.locator('[id^="fonte-"] a');
      expect(await sources.count()).toBeGreaterThan(0);
      for (const link of await sources.all()) {
        await expect(link).toHaveAttribute('href', /^https:\/\//);
        await expect(link).toHaveAttribute('rel', /noopener/);
      }
    });

    test('isolamento: não aponta para outra landing nem cita outro slug em links e assets', async ({ page }) => {
      await page.goto(path);
      const paraLinks = await page.locator('a[href*="/para/"]').evaluateAll((nodes) => nodes.map((n) => n.getAttribute('href')));
      expect(paraLinks.filter((href) => !href?.includes(path))).toEqual([]);
      const urls = await page.locator('[href], [src]').evaluateAll((nodes) => nodes.map((n) => n.getAttribute('href') ?? n.getAttribute('src') ?? ''));
      const leaks = urls.filter((url) => others.some((other) => new RegExp(`(^|[/._-])${other}([/._-]|$)`).test(url)));
      expect(leaks).toEqual([]);
    });

    test('links internos só para as páginas permitidas', async ({ page }) => {
      await page.goto(path);
      const allowed = new Set(['/', '/como-trabalhamos/', '/cases/', '/cases/loopt/', '/contact/', '/privacidade/', path]);
      const hrefs = await page.locator('a[href^="/"]').evaluateAll((nodes) => nodes.map((n) => n.getAttribute('href') ?? ''));
      const bad = hrefs.map((href) => href.split('#')[0]!).filter((href) => href && !allowed.has(href));
      expect(bad).toEqual([]);
    });
  });
}

test('/para/ não tem índice', async ({ request }) => {
  const response = await request.get('/para/');
  expect(response.status()).toBe(404);
});

test('páginas internas linkadas pelas landings existem', async ({ request }) => {
  for (const path of ['/como-trabalhamos/', '/cases/', '/cases/loopt/', '/contact/', '/privacidade/']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
});
