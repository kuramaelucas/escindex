/* Todo campo de formulário tem nome para leitor de tela: nas telas públicas, em
   toda rota do menu de cada papel e nas janelas. Um rótulo que não está ligado
   ao campo faz o leitor anunciar só "caixa de edição". */
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

// campos de #app (ou da raiz dada) sem rótulo ligado, aria-label ou aria-labelledby
function camposSemNome(raiz){
  return [...document.querySelectorAll(raiz + " input:not([type=hidden]), " + raiz + " select, " + raiz + " textarea")].filter(c => {
    if(c.getAttribute("aria-label") || c.getAttribute("aria-labelledby") || c.closest("label")) return false;
    if(c.id && document.querySelector('label[for="' + c.id + '"]')) return false;
    return true;
  }).map(c => c.tagName.toLowerCase() + "#" + (c.id || "") + "." + String(c.className).slice(0, 30));
}

test("telas públicas: cada campo tem nome e clicar no rótulo foca o campo", async () => {
  const { pagina, contexto } = await abrir();
  try {
    for(const rota of ["login", "cadastro"]){
      const sem = await pagina.evaluate(([rota, f]) => { navigate(rota); return eval("(" + f + ")")("#app"); }, [rota, camposSemNome.toString()]);
      assert.deepEqual(sem, [], "campos sem nome em " + rota);
    }
    await pagina.evaluate(() => navigate("login"));
    await pagina.click("label:has-text('Senha')");
    assert.equal(await pagina.evaluate(() => document.activeElement && document.activeElement.type), "password");
  } finally { await contexto.close(); }
});

test("toda rota do menu de cada papel está sem campo anônimo", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const contas = [["admin@esc.demo", "admin123"], ["professor@esc.demo", "prof123"], ["aluno@esc.demo", "aluno123"]];
    const achados = [];
    for(const [email, senha] of contas){
      const rotas = await pagina.evaluate(([e, s]) => {
        fazerLogin(e, s); fecharModal();
        return [...new Set(navItemsParaPapel(usuarioAtual().papel).flatMap(g => (g.itens || [g]).map(i => i.id)).filter(Boolean))];
      }, [email, senha]);
      assert.ok(rotas.length > 5, "o menu de " + email + " tem rotas");
      for(const rota of rotas){
        const sem = await pagina.evaluate(([r, f]) => { navigate(r); return eval("(" + f + ")")("#app"); }, [rota, camposSemNome.toString()]);
        if(sem.length) achados.push(email + " " + rota + ": " + sem.join(", "));
      }
      await pagina.evaluate(() => fazerLogout());
    }
    assert.deepEqual(achados, []);
  } finally { await contexto.close(); }
});

test("janelas abertas também ligam rótulo e campo", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      abrirModal('<div class="field"><label class="label">Nome da coisa</label><input class="input" id="campoDeTeste"></div>' +
                 '<div class="field"><div class="label">Escolha</div><select class="select" id="escolhaDeTeste"><option>a</option></select></div>');
      const rotulo = document.querySelector("#modalOverlayAtivo label.label");
      const sel = document.getElementById("escolhaDeTeste");
      return { para: rotulo.getAttribute("for"), id: document.getElementById("campoDeTeste").id,
               nomeado: document.getElementById(sel.getAttribute("aria-labelledby")).textContent };
    });
    assert.equal(r.para, r.id);
    assert.equal(r.nomeado, "Escolha");
  } finally { await contexto.close(); }
});
