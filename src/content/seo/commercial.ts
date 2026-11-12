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
      description: 'Portal, integração ou sistema interno travado? A Torno avalia o que aproveitar, define escopo e critérios de aceite para retomar a entrega.',
      eyebrow: 'Recuperação de projeto',
      heading: 'O sistema travou. A operação precisa continuar.',
      intro: 'A Torno retoma sistemas internos, portais e integrações que pararam no meio do caminho, depois de um fornecedor ou de um projeto da própria empresa. Começamos separando o que funciona do que impede a próxima entrega.',
      contextTitle: 'O ponto de partida é o impacto na operação',
      context: 'Para diretores e gestores de TI e operações em empresas de médio e grande porte, especialmente indústrias: um portal de representantes que não conclui pedidos, uma integração com o ERP que exige retrabalho manual ou um app de chão de fábrica que parou no piloto. Ter vindo de um fornecedor, do time interno ou de uma ferramenta de IA descreve a origem do projeto e diz pouco sobre a qualidade do código.',
      inventory: ['Qual fluxo está parado, quais áreas dependem dele e qual o impacto de continuar assim?', 'Quem possui o repositório, as contas de infraestrutura e autorização para conceder acesso?', 'Qual foi a última versão utilizável, o que já foi entregue e quais testes ou documentos existem?', 'Quem decide o escopo e valida a entrega com os usuários da operação?'],
      repair: 'Priorizamos reparar quando o fluxo principal é reproduzível, o código e as contas estão acessíveis e as falhas podem ser isoladas em um escopo com aceite objetivo. Preservamos o que já funciona e testamos os pontos afetados.',
      rebuild: 'Propomos replanejar quando faltam regras essenciais, a estrutura impede a mudança necessária ou não é possível delimitar o risco de corrigir. Reconstruir parte ou todo o sistema entra como etapa própria, com escopo e orçamento definidos no diagnóstico.',
      delivery: [['Mapa do bloqueio', 'Fluxo afetado, comportamento esperado e observado, dependências e prioridades documentadas.'], ['Correções delimitadas', 'Alterações no repositório do cliente e testes dos cenários acordados, incluindo regressões do fluxo principal.'], ['Retomada verificável', 'Demonstração em ambiente de teste, aceite do responsável e plano de publicação e reversão.'], ['Continuidade', 'Instruções de operação, acessos sob controle do cliente e limitações conhecidas registradas.']],
      fit: 'Há usuários ou piloto definido, impacto identificável, um decisor disponível e orçamento para a etapa. A empresa consegue liberar acesso autorizado ao código e ao ambiente. Quando o legado ainda é desconhecido, começamos pelo diagnóstico, que termina numa proposta fechada por etapa.',
      exclusions: ['Reescrita completa, funcionalidades novas ou migração ampla dentro da etapa de recuperação.', 'Plantão 24 horas, resposta emergencial ou promessa de recuperar qualquer sistema.', 'Pentest, certificação e trabalho regulatório fora do escopo, salvo com especialista contratado para isso.', 'Disputa contratual com fornecedor anterior ou obtenção de código sem autorização.'],
      faq: [['Precisamos descartar o que o fornecedor anterior entregou?', 'Não por padrão. Avaliamos o que pode ser mantido e quais mudanças são necessárias para o resultado acordado. A origem do projeto não serve de diagnóstico técnico.'], ['Um projeto iniciado pelo nosso time interno também se enquadra?', 'Sim, quando sustenta uma operação ou um piloto concreto e há acesso autorizado, decisor e orçamento. A ferramenta usada não define o enquadramento.'], ['A conversa inicial inclui revisão do repositório?', 'Não. São 45 minutos, sem custo, para entender impacto, contexto e encaixe. Investigação técnica e definição de escopo acontecem no diagnóstico, que é contratado à parte e também não equivale a uma auditoria técnica integral.']],
    },
    lovableProduction: {
      title: 'Lovable em produção: de protótipo a ferramenta | {brand}',
      description: 'Protótipo Lovable feito por uma área da empresa? A Torno prepara o app para uso interno com permissões, testes e operação, em escopo delimitado.',
      eyebrow: 'Lovable em produção',
      heading: 'O protótipo da sua área precisa virar ferramenta da empresa.',
      intro: 'A Torno prepara protótipos aproveitáveis para uso interno: definimos o aceite com a área responsável e com a TI, corrigimos o escopo acordado e documentamos como operar a entrega.',
      contextTitle: 'Da demonstração ao uso por pessoas reais',
      context: 'Para empresas de médio e grande porte, especialmente indústrias, em que uma área como TI, operações ou qualidade montou no Lovable um portal, um fluxo de aprovação ou um app interno que já tem usuários previstos. Antes de mudar a arquitetura, identificamos o backend, as integrações e quem controla cada conta. Sair do Lovable não é condição de entrada.',
      inventory: ['O app usa Lovable Cloud, Supabase conectado ou um backend próprio?', 'Quais perfis podem consultar, alterar, aprovar e exportar dados de cada área ou unidade?', 'Há pagamentos nativos ou integração própria com ERP? Qual evento libera acesso ou conclui um pedido?', 'Quais achados e correções dos scans existentes já foram revisados na versão atual?'],
      repair: 'Aproveitamos o protótipo quando o fluxo principal existe, as regras de negócio estão definidas e os ajustes cabem em uma entrega delimitada. Incluímos critérios para acesso legítimo, isolamento de dados e recuperação de falhas conforme o escopo.',
      rebuild: 'Se faltam fluxos centrais, o modelo de dados não atende à operação ou as integrações precisam ser refeitas, redefinimos o escopo antes de contratar a execução. Novas funcionalidades e reconstrução entram como etapas próprias da proposta.',
      delivery: [['Perfis e dados', 'Matriz de usuário × ação × dados e evidência de teste dos acessos permitidos e negados combinados.'], ['Fluxo principal', 'Cenários de sucesso, erro e repetição de ações testados com dados fictícios em ambiente autorizado.'], ['Integrações', 'Verificação das respostas, falhas e eventos relevantes; se houver cobrança, critérios de pagamento e liberação acordados.'], ['Operação', 'Procedimento de publicação, reversão, backup/restauração e monitoramento definidos e verificados no escopo contratado.']],
      fit: 'O protótipo atende uma operação ou piloto concreto; há decisor para validar regras, acesso autorizado ao código e orçamento para a etapa definida no diagnóstico. O trabalho é preparar uma entrega interna delimitada, com proposta fechada por etapa.',
      exclusions: ['Reescrita, migração ampla e novas funcionalidades dentro da etapa de preparação para produção.', 'Suporte oficial da plataforma, recuperação de conta ou gestão da assinatura Lovable.', 'Pentest, certificação, garantia de segurança absoluta ou compliance regulado fora do escopo, salvo com especialista.', 'Operação contínua ou suporte 24 horas incluídos na entrega inicial.'],
      faq: [['Precisamos sair do Lovable?', 'Não necessariamente. Decidimos com base no fluxo, nas dependências e nas responsabilidades de operação. Migração precisa de justificativa e escopo próprio.'], ['Os scans nativos já verificam lógica e permissões?', 'Sim. Quick e Deep têm coberturas diferentes; o Deep inclui lógica, autorização e pagamentos. Aproveitamos os resultados e as correções elegíveis e definimos com a área e a TI o aceite do uso interno.'], ['A Torno é suporte oficial ou parceira certificada?', 'Não. A Torno faz engenharia independente. Questões de conta e plataforma seguem pelo suporte oficial; não alegamos parceria nem certificação.']],
    },
  },
  en: {
    recovery: {
      title: 'Software project rescue for industry | {brand}',
      description: 'A stalled internal system, portal or integration? Torno assesses what to keep, defines a recovery scope and delivers against agreed acceptance.',
      eyebrow: 'Software project rescue',
      heading: 'A stalled system should not hold up your operation.',
      intro: 'Torno resumes internal systems, portals and integrations that stalled after a vendor engagement or an in-house build. We start with the blocked business outcome and what can be retained.',
      contextTitle: 'Start with the impact on operations',
      context: 'For IT and operations leaders at mid-size and large companies, especially manufacturers: a sales rep portal cannot complete orders, an ERP integration needs manual rework, or a shop floor app never left the pilot. A vendor, an internal team or an AI tool describes the project’s origin and says little about its quality.',
      inventory: ['Which workflow is blocked, which teams depend on it, and what is the business impact?', 'Who owns the repository and infrastructure accounts, and can authorize access?', 'What is the last usable release, and which tests, handover notes and dependencies exist?', 'Who can decide priorities and sign off on acceptance with the users?'],
      repair: 'We favor repair when the core workflow can be reproduced, source and accounts are accessible, and the changes can be bounded by testable acceptance criteria. We keep working parts and test affected behavior.',
      rebuild: 'We recommend replanning when essential rules are missing, the structure cannot support the required change, or repair risk cannot be bounded. A partial or full rebuild becomes its own stage, with scope and budget set in the assessment.',
      delivery: [['Blocker map', 'Recorded expected and actual behavior, affected workflow, dependencies and priorities.'], ['Bounded changes', 'Changes in your repository with agreed scenario tests and regression coverage for the core workflow.'], ['Release evidence', 'A staging demonstration, owner acceptance, and a documented release and rollback plan.'], ['Continuity', 'Operating instructions, client-controlled accounts and a record of known limitations.']],
      fit: 'You have users or a concrete pilot, an identifiable business impact, a decision-maker and budget for the stage. You can arrange authorized access to source and environments. If the inherited system is poorly understood, we start with an assessment that ends in a fixed proposal for each stage.',
      exclusions: ['A full rewrite, new features or broad migration within the recovery stage.', '24/7 incident response, emergency support or a promise to rescue every system.', 'Penetration testing, certification or regulated compliance unless a specialist is engaged for it.', 'Contract disputes with a previous vendor or unauthorized access to their code.'],
      faq: [['Do we have to throw away the previous vendor’s work?', 'No. We assess what can be retained and what must change for the agreed outcome. The project’s origin does not count as a technical diagnosis.'], ['Does a project our internal team started qualify?', 'Yes, if it serves real users or a concrete pilot and you have authorized access, a decision-maker and a compatible budget. The tool used does not decide eligibility.'], ['Does the first call include a repository audit?', 'No. The 45-minute call is free and covers impact, context and fit. Technical investigation and scoping happen in the assessment, a separate engagement that is not a comprehensive technical audit either.']],
    },
    lovableProduction: {
      title: 'Lovable to production for internal tools | {brand}',
      description: 'A Lovable prototype built by one of your teams? Torno prepares it for internal use with permissions, tests and operations, in a bounded scope.',
      eyebrow: 'Lovable to production',
      heading: 'Turn your team’s Lovable prototype into a company tool.',
      intro: 'Torno prepares usable prototypes for internal use: we agree on acceptance with the owning team and IT, implement a bounded scope and document how to operate the release.',
      contextTitle: 'From a working demo to daily use',
      context: 'For mid-size and large companies, especially manufacturers, where a team such as IT, operations or quality built a portal, approval workflow or internal app in Lovable that already has intended users. We inventory the backend, integrations and account ownership before proposing architecture changes. Leaving Lovable is not a prerequisite.',
      inventory: ['Does the app use Lovable Cloud, connected Supabase or a custom backend?', 'Which roles can view, change, approve and export each department’s or site’s data?', 'Are payments native or custom, and is there an ERP integration? Which event grants access or fulfills an order?', 'Which existing scan findings and eligible fixes have been reviewed for this version?'],
      repair: 'We retain the prototype when its core workflow exists, business rules are defined and the required changes fit a bounded delivery. We agree checks for legitimate access, data isolation and failure recovery where relevant to the scope.',
      rebuild: 'Missing core workflows, an unsuitable data model or integrations that need rebuilding require a new scope before execution. New features and reconstruction become their own stages in the proposal.',
      delivery: [['Roles and data', 'A user × action × data matrix with evidence for agreed allowed and denied access scenarios.'], ['Core workflow', 'Success, failure and repeated-action scenarios tested with synthetic data in an authorized environment.'], ['Integrations', 'Relevant responses, failure paths and events checked; payment and entitlement acceptance agreed when billing is involved.'], ['Operations', 'Release, rollback, backup/restore and monitoring procedures defined and verified within the contracted scope.']],
      fit: 'You have a concrete pilot or users, business impact, a decision-maker to validate rules, authorized source access and budget for the stage defined in the assessment. This is an engineering engagement for an internal release, with a fixed proposal for each stage.',
      exclusions: ['Rewrites, broad migrations and new features within the production readiness stage.', 'Official platform support, account recovery or Lovable subscription management.', 'Penetration testing, certification, absolute security guarantees or regulated compliance unless a specialist is engaged.', 'Ongoing operations or 24/7 support bundled into the initial delivery.'],
      faq: [['Do we need to leave Lovable?', 'Not necessarily. The workflow, dependencies and operating responsibilities guide that decision. A migration needs a reason and its own scope.'], ['Do native scans already check logic and permissions?', 'Yes. Quick and Deep have different coverage; Deep includes logic, authorization and payments. We use their findings and eligible fixes, then agree acceptance for internal use with the owning team and IT.'], ['Is Torno official support or a certified partner?', 'No. Torno provides independent engineering. Account and platform issues belong with official support; we do not claim a partnership or certification.']],
    },
  },
};
