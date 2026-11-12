import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { en } from '../src/content/en';
import { ptBR } from '../src/content/pt-BR';
import { chrome } from '../src/content/chrome';
import { home } from '../src/content/home';
import { etapas, estrutura, howWeWork } from '../src/content/institucional';
import { routes } from '../src/config/routes.mjs';

// Testes de componente da home e das páginas institucionais (DESIGN-2026-11 §8; estratégia 2026-11 §6),
// contra o HTML real do build.

const homes = [
  { path: '/', locale: 'pt-BR' as const },
  { path: '/en/', locale: 'en' as const },
];

for (const { path, locale } of homes) {
  const c = home[locale];
  const ids = c.ids;

  test.describe(`home ${path}`, () => {
    test('seções na ordem, cada uma rotulada pelo seu H2; um H1 com a manchete', async ({ page }) => {
      await page.goto(path);
      const order = await page.locator('main > section[id]').evaluateAll((els) => els.map((el) => el.id));
      expect(order).toEqual([ids.hero, ids.brain, ids.solutions, ids.custom, ids.process, ids.structure, ids.proof, ids.fit, ids.faq, 'agendar']);
      for (const id of order) {
        const labelledBy = await page.locator(`section#${id}`).getAttribute('aria-labelledby');
        expect(labelledBy, id).toBeTruthy();
        await expect(page.locator(`[id="${labelledBy}"]`)).toBeVisible();
      }
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText(c.hero.title);
    });

    test('âncora de soluções do header existe e lista as 8 áreas, rotuladas como exemplos', async ({ page }) => {
      await page.goto(path);
      const hash = chrome[locale].header.nav.find((item) => item.hash)?.hash;
      expect(hash).toBe(ids.solutions);
      const section = page.locator(`section#${ids.solutions}`);
      await expect(section.locator('.ds-fg > li')).toHaveCount(8);
      await expect(section).toContainText(c.solutions.exampleLabel);
      for (const area of c.solutions.areas) await expect(section).toContainText(area.eyebrow ?? '');
    });

    test('mocks com selo de ilustração; etapas e estrutura batem com o conteúdo', async ({ page }) => {
      await page.goto(path);
      const label = chrome[locale].common.illustration;
      const mocks = page.locator('main [role="img"]');
      await expect(mocks).toHaveCount(2);
      for (const name of await mocks.evaluateAll((els) => els.map((el) => el.getAttribute('aria-label') ?? ''))) expect(name).toContain(label);
      await expect(page.locator(`#${ids.process} ol > li`)).toHaveCount(etapas[locale].length);
      await expect(page.locator(`#${ids.structure} .ds-fg > li`)).toHaveCount(estrutura[locale].length);
      await expect(page.locator(`#${ids.process} a[href="${routes.howWeWork[locale] as string}"]`)).toHaveCount(1);
    });

    test('prova: cases com link válido e métrica da Loopt com fonte MundoLogística', async ({ page }) => {
      await page.goto(path);
      const proof = page.locator(`section#${ids.proof}`);
      const links = await proof.locator('.case-cards a').evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
      expect(links).toHaveLength(3);
      for (const href of links) expect((await page.request.get(href)).status(), href).toBe(200);
      await expect(proof).toContainText(/[−-]27\s?%/);
      await expect(proof).toContainText(/\+21\s?%/);
      await expect(proof).toContainText(locale === 'en' ? /according to Loopt/ : /segundo a Loopt/);
      await expect(proof.locator('a[href="https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres"]')).toHaveCount(2);
    });

    test('CTAs de agenda com o mesmo destino, na mesma aba; FAQ fechado e abre', async ({ page }) => {
      await page.goto(path);
      const hrefs = await page.locator('[data-booking-cta]').evaluateAll((els) => els.map((el) => [el.getAttribute('href'), el.getAttribute('target')]));
      // Header, hero e CTA final.
      expect(hrefs.length).toBeGreaterThanOrEqual(3);
      expect(new Set(hrefs.map(([href]) => href)).size).toBe(1);
      expect(hrefs.every(([, target]) => target === null)).toBe(true);
      const faq = page.locator(`#${ids.faq} details`);
      await expect(faq).toHaveCount(c.faq.items.length);
      await expect(page.locator(`#${ids.faq} details[open]`)).toHaveCount(0);
      await faq.first().locator('summary').click();
      await expect(faq.first()).toHaveAttribute('open', '');
    });

    test('sem preço, sem setor por nome, sem link para /para/', async ({ page }) => {
      await page.goto(path);
      const text = (await page.locator('main').textContent()) ?? '';
      expect(text).not.toMatch(/R\$|US\$|\$\s?\d/);
      expect(text).not.toMatch(/têxtil|confecção|alimentos e bebidas|plásticos e embalagens|metalmecânica|madeira e móveis|eletroeletrônicos|autopeças|textile|food and beverage/i);
      const hrefs = await page.locator('a[href]').evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
      expect(hrefs.filter((href) => href.includes('/para/'))).toEqual([]);
    });

    for (const width of [360, 1280]) {
      test(`sem scroll horizontal em ${width} px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      });
    }
  });
}

for (const locale of ['pt-BR', 'en'] as const) {
  const path = routes.howWeWork[locale] as string;
  const c = howWeWork[locale];

  test.describe(`como trabalhamos ${path}`, () => {
    test('H1, 5 etapas com entregável, estrutura de entrega e FAQ', async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText(c.hero.title);
      const stages = page.locator('ol.stages > li');
      await expect(stages).toHaveCount(5);
      for (const [index, stage] of c.stages.items.entries()) {
        await expect(stages.nth(index).locator('h3')).toHaveText(stage.title);
        await expect(stages.nth(index)).toContainText(stage.deliverable);
      }
      for (const item of c.delivery.items) await expect(page.locator('main')).toContainText(item.title);
      for (const block of [c.governance, c.security, c.continuity, c.client]) {
        await expect(page.getByRole('heading', { level: 2, name: block.title })).toBeVisible();
      }
      await expect(page.locator('main details')).toHaveCount(c.faq.items.length);
      expect(await page.locator('main [data-booking-cta]').count()).toBeGreaterThanOrEqual(2);
    });

    test('headings sequenciais, sem preço, sem scroll horizontal em 360 px', async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 800 });
      await page.goto(path);
      const levels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((els) => els.map((el) => Number(el.tagName[1])));
      expect(levels[0]).toBe(1);
      for (let i = 1; i < levels.length; i++) expect(levels[i]! - levels[i - 1]!, `heading ${i}`).toBeLessThanOrEqual(1);
      expect((await page.locator('main').textContent()) ?? '').not.toMatch(/R\$|US\$/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    });

    test('axe sem violação séria/crítica, claro e escuro', async ({ page }) => {
      for (const scheme of ['light', 'dark'] as const) {
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto(path);
        await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
        const { violations } = await new AxeBuilder({ page }).analyze();
        expect(violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${scheme}: ${v.id}`)).toEqual([]);
      }
    });

    test('seletor de idioma leva ao par', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(path);
      await page.locator('header [data-lang-switch]').click();
      await expect(page).toHaveURL(new RegExp(`${routes.howWeWork[locale === 'en' ? 'pt-BR' : 'en'] as string}$`));
    });
  });
}

// Header/tema/skip link do design system 2026-11 (docs/design/DESIGN-2026-11.md §7.1).
const hrefInDist = (href: string): boolean => {
  const [path = '/', hash] = href.split('#');
  const file = join('dist', path, 'index.html');
  if (!existsSync(file)) return false;
  return !hash || readFileSync(file, 'utf8').includes(`id="${hash}"`);
};
/** Itens da nav; todo destino precisa existir no build (página e, se houver, âncora). */
const expectedNav = (locale: 'pt-BR' | 'en') =>
  chrome[locale].header.nav.map((item) => {
    const path = routes[item.routeId][locale] ?? '/';
    const href = item.hash ? `${path}#${item.hash}` : path;
    expect(hrefInDist(href), `destino da nav existe no build: ${href}`).toBe(true);
    return item;
  });

test.describe('header', () => {
  test('360 px: marca + Menu + CTA curto; nav e toggle no painel do menu', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/');
    const header = page.locator('header.site-header');
    const t = chrome['pt-BR'].header;
    await expect(header.getByRole('link', { name: t.ctaShort, exact: true })).toBeVisible();
    await expect(header.locator('.site-header__cta-long')).toBeHidden();
    const menu = header.getByRole('button', { name: t.menuOpen, exact: true });
    await expect(menu).toBeVisible();
    await expect(header.locator('.site-header__links a').first()).toBeHidden();
    await expect(header.locator('[data-theme-toggle]')).toBeHidden();
    const lines = await header.locator('[data-brand] .wordmark__text').evaluate((el) => {
      const style = getComputedStyle(el);
      return Math.round(el.getBoundingClientRect().height / parseFloat(style.lineHeight));
    });
    expect(lines).toBeLessThanOrEqual(2);
    // Alvos ≥ 44 px.
    for (const target of [menu, header.locator('[data-brand]')]) {
      expect((await target.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
    // Abre o painel (popover nativo, sem JS próprio), mostra links e toggle; Esc fecha.
    await menu.click();
    await expect(header.locator('.site-header__links a').first()).toBeVisible();
    await expect(header.locator('[data-theme-toggle]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(header.locator('.site-header__links a').first()).toBeHidden();
  });

  test('1280 px: nav com os links do chrome, toggle e CTA longo; sem /para/', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/en/');
    const header = page.locator('header.site-header');
    const t = chrome.en.header;
    const expected = expectedNav('en');
    // Contrato: 5 links (Solutions, How we work, Cases, Blog, About).
    expect(t.nav).toHaveLength(5);
    await expect(header.locator('.site-header__links a')).toHaveText(expected.map((item) => item.label));
    await expect(header.getByRole('navigation', { name: t.navLabel })).toBeVisible();
    await expect(header.getByRole('button', { name: t.menuOpen, exact: true })).toBeHidden();
    await expect(header.locator('[data-theme-toggle]')).toBeVisible();
    await expect(header.locator('[data-lang-switch]')).toBeVisible();
    await expect(header.getByRole('link', { name: t.cta, exact: true })).toBeVisible();
    await expect(header.locator('.site-header__cta-short')).toBeHidden();
    const box = await header.boundingBox();
    expect(box?.height ?? 0).toBeLessThanOrEqual(56);
    const hrefs = await page.locator('header a[href], footer a[href]').evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
    expect(hrefs.filter((href) => href.includes('/para/'))).toEqual([]);
  });
});

test.describe('tema', () => {
  test('toggle alterna data-theme, grava localStorage e sobrevive ao reload', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    const toggle = page.locator('footer [data-theme-toggle]');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-label', chrome['pt-BR'].common.themeToggleLabel);
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    // Os dois toggles (header e footer) refletem o mesmo estado.
    await expect(page.locator('[data-theme-toggle][aria-pressed="true"]')).toHaveCount(2);
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('footer [data-theme-toggle]')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('footer [data-theme-toggle]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test.describe('sem JS', () => {
    test.use({ javaScriptEnabled: false });

    test('toggle não aparece; <details> e menu móvel continuam funcionando', async ({ page }) => {
      await page.goto('/design-system/');
      await expect(page.locator('[data-theme-toggle]').first()).toBeHidden();
      await expect(page.locator('h1')).toBeVisible();
      await page.locator('.ds-faq details summary').first().click();
      await expect(page.locator('.ds-faq details').first()).toHaveAttribute('open', '');
      await page.setViewportSize({ width: 360, height: 640 });
      await page.getByRole('button', { name: chrome['pt-BR'].header.menuOpen, exact: true }).click();
      await expect(page.locator('.site-header__links a').first()).toBeVisible();
    });
  });
});

test('skip link aparece ao focar e leva ao conteúdo', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.locator('a.skip-link');
  await expect(skip).toBeFocused();
  await expect(skip).toHaveText(ptBR.common.skipToContent);
  const box = await skip.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(10);
  expect(box?.y ?? -1).toBeGreaterThanOrEqual(0);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#conteudo$/);
});

test('privacidade: seções do copy e link de volta', async ({ page }) => {
  for (const { path, copy } of [
    { path: '/privacidade/', copy: ptBR },
    { path: '/en/privacy/', copy: en },
  ]) {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveText(copy.privacy.title);
    for (const section of copy.privacy.sections) {
      await expect(page.getByRole('heading', { level: 2, name: section.title })).toBeVisible();
    }
    await expect(page.getByRole('link', { name: copy.privacy.backLink })).toHaveAttribute('href', copy.locale === 'en' ? '/en/' : '/');
  }
});

test('404: blocos PT e EN, cada um com lang e link', async ({ page }) => {
  await page.goto('/nao-existe/');
  await expect(page.locator('section[lang="pt-BR"] h1')).toHaveText(ptBR.notFound.title);
  await expect(page.locator('section[lang="en"] h2')).toHaveText(en.notFound.title);
  await expect(page.locator('section[lang="en"] a')).toHaveAttribute('href', '/en/');
});

test.describe('consentimento sem PUBLIC_GADS_ID', () => {
  // Deploy 1 (SPEC §8): sem a tag do Google Ads não há categoria opcional, então não há banner nem JS de consentimento.
  // O build de QA tem a tag (estado de produção) e o fluxo é coberto por tests/qa/consent.spec.ts. Este bloco só
  // vale num build SEM a env: rode com QA_NO_GADS=1.
  test.skip(process.env.QA_NO_GADS !== '1', 'só num build sem PUBLIC_GADS_ID (QA_NO_GADS=1)');
  for (const path of ['/', '/en/', '/privacidade/', '/nao-existe/']) {
    test(`${path}: nenhuma faixa, diálogo nem botão de preferências`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('[data-consent-banner]')).toHaveCount(0);
      await expect(page.locator('dialog[data-consent-dialog]')).toHaveCount(0);
      await expect(page.locator('[data-consent-open]')).toHaveCount(0);
      expect(await page.evaluate(() => 'tsConsent' in window)).toBe(false);
    });
  }

  test('404 tem footer e main focável por script', async ({ page }) => {
    await page.goto('/nao-existe/');
    await expect(page.locator('footer [data-brand]')).toBeVisible();
    await expect(page.locator('main#conteudo')).toHaveAttribute('tabindex', '-1');
  });
});

test.describe('landing /diagnostico/', () => {
  const diag = ptBR.diagnostico;

  test('seções na ordem, uma H1, CTA só no header, no hero e no final', async ({ page }) => {
    if (!diag) throw new Error('pt-BR sem diagnostico');
    await page.goto('/diagnostico/');
    const ids = await page.locator('main > section[id]').evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual(['inicio', 'entregas', 'etapas', 'provas', 'faq', 'contato']);
    await expect(page.locator('h1')).toHaveText(diag.hero.title);
    const ctas = page.locator('[data-booking-cta]');
    await expect(ctas).toHaveCount(3);
    expect(await ctas.evaluateAll((els) => els.map((el) => el.closest('main section[id]')?.id ?? el.closest('header')?.tagName))).toEqual([
      'HEADER',
      'inicio',
      'contato',
    ]);
    await expect(page.locator('#entregas .ds-fg > li')).toHaveCount(diag.deliverables.items.length);
    await expect(page.locator('#etapas ol > li')).toHaveCount(diag.steps.items.length);
    await expect(page.locator('#faq details')).toHaveCount(diag.faq.items.length);
  });

  test('sem saídas: marca como texto, sem nav, idioma, LinkedIn ou GitHub', async ({ page }) => {
    await page.goto('/diagnostico/');
    await expect(page.locator('header [data-brand]')).toHaveJSProperty('tagName', 'SPAN');
    await expect(page.locator('footer [data-brand]')).toHaveJSProperty('tagName', 'SPAN');
    await expect(page.locator('header nav, [data-lang-switch]')).toHaveCount(0);
    const hrefs = await page.locator('a[href]').evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
    expect(hrefs.filter((href) => /linkedin\.com|github\.com/.test(href))).toEqual([]);
    expect(hrefs.filter((href) => href === '/' || href === '/en/')).toEqual([]);
  });

  test('provas: métrica da Loopt com fonte; Bom.Capital como relato, sem link', async ({ page }) => {
    await page.goto('/diagnostico/');
    const provas = page.locator('#provas');
    await expect(provas.locator('a[href^="https://mundologistica.com.br/"]')).toHaveCount(2);
    await expect(provas).toContainText('segundo a Loopt');
    const bom = provas.locator('[data-proof="Bom.Capital"]');
    await expect(bom).toContainText(/relato/i);
    await expect(bom.locator('a, strong')).toHaveCount(0);
    expect((await page.locator('main').textContent()) ?? '').not.toMatch(/R\$|US\$/);
  });

  test('360 px: CTA do hero na 1ª dobra, sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/diagnostico/');
    const box = await page.locator('#inicio [data-booking-cta]').boundingBox();
    expect((box?.y ?? 0) + (box?.height ?? 0)).toBeLessThanOrEqual(524);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  });
});
