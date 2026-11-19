/* Redesenho em segundo plano (sincronização, texto das questões chegando) não
   pode apagar o que a pessoa marcou nos filtros; o redesenho pedido por clique
   continua mandando na tela. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

test("filtros marcados sobrevivem ao redesenho em segundo plano", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  try {
    await contexto.route(/supabase\.co/, r => r.abort());
    const pagina = await contexto.newPage();
    await pagina.goto(semNuvem.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); navigate("estudar"); });
    const antes = await pagina.evaluate(() => {
      const caixa = document.querySelector(".filtroAno, #filtroApenasErros");
      if(!caixa) return null;
      caixa.checked = true;
      renderEmSegundoPlano();
      const de_novo = document.querySelector(caixa.id ? "#" + caixa.id : ".filtroAno[value='" + caixa.value + "']");
      return de_novo.checked;
    });
    assert.notEqual(antes, null, "tela de montagem sem filtros para testar");
    assert.equal(antes, true, "a caixa marcada continua marcada depois do redesenho em segundo plano");
  } finally { await contexto.close(); }
});
