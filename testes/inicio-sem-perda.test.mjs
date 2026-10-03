/* Início do aluno enxuto: reorganizar não pode tirar informação da tela.
   Tudo que o Início mostrava continua nele (as subdivisões do bloco, atrás de
   um "ver"), e o aluno sem bloco continua sendo convidado a entrar num grupo. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

test("Início do aluno mantém meta, sequência, acerto, revisão, subdivisões e rodapé", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await contexto.newPage();
    await pagina.goto(semNuvem.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    const r = await pagina.evaluate(() => {
      fazerLogin("aluno@esc.demo", "aluno123"); fecharModal(); navigate("inicio");
      const pg = document.getElementById("conteudoPagina");
      const bloco = getBlocoAtual();
      return { texto: pg.innerText, temDetalhes: !!pg.querySelector(".detalhes-bloco"), temSub: !!(bloco && subdivisoesDoBloco(bloco).length),
        detalhesTexto: pg.querySelector(".detalhes-bloco")?.textContent || "", botao: !!pg.querySelector("button[onclick^='iniciarSessaoRecomendada']") };
    });
    for(const trecho of [/Bloco atual:/, /\d+\/\d+\s*questões hoje/, /dia\(s\) seguidos estudando/, /acerto geral/, /assunto\(s\) para revisar hoje/,
      /Sugestões de assuntos para melhorar/, /Revisão pendente/, /Livro de Ouro/, /Enviar feedback/]) assert.match(r.texto, trecho);
    assert.ok(r.botao, "o botão Começar agora segue na tela");
    if(r.temSub){ assert.ok(r.temDetalhes); assert.match(r.detalhesTexto, /tempo dividido igualmente/); }
  } finally { await contexto.close(); }
});
