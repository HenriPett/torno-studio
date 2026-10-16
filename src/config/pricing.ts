/**
 * Escada de valor com preços públicos.
 * Fontes: plano-de-negocios §5.1, research/03 §4 e decisões P1–P3/P6 (PLANO-DEV §5.3).
 * Números, prazos e regras de pagamento vivem só aqui. Nomes e descrições ficam no copy (SiteCopy.ladder).
 * Mudar qualquer valor exige decisão registrada no PLANO-DEV.
 */

import type { Locale } from './routes.mjs';

export type Currency = 'BRL' | 'USD';

export type Price =
  | { kind: 'free' }
  | { kind: 'fixed'; amount: number }
  | { kind: 'from'; amount: number }
  | { kind: 'custom' };

export type StepId = 'diagnostic' | 'sprint' | 'productionReady' | 'mvpCore' | 'mvpPlus' | 'evolution';
export type EvolutionPlanId = 'essential' | 'evolution' | 'partner';

/** Marcos de pagamento; os rótulos ficam em SiteCopy.ladder.milestones. */
export type MilestoneId = 'upfront' | 'start' | 'delivery' | 'signature' | 'stagingBeta' | 'goLive' | 'monthlyUpfront';

export interface Installment {
  milestone: MilestoneId;
  percent: number;
}

export interface Weeks {
  min: number;
  max: number;
}

export interface LadderStep {
  id: StepId;
  price: Price;
  duration: Weeks | null;
  /** Pagamento por degrau (P6). Vazio = sem cobrança. Soma sempre 100. */
  payment: Installment[];
  /** Garantia de bugs após o go-live, em dias. */
  bugWarrantyDays?: number;
}

export interface EvolutionPlan {
  id: EvolutionPlanId;
  monthly: number;
  /** Horas-teto por mês (aproximadas). */
  hoursCap: number;
}

export interface Ladder {
  currency: Currency;
  steps: LadderStep[];
  sprintCredit: { percent: number; withinDays: number };
  evolution: {
    plans: EvolutionPlan[];
    minimumMonths: number;
    hoursRollOver: boolean;
    overagePerHour: number;
  };
}

const sprintPayment: Installment[] = [{ milestone: 'upfront', percent: 100 }];
const productionReadyPayment: Installment[] = [
  { milestone: 'start', percent: 50 },
  { milestone: 'delivery', percent: 50 },
];
const mvpPayment: Installment[] = [
  { milestone: 'signature', percent: 40 },
  { milestone: 'stagingBeta', percent: 30 },
  { milestone: 'goLive', percent: 30 },
];
const evolutionPayment: Installment[] = [{ milestone: 'monthlyUpfront', percent: 100 }];

const shared = {
  sprintCredit: { percent: 100, withinDays: 30 },
  minimumMonths: 3,
  hoursRollOver: false,
} as const;

export const pricing: Record<Locale, Ladder> = {
  'pt-BR': {
    currency: 'BRL',
    steps: [
      { id: 'diagnostic', price: { kind: 'free' }, duration: null, payment: [] },
      { id: 'sprint', price: { kind: 'fixed', amount: 6_000 }, duration: { min: 2, max: 2 }, payment: sprintPayment },
      { id: 'productionReady', price: { kind: 'fixed', amount: 18_000 }, duration: { min: 2, max: 3 }, payment: productionReadyPayment },
      { id: 'mvpCore', price: { kind: 'fixed', amount: 42_000 }, duration: { min: 6, max: 7 }, payment: mvpPayment, bugWarrantyDays: 60 },
      { id: 'mvpPlus', price: { kind: 'fixed', amount: 65_000 }, duration: { min: 8, max: 10 }, payment: mvpPayment, bugWarrantyDays: 60 },
      { id: 'evolution', price: { kind: 'from', amount: 4_000 }, duration: null, payment: evolutionPayment },
    ],
    sprintCredit: shared.sprintCredit,
    evolution: {
      plans: [
        { id: 'essential', monthly: 4_000, hoursCap: 10 },
        { id: 'evolution', monthly: 9_000, hoursCap: 25 },
        { id: 'partner', monthly: 16_000, hoursCap: 45 },
      ],
      minimumMonths: shared.minimumMonths,
      hoursRollOver: shared.hoursRollOver,
      overagePerHour: 400,
    },
  },
  en: {
    currency: 'USD',
    steps: [
      { id: 'diagnostic', price: { kind: 'free' }, duration: null, payment: [] },
      { id: 'sprint', price: { kind: 'fixed', amount: 3_000 }, duration: { min: 2, max: 2 }, payment: sprintPayment },
      { id: 'productionReady', price: { kind: 'fixed', amount: 7_000 }, duration: { min: 2, max: 3 }, payment: productionReadyPayment },
      // P1: "from US$ 15,000"; o piso de US$ 12k fica só na conversa comercial.
      { id: 'mvpCore', price: { kind: 'from', amount: 15_000 }, duration: { min: 6, max: 7 }, payment: mvpPayment, bugWarrantyDays: 60 },
      // P2: "Custom quote"; não ancorar US$ 30k em público.
      { id: 'mvpPlus', price: { kind: 'custom' }, duration: { min: 8, max: 10 }, payment: mvpPayment, bugWarrantyDays: 60 },
      { id: 'evolution', price: { kind: 'from', amount: 1_500 }, duration: null, payment: evolutionPayment },
    ],
    sprintCredit: shared.sprintCredit,
    evolution: {
      plans: [
        { id: 'essential', monthly: 1_500, hoursCap: 10 },
        { id: 'evolution', monthly: 4_000, hoursCap: 25 },
        { id: 'partner', monthly: 7_000, hoursCap: 45 },
      ],
      minimumMonths: shared.minimumMonths,
      hoursRollOver: shared.hoursRollOver,
      overagePerHour: 160,
    },
  },
};

const CURRENCY_SYMBOL: Record<Currency, string> = { BRL: 'R$', USD: 'US$' };

/** "R$ 42.000" / "US$ 15,000": símbolo fixo + número no formato do idioma (Intl.NumberFormat). */
export function formatMoney(amount: number, locale: Locale): string {
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(amount);
  return `${CURRENCY_SYMBOL[pricing[locale].currency]} ${number}`;
}

export interface PriceLabels {
  /** "grátis" / "free" */
  free: string;
  /** "a partir de {price}" / "from {price}" */
  from: string;
  /** "Sob consulta" / "Custom quote" */
  custom: string;
}

export function formatPrice(price: Price, locale: Locale, labels: PriceLabels): string {
  switch (price.kind) {
    case 'free':
      return labels.free;
    case 'fixed':
      return formatMoney(price.amount, locale);
    case 'from':
      return labels.from.replace('{price}', formatMoney(price.amount, locale));
    case 'custom':
      return labels.custom;
  }
}
