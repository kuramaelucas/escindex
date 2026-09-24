/* A pasta dados/ passa no conferidor: nenhum id repetido, nenhum gabarito
   fora das alternativas, nenhum assunto que não existe. As pendências (imagem
   que falta, número que falta) são avisos e não falham o teste. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { conferir } from "./conferir-dados.mjs";

test("a pasta dados/ não tem erro de conteúdo", () => {
  const r = conferir();
  assert.deepEqual(r.erros, []);
  assert.ok(r.totais.questoes >= 600);
});

test("toda prova real está completa, de 1 até a última questão", () => {
  const r = conferir();
  const buracos = r.avisos.filter(a => /faltam as questões/.test(a));
  assert.deepEqual(buracos, []);
});
