/* A ferramenta que leva as correções de "Questões para Atualizar" para a
   pasta dados/ (ferramentas/aplicar-atualizacoes.mjs): edita a questão no
   lugar, só nos campos que mudaram, e o arquivo continua lendo igual. */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { aplicarNoTexto, questoesDoTexto, RAIZ } from "../ferramentas/aplicar-atualizacoes.mjs";

const ARQ = path.join(RAIZ, "dados", "prova-unifesp-2023.js");
// uma questão que ainda espera figura (as da UNIFESP já têm todas)
const ARQ_PENDENTE = path.join(RAIZ, "dados", "prova-santacasa-2026.js");

test("a figura chega: imagemPendente sai, a legenda entra, o resto do arquivo fica igual", () => {
  const txt = fs.readFileSync(ARQ_PENDENTE, "utf8");
  const novo = aplicarNoTexto(txt, "q-scmsp2026-010", { imagemUrl: "dados/imagens/q-scmsp2026-010.jpg", imagemLegenda: "Eletrocardiograma" }, ["imagemPendente"]);
  const antes = questoesDoTexto(txt, "a"), depois = questoesDoTexto(novo, "b");
  assert.equal(depois.length, antes.length);
  const q = depois.find(x => x.id === "q-scmsp2026-010");
  assert.equal(q.imagemUrl, "dados/imagens/q-scmsp2026-010.jpg");
  assert.equal(q.imagemLegenda, "Eletrocardiograma");
  assert.equal(q.imagemPendente, undefined);
  // nenhuma outra questão mudou
  antes.filter(x => x.id !== q.id).forEach(x => assert.deepEqual(depois.find(y => y.id === x.id), x));
  // e o diff é pequeno: só as linhas da questão
  const linhasDiferentes = novo.split("\n").filter((l, i, arr) => !txt.includes(l)).length;
  assert.ok(linhasDiferentes <= 2, "mudou " + linhasDiferentes + " linhas");
});

test("texto com aspas e gabarito novo continuam JavaScript válido", () => {
  const txt = fs.readFileSync(ARQ, "utf8");
  const alternativas = [{ id: "A", texto: 'dose "alta"' }, { id: "B", texto: "b" }, { id: "C", texto: "c\\d" }, { id: "D", texto: "d" }];
  const novo = aplicarNoTexto(txt, "q-unifesp2023-001", { alternativas, gabarito: "A", enunciado: "Novo\nenunciado" }, []);
  const q = questoesDoTexto(novo, "c").find(x => x.id === "q-unifesp2023-001");
  assert.deepEqual(q.alternativas, alternativas);
  assert.equal(q.gabarito, "A");
  assert.equal(q.enunciado, "Novo\nenunciado");
});

test("questão que não está no arquivo não mexe em nada", () => {
  const txt = fs.readFileSync(ARQ, "utf8");
  assert.equal(aplicarNoTexto(txt, "q-nao-existe", { gabarito: "A" }, []), null);
});
