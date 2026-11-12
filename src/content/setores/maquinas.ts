import type { SectorLanding } from './types';

export const setor: SectorLanding = {
  slug: 'maquinas',
  sectorName: 'máquinas e equipamentos',
  meta: {
    title: 'IA para fabricantes de máquinas e equipamentos | Torno',
    description:
      'Cérebro da operação e agentes de IA para orçamentação técnica, engenharia sob encomenda, assistência técnica e peças de reposição. Implantação por etapas, a partir de um diagnóstico.',
  },
  hero: {
    eyebrow: 'Para fabricantes de máquinas e equipamentos',
    title: 'Orçamento técnico e pós-venda com a história de cada máquina',
    lead: 'A Torno reúne ERP, BOMs, desenhos, manuais, orçamentos antigos e chamados de assistência num cérebro da operação. Em cima dele, agentes de IA ajudam orçamentação, engenharia, assistência técnica, peças de reposição e comercial. Implantamos por etapas, com a sua TI.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'Mais máquina importada na disputa',
    body: [
      'Santa Catarina tem 34 unidades locais de fabricação de máquinas e equipamentos com 250 ou mais pessoas ocupadas, e o setor ocupa 52.345 pessoas no estado (IBGE, CEMPRE 2024).',
      'A concorrência de fora cresceu. Segundo a Abimaq, citada pela Agência Brasil em agosto de 2025, os bens importados chegaram a 46% do consumo nacional de máquinas e equipamentos, e a China passou de 16,6% para 32% das máquinas importadas pelo Brasil em dez anos. Para o fabricante nacional, prazo de orçamento, reaproveitamento de projeto e pós-venda bem atendido pesam na hora de fechar um pedido.',
    ],
    refs: [[1], [2]],
  },
  stats: [
    { value: '34', label: 'unidades de máquinas e equipamentos com 250 ou mais pessoas ocupadas em Santa Catarina', source: 1 },
    { value: '52.345', label: 'pessoas ocupadas no setor em Santa Catarina', source: 1 },
    { value: '46%', label: 'do consumo nacional de máquinas e equipamentos atendido por bens importados', source: 2 },
  ],
  pains: {
    title: 'O que segura um fabricante de máquinas',
    items: [
      {
        title: 'Orçamento técnico que leva semanas',
        body: 'Cada cotação pede engenharia para adaptar um projeto parecido. Achar a máquina semelhante já feita, a BOM dela e o custo realizado consome dias.',
      },
      {
        title: 'Projeto sob encomenda que recomeça do zero',
        body: 'Desenhos, revisões e soluções de projetos antigos estão no PDM e em pastas da rede. Encontrar o que serve depende de quem lembra que aquilo existe.',
      },
      {
        title: 'Técnico em campo liga para a fábrica',
        body: 'Para saber a configuração entregue, o manual da versão e a última intervenção numa máquina, o técnico de assistência depende da engenharia atender o telefone.',
      },
      {
        title: 'Peça de reposição identificada por foto',
        body: 'O cliente manda uma foto ou um código antigo. Descobrir a peça, a revisão e se há estoque passa por três pessoas.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham num fabricante de máquinas',
    intro:
      'Os exemplos abaixo são ilustrativos. No diagnóstico, priorizamos pelo impacto em prazo de orçamento e em atendimento ao cliente.',
    items: [
      {
        area: 'Orçamentação',
        title: 'Orçamento a partir de projetos parecidos',
        body: 'O agente encontra máquinas semelhantes já vendidas, com BOM, horas de engenharia e custo realizado, e monta a base do orçamento para o orçamentista revisar.',
        example: '“Que transportadores de rolos acima de 12 m já fizemos e qual foi o custo realizado de cada um?”',
      },
      {
        area: 'Engenharia de produto',
        title: 'Reuso de projeto com a revisão certa',
        body: 'Busca em desenhos, BOMs e memoriais por função, medida ou cliente, e indica a revisão vigente.',
        example: '“Temos projeto de mesa giratória para 3 toneladas? Qual revisão está aprovada?”',
      },
      {
        area: 'Assistência técnica',
        title: 'A máquina do cliente pelo número de série',
        body: 'Configuração entregue, manual da versão, diagramas elétricos e histórico de chamados no celular do técnico.',
        example: '“Qual CLP e qual versão de software foram na máquina série 2219-034?”',
      },
      {
        area: 'Peças de reposição',
        title: 'Peça certa e estoque na mesma resposta',
        body: 'Cruza número de série, BOM da época e estoque para identificar a peça e a alternativa atual quando o item saiu de linha.',
        example: '“Qual o código atual da engrenagem que foi na série 2017-112? Temos em estoque?”',
      },
      {
        area: 'Documentação técnica',
        title: 'Manual e lista de peças a partir da engenharia',
        body: 'Rascunho de manual de instruções e lista de peças recomendadas a partir da BOM e dos desenhos aprovados, para revisão da engenharia.',
        example: '“Gere a lista de peças de reposição recomendadas para a configuração vendida no pedido 4410.”',
      },
      {
        area: 'Comercial',
        title: 'Proposta coerente com a engenharia',
        body: 'Propostas com escopo, prazo e condições comerciais a partir das regras da empresa e do que a engenharia confirmou.',
        example: '“Prepare a proposta com as opções de automação que já fornecemos para este cliente.”',
      },
    ],
  },
  mock: {
    question: 'Qual foi o custo realizado da última peneira vibratória de dois decks e quanto de engenharia ela consumiu?',
    answer:
      'A última foi o pedido 3982. O custo realizado ficou 8% acima do orçado [1], puxado por chapa e por 46 horas extras de engenharia na adaptação do chassi [2]. A BOM tem 412 itens, 37 deles feitos sob medida. O desenho base é o PV-2D, revisão D [3].',
    citations: ['Pedido 3982, custo realizado, ERP', 'Apontamento de horas da engenharia, pedido 3982', 'BOM PV-2D, rev. D'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta num fabricante de máquinas',
    body: [
      'O ERP traz pedidos, custos realizados, estoque e compras. O PDM ou as pastas da engenharia guardam desenhos, BOMs e revisões. A assistência técnica tem os chamados e os relatórios de campo. O comercial tem orçamentos ganhos e perdidos.',
      'Ligamos tudo pelo número de série e pelo número do pedido, para que cada máquina vendida tenha a sua história completa. As respostas citam a fonte e respeitam permissões. Custo e margem ficam com quem a diretoria autorizar.',
    ],
    inputs: [
      'Pedidos, custos realizados e estoque do ERP',
      'Desenhos, BOMs e revisões do PDM',
      'Orçamentos ganhos e perdidos',
      'Chamados e relatórios de assistência técnica',
      'Manuais, diagramas e listas de peças',
      'Apontamento de horas de engenharia',
      'Condições comerciais e tabelas de preço',
    ],
  },
  scenario: {
    title: 'Um cenário possível num fabricante com muitos pedidos sob encomenda',
    intro:
      'Um fabricante de equipamentos com cerca de 500 funcionários leva semanas para devolver orçamentos técnicos e perde cotações por prazo.',
    steps: [
      {
        title: 'Diagnóstico',
        body: 'Entrevistas com orçamentação, engenharia, comercial e TI. Levantamos o tempo de resposta das últimas cotações e combinamos o critério de sucesso.',
      },
      {
        title: 'Base de projetos',
        body: 'Pedidos dos últimos anos ligados a BOM, desenho, horas de engenharia e custo realizado.',
      },
      {
        title: 'Piloto na orçamentação',
        body: 'Os orçamentistas usam o assistente para achar projetos parecidos e montar a base do orçamento. A engenharia valida cada orçamento antes de ele sair.',
      },
      {
        title: 'Próxima etapa',
        body: 'Com o critério atingido, a mesma base passa a atender a assistência técnica e a identificação de peças de reposição.',
      },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real. Os números de porte servem só para dar escala ao exemplo.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, na engenharia de machine learning e depois na gestão do produto de IA usado na operação de terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Ainda não temos case publicado com fabricantes de máquinas. O primeiro passo no setor é o diagnóstico, com critério de sucesso combinado antes do piloto.',
  },
  faq: [
    {
      q: 'Nossos desenhos e projetos ficam protegidos?',
      a: 'Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela sua TI. Desenhos, custos e margens ficam restritos por perfil, o uso fica registrado e os dados não são usados para treinar modelos de terceiros. Assinamos acordo de confidencialidade antes do diagnóstico quando a empresa pede.',
    },
    {
      q: 'Funciona com o nosso ERP e o nosso PDM?',
      a: 'Lemos o ERP e o PDM já implantados, ou as pastas de rede onde a engenharia guarda os arquivos. A ligação é de leitura e segue o caminho que a TI aprovar. O diagnóstico confirma o que é possível em cada sistema.',
    },
    {
      q: 'Quanto tempo até ter algo funcionando?',
      a: 'O diagnóstico está planejado para 2 a 4 semanas. O piloto vem em seguida, numa área e num problema, com prazo e critério de sucesso definidos na proposta.',
    },
    {
      q: 'Quem da nossa equipe precisa participar?',
      a: 'Um patrocinador na diretoria, um ponto focal da área do piloto e alguém da TI. A engenharia participa porque valida o que o assistente produz, e combinamos com ela um tempo semanal que não atrapalhe os projetos em andamento.',
    },
    {
      q: 'Quanto custa?',
      a: 'A conversa inicial não tem custo. O diagnóstico tem proposta fechada, e cada etapa seguinte também, montada a partir do que o diagnóstico encontrar.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte quanto tempo leva hoje um orçamento técnico ou um atendimento de assistência. Saímos da conversa com uma ideia de onde o diagnóstico começaria e quem da engenharia precisa estar nele.',
  },
  sources: [
    {
      label: 'IBGE, CEMPRE 2024 (SIDRA, tabela 9529)',
      url: 'https://apisidra.ibge.gov.br/values/t/9529/n3/42/v/all/p/last/c319/all/c12762/all',
    },
    {
      label: 'Abimaq, via Agência Brasil (agosto de 2025)',
      url: 'https://agenciabrasil.ebc.com.br/economia/noticia/2025-08/vendas-da-industria-de-maquinas-sobem-14-no-ano-ate-julho',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
