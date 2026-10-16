/**
 * Contrato do copy (PLANO-DEV §2.2; estrutura de docs/copy/*.md). pt-BR.ts e en.ts exportam `SiteCopy`;
 * faltar uma chave quebra `astro check` e, portanto, `npm run build`.
 *
 * Convenções:
 * - Texto puro, sem HTML nem markdown. Links são campos próprios ({ label, url }), não embutidos.
 * - A marca nunca é escrita à mão: use o token `{brand}` (trocado por SITE_BRAND).
 * - Valores em dinheiro NUNCA entram no copy: vêm de src/config/pricing.ts (formatPrice/formatMoney).
 *   Onde o texto precisa de um valor, use o token indicado no campo (ex.: `{price}`).
 * - Prazos e percentuais podem aparecer em prosa, mas precisam bater com pricing.ts: os testes conferem.
 * - Primeira pessoa ("eu"); nada de "nós/time" (BRIEFING §3).
 * - Limites de caracteres: tabela em docs/copy/en.md (docs/design/DESIGN.md §8).
 */

import type { Locale } from '../config/routes.mjs';
import type { EvolutionPlanId, PriceLabels, StepId } from '../config/pricing';

/** Âncoras iguais nos dois idiomas (PLANO-DEV §2.2). */
export const SECTION_IDS = [
  'inicio',
  'problema',
  'quem',
  'precos',
  'garantias',
  'metodo',
  'nao-e-para',
  'faq',
  'contato',
] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/** Seções na navegação do header (4 itens, ≤ 12 caracteres cada). */
export const NAV_SECTION_IDS = ['precos', 'garantias', 'quem', 'faq'] as const satisfies readonly SectionId[];
export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

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

export interface LadderStepCopy {
  /** ≤ 24 */
  name: string;
  /** Prazo em prosa ("2–3 semanas", "45 minutos", "mensal"), ≤ 20. Precisa bater com pricing.ts. */
  timeline: string;
  /** ≤ 80 */
  summary: string;
  /** 3–5 itens, ≤ 60 cada. */
  included: string[];
  /** Forma de pagamento em prosa ("40% na assinatura, ..."), ≤ 90. Percentuais precisam bater com pricing.ts. */
  payment: string;
  /** Selo curto ao lado do nome, ≤ 28 (DESIGN §6.6/§7.3). Hoje só no Sprint: "100% abatido do MVP". */
  badge?: string;
  /** Ressalva, ≤ 120. `highlight` = nota em destaque (ex.: crédito do Sprint). */
  note?: { text: string; highlight?: boolean };
}

export interface CaseItem {
  detail?: { href: string; label: string };
  /** ≤ 50 */
  title: string;
  /** ≤ 160 */
  body: string;
  /**
   * Rótulo de fonte, ≤ 40 ("Dado público · MundoLogística, 13/01/2026", "Relato meu", "Projeto próprio").
   * `url` só em fonte pública (matéria) ou no site do projeto próprio (ex.: ascende.site); relato autodeclarado
   * nunca leva link. O texto visível nunca leva nome não autorizado, mesmo que a URL leve.
   */
  source: {
    label: string;
    url?: string;
    /** Com linkLabel, `label` vira texto e o link usa linkLabel ("Projeto próprio, não é cliente · ascende.site ↗"). */
    linkLabel?: string;
  };
  kind: 'published' | 'self-reported' | 'own-project';
  /**
   * Versão com o nome da empresa, usada só quando a autorização existir (site.looptAuthorized).
   * Sem ela, ou sem autorização, vale a versão anônima acima (BRIEFING §3, regra 3).
   */
  whenAuthorized?: { requires: 'loopt'; title: string; body: string };
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

/**
 * Landing /diagnostico/ (docs/landing/DIAGNOSTICO-SPEC.md): só PT; o texto é do Mote. Até ele chegar, cada
 * campo é "[Mote: …]" e o build de PRODUÇÃO falha se algum sobrar (astro.config.mjs, env-guard).
 * Preços e prazos vêm do pricing.ts (mesma escada da home). Provas: Bom.Capital como relato SEM url;
 * Ascende como projeto próprio COM url; sem Loopt, Lovable ou FinPlan; sem link para o LinkedIn.
 * O CTA do header usa common.bookingCtaHeader/Mobile, como na home (DESIGN §14.2).
 */
export interface DiagnosticoCopy {
  meta: PageMeta;
  /** proofLine: microprova abaixo do CTA, itens unidos por " · " (total ≤ 90), como na home. */
  hero: { eyebrow?: string; title: string; subtitle: string; cta: string; proofLine: string[] };
  /** H2 e intro da escada nesta página (o componente e os dados são os da home). */
  ladder: { title: string; intro: string };
  /** `note` ≤ 120, no fim do bloco (DESIGN §14.5; ex.: abatido do MVP em até 30 dias). */
  sprint: { title: string; intro?: string; items: TitledItem[]; note: string };
  proofs: { title: string; items: CaseItem[] };
  /** 1ª pessoa; sem foto nem link por padrão. */
  about: { title: string; bio: string[] };
  faq: { title: string; items: { question: string; answer: string }[] };
  finalCta: { title: string; body: string; cta: string };
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

  header: {
    navLabel: string;
    nav: Record<NavSectionId, string>;
  };

  hero: {
    /** ≤ 40 */
    eyebrow: string;
    /** Manchete exata do plano §3. Não muda sem o Maestro do projeto. */
    headline: string;
    /** ≤ 160 */
    subheadline: string;
    /** ≤ 40 / ≤ 20 */
    primaryCta: string;
    secondaryCta: string;
    emailLead: string;
    emailCta: string;
    /** Itens da linha de prova, unidos por " · " (total ≤ 90). */
    proofLine: string[];
  };

  problem: {
    title: string;
    intro: string;
    items: (TitledItem & { example: string; href: string; link: string })[];
  };

  ladder: {
    title: string;
    intro: string;
    /** `from` usa {price}: "a partir de {price}". */
    priceLabels: PriceLabels;
    labels: {
      timeline: string;
      included: string;
      payment: string;
      /** Marcador do degrau alternativo (1b, 2b) no trilho: "ou" / "or" (DESIGN §6). */
      altStep: string;
    };
    units: {
      /** "/mês" */
      perMonth: string;
      /** "/h" */
      perHour: string;
      /** Célula de horas da tabela Evolution: "~{n} h" (o cabeçalho já diz "/mês"). */
      hoursPerMonth: string;
    };
    steps: Record<StepId, LadderStepCopy>;
    /** CTA próprio do diagnóstico (degrau 0). */
    diagnosticCta: string;
    evolution: {
      /** <table> de planos (DESIGN §6.8): caption visível e cabeçalhos das colunas. */
      table: {
        caption: string;
        headers: { plan: string; hours: string; price: string };
      };
      /** `description` ≤ 70 (linha abaixo do nome na tabela). */
      plans: Record<EvolutionPlanId, { name: string; description: string }>;
      /** Regras, ≤ 160. Usa {overage} (valor/h de pricing.ts). */
      rulesNote: string;
    };
    cta: string;
    workingTogether: { title: string; items: string[] };
    ctaNote: string;
  };

  guarantees: {
    title: string;
    intro: string;
    items: TitledItem[];
    exclusionsTitle: string;
    exclusions: string[];
  };

  about: {
    title: string;
    photoAlt: string;
    /** Parágrafos em 1ª pessoa, ≤ 320 cada. */
    bio: string[];
    casesTitle: string;
    cases: CaseItem[];
    /** Nota abaixo dos cases explicando "Relato meu". */
    casesFootnote: string;
    /** Linha sobre o artigo na neptune.ai, ≤ 120: só texto, sem link nem env (o artigo saiu do ar; PLANO-DEV F8). */
    article: string;
    linkedinLabel: string;
    githubLabel: string;
  };

  method: {
    title: string;
    intro: string;
    items: TitledItem[];
    closing: string;
  };

  notFor: {
    title: string;
    intro: string;
    items: string[];
  };

  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };

  finalCta: {
    title: string;
    body: string;
    cta: string;
    /** Só com site.contactEmail: "{lead} <a>email</a>." — o label é o próprio e-mail. */
    emailLead: string;
    linkedin: LeadLink;
  };

  /** Renderizada só com site.showTestimonials = true. Sem conteúdo de exemplo (regra 5). */
  testimonials: {
    title: string;
  };

  footer: {
    /** Linha após a marca, ≤ 120. */
    tagline: string;
    privacyLink: string;
    /** Link para o outro idioma ("English" no PT). */
    otherLanguageLink: string;
    linkedinLabel: string;
    githubLabel: string;
    /** "© {year} {brand}" */
    copyright: string;
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
