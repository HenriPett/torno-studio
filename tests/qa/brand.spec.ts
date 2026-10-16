import { expect, test } from './fixtures';

import { NOT_FOUND, PAGES, overflowingElements } from './helpers';

/**
 * Matriz de marca (PLANO-DEV §5.4 e §5.6: marca escolhida = Torno Studio; DESIGN §6.1; CHECKLIST.md §M).
 * Só roda com QA_BRAND = valor usado no build (PUBLIC_SITE_BRAND). Ver tests/qa/run-qa.sh.
 */

const brand = process.env.QA_BRAND;
test.skip(!brand, 'QA_BRAND não definido: rode via tests/qa/run-qa.sh');

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

for (const p of [...PAGES, NOT_FOUND]) {
  test(`M1 marca vem de SITE_BRAND em title, og:site_name, header e footer: ${p.path}`, async ({ page }) => {
    await page.goto(p.path);
    await expect(page).toHaveTitle(new RegExp(`${escape(brand!)}$`));
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', brand!);
    await expect(page.locator('header [data-brand]')).toHaveText(brand!);
    // A 404 não tem footer; onde houver footer, a marca nele vem de SITE_BRAND.
    if ((await page.locator('footer').count()) > 0) await expect(page.locator('footer [data-brand]').first()).toHaveText(brand!);
  });

  test(`M2 nenhuma marca escrita à mão nem placeholder residual: ${p.path}`, async ({ page }) => {
    await page.goto(p.path);
    const text = (await page.content()).replace(/<script[\s\S]*?<\/script>/g, '');
    for (const stale of ['[Marca]', 'Henrique Pett — Founding Engineer', 'Henrique Pett - Founding Engineer', 'Henrique Pett — Product Engineering']) {
      if (stale !== brand) expect(text, `"${stale}" escrito à mão`).not.toContain(stale);
    }
    // Convenção do copy: marca só em header, footer, <title> e OG. Nunca no corpo (soaria como "nós").
    const inMain = await page.locator('main').innerText();
    expect(inMain).not.toMatch(new RegExp(`(?<![\\p{L}])${escape(brand!)}(?![\\p{L}])`, 'u'));
  });

  for (const width of [360, 768, 1280, 1920]) {
    test(`M3 wordmark cabe sem cortar, sobrepor nem gerar scroll: ${p.path} ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(p.path);
      const m = await page.evaluate(() => {
        const mark = document.querySelector<HTMLElement>('header [data-brand]')!;
        const r = mark.getBoundingClientRect();
        // Linhas reais do texto (o link tem padding para o alvo de 44 px, então altura/line-height mente).
        // Só nós de texto: a caixa de um <span> interno contaria como linha extra.
        const tops: number[] = [];
        const walker = document.createTreeWalker(mark, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const range = document.createRange();
          range.selectNodeContents(node);
          for (const q of range.getClientRects()) {
            if (q.width > 0 && !tops.some((t) => Math.abs(t - q.top) < q.height / 2)) tops.push(q.top);
          }
        }
        const others = [...document.querySelectorAll<HTMLElement>('header a, header button')]
          .filter((el) => el !== mark && !el.contains(mark) && el.getClientRects().length > 0 && !el.matches('.visually-hidden'))
          .map((el) => ({ t: (el.textContent ?? '').trim().slice(0, 20), r: el.getBoundingClientRect() }));
        const overlaps = others
          .filter(({ r: o }) => o.width > 1 && o.left < r.right - 1 && o.right > r.left + 1 && o.top < r.bottom - 1 && o.bottom > r.top + 1)
          .map(({ t }) => t);
        const offscreen = others.filter(({ r: o }) => o.right > document.documentElement.clientWidth + 1).map(({ t }) => t);
        return {
          lines: tops.length,
          clipped: mark.scrollHeight > mark.clientHeight + 1 || mark.scrollWidth > mark.clientWidth + 1,
          overlaps,
          offscreen,
          scroll: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });
      expect(m.clipped, 'wordmark truncado (line-clamp disparou)').toBe(false);
      expect(m.lines, 'linhas do wordmark').toBeLessThanOrEqual(width >= 1200 ? 1 : 2);
      expect(m.overlaps, 'controles do header sobrepostos à marca').toEqual([]);
      expect(m.offscreen, 'controles do header fora da tela').toEqual([]);
      expect(m.scroll, `scroll horizontal; culpados: ${(await overflowingElements(page)).join(', ')}`).toBeLessThanOrEqual(0);
    });
  }
}

test('M4 <title> ≤ 60 caracteres (aviso, não bloqueia)', async ({ page }) => {
  for (const p of PAGES) {
    await page.goto(p.path);
    const title = await page.title();
    if (title.length > 60) test.info().annotations.push({ type: 'warning', description: `${p.path}: title com ${title.length} > 60: "${title}"` });
  }
});
