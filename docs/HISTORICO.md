# Esc — histórico de revisões

O que mudou em cada rodada de trabalho e por quê, da mais antiga à mais recente. **O estado atual não está aqui**: está no código, no `CLAUDE.md` (como o código funciona) e no `RESUMO-PROJETO-ESC.md` (o que a plataforma faz e o porquê de cada decisão). Consulte este arquivo só quando precisar da história de uma decisão que o código e o resumo não expliquem.

Até 28/09/2026 este registro era a seção 12 do resumo, que ia anexado a toda conversa; saiu de lá para não gastar leitura com o passado a cada pedido.

## Rodadas

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

**Carga das 580 questões reais da USP-SP/FMUSP, 2022-2026 (26/09).** O usuário enviou um arquivo único com as cinco provas de Acesso Direto (2022 com 100 questões; 2023 a 2026 com 120), gabarito e explicações já produzidas por outra IA, pedindo revisão. Enunciados, alternativas e gabaritos foram mantidos (nenhum gabarito foi julgado errado; os sites oficiais estavam bloqueados pela rede, então a conferência foi por raciocínio clínico, e as poucas questões discutíveis dizem na explicação que seguem o gabarito oficial). As explicações, porém, tinham problemas sérios: cerca de 258 eram um texto-modelo genérico ("O dado-chave do enunciado…"), 56 defendiam uma letra diferente do gabarito (em 2024, quase sempre por deslocamento de letras) e 9 de 2023 (q102–110) eram de outras questões — todas reescritas de forma autoral. As marcações de figura e de assunto do material também não eram confiáveis e foram refeitas: 253 questões ficaram com figura pendente (algumas com alternativas só visuais, marcadas "ver figura"), e a taxonomia ganhou 2 especialidades e 19 assuntos, com 57 cartões novos (`dados/flashcards-assuntos-usp.js`). Validado com `npm run conferir` (sem erros) e os 27 testes.

**Figuras e gabaritos da USP-SP a partir dos cadernos em PDF (26/09, mais tarde).** O usuário enviou os cadernos de 2022, 2024, 2025 e 2026 (edições da Medway só com a prova e a folha de respostas, sem comentários; o de 2023 não veio). Um script (PyMuPDF) localizou cada questão pelo título "QUESTÃO N.", juntou as imagens e desenhos da faixa dela (incluindo as letras A–D das alternativas que eram só imagem) e recortou 191 figuras, gravadas em `dados/imagens/` como `.png` (tabelas, traçados) ou `.jpg` (fotos), ~16 MB no total; cada recorte foi conferido a olho. Quatro figuras que eram só texto (prescrições, quadro de vacinas, tabela de razões de verossimilhança, quadro de suspensão de medicamentos) viraram texto nas alternativas, e outras oito ganharam alternativas transcritas junto com a imagem. A leitura das figuras mostrou que 5 questões tinham figura sem estar marcadas (2022-9, 2024-19, 84 e 92, 2025-65) e 2 estavam marcadas sem ter (2024-28, 2026-46); a 2026-107 ganhou o quadro "Note e adote" no enunciado. As 40 explicações que diziam "descrição a completar" e mais 3 fracas foram reescritas descrevendo cada imagem e cada alternativa. Os gabaritos das quatro provas bateram com a folha de respostas dos cadernos, com uma exceção: a 2024-15 (sífilis congênita), que o material de origem dava como anulada e o caderno dá como A — passou a valer A, com explicação nova. Ficaram pendentes as 60 figuras de 2023 e a 2026-63 (foto de criança removida da edição consultada, em respeito ao ECA).

**USP-SP 2023, parte 1 do caderno (26/09, depois).** Chegou um PDF com as páginas com imagem das questões 1 a 56 de 2023 (mesma edição, sem a folha de respostas). O mesmo script recortou 32 figuras — 31 das pendentes e a tomografia de tórax da questão 9, que não estava marcada —, conferidas a olho; a página solta sem cabeçalho de questão (ultrassonografia de 12 semanas) foi atribuída à questão 34. As quatro explicações de 2023 que esperavam figura nesse trecho (3, 13, 43 e a 9) foram reescritas descrevendo as imagens. Faltam 29 figuras de 2023: a 30 (tabela de exames, fora das páginas recebidas) e as das questões 56 em diante; os gabaritos de 2023 ainda não foram conferidos com a folha de respostas.

**Carga das 400 questões reais da USP-RP/FMRP, 2023-2026 (27/09).** O usuário enviou o caderno oficial e a folha de gabarito de 2026 e, para 2023 a 2025, PDFs de uma edição comentada (texto da prova com o gabarito e um comentário de cursinho por questão, sem figuras). Um script (PyMuPDF) extraiu enunciado, alternativas e gabarito — os comentários foram descartados sem uso — e corrigiu erros de digitação e de extração (palavras quebradas, trechos repetidos, uma propaganda colada na alternativa D da 2025-100). As 400 explicações foram escritas de forma autoral, questão a questão, no padrão das outras provas (por que a correta é correta e por que cada alternativa errada está errada, com referências), e um script confere que cada uma começa pela letra do gabarito. As 35 figuras de 2026 foram recortadas do caderno e conferidas a olho antes de escrever as explicações que dependiam delas; as 82 figuras de 2023 a 2025 ficaram pendentes, descritas em `imagemPendente`. A 2025-99 chegou sem o caso clínico e ficou como rascunho (fora do estudo e das provas antigas) até ser transcrita. Quatro gabaritos são discutíveis e a explicação diz isso: 2024-45 (cetoacidose euglicêmica: a alternativa sobre as gliflozinas também é verdadeira), 2024-60 (TSH alto com T4 baixo é hipotireoidismo primário, e o gabarito dá hipopituitarismo), 2025-40 (o DIU de cobre é categoria 1 da OMS e o gabarito prefere a pílula de progestágeno) e 2025-50 (a OMS recomenda cálcio a partir de 20 semanas, e o gabarito diz que nenhuma profilaxia deve ser prescrita). A taxonomia ganhou 3 assuntos, com 3 cartões cada. Validado com `npm run conferir` (sem erros nem avisos) e os 27 testes.

**Carga das provas de 2021 e 2022 da USP-RP/FMRP (27/09).** O usuário enviou mais duas edições comentadas, no mesmo formato de 2023 a 2025, e o mesmo processo foi seguido: extração de enunciado, alternativas e gabarito por script, comentários descartados sem uso, correção de erros de digitação e de extração (rótulos de tema e rodapés colados no texto, a pergunta final que faltava nas 2022-8 e 2022-23, uma propaganda colada na 2022-100) e 218 explicações autorais, conferidas por script quanto à letra do gabarito. A edição de 2021 não traz a questão 7 (o arquivo tem 118 questões) e colava à 2021-97 o enunciado de outra questão, sem gabarito, que foi descartado; trechos que chegaram cortados estão marcados como "[texto incompleto no material de origem]". Nenhuma figura veio junto: 76 ficaram pendentes (44 de 2021 e 32 de 2022). Três gabaritos são discutíveis e a explicação diz isso: 2021-87 (na cloaca, a hidrocolpo também explica a massa no hipogástrio, e o gabarito dá hidronefrose), 2022-14 (o gabarito dá só o IECA, mas o bloqueador de canal de cálcio também é opção aceitável) e 2022-15 (a família com filhos adotivos é chamada de "funcional" pelo gabarito, e nuclear por muitos autores). Nenhum assunto novo. Com essa carga o banco salvo no navegador passou do limite do `localStorage` (as questões e os cartões somavam 5,3 milhões de caracteres, e o Chrome aceita cerca de 5,2 milhões por site; antes da carga já eram 4,8) e **todo salvamento passou a falhar** — os testes de tela pegaram. A correção: o navegador deixou de repetir o texto do conteúdo-semente, que já chega da pasta `dados/` a cada abertura; de cada questão ou cartão com semente, grava só o id e os campos que diferem dela, e o carregamento remonta o item inteiro (`compactarParaArmazenar()` e `expandirDoArmazenamento()`, em `codigo/02-persistencia.js`). O banco salvo caiu para cerca de 150 KB; bancos gravados antes continuam sendo lidos como estão; um item cuja semente não carregou fica fora das telas mas continua gravado, e volta quando ela voltar; e correções feitas em `dados/` passam a chegar a quem já usava, exceto no campo que a equipe tiver editado. A falta da 2021-7 ficou registrada em `LACUNAS_CONHECIDAS`, no conferidor (`testes/conferir-dados.mjs`), que só aceita buraco numa prova com motivo escrito. Validado com `npm run conferir` (sem erros nem avisos) e os 27 testes, mais um teste manual de salvar, recarregar e editar.

**Carga das provas de 2022 e 2023 da AMRIGS e arquivo de pendências (27/09).** O usuário enviou o caderno e o edital de gabaritos definitivos da prova unificada AMB/AMRIGS/ACM/AMMS (FUNDATEC) de 2022 e de 2023, e só o edital de gabaritos de 2021 — esta ficou de fora, à espera do caderno. Um script (PyMuPDF) extraiu enunciado, alternativas e o gabarito de Acesso Direto (4 anuladas), e localizou as figuras pela posição na página; as 14 foram recortadas e conferidas a olho, e na 2023-54, cujas alternativas são ilustrações, as quatro ficaram numa figura só. Legendas soltas ("Figura 3") saíram do texto, e a tabela da 2023-94 foi reescrita em linha. As 200 explicações são autorais; as justificativas publicadas pela banca não foram usadas. A banca alterou alguns gabaritos após recursos (2022-46, 47 e 98; 2023-1, 4, 16 e 30), e as explicações seguem o definitivo; em 15 questões o gabarito oficial é discutível diante da literatura, e a explicação diz isso. Nenhum assunto novo; `CONFIG.instituicoesReferencia` ganhou a AMRIGS. Na mesma leva foi criado o `PENDENCIAS.md`, na raiz, com tudo o que falta no banco de questões — provas e questões ausentes, textos incompletos, gabaritos a conferir e as 233 figuras. Validado com `npm run conferir` e os 27 testes.

**Carga das provas de 2024 e 2025 da AMRIGS (27/09).** Mesmo processo das anteriores, com o caderno e o edital de gabaritos definitivos de cada ano (provas de 17/11/2024 e 01/2025). Nos dois cadernos o texto de algumas páginas sai do PDF fora de ordem, e o extrator passou a ordenar os blocos pela posição (sem mudar nada em 2022 e 2023, conferido pela regeneração). As 9 figuras foram recortadas e conferidas; na 2024-46 (instrumentais) e na 2024-60 (gráficos), as alternativas são as próprias imagens. A banca anulou 6 questões (2024-5, 66 e 74; 2025-39, 75 e 96) e alterou após recursos as 2024-3 e 14 e a 2025-58; em 8 questões o gabarito é discutível e a explicação diz isso (lista em `PENDENCIAS.md`). Validado com `npm run conferir` e os 27 testes.

**Questões sem figura fora do estudo e tutorial de uso (27/09).** (1) As 233 questões que dependem de uma figura ainda não anexada deixaram de aparecer para os alunos: `aguardaImagem(q)` (verdadeiro enquanto a questão traz `imagemPendente`) tira a questão de `questoesAtivas()` — e, com isso, do estudo, da revisão, da lista de erros, das provas antigas e dos simulados montados pela equipe —, e também das listas montadas à mão (`iniciarSessaoComLista`), dos simulados já existentes e das sessões guardadas. O cartão da prova antiga diz quantas ficaram de fora. A equipe as encontra em *Banco de Questões › Status › Aguardando imagem* (com selo na lista) e, na tela de edição, enviar a imagem ou marcar "a imagem já foi salva em dados/imagens/" libera a questão (`imagemLiberada` impede que o aviso volte da semente). O conferidor avisa quando a figura já está na pasta e a questão continua marcada. (2) O **tutorial** (novo `codigo/13-tutorial.js`; a inicialização passou a ser o `14-admin-e-inicializacao.js`, sempre o último): tour rápido por papel ao entrar, com "não mostrar mais", e guia completo, os dois também no menu e no Perfil. Navegador de automação não recebe o tour automático, para não cobrir as telas que os testes clicam. Três testes novos (a separação das questões, a liberação pela equipe e o tutorial) e dois ajustados; 29 testes passando.

**Provas da graduação, figura no envio e aviso de pedido de acesso (28/09).** Quatro pedidos do usuário.
(1) **Aviso de pedido de acesso.** Quem aprova cadastros (permissão `cadastros`: máster e coordenação) passou a ser avisado quando alguém pede acesso: `vigiarPedidosDeAcesso()` (seção 2-C) confere a fila da nuvem logo que a pessoa entra e depois a cada dois minutos, e `checarPedidosDeAcesso()` avisa só o que é novo para aquela pessoa (`u.cadastrosAvisados`, guardado no navegador) — aviso na tela, número no menu ao lado de *Aprovar Cadastros* e no cartão de Notificações do Início, que antes contavam só os cadastros daquele navegador e agora somam os da nuvem (`quantosPedidosDeAcesso()`). Em *Aprovar Cadastros*, o cartão *Avisos de novos pedidos* liga a notificação do sistema, que aparece quando o Esc está aberto em outra aba ou janela. O dono de uma turma também passou a ver no Início quantas pessoas pediram para entrar nela. Aviso por e-mail ou com o Esc fechado exigiria uma peça no servidor (um webhook do Supabase), e ficou de fora.
(2) **Figura anexada por quem envia.** Na pré-visualização de *Enviar/Importar Questões* e da *Central de Provas*, cada questão ganhou o seu lugar para anexar a imagem (arquivo, reduzido e comprimido como no formulário, ou link) e a legenda. O prompt pede à IA `IMAGEM: sim` (com a descrição) em vez de um endereço que ela não tem; a questão marcada assim, ou cujo enunciado fala de "ECG a seguir", "imagem abaixo" etc., aparece destacada ("falta a imagem"). Se a transcrição disse que há figura e ela não foi anexada, a questão entra com `imagemPendente` — fora do estudo até a figura chegar, como as das provas da pasta `dados/`. Na Central, as figuras ficam guardadas com o lote (`lote.imagens`) até a publicação. De quebra, desmarcar uma questão na pré-visualização da Central trocava o botão "Publicar no banco" pelo "Importar" da outra tela; `redesenharPreviewImportacao()` guarda as opções e corrigiu isso. A compressão de imagem, que estava repetida, virou `comprimirImagemDoArquivo()`.
(3) **Residência × graduação.** Toda questão tem um tipo de prova (`tipoProva`, `CONFIG.tiposProva`): **residência** (o padrão — sem o campo, é residência) ou **graduação** (provas da faculdade e Teste de Progresso; a instituição "Teste de Progresso" é reconhecida sozinha, `tipoProvaDe()`). Escolhe-se o tipo em *Enviar/Importar Questões* (com residência já marcado; o prompt e a linha `TIPO:` do cabeçalho acompanham, e cada questão da pré-visualização pode trocar), na *Central de Provas* (por prova) e no formulário do Banco de Questões. *Provas Antigas* separa as duas em seções e em atalhos com a contagem; *Estudar › Monte sua própria lista* e o *Banco de Questões* ganharam o filtro; o cartão da questão mostra o selo "Prova da graduação". O conferidor da pasta `dados/` recusa `tipoProva` fora dos dois valores.
(4) **3º e 4º ano estudam primeiro pela graduação** (`CONFIG.anosQuePriorizamGraduacao`, lista vazia desliga). Na sessão recomendada, dentro de cada assunto, a questão da prova da graduação vem antes (`selecionarComInterleaving(..., tipoPreferido)`, `primeiroDoTipo()`), com o motivo dito na questão; nada sai do estudo, muda só a escolha. *Provas Antigas* abre pela seção da graduação, com a explicação, e a tela Estudar avisa do ajuste. Hoje o banco não tem nenhuma prova da graduação: até a primeira chegar, tudo continua como estava. Testes novos em `testes/provas-e-avisos.test.mjs`.

**Questões enviadas sobem para a nuvem, com as imagens (28/09).** Pedido do usuário: as questões enviadas pela plataforma, inclusive as com imagem, vão para a nuvem, e a equipe as anexa ao banco. Até aqui, a questão criada por *Enviar/Importar Questões*, pela *Central de Provas* ou por *Nova questão* ficava só no navegador de quem enviou (limitação 9 da seção 8): a coordenação nunca via a sugestão do aluno, e a questão que ela própria publicava não chegava à turma.
(1) **O banco.** Tabela global `questoes_enviadas` (`nuvem/esquema.sql`, 11-E): a questão inteira em `dados`, com autor, `status` (`pendente` → `aprovada`, ou `recusada`, ou `removida`) e o `motivo` da recusa. RLS: aluno envia só em nome próprio e só como pendente, e só mexe na sua enquanto ela está pendente; residente e equipe publicam já aprovada; a equipe aprova, corrige, recusa e remove; a turma lê as aprovadas (e as removidas, para a remoção chegar a todos); conta pendente não envia nada. As **imagens** vão para o Storage do Supabase (balde público `questoes`, 11-F, até 2 MB, só imagem, cada pessoa na própria pasta) — a linha guarda só o endereço, para não encher o `localStorage` de cada aluno com imagem em texto. Função nova `e_aprovado()`.
(2) **O site.** A tabela entra em `NUVEM_GLOBAIS` com envio próprio (`enviar`): a imagem `data:` sobe primeiro (`nuvemEnviarImagemDaQuestao`) e a questão passa a apontar para o endereço público, depois vai a linha (`linhaDaQuestaoNaNuvem`, com a especialidade/assunto criados no envio em `taxonomiaNova`). Toda tela que cria ou muda questão chama `nuvemMarcarQuestao()`; recusa e exclusão (`nuvemMarcarQuestaoFora()`) ficam em `db.nuvem.questoesDecididas` até subir. O que desce (`aplicarQuestaoDaNuvem`) põe a aprovada no banco de todos, a pendente no de quem enviou e no da equipe, tira a recusada/removida, e guarda para quem enviou o andamento dos próprios envios (`db.nuvem.meusEnvios`). Questões da pasta `dados/` e de grupo não sobem. Sem o balde de imagens (SQL não rodado), a questão com imagem espera na fila sem travar o resto e *Perfil* avisa; uma recusa do RLS vira registro recusado, em vez de travar a sincronização.
(3) **As telas.** *Controle de Qualidade › Enviadas pela Turma* (era "Sugeridas por Alunos") mostra quem enviou, a miniatura da imagem, o tipo de prova, e ganhou **Recusar** com motivo; o Início avisa a equipe das enviadas aguardando. *Enviar Questões* ganhou **Suas questões enviadas** (aguardando, aprovada, recusada com o motivo) e o botão que sobe as questões antigas que ficaram só no navegador. *Banco de Questões* ganhou **Exportar para a pasta dados/**, que baixa as aprovadas pela plataforma num arquivo `registrarQuestoes(...)` pronto, avisando no cabeçalho o que falta (número na prova, assunto novo para `taxonomia.js`).
(4) **Testes.** `testes/questoes-na-nuvem.test.mjs` usa um Supabase de mentira que guarda linhas e arquivos e percorre o caminho inteiro (envio com imagem, fila da equipe, aprovação chegando a outra aluna, recusa com motivo, exclusão, balde ausente, botão das antigas, exportação). As regras do banco entraram em `testes/sql/regras.sql`, e o Supabase de mentira do CI ganhou o `storage`. De passagem: o teste SQL "painel conta os últimos 7 dias" falhava entre 0h e 3h UTC (gravava as respostas com a data UTC e o painel conta pela de Brasília) — corrigido no próprio teste.

**Barra de questões fina, senha, tutorial, feedback na nuvem, Questões para Atualizar e desempenho (28/09).** Seis pedidos do usuário.
(1) **Barra de navegação do conjunto de questões.** Na prática e no simulado, o mapa de números virou uma barra fina de uma linha (`htmlBarraDeQuestoes`): "feitas/total", o trilho de números que rola de lado com a questão atual centralizada (`centralizarBarraDeQuestoes`, chamado a cada desenho) e o botão que expande para o conjunto inteiro, com a legenda (`state.mapaSessaoExpandido`, que substitui `mapaSessaoAberto`). A barra de progresso separada saiu — a barra já diz quantas foram feitas. O simulado continua dizendo só respondida/em branco.
(2) **Trocar a senha exige a senha atual** também na conta da nuvem: `nuvemConferirSenhaAtual()` entra de novo com ela (`grant_type=password`) antes do `PUT /auth/v1/user`; errada, nada muda. A conta local já exigia.
(3) **Tutorial só em Perfil e configurações.** O item "Tutorial" saiu do menu lateral; o item "Perfil" virou "Perfil e configurações", onde fica *Ajuda e tutorial*. Os textos do tour e do guia foram ajustados.
(4) **Feedback da plataforma na nuvem.** Tabela `feedbacks` (11-G, função nova `e_admin()`): quem escreve envia em nome próprio e nunca "lido"; os administradores leem todos e marcam como lidos. `NUVEM_GLOBAIS.feedbacks`, contador de não lidos no menu, paginação e o aviso de quando a lista é só a do navegador. **Defeito encontrado de passagem**, ao testar no PostgreSQL de verdade: o upsert que o site usa para gravar linha de outra pessoa (o professor removendo o comentário de um aluno) passa pela regra de inserção do RLS e era **recusado** — o teste SQL antigo usava `update` puro e não pegava. Agora esse caso vai como `PATCH` (`alheia`/`colunaChave` no descritor), para comentários e feedback; o teste SQL confere os dois caminhos.
(5) **Questões para Atualizar** (seção 26-D e 4 acima): a tela da equipe e dos residentes, a tabela `correcoes_questoes` (11-H; todos leem, `e_revisor()` grava), a correção calculada como diferença em relação à pasta `dados/` (`correcaoDaQuestao`, só campos de conteúdo), `NUVEM_GLOBAIS.correcoes_questoes` com a figura subindo antes (`nuvemSubirImagem`, agora comum às questões enviadas), o arquivo de atualizações e `ferramentas/aplicar-atualizacoes.mjs` (`npm run atualizar-dados`). O formulário de edição passou a registrar a correção de toda questão da pasta, e deixou de trocar "rascunho" por "ativa" sem querer.
(6) **Otimização.** `getQuestao`/`getAssunto`/`getEspecialidade` usam um índice id → posição que se confere sozinho (`buscarPorId`), em vez de varrer as 2.700 questões a cada chamada; e `compactarParaArmazenar` (que roda em todo `saveState`, isto é, a cada resposta) compara primitivos direto e guarda o JSON da semente — com 3.000 respostas, o `saveState` caiu de ~64 ms para ~16 ms e a Revisão desenha em metade do tempo.
(7) **Testes.** `testes/atualizacoes-e-feedback.test.mjs` (conserto subindo com a figura e chegando à aluna, desfazer, o arquivo de atualizações; feedback chegando ao administrador e o PATCH do "lido"; senha exigindo a atual; a barra fina no celular e o tutorial fora do menu) e `testes/ferramentas.test.mjs` (a ferramenta editando no lugar). As regras das duas tabelas novas entraram em `testes/sql/regras.sql`.

**Código mais fácil de ler e de mexer, e mais barato de carregar (28/09).** Pedido do usuário: otimizar a programação para o Claude manipular com facilidade e gastar menos tokens, sem perder qualidade.
(1) **Dois defeitos achados na limpeza.** Havia duas funções `dadosDoUsuario` (a do "Baixar uma cópia do meu estudo" e a contagem da janela de excluir cadastro); a carregada depois substituía a outra, e o download entregava só números — a contagem virou `contagemDosDadosDoUsuario`, com teste que baixa o arquivo de verdade. E dos 7 downloads, só um esperava para liberar o endereço temporário (liberar na hora cancela o download em alguns navegadores): todos passam por `baixarArquivo()`.
(2) **Código morto e repetido.** Saíram 11 funções que nada chamava e 12 classes de CSS sem uso; os 7 downloads viraram `baixarArquivo(nome, conteudo, tipo)` e os 31 cabeçalhos de janela, `cabecalhoJanela(titulo)`.
(3) **Arquivos por assunto.** Os quatro maiores foram divididos em partes contíguas — a ordem de carga não mudou —: `03-nuvem` (2.314 linhas) em `03a`–`03d`, `05-motor-de-estudos` em `05a`/`05b`, `09-flashcards-e-provas` em `09a`–`09c`, `10-telas-do-aluno` em `10a`/`10b`, `11-telas-da-equipe` (2.006) em `11a`–`11d` e `12-importacao-e-central` em `12a`–`12c`. São 26 arquivos, nenhum acima de 1.150 linhas. Cada um começa com uma linha dizendo o que tem (antes, cinco linhas iguais em todos).
(4) **Comentários.** O guia de manutenção do `01-config.js` — 219 linhas, quase todas changelog de 19 a 21/09 — virou um guia de 18 linhas, e o texto antigo veio para este arquivo. Saíram dos comentários listas que repetiam o `index.html` e envelheciam (os 26 arquivos de prova com contagens, "os 501 cartões"). O "porquê" das decisões ficou onde estava.
(5) **Orientação.** `CLAUDE.md` (lido sozinho pelo Claude Code: comandos, como o código roda, a nuvem e a armadilha do RLS, o mapa dos arquivos, as regras da casa); `npm run mapa` (seções e funções de cada arquivo com a linha, e busca por palavra); `npm run testar-sql` (o esquema e as regras de segurança num PostgreSQL local temporário); e `testes/higiene.test.mjs`, que barra nome declarado duas vezes, função sem uso, arquivo acima de 1.400 linhas ou sem a linha de descrição, lista `ESC_ARQUIVOS` diferente da pasta e arquivo fora do mapa do `CLAUDE.md`.
(6) **Resumo.** Este histórico (antes a seção 12, 35% do resumo) e as listas de funções por data (seção 7) saíram do `RESUMO-PROJETO-ESC.md`, que caiu de 159 KB para cerca de 90 KB; duas informações velhas foram corrigidas (a limitação que dizia que o banco só tinha a UNIFESP, e um "próximo passo" que já estava feito).
(7) **Desempenho** (da rodada anterior, medido): `saveState` ~64 → ~16 ms com 3.000 respostas; `getQuestao` indexado.

**IAMSPE 2021, IAMSPE 2022 e UNESP 2023 (29/09).** O usuário enviou cinco PDFs: os cadernos do IAMSPE de 2021 e de 2022 (Quadrix, Acesso Direto e Áreas Básicas, 80 questões A–E), dois gabaritos definitivos do IAMSPE e uma edição da UNESP 2023 em texto com o gabarito ao final (100 questões A–D). Entraram 260 questões reais com explicação autoral, em três arquivos novos (`prova-iamspe-2021`, `prova-iamspe-2022`, `prova-unesp-2023`), e 32 figuras recortadas dos PDFs. Dois achados: (1) **o gabarito "de 2022" era o de 2023** — a prova do arquivo "RM-2022" foi aplicada em janeiro de 2022, e o gabarito enviado é o do processo seguinte (Edital 001/2022, 28/12/2022); na questão 40 ele daria como certa "a presença de sopro diastólico é inocente". A prova de 2022 entrou com gabarito resolvido pela equipe, avisado no fim de cada explicação, sem anuladas, até a folha oficial ser conferida (`PENDENCIAS.md`); o gabarito de 2023 ficou guardado lá, à espera do caderno. (2) A edição da UNESP perdia as ligaduras "fi"/"fl" na extração ("diculdade", "reOuxo"), consertadas palavra a palavra, e o gabarito dela não é a folha oficial nem traz anuladas. A banca da UNESP ficou "UNESP (FMB)" — a sugestão em `CONFIG.instituicoesReferencia` dizia "UNESP (Famema/Botucatu)", mas a Famema (Marília) não é da UNESP.

**Grupos, tags, revisão espaçada e avisos (29/09).** Oito pedidos do usuário numa rodada. (1) **Grupo sem nome = bloco de início**: onde o calendário não traz as letras da faculdade, o seletor mostra "Começa em Cardiologia" em vez de um "Grupo C" inventado, e o grupo criado sem nome se chama pelo bloco. (2) **Tags só depois de responder**: área, especialidade, assunto, dificuldade, "errada N vezes" e "escondida" só aparecem no cartão depois da resposta (ficam banca, ano e tipo de prova). (3) **Formado sem calendário e grupos livres**: o formado deixou de emprestar a sequência do 6º ano — não tem bloco atual, e a sessão recomendada é revisão + questões não vistas —, e qualquer grupo pode ter **calendário próprio** ou existir só para **dividir as questões** entre os membros. (4) **Painel Enviar Avisos** (administração; tabela `avisos` e `perfis.avisos_lidos` na nuvem; card no Início; aviso do navegador quando há permissão). (5) **Mudar o nome do grupo** (dono ou coordenação). (6) **Imagem entre o enunciado e as alternativas**. (7) **Retiradas da revisão** virou a terceira aba de Favoritos. (8) **Revisão espaçada**: não vistas → erros → acertos vencidos; mês mínimo entre acertos (mais em assunto forte); três acertos seguros aposentam a questão. Decisões a rever, se não for isso que se queria: acerto no chute segue voltando em até 2 dias (é a regra antiga de "chute vale como não sabido"); o "dividir questões" é sobre as questões enviadas ao grupo; os grupos continuam só no navegador. A nuvem precisa do `nuvem/esquema.sql` rodado de novo para os avisos.

## Funções-chave por rodada (antes na seção 7 do resumo)

Listas de funções organizadas pela data em que entraram. Para achar uma função hoje, use `npm run mapa -- nome`.

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
| `renderCardSenha()` / `trocarMinhaSenha()` / `nuvemTrocarSenha(atual, nova)` / `nuvemConferirSenhaAtual(senha)` | troca de senha no Perfil, para todos os papéis e sempre com a senha atual: pela nuvem (confere a atual entrando de novo com ela e só então `PUT /auth/v1/user`, desde 28/09) ou local (compara com a do navegador) |

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

## Migrações antigas (antes na seção 7 do resumo)

**Migrações de 21/09 (calendário).** Um ano sem calendário próprio ("Formado(a)") tem a sequência que existia movida para `db.sequenciasArquivadas` — sai de circulação sem ser jogada fora, e continua no banco e no backup. O 3º ano, que nascera com uma sequência de exemplo (ids `b3-1` … `b3-4`), recebe a de verdade no lugar **só se ainda for a de exemplo**: quem já tinha editado o 3º ano fica com o que montou, porque sobrescrever o trabalho da coordenação é pior do que uma sequência desatualizada, que ela conserta na própria tela. E `sincronizarConteudoNovo()` passou a trazer sozinho qualquer ano que ganhe calendário no código e ainda não exista no banco salvo, sem tocar nos anos já editados.

**Migração dos blocos para sequências por ano.** `db.sequenciasAno` passa a guardar a ordem de blocos de cada ano, e o grupo guarda só `anoFaculdade` + `deslocamento`. Nada é apagado: o calendário que a coordenação tinha customizado vira a sequência do ano padrão, o calendário próprio de uma turma vira a sequência do ano dela se aquele ano ainda não tiver uma, e o que sobrar fica guardado em `grupo.blocosArquivados` — continua no banco e no backup, para consulta antes de descartar.

## O guia antigo de manutenção (antes no topo de `codigo/01-config.js`)

Changelogs de 19/09 a 21/09 que abriam o primeiro arquivo do código. Guardados como estavam; partes deles já não descrevem a plataforma de hoje.

```text
/* ==========================================================================
   ESC — PLATAFORMA DE ESTUDOS PARA RESIDÊNCIA MÉDICA
   ==========================================================================
   GUIA RÁPIDO DE MANUTENÇÃO (para quem não é programador)
   ------------------------------------------------------------------------
   Esta é uma plataforma de arquivo aberto: o index.html (a moldura) mais
   duas pastas ao lado dele — "codigo/" (todo o código, em catorze arquivos)
   e "dados/" (todo o conteúdo). Não precisa de instalação, servidor,
   "build" ou internet para funcionar (exceto para carregar as fontes, que
   são opcionais, e para a nuvem) — basta manter os três juntos: abrir o
   index.html com dois cliques continua bastando.
   Para editar qualquer coisa:

   1. Abra o arquivo da pasta codigo/ que tem a tela ou a regra (cada um
      começa dizendo o que tem dentro) com o bloco de notas, VS Code, ou
      mande-o para uma IA (ChatGPT/Claude) pedindo para "editar a seção X".
   2. Use Ctrl+F para achar as seções pelos títulos em CAIXA ALTA:
        CONFIG              -> (este arquivo) nome da plataforma, metas
                                padrão, pesos de dificuldade, intervalos de
                                revisão, endereço da nuvem
        SEED_TAXONOMIA      -> (02-persistencia) onde a taxonomia entra
        SEED_QUESTOES       -> (02-persistencia) onde as questões entram
                                (o conteúdo em si fica na pasta "dados/")
        NUVEM               -> 03-nuvem
        MEU DESEMPENHO      -> 10-telas-do-aluno
        TUTORIAL            -> 13-tutorial (tour rápido e guia completo)
        INICIALIZAÇÃO       -> 14-admin-e-inicializacao (sempre o último)

   ONDE FICA CADA COISA
   ------------------------------------------------------------------------
   - index.html: só a moldura — cabeçalho, ícones, a VERSÃO e a lista
     ESC_ARQUIVOS com os arquivos a carregar, na ordem.
   - codigo/: o CÓDIGO, e só: telas, regras, algoritmos, configuração e o
     visual (estilo.css). Nenhuma questão, nenhum cartão, nenhuma conta.
     A divisão segue as seções numeradas de sempre (1 a 28), então o que
     estava na seção 17 continua sendo "a seção 17", agora dentro de
     10-telas-do-aluno.js.
   - dados/: TODO o conteúdo — taxonomia, calendário, questões (uma prova
     por arquivo), flashcards, simulados e os dados de demonstração.
   - Os SEED_* são só APELIDOS: `const SEED_QUESTOES =
     window.EscDados.questoes`. Quem enche o EscDados são os arquivos de
     dados/, carregados antes do código. Mexer num SEED_* não muda
     conteúdo nenhum — o conteúdo está lá.
   - Para acrescentar ou corrigir conteúdo: dados/LEIA-ME.md.
   - Para conferir se nada quebrou: testes/ (npm test) — roda sozinho no
     GitHub a cada envio.
   - Se faltar um arquivo, a plataforma abre e avisa numa tarja no alto da
     tela, DIZENDO QUAL faltou (avisarSeFaltarConteudo), em vez de parecer
     quebrada; Configurações > Arquivos de conteúdo mostra o que entrou.

   NOVIDADES DESTA VERSÃO (o que mudou e onde mexer)
   ------------------------------------------------------------------------
   - A plataforma passou a se chamar "Esc" (mude em CONFIG.nomePlataforma).
   - A aba "Assuntos" saiu do menu: a navegação por especialidade e assunto
     agora fica em Estudar > Monte sua própria lista, junto com filtros de
     instituição, ano, "últimos 5 anos" e "todas as grandes áreas".
   - "Histórico de Atividade" (menu do aluno) guarda cada conjunto de
     questões concluído e permite reabrir a página de feedback.
   - "Enviar / Importar Questões" está aberta para aluno e residente, com
     prompt de prova inteira (instituição e ano informados uma vez só).
   - Qualquer lista de questões tem "ver na íntegra", que abre o enunciado
     completo, alternativas, gabarito e explicação numa janela.
   - A área de Aulas foi removida da plataforma (telas, menus e dados).
   - Questões aceitam IMAGEM (ECG, radiografia, fundo de olho, foto de lesão),
     por link ou arquivo enviado — o arquivo é reduzido e comprimido antes de
     ser guardado, e o Perfil mostra quanto espaço o banco já ocupa.
   - Detecção de questões duplicadas: ao salvar uma questão nova, ao importar
     um lote (contra o banco e contra o próprio lote) e numa aba "Duplicadas"
     dentro do Controle de Qualidade.
   - Simulado com cronômetro, encerramento automático no fim do tempo e
     registro do tempo gasto em cada questão — o resultado mostra onde a
     pessoa travou, e Meu Desempenho mostra o ritmo geral.
   - A calibração da confiança virou ação: filas separadas por tipo de erro
     (errou com certeza, acertou no chute, errou na dúvida) e lista de
     assuntos em que a pessoa responde com certeza e erra.
   - O prompt de importação exige explicação autoral, com REFERENCIAS de
     diretrizes/protocolos/artigos, e proíbe copiar resolução de sites de
     questões ou de cursinhos.
   - Administradores agora têm NÍVEIS (CONFIG.niveisAdmin + PERMISSOES_ADMIN):
     máster, coordenação e moderador de conteúdo. O menu e as rotas se ajustam
     sozinhos ao nível de cada um; só o máster altera papéis e níveis.
   - "Livro de Ouro": página aberta a todos com doações, colaborações e apoios,
     mantida pela coordenação (SEED_LIVRO_OURO traz exemplos para apagar), mais
     um reconhecimento calculado automaticamente pelo que cada pessoa fez aqui.
   - "Especialidades e Assuntos" (menu de conteúdo): renomear, mover, mesclar e
     excluir especialidades/assuntos, com verificação de consistência e correção
     automática — inclusive das questões classificadas de forma incoerente.
   - Revisão no começo do ano: se houver matéria de anos anteriores, ela alimenta
     a revisão desde o 1º bloco; se não houver, a carga entra devagar
     (0%, 10% e 20% nos três primeiros blocos — ajustável em Configurações,
     campo CONFIG.rampaRevisaoInicio).
   - Foram acrescentadas 105 questões autorais de construção de conhecimento,
     de nível fácil a moderado, marcadas com a instituição
     "Esc — Banco Didático" (use esse filtro para estudar só elas):
       30 de Técnica Operatória (nova especialidade dentro de Cirurgia Geral),
       30 de Cardiologia, 30 de Infectologia e 15 de Oftalmologia (nova
       especialidade dentro de Clínica Médica).
     Quem já usava a plataforma recebe esse conteúdo automaticamente: a
     função sincronizarConteudoNovo() acrescenta ao banco salvo no navegador
     apenas o que falta, sem apagar respostas, favoritos ou questões próprias.

   O QUE MUDOU NESTA VERSÃO
   ------------------------------------------------------------------------
   - MEU DESEMPENHO ganhou um SELETOR DE PERÍODO com quatro recortes: últimos
     14 dias, últimos 30 dias, últimos 12 meses e o ano corrente mês a mês.
     Funções: desempenhoPorDia(), desempenhoPorMes() e resumoJanela() no motor
     de estudos; dadosDoPeriodo() e PERIODOS_DESEMPENHO na própria tela.
   - GRÁFICO DE BARRAS VERTICAIS (graficoBarrasVerticaisSvg): cada barra é
     100% das questões do dia/mês/área — verde claro embaixo é o acerto,
     cinza claro em cima é o erro. As cores estão em --barra-acerto e
     --barra-erro, nos dois temas. Dia sem estudo vira um traço na base, de
     propósito, para a rotina real aparecer.
   - DESEMPENHO POR ÁREA agora para nas 5 GRANDES ÁREAS: a antiga árvore
     assunto a assunto saiu da tela (virava lista que ninguém lia até o fim).
     A tabela mostra acertos, erros, taxa e o assunto mais fraco de cada área,
     com botão de praticar; o detalhe fino ficou na tela de Revisão.
   - METAS DE ESTUDO saiu do menu e virou o primeiro cartão de ESTUDAR, com o
     progresso do dia à vista e o ajuste do número numa janela
     (abrirModalMeta). A rota "metas" continua respondendo e leva a Estudar.
   - ALUNO CRIA FLASHCARD durante as questões: botão "Virar flashcard" nas
     ações da questão, no modal de questão na íntegra e na lista do fim da
     sessão. O assunto já vem marcado com o da questão, e há atalho para
     jogar o gabarito comentado no verso.
     Cartão agora tem DONO: `usuarioId` preenchido = cartão pessoal, que só
     o autor enxerga (flashcardsAtivos(usuarioId)); `usuarioId: null` =
     material da equipe, visível a todos (flashcardsDaEquipe()). O PDF e a
     tela de manutenção usam só o material da equipe.
   - REVISÃO RÁPIDA (FLASHCARDS): cartão de conceito com frente e verso, sem
     alternativa para eliminar. O baralho se monta sozinho, priorizando os
     assuntos de falsa segurança, e inclui cartões gerados a partir das
     questões que o aluno errou com certeza ou acertou no chute. Cada cartão
     tem repetição espaçada própria, separada da das questões.
     Onde mexer: SEED_FLASHCARDS (cartões de exemplo), seção "12-B" (telas) e
     "montarBaralhoFlashcards" no motor de estudos. Professores cadastram
     cartões novos pela própria tela, sem tocar no código.
   - MATERIAL EM PDF (professores, coordenação e moderadores): prova para
     aplicar com cartão-resposta, lista de exercícios comentada, baralho de
     flashcards para recortar e relatório de desempenho da turma. Não usa
     nenhuma biblioteca: monta o material na div #areaImpressao e chama a
     impressão do navegador, onde existe "Salvar como PDF". Seção "20-B".
   - MENU REORDENADO por probabilidade de uso. Os quatro primeiros itens do
     aluno são Início, Estudar, Meu Desempenho e Meu Grupo — no celular, os
     únicos que aparecem sem rolar. Ver navItemsParaPapel().
   - LIVRO DE OURO saiu do menu lateral: agora fica no rodapé da tela inicial
     (renderCardLivroOuroInicio) e em Configurações. A página continua no ar,
     só não ocupa mais uma linha do menu de quem vai estudar.
   - BACKUP restrito ao administrador máster (exportar, importar e reiniciar).
     A checagem está em podeMexerEmBackup(), na própria função, não só no
     botão. A caixa aparece em Perfil e em Configurações: renderCardBackup().
   - ARRASTAR PARA O LADO no celular troca de questão, de cartão e de questão
     do simulado. Ver ativarGestoDeArrastar(), chamada ao fim de cada render.
   - CLICAR NO ENUNCIADO abre a questão na íntegra em qualquer lista, e também
     na questão já respondida. A classe CSS é .enunciado-clicavel.
   - ANO DA FACULDADE: entraram 3º e 4º ano; "Internato" saiu (virou 5º/6º
     ano, que é o que a coordenação usa para montar turmas). Lista central em
     CONFIG.anosFaculdade; quem estava como "Internato" foi migrado para 6º
     ano automaticamente, e o aluno pode corrigir o próprio ano no Perfil.
   3. Prefira sempre usar as telas do próprio app (Admin > Banco de Questões,
      Admin > Importar Questões, Admin > Blocos) em vez de editar o código.
      Este arquivo só precisa ser editado para mudanças estruturais.
   4. Os dados dos usuários reais (respostas, cadastros etc.) ficam salvos no
      navegador (localStorage), não neste arquivo. Use "Configurações >
      Exportar backup" para não perder nada.

   ATUALIZAÇÃO DA NOITE DE 19/09 (resumo — detalhe completo na seção 13 do
   resumo enviado no chat):
   - Política de conteúdo: enunciado/gabarito de prova PÚBLICA pode ser usado
     integralmente (domínio público); só a explicação é sempre autoral —
     nunca copiada de cursinho. Ver comentário acima de SEED_QUESTOES.
   - SEED_FLASHCARDS: de 24 para 501 cartões, cobrindo os 91 assuntos.
   - Lembrete de meta diária via Notification do navegador (ativarLembreteMetaDiaria,
     checarLembreteMetaDiaria) — configurável no Perfil do aluno.
   - Flashcards ganharam imagem (imagemUrl/imagemLegenda), igual às questões.
   - Cartão pessoal pode ser sugerido para o baralho da equipe, com aprovação
     em Controle de Qualidade > aba "Flashcards Sugeridos" (sugerirFlashcardParaEquipe,
     aprovarFlashcardSugerido, recusarFlashcardSugerido).
   - Dois gargalos de desempenho corrigidos (banco testado com >6.000
     questões via automação de navegador): respostasDaQuestao() e
     questoesDuplicadasDe() varriam o banco inteiro a cada chamada; agora
     usam índices cacheados por _geracaoDb (indiceRespostasDoUsuario,
     indiceAssinaturasQuestoes).
   - Nova estatística de qualidade: q.estatisticas.eliminacoesAoErrar conta,
     por alternativa, quantas vezes ela estava riscada quando o aluno errou —
     visível em Controle de Qualidade > Questões Difíceis.

   ATUALIZAÇÃO DE 21/09 — O CONTEÚDO SAIU DO CÓDIGO E A NUVEM ENTROU
   ------------------------------------------------------------------------
   - PASTA "dados/": as 635 questões e os 501 cartões saíram deste arquivo e
     viraram sete arquivos ao lado dele (ver CONTEÚDO: A PASTA, mais acima).
     No site nada muda; o que muda é que dá para ler, revisar ou mandar para
     uma IA só o código, ou só uma prova. Passo a passo: dados/LEIA-ME.md.
   - NUVEM (seção 2-C, funções "nuvem*"): conta de verdade com e-mail e
     senha e estudo sincronizado entre aparelhos, por cima do Supabase.
     Ligada por CONFIG.nuvem; vazia, a plataforma funciona como sempre
     funcionou, só com este navegador. O banco, as regras de segurança e o
     passo a passo estão em nuvem/esquema.sql e nuvem/LEIA-ME.md.
     O CONTEÚDO não sobe: questões e cartões da equipe são iguais para todos
     e continuam vindo da pasta "dados/". Questão criada pela Central de
     Provas ou por Importar Questões continua só no navegador de quem a
     publicou até alguém levá-la para "dados/".
   - MAPA DA SESSÃO (renderMapaSessao): durante a prática, a fila de questões
     vira uma tira de números clicáveis, com acerto e erro à vista. Não
     confundir com o mapa do SIMULADO (.pill-mapa/.mapa-legenda), que durante
     a prova diz só respondida/em branco, nunca certo ou errado. Os dois
     moram na mesma BARRA FINA de uma linha (htmlBarraDeQuestoes), que
     expande para o conjunto inteiro (state.mapaSessaoExpandido).
   - SEPARAÇÃO COMPLETA (21/09, segunda parte): saíram também a taxonomia,
     o calendário, os simulados e os dados de demonstração — antes só as
     questões e os cartões estavam fora. Agora o index.html não tem
     conteúdo nenhum. Arquivos novos: dados/taxonomia.js, dados/calendario.js,
     dados/simulados-equipe.js e dados/demonstracao.js (este último é o que
     se esvazia quando a turma real entra). A ponte window.EscDados ganhou
     registrarSimulados, registrarTaxonomia, registrarCalendario e
     registrarDemonstracao, e as listas agora se SOMAM entre arquivos.
   - CENTRAL DE PROVAS (renderCentralProvas e funções de "carga"/"lote"):
     subir uma prova inteira pela plataforma, em lotes, com duas ou mais
     pessoas ao mesmo tempo, conferindo cada lote contra a faixa pedida antes
     de publicar. Fica em Admin > Central de Provas.
   ========================================================================== */
```

**6º ano vira o cronograma do Grupo E (29/09/2026).** O calendário de referência deixou de ser o internato em oito blocos e passou a ser o Cronograma 2026 do Grupo E: cinco períodos, cada um com subdivisões (`subdivisoes`, só nomes). O tempo do período é repartido igualmente entre elas, em dias corridos, com a sobra indo para as primeiras (`subdivisoesComDatas`). Como só o Grupo E foi transcrito, `opcoesRodizio` passou a oferecer só os blocos que declaram `grupoRodizio` quando algum declara, e turmas antigas caem no Grupo E (`turmaDoDeslocamento`). A sequência de exemplo antiga (`bloco-1`…`bloco-8`) é trocada pela nova na abertura.

**IAMSPE 2023, 2025 e 2026 e o gabarito oficial do IAMSPE 2022 (29/09).** O usuário enviou cinco PDFs: o caderno Quadrix do IAMSPE 2023 (aplicação 2022), o gabarito definitivo do IAMSPE 2022, os cadernos Avança SP de 2025 (Edital 02/2024, prova de 15/12/2024) e de 2026 (Edital 01/2025) e o gabarito preliminar deste último. (1) **IAMSPE 2022:** o gabarito oficial confirmou 72 das 80 respostas da equipe; 6, 7, 46 e 48 viraram anuladas, 8, 25, 32 e 68 mudaram de letra (com a explicação reescrita), e saiu o aviso de gabarito da equipe. (2) **IAMSPE 2023:** 80 questões com o gabarito definitivo que estava guardado em `PENDENCIAS.md` (6 anuladas). (3) **IAMSPE 2026:** 100 questões com o gabarito preliminar; a conferência automática contra a folha pegou uma letra que a equipe tinha lido errado (2026-84) antes de o arquivo ser gravado. (4) **IAMSPE 2025:** o caderno veio sem gabarito e os sites da banca e do PCI Concursos estão bloqueados na rede de trabalho; entrou com gabarito da equipe, avisado em cada explicação, e 12 questões com mais de uma alternativa defensável listadas em `PENDENCIAS.md`. Ao todo, 280 questões novas com explicação autoral e 19 figuras (extraídas do PDF sem a marca d'água do site de origem). A geração dos arquivos confere, questão a questão, que cada assunto existe na taxonomia e que o gabarito gravado é o da folha.

**Gabaritos definitivos do IAMSPE 2025 e 2026 (29/09).** O usuário enviou as duas folhas oficiais (Avança SP, processos 02/2024 e 01/2025). IAMSPE 2026: igual ao preliminar em 99 questões; a 76, que a explicação já apontava como errada, foi anulada. IAMSPE 2025: o gabarito da equipe acertou 91 de 100; a 28 (fios cirúrgicos, também apontada) foi anulada, e 11, 32, 38, 45, 61, 71, 77 e 89 mudaram de letra — seis delas estavam na lista de dúvidas. As explicações dessas questões foram reescritas para a letra oficial, e saiu o aviso de gabarito da equipe. As que continuam discutíveis diante da literatura foram para a tabela "Outras bancas" de `PENDENCIAS.md`.

**Ajustes de estudo (29/09/2026).** Nove pedidos do usuário numa rodada. (1) **Imagens de questão centralizadas** (`.qcard-img-wrap`, que também serve ao flashcard). (2) **Progressão consolidação → residência**: a sessão recomendada passa a ter, na matéria nova, 70% de consolidação (questões didáticas e provas da graduação) e 30% de provas reais de residência no 3º ano, 60/40 no 4º, 25/75 no 5º e 0/100 no 6º (`CONFIG.progressaoConsolidacao`, `selecionarComProgressao`); no lugar do antigo "graduação primeiro" dentro de cada assunto. (3) **Estágios do 6º ano editáveis por aluno**, sem trocar de grupo (Meu Grupo > Meus estágios; `usuario.ordemEstagios`, `perfis.ordem_estagios`). (4) **Destaque de texto** em questões e flashcards (novo `08b-destaques-de-texto.js`, tabela `destaques`). (5) **"Não mostrar mais" só depois do 2º erro** na mesma questão. (6) **Taxa de acerto individual fora do Painel da Turma** — da tela, da planilha, dos alertas e do próprio banco (`painel_turma()` recriada sem acerto; `acerto_por_turma()` nova, com mínimo de 3 alunos). (7) **Padrão de justificativa** com parâmetro objetivo em destaque, valor normal e escores (`**…**` → `strong.parametro`; texto em `dados/LEIA-ME.md`). (8) **Prompts alinhados**: importação, Central de Provas e "Tirar dúvida com IA" usam o mesmo `regraDeParametrosObjetivos()`. (9) **Uso da equipe no Painel da Turma**, incluindo administradores (aba Equipe). Pendente para a coordenação: rodar o `nuvem/esquema.sql` de novo. As explicações já publicadas não foram reescritas.

**Triagem das justificativas que dependem de um número (29/09/2026).** Passada automática sobre as questões ativas para achar as explicações que precisam do padrão de justificativa (parâmetro em destaque, valor normal, ponto de corte, escores): 790 candidatas — 565 sem valor de referência na explicação (prioridade 1), 210 que já falam de corte e só pedem destaque e complemento (prioridade 2) e 15 de baixa prioridade. Nenhuma explicação foi alterada; a lista de trabalho está em `docs/triagem-justificativas.md` e `.csv`.

**Justificativas da UNIFESP-EPM 2022 com parâmetro objetivo (29/09/2026).** Primeiro lote da triagem: 19 explicações reescritas no padrão (parâmetro do caso em destaque com `**`, valor normal, ponto de corte e escores calculados), de 21 candidatas; duas não dependiam de número (#2 e #59). Além do formato, três explicações tiveram o raciocínio corrigido: a #37 (pré-natal) apoiava-se num "rastreio de diabetes (hemograma seriado)" sem sentido — o que dispensa o teste oral é a glicemia de jejum de 94 mg/dL, que já fecha o diagnóstico de diabetes gestacional —, a #31 passou a apontar a contraindicação de ergotamina na pré-eclâmpsia, e a #84 deixou de dizer que o prolactinoma era desnecessário, o que contrariava o gabarito.

**Justificativas da UNIFESP-EPM 2023 e 2024 (29/09/2026).** Mais dois lotes da triagem: 22 explicações de 2023 e 23 de 2024 reescritas no padrão de parâmetro objetivo. Em 2024, três explicações contradiziam o próprio gabarito e foram refeitas: a #53 (pré-eclâmpsia a termo, cujo gabarito é indução do parto, mas a explicação defendia observação), a #65 (idosa com HbA1c de 5,9%, cujo gabarito é reduzir as drogas do diabetes, mas a explicação defendia manter) e a #7 (colangite grau II pelos critérios de Tóquio: os dois critérios são leucocitose e febre de 39 °C, e não a bilirrubina). Em 2023, a #97 deixou de chamar de puntiforme uma lesão de 20 mm e a #17 passou a justificar a diálise pelo conjunto (anúria, acidose, hiperpotassemia e SDRA), e não por hiperpotassemia refratária que o enunciado não traz. A #88 de 2024 tem explicação em conflito com o gabarito e ficou registrada em `docs/triagem-justificativas.md` para conferência.

**Justificativas da UNIFESP-EPM 2025 (29/09/2026).** 21 explicações reescritas no padrão de parâmetro objetivo, de 24 candidatas (três sem número decisivo). Três explicações contradiziam o gabarito ou traziam conta errada e foram refeitas: a #36 (TEP com síncope e PA 90/50 em transgênero pós-cirurgia, cujo gabarito é ecocardiograma e trombólise, mas a explicação defendia heparina e angiotomografia), a #33 (o ânion gap foi calculado com potássio e comparado com a referência sem potássio; o correto é 145 − 105 − 10 = 30) e a #71 (41 anos é menopausa precoce, e não insuficiência ovariana prematura, que é abaixo de 40).

**Justificativas da UNIFESP-EPM 2026 e fim da UNIFESP (29/09/2026).** 22 explicações de 2026 reescritas no padrão (uma das 23 candidatas não dependia de número). Refeitas por conflito com o gabarito: a #57 (diabetes gestacional, cujo gabarito é indução imediata, com o maior bolsão de 9,0 cm tratado como normal, quando é polidrâmnio), a #49 (beta-hCG de 750 mUI/mL descrito como acima da zona discriminatória, quando está abaixo; e o aumento mínimo em 48 horas passou a depender do valor inicial: 49%, 40% ou 33%) e a #95 (asma, ver `docs/triagem-justificativas.md`). Com isso a UNIFESP-EPM 2022 a 2026 está concluída: 107 explicações no padrão. O conferidor de `dados/` passou a recusar `**` sem par nas explicações.

**Justificativas da Santa Casa de SP e do IAMSPE (29/09/2026).** Mesmo padrão de parâmetro objetivo em destaque, agora nas duas bancas: Santa Casa 2021, 2022, 2023, 2025 e 2026 (14, 19, 24, 15 e 15 explicações reescritas) e IAMSPE 2021, 2022, 2023, 2025 e 2026 (8, 7, 4, 14 e 23, em geral só com o parâmetro em `**` e o valor de referência, porque as explicações já estavam certas). Os trechos sem número decisivo ficaram como estavam. Achados de texto e de gabarito a conferir estão em `docs/triagem-justificativas.md`. Restam USP-SP, USP-RP, AMRIGS e UNESP.

**Justificativas da AMRIGS e da UNESP (29/09/2026).** Mesmo padrão nas duas bancas restantes fora da USP: AMRIGS 2022 a 2025 (11, 6, 7 e 13 explicações) e UNESP 2023 (21). As explicações já estavam certas em quase tudo; entraram o parâmetro em `**`, o valor de referência e o ponto de corte. Três erros de conta ou de faixa foram corrigidos no caminho (limite da ALT na AMRIGS 2022 #6, índice de choque na UNESP 2023 #22 e zona de risco do nomograma de Bhutani na UNESP 2023 #5). Restam USP-SP e USP-RP.

**Sete ajustes de uso (01/10/2026).** (1) **Meu Desempenho**: no cartão "Como você está indo" os quatro números e as duas janelas curtas passaram para o lado do gráfico (`.grafico-com-lateral`), que não precisa da largura toda — a tela ficou mais baixa. (2) **Painel da Turma**: saiu a ordenação "Quem precisa de atenção primeiro"; entrou **Último uso** (mais recente ou mais antigo primeiro, quem nunca usou sempre no fim) e esse é o padrão; os alertas continuam na coluna "Atenção". (3) **Restaurar padrão** nas janelas de meta (questões e cartões): apaga a escolha pessoal, e a meta volta a seguir a recomendação da coordenação; com a nuvem, meta nula no perfil também apaga no outro aparelho. (4) **Tutorial**: passo novo no tour do aluno e guia com o passo a passo do Enviar Questões e a sugestão de subir as listas de exercícios para o grupo. (5) **Monte sua lista** e **Criar Simulado**: mais de uma instituição (e, em Estudar, mais de um tipo de prova) no mesmo conjunto — caixas de marcação no lugar do select. (6) **Meu Grupo**: card de **integrantes** e **grupos de estudo** (seção 18-C, `db.subgrupos`): qualquer integrante cria um grupo menor dentro da turma, escolhe quem participa e quais provas do grupo entram, e a plataforma divide entre eles (`dividirEntreMembros`, que a divisão da turma inteira passou a usar também). Como os grupos, ficam no navegador — a nuvem ainda não sincroniza grupos. (7) **Adicionar baralho** (Revisão Rápida): trazer um baralho inteiro de uma IA — pedido pronto, resposta colada, conferência e só então os cartões entram (pessoais; quem gere conteúdo pode publicar para a equipe) (seção 12-D). Nenhuma tabela nova: não precisa rodar o `esquema.sql`.

**Grupos e cartões na nuvem (01/10/2026).** Os grupos, que só existiam no navegador de quem os criou, passaram a subir como as questões enviadas (nova seção 11-J do `esquema.sql`, novo `03e-nuvem-grupos.js`): `grupos` (toda conta aprovada lê, para "pedir para entrar"), `grupo_membros` (pendente/aprovado/recusado/saiu; a turma do rodízio é aberta e o dono aprova os demais), `subgrupos` (os grupos de estudo), `questoes_enviadas.grupo_id` (a questão "para o meu grupo" sobe já aprovada e só os membros a recebem) e `flashcards_enviados` (cartão sugerido à equipe, que o professor aprova ou recusa; cartão compartilhado com o grupo; cartão que a equipe publica pela plataforma). Funções novas `e_do_grupo()` e `e_dono_do_grupo()`. O que sobe sai da comparação com o último envio (`db.nuvem.gruposSig`, `c.nuvemSig`), sem gancho em cada tela, e o grupo vai à frente da fila. A linha de outra pessoa (aprovar pedido, corrigir a questão de um colega, decidir um cartão) vai como PATCH (`nuvemGravarCompartilhada`). Cartão de aluno ganhou **compartilhar com o grupo** (`c.grupoId`, em Meus cartões e em Adicionar baralho) e a lista "Cartões do grupo". Testes: regras de RLS em `testes/sql/regras.sql` e ponta a ponta em `testes/grupos-na-nuvem.test.mjs`. **Pendente para a coordenação: rodar o `nuvem/esquema.sql` de novo** — sem isso, grupos e cartões ficam só no navegador e as questões de grupo esperam na fila.

**Turma unificada e sete ajustes (02/10/2026).** (1) **Painel da Turma**: a coluna "Atenção" virou **Condição** — todo aluno tem uma (*em dia*, *parado há N dias*, *nunca estudou*) e o CSV ganhou a coluna `condicao` no lugar de `alertas`. (2) **Pedido para entrar no grupo** passou a avisar quem criou o grupo (como já se fazia com os cadastros): aviso na tela uma vez só (`u.pedidosGrupoAvisados`), número ao lado de Meu Grupo no menu, notificação no Início e, se a pessoa deixar, notificação do sistema (`checarPedidosDeEntradaNoGrupo`, conferida a cada 20 s); Meu Grupo lista os pedidos de **todos** os grupos que a pessoa criou, não só o atual. (3) **Turma**: Painel da Turma, Aprovar Cadastros e Usuários viraram um item de menu com duas abas (`abasDaTurma`, `renderTurmaPessoas`, `renderPedidosDeAcesso`); `aprovar-cadastros` e `usuarios` redirecionam para a aba. (4) **Criar minha lista** (Estudar) e **Criar meu baralho** (Revisão Rápida): botões que abrem as opções de montagem, recolhidas até a pessoa pedir; o baralho ganhou "quais cartões" (vencidos, ainda não vistos, só os seus) e o número de cartões, com a contagem do recorte antes de começar (`montarBaralhoFlashcards` aceita `filtro.situacao`). (5) **Retirar alguém**: o criador do grupo tira um integrante no × (`retirarDoGrupo`: a pessoa volta ao calendário oficial, sai dos grupos de estudo e as questões dela nas divisões passam para quem ficou) e o criador de um grupo de estudo tira um participante (`retirarDoSubgrupo`); na nuvem a saída sobe como a recusa de um pedido (a regra `grupo_membros_alterar` já permitia à dona) e o aparelho da pessoa se ajusta ao descer (`aplicarMembroDaNuvem`). (6) **Questão centralizada**: sessão e simulado ficam numa coluna centralizada (`.coluna-questao`) — num monitor largo a coluna ficava colada à esquerda. (7) **Autoria**: a questão enviada por um aluno mostra "Enviada por <nome>" (`autoriaDaQuestao`); o papel de quem enviou viaja com a questão (`autorPapel`, dentro de `dados`), e a questão sem papel conhecido (enviada antes desta regra, vinda de outro aparelho) fica sem nome. Nenhuma tabela nova: não precisa rodar o `esquema.sql`.

**Segundo grupo só de questões e exclusão de grupo (02/10/2026).** (1) Cada pessoa continua com **um grupo de calendário** (rodízio ou calendário próprio, `usuario.grupoId`), mas pode estar também em **um grupo só de questões** (`usuario.grupoQuestoesId`, `perfis.grupo_questoes_id`): ele compartilha e divide questões, grupos de estudo e cartões e não mexe no calendário. Entrar como "só questões" não tira a pessoa do grupo do calendário, e trocar de turma não derruba o grupo de questões; as questões dos dois grupos entram em Monte sua lista, Provas e no baralho, e ao enviar questões o destino diz o nome do grupo quando há dois. (2) **Excluir grupo**: quem criou (ou a coordenação) exclui o grupo — que some dos outros aparelhos pela marca `removido` em `grupos` —, e para o dono "sair" do grupo é excluí-lo, com aviso de quantas pessoas ficam sem ele. A turma do rodízio não se exclui. As questões enviadas para um grupo excluído continuam guardadas, mas deixam de aparecer.

**Dois grupos: manter o grupo antigo (02/10/2026).** Quem estava num grupo e escolhia a turma do rodízio perdia o grupo antigo, porque ele ocupava a única vaga de calendário. Agora o Esc pergunta se a pessoa quer continuar nele só para questões (`entrarNoGrupo(..., {manterAtual})`), e Meu Grupo ganhou "Passar este grupo para só questões". O perfil que desce da nuvem também não apaga mais o grupo de questões escolhido (podia ser anterior à escolha).

**Ajustes da USP-RP 2025 com o caderno (01/10/2026).** O usuário enviou os cadernos de questões de 2025 e 2026 (PDF com texto). Cada enunciado e alternativa do banco foi comparado, por script, com o caderno. **2026** estava igual (só legendas de figura e acentuação de tipografia): nada mudou. **2025**: (1) as **25 figuras pendentes** foram extraídas do PDF e anexadas (`q-usprp2025-*`; as de várias imagens — 2025-45, 54, 60 e 72 — viraram uma imagem só, empilhada ou lado a lado), e `imagemPendente` virou `imagemLegenda`; o caderno mostrou ainda **duas figuras que a edição comentada não registrava**, a tabela de exames da 2025-27 (anemia ferropriva) e a foto da unha da 2025-33; (2) a **2025-99** foi transcrita e saiu de rascunho; (3) enunciados corrigidos pelo caderno: 57 (faltava "mucosa vaginal pálida", que a explicação passou a citar), 58, 61 (a edição tinha inventado "FC 112 bpm"), 70, 71 (ácido fólico 6,0), 73, 79 e 82 (estes três vinham cortados ou diferentes do caderno). O caderno de 2025 traz a folha de gabarito em branco, então os gabaritos de 2025 seguem sem conferência oficial. Restam 133 figuras da USP-RP (2021–2024).

**Cadernos da USP-RP 2021, 2022 e 2023 (03/10/2026).** O usuário enviou os três cadernos (PDF com texto e figuras). (1) **Figuras:** 106 foram extraídas e anexadas (44 de 2021, 31 de 2022, 31 de 2023); o caderno mostrou figuras que o banco não registrava (2022-36 e 2022-68, 2023-91). A 2023-14 não tinha figura nenhuma (a legenda das vacinas está no enunciado) e saiu da lista de pendentes. As 2022-19, 21 e 23 vieram sem a imagem também no caderno e seguem pendentes. (2) **2021:** o caderno tem a ordem das questões trocada em relação à edição comentada usada na carga, então a comparação foi feita pelo conteúdo — todos os 118 gabaritos do banco coincidem com os do caderno. Entraram as duas questões que faltavam: a 7 (MAPA e hipertensão resistente, com figura) e a 120 (teste rápido da Covid, **anulada**, sem gabarito); os finais cortados das 2021-74, 78 e 93 foram completados e a lacuna conhecida saiu do conferidor. (3) **2022 e 2023:** o texto do banco estava certo (o PDF tem erros de OCR); só a alternativa B da 2023-90 foi completada ("em leito intensivo"). (4) **Gabaritos não alterados:** 2022-100 (banco B, caderno D) e 2023-36, 59 e 95 (a folha do caderno diverge do banco, e em 2023 está em branco nas questões 31–34 e 37–40); sem a folha oficial da banca não dá para saber qual fonte está certa, e as explicações atuais sustentam o banco. Restam 103 figuras no banco, 28 da USP-RP.

**Figuras da UNIFESP (03/10/2026).** O usuário enviou um PDF de capturas de tela das 13 questões da UNIFESP que esperavam figura (2022-46, 48 e 81; 2023-23; 2024-45 e 47; 2025-53; 2026-33, 36, 40, 60, 61 e 74). Cada figura foi recortada da captura, sem o cabeçalho e o texto da página; na 2026-61 as duas imagens do carrossel (corte sagital e axial) foram unidas lado a lado. `imagemPendente` virou `imagemLegenda`, e a UNIFESP ficou sem nenhuma figura pendente. Restam 90 no banco (Santa Casa, USP-SP e USP-RP).

**FAMEMA 2022, 2023 e 2025 (03/10/2026).** O usuário enviou os cadernos de 2022 (com a folha de gabarito oficial), 2023 (edição em texto com o gabarito ao final) e 2025 (sem gabarito), mais o gabarito definitivo do IAMSPE 2024 (sem caderno, por isso não entrou). As 300 questões foram extraídas por script (texto por coluna, com tratamento das páginas de figura em largura total), revisadas à mão e ganharam explicação autoral que, a pedido, **aponta as dicas do enunciado** (idade, tempo, sinal ou valor que levam à resposta) além do porquê de cada alternativa. Cinco figuras anexadas (ECG, endoscopia e cardiotocografia de 2022; capnografia e traçado de PCR de 2023; tomografia e cardiotocografia de 2025). O gabarito de 2025 foi buscado como preliminar publicado e conferido questão a questão; 15 foram resolvidas pela equipe e estão marcadas em `PENDENCIAS.md`. Vinte assuntos novos na taxonomia (políticas nacionais de saúde, leishmaniose, restrição de crescimento fetal, tumores neuroendócrinos, transtornos alimentares etc.).

**E-mail de cadastro só na aprovação e push para quem aprova (02/10/2026).** O e-mail de confirmação saía no pedido, quando a pessoa ainda não podia entrar. Agora, com "Confirm email" desligado no Supabase, o cadastro não manda nada e a aprovação dispara o link de acesso (`/auth/v1/otp`, `create_user:false`), que avisa da aprovação e confirma o endereço ao ser tocado. Para a coordenação, o aviso de pedido novo ganhou push real (`push_inscricoes`, `sw.js`, função `nuvem/funcoes/avisar-pedido` disparada por webhook em `perfis`), que chega com o app instalado fechado; sem a chave VAPID, continua o aviso com o Esc aberto.

