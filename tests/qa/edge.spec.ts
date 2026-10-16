import { expect, test } from './fixtures';

import { HOMES } from './helpers';

/** Casos de borda que começaram manuais no CHECKLIST.md (A8, E1, K6, K7, K9, K10, T5). */

for (const { path, lang } of HOMES) {
  test(`A8 degrau alternativo anunciado com "ou"/"or" antes do nome: ${path}`, async ({ page }) => {
    await page.goto(path);
    const alt = lang === 'en' ? 'or' : 'ou';
    for (const name of ['Production-Ready', 'MVP Plus']) {
      await expect(page.locator('#precos').getByRole('heading', { level: 3, name: new RegExp(`^${alt}\\b.*${name}`) })).toHaveCount(1);
    }
  });

  test(`E1 sem JS: FAQ e "O que inclui" abrem, nav e idioma funcionam: ${path}`, async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(path);
    const faq = page.locator('#faq details').first();
    await faq.locator('summary').click();
    await expect(faq).toHaveAttribute('open', '');
    const rung = page.locator('#precos details').first();
    await rung.locator('summary').click();
    await expect(rung).toHaveAttribute('open', '');
    await page.locator('header nav a[href$="#faq"]').first().click();
    await expect(page).toHaveURL(/#faq$/);
    await page.locator('header [data-lang-switch]').click();
    await expect(page.locator('html')).toHaveAttribute('lang', lang === 'en' ? 'pt-BR' : 'en');
    await ctx.close();
  });

  test(`K6 ordem de tab segue a ordem visual (header → seções → footer): ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(path);
    const order: { region: string; y: number }[] = [];
    for (let i = 0; i < 120; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body || el.dataset.qaK6) return null;
        el.dataset.qaK6 = '1';
        const region = el.closest('header') ? 'header' : el.closest('footer') ? 'footer' : (el.closest('section[id]')?.id ?? 'other');
        return { region, y: el.getBoundingClientRect().top + window.scrollY };
      });
      if (!info) break;
      order.push(info);
    }
    const main = order.filter((o) => o.region !== 'header' && o.region !== 'footer' && o.region !== 'other');
    const backwards = main.flatMap((o, i) => (i > 0 && o.y < main[i - 1]!.y - 40 ? [`${main[i - 1]!.region}@${Math.round(main[i - 1]!.y)} -> ${o.region}@${Math.round(o.y)}`] : []));
    expect(backwards, 'foco voltou para cima dentro do main').toEqual([]);
    const regions = order.map((o) => o.region).filter((r, i, a) => r !== a[i - 1]);
    expect(regions[0] === 'other' ? regions[1] : regions[0]).toBe('header');
    expect(regions.at(-1)).toBe('footer');
  });

  test(`K7 foco não fica escondido sob o header fixo (Shift+Tab subindo): ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path);
    await page.locator('footer a').last().focus();
    const hidden: string[] = [];
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press('Shift+Tab');
      const r = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        if (el.closest('header')) return 'header';
        const header = document.querySelector('header')!.getBoundingClientRect();
        const box = el.getBoundingClientRect();
        return box.bottom <= header.bottom + 1 ? `${el.tagName} "${(el.textContent ?? '').trim().slice(0, 30)}"` : 'ok';
      });
      if (r === null || r === 'header') break;
      if (r !== 'ok') hidden.push(r);
    }
    expect(hidden).toEqual([]);
  });

  test(`K9 duplo clique rápido no toggle: estado final coerente após reload: ${path}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(path);
    const toggle = page.locator('header [data-theme-toggle]');
    await toggle.dblclick();
    const theme = await page.locator('html').getAttribute('data-theme');
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(theme);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme ?? 'light');
  });
}

test('K10 Back do navegador: âncora e troca de idioma voltam sem perder o tema', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.locator('header [data-theme-toggle]').click();
  await page.locator('header nav a[href$="#precos"]').first().click();
  await expect(page).toHaveURL(/\/#precos$/);
  await page.locator('header [data-lang-switch]').click();
  await expect(page).toHaveURL(/\/en\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/#precos$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
});

test('T5 localStorage bloqueado: página carrega sem erro e toggle não quebra', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() => {
    const deny = () => {
      throw new DOMException('blocked', 'SecurityError');
    };
    Object.defineProperty(window, 'localStorage', { get: deny, configurable: true });
  });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await page.locator('header [data-theme-toggle]').click({ trial: false }).catch(() => undefined);
  expect(errors).toEqual([]);
});
