/**
 * Contrato do copy compartilhado (pt-BR.ts e en.ts exportam `SiteCopy`); faltar uma chave quebra `astro check`.
 * O conteúdo das páginas institucionais novas (home, como trabalhamos, sobre, contato) fica em
 * src/content/home.ts e src/content/institucional.ts. Aqui ficam: meta das páginas mantidas, OG, rótulos
 * comuns, consentimento, privacidade, a landing /diagnostico/ e a 404.
 *
 * Convenções (docs/estrategia-2026-11-torno-industria.md §5 e §9):
 * - Texto puro, sem HTML nem markdown. Links são campos próprios ({ label, url }), não embutidos.
 * - A marca nunca é escrita à mão: use o token `{brand}` (trocado por SITE_BRAND).
 * - Sem preço público (estratégia §4.3): nada de R$/US$ no copy.
 * - Voz da marca em "nós"/"a Torno". Consentimento e privacidade mantêm o texto revisado à parte.
 */

import type { Locale } from '../config/routes.mjs';

export interface PageMeta {
  /** <title>, ≤ 60. Pode usar {brand}. */
  title: string;
  /** meta description, ≤ 155. */
  description: string;
}

export interface TitledItem {
  title: string;
  body: string;
}

export interface ConsentCategoryCopy {
  /** ≤ 24 */
  name: string;
  /** ≤ 320 (DESIGN §13.5) */
  description: string;
  /** Fornecedores com link para a política deles (texto do idioma, não config). */
  vendors: ExternalLink[];
}

export interface ExternalLink {
  label: string;
  url: string;
}

export interface CookieRow {
  name: string;
  vendor: string;
  purpose: string;
  category: string;
  duration: string;
}

/** Texto seguido de link: "{lead} <a>{label}</a>". */
export interface LeadLink {
  lead: string;
  label: string;
}

/** Bloco de FAQ (pergunta e resposta; parágrafos da resposta separados por linha em branco). */
export interface FaqEntry {
  q: string;
  a: string;
}

/** Etapa de processo com ordem real (ds/Steps). */
export interface StepEntry {
  title: string;
  body: string;
  meta?: string;
}

/** Card com título e texto (ds/FeatureGrid). */
export interface FeatureEntry {
  title: string;
  body: string;
  eyebrow?: string;
}

/**
 * Landing de campanha /diagnostico/ (Google Ads; só PT; noindex, follow). Objetivo único: agendar o diagnóstico.
 * O CTA aparece no header, no hero e no final. Sem preço. Provas só com fonte (estratégia §5).
 */
export interface DiagnosticoCopy {
  meta: PageMeta;
  hero: { eyebrow: string; title: string; lead: string; cta: string; facts: string[] };
  deliverables: { eyebrow: string; title: string; lead: string; items: FeatureEntry[] };
  steps: { eyebrow: string; title: string; lead: string; items: StepEntry[] };
  proofs: {
    eyebrow: string;
    title: string;
    lead: string;
    stats: { value: string; label: string; source: { label: string; href: string } }[];
    items: FeatureEntry[];
    note: string;
  };
  faq: { title: string; items: FaqEntry[] };
  finalCta: { title: string; text: string };
}

export interface SiteCopy {
  locale: Locale;

  meta: {
    home: PageMeta;
    privacy: PageMeta;
    notFound: PageMeta;
  };

  /** Open Graph da home. As outras páginas usam o próprio PageMeta. */
  og: {
    title: string;
    description: string;
    imageAlt: string;
    /** Texto da OG image 1200×630 (Timbre): [pequena, grande, apoio]. Pode usar {brand}. */
    imageLines: [string, string, string];
  };

  common: {
    skipToContent: string;
    /** Rótulo curto do outro idioma no seletor ("EN" no PT). */
    languageSwitchShort: string;
    /** Rótulo acessível do seletor ("Mudar idioma para inglês"). */
    languageSwitchLabel: string;
    themeToggleLabel: string;
    /** CTA do header: desktop ≤ 22, mobile ≤ 10. */
    bookingCtaHeader: string;
    bookingCtaHeaderMobile: string;
  };

  /**
   * Banner de consentimento (docs/consent/SPEC.md §4). Renderizado só com JS; sem JS nada de terceiros carrega.
   * As 3 ações do 1º nível têm o mesmo peso visual: accept/reject/customize ≤ 14 cada.
   */
  consent: {
    /** aria-label do 1º nível (role="region"). */
    regionLabel: string;
    /** ≤ 180, 1ª pessoa, sem link embutido. */
    text: string;
    /** ≤ 30, rótulo do link para a política (#cookies da privacidade). */
    policyLink: string;
    accept: string;
    reject: string;
    customize: string;
    dialog: {
      /** ≤ 40 */
      title: string;
      /** ≤ 200 */
      intro: string;
      /** ≤ 16, "Sempre ativo" (Necessários). */
      alwaysOn: string;
      /** Necessários, Medição (popup do Calendly e UTM) e Publicidade (SPEC §2 e §9). */
      categories: Record<'necessary' | 'measurement' | 'advertising', ConsentCategoryCopy>;
      /** ≤ 20 cada. */
      save: string;
      acceptAll: string;
      rejectAll: string;
      /** aria-label do botão de fechar. */
      close: string;
    };
    /** ≤ 24, link do footer que reabre o 2º nível ("Preferências de cookies"). */
    footerLink: string;
    /** ≤ 40, anúncio aria-live depois da escolha (DESIGN §13.5). */
    saved: string;
  };

  privacy: {
    title: string;
    updatedLabel: string;
    /** Data da última revisão do texto, ISO (AAAA-MM-DD). Mude quando o texto mudar, não a cada deploy. */
    updated: string;
    sections: TitledItem[];
    contact: {
      title: string;
      /** "Controlador" — a linha só aparece com PUBLIC_LEGAL_NAME e PUBLIC_LEGAL_ID. */
      controllerLabel: string;
      /** Sem PUBLIC_CONTACT_EMAIL (só preview/dev; produção exige o e-mail): canal de contato pelo LinkedIn. */
      linkedinFallback: LeadLink;
    };
    backLink: string;
    /** Tabela de cookies (âncora #cookies). Linhas = lista real extraída do navegador pelo Afinador. */
    cookies: {
      title: string;
      /** ≤ 200 */
      intro: string;
      caption: string;
      headers: Record<keyof CookieRow, string>;
      rows: CookieRow[];
    };
  };

  /** Só no PT (a landing não existe em EN): no en.ts, null. */
  diagnostico: DiagnosticoCopy | null;

  /** A 404 é bilíngue: mostra o bloco de cada idioma. */
  notFound: {
    title: string;
    body: string;
    homeLink: string;
  };
}
