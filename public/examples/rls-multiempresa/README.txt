RLS multiempresa / Multi-tenant RLS — synthetic demo
Version: 2026-10-13

PT — COMO EXECUTAR
Baixe run-local.sh, bootstrap-local.sql, schema.sql e tests.sql na mesma pasta.
Requer Bash e PostgreSQL (initdb, pg_ctl, psql no PATH), usuário comum do SO.
Execute: bash run-local.sh
No repositório: bash scripts/test-rls-local.sh
O runner cria seu próprio cluster descartável, sem TCP, em pasta privada.
Não recebe DATABASE_URL, não usa credenciais reais e não conecta à produção.
Saída esperada: RLS_DEMO_ALL_ASSERTIONS_PASSED. Qualquer falha encerra com erro.

EN — HOW TO RUN
Download run-local.sh, bootstrap-local.sql, schema.sql and tests.sql together.
Requires Bash, PostgreSQL binaries (initdb, pg_ctl, psql on PATH), non-root OS user.
Run: bash run-local.sh
In the repository: bash scripts/test-rls-local.sh
The runner creates its own disposable cluster, with no TCP listener, in a private
folder. No DATABASE_URL, real credentials or production connection is accepted.
Expected output: RLS_DEMO_ALL_ASSERTIONS_PASSED. Any failure exits nonzero.

POSTGRESQL WASM ALTERNATIVE / ALTERNATIVA WASM
Download run-wasm.mjs as well. With Node.js and npm installed, from the folder
containing all five files, run the following commands. Dependency installation
is isolated in a temporary directory and does not modify the site's package.json.
Baixe também run-wasm.mjs. Com Node.js e npm, execute na pasta dos cinco arquivos:

example_dir="$PWD"
wasm_dir=$(mktemp -d /tmp/rls-wasm.XXXXXX)
npm install --prefix "$wasm_dir" --ignore-scripts --no-audit --no-fund @electric-sql/pglite@0.5.9
cp run-wasm.mjs "$wasm_dir/run-wasm.mjs"
node "$wasm_dir/run-wasm.mjs" "$example_dir"

Expected: RLS_DEMO_ALL_ASSERTIONS_PASSED (94 assertions)
Validated: PostgreSQL 18.6 WASM / PGlite 0.5.9, Node 26.9.0, 2026-10-13.
Native PostgreSQL 18.1 could not initialize in the authoring sandbox:
shmget: Operation not permitted, including with supported mmap options.
Docker daemon unavailable. WASM is actual SQL execution, not native server,
Supabase integration, JWT verification, HTTP testing or end-to-end validation.

CONTRACT / CONTRATO
companies(id), memberships(company_id,user_id,permission),
documents(id,company_id,created_by,title).
Viewer: read own companies. Editor: CRUD documents within own companies.
An editor may update another author's title within the same company.
Multi-company users hold independent memberships; the browser tenant is not
trusted. Membership writes require a separate administrative server workflow.
Clients cannot change company_id or created_by: UPDATE is granted only on title.
WITH CHECK validates destination membership but does not compare OLD/NEW.
O campo created_by é autoria, não autorização. Não há gestão de membros na demo.

bootstrap-local.sql mocks auth.users, auth.uid() and API roles. It injects a
synthetic identity via a session setting. DO NOT install it on Supabase.
schema.sql assumes a new, empty demo database with those objects available.
For Supabase staging, review/adapt migrations and use real auth users/session
JWTs; do not run this standalone bootstrap or fixtures against an existing app.
Supabase provides auth.uid() itself. The caller must not control trusted claims.

tests.sql sets up fixtures as administrator then switches to authenticated
(NOSUPERUSER, NOBYPASSRLS, non-owner) for assertions. Only fixture setup,
explicit administrative revocation and the named bypass demonstration are
privileged. Expected-denial helpers accept only SQLSTATE 42501; unexpected
success or wrong affected-row count fails. DML assertions cover positive and
negative CRUD for editor A, viewer A, editor B, editor A+B and a non-member.
Tests also cover company visibility, forged creator, immutable tenant/author,
membership insert/update/delete/reassociation, downgrade, revocation, null UID,
anon and explicit BYPASSRLS exposure. No production guarantee is implied.

LIMITS / LIMITES
Revocation is checked by new READ COMMITTED statements against memberships.
Long transactions, concurrent snapshots, caches and data already delivered need
separate handling. Column grants depend on no other inherited UPDATE grants.
Existing permissive policies, views, RPC/SECURITY DEFINER, Storage, Realtime,
privileged endpoints, jobs, auth and secrets require additional review/testing.
Secret/service_role credentials stay server-side; effective request identity
matters. Table owners normally bypass RLS; FORCE ROW LEVEL SECURITY subjects owners
to policies. Superusers and BYPASSRLS still bypass policies even with FORCE.

Sources consulted 2026-10-13:
https://supabase.com/docs/guides/database/postgres/row-level-security
https://www.postgresql.org/docs/current/ddl-rowsecurity.html
https://docs.lovable.dev/features/security
https://supabase.com/docs/guides/troubleshooting/identify-lovable-cloud-or-supabase-backend
https://pglite.dev/docs/
