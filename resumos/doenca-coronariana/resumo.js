/* resumos/doenca-coronariana/resumo.js — resumo adaptativo de doença coronariana: fisiopatologia, quadro, marcadores
   e ECG do infarto, IAM com supra (reperfusão, ventrículo direito, choque), SCA sem supra, complicações e tratamento
   depois do infarto, síndrome coronariana crônica, diagnósticos diferenciais, armadilhas e tabela do espectro.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- doenca-coronariana */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "doenca-coronariana",
  titulo: "Síndromes coronarianas aguda e crônica",
  assunto: "ass-sca",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "acc-sca", texto: "ACC/AHA/ACEP/NAEMSP/SCAI — Guideline for the management of patients with acute coronary syndromes (2025)", lidoEm: null },
    { id: "esc-sca", texto: "ESC — Guidelines for the management of acute coronary syndromes (2023)", lidoEm: null },
    { id: "esc-scc", texto: "ESC — Guidelines for the management of chronic coronary syndromes (2024)", lidoEm: null },
    { id: "definicao-universal", texto: "ESC/ACC/AHA/WHF — Fourth universal definition of myocardial infarction (2018)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "fora do tema: acidose láctica pela metformina na doença renal (está em Distúrbios hidroeletrolíticos e no resumo de diabetes)", questoes: ["q-unicampdis2025-055"] },
  ],
  doencas: [
    {
      id: "diagnostico", titulo: "Fisiopatologia, quadro, marcadores e ECG",
      introducao: `[[A síndrome coronariana aguda começa quando uma placa de ateroma se rompe ou sofre erosão: o núcleo lipídico exposto ativa plaquetas e coagulação, e o trombo reduz ou interrompe o fluxo. Sem oxigênio, o miócito passa à glicólise anaeróbia, acumula lactato e, em 20 a 40 minutos, começa a necrose coagulativa, do subendocárdio para o epicárdio.|q-tp20252-102,q-unicamp2023-009,q-card-07]] [[Oclusão total transmural levanta o segmento ST (IAM com supra); trombo suboclusivo dá infradesnivelamento, inversão de T ou ECG normal (SCA sem supra). Entre as SCA sem supra, o infarto se separa da angina instável só pela troponina, que mostra necrose.|q-card-06,q-iamspe2026-016,q-iamspe2026-098,q-unesp2025-057]]

[[A troponina sobe em 3 a 4 horas e fica alta por 7 a 14 dias; a CK-MB sobe mais cedo e cai em 2 a 3 dias, útil para reinfarto. A injúria miocárdica (troponina alta) sem quadro isquêmico, como na sepse, não é infarto.|q-fmabc2022-015,q-unesp2021-060,q-famerp2025-014]]

Veja também: **ECG, arritmias e síncope** (leitura do ECG e bloqueios), **Insuficiência cardíaca do adulto** (o ventrículo depois do infarto), **Hipertensão arterial** e **Diabetes** (fatores de risco).`,
      fragmentos: [
        { id: "dia-quadro", titulo: "Dor torácica: quadro e troponina", conferir: true, diretrizes: ["definicao-universal","esc-sca"],
          casos: ["q-unicamp2023-009"],
          questoes: ["q-card-06","q-iamspe2026-016","q-iamspe2026-098","q-fmabc2022-015","q-unesp2021-060","q-tp20252-102","q-unicamp2023-009","q-famerp2025-014","q-iamspe2023-005","q-sessp2025-001","q-tp20202-021","q-sirio2021-001","q-famema2021-067"],
          prosa: `[[O ECG sai em até 10 minutos da chegada. ECG inicial normal com dor sugestiva não exclui nada: seriam-se ECG e troponina, porque a oclusão pode ser intermitente ou o supra pode aparecer depois.|q-sessp2025-001,q-tp20202-021]] [[Dor epigástrica com sudorese e náusea em diabético é infarto inferior até prova em contrário: o diabético tem neuropatia e sente menos a dor típica.|q-sirio2021-001,q-famema2021-067]] [[Dor atípica em jovem sem risco, com troponina seriada normal e ECG sem isquemia aguda, pede investigação de outras causas, não cateterismo.|q-iamspe2023-005]]`,
          texto: `- Angina instável × IAM sem supra: **troponina**. {q-card-06,q-iamspe2026-098}
- Dor em repouso que não cede, sem supra: **IAM sem supra**. {q-iamspe2026-016}
- Troponina sobe em **3–4 h**; CK-MB cai antes. {q-fmabc2022-015}
- Fígado tem **menos CPK** que músculo, coração e cérebro. {q-unesp2021-060}
- Isquemia: **lactato** sobe (glicólise anaeróbia). {q-tp20252-102}
- Necropsia precoce: **necrose coagulativa**. {q-unicamp2023-009}
- Troponina na sepse: **injúria miocárdica**, não infarto. {q-famerp2025-014}
- ECG inicial normal: **seriar ECG e troponina**. {q-sessp2025-001,q-tp20202-021}
- Epigastralgia com supra inferior: **IAM** e hemodinâmica. {q-sirio2021-001,q-famema2021-067}
- Jovem com troponinas normais: **investigar outras causas**. {q-iamspe2023-005}` },
        { id: "dia-ecg", titulo: "ECG: critério de supra e parede acometida", conferir: true, diretrizes: ["definicao-universal"],
          casos: ["q-unesp2026-052"],
          questoes: ["q-card-04","q-iamspe2026-004","q-famema2025-008","q-tp20212-020","q-uspsp1-066","q-sessp2023-075","q-tp20232-003","q-unesp2026-052","q-unesp2025-057","q-sessp2024-006","q-tp20212-031","q-iamspe2026-097"],
          prosa: `[[O supra conta quando está em duas derivações contíguas: ≥ 1 mm na maioria; em V2–V3, ≥ 1,5 mm na mulher, ≥ 2 mm no homem ≥ 40 anos e ≥ 2,5 mm no mais jovem; nas posteriores V7–V9, ≥ 0,5 mm.|q-famema2025-008]] [[As derivações apontam a parede e a artéria: DII, DIII e aVF = inferior (coronária direita na maioria); V1–V4 = anterior/septal (descendente anterior); V1–V6 com DI e aVL = anterior extensa; DI, aVL, V5–V6 = lateral (circunflexa, que irriga também o átrio esquerdo). No infarto inferior registram-se V3R e V4R para ver o ventrículo direito, e infra de V1–V3 sugere infarto posterior (V7–V8).|q-card-04,q-iamspe2026-004,q-tp20212-020,q-uspsp1-066,q-sessp2023-075,q-tp20232-003,q-unesp2026-052,q-iamspe2026-097]] [[O infradesnivelamento indica isquemia subendocárdica e não aponta a artéria culpada.|q-unesp2025-057,q-tp20212-031]] [[No bloqueio de ramo esquerdo o ECG fica difícil de ler: a ausência dos critérios de Sgarbossa não exclui infarto, e o quadro clínico decide.|q-sessp2024-006]]`,
          texto: `- Supra em V2–V3: **≥ 1,5 mm** na mulher; posteriores **≥ 0,5 mm**. {q-famema2025-008}
- DII, DIII e aVF: **inferior**; registrar **V3R e V4R**. {q-card-04,q-iamspe2026-004}
- Circunflexa: **átrio e ventrículo esquerdo**. {q-tp20212-020}
- V1–V6: **anterior extenso** (descendente anterior). {q-iamspe2026-097,q-uspsp1-066,q-sessp2023-075,q-tp20232-003}
- Supra inferior: **inferior**, clopidogrel 600 e angioplastia. {q-unesp2026-052}
- Infradesnível: **isquemia**, sem artéria culpada. {q-unesp2025-057}
- Infra com dor e troponina subindo: **SCA sem supra de alto risco**. {q-tp20212-031}
- BRE sem Sgarbossa: **não exclui** infarto. {q-sessp2024-006}` },
      ],
    },
    {
      id: "csst", titulo: "IAM com supradesnivelamento de ST",
      introducao: `[[Cada minuto de oclusão é miocárdio perdido: o objetivo é abrir a artéria, e a angioplastia primária é o método preferido quando o tempo do diagnóstico à passagem do fio for ≤ 120 minutos; se a transferência passar disso, faz-se fibrinólise em até 10 minutos e transfere-se para cateterismo entre 2 e 24 horas (ou de resgate, se não reperfundir).|q-001,q-card-05,q-adap25-021,q-unifesp2022-080,q-sessp2022-004,q-unesp2024-043,q-unicampdis2023-011]] [[A fibrinólise ativa o plasminogênio em qualquer coágulo: por isso sangramento intracraniano prévio, neoplasia do SNC, AVC isquêmico recente e dissecção de aorta são contraindicações absolutas.|q-famema2023-029,q-sirio2022-016,q-unicampdis2023-011]]

[[O AAS em dose de ataque mastigado (150–300 mg) reduz mortalidade e vai a todos sem contraindicação; oxigênio só se SpO2 < 90%, e nitrato e morfina aliviam sem mudar o prognóstico.|q-card-07,q-fmabc2025-005,q-sirio2022-016]]`,
      fragmentos: [
        { id: "csst-reperfusao", titulo: "Reperfusão: angioplastia ou fibrinólise", conferir: true, diretrizes: ["acc-sca","esc-sca"],
          figuras: [{ arquivo: "figuras/reperfusao.svg", legenda: "Esquema autoral: a decisão de reperfusão no IAM com supra pelo tempo até a angioplastia." }],
          casos: ["q-adap25-021"],
          questoes: ["q-001","q-card-05","q-adap25-021","q-unifesp2022-080","q-sessp2022-004","q-unesp2024-043","q-unicampdis2023-011","q-famema2023-029","q-sirio2022-016","q-fmabc2025-005","q-einstein2027-001","q-usprp2023-061","q-einstein2025-006"],
          prosa: `[[No choque cardiogênico a angioplastia da artéria culpada é feita na hora, com inotrópico e vasopressor; o balão intra-aórtico de rotina não aumentou a sobrevida.|q-einstein2027-001]] [[Supra com dor e congestão não espera troponina: vai para a hemodinâmica, e a lesão culpada recebe stent.|q-usprp2023-061,q-einstein2025-006]]`,
          texto: `- Supra com dor: **reperfusão imediata**, sem esperar troponina. {q-001,q-usprp2023-061}
- Transferência **≤ 120 min**: angioplastia primária. {q-unifesp2022-080,q-sessp2022-004}
- Transferência **> 120 min**: **fibrinólise** e cateterismo em 2–24 h. {q-card-05,q-adap25-021}
- Com hemodinâmica: AAS + **ticagrelor** e angioplastia. {q-unesp2024-043}
- AVC hemorrágico recente: **angioplastia**, nunca trombolítico. {q-unicampdis2023-011,q-sirio2022-016}
- Contraindicação absoluta: **neoplasia do SNC**. {q-famema2023-029}
- Primeiro remédio: **AAS**. {q-fmabc2025-005}
- Choque cardiogênico: **angioplastia imediata** com inotrópico. {q-einstein2027-001}
- Lesão culpada de 99% na DA: **stent**. {q-einstein2025-006}` },
        { id: "csst-vd", titulo: "Infarto de ventrículo direito", conferir: true, diretrizes: ["esc-sca"],
          questoes: ["q-adap21-119","q-usp2026-006","q-sirio2023-020","q-scmsp2022-061"],
          prosa: `[[O ventrículo direito infartado depende da pré-carga: hipotensão, turgência jugular e pulmões limpos no infarto inferior pedem volume, e nitrato, diurético e morfina podem derrubar a pressão.|q-adap21-119,q-usp2026-006,q-sirio2023-020]] [[O acometimento do VD piora o prognóstico do infarto inferior (bradiarritmias, choque).|q-scmsp2022-061]]`,
          texto: `- Hipotensão, jugular cheia, pulmão limpo: **soro fisiológico**. {q-adap21-119,q-usp2026-006}
- Evitar **nitratos** no infarto de VD. {q-sirio2023-020}
- VD associado: **pior prognóstico**. {q-scmsp2022-061}` },
      ],
    },
    {
      id: "sssst", titulo: "SCA sem supradesnivelamento de ST",
      introducao: `[[Sem oclusão total, o trombo não pede fibrinólise (que pode piorar o quadro); o tratamento é antitrombótico (AAS, inibidor de P2Y12, anticoagulante) e anti-isquêmico, e o momento do cateterismo depende do risco: muito alto (instabilidade hemodinâmica, dor refratária, arritmia grave, insuficiência cardíaca aguda) em até 2 horas; alto (troponina subindo, alteração dinâmica do ST, GRACE > 140) em até 24 horas.|q-adap22-080,q-tp20241-027,q-tp20222-021,q-famerp2022-064]]`,
      fragmentos: [
        { id: "sem-conduta", titulo: "Antitrombóticos, anti-isquêmicos e momento do cateterismo", conferir: true, diretrizes: ["acc-sca","esc-sca"],
          questoes: ["q-adap22-080","q-tp20241-027","q-tp20222-021","q-famerp2022-064","q-unesp2023-055","q-tp20261-093","q-card-07","q-iamspe2025-006"],
          prosa: `[[A nitroglicerina doa óxido nítrico, que ativa a guanilato ciclase, sobe o GMPc e relaxa a musculatura lisa venosa (reduz pré-carga) e coronária.|q-iamspe2025-006]] [[Por isso nitrato é proibido nas 24–48 horas após sildenafil, que impede a degradação do GMPc e soma hipotensão grave.|q-tp20261-093]] [[O inibidor da glicoproteína IIb/IIIa não se usa de rotina antes do cateterismo.|q-unesp2023-055]]`,
          texto: `- Troponina alta com infra: **estratégia invasiva em até 24 h**. {q-adap22-080,q-tp20241-027,q-tp20222-021}
- Sem supra: AAS, **clopidogrel**, anticoagulante e **cateterismo**. {q-famerp2022-064}
- **IIb/IIIa não de rotina**. {q-unesp2023-055}
- Sildenafil: **sem nitrato**; heparina e antiagregantes. {q-tp20261-093}
- **AAS mastigado** reduz mortalidade. {q-card-07}
- Nitroglicerina: **doadora de óxido nítrico**. {q-iamspe2025-006}` },
      ],
    },
    {
      id: "pos-iam", titulo: "Complicações e tratamento depois do infarto",
      introducao: `[[As complicações mecânicas aparecem entre o 3º e o 7º dia, quando o tecido necrótico está mais mole: ruptura de músculo papilar (sopro mitral novo e edema pulmonar, sobretudo no infarto inferior, porque o papilar posteromedial tem irrigação única), comunicação interventricular (sopro e salto de oximetria no VD) e ruptura de parede livre (tamponamento). Todas vão à cirurgia de urgência.|q-unifesp2025-021,q-tp20212-038,q-unesp2026-069]]

[[Depois do infarto, a prevenção secundária combina AAS para sempre, inibidor de P2Y12 por 12 meses após SCA (ticagrelor ou prasugrel preferidos ao clopidogrel), estatina de alta intensidade, betabloqueador (benefício firme com fração de ejeção reduzida, angina ou arritmia; com fração preservada, mantê-lo além do primeiro ano é discutível) e IECA quando a fração de ejeção cai.|q-didepm-001,q-amrigs2023-014,q-unesp2022-041,q-adap24-003,q-unifesp2024-006]]`,
      fragmentos: [
        { id: "pos-complicacoes", titulo: "Complicações mecânicas", conferir: true,
          questoes: ["q-unifesp2025-021","q-tp20212-038","q-unesp2026-069"],
          prosa: `[[Quem chega tarde, sem reperfusão, tem mais necrose transmural e mais ruptura.|q-unifesp2025-021]]`,
          texto: `- Sopro mitral novo e edema após IAM tardio: **ruptura de papilar posterior**. {q-unifesp2025-021,q-tp20212-038}
- Cirurgia de urgência: **CIV, insuficiência mitral aguda, ruptura de parede**. {q-unesp2026-069}` },
        { id: "pos-prevencao", titulo: "Prevenção secundária e antiagregação", conferir: true, diretrizes: ["acc-sca","esc-sca"],
          questoes: ["q-didepm-001","q-amrigs2023-014","q-unesp2022-041","q-adap24-003","q-unifesp2024-006","q-fmabc2025-100","q-fmabc2025-006"],
          prosa: `[[Prasugrel é contraindicado em quem teve AVC ou AIT, por sangramento; nesses o P2Y12 é o ticagrelor.|q-unesp2022-041]] [[Depois da revascularização cirúrgica por SCA, mantém-se AAS com P2Y12, estatina e IECA; no asmático grave o betabloqueador fica de fora.|q-adap24-003,q-unifesp2024-006]] [[O AAS na prevenção primária não compensa o sangramento; tem benefício claro em quem já teve evento.|q-fmabc2025-100]] [[A caminhada é exercício prático para idoso sedentário, com a frequência cardíaca acompanhada para dosar a intensidade.|q-fmabc2025-006]]`,
          texto: `- Pós-IAM com stent: **AAS + ticagrelor 12 meses**, betabloqueador, IECA, estatina. {q-didepm-001}
- Dupla antiagregação **12 meses após IAM com angioplastia**. {q-amrigs2023-014}
- AVC prévio: **ticagrelor**, não prasugrel. {q-unesp2022-041}
- Asmático grave: **sem betabloqueador**. {q-adap24-003}
- Pós-cirurgia por SCA: **AAS, clopidogrel, IECA, estatina**. {q-unifesp2024-006}
- AAS bem indicado: **infarto prévio**. {q-fmabc2025-100}
- Idoso sedentário: **caminhada** com controle da FC. {q-fmabc2025-006}` },
      ],
    },
    {
      id: "cronica", titulo: "Síndrome coronariana crônica",
      introducao: `[[Na angina estável, a placa fixa limita o fluxo só quando a demanda sobe: a dor vem no esforço e passa no repouso. O tratamento clínico otimizado (AAS, estatina de alta intensidade, betabloqueador ou antagonista de cálcio, nitrato de alívio) controla sintomas e previne eventos; a revascularização não reduziu morte nem infarto em quem tem anatomia favorável e responde ao tratamento.|q-card-08,q-unifesp2022-005,q-unesp2024-044,q-fmabc2024-008,q-sirio2025-002]] [[A revascularização ganha lugar quando a angina persiste com tratamento otimizado ou a anatomia é de alto risco: lesão de tronco, triarterial ou com disfunção ventricular, em que a cirurgia (sobretudo no diabético) prolonga a vida.|q-adap22-005,q-usprp2023-083]]`,
      fragmentos: [
        { id: "cro-conduta", titulo: "Investigar e tratar a angina estável", conferir: true, diretrizes: ["esc-scc"],
          questoes: ["q-card-08","q-adap22-005","q-unifesp2022-005","q-usprp2023-083","q-unesp2024-044","q-fmabc2024-008","q-sirio2025-002","q-usprp2022-080"],
          prosa: `[[Angina que piora em frequência e intensidade nas últimas semanas é instável (em crescendo): o risco é alto e a investigação vai direto ao cateterismo.|q-usprp2022-080]] [[Quem ainda tem angina com betabloqueador em dose baixa precisa da dose otimizada antes de pensar em outra droga, e o LDL fora da meta pede estatina de alta intensidade.|q-sirio2025-002]]`,
          texto: `- Angina estável: **tratamento clínico otimizado** e teste não invasivo. {q-card-08}
- Sem tratamento otimizado ou anatomia favorável: **otimizar**, não revascularizar. {q-unifesp2022-005,q-unesp2024-044,q-fmabc2024-008}
- Tronco, diabético: **cirurgia de revascularização**. {q-adap22-005}
- FE 30% com isquemia e multiarterial: **cirurgia**. {q-usprp2023-083}
- Angina em crescendo: **cateterismo**. {q-usprp2022-080}
- Isquemia leve: **subir o betabloqueador**, atorvastatina, AAS. {q-sirio2025-002}` },
      ],
    },
    {
      id: "diferenciais", titulo: "O que imita o infarto",
      introducao: `[[A cardiomiopatia de estresse (Takotsubo) acontece depois de emoção forte, sobretudo em mulher na pós-menopausa: a descarga de catecolaminas atordoa o ápice, que fica balonado, com dor, supra ou alteração de T e troponina, mas sem placa rota na coronariografia, e a função se recupera.|q-usprp2021-119,q-sirio2022-013]] [[A miocardite também dá dor, supra e troponina com coronárias normais; a ressonância diferencia pelo realce tardio mesocárdico ou epicárdico.|q-scmsp2026-003]] [[Dor lancinante irradiada para o dorso, com diferença de pulso ou pressão, é dissecção de aorta: antiagregar e anticoagular é perigoso; controla-se frequência e pressão (betabloqueador e vasodilatador) e confirma-se pela imagem.|q-famema2021-034]]`,
      fragmentos: [
        { id: "dif-takotsubo", titulo: "Takotsubo, miocardite e dissecção", conferir: true,
          questoes: ["q-usprp2021-119","q-sirio2022-013","q-scmsp2026-003","q-famema2021-034"],
          texto: `- Emoção forte, ápice balonado: **catecolaminas** (Takotsubo). {q-usprp2021-119}
- Takotsubo: **sem ruptura de placa** na angiografia. {q-sirio2022-013}
- Coronárias normais com supra: **ressonância** diferencia miocardite. {q-scmsp2026-003}
- Dor para o dorso: **metoprolol e nitroprussiato**, imagem da aorta. {q-famema2021-034}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `As condutas iniciais mudaram nas últimas edições, e algumas provas cobraram a anterior.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-tp20202-021","q-tp20222-021","q-unesp2024-043","q-sessp2022-004"],
          prosa: `[[O "MONA" de rotina (morfina, oxigênio, nitrato, AAS) saiu das diretrizes: oxigênio só com SpO2 < 90% e morfina só para dor refratária; provas antigas ainda o listam.|q-tp20202-021]] [[Hipotensão com má perfusão na SCA sem supra é muito alto risco (cateterismo em até 2 horas); a prova deu "até 24 horas" pelo GRACE.|q-tp20222-021]] [[O pré-tratamento com inibidor de P2Y12 antes do cateterismo é opcional no IAM com supra e desaconselhado de rotina no sem supra quando o cateterismo é precoce; a prova quis ticagrelor antes da angioplastia.|q-unesp2024-043]] [[Com 90 minutos até a hemodinâmica, a regra de 120 minutos manda transferir; a prova acrescentou enoxaparina IV, que acompanha a fibrinólise ou a angioplastia conforme o protocolo.|q-sessp2022-004]]`,
          texto: `- **MONA** de rotina saiu; a prova o listou. {q-tp20202-021}
- Hipotensão na SCA sem supra é **muito alto risco (≤ 2 h)**; a prova deu **≤ 24 h**. {q-tp20222-021}
- Pré-tratamento com P2Y12: **opcional**; a prova quis **ticagrelor** antes. {q-unesp2024-043}
- 90 min até a hemodinâmica: **transferir para angioplastia**. {q-sessp2022-004}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `O espectro da dor torácica com troponina, resumido pelos capítulos acima.`,
      fragmentos: [
        { id: "comp-espectro", titulo: "Angina, infarto e o que imita", conferir: true,
          questoes: ["q-card-06","q-famerp2025-014","q-sirio2022-013","q-iamspe2026-016"],
          prosa: `| Quadro | ECG | Troponina | Coronariografia | Conduta |
| --- | --- | --- | --- | --- |
| Angina instável | normal ou infra/T | normal | placa instável | antitrombótico, cateterismo pelo risco |
| IAM sem supra | infra ou T | alta | placa instável suboclusiva | antitrombótico, cateterismo pelo risco |
| IAM com supra | supra | alta | oclusão total | reperfusão imediata |
| Takotsubo | supra ou T | alta | sem placa rota | suporte, recupera |
| Injúria (sepse) | variável | alta | não indicada | tratar a causa |

[[Troponina alta não é sinônimo de infarto: o que define infarto é a troponina com quadro de isquemia.|q-card-06,q-famerp2025-014,q-sirio2022-013,q-iamspe2026-016]]`,
          texto: `- Angina instável: **troponina normal**. {q-card-06}
- Sepse com troponina: **injúria**. {q-famerp2025-014}
- Takotsubo: **sem placa rota**. {q-sirio2022-013}
- Dor em repouso com troponina, sem supra: **IAM sem supra**. {q-iamspe2026-016}` },
      ],
    },
  ],
});
