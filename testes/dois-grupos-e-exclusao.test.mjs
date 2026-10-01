/* Dois grupos por pessoa (o do calendário e um só de questões) e exclusão de
   grupo: quem criou o grupo o exclui — e sair dele, para o dono, é excluir. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, srv;
before(async () => { navegador = await chromium.launch(); srv = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await srv?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  await pagina.goto(srv.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto };
}

test("o grupo do rodízio e um grupo só de questões convivem; o calendário não muda", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      window.confirm = () => true;
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      u.anoFaculdade = "4º ano";
      entrarNaTurmaDoRodizio(2);
      const turma = u.grupoId;
      const blocoAntes = getBlocoAtual(u).id;
      // um grupo só de questões, criado pela tela
      navigate("meu-grupo");
      document.getElementById("novoGrupoTipo").value = "questoes";
      document.getElementById("novoGrupoNome").value = "Lista da dupla";
      criarMeuGrupo();
      const g = getGrupoQuestoesDoUsuario(u);
      const depoisDeCriar = { turmaIgual: u.grupoId === turma, bloco: getBlocoAtual(u).id === blocoAntes, nome: g && g.nome, grupos: gruposDoUsuario(u).length,
        aindaMembroDaTurma: (getGrupo(turma).membrosAprovados || []).includes(u.id) };
      // a questão enviada ao segundo grupo é visível para quem está nele
      const q = Object.assign({}, db.questoes.find(x => x.status === "ativa" && x.real), { id: "q-do-grupo-2", grupoId: g.id });
      db.questoes.push(q);
      const vista = questoesParaEstudo(u.id, idsDosGruposDoUsuario(u)).some(x => x.id === q.id);
      const escondida = questoesParaEstudo(u.id).some(x => x.id === q.id);
      const tela = document.getElementById("app").innerText;
      // trocar o grupo do calendário não derruba o de questões
      entrarNaTurmaDoRodizio(3);
      const trocou = { questoes: getGrupoQuestoesDoUsuario(u) && getGrupoQuestoesDoUsuario(u).id === g.id, turmaNova: u.grupoId !== turma };
      // sair do grupo de questões: o dono o exclui
      sairDoGrupoDeQuestoesPelaTela();
      return { depoisDeCriar, vista, escondida, telaTemGrupoQ: /Grupo só de questões/.test(tela), trocou,
        excluido: !getGrupo(g.id), semGrupoQ: !u.grupoQuestoesId, calendarioMantido: u.grupoId !== db.grupoOficialId };
    });
    assert.deepEqual(r.depoisDeCriar, { turmaIgual: true, bloco: true, nome: "Lista da dupla", grupos: 2, aindaMembroDaTurma: true });
    assert.equal(r.vista, true);
    assert.equal(r.escondida, false);
    assert.equal(r.telaTemGrupoQ, true);
    assert.deepEqual(r.trocou, { questoes: true, turmaNova: true });
    assert.equal(r.excluido, true);
    assert.equal(r.semGrupoQ, true);
    assert.equal(r.calendarioMantido, true);
  } finally { await contexto.close(); }
});

test("pedido 'só questões' é aprovado como grupo de questões; quem criou exclui o grupo e todos saem dele", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      window.confirm = () => true;
      fazerLoginDemo("aluno"); fecharModal();
      const dono = usuarioAtual();
      dono.anoFaculdade = "4º ano";
      const colega = { id: "u-colega", papel: "aluno", nome: "Colega", status: "aprovado", anoFaculdade: "4º ano" };
      db.usuarios.push(colega);
      entrarNaTurmaDoRodizio(1);
      colega.grupoId = dono.grupoId;
      const grupo = { id: "grupo-excluir", nome: "Grupo A", criadoPor: dono.id, criadoPorNome: dono.nome, oficial: false, publico: true, criadoEm: hojeISO(),
        membrosAprovados: [], solicitacoesPendentes: [], blocosProprios: [] };
      db.grupos.push(grupo);
      // o colega pede só para questões, o dono aprova
      const eu = state.usuarioId;
      colega.pedidoSoQuestoes = { [grupo.id]: true };
      grupo.solicitacoesPendentes.push(colega.id);
      aprovarAcessoGrupo(grupo.id, colega.id);
      const aprovado = { slot: colega.grupoQuestoesId, calendario: colega.grupoId !== grupo.id };
      db.subgrupos.push({ id: "sg-x", grupoId: grupo.id, nome: "x", criadoPor: dono.id, membros: [dono.id], questaoIds: [] });
      const antes = { podeDono: podeExcluirGrupo(grupo, dono), podeColega: podeExcluirGrupo(grupo, colega), podeRodizio: podeExcluirGrupo(getGrupo(dono.grupoId), dono) };
      excluirGrupo(grupo.id);
      return { aprovado, antes, sumiu: !getGrupo(grupo.id), colegaLivre: !colega.grupoQuestoesId, subgrupos: db.subgrupos.some(s => s.grupoId === grupo.id) };
    });
    assert.deepEqual(r.aprovado, { slot: "grupo-excluir", calendario: true });
    assert.deepEqual(r.antes, { podeDono: true, podeColega: false, podeRodizio: false });
    assert.equal(r.sumiu, true);
    assert.equal(r.colegaLivre, true);
    assert.equal(r.subgrupos, false);
  } finally { await contexto.close(); }
});

test("o dono que 'sai' do grupo do calendário o exclui; quem só é membro apenas sai", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      window.confirm = () => true;
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      u.anoFaculdade = "4º ano";
      navigate("meu-grupo");
      document.getElementById("novoGrupoTipo").value = "proprio";
      document.getElementById("novoGrupoNome").value = "Meu grupo";
      criarMeuGrupo();
      const id = u.grupoId;
      sairDoMeuGrupo();
      const dono = { excluido: !getGrupo(id), oficial: u.grupoId === db.grupoOficialId };
      const g2 = { id: "g-alheio", nome: "Alheio", criadoPor: "outra-pessoa", oficial: false, membrosAprovados: [u.id], solicitacoesPendentes: [], blocosProprios: [] };
      db.grupos.push(g2); u.grupoId = g2.id;
      sairDoMeuGrupo();
      return { dono, membro: { existe: !!getGrupo("g-alheio"), saiu: !g2.membrosAprovados.includes(u.id) } };
    });
    assert.deepEqual(r.dono, { excluido: true, oficial: true });
    assert.deepEqual(r.membro, { existe: true, saiu: true });
  } finally { await contexto.close(); }
});

test("quem está num grupo e escolhe a turma do rodízio pode ficar no grupo antigo só para questões", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      u.anoFaculdade = "4º ano";
      navigate("meu-grupo");
      document.getElementById("novoGrupoTipo").value = "proprio";
      document.getElementById("novoGrupoNome").value = "Grupo A";
      criarMeuGrupo();
      const grupoA = u.grupoId;
      // recusar: comportamento de sempre, o grupo antigo sai
      window.confirm = () => false;
      entrarNaTurmaDoRodizio(1);
      const recusou = { questoes: u.grupoQuestoesId || null, turma: u.grupoId !== grupoA };
      // aceitar: os dois valem
      u.grupoId = grupoA; delete u.grupoQuestoesId;
      window.confirm = () => true;
      entrarNaTurmaDoRodizio(1);
      const aceitou = { questoes: u.grupoQuestoesId, turma: u.grupoId !== grupoA && /^rodizio-/.test(u.grupoId), grupos: gruposDoUsuario(u).length };
      // o botão "passar para só questões" faz o mesmo no sentido contrário
      u.grupoId = grupoA; delete u.grupoQuestoesId;
      passarGrupoParaSoQuestoes();
      const passou = { questoes: u.grupoQuestoesId, calendario: u.grupoId === db.grupoOficialId };
      return { recusou, aceitou, passou, grupoA };
    });
    assert.deepEqual(r.recusou, { questoes: null, turma: true });
    assert.deepEqual(r.aceitou, { questoes: r.grupoA, turma: true, grupos: 2 });
    assert.deepEqual(r.passou, { questoes: r.grupoA, calendario: true });
  } finally { await contexto.close(); }
});
