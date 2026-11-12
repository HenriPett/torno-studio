import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { chrome } from '../src/content/chrome';

// Página de referência do design system (src/pages/design-system.astro, DESIGN-2026-11.md).

const PATH = '/design-system/';

test.describe('design system', () => {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`axe sem violações serious/critical (${colorScheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
      await page.goto(PATH);
      const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    });
  }

  for (const width of [360, 768, 1280]) {
    test(`sem scroll horizontal em ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(PATH);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(width);
    });
  }

  test('noindex e sem canonical', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });

  test('todo mock tem o selo de ilustração visível e nome acessível com ele', async ({ page }) => {
    await page.goto(PATH);
    const mocks = page.locator('.ds-mock');
    expect(await mocks.count()).toBeGreaterThanOrEqual(3);
    const labels = [chrome['pt-BR'].common.illustration, chrome.en.common.illustration];
    for (const mock of await mocks.all()) {
      const seal = mock.locator('.ds-mock__seal');
      await expect(seal).toBeVisible();
      expect(labels).toContain((await seal.textContent())?.trim());
      await expect(mock.getByRole('img')).toHaveAttribute('aria-label', new RegExp(`^(${labels.join('|')}): `));
    }
  });

  test('CTA de agenda mantém data-booking-cta', async ({ page }) => {
    await page.goto(PATH);
    expect(await page.locator('a[data-booking-cta]').count()).toBeGreaterThanOrEqual(3);
  });
});
