/* Como o aluno quer começar (codigo/06e-modo-de-inicio.js): só 6º ano e Formado(a) escolhem;
   antes do 6º ano não há pergunta (constrói do zero pelo calendário). A escolha fica no cadastro,
   volta da nuvem sem passar por cima da deste aparelho e, fora do ano dela, vale o padrão sem se perder. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(process.env.ESC_CHROMIUM ? { executablePath: process.env.ESC_CHROMIUM } : {}); servidor = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1280, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(servidor.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  // partes ainda desligadas no ar (CONFIG.integracaoResumos): o teste as liga para conferir o código que espera a fase 3
  await pagina.evaluate(() => { CONFIG.integracaoResumos.modoDeInicio = true; CONFIG.integracaoResumos.cicloNoInicio = true; });
  return { pagina, contexto, erros };
}

test("modo de início: Formado escolhe entre três, 6º ano entre dois, antes do 6º não é perguntado", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual(); navigate("inicio");
      const pergunta = ano => { u.anoFaculdade = ano; delete u.modoDeInicio; fecharModal();
        const abriu = perguntarModoDeInicio({ mesmoComAutomacao: true });
        const o = document.getElementById("modalOverlayAtivo"), txt = o ? o.innerText : "";
        if(o) o.click();   // clicar fora não decide nem fecha
        const segue = !!document.getElementById("modalOverlayAtivo");
        fecharModal(); return { abriu, segue, botoes: (txt.match(/Construir do zero|Reparar falhas por tema|Reparar falhas como está/g) || []).length / 2 }; };
      const formado = pergunta("Formado(a)"), sexto = pergunta("6º ano"), quarto = pergunta("4º ano");
      // escolhe no Formado, confere que não pergunta de novo e que a escolha vale
      u.anoFaculdade = "Formado(a)"; perguntarModoDeInicio({ mesmoComAutomacao: true }); definirModoDeInicio("reparar");
      const escolhido = { modo: modoDeInicio(u), janela: !!document.getElementById("modalOverlayAtivo"), deNovo: perguntarModoDeInicio({ mesmoComAutomacao: true }) };
      // "reparar" (continuar como está) não existe no 6º ano: vale "zero", sem apagar a escolha
      u.anoFaculdade = "6º ano"; const noSexto = { modo: modoDeInicio(u), guardado: u.modoDeInicio };
      u.anoFaculdade = "Formado(a)"; const volta = modoDeInicio(u);
      // o 6º ano não consegue gravar o que não é dele
      u.anoFaculdade = "6º ano"; trocarModoDeInicio("reparar"); const recusou = u.modoDeInicio === "reparar";
      trocarModoDeInicio("reparar-tema");
      navigate("perfil"); const perfil = document.body.innerText.includes("Como você estuda");
      u.anoFaculdade = "3º ano"; render(); const perfilAntes = document.body.innerText.includes("A escolha entre construir do zero e reparar falhas abre no 6º ano");
      return { formado, sexto, quarto, escolhido, noSexto, volta, recusou, guardado: u.modoDeInicio, perfil, perfilAntes };
    });
    assert.deepEqual(r.formado, { abriu: true, segue: true, botoes: 3 });
    assert.deepEqual(r.sexto, { abriu: true, segue: true, botoes: 2 });
    assert.equal(r.quarto.abriu, false, "antes do 6º ano não há pergunta");
    assert.deepEqual(r.escolhido, { modo: "reparar", janela: false, deNovo: false });
    assert.deepEqual(r.noSexto, { modo: "zero", guardado: "reparar" });
    assert.equal(r.volta, "reparar");
    assert.equal(r.recusou, true, "a escolha antiga segue guardada; o 6º ano só não a usa");
    assert.equal(r.guardado, "reparar-tema");
    assert.ok(r.perfil && r.perfilAntes);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("modo de início vem da nuvem sem passar por cima da escolha deste aparelho e sobe no perfil", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const base = { id: "u-nuvem", nome: "Ana", email: "a@a.br", papel: "aluno", status: "aprovado" };
      nuvemAplicarPerfilLocal(Object.assign({}, base, { modo_inicio: "lixo" }));
      const u = db.usuarios.find(x => x.id === "u-nuvem"); const lixo = u.modoDeInicio;
      nuvemAplicarPerfilLocal(Object.assign({}, base, { modo_inicio: "reparar-tema" })); const veio = u.modoDeInicio;
      u.modoDeInicio = "zero";   // escolheu neste aparelho
      nuvemAplicarPerfilLocal(Object.assign({}, base, { modo_inicio: "reparar" })); const manteve = u.modoDeInicio;
      const sobe = linhaDoPerfil(u).modo_inicio;
      return { lixo, veio, manteve, sobe };
    });
    assert.deepEqual(r, { lixo: undefined, veio: "reparar-tema", manteve: "zero", sobe: "zero" });
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
