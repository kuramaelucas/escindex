# Reposições de questões anuladas e desatualizadas

Memória de trabalho: o que a plataforma faz, como se escreve uma reposição, o que já foi lido e feito, o que falta e as armadilhas. Escrito em 03/11/2026, ao fim da primeira rodada (PR #118). O estado atual sai de `npm run reposicoes`; este texto não o substitui.

## 0. Antes de criar uma reposição (lista de 30 segundos)

1. `npm run reposicoes -- pendentes [palavra]` e `npm run reposicoes -- <q-id>`: a lista **vem da ferramenta**, nunca de script solto na pasta temporária (uma contagem feita assim errou em mais de 10 questões).
2. Já tem reposição? O id `<original>-ia` repetido o `conferir` recusa. Está lá numa edição velha (ex.: IC 2018)? **Atualize** a existente em vez de duplicar.
3. Leia a seção 4 (o que abre) e a 8 (o que ficou para trás e por quê) antes de procurar fonte.
4. **A reposição herda da original: `banca` (nome idêntico, ex. `UNIFESP-EPM`, `Sírio-Libanês (SP)`), `ano`, `semestre`, `tipoProva`, `areaId`, `especialidadeId`, `assuntoId`.** Teste de Progresso exige `semestre` e `tipoProva:"graduacao"`. Esquecer isso criou a "prova" fantasma *TP 2020* e derrubou o CI em todo commit seguinte (`testes/provas-e-avisos.test.mjs`); agora `testes/reposicoes.test.mjs` confere esses campos. Confira de uma vez, antes de commitar: `node --test testes/reposicoes.test.mjs`.
5. Molde do começo da questão (só o que muda é o conteúdo): `id: "<id original>-ia"`, `banca`/`ano`/`semestre`/`tipoProva`/`areaId`/`especialidadeId`/`assuntoId` copiados da original, `real:false`, `reposicaoDe`, `status:"ativa"`, `criadoPor:"seed"`, `criadoEm` = hoje, `referencias` com "texto lido em DD/MM/AAAA" e "Conferido em DD/MM/AAAA" na **data em que leu**.
6. Fecho: `npm run conferir -- --resumo` → `npm run publicar` → `node --test testes/higiene.test.mjs testes/reposicoes.test.mjs` → commit → **olhar o CI do GitHub** (`npm test` não roda onde não há Playwright; um teste de navegador pode falhar por dado que o `conferir` não vê).

## 1. O que é

Prova real tem questão **anulada** (sem gabarito) e **desatualizada** (gabarito que a diretriz de hoje não sustenta). A **reposição** é uma questão à parte, escrita pela equipe a partir de texto oficial lido, que aponta para a original por `reposicaoDe`.

- Original: fica como está (anulada ou desatualizada), na prova de origem.
- Reposição: `real:false`, `status:"ativa"`, mesma banca, ano, área, especialidade e assunto; id = id da original + `-ia`; arquivo `dados/reposicoes-<tema>-<n>.js`, registrado em `dados/manifesto.js` logo depois da última `prova-`/reposição.
- Em rascunho (`status:"rascunho"` + `motivoStatus`) a reposição **não chega ao aluno** e não é oferecida na prova.

### Comportamento na plataforma (código em `04`, `05a`, `07`, `08`, `09b`)
- **Prova na íntegra** (simulado e prática): as anuladas e desatualizadas **aparecem**, mas a resposta não vira acerto nem erro, não grava resposta e não mexe nas estatísticas da questão (`foraDaNotaDaProva`, `finalizarSimulado`, `registrarResposta`).
- Se alguma tem reposição ativa, `perguntarVersaoDaProva` pergunta antes de começar: **como foi realizada de fato** ou **com a correção por IA** (a reposição entra no lugar). A versão com IA tem título próprio, `semClassificacao` e fica **fora do percentil/ranking** (`notasAnonimasDoSimulado`), mas as respostas contam no desempenho diário e mensal.
- **Estudo geral:** a reposição ativa entra como qualquer questão (selo "Reposição por IA"); a **desatualizada** também entra, com selo "Desatualizada"; a **anulada** não entra.
- Teste: `testes/duas-versoes-da-prova.test.mjs` (a reposição em rascunho da AMRIGS 2021 é ativada só dentro do navegador do teste).

## 2. Como escrever uma (método)

1. `npm run reposicoes -- pendentes [palavra]` escolhe; `npm run reposicoes -- <q-id>` mostra a original inteira.
2. **Entender o defeito** e classificar: (a) *duas corretas* (tirar uma delas: reescrever a alternativa para ficar claramente falsa); (b) *nenhuma correta* (escrever a alternativa certa); (c) *dado incoerente no enunciado* (corrigir o dado e **dizer na referência**); (d) *desatualizada* (refazer pela diretriz vigente); (e) *alternativa duplicada ou com erro de digitação*.
3. **Ler o texto oficial** com `npm run texto-oficial -- <url> --buscar "regex"` (baixa PDF ou página, converte e mostra as linhas). Anotar edição e data. Só então escrever.
4. Escrever a explicação no padrão de `dados/PADRAO-EXPLICACAO.md` (Dicas do enunciado; dados objetivos em `**destaque**`; mecanismo; epidemiologia; motivo de cada alternativa errada). Mecanismo e epidemiologia: só o que a fonte lida sustenta ou que é conhecimento básico; **nunca inventar número**.
5. `referencias` com a fonte, a edição, "texto lido em DD/MM/AAAA em <site>" e "Conferido em DD/MM/AAAA". Se uma parte do conteúdo **não** foi lida (livro-texto da original, edição mais nova), dizer isso na própria referência.
6. `npm run conferir -- --resumo` → `npm run publicar` → `node --test testes/duas-versoes-da-prova.test.mjs testes/higiene.test.mjs` → commit. A suíte inteira (`npm test`) roda no CI.

Os arquivos foram gerados por script (JSON dentro de `registrarQuestoes`); a mão também vale. Reaproveitar imagem: `imagemUrl` da original (a reposição mantém a figura).

## 3. Regras de honestidade que valeram

- Referência lida e datada, sempre. Se o domínio não abre, **não** citar a fonte como lida: deixar a reposição em `rascunho` (foi o caso da AMRIGS 2021 nº 1, AHA) ou refazer só com o que foi lido.
- `criadoEm` de reposição criada hoje deve ser hoje. A AMRIGS 2021 nº 1 usa o da original (04/10/2026) para passar no `conferir` **sem a data de leitura**: é uma exceção que precisa de revisão humana antes de ativar.
- Edição mais antiga lida? Dizer. Não inventar autores nem números (uma referência chegou a ter autor inventado e foi corrigida).
- Reescrever a pergunta (ex.: passar de "conduta" para "classificação") é legítimo se a referência declarar a alteração.
- `npm run conferir` **não** pega edição superada quando o texto da referência não casa com o `termo` de `ferramentas/edicoes-vigentes.json` (a reposição com "AHA 2020" passou e a vigente é a AHA 2025). Conferir à mão contra a tabela.

## 4. Fontes: o que abriu e o que não (em 03/11/2026, rede da sessão)

**Abrem com texto:** `www.gov.br` (PCDT, Calendário, Notas Técnicas; PDF por `<url>.pdf/@@display-file/file`, que a ferramenta já acrescenta), `bvsms.saude.gov.br` (PDF direto, depois da correção na ferramenta), `gov.br/conitec`, `ginasthma.org` (relatório em PDF), `diretriz.diabetes.org.br` (páginas por tema), `abccardiol.org` (XML dos artigos), `nice.org.uk`, `pmc.ncbi.nlm.nih.gov` (às vezes só o resumo), `iris.who.int` (PDFs da OMS), `acog.org`/`escardio.org` (abrem, texto não testado).

**Bloqueados (403/falha):** `cpr.heart.org`, `ahajournals.org`, `inca.gov.br` (PDFs dão 404), `planalto.gov.br`, `sbc.org.br`, `scielo.br`, `diabetesjournals.org`, `cochrane.org`, `bmj.com` (liberados no painel, mas ainda 403 na sessão: testar em sessão nova), `archive.cdc.gov`. Domínio liberado no painel pode só valer em sessão nova.

### Documentos já lidos (para não reler; edição e uso)
| Documento | Edição lida | Serviu a |
|---|---|---|
| Nota Técnica 193/2024 (rotavírus) e Calendário Nacional (página da criança/gestante) | 12/2024; página 2026 | rotavírus, dTpa, vacinas |
| Instrução Normativa do Calendário 2026 (gov.br `.pdf`) | 2026 | vacinas da criança, rotavírus, penta, men C/ACWY, pneumo VPC 20 |
| PCDT de IST | 2022 | gonorreia, sífilis, úlceras genitais, violência sexual |
| PCDT de Hanseníase | 2022 | PQT-U |
| PCDT Transmissão Vertical (HIV, sífilis, hepatites) | texto da Portaria 55/2020 | parto da gestante com HIV; 2022 não lida |
| PCDT de Hipertensão | Portaria 49/2025 | exames iniciais, confirmação diagnóstica, gota |
| PCDT de DM2 | Portaria 54/2020 | metas e rastreamento (edição posterior não verificada) |
| PCDT de Asma | Portaria 43/2026 | asma em ≤ 5 anos |
| PCDT de DPOC | Portaria 29/2025 | LABA/LAMA/ICS |
| PCDT de Crohn | 2017 (anexo alterado em 2025, não lido) | tratamento |
| GINA | Relatório 2026 | asma do adulto, exacerbação |
| SBD (diretriz de hiperglicemia na gestação; idoso) | online | DMG |
| SBC, Diretriz Brasileira de IC | Arq Bras Cardiol 2026 (a de 2018 foi superada) | perfil frio-congesto (PAS 80) |
| OMS, corticoide antenatal | 2022 | parto prematuro |
| NICE NG25 | atualizada 06/2022 | trabalho de parto prematuro |
| Guia de Vigilância em Saúde 6ª ed. rev. v.1 | 2024 | líquor nas meningites virais |
| RIPSA, Indicadores básicos para a saúde | 2008 | mortalidade infantil e proporcional |
| Manual Técnico de Diagnóstico das Hepatites Virais | 2018 | marcadores do HBV |
| SISVAN, Orientações antropométricas | 2011 | IMC do adolescente (Quadro 15) |
| PMC8156826 (sensibilidade, especificidade, VP) | 2021 | testes diagnósticos |

## 5. Mapa: o que já tem reposição

Arquivo → originais (dos quais 46 ativas e 1 em rascunho). `npm run reposicoes -- feitas` dá a lista viva.

- `reposicoes-amrigs-2021`: amrigs2021-001 (**rascunho**, aguarda AHA 2025).
- `reposicoes-rotavirus`: amrigs2021-072, scmsp2021-060, unifesp2025-083, usp2023-094.
- `reposicoes-colo-e-lei`: tp20202-090, tp20232-095, tp20251-097, tp20261-030 (rastreamento de rotina; o fluxo de conduta do exame alterado **não** foi lido) e famema2021-051 (Lei 14.443; texto lido pela Nota Técnica do Ministério).
- `reposicoes-clinicas-1/2/3`: sirio2021-065, tp20212-035, tp20212-019, tp20231-087; iamspe2023-043, scmsp2023-086; tp20222-028, sirio2021-074.
- `reposicoes-gina-1`: unesp2024-051, sessp2023-034.
- `reposicoes-pcdt-1/2/3/4`: sessp2023-098, fmabc2025-042; scmsp2023-073; iamspe2021-003, fmabc2026-006, unifesp2023-034, scmsp2022-082; amrigs2022-014, famerp2025-061, fmabc2026-059.
- `reposicoes-sbd-1`: scmsp2023-079, unesp2021-024. `reposicoes-sbc-1`: unifesp2025-025.
- `reposicoes-vacinas-1`: famerp2025-054, fmabc2025-099, iamspe2026-076.
- `reposicoes-epidemiologia-1`: fmabc2023-086, einstein2024-072, einstein2024-073, amrigs2025-096, amrigs2020-087.
- `reposicoes-imagens-1/2`: sessp2022-097, fmabc2021-027, einstein2025-044 (mantêm a imagem original).
- `reposicoes-ist-1`: scmsp2021-012, amrigs2020-053, unesp2021-026.

## 6. O que falta e por quê (priorizado)

Estado em 03/11/2026: **190** anuladas/desatualizadas de prova real, **47** com reposição, **143 pendentes** (20 dependem de imagem).

1. **Obstetrícia e ginecologia (≈ 24):** ferro na gestação (tp20202-091; Programa Nacional de Suplementação de Ferro, gov.br); doença hipertensiva em trabalho de parto (unifesp2026-055; manual de gestação de alto risco, bvsms); contracepção pós-parto (sirio2025-078; critérios da OMS); menopausa e terapia hormonal (4: famerp2025-026, scmsp2022-043, sirio2027-075, unifesp2023-048; Febrasgo, se abrir); Bishop (scmsp2022-060); fórcipe (iamspe2021-064); câncer de mama, endométrio, ovário e colo (amrigs2020-055, sirio2025-064, unifesp2026-053, unifesp2026-100 etc.).
2. **Estatística:** unifesp2022-052 (poder), scmsp2021-085 (caso-controle; duas alternativas idênticas), unifesp2023-032 (ética em ensaio clínico, resolução do CNS): dependem de fonte (`cochrane.org`/`bmj.com`) ou do texto da resolução.
3. **Vacinas em atraso:** usp2024-079, einstein2025-045: montar a tabela de atualização da IN 2026 (penta, rotavírus, pneumo, men C, SCR, hepatite A, febre amarela, influenza).
4. **Cardiologia (ESC):** endocardite (iamspe2023-016), TEP (einstein2025-011), valvopatia/profilaxia (usp2026-120): `escardio.org`.
5. **Dengue (fmabc2026-020):** o arquivo aberto no gov.br é a 5ª edição (2016); falta a 6ª (2024). **TB no recém-nascido (sessp2023-024):** falta o manual vigente. **HIV no recém-nascido (famema2021-095):** depende da atualização do protocolo (aleitamento).
6. **Imagem clínica (≈ 20):** ultrassom, ECG, radiografia, HSG, queimaduras, corpo estranho. Não fixar gabarito só por leitura da imagem: pedir laudo ou descrição a uma pessoa da equipe. Tabelas ilegíveis ou incoerentes (usprp2021-120, usprp2023-059) ficam de fora.
7. **Desatualizadas sem reposição:** as do Teste de Progresso de mama (tp20202-081; INCA PDF bloqueado), pulmão (tp20222-070) e dengue/NS1 (tp20222-117); as da UNESP já têm o gabarito pelo conteúdo e ficam no estudo com selo.

## 7. Armadilhas que já custaram tempo

- `texto-oficial` só mexia no sufixo do `www.gov.br`: o `bvsms` dava 404 até a correção (`urlDoArquivo`).
- O calendário atual traz **pneumocócica 20-valente** (a de 4 meses ainda 10-valente na transição), COVID-19 aos 6, 7 e 9 meses, meningocócica C aos 3 e 5 meses e **ACWY aos 12 meses**: questões antigas com "pneumo 10" ou "men C reforço" estão desatualizadas.
- Rotavírus: 1ª dose até 11m29d, 2ª até 23m29d; histórico de intussuscepção contraindica.
- Duas alternativas verdadeiras é o defeito mais comum das anuladas "sem motivo": procurar a segunda correta antes de escrever.
- Cálculo de epidemiologia: conferir a mão (as de Einstein 2024 tinham duas corretas e uma incoerência de unidade).
- Não repetir a leitura do que a seção 4 já lista; reler só se a edição mudou.

## 8. Rodada de 03–04/11/2026 (continuação) e o que mudou nas fontes

**Reposições novas (arquivo `dados/reposicoes-*.js`):** ferro na gestação (TP 2020.2 nº 91, manual do PNSF 2013); contracepção no pós-parto (Sírio 2025 nº 78, U.S. MEC 2024); climatério (Sírio 2027 nº 75, UNIFESP 2023 nº 48, NICE NG23); pré-eclâmpsia pré-termo (UNIFESP 2026 nº 55, NICE NG133); valvopatias na gestação (USP 2026 nº 120, Diretriz de Valvopatias 2026); fibrilação atrial (USP 2024 nº 55, Diretriz de FA 2025); HAS pediátrica (Sírio 2027 nº 41, Diretriz de HAS 2025); D-dímero (Santa Casa 2023 nº 99, Cochrane CD010864, só o resumo); asma em ≤ 5 anos (FAMERP 2026 nº 41, GINA 2026); vacinas do adolescente (Sírio 2023 nº 100, Calendário 2026); atraso constitucional do crescimento (USP-RP 2023 nº 59); NR-7 e NR-15 (FAMERP 2026 nº 8, AMRIGS 2021 nº 89); diverticulite (AMRIGS 2020 nº 39, WSES 2020); pancreatite (Santa Casa 2021 nº 34, UNICAMP 2022 nº 27, WSES 2019); queimadura (SES-SP 2023 nº 9, ABA 2024, só o resumo); colecistite na gestante (FMABC 2022 nº 35, SAGES 2024); ACERTO (SES-SP 2024 nº 28, jejum); rastreio da pré-eclâmpsia (Einstein 2026 nº 49, FIGO 2019). A reposição da IC (UNIFESP 2025 nº 25, `reposicoes-sbc-1`) passou para a diretriz de 2026 e PAS de 80 mmHg (na original, 90 era o limite entre vasodilatador e inotrópico).

**Novas fontes que abrem:** `abccardiol.org` (diretrizes da SBC em PDF: achar o artigo por `/wp-json/wp/v2/search?search=...`, abrir a página e pegar o link do `.pdf`), `ginasthma.org` (o PDF está na página `2026-gina-strategy-report`), `nice.org.uk`, `cdc.gov/mmwr` (PDF `-H.pdf` traz as tabelas), NR-7 e anexos da NR-15 em `gov.br/trabalho-e-emprego` (PDFs em `.../arquivos/normas-regulamentadoras/`), e o PMC pela ferramenta PubMed (WSES 2019 e 2020, SAGES 2024, FIGO 2019). **Seguem bloqueados:** `sbc.org.br`, `scielo.br`, `academic.oup.com` (ESC e Hum Reprod), `ahajournals.org`, `cochrane.org`, `bmj.com`, `iris.who.int` (abre vazio), `in.gov.br`, `aafp.org`, `europepmc.org`, `gdt.gradepro.org`, `escardio.org` (só índice).

**Busca no PubMed (ferramenta MCP):** consulta longa ou com `OR` entre siglas devolve zero ou lixo recente; funciona título exato ou 3 a 5 palavras. Confira título e autores em `get_article_metadata` antes de citar e **nunca chute PMCID** (um chute deu artigo de química). Texto grande vem salvo em arquivo: extraia trechos com python e diga na `referencias` que só parte foi lida. Esperar 2 s entre chamadas.

**Ficaram para trás, por falta de fonte lida:** vacinas em atraso (USP 2024 nº 79, Einstein 2025 nº 45: falta a tabela de atualização da IN 2026; prematuro IAMSPE 2022 nº 48); estatística (UNIFESP 2022 nº 52, 2023 nº 38, 2025 nº 43; Einstein 2023 nº 70; Santa Casa 2021 nº 85 e nº 92, 2023 nº 82; TP 2022.2 nº 117: manual de dengue); sangramento pós-menopausa e hiperplasia (FAMERP 2025 nº 26, Santa Casa 2022 nº 43: ESGO/ESHRE/ESGE, ACOG); ESC/AHA (Einstein 2025 nº 11 TEP, IAMSPE 2023 nº 16 endocardite, Einstein 2025 nº 31 PALS); puberdade precoce (AMRIGS 2024 nº 66); Factory Act (FAMERP 2026 nº 5) e a parte de notificação da AMRIGS 2021 nº 89; cirurgia (hérnia Santa Casa 2022 nº 18, queimaduras Santa Casa 2022 nº 13 e UNICAMP 2023 nº 27, osteoporose SES-SP 2023 nº 46, checklist de cirurgia segura, TOCE); AMRIGS 2020 nº 92 (T4 > 30 com TSH normal, sem resposta defensável). **Candidatas com fonte provável (NICE):** abortamento (USP 2023 nº 35, AMRIGS 2021 nº 44), indução do parto (Santa Casa 2022 nº 60).

## 9. Lições de processo (para não repetir)

- **O CI é o árbitro.** Em 03–04/11/2026 todo commit da branch ficou vermelho por um campo faltando numa reposição, e só foi visto ao abrir a PR. Em sessão sem Playwright, conferir o resultado do workflow `Testes` depois do push (não esperar a PR).
- **Memória fica no repositório, não na conversa.** O que se aprende (fonte que abre, armadilha, lista do que falta) entra nesta página no mesmo commit; a lista de pendentes é calculada por `npm run reposicoes`, sem cópia manual.
- Duas conversas em paralelo geraram duas ferramentas iguais (`reposicoes` e `reposicoes-pendentes`) e dois guias. Antes de criar ferramenta ou documento, `npm run mapa`/`git log origin/main` e procurar o que já existe.
- Citação (autores, volume, páginas) só com `get_article_metadata` aberto; nunca de memória.
