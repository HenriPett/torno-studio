import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from './fixtures';

import { HOMES, NOT_FOUND, PAGES, gotoWithTheme, openAllDetails, type Theme } from './helpers';

/** Acessibilidade, teclado e foco (CHECKLIST.md §A e §K; DESIGN §6 e §9). */

const THEMES: Theme[] = ['light', 'dark'];

for (const p of [...PAGES, NOT_FOUND]) {
  for (const theme of THEMES) {
    for (const width of [360, 1280]) {
      test(`A1 axe sem violação séria/crítica: ${p.path} ${theme} ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await gotoWithTheme(page, p.path, theme);
        await openAllDetails(page);
        const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
        const blocking = violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map((v) => `${v.impact} ${v.id}: ${v.help} -> ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
        expect(blocking).toEqual([]);
      });
    }
  }
}

for (const p of PAGES) {
  test.describe(`${p.path} estrutura`, () => {
    test('A2 um H1, sem salto de nível de heading', async ({ page }) => {
      await page.goto(p.path);
      const levels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((els) => els.map((el) => Number(el.tagName[1])));
      expect(levels.filter((l) => l === 1)).toHaveLength(1);
      const jumps = levels.flatMap((l, i) => (i > 0 && l > levels[i - 1]! + 1 ? [`h${levels[i - 1]} -> h${l}`] : []));
      expect(jumps).toEqual([]);
    });

    test('A3 landmarks: header, nav[aria-label], main#conteudo, footer', async ({ page }) => {
      await page.goto(p.path);
      await expect(page.locator('body > header, body header').first()).toBeVisible();
      await expect(page.locator('nav[aria-label]').first()).toBeAttached();
      await expect(page.locator('main#conteudo')).toHaveCount(1);
      await expect(page.locator('footer').first()).toBeVisible();
    });

    test('A4 sem tabindex positivo', async ({ page }) => {
      await page.goto(p.path);
      const positive = await page.locator('[tabindex]').evaluateAll((els) => els.filter((el) => Number(el.getAttribute('tabindex')) > 0).map((el) => el.outerHTML.slice(0, 80)));
      expect(positive).toEqual([]);
    });
  });
}

/** Foco visível: outline ou box-shadow não nulo no elemento focado. */
async function focusIsVisible(page: Page): Promise<{ ok: boolean; desc: string }> {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el || el === document.body) return { ok: false, desc: 'body' };
    const s = getComputedStyle(el);
    const outline = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0;
    const shadow = s.boxShadow !== 'none';
    const r = el.getBoundingClientRect();
    const desc = `${el.tagName.toLowerCase()} "${(el.textContent ?? '').trim().slice(0, 40)}"`;
    return { ok: (outline || shadow) && r.width > 0 && r.height > 0, desc };
  });
}

for (const p of PAGES) {
  for (const width of [360, 1280]) {
    test(`K1 Tab percorre tudo com foco visível: ${p.path} ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(p.path);
      const expected = await page.evaluate(() => {
        const sel = 'a[href], button:not([disabled]), summary, input, select, textarea, [tabindex="0"]';
        return [...document.querySelectorAll<HTMLElement>(sel)].filter((el) => {
          const s = getComputedStyle(el);
          return s.visibility !== 'hidden' && s.display !== 'none' && !el.closest('[hidden], [inert]') && el.getClientRects().length > 0 && !el.closest('details:not([open]) > :not(summary)');
        }).length;
      });
      const seen: string[] = [];
      const invisible: string[] = [];
      for (let i = 0; i < expected + 5; i++) {
        await page.keyboard.press('Tab');
        const repeated = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          if (!el || el === document.body || el.dataset.qaSeen) return true;
          el.dataset.qaSeen = '1';
          return false;
        });
        if (repeated) break;
        const { ok, desc } = await focusIsVisible(page);
        seen.push(desc);
        if (!ok) invisible.push(desc);
      }
      expect(invisible, 'elementos sem anel de foco').toEqual([]);
      // Skip link visualmente oculto conta como alcançável mas pode não ter getClientRects antes do foco.
      expect(seen.length).toBeGreaterThanOrEqual(expected - 1);
    });
  }

  test(`K2 skip link é o 1º foco, aparece e leva a #conteudo: ${p.path}`, async ({ page }) => {
    await page.goto(p.path);
    await page.keyboard.press('Tab');
    const skip = page.locator(':focus');
    await expect(skip).toHaveAttribute('href', '#conteudo');
    await expect(skip).toHaveText(p.lang === 'en' ? 'Skip to content' : 'Pular para o conteúdo');
    const box = await skip.boundingBox();
    expect(box && box.width > 1 && box.height > 1 && box.y >= 0, 'skip link visível ao focar').toBe(true);
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#conteudo$/);
  });
}

for (const { path } of HOMES) {
  test(`K3 <details> abre com Enter e fecha com Espaço: ${path}`, async ({ page }) => {
    await page.goto(path);
    const summaries = page.locator('#faq summary, #precos summary');
    expect(await summaries.count()).toBeGreaterThan(0);
    const first = page.locator('#faq summary').first();
    await first.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#faq details').first()).toHaveAttribute('open', '');
    await page.keyboard.press('Space');
    await expect(page.locator('#faq details').first()).not.toHaveAttribute('open', '');
  });

  test(`K4 alvos de toque ≥ 44×44 (header, CTAs, summary, toggle): ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(path);
    const small = await page.evaluate(() => {
      const sel = 'header a, header button, summary, [data-theme-toggle], [data-lang-switch], main a[class*="btn"], main a[class*="button"], main a[class*="cta"]';
      return [...document.querySelectorAll<HTMLElement>(sel)]
        .filter((el) => el.getClientRects().length > 0 && !el.matches('.visually-hidden, [class*="skip"]'))
        .map((el) => ({ el: `${el.tagName.toLowerCase()} "${(el.textContent ?? '').trim().slice(0, 30)}"`, r: el.getBoundingClientRect() }))
        .filter(({ r }) => r.width < 43.5 || r.height < 43.5)
        .map(({ el, r }) => `${el} ${Math.round(r.width)}×${Math.round(r.height)}`);
    });
    expect(small).toEqual([]);
  });

  test(`K5 CTA de agenda no header, hero, pós-escada e final: ${path}`, async ({ page }) => {
    await page.goto(path);
    const booking = process.env.QA_BOOKING_URL;
    const sel = booking ? `a[href="${booking}"]` : 'a[href$="#agendar"], a[href$="#contato"]';
    for (const where of ['header', '#inicio', '#precos', '#contato']) {
      expect(await page.locator(`${where} ${sel}`).count(), `CTA de agenda em ${where}`).toBeGreaterThan(0);
    }
    if (booking) {
      // Com agenda real configurada, nenhum CTA pode cair no fallback de âncora.
      await expect(page.locator('a[href$="#agendar"]')).toHaveCount(0);
      const offenders = await page.locator('a').evaluateAll((els, url) =>
        els.filter((a) => /agend|book|call|diagn/i.test(a.textContent ?? '') && !/#(precos|faq)$/.test(a.getAttribute('href') ?? '') && a.getAttribute('href') !== url && !(a.getAttribute('href') ?? '').startsWith('mailto:')).map((a) => `${(a.textContent ?? '').trim().slice(0, 40)} -> ${a.getAttribute('href')}`), booking);
      expect(offenders, 'CTA de agenda fora do Calendly').toEqual([]);
    }
  });
}

test.describe('T tema claro/escuro', () => {
  test('T1 segue prefers-color-scheme sem JS e o toggle fica oculto', async ({ browser }) => {
    for (const scheme of ['light', 'dark'] as const) {
      const ctx = await browser.newContext({ javaScriptEnabled: false, colorScheme: scheme });
      const page = await ctx.newPage();
      await page.goto('/');
      const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      const [r = 0, g = 0, b = 0] = bg.match(/\d+/g)!.map(Number);
      const luminance = (r + g + b) / 3;
      expect(scheme === 'dark' ? luminance < 100 : luminance > 155, `${scheme}: body bg ${bg}`).toBe(true);
      await expect(page.locator('[data-theme-toggle]').first()).toBeHidden();
      await ctx.close();
    }
  });

  test('T2 toggle alterna, persiste no reload e não pisca', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    const toggle = page.locator('header [data-theme-toggle]');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-label', /.+/);
    const before = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const after = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(after).not.toBe(before);
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
    // O script inline aplica data-theme antes do primeiro paint: no DOMContentLoaded já deve estar lá.
    await page.reload({ waitUntil: 'commit' });
    await page.waitForFunction(() => document.body !== null);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.goto('/en/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('T3 prefers-reduced-motion: sem scroll suave nem transição longa', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).not.toBe('smooth');
    const slow = await page.evaluate(() =>
      [...document.querySelectorAll('*')]
        .map((el) => getComputedStyle(el))
        .filter((s) => s.animationName !== 'none' || parseFloat(s.transitionDuration) > 0.01).length,
    );
    expect(slow).toBe(0);
  });
});
