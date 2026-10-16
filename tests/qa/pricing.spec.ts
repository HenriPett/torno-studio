import { expect, test, type Page } from './fixtures';

import { HOMES, PAGES, norm, type Lang } from './helpers';

/**
 * Preços renderizados x PLANO-DEV §5.3 (CHECKLIST.md §P).
 * Oráculo independente: os valores estão escritos aqui à mão, de propósito, e NÃO importam
 * src/config/pricing.ts (o tests/copy-pricing.spec.ts do Compasso já confere copy x pricing.ts).
 */

interface StepExpect {
  /** Nome do degrau como aparece no H3 (pode vir precedido do "ou"/"or" oculto). */
  name: RegExp;
  /** Strings que precisam aparecer no degrau, já normalizadas. */
  must: string[];
  /** Strings que não podem aparecer no degrau. */
  mustNot?: RegExp[];
}

const LADDER: Record<Lang, StepExpect[]> = {
  'pt-BR': [
    { name: /Diagnóstico/, must: ['Grátis', '45 min'] },
    { name: /Product Sprint/, must: ['R$ 6.000', '2 semanas', '100% antecipado', '30 dias'] },
    { name: /Production-Ready/, must: ['R$ 18.000', '2–3 semanas', '50%'] },
    { name: /MVP Core/, must: ['R$ 42.000', '6–7 semanas', '40%', '30%', '60 dias'] },
    { name: /MVP Plus/, must: ['R$ 65.000', '8–10 semanas', '40%', '30%', '60 dias'] },
    { name: /Product Evolution/, must: ['a partir de R$ 4.000', '/mês'] },
  ],
  en: [
    { name: /Scoping call/, must: ['Free', '45 min'] },
    { name: /Product Sprint/, must: ['US$ 3,000', '2 weeks', '100% upfront', '30 days'] },
    { name: /Production-Ready/, must: ['US$ 7,000', '2–3 weeks', '50%'] },
    { name: /MVP Core/, must: ['from US$ 15,000', '6–7 weeks', '40%', '30%', '60-day'], mustNot: [/12,000/, /18,000/] },
    // P2: sem ancorar US$ 30k em público.
    { name: /MVP Plus/, must: ['Custom quote', '8–10 weeks', '40%', '30%', '60-day'], mustNot: [/US\$\s?\d/, /30,000/, /20,000/] },
    { name: /Product Evolution/, must: ['from US$ 1,500', '/mo'] },
  ],
};

const EVOLUTION: Record<Lang, { rows: [RegExp, string, string][]; rules: string[] }> = {
  'pt-BR': {
    rows: [
      [/^\s*Essencial/, '10 h', 'R$ 4.000'],
      [/^\s*Evolução/, '25 h', 'R$ 9.000'],
      [/^\s*Parceiro técnico/, '45 h', 'R$ 16.000'],
    ],
    rules: ['3 meses', 'R$ 400'],
  },
  en: {
    rows: [
      [/^\s*Essential/, '10 h', 'US$ 1,500'],
      [/^\s*Evolution/, '25 h', 'US$ 4,000'],
      [/^\s*Technical partner/, '45 h', 'US$ 7,000'],
    ],
    rules: ['3-month minimum', 'US$ 160'],
  },
};

/** Todo valor monetário que pode aparecer em cada idioma (hero, escada, tabela, FAQ). */
const ALLOWED_MONEY: Record<Lang, string[]> = {
  'pt-BR': ['R$ 6.000', 'R$ 18.000', 'R$ 42.000', 'R$ 65.000', 'R$ 4.000', 'R$ 9.000', 'R$ 16.000', 'R$ 400'],
  // Sem preço de terceiros (o "$25" do Lovable saiu: Crivo, retomada item 4).
  en: ['US$ 3,000', 'US$ 7,000', 'US$ 15,000', 'US$ 1,500', 'US$ 4,000', 'US$ 7,000', 'US$ 160'],
};

async function stepText(page: Page, name: RegExp): Promise<string> {
  const step = page
    .locator('#precos li')
    .filter({ has: page.getByRole('heading', { level: 3, name }) })
    .last();
  await expect(step, `degrau ${name} existe em #precos`).toHaveCount(1);
  await step.evaluate((el) => el.querySelectorAll('details').forEach((d) => (d.open = true)));
  return norm(await step.innerText());
}

const moneyIn = (text: string): string[] =>
  [...text.matchAll(/(?:R\$|US\$|\$)\s?\d[\d.,]*\d|(?:R\$|US\$|\$)\s?\d/g)].map((m) => norm(m[0]).replace(/[.,]$/, ''));

for (const { path, lang } of HOMES) {
  test.describe(`${path} preços = PLANO-DEV §5.3`, () => {
    for (const s of LADDER[lang]) {
      test(`P1 degrau ${s.name.source}`, async ({ page }) => {
        await page.goto(path);
        const text = await stepText(page, s.name);
        for (const m of s.must) expect(text, `"${m}" no degrau ${s.name.source}`).toContain(m);
        for (const re of s.mustNot ?? []) expect(text).not.toMatch(re);
      });
    }

    test('P2 tabela do Product Evolution (caption, scope, horas e preços)', async ({ page }) => {
      await page.goto(path);
      await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
      const table = page.locator('#precos table');
      await expect(table).toHaveCount(1);
      await expect(table.locator('caption')).toHaveCount(1);
      await expect(table.locator('th[scope="col"]')).toHaveCount(3);
      await expect(table.locator('th[scope="row"]')).toHaveCount(3);
      for (const [plan, hours, price] of EVOLUTION[lang].rows) {
        const row = table.locator('tbody tr').filter({ has: page.locator('th[scope="row"]', { hasText: plan }) });
        await expect(row, `linha ${plan.source}`).toHaveCount(1);
        const text = norm(await row.innerText());
        expect(text).toContain(hours);
        expect(text).toContain(price);
      }
      const ladderText = norm(await page.locator('#precos').innerText());
      for (const rule of EVOLUTION[lang].rules) expect(ladderText).toContain(rule);
    });

    test('P3 ordem dos degraus', async ({ page }) => {
      await page.goto(path);
      const names = (await page.locator('#precos li h3').allInnerTexts()).map(norm);
      const order = LADDER[lang].map((s) => names.findIndex((n) => s.name.test(n)));
      expect(order.every((i) => i >= 0), `degraus encontrados: ${names.join(' | ')}`).toBe(true);
      expect(order).toEqual([...order].sort((a, b) => a - b));
    });

    test('P5 "a partir de"/"from" antes do valor no DOM (ordem do leitor de tela)', async ({ page }) => {
      await page.goto(path);
      const prefix = lang === 'en' ? 'from' : 'a partir de';
      const text = norm(await page.locator('#precos').innerText());
      const re = lang === 'en' ? /US\$ 15,000/ : /R\$ 4\.000/;
      const idx = text.search(re);
      expect(idx).toBeGreaterThan(0);
      expect(text.slice(Math.max(0, idx - prefix.length - 2), idx).trim()).toBe(prefix);
    });
  });
}

for (const { path, lang } of PAGES) {
  test(`P4 nenhum valor monetário fora da tabela §5.3 em ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
    const found = moneyIn(norm(await page.locator('body').innerText()));
    expect(found.filter((m) => !ALLOWED_MONEY[lang].includes(m))).toEqual([]);
    // Moeda certa por idioma.
    expect(found.filter((m) => (lang === 'en' ? m.startsWith('R$') : m.startsWith('US$') || m.startsWith('$')))).toEqual([]);
  });
}
