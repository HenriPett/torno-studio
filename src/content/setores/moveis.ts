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
    lead: 'A Torno junta ERP, catálogo, listas de peças, planos de corte e histórico de assistência num cérebro da operação. Em cima dele, agentes de IA ajudam representantes, engenharia de produto, PCP, qualidade e pós-venda. Implantamos por etapas, com a sua TI.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Exportação em queda e mercado interno mais disputado',
    body: [
      'Santa Catarina tem 33 unidades locais de fabricação de produtos de madeira e de móveis com 250 ou mais pessoas ocupadas, e as duas divisões ocupam 85.591 pessoas no estado (IBGE, CEMPRE 2024).',
      'As exportações brasileiras de móveis e colchões para os Estados Unidos caíram 41,7% de janeiro a maio de 2026, na comparação com o mesmo período de 2025, segundo o Times Brasil, em reportagem com o posicionamento da Abimóvel sobre a nova tarifa americana. Voltar parte da produção ao mercado interno exige atender lojistas e representantes com rapidez e entregar sem erro.',
    ],
    refs: [[1], [2]],
  },
  stats: [
    { value: '33', label: 'unidades de madeira e móveis com 250 ou mais pessoas ocupadas em Santa Catarina', source: 1 },
    { value: '85.591', label: 'pessoas ocupadas nas duas divisões em Santa Catarina', source: 1 },
    { value: '−41,7%', label: 'nas exportações brasileiras de móveis e colchões para os Estados Unidos, de janeiro a maio de 2026', source: 2 },
  ],
  pains: {
    title: 'O que custa caro numa fábrica de móveis',
    items: [
      {
        title: 'Representante liga para saber o básico',
        body: 'Acabamento disponível, prazo de entrega, preço da tabela da região e status do pedido. Cada pergunta passa pelo comercial interno.',
      },
      {
        title: 'Pedido de planejado com erro de módulo',
        body: 'Uma medida fora da regra ou uma ferragem incompatível no projeto do lojista vira peça cortada à toa, reentrega e cliente insatisfeito.',
      },
      {
        title: 'Plano de corte na experiência de uma pessoa',
        body: 'Programar a seccionadora com pedidos misturados, sobras reaproveitáveis e prazos diferentes depende de quem faz o plano de corte e de planilhas próprias.',
      },
      {
        title: 'Assistência técnica sem histórico',
        body: 'O lojista pede uma peça de reposição para um móvel vendido há dois anos. Descobrir o pedido, o acabamento e a peça certa leva dias.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa fábrica de móveis',
    intro:
      'Os exemplos abaixo são ilustrativos. Serve tanto para linha seriada quanto para planejados, e o diagnóstico define por onde começar.',
    items: [
      {
        area: 'Comercial e representantes',
        title: 'Assistente para representantes e lojistas',
        body: 'Prazo, acabamentos, preço por tabela e status do pedido, com as regras comerciais e as permissões de cada representante.',
        example: '“A cômoda 3040 em freijó com puxador preto tem entrega para dezembro?”',
      },
      {
        area: 'Engenharia de produto',
        title: 'Conferência do pedido de planejado',
        body: 'Confere o pedido do lojista contra as regras de módulos, medidas e ferragens antes da produção, e aponta inconsistências para a engenharia decidir.',
        example: '“O pedido 9921 tem algum módulo fora das medidas permitidas para essa linha?”',
      },
      {
        area: 'PCP e corte',
        title: 'Programação que enxerga chapas e sobras',
        body: 'Junta carteira, estoque de chapas, sobras e prazos, e dá ao programador a visão do que agrupar no próximo plano de corte.',
        example: '“Que pedidos com MDF branco 18 mm vencem esta semana e que sobras temos dessa chapa?”',
      },
      {
        area: 'Catálogo e marketing',
        title: 'Catálogo atualizado a partir da engenharia',
        body: 'Fichas de produto, medidas, acabamentos e instruções de montagem gerados a partir dos dados aprovados, para catálogo, venda B2B e treinamento de lojistas.',
        example: '“Atualize as fichas da linha de dormitórios com as novas opções de acabamento.”',
      },
      {
        area: 'Assistência técnica',
        title: 'Peça de reposição pelo histórico do pedido',
        body: 'Encontra o pedido original, o acabamento e a peça certa a partir do número do pedido ou da etiqueta do móvel.',
        example: '“Qual a porta correta para o roupeiro do pedido 7120?”',
      },
      {
        area: 'Qualidade',
        title: 'Defeito ligado ao lote e ao fornecedor',
        body: 'Liga reclamações de lojistas ao lote de chapa, ao fornecedor de ferragem ou de fita de borda e à linha de produção.',
        example: '“As reclamações de descolamento de fita de borda deste mês vêm de qual lote de fita?”',
      },
    ],
  },
  mock: {
    question: 'O roupeiro do pedido 7120 voltou com porta empenada. Qual peça mandamos e de qual lote era a chapa?',
    answer:
      'O pedido 7120 saiu com o roupeiro de 6 portas, acabamento carvalho natural [1]. A porta de correr esquerda é a peça RP-6P-07, ainda em linha [2]. A chapa daquele lote veio do recebimento 3315, MDF 18 mm. Há outras duas reclamações de empeno ligadas ao mesmo recebimento [3].',
    citations: ['Pedido 7120, ERP', 'Lista de peças do roupeiro 6P, rev. E', 'Recebimento 3315 e reclamações vinculadas'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa fábrica de móveis',
    body: [
      'O ERP traz pedidos, carteira, estoque de chapas e ferragens e expedição. A engenharia tem listas de peças, regras de módulos e desenhos. O comercial tem tabelas por região, catálogo e o cadastro de lojistas. A assistência tem o histórico de chamados.',
      'Ligamos tudo pelo número do pedido e pelo código do produto. O representante, o programador de corte e o técnico de assistência consultam a mesma informação, cada um com o seu perfil de acesso. Cada resposta cita a fonte.',
    ],
    inputs: [
      'Pedidos, carteira e estoque do ERP',
      'Listas de peças, regras de módulos e desenhos',
      'Catálogo, acabamentos e tabelas de preço por região',
      'Planos de corte e controle de sobras',
      'Chamados de assistência técnica',
      'Reclamações de lojistas e não conformidades',
      'Instruções de montagem',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa fábrica de planejados com rede de representantes',
    intro:
      'Uma indústria de móveis com cerca de 700 funcionários vende por 80 representantes e recebe muitos pedidos de planejados com erro de módulo.',
    steps: [
      {
        title: 'Diagnóstico',
        body: 'Com comercial, engenharia e TI, contamos os pedidos com erro dos últimos meses e o custo de cada reentrega, e combinamos o critério de sucesso.',
      },
      {
        title: 'Regras na base',
        body: 'As regras de módulos, medidas e ferragens viram uma base que o assistente consulta, revisada pela engenharia de produto.',
      },
      {
        title: 'Piloto na entrada de pedidos',
        body: 'O comercial interno passa cada pedido de planejado pela conferência antes da produção. A engenharia decide os casos marcados.',
      },
      {
        title: 'Expansão',
        body: 'Com o critério atingido, a conferência passa a ser feita pelo próprio representante, antes de o pedido chegar à fábrica.',
      },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real. Os números de porte servem só para dar escala ao exemplo.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA que apoia a operação de terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Ainda não temos case publicado em madeira e móveis. No setor, começamos pelo diagnóstico e combinamos o critério de sucesso antes do piloto.',
  },
  faq: [
    {
      q: 'Os dados de preço e de lojistas ficam seguros?',
      a: 'Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela sua TI. Cada representante vê só a própria carteira e a tabela da sua região, o uso fica registrado e os dados não são usados para treinar modelos de terceiros. Assinamos acordo de confidencialidade antes do diagnóstico quando a empresa pede.',
    },
    {
      q: 'Funciona com o nosso ERP e com o software de projeto dos lojistas?',
      a: 'Lemos o ERP já implantado pelo caminho que a TI aprovar. Para os pedidos de planejados, o diagnóstico verifica o formato que chega do software de projeto e se a conferência pode ler esse arquivo direto.',
    },
    {
      q: 'Os representantes vão usar?',
      a: 'O piloto existe para responder a isso com números. Começamos com um grupo pequeno, num canal que eles já usam, e medimos o uso e as consultas que deixam de chegar ao comercial interno.',
    },
    {
      q: 'Quanto tempo até ter algo funcionando?',
      a: 'O diagnóstico está planejado para 2 a 4 semanas. O piloto vem em seguida, numa área e num problema, com prazo e critério de sucesso definidos na proposta.',
    },
    {
      q: 'Quanto custa?',
      a: 'A conversa inicial não tem custo. O diagnóstico tem proposta fechada, e cada etapa seguinte também, a partir do que o diagnóstico encontrar.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quantos pedidos voltam por erro e quanto o comercial interno atende de representante por dia. Saímos da conversa com uma ideia de onde o diagnóstico começaria.',
  },
  sources: [
    {
      label: 'IBGE, CEMPRE 2024 (SIDRA, tabela 9529)',
      url: 'https://apisidra.ibge.gov.br/values/t/9529/n3/42/v/all/p/last/c319/all/c12762/all',
    },
    {
      label: 'Times Brasil, 17/07/2026, com posicionamento da Abimóvel',
      url: 'https://timesbrasil.com.br/mundo/tarifas-trump/tarifaco-dos-eua-sobre-moveis-brasileiros-agrava-queda-de-417-nas-exportacoes-em-2026/',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
