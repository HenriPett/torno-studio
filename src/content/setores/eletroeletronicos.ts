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
    lead: 'A Torno junta ERP, engenharia, normas, ensaios, rastreabilidade de série e chamados de assistência num cérebro da operação. Em cima dele, agentes de IA ajudam engenharia, qualidade e assistência.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Produto cada vez mais técnico',
    body: [
      'A indústria elétrica e eletrônica faturou R$ 270,8 bilhões em 2025, segundo a Abinee. Cada produto responde a normas e ensaios, e a informação que libera um lote fica espalhada.',
    ],
    refs: [[1]],
  },
  adoption: {
    useAI: 'cerca de 6 a 7 em 10',
    inProduction: 'cerca de 3 em 10',
    reading: 'O setor está entre os que mais usam IA no país. Na produção, a maioria das fabricantes ainda não começou.',
    source: 1,
  },
  proofPoints: [
    {
      value: '+5%',
      label: 'de rendimento da fábrica com IA',
      context: 'Fabricante de quadros elétricos em SC, segundo a empresa',
      area: 'Produção',
      source: 2,
      scope: 'setor',
    },
    {
      value: '+10%',
      label: 'de disponibilidade dos equipamentos, aproximadamente, em três anos com diagnóstico de falha por IA',
      context: 'Fabricante de motores elétricos em SC, segundo a empresa',
      area: 'Manutenção',
      source: 2,
      scope: 'setor',
    },
    {
      value: '−3,5%',
      label: 'no custo de frete com IA',
      context: 'Fabricante de eletrodomésticos no Paraná, segundo a empresa',
      area: 'Logística',
      source: 3,
      scope: 'setor',
    },
  ],
  help: {
    title: 'Onde entramos e o que medimos',
    intro: 'Em cada piloto medimos o indicador da área antes e depois. O diagnóstico escolhe por onde começar.',
    items: [
      {
        area: 'Engenharia de produto',
        problem: 'Outras áreas perguntam à engenharia qual norma se aplica e o que mudou entre revisões.',
        whatWeDo: 'Um assistente responde a partir de especificações e ensaios aprovados, citando a revisão.',
        measure: 'Horas por semana da engenharia respondendo outras áreas',
      },
      {
        area: 'Qualidade e ensaios',
        problem: 'Lote de componente, teste final e firmware de cada série ficam em sistemas separados.',
        whatWeDo: 'O agente cruza os registros por número de série e prepara o rascunho da análise de causa.',
        measure: 'Tempo para achar a causa de uma reprovação no teste final',
      },
      {
        area: 'Normas e certificação',
        problem: 'Uma nova edição de norma exige varrer produtos, certificados e ensaios à mão.',
        whatWeDo: 'O agente lista o que cita a edição anterior, para a engenharia decidir o que refazer.',
        measure: 'Tempo para levantar o impacto de uma mudança de norma',
      },
      {
        area: 'Assistência técnica',
        problem: 'O técnico recebe a falha de campo sem a configuração e os testes de saída.',
        whatWeDo: 'O histórico do equipamento pelo número de série chega ao celular do técnico.',
        measure: 'Tempo até o diagnóstico de um chamado de campo',
      },
    ],
  },
  pains: {
    title: 'O que sobrecarrega uma fabricante de equipamentos elétricos',
    items: [
      {
        title: 'Engenharia consultada para tudo',
        body: 'Comercial, assistência e qualidade dependem dela para saber norma, revisão e o que mudou.',
      },
      {
        title: 'Rastreabilidade de série em sistemas separados',
        body: 'Componente, teste final e firmware de cada série ficam em lugares diferentes.',
      },
      {
        title: 'Nova edição de norma vira projeto à parte',
        body: 'Descobrir o que uma mudança de norma afeta exige varredura manual.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa indústria eletroeletrônica',
    intro: 'Exemplos ilustrativos. Muitas vezes o primeiro piloto tira da engenharia as perguntas repetidas.',
    items: [
      {
        area: 'Engenharia de produto',
        title: 'Revisões, normas e decisões de projeto',
        body: 'Busca em especificações, listas de materiais, ensaios e registros de mudança.',
        example: '“Quais produtos usam o relé K-220 e que norma rege o ensaio deles?”',
      },
      {
        area: 'Qualidade e ensaios',
        title: 'Teste final e não conformidade por série',
        body: 'Cruza teste final, lote de componentes e não conformidades.',
        example: '“As falhas de isolação desta semana vieram de qual lote de transformador?”',
      },
      {
        area: 'Assistência técnica',
        title: 'Histórico do equipamento pela série',
        body: 'Configuração, firmware e chamados anteriores no celular do técnico.',
        example: '“O inversor 24B-01877 saiu com qual firmware e já teve chamado?”',
      },
      {
        area: 'Suprimentos',
        title: 'Componente em falta e alternativa aprovada',
        body: 'Encontra alternativas já homologadas e os produtos afetados.',
        example: '“Que alternativa ao capacitor C-4471 já foi aprovada e em quais placas?”',
      },
    ],
  },
  mock: {
    question: 'O lote de placas 25-0412 passou no teste final com qual firmware e algum número de série falhou?',
    answer:
      'As 1.200 placas do lote foram gravadas com o firmware 3.8.2 [1]. No teste final, 12 reprovaram por tensão de saída fora da faixa, todas com regulador do lote R-2291 [2]. Nove já foram retrabalhadas e aprovadas no reteste [3].',
    citations: ['Registros de teste final, lote 25-0412', 'Rastreabilidade de componentes, ERP', 'Relatório de retrabalho RT-0933'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa indústria eletroeletrônica',
    body: [
      'Ordens, componentes, especificações, ensaios, testes e chamados entram ligados pelo número de série e pela revisão do produto. Cada resposta cita documento e revisão.',
    ],
    inputs: [
      'Ordens, lotes e expedição por série do ERP ou do MES',
      'Especificações, listas de materiais e registros de mudança',
      'Relatórios de ensaio, certificados e normas',
      'Resultados de teste final',
      'Chamados de assistência e análises de falha',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa fabricante com engenharia sobrecarregada',
    intro: 'A engenharia gasta boa parte da semana respondendo outras áreas. Um piloto poderia correr assim.',
    steps: [
      { title: 'Diagnóstico', body: 'A engenharia registra as consultas que recebe, de quem e sobre o quê.' },
      { title: 'Base técnica', body: 'Especificações, revisões, ensaios e fichas aprovadas, com permissões por área.' },
      { title: 'Piloto com comercial e assistência', body: 'Elas consultam o assistente primeiro. O que ele não responde com fonte segue para a engenharia.' },
      { title: 'Expansão', body: 'Com o critério atingido, a qualidade passa a usar a rastreabilidade por série.' },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA usado em terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Ainda não temos case publicado no setor.',
  },
  faq: [
    {
      q: 'Nossos projetos e firmware ficam protegidos?',
      a: 'Os dados ficam na sua infraestrutura ou numa nuvem aprovada pela TI. Projetos, código e custos ficam restritos por perfil e não treinam modelos de terceiros.',
    },
    {
      q: 'Funciona com o nosso ERP, MES e PLM?',
      a: 'Lemos os sistemas já implantados pelo caminho que a TI aprovar: API, réplica do banco ou exportação agendada.',
    },
    {
      q: 'Dá para confiar numa resposta sobre norma?',
      a: 'O assistente responde só com os documentos da empresa e cita a revisão. Quando não encontra fonte, diz isso. A decisão de conformidade segue com a engenharia.',
    },
    {
      q: 'Quanto tempo leva e quanto custa?',
      a: 'O diagnóstico leva de 2 a 4 semanas. A conversa inicial não tem custo, e cada etapa tem proposta fechada.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quais perguntas mais chegam à sua engenharia. Saímos com uma ideia de onde o diagnóstico começaria.',
  },
  sources: [
    {
      label: 'Abinee, balanço 2025 (Mercado & Consumo, 04/12/2025)',
      url: 'https://mercadoeconsumo.com.br/04/12/2025/tecnologia/faturamento-do-setor-eletronico-fecha-2025-com-crescimento-real-de-4-ante-2024-diz-abinee/',
    },
    {
      label: 'IBGE, PINTEC Semestral 2024, indicadores por atividade (tab. 1.3.3)',
      url: 'https://ftp.ibge.gov.br/Industrias_Extrativas_e_de_Transformacao/Pesquisa_de_Inovacao_Semestral/2024/Indicadores_tematicos/PINTEC_Semestral_2024_Indicadores_Tematicos_CNAE.xlsx',
    },
    {
      label: 'Artigo técnico da empresa, nov/2023 (resultados segundo a empresa)',
      url: 'https://www.industriaquimica.es/descargar_documento/Weg7.pdf',
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
