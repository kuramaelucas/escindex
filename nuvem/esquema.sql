-- ============================================================================
-- Esc — esquema da nuvem (Supabase / PostgreSQL)
-- Etapa 1: contas de verdade + progresso do aluno em vários aparelhos
-- ============================================================================
-- Cole este arquivo inteiro no SQL Editor do Supabase e mande executar. Ele
-- pode ser executado mais de uma vez sem estragar nada (tudo é "if not
-- exists" / "or replace").
--
-- O QUE ELE CRIA
--   perfis                 o cadastro de cada pessoa (nome, papel, status)
--   respostas              cada questão respondida (o registro que não pode se perder)
--   revisoes               a repetição espaçada de cada questão
--   revisoes_flashcards    a repetição espaçada de cada cartão
--   dias_cartoes           os dias em que a pessoa revisou cartão (a "sequência")
--   favoritos              as questões favoritadas
--   flashcards_pessoais    os cartões que o próprio aluno escreveu
--   sessoes                o histórico de conjuntos de questões concluídos
--   resultados_simulados   as notas de simulado
--   sessao_em_andamento    a fila inacabada, para retomar em outro aparelho
--
-- O QUE ELE *NÃO* CRIA (continua vindo da pasta dados/ e do código):
--   questões, taxonomia, flashcards da equipe, blocos, simulados montados
--   pelo professor. Isso é conteúdo, é igual para todo mundo e não muda por
--   aluno — não faz sentido ocupar banco de dados com uma cópia por pessoa.
--
-- SEGURANÇA
--   Todas as tabelas ligam Row Level Security: no servidor, cada pessoa só
--   enxerga e só escreve as próprias linhas. Isso vale mesmo que alguém abra
--   o console do navegador — a regra não está na tela, está no banco.
-- ============================================================================

-- ---------------------------------------------------------------- utilidades
create or replace function public.tocar_atualizado_em()
returns trigger language plpgsql as $$
begin
  new.atualizado_em = now();
  return new;
end $$;

-- ------------------------------------------------------------------- perfis
-- O login e a senha ficam com o Supabase (tabela auth.users, senha com hash).
-- Aqui fica só o que o app precisa saber sobre a pessoa.
create table if not exists public.perfis (
  id                uuid primary key references auth.users(id) on delete cascade,
  email             text not null default '',
  nome              text not null default '',
  matricula         text not null default '',
  papel             text not null default 'aluno',     -- aluno | residente | professor | admin
  nivel_admin       text,                              -- master | coordenacao | moderador
  status            text not null default 'pendente',  -- pendente | aprovado | rejeitado | inativo
  ano_faculdade     text,
  bloco_atual_id    text,
  grupo_id          text,
  meta_questoes_dia integer,
  meta_cartoes_dia  integer,
  lembrete_meta_ativo    boolean not null default false,
  lembrete_meta_horario  text,
  criado_em         timestamptz not null default now(),
  atualizado_em     timestamptz not null default now()
);

-- Quem é da equipe (professor ou admin aprovado). É "security definer" de
-- propósito: precisa ler perfis sem passar pela própria regra de acesso,
-- senão a regra chamaria a si mesma sem fim.
create or replace function public.e_equipe()
returns boolean language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from public.perfis p
    where p.id = auth.uid()
      and p.papel in ('professor','admin')
      and p.status = 'aprovado'
  );
$$;

-- Ao criar a conta, o perfil nasce junto, com o que foi digitado no cadastro.
-- Nasce sempre como ALUNO PENDENTE: promover a professor/admin ou aprovar o
-- cadastro é ato de quem já é da equipe (ver política mais abaixo) — ninguém
-- se promove sozinho mexendo no navegador.
create or replace function public.criar_perfil_no_cadastro()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.perfis (id, email, nome, matricula, ano_faculdade)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'nome', ''),
    coalesce(new.raw_user_meta_data->>'matricula', ''),
    nullif(new.raw_user_meta_data->>'ano_faculdade', '')
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists ao_criar_usuario on auth.users;
create trigger ao_criar_usuario
  after insert on auth.users
  for each row execute function public.criar_perfil_no_cadastro();

-- Trava de promoção: papel, nível e status só mudam por quem é da equipe.
-- Sem isto, um aluno poderia se tornar administrador com uma linha no
-- console do navegador — a política de UPDATE sozinha não protege coluna.
create or replace function public.travar_campos_de_equipe()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  -- auth.uid() nulo = a mudança NÃO veio de alguém logado pelo site: veio do
  -- SQL Editor do Supabase ou de uma chave de servidor, que por definição já
  -- têm acesso total. É esse caso que permite o comando de emergência do
  -- LEIA-ME, o que promove você a administrador máster na instalação. Como
  -- o papel "anon" não tem permissão de UPDATE nestas tabelas (ver os GRANTs
  -- no fim deste arquivo), não existe caminho anônimo por aqui.
  if auth.uid() is not null and not public.e_equipe() then
    new.papel       = old.papel;
    new.nivel_admin = old.nivel_admin;
    new.status      = old.status;
  end if;
  return new;
end $$;

drop trigger if exists ao_atualizar_perfil on public.perfis;
create trigger ao_atualizar_perfil
  before update on public.perfis
  for each row execute function public.travar_campos_de_equipe();

drop trigger if exists perfis_atualizado_em on public.perfis;
create trigger perfis_atualizado_em before update on public.perfis
  for each row execute function public.tocar_atualizado_em();

alter table public.perfis enable row level security;

drop policy if exists "perfil: ler o meu (equipe lê todos)" on public.perfis;
create policy "perfil: ler o meu (equipe lê todos)" on public.perfis
  for select using (id = auth.uid() or public.e_equipe());

drop policy if exists "perfil: atualizar o meu (equipe atualiza todos)" on public.perfis;
create policy "perfil: atualizar o meu (equipe atualiza todos)" on public.perfis
  for update using (id = auth.uid() or public.e_equipe());

-- ------------------------------------------------------- progresso do aluno
-- Todas as tabelas abaixo guardam o id gerado no navegador como chave, para
-- que o mesmo registro enviado duas vezes (por causa de uma reconexão) não
-- vire dois.

create table if not exists public.respostas (
  id                    text primary key,
  usuario_id            uuid not null references auth.users(id) on delete cascade,
  questao_id            text not null,
  area_id               text,
  especialidade_id      text,
  assunto_id            text,
  alternativa_escolhida text,
  correta               boolean,
  confianca             text,
  tempo_seg             integer,
  sessao_id             text,
  data                  date not null,
  criado_em             timestamptz not null default now()
);
create index if not exists respostas_por_usuario on public.respostas (usuario_id, criado_em);

create table if not exists public.revisoes (
  usuario_id       uuid not null references auth.users(id) on delete cascade,
  questao_id       text not null,
  repeticoes       integer,
  fator            real,
  intervalo        integer,
  proxima_revisao  date,
  ultima_data      date,
  ultima_correta   boolean,
  ultima_confianca text,
  atualizado_em    timestamptz not null default now(),
  primary key (usuario_id, questao_id)
);
create index if not exists revisoes_por_tempo on public.revisoes (usuario_id, atualizado_em);

create table if not exists public.revisoes_flashcards (
  usuario_id      uuid not null references auth.users(id) on delete cascade,
  cartao_id       text not null,
  repeticoes      integer,
  fator           real,
  intervalo       integer,
  vistas          integer,
  proxima_revisao date,
  ultima_data     date,
  ultima_nota     text,
  atualizado_em   timestamptz not null default now(),
  primary key (usuario_id, cartao_id)
);
create index if not exists revisoes_cartoes_por_tempo on public.revisoes_flashcards (usuario_id, atualizado_em);

create table if not exists public.dias_cartoes (
  usuario_id uuid not null references auth.users(id) on delete cascade,
  dia        date not null,
  criado_em  timestamptz not null default now(),
  primary key (usuario_id, dia)
);

-- Favorito removido vira linha com removido = true, não sumiço: é assim que
-- o aparelho que estava offline descobre que a pessoa desfavoritou lá.
create table if not exists public.favoritos (
  usuario_id    uuid not null references auth.users(id) on delete cascade,
  questao_id    text not null,
  data          date,
  removido      boolean not null default false,
  atualizado_em timestamptz not null default now(),
  primary key (usuario_id, questao_id)
);
create index if not exists favoritos_por_tempo on public.favoritos (usuario_id, atualizado_em);

create table if not exists public.flashcards_pessoais (
  id                text primary key,
  usuario_id        uuid not null references auth.users(id) on delete cascade,
  assunto_id        text,
  frente            text not null,
  verso             text not null,
  imagem_url        text,
  imagem_legenda    text,
  questao_origem_id text,
  origem            text,
  status            text not null default 'ativo',
  removido          boolean not null default false,
  criado_em         date,
  atualizado_em     timestamptz not null default now()
);
create index if not exists cartoes_pessoais_por_tempo on public.flashcards_pessoais (usuario_id, atualizado_em);

create table if not exists public.sessoes (
  id         text primary key,
  usuario_id uuid not null references auth.users(id) on delete cascade,
  tipo       text,
  data       date,
  total      integer,
  acertos    integer,
  itens      jsonb,
  criado_em  timestamptz not null default now()
);
create index if not exists sessoes_por_usuario on public.sessoes (usuario_id, criado_em);

create table if not exists public.resultados_simulados (
  id              text primary key,
  usuario_id      uuid not null references auth.users(id) on delete cascade,
  simulado_id     text,
  titulo          text,
  nota            real,
  acertos         integer,
  total           integer,
  data            date,
  itens           jsonb,
  respostas       jsonb,
  tempos          jsonb,
  tempo_total_seg integer,
  criado_em       timestamptz not null default now()
);
create index if not exists resultados_por_usuario on public.resultados_simulados (usuario_id, criado_em);

-- A fila de questões inacabada: uma linha por pessoa, sempre a mais recente.
-- É o que faz "continuar de onde parei" atravessar de um aparelho para outro.
create table if not exists public.sessao_em_andamento (
  usuario_id    uuid primary key references auth.users(id) on delete cascade,
  dados         jsonb,
  atualizado_em timestamptz not null default now()
);

-- ------------------------------------------------- regras de acesso (RLS)
-- A mesma regra para todas as tabelas de progresso: cada pessoa, só as
-- próprias linhas — para ler, inserir, atualizar e apagar.
do $$
declare t text;
begin
  foreach t in array array[
    'respostas','revisoes','revisoes_flashcards','dias_cartoes','favoritos',
    'flashcards_pessoais','sessoes','resultados_simulados','sessao_em_andamento'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "só as minhas linhas" on public.%I', t);
    execute format(
      'create policy "só as minhas linhas" on public.%I
         for all using (usuario_id = auth.uid()) with check (usuario_id = auth.uid())', t);
  end loop;
end $$;

-- ----------------------------------------------- permissão de tabela (GRANT)
-- O RLS decide QUAIS LINHAS cada pessoa enxerga; o GRANT decide se o papel
-- tem acesso à tabela. O Supabase costuma já conceder isso por padrão às
-- tabelas novas de "public", mas declarar aqui evita depender disso — e
-- tiramos o papel "anon" (visitante sem login) de todas elas, porque nada
-- nestas tabelas deve ser lido sem uma conta.
do $$
declare t text;
begin
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then
    raise notice 'Papéis do Supabase não encontrados — pulei os GRANTs (normal fora do Supabase).';
    return;
  end if;
  foreach t in array array[
    'perfis','respostas','revisoes','revisoes_flashcards','dias_cartoes','favoritos',
    'flashcards_pessoais','sessoes','resultados_simulados','sessao_em_andamento'
  ] loop
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('revoke all on public.%I from anon', t);
  end loop;
end $$;

-- Mantém atualizado_em correto nas tabelas que o usam para sincronizar.
do $$
declare t text;
begin
  foreach t in array array[
    'revisoes','revisoes_flashcards','favoritos','flashcards_pessoais','sessao_em_andamento'
  ] loop
    execute format('drop trigger if exists %I_atualizado_em on public.%I', t, t);
    execute format(
      'create trigger %I_atualizado_em before update on public.%I
         for each row execute function public.tocar_atualizado_em()', t, t);
  end loop;
end $$;

-- ============================================================================
-- DEPOIS DE EXECUTAR ISTO
--
-- 1. Crie a sua conta pelo próprio site (tela "Criar conta").
-- 2. Volte aqui e promova você a administrador máster aprovado, trocando o
--    e-mail abaixo pelo seu:
--
--      update public.perfis set papel = 'admin', nivel_admin = 'master',
--             status = 'aprovado'
--       where id = (select id from auth.users where email = 'voce@exemplo.com');
--
-- 3. A partir daí, os cadastros da turma são aprovados pela própria
--    plataforma, sem voltar ao SQL.
-- ============================================================================
