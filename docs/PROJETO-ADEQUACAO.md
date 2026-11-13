# Projeto: adequação das questões ao padrão + mapa de diretrizes

Iniciado em 13/11/2026. Dois objetivos: (1) todas as questões cumprirem o padrão de `dados/PADRAO-EXPLICACAO.md`; (2) saber, por diretriz, quais questões dependem dela, para atualizar tudo de uma vez quando chegar edição nova ou arquivo novo.

## Ferramenta

`npm run auditoria-padrao` (código em `ferramentas/auditoria-padrao.mjs`; não grava em `dados/`). Regera:

- `docs/ADEQUACAO-AO-PADRAO.md` — por arquivo: quantas questões já cumprem justificativa + referência datada e o que falta.
- `docs/MAPA-DE-DIRETRIZES.md` / `docs/mapa-de-diretrizes.json` — diretriz → questões (e quais citam edição superada).
- Consultas: `-- diretriz <texto>`, `-- prova <nome>`, `-- sem-diretriz`.

## Linha de base (13/11/2026, corrigida)

- 12.137 questões em 156 arquivos; **975 (8,0%)** cumprem forma + mecanismo/epidemiologia + referência datada.
- **Forma da justificativa (itens 1–4): 98,9% ok.** Faltam ~136, quase todas no `banco-didatico` (sem destaque `**`, sem "Dicas do enunciado", alternativas erradas sem motivo).
- **Conteúdo (itens 7 e 8, fisiopatologia e epidemiologia): só ~17,6% (2.140)** mencionam mecanismo **e** epidemiologia; ~7.900 não mencionam mecanismo e ~7.600 não mencionam epidemiologia. É o maior trabalho do projeto. O conferidor oficial não checa isso; a medida é heurística por palavra-chave (`faltasDeConteudo`), útil para dimensionar, não para aprovar. Piores: `banco-didatico`, `tp-*`, `uspsp-simulado-*`, `unicamp-2024-dissertativa`, `usprp-2021` e os bancos didáticos de graduação (HIV, parasitoses, meningites, tuberculose).
- **Referência:** 9.444 sem data de leitura, 137 vazias, 1.398 com nota fraca ("não aberto", "de memória"). O conferidor só cobra isso de questão criada desde 02/11/2026.
- Mapa: 39 diretrizes da tabela de edições (maior alcance: NCCN 150, ATS/IDSA 131, Calendário de Vacinação 112, SSC 104, GINA 95, colo do útero 92) + 17 famílias fora da tabela (maiores: livros-texto 2.607, MS/Conitec 2.547, pediatria 1.219).

## Andamento

- **Fase 1, lote-piloto (13/11/2026):** `banco-didatico` q-001 a q-015 reescritas no padrão completo (itens 1–8; cada errada em frase própria "X) Errada:"), exceto a **q-008, que está anulada** (gabarito B com status `anulada`: decidir com a equipe se volta à ativa ou é reposta antes de reescrever). `referencias` **não foi tocado** (continua vazio): não li as fontes, e a regra pede data de leitura. Pendem **120 questões** do `banco-didatico`.
- Pontos a conferir na revisão do lote: q-015 (calendário do PNI muda; checar a versão vigente), q-013 (a explicação cita o nomograma de Bhutani e avisa que a AAP 2022 usa limiares por idade gestacional e fator de risco), q-011 (o enunciado não traz diferenciação nem budding; a explicação diz que assume baixo risco).
- Correção da medida (13/11/2026): a heurística de mecanismo/epidemiologia não casava palavras acentuadas ("epidemiológico"); corrigido em `auditoria-padrao`.

## Fases

1. **Forma do `banco-didatico` (135 questões):** destaque, Dicas do enunciado e motivo de cada errada (itens 1–4).
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
