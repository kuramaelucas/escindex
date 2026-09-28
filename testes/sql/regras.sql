-- As regras de segurança do nuvem/esquema.sql, conferidas com contas de
-- mentira. Qualquer resultado diferente do esperado derruba o teste.
\set ON_ERROR_STOP 1
insert into auth.users(id,email,raw_user_meta_data) values
 ('00000000-0000-0000-0000-00000000000a','aluna@x','{"nome":"Aluna A","ano_faculdade":"3º ano"}'),
 ('00000000-0000-0000-0000-00000000000b','aluno@x','{"nome":"Aluno B","ano_faculdade":"4º ano"}'),
 ('00000000-0000-0000-0000-00000000000c','prof@x','{"nome":"Prof C"}'),
 ('00000000-0000-0000-0000-00000000000d','res@x','{"nome":"Res D"}');
update perfis set status='aprovado';
update perfis set papel='professor' where email='prof@x';
update perfis set papel='residente' where email='res@x';
-- a data de Brasília, como painel_turma() conta: com current_date (UTC), o
-- teste falhava entre 0h e 3h UTC, quando os dois calendários divergem
insert into respostas(id,usuario_id,questao_id,area_id,correta,data)
  select 'ra'||g,'00000000-0000-0000-0000-00000000000a','q'||g,'area-cm',g%3<>0,(now() at time zone 'America/Sao_Paulo')::date-g from generate_series(1,40) g;
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
select pg_temp.igual((select count(*) from notas_do_simulado('Prova X')), 2, 'percentil enxerga as notas da turma');
select pg_temp.igual((select count(*) from respostas where usuario_id='00000000-0000-0000-0000-00000000000b'), 0, 'aluno não lê respostas dos outros');
insert into comentarios(id,questao_id,usuario_id,autor_nome,texto) values ('c1','q1','00000000-0000-0000-0000-00000000000a','Aluna A','dúvida');
select pg_temp.tem_de_falhar($$insert into comentarios(id,questao_id,usuario_id,texto) values ('c2','q1','00000000-0000-0000-0000-00000000000b','x')$$, 'comentário em nome de outra pessoa');
select pg_temp.tem_de_falhar($$insert into comentarios(id,questao_id,usuario_id,texto,resposta_oficial) values ('c3','q1','00000000-0000-0000-0000-00000000000a','x',true)$$, 'aluno dando resposta oficial');
select pg_temp.tem_de_falhar($$update comentarios set resposta_oficial=true where id='c1'$$, 'aluno virando o próprio comentário em oficial');
select pg_temp.tem_de_falhar($$update perfis set papel='admin' where id='00000000-0000-0000-0000-00000000000a' returning case when papel='admin' then 1/0 end$$, 'aluno se promovendo');

select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000d',false);
insert into comentarios(id,questao_id,usuario_id,autor_nome,texto,resposta_oficial) values ('c4','q1','00000000-0000-0000-0000-00000000000d','Res D','resposta',true);
select pg_temp.igual((select count(*) from painel_turma()), 0, 'residente não vê o painel da turma');

select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-00000000000c',false);
select pg_temp.igual((select count(*) from painel_turma()), 2, 'professor vê os dois alunos');
select pg_temp.igual((select respostas from painel_turma() where nome='Aluna A'), 40, 'painel soma as respostas');
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

set role anon;
select pg_temp.tem_de_falhar($$select count(*) from questoes_enviadas$$, 'visitante sem login lendo questões enviadas');
select pg_temp.tem_de_falhar($$select count(*) from comentarios$$, 'visitante sem login lendo comentários');
select pg_temp.tem_de_falhar($$select count(*) from feedbacks$$, 'visitante sem login lendo feedback');
select pg_temp.tem_de_falhar($$select count(*) from correcoes_questoes$$, 'visitante sem login lendo correções');
select pg_temp.tem_de_falhar($$select * from notas_do_simulado('Prova X')$$, 'visitante sem login lendo notas');
reset role;
\echo 'Regras de segurança: tudo como esperado.'
