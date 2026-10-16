import AxeBuilder from '@axe-core/playwright';
import { expect, test, type BrowserContext, type Page } from '@playwright/test';

import { BANNER_ON, CONSENT_KEY } from './fixtures';
import { BOOKING_PAGES, DIAGNOSTICO, NOT_FOUND, PAGES, gotoWithTheme, type Theme } from './helpers';

/**
 * Consentimento, Consent Mode v2 básico, Google Ads e popup do Calendly (docs/consent/SPEC.md §7; CHECKLIST.md §CS).
 * Usa o `test` puro do Playwright: aqui a 1ª visita é sem registro de consentimento.
 * Casos que dependem de rede externa (gtag.js, widget do Calendly, cookies _gcl_*) só rodam no ar (QA_BASE_URL).
 */

const GADS_ID = process.env.QA_GADS_ID ?? 'AW-934581192';

// Sem PUBLIC_GADS_ID não há banner nem consentimento: o arquivo inteiro não se aplica (npm test padrão).
test.skip(!BANNER_ON, 'banner só existe com PUBLIC_GADS_ID (build e teste com a mesma env) ou no ar (QA_BASE_URL)');
const online = Boolean(process.env.QA_BASE_URL) || process.env.QA_ONLINE === '1';
const needsNetwork = () => test.skip(!online, 'depende de rede externa: rode no preview com QA_BASE_URL');
/** SPEC §8–§9: deploy 2A (Medição, popup do Calendly, UTM, conversão) está no main desde 54ce588. QA_DEPLOY2=0 volta ao deploy 1. */
const deploy2 = process.env.QA_DEPLOY2 !== '0';
const needsDeploy2 = () => test.skip(!deploy2, 'deploy 2 desligado (QA_DEPLOY2=0)');

/** Hosts que não podem ser tocados sem consentimento. */
const THIRD_PARTY = /(^|\.)(google(tagmanager|adservices|syndication)?\.[a-z.]+|doubleclick\.net|calendly\.com|gstatic\.com)$/i;

const banner = (page: Page) => page.locator('[data-consent-banner]');
const action = (page: Page, name: string) => page.locator(`[data-consent-action="${name}"]`);
const dialog = (page: Page) => page.locator('dialog[data-consent-dialog]');
/** 1º CTA de agenda do <main> (hero), o mesmo seletor que o consent.ts liga. */
const heroCta = (page: Page) => page.locator('main a[data-booking-cta]').first();

/** Requisições de terceiros feitas pela página a partir de agora. */
function watchThirdParty(page: Page): string[] {
  const seen: string[] = [];
  page.on('request', (req) => {
    const url = new URL(req.url());
    if (url.protocol.startsWith('http') && THIRD_PARTY.test(url.hostname)) seen.push(req.url());
  });
  return seen;
}

async function cookieState(context: BrowserContext, baseURL: string) {
  const host = new URL(baseURL).hostname;
  const cookies = await context.cookies();
  return {
    thirdParty: cookies.filter((c) => !host.endsWith(c.domain.replace(/^\./, ''))).map((c) => `${c.name}@${c.domain}`),
    gcl: cookies.filter((c) => /^_gcl_|^_ga/.test(c.name)).map((c) => `${c.name}@${c.domain}`),
  };
}

async function storedConsent(page: Page) {
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? 'null'), CONSENT_KEY);
}

/** Entradas do dataLayer como arrays simples (gtag empurra objetos `arguments`). */
async function dataLayer(page: Page): Promise<unknown[][]> {
  return page.evaluate(() =>
    ((window as unknown as { dataLayer?: unknown[] }).dataLayer ?? []).map((e) =>
      e && typeof e === 'object' && 'length' in (e as object) ? Array.from(e as ArrayLike<unknown>) : [e],
    ),
  );
}

const UTM = { utm_source: 'qa', utm_medium: 'test', utm_campaign: 'consent', utm_content: 'hero', utm_term: 'founding-engineer' };
const utmQuery = new URLSearchParams(UTM).toString();

for (const { path, lang } of BOOKING_PAGES) {
  test.describe(`${path} consentimento`, () => {
    test('CS-a 1ª visita sem escolha: banner aberto, 0 terceiros, 0 cookies de terceiros, 0 _gcl_*', async ({ page, context, baseURL }) => {
      const third = watchThirdParty(page);
      await page.goto(path, { waitUntil: 'networkidle' });
      await expect(banner(page)).toBeVisible();
      await expect(banner(page)).toHaveAttribute('role', 'region');
      await expect(banner(page)).toHaveAttribute('aria-label', /.+/);
      await page.mouse.wheel(0, 20000);
      await page.waitForLoadState('networkidle');
      expect(third).toEqual([]);
      expect(await cookieState(context, baseURL!)).toEqual({ thirdParty: [], gcl: [] });
      expect(await storedConsent(page)).toBeNull();
      // Consent Mode básico: o default denied existe, mas nenhum gtag.js foi carregado.
      const layer = await dataLayer(page);
      expect(layer.some((e) => e[0] === 'consent' && e[1] === 'default')).toBe(true);
      await expect(page.locator('script[src*="googletagmanager"], script[src*="calendly"]')).toHaveCount(0);
    });

    test('CS-b Recusar: nada de terceiros, inclusive após reload; CTA = link de saída sem UTM', async ({ page, context, baseURL }) => {
      const third = watchThirdParty(page);
      await page.goto(`${path}?${utmQuery}`);
      await action(page, 'reject').click();
      await expect(banner(page)).toBeHidden();
      expect(await storedConsent(page)).toMatchObject({ publicidade: false });
      await page.reload({ waitUntil: 'networkidle' });
      await expect(banner(page)).toBeHidden();
      expect(third).toEqual([]);
      expect(await cookieState(context, baseURL!)).toEqual({ thirdParty: [], gcl: [] });

      const href = (await heroCta(page).getAttribute('href')) ?? '';
      expect(href).not.toMatch(/utm_/);
      // O clique segue o link (sem preventDefault/popup). A navegação externa é interceptada.
      await page.route(/calendly\.com/, (route) => route.fulfill({ status: 200, contentType: 'text/html', body: 'qa' }));
      const [nav] = await Promise.all([page.waitForEvent('framenavigated', (f) => f === page.mainFrame()), heroCta(page).click()]);
      if (/^https?:/.test(href)) {
        expect(nav.url()).toBe(href);
        expect(nav.url()).not.toMatch(/utm_/);
      }
    });

    test('CS-c Aceitar: gtag AW; consent default (denied) antes de update e config; ad_personalization denied e allow_ad_personalization_signals:false', async ({ page }) => {
      needsNetwork();
      await page.goto(`${path}?${utmQuery}`);
      const gtagReq = page.waitForRequest((r) => r.url().includes(`googletagmanager.com/gtag/js?id=${GADS_ID}`));
      await action(page, 'accept').click();
      await gtagReq;
      await expect(banner(page)).toBeHidden();
      expect(await storedConsent(page)).toMatchObject({ publicidade: true });

      const layer = await dataLayer(page);
      const idx = (pred: (e: unknown[]) => boolean) => layer.findIndex(pred);
      const def = idx((e) => e[0] === 'consent' && e[1] === 'default' && (e[2] as Record<string, string>)?.ad_storage === 'denied');
      const upd = idx((e) => e[0] === 'consent' && e[1] === 'update' && (e[2] as Record<string, string>)?.ad_storage === 'granted');
      const cfg = idx((e) => e[0] === 'config' && e[1] === GADS_ID);
      expect([def, upd, cfg].every((i) => i >= 0), `dataLayer: ${JSON.stringify(layer)}`).toBe(true);
      expect(def).toBeLessThan(upd);
      expect(upd).toBeLessThan(cfg);
      // Alicerce (research/09 §5): sem personalização de anúncios, nem no consentimento nem no config.
      const granted = layer[upd]![2] as Record<string, string>;
      expect(granted.ad_personalization).toBe('denied');
      expect((layer[cfg]![2] as Record<string, unknown> | undefined)?.allow_ad_personalization_signals).toBe(false);
      // Nenhum identificador individual nem evento de conversão no deploy 1 (sem label).
      expect(JSON.stringify(layer)).not.toMatch(/gclid|@|invitee/i);
      if (!deploy2) expect(layer.some((e) => e[0] === 'event' && e[1] === 'conversion')).toBe(false);
    });

    test('CS-c2 Aceitar tudo: CTA abre o popup do Calendly com as UTMs da chegada (deploy 2)', async ({ page }) => {
      needsNetwork();
      needsDeploy2();
      await page.goto(`${path}?${utmQuery}`);
      await action(page, 'accept').click();
      const before = page.url();
      await heroCta(page).click();
      const frame = page.locator('iframe[src*="calendly.com"]');
      await expect(frame).toBeVisible({ timeout: 15000 });
      expect(page.url()).toBe(before);
      const src = new URL((await frame.getAttribute('src')) ?? '');
      for (const [k, v] of Object.entries(UTM)) expect(src.searchParams.get(k), k).toBe(v);
      expect(src.searchParams.has('gclid')).toBe(false);
    });

    test('CS-i Aceitar tudo não dispara Google Analytics na nossa página (opt-out do GA4)', async ({ page }) => {
      needsNetwork();
      // Vale nos dois deploys: o opt-out do GA4 G-G6941HG7H1 é mantido (sem GA4 no site). Só a nossa página:
      // o iframe do Calendly tem GA próprio (ver CS-report-calendly).
      const analytics: string[] = [];
      page.on('request', (r) => {
        const u = new URL(r.url());
        if (r.frame() === page.mainFrame() && /google-analytics\.com|analytics\.google\.com/.test(u.hostname)) analytics.push(`${u.hostname}${u.pathname} tid=${u.searchParams.get('tid')}`);
      });
      await page.goto(path);
      await action(page, 'accept').click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
      expect(analytics).toEqual([]);
    });

    test('CS-c3 Aceitar (deploy 1): CTA continua link de saída, sem popup e sem UTM', async ({ page }) => {
      needsNetwork();
      test.skip(deploy2, 'no deploy 2 vale o CS-c2');
      await page.goto(`${path}?${utmQuery}`);
      await action(page, 'accept').click();
      const href = (await heroCta(page).getAttribute('href')) ?? '';
      expect(href).not.toMatch(/utm_/);
      await page.route(/calendly\.com/, (route) => route.fulfill({ status: 200, contentType: 'text/html', body: 'qa' }));
      const [nav] = await Promise.all([page.waitForEvent('framenavigated', (f) => f === page.mainFrame()), heroCta(page).click()]);
      if (/^https?:/.test(href)) expect(nav.url()).toBe(href);
      await expect(page.locator('script[src*="calendly"]')).toHaveCount(0);
    });

    test('CS-d Personalizar só Medição: popup do Calendly sim, Google não (deploy 2)', async ({ page }) => {
      needsNetwork();
      needsDeploy2();
      // Só a NOSSA página (frame principal): o iframe do Calendly carrega trackers próprios (ver CS-report-calendly).
      const google: string[] = [];
      page.on('request', (r) => {
        if (r.frame() === page.mainFrame() && /google|doubleclick/i.test(new URL(r.url()).hostname)) google.push(r.url());
      });
      await page.goto(`${path}?${utmQuery}`);
      await action(page, 'customize').click();
      await expect(dialog(page)).toBeVisible();
      await expect(dialog(page).locator('input[name="medicao"]')).not.toBeChecked();
      await expect(dialog(page).locator('input[name="publicidade"]')).not.toBeChecked();
      await dialog(page).locator('input[name="medicao"]').check();
      await action(page, 'save').click();
      await expect(dialog(page)).toBeHidden();
      expect(await storedConsent(page)).toMatchObject({ medicao: true, publicidade: false });
      await heroCta(page).click();
      await expect(page.locator('iframe[src*="calendly.com"]')).toBeVisible({ timeout: 15000 });
      await page.waitForLoadState('networkidle');
      expect(google).toEqual([]);
    });

    test('CS-e Revogar pelo footer: volta ao estado recusado e apaga _gcl_* (cookies e localStorage)', async ({ page, context, baseURL }) => {
      needsNetwork();
      await page.goto(path);
      await action(page, 'accept').click();
      await expect.poll(async () => (await cookieState(context, baseURL!)).gcl.length, { timeout: 15000 }).toBeGreaterThan(0);

      await page.locator('footer [data-consent-open]').click();
      await expect(dialog(page)).toBeVisible();
      await Promise.all([page.waitForEvent('load'), action(page, 'reject-all').click()]);
      const third = watchThirdParty(page);
      await page.waitForLoadState('networkidle');
      expect(await storedConsent(page)).toMatchObject({ publicidade: false });
      expect((await cookieState(context, baseURL!)).gcl).toEqual([]);
      // B6: o Google também grava _gcl_ls no localStorage; a revogação precisa apagar.
      expect(await page.evaluate(() => Object.keys(localStorage).filter((k) => /^_gcl_|^_ga/.test(k)))).toEqual([]);
      await page.reload({ waitUntil: 'networkidle' });
      expect(third).toEqual([]);
      await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
      const href = (await heroCta(page).getAttribute('href')) ?? '';
      expect(href).not.toMatch(/utm_/);
    });

    test('CS-d1 Personalizar: categorias opcionais desmarcadas (deploy 2: Medição + Publicidade; deploy 1: só Publicidade); Salvar sem marcar = recusado', async ({ page }) => {
      const third = watchThirdParty(page);
      await page.goto(path);
      await action(page, 'customize').click();
      await expect(dialog(page)).toBeVisible();
      const optional = dialog(page).locator('input[type="checkbox"]:not([disabled])');
      await expect(optional).toHaveCount(deploy2 ? 2 : 1);
      await expect(dialog(page).locator('input[name="publicidade"]')).not.toBeChecked();
      if (deploy2) await expect(dialog(page).locator('input[name="medicao"]')).not.toBeChecked();
      else await expect(dialog(page).locator('input[name="medicao"]')).toHaveCount(0);
      await action(page, 'save').click();
      await expect(dialog(page)).toBeHidden();
      expect(await storedConsent(page)).toMatchObject(deploy2 ? { medicao: false, publicidade: false } : { publicidade: false });
      await page.waitForLoadState('networkidle');
      expect(third).toEqual([]);
    });

    for (const theme of ['light', 'dark'] as Theme[]) {
      test(`CS-f axe no banner e no diálogo: ${theme}`, async ({ page }) => {
        await gotoWithTheme(page, path, theme);
        const blocking = async (sel: string) =>
          (await new AxeBuilder({ page }).include(sel).analyze()).violations
            .filter((v) => v.impact === 'serious' || v.impact === 'critical')
            .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`);
        expect(await blocking('[data-consent-banner]')).toEqual([]);
        await action(page, 'customize').click();
        await expect(dialog(page)).toBeVisible();
        expect(await blocking('dialog[data-consent-dialog]')).toEqual([]);
      });
    }

    test('CS-f teclado: skip link → política → Aceitar; Personalizar abre o diálogo; Esc fecha sem salvar; escolha leva o foco ao main', async ({ page }) => {
      await page.goto(path);
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toHaveAttribute('href', '#conteudo');
      // Faixa = texto + link da política + 3 botões (DESIGN §13.1): skip link → política → Aceitar.
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toHaveAttribute('href', /#cookies$/);
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toHaveAttribute('data-consent-action', 'accept');
      await action(page, 'customize').focus();
      await expect(action(page, 'customize')).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(dialog(page)).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(dialog(page)).toBeHidden();
      expect(await storedConsent(page)).toBeNull();
      await expect(banner(page)).toBeVisible();
      await action(page, 'reject').focus();
      await expect(action(page, 'reject')).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(banner(page)).toBeHidden();
      await expect(page.locator('main#conteudo')).toBeFocused();
    });

    test('CS-f os 3 botões do banner com o mesmo tamanho e peso visual (≥ 44 px)', async ({ page }) => {
      for (const width of [360, 1280]) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path);
        const styles = await page.locator('[data-consent-banner] [data-consent-action]').evaluateAll((els) =>
          els.map((el) => {
            const s = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return { a: el.getAttribute('data-consent-action'), w: Math.round(r.width), h: Math.round(r.height), fw: s.fontWeight, fs: s.fontSize, bg: s.backgroundColor, color: s.color, border: s.borderColor };
          }),
        );
        expect(styles.map((s) => s.a).sort()).toEqual(['accept', 'customize', 'reject']);
        const [first, ...rest] = styles;
        for (const s of rest) {
          expect(Math.abs(s.w - first!.w), `${width}px largura ${s.a} x ${first!.a}`).toBeLessThanOrEqual(2);
          expect(Math.abs(s.h - first!.h), `${width}px altura`).toBeLessThanOrEqual(1);
          expect([s.fw, s.fs, s.bg, s.color, s.border], `${width}px estilo ${s.a}`).toEqual([first!.fw, first!.fs, first!.bg, first!.color, first!.border]);
        }
        expect(first!.h).toBeGreaterThanOrEqual(44);
      }
    });

    test('CS-f banner não cobre o CTA do hero em 360×640', async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 640 });
      await page.goto(path);
      await expect(banner(page)).toBeVisible();
      const cta = heroCta(page);
      await expect(cta).toBeInViewport();
      const [b, c] = await Promise.all([banner(page).boundingBox(), cta.boundingBox()]);
      expect(b && c && (c.y + c.height <= b.y || c.y >= b.y + b.height), `CTA ${JSON.stringify(c)} x banner ${JSON.stringify(b)}`).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
    });

    test('CS-g texto do banner no idioma da página e link para a política', async ({ page }) => {
      await page.goto(path);
      const policy = lang === 'en' ? '/en/privacy/' : '/privacidade/';
      await expect(banner(page).locator(`a[href$="${policy}#cookies"]`)).toHaveCount(1);
      const res = await page.request.get(policy);
      expect(await res.text()).toContain('id="cookies"');
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
    });
  });
}

const CONV_SEND_TO = process.env.QA_GADS_SEND_TO ?? 'AW-934581192/EOw5CK7RiZYdEMin0r0D';
/** Dados de convidado fictícios: nada disso pode chegar ao dataLayer. */
const INVITEE = { uri: 'https://api.calendly.com/scheduled_events/QA-EVT/invitees/QA-SECRET-URI', name: 'Fulano QA Teste', email: 'qa-convidado@example.com' };
const scheduled = (invitee = INVITEE) => ({ event: 'calendly.event_scheduled', payload: { event: { uri: 'https://api.calendly.com/scheduled_events/QA-EVT' }, invitee } });

/** Abre o popup pelo CTA do hero e devolve o frame do Calendly (origem real https://calendly.com). */
async function openPopup(page: Page) {
  await heroCta(page).click();
  await expect(page.locator('iframe[src*="calendly.com"]')).toBeVisible({ timeout: 15000 });
  await expect.poll(() => page.frames().some((f) => f.url().startsWith('https://calendly.com/')), { timeout: 15000 }).toBe(true);
  return page.frames().find((f) => f.url().startsWith('https://calendly.com/'))!;
}

const conversions = async (page: Page) => (await dataLayer(page)).filter((e) => e[0] === 'event' && e[1] === 'conversion');

for (const { path } of BOOKING_PAGES) {
  test.describe(`${path} conversão (deploy 2, SPEC §9)`, () => {
    test('CS-j Medição + Publicidade: event_scheduled vindo do Calendly = UMA conversão com send_to, value 1, BRL; mesma URI não repete; nada do convidado no dataLayer', async ({ page }) => {
      needsNetwork();
      needsDeploy2();
      await page.goto(path);
      await action(page, 'accept').click();
      expect(await storedConsent(page)).toMatchObject({ medicao: true, publicidade: true });
      const calendly = await openPopup(page);
      // Mecanismo real: a mensagem parte do documento do iframe do Calendly (event.origin = https://calendly.com).
      await calendly.evaluate((msg) => window.parent.postMessage(msg, '*'), scheduled());
      await expect.poll(async () => (await conversions(page)).length, { timeout: 5000 }).toBe(1);
      await calendly.evaluate((msg) => window.parent.postMessage(msg, '*'), scheduled());
      await page.waitForTimeout(1000);
      const conv = await conversions(page);
      expect(conv).toHaveLength(1);
      expect(conv[0]![2]).toEqual({ send_to: CONV_SEND_TO, value: 1, currency: 'BRL' });
      const layer = JSON.stringify(await dataLayer(page));
      for (const secret of ['QA-SECRET-URI', 'QA-EVT', INVITEE.name, INVITEE.email, 'invitee', 'calendly.com/scheduled']) {
        expect(layer, `"${secret}" vazou para o dataLayer`).not.toContain(secret);
      }
    });

    test('CS-k só Medição: popup abre; event_scheduled NÃO gera conversão nem requisição ao Google', async ({ page }) => {
      needsNetwork();
      needsDeploy2();
      // Só a NOSSA página (frame principal); trackers do iframe do Calendly são do fornecedor (CS-report-calendly).
      const google: string[] = [];
      page.on('request', (r) => {
        if (r.frame() === page.mainFrame() && /google|doubleclick/i.test(new URL(r.url()).hostname)) google.push(r.url());
      });
      await page.goto(path);
      await action(page, 'customize').click();
      await dialog(page).locator('input[name="medicao"]').check();
      await action(page, 'save').click();
      expect(await storedConsent(page)).toMatchObject({ medicao: true, publicidade: false });
      const calendly = await openPopup(page);
      await calendly.evaluate((msg) => window.parent.postMessage(msg, '*'), scheduled());
      await page.waitForTimeout(1500);
      expect(await conversions(page)).toEqual([]);
      expect(google).toEqual([]);
    });

    test('CS-l mensagens de outra origem são ignoradas (site e origem forjada)', async ({ page }) => {
      needsNetwork();
      needsDeploy2();
      await page.goto(path);
      await action(page, 'accept').click();
      await openPopup(page);
      await page.evaluate((msg) => {
        window.postMessage(msg, '*'); // origem = o próprio site
        window.dispatchEvent(new MessageEvent('message', { data: msg, origin: 'https://calendly.com.evil.example' }));
        window.dispatchEvent(new MessageEvent('message', { data: msg, origin: 'http://calendly.com' }));
      }, scheduled({ ...INVITEE, uri: 'https://api.calendly.com/x/OUTRA' }));
      await page.waitForTimeout(1500);
      expect(await conversions(page)).toEqual([]);
    });
  });
}

/**
 * CS-o (documental, não falha): comportamento CONHECIDO e ACEITO pelo Alicerce (research/09 §6, opção A; c5fafa7).
 * Com IP do Brasil, o OneTrust do Calendly vem com todos os grupos ativos e o quadro baixa GA/GTM/Facebook antes de
 * qualquer resposta ao aviso dele. Isso só acontece depois do aceite de Medição no nosso banner e está informado no
 * modal e na política. Pendente: teste com IP real da UE antes de anúncios na UE.
 */
test('CS-o documenta: trackers do quadro do Calendly antes da resposta ao aviso dele (aceito, não bloqueia)', async ({ page }, info) => {
  needsNetwork();
  needsDeploy2();
  test.setTimeout(90000);
  const t0 = Date.now();
  const hits: string[] = [];
  let geo = '';
  page.on('request', (r) => {
    if (r.frame() === page.mainFrame()) return;
    const u = new URL(r.url());
    if (/google-analytics|googletagmanager|facebook\.(com|net)|doubleclick/.test(u.hostname)) hits.push(`+${((Date.now() - t0) / 1000).toFixed(1)}s ${u.hostname}${u.pathname}`);
  });
  page.on('response', async (r) => {
    if (r.url().includes('geolocation.onetrust.com')) geo = (await r.text().catch(() => '')).slice(0, 120);
  });
  await page.goto('/');
  await action(page, 'customize').click();
  await dialog(page).locator('input[name="medicao"]').check();
  await action(page, 'save').click();
  const calendly = await openPopup(page);
  await page.waitForTimeout(15000);
  const groups = await calendly.evaluate(() => (window as unknown as { OnetrustActiveGroups?: string }).OnetrustActiveGroups ?? null).catch(() => null);
  info.annotations.push(
    { type: 'known-behavior', description: `Calendly CMP geo=${geo} activeGroups=${groups}` },
    { type: 'known-behavior', description: `Requisições do quadro antes da resposta: ${hits.join(' | ') || '(nenhuma)'}` },
  );
  console.log(`CS-o geo=${geo} activeGroups=${groups}\n${hits.join('\n') || '(nenhuma)'}`);
  // O que NÃO pode mudar: a nossa página continua sem Google com só Medição (CS-d/CS-k).
  expect(hits.every((h) => !h.includes('tornostudio'))).toBe(true);
});

for (const path of ['/', DIAGNOSTICO.path]) test(`CS-n sem escolha (banner aberto): clique no CTA = link de saída, sem popup e sem Google: ${path}`, async ({ page }) => {
  const third = watchThirdParty(page);
  await page.goto(path);
  await expect(banner(page)).toBeVisible();
  const href = (await heroCta(page).getAttribute('href')) ?? '';
  expect(href).not.toMatch(/utm_/);
  await page.route(/calendly\.com/, (route) => route.fulfill({ status: 200, contentType: 'text/html', body: 'qa' }));
  const [nav] = await Promise.all([page.waitForEvent('framenavigated', (f) => f === page.mainFrame()), heroCta(page).click()]);
  if (/^https?:/.test(href)) expect(nav.url()).toBe(href);
  expect(third.filter((u) => !u.startsWith(href))).toEqual([]);
});

for (const p of [...PAGES, NOT_FOUND, DIAGNOSTICO]) {
  test(`CS-h link de preferências no footer: ${p.path}`, async ({ page }) => {
    await page.goto(p.path);
    await expect(page.locator('footer [data-consent-open]')).toBeVisible();
  });
}

test('CS-h sem JS: banner e botão de preferências não aparecem; CTA é link comum', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('[data-consent-banner]')).toBeHidden();
  await expect(page.locator('footer [data-consent-open]')).toBeHidden();
  await expect(page.locator('#inicio a').first()).toHaveAttribute('href', /^https?:\/\/|#/);
  await ctx.close();
});

/**
 * Lista REAL de cookies para a tabela da política (SPEC §6): Aceitar tudo + abrir o popup do Calendly.
 * Gera test-results/qa-cookies.json e anexa ao relatório. Rodar só sob demanda: QA_COOKIE_REPORT=1 + QA_BASE_URL.
 */
test('CS-report lista real de cookies após Aceitar (deploy 1: Google Ads; deploy 2: + popup do Calendly)', async ({ page, context }, info) => {
  test.skip(!online || !process.env.QA_COOKIE_REPORT, 'sob demanda: QA_COOKIE_REPORT=1 com QA_BASE_URL');
  await page.goto(`/?${utmQuery}`);
  await action(page, 'accept').click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  if (deploy2) await openPopup(page).then(() => page.waitForTimeout(5000));
  await info.attach('qa-cookies.json', { body: await cookieReport(page, context), contentType: 'application/json' });
});

test('CS-report-calendly lista real de cookies só com Medição + popup do Calendly (sessão limpa)', async ({ page, context }, info) => {
  test.skip(!online || !process.env.QA_COOKIE_REPORT || !deploy2, 'sob demanda: QA_COOKIE_REPORT=1 QA_DEPLOY2=1 com QA_BASE_URL');
  const iframeHosts = new Set<string>();
  page.on('request', (r) => {
    if (r.frame() !== page.mainFrame()) iframeHosts.add(new URL(r.url()).hostname);
  });
  await page.goto('/');
  await action(page, 'customize').click();
  await dialog(page).locator('input[name="medicao"]').check();
  await action(page, 'save').click();
  const calendly = await openPopup(page);
  await calendly.waitForLoadState('networkidle').catch(() => undefined);
  await page.waitForTimeout(6000);
  await info.attach('qa-cookies-calendly.json', { body: await cookieReport(page, context), contentType: 'application/json' });
  console.log('IFRAME_HOSTS', JSON.stringify([...iframeHosts].sort()));
});

async function cookieReport(page: Page, context: BrowserContext): Promise<string> {
  const now = Date.now() / 1000;
  const human = (s: number) => (s < 0 ? 'sessão' : s >= 86400 * 300 ? `${Math.round((s / (86400 * 365)) * 10) / 10} ano(s)` : s >= 86400 ? `${Math.round(s / 86400)} dia(s)` : s >= 3600 ? `${Math.round(s / 3600)} hora(s)` : `${Math.round(s / 60)} min`);
  const rows = (await context.cookies())
    .map((c) => ({ name: c.name, domain: c.domain, duration: human(c.expires < 0 ? -1 : c.expires - now), httpOnly: c.httpOnly, secure: c.secure, sameSite: c.sameSite }))
    .sort((a, b) => a.domain.localeCompare(b.domain) || a.name.localeCompare(b.name));
  const storage = await page.evaluate(() => Object.keys(localStorage).concat(Object.keys(sessionStorage).map((k) => `session:${k}`)));
  const body = JSON.stringify({ url: page.url(), cookies: rows, firstPartyStorage: storage }, null, 2);
  console.log(body);
  return body;
}
