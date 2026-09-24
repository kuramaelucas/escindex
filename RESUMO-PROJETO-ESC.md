# Esc — plataforma de estudos para residência médica
## Resumo do projeto (setembro de 2026)

Este documento existe para que uma nova conversa com o Claude comece sabendo tudo o que já foi decidido e construído. Anexe-o junto com o arquivo da pasta `codigo/` que tem a tela ou a regra em questão (cada um diz o que tem dentro; ver seção 7) e, se a conversa for sobre conteúdo, com o arquivo da pasta `dados/` que interessa.

> **Estado atual, em uma frase:** plataforma completa (estudo, revisão espaçada, flashcards, simulados, desempenho, "o que mais cai" e nota estimada, PDF, controle de qualidade, upload de provas em lotes, Painel da Turma) com **635 questões** — das quais **500 reais da UNIFESP-EPM** (2022 a 2026, com explicação autoral) —, **877 cartões** cobrindo os **216 assuntos** em **39 especialidades**, **conta de verdade e sincronização entre aparelhos pela nuvem** (Supabase, seção 4-B), **aplicativo instalável que abre sem internet**, código em `codigo/`, conteúdo em `dados/` e **testes automáticos** a cada envio (`testes/`). O histórico de como se chegou até aqui está na seção 12; o que falta fazer está na seção 10.

> **Pendências abertas (24/09/2026) — três coisas só a coordenação pode fazer, no painel do Supabase e no GitHub** (a rede de onde o código é escrito não alcança o Supabase):
>
> 1. **Rodar de novo o `nuvem/esquema.sql`** (SQL Editor > colar tudo > Run). Dez novidades dependem dele — a anotação da questão salva (`favoritos.nota`), a contagem de flashcards por dia (`dias_cartoes.quantidade`), os flashcards favoritados (`favoritos_cartoes`), as questões escondidas (`questoes_ocultas`), o Livro de Ouro (`livro_ouro`), a formatação aprovada (`formatacao_aprovada`), o primeiro acesso (`perfis.boas_vindas_em`) e, desta rodada, os **comentários e dúvidas** (`comentarios`), o **percentil da turma** (`notas_do_simulado()`) e o **Painel da Turma** (`painel_turma()`, `atividade_por_semana()`). O arquivo acrescenta cada uma sem mexer no que existe, e agora roda também num projeto novo. Enquanto não for rodado, a plataforma funciona e não perde nada: pula o que falta, sincroniza o resto e avisa em *Perfil*.
> 2. **Authentication > URL Configuration**: pôr o endereço do site em *Site URL* e em *Redirect URLs* (com `**` no fim). É o que faz o link de confirmação de e-mail e o de "esqueci a senha" voltarem para o Esc (seção 4-B; passo a passo em `nuvem/LEIA-ME.md`, passo 3).
> 3. **Backup automático**: cadastrar no GitHub os segredos `SUPABASE_DB_URL` e `BACKUP_SENHA` (`nuvem/LEIA-ME.md`, "Backup automático"). Até lá, o fluxo roda e só avisa que está desligado.

---

## 1. O que é

O Esc é uma plataforma de estudos para prova de residência médica **de arquivo aberto**: sem instalação, sem servidor, sem build. São duas peças que andam juntas:

- **`index.html`** — só a MOLDURA (~12 KB): cabeçalho, ícones, a versão (`ESC_VERSAO`) e a lista `ESC_ARQUIVOS` dos arquivos a carregar, na ordem.
- **pasta `codigo/`** — o CÓDIGO, e só: telas, regras, algoritmos e configuração, em treze arquivos numerados na ordem das seções de sempre, mais o visual em `estilo.css` (seção 7).
- **pasta `dados/`** — TODO o conteúdo, em doze arquivos (~1,4 MB): taxonomia, calendário, um arquivo por prova, banco didático, flashcards, simulados e os dados de demonstração, mais `imagens/` para as figuras das provas. Ver `dados/LEIA-ME.md`.
- **`sw.js`, `manifest.webmanifest` e `icones/`** — o que faz o site virar aplicativo instalável (seção 4, "Aplicativo instalável").
- **pasta `testes/`** e **`.github/workflows/`** — os testes automáticos e o backup da nuvem. Não fazem falta no ar.

Abrir o `index.html` com dois cliques continua bastando — a única regra é manter as pastas `codigo/` e `dados/` ao lado dele (e publicá-las junto, quando o site está no ar). Se `dados/` faltar, a plataforma abre e avisa numa tarja no alto da tela; se `codigo/` faltar, a página diz qual arquivo não chegou em vez de ficar em branco.

A separação foi feita porque, com as 635 questões e os 501 cartões dentro do HTML, eram 1,8 MB e ~17.400 linhas: qualquer leitura — de uma pessoa ou de uma IA — gastava quase todo o fôlego atravessando conteúdo para chegar ao código. Pelo mesmo motivo, em 24/09 o próprio código (então ~800 KB e 12.400 linhas num arquivo só) foi dividido em `codigo/`.

- **Dados:** por padrão tudo fica no `localStorage` do navegador, sob a chave `medbloco_db_v1` (o nome antigo foi mantido de propósito, para não apagar os dados de quem já usava quando o app foi renomeado). Com a **nuvem ligada** (seção 4-B), o estudo de cada pessoa também sobe para o Supabase e desce em qualquer aparelho.
- **Pasta `nuvem/`** — o esquema do banco (`esquema.sql`) e o passo a passo para ligar ou desligar a nuvem (`LEIA-ME.md`). É documentação: não faz falta no ar.
- **Nome:** "Esc" (era "MedBloco"). O nome fica em `CONFIG.nomePlataforma` (`codigo/01-config.js`).
- **Banca de referência:** UNIFESP-EPM (`CONFIG.bancaFoco`), mas o app é agnóstico — filtra por instituição.

### Contas de demonstração (senha entre parênteses)

| E-mail | Papel |
|---|---|
| admin@esc.demo (admin123) | Administrador **máster** — a única conta de administrador |
| professor@esc.demo (prof123) | Professor |
| residente@esc.demo (res123) | Residente |
| aluno@esc.demo (aluno123) | Aluno |

São quatro, uma por papel, e existem só para conferir como cada um enxerga as telas. As contas extras de administrador (coordenação e moderador) e a segunda aluna de exemplo saíram: nível de administrador se testa mudando o nível da conta que existe, em *Admin > Usuários*, e não guardando três contas com senha à vista.

Na tela inicial e na de entrada, o **único** acesso rápido sem senha é o de **aluno** — é a visão que interessa a quem chega para conhecer a plataforma. Professor, residente e coordenação entram por e-mail e senha; pedir o acesso rápido de outro papel pelo console é recusado, porque a checagem está na própria `fazerLoginDemo()`. **Com a nuvem ligada, as contas de demonstração de professor, residente e administrador ficam desligadas** (`CONFIG.contasDemoDaEquipeComNuvem: false`): a senha delas está escrita aqui, e num computador compartilhado abririam as telas de administração daquele navegador. Qualquer conta troca a própria senha em *Perfil > Mudar a senha*.

---

## 2. Estado do banco de questões e de cartões

- **635 questões** no total:
  - **500 questões reais da UNIFESP-EPM** (`real: true`), 100 de cada ano de 2022 a 2026 — enunciado, alternativas e gabarito oficial transcritos integralmente (domínio público), com explicação de cada questão **100% autoral**, escrita com base em diretrizes e fontes primárias, nunca copiada de resolução de cursinho (seção 9). Questões anuladas pela banca entram com `status: "anulada"` e `motivoStatus` preenchido, mas mantêm explicação pedagógica.
  - **135 questões didáticas** de demonstração/construção de conhecimento (30 de Técnica Operatória, 30 de Cardiologia, 30 de Infectologia, 15 de Oftalmologia, 30 de demonstração original), com instituição **"Esc — Banco Didático"** e selo **Didática** — dá para isolá-las ou excluí-las por qualquer filtro de instituição. (As 30 de demonstração original diziam "UNIFESP-EPM" até 24/09 e entravam nas provas reais em Provas Antigas — seção 12.)
  - Toda questão real traz **`numeroNaProva`** (o número dela na prova original, que aparece no cartão da questão e ordena a prova em Provas Antigas). **13** dependem de uma figura da prova (ECG, tabela 2×2, radiografia...) que ainda não foi anexada: elas mostram um aviso com a descrição do que a prova tinha e apontam para o arquivo que deve ser salvo em `dados/imagens/` (lista em `dados/imagens/LEIA-ME.md`).
- **877 flashcards autorais** de semente (`SEED_FLASHCARDS`): 501 cobrindo os 91 assuntos que existiam antes da carga das provas reais, e **376** (`dados/flashcards-assuntos-novos.js`, 24/09) cobrindo os 125 assuntos que tinham ficado sem nenhum — três por assunto, com `fonte` e `revisao: "pendente"` até um professor conferir. Além deles, a plataforma **gera cartões automaticamente** a partir das questões que cada aluno errou com certeza ou acertou no chute, e **cada aluno escreve os seus** durante a resolução — e pode **sugerir o próprio cartão para o baralho da equipe**, com aprovação de professor/coordenação.
- Taxonomia atual: **5 grandes áreas, 39 especialidades, 216 assuntos** — ampliada de 91 para 216 assuntos (e de 24 para 39 especialidades) durante a carga das provas reais, para cobrir temas que a UNIFESP realmente cobra e a taxonomia didática original não previa (por exemplo, Psiquiatria inteira, criada do zero — seção 12). Desde 24/09, todo assunto tem pelo menos três cartões da equipe.
- Nenhuma questão nem cartão da equipe é cópia de prova real ou de material de terceiros; enunciado/gabarito de prova pública são transcritos por serem domínio público, mas toda explicação é autoral (seção 9).

Com 500 questões reais cobrindo 5 anos de uma banca de referência, a repetição espaçada, a dificuldade progressiva e o percentil de simulado já têm massa real para funcionar bem — o próximo salto de volume seria repetir esse processo para as outras 5 bancas de referência (`CONFIG.instituicoesReferencia`), caso o usuário consiga as provas.

---

## 3. Papéis e permissões

**Aluno** — estudar (com a meta do dia), revisar, revisão rápida por flashcards, simulados, provas antigas, favoritos, histórico, desempenho, meu grupo, enviar questões.

**Residente** — fila de dúvidas, questões difíceis, revisar formatação, enviar provas e questões, Central de Provas, provas antigas.

**Professor** — todo o conteúdo: banco de questões, importar, Central de Provas, controle de qualidade, criar simulado, material em PDF, flashcards da equipe (inclusive em lote), especialidades e assuntos, revisar formatação — e o **Painel da Turma**.

**Administrador, em três níveis** (`CONFIG.niveisAdmin` + `PERMISSOES_ADMIN`):

| Nível | Pode |
|---|---|
| **Máster** | Tudo: papéis, níveis, configurações do algoritmo, calendário, **backup/reset**, livro de ouro, conteúdo, Painel da Turma |
| **Coordenação** | Conteúdo, aprovação de cadastros, **Painel da Turma**, calendário de blocos, livro de ouro, taxonomia |
| **Moderador** | Só conteúdo: banco, importação, qualidade, simulados, taxonomia, material em PDF |

O menu lateral se monta conforme o nível e as rotas restritas mostram tela de "acesso restrito". Não é possível rebaixar o último administrador máster. Qualquer não-aluno pode entrar no "modo aluno" e usar a plataforma como estudante — inclusive criando cartões pessoais.

---

## 4. Funcionalidades por área

### Estudar
- **A sessão recomendada é a SESSÃO DO DIA**: ela é montada uma vez e vale o dia inteiro. Sair para ver o desempenho e voltar continua o mesmo conjunto, na mesma ordem, com o que já foi respondido — em vez de sortear um conjunto novo e jogar fora o começo. O conjunto só se renova quando o dia vira, ou quando o anterior termina. Um conjunto inacabado de outro dia não é descartado em silêncio: aí a plataforma pergunta se é para continuar aquele ou começar um de hoje.
- **Sessão em andamento no topo**: se o aluno saiu no meio de uma fila, o primeiro cartão da tela oferece *"Continuar de onde parei"* — mesma fila, mesma ordem, mesmos riscos nas alternativas. Só desaparece quando o conjunto termina ou quando ele escolhe descartar.
- **Meta do dia**: progresso `feitas/meta`, quantas faltam, sequência de dias seguidos e botão para ajustar o número. A meta não tem mais página própria (ver seção 5).
- **Sessão recomendada**, que mistura bloco atual, revisão e prévia do próximo bloco.
- **Monte sua própria lista**: filtros por grande área (com botão "todas"), especialidade, assunto, instituição, ano (com botão "últimos 5 anos"), e situação (só erros/chutes, só favoritas, não respondidas, incluir questões do meu grupo). Pode gerar como prática ou como simulado.
- Durante a sessão: escolha da alternativa, **eliminar alternativas** (o × ao lado de cada uma risca o que já foi descartado), **declaração de confiança** (certeza / na dúvida / chute), feedback imediato com explicação, **navegação livre por toda a fila — inclusive por cima do que ainda não foi respondido**, favoritar, **anotar uma dúvida sua na questão**, sinalizar desatualizada, gerar prompt de segunda opinião para IA e **virar a questão em flashcard**.
- **Dá para pular e voltar depois.** Nenhuma questão trava a fila: "Deixar para depois" (ou a tecla D, ou o arrasto no celular) passa para a seguinte e a questão fica *em branco* no mapa, clicável a qualquer momento. O que continua exigido é a confiança: **não existe resposta registrada sem certeza / dúvida / chute**.
- **O que foi marcado e riscado fica guardado por questão.** A alternativa escolhida ainda sem confirmar e as alternativas riscadas voltam junto com a questão — ao andar pelo conjunto, ao sair e voltar, e em outro aparelho (a fila em andamento sobe para a nuvem).
- **No celular, arrastar o cartão para o lado troca de questão.**

### O que mais cai na prova, e a nota de hoje
As 500 questões reais dizem, assunto por assunto, o que a banca cobra e quanto (`incidenciaNaBanca`, seção 4 do código). Cruzado com o acerto de cada pessoa, isso vira uma **prioridade**: *fatia da prova que o assunto ocupa × quanto a pessoa ainda erra nele* (`prioridadesDeEstudo`). O acerto de assunto com poucas respostas é "puxado" para o acerto geral da pessoa (como se houvesse 4 respostas a mais), para 1 erro em 1 questão não virar "prioridade máxima"; assunto nunca respondido entra com o acerto geral. Onde aparece:
- **Meu Desempenho > O que mais cai na prova × onde você erra** — os 10 assuntos de maior prioridade, com quantas vezes caíram (e em quantos anos), o acerto da pessoa, uma barra de prioridade, "Praticar" e "Praticar as 5 maiores prioridades".
- **Estudar** — um cartão com as três maiores e o atalho para praticá-las.
- **A sessão recomendada** — dentro do bloco atual, os assuntos de maior prioridade tendem a vir primeiro (sorteio ponderado, peso até 4×, `CONFIG.incidencia.pesoNaSessao`; 0 desliga), e a questão diz no motivo "prioridade: cai muito na UNIFESP-EPM". Nada sai do bloco atual — muda só a ordem.

**Se a prova fosse hoje** (Meu Desempenho, a partir de 30 respostas): a nota estimada é a proporção de cada grande área nas provas reais aplicada ao acerto da pessoa naquela área, com uma **faixa** (erro-padrão da conta) que é larga no começo e estreita com o uso — a tela diz isso, em vez de fingir precisão. A tabela ao lado mostra peso de cada área na prova, acerto e pontos de 100.

### Fim de cada conjunto de questões
Terminar com questões em branco **pergunta antes** ("você respondeu 12 de 20 e deixou 8 em branco"), com atalho para a primeira em branco — chegar ao resumo sem perceber que oito ficaram para trás é o tipo de coisa que só se descobre depois. Quem quiser fechar assim mesmo fecha: questão em branco não é erro nem acerto, não entra no histórico e não conta em lugar nenhum.

Página de feedback com: taxa de acerto, acerto por nível de confiança, quantas ficaram em branco, e lista questão a questão mostrando o que acertou, errou, chutou ou respondeu na dúvida — com alertas de "acerto no chute" e "erro com certeza". Cada linha traz botões de voltar à questão, ver na íntegra, favoritar e **virar flashcard** (destacado nas erradas e chutadas). Tudo fica salvo e pode ser reaberto em **Histórico de Atividade**.

### Revisão
- Repetição espaçada (SM-2 adaptado) que traz de volta tanto o que se errou quanto o que se acertou faz tempo.
- **Filas separadas por tipo de erro**: errou com certeza (prioridade máxima), acertou no chute (conta como não sabido), errou na dúvida.
- Lista de assuntos em que o aluno responde "com certeza" e erra.
- É aqui que fica o **detalhe assunto a assunto**, ao lado da ação correspondente.
- **Questões que você errou**, cada uma com **quantas vezes** foi errada (e em quantas tentativas), da mais errada para a menos, com "Refazer" e "Refazer as mais erradas". O mesmo número aparece como selo ("errada 3 vezes") no cartão de qualquer questão — fora do simulado, que imita a prova — e no feedback depois de responder.
- **Não mostrar mais**: a pessoa esconde uma questão (no feedback, nas ações da questão ou na lista de erradas) e ela sai do estudo **dela** — sessão do dia, revisão espaçada, filas de erro, listas por filtro, práticas por assunto e o "refazer os erros" do conjunto. Continua no banco, nas provas antigas, nos favoritos e nas estatísticas. **Questões escondidas**, logo abaixo, traz de volta uma a uma ou todas. Sobe para a nuvem (tabela `questoes_ocultas`).

### Revisão Rápida (flashcards)
**Cartões em lote** (para quem gere conteúdo, no fim da tela): "Cobrir os assuntos sem cartão — em lote" lista os assuntos com menos de três cartões da equipe, os que mais caem na prova primeiro; a pessoa marca alguns, copia um prompt pronto (com os cartões que já existem, para não repetir, e as regras de conteúdo), cola a resposta, **confere** (assunto existe? frente e verso? repetido?) e publica. "Exportar para a pasta dados/" baixa um arquivo já no formato de `dados/` — o caminho de volta que faltava. O verso do cartão mostra a `fonte`, e quem gere conteúdo vê o selo "revisão pendente" nos que ainda não foram conferidos.

A tela abre com a **meta diária de cartões** — progresso do dia, quantos faltam e sequência de dias seguidos —, a mesma estrutura da meta de questões, em outra unidade. As duas metas convivem e são independentes: quem prefere estudar por cartão, ou quem só tem dez minutos num dia corrido, mantém ritmo por ali.

Cartão com frente (pergunta curta) e verso (resposta direta), **sem alternativa para eliminar**. O aluno tenta lembrar, **clica no próprio cartão para virar** (não há botão de "mostrar resposta": o cartão é o botão) e se autoavalia:

| Resposta | Efeito no intervalo |
|---|---|
| **Não lembrei** | volta amanhã |
| **Quase** | intervalo travado em no máximo 3 dias — lembrar com esforço é o sinal clássico de conceito não consolidado |
| **Sabia** | intervalo cresce normalmente |

Cada cartão tem uma **estrela no alto**: salva o cartão em *Favoritos > Flashcards*, que é a pilha de "quero rever este conceito" — separada da de questões, e revisável de uma vez ("Revisar os cartões salvos"). Salvar não mexe na repetição espaçada: o cartão continua voltando na data dele.

**Três origens de cartão convivem no mesmo baralho:**

1. **Da equipe** (`usuarioId: null`) — material oficial escrito por professor, residente ou admin de conteúdo; visível a todos.
2. **Pessoal** (`usuarioId` preenchido) — escrito pelo próprio aluno durante as questões; **ninguém mais vê**. É caderno de estudo, não material publicado.
3. **Gerado automaticamente** (id `fc-q-<id da questão>`) — montado na hora a partir das questões que o aluno errou com certeza ou acertou no chute.

O baralho se monta sozinho nesta ordem: cartões vencidos → assuntos de falsa segurança → cartões gerados de erros caros → cartões novos do bloco atual → resto embaralhado. Cada cartão tem **repetição espaçada própria** (`db.revisoesFlashcards`), separada da das questões.

A tela separa **"Meus cartões"** (com a questão de origem linkada) de **"Cartões da equipe"**, e só quem gere conteúdo vê a segunda seção.

### Provas e Simulados (uma tela, duas abas)
**Só questão real forma prova antiga** (desde 24/09): a prova de 2024 da UNIFESP aparecia com 101 questões — 97 reais e 4 autorais rotuladas "UNIFESP-EPM" —, e existia uma "prova de 2021" com 5 questões que nunca existiu. Hoje a prova vem na ordem original (`numeroNaProva`) e o cartão lista à parte as **anuladas pela banca** ("+ 3 anuladas, fora da nota: nº 47, 68, 100"), cada uma clicável: elas não têm gabarito, por isso não entram na prova feita aqui, mas não somem sem explicação. O **percentil** do resultado passou a ser o da turma inteira quando a pessoa está numa conta da nuvem (seção 4-B).

As duas entradas de menu viraram uma, porque levavam ao mesmo lugar mental — "fazer uma prova inteira, no relógio" — e a pessoa tinha de lembrar em qual delas estava o que queria. A diferença continua explícita, em duas abas, porque ela é real: **prova antiga** é a prova de verdade de uma instituição num ano, do jeito que caiu (para medir contra a banca); **simulado** é um recorte montado pela equipe, com tempo e tamanho escolhidos (para treinar um bloco ou assunto). O histórico de notas é o mesmo para os dois e fica embaixo das duas abas, sem duplicar. As rotas antigas (`simulados` e `provas-antigas`) continuam respondendo e abrem a tela na aba certa.

- Simulados criados por professores, prova antiga inteira como simulado, ou simulado personalizado a partir dos filtros.
- **Cronômetro** com encerramento automático no fim do tempo, **tempo gasto por questão**, modo aprendizado (mostra explicação na hora), mapa de questões clicável.
- **A barra de números durante a prova diz só uma coisa: respondida ou em branco.** Nunca certa ou errada — o acerto só aparece no resultado, depois de acabar (ver seção 5).
- Resultado: nota, percentil anônimo entre as tentativas registradas, mapa de acertos/erros, **análise de tempo com "onde você travou"**, revisão questão a questão e prática imediata dos erros.

### Histórico de Atividade
A unidade é o **dia**, não o conjunto. Boa parte do estudo acontece solta — cinco questões esperando o elevador, dez cartões antes de dormir — e nada disso aparecia antes, porque só conjunto concluído virava linha. Agora cada dia traz tudo o que houve nele: questões respondidas (dentro ou fora de um conjunto), acerto, chutes, dúvidas, **quantos flashcards foram revisados** e quais conjuntos fecharam ali. O dia é clicável como um conjunto — reabre o mesmo feedback questão a questão —, e cada conjunto do dia continua acessível por dentro dele.

### Meu Desempenho
A tela responde a três perguntas, nesta ordem:

1. **"Quanto eu já sei?"** — desempenho total de tudo que já foi respondido, quantas questões diferentes já viu (com o % do banco ao lado) e o acerto considerando só a última tentativa de cada questão. A barra de cobertura que repetia esse número saiu: o ladrilho já diz a mesma coisa, e a barra só ocupava altura.
2. **"Como estou indo agora?"** — um **seletor de período** com quatro recortes:

   | Recorte | Granularidade | Para quê |
   |---|---|---|
   | Últimos 14 dias | uma barra por dia | reta final, ajuste de rotina |
   | Últimos 30 dias | uma barra por dia | o mês corrente, com o fim de semana à vista |
   | Últimos 12 meses | uma barra por mês | evolução longa, atravessa a virada do ano |
   | Este ano, mês a mês | jan → mês atual | o ano letivo, do jeito que a coordenação pensa |

   Em qualquer recorte diário aparecem: taxa do período, **variação em pontos percentuais contra a janela anterior do mesmo tamanho**, dias em que estudou e questões por dia estudado. No recorte mensal: taxa somada, volume, meses com estudo e melhor mês. Abaixo do gráfico, as **duas janelas curtas lado a lado** (14 e 30 dias) com um alerta quando se afastam 8 p.p. ou mais — é o sinal de que algo mudou recentemente, para melhor ou pior.

3. **"Onde eu preciso mexer?"** — **as 5 grandes áreas** (e só elas), calibração da confiança, "onde sua confiança engana" e ritmo por questão.

Há ainda um cartão **só de flashcards**, deliberadamente separado das questões: quantas revisões de cartão no total (contando as repetições), quantos cartões diferentes já passaram pelo baralho, quantos foram hoje e em quantos dias houve cartão. Cartão não tem acerto nem erro, só autoavaliação, e leva segundos onde uma questão leva minutos — somar as duas coisas num total só daria um número que não significa nada.

**O gráfico de barras verticais** (`graficoBarrasVerticaisSvg`) é o mesmo em todos esses lugares, com 140 px de altura (era 180 — a tela ficou menos alta sem perder leitura): cada barra é 100% das questões daquele dia, mês ou área — a parte de baixo, em **verde claro**, é o acerto; o que sobra em cima, em **cinza claro**, é o erro. 65% de acerto = 65% da barra verde e 35% cinza, com o número escrito quando a barra é larga o bastante e tooltip quando não é. Dia ou mês sem nenhuma questão vira um traço fino na base, não some do gráfico: esconder os buracos mentiria sobre a rotina, que é metade do resultado.

### Painel da Turma (professores e coordenação)
Como os alunos estão indo e usando a plataforma, **separado por ano da faculdade** (abas "Todos os anos", "3º ano", "4º ano"…). Mostra: alunos e quantos estudaram nos últimos 7 dias; questões por aluno e acerto nos últimos 30 dias; a comparação **ano a ano**; o acerto **semana a semana** (12 semanas) com quantos alunos estudaram em cada; as **5 grandes áreas**; e a lista de alunos com última atividade, dias ativos, questões e acerto em 30 dias (com seta de tendência contra os 30 anteriores), acerto geral, cartões, simulados e os **alertas** — *parado há N dias* (7 ou mais sem questão nem cartão), *nunca estudou* e *acerto caiu N p.p.* (10 ou mais, com pelo menos 20 questões em cada mês). Ordena por "quem precisa de atenção primeiro", busca por nome e baixa planilha (CSV com `;` e acento certo para o Excel). Com a nuvem, os números vêm do banco (`painel_turma()`, `atividade_por_semana()` — somados lá dentro, uma linha por aluno, e só professor/administrador recebem algo); sem nuvem, das contas daquele navegador, e a tela diz de onde veio. Aluno e residente não têm o item no menu, e a rota responde "acesso restrito".

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

### Comentários e dúvidas nas questões
Com a nuvem ligada, o que alguém escreve embaixo de uma questão sobe para a tabela `comentarios` e chega a todos — é o que faz a dúvida do aluno aparecer na **Fila de Dúvidas** do residente, que antes só existia no navegador de quem escreveu. O nome de quem escreveu vai junto (ninguém enxerga o perfil dos outros). Quem escreveu, professor e administrador podem **remover** (o comentário some para todos). O banco não aceita comentário em nome de outra pessoa, nem "resposta oficial" de quem não é revisor.

### Aplicativo instalável
O site virou **PWA**: `manifest.webmanifest`, ícones e `sw.js`. Instalado (Perfil > "Instalar como aplicativo", ou o menu do navegador; no iPhone, Compartilhar > Adicionar à Tela de Início), ele abre numa janela própria e **funciona sem internet** com a última versão aberta. O service worker busca tudo **na rede primeiro** e só usa a cópia guardada sem internet — com internet, nunca se vê versão velha. O **lembrete da meta** passou a sair pelo service worker (no Android, `new Notification()` não funciona) e, com o app instalado no Chrome/Edge, avisa **mesmo com o app fechado** (periodic background sync, lendo um recado que a página deixa no Cache Storage; o horário é aproximado, o navegador escolhe quando acorda).

### Seus dados
*Perfil > Seus dados > Baixar uma cópia do meu estudo*: um JSON com tudo o que é da pessoa (respostas, revisões, favoritos e anotações, cartões pessoais, conjuntos, simulados, comentários), e nada de ninguém mais. O administrador máster tem o mesmo botão ao lado do backup completo.

### Livro de Ouro
Doações, colaborações e apoios, mantidos pela coordenação, mais um reconhecimento calculado automaticamente. **Fica no rodapé da tela inicial** e em Configurações — não ocupa linha no menu.

### Grupos e rodízio de blocos
O aluno usa por padrão o calendário oficial da coordenação e escolhe a sua turma depois de entrar, em **Meu Grupo** — pode entrar numa que já existe (com aprovação de quem a criou) ou criar a sua. Cada grupo tem um banco de questões próprio.

**Cada pessoa fica em uma turma só.** Entrar numa turma é sair da anterior (`entrarNoGrupo()`), inclusive na lista de membros: antes dava para aparecer como membro de três ao mesmo tempo e ninguém sabia mais quem estava em qual. Sair de todas devolve o calendário oficial, nunca "nenhum calendário". Enquanto o aluno não escolheu, o painel inicial o lembra disso — no calendário oficial ele vê o bloco do Grupo A, que pode não ser o dele.

**A sequência de blocos pertence ao ano da faculdade, não ao grupo.** Todas as turmas do mesmo ano passam pelos mesmos blocos, na mesma ordem e nas mesmas janelas de data; o que muda de uma para outra é **por qual bloco ela começa** (`grupo.deslocamento`). É o rodízio real: enquanto uma turma está em Pediatria, a outra está em Clínica Médica, e no bloco seguinte elas trocam. Anos diferentes têm sequências diferentes, porque a matéria é outra.

**O rodízio tem nome: Grupo A, B, C, D… até L, no 5º ano.** Ninguém sabe o próprio "deslocamento"; todo mundo sabe que está no grupo B. A ponte entre as duas coisas é o campo `grupoRodizio` do bloco: a letra escrita no bloco de índice *i* da sequência é a da turma que **começa** ali, ou seja, a de deslocamento *i*. É um dado editável, e não uma conta a partir do índice, porque no calendário real do 3º ano as letras não seguem a ordem alfabética (A, D, C, B). Onde a coordenação não preencher nada, vale a ordem alfabética. Toda tela que pede a turma — criar grupo, editar grupo, a tabela de turmas do admin — oferece "Grupo A — começa em TOCE…", em ordem de letra.

**O 3º ano é o calendário real da faculdade**, transcrito do quadro que a coordenação distribui: quatro janelas de data (20/07–21/08, 24/08–02/10, 05/10–06/11, 09/11–04/12 em 2026) e quatro blocos — TOCE & Semiologia da Mulher, Cardiocirculatório, Oftalmo/Infecto/Medicina Baseada em Evidências e Psiquiatria & Vigilância em Saúde — girando entre os grupos A, B, C e D. A tela de Blocos de Estudo reproduz esse quadro linha a linha, para conferir contra o papel.

**O 4º ano também, e ele gira em ciclo.** Transcrito do quadro "BLOCO / PERÍODO": **dez blocos, dez janelas e dez turmas (A a J)** — URI/ANEST (Nefro, Uro e Anestesio), TEG (Dermato e Cirurgia Plástica), RESP (Pneumo e Cirurgia Torácica), NERV (Neuro e Neurocirurgia), LOCOM (Reumato e Ortopedia), DIGEST (Gastroclínica e Gastrocirurgia), ORL CP (Otorrino e Cabeça e Pescoço), ENDOC/MU (Endócrino, Medicina Baseada em Evidências e Medicina de Urgência), CM HEMATO (Clínica Médica e Hematologia) e MULHER CCA (Saúde da Mulher, da Criança e Preventiva). Cada turma desce o quadro um bloco por janela, então basta `grupoRodizio` (A, J, I, H… de cima para baixo), sem `turmasPorJanela`. As datas do quadro (26/01 … 04/12) são o **fim** de cada janela; o início é o dia útil seguinte ao fim da anterior. O quadro não diz duas pontas, que ficaram **a confirmar**: a primeira janela começa em 05/01 e, depois de julho, a sétima em 20/07. Plástica, Cabeça e Pescoço, Medicina de Urgência e Clínica Médica geral não existem como especialidade na taxonomia; entrou a mais próxima (comentado bloco a bloco em `dados/calendario.js`).

**O 5º ano também — e ele não gira em ciclo.** Transcrito do quadro "CURSO MÉDICO – 5ª SÉRIE – 2026": **doze janelas de data, doze estágios e doze turmas (A a L)**. No primeiro semestre as turmas A–F estão nos seis primeiros estágios (Atenção Básica, Medicina de Família, Clínica Cirúrgica 1 e 2, Saúde da Criança e do Adolescente, Livre Escolha) e as G–L nos seis últimos (Ginecologia Enfermaria, Gineco/Obstetrícia, Psiquiatria/Oftalmo, Ambulatório Interdisciplinar, Clínica Médica & Medicina Laboratorial, DIPA); no segundo semestre elas trocam de metade.

O rodízio do 5º ano **não é um ciclo**: o quadro emparelha os estágios dois a dois (quem faz Clínica Cirúrgica 1 na primeira janela faz a 2 na segunda, e vice-versa), e nenhuma conta a partir do índice reproduz isso. Por isso cada estágio carrega a **linha do quadro impresso** no campo `turmasPorJanela`: a turma que está nele em cada janela, na ordem das janelas — é literalmente a linha do papel, para conferir célula a célula. Onde esse campo existe, ele manda; onde não existe (3º ano, 4º, 6º), vale o ciclo de sempre. Nenhuma tela precisa saber qual das duas formas o ano usa: todas passam por `conteudoDaJanela()`.

**O calendário oficial** não tem ano fixo: serve a todos, e cada aluno enxerga a sequência do **seu** ano, começando pelo primeiro bloco (o Grupo A).

**"Formado(a)" não tem calendário.** Quem já se formou não cursa calendário de faculdade nenhum, então esse ano saiu da tela de Blocos de Estudo e não tem sequência própria (`CONFIG.anosSemCalendario`). O que ele **não** perdeu foi o grupo: continua entrando em turmas normalmente e, dentro de uma, acompanha o calendário do ano dela; fora de qualquer turma, a plataforma usa a sequência do ano padrão como referência (`anoDeReferencia()`), e diz isso na tela em vez de fingir que existe uma "sequência de Formado(a)".

---

## 4-B. Conta e nuvem (estudo em vários aparelhos)

Até esta versão, tudo vivia no `localStorage` de um navegador só: quem estudava no notebook não continuava de onde parou no celular. A nuvem resolve isso **sem tirar nada de lugar** — o `localStorage` continua sendo a fonte de verdade da tela; a nuvem é uma cópia que sobe e desce por trás.

**Como liga.** Dois valores em `CONFIG.nuvem` (`url` e `chaveAnon`), no `index.html`. Vazios, a plataforma se comporta exatamente como sempre se comportou, só com aquele navegador — nenhum código de nuvem roda. O passo a passo completo está em `nuvem/LEIA-ME.md`, e o banco inteiro (tabelas, índices, RLS, gatilhos) em `nuvem/esquema.sql`.

**Onde mora.** Supabase (PostgreSQL + autenticação + PostgREST). Escolhido por ser o backend que mapeia quase direto para o objeto `db` e por não exigir escrever servidor nenhum: o app conversa por `fetch` com a API REST, sem SDK, sem dependência nova.

**O que é de todo mundo** (ver `NUVEM_GLOBAIS` e o calendário): o calendário de blocos, o **Livro de Ouro**, as questões com **formatação aprovada** e os **comentários e dúvidas** nas questões (desde 24/09). Todos leem; grava quem tem o papel (equipe; na formatação, também residentes). A fila dessas tabelas é de chaves, e a linha é montada na hora de subir — duas edições seguidas sobem uma vez, e remover sobe como `removido`.

**O que sobe** (doze tabelas, ver `NUVEM_TABELAS` no código): perfil, respostas, repetição espaçada de questões e de cartões, dias com cartão revisado (**e quantos cartões em cada dia**), favoritos de questão (**com a anotação pessoal de cada uma**), **favoritos de flashcard**, **questões escondidas**, cartões pessoais, sessões concluídas, notas de simulado e a fila em andamento — esta última com as alternativas marcadas e riscadas de cada questão.

> **Quem já tinha o banco criado precisa rodar o `nuvem/esquema.sql` de novo.** Quatro novidades dependem dele: a anotação da questão salva (`favoritos.nota`), a contagem de flashcards por dia (`dias_cartoes.quantidade`), os **flashcards favoritados** (tabela `favoritos_cartoes`) e as **questões escondidas** (tabela `questoes_ocultas`). O arquivo traz o `alter table … add column if not exists` de cada coluna e o `create table if not exists` de cada tabela nova, sem mexer no que já existe.
>
> Enquanto o SQL não for rodado, a plataforma **não quebra e não perde nada**. Uma COLUNA que falta é detectada na recusa e o lote é reenviado sem ela (`NUVEM_CAMPOS_NOVOS`); uma TABELA que falta é anotada e pulada na subida e na descida (`_nuvemTabelasAusentes`) — antes, um 404 numa tabela nova derrubaria a descida inteira, que é o oposto do que uma novidade deve fazer. O que ficou de fora segue guardado no navegador e sobe sozinho depois do SQL e de um F5, e *Perfil > Conta e sincronização* diz exatamente o que está faltando.

**O que NÃO sobe:** o conteúdo. Questões e flashcards da equipe são iguais para todo mundo e continuam vindo da pasta `dados/` — não faz sentido guardar uma cópia por aluno. Continuam locais também: feedbacks, turmas e as cargas da Central de Provas (ver seção 8).

**Contas da turma, calculadas no banco.** Duas coisas precisam enxergar mais de uma pessoa e, por isso, são **funções** no banco (SECURITY DEFINER) que devolvem o mínimo: `notas_do_simulado(chave)` — só o id aleatório de cada tentativa e a nota, para o percentil — e `painel_turma()`/`atividade_por_semana()` — números somados por aluno, e só para professor e administrador (`e_equipe()`), para o Painel da Turma. Nenhuma resposta, anotação ou cartão pessoal sai delas.

**Confirmação de e-mail e "esqueci a senha" voltam para o site.** Cadastro, reenvio da confirmação e pedido de nova senha mandam `redirect_to` com o endereço da própria página (`nuvemEnderecoDeRetorno()`; ou `CONFIG.nuvem.enderecoDoSite`, se preenchido). Na volta, `nuvemTratarRetornoDoEmail()` lê o resultado depois do `#` **antes do roteador**, apaga o token do endereço na hora e mostra a tela `retorno-email`: "e-mail confirmado — falta a coordenação aprovar" (ou entra direto, se já aprovada), a troca de senha, ou "este link não vale mais" com os botões para pedir outro. Tentar entrar sem ter confirmado abre a janela de reenviar o link. O painel do Supabase precisa aceitar o endereço em *URL Configuration* (pendência 2, no topo).

**Backup.** O backup de *Configurações* copia o que está naquele navegador. A cópia da turma inteira é o **backup automático** (`.github/workflows/backup-nuvem.yml`): todo dia, `pg_dump` das tabelas do Esc e das contas, criptografado com uma senha da coordenação e guardado 30 dias no GitHub. A restauração num banco novo foi testada (contas primeiro, tabelas depois). Precisa dos dois segredos (pendência 3).

**Conflito entre dois aparelhos.** Registros (respostas, sessões, notas) nunca se sobrescrevem, só se juntam — responder no celular e no computador resulta nas duas respostas. A única exceção é o **conjunto concluído**, que é registro mas **atualizável** (`atualizavel: true`): depois de ver o resumo, a pessoa pode voltar e responder uma questão que tinha ficado em branco, e aí aquela linha muda de placar em vez de ganhar uma cópia velha ao lado. Estado (repetição espaçada, favoritos, metas, cartões pessoais) vale a versão mais recente, guardado **questão a questão**, e não num bloco único, para que uma divergência afete um item e nunca o histórico inteiro.

**Sem internet não para.** Cada gravação entra numa fila (`db.filaNuvem`) guardada no navegador e sobe em bloco. O que desce usa uma **marca d'água por tabela** (`db.nuvem.marcas`), com o horário **do servidor** — relógio adiantado num celular pularia registros.

**O ritmo da sincronização** (`NUVEM_RITMO`, na seção 2-C do código) é este, e está escrito num lugar só:

| Quando | Quando sobe |
|---|---|
| Acabou de mexer em alguma coisa | 2 s depois |
| Mexeu várias vezes seguidas | tudo junto, num envio só (teto de 5 s desde a primeira alteração que está esperando) |
| Aba aberta e parada | a cada 45 s |
| Voltou para a aba | na hora |
| A internet voltou | na hora |
| Entrou na conta | na hora |
| Saiu da conta | na hora |
| A fila passou de 25 itens | na hora |

O agrupamento é o centro disso: responder três questões seguidas vira **um** envio, não três. O teto existe para quem não para de mexer — sem ele, a fila ficaria indefinidamente no navegador. Com a aba escondida o ciclo de 45 s para (não adianta gastar rede numa tela que ninguém vê) e volta a valer quando a aba volta, que já sincroniza na hora.

**Sair da conta sobe primeiro.** É o último momento em que aquele aparelho pode enviar o que fez, então a saída não pergunta nada quando consegue resolver sozinha: sobe e sai. A pergunta só aparece no caso em que ela tem resposta possível — o envio não passou (sem internet, servidor fora) e a pessoa decide entre tentar de novo ou sair assim mesmo, com a fila guardada para o próximo acesso daquele aparelho.

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

### O conjunto é do dia, não do clique
Clicar em "sessão recomendada" sorteava um conjunto novo toda vez. Quem respondia cinco questões, saía para conferir o desempenho e voltava perdia o começo e recomeçava do zero — e a meta diária virava um monte de começos, o mesmo defeito que a sessão retomável tinha resolvido para quem fecha o navegador, mas não para quem só troca de tela. Agora o conjunto pertence ao DIA: continua de onde parou o dia inteiro e só se renova quando o dia vira (ou quando o anterior termina). Um conjunto inacabado de outro dia não é jogado fora em silêncio — a plataforma pergunta, porque a fila de ontem foi montada com a matéria e os vencimentos de ontem.

### O cartão é o botão
O flashcard tinha um botão "Mostrar resposta" embaixo e, ao mesmo tempo, virava ao ser tocado. Dois caminhos para a mesma coisa, e o botão puxava o olho para fora do cartão justamente no segundo em que a pessoa deveria estar tentando lembrar. Ficou só o cartão, com o convite dentro dele. A estrela no alto (favoritar) é a exceção que não vira o cartão: o clique dela para em si mesma.

### Favoritos tem duas abas porque são duas coisas
Questão salva é "quero rever esta questão"; cartão salvo é "quero rever este conceito". Quem vem procurar aquela questão de choque séptico não quer tropeçar em cartão no meio do caminho, e vice-versa — então são duas listas, duas abas e duas tabelas na nuvem, com a contagem de cada uma na própria aba. Salvar um cartão não mexe na repetição espaçada dele: a pilha de favoritos é para quando a pessoa quer escolher o que revisar, e não para quando o algoritmo escolhe.

### Uma tela para prova inteira, com a diferença à vista
Simulados e Provas Antigas eram dois itens de menu para o mesmo gesto — "fazer uma prova no relógio" — e obrigavam a lembrar em qual deles estava o que se queria. Viraram uma tela com duas abas. Juntar não é apagar a diferença: prova antiga é a prova real de uma instituição num ano, e serve para medir contra a banca; simulado é um recorte montado pela equipe, e serve para treinar um bloco. As notas dos dois são a mesma coisa (uma prova feita), então o histórico fica embaixo das duas abas, uma vez só.

### O histórico conta o dia, não só o conjunto
Só conjunto concluído virava linha no histórico, e com isso sumia metade do estudo: as questões respondidas soltas e os flashcards. A unidade passou a ser o dia — tudo o que houve nele, inclusive quantos cartões —, com os conjuntos daquele dia listados por dentro. O dia é clicável como um conjunto e reabre o mesmo feedback questão a questão, montado na hora a partir das respostas: não existe "conjunto do dia" guardado, e inventar um seria criar histórico que ninguém fez.

### Pular é permitido; chutar para destravar, não
A fila andava só para frente depois de responder. Quem empacava numa questão tinha duas saídas ruins: abandonar o conjunto inteiro, ou chutar só para passar — e esse chute entra no histórico como se fosse um chute de verdade, desregulando a repetição espaçada e a calibração da confiança. Agora a fila anda para os dois lados sem exigir resposta: a questão pulada fica **em branco** no mapa (clicável, com o número à vista) e volta quando a pessoa quiser. O que não afrouxou foi a regra que importa: **toda resposta registrada tem a confiança declarada**. Pular não registra nada.

Tecnicamente, isso só é possível porque a resposta passou a ser guardada pela **posição** na fila (`respostasSessao[i]` é a resposta de `itens[i]`, e a posição pulada fica vazia), e não empilhada na ordem em que as respostas aconteceram. Quem precisa contar quantas foram feitas usa `respostasFeitas()`, nunca `.length` — numa fila com buracos, `.length` diria "5 feitas" onde houve 2.

### Marcar não é responder — e por isso também tem memória
Marcar uma alternativa é dizer "acho que é esta"; responder é bater o martelo e declarar a confiança. Entre as duas coisas cabe ver a questão seguinte, conferir a anterior ou fechar o navegador, e nada disso pode apagar o que a pessoa já tinha decidido. A marca é guardada **por questão** (`sessao.marcadas[questaoId]`), como os riscos, e volta com ela — dentro do conjunto, ao reabrir a fila e em outro aparelho, já que a sessão em andamento sobe para a nuvem. No mapa, a questão com marca pendente aparece com a borda âmbar: tem rascunho esperando confiança.

### A tela não pisca a cada clique
A plataforma inteira é redesenhada a cada mudança de estado (`render()`), e isso valia também para marcar uma alternativa dentro de uma questão: o HTML todo era jogado fora e remontado, com a animação de entrada da página tocando de novo — a tela "piscava" a cada clique no meio de um conjunto de questões. Agora, quando a **tela é a mesma**, só o miolo é trocado (`desenharTela`), o menu e o topo são reescritos no lugar e a animação de entrada, que existe para sinalizar *troca de tela*, só toca quando a tela realmente troca. Dentro da sessão vai um passo além: marcar ou riscar uma alternativa redesenha **só o cartão da questão** (`redesenharQuestaoDaSessao`), porque é só ele que muda.

### A anotação da questão salva é particular
Salvar uma questão quase sempre vem com um motivo — "não entendi por que não é a C", "conferir a dose", "cai todo ano" — e esse motivo sumia: semanas depois a pessoa reencontrava o enunciado sem lembrar o que queria tirar a limpo ali. A anotação fica **junto do favorito daquele usuário** (`favoritos[].nota`), é privada (ninguém mais vê, nem a coordenação) e sobe para a nuvem com a conta. Não se confunde com os **comentários** da questão, que são dúvida feita à equipe, pública, e alimentam a fila de dúvidas. Anotar numa questão que ainda não estava salva salva a questão junto — era isso que a pessoa ia fazer de qualquer jeito —, e tirá-la dos favoritos leva a anotação junto, porque a anotação é sobre a questão guardada, não sobre a questão.

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

### O cadastro pergunta o ano, e só
A tela de cadastro pedia também a turma, com a opção de criar uma na hora. Era a pergunta errada no momento errado: quem acabou de chegar não tem como saber qual turma é a dele antes de ver a lista, e cada tentativa deixava para trás uma turma solta que ninguém mais usava. Agora o cadastro pergunta **o ano da faculdade**, que a pessoa sabe de cor, e a turma se escolhe depois, em Meu Grupo, com as turmas existentes à vista e o bloco em que cada uma está hoje.

### Esconder é da pessoa, não da questão
"Não mostrar mais" tira a questão do estudo de quem pediu, e só dele: ela não vira anulada, não sai do banco, das provas antigas nem das estatísticas da turma. A prova inteira continua inteira (esconder uma questão de uma prova antiga a deixaria com buraco). O filtro mora num lugar só, `questoesParaEstudo()`, usado por toda tela que MONTA fila de estudo; o que conta o banco ou monta prova continua em `questoesAtivas()`.

### A versão velha não pode ficar presa no navegador
Quase todo "não consigo entrar" depois de uma atualização era o navegador reaproveitando a cópia guardada — às vezes o `index.html` novo com um `calendario.js` velho. Agora (1) cada `<script src="dados/…?v=VERSÃO">` leva a versão no endereço, (2) ao abrir, a página baixa o `index.html` do servidor sem cache e, se a versão (`window.ESC_VERSAO`) mudou, recarrega sozinha — uma vez só por versão, para não virar laço —, e ao voltar para a aba mostra uma tarja com "Atualizar agora" em vez de interromper, e (3) a tela de entrada ganhou **"Problemas para entrar?"**, com "Carregar a versão mais nova" e "Esquecer o acesso salvo" (descarta o login guardado da nuvem, sem tocar em estudo nenhum). **A cada publicação, troque a data de `ESC_VERSAO` e das onze linhas `?v=`** (localizar e substituir); esquecer não quebra nada, só não força a atualização.

### Virada de ano letivo em um campo
Em 2027 as datas do calendário não são as de 2026, mas a estrutura é: mesmos blocos, mesma duração, mesmos intervalos entre um e outro. Reescrever oito pares de datas à mão é exatamente onde se erra. *Admin > Blocos de Estudo > Virada de ano letivo* pede só **a data em que o primeiro bloco começa** e desloca a sequência inteira, preservando a duração de cada bloco e o intervalo até o próximo (o fim de semana entre dois blocos, o recesso do meio do ano) — com a tabela "hoje → fica" à vista antes de confirmar. Ajuste fino de um bloco específico continua sendo edição daquele bloco.

### Prioridade é incidência vezes erro, e não um dos dois
"O que mais cai" sozinho mandaria todo mundo estudar Bioestatística para sempre, inclusive quem já acerta; "onde você erra" sozinho empurraria assuntos que caíram uma vez em cinco anos. O produto dos dois é o que interessa: o quanto a pessoa ganharia na prova se acertasse aquele assunto. E a conta se explica na tela, porque um número de prioridade sem a conta à vista é só mais uma ordem arbitrária.

### A nota estimada vem com a faixa
Uma nota sem margem, calculada com 40 respostas, seria lida como profecia. Mostrar "66%, provavelmente entre 61% e 70%" — e dizer que a faixa estreita com o uso — é o mesmo número, dito com honestidade.

### Prova antiga é só questão real
Questão autoral no estilo da banca é ótima para estudar e péssima para medir contra a banca. Na tela que existe para medir ("a prova de verdade, do jeito que caiu"), ela contaminava a nota e inventava uma prova de 2021. As anuladas, ao contrário, **são** da prova — ficam fora da nota porque não têm gabarito, mas aparecem, para ninguém achar que a prova está incompleta.

### Figura que falta é dita, não escondida
Uma questão que pergunta "qual o tratamento do ECG a seguir" sem o ECG não é uma questão mais difícil: é uma questão quebrada. Em vez de uma imagem quebrada ou de nada, ela diz o que a prova mostrava e que a figura ainda não foi anexada — e basta salvar o arquivo com o nome certo para ela aparecer.

### O painel da turma é para agir, não para vigiar
Por isso ele ordena por "quem precisa de atenção primeiro" (parado, nunca começou, caindo) e não por ranking de acerto, e por isso os números saem somados do banco, sem nenhuma resposta individual.

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
- **O que mais cai e nota estimada** (`CONFIG.incidencia`): acerto de assunto com poucas respostas puxado para o acerto geral com peso de **4 respostas** (`respostasDePeso`); **0,6** de acerto presumido para quem ainda não respondeu nada; peso de até **4×** na ordem dos assuntos da sessão recomendada (`pesoNaSessao: 3`; 0 desliga); os **15** assuntos de maior prioridade ganham o motivo "cai muito"; nota estimada a partir de **30** respostas.
- **Cores das barras:** `--barra-acerto` e `--barra-erro`, definidas nos dois temas.

Os parâmetros de algoritmo são editáveis pela tela Configurações (administrador máster), sem tocar no código.

---

## 7. Organização do código

**Três lugares, e a divisão é limpa.** O `index.html` é a moldura; a pasta `codigo/` tem o código; a pasta `dados/` tem o conteúdo, em doze arquivos carregados nesta ordem: `taxonomia.js`, `calendario.js`, `banco-didatico.js`, `prova-unifesp-2022..2026.js`, `flashcards-equipe.js`, `flashcards-assuntos-novos.js`, `simulados-equipe.js` e `demonstracao.js`.

**O carregador.** A lista `window.ESC_ARQUIVOS = { dados: [...], codigo: [...] }`, no fim do `index.html`, diz o que carregar e em que ordem; um trecho curto escreve, durante a leitura da página, uma linha `<script src="pasta/nome.js?v=VERSÃO">` por arquivo — elas rodam uma depois da outra, exatamente como linhas escritas à mão, e funcionam com o arquivo aberto com dois cliques. A versão (`ESC_VERSAO`) fica **num lugar só**, no alto do `index.html`, e vai no endereço de todos os arquivos (antes eram doze datas para trocar). O visual (`codigo/estilo.css`) vem do mesmo jeito. Se um arquivo de `codigo/` não chega, a página diz qual.

**A pasta `codigo/`** segue as seções numeradas de sempre, então "a seção 17" continua sendo a mesma coisa — agora dentro de um arquivo:

| Arquivo | Seções | O que tem |
|---|---|---|
| `01-config.js` | 1 | guia de manutenção, `CONFIG`, estado global, tema |
| `02-persistencia.js` | SEED_*, 2 | apelidos do conteúdo, conferência dos arquivos, `loadState`/`saveState`, migrações, rede de segurança do banco |
| `03-nuvem.js` | 2-C | nuvem inteira: entrar, cadastrar, e-mail de volta, mapa das tabelas, fila, sincronização, percentil, painel |
| `04-utilitarios.js` | 3 | datas, paginação, gráficos SVG, janelas, rodízio, permissões de admin |
| `05-motor-de-estudos.js` | 4 | dificuldade, repetição espaçada, flashcards, sessões, desempenho, **o que mais cai e nota estimada** |
| `06-entrada-e-estrutura.js` | 5–7 | autenticação local, roteador, menu e topo |
| `07-telas-iniciais.js` | 8–10-B | telas públicas, retorno do e-mail, primeiro acesso, painel inicial, Estudar, questão na íntegra |
| `08-sessao-e-revisao.js` | 11–12 | motor de sessão, cartão da questão (e a figura que falta), comentários, Revisão |
| `09-flashcards-e-provas.js` | 12-B–14, 12-C | Revisão Rápida, simulados, Provas Antigas, **cartões em lote** |
| `10-telas-do-aluno.js` | 16–19 | Favoritos, Livro de Ouro, Histórico, Meu Desempenho, Meta, Meu Grupo, Perfil, "meus dados" |
| `11-telas-da-equipe.js` | 20–25-B, 24-C | criar simulado, PDF, difíceis, dúvidas, cadastros, banco, taxonomia, **Painel da Turma** |
| `12-importacao-e-central.js` | 26–26-B | importar questões, Central de Provas |
| `13-admin-e-inicializacao.js` | 27–28 | Blocos, Configurações, versão nova, **aplicativo instalável** e a INICIALIZAÇÃO (sempre o último) |

Os arquivos dividem o mesmo espaço (são scripts comuns, sem `import`): uma função escrita num é usada nos outros. A única regra é que código que **roda na hora da carga** só pode usar o que veio antes — e a divisão foi conferida com um analisador (nenhum trecho de carga usa algo de um arquivo posterior) e com o teste de fumaça.

**Os testes** (`testes/`, `npm test`; rodam no GitHub a cada envio, `.github/workflows/testes.yml`): o **conferidor da pasta `dados/`** (ids, gabaritos, taxonomia, provas completas de 1 à última, figuras que faltam — `npm run conferir` imprime o relatório); o **teste de fumaça** (Chromium de verdade, cada papel passando por todas as telas do menu, responder uma questão, celular sem rolagem lateral, arquivo aberto com dois cliques, falhando em qualquer erro de JavaScript); **regras** que já quebraram uma vez (o dia vira à meia-noite de Brasília, conta de demonstração com nuvem, prova antiga só com questão real, cartões em lote); a **nuvem simulada** (as chamadas ao Supabase respondidas por um servidor de mentira: e-mail de volta, esqueci a senha, comentário subindo, percentil, Painel da Turma); o **aplicativo** (manifesto e abrir sem internet); e o **`esquema.sql` num PostgreSQL de verdade** (banco novo, rodar duas vezes, e as regras de segurança com contas de mentira — `testes/sql/`).

Cada arquivo de `dados/` chama uma função da ponte `window.EscDados` — `registrarTaxonomia`, `registrarCalendario`, `registrarQuestoes`, `registrarFlashcards`, `registrarSimulados` ou `registrarDemonstracao` — **antes** do código. Por isso **todos os `SEED_*` viraram apelidos**: `const SEED_QUESTOES = window.EscDados.questoes`, e assim por diante para taxonomia, blocos, sequências do ano, usuários, livro de ouro, comentários e simulados. Mexer num `SEED_*` no `index.html` não muda conteúdo nenhum.

As listas **se somam** entre arquivos: dois arquivos chamando `registrarQuestoes` resultam nas questões dos dois. É o que permite acrescentar uma prova (ou mais assuntos na taxonomia) criando um arquivo novo e uma linha `<script>`, sem tocar no que já existe. A ordem das linhas é a ordem em que o conteúdo entra no banco, e a taxonomia vem primeiro porque todo o resto aponta para ela.

`demonstracao.js` é o arquivo a **esvaziar** quando a turma real entrar: contas de teste, comentários de exemplo e o livro de ouro fictício saem de uma vez, sem perder questão, cartão nem calendário.

As seções numeradas em caixa alta continuam as mesmas (use Ctrl+F no arquivo da tabela acima):

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

**Funções-chave acrescentadas na rodada de 22/09:**

| Função | O que faz |
|---|---|
| `NUVEM_RITMO` | a tabela de "quando sobe o quê" (2 s, teto de 5 s, 45 s, fila de 25), num lugar só |
| `nuvemSincronizarAgora(opts)` / `nuvemCicloOcioso()` | o envio imediato (aba, internet, entrar, sair, fila grande) e o ciclo da aba aberta e parada |
| `respostaDoIndice(s,i)` / `respostasFeitas(s)` / `indicesEmBranco(s)` | leem a fila de respostas **com buracos**: a resposta de uma posição, só as feitas, e as que ficaram em branco |
| `marcadaDaQuestao(qid)` | a alternativa marcada e ainda não confirmada daquela questão |
| `desenharTela(html)` / `animarEntradaDaPagina(el)` | trocam só o miolo quando a tela é a mesma; a animação de entrada só toca na troca de tela |
| `htmlMenuLateral(u)` / `htmlTopo(u)` | as duas partes da estrutura, separadas do conteúdo para poderem ser reescritas sozinhas |
| `htmlCartaoDaSessao(s)` / `redesenharQuestaoDaSessao()` | redesenham só o cartão da questão (marcar, riscar) |
| `fecharSessaoPratica()` | o fechamento de fato do conjunto; `finalizarSessaoPratica()` passou a perguntar antes quando há questões em branco |
| `notaDaFavorita(id,qid)` / `salvarNotaFavorita(id,qid,txt)` / `abrirNotaFavorita(qid)` | a anotação pessoal da questão salva (salva a questão junto, se ainda não estava) |
| `resumoCartoesFeitos(id)` | quantos flashcards a pessoa já fez — o cartão separado em Meu Desempenho |

**Funções-chave acrescentadas na segunda rodada de 22/09:**

| Função | O que faz |
|---|---|
| `conteudoDaJanela(seq, letra, desloc, i)` | o estágio que aquela turma cursa na janela *i* — pelo quadro do ano (`turmasPorJanela`) quando ele existe, pelo ciclo quando não |
| `sessaoDeHoje(u)` / `montarSessaoRecomendadaDeHoje()` | a sessão do dia: continuar a que existe, ou montar a de hoje |
| `diasDeAtividade(id)` / `abrirDiaDoHistorico(dia)` | o histórico por dia e o feedback do dia inteiro, montado na hora |
| `cartoesFeitosNoDia(id, dia)` | quantos cartões naquele dia (`{n, exato}`) |
| `isFavoritoCartao` / `toggleFavoritoCartao` / `meusCartoesFavoritos` | os flashcards salvos |
| `revisarCartoesFavoritos()` / `revisarSoEsteCartao(id)` | revisar a pilha de cartões salvos, ou um só |
| `renderProvasESimulados()` / `abaProvas()` | a tela única de prova inteira, com as duas abas |
| `nuvemTabelaNaoExiste(e)` / `NUVEM_CAMPOS_NOVOS` | tolerância a tabela ou coluna que o banco de quem não rodou o SQL ainda não tem |
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
| `resumoArquivosDeConteudo()` / `avisarSeFaltarConteudo()` | o que a pasta `dados/` entregou, e a tarja de aviso **dizendo qual arquivo faltou** (com onze arquivos, "não carregou" sozinho não diz onde procurar) |
| `renderMapaSessao()` / `irParaIndiceDaSessao(i)` | o mapa clicável da sessão de prática (não confundir com o mapa do simulado, que é neutro — seção 5) |

**Funções-chave acrescentadas na revisão de 21/09 (calendário do 3º ano, turmas e senha):**

| Função | O que faz |
|---|---|
| `temCalendarioProprio(ano)` / `anosComCalendario()` / `anoDeReferencia(ano)` | quais anos têm sequência de blocos, e para qual ano olha quem não tem ("Formado(a)") |
| `opcoesRodizio(ano)` / `opcoesRodizioPorLetra(ano)` | as turmas daquele ano — na ordem da sequência e em ordem de letra, que é como a pessoa procura a sua |
| `rotuloRodizio(ano, d)` / `nomeRodizio(ano, d)` / `deslocamentoDoRotulo(ano, letra)` | as duas traduções entre "Grupo B" e o deslocamento do grupo |
| `entrarNoGrupo(usuario, grupoId)` | entra numa turma **e sai de todas as outras** — uma turma por pessoa, também nas listas de membros |
| `sairDoMeuGrupo()` | volta ao calendário oficial, que é a ausência de turma (nunca "sem calendário") |
| `moverBlocoNaSequencia(ano, blocoId, direcao)` | muda a ordem da sequência trocando as **janelas de data** entre dois blocos; a letra do rodízio fica com a posição, não com o conteúdo |
| `previaViradaDeAno(ano, novaData)` / `aplicarViradaDeAno(ano)` | desloca o calendário do ano inteiro a partir da data de início do primeiro bloco, preservando durações e intervalos |
| `renderCardSenha()` / `trocarMinhaSenha()` / `nuvemTrocarSenha(nova)` | troca de senha no Perfil, para todos os papéis: pela nuvem (`PUT /auth/v1/user`, sem senha antiga porque a sessão já prova quem é) ou local (com a senha antiga, que ali é a única prova) |

**Funções-chave acrescentadas em 24/09:**

| Função | O que faz |
|---|---|
| `dataLocalISO(d)` / `hojeISO()` | a data "AAAA-MM-DD" no relógio local (o dia não vira mais às 21h) |
| `incidenciaNaBanca(banca)` / `prioridadesDeEstudo(id)` / `estimativaDeNota(id)` | o que mais cai, a prioridade de cada assunto e a nota estimada com faixa (cache por `_geracaoDb`) |
| `pesosDeIncidencia(id)` / `selecionarComInterleaving(pool, n, pesos)` | a sessão recomendada visitando primeiro, dentro do bloco, os assuntos de maior prioridade |
| `renderImagemQuestao(q)` / `imagemDaQuestaoFalhou(img, qid)` | figura da questão; tenta .png/.jpg/.jpeg/.webp e, sem arquivo, mostra o aviso de `imagemPendente` |
| `registrarComentario(qid, texto, oficial)` / `comentariosAtivos()` / `removerComentario(id)` | comentários e dúvidas, que sobem para `comentarios` (`NUVEM_GLOBAIS.comentarios`) |
| `notasDaTurmaDoSimulado(chave)` / `estatisticasRankingSimulado(chave, nota)` | percentil com as notas da turma (função `notas_do_simulado`), somadas às locais por id |
| `renderPainelTurma()` / `painelTurmaLocal()` / `nuvemPainelTurma()` / `alertasDoAluno(a)` | o Painel da Turma, da nuvem ou do navegador, com os alertas |
| `nuvemTratarRetornoDoEmail()` / `nuvemComRetorno(caminho)` / `renderRetornoEmail()` | a volta dos links de e-mail (confirmar, trocar senha, link vencido) |
| `registrarServiceWorker()` / `mostrarNotificacao()` / `atualizarRecadoLembrete()` | o aplicativo instalável e o lembrete pelo service worker |
| `renderCartoesEmLote()` / `modeloLoteCartoes()` / `analisarTextoLoteCartoes(t)` / `exportarCartoesParaDados()` | cartões em lote: prompt, conferência, publicação e exportação para `dados/` |
| `baixarMeusDados()` / `dadosDoUsuario(id)` | a cópia do estudo de uma pessoa |
| `contaDemoDaEquipeBloqueada(u)` | desliga as contas de demonstração da equipe com a nuvem ligada |

**Manutenção:** `sincronizarConteudoNovo()` acrescenta ao banco salvo qualquer área, especialidade, assunto, questão, flashcard, usuário-semente ou livro de ouro que exista no código e ainda não exista nos dados, comparando por `id`. Nada é sobrescrito nem apagado — com duas exceções estreitas, de 24/09: campos que o conteúdo ganhou depois (`numeroNaProva`, `imagemUrl`, `imagemLegenda`, `imagemPendente`, `referencias`) são **preenchidos só onde estão vazios** (`CAMPOS_QUE_O_CONTEUDO_COMPLETA`), e a instituição das questões-semente **autorais** segue o arquivo (foi o que tirou as 30 "UNIFESP-EPM" das provas reais).

**Migrações em `loadState`:** criação de `db.filaNuvem` e `db.nuvem` (fila de envio e marcas d'água da nuvem); criação de `db.cargasProvas` (Central de Provas); criação de `db.flashcards` e `db.revisoesFlashcards`; normalização de `usuarioId` nos cartões antigos (todos viram "da equipe", que é o correto — foram escritos por professores); conversão de `anoFaculdade: "Internato"` para `"6º ano"`; criação de `db.sessoesEmAndamento`, `db.diasCartoes` e `db.configGeral.metaCartoesDia`; e a migração dos blocos (abaixo).

**Migrações de 21/09 (calendário).** Um ano sem calendário próprio ("Formado(a)") tem a sequência que existia movida para `db.sequenciasArquivadas` — sai de circulação sem ser jogada fora, e continua no banco e no backup. O 3º ano, que nascera com uma sequência de exemplo (ids `b3-1` … `b3-4`), recebe a de verdade no lugar **só se ainda for a de exemplo**: quem já tinha editado o 3º ano fica com o que montou, porque sobrescrever o trabalho da coordenação é pior do que uma sequência desatualizada, que ela conserta na própria tela. E `sincronizarConteudoNovo()` passou a trazer sozinho qualquer ano que ganhe calendário no código e ainda não exista no banco salvo, sem tocar nos anos já editados.

**Migração dos blocos para sequências por ano.** `db.sequenciasAno` passa a guardar a ordem de blocos de cada ano, e o grupo guarda só `anoFaculdade` + `deslocamento`. Nada é apagado: o calendário que a coordenação tinha customizado vira a sequência do ano padrão, o calendário próprio de uma turma vira a sequência do ano dela se aquele ano ainda não tiver uma, e o que sobrar fica guardado em `grupo.blocosArquivados` — continua no banco e no backup, para consulta antes de descartar.

---

## 7-B. O banco não apaga cadastro

Tudo o que a turma produz — cadastros, respostas, favoritos, questões enviadas — vive no `localStorage`, e o conteúdo (questões, cartões, taxonomia, calendário) vive na pasta `dados/`. As duas coisas têm valor muito diferente: **recriar o conteúdo custa um F5; recriar os cadastros da turma é impossível.** Três defeitos violavam isso e foram corrigidos.

**1. Um campo torto apagava a turma inteira.** O `catch` do `loadState()` trocava o banco salvo pelo de demonstração ao primeiro erro de migração — em silêncio, só com um `console.error`. Um `db.flashcards` que não fosse lista bastava para levar junto todos os cadastros, sem volta. Agora o banco lido é **consertado, nunca substituído**: `garantirEstruturaDb()` devolve ao tipo certo só as coleções erradas, e `recuperarBanco()` roda cada etapa seguinte (taxonomia, reposição a partir da pasta `dados/`) no seu próprio `try` — uma etapa que falha custa conteúdo, que a pasta repõe, e não o cadastro de ninguém. Recomeçar do zero ficou reservado ao único caso em que não há o que preservar: nenhum usuário legível. E, antes de qualquer caminho que substitua o banco, uma **cópia de resgate** do texto original é guardada sob outra chave, restaurável em *Configurações > Backup*.

Também foi trocada a regra de entrada: um banco "sem questões" não é mais motivo para recomeçar (isso é conteúdo, e o código repõe) — só um banco que não dá para ler como objeto.

**2. `corrigirTaxonomiaAutomaticamente()` estourava sem áreas.** Ela roda dentro do carregamento e fazia `db.taxonomia.areas[0].id` sem checar se havia área — então um banco sem área nenhuma (a pasta `dados/` não ter chegado na primeiríssima abertura, ou alguém apagar as áreas na tela de taxonomia) caía no `catch` acima e apagava a turma. Agora ela sai na hora quando não há para onde classificar, e `sincronizarConteudoNovo()` repõe a taxonomia logo em seguida.

**3. Cadastro que parecia salvo e não estava.** Com o armazenamento cheio ou bloqueado (janela anônima), `saveState()` só mostrava um toast que sumia: a tela dizia "cadastro enviado", a pessoa ia embora e o cadastro não existia no recarregamento. Agora `saveState()` **devolve se gravou**, a falha abre uma janela que explica e oferece o backup em vez de um aviso que passa, e `solicitarCadastro()` desfaz o cadastro na memória e mantém a pessoa na tela em vez de confirmar o que não foi gravado.

---

## 7-C. Quem eu aprovei não sumiu — faltava a tela

Relato do usuário: André, Manuela, Amanda e José foram aprovados e "não aparecem mais". Ninguém tinha sido excluído. *Aprovar Cadastros* consulta `perfis?status=eq.pendente`: aprovar alguém tira a pessoa dali — correto, ela deixou de estar pendente — mas **ela não reaparecia em lugar nenhum**, porque *Admin > Usuários* lia `db.usuarios`, o banco daquele navegador, e o único perfil da nuvem espelhado ali é o de quem está logado (o RLS não deixa o aluno ler os outros). Quatro pessoas aprovadas, quatro pessoas invisíveis.

A política `perfis_ler` do `esquema.sql` **já** permitia a professor e administrador ler todos os perfis; o site nunca perguntava. Agora pergunta: `nuvemBuscarUsuarios()` traz a lista inteira e *Admin > Usuários* passou a ter dois blocos — **Cadastros da nuvem** (a turma de verdade, com contagem por status, papel, nível, aprovar/inativar/excluir) e **Contas deste navegador** (as de teste e as de antes da nuvem). Os avisos de aprovação passaram a dizer para onde a pessoa foi, que é o que teria evitado a confusão.

**Excluir, ao lado de inativar.** As duas respondem a coisas diferentes: inativar é "não entra mais", guardando o estudo; excluir é o cadastro que nunca deveria ter existido — duplicado, e-mail errado, alguém de fora. A janela de confirmação conta antes o que vai junto (respostas, favoritos, cartões pessoais, sessões, notas) e o que fica (questões enviadas, comentários, turmas criadas — conteúdo da turma, não dado pessoal). Na nuvem, apagar a linha de `perfis` é o que corta a entrada: sem cadastro, `nuvemEntrarPelaTela()` recusa o login mesmo com a senha certa. A conta de autenticação e as respostas já sincronizadas ficam até alguém removê-las pelo painel do Supabase — elas se ligam a `auth.users`, não a `perfis` —, e a tela diz isso em vez de prometer o que não faz.

A política de exclusão (`perfis_excluir`) é **nova no `esquema.sql`**: um projeto criado antes dela recusa o DELETE em silêncio, então o código confere o resultado em vez de confiar no 200 e avisa exatamente o que rodar. Ninguém exclui a própria conta, e a trava do "último administrador máster" passou a contar **cada lado com os seus**: uma conta local de demonstração é máster só daquele navegador e não passa no `e_equipe()` do banco, então contá-la deixaria a coordenação se rebaixar e ninguém mais poder administrar a nuvem.

---

## 8. Limitações conhecidas

1. **A nuvem cobre o estudo, os cadastros e agora a colaboração principal** — comentários e Fila de Dúvidas, percentil de simulado, Painel da Turma, Livro de Ouro, calendário e formatação aprovada. O que ainda é local a um navegador: **grupos e turmas** (quem está em qual), **feedbacks** e o **relatório de turma em PDF** (que lê as contas do navegador; o Painel da Turma é o substituto com a nuvem).
2. **Banco cobre uma só banca.** As 500 questões reais são todas da UNIFESP-EPM. As outras 5 bancas de referência (`CONFIG.instituicoesReferencia`) ainda não têm nenhuma questão real — só entram se o usuário conseguir os PDFs oficiais, pelo mesmo processo já usado para a UNIFESP (seção 12). *(Em volume puro o banco já foi testado sintético em mais de 6.000 questões e 8.000 respostas, sem travamento perceptível em nenhuma tela — não é mais o gargalo.)*
3. **Os 376 cartões dos assuntos novos ainda não foram lidos por um professor.** Cobrem os 125 assuntos que não tinham nenhum, com a fonte de cada um, mas estão marcados `revisao: "pendente"` — o mesmo cuidado pedido para as explicações (seção 10).
4. **As contas de demonstração continuam sendo de demonstração**: com a nuvem desligada, a senha fica em texto claro no `SEED_USUARIOS` e não serve para uso público real. Com a nuvem ligada, a conta de verdade é a do Supabase — senha com hash no servidor, nunca copiada para o `db` local —, mas as quatro contas `@esc.demo` continuam existindo ao lado, para testar sem criar conta. Elas já são o mínimo (uma por papel, uma só de administrador) e só a de aluno tem botão de acesso rápido, mas trocar a senha da conta de administrador antes de publicar continua sendo trabalho de quem publica.
5. **O backup automático da nuvem depende de dois segredos no GitHub** (pendência 3, no topo). Até lá, o único backup é o manual do administrador máster, que copia só aquele navegador. Cada pessoa já pode baixar o próprio estudo em *Perfil*.
6. **Cartão pessoal é privado, não é segredo.** O isolamento é por papel na interface e nas funções; qualquer pessoa com acesso ao mesmo navegador e ao console enxerga tudo, como em qualquer dado do `localStorage`.
7. **Uma sequência de blocos por ano, e só uma.** Duas turmas do mesmo ano não podem ter ordens diferentes de matéria — por decisão de projeto, elas diferem só pelo ponto de entrada. Se um dia for preciso que uma turma tenha uma sequência realmente distinta, será um campo novo (`grupo.sequenciaPropria`) e mais uma migração.
8. ~~`somarDias()` usava `toISOString()`~~ — **corrigido em 24/09**, junto com um defeito maior que ele escondia: `hojeISO()` também usava UTC, então **no Brasil o "hoje" da plataforma virava às 21h** (a meta do dia zerava, a sequência de dias pulava, a sessão do dia se renovava antes da meia-noite). As duas passaram a usar a data local (`dataLocalISO`), e um teste com o relógio em Brasília às 22h30 garante que não volta.
9. **Conteúdo criado pela plataforma não sobe para a nuvem.** Questão publicada por *Importar Questões* ou pela *Central de Provas* (e a carga em andamento) fica no navegador de quem publicou, mesmo com a nuvem ligada: o conteúdo é igual para todo mundo e mora na pasta `dados/`, versionada junto com o código. Para virar conteúdo de todos, a questão precisa ser levada para lá (`dados/LEIA-ME.md`). É uma decisão de projeto, não um esquecimento — mas é o atrito mais visível de quem usa a Central de Provas em dois aparelhos.
10. **A pasta `dados/` precisa ser publicada junto.** Publicar só o `index.html` faz o site abrir com a tarja de aviso e sem conteúdo nenhum — nem questões, nem taxonomia, nem calendário. Quem já usava não perde nada (o banco salvo no navegador continua lá), mas conteúdo novo não entra. A tarja diz qual arquivo faltou.
11. **Lembrete de meta com o app fechado só no Chrome/Edge com o app instalado**, e em horário aproximado (o navegador decide quando acordar o service worker). Nos outros navegadores (inclusive Safari/iPhone), só com o Esc aberto em alguma aba. Aviso exato com tudo fechado exigiria push de servidor.
12. **Figuras das provas.** 13 questões reais dependem de uma figura que ainda não foi anexada (lista em `dados/imagens/LEIA-ME.md`). Elas avisam na tela, mas só ficam completas com o recorte do PDF oficial.
13. **Rotas de equipe abertas pela URL.** Um aluno que digite `#/usuarios` no endereço ainda vê telas de equipe com os dados **daquele navegador** (a nuvem é protegida pelo banco). O Painel da Turma já confere o papel; as outras telas antigas não.

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

1. **As três pendências do topo** (rodar o `esquema.sql`, URL Configuration, segredos do backup). Sem a primeira, comentários, percentil da turma e Painel da Turma não funcionam na nuvem.
2. **Anexar as 13 figuras das provas** (`dados/imagens/LEIA-ME.md`): recortar do PDF oficial e salvar com o nome indicado — nada mais precisa mudar.
3. **Revisão humana dos 376 cartões novos** (`revisao: "pendente"`) e, com a ferramenta de lotes, levar os assuntos que mais caem a 5 ou mais cartões.
4. **Repetir a carga de provas reais para as outras 5 bancas de referência** (USP-SP/FMUSP, USP-RP/FMRP, Santa Casa de São Paulo, IAMSPE, UNESP), se o usuário conseguir os PDFs oficiais. Agora isso é feito **pela própria plataforma**, sem script nem edição do arquivo: a **Central de Provas** (seção 4) cadastra a prova, corta em lotes, dá o modelo pronto de cada faixa e confere o que chegou — e vários lotes podem andar em paralelo.
5. **Checagem humana amostral das 500 explicações autorais.** Foram escritas em lote, com boa fundamentação e revisão de consistência automatizada, mas nunca foram lidas por um segundo médico/residente. Vale um professor ou residente revisar uma amostra (por exemplo, as questões mais avançadas ou as anuladas, onde a explicação é mais interpretativa) antes de tratar o conjunto como validado clinicamente.
6. **Relatório individual do aluno em PDF**, para devolutiva um a um — agora com os números do Painel da Turma à mão.
7. **Levar as turmas para a nuvem** (quem está em qual grupo), o que ainda falta da colaboração.
8. **Exportar questões publicadas pela plataforma para `dados/`**, como os cartões em lote já fazem.
9. **Fechar as rotas de equipe para quem não é da equipe** (seção 8, item 13), com uma checagem de papel no roteador.

---

## 11. Como pedir alterações numa nova conversa

Anexe este resumo e o arquivo de `codigo/` da tela ou regra em questão (tabela da seção 7), e descreva o que quer em português corrente. Se o pedido for sobre conteúdo (uma prova, os flashcards), anexe também o arquivo da pasta `dados/` que interessa — não o resto. Numa conversa com acesso ao repositório inteiro, peça para rodar `npm test` antes de enviar. Convenções que o projeto segue e vale manter:

- Tudo em **português do Brasil**, inclusive nomes de funções e variáveis.
- Comentários no código explicando a **regra em linguagem simples**, pensados para quem não programa.
- Nenhuma dependência externa nova; nada de framework. (Os gráficos são SVG escrito à mão; o PDF usa a impressão do navegador.)
- Toda alteração no modelo de dados vem acompanhada de migração em `loadState` — e, se o dado for sincronizado, de mais uma entrada em `NUVEM_TABELAS` e da tabela correspondente em `nuvem/esquema.sql`, com RLS.
- **Código em `codigo/`, conteúdo em `dados/`, moldura no `index.html`.** Questão nova não volta para dentro do código; arquivo novo entra na lista `ESC_ARQUIVOS`.
- **Mudou algo?** `npm test` antes de enviar (e o GitHub roda de novo). Tela nova entra sozinha no teste de fumaça se estiver no menu; regra nova merece um caso em `testes/regras.test.mjs`.
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

**Separação completa entre conteúdo e código (21/09/2026, segunda rodada).** A rodada anterior tinha tirado do `index.html` as questões e os flashcards; ficaram para trás a taxonomia (26,3 KB), as sequências do ano, os blocos, as contas de demonstração, os comentários de exemplo, o livro de ouro e os simulados. Agora saíram também, em quatro arquivos novos — `dados/taxonomia.js`, `dados/calendario.js`, `dados/simulados-equipe.js` e `dados/demonstracao.js` —, e **o `index.html` não guarda mais conteúdo nenhum**: todos os `SEED_*` viraram apelidos de `window.EscDados`.

O ganho de tamanho é modesto e vale dizer com número: 629 KB → 600 KB, 9.743 → 9.452 linhas (-4,6%). O que resta no arquivo é ~466 KB de código e templates, ~91 KB de comentários explicativos (que são parte da proposta do projeto e ficam), 30 KB de CSS e 6 KB de ícones. O ganho real é outro: a fronteira agora é nítida — quem for mexer em conteúdo nunca abre o `index.html`, e quem for mexer em código nunca esbarra em conteúdo —, e `demonstracao.js` transforma "tirar os dados de teste antes de abrir para a turma" numa edição de um arquivo só.

A ponte `window.EscDados` ganhou `registrarSimulados`, `registrarTaxonomia`, `registrarCalendario` e `registrarDemonstracao`, e passou a **somar** as listas entre arquivos em vez de substituir. A tarja de conteúdo faltando passou a dizer **qual** arquivo faltou: com onze arquivos, "não carregou" sozinho não ajuda.

**Um defeito encontrado e corrigido no caminho:** `SEED_SEQUENCIAS_ANO` referenciava `SEED_BLOCOS` pelo nome (a sequência do 6º ano *é* o calendário de referência). Movidos para arquivos diferentes, a referência ficaria pendurada e o site quebraria ao abrir. No `calendario.js` a lista ganhou um nome local e é usada nos dois lugares, dentro de um `(function(){…})()` para o nome não escapar. Foi o teste de equivalência que pegou — não a leitura do código.

**Verificado:** os nove blocos de dados saem dos arquivos idênticos ao que estava no `index.html`, item a item (comparação contra a versão anterior, em JSON); as 29 rotas nos 4 papéis sem erro de JavaScript; login de demonstração, bloco atual pelo calendário e o simulado da equipe aparecendo; *Configurações > Arquivos de conteúdo* listando os onze arquivos com a contagem certa; e três modos de falha, bloqueando arquivos de propósito — sem `taxonomia.js`, sem `demonstracao.js` e sem a pasta inteira —, em que a plataforma abre, avisa por nome e não quebra.

**Calendário real do 3º ano, turmas do rodízio e troca de senha (21/09/2026, terceira rodada).** Sete pedidos do usuário, na mesma rodada.

(1) **O 3º ano ganhou o calendário de verdade** — o quadro que a faculdade distribui, transcrito: quatro janelas de data e quatro blocos (TOCE & Semiologia da Mulher, Cardiocirculatório, Oftalmo/Infecto/Medicina Baseada em Evidências, Psiquiatria & Vigilância em Saúde) girando entre os grupos A, B, C e D. A sequência de exemplo que estava ali ("Bases da Clínica…") saiu.

(2) **O rodízio passou a se chamar pelo nome.** Ninguém sabe o próprio deslocamento; todo mundo sabe que está no grupo B. A letra virou um campo do bloco (`grupoRodizio`), porque no calendário real ela não segue a ordem alfabética (A, D, C, B) e uma conta a partir do índice daria a turma errada. Toda tela que pede a turma passou a oferecer "Grupo A — começa em TOCE…", em ordem de letra.

(3) **A coordenação passou a indicar a sequência, e não só editá-la**: setas para mudar a ordem (o conteúdo troca de janela de data e o rodízio inteiro anda junto, com a letra ficando com a posição), a letra de cada turma editável no formulário do bloco, a tabela de turmas com o grupo corrigível pelo admin sem depender de quem criou a turma, e o quadro do rodízio desenhado janela por janela, para conferir contra o papel. Para a **virada de ano**, um campo só: a data em que o primeiro bloco começa, e a sequência inteira se desloca preservando durações e intervalos, com a tabela "hoje → fica" antes de confirmar.

(4) **As contas de teste caíram de sete para quatro** — uma por papel, uma só de administrador —, e o acesso rápido sem senha ficou só no de aluno, com a checagem dentro de `fazerLoginDemo()` e não só no botão.

(5) **Toda conta troca a própria senha**, em *Perfil > Mudar a senha*: faltava para todos, mas incomodava fora do papel de aluno, que recebe a conta pronta de quem cadastrou. São dois caminhos porque são dois lugares onde a senha mora — na nuvem quem guarda é o servidor e a sessão já prova quem é a pessoa (pede-se a nova duas vezes, que é o erro que acontece de fato); numa conta local a senha antiga é a única prova, e é exigida.

(6) **O cadastro parou de perguntar a turma** e pergunta só o ano. A turma se escolhe depois, em Meu Grupo, com as turmas existentes à vista — e cada pessoa fica em **uma só**, inclusive nas listas de membros. Quem ainda não escolheu recebe o lembrete no painel inicial.

(7) **"Formado(a)" perdeu o calendário, não o grupo.** O ano saiu da tela de Blocos de Estudo e não tem mais sequência própria; quem está nele continua entrando em turmas e acompanha o calendário do ano da turma, e fora de qualquer turma vê a sequência do ano padrão — dito na tela, em vez de uma "sequência de Formado(a)" que não existe.

**Verificado com Chromium/Playwright**, sem nenhum erro de JavaScript: o quadro do rodízio do 3º ano conferido célula a célula contra o calendário da faculdade (as quatro janelas × os quatro grupos); criar turma no Grupo B e receber a ordem de blocos certa (Psiquiatria → TOCE → Cardio → Oftalmo); entrar numa turma saindo da anterior; a virada de ano de 2026 para 2027 preservando durações e intervalos; subir e descer um bloco na sequência, com a letra ficando com a posição e o desfazer voltando ao estado inicial; letra repetida recusada e letra em branco voltando ao padrão alfabético; troca de senha local recusando senha atual errada, senhas diferentes entre si e senha curta, e o login novo valendo com a antiga recusada; o cadastro sem o campo de turma; um só botão de acesso rápido, e o de professor recusado quando chamado por fora; as migrações de banco salvo — o 3º ano de exemplo sendo substituído, o 3º ano **customizado** sendo preservado e "Formado(a)" indo para `sequenciasArquivadas`; a exportação do calendário levando as letras do rodízio e sem "Formado(a)"; e as 25 rotas de aluno e de administrador abrindo limpas.

**Cadastros não se perdem mais num defeito de leitura (21/09/2026, quarta rodada).** O usuário relatou que dados prévios de cadastros estavam sendo excluídos. A investigação não achou nenhum código que apague usuários — e achou o contrário: três caminhos em que um defeito *qualquer* custava a turma inteira, todos anteriores a esta semana. O pior deles estava no `catch` do `loadState()`, que trocava o banco salvo pelo de demonstração ao primeiro erro de migração, em silêncio; reproduzido com um único campo de tipo errado, 25 cadastros somem. Os três estão descritos na seção 7-B. **Verificado com Chromium/Playwright:** os 25 cadastros, as respostas e os favoritos sobrevivendo a várias coleções estragadas ao mesmo tempo (lista virando texto, objeto virando nulo, taxonomia sem áreas, o grupo oficial sumindo, usuário sem id, `configGeral` nulo), com o conteúdo repovoado pela pasta `dados/` e a plataforma abrindo usável; o aviso aparecendo na tela e a cópia de resgate ficando disponível quando o `catch` é mesmo acionado; o cadastro sendo recusado, em vez de confirmado, quando o armazenamento não aceita gravar; e a subida da versão anterior para esta sem perder nenhum cadastro nem resposta.

**A turma da nuvem ficou visível, e excluir entrou ao lado de inativar (21/09/2026, quinta rodada).** O usuário relatou que quatro pessoas aprovadas tinham sumido, com um `400` em `/auth/v1/token?grant_type=password` no console — que é um login recusado, não perda de dado. Não houve exclusão: faltava a tela que mostra quem já foi aprovado (seção 7-C). Junto, entrou a exclusão de cadastro pedida, com a política `perfis_excluir` nova no `esquema.sql` e a trava do último administrador máster corrigida para não somar contas locais com as da nuvem. **Verificado com Chromium/Playwright contra um Supabase simulado:** os quatro nomes aparecendo em *Usuários*; aprovar um pendente e vê-lo reaparecer ali; mudar papel e status chegando ao servidor; excluir removendo da nuvem e da tela; e as quatro recusas — excluir a própria conta, excluir num banco sem a política (nada é removido e a mensagem diz o que rodar), rebaixar o último máster da nuvem, e a exclusão local levando só o estudo pessoal, com questões, comentários e cartões da equipe intactos.

**Ritmo da nuvem, fila sem trava e anotação na questão salva (22/09/2026).** Oito pedidos do usuário, na mesma rodada.

(1) **A sincronização ganhou um ritmo escrito** (`NUVEM_RITMO`, seção 4-B): 2 s depois de cada alteração, alterações seguidas agrupadas num envio só (com teto de 5 s para quem não para de mexer), 45 s de ciclo com a aba aberta e parada — antes eram 120 s, e rodando também com a aba escondida —, e envio imediato ao voltar para a aba, ao recuperar a internet, ao entrar, ao sair e quando a fila passa de 25 itens. Sair da conta passou a **subir primeiro e perguntar só se não conseguir**, em vez de perguntar sempre.

(2) **A tela parou de piscar dentro de um conjunto de questões.** A causa era estrutural: cada clique refazia a página inteira e a animação de entrada tocava de novo. Agora, na mesma tela, só o miolo é trocado, e marcar ou riscar uma alternativa redesenha apenas o cartão da questão (seção 5).

(3) **Anotação pessoal na questão salva**: um campo privado, sincronizado, para guardar a dúvida que ficou — com a coluna `favoritos.nota` nova no `esquema.sql` e um reenvio automático sem a anotação enquanto quem já tinha o banco não roda o SQL, para ninguém perder a sincronização dos favoritos por causa dela.

(4) **O prompt de segunda opinião e os dois modelos de importação** passaram a exigir a outra metade da explicação: por que **cada** alternativa errada está errada, começando pelo dado do **enunciado** que a descarta (idade, tempo de evolução, exame, comorbidade), e dizendo explicitamente quando a alternativa cai por conhecimento que não vem do caso, em vez de inventar uma pista no texto.

(5) **Pular questão virou possível** sem afrouxar a declaração de confiança (seção 5): a questão fica em branco no mapa, clicável, e o conjunto só fecha depois de perguntar quando há questões em branco.

(6) **O que foi marcado e riscado ficou com memória de verdade**: a marca sem confirmar passou a ser guardada por questão, como os riscos já eram, e volta ao navegar pelo conjunto, ao reabrir a fila e em outro aparelho.

(7) **Meu Desempenho ganhou a contagem de flashcards**, num cartão à parte: revisões no total, cartões diferentes, revisados hoje e dias com cartão. Separado das questões de propósito — cartão não tem acerto nem erro.

(8) **O primeiro quadrado de Provas Antigas parou de ficar maior que os outros.** A causa era uma regra de CSS de fora da grade (`.card + .card{margin-top:1rem}`) que se aplicava a todos os cartões **menos ao primeiro**, e por isso destacava justamente o "Esc — Banco Didático 2026". Junto, os cartões de prova passaram a alinhar os botões na base, para o nome de instituição que quebra em duas linhas não desalinhar a grade.

**Verificado neste ambiente, com o código rodando em Node dentro de um navegador de mentira** (o repositório não tem Playwright aqui): as 29 rotas nos 4 papéis desenhando sem erro de JavaScript (116 telas); a fila de questões com buracos — marcar, pular, responder fora de ordem, voltar e encontrar a marca e os riscos onde estavam —, inclusive atravessando o ida-e-volta pelo `localStorage` (o buraco vira `null` no JSON e continua buraco) e com o formato **antigo** de sessão salva abrindo sem perder nada; o histórico registrando só o que foi respondido; a anotação criando o favorito quando não havia, sobrevivendo à gravação, entrando na fila da nuvem e sumindo junto ao desfavoritar; o ritmo da nuvem (2 s, teto, fila grande subindo na hora); e a contagem de flashcards batendo com as revisões feitas. **O que não deu para verificar daqui:** o projeto Supabase de verdade (a rede desta máquina bloqueia `supabase.co`) — a coluna `favoritos.nota` precisa ser criada rodando o `nuvem/esquema.sql` no painel.

**Calendário do 5º ano, sessão do dia e favoritos de flashcard (22/09/2026, segunda rodada).** Oito pedidos do usuário, mais o calendário real do 5º ano, trazido por ele em `.docx`.

(1) **O 5º ano ganhou o calendário de verdade** (seção "Grupos e rodízio de blocos"): doze janelas de data, doze estágios e doze turmas (A a L), transcritos do quadro "CURSO MÉDICO – 5ª SÉRIE – 2026". Os quatro blocos de exemplo que estavam ali saíram. O achado da rodada: **esse rodízio não é um ciclo** — o quadro emparelha os estágios dois a dois e troca as duas metades do ano no meio do caminho, e nenhuma conta a partir do índice reproduz isso. Em vez de forçar, cada estágio passou a poder carregar a linha do quadro impresso (`turmasPorJanela`), e `conteudoDaJanela()` virou o único lugar onde se decide "quem cursa o quê, em qual janela" — o 3º ano continua girando em ciclo, sem uma linha de mudança.

(2) **A sessão recomendada virou a sessão do dia**: sair e voltar continua o mesmo conjunto, com o que já foi respondido; o conjunto só se renova quando o dia vira ou quando o anterior termina, e um conjunto de outro dia não é descartado sem perguntar.

(3) **Meu Desempenho enxugou**: saiu a barra de cobertura do banco (o ladrilho ao lado já dá o número) e os gráficos caíram de 180 para 140 px.

(4) **Provas Antigas e Simulados viraram uma tela com duas abas** — "Provas e Simulados" —, com o histórico de notas embaixo das duas e as rotas antigas ainda respondendo.

(5) **O Histórico de Atividade passou a contar o dia**, não só o conjunto: questões dentro e fora de conjunto, acerto, chutes, dúvidas, quantos flashcards e quais conjuntos fecharam ali — com o dia clicável, reabrindo o feedback questão a questão.

(6) **Flashcard agora se favorita**, com estrela no próprio cartão, e Favoritos passou a ter duas abas (Questões | Flashcards), com "Revisar os cartões salvos" para percorrer a pilha.

(7) **O botão "Mostrar resposta" saiu**: o cartão é o botão, e o convite para virar fica dentro dele.

(8) **A nuvem ficou tolerante a banco desatualizado.** Esta rodada acrescenta uma tabela (`favoritos_cartoes`) e uma coluna (`dias_cartoes.quantidade`), e um 404 numa tabela nova derrubaria a DESCIDA inteira de quem ainda não rodou o `esquema.sql` — uma novidade quebrando o que já funcionava. Agora coluna que falta é reenviada sem ela, tabela que falta é pulada, o resto sincroniza igual e o Perfil diz o que está faltando.

**Verificado com Chromium/Playwright e com o código rodando em Node:** o quadro do 5º ano conferido **célula a célula** contra o `.docx` — as 12 turmas × 12 janelas, cada turma passando pelos 12 estágios sem repetir e cada janela com uma turma por estágio —, com o 3º ano continuando exatamente como era; a sessão do dia sendo retomada em vez de re-sorteada, e perguntando quando o conjunto é de outro dia; o histórico somando conjunto + questão solta + cartões no mesmo dia e abrindo o dia inteiro no feedback; o favorito de cartão sobrevivendo à gravação e entrando na fila da nuvem; a contagem de cartões do dia; as 29 rotas nos 4 papéis sem erro de JavaScript (116 telas); e as telas novas olhadas uma a uma no navegador. **O que continua pendente daqui:** rodar o `nuvem/esquema.sql` no painel do Supabase (a rede desta máquina bloqueia `supabase.co`).

**Calendário do 4º ano, erros por questão, questões escondidas e cache antigo (23/09/2026).** Quatro pedidos do usuário, com o quadro do 4º ano trazido em imagem.

(1) **O 4º ano ganhou o calendário real**: dez blocos (URI/ANEST, TEG, RESP, NERV, LOCOM, DIGEST, ORL CP, ENDOC/MU, CM HEMATO, MULHER CCA), dez janelas e dez turmas (A a J), em ciclo (seção 4, "Grupos e rodízio"). Os cinco blocos de exemplo (`b4-1…b4-5`) saem: a troca do exemplo pelo real virou uma regra só para o 3º, 4º e 5º ano (`SEQUENCIAS_DE_EXEMPLO` + `trocarSequenciaDeExemplo()`), que roda ao abrir a página **e depois da descida do calendário da nuvem** — antes, um exemplo salvo lá desceria de novo por cima do real. Turma com bloco fixado num bloco de exemplo volta à detecção por data. Ficam a confirmar com a coordenação: o início da 1ª janela (05/01) e o da 7ª, depois de julho (20/07).

(2) **Quantas vezes a questão foi errada**: selo no cartão da questão, frase no feedback e uma lista nova em Revisão, da mais errada para a menos.

(3) **Não mostrar mais**: esconder uma questão só para si, com a lista de escondidas para trazer de volta. Tabela nova na nuvem, `questoes_ocultas` — precisa rodar o `esquema.sql` (até lá, fica no navegador e sobe depois, como as outras novidades).

(4) **Dificuldade de acesso por cache prévio**: versão no endereço dos arquivos de `dados/`, conferência de versão nova ao abrir e ao voltar para a aba, e "Problemas para entrar?" na tela de entrada (seção 5).

**Verificado com Chromium/Playwright:** o quadro do 4º ano conferido **célula a célula** contra a imagem (10 blocos × 10 janelas, pelas mesmas funções que as telas usam) e os dez fins de janela; o exemplo antigo trocado pelo real (no navegador e vindo da nuvem) e um 4º ano editado preservado; o contador (2 erros em 3 tentativas) no cartão, fora do simulado e no feedback; a questão escondida fora da sessão do dia em 30 sorteios, da revisão, das filas e das listas por filtro, mas dentro do banco e do PDF, e só para quem escondeu; esconder e mostrar entrando na fila da nuvem e a linha da nuvem aplicando e removendo; a recarga automática com versão nova no servidor, sem laço, e a tarja na segunda vez; "Esquecer o acesso salvo" limpando só a sessão; e as 28 rotas nos 4 papéis sem erro de JavaScript.

**Formatação aprovada, Livro de Ouro na nuvem, página inicial, contagem por filtro, painel compacto e primeiro acesso (24/09/2026).** Seis pedidos do usuário.

(1) **Revisar Formatação** ganhou "Aprovar formatação": a questão sai da fila de **todos** os revisores (tabela global `formatacao_aprovada`, gravável por professor, admin e residente — `e_revisor()` no esquema) e vai para a aba "Já aprovadas", de onde "Devolver à fila" a traz de volta. Aprovar é sobre a forma, não o conteúdo clínico; a questão não muda em nada.

(2) **Livro de Ouro na nuvem**: salvar e remover sobem sozinhos (tabela global `livro_ouro`, todos leem, a equipe grava), e "Enviar todos para a nuvem", em Configurações, manda os registros feitos antes. O mecanismo é genérico (`NUVEM_GLOBAIS`, `nuvemMarcarGlobalPendente`, `nuvemEnviarGlobaisPendentes`, `nuvemBaixarGlobais`) e tolera a tabela que ainda não existe, como as outras.

(3) **Página inicial** reescrita: projeto sem fins lucrativos, de alunos e ex-alunos da Escola Paulista de Medicina, para os alunos de lá; boas-vindas ("espero que isso os ajude"), o recado de que é uma comunidade que depende de quem usa, um resumo da plataforma com os números tirados do conteúdo carregado, e como ajudar.

(4) **Estudar > Monte sua própria lista** mostra, ao vivo, quantas questões do banco os filtros marcados dão (`lerFiltrosPersonalizados()`, a mesma leitura que o "Gerar lista" usa).

(5) **Painel da equipe**: as quatro caixas grandes viraram fichas pequenas lado a lado (`.stat-mini`), clicáveis, com "formatação a revisar" e "cadastros pendentes" entre elas; as ações viraram uma fileira de botões.

(6) **Primeiro acesso**: o aluno que entra pela primeira vez (sem turma e sem nenhuma resposta) vê as boas-vindas antes do painel — confirma o ano, escolhe o grupo do rodízio e a meta de questões por dia. "Pular" também conta como visto; a data sobe no perfil (`perfis.boas_vindas_em`). Para o grupo, nasceram as **turmas do rodízio**: uma por ano e letra, abertas (sem aprovação), com id que diz ano e grupo (`rodizio-<ano>-<deslocamento>`) — em outro aparelho, onde a turma ainda não existe, ela é recriada a partir do `grupo_id` da pessoa. Meu Grupo também ganhou o atalho "qual é o seu grupo?".

**Verificado com Chromium/Playwright:** aprovar tira da fila e aparece em "Já aprovadas", devolver sobe como `aprovada=false`, a linha da nuvem aplica e o aluno não enfileira; o Livro de Ouro salvando, removendo e recebendo da nuvem; um ciclo de sincronização contra um servidor falso (sobe o pendente, desce o novo, avança a marca d'água e pula a tabela que falta sem erro); a contagem mudando com os filtros; o painel com as fichas; as boas-vindas para um aluno novo, salvando meta, grupo e data, não reaparecendo, não aparecendo para a conta de demonstração e "pular" contando como visto; a turma do rodízio recriada a partir do id; e as 26 rotas em 5 contas sem erro de JavaScript.

**Sugestões da conversa de 24/09: divisão do código, testes, provas reais sem mistura, o que mais cai, nota estimada, app instalável, nuvem para a turma e cartões dos assuntos novos (24/09/2026, à tarde).** O usuário pediu sugestões para a plataforma e, em seguida, que fossem feitas quase todas, mais três pedidos novos (confirmação de e-mail com volta ao site, dados dos estudantes por ano para professores e coordenação, gráficos menores no computador).

(1) **O código saiu do `index.html`** para `codigo/` (treze arquivos na ordem das seções, e `estilo.css`), com um carregador que monta os `?v=` a partir de uma versão só. Antes de dividir, um **teste de fumaça** foi escrito e rodado contra a versão antiga, e um analisador conferiu que nenhum trecho executado na carga usa algo de um arquivo posterior; o mesmo teste passou depois da divisão.

(2) **Testes automáticos** (`testes/`, 27 casos no navegador e no Node, mais o `esquema.sql` num PostgreSQL, rodando no GitHub): conferidor de `dados/`, fumaça em todos os papéis e no celular, regras, nuvem simulada, aplicativo e o `esquema.sql` num PostgreSQL de verdade.

(3) **Provas reais sem mistura.** O conferidor achou que 30 questões autorais diziam "UNIFESP-EPM" e entravam nas provas de Provas Antigas (a de 2024 com 101 questões; uma "prova de 2021" inexistente) — viraram do Banco Didático, e Provas Antigas passou a mostrar só questão real, na ordem original, com as anuladas listadas à parte. As 500 reais ganharam `numeroNaProva`; 13 que dependem de figura da prova avisam e apontam para `dados/imagens/`.

(4) **O que mais cai × onde você erra**, **Se a prova fosse hoje** e a sessão recomendada ponderada pela prioridade (seção 4).

(5) **Correções rápidas:** zoom liberado no celular; contas de demonstração da equipe desligadas com a nuvem; e a data local — `hojeISO()` virava o dia às 21h no Brasil.

(6) **Gráficos de Meu Desempenho** não crescem mais que ~15% do tamanho desenhado (o das 5 áreas chegava a ~600 px de altura num monitor largo) e o das áreas fica ao lado da tabela.

(7) **Aplicativo instalável** (PWA), abrindo sem internet, com o lembrete da meta pelo service worker.

(8) **Nuvem para a turma:** comentários e Fila de Dúvidas, percentil da turma, **Painel da Turma** por ano da faculdade, confirmação de e-mail e "esqueci a senha" voltando ao site, "meus dados" e o backup automático criptografado. No caminho, o banco local achou um defeito antigo: **num projeto Supabase novo, o `esquema.sql` parava na linha 58** (função criada antes da tabela que ela lê) — corrigido com `set check_function_bodies = false`, como faz o `pg_dump`.

(9) **376 cartões** para os 125 assuntos que não tinham nenhum, e a ferramenta de **cartões em lote**.

**Verificado:** os 27 testes passando (Chromium/Playwright) e o teste do banco (PostgreSQL 16); o `esquema.sql` num banco novo e rodado duas vezes; as regras de segurança com contas de mentira (aluno não comenta em nome de outro, não se dá resposta oficial, não vê o painel; residente não vê o painel; visitante sem login não lê nada); a restauração completa do backup num banco novo (contas primeiro, tabelas depois: 17 vínculos e 49 regras de segurança de volta); e capturas de tela de Meu Desempenho, Estudar, Provas Antigas, Painel da Turma e dos cartões em lote. **O que não deu para verificar daqui:** o projeto Supabase de verdade (a rede desta máquina bloqueia `supabase.co`) — daí as três pendências do topo — e as figuras das provas, que dependem dos PDFs oficiais.
