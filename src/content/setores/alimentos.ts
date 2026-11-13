import type { SectorLanding } from './types';

export const setor: SectorLanding = {
  slug: 'alimentos',
  sectorName: 'alimentos e bebidas',
  meta: {
    title: 'IA para indústrias de alimentos e bebidas | Torno',
    description:
      'Cérebro da operação e agentes de IA para rastreabilidade de lote, BPF e APPCC, SAC, PCP com perecíveis e manutenção. Implantação por etapas, a partir de um diagnóstico.',
  },
  hero: {
    eyebrow: 'Para indústrias de alimentos e bebidas',
    title: 'Do lote à reclamação do SAC, a resposta com a fonte',
    lead: 'A Torno reúne ERP, registros de BPF e APPCC, laudos, fórmulas e o histórico do SAC num cérebro da operação. Em cima dele, agentes de IA ajudam qualidade, PCP, manutenção e comercial. Implantamos por etapas, com a sua TI.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Plantas grandes, com muito registro para cruzar',
    body: [
      'Santa Catarina tem mais unidades de alimentos com 250 ou mais pessoas ocupadas do que qualquer outra divisão da sua indústria (IBGE). Nessas plantas, um recall ou uma auditoria de cliente pede o caminho de um lote montado em horas.',
    ],
    refs: [[1]],
  },
  adoption: {
    useAI: 'cerca de 4 em 10',
    inProduction: 'cerca de 2 em 10',
    reading: 'A maior parte do uso de IA no setor está no escritório. Na linha, na qualidade e na manutenção, poucas plantas começaram.',
    source: 1,
  },
  proofPoints: [
    {
      value: '5 mil h/mês',
      label: 'de trabalho que a empresa estima poupar com um assistente de IA que acompanha 2.000 veículos de entrega',
      context: 'Processadora de proteínas, segundo a empresa',
      area: 'Logística',
      source: 2,
      scope: 'setor',
    },
    {
      value: '−4%',
      label: 'de consumo de energia nas plantas, com IA ajustando 76 equipamentos',
      context: 'Cervejaria, segundo a empresa',
      area: 'Utilidades e manutenção',
      source: 3,
      scope: 'setor',
    },
  ],
  help: {
    title: 'Onde entramos e o que medimos',
    intro: 'No piloto, medimos o indicador da área antes e depois. O diagnóstico escolhe por onde começar.',
    items: [
      {
        area: 'Qualidade',
        problem: 'Rastrear um lote cruza ERP, planilhas de recebimento, registros de produção e notas de expedição.',
        whatWeDo: 'Um agente monta a árvore do lote, da matéria-prima ao cliente, com o registro de cada etapa.',
        measure: 'Tempo para fechar uma rastreabilidade de lote',
      },
      {
        area: 'Auditoria e BPF',
        problem: 'Registros de higienização e de PCC ficam entre papel e planilha, e a auditoria de cliente toma dias.',
        whatWeDo: 'Os registros entram numa base consultável e o agente reúne as evidências pedidas.',
        measure: 'Horas da equipe para preparar uma auditoria',
      },
      {
        area: 'SAC',
        problem: 'A reclamação chega com o lote, e descobrir o que houve na linha e no turno exige procurar em vários lugares.',
        whatWeDo: 'O agente liga a reclamação a lote, linha, turno e não conformidades da época.',
        measure: 'Tempo de resposta ao consumidor',
      },
      {
        area: 'PCP',
        problem: 'Programar com perecíveis pede ver validade, carteira e capacidade ao mesmo tempo, e isso vive em planilha.',
        whatWeDo: 'O agente aponta o que vai vencer sem ordem de produção programada.',
        measure: 'Matéria-prima vencida ou descartada por mês',
      },
    ],
  },
  pains: {
    title: 'O que toma o tempo da qualidade e do PCP',
    items: [
      {
        title: 'Rastrear um lote leva o dia todo',
        body: 'Para dizer de onde veio a matéria-prima e para onde o lote foi, a qualidade cruza ERP, planilhas de recebimento, produção e expedição.',
      },
      {
        title: 'Auditoria preparada à mão',
        body: 'Higienização, monitoramento de PCC e verificações de BPF ficam entre papel e planilha. A auditoria de um cliente ocupa a equipe por dias.',
      },
      {
        title: 'Reclamação do SAC longe da produção',
        body: 'A reclamação chega com número de lote. Saber o que aconteceu naquela linha e naquele turno exige procurar em vários lugares.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa indústria de alimentos',
    intro: 'A primeira área sai do diagnóstico, pelo tempo que ela perde hoje. Os exemplos são ilustrativos.',
    items: [
      {
        area: 'Qualidade e segurança dos alimentos',
        title: 'Rastreabilidade de lote numa pergunta',
        body: 'Monta a árvore do lote, da matéria-prima ao cliente, e prepara o rascunho do relatório de investigação.',
        example: '“Quais clientes receberam o lote 2411-B e quais lotes de matéria-prima entraram nele?”',
      },
      {
        area: 'SAC',
        title: 'Reclamação ligada à linha e ao turno',
        body: 'Cruza a reclamação com lote, linha e turno, e sugere a resposta a partir de textos aprovados pela qualidade.',
        example: '“Houve outra reclamação de embalagem estufada do mesmo lote ou da mesma semana?”',
      },
      {
        area: 'PCP',
        title: 'Programação que enxerga a validade',
        body: 'Consulta estoque por validade, carteira e capacidade de linha, e aponta o que vai vencer antes de ser usado.',
        example: '“Que matérias-primas vencem nos próximos dez dias sem ordem de produção programada?”',
      },
      {
        area: 'P&D e formulação',
        title: 'Histórico de formulação consultável',
        body: 'Fórmulas, testes de bancada e o motivo de cada mudança, com controle de quem vê cada receita.',
        example: '“Por que trocamos o estabilizante da bebida láctea sabor morango e quando?”',
      },
    ],
  },
  mock: {
    question: 'De onde veio o leite em pó usado no lote 2411-B e o lote passou pela verificação do PCC 2?',
    answer:
      'Do recebimento 7782, com laudo do fornecedor aprovado na entrada [1]. O PCC 2, tratamento térmico, ficou dentro do limite nas cinco verificações do turno A [2]. O lote foi expedido para quatro clientes [3].',
    citations: [
      'Registro de recebimento 7782',
      'Planilha de monitoramento do PCC 2, turno A',
      'Notas de expedição do lote 2411-B, ERP',
    ],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa indústria de alimentos',
    body: [
      'ERP, APPCC, BPF, laudos, fórmulas e SAC entram ligados pelo número do lote, que todas as fontes têm em comum. Cada resposta cita o registro de origem, e fórmulas ficam visíveis só para quem a empresa autorizar.',
    ],
    inputs: [
      'Recebimento, OPs, lotes e expedição do ERP',
      'APPCC, BPF e registros de higienização',
      'Laudos de fornecedores e do laboratório',
      'Fórmulas e especificações de produto',
      'Reclamações do SAC',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa planta com rastreabilidade manual',
    intro: 'Uma indústria de alimentos leva horas para responder a uma consulta de rastreabilidade. Um piloto na qualidade poderia correr assim.',
    steps: [
      {
        title: 'Diagnóstico',
        body: 'Entrevistas com qualidade, PCP, SAC e TI. Cronometramos uma simulação de rastreabilidade e definimos o critério de sucesso.',
      },
      {
        title: 'Base ligada pelo lote',
        body: 'Leitura do ERP e das planilhas de recebimento e expedição, ligadas pelo lote. O APPCC entra numa segunda leva.',
      },
      {
        title: 'Piloto na qualidade',
        body: 'A equipe usa o assistente no dia a dia e numa nova simulação de recall. Respostas sem fonte suficiente vão para revisão humana.',
      },
      {
        title: 'Próxima etapa',
        body: 'Com o critério atingido, o SAC passa a usar a mesma base.',
      },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA usado em terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Ainda não temos case publicado em alimentos e bebidas.',
  },
  faq: [
    {
      q: 'Nossas fórmulas ficam seguras?',
      a: 'Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela TI. Fórmulas ficam restritas aos perfis que a empresa definir, o uso fica registrado e os dados não treinam modelos de terceiros.',
    },
    {
      q: 'Precisamos trocar de ERP ou de sistema de qualidade?',
      a: 'Não. Lemos o que já existe, seja TOTVS, SAP, Senior ou outro, e as planilhas da qualidade, pelo caminho que a TI aprovar.',
    },
    {
      q: 'Quanto tempo leva e quanto custa?',
      a: 'O diagnóstico está planejado para 2 a 4 semanas. A conversa inicial não tem custo, e cada etapa depois dela tem proposta fechada, com prazo e critério de sucesso.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quanto tempo a equipe leva hoje para rastrear um lote ou responder a uma auditoria. Saímos sabendo se o diagnóstico faz sentido e quem precisa estar nele.',
  },
  sources: [
    {
      label: 'IBGE, CEMPRE 2024 (SIDRA, tabela 9529)',
      url: 'https://apisidra.ibge.gov.br/values/t/9529/n3/42/v/all/p/last/c319/all/c12762/all',
    },
    {
      label: 'IBGE, PINTEC Semestral 2024, indicadores por atividade (tab. 1.3.3)',
      url: 'https://ftp.ibge.gov.br/Industrias_Extrativas_e_de_Transformacao/Pesquisa_de_Inovacao_Semestral/2024/Indicadores_tematicos/PINTEC_Semestral_2024_Indicadores_Tematicos_CNAE.xlsx',
    },
    {
      label: 'SuperVarejo, set/2026 (estimativa segundo a empresa)',
      url: 'https://supervarejo.com.br/industria/seara-adota-inteligencia-artificial-para-ampliar-eficiencia-logistica-na-rota-de-entregas',
    },
    {
      label: 'Mercado&Consumo, 27/09/2023 (resultado segundo a empresa)',
      url: 'https://mercadoeconsumo.com.br/27/09/2023/economia/ambev-aumenta-eficiencia-com-a-implantacao-de-ia-em-suas-operacoes/',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
