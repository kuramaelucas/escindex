/* O grupo só de questões não pode sumir sozinho: nem com um perfil antigo
   descendo da nuvem antes da escolha subir, nem quando o dono aprova outra
   pessoa que já está em outro grupo. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  await pagina.goto(semNuvem.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto };
}

test("perfil antigo da nuvem não devolve o grupo do calendário e esconde o de questões", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      db.grupos.push({ id: "gB", nome: "B", criadoPor: u.id, publico: true, membrosAprovados: [u.id], solicitacoesPendentes: [] });
      // o grupo B era o do calendário e acabou de virar "só de questões"
      u.grupoId = "gB";
      u.grupoQuestoesId = "gB"; u.grupoId = db.grupoOficialId;
      db.nuvem = db.nuvem || {};
      db.nuvem.perfilEnviado = JSON.stringify({ ...linhaDoPerfil(u), grupo_id: "gB", grupo_questoes_id: null });   // o que a nuvem sabe
      nuvemAplicarPerfilLocal({ id: u.id, nome: u.nome, grupo_id: "gB", grupo_questoes_id: null });
      const depoisDoAntigo = { grupoId: u.grupoId, gq: u.grupoQuestoesId, ok: !!getGrupoQuestoesDoUsuario(u) };
      // perfil incoerente (os dois iguais) também não derruba
      db.nuvem.perfilEnviado = JSON.stringify(linhaDoPerfil(u));
      nuvemAplicarPerfilLocal({ id: u.id, nome: u.nome, grupo_id: "gB", grupo_questoes_id: "gB" });
      return { depoisDoAntigo, ok2: !!getGrupoQuestoesDoUsuario(u), grupoId: u.grupoId };
    });
    assert.deepEqual(r.depoisDoAntigo, { grupoId: "grupo-oficial", gq: "gB", ok: true });
    assert.equal(r.ok2, true);
    assert.equal(r.grupoId, "grupo-oficial");
  } finally { await contexto.close(); }
});

test("aprovar quem veio da nuvem não tira a pessoa dos outros grupos", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const dono = usuarioAtual();
      db.usuarios.push({ id: "colega", nome: "Colega", email: "c@x", matricula: "c", papel: "aluno", status: "aprovado", daNuvem: true });
      db.grupos.push({ id: "gOutro", nome: "Outro", criadoPor: "terceiro", publico: true, membrosAprovados: ["colega"], solicitacoesPendentes: [] });
      db.grupos.push({ id: "gMeu", nome: "Meu", criadoPor: dono.id, publico: true, membrosAprovados: [], solicitacoesPendentes: ["colega"] });
      aprovarAcessoGrupo("gMeu", "colega");
      return { noOutro: getGrupo("gOutro").membrosAprovados.includes("colega"), noMeu: getGrupo("gMeu").membrosAprovados.includes("colega") };
    });
    assert.deepEqual(r, { noOutro: true, noMeu: true });
  } finally { await contexto.close(); }
});
