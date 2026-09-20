# Esc — plataforma de estudos para residência médica
## Resumo do projeto (setembro de 2026 — revisão de 20/09)

Este documento existe para que uma nova conversa com o Claude comece sabendo tudo o que já foi decidido e construído. Anexe-o junto com o arquivo `esc.html` (o arquivo publicado chama-se `index.html`).

> **O que mudou na atualização mais recente:** uma rodada de caça a bugs em cima das contas/permissões, com quatro defeitos encontrados e corrigidos — tela em branco ao recarregar a página na confirmação de e-mail, matrícula duplicada passando quando só mudava a caixa das letras, e-mail pendente de troca que não bloqueava outro cadastro, e troca de grupo sem checar se a pessoa é membro. Detalhes na seção 18. Antes disso: contas de verdade ganharam confirmação de e-mail simulada no cadastro (sem servidor de e-mail — o código aparece na própria tela), e o Perfil passou a permitir trocar e-mail (com o mesmo código de confirmação) e senha, além de trocar rapidamente de turma/grupo direto ali (o ano da faculdade já podia ser trocado). Acesso demo continua idêntico, sem pedir nada disso. Também ficou registrada a causa provável de perda de dados ao publicar pelo GitHub Pages (troca de domínio/CNAME) e a recomendação para evitá-la. Detalhes na seção 17. Antes dessa, a seção 16 traz a revisão visual do sistema de design (escala tipográfica e de espaçamento unificadas, bug de altura desigual entre cards corrigido); a seção 15, onze pedidos pontuais do usuário (flashcard navegável por clique/tecla A-D, Simulados+Provas Antigas+Lista de Estudo fundidos numa tela, Histórico de Atividade por papel, restrição de área para professor/residente, gráfico de pizza por confiança, numeração de turma, entre outros); a seção 14, a carga das 500 questões reais da UNIFESP-EPM; e as seções 12-13, as revisões anteriores da mesma janela de trabalho.

---

## 1. O que é

`esc.html` é uma plataforma de estudos para prova de residência médica, escrita como **um único arquivo HTML autossuficiente**: sem instalação, sem servidor, sem build, sem dependência de internet (só as fontes do Google são externas, e são opcionais). Abre com dois cliques no navegador.

- **Tamanho atual:** ~1.730 KB, ~16.840 linhas.
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
  - **500 questões reais da UNIFESP-EPM** (`real: true`), 100 de cada ano de 2022 a 2026 — enunciado, alternativas e gabarito oficial transcritos integralmente (domínio público), com explicação de cada questão **100% autoral**, escrita com base em diretrizes e fontes primárias, nunca copiada de resolução de cursinho (seção 9 e seção 14). Questões anuladas pela banca entram com `status: "anulada"` e `motivoStatus` preenchido, mas mantêm explicação pedagógica.
  - **135 questões didáticas** de demonstração/construção de conhecimento (30 de Técnica Operatória, 30 de Cardiologia, 30 de Infectologia, 15 de Oftalmologia, 30 de demonstração original), com instituição **"Esc — Banco Didático"** e selo **Didática** — dá para isolá-las ou excluí-las por qualquer filtro de instituição.
- **501 flashcards autorais** de semente (`SEED_FLASHCARDS`). Além deles, a plataforma **gera cartões automaticamente** a partir das questões que cada aluno errou com certeza ou acertou no chute, e **cada aluno escreve os seus** durante a resolução — e pode **sugerir o próprio cartão para o baralho da equipe**, com aprovação de professor/coordenação (seção 13.6).
- Taxonomia atual: **5 grandes áreas, 39 especialidades, 216 assuntos** — ampliada de 91 para 216 assuntos (e de 24 para 39 especialidades) durante a carga das provas reais, para cobrir temas que a UNIFESP realmente cobra e a taxonomia didática original não previa (por exemplo, Psiquiatria inteira, criada do zero — seção 14).
- Nenhuma questão nem cartão da equipe é cópia de prova real ou de material de terceiros; enunciado/gabarito de prova pública são transcritos por serem domínio público, mas toda explicação é autoral (seção 9).

Com 500 questões reais cobrindo 5 anos de uma banca de referência, a repetição espaçada, a dificuldade progressiva e o percentil de simulado já têm massa real para funcionar bem — o próximo salto de volume seria repetir esse processo para as outras 5 bancas de referência (`CONFIG.instituicoesReferencia`), caso o usuário consiga as provas.

---

## 3. Papéis e permissões

**Aluno** — estudar (com a meta do dia), revisar, flashcards, simulados (que agora também reúnem provas antigas e listas de estudo — seção 4), favoritos, histórico de atividade (de estudo), desempenho, meu grupo, enviar questões.

**Residente** — fila de dúvidas, questões difíceis, revisar formatação, enviar provas e questões. Não tem acesso a "realizar simulados": essa tela é só de aluno (ver seção 15.5).

**Professor** — todo o conteúdo da própria área: banco de questões, importar, controle de qualidade, criar simulado (ou lista de estudo), material em PDF, flashcards da equipe, especialidades e assuntos, revisar formatação. Também não "realiza" simulado — quem cria não é quem responde.

**Restrição por especialidade (professor e residente).** Desde a atualização da seção 15, professor e residente só atuam numa das **5 grandes áreas** (Clínica Médica, Cirurgia Geral, Pediatria, GO, Medicina Preventiva e Social), escolhida no próprio cadastro (campo único, não mais múltiplo). A função `areaRestritaDoUsuario(u)` devolve essa área quando o usuário tem exatamente uma marcada, e o restante do sistema trava nela: banco de questões (lista e formulário), criar simulado (busca de candidatas), questões difíceis/sinalizadas/sugeridas e revisar formatação. Cadastros antigos sem essa marcação (ou com mais de uma área, de antes da mudança) continuam **sem restrição**, de propósito — a migração nunca bloqueia quem já usava a plataforma. Admin não é restrito.

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
- **No celular, arrastar o cartão para o lado troca de questão.**

### Fim de cada conjunto de questões
Página de feedback com: taxa de acerto, acerto por nível de confiança, **gráfico de pizza da taxa de acerto por confiança** (`graficoPizzaConfiancaSvg` — seção 15.9), e lista questão a questão mostrando o que acertou, errou, chutou ou respondeu na dúvida — com alertas de "acerto no chute" e "erro com certeza". Cada linha traz botões de voltar à questão, ver na íntegra, favoritar e **virar flashcard** (destacado nas erradas e chutadas). Tudo fica salvo e pode ser reaberto em **Histórico de Atividade** (para aluno; ver seção 15.4 para os outros papéis). **Simulados têm o mesmo gráfico de pizza** — a confiança neste caso é opcional durante a prova (não trava a navegação) e quem não marca entra como "na dúvida".

### Revisão
Tela dividida em duas seções claramente rotuladas — "Revisão de questões" e "Revisão por flashcards" (seção 15.6) — porque são dois formatos diferentes e antes ficavam misturados sem indicação visual.
- Repetição espaçada (SM-2 adaptado) que traz de volta tanto o que se errou quanto o que se acertou faz tempo.
- **Filas separadas por tipo de erro**: errou com certeza (prioridade máxima), acertou no chute (conta como não sabido), errou na dúvida.
- Lista de assuntos em que o aluno responde "com certeza" e erra.
- É aqui que fica o **detalhe assunto a assunto**, ao lado da ação correspondente.
- No fim da tela, a seção de flashcards vencidos, com borda de cor diferente para reforçar a separação visual.

### Flashcards (antes "Revisão Rápida")
A tela abre com a **meta diária de cartões** — progresso do dia, quantos faltam e sequência de dias seguidos —, a mesma estrutura da meta de questões, em outra unidade. As duas metas convivem e são independentes: quem prefere estudar por cartão, ou quem só tem dez minutos num dia corrido, mantém ritmo por ali.

Cartão com frente (pergunta curta) e verso (resposta direta), **sem alternativa para eliminar**. O aluno tenta lembrar, vira o cartão e se autoavalia. **Navegação** (seção 15.1): clicar no cartão, apertar **D** ou arrastar para a esquerda avança — primeiro mostra a resposta, só then passa para a pergunta do próximo cartão; apertar **A**, clicar no botão de voltar (gesto) ou arrastar para a direita sempre pousa numa **pergunta**, nunca reaparece direto numa resposta (`avancarFlashcard`/`voltarFlashcard`). O botão "Mostrar resposta" foi centralizado sob o cartão e aumentado (`.flash-btn-mostrar`).

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

### Simulados (fundida com Provas Antigas — seção 15.3)
Uma tela só, com três abas (`renderSimulados` + `mudarAbaSimulados`), só para aluno (ver seção 15.5):

1. **Simulados** — criados por professores, com cronômetro. **Cronômetro** com encerramento automático no fim do tempo, **tempo gasto por questão**, modo aprendizado (mostra explicação na hora), mapa de questões clicável. Resultado: nota, percentil anônimo entre as tentativas registradas, mapa de acertos/erros, **análise de tempo com "onde você travou"**, gráfico de pizza por confiança, revisão questão a questão e prática imediata dos erros. Confiança é opcional aqui (não trava a navegação — ver seção 15.9).
2. **Provas Antigas** — questões reais agrupadas por instituição + ano, com os mesmos filtros de antes (banca, ano, área, últimos 5 anos); "fazer como simulado" ou "praticar sem cronômetro".
3. **Listas de Estudo** (tipo novo — seção 15.3) — conjunto de questões de uma matéria específica, sem cronômetro, marcado como **realizado em** uma data (a turma já estudou aquilo) ou **disponibilizado em** uma data (ficou pronto a partir daquele dia). Criado em "Criar Simulado", escolhendo o tipo.

A rota antiga `provas-antigas` continua respondendo — só troca a aba automaticamente para "Provas Antigas", para não quebrar link salvo.

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

**Numeração da turma** (seção 15.10). Além do ano da faculdade, cada ano pode ter um número de turma associado (ex.: "Turma 92" para o 3º ano atual) — identifica a coorte, não o ano letivo: o ano muda todo ano, o número acompanha a mesma turma até se formar. Guardado em `db.numerosTurma[anoFaculdade]`, editável em Blocos de Estudo (administrador). Aparece como "3º ano · Turma 92" (`rotuloAnoComTurma`) em Meu Grupo e na coluna Turma/Ano de Usuários.

---

## 5. Decisões de interface (e por quê)

### Menu ordenado por probabilidade de uso
Não é alfabético nem temático: é a frequência esperada de uso. Os **quatro primeiros do aluno** — Início, Estudar, Meu Desempenho, Meu Grupo — são os únicos que aparecem no celular sem rolar.

Ordem do aluno (atualizada na seção 15 — "Revisão Rápida" virou "Flashcards", e "Provas Antigas" fundiu com "Simulados"): Início · Estudar · Meu Desempenho · Meu Grupo · Revisão · Flashcards · Simulados · Histórico de Atividade · Favoritos · Enviar Questões.

Ordem do conteúdo (professor/admin — atualizada na seção 15.5, sem mais "Realizar Simulados" nem "Provas Antigas": quem gere conteúdo não "realiza" simulado, só cria): Início · Banco de Questões · Importar Questões · Questões Difíceis · Criar Simulado · Material em PDF · Flashcards · Revisar Formatação · Especialidades e Assuntos.

Residente (também sem "Realizar Simulados"/"Provas Antigas"): Início · Fila de Dúvidas · Questões Difíceis · Enviar Provas e Questões · Revisar Formatação.

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

Arquivo único, com seções numeradas em caixa alta (use Ctrl+F):

1. `CONFIG`, níveis de admin, anos da faculdade, tema claro/escuro
2. `SEED_TAXONOMIA`, `SEED_BLOCOS`, `SEED_SEQUENCIAS_ANO`, `SEED_USUARIOS`, `SEED_QUESTOES`, `SEED_LIVRO_OURO`, `SEED_COMENTARIOS`, `SEED_FLASHCARDS`, `SEED_SIMULADOS`
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

**Funções-chave acrescentadas na segunda rodada de 19/09 (seção 15):**

| Função | O que faz |
|---|---|
| `avancarFlashcard()` / `voltarFlashcard()` | navegação de cartão por clique/tecla/gesto, com "voltar sempre pousa numa pergunta" (substituem `virarFlashcard`/`pularFlashcard`, removidas) |
| `renderAbaSimuladosProprios()` / `renderAbaProvasAntigas()` / `renderAbaListasEstudo()` | as três abas da tela fundida de Simulados (`renderSimulados`) |
| `mudarAbaSimulados()` / `mudarCategoriaCriarSimulado()` | trocam aba da tela de Simulados / tipo do formulário de Criar Simulado |
| `praticarListaEstudo()` | inicia uma sessão de prática a partir de uma lista de estudo |
| `registrarAtividade()` / `renderHistoricoAtividade()` | log e tela de atividade de quem gere conteúdo (`db.logAtividade`, `ROTULOS_ATIVIDADE`) |
| `areaRestritaDoUsuario()` | a grande área única de professor/residente, quando há uma (senão `null` = sem restrição) |
| `graficoPizzaSvg()` / `graficoPizzaConfiancaSvg()` | gráfico de pizza genérico e a versão por nível de confiança |
| `selecionarConfiancaSimulado()` | marca confiança opcional numa questão de simulado |
| `definirNumeroTurma()` / `numeroTurmaDoAno()` / `rotuloAnoComTurma()` | numeração de turma por ano da faculdade (`db.numerosTurma`) |

**Manutenção:** `sincronizarConteudoNovo()` acrescenta ao banco salvo qualquer área, especialidade, assunto, questão, flashcard, usuário-semente ou livro de ouro que exista no código e ainda não exista nos dados, comparando por `id`. Nada é sobrescrito nem apagado.

**Migrações em `loadState`:** criação de `db.flashcards` e `db.revisoesFlashcards`; normalização de `usuarioId` nos cartões antigos (todos viram "da equipe", que é o correto — foram escritos por professores); conversão de `anoFaculdade: "Internato"` para `"6º ano"`; criação de `db.sessoesEmAndamento`, `db.diasCartoes` e `db.configGeral.metaCartoesDia`; a migração dos blocos (abaixo); e, da seção 15, criação de `db.logAtividade` (vazio) e `db.numerosTurma` (semeado com `{"3º ano": 92}`), e normalização de `s.categoria = "simulado"` em qualquer `db.simulados` salvo antes da distinção simulado/lista existir.

**Migração dos blocos para sequências por ano.** `db.sequenciasAno` passa a guardar a ordem de blocos de cada ano, e o grupo guarda só `anoFaculdade` + `deslocamento`. Nada é apagado: o calendário que a coordenação tinha customizado vira a sequência do ano padrão, o calendário próprio de uma turma vira a sequência do ano dela se aquele ano ainda não tiver uma, e o que sobrar fica guardado em `grupo.blocosArquivados` — continua no banco e no backup, para consulta antes de descartar.

---

## 8. Limitações conhecidas

1. **Dados locais.** Tudo vive no `localStorage` de um navegador. Fila de dúvidas, grupos, percentil de simulado, aprovação de cadastros, relatório de turma e livro de ouro pressupõem várias pessoas, mas dois usuários em dois computadores não compartilham nada. **O usuário sabe disso e decidiu não migrar para backend agora.** Quando for a hora, Supabase ou Firebase resolvem, e o objeto `db` mapeia quase direto para tabelas.
2. **Banco pequeno.** 135 questões para uma máquina que pressupõe milhares. Em andamento pelo usuário. *(A plataforma já foi testada com banco sintético de mais de 6.000 questões e 8.000 respostas — ver seção 13.7 — sem travamentos perceptíveis em nenhuma tela.)*
3. **Flashcards da equipe.** Eram 24; agora são 501, cobrindo os 91 assuntos (seção 13.3). Os gerados automaticamente e os escritos pelos alunos suprem o resto, mas dependem de uso — e agora também podem ser promovidos ao baralho da equipe (seção 13.6).
4. **Autenticação é de demonstração**: senha em texto claro no arquivo. Cadastro, troca de e-mail e troca de senha já funcionam de verdade dentro do navegador (seção 17), inclusive com uma confirmação de e-mail — mas essa confirmação é **simulada**: como o app não tem servidor de e-mail, o código aparece na própria tela em vez de chegar numa caixa de entrada de verdade. Não serve para uso público real enquanto for assim.
4-B. **Domínio do GitHub Pages precisa ficar estável.** Os dados vivem no `localStorage` do navegador, que é isolado **por origem** (domínio). Criar, trocar ou remover o arquivo `CNAME` do repositório muda a origem em que a página é servida — todo mundo que já tinha usado o domínio anterior "perde" os dados (eles continuam lá, presos à origem antiga, o navegador só não os enxerga mais na origem nova). Isso já aconteceu neste projeto (um `CNAME` foi criado, atualizado e depois apagado no mesmo dia). Recomendação: escolher um domínio (customizado ou o padrão `usuario.github.io/repo`) e não mexer mais nisso depois que pessoas de verdade começarem a usar a plataforma.
5. **Backup manual e restrito.** Só o administrador máster exporta — se ele não exportar, ninguém exporta. Configurações avisa quando passa de ~3,5 MB e quando o último backup tem mais de 7 dias.
6. **Cartão pessoal é privado, não é segredo.** O isolamento é por papel na interface e nas funções; qualquer pessoa com acesso ao mesmo navegador e ao console enxerga tudo, como em qualquer dado do `localStorage`.
7. **Uma sequência de blocos por ano, e só uma.** Duas turmas do mesmo ano não podem ter ordens diferentes de matéria — por decisão de projeto, elas diferem só pelo ponto de entrada. Se um dia for preciso que uma turma tenha uma sequência realmente distinta, será um campo novo (`grupo.sequenciaPropria`) e mais uma migração.
8. **`somarDias()` usa `toISOString()`** depois de montar a data em horário local: certo para fusos negativos (Brasil), quebraria a data em fusos positivos (UTC+). Sem efeito para o público atual.
9. **Lembrete de meta diária só funciona com o navegador aberto.** Como o app não tem service worker nem servidor, a Notification API só dispara enquanto alguma aba do Esc está carregada (mesmo minimizada). Não existe aviso de verdade com tudo fechado — isso exigiria backend (ver limitação 1).
10. **Restrição de área de professor/residente (seção 15.8) não cobre tudo.** Vale para banco de questões, criar simulado, questões difíceis/sinalizadas/sugeridas e revisar formatação — mas não para Especialidades e Assuntos (taxonomia) nem para Importar Questões, que continuam abertos a todas as áreas. Se for preciso travar esses dois também, é o mesmo padrão de `areaRestritaDoUsuario()`.
11. **Confiança do simulado não é capturada em modo aprendizado** (seção 15.9). No fluxo padrão (sem modo aprendizado) funciona normalmente; em modo aprendizado, a questão vira "respondida" no instante em que a alternativa é marcada, sem janela para escolher confiança antes disso.

---

## 9. Política de conteúdo adotada

- **Enunciado, alternativas e gabarito oficial de prova pública são domínio público.** Prova de residência de instituição pública (USP-SP/FMUSP, USP-RP/FMRP, UNIFESP-EPM, Santa Casa de São Paulo, IAMSPE, UNESP etc.) é ato público: pode-se transcrever o texto oficial da questão e o gabarito oficial **integralmente**, sem parafrasear. Questão assim entra com `real: true`, banca e ano corretos.
- **O que nunca pode ser copiado é a explicação/resolução de terceiros** — cursinhos (Medway, Estratégia MED etc.), sites de questões comerciais, apostilas. Esse texto é propriedade intelectual de quem o escreveu, e é também a parte mais sujeita a erro/desatualização quando copiada sem checar. A explicação de **toda** questão — real ou autoral — é escrita pela equipe, com base em fontes primárias e oficiais (diretrizes e consensos de sociedades, protocolos e PCDT do Ministério da Saúde, revisões sistemáticas e artigos originais), citadas em `REFERENCIAS`.
- O prompt de importação (tela Importar Questões) já traz as duas regras separadas: uma seção dizendo que o enunciado pode ser copiado (é domínio público) e outra dizendo que a explicação não pode (isto é autoral). O prompt de segunda opinião segue a mesma regra.
- O formulário de flashcard repete a regra: material da equipe pede fonte oficial; cartão pessoal pede que o aluno escreva **com as próprias palavras** ("cartão copiado do enunciado inteiro não ensina nada").
- `CONFIG.instituicoesReferencia` lista as 6 bancas de referência do curso (USP-SP, USP-RP, UNIFESP-EPM, Santa Casa de São Paulo, IAMSPE, UNESP) como sugestão nos campos de instituição — não restringe, só agiliza o preenchimento.

---

## 10. Próximos passos sugeridos

1. ~~Carga das provas reais dos últimos cinco anos~~ — feito para a UNIFESP-EPM (500 questões, 2022-2026, seção 14). Falta repetir para as outras 5 bancas de referência, se o usuário conseguir os PDFs.
2. ~~Ampliar o baralho da equipe~~ — feito nesta revisão (501 flashcards, seção 13.3).
3. Backend com autenticação de verdade, quando o uso sair do dispositivo único.
4. ~~Notificações/lembretes de meta diária~~ — feito nesta revisão (seção 13.4).
5. ~~Cartões com imagem~~ — feito nesta revisão (seção 13.5).
6. ~~Promover cartão pessoal para o baralho da equipe~~ — feito nesta revisão (seção 13.6).
7. Relatório individual do aluno em PDF, para devolutiva um a um.
8. ~~Perfilar de novo as telas com banco grande~~ — feito nesta revisão com banco sintético de >6.000 questões; dois gargalos novos encontrados e corrigidos (seção 13.7). Vale repetir o exercício de novo quando o banco real crescer bastante mais, pelo mesmo motivo de sempre: esse tipo de gargalo só aparece com volume.
9. ~~Estatística de uso das alternativas eliminadas~~ — feito nesta revisão (seção 13.8).
10. Estender a restrição de área de professor/residente (seção 15.8) para Especialidades e Assuntos e para Importar Questões, se fizer sentido travar esses dois também.
11. Permitir capturar confiança do simulado também em modo aprendizado (seção 15.9, limitação 11).

---

## 11. Como pedir alterações numa nova conversa

Anexe `esc.html` e este resumo, e descreva o que quer em português corrente. Convenções que o projeto segue e vale manter:

- Tudo em **português do Brasil**, inclusive nomes de funções e variáveis.
- Comentários no código explicando a **regra em linguagem simples**, pensados para quem não programa.
- Nenhuma dependência externa nova; nada de framework. (Os gráficos são SVG escrito à mão; o PDF usa a impressão do navegador.)
- Toda alteração no modelo de dados vem acompanhada de migração em `loadState`.
- Rota que sai do menu continua respondendo, redirecionando para o novo lugar — link salvo por aluno não pode quebrar.
- A plataforma **explica o que faz**: quando o algoritmo muda uma proporção, esconde um botão ou prioriza uma questão, a tela diz o porquê.

---

## 12. O que mudou na revisão de 19/09/2026

### Defeitos corrigidos

1. **A escada de repetição espaçada não era usada.** `CONFIG.intervalosBase` ([1, 3, 7, 16, 35, 75]) estava declarada, comentada e documentada neste resumo, mas `registrarRevisao()` ignorava a lista e usava valores fixos no código (1 dia, depois 6, depois só multiplicava pelo fator). Agora a escada é percorrida de verdade, degrau a degrau, e o fator só entra quando ela acaba. A progressão dos primeiros intervalos ficou mais gradual — que era a intenção original.
2. **Gargalo de desempenho na dificuldade progressiva.** `calcularDificuldade()` recalculava a prevalência de **todos** os assuntos, varrendo o banco inteiro, **para cada questão** — e era chamada de dentro de um `.sort()`. Com 135 questões passava despercebido; com milhares travaria o navegador. Agora a prevalência é calculada uma vez por gravação (cache invalidado por `_geracaoDb`, que `saveState()` incrementa). Os números de saída são idênticos aos de antes; ordenar 5.000 questões por dificuldade passou a levar ~9 ms.
3. **Contraste abaixo do mínimo de acessibilidade.** No tema claro, `--muted` (rótulos, dicas, legendas) tinha 3,25:1 e `--amber` (avisos, badges) 3,30:1 sobre o fundo — a WCAG AA pede 4,5:1 para texto pequeno. Os dois foram escurecidos mantendo o mesmo matiz: agora 4,63:1 e 4,67:1. O tema escuro já passava e não foi mexido.
4. **Afordância enganosa nas alternativas.** Depois de responder, passar o mouse sobre as alternativas ainda dava o destaque de "clicável", embora elas já não respondessem a clique.
5. **Comentário `/* */` não fechado** logo depois de `SEED_BLOCOS`, que engolia o bloco de documentação seguinte.

### Polimento visual

Sistema de elevação (`--shadow-xs/sm/md`) aplicado só ao que é de fato clicável; transição suave na troca de tema; entrada de página a cada navegação; efeito de virada no flashcard; `prefers-reduced-motion` respeitado em tudo; título da home com escala fluida (`clamp`); rótulos de seção padronizados em caixa alta com espaçamento entre letras.

### Funcionalidades novas

| O quê | Onde mexer |
|---|---|
| **Paginação** de todas as listas longas | `paginar()` / `controlesPaginacao()` |
| **Meta diária de flashcards** com sequência de dias | `metaCartoesDoUsuario()`, `abrirModalMetaCartoes()`, `db.diasCartoes` |
| **Eliminar alternativas** durante a questão | `alternarAlternativaEliminada()`, classe CSS `.eliminada` |
| **Blocos por ano da faculdade** com rodízio entre turmas | `SEED_SEQUENCIAS_ANO`, `blocosDoGrupo()`, tela Blocos de Estudo |
| **Sessão retomável** (sair e voltar mantém a mesma fila) | `salvarSessaoEmAndamento()`, `db.sessoesEmAndamento` |
| **Fim do "expandir" redundante** na questão em resolução | `renderAcoesQuestao()`, `renderQuestionCard()` |

### Como isso foi verificado

Além da leitura do código, a plataforma foi aberta num navegador automatizado (Chromium/Playwright) e percorrida inteira: login nos seis papéis, todas as rotas de cada papel, sessão de estudo completa, flashcards, os quatro recortes de Meu Desempenho, os quatro tipos de PDF, CRUD de questão, rodízio de turmas e migração de um banco no formato antigo. Nenhum erro de JavaScript em nenhum desses caminhos.

---

## 13. O que mudou na atualização da noite de 19/09/2026

Esta rodada tratou a lista de "próximos passos sugeridos" da seção 10. Ordem desta seção segue a mesma numeração dos itens 1-9 daquela lista.

### 13.1 — Política de conteúdo: domínio público × explicação autoral

O usuário esclareceu um ponto real: prova de residência de instituição **pública** (USP-SP, USP-RP, UNIFESP, Santa Casa de São Paulo, IAMSPE, UNESP) é ato público — o **enunciado, as alternativas e o gabarito oficial** podem ser usados integralmente, sem parafrasear. O que nunca pode ser copiado é a **explicação/resolução de terceiros** (cursinhos, sites comerciais) — isso sim é propriedade intelectual de quem escreveu, e também a parte mais sujeita a erro quando copiada sem checar.

Mudou:
- `CONFIG.instituicoesReferencia`: lista das 6 bancas, sugerida (não obrigatória) nos campos de instituição de Importar Questões e do formulário de questão.
- `gerarPromptImportacao()`: o prompt de IA agora separa claramente duas regras — "REGRA SOBRE O ENUNCIADO (pode copiar)" e "REGRAS SOBRE A EXPLICAÇÃO (isto NÃO pode ser copiado)", nos dois modos (prova inteira e questões avulsas).
- Comentário acima de `SEED_QUESTOES` reescrito com a política completa.
- Seção 9 deste resumo, reescrita (ver acima).

### 13.2 — Questões reais das 6 bancas, últimos 5 anos: infraestrutura pronta, conteúdo pendente

**Isto ficou incompleto, e é importante que a próxima conversa saiba o motivo.** O plano era buscar na internet as provas reais e estruturá-las direto no banco. Na prática:

- O `WebSearch` confirmou que as 6 bancas publicam prova+gabarito oficiais em PDF, em endereços oficiais (FUVEST para USP-SP e USP-RP, VUNESP para UNESP, site da Avança-SP/IAMSPE, FCC para a Santa Casa de São Paulo, COREME/FapUnifesp para a UNIFESP).
- Mas o `WebFetch` e o `curl` direto para baixar esses PDFs retornaram `EGRESS_BLOCKED` / 403 — a política de rede **deste ambiente de execução** (não é uma regra do projeto) bloqueia esses domínios. Não foi feita nenhuma tentativa de contornar isso.
- Sem conseguir baixar o PDF oficial, não havia como transcrever as questões reais com a precisão que a política de conteúdo exige (seção 13.1) — inventar o texto "de memória" e apresentar como se fosse a prova real seria exatamente o risco que o projeto sempre quis evitar.

**O que ficou pronto** para quando o conteúdo chegar: instituições sugeridas no formulário, prompt de importação já separando enunciado (copiável) de explicação (autoral), campo `real:true/false` e filtro "últimos 5 anos" (já existia antes desta revisão, em Estudar, Provas Antigas e Simulados).

**Como destravar:** numa próxima conversa (ou nesta mesma, se o ambiente permitir acesso à internet), baixe ou cole o texto/PDF da prova real e peça para estruturar via "Admin > Importar Questões" — é exatamente para isso que a tela existe.

### 13.3 — Baralho da equipe: de 24 para 501 flashcards

`SEED_FLASHCARDS` ganhou 477 cartões novos (`fc-025` a `fc-501`), cobrindo os 91 assuntos das 5 grandes áreas — de 5 a 10 cartões por assunto, mais concentrados nos assuntos de maior peso em prova (síndrome coronariana aguda, sepse, HIV, pré-eclâmpsia, apendicite, técnica operatória etc.). Todos com `usuarioId:null` (equipe), `origem:"autoral"`, escritos com o mesmo padrão de pergunta-curta/resposta-direta dos 24 originais. Conteúdo baseado em consensos e diretrizes de conhecimento médico geral, no mesmo espírito das 105 questões didáticas já existentes — não é cópia de nenhum material de terceiros.

### 13.4 — Lembrete de meta diária

A plataforma já tinha um aviso *dentro do app* quando a meta do dia não é batida (`gerarNotificacoes()` já existia). O que faltava era avisar quem não abriu o app. Duas funções novas:

- `ativarLembreteMetaDiaria()` / `desativarLembreteMetaDiaria()`: pedem permissão de notificação do navegador e ligam/desligam o lembrete por usuário (`usuario.lembreteMetaAtivo`, `usuario.lembreteMetaHorario`).
- `checarLembreteMetaDiaria()`: rodando a cada 60s (`setInterval`, no bloco de INICIALIZAÇÃO), dispara uma `Notification` do navegador no horário configurado (padrão 20h) se a meta de questões OU de cartões ainda não foi batida naquele dia — só uma vez por dia (`usuario.lembreteMetaUltimoEnvio`).

Configurável em **Perfil** (card "Lembrete de meta diária", só para aluno). **Limitação documentada** (seção 8, item 9): só funciona com uma aba do navegador aberta — sem service worker/backend não existe push de verdade com tudo fechado.

### 13.5 — Flashcards com imagem

Mesmo padrão de imagem que já existia nas questões (upload com compressão para JPEG ~1100px, ou link) — reaproveitado nos flashcards:

- Campos novos no cartão: `imagemUrl`, `imagemLegenda`.
- Formulário (`abrirFormularioFlashcard`): campo de imagem com upload/link/preview/remover, usando um estado à parte (`state.filtroRota.imagemFlashcard`) para não colidir com o formulário de questão.
- A imagem aparece **na frente do cartão**, antes de virar — pensado para cartões de reconhecimento (identifique o achado no ECG/fundo de olho/lesão antes de ver a resposta).
- Também entra no PDF do baralho para recortar (`htmlFlashcardsPDF()`).
- Não foram adicionadas imagens de exemplo no `SEED_FLASHCARDS`: como o ambiente desta conversa não tem acesso à internet para verificar se uma URL externa realmente carrega (seção 13.2), preferiu-se não arriscar um link quebrado no material da equipe. A equipe usa a tela para anexar as imagens reais.

### 13.6 — Promover cartão pessoal para o baralho da equipe

Fluxo novo, com aprovação no meio — os dois mundos (cartão pessoal × baralho oficial) agora se comunicam, mas não automaticamente:

1. Na lista "Meus cartões" (Revisão Rápida), cada cartão pessoal ganhou um botão para **sugerir** o cartão para a equipe (`sugerirFlashcardParaEquipe()`). O cartão continua pessoal e no baralho do aluno normalmente enquanto aguarda.
2. A sugestão aparece em **Controle de Qualidade > aba "Flashcards Sugeridos"** (nova aba, ao lado de Difíceis/Sinalizadas/Sugeridas/Duplicadas), visível a quem gerencia conteúdo (professor, admin de qualquer nível).
3. Aprovar (`aprovarFlashcardSugerido()`): o cartão vira `usuarioId:null` (material da equipe), `origem:"promovido"`, mantendo `autorOriginalId` para dar crédito a quem escreveu.
4. Recusar (`recusarFlashcardSugerido()`): pede um motivo (opcional), o cartão continua pessoal, e o aluno pode ajustar e enviar de novo.
5. Badges de status (`badgeSugestaoFlashcard()`) mostram "aguardando aprovação", "promovido" ou "recusado" (com o motivo) na lista do próprio aluno.

Testado ponta a ponta com automação de navegador: aluno cria cartão a partir de uma questão → sugere → professor aprova → cartão passa a aparecer no baralho da equipe.

### 13.7 — Novo reperfilamento com banco grande (>1.000 questões) — dois gargalos encontrados e corrigidos

A seção 8 já registrava que o banco tinha sido testado com 2.135 questões depois da correção anterior (dificuldade progressiva). Desta vez o teste foi mais agressivo — **banco sintético de 6.135 questões, 8.000 respostas e 6.501 flashcards**, gerado e medido via Chromium/Playwright automatizado — e apareceram **dois gargalos novos do mesmo tipo do já corrigido**: uma função relida do zero a cada chamada, dentro de um laço sobre o banco inteiro.

1. **`respostasDaQuestao()` varria `db.respostas` inteiro a cada chamada.** Ela é usada por `jaFoiRespondida()` e `ultimaResposta()`, que por sua vez são chamadas **uma vez por questão** dentro de vários filtros: sessão recomendada, filas de confiança (erro com certeza / acerto no chute), montagem do baralho de flashcards. Com poucas respostas isso não se nota; com milhares de respostas e milhares de questões, o custo é (questões × respostas). Corrigido com um índice por usuário (`indiceRespostasDoUsuario()`), montado uma vez e reaproveitado enquanto o banco não muda — mesma técnica de cache por `_geracaoDb` já usada em `mapaPrevalenciasAssuntos()`.
2. **`questoesDuplicadasDe()` varria o banco inteiro a cada questão colada na importação.** Colar uma prova de 100 questões contra um banco de 6.000 chamava essa função 100 vezes, cada uma revarrendo e renormalizando os 6.000 enunciados existentes — **6,8 segundos** de travamento na pré-visualização da importação. Corrigido com um índice de assinaturas (`indiceAssinaturasQuestoes()`), também cacheado por `_geracaoDb`. `gruposDeDuplicatas()` (aba Duplicadas) passou a reaproveitar o mesmo índice.

**Resultado medido** (banco de 6.135 questões / 8.000 respostas / 6.501 flashcards):

| Operação | Antes | Depois |
|---|---|---|
| Colar prova de 100 questões (pré-visualização da importação) | 6.779 ms | 106 ms |
| Montar sessão recomendada | 689 ms | 8 ms |
| Montar baralho de flashcards | 941 ms | 19 ms |
| Abrir a tela Estudar | 820 ms | 13 ms |
| Abrir Meu Desempenho | 463 ms | 12 ms |
| Aba Duplicadas (Controle de Qualidade) | 87 ms | 0,2 ms |

Ordenação por dificuldade (o gargalo já corrigido na revisão anterior) continuou rápida (~11-16 ms com 6.135 questões), confirmando que aquela correção segue de pé com um banco ainda maior.

### 13.8 — Estatística de alternativas eliminadas

Novo dado de qualidade de questão: quando um aluno **erra** uma questão, a plataforma agora registra quais alternativas ele já tinha **riscado** (eliminado) antes de responder.

- `registrarResposta()`: se a resposta for incorreta, incrementa `q.estatisticas.eliminacoesAoErrar[altId]` para cada alternativa que estava em `eliminadasDaQuestao(questaoId)` no momento da resposta. Campo lido com `||{}` em todo lugar, então nenhuma questão antiga precisou de migração.
- Em **Controle de Qualidade > Questões Difíceis**, cada alternativa agora mostra "riscada por N" ao lado da barra de distribuição.
- Quando o **próprio gabarito** foi a alternativa mais riscada por quem errou, aparece um alerta destacado: é o sinal de que a resposta certa está redigida de um jeito que soa errada, e vale revisar o texto daquela alternativa especificamente.

Essa é a mesma informação que já aparecia individualmente no feedback de fim de questão ("Você tinha eliminado a alternativa X, que era a correta") — agora também **agregada por questão**, para quem gerencia conteúdo decidir se a alternativa precisa ser reescrita.

### Como isso foi verificado

Sintaxe do arquivo inteiro validada a cada edição grande (`node -e "new Function(...)"`, sem erros). Fluxo completo testado com Chromium/Playwright automatizado: login nos seis papéis e navegação por todas as rotas de cada um (nenhum erro de JavaScript); aluno respondendo questão com alternativa certa riscada (confirma `eliminacoesAoErrar` incrementando); aluno criando flashcard a partir de questão, sugerindo para a equipe, e professor aprovando (confirma o fluxo de promoção ponta a ponta); e o banco sintético de >6.000 questões usado para medir os tempos da tabela acima.

---

## 14. Carga das 500 questões reais da UNIFESP-EPM (2022-2026)

O usuário forneceu os PDFs das provas objetivas da UNIFESP-EPM (Acesso Direto/R1) dos últimos cinco anos — material de um cursinho (Medway), mas cujo conteúdo de prova (enunciado, alternativas, gabarito oficial) é ato público, coberto pela política de conteúdo já registrada na seção 9. O pedido foi explícito: usar o conteúdo real, escrever explicação sempre autoral, e ampliar a taxonomia com os assuntos novos que a prova cobrisse e a plataforma ainda não tivesse (o próprio usuário citou Psiquiatria como exemplo).

### 14.1 — Extração do texto das provas

As 5 provas em PDF foram convertidas para texto com `pdftotext` (poppler-utils, instalado via `apt-get` neste ambiente): uma cópia em modo `-layout` (para leitura humana, preservando colunas) e outra em modo linear (mais fácil de processar por regex). Dois scripts Node.js reutilizáveis (`provas/parse_gabarito.js` e `provas/parse_questoes.js`) fazem a extração mecânica:

- `parse_gabarito.js` lê a folha de respostas de cada prova e gera `gabarito_AAAA.json` (`{"1":"A","2":"C",...}`, com `null` nas questões anuladas).
- `parse_questoes.js` quebra o texto em questões (`QUESTÃO N.`), separa enunciado e alternativas A-D, remove cabeçalhos/rodapés repetidos e casa cada questão com seu gabarito, gerando `questoes_AAAA.json` — um array com `{numero, enunciado, alternativas, gabarito, anulada}` por questão.

Duas armadilhas de parsing precisaram de correção: um caractere de quebra de página (`\f`) inserido pelo `pdftotext` no meio do texto de algumas alternativas (corrigido normalizando cada linha com `.trim()` antes do regex); e a última questão de cada prova (Q100) absorvendo a folha de gabarito em branco por não haver um "QUESTÃO 101" para marcar o fim do bloco (corrigido cortando o texto no cabeçalho "GABARITO" antes de separar as alternativas). Uma checagem automatizada final (`node -e` percorrendo as 500 questões) não encontrou nenhum problema estrutural (enunciado vazio, alternativa vazia, campo com tamanho anômalo).

**Achado relevante para o formulário:** a prova real da UNIFESP-EPM usa só 4 alternativas (A-D), não 5 (A-E) como a plataforma assumia. O formulário de cadastro manual (`salvarQuestaoFormulario`) e o parser de importação em texto (`parseImportText`) foram ajustados para tornar a alternativa E opcional, com uma dica de texto explicando o motivo — sem quebrar nada que já dependia de 5 alternativas.

### 14.2 — Classificação e explicação autoral

Para cada uma das 500 questões, o processo foi: ler o conteúdo completo (enunciado, alternativas, gabarito oficial), decidir o assunto da taxonomia mais adequado (reaproveitando um assunto já existente sempre que fazia sentido, para não pulverizar a taxonomia em categorias quase-duplicadas) e escrever uma explicação de **por que o gabarito está certo e por que as alternativas erradas não se sustentam**, sempre a partir de diretrizes de sociedades médicas brasileiras, protocolos do Ministério da Saúde ou literatura consagrada — nunca a partir da resolução do cursinho de origem do PDF, que não foi lida com esse propósito em nenhum momento do processo. Cada questão também recebeu uma referência citada (`referencias`) e uma dificuldade estimada (fundamental/intermediário/avançado).

Essas anotações (classificação + explicação) foram escritas em arquivos JSON compactos (`provas/anota_AAAA.json`, um objeto por questão: `{n, a: assuntoId, d: dificuldade, exp: explicação, ref: referência}`) e combinadas ao conteúdo mecânico da prova por um script (`provas/merge_year.js`), que:

1. Lê a `SEED_TAXONOMIA` diretamente do `esc.html` (via regex + `eval`) para montar um índice `assuntoId → {especialidadeId, areaId}`.
2. Junta `questoes_AAAA.json` com `anota_AAAA.json` por número da questão.
3. Gera o objeto JavaScript completo de cada questão (`id: "q-unifespAAAA-NNN"`, `banca: "UNIFESP-EPM"`, `real: true`, todos os campos do modelo de dados) e avisa se alguma questão ficou **sem anotação** ou com **assunto inválido** (checagem que pegou erros de digitação de `assuntoId` antes da inserção).
4. Escreve o resultado em `bloco_AAAA.js`, inserido no `SEED_QUESTOES` do `esc.html` logo antes do fechamento do array.

Esse pipeline (ler → anotar → expandir taxonomia quando faltava algo → rodar o script → inserir o bloco → validar) foi repetido ano a ano, o que permitiu reaproveitar assuntos já criados em anos anteriores e ir refinando a taxonomia de forma incremental em vez de tentar prever tudo de uma vez.

### 14.3 — Taxonomia ampliada: de 91 para 216 assuntos

A prova de "Acesso Direto" da UNIFESP cobre a medicina inteira, não só as especialidades que a plataforma já tinha (Cardiologia, Pneumologia, Gastroenterologia, Endocrinologia, Infectologia, Nefrologia, Oftalmologia, Técnica Operatória). Especialidades inteiras foram criadas do zero, entre elas:

- **Psiquiatria** (o exemplo citado pelo usuário): Transtornos do Humor, Psicoses e Esquizofrenia, Transtornos por Uso de Substâncias, Psiquiatria da Infância.
- Neurologia, Neurocirurgia, Otorrinolaringologia, Ortopedia, Urologia, Reumatologia, Dermatologia, Hematologia, Alergia e Imunologia, Geriatria, Genética Médica, Anestesiologia, Cirurgia Vascular, Cirurgia Torácica, Cirurgia Oncológica, Abdome Agudo/Trauma, Perioperatório, Bioética, Epidemiologia/Bioestatística, SUS/Saúde Coletiva, Saúde da Família, Ginecologia, Obstetrícia, Planejamento Familiar, Onco-ginecologia, Neonatologia, Crescimento e Desenvolvimento, Infectologia Pediátrica, Emergências Pediátricas.

Ao todo, **125 assuntos novos** foram acrescentados em 5 levas (uma grande leva inicial, cobrindo a maior parte das lacunas de uma vez a partir de uma leitura panorâmica das 500 questões, e quatro levas menores, uma por ano, para os assuntos mais específicos que só apareceram ao escrever a explicação detalhada de cada questão) — sempre verificando antes se um assunto equivalente já existia, para não duplicar categorias. Cada leva ficou marcada com um comentário no código (`/* ... assuntos avulsos ... */`) explicando de onde veio.

### 14.4 — Validação

Depois da inserção de cada ano (e uma validação final consolidada com os 5 anos juntos):

- **Sintaxe:** `node -e "new Function(scriptContent)"` sem erros a cada inserção.
- **IDs únicos:** checagem de duplicidade entre as 500 questões reais (`q-unifespAAAA-NNN`) e as 135 didáticas já existentes — nenhuma duplicata.
- **Integridade da taxonomia:** todo `assuntoId` usado por uma questão real existe na `SEED_TAXONOMIA`; toda `especialidadeId` de assunto existe; toda `areaId` de especialidade existe — checado nos 216 assuntos, nas 39 especialidades e nas 500 questões reais, sem nenhuma referência quebrada.
- **Completude estrutural:** nenhuma questão com enunciado vazio, menos de 4 alternativas, alternativa sem texto, status "ativa" sem gabarito, ou explicação vazia/curta demais.
- **Funcional, com Chromium/Playwright:** contagem de questões por ano batendo com o esperado (100 cada); contagem de anuladas por ano batendo com a folha de gabarito oficial de cada prova (2022: 1, 2023: 4, 2024: 3, 2025: 7, 2026: 3); resposta de uma questão de cada ano com a alternativa do gabarito oficial sendo registrada como `correta: true`; nenhum erro de JavaScript ao carregar a página nem ao navegar pelas rotas principais.
- **Resumo final do banco** (lido do `db` já carregado no navegador): 635 questões totais, 500 reais da UNIFESP-EPM (100 por ano de 2022 a 2026), 216 assuntos, 39 especialidades, 5 áreas, 501 flashcards — sem nenhum erro de JavaScript.

### O que ficou de fora, de propósito

Nenhuma explicação foi copiada, parafraseada ou consultada a partir da resolução do cursinho presente no PDF original — a resolução do Medway não foi lida como fonte para as explicações em nenhum momento; apenas o enunciado, as alternativas e o gabarito oficial (a parte de domínio público) foram usados. Imagens/figuras eventualmente referenciadas em algumas questões (por exemplo, ultrassonografias, radiografias, ressonâncias mencionadas no enunciado) não foram reproduzidas — a explicação descreve o achado esperado com base no texto do enunciado e no gabarito, mas a plataforma não tem a imagem original anexada a essas questões específicas.

---

## 15. O que mudou na atualização da noite de 19/09/2026 (segunda rodada — pedidos do usuário)

Esta rodada tratou onze pedidos pontuais do usuário, numerados 1 a 11 abaixo (a numeração é só desta seção, não corresponde à ordem em que foram pedidos). Nenhum arquivo novo: tudo dentro do próprio `index.html`.

### 15.1 — Navegação de flashcard por clique/tecla, com "voltar sempre pousa numa pergunta"

Antes, clicar no cartão só alternava pergunta/resposta do mesmo cartão (não avançava), e as teclas A/D não faziam nada em Flashcards. Duas funções novas substituem `virarFlashcard()`/`pularFlashcard()`, que foram removidas:

- `avancarFlashcard()` — se está na pergunta, vira para a resposta; se já está na resposta, avança para a pergunta do próximo cartão.
- `voltarFlashcard()` — se está na resposta, volta para a pergunta do mesmo cartão; se já está na pergunta, volta para a pergunta do cartão anterior (nunca reaparece direto numa resposta — era exatamente o pedido: "se está na resposta e clicar A, volta na pergunta; mas se está na pergunta e voltar, volta para a pergunta anterior").

Ligado em quatro lugares: `onclick` do cartão (clique = avançar), tecla A/D no `keydown` global (bloco de flashcards adicionado ao lado do bloco que já existia para sessão/simulado), e o gesto de arrastar (`avancarPorGesto`/`voltarPorGesto`, que antes usavam `pularFlashcard` e agora chamam as duas funções novas). Testado via automação de navegador: D-D-A a partir do cartão 1 pousa de volta no cartão 1 (pergunta), não no cartão 2 nem na resposta do cartão 1.

### 15.2 — Botão "Mostrar resposta" centralizado e maior

O botão vivia fora do `.flash-palco` (a faixa de 640px que centraliza o cartão), então tecnicamente já estava com `justify-content:center`, mas centralizado na LARGURA DA PÁGINA, não do cartão — o que descolava visualmente os dois. Ele entrou para dentro do `.flash-palco`, ficando alinhado sob o cartão, e ganhou uma classe própria (`.flash-btn-mostrar`) com mais padding e fonte maior (`1.05rem`).

### 15.3 — Simulados + Provas Antigas + Lista de Estudo fundidos numa tela só

`renderSimulados()` agora é uma tela com três abas (`state.filtroRota.abaSimulados`, controlada por `mudarAbaSimulados()`):

1. **Simulados** (`renderAbaSimuladosProprios`) — o que já existia: recomendados para o bloco atual + outros disponíveis.
2. **Provas Antigas** (`renderAbaProvasAntigas`, renomeada de `renderProvasAntigas` — mesma lógica de filtro por banca/ano/área, só perdeu o próprio `page-header` porque a tela já tem um).
3. **Listas de Estudo** (`renderAbaListasEstudo`) — tipo novo de conjunto de questões.

**Tipo novo "lista de estudo".** `db.simulados` ganhou o campo `categoria` ("simulado" ou "lista" — o campo `tipo` antigo, que já existia mas nunca era lido por lógica nenhuma, ficou como estava, sem uso). Uma lista de estudo tem `especialidadeId` (a "matéria" — opcional, "todas" se vazio), `dataTipo` ("realizada" ou "disponibilizada") e `dataRef` (data ISO). Sem cronômetro: "Estudar agora" chama `praticarListaEstudo()`, que é uma sessão de prática comum (`iniciarSessaoComLista`).

**Criar Simulado** (`renderCriarSimulado`) ganhou um seletor "Tipo de conjunto" (`mudarCategoriaCriarSimulado`) que troca os campos da etapa 3: simulado mostra duração + blocos recomendados; lista de estudo mostra matéria + "esta lista foi realizada/disponibilizada em" + data. `salvarSimuladoCriado()` monta o objeto certo conforme a categoria.

A rota antiga `provas-antigas` continua respondendo (não quebra link salvo): o roteador troca a aba para "provas" e redireciona para `simulados`.

### 15.4 — Histórico de Atividade diferente por papel

Antes, `renderHistorico()` mostrava a mesma coisa para todo mundo: sessões de questões respondidas e simulados realizados. Isso fazia sentido para aluno, mas nada para quem gere conteúdo — professor, residente e admin não "estudam" no dia a dia, eles tomam decisões (aprovar cadastro, editar questão, aprovar sugestão).

- **Novo armazenamento:** `db.logAtividade` (array), com `registrarAtividade(usuarioId, tipo, descricao, alvoId)`, e um mapa `ROTULOS_ATIVIDADE` que dá ícone e rótulo a cada `tipo` (cadastro aprovado/recusado, questão criada/editada/excluída, questão sugerida aprovada/recusada, flashcard promovido/recusado, simulado/lista criado, papel alterado, nível de admin alterado).
- **Instrumentado em:** `aprovarUsuario`/`rejeitarUsuario`, `alterarPapelUsuario`, `alterarNivelAdmin`, `salvarQuestaoFormulario` (criar/editar), `excluirQuestaoConfirmado`, `aprovarQuestaoSugerida`, `aprovarFlashcardSugerido`/`recusarFlashcardSugerido`, `salvarSimuladoCriado`.
- **Novo render:** `renderHistoricoAtividade(u)` — linha do tempo das próprias ações do usuário (`usuarioId===u.id`, nunca as de outro), com contadores por tipo e paginação. `renderHistorico()` decide qual mostrar: `u.papel!=="aluno" && !state.modoAluno` vai para a atividade; senão, o histórico de estudo de sempre. Em modo aluno, professor/residente/admin veem o histórico de estudo normalmente, porque ali eles estão de fato estudando.

### 15.5 — "Realizar Simulados" saiu do menu de residente, professor e admin

`navItemsParaPapel()`: o item `simulados` (antes rotulado "Realizar Simulados" para quem gere conteúdo) e o item `provas-antigas` separado saíram dos arrays de residente e de conteúdo (professor/admin) — porque os dois viraram a mesma tela fundida (seção 15.3), e essa tela é só de aluno. Quem gere conteúdo usa "Criar Simulado" para montar simulados/listas, não para respondê-los; depois de criar, `salvarSimuladoCriado()` volta para `criar-simulado` (não mais para `simulados`, que nem aparece no menu dele). O menu de aluno também mudou: "Simulados" e "Provas Antigas" eram dois itens e viraram um só (a tela com abas).

### 15.6 — Revisão: questões e flashcards separados visualmente

`renderRevisao()` ganhou dois rótulos de seção (`.secao-revisao-titulo`, CSS novo — caixa alta, letter-spacing, ícone) que dividem a tela em "Revisão de questões" (repetição espaçada, assuntos vencidos, filas por tipo de erro, só erros/chutes pendentes) e "Revisão por flashcards" (que desceu para o fim da tela e ganhou borda de destaque, classe `.secao-flash`). Antes o card de flashcards ficava no meio dos cards de questão, sem nenhuma pista visual do que era o quê.

### 15.7 — "Revisão Rápida" renomeada para "Flashcards"

Trocado em todo texto voltado ao usuário: item de menu (aluno e conteúdo), título de rota (`ROUTE_TITLES`), cabeçalho da própria tela, cabeçalho do resumo de fim de baralho ("Fim dos flashcards"), botões espalhados pela Home e por Meu Desempenho, e a frase da tela de recursos (landing page). Nomes de função e de rota internos (`iniciarSessaoFlashcards`, rota `flashcards` etc.) não mudaram — só o texto visível.

### 15.8 — Professor e residente restritos a uma grande área

Antes, o cadastro de professor/residente pedia "grandes áreas de atuação" em checkboxes (múltiplas), usadas só para filtrar a fila de dúvidas. Agora o campo é um **select único**, obrigatório, rotulado "Especialidade (grande área) que você atua" — e passou a restringir de verdade o que a pessoa vê e edita, não só a fila de dúvidas:

- `areaRestritaDoUsuario(u)` devolve a área quando `u.papel` é professor/residente, não está em modo aluno, e `u.areasAtuacao` tem exatamente um elemento (cadastros antigos com zero ou várias áreas continuam sem restrição — a migração nunca tranca quem já estava usando).
- **Banco de Questões** (`renderBancoQuestoes`): filtro de área trava na área restrita (select desabilitado, mostrando só o nome); instituições/anos disponíveis nos filtros já vêm calculados só a partir das questões daquela área.
- **Formulário de questão** (`abrirFormularioQuestao`): abrir uma questão de outra área é bloqueado com aviso; o select de grande área vem travado na área do usuário para questão nova.
- **Criar Simulado** (`renderCriarSimulado`/`buscarCandidatasSimulado`): checkbox de área vira uma única linha travada, e a busca de candidatas força aquela área independentemente do que estiver marcado no DOM.
- **Questões Difíceis / Sinalizadas / Sugeridas** (`questoesDificeis`, `questoesSinalizadas`, `questoesSugeridas`) e **Revisar Formatação** (`renderRevisaoFormatacao`): filtradas pela área restrita, com aviso no topo da tela.
- Contas de demonstração: `professor@esc.demo` ficou com Clínica Médica (`area-cm`), `residente@esc.demo` com Cirurgia Geral (`area-cg`), só para a restrição ser visível ao testar.

### 15.9 — Gráfico de pizza de taxa de acerto por confiança

Duas funções novas de gráfico (`graficoPizzaSvg`, genérica, e `graficoPizzaConfiancaSvg`, que monta as fatias certeza/dúvida/chute com a cor já usada nos badges de confiança em toda a plataforma — accent/amber/danger): cada fatia é do tamanho de quantas questões foram respondidas naquele nível, e o texto ao lado traz a taxa de acerto dentro da fatia.

Aparece em dois lugares:
- **Fim de sessão de prática/revisão** (`renderSessaoResumo`), ao lado das três `stat-tile` que já existiam.
- **Resultado de simulado** (`renderResultadoSimulado`) — que **não tinha** captura de confiança nenhuma até agora (o comentário no código dizia explicitamente "sem confiança... só marca e segue"). Para o gráfico fazer sentido aqui também (era pedido explícito do usuário: "incluindo simulados"), simulados passaram a coletar confiança de um jeito **opcional e que não trava a navegação**: depois de marcar uma alternativa, aparecem três botões pequenos (Certeza/Na dúvida/Chute, `selecionarConfiancaSimulado`) — quem não marca nada entra como "na dúvida" ao finalizar (`finalizarSimulado`, que antes gravava sempre `"duvida"` fixo e agora lê `sessao.confiancaSimulado`). O resultado salvo (`db.resultadosSimulados`) ganhou o campo `confiancas`, e reabrir um resultado antigo (`verDetalheResultadoSimulado`) restaura isso — resultados salvos antes desta mudança simplesmente não têm o campo e caem no padrão "na dúvida" para todas as questões. *Limitação conhecida:* em modo aprendizado (explicação aparece assim que responde), não há janela para marcar confiança, porque a resposta já fica "respondida" no instante da escolha — só funciona no fluxo padrão de simulado (sem modo aprendizado).

### 15.10 — Numeração de turma

`db.numerosTurma` (objeto `{anoFaculdade: numero}`), editável em Blocos de Estudo (`definirNumeroTurma`, um campo numérico por ano selecionado) e semeado com `{"3º ano": 92}` — o exemplo dado pelo próprio usuário. `rotuloAnoComTurma(ano)` devolve "3º ano · Turma 92" quando há número, ou só o ano quando não há; usado em Meu Grupo (cabeçalho) e na coluna Turma/Ano da tela Usuários (que também passou a mostrar a área restrita de professor/residente na mesma coluna, já que "Ano" não fazia sentido para eles).

### Como isso foi verificado

Sintaxe validada indiretamente: o arquivo foi servido localmente (script PowerShell fazendo de servidor estático, já que este ambiente não tem Node nem Python utilizáveis) e aberto no navegador — um erro de sintaxe teria impedido a execução de qualquer função, e dezenas foram chamadas com sucesso. Testado via automação de navegador: login como aluno, professor e admin; sessão de flashcards inteira (D-D-A confirmando o pouso sempre em pergunta); as três abas de Simulados; criação de uma lista de estudo como professor (com a busca já travada em Clínica Médica) e sua aparição imediata para o aluno na aba certa; Histórico de Atividade mostrando a criação da lista na linha do tempo do professor; conjunto de questões de prática até o fim, com o gráfico de pizza aparecendo com os três níveis de confiança; simulado completo com confiança marcada opcionalmente e o mesmo gráfico no resultado; tela de cadastro mostrando o select único de especialidade; numeração de turma editável em Blocos de Estudo e refletida em Meu Grupo. Nenhum erro de JavaScript no console em nenhum desses caminhos.

---

## 16. Revisão visual do sistema de design (mesma noite de 19/09, depois da seção 15)

O usuário notou "caixas maiores e menores" em algumas telas e pediu uma revisão visual com base em teoria de design, com aviso antes de qualquer mudança brusca. A resposta foi em duas etapas: primeiro uma auditoria (sem mexer em nada) apresentada ao usuário, depois a correção de tudo que foi encontrado — começando pelo mais estrutural, para as correções pequenas não serem atropeladas pelas grandes.

### 16.1 — Causa raiz do "caixas de tamanhos diferentes": `.card + .card`

A regra `.card + .card{margin-top:1rem}` existe para dar espaço entre cards **empilhados** verticalmente. O problema: esse seletor também valia dentro de um `.grid` (cards lado a lado, ex. `grid-2`), porque ali os cards também são irmãos adjacentes no HTML — então o segundo card de cada linha nascia 16px mais baixo que o primeiro, e por consequência ficava 16px mais baixo de altura total (a régua de altura do CSS Grid conta a partir da margem). Era isto, concretamente, que o usuário via como "uma caixa maior que a outra": em Estudar, por exemplo, "Sessão recomendada" (208px) e "Revisar erros e chutes antigos" (192px) — mesmo os dois sendo `.card` puro com o mesmo conteúdo relativo.

**Correção:** `.grid > .card{margin-top:0}` — mesma especificidade da regra original, mas depois no arquivo, então vence por ordem de declaração e zera a margem só quando o card está dentro de um grid. Fora de grid (cards empilhados normalmente), a margem de 1rem continua funcionando como antes. Nenhuma tela que já estava correta mudou; só as que tinham cards lado a lado desalinhados.

### 16.2 — Escala tipográfica unificada

Levantamento: **58 declarações de `font-size`** espalhadas pelo arquivo (CSS e estilo inline dentro das strings de HTML geradas por JS), somando quase 30 valores diferentes — de `.66rem` a `1.7rem` — sem nenhuma progressão ou lógica entre eles. Vários eram indistinguíveis a olho nu (`.82rem`/`.83rem`/`.85rem`/`.86rem`/`.87rem`/`.88rem`, todos "texto de corpo secundário", mas escritos como 6 números diferentes) — sinal de deriva por copiar-e-colar ao longo de várias sessões de desenvolvimento, não de hierarquia intencional.

**Correção:** 11 tokens novos em `:root` (`--fs-2xs` a `--fs-5xl`, de `.68rem` a `1.7rem`), e as 58 declarações passaram a apontar para o token mais próximo (nenhuma mudou mais que `.03rem` — meio pixel — do valor original; a maioria não mudou nada de fato visível). O efeito: a partir de agora existem só 11 tamanhos de texto possíveis em toda a plataforma, e qualquer ajuste futuro de escala é uma mudança num único lugar (`:root`), não uma caça a números espalhados por 16 mil linhas. As fontes do material impresso (`@media print` e as funções `html*PDF`, que usam `pt` porque são para papel) foram deixadas de fora de propósito — é um sistema de medida diferente, para uma saída diferente.

### 16.3 — Escala de espaçamento para as "caixas"

Mesmo problema, escopo menor: `.card` (1.35rem), `.card-flat`/`.stat-tile` (1rem 1.2rem), `.qcard` (1.75rem), `.modal`/`.hero-card` (1.6rem), `.auth-card` (2rem), `.feedback-box` (1rem 1.1rem) — 6 valores de padding sem relação entre si nos componentes que o usuário chamou de "caixas". Badges, pills, toast e chips pequenos foram deixados de fora de propósito: não eram o alvo da reclamação (caixas de conteúdo, não etiquetas), e mexer neles seria escopo a mais sem necessidade.

**Correção:** 4 tokens novos (`--sp-4` a `--sp-7`, de 1rem a 2rem, múltiplos de 4px) aplicados aos 8 componentes acima. Maior variação: `.qcard` perdeu 4px de padding por lado (1.75rem → 1.5rem); os demais mudaram ainda menos.

### 16.4 — Correções pontuais menores

- **Ícone fora do padrão:** `.secao-revisao-titulo svg` (os ícones de "Revisão de questões"/"Revisão por flashcards", criados na seção 15.6) estava em 15px; o padrão do resto da plataforma é 18px (`svg.icon`). Corrigido para 18px.
- **Raio de borda do "selo" quadrado com a letra E:** parecia inconsistente à primeira vista (8px na barra lateral, 9px na página pública, 10px no ícone de destaque da Home — mesmo tipo de elemento, três raios). Checado com calma: os três já seguiam a mesma proporção (~28% do lado do quadrado, que cresce de 28px → 32px → 38px nesses três lugares) — ou seja, **não era bug**, era arredondamento proporcional correto. Só o ícone de destaque (10px em vez dos 11px que a proporção pede) foi ajustado, por precisão matemática, não por estar visualmente errado.
- **Texto perdido do rename anterior:** a notificação de meta diária ainda dizia "meta de revisão rápida" (sobrou da seção 15.7). Corrigido para "meta de flashcards".

### 16.5 — O que foi encontrado mas **não** foi mexido, de propósito

O contraste de borda das caixas passivas (`.card`/`.stat-tile`) é sutil — fundo branco sobre `--bg` quase branco, borda `--border` também clara — e elas não têm sombra nenhuma. Isso parecia, à primeira vista, um jeito de reforçar a separação visual das caixas (mais um pedido do usuário). Só que investigando o CSS existente, essa ausência de sombra é uma **decisão de projeto já documentada** de uma revisão anterior: "sistema de elevação aplicado só ao que é de fato clicável" — ou seja, sombra em `.card`/`.stat-tile` (que não são clicáveis) quebraria essa regra que já existe e que outra pessoa decidiu de propósito. Como isso é gosto/estilo, não um bug objetivo como os outros, e como o usuário pediu para avisar antes de mudança brusca, esse item ficou de fora desta rodada — fica registrado aqui para uma decisão explícita numa próxima conversa, se for o caso.

### Como isso foi verificado

Servidor local + automação de navegador, como nas seções anteriores. Depois de cada bloco de mudança (tokens de tipografia, tokens de espaçamento, correções pontuais), a plataforma foi recarregada e testada: Início, Estudar (grid-2 de cards agora com a mesma altura, confirmado por medição via `getBoundingClientRect()` antes/depois — 208px em ambos, antes eram 208/192), Revisão (ícone do rótulo de seção no tamanho certo), uma questão inteira em sessão de estudo, Flashcards, e o painel do administrador — nos temas claro e escuro. Nenhum erro de JavaScript no console, nenhuma quebra visual encontrada, nenhum `font-size` ou padding literal restante fora do sistema de tokens (checado por busca no arquivo inteiro).

---

## 17. O que mudou na atualização de 20/09/2026

O usuário pediu quatro coisas: (1) contas de verdade com confirmação de e-mail, sem perder o acesso demo e sem complicar demais; (2) trocar e-mail ou senha nas configurações; (3) trocar ano da faculdade e grupo também nas configurações; (4) garantir que quem usa a plataforma pelo site publicado no GitHub não perca dados a cada atualização. Antes de mexer em código, duas decisões de arquitetura foram confirmadas com o usuário (ver perguntas feitas na conversa): a confirmação de e-mail seria **simulada** (sem integrar um serviço externo de envio, mantendo a filosofia de arquivo único do projeto), e o item 4 seria resolvido mantendo os dados **por navegador** (o que já era o comportamento do `localStorage`), não migrando para um backend compartilhado entre dispositivos.

### 17.1 — Confirmação de e-mail simulada no cadastro

Cadastro (`solicitarCadastro`) passou a gerar um código de 6 dígitos (`gerarCodigoConfirmacao()`) e gravar `emailConfirmado:false` no novo usuário, em vez de mandar direto para a tela de login. Uma rota nova, `confirmar-email` (pública), mostra o código **na própria tela**, com um aviso explícito de que isso é simulado: "Esc não tem servidor de e-mail próprio — numa versão publicada de verdade, este código chegaria na caixa de entrada". A pessoa digita o código, `confirmarCodigoEmail()` confere e marca `emailConfirmado:true`.

- `fazerLogin()` ganhou uma checagem antes do status de aprovação: se `emailConfirmado===false`, a pessoa é mandada de volta para `confirmar-email` (o código continua salvo no usuário, então funciona mesmo se ela tiver fechado a aba antes de confirmar da primeira vez).
- **A confirmação de e-mail é independente da aprovação de cadastro** (que continua existindo, sem mudança): são dois portões separados — primeiro confirma o e-mail (auto-serviço), depois espera um administrador aprovar (como já era).
- **Contas antigas nunca são bloqueadas por isso**: a migração em `loadState()` marca `emailConfirmado:true` para qualquer usuário que já existia e não tinha esse campo — inclusive as seis contas de demonstração e os botões de "ver como…", que continuam entrando sem pedir nada.

### 17.2 — Trocar e-mail e trocar senha no Perfil

Duas caixas de diálogo novas em Perfil, cada uma pedindo a senha atual antes de aceitar a mudança (mesmo padrão de segurança simples, sem novo mecanismo):

- **Trocar e-mail** (`abrirModalTrocarEmail`/`iniciarTrocaEmail`): pede o e-mail novo e a senha atual, confere que o e-mail não está em uso por outra conta, grava `emailPendente` e gera um novo código, e reaproveita a mesma tela `confirmar-email` de cima. Ao confirmar o código, `confirmarCodigoEmail()` aplica `u.email = u.emailPendente` e volta para o Perfil (em vez de ir para o login, porque aqui a pessoa já está logada).
- **Trocar senha** (`abrirModalTrocarSenha`/`salvarNovaSenha`): pede senha atual, nova senha (mínimo 4 caracteres, mesma regra do cadastro) e confirmação da nova senha. Sem passo de e-mail — é local e imediato.

### 17.3 — Trocar ano da faculdade e grupo no Perfil

O ano da faculdade já podia ser trocado no Perfil (`salvarAnoFaculdade`, de uma revisão anterior). O que faltava era um jeito rápido de trocar de grupo sem precisar abrir a tela "Meu Grupo" inteira: agora, se o aluno já é membro de mais de um grupo (o oficial, um que criou, ou um que teve acesso aprovado), o campo "Turma / Grupo" no Perfil vira um `<select>` que troca na hora (reaproveitando `usarGrupo()`, já existente). Criar um grupo novo ou pedir acesso a outro continua exigindo a tela "Meu Grupo" (agora linkada como "criar outro grupo ou pedir acesso a um") — esse fluxo tem aprovação de terceiros no meio e não cabia num select.

### 17.4 — GitHub Pages e persistência de dados

Investigando o histórico do repositório, a causa mais provável de "perda de dados a cada atualização" não é o conteúdo do `index.html` (que já preserva dados do usuário via `sincronizarConteudoNovo()` e as migrações de `loadState()` — nenhuma delas apaga nada) — é o arquivo `CNAME`, que foi criado, atualizado e depois apagado no mesmo dia. Como o `localStorage` é isolado por origem (domínio), cada mudança de domínio faz o navegador "esquecer" os dados salvos na origem anterior. Isso ficou documentado como limitação 4-B na seção 8, com a recomendação de fixar um domínio (customizado ou o padrão do GitHub Pages) e não alterá-lo mais depois que a plataforma estiver em uso real. Nenhuma mudança de código foi necessária para isso — é uma decisão operacional, não um bug.

### Como isso foi verificado

Testado ponta a ponta com automação de navegador (Chromium/Playwright), servindo o arquivo por HTTP local: cadastro de um aluno novo → tela de confirmação mostra o código → login antes de confirmar é bloqueado → confirmação aceita o código certo → login antes da aprovação do admin mostra "aguardando aprovação" (não mais o bloqueio de e-mail) → aprovação pelo admin → login funciona. Na sequência, ainda logado como esse aluno: troca de senha (login antigo passa a falhar, novo funciona), troca de e-mail com o mesmo fluxo de código (volta para o Perfil, não para o login), e login final com e-mail e senha novos. Por fim, confirmado que as contas de demonstração (e-mail/senha e os botões "ver como…") continuam entrando direto, sem nenhuma tela de confirmação. Nenhum erro de JavaScript no console em nenhum desses passos.

---

## 18. Rodada de testes e correção de bugs (20/09/2026, depois da seção 17)

O usuário pediu um reteste da plataforma inteira em busca de bugs e de melhorias. A varredura foi automatizada (Chromium/Playwright) e cobriu: todas as rotas de todos os papéis, os fluxos completos de sessão de prática, flashcards, simulado, criação de lista de estudo, material em PDF, banco de questões com paginação, favoritos, histórico, grupos e o fluxo de sugestão/aprovação de flashcard — além de uma bateria de entradas adversariais (dados propositalmente errados ou no limite). **Nenhum erro de JavaScript apareceu em nenhuma tela ou fluxo.** Quatro defeitos reais foram encontrados por leitura de código e por testes de borda, e todos foram corrigidos.

### 18.1 — Tela em branco ao recarregar na confirmação de e-mail

`renderConfirmarEmail()` chamava `navigate("login")` de dentro de si quando não havia usuário em memória e devolvia `""`. Como quem chama é `app.innerHTML = renderConfirmarEmail()`, o `navigate` desenhava o login e, logo depois, o `innerHTML = ""` apagava tudo: **tela completamente branca**. Isso acontecia num caso banal — a pessoa se cadastra, vê a tela do código e aperta F5 (o `state.confirmarEmailUsuarioId` vive só na memória e some no recarregamento).

**Correção:** o redirecionamento saiu da função de render e virou regra do roteador (`render()`), que decide antes de desenhar: sem usuário para confirmar, quem está logado vai para o Início e quem não está vai para o login. Render não navega mais. Uma varredura no arquivo confirmou que esse era o **único** lugar com esse padrão.

### 18.2 — Matrícula duplicada passava se mudasse só a caixa das letras

O cadastro barrava e-mail repetido ignorando maiúsculas/minúsculas, mas comparava matrícula de forma exata (`u.matricula===matricula`). O login, por outro lado, compara em minúsculas — então "ABC123" e "abc123" podiam virar duas contas que depois disputam o mesmo login, e quem entrasse cairia na primeira encontrada. Agora a checagem do cadastro ignora a caixa, igual à do e-mail e à do login.

### 18.3 — E-mail pendente de troca não bloqueava outro cadastro

A troca de e-mail (seção 17.2) guarda o endereço novo em `emailPendente` até a confirmação. As checagens de duplicidade só olhavam `u.email`, então um endereço já reservado por alguém podia ser cadastrado por outra pessoa no meio do caminho — e as duas contas terminariam com o mesmo e-mail. Uma função só (`emailJaEmUso(email, ignorarUsuarioId)`) passou a valer para os dois lugares (cadastro e troca de e-mail) e considera também os pendentes. Com isso a reserva é garantida no momento do pedido, e não precisa de verificação extra na hora de confirmar.

### 18.4 — Trocar de grupo não checava se a pessoa é membro

`usarGrupo()` trocava o calendário da pessoa para qualquer grupo, confiando apenas em quem desenhava o botão. A tela "Meu Grupo" só oferecia grupos dos quais a pessoa é membro, mas isso é exatamente o que o projeto já decidiu não fazer em outro lugar ("as checagens de permissão ficam nas próprias funções, não só nos botões" — ver `podeMexerNoCartao`, seção 5) — e agora existe um segundo caminho para a mesma função (o seletor de grupo no Perfil, seção 17.3). A regra virou uma função só, `souMembroDoGrupo(g, u)` (oficial, criado por você, ou acesso aprovado pelo dono), usada nos três lugares que repetiam esse teste e **dentro** do `usarGrupo()`, que agora recusa e explica. Continua funcionando normalmente o grupo oficial, o que a pessoa criou e o que ela teve acesso aprovado.

### 18.5 — Desempenho medido com o banco real

Tempo de desenho de cada tela com as 635 questões e 501 cartões carregados: a mais lenta é Especialidades e Assuntos, com **65 ms** (são 216 assuntos numa árvore só); montar a sessão recomendada leva 34 ms; todas as demais ficam **abaixo de 15 ms**. O banco ocupa ~1.234 KB no `localStorage`, bem abaixo do limite típico do navegador (5-10 MB) — mas é o número que cresce rápido se as questões ganharem imagens embutidas, e por isso Configurações avisa a partir de 3,5 MB.

### 18.6 — O que foi encontrado mas **não** foi mexido, de propósito

Acessibilidade: os rótulos de formulário (`<label class="label">`) não têm `for` apontando para o campo, e alguns botões só de ícone não têm nome acessível (`aria-label`/`title`). Nada disso quebra o uso no mouse ou no toque, mas significa que um leitor de tela não anuncia o nome de vários campos e botões. A correção é mecânica (ligar cada rótulo ao seu campo e dar nome aos botões de ícone), porém toca dezenas de trechos espalhados pelo arquivo e não era o pedido desta rodada — fica registrado aqui para uma decisão explícita, no mesmo espírito da seção 16.5. O contraste de cores, vale lembrar, já foi corrigido na revisão da seção 12 e está dentro da WCAG AA.

### Como isso foi verificado

Além da varredura de rotas e fluxos descrita acima (repetida depois das correções, sem nenhum erro de JavaScript), cada correção ganhou um teste próprio: recarregamento real na rota de confirmação (cai no login, tela cheia); cadastro tentando repetir matrícula em outra caixa (barrado); e-mail pendente de uma conta bloqueando cadastro e troca de terceiros, sem bloquear o próprio dono; e troca de grupo recusada num grupo alheio, permitida no oficial e no próprio, e permitida no antes-negado depois que o dono aprova o acesso.
