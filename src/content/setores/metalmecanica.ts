import type { SectorLanding } from './types';

export const setor: SectorLanding = {
  slug: 'metalmecanica',
  sectorName: 'metalmecânica',
  meta: {
    title: 'IA para indústrias metalmecânicas | Torno',
    description:
      'Cérebro da operação e agentes de IA para orçamento por desenho, roteiro e apontamento, documentação de qualidade e manutenção. Implantação por etapas, a partir de um diagnóstico.',
  },
  hero: {
    eyebrow: 'Para indústrias metalmecânicas',
    title: 'Orçamento por desenho sem esperar o veterano da usinagem',
    lead: 'A Torno junta ERP, roteiros, apontamentos, desenhos de cliente, orçamentos antigos e registros de qualidade num cérebro da operação. Em cima dele, agentes de IA atendem orçamentação, PCP e qualidade.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Muita informação por pedido',
    body: [
      'Cada pedido começa com um desenho do cliente e termina com um certificado. No meio, orçamento, roteiro e inspeção dependem da experiência de poucas pessoas.',
    ],
  },
  adoption: {
    useAI: 'cerca de 3 a 5 em 10',
    inProduction: 'cerca de 2 a 4 em 10',
    reading: 'Na metalurgia, cerca de metade usa IA. Em produtos de metal, onde fica a usinagem sob encomenda, cerca de 3 em 10, e cerca de 2 em 10 na produção.',
    source: 0,
  },
  proofPoints: [
    {
      value: 'mais de 80%',
      label: 'de acerto na previsão de falhas de qualidade, num piloto com IA',
      context: 'Fundição em Joinville, segundo a empresa',
      area: 'Qualidade',
      source: 1,
      scope: 'setor',
    },
    {
      value: '16 dias',
      label: 'de prazo de cotação com IA, antes entre 29 e 51 dias',
      context: 'Siderúrgica brasileira, segundo a empresa',
      area: 'Cotação',
      source: 2,
      scope: 'setor',
    },
  ],
  help: {
    title: 'Onde entramos e o que medimos',
    intro: 'Em cada piloto medimos o indicador da área antes e depois. O diagnóstico escolhe por onde começar.',
    items: [
      {
        area: 'Orçamentação',
        problem: 'Orçar uma peça nova espera quem já fez algo parecido.',
        whatWeDo: 'Um agente lê o desenho, encontra peças semelhantes e traz roteiro, tempo apontado e custo realizado.',
        measure: 'Cotações respondidas no prazo pedido pelo cliente',
      },
      {
        area: 'PCP',
        problem: 'Roteiro do ERP e apontamento não batem, e a programação segue a experiência do encarregado.',
        whatWeDo: 'O agente compara tempo padrão e apontado e avisa quando uma ordem vai passar da data.',
        measure: 'Ordens entregues na data prometida',
      },
      {
        area: 'Qualidade',
        problem: 'Certificados e relatórios dimensionais são juntados à mão em cada pedido.',
        whatWeDo: 'O agente monta o pacote de documentação do pedido e o rascunho do 8D.',
        measure: 'Horas para montar a documentação de um pedido',
      },
      {
        area: 'Processo e chão de fábrica',
        problem: 'A ação anterior contra uma não conformidade não chega a quem opera a máquina.',
        whatWeDo: 'A ação tomada da última vez aparece para quem programa e para quem opera, com a fonte.',
        measure: 'Não conformidades repetidas em peças parecidas',
      },
    ],
  },
  pains: {
    title: 'O que pesa numa metalmecânica sob encomenda',
    items: [
      {
        title: 'Orçamento por desenho depende de duas pessoas',
        body: 'Tempo de usinagem, material e terceiros de uma peça nova pedem quem já fez algo parecido.',
      },
      {
        title: 'Roteiro e tempo padrão desatualizados',
        body: 'O roteiro do ERP diz uma coisa e o apontamento mostra outra.',
      },
      {
        title: 'Retrabalho que volta',
        body: 'A mesma não conformidade reaparece em peças parecidas.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa metalmecânica',
    intro: 'Exemplos ilustrativos. O diagnóstico mostra se o primeiro ganho está na cotação, no chão de fábrica ou na qualidade.',
    items: [
      {
        area: 'Orçamentação',
        title: 'Cotação a partir de peças semelhantes',
        body: 'Peças parecidas com roteiro, tempos apontados e custo realizado.',
        example: '“Que flanges em aço 1045 acima de 300 mm já usinamos e quanto levaram no torno CNC?”',
      },
      {
        area: 'PCP',
        title: 'Programação com o tempo que a fábrica faz',
        body: 'Tempo padrão e apontado por operação e máquina.',
        example: '“Quais ordens da caldeiraria estão paradas por falta de chapa?”',
      },
      {
        area: 'Qualidade',
        title: 'Documentação do pedido num lugar',
        body: 'Certificados, relatórios dimensionais e inspeções do pedido.',
        example: '“Monte o pacote de documentação do pedido 7731.”',
      },
      {
        area: 'Manutenção',
        title: 'Histórico da máquina no chão de fábrica',
        body: 'Manual, preventiva e ordens anteriores no celular do técnico.',
        example: '“Qual foi a última falha no eixo-árvore do centro de usinagem 4?”',
      },
    ],
  },
  mock: {
    question: 'Já usinamos algo parecido com o desenho 55-118 do cliente? Quanto tempo levou?',
    answer:
      'Sim. A mais próxima é o eixo E-3307, no mesmo aço SAE 4140 e com diâmetro 8% menor, com torneamento CNC, fresamento, têmpera em terceiro e retífica [1]. A usinagem apontada foi de 3 h 40 min por peça, 25 min acima do padrão por causa da retífica [2].',
    citations: ['Roteiro E-3307, rev. B', 'Apontamentos da OP 60412', 'Orçamento 0981'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa metalmecânica',
    body: [
      'Pedidos, roteiros, apontamentos, desenhos, orçamentos e registros de qualidade entram ligados por pedido, peça e máquina. A pergunta sobre uma peça nova encontra as parecidas. Custo e margem ficam com quem a empresa autorizar.',
    ],
    inputs: [
      'Pedidos, roteiros, tempos padrão e apontamentos do ERP',
      'Desenhos de cliente e orçamentos antigos',
      'Certificados de material e relatórios dimensionais',
      'Não conformidades, 8D e ações tomadas',
      'Entrevistas com programadores CNC e encarregados',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa usinagem com fila de cotações',
    intro: 'Chegam mais pedidos de cotação do que dá para orçar no prazo. Um piloto poderia correr assim.',
    steps: [
      { title: 'Diagnóstico', body: 'Levantamos quantas cotações saíram no prazo e quanto cada uma levou.' },
      { title: 'Base de peças já feitas', body: 'Orçamentos antigos ligados a roteiro, apontamento e custo realizado.' },
      { title: 'Piloto com dois orçamentistas', body: 'Eles usam o assistente nas cotações novas, e comparamos orçado e realizado.' },
      { title: 'Próxima etapa', body: 'Com o critério atingido, PCP e qualidade passam a usar a mesma base.' },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA usado em terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Na metalmecânica ainda não temos case publicado.',
  },
  faq: [
    {
      q: 'Os desenhos dos nossos clientes ficam protegidos?',
      a: 'Tratamos desenhos de cliente como sigilosos. Os dados ficam na sua infraestrutura ou numa nuvem aprovada pela TI, com acesso por perfil, e não treinam modelos de terceiros.',
    },
    {
      q: 'Funciona com o nosso ERP?',
      a: 'Lemos o ERP já implantado pelo caminho que a TI aprovar. Onde o apontamento é parcial ou em papel, o diagnóstico avalia o que dá para usar.',
    },
    {
      q: 'E o conhecimento dos programadores mais antigos?',
      a: 'Registramos em entrevistas e no acompanhamento do trabalho. Cada um revisa o que foi escrito e fica como fonte.',
    },
    {
      q: 'Quanto tempo leva e quanto custa?',
      a: 'O diagnóstico leva de 2 a 4 semanas. A conversa inicial não tem custo, e cada etapa tem proposta fechada.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quantas cotações a empresa responde por mês e onde elas param. Saímos com uma ideia de onde o diagnóstico começaria.',
  },
  sources: [
    {
      label: 'IBGE, PINTEC Semestral 2024, indicadores por atividade (tab. 1.3.3)',
      url: 'https://ftp.ibge.gov.br/Industrias_Extrativas_e_de_Transformacao/Pesquisa_de_Inovacao_Semestral/2024/Indicadores_tematicos/PINTEC_Semestral_2024_Indicadores_Tematicos_CNAE.xlsx',
    },
    {
      label: 'Relatório de sustentabilidade 2024-25 da empresa (resultado segundo a empresa)',
      url: 'https://api.mziq.com/mzfilemanager/v2/d/5ab6a371-dd2f-452a-b6b2-22c97ed0abbb/174ba274-ed95-dce2-b1aa-edb9708eb643?origin=2',
    },
    {
      label: 'Baguete, mai/2025 (resultado segundo a empresa)',
      url: 'https://www.baguete.com.br/noticias/gerdau-otimiza-cotacoes-com-ia-da-azure',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
