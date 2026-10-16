/**
 * Consentimento, Google Ads e Calendly (docs/consent/SPEC.md §3 e §9). Regra-mãe: nada de terceiros carrega
 * nem grava antes do aceite (Consent Mode básico). O default "denied" é o inline no <head> do Base.astro.
 *
 * - Publicidade: gtag.js do Ads (sem personalização: regra do Alicerce) e o evento de conversão.
 * - Medição: popup do Calendly sob demanda e repasse de UTM. analytics_storage segue denied (não há GA4).
 * - Conversão "Diagnóstico agendado": só com as duas (o popup exige Medição; o envio exige Publicidade).
 *
 * Interface para a UI do banner (src/scripts/consent-ui.ts, do Ritmo):
 * - getConsent(): escolha válida salva, ou null (sem registro, vencido ou de outra versão -> mostrar a faixa);
 * - setConsent(c): grava e aplica; se for revogação, apaga o que o Google gravou e recarrega a página;
 * - init(): aplica o registro salvo, captura UTM e liga os CTAs [data-booking-cta]. Idempotente;
 * - CONSENT_OPEN_EVENT: despachado em document por window.tsConsent.open(); a UI abre o 2º nível.
 */

import { GA4_BLOCKED_IDS, GADS_CONV_LABEL, GADS_ID } from '../config/gads';

export interface Consent {
  medicao: boolean;
  publicidade: boolean;
}

interface StoredConsent extends Consent {
  v: number;
  ts: number;
}

type Utm = Partial<Record<'utmSource' | 'utmMedium' | 'utmCampaign' | 'utmContent' | 'utmTerm', string>>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    Calendly?: { initPopupWidget: (options: { url: string; utm?: Utm }) => void };
    tsConsent?: { open: () => void; get: () => Consent | null; set: (c: Consent) => void };
  }
}

export const CONSENT_OPEN_EVENT = 'ts-consent:open';

/** v2: entrou a categoria Medição (deploy 2). Registros v1 deixam de valer e a faixa volta a aparecer. */
const CONSENT_VERSION = 2;
const STORE_KEY = 'ts-consent';
const UTM_KEY = 'ts-utm';
const MAX_AGE_MS = 183 * 24 * 60 * 60 * 1000; // ~6 meses

const GTAG_SRC = 'https://www.googletagmanager.com/gtag/js?id=';
const CALENDLY_JS = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css';
const CALENDLY_ORIGIN = 'https://calendly.com';

const UTM_PARAMS = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_content: 'utmContent',
  utm_term: 'utmTerm',
} as const;

// ---------- store ----------

function read(): Consent | null {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) ?? 'null') as Partial<StoredConsent> | null;
    if (
      !raw ||
      raw.v !== CONSENT_VERSION ||
      typeof raw.ts !== 'number' ||
      Date.now() - raw.ts > MAX_AGE_MS ||
      typeof raw.medicao !== 'boolean' ||
      typeof raw.publicidade !== 'boolean'
    ) {
      return null;
    }
    return { medicao: raw.medicao, publicidade: raw.publicidade };
  } catch {
    return null;
  }
}

function write(c: Consent): void {
  const record: StoredConsent = { v: CONSENT_VERSION, ts: Date.now(), medicao: c.medicao, publicidade: c.publicidade };
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(record));
  } catch {
    // Storage bloqueado: a escolha vale só nesta página.
  }
}

let current: Consent | null = null;

export function getConsent(): Consent | null {
  return current;
}

// ---------- Google (Consent Mode + gtag) ----------

/**
 * ad_personalization fica SEMPRE denied (sem remarketing; condição do Alicerce) e analytics_storage também
 * (não há GA4; a Medição só controla Calendly e UTM).
 */
function updateGoogleConsent(c: Consent): void {
  const ads = c.publicidade ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
}

let gtagLoaded = false;

function loadGtag(id: string): void {
  if (gtagLoaded) return;
  gtagLoaded = true;
  // Opt-out oficial do GA4 para destinos combinados com a tag do Ads: tem de valer ANTES do gtag.js.
  const flags = window as unknown as Record<string, boolean>;
  for (const ga4 of GA4_BLOCKED_IDS) flags[`ga-disable-${ga4}`] = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = GTAG_SRC + encodeURIComponent(id);
  document.head.append(script);
  window.gtag('js', new Date());
  window.gtag('config', id, { allow_ad_personalization_signals: false });
}

const GOOGLE_KEY = /^(_gcl_|_ga)/;

/**
 * Apaga o que o Google gravou em 1ª parte: cookies _gcl_* e _ga* no host e nos domínios-pai
 * (ex.: .tornostudio.com) e as mesmas chaves em localStorage/sessionStorage (ex.: _gcl_ls).
 */
function clearGoogleStorage(): void {
  for (const storage of [localStorage, sessionStorage]) {
    try {
      for (const key of Object.keys(storage)) if (GOOGLE_KEY.test(key)) storage.removeItem(key);
    } catch {
      // Storage bloqueado: nada a apagar.
    }
  }
  const labels = location.hostname.split('.');
  const domains = [''];
  for (let i = 0; i < labels.length - 1; i++) domains.push(`; domain=.${labels.slice(i).join('.')}`);
  for (const pair of document.cookie.split(';')) {
    const name = pair.split('=')[0]?.trim() ?? '';
    if (!GOOGLE_KEY.test(name)) continue;
    for (const domain of domains) document.cookie = `${name}=; max-age=0; path=/${domain}`;
  }
}

// ---------- UTM (só com Medição) ----------

function utmFromLocation(): Utm {
  const params = new URLSearchParams(location.search);
  const utm: Utm = {};
  for (const [param, key] of Object.entries(UTM_PARAMS)) {
    const value = params.get(param);
    if (value) utm[key] = value.slice(0, 100);
  }
  if (Object.keys(utm).length) return utm;
  // Sem UTM: origem pelo domínio do referrer externo. Nunca gclid nem outro identificador individual.
  try {
    const ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : '';
    if (ref && ref !== location.hostname.replace(/^www\./, '')) return { utmSource: ref, utmMedium: 'referral' };
  } catch {
    // referrer inválido: sem UTM
  }
  return {};
}

/** UTM da chegada: em memória até haver Medição; depois também em sessionStorage (sobrevive à navegação). */
let arrivalUtm: Utm = {};

function storedUtm(): Utm {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_KEY) ?? '{}') as Utm;
  } catch {
    return {};
  }
}

function persistUtm(): void {
  if (!Object.keys(arrivalUtm).length) return;
  try {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(arrivalUtm));
  } catch {
    // ok: fica só em memória
  }
}

function forgetUtm(): void {
  try {
    sessionStorage.removeItem(UTM_KEY);
  } catch {
    // ok
  }
}

// ---------- Calendly (só com Medição) ----------

let calendlyReady: Promise<void> | null = null;

function loadCalendly(): Promise<void> {
  calendlyReady ??= new Promise<void>((resolve, reject) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = CALENDLY_CSS;
    document.head.append(css);
    const script = document.createElement('script');
    script.src = CALENDLY_JS;
    script.async = true;
    script.onload = () => (window.Calendly ? resolve() : reject(new Error('Calendly indisponível')));
    script.onerror = () => reject(new Error('Calendly não carregou'));
    document.head.append(script);
  }).catch((error: unknown) => {
    calendlyReady = null;
    throw error;
  });
  return calendlyReady;
}

let listening = false;
const scheduled = new Set<string>();

/** Conversão "Diagnóstico agendado" (SPEC §9). A URI do convidado só deduplica: nunca sai do navegador. */
function onCalendlyMessage(event: MessageEvent): void {
  if (event.origin !== CALENDLY_ORIGIN) return;
  const data = event.data as { event?: string; payload?: { invitee?: { uri?: string } } } | null;
  if (data?.event !== 'calendly.event_scheduled') return;
  const key = data.payload?.invitee?.uri ?? 'sem-uri';
  if (scheduled.has(key)) return;
  scheduled.add(key);
  if (current?.publicidade && GADS_ID && GADS_CONV_LABEL) {
    window.gtag('event', 'conversion', { send_to: `${GADS_ID}/${GADS_CONV_LABEL}`, value: 1.0, currency: 'BRL' });
  }
}

async function openCalendly(url: string): Promise<void> {
  await loadCalendly();
  if (!listening) {
    window.addEventListener('message', onCalendlyMessage);
    listening = true;
  }
  const utm = { ...storedUtm(), ...arrivalUtm };
  window.Calendly?.initPopupWidget(Object.keys(utm).length ? { url, utm } : { url });
}

const isCalendlyLink = (link: HTMLAnchorElement) => {
  try {
    const host = new URL(link.href).hostname;
    return host === 'calendly.com' || host.endsWith('.calendly.com');
  } catch {
    return false;
  }
};

function onBookingClick(event: MouseEvent): void {
  if (!current?.medicao) return;
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[data-booking-cta]');
  if (!link || !isCalendlyLink(link)) return;
  event.preventDefault();
  // Se o Calendly falhar (rede, bloqueador), segue o link de saída: o CTA nunca morre.
  openCalendly(link.href).catch(() => location.assign(link.href));
}

// ---------- aplicar ----------

function apply(c: Consent): void {
  updateGoogleConsent(c);
  if (c.publicidade && GADS_ID) loadGtag(GADS_ID);
  if (c.medicao) persistUtm();
}

export function setConsent(c: Consent): void {
  const previous = current;
  const next: Consent = { medicao: Boolean(c.medicao), publicidade: Boolean(c.publicidade) };
  current = next;
  write(next);
  const lostAds = Boolean(previous?.publicidade && !next.publicidade);
  const lostMeasurement = Boolean(previous?.medicao && !next.medicao);
  if (lostAds || lostMeasurement) {
    updateGoogleConsent(next);
    if (lostAds) clearGoogleStorage();
    if (lostMeasurement) forgetUtm();
    // Recarrega para descarregar gtag.js/Calendly já carregados.
    location.reload();
    return;
  }
  apply(next);
}

let initialized = false;

export function init(): void {
  if (initialized) return;
  initialized = true;
  arrivalUtm = utmFromLocation();
  current = read();
  if (current) apply(current);
  document.addEventListener('click', onBookingClick);
  window.tsConsent = {
    open: () => document.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT)),
    get: getConsent,
    set: setConsent,
  };
}
