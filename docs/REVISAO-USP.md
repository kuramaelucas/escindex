# Revisão das provas da USP-SP (FMUSP) no padrão novo (início: 08/11/2026)

Mesmo método da `docs/REVISAO-UNIFESP.md`: cada explicação ganha **fisiopatologia (mecanismo)** e **epidemiologia** depois das dicas, e a `referencias` ganha a nota "Conferência em 08/11/2026" dizendo o que foi e o que **não** foi lido. Gabaritos, enunciados e alternativas intactos (prova real). Gravação por `npm run atualizar-dados`; `justificativaEm` passa a `2026-11`.

## Medição inicial (08/11/2026; anuladas fora)

| Prova | Questões | Sem mecanismo | Sem epidemiologia | Referência sem data de leitura | Explicação < 900 caracteres |
|---|---|---|---|---|---|
| 2022 | 100 | 99 | 93 | 100 | 55 |
| 2023 | 117 ativas | 114 | 111 | 117 | 85 |
| 2024 | 117 ativas | 114 | 109 | 117 | 32 |
| 2025 | 120 | 116 | 99 | 120 | 5 |
| 2026 | 118 ativas | 116 | 99 | 118 | 7 |

("Sem mecanismo" = não traz as palavras fisiopatologia, mecanismo ou patogenia; é triagem, não prova.)

## Feito

- **USP 2022 completa (100 questões):** as 100 receberam fisiopatologia, epidemiologia (qualitativa, sem número sem fonte) e nota datada nas referências. Em nenhuma o texto da diretriz foi reaberto nesta rodada (sem leitura de fonte primária), então todas continuam na fila de `npm run referencias-a-conferir`.

- **USP 2023 completa (120 questões, 3 anuladas):** mesmo método; nas anuladas (`-023`, `-035`, `-092`) o parágrafo vai no fim, sem mexer na anulação. Nenhum texto de diretriz reaberto.

- **USP 2024 completa (120 questões, 3 anuladas: `-055`, `-079`, `-110`):** mesmo método, nenhum texto de diretriz reaberto.

- **USP 2025 completa (120 questões)** e **USP 2026 completa (120 questões, 2 anuladas: `-054` e `-120`):** mesmo método, nenhum texto de diretriz reaberto. Com isso **as 580 questões da USP 2022–2026 estão no padrão novo**.

## Pendente

- Ler as fontes primárias das tabelas abaixo (a fila de `npm run referencias-a-conferir` lista as 580) e, onde a edição vigente mudar o número ou a conduta, reescrever a explicação e conferir a letra com a banca.

## Diretrizes a atualizar (achadas em USP 2022)

Cada linha: a edição citada na questão × a edição vigente da tabela `ferramentas/edicoes-vigentes.json` (ou lacuna conhecida). Conferir o número/limiar afirmado na explicação contra o texto da edição vigente antes de mudar qualquer coisa.

| Diretriz citada | Vigente | Questões | Obstáculo |
|---|---|---|---|
| AHA/ASA AVC isquêmico 2019 | AHA/ASA 2026 | `q-usp2022-004` | ahajournals bloqueado; enviar PDF |
| AHA RCP/ECC 2020 | AHA 2025 | `q-usp2022-013`, `-047`, `-052` | ahajournals/cpr.heart.org bloqueados; enviar PDF |
| SSC 2021 | SSC 2026 (Intensive Care Med 2026;52:863-936) | `q-usp2022-012`, `-053` (pediátrica) | Springer recusa; há PDF da SSC 2026 fornecido em rodada anterior |
| ADA Standards 2022 | ADA 2026 | `q-usp2022-003` | diabetesjournals bloqueado |
| Diretriz Brasileira de Hipertensão 2020 | SBC 2025 | `q-usp2022-025` | abccardiol.org abre |
| GINA 2022 | GINA 2026 | `q-usp2022-020` | ginasthma.org abre |
| KDIGO glomerulopatias 2012 | KDIGO 2021/2024 | `q-usp2022-047` | kdigo.org abre |
| ACG pancreatite 2013 | ACG 2024 | `q-usp2022-064` | — |
| ESVS aneurisma 2019 | ESVS 2024 | `q-usp2022-077` | — |
| EAU testículo 2024 | EAU 2026 | `q-usp2022-073` | CloudFront da EAU bloqueado |
| BTS doença pleural 2010 | BTS 2023 (Thorax 2023;78 Suppl 3) | `q-usp2022-074` | enviar PDF |
| ATLS 10ª ed. 2018 | ATLS 11ª ed. 2025 | `q-usp2022-069` | material pago |
| Calendário Nacional de Vacinação da Criança 2022 | Calendário 2026 | `q-usp2022-044` | gov.br abre |
| PCDT-IST e PrEP 2022 | verificar atualização do MS | `q-usp2022-028` | gov.br abre |
| NCCN 2022 (melanoma, mama, testículo) | NCCN 2026 | `q-usp2022-061`, `-073`, `-085` | exige login |
| ACOG (ectópica 2018, indução 2021, dismenorreia 2018) | ACOG vigente | `q-usp2022-088`, `-095`, `-099` | HTTP 402 |
| ESHRE estimulação ovariana 2019 | ESHRE 2024 | `q-usp2022-090` | — |
| RCOG Green-top 69 (2016) | RCOG 2024 | `q-usp2022-091` | — |
| Manual de dengue do MS 2024 | verificar | `q-usp2022-039` | gov.br abre |
| ACR 1996, IDSA encefalite 2008, IDSA rinossinusite 2012, ESC pericárdio 2015 | edição posterior possível | `q-usp2022-014`, `-005`, `-017`, `-018` | verificar se há edição nova |

## Diretrizes a atualizar (achadas em USP 2023)

| Diretriz citada | Vigente | Questões |
|---|---|---|
| SSC 2021 | SSC 2026 | `q-usp2023-102` |
| ESC AF 2020 | ESC 2024 | `q-usp2023-050` |
| Diretriz Brasileira de Hipertensão 2020 | SBC 2025 | `q-usp2023-052` |
| ADA 2023 | ADA 2026 | `q-usp2023-113`, `-114`, `-118` |
| GINA 2022 | GINA 2026 | `q-usp2023-115` |
| AHA PALS 2020 | AHA 2025 | `q-usp2023-083` |
| ATLS 10ª ed. | ATLS 11ª (2025) | `q-usp2023-009`, `-119`, `-120` |
| EAU 2024 | EAU 2026 | `q-usp2023-018` |
| ACOG PB 107 (2009) | ACOG PB 205 (2019) ou posterior | `q-usp2023-108` |
| PCDT-IST 2022 | verificar atualização do MS | `q-usp2023-110` |
| Calendário Nacional 2023 | Calendário 2026 | `q-usp2023-094` (já desatualizada) |
| Lei 7.802/1989 (agrotóxicos) | Lei 14.785/2023 | `q-usp2023-065` |
| Decreto 7.646/2011 (Conitec) | Decreto 11.161/2022 | `q-usp2023-068` |
| Norma técnica de violência sexual 2012 | nova edição 2024 | `q-usp2023-071` |
| ESC pericárdio 2015 | ESC 2025 (a verificar) | `q-usp2023-047` |
| NCCN 2022 | NCCN 2026 | `q-usp2023-011`, `-020` |
| Goldfrank 11ª ed. | 12ª ed. (2023) | `q-usp2023-049` |

## Diretrizes a atualizar (achadas em USP 2024)

| Diretriz citada | Vigente | Questões |
|---|---|---|
| Rastreamento do colo do útero INCA 2016 | Portaria Conjunta SAES/SECTICS 13/2025 (DNA-HPV) | `q-usp2024-106` |
| ATS/IDSA CAP 2019 | ATS/IDSA 2025 | `q-usp2024-063` |
| BTS pleural 2010 | BTS 2023 | `q-usp2024-063` |
| SSC 2021 | SSC 2026 | `q-usp2024-064`, `-019` |
| ESC FA 2020 | ESC 2024 | `q-usp2024-055` |
| ADA 2024 | ADA 2026 | `q-usp2024-050`, `-112` |
| OMS MEC 5ª ed. 2015 | OMS MEC 6ª ed. 2025 | `q-usp2024-098`, `-101` |
| AHA PALS 2020 | AHA 2025 | `q-usp2024-005`, `-018`, `-067` |
| ATLS 10ª ed. | ATLS 11ª ed. 2025 | `q-usp2024-030`, `-034`, `-035` |
| NCCN 2024 | NCCN 2026 | `q-usp2024-025`, `-027`, `-036`, `-045`, `-046` |
| GINA 2024 | GINA 2026 | `q-usp2024-003`, `-004` |
| Calendário da Gestante, Adolescente e Nacional 2024 | Calendário 2026 | `q-usp2024-024`, `-079`, `-115` |
| PCDT de Transmissão Vertical 2022 | versão 2025 | `q-usp2024-015` |
| PCDT-IST/PrEP 2022 | verificar atualização do MS | `q-usp2024-091`, `-114` |
| Manual de TB do MS 2019 e OMS 2020 | OMS 2022-2025 | `q-usp2024-081`, `-082` |
| IDSA cateter 2009 | IDSA 2024-2025 | `q-usp2024-037` |
| ASMBS 2016 | ASMBS 2019 | `q-usp2024-041` |
| Lista de Notificação Compulsória 2022 | 2026 | `q-usp2024-077` |
| PCDT de Parkinson | versão 2025 | `q-usp2024-071` |

## Diretrizes a atualizar (achadas em USP 2025 e 2026)

| Diretriz citada | Vigente | Questões |
|---|---|---|
| Rastreamento do colo do útero INCA 2016 | Portaria Conjunta SAES/SECTICS 13/2025 (DNA-HPV) | `q-usp2025-009`, `q-usp2026-085`, `-114` |
| ACOG PB 146 (2014, pós-datismo) | ACOG CO 831 (2021) | `q-usp2025-019` |
| ESC 2018 cardiopatia/gestação | ESC/EACTS 2025 (valvopatias) | `q-usp2025-016`, `-017`, `q-usp2026-097`, `-120` |
| ESC pericárdio 2015 | ESC 2025 | `q-usp2025-089` |
| AHA PALS 2020 | AHA 2025 | `q-usp2025-062`, `-072`, `q-usp2026-049`, `-070` |
| GOLD 2024 | GOLD 2026 | `q-usp2025-093`, `-094` |
| GINA 2025 | GINA 2026 | `q-usp2026-063`, `-070` |
| ADA 2025 | ADA 2026 | `q-usp2025-079` |
| ATS/IDSA CAP 2019 | ATS/IDSA 2025 | `q-usp2025-087` |
| ESC FA 2020/ESC 2024 | ESC 2024 | `q-usp2025-083` |
| ATLS 10ª ed. | ATLS 11ª ed. 2025 | `q-usp2025-026`, `-037`, `q-usp2026-027`, `-044`, `-045` |
| NCCN 2024 | NCCN 2026 | `q-usp2026-031` |
| OMS MEC 5ª ed. 2015 | OMS MEC 6ª ed. 2025 | `q-usp2026-116`, `q-usp2026-018` |
| SSC pediátrica 2020 | SSC 2026 / pediátrica nova | `q-usp2026-053` |
| ACOG CO 797 / BTS 2010 | BTS 2023 | `q-usp2026-044` |
| IDSA cateter 2009 | IDSA 2024-2025 | `q-usp2026-055` |
| Calendário da Gestante/Nacional 2024 | Calendário 2026 | `q-usp2026-056` |
| PCDT-IST 2022 e PCDT de Transmissão Vertical | versões do MS posteriores | `q-usp2025-120`, `q-usp2026-032`, `-084`, `-110` |
| PCDT-PEP 2024 | verificar | `q-usp2026-109` |
| Norma técnica de violência sexual 2012 | nova edição 2024 | `q-usp2026-103` |
| Dengvaxia/vacinas de dengue 2024 | vacinação do SUS 2024-2026 | `q-usp2025-118` |
| Lei 9.656/1998 e RN 557/2022 | texto vigente da ANS | `q-usp2025-097` |
| PCDT de Parkinson/HAS (SBC 2020 → 2025) | SBC 2025 | `q-usp2026-017` |

## Letras a conferir (não alteradas)

- `q-usp2025-089`: o gabarito é prednisona (pericardite em DRC IIIb), mas a ESC prefere colchicina mais AINE ou corticoide em baixa dose quando o AINE é contraindicado; conferir com o texto de 2025.
- `q-usp2025-097`: a explicação diz proibição de rescisão unilateral, mas a RN 557/2022 permite a rescisão de contratos coletivos; conferir a letra D com o texto vigente.
- `q-usp2026-107`: LH e FSH baixos com estradiol indetectável sugerem causa central; o gabarito (hiperprolactinemia) merece conferência com o enunciado completo.
- `q-usp2026-117`: a diretriz AUA/SUFU 2024 coloca os beta-3 agonistas como opção equivalente ou preferível ao anticolinérgico.
- `q-usp2026-048`: a ordem entre fixação do fêmur e revascularização é controversa (muitos serviços usam shunt precoce).
- `q-usp2026-057`: conferir se o quadro do enunciado configura anafilaxia (nesse caso, adrenalina) antes de manter anti-histamínico.

- `q-usp2024-103`: o gabarito é clomifeno, mas a diretriz internacional de SOP de 2023 citada recomenda o letrozol como primeira linha de indução; conferir a letra.
- `q-usp2024-089`: a explicação trata da lei 14.443/2022 (prazo de 60 dias); conferir o texto da lei sobre laqueadura no pós-parto imediato antes de manter a letra A.

- `q-usp2023-052`: o gabarito (só estilo de vida, com investigação secundária) é discutível para PA persistente de 156 x 98 mmHg; conferir o enunciado completo com a diretriz vigente.

- `q-usp2022-089` (tríade da atleta): o gabarito é o contraceptivo hormonal combinado, mas o consenso de 2014 citado não recomenda o contraceptivo oral para recuperar massa óssea (prefere estrogênio transdérmico quando há indicação). Conferir a letra com a banca.
- `q-usp2022-100` (parada de dilatação): o enunciado fala em 2 horas de parada com dinâmica adequada; o critério do consenso ACOG/SMFM é de 4 horas (6 com ocitocina). Gabarito (cesárea) mantido.
