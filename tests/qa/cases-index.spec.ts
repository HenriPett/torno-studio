import { expect, test } from '@playwright/test';

/** Índice /cases/ e /en/cases/ (estratégia 2026-11 §6): três cards, seção honesta "Na sua indústria", CTA. */
for (const locale of ['pt-BR', 'en'] as const) {
  const prefix = locale === 'en' ? '/en' : '';
  const path = `${prefix}/cases/`;

  test(`${path}: cards, honestidade e SEO`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    for (const slug of ['loopt', 'bom-capital', 'ascende']) expect(html).toContain(`href="${prefix}/cases/${slug}/"`);
    expect(html).toContain(locale === 'en' ? 'In your plant' : 'Na sua indústria');
    expect(html).toContain(locale === 'en' ? 'does not yet have a published case study' : 'ainda não tem case publicado');
    expect(html).toContain('data-booking-cta');
    expect(html).not.toContain('href="/para/');
    expect(html).not.toMatch(/\bstudio\b/i);
    expect(html).not.toMatch(/−41%|−31%|Deicmar|Ecoporto|TBSA|Santos Brasil|Bandeirantes/);

    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    const origin = new URL(canonical!).origin;
    expect(canonical).toBe(origin + path);
    expect(html).toContain(`hreflang="pt-BR" href="${origin}/cases/"`);
    expect(html).toContain(`hreflang="en" href="${origin}/en/cases/"`);
    const og = html.match(/property="og:image" content="([^"]+)"/)![1]!;
    expect(og).toBe(`${origin}/og/cases/index-${locale}.png`);
    const png = await (await request.get(new URL(og).pathname)).body();
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
  });

  test(`${path}: sem rolagem horizontal a 360 px e cards clicáveis`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await page.locator(`a[href="${prefix}/cases/loopt/"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/cases/loopt/$`));
    await expect(page.locator('h1')).toHaveCount(1);
  });
}
