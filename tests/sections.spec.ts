import { expect, test } from '@playwright/test';

import { formatMoney, pricing } from '../src/config/pricing';
import { SECTION_IDS } from '../src/content/types';
import { en } from '../src/content/en';
import { ptBR } from '../src/content/pt-BR';

// Testes de componente das seções da landing (DESIGN §6–§7), contra o HTML real do build.

const homes = [
  { path: '/', copy: ptBR },
  { path: '/en/', copy: en },
] as const;

for (const { path, copy } of homes) {
  const locale = copy.locale;
  const ladder = pricing[locale];

  test.describe(`landing ${path}`, () => {
    test('seções na ordem do PLANO-DEV §2.2, cada uma rotulada pelo seu H2', async ({ page }) => {
      await page.goto(path);
      const ids = await page.locator('main > section[id]').evaluateAll((els) => els.map((el) => el.id));
      expect(ids).toEqual([...SECTION_IDS]);
      for (const id of SECTION_IDS) {
        const section = page.locator(`section#${id}`);
        const labelledBy = await section.getAttribute('aria-labelledby');
        expect(labelledBy, id).toBeTruthy();
        await expect(page.locator(`#${labelledBy}`)).toBeVisible();
      }
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText(copy.hero.headline);
    });

    test('depoimentos ocultos: nenhuma seção nem espaço reservado', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('#depoimentos')).toHaveCount(0);
      await expect(page.getByText(copy.testimonials.title, { exact: true })).toHaveCount(0);
    });

    test('hero: CTAs, microprova e painel de fatos com preços de pricing.ts', async ({ page }) => {
      await page.goto(path);
      const hero = page.locator('#inicio');
      await expect(hero.getByRole('link', { name: copy.hero.primaryCta })).toBeVisible();
      await expect(hero.getByRole('link', { name: copy.hero.secondaryCta })).toHaveAttribute('href', '#precos');
      await expect(hero.locator('.hero__proof li')).toHaveText(copy.hero.proofLine);
      const sprint = ladder.steps.find((s) => s.id === 'sprint');
      if (sprint?.price.kind !== 'fixed') throw new Error('sprint sem preço fixo');
      await expect(hero.locator('[data-step="sprint"] dd')).toHaveText(formatMoney(sprint.price.amount, locale));
    });

    test('escada: 6 degraus na ordem de pricing.ts, preços formatados, alternativos marcados', async ({ page }) => {
      await page.goto(path);
      const rungs = page.locator('ol.ladder > li');
      await expect(rungs).toHaveCount(ladder.steps.length);
      const ids = await rungs.evaluateAll((els) => els.map((el) => el.getAttribute('data-step')));
      expect(ids).toEqual(ladder.steps.map((s) => s.id));

      for (const step of ladder.steps) {
        const rung = page.locator(`ol.ladder > li[data-step="${step.id}"]`);
        const stepCopy = copy.ladder.steps[step.id];
        await expect(rung.locator('h3')).toContainText(stepCopy.name);
        await expect(rung.locator('.rung__time')).toHaveText(stepCopy.timeline);
        const value = rung.locator('.price__value');
        switch (step.price.kind) {
          case 'free':
            await expect(value).toHaveText(copy.ladder.priceLabels.free);
            break;
          case 'custom':
            await expect(value).toHaveText(copy.ladder.priceLabels.custom);
            break;
          default:
            await expect(value).toHaveText(formatMoney(step.price.amount, locale));
        }
        // Itens do "O que inclui" ficam dentro do <details>, fechado por padrão.
        const details = rung.locator('details');
        await expect(details).not.toHaveAttribute('open');
        await expect(details.locator('li')).toHaveCount(stepCopy.included.length);
      }

      // Production-Ready e MVP Plus: "ou" visível no marcador e oculto antes do nome.
      for (const id of ['productionReady', 'mvpPlus']) {
        const rung = page.locator(`li[data-step="${id}"]`);
        await expect(rung).toHaveClass(/rung--alt/);
        await expect(rung.locator('h3 .visually-hidden')).toHaveText(`${copy.ladder.labels.altStep} `);
      }
      // Numerais 1–4 só nos principais.
      await expect(page.locator('.rung--main .rung__marker')).toHaveText(['1', '2', '3', '4']);
    });

    test('escada: badge só no Sprint, "a partir de" antes do valor no DOM', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('.rung__badge')).toHaveCount(1);
      await expect(page.locator('li[data-step="sprint"] .rung__badge')).toHaveText(copy.ladder.steps.sprint.badge ?? '');
      const evolution = page.locator('li[data-step="evolution"] .price');
      const prefix = copy.ladder.priceLabels.from.split('{price}')[0]?.trim() ?? '';
      await expect(evolution).toHaveText(new RegExp(`^\\s*${prefix}\\s+.+${copy.ladder.units.perMonth}`));
    });

    test('tabela do Evolution: caption, cabeçalhos com scope e 3 planos de pricing.ts', async ({ page }) => {
      await page.goto(path);
      const table = page.locator('.evolution__table');
      await expect(table.locator('caption')).toHaveText(copy.ladder.evolution.table.caption);
      await expect(table.locator('th[scope="col"]')).toHaveCount(3);
      await expect(table.locator('tbody th[scope="row"]')).toHaveCount(ladder.evolution.plans.length);
      for (const plan of ladder.evolution.plans) {
        await expect(table.locator(`tr[data-plan="${plan.id}"] .evolution__price`)).toHaveText(
          formatMoney(plan.monthly, locale),
        );
      }
      await expect(page.locator('.evolution__rules')).toContainText(formatMoney(ladder.evolution.overagePerHour, locale));
    });

    test('todos os CTAs de agenda usam o mesmo destino, na mesma aba', async ({ page }) => {
      await page.goto(path);
      const hrefs = await page.locator('[data-booking-cta]').evaluateAll((els) =>
        els.map((el) => [el.getAttribute('href'), el.getAttribute('target')]),
      );
      // Header, hero, diagnóstico, pós-escada e final.
      expect(hrefs.length).toBe(5);
      expect(new Set(hrefs.map(([href]) => href)).size).toBe(1);
      expect(hrefs.every(([, target]) => target === null)).toBe(true);
    });

    test('garantias, método, não é para e FAQ batem com o copy', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('#garantias .icon-item')).toHaveCount(copy.guarantees.items.length);
      await expect(page.locator('#garantias .dash-list li')).toHaveCount(copy.guarantees.exclusions.length);
      await expect(page.locator('#problema .opportunity')).toHaveCount(copy.problem.items.length);
      await expect(page.locator('#metodo .icon-item')).toHaveCount(copy.method.items.length);
      await expect(page.locator('#nao-e-para li')).toHaveCount(copy.notFor.items.length);
      const faq = page.locator('#faq details');
      await expect(faq).toHaveCount(copy.faq.items.length);
      await expect(page.locator('#faq details[open]')).toHaveCount(0);
      await faq.first().locator('summary').click();
      await expect(faq.first().locator('.faq__a')).toBeVisible();
    });

    test('quem constrói: foto acessível, case público primeiro, relatos sem destaque', async ({ page }) => {
      await page.goto(path);
      // Foto real (DESIGN §6.12): AVIF/WebP, dimensões explícitas, lazy, até 480 px para desktop 3x.
      const photo = page.locator('#quem picture img');
      await expect(photo).toHaveAttribute('alt', copy.about.photoAlt);
      await expect(photo).toHaveAttribute('loading', 'lazy');
      await expect(photo).toHaveAttribute('width', '160');
      await expect(photo).toHaveAttribute('height', '160');
      const types = await page.locator('#quem picture source').evaluateAll((els) => els.map((el) => el.getAttribute('type')));
      expect(types).toEqual(['image/avif', 'image/webp']);
      const widths = await page.locator('#quem picture source').evaluateAll((els) =>
        els.flatMap((el) => [...(el.getAttribute('srcset') ?? '').matchAll(/(\d+)w/g)].map((m) => Number(m[1]))),
      );
      expect(Math.max(...widths)).toBe(480);
      await page.locator('#quem').scrollIntoViewIfNeeded();
      await expect(photo).toHaveJSProperty('complete', true);
      expect(await photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      // Quadrada e sem encolher ao lado do H2: 96 px no mobile, 160 px no desktop.
      for (const [width, size] of [
        [360, 96],
        [1280, 160],
      ] as const) {
        await page.setViewportSize({ width, height: 800 });
        const box = await photo.boundingBox();
        expect(Math.round(box?.width ?? 0), `largura em ${width}`).toBe(size);
        expect(Math.round(box?.height ?? 0), `altura em ${width}`).toBe(size);
      }
      const kinds = await page.locator('#quem .case').evaluateAll((els) => els.map((el) => el.getAttribute('data-kind')));
      expect(kinds[0]).toBe('published');
      await expect(page.locator('#quem .case[data-kind="published"] strong')).toHaveCount(2);
      await expect(page.locator('#quem .case:not([data-kind="published"]) strong')).toHaveCount(0);
      await expect(page.locator('#quem .case[data-kind="published"] .case__source a')).toHaveAttribute('href', /^https:\/\//);
    });

    for (const width of [360, 1280]) {
      test(`sem scroll horizontal em ${width} px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path);
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scrollWidth).toBeLessThanOrEqual(width);
      });
    }
  });
}

test.describe('header', () => {
  test('360 px: CTA curto, sem nav e sem toggle; marca em até 2 linhas', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/');
    const header = page.locator('header.site-header');
    await expect(header.locator('nav')).toBeHidden();
    await expect(header.locator('[data-theme-toggle]')).toBeHidden();
    await expect(header.getByRole('link', { name: ptBR.common.bookingCtaHeaderMobile, exact: true })).toBeVisible();
    await expect(header.locator('.site-header__cta-long')).toBeHidden();
    const lines = await header.locator('[data-brand] .wordmark__text').evaluate((el) => {
      const style = getComputedStyle(el);
      return Math.round(el.getBoundingClientRect().height / parseFloat(style.lineHeight));
    });
    expect(lines).toBeLessThanOrEqual(2);
    // CTA principal do hero acima da dobra (DESIGN §7.1).
    const box = await page.locator('#inicio [data-booking-cta]').boundingBox();
    expect((box?.y ?? 0) + (box?.height ?? 0)).toBeLessThanOrEqual(640);
  });

  test('1280 px: nav com 4 âncoras, toggle e CTA longo', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/en/');
    const header = page.locator('header.site-header');
    await expect(header.locator('nav a')).toHaveText(Object.values(en.header.nav));
    await expect(header.locator('[data-theme-toggle]')).toBeVisible();
    await expect(header.getByRole('link', { name: en.common.bookingCtaHeader, exact: true })).toBeVisible();
    await expect(header.locator('.site-header__cta-short')).toBeHidden();
  });
});

test.describe('tema', () => {
  test('toggle alterna data-theme, grava localStorage e sobrevive ao reload', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    const toggle = page.locator('footer [data-theme-toggle]');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-label', ptBR.common.themeToggleLabel);
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

    test('toggle não aparece; conteúdo e <details> continuam acessíveis', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('[data-theme-toggle]').first()).toBeHidden();
      await expect(page.locator('h1')).toBeVisible();
      await page.locator('#faq details summary').first().click();
      await expect(page.locator('#faq details').first()).toHaveAttribute('open', '');
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

test.describe('landing /diagnostico/ (DESIGN §14)', () => {
  const diag = ptBR.diagnostico;

  test('seções na ordem, uma H1, CTA só no header, no hero e no final', async ({ page }) => {
    if (!diag) throw new Error('pt-BR sem diagnostico');
    await page.goto('/diagnostico/');
    const ids = await page.locator('main > section[id]').evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual(['inicio', 'precos', 'sprint', 'provas', 'quem', 'faq', 'contato']);
    await expect(page.locator('h1')).toHaveText(diag.hero.title);
    const ctas = page.locator('[data-booking-cta]');
    await expect(ctas).toHaveCount(3);
    expect(await ctas.evaluateAll((els) => els.map((el) => el.closest('header, section')?.id || el.closest('header')?.tagName))).toEqual([
      'HEADER',
      'inicio',
      'contato',
    ]);
    // Escada reusada sem CTA próprio, e o hero sem "Ver preços".
    await expect(page.locator('#precos [data-booking-cta], #precos .ladder__cta')).toHaveCount(0);
    await expect(page.locator('#inicio a[href="#precos"]')).toHaveCount(0);
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

  test('provas: Bom.Capital sem link e sem destaque; Ascende com link de 44 px', async ({ page }) => {
    await page.goto('/diagnostico/');
    const cases = page.locator('#provas .case');
    await expect(cases).toHaveCount(2);
    await expect(page.locator('#provas .case[data-kind="self-reported"] a, #provas .case strong')).toHaveCount(0);
    const ascende = page.locator('#provas .case[data-kind="own-project"] a');
    await expect(ascende).toHaveAttribute('href', 'https://ascende.site');
    expect(Math.round((await ascende.boundingBox())?.height ?? 0)).toBeGreaterThanOrEqual(44);
    await expect(page.locator('#quem a, #quem img')).toHaveCount(0);
  });

  test('preços iguais aos da home', async ({ page }) => {
    await page.goto('/');
    const home = await page.locator('#precos .price').allInnerTexts();
    await page.goto('/diagnostico/');
    expect(await page.locator('#precos .price').allInnerTexts()).toEqual(home);
  });

  test('360 px: CTA do hero na 1ª dobra e painel de fatos oculto', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/diagnostico/');
    const box = await page.locator('#inicio [data-booking-cta]').boundingBox();
    expect((box?.y ?? 0) + (box?.height ?? 0)).toBeLessThanOrEqual(524);
    await expect(page.locator('#inicio .hero__facts')).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  });
});

test('situações levam às ofertas certas e experiência precede preços', async ({ page }) => {
  for (const path of ['/', '/en/']) {
    await page.goto(path);
    const cards = page.locator('#problema .opportunity');
    await expect(cards).toHaveCount(4);
    const links = await cards.locator('a').evaluateAll(els => els.map(el => el.getAttribute('href')));
    expect(links).toEqual(path === '/' ? ['#precos', '/recuperacao-de-projeto/', '/lovable-em-producao/', '#precos'] : ['#precos', '/en/software-project-rescue/', '/en/lovable-to-production/', '#precos']);
    for (const href of links.filter(href => href?.startsWith('/'))) {
      expect((await page.request.get(href!)).status()).toBe(200);
    }
    expect(await page.locator('#quem').evaluate(el => Boolean(el.compareDocumentPosition(document.querySelector('#precos')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
    await expect(page.locator('#quem .about__footnote')).toContainText(path === '/' ? 'não são cases de clientes do studio' : 'not studio client engagements');
  }
});
