/* Assunto fundido em outro: o que o aluno já tinha gravado com o id antigo
   passa a apontar para o assunto que ficou (aplicarFusoesDeAssuntos, 02). */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(); servidor = await subirServidor(); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

test("respostas, cartões e blocos com o id antigo seguem o assunto que ficou", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  try{
    await pagina.goto(servidor.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof aplicarFusoesDeAssuntos === "function");
    const r = await pagina.evaluate(() => {
      // dois assuntos antigos em cadeia (A → B → destino real), como se a equipe
      // tivesse fundido duas vezes
      const destino = db.taxonomia.assuntos[0];
      const esp = db.taxonomia.especialidades.find(e => e.id === destino.especialidadeId);
      SEED_FUSOES_DE_ASSUNTOS["ass-teste-a"] = "ass-teste-b";
      SEED_FUSOES_DE_ASSUNTOS["ass-teste-b"] = destino.id;
      const outraEsp = db.taxonomia.especialidades.find(e => e.id !== esp.id);
      db.taxonomia.assuntos.push({ id: "ass-teste-a", especialidadeId: outraEsp.id, nome: "Antigo A" });
      db.taxonomia.assuntos.push({ id: "ass-teste-b", especialidadeId: outraEsp.id, nome: "Antigo B" });
      db.respostas.push({ id: "r-teste", usuarioId: "u-x", questaoId: "q-x", areaId: outraEsp.areaId, especialidadeId: outraEsp.id, assuntoId: "ass-teste-a" });
      db.flashcards.push({ id: "c-teste", usuarioId: "u-x", assuntoId: "ass-teste-b", frente: "f", verso: "v" });
      db.estruturaDeTeste = [{ id: "b-teste", assuntoIds: ["ass-teste-a", "ass-teste-b", destino.id] }];   // qualquer lista com assuntoIds
      aplicarFusoesDeAssuntos();
      const resp = db.respostas.find(x => x.id === "r-teste");
      const primeira = aplicarFusoesDeAssuntos();   // uma segunda passada não muda mais nada
      return {
        destinoId: destino.id, espId: esp.id, areaId: esp.areaId,
        resp: { a: resp.assuntoId, e: resp.especialidadeId, ar: resp.areaId },
        cartao: db.flashcards.find(x => x.id === "c-teste").assuntoId,
        bloco: db.estruturaDeTeste[0].assuntoIds,
        restam: db.taxonomia.assuntos.filter(a => a.id.startsWith("ass-teste-")).length,
        segunda: primeira,
      };
    });
    assert.equal(r.resp.a, r.destinoId);
    assert.equal(r.resp.e, r.espId, "a especialidade acompanha o assunto novo");
    assert.equal(r.resp.ar, r.areaId, "a área acompanha o assunto novo");
    assert.equal(r.cartao, r.destinoId);
    assert.deepEqual(r.bloco, [r.destinoId], "ids repetidos viram um só");
    assert.equal(r.restam, 0, "os assuntos antigos saem da árvore");
    assert.equal(r.segunda, 0, "rodar de novo é inofensivo");
  } finally { await contexto.close(); }
});
