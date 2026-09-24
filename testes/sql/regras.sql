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
insert into respostas(id,usuario_id,questao_id,area_id,correta,data)
  select 'ra'||g,'00000000-0000-0000-0000-00000000000a','q'||g,'area-cm',g%3<>0,current_date-g from generate_series(1,40) g;
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

set role anon;
select pg_temp.tem_de_falhar($$select count(*) from comentarios$$, 'visitante sem login lendo comentários');
select pg_temp.tem_de_falhar($$select * from notas_do_simulado('Prova X')$$, 'visitante sem login lendo notas');
reset role;
\echo 'Regras de segurança: tudo como esperado.'
