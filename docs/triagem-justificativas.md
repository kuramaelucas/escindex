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
