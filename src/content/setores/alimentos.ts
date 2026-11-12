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
    lead: 'A Torno reúne ERP, registros de BPF e APPCC, laudos, fichas de formulação e o histórico do SAC num cérebro da operação, com a fonte citada em cada resposta. Em cima dele, agentes de IA ajudam qualidade, PCP, manutenção e comercial. Implantamos por etapas, com a sua TI.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Plantas grandes, com muito registro para cruzar',
    body: [
      'Santa Catarina tem 70 unidades locais de fabricação de alimentos com 250 ou mais pessoas ocupadas, 49 delas com 500 ou mais, e 161.349 pessoas ocupadas no setor (IBGE, CEMPRE 2024). Nenhuma outra divisão da indústria de transformação do estado tem tantas unidades desse porte.',
      'No Brasil, a indústria de alimentos e bebidas faturou R$ 1,39 trilhão em 2025 e empregava 2,12 milhões de pessoas de forma direta, segundo a Abia. Numa planta desse tamanho, um recall ou uma auditoria de cliente pede o caminho completo de um lote, da matéria-prima à expedição, montado em horas com registros que estão em sistemas e pastas diferentes.',
    ],
    refs: [[1], [2]],
  },
  stats: [
    { value: '70', label: 'unidades de fabricação de alimentos com 250 ou mais pessoas ocupadas em Santa Catarina, 49 delas com 500 ou mais', source: 1 },
    { value: '161.349', label: 'pessoas ocupadas na fabricação de alimentos em Santa Catarina', source: 1 },
    { value: 'R$ 1,39 tri', label: 'faturamento da indústria de alimentos e bebidas no Brasil em 2025', source: 2 },
  ],
  pains: {
    title: 'O que toma o tempo da qualidade e do PCP',
    items: [
      {
        title: 'Rastrear um lote leva o dia todo',
        body: 'Para dizer de onde veio a matéria-prima de um lote e para onde ele foi, a qualidade cruza ERP, planilhas de recebimento, registros de produção e notas de expedição.',
      },
      {
        title: 'Auditoria preparada à mão',
        body: 'Registros de higienização, monitoramento dos pontos críticos de controle e verificações de BPF ficam espalhados entre papel e planilha. Preparar a auditoria de um cliente ocupa a equipe por dias.',
      },
      {
        title: 'Reclamação do SAC longe da produção',
        body: 'A reclamação de corpo estranho ou de sabor alterado chega com número de lote. Descobrir o que aconteceu naquela linha e naquele turno depende de procurar em vários lugares.',
      },
      {
        title: 'Programação com validade apertada',
        body: 'Programar produção com matéria-prima perecível e pedidos de redes exige ver estoque, validade e capacidade ao mesmo tempo. Esse cruzamento costuma ser feito em planilha.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa indústria de alimentos',
    intro:
      'Escolhemos a primeira área junto com a diretoria, pelo tempo que ela perde hoje. Os exemplos são ilustrativos.',
    items: [
      {
        area: 'Qualidade e segurança dos alimentos',
        title: 'Rastreabilidade de lote numa pergunta',
        body: 'O agente monta a árvore do lote, da matéria-prima ao cliente, com os registros de cada etapa, e prepara o rascunho do relatório de investigação.',
        example: '“Quais clientes receberam o lote 2411-B e quais lotes de matéria-prima entraram nele?”',
      },
      {
        area: 'SAC',
        title: 'Reclamação ligada à linha e ao turno',
        body: 'Cruza a reclamação com lote, linha, turno e não conformidades da época, e sugere a resposta ao consumidor a partir de textos aprovados pela qualidade.',
        example: '“Houve outra reclamação de embalagem estufada do mesmo lote ou da mesma semana?”',
      },
      {
        area: 'PCP',
        title: 'Programação que enxerga a validade',
        body: 'Consulta estoque por validade, carteira de pedidos e capacidade de linha, e aponta o que vai vencer antes de ser usado.',
        example: '“Que matérias-primas vencem nos próximos dez dias sem ordem de produção programada?”',
      },
      {
        area: 'P&D e formulação',
        title: 'Histórico de formulação consultável',
        body: 'Fichas de formulação, testes de bancada e o motivo de cada mudança de fórmula ficam consultáveis, com controle de quem pode ver cada receita.',
        example: '“Por que trocamos o estabilizante da bebida láctea sabor morango e quando?”',
      },
      {
        area: 'Manutenção',
        title: 'Histórico do equipamento na linha',
        body: 'Manual, plano preventivo, ordens de serviço anteriores e o procedimento de higienização depois da intervenção, consultados no celular do técnico.',
        example: '“Quando foi a última troca de rolamento da envasadora 3 e qual higienização vem depois?”',
      },
      {
        area: 'Comercial',
        title: 'Documentos para redes e distribuidores',
        body: 'Prazo, disponibilidade, especificação técnica e laudos para o cliente, a partir dos dados que a qualidade já aprovou.',
        example: '“Envie a ficha técnica e o laudo microbiológico do lote faturado na nota 55120.”',
      },
    ],
  },
  mock: {
    question: 'De onde veio o leite em pó usado no lote 2411-B e o lote passou pela verificação do PCC 2?',
    answer:
      'O lote 2411-B usou leite em pó do recebimento 7782, com laudo do fornecedor aprovado na inspeção de entrada [1]. O registro do PCC 2, tratamento térmico, mostra temperatura dentro do limite nas cinco verificações do turno A [2]. O lote foi expedido para quatro clientes, listados no relatório de expedição [3].',
    citations: [
      'Registro de recebimento 7782',
      'Planilha de monitoramento do PCC 2, turno A',
      'Notas de expedição do lote 2411-B, ERP',
    ],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa indústria de alimentos',
    body: [
      'O ERP traz recebimento, ordens de produção, estoque por lote e validade, e expedição. A qualidade tem o plano APPCC, os registros de BPF, laudos e não conformidades. P&D tem fichas de formulação e especificações. O SAC tem o histórico de reclamações.',
      'Ligamos essas fontes pelo número do lote, que é o que todas têm em comum. As respostas citam o registro de origem e o acesso segue o perfil de cada pessoa. Fórmulas ficam visíveis só para quem a empresa autorizar.',
    ],
    inputs: [
      'Recebimento, OPs, estoque por lote e expedição do ERP',
      'Plano APPCC e registros de monitoramento',
      'Registros de BPF e de higienização',
      'Laudos de fornecedores e do laboratório',
      'Fichas de formulação e especificações de produto',
      'Histórico de reclamações do SAC',
      'Planos de manutenção e manuais dos equipamentos',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa planta com rastreabilidade manual',
    intro:
      'Uma indústria de alimentos com cerca de 1.200 funcionários leva horas para responder a uma consulta de rastreabilidade de lote. Veja como um piloto na qualidade poderia correr.',
    steps: [
      {
        title: 'Diagnóstico',
        body: 'Entrevistas com qualidade, PCP, SAC e TI. Cronometramos uma simulação de rastreabilidade com a equipe e definimos o critério de sucesso.',
      },
      {
        title: 'Base ligada pelo lote',
        body: 'Leitura do ERP e das planilhas de recebimento e expedição, ligadas pelo número do lote. Os registros de APPCC entram numa segunda leva.',
      },
      {
        title: 'Piloto na qualidade',
        body: 'A equipe usa o assistente nas consultas do dia e numa nova simulação de recall. Respostas sem fonte suficiente vão para revisão humana.',
      },
      {
        title: 'Próxima etapa',
        body: 'Com o critério atingido, o SAC passa a usar a mesma base para ligar cada reclamação a lote, linha e turno.',
      },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real. Os números de porte servem só para dar escala ao exemplo.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA que apoia a operação de terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Em alimentos e bebidas ainda não temos case publicado, e por isso começamos pelo diagnóstico, com um critério de sucesso medido antes e depois do piloto.',
  },
  faq: [
    {
      q: 'Nossas fórmulas ficam seguras?',
      a: 'Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela sua TI. Fórmulas e custos ficam restritos aos perfis que a empresa definir, o uso fica registrado e os dados não são usados para treinar modelos de terceiros. Assinamos acordo de confidencialidade antes do diagnóstico quando a empresa pede.',
    },
    {
      q: 'Precisamos trocar de ERP ou de sistema de qualidade?',
      a: 'Não. Lemos o que já existe, seja TOTVS, SAP, Senior ou outro sistema, e as planilhas da qualidade. A ligação é de leitura, pelo caminho que a TI aprovar. O diagnóstico mapeia cada fonte antes da proposta do piloto.',
    },
    {
      q: 'Quem da nossa equipe precisa participar?',
      a: 'Um patrocinador na diretoria, um ponto focal da área do piloto, em geral a qualidade, e alguém da TI para os acessos. No diagnóstico entrevistamos também PCP, SAC e manutenção.',
    },
    {
      q: 'Quanto tempo até ter algo funcionando?',
      a: 'O diagnóstico está planejado para 2 a 4 semanas. O piloto vem em seguida, numa área e num problema, com prazo e critério de sucesso definidos na proposta.',
    },
    {
      q: 'Quanto custa?',
      a: 'A conversa inicial não tem custo. O diagnóstico e cada etapa seguinte têm proposta fechada, montada a partir do que encontrarmos na sua operação.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quanto tempo a sua equipe leva hoje para rastrear um lote ou responder a uma auditoria. Saímos da conversa sabendo se faz sentido um diagnóstico e quem precisa estar nele.',
  },
  sources: [
    {
      label: 'IBGE, CEMPRE 2024 (SIDRA, tabela 9529)',
      url: 'https://apisidra.ibge.gov.br/values/t/9529/n3/42/v/all/p/last/c319/all/c12762/all',
    },
    {
      label: 'Abia, balanço 2025 (Agência Brasil via O Povo, 10/03/2026)',
      url: 'https://www.opovo.com.br/noticias/economia/2026/03/10/industria-de-alimentos-e-bebidas-cresceu-8-em-2025-diz-abia.html',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
