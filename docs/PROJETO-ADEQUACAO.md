# Projeto: adequação das questões ao padrão + mapa de diretrizes

Iniciado em 13/11/2026. Dois objetivos: (1) todas as questões cumprirem o padrão de `dados/PADRAO-EXPLICACAO.md`; (2) saber, por diretriz, quais questões dependem dela, para atualizar tudo de uma vez quando chegar edição nova ou arquivo novo.

## Ferramenta

`npm run auditoria-padrao` (código em `ferramentas/auditoria-padrao.mjs`; não grava em `dados/`). Regera:

- `docs/ADEQUACAO-AO-PADRAO.md` — por arquivo: quantas questões já cumprem justificativa + referência datada e o que falta.
- `docs/MAPA-DE-DIRETRIZES.md` / `docs/mapa-de-diretrizes.json` — diretriz → questões (e quais citam edição superada).
- Consultas: `-- diretriz <texto>`, `-- prova <nome>`, `-- sem-diretriz`.

## Linha de base (13/11/2026)

- 12.137 questões em 156 arquivos; **1.157 (9,5%)** cumprem justificativa + referência datada.
- **Justificativa** quase toda no padrão: faltam ~136 questões, quase todas em `banco-didatico` (135: sem destaque `**`, sem "Dicas do enunciado", alternativas erradas sem motivo) e 1 em parasitoses.
- **Referência é o grande vão:** 9.444 sem data de leitura, 137 vazias, 1.398 com nota fraca ("não aberto", "de memória"). O conferidor oficial só cobra isso de questão criada desde 02/11/2026.
- Mapa: 39 diretrizes da tabela de edições (as de maior alcance: NCCN 150, ATS/IDSA 131, Calendário de Vacinação 112, SSC 104, GINA 95, colo do útero 92) + 17 famílias fora da tabela (maiores: livros-texto 2.607, MS/Conitec 2.547, pediatria 1.219).

## Fases

1. **Justificativa do `banco-didatico` (135 questões).** Reescrever no padrão (itens 1–8 de `PADRAO-EXPLICACAO.md`) via `npm run atualizar-dados`/lote; conferir com `auditoria-padrao -- prova didatico`.
2. **Referência vazia (137)** — `auditoria-padrao -- sem-diretriz`: achar a fonte primária e registrar.
3. **Referência com data, por diretriz, da mais citada para a menos** (usar `-- diretriz <nome>`): ler o texto oficial uma vez (`npm run texto-oficial`), conferir de uma só vez todas as questões da diretriz e anotar (`npm run anotar-conferencia`). Prioridade: as marcadas "superadas" (edição citada ≠ vigente). Cruzar com `docs/PENDENCIAS-DE-REFERENCIAS.md` (USP/UNIFESP).
4. **Promover famílias à tabela.** As famílias grandes (MS/Conitec, pediatria SBP, FEBRASGO, SBI…) ainda não têm edição vigente cadastrada; ao cadastrar em `ferramentas/edicoes-vigentes.json` elas passam a ser detectadas como "superadas" automaticamente.
5. **Rotina quando chegar arquivo/edição nova:** `npm run auditoria-padrao -- diretriz <nome>` → lista de questões → revisar → acrescentar a edição à tabela → `npm run referencias-a-conferir` → regerar `auditoria-padrao` e `npm run publicar`.

## Limites conhecidos

- O agrupamento por diretriz é por palavra-chave da referência (tabela de edições + famílias de `referencias-a-conferir`): serve para achar candidatas, não prova dependência. Questão sem referência clara cai em "livros-texto e outras fontes".
- "Referência datada" é a regra formal (há uma data DD/MM/AAAA); não garante que o texto da diretriz tenha sido lido — `docs/PENDENCIAS-DE-REFERENCIAS.md` trata dessa diferença.
- Os documentos gerados envelhecem: rode `npm run auditoria-padrao` depois de cada rodada de conferência.
