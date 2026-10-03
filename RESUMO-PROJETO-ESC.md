# Esc — plataforma de estudos para residência médica
## Resumo do projeto (setembro de 2026)

Este documento existe para que uma nova conversa com o Claude comece sabendo tudo o que já foi decidido e construído. Anexe-o junto com o `CLAUDE.md` (como o código funciona e o mapa dos arquivos) e o arquivo da pasta `codigo/` que tem a tela ou a regra em questão; se a conversa for sobre conteúdo, com o arquivo da pasta `dados/` que interessa. No Claude Code, o `CLAUDE.md` já é lido sozinho.

> **Estado atual, em uma frase:** plataforma completa (estudo, revisão espaçada, flashcards, simulados, desempenho, "o que mais cai" e nota estimada, PDF, controle de qualidade, upload de provas em lotes, Painel da Turma) com **4.775 questões** — das quais **500 reais da UNIFESP-EPM** (2022 a 2026), **500 reais da Santa Casa de São Paulo** (2021, 2022, 2023, 2025 e 2026), **580 reais da USP-SP/FMUSP** (2022 a 2026) **618 reais da USP-RP/FMRP** (2021 a 2026), **400 reais da AMRIGS** (2022 a 2025), **440 reais do IAMSPE** (2021, 2022, 2023, 2025 e 2026) **100 reais da UNESP** (2023) e **400 reais da FAMEMA** (2021, 2022, 2023 e 2025), **500 reais da SES-SP** (2022 a 2025, gabarito definitivo da banca; 2026, gabarito da cópia do caderno, a conferir) e **600 reais do Teste de Progresso do NIEPAEM** (prova da graduação; 2023/1, 2023/2, 2024/1, 2º semestre de 2025 e 1º de 2026, com o comentário oficial aprimorado), as de residência com explicação autoral —, **943 cartões** cobrindo 238 dos **270 assuntos** em **41 especialidades**, **conta de verdade e sincronização entre aparelhos pela nuvem** (Supabase, seção 4-B), **aplicativo instalável que abre sem internet**, código em `codigo/`, conteúdo em `dados/` e **testes automáticos** a cada envio (`testes/`). O histórico de como se chegou até aqui está em `docs/HISTORICO.md`; o que falta fazer está na seção 10.

> **Pendências abertas (24/09/2026) — três coisas só a coordenação pode fazer, no painel do Supabase e no GitHub** (a rede de onde o código é escrito não alcança o Supabase):
>
> 1. **Rodar de novo o `nuvem/esquema.sql`** (SQL Editor > colar tudo > Run). Dezoito novidades dependem dele — os **grupos na nuvem** (`grupos`, `grupo_membros`, `subgrupos`, `flashcards_enviados` e `questoes_enviadas.grupo_id`, 01/10 — sem rodar, os grupos e os cartões compartilhados ficam só no navegador de quem os criou, e as questões enviadas para o grupo esperam na fila), os **avisos da coordenação** (`avisos` e `perfis.avisos_lidos`, 29/09 — sem rodar, o Enviar Avisos guarda o aviso só no navegador de quem enviou e a leitura dele não viaja entre aparelhos), os **destaques de texto** (`destaques`, 29/09), o **segundo grupo, só de questões** (`perfis.grupo_questoes_id`, 02/10 — sem rodar, o segundo grupo vale só no aparelho onde foi escolhido), a **ordem própria dos estágios do 6º ano** (`perfis.ordem_estagios`, 29/09), o **Painel da Turma sem acerto individual e com a equipe** (`painel_turma()` recriada, `acerto_por_turma()` nova, 29/09 — sem rodar, o painel mostra o acerto antigo de cada aluno até o SQL entrar), o **feedback da plataforma chegando aos administradores** (`feedbacks`, 28/09), os **consertos das questões da pasta `dados/`** (`correcoes_questoes`, 28/09), as **questões enviadas pela plataforma, com as imagens** (`questoes_enviadas` e o espaço de imagens `questoes` no Storage, 28/09), a anotação da questão salva (`favoritos.nota`), a contagem de flashcards por dia (`dias_cartoes.quantidade`), os flashcards favoritados (`favoritos_cartoes`), as questões escondidas (`questoes_ocultas`), o Livro de Ouro (`livro_ouro`), a formatação aprovada (`formatacao_aprovada`), o primeiro acesso (`perfis.boas_vindas_em`) e, desta rodada, os **comentários e dúvidas** (`comentarios`), o **percentil da turma** (`notas_do_simulado()`) e o **Painel da Turma** (`painel_turma()`, `atividade_por_semana()`). O arquivo acrescenta cada uma sem mexer no que existe, e agora roda também num projeto novo. Enquanto não for rodado, a plataforma funciona e não perde nada: pula o que falta, sincroniza o resto e avisa em *Perfil*.
> 2. **Authentication > URL Configuration**: pôr o endereço do site em *Site URL* e em *Redirect URLs* (com `**` no fim). É o que faz o link de confirmação de e-mail e o de "esqueci a senha" voltarem para o Esc (seção 4-B; passo a passo em `nuvem/LEIA-ME.md`, passo 3).
> 3. **Backup automático**: cadastrar no GitHub os segredos `SUPABASE_DB_URL` e `BACKUP_SENHA` (`nuvem/LEIA-ME.md`, "Backup automático"). Até lá, o fluxo roda e só avisa que está desligado.
>
> **Cadastro: e-mail só na aprovação + push para admins (02/10/2026).** Para valer: (a) em *Authentication > Providers > Email*, **desligar "Confirm email"** — o e-mail passa a sair quando a coordenação aprova (link de acesso, modelo *Magic Link*; ele avisa e confirma ao mesmo tempo); (b) **rodar de novo o `esquema.sql`** (tabela `push_inscricoes`); (c) opcional, para o aviso chegar com o app fechado: `nuvem/LEIA-ME.md` passo 3-B (chave VAPID, função `avisar-pedido`, webhook em `perfis`). Sem (c) o aviso continua só com o Esc aberto.

---

## 1. O que é

O Esc é uma plataforma de estudos para prova de residência médica **de arquivo aberto**: sem instalação, sem servidor, sem build. São duas peças que andam juntas:

- **`index.html`** — só a MOLDURA (~12 KB): cabeçalho, ícones, a versão (`ESC_VERSAO`) e a lista `ESC_ARQUIVOS` dos arquivos a carregar, na ordem.
- **pasta `codigo/`** — o CÓDIGO, e só: telas, regras, algoritmos e configuração, em arquivos numerados na ordem das seções de sempre (os assuntos grandes em partes: `03a`…`03d`), mais o visual em `estilo.css`. Mapa no `CLAUDE.md`.
- **pasta `dados/`** — TODO o conteúdo, em doze arquivos (~1,4 MB): taxonomia, calendário, um arquivo por prova, banco didático, flashcards, simulados e os dados de demonstração, mais `imagens/` para as figuras das provas. Ver `dados/LEIA-ME.md`.
- **`sw.js`, `manifest.webmanifest` e `icones/`** — o que faz o site virar aplicativo instalável (seção 4, "Aplicativo instalável").
- **pasta `testes/`** e **`.github/workflows/`** — os testes automáticos e o backup da nuvem. Não fazem falta no ar.

Abrir o `index.html` com dois cliques continua bastando — a única regra é manter as pastas `codigo/` e `dados/` ao lado dele (e publicá-las junto, quando o site está no ar). Se `dados/` faltar, a plataforma abre e avisa numa tarja no alto da tela; se `codigo/` faltar, a página diz qual arquivo não chegou em vez de ficar em branco.

A separação foi feita porque, com as 635 questões e os 501 cartões dentro do HTML, eram 1,8 MB e ~17.400 linhas: qualquer leitura — de uma pessoa ou de uma IA — gastava quase todo o fôlego atravessando conteúdo para chegar ao código. Pelo mesmo motivo, em 24/09 o próprio código (então ~800 KB e 12.400 linhas num arquivo só) foi dividido em `codigo/`.

- **Dados:** por padrão tudo fica no `localStorage` do navegador, sob a chave `medbloco_db_v1` (o nome antigo foi mantido de propósito, para não apagar os dados de quem já usava quando o app foi renomeado). Das questões e dos cartões que vêm da pasta `dados/`, o navegador guarda só o id e o que difere da semente (estatísticas, status, edições da equipe) — `compactarParaArmazenar()` / `expandirDoArmazenamento()`, desde 27/09 —, porque o texto delas sozinho já passava dos ~5 MB que o navegador dá ao `localStorage`. Com a **nuvem ligada** (seção 4-B), o estudo de cada pessoa também sobe para o Supabase e desce em qualquer aparelho.
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

São quatro, uma por papel, e existem só para conferir como cada um enxerga as telas. As contas extras de administrador (coordenação e moderador) e a segunda aluna de exemplo saíram: nível de administrador se testa mudando o nível da conta que existe, em *Turma › Cadastros e usuários*, e não guardando três contas com senha à vista.

Na tela inicial e na de entrada, o **único** acesso rápido sem senha é o de **aluno** — é a visão que interessa a quem chega para conhecer a plataforma. Professor, residente e coordenação entram por e-mail e senha; pedir o acesso rápido de outro papel pelo console é recusado, porque a checagem está na própria `fazerLoginDemo()`. **Com a nuvem ligada, as contas de demonstração de professor, residente e administrador ficam desligadas** (`CONFIG.contasDemoDaEquipeComNuvem: false`): a senha delas está escrita aqui, e num computador compartilhado abririam as telas de administração daquele navegador. Qualquer conta troca a própria senha em *Perfil e configurações > Mudar a senha* — **sempre com a senha atual** (desde 28/09 também na conta da nuvem, conferida no servidor antes da troca); quem não lembra usa "Esqueci a senha".

---

## 2. Estado do banco de questões e de cartões

- **4.775 questões** no total:
  - **600 questões reais do Teste de Progresso do NIEPAEM** (as 360 de 2023/1, 2023/2 e 2024/1 entraram em 08/10: a de 2024/1 chegou antes sem gabarito (resolvida pelas diretrizes: 113 de 120 letras coincidiram) e depois com o comentário oficial; as de 2023/1 com as alternativas embaralhadas, porque a versão enviada traz a certa sempre em A); abaixo, as 240 de 2025/2 e 2026/1 (`real: true`, `tipoProva: "graduacao"`, 07/10), 120 de cada aplicação — **2º semestre de 2025** (23/09/2025) e **1º semestre de 2026** (13/05/2026) —, quatro alternativas (A–D), com 55 figuras recortadas dos cadernos. A instituição leva o semestre no nome ("Teste de Progresso NIEPAEM 2º semestre") para as duas aplicações do mesmo ano não se misturarem em Provas Antigas, que agrupa por instituição, ano e tipo. Aqui a explicação parte do **comentário oficial** que o NIEPAEM divulga junto com a prova (a banca, não um terceiro), reescrito e aprimorado pela equipe: dicas do enunciado, parâmetros em destaque, motivo de cada alternativa errada e um aviso nas questões de gabarito discutível. O 1º semestre de 2025 ainda espera o caderno (`PENDENCIAS.md`).
  - **300 questões reais da FAMEMA** (`real: true`, 03/10), Acesso Direto e Áreas Básicas de **2022** (gabarito da folha oficial), **2023** (edição em texto, gabarito da edição) e **2025** (gabarito divulgado pela banca); a FAMEMA 2021 (Cebraspe, gabarito oficial) e a SES-SP 2022 (Quadrix, gabarito oficial definitivo) entraram em 05/10, quatro alternativas (A–D); cinco figuras. As explicações indicam também as **dicas do enunciado** que levam à resposta. Aberta a banca `FAMEMA` em `CONFIG.instituicoesReferencia` e 20 assuntos novos na taxonomia.
  - **440 questões reais do IAMSPE** (`real: true`, 29/09), cinco alternativas (A–E), transcritas do caderno oficial. **2021, 2022 e 2023** são do Instituto Quadrix (Acesso Direto e Áreas Básicas, 80 cada), com o gabarito definitivo: 5 anuladas em 2021, 4 em 2022 e 6 em 2023. **2025 e 2026** são do Instituto Avança SP (Acesso Direto, 100 cada), com o gabarito definitivo: 1 anulada em cada (2025-28 e 2026-76). 34 figuras recortadas dos cadernos.
  - **100 questões reais da UNESP (FMB)** (`real: true`, 29/09), prova de 2023, quatro alternativas (A–D), transcritas de uma edição em texto com o gabarito ao final (os rótulos e avisos de comentário dessa edição foram descartados); gabarito a conferir com a folha oficial, sem anuladas conhecidas. 17 figuras recortadas.
  - **400 questões reais da AMRIGS** (prova unificada AMB/AMRIGS/ACM/AMMS, executada pela FUNDATEC; `real: true`, 27/09), Acesso Direto de 2022 a 2025, 100 cada, quatro alternativas (A–D), transcritas do caderno oficial com o gabarito definitivo do edital; 10 anuladas pela banca (2022-14, 19 e 92; 2023-98; 2024-5, 66 e 74; 2025-39, 75 e 96). As 23 figuras foram recortadas do caderno. As justificativas da banca que acompanham o gabarito não foram usadas — as 400 explicações são autorais. Em 23 questões o gabarito oficial é discutível diante da literatura, e a explicação diz isso (lista em `PENDENCIAS.md`).
  - **620 questões reais da USP-RP (FMRP)** (`real: true`, 27/09), provas de Acesso Direto de 2021 a 2026 — 100 cada, menos a de 2021, com 118 (a edição de origem pula a questão 7) —, quatro alternativas (A–D); enunciado, alternativas e gabarito transcritos; 2 anuladas pela banca (2023-59 e 2025-85) e 1 guardada como rascunho (2025-99, cujo enunciado chegou incompleto). A de 2026 veio do caderno oficial com a folha de gabarito, e suas 35 figuras foram recortadas do PDF; as de 2021 a 2025 vieram de uma edição comentada só em texto — dela foram aproveitados apenas enunciado, alternativas e gabarito, **nenhum comentário**. As 618 explicações são autorais e cada uma abre dizendo a letra do gabarito (conferido por script). 3 assuntos novos (cardiopatias congênitas, câncer de pâncreas, febre maculosa), com 9 cartões.
  - **580 questões reais da USP-SP (FMUSP)** (`real: true`, 26/09), provas de Acesso Direto de 2022 (100 questões) e de 2023 a 2026 (120 cada), quatro alternativas (A–D); enunciado, alternativas e gabarito transcritos; 8 anuladas pela banca; gabaritos conferidos com a folha de respostas dos cadernos em PDF (2022, 2024, 2025, 2026). O material veio já "corrigido" por outra IA e foi revisado questão a questão: ~258 explicações eram texto-modelo genérico, 56 defendiam uma letra diferente do gabarito e 9 (2023, q102–110) pertenciam a outras questões — todas reescritas. Os campos de área/assunto do material eram inconsistentes e foram reclassificados na taxonomia.
  - **500 questões reais da Santa Casa de São Paulo (FCMSCSP)** (`real: true`, 26/09), 100 de cada prova de R1 Acesso Direto — 2021, 2022, 2023, 2025 e 2026 (a de 2024 não veio) —, cinco alternativas (A–E), mesmo padrão das da UNIFESP: enunciado, alternativas e gabarito oficial transcritos; explicação autoral; 18 anuladas pela banca. Os PDFs de origem eram edições comentadas por cursinhos — só o texto da prova e o gabarito foram aproveitados, nenhum comentário.
  - **500 questões reais da UNIFESP-EPM** (`real: true`), 100 de cada ano de 2022 a 2026 — enunciado, alternativas e gabarito oficial transcritos integralmente (domínio público), com explicação de cada questão **100% autoral**, escrita com base em diretrizes e fontes primárias, nunca copiada de resolução de cursinho (seção 9). Questões anuladas pela banca entram com `status: "anulada"` e `motivoStatus` preenchido, mas mantêm explicação pedagógica.
  - **135 questões didáticas** de demonstração/construção de conhecimento (30 de Técnica Operatória, 30 de Cardiologia, 30 de Infectologia, 15 de Oftalmologia, 30 de demonstração original), com instituição **"Esc — Banco Didático"** e selo **Didática** — dá para isolá-las ou excluí-las por qualquer filtro de instituição. (As 30 de demonstração original diziam "UNIFESP-EPM" até 24/09 e entravam nas provas reais em Provas Antigas — `docs/HISTORICO.md`.)
  - Toda questão real traz **`numeroNaProva`** (o número dela na prova original, que aparece no cartão da questão e ordena a prova em Provas Antigas). **86** (32 da Santa Casa, 26 da USP-SP — 25 de 2023 e uma foto de 2026 — e 28 da USP-RP) dependem de uma figura da prova (ECG, tabela 2×2, radiografia...) que ainda não foi anexada: elas trazem `imagemPendente` (a descrição do que a prova mostrava) e, **desde 27/09, ficam fora de tudo o que o aluno faz** — estudo, revisão, provas antigas (o cartão da prova diz quantas estão de fora) e simulados —, separadas para a equipe em *Banco de Questões › Status › Aguardando imagem*. Voltam quando a figura chega e a linha `imagemPendente` é apagada do arquivo de dados (ou pela tela de edição: enviando a imagem ou marcando que ela já foi salva). Lista em `dados/imagens/LEIA-ME.md`.
- **943 flashcards autorais** de semente (`SEED_FLASHCARDS`), incluindo **57** (`dados/flashcards-assuntos-usp.js`, 26/09) para os 19 assuntos criados na carga da USP-SP e **9** (`dados/flashcards-assuntos-usprp.js`, 27/09) para os 3 da USP-RP: 501 cobrindo os 91 assuntos que existiam antes da carga das provas reais, e **376** (`dados/flashcards-assuntos-novos.js`, 24/09) cobrindo os 125 assuntos que tinham ficado sem nenhum — três por assunto, com `fonte` e `revisao: "pendente"` até um professor conferir. Além deles, a plataforma **gera cartões automaticamente** a partir das questões que cada aluno errou com certeza ou acertou no chute, e **cada aluno escreve os seus** durante a resolução — e pode **sugerir o próprio cartão para o baralho da equipe**, com aprovação de professor/coordenação.
- **Tutorial de uso** (`codigo/13-tutorial.js`, 27/09): um **tutorial rápido** de 5 a 7 passos, diferente para aluno, residente, professor e administrador, abre sozinho quando a pessoa entra e chega ao Início — uma vez por sessão do navegador —, com a opção "não mostrar este tutorial quando eu entrar" (guardada no cadastro, `tutorialOcultoAoEntrar`). Ele e um **guia completo** (todas as funções, tela por tela, em seções que abrem e fecham) ficam **só em Perfil e configurações › Ajuda e tutorial** (o item "Tutorial" saiu do menu lateral em 28/09), onde a escolha também se desfaz.
- Taxonomia atual: **5 grandes áreas, 41 especialidades, 238 assuntos** (Medicina de Emergência, Coloproctologia e 19 assuntos novos entraram com a USP-SP, 26/09; Cardiopatias Congênitas, Câncer de Pâncreas e Febre Maculosa, com a USP-RP, 27/09) — ampliada de 91 para 216 assuntos (e de 24 para 39 especialidades) durante a carga das provas reais, para cobrir temas que a UNIFESP realmente cobra e a taxonomia didática original não previa (por exemplo, Psiquiatria inteira, criada do zero — `docs/HISTORICO.md`). Desde 24/09, todo assunto tem pelo menos três cartões da equipe.
- Nenhuma questão nem cartão da equipe é cópia de prova real ou de material de terceiros; enunciado/gabarito de prova pública são transcritos por serem domínio público, mas toda explicação é autoral (seção 9).

Com provas reais de todas as sete bancas de referência (`CONFIG.instituicoesReferencia`) — cinco delas com quatro ou cinco anos —, a repetição espaçada, a dificuldade progressiva e o percentil de simulado têm massa real para funcionar bem; o próximo salto de volume é completar os anos que faltam (IAMSPE e UNESP, sobretudo), caso o usuário consiga as provas.

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
- **Sessão recomendada**, que mistura bloco atual, revisão e prévia do próximo bloco — e, dentro da matéria nova, a **progressão do ano** (seção 6): 3º ano 70% consolidação de conhecimento e 30% provas reais de residência, 4º ano 60/40, 5º ano 25/75 e 6º ano 0/100. Cada questão da sessão diz de qual tipo é ("· consolidação" / "· prova de residência") e a tela Estudar explica a regra do ano do aluno.
- **Monte sua própria lista**: filtros por grande área (com botão "todas"), especialidade, assunto, instituição, ano (com botão "últimos 5 anos"), e situação (só erros/chutes, só favoritas, não respondidas, incluir questões do meu grupo). Pode gerar como prática ou como simulado.
- Durante a sessão: escolha da alternativa, **eliminar alternativas** (o × ao lado de cada uma risca o que já foi descartado), **declaração de confiança** (certeza / na dúvida / chute), feedback imediato com explicação, **navegação livre por toda a fila — inclusive por cima do que ainda não foi respondido**, favoritar, **anotar uma dúvida sua na questão**, sinalizar desatualizada, gerar prompt de segunda opinião para IA e **virar a questão em flashcard**.
- **Destaque de texto** (seção 11-B do código): selecionar um trecho do enunciado, de uma alternativa, da explicação ou de um flashcard faz aparecer a barrinha "Destacar"; o trecho fica marcado (amarelo) sempre que a questão ou o cartão voltar, e clicar nele oferece "Remover destaque". Vale também no simulado e na questão aberta na íntegra. É da pessoa (ninguém vê o destaque de ninguém), guardado como `{alvo, inicio, fim, trecho}` — o `trecho` faz o site achar o lugar de novo se o texto da questão for corrigido —, e sobe para a nuvem (tabela `destaques`). Selecionar texto não escolhe a alternativa nem vira o cartão.
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
- **Não mostrar mais**: **só depois de errar a mesma questão pela segunda vez** (`CONFIG.errosParaEsconderQuestao`; no primeiro erro a tela diz que ela volta na revisão espaçada e que o botão aparece se errar de novo, e `podeEsconderQuestao()` recusa o pedido pela porta dos fundos). A pessoa esconde uma questão (no feedback, nas ações da questão ou na lista de erradas) e ela sai do estudo **dela** — sessão do dia, revisão espaçada, filas de erro, listas por filtro, práticas por assunto e o "refazer os erros" do conjunto. Continua no banco, nas provas antigas, nos favoritos e nas estatísticas. **Favoritos > Retiradas da revisão** traz de volta uma a uma ou todas (a Revisão só aponta para lá). Sobe para a nuvem (tabela `questoes_ocultas`).

### Revisão Rápida (flashcards)
**Cartões em lote** (para quem gere conteúdo, no fim da tela): "Cobrir os assuntos sem cartão — em lote" lista os assuntos com menos de três cartões da equipe, os que mais caem na prova primeiro; a pessoa marca alguns, copia um prompt pronto (com os cartões que já existem, para não repetir, e as regras de conteúdo), cola a resposta, **confere** (assunto existe? frente e verso? repetido?) e publica. "Exportar para a pasta dados/" baixa um arquivo já no formato de `dados/` — o caminho de volta que faltava. O verso do cartão mostra a `fonte`, e quem gere conteúdo vê o selo "revisão pendente" nos que ainda não foram conferidos.

**Adicionar baralho (01/10/2026).** Um botão só, em "Meus cartões", abre uma janela com duas saídas — escrever um cartão ou **trazer um baralho inteiro de uma IA** (seção 12-D). A plataforma monta o pedido (assunto fixo ou lista de códigos para a IA classificar, quantidade, tema), a pessoa cola a resposta, **confere** e só então adiciona; cartão repetido é pulado. É para todos, aluno inclusive: cartão de aluno é pessoal; quem gere conteúdo pode publicar para a equipe. O pedido fica recolhido na janela, de propósito, para não poluir.

A tela abre com a **meta diária de cartões** — progresso do dia, quantos faltam e sequência de dias seguidos —, a mesma estrutura da meta de questões, em outra unidade. As duas metas convivem e são independentes: quem prefere estudar por cartão, ou quem só tem dez minutos num dia corrido, mantém ritmo por ali.

Cartão com frente (pergunta curta) e verso (resposta direta), **sem alternativa para eliminar**. O aluno tenta lembrar, **clica no próprio cartão para virar** (não há botão de "mostrar resposta": o cartão é o botão) e se autoavalia:

| Resposta | Efeito no intervalo |
|---|---|
| **Não lembrei** | volta em 7 dias (nenhum cartão volta antes de uma semana: `CONFIG.intervaloMinimoRevisao`) |
| **Quase** | intervalo travado no mínimo de 7 dias, sem crescer — lembrar com esforço é o sinal clássico de conceito não consolidado |
| **Sabia** | 7 dias na 1ª vez, 14 na 2ª, depois cresce pelo fator |

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
- **Barra de questões fina** (28/09): na prova e na prática, o mapa de números virou uma **barra de uma linha** — "feitas/total", os números num trilho que rola de lado com a questão atual sempre centralizada, e um botão que **expande** para o conjunto inteiro, com a legenda. Numa prova de 100 questões, o mapa aberto ocupava metade da tela antes do enunciado.
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

### Turma: painel de uso, pedidos de acesso e usuários (professores e coordenação)
**Uma tela só (02/10/2026).** *Painel da Turma*, *Aprovar Cadastros* e *Usuários* eram três itens de menu sobre as mesmas pessoas — aprovar alguém o tirava de uma lista e o punha em outra, e quem olhava o uso da turma tinha de trocar de menu para liberar o aluno que acabou de pedir acesso. Agora há um item, **Turma** (rota `painel-turma`), com duas abas: **Painel de uso** (o que está descrito abaixo; professor e administrador com a permissão `turma`) e **Cadastros e usuários** (os pedidos de acesso no alto, porque são o que espera decisão, e a lista de todas as contas — `cadastros` aprova, só o máster altera papel, nível e exclui). Quem só tem uma das duas vê a tela sem abas. O número de pedidos aguardando aparece no menu, na aba e numa faixa no Painel com o atalho. As rotas `aprovar-cadastros` e `usuarios` continuam respondendo — abrem a aba certa — para link salvo não quebrar.

Como a turma está **usando** a plataforma, **separado por ano da faculdade** (abas "Todos os anos", "3º ano", "4º ano"… e **Equipe**). Mostra: quantos estudaram nos últimos 7 dias; questões por pessoa em 30 dias; a comparação **ano a ano**; o quadro **por turma** (Grupo A, B…, e quem ainda não escolheu); o acerto médio **semana a semana** (12 semanas) com quantos alunos estudaram em cada; as **5 grandes áreas**; e a lista de pessoas com última atividade, dias ativos, questões (30 dias e total), cartões, simulados feitos e a **condição** de cada aluno — *em dia*, *parado há N dias* (7 ou mais sem questão nem cartão) ou *nunca estudou*. A coluna se chama **Condição**, e não "Atenção" (02/10/2026): descreve a situação em vez de apontar quem "precisa de atenção", que é um julgamento. Ordena pelo **último uso** (mais recente ou mais antigo primeiro), busca por nome e baixa planilha (CSV com `;` e acento certo para o Excel).

**A taxa de acerto de cada pessoa não aparece para ninguém** (29/09/2026): nem no painel, nem na planilha, nem em alerta ou ordenação ("acerto caiu", "menor acerto" e a média de simulados de cada aluno saíram). O acerto só existe **somado**, por ano e por turma, e só com **3 alunos com resposta ou mais** (`CONFIG.minAlunosParaMedia`): a média de um ou dois alunos é o acerto deles. A regra vale no banco — `painel_turma()` devolve só uso, `acerto_por_turma()` devolve o acerto agregado com `having` de 3 alunos e `atividade_por_semana()` devolve o acerto da semana vazio quando há menos de 3 ativos —, então o número individual nem chega ao navegador; a tela diz o porquê quando uma média não aparece. Cada um vê o próprio acerto em Meu Desempenho.

**A equipe também tem o uso à vista**: a aba Equipe lista professores, residentes e administradores com o papel e o mesmo uso dos alunos (sem condição, e sem acerto). Com a nuvem, os números vêm de `painel_turma()`, `acerto_por_turma()` e `atividade_por_semana()` — somados lá dentro, e só professor/administrador recebem algo; sem nuvem, das contas daquele navegador, e a tela diz de onde veio. Aluno e residente não têm o item no menu, e a rota responde "acesso restrito".

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
- **Questões para Atualizar** (residente, professor e administrador de conteúdo, 28/09): uma tela só com as questões que precisam de conserto — **figura da prova que falta** (as 86), **texto cortado** no material de origem, **rascunho**, **desatualizada** e **sinalizada por aluno** —, com filtro por tipo e instituição. **Consertar** abre o formulário de sempre (com o envio da figura), e a lista tem o atalho **Enviar a figura**. O conserto de uma questão da pasta `dados/` vira uma **correção**: vale na hora, **sobe para a nuvem** (tabela `correcoes_questoes`, a figura no Storage) e **desce para toda a turma** — a questão volta ao estudo dos alunos sem ninguém mexer em arquivo. **Baixar as atualizações** entrega um arquivo com **só** as questões consertadas (a figura embutida) e `npm run atualizar-dados -- arquivo.json` (`ferramentas/aplicar-atualizacoes.mjs`) grava cada uma **no lugar**, no arquivo da prova, mexendo só nos campos que mudaram (o diff do git mostra exatamente o conserto), salva a figura em `dados/imagens/` e confere o arquivo lido de volta antes de gravar. Depois de publicada a pasta, a correção fica igual à semente e sai da lista; **Encerrar na nuvem** limpa a linha. **Desfazer** devolve a questão ao que a pasta diz, em todos os aparelhos.
- **Feedback dos Usuários** (administradores): o "Enviar feedback" do Início e o "Quero contribuir" do Livro de Ouro **sobem para a nuvem** (tabela `feedbacks`, 28/09) e chegam aos administradores de qualquer aparelho, com o número de não lidos no menu; "marcar como lido" também viaja. Antes a mensagem ficava no navegador de quem escreveu, e a coordenação nunca a recebia. Sem conta na nuvem, a tela diz que a lista é só a daquele navegador.

### Padrão de justificativa
Quando um número decide o diagnóstico ou a conduta (sinal vital, exame, medida de imagem, tempo, dose, escore), a explicação **destaca o parâmetro entre `**`, diz o valor normal ou esperado e o ponto de corte que muda a conduta**, e nos escores mostra a soma item a item e a faixa de risco (texto completo em `dados/LEIA-ME.md`, "Como escrever a explicação"). Na tela os `**` viram um realce próprio (`strong.parametro`), diferente do destaque amarelo do aluno; no PDF também; em cartão gerado da questão e nos prompts os asteriscos saem/entram conforme o caso (`textoSemEnfase`). A regra mora em **um** texto, `regraDeParametrosObjetivos()`, que os prompts de transcrição (Importar, Enviar Questões, Central de Provas) e o de *Tirar dúvida com IA* incluem — a IA responde do mesmo jeito em qualquer caminho. As explicações já publicadas não foram reescritas: melhorá-las é trabalho de conteúdo, pela fila de *Questões para Atualizar*.

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

**Três tipos de grupo (29/09).** (1) *Rodízio do ano* (`anoFaculdade` + `deslocamento`), como sempre. Onde o calendário não traz as letras da faculdade (`grupoRodizio` ou o quadro `turmasPorJanela`), a plataforma **não inventa "Grupo C"**: o grupo é identificado pelo **bloco em que começa** (`tituloOpcaoRodizio`, `nomeRodizio`), e o nome do grupo é opcional — em branco vira "4º ano — Começa em …". (2) *Calendário próprio* (`blocosProprios`: nome, datas e especialidades dos blocos, montados pelo dono ou pela coordenação; `blocosDoGrupo()` devolve esses blocos em vez da sequência do ano). (3) *Só para dividir questões*: calendário próprio com lista vazia. O dono (ou, na turma do rodízio, qualquer membro) **divide as questões do grupo** igualmente entre os membros, misturando assuntos (`grupo.divisao`), e cada um pratica a sua parte. O dono ou a coordenação **muda o nome** do grupo (a turma do rodízio não: o id a recria com o nome de sempre em outro aparelho). Grupos continuam só neste navegador (ver `nuvem/LEIA-ME.md`).

**Cada pessoa fica em uma turma só.** Entrar numa turma é sair da anterior (`entrarNoGrupo()`), inclusive na lista de membros: antes dava para aparecer como membro de três ao mesmo tempo e ninguém sabia mais quem estava em qual. Sair de todas devolve o calendário oficial, nunca "nenhum calendário". Enquanto o aluno não escolheu, o painel inicial o lembra disso — no calendário oficial ele vê o bloco do Grupo A, que pode não ser o dele.

**Integrantes e grupos de estudo (01/10/2026).** Meu Grupo mostra quem são os integrantes e deixa qualquer um criar **grupos de estudo** dentro da turma (`db.subgrupos`, seção 18-C): escolhe quem participa (só quem é da turma) e quais provas do grupo entram, e a plataforma divide as questões entre eles — a mesma divisão da turma inteira, só que para um conjunto menor (uma lista enviada, uma prova). Não muda calendário nem a turma de ninguém. Como os grupos, é local do navegador: a nuvem ainda não sincroniza grupos.

**Grupos na nuvem (01/10/2026, seção 2-C parte 5, `03e-nuvem-grupos.js`).** Grupo, pedidos de entrada, integrantes, grupos de estudo, questões enviadas para o grupo e cartões compartilhados sobem como as questões enviadas: são de todos, mas o RLS diz quem lê (os membros do grupo) e quem mexe (o dono aprova pedidos; cada pessoa pede e sai por conta própria; a turma do rodízio é aberta). O que sobe sai da **comparação** com o último envio (`db.nuvem.gruposSig`, `c.nuvemSig`), sem gancho em cada tela — então quem já tinha grupo antes da nuvem sobe tudo na primeira sincronização. As linhas de grupo vão à frente da fila, porque as questões e os cartões dependem de a pessoa já ser membro no banco. **Cartões:** o do aluno continua no caderno dele (`flashcards_pessoais`); sugerido à equipe sobe como pendente e o professor aprova ou recusa (com motivo); compartilhado com o grupo (`c.grupoId`) entra no baralho dos colegas; o cartão da equipe publicado pela plataforma sobe aprovado. Sugerir e compartilhar são caminhos separados: o cartão segue um por vez.

**A sequência de blocos pertence ao ano da faculdade, não ao grupo.** Todas as turmas do mesmo ano passam pelos mesmos blocos, na mesma ordem e nas mesmas janelas de data; o que muda de uma para outra é **por qual bloco ela começa** (`grupo.deslocamento`). É o rodízio real: enquanto uma turma está em Pediatria, a outra está em Clínica Médica, e no bloco seguinte elas trocam. Anos diferentes têm sequências diferentes, porque a matéria é outra.

**O rodízio tem nome: Grupo A, B, C, D… até L, no 5º ano.** Ninguém sabe o próprio "deslocamento"; todo mundo sabe que está no grupo B. A ponte entre as duas coisas é o campo `grupoRodizio` do bloco: a letra escrita no bloco de índice *i* da sequência é a da turma que **começa** ali, ou seja, a de deslocamento *i*. É um dado editável, e não uma conta a partir do índice, porque no calendário real do 3º ano as letras não seguem a ordem alfabética (A, D, C, B). Onde a coordenação não preencher nada, vale a ordem alfabética. Toda tela que pede a turma — criar grupo, editar grupo, a tabela de turmas do admin — oferece "Grupo A — começa em TOCE…", em ordem de letra.

**O 3º ano é o calendário real da faculdade**, transcrito do quadro que a coordenação distribui: quatro janelas de data (20/07–21/08, 24/08–02/10, 05/10–06/11, 09/11–04/12 em 2026) e quatro blocos — TOCE & Semiologia da Mulher, Cardiocirculatório, Oftalmo/Infecto/Medicina Baseada em Evidências e Psiquiatria & Vigilância em Saúde — girando entre os grupos A, B, C e D. A tela de Blocos de Estudo reproduz esse quadro linha a linha, para conferir contra o papel.

**O 4º ano também, e ele gira em ciclo.** Transcrito do quadro "BLOCO / PERÍODO": **dez blocos, dez janelas e dez turmas (A a J)** — URI/ANEST (Nefro, Uro e Anestesio), TEG (Dermato e Cirurgia Plástica), RESP (Pneumo e Cirurgia Torácica), NERV (Neuro e Neurocirurgia), LOCOM (Reumato e Ortopedia), DIGEST (Gastroclínica e Gastrocirurgia), ORL CP (Otorrino e Cabeça e Pescoço), ENDOC/MU (Endócrino, Medicina Baseada em Evidências e Medicina de Urgência), CM HEMATO (Clínica Médica e Hematologia) e MULHER CCA (Saúde da Mulher, da Criança e Preventiva). Cada turma desce o quadro um bloco por janela, então basta `grupoRodizio` (A, J, I, H… de cima para baixo), sem `turmasPorJanela`. As datas do quadro (26/01 … 04/12) são o **fim** de cada janela; o início é o dia útil seguinte ao fim da anterior. O quadro não diz duas pontas, que ficaram **a confirmar**: a primeira janela começa em 05/01 e, depois de julho, a sétima em 20/07. Plástica, Cabeça e Pescoço, Medicina de Urgência e Clínica Médica geral não existem como especialidade na taxonomia; entrou a mais próxima (comentado bloco a bloco em `dados/calendario.js`).

**O 5º ano também — e ele não gira em ciclo.** Transcrito do quadro "CURSO MÉDICO – 5ª SÉRIE – 2026": **doze janelas de data, doze estágios e doze turmas (A a L)**. No primeiro semestre as turmas A–F estão nos seis primeiros estágios (Atenção Básica, Medicina de Família, Clínica Cirúrgica 1 e 2, Saúde da Criança e do Adolescente, Livre Escolha) e as G–L nos seis últimos (Ginecologia Enfermaria, Gineco/Obstetrícia, Psiquiatria/Oftalmo, Ambulatório Interdisciplinar, Clínica Médica & Medicina Laboratorial, DIPA); no segundo semestre elas trocam de metade.

O rodízio do 5º ano **não é um ciclo**: o quadro emparelha os estágios dois a dois (quem faz Clínica Cirúrgica 1 na primeira janela faz a 2 na segunda, e vice-versa), e nenhuma conta a partir do índice reproduz isso. Por isso cada estágio carrega a **linha do quadro impresso** no campo `turmasPorJanela`: a turma que está nele em cada janela, na ordem das janelas — é literalmente a linha do papel, para conferir célula a célula. Onde esse campo existe, ele manda; onde não existe (3º ano, 4º, 6º), vale o ciclo de sempre. Nenhuma tela precisa saber qual das duas formas o ano usa: todas passam por `conteudoDaJanela()`.

**Os estágios do 6º ano são de cada aluno.** Cada período do 6º ano tem estágios (`subdivisoes`: Emergências Pediátricas, Enfermaria de Pediatria, Pediatria Neonatal…) e a ordem em que cada pessoa os cumpre varia dentro da turma. Em *Meu Grupo > Meus estágios*, o aluno reordena os seus com as setas — **sem sair do grupo do rodízio** e sem mexer com os colegas: fica em `usuario.ordemEstagios[idDoBloco]`, e `blocosDoGrupo()` entrega o bloco com os estágios já na ordem dele (`ordemDosEstagios()`), então "Agora: …" no Início e as datas de cada estágio acompanham. "Voltar à ordem da turma" apaga a escolha; estágio que a coordenação renomear some da lista dele e o novo entra no fim. Sobe pelo perfil (`perfis.ordem_estagios`, jsonb).

**O calendário oficial** não tem ano fixo: serve a todos, e cada aluno enxerga a sequência do **seu** ano, começando pelo primeiro bloco (o Grupo A).

**"Formado(a)" não tem calendário.** Quem já se formou não cursa calendário de faculdade nenhum, então esse ano saiu da tela de Blocos de Estudo e não tem sequência própria (`CONFIG.anosSemCalendario`). O que ele **não** perdeu foi o grupo: continua entrando em turmas do rodízio (e, dentro de uma, acompanha o calendário do ano dela) e agora **cria grupo com calendário próprio ou só para dividir questões**. Fora de qualquer grupo com calendário, o formado **não tem bloco atual** (29/09; antes a plataforma emprestava a sequência do 6º ano): a sessão recomendada vira `montarSessaoSemCalendario` — 40% revisão espaçada (`CONFIG.revisaoSemCalendario`) e o resto questões ainda não vistas, com os assuntos que mais caem primeiro — e Início, Estudar e Provas dizem isso em vez de mostrar um bloco que não é dele.

---

## 4-B. Conta e nuvem (estudo em vários aparelhos)

Até esta versão, tudo vivia no `localStorage` de um navegador só: quem estudava no notebook não continuava de onde parou no celular. A nuvem resolve isso **sem tirar nada de lugar** — o `localStorage` continua sendo a fonte de verdade da tela; a nuvem é uma cópia que sobe e desce por trás.

**Como liga.** Dois valores em `CONFIG.nuvem` (`url` e `chaveAnon`), no `index.html`. Vazios, a plataforma se comporta exatamente como sempre se comportou, só com aquele navegador — nenhum código de nuvem roda. O passo a passo completo está em `nuvem/LEIA-ME.md`, e o banco inteiro (tabelas, índices, RLS, gatilhos) em `nuvem/esquema.sql`.

**Onde mora.** Supabase (PostgreSQL + autenticação + PostgREST). Escolhido por ser o backend que mapeia quase direto para o objeto `db` e por não exigir escrever servidor nenhum: o app conversa por `fetch` com a API REST, sem SDK, sem dependência nova.

**O que é de todo mundo** (ver `NUVEM_GLOBAIS` e o calendário): o calendário de blocos, o **Livro de Ouro**, as questões com **formatação aprovada**, os **comentários e dúvidas** nas questões (desde 24/09), as **questões enviadas** e as **correções das questões da pasta `dados/`** (28/09). O **feedback da plataforma** (28/09) é de quem escreveu e dos administradores. Quando a linha é de **outra pessoa** — o professor moderando um comentário, o administrador marcando um feedback como lido —, o envio é um `PATCH` na linha existente (`alheia` no descritor): o upsert passaria pela regra de *inserção* do banco, que só aceita linha em nome próprio, e a moderação era recusada. Todos leem; grava quem tem o papel (equipe; na formatação, também residentes). A fila dessas tabelas é de chaves, e a linha é montada na hora de subir — duas edições seguidas sobem uma vez, e remover sobe como `removido`.

**O que sobe** (treze tabelas, ver `NUVEM_TABELAS` no código): perfil, respostas, repetição espaçada de questões e de cartões, dias com cartão revisado (**e quantos cartões em cada dia**), favoritos de questão (**com a anotação pessoal de cada uma**), **favoritos de flashcard**, **questões escondidas**, **destaques de texto**, cartões pessoais, sessões concluídas, notas de simulado e a fila em andamento — esta última com as alternativas marcadas e riscadas de cada questão.

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

**Quem entra.** Todo cadastro novo nasce `pendente`, e a coordenação libera em **Turma › Cadastros e usuários** (antes, a tela Aprovar Cadastros), que mostra os pendentes da nuvem no alto — ninguém precisa abrir o painel do Supabase. A senha vive no servidor, com hash, e **nunca** é copiada para o `db` local.

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
Questão salva é "quero rever esta questão"; cartão salvo é "quero rever este conceito". Quem vem procurar aquela questão de choque séptico não quer tropeçar em cartão no meio do caminho, e vice-versa — então são duas listas, duas abas e duas tabelas na nuvem, com a contagem de cada uma na própria aba. Salvar um cartão não mexe na repetição espaçada dele: a pilha de favoritos é para quando a pessoa quer escolher o que revisar, e não para quando o algoritmo escolhe. Uma **terceira aba, Retiradas da revisão**, guarda o contrário do favorito — as questões que a pessoa pediu para nunca mais ver ("não mostrar mais") — porque são as duas listas manuais dela e é onde se procura para desfazer.

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
Por isso ele ordena pelo último uso (e mostra "parado" e "nunca começou" como alerta) e não por ranking de acerto, e por isso os números saem somados do banco, sem nenhuma resposta individual. Desde 29/09/2026 ele também **não mostra a taxa de acerto de ninguém**: o acerto de uma pessoa é dela, e o que a turma precisa saber é se está usando (uso, por pessoa e — na aba Equipe — até o de professores e administradores) e como o ano e a turma estão indo em média, com o mínimo de 3 alunos para a média não denunciar um só.

---

## 6. Algoritmos e parâmetros (bloco `CONFIG`)

- **Mistura da sessão recomendada:** 60% bloco atual, 25% revisão, 15% prévia do próximo bloco.
- **Progressão consolidação → residência** (`CONFIG.progressaoConsolidacao`): fração da matéria nova da sessão que é *consolidação de conhecimento* — as questões didáticas do Esc e as provas da graduação (`ehConsolidacao`) —, sendo o resto prova real de residência: **3º ano 0,70, 4º ano 0,60, 5º ano 0,25, 6º ano 0** (Formado(a): 0). Quanto mais longe da prova, mais se firma a base; quanto mais perto, mais se treina a prova de verdade. `selecionarComProgressao()` aplica a proporção ao bloco atual, ao assunto de bloco anterior ainda não visto, à prévia e ao complemento; a **revisão espaçada vencida fica de fora** (é questão que a pessoa já fez e o prazo dela não muda com o ano). Se faltar questão de um lado naquele trecho, o outro cobre — a sessão não fica curta — e o motivo de cada questão diz o tipo. Filtros de Estudar e Provas Antigas seguem mostrando tudo; em Provas Antigas a graduação vem primeiro onde a consolidação é maioria (3º e 4º ano).
- **"Não mostrar mais"** só depois do 2º erro na mesma questão (`CONFIG.errosParaEsconderQuestao`).
- **Acerto médio no Painel da Turma** só com 3 alunos ou mais (`CONFIG.minAlunosParaMedia`, e o mesmo 3 no banco).
- **Rampa de revisão no começo do ano** (`rampaRevisaoInicio: [0, 0.10, 0.20]`): com matéria de anos anteriores, a revisão roda cheia desde o primeiro bloco; sem ela, entra devagar nos três primeiros blocos. A tela Estudar explica o ajuste em vez de mudá-lo em silêncio.
- **Dificuldade progressiva:** taxa de acerto real (50%), especificidade (25%), prevalência (25%).
- **Repetição espaçada de questões (regras de 29/09):** a fila da Revisão vem em três partes, nesta ordem — **1) questões ainda não vistas** dos assuntos já estudados, **2) as que a pessoa errou** (ou acertou no chute) e **3) as que acertou e já passou o prazo** (`partesDaRevisaoEspacada`, `itensDaRevisaoEspacada`). Depois de um **acerto seguro** (certeza ou dúvida; chute não conta) a questão só volta em **1 mês**, no segundo acerto seguido em 2 meses (`CONFIG.intervalosAposAcerto` = 30, 60), e **mais ainda em assunto em que a pessoa vai bem** (taxa das últimas 10 respostas ≥ 85% dobra, ≥ 70% × 1,5; `CONFIG.bonusAssuntoForte`, mínimo de 8 respostas). Com **3 acertos seguros seguidos** a questão está **dominada** e sai da revisão espaçada (`questaoDominada`, calculada do histórico de respostas — vale igual em todos os aparelhos e para o histórico antigo); um erro zera a conta e a questão volta em **1 semana** (`CONFIG.intervalosBase[0]`). **Nenhuma questão reaparece antes de 7 dias** (`CONFIG.intervaloMinimoRevisao`): vale para erro, para acerto no chute (volta em 7), para a escada configurável, para o prazo por assunto (o degrau de 3 dias virou 7) e para a lista "Revisar erros" (só entram erros com 7 dias ou mais). Revisões guardadas antes desta regra ganham o piso de um mês (acerto firme) ou de uma semana (demais) por `proximaRevisaoEfetiva`. A tela da Revisão explica tudo isso. O mesmo piso vale para os flashcards (`proximaRevisaoCartao`).
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

**A pasta `codigo/`** segue as seções numeradas de sempre ("a seção 17" é Meu Desempenho); assunto grande se divide em partes com letra (`03a`…`03d` é a nuvem). **O mapa dos arquivos — arquivo, seções, o que tem — está no `CLAUDE.md`**, com as convenções e as armadilhas; `npm run mapa` mostra seções e funções com a linha de cada uma, e `npm run mapa -- palavra` acha qualquer função ou seção.

Os arquivos dividem o mesmo espaço (são scripts comuns, sem `import`): uma função escrita num é usada nos outros. A única regra é que código que **roda na hora da carga** só pode usar o que veio antes — e a divisão foi conferida com um analisador (nenhum trecho de carga usa algo de um arquivo posterior) e com o teste de fumaça.

**Os testes** (`testes/`, `npm test`; rodam no GitHub a cada envio, `.github/workflows/testes.yml`): o **conferidor da pasta `dados/`** (ids, gabaritos, taxonomia, provas completas de 1 à última, figuras que faltam — `npm run conferir` imprime o relatório); o **teste de fumaça** (Chromium de verdade, cada papel passando por todas as telas do menu, responder uma questão, celular sem rolagem lateral, arquivo aberto com dois cliques, falhando em qualquer erro de JavaScript); **regras** que já quebraram uma vez (o dia vira à meia-noite de Brasília, conta de demonstração com nuvem, prova antiga só com questão real, cartões em lote); a **nuvem simulada** (as chamadas ao Supabase respondidas por um servidor de mentira: e-mail de volta, esqueci a senha, comentário subindo, percentil, Painel da Turma); o **aplicativo** (manifesto e abrir sem internet); e o **`esquema.sql` num PostgreSQL de verdade** (banco novo, rodar duas vezes, e as regras de segurança com contas de mentira — `testes/sql/`). E ainda: a **higiene do código** (`testes/higiene.test.mjs` — nome declarado duas vezes, função sem uso, arquivo grande demais, lista de arquivos e mapa do `CLAUDE.md` em dia) e a ferramenta que leva as correções para `dados/` (`testes/ferramentas.test.mjs`). O `esquema.sql` também roda fora do GitHub: `npm run testar-sql`.

Cada arquivo de `dados/` chama uma função da ponte `window.EscDados` — `registrarTaxonomia`, `registrarCalendario`, `registrarQuestoes`, `registrarFlashcards`, `registrarSimulados` ou `registrarDemonstracao` — **antes** do código. Por isso **todos os `SEED_*` viraram apelidos**: `const SEED_QUESTOES = window.EscDados.questoes`, e assim por diante para taxonomia, blocos, sequências do ano, usuários, livro de ouro, comentários e simulados. Mexer num `SEED_*` no `index.html` não muda conteúdo nenhum.

As listas **se somam** entre arquivos: dois arquivos chamando `registrarQuestoes` resultam nas questões dos dois. É o que permite acrescentar uma prova (ou mais assuntos na taxonomia) criando um arquivo novo e uma linha `<script>`, sem tocar no que já existe. A ordem das linhas é a ordem em que o conteúdo entra no banco, e a taxonomia vem primeiro porque todo o resto aponta para ela.

`demonstracao.js` é o arquivo a **esvaziar** quando a turma real entrar: contas de teste, comentários de exemplo e o livro de ouro fictício saem de uma vez, sem perder questão, cartão nem calendário.

**Manutenção:** `sincronizarConteudoNovo()` acrescenta ao banco salvo qualquer área, especialidade, assunto, questão, flashcard, usuário-semente ou livro de ouro que exista no código e ainda não exista nos dados, comparando por `id`. Nada é sobrescrito nem apagado — com duas exceções estreitas, de 24/09: campos que o conteúdo ganhou depois (`numeroNaProva`, `imagemUrl`, `imagemLegenda`, `imagemPendente`, `referencias`) são **preenchidos só onde estão vazios** (`CAMPOS_QUE_O_CONTEUDO_COMPLETA`), e a instituição das questões-semente **autorais** segue o arquivo (foi o que tirou as 30 "UNIFESP-EPM" das provas reais).

**Migrações em `loadState`:** criação de `db.filaNuvem` e `db.nuvem` (fila de envio e marcas d'água da nuvem); criação de `db.cargasProvas` (Central de Provas); criação de `db.flashcards` e `db.revisoesFlashcards`; normalização de `usuarioId` nos cartões antigos (todos viram "da equipe", que é o correto — foram escritos por professores); conversão de `anoFaculdade: "Internato"` para `"6º ano"`; criação de `db.sessoesEmAndamento`, `db.diasCartoes` e `db.configGeral.metaCartoesDia`; e a migração dos blocos (abaixo).

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
2. **IAMSPE e UNESP ainda com poucas provas.** O banco tem 4.640 questões reais (4.040 de residência, das sete bancas e da FAMEMA de referência de `CONFIG.instituicoesReferencia`, e 600 do Teste de Progresso); o IAMSPE já tem cinco anos (2021 a 2026, sem 2024), mas a UNESP tem só 2023, e o gabarito da UNESP 2023 ainda precisa ser conferido com a folha oficial (`PENDENCIAS.md`). Novos anos entram pelo mesmo processo (hoje pela Central de Provas). *(Em volume puro o banco já foi testado sintético em mais de 6.000 questões e 8.000 respostas, sem travamento perceptível em nenhuma tela — não é mais o gargalo.)*
3. **Os 376 cartões dos assuntos novos ainda não foram lidos por um professor.** Cobrem os 125 assuntos que não tinham nenhum, com a fonte de cada um, mas estão marcados `revisao: "pendente"` — o mesmo cuidado pedido para as explicações (seção 10).
4. **As contas de demonstração continuam sendo de demonstração**: com a nuvem desligada, a senha fica em texto claro no `SEED_USUARIOS` e não serve para uso público real. Com a nuvem ligada, a conta de verdade é a do Supabase — senha com hash no servidor, nunca copiada para o `db` local —, mas as quatro contas `@esc.demo` continuam existindo ao lado, para testar sem criar conta. Elas já são o mínimo (uma por papel, uma só de administrador) e só a de aluno tem botão de acesso rápido, mas trocar a senha da conta de administrador antes de publicar continua sendo trabalho de quem publica.
5. **O backup automático da nuvem depende de dois segredos no GitHub** (pendência 3, no topo). Até lá, o único backup é o manual do administrador máster, que copia só aquele navegador. Cada pessoa já pode baixar o próprio estudo em *Perfil*.
6. **Cartão pessoal é privado, não é segredo.** O isolamento é por papel na interface e nas funções; qualquer pessoa com acesso ao mesmo navegador e ao console enxerga tudo, como em qualquer dado do `localStorage`.
7. **Uma sequência de blocos por ano, e só uma.** Duas turmas do mesmo ano não podem ter ordens diferentes de matéria — por decisão de projeto, elas diferem só pelo ponto de entrada. Se um dia for preciso que uma turma tenha uma sequência realmente distinta, será um campo novo (`grupo.sequenciaPropria`) e mais uma migração.
8. ~~`somarDias()` usava `toISOString()`~~ — **corrigido em 24/09**, junto com um defeito maior que ele escondia: `hojeISO()` também usava UTC, então **no Brasil o "hoje" da plataforma virava às 21h** (a meta do dia zerava, a sequência de dias pulava, a sessão do dia se renovava antes da meia-noite). As duas passaram a usar a data local (`dataLocalISO`), e um teste com o relógio em Brasília às 22h30 garante que não volta.
9. ~~Conteúdo criado pela plataforma não sobe para a nuvem~~ — **as questões sobem desde 28/09** (tabela `questoes_enviadas`, com as imagens no Storage; `docs/HISTORICO.md`). Continuam locais as cargas em andamento da Central de Provas, os cartões da equipe criados pela plataforma e as questões restritas a um grupo. As imagens enviadas ficam no Storage do Supabase e **não entram no backup automático diário**, que copia as tabelas; o arquivo exportado para `dados/` guarda o endereço delas.
10. **A pasta `dados/` precisa ser publicada junto.** Publicar só o `index.html` faz o site abrir com a tarja de aviso e sem conteúdo nenhum — nem questões, nem taxonomia, nem calendário. Quem já usava não perde nada (o banco salvo no navegador continua lá), mas conteúdo novo não entra. A tarja diz qual arquivo faltou.
11. **Lembrete de meta com o app fechado só no Chrome/Edge com o app instalado**, e em horário aproximado (o navegador decide quando acordar o service worker). Nos outros navegadores (inclusive Safari/iPhone), só com o Esc aberto em alguma aba. Aviso exato com tudo fechado exigiria push de servidor.
12. **Figuras das provas.** 86 questões reais (32 da Santa Casa, 26 da USP-SP, 28 da USP-RP) dependem de uma figura que ainda não foi anexada (lista em `dados/imagens/LEIA-ME.md`). Elas avisam na tela, mas só ficam completas com o recorte do PDF oficial.
13. **Rotas de equipe abertas pela URL.** Um aluno que digite `#/usuarios` no endereço ainda vê telas de equipe com os dados **daquele navegador** (a nuvem é protegida pelo banco). O Painel da Turma já confere o papel; as outras telas antigas não.

---

## 9. Política de conteúdo adotada

- **Enunciado, alternativas e gabarito oficial de prova pública são domínio público.** Prova de residência de instituição pública (USP-SP/FMUSP, USP-RP/FMRP, UNIFESP-EPM, Santa Casa de São Paulo, IAMSPE, UNESP, AMRIGS etc.) é ato público: pode-se transcrever o texto oficial da questão e o gabarito oficial **integralmente**, sem parafrasear. Questão assim entra com `real: true`, banca e ano corretos.
- **O que nunca pode ser copiado é a explicação/resolução de terceiros** — cursinhos (Medway, Estratégia MED etc.), sites de questões comerciais, apostilas. Esse texto é propriedade intelectual de quem o escreveu, e é também a parte mais sujeita a erro/desatualização quando copiada sem checar. A explicação de **toda** questão — real ou autoral — é escrita pela equipe, com base em fontes primárias e oficiais (diretrizes e consensos de sociedades, protocolos e PCDT do Ministério da Saúde, revisões sistemáticas e artigos originais), citadas em `REFERENCIAS`.
- O prompt de importação (tela Importar Questões) já traz as duas regras separadas: uma seção dizendo que o enunciado pode ser copiado (é domínio público) e outra dizendo que a explicação não pode (isto é autoral). O prompt de segunda opinião segue a mesma regra.
- O formulário de flashcard repete a regra: material da equipe pede fonte oficial; cartão pessoal pede que o aluno escreva **com as próprias palavras** ("cartão copiado do enunciado inteiro não ensina nada").
- `CONFIG.instituicoesReferencia` lista as 7 bancas de referência do curso (USP-SP, USP-RP, UNIFESP-EPM, Santa Casa de São Paulo, IAMSPE, UNESP, AMRIGS) como sugestão nos campos de instituição — não restringe, só agiliza o preenchimento.

---

## 10. Próximos passos sugeridos

Em ordem de prioridade sugerida:

1. **As três pendências do topo** (rodar o `esquema.sql`, URL Configuration, segredos do backup). Sem a primeira, comentários, percentil da turma e Painel da Turma não funcionam na nuvem.
2. **Resolver o que está em `PENDENCIAS.md`** — provas e questões que faltam (a AMRIGS 2021 veio só com o gabarito; a USP-RP 2021 sem a questão 7), textos incompletos, gabaritos a conferir e figuras. **Anexar as 229 figuras das provas** (`dados/imagens/LEIA-ME.md`): recortar do PDF oficial, salvar com o nome indicado e apagar a linha `imagemPendente` da questão (enquanto ela existir, a questão fica fora do estudo dos alunos; `npm run conferir` avisa quando a figura chegou e a linha ficou). As 158 da USP-RP (2021 a 2025) saem todas dos cinco cadernos oficiais, que também servem para conferir os gabaritos dessas provas (vieram da edição comentada, não da folha oficial) e para transcrever o enunciado da 2025-99 (hoje em rascunho); o caderno de 2021 traz ainda a questão 7, que falta na edição usada. Sete gabaritos dessas provas são discutíveis e dizem isso na explicação: 2021-87, 2022-14, 2022-15, 2024-45, 2024-60, 2025-40 e 2025-50.
3. **Revisão humana dos 376 cartões novos** (`revisao: "pendente"`) e, com a ferramenta de lotes, levar os assuntos que mais caem a 5 ou mais cartões.
4. **Repetir a carga de provas reais para as outras 2 bancas de referência** (IAMSPE, UNESP), se o usuário conseguir os PDFs oficiais. Agora isso é feito **pela própria plataforma**, sem script nem edição do arquivo: a **Central de Provas** (seção 4) cadastra a prova, corta em lotes, dá o modelo pronto de cada faixa e confere o que chegou — e vários lotes podem andar em paralelo.
5. **Checagem humana amostral das 500 explicações autorais.** Foram escritas em lote, com boa fundamentação e revisão de consistência automatizada, mas nunca foram lidas por um segundo médico/residente. Vale um professor ou residente revisar uma amostra (por exemplo, as questões mais avançadas ou as anuladas, onde a explicação é mais interpretativa) antes de tratar o conjunto como validado clinicamente.
6. **Relatório individual do aluno em PDF**, para devolutiva um a um — agora com os números do Painel da Turma à mão.
7. **Levar as turmas para a nuvem** (quem está em qual grupo), o que ainda falta da colaboração.
8. **Fechar as rotas de equipe para quem não é da equipe** (seção 8, item 13), com uma checagem de papel no roteador.

---

## 11. Como pedir alterações numa nova conversa

Anexe este resumo, o `CLAUDE.md` e o arquivo de `codigo/` da tela ou regra em questão (o mapa está no `CLAUDE.md`), e descreva o que quer em português corrente. No Claude Code nada disso precisa ser anexado: ele lê o `CLAUDE.md` sozinho e acha o resto com `npm run mapa`. Se o pedido for sobre conteúdo (uma prova, os flashcards), anexe também o arquivo da pasta `dados/` que interessa — não o resto. Numa conversa com acesso ao repositório inteiro, peça para rodar `npm test` antes de enviar. Convenções que o projeto segue e vale manter:

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

Saiu daqui em 28/09/2026: está em `docs/HISTORICO.md` (as rodadas, as listas de funções por data e o guia antigo do `01-config.js`). O estado atual está neste resumo e no `CLAUDE.md`.
