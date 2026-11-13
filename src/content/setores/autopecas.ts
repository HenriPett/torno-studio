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
    lead: 'A Torno junta ERP, programação EDI, APQP e PPAP, FMEA, planos de controle e 8D num cérebro da operação. Em cima dele, agentes de IA ajudam qualidade, PCP, engenharia e manutenção. Implantamos por etapas, com a sua TI.',
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
    reading: 'A maioria das fabricantes que usam IA ainda não a levou para a qualidade, a manutenção e o PCP.',
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
    intro: 'No piloto, medimos o indicador da área antes e depois. O diagnóstico escolhe por onde começar.',
    items: [
      {
        area: 'Qualidade',
        problem: 'O 8D tem prazo de montadora, e a equipe gasta o tempo procurando ocorrências parecidas, FMEA e plano de controle.',
        whatWeDo: 'Um agente reúne o histórico da peça e prepara o rascunho do 8D para o engenheiro revisar.',
        measure: 'Dias até a contenção e até o fechamento do 8D',
      },
      {
        area: 'PCP',
        problem: 'A programação EDI muda toda semana, e o cruzamento com estoque e capacidade sai de planilha.',
        whatWeDo: 'O agente compara a programação nova com a anterior e aponta o item que fica sem cobertura.',
        measure: 'Horas por semana para replanejar depois de cada programação',
      },
      {
        area: 'Engenharia',
        problem: 'Trocar processo, ferramenta ou fornecedor pede saber que documentos do PPAP revisar, e isso depende de memória.',
        whatWeDo: 'O agente lista os documentos afetados pela mudança, do FMEA ao pacote de PPAP.',
        measure: 'Tempo para fechar uma mudança de engenharia',
      },
      {
        area: 'Sistema da qualidade',
        problem: 'Evidências da IATF 16949 ficam em pastas diferentes, e cada auditoria vira mutirão.',
        whatWeDo: 'O agente encontra calibração, MSA e treinamento por requisito, com a fonte de cada evidência.',
        measure: 'Horas da equipe para preparar uma auditoria',
      },
    ],
  },
  pains: {
    title: 'O que consome a qualidade e o PCP de uma fornecedora',
    items: [
      {
        title: 'A programação muda toda semana',
        body: 'Chega por EDI, mexe no firme e no previsto e precisa virar ordem de produção e de compra sem erro.',
      },
      {
        title: '8D aberto com prazo de cliente',
        body: 'A montadora pede contenção em horas e 8D em dias. Achar ocorrências parecidas, FMEA e plano de controle toma esse tempo.',
      },
      {
        title: 'Mudança que mexe no PPAP',
        body: 'Trocar processo, ferramenta ou fornecedor pede revisar FMEA, plano de controle e instruções. Saber o que revisar depende de memória.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa fabricante de autopeças',
    intro: 'Exemplos ilustrativos. O que o agente produz é rascunho revisado por um responsável, dentro do sistema da qualidade da empresa.',
    items: [
      {
        area: 'Qualidade',
        title: '8D com histórico e FMEA à mão',
        body: 'Encontra ocorrências parecidas, ações tomadas, FMEA e plano de controle, e prepara o rascunho do 8D.',
        example: '“Já tivemos reclamação de rebarba no furo deste suporte? Qual foi a causa raiz no 8D?”',
      },
      {
        area: 'PCP e logística',
        title: 'Programação EDI virando plano',
        body: 'Compara a programação nova com a anterior, o estoque e a capacidade, e aponta o que muda na produção e nas compras.',
        example: '“O que mudou na programação desta semana e qual item fica sem cobertura?”',
      },
      {
        area: 'Engenharia e APQP',
        title: 'Gestão de mudança com rastreio',
        body: 'Indica os documentos que precisam de revisão quando muda processo, ferramenta ou fornecedor.',
        example: '“Se trocarmos o fornecedor da bucha, que documentos do PPAP desta peça precisam ser revisados?”',
      },
      {
        area: 'Manutenção e ferramentaria',
        title: 'Histórico de prensa e ferramenta',
        body: 'Preventiva, ordens de serviço, golpes de ferramenta e falhas anteriores no celular do técnico.',
        example: '“Quantos golpes a ferramenta 88-14 tem desde a última afiação e qual é o limite?”',
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
      'Programação, ordens, FMEA, planos de controle, PPAP, 8D e histórico de manutenção entram ligados pelo código da peça e pelo cliente, que é como a montadora cobra. Cada resposta cita documento e revisão, e o acesso segue o perfil de cada área.',
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
    intro: 'Uma fabricante de autopeças recebe reclamações com prazo curto, e a qualidade gasta a maior parte de cada 8D procurando histórico.',
    steps: [
      {
        title: 'Diagnóstico',
        body: 'Medimos o tempo dos últimos 8D até a contenção e até o fechamento, e combinamos o critério de sucesso.',
      },
      {
        title: 'Base da qualidade',
        body: '8D anteriores, FMEA, planos de controle e reclamações organizados por peça e por cliente.',
      },
      {
        title: 'Piloto na qualidade',
        body: 'Os engenheiros usam o assistente nos 8D novos e revisam e assinam cada rascunho.',
      },
      {
        title: 'Expansão',
        body: 'Com o critério atingido, a mesma base passa a apoiar a gestão de mudança e a auditoria.',
      },
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
      a: 'Tratamos desenhos e programações como confidenciais. Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela TI, com acesso por perfil e registro de uso, e não treinam modelos de terceiros.',
    },
    {
      q: 'Funciona com o nosso ERP e com o EDI?',
      a: 'Lemos o ERP já implantado e as programações que chegam por EDI, pelo caminho que a TI aprovar.',
    },
    {
      q: 'A Torno é certificada IATF 16949?',
      a: 'Não. A IATF 16949 certifica o sistema da qualidade da fábrica, e trabalhamos dentro dele. O que o assistente produz é rascunho, aprovado por quem a empresa designar.',
    },
    {
      q: 'Quanto tempo leva e quanto custa?',
      a: 'O diagnóstico está planejado para 2 a 4 semanas. A conversa inicial não tem custo, e cada etapa depois dela tem proposta fechada, com prazo e critério de sucesso.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quantos 8D a qualidade abriu no último trimestre e onde o tempo foi gasto. Saímos com uma ideia de onde o diagnóstico começaria.',
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
