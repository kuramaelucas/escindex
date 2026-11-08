# Pendências de referências e diretrizes — USP e UNIFESP (consolidado)

Atualizado em 08/11/2026. Este é o **único** documento de pendências de referência dessas provas; `docs/REVISAO-USP.md` e `docs/REVISAO-UNIFESP.md` guardam só o histórico do que foi feito.

## 1. Situação

- **USP-SP 2022–2026: 580 questões** e **UNIFESP 2022–2026 + Avaliação Discente 2026.2: 582 questões ativas** estão no padrão novo (fisiopatologia, epidemiologia e nota datada em `referencias`; gabaritos e textos intactos).
- **O texto da diretriz foi lido em poucas.** Na USP nenhum; na UNIFESP, 14 questões (SSC 2026, Sepsis-3 por apresentação da ACEP, GOLD 2026, GINA 2026, Diretriz Brasileira de Hipertensão 2025, relatório da Conitec sobre fibrose cística e Portaria de Consolidação 4/2017; lista em `docs/REVISAO-UNIFESP.md`). As demais notas dizem "texto não aberto nesta sessão".
- **Cuidado ao ler a fila:** `npm run referencias-a-conferir` só olha se existe uma nota *datada* e por isso **não conta** estas questões como pendentes (hoje lista 148, de outros bancos). A nota "não aberto" é uma pendência real, e a lista da seção 2 é a que vale para estas duas provas.

## 2. Questões que citam edição anterior à vigente

Gerado de `docs/REFERENCIAS-COM-EDICAO-ANTERIOR.md` (tabela `ferramentas/edicoes-vigentes.json`), só USP e UNIFESP: 69 questões da USP e 45 da UNIFESP (uma questão pode aparecer em mais de uma diretriz; as da UNIFESP já lidas, seção 1, podem constar aqui porque a referência ainda cita a edição antiga ao lado da nota, e vale conferir antes de reler). Número = nº da questão na prova.

| Diretriz | Edição vigente | Questões | Quais |
|---|---|---|---|
| ATS/IDSA, pneumonia comunitária do adulto | Atualização ATS 2025 (a IDSA não a endossou) | 1 | `q-usp2025`: 087 |
| NCCN (versões frequentes) | Versões 2026 em nccn.org (exigem login) | 23 | `q-unifesp2022`: 015, 024, 030; `q-unifesp2023`: 043, 045, 086; `q-unifesp2024`: 013, 014; `q-unifesp2025`: 013; `q-unifesp2026`: 006; `q-usp2022`: 061, 073, 085; `q-usp2023`: 011, 013, 020, 025; `q-usp2024`: 025, 027, 036, 045, 046; `q-usp2026`: 031 |
| Surviving Sepsis Campaign | SSC 2026 (Intensive Care Med 2026;52:863-936) | 13 | `q-unifesp2022`: 098; `q-unifesp2023`: 008, 015; `q-unifesp2025`: 030, 037; `q-usp2022`: 012, 053; `q-usp2023`: 102; `q-usp2024`: 016, 019, 064; `q-usp2026`: 053; `q-udisc20262`: 001 |
| Calendário Nacional de Vacinação | Instrução Normativa do Calendário 2026 | 4 | `q-usp2022`: 044; `q-usp2024`: 024, 079; `q-usp2026`: 056 |
| GINA, asma | GINA 2026 (Strategy Report, maio/2026) | 10 | `q-unifesp2022`: 069, 086; `q-unifesp2023`: 069; `q-unifesp2026`: 095; `q-usp2022`: 020; `q-usp2023`: 115; `q-usp2024`: 003, 004; `q-usp2026`: 063, 070 |
| Rastreamento do câncer do colo do útero (MS) | Portaria Conjunta SAES/SECTICS nº 13/2025 (HPV-DNA) | 7 | `q-unifesp2024`: 048; `q-unifesp2025`: 067; `q-unifesp2026`: 053; `q-usp2024`: 106; `q-usp2025`: 009; `q-usp2026`: 085, 114 |
| EAU (edições anuais) | EAU 2026 (urolitíase: revisão completa) | 1 | `q-usp2025`: 061 |
| OMS, critérios de elegibilidade contraceptiva | OMS MEC 6ª edição (2025) | 7 | `q-unifesp2022`: 025; `q-usp2024`: 098, 101; `q-usp2026`: 018, 116; `q-udisc20262`: 087, 099 |
| SBC, hipertensão arterial | Diretriz Brasileira de Hipertensão 2025 (SBC, SBN, SBH) | 4 | `q-unifesp2024`: 029; `q-usp2022`: 025; `q-usp2024`: 057; `q-usp2026`: 017 |
| ADA, Standards of Care in Diabetes | ADA Standards of Care 2026 (Diabetes Care 2026;49 Suppl 1) | 5 | `q-usp2022`: 003; `q-usp2024`: 050, 112; `q-usp2025`: 079; `q-udisc20262`: 081 |
| HerniaSurge, hérnia inguinal | HerniaSurge 2023 (BJS Open) | 2 | `q-unifesp2023`: 085; `q-usp2025`: 028 |
| GOLD, DPOC | GOLD 2026 (relatório v1.3) | 5 | `q-unifesp2023`: 014; `q-unifesp2026`: 040; `q-usp2025`: 093, 094; `q-udisc20262`: 004 |
| WSES, apendicite aguda | WSES Jerusalem 2025 (JAMA Surg 2026) | 2 | `q-usp2023`: 005; `q-usp2025`: 048 |
| OMS, hemorragia pós-parto | OMS/FIGO/ICM 2025 (51 recomendações) | 3 | `q-unifesp2026`: 050; `q-usp2026`: 105; `q-udisc20262`: 085 |
| AHA, RCP e atendimento cardiovascular de emergência | AHA/AAP 2025 (Partes 5, 6, 8 e 11) | 3 | `q-unifesp2025`: 023; `q-usp2022`: 013; `q-usp2025`: 062 |
| Lista Nacional de Notificação Compulsória | Portarias GM/MS nº 6.734/2025, 10.175/2026 e 11.211/2026 | 4 | `q-unifesp2024`: 078; `q-usp2024`: 077; `q-usp2025`: 108; `q-usp2026`: 089 |
| BTS, doença pleural | BTS 2023 (Thorax 2023;78 Suppl 3) | 6 | `q-unifesp2023`: 095; `q-usp2022`: 074; `q-usp2026`: 044; `q-udisc20262`: 076, 077, 078 |
| ACC/AHA, síndromes coronarianas agudas | ACC/AHA/ACEP/NAEMSP/SCAI 2025 (Circulation 2025;151) | 1 | `q-usp2026`: 006 |
| AHA/ASA, AVC isquêmico agudo | AHA/ASA 2026 (Stroke, doi 10.1161/STR.0000000000000513) | 3 | `q-unifesp2022`: 020; `q-unifesp2023`: 053; `q-usp2026`: 011 |
| ATA, câncer diferenciado de tireoide | ATA 2025 (Thyroid 2025, doi 10.1177/10507256251363120) | 2 | `q-usp2024`: 046; `q-usp2025`: 034 |
| ACG, pancreatite aguda | ACG 2024 (Am J Gastroenterol 2024;119) | 2 | `q-usp2022`: 064; `q-usp2024`: 044 |
| ESGO/ESTRO/ESP, carcinoma endometrial | ESGO/ESTRO/ESP 2025 (Lancet Oncol 2025;26) | 1 | `q-usp2023`: 025 |
| ACOG, diabetes na gestação | Atualização clínica ACOG, julho/2024 | 2 | `q-unifesp2025`: 077; `q-unifesp2026`: 057 |
| Difficult Airway Society | DAS 2025 (Br J Anaesth) | 1 | `q-usp2022`: 071 |
| PCDT, fibrose cística | Portaria Conjunta SAES/SECTICS nº 5, de 30/04/2024 | 1 | `q-unifesp2026`: 083 |
| ESVS, aneurisma de aorta abdominal | ESVS 2024 (Eur J Vasc Endovasc Surg 2024;67) | 1 | `q-usp2022`: 077 |

## 3. Diretrizes que a tabela de edições ainda não cobre

Achadas ao ler as questões da USP (a edição citada tem versão mais nova, sem entrada em `ferramentas/edicoes-vigentes.json`). **Ação:** acrescentar as entradas à tabela e rodar `npm run referencias-a-conferir`.

### Achadas ao revisar USP 2022

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

### Achadas ao revisar USP 2023

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

### Achadas ao revisar USP 2024

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

### Achadas ao revisar USP 2025 e 2026

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

## 4. Onde o texto não abre e o que enviar

| Documento | Destrava |
|---|---|
| AHA/ASA 2026, AVC isquêmico agudo (doi 10.1161/STR.0000000000000513) | `q-usp2022-004`, `q-unifesp2022-020`, `q-unifesp2023-053` |
| AHA 2025, RCP e atendimento cardiovascular de emergência (partes 5, 6, 8 e 11) | `q-usp2022-013`, `-047`, `-052`, `q-unifesp2025-023`, PALS em `q-usp2024`, `q-usp2025`, `q-usp2026` |
| BTS 2023, doença pleural (Thorax 2023;78 Suppl 3) | `q-usp2022-074`, `q-usp2024-063`, `q-usp2026-044`, `q-unifesp2023-095`, `q-udisc20262-076`, `-077`, `-078` |
| Portaria Conjunta SAES/SECTICS nº 13/2025 (colo do útero, DNA-HPV) | `q-usp2024-106`, `q-usp2025-009`, `q-usp2026-085`, `-114`, `q-unifesp2024-048`, `q-unifesp2025-067` |
| NCCN 2026 (pulmão, ovário, colo, endométrio, melanoma, mama, testículo) — exige login | USP: melanoma, mama, cólon, pâncreas, testículo; UNIFESP: `q-unifesp2022-015`, `-024`, `-030`, `q-unifesp2023-043`, `-045`, `-086`, `q-unifesp2024-013`, `-014`, `q-unifesp2025-013`, `q-unifesp2026-006` |
| EAU 2026 (CloudFront bloqueado) | `q-usp2022-073`, `q-usp2023-018` e urolitíase da UNIFESP |
| ACOG (HTTP 402), ESC/EACTS 2025 e ESC de pericárdio 2025 (a verificar), ADA 2026 (diabetesjournals) | USP 2022–2026 e UNIFESP |
| Sepsis-3 (Singer, JAMA 2016) | `q-unifesp2023-019` |

Abrem sem problema (usar `npm run texto-oficial`): gov.br (PCDT, Conitec, calendário, notas técnicas), kdigo.org, goldcopd.org, ginasthma.org, idsociety.org, sbp.com.br, thyroid.org, cdc.gov, iris.who.int, pmc.ncbi.nlm.nih.gov.

## 5. Letras de gabarito a conferir (nada foi alterado)

### USP

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

### UNIFESP

- `q-unifesp2022-086`: o gabarito (dobrar o corticoide inalatório) reflete esquema anterior ao GINA atual, que prefere associar formoterol; a equipe decide se marca como desatualizada.
- `q-unifesp2023-030`: o gabarito A parece em desacordo com o enunciado.
- `q-unifesp2026-040`: o enunciado não traz eosinófilos nem exacerbações; gabarito mantido.
- `q-unifesp2024-078`: confirmar a alternativa B (estados e municípios acrescentam agravos) e o papel do Sinan nas Portarias 6.734/2025 e 11.211/2026.
- `q-unifesp2024-048` e `q-unifesp2025-067`: citam as diretrizes de 2016 (citologia aos 25 anos); podem estar superadas pelo DNA-HPV.
- `q-unifesp2023-049` (parto no acretismo: 34 a 36+6 semanas), `q-unifesp2024-086` (McArdle com diabetes e dificuldade escolar) e `q-unifesp2023-084` (intervalo de vigilância do aneurisma, ESVS 2024 não aberta): ver as observações em `referencias`.

## 6. Outras pendências desta frente

- `q-unifesp2026-083`: Manual de Normas Técnicas da Triagem Neonatal não aberto.
- `q-unifesp2024-029`: valor de referência do descenso noturno na diretriz.
- `q-udisc20262-004`: diretrizes da SBPT para DPOC não relidas.
- `q-unifesp2023-069`: Box 11-4 do GINA (dispositivo na criança) não relido linha a linha.

## 7. Como encerrar uma pendência

1. Ler o texto oficial (`npm run texto-oficial -- <url> --buscar "termo"`), conferir número, limiar, dose ou prazo afirmado.
2. Registrar com `npm run anotar-conferencia -- q-id "nota"` (fonte, data, o que foi lido e o que não foi confirmado).
3. Só mudar a explicação com fonte primária; **nunca mudar gabarito por fonte secundária**; questão real: texto da prova não se altera.
4. Apagar a linha daqui e atualizar `docs/CONFERENCIA-DE-REFERENCIAS-NA-WEB.md`.
