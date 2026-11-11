# Projeto: carga inicial leve

Documento de partida para uma conversa nova. Quem abrir uma sessão para executar isto lê **só este arquivo** mais o `CLAUDE.md` (que o roteador manda ler de qualquer jeito). Zona do roteador: **A (estrutura)**, com consultas à B1 por comando. Não é preciso abrir `dados/prova-*.js`.

## 1. O problema, com números

Medido em 11/11/2026 (Chromium, servidor local, sem service worker; "celular" = CPU 4× mais lenta):

| Medida | Desktop | Celular (CPU 4×) |
| --- | --- | --- |
| `DOMContentLoaded` | 2,0 s | 2,7–3,6 s |
| Arquivos baixados e executados antes da 1ª tela | 211 (167 de `dados/`, 42 de `codigo/`) | idem |
| JS de conteúdo / de código | 30 MB / 1,6 MB | idem |
| Memória (heap JS) | 177 MB | 116–286 MB |
| `copiaProfunda(SEED_QUESTOES)` (feita ao montar o `db`) | — | **0,8 s** |
| Gravar o banco (`compactarParaArmazenar` + JSON) | — | 0,23 s |

A tela de entrada (pública, sem login) espera 30 MB de questões que ela não usa. E quem já está logado também paga: baixar (com service worker, só na 1ª vez) **e executar, copiar e manter na memória 12.138 questões**, das quais usa dezenas por sessão.

Onde está o peso das questões (25,4 MB de texto no total):

| Campo | Parte | Quando é mostrado |
| --- | --- | --- |
| `explicacaoGeral` | 43% | só depois de responder |
| `enunciado` | 20% | ao abrir a questão |
| `alternativas` | 18% | ao abrir a questão |
| `referencias` | 9% | depois de responder |
| `estatisticas` | 3% | dados vivos (mudam no `db`) |
| o resto (`id`, `assuntoId`, `banca`, `ano`, `status`, `gabarito`…) | ~7% | filtros, contagens, montagem de sessão |

Um **índice leve** com os campos de filtro e contagem tem ~3,3 MB em JSON simples (cerca de 1–2 MB sem os campos repetidos e com ids curtos), contra 25 MB. Os 943 cartões pesam só 0,4 MB e ficam como estão.

## 2. O que já existe e ajuda

- Cada prova já é **um arquivo** em `dados/` com **hash próprio** (`ESC_HASH_DADOS`, `publicar.mjs`); o service worker guarda cada um para sempre (`versionadoPrimeiro`). Mudar uma prova só invalida aquela.
- Os arquivos entram por `window.EscDados.registrarQuestoes(nome, [...])` e `SEED_QUESTOES` é um "apelido" da lista (`02-persistencia.js:102`).
- A migração que completa o banco salvo com a semente é **incremental por id** (`02-persistencia.js`, perto da linha 690): item que chega depois entra sem apagar nada.
- O banco salvo já guarda só a diferença para a semente (`compactarParaArmazenar`, com a lista de ordem desde 11/11).
- O carregador já usa `preload` em paralelo (`escPreCarregar`), então a fila de 167 arquivos não é serial.

## 3. O que complica (leia antes de desenhar)

1. **`02-persistencia.js` lê `window.EscDados` na carga** e monta `const SEED_*`; o `loadState` monta o `db` ali mesmo. Qualquer carga atrasada precisa quebrar essa suposição.
2. **O código é síncrono**: `renderX()` devolve HTML de uma vez e os campos pesados são lidos direto de `db.questoes[i]`. Contagem de leituras dos campos pesados em `codigo/`: `enunciado` ~39 usos em 15 arquivos, `alternativas` ~22 em 13, `explicacaoGeral` 11 em 8, `explicacoesAlternativas` 4 em 3, `referencias` 6 em 4. Concentram-se em `08` (sessão), `11a` (simulado/PDF), `11b`/`11c` (admin) e `06b` (busca).
3. **`db.questoes` é uma cópia profunda da semente**, então tudo existe duas vezes na memória (e a cópia custa 0,8 s no celular).
4. **Busca global** (`06b`) procura no enunciado de todas as questões.
5. **Telas de administração** (Banco de Questões, Central de Provas, Questões para Atualizar) listam e filtram o banco inteiro, inclusive texto.
6. **Offline**: hoje, depois da 1ª visita, tudo abre sem internet. Carga sob demanda não pode quebrar essa promessa.
7. **Os testes** (304) assumem que tudo está em `db` logo após `pronto()`.

## 4. Metas (orçamento)

Para ser medido por `npm run medir-carga` (a criar na fase 0), no mesmo método dos números acima:

| Meta | Hoje | Alvo |
| --- | --- | --- |
| Tela de entrada interativa, celular 4×, 1ª visita | 3,6 s | **≤ 1,0 s** |
| Início do aluno logado, celular 4×, visita seguinte | ~3,5 s | **≤ 2,0 s** |
| Transferência na 1ª visita até a tela de entrada | 31 MB | **≤ 2 MB** |
| Heap JS depois de abrir o Início | 177 MB | **≤ 80 MB** |
| Abrir uma questão do banco (1ª vez, rede rápida) | instantâneo | ≤ 300 ms |
| Estudar offline o que já foi aberto | funciona | **continua** |

## 5. Desenho proposto, em quatro fases (cada uma entrega valor e pode parar ali)

### Fase 0 — medir e travar a linha de base

- Criar `ferramentas/medir-carga.mjs` (`npm run medir-carga`): abre a plataforma como nos scripts desta análise (desktop e CPU 4×), imprime a tabela da seção 1 e, com `--exigir`, falha se passar do orçamento. Começa só informativo; vira exigência depois da fase 2.
- Marcas `performance.mark` em: primeiro HTML pintado, `codigo` pronto, `dados` prontos, `db` montado, primeira tela do Início.
- Linha no roteador do `CLAUDE.md` e no quadro de comandos.

### Fase 1 — pintar antes de ter os dados ("moldura primeiro")

Objetivo: tela de entrada em ≤ 1 s sem mudar o modelo de dados.

1. `EscDados` passa a criar **listas estáveis** (`questoes`, `flashcards`…) no começo; `registrarQuestoes` faz `push` nelas. Assim os `const SEED_QUESTOES = EscDados.questoes` já capturados continuam valendo quando os dados chegam depois.
2. O `index.html` carrega `codigo/` primeiro e **injeta `dados/` depois da primeira pintura** (`<script async>` com ordem garantida pelo manifesto, em lotes), em vez de `document.write` antes de tudo. `taxonomia`, `calendario` e `trilha-formados` (pequenos) ficam na frente.
3. O que roda na carga e consome `SEED_*` (`02`, e o que a `04`/`05*` indexam) passa a rodar em uma função `iniciarBanco()` chamada quando o conteúdo termina (`ESC_DADOS_PRONTOS`). A tela pública (landing, login, solicitar cadastro) não depende disso.
4. Quem está logado vê um esqueleto ("carregando seu conteúdo") até `iniciarBanco()` — nesta fase ainda é o conteúdo inteiro, então o ganho é só da tela de entrada e da percepção.

Risco principal: tudo que hoje assume "dados prontos na carga" (cuidado com caches como `sementesPorId`, `_idsDaSemente`, que têm de ser invalidados quando chega mais uma prova). Cobrir com um teste que carrega com atraso artificial em `dados/`.

### Fase 2 — índice leve + corpo sob demanda (o ganho grande)

Separar cada questão em **ficha** (sempre carregada) e **corpo** (carregado por prova, quando preciso).

- **Ficha**: `id`, `assuntoId`, `especialidadeId`, `areaId`, `banca`, `ano`, `semestre`, `tipoProva`, `real`, `status`, `gabarito`, `numeroNaProva`, `tipo`, `dificuldadeManual`, `imagemPendente`, `reposicaoDe`, `criadoEm`, `justificativaEm`, mais `a` = posição do arquivo de origem no manifesto. Gerada por `npm run publicar` em `dados/indice-questoes.js` (arquivo **gerado**, não editado à mão; entra no hash e no `CATALOGO.md`).
- **Corpo**: `enunciado`, `alternativas`, `explicacaoGeral`, `explicacoesAlternativas`, `referencias`, `imagemUrl`, `imagemLegenda`, `respostaEsperada`, `questaoAlterada`. Continua nos arquivos de prova de hoje (nenhuma ferramenta de `dados/` muda: `adicionar-questoes`, `atualizar-dados`, `conferir`, `figuras` seguem lendo e gravando os mesmos arquivos).
- **API única de acesso**, em `04-utilitarios.js`:
  - `corpoDaQuestao(q)` — leitura síncrona; se o corpo ainda não foi carregado **em teste lança erro** (para achar todo caminho sem pré-carga) e **em produção** devolve um corpo vazio, agenda a carga e pede um redesenho.
  - `garantirCorpos(ids | provas)` — `Promise` que carrega os arquivos de prova que faltam (um `<script>` por arquivo, com o hash de `ESC_HASH_DADOS`), com um limite de paralelismo.
  - Pontos de pré-carga obrigatórios (onde a lista de ids já é conhecida antes de desenhar): criar/retomar sessão (`05a`/`05c`), abrir simulado ou prova (`09b`/`09d`), revisão de erros (`08d`), favoritos/histórico (`10a`), PDF (`11a`), comentários e dúvidas (`08e`), cartão aberto pela busca.
- **Ordem de resolução de um campo**: ficha ← corpo da semente ← diferença guardada no `db` (edição da equipe, correção da nuvem). O `expandirDoArmazenamento` só precisa da ficha; os campos de corpo que aparecerem numa diferença guardada vencem o corpo carregado.
- **Memória**: `db.questoes` deixa de ser `copiaProfunda(SEED_QUESTOES)`; guarda a **ficha** (objeto próprio, pequeno) e o corpo vem do cache por referência, sem cópia. Edição de corpo grava a diferença no objeto da ficha, como hoje.
- **Busca global** (`06b`): decisão em aberto (seção 7). Proposta: indexar no `publicar` um arquivo `dados/indice-busca.js` com os primeiros ~160 caracteres do enunciado por questão (≈2 MB), carregado só quando a busca é aberta pela primeira vez; abrir o resultado chama `garantirCorpos`.
- **Telas de administração** carregam o corpo de **todas** as provas ao abrir (com barra de progresso). Aluno nunca passa por aí.

### Fase 3 — offline e limpeza

- "Guardar para estudar sem internet" no Perfil: baixa todos os corpos em segundo plano (mostra o tamanho e o progresso). Padrão: baixar a prova assim que alguém abre uma questão dela, mais as 3 provas mais recentes quando o navegador está ocioso.
- Cota do `localStorage` e IndexedDB: se a ficha + diferenças voltarem a pesar, avaliar mover respostas/histórico (fora do escopo desta fase).
- Higiene: teste que acusa leitura direta de campo de corpo fora da API; atualizar o mapa do `CLAUDE.md`.

## 6. Ordem de trabalho e como validar

1. Fase 0, em um PR pequeno.
2. Fase 1, um PR. Validação: `npm run medir-carga`, teste com atraso em `dados/`, suíte inteira.
3. Fase 2 em PRs menores, na ordem: (a) gerar o índice no `publicar` e a API `corpoDaQuestao`/`garantirCorpos` **sem mudar nenhum consumidor** (ainda tudo carregado); (b) migrar consumidor por consumidor, tela a tela, cada um com o teste existente; (c) só no fim cortar o carregamento do corpo inteiro e a `copiaProfunda`.
4. Fase 3 por último.

Verificações a cada PR: `npm run publicar`, suíte inteira (`npm run testar-mudanca`), `npm run medir-carga`, e um teste de **uso offline** (primeira visita online, depois `context.setOffline(true)`, abrir uma sessão de uma prova já vista).

## 7. Decisões do dono do projeto (11/11/2026) — todas tomadas

1. **Offline: aceito.** Funciona offline para o que já foi aberto ou guardado (e para o que o aluno mandar guardar com o botão da fase 3). Deixa de valer "tudo offline depois da 1ª visita".
2. **Busca global: índice de 160 caracteres** do enunciado por questão (`dados/indice-busca.js`, gerado pelo `publicar`, carregado só na primeira vez que a busca abre). Abrir um resultado chama `garantirCorpos`.
3. **Aluno logado em aparelho novo: baixar 2× o necessário para a sessão do dia.** Regra: ao montar a sessão de hoje, carregar os corpos das provas das questões da sessão e **mais o equivalente a outra sessão** (a de amanhã, que o algoritmo já consegue prever pelo mesmo critério) — ou seja, o dobro do que a sessão usa, em segundo plano e sem travar a tela. Sem "baixar as provas recentes" por conta própria. A fase 3 ainda oferece o botão de guardar tudo.
4. **Telas de administração: espera aceita pelo dono.** Contexto: Banco de Questões, Central de Provas e Questões para Atualizar listam e filtram **todas** as questões, inclusive pelo texto. Com o corpo sob demanda, ao abrir uma dessas telas a plataforma precisa primeiro baixar o corpo de todas as provas (~25 MB, algumas segundos; só na primeira vez, depois fica guardado), com uma barra de progresso. Só a equipe usa essas telas; aluno nunca passa por elas. Decisão: aceitar a espera, com barra de progresso. (A alternativa, refazer essas telas para paginar só pela ficha e pelo índice de busca, ficou descartada por ora.)

## 8. O que não fazer

- Não trocar para módulos ES, bundler ou framework (regra da casa: sem build, sem dependências).
- Não mexer no formato de `dados/prova-*.js` nem nas ferramentas de conteúdo: o corpo continua nos arquivos de hoje.
- Não usar Web Worker ou IndexedDB para o conteúdo nesta rodada: o ganho vem de **carregar menos**, não de carregar em outro lugar; ficam como opção da fase 3 se a medição pedir.
- Não prometer a meta de memória antes de a `copiaProfunda` sair (fase 2c).

## 9. Como começar a conversa nova

Diga: "Executar a fase 0 (ou 1) do `docs/PROJETO-CARGA-INICIAL.md`". As quatro decisões da seção 7 já estão tomadas: nada a perguntar antes da fase 2. Comandos úteis para se situar sem abrir arquivo grande: `npm run mapa -- persistencia`, `npm run mapa -- SEED`, `npm run mapa -- busca`, `npm run dados` (visão do conteúdo).
