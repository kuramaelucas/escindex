# Triagem das justificativas que dependem de um número (29/09/2026)

Lista de trabalho para aplicar o padrão de justificativa (parâmetro em destaque, valor normal/esperado, ponto de corte e escores; ver `dados/LEIA-ME.md`, "Como escrever a explicação") às explicações já publicadas. **Nenhuma explicação foi alterada**: isto só diz por onde começar.

Lista completa: [`triagem-justificativas.csv`](triagem-justificativas.csv) (uma linha por questão, ordenada por prioridade).

## Como foi feita

Sobre as 3198 questões ativas, desconsiderando anuladas e rascunhos. Uma questão entra quando o **enunciado ou as alternativas** trazem pelo menos 2 medidas clínicas ou laboratoriais (mmHg, bpm, mg/dL, g/dL, mEq/L, ng/mL, /mm³, TSH, creatinina…), ou o texto cita um **escore** (Glasgow, Apgar, CURB-65, Child-Pugh, MELD, Bishop, BI-RADS, NYHA, percentil…). Medidas comuns a qualquer caso (cm, mm, %, semanas, anos) não contam. A prioridade depende de a explicação atual já trazer palavras de referência ("valor normal", "ponto de corte", "≥", "define-se"…).

## Resultado: 790 questões

| Prioridade | Questões | O que falta |
|---|---|---|
| 1 | 565 | a explicação não traz valor de referência nem ponto de corte: escrever |
| 2 | 210 | a explicação já fala de referência ou corte: destacar o parâmetro com `**` e completar |
| 3 | 15 | poucos parâmetros e já com referência: só destacar |

### Prioridade 1 por especialidade (as 15 maiores)

| Especialidade | Questões |
|---|---|
| Obstetrícia | 61 |
| Cardiologia | 47 |
| Abdome Agudo | 41 |
| Nefrologia | 38 |
| Trauma | 37 |
| Infectologia | 36 |
| Endocrinologia | 32 |
| Hematologia | 32 |
| Pneumologia | 27 |
| Ginecologia Geral | 25 |
| Neonatologia | 21 |
| Gastroenterologia | 17 |
| Neurocirurgia | 14 |
| Crescimento e Desenvolvimento | 13 |
| Oncologia Ginecológica | 12 |

### Prioridade 1 por prova (as 12 maiores)

| Prova | Questões |
|---|---|
| USP-SP (FMUSP) 2025 | 47 |
| USP-SP (FMUSP) 2023 | 37 |
| USP-RP (FMRP) 2024 | 34 |
| USP-SP (FMUSP) 2024 | 33 |
| USP-SP (FMUSP) 2026 | 32 |
| USP-RP (FMRP) 2023 | 31 |
| USP-SP (FMUSP) 2022 | 30 |
| USP-RP (FMRP) 2021 | 27 |
| USP-RP (FMRP) 2026 | 26 |
| USP-RP (FMRP) 2022 | 24 |
| USP-RP (FMRP) 2025 | 23 |
| UNIFESP-EPM 2023 | 20 |

### Escores mais citados (todas as prioridades)

| Escore | Questões |
|---|---|
| glasgow | 72 |
| percentil | 43 |
| apgar | 26 |
| bi-rads | 14 |
| gold | 7 |
| z-score | 7 |
| bishop | 6 |
| sofa | 5 |
| alvarado | 5 |
| ckd-epi | 4 |
| ecog | 4 |
| child-pugh | 4 |

## O que a triagem não pega

- Questão em que o número está só na explicação, ou em que a conduta depende de um dado sem unidade (idade gestacional, "dilatação de 6 cm", escala em imagem).
- Questão com o número dentro de uma figura ainda não anexada.
- Falso positivo: número que aparece no caso mas não decide a conduta. Cada linha precisa de olhar clínico antes de mexer.

## Como aplicar

Reescrever em lotes por prova ou por especialidade, com conferência da diretriz de cada valor (política de conteúdo: explicação sempre autoral, de fonte primária), e entrar pela fila de *Questões para Atualizar* ou direto em `dados/prova-*.js`.

## Andamento

| Lote | Reescritas | Sem parâmetro decisivo (falso positivo da triagem) |
|---|---|---|
| UNIFESP-EPM 2022 (prioridades 1 e 2) | 19 | 2 (#2 cefaleia pós-punção, #59 laringomalácia) |
| UNIFESP-EPM 2023 (prioridades 1 e 2) | 22 | 0 |
| UNIFESP-EPM 2025 (prioridades 1 e 2) | 21 | 3 (#2 íleo biliar, #15 hematúria e tumor de bexiga, #96 falha de crescimento) |
| UNIFESP-EPM 2026 (prioridades 1 a 3) | 22 | 1 (#2 conduto onfalomesentérico) |
| UNIFESP-EPM 2024 (prioridades 1 a 3) | 23 | 4 (#14 síndrome da veia cava superior, #19 vômitos biliosos no RN, #27 tosse e refluxo, #88 triagem da fenilcetonúria) |
| Santa Casa de SP 2021 / 2022 / 2023 | 14 / 19 / 24 | 2021 #39; 2022 #69; 2023 #15, #27, #39, #46 (pouco número decisivo) |
| Santa Casa de SP 2025 / 2026 | 15 / 15 | 2025 #21, #30, #45, #62; 2026 #86, #89 |
| IAMSPE 2021 / 2022 / 2023 / 2025 | 8 / 7 / 4 / 14 | — (bancas com explicações já corretas; o trabalho foi pôr o parâmetro em destaque e o valor de referência) |
| AMRIGS 2022 / 2023 / 2024 / 2025 | 11 / 6 / 7 / 13 | — (explicações já corretas; entraram o parâmetro em destaque, o valor de referência e os cortes) |
| UNESP (FMB) 2023 | 21 | — (única prova da UNESP na plataforma) |
| IAMSPE 2026 (prioridades 1 a 3) | 23 | #8, #10, #17 receberam só os pontos de corte (CURB-65, Framingham, BNP) |

**A UNIFESP está concluída** (2022 a 2026: 107 explicações reescritas). **Santa Casa, IAMSPE, AMRIGS e UNESP também.** Faltam USP-SP e USP-RP.

**Achado no caminho (UNIFESP 2024 #88):** a explicação atribui a discordância do teste do pezinho à coleta com 24 horas de vida, mas o gabarito é a alternativa C (hiperfenilalaninemia materna). Um dos dois está errado ou incompleto; conferir com o gabarito oficial da banca antes de mexer.

**Para conferir com o gabarito oficial (achados no caminho):**

- UNIFESP 2024 #88 — a explicação atribui a discordância do teste do pezinho à coleta com 24 horas de vida, mas o gabarito é C (hiperfenilalaninemia materna).
- UNIFESP 2026 #95 — asma em criança de 4 anos com FR 42 irpm, fala em frases curtas e SpO2 95%: a explicação anterior concluía crise moderada e o gabarito é A (crise grave). A nova explicação segue o gabarito e diz que a classificação da banca se apoia na fala e na taquipneia; vale confirmar com o gabarito definitivo.
- UNIFESP 2026 #57 — o gabarito (indução imediata) só se sustenta com o polidrâmnio (maior bolsão de 9,0 cm; normal: 2 a 8 cm) e a queda da necessidade de insulina; a explicação anterior chamava o líquido de normal e defendia parto com 39 semanas.
- Santa Casa 2025 #65 — a alternativa E traz "3 semanas", que parece erro de digitação do enunciado; conferir com a prova original.
- Santa Casa 2025 #92 — o raciocínio da dengue foi mantido, mas vale rever com o gabarito oficial.
- Santa Casa 2026 #92 — PA de 138/84 mmHg descrita como "controle adequado": o corte depende da diretriz; conferir o que a banca adotou.
- IAMSPE 2026 #48 — a alternativa A chama de "grau III" o abscesso roto (na classificação de Monif seria grau IV); a conduta descrita é a correta e o gabarito foi mantido.

**Valores escritos de memória:** os limiares e valores de referência colocados em destaque (escores, pontos de corte, faixas de normalidade) vêm de diretrizes primárias, mas foram escritos sem consulta ao texto e precisam de conferência por um clínico antes de a plataforma ir a mais gente.
- AMRIGS 2022 #6 — a explicação dizia que ALT acima de 3 vezes o limite equivale a "cerca de 150 U/L"; com o limite de 40 U/L do enunciado o corte é 120 U/L (a ALT do paciente, 126, o ultrapassa). Corrigido.
- UNESP 2023 #22 — a explicação dizia que 1,83 seria PAS ÷ FC; na verdade 1,83 é FC ÷ pressão diastólica (110 ÷ 60). Corrigido.
- UNESP 2023 #5 — a explicação dizia que bilirrubina abaixo do percentil 75 no nomograma de Bhutani é baixo risco; a zona de menor risco é abaixo do percentil 40. Corrigido.
- AMRIGS 2023 #22 — os cortes do Ranson na forma biliar (idade 70, leucócitos 18.000, glicemia 220, LDH 400, AST 250; cálcio, déficit de bases e sequestro às 48 horas) foram escritos de memória e merecem conferência; a PaO2 abaixo de 60 mmHg pertence ao Ranson da forma não biliar, e o gabarito da banca a trata como critério de 48 horas.
