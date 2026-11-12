/**
 * Contador de visitas sem cookie da /diagnostico/ e das landings de setor /para/<slug>/
 * (docs/infra/CONTADOR-DIAGNOSTICO.md, B3; estratégia 2026-11 §7.3).
 *
 * Responde com a página normal (context.next()) e, se ela respondeu 200, soma +1 em segundo plano
 * (context.waitUntil, sem bloquear a resposta) no Netlify Blobs, com o dia em America/Sao_Paulo:
 *  - /diagnostico/  -> store "visitas-diagnostico", chave AAAA-MM-DD;
 *  - /para/<slug>/  -> store "visitas-setores", chave AAAA-MM-DD/<slug> (só os slugs de SECTOR_SLUGS).
 * Valor { n }. Nada além do total é gravado: IP, UA, referer e query string ficam só em memória durante a
 * requisição. Sem cookie e sem header novo na resposta.
 *
 * APIs: https://docs.netlify.com/build/edge-functions/api/ (context.next, context.waitUntil, context.deploy)
 * e https://docs.netlify.com/build/data-and-storage/netlify-blobs/ (getWithMetadata/etag, onlyIfMatch/onlyIfNew).
 */

import { getStore } from '@netlify/blobs';

// Tipos mínimos do runtime da Netlify (o pacote @netlify/edge-functions só traria tipos).
interface Context {
  next: () => Promise<Response>;
  waitUntil: (promise: Promise<unknown>) => void;
  deploy: { context: string };
}

export const STORE = 'visitas-diagnostico';
export const SECTOR_STORE = 'visitas-setores';
const MAX_ATTEMPTS = 5;

/**
 * Landings de setor existentes (src/pages/para/*.astro). Lista fixa aqui porque esta função não é pública
 * nem renderizada; um slug fora dela (ou uma resposta que não seja 200) não grava nada.
 */
export const SECTOR_SLUGS = ['textil', 'alimentos', 'plasticos', 'maquinas', 'metalmecanica', 'moveis', 'eletroeletronicos', 'autopecas'] as const;

/** Onde contar a visita a este caminho, ou null se o caminho não é contado. */
export function counterTarget(pathname: string): { store: string; suffix: string } | null {
  if (pathname === '/diagnostico/') return { store: STORE, suffix: '' };
  const slug = /^\/para\/([a-z-]+)\/$/.exec(pathname)?.[1];
  if (slug && (SECTOR_SLUGS as readonly string[]).includes(slug)) return { store: SECTOR_STORE, suffix: `/${slug}` };
  return null;
}

/** Robôs, pré-visualizações e ferramentas de medição não contam. */
const BOT_UA =
  /bot|crawl|spider|slurp|preview|lighthouse|headlesschrome|pagespeed|adsbot|mediapartners|facebookexternalhit|embedly|whatsapp|telegram|discord|skype|curl|wget|python|node-fetch|axios|go-http|java\/|httpclient|monitor|uptime|pingdom|gtmetrix|playwright|puppeteer|phantom/i;

/**
 * Só visitas reais à página: navegação de documento por navegador, em produção, sem prefetch e sem robô.
 *
 * Exige Sec-Fetch-Dest: document + Sec-Fetch-Mode: navigate porque a borda da Netlify entrega HEAD à função
 * como GET (B9; https://answers.netlify.com/t/head-request-conversion/106508), então request.method não
 * basta. Navegadores mandam esses headers desde Chrome/Edge 80, Firefox 90 e Safari 16.4; os mais antigos
 * deixam de contar (subcontagem pequena, aceita), e curl/HEAD/scripts nunca contam.
 */
export function shouldCount(request: Request, deployContext: string): boolean {
  if (deployContext !== 'production' || request.method !== 'GET') return false;
  const headers = request.headers;
  if (headers.get('sec-fetch-dest') !== 'document' || headers.get('sec-fetch-mode') !== 'navigate') return false;
  if (!(headers.get('accept') ?? '').includes('text/html')) return false;
  const purpose = `${headers.get('sec-purpose') ?? ''} ${headers.get('purpose') ?? ''}`;
  if (/prefetch|prerender/i.test(purpose)) return false;
  const ua = headers.get('user-agent') ?? '';
  return ua !== '' && !BOT_UA.test(ua);
}

/** Dia no fuso de São Paulo (UTC−3), AAAA-MM-DD. */
export function dayKey(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(now);
}

/** +1 com escrita condicional (ETag): incremento concorrente nunca se perde; tenta de novo se perder a corrida. */
async function increment(storeName: string, key: string): Promise<void> {
  const store = getStore({ name: storeName, consistency: 'strong' });
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const current = await store.getWithMetadata(key, { type: 'json', consistency: 'strong' });
    if (current && !current.etag) throw new Error('entrada sem ETag');
    const { modified } =
      current && current.etag
        ? await store.setJSON(key, { n: Number((current.data as { n?: number } | null)?.n ?? 0) + 1 }, { onlyIfMatch: current.etag })
        : await store.setJSON(key, { n: 1 }, { onlyIfNew: true });
    if (modified) return;
    await new Promise((resolve) => setTimeout(resolve, 20 * (attempt + 1) + Math.random() * 20));
  }
  throw new Error(`sem sucesso após ${MAX_ATTEMPTS} tentativas`);
}

export default async (request: Request, context: Context): Promise<Response> => {
  const response = await context.next();
  const target = counterTarget(new URL(request.url).pathname);
  // Só página que existe (200): 404, redirect e erro não contam.
  if (target && response.status === 200 && shouldCount(request, context.deploy.context)) {
    const key = `${dayKey()}${target.suffix}`;
    context.waitUntil(
      increment(target.store, key).catch((error: unknown) => {
        // Falha não derruba a página: só o log da função.
        console.error('[count-diagnostico]', target.store, key, error instanceof Error ? error.message : error);
      }),
    );
  }
  return response;
};

export const config = { path: ['/diagnostico/', '/para/*'] };
