import type { SectorLanding } from './types';

export const setor: SectorLanding = {
  slug: 'plasticos',
  sectorName: 'plásticos e embalagens',
  meta: {
    title: 'IA para indústrias de plásticos e embalagens | Torno',
    description:
      'Cérebro da operação e agentes de IA para setup de molde, troca de cor, refugo, ferramentaria e laudos para clientes de embalagem. Implantação por etapas, a partir de um diagnóstico.',
  },
  hero: {
    eyebrow: 'Para indústrias de plásticos e embalagens',
    title: 'O setup que deu certo, à mão antes da próxima troca de molde',
    lead: 'A Torno junta ERP, fichas de processo, histórico de setup, refugo e o saber dos preparadores num cérebro da operação. Em cima dele, agentes de IA atendem processo, PCP, qualidade e ferramentaria. Implantamos por etapas, com a sua TI.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'A IA chegou ao escritório antes de chegar à máquina',
    body: [
      'Entre as indústrias brasileiras que usam IA, 87,9% a aplicam na administração (IBGE). Na injetora, na sopradora e na extrusora, o processo ainda vive nas fichas e na experiência de quem faz o setup.',
    ],
    refs: [[1]],
  },
  adoption: {
    useAI: 'cerca de 4 em 10',
    inProduction: 'cerca de 2 em 10',
    reading: 'Poucas transformadoras levaram a IA para a injetora e a extrusora. Na produção, ainda dá para estar entre as primeiras.',
    source: 1,
  },
  proofPoints: [
    {
      value: 'cerca de 1 em 5',
      label: 'indústrias brasileiras usa IA na produção',
      context: 'Indústria de transformação, todos os setores, segundo o IBGE',
      area: 'Produção',
      source: 0,
      scope: 'vizinho',
    },
    {
      value: 'mais de 80%',
      label: 'de acerto na previsão de falhas de qualidade, num piloto com IA',
      context: 'Indústria de outro setor, em SC, segundo a empresa',
      area: 'Qualidade',
      source: 2,
      scope: 'vizinho',
    },
    {
      value: '+10%',
      label: 'de disponibilidade dos equipamentos, aproximadamente, em três anos com diagnóstico de falha por IA',
      context: 'Indústria de outro setor, em SC, segundo a empresa',
      area: 'Manutenção',
      source: 3,
      scope: 'vizinho',
    },
  ],
  help: {
    title: 'Onde entramos e o que medimos',
    intro: 'No piloto, medimos o indicador da área antes e depois. O diagnóstico escolhe por onde começar.',
    items: [
      {
        area: 'Processo e setup',
        problem: 'O molde só roda bem com o ajuste que um preparador conhece, e quando ele falta o setup demora.',
        whatWeDo: 'Um agente traz a ficha, os últimos setups aprovados e as observações dos preparadores para cada molde e máquina.',
        measure: 'Tempo de setup e refugo de partida por turno',
      },
      {
        area: 'PCP',
        problem: 'Purga, tempo de troca e peças descartadas ficam em apontamentos separados.',
        whatWeDo: 'O agente cruza carteira, moldes e resina e sugere sequências que agrupam cores e materiais.',
        measure: 'Horas e material perdidos em troca de cor por semana',
      },
      {
        area: 'Ferramentaria',
        problem: 'Ciclos, manutenções e problemas de cada molde estão entre ERP, planilhas e o caderno da ferramentaria.',
        whatWeDo: 'A vida do molde fica numa consulta, no celular do ferramenteiro.',
        measure: 'Paradas não planejadas por molde',
      },
      {
        area: 'Comercial e qualidade',
        problem: 'Comprador de embalagem pede ficha técnica, certificado da resina e laudo por lote, e o comercial depende da qualidade.',
        whatWeDo: 'O comercial libera documentos que a qualidade já aprovou, sem abrir chamado.',
        measure: 'Tempo para enviar um laudo ao cliente',
      },
    ],
  },
  pains: {
    title: 'Onde a perda aparece numa transformadora',
    items: [
      {
        title: 'Cada preparador regula de um jeito',
        body: 'O molde só roda bem com o ajuste que o preparador do turno B conhece. Quando ele falta, o setup demora e o refugo de partida sobe.',
      },
      {
        title: 'Troca de cor e de resina sem conta fechada',
        body: 'Purga, tempo de troca e descarte ficam em apontamentos separados. Fica difícil saber qual sequência perde menos.',
      },
      {
        title: 'Histórico do molde espalhado',
        body: 'Manutenções, ciclos e problemas recorrentes de cada molde estão entre o ERP, planilhas e o caderno da ferramentaria.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa indústria de plásticos',
    intro: 'Exemplos ilustrativos. No diagnóstico escolhemos a área em que o ganho é mais fácil de medir, muitas vezes o setup.',
    items: [
      {
        area: 'Processo e setup',
        title: 'Parâmetros que funcionaram, por molde e máquina',
        body: 'Ficha de processo, últimos setups aprovados e observações dos preparadores para cada molde, máquina e resina.',
        example: '“Que parâmetros usamos no molde 214 na injetora 9 da última vez que rodou sem rebarba?”',
      },
      {
        area: 'PCP',
        title: 'Sequência com menos troca de cor',
        body: 'Consulta carteira, moldes, máquinas e estoque de resina, e sugere sequências que agrupam cores e materiais.',
        example: '“Qual sequência para a semana reduz as trocas de cor na linha de sopro?”',
      },
      {
        area: 'Qualidade',
        title: 'Refugo com causa registrada',
        body: 'Reúne refugo, não conformidades e ações anteriores por item, molde e turno, e prepara o rascunho da análise.',
        example: '“Qual o histórico de chupagem na tampa 38 mm e o que resolveu da última vez?”',
      },
      {
        area: 'Ferramentaria',
        title: 'Vida do molde na bancada',
        body: 'Ciclos, preventivas, peças de reposição e desenhos do molde no celular do ferramenteiro.',
        example: '“Quantos ciclos o molde 214 tem desde a última revisão e quais peças foram trocadas?”',
      },
    ],
  },
  mock: {
    question: 'Qual setup funcionou para o molde 214 na injetora 9 com PP reciclado?',
    answer:
      'O último setup aprovado foi no turno B, com 225 °C na zona 3, recalque de 4,2 s e resfriamento de 11 s [1]. O preparador registrou que, com PP reciclado, a pressão de recalque precisa subir cerca de 5% para evitar chupagem [2]. O refugo da OP ficou em 1,8% [3].',
    citations: ['Ficha de processo 214-INJ09, rev. F', 'Observação do preparador, turno B', 'Apontamento de setup, OP 51877'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa transformadora',
    body: [
      'Carteira, apontamentos, fichas de processo, histórico de moldes e refugo entram ligados por molde, máquina e item, as chaves que o chão de fábrica já usa. O saber dos preparadores entra em entrevistas revisadas por eles, e cada resposta cita a fonte.',
    ],
    inputs: [
      'Carteira, OPs e apontamentos do ERP ou do MES',
      'Fichas de processo por molde e máquina',
      'Histórico de setup, troca de cor e refugo',
      'Histórico de manutenção de moldes',
      'Entrevistas com preparadores e técnicos de processo',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa injetora com muitas trocas de molde',
    intro: 'Uma indústria de injeção faz dezenas de setups por semana, e o tempo de cada um varia muito entre turnos.',
    steps: [
      {
        title: 'Diagnóstico',
        body: 'Levantamos o tempo de setup e o refugo de partida por turno nas últimas semanas e combinamos o critério de sucesso.',
      },
      {
        title: 'Base de processo',
        body: 'Fichas, apontamentos de setup e entrevistas com os preparadores de referência, por molde e máquina.',
      },
      {
        title: 'Piloto numa célula',
        body: 'Os preparadores consultam o assistente no tablet antes de cada setup e registram o que ajustaram.',
      },
      {
        title: 'Expansão',
        body: 'Com o critério atingido, a base se estende às outras células e à ferramentaria.',
      },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA usado em terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Ainda não temos case publicado em plásticos e embalagens.',
  },
  faq: [
    {
      q: 'Nossos parâmetros de processo ficam protegidos?',
      a: 'Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela TI, com acesso por perfil e registro de uso, e não treinam modelos de terceiros.',
    },
    {
      q: 'Funciona com o nosso ERP e com o apontamento das máquinas?',
      a: 'Lemos o ERP e o MES já implantados, pelo caminho que a TI aprovar. Onde o apontamento ainda é em papel, o diagnóstico avalia se vale começar por um registro simples.',
    },
    {
      q: 'E o conhecimento dos preparadores mais antigos?',
      a: 'Entrevistamos os preparadores de referência e acompanhamos setups. Eles revisam o que foi escrito, e cada ajuste fica com o nome de quem validou.',
    },
    {
      q: 'Quanto tempo leva e quanto custa?',
      a: 'O diagnóstico está planejado para 2 a 4 semanas. A conversa inicial não tem custo, e cada etapa depois dela tem proposta fechada, com prazo e critério de sucesso.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quantos setups a fábrica faz por semana e onde o refugo mais pesa. Saímos com uma ideia de onde o diagnóstico começaria.',
  },
  sources: [
    {
      label: 'IBGE, PINTEC Semestral 2024, Indicadores Temáticos (set/2025)',
      url: 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102203.pdf',
    },
    {
      label: 'IBGE, PINTEC Semestral 2024, indicadores por atividade (tab. 1.3.3)',
      url: 'https://ftp.ibge.gov.br/Industrias_Extrativas_e_de_Transformacao/Pesquisa_de_Inovacao_Semestral/2024/Indicadores_tematicos/PINTEC_Semestral_2024_Indicadores_Tematicos_CNAE.xlsx',
    },
    {
      label: 'Relatório de sustentabilidade 2024-25 da empresa (resultado segundo a empresa)',
      url: 'https://api.mziq.com/mzfilemanager/v2/d/5ab6a371-dd2f-452a-b6b2-22c97ed0abbb/174ba274-ed95-dce2-b1aa-edb9708eb643?origin=2',
    },
    {
      label: 'Artigo técnico da empresa, nov/2023 (resultado segundo a empresa)',
      url: 'https://www.industriaquimica.es/descargar_documento/Weg7.pdf',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
