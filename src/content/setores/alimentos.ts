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
    lead: 'A Torno reúne ERP, registros de BPF e APPCC, laudos, fórmulas e o histórico do SAC num cérebro da operação. Em cima dele, agentes de IA ajudam qualidade, PCP, manutenção e comercial.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Plantas grandes, com muito registro para cruzar',
    body: [
      'Santa Catarina tem mais unidades de alimentos com 250 ou mais pessoas ocupadas do que qualquer outra divisão da sua indústria (IBGE). Nelas, um recall pede o caminho de um lote em horas.',
    ],
    refs: [[1]],
  },
  adoption: {
    useAI: 'cerca de 4 em 10',
    inProduction: 'cerca de 2 em 10',
    reading: 'Cerca de 8 em 10 plantas ainda não usam IA na produção. Na linha, na qualidade e na manutenção, há espaço para sair na frente.',
    source: 1,
  },
  proofPoints: [
    {
      value: '5 mil h/mês',
      label: 'de trabalho que a empresa estima poupar com um assistente que acompanha 2.000 veículos de entrega',
      context: 'Processadora de proteínas, segundo a empresa',
      area: 'Logística',
      source: 2,
      scope: 'setor',
    },
    {
      value: '−4%',
      label: 'de energia nas plantas, com IA ajustando 76 equipamentos',
      context: 'Cervejaria, segundo a empresa',
      area: 'Utilidades e manutenção',
      source: 3,
      scope: 'setor',
    },
  ],
  help: {
    title: 'Onde entramos e o que medimos',
    intro: 'Em cada piloto medimos o indicador da área antes e depois. O diagnóstico escolhe por onde começar.',
    items: [
      {
        area: 'Qualidade',
        problem: 'Rastrear um lote cruza ERP, planilhas de recebimento, produção e expedição.',
        whatWeDo: 'Um agente monta a árvore do lote, da matéria-prima ao cliente, com o registro de cada etapa.',
        measure: 'Tempo para fechar uma rastreabilidade de lote',
      },
      {
        area: 'Auditoria e BPF',
        problem: 'Registros de higienização e de PCC ficam entre papel e planilha.',
        whatWeDo: 'Os registros entram numa base consultável e o agente reúne as evidências pedidas.',
        measure: 'Horas da equipe para preparar uma auditoria',
      },
      {
        area: 'SAC',
        problem: 'A reclamação chega com o lote, e o que houve na linha está em vários lugares.',
        whatWeDo: 'O agente liga a reclamação a lote, linha, turno e não conformidades da época.',
        measure: 'Tempo de resposta ao consumidor',
      },
      {
        area: 'PCP',
        problem: 'Validade, carteira e capacidade de linha vivem em planilhas separadas.',
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
        body: 'Dizer de onde veio a matéria-prima e para onde o lote foi exige cruzar quatro fontes.',
      },
      {
        title: 'Auditoria preparada à mão',
        body: 'A auditoria de um cliente ocupa a equipe de qualidade por dias.',
      },
      {
        title: 'Reclamação do SAC longe da produção',
        body: 'Saber o que aconteceu naquela linha e naquele turno exige procurar em vários lugares.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa indústria de alimentos',
    intro: 'Exemplos ilustrativos. O diagnóstico define por onde começar.',
    items: [
      {
        area: 'Qualidade e segurança dos alimentos',
        title: 'Rastreabilidade de lote numa pergunta',
        body: 'Monta a árvore do lote e o rascunho do relatório de investigação.',
        example: '“Quais clientes receberam o lote 2411-B e que matérias-primas entraram nele?”',
      },
      {
        area: 'SAC',
        title: 'Reclamação ligada à linha e ao turno',
        body: 'Sugere a resposta a partir de textos aprovados pela qualidade.',
        example: '“Houve outra reclamação de embalagem estufada na mesma semana?”',
      },
      {
        area: 'PCP',
        title: 'Programação que enxerga a validade',
        body: 'Cruza estoque por validade, carteira e capacidade de linha.',
        example: '“Que matérias-primas vencem em dez dias sem ordem programada?”',
      },
      {
        area: 'P&D e formulação',
        title: 'Histórico de formulação consultável',
        body: 'Fórmulas, testes e o motivo de cada mudança, com controle de quem vê cada receita.',
        example: '“Por que trocamos o estabilizante da bebida láctea de morango?”',
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
      'ERP, APPCC, BPF, laudos, fórmulas e SAC entram ligados pelo número do lote. Cada resposta cita o registro de origem, e fórmulas ficam visíveis só para quem a empresa autorizar.',
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
    intro: 'Uma consulta de rastreabilidade leva horas. Um piloto na qualidade poderia correr assim.',
    steps: [
      { title: 'Diagnóstico', body: 'Cronometramos uma simulação de rastreabilidade e combinamos o critério de sucesso.' },
      { title: 'Base ligada pelo lote', body: 'Leitura do ERP e das planilhas de recebimento e expedição. O APPCC entra depois.' },
      { title: 'Piloto na qualidade', body: 'A equipe usa o assistente numa nova simulação de recall. Respostas sem fonte vão para revisão.' },
      { title: 'Próxima etapa', body: 'Com o critério atingido, o SAC passa a usar a mesma base.' },
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
      a: 'Os dados ficam na sua infraestrutura ou numa nuvem aprovada pela TI. Fórmulas ficam restritas aos perfis que a empresa definir, e os dados não treinam modelos de terceiros.',
    },
    {
      q: 'Precisamos trocar de ERP ou de sistema de qualidade?',
      a: 'Não. Lemos o que já existe, seja TOTVS, SAP, Senior ou planilhas, pelo caminho que a TI aprovar.',
    },
    {
      q: 'Quanto tempo leva e quanto custa?',
      a: 'O diagnóstico leva de 2 a 4 semanas. A conversa inicial não tem custo, e cada etapa tem proposta fechada.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quanto tempo a equipe leva hoje para rastrear um lote. Saímos sabendo se o diagnóstico faz sentido.',
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
