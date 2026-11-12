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
    lead: 'A Torno junta ERP, fichas técnicas, receitas de tinturaria e o saber de quem tem anos de casa num cérebro da operação. Em cima dele, colocamos agentes de IA para o PCP de coleção, a qualidade, as facções e os representantes. Implantamos por etapas, dentro das regras da sua TI.',
    cta: 'Agendar diagnóstico',
  },
  context: {
    title: 'O setor que mais emprega na indústria catarinense',
    body: [
      'Em Santa Catarina, as divisões de produtos têxteis e de confecção somam 177.518 pessoas ocupadas, o maior contingente da indústria de transformação do estado, e 84 unidades locais com 250 ou mais pessoas ocupadas (IBGE, CEMPRE 2024). No Brasil, a cadeia faturou R$ 221 bilhões em 2024 e tem 1,34 milhão de empregados formais, segundo a Abit.',
      'A pressão de fora aumentou. As importações têxteis e de confecção chegaram a US$ 6,8 bilhões em 2025, com déficit comercial de US$ 5,9 bilhões (Abit). Para quem vende à Europa, a Comissão Europeia planeja adotar no quarto trimestre de 2027 as regras do passaporte digital de produto para têxteis, com composição de fibras, origem e informações de reparo acessíveis por QR code. Atender a isso pede a informação de cada artigo organizada e fácil de achar.',
    ],
  },
  pains: {
    title: 'O que trava uma têxtil grande no dia a dia',
    items: [
      {
        title: 'A coleção depende de quem lembra',
        body: 'Ficha técnica, peça piloto, ajuste de modelagem e consumo de tecido ficam entre o PLM, planilhas e e-mails. Quando a coleção aperta, a resposta certa está com duas ou três pessoas.',
      },
      {
        title: 'Facção sem visibilidade',
        body: 'Saber o que está em cada facção, o que voltou com defeito e quem atrasou na coleção passada exige ligações e planilhas paralelas ao ERP.',
      },
      {
        title: 'Representante pergunta e o comercial para',
        body: 'Grade disponível, prazo de entrega, preço da tabela e status do pedido chegam por WhatsApp o dia todo. Cada resposta exige consultar o ERP e, às vezes, o PCP.',
      },
      {
        title: 'O saber da tinturaria se aposenta',
        body: 'Ajuste de receita para um lote de fio diferente, regulagem de tear, o que fazer quando o tecido sai da rama fora da largura. Esse conhecimento raramente está escrito e sai da empresa com quem se aposenta.',
      },
    ],
  },
  areas: {
    title: 'Onde os agentes trabalham numa têxtil',
    intro:
      'Começamos pela área que mais perde tempo hoje. Os exemplos abaixo são ilustrativos. O diagnóstico define por onde começar.',
    items: [
      {
        area: 'PCP e produção',
        title: 'PCP de coleção com a informação junta',
        body: 'O agente consulta ordens de produção, roteiros, fichas técnicas e a fila de enfesto e corte, e avisa quando uma OP ameaça a data da coleção.',
        example:
          '“Quais OPs da coleção de inverno ainda não passaram pelo corte e quais dependem de tecido da tinturaria?”',
      },
      {
        area: 'Facções',
        title: 'Acompanhamento de terceiros',
        body: 'Reúne remessas, retornos, prazos combinados e defeitos por facção num só lugar, a partir do ERP e das planilhas que já existem.',
        example: '“Quais facções têm peças da referência 2318 e como foi o prazo de cada uma na coleção passada?”',
      },
      {
        area: 'Qualidade',
        title: 'Defeito, causa e ação anterior',
        body: 'Busca em não conformidades, laudos de laboratório e reclamações de lojistas, e prepara o rascunho do relatório com o que já foi feito em casos parecidos.',
        example: '“Já tivemos reclamação de torção nesta malha? O que mudamos no beneficiamento?”',
      },
      {
        area: 'Tinturaria e beneficiamento',
        title: 'Receitas e procedimentos consultáveis',
        body: 'O saber dos tintureiros e dos operadores de rama fica registrado, revisado por quem conhece e disponível no celular do turno da noite.',
        example: '“Que ajuste de receita usamos da última vez que o fio veio com absorção diferente?”',
      },
      {
        area: 'Comercial e representantes',
        title: 'Resposta ao representante em minutos',
        body: 'Um assistente para representantes com grade disponível, prazo, tabela de preço e status de pedido, dentro das regras comerciais e das permissões de cada um.',
        example: '“Tenho grade completa da 5120 na cor marinho para entrega em março?”',
      },
      {
        area: 'Marketing e catálogo',
        title: 'Ficha de produto a partir do dado aprovado',
        body: 'Composição, cuidados de lavagem e descrição de produto gerados a partir da ficha técnica, prontos para o catálogo, a venda B2B e, quando for exigido, o passaporte digital.',
        example: '“Gere as descrições da coleção de verão para o catálogo dos representantes, com composição e cuidados.”',
      },
    ],
  },
  mock: {
    question: 'Qual o consumo de tecido da referência 4471 no tamanho G e o que mudou desde a coleção passada?',
    answer:
      'Pela ficha técnica vigente, a referência 4471 consome 1,38 m de malha por peça no tamanho G. Na coleção passada eram 1,42 m. A redução veio de um novo encaixe aprovado pela modelagem depois da segunda peça piloto. O enfesto da OP 88213 já usa o consumo novo.',
    citations: ['Ficha técnica 4471, rev. C', 'Ata de aprovação da peça piloto 2', 'OP 88213, ERP'],
  },
  brain: {
    title: 'Como o cérebro da operação se monta numa têxtil',
    body: [
      'Partimos do que a empresa já tem. O ERP traz pedidos, ordens de produção, estoque de fio e tecido e o movimento das facções. O PLM ou as pastas da modelagem trazem fichas técnicas e revisões. O resto está em planilhas de PCP, laudos de laboratório, receitas de tinturaria e conversas com representantes.',
      'Cada resposta cita a fonte, e cada pessoa só vê o que o perfil dela permite. O representante consulta grade e prazo e não enxerga custo. A modelagem vê fichas e revisões. Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela TI.',
    ],
    inputs: [
      'Pedidos, OPs e estoque do ERP',
      'Fichas técnicas e revisões de modelagem',
      'Planilhas de PCP e de acompanhamento de facções',
      'Receitas e procedimentos de tinturaria e beneficiamento',
      'Laudos de laboratório e não conformidades',
      'Tabelas de preço e regras comerciais',
      'Entrevistas gravadas com tintureiros, mecânicos e modelistas experientes',
    ],
  },
  scenario: {
    title: 'Um cenário possível numa confecção com rede de representantes',
    intro:
      'Uma confecção com cerca de 900 funcionários e 60 representantes recebe dezenas de consultas por dia sobre grade, prazo e pedido. Veja como um piloto poderia correr.',
    steps: [
      {
        title: 'Diagnóstico',
        body: 'Entrevistas com comercial, PCP e TI. Medimos quantas consultas chegam por dia e quanto tempo cada uma leva, e combinamos o critério de sucesso do piloto.',
      },
      {
        title: 'Base do piloto',
        body: 'Conexão de leitura ao ERP para estoque, carteira e pedidos, mais tabela de preço e regras de desconto. Permissões por representante e por região.',
      },
      {
        title: 'Piloto com um grupo de representantes',
        body: 'Dez representantes usam o assistente por algumas semanas. O comercial revisa as respostas duvidosas e ajusta as regras.',
      },
      {
        title: 'Decisão de expansão',
        body: 'Comparamos tempo de resposta e volume de consultas ao comercial antes e depois. Com o critério atingido, a etapa seguinte leva o assistente à rede toda e começa o PCP de coleção.',
      },
    ],
    note: 'Cenário ilustrativo e hipotético, sem relação com uma empresa real. Os números de porte servem só para dar escala ao exemplo.',
  },
  proof: {
    title: 'De onde vem a nossa experiência',
    body: 'Quem conduz a Torno trabalhou na Loopt, primeiro na engenharia de machine learning e depois na gestão do produto de IA usado na operação de terminais de contêineres. Segundo a Loopt (MundoLogística, 13/01/2026), a solução reduziu em 27% os movimentos improdutivos e aumentou a produtividade em 21%. Ainda não temos case publicado em têxtil e confecção. Por isso, no setor, o trabalho começa pelo diagnóstico, com critério de sucesso combinado antes do piloto.',
  },
  faq: [
    {
      q: 'Nossas fichas e coleções ficam protegidas?',
      a: 'Os dados ficam na infraestrutura da empresa ou numa nuvem aprovada pela sua TI. O acesso é por perfil, o uso fica registrado e os dados não são usados para treinar modelos de terceiros. Assinamos acordo de confidencialidade antes do diagnóstico quando a empresa pede.',
    },
    {
      q: 'Funciona com o ERP que já usamos?',
      a: 'Trabalhamos com o ERP já implantado, seja um sistema específico de moda ou um ERP geral como TOTVS, SAP ou Senior. A ligação é de leitura, pelo caminho que a TI aprovar: API, réplica do banco ou exportação agendada. O diagnóstico confirma o caminho para o seu sistema antes da proposta do piloto.',
    },
    {
      q: 'O que acontece com o conhecimento dos tintureiros e mecânicos mais antigos?',
      a: 'Registramos esse conhecimento em entrevistas e acompanhamento no posto de trabalho. A pessoa revisa o que foi escrito antes de entrar na base, e cada procedimento fica com o nome de quem o validou. Quem chega consulta no celular, com a fonte.',
    },
    {
      q: 'Quanto tempo até ter algo funcionando?',
      a: 'O diagnóstico está planejado para 2 a 4 semanas. O piloto vem em seguida, numa área e num problema, com prazo e critério de sucesso definidos na proposta.',
    },
    {
      q: 'Quanto custa?',
      a: 'A conversa inicial não tem custo. Depois dela enviamos uma proposta fechada para o diagnóstico. Cada etapa seguinte tem proposta fechada própria, feita a partir do que o diagnóstico encontrar.',
    },
  ],
  finalCta: {
    title: 'Comece por uma conversa de 45 minutos',
    body: 'Conte onde a coleção mais trava hoje, se no PCP, nas facções ou no comercial. Saímos da conversa com uma ideia clara de por onde o diagnóstico começaria e quem precisa participar.',
  },
  sources: [
    {
      label: 'IBGE, CEMPRE 2024 (SIDRA, tabela 9529)',
      url: 'https://apisidra.ibge.gov.br/values/t/9529/n3/42/v/all/p/last/c319/all/c12762/all',
    },
    { label: 'Abit, perfil do setor', url: 'https://www.abit.org.br/cont/perfil-do-setor' },
    {
      label: 'Comissão Europeia, passaporte digital de produto para têxteis',
      url: 'https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/textile-apparel_en',
    },
    {
      label: 'MundoLogística, 13/01/2026 (resultados segundo a Loopt)',
      url: 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres',
    },
  ],
};
