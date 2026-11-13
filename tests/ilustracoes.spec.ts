import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

/**
 * Ilustrações e demo no topo (DESIGN-2026-11 §6.13, pedido de 2026-11-13):
 * (a) a demo de mensagem (AskMock) fica acima da dobra em 1440×900, na home e numa landing de setor;
 * (b) no celular a demo vem logo depois do CTA do hero;
 * (c) toda ilustração decorativa é aria-hidden ou tem nome acessível;
 * (d) com movimento reduzido nada fica escondido nas ilustrações;
 * (e) axe sem serious/critical nas seções novas, claro e escuro.
 */
const PAGES = ['/', '/para/textil/'];
const ILLOS = '.sf, .ab, .fd, .ic, .hf, .ai, .si';

async function scrollToEnd(page: Page) {
  await page.evaluate(async () => {
    const step = Math.round(innerHeight * 0.7);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
  });
}

for (const path of PAGES) {
  test.describe(`ilustrações ${path}`, () => {
    test('(a) demo de mensagem inteira acima da dobra em 1440×900', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(path);
      const mock = page.locator('main [data-ask] [role="img"]').first();
      await expect(mock).toBeVisible();
      const box = (await mock.boundingBox())!;
      expect(box.y).toBeGreaterThan(0);
      expect(box.y + box.height, 'fim do mock dentro da 1ª dobra').toBeLessThanOrEqual(900);
    });

    test('(b) celular: demo logo depois do CTA do hero', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      const cta = page.locator('main [data-booking-cta]').first();
      const demo = page.locator('main [data-ask]').first();
      const ctaBox = (await cta.boundingBox())!;
      const demoBox = (await demo.boundingBox())!;
      expect(demoBox.y).toBeGreaterThan(ctaBox.y);
      expect(demoBox.y, 'demo começa na 1ª dobra').toBeLessThan(844);
    });

    test('(c) ilustrações decorativas aria-hidden ou com nome acessível', async ({ page }) => {
      await page.goto(path);
      const bad = await page
        .locator('main svg')
        .evaluateAll((svgs) =>
          svgs
            .filter((svg) => !svg.closest('[aria-hidden="true"], [role="img"]') && !svg.getAttribute('aria-label') && !svg.querySelector('title'))
            .map((svg) => svg.parentElement?.className ?? '?'),
        );
      expect(bad).toEqual([]);
      // Há ilustrações de verdade na página (uma por "momento").
      expect(await page.locator(ILLOS).count()).toBeGreaterThan(5);
    });

    test.describe('(d) movimento reduzido', () => {
      test.use({ reducedMotion: 'reduce' });
      test('nada escondido nem encolhido nas ilustrações', async ({ page }) => {
        await page.goto(path);
        await scrollToEnd(page);
        const hidden = await page.locator(`main :is(${ILLOS}) *`).evaluateAll((els) =>
          els
            .filter((el) => {
              const cs = getComputedStyle(el);
              return Number(cs.opacity) < 0.999 && !el.closest('[hidden]') && !(el as SVGElement).getAttribute?.('opacity');
            })
            .map((el) => `${el.tagName}.${el.getAttribute('class')}`),
        );
        // Anéis e pulsos decorativos (sf__ring, sf__pulse, ai-ring) ficam parados e transparentes por desenho.
        expect(hidden.filter((name) => !/ring|pulse|stub/.test(name))).toEqual([]);
      });
    });

    for (const theme of ['light', 'dark'] as const) {
      test(`(e) axe nas ilustrações (${theme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: theme });
        await page.goto(path);
        await scrollToEnd(page);
        await page.waitForTimeout(3000);
        const res = await new AxeBuilder({ page }).include('main').analyze();
        const blocking = res.violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`);
        expect(blocking).toEqual([]);
      });
    }
  });
}

test('como trabalhamos: uma ilustração por etapa', async ({ page }) => {
  await page.goto('/como-trabalhamos/');
  const stages = page.locator('#etapas ol > li');
  const n = await stages.count();
  expect(n).toBeGreaterThan(2);
  await expect(page.locator('#etapas ol > li .si[aria-hidden="true"]')).toHaveCount(n);
});
