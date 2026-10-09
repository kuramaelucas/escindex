# Esc — guia de trabalho no código

Plataforma de estudos para residência médica. Site estático **sem build, sem dependências, sem módulos**: `index.html` (moldura) + `codigo/` (código) + `dados/` (conteúdo), abre com dois cliques. **Código e conteúdo são independentes**: mexer em um não toca no outro (ver "Conteúdo" abaixo). Nuvem opcional (Supabase, só `fetch` na API REST). Tudo em **português**: telas, identificadores (`renderPainelTurma`, `nuvemMarcarFeedback`), comentários e documentação.

## Comandos

| Comando | Para quê |
|---|---|
| `npm run mapa` / `npm run mapa -- 11c` / `npm run mapa -- palavra` | onde está cada coisa: arquivos e seções / seções e funções de um arquivo, com linha / busca em funções e seções. **Use antes de abrir arquivo** e leia só o trecho (Read com offset/limit). |
| `npm run dados` / `-- usp-2026` / `-- q-usp2026-017` / `-- taxonomia cardio` / `-- buscar "sepse"` | o conteúdo sem abrir arquivo (cada `dados/prova-*.js` tem ~300 KB — **nunca leia um inteiro**): visão geral / uma prova / uma questão / ids de assunto / busca no enunciado |
| `npm run nova-prova -- usp-2027 "USP-SP (FMUSP)" 2027 --total 120` | cria `dados/prova-usp-2027.js` (cabeçalho + ficha) e a registra em `dados/manifesto.js` |
| `npm run adicionar-questoes -- usp-2027 lote.json` | grava um lote de questões na entrada compacta (só o que é da questão; a ferramenta completa o resto), tudo ou nada, conferido; `--simular` só confere |
| `npm run publicar` | **uma vez ao final de qualquer mudança**: atualiza a versão no `index.html` (hash do código × hash dos dados) e regera `dados/CATALOGO.md` |
| `npm run testar-mudanca` | roda só o que a mudança pode ter quebrado (conteúdo → segundos; código → suíte inteira); `-- --ver` mostra a escolha |
| `npm test` | tudo (Playwright/Chromium, ~3 min). Um teste: `node --test --test-name-pattern="trecho do nome" testes/arquivo.test.mjs` |
| `npm run conferir` (`-- --resumo`, `-- usp-2027`) | confere a pasta `dados/` (ids, gabaritos, taxonomia, provas completas, figuras); a saída inteira tem ~90 linhas — prefira o resumo ou o filtro por prova |
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
- Questão: `tipo` (`"dissertativa"` ou ausente = múltipla escolha; a dissertativa traz `respostaEsperada` e não tem alternativas nem gabarito — `ehDissertativa(q)`; fica fora de simulado e PDF), `real`, `banca`, `ano`, `numeroNaProva`, `status` (`ativa`/`anulada`/`desatualizada`/`pendente`/`rascunho`), `imagemPendente` (tira a questão do estudo dos alunos — `aguardaImagem(q)`). Fila de estudo usa `questoesParaEstudo(uid)`; contagens e provas inteiras usam `questoesAtivas()`.

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
| `05b-desempenho-e-metas.js` | 4 | desempenho, calibração, metas, lembrete, o que mais cai, nota estimada |
| `06-entrada-e-estrutura.js` | 5–7 | login local, roteador, gesto de arrastar, menu e topo |
| `06b-busca-global.js` | 5-B | busca global (Ctrl/Cmd+K e botão do topo): telas, assuntos e questões pelo enunciado (`abrirBuscaGlobal`) |
| `07-telas-iniciais.js` | 8–10-B | telas públicas, volta do e-mail, boas-vindas, Início, Estudar, questão na íntegra |
| `08-sessao-e-revisao.js` | 11–12 | sessão de questões, barra de questões, cartão da questão, comentários, Revisão |
| `08b-destaques-de-texto.js` | 11-B | selecionar um trecho da questão ou do cartão e destacá-lo (`htmlComDestaques`, `atributoDestacavel`), por pessoa |
| `08c-questoes-dissertativas.js` | 11-C | questão dissertativa na sessão: escrever, confiança, resposta esperada, autoavaliação (`renderCartaoDissertativa`) |
| `09a-revisao-rapida.js` | 12-B | flashcards |
| `09b-simulados-e-provas.js` | 13–14 | simulados e provas antigas |
| `09c-cartoes-em-lote.js` | 12-C, 12-D | cartões em lote; Adicionar baralho (trazer baralho inteiro de uma IA) |
| `10a-favoritos-historico-desempenho.js` | 16–17 | Favoritos, Livro de Ouro, Histórico, Meu Desempenho |
| `10b-meta-grupo-perfil.js` | 18–19 (+18-C) | Meta, Meu Grupo, Perfil e configurações, "Seus dados" |
| `11a-simulado-e-pdf.js` | 20, 20-B | Criar Simulado, Material em PDF |
| `11b-qualidade-e-cadastros.js` | 21, 23, 24 | Questões Difíceis/qualidade, Fila de Dúvidas, cadastros, usuários, Feedback dos Usuários |
| `11c-banco-e-taxonomia.js` | 25, 25-B | Banco de Questões, formulário de questão, Especialidades e Assuntos |
| `11d-painel-da-turma.js` | 24-C | Painel da Turma |
| `11e-avisos.js` | 24-D | Enviar Avisos (painel do administrador) e o card de avisos no Início |
| `12a-importacao.js` | 26 | Importar/Enviar questões |
| `12b-central-de-provas.js` | 26-B | Central de Provas |
| `12c-questoes-para-atualizar.js` | 26-D | Questões para Atualizar (correções, arquivo de atualizações) |
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
- **Prova nova, justificativa completa:** toda questão real de arquivo novo em `dados/` traz a explicação no padrão — "Dicas do enunciado:" (ou da imagem), dados objetivos em `**destaque**` com valor normal e ponto de corte, e o motivo de cada alternativa errada (`dados/LEIA-ME.md`, "Padrão de justificativa de prova nova"). `npm run conferir` falha se faltar; a lista de exceções `PROVAS_ANTERIORES_AO_PADRAO` (`testes/conferir-dados.mjs`) está vazia e prova nova nunca entra nela. Comentário oficial da própria banca (Teste de Progresso) é ponto de partida, reescrito nesse padrão.

## Conteúdo (`dados/`) — subir prova sem reler o código

Receita para prova nova (nada em `codigo/`, nada no `index.html`):
1. `npm run nova-prova -- <nome> "<Banca>" <ano> --total N` (opções: `--alternativas 5`, `--tipo graduacao`, `--prefixo q-xxx`).
2. `npm run dados -- taxonomia <palavra>` para os ids de assunto; `npm run dados -- buscar "<texto>"` para não repetir questão.
3. Escreva lotes de 20–30 em JSON compacto (`n`, `assunto`, `enunciado`, `alt[]`, `gabarito`, `explicacao`, `referencias`; formato completo em `dados/LEIA-ME.md`, "Entrada compacta") e `npm run adicionar-questoes -- <nome> lote.json`. Falhou? Nada foi gravado e o erro diz a questão.
4. Figuras em `dados/imagens/<id>.png`; sem a figura, `imagemPendente:"descrição"`.
5. `npm run publicar` → `npm run testar-mudanca`. Não há tabela a editar à mão: `CATALOGO.md` e as contagens são geradas.

Regras: a explicação segue o padrão de justificativa (abaixo e em `dados/LEIA-ME.md`) — a ferramenta já recusa o que sai dele. Observação de uma prova (origem do gabarito, pendências) vai no **cabeçalho do arquivo dela**, não em documento à parte. Conserto de uma questão já publicada: `npm run atualizar-dados`. Mudar a plataforma **nunca** exige tocar em `dados/` (e o hash dos dados não muda se `dados/` não mudar).

## Documentos

- `RESUMO-PROJETO-ESC.md` — o que a plataforma faz e o **porquê** de cada decisão (seções 4–5), pendências no topo. Para conversa fora do Claude Code, anexe-o junto com o arquivo de `codigo/` da tela.
- `docs/HISTORICO.md` — o que mudou em cada rodada. Só quando precisar da história.
- `PENDENCIAS.md` (o que falta no conteúdo), `dados/LEIA-ME.md` (formato do conteúdo), `nuvem/LEIA-ME.md` (ligar e manter a nuvem).
