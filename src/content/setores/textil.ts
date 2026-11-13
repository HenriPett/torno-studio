import type { SectorLanding } from './types';

export const setor: SectorLanding = {
  slug: 'textil',
  sectorName: 'têxtil e confecção',
  meta: {
    title: 'IA para indústrias têxteis e de confecção | Torno',
    description:
      'Cérebro da operação e agentes de IA para PCP de coleção, facções, tinturaria, qualidade e representantes. Implantação por etapas, a partir de um diagnóstico.',
  },
  hero: {
    eyebrow: 'Para indústrias têxteis e de confecção',
    title: 'A ficha técnica certa na mão de quem corta e de quem vende',
    lead: 'A Torno junta ERP, fichas técnicas, receitas de tinturaria e o saber de quem tem anos de casa num cérebro da operação. Em cima dele, agentes de IA ajudam PCP, facções e representantes.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'O setor que mais emprega na indústria catarinense',
    body: [
      'Têxtil e confecção é o setor com mais gente ocupada na indústria de Santa Catarina. Para vender à Europa, o passaporte digital de produto vai pedir a informação de cada artigo organizada.',
    ],
    refs: [[1, 2]],
  },
  adoption: {
    useAI: 'cerca de 4 em 10',
    inProduction: 'cerca de 1 em 10',
    reading: 'A maior parte do uso de IA no setor está fora da fábrica. Na produção, quem começar agora ainda está entre as primeiras.',
    source: 2,
  },
  proofPoints: [
    {
      value: '−4%',
      label: 'de energia nas plantas, com IA ajustando 76 equipamentos',
      context: 'Indústria de processo de outro setor, segundo a empresa',
      area: 'Utilidades e energia',
      source: 3,
      scope: 'vizinho',
    },
    {
      value: '1,7 vez',
      label: 'o crescimento de receita das empresas líderes em IA, comparado ao das demais',
      context: 'Estudo global e multissetorial da BCG, 2025',
      area: 'Resultado da empresa',
      source: 4,
      scope: 'global',
    },
  ],
  help: {
    title: 'Onde entramos e o que medimos',
    intro: 'Em cada piloto medimos o indicador da área antes e depois. O diagnóstico escolhe por onde começar.',
    items: [
      {
        area: 'Comercial e representantes',
        problem: 'Grade, prazo e status de pedido chegam por WhatsApp o dia todo.',
        whatWeDo: 'Um assistente responde ao representante com a fonte, dentro das regras comerciais.',
        measure: 'Tempo para responder ao representante',
      },
      {
        area: 'PCP de coleção',
        problem: 'Ficha técnica, peça piloto e consumo de tecido ficam entre PLM, planilhas e e-mails.',
        whatWeDo: 'O agente junta ordens e fichas e avisa quando uma OP ameaça a data da coleção.',
        measure: 'Ordens entregues na data da coleção',
      },
      {
        area: 'Facções',
        problem: 'Saber o que está em cada facção exige ligações e planilhas paralelas.',
        whatWeDo: 'Remessas, retornos, prazos e defeitos por facção ficam numa consulta.',
        measure: 'Horas por semana acompanhando facções',
      },
      {
        area: 'Tinturaria e beneficiamento',
        problem: 'O ajuste de receita para um fio diferente está na cabeça de poucas pessoas.',
        whatWeDo: 'Registramos esse saber, revisado por quem o tem, no celular do turno da noite.',
        measure: 'Reprocesso de tingimento por lote',
      },
    ],
  },
  pains: {
    title: 'O que trava uma têxtil grande no dia a dia',
    items: [
      {
        title: 'A coleção depende de quem lembra',
        body: 'A resposta certa sobre ficha, piloto e consumo está com duas ou três pessoas.',
      },
      {
        title: 'Representante pergunta e o comercial para',
        body: 'Cada pergunta sobre grade ou pedido tira alguém do trabalho para consultar o ERP.',
      },
      {
        title: 'O saber da tinturaria se aposenta',
        body: 'Ajuste de receita e regulagem de tear raramente estão escritos e saem com quem se aposenta.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa têxtil',
    intro: 'Exemplos ilustrativos. O diagnóstico define por onde começar.',
    items: [
      {
        area: 'PCP e produção',
        title: 'PCP de coleção com a informação junta',
        body: 'Consulta ordens, roteiros, fichas e a fila de corte.',
        example: '“Quais OPs da coleção de inverno ainda dependem de tecido da tinturaria?”',
      },
      {
        area: 'Facções',
        title: 'Acompanhamento de terceiros',
        body: 'Remessas, retornos e prazos por facção, a partir do ERP e das planilhas.',
        example: '“Como foi o prazo de cada facção da referência 2318 na coleção passada?”',
      },
      {
        area: 'Qualidade',
        title: 'Defeito, causa e ação anterior',
        body: 'Busca em não conformidades, laudos e reclamações de lojistas.',
        example: '“Já tivemos reclamação de torção nesta malha? O que mudamos?”',
      },
      {
        area: 'Comercial e representantes',
        title: 'Preço, prazo e estoque com a fonte',
        body: 'Grade, tabela e status de pedido, com as permissões de cada representante.',
        example: '“Tenho grade completa da 5120 em marinho para março?”',
      },
    ],
  },
  mock: {
    question: 'Qual o consumo de tecido da referência 4471 no tamanho G e o que mudou desde a coleção passada?',
    answer:
      'Pela ficha vigente, 1,38 m de malha por peça no tamanho G [1]. Na coleção passada eram 1,42 m. A redução veio de um novo encaixe aprovado depois da segunda peça piloto [2], e o enfesto da OP 88213 já usa o consumo novo [3].',
    citations: ['Ficha técnica 4471, rev. C', 'Ata de aprovação da peça piloto 2', 'OP 88213, ERP'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa têxtil',
    body: [
      'Pedidos, OPs, fichas, receitas e laudos entram numa base com a fonte em cada resposta. O representante consulta grade e prazo e não enxerga custo.',
    ],
    inputs: [
      'Pedidos, OPs e estoque do ERP',
      'Fichas técnicas e revisões de modelagem',
      'Planilhas de PCP e de facções',
      'Receitas de tinturaria e laudos de laboratório',
      'Entrevistas com tintureiros, mecânicos e modelistas',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa confecção com rede de representantes',
    intro: 'Dezenas de consultas de representantes por dia sobre grade, prazo e pedido. Um piloto poderia correr assim.',
    steps: [
      { title: 'Diagnóstico', body: 'Medimos quantas consultas chegam por dia e quanto cada uma leva.' },
      { title: 'Base do piloto', body: 'Leitura do ERP, tabela de preço e regras de desconto, com permissões por região.' },
      { title: 'Piloto com dez representantes', body: 'O comercial revisa as respostas duvidosas por algumas semanas.' },
      { title: 'Decisão de expansão', body: 'Com o critério de sucesso atingido, o assistente vai à rede toda.' },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA usado em terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Ainda não temos case publicado em têxtil e confecção.',
  },
  faq: [
    {
      q: 'Nossas fichas e coleções ficam protegidas?',
      a: 'Os dados ficam na sua infraestrutura ou numa nuvem aprovada pela TI, com acesso por perfil. Eles não treinam modelos de terceiros.',
    },
    {
      q: 'Funciona com o ERP que já usamos?',
      a: 'Sim, seja de moda ou geral como TOTVS, SAP ou Senior. A ligação é de leitura, pelo caminho que a TI aprovar.',
    },
    {
      q: 'E o conhecimento dos tintureiros mais antigos?',
      a: 'Registramos em entrevistas e no posto de trabalho. Cada procedimento fica com o nome de quem o validou.',
    },
    {
      q: 'Quanto tempo leva e quanto custa?',
      a: 'O diagnóstico leva de 2 a 4 semanas. A conversa inicial não tem custo, e cada etapa tem proposta fechada.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte onde a coleção mais trava hoje. Saímos com uma ideia de por onde o diagnóstico começaria.',
  },
  sources: [
    {
      label: 'IBGE, CEMPRE 2024 (SIDRA, tabela 9529)',
      url: 'https://apisidra.ibge.gov.br/values/t/9529/n3/42/v/all/p/last/c319/all/c12762/all',
    },
    {
      label: 'Comissão Europeia, passaporte digital de produto para têxteis',
      url: 'https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/textile-apparel_en',
    },
    {
      label: 'IBGE, PINTEC Semestral 2024, indicadores por atividade (tab. 1.3.3)',
      url: 'https://ftp.ibge.gov.br/Industrias_Extrativas_e_de_Transformacao/Pesquisa_de_Inovacao_Semestral/2024/Indicadores_tematicos/PINTEC_Semestral_2024_Indicadores_Tematicos_CNAE.xlsx',
    },
    {
      label: 'Mercado&Consumo, 27/09/2023 (resultado segundo a empresa)',
      url: 'https://mercadoeconsumo.com.br/27/09/2023/economia/ambev-aumenta-eficiencia-com-a-implantacao-de-ia-em-suas-operacoes/',
    },
    {
      label: 'BCG, The Widening AI Value Gap (set/2025), estudo global',
      url: 'https://www.bcg.com/press/30september2025-ai-leaders-outpace-laggards-revenue-growth-cost-savings',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
