/* A pasta dados/ passa no conferidor: nenhum id repetido, nenhum gabarito
   fora das alternativas, nenhum assunto que não existe. As pendências (imagem
   que falta, número que falta) são avisos e não falham o teste. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { conferir, faltasDeJustificativa, PROVAS_ANTERIORES_AO_PADRAO } from "./conferir-dados.mjs";

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

/* O padrão de justificativa (dicas do enunciado + dados em destaque + o motivo
   de cada alternativa errada) vale para toda prova real nova. A regra em si
   fica coberta aqui; quem a aplica é o conferidor (npm run conferir). */
test("a explicação completa passa no padrão de justificativa", () => {
  const q = {
    gabarito: "B", status: "ativa",
    alternativas: ["A", "B", "C", "D"].map(id => ({ id })),
    explicacaoGeral: "A alternativa B está correta. Dicas do enunciado: **mulher de 25 anos com linfonodo cervical indolor, febre e perda de 10% do peso, DHL de 2 vezes o normal (normal: até 250 U/L)**: suspeita de linfoma, que exige biópsia excisional do linfonodo com histologia e imuno-histoquímica. O PET-CT (A) e a tomografia (C) são exames de estadiamento, depois do diagnóstico. A biópsia de medula (D) só entra no estadiamento de um linfoma já diagnosticado e não substitui a do linfonodo suspeito.",
  };
  assert.deepEqual(faltasDeJustificativa(q), []);
});

test("explicação curta, sem dicas, sem destaque ou que esquece uma errada é apontada", () => {
  const base = { gabarito: "B", status: "ativa", alternativas: ["A", "B", "C", "D"].map(id => ({ id })) };
  const curta = faltasDeJustificativa({ ...base, explicacaoGeral: "A alternativa B está correta porque sim." });
  assert.ok(curta.some(f => /300 caracteres/.test(f)) && curta.some(f => /em destaque/.test(f)) && curta.some(f => /Dicas do enunciado/.test(f)));
  const semMencao = faltasDeJustificativa({ ...base, explicacaoGeral: "A alternativa B está correta. Dicas do enunciado: **febre de 39 graus por 4 dias e leucocitose de 20.000/mm3 (normal: até 11.000)**: infecção bacteriana, que pede antibiótico por via venosa e hemoculturas antes da primeira dose, com reavaliação em 48 horas para decidir a troca para via oral conforme a resposta clínica e a cultura, e internação se houver instabilidade. As demais alternativas estão erradas por não tratarem a infecção de forma adequada nem no tempo certo." });
  assert.ok(semMencao.some(f => /alternativas A, C, D/.test(f)));
  // anulada não tem alternativa certa: só vale o que não depende do gabarito
  const anulada = faltasDeJustificativa({ ...base, status: "anulada", gabarito: "", explicacaoGeral: "Questão anulada pela banca. Dicas do enunciado: **gestante de 12 semanas com Hb de 11,2 g/dL (anemia: < 11) e VCM de 88 fL (normal: 80–100)**: sem anemia; a suplementação de ferro no pré-natal é profilática e universal, de 40 mg de ferro elementar por dia desde a primeira consulta, e a dose de tratamento da anemia é bem maior, de 120 a 200 mg por dia de ferro elementar em duas ou três tomadas." });
  assert.deepEqual(anulada, []);
});

test("as provas reais de arquivos novos seguem o padrão e a lista de legado não cresce", () => {
  const r = conferir();
  assert.deepEqual(r.erros.filter(e => /fora do padrão de justificativa/.test(e)), []);
  // a lista só guarda provas anteriores ao padrão: as três do Teste de Progresso de 2020 a 2022 já nasceram nele
  for(const novo of ["prova-tp-2020-2", "prova-tp-2021-2", "prova-tp-2022-2"]) assert.ok(!PROVAS_ANTERIORES_AO_PADRAO.has(novo), novo + " não pode estar na lista de legado");
});
