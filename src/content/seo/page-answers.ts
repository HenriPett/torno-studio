import { site } from '../../config/site';
import type { Locale, RouteId } from '../../lib/i18n';

export type PageAnswerRoute = Extract<RouteId,
  'home' | 'about' | 'contact' | 'privacy' | 'recovery' | 'lovableProduction' |
  'rlsGuide' | 'caseLoopt' | 'caseAscende' | 'caseBomCapital'
>;

interface PageAnswerCopy {
  question: string;
  answer: string;
}

/** Resumos do conteúdo publicado em cada página; referências em docs/qa/geo-20261029/pages.md. */
export const pageAnswers: Record<Locale, Record<PageAnswerRoute, PageAnswerCopy>> = {
  'pt-BR': {
    home: {
      question: `Que tipo de software a ${site.organizationName} desenvolve?`,
      answer: 'Desenvolvo software sob medida para empresas que precisam automatizar processos, integrar sistemas, retomar um projeto travado ou lançar um produto web. Sou Henrique Pett: defino o escopo com você e implemento a entrega até a produção, com critérios de aceite e código na sua conta.',
    },
    about: {
      question: `Quem conduz os projetos da ${site.organizationName}?`,
      answer: 'Sou Henrique Pett, o engenheiro responsável pelo estúdio. Você trabalha diretamente comigo na avaliação do problema, definição do escopo e implementação de produtos web, ferramentas internas, integrações e automações. Os cases apresentam minha experiência profissional e um produto próprio.',
    },
    contact: {
      question: 'Como começar uma conversa sobre seu projeto de software?',
      answer: 'Use o e-mail ou o link de agendamento nos canais oficiais abaixo. Descreva o fluxo atual, quem usa, o que precisa mudar e quais sistemas estão envolvidos. Se já existe código ou protótipo, conte a principal falha observada, sem enviar senhas ou dados de clientes.',
    },
    privacy: {
      question: 'Como controlar o uso de cookies neste site?',
      answer: 'Você escolhe no aviso de cookies se permite Medição e Publicidade e pode mudar essa escolha em “Preferências de cookies”, no rodapé. Sem consentimento de Medição, o botão de agendamento abre a página do Calendly. Pedidos sobre seus dados podem ser enviados pelo canal de contato ao fim desta política.',
    },
    recovery: {
      question: 'Como retomar um projeto de software travado?',
      answer: 'Começo pelo fluxo bloqueado e seu impacto na operação. Com acesso autorizado ao código e ao ambiente, avalio o que pode ser preservado e delimito correções com critérios de aceite. Quando o legado ou o escopo ainda são incertos, o Product Sprint define as prioridades antes da implementação.',
    },
    lovableProduction: {
      question: 'O que entra na preparação de um app Lovable para produção?',
      answer: 'Para um protótipo aproveitável e escopo compatível, combino critérios de aceite, implemento as correções acordadas e verifico acessos, fluxo principal, integrações e procedimentos de operação. O trabalho parte do backend e das contas existentes; uma migração ou reconstrução exige justificativa e escopo próprios.',
    },
    rlsGuide: {
      question: 'Como testar permissões entre empresas com RLS?',
      answer: 'Defina as associações de cada usuário às empresas e as ações permitidas por perfil, depois teste acessos permitidos e negados. Este guia demonstra leitura e edição com dados sintéticos e SQL executável. A validação pela API real e pelas demais partes da aplicação ainda é necessária antes de concluir sobre a segurança em produção.',
    },
    caseLoopt: {
      question: 'O que a experiência na Loopt mostra sobre IA na operação industrial?',
      answer: 'Mostra o caminho de um modelo de IA até o uso diário numa operação pesada. Na Loopt, Henrique Pett, que lidera a Torno, construiu o núcleo de Machine Learning e depois geriu o produto de IA para pátios de contêineres. Segundo a Loopt, a solução da equipe reduziu em 27% os movimentos improdutivos (MundoLogística, 13/01/2026). É experiência anterior à Torno.',
    },
    caseAscende: {
      question: 'O que o projeto Ascende demonstra?',
      answer: 'O Ascende é um projeto próprio de quem conduz a Torno: um aplicativo que transforma texto ou áudio em registros que a pessoa revisa antes de salvar, construído da concepção à publicação. A evidência é o produto no ar; os fluxos com login não foram auditados neste case.',
    },
    caseBomCapital: {
      question: 'Como software e análise de crédito se conectam no case Bom.Capital?',
      answer: 'Henrique Pett, que lidera a Torno, desenvolveu o sistema de carteira de crédito da Bom.Capital e depois a solução de Machine Learning para analisar propostas. Segundo relato dele, sem publicação externa, a resposta ao cliente passou de 48 horas em média para menos de 2 horas. É experiência anterior à Torno.',
    },
  },
  en: {
    home: {
      question: `What does ${site.organizationName} build for founders?`,
      answer: 'I build custom web products, integrations and automation for early-stage founders without a CTO, including stalled projects and usable prototypes that need production work. I’m Henrique Pett: you work directly with me from scoping through implementation, with agreed acceptance criteria and code in your own repository.',
    },
    about: {
      question: `Who handles projects at ${site.organizationName}?`,
      answer: 'I’m Henrique Pett, the engineer responsible for the studio. You work directly with me to assess the problem, define scope and implement web products, internal tools, integrations and automation. The case studies describe my professional experience and a product I built myself.',
    },
    contact: {
      question: 'How do you start a conversation about your software project?',
      answer: 'Use the email or booking link in the official channels below. Describe the current workflow, who uses it, what needs to change and which systems are involved. If you have code or a prototype, explain the main failure you see without sending passwords or customer data.',
    },
    privacy: {
      question: 'How can you control cookies on this site?',
      answer: 'Choose whether to allow Measurement and Advertising in the cookie notice, and change your choice through “Cookie preferences” in the footer. Without Measurement consent, the booking button opens Calendly’s own page. Send requests about your data through the contact channel at the end of this policy.',
    },
    recovery: {
      question: 'How do you restart a stalled software project?',
      answer: 'I start with the blocked workflow and its impact on your pilot or business. With authorized access to the code and environment, I assess what can be retained and scope changes against acceptance criteria. When the inherited system or scope is unclear, a Product Sprint defines priorities before implementation.',
    },
    lovableProduction: {
      question: 'What does preparing a Lovable app for production involve?',
      answer: 'For a usable prototype and compatible scope, I agree acceptance criteria, implement bounded changes and check access, the core workflow, integrations and operating procedures. The work starts with your existing backend and accounts; migration or reconstruction needs its own justification and scope.',
    },
    rlsGuide: {
      question: 'How do you test access across companies with RLS?',
      answer: 'Define each user’s company memberships and the actions each role can perform, then test allowed and denied access. This guide demonstrates read and edit permissions with synthetic data and executable SQL. Validation through the real API and the rest of the application is still needed before drawing conclusions about production security.',
    },
    caseLoopt: {
      question: 'What does the Loopt experience show about AI in industrial operations?',
      answer: 'It shows the path from an AI model to daily use in a heavy operation. At Loopt, Henrique Pett, who leads Torno, built the core Machine Learning solution and later managed the AI product for container yards. According to Loopt, the team’s solution cut unproductive moves by 27% (MundoLogística, January 13, 2026). This experience predates Torno.',
    },
    caseAscende: {
      question: 'What does the Ascende project demonstrate?',
      answer: 'Ascende is an own project of the person who leads Torno: an app that turns text or voice into records the user reviews before saving, built from concept to launch. The evidence is the live product; logged-in workflows were not audited for this case study.',
    },
    caseBomCapital: {
      question: 'How do software and credit analysis connect in the Bom.Capital case?',
      answer: 'Henrique Pett, who leads Torno, built Bom.Capital’s credit portfolio system and later the Machine Learning solution for analyzing applications. According to his own account, with no external publication, customer response time fell from an average of 48 hours to under 2 hours. This experience predates Torno.',
    },
  },
};
