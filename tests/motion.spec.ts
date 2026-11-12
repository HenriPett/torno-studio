import { expect, test, type Page } from '@playwright/test';

/**
 * Motion (DESIGN-2026-11 §9, src/scripts/motion.ts): progressivo, acessível e sem custo de layout.
 * (a) movimento reduzido: nada escondido, contadores no valor final; (b) sem JS: tudo visível;
 * (c) abas da demo pelo teclado; (d) depois de rolar a home inteira nada fica escondido;
 * (e) sem rolagem horizontal; (f) carrossel do celular rola pelo teclado.
 */

/** Elementos visíveis do <main> com opacidade efetiva < 1 (ignora decorativos aria-hidden e mocks, que têm sinais próprios). */
const translucent = (page: Page) =>
  page.evaluate(() => {
    const out: string[] = [];
    for (const el of Array.from(document.querySelectorAll<HTMLElement>('main *'))) {
      if (el.closest('[aria-hidden="true"], [role="img"], [hidden]')) continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      let node: HTMLElement | null = el;
      let opacity = 1;
      while (node && node !== document.body) {
        opacity *= Number(getComputedStyle(node).opacity);
        node = node.parentElement;
      }
      if (opacity < 0.999) out.push(`${el.tagName.toLowerCase()}.${el.className} (${opacity.toFixed(2)})`);
    }
    return out;
  });

async function scrollToEnd(page: Page) {
  await page.evaluate(async () => {
    const step = Math.round(innerHeight * 0.7);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    scrollTo(0, document.documentElement.scrollHeight);
  });
}

test.describe('motion: movimento reduzido', () => {
  test.use({ reducedMotion: 'reduce' });

  for (const path of ['/', '/para/textil/', '/cases/loopt/']) {
    test(`(a) ${path}: nada com opacidade < 1 e contadores no valor final`, async ({ page, request }) => {
      const html = await (await request.get(path)).text();
      await page.goto(path);
      await expect(page.locator('html')).not.toHaveClass(/motion-ready/);
      await scrollToEnd(page);
      expect(await translucent(page)).toEqual([]);
      const values = await page.locator('[data-count]').allTextContents();
      expect(values.length).toBeGreaterThan(0);
      for (const value of values) expect(html, value).toContain(`>${value}</`);
    });
  }

  test('(a) abas trocam sem digitação', async ({ page }) => {
    await page.goto('/');
    const tabs = page.locator('#cerebro-demo-tab-1');
    await tabs.click();
    const thread = page.locator('[data-thread]:not([hidden])');
    await expect(thread).not.toHaveAttribute('data-state', /.*/);
    await expect(page.locator('.ask__typing')).toHaveText('');
  });
});

test.describe('motion: sem JS', () => {
  test.use({ javaScriptEnabled: false });

  for (const path of ['/', '/para/textil/', '/cases/']) {
    test(`(b) ${path}: todo o conteúdo visível`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).not.toHaveClass(/js-motion/);
      expect(await translucent(page)).toEqual([]);
      await expect(page.locator('h1')).toBeVisible();
    });
  }

  test('(b) demo mostra o primeiro exemplo completo, sem abas', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[role="tablist"]')).toBeHidden();
    const first = page.locator('[data-thread]').first();
    await expect(first).toBeVisible();
    await expect(first.locator('.ask__text')).toBeVisible();
    await expect(first.locator('.ask__source').first()).toBeVisible();
  });
});

test.describe('motion: ligado', () => {
  test('(c) abas da demo: setas, Home/End, aria-selected e aria-controls', async ({ page }) => {
    await page.goto('/');
    const tabs = page.getByRole('tab');
    const n = await tabs.count();
    expect(n).toBeGreaterThanOrEqual(4);
    const panel = page.getByRole('tabpanel');
    for (let k = 0; k < n; k++) await expect(tabs.nth(k)).toHaveAttribute('aria-controls', (await panel.getAttribute('id'))!);
    await tabs.first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'false');
    await expect(tabs.nth(1)).toHaveAttribute('tabindex', '0');
    await expect(tabs.nth(0)).toHaveAttribute('tabindex', '-1');
    await expect(panel).toHaveAttribute('aria-labelledby', (await tabs.nth(1).getAttribute('id'))!);
    await expect(page.locator('[data-thread]').nth(1)).not.toHaveAttribute('hidden', /.*/);
    await expect(page.locator('[data-thread]').nth(0)).toHaveAttribute('hidden', /.*/);
    await page.keyboard.press('End');
    await expect(tabs.nth(n - 1)).toBeFocused();
    await expect(tabs.nth(n - 1)).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowLeft');
    await expect(tabs.nth(n - 1)).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('Home');
    await expect(tabs.nth(0)).toBeFocused();
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
    // O nome da imagem acompanha a aba ativa; a sequência termina com a resposta completa.
    await tabs.nth(2).click();
    const label = await page.locator('[data-thread]').nth(2).getAttribute('data-label');
    await expect(page.locator('.ask-demo [role="img"]')).toHaveAttribute('aria-label', label!);
    await expect(page.locator('[data-thread]').nth(2)).not.toHaveAttribute('data-state', /.*/, { timeout: 8000 });
  });

  for (const width of [1280, 390]) {
    test(`(d) home ${width}: depois de rolar até o fim nenhum [data-reveal] fica escondido`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      await expect(page.locator('html')).toHaveClass(/motion-ready/);
      await scrollToEnd(page);
      await page.waitForTimeout(2500);
      const hidden = await page.locator('[data-reveal]').evaluateAll((els) =>
        els.filter((el) => Number(getComputedStyle(el).opacity) < 1).map((el) => `${el.tagName}.${el.className}`),
      );
      expect(hidden).toEqual([]);
      expect(await page.locator('[data-reveal]:not(.is-in)').count()).toBe(0);
    });
  }

  for (const path of ['/', '/para/textil/', '/cases/']) {
    for (const width of [360, 768, 1280]) {
      test(`(e) ${path} ${width}px sem rolagem horizontal`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path);
        await scrollToEnd(page);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
      });
    }
  }

  test('(f) carrossel do celular rola pelo teclado', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const track = page.locator('.home-areas.carousel-sm');
    await expect(track).toHaveAttribute('tabindex', '0');
    await track.scrollIntoViewIfNeeded();
    await track.focus();
    await expect(track).toBeFocused();
    expect(await track.evaluate((el) => el.scrollLeft)).toBe(0);
    for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowRight');
    await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
    // Desktop: a mesma lista é grade e não vira parada de Tab.
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(track).not.toHaveAttribute('tabindex', /.*/);
  });
});
