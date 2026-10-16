import type { Locale } from '../../lib/i18n';
export type CommercialRoute = 'recovery' | 'lovableProduction';
export interface CommercialCopy {
  title: string; description: string; eyebrow: string; heading: string; intro: string;
  contextTitle: string; context: string; inventory: string[];
  repair: string; rebuild: string; delivery: [string, string][];
  fit: string; exclusions: string[]; faq: [string, string][];
}
export const commercial: Record<Locale, Record<CommercialRoute, CommercialCopy>> = {
  'pt-BR': {
    recovery: {
      title: 'Recuperação de projeto de software travado | {brand}',
      description: 'Seu produto travou após uma agência ou tentativa própria? Eu avalio o que aproveitar, defino escopo e critérios de entrega. Veja preços e condições.',
      eyebrow: 'Recuperação de projeto',
      heading: 'Seu projeto travou. A operação precisa continuar.',
      intro: 'Eu ajudo a retomar software com usuários reais ou piloto concreto, após uma agência ou tentativa própria. Primeiro, separo o que funciona do que impede a próxima entrega.',
      contextTitle: 'O ponto de partida é o impacto na operação',
      context: 'Para donos e gestores de empresas com 50–249 pessoas: um portal que não conclui pedidos, uma integração que exige retrabalho ou um piloto que não consegue avançar. Ter vindo de agência, desenvolvimento interno ou ferramenta de IA descreve a origem; não determina a qualidade do código.',
      inventory: ['Qual fluxo está parado, quem depende dele e qual o impacto de continuar assim?', 'Quem possui o repositório, as contas de infraestrutura e autorização para conceder acesso?', 'Qual foi a última versão utilizável, o que já foi entregue e quais testes ou documentos existem?', 'Quem decide o escopo e valida a entrega com usuários da operação?'],
      repair: 'Eu priorizo reparar quando o fluxo principal é reproduzível, o código e as contas estão acessíveis e as falhas podem ser isoladas em um escopo com aceite objetivo. Preservo o que já funciona e testo os pontos afetados.',
      rebuild: 'Eu proponho replanejar quando faltam regras essenciais, a estrutura impede a mudança necessária ou não é possível delimitar o risco de corrigir. Reconstruir parte ou todo o produto exige escopo e orçamento próprios; não está incluído automaticamente em Production-Ready.',
      delivery: [['Mapa do bloqueio', 'Fluxo afetado, comportamento esperado e observado, dependências e prioridades documentadas.'], ['Correções delimitadas', 'Alterações no repositório do cliente e testes dos cenários acordados, incluindo regressões do fluxo principal.'], ['Retomada verificável', 'Demonstração em ambiente de teste, aceite do responsável e plano de publicação e reversão.'], ['Continuidade', 'Instruções de operação, acessos sob controle do cliente e limitações conhecidas registradas.']],
      fit: 'Há usuários ou piloto definido, impacto identificável, um decisor disponível e orçamento para a oferta aplicável. Você consegue obter acesso autorizado ao código e ao ambiente. Se o legado ainda é desconhecido, eu começo pela definição de escopo no Product Sprint.',
      exclusions: ['Reescrita completa, funcionalidades novas ou migração ampla dentro do preço de Production-Ready.', 'Plantão 24 horas, resposta emergencial ou promessa de recuperar qualquer sistema.', 'Pentest, certificação e trabalho regulatório sem especialista e contratação específica.', 'Disputa contratual com fornecedor anterior ou obtenção de código sem autorização.'],
      faq: [['Preciso trocar tudo o que a agência entregou?', 'Não por padrão. Eu avalio o que pode ser mantido e quais mudanças são necessárias para o resultado acordado. A origem do projeto não é um diagnóstico técnico.'], ['Um projeto iniciado por mim também se enquadra?', 'Sim, quando sustenta uma operação ou piloto concreto e há acesso autorizado, decisor e orçamento. A ferramenta usada não define o enquadramento.'], ['O diagnóstico gratuito inclui revisão do repositório?', 'Não. São 45 minutos para entender impacto, contexto e fit. Investigação técnica e definição aprofundada de escopo dependem de contratação; o Sprint também não equivale a uma auditoria técnica integral.']],
    },
    lovableProduction: {
      title: 'Lovable em produção: escopo, preço e aceite | {brand}',
      description: 'Leve seu app Lovable para uma operação real com escopo delimitado, testes e entrega verificável. Production-Ready para protótipos elegíveis.',
      eyebrow: 'Lovable em produção',
      heading: 'Seu app Lovable precisa funcionar na operação real.',
      intro: 'Eu preparo protótipos aproveitáveis para uso empresarial: defino o aceite com você, corrijo o escopo acordado e documento como operar a entrega.',
      contextTitle: 'Da demonstração ao uso por pessoas reais',
      context: 'Para gestores de empresas com 50–249 pessoas, com portal, fluxo de aprovação ou app interno que já tem usuários previstos e impacto definido. Antes de mudar a arquitetura, eu identifico o backend, as integrações e quem controla cada conta. Sair do Lovable não é uma condição de entrada.',
      inventory: ['O app usa Lovable Cloud, Supabase conectado ou um backend próprio?', 'Quais perfis podem consultar, alterar, aprovar e exportar dados de cada empresa?', 'Há pagamentos nativos ou integração própria? Qual evento libera acesso ou conclui um pedido?', 'Quais achados e correções dos scans existentes já foram revisados na versão atual?'],
      repair: 'Eu aproveito o protótipo quando o fluxo principal existe, as regras de negócio estão definidas e os ajustes cabem em uma entrega delimitada. Incluo critérios para acesso legítimo, isolamento de dados e recuperação de falhas conforme o escopo.',
      rebuild: 'Se faltam fluxos centrais, o modelo de dados não atende à operação ou as integrações precisam ser refeitas, eu redefino o escopo antes de contratar a execução. Novas funcionalidades e reconstrução não cabem automaticamente no pacote de preparação para produção.',
      delivery: [['Perfis e dados', 'Matriz de usuário × ação × dados e evidência de teste dos acessos permitidos e negados combinados.'], ['Fluxo principal', 'Cenários de sucesso, erro e repetição de ações testados com dados fictícios em ambiente autorizado.'], ['Integrações', 'Verificação das respostas, falhas e eventos relevantes; se houver cobrança, critérios de pagamento e liberação acordados.'], ['Operação', 'Procedimento de publicação, reversão, backup/restauração e monitoramento definidos e verificados no escopo contratado.']],
      fit: 'Seu protótipo atende uma operação ou piloto concreto; há decisor para validar regras, acesso autorizado ao código e orçamento para Production-Ready quando o escopo for compatível. O escopo é preparar uma entrega empresarial delimitada.',
      exclusions: ['Reescrita, migração ampla e novas funcionalidades dentro do preço de Production-Ready.', 'Suporte oficial da plataforma, recuperação de conta ou gestão da assinatura Lovable.', 'Pentest, certificação, garantia de segurança absoluta ou compliance regulado sem especialista.', 'Operação contínua ou suporte 24 horas incluídos na entrega inicial.'],
      faq: [['Preciso sair do Lovable?', 'Não necessariamente. Eu decido com base no fluxo, nas dependências e nas responsabilidades de operação. Migração precisa de justificativa e escopo próprio.'], ['Os scans nativos já verificam lógica e permissões?', 'Sim. Quick e Deep têm coberturas diferentes; o Deep inclui lógica, autorização e pagamentos. Eu aproveito os resultados e as correções elegíveis, e defino com você o aceite do uso empresarial.'], ['Você é suporte oficial ou parceiro certificado?', 'Não. Eu ofereço engenharia independente. Questões de conta e plataforma devem seguir o suporte oficial; não alego parceria ou certificação.']],
    },
  },
  en: {
    recovery: {
      title: 'Software project rescue: scope and delivery | {brand}',
      description: 'A stalled product after an agency or a DIY build? I assess what to keep, define a recovery scope and deliver against agreed acceptance criteria.',
      eyebrow: 'Software project rescue',
      heading: 'A stalled build should not decide your next milestone.',
      intro: 'I help funded founders resume products with real users or a committed pilot after an agency engagement or a DIY build. I start with the blocked business outcome and what can be retained.',
      contextTitle: 'Start with the milestone your product cannot reach',
      context: 'For pre-seed and seed founders in the US or Europe without a CTO: onboarding cannot finish, a paid workflow breaks, or a pilot is waiting on an unresolved integration. An agency, internal build or AI tool is the project’s origin, not a verdict on its quality.',
      inventory: ['Which user workflow is blocked, and what does that mean for your pilot or business?', 'Who owns the repository and infrastructure accounts, and can authorize access?', 'What is the last usable release, and which tests, handover notes and dependencies exist?', 'Who can decide priorities and sign off on acceptance with pilot users?'],
      repair: 'I favor repair when the core workflow can be reproduced, source and accounts are accessible, and the changes can be bounded by testable acceptance criteria. I keep working parts and test affected behavior.',
      rebuild: 'I recommend replanning when essential rules are missing, the structure cannot support the required change, or repair risk cannot be bounded. A partial or full rebuild needs its own scope and budget; it is not automatically included in Production-Ready.',
      delivery: [['Blocker map', 'Recorded expected and actual behavior, affected workflow, dependencies and priorities.'], ['Bounded changes', 'Changes in your repository with agreed scenario tests and regression coverage for the core workflow.'], ['Release evidence', 'A staging demonstration, owner acceptance, and a documented release and rollback plan.'], ['Continuity', 'Operating instructions, client-controlled accounts and a record of known limitations.']],
      fit: 'You have users or a concrete pilot, an identifiable business impact, a decision-maker and budget for the applicable offer. You can arrange authorized access to source and environments. If the inherited system is poorly understood, I start with a Product Sprint to define scope.',
      exclusions: ['A full rewrite, new features or broad migration within the Production-Ready price.', '24/7 incident response, emergency support or a promise to rescue every system.', 'Penetration testing, certification or regulated compliance without separately engaged specialists.', 'Contract disputes with a previous vendor or unauthorized access to their code.'],
      faq: [['Do I have to throw away the agency’s work?', 'No. I assess what can be retained and what must change for the agreed outcome. The project’s origin is not a technical diagnosis.'], ['Does a product I built myself qualify?', 'Yes, if it serves real users or a concrete pilot and you have authorized access, a decision-maker and a compatible budget. The tool used does not decide eligibility.'], ['Does the free diagnostic include a repository audit?', 'No. The 45-minute conversation covers impact, context and fit. Technical investigation and deeper scoping require a paid engagement; a Sprint is not a comprehensive technical audit either.']],
    },
    lovableProduction: {
      title: 'Lovable to production: readiness and scope | {brand}',
      description: 'Bring a viable Lovable prototype into a production workflow. Clear scope, acceptance evidence and public pricing for funded founders with a pilot.',
      eyebrow: 'Lovable to production',
      heading: 'Bring your Lovable app into a production workflow.',
      intro: 'I help funded founders prepare a usable prototype for real customers: agree on acceptance, implement a bounded scope and document how to operate the release.',
      contextTitle: 'A working demo, a concrete pilot, a release to own',
      context: 'For funded pre-seed and seed founders without a CTO, with a business pilot or paying users in view. I inventory the backend, integrations and account ownership before proposing architecture changes. Leaving Lovable is not a prerequisite.',
      inventory: ['Does the app use Lovable Cloud, connected Supabase or a custom backend?', 'Which roles can view, change, approve and export each organization’s data?', 'Are payments native or custom? Which event grants access or fulfills an order?', 'Which existing scan findings and eligible fixes have been reviewed for this version?'],
      repair: 'I retain the prototype when its core workflow exists, business rules are defined and the required changes fit a bounded delivery. I agree checks for legitimate access, tenant isolation and failure recovery where relevant to the scope.',
      rebuild: 'Missing core workflows, an unsuitable data model or integrations that need rebuilding require a new scope before execution. New features and reconstruction are not automatically part of production preparation.',
      delivery: [['Roles and data', 'A user × action × data matrix with evidence for agreed allowed and denied access scenarios.'], ['Core workflow', 'Success, failure and repeated-action scenarios tested with synthetic data in an authorized environment.'], ['Integrations', 'Relevant responses, failure paths and events checked; payment and entitlement acceptance agreed when billing is involved.'], ['Operations', 'Release, rollback, backup/restore and monitoring procedures defined and verified within the contracted scope.']],
      fit: 'You have a concrete pilot or users, business impact, a decision-maker to validate rules, authorized source access and a budget compatible with Production-Ready if eligible. This is an engineering engagement for a business release.',
      exclusions: ['Rewrites, broad migrations and new features within the Production-Ready price.', 'Official platform support, account recovery or Lovable subscription management.', 'Penetration testing, certification, absolute security guarantees or regulated compliance without specialists.', 'Ongoing operations or 24/7 support bundled into the initial delivery.'],
      faq: [['Do I need to leave Lovable?', 'Not necessarily. The workflow, dependencies and operating responsibilities guide that decision. A migration needs a reason and its own scope.'], ['Do native scans already check logic and permissions?', 'Yes. Quick and Deep have different coverage; Deep includes logic, authorization and payments. I use their findings and eligible fixes, then agree business acceptance with you.'], ['Are you official support or a certified partner?', 'No. I provide independent engineering. Account and platform issues belong with official support; I do not claim a partnership or certification.']],
    },
  },
};
