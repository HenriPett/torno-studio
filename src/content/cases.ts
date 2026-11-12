/**
 * Cases da Torno (estratégia 2026-11 §5): experiência de quem conduz a Torno, anterior à empresa,
 * reescrita para o público industrial. Regras que este arquivo segue:
 * - Loopt: só −27% / +21%, "segundo a Loopt", MundoLogística 13/01/2026, resultado da equipe.
 *   Nunca citar clientes da Loopt nem descrevê-los de forma identificável.
 * - Bom.Capital: números autodeclarados, sempre como relato, sem selo de resultado publicado.
 * - Ascende: projeto próprio, nunca cliente.
 *
 * Contrato com a home: `name`, `title`, `description`, `category` e `routeId` continuam strings no
 * topo de cada case. O resto do tipo é usado só por src/components/cases/*.
 */
import type { Locale, RouteId } from '../lib/i18n';

export type CaseSlug = 'loopt' | 'bom-capital' | 'ascende';
export const caseSlugs: CaseSlug[] = ['loopt', 'bom-capital', 'ascende'];

export interface CaseItem {
  title: string;
  body: string;
}

export interface CaseStudy {
  routeId: RouteId;
  name: string;
  category: string;
  title: string;
  description: string;
  /** Texto curto do card no índice e nos "outros cases". */
  summary: string;
  lead: string;
  /** Ficha lateral do hero. */
  facts: { role: string; scope: string; evidence: string };
  /** Rodapé de honestidade: de onde vem a experiência. */
  footnote: string;
  screenshot: { image: 'loopt' | 'ascende'; host: string; alt: string; caption: string } | null;
  context: { title: string; paragraphs: string[] };
  work: { title: string; items: CaseItem[] };
  flow: { title: string; example?: { label: string; text: string }; steps: CaseItem[]; note: string };
  results: {
    title: string;
    lead: string;
    /** Só números com fonte pública (Loopt). */
    stats?: { value: string; label: string; source: { label: string; href: string } }[];
    /** Gráfico do relato (Bom.Capital). */
    chart?: 'bom-capital';
    /** Produto publicado (Ascende). */
    product?: { title: string; items: string[]; link: { label: string; href: string } };
    note: string;
  };
  meaning: { title: string; lead: string; items: CaseItem[]; note?: string };
  sources: { label: string; href: string }[];
  sourceNote: string;
  cta: { title: string; text: string };
}

const mundoLogistica = 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres';

export const caseStudies: Record<Locale, Record<CaseSlug, CaseStudy>> = {
  'pt-BR': {
    loopt: {
      routeId: 'caseLoopt',
      name: 'Loopt',
      category: 'IA na operação · Experiência profissional',
      title: 'Loopt: IA na operação de terminais de contêineres',
      description:
        'Experiência de quem conduz a Torno na engenharia de Machine Learning e na gestão do produto de IA da Loopt, usado na operação de pátios de contêineres. Resultados publicados pela empresa.',
      summary:
        'Um produto de IA que recomenda onde posicionar cada contêiner no pátio. Segundo a Loopt, a solução da equipe reduziu em 27% os movimentos improdutivos.',
      lead:
        'Henrique Pett, que lidera a Torno, construiu o núcleo de Machine Learning da Loopt e depois assumiu a gestão do produto de IA. O produto recomenda onde posicionar cada contêiner no pátio e é usado por planejadores e operadores no dia a dia do terminal.',
      facts: {
        role: 'Engenharia de Machine Learning e, depois, gestão do produto de IA',
        scope: 'Produto de IA para a operação de terminais e pátios de contêineres',
        evidence: 'Resultados publicados pela Loopt, com fonte pública',
      },
      footnote: 'Experiência profissional de quem conduz a Torno, anterior à empresa; não é uma contratação da Torno.',
      screenshot: {
        image: 'loopt',
        host: 'loopt.com.br',
        alt: 'Captura do site público da Loopt apresentando sequenciamento, posicionamento e execução.',
        caption:
          'Site público da Loopt, capturado em 14/10/2026. A imagem mostra o produto; não é uma tela interna nem indica que o site foi feito pela Torno.',
      },
      context: {
        title: 'Cada posição escolhida no pátio muda o trabalho das horas seguintes',
        paragraphs: [
          'Um terminal de contêineres decide o tempo todo onde colocar cada unidade. Uma posição ruim obriga a remanejar outras pilhas quando um contêiner precisa sair, e cada movimento extra ocupa equipamento e operador. São muitas decisões por turno, limitadas por espaço, equipamento e prazo.',
          'Os dados para decidir já existiam nos sistemas de operação do terminal. O trabalho foi transformar esses dados numa recomendação que o planejador e o operador usam no momento da decisão.',
        ],
      },
      work: {
        title: 'Do modelo ao produto usado no turno',
        items: [
          {
            title: 'Núcleo de Machine Learning',
            body: 'Como engenheiro de Machine Learning, Henrique desenvolveu o núcleo da solução, da modelagem à produção, com técnicas de Machine Learning e Deep Learning.',
          },
          {
            title: 'Ligação com a operação',
            body: 'O modelo trabalha com os dados dos sistemas que o terminal já usa e devolve a recomendação dentro do fluxo de trabalho de quem planeja e executa.',
          },
          {
            title: 'Gestão do produto de IA',
            body: 'Depois, ele assumiu a gestão do produto, ligando o que a operação pedia às prioridades de uma equipe multidisciplinar, e continuou escrevendo código de produção.',
          },
        ],
      },
      flow: {
        title: 'Do dado à decisão no pátio',
        steps: [
          { title: 'Dados da operação', body: 'Informações que o terminal já registra nos seus sistemas de operação.' },
          { title: 'Modelo e otimização', body: 'O produto avalia as condições e as restrições do pátio e calcula uma recomendação de posição.' },
          { title: 'Decisão de quem opera', body: 'Planejadores e operadores recebem a recomendação e decidem o posicionamento e a execução.' },
        ],
        note: 'Visão conceitual baseada na apresentação pública da solução. Não reproduz a arquitetura interna.',
      },
      results: {
        title: 'Resultados publicados pela Loopt',
        lead: 'Segundo a Loopt, em matéria da MundoLogística de 13 de janeiro de 2026, a aplicação da tecnologia reduziu em 27% os movimentos improdutivos e aumentou em 21% a produtividade.',
        stats: [
          { value: '−27%', label: 'de movimentos improdutivos', source: { label: 'Loopt, em matéria da MundoLogística de 13/01/2026', href: mundoLogistica } },
          { value: '+21%', label: 'de produtividade', source: { label: 'Loopt, em matéria da MundoLogística de 13/01/2026', href: mundoLogistica } },
        ],
        note: 'São resultados da solução desenvolvida pela equipe da Loopt, segundo a empresa. Não medem a contribuição individual de quem conduz a Torno.',
      },
      meaning: {
        title: 'Os mesmos problemas aparecem na fábrica',
        lead: 'Um pátio de contêineres e uma linha de produção são operações diferentes. O tipo de problema que esse produto enfrenta aparece no PCP, na qualidade e na manutenção.',
        items: [
          {
            title: 'Dados em sistemas que já existem',
            body: 'No terminal, a informação estava nos sistemas de operação. Na indústria, está no ERP, no MES quando existe, em planilhas e em apontamentos. O primeiro trabalho é ler o que já existe, sem pedir que a operação troque de sistema.',
          },
          {
            title: 'Decisão com restrição, a toda hora',
            body: 'Posicionar um contêiner se parece com sequenciar ordens no PCP. São muitas decisões por turno, com capacidade, setup e prazo limitando as opções.',
          },
          {
            title: 'Adoção por quem opera',
            body: 'A recomendação só tem valor se o planejador a usa no turno. Na fábrica vale o mesmo para o programador de produção, o inspetor de qualidade e o técnico de manutenção.',
          },
          {
            title: 'Modelo que funciona no chão',
            body: 'Entre o modelo que funciona no teste e o que funciona no turno há integração, monitoramento e ajuste com a operação. É a etapa que a Torno acompanha depois do piloto.',
          },
        ],
      },
      sources: [
        { label: 'Site da Loopt', href: 'https://loopt.com.br/' },
        { label: 'MundoLogística · 13/01/2026', href: mundoLogistica },
      ],
      sourceNote:
        'A participação de Henrique Pett é descrita a partir do histórico profissional dele. Os números são da Loopt e se referem à solução desenvolvida pela equipe.',
      cta: {
        title: 'Sua operação decide o tempo todo com dados espalhados?',
        text: 'Na conversa inicial olhamos onde a decisão acontece, que sistemas guardam os dados e o que um piloto mediria.',
      },
    },
    'bom-capital': {
      routeId: 'caseBomCapital',
      name: 'Bom.Capital',
      category: 'Dados e crédito · Experiência profissional',
      title: 'Bom.Capital: software e Machine Learning na análise de crédito',
      description:
        'Experiência de quem conduz a Torno no sistema de carteira de crédito e na solução de Machine Learning para análise de propostas da Bom.Capital. Números apresentados como relato.',
      summary:
        'Sistema de carteira de crédito e solução de Machine Learning para analisar propostas. Segundo relato de quem conduziu o projeto, a resposta caiu de 48 horas para menos de 2.',
      lead:
        'Na Bom.Capital, fintech de microcrédito digital, Henrique Pett, que lidera a Torno, desenvolveu o sistema de carteira de crédito e depois, como primeiro profissional de dados da empresa, construiu a solução de Machine Learning para análise e aprovação de propostas.',
      facts: {
        role: 'Desenvolvimento full stack e ciência de dados',
        scope: 'Carteira de crédito e análise de propostas',
        evidence: 'Relato de quem conduziu o projeto, sem publicação externa',
      },
      footnote: 'Experiência profissional de quem conduz a Torno, anterior à empresa; não é uma contratação da Torno.',
      screenshot: null,
      context: {
        title: 'A resposta ao cliente dependia da fila de análise',
        paragraphs: [
          'Segundo relato de quem conduziu o projeto, o intervalo entre receber uma proposta de crédito e responder ao cliente levava, em média, 48 horas.',
          'O trabalho teve duas frentes: o sistema que gerencia a carteira e uma camada de dados e Machine Learning para apoiar a análise. O ganho relatado é de tempo de processo e não diz nada sobre rentabilidade ou qualidade da carteira.',
        ],
      },
      work: {
        title: 'Do sistema de carteira ao modelo de análise',
        items: [
          {
            title: 'Sistema de carteira',
            body: 'Henrique desenvolveu do zero o gerenciador de carteira de crédito, com interface, backend, dados e infraestrutura, usando React, Elixir, Python, PostgreSQL e AWS.',
          },
          {
            title: 'Solução de ML para análise',
            body: 'Como primeiro profissional de dados da empresa, construiu a solução de análise e aprovação de crédito e a encaixou no processo que a equipe já seguia.',
          },
          {
            title: 'Trabalho com outras áreas',
            body: 'Participou do início do modelo de credit scoring e da conversa com times e empresas externas, aproximando o desenvolvimento das regras do negócio.',
          },
        ],
      },
      flow: {
        title: 'O trecho do processo que foi comparado',
        steps: [
          { title: 'Proposta recebida', body: 'Começo do intervalo usado no relato.' },
          { title: 'Análise de crédito', body: 'Etapa apoiada pela solução de Machine Learning.' },
          { title: 'Resposta ao cliente', body: 'Fim do intervalo comparado.' },
        ],
        note: 'Esquema explicativo do processo. Não reproduz telas nem regras de decisão da empresa.',
      },
      results: {
        title: 'De 48 horas, em média, para menos de 2 horas, segundo o relato',
        lead: 'No processo acompanhado, segundo relato de quem conduziu o projeto, a resposta ao cliente passou de uma média de 48 horas para menos de 2 horas.',
        chart: 'bom-capital',
        note: 'Fonte: relato de Henrique Pett, sem publicação externa. “Menos de 2 horas” é um limite superior; a barra tracejada não representa uma duração exata.',
      },
      meaning: {
        title: 'A indústria também analisa crédito todo dia',
        lead: 'Quem vende a prazo para distribuidores, lojistas e clientes de representantes decide crédito com dados do ERP, consultas externas e planilhas.',
        items: [
          {
            title: 'Cadastro de cliente novo',
            body: 'Reunir documentos, consultas e histórico num lugar só antes de liberar o primeiro pedido.',
          },
          {
            title: 'Limite e prazo com dados',
            body: 'Sugerir limite a partir do histórico de pagamento que já está no ERP, com a regra da empresa visível para quem aprova.',
          },
          {
            title: 'Pedido retido por crédito',
            body: 'Mostrar ao comercial e ao representante por que um pedido está parado e o que falta para liberar.',
          },
        ],
        note: 'Exemplos de aplicação. Não são projetos já feitos pela Torno.',
      },
      sources: [],
      sourceNote:
        'Fonte: histórico profissional de Henrique Pett na Bom.Capital. O gráfico foi feito para este case com os valores do relato e não é uma auditoria independente.',
      cta: {
        title: 'Pedidos esperam por análise de crédito na sua empresa?',
        text: 'Na conversa inicial mapeamos o caminho do cadastro à liberação e onde o tempo se acumula.',
      },
    },
    ascende: {
      routeId: 'caseAscende',
      name: 'Ascende',
      category: 'Projeto próprio · Produto de IA de ponta a ponta',
      title: 'Ascende: registro por texto e áudio que vira dado organizado',
      description:
        'Projeto próprio de quem conduz a Torno: um aplicativo com IA que transforma texto ou áudio em registros revisáveis, construído da concepção à publicação.',
      summary:
        'Aplicativo com IA que transforma uma frase falada ou escrita em registros que a pessoa revisa antes de salvar. Projeto próprio, publicado e no ar.',
      lead:
        'O Ascende é um aplicativo que Henrique Pett, que lidera a Torno, criou como projeto próprio. A pessoa descreve o dia por texto ou áudio e a IA separa a fala em registros de finanças, treino e sono, que ela revisa antes de salvar.',
      facts: {
        role: 'Concepção, desenvolvimento e publicação',
        scope: 'Aplicação web com IA e captura por texto e áudio',
        evidence: 'Produto publicado e disponível online',
      },
      footnote: 'Projeto próprio de quem conduz a Torno; não é um cliente nem uma contratação da Torno.',
      screenshot: {
        image: 'ascende',
        host: 'ascende.site',
        alt: 'Captura da página pública do Ascende, com a proposta de reunir corpo, dinheiro e mente.',
        caption: 'Página pública do Ascende, capturada em 14/10/2026. A demonstração exibida no site é ilustrativa, sem dados de uma conta pessoal.',
      },
      context: {
        title: 'O problema era o trabalho de registrar',
        paragraphs: [
          'Quando cada assunto fica num aplicativo, registrar o dia exige abrir várias telas e preencher formulários. O Ascende parte de uma frase falada ou escrita, que pode conter um gasto, um treino e uma informação de sono ao mesmo tempo.',
          'A parte de produto é organizar essa frase sem obrigar a pessoa a começar por um formulário. A parte técnica é ligar captura, revisão, armazenamento e o contexto que o Conselheiro de IA usa para responder.',
        ],
      },
      work: {
        title: 'Um produto completo em volta da IA',
        items: [
          {
            title: 'Captura e revisão',
            body: 'Fluxos que transformam linguagem natural em registros por área. A pessoa confere o que a IA entendeu antes de confirmar.',
          },
          {
            title: 'Conta, dados e contexto',
            body: 'Autenticação, dados persistentes e um Conselheiro que responde com o contexto da conta. A aplicação usa React e TypeScript; o Supabase reúne banco, autenticação e funções de servidor.',
          },
          {
            title: 'Integrações e publicação',
            body: 'Claude API, publicação na Netlify, importação de dados do App Saúde e de arquivos CSV, e um canal de WhatsApp para registrar e conversar.',
          },
        ],
      },
      flow: {
        title: 'Da fala ao registro confirmado',
        example: { label: 'Exemplo ilustrativo, com dados fictícios', text: '“Gastei R$ 47 no mercado, treinei pernas e dormi 6 horas.”' },
        steps: [
          { title: 'Entrada por texto ou áudio', body: 'A pessoa fala ou escreve do jeito que lembraria.' },
          { title: 'Interpretação pela IA', body: 'A frase vira três registros: R$ 47 em mercado, treino de pernas e 6 horas de sono.' },
          { title: 'Revisão', body: 'A pessoa confere e corrige antes de salvar.' },
          { title: 'Registro e contexto', body: 'Os dados confirmados ficam na conta e entram nas respostas do Conselheiro.' },
        ],
        note: 'Exemplo ilustrativo, com dados fictícios. Os passos explicam o fluxo; não são uma captura de uma conta real.',
      },
      results: {
        title: 'O resultado é um produto no ar',
        lead: 'O Ascende está publicado, com página pública, acesso por conta e uso definido. Ele mostra a experiência de quem conduz a Torno em levar um produto de IA da ideia à publicação e mantê-lo funcionando.',
        product: {
          title: 'O que está publicado',
          items: [
            'Aplicação web com acesso por conta',
            'Captura em linguagem natural, com revisão antes de salvar',
            'Conselheiro de IA com o contexto da conta',
          ],
          link: { label: 'Conhecer o Ascende', href: 'https://ascende.site/' },
        },
        note: 'A evidência é o produto publicado. Os recursos foram conferidos na página pública e na documentação do projeto; os fluxos com login não foram auditados para este case.',
      },
      meaning: {
        title: 'Na fábrica, o apontamento também pode ser falado',
        lead: 'O mesmo desenho serve onde as mãos estão ocupadas e o formulário costuma ficar para o fim do turno.',
        items: [
          {
            title: 'Apontamento por voz',
            body: 'O operador diz “parada de 20 minutos na injetora 3 para troca de molde” e o sistema monta o apontamento para ele conferir.',
          },
          {
            title: 'Revisão antes de gravar',
            body: 'Quem falou confirma o que a IA entendeu. O dado chega ao sistema com responsável e horário.',
          },
          {
            title: 'Produto inteiro, uma liderança',
            body: 'Interface, dados, permissões e IA pensados juntos. É a forma de trabalho que a Torno leva aos projetos, com liderança técnica única do diagnóstico à operação.',
          },
        ],
        note: 'Exemplos ilustrativos. A Torno ainda não implantou captura por voz numa fábrica.',
      },
      sources: [{ label: 'Conhecer o Ascende', href: 'https://ascende.site/' }],
      sourceNote: 'Projeto próprio de Henrique Pett. O conteúdo técnico se baseia no repositório, na documentação e na página pública do projeto.',
      cta: {
        title: 'Sua equipe aponta a produção no fim do turno, de memória?',
        text: 'Na conversa inicial vemos o que é apontado hoje, por quem e em que sistema.',
      },
    },
  },
  en: {
    loopt: {
      routeId: 'caseLoopt',
      name: 'Loopt',
      category: 'AI in operations · Professional experience',
      title: 'Loopt: AI in container terminal operations',
      description:
        'Experience of the person who leads Torno in Machine Learning engineering and AI product management at Loopt, a product used in container yard operations. Results published by the company.',
      summary:
        'An AI product that recommends where to place each container in the yard. According to Loopt, the team’s solution cut unproductive moves by 27%.',
      lead:
        'Henrique Pett, who leads Torno, built Loopt’s core Machine Learning solution and later took over management of the AI product. The product recommends where to place each container in the yard and is used by planners and operators in the terminal’s daily work.',
      facts: {
        role: 'Machine Learning engineering, then AI product management',
        scope: 'AI product for container terminal and yard operations',
        evidence: 'Results published by Loopt, with a public source',
      },
      footnote: 'Professional experience of the person who leads Torno, predating the company; not a Torno engagement.',
      screenshot: {
        image: 'loopt',
        host: 'loopt.com.br',
        alt: 'Screenshot of the public Loopt website describing sequencing, positioning and execution.',
        caption:
          'Loopt’s public website, captured October 14, 2026. The image shows the product; it is not an internal screen and does not mean Torno built the website.',
      },
      context: {
        title: 'Every position chosen in the yard shapes the next hours of work',
        paragraphs: [
          'A container terminal constantly decides where to put each unit. A poor position forces other stacks to be reshuffled when a container needs to leave, and every extra move ties up equipment and an operator. There are many decisions per shift, limited by space, equipment and deadlines.',
          'The data needed to decide already existed in the terminal’s operating systems. The work was turning that data into a recommendation planners and operators use at the moment of decision.',
        ],
      },
      work: {
        title: 'From the model to a product used on shift',
        items: [
          {
            title: 'Core Machine Learning',
            body: 'As a Machine Learning engineer, Henrique developed the core of the solution from modeling to production, using Machine Learning and Deep Learning.',
          },
          {
            title: 'Connection to operations',
            body: 'The model works with data from the systems the terminal already uses and returns its recommendation inside the workflow of the people who plan and execute.',
          },
          {
            title: 'AI product management',
            body: 'He then took over product management, connecting what operations needed with the priorities of a cross-functional team, and kept writing production code.',
          },
        ],
      },
      flow: {
        title: 'From data to a decision in the yard',
        steps: [
          { title: 'Operational data', body: 'Information the terminal already records in its operating systems.' },
          { title: 'Model and optimization', body: 'The product weighs yard conditions and constraints and computes a recommended position.' },
          { title: 'Operator decision', body: 'Planners and operators receive the recommendation and decide on positioning and execution.' },
        ],
        note: 'A conceptual view based on the public product description. It does not reproduce the internal architecture.',
      },
      results: {
        title: 'Results published by Loopt',
        lead: 'According to Loopt, in a MundoLogística article from January 13, 2026, the technology reduced unproductive moves by 27% and increased productivity by 21%.',
        stats: [
          { value: '−27%', label: 'unproductive moves', source: { label: 'Loopt, in MundoLogística, Jan 13, 2026', href: mundoLogistica } },
          { value: '+21%', label: 'productivity', source: { label: 'Loopt, in MundoLogística, Jan 13, 2026', href: mundoLogistica } },
        ],
        note: 'These are results of the solution built by the Loopt team, according to the company. They do not measure the individual contribution of the person who leads Torno.',
      },
      meaning: {
        title: 'The same problems show up in the plant',
        lead: 'A container yard and a production line are different operations. The kind of problem this product deals with shows up in production planning, quality and maintenance.',
        items: [
          {
            title: 'Data in systems you already have',
            body: 'At the terminal, information lived in operating systems. In a plant it lives in the ERP, the MES when there is one, spreadsheets and shop-floor logs. The first job is reading what already exists without asking operations to switch systems.',
          },
          {
            title: 'Constrained decisions, all day',
            body: 'Placing a container resembles sequencing production orders. Many decisions per shift, with capacity, setup and due dates limiting the options.',
          },
          {
            title: 'Adoption by operators',
            body: 'A recommendation only matters if the planner uses it on shift. In a plant the same applies to the production scheduler, the quality inspector and the maintenance technician.',
          },
          {
            title: 'A model that works on the floor',
            body: 'Between a model that works in testing and one that works on shift there is integration, monitoring and tuning with operations. That is the stage Torno stays on after the pilot.',
          },
        ],
      },
      sources: [
        { label: 'Loopt website', href: 'https://loopt.com.br/' },
        { label: 'MundoLogística · January 13, 2026', href: mundoLogistica },
      ],
      sourceNote:
        'Henrique Pett’s role is described from his professional history. The figures are Loopt’s and refer to the solution built by the team.',
      cta: {
        title: 'Does your operation make constant decisions with scattered data?',
        text: 'In the first call we look at where decisions happen, which systems hold the data and what a pilot would measure.',
      },
    },
    'bom-capital': {
      routeId: 'caseBomCapital',
      name: 'Bom.Capital',
      category: 'Data and credit · Professional experience',
      title: 'Bom.Capital: software and Machine Learning for credit analysis',
      description:
        'Experience of the person who leads Torno on Bom.Capital’s credit portfolio system and its Machine Learning solution for application analysis. Figures are presented as a self-reported account.',
      summary:
        'A credit portfolio system and a Machine Learning solution to analyze applications. According to the account of the person who led it, response time fell from 48 hours to under 2.',
      lead:
        'At Bom.Capital, a digital microcredit fintech, Henrique Pett, who leads Torno, built the credit portfolio system and later, as the company’s first data professional, the Machine Learning solution for credit analysis and approval.',
      facts: {
        role: 'Full-stack development and data science',
        scope: 'Credit portfolio and application analysis',
        evidence: 'Account of the person who led the work, no external publication',
      },
      footnote: 'Professional experience of the person who leads Torno, predating the company; not a Torno engagement.',
      screenshot: null,
      context: {
        title: 'The customer response depended on the analysis queue',
        paragraphs: [
          'According to the account of the person who led the work, the interval between receiving a credit application and responding to the customer averaged 48 hours.',
          'The work had two fronts: the system that manages the portfolio and a data and Machine Learning layer supporting analysis. The reported gain is in process time and says nothing about portfolio profitability or credit quality.',
        ],
      },
      work: {
        title: 'From the portfolio system to the analysis model',
        items: [
          {
            title: 'Portfolio system',
            body: 'Henrique built the credit portfolio manager from scratch, covering interface, backend, data and infrastructure, with React, Elixir, Python, PostgreSQL and AWS.',
          },
          {
            title: 'ML solution for analysis',
            body: 'As the company’s first data professional, he built the credit analysis and approval solution and fitted it into the process the team already followed.',
          },
          {
            title: 'Working across teams',
            body: 'He contributed to the early credit scoring model and to conversations with other teams and external companies, bringing development closer to the business rules.',
          },
        ],
      },
      flow: {
        title: 'The part of the process that was compared',
        steps: [
          { title: 'Application received', body: 'Start of the interval in the account.' },
          { title: 'Credit analysis', body: 'The stage supported by the Machine Learning solution.' },
          { title: 'Customer response', body: 'End of the compared interval.' },
        ],
        note: 'An explanatory process diagram. It does not reproduce company screens or decision rules.',
      },
      results: {
        title: 'From an average of 48 hours to under 2 hours, as reported',
        lead: 'In the process covered, according to the account of the person who led the work, customer response time fell from an average of 48 hours to under 2 hours.',
        chart: 'bom-capital',
        note: 'Source: Henrique Pett’s account, with no external publication. “Under 2 hours” is an upper bound; the dashed bar does not represent an exact duration.',
      },
      meaning: {
        title: 'Manufacturers analyze credit every day too',
        lead: 'Companies that sell on terms to distributors, retailers and sales reps’ customers decide credit with ERP data, external checks and spreadsheets.',
        items: [
          { title: 'New customer onboarding', body: 'Bring documents, checks and history into one place before the first order is released.' },
          { title: 'Limits and terms from data', body: 'Suggest a limit from the payment history already in the ERP, with the company’s rule visible to the approver.' },
          { title: 'Orders held for credit', body: 'Show sales and the rep why an order is on hold and what is missing to release it.' },
        ],
        note: 'Application examples. These are not projects Torno has delivered.',
      },
      sources: [],
      sourceNote:
        'Source: Henrique Pett’s professional history at Bom.Capital. The chart was made for this case study from the reported values and is not an independent audit.',
      cta: {
        title: 'Do orders wait on credit analysis at your company?',
        text: 'In the first call we map the path from onboarding to release and where time builds up.',
      },
    },
    ascende: {
      routeId: 'caseAscende',
      name: 'Ascende',
      category: 'Own project · End-to-end AI product',
      title: 'Ascende: text and voice entries that become organized data',
      description:
        'An own project of the person who leads Torno: an AI app that turns text or voice into reviewable records, built from concept to launch.',
      summary:
        'An AI app that turns a spoken or written sentence into records the user reviews before saving. An own project, published and live.',
      lead:
        'Ascende is an app Henrique Pett, who leads Torno, created as his own project. The user describes the day by text or voice, and the AI splits it into finance, workout and sleep records that the user reviews before saving.',
      facts: {
        role: 'Concept, development and launch',
        scope: 'Web app with AI and text and voice capture',
        evidence: 'Published product, available online',
      },
      footnote: 'Own project of the person who leads Torno; not a client or a Torno engagement.',
      screenshot: {
        image: 'ascende',
        host: 'ascende.site',
        alt: 'Screenshot of Ascende’s public website presenting body, money and mind in a single app.',
        caption: 'Ascende’s public page, captured October 14, 2026. The site’s demo is illustrative and contains no personal account data.',
      },
      context: {
        title: 'The problem was the work of logging',
        paragraphs: [
          'When each topic lives in a separate app, logging a day means opening several screens and filling in forms. Ascende starts from one spoken or written sentence, which can hold an expense, a workout and sleep information at once.',
          'The product challenge is organizing that sentence without making the user start with a form. The technical challenge is connecting capture, review, storage and the context the AI advisor uses to answer.',
        ],
      },
      work: {
        title: 'A complete product around the AI',
        items: [
          { title: 'Capture and review', body: 'Workflows that turn natural language into records by area. The user checks what the AI understood before confirming.' },
          {
            title: 'Account, data and context',
            body: 'Authentication, persistent data and an advisor that answers with the account’s context. The app uses React and TypeScript; Supabase provides the database, authentication and server functions.',
          },
          { title: 'Integrations and launch', body: 'Claude API, Netlify deployment, imports from Apple Health and CSV files, and a WhatsApp channel for logging and conversation.' },
        ],
      },
      flow: {
        title: 'From a sentence to a confirmed record',
        example: { label: 'Illustrative example with fictional data', text: '“I spent R$47 on groceries, trained legs and slept 6 hours.”' },
        steps: [
          { title: 'Text or voice input', body: 'The user speaks or types the way they would remember it.' },
          { title: 'AI interpretation', body: 'The sentence becomes three records: R$47 on groceries, a leg workout and 6 hours of sleep.' },
          { title: 'Review', body: 'The user checks and corrects before saving.' },
          { title: 'Record and context', body: 'Confirmed data stays in the account and feeds the advisor’s answers.' },
        ],
        note: 'Illustrative example with fictional data. The steps explain the workflow; they are not a screenshot of a real account.',
      },
      results: {
        title: 'The outcome is a live product',
        lead: 'Ascende is published, with a public page, account access and a defined use. It shows the experience of the person who leads Torno in taking an AI product from idea to launch and keeping it running.',
        product: {
          title: 'What is live',
          items: ['Web app with account access', 'Natural-language capture with review before saving', 'AI advisor with account context'],
          link: { label: 'Explore Ascende', href: 'https://ascende.site/' },
        },
        note: 'The evidence is the published product. Features were checked against the public page and project documentation; logged-in workflows were not audited for this case study.',
      },
      meaning: {
        title: 'On the plant floor, logging can be spoken too',
        lead: 'The same design fits where hands are busy and the form usually waits until the end of the shift.',
        items: [
          { title: 'Voice logging', body: 'The operator says “20-minute stop on injection press 3 for a mold change” and the system drafts the entry for them to check.' },
          { title: 'Review before saving', body: 'The person who spoke confirms what the AI understood. The data reaches the system with an owner and a timestamp.' },
          {
            title: 'One lead for the whole product',
            body: 'Interface, data, permissions and AI designed together. It is how Torno works on projects, with a single technical lead from diagnostic to operation.',
          },
        ],
        note: 'Illustrative examples. Torno has not yet deployed voice capture in a plant.',
      },
      sources: [{ label: 'Explore Ascende', href: 'https://ascende.site/' }],
      sourceNote: 'Henrique Pett’s own project. Technical content is based on the project’s repository, documentation and public page.',
      cta: {
        title: 'Does your team log production at the end of the shift, from memory?',
        text: 'In the first call we look at what is logged today, by whom and in which system.',
      },
    },
  },
};

/** Textos do índice /cases/ e rótulos comuns das páginas de case. */
export const casesIndex: Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    lead: string;
    listTitle: string;
    industry: { eyebrow: string; title: string; text: string; secondary: string };
    ogLines: [string, string, string];
  }
> = {
  'pt-BR': {
    title: 'Cases | {brand}',
    description:
      'Experiência de quem conduz a Torno em IA levada à operação: Loopt, Bom.Capital e o projeto próprio Ascende, com o que foi feito, a evidência de cada um e o que isso significa para uma indústria.',
    eyebrow: 'Cases',
    heading: 'IA que saiu do teste e entrou na operação.',
    lead: 'Três trabalhos de Henrique Pett, que lidera a Torno, todos anteriores à empresa. Dois foram feitos em empresas onde ele atuou e um é projeto próprio. Cada case mostra o que foi feito, que evidência existe e o que isso significa para uma indústria.',
    listTitle: 'Os três cases',
    industry: {
      eyebrow: 'Na sua indústria',
      title: 'Os primeiros projetos industriais da Torno começam pelo diagnóstico.',
      text: 'A Torno ainda não tem case publicado dentro de uma fábrica. Por isso começamos com entrevistas por área, inventário de dados e sistemas e um piloto com critério de sucesso combinado antes. O relatório do diagnóstico fica com a sua empresa, contrate ou não o restante.',
      secondary: 'Ver como trabalhamos',
    },
    ogLines: ['{brand} · Cases', 'IA que saiu do teste e entrou na operação', 'Experiência de quem conduz a Torno'],
  },
  en: {
    title: 'Case studies | {brand}',
    description:
      'Experience of the person who leads Torno in taking AI into operations: Loopt, Bom.Capital and the own project Ascende, with what was done, the evidence for each and what it means for a manufacturer.',
    eyebrow: 'Case studies',
    heading: 'AI that left testing and went into operations.',
    lead: 'Three pieces of work by Henrique Pett, who leads Torno, all predating the company. Two were done at companies where he worked and one is his own project. Each case shows what was done, what evidence exists and what it means for a manufacturer.',
    listTitle: 'The three case studies',
    industry: {
      eyebrow: 'In your plant',
      title: 'Torno’s first industrial projects start with a diagnostic.',
      text: 'Torno does not yet have a published case study inside a plant. So we start with interviews by area, an inventory of data and systems, and a pilot with success criteria agreed up front. The diagnostic report stays with your company whether or not you hire the rest.',
      secondary: 'See how we work',
    },
    ogLines: ['{brand} · Case studies', 'AI that left testing and went into operations', 'Experience of the person who leads Torno'],
  },
};

/** Rótulos fixos das páginas de case. */
const caseLabelsPt = {
    back: 'Todos os cases',
    facts: 'Ficha do case',
    role: 'Papel',
    scope: 'Escopo',
    evidence: 'Evidência',
    context: 'Contexto',
    work: 'O que foi feito',
    flow: 'Do dado à decisão',
    results: 'Resultados',
    meaning: 'Para uma indústria',
    sources: 'Fontes',
    sourcesTitle: 'Fontes e contexto',
    reviewed: 'Case revisado em 12 de novembro de 2026.',
    screenshotLabel: 'Site público',
    others: 'Outros cases',
    allCases: 'Ver todos os cases',
    read: 'Ler o case',
    chartLabel: 'Relato de quem conduziu o projeto',
};

export const caseLabels: Record<Locale, typeof caseLabelsPt> = {
  'pt-BR': caseLabelsPt,
  en: {
    back: 'All case studies',
    facts: 'Case facts',
    role: 'Role',
    scope: 'Scope',
    evidence: 'Evidence',
    context: 'Context',
    work: 'What was done',
    flow: 'From data to decision',
    results: 'Results',
    meaning: 'For a manufacturer',
    sources: 'Sources',
    sourcesTitle: 'Sources and context',
    reviewed: 'Case study reviewed November 12, 2026.',
    screenshotLabel: 'Public website',
    others: 'Other case studies',
    allCases: 'See all case studies',
    read: 'Read the case study',
    chartLabel: 'Account of the person who led the work',
  },
};
