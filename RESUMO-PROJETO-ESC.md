# Esc — plataforma de estudos para residência médica
## Resumo do projeto (setembro de 2026)

Este documento existe para que uma nova conversa com o Claude comece sabendo tudo o que já foi decidido e construído. Anexe-o junto com o `index.html` — **só ele**, que agora é o arquivo de código. O conteúdo (as provas já adaptadas e os flashcards) mora na pasta `dados/`, e só precisa ser anexado quando o pedido for sobre o conteúdo em si (ver seção 1 e seção 11).

> **Estado atual, em uma frase:** plataforma completa (estudo, revisão espaçada, flashcards, simulados, desempenho, PDF, controle de qualidade) com **635 questões** — das quais **500 reais da UNIFESP-EPM** (2022 a 2026, com explicação autoral) — e taxonomia de **216 assuntos** em **39 especialidades**. O histórico de como se chegou até aqui está na seção 12; o que falta fazer está na seção 10.

---

## 1. O que é

`index.html` é uma plataforma de estudos para prova de residência médica, escrita **sem instalação, sem servidor, sem build e sem dependência de internet** (só as fontes do Google são externas, e são opcionais). Abre com dois cliques no navegador.

Era um arquivo único; desde 20/09 são **duas coisas ao lado uma da outra**, e essa é a separação mais importante para trabalhar no projeto:

| | O quê | Tamanho |
|---|---|---|
| `index.html` | **O código.** Telas, regras, algoritmos, configuração, taxonomia. É o documento que se abre para consertar ou mudar a plataforma — e o único que precisa ser anexado numa conversa sobre código. | ~546 KB, ~8.050 linhas |
| `dados/` | **O conteúdo já adaptado à plataforma.** Um arquivo `.js` por prova, mais o banco didático e os flashcards da equipe. É texto de questão, não código. | ~1,2 MB em 7 arquivos |
| `nuvem/` | **A infraestrutura opcional da sincronização**: o esquema SQL do banco (Supabase) e o guia de instalação. O site não carrega esta pasta. | 2 arquivos |

O `index.html` carrega a pasta com sete linhas `<script src="dados/…">` antes do próprio código; no navegador o resultado é idêntico ao de antes. A única regra é manter a pasta `dados/` ao lado do `index.html` e publicá-la junto — se ela faltar, a plataforma abre assim mesmo e mostra uma tarja explicando, em vez de parecer quebrada. Detalhes em `dados/LEIA-ME.md` e na seção 7.

- **Tamanho antes da separação:** ~1,7 MB, ~16.770 linhas em um arquivo só.
- **Dados:** tudo fica no `localStorage` do navegador, sob a chave `medbloco_db_v1` (o nome antigo foi mantido de propósito, para não apagar os dados de quem já usava quando o app foi renomeado).
- **Nome:** "Esc" (era "MedBloco"). O nome fica em `CONFIG.nomePlataforma`.
- **Banca de referência:** UNIFESP-EPM (`CONFIG.bancaFoco`), mas o app é agnóstico — filtra por instituição.

### Contas de demonstração (senha entre parênteses)

| E-mail | Papel |
|---|---|
| admin@esc.demo (admin123) | Administrador **máster** |
| coordenacao@esc.demo (admin123) | Administrador **coordenação** |
| moderador@esc.demo (admin123) | Administrador **moderador de conteúdo** |
| professor@esc.demo (prof123) | Professor |
| residente@esc.demo (res123) | Residente |
| aluno@esc.demo (aluno123) | Aluno |

Há também botões de "ver como…" na tela inicial, que entram sem senha.

---

## 2. Estado do banco de questões e de cartões

- **635 questões** no total:
  - **500 questões reais da UNIFESP-EPM** (`real: true`), 100 de cada ano de 2022 a 2026 — enunciado, alternativas e gabarito oficial transcritos integralmente (domínio público), com explicação de cada questão **100% autoral**, escrita com base em diretrizes e fontes primárias, nunca copiada de resolução de cursinho (seção 9). Questões anuladas pela banca entram com `status: "anulada"` e `motivoStatus` preenchido, mas mantêm explicação pedagógica.
  - **135 questões didáticas** de demonstração/construção de conhecimento (30 de Técnica Operatória, 30 de Cardiologia, 30 de Infectologia, 15 de Oftalmologia, 30 de demonstração original), com instituição **"Esc — Banco Didático"** e selo **Didática** — dá para isolá-las ou excluí-las por qualquer filtro de instituição.
- **501 flashcards autorais** de semente (`SEED_FLASHCARDS`), cobrindo os 91 assuntos que existiam antes da carga das provas reais. Além deles, a plataforma **gera cartões automaticamente** a partir das questões que cada aluno errou com certeza ou acertou no chute, e **cada aluno escreve os seus** durante a resolução — e pode **sugerir o próprio cartão para o baralho da equipe**, com aprovação de professor/coordenação.
- Taxonomia atual: **5 grandes áreas, 39 especialidades, 216 assuntos** — ampliada de 91 para 216 assuntos (e de 24 para 39 especialidades) durante a carga das provas reais, para cobrir temas que a UNIFESP realmente cobra e a taxonomia didática original não previa (por exemplo, Psiquiatria inteira, criada do zero — seção 12). Os 125 assuntos novos ainda não têm flashcard de equipe dedicado (ver seção 8 e seção 10).
- Nenhuma questão nem cartão da equipe é cópia de prova real ou de material de terceiros; enunciado/gabarito de prova pública são transcritos por serem domínio público, mas toda explicação é autoral (seção 9).

Com 500 questões reais cobrindo 5 anos de uma banca de referência, a repetição espaçada, a dificuldade progressiva e o percentil de simulado já têm massa real para funcionar bem — o próximo salto de volume seria repetir esse processo para as outras 5 bancas de referência (`CONFIG.instituicoesReferencia`), caso o usuário consiga as provas.

---

## 3. Papéis e permissões

**Aluno** — estudar (com a meta do dia), revisar, revisão rápida por flashcards, simulados, provas antigas, favoritos, histórico, desempenho, meu grupo, enviar questões.

**Residente** — fila de dúvidas, questões difíceis, revisar formatação, enviar provas e questões, provas antigas.

**Professor** — todo o conteúdo: banco de questões, importar, controle de qualidade, criar simulado, material em PDF, flashcards da equipe, especialidades e assuntos, revisar formatação.

**Administrador, em três níveis** (`CONFIG.niveisAdmin` + `PERMISSOES_ADMIN`):

| Nível | Pode |
|---|---|
| **Máster** | Tudo: papéis, níveis, configurações do algoritmo, calendário, **backup/reset**, livro de ouro, conteúdo |
| **Coordenação** | Conteúdo, aprovação de cadastros, calendário de blocos, livro de ouro, taxonomia |
| **Moderador** | Só conteúdo: banco, importação, qualidade, simulados, taxonomia, material em PDF |

O menu lateral se monta conforme o nível e as rotas restritas mostram tela de "acesso restrito". Não é possível rebaixar o último administrador máster. Qualquer não-aluno pode entrar no "modo aluno" e usar a plataforma como estudante — inclusive criando cartões pessoais.

---

## 4. Funcionalidades por área

### Estudar
- **Sessão em andamento no topo**: se o aluno saiu no meio de uma fila, o primeiro cartão da tela oferece *"Continuar de onde parei"* — mesma fila, mesma ordem, mesmos riscos nas alternativas. Só desaparece quando o conjunto termina ou quando ele escolhe descartar.
- **Meta do dia**: progresso `feitas/meta`, quantas faltam, sequência de dias seguidos e botão para ajustar o número. A meta não tem mais página própria (ver seção 5).
- **Sessão recomendada**, que mistura bloco atual, revisão e prévia do próximo bloco.
- **Monte sua própria lista**: filtros por grande área (com botão "todas"), especialidade, assunto, instituição, ano (com botão "últimos 5 anos"), e situação (só erros/chutes, só favoritas, não respondidas, incluir questões do meu grupo). Pode gerar como prática ou como simulado.
- Durante a sessão: escolha da alternativa, **eliminar alternativas** (o × ao lado de cada uma risca o que já foi descartado), **declaração de confiança** (certeza / na dúvida / chute), feedback imediato com explicação, navegação livre entre questões já respondidas, favoritar, sinalizar desatualizada, gerar prompt de segunda opinião para IA e **virar a questão em flashcard**.
- **Mapa de progresso do conjunto**, logo acima da questão: um quadradinho por questão da fila, com o número e a cor do que aconteceu (verde acertou, vermelho errou, neutro ainda não respondida), mais um pontinho âmbar nos dois casos que a plataforma trata como "não sabida" — acerto no chute e erro com certeza. Clicar volta a uma questão já respondida; as que ainda não chegaram ficam apagadas, porque responder fora de ordem embaralharia o pareamento entre a fila e as respostas. Dá para ocultar o mapa (`alternarMapaSessao`).
- **No celular, arrastar o cartão para o lado troca de questão.**

### Fim de cada conjunto de questões
Página de feedback com: taxa de acerto, acerto por nível de confiança, e lista questão a questão mostrando o que acertou, errou, chutou ou respondeu na dúvida — com alertas de "acerto no chute" e "erro com certeza". Cada linha traz botões de voltar à questão, ver na íntegra, favoritar e **virar flashcard** (destacado nas erradas e chutadas). Tudo fica salvo e pode ser reaberto em **Histórico de Atividade**.

### Revisão
- Repetição espaçada (SM-2 adaptado) que traz de volta tanto o que se errou quanto o que se acertou faz tempo.
- **Filas separadas por tipo de erro**: errou com certeza (prioridade máxima), acertou no chute (conta como não sabido), errou na dúvida.
- Lista de assuntos em que o aluno responde "com certeza" e erra.
- É aqui que fica o **detalhe assunto a assunto**, ao lado da ação correspondente.

### Revisão Rápida (flashcards)
A tela abre com a **meta diária de cartões** — progresso do dia, quantos faltam e sequência de dias seguidos —, a mesma estrutura da meta de questões, em outra unidade. As duas metas convivem e são independentes: quem prefere estudar por cartão, ou quem só tem dez minutos num dia corrido, mantém ritmo por ali.

Cartão com frente (pergunta curta) e verso (resposta direta), **sem alternativa para eliminar**. O aluno tenta lembrar, vira o cartão e se autoavalia:

| Resposta | Efeito no intervalo |
|---|---|
| **Não lembrei** | volta amanhã |
| **Quase** | intervalo travado em no máximo 3 dias — lembrar com esforço é o sinal clássico de conceito não consolidado |
| **Sabia** | intervalo cresce normalmente |

**Três origens de cartão convivem no mesmo baralho:**

1. **Da equipe** (`usuarioId: null`) — material oficial escrito por professor, residente ou admin de conteúdo; visível a todos.
2. **Pessoal** (`usuarioId` preenchido) — escrito pelo próprio aluno durante as questões; **ninguém mais vê**. É caderno de estudo, não material publicado.
3. **Gerado automaticamente** (id `fc-q-<id da questão>`) — montado na hora a partir das questões que o aluno errou com certeza ou acertou no chute.

O baralho se monta sozinho nesta ordem: cartões vencidos → assuntos de falsa segurança → cartões gerados de erros caros → cartões novos do bloco atual → resto embaralhado. Cada cartão tem **repetição espaçada própria** (`db.revisoesFlashcards`), separada da das questões.

A tela separa **"Meus cartões"** (com a questão de origem linkada) de **"Cartões da equipe"**, e só quem gere conteúdo vê a segunda seção.

### Simulados
- Simulados criados por professores, prova antiga inteira como simulado, ou simulado personalizado a partir dos filtros.
- **Cronômetro** com encerramento automático no fim do tempo, **tempo gasto por questão**, modo aprendizado (mostra explicação na hora), mapa de questões clicável.
- Resultado: nota, percentil anônimo entre as tentativas registradas, mapa de acertos/erros, **análise de tempo com "onde você travou"**, revisão questão a questão e prática imediata dos erros.

### Meu Desempenho
A tela responde a três perguntas, nesta ordem:

1. **"Quanto eu já sei?"** — desempenho total de tudo que já foi respondido, cobertura do banco, acerto considerando só a última tentativa de cada questão.
2. **"Como estou indo agora?"** — um **seletor de período** com quatro recortes:

   | Recorte | Granularidade | Para quê |
   |---|---|---|
   | Últimos 14 dias | uma barra por dia | reta final, ajuste de rotina |
   | Últimos 30 dias | uma barra por dia | o mês corrente, com o fim de semana à vista |
   | Últimos 12 meses | uma barra por mês | evolução longa, atravessa a virada do ano |
   | Este ano, mês a mês | jan → mês atual | o ano letivo, do jeito que a coordenação pensa |

   Em qualquer recorte diário aparecem: taxa do período, **variação em pontos percentuais contra a janela anterior do mesmo tamanho**, dias em que estudou e questões por dia estudado. No recorte mensal: taxa somada, volume, meses com estudo e melhor mês. Abaixo do gráfico, as **duas janelas curtas lado a lado** (14 e 30 dias) com um alerta quando se afastam 8 p.p. ou mais — é o sinal de que algo mudou recentemente, para melhor ou pior.

3. **"Onde eu preciso mexer?"** — **as 5 grandes áreas** (e só elas), calibração da confiança, "onde sua confiança engana" e ritmo por questão.

**O gráfico de barras verticais** (`graficoBarrasVerticaisSvg`) é o mesmo em todos esses lugares: cada barra é 100% das questões daquele dia, mês ou área — a parte de baixo, em **verde claro**, é o acerto; o que sobra em cima, em **cinza claro**, é o erro. 65% de acerto = 65% da barra verde e 35% cinza, com o número escrito quando a barra é larga o bastante e tooltip quando não é. Dia ou mês sem nenhuma questão vira um traço fino na base, não some do gráfico: esconder os buracos mentiria sobre a rotina, que é metade do resultado.

### Material em PDF (professores, coordenação, moderadores)
Quatro tipos, gerados sem biblioteca externa (monta em `#areaImpressao` e chama `window.print()`, onde existe "Salvar como PDF"):

1. **Prova para aplicar** — com cartão-resposta e folha de gabarito em páginas separadas.
2. **Lista de exercícios comentada** — gabarito, explicação e referências junto de cada questão.
3. **Baralho de flashcards para recortar** — **só material da equipe**; o caderno pessoal dos alunos nunca entra.
4. **Relatório de desempenho da turma** — uma linha por aluno.

### Conteúdo e qualidade
- **Banco de questões** com CRUD completo; questões aceitam **imagem** e campo de **referências**.
- **Importar/Enviar questões**: aberto a aluno, residente, professor e admin, com destino conforme o papel. Dois modos de prompt: prova inteira e questões avulsas.
- **Detecção de duplicidade** em três pontos: ao salvar, ao importar (contra o banco e contra o próprio lote) e numa aba "Duplicadas" do Controle de Qualidade.
- **Controle de Qualidade**: difíceis, sinalizadas, sugeridas, duplicadas.
- **Especialidades e Assuntos**: árvore editável com verificação de consistência e correção automática.
- **Fila de dúvidas** (residente/professor).

### Livro de Ouro
Doações, colaborações e apoios, mantidos pela coordenação, mais um reconhecimento calculado automaticamente. **Fica no rodapé da tela inicial** e em Configurações — não ocupa linha no menu.

### Grupos e rodízio de blocos
O aluno usa por padrão o calendário oficial da coordenação, mas pode criar o próprio grupo/turma ou pedir acesso ao de outro aluno. Cada grupo tem um banco de questões próprio.

**A sequência de blocos pertence ao ano da faculdade, não ao grupo.** Todas as turmas do mesmo ano passam pelos mesmos blocos, na mesma ordem e nas mesmas janelas de data; o que muda de uma para outra é **por qual bloco ela começa** (`grupo.deslocamento`). É o rodízio real: enquanto a turma A está em Pediatria, a turma B está em Clínica Médica, e no bloco seguinte elas trocam. Anos diferentes têm sequências diferentes, porque a matéria é outra — do 3º ano (bases da clínica) ao "Formado(a)" (revisão por grande área).

O calendário oficial não tem ano fixo: ele serve a todos, e cada aluno enxerga a sequência do **seu** ano.

---

## 5. Decisões de interface (e por quê)

### Menu ordenado por probabilidade de uso
Não é alfabético nem temático: é a frequência esperada de uso. Os **quatro primeiros do aluno** — Início, Estudar, Meu Desempenho, Meu Grupo — são os únicos que aparecem no celular sem rolar.

Ordem do aluno: Início · Estudar · Meu Desempenho · Meu Grupo · Revisão · Revisão Rápida · Simulados · Histórico de Atividade · Favoritos · Provas Antigas · Enviar Questões.

Ordem do conteúdo: Início · Banco de Questões · Importar Questões · Questões Difíceis · Criar Simulado · Material em PDF · Flashcards · Realizar Simulados · Provas Antigas · Revisar Formatação · Especialidades e Assuntos.

### Metas: de página a cartão
A meta é um número que se **define uma vez** e se **vê todo dia**. Uma página própria invertia isso: escondia o acompanhamento e dava destaque à configuração. Agora o progresso abre a tela Estudar e o ajuste fica numa janela (`abrirModalMeta`). A rota `metas` continua respondendo e leva a Estudar, para não quebrar link salvo.

### Desempenho: até a grande área, não até o assunto
A árvore assunto a assunto virava uma lista de dezenas de linhas que ninguém lia até o fim. Na tela de desempenho ficam **as 5 grandes áreas** — que é o nível em que se decide o que estudar na semana —, com acertos, erros, taxa e o assunto mais fraco de cada uma (com o tamanho da amostra à vista, porque "0% em 2 questões" não é o mesmo que "0% em 30"). O detalhe fino ficou em **Revisão**, ao lado da fila que diz o que fazer com ele.

### Flashcard tem dono
Cartão do aluno e material da equipe são coisas diferentes e não podem se misturar: um é anotação pessoal, o outro é conteúdo publicado para a turma. O campo `usuarioId` resolve isso — `null` para a equipe, preenchido para o aluno — e as três funções de leitura (`flashcardsAtivos(usuarioId)`, `flashcardsDaEquipe()`, `meusFlashcards(id)`) mantêm a separação em todo lugar: baralho, resumo, tela de manutenção e PDF. As checagens de permissão estão nas próprias funções (`podeMexerNoCartao`), não só nos botões.

### Arrastar para o lado no celular
Vale na sessão, no simulado e nos flashcards. Exige movimento horizontal (o dobro do vertical) e pelo menos 70 px, respeita as travas dos botões (não pula questão não respondida nem cartão não virado), e o toque não conta depois de um arrasto.

### Clicar no enunciado abre a questão — só onde o texto está cortado
Nas **listas**, onde o enunciado aparece truncado, clicar abre a questão inteira. Na questão em resolução não: ali o enunciado já está todo na tela, e abrir uma janela com o mesmo texto não acrescenta nada. Pelo mesmo motivo, o botão "Expandir questão" saiu das ações embaixo da questão aberta.

### Eliminar alternativas é rascunho, não resposta
O × ao lado de cada alternativa risca o que o aluno já descartou, como se faz no papel. Riscar não marca nada nem conta como resposta; escolher uma alternativa riscada desfaz o risco automaticamente (se ele decidiu marcá-la, ela não está mais descartada). Os riscos ficam guardados **por questão** e seguem a sessão, inclusive se ele sair e voltar. Depois de responder, viram registro: se ele tinha riscado justamente o gabarito, o feedback diz isso, porque descartar a resposta certa é um erro diferente de hesitar entre duas.

### A fila de questões sobrevive a sair da tela
A sessão de prática é gravada junto com o resto dos dados, por usuário. Sair, trocar de tela, atualizar a página ou fechar o navegador não joga a fila fora: a pessoa volta na mesma sequência, na mesma posição. Antes, cada interrupção gerava uma sessão nova, e a meta diária virava um monte de começos. Simulado não entra nisso de propósito — prova com cronômetro que se pausa e retoma no dia seguinte não mede nada.

### Meta de cartões ao lado da meta de questões
Mesma régua, outra unidade: progresso do dia, quanto falta e sequência de dias seguidos, agora também para os flashcards. São independentes porque medem estudos diferentes, e porque num dia corrido só o cartão cabe. A sequência de cartões usa um diário de dias à parte (`db.diasCartoes`): cada cartão guarda só a última data em que foi visto, então rever hoje um cartão de ontem apagaria ontem do mapa e zeraria a sequência de quem estuda todo dia.

### Listas paginadas
Toda lista longa (banco de questões, controle de qualidade, usuários, favoritos, histórico, formatação, flashcards, questões do grupo) mostra uma página por vez, com o total à vista. Mudar um filtro volta para a página 1 sozinho — senão, filtrar estando na página 7 mostraria uma lista vazia e pareceria um defeito.

### Backup restrito ao administrador máster
O arquivo carrega respostas e cadastros de **todos** os usuários daquele navegador. A checagem está em `podeMexerEmBackup()`, dentro das funções.

### Ano da faculdade
3º e 4º ano entraram; "Internato" saiu (virou 5º/6º ano). Lista em `CONFIG.anosFaculdade`; quem estava como "Internato" foi migrado para 6º ano, e o aluno corrige o próprio ano no Perfil.

---

## 6. Algoritmos e parâmetros (bloco `CONFIG`)

- **Mistura da sessão recomendada:** 60% bloco atual, 25% revisão, 15% prévia do próximo bloco.
- **Rampa de revisão no começo do ano** (`rampaRevisaoInicio: [0, 0.10, 0.20]`): com matéria de anos anteriores, a revisão roda cheia desde o primeiro bloco; sem ela, entra devagar nos três primeiros blocos. A tela Estudar explica o ajuste em vez de mudá-lo em silêncio.
- **Dificuldade progressiva:** taxa de acerto real (50%), especificidade (25%), prevalência (25%).
- **Repetição espaçada de questões:** a escada `CONFIG.intervalosBase` (1, 3, 7, 16, 35, 75 dias) é percorrida degrau a degrau a cada acerto seguido; esgotada a escada, o intervalo passa a crescer pelo fator, como no SM-2 clássico. A qualidade vem do acerto cruzado com a confiança declarada. *(Até a revisão de 19/09 esta escada estava declarada mas não era usada — ver seção 12.)*
- **Repetição espaçada de flashcards:** SM-2 próprio, com autoavaliação no lugar da confiança (sabia = 5, quase = 3, não lembrei = 0) e teto de 3 dias para "quase".
- **Questão "difícil":** taxa abaixo de 45% com pelo menos 8 respostas.
- **Metas:** 15 questões/dia (mínimo) e 30 (ideal); **40 cartões/dia** para a revisão rápida (`CONFIG.metaCartoesDia`) — número maior de propósito, porque um cartão leva segundos e uma questão de prova leva minutos.
- **Anos da faculdade:** `CONFIG.anosFaculdade`.
- **Cores das barras:** `--barra-acerto` e `--barra-erro`, definidas nos dois temas.

Os parâmetros de algoritmo são editáveis pela tela Configurações (administrador máster), sem tocar no código.

---

## 7. Organização do código

### Os arquivos do projeto

```
index.html                      o código inteiro (~546 KB)
dados/
  banco-didatico.js             135 questões autorais (demonstração + banco didático)
  prova-unifesp-2022.js         100 questões reais
  prova-unifesp-2023.js         100 questões reais
  prova-unifesp-2024.js         100 questões reais
  prova-unifesp-2025.js         100 questões reais
  prova-unifesp-2026.js         100 questões reais
  flashcards-equipe.js          501 cartões da equipe
  LEIA-ME.md                    como acrescentar prova, molde de questão, política de conteúdo
RESUMO-PROJETO-ESC.md           este documento
```

**Como o conteúdo entra no código.** O `index.html` define, antes do script principal, um objeto `window.EscDados` com duas funções — `registrarQuestoes(nome, lista)` e `registrarFlashcards(nome, lista)` — e em seguida carrega os sete arquivos da pasta. Cada arquivo faz uma chamada só, entregando a sua lista. O código então usa:

```js
const SEED_QUESTOES   = (window.EscDados && window.EscDados.questoes)   || [];
const SEED_FLASHCARDS = (window.EscDados && window.EscDados.flashcards) || [];
```

Daí para a frente nada mudou: `dbPadrao()` e `sincronizarConteudoNovo()` continuam lendo essas duas constantes como liam antes, e o banco se monta na ordem em que os `<script src>` aparecem no HTML.

Por que `.js` com `<script src>` e não `.json` com `fetch`: `fetch` de arquivo local é bloqueado pelo navegador (CORS), o que quebraria o "abre com dois cliques" — que é uma característica central do projeto. Script clássico carrega dos dois jeitos, no site publicado e na pasta do computador.

**Se a pasta faltar:** `avisarSeFaltarConteudo()` roda na inicialização e, quando nenhum arquivo respondeu, insere uma tarja (`.aviso-dados`) no alto da página dizendo o que falta e onde ela deveria estar. A plataforma continua utilizável com o que já estiver salvo no navegador. *Configurações > Arquivos de conteúdo* (`renderCardArquivosConteudo()`) lista, arquivo por arquivo, o que foi carregado e quantos itens vieram — é onde se confere uma publicação ou uma cópia para outro computador.

### As seções dentro do `index.html`

Seções numeradas em caixa alta (use Ctrl+F):

1. `CONFIG`, níveis de admin, anos da faculdade, tema claro/escuro
2. `SEED_TAXONOMIA`, `SEED_BLOCOS`, `SEED_SEQUENCIAS_ANO`, `SEED_USUARIOS`, `SEED_LIVRO_OURO`, `SEED_COMENTARIOS`, `SEED_SIMULADOS` — que continuam no código por serem estrutura, não conteúdo (juntos não chegam a 20 KB). `SEED_QUESTOES` e `SEED_FLASHCARDS` ficaram aqui só como nome: o conteúdo vem da pasta `dados/`
3. Persistência (`dbPadrao`, `loadState`, `saveState`, migrações, `sincronizarConteudoNovo`)
4. Utilidades (datas, **gráficos SVG**, modal, toast)
5. Motor de estudos (dificuldade, repetição espaçada, mistura, filtros, **desempenho por dia/mês/janela**, calibração, tempo, motor de flashcards)
6. Autenticação e permissões
7. Roteador, gesto de arrastar e estrutura visual
8 em diante. Uma seção por tela — entre elas **12-B (Revisão Rápida)**, **17 (Meu Desempenho)**, **18 (Meta de Estudo)** e **20-B (Material em PDF)**

**Funções-chave desta rodada:**

| Função | O que faz |
|---|---|
| `desempenhoPorDia(id, dias)` | uma linha por dia, incluindo os dias parados (`taxa: null`) |
| `desempenhoPorMes(id, modo)` | `"12meses"` (termina no mês atual) ou `"ano"` (jan → mês atual) |
| `resumoJanela(id, dias)` | soma da janela + comparação com a janela anterior do mesmo tamanho |
| `graficoBarrasVerticaisSvg(itens, opts)` | as barras verde/cinza, usadas no período e nas 5 áreas |
| `flashcardsAtivos(usuarioId)` | equipe + os cartões pessoais daquele usuário |
| `flashcardsDaEquipe()` / `meusFlashcards(id)` | os dois recortes separados |
| `abrirFormularioFlashcard(id, {questaoId})` | formulário com o assunto da questão já marcado |
| `abrirModalMeta()` / `abrirModalMetaCartoes()` | ajuste da meta diária de questões e de cartões |

**Funções-chave acrescentadas na revisão de 19/09:**

| Função | O que faz |
|---|---|
| `paginar(lista, chave, opts)` / `controlesPaginacao(p, rotulo)` | corta qualquer lista em páginas; a `assinatura` (normalmente os filtros da tela) faz a página voltar à 1 quando o recorte muda |
| `sequenciaDoAno(ano)` | a ordem de blocos daquele ano da faculdade |
| `blocosDoGrupo(grupo, usuario)` | a sequência **já girada** pelo `deslocamento` da turma, no mesmo formato de antes (`{id, ordem, nome, dataInicio, dataFim, especialidadeIds}`) — por isso o resto do sistema não precisou saber do rodízio |
| `anoDoGrupo(grupo, usuario)` | o ano da turma, ou o do próprio aluno quando o grupo é o oficial |
| `mudarDeslocamentoGrupo(grupoId, valor)` | muda por qual bloco a turma começa |
| `salvarSessaoEmAndamento()` / `carregarSessaoEmAndamento()` / `retomarSessaoEmAndamento()` | gravam e devolvem a fila de questões inacabada |
| `eliminadasDaQuestao(qid)` / `alternarAlternativaEliminada(alt)` | as alternativas riscadas da questão atual |
| `metaCartoesDoUsuario(u)` / `cartoesRevisadosHoje(id)` / `sequenciaDiasCartoes(id)` | a meta diária de flashcards e sua sequência |
| `mapaPrevalenciasAssuntos()` | prevalência de todos os assuntos calculada uma vez por gravação (cache por `_geracaoDb`) |

**Funções-chave acrescentadas na separação de 20/09:**

| Função | O que faz |
|---|---|
| `EscDados.registrarQuestoes(nome, lista)` / `registrarFlashcards(nome, lista)` | a porta de entrada de cada arquivo da pasta `dados/`; guarda também o nome do arquivo e quantos itens vieram |
| `resumoArquivosDeConteudo()` | o que foi carregado nesta abertura da página: arquivos, questões e cartões |
| `avisarSeFaltarConteudo()` | a tarja de "a pasta `dados/` não veio junto", inserida na inicialização quando nenhum arquivo respondeu |
| `renderCardArquivosConteudo()` | o cartão *Arquivos de conteúdo*, em Configurações, para conferir uma publicação ou uma cópia |

**Manutenção:** `sincronizarConteudoNovo()` acrescenta ao banco salvo qualquer área, especialidade, assunto, questão, flashcard, usuário-semente ou livro de ouro que exista no código e ainda não exista nos dados, comparando por `id`. Nada é sobrescrito nem apagado.

**Migrações em `loadState`:** criação de `db.flashcards` e `db.revisoesFlashcards`; normalização de `usuarioId` nos cartões antigos (todos viram "da equipe", que é o correto — foram escritos por professores); conversão de `anoFaculdade: "Internato"` para `"6º ano"`; criação de `db.sessoesEmAndamento`, `db.diasCartoes` e `db.configGeral.metaCartoesDia`; e a migração dos blocos (abaixo).

**Migração dos blocos para sequências por ano.** `db.sequenciasAno` passa a guardar a ordem de blocos de cada ano, e o grupo guarda só `anoFaculdade` + `deslocamento`. Nada é apagado: o calendário que a coordenação tinha customizado vira a sequência do ano padrão, o calendário próprio de uma turma vira a sequência do ano dela se aquele ano ainda não tiver uma, e o que sobrar fica guardado em `grupo.blocosArquivados` — continua no banco e no backup, para consulta antes de descartar.

---

## 8. Limitações conhecidas

1. **Dados locais — resolvido pela metade (20/09).** O **progresso do aluno** já vai para a nuvem quando `CONFIG.nuvem` está preenchido: conta de verdade, respostas, repetição espaçada, favoritos, cartões pessoais, metas e a fila inacabada sincronizam entre aparelhos, com fila de envio para funcionar offline (seção 7 e `nuvem/LEIA-ME.md`). **Continuam locais a cada navegador:** grupos e turmas, fila de dúvidas, percentil de simulado entre alunos, banco de questões compartilhado, relatório de turma e livro de ouro — é a etapa 2. Com `CONFIG.nuvem` vazio (como o arquivo vem no repositório), tudo se comporta como antes, só no `localStorage`.
2. **Banco cobre uma só banca.** As 500 questões reais são todas da UNIFESP-EPM. As outras 5 bancas de referência (`CONFIG.instituicoesReferencia`) ainda não têm nenhuma questão real — só entram se o usuário conseguir os PDFs oficiais, pelo mesmo processo já usado para a UNIFESP (seção 12). *(Em volume puro o banco já foi testado sintético em mais de 6.000 questões e 8.000 respostas, sem travamento perceptível em nenhuma tela — não é mais o gargalo.)*
3. **Flashcards da equipe cobrem só metade da taxonomia.** Os 501 cartões foram escritos para os 91 assuntos que existiam antes da carga das provas reais; os 125 assuntos novos (Psiquiatria e as demais especialidades abertas na seção 12) ainda não têm cartão de equipe dedicado. Os cartões gerados automaticamente a partir de erros e os escritos pelos próprios alunos cobrem esse buraco por enquanto, mas dependem de uso.
4. **Autenticação é de demonstração**: senha em texto claro no arquivo. Não serve para uso público real.
5. **Backup manual e restrito.** Só o administrador máster exporta — se ele não exportar, ninguém exporta. Configurações avisa quando passa de ~3,5 MB e quando o último backup tem mais de 7 dias.
6. **Cartão pessoal é privado, não é segredo.** O isolamento é por papel na interface e nas funções; qualquer pessoa com acesso ao mesmo navegador e ao console enxerga tudo, como em qualquer dado do `localStorage`.
7. **Uma sequência de blocos por ano, e só uma.** Duas turmas do mesmo ano não podem ter ordens diferentes de matéria — por decisão de projeto, elas diferem só pelo ponto de entrada. Se um dia for preciso que uma turma tenha uma sequência realmente distinta, será um campo novo (`grupo.sequenciaPropria`) e mais uma migração.
8. **`somarDias()` usa `toISOString()`** depois de montar a data em horário local: certo para fusos negativos (Brasil), quebraria a data em fusos positivos (UTC+). Sem efeito para o público atual.
9. **O `index.html` agora depende da pasta `dados/`.** Mandar só o arquivo HTML por e-mail, ou publicar o site sem a pasta, entrega uma plataforma sem conteúdo — ela abre, avisa na tela e funciona com o que estiver salvo naquele navegador, mas nenhuma questão nova entra. Quem quiser distribuir "um arquivo só" precisa juntar os dois de volta (colar o conteúdo dos arquivos `.js` dentro de `<script>` no lugar das linhas `<script src>` resolve, e dá para automatizar em poucas linhas se isso virar rotina).
10. **Lembrete de meta diária só funciona com o navegador aberto.** Como o app não tem service worker nem servidor, a Notification API só dispara enquanto alguma aba do Esc está carregada (mesmo minimizada). Não existe aviso de verdade com tudo fechado — isso exigiria backend (ver limitação 1).

---

## 9. Política de conteúdo adotada

- **Enunciado, alternativas e gabarito oficial de prova pública são domínio público.** Prova de residência de instituição pública (USP-SP/FMUSP, USP-RP/FMRP, UNIFESP-EPM, Santa Casa de São Paulo, IAMSPE, UNESP etc.) é ato público: pode-se transcrever o texto oficial da questão e o gabarito oficial **integralmente**, sem parafrasear. Questão assim entra com `real: true`, banca e ano corretos.
- **O que nunca pode ser copiado é a explicação/resolução de terceiros** — cursinhos (Medway, Estratégia MED etc.), sites de questões comerciais, apostilas. Esse texto é propriedade intelectual de quem o escreveu, e é também a parte mais sujeita a erro/desatualização quando copiada sem checar. A explicação de **toda** questão — real ou autoral — é escrita pela equipe, com base em fontes primárias e oficiais (diretrizes e consensos de sociedades, protocolos e PCDT do Ministério da Saúde, revisões sistemáticas e artigos originais), citadas em `REFERENCIAS`.
- O prompt de importação (tela Importar Questões) já traz as duas regras separadas: uma seção dizendo que o enunciado pode ser copiado (é domínio público) e outra dizendo que a explicação não pode (isto é autoral). O prompt de segunda opinião segue a mesma regra.
- O formulário de flashcard repete a regra: material da equipe pede fonte oficial; cartão pessoal pede que o aluno escreva **com as próprias palavras** ("cartão copiado do enunciado inteiro não ensina nada").
- `CONFIG.instituicoesReferencia` lista as 6 bancas de referência do curso (USP-SP, USP-RP, UNIFESP-EPM, Santa Casa de São Paulo, IAMSPE, UNESP) como sugestão nos campos de instituição — não restringe, só agiliza o preenchimento.

---

## 10. Próximos passos sugeridos

Em ordem de prioridade sugerida:

1. **Flashcards para os 125 assuntos novos.** A carga da UNIFESP abriu Psiquiatria e outras especialidades inteiras (seção 12) que ainda não têm nenhum cartão de equipe — hoje só têm cobertura se o próprio aluno errar uma questão daquele assunto e o cartão automático entrar em cena. É o jeito mais rápido de destravar valor do que já foi construído.
2. **Repetir a carga de provas reais para as outras 5 bancas de referência** (USP-SP/FMUSP, USP-RP/FMRP, Santa Casa de São Paulo, IAMSPE, UNESP), se o usuário conseguir os PDFs oficiais — o pipeline (extração, classificação, validação) já existe e é só repetir o processo descrito na seção 12.
3. **Checagem humana amostral das 500 explicações autorais.** Foram escritas em lote, com boa fundamentação e revisão de consistência automatizada, mas nunca foram lidas por um segundo médico/residente. Vale um professor ou residente revisar uma amostra (por exemplo, as questões mais avançadas ou as anuladas, onde a explicação é mais interpretativa) antes de tratar o conjunto como validado clinicamente.
4. **Questões com imagem/figura no enunciado.** Algumas das 500 questões reais mencionam uma imagem original da prova (ultrassom, radiografia, ressonância) que não foi reproduzida — a explicação descreve o achado esperado a partir do texto, mas o aluno não vê a imagem. Vale revisar essas questões pontualmente e anexar a imagem quando possível.
5. **Relatório individual do aluno em PDF**, para devolutiva um a um (item já sugerido antes e ainda pendente).
6. **Etapa 2 da nuvem:** levar para o servidor o que ainda é local — grupos e turmas, fila de dúvidas, percentil de simulado entre alunos, banco de questões compartilhado e relatório de turma. A etapa 1 (contas e progresso do aluno) foi entregue em 20/09; o esquema, as políticas de acesso e a camada de sincronização já existem, então a etapa 2 é acrescentar tabelas ao mesmo desenho, não recomeçar.

---

## 11. Como pedir alterações numa nova conversa

Anexe este resumo e **só o que o pedido exige** — é para isso que o conteúdo foi separado do código:

| O pedido é sobre… | Anexe |
|---|---|
| Telas, regras, algoritmo, correção de defeito, visual | `index.html` (só ele) |
| Uma prova específica: corrigir explicação, reclassificar assunto, revisar gabarito | `index.html` + o arquivo daquela prova (ex.: `dados/prova-unifesp-2024.js`) |
| Carregar uma prova nova de outra banca | `index.html` + `dados/LEIA-ME.md` + o PDF ou o texto da prova |
| Flashcards da equipe | `index.html` + `dados/flashcards-equipe.js` |

Depois descreva o que quer em português corrente. Convenções que o projeto segue e vale manter:

- Tudo em **português do Brasil**, inclusive nomes de funções e variáveis.
- Comentários no código explicando a **regra em linguagem simples**, pensados para quem não programa.
- Nenhuma dependência externa nova; nada de framework. (Os gráficos são SVG escrito à mão; o PDF usa a impressão do navegador.)
- **Conteúdo novo (questões, provas, cartões da equipe) vai para a pasta `dados/`, nunca para dentro do `index.html`** — é o que mantém o arquivo de código legível. Ver `dados/LEIA-ME.md`.
- Toda alteração no modelo de dados vem acompanhada de migração em `loadState`.
- Rota que sai do menu continua respondendo, redirecionando para o novo lugar — link salvo por aluno não pode quebrar.
- A plataforma **explica o que faz**: quando o algoritmo muda uma proporção, esconde um botão ou prioriza uma questão, a tela diz o porquê.

---

## 12. Histórico de revisões

Registro resumido de cada rodada de trabalho, da mais antiga à mais recente. Detalhe de implementação (nomes de função, migração, tabela de tempo) que já vale como referência permanente está nas seções 6 e 7, não aqui — esta seção é só o "o que mudou e por quê" de cada rodada.

**Revisão geral (manhã de 19/09/2026).** Cinco defeitos corrigidos: a repetição espaçada de questões não usava a escada de intervalos configurada (`CONFIG.intervalosBase`); `calcularDificuldade()` recalculava a prevalência de todos os assuntos a cada questão dentro de um `.sort()`, um gargalo que só aparece com banco grande; contraste abaixo do padrão de acessibilidade (WCAG AA) em dois tons do tema claro; afordância de "clicável" sobrava nas alternativas depois de já ter respondido; um comentário `/* */` mal fechado engolia um bloco de documentação. Além disso: polimento visual (sombras, transições, `prefers-reduced-motion`), paginação de todas as listas longas, meta diária de flashcards com sequência de dias, eliminar alternativas durante a resolução da questão, blocos de estudo organizados por ano da faculdade com rodízio real entre turmas, e sessão de estudo retomável (sair e voltar mantém a mesma fila). Verificado com Chromium/Playwright em todos os papéis e rotas.

**Ajuste de política de conteúdo e expansão de recursos (noite de 19/09/2026).** Esclarecido que enunciado/alternativas/gabarito oficial de prova de instituição pública são domínio público (podem ser transcritos integralmente) e que só a explicação precisa ser sempre autoral — refletido no prompt de importação e no formulário de questão. A partir daí: baralho da equipe ampliado de 24 para 501 flashcards, cobrindo os 91 assuntos que existiam até então; lembrete de meta diária via Notification API do navegador; flashcards ganharam suporte a imagem (mesmo padrão já usado nas questões); fluxo de promoção de cartão pessoal para o baralho da equipe, com aprovação de professor/coordenação; estatística de alternativas eliminadas por quem errou, agregada por questão em Controle de Qualidade. O banco também foi testado sintético em mais de 6.000 questões e 8.000 respostas, o que revelou dois novos gargalos do mesmo tipo do já corrigido pela manhã (uma função revarrendo o banco inteiro a cada chamada, dentro de um laço) — ambos corrigidos com índices cacheados por geração do banco, derrubando o tempo de operações como colar uma prova de 100 questões de 6,8s para 106ms.

**Carga das 500 questões reais da UNIFESP-EPM, 2022-2026 (madrugada seguinte).** O usuário forneceu os PDFs das provas de Acesso Direto/R1 dos últimos cinco anos. Conteúdo de prova pública (enunciado, alternativas, gabarito oficial) extraído por scripts Node.js reutilizáveis (`provas/parse_gabarito.js`, `provas/parse_questoes.js`, a partir de texto gerado com `pdftotext`), com duas armadilhas de parsing corrigidas (caractere de quebra de página inserido pelo PDF; a última questão de cada prova absorvendo a folha de gabarito em branco). Achado relevante: a prova real usa só 4 alternativas (A-D), não 5 — formulário e importador ajustados para tornar a alternativa E opcional. Para cada uma das 500 questões foi escrita uma explicação **100% autoral** (nunca a partir da resolução do cursinho de origem do PDF), com referência citada e dificuldade estimada, combinada ao conteúdo da prova por um script de merge (`provas/merge_year.js`) que também classificou cada questão num assunto da taxonomia. A taxonomia foi ampliada de 91 para 216 assuntos (24 para 39 especialidades) em 5 levas, para dar lugar a especialidades que a prova real cobre e a plataforma didática não tinha — Psiquiatria inteira, criada do zero, entre elas. Validado com checagem de sintaxe, IDs únicos, integridade completa da taxonomia, completude estrutural das 500 questões e testes funcionais via Chromium/Playwright (contagem por ano e por anuladas batendo com o gabarito oficial, resposta correta sendo pontuada como `correta: true`, zero erros de JavaScript). Ficou de fora, de propósito: qualquer leitura da resolução do cursinho de origem como fonte de explicação, e as imagens/figuras que algumas questões referenciam no enunciado (a explicação descreve o achado esperado pelo texto, sem a imagem original anexada).

**Separação entre código e conteúdo (20/09/2026).** O `index.html` tinha 1,7 MB e ~16.770 linhas, e 1,2 MB disso era conteúdo: as 635 questões e os 501 flashcards. Na prática, qualquer trabalho no código — de uma pessoa ou de uma IA — começava atravessando centenas de páginas de enunciado médico. As questões e os cartões saíram para a pasta `dados/`, um arquivo por prova (`banco-didatico.js`, `prova-unifesp-2022.js` a `prova-unifesp-2026.js`, `flashcards-equipe.js`), carregados pelo `index.html` com sete linhas `<script src="dados/…">` antes do código. O arquivo de código ficou em ~546 KB e ~8.050 linhas — 69% menor —, e cada prova virou um documento que se abre e se confere sozinho. O que **não** mudou: o site (mesmas telas, mesmo comportamento, mesmo "abre com dois cliques", desde que a pasta esteja junto), o modelo de dados, o `localStorage` e a ordem das questões no banco. Nenhuma migração foi necessária, porque nada no formato dos dados mudou — só o lugar onde o texto fica guardado. Acrescentados: `EscDados` (a ponte que recebe o conteúdo dos arquivos), a tarja de aviso quando a pasta não vem junto, o cartão *Arquivos de conteúdo* em Configurações (mostra arquivo por arquivo o que foi carregado) e `dados/LEIA-ME.md`, com o molde de questão, o passo a passo para acrescentar uma prova nova e a política de conteúdo. Verificado com Chromium/Playwright em quatro cenários: aberto direto da pasta (`file://`), servido por HTTP como o site publicado, sem a pasta `dados/` (abre, avisa, navega sem erro) e com dados antigos já salvos no navegador — nesse último, as 635 questões, os 501 cartões, as respostas e os favoritos sobreviveram sem nenhuma duplicata. As 27 rotas foram percorridas como administrador máster, e o conteúdo dos arquivos novos foi conferido item a item contra o original (as 635 questões e os 501 cartões saíram idênticos).

**Nuvem, etapa 1 — conta de verdade e estudo em vários aparelhos (20/09/2026).** O pedido: "progresso e cadastros salvos online, acessíveis de outro aparelho". Como o GitHub Pages é hospedagem estática (entrega arquivos, não guarda nada), o site continua onde está e passou a conversar com um **Supabase** — escolhido por trazer autenticação pronta e *Row Level Security*, e por ser acessível via `fetch` puro, sem biblioteca nova (a regra de "nenhuma dependência externa" continua valendo). Decisões do usuário: sincronização com funcionamento offline, começando pelo progresso do aluno, em turma fechada com aprovação da coordenação. O que foi feito: `nuvem/esquema.sql` (10 tabelas, políticas de RLS linha a linha, gatilho que cria o perfil no cadastro e trava que impede alguém de se promover a administrador pelo console); seção **2-C** no `index.html` com a camada de sincronização — fila de envio persistida em `db.filaNuvem`, envio em lote, recebimento por marca d'água com o **relógio do servidor**, renovação automática de token e resolução de conflito por tipo de dado (**registro** junta, **estado** vale o mais recente); entrada e cadastro passando pelo servidor quando a nuvem está ligada; aprovação de cadastros da turma pela própria tela de sempre; oferta de **trazer para a conta** o estudo que já existia naquele navegador, sem duplicar nada; indicador de sincronização no topo e cartão de conta no Perfil. **Nada disso roda com `CONFIG.nuvem` vazio**, que é como o arquivo vem — o site publicado hoje continua idêntico. Verificado com Chromium/Playwright contra um Supabase simulado (escrito para o teste, implementando auth, upsert, filtros e RLS): 32 verificações cobrindo cadastro pendente, aprovação, dois aparelhos na mesma conta, estudo sem internet com fila que sobe sozinha ao reconectar, ausência de duplicatas, renovação de token vencido, isolamento entre contas e a trava de promoção. Falta testar contra um projeto Supabase real — isso depende da conta do usuário, e o passo a passo está em `nuvem/LEIA-ME.md`.

**Mapa de progresso na sessão de questões (20/09/2026).** Durante um conjunto de questões, a única referência de posição era a frase "Questão 3 de 20" e uma barra fina — para conferir o que tinha marcado na questão anterior, era preciso ir clicando em "Anterior". Agora a sessão abre com uma faixa de quadradinhos numerados, um por questão da fila, coloridos pelo resultado assim que cada uma é respondida, com pontinho âmbar no acerto no chute e no erro com certeza (os dois casos que a plataforma conta como não sabidos, mesmos destaques da tela de fim de conjunto). Clicar num quadradinho volta àquela questão; as que ainda não chegaram ficam apagadas e não clicáveis, porque `respostasSessao[i]` é a resposta de `itens[i]` e responder fora de ordem quebraria esse pareamento — a restrição está dentro de `irParaIndiceDaSessao()`, não só no botão. Funções: `renderMapaSessao()`, `alternarMapaSessao()`, `irParaIndiceDaSessao()`; CSS em `.mapa-sessao`. O simulado não mudou: lá o mapa continua mostrando só o que foi respondido, porque durante a prova cronometrada ninguém sabe o gabarito. Verificado com Chromium/Playwright (18 checagens: cores por tipo de resposta, pontinho nos casos certos, numeração, navegação por clique, trava de pular adiante, ocultar/mostrar, retomada da fila e largura no celular) e conferido nos dois temas.

**Esquema da nuvem executado em PostgreSQL de verdade (20/09/2026).** Antes de o usuário colar o `esquema.sql` no Supabase, ele foi rodado num PostgreSQL 16 local com um mínimo do Supabase reproduzido (schema `auth`, tabela de usuários e `auth.uid()`), e testado em 9 comportamentos: o gatilho criando o perfil no cadastro, aluno tentando se promover a administrador (bloqueado), aluno mudando o que é dele (permitido), reenvio do mesmo registro não virando duplicata e upsert atualizando, coordenação enxergando e aprovando cadastros, coordenação **não** enxergando as respostas dos alunos, gravação em nome de terceiro recusada pelo banco, visitante sem login sem acesso a tabela nenhuma, e exclusão de conta levando junto todo o progresso. O teste encontrou um defeito que teria travado a instalação: a trava que impede promoção pelo navegador também revertia, em silêncio, o comando do LEIA-ME que promove o primeiro administrador pelo SQL Editor (lá `auth.uid()` é nulo, então a função `e_equipe()` devolvia falso). Corrigido — a trava agora só vale para mudança vinda de alguém logado pelo site, e o caminho anônimo permanece fechado porque o papel `anon` não tem permissão de escrita. Na mesma passada o esquema ganhou os `GRANT`/`REVOKE` explícitos por tabela, em vez de depender da permissão padrão que o Supabase costuma dar às tabelas novas de `public`.
