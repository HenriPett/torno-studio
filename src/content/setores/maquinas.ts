import type { SectorLanding } from './types';

export const setor: SectorLanding = {
  slug: 'maquinas',
  sectorName: 'máquinas e equipamentos',
  meta: {
    title: 'IA para fabricantes de máquinas e equipamentos | Torno',
    description:
      'Cérebro da operação e agentes de IA para orçamentação técnica, engenharia sob encomenda, assistência técnica e peças de reposição. Implantação por etapas, a partir de um diagnóstico.',
  },
  hero: {
    eyebrow: 'Para fabricantes de máquinas e equipamentos',
    title: 'Orçamento técnico e pós-venda com a história de cada máquina',
    lead: 'A Torno reúne ERP, BOMs, desenhos, manuais, orçamentos antigos e chamados de assistência num cérebro da operação. Em cima dele, agentes de IA ajudam orçamentação, engenharia, assistência e peças de reposição. Implantamos por etapas, com a sua TI.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Mais máquina importada na disputa',
    body: [
      'Os importados já atendem 46% do consumo nacional de máquinas e equipamentos, segundo a Abimaq. Para o fabricante nacional, prazo de orçamento, reuso de projeto e pós-venda pesam na hora de fechar o pedido.',
    ],
    refs: [[1]],
  },
  adoption: {
    useAI: 'cerca de 5 em 10',
    inProduction: 'cerca de 2 em 10',
    reading: 'Mais da metade dos fabricantes já usa IA. Na produção, a maioria ainda não começou.',
    source: 1,
  },
  proofPoints: [
    {
      value: '+10%',
      label: 'de disponibilidade dos equipamentos, aproximadamente, em três anos com diagnóstico de falha por IA',
      context: 'Fabricante de motores elétricos em SC, segundo a empresa',
      area: 'Manutenção',
      source: 2,
      scope: 'vizinho',
    },
    {
      value: '−29%',
      label: 'de falhas recorrentes de equipamento com monitoramento apoiado por IA',
      context: 'Indústria de outro setor, segundo o fornecedor da tecnologia',
      area: 'Manutenção',
      source: 3,
      scope: 'vizinho',
    },
    {
      value: '1,7 vez',
      label: 'o crescimento de receita das empresas líderes em IA, comparado ao das demais',
      context: 'Estudo global e multissetorial da BCG, 2025',
      area: 'Resultado da empresa',
      source: 4,
      scope: 'global',
    },
  ],
  help: {
    title: 'Onde entramos e o que medimos',
    intro: 'No piloto, medimos o indicador da área antes e depois. O diagnóstico escolhe por onde começar.',
    items: [
      {
        area: 'Orçamentação',
        problem: 'Cada cotação pede engenharia para achar a máquina parecida já feita, a BOM dela e o custo realizado.',
        whatWeDo: 'Um agente encontra os projetos semelhantes e monta a base do orçamento para o orçamentista revisar.',
        measure: 'Dias para devolver um orçamento técnico',
      },
      {
        area: 'Engenharia sob encomenda',
        problem: 'Desenhos e soluções antigas estão no PDM e na rede, e reaproveitar depende de quem lembra.',
        whatWeDo: 'O agente busca projetos por função, medida ou cliente e indica a revisão vigente.',
        measure: 'Horas de engenharia procurando projeto por pedido',
      },
      {
        area: 'Assistência técnica',
        problem: 'O técnico em campo liga para a fábrica para saber a configuração entregue e a última intervenção.',
        whatWeDo: 'A história da máquina pelo número de série chega ao celular do técnico.',
        measure: 'Ligações do campo para a engenharia por semana',
      },
      {
        area: 'Peças de reposição',
        problem: 'O cliente manda foto ou código antigo, e identificar peça, revisão e estoque passa por três pessoas.',
        whatWeDo: 'O agente cruza número de série, BOM da época e estoque, e indica a alternativa atual.',
        measure: 'Tempo para responder a um pedido de peça',
      },
    ],
  },
  pains: {
    title: 'O que segura um fabricante de máquinas',
    items: [
      {
        title: 'Orçamento técnico que leva semanas',
        body: 'Cada cotação pede engenharia para adaptar um projeto parecido. Achar a máquina semelhante, a BOM e o custo realizado consome dias.',
      },
      {
        title: 'Técnico em campo liga para a fábrica',
        body: 'Configuração entregue, manual da versão e última intervenção dependem de a engenharia atender o telefone.',
      },
      {
        title: 'Peça de reposição identificada por foto',
        body: 'O cliente manda uma foto ou um código antigo. Descobrir a peça, a revisão e o estoque passa por três pessoas.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham num fabricante de máquinas',
    intro: 'Exemplos ilustrativos. No diagnóstico, priorizamos pelo impacto em prazo de orçamento e em atendimento.',
    items: [
      {
        area: 'Orçamentação',
        title: 'Orçamento a partir de projetos parecidos',
        body: 'Encontra máquinas semelhantes já vendidas, com BOM, horas de engenharia e custo realizado.',
        example: '“Que transportadores de rolos acima de 12 m já fizemos e qual foi o custo realizado de cada um?”',
      },
      {
        area: 'Engenharia de produto',
        title: 'Reuso de projeto com a revisão certa',
        body: 'Busca em desenhos, BOMs e memoriais por função, medida ou cliente, e indica a revisão vigente.',
        example: '“Temos projeto de mesa giratória para 3 toneladas? Qual revisão está aprovada?”',
      },
      {
        area: 'Assistência técnica',
        title: 'A máquina do cliente pelo número de série',
        body: 'Configuração entregue, manual da versão, diagramas e chamados anteriores no celular do técnico.',
        example: '“Qual CLP e qual versão de software foram na máquina série 2219-034?”',
      },
      {
        area: 'Peças de reposição',
        title: 'Peça certa e estoque na mesma resposta',
        body: 'Cruza número de série, BOM da época e estoque, com a alternativa atual quando o item saiu de linha.',
        example: '“Qual o código atual da engrenagem que foi na série 2017-112? Temos em estoque?”',
      },
    ],
  },
  mock: {
    question: 'Qual foi o custo realizado da última peneira vibratória de dois decks e quanto de engenharia ela consumiu?',
    answer:
      'A última foi o pedido 3982, com custo realizado 8% acima do orçado [1], puxado por chapa e por 46 horas extras de engenharia no chassi [2]. O desenho base é o PV-2D, revisão D [3].',
    citations: ['Pedido 3982, custo realizado, ERP', 'Apontamento de horas da engenharia, pedido 3982', 'BOM PV-2D, rev. D'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta num fabricante de máquinas',
    body: [
      'Pedidos, custos, desenhos, BOMs, orçamentos e chamados entram ligados pelo número de série e pelo pedido, para que cada máquina vendida tenha a sua história completa. As respostas citam a fonte, e custo e margem ficam com quem a diretoria autorizar.',
    ],
    inputs: [
      'Pedidos, custos realizados e estoque do ERP',
      'Desenhos, BOMs e revisões do PDM',
      'Orçamentos ganhos e perdidos',
      'Chamados e relatórios de assistência técnica',
      'Manuais, diagramas e listas de peças',
    ],
  },
  scenario: {
    title: 'Um cenário possível num fabricante com muitos pedidos sob encomenda',
    intro: 'Um fabricante de equipamentos leva semanas para devolver orçamentos técnicos e perde cotações por prazo.',
    steps: [
      {
        title: 'Diagnóstico',
        body: 'Levantamos o tempo de resposta das últimas cotações e combinamos o critério de sucesso.',
      },
      {
        title: 'Base de projetos',
        body: 'Pedidos dos últimos anos ligados a BOM, desenho, horas de engenharia e custo realizado.',
      },
      {
        title: 'Piloto na orçamentação',
        body: 'Os orçamentistas usam o assistente para montar a base do orçamento. A engenharia valida cada um antes de sair.',
      },
      {
        title: 'Próxima etapa',
        body: 'Com o critério atingido, a mesma base passa a atender a assistência técnica e as peças de reposição.',
      },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA usado em terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Ainda não temos case publicado com fabricantes de máquinas.',
  },
  faq: [
    {
      q: 'Nossos desenhos e projetos ficam protegidos?',
      a: 'Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela TI. Desenhos, custos e margens ficam restritos por perfil, o uso fica registrado e os dados não treinam modelos de terceiros.',
    },
    {
      q: 'Funciona com o nosso ERP e o nosso PDM?',
      a: 'Lemos o ERP e o PDM já implantados, ou as pastas de rede da engenharia, pelo caminho que a TI aprovar.',
    },
    {
      q: 'Quanto a engenharia precisa participar?',
      a: 'A engenharia valida o que o assistente produz. Combinamos com ela um tempo semanal que não atrapalhe os projetos em andamento.',
    },
    {
      q: 'Quanto tempo leva e quanto custa?',
      a: 'O diagnóstico está planejado para 2 a 4 semanas. A conversa inicial não tem custo, e cada etapa depois dela tem proposta fechada, com prazo e critério de sucesso.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quanto tempo leva hoje um orçamento técnico ou um atendimento de assistência. Saímos com uma ideia de onde o diagnóstico começaria.',
  },
  sources: [
    {
      label: 'Abimaq, via Agência Brasil (agosto de 2025)',
      url: 'https://agenciabrasil.ebc.com.br/economia/noticia/2025-08/vendas-da-industria-de-maquinas-sobem-14-no-ano-ate-julho',
    },
    {
      label: 'IBGE, PINTEC Semestral 2024, indicadores por atividade (tab. 1.3.3)',
      url: 'https://ftp.ibge.gov.br/Industrias_Extrativas_e_de_Transformacao/Pesquisa_de_Inovacao_Semestral/2024/Indicadores_tematicos/PINTEC_Semestral_2024_Indicadores_Tematicos_CNAE.xlsx',
    },
    {
      label: 'Artigo técnico da empresa, nov/2023 (resultado segundo a empresa)',
      url: 'https://www.industriaquimica.es/descargar_documento/Weg7.pdf',
    },
    {
      label: 'Case publicado pelo fornecedor da tecnologia (material de marketing)',
      url: 'https://tractian.com/casos-de-estudo/bosch',
    },
    {
      label: 'BCG, The Widening AI Value Gap (set/2025), estudo global',
      url: 'https://www.bcg.com/press/30september2025-ai-leaders-outpace-laggards-revenue-growth-cost-savings',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
