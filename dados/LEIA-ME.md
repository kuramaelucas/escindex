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

A lista completa — arquivo por arquivo, com título, itens, questões que faltam,
anuladas e figuras pendentes — está em **[`CATALOGO.md`](CATALOGO.md)**, gerado
do próprio conteúdo por `npm run publicar` (por isso as contagens nunca
envelhecem e ninguém atualiza número em documento). Para consultar sem abrir
arquivo (cada prova tem ~300 KB): `npm run dados` (visão geral),
`npm run dados -- usp-2026` (uma prova), `npm run dados -- q-usp2026-017`
(uma questão), `npm run dados -- taxonomia cardio` (ids de assunto),
`npm run dados -- buscar "sepse"` (enunciados).

**`manifesto.js` é a lista dos arquivos, na ordem em que carregam** (a ordem
importa: a taxonomia vem primeiro, porque todo o resto aponta para ela). É
nele — e não no `index.html` — que um arquivo novo é registrado, de modo que
acrescentar conteúdo só mexe nesta pasta. O teste de higiene falha se a lista
e a pasta divergirem.

Os tipos de arquivo: `taxonomia.js`, `calendario.js`, `banco-didatico.js`
(questões autorais), `prova-<banca>-<ano>.js` (uma prova real cada),
`flashcards-*.js` (cartões da equipe), `simulados-equipe.js` e
`demonstracao.js` (vazio de propósito: as contas de exemplo moram em
`testes/fixtures/`). Observações de cada prova (origem do gabarito, figuras,
anuladas) ficam no **cabeçalho do próprio arquivo**.

A pasta `imagens/` guarda as figuras das provas (ECG, radiografia, tabela) —
ver `imagens/LEIA-ME.md`, que explica como anexar. O resumo de tudo o que falta no banco de questões
(provas incompletas, textos cortados, gabaritos a conferir) está em
`../PENDENCIAS.md`.

### Para a turma real entrar

O `demonstracao.js` já está vazio: a plataforma abre limpa, sem contas de
teste, sem comentários inventados e sem agradecimentos de exemplo, e não perde
questão, cartão nem calendário. As contas de exemplo (administrador,
professor, residente e aluno `@esc.demo`) ficam só em
`testes/fixtures/demonstracao.js`, que o servidor dos testes entrega no lugar
dele. A primeira conta administradora se faz pela nuvem (`nuvem/LEIA-ME.md`).

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
2. **Por linha de comando, com a entrada compacta** (o caminho de quem — pessoa
   ou IA — transcreve uma prova inteira; ver "Entrada compacta" abaixo):
   `npm run nova-prova` cria o arquivo e o registra em `manifesto.js`;
   `npm run adicionar-questoes` grava os lotes, conferindo antes.
3. **À mão:** acrescentar itens a um arquivo que já existe aqui (copie o molde
   abaixo e acrescente antes do `]);` do fim), ou criar um arquivo novo e
   escrever o nome dele (sem o `.js`) em `manifesto.js`. É assim que entra uma
   prova inteira de uma banca nova, e **a ordem da lista é a ordem em que o
   conteúdo entra no banco**.

**Depois de qualquer mudança aqui, rode `npm run publicar` — uma vez.** Ele
regera o `CATALOGO.md` e atualiza a versão no `index.html`. A versão
(`window.ESC_VERSAO`) tem o formato `AAAA-MM-DD.cHASH.dHASH`: o `cHASH` vem do
código e o `dHASH` do conteúdo desta pasta, e é por isso que o navegador de
cada aluno só baixa de novo o que mudou — **mudar a plataforma não refaz o
download das questões (12 MB), e acrescentar uma prova não refaz o do código**.
Ninguém troca a versão à mão (e esquecer não passa: `npm test` e o CI conferem
com `npm run publicar -- --conferir`).

## Entrada compacta — como subir uma prova gastando pouco

Prova nova, do zero:

```
npm run nova-prova -- usp-2027 "USP-SP (FMUSP)" 2027 --total 120
npm run dados -- taxonomia cardio                  # ids de assunto, só os que interessam
npm run adicionar-questoes -- usp-2027 lote-1.json # lotes de 20–30; cada um é conferido
npm run publicar
```

`nova-prova` cria `dados/prova-usp-2027.js` com o cabeçalho no padrão e a
**ficha** da prova (`@ficha {...}`: banca, ano, prefixo dos ids, nº de
alternativas, tipo) e a põe em `manifesto.js`. O arquivo de lote é uma lista
JSON em que cada questão traz **só o que é dela** — a ferramenta completa
`id`, `banca`, `ano`, `real`, `areaId`/`especialidadeId` (pelo assunto),
`estatisticas`, `criadoPor`/`criadoEm`, e escreve no formato das outras provas:

```json
[{ "n": 1, "assunto": "ass-sca",
   "enunciado": "Homem, 58 anos, dor torácica…",
   "alt": ["texto da A", "texto da B", "texto da C", "texto da D"],
   "gabarito": "C",
   "explicacao": "A alternativa C está correta. Dicas do enunciado: **…** …",
   "referencias": "Diretriz X, 2025.",
   "dificuldade": "intermediario" }]
```

**Questão dissertativa** (o aluno escreve a resposta, diz a confiança, vê a
esperada e se avalia): no lugar de `alt` e `gabarito`, `"tipo":"dissertativa"`
e `"resposta"` (a resposta esperada pela banca). A explicação segue o mesmo
padrão (dicas do enunciado, parâmetros em `**destaque**`), menos o item das
alternativas, que não existem. Fica fora de simulado e de PDF.

```json
[{ "n": 5, "assunto": "ass-sepse", "tipo": "dissertativa",
   "enunciado": "Descreva a conduta na primeira hora do choque séptico.",
   "resposta": "Reposição volêmica, antibiótico em até 1 hora, noradrenalina se PAM < 65.",
   "explicacao": "Dicas do enunciado: **choque séptico** …" }]
```

Opcionais: `status:"anulada"` (com `motivo` e `gabarito:""`), `figura:"png"`
(ou `"jpg"`; a imagem tem de estar em `dados/imagens/<id>.png`),
`imagemPendente:"ECG de admissão"`, `imagemLegenda`, `explicacoesAlternativas`.
É **tudo ou nada**: se uma questão do lote falha (assunto que não existe,
gabarito fora das letras, número repetido, explicação fora do padrão de
justificativa, campo desconhecido), nada é gravado e o problema vem com o
número da questão; `--simular` só confere. Depois de gravar, o conferidor
completo roda de novo e, se achar erro nessas questões, o arquivo volta ao que era.

Para **mudar a plataforma sem mexer em questões** vale o inverso: o
conteúdo não conhece o código (só o molde acima), o teste de conteúdo
(`npm run testar-mudanca`) escolhe sozinho o que rodar conforme o que mudou, e o
hash do conteúdo não muda enquanto esta pasta não mudar.

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
  tipoProva:"residencia",          // opcional: "residencia" (padrão) ou "graduacao" (prova da faculdade, Teste de Progresso)
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

## Como escrever a explicação (o padrão de justificativa)

Além de dizer por que a correta é correta e por que cada uma das outras está
errada, a explicação segue uma regra para os casos em que **um número decide
o diagnóstico ou a conduta** — sinal vital, exame laboratorial, medida de
imagem, tempo, dose, idade-limite ou escore:

1. **Destaque o parâmetro** entre dois asteriscos, já com o valor do caso:
   `**PAS 82 mmHg**`, `**Glasgow 8**`, `**CURB-65 = 3**`. Na tela ele aparece
   com realce próprio (é diferente do destaque amarelo que o aluno faz).
2. **Diga o valor normal ou esperado** (ou o alvo terapêutico), com unidade:
   `(normal: 90–120 mmHg)`.
3. **Diga o ponto de corte que muda a conduta** e o que ele muda:
   `< 90 mmHg define choque → expansão volêmica`.
4. **Escore validado** (Glasgow, APGAR, CURB-65, qSOFA, Wells, CHA2DS2-VASc,
   Child-Pugh, MELD, Alvarado…): calcule-o para o caso, mostre a soma item a
   item e a faixa de risco/conduta correspondente.
5. Valores e pontos de corte são os da diretriz citada em `referencias`; se
   mudam com idade, sexo, gestação ou método, diga para quem valem. Sem
   certeza do número, escreva isso — não invente.
6. Asteriscos só nos parâmetros (poucos por explicação, nunca em título nem
   em palavra comum). Questão que não depende de número não leva asterisco.

Exemplo: `"… o paciente está em choque: **PAS 82 mmHg** (normal: 90–120 mmHg;
< 90 mmHg = choque) com **FC 128 bpm** (normal: 60–100). A conduta é expansão
volêmica antes de qualquer investigação…"`.

Esse é o texto que a plataforma põe nos prompts de transcrição (Importar,
Enviar Questões e Central de Provas) e no de *Tirar dúvida com IA*
(`regraDeParametrosObjetivos`, em `codigo/08-sessao-e-revisao.js`): a IA
responde do mesmo jeito em qualquer caminho. Explicações antigas continuam
valendo como estão; para melhorá-las, use *Questões para Atualizar*.

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
corretos. Prova **da graduação** (prova da faculdade, Teste de Progresso)
marca também `tipoProva: "graduacao"`; sem o campo, a questão é de
residência — o padrão, e o que o banco inteiro é hoje. A instituição
"Teste de Progresso" já é reconhecida como graduação mesmo sem o campo. Questão autoral da equipe mantém `real: false` **e nunca leva o
nome de uma banca de verdade** em `banca` — use `"Esc — Banco Didático"`.
Até setembro de 2026, trinta questões autorais diziam "UNIFESP-EPM" e
entravam em *Provas Antigas* misturadas às provas reais (a de 2024 aparecia
com 101 questões, e havia uma "prova de 2021" que nunca existiu). Hoje
*Provas Antigas* só mostra questão real, e lista à parte as anuladas pela
banca — que não têm gabarito e por isso ficam fora da nota.

### Exceção: provas que trazem o comentário oficial junto

O Teste de Progresso do NIEPAEM (graduação) é divulgado com um **gabarito
comentado com referências bibliográficas**, publicado pela própria banca no
mesmo dia da prova. Esse comentário não é de terceiro: nas provas
`prova-tp-*` a explicação parte dele e é **reescrita e aprimorada** pela equipe
(dicas do enunciado, parâmetros com valor normal e ponto de corte em destaque,
o motivo de cada alternativa errada) e as referências oficiais vão em
`referencias`. Onde o gabarito da banca é discutível (a explicação diz), o
texto avisa. A instituição é uma só
(`Teste de Progresso NIEPAEM`) e o semestre vai no campo `semestre` (1 ou 2) de
cada questão, porque Provas Antigas agrupa por instituição, ano, semestre e
tipo e duas aplicações no mesmo ano se misturariam; a tela mostra `2023.1` e
`2023.2`. Em prova nova: `npm run nova-prova -- tp-2027-1 "Teste de Progresso
NIEPAEM" 2027 --tipo graduacao --semestre 1`. Quando a banca **não** divulga o
comentário (o caderno de 2022 chegou só com a alternativa certa marcada, sempre
em A), a explicação é inteira da equipe, escrita de fontes primárias, as
alternativas são embaralhadas para o estudo não virar "marque sempre A", e a
questão cuja marcação contradiz o próprio enunciado segue o conteúdo e leva o
motivo em `motivoStatus` (2022 nº 117).

### Padrão de justificativa de prova nova (conferido sozinho)

Toda questão **real** de uma prova nova — de qualquer banca, com ou sem
comentário oficial — tem de trazer a justificativa completa, e quem confere é
`npm run conferir` (e o teste `conteudo.test.mjs`), que **falha** se faltar algo:

1. corpo suficiente (300 caracteres ou mais);
2. os dados objetivos e as dicas que levam à resposta **em destaque** entre
   `** **` (sinal vital, exame com o valor, ponto de corte, escore, achado da imagem);
3. o rótulo **"Dicas do enunciado:"** (ou "Dicas da imagem:", "da figura:"…), que
   mostra ONDE no caso está a resposta;
4. **cada alternativa errada** com o seu motivo (cada letra errada aparece no
   texto). Questão anulada só fica dispensada deste item.

Abertura recomendada: `A alternativa C está correta. Dicas do enunciado: **…**: diagnóstico…`.
Hoje **todas** as provas reais do banco cumprem o padrão: a lista
`PROVAS_ANTERIORES_AO_PADRAO` (em `testes/conferir-dados.mjs`) está vazia e
fica assim. Prova nova **não** se acrescenta a ela: tem de cumprir a regra. O mesmo texto
está nos prompts de importação (`regrasDeConteudoImportacao`), para a IA já
entregar a explicação no padrão.

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
