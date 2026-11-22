# Pendências do banco de questões

<!-- numeros:inicio -->
> **Números do banco (gerados por `npm run publicar`):** 12.238 questões (9.405 reais, em 95 provas), 943 cartões da equipe e 237 assuntos (20 ainda sem cartão). Detalhe: `npm run dados` e `dados/CATALOGO.md`.
<!-- numeros:fim -->
O painel da seção 0 resume tudo; as seções 1 a 5 trazem o detalhe, do mais urgente ao que só completa o que já funciona.

A lista de figuras se atualiza sozinha com `npm run conferir`.
Este arquivo é a foto do dia; ao resolver um item, apague-o daqui.

---

## 0. Painel geral (12/11/2026) — tudo o que está aberto, numa página

Foto consolidada de **todas** as frentes. O detalhe de cada uma está nas seções abaixo e nos documentos citados; ao resolver um item, apague-o daqui e do detalhe.

| # | Frente | Tamanho hoje | Quem resolve | Onde está o detalhe |
|---|---|---|---|---|
| 1 | **Figuras e tabelas de questões** (`imagemPendente`, fora do estudo dos alunos) | **139 questões**: 86 de provas reais com nome de arquivo definido (USP-SP 2023: 25 · USP-RP 2024: 25 · Santa Casa 2026: 12, 2023: 9, 2022: 6, 2025: 5 · USP-RP 2022: 3 · USP-SP 2026: 1); **51 do banco autoral de grupos** (`q-gd*`: meningites 6, micoses 8, piodermites 8, parasitoses 7, pneumonias 7, tuberculose 6, HIV 5, e 4 avulsas); **2 da FAMEMA 2025** (q. 49 e 50: falta o caso clínico comum, texto do caderno FMMA2403) | Quem tem os cadernos oficiais (recortar a figura) | seção 4; `npm run conferir`; `dados/imagens/LEIA-ME.md` |
| 2 | **Reposição de questões anuladas/desatualizadas** | **124 sem reposição** (115 anuladas, 9 desatualizadas) de 192; **17 dependem de imagem**. Mais numerosas: AMRIGS 2020 (9), SES-SP 2023 (7), UNIFESP 2025 (6), Sírio 2025 (6), SES-SP 2024 / Santa Casa 2022 / IAMSPE 2023 / FMABC 2026 / AMRIGS 2021 (5 cada) | Equipe de conteúdo (método em `docs/REPOSICOES-DE-QUESTOES.md`, seção 0) | `npm run reposicoes -- pendentes` |
| 3 | **Diretrizes: texto oficial não lido / edição superada — USP e UNIFESP** | USP: nenhuma questão com texto lido; UNIFESP: 14 de 582. **1.025 pares questão×diretriz** em todas as provas citam edição anterior à vigente (69 questões USP e 45 UNIFESP no recorte da tabela) | Quem lê as diretrizes e envia os PDFs que a rede não abre | `docs/PENDENCIAS-DE-REFERENCIAS.md`; `docs/REFERENCIAS-COM-EDICAO-ANTERIOR.md` |
| 4 | **Diretrizes: referência sem conferência datada** (simulados autorais e outros) | **148 questões** em 5 bancos (livros-texto 31, MS/Conitec 28, pediatria 26, epidemiologia 23, GO 18, cirurgia 10, demais 12) | Skill `conferir-referencias` | `docs/REFERENCIAS-A-CONFERIR.md`; `npm run referencias-a-conferir` |
| 4-B | **Banco didático: referências** (projeto de adequação, fase 3) | **34 de 135 questões sem referência**; 45 com livro-texto só indicado (sem leitura); 56 com texto oficial lido e datado (13/11/2026); também 2 da `tp-2020-2` sem referência. **Decisões da equipe:** `q-card-09` (ICFEr < 50% na SBC 2026) e `q-card-24` (atropina 0,5 mg SBC × 1 mg AHA) | Skill `conferir-referencias` + quem enviar os PDFs da linha 5 e conferir os livros | `docs/PENDENCIAS-DE-REFERENCIAS.md`, seção 6-B; `docs/PROJETO-ADEQUACAO.md`; `npm run auditoria-padrao -- sem-diretriz` |
| 4-C | **Adequação ao padrão, fase 2: mecanismo + epidemiologia** (projeto de adequação) | **0 questões ainda sem "Epidemiologia:"** (99,3% já têm mecanismo + epidemiologia pela medida da auditoria; o resto é "sem mecanismo"). **Feitos:** 8 bancos didáticos de graduação, TP 2020-2 a 2025-2, USP-RP 2021–2026, USP-SP simulados 1, 2, 4 e 5, Unicamp, Santa Casa, IAMSPE, UNIFESP (provas 2022–2026 e banco adaptado 2024), SES-SP 2022 a 2026, `banco-simulado-epm-6` e `banco-simulado-didatico-epm`. **Falta:** a contagem de epidemiologia fechou. **Lacuna de medida ampliada (decisão da equipe):** a auditoria aponta ainda 80 questões não anuladas sem mecanismo pela heurística (todas lidas: têm mecanismo em prosa; recomenda-se aceitá-las; conferir a q-simepm89-060 e a q-tp20222-028), depois de aceitar mecanismo em prosa com dois marcadores causais e de escrever 17 linhas no USP-SP; falta ler essas 829 e escrever "Mecanismo:" onde a explicação só traz conduta ou dado (opção 3, em andamento).**Fase de referências começou (17/11/2026):** GINA 2026 lida e anotada em 6 questões da USP-SP (`ginasthma.org` abre); `q-usp2026-070` tem trecho de fisiopatologia que não bate com o gabarito (revisar). GINA 2026 concluída nas demais provas (45 questões; 6 explicações a revisar e 6 citações espúrias de GINA em RCP pediátrica, listadas em `docs/PROJETO-ADEQUACAO.md`). Calendário Nacional de Vacinação 2026 lido e anotado em 66 questões (6 a marcar como desatualizadas e 8 explicações a revisar, em `docs/PROJETO-ADEQUACAO.md`). **Rastreamento do colo do útero (Portaria 13/2025, 72 questões) e as demais diretrizes que exigem PDF estão listadas em `docs/PENDENCIAS-DE-REFERENCIAS.md`, seção 6-C.** Hipertensão SBC 2025 lida e anotada em 31 questões (5 explicações a revisar). OMS/FIGO/ICM de hemorragia pós-parto lida em 14 questões (5 referências espúrias a trocar). SBP ferro 2026 lida em 22 questões (3 gabaritos desatualizados na dose e 4 explicações a revisar). ACG pancreatite aguda 2024 lida em 30 questões (4 explicações a revisar, 2 questões de pancreatite crônica sem fonte adequada). ATA 2025 (câncer diferenciado) lida em 11 questões, 9 delas de nódulo fora do escopo da edição; ESGO 2025 não aberta. KDIGO 2024 (DRC e nefrite lúpica) e 2026 (anemia) lidas em 13 questões. Faltam as demais diretrizes de `docs/PENDENCIAS-DE-REFERENCIAS.md`. **Sem decisão da equipe:** `q-card-09`, `q-card-24`, `q-016`, `q-008`; as frases são genéricas e **precisam de revisão por quem é da área** (cada rodada lista o que rever em `docs/PROJETO-ADEQUACAO.md`, "Andamento") **Fase 4 (18/11/2026):** ADA 2026 lido no PMC nas seções 3, 10, 11, 12, 13, 15 e 16 (34 questões anotadas; faltam as seções 2, 6 e 9, que caem em reCAPTCHA); EAU 2026 lida em todas as diretrizes citadas (62 questões; host do PDF liberado); termo `ata-dtc` restrito ao câncer diferenciado; pendências de PDF/host em `docs/PENDENCIAS-DE-REFERENCIAS.md`, seção 6-C. | Quem for continuar a fase 2; revisão pela área médica | `docs/PROJETO-ADEQUACAO.md`; `npm run auditoria-padrao -- --so-resumo`; `docs/ADEQUACAO-AO-PADRAO.md` |
| 5 | **PDFs e documentos que a rede da sessão não abre** (para enviar) | Sepsis-3 e SSC 2026; Portaria GM/MS de notificação compulsória (11.211/2026); Lei 8.080 e PNAB 2017; PCDT de PEP; Tokyo 2018 e KDIGO 2024; AHA/ASA 2026 (AVC); AHA 2025 (RCP/PALS); BTS 2023 (pleura); Portaria Conjunta SAES/SECTICS 13/2025 (colo do útero); NCCN 2026 (exige login); EAU 2026; ACOG; ESC/EACTS 2025 e ESC pericárdio 2025; ADA 2026; Sepsis-3 (JAMA 2016); ATLS 11ª ed. (paga) | Quem puder baixar e enviar | `docs/PENDENCIAS-DE-REFERENCIAS.md`, seção 4 |
| 6 | **Gabaritos oficiais a conferir ou que faltam** | SES-SP 2026 (gabarito definitivo); FAMERP 2023 (definitivo) e lacunas de 2024/2026; UNESP 2023; FAMEMA 2023 e 2025 (definitivo); USP-RP 2021–2025 (folha oficial; 2022-100, 2023-36/59/95); Teste de Progresso 2022 (comentário oficial; 120 letras); TP 2025/2 e 2026/1 se houver gabarito definitivo diferente; UNIFESP 2023-30, 2024-1 e 2024-88 | Quem tem as folhas oficiais | seção 1 e 3 |
| 7 | **Letras de gabarito discutíveis** (nada alterado) | ~13 questões USP e ~9 UNIFESP em `docs/PENDENCIAS-DE-REFERENCIAS.md`, seção 5; dezenas já avisadas na explicação (AMRIGS 2022–2025, IAMSPE, TP, FAMERP, FAMEMA) | A equipe decide: manter com aviso, marcar desatualizada ou anular | seções 1 e 3; `docs/PENDENCIAS-DE-REFERENCIAS.md` |
| 8 | **Texto incompleto de questão** | USP-RP 2022: nº 19 e 75 (trechos cortados no caderno oficial), 8 e 23 (pergunta final completada pela equipe); FAMEMA 2025: 49 e 50 | Original da prova | seção 2 e item 1 |
| 9 | **Questões sinalizadas por alunos, fora do estudo** | SES-SP 2026 q. 49 (vacinas aos 6 meses) e SES-SP 2023 q. 57 (cálcio): `desatualizada` até a equipe decidir; FAMEMA 2025 q. 49/50 | Equipe | seção 3 |
| 10 | **Cartões da equipe** | **20 assuntos sem nenhum cartão** (`ass-psiq-alimentar`, `-psiq-personalidade`, `-saudeplanetaria`, `-orl-glandulas`, `-genetica-erros-inatos`, `-neuroendocrinos`, `-intussuscepcao`, `-febrelactente`, `-marcadorestumorais`, `-ddsmalformacoes`, `-toxinfeccao`, `-restricaocrescimento`, `-dorpelvica`, `-anatomiacirurgica`, `-emerg-ambientais`, `-politicasnacionais`, `-vitalidadefetal`, `-partopretermo`, `-neutropeniafebril`, `-micosesinvasivas`); **442 cartões gerados esperam conferência de professor** (`revisao: "pendente"`: 376 em `flashcards-assuntos-novos.js`, 57 em `-usp.js`, 9 em `-usprp.js`) | Equipe / professor | seção 5; *Revisão Rápida › Cobrir os assuntos sem cartão* |
| 11 | **Fotos clínicas de licença livre para os resumos** (Wikimedia Commons) | 10 fotos escolhidas pela descrição e com licença conferida (18/11/2026), mas **não vistas**: o servidor de imagens da Wikimedia (`upload.wikimedia.org`) devolve 429 para a rede da nuvem. Kawasaki A, B, D, F e G (CC BY 2.0, Dong Soo Kim) → `kaw-crit`; `Varicella.jpg` (domínio público) e `Varicella zoster Infection - Howrah 2014-04-06 9765.JPG` (CC BY 3.0) → `var-tudo`; `Scarlet fever rash.jpg` (CC BY-SA 4.0) e `Scharlach.JPG` (língua em framboesa, CC BY-SA 2.5) → `esc-clinica`; `Koplik spots, measles 6111 lores.jpg` (CDC, domínio público; opcional) → `sar-clinica` **18/11/2026, rodada de imagens:** a API (`commons.wikimedia.org/w/api.php`) também devolveu 429; os resumos novos (calendário, pneumonia, crescimento, emergências, diarreia, infecções congênitas) ganharam casos do banco e esquemas autorais, sem foto externa. Candidatas a buscar quando a rede abrir: vesículas do herpes neonatal, pênfigo sifilítico, catarata congênita, sinais de desidratação (olhos fundos, prega). | Quem puder baixar e anexar as fotos; depois conferir se mostram o achado e ligar em `figuras` com `credito` e `fonte` | `resumos/LEIA-ME.md`, regra 12 |
| 11 | **Tabela de edições vigentes** | Acrescentar à `ferramentas/edicoes-vigentes.json` as diretrizes achadas na revisão da USP (ATLS 11ª, ESC/EACTS 2025, ESC pericárdio 2025, KDIGO glomerulopatias, ESHRE 2024, RCOG, Lei 14.785/2023, Decreto 11.161/2022, nota técnica de violência sexual 2024, PCDT-IST/PrEP/PEP/TV, TB OMS, ASMBS, IDSA cateter, PCDT Parkinson) e rodar `npm run referencias-a-conferir` | Quem estiver na frente de referências | `docs/PENDENCIAS-DE-REFERENCIAS.md`, seção 3 |
| 12 | **Infraestrutura (só a coordenação)** | Supabase: *Site URL* e *Redirect URLs* (com `**`); segredos `SUPABASE_DB_URL` e `BACKUP_SENHA` no GitHub; desligar "Confirm email"; opcional: VAPID/`avisar-pedido` para aviso com o app fechado (o `esquema.sql` já está em dia no banco real: `comentarios.resolvido` criada em 12/11/2026) | Coordenação | topo do `RESUMO-PROJETO-ESC.md`; `nuvem/LEIA-ME.md` |
| 13 | **Resumos adaptativos: fontes a ler** (22/11/2026: `colecistite-e-coledocolitiase` com Tokyo 2018 (já listado no item 5), WSES de colecistite, ASGE de coledocolitíase e SAGES (gestação) não lidos; `pancreatite-aguda` com ACG 2024 (`journals.lww.com` 403), Atlanta revisada, IAP/APA e WSES de pancreatite não lidos; `cuidados-perioperatorios` com ASA (inclui GLP-1), ACC/AHA e ESC pré-operatório, ACERTO/ERAS, ESPEN/BRASPEN, antibioticoprofilaxia e CHEST/Caprini não lidos; `complicacoes-cirurgicas` com CDC/NHSN, Clavien-Dindo, WSES/SIS (infecção intra-abdominal) e WSACS não lidos; `obstrucao-intestinal` com WSES (bridas), ESGE/ASCRS (obstrução maligna), ACG/ASGE (Ogilvie) e tratados de cirurgia pediátrica não lidos (PDFs ausentes, `lotes/fontes/` não existe); `hernias` com HerniaSurge (2018 e atualização de 2023), WSES 2017 de hérnias complicadas e EHS/AHS não lidos (`pmc.ncbi.nlm.nih.gov` pede captcha; Europe PMC e E-utils bloqueados); `trauma-abdominal` com ATLS, WSES e escalas AAST não lidos (PDFs ausentes); `atls` com o ATLS (10ª e 11ª) e a WSES de trauma não lidos — `lotes/fontes/` não existe na sessão, enviar os PDFs; `comunicacao-clinica` com Stewart (MCCP), SPIKES, Código de Ética Médica e Lei 14.737 não lidos; `imunizacao` com Calendário Nacional vigente, Manual de Normas e Procedimentos de Vacinação, CRIE e protocolo da raiva não lidos; `saude-do-trabalhador` com PNSTT, Lei 8.213, NR-5, NR-7 e NR-15 não lidos; `prevencao` com USPSTF, INCA (mama e colorretal), norma do colo do útero e PNPS não lidos; conferir a faixa etária vigente da mamografia; `principios-do-sus` com CF/88, Leis 8.080 e 8.142, Decreto 7.508, LC 141 e Resolução CNS 453 não lidos (`planalto.gov.br` e `bvsms` sem resposta nesta rede); `bioestatistica` com GRADE e USPSTF não lidos; `vigilancia-em-saude` com Lista Nacional de Notificação, PNVS, Guia de Vigilância, protocolo da raiva e manual da DO não lidos (`bvsms` 403; `gov.br/saude` com erro); `medidas-epidemiologicas` com a RIPSA (indicadores básicos) não lida; `desenhos-de-estudo` com CEBM (`cebm.ox.ac.uk`, 403) e STROBE não lidos; CONSORT e PRISMA lidos via PMC; `estrategia-saude-familia` com PNAB 2017, Portaria 635/2023 e Lei 14.510/2022 não lidas — `bvsms.saude.gov.br`, `in.gov.br`, `planalto.gov.br`, `conass.org.br` e `gov.br/saude` devolveram 403, erro de conexão ou 404) (`docs/PROJETO-RESUMOS.md`, seção 7) | **47 resumos** (15 de GO escritos em 19/11/2026); fontes lidas só em `exantematicas` (Guia de Vigilância 2024) e `calendario-vacinal` (IN 2026), em 19/11/2026. Domínios que recusaram: `abccardiol.org` (diretriz brasileira de FA 2025), `eje.bioscientifica.com` e `academic.oup.com` (hiponatremia, ESC), `ahajournals.org`/`cpr.heart.org` (AHA: RCP, Kawasaki, SCA), `nccn.org` (login), `bvsms.saude.gov.br` (diretriz nacional de parto normal, 403; resumo `trabalho-de-parto`), `eshre.eu` (sem resposta; ESHRE endometriose lida no PMC), `menopause.org` (NAMS), ESGO 2025 (endométrio) e Portaria 13/2025 (colo, PDF). Em 22/11/2026 os domínios foram liberados no ambiente, mas os sites recusam acesso automatizado: `planalto.gov.br` (resposta vazia), `scielo.br`, `ahajournals.org` e `cpr.heart.org` (HTTP 403 do próprio site), `menopause.org` (404 no PDF); a AHA 2025 parte 9 não está no PMC (só a parte 3). Caminho: enviar os PDFs. sem documento da SBP sobre enterocolite necrosante (`abdome-agudo-rn` depende de livro-texto). Lidas na fase 2 (19/11/2026): PCDT-IST e PCDT-TV, consenso de crises hiperglicêmicas 2024, Manual de TB 2019 e NI 4/2024, SBP (VSR, PAC, PRN 2022, hiperbilirrubinemia, coraçãozinho, ferro 2026), Guia de Vigilância 2024 (coqueluche), PCDT de hanseníase e de hipotireoidismo congênito, cartaz da diarreia 2025, KDIGO 2021 glomerular, Baveno VII, manual de peçonhentos, guia de influenza 2023. Lidas em GO: OMS intraparto 2018, OMS MEC 2025, OMS HPP 2025, OMS corticoide e tocólise 2022, calendário 2026 da gestante, OPAS/MS DMG 2017, NICE NG123, ESHRE 2022. Divergências de gabarito registradas nos capítulos \"Armadilhas\" (nada alterado): atropina 1 × 0,5 mg; FA hipotensa com anticoagulante antes (`q-scmsp2025-016`); K 5,8 com furosemida (`q-usp2026-021`); MONA, SCA sem supra hipotensa ≤ 24 h (`q-tp20222-021`), ticagrelor antes do cateterismo; enxofre 6 × 10%; radiografia × TC no mieloma; flumazenil com Glasgow 6 (`q-amrigs2025-071`); tetraviral aos 15 meses (`q-usprp2026-035`) | Coordenação (liberar domínios ou enviar PDFs) e quem escreve os resumos | `docs/PROJETO-RESUMOS.md`, `resumos/LEIA-ME.md` |

**Ordem sugerida:** (1) figuras das provas com mais questões (USP-SP 2023 e USP-RP 2024 resolvem 50 de uma vez; Santa Casa 32) · (6) folhas de gabarito oficiais · (5) PDFs das diretrizes · (2) reposições · (3, 4, 11) referências · (10) cartões.

---

## 1. Provas ou questões que faltam

Nenhuma prova inteira espera caderno ou gabarito no momento. Entraram em 04/10/2026: AMRIGS 2020 e 2021 e o Teste de Progresso 2025/1. O "IAMSPE 2024" (Edital 02/2024) é a prova que o banco já tinha como IAMSPE 2025: caderno e gabarito conferem, nada a acrescentar. Faltam apenas os anos que ainda não chegaram (por exemplo, a Santa Casa 2024 e novos anos da UNESP).

### FAMERP 2022 a 2026: caderno incompleto em 2024 e 2026, gabarito de 2023 não oficial

Entraram em 05/10/2026 as cinco provas da FAMERP (385 questões). Pendências:

- **FAMERP 2024**: o PDF não traz as questões 58 a 61 e 65, e a 64 está cortada (faltam as alternativas C e D). **FAMERP 2026**: faltam 69 a 71 e 76 a 79, e as 68 e 75 estão cortadas. As lacunas estão listadas em `LACUNAS_CONHECIDAS` (`testes/conferir-dados.mjs`) e no cabeçalho de cada prova, com o gabarito de cada uma. Entram quando o caderno completo chegar.
- **FAMERP 2023**: o gabarito é a lista "Respostas" do PDF compartilhado, não o definitivo da banca. A 34 (teste do coraçãozinho com 89%) parece errada no arquivo; conferir com o definitivo.
- Respostas da banca que a explicação marca como discutíveis: 2022-68; 2024-6 e 74; 2025-8, 28 e 38; 2026-45.

### Teste de Progresso 2025/1, AMRIGS 2020 e 2021: gabarito oficial discutível

**Teste de Progresso 2025/1** (comentário oficial do NIEPAEM; sem anuladas conhecidas): a nº 97 (ASC-US aos 30 anos) está marcada como **desatualizada**, porque o rastreamento brasileiro passou ao teste de DNA-HPV em 18/08/2025. A explicação avisa onde a letra da banca é discutível: 51 (cetoacidose com potássio de 2,8 mEq/L: a reposição do potássio precede a insulina), 66 (derrame pleural com massa: o primeiro passo costuma ser a toracocentese, não a videotoracoscopia), 68 (Gleason 6 com PI-RADS 4: a vigilância ativa também seria defensável), 113 (o metilfenidato é de primeira escolha, mas a banca elegeu a alternativa do relato dos professores) e 117 (a PA de 158/97 mmHg, se confirmada, também contraindicaria o combinado); e a **nº 28** (hidrocefalia de pressão normal: na figura, o aspecto típico, com ventrículos dilatados e sulcos apagados, está na imagem A, e a banca marcou a B, que mostra uma lesão frontal; conferir a letra com o caderno original).

**AMRIGS 2021** (edital definitivo; anuladas 1, 40, 44, 54, 56, 68 e 89): a explicação avisa nas nº 17 (IECA no infarto também é verdadeira), 25 (creatinina de rotina em hígido jovem), 33 (pela regra dos nove, tronco mais membro superior dão 45%, e a conta de Parkland da afirmativa II está certa) e 46 (a categoria da cardiotocografia depende da variabilidade, que a imagem não permite avaliar). A nº 83 chama de "viés de memória" o que é viés de aferição.

**AMRIGS 2020** (edital definitivo; anuladas 4, 19, 20, 31, 39, 49, 53, 55, 57, 75, 87 e 92): discutíveis a nº 13 (a aspirina como "único" antitrombótico), 14, 38 (o sinal de Dunphy também é de apendicite) e 61. Os motivos das anulações não constam do edital, e as explicações das anuladas dizem isso.

### USP e UNIFESP: referências e diretrizes a atualizar

As 580 questões da USP 2022–2026 e as 582 da UNIFESP estão no padrão novo, mas o texto das diretrizes quase não foi lido (USP: nenhum; UNIFESP: 14). Todas as pendências de referência dessas provas — edições superadas, diretrizes fora da tabela de edições, PDFs a enviar e letras de gabarito a conferir — estão em **`docs/PENDENCIAS-DE-REFERENCIAS.md`**.

### Teste de Progresso 2025/2 e 2026/1: questões de gabarito discutível e cartões dos assuntos novos

O gabarito é o oficial do NIEPAEM. As explicações já avisam onde a letra da banca é discutível: 2025/2 nº 13 (contracepção aos 12 anos e comunicação aos responsáveis), 70 (pneumonia necrosante: C ou D) e 80 (tumor testicular: o seminoma puro também tem AFP normal); 2026/1 nº 22 (o enunciado não descreve o sorteio, mas a banca chama de ensaio clínico), 30 (a citologia inflamatória com metaplasia imatura é benigna, mas o gabarito a trata como ASC-US), 38 (Gleason 6 com PI-RADS 4: a vigilância ativa seria defensável), 87 (urodinâmica na incontinência mista), 97 (cirurgia primária em vez de quimioterapia neoadjuvante no câncer de ovário avançado) e 116 (isquemia aguda grau III: amputação primária). Os 12 assuntos abertos por essas provas (`ass-geriatria-perdapeso`, `ass-alergia-rinite`, `ass-psiq-personalidade`, `ass-infectoped-coqueluche`, `ass-derm-acne`, `ass-saudeplanetaria`, `ass-pneumo-hp`, `ass-neuro-medula`, `ass-psiq-toc`, `ass-genetica-teratogenese`, `ass-genetica-erros-inatos` e `ass-oft-orbita`) ainda não têm cartão da equipe. Quando o NIEPAEM publicar um gabarito definitivo diferente (anulações), conferir as letras.

### Teste de Progresso 2023/1 e 2023/2: revisão pelas diretrizes

O gabarito é o oficial (comentado). O caderno de 2023/1 ("versão gabaritada") marca a letra A em todas as questões, em ordem de redação da banca, e na 42 a marcação não bate com o comentário (a correta é a do cristaloide); por isso as alternativas de 2023/1 foram embaralhadas e a resposta de cada uma conferida pelo texto do comentário. Duas questões ficaram **desatualizadas** por divergirem da diretriz atual: 2023/1 nº 87 (insuficiência istmocervical com 29 semanas: a diretriz indica corticoide antenatal e não repouso absoluto) e 2023/2 nº 95 (ASC-US: o rastreamento brasileiro passou ao teste de DNA-HPV em 18/08/2025). Também marcada como desatualizada a 2026/1 nº 30 (citologia inflamatória tratada como atípica). Ficam com aviso, sem mudar a letra: 2023/1 nº 3 e 63 e 71 (conduta de via aérea, antibiótico precoce na fratura exposta), 2023/2 nº 36 (complicação da displasia do quadril), 85 (convulsão em diabética: glicemia capilar), 88 (corticoide na rotura pré-termo), 98, 107 e 114.

### Teste de Progresso 2020, 2021 e 2022: letras a conferir e comentário que falta

**2022 (04/10/2022):** o caderno veio sem comentário oficial e com a alternativa certa sempre em A; a explicação é toda da equipe e as alternativas foram embaralhadas. Quando a banca divulgar o gabarito comentado, enviar para conferir as 120 letras. Três questões estão como *desatualizadas*, com o motivo na questão: **28** (líquor com glicose de 26 mg/dL e o gabarito "enterovírus"), **70** (estágio IV, gabarito "quimioterapia neoadjuvante") e **117** (a marcação do caderno, "afastar dengue", contradiz a sensibilidade do teste: o gabarito aqui é "manter sob suspeita"). Também vale conferir a **7** (a peça da figura 1 foi lida como aneurisma, segundo a marcação do caderno: túnica média) e a **112** (a alternativa D, vulnerabilidades individual e social de ambas, também é defensável). **2020:** 91 e 105 foram anuladas pela banca; 81 e 90 estão *desatualizadas*. **2021:** 19 e 35 estão *desatualizadas*; a 120 não tem comentário oficial, só as referências.

### SES-SP 2026: gabarito da cópia do caderno, não o definitivo

As 100 letras vêm da lista de respostas da cópia do caderno; nenhuma questão está marcada como anulada. Enviar o **gabarito definitivo da seleção 2026** para conferir e marcar as anuladas. As explicações que dizem "foi a indicada no gabarito usado" apontam as letras mais duvidosas (por exemplo 12, 27, 44, 48, 70 e 92). A questão 48 (profilaxia da tuberculose em criança) segue o esquema de 270 doses, anterior ao protocolo atual do Ministério da Saúde (isoniazida por 6 meses).

## 2. Texto incompleto

Todas estas questões são da USP-RP e vieram de PDFs comentados que chegaram cortados.
O caderno oficial de cada ano resolve.

| Prova | Questão | O que falta |
| --- | --- | --- |
| USP-RP 2022 | 19 | Descrição da lesão da região da fralda. O caderno oficial também veio sem esse trecho (e sem a foto): precisa do original |
| USP-RP 2022 | 75 | Trecho do exame físico ("consciente, … difusos"). O caderno oficial também veio sem ele |
| USP-RP 2022 | 8 e 23 | A pergunta final não consta nem no caderno oficial; foi completada pela equipe. Conferir no original |

Os trechos cortados aparecem marcados no próprio texto como "[texto incompleto no material de origem]".

## 3. Gabaritos para conferir

### UNESP 2023: gabarito da edição usada, não da folha oficial

Conferir as 100 questões contra o gabarito definitivo da banca e marcar as anuladas (a edição não informa nenhuma).
A explicação já avisa onde a alternativa dada como certa tem imprecisão: 2023-8 (a adrenalina intramuscular é a de 1:1.000, não 1:10.000) e 2023-59 (tratamento do HIV "na fase de contágio").

### UNIFESP 2024 nº 1 e nº 88: gabarito que depende da leitura da banca

Na **nº 1** (aneurisma sacular de aorta infrarrenal de 3 cm) o gabarito é o tratamento endovascular (C), e a explicação diz que ele só se sustenta pela forma sacular: pelo diâmetro isolado, a vigilância (A) seria a conduta. Na **nº 88** (triagem de fenilcetonúria que não se confirmou) o gabarito é a hiperfenilalaninemia materna (C), mas o enunciado não traz história materna. Conferir as duas letras com a folha oficial da banca.

### UNIFESP 2023 nº 30: gabarito que não combina com o enunciado

O banco marca a letra A (teste t para duas populações independentes), mas o enunciado relaciona a mortalidade a quatro variáveis contínuas (leitos de UTI, Gini, IDH e analfabetismo), o que pede regressão múltipla ou, entre as opções, a correlação de Pearson (B). Conferir a letra com a folha oficial da banca; a explicação já avisa.

### Questões sinalizadas por alunos (conferidas em 12/11/2026)

- **FAMEMA 2025, q. 49 e 50**: faltou transcrever o caso clínico comum (mulher de 47 anos); estão com `imagemPendente` e fora do estudo até alguém copiar o texto do caderno FMMA2403 (o PDF não abre na rede da sessão).
- **SES-SP 2026, q. 49 (vacinas aos 6 meses)** — fora do estudo (`desatualizada`) até atualizar: o gabarito C inclui pneumo-10, que no calendário nacional é dada aos 2 e 4 meses e aos 12, não aos 6. A explicação avisa; falta o gabarito definitivo da banca para decidir se anula.
- **SES-SP 2023, q. 57 (cálcio)** — fora do estudo (`desatualizada`) até atualizar: a Cochrane de dez/2025 (CD001059.pub6) não achou redução da pré-eclâmpsia, mas é contestada e OMS/FEBRASGO mantêm a recomendação. Gabarito mantido, explicação avisa; rever quando as diretrizes mudarem.
- **TP 2024-1, q. 120**: tabela do enunciado reformatada (números e gabarito A conferidos). **Simulado 5 EPM, q. 67 (`q-adap23-067`)**: já reescrita em 27/10 (NT 193/2024).

### FAMEMA 2021, 2022, 2023 e 2025

- **2021**: gabarito da folha oficial definitiva (95 anulada). A 51 (laqueadura) está marcada como desatualizada, porque a Lei 14.443/2022 mudou a regra, e a 17 (hérnia femoral) tem enunciado discutível.

- **2022**: gabarito da folha oficial. A explicação avisa onde ele é discutível: 18 (coorte), 65 (classificação laparoscópica de Gomes), 68 (espaço do Rives-Stoppa) e 69 (sutura de Halsted).
- **2023**: gabarito da edição em texto usada (como na UNESP), não da folha oficial; a edição não informa anuladas. Conferir com o definitivo, em especial 22, 25, 39, 45, 62 e 77, onde a explicação já avisa que o gabarito parece discutível.
- **2025**: as 100 letras são as do gabarito divulgado pela banca no dia da prova (as 15 que antes eram só da equipe coincidem com ele). A 39 (diarreia) tem duas alternativas defensáveis, a A (zinco) e a D (ciprofloxacina na disenteria). Falta o gabarito definitivo (14/01/2025) para marcar as anuladas.

### USP-RP 2021 a 2025: gabarito vindo do PDF comentado, não da folha oficial

Em 03/10/2026 os cadernos de 2021, 2022 e 2023 foram comparados com o banco: em **2021** os 118 gabaritos batem com o do caderno (comparando pelo conteúdo, porque a numeração das versões é outra); em **2022** só diverge a 100 (banco B, caderno D); em **2023** o caderno traz a folha em branco nas questões 31–34 e 37–40 e diverge em 36 (banco C, caderno D), 59 (banco anulada, caderno C) e 95 (banco B, caderno C). Nada foi mudado: as explicações atuais sustentam o gabarito do banco e não há como saber, sem a folha oficial da banca, qual das duas fontes está certa. Falta só a folha oficial para decidir 2022-100 e 2023-36, 59 e 95; 2024 e 2025 seguem sem conferência.

Vale conferir **todos** os gabaritos desses cinco anos contra a folha oficial.
Nas questões abaixo, a explicação já avisa que o gabarito é discutível:

| Questão | Ponto de dúvida |
| --- | --- |
| 2021-87 | Na cloaca, a hidrocolpia também explica a massa no hipogástrio; o gabarito dá hidronefrose |
| 2022-14 | O gabarito aceita só o IECA; o bloqueador de canal de cálcio também seria opção aceitável |
| 2022-15 | Família com filhos adotivos: o gabarito chama de "funcional", muitos autores chamam de nuclear |
| 2024-45 | Cetoacidose euglicêmica: a alternativa sobre as gliflozinas também é verdadeira |
| 2024-60 | TSH alto com T4 baixo é hipotireoidismo primário, mas o gabarito dá hipopituitarismo |
| 2025-40 | O DIU de cobre é categoria 1 da OMS; o gabarito prefere a pílula de progestágeno |
| 2025-50 | A OMS recomenda cálcio a partir de 20 semanas; o gabarito diz que nenhuma profilaxia deve ser prescrita |

### AMRIGS 2025: gabarito definitivo oficial, mas discutível pela literatura

O gabarito é o da banca e fica como está. A explicação diz onde ele diverge das fontes:

| Questão | Ponto de dúvida |
| --- | --- |
| 2022-22 | A desnutrição foi dada como a exceção, mas ela prejudica a cicatrização |
| 2022-23 | Classificação de Johnson: a alternativa C erra no tipo V, e a B descreve corretamente o tipo I |
| 2022-24 | A pergunta pede a INCORRETA, e a D também está incorreta (Y de Roux é o tratamento dos refratários) |
| 2022-32 | Enunciado curto; a diverticulite complicada também entra no diferencial |
| 2022-35 | Radiografia de tórax pré-operatória de rotina não é recomendada pelas diretrizes atuais |
| 2022-42 | PIG entre os percentis 3 e 10: a SMFM sugere parto com 38 a 39 semanas; o gabarito diz a partir de 39 |
| 2022-58 | O esquema da alternativa D é o recomendado para doença inflamatória pélvica em internação |
| 2023-3 | "Hipercalcemia é o distúrbio mais frequente nas síndromes paraneoplásicas" depende da definição usada |
| 2023-16 | Rastreamento colorretal: a banca trocou de 45 para 50 anos; USPSTF e ACS recomendam começar aos 45 |
| 2023-21 | A alternativa D (Chagas como causa mais comum no Brasil) também é defensável |
| 2023-30 | Na hemorragia do delgado, a causa mais comum no geral é a angiodisplasia, não Crohn (alternativa C) |
| 2023-32 | Idade avançada e disfunção renal também são fatores de risco nos índices usados |
| 2023-37 | O T por tamanho vale para o GIST; no adenocarcinoma de delgado, o T é pela profundidade |
| 2023-67 | Idade gestacional abaixo de 38 semanas (alternativa C) também é fator de risco |
| 2023-71 | Aos 2 meses, estreptococo do grupo B e pneumococo também são prováveis |
| 2024-25 | Estenose pilórica no adulto: a banca dá úlcera, mas hoje a neoplasia responde por boa parte dos casos |
| 2024-27 | Pólipo de vesícula: o gabarito usa 8 mm; o limiar mais aceito para cirurgia é 10 mm |
| 2024-36 | A alternativa B (reparo das hérnias paraesofágicas decidido pelos sintomas) também é defensável |
| 2025-6 | "Apenas enterobactérias reduzem nitrato" é excessivo; foi a alternativa escolhida por exclusão |
| 2025-16 | A dupla antiagregação após AVC menor também é eficaz, o que relativiza o "único" da alternativa B |
| 2025-29 | Diverticulite com ar pericólico: as diretrizes indicam antibiótico, e a alternativa D não o menciona |
| 2025-51 | Chamar 10 horas de trabalho de parto com 4 cm de "fase latente prolongada" é impreciso |
| 2025-65 | Refluxo vesicoureteral grau II com ITU febril de repetição: há diretrizes que manteriam a profilaxia |

### Outras bancas

| Questão | Ponto de dúvida |
| --- | --- |
| USP-SP 2025-114 | A alternativa D também seria defensável pelos dados da tabela |
| IAMSPE 2021-8 | Os valores da gasometria não fecham entre si (pH, pCO2, bicarbonato e BE) |
| IAMSPE 2021-29 | O preparo intestinal com antibiótico oral (E) é hoje recomendado na cirurgia colorretal eletiva |
| IAMSPE 2021-31 | O item "jejum oral" foi dado como certo; as diretrizes atuais preferem a dieta oral precoce |
| IAMSPE 2021-78 | Estudo ecológico: "conclusões generalizáveis com maior facilidade" é a resposta da banca, mas é discutível |
| IAMSPE 2022-25 | Marcadores: a banca deu fígado–CEA/alfafetoproteína (D); estômago–CEA/CA 19-9 (A) também é verdadeira |
| IAMSPE 2022-32 | Pela recomendação atual, a semaglutida também seria suspensa (seriam três medicações, não duas) |
| IAMSPE 2023-18 | Fratura do enforcado: a banca deu "bom prognóstico" (B), mas "fratura do áxis" (A) também é verdadeira |
| IAMSPE 2025-11 | Resistência do pneumococo às quinolonas: a banca começa por gyrA; para a levofloxacina, a literatura aponta parC |
| IAMSPE 2025-61 | Moro: a banca deu a ausência bilateral (E); a assimetria (B) também é anormal |
| IAMSPE 2025-64 | Rotavírus: A e C estão ambas corretas |
| IAMSPE 2025-71 | Marcos até 6 meses: a banca deu E; D (controle cefálico) também é marco do período |
| IAMSPE 2025-77 | Tuberculose na criança: a banca deu D; A também é incorreta (sem etambutol abaixo de 10 anos) |
| IAMSPE 2025-89 | Hanseníase: a banca aceitou a especificidade de 95% da A; a B descreve achado real da forma indeterminada |
| IAMSPE 2026-74 | Vacinas dos 4 meses: a alternativa inclui a meningocócica C, que é dos 3 e 5 meses |
| IAMSPE 2026-91 | Psicopatologia: o quadro é de ideias de referência e delírio; a banca deu pseudoalucinação (C) |

## 4. Figuras para anexar (86 de provas reais; as outras 53 estão no painel, item 1)

É só recortar do caderno oficial e salvar em `dados/imagens/` com o nome indicado.
Depois, apague a linha `imagemPendente` da questão no arquivo `dados/prova-*.js`: enquanto ela existir, a questão fica fora do estudo dos alunos (`npm run conferir` avisa quando a figura já chegou e a linha ficou para trás).
Pela plataforma: **Questões para Atualizar › Enviar a figura** libera a questão na hora (com a nuvem, para toda a turma), e **Baixar as atualizações** + `npm run atualizar-dados -- arquivo.json` traz as figuras e os consertos para cá.
O nome exato de cada arquivo e a descrição do que a prova mostrava estão em `dados/imagens/LEIA-ME.md`.
As provas da AMRIGS (2022 a 2025), a USP-RP 2025 e 2026, a UNIFESP (2022 a 2026), as do IAMSPE (2021 a 2026) e a UNESP 2023 já têm todas as figuras.

| Prova | Qtd | Questões |
| --- | --- | --- |
| USP-RP 2022 | 3 | 19, 21, 23 (o caderno veio sem as imagens destas) |
| USP-RP 2024 | 25 | 2, 4, 10, 11, 19, 21, 22, 24, 31, 34, 35, 38, 41, 42, 44, 63, 68, 76, 78, 80, 82, 83, 89, 93, 96 |
| USP-SP 2023 | 25 | 77–79, 81–83, 85–88, 95, 97, 98, 102, 104–106, 112–117, 119, 120 |
| USP-SP 2026 | 1 | 63 |
| Santa Casa 2022 | 6 | 11, 13, 23, 25, 54, 56 |
| Santa Casa 2023 | 9 | 10, 15, 17–19, 45, 49, 75, 76 |
| Santa Casa 2025 | 5 | 38, 40, 44, 63, 64 |
| Santa Casa 2026 | 12 | 10, 17, 21, 23, 29, 33–36, 39, 40, 42 |

Quando a figura chegar, vale reler a explicação.
Ela foi escrita a partir do texto e do gabarito, sem ver a imagem.
Isso pesa principalmente nas questões cujas alternativas só fazem sentido com a figura:

- USP-RP 2021-97 (fonogramas)
- USP-RP 2023-65 (esquema do néfron)
- USP-RP 2024-42 (fonogramas)

### Os cadernos que resolvem quase tudo de uma vez

- **USP-RP 2024**, caderno com a folha de gabarito. Resolve 25 figuras e a conferência do gabarito. (Os cadernos de 2021 a 2023 foram aplicados em 03/10/2026; o de 2025 já foi aplicado em 01/10/2026: as 27 figuras e a 2025-99 saíram daqui, mas a folha de gabarito veio em branco, então o gabarito de 2025 ainda precisa da folha oficial.)
- **USP-SP 2023**: 25 figuras.
- **Santa Casa 2022, 2023, 2025 e 2026**: 32 figuras.
- **UNESP 2023**: o gabarito definitivo oficial.

## 5. Assuntos sem cartão da equipe (20)

O banco tem 943 cartões em 217 dos 237 assuntos. Faltam cartões (três por assunto é o piso) para os 20 assuntos listados no painel (item 10). Em *Revisão Rápida › Cobrir os assuntos sem cartão — em lote* dá para gerar tudo numa tarde; os 442 cartões gerados (376 em `flashcards-assuntos-novos.js`, 57 em `-usp.js` e 9 em `-usprp.js`) ainda esperam a conferência de um professor (`revisao: "pendente"`).
