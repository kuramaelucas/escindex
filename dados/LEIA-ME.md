# A pasta `dados/` — o conteúdo da plataforma

Esta pasta guarda **todo o conteúdo** da plataforma: a taxonomia, o calendário
de blocos, as questões, os flashcards, os simulados e os dados de
demonstração. O código fica na pasta `codigo/`, e o `index.html` é só a
moldura que carrega as duas — nenhuma questão, nenhum cartão, nenhum nome de
bloco, nenhuma conta fica fora daqui.

A separação é só de arquivo — no site nada muda. Quem abre o `index.html`
(pelo endereço do site ou com dois cliques na pasta) recebe tudo junto.
**A única regra é manter esta pasta ao lado do `index.html`** (junto com
`codigo/`), inclusive na hora de publicar o site.

Se a pasta faltar, a plataforma não quebra: ela abre e mostra uma tarja no
alto da tela dizendo o que falta. O que cada pessoa já tinha salvo no
navegador continua lá.

**Para conferir tudo de uma vez** (ids repetidos, gabarito fora das
alternativas, assunto que não existe, prova com questão faltando, figura que
falta), rode `npm run conferir` — ou `node testes/conferir-dados.mjs`. Ele roda
sozinho no GitHub a cada envio.

## O que tem aqui

Na ordem em que são carregados (a ordem importa: a taxonomia vem primeiro
porque todo o resto aponta para ela):

| Arquivo | Conteúdo | Itens |
| --- | --- | --- |
| `taxonomia.js` | Área > especialidade > assunto | 5 + 41 + 235 |
| `calendario.js` | Blocos de estudo e a sequência de cada ano | 8 + 4 anos (o 4º tem 10 blocos e 10 turmas; o 5º, 12 estágios e o quadro de turmas) |
| `banco-didatico.js` | Questões autorais da equipe, no estilo da prova | 135 |
| `prova-unifesp-2022.js` | UNIFESP-EPM 2022 (Acesso Direto), prova real | 100 |
| `prova-unifesp-2023.js` | UNIFESP-EPM 2023 (Acesso Direto), prova real | 100 |
| `prova-unifesp-2024.js` | UNIFESP-EPM 2024 (Acesso Direto), prova real | 100 |
| `prova-unifesp-2025.js` | UNIFESP-EPM 2025 (Acesso Direto), prova real | 100 |
| `prova-unifesp-2026.js` | UNIFESP-EPM 2026 (Acesso Direto), prova real | 100 |
| `prova-santacasa-2021.js` | Santa Casa de São Paulo (FCMSCSP) 2021 (R1 Acesso Direto), prova real | 100 |
| `prova-santacasa-2022.js` | Santa Casa de São Paulo (FCMSCSP) 2022 (R1 Acesso Direto), prova real | 100 |
| `prova-santacasa-2023.js` | Santa Casa de São Paulo (FCMSCSP) 2023 (R1 Acesso Direto), prova real | 100 |
| `prova-santacasa-2025.js` | Santa Casa de São Paulo (FCMSCSP) 2025 (R1 Acesso Direto), prova real | 100 |
| `prova-santacasa-2026.js` | Santa Casa de São Paulo (FCMSCSP) 2026 (R1 Acesso Direto), prova real | 100 |
| `prova-usp-2022.js` | USP-SP (FMUSP) 2022 (R1 Acesso Direto), prova real | 100 |
| `prova-usp-2023.js` | USP-SP (FMUSP) 2023 (R1 Acesso Direto), prova real | 120 |
| `prova-usp-2024.js` | USP-SP (FMUSP) 2024 (R1 Acesso Direto), prova real | 120 |
| `prova-usp-2025.js` | USP-SP (FMUSP) 2025 (R1 Acesso Direto), prova real | 120 |
| `prova-usp-2026.js` | USP-SP (FMUSP) 2026 (R1 Acesso Direto), prova real | 120 |
| `flashcards-equipe.js` | Cartões de conceito escritos pela equipe | 501 |
| `flashcards-assuntos-novos.js` | Cartões dos 125 assuntos que não tinham nenhum (revisão pendente) | 376 |
| `flashcards-assuntos-usp.js` | Cartões dos 19 assuntos abertos pelas provas da USP-SP (revisão pendente) | 57 |
| `simulados-equipe.js` | Provas montadas por professor/coordenação | 1 |
| `demonstracao.js` | Contas, comentários e livro de ouro de exemplo | 4 + 5 + 4 |

Total: **1.715 questões** (1.580 reais, de 15 provas), **934 cartões**, **235 assuntos** (todos com pelo
menos 3 cartões da equipe) e **1 simulado**.

A pasta `imagens/` guarda as figuras das provas (ECG, radiografia, tabela) —
ver `imagens/LEIA-ME.md`, que lista as 298 que ainda faltam.

### Para a turma real entrar

Esvazie **só** o `demonstracao.js` — deixe as três listas como `[]`. A
plataforma abre limpa, sem contas de teste, sem comentários inventados e sem
os agradecimentos de exemplo, e não perde questão, cartão nem calendário. Os
outros vinte e um arquivos continuam valendo.

As contas de teste já estão no mínimo: **uma** de administrador (a da
coordenação que mantém a plataforma) mais professor, residente e aluno, que
existem para conferir como cada papel enxerga as telas. Na tela de entrada, o
único acesso rápido oferecido a quem chega é o de **aluno** — os outros três
entram por e-mail e senha. Antes de publicar, troque pelo menos a senha da
conta de administrador (Perfil > Mudar a senha) ou apague-a e use a conta da
nuvem, que é a de verdade.

Para conferir o que o navegador carregou de verdade, entre como administrador
e vá em **Configurações > Arquivos de conteúdo**: a tela lista arquivo por
arquivo, com a contagem de itens.

## Três caminhos para acrescentar conteúdo

Do mais fácil ao mais trabalhoso:

1. **Pela própria plataforma** (recomendado, e não exige mexer em arquivo
   nenhum, exceto no último passo):
   - **Admin > Importar Questões** — cola um bloco de questões já formatado e
     publica.
   - **Admin > Central de Provas** — sobe uma prova inteira em lotes (1–25,
     26–50…), com duas ou mais pessoas trabalhando ao mesmo tempo, conferindo
     cada lote antes de publicar.
   - **Admin > Blocos de Estudo** — edita a sequência de cada ano: adiciona e
     exclui blocos, muda a ordem pelas setas (o conteúdo troca de janela de
     data e o rodízio inteiro anda junto), escreve a letra da turma que começa
     em cada bloco e, em **Virada de ano letivo**, desloca o calendário todo
     informando só a data de início do primeiro bloco — a duração de cada
     bloco e os intervalos entre eles são preservados.
   - **Admin > Blocos de Estudo > Exportar calendário** — baixa um
     `calendario.js` pronto, com a sequência de todos os anos como está
     naquele navegador.
   O que entra por aí fica salvo **no navegador de quem publicou ou editou**.
   Para virar conteúdo de todo mundo, é preciso trazer para esta pasta: troque
   o arquivo correspondente (`calendario.js` no caso do botão acima) pelo que
   foi exportado, ou siga o caminho 2 ou 3 para questões/taxonomia/etc., e
   publique o site de novo.
2. **Acrescentar itens a um arquivo que já existe aqui.** Abra o arquivo, copie
   o molde abaixo e acrescente antes do `]);` do fim.
3. **Criar um arquivo novo** aqui e escrever o nome dele (sem o `.js`) na
   lista `ESC_ARQUIVOS.dados` do `index.html` — é uma lista curta, logo no
   fim do arquivo. É assim que entra uma prova inteira de uma banca nova.
   **A ordem da lista é a ordem em que o conteúdo entra no banco** (a
   taxonomia vem primeiro, porque todo o resto aponta para ela).

**A cada publicação, mude a versão — num lugar só.** O `window.ESC_VERSAO`,
no alto do `index.html`, é a data que vai no endereço de cada arquivo
(`?v=…`) e é ela que impede o navegador de continuar usando o arquivo antigo
depois de uma troca (e que faz a página se atualizar sozinha). Mudou um
arquivo daqui — inclusive o `calendario.js` exportado da plataforma? Troque
essa data antes de publicar. (Até setembro de 2026 eram doze lugares para
trocar; o carregador passou a montar todos os endereços a partir dela.)

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
  { id:"fc-t27-001", assuntoId:"ass-sca", frente:"…", verso:"…",
    fonte:"Diretriz X, 2025", revisao:"pendente", criadoPor:"seed", criadoEm:"2026-09-21" },
]);
```

Cartão de arquivo é sempre **material da equipe**, visível para todos (cartão
com `usuarioId` é caderno pessoal de um aluno, e esse não mora em arquivo
nenhum: nasce no uso). `fonte` aparece no verso do cartão. `revisao:"pendente"`
marca o que ainda não foi lido por um professor — quem gere conteúdo vê o
selo "revisão pendente" no verso; troque para `"ok"` ao conferir.

**O jeito mais rápido de escrever muitos cartões** é pela própria
plataforma: *Revisão Rápida > Cobrir os assuntos sem cartão — em lote*
escolhe os assuntos com menos cartões (os que mais caem na prova primeiro),
dá o prompt pronto para uma conversa de IA, confere o que voltou e tem o
botão **Exportar cartões publicados para a pasta dados/**, que baixa um
arquivo já neste formato.

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
  numeroNaProva:1,                 // obrigatório em questão real: o número dela na prova
  imagemUrl:"dados/imagens/q-usp2026-001.png",  // opcional: figura da prova (ver imagens/LEIA-ME.md)
  imagemPendente:"ECG de admissão",  // opcional: a figura que a prova tinha e ainda falta
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

Questão real marca `real: true`, com instituição, ano e `numeroNaProva`
corretos. Questão autoral da equipe mantém `real: false` **e nunca leva o
nome de uma banca de verdade** em `banca` — use `"Esc — Banco Didático"`.
Até setembro de 2026, trinta questões autorais diziam "UNIFESP-EPM" e
entravam em *Provas Antigas* misturadas às provas reais (a de 2024 aparecia
com 101 questões, e havia uma "prova de 2021" que nunca existiu). Hoje
*Provas Antigas* só mostra questão real, e lista à parte as anuladas pela
banca — que não têm gabarito e por isso ficam fora da nota.

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
