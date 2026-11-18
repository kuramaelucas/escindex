# Resumos adaptativos — condições de criação

Projeto iniciado em 18/11/2026. Os resumos são **conteúdo de estudo escrito a partir das questões reais** do banco. O destaque de cada trecho muda **conforme o erro de quem lê**.

Para isso, cada resumo é dividido em **fragmentos**. Cada fragmento é um conceito que responde a um grupo de questões identificado (ids de `dados/`). Por enquanto a pasta é independente da plataforma: nada aqui entra em `codigo/` nem em `dados/manifesto.js`.

## Estrutura

```
resumos/
  LEIA-ME.md                 estas condições
  visualizar.html            abre com dois cliques: escolhe o resumo, lê o backup do aluno e destaca
  <tema>/resumo.js           o resumo: window.EscResumos.registrar({...})
```

Conferência: `npm run resumo -- <tema>`. O comando mostra quais questões do assunto cada fragmento cobre e quais ainda **não** têm fragmento. Ele falha se um fragmento citar id inexistente.

## Condições de criação (valem para todo resumo novo)

1. **Começa pelas questões, não pelo livro.** Liste as questões do assunto (`npm run resumo -- <tema>` ou `npm run dados -- taxonomia <palavra>`). Escreva só o que é preciso para responder à maioria delas: os conceitos-base que se repetem entre as bancas.
2. **Seleção explícita.** Questão do assunto da taxonomia que fica fora do resumo vai para `foraDoEscopo`, com o motivo. Exemplo: coqueluche está em `ass-exantematicas`, mas não é exantemática e terá resumo próprio.
3. **Um fragmento = um conceito cobrável.** Separe, por exemplo, "agente etiológico", "quadro clínico", "diagnóstico", "complicações", "tratamento" e "vigilância/prevenção". Cada fragmento lista em `questoes` os ids que ele ajuda a responder. Sem questão ligada não há como medir o erro: o fragmento pode existir, mas fica sempre neutro.
4. **Destaque pelo erro de quem lê.** Por questão vale a **última** resposta do aluno. Um acerto com confiança "chute" conta como meio erro. A taxa do fragmento é (erros + ½ chutes) ÷ questões respondidas. A doença recebe a mesma taxa calculada sobre todas as questões dos seus fragmentos.
   - **≥ 50 %: Prioridade** (borda vermelha, aberto, sobe para o topo da doença).
   - **20–49 %: Atenção** (borda âmbar).
   - **< 20 %: Dominado** (esmaecido e recolhível; continua legível).
   - **Fragmentação fina:** um tópico pode terminar com `{q-a,q-b}` (as questões que ele responde). Seção em Prioridade ou Atenção se abre tópico a tópico, cada um com o seu erro ("Você erra aqui · 2 de 3"); seção dominada vira texto corrido recolhido. O visualizador é um caderno: sumário no início, capítulos (doenças) e seções numeradas.
   - **Sem resposta: Não medido** (neutro). Mostra quantas questões ligadas ainda faltam fazer.
   - As doenças são ordenadas pela taxa (pior primeiro), e a tela diz o porquê de cada destaque. A regra da casa é que "a plataforma explica o que faz".
5. **Texto autoral, curto e verificável.** Use tópicos com o **dado que a banca cobra** em negrito (agente, ponto de corte, prazo, dose). Nada copiado de cursinho ou de site de questões. As fontes primárias ficam em `fontes`, com a data em que foram lidas. Enquanto um fragmento não tiver a leitura datada, ele leva `conferir: true` e a tela mostra "a conferir".
6. **Pegadinhas viram fragmento próprio** ("Armadilhas"). Ligue-as às questões em que a alternativa errada explora a confusão (ex.: exantema súbito × alergia à amoxicilina).
7. **Não muda gabarito.** Se o resumo discordar do gabarito de uma questão, a questão vai para revisão pelo caminho normal (zona B1/B3). O resumo não é alterado para "encaixar" no gabarito.
8. **Integração futura com a plataforma** (zona A, ainda não feita). A ideia é uma tela que lê `db.respostas` do próprio aluno, em vez de pedir o backup. Também prevê um botão "fazer as questões deste fragmento". Quando entrar, o resumo passa a ser carregado como os outros `dados/` (`manifesto.js`) e ganha teste.

## Resumos

| Tema | Assunto | Questões no resumo | Fora do escopo |
|---|---|---|---|
| `exantematicas` | `ass-exantematicas` | 53 | 7 (coqueluche) |
