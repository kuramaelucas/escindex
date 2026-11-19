/* resumos/arritmias/resumo.js — resumo adaptativo de ECG, arritmias e síncope: leitura do ECG e sobrecargas,
   bradiarritmias e bloqueios, fibrilação e flutter atrial, taquicardias de QRS estreito (adulto e criança),
   taquicardias de QRS largo e pró-arritmia, síncope, armadilhas e tabela das taquicardias.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- arritmias */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "arritmias",
  titulo: "ECG, arritmias e síncope",
  assunto: "ass-arritmias",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "aha-rcp", texto: "AHA — Guidelines for CPR and Emergency Cardiovascular Care 2025 (adulto e pediatria: bradicardia e taquicardia com pulso)", lidoEm: null },
    { id: "sbc-fa", texto: "SOBRAC/SBC — Diretriz Brasileira de Fibrilação Atrial 2025 (Arq Bras Cardiol 2025;122(9):e20250618)", lidoEm: null },
    { id: "esc-fa", texto: "ESC — Guidelines for the management of atrial fibrillation 2024", lidoEm: null },
    { id: "esc-sincope", texto: "ESC — Guidelines for the diagnosis and management of syncope 2018", lidoEm: null },
    { id: "acc-tsv", texto: "ACC/AHA/HRS — Guideline for the management of adult patients with supraventricular tachycardia 2015", lidoEm: null },
    { id: "acc-bradi", texto: "ACC/AHA/HRS — Guideline on the evaluation and management of patients with bradycardia and cardiac conduction delay 2018", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anulada com reposição; a reposição (-ia) entra no resumo", questoes: ["q-usp2024-055"] },
    { motivo: "anulada, sem reposição", questoes: ["q-einstein2025-031"] },
  ],
  doencas: [
    {
      id: "ecg", titulo: "Leitura do ECG e sobrecargas",
      introducao: `O ECG registra a despolarização que nasce no nó sinusal, atravessa os átrios (onda P), espera no nó atrioventricular (segmento PR) e desce pelo feixe de His e seus ramos para os ventrículos (QRS). [[No papel a 25 mm/s cada quadrado grande vale 0,2 s; a frequência num ritmo regular é 300 dividido pelo número de quadrados grandes entre dois R (4 quadrados = 75 bpm).|q-card-01]] [[O PR normal vai de 120 a 200 ms: é o tempo de passagem pelo nó AV, e o bloqueio de primeiro grau é só esse atraso (PR > 200 ms) com toda P conduzida.|q-card-02]] [[A posição dos eletrodos precordiais é fixa: V4 fica no quinto espaço intercostal esquerdo, na linha hemiclavicular.|q-scmsp2022-077]]

[[Sobrecarga é aumento de massa ou de cavidade: o ventrículo esquerdo hipertrofiado gera mais voltagem (Sokolow-Lyon: S de V1 + R de V5 ou V6 ≥ 35 mm; Cornell: S de V3 + R de aVL ≥ 28 mm no homem e ≥ 20 mm na mulher), e o átrio direito dilatado, como no cor pulmonale da DPOC, faz a P apiculada > 2,5 mm em DII (P pulmonale).|q-iamspe2026-003,q-iamspe2026-005,q-sirio2022-017,q-unesp2024-041]]

Veja também: **Insuficiência cardíaca do adulto** (a cardiopatia por trás de muitas arritmias), **Emergências pediátricas** (parada e ritmos da PCR), **Hipertensão arterial** (sobrecarga ventricular) e **Distúrbios hidroeletrolíticos** (potássio e o ECG).`,
      fragmentos: [
        { id: "ecg-basico", titulo: "Frequência, intervalos e variantes normais", conferir: true,
          questoes: ["q-card-01","q-card-02","q-scmsp2022-077","q-amrigs2020-003","q-unesp2023-016"],
          prosa: `A leitura segue sempre a mesma ordem: ritmo (há P antes de cada QRS?), frequência, intervalos (PR, QRS, QT), eixo e morfologia. [[Na criança, a frequência sobe na inspiração e cai na expiração porque o tônus vagal varia com a respiração: é a arritmia sinusal, fisiológica, com P normal antes de cada QRS.|q-unesp2023-016]] [[Outros achados têm significado próprio: baixa voltagem com alternância elétrica sugere derrame pericárdico; a onda U proeminente lembra hipopotassemia, não isquemia.|q-amrigs2020-003]]`,
          texto: `- FC num ritmo regular = **300 ÷ quadrados grandes** entre dois R. {q-card-01}
- PR normal **120–200 ms**; BAV de 1º grau = **PR > 200 ms**, toda P conduz. {q-card-02}
- V4: **5º espaço intercostal, linha hemiclavicular** esquerda. {q-scmsp2022-077}
- Onda U: **hipopotassemia**, não isquemia. {q-amrigs2020-003}
- Criança com FC que varia com a respiração e P normal: **arritmia sinusal**, benigna. {q-unesp2023-016}` },
        { id: "ecg-sobrecargas", titulo: "Sobrecargas, bloqueios de ramo e hipertrofia", conferir: true,
          casos: ["q-unesp2024-041"],
          questoes: ["q-iamspe2026-003","q-iamspe2026-005","q-sirio2022-017","q-unesp2024-041","q-simepm89-042","q-einstein2023-007"],
          prosa: `[[O bloqueio da divisão anterossuperior do ramo esquerdo desvia o eixo para a esquerda (além de −45°), porque a parede inferior passa a despolarizar antes e o vetor final aponta para cima; o QRS segue estreito.|q-simepm89-042]] [[Na cardiomiopatia hipertrófica, o ECG mostra voltagem muito alta e alterações de repolarização, às vezes com Q profundas; síncope ou dor no esforço em jovem levam ao ecocardiograma, porque a obstrução da via de saída piora quando o coração acelera.|q-einstein2023-007]]`,
          texto: `- **Sokolow-Lyon**: S de V1 + R de V5 ou V6 ≥ **35 mm**. {q-sirio2022-017}
- **Cornell**: S de V3 + R de aVL ≥ **28 mm** (homem) ou **≥ 20 mm** (mulher). {q-iamspe2026-003}
- DPOC: **P pulmonale** (> 2,5 mm em DII). {q-iamspe2026-005}
- Dispneia, ortopneia e voltagem alta: **insuficiência cardíaca com sobrecarga de VE**. {q-unesp2024-041}
- Eixo além de −45° com QRS estreito: **bloqueio divisional anterossuperior**. {q-simepm89-042}
- Síncope no esforço em jovem com voltagem alta: **cardiomiopatia hipertrófica**. {q-einstein2023-007}` },
      ],
    },
    {
      id: "bradi", titulo: "Bradiarritmias e bloqueios atrioventriculares",
      introducao: `[[O bloqueio atrioventricular se localiza pelo comportamento do PR: no Mobitz I (Wenckebach) o PR se alonga batimento a batimento até uma P não conduzir, porque o nó AV fatiga e se recupera; no Mobitz II o PR é constante e uma P cai de repente, porque o defeito está abaixo do nó, no sistema His-Purkinje.|q-card-03,q-famema2023-028,q-einstein2026-007,q-usp2023-051,q-tp20241-025]] [[No BAV total, átrios e ventrículos batem dissociados: P regulares, QRS regulares mais lentos e sem relação com elas; o escape é juncional (QRS estreito) ou ventricular (QRS largo, mais lento e menos confiável).|q-iamspe2026-002,q-einstein2024-008,q-tp20232-037,q-fmabc2021-033]]

[[O risco depende do nível: o bloqueio no nó (Mobitz I) é quase sempre benigno, vagal ou por droga; o infranodal (Mobitz II, BAV avançado e total) progride para assistolia e pede marcapasso.|q-einstein2026-007,q-tp20252-106,q-uspsp3-085,q-simepm89-045]] Antes de culpar o sistema de condução, procuram-se causas reversíveis: betabloqueador, bloqueador de canal de cálcio não di-hidropiridínico, digoxina, hiperpotassemia e isquemia inferior.`,
      fragmentos: [
        { id: "bra-diagnostico", titulo: "Reconhecer o tipo de bloqueio", conferir: true,
          casos: ["q-usp2023-051","q-fmabc2021-033"],
          questoes: ["q-card-03","q-famema2023-028","q-einstein2026-007","q-usp2023-051","q-tp20241-025","q-iamspe2026-002","q-fmabc2021-033","q-einstein2024-008","q-sirio2021-002","q-tp20232-037"],
          prosa: `[[No BAV 2:1 não há dois PR seguidos para comparar, então não se distingue Mobitz I de II pelo traçado; QRS largo e ausência de resposta à atropina apontam para o nível infranodal.|q-einstein2026-007]] [[A cardiopatia chagásica lesa o sistema de condução: bloqueio de ramo direito com bloqueio divisional anterossuperior e BAV avançado são típicos.|q-iamspe2026-002,q-fmabc2021-033]] [[Em idoso que usa betabloqueador (atenolol, propranolol) a droga é a primeira suspeita, mas Mobitz II e BAV total pedem investigação mesmo assim.|q-sirio2021-002,q-einstein2024-008,q-usp2023-051]]`,
          texto: `- PR que se alonga até uma P cair: **Mobitz I (Wenckebach)**. {q-card-03,q-famema2023-028,q-tp20241-025}
- PR constante e P bloqueada de repente: **Mobitz II**. {q-einstein2026-007,q-usp2023-051,q-einstein2024-008}
- P e QRS dissociados: **BAV total**, escape juncional ou ventricular. {q-iamspe2026-002,q-tp20232-037}
- Chagas: **BRD + BDAS** e bloqueios avançados. {q-fmabc2021-033}
- Bradicardia com betabloqueador ou antidepressivo tricíclico: **rever as drogas**. {q-sirio2021-002}` },
        { id: "bra-conduta", titulo: "Bradicardia instável e marcapasso", conferir: true, diretrizes: ["aha-rcp","acc-bradi"],
          casos: ["q-fmabc2022-014"],
          questoes: ["q-card-24","q-fmabc2021-034","q-einstein2024-009","q-fmabc2022-014","q-tp20252-106","q-uspsp3-085","q-simepm89-045"],
          prosa: `[[Bradicardia com hipotensão, confusão, dor torácica ou congestão é instável: a atropina (1 mg EV, repetível até 3 mg) bloqueia o vago e acelera o nó sinusal e o nó AV; se não funcionar, segue-se a dopamina ou adrenalina em infusão ou o marcapasso transcutâneo, enquanto se prepara o transvenoso.|q-card-24,q-fmabc2021-034,q-einstein2024-009,q-fmabc2022-014]] [[A atropina age pouco no bloqueio infranodal, porque o vago não inerva o His-Purkinje: por isso o BAV total ou Mobitz II sintomático vai para marcapasso.|q-fmabc2022-014,q-tp20252-106]] [[Paciente assintomático com bradicardia e bloqueio crônico, como no Chagas, faz Holter e teste ergométrico para procurar bloqueios avançados e incompetência cronotrópica antes de decidir o marcapasso.|q-uspsp3-085]]`,
          texto: `- Bradicardia instável: **atropina 1 mg EV**. {q-card-24,q-fmabc2021-034}
- Sem resposta: **dopamina 5–20 mcg/kg/min**, adrenalina ou **marcapasso transcutâneo**. {q-einstein2024-009}
- BAV total com síncope: **marcapasso** (provisório e depois definitivo). {q-fmabc2022-014,q-tp20252-106}
- BAV total paroxístico é **indicação de marcapasso definitivo**; estenose aórtica com síncope é **mau prognóstico**. {q-simepm89-045}
- Chagas assintomático com FC 48: **Holter e teste ergométrico**. {q-uspsp3-085}` },
      ],
    },
    {
      id: "fa", titulo: "Fibrilação atrial e flutter atrial",
      introducao: `[[Na fibrilação atrial, múltiplas ondas de reentrada ativam os átrios de forma caótica: não há onda P, a linha de base tem ondas f, e o nó AV filtra os impulsos ao acaso, dando RR irregularmente irregular.|q-card-18,q-iamspe2026-001,q-udisc20262-007,q-tp20232-002,q-tp20261-086]] A arritmia nasce de átrio dilatado e fibrosado (hipertensão, valvopatia mitral, idade, apneia do sono, tireotoxicose) e de gatilhos nas veias pulmonares; [[o álcool em excesso desencadeia FA aguda em coração normal (síndrome do coração do feriado), por efeito direto do etanol e do acetaldeído sobre a condução e pela descarga adrenérgica.|q-scmsp2022-064,q-einstein2027-009]]

[[O flutter é um circuito único de macrorreentrada no átrio direito: ondas F em serrilhado em DII, DIII e aVF a cerca de 300 por minuto, e o nó AV deixa passar metade, daí a FC fixa perto de 150.|q-unicamp2022-011,q-unifesp2023-001]] [[O átrio que não contrai deixa o sangue parado na aurícula esquerda: o risco de AVC é o que manda anticoagular, e ele se mede pelo CHA2DS2-VASc (a diretriz brasileira de 2025 passou a usar o CHA2DS2-VA, sem o sexo).|q-usp2023-050,q-scmsp2025-016,q-adap23-001]]`,
      fragmentos: [
        { id: "fa-instavel", titulo: "Instável: cardioversão elétrica", conferir: true, diretrizes: ["aha-rcp","sbc-fa"],
          casos: ["q-unesp2026-041"],
          questoes: ["q-card-19","q-unesp2026-041","q-usprp2025-062","q-unifesp2023-001","q-unicamp2022-011"],
          prosa: `[[Hipotensão, choque, rebaixamento de consciência, dor torácica isquêmica ou edema pulmonar causados pela taquiarritmia pedem cardioversão elétrica sincronizada na hora, sem esperar anticoagulação, porque a frequência alta encurta a diástole e derruba o débito.|q-card-19,q-unesp2026-041,q-usprp2025-062]] [[O flutter responde a pouca energia, e a cardioversão sincronizada é a forma mais eficaz de revertê-lo; a adenosina só bloqueia o nó por segundos e revela as ondas F, sem reverter.|q-unifesp2023-001,q-unicamp2022-011]]`,
          texto: `- FA com hipotensão, dor ou rebaixamento: **cardioversão elétrica sincronizada**. {q-card-19,q-unesp2026-041,q-usprp2025-062}
- Flutter 2:1: **cardioversão elétrica** para reverter. {q-unifesp2023-001,q-unicamp2022-011}` },
        { id: "fa-frequencia", titulo: "Estável: controle da frequência", conferir: true, diretrizes: ["sbc-fa","esc-fa"],
          questoes: ["q-sirio2022-018","q-fmabc2025-001","q-einstein2025-003","q-fmabc2021-031","q-iamspe2026-013","q-tp20232-002","q-tp20261-086","q-iamspe2026-001","q-udisc20262-007","q-card-18"],
          prosa: `[[A frequência se controla com drogas que retardam o nó AV: betabloqueador (preferido) ou diltiazem/verapamil, e digoxina como adjuvante, sobretudo na insuficiência cardíaca. O anlodipino não serve, porque age no vaso e não no nó.|q-sirio2022-018,q-fmabc2025-001,q-tp20232-002,q-tp20261-086]] [[Quem não tolera betabloqueador por broncoespasmo usa o verapamil ou o diltiazem.|q-einstein2025-003]] [[Na FA com tireotoxicose, o betabloqueador controla a frequência e o tremor enquanto se trata a tireoide.|q-fmabc2021-031]] [[A amiodarona venosa é diluída em soro glicosado a 5%, porque é instável em soro fisiológico, e em infusão, não em bolus.|q-iamspe2026-013]]`,
          texto: `- FA: **sem P**, ondas f, **RR irregularmente irregular**. {q-card-18,q-iamspe2026-001,q-udisc20262-007}
- Frequência: **betabloqueador** ou **diltiazem/verapamil**; **anlodipino não**. {q-sirio2022-018,q-fmabc2025-001,q-tp20232-002,q-tp20261-086}
- Asmático: **verapamil**. {q-einstein2025-003}
- Tireotoxicose: **metoprolol**. {q-fmabc2021-031}
- Amiodarona EV: **soro glicosado 5%**, em infusão. {q-iamspe2026-013}` },
        { id: "fa-ritmo", titulo: "Cardioversão eletiva e anticoagulação", conferir: true, diretrizes: ["sbc-fa","esc-fa"],
          questoes: ["q-adap23-001","q-usp2024-055-ia","q-einstein2021-010","q-einstein2027-009","q-scmsp2025-020","q-usp2023-050","q-scmsp2025-016","q-scmsp2022-078","q-scmsp2022-064"],
          prosa: `[[Com mais de 48 horas (ou duração desconhecida), o trombo pode já estar formado: ou se anticoagula por 3 semanas antes de cardioverter, ou se faz ecocardiograma transesofágico para excluir trombo e cardioverte-se com anticoagulação iniciada. Depois da cardioversão, anticoagula-se por pelo menos 4 semanas, porque o átrio "atordoado" demora a voltar a contrair.|q-adap23-001,q-einstein2021-010,q-einstein2027-009]] [[Com menos de 48 horas, anticoagula-se antes da cardioversão e mantém-se depois; a decisão de longo prazo segue o risco de AVC, não a duração.|q-usp2024-055-ia,q-scmsp2025-016]] [[No coração sem doença estrutural, a propafenona mantém o ritmo; com cardiopatia estrutural ela é pró-arrítmica e se usa amiodarona.|q-scmsp2025-020]] [[AVC prévio já pontua alto: aspirina não protege na FA, o tratamento é anticoagulante oral em dose plena.|q-usp2023-050]] [[A varfarina antagoniza a vitamina K; o que desestabiliza o INR é a variação no consumo de folhas verdes (alface, brócolis, couve) e chá verde, e não o alimento em si.|q-scmsp2022-078]]`,
          texto: `- FA > 48 h estável: **3 semanas de anticoagulação** ou **ETE**, e **4 semanas** depois. {q-adap23-001,q-einstein2021-010,q-einstein2027-009}
- FA < 48 h: **anticoagular antes** e manter depois. {q-usp2024-055-ia,q-scmsp2025-016}
- Manter ritmo sem cardiopatia estrutural: **propafenona**. {q-scmsp2025-020}
- AVC prévio: **anticoagulante oral**, não aspirina. {q-usp2023-050}
- Varfarina: cuidado com **folhas verdes e chá verde** (vitamina K). {q-scmsp2022-078}
- Álcool em excesso: **FA do coração do feriado**. {q-scmsp2022-064}` },
      ],
    },
    {
      id: "tsv", titulo: "Taquicardias de QRS estreito e taquicardia sinusal",
      introducao: `[[A taquicardia paroxística supraventricular mais comum é a reentrada nodal: o nó AV tem duas vias, e o impulso gira entre elas, ativando átrios e ventrículos quase juntos; por isso a P some no QRS ou aparece como pseudo-S em DII, DIII e aVF e pseudo-R' em V1, com QRS estreito, regular, 150 a 250 bpm, começo e fim súbitos.|q-iamspe2026-006,q-einstein2022-011,q-unifesp2022-081,q-adap22-081]] [[Como o circuito passa pelo nó AV, tudo o que o bloqueia por um instante interrompe a reentrada: manobra vagal (Valsalva modificada) primeiro e, se falhar, adenosina em bolus rápido (6 mg, depois 12 mg).|q-card-20,q-einstein2022-012,q-simepm89-041,q-famerp2023-079]]

[[A taquicardia sinusal não é arritmia primária: é resposta a febre, dor, hipovolemia, anemia ou hipóxia, tem P normal e sobe e desce aos poucos; trata-se a causa, nunca a frequência.|q-usp2025-091,q-einstein2024-039,q-iamspe2023-042]]`,
      fragmentos: [
        { id: "tsv-adulto", titulo: "TPSV no adulto", conferir: true, diretrizes: ["aha-rcp","acc-tsv"],
          casos: ["q-unifesp2022-081"],
          questoes: ["q-card-20","q-adap22-081","q-unifesp2022-081","q-simepm89-041","q-einstein2022-011","q-einstein2022-012","q-famerp2023-079","q-iamspe2026-006","q-sessp2024-002"],
          prosa: `[[A Valsalva modificada (soprar contra resistência e, em seguida, deitar com as pernas elevadas) aumenta o retorno venoso no relaxamento e dispara o reflexo vagal, revertendo mais que a manobra clássica.|q-adap22-081]] [[Se a pessoa tem sinais de instabilidade (dor torácica, hipotensão, sudorese com má perfusão), vai direto para cardioversão sincronizada.|q-sessp2024-002]]`,
          texto: `- QRS estreito regular, sem P, **pseudo-S/pseudo-R'**: **reentrada nodal**. {q-iamspe2026-006,q-einstein2022-011}
- Estável: **manobra vagal** e depois **adenosina 6 mg → 12 mg**. {q-card-20,q-adap22-081,q-einstein2022-012,q-famerp2023-079}
- Manobra falhou: **adenosina**. {q-unifesp2022-081,q-simepm89-041}
- Dor torácica e instabilidade: **cardioversão sincronizada**. {q-sessp2024-002}` },
        { id: "tsv-crianca", titulo: "TSV no lactente e na criança", conferir: true, diretrizes: ["aha-rcp"],
          casos: ["q-tp20231-048"],
          questoes: ["q-tp20231-048","q-unesp2022-010","q-unesp2024-008","q-unicampdis2023-029"],
          prosa: `[[No lactente, a TSV passa de 220 bpm, não varia com choro ou febre e não tem P visível; a sinusal raramente passa de 220 e tem P normal. Lactente com TSV prolongada entra em insuficiência cardíaca (palidez, sudorese às mamadas, fígado aumentado).|q-tp20231-048,q-unesp2022-010,q-unicampdis2023-029]] [[Com perfusão preservada, adenosina (0,1 mg/kg); com choque ou má perfusão, cardioversão sincronizada (0,5–1 J/kg), ou adenosina se o acesso já está pronto.|q-tp20231-048,q-unesp2024-008,q-unicampdis2023-029]]`,
          texto: `- Lactente com FC > 220 sem P: **TSV** (foco não sinusal). {q-unesp2022-010}
- Perfusão preservada: **adenosina EV**. {q-tp20231-048}
- Choque e QRS estreito > 200: **cardioversão sincronizada** (ou adenosina se o acesso estiver pronto). {q-unesp2024-008,q-unicampdis2023-029}` },
        { id: "tsv-sinusal", titulo: "Taquicardia sinusal: tratar a causa", conferir: true,
          questoes: ["q-usp2025-091","q-einstein2024-039","q-iamspe2023-042"],
          prosa: `[[Febre aumenta a frequência em cerca de 10 bpm por grau: a criança febril com FC 200 e P normal precisa de antitérmico, e o adulto com pielonefrite e dor precisa de analgesia e antitérmico, não de antiarrítmico.|q-usp2025-091,q-einstein2024-039]] [[Arritmias com risco de vida são as ventriculares (TV, FV, torsades); a taquicardia sinusal não está entre elas.|q-iamspe2023-042]]`,
          texto: `- Febre com P normal: **antitérmico**. {q-einstein2024-039}
- Dor e febre no adulto: **dipirona**, não betabloqueador. {q-usp2025-091}
- Sem risco de vida: **taquicardia sinusal**. {q-iamspe2023-042}` },
      ],
    },
    {
      id: "tv", titulo: "Taquicardias de QRS largo e pró-arritmia",
      introducao: `[[Taquicardia de QRS largo em quem tem cardiopatia (infarto prévio) é taquicardia ventricular até prova em contrário: o circuito gira numa cicatriz do miocárdio e não passa pelo nó AV, por isso a adenosina não a reverte.|q-sirio2025-001,q-einstein2025-013,q-fmabc2023-012]] [[Estável, trata-se com amiodarona 150 mg em 10 minutos; com hipotensão, dor ou congestão, cardioversão sincronizada; sem pulso, desfibrilação.|q-sirio2025-001,q-einstein2025-013,q-fmabc2023-012]]

[[O QT longo (hipopotassemia, hipomagnesemia, drogas, desnutrição do etilista) facilita torsades de pointes, a TV polimórfica que gira em torno da linha de base; instável ou sem pulso vai à desfibrilação, e o magnésio EV estabiliza a membrana e previne a recorrência.|q-unicampdis2023-009]]`,
      fragmentos: [
        { id: "tv-conduta", titulo: "TV, torsades e toxicidade digitálica", conferir: true, diretrizes: ["aha-rcp"],
          casos: ["q-sirio2025-001"],
          questoes: ["q-sirio2025-001","q-einstein2025-013","q-fmabc2023-012","q-unicampdis2023-009","q-tp20222-018","q-sirio2022-020"],
          prosa: `[[A digoxina inibe a Na-K-ATPase no mesmo sítio do potássio: na hipopotassemia (furosemida) ela se liga mais e fica tóxica, com taquicardia atrial com bloqueio, extrassístoles e TV.|q-tp20222-018]] [[Somar antiarrítmicos ou trocá-los em sequência aumenta o efeito pró-arrítmico, porque os efeitos sobre o QT e a condução se somam.|q-sirio2022-020]]`,
          texto: `- QRS largo, sem resposta à adenosina, estável: **TV**, **amiodarona 150 mg**. {q-sirio2025-001}
- TV com hipotensão: **cardioversão sincronizada**. {q-einstein2025-013,q-fmabc2023-012}
- Torsades instável: **desfibrilar** e **magnésio**. {q-unicampdis2023-009}
- Digoxina + furosemida: **hipopotassemia** potencializa a digoxina. {q-tp20222-018}
- Evitar **associar antiarrítmicos**. {q-sirio2022-020}` },
      ],
    },
    {
      id: "sincope", titulo: "Síncope",
      introducao: `[[Síncope é perda de consciência breve por hipoperfusão cerebral global, com recuperação espontânea e completa. A neuromediada (vasovagal) vem com pródromo de calor, sudorese e náusea em pé parado ou depois de esforço, porque o reflexo dilata vasos e lentifica o coração; abalos curtos podem acontecer e não fazem dela crise epiléptica.|q-usp2025-083,q-famema2025-034]] [[A ortostática acontece ao levantar: queda da PA sistólica ≥ 20 mmHg em 3 minutos de pé, muitas vezes por diurético e anti-hipertensivo em idoso, e se trata ajustando os remédios.|q-unicamp2023-002]] [[A cardíaca é a que mata: sem pródromo, no esforço ou deitado, com cardiopatia; por isso todo paciente com síncope faz ECG.|q-unicamp2022-009,q-simepm89-045]]`,
      fragmentos: [
        { id: "sin-abordagem", titulo: "Separar reflexa, ortostática e cardíaca", conferir: true, diretrizes: ["esc-sincope"],
          questoes: ["q-usp2025-083","q-famema2025-034","q-unicamp2023-002","q-unicamp2022-009"],
          prosa: `[[A vasovagal típica, com ECG normal, recebe alta com orientação (hidratação, evitar ficar parado de pé, manobras de contrapressão).|q-famema2025-034,q-usp2025-083]]`,
          texto: `- Calor e sudorese depois do treino, ECG normal: **vasovagal**. {q-usp2025-083}
- Desmaio em pé parado, sem cardiopatia: **neuromediada, alta com orientação**. {q-famema2025-034}
- PA cai ao levantar com diurético: **ajustar anti-hipertensivos**. {q-unicamp2023-002}
- Toda síncope: **ECG** primeiro. {q-unicamp2022-009}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `As diretrizes mudaram doses e escores, e algumas provas cobraram a edição anterior ou uma leitura particular do caso. A regra vem primeiro; a divergência, depois.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-fmabc2021-034","q-scmsp2025-016","q-fmabc2023-012","q-einstein2024-008"],
          prosa: `[[A atropina na bradicardia instável é 1 mg pela AHA desde 2020; a diretriz brasileira de RCP de 2019 ainda traz 0,5 mg, e as provas usam as duas.|q-fmabc2021-034]] [[Hipotensão com estertores na FA caracteriza instabilidade para muitos autores, que cardiovertem logo; a prova perguntou o que vem antes de uma reversão programada (anticoagulante).|q-scmsp2025-016]] [[A energia inicial da cardioversão depende do aparelho e do ritmo (bifásico: 50–100 J no flutter, 120–200 J na FA, 100 J na TV monomórfica); as provas variam o número.|q-fmabc2023-012]] [[A conduta de suporte na bradicardia que não responde à atropina pode ser dopamina ou adrenalina em infusão ou marcapasso: a escolha entre elas não é rígida.|q-einstein2024-008]]`,
          texto: `- Atropina: **1 mg** (AHA); prova antiga com **0,5 mg** (SBC 2019). {q-fmabc2021-034}
- FA com hipotensão e congestão: em geral **cardioversão imediata**; a prova cobrou o **anticoagulante antes** da reversão. {q-scmsp2025-016}
- Energia da cardioversão: **varia com o ritmo e o aparelho**; a prova cobrou **100 J**. {q-fmabc2023-012}
- Bradicardia refratária: **dopamina, adrenalina ou marcapasso** são aceitos. {q-einstein2024-008}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `As taquicardias que a prova manda diferenciar, resumidas pelos capítulos acima.`,
      fragmentos: [
        { id: "comp-taquicardias", titulo: "Taquicardias: como separar e o que fazer", conferir: true,
          figuras: [{ arquivo: "figuras/taquicardias.svg", legenda: "Esquema autoral: a taquicardia pelo QRS e pelo ritmo, e a conduta no paciente estável." }],
          questoes: ["q-iamspe2026-001","q-udisc20262-007","q-einstein2022-011","q-sirio2025-001","q-unicamp2022-011"],
          prosa: `| Ritmo | QRS | RR | Onda atrial | Conduta no estável |
| --- | --- | --- | --- | --- |
| Sinusal | estreito | regular | P normal | tratar a causa |
| Reentrada nodal | estreito | regular | P escondida, pseudo-S | manobra vagal, adenosina |
| Flutter | estreito | regular (2:1) ou variável | ondas F em serrilhado | controle da FC ou cardioversão |
| Fibrilação atrial | estreito | irregular | sem P, ondas f | controle da FC, anticoagulação |
| TV monomórfica | largo | regular | dissociação AV | amiodarona |

[[Primeiro se olha o QRS (estreito ou largo) e depois o RR (regular ou irregular): essas duas perguntas separam quase todas as taquicardias.|q-iamspe2026-001,q-udisc20262-007,q-einstein2022-011,q-sirio2025-001,q-unicamp2022-011]]`,
          texto: `- Estreito e irregular: **FA**. {q-iamspe2026-001,q-udisc20262-007}
- Estreito, regular, 150 fixos com serrilhado: **flutter 2:1**. {q-unicamp2022-011}
- Estreito, regular, 180, sem P: **TPSV**. {q-einstein2022-011}
- Largo e regular em cardiopata: **TV**. {q-sirio2025-001}` },
      ],
    },
  ],
});
