-- O mínimo do Supabase para o nuvem/esquema.sql rodar num PostgreSQL comum:
-- os papéis anon/authenticated, a tabela auth.users e auth.uid(), que aqui
-- lê o "usuário logado" de uma variável de sessão (request.jwt.claim.sub),
-- como o PostgREST faz de verdade.
do $$ begin create role anon nologin; exception when duplicate_object then null; end $$;
do $$ begin create role authenticated nologin; exception when duplicate_object then null; end $$;
create schema auth;
create table auth.users (
  id uuid primary key default gen_random_uuid(), email text,
  raw_user_meta_data jsonb default '{}'::jsonb, created_at timestamptz default now(),
  email_confirmed_at timestamptz, last_sign_in_at timestamptz
);
create function auth.uid() returns uuid language sql stable
  as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
grant usage on schema auth to authenticated, anon;
grant execute on function auth.uid() to authenticated, anon;
grant usage on schema public to anon;
