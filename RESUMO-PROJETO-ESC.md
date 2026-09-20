# Esc — plataforma de estudos para residência médica
## Resumo do projeto (setembro de 2026)

Este documento existe para que uma nova conversa com o Claude comece sabendo tudo o que já foi decidido e construído. Anexe-o junto com o arquivo `esc.html`.

> **Estado atual, em uma frase:** plataforma completa (estudo, revisão espaçada, flashcards, simulados, desempenho, PDF, controle de qualidade, upload de prova em .docx e memória entre aparelhos) com **635 questões** — das quais **500 reais da UNIFESP-EPM** (2022 a 2026, com explicação autoral) — e taxonomia de **216 assuntos** em **39 especialidades**. O histórico de como se chegou até aqui está na seção 12; o que falta fazer está na seção 10.

---

## 1. O que é

`esc.html` é uma plataforma de estudos para prova de residência médica, escrita como **um único arquivo HTML autossuficiente**: sem instalação, sem servidor, sem build, sem dependência de internet (só as fontes do Google são externas, e são opcionais). Abre com dois cliques no navegador.

- **Tamanho atual:** ~1,7 MB, ~16.770 linhas (a maior parte é o banco de 635 questões e os 501 flashcards, em `SEED_QUESTOES` e `SEED_FLASHCARDS`).
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

**Aluno** — estudar (com a meta do dia), revisar, revisão rápida por flashcards, **Simulados e Provas** (as duas abas), favoritos, histórico, desempenho, meu grupo, enviar questões.

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

### Simulados e Provas (uma opção de menu, duas abas)
Antes eram duas linhas de menu — "Simulados" e "Provas Antigas". Viraram uma opção só, porque o aluno chega às duas com a mesma pergunta na cabeça ("quero fazer uma prova inteira agora") e trocava de ideia no meio do caminho entre a prova que o professor montou e a prova de 2024 da banca. A rota antiga `/provas-antigas` continua respondendo e abre direto na segunda aba.

- **Aba 1 — Simulados:** os montados por professores, com recomendação por bloco e o histórico das próprias tentativas.
- **Aba 2 — Provas antigas:** o arquivo por instituição e ano, com os filtros de sempre (instituição, ano, grande área, últimos 5 anos); cada prova vira simulado cronometrado ou prática sem relógio.
- Simulado personalizado a partir dos filtros continua saindo da tela Estudar.
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

## 4-B. Upload de prova em arquivo (.docx)

Antes só dava para **colar** o texto formatado (ou abrir um `.txt`). Mas o caminho real de quem monta prova é outro: pede-se o script para uma IA, a resposta vai parar num documento do Word, e é esse documento que a pessoa tem na mão. Agora ela envia o documento direto, no Passo 3 da tela Importar/Enviar Questões.

- Aceita `.docx`, `.txt`, `.md` e `.csv`, **um ou vários arquivos de uma vez** (cada arquivo pode trazer o próprio cabeçalho `INSTITUICAO`/`ANO`, e cada cabeçalho vale até o próximo).
- **O arquivo é só o transporte.** O conteúdo tem de seguir o script do Passo 2 (`PERGUNTA:`, `A:`… `GABARITO:`, `EXPLICACAO:`…, separados por uma linha com `===`). Enviar o PDF ou o Word original da banca não funciona, e a tela diz isso em vez de falhar em silêncio: se o arquivo abrir mas não tiver nenhuma linha `PERGUNTA:`, aparece um aviso explicando o caminho certo, com o prompt do Passo 2 a um clique.
- Há um botão **Baixar modelo**, que gera um `.txt` com uma questão inteira preenchida, para quem prefere escrever a prova à mão.
- Depois de ler o arquivo, a pré-visualização abre sozinha.
- `.doc` antigo (Word 97-2003) **não** é lido — a mensagem pede para salvar como `.docx`.

**Como o `.docx` é lido sem nenhuma biblioteca externa** (a regra do projeto continua valendo: arquivo único, sem dependência): um `.docx` é um ZIP, e o texto está em `word/document.xml`. O ZIP é aberto na mão (`extrairDoZip`), lendo a tabela central que fica no fim do arquivo, e a descompressão é feita pelo próprio navegador, com `DecompressionStream("deflate-raw")` — API nativa de Chrome, Edge, Firefox e Safari atuais. Do XML interessam três coisas: `</w:p>` vira quebra de linha, `<w:br/>` também, `<w:tab/>` vira tabulação; o resto da marcação é descartado (`xmlDoWordParaTexto`). Depois `normalizarTextoDeProva` tira o que o Word costuma deixar no caminho: espaço que não quebra, caracteres invisíveis, linha de `=` de tamanho variado, parágrafo vazio.

## 4-C. Memória entre aparelhos

O problema, na frase do usuário: *"faço cadastro em um lugar, mas ele não fica salvo quando entro por outro dispositivo"*. A causa é a limitação 1 da seção 8: o `localStorage` é do **navegador**, não da pessoa — o site publicado no GitHub Pages é o mesmo, mas cada aparelho guarda a própria cópia. Sem servidor, um aparelho não sabe que o outro existe.

Foram feitas três camadas, da mais simples à mais completa, **sem sistema de senha novo** e sem dependência externa (tudo com `fetch` puro):

**1. Sessão lembrada (automática, já vale).** Antes, fechar o navegador deslogava — `state.usuarioAtualId` só existia em memória. Agora quem entrou continua entrado no mesmo aparelho até clicar em Sair (`esc_sessao_v1`). Os botões de "ver como…" continuam sendo só uma espiada: não deixam sessão gravada. Cadastro pendente, recusado ou inativo não volta sozinho.

**2. Conta portátil (manual, funciona sempre, inclusive sem internet).** Em *Perfil › Usar em outro aparelho*, a pessoa gera um arquivo (ou um código de texto, quando ele é pequeno o bastante para copiar) com **só o que é dela**: cadastro, respostas, revisões, favoritos, seus cartões, seus simulados e o que ela criou. No aparelho novo, a tela de entrada tem "Trazer minha conta para este aparelho", que recebe o arquivo, **soma** aos dados de lá e já entra. Num teste real, um cadastro com duas respostas, um favorito e duas revisões ocupou 2 KB.

**3. Nuvem da turma (opcional, ligada uma vez pela coordenação).** Em *Configurações*, o administrador máster informa um endereço de sincronização e liga. A partir daí todos os aparelhos **somam** os dados entre si sozinhos — ao abrir a plataforma e a cada `CONFIG.intervaloSincronizacaoMin` minutos (5) —, e o cadastro feito no computador da faculdade passa a existir no celular. Dois modos, os dois por REST:
  - **Supabase** (recomendado, gratuito nesse volume): a tela traz o passo a passo e o SQL da tabela para copiar.
  - **Endereço genérico** que aceite `GET` e `PUT` de JSON.

  A configuração fica no `localStorage` do aparelho (`esc_nuvem_v1`), e não no banco, porque ela precisa existir **antes** de haver qualquer dado — é ela que diz de onde os dados vêm. Num aparelho novo ela chega pelo **link de convite**, que a coordenação copia com um botão e manda para a turma: quem abre o link já entra conectado, e depois entra normalmente com o próprio e-mail e senha.

**O que viaja pela rede é pequeno.** O banco inteiro tem ~1,2 MB porque carrega as 635 questões e os 501 flashcards que já estão escritos no próprio arquivo. O pacote enviado (`bancoParaSincronizar`) tira tudo o que for **idêntico à semente** e leva só o que foi produzido — medido em teste: **6 KB** contra 1.232 KB. Do outro lado, `sincronizarConteudoNovo()` repõe as sementes que faltarem. Semente que alguém editou deixa de ser idêntica e viaja normalmente.

**Regra de ouro da mesclagem (`mesclarBancos`): sincronizar SOMA, não substitui.**
  - Registro que existe de um lado e não do outro é acrescentado.
  - Diários que só crescem (respostas, sessões, resultados de simulado, feedbacks) são unidos por id, nunca reescritos.
  - Repetição espaçada (questões e cartões) fica com a revisão **mais recente** de cada item — jogar fora a mais nova faria a questão voltar cedo demais.
  - Quando o mesmo registro de conteúdo existe dos dois lados e está diferente, vale o do banco **salvo por último** (`db.atualizadoEm`, carimbado em todo `saveState`).
  - Exclusões ficam anotadas em `db.excluidos`, para que a sincronização não ressuscite o que alguém apagou de propósito (questão, especialidade, assunto).

### Material em PDF (professores, coordenação, moderadores)
Quatro tipos, gerados sem biblioteca externa (monta em `#areaImpressao` e chama `window.print()`, onde existe "Salvar como PDF"):

1. **Prova para aplicar** — com cartão-resposta e folha de gabarito em páginas separadas.
2. **Lista de exercícios comentada** — gabarito, explicação e referências junto de cada questão.
3. **Baralho de flashcards para recortar** — **só material da equipe**; o caderno pessoal dos alunos nunca entra.
4. **Relatório de desempenho da turma** — uma linha por aluno.

### Conteúdo e qualidade
- **Banco de questões** com CRUD completo; questões aceitam **imagem** e campo de **referências**.
- **Importar/Enviar questões**: aberto a aluno, residente, professor e admin, com destino conforme o papel. Dois modos de prompt: prova inteira e questões avulsas. O texto formatado pode ser **colado ou enviado como arquivo** — documento do Word (`.docx`), `.txt`, `.md` ou `.csv`, vários de uma vez —, desde que o conteúdo siga o script do Passo 2 (ver seção 4-B).
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

Ordem do aluno: Início · Estudar · Meu Desempenho · Meu Grupo · Revisão · Revisão Rápida · Simulados e Provas · Histórico de Atividade · Favoritos · Enviar Questões.

Ordem do conteúdo: Início · Banco de Questões · Importar Questões · Questões Difíceis · Criar Simulado · Material em PDF · Flashcards · Simulados e Provas · Revisar Formatação · Especialidades e Assuntos.

**Simulados e Provas Antigas viraram uma linha só.** Eram duas opções que respondiam à mesma intenção ("fazer uma prova inteira agora"), e escolher entre elas obrigava a sair de uma tela e procurar a outra. Agora é uma opção com duas abas — Simulados e Provas antigas —, cada aba com a contagem do que tem dentro, e cada uma com um atalho para a outra nos estados vazios. O menu do aluno encurtou em uma linha, que é exatamente o que ele ganha de espaço no celular.

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
3. Persistência (`dbPadrao`, `loadState`, `saveState`, migrações, `sincronizarConteudoNovo`) e **2-B — memória entre aparelhos** (sessão lembrada, conta portátil, mesclagem, nuvem da turma)
4. Utilidades (datas, **gráficos SVG**, modal, toast)
5. Motor de estudos (dificuldade, repetição espaçada, mistura, filtros, **desempenho por dia/mês/janela**, calibração, tempo, motor de flashcards)
6. Autenticação e permissões
7. Roteador, gesto de arrastar e estrutura visual
8 em diante. Uma seção por tela — entre elas **12-B (Revisão Rápida)**, **13 (Simulados e Provas, com as duas abas)**, **17 (Meu Desempenho)**, **18 (Meta de Estudo)**, **19-B (Conta em outro aparelho e sincronização)**, **20-B (Material em PDF)** e **26-B (upload de prova em .docx)**

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

**Funções-chave acrescentadas nesta rodada (20/09):**

| Função | O que faz |
|---|---|
| `renderSimuladosEProvas()` / `mudarAbaProvas(aba)` | a tela única com as duas abas; `renderAbaSimulados()` e `renderAbaProvasAntigas()` são os corpos de cada uma |
| `lerArquivoDeProva(arquivo)` | abre `.docx`, `.txt`, `.md` ou `.csv` e devolve o texto pronto para o importador |
| `extrairDoZip(buffer, caminho)` | lê um arquivo de dentro de um ZIP (é assim que o `.docx` é aberto, sem biblioteca) |
| `xmlDoWordParaTexto(xml)` / `normalizarTextoDeProva(t)` | tiram do XML do Word o texto com as quebras de linha certas, e limpam as sujeirinhas que ele deixa |
| `contarQuestoesNoTexto(t)` | quantas questões no formato do script existem ali — é o que dispara o aviso de "arquivo fora do formato" |
| `lembrarSessao(id)` / `restaurarSessaoLembrada()` / `esquecerSessao()` | a sessão que sobrevive a fechar o navegador |
| `mesclarBancos(base, entrando)` | a mesclagem que soma dois bancos; serve tanto à conta portátil quanto à nuvem |
| `anotarExclusao(id)` | marca um id como apagado de propósito, para a sincronização não trazê-lo de volta |
| `bancoParaSincronizar()` / `indiceSementes()` | montam o pacote pequeno que viaja (tudo menos o que é idêntico à semente) |
| `pacoteDaConta(id)` / `aplicarPacoteDeConta(texto)` | geram e recebem a conta portátil de uma pessoa |
| `sincronizarComNuvem({silencioso})` / `sincronizarEmSegundoPlano()` | a conversa com a nuvem da turma (baixa, soma, envia) |
| `configNuvem()` / `linkDeConviteNuvem()` / `aplicarConviteDaUrl()` | a configuração da nuvem e o link que a leva para outro aparelho |

**Manutenção:** `sincronizarConteudoNovo()` acrescenta ao banco salvo qualquer área, especialidade, assunto, questão, flashcard, usuário-semente ou livro de ouro que exista no código e ainda não exista nos dados, comparando por `id`. Nada é sobrescrito nem apagado.

**Migrações em `loadState`:** criação de `db.excluidos` (lista de exclusões) e `db.atualizadoEm` (carimbo de gravação), os dois da sincronização; criação de `db.flashcards` e `db.revisoesFlashcards`; normalização de `usuarioId` nos cartões antigos (todos viram "da equipe", que é o correto — foram escritos por professores); conversão de `anoFaculdade: "Internato"` para `"6º ano"`; criação de `db.sessoesEmAndamento`, `db.diasCartoes` e `db.configGeral.metaCartoesDia`; e a migração dos blocos (abaixo).

**Migração dos blocos para sequências por ano.** `db.sequenciasAno` passa a guardar a ordem de blocos de cada ano, e o grupo guarda só `anoFaculdade` + `deslocamento`. Nada é apagado: o calendário que a coordenação tinha customizado vira a sequência do ano padrão, o calendário próprio de uma turma vira a sequência do ano dela se aquele ano ainda não tiver uma, e o que sobrar fica guardado em `grupo.blocosArquivados` — continua no banco e no backup, para consulta antes de descartar.

---

## 8. Limitações conhecidas

1. **Dados locais — agora com três saídas, mas ainda sem back-end.** Tudo continua vivendo no `localStorage` de cada navegador. A seção 4-C resolve o caso prático (cadastro que não segue a pessoa para outro aparelho) com sessão lembrada, conta portátil e nuvem da turma, mas nada disso é um back-end de verdade, e as limitações que sobram são reais:
   - **A nuvem da turma não tem senha própria.** A sala é compartilhada e quem tiver o link de convite alcança os dados da turma — inclusive os cadastros. É o suficiente para uma turma fechada e é o preço de não ter servidor; o passo seguinte é autenticação real no Supabase (ver seção 10).
   - **Ela é opcional e precisa ser ligada uma vez** pela coordenação, com um projeto Supabase (ou outro endereço). Sem isso, valem só as duas primeiras camadas.
   - **A mesclagem soma.** Conflito no mesmo registro é resolvido pela data da última gravação, o que é grosseiro: se a mesma questão for editada em dois aparelhos, a edição do que salvou antes se perde. Exclusões de questão, especialidade e assunto têm rastro (`db.excluidos`) e não voltam; **desfavoritar** não tem, então um favorito retirado num aparelho pode voltar do outro.
   - **Sem conexão, a plataforma segue funcionando** normalmente e sincroniza na próxima vez que abrir.
2. **Banco cobre uma só banca.** As 500 questões reais são todas da UNIFESP-EPM. As outras 5 bancas de referência (`CONFIG.instituicoesReferencia`) ainda não têm nenhuma questão real — só entram se o usuário conseguir os PDFs oficiais, pelo mesmo processo já usado para a UNIFESP (seção 12). *(Em volume puro o banco já foi testado sintético em mais de 6.000 questões e 8.000 respostas, sem travamento perceptível em nenhuma tela — não é mais o gargalo.)*
3. **Flashcards da equipe cobrem só metade da taxonomia.** Os 501 cartões foram escritos para os 91 assuntos que existiam antes da carga das provas reais; os 125 assuntos novos (Psiquiatria e as demais especialidades abertas na seção 12) ainda não têm cartão de equipe dedicado. Os cartões gerados automaticamente a partir de erros e os escritos pelos próprios alunos cobrem esse buraco por enquanto, mas dependem de uso.
4. **Autenticação é de demonstração**: senha em texto claro no arquivo. Não serve para uso público real — e isso não mudou com a sincronização: ela transporta os mesmos cadastros, do mesmo jeito.
5. **Backup manual e restrito.** Só o administrador máster exporta — se ele não exportar, ninguém exporta. Configurações avisa quando passa de ~3,5 MB e quando o último backup tem mais de 7 dias.
6. **Cartão pessoal é privado, não é segredo.** O isolamento é por papel na interface e nas funções; qualquer pessoa com acesso ao mesmo navegador e ao console enxerga tudo, como em qualquer dado do `localStorage`.
7. **Uma sequência de blocos por ano, e só uma.** Duas turmas do mesmo ano não podem ter ordens diferentes de matéria — por decisão de projeto, elas diferem só pelo ponto de entrada. Se um dia for preciso que uma turma tenha uma sequência realmente distinta, será um campo novo (`grupo.sequenciaPropria`) e mais uma migração.
8. **`somarDias()` usa `toISOString()`** depois de montar a data em horário local: certo para fusos negativos (Brasil), quebraria a data em fusos positivos (UTC+). Sem efeito para o público atual.
9. **O upload de prova lê o formato, não a prova.** O `.docx` é aberto de verdade, mas o conteúdo dele precisa estar no script do Passo 2. Enviar o PDF ou o Word original da banca não funciona e nem deveria: ali não existe gabarito marcado nem explicação, e a plataforma não inventa nenhum dos dois. Também não são lidos: `.doc` antigo (Word 97-2003), imagens dentro do documento (a questão continua recebendo imagem por URL) e tabelas — o texto de uma tabela sai em linhas soltas.

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
6. **Autenticação de verdade no Supabase**, agora que a sincronização já existe (seção 4-C). O caminho ficou mais curto do que era: os dados já sabem viajar e já sabem se mesclar; o que falta é cada pessoa ter login próprio no serviço, em vez de uma sala compartilhada por link, e senha guardada com hash em vez de texto claro. É o passo certo no dia em que a plataforma sair de uma turma fechada.

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

## 12. Histórico de revisões

Registro resumido de cada rodada de trabalho, da mais antiga à mais recente. Detalhe de implementação (nomes de função, migração, tabela de tempo) que já vale como referência permanente está nas seções 6 e 7, não aqui — esta seção é só o "o que mudou e por quê" de cada rodada.

**Revisão geral (manhã de 19/09/2026).** Cinco defeitos corrigidos: a repetição espaçada de questões não usava a escada de intervalos configurada (`CONFIG.intervalosBase`); `calcularDificuldade()` recalculava a prevalência de todos os assuntos a cada questão dentro de um `.sort()`, um gargalo que só aparece com banco grande; contraste abaixo do padrão de acessibilidade (WCAG AA) em dois tons do tema claro; afordância de "clicável" sobrava nas alternativas depois de já ter respondido; um comentário `/* */` mal fechado engolia um bloco de documentação. Além disso: polimento visual (sombras, transições, `prefers-reduced-motion`), paginação de todas as listas longas, meta diária de flashcards com sequência de dias, eliminar alternativas durante a resolução da questão, blocos de estudo organizados por ano da faculdade com rodízio real entre turmas, e sessão de estudo retomável (sair e voltar mantém a mesma fila). Verificado com Chromium/Playwright em todos os papéis e rotas.

**Ajuste de política de conteúdo e expansão de recursos (noite de 19/09/2026).** Esclarecido que enunciado/alternativas/gabarito oficial de prova de instituição pública são domínio público (podem ser transcritos integralmente) e que só a explicação precisa ser sempre autoral — refletido no prompt de importação e no formulário de questão. A partir daí: baralho da equipe ampliado de 24 para 501 flashcards, cobrindo os 91 assuntos que existiam até então; lembrete de meta diária via Notification API do navegador; flashcards ganharam suporte a imagem (mesmo padrão já usado nas questões); fluxo de promoção de cartão pessoal para o baralho da equipe, com aprovação de professor/coordenação; estatística de alternativas eliminadas por quem errou, agregada por questão em Controle de Qualidade. O banco também foi testado sintético em mais de 6.000 questões e 8.000 respostas, o que revelou dois novos gargalos do mesmo tipo do já corrigido pela manhã (uma função revarrendo o banco inteiro a cada chamada, dentro de um laço) — ambos corrigidos com índices cacheados por geração do banco, derrubando o tempo de operações como colar uma prova de 100 questões de 6,8s para 106ms.

**Carga das 500 questões reais da UNIFESP-EPM, 2022-2026 (madrugada seguinte).** O usuário forneceu os PDFs das provas de Acesso Direto/R1 dos últimos cinco anos. Conteúdo de prova pública (enunciado, alternativas, gabarito oficial) extraído por scripts Node.js reutilizáveis (`provas/parse_gabarito.js`, `provas/parse_questoes.js`, a partir de texto gerado com `pdftotext`), com duas armadilhas de parsing corrigidas (caractere de quebra de página inserido pelo PDF; a última questão de cada prova absorvendo a folha de gabarito em branco). Achado relevante: a prova real usa só 4 alternativas (A-D), não 5 — formulário e importador ajustados para tornar a alternativa E opcional. Para cada uma das 500 questões foi escrita uma explicação **100% autoral** (nunca a partir da resolução do cursinho de origem do PDF), com referência citada e dificuldade estimada, combinada ao conteúdo da prova por um script de merge (`provas/merge_year.js`) que também classificou cada questão num assunto da taxonomia. A taxonomia foi ampliada de 91 para 216 assuntos (24 para 39 especialidades) em 5 levas, para dar lugar a especialidades que a prova real cobre e a plataforma didática não tinha — Psiquiatria inteira, criada do zero, entre elas. Validado com checagem de sintaxe, IDs únicos, integridade completa da taxonomia, completude estrutural das 500 questões e testes funcionais via Chromium/Playwright (contagem por ano e por anuladas batendo com o gabarito oficial, resposta correta sendo pontuada como `correta: true`, zero erros de JavaScript). Ficou de fora, de propósito: qualquer leitura da resolução do cursinho de origem como fonte de explicação, e as imagens/figuras que algumas questões referenciam no enunciado (a explicação descreve o achado esperado pelo texto, sem a imagem original anexada).

**Upload de prova em arquivo, memória entre aparelhos e fusão de Simulados com Provas Antigas (20/09/2026).** Três pedidos do usuário, em uma rodada.

*Upload de prova (seção 4-B).* O Passo 3 da tela de importação passou a aceitar **arquivo**, e não só texto colado: documento do Word (`.docx`), `.txt`, `.md` e `.csv`, vários de uma vez, com o conteúdo no script do Passo 2. O `.docx` é lido sem nenhuma biblioteca — ZIP aberto na mão mais `DecompressionStream` do próprio navegador —, o que mantém a regra do arquivo único sem dependência. Quem manda um arquivo fora do formato recebe um aviso que explica o caminho certo, em vez de uma lista de erros; e há um modelo para baixar, para quem prefere escrever a prova à mão. De quebra, o leitor do texto passou a aceitar **mais de um cabeçalho** `INSTITUICAO`/`ANO` no mesmo lote, que é o que acontece quando se enviam dois arquivos de uma vez.

*Memória entre aparelhos (seção 4-C).* O relato era "faço cadastro em um lugar e ele não está lá quando entro por outro dispositivo". Duas coisas diferentes estavam juntas nisso, e as duas foram resolvidas: a sessão não sobrevivia nem a fechar o navegador (agora sobrevive, até clicar em Sair), e nada atravessava de um aparelho para o outro (agora atravessa, por conta portátil em arquivo, ou sozinho, pela nuvem da turma que a coordenação liga uma vez e distribui por um link de convite). O pedido era explícito em não querer sistema de senha complicado, e não tem: continua o mesmo e-mail e a mesma senha de antes. O que viaja é um pacote reduzido, sem as sementes — 6 KB medidos, contra 1,2 MB do banco inteiro —, e a mesclagem soma em vez de substituir, com rastro de exclusão para não ressuscitar o que foi apagado.

*Simulados e Provas Antigas (seção 5).* Duas linhas de menu que respondiam à mesma intenção viraram uma, com duas abas e contagem em cada uma. A rota `/provas-antigas` continua respondendo e abre direto na aba certa, pela mesma regra que já valia para `/metas`: link salvo por aluno não pode quebrar.

Verificado com Chromium/Playwright: as 26 rotas nos quatro papéis sem erro de JavaScript; upload de `.docx` comprimido e não comprimido, com acentos, entidades XML e quebra de linha dentro do campo, chegando ao banco como questão de 4 alternativas; conta portátil levando cadastro, respostas, favoritos e revisões para um navegador limpo; e sincronização nos dois modos (Supabase e endereço genérico) contra um servidor de teste, nos dois sentidos, com exclusão respeitada e sementes preservadas.
