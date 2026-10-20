/**
 * Copy PT-BR. Fonte: docs/copy/pt-BR.md (aprovado pela Batuta).
 * Público: dono, diretor de operações ou CFO de empresa tradicional média; secundário: quem tem protótipo.
 * Regras: BRIEFING §3 e checklist PLANO-DEV §2.3. Convenções e limites: src/content/types.ts.
 */

import type { SiteCopy } from './types';

/** Placeholder do Mote (/diagnostico/): visível em dev/preview; o build de produção falha se sobrar. */

/** Placeholder até o Verso preencher o consentimento (SPEC §4/§6). */

const MUNDOLOGISTICA_URL = 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres';
const MVP_PAYMENT = '40% na assinatura, 30% no beta em homologação, 30% no go-live.';

export const ptBR: SiteCopy = {
  locale: 'pt-BR',

  meta: {
    home: {
      title: '{organization} | Software sob medida, integrações e IA',
      description:
        'Automatize processos ou retome um software travado. Desenvolvimento com Henrique Pett, escopo fechado, preços publicados e código na sua conta.',
    },
    privacy: {
      title: 'Privacidade | {brand}',
      description:
        'Como este site trata dados pessoais: cookies só com o seu consentimento, sem formulário e com seus direitos pela LGPD.',
    },
    notFound: {
      title: 'Página não encontrada | {brand}',
      description: 'O endereço pode ter mudado ou estar digitado errado.',
    },
  },

  og: {
    title: 'Software e IA para tirar sua operação do trabalho manual.',
    description: 'Diagnóstico de 45 minutos, grátis. Preços publicados, escopo fechado, garantia de 60 dias no MVP.',
    imageAlt: 'Software e IA para tirar sua operação do trabalho manual.',
    imageLines: [
      '{brand} · Founding Engineer sob demanda',
      'Software e IA para sua operação.',
      'Um único responsável sênior, do diagnóstico à produção.',
    ],
  },

  common: {
    skipToContent: 'Pular para o conteúdo',
    languageSwitchShort: 'EN',
    languageSwitchLabel: 'Mudar idioma para inglês',
    themeToggleLabel: 'Alternar tema claro/escuro',
    // Sem menu mobile no design (Timbre); mantidos porque o contrato exige.
    bookingCtaHeader: 'Agendar diagnóstico',
    bookingCtaHeaderMobile: 'Agendar',
  },

  header: {
    navLabel: 'Navegação principal',
    nav: { precos: 'Preços', garantias: 'Garantias', quem: 'Quem sou', faq: 'FAQ' },
  },

  hero: {
    eyebrow: 'Henrique Pett · Desenvolvimento sob demanda',
    headline: 'Software e IA para tirar sua operação do trabalho manual.',
    subheadline:
      'Automatizo processos, conecto sistemas e retomo produtos travados. Você fala direto comigo, do primeiro escopo ao software funcionando.',
    primaryCta: 'Agendar diagnóstico (45 min, grátis)',
    secondaryCta: 'Ver preços',
    emailLead: "Prefere começar por mensagem?",
    emailCta: "Conte seu problema por e-mail",
    proofLine: ['Preços publicados', 'Código na sua conta desde o dia 1', 'Garantia de 60 dias no MVP'],
  },

  problem: {
    "title": "O que você precisa resolver agora?",
    "intro": "Podemos começar por um processo específico ou pelo produto que você já tem. Primeiro, entendo o problema e defino com você o que precisa funcionar.",
    "items": [
        {
            "title": "Parar de copiar dados entre sistemas",
            "body": "E-mails, documentos e planilhas viram um fluxo com conferência, histórico e revisão da equipe quando houver dúvida.",
            "example": "Exemplo de escopo: receber um documento, extrair os dados e conferir o lançamento.",
            "href": "#precos",
            "link": "Ver como começar"
        },
        {
            "title": "Retomar um projeto que travou",
            "body": "Você já investiu com uma agência ou tentou construir sozinho. Avalio o que dá para aproveitar e quais correções vêm primeiro.",
            "example": "Ponto de partida: acesso ao código, ao ambiente e ao fluxo que está falhando.",
            "href": "/recuperacao-de-projeto/",
            "link": "Entender a recuperação"
        },
        {
            "title": "Levar um app Lovable à produção",
            "body": "O protótipo existe. Falta conferir acessos, integrações e o caminho do usuário antes de colocar clientes reais dentro dele.",
            "example": "Com base aproveitável e escopo compatível, o caminho pode ser o Production-Ready.",
            "href": "/lovable-em-producao/",
            "link": "Ver o que entra na entrega"
        },
        {
            "title": "Construir um produto para seus clientes",
            "body": "Um portal, SaaS ou ferramenta interna para uma necessidade concreta. Defino a primeira versão com critérios para aceitar a entrega.",
            "example": "O Sprint entrega escopo e protótipo navegável. A construção é uma etapa separada.",
            "href": "#precos",
            "link": "Comparar etapas e preços"
        }
    ]
},

  ladder: {
    title: 'Preço publicado, escopo fechado, um degrau de cada vez.',
    intro:
      'Você sabe quanto custa antes de assinar. Cada etapa termina com algo que é seu, e você decide se sobe para a próxima. O diagnóstico é grátis e pode terminar em "não construa software agora".',
    priceLabels: { free: 'Grátis', from: 'a partir de {price}', custom: 'Sob consulta' },
    labels: { timeline: 'Prazo', included: 'O que inclui', payment: 'Pagamento', altStep: 'ou' },
    units: { perMonth: '/mês', perHour: '/h', hoursPerMonth: '~{n} h' },
    steps: {
      diagnostic: {
        name: 'Diagnóstico',
        timeline: '45 minutos',
        summary: 'Uma conversa para entender o problema e ver se vale construir algo.',
        included: [
          'Entender o processo, a dor e quem decide',
          'Estimar quanto o problema custa hoje',
          'Indicar o degrau certo, com faixa de preço',
          'Dizer quando não vale construir agora',
        ],
        payment: 'Sem custo e sem compromisso.',
      },
      sprint: {
        name: 'Product Sprint',
        timeline: '2 semanas',
        summary: 'O projeto do seu produto, pronto para construir e com preço fechado.',
        included: [
          'Problema e métrica de sucesso definidos',
          'Escopo com critérios de aceite e o que fica fora',
          'Arquitetura técnica',
          'Protótipo navegável do fluxo principal',
          'Plano de marcos com preço fechado do MVP',
        ],
        payment: '100% antecipado.',
        badge: '100% abatido do MVP',
        note: {
          text: '100% abatido do MVP se você assinar em até 30 dias. Os entregáveis são seus, mesmo se não seguir comigo.',
          highlight: true,
        },
      },
      productionReady: {
        name: 'Production-Ready',
        timeline: '2–3 semanas',
        summary: 'Para quem já tem um protótipo e precisa colocá-lo em produção.',
        included: [
          'Auditoria de segurança, login, segredos e LGPD básica',
          'Correção dos problemas críticos e testes do fluxo',
          'Deploy automatizado, homologação e produção',
          'Monitoramento, alertas e backup na sua conta',
          'Documentação de passagem',
        ],
        payment: '50% no início, 50% na entrega.',
        note: {
          text: 'Não inclui reescrever o produto nem criar funcionalidades novas; isso vai para um MVP ou para o Evolution.',
        },
      },
      mvpCore: {
        name: 'MVP Core',
        timeline: '6–7 semanas',
        summary: 'Seu produto em produção, com o escopo definido no Sprint.',
        included: [
          '1 jornada principal, de ponta a ponta',
          'Até 2 perfis de usuário e até 2 integrações',
          'Web responsivo, login e painel administrativo',
          'Deploy, monitoramento e alertas',
          'Garantia de 60 dias para bugs',
        ],
        payment: MVP_PAYMENT,
      },
      mvpPlus: {
        name: 'MVP Plus',
        timeline: '8–10 semanas',
        summary: 'O Core com mais perfis, mais integrações e uma camada a mais.',
        included: [
          'Tudo do MVP Core',
          'Até 3 perfis de usuário e até 4 integrações',
          'Mais 1: IA (LLM, RAG ou agente), pagamentos ou BI',
          'Garantia de 60 dias para bugs',
        ],
        payment: MVP_PAYMENT,
      },
      evolution: {
        name: 'Product Evolution',
        timeline: 'mensal',
        summary: 'Depois do go-live, o mesmo responsável segue cuidando do produto.',
        included: [
          'Monitoramento, correções e segurança',
          'Funcionalidades novas de um backlog priorizado',
          'Horas-teto por mês, sem surpresa na conta',
        ],
        payment: 'Mensal, 100% antecipado.',
      },
    },
    diagnosticCta: 'Agendar diagnóstico',
    evolution: {
      table: {
        caption: 'Planos do Product Evolution',
        headers: { plan: 'Plano', hours: 'Horas/mês', price: 'Preço/mês' },
      },
      plans: {
        essential: {
          name: 'Essencial',
          description: 'Monitoramento, correções, segurança e 1 reunião por mês.',
        },
        evolution: {
          name: 'Evolução',
          description: 'Essencial + 1 entrega de funcionalidade a cada 2 semanas.',
        },
        partner: {
          name: 'Parceiro técnico',
          description: 'Evolução + roadmap, apoio em captação e 1º dev contratado.',
        },
      },
      rulesNote: 'Mensal antecipado, mínimo de 3 meses. Horas não usadas não acumulam. Hora excedente: {overage}.',
    },
    cta: 'Agendar diagnóstico (45 min, grátis)',
    workingTogether: {
      title: "Você provavelmente vai gostar de trabalhar comigo se…",
      items: [
        "Quer resolver um problema de negócio com um MVP, uma integração ou uma ferramenta interna de escopo fechado.",
        "Quer participar das decisões e está aberto a questionar comigo prioridades, premissas e riscos.",
        "Prefere combinar uma entrega viável, com escopo e critérios de aceite claros.",
      ],
    },
    ctaNote: 'Não sabe qual degrau é o seu? É para isso que serve o diagnóstico.',
  },

  guarantees: {
    title: 'Regras claras, escritas no contrato.',
    intro:
      'Projeto de software dá errado por escopo que cresce sem preço, por dependência de quem construiu e por pagamento desalinhado com entrega. Estas regras existem para isso.',
    items: [
      {
        title: 'Garantia de 60 dias para bugs.',
        body: 'Depois do go-live, corrijo sem custo tudo o que não cumprir os critérios de aceite. Funcionalidade nova não é bug: vai para o Evolution ou para um aditivo.',
      },
      {
        title: 'Escopo fechado, com o que fica fora.',
        body: 'O Sprint define o que entra e o que não entra. Mudança no meio do caminho vira aditivo com preço, ou troca de um item por outro sem custo.',
      },
      {
        title: 'Código e nuvem na sua conta desde o dia 1.',
        body: 'O repositório, o banco e a infraestrutura ficam no seu nome desde o começo. A propriedade intelectual é transferida a você no pagamento final.',
      },
      {
        title: 'Pagamento por marco.',
        body: 'Você paga por etapa entregue. A etapa seguinte começa depois do pagamento da anterior, sem surpresa para nenhum dos lados.',
      },
      {
        title: 'Um MVP por vez.',
        body: 'Não pego dois MVPs ao mesmo tempo. Quando eu pego o seu projeto, ele tem a minha atenção.',
      },
      {
        title: 'Demonstração toda semana.',
        body: 'Uma vez por semana você vê software funcionando, não slide. Ajustes de rota acontecem cedo.',
      },
    ],
    exclusionsTitle: 'O que fica fora de todo projeto, salvo combinado à parte',
    exclusions: [
      'Apps nativos iOS/Android (entrego web ou PWA; nativo é à parte)',
      'Compliance regulado (Bacen, ANS, PCI) e auditoria de segurança',
      'Migração de mais de uma fonte de dados legada',
      'Conteúdo, marketing e SEO',
      'Suporte 24/7',
      'Custos de nuvem, APIs e licenças (pagos direto por você, na sua conta)',
      'Treinar modelo de ML próprio (o MVP Plus usa APIs e RAG)',
    ],
  },

  about: {
    title: 'Quem constrói: Henrique Pett',
    photoAlt: 'Henrique Pett',
    bio: [
      'Desde 2021 passei por quase todas as funções de um produto de dados e IA: pesquisa de ML, full stack, ciência de dados, engenharia de ML e gestão de produto. Num produto de IA para terminais de contêiner, construí o modelo como engenheiro de ML e passei a liderar o produto como PM, escrevendo código de produção.',
      'Não sou especialista profundo em uma camada só, e sei quando um problema precisa de um. O que eu faço bem é pegar um problema de negócio e levá-lo até software em produção, respondendo por cada parte. Também trabalhei remotamente, em inglês, numa consultoria que atendia empresas europeias.',
    ],
    casesTitle: 'Experiência que levo para o seu projeto',
    cases: [
      {
        title: 'IA na operação de terminais de contêiner',
        body: 'Produto de IA que substitui o planejamento manual do pátio. Segundo a empresa: −27% de movimentos improdutivos e +21% de produtividade.',
        source: { label: 'Dado público · MundoLogística, jan/2026', url: MUNDOLOGISTICA_URL },
        kind: 'published',
        detail: { href: '/cases/loopt/', label: 'Ler case completo' },
        whenAuthorized: {
          requires: 'loopt',
          title: 'Loopt: IA na operação de terminais de contêiner',
          body: 'Produto de IA da Loopt que substitui o planejamento manual do pátio. Segundo a Loopt, o resultado foi −27% de movimentos improdutivos e +21% de produtividade.',
        },
      },
      {
        title: 'Crédito na Bom.Capital',
        body: 'Relato meu: como primeiro profissional de dados da fintech, construí o modelo da análise de crédito, que levava em média 48 horas e passou a menos de 2 horas.',
        source: { label: 'Relato meu' },
        kind: 'self-reported',
        detail: { href: '/cases/bom-capital/', label: 'Ler case completo' },
      },
      {
        title: 'Projeto próprio: Ascende',
        body: 'App com conselheiro de IA que registra finanças, treino e sono a partir de uma frase. Feito por mim, de ponta a ponta.',
        source: { label: 'ascende.site', url: 'https://ascende.site' },
        kind: 'own-project',
        detail: { href: '/cases/ascende/', label: 'Ler case completo' },
      },
    ],
    casesFootnote: 'Experiência anterior ao studio e projeto próprio; não são cases de clientes do studio. "Relato meu" não tem publicação externa.',
    article: 'Escrevi para o blog da neptune.ai o artigo técnico "How to Build ML Model Training Pipeline" (2023).',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
  },

  method: {
    title: 'Como uma pessoa só dá conta do produto inteiro',
    intro:
      'Trabalho de forma AI-native: agentes de código escrevem e revisam comigo, e testes e infraestrutura são automatizados desde a primeira semana. Isso libera tempo para o que exige julgamento.',
    items: [
      {
        title: 'Agentes de código, com revisão humana.',
        body: 'Uso agentes de IA para escrever, testar e refatorar. Cada linha que vai para produção passa pela minha revisão e pelos testes.',
      },
      {
        title: 'Testes e deploy automatizados.',
        body: 'Desde o início, o projeto tem testes do fluxo principal, deploy automático, homologação separada da produção e monitoramento com alertas.',
      },
      {
        title: 'Decisões por escrito.',
        body: 'Decisões de arquitetura, runbooks e documentação de passagem ficam no repositório. Qualquer engenheiro consegue continuar o trabalho.',
      },
      {
        title: 'Especialistas quando o projeto pede.',
        body: 'Pentest, design de marca, app nativo ou jurídico: trago um especialista, orçado à parte e combinado com você antes.',
      },
    ],
    closing: 'Você sempre fala comigo. Não há gerente de conta, repasse ou telefone sem fim.',
  },

  notFor: {
    title: 'Para quem eu não sou a escolha certa',
    intro: 'Prefiro dizer agora do que descobrir no meio do projeto.',
    items: [
      'Quem precisa de app nativo para iOS e Android como produto principal.',
      'Projetos de compliance regulado (PCI, HIPAA, Bacen, ANS) sem um especialista da área envolvido.',
      'Quem procura desenvolvedores alocados ou cobrança por hora.',
      'Quem decide só pelo menor preço: há opções que custam menos, e eu não compito nisso.',
      'Quem espera qualquer produto pronto em 2 semanas. Sistema confiável leva o tempo do escopo.',
    ],
  },

  faq: {
    title: 'Perguntas frequentes',
    items: [
      {"question": "Dá para começar com um único processo?", "answer": "Sim. No diagnóstico, avaliamos um fluxo, o trabalho que ele gera e como verificar uma melhoria. Se ainda for preciso definir a solução, o Sprint entrega escopo e protótipo navegável, não uma automação em produção. A implementação recebe proposta própria."},
      {"question": "Já tentei com uma agência ou com Lovable. Você pode continuar?", "answer": "Posso avaliar o que existe com acesso autorizado ao código e ao ambiente. Se a base for aproveitável e as correções couberem no escopo, o Production-Ready pode servir. Se houver necessidade de reconstrução ou novas funções, defino outra proposta antes de começar."},

      {
        question: 'Quanto tempo leva?',
        answer:
          'O Sprint leva 2 semanas. Um Production-Ready, 2 a 3. Um MVP Core fica em produção em 6 a 7 semanas, e um MVP Plus em 8 a 10. O cronograma de marcos sai do Sprint, junto com o preço fechado.',
      },
      {
        question: 'De quem é o código?',
        answer:
          'Seu. O repositório, o banco e a nuvem ficam na sua conta desde o primeiro dia. A propriedade intelectual é transferida a você no pagamento final. Os entregáveis do Sprint são seus mesmo se você não seguir para o MVP.',
      },
      {
        question: 'Você é uma pessoa só. E se ficar indisponível?',
        answer:
          'O código, o repositório e a nuvem ficam na sua conta desde o primeiro dia, e a documentação é escrita durante o projeto, não no fim: qualquer desenvolvedor sênior consegue assumir. O cronograma tem folga de 15 a 20% para imprevistos. E, se o projeto não puder seguir, você recebe de volta, proporcionalmente, o que pagou e não foi entregue.',
      },
      {
        question: 'Por que não contratar uma software house?',
        answer:
          'Pode fazer sentido se você precisa de muita gente alocada por muito tempo. A diferença aqui é que você fala com quem constrói, sem intermediário, e o preço é fechado depois do Sprint, não estimado por hora.',
      },
      {
        question: 'Ferramentas de IA para protótipo (Lovable, Bolt e similares) já não fazem isso?',
        answer:
          'Fazem o protótipo, e muitas vezes ele é um ótimo ponto de partida. O que eu entrego é produção: dados protegidos, login, integrações, deploy, monitoramento e alguém responsável quando algo quebra. Para quem já tem o protótipo, existe o Production-Ready.',
      },
      {
        question: 'Você assina NDA e emite nota fiscal?',
        answer: 'Sim para os dois. Se preferir, assino o NDA antes do diagnóstico. Emito nota fiscal de serviço.',
      },
      {
        question: 'E a LGPD?',
        answer:
          'Nos projetos, você é o controlador dos dados do seu produto e indica o seu encarregado; eu atuo como operador, seguindo as suas instruções, com as responsabilidades em contrato (acordo de tratamento de dados). Os dados ficam na infraestrutura da sua conta. Compliance regulado (Bacen, ANS e afins) exige especialista da área, orçado à parte.',
      },
      {
        question: 'O que acontece depois do go-live?',
        answer:
          'Durante 60 dias, corrijo bugs sem custo. Depois, você pode seguir sozinho com a documentação que fica no repositório, ou contratar o Product Evolution, com horas-teto por mês.',
      },
    ],
  },

  finalCta: {
    title: 'Comece por uma conversa de 45 minutos.',
    body: 'Traga um processo que consome tempo ou um produto que travou. Vamos avaliar o que vale resolver primeiro, qual etapa faz sentido e a faixa de investimento.',
    cta: 'Agendar diagnóstico (45 min, grátis)',
    emailLead: 'Prefere e-mail? Escreva para',
    linkedin: { lead: 'Ou me chame no', label: 'LinkedIn' },
  },

  testimonials: { title: 'Depoimentos' },

  footer: {
    tagline: 'Founding Engineer sob demanda · Produtos de software do diagnóstico à produção.',
    privacyLink: 'Privacidade',
    otherLanguageLink: 'English',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
    copyright: '© {year} {brand}',
  },

  consent: {
    regionLabel: "Aviso de cookies",
    text: "Uso cookies de medição e publicidade só se você aceitar.",
    policyLink: "Política de privacidade",
    accept: "Aceitar",
    reject: "Recusar",
    customize: "Personalizar",
    dialog: {
      title: "Preferências de cookies",
      intro:
        "Escolha o que pode carregar neste site. Medição e Publicidade ficam desligadas até você ligar, e recusar não muda nada no site. Você pode mudar de ideia a qualquer momento pelo rodapé.",
      alwaysOn: "Sempre ativo",
      categories: {
        necessary: {
          name: "Necessários",
          description:
            "Guardam a sua escolha sobre cookies e, se você trocar, a preferência de tema. Ficam só no seu navegador, não saem do seu dispositivo e não podem ser desligados.",
          vendors: [],
        },
        measurement: {
          name: "Medição",
          description:
            "Abre a agenda num quadro do Calendly e repassa a origem da visita. Valem os cookies e a política do Calendly. Ao abrir, antes da sua escolha no aviso dele, ferramentas de terceiros do Calendly, inclusive de publicidade (Google Analytics, Facebook, Segment, Braze, Stripe, reCAPTCHA), podem receber seu IP e a página.",
          vendors: [{ label: "Privacidade do Calendly", url: "https://calendly.com/legal/privacy-notice" }],
        },
        advertising: {
          name: "Publicidade",
          description:
            "Carrega a tag do Google Ads, que grava cookies para medir o resultado dos meus anúncios e avisa quando um diagnóstico é agendado. Nome, e-mail e dados do agendamento não são enviados ao Google.",
          vendors: [{ label: "Cookies do Google Ads", url: "https://policies.google.com/technologies/ads?hl=pt-BR" }],
        },
      },
      save: "Salvar escolhas",
      acceptAll: "Aceitar tudo",
      rejectAll: "Recusar tudo",
      close: "Fechar",
    },
    footerLink: "Preferências de cookies",
    saved: "Preferências de cookies salvas",
  },

  privacy: {
    title: 'Privacidade',
    updatedLabel: 'Atualizado em',
    updated: '2026-10-09',
    sections: [
      {
        title: "Resumo",
        body: "Este site apresenta o meu trabalho. Não tem cadastro nem formulário. Uso cookies de medição e de publicidade só se você aceitar no aviso de cookies; recusar não muda nada no site. Esta política segue a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).",
      },
      {
        title: "Quem trata os dados",
        body: "O controlador é a empresa identificada no fim desta página, pela qual presto os serviços apresentados aqui. Como agente de tratamento de pequeno porte, ela não indicou encarregado (Resolução CD/ANPD nº 2/2022, art. 11). O canal para pedidos e reclamações sobre seus dados é o e-mail de contato abaixo, que chega direto a mim.",
      },
      {
        title: "Que dados são tratados",
        body: "Registros técnicos: a Netlify, que hospeda o site e atua como operadora em meu nome, registra dados de cada acesso, como endereço IP, data e hora, página pedida, página de origem, navegador e país aproximado. Eu não mantenho cópia própria desses registros. Conto as visitas à página de diagnóstico de forma agregada (um número por dia), sem cookies e sem guardar IP ou navegador (legítimo interesse, art. 7º, IX). Agendamento e e-mail: só o que você mesmo informa, como nome, e-mail, o assunto da conversa e a resposta à pergunta \"Como chegou até aqui?\" do formulário do Calendly. Com o seu consentimento de Medição: o agendamento do Calendly abre dentro do site, e a origem da visita é repassada a ele, ou seja, os 5 parâmetros UTM da campanha que trouxe você (fonte, meio, campanha, conteúdo e termo); nunca repasso identificadores individuais, como o identificador de clique do anúncio. Com o seu consentimento de Publicidade: o Google Ads grava cookies e identificadores no seu navegador para medir o resultado dos meus anúncios. Se você aceitou as duas categorias e agenda um diagnóstico dentro do site, o Google Ads recebe um aviso de conversão, sem nome, e-mail ou dados do agendamento.",
      },
      {
        title: "Para que e com qual base legal",
        body: "Registros técnicos servem para manter o site no ar e seguro: legítimo interesse (art. 7º, IX, da LGPD). Agendamento, e-mail e a resposta à pergunta do Calendly servem para marcar e fazer a conversa e preparar uma proposta, a seu pedido: procedimentos preliminares a um contrato (art. 7º, V). O agendamento do Calendly dentro do site, o repasse da origem da visita, os cookies de publicidade e o aviso de conversão ao Google Ads dependem do seu consentimento (art. 7º, I), que você pode revogar a qualquer momento. Quando a lei exige guardar algo, a base é o cumprimento de obrigação legal (art. 7º, II).",
      },
      {
        title: "Cookies e armazenamento no navegador",
        body: "Antes da sua escolha, nada de terceiros é carregado. Necessários: guardo no seu navegador a sua escolha sobre cookies e, se você trocar, a preferência de tema; isso não sai do seu dispositivo. Medição: o agendamento abre dentro do site num quadro do próprio Calendly, que aplica a política e os cookies dele e pode carregar ferramentas de terceiros que o Calendly usa, inclusive de publicidade, como Google Analytics, Facebook, Segment, Braze, OneTrust, Stripe e reCAPTCHA. Assim que o quadro abre, antes da sua escolha no aviso do próprio Calendly, essas ferramentas podem receber o seu endereço IP e o endereço da página; a origem da visita fica guardada só nesta sessão do navegador. Sem Medição, o botão abre a página do próprio Calendly. Publicidade: carrega a tag do Google Ads, que grava cookies para medir o resultado dos meus anúncios. A lista completa está na tabela abaixo.",
      },
      {
        title: "Com quem os dados são compartilhados",
        body: "Só com os fornecedores que fazem o site, o contato e a medição de anúncios funcionarem, e só para isso: a Netlify (hospedagem); o Calendly (agenda), que abre dentro do site só com o seu consentimento de Medição e, sem ele, na página do próprio Calendly; nos dois casos, vale a política de privacidade e de cookies do Calendly; e o Google, que hospeda o meu e-mail e, com o seu consentimento de Publicidade, opera o Google Ads. Cada um segue a própria política de privacidade. Não vendo dados. Autoridades só recebem dados mediante requisição legal.",
      },
      {
        title: "Transferência internacional",
        body: "A Netlify e o Google processam dados nos Estados Unidos, e o Calendly também pode processá-los fora do Brasil. Essas transferências seguem o art. 33 da LGPD, com base nos compromissos contratuais de proteção de dados desses fornecedores.",
      },
      {
        title: "Por quanto tempo",
        body: "Os registros técnicos de acesso ficam com a Netlify pelo prazo de retenção dela, e eu não os guardo à parte. Os dados do Google Ads ficam pelo prazo da política do Google, e cada cookie dura o prazo indicado na tabela abaixo. A sua escolha sobre cookies fica guardada no seu navegador por 6 meses; depois disso, o aviso aparece de novo. Mensagens e dados de agendamento ficam enquanto forem necessários para a conversa. Se ela virar contrato, guardo o que a lei exigir pelo prazo legal; se não virar, apago quando deixarem de ser necessários ou quando você pedir.",
      },
      {
        title: "Seus direitos",
        body: "Pela LGPD (art. 18), você pode pedir: confirmação de que trato seus dados e acesso a eles; correção; anonimização, bloqueio ou eliminação; portabilidade; informação sobre com quem eles foram compartilhados; e se opor a um tratamento baseado em legítimo interesse. Você pode revogar ou mudar o seu consentimento a qualquer momento em \"Preferências de cookies\", no rodapé de todas as páginas. Respondo em até 15 dias pelo contato abaixo. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).",
      },
      {
        title: "Segurança",
        body: "O site é estático, servido só por HTTPS, e não guarda dados pessoais em banco de dados próprio. O acesso às contas dos fornecedores é restrito a mim.",
      },
      {
        title: "Mudanças nesta política",
        body: "Quando esta política mudar, atualizo a data no topo da página.",
      },
    ],
    contact: {
      title: 'Contato',
      controllerLabel: 'Controlador',
      linkedinFallback: { lead: 'Para qualquer pedido sobre seus dados, fale comigo pelo', label: 'LinkedIn' },
    },
    backLink: 'Voltar para a página inicial',
    cookies: {
      title: "Cookies e armazenamento usados",
      intro: "Lista do que este site pode gravar no seu navegador, por categoria. Medição e Publicidade só gravam algo depois do seu consentimento. Os cookies do Calendly só existem se você aceitar Medição e abrir o agendamento: são definidos pelo Calendly dentro do quadro de agendamento, e o Calendly pode usar outros conforme a política dele.",
      caption: "Cookies e armazenamento local deste site",
      headers: { name: "Nome", vendor: "Fornecedor", purpose: "Finalidade", category: "Categoria", duration: "Duração" },
      rows: [
        { name: "_gcl_au", vendor: "Google (Google Ads)", purpose: "Medir a eficácia dos anúncios. Cookie do domínio do site (1ª parte).", category: "Publicidade", duration: "90 dias" },
        { name: "_gcl_ls", vendor: "Google (Google Ads)", purpose: "Medir a eficácia dos anúncios. Armazenamento local do navegador.", category: "Publicidade", duration: "Sem prazo publicado pelo Google; apagado quando você revoga o consentimento" },
        { name: "ts-consent", vendor: "Este site", purpose: "Registrar a sua escolha sobre cookies. Armazenamento local do navegador.", category: "Necessário", duration: "6 meses" },
        { name: "ts-utm", vendor: "Este site", purpose: "Guardar a origem da visita (UTMs da campanha) para repassá-la ao Calendly. Armazenamento de sessão do navegador.", category: "Medição", duration: "Até você fechar a aba" },
        { name: "theme", vendor: "Este site", purpose: "Lembrar o tema claro ou escuro, só se você trocar. Armazenamento local do navegador.", category: "Necessário", duration: "Até você limpar os dados do navegador" },
        { name: "__cf_bm", vendor: "Calendly (Cloudflare), em .calendly.com", purpose: "Segurança e proteção contra robôs no agendamento.", category: "Medição", duration: "30 minutos" },
        { name: "_cfuvid", vendor: "Calendly (Cloudflare), em .calendly.com", purpose: "Segurança do agendamento.", category: "Medição", duration: "Até você fechar o navegador" },
        { name: "OptanonConsent", vendor: "Calendly (OneTrust), em .calendly.com", purpose: "Guardar a sua escolha de cookies no Calendly.", category: "Medição", duration: "1 ano" },
        { name: "m", vendor: "Calendly (Stripe), em m.stripe.com", purpose: "Prevenção de fraude.", category: "Medição", duration: "Cerca de 1 ano" },
      ],
    },
  },

  diagnostico: {
    meta: {
      title: 'Quanto custa um sistema sob medida? | {brand}',
      description:
        "Sistema sob medida para tirar a operação da planilha, com preço publicado. Diagnóstico grátis de 45 minutos com quem constrói.",
    },
    hero: {
      eyebrow: "Diagnóstico grátis de 45 min",
      title: "Sistema sob medida para tirar sua operação da planilha, com preço publicado",
      subtitle:
        "Sistema novo, MVP ou protótipo em produção, sem montar uma área de TI. Um só responsável sênior, direto com quem constrói.",
      cta: "Agendar diagnóstico (45 min, grátis)",
      proofLine: ["Escopo e preço fechados", "Código na sua conta", "Garantia de 60 dias para bugs no MVP"],
    },
    ladder: {
      title: "Quanto custa: preço publicado, um degrau de cada vez",
      // Intro da home, como pede o texto do Mote.
      intro:
        "Você sabe quanto custa antes de assinar. Cada etapa termina com algo que é seu, e você decide se sobe para a próxima. O diagnóstico é grátis e pode terminar em \"não construa software agora\".",
    },
    sprint: {
      title: "O que você recebe no Product Sprint",
      intro:
        "Em 2 semanas, o problema vira um projeto pronto para construir, com preço fechado. Os entregáveis são seus, mesmo se você não seguir comigo.",
      items: [
        { title: "Problema e métrica de sucesso", body: "O que precisa mudar na operação e como vamos medir, antes de escrever código." },
        { title: "Escopo com o que fica fora", body: "Critérios de aceite para cada item e a lista do que não entra, por escrito." },
        { title: "Arquitetura técnica", body: "Como o sistema se conecta ao que você já usa: dados, integrações e onde a IA entra, se entrar." },
        { title: "Protótipo navegável", body: "O fluxo principal clicável, para você validar antes do código de produção." },
        { title: "Plano de marcos", body: "As etapas do MVP, o que cada uma entrega e o pagamento ligado a cada etapa." },
        { title: "Preço fechado do MVP", body: "Um valor final para construir, definido no fim do Sprint, sem cobrança por hora." },
      ],
      note: "Se você assinar o MVP em até 30 dias, o valor do Sprint é abatido integralmente.",
    },
    proofs: {
      title: "O que já construí",
      items: [
        {
          title: "Crédito na Bom.Capital (experiência passada)",
          body: "Como primeiro profissional de dados da fintech, construí o modelo que levou a análise de crédito de, em média, 48 horas para menos de 2 horas.",
          source: { label: "Relato meu" },
          kind: 'self-reported',
        },
        {
          title: "Ascende",
          body: "App em que a pessoa conta o dia numa frase e um conselheiro de IA registra finanças, treino, sono e alimentação. Construído por mim, do zero ao deploy.",
          source: { label: "Projeto próprio, não é cliente", url: 'https://ascende.site', linkLabel: "ascende.site" },
          kind: 'own-project',
        },
      ],
    },
    about: {
      title: "Quem constrói: Henrique Pett",
      bio: [
        "Desde 2021 passei por pesquisa de ML, full stack, ciência de dados, engenharia de ML e produto. Pego um problema de negócio e levo até software em produção, respondendo por cada parte. Trabalho com agentes de código e testes automatizados, com revisão minha em tudo que vai para produção. Quando o projeto pede um especialista, eu trago, orçado à parte e combinado antes. Você sempre fala comigo.",
      ],
    },
    faq: {
      // O texto do Mote não traz título para o FAQ: reusa o da home.
      title: "Perguntas frequentes",
      items: [
        {
          question: "Quanto tempo leva?",
          answer:
            "O Sprint leva 2 semanas. Um Production-Ready, 2 a 3. Um MVP Core fica em produção em 6 a 7 semanas, e um MVP Plus em 8 a 10. O cronograma de marcos sai do Sprint, junto com o preço fechado. Depois do go-live, o MVP tem garantia de 60 dias para bugs.",
        },
        {
          question: "De quem é o código?",
          answer:
            "Seu. O repositório, o banco e a nuvem ficam na sua conta desde o primeiro dia. A propriedade intelectual é transferida a você no pagamento final. Os entregáveis do Sprint são seus mesmo se você não seguir para o MVP.",
        },
        {
          question: "Você é uma pessoa só. E se ficar indisponível?",
          answer:
            "O código e a nuvem ficam na sua conta, e a documentação é escrita durante o projeto: qualquer desenvolvedor sênior consegue assumir. O cronograma tem folga para imprevistos e, se o projeto não puder seguir, você recebe de volta, proporcionalmente, o que pagou e não foi entregue.",
        },
        {
          question: "Já tenho um protótipo feito numa ferramenta de IA. Serve?",
          answer:
            "Muitas vezes é um bom ponto de partida. O Production-Ready leva o que existe à produção: segurança, login, deploy, monitoramento e backup na sua conta. Não inclui reescrever o produto nem criar funcionalidades novas.",
        },
        {
          question: "Você emite nota fiscal e assina NDA?",
          answer:
            "Sim para os dois. Se preferir, assino o NDA antes do diagnóstico. Emito nota fiscal de serviço.",
        },
      ],
    },
    finalCta: {
      title: "Comece por uma conversa de 45 minutos",
      body: "Você me conta o problema e eu digo com franqueza se vale construir, qual degrau faz sentido e quanto custa. Se for \"ainda não\", você sai com isso também.",
      cta: "Agendar diagnóstico (45 min, grátis)",
    },
  },

  notFound: {
    title: 'Esta página não existe.',
    body: 'O endereço pode ter mudado ou estar digitado errado.',
    homeLink: 'Voltar para o início',
  },
};
