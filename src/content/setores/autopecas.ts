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
    lead: 'A Torno junta ERP, programação de clientes via EDI, documentação de APQP e PPAP, FMEA, planos de controle e registros de 8D num cérebro da operação. Em cima dele, agentes de IA ajudam qualidade, PCP, engenharia, manutenção e comercial. Implantamos por etapas, com a sua TI.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Venda concentrada nas montadoras e capacidade sobrando',
    body: [
      'Santa Catarina tem 23 unidades locais com 250 ou mais pessoas ocupadas na divisão do IBGE de veículos automotores, reboques e carrocerias, que inclui as autopeças. Treze delas têm 500 ou mais (IBGE, CEMPRE 2024).',
      'No Brasil, segundo relatório do Sindipeças noticiado pela AutoData em fevereiro de 2026, o faturamento das autopeças cresceu 5,6% em 2025, as montadoras responderam por 64,5% das vendas e a ociosidade chegou a 26,6%. Fornecer para montadora significa viver da programação dela e das exigências do sistema de qualidade automotivo, com documentação em dia para cada peça.',
    ],
    refs: [[1], [2]],
  },
  stats: [
    { value: '23', label: 'unidades de veículos, reboques e carrocerias, autopeças incluídas, com 250 ou mais pessoas ocupadas em Santa Catarina', source: 1 },
    { value: '64,5%', label: 'das vendas de autopeças no Brasil em 2025 foram para montadoras', source: 2 },
    { value: '26,6%', label: 'de ociosidade na indústria brasileira de autopeças em 2025', source: 2 },
  ],
  pains: {
    title: 'O que consome a qualidade e o PCP de uma fornecedora',
    items: [
      {
        title: 'A programação muda toda semana',
        body: 'A programação chega por EDI, mexe no firme e no previsto e precisa virar ordem de produção e de compra sem erro. O cruzamento com estoque e capacidade costuma sair de planilha.',
      },
      {
        title: '8D aberto com prazo de cliente',
        body: 'Uma reclamação de montadora pede contenção em horas e 8D em dias. Achar ocorrências parecidas, o FMEA e o plano de controle da peça toma o tempo que a equipe não tem.',
      },
      {
        title: 'Mudança que mexe no PPAP',
        body: 'Trocar processo, ferramenta ou fornecedor exige revisar FMEA, plano de controle e instruções e, muitas vezes, submeter PPAP de novo. Saber o que precisa ser revisado depende de memória.',
      },
      {
        title: 'Auditoria IATF 16949 sempre em preparação',
        body: 'Evidências de treinamento, calibração, análise do sistema de medição e registros de processo ficam em pastas diferentes, e cada auditoria vira mutirão.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa fabricante de autopeças',
    intro:
      'Os exemplos abaixo são ilustrativos. Tudo o que o agente produz é rascunho revisado por um responsável da área, dentro do sistema da qualidade da empresa.',
    items: [
      {
        area: 'Qualidade',
        title: '8D com histórico e FMEA à mão',
        body: 'O agente encontra ocorrências parecidas, ações tomadas, FMEA e plano de controle da peça, e prepara o rascunho do 8D para o engenheiro da qualidade revisar.',
        example: '“Já tivemos reclamação de rebarba no furo deste suporte? Qual foi a causa raiz no 8D?”',
      },
      {
        area: 'PCP e logística',
        title: 'Programação EDI virando plano',
        body: 'Compara a programação nova com a anterior, com o estoque e com a capacidade, e aponta o que muda na produção e nas compras.',
        example: '“O que mudou na programação desta semana e qual item fica sem cobertura?”',
      },
      {
        area: 'Engenharia e APQP',
        title: 'Gestão de mudança com rastreio',
        body: 'Indica os documentos que precisam de revisão quando muda um processo, uma ferramenta ou um fornecedor, do FMEA ao pacote de PPAP.',
        example: '“Se trocarmos o fornecedor da bucha, que documentos do PPAP desta peça precisam ser revisados?”',
      },
      {
        area: 'Sistema da qualidade',
        title: 'Evidências reunidas antes do auditor pedir',
        body: 'Encontra registros de treinamento, calibração, MSA e processo por requisito, com a fonte de cada evidência.',
        example: '“Mostre as evidências de calibração dos instrumentos usados no plano de controle desta peça.”',
      },
      {
        area: 'Manutenção e ferramentaria',
        title: 'Histórico de prensa e ferramenta',
        body: 'Plano preventivo, ordens de serviço, golpes de ferramenta e falhas anteriores no celular do técnico.',
        example: '“Quantos golpes a ferramenta 88-14 tem desde a última afiação e qual é o limite?”',
      },
      {
        area: 'Comercial',
        title: 'Resposta ao cliente com a fonte',
        body: 'Status de pedido, previsão de entrega, situação de PPAP e base para cotação de peça nova, a partir das regras da empresa.',
        example: '“Em que situação está a submissão do PPAP da nova peça para este cliente?”',
      },
    ],
  },
  mock: {
    question: 'Já tivemos rebarba no furo do suporte 4471-B? O que foi feito?',
    answer:
      'Sim, duas vezes. Na primeira, a causa raiz no 8D foi desgaste do punção da ferramenta 88-14, e a ação foi reduzir o intervalo de afiação para 40 mil golpes [1]. Na segunda, a ocorrência voltou após a troca do fornecedor de chapa [2], e o plano de controle ganhou verificação de rebarba a cada 2 horas [3]. O FMEA foi revisado nas duas vezes.',
    citations: ['8D 017', '8D 052', 'Plano de controle 4471-B, rev. G'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa fabricante de autopeças',
    body: [
      'O ERP traz a programação dos clientes, ordens, estoque e expedição. A engenharia tem desenhos, FMEA, planos de controle e pacotes de PPAP. A qualidade tem 8D, reclamações, MSA e calibração. A manutenção tem o histórico de prensas, máquinas e ferramentas.',
      'Ligamos tudo pelo código da peça e pelo cliente, que é como a montadora cobra. As respostas citam o documento e a revisão, o acesso segue o perfil de cada área e os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela TI.',
    ],
    inputs: [
      'Programação EDI, ordens e estoque do ERP',
      'Desenhos, FMEA, planos de controle e PPAP',
      'Relatórios 8D e reclamações de clientes',
      'Registros de MSA, calibração e treinamento',
      'Histórico de manutenção de prensas e ferramentas',
      'Instruções de trabalho e de inspeção',
      'Requisitos específicos de cada cliente',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa fornecedora de montadoras',
    intro:
      'Uma fabricante de autopeças com cerca de 900 funcionários recebe reclamações de montadora com prazo curto, e a qualidade gasta a maior parte do tempo de cada 8D procurando histórico.',
    steps: [
      {
        title: 'Diagnóstico',
        body: 'Com qualidade, engenharia e TI, medimos o tempo dos últimos 8D até a contenção e até o fechamento, e combinamos o critério de sucesso.',
      },
      {
        title: 'Base da qualidade',
        body: '8D anteriores, FMEA, planos de controle e reclamações organizados por peça e por cliente.',
      },
      {
        title: 'Piloto na qualidade',
        body: 'Os engenheiros da qualidade usam o assistente nos 8D novos. Cada rascunho é revisado e assinado por eles.',
      },
      {
        title: 'Expansão',
        body: 'Com o critério atingido, a mesma base passa a apoiar a gestão de mudança e a preparação de auditoria.',
      },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real. Os números de porte servem só para dar escala ao exemplo.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA usado na operação de terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Ainda não temos case publicado em autopeças. No setor, o primeiro passo é o diagnóstico.',
  },
  faq: [
    {
      q: 'Os dados das montadoras ficam protegidos?',
      a: 'Desenhos e programações de cliente costumam ter cláusula de confidencialidade, e tratamos assim. Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela TI, com acesso por perfil e registro de uso, e não são usados para treinar modelos de terceiros. Assinamos acordo de confidencialidade antes do diagnóstico quando a empresa pede.',
    },
    {
      q: 'Funciona com o nosso ERP e com o EDI?',
      a: 'Lemos o ERP já implantado e as programações que chegam por EDI, pelo caminho que a TI aprovar. O diagnóstico confirma onde cada informação está antes da proposta do piloto.',
    },
    {
      q: 'A Torno é certificada IATF 16949?',
      a: 'Não. A IATF 16949 certifica o sistema da qualidade da fábrica. Trabalhamos dentro dele. O que o assistente produz é rascunho, revisado e aprovado por quem a empresa designar, e a mudança no processo segue o controle de documentos que vocês já têm.',
    },
    {
      q: 'Quanto tempo até ter algo funcionando?',
      a: 'O diagnóstico está planejado para 2 a 4 semanas. O piloto vem em seguida, numa área e num problema, com prazo e critério de sucesso definidos na proposta.',
    },
    {
      q: 'Quanto custa?',
      a: 'A conversa inicial não tem custo. O diagnóstico tem proposta fechada, e cada etapa seguinte também, montada a partir do que o diagnóstico encontrar.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quantos 8D a qualidade abriu no último trimestre e onde o tempo foi gasto. Saímos da conversa com uma ideia de onde o diagnóstico começaria.',
  },
  sources: [
    {
      label: 'IBGE, CEMPRE 2024 (SIDRA, tabela 9529)',
      url: 'https://apisidra.ibge.gov.br/values/t/9529/n3/42/v/all/p/last/c319/all/c12762/all',
    },
    {
      label: 'Sindipeças, via AutoData (26/02/2026)',
      url: 'https://www.autodata.com.br/noticias/2026/02/26/faturamento-da-industria-de-autopecas-cresceu-5-6-/100089/',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
