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
  context: { title: string; body: string[] };
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
}
