# A pasta `dados/` — o conteúdo da plataforma

Esta pasta guarda **todo o conteúdo** da plataforma: a taxonomia, o calendário
de blocos, as questões, os flashcards, os simulados e os dados de
demonstração. O `index.html`, ao lado, guarda **só o código**: as telas, as
regras e os algoritmos — nenhuma questão, nenhum cartão, nenhum nome de bloco,
nenhuma conta.

A separação é só de arquivo — no site nada muda. Quem abre o `index.html`
(pelo endereço do site ou com dois cliques na pasta) recebe tudo junto,
exatamente como antes. **A única regra é manter esta pasta ao lado do
`index.html`**, inclusive na hora de publicar o site.

Se a pasta faltar, a plataforma não quebra: ela abre e mostra uma tarja no
alto da tela dizendo o que falta. O que cada pessoa já tinha salvo no
navegador continua lá.

## O que tem aqui

Na ordem em que são carregados (a ordem importa: a taxonomia vem primeiro
porque todo o resto aponta para ela):

| Arquivo | Conteúdo | Itens |
| --- | --- | --- |
| `taxonomia.js` | Área > especialidade > assunto | 5 + 39 + 216 |
| `calendario.js` | Blocos de estudo e a sequência de cada ano | 8 + 5 anos |
| `banco-didatico.js` | Questões autorais da equipe, no estilo da prova | 135 |
| `prova-unifesp-2022.js` | UNIFESP-EPM 2022 (Acesso Direto), prova real | 100 |
| `prova-unifesp-2023.js` | UNIFESP-EPM 2023 (Acesso Direto), prova real | 100 |
| `prova-unifesp-2024.js` | UNIFESP-EPM 2024 (Acesso Direto), prova real | 100 |
| `prova-unifesp-2025.js` | UNIFESP-EPM 2025 (Acesso Direto), prova real | 100 |
| `prova-unifesp-2026.js` | UNIFESP-EPM 2026 (Acesso Direto), prova real | 100 |
| `flashcards-equipe.js` | Cartões de conceito escritos pela equipe | 501 |
| `simulados-equipe.js` | Provas montadas por professor/coordenação | 1 |
| `demonstracao.js` | Contas, comentários e livro de ouro de exemplo | 7 + 5 + 4 |

Total: **635 questões**, **501 cartões**, **216 assuntos** e **1 simulado**.

### Para a turma real entrar

Esvazie **só** o `demonstracao.js` — deixe as três listas como `[]`. A
plataforma abre limpa, sem contas de teste, sem comentários inventados e sem
os agradecimentos de exemplo, e não perde questão, cartão nem calendário. Os
outros dez arquivos continuam valendo.

Para conferir o que o navegador carregou de verdade, entre como administrador
e vá em **Configurações > Arquivos de conteúdo**: a tela lista arquivo por
arquivo, com a contagem de itens.

## Três caminhos para acrescentar conteúdo

Do mais fácil ao mais trabalhoso:

1. **Pela própria plataforma** (recomendado, e não exige mexer em arquivo
   nenhum):
   - **Admin > Importar Questões** — cola um bloco de questões já formatado e
     publica.
   - **Admin > Central de Provas** — sobe uma prova inteira em lotes (1–25,
     26–50…), com duas ou mais pessoas trabalhando ao mesmo tempo, conferindo
     cada lote antes de publicar.
   O que entra por aí fica salvo **no navegador de quem publicou**. Para virar
   conteúdo de todo mundo, exporte e traga para esta pasta (caminho 2 ou 3).
2. **Acrescentar itens a um arquivo que já existe aqui.** Abra o arquivo, copie
   o molde abaixo e acrescente antes do `]);` do fim.
3. **Criar um arquivo novo** aqui e registrá-lo com mais uma linha
   `<script src="dados/o-nome-do-arquivo.js"></script>` no `index.html` (procure
   por `CONTEÚDO: A PASTA` lá dentro). É assim que entra uma prova inteira de
   uma banca nova. **A ordem das linhas `<script>` é a ordem em que o conteúdo
   entra no banco.**

## Como é um arquivo desta pasta

Cada arquivo chama uma única função e entrega a sua lista. O nome entre aspas
é o que aparece em *Configurações > Arquivos de conteúdo* (é o nome do
arquivo, sem o `.js`):

```js
window.EscDados.registrarQuestoes("prova-usp-2026", [
  { /* questão */ },
  { /* questão */ },
]);
```

São seis funções, uma por tipo de conteúdo:

| Função | Recebe |
| --- | --- |
| `registrarQuestoes(nome, lista)` | uma lista de questões |
| `registrarFlashcards(nome, lista)` | uma lista de cartões |
| `registrarSimulados(nome, lista)` | uma lista de simulados |
| `registrarTaxonomia(nome, {areas, especialidades, assuntos})` | a árvore de assuntos |
| `registrarCalendario(nome, {blocos, sequenciasAno})` | o calendário |
| `registrarDemonstracao(nome, {usuarios, livroOuro, comentarios})` | os dados de exemplo |

**As listas se somam.** Dois arquivos chamando `registrarQuestoes` resultam
nas questões dos dois — é isso que permite acrescentar uma prova (ou mais
assuntos na taxonomia) criando um arquivo novo, sem tocar no que já existe.

Flashcards usam a sua função assim:

```js
window.EscDados.registrarFlashcards("flashcards-turma-2027", [
  { id:"fc-t27-001", assuntoId:"ass-sca", frente:"…", verso:"…" },
].map(c=>({...c, origem:"autoral", usuarioId:null, status:"ativo", criadoPor:"seed", criadoEm:"2026-09-21"})));
```

O `.map(...)` do fim é o que marca o cartão como **material da equipe**
(`usuarioId: null`), visível para todos. Cartão com `usuarioId` preenchido é
caderno pessoal de um aluno, e esse não mora em arquivo nenhum: nasce no uso.

## O molde de uma questão

```js
{
  id:"q-usp2026-001",              // único em toda a plataforma
  banca:"USP-SP (FMUSP)",          // instituição
  real:true,                       // true = prova real; false = questão autoral
  ano:2026,
  areaId:"area-cm",                // os três ids vêm de dados/taxonomia.js
  especialidadeId:"esp-cardio",
  assuntoId:"ass-sca",
  numeroNaProva:1,                 // opcional; a Central de Provas preenche
  enunciado:"Texto da pergunta…",
  alternativas:[
    {id:"A",texto:"…"},
    {id:"B",texto:"…"},
    {id:"C",texto:"…"},
    {id:"D",texto:"…"},
  ],
  gabarito:"C",                    // vazio ("") quando a banca anulou
  explicacaoGeral:"Por que a correta é correta — escrita pela equipe.",
  explicacoesAlternativas:{},      // opcional: {"A":"por que A está errada", …}
  referencias:"Diretriz X, 2025.", // opcional, mas recomendado
  dificuldadeManual:"intermediario",  // fundamental | intermediario | avancado
  status:"ativa",                  // ativa | anulada | rascunho
  motivoStatus:"",                 // obrigatório quando status é "anulada"
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-09-21",
}
```

Os `areaId`, `especialidadeId` e `assuntoId` precisam existir em
`dados/taxonomia.js`. Se o assunto ainda não existir, crie-o primeiro — pela
tela **Conteúdo > Especialidades e Assuntos**, que é o caminho mais seguro, ou
acrescentando um item em `assuntos` naquele arquivo. A plataforma realinha
área e especialidade pelo assunto sozinha ao carregar.

## Política de conteúdo — leia antes de subir prova de verdade

Prova de residência médica pública (USP-SP/FMUSP, USP-RP/FMRP, UNIFESP-EPM,
Santa Casa de São Paulo, IAMSPE, UNESP etc.) é ato de instituição pública: o
**enunciado**, as **alternativas** e o **gabarito oficial** divulgados pela
própria banca são de **domínio público** e podem ser transcritos e usados
integralmente — não é preciso reescrever a pergunta com outras palavras.

O que **nunca** pode ser copiado, resumido ou parafraseado é a
**resolução/comentário de terceiros** (cursinhos, sites de questões
comerciais): esse texto é propriedade intelectual deles, e é também a parte
mais sujeita a erro e desatualização quando copiada sem checar. A explicação
de cada questão real tem de ser **escrita pela equipe**, a partir de fontes
primárias e oficiais (diretrizes, PCDT, artigos).

Questão real marca `real: true`, com instituição e ano corretos. Questão
autoral da equipe mantém `real: false`.

## Cuidados práticos

- **Salve sempre em UTF-8.** Acento torto na tela quase sempre é isso.
- **Aspas dentro do texto** precisam de barra invertida: `"disse \"não\""`.
- **`id` repetido** faz a segunda questão ser ignorada na hora de semear o
  banco de quem já usava a plataforma. Use um prefixo por prova
  (`q-usp2026-001`, `q-usp2026-002`, …).
- Depois de mexer, **abra o `index.html` e confira em Configurações >
  Arquivos de conteúdo** se a contagem bateu. Se um arquivo tiver erro de
  digitação em JavaScript, ele inteiro deixa de carregar — e é essa tela que
  mostra isso na hora. A plataforma também põe uma tarja no alto dizendo
  **qual** arquivo faltou.
- **Um simulado só funciona se as questões dele existirem.** `simulados-equipe.js`
  guarda ids (`"q-019"`); se a questão sair do banco, o simulado fica menor
  sem avisar.
- **A taxonomia é a base.** Apagar um assunto de `taxonomia.js` sem mexer nas
  questões que apontam para ele deixa essas questões órfãs. A plataforma
  realinha área e especialidade sozinha ao carregar, mas não inventa um
  assunto que sumiu — prefira renomear pela tela Especialidades e Assuntos.
