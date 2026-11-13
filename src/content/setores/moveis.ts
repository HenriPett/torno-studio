import type { SectorLanding } from './types';

export const setor: SectorLanding = {
  slug: 'moveis',
  sectorName: 'madeira e móveis',
  meta: {
    title: 'IA para indústrias de madeira e móveis | Torno',
    description:
      'Cérebro da operação e agentes de IA para representantes e lojistas, conferência de pedidos de planejados, plano de corte, catálogo e assistência técnica. Implantação por etapas.',
  },
  hero: {
    eyebrow: 'Para indústrias de madeira e móveis',
    title: 'Pedido certo do representante à assistência técnica',
    lead: 'A Torno junta ERP, catálogo, listas de peças, planos de corte e histórico de assistência num cérebro da operação. Em cima dele, agentes de IA ajudam representantes, engenharia, PCP e pós-venda.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Exportação em queda e mercado interno mais disputado',
    body: [
      'As exportações de móveis e colchões para os Estados Unidos caíram 41,7% de janeiro a maio de 2026, segundo o Times Brasil. No mercado interno, ganha quem atende lojistas rápido e entrega sem erro.',
    ],
    refs: [[1]],
  },
  adoption: {
    useAI: 'cerca de 4 em 10',
    inProduction: 'cerca de 1 em 10',
    reading: 'A maioria das fábricas que usam IA parou no escritório. Na produção, quem começar agora ainda está entre as primeiras.',
    source: 1,
  },
  proofPoints: [
    {
      value: 'R$ 5 mi',
      label: 'em resina poupados em oito meses, com inspeção apoiada por IA',
      context: 'Fabricante de painéis de madeira, segundo a empresa',
      area: 'Qualidade',
      source: 2,
      scope: 'setor',
    },
    {
      value: '−3,5%',
      label: 'no custo de frete com IA',
      context: 'Indústria de outro setor, no Paraná, segundo a empresa',
      area: 'Logística',
      source: 3,
      scope: 'vizinho',
    },
  ],
  help: {
    title: 'Onde entramos e o que medimos',
    intro: 'Em cada piloto medimos o indicador da área antes e depois. O diagnóstico escolhe por onde começar.',
    items: [
      {
        area: 'Representantes',
        problem: 'Acabamento, prazo, preço e status do pedido passam pelo comercial interno, uma ligação de cada vez.',
        whatWeDo: 'Um assistente responde ao representante com as regras comerciais e as permissões de cada um.',
        measure: 'Consultas de representantes ao comercial interno por dia',
      },
      {
        area: 'Engenharia de produto',
        problem: 'Uma medida fora da regra no pedido de planejado vira peça cortada à toa.',
        whatWeDo: 'O agente confere o pedido contra as regras de módulos, medidas e ferragens antes da produção.',
        measure: 'Pedidos de planejados com erro que chegam à produção',
      },
      {
        area: 'PCP e corte',
        problem: 'O plano de corte com pedidos misturados e sobras depende de uma pessoa.',
        whatWeDo: 'O agente junta carteira, chapas, sobras e prazos para o programador montar o plano.',
        measure: 'Aproveitamento de chapa por plano de corte',
      },
      {
        area: 'Assistência técnica',
        problem: 'Achar a peça de um móvel vendido há dois anos leva dias.',
        whatWeDo: 'O agente encontra a peça certa pelo número do pedido ou pela etiqueta do móvel.',
        measure: 'Dias para identificar uma peça de reposição',
      },
    ],
  },
  pains: {
    title: 'O que custa caro numa fábrica de móveis',
    items: [
      {
        title: 'Representante liga para saber o básico',
        body: 'Cada pergunta sobre acabamento, prazo ou pedido passa pelo comercial interno.',
      },
      {
        title: 'Pedido de planejado com erro de módulo',
        body: 'Uma ferragem incompatível vira peça cortada à toa, reentrega e cliente insatisfeito.',
      },
      {
        title: 'Assistência técnica sem histórico',
        body: 'Descobrir pedido, acabamento e peça de um móvel antigo leva dias.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa fábrica de móveis',
    intro: 'Exemplos ilustrativos, para linha seriada ou planejados.',
    items: [
      {
        area: 'Comercial e representantes',
        title: 'Assistente para representantes e lojistas',
        body: 'Prazo, acabamentos, tabela e status do pedido, por perfil.',
        example: '“A cômoda 3040 em freijó com puxador preto tem entrega para dezembro?”',
      },
      {
        area: 'Engenharia de produto',
        title: 'Conferência do pedido de planejado',
        body: 'Aponta módulos, medidas e ferragens fora da regra.',
        example: '“O pedido 9921 tem algum módulo fora das medidas permitidas?”',
      },
      {
        area: 'Assistência técnica',
        title: 'Peça de reposição pelo histórico',
        body: 'Pedido original, acabamento e peça certa pela etiqueta.',
        example: '“Qual a porta correta para o roupeiro do pedido 7120?”',
      },
      {
        area: 'Qualidade',
        title: 'Defeito ligado ao lote e ao fornecedor',
        body: 'Liga reclamações ao lote de chapa, à ferragem ou à fita de borda.',
        example: '“O descolamento de fita de borda deste mês vem de qual lote?”',
      },
    ],
  },
  mock: {
    question: 'O roupeiro do pedido 7120 voltou com porta empenada. Qual peça mandamos e de qual lote era a chapa?',
    answer:
      'O pedido 7120 saiu com o roupeiro de 6 portas em carvalho natural [1]. A porta de correr esquerda é a peça RP-6P-07, ainda em linha [2]. A chapa veio do recebimento 3315, que tem outras duas reclamações de empeno [3].',
    citations: ['Pedido 7120, ERP', 'Lista de peças do roupeiro 6P, rev. E', 'Recebimento 3315 e reclamações vinculadas'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa fábrica de móveis',
    body: [
      'Pedidos, listas de peças, regras de módulos, catálogo, tabelas e chamados entram ligados pelo pedido e pelo código do produto. Representante, programador de corte e técnico consultam a mesma base, cada um com o seu perfil.',
    ],
    inputs: [
      'Pedidos, carteira e estoque do ERP',
      'Listas de peças, regras de módulos e desenhos',
      'Catálogo, acabamentos e tabelas por região',
      'Planos de corte e controle de sobras',
      'Chamados de assistência e reclamações de lojistas',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa fábrica de planejados com rede de representantes',
    intro: 'Muitos pedidos de planejados chegam com erro de módulo. Um piloto poderia correr assim.',
    steps: [
      { title: 'Diagnóstico', body: 'Contamos os pedidos com erro e o custo de cada reentrega.' },
      { title: 'Regras na base', body: 'Regras de módulos, medidas e ferragens, revisadas pela engenharia de produto.' },
      { title: 'Piloto na entrada de pedidos', body: 'Cada pedido passa pela conferência antes da produção, e a engenharia decide os casos marcados.' },
      { title: 'Expansão', body: 'Com o critério atingido, o próprio representante confere o pedido antes de enviar.' },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA usado em terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Ainda não temos case publicado em madeira e móveis.',
  },
  faq: [
    {
      q: 'Os dados de preço e de lojistas ficam seguros?',
      a: 'Os dados ficam na sua infraestrutura ou numa nuvem aprovada pela TI. Cada representante vê só a própria carteira e tabela, e os dados não treinam modelos de terceiros.',
    },
    {
      q: 'Funciona com o nosso ERP e com o software de projeto dos lojistas?',
      a: 'Lemos o ERP pelo caminho que a TI aprovar. O diagnóstico verifica se dá para ler direto o arquivo do software de projeto.',
    },
    {
      q: 'Os representantes vão usar?',
      a: 'O piloto responde com números. Começamos com um grupo pequeno, num canal que eles já usam, e medimos o uso.',
    },
    {
      q: 'Quanto tempo leva e quanto custa?',
      a: 'O diagnóstico leva de 2 a 4 semanas. A conversa inicial não tem custo, e cada etapa tem proposta fechada.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quantos pedidos voltam por erro. Saímos com uma ideia de onde o diagnóstico começaria.',
  },
  sources: [
    {
      label: 'Times Brasil, 17/07/2026, com posicionamento da Abimóvel',
      url: 'https://timesbrasil.com.br/mundo/tarifas-trump/tarifaco-dos-eua-sobre-moveis-brasileiros-agrava-queda-de-417-nas-exportacoes-em-2026/',
    },
    {
      label: 'IBGE, PINTEC Semestral 2024, indicadores por atividade (tab. 1.3.3)',
      url: 'https://ftp.ibge.gov.br/Industrias_Extrativas_e_de_Transformacao/Pesquisa_de_Inovacao_Semestral/2024/Indicadores_tematicos/PINTEC_Semestral_2024_Indicadores_Tematicos_CNAE.xlsx',
    },
    {
      label: 'Portal Tela, 22/06/2026 (resultado segundo a empresa)',
      url: 'https://www.portaltela.com/noticias/ciencia/2026/06/22/dexco-economiza-r-5-milhoes-com-inspecao-por-luz-cascos-de-navios-e-paineis/',
    },
    {
      label: 'Tribuna PR, jun/2026 (resultado segundo a empresa)',
      url: 'https://www.tribunapr.com.br/noticias/parana/como-inteligencia-artificial-transforma-produtividade-industrial-parana/',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
