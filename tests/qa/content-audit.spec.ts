import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test, type Page } from './fixtures';

import { HOMES, NOT_FOUND, PAGES, hits, norm, readableText, word, type Lang } from './helpers';

/**
 * Auditoria de conteúdo contra as regras invioláveis (BRIEFING §3, PLANO-DEV §2.3).
 * CHECKLIST.md §C. Um item proibido = bloqueador (vai para a Batuta, não para o Ritmo).
 */

/**
 * Exclusões do fundador (base/03 item 8, Q8) + pessoas citadas na matéria (item 7): nunca nomeados.
 * Ecoporto só pode existir dentro do href da MundoLogística. Sem diferenciar maiúsculas; "Aliança" com ou sem cedilha.
 */
const TERMINAL = /eco\s?-?porto|transbrasa|marimex|maersk|bandeirantes|alian[çc]a|bissani|gutierres/i;

interface Rule {
  id: string;
  re: RegExp;
}

/** F4 (PLANO-DEV §5.5): com PUBLIC_LOOPT_AUTHORIZED=true a Loopt pode ser citada nos cases; o build e o teste leem a mesma env. */
const looptAuthorized = (process.env.PUBLIC_LOOPT_AUTHORIZED ?? '').trim().toLowerCase() === 'true';

const COMMON: Rule[] = [
  ...(looptAuthorized ? [] : [{ id: 'C1 nome Loopt visível', re: /loopt/i }]),
  { id: 'C2 −41% / −31%', re: /[−\-–]\s?(41|31)\s?%/u },
  { id: 'C4 multiplicador 5x/10x', re: /(?<![\p{L}\p{N}])\d+\s?[x×](?![\p{L}\p{N}])/iu },
  { id: 'C7 placeholder TODO', re: /TODO/ },
  { id: 'C2 −21% de espera (métrica do terminal, base/03 item 7)', re: /[−\-–]\s?21\s?%/u },
  { id: 'C30 FinPlan removida (base/03 item 8, D1)', re: /fin\s?plan/i },
  { id: 'C33 relato de provisionamento removido (30 min)', re: /30\s?min(utos|utes)?/i },
  { id: 'C33 plataforma interna removida', re: /plataforma interna|internal platform/i },
  { id: 'C33 "2 semanas" no contexto de provisionamento', re: /provision[^.]{0,120}(2 semanas|2 weeks)|(2 semanas|2 weeks)[^.]{0,60}(provision|30)/i },
  { id: 'C26 cliente-terminal nomeado', re: TERMINAL },
  { id: 'C27 Vercel citada (deploy e privacidade agora são Netlify, PLANO-DEV §5.6)', re: /vercel/i },
  { id: 'C7 token não substituído', re: /\{(brand|price|year|n|BOOKING_URL|CONTACT_EMAIL|SITE_BRAND)[^}]*\}/ },
  { id: 'C7 undefined/null/NaN no texto', re: word('(undefined|NaN|null)', 'u') },
];

const BY_LANG: Record<Lang, Rule[]> = {
  'pt-BR': [
    { id: 'C3 1ª pessoa do plural (nós/nosso)', re: word('(nós|noss[oa]s?)') },
    { id: 'C3 verbo em 1ª pessoa do plural', re: word('(somos|fazemos|entregamos|construímos|atendemos|oferecemos|trabalhamos|garantimos|cobramos)') },
    { id: 'C3 equipe fingida', re: /(time|equipe) (nosso|nossa|de engenheiros|de desenvolvedores|dedicad[oa])/iu },
    { id: 'C4 preço como argumento', re: /mais barat[oa]|mais em conta|menor custo|economi[sz]e/iu },
    { id: 'C4 promessa proibida', re: /substitui \d+|fa(z|ço|zemos) tudo|sempre mais/iu },
    { id: 'C6 clientes internacionais', re: /clientes internacionais/iu },
  ],
  en: [
    { id: 'C3 first-person plural', re: word('(we|our|ours|we\'re|we\'ll|we\'ve)') },
    { id: 'C3 "us" (lowercase)', re: word('us', 'u') },
    { id: 'C3 fake team', re: /\b(our|a dedicated|the) team\b|team of (engineers|developers)/i },
    { id: 'C4 price as pitch', re: /\bcheap(er|est)?\b|save money|fraction of the cost|lower cost/i },
    { id: 'C4 forbidden promise', re: /replaces? \d+|we do (it )?all|always (cheaper|faster)/i },
    { id: 'C6 international clients', re: /international clients/i },
  ],
};

async function audit(page: Page, path: string, lang: Lang): Promise<string[]> {
  await page.goto(path);
  const text = await readableText(page);
  // Na privacidade, "30 minutos" é duração de cookie (tabela do Calendly), não o relato de provisionamento do C33.
  const isPrivacy = /privac/.test(path);
  const rules = [...COMMON, ...BY_LANG[lang], ...(path === NOT_FOUND.path ? BY_LANG.en : [])].filter(
    (r) => !(isPrivacy && r.id.startsWith('C33 relato')),
  );
  return rules.flatMap((rule) => hits(text, rule.re).map((h) => `${rule.id}: ${h}`));
}

for (const p of [...PAGES, NOT_FOUND]) {
  test(`C1–C7 nenhum termo proibido em ${p.path}`, async ({ page }) => {
    expect(await audit(page, p.path, p.lang)).toEqual([]);
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

const HEADLINE: Record<Lang, string> = {
  'pt-BR': 'Seu produto em produção em 6–10 semanas, construído e mantido por um único responsável sênior.',
  en: 'Ship your product without hiring a team. One senior product engineer, accountable end to end.',
};

const LABELS: Record<Lang, { selfReported: string; ownProject: string; publicSource: RegExp }> = {
  'pt-BR': { selfReported: 'Relato meu', ownProject: 'Projeto próprio', publicSource: /Dado público · MundoLogística, jan\/2026/ },
  en: { selfReported: 'My own account', ownProject: 'Own project', publicSource: /Public data · MundoLogística, Jan 2026/ },
};

/** Menor bloco (li/article) da seção #quem que contém o texto. */
const caseBlock = (page: Page, text: string | RegExp) =>
  page.locator('#quem').locator('li, article').filter({ hasText: text }).last();

for (const { path, lang } of HOMES) {
  test.describe(`${path} prova social (PLANO-DEV §2.3)`, () => {
    test('C8 manchete exata e sem "AI-native" no hero', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(norm(await page.locator('h1').innerText())).toBe(HEADLINE[lang]);
      expect(await page.locator('#inicio').innerText()).not.toMatch(/AI[- ]native|IA[- ]nativ/i);
    });

    test('C9 métrica pública: −27% e +21% com fonte MundoLogística, sem nome da empresa', async ({ page }) => {
      await page.goto(path);
      const block = caseBlock(page, /27\s?%/);
      await expect(block).toContainText(/[−-]\s?27\s?%/);
      await expect(block).toContainText(/\+\s?21\s?%/);
      const source = block.locator('a[href*="mundologistica.com.br"]');
      await expect(source).toHaveCount(1);
      await expect(source).toContainText(LABELS[lang].publicSource);
      if (looptAuthorized) await expect(block).toContainText('Loopt');
      else expect(await block.innerText()).not.toMatch(/loopt/i);
    });

    test('C22 com F4 autorizado, "Loopt" só nos cases de #quem (nunca em title, meta, hero ou OG)', async ({ page }) => {
      test.skip(!looptAuthorized, 'só com PUBLIC_LOOPT_AUTHORIZED=true');
      await page.goto(path);
      const outside = await page.evaluate(() => {
        const parts = [document.title, ...[...document.querySelectorAll('meta[content]')].map((m) => m.getAttribute('content') ?? '')];
        const body = document.body.cloneNode(true) as HTMLElement;
        body.querySelectorAll('#quem, script, style').forEach((el) => el.remove());
        parts.push(body.textContent ?? '');
        return parts.join('\n');
      });
      expect(hits(outside, /loopt/i)).toEqual([]);
    });

    test('C10 Bom.Capital só como relato, sem destaque numérico', async ({ page }) => {
      await page.goto(path);
      const block = caseBlock(page, 'Bom.Capital');
      await expect(block).toContainText(LABELS[lang].selfReported);
      await expect(block).toContainText(/48/);
      // Relato autodeclarado não leva <strong>/<b>/badge nos números (DESIGN §6.10).
      const emphasized = await block.locator('strong, b, mark, [class*="badge"], [class*="metric"]').allInnerTexts();
      expect(emphasized.filter((t) => /\d/.test(t))).toEqual([]);
    });


    test('C11 Ascende como projeto próprio, nunca cliente (FinPlan removida: C30)', async ({ page }) => {
      await page.goto(path);
      await expect(caseBlock(page, 'Ascende')).toContainText(lang === 'en' ? /own (project|product)/i : /projeto próprio/i);
      await expect(caseBlock(page, 'Ascende').locator('a[href^="https://ascende.site"]')).toHaveCount(1);
      const text = await readableText(page);
      expect(hits(text, /client[ea]?s?[^.]{0,60}Ascende|Ascende[^.]{0,60}client/iu)).toEqual([]);
    });

    test('C31 Production-Ready não cita ferramenta (Lovable, Bolt, Cursor)', async ({ page }) => {
      await page.goto(path);
      const step = page.locator('#precos li').filter({ has: page.getByRole('heading', { level: 3, name: /Production-Ready/ }) }).last();
      await expect(step).toHaveCount(1);
      await step.evaluate((el) => el.querySelectorAll('details').forEach((d) => (d.open = true)));
      expect(await step.textContent()).not.toMatch(/lovable|bolt|cursor/i);
    });

    test('C34 ferramentas de protótipo genéricas e sem preço de terceiro (Crivo, retomada item 4)', async ({ page }) => {
      await page.goto(path);
      const text = await readableText(page);
      const generic = lang === 'en' ? /AI prototyping tools \(Lovable, Bolt and the like\)/g : /ferramentas de IA para protótipo \(Lovable, Bolt e similares\)/gi;
      expect((text.match(generic) ?? []).length, 'card de dor + pergunta da FAQ').toBeGreaterThanOrEqual(2);
      expect(hits(text, /\$\s?25\b|por bem menos/iu)).toEqual([]);
      // Toda menção a Lovable/Bolt fica dentro da forma genérica.
      expect(text.replace(generic, '').match(/lovable|\bbolt\b/gi) ?? []).toEqual([]);
    });

    test('C9b métrica atribuída: "segundo a Loopt" / "according to Loopt"', async ({ page }) => {
      // Sem autorização (F4) a Loopt não aparece em lugar nenhum: isso é o C1.
      test.skip(!looptAuthorized, 'só com PUBLIC_LOOPT_AUTHORIZED=true; sem autorização vale o C1');
      await page.goto(path);
      await expect(caseBlock(page, /27\s?%/)).toContainText(lang === 'en' ? /according to Loopt/i : /segundo a Loopt/i);
    });

    test('C9c Bom.Capital atribuída como relato', async ({ page }) => {
      await page.goto(path);
      const bom = caseBlock(page, 'Bom.Capital');
      await expect(bom).toContainText(lang === 'en' ? /my own account/i : /relato/i);
      await expect(bom).toContainText(lang === 'en' ? /on average/i : /em média 48 horas/i);
    });

    test('C23 neptune.ai citada sem link (artigo fora do ar)', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('#quem')).toContainText(/neptune\.ai/);
      await expect(page.locator('a[href*="neptune"]')).toHaveCount(0);
    });

    test('C32 nenhum link para domínio da Bom.Capital', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('a[href*="bom.capital" i], a[href*="bomcapital" i]')).toHaveCount(0);
    });

    test('C12 links não vazios (sem href="#" nem vazio)', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('a[href="#"], a[href=""], a:not([href])')).toHaveCount(0);
    });
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

test('C1/C2 HTML bruto em dist/ sem "Loopt" (fora de href) nem −41%/−31%', () => {
  test.skip(Boolean(process.env.QA_BASE_URL), 'varre o dist/ local; no preview o DOM já é auditado pelos outros C*');
  const problems: string[] = [];
  for (const file of htmlFiles(process.env.QA_OUTDIR ?? 'dist')) {
    const raw = readFileSync(file, 'utf8').replace(/\shref="[^"]*"/g, '');
    for (const re of [...(looptAuthorized ? [] : [/loopt/i]), /[−\-–]\s?(41|31)\s?%/u, /&minus;\s?(41|31)/]) {
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
    const home = path.startsWith('/en/') ? '/en/' : '/';
    await page.goto(home);
    await expect(page.locator(`#contato a[href="mailto:${email}"]`)).toBeVisible();
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

/** F6: a foto do fundador, se presente, carrega de verdade e tem dimensões fixas (sem CLS). */
for (const { path } of HOMES) {
  test(`C25 foto do fundador carrega com width/height: ${path}`, async ({ page }) => {
    await page.goto(path);
    const img = page.locator('#quem img');
    test.skip((await img.count()) === 0, 'sem foto (monograma)');
    await img.first().scrollIntoViewIfNeeded();
    await expect(img.first()).toHaveAttribute('alt', 'Henrique Pett');
    await expect(img.first()).toHaveAttribute('width', /\d+/);
    await expect(img.first()).toHaveAttribute('height', /\d+/);
    await expect.poll(() => img.first().evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  });
}

/** f3bcad8: a garantia de 60 dias é só do MVP; nunca aparece sem qualificação no hero nem no og:description. */
const WARRANTY: Record<Lang, { proof: string; unqualified: RegExp }> = {
  'pt-BR': { proof: 'Garantia de 60 dias no MVP', unqualified: /garantia de 60 dias(?! no MVP)/i },
  en: { proof: '60-day bug warranty on MVPs', unqualified: /60-day bug warranty(?! on MVPs)/i },
};

for (const { path, lang } of HOMES) {
  test(`C29 garantia de 60 dias qualificada como MVP no hero e no og:description: ${path}`, async ({ page }) => {
    await page.goto(path);
    const items = (await page.locator('#inicio .hero__proof li').allInnerTexts()).map(norm);
    expect(items).toContain(WARRANTY[lang].proof);
    expect(norm(await page.locator('#inicio').innerText())).not.toMatch(WARRANTY[lang].unqualified);
    const og = (await page.locator('meta[property="og:description"]').getAttribute('content')) ?? '';
    expect(og).not.toMatch(WARRANTY[lang].unqualified);
  });

  for (const width of [360, 768, 1280]) {
    test(`R5 microprova do hero: cada item em 1 linha, dentro do container, sem scroll horizontal: ${path} ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);
      const m = await page.locator('#inicio .hero__proof').evaluate((ul) => {
        const box = ul.getBoundingClientRect();
        const items = [...ul.querySelectorAll('li')].map((li) => {
          const range = document.createRange();
          range.selectNodeContents(li);
          const tops: number[] = [];
          for (const q of range.getClientRects()) if (q.width > 0 && !tops.some((t) => Math.abs(t - q.top) < q.height / 2)) tops.push(q.top);
          const r = li.getBoundingClientRect();
          return { text: (li.textContent ?? '').trim(), lines: tops.length, inside: r.left >= box.left - 1 && r.right <= box.right + 1 };
        });
        return { items, scroll: document.documentElement.scrollWidth - document.documentElement.clientWidth };
      });
      expect(m.items.filter((i) => i.lines > 1 || !i.inside).map((i) => `${i.text} (${i.lines} linhas)`)).toEqual([]);
      expect(m.scroll).toBeLessThanOrEqual(0);
    });
  }
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
