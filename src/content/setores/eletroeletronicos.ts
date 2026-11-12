import type { SectorLanding } from './types';

export const setor: SectorLanding = {
  slug: 'eletroeletronicos',
  sectorName: 'material elétrico e eletroeletrônicos',
  meta: {
    title: 'IA para indústrias de material elétrico e eletroeletrônicos | Torno',
    description:
      'Cérebro da operação e agentes de IA para engenharia de produto, normas e ensaios, rastreabilidade por número de série e assistência técnica. Implantação por etapas.',
  },
  hero: {
    eyebrow: 'Para indústrias de material elétrico e eletroeletrônicos',
    title: 'Norma, ensaio e número de série consultados numa pergunta',
    lead: 'A Torno junta ERP, documentação de engenharia, normas, relatórios de ensaio, rastreabilidade de série e chamados de assistência num cérebro da operação. Em cima dele, agentes de IA ajudam engenharia de produto, qualidade, assistência técnica, suprimentos e comercial. Implantamos por etapas, com a sua TI.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Plantas grandes e produto cada vez mais técnico',
    body: [
      'Santa Catarina tem 26 unidades locais de fabricação de máquinas, aparelhos e materiais elétricos com 250 ou mais pessoas ocupadas. Quinze delas têm 500 ou mais e reúnem 26.023 pessoas (IBGE, CEMPRE 2024).',
      'No Brasil, a indústria elétrica e eletrônica faturou R$ 270,8 bilhões em 2025, alta real de 4% sobre 2024, segundo o balanço de fim de ano da Abinee. Num setor em que cada produto responde a normas técnicas, ensaios e certificação, a informação que libera um lote ou responde a um cliente está espalhada por muitos documentos.',
    ],
    refs: [[1], [2]],
  },
  stats: [
    { value: '26', label: 'unidades de máquinas, aparelhos e materiais elétricos com 250 ou mais pessoas ocupadas em Santa Catarina', source: 1 },
    { value: '26.023', label: 'pessoas ocupadas nas 15 unidades do setor com 500 ou mais pessoas no estado', source: 1 },
    { value: 'R$ 270,8 bi', label: 'faturamento da indústria elétrica e eletrônica no Brasil em 2025', source: 2 },
  ],
  pains: {
    title: 'O que sobrecarrega uma fabricante de equipamentos elétricos',
    items: [
      {
        title: 'Engenharia consultada para tudo',
        body: 'Comercial, assistência e qualidade perguntam à engenharia qual norma se aplica, qual a revisão do produto e o que mudou entre versões.',
      },
      {
        title: 'Rastreabilidade de série em sistemas separados',
        body: 'Lote de componente, resultado do teste final e versão de firmware de cada número de série ficam em lugares diferentes.',
      },
      {
        title: 'Nova edição de norma vira projeto à parte',
        body: 'Quando uma norma muda, descobrir quais produtos, fichas, certificados e ensaios são afetados exige uma varredura manual.',
      },
      {
        title: 'Assistência sem a história do equipamento',
        body: 'O técnico recebe uma falha em campo e precisa da configuração, dos testes de saída e de falhas parecidas para decidir se troca, repara ou recolhe.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa indústria eletroeletrônica',
    intro:
      'Os exemplos abaixo são ilustrativos. Muitas vezes o primeiro piloto tira da engenharia as perguntas repetidas, e o diagnóstico confirma se é o caso.',
    items: [
      {
        area: 'Engenharia de produto',
        title: 'Revisões, normas e decisões de projeto',
        body: 'Busca em especificações, listas de materiais, relatórios de ensaio e registros de mudança, citando a revisão vigente.',
        example: '“Quais produtos usam o relé K-220 e que norma rege o ensaio de elevação de temperatura deles?”',
      },
      {
        area: 'Qualidade e ensaios',
        title: 'Teste final e não conformidade por série',
        body: 'Cruza teste final, lote de componentes e não conformidades por número de série, e prepara o rascunho da análise de causa.',
        example: '“As falhas de isolação desta semana vieram de qual lote de transformador?”',
      },
      {
        area: 'Normas e certificação',
        title: 'Impacto de mudança de norma',
        body: 'Lista produtos, documentos e ensaios afetados por uma nova edição de norma, para a engenharia decidir o que refazer.',
        example: '“Quais fichas técnicas e certificados citam a edição anterior desta norma?”',
      },
      {
        area: 'Assistência técnica',
        title: 'Histórico do equipamento pelo número de série',
        body: 'Configuração, firmware, resultado do teste final e chamados anteriores no celular do técnico.',
        example: '“O inversor série 24B-01877 saiu com qual firmware e já teve chamado?”',
      },
      {
        area: 'Comercial e suporte técnico',
        title: 'Respostas técnicas sem fila na engenharia',
        body: 'Ficha técnica, curvas, certificados e compatibilidades respondidos a partir de documentos aprovados.',
        example: '“Este disjuntor atende capacidade de interrupção de 10 kA? Envie o certificado.”',
      },
      {
        area: 'Suprimentos',
        title: 'Componente em falta e alternativa aprovada',
        body: 'Encontra alternativas já homologadas pela engenharia e os produtos afetados quando um componente falta.',
        example: '“Se faltar o capacitor C-4471, que alternativa já foi aprovada e em quais placas?”',
      },
    ],
  },
  mock: {
    question: 'O lote de placas 25-0412 passou no teste final com qual firmware e algum número de série falhou?',
    answer:
      'O lote 25-0412 tem 1.200 placas gravadas com o firmware 3.8.2 [1]. No teste final, 1.188 passaram de primeira. As 12 reprovações foram de tensão de saída fora da faixa, e todas usam regulador do lote de componentes R-2291 [2]. Nove já foram retrabalhadas e aprovadas no reteste [3].',
    citations: ['Registros de teste final, lote 25-0412', 'Rastreabilidade de componentes, ERP', 'Relatório de retrabalho RT-0933'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa indústria eletroeletrônica',
    body: [
      'O ERP ou o MES traz ordens de produção, lotes de componentes e expedição por número de série. A engenharia tem especificações, listas de materiais, registros de mudança e relatórios de ensaio. A qualidade tem testes finais e não conformidades. A assistência tem os chamados de campo.',
      'Ligamos tudo pelo número de série e pela revisão do produto. As normas técnicas entram com o controle de edição que a empresa já mantém. Cada resposta cita o documento e a revisão, e o acesso segue o perfil de cada área.',
    ],
    inputs: [
      'Ordens, lotes e expedição por série do ERP ou do MES',
      'Especificações, listas de materiais e registros de mudança',
      'Relatórios de ensaio e certificados',
      'Normas técnicas aplicáveis, com controle de edição',
      'Resultados de teste final',
      'Chamados de assistência e análises de falha',
      'Fichas técnicas e catálogos aprovados',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa fabricante com engenharia sobrecarregada',
    intro:
      'Uma indústria de equipamentos elétricos com cerca de 800 funcionários vê a engenharia de produto gastar boa parte da semana respondendo perguntas de comercial, qualidade e assistência.',
    steps: [
      {
        title: 'Diagnóstico',
        body: 'Durante o diagnóstico, a engenharia registra as consultas que recebe, de quem e sobre o quê. Com TI e diretoria, combinamos o critério de sucesso.',
      },
      {
        title: 'Base técnica',
        body: 'Especificações, revisões, ensaios e fichas técnicas aprovadas, com permissões por área.',
      },
      {
        title: 'Piloto com comercial e assistência',
        body: 'Essas áreas consultam o assistente antes de acionar a engenharia. O que ele não responde com fonte segue para a engenharia, como antes.',
      },
      {
        title: 'Expansão',
        body: 'Com o critério atingido, a qualidade passa a usar a rastreabilidade por número de série na mesma base.',
      },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real. Os números de porte servem só para dar escala ao exemplo.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA usado na operação de terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Ainda não temos case publicado em material elétrico e eletroeletrônicos, e por isso o trabalho no setor começa pelo diagnóstico.',
  },
  faq: [
    {
      q: 'Nossos projetos e firmware ficam protegidos?',
      a: 'Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela sua TI. Projetos, código e custos ficam restritos por perfil, o uso fica registrado e os dados não são usados para treinar modelos de terceiros. Assinamos acordo de confidencialidade antes do diagnóstico quando a empresa pede.',
    },
    {
      q: 'Funciona com o nosso ERP, MES e PLM?',
      a: 'Lemos os sistemas já implantados pelo caminho que a TI aprovar, seja API, réplica do banco ou exportação agendada. O diagnóstico mapeia onde está cada informação antes da proposta do piloto.',
    },
    {
      q: 'Dá para confiar numa resposta sobre norma?',
      a: 'O assistente responde só com o que está nos documentos da empresa e cita o documento e a revisão. Quando não encontra fonte, diz isso. Decisões de conformidade continuam com a engenharia.',
    },
    {
      q: 'Quem da nossa equipe precisa participar?',
      a: 'Um patrocinador na diretoria, um ponto focal da área do piloto e alguém da TI. A engenharia participa das entrevistas e valida a base técnica antes do piloto.',
    },
    {
      q: 'Quanto tempo leva e quanto custa?',
      a: 'O diagnóstico está planejado para 2 a 4 semanas e tem proposta fechada, assim como o piloto e cada etapa seguinte. A conversa inicial não tem custo.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quais perguntas mais chegam à sua engenharia e de quais áreas. Saímos da conversa com uma ideia de onde o diagnóstico começaria.',
  },
  sources: [
    {
      label: 'IBGE, CEMPRE 2024 (SIDRA, tabela 9529)',
      url: 'https://apisidra.ibge.gov.br/values/t/9529/n3/42/v/all/p/last/c319/all/c12762/all',
    },
    {
      label: 'Abinee, balanço 2025 (Mercado & Consumo, 04/12/2025)',
      url: 'https://mercadoeconsumo.com.br/04/12/2025/tecnologia/faturamento-do-setor-eletronico-fecha-2025-com-crescimento-real-de-4-ante-2024-diz-abinee/',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
