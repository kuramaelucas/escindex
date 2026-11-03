# Reposições de questões anuladas — notas de trabalho

À mão. A lista do que falta é gerada: `npm run reposicoes-pendentes` (e `-- --md` escreve `docs/REPOSICOES-PENDENTES.md`).
Reposição = questão à parte (`reposicaoDe`, `real:false`, `status:"ativa"`) em `dados/reposicoes-*.js`, com explicação
no padrão e `referencias` com a data em que o texto foi lido. Quando só o resumo abriu, a referência diz isso.

Estado em 03/11/2026: 62 reposições, 128 anuladas/desatualizadas de provas reais ainda sem reposição.

## Como achar a fonte (rede da sessão)

Abrem: `gov.br/saude` (calendário de vacinação, PCDTs, NR-7 e anexos da NR-15 em `gov.br/trabalho-e-emprego`),
`bvsms.saude.gov.br` (só alguns PDFs), `nice.org.uk`, `abccardiol.org` (diretrizes da SBC: busque pela API
`/wp-json/wp/v2/search?search=...`, abra a página do artigo e pegue o link do `.pdf`), `ginasthma.org`, `cdc.gov/mmwr`,
PMC pela ferramenta PubMed (texto grande: salvar em arquivo e extrair trechos). `npm run texto-oficial -- <url> --buscar "regex"`.

Bloqueados: `sbc.org.br`, `scielo.br`, `academic.oup.com` (ESC e Hum Reprod), `ahajournals.org`, `cochrane.org`, `bmj.com`,
`iris.who.int` (abre vazio), `in.gov.br`, `aafp.org`, `europepmc.org`, `gdt.gradepro.org`, `escardio.org` (só índice).

## Ficaram para trás, por falta de fonte lida

- Vacinas em atraso: USP 2024 nº 79, Einstein 2025 nº 45 (falta a tabela de atualização do Calendário/IN 2026); prematuro (IAMSPE 2022 nº 48).
- Estatística: UNIFESP 2022 nº 52, 2023 nº 38, 2025 nº 43; Einstein 2023 nº 70; Santa Casa 2021 nº 85 e nº 92, 2023 nº 82; TP 2022.2 nº 117 (manual de dengue).
- Sangramento pós-menopausa e hiperplasia: FAMERP 2025 nº 26, Santa Casa 2022 nº 43 (ESGO/ESHRE/ESGE, ACOG).
- Cardiologia ESC/AHA: Einstein 2025 nº 11 (TEP), IAMSPE 2023 nº 16 (endocardite), Einstein 2025 nº 31 (PALS), USP 2024 nº 55 já feita.
- Puberdade precoce: AMRIGS 2024 nº 66. Saúde do trabalhador: FAMERP 2026 nº 5 (Factory Act), parte da AMRIGS 2021 nº 89 (notificação).
- Cirurgia: pancreatite (Santa Casa 2021 nº 34, UNICAMP 2022 nº 27), hérnia (Santa Casa 2022 nº 18), colecistite na gestante, queimaduras, TOCE.
- Dado do enunciado incoerente, sem resposta defensável: AMRIGS 2020 nº 92 (T4 > 30 com TSH normal).

## Regras que valeram

- Reposição que muda dado do enunciado diz isso na `referencias` ("Dado do enunciado alterado: ...").
- Antes de escrever, confira se já existe reposição (`reposicaoDe`): o `conferir` recusa id repetido (`<id>-ia`).
- Edição de diretriz superada (ex.: IC da SBC 2018 → 2026) atualiza a reposição existente em vez de duplicar.
