import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test, type Page } from './fixtures';

import { HOMES, NOT_FOUND, PAGES, hits, norm, readableText, word, type Lang } from './helpers';

/**
 * Auditoria de conteúdo contra as regras de honestidade e voz da Torno (docs/estrategia-2026-11-torno-industria.md
 * §5 e §9). Um item proibido = bloqueador.
 */

/**
 * Clientes da Loopt e pessoas da matéria: nunca nomeados (estratégia §5.4). Só podem existir dentro do href
 * da MundoLogística. Sem diferenciar maiúsculas; "Aliança" com ou sem cedilha.
 */
const TERMINAL = /deicmar|eco\s?-?porto|tbsa|santos brasil|transbrasa|marimex|maersk|bandeirantes|alian[çc]a|bissani|gutierres/i;

interface Rule {
  id: string;
  re: RegExp;
}

/** Valem em todas as páginas auditadas (texto legível: body, title, metas e atributos de texto). */
const COMMON: Rule[] = [
  { id: 'C2 −41% / −31%', re: /[−\-–]\s?(41|31)\s?%/u },
  { id: 'C4 multiplicador 5x/10x', re: /(?<![\p{L}\p{N}])\d+\s?[x×](?![\p{L}\p{N}])/iu },
  { id: 'C7 placeholder TODO', re: /TODO/ },
  { id: 'C26 cliente-terminal nomeado', re: TERMINAL },
  { id: 'C27 Vercel citada', re: /vercel/i },
  { id: 'C7 token não substituído', re: /\{(brand|organization|price|year|n|BOOKING_URL|CONTACT_EMAIL|SITE_BRAND)[^}]*\}/ },
  { id: 'C7 undefined/null/NaN no texto', re: word('(undefined|NaN|null)', 'u') },
  { id: 'C40 "Studio" no texto (marca é Torno; o domínio tornostudio.com segue)', re: /studio(?!\.com)/i },
  // Decisão do Henrique (2026-11-12): o porte do ICP não aparece como número no site.
  { id: 'C45 porte em número de funcionários (200+)', re: /\b200\s?(\+|ou mais|or more)|\b200\s(funcion|employees|pessoas|people)/i },
];

/** Páginas institucionais novas (escopo da home): regras de voz, preço e vocabulário. */
const INSTITUTIONAL: { path: string; lang: Lang }[] = [
  { path: '/', lang: 'pt-BR' },
  { path: '/en/', lang: 'en' },
  { path: '/como-trabalhamos/', lang: 'pt-BR' },
  { path: '/en/how-we-work/', lang: 'en' },
  { path: '/about/', lang: 'pt-BR' },
  { path: '/en/about/', lang: 'en' },
  { path: '/contact/', lang: 'pt-BR' },
  { path: '/en/contact/', lang: 'en' },
  { path: '/diagnostico/', lang: 'pt-BR' },
];

/** Aplicadas ao texto do <main> das páginas institucionais (o banner de consentimento tem texto próprio). */
const MAIN_RULES: Record<Lang, Rule[]> = {
  'pt-BR': [
    { id: 'C3 voz em 1ª pessoa do singular (marca fala em "nós")', re: word('(eu|meu|minha|meus|minhas|comigo)') },
    { id: 'C41 preço público', re: /R\$|US\$|\$\s?\d/ },
    { id: 'C4 promessa de resultado', re: /reduz[a-z]* \d+\s?%|ROI em|substitui \d+|10x mais/iu },
    { id: 'C3 equipe fingida', re: /(nosso|nossa) (time|equipe)|(time|equipe) de (engenheiros|desenvolvedores)|\d+ (funcionários|colaboradores) na Torno/iu },
    {
      id: 'C42 palavra proibida (§9)',
      re: /robust[oa]|revolucion|potencializ|alavanc|jornada|ecossistema|transformação digital|de ponta(?! a ponta)|seamless|desbloque|next level/iu,
    },
    { id: 'C43 restos da oferta antiga', re: /founding engineer|product sprint|production-ready|mvp plus|garantia de 60 dias|lovable|ai-native/i },
  ],
  en: [
    { id: 'C3 first-person singular', re: /(?<![\p{L}\p{N}])(I|I'm|I've|I'll|my|mine)(?![\p{L}\p{N}])/u },
    { id: 'C41 public price', re: /R\$|US\$|\$\s?\d/ },
    { id: 'C4 outcome promise', re: /cut \w+ by \d+\s?%|ROI in|replaces? \d+|10x faster/i },
    { id: 'C3 fake team', re: /team of (engineers|developers)|\d+ (employees|engineers) at Torno/i },
    { id: 'C42 banned word (§9)', re: /\brobust|revolutionar|leverag|journey|ecosystem|digital transformation|cutting[- ]edge|seamless|unlock|next level/i },
    { id: 'C43 old offer leftovers', re: /founding engineer|product sprint|production-ready|mvp plus|60-day bug warranty|lovable|ai-native/i },
  ],
};

async function audit(page: Page, path: string): Promise<string[]> {
  await page.goto(path);
  const text = await readableText(page);
  return COMMON.flatMap((rule) => hits(text, rule.re).map((h) => `${rule.id}: ${h}`));
}

for (const p of [...PAGES, NOT_FOUND, ...INSTITUTIONAL.filter((i) => !PAGES.some((q) => q.path === i.path))]) {
  test(`C1–C7 nenhum termo proibido em ${p.path}`, async ({ page }) => {
    expect(await audit(page, p.path)).toEqual([]);
  });

  test(`C26 links e recursos não apontam para o cliente-terminal (exceto MundoLogística): ${p.path}`, async ({ page }) => {
    await page.goto(p.path);
    const urls = await page.locator('[href], [src], [srcset]').evaluateAll((els) =>
      els.flatMap((el) => ['href', 'src', 'srcset'].map((a) => el.getAttribute(a) ?? '')).filter(Boolean),
    );
    expect(urls.filter((u) => TERMINAL.test(u) && !u.startsWith('https://mundologistica.com.br/'))).toEqual([]);
  });

  test(`C28 sem terceiros nem cookies sem consentimento de Publicidade (estado recusado): ${p.path}`, async ({ page, context, baseURL }) => {
    // Hosts de ferramentas do preview (ex.: drawer da Netlify) entram em QA_IGNORE_HOSTS, separados por vírgula.
    const ignore = (process.env.QA_IGNORE_HOSTS ?? '').split(',').map((h) => h.trim()).filter(Boolean);
    const origin = new URL(baseURL!).origin;
    const thirdParty: string[] = [];
    page.on('request', (req) => {
      const u = new URL(req.url());
      if (u.protocol.startsWith('http') && u.origin !== origin && !ignore.some((h) => u.hostname.endsWith(h))) thirdParty.push(req.url());
    });
    await page.goto(p.path, { waitUntil: 'networkidle' });
    await page.mouse.wheel(0, 20000);
    await page.waitForLoadState('networkidle');
    expect(thirdParty).toEqual([]);
    expect((await context.cookies()).map((c) => c.name)).toEqual([]);
    await expect(page.locator('script[src*="_vercel"], script[src*="insights"], script[src*="analytics"], script[src*="gtag"]')).toHaveCount(0);
    // B5: a Netlify chegou a injetar um selo (script /.netlify/scripts/hud + iframe fixo) só em produção.
    await expect(page.locator('script[src*="/.netlify/"], script[src*="vercel.live"], iframe')).toHaveCount(0);
  });

  test(`C5 nenhum depoimento, logo ou review em ${p.path}`, async ({ page }) => {
    await page.goto(p.path);
    await expect(page.locator('#depoimentos, [data-testimonials], blockquote, q, [itemtype*="Review"]')).toHaveCount(0);
    // Única imagem de pessoa permitida: a foto do fundador. Nenhum <img> de logo de cliente.
    const imgs = await page.locator('img').evaluateAll((els) => els.map((el) => el.getAttribute('alt') ?? '(sem alt)'));
    expect(imgs.filter((alt) => alt !== 'Henrique Pett')).toEqual([]);
    const text = await readableText(page);
    expect(hits(text, /depoimento|testimonial|trusted by|as seen in|clientes que confiam|empresas que confiam|★|⭐|\d(,|\.)\d\s?\/\s?5/iu)).toEqual([]);
  });
}

for (const { path, lang } of INSTITUTIONAL) {
  test(`C3/C41–C43 voz "nós", sem preço, sem vocabulário proibido nem oferta antiga no <main>: ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
    const text = norm((await page.locator('main').textContent()) ?? '');
    const found = MAIN_RULES[lang].flatMap((rule) => hits(text, rule.re).map((h) => `${rule.id}: ${h}`));
    expect(found).toEqual([]);
  });

  test(`C44 títulos e botões sem travessão; nenhum link para /para/: ${path}`, async ({ page }) => {
    await page.goto(path);
    const titles = await page.locator('main :is(h1, h2, h3, h4, .btn, button, .eyebrow, .lead)').allInnerTexts();
    expect(titles.filter((t) => /[—–]/.test(t))).toEqual([]);
    const hrefs = await page.locator('a[href]').evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
    expect(hrefs.filter((href) => href.includes('/para/'))).toEqual([]);
  });

  test(`C12 links não vazios (sem href="#" nem vazio): ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('a[href="#"], a[href=""], a:not([href])')).toHaveCount(0);
  });

  test(`C32 nenhum link para domínio da Bom.Capital: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('a[href*="bom.capital" i], a[href*="bomcapital" i]')).toHaveCount(0);
  });
}

for (const { path, lang } of HOMES) {
  test(`C9 métrica pública da Loopt: −27% e +21%, atribuídas à Loopt, com fonte MundoLogística: ${path}`, async ({ page }) => {
    await page.goto(path);
    const block = page.locator('main section').filter({ hasText: /27\s?%/ }).last();
    await expect(block).toContainText(/[−-]\s?27\s?%/);
    await expect(block).toContainText(/\+\s?21\s?%/);
    await expect(block).toContainText(lang === 'en' ? /according to Loopt/i : /segundo a Loopt/i);
    expect(await block.locator('a[href^="https://mundologistica.com.br/"]').count()).toBeGreaterThanOrEqual(1);
  });

  test(`C8 manchete única e sem setor por nome: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    const text = (await page.locator('main').textContent()) ?? '';
    expect(hits(text, /têxtil|confecç|alimentos e bebidas|plásticos|metalmecânic|madeira e móveis|eletroeletrônic|autopeças|textile|apparel|food and beverage|plastics|metalworking|furniture|auto parts/iu)).toEqual([]);
  });
}

/** Varredura do HTML bruto do build: pega o que o DOM renderizado não mostra (JSON-LD, comentários, atributos). */
function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? htmlFiles(full) : full.endsWith('.html') || full.endsWith('.xml') || full.endsWith('.txt') ? [full] : [];
  });
}

test('C26 HTML bruto em dist/: cliente-terminal só dentro do href da MundoLogística', () => {
  test.skip(Boolean(process.env.QA_BASE_URL), 'varre o dist/ local; no ar vale o C26 por página');
  const problems: string[] = [];
  for (const file of htmlFiles(process.env.QA_OUTDIR ?? 'dist')) {
    const raw = readFileSync(file, 'utf8').replace(/\shref="https:\/\/mundologistica\.com\.br\/[^"]*"/g, '');
    for (const h of hits(raw, TERMINAL)) problems.push(`${file}: ${h}`);
  }
  expect(problems).toEqual([]);
});

test('C2 HTML bruto em dist/ sem −41%/−31%', () => {
  test.skip(Boolean(process.env.QA_BASE_URL), 'varre o dist/ local; no preview o DOM já é auditado pelos outros C*');
  const problems: string[] = [];
  for (const file of htmlFiles(process.env.QA_OUTDIR ?? 'dist')) {
    const raw = readFileSync(file, 'utf8').replace(/\shref="[^"]*"/g, '');
    for (const re of [/[−\-–]\s?(41|31)\s?%/u, /&minus;\s?(41|31)/]) {
      for (const h of hits(raw, re)) problems.push(`${file}: ${h}`);
    }
  }
  expect(problems).toEqual([]);
});

/** Privacidade reescrita (449895b/208f17a): sem prazo de guarda de logs prometido; e-mail visível quando configurado. */
for (const path of ['/privacidade/', '/en/privacy/']) {
  test(`C20 privacidade sem promessa de guardar LOGS por 6 meses (validade do consentimento permitida): ${path}`, async ({ page }) => {
    await page.goto(path);
    const text = await readableText(page);
    // Só prazo de guarda de LOGS é proibido; os 6 meses de validade do consentimento (SPEC §3.2) são permitidos.
    expect(hits(text, /(registros?|logs?)[^.]{0,80}(6|seis|six)\s*(meses|months)|(6|seis|six)\s*(meses|months)[^.]{0,80}(registros?|logs?)/iu)).toEqual([]);
  });

  test(`C21 e-mail público visível na privacidade e no contato: ${path}`, async ({ page }) => {
    const email = (process.env.PUBLIC_CONTACT_EMAIL ?? '').trim();
    test.skip(!email, 'só com PUBLIC_CONTACT_EMAIL definido (preview/produção)');
    await page.goto(path);
    await expect(page.locator(`main a[href="mailto:${email}"]`).first()).toBeVisible();
    await expect(page.locator('main')).toContainText(email);
    await page.goto(path.startsWith('/en/') ? '/en/contact/' : '/contact/');
    await expect(page.locator(`main a[href="mailto:${email}"]`)).toBeVisible();
  });
}

/** F9: controlador identificado na privacidade quando PUBLIC_LEGAL_NAME/ID estão definidos (preview/produção). */
for (const path of ['/privacidade/', '/en/privacy/']) {
  test(`C24 controlador (nome e CNPJ) visível: ${path}`, async ({ page }) => {
    const name = (process.env.PUBLIC_LEGAL_NAME ?? '').trim();
    const id = (process.env.PUBLIC_LEGAL_ID ?? '').trim();
    test.skip(!name || !id, 'só com PUBLIC_LEGAL_NAME e PUBLIC_LEGAL_ID');
    await page.goto(path);
    await expect(page.locator('main')).toContainText(name);
    await expect(page.locator('main')).toContainText(id);
  });
}

/** A foto do fundador, na /about/, carrega de verdade, é pequena e tem dimensões fixas (sem CLS). */
for (const path of ['/about/', '/en/about/']) {
  test(`C25 foto do fundador carrega com width/height: ${path}`, async ({ page }) => {
    await page.goto(path);
    const img = page.locator('main img');
    await expect(img).toHaveCount(1);
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveAttribute('alt', 'Henrique Pett');
    await expect(img).toHaveAttribute('width', '96');
    await expect(img).toHaveAttribute('height', '96');
    await expect.poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(page.locator(`main a[href="${path.startsWith('/en/') ? '/en/authors/henrique-pett/' : '/autores/henrique-pett/'}"]`)).toHaveCount(1);
  });
}

/** SPEC §6: com o Google Ads, a política não pode mais negar cookies nem publicidade. */
for (const path of ['/privacidade/', '/en/privacy/']) {
  test(`C35 política sem "não uso cookies" nem "não faço publicidade": ${path}`, async ({ page }) => {
    await page.goto(path);
    const text = await readableText(page);
    // "sem cookies" sozinho é legítimo (ex.: o contador agregado da /diagnostico/); só a negação geral é proibida.
    const re = /n[ãa]o (uso|usa|utiliza|utilizo) (nenhum )?cookies?|este site n[ãa]o usa cookies|n[ãa]o fa[çc]o publicidade|n[ãa]o h[áa] publicidade|(no|does not use|doesn't use|do not use|don't use) (any |tracking )?cookies|cookie-free|no advertising|(do not|don't) (run |do )?advertis/iu;
    expect(hits(text, re)).toEqual([]);
  });
}
