/* resumos/hipertensao/resumo.js — resumo adaptativo de hipertensão arterial: medida e diagnóstico
   (consultório, MAPA, MRPA, avental branco e mascarada), avaliação inicial e risco, tratamento
   (estilo de vida, classes, efeitos adversos, populações especiais), hipertensão resistente,
   hipertensão secundária, crises hipertensivas, hipertensão na criança e tabela comparativa no fim.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- hipertensao */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "hipertensao",
  titulo: "Hipertensão arterial",
  assunto: "ass-has",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "sbc-has", texto: "Diretriz Brasileira de Hipertensão Arterial 2025 (SBC, SBN, SBH)", lidoEm: null },
    { id: "esc-has", texto: "ESC — Guidelines for the management of elevated blood pressure and hypertension, 2024", lidoEm: null },
    { id: "aap-pa-ped", texto: "AAP — Clinical Practice Guideline for Screening and Management of High Blood Pressure in Children and Adolescents (Flynn et al., 2017)", lidoEm: null },
    { id: "sbd", texto: "Sociedade Brasileira de Diabetes — Diretriz Oficial (hipertensão no diabetes)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas com reposição; as reposições (-ia) entram no resumo", questoes: ["q-iamspe2021-003","q-sessp2022-097","q-sirio2027-041","q-fmabc2026-006"] },
    { motivo: "anulada, sem reposição", questoes: ["q-amrigs2020-092"] },
    { motivo: "fora do tema (síndrome da veia cava superior; vacina contra covid-19)", questoes: ["q-sessp2022-015","q-sirio2023-085"] },
  ],
  doencas: [
    {
      id: "diagnostico", titulo: "Medida da pressão e diagnóstico",
      introducao: `[[A hipertensão é a elevação persistente da pressão arterial — no consultório, ≥ 140/90 mmHg em duas ou mais consultas; na MAPA, média de 24 horas ≥ 130/80 —, e o risco de AVC, infarto, insuficiência cardíaca e doença renal sobe de forma contínua a partir de 115/75.|q-card-13,q-tp20251-002,q-fmabc2026-006-ia]] [[A medida erra por técnica: manguito pequeno superestima a pressão, o estetoscópio sob o manguito a altera, e a fala, a bexiga cheia e o fumo antes da medida também.|q-usp2026-017,q-amrigs2025-004,q-unesp2022-011]]

[[A medida fora do consultório separa quatro situações: hipertensão verdadeira, avental branco (alta só no consultório, pelo alerta), mascarada (normal no consultório e alta fora dele, comum no fumante, estressado e obeso) e normotensão.|q-card-14,q-unifesp2024-029,q-adap24-020,q-unesp2024-056]]`,
      fragmentos: [
        { id: "dia-medida", titulo: "Técnica da medida e rastreio", conferir: true, diretrizes: ["sbc-has"],
          questoes: ["q-usp2026-017","q-amrigs2025-004","q-unesp2022-011","q-famema2023-011","q-amrigs2024-001","q-einstein2024-069"],
          texto: `- PA alta na triagem do obeso: primeiro **checar o tamanho do manguito**. {q-usp2026-017}
- Manguito pequeno **superestima**; nas artérias distais, a sistólica sobe e a diastólica cai. {q-amrigs2025-004}
- **Estetoscópio sob o manguito** altera a medida. {q-unesp2022-011}
- Todo adulto sem registro recente: **medir a PA** em qualquer ida à UBS. {q-famema2023-011}
- PA normal: medir **anualmente**; pré-eclâmpsia prévia é **fator de risco** de hipertensão. {q-amrigs2024-001}
- Diagnóstico: confirmar com **medidas repetidas** ou fora do consultório, não por sintoma. {q-einstein2024-069}` },
        { id: "dia-mapa", titulo: "Diagnóstico, MAPA, avental branco e mascarada", conferir: true, diretrizes: ["sbc-has"],
          casos: ["q-adap24-020"],
          questoes: ["q-card-13","q-card-14","q-unifesp2024-029","q-usprp2025-074","q-adap24-020","q-unesp2024-056","q-tp20251-002","q-fmabc2026-006-ia","q-famema2021-028","q-uspsp1-103","q-uspsp3-017","q-usp2022-025","q-famerp2024-070"],
          prosa: `[[A MAPA também mostra o descenso noturno, que normalmente é de 10 a 20%; a ausência dele indica mais risco.|q-unifesp2024-029]] **A diretriz de 2025 mudou a nomenclatura:** valores de 120–139/80–89 passam a ser **pré-hipertensão**, e o tratamento pode começar com ≥ 130/80 em quem tem risco alto. Gabaritos anteriores seguem a diretriz de 2020.`,
          texto: `- Hipertensão: **consultório ≥ 140/90**; **MAPA de 24 h ≥ 130/80**. {q-card-13}
- Consultório alto e MAPA normal: **avental branco** — estilo de vida e seguimento; pode liberar exercício. {q-card-14,q-unifesp2024-029,q-usprp2025-074}
- Consultório normal e MAPA ou MRPA altas: **mascarada**. {q-adap24-020,q-unesp2024-056}
- PA 160/100 confirmada em duas consultas: **hipertensão estágio 2**, tratar com duas classes. {q-tp20251-002}
- Primeira medida alta, sem lesão: **repetir em 1 a 4 semanas** e começar estilo de vida. {q-fmabc2026-006-ia,q-famema2021-028,q-uspsp1-103,q-uspsp3-017}
- Diagnóstico antigo sem confirmação, PA normal sem remédio: **suspender e monitorar**. {q-usp2022-025}
- PA limítrofe com sinal de HVE no ECG: **ecocardiograma e MAPA**. {q-famerp2024-070}` },
      ],
    },
    {
      id: "avaliacao", titulo: "Avaliação inicial e risco cardiovascular",
      introducao: `[[A avaliação do hipertenso procura lesão de órgão-alvo e outros fatores de risco: creatinina com filtração estimada, potássio, sódio, glicemia, perfil lipídico, ácido úrico, urina e albuminúria, e eletrocardiograma.|q-iamspe2021-003-ia,q-usprp2024-003,q-tp20241-038]] [[A pressão alta crônica engrossa o ventrículo esquerdo (hipertrofia), endurece as artérias e lesa retina e rim; o que reduz eventos é baixar a pressão até a meta, mais do que a classe escolhida.|q-sirio2022-011,q-sirio2023-016,q-sessp2026-095]]`,
      fragmentos: [
        { id: "ava-exames", titulo: "Exames, lesão de órgão-alvo e metas", conferir: true, diretrizes: ["sbc-has","sbd"],
          casos: ["q-sirio2022-011"],
          questoes: ["q-iamspe2021-003-ia","q-usprp2024-003","q-sirio2022-011","q-sirio2023-016","q-sessp2026-095","q-uspsp1-056","q-scmsp2023-007","q-uspsp1-065","q-uspsp4-094","q-famerp2024-073"],
          prosa: `**As metas mudaram:** a diretriz de 2020 dava < 140/90 para a maioria e < 130/80 para quem tem risco alto; a de 2025 adota **< 130/80** como meta geral, desde que tolerada. No idoso frágil, a meta se individualiza pela funcionalidade.`,
          texto: `- Exames iniciais mesmo no jovem: **Na, K, ácido úrico, creatinina com TFG, lipídios, glicemia, albuminúria, urina, ECG**. {q-iamspe2021-003-ia}
- Exame básico anual: inclui **ácido úrico**. {q-usprp2024-003}
- ECG com critério de voltagem: **hipertrofia ventricular esquerda**. {q-sirio2022-011}
- O que reduz risco: **atingir a meta de PA**. {q-sirio2023-016}
- **Estratificar o risco cardiovascular global** para guiar a intensidade. {q-sessp2026-095}
- Alto risco com LDL fora da meta: **estatina mais potente**. {q-uspsp1-056}
- Coronariopata: meta **< 130/80**, sem diastólica muito baixa (< 70). {q-scmsp2023-007}
- DM2 com albuminúria > 30 mg/g: **< 130/80** (SBD). {q-uspsp1-065}
- Idoso frágil com demência: avaliar **status funcional e cognitivo**. {q-uspsp4-094}
- Idoso com descontrole recente: **ausculta abdominal** (sopro de estenose renal). {q-famerp2024-073}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento",
      introducao: `[[O tratamento começa pela mudança de estilo de vida, que sozinha baixa vários mmHg: dieta DASH, menos sódio e mais potássio (o sal com cloreto de potássio reduz pressão e eventos), perda de peso, exercício aeróbico e menos álcool; meditação e controle da respiração também reduzem a sistólica.|q-einstein2021-042,q-unesp2025-058,q-famerp2023-077,q-sessp2022-097-ia,q-fmabc2026-011]] [[As drogas de primeira linha são tiazídicos, bloqueadores de canal de cálcio diidropiridínicos e bloqueadores do sistema renina-angiotensina (IECA ou BRA), e a maioria dos pacientes já começa com duas classes em comprimido único, exceto o de risco baixo com hipertensão leve e o idoso frágil.|q-card-15,q-adap23-005,q-tp20212-029,q-tp20251-002,q-fmabc2022-016]]

[[Cada classe tem efeito adverso previsível pelo mecanismo: IECA acumula bradicinina (tosse) e, como o BRA, sobe o potássio; o anlodipino dilata a arteríola e dá edema maleolar; o tiazídico baixa potássio e sobe ácido úrico e glicose; o betabloqueador não seletivo causa broncoespasmo.|q-adap21-006,q-amrigs2021-007,q-amrigs2024-085,q-tp20212-014,q-fmabc2026-011]]`,
      fragmentos: [
        { id: "tra-estilo", titulo: "Mudança de estilo de vida", conferir: true, diretrizes: ["sbc-has"],
          questoes: ["q-einstein2021-042","q-unesp2025-058","q-famerp2023-077","q-sessp2022-097-ia"],
          texto: `- **Dieta DASH**: reduz cerca de 6,7/3,5 mmHg. {q-einstein2021-042}
- Trocar cloreto de sódio por **cloreto de potássio** reduz PA e risco cardiovascular. {q-unesp2025-058,q-famerp2023-077}
- **Meditação e controle da respiração** reduzem a PAS. {q-sessp2022-097-ia}` },
        { id: "tra-classes", titulo: "Classes, início e escolha", conferir: true, diretrizes: ["sbc-has"],
          questoes: ["q-card-15","q-adap23-005","q-tp20212-029","q-fmabc2022-016","q-iamspe2021-002","q-scmsp2023-098","q-einstein2027-066","q-amrigs2020-001","q-amrigs2021-017","q-iamspe2025-007","q-iamspe2026-018","q-usprp2022-014","q-sirio2025-009","q-usprp2023-046","q-einstein2026-006","q-sessp2023-061","q-unicamp2022-002"],
          texto: `- Primeira linha: **tiazídico, BCC e IECA/BRA**. {q-card-15}
- Estágio 2 ou risco alto: **duas classes em comprimido único** (BRA + anlodipino ou clortalidona). {q-adap23-005,q-tp20212-029,q-iamspe2021-002}
- Gabarito antigo: monoterapia em PA 130–139/85–89 de **risco alto**. {q-fmabc2022-016}
- IECA + tiazídico sem controle: **associar BCC**. {q-scmsp2023-098}
- Tiazídico sem controle: **associar IECA** e checar potássio em 15 dias. {q-einstein2027-066}
- **BCC de ação curta** (nifedipino) não se usa. {q-amrigs2020-001}
- IECA melhora desfechos no **DM2**. {q-amrigs2021-017}
- Candesartana: **bloqueio competitivo do receptor AT1**. {q-iamspe2025-007}
- Propranolol: **betabloqueio não seletivo**. {q-iamspe2026-018}
- Com gota ou ácido úrico alto: **losartana** (uricosúrica); evitar tiazídico. {q-usprp2022-014,q-sirio2025-009}
- Negra: **BCC** ou tiazídico como base. {q-usprp2023-046}
- DM com albuminúria: **IECA + BCC**. {q-einstein2026-006}
- Atenolol no diabético obeso: trocar por **enalapril**. {q-sessp2023-061}
- Idosa com ICFEp: **IECA + tiazídico**. {q-unicamp2022-002}` },
        { id: "tra-adversos", titulo: "Efeitos adversos e ajustes", conferir: true, diretrizes: ["sbc-has"],
          questoes: ["q-adap21-006","q-amrigs2021-007","q-amrigs2024-085","q-fmabc2025-095","q-unesp2024-060","q-tp20212-014","q-fmabc2026-011","q-famerp2026-054","q-famerp2025-008","q-sessp2024-018","q-fmabc2021-037","q-unicampdis2023-010","q-famema2021-076"],
          texto: `- Tosse com enalapril: **trocar por BRA**. {q-adap21-006,q-fmabc2026-011}
- Ramipril → **hipercalemia**; anlodipino → **edema**; atenolol → **broncoespasmo**; tiazídico → distúrbio metabólico. {q-amrigs2021-007}
- Edema de tornozelo: **anlodipino**; trocar por tiazídico. {q-amrigs2024-085,q-fmabc2025-095,q-unesp2024-060}
- Broncoespasmo no asmático: **propranolol**. {q-tp20212-014}
- Idoso com tontura postural: **suspender hidroclorotiazida**. {q-famerp2026-054}
- DRC G3aA3 com proteinúria: gabarito troca **losartana por valsartana** (dose plena). {q-famerp2025-008}
- Lúpus com potássio 5,9: **trocar losartana por carvedilol**. {q-sessp2024-018}
- Creatinina que dobra após IECA: **suspender** e pedir **Doppler das artérias renais**. {q-fmabc2021-037,q-unicampdis2023-010}
- Gestante: metildopa; os exames de rotina seguem consenso de especialistas. {q-famema2021-076}` },
      ],
    },
    {
      id: "resistente", titulo: "Hipertensão resistente e secundária",
      introducao: `[[Hipertensão resistente é a que não controla com três classes em dose plena, uma delas diurético, depois de excluir má adesão, técnica errada e avental branco (MAPA); a quarta droga é a espironolactona, porque boa parte desses pacientes tem excesso de aldosterona.|q-unifesp2023-012,q-usp2024-057,q-famema2022-038,q-famerp2024-068,q-unesp2022-053]] [[Pensa-se em causa secundária quando a hipertensão começa antes dos 30 ou piora de repente depois dos 55, é resistente, vem com hipocalemia espontânea ou com sinais de uma doença específica.|q-scmsp2023-006,q-tp20231-030,q-usp2023-052,q-fmabc2025-003]]

[[O hiperaldosteronismo primário é a causa endócrina mais comum: a aldosterona retém sódio e perde potássio, e o rastreio é a relação aldosterona/renina; a estenose de artéria renal (aterosclerótica no idoso, displasia fibromuscular na mulher jovem) piora a função renal com IECA; a apneia do sono tira o descenso noturno.|q-card-17,q-unifesp2023-005,q-tp20261-094,q-adap21-007,q-einstein2024-003,q-usprp2021-007]]`,
      fragmentos: [
        { id: "res-resistente", titulo: "Hipertensão resistente", conferir: true, diretrizes: ["sbc-has"],
          figuras: [{ arquivo: "figuras/resistente.svg", legenda: "Esquema autoral: os passos diante da pressão que não controla com três drogas." }],
          questoes: ["q-unifesp2023-012","q-uspsp3-086","q-usp2024-057","q-famema2022-038","q-famerp2024-068","q-famerp2022-059","q-usprp2024-007","q-sirio2025-014","q-unesp2022-053","q-fmabc2025-003","q-einstein2025-007"],
          prosa: `A dose inicial de espironolactona é 25 mg; um gabarito usa 50 mg. Se a espironolactona não basta (hipertensão refratária), entram betabloqueador, clonidina ou vasodilatador, e investigam-se causas secundárias.`,
          texto: `- Três classes em dose plena sem controle: **associar espironolactona 25 mg**. {q-unifesp2023-012,q-uspsp3-086,q-usp2024-057,q-famema2022-038,q-famerp2022-059,q-usprp2024-007,q-sirio2025-014}
- MAPA confirmando: resistente, **espironolactona** (o gabarito dá 50 mg). {q-famerp2024-068}
- Piora após anos de controle, com quatro drogas: **resistente, investigar secundária**. {q-unesp2022-053,q-fmabc2025-003}
- Refratária com cinco drogas: investigar secundária e **associar clonidina**. {q-einstein2025-007}` },
        { id: "res-secundaria", titulo: "Causas secundárias", conferir: true, diretrizes: ["sbc-has"],
          casos: ["q-usprp2021-007"],
          questoes: ["q-card-17","q-scmsp2023-006","q-tp20231-030","q-usp2023-052","q-unifesp2023-005","q-usprp2021-006","q-tp20261-094","q-adap21-007","q-einstein2024-003","q-usprp2021-007","q-adap23-012"],
          texto: `- Indícios: **estágio 3 antes dos 30 ou após os 55**, resistente. {q-scmsp2023-006,q-tp20231-030}
- Jovem com **hipocalemia**: investigar secundária. {q-usp2023-052,q-card-17}
- Rastreio do hiperaldosteronismo: **aldosterona e renina**; trocar BRA por anlodipino antes da coleta. {q-unifesp2023-005,q-usprp2021-006,q-tp20261-094}
- Mulher jovem com **"colar de contas"**: **displasia fibromuscular**, angioplastia com balão. {q-adap21-007}
- Idoso tabagista que perde o controle: **Doppler das artérias renais**. {q-einstein2024-003}
- MAPA sem descenso noturno no obeso: **apneia do sono**. {q-usprp2021-007}
- Crise adrenérgica (feocromocitoma): **nitroprussiato ou fentolamina**, betabloqueador só depois do alfa. {q-adap23-012}` },
      ],
    },
    {
      id: "crises", titulo: "Crises hipertensivas",
      introducao: `[[O que separa emergência de urgência não é o número da pressão, mas a lesão aguda de órgão-alvo: na emergência (edema agudo de pulmão, AVC, dissecção de aorta, encefalopatia, eclâmpsia, crise adrenérgica) a pressão cai em minutos com droga venosa titulável; na urgência, ou hipertensão grave sem lesão, cai em horas a dias com medicação oral.|q-unesp2023-041,q-sirio2021-005,q-card-16,q-iamspe2026-096]] [[A queda brusca é perigosa porque a autorregulação do cérebro e do coração se deslocou para pressões mais altas: na maioria das emergências, reduz-se no máximo 25% na primeira hora.|q-sirio2024-051,q-sessp2025-016]]

[[A hipertensão maligna lesa as arteríolas por necrose fibrinoide: edema de papila, hemorragias e exsudatos na retina, lesão renal e, no cérebro, encefalopatia com cefaleia, vômitos e confusão.|q-tp20202-022,q-unesp2025-047,q-unicampdis2024-072]]`,
      fragmentos: [
        { id: "cri-conduta", titulo: "Emergência × urgência e drogas", conferir: true, diretrizes: ["sbc-has"],
          questoes: ["q-unesp2023-041","q-sirio2021-005","q-card-16","q-iamspe2026-096","q-sirio2024-051","q-sessp2025-016","q-adap22-090","q-usprp2026-047","q-unifesp2022-090","q-tp20202-022","q-unesp2025-047","q-unicampdis2024-072"],
          prosa: `A diretriz de 2025 passou a evitar o termo "urgência": PA muito alta sem lesão aguda é **hipertensão grave não controlada**, tratada com oral e seguimento próximo. A cocaína pede **benzodiazepínico** primeiro, porque a hipertensão vem da descarga simpática.`,
          texto: `- Emergências: **IVE aguda, hemorragia cerebral, feocromocitoma, drogas, eclâmpsia**. {q-unesp2023-041}
- Sem lesão aguda: **medicação oral**, redução gradual, seguimento. {q-sirio2021-005,q-card-16}
- Cefaleia com PA alta sem lesão: **urgência, captopril oral** (pico em 60–90 min). {q-iamspe2026-096}
- Emergência: **nitroprussiato IV**, queda de **até 25%** inicialmente. {q-sirio2024-051,q-sessp2025-016,q-usprp2026-047}
- Edema agudo de pulmão hipertensivo: **nitroglicerina IV + furosemida**, O2 ou VNI. {q-adap22-090}
- Cocaína: **diazepam**. {q-unifesp2022-090}
- Edema de papila com cefaleia e visão turva: **encefalopatia hipertensiva**, TC de crânio. {q-tp20202-022}
- Papiledema, exsudatos, hemorragias: **hipertensão acelerada-maligna**, vasodilatador IV no hospital. {q-unesp2025-047,q-unicampdis2024-072}` },
      ],
    },
    {
      id: "crianca", titulo: "Hipertensão na criança e no adolescente",
      introducao: `[[Na criança, a pressão se compara com tabelas por sexo, idade e percentil de estatura: elevada a partir do percentil 90 (ou 120/80), estágio 1 a partir do percentil 95, estágio 2 a partir do percentil 95 + 12 mmHg; a partir dos 13 anos valem os cortes do adulto (elevada 120–129/< 80, estágio 1 ≥ 130/80).|q-usprp2022-090,q-sirio2021-048,q-sirio2022-041,q-sirio2026-054,q-fmabc2021-087,q-sirio2027-041-ia,q-uspsp2-054]] [[Quanto mais nova a criança e mais alta a pressão, maior a chance de causa secundária (renal, coarctação); no adolescente obeso predomina a primária.|q-tp20232-048,q-tp20241-038,q-tp20252-010]]`,
      fragmentos: [
        { id: "cri-ped", titulo: "Classificação e tratamento na criança", conferir: true, diretrizes: ["aap-pa-ped"],
          questoes: ["q-usprp2022-090","q-sirio2021-048","q-sirio2022-041","q-sirio2026-054","q-fmabc2021-087","q-sirio2027-041-ia","q-uspsp2-054","q-tp20241-038","q-tp20232-048","q-tp20252-010","q-tp20261-084","q-sirio2026-047"],
          texto: `- Entre p90 e p95: **pressão arterial elevada**; estilo de vida e reavaliar. {q-usprp2022-090,q-sirio2022-041,q-fmabc2021-087,q-sirio2027-041-ia}
- ≥ p95 confirmada: **hipertensão estágio 1**. {q-sirio2021-048,q-sirio2026-054}
- Menina de 10 anos com 130/85: **estágio 1**, **MAPA** e investigação inicial. {q-uspsp2-054}
- Adolescente com 135/85 por 3 meses: **urina, urocultura, ureia, creatinina, eletrólitos, lipídios, ácido úrico**. {q-tp20241-038}
- Albuminúria e HVE: **IECA**. {q-tp20232-048}
- Adolescente sexualmente ativa sem contracepção: **anlodipino** (IECA/BRA são teratogênicos). {q-tp20252-010,q-tp20261-084}
- Síndrome metabólica (IDF) na criança: exige **cintura ≥ p90**. {q-sirio2026-047}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A tabela resume as situações da medida fora do consultório e as crises.`,
      fragmentos: [
        { id: "comp-tabela", titulo: "Consultório × fora dele, emergência × urgência", conferir: true,
          questoes: ["q-unifesp2024-029","q-unesp2024-056","q-unesp2023-041"],
          prosa: `| | Consultório | MAPA/MRPA | Conduta |
|---|---|---|---|
| Normotensão | normal | normal | seguimento |
| Avental branco | **alta** | normal | estilo de vida, reavaliar |
| Mascarada | normal | **alta** | tratar como hipertensão |
| Hipertensão | alta | alta | tratar |

| | Emergência | Urgência (hipertensão grave) |
|---|---|---|
| Lesão aguda de órgão-alvo | **sim** | não |
| Droga | venosa titulável (nitroprussiato, nitroglicerina) | oral (captopril, ajuste do esquema) |
| Velocidade | até 25% na 1ª hora | horas a dias |
| Local | UTI ou sala de emergência | ambulatório com retorno próximo |`,
          texto: `- Consultório 145/95 e MAPA 125/75: **avental branco**. {q-unifesp2024-029}
- MRPA alta e MAPA 138/88: **mascarada**. {q-unesp2024-056}
- Emergência = **lesão aguda de órgão-alvo**. {q-unesp2023-041}` },
      ],
    },
  ],
});
