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
    lead: 'A Torno junta ERP, catálogo, listas de peças, planos de corte e histórico de assistência num cérebro da operação. Em cima dele, agentes de IA ajudam representantes, engenharia de produto, PCP e pós-venda. Implantamos por etapas, com a sua TI.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Exportação em queda e mercado interno mais disputado',
    body: [
      'As exportações de móveis e colchões para os Estados Unidos caíram 41,7% de janeiro a maio de 2026, segundo o Times Brasil. Voltar ao mercado interno pede atender lojistas e representantes rápido e entregar sem erro.',
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
    intro: 'No piloto, medimos o indicador da área antes e depois. O diagnóstico escolhe por onde começar.',
    items: [
      {
        area: 'Representantes',
        problem: 'Acabamento, prazo, preço da tabela e status do pedido passam pelo comercial interno, uma ligação de cada vez.',
        whatWeDo: 'Um assistente responde ao representante com as regras comerciais e as permissões de cada um.',
        measure: 'Consultas de representantes ao comercial interno por dia',
      },
      {
        area: 'Engenharia de produto',
        problem: 'Uma medida fora da regra no pedido de planejado vira peça cortada à toa e reentrega.',
        whatWeDo: 'O agente confere o pedido contra as regras de módulos, medidas e ferragens antes da produção.',
        measure: 'Pedidos de planejados com erro que chegam à produção',
      },
      {
        area: 'PCP e corte',
        problem: 'O plano de corte com pedidos misturados e sobras depende de uma pessoa e de planilhas próprias.',
        whatWeDo: 'O agente junta carteira, chapas, sobras e prazos para o programador montar o próximo plano.',
        measure: 'Aproveitamento de chapa por plano de corte',
      },
      {
        area: 'Assistência técnica',
        problem: 'Achar o pedido, o acabamento e a peça de um móvel vendido há dois anos leva dias.',
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
        body: 'Acabamento disponível, prazo, preço da tabela da região e status do pedido. Cada pergunta passa pelo comercial interno.',
      },
      {
        title: 'Pedido de planejado com erro de módulo',
        body: 'Uma medida fora da regra ou uma ferragem incompatível vira peça cortada à toa, reentrega e cliente insatisfeito.',
      },
      {
        title: 'Assistência técnica sem histórico',
        body: 'O lojista pede uma peça para um móvel vendido há dois anos. Descobrir pedido, acabamento e peça leva dias.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa fábrica de móveis',
    intro: 'Exemplos ilustrativos, para linha seriada ou planejados. O diagnóstico define por onde começar.',
    items: [
      {
        area: 'Comercial e representantes',
        title: 'Assistente para representantes e lojistas',
        body: 'Prazo, acabamentos, preço por tabela e status do pedido, com as permissões de cada representante.',
        example: '“A cômoda 3040 em freijó com puxador preto tem entrega para dezembro?”',
      },
      {
        area: 'Engenharia de produto',
        title: 'Conferência do pedido de planejado',
        body: 'Confere o pedido do lojista contra as regras de módulos, medidas e ferragens e aponta inconsistências.',
        example: '“O pedido 9921 tem algum módulo fora das medidas permitidas para essa linha?”',
      },
      {
        area: 'Assistência técnica',
        title: 'Peça de reposição pelo histórico do pedido',
        body: 'Encontra o pedido original, o acabamento e a peça certa pelo número do pedido ou pela etiqueta.',
        example: '“Qual a porta correta para o roupeiro do pedido 7120?”',
      },
      {
        area: 'Qualidade',
        title: 'Defeito ligado ao lote e ao fornecedor',
        body: 'Liga reclamações de lojistas ao lote de chapa, ao fornecedor de ferragem ou de fita de borda e à linha.',
        example: '“As reclamações de descolamento de fita de borda deste mês vêm de qual lote de fita?”',
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
      'Pedidos, listas de peças, regras de módulos, catálogo, tabelas e chamados entram ligados pelo número do pedido e pelo código do produto. Representante, programador de corte e técnico consultam a mesma informação, cada um com o seu perfil.',
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
    intro: 'Uma indústria de móveis vende por representantes e recebe muitos pedidos de planejados com erro de módulo.',
    steps: [
      {
        title: 'Diagnóstico',
        body: 'Contamos os pedidos com erro dos últimos meses e o custo de cada reentrega, e combinamos o critério de sucesso.',
      },
      {
        title: 'Regras na base',
        body: 'As regras de módulos, medidas e ferragens viram uma base revisada pela engenharia de produto.',
      },
      {
        title: 'Piloto na entrada de pedidos',
        body: 'Cada pedido de planejado passa pela conferência antes da produção. A engenharia decide os casos marcados.',
      },
      {
        title: 'Expansão',
        body: 'Com o critério atingido, o próprio representante confere o pedido antes de ele chegar à fábrica.',
      },
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
      a: 'Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela TI. Cada representante vê só a própria carteira e a tabela da sua região, o uso fica registrado e os dados não treinam modelos de terceiros.',
    },
    {
      q: 'Funciona com o nosso ERP e com o software de projeto dos lojistas?',
      a: 'Lemos o ERP pelo caminho que a TI aprovar. O diagnóstico verifica se a conferência pode ler direto o arquivo que chega do software de projeto.',
    },
    {
      q: 'Os representantes vão usar?',
      a: 'O piloto responde a isso com números. Começamos com um grupo pequeno, num canal que eles já usam, e medimos o uso e as consultas que deixam de chegar ao comercial interno.',
    },
    {
      q: 'Quanto tempo leva e quanto custa?',
      a: 'O diagnóstico está planejado para 2 a 4 semanas. A conversa inicial não tem custo, e cada etapa depois dela tem proposta fechada, com prazo e critério de sucesso.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quantos pedidos voltam por erro e quanto o comercial interno atende de representante por dia. Saímos com uma ideia de onde o diagnóstico começaria.',
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
