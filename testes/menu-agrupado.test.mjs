/* Menu lateral agrupado: organizar não pode esconder nada — todo item de
   navItemsParaPapel continua no menu, e grupo recolhido mostra os selos dele. */
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

test("todo item do menu aparece, para cada papel e no modo aluno", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const faltando = [];
      for(const papel of ["aluno", "residente", "professor", "admin"]){
        const u = db.usuarios.find(x => x.papel === papel) || { id: "x", papel, nome: "Teste", email: "t@t" };
        const html = htmlMenuLateral(Object.assign({}, u, { papel }));
        const caixa = document.createElement("div"); caixa.innerHTML = html;
        const rotulos = [...caixa.querySelectorAll(".nav-item span")].map(s => s.textContent);
        for(const item of navItemsParaPapel(papel)) if(!rotulos.includes(item.label)) faltando.push(papel + ":" + item.id);
      }
      return faltando;
    });
    assert.deepEqual(r, []);
  } finally { await contexto.close(); }
});

test("grupo recolhido da equipe soma os selos escondidos e abre sozinho na rota ativa", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLogin("admin@esc.demo", "admin123"); fecharModal();
      db.feedbacks = db.feedbacks || [];
      const aberto = document.querySelectorAll("#sidebarMenu .nav-grupo.fechado").length;
      alternarGrupoMenu("Gestão");
      const menu = document.getElementById("sidebarMenu");
      const recolhido = menu.querySelector(".nav-grupo.fechado")?.textContent.trim();
      const some = !/Blocos de Estudo/.test(menu.innerText);
      navigate("blocos");
      const reabre = /Blocos de Estudo/.test(document.getElementById("sidebarMenu").innerText);
      return { aberto, recolhido, some, reabre };
    });
    assert.equal(r.aberto, 0, "tudo começa aberto");
    assert.match(r.recolhido, /Gestão/);
    assert.ok(r.some);
    assert.ok(r.reabre, "o grupo da tela atual não fica recolhido");
  } finally { await contexto.close(); }
});
