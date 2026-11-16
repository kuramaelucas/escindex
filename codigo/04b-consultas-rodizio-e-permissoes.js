/* codigo/04b-consultas-rodizio-e-permissoes.js — consultas por id (getQuestao…), turmas do rodízio e calendário dos grupos, grupos de questões e permissões de administrador (seção 3-B).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ---------------------------- consultas rápidas ---------------------------
   getQuestao() é chamada dentro de laços por quase toda tela (histórico,
   revisão, desempenho, listas da equipe) e varria as 2.700 questões a cada
   chamada. Agora um índice id -> posição responde na hora. Ele não precisa
   ser avisado de nada: a cada consulta confere se a lista é a mesma, do
   mesmo tamanho, e se a posição ainda guarda aquele id — qualquer mudança
   (push, splice, troca da lista, reordenação) só faz o índice ser refeito. */
const _indicesPorId = {};
function buscarPorId(nome, lista, id){
  if(!Array.isArray(lista)) return undefined;
  const c = _indicesPorId[nome];
  if(c && c.lista === lista && c.n === lista.length){
    const i = c.mapa.get(id);
    if(i !== undefined && lista[i] && lista[i].id === id) return lista[i];
    // não está no índice: confere na lista (um splice seguido de push deixa
    // o tamanho igual) e só refaz o índice se o item existir de fato
    if(i === undefined && !lista.some(x => x && x.id === id)) return undefined;
  }
  const mapa = new Map();
  lista.forEach((x, i) => { if(x && !mapa.has(x.id)) mapa.set(x.id, i); });
  _indicesPorId[nome] = { lista, n: lista.length, mapa };
  const i = mapa.get(id);
  return i === undefined ? undefined : lista[i];
}
function getUsuario(id){ return db.usuarios.find(u=>u.id===id); }
function getArea(id){ return db.taxonomia.areas.find(a=>a.id===id); }
function getEspecialidade(id){ return buscarPorId("especialidades", db.taxonomia.especialidades, id); }
function getAssunto(id){ return buscarPorId("assuntos", db.taxonomia.assuntos, id); }
function getQuestao(id){ return buscarPorId("questoes", db.questoes, id); }
function getGrupo(id){ return db.grupos.find(g=>g.id===id); }
function getGrupoOficial(){ return getGrupo(db.grupoOficialId); }
// cada aluno pertence a um grupo/turma (calendário de blocos próprio ou
// compartilhado); quem não tiver grupoId definido usa o calendário oficial
function getGrupoDoUsuario(usuario){
  if(usuario && usuario.grupoId){
    const g = getGrupo(usuario.grupoId) || recriarTurmaDoRodizio(usuario.grupoId);
    if(g) return g;
  }
  return getGrupoOficial();
}
/* TURMAS DO RODÍZIO. Uma por ano e por letra ("4º ano — Grupo C"), abertas:
   entra quem quiser, sem pedir a ninguém — ao contrário das turmas criadas
   por alunos, que têm dono e aprovação. É o que a tela de primeiro acesso
   oferece, porque quem acabou de chegar sabe a própria letra, mas não sabe
   se algum colega já criou a turma dela neste navegador.

   O id diz o ano e o grupo (rodizio-<índice do ano>-<deslocamento>). As
   turmas ainda não sobem para a nuvem, mas o grupo_id da pessoa sobe: em
   outro aparelho, a turma que falta é recriada a partir do id, e a pessoa
   continua no mesmo grupo. */
function idTurmaDoRodizio(ano, deslocamento){
  return "rodizio-" + CONFIG.anosFaculdade.indexOf(ano) + "-" + (parseInt(deslocamento)||0);
}
function turmaDoRodizio(ano, deslocamento){
  const id = idTurmaDoRodizio(ano, deslocamento);
  return getGrupo(id) || recriarTurmaDoRodizio(id);
}
function recriarTurmaDoRodizio(id){
  const m = /^rodizio-(\d+)-(\d+)$/.exec(id || "");
  if(!m) return null;
  const ano = CONFIG.anosFaculdade[parseInt(m[1])];
  const deslocamento = parseInt(m[2]);
  if(!ano || !temCalendarioProprio(ano) || deslocamento >= sequenciaDoAno(ano).length) return null;
  const turma = { id, nome: ano + " — " + nomeRodizio(ano, deslocamento), criadoPor:null, oficial:false, doRodizio:true,
                  publico:true, criadoEm:hojeISO(), anoFaculdade:ano, deslocamento,
                  blocoAtualIdManual:null, membrosAprovados:[], solicitacoesPendentes:[] };
  if(!db.grupos) db.grupos = [];
  db.grupos.push(turma);
  return turma;
}
/* ---------- sequência de blocos do ano + rodízio das turmas ----------------
   A sequência pertence ao ANO DA FACULDADE; o grupo escolhe só onde começa.
   blocosDoGrupo() devolve a lista já girada, no mesmo formato de antes
   ({id, ordem, nome, dataInicio, dataFim, especialidadeIds, subdivisoes}), então todo o
   resto da plataforma continua funcionando sem saber do rodízio. */
function anoDoGrupo(grupo, usuario){
  // o calendário oficial serve a todos os anos: nele, o ano é o de quem olha
  if(grupo && grupo.anoFaculdade) return grupo.anoFaculdade;
  usuario = usuario || usuarioAtual();
  return (usuario && usuario.anoFaculdade) || CONFIG.anoFaculdadePadrao;
}
/* Anos sem calendário próprio (hoje só "Formado(a)"): quem está neles não
   tem sequência de blocos para chamar de sua, então empresta a do ano de
   referência. Isso é o que permite a uma pessoa já formada participar de um
   grupo normalmente — ela acompanha o calendário do ano da turma — sem que a
   coordenação precise manter um calendário de formados que ninguém cursa. */
function temCalendarioProprio(ano){
  return !!ano && !(CONFIG.anosSemCalendario||[]).includes(ano);
}
function anosComCalendario(){
  return CONFIG.anosFaculdade.filter(temCalendarioProprio);
}
function anoDeReferencia(ano){
  return temCalendarioProprio(ano) ? ano : CONFIG.anoFaculdadePadrao;
}
function sequenciaDoAno(ano){
  const seqs = db.sequenciasAno || {};
  const alvo = anoDeReferencia(ano);
  const lista = seqs[alvo] || seqs[CONFIG.anoFaculdadePadrao] || Object.values(seqs)[0] || [];
  return lista.slice().sort((a,b)=>a.ordem-b.ordem);
}
/* ---------- as turmas do rodízio: "Grupo A", "Grupo B"… -------------------
   Uma turma é identificada pelo bloco em que entra na sequência — é o
   `deslocamento`. Pedir esse número à pessoa seria pedir que ela traduzisse
   o calendário impresso da faculdade; ela sabe é que está "no grupo B".

   A ponte entre as duas coisas fica no próprio bloco: `grupoRodizio` na
   posição i da sequência é a letra da turma que COMEÇA ali, ou seja, a turma
   de deslocamento i. No 3º ano a ordem das letras não é alfabética
   (A, D, C, B) porque o calendário real da faculdade é assim — por isso a
   letra é um dado editável, e não uma conta feita a partir do índice. Onde a
   coordenação não tiver preenchido nada, vale a ordem alfabética. */
function letraPadraoRodizio(i){ return String.fromCharCode(65 + (((i%26)+26)%26)); }
function normalizarDeslocamento(deslocamento, tamanho){
  const n = tamanho || 1;
  return (((deslocamento||0) % n) + n) % n;
}

/* ---------- quando o rodízio NÃO é um ciclo ------------------------------
   O 3º ano gira em ciclo: quem entra no segundo bloco segue para o terceiro,
   o quarto, e volta ao primeiro. O 5º ano não — o quadro da faculdade
   emparelha os estágios dois a dois (quem faz Clínica Cirúrgica 1 na
   primeira janela faz a 2 na segunda, e vice-versa) e troca as duas metades
   do ano no meio do caminho. Nenhuma conta a partir do índice reproduz isso.

   Então um bloco pode trazer a LINHA do quadro impresso em `turmasPorJanela`:
   a turma que está NELE em cada janela de data, na ordem das janelas. Onde
   essa linha existe, ela manda; onde não existe, vale o ciclo de sempre.
   As duas formas convivem no mesmo formato de sequência, e nenhuma tela
   precisa saber qual delas o ano usa — todas passam por aqui. */
function turmaDoBlocoNaJanela(bloco, i){
  const linha = bloco && bloco.turmasPorJanela;
  if(!Array.isArray(linha) || !linha[i]) return null;
  return String(linha[i]).trim().toUpperCase();
}
/* O conteúdo que a turma `rotulo` cursa na janela `i`. */
function conteudoDaJanela(seq, rotulo, deslocamento, i){
  const n = seq.length;
  if(!n) return null;
  const doQuadro = seq.find(b => turmaDoBlocoNaJanela(b, i) === rotulo);
  return doQuadro || seq[(i + normalizarDeslocamento(deslocamento, n)) % n];
}
/* Os estágios de dentro de um período (6º ano, Grupo E). Vazio nos anos cujos
   blocos não se subdividem — quem chama só mostra o que vier. */
function subdivisoesDoBloco(bloco){
  return Array.isArray(bloco && bloco.subdivisoes) ? bloco.subdivisoes.filter(Boolean) : [];
}
/* ORDEM DOS ESTÁGIOS, POR PESSOA. No 6º ano cada período tem estágios
   (Emergências Pediátricas, Enfermaria, Neonatal…) e a ordem em que cada
   aluno os cumpre varia dentro da turma. Em vez de criar uma turma nova por
   combinação, a pessoa reordena os SEUS estágios em Meu Grupo, sem sair do
   grupo do rodízio: `usuario.ordemEstagios[idDoBloco] = [nomes na ordem
   dela]`. Estágio que a coordenação renomeou ou tirou depois some da lista
   guardada, e o que ela acrescentou entra no fim — a lista da pessoa nunca
   fica desencontrada do calendário. Só a ordem (e, com ela, as datas de cada
   estágio) é pessoal: o período e as especialidades continuam os da turma. */
function ordemDosEstagios(bloco, usuario){
  const base = subdivisoesDoBloco(bloco);
  const salva = usuario && usuario.ordemEstagios && usuario.ordemEstagios[bloco.id];
  if(!Array.isArray(salva) || !salva.length) return base;
  const validos = salva.filter((nome, i) => base.includes(nome) && salva.indexOf(nome) === i);
  return validos.concat(base.filter(nome => !validos.includes(nome)));
}
/* O tempo do período é repartido em partes iguais entre as subdivisões, em
   dias corridos: o cronograma da faculdade só traz a data do período, e
   dividir igualmente é a regra combinada. Quando a conta não fecha, os dias
   que sobram vão um a um para as primeiras subdivisões, de modo que a soma
   sempre cobre o período inteiro, sem buraco nem sobreposição. As datas saem
   do bloco que se recebe (e não do cadastro), porque no rodízio o conteúdo
   muda de janela. */
function subdivisoesComDatas(bloco){
  const nomes = subdivisoesDoBloco(bloco);
  if(!nomes.length || !bloco.dataInicio || !bloco.dataFim) return nomes.map(nome=>({ nome }));
  const total = diasEntre(bloco.dataInicio, bloco.dataFim) + 1;
  const base = Math.floor(total / nomes.length), sobra = total % nomes.length;
  let inicio = bloco.dataInicio;
  return nomes.map((nome, i) => {
    const dias = base + (i < sobra ? 1 : 0);
    const fim = somarDias(inicio, Math.max(dias, 1) - 1);
    const parte = { nome, dataInicio: inicio, dataFim: fim };
    inicio = somarDias(fim, 1);
    return parte;
  });
}
// a subdivisão em que hoje cai (ou a última/primeira, fora do período)
function subdivisaoAtualDoBloco(bloco){
  const partes = subdivisoesComDatas(bloco).filter(p=>p.dataInicio);
  if(!partes.length) return null;
  const hoje = hojeISO();
  return partes.find(p=>hoje>=p.dataInicio && hoje<=p.dataFim) || null;
}
// "Nome (dd/mm – dd/mm)" — uma linha por subdivisão, já escapada
function subdivisoesEmLinha(bloco, sep){
  return subdivisoesComDatas(bloco).map(p => escapeHtml(p.nome) + (p.dataInicio ? ` <span class="muted">(${formatDataBR(p.dataInicio)} – ${formatDataBR(p.dataFim)})</span>` : "")).join(sep);
}
// as turmas possíveis daquele ano, na ordem em que entram na sequência
function opcoesRodizio(ano){
  const seq = sequenciaDoAno(ano);
  /* Se algum bloco declara a sua turma, só os que declaram são ponto de
     partida: é o ano em que só um grupo foi transcrito (6º ano, Grupo E) e
     inventar letras para os outros períodos criaria turmas que não existem.
     Sem nenhuma letra declarada, vale a ordem alfabética, bloco a bloco. */
  const algumDeclara = seq.some(b => b.grupoRodizio);
  // o quadro da faculdade (turmasPorJanela) também é o calendário impresso: as
  // letras dele são de verdade, mesmo sem grupoRodizio escrito no bloco
  const quadroImpresso = seq.some(b => Array.isArray(b.turmasPorJanela) && b.turmasPorJanela.length);
  const opcoes = [];
  seq.forEach((b,i)=>{
    if(algumDeclara && !b.grupoRodizio) return;
    const rotulo = b.grupoRodizio || letraPadraoRodizio(i);
    opcoes.push({
      deslocamento: i,
      rotulo,
      // a letra vem escrita no bloco (calendário impresso) ou foi só contada?
      // Letra contada não é nome de grupo nenhum — ver tituloOpcaoRodizio
      nomeado: !!b.grupoRodizio || quadroImpresso,
      // por qual estágio essa turma começa o ano — pelo quadro, quando ele
      // existe, e não pela posição na lista
      bloco: conteudoDaJanela(seq, rotulo, i, 0) || b,
    });
  });
  return opcoes;
}
/* A turma de um deslocamento guardado. Se o deslocamento não é mais ponto de
   partida de ninguém (turma criada quando o ano tinha outras letras), ela cai
   na primeira turma do ano em vez de ficar sem calendário. */
function turmaDoDeslocamento(ano, deslocamento){
  const seq = sequenciaDoAno(ano);
  const d = normalizarDeslocamento(deslocamento, seq.length);
  const opcoes = opcoesRodizio(ano);
  return opcoes.find(o=>o.deslocamento===d) || opcoes[0] || { deslocamento: d, rotulo: letraPadraoRodizio(d), nomeado: false };
}
/* As mesmas opções em ordem alfabética de letra — que é como o calendário
   impresso lista as turmas (A, B, C, D) e como a pessoa procura a sua. A
   ordem de deslocamento (a da sequência) continua valendo onde o que importa
   é o calendário, não a turma. */
function opcoesRodizioPorLetra(ano){
  return opcoesRodizio(ano).slice().sort((a,b)=>a.rotulo.localeCompare(b.rotulo, "pt-BR"));
}
function rotuloRodizio(ano, deslocamento){ return turmaDoDeslocamento(ano, deslocamento).rotulo; }
/* GRUPO SEM NOME. Só há "Grupo A, B, C…" onde o calendário da faculdade traz
   essas letras (grupoRodizio no bloco). Onde não traz, a letra é só a ordem
   dos blocos, contada pela plataforma — chamar a turma de "Grupo C" seria
   inventar um nome que ninguém usa. Nesses anos o grupo é identificado pelo
   que de fato o distingue: o BLOCO EM QUE COMEÇA. */
function tituloOpcaoRodizio(o){
  const inicio = o.bloco ? o.bloco.nome : "";
  if(o.nomeado) return "Grupo " + o.rotulo + (inicio ? " — começa em " + inicio : "");
  return inicio ? "Começa em " + inicio : "Grupo " + o.rotulo;
}
// o nome do grupo do rodízio nos textos de tela: "Grupo A" ou "Começa em Cardiologia"
function nomeRodizio(ano, deslocamento){
  const t = turmaDoDeslocamento(ano, deslocamento);
  return t.nomeado || !t.bloco ? "Grupo " + t.rotulo : "Começa em " + t.bloco.nome;
}
/* CALENDÁRIO PRÓPRIO DO GRUPO. Além de seguir o rodízio de um ano, um grupo
   pode ter blocos só dele (`blocosProprios`: nome, datas e especialidades,
   montados por quem o criou). Lista vazia vale: é o grupo que existe só para
   dividir questões, sem calendário. */
function grupoComCalendarioProprio(grupo){ return !!grupo && Array.isArray(grupo.blocosProprios); }
function blocosDoGrupo(grupo, usuario){
  if(grupoComCalendarioProprio(grupo)){
    return grupo.blocosProprios.slice().sort((a,b)=>a.dataInicio.localeCompare(b.dataInicio))
      .map((b,i)=>({ id:b.id, nome:b.nome, especialidadeIds:b.especialidadeIds||[], subdivisoes:[], ordem:i+1, dataInicio:b.dataInicio, dataFim:b.dataFim }));
  }
  const ano = anoDoGrupo(grupo, usuario);
  // quem já se formou não tem calendário de faculdade: sem turma de um ano e
  // sem grupo com calendário próprio, não há bloco nenhum para seguir
  if(!temCalendarioProprio(ano)) return [];
  const seq = sequenciaDoAno(ano);
  const n = seq.length;
  if(!n) return [];
  const { deslocamento, rotulo } = turmaDoDeslocamento(ano, grupo && grupo.deslocamento);
  // cada janela de data recebe o conteúdo que o quadro do ano põe nela para
  // esta turma — ou, onde não há quadro, o bloco que está "deslocamento"
  // posições à frente: é o rodízio em ciclo, mesma sequência, começos diferentes
  return seq.map((janela, i) => {
    const conteudo = conteudoDaJanela(seq, rotulo, deslocamento, i);
    return {
      id: conteudo.id, nome: conteudo.nome, especialidadeIds: conteudo.especialidadeIds,
      subdivisoes: ordemDosEstagios(conteudo, usuario || usuarioAtual()),
      ordem: i+1, dataInicio: janela.dataInicio, dataFim: janela.dataFim,
    };
  });
}
/* DOIS LUGARES POR PESSOA. O grupo do CALENDÁRIO (usuario.grupoId: rodízio ou
   calendário próprio) é um só — é o que a turma da vida real é, e entrar
   num grupo é também SAIR do anterior, senão a pessoa ficava listada em três
   turmas ao mesmo tempo. Além dele, a pessoa pode estar em UM grupo só de
   QUESTÕES (usuario.grupoQuestoesId): esse não mexe no calendário, serve só
   para compartilhar e dividir questões e cartões. O calendário oficial é a
   ausência de turma, então não tem lista de membros. */
function getGrupoQuestoesDoUsuario(usuario){
  if(!usuario || !usuario.grupoQuestoesId || usuario.grupoQuestoesId === usuario.grupoId) return null;
  const g = getGrupo(usuario.grupoQuestoesId);
  if(!g || g.oficial) return null;
  return g.criadoPor === usuario.id || (g.membrosAprovados||[]).includes(usuario.id) ? g : null;
}
// os grupos de verdade da pessoa (sem o calendário oficial): o do calendário e o de questões
function gruposDoUsuario(usuario){
  const principal = getGrupoDoUsuario(usuario);
  return [principal.oficial ? null : principal, getGrupoQuestoesDoUsuario(usuario)].filter(Boolean);
}
/* Onde caem as questões e os cartões "do meu grupo" quando só há um destino:
   o grupo do calendário, ou — quem não tem um — o de questões. */
function grupoPrincipalDeQuestoes(usuario){ return gruposDoUsuario(usuario)[0] || getGrupoOficial(); }
/* Destino "do meu grupo" ao enviar questões: "grupo" é o principal e "grupo2"
   o segundo, para quem está em dois. Cada opção diz o nome do grupo, porque
   é a pessoa quem escolhe para qual dos dois a questão vai.
   Só entram os grupos para os quais o envio funciona: com a nuvem ligada, a
   questão de um grupo que só existe neste navegador nunca chegaria aos colegas
   (ver questaoSobeParaNuvem). Sem grupo nenhum não há destino "do grupo" —
   antes ele caía no calendário oficial e a questão ficava presa no aparelho
   enquanto a tela prometia que o grupo a receberia. */
function gruposParaEnviarQuestoes(usuario){
  return gruposDoUsuario(usuario).filter(g => !nuvemConectado() || grupoDeNuvem(g));
}
function destinoEhGrupo(destino){ return destino === "grupo" || destino === "grupo2"; }
function grupoDoDestino(usuario, destino){
  const gs = gruposParaEnviarQuestoes(usuario);
  return (destino === "grupo2" ? gs[1] : gs[0]) || null;
}
function valorDoDestinoDoGrupo(usuario, grupoId){
  const i = gruposParaEnviarQuestoes(usuario).findIndex(g => g.id === grupoId);
  return i < 0 ? "" : (i ? "grupo2" : "grupo");
}
function opcoesDeDestinoDeGrupo(usuario, textoUnico, textoDoGrupo){
  const gs = gruposParaEnviarQuestoes(usuario);
  if(!gs.length) return [];
  if(gs.length < 2) return [["grupo", textoUnico]];
  return gs.map((g, i) => [i ? "grupo2" : "grupo", textoDoGrupo(g)]);
}
function idsDosGruposDoUsuario(usuario){ return gruposDoUsuario(usuario).map(g => g.id); }
/* Quem sai de um grupo (ou é retirado dele) perde o acesso às questões dele na
   nuvem, mas o aparelho nunca recebe esse aviso: a linha deixa de descer e a
   cópia local ficava para sempre. Só as que já subiram são soltas — a que
   ainda está só aqui é de quem a escreveu. */
function soltarQuestoesDoGrupo(grupoId, todas){
  db.questoes = db.questoes.filter(q => !(q.grupoId === grupoId && (todas || q.naNuvem)));
}
function tirarDosGrupos(usuario, manter){
  const eu = typeof euNaNuvem === "function" && nuvemConectado() ? euNaNuvem() : null;
  (db.grupos||[]).forEach(g => {
    if(g.oficial || manter.includes(g.id)) return;
    if(eu && eu.id === usuario.id && (g.membrosAprovados||[]).includes(usuario.id)) soltarQuestoesDoGrupo(g.id);
    g.membrosAprovados = (g.membrosAprovados||[]).filter(id => id !== usuario.id);
    g.solicitacoesPendentes = (g.solicitacoesPendentes||[]).filter(id => id !== usuario.id);
  });
}
/* `opcoes.soQuestoes`: entra como grupo de questões, sem tocar no calendário
   (e sai do grupo de questões anterior). Sem ela, é o grupo do calendário, e
   o de questões só se mantém se for outro grupo. */
function entrarNoGrupo(usuario, grupoId, opcoes){
  if(!usuario) return;
  const destino = getGrupo(grupoId);
  const soQuestoes = !!(opcoes && opcoes.soQuestoes) && !!destino && !destino.oficial;
  // `manterAtual`: o grupo do calendário de agora passa a ser o de questões (ver 10b, oferecerManterGrupoAtualComoDeQuestoes)
  const atual = getGrupo(usuario.grupoId);
  const extra = soQuestoes ? null
    : (opcoes && opcoes.manterAtual && atual && !atual.oficial && !atual.doRodizio && atual.id !== grupoId) ? atual
    : getGrupoQuestoesDoUsuario(usuario);
  const manter = soQuestoes ? [usuario.grupoId, grupoId] : [grupoId, extra && extra.id !== grupoId ? extra.id : null];
  tirarDosGrupos(usuario, manter);
  if(destino && !destino.oficial){
    if(!destino.membrosAprovados) destino.membrosAprovados = [];
    if(!destino.membrosAprovados.includes(usuario.id)) destino.membrosAprovados.push(usuario.id);
    destino.solicitacoesPendentes = (destino.solicitacoesPendentes||[]).filter(id => id !== usuario.id);
  }
  if(soQuestoes){ usuario.grupoQuestoesId = destino.id; return; }
  usuario.grupoId = destino ? destino.id : db.grupoOficialId;
  if(extra && extra.id !== usuario.grupoId) usuario.grupoQuestoesId = extra.id; else delete usuario.grupoQuestoesId;
}
function sairDoGrupoDeQuestoes(usuario){
  const g = getGrupoQuestoesDoUsuario(usuario);
  delete usuario.grupoQuestoesId;
  tirarDosGrupos(usuario, [usuario.grupoId]);
  return g;
}
function especialidadeDeAssunto(assuntoId){ const a=getAssunto(assuntoId); return a ? getEspecialidade(a.especialidadeId) : null; }
function areaDeAssunto(assuntoId){ const e=especialidadeDeAssunto(assuntoId); return e ? getArea(e.areaId) : null; }
function nomeAssunto(id){ const a=getAssunto(id); return a ? a.nome : "—"; }
function nomeEspecialidade(id){ const e=getEspecialidade(id); return e ? e.nome : "—"; }
function nomeArea(id){ const a=getArea(id); return a ? a.nome : "—"; }
/* ---------------------------- PERMISSÕES DE ADMIN -------------------------
   Cada nível de administrador enxerga e altera apenas o que lhe cabe. Para
   mudar o que um nível pode fazer, basta acrescentar ou remover chaves aqui. */
const PERMISSOES_ADMIN = {
  master:      ["conteudo","cadastros","usuarios","blocos","config","livro-ouro","backup","taxonomia","turma","avisos"],
  coordenacao: ["conteudo","cadastros","blocos","livro-ouro","taxonomia","turma","avisos"],
  moderador:   ["conteudo","taxonomia"],
};
// rotas que exigem uma permissão específica de administrador
const PERMISSAO_DA_ROTA = {
  "usuarios":"usuarios", "config-geral":"config", "blocos":"blocos",
  "aprovar-cadastros":"cadastros", "feedback-usuarios":"cadastros", "taxonomia":"taxonomia",
  "material-pdf":"conteudo", "central-provas":"conteudo", "painel-turma":"turma",
  "atualizar-questoes":"conteudo", "pendencias-conteudo":"conteudo", "enviar-avisos":"avisos",
};
function nivelAdminDe(usuario){
  if(!usuario || usuario.papel!=="admin") return null;
  return usuario.nivelAdmin || "coordenacao";
}
function rotuloNivelAdmin(nivel){
  const n = CONFIG.niveisAdmin.find(x=>x.id===nivel);
  return n ? n.nome : "Administrador";
}
function podeAdmin(chave, usuario){
  usuario = usuario || usuarioAtual();
  if(!usuario) return false;
  if(usuario.papel!=="admin") return false;
  return (PERMISSOES_ADMIN[nivelAdminDe(usuario)] || []).includes(chave);
}
// professores também mexem em conteúdo e taxonomia; admins dependem do nível
function podeGerirConteudo(usuario){
  usuario = usuario || usuarioAtual();
  if(!usuario) return false;
  if(usuario.papel==="professor") return true;
  return podeAdmin("conteudo", usuario);
}
function usuarioAtual(){ return state.usuarioAtualId ? getUsuario(state.usuarioAtualId) : null; }
