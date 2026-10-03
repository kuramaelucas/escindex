/* Regra das grandes áreas de professor e residente: no máximo 2, e no máximo
   uma clínica — a segunda vaga é da Medicina Preventiva e Social. Vale na
   função, no formulário de cadastro (ao vivo), no envio e na migração de
   contas antigas. */
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

test("a regra aceita uma clínica, só a Preventiva e clínica + Preventiva; recusa duas clínicas e três áreas", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => ({
      uma: validarAreasAtuacao(["area-cm"]).ok,
      soPreventiva: validarAreasAtuacao(["area-mps"]).ok,
      clinicaMaisPreventiva: validarAreasAtuacao(["area-cg", "area-mps"]).ok,
      duasClinicas: validarAreasAtuacao(["area-cm", "area-cg"]),
      tres: validarAreasAtuacao(["area-cm", "area-ped", "area-mps"]).ok,
      nenhuma: validarAreasAtuacao([]).ok,
      normalizada: normalizarAreasAtuacao(["area-ped", "area-cm", "area-go", "area-mps"]),
      semPreventiva: normalizarAreasAtuacao(["area-cg", "area-go"]),
    }));
    assert.equal(r.uma, true);
    assert.equal(r.soPreventiva, true);
    assert.equal(r.clinicaMaisPreventiva, true);
    assert.equal(r.duasClinicas.ok, false);
    assert.match(r.duasClinicas.msg, /única grande área clínica/);
    assert.equal(r.tres, false);
    assert.equal(r.nenhuma, false);
    assert.deepEqual(r.normalizada, ["area-ped", "area-mps"]);
    assert.deepEqual(r.semPreventiva, ["area-cg"]);
  } finally { await contexto.close(); }
});

test("cadastro: marcar uma área clínica desabilita as outras clínicas, mantém a Preventiva e esconde as especialidades de fora", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.evaluate(() => navigate("cadastro"));
    const r = await pagina.evaluate(() => {
      const marcar = (id, v = true) => { document.querySelector('.cadAreaAtuacao[value="' + id + '"]').checked = v; atualizarAreasAtuacaoCadastro(); };
      const estado = () => ({
        desabilitadas: [...document.querySelectorAll(".cadAreaAtuacao")].filter(c => c.disabled).map(c => c.value).sort(),
        gruposVisiveis: [...document.querySelectorAll("[data-area-grupo]")].filter(g => g.style.display !== "none").map(g => g.getAttribute("data-area-grupo")).sort(),
        aviso: document.getElementById("cadAreasAviso").textContent,
      });
      const antes = estado();
      marcar("area-cm");
      const comClinica = estado();
      // marca uma especialidade de Clínica Médica, soma a Preventiva e desmarca a clínica: a especialidade some junto
      document.querySelector('[data-area-grupo="area-cm"] .cadAssuntoAjuda').checked = true;
      marcar("area-mps");
      const completa = estado();
      marcar("area-cm", false);
      return { antes, comClinica, completa, ajudaMarcada: document.querySelectorAll(".cadAssuntoAjuda:checked").length };
    });
    assert.deepEqual(r.antes.desabilitadas, []);
    assert.deepEqual(r.antes.gruposVisiveis, []);
    assert.deepEqual(r.comClinica.desabilitadas, ["area-cg", "area-go", "area-ped"]);
    assert.deepEqual(r.comClinica.gruposVisiveis, ["area-cm"]);
    assert.match(r.comClinica.aviso, /somar Medicina Preventiva e Social/);
    assert.match(r.completa.aviso, /Seleção completa/);
    assert.equal(r.ajudaMarcada, 0);
  } finally { await contexto.close(); }
});

test("cadastro: o envio com duas áreas clínicas é recusado e o válido grava só as especialidades das áreas marcadas", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      navigate("cadastro");
      document.getElementById("cadNome").value = "Profa. Teste";
      document.getElementById("cadEmail").value = "profa.teste@esc.demo";
      document.getElementById("cadMatricula").value = "PT-001";
      document.getElementById("cadSenha").value = "senha123";
      document.getElementById("cadTipoAcesso").value = "professor";
      // duas clínicas direto nas caixas (o formulário ao vivo impediria; o envio confere de novo)
      ["area-cm", "area-cg"].forEach(id => { document.querySelector('.cadAreaAtuacao[value="' + id + '"]').checked = true; });
      solicitarCadastro();
      const recusado = !db.usuarios.some(u => u.email === "profa.teste@esc.demo");
      document.querySelector('.cadAreaAtuacao[value="area-cg"]').checked = false;
      document.querySelector('.cadAreaAtuacao[value="area-mps"]').checked = true;
      // uma especialidade da área marcada e uma de fora, que o envio tem de filtrar
      const espCm = db.taxonomia.especialidades.find(e => e.areaId === "area-cm").id;
      const espPed = db.taxonomia.especialidades.find(e => e.areaId === "area-ped").id;
      document.querySelectorAll(".cadAssuntoAjuda").forEach(cb => { cb.checked = cb.value === espCm || cb.value === espPed; });
      solicitarCadastro();
      const u = db.usuarios.find(x => x.email === "profa.teste@esc.demo");
      return { recusado, areas: u && u.areasAtuacao, ajuda: u && u.assuntosAjuda, espCm };
    });
    assert.equal(r.recusado, true);
    assert.deepEqual(r.areas, ["area-cm", "area-mps"]);
    assert.deepEqual(r.ajuda, [r.espCm]);
  } finally { await contexto.close(); }
});

test("migração: conta antiga de professor/residente com 4 áreas é corrigida e gravada; aluno e conta conforme não são tocados", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const espPed = await pagina.evaluate(() => db.taxonomia.especialidades.find(e => e.areaId === "area-ped").id);
    const espCm = await pagina.evaluate(() => db.taxonomia.especialidades.find(e => e.areaId === "area-cm").id);
    await pagina.evaluate(([espPed, espCm]) => {
      db.usuarios.push(
        { id: "u-mig-prof", nome: "Prof Antigo", email: "antigo@esc.demo", matricula: "M1", senha: "x", papel: "professor", status: "ativo",
          areasAtuacao: ["area-cg", "area-cm", "area-ped", "area-mps"], assuntosAjuda: [espPed, espCm] },
        { id: "u-mig-ok", nome: "Res Conforme", email: "conforme@esc.demo", matricula: "M2", senha: "x", papel: "residente", status: "ativo",
          areasAtuacao: ["area-go", "area-mps"], assuntosAjuda: [] },
        { id: "u-mig-aluno", nome: "Aluno", email: "aluno.mig@esc.demo", matricula: "M3", senha: "x", papel: "aluno", status: "ativo",
          areasAtuacao: ["area-cm", "area-cg", "area-ped"] });
      saveState();
    }, [espPed, espCm]);
    await pagina.reload();
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    const r = await pagina.evaluate(() => {
      const por = id => db.usuarios.find(u => u.id === id);
      const guardado = JSON.parse(localStorage.getItem("medbloco_db_v1")).usuarios.find(u => u.id === "u-mig-prof");
      return { prof: por("u-mig-prof"), ok: por("u-mig-ok").areasAtuacao, aluno: por("u-mig-aluno").areasAtuacao, guardado: guardado.areasAtuacao };
    });
    assert.deepEqual(r.prof.areasAtuacao, ["area-cg", "area-mps"]);
    assert.deepEqual(r.prof.assuntosAjuda, []);
    assert.deepEqual(r.guardado, ["area-cg", "area-mps"]);
    assert.deepEqual(r.ok, ["area-go", "area-mps"]);
    assert.deepEqual(r.aluno, ["area-cm", "area-cg", "area-ped"]);
  } finally { await contexto.close(); }
});
