---
name: conferir-referencias
description: Conferir as referências e a vigência das explicações das questões de dados/ (simulados autorais e outras) contra PubMed, a web e os textos oficiais das diretrizes. Use quando pedirem para revisar, atualizar ou checar diretrizes, referências, "vigência" de condutas, ou quando uma diretriz mudar. Traz o método que funcionou, os domínios que a rede da sessão deixa abrir, as ferramentas do repositório e as regras para não mudar gabarito por fonte fraca.
---

# Conferir referências das questões

Rodada feita em 29/10/2026 nos simulados autorais (500 questões, exceto `banco-simulado-epm-6`, já realizado). O que ela achou está em `docs/CONFERENCIA-DE-REFERENCIAS-NA-WEB.md`; o que falta, em `docs/REFERENCIAS-A-CONFERIR.md`. **Leia o primeiro antes de repetir uma busca**: se a diretriz já está lá, vá direto ao que ficou em aberto.

## Ferramentas (já no repositório)

| Comando | Para quê |
|---|---|
| `npm run referencias-a-conferir` | gera `docs/REFERENCIAS-A-CONFERIR.md`: questões com referência fraca ("não conferida", "de memória", "texto não aberto", "em resumos") **sem** nota datada, agrupadas por diretriz. `-- --so-resumo` só mostra os números |
| `npm run vigencia -- --termo KDIGO --ate 2023` | quais explicações citam uma diretriz com ano antigo (já existia) |
| `npm run texto-oficial -- <url> --buscar "regex" --contexto 2` | baixa PDF ou página (curl + pdftotext), trata o endereço do gov.br/Conitec e mostra só as linhas que casam |
| `npm run anotar-conferencia -- q-id "nota" [--troca "trecho antigo"] [--simular]` | grava a nota em `referencias` da questão (acha o arquivo, escapa aspas, confere o resultado e desfaz se falhar); a questão sai da fila |
| `npm run dados -- q-id --tudo` | enunciado, gabarito, explicação e referências de uma questão |

Fim da rodada: `npm run publicar`, `npm run conferir -- --resumo`, `npm run testar-mudanca` (e `node --test testes/higiene.test.mjs`), regerar a lista, commit.

## Método

1. **Escolha o que checar.** `npm run referencias-a-conferir -- --so-resumo`; priorize diretrizes que têm edição nova (anuais: NCCN, GINA, GOLD, ADA, EAU; recentes: SSC 2026, AHA/ASA 2026, ESC/EACTS 2025, KDIGO 2024–2026, IDSA 2026, OMS 2025) e documentos do Ministério da Saúde (PCDT, notas técnicas, calendário).
2. **Veja o que a questão afirma** (`npm run dados -- q-id --tudo`): número, limiar, dose, prazo. É isso que se confere, não a existência da diretriz.
3. **Prefira o texto oficial.** `npm run texto-oficial -- <url> --buscar "…"`. Só depois PubMed (`search_articles`, `lookup_article_by_citation`, `get_full_text_article` quando há PMC; o PubMed quase só traz resumo de diretriz) e `WebSearch`.
4. **Registre** com `npm run anotar-conferencia`: fonte, data, o que foi lido, **e o que não foi confirmado**. Texto de uma frase ou duas, em português.

## Onde abrir o texto (testado em 29/10/2026; a lista depende da rede da sessão)

- **Abrem com texto:** `gov.br` (PDF: `<url>.pdf/@@display-file/file`; Conitec, Ministério da Saúde, notas técnicas), `kdigo.org` (resumos executivos em PDF), `goldcopd.org` e `ginasthma.org` (relatórios completos), `idsociety.org`, `sbp.com.br`, `thyroid.org`, `uroweb.org` (página; o PDF fica no CloudFront), `cdc.gov`, `iris.who.int` (`/server/api/core/bitstreams/<id>/content`, PDFs da OMS), `pmc.ncbi.nlm.nih.gov` (artigos abertos; HTML raspado às vezes devolve só o resumo).
- **Abrem sem texto útil:** `esmo.org` (JavaScript), `acog.org` (HTTP 402), `nccn.org` (exige login).
- **Bloqueados ou recusam (403):** `ahajournals.org`, `cpr.heart.org`, `professional.heart.org`, `cdn.who.int`, `academic.oup.com`, `d56bochluxqnz.cloudfront.net` (PDFs da EAU), `diabetesjournals.org`, `sbim.org.br`, `easl.eu`, `asra.com`, `asam.org`, `scielo.br`, periódicos (NEJM, Lancet, JAMA). Não tente contornar o bloqueio anti-robô; diga qual domínio falta e peça a liberação.
- Falha de rede não é "a diretriz não existe": registre "não aberto" e siga.

## Regras

- **Não mude gabarito nem conduta clínica com base em fonte secundária** (notícia, resumo, blog, material de cursinho). Anote o que ficou em aberto. Mude o texto da explicação só quando a fonte primária (texto oficial) ou um fato inequívoco o exigir, e diga isso na nota e no `docs/HISTORICO.md`.
- Toda mudança de texto de questão **real** de prova pública é proibida (transcrição). Aqui se mexe só em `referencias`, e em explicação de questão autoral.
- A explicação é sempre autoral e de fonte primária (`dados/LEIA-ME.md`). Se uma explicação disser que a diretriz X recomenda algo, confira em X.
- Documentos de terceiros baixados não entram no git (ficam na pasta temporária).
- Banco já aplicado a alunos (`banco-simulado-epm-6`) fica de fora, salvo pedido.
- Depois de conferir, atualize `docs/CONFERENCIA-DE-REFERENCIAS-NA-WEB.md` (tabela "texto oficial lido") e acrescente uma entrada em `docs/HISTORICO.md`.

## Armadilhas já vistas

- Um mesmo número muda entre diretrizes: fibrinólise no IAM com supra (10 min do diagnóstico na ESC × 30 min porta-agulha na ACC/AHA), angiografia pós-fibrinólise (2 × 3 h). A explicação deve dizer de qual diretriz fala.
- A data na referência nem sempre é a edição do arquivo lido (ex.: PCDT-IST citado como 2022; o arquivo do Conitec é a Portaria SCTIE/MS nº 12/2021). Registre as duas.
- `gov.br/...pdf` devolve uma página de listagem; o arquivo está em `/@@display-file/file`.
- Uma diretriz "nova" pode ser só rascunho (KDIGO AKI 2026 em consulta pública; ATA de carcinoma medular em revisão).
- Termos mudam: Roma V diz "constipação crônica"; CRIE virou Rede de Imunobiológicos (RIE, Portaria GM/MS nº 6.623/2025).

## Estado ao fim da rodada

148 questões ainda sem conferência datada: livros-texto e epidemiologia (que busca não confirma), documentos do Ministério da Saúde sem texto aberto e diretrizes de domínios bloqueados (AHA/ASA 2026 de AVC, AHA 2025 pós-parada, ESC/EACTS 2025, EAU de urolitíase, ACOG, NCCN, ESMO). Reabra o que o domínio liberado permitir.
