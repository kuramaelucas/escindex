# A pasta `dados/` — o conteúdo da plataforma

Esta pasta guarda **o que os alunos estudam**: as questões e os flashcards que
já vêm prontos com a plataforma. O `index.html`, ao lado, guarda **o código**:
as telas, as regras e os algoritmos.

A separação é só de arquivo — no site nada muda. Quem abre o `index.html`
(pelo endereço do site ou com dois cliques na pasta) recebe tudo junto,
exatamente como antes. **A única regra é manter esta pasta ao lado do
`index.html`**, inclusive na hora de publicar o site.

Se a pasta faltar, a plataforma não quebra: ela abre e mostra uma tarja no
alto da tela dizendo o que falta. O que cada pessoa já tinha salvo no
navegador continua lá.

## O que tem aqui

| Arquivo | Conteúdo | Itens |
| --- | --- | --- |
| `banco-didatico.js` | Questões autorais da equipe, no estilo da prova | 135 |
| `prova-unifesp-2022.js` | UNIFESP-EPM 2022 (Acesso Direto), prova real | 100 |
| `prova-unifesp-2023.js` | UNIFESP-EPM 2023 (Acesso Direto), prova real | 100 |
| `prova-unifesp-2024.js` | UNIFESP-EPM 2024 (Acesso Direto), prova real | 100 |
| `prova-unifesp-2025.js` | UNIFESP-EPM 2025 (Acesso Direto), prova real | 100 |
| `prova-unifesp-2026.js` | UNIFESP-EPM 2026 (Acesso Direto), prova real | 100 |
| `flashcards-equipe.js` | Cartões de conceito escritos pela equipe | 501 |

Total: **635 questões** e **501 cartões**.

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

Flashcards usam a outra função:

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
  areaId:"area-cm",                // ver SEED_TAXONOMIA no index.html
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
`SEED_TAXONOMIA` (no `index.html`). Se o assunto ainda não existir, acrescente
ele lá primeiro — a plataforma realinha área e especialidade pelo assunto
sozinha ao carregar.

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
  mostra isso na hora.
