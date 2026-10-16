import type { Locale, RouteId } from '../lib/i18n';
export type CaseSlug = 'loopt' | 'bom-capital' | 'ascende';
export interface CaseStudy {
 routeId: RouteId; name: string; category: string; title: string; description: string; intro: string;
 role: string; scope: string; evidence: string; contextTitle: string; context: string[];
 workTitle: string; work: [string,string][]; flowTitle: string; flow: [string,string][]; flowNote: string;
 resultsTitle: string; resultsIntro: string; resultsNote: string; takeawayTitle: string; takeaway: string;
 screenshot: 'loopt' | 'ascende' | null; screenshotAlt: string; screenshotCaption: string;
 sources: [string,string][]; sourceNote: string; ctaTitle: string; ctaBody: string;
}
export const caseStudies: Record<Locale, Record<CaseSlug, CaseStudy>> = {
  "pt-BR": {
    "loopt": {
      "routeId": "caseLoopt",
      "name": "Loopt",
      "category": "IA em operação · Experiência profissional",
      "title": "Loopt: do modelo de IA à operação do pátio",
      "description": "Minha atuação em engenharia de ML e gestão de produto na Loopt, com contexto da solução e resultados publicados pela empresa.",
      "intro": "Na Loopt, trabalhei na construção do core de Machine Learning e depois assumi a gestão do produto de IA. O desafio: levar decisões de alocação de contêineres do planejamento manual para um produto usado na operação.",
      "role": "Engenharia de ML e gestão de produto",
      "scope": "Produto de IA para terminais de contêineres",
      "evidence": "Resultados da empresa com fonte pública",
      "contextTitle": "Uma decisão de posição afeta o trabalho que vem depois",
      "context": [
        "O produto em que trabalhei otimiza a alocação de contêineres no pátio. Escolher uma posição ruim pode exigir novas movimentações quando outra unidade precisa sair. O problema combina decisões frequentes, restrições operacionais e informação dispersa.",
        "Minha atuação reuniu duas perspectivas: construir o modelo e entender como transformar sua saída em uma decisão útil para quem opera. A entrega precisava chegar ao uso cotidiano, além da etapa de modelagem."
      ],
      "workTitle": "Da engenharia de ML à liderança do produto",
      "work": [
        [
          "Construção do core",
          "Como engenheiro de Machine Learning, desenvolvi a solução do core da modelagem à produção, trabalhando com Machine Learning e Deep Learning."
        ],
        [
          "Gestão de produto",
          "Depois, passei a liderar o produto como PM, conectando necessidades da operação, prioridades e desenvolvimento com uma equipe multifuncional."
        ],
        [
          "Continuidade técnica",
          "Mantive uma atuação prática em código de produção. Essa experiência conecta decisões de produto às implicações de implementação e operação."
        ]
      ],
      "flowTitle": "Do dado à decisão operacional",
      "flow": [
        [
          "Dados da operação",
          "Informações dos sistemas já utilizados no terminal."
        ],
        [
          "Otimização",
          "O produto avalia as condições para recomendar decisões de pátio."
        ],
        [
          "Uso na operação",
          "As recomendações apoiam o posicionamento e a execução do trabalho."
        ]
      ],
      "flowNote": "Visão conceitual baseada na apresentação pública da solução; não reproduz a arquitetura interna.",
      "resultsTitle": "Resultados publicados pela Loopt",
      "resultsIntro": "Segundo a Loopt, em matéria da MundoLogística de 13 de janeiro de 2026, a aplicação da tecnologia reduziu movimentos improdutivos em 27% e aumentou a produtividade em 21%.",
      "resultsNote": "Resultados da solução desenvolvida pela equipe, segundo a empresa. Não representam uma medição isolada da minha contribuição individual.",
      "takeawayTitle": "O que levo dessa experiência",
      "takeaway": "Conduzir um produto de IA exige ligar o problema operacional, a modelagem e a execução. Minha experiência na Loopt reúne essas etapas: primeiro construindo a solução de ML e depois liderando sua evolução como produto.",
      "screenshot": "loopt",
      "screenshotAlt": "Captura do site público da Loopt apresentando sequenciamento, posicionamento e execução.",
      "screenshotCaption": "Site público da Loopt, capturado em 14/10/2026. A imagem contextualiza o produto; não é uma tela interna nem uma atribuição da autoria do site a mim.",
      "sources": [
        [
          "Site da Loopt",
          "https://loopt.com.br/"
        ],
        [
          "MundoLogística · 13/01/2026",
          "https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres"
        ]
      ],
      "sourceNote": "Minha participação é descrita a partir do meu histórico profissional. Este case apresenta experiência anterior à criação do studio, não uma contratação da Torno.",
      "ctaTitle": "Seu processo precisa de software que funcione na operação?",
      "ctaBody": "Vamos entender o problema, os dados disponíveis e como verificar uma primeira entrega."
    },
    "bom-capital": {
      "routeId": "caseBomCapital",
      "name": "Bom.Capital",
      "category": "Dados e crédito · Experiência profissional",
      "title": "Bom.Capital: da proposta de crédito à resposta em menos de 2 horas",
      "description": "Como construí software de carteira e uma solução de ML para análise de crédito na Bom.Capital. Resultados apresentados como relato profissional.",
      "intro": "Na Bom.Capital, fintech de microcrédito digital, atuei primeiro no desenvolvimento full stack e depois como cientista de dados. Como primeiro profissional de dados da empresa, construí a solução de ML para análise e aprovação de crédito.",
      "role": "Desenvolvimento full stack e ciência de dados",
      "scope": "Carteira de crédito e análise de propostas",
      "evidence": "Relato meu · sem publicação externa",
      "contextTitle": "O tempo até a resposta fazia parte do problema",
      "context": [
        "Segundo meu relato profissional, o processo entre a proposta e a resposta ao cliente levava, em média, 48 horas. Trabalhei na base de software da operação e, depois, na solução de Machine Learning aplicada à análise de crédito.",
        "São duas frentes que se complementam: um sistema para gerir a carteira e uma camada de dados para apoiar o processo de análise. O ganho relatado se refere ao tempo do processo, não à rentabilidade ou à qualidade de crédito da carteira."
      ],
      "workTitle": "Duas frentes, da aplicação ao modelo",
      "work": [
        [
          "Gestão da carteira",
          "Desenvolvi do zero o gerenciador de carteira de crédito, abrangendo interface, backend, dados e infraestrutura. A stack incluía React, Elixir, Python, PostgreSQL e AWS."
        ],
        [
          "Construção da solução de ML",
          "Como primeiro profissional de dados da empresa, construí a solução para análise e aprovação de crédito, conectando o trabalho de dados ao processo do negócio."
        ],
        [
          "Trabalho com outras equipes",
          "Participei do início do modelo de credit scoring e da comunicação com times e empresas externas, aproximando desenvolvimento e necessidades da operação."
        ]
      ],
      "flowTitle": "O recorte do processo acompanhado",
      "flow": [
        [
          "Proposta recebida",
          "Início do intervalo descrito no relato."
        ],
        [
          "Análise de crédito",
          "Etapa apoiada pela solução de Machine Learning."
        ],
        [
          "Resposta ao cliente",
          "Fim do intervalo usado na comparação."
        ]
      ],
      "flowNote": "Esquema explicativo do processo; não é uma reprodução de telas ou regras de decisão da empresa.",
      "resultsTitle": "De 48 horas, em média, para menos de 2 horas",
      "resultsIntro": "O trabalho conectou software e Machine Learning à análise de crédito. No processo que acompanhei, a resposta ao cliente passou de uma média de 48 horas para menos de 2 horas.",
      "resultsNote": "Fonte: relato de Henrique Pett, sem publicação externa. “Menos de 2 horas” é um limite superior; a barra não representa uma duração exata.",
      "takeawayTitle": "O que levo dessa experiência",
      "takeaway": "Uma solução de dados precisa fazer parte do processo que a equipe realmente executa. Trabalhar tanto no sistema de carteira quanto na análise de crédito me deu experiência em conectar interface, regras, dados e Machine Learning a uma necessidade operacional concreta.",
      "screenshot": null,
      "screenshotAlt": "",
      "screenshotCaption": "",
      "sources": [],
      "sourceNote": "Fonte: meu histórico profissional na Bom.Capital. Gráfico elaborado para este case com os valores do relato; não representa uma auditoria independente. Experiência anterior ao studio.",
      "ctaTitle": "Sua equipe espera demais por uma análise ou aprovação?",
      "ctaBody": "Podemos mapear o fluxo, identificar onde o trabalho acumula e definir uma entrega que dê para verificar."
    },
    "ascende": {
      "routeId": "caseAscende",
      "name": "Ascende",
      "category": "Produto próprio · Construção de ponta a ponta",
      "title": "Ascende: uma frase que vira registros organizados",
      "description": "Um produto próprio de IA construído de ponta a ponta: captura em linguagem natural, dados pessoais organizados e um conselheiro com contexto.",
      "intro": "Construí o Ascende para reunir finanças, corpo e mente em um só produto. A ideia central é simples: a pessoa descreve o dia em linguagem natural, e o app ajuda a transformar a conversa em registros que podem ser revisados.",
      "role": "Concepção, desenvolvimento e publicação",
      "scope": "Aplicação web com IA e dados pessoais",
      "evidence": "Produto próprio disponível online",
      "contextTitle": "O desafio era reduzir o trabalho de registrar",
      "context": [
        "Quando cada área da vida fica em um aplicativo, registrar o dia exige repetir tarefas e alternar entre telas. O Ascende parte de outra interação: uma frase pode conter um gasto, um treino e uma informação sobre o sono.",
        "O desafio de produto é organizar essas informações sem obrigar a pessoa a começar pelo formulário. O desafio técnico é conectar captura, revisão, persistência e contexto para o Conselheiro de IA."
      ],
      "workTitle": "Um produto completo, além da conversa com a IA",
      "work": [
        [
          "Experiência de registro",
          "Construí a aplicação e os fluxos de captura que transformam linguagem natural em registros por área. A pessoa pode revisar a informação antes de confirmá-la."
        ],
        [
          "Dados, conta e contexto",
          "O produto reúne autenticação, dados persistentes e um Conselheiro que trabalha com o contexto da conta. React e TypeScript compõem a aplicação; Supabase reúne banco, autenticação e funções de servidor."
        ],
        [
          "Integrações e publicação",
          "A documentação do projeto contempla Claude API, publicação na Netlify e importação de arquivos do App Saúde e CSVs. O site também apresenta o canal de WhatsApp para registro e conversa."
        ]
      ],
      "flowTitle": "Uma entrada, três registros para revisar",
      "flow": [
        [
          "Dinheiro",
          "R$ 47 no mercado"
        ],
        [
          "Treino",
          "Treino de pernas"
        ],
        [
          "Sono",
          "6 horas de sono"
        ]
      ],
      "flowNote": "Exemplo ilustrativo, com dados fictícios. Os cartões explicam o fluxo; não são uma captura de uma conta real.",
      "resultsTitle": "O resultado aqui é um produto publicado",
      "resultsIntro": "O Ascende está disponível online, com apresentação pública, acesso à conta e proposta de uso definida. É uma demonstração da minha capacidade de conectar experiência, software e IA em uma entrega própria.",
      "resultsNote": "A evidência deste case é o produto publicado. Os recursos foram conferidos na página pública e na documentação do projeto; os fluxos autenticados não foram auditados nesta apresentação.",
      "takeawayTitle": "O que esse projeto demonstra",
      "takeaway": "Consigo partir de uma ideia de interação e construir as partes necessárias para sustentá-la: interface, dados, autenticação, funções de IA e publicação. O foco não está apenas em gerar uma resposta, mas em fazer a informação entrar em um produto que a pessoa pode usar novamente.",
      "screenshot": "ascende",
      "screenshotAlt": "Captura da página pública do Ascende, com a proposta de reunir corpo, dinheiro e mente.",
      "screenshotCaption": "Página pública do Ascende, capturada em 14/10/2026. A demonstração exibida no site é ilustrativa, sem dados de uma conta pessoal.",
      "sources": [
        [
          "Conhecer o Ascende",
          "https://ascende.site/"
        ]
      ],
      "sourceNote": "Projeto próprio de Henrique Pett, não um cliente do studio. Conteúdo técnico baseado no repositório e na documentação do projeto, além da página pública.",
      "ctaTitle": "Você tem uma ideia de produto que precisa sair do papel?",
      "ctaBody": "Vamos delimitar a primeira jornada, o papel da IA e os critérios para colocar a solução nas mãos de usuários."
    }
  },
  "en": {
    "loopt": {
      "routeId": "caseLoopt",
      "name": "Loopt",
      "category": "Operational AI · Professional experience",
      "title": "Loopt: from an ML model to yard operations",
      "description": "My work in ML engineering and product management at Loopt, with product context and results publicly reported by the company.",
      "intro": "At Loopt, I worked on the core Machine Learning solution and later took on product management for the AI product. The challenge was to turn manual container allocation into a product used in daily operations.",
      "role": "ML engineering and product management",
      "scope": "AI product for container terminals",
      "evidence": "Company results with a public source",
      "contextTitle": "A positioning decision shapes the work that follows",
      "context": [
        "The product I worked on optimizes container allocation in the yard. A poor position can require extra moves when another unit needs to leave. The problem combines frequent decisions, operational constraints and scattered information.",
        "My role brought together model development and the work of turning its output into a useful operational decision. Delivery needed to extend beyond modeling into everyday use."
      ],
      "workTitle": "From ML engineering to product leadership",
      "work": [
        [
          "Building the core",
          "As a Machine Learning engineer, I developed the core solution from modeling to production using Machine Learning and Deep Learning."
        ],
        [
          "Product management",
          "I then took on the PM role, connecting operational needs, priorities and development with a cross-functional team."
        ],
        [
          "Staying hands-on",
          "I continued writing production code. This experience connects product decisions with their implementation and operational consequences."
        ]
      ],
      "flowTitle": "From data to an operational decision",
      "flow": [
        [
          "Operational data",
          "Information from systems already used at the terminal."
        ],
        [
          "Optimization",
          "The product evaluates conditions to recommend yard decisions."
        ],
        [
          "Operational use",
          "Recommendations support positioning and execution."
        ]
      ],
      "flowNote": "A conceptual view based on the public product description, not a reproduction of internal architecture.",
      "resultsTitle": "Results reported by Loopt",
      "resultsIntro": "According to Loopt in MundoLogística on January 13, 2026, the technology reduced unproductive moves by 27% and increased productivity by 21%.",
      "resultsNote": "Results of the solution developed by the team, according to the company. They do not measure my individual contribution in isolation.",
      "takeawayTitle": "What I bring from this experience",
      "takeaway": "An AI product needs to connect an operational problem, modeling and execution. My experience at Loopt covers those stages: first building the ML solution, then leading its evolution as a product.",
      "screenshot": "loopt",
      "screenshotAlt": "Screenshot of the public Loopt website describing sequencing, positioning and execution.",
      "screenshotCaption": "Loopt’s public website, captured October 14, 2026. This provides product context; it is not an internal screen or a claim that I built the website.",
      "sources": [
        [
          "Loopt website",
          "https://loopt.com.br/"
        ],
        [
          "MundoLogística · January 13, 2026",
          "https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres"
        ]
      ],
      "sourceNote": "My role is described from my professional history. This is experience predating the studio, not a Torno client engagement.",
      "ctaTitle": "Does your process need software that works in daily operations?",
      "ctaBody": "Let’s understand the problem, the available data and how to verify a first delivery."
    },
    "bom-capital": {
      "routeId": "caseBomCapital",
      "name": "Bom.Capital",
      "category": "Data and credit · Professional experience",
      "title": "Bom.Capital: from a credit application to a response in under 2 hours",
      "description": "How I built portfolio software and an ML credit analysis solution at Bom.Capital. Results are presented as my professional account.",
      "intro": "At Bom.Capital, a digital microcredit fintech, I first worked in full-stack development and later as a data scientist. As the company’s first data professional, I built the ML solution for credit analysis and approval.",
      "role": "Full-stack development and data science",
      "scope": "Credit portfolio and application analysis",
      "evidence": "Self-reported · no external publication",
      "contextTitle": "Time to a response was part of the problem",
      "context": [
        "In my professional account, the process from application to customer response took an average of 48 hours. I worked on the operational software and later on the Machine Learning solution supporting credit analysis.",
        "These are complementary efforts: a portfolio management system and a data layer supporting analysis. The reported improvement concerns process time, not portfolio profitability or credit quality."
      ],
      "workTitle": "Two connected efforts, from application to model",
      "work": [
        [
          "Portfolio management",
          "I built the credit portfolio manager from scratch, covering the interface, backend, data and infrastructure. The stack included React, Elixir, Python, PostgreSQL and AWS."
        ],
        [
          "The ML solution",
          "As the first data professional at the company, I built the solution for credit analysis and approval, connecting data work to the business process."
        ],
        [
          "Working across teams",
          "I contributed to the early credit scoring model and communication with external teams and companies, connecting development with operational needs."
        ]
      ],
      "flowTitle": "The process covered by the comparison",
      "flow": [
        [
          "Application received",
          "The starting point of the interval in my account."
        ],
        [
          "Credit analysis",
          "The stage supported by the Machine Learning solution."
        ],
        [
          "Customer response",
          "The end of the interval used for comparison."
        ]
      ],
      "flowNote": "An explanatory process diagram, not a reproduction of company screens or decision rules.",
      "resultsTitle": "From an average of 48 hours to under 2 hours",
      "resultsIntro": "The work connected software and Machine Learning with credit analysis. In the process I worked on, customer response time fell from an average of 48 hours to under 2 hours.",
      "resultsNote": "Source: Henrique Pett’s account, with no external publication. “Under 2 hours” is an upper bound; the bar does not represent an exact duration.",
      "takeawayTitle": "What I bring from this experience",
      "takeaway": "A data solution must become part of the workflow people actually use. Working on both the portfolio system and credit analysis gave me experience connecting interfaces, rules, data and Machine Learning to a specific operational need.",
      "screenshot": null,
      "screenshotAlt": "",
      "screenshotCaption": "",
      "sources": [],
      "sourceNote": "Source: my professional history at Bom.Capital. Chart created from the reported values, not an independent audit. Experience predating the studio.",
      "ctaTitle": "Does your team wait too long for an analysis or approval?",
      "ctaBody": "We can map the workflow, find where work accumulates and define a delivery we can verify."
    },
    "ascende": {
      "routeId": "caseAscende",
      "name": "Ascende",
      "category": "Personal product · Built end to end",
      "title": "Ascende: one sentence becomes organized records",
      "description": "A personal AI product built end to end: natural-language capture, organized personal data and an advisor with account context.",
      "intro": "I built Ascende to bring finances, body and mind into one product. The central idea is simple: describe your day in natural language, then review the records the app helps create from that conversation.",
      "role": "Product concept, development and launch",
      "scope": "Web application with AI and personal data",
      "evidence": "Personal product available online",
      "contextTitle": "The challenge was making tracking less work",
      "context": [
        "When each part of life lives in a different app, recording a day means repeating tasks and switching screens. Ascende starts from a different interaction: a sentence can contain an expense, a workout and sleep information.",
        "The product challenge is organizing that information without forcing the user to start with a form. The technical challenge is connecting capture, review, persistence and context for the AI advisor."
      ],
      "workTitle": "A complete product beyond the AI conversation",
      "work": [
        [
          "The capture experience",
          "I built the application and capture workflows that turn natural language into records by area. Users can review the information before confirming it."
        ],
        [
          "Accounts, data and context",
          "The product brings together authentication, persistent data and an advisor working with account context. React and TypeScript power the app; Supabase provides the database, authentication and server functions."
        ],
        [
          "Integrations and launch",
          "Project documentation covers the Claude API, Netlify deployment and imports from Apple Health exports and CSV files. The public website also describes WhatsApp capture and conversation."
        ]
      ],
      "flowTitle": "One input, three records to review",
      "flow": [
        [
          "Money",
          "R$47 at the grocery store"
        ],
        [
          "Workout",
          "Leg workout"
        ],
        [
          "Sleep",
          "6 hours of sleep"
        ]
      ],
      "flowNote": "Illustrative example with fictional data. These cards explain the workflow; they are not a screenshot of a real account.",
      "resultsTitle": "The outcome is a published product",
      "resultsIntro": "Ascende is available online with a public product presentation, account access and a defined use case. It demonstrates my ability to connect user experience, software and AI in a product of my own.",
      "resultsNote": "The evidence in this case study is the published product. Features were checked against the public page and project documentation; authenticated workflows were not audited for this presentation.",
      "takeawayTitle": "What this project demonstrates",
      "takeaway": "I can start with an interaction idea and build the parts that support it: interface, data, authentication, AI functions and deployment. The goal goes beyond generating an answer to bringing information into a product someone can return to.",
      "screenshot": "ascende",
      "screenshotAlt": "Screenshot of Ascende’s public website presenting body, money and mind in a single app.",
      "screenshotCaption": "Ascende’s public page, captured October 14, 2026. The site’s demo is illustrative and contains no personal account data.",
      "sources": [
        [
          "Explore Ascende",
          "https://ascende.site/"
        ]
      ],
      "sourceNote": "Henrique Pett’s personal project, not a studio client. Technical content is based on the project repository and documentation, alongside its public page.",
      "ctaTitle": "Have a product idea you want to bring to life?",
      "ctaBody": "Let’s define the first user journey, the role of AI and the criteria for putting it in users’ hands."
    }
  }
};
