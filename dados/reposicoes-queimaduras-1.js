/* ==========================================================================
   REPOSIÇÕES — queimaduras: coeficiente inicial da reposição volêmica (ABA 2024)
   ==========================================================================
   Versão corrigida de uma questão anulada: SES-SP 2023 nº 9, que dependia de
   uma figura (áreas queimadas) para o cálculo da superfície corporal e misturava
   coeficientes de 2 e 5,2 mL. Aqui a superfície queimada vem no texto e a
   pergunta é pelo coeficiente inicial. A original continua anulada e sem
   gabarito; esta é a REPOSIÇÃO (`reposicaoDe`). Conteúdo, não código.
   ========================================================================== */
window.EscDados.registrarQuestoes("reposicoes-queimaduras-1", [
 {
  "id": "q-sessp2023-009-ia",
  "banca": "SES-SP",
  "real": false,
  "ano": 2023,
  "reposicaoDe": "q-sessp2023-009",
  "areaId": "area-cg",
  "especialidadeId": "esp-trauma",
  "assuntoId": "ass-queimaduras",
  "enunciado": "Homem de 45 anos, 80 kg, vítima de incêndio em sua casa, permaneceu mais de duas horas no local. No pronto-socorro apresenta desconforto respiratório e queimaduras profundas que, pelo método de avaliação da superfície, somam 45% da superfície corporal queimada (SCQ). A equipe decide intubar o paciente por suspeita de lesão inalatória e iniciar a reposição volêmica com Ringer lactato. Segundo as diretrizes clínicas da American Burn Association sobre ressuscitação no choque do queimado (2024), qual é o ponto de partida recomendado para calcular a reposição inicial em adultos com queimaduras de 20% ou mais da SCQ?",
  "alternativas": [
   {"id": "A", "texto": "2 mL de cristaloide × peso (kg) × % de SCQ, como taxa inicial, ajustada conforme a resposta do paciente (cerca de 7.200 mL neste caso)."},
   {"id": "B", "texto": "4 mL de cristaloide × peso (kg) × % de SCQ, como taxa inicial (cerca de 14.400 mL neste caso)."},
   {"id": "C", "texto": "5,2 mL de cristaloide × peso (kg) × % de SCQ, como taxa inicial."},
   {"id": "D", "texto": "Reposição fixa de 1.000 mL de cristaloide por hora, independentemente do peso e da superfície queimada."}
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **adulto de 80 kg, 45% de SCQ** (acima de 20%), **incêndio com confinamento por mais de duas horas e desconforto respiratório** (suspeita de lesão inalatória, que justifica a intubação). Dados objetivos: as diretrizes da American Burn Association sobre ressuscitação no choque do queimado (2024), para adultos com queimaduras ≥ 20% da SCQ, **recomendam iniciar a ressuscitação com 2 mL/kg/% SCQ, a fim de reduzir os volumes administrados**; recomendam considerar albumina humana em queimaduras maiores, monitorar seletivamente a pressão intra-abdominal e intraocular, e fazem recomendação fraca de software de apoio à decisão para titular o volume. Aqui, 2 × 80 × 45 = 7.200 mL como ponto de partida, a ser titulado pela resposta, e não um volume fixo. Mecanismo: a queimadura extensa causa aumento da permeabilidade capilar, perda de plasma para o interstício e choque hipovolêmico; o excesso de volume, por sua vez, causa edema, síndrome compartimental abdominal e de extremidades e piora pulmonar, por isso o coeficiente inicial menor, com ajuste, é preferido ao de 4 mL. Epidemiologia: a lesão inalatória é uma causa importante de morte em vítimas de incêndio em ambiente fechado. B está errada porque 4 mL/kg/% SCQ é o coeficiente clássico da fórmula de Parkland, que tende a causar sobrecarga hídrica (\"fluid creep\"), e a diretriz recomenda iniciar com 2. C está errada porque 5,2 mL não é o coeficiente recomendado. D está errada porque a taxa inicial é calculada pelo peso e pela SCQ, e não é fixa. Observação: a original dependia de uma figura e foi anulada; esta versão informa a SCQ. A divisão do volume em 24 horas (metade nas primeiras 8 horas), o termo \"fluid creep\" e o mecanismo da sobrecarga hídrica são conhecimento geral meu, e não constam do resumo lido.",
  "referencias": "Cartotto R, Johnson LS, Savetamal A et al. American Burn Association Clinical Practice Guidelines on Burn Shock Resuscitation. J Burn Care Res 2024;45(3):565-589 (resumo lido em 03/11/2026 pelo PubMed; texto completo não aberto). Conferido em 03/11/2026.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {"respostas": 0, "acertos": 0, "distribuicaoAlternativas": {}},
  "criadoPor": "seed",
  "criadoEm": "2026-11-03"
 }
]);
