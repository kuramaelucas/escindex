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

- **UNIFESP 2022, lote 1 (27/11/2026), 14 questões** (da fila dos mais rasos): `q-unifesp2022-078`, `-017`, `-061`, `-066`, `-048`, `-040`, `-097`, `-039`, `-042`, `-009`, `-043`, `-096`, `-011`, `-072`. Mesmo método do piloto; onde o gabarito da banca diverge da prática (`-009`, prazo da redução nasal) ou a norma mudou (`-097`, isolamento da covid) a explicação diz isso. Sobram da UNIFESP 2022 cerca de 83 questões.

## Próximo

Esperar o aval do padrão pelo piloto; depois seguir a fila: UNIFESP (da mais rasa à mais funda, prova por prova), USP, IAMSPE, em lotes de 20–30 por rodada.
