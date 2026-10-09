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
      // o menu da equipe começa recolhido; aqui interessa o que existe, então tudo aberto
      state.menuGruposFechados = Object.fromEntries([...GRUPOS_MENU_ALUNO, ...GRUPOS_MENU_EQUIPE].map(g => [g, false]));
      for(const papel of ["aluno", "residente", "professor", "admin"]){
        const u = db.usuarios.find(x => x.papel === papel) || { id: "x", papel, nome: "Teste", email: "t@t" };
        const html = htmlMenuLateral(Object.assign({}, u, { papel }));
        const caixa = document.createElement("div"); caixa.innerHTML = html;
        const rotulos = [...caixa.querySelectorAll(".nav-item span")].map(s => s.textContent);
        // telas irmãs viram uma entrada só (FAMILIAS_DO_MENU); o item some do menu, não da tela
        const doMenu = navItemsParaPapel(papel);
        for(const item of doMenu){
          const fam = familiaDaRota(item.id, doMenu);
          const rotulo = fam ? fam.fam.label : item.label;
          if(!rotulos.includes(rotulo)) faltando.push(papel + ":" + item.id);
        }
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
      const fechadosNoInicio = [...document.querySelectorAll("#sidebarMenu .nav-grupo.fechado")].map(g => g.dataset.grupo);
      alternarGrupoMenu("Gestão");
      const menu = document.getElementById("sidebarMenu");
      const recolhido = menu.querySelector('.nav-grupo.fechado[data-grupo="Gestão"]')?.textContent.trim();
      const some = !/Blocos de Estudo/.test(menu.innerText);
      navigate("blocos");
      const reabre = /Blocos de Estudo/.test(document.getElementById("sidebarMenu").innerText);
      return { fechadosNoInicio, recolhido, some, reabre };
    });
    assert.deepEqual(r.fechadosNoInicio.sort(), ["Conteúdo", "Dúvidas e revisão", "Provas"], "o menu da equipe começa enxuto: só Gestão aberta");
    assert.match(r.recolhido, /Gestão/);
    assert.ok(r.some);
    assert.ok(r.reabre, "o grupo da tela atual não fica recolhido");
  } finally { await contexto.close(); }
});

test("telas irmãs: uma entrada no menu, abas no topo, e o item fica ativo em qualquer uma", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLogin("admin@esc.demo", "admin123"); fecharModal();
      const menuAntes = document.getElementById("sidebarMenu").innerText;
      navigate("central-provas");
      const abas = [...document.querySelectorAll("#conteudoPagina .tabs-irmas .tab")].map(b => b.textContent.trim());
      const ativa = document.querySelector("#conteudoPagina .tabs-irmas .tab.active")?.textContent.trim();
      const itemAtivo = document.querySelector("#sidebarMenu .nav-item.active")?.textContent.trim();
      document.querySelectorAll("#conteudoPagina .tabs-irmas .tab")[2].click();
      return { menuAntes, abas, ativa, itemAtivo, rota: state.route,
        itensSoltos: ["Central de Provas", "Questões para Atualizar"].filter(x => document.getElementById("sidebarMenu").innerText.includes(x)) };
    });
    assert.deepEqual(r.abas, ["Importar", "Central de Provas", "Para atualizar"]);
    assert.equal(r.ativa, "Central de Provas");
    assert.match(r.itemAtivo, /Provas e importação/);
    assert.equal(r.rota, "atualizar-questoes");
    assert.deepEqual(r.itensSoltos, [], "as irmãs não aparecem soltas no menu");
  } finally { await contexto.close(); }
});

test("modo aluno da equipe: indicador no topo que leva de volta ao papel", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLogin("admin@esc.demo", "admin123"); fecharModal();
      const antes = !!document.querySelector(".chip-modo-aluno");
      alternarModoAluno();
      const durante = document.querySelector(".chip-modo-aluno")?.textContent.trim();
      document.querySelector(".chip-modo-aluno").click();
      return { antes, durante, depois: !!document.querySelector(".chip-modo-aluno"), modo: state.modoAluno };
    });
    assert.equal(r.antes, false);
    assert.match(r.durante, /Modo aluno/);
    assert.equal(r.depois, false);
    assert.equal(r.modo, false);
  } finally { await contexto.close(); }
});
