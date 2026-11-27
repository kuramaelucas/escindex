# Projeto: didática das explicações (início: 27/11/2026)

Segunda revisão das provas reais, depois do projeto de adequação (`docs/PROJETO-ADEQUACAO.md`, `REVISAO-UNIFESP.md`, `REVISAO-USP.md`). Aquela rodada garantiu **forma, mecanismo, epidemiologia e referência datada**. Esta mira o que o aluno **aprende** ao ler: ensinar o conceito por trás da resposta e explorar a fundo por que cada alternativa errada está errada.

**Bancas, em ordem:** UNIFESP (2022–2026 e Discente 2026.2), USP-SP (2022–2026), IAMSPE (2021–2023, 2025–2026). Depois, se der certo: USP-RP, Santa Casa, AMRIGS e os simulados autorais.

## O que falta hoje (diagnóstico de 27/11/2026)

Lendo as questões, o defeito comum é este: a explicação diz **qual** é a resposta e acrescenta mecanismo e epidemiologia, mas as erradas ficam em uma linha ("B está errada porque X") ou agrupadas ("B e C são para peritonite difusa"), sem dizer **em que situação aquela opção seria a certa**. O aluno descobre o erro de hoje e não aprende a separar a opção da vizinha. E o conceito de base (a regra que vale fora do caso) aparece só de passagem, quando aparece.

## Padrão didático (acima do padrão de `dados/PADRAO-EXPLICACAO.md`, que continua valendo)

Ordem do texto, cada bloco com o rótulo que a tela destaca:

1. `A alternativa X está correta. Dicas do enunciado: **…**` (como já é).
2. **`Conceito-chave:`** — a regra geral que explica a resposta e **vale para outros casos**: definição, como se reconhece, o que decide a conduta. Um parágrafo curto, sem repetir o caso. Se houver número, escore ou fórmula, ensine **por que** ele é assim.
3. `Fisiopatologia:` e `Epidemiologia:` (como já é; sem número que não tenha fonte).
4. **Cada errada em frase própria**, `B) Errada: …`, em ordem de letra, com **três coisas**: (a) o erro específico daquela opção no caso; (b) **o que ela é de fato ou em que situação seria a certa** ("seria a escolha se…", "é a janela de quem tem ciclos de 30 a 35 dias", "é manobra da inspeção"); (c) quando for a distratora mais tentadora, dizer por quê. Duas opções com o mesmo motivo continuam em duas frases; a segunda pode remeter à primeira, mas diz o que é.
5. **`Como não errar:`** — uma ou duas frases com a pegadinha do enunciado e o critério que separa a certa das vizinhas.

Regras: gabarito, enunciado e alternativas **não mudam** (prova real); o tamanho cresce até onde ensina, sem encher; nada de número, dose ou ponto de corte novo sem fonte lida — se a diretriz não foi reaberta, a nota em `referencias` diz isso (como na rodada anterior); anulada fica de fora; `justificativaEm` vai a `2026-11`.

A tela põe `Conceito-chave:` e `Como não errar:` em parágrafo próprio (`quebrasDeParagrafo`, `08b`); `X) Errada:` já tinha linha própria.

## Ferramenta

`npm run didatica` (`ferramentas/auditoria-didatica.mjs`, só leitura): por prova, % com conceito-chave, com "Como não errar", com erradas no formato novo, com todas as erradas tratadas, com alguma errada rasa (motivo **próprio** < 90 caracteres; frase que junta várias letras não conta como própria) e com ≥ 50% das erradas dizendo quando seriam certas; "funda" = cumpre tudo.
`-- <prova> --fila N` lista as N questões **mais rasas** da prova (a fila de trabalho); `-- <q-id>` mostra a medida e o texto de cada errada. É heurística por palavra e tamanho: ordena a fila, **não aprova** (quem aprova é a leitura).

## Método por lote

1. `npm run didatica -- <prova> --fila 25` → as mais rasas.
2. `npm run dados -- <q-id> -- --tudo` → ler a questão inteira.
3. Reescrever no padrão; gravar com `npm run atualizar-dados -- arquivo.json` (formato `esc-atualizacoes-questoes`, campos dentro de `campos`: `explicacaoGeral`, `referencias`, `justificativaEm`; `--simular` antes).
4. `npm run conferir -- <prova>` → `npm run publicar` → `npm run testar-mudanca`.
5. Registrar o lote na seção "Feito" abaixo.

## Linha de base (27/11/2026, antes do piloto)

| Prova | Ativas | Todas as erradas tratadas | Alguma errada rasa (< 90 car. próprios) | Conceito-chave |
|---|---|---|---|---|
| UNIFESP 2022 | 99 | 75% | 95% | 0 |
| UNIFESP 2023 | 96 | 75% | 98% | 0 |
| UNIFESP 2024 | 97 | 84% | 86% | 0 |
| UNIFESP 2025 | 93 | 68% | 96% | 0 |
| UNIFESP 2026 | 97 | 85% | 97% | 0 |
| USP 2022 | 100 | 98% | 50% | 0 |
| USP 2023 | 117 | 83% | 81% | 0 |
| USP 2024 | 117 | 96% | 38% | 0 |
| USP 2025 | 120 | 96% | 68% | 0 |
| USP 2026 | 118 | 96% | 68% | 0 |
| IAMSPE 2021 | 75 | 72% | 89% | 0 |
| IAMSPE 2022 | 76 | 72% | 92% | 0 |
| IAMSPE 2023 | 74 | 80% | 95% | 0 |
| IAMSPE 2025 | 99 | 49% | 96% | 0 |
| IAMSPE 2026 | 99 | 65% | 99% | 0 |
| UNIFESP Discente 2026.2 | 100 | 99% | 28% | 0 |

Total das três bancas: ~1.600 questões ativas. A UNIFESP e o IAMSPE agrupam erradas numa frase com mais frequência; a USP trata cada letra, porém em uma linha.

## Feito

- **Piloto (27/11/2026), 6 questões**, para validar o padrão e a ferramenta: `q-unifesp2022-014`, `q-unifesp2022-041`, `q-usp2024-072`, `q-usp2024-113`, `q-iamspe2025-019`, `q-iamspe2025-084`. Texto de livro-texto; nenhuma diretriz reaberta (nota em `referencias`). Na 041 o motivo de cada errada passou a dizer de quais ciclos aquela janela seria a certa.

- **UNIFESP 2022, lote 1 (27/11/2026), 14 questões** (da fila dos mais rasos): `q-unifesp2022-078`, `-017`, `-061`, `-066`, `-048`, `-040`, `-097`, `-039`, `-042`, `-009`, `-043`, `-096`, `-011`, `-072`. Mesmo método do piloto; onde o gabarito da banca diverge da prática (`-009`, prazo da redução nasal) ou a norma mudou (`-097`, isolamento da covid) a explicação diz isso.

- **UNIFESP 2022, lote 2 (27/11/2026), 12 questões:** `q-unifesp2022-060`, `-013`, `-090`, `-007`, `-049`, `-012`, `-020`, `-036`, `-071`, `-088`, `-077`, `-079`. Na `-049` (vigilância ambiental) as alternativas C e D descrevem ações que também são da vigilância; a explicação diz isso e mostra por que o gabarito é a que alerta a rede. Na `-060` (profilaxia do RN exposto ao HIV) o protocolo muda com frequência e não foi reaberto.

- **UNIFESP 2022, lote 3 (27/11/2026), 24 questões:** `q-unifesp2022-018`, `-006`, `-035`, `-034`, `-025`, `-047`, `-051`, `-045`, `-004`, `-080`, `-091`, `-069`, `-062`, `-089`, `-084`, `-064`, `-037`, `-026`, `-065`, `-044`, `-053`, `-027`, `-028`, `-023`. Correções de conteúdo feitas de caso pensado: na `-062` (febre reumática) o texto antigo contava VHS e PCR como dois critérios menores, e em Jones 2015 eles valem um só; na `-045` o texto antigo tinha trecho embaralhado; na `-037` a glicemia de março é do 1º trimestre (não do 2º); na `-044` saíram frases soltas e ficou só o que foi lido da portaria. Na `-089` (Beers) e na `-091` (pneumonia com alergia) as alternativas têm ressalvas que a explicação registra. Edições dos critérios de Beers (2023) e da diretriz de pneumonia (ATS 2025) não foram reabertas.

- **Trilha pós-resumo, lote 1 (27/11/2026), 29 questões**, por tema: cirurgia bariátrica (8: `q-usp2025-039`, `q-iamspe2026-034`, `q-unifesp2026-026`, `q-usp2026-028`, `q-udisc20262-072`, `q-unifesp2024-011`, `q-usp2023-015`, `q-udisc20262-063`), colecistite e coledocolitíase (8: `q-unifesp2026-060`, `q-usp2025-033`, `q-usp2026-042`, `q-iamspe2025-035`, `q-udisc20262-068`, `q-usp2024-039`, `q-usp2026-041`, `q-iamspe2025-021`), fraturas (7: `q-unifesp2026-020`, `q-usp2022-079`, `q-usp2026-048`, `q-unifesp2026-019`, `q-usp2023-019`, `q-usp2025-040`, `q-unifesp2025-059`) e diverticulite (6: `q-iamspe2025-031`, `q-iamspe2021-020`, `q-usp2026-037`, `q-unifesp2025-011`, `q-iamspe2026-040`, `q-iamspe2021-026`). Cada tema ganhou um conceito comum para o aluno separar as hipóteses entre as questões (bariátrica: linha do tempo das complicações; colecistite: critérios de Tóquio e risco de coledocolitíase; fraturas: desvio, idade, demanda e partes moles; diverticulite: estágio de Hinchey). Gabaritos discutíveis registrados na explicação: `q-udisc20262-063` (principal causa de morte varia entre séries), `q-usp2026-048` (fixar antes ou depois do reparo arterial é controverso), `q-unifesp2025-059` (o enunciado não traz a radiografia).
- **Trilha pós-resumo, lote 2 (27/11/2026), 30 questões**, por tema: pancreatite aguda (6: `q-iamspe2026-015`, `-007`, `q-usp2025-036`, `q-iamspe2021-019`, `q-udisc20262-027`, `q-iamspe2026-036`), obstrução intestinal (6: `q-iamspe2025-027`, `q-usp2026-026`, `q-iamspe2021-021`, `q-unifesp2023-094`, `q-unifesp2025-086`, `q-udisc20262-061`), TEP (7: `q-unifesp2025-036`, `q-iamspe2025-010`, `q-usp2023-103`, `q-iamspe2026-099`, `q-unifesp2023-020`, `q-usp2023-046`, e a `q-unifesp2025-032` do tema de insuficiência cardíaca), insuficiência cardíaca (5: `q-usp2026-001`, `q-iamspe2023-004`, `q-iamspe2026-009`, `q-udisc20262-034`, `q-iamspe2025-005`) e asma (6: `q-iamspe2026-072`, `q-unifesp2022-086`, `q-unifesp2025-087`, `q-usp2024-004`, `q-usp2026-070`, `q-iamspe2026-014`). Correções de conteúdo feitas olhando as figuras: na `q-usp2026-001` o texto antigo falava em "padrão A" no ultrassom pulmonar, e a figura mostra linhas B em todos os campos, veia cava sem colapso evidente e veias compressíveis; na `q-usp2026-070` saiu um parágrafo sobre intubação sem relação com a arritmia, e as quatro imagens são manobra vagal (A), laringoscopia (B), punção torácica (C) e cardioversão (D). Na `q-usp2023-046` o texto antigo chamava a internação por IC ou FA de fator intermediário, e na tabela da ESC é forte. Gabaritos com ressalva registrada: `q-unifesp2022-086` (as versões recentes do GINA preferem associar formoterol a dobrar o corticoide), `q-unifesp2025-036` (a PA de 90/50 mmHg está no limite da instabilidade).

## Estratégia desde 27/11/2026: começar pela trilha pós-resumo

O aluno que segue o ciclo por tema (`docs/PROJETO-INTEGRACAO-RESUMOS.md`, `05g`) lê o resumo e faz o **conjunto planejado** do tema (`resumos/conjuntos-por-tema.js`; as 20 primeiras questões, em ordem de peso dos fragmentos). São as explicações que mais pessoas vão ler, então entram primeiro, **tema a tema**, e só das bancas do projeto (UNIFESP, USP, IAMSPE; as outras bancas que estão nos conjuntos ficam para depois).

`npm run didatica -- trilha` lista os temas com o número de questões das bancas do projeto nas 20 primeiras e quantas faltam; `-- trilha <tema>` lista as 20 do tema, marcando as que faltam. No começo (27/11/2026): 146 temas, 545 questões, 535 por fazer. Dentro do tema, faça todas as que faltam de uma vez e escreva um **conceito comum** (o aluno vai ver as questões em sequência). Escolha os temas pelo maior número de questões a fazer; evite começar por tema cuja norma muda com frequência (calendário vacinal, protocolos) sem reabrir a fonte.

Depois da trilha: o restante das bancas do projeto, na ordem do método por lote.
