/* A ferramenta `npm run reposicoes` e a regra de que toda reposição aponta para uma original que existe. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { analisar } from "../ferramentas/reposicoes.mjs";

test("toda reposição aponta para uma original anulada ou desatualizada que existe", () => {
  const R = analisar();
  assert.deepEqual(R.orfas, [], "reposição sem original");
  for(const [id, { q }] of R.reposicoes){
    const original = R.porId.get(id).q;
    assert.ok(["anulada", "desatualizada"].includes(original.status), `${id}: a original precisa estar anulada ou desatualizada`);
    assert.equal(q.real, false, `${q.id}: reposição não é questão real da banca`);
    assert.equal(q.id, id + "-ia", `${q.id}: id da reposição = id da original + -ia`);
    assert.equal(q.assuntoId, original.assuntoId, `${q.id}: mesmo assunto da original`);
    // reposição ativa chega ao aluno: referência lida e datada. Em rascunho (sem a leitura) não chega.
    if(q.status === "ativa") assert.ok(q.referencias && /\d{2}\/\d{2}\/\d{4}/.test(q.referencias), `${q.id}: referência com data`);
    else assert.ok(q.motivoStatus, `${q.id}: reposição fora de "ativa" precisa dizer por quê (motivoStatus)`);
  }
});

test("a ferramenta resume, lista as pendentes e mostra uma questão lado a lado", () => {
  const rodar = (...a) => execFileSync("node", ["ferramentas/reposicoes.mjs", ...a], { encoding: "utf8" });
  assert.match(rodar(), /Com reposição: \d+/);
  assert.match(rodar("pendentes"), /questão\(ões\)\./);
  assert.match(rodar("q-amrigs2021-072"), /REPOSIÇÃO/);
});
