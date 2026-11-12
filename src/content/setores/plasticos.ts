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
    lead: 'A Torno junta ERP, fichas de processo, histórico de setup, apontamentos de refugo e o saber dos preparadores num cérebro da operação. Em cima dele, agentes de IA atendem PCP, processo, qualidade, ferramentaria e comercial. Implantamos por etapas, com a sua TI.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'A IA chegou ao escritório antes de chegar à máquina',
    body: [
      'Santa Catarina tem 40 unidades locais de fabricação de produtos de borracha e de material plástico com 250 ou mais pessoas ocupadas, e o setor ocupa 51.762 pessoas no estado (IBGE, CEMPRE 2024).',
      'Na indústria grande, a IA já está em uso. Pela Pintec Semestral do IBGE, 57,5% das indústrias com mais de 500 empregados usavam alguma ferramenta de IA em 2024, e as áreas mais citadas por quem usa são administração (87,9%) e comercialização (75,2%). Na injetora, na sopradora e na extrusora, o conhecimento de processo continua nas fichas e na experiência de quem faz o setup.',
    ],
  },
  pains: {
    title: 'Onde a perda aparece numa transformadora',
    items: [
      {
        title: 'Cada preparador regula de um jeito',
        body: 'A ficha de processo diz uma coisa e o molde só roda bem com o ajuste que o preparador do turno B conhece. Quando ele falta, o setup demora e o refugo de partida sobe.',
      },
      {
        title: 'Troca de cor e de resina sem conta fechada',
        body: 'Purga, tempo de troca e peças descartadas ficam em apontamentos separados. Fica difícil saber qual sequência de produção perde menos.',
      },
      {
        title: 'Histórico do molde espalhado',
        body: 'Manutenções, ciclos, peças trocadas e problemas recorrentes de cada molde estão entre o ERP, planilhas e o caderno da ferramentaria.',
      },
      {
        title: 'Cliente pede laudo para ontem',
        body: 'Compradores de embalagem pedem ficha técnica, certificado da resina e laudo por lote. O comercial depende da qualidade para cada resposta.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa indústria de plásticos',
    intro:
      'Os exemplos abaixo são ilustrativos. No diagnóstico escolhemos a área em que o ganho é mais fácil de medir, muitas vezes o setup.',
    items: [
      {
        area: 'Processo e setup',
        title: 'Parâmetros que funcionaram, por molde e máquina',
        body: 'O agente traz a ficha de processo, os últimos setups aprovados e as observações dos preparadores para a combinação de molde, máquina e resina.',
        example: '“Que parâmetros usamos no molde 214 na injetora 9 da última vez que rodou sem rebarba?”',
      },
      {
        area: 'PCP',
        title: 'Sequência com menos troca de cor',
        body: 'Consulta carteira, disponibilidade de molde e máquina e estoque de resina e masterbatch, e sugere sequências que agrupam cores e materiais.',
        example: '“Qual sequência para a semana reduz as trocas de cor na linha de sopro?”',
      },
      {
        area: 'Qualidade',
        title: 'Refugo com causa registrada',
        body: 'Reúne apontamentos de refugo, não conformidades e ações anteriores por item, molde e turno, e prepara o rascunho da análise.',
        example: '“Qual o histórico de chupagem na tampa 38 mm e o que resolveu da última vez?”',
      },
      {
        area: 'Ferramentaria',
        title: 'Vida do molde na bancada',
        body: 'Ciclos, manutenções preventivas, peças de reposição e desenhos do molde, consultados no celular do ferramenteiro.',
        example: '“Quantos ciclos o molde 214 tem desde a última revisão e quais peças foram trocadas?”',
      },
      {
        area: 'Comercial',
        title: 'Especificação e laudo sem fila na qualidade',
        body: 'Ficha técnica, certificados de resina e laudos por lote liberados ao cliente pelo comercial, a partir do que a qualidade já aprovou.',
        example: '“Envie o laudo dimensional e o certificado da resina do lote faturado para este cliente.”',
      },
      {
        area: 'Suprimentos',
        title: 'Resina e masterbatch na medida da carteira',
        body: 'Consumo previsto pela carteira cruzado com estoque e prazo de cada fornecedor.',
        example: '“Temos PEAD suficiente para a carteira das próximas três semanas?”',
      },
    ],
  },
  mock: {
    question: 'Qual setup funcionou para o molde 214 na injetora 9 com PP reciclado?',
    answer:
      'O último setup aprovado foi no turno B, com temperatura de 225 °C na zona 3, recalque de 4,2 s e resfriamento de 11 s. O preparador registrou que, com PP reciclado, a pressão de recalque precisa subir cerca de 5% para evitar chupagem. O refugo daquela OP ficou em 1,8%.',
    citations: ['Ficha de processo 214-INJ09, rev. F', 'Apontamento de setup, OP 51877', 'Observação do preparador, turno B'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa transformadora',
    body: [
      'O ERP ou o MES traz carteira, ordens de produção, estoque de resina e apontamentos. A engenharia de processo tem as fichas por molde e máquina. A ferramentaria guarda o histórico de cada molde. A qualidade tem refugo, não conformidades e laudos.',
      'Ligamos tudo por molde, máquina e item, as chaves que o chão de fábrica já usa. Registramos também o que os preparadores mais experientes sabem, em entrevistas revisadas por eles. Cada resposta cita a fonte e cada perfil vê só o que precisa.',
    ],
    inputs: [
      'Carteira, OPs e apontamentos do ERP ou do MES',
      'Fichas de processo por molde e máquina',
      'Histórico de setup e de troca de cor',
      'Registros de refugo e não conformidades',
      'Histórico de manutenção de moldes',
      'Certificados de resina e laudos por lote',
      'Entrevistas com preparadores e técnicos de processo',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa injetora com muitas trocas de molde',
    intro:
      'Uma indústria de injeção com cerca de 600 funcionários e 80 injetoras faz dezenas de setups por semana, e o tempo de cada um varia muito entre turnos.',
    steps: [
      {
        title: 'Diagnóstico',
        body: 'Com processo, produção e TI, levantamos o tempo de setup e o refugo de partida por turno nas últimas semanas e combinamos o critério de sucesso.',
      },
      {
        title: 'Base de processo',
        body: 'Fichas de processo, apontamentos de setup e entrevistas com os preparadores de referência, organizados por molde e máquina.',
      },
      {
        title: 'Piloto numa célula',
        body: 'Os preparadores de uma célula consultam o assistente no tablet antes de cada setup e registram o que ajustaram. A engenharia de processo revisa as observações novas.',
      },
      {
        title: 'Expansão',
        body: 'Com o critério atingido, a base se estende às outras células e à ferramentaria.',
      },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real. Os números de porte servem só para dar escala ao exemplo.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA usado na operação de terminais de contêineres, onde o modelo só vale se a equipe de operação usa no turno. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Ainda não temos case publicado em plásticos e embalagens, então o primeiro passo é o diagnóstico.',
  },
  faq: [
    {
      q: 'Nossos parâmetros de processo ficam protegidos?',
      a: 'Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela sua TI, com acesso por perfil e registro de uso. Não usamos os dados da empresa para treinar modelos de terceiros. Assinamos acordo de confidencialidade antes do diagnóstico quando a empresa pede.',
    },
    {
      q: 'Funciona com o nosso ERP e com o apontamento das máquinas?',
      a: 'Lemos o ERP já implantado, seja TOTVS, SAP, Senior ou outro, e o MES ou o sistema de apontamento quando existir. Onde o apontamento ainda é em papel, o diagnóstico avalia se vale começar por um registro simples. A ligação é sempre aprovada pela TI.',
    },
    {
      q: 'O que acontece com o conhecimento dos preparadores mais antigos?',
      a: 'É uma das primeiras coisas que registramos. Entrevistamos os preparadores de referência, acompanhamos setups e escrevemos o que eles fazem. Eles revisam antes de entrar na base, e cada ajuste fica com o nome de quem validou.',
    },
    {
      q: 'Quem da nossa equipe precisa participar?',
      a: 'Um patrocinador na diretoria, um ponto focal da área do piloto, em geral processo ou produção, e alguém da TI para os acessos. Os preparadores participam das entrevistas e do piloto.',
    },
    {
      q: 'Quanto custa?',
      a: 'A conversa inicial não tem custo. O diagnóstico, planejado para 2 a 4 semanas, tem proposta fechada. Cada etapa seguinte também, com escopo definido pelo que o diagnóstico encontrar.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quantos setups a fábrica faz por semana e onde o refugo mais pesa. Saímos da conversa com uma ideia de onde o diagnóstico começaria.',
  },
  sources: [
    {
      label: 'IBGE, CEMPRE 2024 (SIDRA, tabela 9529)',
      url: 'https://apisidra.ibge.gov.br/values/t/9529/n3/42/v/all/p/last/c319/all/c12762/all',
    },
    {
      label: 'IBGE, Pintec Semestral 2024 (Teletime, 24/09/2025)',
      url: 'https://teletime.com.br/24/09/2025/ia-e-tecnologia-que-mais-cresce-e-alcanca-quatro-em-cada-dez-industrias/',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
