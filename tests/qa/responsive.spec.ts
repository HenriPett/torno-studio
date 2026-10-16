import { expect, test } from './fixtures';

import { NOT_FOUND, PAGES, WIDTHS, gotoWithTheme, openAllDetails, overflowingElements, type Theme } from './helpers';

/** Responsivo sem scroll horizontal (CHECKLIST.md §R; DESIGN §2: 320 a 1920 px, zoom 400% = 320 px). */

for (const p of [...PAGES, NOT_FOUND]) {
  for (const width of WIDTHS) {
    for (const theme of ['light', 'dark'] as Theme[]) {
      test(`R1 sem scroll horizontal: ${p.path} ${width}px ${theme}`, async ({ page }, info) => {
        await page.setViewportSize({ width, height: 900 });
        await gotoWithTheme(page, p.path, theme);
        await openAllDetails(page);
        const { scroll, client } = await page.evaluate(() => ({
          scroll: document.documentElement.scrollWidth,
          client: document.documentElement.clientWidth,
        }));
        if (scroll > client) {
          await info.attach(`overflow-${width}-${theme}.png`, { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
        }
        expect(scroll, `scrollWidth > clientWidth; culpados: ${(await overflowingElements(page)).join(', ')}`).toBeLessThanOrEqual(client);
      });
    }
  }
}

for (const p of PAGES.filter((x) => x.kind === 'home')) {
  test(`R2 acima da dobra em 360×640: H1 e CTA de agenda visíveis sem rolar: ${p.path}`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto(p.path);
    await expect(page.locator('h1')).toBeInViewport();
    const cta = page.locator('#inicio a').first();
    await expect(cta).toBeInViewport();
  });

  test(`R3 header fixo não cobre o título ao navegar por âncora: ${p.path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${p.path}#precos`);
    await page.waitForTimeout(300);
    const header = await page.locator('header').first().boundingBox();
    const h2 = await page.locator('#precos h2').boundingBox();
    expect(header && h2 && h2.y >= header.y + header.height - 1, `h2 em y=${h2?.y}, header até ${header && header.y + header.height}`).toBe(true);
  });

  test(`R4 screenshots de evidência (360/768/1280/1920, claro e escuro): ${p.path}`, async ({ page }, info) => {
    test.skip(!process.env.QA_SCREENSHOTS, 'defina QA_SCREENSHOTS=1 para gerar a galeria');
    for (const width of [360, 768, 1280, 1920]) {
      for (const theme of ['light', 'dark'] as Theme[]) {
        await page.setViewportSize({ width, height: 900 });
        await gotoWithTheme(page, p.path, theme);
        await info.attach(`${p.lang}-${width}-${theme}.png`, { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
      }
    }
  });
}
