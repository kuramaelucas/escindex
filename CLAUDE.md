# Esc — guia de trabalho no código

Plataforma de estudos para residência médica. Site estático **sem build, sem dependências, sem módulos**: `index.html` (moldura) + `codigo/` (código) + `dados/` (conteúdo), abre com dois cliques. **Código e conteúdo são independentes** (`icones/` = ícones do PWA, sem lógica): mexer em um não toca no outro (ver "Conteúdo" abaixo). Nuvem opcional (Supabase, só `fetch` na API REST). Tudo em **português**: telas, identificadores (`renderPainelTurma`, `nuvemMarcarFeedback`), comentários e documentação.

## Roteador de trabalho — decida a zona ANTES de abrir qualquer arquivo

Regra permanente (vale sem o usuário pedir): classifique o pedido numa zona, leia **só** o que a zona manda e ignore o resto. Nunca releia o projeto inteiro; nunca abra `dados/prova-*.js` inteiro (~300 KB).

| Zona | Quando | Leia só isto | Não leia |
|---|---|---|---|
| **A. Estrutura** (programa) | tela, botão, regra de estudo, estilo, nuvem, PWA, testes | `npm run mapa -- <palavra>` → trecho do arquivo de `codigo/` (Read com offset/limit); "Como o código roda" e "Regras da casa" abaixo | `dados/` |
| **B1. Questões — analisar o que já existe** | achar duplicata, auditar assunto/gabarito/explicação, estatística, relato de aluno, corrigir uma questão | `npm run dados` (visão) → `-- <prova>` → `-- <q-id>`; `-- taxonomia <palavra>`; `-- buscar "<texto>"`; `-- resumo-assuntos [palavra]` (lacunas: onde faltam questões/cartões); `npm run conferir -- --resumo`; `npm run relatos` | `codigo/`, os guias de `dados/`, qualquer prova inteira |
| **B2. Questões — só adicionar** | prova nova ou lote novo | só a receita "Conteúdo" abaixo + **`dados/ADICIONAR.md`** (formato do lote) + **`dados/PADRAO-EXPLICACAO.md`** (como escrever a explicação); rascunhos de lote em `lotes/` (fora do git). Molde da questão/política de conteúdo: `dados/LEIA-ME.md`, só se precisar. `nova-prova` → `adicionar-questoes` (use `--simular` antes). Para evitar repetição: só `dados -- buscar`. | provas existentes, `codigo/`, histórico |
| **B3. Questões — reposição de anuladas/desatualizadas** | escrever a versão corrigida de questão anulada ou desatualizada | `docs/REPOSICOES-DE-QUESTOES.md` (**comece pela seção 0**: a reposição herda banca/ano/semestre/tipoProva/área/assunto da original, senão o CI quebra; método, fontes que abrem, o que já foi lido); `npm run reposicoes` (pendentes e feitas); `npm run reposicoes -- <q-id>`; `npm run texto-oficial` | provas inteiras, `codigo/` |
| **A2. Cronograma de Formados** (trilha = quais assuntos, fases + ritmo = qual dificuldade, tamanho de sessão) | mudou a regra de montar a sessão de quem é Formado(a) | `npm run mapa -- formado` → `05c` (fases, sessão) e `05e` (trilha); `CONFIG.cronogramaFormado` (01); conferir com `npm run simular-formado` (`-- --semanas 12 --acerto 0.5 --exigir`) | `dados/` (a fila da trilha é gerada por `npm run prioridade-formados`) |
| **C. Dados de estudo/nuvem** (modelo de dados, sync) | campo novo, tabela, migração | seção "Nuvem" abaixo + `02-persistencia.js`/`03*` pelo `mapa`; `nuvem/LEIA-ME.md` | conteúdo de `dados/` |
| **D. Documentação/histórico** | só se o pedido for sobre decisões passadas | `RESUMO-PROJETO-ESC.md` (seções 4–5), `docs/HISTORICO.md` por busca | tudo o mais |

Pedido que cruza zonas (ex.: tela nova que lista questões): comece pela A e consulte B1 por comando, nunca por leitura de arquivo.

Ao terminar: zona A/C → `npm run publicar` + `npm run testar-mudanca`; zona B → `npm run conferir -- <prova>` + `publicar`. **Se uma pasta, ferramenta ou assunto novo surgir, acrescente uma linha neste roteador no mesmo commit** — é assim que a divisão continua valendo no futuro.

## Comandos

| Comando | Para quê |
|---|---|
| `npm run mapa` / `npm run mapa -- 11c` / `npm run mapa -- palavra` | onde está cada coisa: arquivos e seções / seções e funções de um arquivo, com linha / busca em funções e seções. **Use antes de abrir arquivo** e leia só o trecho (Read com offset/limit). |
| `npm run dados` / `-- resumo-assuntos` / `-- usp-2026` / `-- q-usp2026-017` / `-- taxonomia cardio` / `-- buscar "sepse"` | o conteúdo sem abrir arquivo (cada `dados/prova-*.js` tem ~300 KB — **nunca leia um inteiro**): visão geral / uma prova / uma questão / ids de assunto / busca no enunciado |
| `npm run nova-prova -- usp-2027 "USP-SP (FMUSP)" 2027 --total 120` | cria `dados/prova-usp-2027.js` (cabeçalho + ficha) e a registra em `dados/manifesto.js` |
| `npm run adicionar-questoes -- usp-2027 lote.json` | grava um lote de questões na entrada compacta (só o que é da questão; a ferramenta completa o resto), tudo ou nada, conferido; `--simular` só confere |
| `npm run publicar` | **uma vez ao final de qualquer mudança**: atualiza a versão no `index.html` (hash do código × hash dos dados) e regera `dados/CATALOGO.md` |
| `npm run testar-mudanca` | roda só o que a mudança pode ter quebrado (conteúdo → segundos; código → suíte inteira); `-- --ver` mostra a escolha |
| `npm test` | tudo (Playwright/Chromium, ~3 min). Um teste: `node --test --test-name-pattern="trecho do nome" testes/arquivo.test.mjs` |
| `npm run relatos -- relatos-AAAA-MM-DD.json` / `-- <arquivo> q-id` / `-- registrar q-id --relatos ids --acao "…"` / `-- pendentes` | questões **relatadas por alunos** (sinalização, dúvida): lista da mais citada à menos / uma questão com os relatos e o texto inteiro / grava em `docs/REGISTRO-DE-RELATOS.md` o que foi feito (campos alterados vêm do diff com o HEAD) para uma pessoa conferir. O arquivo vem do site (*Questões para Atualizar › Baixar os relatos*), fica fora do git (texto de aluno) e **toda correção feita a partir de relato termina com `registrar`** |
| `npm run conferir` (`-- --resumo`, `-- usp-2027`) | confere a pasta `dados/` (ids, gabaritos, taxonomia, provas completas, figuras); a saída inteira tem ~90 linhas — prefira o resumo ou o filtro por prova |
| `npm run medir-bancos` (`-- --md`; um banco: `node ferramentas/medir-banco-adaptado.mjs banco-x prova-y --exigir`) / `npm run conferir-numeros -- banco-x` / `npm run vigencia -- --termo KDIGO --ate 2023` / `npm run pos-simulado -- sim-x backup.json` / `npm run figuras -- listar` · `pendentes` · `gerar modelo id` | **simulado autoral** (banco adaptado de uma prova real; lista em `ferramentas/bancos-adaptados.json`): mede as metas (letra, tamanho de alternativa posição por posição, área, gabarito = letra seguinte, assunto, semelhança, repetição) e falha se faltar / número do enunciado ≠ da explicação / explicações que citam uma diretriz ou ano e foram escritas antes de uma data / questões a revisar depois que alunos fizeram o simulado (backups ficam fora do git) / figuras por código e questões esperando figura |
| `npm run referencias-a-conferir` / `npm run anotar-conferencia -- q-id "nota"` / `npm run texto-oficial -- <url> --buscar "regex"` | **conferência de referências** das questões (simulados autorais): a fila das que ainda não têm conferência datada, agrupada por diretriz / grava a nota datada em `referencias` da questão (acha o arquivo, escapa aspas, desfaz se falhar) / baixa PDF ou página oficial e mostra as linhas que casam. Método, domínios que abrem e regras (não mudar gabarito por fonte secundária) em `.claude/skills/conferir-referencias/SKILL.md`; o que já foi lido, em `docs/CONFERENCIA-DE-REFERENCIAS-NA-WEB.md`; tabela de edições vigentes em `ferramentas/edicoes-vigentes.json` |
| `npm run prioridade-formados` (`-- --json`) | **ordem de assuntos para o calendário de Formados**: demanda das provas reais (peso maior para prova recente) × construção do conhecimento (pré-requisitos em `ferramentas/prerequisitos-formados.json`); escreve `docs/PRIORIDADE-ASSUNTOS-FORMADOS.md` (e, com `-- --dados`, `dados/trilha-formados.js`, que a plataforma lê) em ondas de 30 assuntos com cobertura acumulada. Assunto novo na taxonomia? Acrescente seus pré-requisitos no JSON e rode de novo |
| `npm run reposicoes` / `-- pendentes [palavra]` / `-- feitas` / `-- <q-id>` | **reposições** (questão à parte, `reposicaoDe`, que corrige uma anulada ou desatualizada e só entra na prova "com correção por IA" e no estudo geral): quantas anuladas/desatualizadas já têm reposição, quais faltam, e a original lado a lado com a reposição. Método e fontes: `docs/REPOSICOES-DE-QUESTOES.md` |
| `npm run simular-formado` (`-- --semanas 8 --por-semana 200 --acerto 0.7 --exigir`) | **conferência do cronograma de Formados**: roda o código real semana a semana com um aluno simulado e mostra quanto das questões novas veio da trilha, cobertura por área (informativa), mistura de dificuldade em cada fase, assuntos por fase/consolidados e fila de revisão; `--exigir` falha se a mistura sair da tolerância, se repetir questão antes do prazo, se vier questão de fora da trilha ou de assunto consolidado sem o motivo dizer, ou se a fila passar de duas semanas de revisão crescendo |
| `npm run testar-sql` | `nuvem/esquema.sql` + regras de segurança (RLS) num PostgreSQL local temporário |
| `npm run atualizar-dados -- arquivo.json` | grava em `dados/` as correções baixadas de "Questões para Atualizar" |

Instalar: `npm ci`. Antes de abrir um arquivo de `codigo/` ou `dados/`, use `npm run mapa` / `npm run dados`. No Claude Code na web o Chromium do Playwright já vem instalado (não rode `playwright install`); noutra máquina, `npx playwright install chromium` uma vez. CI: `.github/workflows/testes.yml` (testes + SQL num PostgreSQL de verdade).

## Como o código roda (leia antes de mexer)

- `codigo/*.js` são **scripts comuns carregados em ordem** pela lista `ESC_ARQUIVOS.codigo` do `index.html`; todos dividem o mesmo escopo global. Função de um arquivo é chamada nos outros sem import. **Código que roda na carga** (fora de função) só pode usar o que arquivos anteriores já declararam.
- A lista dos arquivos de `dados/` está em **`dados/manifesto.js`** (não no `index.html`); a de `codigo/` está no `ESC_ARQUIVOS.codigo` do `index.html`. Os arquivos de `dados/` rodam antes e chamam `window.EscDados.registrarQuestoes(nome, [...])` (e `registrarFlashcards`, `registrarTaxonomia`, `registrarCalendario`, `registrarSimulados`, `registrarDemonstracao`). `SEED_*` são só apelidos dessas listas.
- `db` = o banco (localStorage `medbloco_db_v1`); `state` = estado temporário de tela. Padrão de toda ação: mudar `db` → `saveState()` → `render()` (ou redesenhar só a parte, ex. `redesenharQuestaoDaSessao()`). `saveState()` guarda de cada questão/cartão da semente **só a diferença** (`compactarParaArmazenar`) e incrementa `_geracaoDb`, que invalida os caches.
- Telas: `renderX()` devolve HTML (template literal); eventos inline `onclick="fn('id')"` — por isso as funções são globais. Roteador: `render()` + `ROUTE_TITLES` + `navigate(rota)` (06); menu: `navItemsParaPapel` (06); permissão de admin por rota: `PERMISSAO_DA_ROTA` (04).
- **Sempre** `escapeHtml()` em texto de usuário ou de conteúdo dentro do HTML.
- Utilidades (04): `abrirModal(html, "lg")`, `cabecalhoJanela(tituloHtml)`, `abrirModalTitulado(titulo, corpo)`, `fecharModal()`, `toast(msg, "err")`, `baixarArquivo(nome, conteudo, tipo)`, `paginar(lista, chave, {porPagina, assinatura})` + `controlesPaginacao(p, rotulo)`, `iconeSvg(nome)` (símbolos no `index.html`), `hojeISO()`, `formatDataBR()`, `uid(prefixo)`, `copiaProfunda()`; consultas `getQuestao/getAssunto/getEspecialidade` (indexadas), `getUsuario`, `usuarioAtual()`, `podeAdmin(perm)`, `podeGerirConteudo()`.
- Questão: `tipo` (`"dissertativa"` ou ausente = múltipla escolha; a dissertativa traz `respostaEsperada` e não tem alternativas nem gabarito — `ehDissertativa(q)`; fica fora de simulado e PDF), `real`, `banca`, `ano`, `numeroNaProva`, `status` (`ativa`/`anulada`/`desatualizada`/`pendente`/`rascunho`), `imagemPendente` (tira a questão do estudo dos alunos — `aguardaImagem(q)`), `questaoAlterada` (uma frase do que a equipe mudou no texto de uma questão real; não a torna autoral; selo "Questão alterada" sempre, frase só depois de responder: `badgeQuestaoAlterada`/`htmlAvisoQuestaoAlterada`, 04), `justificativaEm` (`AAAA-MM` em que a explicação foi escrita, para saber o que revisar quando uma diretriz muda; as ferramentas de `dados/` preenchem, a edição pela plataforma renova quando a explicação muda, e sem o campo vale o mês de `criadoEm` — `mesDaJustificativa(q)`; aparece pequeno sob a explicação). Fila de estudo usa `questoesParaEstudo(uid)`; contagens e provas inteiras usam `questoesAtivas()`.

## Nuvem (03a–03d + `nuvem/esquema.sql`)

- Ligada por `CONFIG.nuvem` (url + chave anônima, pública de propósito: quem protege é o RLS; a chave `service_role` nunca entra em arquivo). Vazia, nenhum código de nuvem roda. Toda chamada passa por `nuvemChamar(caminho, opcoes)`.
- Estudo de cada pessoa: `NUVEM_TABELAS` (03b) + `nuvemRegistrar({...})`. Tabelas de todos: `NUVEM_GLOBAIS` (03c, e 03e para grupos e cartões), cada uma com `chave`, `podeGravar`, `aplicar`, `linha` (e `enviar` quando sobe imagem antes); marcar para subir: `nuvemMarcarGlobalPendente(tabela, chave)` + `nuvemAgendarSync()`.
- **Armadilha do RLS:** o upsert do site (`Prefer: resolution=merge-duplicates`) passa pela regra de **inserção** mesmo quando só atualiza — gravar linha de **outra pessoa** (moderar comentário, marcar feedback como lido) tem de ir por `PATCH`: descritor com `alheia` + `colunaChave`. Mudou regra? `npm run testar-sql`.
- Tabela nova: no `esquema.sql`, `create table if not exists` com `atualizado_em` + índice, entrar na lista do carimbo, `enable row level security`, políticas, e na lista do `revoke … from anon`; testes em `testes/sql/regras.sql` e um teste de ponta a ponta com nuvem de mentira (modelo: `testes/atualizacoes-e-feedback.test.mjs`). Tabela/coluna que o banco ainda não tem é tolerada (`_nuvemTabelasAusentes`, `NUVEM_CAMPOS_NOVOS`) — e a pessoa precisa rodar o `esquema.sql` de novo: diga isso a ela e atualize a pendência no topo do `RESUMO-PROJETO-ESC.md` e a tabela do `nuvem/LEIA-ME.md`.
- Conteúdo da pasta `dados/` não sobe; conserto numa questão dela vira correção (`registrarCorrecaoDaQuestao`, tabela `correcoes_questoes`). Questão enviada pela plataforma sobe inteira (`questoes_enviadas`, imagem no Storage).

## Mapa de `codigo/` (seções numeradas: `npm run mapa`)

| Arquivo | Seções | O que tem |
|---|---|---|
| `01-config.js` | 1 | `CONFIG`, estado global, tema |
| `02-persistencia.js` | 2 | apelidos `SEED_*`, conferência de `dados/`, `loadState`/`saveState`, migrações, compactação, rede de segurança |
| `03a-nuvem-conexao.js` | 2-C | ritmo da sincronização, `nuvemChamar`, sessão, entrar/cadastrar/sair, volta dos e-mails, perfil |
| `03b-nuvem-sincronizacao.js` | 2-C | `NUVEM_TABELAS`, fila, sincronização, calendário compartilhado |
| `03c-nuvem-compartilhadas.js` | 2-C | `NUVEM_GLOBAIS`: livro de ouro, formatação, comentários, feedback, questões enviadas, correções |
| `03d-nuvem-telas.js` | 2-C | trazer estudo local, entrar/sair pela tela, percentil, painel, cadastros, usuários, diagnóstico, senha, cartão da nuvem, gatilhos |
| `03e-nuvem-grupos.js` | 2-C | grupos, membros e grupos de estudo na nuvem (`nuvemConferirGrupos`); cartões enviados à equipe ou ao grupo (`flashcards_enviados`) |
| `04-utilitarios.js` | 3 | datas, paginação, janelas, download, gráficos SVG, rodízio, consultas por id, permissões |
| `05a-motor-de-estudos.js` | 4 | bloco atual, dificuldade, respostas, ocultas, repetição espaçada, flashcards, sessões |
| `05c-cronogramas-de-sessao.js` | 4 | sessão sem calendário, cronograma de Formados (sessão pelos assuntos da trilha, fases e ritmo por assunto: `fasesDosAssuntosFormado`, `proximoNivelDaFase`, `abrirRitmoDoFormado`) e do 6º ano |
| `05b-desempenho-e-metas.js` | 4 | desempenho, calibração, metas, lembrete, o que mais cai, nota estimada |
| `05d-trilha-de-estudos.js` | 4 | trilha por taxa de erro: assuntos com mais erro recebem mais questões; janela de montagem e cartão de sugestão (`abrirTrilhaDeEstudos`) |
| `05f-revisao-sugerida.js` | 4-D | revisão sugerida: assuntos já estudados que esfriaram (erro, depois tempo parado), conjunto no tamanho pedido, janela e cartão (`abrirRevisaoSugerida`) |
| `05e-trilha-de-formados.js` | 4-C | trilha do cronograma de Formado(a): fila `dados/trilha-formados.js` (demanda × pré-requisitos), assuntos em estudo/consolidados/esperando, tela “Minha trilha” (`trilhaDeFormado`, `abrirTrilhaDeFormado`) |
| `06-entrada-e-estrutura.js` | 5–7 | login local, roteador, gesto de arrastar, menu e topo |
| `06b-busca-global.js` | 5-B | busca global (Ctrl/Cmd+K e botão do topo): telas, assuntos e questões pelo enunciado (`abrirBuscaGlobal`) |
| `06c-modo-plataforma.js` | 5-C | modo resumido × estatístico do aluno: a escolha (`u.modoPlataforma`), a pergunta de primeira vez, o cartão do Perfil, `modoResumido()`, `soNoEstatistico()`, `explicacaoRecolhida()` |
| `06d-controle-de-videogame.js` | 5-D | controle de videogame (Gamepad API): setas ↑↓ rolam, ←→ trocam de questão, botões da direita escolhem A–D (R1 = E) e, com a alternativa marcada, dão a confiança (cima chute · esquerda certeza · baixo dúvida; com a marcada, C e E sem função, L1 desmarca, L2 segurado + alternativa risca); flashcards (direita vira, esquerda sabia, baixo quase, cima não lembrei); vibração; rótulos por marca só com controle conectado (`body.com-controle`); opção e velocidade por aparelho (`renderCardControle`, Perfil) |
| `07-telas-iniciais.js` | 8–10-B | telas públicas, volta do e-mail, boas-vindas, Início, Estudar, questão na íntegra |
| `08-sessao-e-revisao.js` | 11 | sessão de questões, barra de questões, cartão da questão, comentários |
| `08d-revisao.js` | 12 | tela de Revisão (por assunto, fila de erros e chutes) |
| `08e-comentarios-e-duvidas.js` | 11-D | comentários e dúvidas por questão, regra das áreas de atuação, sinalizar desatualizada, prompt de dúvida para IA |
| `08b-destaques-de-texto.js` | 11-B | selecionar um trecho da questão ou do cartão e destacá-lo (`htmlComDestaques`, `atributoDestacavel`), por pessoa |
| `08c-questoes-dissertativas.js` | 11-C | questão dissertativa na sessão: escrever, confiança, resposta esperada, autoavaliação (`renderCartaoDissertativa`) |
| `09a-revisao-rapida.js` | 12-B | flashcards |
| `09b-simulados-e-provas.js` | 13–14 | simulados e provas antigas |
| `09c-cartoes-em-lote.js` | 12-C, 12-D | cartões em lote; Adicionar baralho (trazer baralho inteiro de uma IA) |
| `10a-favoritos-historico-desempenho.js` | 16–17 | Favoritos, Livro de Ouro, Histórico, Meu Desempenho |
| `10b-meta-grupo-perfil.js` | 18 (+18-B, 18-C) | Meta, Meu Grupo, integrantes e grupos de estudo |
| `10c-perfil.js` | 19 | Perfil e configurações, "Seus dados" |
| `11a-simulado-e-pdf.js` | 20, 20-B | Criar Simulado, Material em PDF |
| `11b-qualidade-e-cadastros.js` | 21, 23, 24 | Questões Difíceis/qualidade, Fila de Dúvidas, cadastros, usuários, Feedback dos Usuários |
| `11c-banco-e-taxonomia.js` | 25, 25-B | Banco de Questões, formulário de questão, Especialidades e Assuntos |
| `11d-painel-da-turma.js` | 24-C | Painel da Turma |
| `11e-avisos.js` | 24-D | Enviar Avisos (painel do administrador) e o card de avisos no Início |
| `12a-importacao.js` | 26 | Importar/Enviar questões |
| `12b-central-de-provas.js` | 26-B | Central de Provas |
| `12c-questoes-para-atualizar.js` | 26-D | Questões para Atualizar (correções, arquivo de atualizações) |
| `12d-pendencias-de-conteudo.js` | 26-E | Pendências de conteúdo: figuras, desatualizadas, provas com número faltando, assuntos sem cartão — calculado do banco (`pendenciasDeConteudo`) |
| `13-tutorial.js` | 26-C | tutorial rápido e guia completo |
| `14-admin-e-inicializacao.js` | 27–28 | Blocos, Configurações, versão nova, PWA, **inicialização (sempre o último)** |
| `estilo.css` | — | visual (tokens de cor nos dois temas) |

## Regras da casa

- **Comentário diz o porquê** (a decisão, o defeito que ela evita), em português, junto do código. Nada de changelog no código: a história vai para `docs/HISTORICO.md`.
- Arquivo de `codigo/` começa com `/* codigo/<nome>.js — <o que tem>` e não passa de 1.400 linhas; passou, divida por assunto (`03a`, `03b`…) e atualize `ESC_ARQUIVOS` e o mapa acima. Nome de primeiro nível não se repete entre arquivos; função sem uso sai. (`testes/higiene.test.mjs` confere tudo isso.)
- Antes de repetir um trecho de HTML/lógica, procure a utilidade que já existe (`npm run mapa -- palavra`).
- Mudou o que vai para o ar (`codigo/`, `dados/`, `estilo.css`)? Rode `npm run publicar` — ele escreve `window.ESC_VERSAO` (`AAAA-MM-DD.cHASH.dHASH`) no `index.html`; **nunca à mão**. O `cHASH` é do código e o `dHASH` dos dados, então o aluno só baixa de novo o que mudou. `npm test` falha se a versão estiver velha.
- Tela nova: `renderX` no arquivo do assunto, rota no `render()` e em `ROUTE_TITLES`, item em `navItemsParaPapel`, permissão em `PERMISSAO_DA_ROTA` se for de admin, e texto no guia (`13-tutorial.js`) se for para o usuário. Rota que sai do menu continua respondendo (redireciona): link salvo não pode quebrar.
- Mudança no modelo de dados vem com migração em `loadState` (02); se o dado sincroniza, com entrada em `NUVEM_TABELAS`/`NUVEM_GLOBAIS` e tabela no `esquema.sql`. Nenhuma dependência nova, nenhum framework (gráficos são SVG à mão; PDF é a impressão do navegador).
- A plataforma **explica o que faz**: quando o algoritmo prioriza, esconde ou muda algo, a tela diz o porquê. Regra que já quebrou uma vez ganha um caso em `testes/regras.test.mjs`.
- Teste de ponta a ponta: Playwright em `testes/*.test.mjs`, nuvem simulada por `contexto.route(/supabase\.co/, …)`; feche servidor e contexto em `try/finally` (uma falha não pode travar o `node --test`).
- Conteúdo: enunciado/alternativas/gabarito de prova pública se transcrevem; a **explicação é sempre autoral**, de fontes primárias — nunca copiada de cursinho ou site de questões (`dados/LEIA-ME.md`).
- **Referência lida e datada, sempre:** toda questão criada desde 02/11/2026 (real ou autoral, em arquivo novo ou antigo) traz em `referencias` a data em que o texto da diretriz foi lido e não cita edição já superada (`ferramentas/edicoes-vigentes.json`); `npm run conferir` e `adicionar-questoes` recusam o que não cumpre (regra em `ferramentas/lib-referencias.mjs`, passo a passo em `dados/LEIA-ME.md`, "Referências conferidas"). Edição nova de uma diretriz? Acrescente-a à tabela e rode `npm run referencias-a-conferir`: ele lista, em `docs/REFERENCIAS-COM-EDICAO-ANTERIOR.md`, as questões de **todas** as provas que citam a antiga.
- **Prova nova, justificativa completa:** toda questão real de arquivo novo em `dados/` traz a explicação no padrão — "Dicas do enunciado:" (ou da imagem), dados objetivos em `**destaque**` com valor normal e ponto de corte, o **mecanismo fisiopatológico** e o **contexto epidemiológico** que levam à resposta, e o motivo de cada alternativa errada (`dados/PADRAO-EXPLICACAO.md`, "Padrão de justificativa de prova nova"; o texto dos prompts é `regraDeFisiopatologiaEEpidemiologia`, 08e). `npm run conferir` só checa a forma; o conteúdo (itens 7 e 8) é de quem escreve. `npm run conferir` falha se faltar; a lista de exceções `PROVAS_ANTERIORES_AO_PADRAO` (`testes/conferir-dados.mjs`) está vazia e prova nova nunca entra nela. Comentário oficial da própria banca (Teste de Progresso) é ponto de partida, reescrito nesse padrão.

## Conteúdo (`dados/`) — subir prova sem reler o código

Receita para prova nova (nada em `codigo/`, nada no `index.html`):
1. `npm run nova-prova -- <nome> "<Banca>" <ano> --total N` (opções: `--alternativas 5`, `--tipo graduacao`, `--prefixo q-xxx`).
2. `npm run dados -- taxonomia <palavra>` para os ids de assunto; `npm run dados -- buscar "<texto>"` para não repetir questão.
3. Escreva lotes de 20–30 em JSON compacto (`n`, `assunto`, `enunciado`, `alt[]`, `gabarito`, `explicacao`, `referencias` **com a data em que o texto da diretriz foi lido**; formato completo em `dados/ADICIONAR.md`, rascunho em `lotes/` (fora do git) e `dados/PADRAO-EXPLICACAO.md` ("Referências conferidas")). Antes de escrever, leia o texto oficial (`npm run texto-oficial`) e veja `docs/CONFERENCIA-DE-REFERENCIAS-NA-WEB.md` e `npm run adicionar-questoes -- <nome> lote.json`. Falhou? Nada foi gravado e o erro diz a questão.
4. Figuras em `dados/imagens/<id>.png`; sem a figura, `imagemPendente:"descrição"`.
5. `npm run publicar` → `npm run testar-mudanca`. Não há tabela a editar à mão: `CATALOGO.md` e as contagens são geradas.

Regras: a explicação segue o padrão de justificativa (abaixo e em `dados/PADRAO-EXPLICACAO.md`) — a ferramenta já recusa o que sai dele. Observação de uma prova (origem do gabarito, pendências) vai no **cabeçalho do arquivo dela**, não em documento à parte. Conserto de uma questão já publicada: `npm run atualizar-dados`. Mudar a plataforma **nunca** exige tocar em `dados/` (e o hash dos dados não muda se `dados/` não mudar).

## Documentos

- `RESUMO-PROJETO-ESC.md` — o que a plataforma faz e o **porquê** de cada decisão (seções 4–5), pendências no topo. Para conversa fora do Claude Code, anexe-o junto com o arquivo de `codigo/` da tela.
- `docs/HISTORICO.md` — o que mudou em cada rodada. Só quando precisar da história.
- `docs/REPOSICOES-DE-QUESTOES.md` — memória do trabalho de reposição de questões anuladas/desatualizadas: como a plataforma trata (duas versões da prova), como se escreve uma, fontes que abrem ou não, o que já foi lido (com edição) e o mapa do que falta. Leia antes de começar uma reposição.
- `docs/CONFERENCIA-DE-REFERENCIAS-NA-WEB.md` — o que foi conferido nas referências das questões (PubMed, web e textos oficiais), com data e fonte; `docs/REFERENCIAS-A-CONFERIR.md` — a fila do que falta nos simulados autorais e `docs/REFERENCIAS-COM-EDICAO-ANTERIOR.md` — as questões de todas as provas que citam edição superada (ambas geradas por `npm run referencias-a-conferir`). Leia antes de repetir uma busca.
- `docs/PENDENCIAS-DE-REFERENCIAS.md` — **pendências de referência da USP e da UNIFESP num só lugar**: questões que citam edição superada, diretrizes fora de `ferramentas/edicoes-vigentes.json`, PDFs que a rede não abre e letras de gabarito a conferir. Abra antes de conferir referências dessas provas; apague a linha ao resolver.
- `PENDENCIAS.md` (o que falta no conteúdo), `dados/LEIA-ME.md` (formato do conteúdo), `nuvem/LEIA-ME.md` (ligar e manter a nuvem).
