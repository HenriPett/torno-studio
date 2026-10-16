-- LOCAL ONLY: never install this auth stub on Supabase or a shared database.
create role authenticated nologin nosuperuser nobypassrls;
create role anon nologin nosuperuser nobypassrls;
create role demo_service_role nologin nosuperuser bypassrls;
create schema auth;
create table auth.users (id uuid primary key);
create function auth.uid() returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;
revoke all on function auth.uid() from public;
grant usage on schema auth to authenticated, anon;
grant execute on function auth.uid() to authenticated, anon;
-- The harness injects synthetic identity. This is NOT JWT verification.
