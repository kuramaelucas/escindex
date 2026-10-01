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
-- index.html. Não faz sentido guardar uma cópia por aluno no banco. A
-- exceção são as questões ENVIADAS pela plataforma (seção 11-E), que
-- esperam aqui a aprovação da equipe e daqui descem para a turma.
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

-- Num banco NOVO, as funções-ajudantes abaixo (e_equipe, e_revisor) são
-- criadas antes da tabela "perfis" que elas consultam. Sem esta linha o
-- PostgreSQL confere o corpo delas na hora e recusa ("relation perfis does
-- not exist") — o arquivo só rodava num banco que já tinha as tabelas.
-- É a mesma linha que o próprio pg_dump põe no começo dos backups.
set check_function_bodies = false;

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

-- "Revisa conteúdo?" — a equipe mais os residentes, que também entram em
-- Revisar Formatação. Mesma construção de e_equipe().
create or replace function public.e_revisor()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.perfis p
    where p.id = auth.uid()
      and p.papel in ('professor', 'admin', 'residente')
      and p.status = 'aprovado'
  );
$$;

-- "É administrador?" — só o papel admin (qualquer nível). É quem lê o
-- feedback da plataforma (Feedback dos Usuários, seção 11-G).
create or replace function public.e_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.perfis p
    where p.id = auth.uid()
      and p.papel = 'admin'
      and p.status = 'aprovado'
  );
$$;

-- "Está liberado?" — qualquer conta aprovada pela coordenação, de qualquer
-- papel. É quem pode enviar questão e imagem para a turma.
create or replace function public.e_aprovado()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.perfis p
    where p.id = auth.uid()
      and p.status = 'aprovado'
  );
$$;

-- "É do grupo?" — a pessoa tem linha aprovada em grupo_membros, ou é a dona
-- do grupo. Mesma construção das outras (SECURITY DEFINER para ler as tabelas
-- por dentro das próprias políticas sem recursão).
create or replace function public.e_do_grupo(gid text)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
           select 1 from public.grupo_membros m
            where m.grupo_id = gid and m.usuario_id = auth.uid() and m.status = 'aprovado')
      or exists (
           select 1 from public.grupos g
            where g.id = gid and g.criado_por = auth.uid());
$$;

-- "É a dona do grupo?" — quem aprova os pedidos de entrada.
create or replace function public.e_dono_do_grupo(gid text)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (select 1 from public.grupos g where g.id = gid and g.criado_por = auth.uid());
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
-- quando a pessoa passou pela tela de primeiro acesso (boas-vindas, grupo e
-- meta) — para a tela não reaparecer em outro aparelho. Para quem já rodou
-- este arquivo antes desta coluna existir:
alter table public.perfis add column if not exists boas_vindas_em date;
-- a ordem que a própria pessoa deu aos estágios de cada período do 6º ano
-- (Meu Grupo > Meus estágios): {"b6-pediatria": ["Enfermaria de Pediatria", ...]}.
-- Só muda a ordem para ela; o grupo do rodízio continua o mesmo.
alter table public.perfis add column if not exists ordem_estagios jsonb not null default '{}'::jsonb;
-- os avisos da coordenação (seção 11-I) que a pessoa já leu, para o aviso não
-- voltar a aparecer em outro aparelho: lista de ids.
alter table public.perfis add column if not exists avisos_lidos jsonb not null default '[]'::jsonb;
-- o segundo grupo da pessoa, só para compartilhar questões (Meu Grupo): o
-- grupo do calendário continua em grupo_id.
alter table public.perfis add column if not exists grupo_questoes_id text;

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
-- É o que sustenta a sequência ("X dias seguidos"). Um dia só entra uma vez, e
-- "quantidade" diz quantos cartões foram revisados naquele dia — é o número
-- que o Histórico de Atividade mostra ao lado das questões do dia. Ele muda
-- ao longo do dia, então esta linha é reenviada (merge) quando cresce.
create table if not exists public.dias_cartoes (
  usuario_id uuid        not null references auth.users(id) on delete cascade,
  dia        date        not null,
  quantidade integer     not null default 0,
  criado_em  timestamptz not null default now(),
  primary key (usuario_id, dia)
);
-- para quem já tinha a tabela antes de a contagem existir:
alter table public.dias_cartoes add column if not exists quantidade integer not null default 0;
create index if not exists dias_cartoes_sync_idx on public.dias_cartoes (usuario_id, criado_em);

-- ---------------------------------------------------------------------------
-- 6. FAVORITOS — questões marcadas com estrela (ESTADO)
-- ---------------------------------------------------------------------------
-- Desmarcar não apaga a linha: marca removido = true. Assim o "desmarquei no
-- celular" também chega ao computador — uma linha apagada não tem como ser
-- sincronizada.
--
-- A coluna "nota" é a anotação PESSOAL da questão salva ("não entendi por que
-- não é a C", "conferir a dose"). É privada como o resto da tabela: o RLS lá
-- embaixo amarra cada linha ao dono dela, e ninguém mais lê. Não confundir
-- com os comentários públicos da questão, que não moram na nuvem.
create table if not exists public.favoritos (
  usuario_id    uuid        not null references auth.users(id) on delete cascade,
  questao_id    text        not null,
  data          date,
  nota          text        not null default '',
  removido      boolean     not null default false,
  atualizado_em timestamptz not null default now(),
  primary key (usuario_id, questao_id)
);
-- para quem já rodou este arquivo antes de a anotação existir (o "create
-- table if not exists" acima não mexe numa tabela que já está lá):
alter table public.favoritos add column if not exists nota text not null default '';
create index if not exists favoritos_sync_idx on public.favoritos (usuario_id, atualizado_em);

-- ---------------------------------------------------------------------------
-- 6-B. FAVORITOS_CARTOES — os flashcards salvos (ESTADO)
-- ---------------------------------------------------------------------------
-- Mesma ideia da tabela acima, para os cartões. São duas tabelas e não uma
-- porque são duas coisas: "quero rever esta questão" e "quero rever este
-- conceito" — e é assim que a tela de Favoritos as separa, em duas abas.
-- O cartao_id é texto porque um cartão pode ser da equipe, pessoal ou gerado
-- na hora a partir de uma questão (id "fc-q-<id da questão>").
create table if not exists public.favoritos_cartoes (
  usuario_id    uuid        not null references auth.users(id) on delete cascade,
  cartao_id     text        not null,
  data          date,
  removido      boolean     not null default false,
  atualizado_em timestamptz not null default now(),
  primary key (usuario_id, cartao_id)
);
create index if not exists favoritos_cartoes_sync_idx on public.favoritos_cartoes (usuario_id, atualizado_em);

-- ---------------------------------------------------------------------------
-- 6-C. QUESTOES_OCULTAS — "não mostrar mais esta questão para mim" (ESTADO)
-- ---------------------------------------------------------------------------
-- A questão que a pessoa tirou do próprio estudo: não volta na sessão do dia,
-- na revisão, nas filas de erro nem nas listas montadas por filtro. Ela não
-- some do banco nem das estatísticas — é só a fila de UMA pessoa. Voltar a
-- mostrar marca "removido", como nos favoritos, para a volta também viajar
-- entre aparelhos.
create table if not exists public.questoes_ocultas (
  usuario_id    uuid        not null references auth.users(id) on delete cascade,
  questao_id    text        not null,
  data          date,
  removido      boolean     not null default false,
  atualizado_em timestamptz not null default now(),
  primary key (usuario_id, questao_id)
);
create index if not exists questoes_ocultas_sync_idx on public.questoes_ocultas (usuario_id, atualizado_em);

-- ---------------------------------------------------------------------------
-- 6-D. DESTAQUES — os trechos que a pessoa marcou em questões e cartões (ESTADO)
-- ---------------------------------------------------------------------------
-- Selecionar um trecho do enunciado, de uma alternativa, da explicação ou de
-- um cartão e marcá-lo. `alvo` diz onde ("q:<id da questão>:enunciado",
-- "q:<id>:alt-B", "q:<id>:explicacao", "c:<id do cartão>:verso") e
-- inicio/fim são posições no texto; `trecho` guarda o que foi marcado, para o
-- site achar o lugar de novo se o texto da questão mudar. Desmarcar marca
-- "removido", como nos favoritos. É de cada pessoa: ninguém vê o destaque de
-- ninguém.
create table if not exists public.destaques (
  id            text        primary key,
  usuario_id    uuid        not null references auth.users(id) on delete cascade,
  alvo          text        not null,
  inicio        integer     not null,
  fim           integer     not null,
  trecho        text        not null,
  data          date,
  removido      boolean     not null default false,
  atualizado_em timestamptz not null default now()
);
create index if not exists destaques_sync_idx on public.destaques (usuario_id, atualizado_em);

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
-- 11. CALENDARIO — a sequência de blocos de cada ano (ESTADO, mas GLOBAL)
-- ---------------------------------------------------------------------------
-- Diferente das dez tabelas acima, esta não é o estudo de uma pessoa: é o
-- calendário de blocos que Admin > Blocos de Estudo edita, e vale para toda
-- a turma de um ano, não para quem editou. Por isso a chave é o ANO, não o
-- usuário, e a regra de leitura é aberta — todo mundo que está numa conta
-- lê —, mas só professor/administrador grava. Duas pessoas editando o
-- mesmo ano ao mesmo tempo: quem salvar por último vence a sequência
-- inteira daquele ano (não há uma junção fina como nas tabelas de estudo).
create table if not exists public.calendario (
  ano            text        primary key,
  sequencia      jsonb       not null default '[]'::jsonb,
  atualizado_por uuid        references auth.users(id) on delete set null,
  atualizado_em  timestamptz not null default now()
);
create index if not exists calendario_sync_idx on public.calendario (atualizado_em);

-- ---------------------------------------------------------------------------
-- 11-B. LIVRO_OURO — os agradecimentos (GLOBAL, como o calendário)
-- ---------------------------------------------------------------------------
-- Um registro por agradecimento, o mesmo para todo mundo. Todo mundo que
-- está numa conta lê; só professor/administrador grava. O registro inteiro
-- vai em `dados` (nome, tipo, valor, descrição, mensagem, data, destaque),
-- para um campo novo no formulário não exigir coluna nova aqui. Remover
-- marca `removido`, para a remoção também chegar aos outros aparelhos.
create table if not exists public.livro_ouro (
  id             text        primary key,
  dados          jsonb       not null default '{}'::jsonb,
  removido       boolean     not null default false,
  atualizado_por uuid        references auth.users(id) on delete set null,
  atualizado_em  timestamptz not null default now()
);
create index if not exists livro_ouro_sync_idx on public.livro_ouro (atualizado_em);

-- ---------------------------------------------------------------------------
-- 11-C. FORMATACAO_APROVADA — questões já conferidas em Revisar Formatação
-- ---------------------------------------------------------------------------
-- Quem revisa a formatação aprova a questão, e ela sai da fila de revisão
-- de TODOS os revisores — é para isso que existe: duas pessoas não gastarem
-- tempo relendo a mesma questão. Uma linha por questão; `aprovada = false`
-- devolve a questão à fila. Todo mundo que está numa conta lê; grava quem
-- revisa (professor, administrador e residente — ver e_revisor()).
create table if not exists public.formatacao_aprovada (
  questao_id     text        primary key,
  aprovada       boolean     not null default true,
  por_nome       text        not null default '',
  atualizado_por uuid        references auth.users(id) on delete set null,
  atualizado_em  timestamptz not null default now()
);
create index if not exists formatacao_aprovada_sync_idx on public.formatacao_aprovada (atualizado_em);

-- ---------------------------------------------------------------------------
-- 11-D. COMENTARIOS — comentários e dúvidas nas questões (GLOBAL)
-- ---------------------------------------------------------------------------
-- O que alguém escreve embaixo de uma questão ("não entendi por que não é a
-- C") e a resposta de professor/residente. É o que alimenta a Fila de
-- Dúvidas: antes, cada comentário ficava no navegador de quem escreveu, e o
-- residente nunca via a dúvida do aluno. Todo mundo que está numa conta lê;
-- cada um grava o próprio comentário; só quem revisa (professor, residente,
-- administrador) grava uma "resposta oficial". O nome do autor vai junto na
-- linha (autor_nome) porque o aluno não enxerga o perfil dos outros.
-- Remover marca `removido`, para a remoção também chegar aos outros.
create table if not exists public.comentarios (
  id               text        primary key,
  questao_id       text        not null,
  usuario_id       uuid        references auth.users(id) on delete set null,
  autor_nome       text        not null default '',
  papel_autor      text,
  texto            text        not null default '',
  data             date,
  resposta_oficial boolean     not null default false,
  removido         boolean     not null default false,
  atualizado_por   uuid        references auth.users(id) on delete set null,
  atualizado_em    timestamptz not null default now()
);
create index if not exists comentarios_sync_idx on public.comentarios (atualizado_em);
create index if not exists comentarios_questao_idx on public.comentarios (questao_id);

-- ---------------------------------------------------------------------------
-- 11-E. QUESTOES_ENVIADAS — questões enviadas pela plataforma (GLOBAL)
-- ---------------------------------------------------------------------------
-- A exceção à regra do topo ("o conteúdo não mora aqui"): a questão que
-- alguém envia pela plataforma (Enviar/Importar Questões, Central de Provas,
-- Nova questão) ficava só no navegador de quem enviou, e a coordenação nunca
-- a via. Agora ela sobe para cá:
--   - aluno envia como `pendente`; só ele e a equipe enxergam;
--   - a equipe (professor/administrador) confere, corrige e aprova — e a
--     questão `aprovada` desce para todo mundo que está numa conta;
--   - residente e equipe podem publicar já `aprovada`;
--   - `recusada` volta para quem enviou com o motivo; `removida` tira de
--     circulação uma que já tinha sido aprovada (por isso todos a leem).
-- A questão inteira vai em `dados` (enunciado, alternativas, gabarito,
-- explicação, classificação, tipo de prova...). A IMAGEM não vai aqui: ela
-- sobe para o Storage (seção 11-F) e `dados` guarda só o endereço dela — um
-- ECG em texto dentro de cada linha encheria o navegador de todos os alunos.
create table if not exists public.questoes_enviadas (
  id                text        primary key,
  autor_id          uuid        references auth.users(id) on delete set null,
  autor_nome        text        not null default '',
  status            text        not null default 'pendente'
                                check (status in ('pendente', 'aprovada', 'recusada', 'removida')),
  dados             jsonb       not null default '{}'::jsonb,
  motivo            text        not null default '',
  decidido_por_nome text        not null default '',
  criado_em         timestamptz not null default now(),
  atualizado_por    uuid        references auth.users(id) on delete set null,
  atualizado_em     timestamptz not null default now()
);
create index if not exists questoes_enviadas_sync_idx on public.questoes_enviadas (atualizado_em);
create index if not exists questoes_enviadas_status_idx on public.questoes_enviadas (status);

-- ---------------------------------------------------------------------------
-- 11-F. AS IMAGENS DAS QUESTÕES (Storage do Supabase)
-- ---------------------------------------------------------------------------
-- Um "balde" público chamado `questoes`: qualquer um abre a imagem pelo
-- endereço (é assim que ela aparece no cartão da questão, como as de
-- dados/imagens/), mas só quem tem conta aprovada envia, e só para a pasta
-- com o próprio id (questoes/<id da pessoa>/<arquivo>). Até 2 MB por
-- arquivo, só imagem — o site já reduz e comprime antes de enviar.
-- Ninguém sobrescreve nem apaga pelo site: cada envio é um arquivo novo.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('questoes', 'questoes', true, 2097152, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists questoes_imagens_enviar on storage.objects;
create policy questoes_imagens_enviar on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'questoes'
    and (storage.foldername(name))[1] = auth.uid()::text
    and public.e_aprovado()
  );

-- ---------------------------------------------------------------------------
-- 11-G. FEEDBACKS — comentários, sugestões e reclamações sobre a plataforma
-- ---------------------------------------------------------------------------
-- O "Enviar feedback" do Início e o "Quero contribuir" do Livro de Ouro.
-- Antes a mensagem ficava no navegador de quem escreveu, e a coordenação —
-- que lê em Feedback dos Usuários, em outro navegador — nunca a recebia.
-- Quem escreveu vê as suas; os ADMINISTRADORES veem todas e marcam como
-- lidas (e_admin()). O nome vai na linha (autor_nome) porque o
-- administrador não tem o cadastro de todo mundo no navegador dele.
create table if not exists public.feedbacks (
  id              text        primary key,
  usuario_id      uuid        references auth.users(id) on delete set null,
  autor_nome      text        not null default '',
  papel           text,
  tipo            text        not null default 'comentario',
  texto           text        not null default '',
  data            date,
  lido            boolean     not null default false,
  lido_por_nome   text        not null default '',
  atualizado_por  uuid        references auth.users(id) on delete set null,
  atualizado_em   timestamptz not null default now()
);
create index if not exists feedbacks_sync_idx on public.feedbacks (atualizado_em);

-- ---------------------------------------------------------------------------
-- 11-H. CORRECOES_QUESTOES — consertos nas questões da pasta dados/ (GLOBAL)
-- ---------------------------------------------------------------------------
-- As questões das provas vêm da pasta dados/ e não moram aqui. Mas uma delas
-- pode precisar de conserto — a figura que faltava, um texto cortado, um
-- gabarito revisto —, feito em Questões para Atualizar. O conserto sobe
-- como UMA LINHA POR QUESTÃO com a diferença em relação à pasta: `campos`
-- (os valores novos: enunciado, alternativas, gabarito, explicação, figura,
-- status...) e `remover` (os campos a apagar — o caso típico é
-- imagemPendente, quando a figura chega). A figura em si vai para o
-- Storage (seção 11-F) e `campos` guarda só o endereço.
-- Todo mundo que está numa conta lê — é assim que a questão consertada
-- volta ao estudo da turma —; grava quem revisa (professor, administrador e
-- residente). Depois de a correção entrar na pasta dados/, ela é
-- encerrada: `removido = true`.
create table if not exists public.correcoes_questoes (
  questao_id      text        primary key,
  campos          jsonb       not null default '{}'::jsonb,
  remover         jsonb       not null default '[]'::jsonb,
  removido        boolean     not null default false,
  autor_nome      text        not null default '',
  atualizado_por  uuid        references auth.users(id) on delete set null,
  atualizado_em   timestamptz not null default now()
);
create index if not exists correcoes_questoes_sync_idx on public.correcoes_questoes (atualizado_em);

-- ---------------------------------------------------------------------------
-- 11-I. AVISOS — recados da coordenação para os usuários (GLOBAL)
-- ---------------------------------------------------------------------------
-- O painel Enviar Avisos (administração) escreve aqui; toda conta aprovada
-- lê e vê, na tela inicial, os que são para ela. `papeis` e `anos` dizem para
-- quem: lista vazia = todos. O filtro é feito pelo site — um aviso não é
-- segredo —, por isso a leitura é aberta a qualquer conta aprovada. Quem
-- grava é o administrador (e_admin()). O aviso apagado não some: fica com
-- `removido = true`, para a remoção também descer para os outros aparelhos.
-- `rota` é a tela para onde o aviso leva (opcional); `expira_em`, o último dia
-- em que ele aparece (opcional).
create table if not exists public.avisos (
  id              text        primary key,
  titulo          text        not null default '',
  texto           text        not null default '',
  rota            text,
  papeis          jsonb       not null default '[]'::jsonb,
  anos            jsonb       not null default '[]'::jsonb,
  data            date,
  expira_em       date,
  autor_nome      text        not null default '',
  removido        boolean     not null default false,
  atualizado_por  uuid        references auth.users(id) on delete set null,
  atualizado_em   timestamptz not null default now()
);
create index if not exists avisos_sync_idx on public.avisos (atualizado_em);

-- ---------------------------------------------------------------------------
-- 11-J. GRUPOS, MEMBROS, GRUPOS DE ESTUDO, QUESTÕES E CARTÕES DE GRUPO
-- ---------------------------------------------------------------------------
-- Até aqui os grupos (turmas) viviam só no navegador de quem os criou: um
-- colega em outro aparelho nunca via o grupo, os pedidos de entrada não
-- chegavam ao dono e as questões enviadas "para o meu grupo" não saíam do
-- computador de quem as enviou. Agora:
--   GRUPOS         a definição do grupo (nome, dono, calendário próprio, a
--                  divisão das questões). Toda conta aprovada lê a lista —
--                  é o que permite "pedir para entrar". Quem cria é o dono;
--                  as turmas do rodízio ('rodizio-<ano>-<n>') não têm dono e
--                  só ganham linha quando alguém divide as questões.
--   GRUPO_MEMBROS  quem está em cada grupo: pendente (pediu para entrar),
--                  aprovado, recusado ou saiu. A pessoa pede e sai por conta
--                  própria; quem aprova é o dono. Turma do rodízio é aberta:
--                  entra direto. Só os membros (e a equipe) leem a lista.
--   SUBGRUPOS      os grupos de estudo dentro de um grupo (quem participa,
--                  quais questões, quem fica com quais). Só os membros do
--                  grupo leem e mexem.
--   QUESTOES_ENVIADAS.GRUPO_ID  a questão enviada "para o meu grupo": sobe já
--                  aprovada, só os membros do grupo (e a equipe) a enxergam.
--   FLASHCARDS_ENVIADOS  os cartões que o aluno sugere à equipe (pendente,
--                  até um professor aprovar), os que a equipe publica, e os
--                  que alguém compartilha com o grupo (grupo_id).
-- Ninguém apaga linha pelo site: remover é marcar `removido` (ou o status),
-- para a remoção também chegar aos outros aparelhos.
create table if not exists public.grupos (
  id              text        primary key,
  nome            text        not null default '',
  criado_por      uuid        references auth.users(id) on delete set null,
  criado_por_nome text        not null default '',
  dados           jsonb       not null default '{}'::jsonb,
  removido        boolean     not null default false,
  criado_em       timestamptz not null default now(),
  atualizado_por  uuid        references auth.users(id) on delete set null,
  atualizado_em   timestamptz not null default now()
);
create index if not exists grupos_sync_idx on public.grupos (atualizado_em);

create table if not exists public.grupo_membros (
  grupo_id       text        not null,
  usuario_id     uuid        not null references auth.users(id) on delete cascade,
  usuario_nome   text        not null default '',
  status         text        not null default 'pendente'
                             check (status in ('pendente', 'aprovado', 'recusado', 'saiu')),
  criado_em      timestamptz not null default now(),
  atualizado_por uuid        references auth.users(id) on delete set null,
  atualizado_em  timestamptz not null default now(),
  primary key (grupo_id, usuario_id)
);
create index if not exists grupo_membros_sync_idx on public.grupo_membros (atualizado_em);
create index if not exists grupo_membros_usuario_idx on public.grupo_membros (usuario_id);

create table if not exists public.subgrupos (
  id             text        primary key,
  grupo_id       text        not null,
  nome           text        not null default '',
  criado_por     uuid        references auth.users(id) on delete set null,
  dados          jsonb       not null default '{}'::jsonb,
  removido       boolean     not null default false,
  criado_em      timestamptz not null default now(),
  atualizado_por uuid        references auth.users(id) on delete set null,
  atualizado_em  timestamptz not null default now()
);
create index if not exists subgrupos_sync_idx on public.subgrupos (atualizado_em);

-- a questão enviada para um grupo: o id do grupo. Para quem já rodou este
-- arquivo antes desta coluna existir:
alter table public.questoes_enviadas add column if not exists grupo_id text;
create index if not exists questoes_enviadas_grupo_idx on public.questoes_enviadas (grupo_id);

create table if not exists public.flashcards_enviados (
  id                text        primary key,
  autor_id          uuid        references auth.users(id) on delete set null,
  autor_nome        text        not null default '',
  grupo_id          text,
  status            text        not null default 'pendente'
                                check (status in ('pendente', 'aprovado', 'recusado', 'removido')),
  dados             jsonb       not null default '{}'::jsonb,
  motivo            text        not null default '',
  decidido_por_nome text        not null default '',
  criado_em         timestamptz not null default now(),
  atualizado_por    uuid        references auth.users(id) on delete set null,
  atualizado_em     timestamptz not null default now()
);
create index if not exists flashcards_enviados_sync_idx on public.flashcards_enviados (atualizado_em);
create index if not exists flashcards_enviados_grupo_idx on public.flashcards_enviados (grupo_id);

-- ---------------------------------------------------------------------------
-- 12. O CARIMBO DE HORA EM TODAS AS TABELAS DE ESTADO
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'perfis', 'revisoes', 'revisoes_flashcards', 'favoritos',
    'favoritos_cartoes', 'questoes_ocultas', 'destaques', 'flashcards_pessoais',
    'sessao_em_andamento', 'calendario', 'livro_ouro', 'formatacao_aprovada',
    'comentarios', 'questoes_enviadas', 'feedbacks', 'correcoes_questoes', 'avisos',
    'grupos', 'grupo_membros', 'subgrupos', 'flashcards_enviados'
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
alter table public.favoritos_cartoes    enable row level security;
alter table public.questoes_ocultas     enable row level security;
alter table public.destaques            enable row level security;
alter table public.flashcards_pessoais  enable row level security;
alter table public.sessoes              enable row level security;
alter table public.resultados_simulados enable row level security;
alter table public.sessao_em_andamento  enable row level security;
alter table public.calendario           enable row level security;
alter table public.livro_ouro           enable row level security;
alter table public.formatacao_aprovada  enable row level security;
alter table public.comentarios          enable row level security;
alter table public.questoes_enviadas    enable row level security;
alter table public.feedbacks            enable row level security;
alter table public.correcoes_questoes   enable row level security;
alter table public.avisos               enable row level security;
alter table public.grupos               enable row level security;
alter table public.grupo_membros        enable row level security;
alter table public.subgrupos            enable row level security;
alter table public.flashcards_enviados  enable row level security;

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

-- EXCLUIR UM CADASTRO. Inativar (status = 'inativo') já basta para tirar o
-- acesso guardando o estudo da pessoa; isto aqui é para o cadastro que nunca
-- deveria ter existido — duplicado, e-mail errado, alguém de fora da turma.
-- Só professor/administrador, e ninguém exclui a própria conta (senão um
-- clique errado tira o último administrador da plataforma).
--
-- Apagar a linha de `perfis` é o que corta a entrada: sem perfil, o site
-- recusa o login mesmo com e-mail e senha certos. A conta de autenticação em
-- si (auth.users) continua existindo e só o painel do Supabase a remove — é
-- a única parte que o site não consegue fazer, porque exigiria a chave
-- service_role, que nunca entra num arquivo publicado.
drop policy if exists perfis_excluir on public.perfis;
create policy perfis_excluir on public.perfis
  for delete to authenticated
  using (public.e_equipe() and id <> auth.uid());

-- CALENDARIO: todo mundo que está numa conta lê (é o calendário de todos);
-- só professor e administrador gravam — é quem edita em Admin > Blocos de
-- Estudo. Sem update aqui um aluno não conseguiria receber a mudança nunca.
drop policy if exists calendario_ler     on public.calendario;
drop policy if exists calendario_criar   on public.calendario;
drop policy if exists calendario_alterar on public.calendario;

create policy calendario_ler on public.calendario
  for select to authenticated
  using (true);

create policy calendario_criar on public.calendario
  for insert to authenticated
  with check (public.e_equipe());

create policy calendario_alterar on public.calendario
  for update to authenticated
  using (public.e_equipe())
  with check (public.e_equipe());

-- LIVRO_OURO: mesma regra do calendário — todos leem, a equipe grava.
drop policy if exists livro_ouro_ler     on public.livro_ouro;
drop policy if exists livro_ouro_criar   on public.livro_ouro;
drop policy if exists livro_ouro_alterar on public.livro_ouro;
create policy livro_ouro_ler on public.livro_ouro
  for select to authenticated using (true);
create policy livro_ouro_criar on public.livro_ouro
  for insert to authenticated with check (public.e_equipe());
create policy livro_ouro_alterar on public.livro_ouro
  for update to authenticated
  using (public.e_equipe()) with check (public.e_equipe());

-- FORMATACAO_APROVADA: todos leem; grava quem revisa formatação.
drop policy if exists formatacao_aprovada_ler     on public.formatacao_aprovada;
drop policy if exists formatacao_aprovada_criar   on public.formatacao_aprovada;
drop policy if exists formatacao_aprovada_alterar on public.formatacao_aprovada;
create policy formatacao_aprovada_ler on public.formatacao_aprovada
  for select to authenticated using (true);
create policy formatacao_aprovada_criar on public.formatacao_aprovada
  for insert to authenticated with check (public.e_revisor());
create policy formatacao_aprovada_alterar on public.formatacao_aprovada
  for update to authenticated
  using (public.e_revisor()) with check (public.e_revisor());

-- COMENTARIOS: todos leem; cada um escreve e edita o próprio; a equipe
-- (professor/administrador) edita qualquer um — é quem modera. Marcar como
-- "resposta oficial" exige ser revisor (professor, residente, administrador):
-- sem essa trava, um aluno montaria a chamada à mão e se passaria por
-- professor na Fila de Dúvidas.
drop policy if exists comentarios_ler     on public.comentarios;
drop policy if exists comentarios_criar   on public.comentarios;
drop policy if exists comentarios_alterar on public.comentarios;
create policy comentarios_ler on public.comentarios
  for select to authenticated using (true);
create policy comentarios_criar on public.comentarios
  for insert to authenticated
  with check (usuario_id = auth.uid() and (resposta_oficial = false or public.e_revisor()));
create policy comentarios_alterar on public.comentarios
  for update to authenticated
  using (usuario_id = auth.uid() or public.e_equipe())
  with check ((usuario_id = auth.uid() or public.e_equipe()) and (resposta_oficial = false or public.e_revisor()));

-- QUESTOES_ENVIADAS: quem enviou vê as suas; a equipe vê todas; as aprovadas
-- (e as removidas, para a remoção chegar a todos) todo mundo aprovado vê.
-- Enviar: a própria questão, como pendente — ou já aprovada, se for revisor
-- (residente publica direto no banco geral, como já fazia no navegador). A
-- equipe grava qualquer uma: é ela que aprova, corrige, recusa e remove.
-- Quem enviou só mexe na sua enquanto ela está pendente.
drop policy if exists questoes_enviadas_ler     on public.questoes_enviadas;
drop policy if exists questoes_enviadas_criar   on public.questoes_enviadas;
drop policy if exists questoes_enviadas_alterar on public.questoes_enviadas;
create policy questoes_enviadas_ler on public.questoes_enviadas
  for select to authenticated
  using (
    (grupo_id is null and status in ('aprovada', 'removida') and public.e_aprovado())
    or (grupo_id is not null and public.e_do_grupo(grupo_id))
    or autor_id = auth.uid()
    or public.e_equipe()
  );
create policy questoes_enviadas_criar on public.questoes_enviadas
  for insert to authenticated
  with check (
    public.e_equipe()
    or (autor_id = auth.uid() and public.e_aprovado()
        and (status = 'pendente' or (status = 'aprovada' and (public.e_revisor() or (grupo_id is not null and public.e_do_grupo(grupo_id))))))
  );
-- a questão de um grupo qualquer membro do grupo corrige (é trabalho em
-- conjunto); a do banco geral, só quem enviou enquanto pendente, e a equipe.
create policy questoes_enviadas_alterar on public.questoes_enviadas
  for update to authenticated
  using (
    public.e_equipe()
    or (grupo_id is not null and public.e_do_grupo(grupo_id))
    or (autor_id = auth.uid() and (status = 'pendente' or public.e_revisor()))
  )
  with check (
    public.e_equipe()
    or (grupo_id is not null and public.e_aprovado() and public.e_do_grupo(grupo_id) and status in ('aprovada', 'removida'))
    or (autor_id = auth.uid() and public.e_aprovado()
        and (status = 'pendente' or (status = 'aprovada' and public.e_revisor())))
  );

-- GRUPOS: toda conta aprovada lê (é a lista de "pedir para entrar"). Cria quem
-- vai ser a dona; a turma do rodízio (id 'rodizio-…') não tem dona e qualquer
-- conta aprovada pode criar a linha dela, que só guarda a divisão das
-- questões. Altera: a dona, a equipe e, na turma do rodízio, os membros.
drop policy if exists grupos_ler     on public.grupos;
drop policy if exists grupos_criar   on public.grupos;
drop policy if exists grupos_alterar on public.grupos;
create policy grupos_ler on public.grupos
  for select to authenticated using (public.e_aprovado());
create policy grupos_criar on public.grupos
  for insert to authenticated
  with check (
    public.e_equipe()
    or (public.e_aprovado()
        and ((criado_por = auth.uid() and id not like 'rodizio-%')
             or (criado_por is null and id like 'rodizio-%')))
  );
create policy grupos_alterar on public.grupos
  for update to authenticated
  using (public.e_equipe() or criado_por = auth.uid() or (id like 'rodizio-%' and public.e_do_grupo(id)))
  with check (
    public.e_equipe()
    or criado_por = auth.uid()
    or (id like 'rodizio-%' and criado_por is null and public.e_do_grupo(id))
  );

-- GRUPO_MEMBROS: a pessoa vê as próprias linhas; os membros (e a dona) veem as
-- do grupo; a equipe vê todas. Pedir para entrar ou sair: só em nome próprio.
-- Entrar direto como aprovada: só na turma do rodízio (aberta) ou quando a
-- dona está colocando a si mesma. Aprovar ou recusar o pedido de outra pessoa:
-- só a dona do grupo (e a equipe).
drop policy if exists grupo_membros_ler     on public.grupo_membros;
drop policy if exists grupo_membros_criar   on public.grupo_membros;
drop policy if exists grupo_membros_alterar on public.grupo_membros;
create policy grupo_membros_ler on public.grupo_membros
  for select to authenticated
  using (usuario_id = auth.uid() or public.e_do_grupo(grupo_id) or public.e_equipe());
create policy grupo_membros_criar on public.grupo_membros
  for insert to authenticated
  with check (
    public.e_equipe()
    or (usuario_id = auth.uid() and public.e_aprovado()
        and (status in ('pendente', 'saiu')
             or (status = 'aprovado' and (grupo_id like 'rodizio-%' or public.e_dono_do_grupo(grupo_id)))))
  );
create policy grupo_membros_alterar on public.grupo_membros
  for update to authenticated
  using (public.e_equipe() or usuario_id = auth.uid() or public.e_dono_do_grupo(grupo_id))
  with check (
    public.e_equipe()
    or public.e_dono_do_grupo(grupo_id)
    or (usuario_id = auth.uid() and public.e_aprovado()
        and (status in ('pendente', 'saiu') or (status = 'aprovado' and grupo_id like 'rodizio-%')))
  );

-- SUBGRUPOS: só os membros do grupo (e a equipe) leem e mexem; criar, só em
-- nome próprio. Qualquer membro altera (sair do grupo de estudo é editar a
-- lista de participantes, e o grupo é de gente que confia uma na outra).
drop policy if exists subgrupos_ler     on public.subgrupos;
drop policy if exists subgrupos_criar   on public.subgrupos;
drop policy if exists subgrupos_alterar on public.subgrupos;
create policy subgrupos_ler on public.subgrupos
  for select to authenticated using (public.e_do_grupo(grupo_id) or public.e_equipe());
create policy subgrupos_criar on public.subgrupos
  for insert to authenticated
  with check (public.e_equipe() or (criado_por = auth.uid() and public.e_aprovado() and public.e_do_grupo(grupo_id)));
create policy subgrupos_alterar on public.subgrupos
  for update to authenticated
  using (public.e_equipe() or public.e_do_grupo(grupo_id))
  with check (public.e_equipe() or (public.e_aprovado() and public.e_do_grupo(grupo_id)));

-- FLASHCARDS_ENVIADOS: o aprovado do banco geral (e o removido, para a
-- remoção chegar a todos) toda conta aprovada lê; o de grupo, só os membros;
-- a própria pessoa lê o que enviou; a equipe lê tudo. Enviar: o aluno manda
-- como pendente (a equipe decide) ou, para o grupo, já aprovado — e a equipe e
-- os residentes publicam direto. A equipe grava qualquer um (aprovar, recusar,
-- remover); quem enviou só mexe no seu enquanto está pendente ou recusado.
drop policy if exists flashcards_enviados_ler     on public.flashcards_enviados;
drop policy if exists flashcards_enviados_criar   on public.flashcards_enviados;
drop policy if exists flashcards_enviados_alterar on public.flashcards_enviados;
create policy flashcards_enviados_ler on public.flashcards_enviados
  for select to authenticated
  using (
    (grupo_id is null and status in ('aprovado', 'removido') and public.e_aprovado())
    or (grupo_id is not null and public.e_do_grupo(grupo_id))
    or autor_id = auth.uid()
    or public.e_equipe()
  );
create policy flashcards_enviados_criar on public.flashcards_enviados
  for insert to authenticated
  with check (
    public.e_equipe()
    or (autor_id = auth.uid() and public.e_aprovado()
        and ((grupo_id is null and (status = 'pendente' or (status = 'aprovado' and public.e_revisor())))
             or (grupo_id is not null and public.e_do_grupo(grupo_id) and status = 'aprovado')))
  );
create policy flashcards_enviados_alterar on public.flashcards_enviados
  for update to authenticated
  using (
    public.e_equipe()
    or (autor_id = auth.uid() and (grupo_id is not null or status in ('pendente', 'recusado') or public.e_revisor()))
  )
  with check (
    public.e_equipe()
    or (autor_id = auth.uid() and public.e_aprovado()
        and ((grupo_id is null and (status = 'pendente' or (status in ('aprovado', 'removido') and public.e_revisor())))
             or (grupo_id is not null and public.e_do_grupo(grupo_id) and status in ('aprovado', 'removido'))))
  );

-- FEEDBACKS: quem escreveu vê as suas; os administradores veem todas.
-- Escrever: só em nome próprio, e nunca já "lido". Alterar: o administrador
-- (marcar como lido); quem escreveu só enquanto ninguém leu — é o reenvio
-- de uma mensagem cuja confirmação se perdeu no caminho.
drop policy if exists feedbacks_ler     on public.feedbacks;
drop policy if exists feedbacks_criar   on public.feedbacks;
drop policy if exists feedbacks_alterar on public.feedbacks;
create policy feedbacks_ler on public.feedbacks
  for select to authenticated
  using (usuario_id = auth.uid() or public.e_admin());
create policy feedbacks_criar on public.feedbacks
  for insert to authenticated
  with check (usuario_id = auth.uid() and lido = false);
create policy feedbacks_alterar on public.feedbacks
  for update to authenticated
  using (public.e_admin() or (usuario_id = auth.uid() and lido = false))
  with check (public.e_admin() or (usuario_id = auth.uid() and lido = false));

-- CORRECOES_QUESTOES: todos leem; grava quem revisa (e_revisor()).
drop policy if exists correcoes_questoes_ler     on public.correcoes_questoes;
drop policy if exists correcoes_questoes_criar   on public.correcoes_questoes;
drop policy if exists correcoes_questoes_alterar on public.correcoes_questoes;
create policy correcoes_questoes_ler on public.correcoes_questoes
  for select to authenticated using (true);
create policy correcoes_questoes_criar on public.correcoes_questoes
  for insert to authenticated with check (public.e_revisor());
create policy correcoes_questoes_alterar on public.correcoes_questoes
  for update to authenticated
  using (public.e_revisor()) with check (public.e_revisor());

-- AVISOS: toda conta aprovada lê; só o administrador cria e altera.
drop policy if exists avisos_ler     on public.avisos;
drop policy if exists avisos_criar   on public.avisos;
drop policy if exists avisos_alterar on public.avisos;
create policy avisos_ler on public.avisos
  for select to authenticated using (public.e_aprovado());
create policy avisos_criar on public.avisos
  for insert to authenticated with check (public.e_admin());
create policy avisos_alterar on public.avisos
  for update to authenticated
  using (public.e_admin()) with check (public.e_admin());

-- AS DEMAIS TABELAS: são o estudo de uma pessoa só. Ler, criar e alterar
-- apenas as próprias linhas. Ninguém apaga nada (o app marca "removido" em
-- vez de apagar, para a remoção também conseguir viajar entre aparelhos).
do $$
declare t text;
begin
  foreach t in array array[
    'respostas', 'revisoes', 'revisoes_flashcards', 'dias_cartoes',
    'favoritos', 'favoritos_cartoes', 'questoes_ocultas', 'destaques', 'flashcards_pessoais',
    'sessoes', 'resultados_simulados', 'sessao_em_andamento'
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
    'favoritos', 'favoritos_cartoes', 'questoes_ocultas', 'destaques', 'flashcards_pessoais',
    'sessoes', 'resultados_simulados', 'sessao_em_andamento', 'calendario',
    'livro_ouro', 'formatacao_aprovada', 'comentarios', 'questoes_enviadas',
    'feedbacks', 'correcoes_questoes', 'avisos',
    'grupos', 'grupo_membros', 'subgrupos', 'flashcards_enviados'
  ] loop
    execute format('revoke all on public.%1$I from anon', t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- 15-B. PERCENTIL DE SIMULADO — as notas da turma, sem ninguém nelas
-- ---------------------------------------------------------------------------
-- O resultado de um simulado compara a nota da pessoa com as outras
-- tentativas do mesmo simulado. As notas dos outros estão em
-- resultados_simulados, que o RLS fecha para cada um enxergar só as suas —
-- por isso o percentil antigo só contava as tentativas daquele navegador.
-- Esta função devolve SÓ o identificador aleatório da tentativa e a nota:
-- nem quem fez, nem quando, nem as respostas. A "chave" é a mesma do site:
-- o id do simulado, ou o título quando é uma prova antiga feita como
-- simulado. SECURITY DEFINER é o que a deixa ler por cima do RLS — e por
-- isso ela devolve tão pouco.
create or replace function public.notas_do_simulado(p_chave text)
returns table (id text, nota real)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select r.id, r.nota
    from public.resultados_simulados r
   where auth.uid() is not null
     and r.nota is not null
     and coalesce(nullif(r.simulado_id, ''), r.titulo) = p_chave;
$$;
revoke all on function public.notas_do_simulado(text) from public, anon;
grant execute on function public.notas_do_simulado(text) to authenticated;

-- ---------------------------------------------------------------------------
-- 15-C. PAINEL DA TURMA — como a turma está indo e usando a plataforma
-- ---------------------------------------------------------------------------
-- Só para professor e administrador (e_equipe()): para qualquer outra pessoa
-- as funções devolvem zero linhas. Elas somam no próprio banco, e só números:
-- nenhuma resposta, anotação ou cartão pessoal sai daqui.
--
-- TAXA DE ACERTO NÃO É DE NINGUÉM. O acerto de uma pessoa é dela: nenhuma
-- destas funções o devolve. painel_turma() traz, por pessoa, só USO (quantas
-- questões, quantos dias, quantos cartões, quando foi a última vez);
-- acerto_por_turma() traz o acerto SOMADO por ano e por turma, e só quando há
-- pelo menos 3 alunos com resposta no grupo — média de um ou dois alunos é o
-- acerto deles. A equipe (professores, residentes e administradores) também
-- aparece em painel_turma(), com o papel, porque o uso dela interessa à
-- coordenação; o acerto agregado é só dos alunos.
--
-- "Hoje" é o dia de Brasília; as datas de resposta já são o dia local de
-- quem respondeu (o site grava assim).
--
-- As versões anteriores devolviam o acerto de cada aluno: como o tipo do
-- retorno mudou, elas precisam ser apagadas antes de recriar.
drop function if exists public.painel_turma();
create function public.painel_turma()
returns table (
  usuario_id        uuid,
  nome              text,
  email             text,
  papel             text,
  ano_faculdade     text,
  grupo_id          text,
  status            text,
  criado_em         timestamptz,
  respostas         bigint,
  respostas_7d      bigint,
  respostas_30d     bigint,
  dias_ativos_30d   bigint,
  ultima_resposta   date,
  cartoes_total     bigint,
  cartoes_30d       bigint,
  ultimo_cartao     date,
  simulados         bigint
)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  with hoje as (select (now() at time zone 'America/Sao_Paulo')::date as d)
  select
    p.id, p.nome, p.email, p.papel, p.ano_faculdade, p.grupo_id, p.status, p.criado_em,
    coalesce(r.total, 0),
    coalesce(r.total_7d, 0),
    coalesce(r.total_30d, 0),
    coalesce(r.dias_30d, 0), r.ultima,
    coalesce(c.total, 0), coalesce(c.total_30d, 0), c.ultimo,
    coalesce(s.n, 0)
  from public.perfis p
  cross join hoje
  left join lateral (
    select count(*) as total,
           count(*) filter (where x.data > hoje.d - 7) as total_7d,
           count(*) filter (where x.data > hoje.d - 30) as total_30d,
           count(distinct x.data) filter (where x.data > hoje.d - 30) as dias_30d,
           max(x.data) as ultima
      from public.respostas x where x.usuario_id = p.id
  ) r on true
  left join lateral (
    select sum(d.quantidade) as total,
           sum(d.quantidade) filter (where d.dia > hoje.d - 30) as total_30d,
           max(d.dia) as ultimo
      from public.dias_cartoes d where d.usuario_id = p.id
  ) c on true
  left join lateral (
    select count(*) as n
      from public.resultados_simulados rs where rs.usuario_id = p.id
  ) s on true
  where public.e_equipe();
$$;
revoke all on function public.painel_turma() from public, anon;
grant execute on function public.painel_turma() to authenticated;

-- O acerto da turma: uma linha por ano (grupo_id nulo), por turma dentro do
-- ano (grupo_id '' = alunos sem turma) e uma para todos os anos (ano nulo),
-- cada uma só se tiver 3 alunos com resposta ou mais. Só alunos aprovados.
-- por_area = {"area-cm": [respostas, acertos], ...} do mesmo grupo.
drop function if exists public.acerto_por_turma();
create function public.acerto_por_turma()
returns table (
  ano_faculdade text,
  grupo_id      text,
  alunos        bigint,
  respostas     bigint,
  acertos       bigint,
  respostas_30d bigint,
  acertos_30d   bigint,
  por_area      jsonb
)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  with hoje as (select (now() at time zone 'America/Sao_Paulo')::date as d),
  r as (
    select coalesce(p.ano_faculdade, '(sem ano)') as ano,
           coalesce(p.grupo_id, '') as grupo,
           p.id as aluno,
           coalesce(x.area_id, '?') as area,
           x.correta, x.data
      from public.perfis p
      join public.respostas x on x.usuario_id = p.id
     where public.e_equipe() and p.papel = 'aluno' and p.status = 'aprovado'
  ),
  tot as (
    select ano, grupo,
           count(distinct aluno) as alunos,
           count(*) as respostas,
           count(*) filter (where correta) as acertos,
           count(*) filter (where data > hoje.d - 30) as respostas_30d,
           count(*) filter (where data > hoje.d - 30 and correta) as acertos_30d
      from r cross join hoje
     group by grouping sets ((ano, grupo), (ano), ())
  ),
  areas as (
    select ano, grupo, area, count(*) as t, count(*) filter (where correta) as a
      from r
     group by grouping sets ((ano, grupo, area), (ano, area), (area))
  )
  select tot.ano, tot.grupo, tot.alunos, tot.respostas, tot.acertos, tot.respostas_30d, tot.acertos_30d,
         coalesce((select jsonb_object_agg(ar.area, jsonb_build_array(ar.t, ar.a))
                     from areas ar
                    where ar.ano is not distinct from tot.ano and ar.grupo is not distinct from tot.grupo), '{}'::jsonb)
    from tot
   where tot.alunos >= 3;
$$;
revoke all on function public.acerto_por_turma() from public, anon;
grant execute on function public.acerto_por_turma() to authenticated;

-- Semana a semana, por ano da faculdade: quantos alunos estudaram, quantas
-- questões e com que acerto. É o gráfico de "a turma está usando?". Semana
-- com menos de 3 alunos ativos devolve o acerto vazio (seria o de uma pessoa).
create or replace function public.atividade_por_semana(p_semanas integer default 12)
returns table (ano_faculdade text, semana date, alunos_ativos bigint, respostas bigint, acertos bigint)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select coalesce(p.ano_faculdade, '(sem ano)'),
         date_trunc('week', x.data)::date,
         count(distinct x.usuario_id),
         count(*),
         case when count(distinct x.usuario_id) >= 3 then count(*) filter (where x.correta) end
    from public.respostas x
    join public.perfis p on p.id = x.usuario_id and p.papel = 'aluno'
   where public.e_equipe()
     and x.data > (now() at time zone 'America/Sao_Paulo')::date - (7 * greatest(1, least(p_semanas, 104)))
   group by 1, 2
   order by 1, 2;
$$;
revoke all on function public.atividade_por_semana(integer) from public, anon;
grant execute on function public.atividade_por_semana(integer) to authenticated;

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
