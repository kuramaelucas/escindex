# Esc — plataforma de estudos para residência médica
## Resumo do projeto (setembro de 2026)

Este documento existe para que uma nova conversa com o Claude comece sabendo tudo o que já foi decidido e construído. Anexe-o junto com o `index.html` (o código) e, se a conversa for sobre conteúdo, com o arquivo da pasta `dados/` que interessa.

> **Estado atual, em uma frase:** plataforma completa (estudo, revisão espaçada, flashcards, simulados, desempenho, PDF, controle de qualidade, upload de provas em lotes) com **635 questões** — das quais **500 reais da UNIFESP-EPM** (2022 a 2026, com explicação autoral) —, taxonomia de **216 assuntos** em **39 especialidades**, **conta de verdade e sincronização entre aparelhos pela nuvem** (Supabase, seção 4-B) e o conteúdo separado do código, na pasta `dados/`. O histórico de como se chegou até aqui está na seção 12; o que falta fazer está na seção 10.

---

## 1. O que é

O Esc é uma plataforma de estudos para prova de residência médica **de arquivo aberto**: sem instalação, sem servidor, sem build. São duas peças que andam juntas:

- **`index.html`** — o CÓDIGO: telas, regras, algoritmos e configuração. ~640 KB, ~9.700 linhas.
- **pasta `dados/`** — o CONTEÚDO: um arquivo por prova, mais o banco didático e os flashcards da equipe. Sete arquivos, ~1,2 MB no total. Ver `dados/LEIA-ME.md`.

Abrir o `index.html` com dois cliques continua bastando — a única regra é manter a pasta `dados/` ao lado dele (e publicá-la junto, quando o site está no ar). Se ela faltar, a plataforma abre e avisa numa tarja no alto da tela em vez de parecer quebrada.

A separação foi feita porque, com as 635 questões e os 501 cartões dentro do HTML, eram 1,8 MB e ~17.400 linhas: qualquer leitura — de uma pessoa ou de uma IA — gastava quase todo o fôlego atravessando conteúdo para chegar ao código.

- **Dados:** por padrão tudo fica no `localStorage` do navegador, sob a chave `medbloco_db_v1` (o nome antigo foi mantido de propósito, para não apagar os dados de quem já usava quando o app foi renomeado). Com a **nuvem ligada** (seção 4-B), o estudo de cada pessoa também sobe para o Supabase e desce em qualquer aparelho.
- **Pasta `nuvem/`** — o esquema do banco (`esquema.sql`) e o passo a passo para ligar ou desligar a nuvem (`LEIA-ME.md`). É documentação: não faz falta no ar.
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

**Residente** — fila de dúvidas, questões difíceis, revisar formatação, enviar provas e questões, Central de Provas, provas antigas.

**Professor** — todo o conteúdo: banco de questões, importar, Central de Provas, controle de qualidade, criar simulado, material em PDF, flashcards da equipe, especialidades e assuntos, revisar formatação.

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

### Simulados
- Simulados criados por professores, prova antiga inteira como simulado, ou simulado personalizado a partir dos filtros.
- **Cronômetro** com encerramento automático no fim do tempo, **tempo gasto por questão**, modo aprendizado (mostra explicação na hora), mapa de questões clicável.
- **A barra de números durante a prova diz só uma coisa: respondida ou em branco.** Nunca certa ou errada — o acerto só aparece no resultado, depois de acabar (ver seção 5).
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

### Central de Provas (professores, coordenação, moderadores e residentes)
Sobe uma prova inteira **em pedaços**, pela própria plataforma. Cada prova vira uma "carga" com o total de questões declarado, cortada automaticamente em **lotes** (faixas: 1–25, 26–50…). Cada lote traz:

1. um **modelo de construção pronto** — o prompt já com a instituição, o ano e a faixa daquele lote escritos dentro, para copiar e colar numa conversa de IA;
2. um espaço para **colar de volta** (ou subir um arquivo `.txt`), **conferir** e guardar — conferir não publica nada;
3. a **publicação no banco**, lote a lote ou tudo de uma vez.

Como os lotes são independentes, dá para tocar **duas ou mais frentes ao mesmo tempo** — inclusive de provas diferentes: o painel mostra todas as cargas abertas com o que falta em cada uma, e cada lote tem um campo *quem está fazendo* ("conversa 1", "conversa 2", um nome) para separar as frentes.

A conferência é o coração da tela: cada questão traz a linha `NUMERO:` (o número dela na prova original), e com isso o lote é validado contra a faixa pedida — **quantas chegaram, quais faltam, quais vieram repetidas, quais caíram fora da faixa**. Publicada, a questão guarda esse número em `numeroNaProva`, e a carga passa a conferir o que está no banco de verdade ("faltam os números 3, 17–20") em vez de confiar no que a tela achou que mandou.

Depois de publicada, a prova aparece sozinha em **Provas Antigas** (que agrupa por instituição + ano) e pode ser feita como simulado. O texto colado é descartado na publicação, para a prova não ocupar espaço duas vezes no `localStorage`.

### Conteúdo e qualidade
- **Banco de questões** com CRUD completo; questões aceitam **imagem** e campo de **referências**.
- **Importar/Enviar questões**: aberto a aluno, residente, professor e admin, com destino conforme o papel. Dois modos de prompt: prova inteira e questões avulsas. É o caminho certo para questões avulsas e provas pequenas; prova inteira de 60 ou 100 questões vai pela Central de Provas.
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

## 4-B. Conta e nuvem (estudo em vários aparelhos)

Até esta versão, tudo vivia no `localStorage` de um navegador só: quem estudava no notebook não continuava de onde parou no celular. A nuvem resolve isso **sem tirar nada de lugar** — o `localStorage` continua sendo a fonte de verdade da tela; a nuvem é uma cópia que sobe e desce por trás.

**Como liga.** Dois valores em `CONFIG.nuvem` (`url` e `chaveAnon`), no `index.html`. Vazios, a plataforma se comporta exatamente como sempre se comportou, só com aquele navegador — nenhum código de nuvem roda. O passo a passo completo está em `nuvem/LEIA-ME.md`, e o banco inteiro (tabelas, índices, RLS, gatilhos) em `nuvem/esquema.sql`.

**Onde mora.** Supabase (PostgreSQL + autenticação + PostgREST). Escolhido por ser o backend que mapeia quase direto para o objeto `db` e por não exigir escrever servidor nenhum: o app conversa por `fetch` com a API REST, sem SDK, sem dependência nova.

**O que sobe** (dez tabelas, ver `NUVEM_TABELAS` no código): perfil, respostas, repetição espaçada de questões e de cartões, dias com cartão revisado, favoritos, cartões pessoais, sessões concluídas, notas de simulado e a fila em andamento.

**O que NÃO sobe:** o conteúdo. Questões e flashcards da equipe são iguais para todo mundo e continuam vindo da pasta `dados/` — não faz sentido guardar uma cópia por aluno. Continuam locais também: comentários nas questões, feedbacks, Livro de Ouro, calendário de blocos, turmas e as cargas da Central de Provas (ver limitação 10).

**Conflito entre dois aparelhos.** Registros (respostas, sessões, notas) nunca se sobrescrevem, só se juntam — responder no celular e no computador resulta nas duas respostas. Estado (repetição espaçada, favoritos, metas, cartões pessoais) vale a versão mais recente, guardado **questão a questão**, e não num bloco único, para que uma divergência afete um item e nunca o histórico inteiro.

**Sem internet não para.** Cada gravação entra numa fila (`db.filaNuvem`) guardada no navegador e sobe em bloco poucos segundos depois, ao voltar a conexão ou ao voltar para a aba. O que desce usa uma **marca d'água por tabela** (`db.nuvem.marcas`), com o horário **do servidor** — relógio adiantado num celular pularia registros. Sair da conta com fila pendente pergunta antes: sincronizar e sair, ou sair mesmo assim (a fila fica guardada e sobe no próximo acesso daquele aparelho).

**Quem entra.** Todo cadastro novo nasce `pendente`, e a coordenação libera na tela **Aprovar Cadastros** de sempre, que passou a mostrar os pendentes da nuvem no alto — ninguém precisa abrir o painel do Supabase. A senha vive no servidor, com hash, e **nunca** é copiada para o `db` local.

**Segurança.** A chave anônima é pública de propósito: ela vai no HTML e qualquer visitante a enxerga. Quem protege os dados é o **Row Level Security** do `esquema.sql`, que amarra cada linha ao dono dela — por isso o SQL não é opcional. Um gatilho no banco impede que alguém se promova: `papel`, `status` e `nivel_admin` só mudam pela mão de professor ou administrador, mesmo que a chamada seja montada à mão fora do site. A chave `service_role` nunca entra em arquivo nenhum do site.

**Quem já estudava antes.** Ao entrar pela primeira vez com uma conta da nuvem, se houver estudo salvo naquele navegador sem conta, a plataforma oferece **Trazer estudo deste navegador**: as respostas e os cartões passam a ser da conta e sobem. Nada é apagado sem a pessoa mandar.

---

## 5. Decisões de interface (e por quê)

### Menu ordenado por probabilidade de uso
Não é alfabético nem temático: é a frequência esperada de uso. Os **quatro primeiros do aluno** — Início, Estudar, Meu Desempenho, Meu Grupo — são os únicos que aparecem no celular sem rolar.

Ordem do aluno: Início · Estudar · Meu Desempenho · Meu Grupo · Revisão · Revisão Rápida · Simulados · Histórico de Atividade · Favoritos · Provas Antigas · Enviar Questões.

Ordem do conteúdo: Início · Banco de Questões · Importar Questões · Central de Provas · Questões Difíceis · Criar Simulado · Material em PDF · Flashcards · Realizar Simulados · Provas Antigas · Revisar Formatação · Especialidades e Assuntos.

### Metas: de página a cartão
A meta é um número que se **define uma vez** e se **vê todo dia**. Uma página própria invertia isso: escondia o acompanhamento e dava destaque à configuração. Agora o progresso abre a tela Estudar e o ajuste fica numa janela (`abrirModalMeta`). A rota `metas` continua respondendo e leva a Estudar, para não quebrar link salvo.

### Desempenho: até a grande área, não até o assunto
A árvore assunto a assunto virava uma lista de dezenas de linhas que ninguém lia até o fim. Na tela de desempenho ficam **as 5 grandes áreas** — que é o nível em que se decide o que estudar na semana —, com acertos, erros, taxa e o assunto mais fraco de cada uma (com o tamanho da amostra à vista, porque "0% em 2 questões" não é o mesmo que "0% em 30"). O detalhe fino ficou em **Revisão**, ao lado da fila que diz o que fazer com ele.

### Flashcard tem dono
Cartão do aluno e material da equipe são coisas diferentes e não podem se misturar: um é anotação pessoal, o outro é conteúdo publicado para a turma. O campo `usuarioId` resolve isso — `null` para a equipe, preenchido para o aluno — e as três funções de leitura (`flashcardsAtivos(usuarioId)`, `flashcardsDaEquipe()`, `meusFlashcards(id)`) mantêm a separação em todo lugar: baralho, resumo, tela de manutenção e PDF. As checagens de permissão estão nas próprias funções (`podeMexerNoCartao`), não só nos botões.

### Arrastar para o lado no celular
Vale na sessão, no simulado e nos flashcards. Exige movimento horizontal (o dobro do vertical) e pelo menos 70 px, respeita as travas dos botões (não pula questão não respondida nem cartão não virado), e o toque não conta depois de um arrasto.

### A barra de questões do simulado não conta o resultado
Durante a prova, o mapa de números responde a uma pergunta só: **já respondi esta ou não**. Verde e vermelho ali dentro mudariam o comportamento de quem está fazendo — a pessoa volta para "consertar" o que já passou, ou desanima e apressa o resto — e a nota deixaria de medir o que a prova de verdade mede. Por isso o número fica **sempre visível** (é por ele que se acha a questão no caderno de rascunho), respondida é o botão cheio com um ponto, em branco é o tracejado, e a questão atual ganha só um anel. As cores de acerto e erro existem num lugar só: o **mapa do resultado**, depois de finalizar.

### Prova inteira se sobe em pedaços, e alguém precisa contar os pedaços
Uma prova de 100 questões com explicação autoral não sai numa conversa só — sai em quatro, às vezes duas ao mesmo tempo. A partir do momento em que isso é o normal, o problema deixa de ser o formato do texto (que a tela de importação já resolvia) e passa a ser a **contabilidade**: qual faixa já foi feita, qual voltou incompleta, o que falta. A Central de Provas existe para guardar essa contabilidade — e é por isso que o modelo de cada lote já vem com a faixa escrita dentro: quem abre duas conversas não precisa lembrar de nada, o texto copiado já diz o que transcrever.

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

**Dois lugares.** O `index.html` tem o código; a pasta `dados/`, ao lado dele, tem o conteúdo (sete arquivos: `banco-didatico.js`, `prova-unifesp-2022..2026.js` e `flashcards-equipe.js`). Cada arquivo de dados chama `window.EscDados.registrarQuestoes(nome, lista)` ou `registrarFlashcards(nome, lista)`, e o `index.html` os carrega com linhas `<script src="dados/…">` **antes** do código — por isso `SEED_QUESTOES` e `SEED_FLASHCARDS` são só apelidos da lista já montada. A ordem das linhas `<script>` é a ordem em que o conteúdo entra no banco. Acrescentar uma prova nova é criar um arquivo lá e uma linha aqui (`dados/LEIA-ME.md`).

O `index.html` segue com seções numeradas em caixa alta (use Ctrl+F):

1. `CONFIG` (inclui `CONFIG.nuvem`), níveis de admin, anos da faculdade, tema claro/escuro
2. `SEED_TAXONOMIA`, `SEED_BLOCOS`, `SEED_SEQUENCIAS_ANO`, `SEED_USUARIOS`, `SEED_QUESTOES`, `SEED_LIVRO_OURO`, `SEED_COMENTARIOS`, `SEED_FLASHCARDS`, `SEED_SIMULADOS`
2-C. **Nuvem** — todas as funções `nuvem*`, `NUVEM_TABELAS` e a fila de envio
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

**Funções-chave acrescentadas na revisão de 20/09:**

| Função | O que faz |
|---|---|
| `regrasDeConteudoImportacao()` | as duas regras de conteúdo (o que pode e o que não pode ser copiado) numa fonte só, usada por todos os prompts |
| `importarItensAnalisados(resultado, destino, extras)` | cria no banco as questões já conferidas; usada pela tela de Importar e pela Central de Provas, para as duas não divergirem |
| `parseImportText(texto, padroes)` | passou a aceitar a linha `NUMERO:` e a receber instituição/ano por fora (a Central de Provas não depende do que está digitado na outra tela) |
| `montarLotesDaCarga(total, tamanho)` / `resumoCarga(carga)` | corta a prova em faixas e devolve o andamento (publicadas, conferidas, o que falta) |
| `modeloConstrucaoLote(carga, lote)` | o prompt pronto daquele lote, com a faixa de questões escrita dentro |
| `resumoDoLote(resultado, lote)` | confere o lote contra a faixa: quantas chegaram, quais faltam, repetidas, fora da faixa |
| `conferenciaDaProva(carga)` | confere a prova contra o **banco**, pelo `numeroNaProva` das questões publicadas |
| `resumirNumeros(lista)` | "1, 2, 3, 7" vira "1–3, 7" — buraco de prova precisa ser legível |

**Funções-chave acrescentadas na revisão de 21/09 (nuvem e pasta `dados/`):**

| Função | O que faz |
|---|---|
| `nuvemLigada()` / `nuvemConectado()` | a nuvem está configurada? e há alguém logado nela? |
| `nuvemChamar(caminho, opcoes)` | uma porta só para todas as chamadas: põe a chave e o token, renova o token vencido e tenta de novo, e traduz o erro do servidor para uma frase que a pessoa entenda |
| `NUVEM_TABELAS` | o mapa das dez tabelas: se é **registro** (só se acumula) ou **estado** (vale a mais recente), qual coluna é a marca d'água, qual é a chave e como aplicar a linha que desceu no `db` local |
| `nuvemRegistrar(o)` / `nuvemEnfileirar(tabela, registro)` | toda gravação passa por aqui e vira um item da fila; estado não se acumula na fila, a versão nova substitui a que ainda não subiu |
| `nuvemSincronizar()` / `nuvemEnviarFila()` / `nuvemReceberMudancas()` | sobe a fila em lotes de 200 por tabela e desce o que mudou desde a marca d'água, em páginas de 500 |
| `nuvemEntrarPelaTela()` / `nuvemCadastrarPelaTela()` / `nuvemSairDaConta()` | entrar, cadastrar e sair, com a checagem de `status` (pendente/rejeitado/inativo) antes de deixar entrar |
| `nuvemBuscarCadastrosPendentes()` / `nuvemDecidirCadastro(id, status)` | a aprovação da turma feita pela própria plataforma |
| `nuvemAdotarDadosLocais(idLocal)` | traz para a conta o estudo que já existia naquele navegador sem conta |
| `resumoArquivosDeConteudo()` / `avisarSeFaltarConteudo()` | o que a pasta `dados/` entregou, e a tarja de aviso quando não entregou nada |
| `renderMapaSessao()` / `irParaIndiceDaSessao(i)` | o mapa clicável da sessão de prática (não confundir com o mapa do simulado, que é neutro — seção 5) |

**Manutenção:** `sincronizarConteudoNovo()` acrescenta ao banco salvo qualquer área, especialidade, assunto, questão, flashcard, usuário-semente ou livro de ouro que exista no código e ainda não exista nos dados, comparando por `id`. Nada é sobrescrito nem apagado.

**Migrações em `loadState`:** criação de `db.filaNuvem` e `db.nuvem` (fila de envio e marcas d'água da nuvem); criação de `db.cargasProvas` (Central de Provas); criação de `db.flashcards` e `db.revisoesFlashcards`; normalização de `usuarioId` nos cartões antigos (todos viram "da equipe", que é o correto — foram escritos por professores); conversão de `anoFaculdade: "Internato"` para `"6º ano"`; criação de `db.sessoesEmAndamento`, `db.diasCartoes` e `db.configGeral.metaCartoesDia`; e a migração dos blocos (abaixo).

**Migração dos blocos para sequências por ano.** `db.sequenciasAno` passa a guardar a ordem de blocos de cada ano, e o grupo guarda só `anoFaculdade` + `deslocamento`. Nada é apagado: o calendário que a coordenação tinha customizado vira a sequência do ano padrão, o calendário próprio de uma turma vira a sequência do ano dela se aquele ano ainda não tiver uma, e o que sobrar fica guardado em `grupo.blocosArquivados` — continua no banco e no backup, para consulta antes de descartar.

---

## 8. Limitações conhecidas

1. **A nuvem cobre o estudo, não a colaboração.** Com a nuvem ligada (seção 4-B), o estudo de cada pessoa viaja entre aparelhos. O que ainda é local a um navegador: fila de dúvidas, comentários nas questões, grupos e calendário, percentil de simulado, relatório de turma, feedbacks e Livro de Ouro — essas telas continuam pressupondo várias pessoas sem que os dados delas se encontrem. São as próximas tabelas naturais, pelo mesmo caminho já aberto.
2. **Banco cobre uma só banca.** As 500 questões reais são todas da UNIFESP-EPM. As outras 5 bancas de referência (`CONFIG.instituicoesReferencia`) ainda não têm nenhuma questão real — só entram se o usuário conseguir os PDFs oficiais, pelo mesmo processo já usado para a UNIFESP (seção 12). *(Em volume puro o banco já foi testado sintético em mais de 6.000 questões e 8.000 respostas, sem travamento perceptível em nenhuma tela — não é mais o gargalo.)*
3. **Flashcards da equipe cobrem só metade da taxonomia.** Os 501 cartões foram escritos para os 91 assuntos que existiam antes da carga das provas reais; os 125 assuntos novos (Psiquiatria e as demais especialidades abertas na seção 12) ainda não têm cartão de equipe dedicado. Os cartões gerados automaticamente a partir de erros e os escritos pelos próprios alunos cobrem esse buraco por enquanto, mas dependem de uso.
4. **As contas de demonstração continuam sendo de demonstração**: com a nuvem desligada, a senha fica em texto claro no `SEED_USUARIOS` e não serve para uso público real. Com a nuvem ligada, a conta de verdade é a do Supabase — senha com hash no servidor, nunca copiada para o `db` local —, mas as contas `@esc.demo` continuam existindo ao lado, para testar sem criar conta.
5. **Backup manual e restrito.** Só o administrador máster exporta — se ele não exportar, ninguém exporta. Configurações avisa quando passa de ~3,5 MB e quando o último backup tem mais de 7 dias.
6. **Cartão pessoal é privado, não é segredo.** O isolamento é por papel na interface e nas funções; qualquer pessoa com acesso ao mesmo navegador e ao console enxerga tudo, como em qualquer dado do `localStorage`.
7. **Uma sequência de blocos por ano, e só uma.** Duas turmas do mesmo ano não podem ter ordens diferentes de matéria — por decisão de projeto, elas diferem só pelo ponto de entrada. Se um dia for preciso que uma turma tenha uma sequência realmente distinta, será um campo novo (`grupo.sequenciaPropria`) e mais uma migração.
8. **`somarDias()` usa `toISOString()`** depois de montar a data em horário local: certo para fusos negativos (Brasil), quebraria a data em fusos positivos (UTC+). Sem efeito para o público atual.
9. **Conteúdo criado pela plataforma não sobe para a nuvem.** Questão publicada por *Importar Questões* ou pela *Central de Provas* (e a carga em andamento) fica no navegador de quem publicou, mesmo com a nuvem ligada: o conteúdo é igual para todo mundo e mora na pasta `dados/`, versionada junto com o código. Para virar conteúdo de todos, a questão precisa ser levada para lá (`dados/LEIA-ME.md`). É uma decisão de projeto, não um esquecimento — mas é o atrito mais visível de quem usa a Central de Provas em dois aparelhos.
10. **A pasta `dados/` precisa ser publicada junto.** Publicar só o `index.html` faz o site abrir com a tarja de aviso e sem questão nenhuma. Quem já usava não perde nada (o banco salvo no navegador continua lá), mas conteúdo novo não entra.
11. **Lembrete de meta diária só funciona com o navegador aberto.** Como o app não tem service worker nem servidor, a Notification API só dispara enquanto alguma aba do Esc está carregada (mesmo minimizada). Não existe aviso de verdade com tudo fechado — isso exigiria backend (ver limitação 1).

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
2. **Repetir a carga de provas reais para as outras 5 bancas de referência** (USP-SP/FMUSP, USP-RP/FMRP, Santa Casa de São Paulo, IAMSPE, UNESP), se o usuário conseguir os PDFs oficiais. Agora isso é feito **pela própria plataforma**, sem script nem edição do arquivo: a **Central de Provas** (seção 4) cadastra a prova, corta em lotes, dá o modelo pronto de cada faixa e confere o que chegou — e vários lotes podem andar em paralelo.
3. **Checagem humana amostral das 500 explicações autorais.** Foram escritas em lote, com boa fundamentação e revisão de consistência automatizada, mas nunca foram lidas por um segundo médico/residente. Vale um professor ou residente revisar uma amostra (por exemplo, as questões mais avançadas ou as anuladas, onde a explicação é mais interpretativa) antes de tratar o conjunto como validado clinicamente.
4. **Questões com imagem/figura no enunciado.** Algumas das 500 questões reais mencionam uma imagem original da prova (ultrassom, radiografia, ressonância) que não foi reproduzida — a explicação descreve o achado esperado a partir do texto, mas o aluno não vê a imagem. Vale revisar essas questões pontualmente e anexar a imagem quando possível.
5. **Relatório individual do aluno em PDF**, para devolutiva um a um (item já sugerido antes e ainda pendente).
6. **Levar para a nuvem o que ainda é local**: fila de dúvidas e comentários nas questões primeiro (são os que mais dependem de duas pessoas se encontrarem), depois grupos/calendário, percentil de simulado e Livro de Ouro. O caminho já está aberto — cada um é mais uma entrada em `NUVEM_TABELAS` e mais uma tabela com RLS no `nuvem/esquema.sql`, no mesmo padrão registro/estado.
7. **Sincronizar o conteúdo publicado pela plataforma** (seção 8, item 9), ou pelo menos um botão que exporte as questões novas já no formato de um arquivo de `dados/`, para o caminho de volta não ser copiar e colar à mão.

---

## 11. Como pedir alterações numa nova conversa

Anexe o `index.html` e este resumo, e descreva o que quer em português corrente. Se o pedido for sobre conteúdo (uma prova, os flashcards), anexe também o arquivo da pasta `dados/` que interessa — não o resto. Convenções que o projeto segue e vale manter:

- Tudo em **português do Brasil**, inclusive nomes de funções e variáveis.
- Comentários no código explicando a **regra em linguagem simples**, pensados para quem não programa.
- Nenhuma dependência externa nova; nada de framework. (Os gráficos são SVG escrito à mão; o PDF usa a impressão do navegador.)
- Toda alteração no modelo de dados vem acompanhada de migração em `loadState` — e, se o dado for sincronizado, de mais uma entrada em `NUVEM_TABELAS` e da tabela correspondente em `nuvem/esquema.sql`, com RLS.
- **Código no `index.html`, conteúdo na pasta `dados/`.** Questão nova não volta para dentro do HTML.
- Rota que sai do menu continua respondendo, redirecionando para o novo lugar — link salvo por aluno não pode quebrar.
- A plataforma **explica o que faz**: quando o algoritmo muda uma proporção, esconde um botão ou prioriza uma questão, a tela diz o porquê.

---

## 12. Histórico de revisões

Registro resumido de cada rodada de trabalho, da mais antiga à mais recente. Detalhe de implementação (nomes de função, migração, tabela de tempo) que já vale como referência permanente está nas seções 6 e 7, não aqui — esta seção é só o "o que mudou e por quê" de cada rodada.

**Revisão geral (manhã de 19/09/2026).** Cinco defeitos corrigidos: a repetição espaçada de questões não usava a escada de intervalos configurada (`CONFIG.intervalosBase`); `calcularDificuldade()` recalculava a prevalência de todos os assuntos a cada questão dentro de um `.sort()`, um gargalo que só aparece com banco grande; contraste abaixo do padrão de acessibilidade (WCAG AA) em dois tons do tema claro; afordância de "clicável" sobrava nas alternativas depois de já ter respondido; um comentário `/* */` mal fechado engolia um bloco de documentação. Além disso: polimento visual (sombras, transições, `prefers-reduced-motion`), paginação de todas as listas longas, meta diária de flashcards com sequência de dias, eliminar alternativas durante a resolução da questão, blocos de estudo organizados por ano da faculdade com rodízio real entre turmas, e sessão de estudo retomável (sair e voltar mantém a mesma fila). Verificado com Chromium/Playwright em todos os papéis e rotas.

**Ajuste de política de conteúdo e expansão de recursos (noite de 19/09/2026).** Esclarecido que enunciado/alternativas/gabarito oficial de prova de instituição pública são domínio público (podem ser transcritos integralmente) e que só a explicação precisa ser sempre autoral — refletido no prompt de importação e no formulário de questão. A partir daí: baralho da equipe ampliado de 24 para 501 flashcards, cobrindo os 91 assuntos que existiam até então; lembrete de meta diária via Notification API do navegador; flashcards ganharam suporte a imagem (mesmo padrão já usado nas questões); fluxo de promoção de cartão pessoal para o baralho da equipe, com aprovação de professor/coordenação; estatística de alternativas eliminadas por quem errou, agregada por questão em Controle de Qualidade. O banco também foi testado sintético em mais de 6.000 questões e 8.000 respostas, o que revelou dois novos gargalos do mesmo tipo do já corrigido pela manhã (uma função revarrendo o banco inteiro a cada chamada, dentro de um laço) — ambos corrigidos com índices cacheados por geração do banco, derrubando o tempo de operações como colar uma prova de 100 questões de 6,8s para 106ms.

**Barra de questões do simulado e Central de Provas (20/09/2026).** Duas mudanças pedidas pelo usuário. (1) A barra de números do simulado em andamento passou a mostrar **só se a questão foi respondida ou não** — nunca se está certa ou errada — e o número da questão, que antes sumia atrás de um ✓ quando ela era respondida, ficou sempre visível; o mapa colorido de acertos e erros continua existindo, mas só no resultado (seção 5). (2) Entrou a **Central de Provas**: um modelo de construção pronto para subir prova inteira em lotes separados pela própria plataforma, pensado para tocar duas frentes ao mesmo tempo (seção 4). Para isso, três partes do importador foram extraídas para serem usadas pelas duas telas sem divergir — as regras de conteúdo, o parser (que passou a ler a linha `NUMERO:`) e a criação das questões no banco. Dois defeitos adjacentes corrigidos no caminho: o cronômetro não ligava no "simulado personalizado" nem em "fazer prova antiga como simulado" (faltavam `inicioMs`/`tsQuestao`/`tempos`, então a análise de tempo vinha vazia nesses dois caminhos), e sair da conta não limpava o estado temporário das telas — o texto de uma prova colado e não publicado continuava aparecendo para o próximo que entrasse naquele navegador. Verificado com Chromium/Playwright: mapa neutro com questão certa e errada visualmente idênticas (inclusive em modo aprendizado), conferência de lote acusando faixa incompleta, número repetido e número fora da faixa, publicação lote a lote e em bloco, duas provas em paralelo, acesso negado para aluno, e a tela de importação antiga funcionando como antes.

**Carga das 500 questões reais da UNIFESP-EPM, 2022-2026 (madrugada seguinte).** O usuário forneceu os PDFs das provas de Acesso Direto/R1 dos últimos cinco anos. Conteúdo de prova pública (enunciado, alternativas, gabarito oficial) extraído por scripts Node.js reutilizáveis (`provas/parse_gabarito.js`, `provas/parse_questoes.js`, a partir de texto gerado com `pdftotext`), com duas armadilhas de parsing corrigidas (caractere de quebra de página inserido pelo PDF; a última questão de cada prova absorvendo a folha de gabarito em branco). Achado relevante: a prova real usa só 4 alternativas (A-D), não 5 — formulário e importador ajustados para tornar a alternativa E opcional. Para cada uma das 500 questões foi escrita uma explicação **100% autoral** (nunca a partir da resolução do cursinho de origem do PDF), com referência citada e dificuldade estimada, combinada ao conteúdo da prova por um script de merge (`provas/merge_year.js`) que também classificou cada questão num assunto da taxonomia. A taxonomia foi ampliada de 91 para 216 assuntos (24 para 39 especialidades) em 5 levas, para dar lugar a especialidades que a prova real cobre e a plataforma didática não tinha — Psiquiatria inteira, criada do zero, entre elas. Validado com checagem de sintaxe, IDs únicos, integridade completa da taxonomia, completude estrutural das 500 questões e testes funcionais via Chromium/Playwright (contagem por ano e por anuladas batendo com o gabarito oficial, resposta correta sendo pontuada como `correta: true`, zero erros de JavaScript). Ficou de fora, de propósito: qualquer leitura da resolução do cursinho de origem como fonte de explicação, e as imagens/figuras que algumas questões referenciam no enunciado (a explicação descreve o achado esperado pelo texto, sem a imagem original anexada).


**Nuvem (Supabase) e separação entre código e conteúdo (21/09/2026).** Duas mudanças grandes na mesma rodada, vindas de uma versão do `index.html` trazida pelo usuário e mescladas com a Central de Provas que já estava no repositório.

(1) **O conteúdo saiu do código.** As 635 questões e os 501 cartões viraram sete arquivos na pasta `dados/`, carregados por linhas `<script src="dados/…">` antes do código; `SEED_QUESTOES` e `SEED_FLASHCARDS` passaram a ser apelidos da lista já montada. No site nada muda — a diferença é que o `index.html` caiu de 1,8 MB para ~640 KB e cada prova virou um arquivo que se abre e se confere sozinho. Se a pasta faltar, uma tarja no alto da tela explica o que houve em vez de a plataforma parecer quebrada, e *Configurações > Arquivos de conteúdo* mostra o que o navegador carregou. Conferido item a item: as 635 questões e os 501 cartões saíram dos arquivos **idênticos** ao que estava no HTML, na mesma ordem.

(2) **A nuvem** (seção 4-B): conta de verdade com e-mail e senha, e o estudo de cada pessoa sincronizado entre aparelhos por cima do Supabase, sem SDK e sem dependência nova — só `fetch` contra a API REST. Dez tabelas, fila de envio que sobrevive à falta de internet, marca d'água por tabela com o relógio do servidor, e a aprovação de cadastros feita pela tela de sempre. `nuvem/esquema.sql` traz o banco inteiro com Row Level Security (a chave anônima é pública; quem protege é a regra no banco) e um gatilho que impede alguém de se promover a administrador por fora do site; `nuvem/LEIA-ME.md` traz o passo a passo, inclusive como desligar.

**A mescla.** A versão trazida pelo usuário derivava do commit anterior à Central de Provas, então as duas foram reunidas com merge de três vias: entrou tudo das duas (as 34 funções da Central de Provas e as 41 da nuvem), com dois conflitos resolvidos à mão — `fazerLogout()`, que agora limpa o estado temporário das telas nos dois caminhos de saída (local e nuvem), via `limparEstadoDasTelas()`; e uma colisão de CSS invisível mas real, em que as duas versões haviam criado uma classe `.mapa-legenda` com significados diferentes (no simulado é respondida/em branco; na prática é acertou/errou) e a segunda estragava a primeira — a da prática virou `.mapa-sessao-legenda`.

**Verificado com Chromium/Playwright:** os sete arquivos de dados carregando (635 questões, 501 cartões, contagem por arquivo batendo); as 29 rotas nos 4 papéis sem nenhum erro de JavaScript; a Central de Provas intacta; o mapa do simulado ainda neutro (respondida/em branco, sem cor de acerto) e o mapa da prática com as cores próprias, cada um com a sua legenda; a pasta `dados/` bloqueada de propósito, para ver a tarja aparecer e a plataforma seguir de pé; e o ciclo inteiro da nuvem contra um servidor Supabase simulado — entrar, gravar nas dez tabelas, subir a fila, baixar, aprovar cadastro pendente e cair a internet no meio (a fila fica, com aviso claro, e sobe depois). Cada coluna que o app escreve foi conferida uma a uma contra o `esquema.sql`. **O que não deu para verificar daqui:** o projeto Supabase de verdade — a rede desta máquina bloqueia `supabase.co`, então o `esquema.sql` ainda precisa ser rodado e conferido no painel (o teste de uma linha está no fim de `nuvem/LEIA-ME.md`).
