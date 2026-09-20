# Pasta `dados/` — o conteúdo da plataforma

Esta pasta guarda **o que a plataforma ensina**: as questões e os flashcards já
adaptados ao formato do Esc. O arquivo `index.html`, um nível acima, guarda **o
código** — telas, regras, algoritmos. São coisas diferentes, e agora moram em
arquivos diferentes.

A separação existe por um motivo prático: com as 635 questões e os 501 cartões
dentro do `index.html`, ele tinha 1,7 MB e quase 16.800 linhas. Abrir, revisar
ou pedir para uma IA mexer no código significava atravessar centenas de
páginas de enunciado médico antes de chegar à primeira linha que importava.
Separados, o código cabe em ~546 KB (~8.000 linhas) e cada prova é um arquivo
que se abre, se lê e se confere sozinho.

**O site não mudou.** Quem abre o `index.html` recebe tudo junto, como antes.

---

## O que tem aqui

| Arquivo | O que guarda | Itens |
|---|---|---|
| `banco-didatico.js` | Questões autorais: 30 de demonstração no estilo da UNIFESP-EPM + 105 de construção de conhecimento (Técnica Operatória, Cardiologia, Infectologia, Oftalmologia), instituição "Esc — Banco Didático". Todas com `real:false`. | 135 |
| `prova-unifesp-2022.js` | Prova da UNIFESP-EPM 2022 (Acesso Direto), com explicação autoral | 100 |
| `prova-unifesp-2023.js` | Idem, 2023 | 100 |
| `prova-unifesp-2024.js` | Idem, 2024 | 100 |
| `prova-unifesp-2025.js` | Idem, 2025 | 100 |
| `prova-unifesp-2026.js` | Idem, 2026 | 100 |
| `flashcards-equipe.js` | Os cartões de conceito do baralho da equipe (frente/verso) | 501 |

Os cartões **pessoais** de cada aluno e os cartões **gerados automaticamente** a
partir dos erros não ficam aqui: nascem no uso e vivem no navegador de cada um.

---

## Como cada arquivo se liga ao site

O `index.html` carrega esta pasta antes do próprio código, nestas linhas (procure
por `CONTEÚDO: A PASTA` dentro dele):

```html
<script src="dados/banco-didatico.js"></script>
<script src="dados/prova-unifesp-2022.js"></script>
...
<script src="dados/flashcards-equipe.js"></script>
```

Cada arquivo chama uma função e entrega a sua lista:

```js
EscDados.registrarQuestoes("prova-unifesp-2022", [ ...as 100 questões... ]);
EscDados.registrarFlashcards("flashcards-equipe", [ ...os cartões... ]);
```

O código junta tudo em `SEED_QUESTOES` e `SEED_FLASHCARDS`, na ordem em que os
arquivos aparecem no `index.html`, e o resto da plataforma funciona como sempre
funcionou. Quem já usava a plataforma recebe o conteúdo novo automaticamente:
`sincronizarConteudoNovo()` acrescenta ao banco salvo no navegador só o que
falta, sem apagar respostas, favoritos ou questões próprias.

**A única regra:** a pasta `dados/` precisa estar ao lado do `index.html`, e ser
publicada junto com ele. Se faltar, a plataforma abre assim mesmo e mostra uma
tarja explicando o que houve — e *Configurações > Arquivos de conteúdo* lista, por
nome, o que chegou.

---

## Acrescentar uma prova nova (uma banca, um ano)

1. **Copie** um arquivo de prova que já existe, por exemplo `prova-unifesp-2022.js`,
   e dê a ele o nome novo: `prova-usp-2024.js`.
2. **Troque o cabeçalho** (o comentário do topo) e o apelido na primeira linha de
   código: `EscDados.registrarQuestoes("prova-usp-2024", [`.
3. **Troque as questões** — o molde de cada uma está no fim deste arquivo.
4. **Registre o arquivo** no `index.html`, acrescentando mais uma linha junto das
   outras:
   ```html
   <script src="dados/prova-usp-2024.js"></script>
   ```
5. Abra a plataforma e confira em *Configurações > Arquivos de conteúdo*: o
   arquivo novo tem de aparecer na lista, com a contagem certa.

Se preferir não mexer em arquivo nenhum, a tela **Importar Questões**, dentro do
app, faz o mesmo trabalho pela interface — é o caminho recomendado para quem não
programa. A diferença é onde a questão fica salva: pela tela, ela vai para o
navegador de quem importou; por aqui, ela passa a fazer parte do site para todo
mundo que o abrir.

---

## Política de conteúdo (vale para todo arquivo desta pasta)

- **Enunciado, alternativas e gabarito oficial de prova pública são domínio
  público.** Prova de residência de instituição pública é ato público: pode ser
  transcrita integralmente, sem parafrasear. Essa questão entra com `real: true`,
  banca e ano corretos.
- **A explicação é sempre autoral.** Nunca se copia, resume ou parafraseia
  resolução de cursinho (Medway, Estratégia MED etc.) ou de site de questões
  comerciais: além de ser propriedade intelectual de terceiros, é a parte mais
  sujeita a erro e desatualização quando copiada sem checar. A explicação é
  escrita pela equipe, a partir de fontes primárias e oficiais (diretrizes de
  sociedades, PCDT do Ministério da Saúde, revisões e artigos originais), citadas
  no campo `referencias`.
- Questão anulada pela banca entra com `status:"anulada"` e `motivoStatus`
  preenchido, mas mantém explicação pedagógica.

---

## O molde de uma questão

```js
{
  id:"q-usp2024-001",                    // único em toda a plataforma
  banca:"USP-SP (FMUSP)", real:true, ano:2024,
  areaId:"area-cm",                      // as 5 grandes áreas (ver SEED_TAXONOMIA)
  especialidadeId:"esp-cardio",
  assuntoId:"ass-sca",
  enunciado:"O texto oficial da questão, copiado integralmente.",
  alternativas:[
    {id:"A",texto:"..."},
    {id:"B",texto:"..."},
    {id:"C",texto:"..."},
    {id:"D",texto:"..."}],              // a alternativa E é opcional
  gabarito:"B",                          // vazio ("") quando a questão foi anulada
  explicacaoGeral:"A explicação autoral, escrita pela equipe.",
  explicacoesAlternativas:{A:"por que esta está errada", C:"..."},  // opcional
  referencias:"Diretriz, protocolo ou artigo que embasa a explicação.",
  dificuldadeManual:"intermediario",     // fundamental | intermediario | avancado
  status:"ativa",                        // ativa | anulada | desatualizada
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-09-19"
},
```

`areaId`, `especialidadeId` e `assuntoId` têm de existir na taxonomia, que fica no
`index.html` em `SEED_TAXONOMIA` (5 grandes áreas, 39 especialidades, 216
assuntos). Assunto que ainda não existe se cria por lá, ou pela tela
*Especialidades e Assuntos* dentro do app.

## O molde de um flashcard

```js
{ id:"fc-502", assuntoId:"ass-sca",
  frente:"A pergunta curta.",
  verso:"A resposta direta, em uma ou duas frases." },
```

O `.map()` no fim do `flashcards-equipe.js` é o que marca todos os cartões como
material da equipe (`usuarioId:null`) — é isso que os torna visíveis para todos
os alunos. Não apague essa linha.

---

## Conferir depois de mexer

Antes de publicar, vale rodar a checagem de sintaxe (precisa de Node instalado):

```bash
node --check dados/prova-usp-2024.js
```

Se ele não reclamar, o arquivo está bem formado. Depois abra a plataforma e
confirme a contagem em *Configurações > Arquivos de conteúdo*. Erro de vírgula é o
engano mais comum: uma vírgula a menos entre duas questões derruba o arquivo
inteiro, e aí aquele arquivo simplesmente não entrega nada — os outros continuam
funcionando.
