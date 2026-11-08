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

## Pendente

- USP 2025 (120) e 2026 (120, 2 anuladas), nesta ordem, em blocos de 20.

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

## Letras a conferir (não alteradas)

- `q-usp2024-103`: o gabarito é clomifeno, mas a diretriz internacional de SOP de 2023 citada recomenda o letrozol como primeira linha de indução; conferir a letra.
- `q-usp2024-089`: a explicação trata da lei 14.443/2022 (prazo de 60 dias); conferir o texto da lei sobre laqueadura no pós-parto imediato antes de manter a letra A.

- `q-usp2023-052`: o gabarito (só estilo de vida, com investigação secundária) é discutível para PA persistente de 156 x 98 mmHg; conferir o enunciado completo com a diretriz vigente.

- `q-usp2022-089` (tríade da atleta): o gabarito é o contraceptivo hormonal combinado, mas o consenso de 2014 citado não recomenda o contraceptivo oral para recuperar massa óssea (prefere estrogênio transdérmico quando há indicação). Conferir a letra com a banca.
- `q-usp2022-100` (parada de dilatação): o enunciado fala em 2 horas de parada com dinâmica adequada; o critério do consenso ACOG/SMFM é de 4 horas (6 com ocitocina). Gabarito (cesárea) mantido.
