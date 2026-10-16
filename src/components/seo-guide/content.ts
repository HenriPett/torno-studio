export const guideCopy = {
  'pt-BR': {
    title: 'RLS multiempresa no Supabase: permissões e teste executável',
    description: 'Guia de RLS multiempresa para apps Lovable e Supabase: membros, viewer/editor, isolamento A/B e SQL com testes positivos e negativos.',
    eyebrow: 'Guia técnico · Henrique Pett · 13 de outubro de 2026',
    intro: 'Um login válido não autoriza acesso a todas as empresas. Neste guia, eu modelo um usuário que participa de uma ou mais empresas, separo leitura de edição e testo o que acontece quando ele tenta acessar outra empresa. O exemplo usa apenas dados sintéticos.',
    toc: 'Neste guia',
    sections: [
      { id: 'arquitetura', title: '1. Identifique quem opera o backend', paragraphs: [
        'No Lovable Cloud, o backend é gerenciado pelo Lovable. Não presuma que o projeto aparecerá na sua conta Supabase ou que você terá o mesmo acesso administrativo de um projeto próprio. Use os recursos de banco, autenticação e segurança disponíveis no Cloud para revisar a configuração.',
        'Com Supabase próprio conectado ao Lovable, você administra esse projeto Supabase, suas migrations, grants e políticas. Com backend próprio, a API precisa validar a identidade e aplicar a autorização em toda rota. O proprietário da tabela normalmente ignora RLS, mas FORCE ROW LEVEL SECURITY o sujeita às políticas. Superusuários e papéis BYPASSRLS continuam ignorando RLS mesmo com FORCE.',
        'Eu separo três perguntas: quem controla a conta e a infraestrutura; quais grants, políticas e segredos estão configurados; e qual regra de negócio cada perfil deve cumprir. Problemas de plataforma pertencem ao suporte da plataforma; uma regra de acesso da sua operação precisa de critérios e testes próprios.'
      ] },
      { id: 'contrato', title: '2. Contrato: identidade, associação e ação', paragraphs: [
        'auth.uid() representa o usuário autenticado, não a empresa ativa. O navegador pode enviar company_id para escolher uma empresa, mas esse valor não concede acesso. A decisão consulta memberships(company_id, user_id, permission) no banco. A chave composta impede associações duplicadas e permission aceita somente viewer ou editor.',
        'Neste exemplo, viewer lê documentos da empresa; editor lê, cria, altera o título e exclui qualquer documento dela. created_by registra o autor, não é a regra de autorização. Na criação ele deve coincidir com auth.uid(); company_id e created_by não podem ser atualizados pelo cliente, nem quando ele é editor das duas empresas.',
        'O cliente só lê suas próprias associações. Não há grant nem policy de escrita em memberships para authenticated: ele não pode se promover a editor, se associar a B ou editar a associação de outra pessoa. Convites e administração de membros exigem um fluxo separado no servidor, com autorização administrativa e auditoria. Esse fluxo não está implementado na demo.',
        'Um usuário multiempresa recebe direitos por associação, sem um tenant global em metadata editável pelo usuário. Ao remover a associação com A, as consultas seguintes em READ COMMITTED deixam de ver A e preservam B. Transações com snapshot antigo, resultados já baixados e caches exigem tratamento adicional; revogar uma associação não apaga dados que já chegaram ao cliente.'
      ] },
      { id: 'politicas', title: '3. USING, WITH CHECK e privilégios por coluna', paragraphs: [
        'USING restringe quais linhas existentes entram em SELECT, UPDATE e DELETE. WITH CHECK valida os valores novos em INSERT e UPDATE. O exemplo combina as duas condições no UPDATE, além da política SELECT necessária para localizar a linha. Uma leitura negada retorna zero linhas; UPDATE ou DELETE filtrados também podem afetar zero linhas sem lançar erro.',
        'WITH CHECK sozinho não compara OLD com NEW: um editor de A e B poderia passar nas duas verificações e transferir um documento. Por isso o grant de UPDATE permite apenas title. O teste de transferência verifica uma recusa 42501. Esse é um bloqueio por privilégio de coluna, não uma prova de que WITH CHECK detectou a transferência.',
        'O esquema também protege companies e memberships com RLS. As policies de documentos consultam apenas as associações visíveis do usuário, sem função SECURITY DEFINER. Índices em memberships(user_id, company_id) e documents(company_id) apoiam as consultas. Outras policies permissivas existentes podem ampliar acesso: revise o conjunto, não cole este exemplo sobre um banco existente.'
      ] },
      { id: 'matriz', title: '4. Matriz empresa A/B × ação', paragraphs: [
        'Cada célula abaixo vira uma asserção no SQL. “CRUD” significa ler, criar, alterar title e excluir. Um editor pode modificar documentos de outros autores da mesma empresa; não pode trocar autor ou empresa. O acesso de um editor A+B é intencional e verificado separadamente do vazamento entre empresas.'
      ] },
      { id: 'executar', title: '5. Execute e confira o resultado', paragraphs: [
        'Baixe os quatro arquivos abaixo na mesma pasta e execute bash run-local.sh. Pré-requisitos: Bash e PostgreSQL com initdb, pg_ctl e psql no PATH, rodando como usuário comum do sistema. O runner cria um cluster descartável, sem listener TCP, em um diretório temporário privado; ele não aceita URL de banco e remove o cluster ao terminar.',
        'bootstrap-local.sql simula auth.users, auth.uid() e os papéis da API. O harness injeta um UUID sintético com set_config; isso não valida JWT. Nunca copie esse bootstrap para Supabase. schema.sql é o contrato da demo; tests.sql prepara os dados como administrador e executa as asserções com SET ROLE authenticated, sem ser dono das tabelas, superusuário ou BYPASSRLS.',
        'O resultado esperado termina com RLS_DEMO_ALL_ASSERTIONS_PASSED. Falhas encerram o processo com status diferente de zero. Os casos verificam contagem de linhas e SQLSTATE 42501, incluindo CRUD permitido e negado, criação com autor falso, troca de empresa/autor, alteração de associações, usuário sem associação, identidade nula, anon, downgrade e revogação. Um caso separado demonstra que BYPASSRLS enxerga ambas as empresas.',
        'Executado em 13/10/2026: PostgreSQL 18.6 WASM via PGlite 0.5.9, com 94 asserções aprovadas e Supabase simulado. Não houve teste integrado de Supabase, JWT, API HTTP ou produção. O runner público usa o mesmo schema e as mesmas asserções; build e testes de navegador não substituem essa execução SQL.'
      ] },
      { id: 'limites', title: '6. O que ainda precisa ser validado para produção', paragraphs: [
        'service_role e papéis BYPASSRLS ignoram RLS. Secret keys devem permanecer no servidor; quando a requisição roda como serviço, não espere proteção por policies. Em clientes com chaves legadas, confira o Authorization efetivo: um token de usuário pode fazer a consulta executar com as permissões desse usuário. Não conclua o contexto de autorização apenas pela chave usada para inicializar o SDK.',
        'Depois do teste SQL, eu repetiria a matriz pela API real com sessões distintas, incluindo endpoints privilegiados, funções, views, Storage, Realtime, jobs e caches aplicáveis. Também revisaria grants herdados, exposição de schemas, gestão de segredos, migrations, backups, logs sem dados sensíveis e concorrência da revogação. Este SQL isolado não garante segurança nem prontidão de produção.',
        'O Lovable já oferece Quick scan, Deep scan e correções automáticas elegíveis. Quick verifica configuração e acesso ao banco, dependências e exposição MCP; Deep inclui análise da lógica, permissões, dados, autenticação e pagamentos. Eu uso esses recursos e reviso os achados. A matriz executada aqui acrescenta evidência específica da regra A/B; não pressupõe que o Lovable seja incapaz de encontrá-la.'
      ] }
    ],
    headers: ['Perfil sintético', 'Empresa A', 'Empresa B'],
    rows: [['Editor A', 'CRUD', 'Nenhum'], ['Viewer A', 'Ler', 'Nenhum'], ['Editor B', 'Nenhum', 'CRUD'], ['Editor A+B', 'CRUD', 'CRUD'], ['Sem associação', 'Nenhum', 'Nenhum']],
    matrixCaption: 'Permissões esperadas antes da revogação',
    download: 'Arquivos executáveis', sql: 'Ver o schema completo',
    sources: 'Fontes oficiais consultadas em 13/10/2026',
    ctaTitle: 'Sua operação precisa dessas regras verificadas?',
    cta: 'Eu avalio o que pode ser aproveitado e quais riscos precisam ser resolvidos em um app empresarial em operação ou com lançamento financiado. Traga a arquitetura e a matriz de acesso esperada; não envie credenciais ou dados de clientes.',
    book: 'Agendar triagem gratuita de 45 min',
    bookingNote: 'Conversa gratuita de 45 minutos para entender o contexto e avaliar o próximo passo. Não inclui auditoria técnica.',
    origin: 'Ao agendar, mencione “guia RLS” na conversa para eu reconhecer a origem do contato.',
    rescue: 'Recuperação de projeto', production: 'Lovable em produção',
    rescuePath: '/recuperacao-de-projeto/', productionPath: '/lovable-em-producao/',
  },
  en: {
    title: 'Multi-tenant Supabase RLS: permissions and executable tests',
    description: 'A practical multi-tenant RLS guide for Lovable and Supabase apps: membership, viewer/editor permissions, A/B isolation and executable SQL tests.',
    eyebrow: 'Technical guide · Henrique Pett · October 13, 2026',
    intro: 'A valid login does not authorize access to every company. In this guide, I model users who belong to one or more companies, separate read and write permissions, and test attempts to access another tenant. The example uses synthetic data only.',
    toc: 'In this guide',
    sections: [
      { id: 'arquitetura', title: '1. Identify who operates the backend', paragraphs: [
        'With Lovable Cloud, Lovable manages the backend. Do not assume the project appears in your Supabase account or gives you the same administrative access as your own project. Use the database, authentication and security controls available in Cloud to review its configuration.',
        'With your own Supabase project connected to Lovable, you administer that project, its migrations, grants and policies. With a custom backend, your API must verify identity and enforce authorization on every route. Table owners normally bypass RLS, but FORCE ROW LEVEL SECURITY subjects them to policies. Superusers and BYPASSRLS roles still bypass RLS even with FORCE.',
        'I separate three questions: who controls the account and infrastructure; which grants, policies and secrets are configured; and which business rules each role must follow. Platform incidents belong with platform support; access rules for your operation need their own criteria and tests.'
      ] },
      { id: 'contrato', title: '2. Contract: identity, membership and action', paragraphs: [
        'auth.uid() identifies the authenticated user, not the active company. A browser may send company_id to select a tenant, but that value does not grant access. Authorization checks memberships(company_id, user_id, permission) in the database. Its composite key prevents duplicate memberships; permission accepts only viewer or editor.',
        'In this example, a viewer reads company documents; an editor reads, creates, changes the title and deletes any document in that company. created_by records authorship; it is not the authorization rule. On insert it must match auth.uid(). Clients cannot update company_id or created_by, even when they are editors in both companies.',
        'Clients can only read their own memberships. authenticated has neither write grants nor write policies on memberships: users cannot promote themselves, join B or edit someone else’s membership. Invitations and membership administration require a separate server workflow with administrative authorization and auditing. That workflow is outside this demo.',
        'A user with multiple memberships receives permissions per company, without relying on a global tenant in user-editable metadata. Removing membership in A hides A in subsequent READ COMMITTED queries while preserving B. Older transaction snapshots, downloaded results and caches require additional handling; revocation cannot erase data already delivered to a client.'
      ] },
      { id: 'politicas', title: '3. USING, WITH CHECK and column privileges', paragraphs: [
        'USING restricts which existing rows participate in SELECT, UPDATE and DELETE. WITH CHECK validates new values for INSERT and UPDATE. This example uses both conditions on UPDATE and the SELECT policy needed to find the row. Denied reads return zero rows; filtered updates and deletes may also affect zero rows without raising an error.',
        'WITH CHECK alone does not compare OLD with NEW: an editor of A and B could satisfy both checks and transfer a document. The UPDATE grant therefore permits only title. The transfer test expects a 42501 rejection. This is a column privilege restriction, not evidence that WITH CHECK detected the transfer.',
        'The schema also applies RLS to companies and memberships. Document policies consult only the user’s visible memberships, without a SECURITY DEFINER function. Indexes on memberships(user_id, company_id) and documents(company_id) support those lookups. Other existing permissive policies may widen access: review the complete set instead of pasting this example into an existing database.'
      ] },
      { id: 'matriz', title: '4. Company A/B × action matrix', paragraphs: [
        'Each cell below becomes an SQL assertion. “CRUD” means read, create, update title and delete. An editor may modify documents authored by other users in the same company, but cannot change authorship or tenant. Access for an A+B editor is intentional and tested separately from cross-company leakage.'
      ] },
      { id: 'executar', title: '5. Run it and check the result', paragraphs: [
        'Download the four files below into one folder and run bash run-local.sh. Requirements: Bash and PostgreSQL with initdb, pg_ctl and psql on PATH, running as a regular OS user. The runner creates a disposable cluster with no TCP listener in a private temporary directory. It accepts no database URL and removes the cluster on exit.',
        'bootstrap-local.sql simulates auth.users, auth.uid() and API roles. The harness injects a synthetic UUID with set_config; this does not verify JWTs. Never install this bootstrap on Supabase. schema.sql defines the demo contract; tests.sql seeds data as an administrator, then runs assertions with SET ROLE authenticated, without table ownership, superuser or BYPASSRLS privileges.',
        'Successful output ends with RLS_DEMO_ALL_ASSERTIONS_PASSED. Failures exit with a nonzero status. Cases assert affected row counts and SQLSTATE 42501, covering allowed and denied CRUD, forged authorship, tenant/author transfers, membership writes, a non-member, null identity, anon, downgrade and revocation. A separate case demonstrates that BYPASSRLS sees both tenants.',
        'Executed on October 13, 2026: PostgreSQL 18.6 WASM through PGlite 0.5.9, with 94 passing assertions and simulated Supabase. Supabase integration, JWTs, the HTTP API and production were not tested. The public runner uses the same schema and assertions; a build or browser test does not replace SQL execution.'
      ] },
      { id: 'limites', title: '6. What still needs production validation', paragraphs: [
        'service_role and BYPASSRLS roles bypass RLS. Secret keys belong on the server; requests running as a service should not rely on policies for protection. With legacy-key clients, inspect the effective Authorization header: a user token can make the query run with that user’s permissions. Do not infer authorization context solely from the SDK initialization key.',
        'After SQL testing, I would repeat the matrix through the real API with separate sessions, including applicable privileged endpoints, functions, views, Storage, Realtime, jobs and caches. I would also review inherited grants, exposed schemas, secrets, migrations, backups, logs without sensitive data and concurrent revocation. This SQL alone does not establish security or production readiness.',
        'Lovable already provides Quick scan, Deep scan and eligible automatic fixes. Quick checks database configuration and access, dependencies and MCP exposure; Deep includes application logic, permissions, data, authentication and payments. I use these tools and review their findings. The executed matrix adds evidence for this specific A/B rule; it does not assume Lovable cannot detect it.'
      ] }
    ],
    headers: ['Synthetic role', 'Company A', 'Company B'],
    rows: [['Editor A', 'CRUD', 'None'], ['Viewer A', 'Read', 'None'], ['Editor B', 'None', 'CRUD'], ['Editor A+B', 'CRUD', 'CRUD'], ['No membership', 'None', 'None']],
    matrixCaption: 'Expected permissions before revocation',
    download: 'Executable files', sql: 'View the complete schema',
    sources: 'Official sources consulted on October 13, 2026',
    ctaTitle: 'Does your operation need these rules verified?',
    cta: 'I assess what can be retained and which risks need resolving in a business app that is already operating or has a funded launch. Bring your architecture and expected access matrix; do not send credentials or customer data.',
    book: 'Book a free 45-minute triage call',
    bookingNote: 'A free 45-minute conversation to understand the context and assess the next step. It does not include a technical audit.',
    origin: 'When booking, mention “RLS guide” in our conversation so I can identify how you found me.',
    rescue: 'Software project rescue', production: 'Lovable to production',
    rescuePath: '/en/software-project-rescue/', productionPath: '/en/lovable-to-production/',
  },
};
