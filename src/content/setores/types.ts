/**
 * Contrato das landings de setor (docs/estrategia-2026-11-torno-industria.md §7).
 * Uma landing por arquivo em src/content/setores/<slug>.ts, servida em /para/<slug>/.
 * ISOLAMENTO: nenhum arquivo deste diretório importa outro setor; nada no site lista setores.
 */
export interface SectorSource {
  /** Rótulo curto da fonte, ex.: "IBGE, CEMPRE 2024". */
  label: string;
  url: string;
}

/**
 * Contrato 2026-11-13 (pedido do Henrique: mais números sobre COMO ajudamos, menos sobre o mercado).
 * Fonte dos números: pesquisa "gancho de concorrência" (IBGE PINTEC Semestral 2024 + casos públicos).
 * Casos públicos aparecem ANONIMIZADOS no texto (sem nome de empresa), com link para a fonte e
 * atribuição ("segundo a empresa"/"segundo o fornecedor"); nunca como cliente da Torno.
 */
export interface SectorAdoption {
  /** Ex.: "~4 em 10" (indústrias do setor com 100+ pessoas que usam IA). */
  useAI: string;
  /** Ex.: "~1 em 10" (as que usam IA na produção). */
  inProduction: string;
  /** Frase curta de leitura do dado (ex.: a maioria parou no escritório). */
  reading: string;
  /** Índice (0-based) em `sources`. */
  source: number;
}

export interface SectorProofPoint {
  /** Número de destaque, ex.: "+10%", "−29%", "5 mil h/mês". */
  value: string;
  /** O que o número mede. */
  label: string;
  /** Quem e onde, anonimizado: "Fabricante de motores elétricos em SC, segundo a empresa". */
  context: string;
  /** Área da empresa onde o resultado aconteceu (Manutenção, Qualidade, Comercial...). */
  area: string;
  /** Índice (0-based) em `sources`. */
  source: number;
  /** 'setor' = mesmo setor; 'vizinho' = setor próximo; 'global' = estudo global. */
  scope: 'setor' | 'vizinho' | 'global';
}

export interface SectorHelpStep {
  /** Área onde entramos. */
  area: string;
  /** O problema concreto, em uma frase. */
  problem: string;
  /** O que a Torno coloca no lugar, em uma frase. */
  whatWeDo: string;
  /** O indicador que medimos antes e depois no piloto (sem prometer valor). */
  measure: string;
}

export interface SectorLanding {
  /** Slug da URL: /para/<slug>/. Só [a-z-]. */
  slug: string;
  /** Nome do setor como o próprio setor fala, ex.: "têxtil e confecção". */
  sectorName: string;
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    /** Manchete: até ~70 caracteres, sem travessão. */
    title: string;
    lead: string;
    /** Texto do botão de agenda. */
    cta: string;
  };
  /** Por que agora, neste setor. Fatos verificáveis citam a fonte em `sources`. */
  context: {
    title: string;
    body: string[];
    /** Notas por parágrafo: índices (a partir de 1) em `sources`. Viram números de nota no texto. */
    refs?: number[][];
  };
  /** Números do contexto em destaque (StatGrid). `source` é o índice (a partir de 1) em `sources`. */
  stats?: { value: string; label: string; source: number }[];
  /** Dores reconhecíveis do setor (3 a 5). */
  pains: { title: string; items: { title: string; body: string }[] };
  /** Áreas da empresa atendidas, na linguagem do setor (4 a 6). */
  areas: {
    title: string;
    intro: string;
    items: { area: string; title: string; body: string; example: string }[];
  };
  /** Exemplo de pergunta e resposta para o mock de interface (rotulado como ilustrativo). */
  mock: { question: string; answer: string; citations: string[] };
  /** O "cérebro da operação" aplicado ao setor: de onde vêm os dados e o conhecimento. */
  brain: { title: string; body: string[]; inputs: string[] };
  /** Cenário ilustrativo de implantação. NUNCA apresentado como case. */
  scenario: { title: string; intro: string; steps: { title: string; body: string }[]; note: string };
  /** Ponte para a prova real (case Loopt e cases gerais), sem inventar resultado no setor. */
  proof: { title: string; body: string };
  faq: { q: string; a: string }[];
  finalCta: { title: string; body: string };
  sources: SectorSource[];
  /** Adoção de IA no setor (IBGE). */
  adoption?: SectorAdoption;
  /** Resultados públicos de empresas do setor (anonimizados). 2 a 4 itens. */
  proofPoints?: SectorProofPoint[];
  /** Onde entramos e como ajudamos, área por área. 3 a 5 itens. */
  help?: { title: string; intro: string; items: SectorHelpStep[] };
}
