-- Contract: synthetic demo, new empty database only. Requires auth.uid(),
-- auth.users(id), authenticated and anon from Supabase or local bootstrap.
-- Ordinary clients can never manage memberships, tenant_id or created_by.
create table public.companies (
  id uuid primary key,
  name text not null
);
create table public.memberships (
  company_id uuid not null references public.companies(id),
  user_id uuid not null references auth.users(id),
  permission text not null check (permission in ('viewer', 'editor')),
  primary key (company_id, user_id)
);
create index memberships_user_company on public.memberships(user_id, company_id);
create table public.documents (
  id uuid primary key,
  company_id uuid not null references public.companies(id),
  created_by uuid not null references auth.users(id) default auth.uid(),
  title text not null
);
create index documents_company on public.documents(company_id);
alter table public.companies enable row level security;
alter table public.memberships enable row level security;
alter table public.documents enable row level security;
revoke all on public.companies, public.memberships, public.documents from public, anon, authenticated;
grant select on public.companies, public.memberships, public.documents to authenticated;
grant insert (id, company_id, created_by, title), update (title), delete on public.documents to authenticated;
-- No INSERT/UPDATE/DELETE grants or policies on memberships for clients.
create policy membership_read on public.memberships for select to authenticated
  using (user_id = (select auth.uid()));
create policy company_read on public.companies for select to authenticated
  using (exists (select 1 from public.memberships m
    where m.company_id = companies.id and m.user_id = (select auth.uid())));
create policy document_read on public.documents for select to authenticated
  using (exists (select 1 from public.memberships m
    where m.company_id = documents.company_id and m.user_id = (select auth.uid())));
create policy document_insert on public.documents for insert to authenticated
  with check (created_by = (select auth.uid()) and exists (
    select 1 from public.memberships m where m.company_id = documents.company_id
      and m.user_id = (select auth.uid()) and m.permission = 'editor'));
create policy document_update on public.documents for update to authenticated
  using (exists (select 1 from public.memberships m
    where m.company_id = documents.company_id and m.user_id = (select auth.uid()) and m.permission = 'editor'))
  with check (exists (select 1 from public.memberships m
    where m.company_id = documents.company_id and m.user_id = (select auth.uid()) and m.permission = 'editor'));
create policy document_delete on public.documents for delete to authenticated
  using (exists (select 1 from public.memberships m
    where m.company_id = documents.company_id and m.user_id = (select auth.uid()) and m.permission = 'editor'));
-- WITH CHECK checks destination authorization, not equality to the OLD row.
-- Column grants above prevent transfers even for an editor of BOTH companies.
