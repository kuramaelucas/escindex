-- As regras de segurança do nuvem/esquema.sql, conferidas com contas de
-- mentira. Qualquer resultado diferente do esperado derruba o teste.
\set ON_ERROR_STOP 1
insert into auth.users(id,email,raw_user_meta_data) values
 ('00000000-0000-0000-0000-00000000000a','aluna@x','{"nome":"Aluna A","ano_faculdade":"3º ano"}'),
 ('00000000-0000-0000-0000-00000000000b','aluno@x','{"nome":"Aluno B","ano_faculdade":"4º ano"}'),
 ('00000000-0000-0000-0000-00000000000c','prof@x','{"nome":"Prof C"}'),
 ('00000000-0000-0000-0000-00000000000d','res@x','{"nome":"Res D"}'),
 ('00000000-0000-0000-0000-0000000000a1','aluna2@x','{"nome":"Aluna F","ano_faculdade":"3º ano"}'),
 ('00000000-0000-0000-0000-0000000000a2','aluno2@x','{"nome":"Aluno G","ano_faculdade":"3º ano"}');
update perfis set status='aprovado';
update perfis set papel='professor' where email='prof@x';
update perfis set papel='residente' where email='res@x';
-- a data de Brasília, como painel_turma() conta: com current_date (UTC), o
-- teste falhava entre 0h e 3h UTC, quando os dois calendários divergem
insert into respostas(id,usuario_id,questao_id,area_id,correta,data)
  select 'ra'||g,'00000000-0000-0000-0000-00000000000a','q'||g,'area-cm',g%3<>0,(now() at time zone 'America/Sao_Paulo')::date-g from generate_series(1,40) g;
-- mais dois alunos do 3º ano com resposta: com a Aluna A são 3, o mínimo para o acerto da turma aparecer
insert into respostas(id,usuario_id,questao_id,area_id,correta,data)
  select 'rf'||g,'00000000-0000-0000-0000-0000000000a1','q'||g,'area-cm',true,(now() at time zone 'America/Sao_Paulo')::date-g from generate_series(1,10) g;
insert into respostas(id,usuario_id,questao_id,area_id,correta,data)
  select 'rg'||g,'00000000-0000-0000-0000-0000000000a2','q'||g,'area-cm',false,(now() at time zone 'America/Sao_Paulo')::date-g from generate_series(1,10) g;
insert into resultados_simulados(id,usuario_id,simulado_id,titulo,nota) values
  ('s1','00000000-0000-0000-0000-00000000000a',null,'Prova X',60),
  ('s2','00000000-0000-0000-0000-00000000000b','','Prova X',80);

-- uma "tentativa que tem de falhar": roda o comando e exige erro
create function pg_temp.tem_de_falhar(comando text, motivo text) returns void language plpgsql as $$
begin
  begin execute comando; exception when others then return; end;
  raise exception 'deveria ter sido recusado: %', motivo;
end $$;
create function pg_temp.igual(obtido bigint, esperado bigint, motivo text) returns void language plpgsql as $$
begin if obtido is distinct from esperado then raise exception '%: esperado %, veio %', motivo, esperado, obtido; end if; end $$;

set role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000a',false);
select pg_temp.igual((select count(*) from painel_turma()), 0, 'aluno não vê o painel da turma');
select pg_temp.igual((select count(*) from atividade_por_semana(12)), 0, 'aluno não vê a atividade por semana');
select pg_temp.igual((select count(*) from acerto_por_turma()), 0, 'aluno não vê o acerto da turma');
select pg_temp.igual((select count(*) from notas_do_simulado('Prova X')), 2, 'percentil enxerga as notas da turma');
select pg_temp.igual((select count(*) from respostas where usuario_id='00000000-0000-0000-0000-00000000000b'), 0, 'aluno não lê respostas dos outros');
insert into comentarios(id,questao_id,usuario_id,autor_nome,texto) values ('c1','q1','00000000-0000-0000-0000-00000000000a','Aluna A','dúvida');
select pg_temp.tem_de_falhar($$insert into comentarios(id,questao_id,usuario_id,texto) values ('c2','q1','00000000-0000-0000-0000-00000000000b','x')$$, 'comentário em nome de outra pessoa');
select pg_temp.tem_de_falhar($$insert into comentarios(id,questao_id,usuario_id,texto,resposta_oficial) values ('c3','q1','00000000-0000-0000-0000-00000000000a','x',true)$$, 'aluno dando resposta oficial');
select pg_temp.tem_de_falhar($$update comentarios set resposta_oficial=true where id='c1'$$, 'aluno virando o próprio comentário em oficial');
select pg_temp.tem_de_falhar($$update perfis set papel='admin' where id='00000000-0000-0000-0000-00000000000a' returning case when papel='admin' then 1/0 end$$, 'aluno se promovendo');

-- destaques: cada pessoa marca e lê só os seus
insert into destaques(id,usuario_id,alvo,inicio,fim,trecho) values ('d1','00000000-0000-0000-0000-00000000000a','q:q1:enunciado',3,9,'trecho');
select pg_temp.tem_de_falhar($$insert into destaques(id,usuario_id,alvo,inicio,fim,trecho) values ('d2','00000000-0000-0000-0000-00000000000b','q:q1:enunciado',0,4,'x')$$, 'destaque em nome de outra pessoa');
update destaques set removido=true where id='d1';
select pg_temp.igual((select count(*) from destaques where removido), 1, 'a pessoa desmarca o próprio destaque');

-- o registro de cada avaliação de cartão e as colunas novas da resposta: só do dono
insert into log_revisoes_cartoes(id,usuario_id,cartao_id,assunto_id,nota,intervalo_antes,intervalo_depois,dias_desde_ultima,vistas,data,respondida_em)
  values ('l1','00000000-0000-0000-0000-00000000000a','c1','ass-sca','sabia',7,14,8,2,current_date,now());
select pg_temp.tem_de_falhar($$insert into log_revisoes_cartoes(id,usuario_id,cartao_id,nota) values ('l2','00000000-0000-0000-0000-00000000000b','c1','sabia')$$, 'log de cartão em nome de outra pessoa');
select pg_temp.igual((select count(*) from information_schema.columns where table_schema='public' and table_name='respostas' and column_name in ('origem','tentativa','dias_desde_ultima','respondida_em','texto_resposta')), 5, 'a resposta tem origem, tentativa, dias desde a última, a hora exata e o texto da dissertativa');
update perfis set prova_alvo_data = current_date + 30 where id='00000000-0000-0000-0000-00000000000a';
select pg_temp.igual((select count(*) from perfis where prova_alvo_data is not null), 1, 'a pessoa grava a própria data de prova-alvo');

select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000d',false);
select pg_temp.igual((select count(*) from destaques), 0, 'ninguém lê o destaque de outra pessoa');
select pg_temp.igual((select count(*) from log_revisoes_cartoes), 0, 'ninguém lê o log de cartões de outra pessoa');
insert into comentarios(id,questao_id,usuario_id,autor_nome,texto,resposta_oficial) values ('c4','q1','00000000-0000-0000-0000-00000000000d','Res D','resposta',true);
select pg_temp.igual((select count(*) from painel_turma()), 0, 'residente não vê o painel da turma');
select pg_temp.igual((select count(*) from acerto_por_turma()), 0, 'residente não vê o acerto da turma');

select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000c',false);
select pg_temp.igual((select count(*) from painel_turma()), 6, 'professor vê os alunos e a equipe (o uso da equipe também interessa)');
select pg_temp.igual((select count(*) from painel_turma() where papel<>'aluno'), 2, 'a equipe aparece no painel, com o papel');
-- a taxa de acerto de cada pessoa não sai do banco, nem para a equipe
select pg_temp.igual((select count(*) from painel_turma() t, jsonb_object_keys(to_jsonb(t)) k where k ~ 'acerto' or k in ('por_area','media_simulados')), 0, 'painel_turma não devolve acerto de ninguém');
-- o acerto da turma só existe somado, e só com 3 alunos ou mais
select pg_temp.igual((select count(*) from acerto_por_turma() where ano_faculdade='3º ano' and grupo_id is null), 1, 'acerto do 3º ano aparece com 3 alunos');
select pg_temp.igual((select acertos from acerto_por_turma() where ano_faculdade='3º ano' and grupo_id is null), 37, 'acerto do 3º ano é a soma dos três (27 da Aluna A + 10 da F + 0 do G)');
select pg_temp.igual((select count(*) from acerto_por_turma() where ano_faculdade='4º ano'), 0, 'o 4º ano tem um aluno sem resposta: sem média');
select pg_temp.igual((select respostas from painel_turma() where nome='Aluna A'), 40, 'painel soma as respostas');
select pg_temp.igual((select respostas from acerto_por_turma() where ano_faculdade='3º ano' and grupo_id is null), 60, 'o acerto agregado soma as respostas dos três');
select pg_temp.igual((select respostas_7d from painel_turma() where nome='Aluna A'), 6, 'painel conta os últimos 7 dias');
update comentarios set removido=true where id='c1';
select pg_temp.igual((select count(*) from comentarios where removido), 1, 'professor modera comentário');
reset role;

-- QUESTÕES ENVIADAS E AS IMAGENS DELAS
insert into auth.users(id,email,raw_user_meta_data) values
 ('00000000-0000-0000-0000-00000000000e','pendente@x','{"nome":"Pendente E"}');   -- perfil nasce pendente
select pg_temp.igual((select count(*) from storage.buckets where id='questoes' and public), 1, 'o balde das imagens existe e é público');
set role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000a',false);
insert into questoes_enviadas(id,autor_id,autor_nome,status,dados) values ('qe1','00000000-0000-0000-0000-00000000000a','Aluna A','pendente','{"enunciado":"x"}');
update questoes_enviadas set dados='{"enunciado":"y"}' where id='qe1';
select pg_temp.tem_de_falhar($$insert into questoes_enviadas(id,autor_id,status) values ('qe2','00000000-0000-0000-0000-00000000000a','aprovada')$$, 'aluno publicando questão já aprovada');
select pg_temp.tem_de_falhar($$insert into questoes_enviadas(id,autor_id,status) values ('qe3','00000000-0000-0000-0000-00000000000b','pendente')$$, 'questão em nome de outra pessoa');
select pg_temp.tem_de_falhar($$update questoes_enviadas set status='aprovada' where id='qe1'$$, 'aluno aprovando a própria questão');
insert into storage.objects(bucket_id,name) values ('questoes','00000000-0000-0000-0000-00000000000a/qe1.jpg');
select pg_temp.tem_de_falhar($$insert into storage.objects(bucket_id,name) values ('questoes','00000000-0000-0000-0000-00000000000b/qe1.jpg')$$, 'imagem na pasta de outra pessoa');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000b',false);
select pg_temp.igual((select count(*) from questoes_enviadas), 0, 'aluno não vê a questão pendente de outro');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000e',false);
select pg_temp.tem_de_falhar($$insert into questoes_enviadas(id,autor_id,status) values ('qe4','00000000-0000-0000-0000-00000000000e','pendente')$$, 'conta pendente enviando questão');
select pg_temp.tem_de_falhar($$insert into storage.objects(bucket_id,name) values ('questoes','00000000-0000-0000-0000-00000000000e/x.jpg')$$, 'conta pendente enviando imagem');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000d',false);
insert into questoes_enviadas(id,autor_id,status) values ('qe5','00000000-0000-0000-0000-00000000000d','aprovada');   -- residente publica direto
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000c',false);
select pg_temp.igual((select count(*) from questoes_enviadas), 2, 'professor vê as enviadas, inclusive a pendente');
insert into questoes_enviadas(id,autor_id,autor_nome,status,dados,decidido_por_nome) values ('qe1','00000000-0000-0000-0000-00000000000a','Aluna A','aprovada','{"enunciado":"y"}','Prof C')
  on conflict (id) do update set status=excluded.status, dados=excluded.dados, decidido_por_nome=excluded.decidido_por_nome;   -- aprovar = o mesmo upsert do site
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000b',false);
select pg_temp.igual((select count(*) from questoes_enviadas where id='qe1' and status='aprovada'), 1, 'a aprovada chega à turma');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000a',false);
with x as (update questoes_enviadas set dados='{}' where id='qe1' returning 1) select pg_temp.igual(count(*), 0, 'aluno não mexe na questão depois de aprovada') from x;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000c',false);
update questoes_enviadas set status='recusada', motivo='repetida' where id='qe5';
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000b',false);
select pg_temp.igual((select count(*) from questoes_enviadas where id='qe5'), 0, 'a recusada não chega à turma');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000d',false);
select pg_temp.igual((select count(*) from questoes_enviadas where id='qe5' and motivo='repetida'), 1, 'quem enviou vê o motivo da recusa');
reset role;

-- FEEDBACK DA PLATAFORMA: chega aos administradores, e só a eles
insert into auth.users(id,email,raw_user_meta_data) values
 ('00000000-0000-0000-0000-00000000000f','admin@x','{"nome":"Admin F"}');
select set_config('request.jwt.claim.sub','',false);   -- como no SQL Editor: sem ninguém logado
update perfis set status='aprovado', papel='admin', nivel_admin='coordenacao' where email='admin@x';
set role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000a',false);
insert into feedbacks(id,usuario_id,autor_nome,papel,tipo,texto) values ('fb1','00000000-0000-0000-0000-00000000000a','Aluna A','aluno','sugestao','modo escuro melhor')
  on conflict (id) do update set texto=excluded.texto;   -- o mesmo upsert do site
insert into feedbacks(id,usuario_id,autor_nome,tipo,texto) values ('fb1','00000000-0000-0000-0000-00000000000a','Aluna A','sugestao','modo escuro melhor')
  on conflict (id) do update set texto=excluded.texto;   -- reenviar (resposta perdida) não falha
select pg_temp.tem_de_falhar($$insert into feedbacks(id,usuario_id,texto) values ('fb2','00000000-0000-0000-0000-00000000000b','x')$$, 'feedback em nome de outra pessoa');
select pg_temp.tem_de_falhar($$insert into feedbacks(id,usuario_id,texto,lido) values ('fb3','00000000-0000-0000-0000-00000000000a','x',true)$$, 'feedback já nascendo lido');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000b',false);
select pg_temp.igual((select count(*) from feedbacks), 0, 'aluno não lê o feedback de outro');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000c',false);
select pg_temp.igual((select count(*) from feedbacks), 0, 'professor não lê o feedback (é da administração)');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000f',false);
select pg_temp.igual((select count(*) from feedbacks where id='fb1'), 1, 'o feedback chega ao administrador');
-- marcar como lido: o site manda PATCH (update) na linha de outra pessoa —
-- o upsert passaria pela regra de inserção, que só aceita linha própria
select pg_temp.tem_de_falhar($$insert into feedbacks(id,usuario_id,texto,lido) values ('fb1','00000000-0000-0000-0000-00000000000a','x',true) on conflict (id) do update set lido=true$$, 'upsert na linha de outra pessoa (por isso o site usa PATCH)');
update feedbacks set lido=true, lido_por_nome='Admin F' where id='fb1';
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000a',false);
select pg_temp.igual((select count(*) from feedbacks where id='fb1' and lido), 1, 'quem enviou vê que foi lido');
with x as (update feedbacks set lido=false, texto='mudei' where id='fb1' returning 1) select pg_temp.igual(count(*), 0, 'quem enviou não mexe depois de lido') from x;

-- CORREÇÕES DAS QUESTÕES DA PASTA dados/: todos leem, só quem revisa grava
select pg_temp.tem_de_falhar($$insert into correcoes_questoes(questao_id,campos) values ('q-x-001','{"gabarito":"B"}')$$, 'aluno corrigindo questão');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000d',false);
insert into correcoes_questoes(questao_id,campos,remover,autor_nome) values ('q-x-001','{"imagemUrl":"https://x/y.jpg"}','["imagemPendente"]','Res D')
  on conflict (questao_id) do update set campos=excluded.campos, remover=excluded.remover;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000c',false);
insert into correcoes_questoes(questao_id,campos,remover,autor_nome) values ('q-x-001','{"imagemUrl":"https://x/y.jpg","gabarito":"C"}','["imagemPendente"]','Prof C')
  on conflict (questao_id) do update set campos=excluded.campos, remover=excluded.remover;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000b',false);
select pg_temp.igual((select count(*) from correcoes_questoes where campos->>'gabarito'='C'), 1, 'a correção chega à turma');
with x as (update correcoes_questoes set removido=true returning 1) select pg_temp.igual(count(*), 0, 'aluno não encerra correção') from x;
reset role;

-- AVISOS DA COORDENAÇÃO: toda conta aprovada lê, só o administrador grava
set role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000b',false);
select pg_temp.tem_de_falhar($$insert into avisos(id,titulo,texto) values ('av0','oi','aluno mandando aviso')$$, 'aluno enviando aviso');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000c',false);
select pg_temp.tem_de_falhar($$insert into avisos(id,titulo,texto) values ('av0','oi','professor mandando aviso')$$, 'professor enviando aviso');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000f',false);
insert into avisos(id,titulo,texto,papeis,anos,autor_nome) values ('av1','Manutenção','Sábado de manhã','["aluno"]','["6º ano"]','Admin F')
  on conflict (id) do update set texto=excluded.texto;   -- o mesmo upsert do site
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000a',false);
select pg_temp.igual((select count(*) from avisos where id='av1'), 1, 'o aviso chega ao aluno');
with x as (update avisos set removido=true where id='av1' returning 1) select pg_temp.igual(count(*), 0, 'aluno não apaga aviso') from x;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000f',false);
update avisos set removido=true where id='av1';
select pg_temp.igual((select count(*) from avisos where id='av1' and removido), 1, 'o administrador retira o aviso (removido, sem apagar a linha)');
reset role;

-- GRUPOS, MEMBROS, GRUPOS DE ESTUDO, E AS QUESTÕES E CARTÕES DE GRUPO
-- (A = dona do grupo g1; B = pede para entrar; F (a1) = de fora; C = professor)
set role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000a',false);
insert into grupos(id,nome,criado_por,criado_por_nome,dados) values ('g1','Turma da A','00000000-0000-0000-0000-00000000000a','Aluna A','{"anoFaculdade":"3º ano"}');
select pg_temp.tem_de_falhar($$insert into grupos(id,nome,criado_por) values ('g2','Em nome de outra','00000000-0000-0000-0000-00000000000b')$$, 'grupo em nome de outra pessoa');
select pg_temp.tem_de_falhar($$insert into grupos(id,nome,criado_por) values ('rodizio-1-1','Sem dona',null),('g3','Sem dona',null)$$, 'grupo comum sem dona');
insert into grupo_membros(grupo_id,usuario_id,usuario_nome,status) values ('g1','00000000-0000-0000-0000-00000000000a','Aluna A','aprovado');   -- a dona entra no próprio grupo
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000b',false);
select pg_temp.igual((select count(*) from grupos where id='g1'), 1, 'toda conta aprovada vê a lista de grupos (para pedir para entrar)');
select pg_temp.tem_de_falhar($$insert into grupo_membros(grupo_id,usuario_id,status) values ('g1','00000000-0000-0000-0000-00000000000b','aprovado')$$, 'entrar direto num grupo com dona');
insert into grupo_membros(grupo_id,usuario_id,usuario_nome,status) values ('g1','00000000-0000-0000-0000-00000000000b','Aluno B','pendente');
select pg_temp.tem_de_falhar($$update grupo_membros set status='aprovado' where grupo_id='g1' and usuario_id='00000000-0000-0000-0000-00000000000b'$$, 'aprovar a si mesmo');
select pg_temp.igual((select count(*) from questoes_enviadas where grupo_id='g1'), 0, 'quem ainda não é do grupo não lê as questões dele');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000a',false);
select pg_temp.igual((select count(*) from grupo_membros where grupo_id='g1' and status='pendente'), 1, 'a dona vê o pedido de entrada');
update grupo_membros set status='aprovado', usuario_nome='Aluno B' where grupo_id='g1' and usuario_id='00000000-0000-0000-0000-00000000000b';   -- aprovar = PATCH na linha de outra pessoa
select pg_temp.tem_de_falhar($$insert into grupo_membros(grupo_id,usuario_id,status) values ('g1','00000000-0000-0000-0000-0000000000a1','aprovado')$$, 'dona inserindo a linha de outra pessoa pelo upsert (o site usa PATCH)');
-- a questão do grupo: o aluno envia já aprovada, e só os membros leem
insert into questoes_enviadas(id,autor_id,autor_nome,status,grupo_id,dados) values ('qg1','00000000-0000-0000-0000-00000000000a','Aluna A','aprovada','g1','{"enunciado":"do grupo"}');
select pg_temp.tem_de_falhar($$insert into questoes_enviadas(id,autor_id,status) values ('qg2','00000000-0000-0000-0000-00000000000a','aprovada')$$, 'aluno publicando no banco geral sem ser grupo');
select pg_temp.tem_de_falhar($$insert into questoes_enviadas(id,autor_id,status,grupo_id) values ('qg3','00000000-0000-0000-0000-00000000000a','aprovada','g-que-nao-e-dela')$$, 'questão para um grupo de que não faz parte');
insert into subgrupos(id,grupo_id,nome,criado_por,dados) values ('sg1','g1','Dupla','00000000-0000-0000-0000-00000000000a','{"membros":[]}');
insert into flashcards_enviados(id,autor_id,autor_nome,grupo_id,status,dados) values ('fg1','00000000-0000-0000-0000-00000000000a','Aluna A','g1','aprovado','{"frente":"f","verso":"v"}');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000b',false);
select pg_temp.igual((select count(*) from questoes_enviadas where id='qg1'), 1, 'o membro lê a questão do grupo');
update questoes_enviadas set dados='{"enunciado":"corrigida por B"}' where id='qg1';   -- trabalho em conjunto: qualquer membro corrige (PATCH)
select pg_temp.igual((select count(*) from questoes_enviadas where id='qg1' and dados->>'enunciado'='corrigida por B'), 1, 'o membro corrige a questão do grupo');
select pg_temp.igual((select count(*) from subgrupos where id='sg1'), 1, 'o membro lê os grupos de estudo');
update subgrupos set dados='{"membros":["b"]}' where id='sg1';
select pg_temp.igual((select count(*) from subgrupos where dados->>'membros'='["b"]'), 1, 'o membro mexe no grupo de estudo (sair é editar a lista)');
select pg_temp.igual((select count(*) from flashcards_enviados where id='fg1'), 1, 'o membro lê o cartão do grupo');
insert into flashcards_enviados(id,autor_id,autor_nome,grupo_id,status,dados) values ('fg2','00000000-0000-0000-0000-00000000000b','Aluno B','g1','aprovado','{}');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-0000000000a1',false);
select pg_temp.igual((select count(*) from questoes_enviadas where grupo_id='g1'), 0, 'quem é de fora não lê a questão do grupo');
select pg_temp.igual((select count(*) from subgrupos), 0, 'quem é de fora não lê os grupos de estudo');
select pg_temp.igual((select count(*) from flashcards_enviados where grupo_id='g1'), 0, 'quem é de fora não lê os cartões do grupo');
select pg_temp.igual((select count(*) from grupo_membros where grupo_id='g1'), 0, 'quem é de fora não lê a lista de membros');
select pg_temp.tem_de_falhar($$insert into questoes_enviadas(id,autor_id,status,grupo_id) values ('qg4','00000000-0000-0000-0000-0000000000a1','aprovada','g1')$$, 'questão para um grupo em que não está');
select pg_temp.tem_de_falhar($$insert into flashcards_enviados(id,autor_id,status,grupo_id) values ('fg3','00000000-0000-0000-0000-0000000000a1','aprovado','g1')$$, 'cartão para um grupo em que não está');
with x as (update questoes_enviadas set dados='{}' where id='qg1' returning 1) select pg_temp.igual(count(*), 0, 'quem é de fora não mexe na questão do grupo') from x;
select pg_temp.tem_de_falhar($$insert into subgrupos(id,grupo_id,nome,criado_por) values ('sg2','g1','x','00000000-0000-0000-0000-0000000000a1')$$, 'grupo de estudo em grupo alheio');
insert into grupo_membros(grupo_id,usuario_id,usuario_nome,status) values ('g1','00000000-0000-0000-0000-0000000000a1','Aluna F','pendente');   -- pede para entrar
-- a turma do rodízio é aberta, e a lista de membros só vale para quem está nela
insert into grupo_membros(grupo_id,usuario_id,usuario_nome,status) values ('rodizio-0-0','00000000-0000-0000-0000-0000000000a1','Aluna F','aprovado');
insert into grupos(id,nome,criado_por,dados) values ('rodizio-0-0','3º ano — Grupo A',null,'{"doRodizio":true}');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-0000000000a2',false);
insert into grupo_membros(grupo_id,usuario_id,usuario_nome,status) values ('rodizio-0-0','00000000-0000-0000-0000-0000000000a2','Aluno G','aprovado');
select pg_temp.igual((select count(*) from grupo_membros where grupo_id='rodizio-0-0'), 2, 'os colegas da turma do rodízio se veem');
update grupos set dados='{"doRodizio":true,"divisao":{"q1":"x"}}' where id='rodizio-0-0';
select pg_temp.igual((select count(*) from grupos where id='rodizio-0-0' and dados ? 'divisao'), 1, 'membro da turma do rodízio guarda a divisão das questões');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000b',false);
select pg_temp.igual((select count(*) from grupo_membros where grupo_id='rodizio-0-0'), 0, 'quem não é da turma do rodízio não vê os colegas dela');
with x as (update grupos set dados='{}' where id='rodizio-0-0' returning 1) select pg_temp.igual(count(*), 0, 'quem não é da turma do rodízio não mexe nela') from x;
-- cartões enviados à equipe
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000b',false);
insert into flashcards_enviados(id,autor_id,autor_nome,status,dados) values ('fe1','00000000-0000-0000-0000-00000000000b','Aluno B','pendente','{"frente":"f","verso":"v"}');
select pg_temp.tem_de_falhar($$insert into flashcards_enviados(id,autor_id,status) values ('fe2','00000000-0000-0000-0000-00000000000b','aprovado')$$, 'aluno publicando cartão já aprovado');
select pg_temp.tem_de_falhar($$update flashcards_enviados set status='aprovado' where id='fe1'$$, 'aluno aprovando o próprio cartão');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-0000000000a1',false);
select pg_temp.igual((select count(*) from flashcards_enviados where id='fe1'), 0, 'o cartão pendente não chega aos colegas');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000c',false);
select pg_temp.igual((select count(*) from flashcards_enviados where id='fe1'), 1, 'a equipe vê o cartão sugerido');
update flashcards_enviados set status='aprovado', decidido_por_nome='Prof C' where id='fe1';   -- aprovar = PATCH na linha do aluno
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-0000000000a1',false);
select pg_temp.igual((select count(*) from flashcards_enviados where id='fe1' and status='aprovado'), 1, 'o aprovado chega a toda a turma');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000b',false);
with x as (update flashcards_enviados set status='removido' where id='fe1' returning 1) select pg_temp.igual(count(*), 0, 'quem sugeriu não tira da turma o cartão já aprovado') from x;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000c',false);
insert into flashcards_enviados(id,autor_id,autor_nome,status,dados) values ('fe3','00000000-0000-0000-0000-00000000000c','Prof C','aprovado','{"frente":"da equipe"}');   -- a equipe publica direto
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-0000000000a1',false);
select pg_temp.igual((select count(*) from flashcards_enviados where id='fe3'), 1, 'o cartão da equipe chega à turma');
-- inscrições de push: cada pessoa só mexe nas suas
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000a',false);
insert into push_inscricoes(usuario_id,endpoint,p256dh,auth) values ('00000000-0000-0000-0000-00000000000a','https://push/a','k','a');
select pg_temp.tem_de_falhar($$insert into push_inscricoes(usuario_id,endpoint,p256dh,auth) values ('00000000-0000-0000-0000-00000000000b','https://push/b','k','a')$$, 'inscrição de push em nome de outra pessoa');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000b',false);
select pg_temp.igual((select count(*) from push_inscricoes), 0, 'ninguém lê a inscrição de push de outra pessoa');
reset role;

set role anon;
select pg_temp.tem_de_falhar($$select count(*) from questoes_enviadas$$, 'visitante sem login lendo questões enviadas');
select pg_temp.tem_de_falhar($$select count(*) from comentarios$$, 'visitante sem login lendo comentários');
select pg_temp.tem_de_falhar($$select count(*) from feedbacks$$, 'visitante sem login lendo feedback');
select pg_temp.tem_de_falhar($$select count(*) from avisos$$, 'visitante sem login lendo avisos');
select pg_temp.tem_de_falhar($$select count(*) from correcoes_questoes$$, 'visitante sem login lendo correções');
select pg_temp.tem_de_falhar($$select count(*) from grupos$$, 'visitante sem login lendo grupos');
select pg_temp.tem_de_falhar($$select count(*) from grupo_membros$$, 'visitante sem login lendo membros de grupo');
select pg_temp.tem_de_falhar($$select count(*) from flashcards_enviados$$, 'visitante sem login lendo cartões enviados');
select pg_temp.tem_de_falhar($$select count(*) from push_inscricoes$$, 'visitante sem login lendo inscrições de push');
select pg_temp.tem_de_falhar($$select * from notas_do_simulado('Prova X')$$, 'visitante sem login lendo notas');
-- excluir conta: só a equipe, nunca a própria; libera o e-mail e leva o perfil
set role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000b',false);
select pg_temp.igual((select count(*) from contas_sem_primeiro_acesso()), 0, 'aluno não vê quem nunca entrou');
select pg_temp.igual((select case when excluir_conta('00000000-0000-0000-0000-0000000000a1') then 1 else 0 end), 0, 'aluno não exclui conta');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000c',false);
select pg_temp.igual((select count(*) from contas_sem_primeiro_acesso() where email='aluna2@x'), 1, 'equipe vê quem nunca entrou');
select pg_temp.igual((select case when excluir_conta('00000000-0000-0000-0000-00000000000c') then 1 else 0 end), 0, 'ninguém exclui a própria conta');
select pg_temp.igual((select case when excluir_conta('00000000-0000-0000-0000-0000000000a1') then 1 else 0 end), 1, 'equipe exclui conta');
reset role;
select pg_temp.igual((select count(*) from auth.users where email='aluna2@x'), 0, 'e-mail liberado em auth.users');
select pg_temp.igual((select count(*) from perfis where id='00000000-0000-0000-0000-0000000000a1'), 0, 'perfil saiu junto');
set role anon;
select pg_temp.tem_de_falhar($$select * from contas_sem_primeiro_acesso()$$, 'visitante listando contas');
select pg_temp.tem_de_falhar($$select excluir_conta('00000000-0000-0000-0000-00000000000b')$$, 'visitante excluindo conta');
reset role;
\echo 'Regras de segurança: tudo como esperado.'
