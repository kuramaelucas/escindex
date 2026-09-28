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
-- O Storage (arquivos): o balde e os objetos, com o RLS ligado como no
-- Supabase, e storage.foldername(), que parte o caminho em pastas.
create schema storage;
create table storage.buckets (
  id text primary key, name text, public boolean default false,
  file_size_limit bigint, allowed_mime_types text[]
);
create table storage.objects (
  id uuid primary key default gen_random_uuid(), bucket_id text references storage.buckets(id),
  name text, owner uuid default auth.uid(), created_at timestamptz default now()
);
alter table storage.objects enable row level security;
create function storage.foldername(name text) returns text[] language sql immutable
  as $$ select (string_to_array(name, '/'))[1:array_length(string_to_array(name, '/'), 1) - 1] $$;
grant usage on schema storage to authenticated, anon;
grant select, insert on storage.objects to authenticated;
grant select on storage.buckets to authenticated, anon;
