# Esc — instruções para o Claude

Plataforma de estudos para residência médica. Um `index.html` sem build, sem
servidor e sem dependências, que abre com dois cliques no navegador.

O contexto completo do projeto está em `RESUMO-PROJETO-ESC.md` — leia antes de
mexer em qualquer coisa que não seja trivial.

## Código e conteúdo são separados. Respeite a separação.

| Arquivo | O que é | ~Tamanho |
|---|---|---|
| `index.html` | **Código.** Telas, regras, algoritmos, taxonomia, configuração. | ~590 KB |
| `dados/*.js` | **Conteúdo.** Uma prova por arquivo, mais o banco didático e os flashcards da equipe. Texto de questão, não código. | 1,2 MB |
| `nuvem/` | **Infraestrutura opcional.** O esquema SQL do Supabase e o guia de instalação. Não é carregado pelo site. | 30 KB |

**Não abra os arquivos de `dados/` quando o pedido for sobre código.** Eles
existem para ficar fora do caminho: são 1,2 MB de enunciado médico que não
ajudam a consertar uma tela, um algoritmo ou um gráfico. Ler um deles "para
entender o contexto" é desperdício — o formato de uma questão está descrito em
`dados/LEIA-ME.md`, e o resumo do banco está na seção 2 do
`RESUMO-PROJETO-ESC.md`.

Quando o pedido **for** sobre conteúdo, abra só o arquivo em questão:

- corrigir uma explicação ou reclassificar um assunto → só a prova daquele ano
- conferir uma questão específica → `grep` pelo `id` (ex.: `q-unifesp2024-017`),
  não leitura do arquivo inteiro
- mexer nos cartões da equipe → só `dados/flashcards-equipe.js`

## Conteúdo novo vai sempre para `dados/`, nunca para dentro do `index.html`

Prova nova, banca nova, lote grande de questões: cria-se **um arquivo novo** em
`dados/` e acrescenta-se **uma linha** `<script src="dados/...">` no
`index.html`, junto das outras. O passo a passo, o molde de questão e a política
de conteúdo estão em `dados/LEIA-ME.md`.

Colar questões dentro do `index.html` desfaz a separação e é o único jeito de
errar isso.

## Nuvem (seção 2-C do `index.html`)

A sincronização entre aparelhos é **opcional**: com `CONFIG.nuvem` vazio, a
plataforma roda só no navegador, como sempre. Ao mexer nessa parte:

- Tudo que o aluno gera é salvo **primeiro no navegador** e só depois entra na
  fila (`db.filaNuvem`). Nunca inverta essa ordem: estudar não pode depender
  de rede.
- Dado novo do aluno precisa de: coluna no `nuvem/esquema.sql` (com a política
  de RLS), entrada em `NUVEM_TABELAS` e uma chamada a `nuvemRegistrar(...)` no
  ponto onde o dado nasce.
- Conteúdo (questões, taxonomia, cartões da equipe) **não vai para a nuvem** —
  vem da pasta `dados/`.
- Nunca coloque a chave `service_role` do Supabase no código. Só a `anon`, que
  é pública por definição e protegida pelas políticas do banco.

## Convenções do projeto

- Tudo em **português do Brasil**, inclusive nomes de funções e variáveis.
- Comentários explicam a **regra em linguagem simples**, para quem não programa.
- **Nenhuma dependência externa nova**, nada de framework. Gráficos são SVG
  escrito à mão; o PDF usa a impressão do navegador.
- Mudou o modelo de dados? Vem com migração em `loadState()`.
- Rota que sai do menu continua respondendo e redireciona — link salvo por aluno
  não pode quebrar.
- A plataforma **explica o que faz**: quando o algoritmo muda uma proporção,
  esconde um botão ou prioriza uma questão, a tela diz o porquê.
- Explicação de questão é sempre **autoral**. Enunciado e gabarito de prova
  pública podem ser transcritos integralmente; resolução de cursinho, nunca.

## Antes de dar o trabalho por pronto

```bash
node --check dados/<arquivo>.js     # se mexeu em algum arquivo de dados
```

Para mudanças no `index.html`, abra a plataforma no navegador e confirme que não
há erro de JavaScript no console. A fonte do Google falhando é esperada em
ambiente sem internet e não conta como erro.

Se mexeu no carregamento do conteúdo, confira os três cenários: aberto da pasta
(`file://`), servido por HTTP, e sem a pasta `dados/` (tem de abrir, avisar na
tarja e navegar sem quebrar).

Atualize `RESUMO-PROJETO-ESC.md` (seção 12, histórico) quando a mudança for
estrutural.
