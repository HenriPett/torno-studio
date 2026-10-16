/**
 * Contador de visitas sem cookie da /diagnostico/ (docs/infra/CONTADOR-DIAGNOSTICO.md, B3).
 *
 * Responde com a página normal (context.next()) e, em segundo plano (context.waitUntil, sem bloquear a
 * resposta), soma +1 ao total do dia (America/Sao_Paulo, chave AAAA-MM-DD) no Netlify Blobs:
 * store "visitas-diagnostico", valor { n }. Nada além do total é gravado: IP, UA, referer e query string
 * ficam só em memória durante a requisição. Sem cookie e sem header novo na resposta.
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
const MAX_ATTEMPTS = 5;

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
async function increment(key: string): Promise<void> {
  const store = getStore({ name: STORE, consistency: 'strong' });
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
  if (shouldCount(request, context.deploy.context)) {
    const key = dayKey();
    context.waitUntil(
      increment(key).catch((error: unknown) => {
        // Falha não derruba a página: só o log da função.
        console.error('[count-diagnostico]', key, error instanceof Error ? error.message : error);
      }),
    );
  }
  return context.next();
};

export const config = { path: '/diagnostico/' };
