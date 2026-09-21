-- ===========================================================================
-- ESC — ESQUEMA DA NUVEM (Supabase / PostgreSQL)
-- ===========================================================================
-- Cole este arquivo INTEIRO no SQL Editor do Supabase e clique em "Run".
-- Ele pode ser rodado mais de uma vez sem estragar nada (tudo é
-- "create if not exists" / "create or replace" / "drop policy if exists").
--
-- O QUE MORA AQUI: o estudo de cada pessoa — respostas, repetição espaçada,
-- favoritos, cartões pessoais, sessões, notas de simulado e o cadastro
-- (perfil). O CONTEÚDO (questões e flashcards da equipe) NÃO mora aqui: ele
-- é igual para todo mundo e continua vindo da pasta "dados/", ao lado do
-- index.html. Não faz sentido guardar uma cópia por aluno no banco.
--
-- A REGRA DE OURO DA SEGURANÇA: a chave anônima que fica no index.html é
-- pública de propósito — qualquer pessoa que abrir o site a enxerga. Quem
-- protege os dados é o Row Level Security (RLS) definido aqui embaixo, que
-- amarra cada linha ao dono dela. Por isso NENHUMA tabela pode ficar sem
-- RLS ligado, e a chave "service_role" do Supabase NUNCA entra no site.
--
-- Nomes de tabela e de coluna têm de bater exatamente com NUVEM_TABELAS,
-- no index.html (procure por "NUVEM_TABELAS"). Se mudar um, mude o outro.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- 0. AJUDANTES
-- ---------------------------------------------------------------------------

-- Carimba a hora do servidor em toda gravação. A sincronização usa essa
-- coluna como marca d'água ("até onde já baixei"), e ela precisa ser o
-- relógio DO SERVIDOR: relógio adiantado num celular faria o aparelho pular
-- registros que nunca mais desceriam.
create or replace function public.carimbar_atualizado_em()
returns trigger
language plpgsql
as $$
begin
  new.atualizado_em := now();
  return new;
end;
$$;

-- "É da equipe?" — professor ou administrador. Precisa ser SECURITY DEFINER
-- para poder ler a tabela perfis por dentro das próprias políticas dela sem
-- cair em recursão infinita.
create or replace function public.e_equipe()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.perfis p
    where p.id = auth.uid()
      and p.papel in ('professor', 'admin')
      and p.status = 'aprovado'
  );
$$;

-- ---------------------------------------------------------------------------
-- 1. PERFIS — o cadastro de cada pessoa
-- ---------------------------------------------------------------------------
-- A conta em si (e-mail e senha com hash) fica em auth.users, do próprio
-- Supabase. Aqui ficam só os dados da plataforma. O papel e o status são
-- decididos pela coordenação, nunca pela pessoa — ver o gatilho de proteção
-- mais abaixo.
create table if not exists public.perfis (
  id                    uuid primary key references auth.users(id) on delete cascade,
  nome                  text        not null default '',
  email                 text,
  matricula             text                 default '',
  papel                 text        not null default 'aluno'
                          check (papel in ('aluno', 'residente', 'professor', 'admin')),
  status                text        not null default 'pendente'
                          check (status in ('pendente', 'aprovado', 'rejeitado', 'inativo')),
  nivel_admin           text        check (nivel_admin in ('master', 'coordenacao', 'moderador')),
  ano_faculdade         text,
  bloco_atual_id        text,
  grupo_id              text,
  meta_questoes_dia     integer,
  meta_cartoes_dia      integer,
  lembrete_meta_ativo   boolean     not null default false,
  lembrete_meta_horario text,
  criado_em             timestamptz not null default now(),
  atualizado_em         timestamptz not null default now()
);
create index if not exists perfis_status_idx on public.perfis (status, criado_em);

-- ---------------------------------------------------------------------------
-- 2. RESPOSTAS — o log de cada questão respondida (REGISTRO: só se acumula)
-- ---------------------------------------------------------------------------
create table if not exists public.respostas (
  id                    text        primary key,
  usuario_id            uuid        not null references auth.users(id) on delete cascade,
  questao_id            text        not null,
  area_id               text,
  especialidade_id      text,
  assunto_id            text,
  alternativa_escolhida text,
  correta               boolean     not null default false,
  confianca             text,
  data                  date,
  tempo_seg             integer,
  sessao_id             text,
  criado_em             timestamptz not null default now()
);
create index if not exists respostas_sync_idx on public.respostas (usuario_id, criado_em);

-- ---------------------------------------------------------------------------
-- 3. REVISOES — repetição espaçada das questões (ESTADO: vale a mais recente)
-- ---------------------------------------------------------------------------
create table if not exists public.revisoes (
  usuario_id       uuid        not null references auth.users(id) on delete cascade,
  questao_id       text        not null,
  repeticoes       integer     not null default 0,
  fator            real        not null default 2.5,
  intervalo        integer     not null default 1,
  proxima_revisao  date,
  ultima_data      date,
  ultima_correta   boolean,
  ultima_confianca text,
  atualizado_em    timestamptz not null default now(),
  primary key (usuario_id, questao_id)
);
create index if not exists revisoes_sync_idx on public.revisoes (usuario_id, atualizado_em);

-- ---------------------------------------------------------------------------
-- 4. REVISOES_FLASHCARDS — repetição espaçada dos cartões (ESTADO)
-- ---------------------------------------------------------------------------
create table if not exists public.revisoes_flashcards (
  usuario_id      uuid        not null references auth.users(id) on delete cascade,
  cartao_id       text        not null,
  repeticoes      integer     not null default 0,
  fator           real        not null default 2.5,
  intervalo       integer     not null default 1,
  vistas          integer     not null default 0,
  proxima_revisao date,
  ultima_data     date,
  ultima_nota     text,
  atualizado_em   timestamptz not null default now(),
  primary key (usuario_id, cartao_id)
);
create index if not exists revisoes_flashcards_sync_idx on public.revisoes_flashcards (usuario_id, atualizado_em);

-- ---------------------------------------------------------------------------
-- 5. DIAS_CARTOES — em que dias a pessoa revisou cartões (REGISTRO)
-- ---------------------------------------------------------------------------
-- É o que sustenta a sequência ("X dias seguidos"). Um dia só entra uma vez.
create table if not exists public.dias_cartoes (
  usuario_id uuid        not null references auth.users(id) on delete cascade,
  dia        date        not null,
  criado_em  timestamptz not null default now(),
  primary key (usuario_id, dia)
);
create index if not exists dias_cartoes_sync_idx on public.dias_cartoes (usuario_id, criado_em);

-- ---------------------------------------------------------------------------
-- 6. FAVORITOS — questões marcadas com estrela (ESTADO)
-- ---------------------------------------------------------------------------
-- Desmarcar não apaga a linha: marca removido = true. Assim o "desmarquei no
-- celular" também chega ao computador — uma linha apagada não tem como ser
-- sincronizada.
create table if not exists public.favoritos (
  usuario_id    uuid        not null references auth.users(id) on delete cascade,
  questao_id    text        not null,
  data          date,
  removido      boolean     not null default false,
  atualizado_em timestamptz not null default now(),
  primary key (usuario_id, questao_id)
);
create index if not exists favoritos_sync_idx on public.favoritos (usuario_id, atualizado_em);

-- ---------------------------------------------------------------------------
-- 7. FLASHCARDS_PESSOAIS — o caderno de cartões de cada aluno (ESTADO)
-- ---------------------------------------------------------------------------
-- Só os cartões PESSOAIS. Os 501 cartões da equipe são conteúdo e continuam
-- em dados/flashcards-equipe.js.
create table if not exists public.flashcards_pessoais (
  id                text        primary key,
  usuario_id        uuid        not null references auth.users(id) on delete cascade,
  assunto_id        text,
  frente            text        not null default '',
  verso             text        not null default '',
  imagem_url        text,
  imagem_legenda    text,
  questao_origem_id text,
  origem            text        not null default 'aluno',
  status            text        not null default 'ativo',
  removido          boolean     not null default false,
  criado_em         date,                 -- data escrita pelo app (AAAA-MM-DD)
  atualizado_em     timestamptz not null default now()
);
create index if not exists flashcards_pessoais_sync_idx on public.flashcards_pessoais (usuario_id, atualizado_em);

-- ---------------------------------------------------------------------------
-- 8. SESSOES — conjuntos de questões concluídos (REGISTRO)
-- ---------------------------------------------------------------------------
create table if not exists public.sessoes (
  id         text        primary key,
  usuario_id uuid        not null references auth.users(id) on delete cascade,
  tipo       text,
  data       date,
  total      integer     not null default 0,
  acertos    integer     not null default 0,
  itens      jsonb       not null default '[]'::jsonb,
  criado_em  timestamptz not null default now()
);
create index if not exists sessoes_sync_idx on public.sessoes (usuario_id, criado_em);

-- ---------------------------------------------------------------------------
-- 9. RESULTADOS_SIMULADOS — a nota de cada simulado (REGISTRO)
-- ---------------------------------------------------------------------------
create table if not exists public.resultados_simulados (
  id              text        primary key,
  usuario_id      uuid        not null references auth.users(id) on delete cascade,
  simulado_id     text,
  titulo          text,
  nota            real,
  acertos         integer     not null default 0,
  total           integer     not null default 0,
  data            date,
  itens           jsonb       not null default '[]'::jsonb,
  respostas       jsonb       not null default '{}'::jsonb,
  tempos          jsonb       not null default '{}'::jsonb,
  tempo_total_seg integer,
  criado_em       timestamptz not null default now()
);
create index if not exists resultados_simulados_sync_idx on public.resultados_simulados (usuario_id, criado_em);

-- ---------------------------------------------------------------------------
-- 10. SESSAO_EM_ANDAMENTO — a fila não terminada, para retomar em outro aparelho
-- ---------------------------------------------------------------------------
-- Uma linha por pessoa. dados = null significa "não há nada em andamento".
create table if not exists public.sessao_em_andamento (
  usuario_id    uuid        primary key references auth.users(id) on delete cascade,
  dados         jsonb,
  atualizado_em timestamptz not null default now()
);
create index if not exists sessao_em_andamento_sync_idx on public.sessao_em_andamento (usuario_id, atualizado_em);

-- ---------------------------------------------------------------------------
-- 11. O CARIMBO DE HORA EM TODAS AS TABELAS DE ESTADO
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'perfis', 'revisoes', 'revisoes_flashcards', 'favoritos',
    'flashcards_pessoais', 'sessao_em_andamento'
  ] loop
    execute format('drop trigger if exists carimbo_%1$s on public.%1$I', t);
    execute format(
      'create trigger carimbo_%1$s before insert or update on public.%1$I
       for each row execute function public.carimbar_atualizado_em()', t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- 12. CADASTRO NOVO: a conta nasce com um perfil pendente
-- ---------------------------------------------------------------------------
-- A tela de cadastro do site cria a conta em auth.users e manda junto o nome,
-- a matrícula e o ano da faculdade. Este gatilho transforma isso num perfil.
-- Todo mundo entra como "aluno" e "pendente": quem libera é a coordenação,
-- pela tela Aprovar Cadastros.
create or replace function public.criar_perfil_para_conta_nova()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.perfis (id, nome, email, matricula, ano_faculdade, papel, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nome', ''),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'matricula', ''),
    nullif(new.raw_user_meta_data ->> 'ano_faculdade', ''),
    'aluno',
    'pendente'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists ao_criar_conta on auth.users;
create trigger ao_criar_conta
  after insert on auth.users
  for each row execute function public.criar_perfil_para_conta_nova();

-- ---------------------------------------------------------------------------
-- 13. NINGUÉM SE PROMOVE SOZINHO
-- ---------------------------------------------------------------------------
-- O app só manda nome, matrícula, ano e preferências quando salva o próprio
-- perfil — mas a chave anônima é pública, e alguém poderia montar uma chamada
-- à mão tentando escrever papel = 'admin'. Este gatilho é quem impede: papel,
-- status e nível de administrador só mudam pela mão de professor ou
-- administrador. Para quem não é da equipe, o valor antigo volta em silêncio,
-- sem derrubar a sincronização do resto.
create or replace function public.proteger_papel_e_status()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  -- auth.uid() nulo = não é chamada do site logado; é o SQL Editor do painel
  -- (ou a chave service_role, que nunca sai do servidor). Aí passa direto —
  -- é assim que se promove o primeiro administrador, no passo 16.
  if auth.uid() is null or public.e_equipe() then
    return new;
  end if;
  if tg_op = 'INSERT' then
    new.papel       := 'aluno';
    new.status      := 'pendente';
    new.nivel_admin := null;
  else
    new.papel       := old.papel;
    new.status      := old.status;
    new.nivel_admin := old.nivel_admin;
    new.email       := old.email;   -- o e-mail é o de auth.users, não se edita aqui
  end if;
  return new;
end;
$$;

drop trigger if exists proteger_perfil on public.perfis;
create trigger proteger_perfil
  before insert or update on public.perfis
  for each row execute function public.proteger_papel_e_status();

-- ---------------------------------------------------------------------------
-- 14. ROW LEVEL SECURITY — cada um enxerga o seu
-- ---------------------------------------------------------------------------
-- Ligar o RLS sem criar política nenhuma tranca a tabela inteira; as
-- políticas abaixo abrem exatamente o necessário. Sem esta seção, a chave
-- pública do site daria a qualquer visitante acesso a tudo.

alter table public.perfis               enable row level security;
alter table public.respostas            enable row level security;
alter table public.revisoes             enable row level security;
alter table public.revisoes_flashcards  enable row level security;
alter table public.dias_cartoes         enable row level security;
alter table public.favoritos            enable row level security;
alter table public.flashcards_pessoais  enable row level security;
alter table public.sessoes              enable row level security;
alter table public.resultados_simulados enable row level security;
alter table public.sessao_em_andamento  enable row level security;

-- PERFIS: a pessoa vê e edita o próprio; professor e administrador veem e
-- editam qualquer um (é assim que a tela Aprovar Cadastros funciona sem
-- ninguém precisar abrir o painel do Supabase).
drop policy if exists perfis_ler     on public.perfis;
drop policy if exists perfis_criar   on public.perfis;
drop policy if exists perfis_alterar on public.perfis;

create policy perfis_ler on public.perfis
  for select to authenticated
  using (id = auth.uid() or public.e_equipe());

create policy perfis_criar on public.perfis
  for insert to authenticated
  with check (id = auth.uid());

create policy perfis_alterar on public.perfis
  for update to authenticated
  using (id = auth.uid() or public.e_equipe())
  with check (id = auth.uid() or public.e_equipe());

-- AS DEMAIS TABELAS: são o estudo de uma pessoa só. Ler, criar e alterar
-- apenas as próprias linhas. Ninguém apaga nada (o app marca "removido" em
-- vez de apagar, para a remoção também conseguir viajar entre aparelhos).
do $$
declare t text;
begin
  foreach t in array array[
    'respostas', 'revisoes', 'revisoes_flashcards', 'dias_cartoes',
    'favoritos', 'flashcards_pessoais', 'sessoes', 'resultados_simulados',
    'sessao_em_andamento'
  ] loop
    execute format('drop policy if exists %1$s_ler     on public.%1$I', t);
    execute format('drop policy if exists %1$s_criar   on public.%1$I', t);
    execute format('drop policy if exists %1$s_alterar on public.%1$I', t);

    execute format(
      'create policy %1$s_ler on public.%1$I
         for select to authenticated using (usuario_id = auth.uid())', t);
    execute format(
      'create policy %1$s_criar on public.%1$I
         for insert to authenticated with check (usuario_id = auth.uid())', t);
    execute format(
      'create policy %1$s_alterar on public.%1$I
         for update to authenticated
         using (usuario_id = auth.uid()) with check (usuario_id = auth.uid())', t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- 15. PERMISSÕES DE TABELA
-- ---------------------------------------------------------------------------
-- O RLS filtra linha a linha; o GRANT diz quem pode sequer tentar. Quem está
-- logado (authenticated) pode ler e escrever — dentro do que o RLS permitir.
-- Quem não entrou (anon) não recebe nada: o site só conversa com o banco
-- depois do login.
grant usage on schema public to authenticated;
grant select, insert, update on all tables in schema public to authenticated;

-- Visitante sem login (anon) não fala com estas tabelas de jeito nenhum. As
-- políticas acima já só valem para "authenticated", mas o Supabase costuma
-- dar permissão a anon em tabela nova por padrão — aqui ela é retirada, para
-- a tranca não depender de uma configuração de fábrica.
do $$
declare t text;
begin
  foreach t in array array[
    'perfis', 'respostas', 'revisoes', 'revisoes_flashcards', 'dias_cartoes',
    'favoritos', 'flashcards_pessoais', 'sessoes', 'resultados_simulados',
    'sessao_em_andamento'
  ] loop
    execute format('revoke all on public.%1$I from anon', t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- 16. DEPOIS DE RODAR: promova a si mesmo a administrador
-- ---------------------------------------------------------------------------
-- Crie a sua conta pela tela de cadastro do site e, de volta aqui, rode as
-- duas linhas abaixo trocando o e-mail. Sem isso ninguém consegue aprovar o
-- primeiro cadastro — inclusive o seu.
--
--   update public.perfis
--      set papel = 'admin', nivel_admin = 'master', status = 'aprovado'
--    where email = 'voce@exemplo.com';
--
-- Confira depois com:
--
--   select nome, email, papel, nivel_admin, status from public.perfis;
-- ===========================================================================
