/* Aluno de outra faculdade: o rodízio e o calendário oficial são da faculdade
   do calendário (CONFIG.faculdadeDoCalendario) e não podem ditar a matéria da
   sessão dele. Em Meu Grupo ele cria um grupo com calendário próprio, com a
   escola no nome e, se quiser, com os blocos copiados de um colega. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, srv;
before(async () => { navegador = await chromium.launch(process.env.ESC_CHROMIUM ? { executablePath: process.env.ESC_CHROMIUM } : {}); srv = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await srv?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  await pagina.goto(srv.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function" && typeof iniciarBanco === "function" && db.questoes && db.questoes.length > 0);
  return { pagina, contexto };
}

test("aluno de outra faculdade não herda o calendário oficial e cria grupo com calendário próprio copiado", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      window.confirm = () => true;
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      u.anoFaculdade = "5º ano";
      const comCalendario = !!getBlocoAtual(u);
      u.faculdade = "UEL";
      const semBloco = getBlocoAtual(u) === null;
      const sessao = montarSessaoRecomendada(u.id, 10);
      const semBlocoNaSessao = !sessao.some(it => it.origem === "bloco_atual" || it.origem === "previa");
      // um colega da UEL já montou o calendário
      const hoje = hojeISO();
      db.grupos.push({ id: "grupo-colega", nome: "Internato UEL", criadoPor: "outro", oficial: false, publico: true, criadoEm: hoje, faculdade: "UEL",
        blocoAtualIdManual: null, membrosAprovados: [], solicitacoesPendentes: [],
        blocosProprios: [{ id: "bp1", nome: "Pediatria", dataInicio: somarDias(hoje, -10), dataFim: somarDias(hoje, 20), especialidadeIds: [db.taxonomia.especialidades[0].id] }] });
      navigate("meu-grupo");
      const tela = document.getElementById("app").innerText;
      const opcoesTipo = [...document.getElementById("novoGrupoTipo").options].map(o => o.value);
      const listaTemRodizio = [...document.querySelectorAll(".item-grupo")].some(el => /rodizio/.test(el.innerHTML) && /Turma do rodízio/.test(el.innerText));
      document.getElementById("novoGrupoNome").value = "Minha turma";
      document.getElementById("novoGrupoCopiar").value = "grupo-colega";
      criarMeuGrupo();
      const g = getGrupoDoUsuario(u);
      const bloco = getBlocoAtual(u);
      return { comCalendario, semBloco, semBlocoNaSessao, avisa: /não valem para você/.test(tela), opcoesTipo, listaTemRodizio,
        grupo: { nome: g.nome, faculdade: g.faculdade, blocos: g.blocosProprios.length, idNovo: g.blocosProprios[0].id !== "bp1" },
        bloco: bloco && bloco.nome, linha: linhaDoGrupo(g).dados.faculdade };
    });
    assert.equal(r.comCalendario, true);
    assert.equal(r.semBloco, true);
    assert.equal(r.semBlocoNaSessao, true);
    assert.equal(r.avisa, true);
    assert.deepEqual(r.opcoesTipo, ["proprio"]);
    assert.equal(r.listaTemRodizio, false);
    assert.deepEqual(r.grupo, { nome: "Minha turma", faculdade: "UEL", blocos: 1, idNovo: true });
    assert.equal(r.bloco, "Pediatria");
    assert.equal(r.linha, "UEL");
  } finally { await contexto.close(); }
});

test("calendário próprio que já terminou deixa de ter bloco atual", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const hoje = hojeISO();
      const g = { id: "grupo-velho", nome: "Antigo", criadoPor: usuarioAtual().id, oficial: false, publico: true, criadoEm: hoje,
        blocoAtualIdManual: null, membrosAprovados: [usuarioAtual().id], solicitacoesPendentes: [],
        blocosProprios: [{ id: "b1", nome: "Cardio", dataInicio: somarDias(hoje, -60), dataFim: somarDias(hoje, -30), especialidadeIds: [db.taxonomia.especialidades[0].id] }] };
      db.grupos.push(g);
      const antes = blocoAtualDoGrupo(g, usuarioAtual());
      g.blocosProprios[0].dataFim = somarDias(hoje, 5);
      const durante = blocoAtualDoGrupo(g, usuarioAtual());
      return { antes, durante: durante && durante.nome };
    });
    assert.equal(r.antes, null);
    assert.equal(r.durante, "Cardio");
  } finally { await contexto.close(); }
});
