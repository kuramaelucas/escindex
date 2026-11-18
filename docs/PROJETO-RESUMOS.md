# Projeto: resumos adaptativos de todo o banco

Iniciado em 18/11/2026. O formato e as condições de criação estão em `resumos/LEIA-ME.md`. Este documento traz o **plano**: a ordem dos resumos, a previsão de quantos serão, como marcar o que depende de diretriz e o andamento.

## 1. Decisão: escrever agora e atualizar por fragmento

Não se espera diretriz nova para escrever um resumo. O motivo é o custo:
- A maior parte de um resumo não muda com diretriz: fisiopatologia, epidemiologia, quadro clínico e armadilhas. Isso só se escreve uma vez.
- O que muda (conduta, ponto de corte, dose, esquema) fica em **seções próprias**, marcadas com a diretriz de que dependem (seção 4). Quando sai uma edição nova, edita-se só essas seções.

Exceção: um tema com edição nova **já anunciada** para os próximos meses vai para o fim da fila do seu bloco.

## 2. Previsão de quantos resumos

Estado do banco em 18/11/2026 (`npm run dados -- resumo-assuntos`): 237 assuntos e 9.305 questões reais.

| Faixa de questões reais por assunto | Assuntos | Destino |
|---|---|---|
| ≥ 40 | 92 | um resumo cada |
| 15–39 | 96 | resumo próprio ou agrupado com assunto vizinho (≈ 2 por resumo) |
| < 15 | 49 | agrupados no resumo do assunto vizinho, ou `foraDoEscopo` até ter questões |

**Previsão: cerca de 150 resumos** no banco inteiro (92 + ≈ 50 agrupados + ajustes). Prontos: 13 (`exantematicas`, `puericultura`, `calendario-vacinal`, `pneumonia-bronquiolite`, `crescimento-puberdade`, `emergencias-respiratorias-pcr`, `diarreia-desidratacao`, `infeccoes-congenitas`, `reanimacao-neonatal`, `vias-aereas-superiores`, `ictericia-neonatal`, `triagem-neonatal`, `insuficiencia-cardiaca`).

Na **pediatria** (25 assuntos de Neonatologia, Crescimento e Desenvolvimento, Infectologia Pediátrica e Emergências Pediátricas) a previsão é de **cerca de 20 resumos**.

## 3. Ordem: os 10 assuntos de pediatria que mais caem

A ordem segue o número de questões reais. Os prontos ficam na lista para entrar a tabela comparativa (seção 5) e a marcação de diretrizes (seção 4).

| # | Assunto | Questões reais | Tema (pasta) | Situação | Diretrizes de que depende (a conferir na escrita) |
|---|---|---|---|---|---|
| 1 | `ass-puericultura` | 146 | `puericultura` | pronto; diretrizes marcadas | curvas da OMS, SBP (aleitamento, suplementação de ferro e vitaminas), Caderneta da Criança |
| 2 | `ass-calendariovacinal` | 93 | `calendario-vacinal` | pronto (fontes a ler) | Calendário Nacional do PNI (muda todo ano), SBP/SBIm |
| 3 | `ass-infectoped-pneumonia` | 71 | `pneumonia-bronquiolite` | pronto (fontes a ler), com coqueluche | SBP, OMS (AIDPI), AAP (bronquiolite), profilaxia do VSR (nirsevimabe/palivizumabe) |
| 4 | `ass-crescimentopuberdade` | 66 | `crescimento-puberdade` | pronto (fontes a ler) | estágios de Tanner (estável), SBEM/SBP (puberdade precoce) |
| 5 | `ass-emergped-respiratoria` | 64 | `emergencias-respiratorias-pcr` | pronto (fontes a ler) | AHA PALS (suporte avançado de vida pediátrico), GINA (crise de asma) |
| 6 | `ass-exantematicas` | 60 | `exantematicas` | pronto, com tabela comparativa; falta coqueluche | Guia de Vigilância do MS, AHA Kawasaki 2024, PNI |
| 7 | `ass-dda` | 59 | `diarreia-desidratacao` | pronto (fontes a ler) | OMS/MS (planos A, B e C de hidratação, zinco) |
| 8 | `ass-neo-infeccoescongenitas` | 56 | `infeccoes-congenitas` | pronto (fontes a ler) | PCDT de transmissão vertical do MS (sífilis, HIV, hepatites), toxoplasmose congênita, RN exposto à tuberculose |
| 9 | `ass-reanimacao` | 52 | `reanimacao-neonatal` | pronto (fontes a ler) | SBP Reanimação Neonatal, ILCOR/AHA |
| 10 | `ass-ivas` | 46 | `vias-aereas-superiores` | pronto (fontes a ler) | SBP/AAP (otite média aguda), IDSA (faringite), SBORL (sinusite) |

**Bloco seguinte da pediatria:** icterícia neonatal (45; AAP 2022), triagem neonatal (43; PNTN do MS), abdome agudo do RN (41), maus-tratos (27), convulsão febril (27), prematuridade (25), desconforto respiratório do RN (23), exame do RN (20), corpo estranho (18), transmissão vertical do HIV (16; se não entrar em infecções congênitas), sepse neonatal (15), intussuscepção e Meckel (11) e febre sem foco (11), estes dois agrupados com emergências.

**Coqueluche** está hoje em `foraDoEscopo` de `exantematicas`. Decidido na escrita de `calendario-vacinal`: entra como capítulo de `pneumonia-bronquiolite` (tosse do lactente); o calendário cobre só a dTpa da gestante.

## 4. Mapeamento: o que foi usado e o que muda com diretriz

Hoje o resumo guarda `fontes` só no nível do resumo. Para a atualização ser cirúrgica, cada seção precisa dizer de que diretriz depende.

**Formato (passa a valer para resumo novo):**
- Em `fontes`, cada item ganha `id`. Quando a fonte está em `ferramentas/edicoes-vigentes.json`, usa-se o mesmo id. Exemplo: `{ id: "pni-calendario", texto: "…", edicao: "2026", lidoEm: "2026-11-20" }`.
- Cada seção (`fragmento`) que depende de diretriz ganha `diretrizes: ["pni-calendario"]`. Seção de fisiopatologia, epidemiologia ou quadro clínico não leva o campo: não muda com diretriz.
- Regra de escrita: **conduta, ponto de corte, dose e esquema ficam em seção própria**, separados do mecanismo, para que a troca não toque no resto.

**Ferramenta (fase 0, código em `ferramentas/`, não em `codigo/`):**
1. `npm run resumo -- <tema>` passa a recusar seção com `diretrizes` cujo id não está em `fontes`, e a listar as seções por diretriz.
2. `npm run auditoria-padrao -- diretriz <nome>` passa a listar, além das questões, **os resumos e as seções** que dependem daquela diretriz. Também acrescenta uma tabela "Resumos" em `docs/MAPA-DE-DIRETRIZES.md`.
3. Edição nova de uma diretriz: atualiza-se `edicoes-vigentes.json`, roda-se o comando do item 2, editam-se só as seções listadas e renova-se o `lidoEm` da fonte.

Os 3 resumos prontos recebem `id` nas fontes e `diretrizes` nas seções de conduta. Os ids de seção **não mudam**, porque os destaques dos alunos dependem deles.

## 5. Tabela comparativa no fim dos temas de doenças parecidas

Quando o resumo reúne doenças que a banca faz o aluno diferenciar, o **último capítulo** é uma tabela comparativa. Ela vem no fim porque só resume o que os capítulos já explicaram e não traz dado novo.

- Formato: capítulo `id: "comparativo"`, título "Tabela comparativa". A tabela fica em `prosa`, em Markdown de tabela, se `09e` já desenhar tabela; senão, fase 0 acrescenta o suporte em `09e-resumos.js` (zona A4) e um teste em `testes/resumos.test.mjs`.
- O capítulo também leva `questoes` com as questões de diferencial, para entrar na marcação pelo erro.
- **Exantemáticas** (primeira): sarampo, rubéola, eritema infeccioso, exantema súbito, varicela, escarlatina, mão-pé-boca, Kawasaki e mononucleose. Colunas: agente, idade típica, pródromo, início e progressão do exantema, tipo de lesão, sinal patognomônico, complicação clássica, isolamento ou notificação, prevenção.
- Outros temas com tabela: infecções congênitas (TORCHS), desconforto respiratório do RN (TTRN × doença da membrana hialina × aspiração de mecônio × pneumonia), vias aéreas superiores (crupe × epiglotite × traqueíte bacteriana), diarreia (graus de desidratação), icterícia (fisiológica × patológica).

## 6. Como trabalhar cada resumo (economia de tokens)

1. `npm run resumo -- <tema>` ou `npm run dados -- taxonomia <palavra>`: lista as questões do assunto. Leia questões por id (`npm run dados -- <q-id>`), nunca a prova inteira.
2. Agrupe as questões por conceito; os grupos viram capítulos e seções. Questão que fica de fora vai para `foraDoEscopo` com o motivo.
3. Leia o texto oficial das diretrizes de conduta (`npm run texto-oficial`). Anote a data em `lidoEm` e a edição.
4. Escreva seguindo o LEIA-ME, com `diretrizes` nas seções de conduta e a tabela comparativa no fim, quando couber.
5. `npm run resumo -- <tema>`, `npm run publicar` e `npm run testar-mudanca`. Atualize a tabela da seção 3 e a do LEIA-ME.

**Um resumo por sessão**, e o commit sai ao final de cada um.

## 7. Andamento

| Data | Feito |
|---|---|
| 18/11/2026 | projeto aberto; plano, previsão e ordem da pediatria |
| 18/11/2026 | **fase 0 feita.** Fontes com `id` e seções de conduta com `diretrizes` nos 3 resumos (exantemáticas: 7 seções; puericultura: 12; IC: 8; ids de seção mantidos). `ferramentas/lib-resumos.mjs` lê os resumos; `npm run resumo` recusa fonte sem id, id repetido e diretriz fora de `fontes`, e lista as seções por diretriz; `npm run auditoria-padrao -- diretriz <x>` lista também as seções de resumos (casa pelo id da tabela, id ou texto da fonte) e o `MAPA-DE-DIRETRIZES.md` ganhou a tabela "Resumos". Tela (`09e`): parágrafo da prosa em Markdown de tabela vira `<table>` rolável, com cada célula destacável; seção com `diretrizes` mostra "Conduta conforme: …". Exantemáticas ganhou o capítulo final `comparativo` (9 doenças × 9 colunas, `conferir: true`). Teste em `testes/resumos.test.mjs`. Próximo: `calendario-vacinal`. |
| 18/11/2026 | **`calendario-vacinal` escrito**: 6 capítulos, 17 seções, 95 de 108 questões (13 fora: anuladas e desatualizadas com reposição); todas as seções de calendário com `diretrizes`; seção "Para decorar" com mnemônicos autorais e figura do primeiro ano; 4 casos ilustrados. Pendências: ler a Instrução Normativa 2026 (reforço de pólio aos 4 anos diverge entre as leituras anotadas nas questões) e datar `lidoEm`. Coqueluche vai para `pneumonia-bronquiolite`, que é o próximo. |
| 18/11/2026 | **`pneumonia-bronquiolite` escrito**: 6 capítulos, 14 seções; 75 das 77 questões do assunto + as 7 de coqueluche que estavam fora de exantemáticas (fora: 1 escarlatina, 1 anulada). Bronquiolite, PAC (diagnóstico, agentes, ambulatorial, grave), derrame/empiema e necrosante, Mycoplasma e Chlamydia, coqueluche, Löffler/aspiração e tabela comparativa no fim; 11 casos ilustrados; mnemônicos ("O2, água e nariz", lactente "CAT", "Mycoplasma anda"). Pendente: ler as fontes e datar `lidoEm`. Próximo: `crescimento-puberdade`. |
| 18/11/2026 | **`crescimento-puberdade` escrito**: 6 capítulos, 11 seções, 69 de 72 questões (3 anuladas fora). Avaliação do crescimento (velocidade, canal, alvo, idade óssea), baixa estatura (tabela familiar × constitucional; causas patológicas), Tanner e sequência puberal, variantes benignas, puberdade precoce central e periférica, IMC e obesidade; 5 casos ilustrados. Mnemônicos deixam de ser prioridade (pedido do usuário). Pendente: ler as fontes. Próximo: `emergencias-respiratorias-pcr`. |
| 18/11/2026 | **`emergencias-respiratorias-pcr` escrito**: 4 capítulos, 9 seções, 66 de 67 questões (1 anulada fora). Reconhecer e ventilar, intubação e epiglotite, PARDS; crise de asma (GINA); PCR (básico, chocáveis, não chocáveis, drogas e vias); trauma (choque, pneumotórax, HIC) e TSV/crise hipoxêmica; 9 casos ilustrados. As questões seguem a AHA 2020; a vigente é a 2025 (`edicoes-vigentes.json`): conferir o que mudou ao ler a fonte. Próximo: `diarreia-desidratacao`. |
| 18/11/2026 | **`diarreia-desidratacao` escrito**: 5 capítulos, 10 seções, 62 de 65 questões (3 anuladas fora). Mecanismos (secretora, osmótica, inflamatória), classificação da hidratação, planos A, B e C, zinco, antieméticos, disenteria e SHU, hipernatremia e potássio, Holliday e soro de manutenção. Pendente: as provas divergem na fase rápida do plano C (OMS 30 + 70 mL/kg × SF 30 mL/kg em 30 min): ler o cartaz vigente do MS. Próximo: `infeccoes-congenitas`. |
| 18/11/2026 | **`infeccoes-congenitas` escrito**: 5 capítulos, 9 seções, 62 de 63 questões (1 anulada fora). Sífilis (mãe adequadamente tratada, criança exposta, investigar e tratar), toxoplasmose (avidez, tratamento de 12 meses), CMV, rubéola, herpes, varicela, hepatite B, HTLV, RN exposto à tuberculose e tabela TORCHS no fim. Pendente: as provas divergem na profilaxia do RN exposto à TB (isoniazida 3 meses, Manual 2019 × rifampicina nas recentes): ler a nota técnica vigente. Próximo: `reanimacao-neonatal`. |
| 18/11/2026 | **Rodada de imagens**: +19 casos ilustrados do banco nos resumos (só figuras clínicas, curvas, traçados e radiografias; tabelas de referência ficaram de fora) e 4 esquemas autorais em SVG (planos A/B/C, conduta no RN de mãe com sífilis, ritmos da PCR, Tanner e estirão). Wikimedia devolveu 429 de novo: fotos externas seguem em `PENDENCIAS.md`, item 11. Regra para os próximos: cada resumo novo já sai com seus esquemas. |
| 18/11/2026 | **`reanimacao-neonatal` escrito**: 4 capítulos, 7 seções, 57 de 58 questões (1 anulada fora), com esquema autoral do fluxo do PRN e 2 casos. Transição e avaliação, clampeamento (tardio × imediato, mecônio, prematuro), passos iniciais, VPP (FiO2 21% × 30%), técnica e via aérea avançada, massagem 3:1 e adrenalina. Próximo: `vias-aereas-superiores`. |
| 18/11/2026 | **`vias-aereas-superiores` escrito**: 4 capítulos, 8 seções, 47 de 48 questões (1 desatualizada sem reposição fora). Resfriado e sintomáticos, influenza (oseltamivir no menor de 5 anos), faringite estreptocócica, mononucleose, PFAPA e abscessos, OMA, mastoidite, celulite orbitária, crupe × epiglotite × traqueíte (tabela e esquema). **Os 10 assuntos de pediatria da seção 3 estão prontos**; segue o bloco seguinte (icterícia neonatal primeiro). |
| 18/11/2026 | **`ictericia-neonatal` escrito** (bloco seguinte da pediatria): 5 capítulos, 8 seções, 48 de 49 questões (1 anulada fora), esquema autoral do metabolismo da bilirrubina e 3 casos. Fisiológica e do aleitamento, Kramer e nomograma, fatores de risco, ABO/Rh/G6PD, fototerapia, encefalopatia, colestase e atresia biliar. Próximo: triagem neonatal. |
| 18/11/2026 | **`triagem-neonatal` escrito**: 3 capítulos, 6 seções, 50 de 50 questões; esquema autoral do teste do coraçãozinho (regra da SBP e a antiga do MS) e 1 caso. Teste do pezinho (coleta, doenças, ampliação), hipotireoidismo, fenilcetonúria, fibrose cística, hiperplasia adrenal, galactosemia, G6PD, coraçãozinho, orelhinha e olhinho. `q-famerp2023-034` tem gabarito marcado como duvidoso pela equipe (pé com 89% dado como negativo): o texto ensina a regra e cita a divergência. Próximo: abdome agudo do RN. |
