# Projeto: adequação das questões ao padrão + mapa de diretrizes

Iniciado em 13/11/2026. Dois objetivos: (1) todas as questões cumprirem o padrão de `dados/PADRAO-EXPLICACAO.md`; (2) saber, por diretriz, quais questões dependem dela, para atualizar tudo de uma vez quando chegar edição nova ou arquivo novo.

## Ferramenta

`npm run auditoria-padrao` (código em `ferramentas/auditoria-padrao.mjs`; não grava em `dados/`). Regera:

- `docs/ADEQUACAO-AO-PADRAO.md` — por arquivo: quantas questões já cumprem justificativa + referência datada e o que falta.
- `docs/MAPA-DE-DIRETRIZES.md` / `docs/mapa-de-diretrizes.json` — diretriz → questões (e quais citam edição superada).
- Consultas: `-- diretriz <texto>`, `-- prova <nome>`, `-- sem-diretriz`.

## Linha de base (13/11/2026, corrigida)

- 12.137 questões em 156 arquivos; **975 (8,0%)** cumprem forma + mecanismo/epidemiologia + referência datada.
- **Forma da justificativa (itens 1–4): ~100% ok** depois da fase 1 (restam 3 questões: a q-008 anulada do `banco-didatico` e 2 da parasitoses/outras com corpo curto). Antes da fase 1 eram 98,9%, com ~136 falhas concentradas no `banco-didatico`.
- **Conteúdo (itens 7 e 8, fisiopatologia e epidemiologia): só ~18,6% (2.260)** mencionam mecanismo **e** epidemiologia; ~7.800 não mencionam mecanismo e ~7.500 não mencionam epidemiologia (a fase 1 levou o `banco-didatico` de 0 a 134/135). É o maior trabalho do projeto. O conferidor oficial não checa isso; a medida é heurística por palavra-chave (`faltasDeConteudo`), útil para dimensionar, não para aprovar. Piores: `banco-didatico`, `tp-*`, `uspsp-simulado-*`, `unicamp-2024-dissertativa`, `usprp-2021` e os bancos didáticos de graduação (HIV, parasitoses, meningites, tuberculose).
- **Referência (linha de base inicial; os números de hoje saem de `npm run auditoria-padrao`):** 9.444 sem data de leitura, 137 vazias, 1.398 com nota fraca ("não aberto", "de memória"). O conferidor só cobra isso de questão criada desde 02/11/2026.
- Mapa: 39 diretrizes da tabela de edições (maior alcance: NCCN 150, ATS/IDSA 131, Calendário de Vacinação 112, SSC 104, GINA 95, colo do útero 92) + 17 famílias fora da tabela (maiores: livros-texto 2.607, MS/Conitec 2.547, pediatria 1.219).

## Andamento

- **Fase 1 concluída (13/11/2026), exceto q-008:** as 134 questões ativas do `banco-didatico` (q-001 a q-030, q-toce-01 a 30, q-card-01 a 30, q-inf-01 a 30, q-oft-01 a 15) foram reescritas no padrão completo (itens 1–8; cada errada em frase própria "X) Errada:"), com `justificativaEm: 2026-11`. Gabaritos, enunciados, alternativas e `explicacoesAlternativas` não foram alterados. A **q-008 está anulada** (gabarito B com status `anulada`): decidir com a equipe se volta à ativa ou é reposta antes de reescrever. `referencias` **não foi tocado** (continua vazio nas 135): as fontes não foram lidas, e a regra pede data de leitura (fase 3).
- **Fase 3, cinco rodadas (13/11/2026):** 56 das 135 questões do `banco-didatico` ganharam `referencias` com leitura datada do texto oficial (q-002, q-013, q-015, q-024, q-inf-14 a 18, q-inf-22, q-inf-23, q-inf-29, q-card-13 a 17, q-018, q-inf-12, q-inf-20, q-inf-21, q-inf-25, q-inf-26, q-card-18, q-card-19, q-card-30, q-014, q-toce-11 a 13, q-inf-08, q-inf-28, q-inf-30, q-card-02 a 04, q-card-06, q-card-07, q-card-09 a 12, q-card-21 a 27, q-inf-09, q-inf-10, q-003, q-007, q-010, q-016, q-017); o detalhe do que foi e do que não foi confirmado está em `docs/CONFERENCIA-DE-REFERENCIAS-NA-WEB.md` (seção da fase 3). Em 13/11/2026 a equipe aceitou **livro-texto como referência**: 45 questões (técnica operatória, oftalmologia, q-025, q-027, q-028) receberam a obra e a edição, conferidas em catálogo, **sem leitura do texto** (a auditoria as conta como "indicadas sem leitura", e não como lidas). Restam 34 sem nenhuma referência (lista por tema e estado da fonte em `docs/PENDENCIAS-DE-REFERENCIAS.md`, seção 6-B). Explicações corrigidas pela fonte: q-card-13 (MRPA 130/80), q-card-30 (metas de LDL < 50 e < 40), q-inf-12 (quimioprofilaxia em 24 h; ceftriaxona na gestante), q-inf-26 (tafenoquina) e q-toce-13 (janela de 120 min da OMS); com aviso por conflito com a diretriz brasileira vigente: q-card-09 (ICFEr < 50% na SBC 2026) e q-card-24 (atropina 0,5 mg na SBC 2019).
- **Epidemiologia e mecanismo foram escritos só de forma qualitativa**, sem números novos e sem citar fonte; um revisor da área deve conferir as afirmações antes de a fase 3 registrar referências.
- **Pontos que merecem atenção na revisão:** q-016 (status `desatualizada`; o limite de idade para descongestionantes varia por fonte), q-013 (icterícia neonatal; nomograma de Bhutani × limiares da AAP 2022), q-015 (calendário do PNI), q-023 (rastreamento do colo do útero: fluxo com HPV-DNA), q-024 (categorias de elegibilidade da OMS: 5ª edição, 6ª de 2025 por conferir), q-card-13 (limiar de pressão domiciliar: 130/80 na diretriz brasileira de 2020, 135/85 na europeia; a diretriz de 2025 está na tabela de edições), q-inf-03 (SSC 2026), q-011 (o enunciado não traz diferenciação nem budding), q-toce-13 (janela de 30 a 60 min).
- Correção da medida (13/11/2026): a heurística de mecanismo/epidemiologia não casava palavras acentuadas ("epidemiológico"); corrigido em `auditoria-padrao`.

## Fases

1. **Forma do `banco-didatico`:** feita (ver Andamento); resta decidir a q-008.
2. **Mecanismo + epidemiologia (~7.900 questões), por arquivo e por diretriz.** Reescrever a explicação no padrão (itens 7–8) via `npm run atualizar-dados`/lote. Fazer junto com a fase 4 da mesma diretriz: lê-se o texto oficial uma vez e corrigem-se explicação e referência de todas as questões dela. Número epidemiológico só com fonte em `referencias`.
3. **Referência vazia (137)** — `auditoria-padrao -- sem-diretriz`: achar a fonte primária e registrar.
4. **Referência datada, por diretriz, da mais citada para a menos** (`-- diretriz <nome>`): `npm run texto-oficial`, conferir, `npm run anotar-conferencia`. Prioridade: as "superadas". Cruzar com `docs/PENDENCIAS-DE-REFERENCIAS.md` (USP/UNIFESP).
5. **Promover famílias à tabela** (`ferramentas/edicoes-vigentes.json`): MS/Conitec, SBP, FEBRASGO, SBI… passam a ser detectadas como "superadas".
6. **Rotina quando chegar arquivo/edição nova:** `npm run auditoria-padrao -- diretriz <nome>` → revisar as questões → acrescentar a edição à tabela → `npm run referencias-a-conferir` → regerar a auditoria → `npm run publicar`.

## Limites conhecidos

- O agrupamento por diretriz é por palavra-chave da referência (tabela de edições + famílias de `referencias-a-conferir`): serve para achar candidatas, não prova dependência. Questão sem referência clara cai em "livros-texto e outras fontes".
- A medida de mecanismo/epidemiologia é por palavra-chave: pode errar nos dois sentidos. Antes de dar uma questão por adequada, leia a explicação.
- "Referência datada" é a regra formal (há uma data DD/MM/AAAA); não garante que o texto da diretriz tenha sido lido — `docs/PENDENCIAS-DE-REFERENCIAS.md` trata dessa diferença.
- Os documentos gerados envelhecem: rode `npm run auditoria-padrao` depois de cada rodada de conferência.
