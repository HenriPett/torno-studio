import type { Page } from '@playwright/test';

/** Gate da fase 4 (docs/qa/CHECKLIST.md). Rotas espelham src/config/routes.mjs. */
export type Lang = 'pt-BR' | 'en';

export interface QaPage {
  path: string;
  lang: Lang;
  kind: 'home' | 'privacy' | 'notFound';
}

export const PAGES: QaPage[] = [
  { path: '/', lang: 'pt-BR', kind: 'home' },
  { path: '/en/', lang: 'en', kind: 'home' },
  { path: '/privacidade/', lang: 'pt-BR', kind: 'privacy' },
  { path: '/en/privacy/', lang: 'en', kind: 'privacy' },
];

/** 404 é bilíngue; auditada como PT (o conteúdo EN dela também é varrido). */
export const NOT_FOUND: QaPage = { path: '/qa-nao-existe/', lang: 'pt-BR', kind: 'notFound' };

export const HOMES = PAGES.filter((p) => p.kind === 'home');

/** Landing de campanha (docs/landing/DIAGNOSTICO-SPEC.md): só PT, noindex,follow, fora do sitemap. Fora de PAGES de propósito. */
export const DIAGNOSTICO = { path: '/diagnostico/', lang: 'pt-BR' as Lang };

/** Rotas com CTA de agenda e banner: os casos CS rodam em todas. */
export const BOOKING_PAGES = [...PAGES.filter((p) => p.kind === 'home'), DIAGNOSTICO];

export const WIDTHS = [320, 360, 768, 1280, 1920] as const;

export type Theme = 'light' | 'dark';

/** Aplica tema pelo sistema (emulateMedia) e pelo toggle (localStorage), antes do primeiro paint. */
export async function gotoWithTheme(page: Page, path: string, theme: Theme): Promise<void> {
  await page.emulateMedia({ colorScheme: theme });
  await page.addInitScript((t) => {
    try {
      localStorage.setItem('theme', t);
    } catch {
      /* sem storage: vale o prefers-color-scheme emulado */
    }
  }, theme);
  await page.goto(path);
}

/** Abre todos os <details> para que o conteúdo dobrado entre na auditoria (axe, overflow, texto). */
export async function openAllDetails(page: Page): Promise<void> {
  await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
}

/** Espaços normais, NBSP e narrow NBSP viram um espaço só. */
export const norm = (text: string): string => text.replace(/[\s  ]+/g, ' ').trim();

/**
 * Todo texto que um humano, leitor de tela ou crawler pode ler: textContent do <body> (inclui
 * conteúdo oculto/dobrado), <title>, metas e atributos de texto. Exclui href/src de propósito:
 * a URL da MundoLogística contém o nome da empresa e é permitida (docs/copy §5).
 */
export async function readableText(page: Page): Promise<string> {
  return page.evaluate(() => {
    const parts: string[] = [document.title];
    for (const meta of document.querySelectorAll('meta[content]')) parts.push(meta.getAttribute('content') ?? '');
    const body = document.body.cloneNode(true) as HTMLElement;
    body.querySelectorAll('script, style, noscript').forEach((el) => el.remove());
    parts.push(body.textContent ?? '');
    for (const el of document.querySelectorAll('[alt], [title], [aria-label], [aria-description], [placeholder]')) {
      for (const attr of ['alt', 'title', 'aria-label', 'aria-description', 'placeholder']) {
        const value = el.getAttribute(attr);
        if (value) parts.push(value);
      }
    }
    return parts.join('\n');
  }).then(norm);
}

/** Palavra inteira com acentos (\b não entende "nós"). */
export const word = (w: string, flags = 'iu'): RegExp => new RegExp(`(?<![\\p{L}\\p{N}])${w}(?![\\p{L}\\p{N}])`, flags);

/** Trecho com contexto para a mensagem de erro. */
export function hits(text: string, re: RegExp): string[] {
  const global = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
  return [...text.matchAll(global)].map((m) => `…${text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40)}…`);
}

/** Elementos mais largos que o viewport (para explicar um scroll horizontal). */
export async function overflowingElements(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out: string[] = [];
    for (const el of document.body.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) {
        const id = el.id ? `#${el.id}` : '';
        const cls = typeof el.className === 'string' && el.className ? `.${el.className.trim().split(/\s+/).join('.')}` : '';
        out.push(`${el.tagName.toLowerCase()}${id}${cls} [${Math.round(r.left)}..${Math.round(r.right)} > ${vw}]`);
      }
    }
    return out.slice(0, 15);
  });
}
