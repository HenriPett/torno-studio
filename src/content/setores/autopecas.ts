import type { SectorLanding } from './types';

export const setor: SectorLanding = {
  slug: 'autopecas',
  sectorName: 'autopeças e implementos',
  meta: {
    title: 'IA para fabricantes de autopeças e implementos | Torno',
    description:
      'Cérebro da operação e agentes de IA para 8D, PPAP e APQP, programação de montadora via EDI, auditoria IATF 16949 e manutenção. Implantação por etapas, a partir de um diagnóstico.',
  },
  hero: {
    eyebrow: 'Para fabricantes de autopeças e implementos',
    title: 'PPAP, 8D e programação da montadora sem caça a documento',
    lead: 'A Torno junta ERP, programação EDI, PPAP, FMEA, planos de controle e 8D num cérebro da operação. Em cima dele, agentes de IA ajudam qualidade, PCP, engenharia e manutenção.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Venda concentrada nas montadoras',
    body: [
      'As montadoras ficaram com 64,5% das vendas de autopeças no Brasil em 2025, segundo o Sindipeças. Quem fornece vive da programação do cliente e da documentação de cada peça em dia.',
    ],
    refs: [[1]],
  },
  adoption: {
    useAI: 'cerca de 4 em 10',
    inProduction: 'cerca de 2 em 10',
    reading: 'Cerca de 8 em 10 fabricantes ainda não usam IA na produção, onde ficam a qualidade, a manutenção e o PCP.',
    source: 1,
  },
  proofPoints: [
    {
      value: '−29%',
      label: 'de falhas recorrentes de equipamento com monitoramento apoiado por IA',
      context: 'Fabricante de autopeças em Curitiba, segundo o fornecedor da tecnologia',
      area: 'Manutenção',
      source: 2,
      scope: 'setor',
    },
    {
      value: '16 dias',
      label: 'de prazo de cotação com IA, antes entre 29 e 51 dias',
      context: 'Indústria de outro setor, segundo a empresa',
      area: 'Cotação',
      source: 3,
      scope: 'vizinho',
    },
  ],
  help: {
    title: 'Onde entramos e o que medimos',
    intro: 'Em cada piloto medimos o indicador da área antes e depois. O diagnóstico escolhe por onde começar.',
    items: [
      {
        area: 'Qualidade',
        problem: 'O 8D tem prazo de montadora, e o tempo vai em procurar ocorrências parecidas.',
        whatWeDo: 'Um agente reúne o histórico da peça e prepara o rascunho do 8D para o engenheiro revisar.',
        measure: 'Dias até a contenção e até o fechamento do 8D',
      },
      {
        area: 'PCP',
        problem: 'A programação EDI muda toda semana, e o cruzamento com estoque sai de planilha.',
        whatWeDo: 'O agente compara a programação nova com a anterior e aponta o item sem cobertura.',
        measure: 'Horas por semana para replanejar',
      },
      {
        area: 'Engenharia',
        problem: 'Saber que documentos do PPAP revisar numa mudança depende de memória.',
        whatWeDo: 'O agente lista os documentos afetados, do FMEA ao pacote de PPAP.',
        measure: 'Tempo para fechar uma mudança de engenharia',
      },
      {
        area: 'Sistema da qualidade',
        problem: 'Evidências da IATF 16949 ficam em pastas diferentes, e cada auditoria vira mutirão.',
        whatWeDo: 'O agente encontra calibração, MSA e treinamento por requisito, com a fonte.',
        measure: 'Horas da equipe para preparar uma auditoria',
      },
    ],
  },
  pains: {
    title: 'O que consome a qualidade e o PCP de uma fornecedora',
    items: [
      {
        title: 'A programação muda toda semana',
        body: 'Ela mexe no firme e no previsto e precisa virar ordem de produção e de compra sem erro.',
      },
      {
        title: '8D aberto com prazo de cliente',
        body: 'A montadora pede contenção em horas e 8D em dias.',
      },
      {
        title: 'Mudança que mexe no PPAP',
        body: 'Trocar processo, ferramenta ou fornecedor pede revisar FMEA, plano de controle e instruções.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa fabricante de autopeças',
    intro: 'Exemplos ilustrativos. O agente produz rascunho, revisado por um responsável dentro do sistema da qualidade.',
    items: [
      {
        area: 'Qualidade',
        title: '8D com histórico e FMEA à mão',
        body: 'Encontra ocorrências parecidas, ações tomadas, FMEA e plano de controle.',
        example: '“Já tivemos rebarba no furo deste suporte? Qual foi a causa raiz?”',
      },
      {
        area: 'PCP e logística',
        title: 'Programação EDI virando plano',
        body: 'Aponta o que muda na produção e nas compras a cada programação.',
        example: '“Qual item fica sem cobertura com a programação desta semana?”',
      },
      {
        area: 'Engenharia e APQP',
        title: 'Gestão de mudança com rastreio',
        body: 'Indica os documentos a revisar quando muda processo, ferramenta ou fornecedor.',
        example: '“Se trocarmos o fornecedor da bucha, o que do PPAP precisa ser revisado?”',
      },
      {
        area: 'Manutenção e ferramentaria',
        title: 'Histórico de prensa e ferramenta',
        body: 'Preventiva, ordens de serviço e golpes de ferramenta no celular do técnico.',
        example: '“Quantos golpes a ferramenta 88-14 tem desde a última afiação?”',
      },
    ],
  },
  mock: {
    question: 'Já tivemos rebarba no furo do suporte 4471-B? O que foi feito?',
    answer:
      'Sim, duas vezes. Na primeira, a causa foi desgaste do punção da ferramenta 88-14, e a afiação passou para cada 40 mil golpes [1]. Na segunda, a rebarba voltou após a troca do fornecedor de chapa [2], e o plano de controle ganhou verificação a cada 2 horas [3].',
    citations: ['8D 017', '8D 052', 'Plano de controle 4471-B, rev. G'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa fabricante de autopeças',
    body: [
      'Programação, ordens, FMEA, PPAP, 8D e manutenção entram ligados pelo código da peça e pelo cliente, que é como a montadora cobra. Cada resposta cita documento e revisão.',
    ],
    inputs: [
      'Programação EDI, ordens e estoque do ERP',
      'Desenhos, FMEA, planos de controle e PPAP',
      'Relatórios 8D e reclamações de clientes',
      'MSA, calibração e treinamento',
      'Manutenção de prensas e ferramentas',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa fornecedora de montadoras',
    intro: 'A qualidade gasta a maior parte de cada 8D procurando histórico. Um piloto poderia correr assim.',
    steps: [
      { title: 'Diagnóstico', body: 'Medimos o tempo dos últimos 8D até a contenção e o fechamento.' },
      { title: 'Base da qualidade', body: '8D anteriores, FMEA, planos de controle e reclamações organizados por peça e cliente.' },
      { title: 'Piloto na qualidade', body: 'Os engenheiros usam o assistente nos 8D novos e assinam cada rascunho.' },
      { title: 'Expansão', body: 'Com o critério atingido, a mesma base apoia a gestão de mudança e a auditoria.' },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA usado em terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Ainda não temos case publicado em autopeças.',
  },
  faq: [
    {
      q: 'Os dados das montadoras ficam protegidos?',
      a: 'Desenhos e programações ficam na sua infraestrutura ou numa nuvem aprovada pela TI, com acesso por perfil. Eles não treinam modelos de terceiros.',
    },
    {
      q: 'Funciona com o nosso ERP e com o EDI?',
      a: 'Lemos o ERP e as programações que chegam por EDI, pelo caminho que a TI aprovar.',
    },
    {
      q: 'A Torno é certificada IATF 16949?',
      a: 'Não. A IATF 16949 certifica o sistema da qualidade da fábrica, e trabalhamos dentro dele. O assistente produz rascunho, aprovado por quem a empresa designar.',
    },
    {
      q: 'Quanto tempo leva e quanto custa?',
      a: 'O diagnóstico leva de 2 a 4 semanas. A conversa inicial não tem custo, e cada etapa tem proposta fechada.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quantos 8D a qualidade abriu no último trimestre. Saímos com uma ideia de onde o diagnóstico começaria.',
  },
  sources: [
    {
      label: 'Sindipeças, via AutoData (26/02/2026)',
      url: 'https://www.autodata.com.br/noticias/2026/02/26/faturamento-da-industria-de-autopecas-cresceu-5-6-/100089/',
    },
    {
      label: 'IBGE, PINTEC Semestral 2024, indicadores por atividade (tab. 1.3.3)',
      url: 'https://ftp.ibge.gov.br/Industrias_Extrativas_e_de_Transformacao/Pesquisa_de_Inovacao_Semestral/2024/Indicadores_tematicos/PINTEC_Semestral_2024_Indicadores_Tematicos_CNAE.xlsx',
    },
    {
      label: 'Case publicado pelo fornecedor da tecnologia (material de marketing)',
      url: 'https://tractian.com/casos-de-estudo/bosch',
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
