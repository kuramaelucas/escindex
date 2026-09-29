# Pendências do banco de questões

Situação em 29/09/2026: 2.993 questões, das quais 2.858 reais, de 28 provas.
Estão divididas em quatro grupos, do mais urgente ao que só completa o que já funciona.

A lista de figuras se atualiza sozinha com `npm run conferir`.
Este arquivo é a foto do dia; ao resolver um item, apague-o daqui.

---

## 1. Provas ou questões que faltam

| Prova | O que falta | Como resolver |
| --- | --- | --- |
| **AMRIGS 2021** | A prova inteira. Veio só o edital de gabaritos definitivos, sem o caderno de questões | Enviar o caderno da prova 02/2021 (14/11/2021). O gabarito já está em mãos: anuladas 1, 40, 44, 54, 56, 68 e 89 |
| **IAMSPE 2023** | A prova inteira. Veio só o gabarito definitivo (Edital 001/2022, 28/12/2022), junto com o caderno de 2022 | Enviar o caderno do processo seletivo 2023 (aplicado no fim de 2022). Gabarito já em mãos, questões 1 a 80: `DCBEDACBDB EECXDXEBAD AAXBXADAEC EDDCEEDABB ACXDCABDDB BAECBDACAD BEBECDEDCA CXDCDEADBA` (X = anulada: 14, 16, 23, 25, 43 e 72; a 32 foi alterada para D) |
| **USP-RP 2021, questão 7** | A questão inteira. O PDF usado pula da 6 para a 8 | Transcrever do caderno oficial de 2021. Ao incluí-la, tirar a linha `"USP-RP (FMRP) 2021": [7]` de `LACUNAS_CONHECIDAS`, em `testes/conferir-dados.mjs` |

## 2. Texto incompleto

Todas estas questões são da USP-RP e vieram de PDFs comentados que chegaram cortados.
O caderno oficial de cada ano resolve.

| Prova | Questão | O que falta |
| --- | --- | --- |
| USP-RP 2021 | 74 | Final da alternativa D ("Passagem de dreno pleural tipo…") |
| USP-RP 2021 | 78 | Final das alternativas A e B ("…cânula plástica com…") |
| USP-RP 2021 | 93 | Final da alternativa C ("Indicar o uso de calçado tipo…") |
| USP-RP 2022 | 19 | Descrição da lesão da região da fralda, cortada no meio do enunciado |
| USP-RP 2022 | 75 | Trecho do exame físico ("consciente, … difusos") |
| USP-RP 2022 | 8 e 23 | A pergunta final não veio no PDF e foi completada pela equipe. Conferir no caderno |
| USP-RP 2025 | **99** | O caso clínico inteiro. A questão está como **rascunho**, fora do estudo e das provas antigas, até ser transcrita |

Os trechos cortados aparecem marcados no próprio texto como "[texto incompleto no material de origem]".

## 3. Gabaritos para conferir

### IAMSPE 2022: gabarito da equipe, falta a folha oficial

O gabarito enviado com o caderno era o do ano seguinte e não bate com a prova (ver `docs/HISTORICO.md`, 29/09).
As 80 questões de `dados/prova-iamspe-2022.js` estão com o gabarito resolvido pela equipe, e cada explicação termina avisando isso.
Nenhuma está marcada como anulada. Com o gabarito definitivo oficial de 2022 (Quadrix, Edital 001/2021) em mãos:
corrigir as letras que divergirem (e a explicação delas), marcar as anuladas e apagar o aviso do fim de cada explicação.
Nestas, a própria equipe viu mais de uma alternativa defensável:

| Questão | Ponto de dúvida |
| --- | --- |
| 2022-3 | Cateterismo (E) pela suspeita de insuficiência cardíaca isquêmica; o ultrassom pulmonar (C) confirma a congestão |
| 2022-8 | A mamografia aos 67 anos (A) também está na faixa de rastreamento do Ministério da Saúde |
| 2022-18 | Tumor periampular pelo sinal do duplo ducto (A); a afirmação sobre o CA 19-9 (E) também é verdadeira |
| 2022-20 | Colangiografia intraoperatória: avaliar obstrução (A) ou prevenir lesão da via biliar (C) |
| 2022-32 | Quantas medicações suspender depende do AAS e da semaglutida (três, na resposta da equipe) |
| 2022-36 | Aleitamento exclusivo até 6 meses (A) e contato pele a pele (E) |
| 2022-54 | Fatores de risco de câncer de endométrio: B, mas C traz fatores de associação fraca |
| 2022-68 | Atestado para esportes: D, mas B (exames complementares) é discutível |

### UNESP 2023: gabarito da edição usada, não da folha oficial

Conferir as 100 questões contra o gabarito definitivo da banca e marcar as anuladas (a edição não informa nenhuma).
A explicação já avisa onde a alternativa dada como certa tem imprecisão: 2023-8 (a adrenalina intramuscular é a de 1:1.000, não 1:10.000) e 2023-59 (tratamento do HIV "na fase de contágio").

### USP-RP 2021 a 2025: gabarito vindo do PDF comentado, não da folha oficial

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

### AMRIGS 2022 a 2025: gabarito definitivo oficial, mas discutível pela literatura

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

## 4. Figuras para anexar (233)

É só recortar do caderno oficial e salvar em `dados/imagens/` com o nome indicado.
Depois, apague a linha `imagemPendente` da questão no arquivo `dados/prova-*.js`: enquanto ela existir, a questão fica fora do estudo dos alunos (`npm run conferir` avisa quando a figura já chegou e a linha ficou para trás).
Pela plataforma: **Questões para Atualizar › Enviar a figura** libera a questão na hora (com a nuvem, para toda a turma), e **Baixar as atualizações** + `npm run atualizar-dados -- arquivo.json` traz as figuras e os consertos para cá.
O nome exato de cada arquivo e a descrição do que a prova mostrava estão em `dados/imagens/LEIA-ME.md`.
As provas da AMRIGS (2022 a 2025), a USP-RP 2026, as do IAMSPE (2021 e 2022) e a UNESP 2023 já têm todas as figuras.

| Prova | Qtd | Questões |
| --- | --- | --- |
| USP-RP 2021 | 44 | 15–17, 19, 24, 27, 31, 38, 43, 46, 47, 53, 55, 56, 59, 62, 63, 65–68, 76, 77, 79, 82–86, 88, 89, 92, 95, 97, 99–102, 106, 108, 109, 115, 116, 119 |
| USP-RP 2022 | 32 | 4, 5, 7, 10, 17, 19, 21, 23, 25, 26, 30, 33, 38, 40, 47, 50, 51, 56, 60, 62, 66, 69–71, 73, 77, 80, 89, 90, 93, 94, 98 |
| USP-RP 2023 | 32 | 5–7, 12, 14, 21, 26, 27, 32, 37, 42, 43, 50, 53, 58–62, 65, 70, 71, 73, 77, 79, 80, 82, 84, 86, 87, 95, 100 |
| USP-RP 2024 | 25 | 2, 4, 10, 11, 19, 21, 22, 24, 31, 34, 35, 38, 41, 42, 44, 63, 68, 76, 78, 80, 82, 83, 89, 93, 96 |
| USP-RP 2025 | 25 | 5, 8, 12, 19, 23, 35–38, 43–45, 47, 53, 54, 56, 60–62, 64, 72, 74, 79, 80, 97 |
| USP-SP 2023 | 29 | 30, 56, 61, 73, 77–79, 81–83, 85–88, 95, 97, 98, 102, 104–106, 112–117, 119, 120 |
| USP-SP 2026 | 1 | 63 |
| Santa Casa 2022 | 6 | 11, 13, 23, 25, 54, 56 |
| Santa Casa 2023 | 9 | 10, 15, 17–19, 45, 49, 75, 76 |
| Santa Casa 2025 | 5 | 38, 40, 44, 63, 64 |
| Santa Casa 2026 | 12 | 10, 17, 21, 23, 29, 33–36, 39, 40, 42 |
| UNIFESP 2022 | 3 | 46, 48, 81 |
| UNIFESP 2023 | 1 | 23 |
| UNIFESP 2024 | 2 | 45, 47 |
| UNIFESP 2025 | 1 | 53 |
| UNIFESP 2026 | 6 | 33, 36, 40, 60, 61, 74 |

Quando a figura chegar, vale reler a explicação.
Ela foi escrita a partir do texto e do gabarito, sem ver a imagem.
Isso pesa principalmente nas questões cujas alternativas só fazem sentido com a figura:

- USP-RP 2021-97 (fonogramas)
- USP-RP 2023-65 (esquema do néfron)
- USP-RP 2024-42 (fonogramas)
- USP-RP 2025-60 (figuras 1 a 4)
- USP-RP 2025-61 (imagens A a D)

### Os cadernos que resolvem quase tudo de uma vez

- **USP-RP 2021, 2022, 2023, 2024 e 2025**, cadernos oficiais com a folha de gabarito.
  Resolvem 158 figuras, os textos incompletos, a questão 7 de 2021, a 2025-99 e a conferência dos gabaritos.
- **USP-SP 2023**: 29 figuras.
- **Santa Casa 2022, 2023, 2025 e 2026**: 32 figuras.
- **UNIFESP 2022 a 2026**: 13 figuras.
- **AMRIGS 2021**: a prova inteira.
- **IAMSPE 2022**: o gabarito definitivo oficial (Edital 001/2021).
- **IAMSPE 2023**: o caderno (o gabarito já está aqui).
- **UNESP 2023**: o gabarito definitivo oficial.
