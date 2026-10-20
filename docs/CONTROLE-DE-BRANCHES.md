# Controle de branches não mergeadas (conferido em 20/10/2026)

O `git branch --no-merged` mostra falsos positivos: as PRs foram mergeadas por *squash*, então o Git não reconhece o conteúdo como mergeado. Esta lista foi feita cruzando cada branch com as PRs mergeadas (#1 a #84) e com o conteúdo da `main`.

## Inúteis — conteúdo já está na `main` (podem ser apagadas)

Apagar: `git push origin --delete <nome>` (ou pela página de branches do GitHub).

| Branch | Por quê |
|---|---|
| `claude/admiring-bardeen-xc63r7` | ponta = PR #22 |
| `claude/alteracoes-sistema-provas-sckg14` | ponta = PR #19 |
| `claude/calendario-sync-automatico` | ponta = PR #7 |
| `claude/compassionate-hopper-4nea02` | ponta = PR #31 |
| `claude/compassionate-ritchie-huwl7q` | ponta = PR #28 |
| `claude/confident-einstein-mx7fm4` | ponta = PR #11 |
| `claude/determined-brown-dlwo8k` | ponta = PR #9 |
| `claude/gracious-hawking-qxoss3` | ponta = PR #14 |
| `claude/great-cerf-bo9h0x` | ponta = PR #13 |
| `claude/grupos-questoes-ajustes-v37y5x` | ponta = PR #26 |
| `claude/inspiring-brown-c56ku3` | ponta = PR #24 |
| `claude/jolly-franklin-m2ulf4` | ponta = PR #32 |
| `claude/kind-hypatia-9ghurh` | ponta = PR #20 |
| `claude/stoic-curie-c2fphy` | ponta = PR #15 |
| `claude/sweet-feynman-a8hmzk` | ponta = PR #3 |
| `claude/tender-noether-jbx7iq` | ponta = PR #27 |
| `claude/wizardly-franklin-rbzfu5` | ponta = PR #30 |
| `claude/zealous-turing-e5jg6j` | ponta = PR #18 |
| `claude/epic-noether-8hxyaw` | sem commits fora da `main` |
| `claude/question-bar-exam-upload-3fdd29` | sem commits fora da `main` |
| `ccr-fd020fd7-ucw5u4` | sem commits fora da `main` |
| `claude/laughing-lovelace-ol0y0q` | ponta = PR #81 (168 de 172 arquivos idênticos; o resto mudou depois na `main`) |
| `claude/ecstatic-hamilton-u37bz1` | chave VAPID reaplicada na PR #84 |
| `ccr-62b07faa-hy0xtr` | andamento do simulado na nuvem reaplicado na PR #84 |

## A decidir — podem ter algo que não está na `main`

| Branch | O que verificar |
|---|---|
| `claude/hopeful-newton-w0lgij` | Pasta `importacao-lucas-g1/` (Simulados 2, 3, 4 e 5 do grupo, 177 arquivos de figuras): nenhum arquivo está na `main`. Decidir se entra no repositório ou fica só na branch. |
| `claude/keen-cerf-9fcgl7` | Faltam 5 figuras da UNIFESP: `q-unifesp2022-032` (.jpg), `-037`, `-038`, `q-unifesp2025-004` (.jpg), `q-unifesp2026-018` (.jpg). |
| `claude/cloud-data-sync-issue-jczjgd` | 1 commit depois da PR #6 ("calendário de blocos sobe e desce sozinho", mesmo título da PR #7). Provável que já esteja na `main`; não confirmado. |
| `claude/separar-dados-provas-adaptadas-pyxj1d` | Trabalho de 19–20/09 (separação `dados/`, nuvem etapa 1). A `main` já tem esses arquivos por outro caminho; provável que esteja absorvida pela PR #2. Não confirmado commit a commit. |
| `claude/pensive-clarke-xzcva5` | PR #1 fechada sem merge. A `main` tem confirmação de e-mail, mas não conferi acessibilidade (nome em campos e botões). |
| `claude/gifted-wright-r0569e` | Nunca teve PR. Upload .docx existe na `main`; não conferi "memória entre aparelhos" e "fusão Simulados/Provas". |
| `claude/adicionar-flashcards-plataforma-rjy24q` | Nunca teve PR. A `main` tem as provas da USP, mas por ids diferentes; não conferi os 1.035 cartões nem o limite de 2 grandes áreas. |

Como conferir uma branch: `git log origin/main..origin/<branch>` (commits) e `git diff $(git merge-base origin/main origin/<branch>) origin/<branch> --stat` (arquivos).
