/* resumos/diabetes/resumo.js — resumo adaptativo de diabetes mellitus: fisiopatologia e classificação,
   diagnóstico, rastreio e prevenção, tratamento do DM2 (metas, metformina, iSGLT2, aGLP-1, insulina),
   insulinas, DM1 e hipoglicemia, cetoacidose (adulto e criança), estado hiperosmolar, complicações
   crônicas e tabela comparativa CAD × EHH no fim. Molde e regras: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- diabetes */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "diabetes",
  titulo: "Diabetes mellitus",
  assunto: "ass-dm",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "ada", texto: "American Diabetes Association — Standards of Care in Diabetes 2026 (Diabetes Care 2026;49 Suppl 1)", lidoEm: null },
    { id: "sbd", texto: "Sociedade Brasileira de Diabetes — Diretriz Oficial 2025", lidoEm: null },
    { id: "pcdt-dm2", texto: "Ministério da Saúde — PCDT do Diabete Melito tipo 2", lidoEm: null },
    { id: "ada-crises", texto: "ADA/EASD/JBDS/AACE/DTS — Hyperglycemic crises in adults with diabetes: a consensus report (2024; Diabetologia 2024;67:1455-1479, doi 10.1007/s00125-024-06183-8, PMC11343900)", lidoEm: "2026-11-19" },
    { id: "ispad-cad", texto: "ISPAD Clinical Practice Consensus Guidelines 2022 — Diabetic ketoacidosis and hyperglycemic hyperosmolar state", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas com reposição; as reposições (-ia) entram no resumo", questoes: ["q-unifesp2023-034","q-scmsp2022-082"] },
    { motivo: "anulada, sem reposição", questoes: ["q-fmabc2023-004"] },
    { motivo: "desatualizada (iSGLT2 no DM1), sem reposição", questoes: ["q-unesp2025-056"] },
  ],
  doencas: [
    {
      id: "fisiopatologia", titulo: "Fisiopatologia e classificação",
      introducao: `[[O diabetes tipo 1 é a destruição autoimune das células beta: o peptídeo C cai e aparecem autoanticorpos (anti-GAD, anti-insulina, anti-IA2), às vezes com outras autoimunidades, como a doença celíaca.|q-iamspe2022-042,q-amrigs2020-027]] [[O tipo 2 começa pela resistência à insulina — a gordura visceral libera ácidos graxos e citocinas (TNF-α, IL-6) que, pela proteína quinase C, reduzem a atividade tirosina-quinase do receptor — e só vira diabetes quando a célula beta não consegue mais compensar; a acantose nigricans é o sinal da resistência.|q-iamspe2025-008,q-tp20252-044]] [[O componente genético do tipo 2 é forte (concordância em gêmeos idênticos acima de 70%), e o diabetes monogênico (MODY) aparece no jovem magro, com história familiar em várias gerações e autoanticorpos negativos.|q-amrigs2020-010,q-usprp2022-099]]

[[O peptídeo C sai da pró-insulina em quantidade igual à insulina: insulina alta com peptídeo C baixo é insulina injetada; os dois altos, produção endógena (insulinoma, sulfonilureia).|q-amrigs2020-027,q-amrigs2022-012,q-unesp2021-042]]

Veja também: **Hipertensão arterial**, **Síndromes glomerulares** (nefropatia) e **Insuficiência cardíaca do adulto** (iSGLT2). A cetoacidose aparece também em **Diarreia aguda e desidratação**; a versão completa é a deste resumo.`,
      fragmentos: [
        { id: "fis-tipos", titulo: "Tipos de diabetes, peptídeo C e síndrome metabólica", conferir: true,
          questoes: ["q-iamspe2022-042","q-amrigs2020-027","q-iamspe2025-008","q-tp20252-044","q-amrigs2020-010","q-usprp2022-099","q-amrigs2022-012","q-unesp2021-042","q-fmabc2022-004","q-famerp2026-057","q-sessp2026-096"],
          texto: `- Criança com anti-GAD + (e antitransglutaminase): **DM1**, com doença celíaca associada. {q-iamspe2022-042}
- Peptídeo C: **marcador da produção endógena** de insulina. {q-amrigs2020-027,q-amrigs2022-012}
- Hipoglicemia com **insulina alta e peptídeo C baixo**: insulina **exógena** (factícia). {q-unesp2021-042}
- Resistência à insulina: **citocinas** e ativação de **PKC** reduzem a sinalização do receptor; acantose nigricans. {q-iamspe2025-008,q-tp20252-044}
- Afirmativa incorreta: concordância do DM2 em gêmeos idênticos é **alta**, não 30–40%. {q-amrigs2020-010}
- Jovem com hiperglicemia leve, sem cetose e **autoanticorpos negativos**: investigar **MODY**. {q-usprp2022-099}
- Síndrome metabólica (I Diretriz): **3 de 5** — cintura > 102/88 cm, PA ≥ 130/85, glicemia ≥ 110, TG ≥ 150, HDL < 40/50. {q-fmabc2022-004}
- Obesidade **pré-clínica**: excesso de gordura sem disfunção de órgão (nova classificação). {q-famerp2026-057}
- Perda de peso: exercício moderado com meta de **≥ 200 min por semana**. {q-sessp2026-096}` },
      ],
    },
    {
      id: "diagnostico", titulo: "Diagnóstico, rastreio e prevenção",
      introducao: `[[O diagnóstico usa os pontos em que o risco de retinopatia sobe: glicemia de jejum ≥ 126 mg/dL, glicemia 2 horas após 75 g de glicose ≥ 200, HbA1c ≥ 6,5%, ou glicemia ao acaso ≥ 200 com sintomas; fora da hiperglicemia sintomática, precisa de dois resultados alterados — dois testes diferentes na mesma amostra valem.|q-adap21-037,q-tp20232-118,q-einstein2022-007,q-tp20241-008]] [[Entre o normal e o diabetes fica o pré-diabetes (jejum 100–125, 2 h 140–199, HbA1c 5,7–6,4%), em que a mudança de estilo de vida reduz a progressão.|q-004,q-unicampdis2024-070,q-unifesp2023-036]]

[[A HbA1c reflete os últimos 2 a 3 meses, e qualquer coisa que mude a vida da hemácia (anemia, sangramento, transfusão) a falseia; quando ela discorda da glicemia, o teste oral de tolerância decide.|q-usp2025-079,q-amrigs2024-011]]`,
      fragmentos: [
        { id: "dia-criterios", titulo: "Critérios diagnósticos e rastreio", conferir: true, diretrizes: ["ada","sbd","pcdt-dm2"],
          questoes: ["q-adap21-037","q-tp20232-118","q-einstein2022-007","q-tp20241-008","q-004","q-unicampdis2024-070","q-usp2025-079","q-famema2021-029","q-fmabc2025-098","q-tp20241-118","q-scmsp2022-082-ia","q-famema2025-069","q-amrigs2020-094","q-sessp2026-088"],
          texto: `- Jejum ≥ 126 e HbA1c ≥ 6,5% **na mesma amostra**: diabetes confirmado. {q-adap21-037}
- Jejum 128, TOTG 200, HbA1c 6,4%: dois critérios → **tratar diabetes**. {q-tp20232-118}
- HbA1c **6,5%** é o achado compatível com o diagnóstico. {q-einstein2022-007}
- Sintomas com glicemia ao acaso **≥ 200**: diagnóstico na hora. {q-tp20241-008}
- Jejum 100–125 e HbA1c 5,7–6,4%: **pré-diabetes**, estilo de vida e reavaliação. {q-004,q-unicampdis2024-070}
- Glicemia isolada de 120: **TOTG** para definir. {q-famema2021-029}
- Jejum alterado com HbA1c normal após internação (hemácias jovens): **TOTG**. {q-usp2025-079}
- Insulina sérica **não** diagnostica diabetes. {q-fmabc2025-098}
- Rastreio populacional: **todos a partir de 45 anos** (ou antes com sobrepeso e fator de risco). {q-tp20241-118,q-scmsp2022-082-ia}
- Jovem assintomático com pai diabético: **glicemia de jejum** e hábitos saudáveis. {q-famema2025-069}
- Descompensação com urina alterada no idoso: procurar **infecção** como gatilho. {q-amrigs2020-094}
- Pré-diabetes no homem de 63 anos: maior risco é **cardiovascular** (e neuropatia). {q-sessp2026-088}` },
        { id: "dia-prevencao", titulo: "Prevenção do DM2", conferir: true, diretrizes: ["sbd","ada"],
          questoes: ["q-unifesp2023-036","q-sessp2022-014","q-einstein2026-013"],
          texto: `- **Mudança de estilo de vida** previne ou adia o DM2 em curto e longo prazos. {q-unifesp2023-036}
- Metformina no pré-diabetes: **< 60 anos, IMC ≥ 35, diabetes gestacional prévio, síndrome metabólica**. {q-sessp2022-014}
- aGLP-1 no pré-diabetes com obesidade: **adjuvante após falha** do estilo de vida. {q-einstein2026-013}` },
      ],
    },
    {
      id: "tratamento-dm2", titulo: "Tratamento do diabetes tipo 2",
      introducao: `[[A meta geral é HbA1c abaixo de 7%, afrouxada (até cerca de 8%) no idoso frágil, com hipoglicemias, pouca expectativa de vida ou demência, porque nele a hipoglicemia mata mais do que a hiperglicemia.|q-unifesp2023-034-ia,q-amrigs2024-011,q-adap24-046]] [[A metformina é a base: reduz a produção hepática de glicose, não causa hipoglicemia nem ganho de peso; seus efeitos são gastrointestinais no início e deficiência de B12 no uso longo, e a dose cai com a filtração baixa pelo risco de acidose láctica.|q-scmsp2022-071,q-uspsp1-064,q-uspsp1-055,q-unifesp2024-037]]

[[A segunda droga se escolhe pelo órgão: com doença cardiovascular aterosclerótica, insuficiência cardíaca ou doença renal, entram os inibidores de SGLT2 (glicosúria, natriurese, proteção renal e cardíaca) e os agonistas de GLP-1 (saciedade, esvaziamento gástrico lento, perda de peso, proteção aterosclerótica), independentemente da HbA1c.|q-scmsp2021-006,q-usprp2024-005,q-uspsp4-009,q-uspsp5-017,q-famerp2025-009]] [[A insulina entra quando a glicemia é muito alta, há catabolismo (perda de peso, sintomas) ou as orais falharam: começa-se com NPH noturna, 10 unidades ou 0,1–0,2 U/kg, titulada pela glicemia de jejum.|q-scmsp2023-097,q-usprp2026-089,q-famerp2022-060,q-einstein2027-070]]`,
      fragmentos: [
        { id: "dm2-metas", titulo: "Metas e controle no idoso e no hospital", conferir: true, diretrizes: ["sbd","ada","pcdt-dm2"],
          questoes: ["q-unifesp2023-034-ia","q-amrigs2024-011","q-fmabc2022-005","q-adap24-046","q-einstein2024-075","q-sirio2026-001","q-adap23-036"],
          prosa: `**As provas divergem na meta de HbA1c:** uma banca cobra **< 6,5%** com jejum < 100 e pós-prandial < 140 (texto antigo da SBD); as diretrizes atuais usam **< 7%** como meta geral, com jejum de 80–130 e pós-prandial < 180.`,
          texto: `- Meta geral **HbA1c < 7%**; **7,5–8%** no idoso frágil ou com comorbidade. {q-unifesp2023-034-ia,q-amrigs2024-011}
- HbA1c reflete **2 a 3 meses**. {q-amrigs2024-011}
- Idoso com DRC, emagrecendo, com hipoglicemias e HbA1c 6,1%: **suspender glibenclamida, reduzir NPH, meta ≈ 8%**. {q-adap24-046}
- Idoso com HbA1c perto da meta individual: **manter** e reforçar estilo de vida. {q-einstein2024-075}
- Internado com corticoide, sem diabetes conhecido: glicemia **antes do café e do jantar**. {q-sirio2026-001}
- Hipoglicemia por **sulfonilureia na DRC**: glicose a 10% e **observar 24–48 h**. {q-adap23-036}` },
        { id: "dm2-orais", titulo: "Metformina, iSGLT2, aGLP-1 e outros", conferir: true, diretrizes: ["sbd","ada","pcdt-dm2"],
          questoes: ["q-scmsp2022-071","q-usprp2022-002","q-tp20222-039","q-uspsp1-055","q-uspsp1-064","q-fmabc2025-010","q-adap24-069","q-unifesp2024-037","q-sirio2021-020","q-unicampdis2022-010","q-tp20231-026","q-adap24-070","q-unifesp2024-038"],
          texto: `- Metformina: efeito adverso inicial **gastrointestinal**; uso longo, **B12 baixa** (dosar). {q-scmsp2022-071,q-uspsp1-064,q-fmabc2025-010}
- Obeso com DM2 recém-diagnosticado: **metformina**. {q-usprp2022-002,q-tp20222-039,q-unicampdis2022-010}
- TFG **30–45**: reduzir metformina (acidose láctica); < 30, suspender. {q-uspsp1-055}
- Efeitos: metformina → **B12**; iSGLT2 → **cetoacidose euglicêmica** e **candidíase genital**. {q-adap24-069,q-unifesp2024-037}
- aGLP-1 e iDPP-4 são **drogas do diabetes**. {q-sirio2021-020}
- Recém-diagnosticado com glicemia moderada: **orientação nutricional** e reavaliação. {q-tp20231-026}
- **Pioglitazona contraindicada na IC** (retenção de líquido). {q-adap24-070,q-unifesp2024-038}` },
        { id: "dm2-isglt2-glp1", titulo: "iSGLT2 e agonistas de GLP-1", conferir: true, diretrizes: ["sbd", "ada"],
          questoes: ["q-unifesp2025-056", "q-adap25-056", "q-scmsp2021-006", "q-usprp2024-005", "q-usprp2026-025", "q-uspsp2-021", "q-uspsp4-009", "q-uspsp5-017", "q-scmsp2025-087", "q-sessp2024-083", "q-sessp2026-002", "q-famerp2025-009", "q-einstein2025-001", "q-tp20252-086", "q-sirio2027-017"],
          prosa: `Os inibidores de SGLT2 fazem o rim perder glicose e sódio na urina: baixam a glicemia sem hipoglicemia, reduzem a pressão intraglomerular e a congestão, e por isso protegem rim e coração. Os agonistas de GLP-1 imitam o hormônio intestinal que aumenta a insulina conforme a glicose, freia o glucagon, retarda o esvaziamento do estômago e reduz o apetite: emagrecem e protegem contra eventos ateroscleróticos. A escolha entre eles depende do órgão a proteger, não só da HbA1c.`,
          texto: `- Balanopostite com dapagliflozina e **TFG 28**: trata-se a infecção e se mantém o iSGLT2; quem sai é a **metformina** (TFG < 30). {q-unifesp2025-056}
- iSGLT2 **suspenso 3 dias antes** de cirurgia (cetoacidose euglicêmica). {q-adap25-056}
- DM2 com **IAM, DCV ou IC**: associar **iSGLT2**. {q-scmsp2021-006,q-usprp2024-005,q-usprp2026-025,q-uspsp2-021,q-uspsp4-009}
- Tabagista hipertenso de alto risco: **metformina + iSGLT2** desde o início (SBD 2025). {q-uspsp5-017}
- DM2 com albuminúria: **IECA/BRA em dose máxima + iSGLT2**. {q-scmsp2025-087}
- Obeso: **metformina + aGLP-1** (semaglutida/liraglutida). {q-sessp2024-083,q-sessp2026-002,q-famerp2025-009}
- aGLP-1: **reduz discretamente a PA sistólica**; efeitos por **retardo do esvaziamento gástrico** (náuseas, vômitos). {q-einstein2025-001,q-tp20252-086}
- Queda rápida da glicemia com aGLP-1: pode **piorar a retinopatia** — rastrear. {q-sirio2027-017}` },
        { id: "dm2-insulina", titulo: "Quando e como começar insulina no DM2", conferir: true, diretrizes: ["sbd","pcdt-dm2"],
          questoes: ["q-scmsp2023-097","q-usprp2026-089","q-tp20222-031","q-tp20231-025","q-famerp2022-060","q-einstein2027-070","q-iamspe2022-002","q-usp2024-050","q-fmabc2021-039","q-famerp2023-076","q-einstein2025-067"],
          texto: `- HbA1c ≈ 10% com orais no teto: **NPH 10 U ao deitar**, glicemia capilar, retornos breves. {q-scmsp2023-097,q-tp20231-025,q-famerp2022-060,q-einstein2027-070,q-usp2024-050}
- Catabolismo (perda de peso) e HbA1c > 10%: **suspender sulfonilureia** e iniciar **NPH + regular**. {q-usprp2026-089,q-tp20222-031}
- Descontrole em quem já tem esquema: **checar adesão e técnica** antes de subir dose. {q-iamspe2022-002}
- **Lipo-hipertrofia** (nódulos): falta de **rodízio** dos locais. {q-fmabc2021-039}
- Da bomba para o subcutâneo: dose total de 24 h dividida em **NPH e regular** (8-8-8 cada). {q-famerp2023-076}
- Hiperglicemia sem cetose ambulatorial: **regular ≈ 10% da dose total**, hidratar, reavaliar. {q-einstein2025-067}` },
      ],
    },
    {
      id: "insulinas-dm1", titulo: "Insulinas, DM1 e hipoglicemia",
      introducao: `[[O esquema basal-bolus imita o pâncreas: uma insulina basal (NPH, ou análogos sem pico como glargina e degludeca) e uma rápida (regular, ou ultrarrápidas como lispro, asparte e glulisina) antes das refeições.|q-iamspe2023-034,q-famema2025-002,q-iamspe2025-018,q-amrigs2025-005]] [[Na troca de NPH por análogo basal, reduz-se a dose em cerca de 20% e usa-se glargina ou degludeca uma vez ao dia.|q-scmsp2025-004,q-einstein2024-004]] [[O ajuste segue o horário: jejum alto pede mais NPH da noite; pós-jantar alto pede rápida antes do jantar; hipoglicemia de madrugada seguida de hiperglicemia matinal é o efeito Somogyi.|q-usprp2021-047,q-unesp2022-047,q-famema2022-090]]

[[Hipoglicemia (< 70 mg/dL) no paciente acordado se corrige pela boca com 15 g de carboidrato simples; inconsciente, glicose venosa ou glucagon.|q-usprp2023-067]]`,
      fragmentos: [
        { id: "ins-tipos", titulo: "Tipos de insulina e ajuste", conferir: true, diretrizes: ["sbd","ada"],
          casos: ["q-amrigs2025-005"],
          questoes: ["q-iamspe2023-034","q-famema2025-002","q-iamspe2025-018","q-amrigs2025-005","q-scmsp2025-004","q-einstein2024-004","q-usprp2021-047","q-unesp2022-047","q-famema2022-090"],
          texto: `- DM1: **basal + bolus**. {q-iamspe2023-034}
- **Glargina**: ação prolongada, **sem pico**, ~24 h. {q-famema2025-002,q-iamspe2025-018}
- Curvas: **lispro** (pico precoce), **NPH** (pico intermediário), **glargina** (plana). {q-amrigs2025-005}
- Trocar NPH por análogo: **glargina ou degludeca**, dose 20% menor. {q-scmsp2025-004,q-einstein2024-004}
- Jejum alto sem hipoglicemia noturna: **aumentar NPH da noite**. {q-usprp2021-047}
- Pós-jantar alto: **regular antes do jantar**. {q-unesp2022-047}
- Suor noturno e glicemia alta pela manhã: **efeito Somogyi**. {q-famema2022-090}` },
        { id: "ins-dm1", titulo: "Início do DM1 e hipoglicemia", conferir: true, diretrizes: ["sbd","ada"],
          questoes: ["q-tp20232-010","q-tp20261-010","q-tp20241-008","q-sirio2025-053","q-uspsp2-019","q-usprp2023-067"],
          texto: `- Jovem magra com glicemia 324 e sintomas: **insulina em múltiplas doses**. {q-tp20232-010,q-tp20261-010,q-tp20241-008}
- DM1 sem cetoacidose: **insulina, automonitorização, nutrição e exercício**. {q-sirio2025-053}
- Hipoglicemias graves repetidas: **bomba de insulina** (com sensor). {q-uspsp2-019}
- Hipoglicemia de 46 mg/dL, consciente: **carboidrato pela boca** (suco). {q-usprp2023-067}` },
      ],
    },
    {
      id: "crises", titulo: "Cetoacidose e estado hiperosmolar",
      introducao: `[[Sem insulina, a lipólise solta ácidos graxos que o fígado transforma em corpos cetônicos (sobretudo beta-hidroxibutirato), e o glucagon sem oposição sobe a glicose: o resultado é acidose metabólica de ânion gap aumentado, com respiração de Kussmaul e hálito cetônico.|q-scmsp2025-054,q-sirio2022-008,q-famerp2026-045,q-einstein2027-007]] [[O critério é glicemia acima de 200–250, pH abaixo de 7,3 ou bicarbonato abaixo de 15–18, e cetose; com iSGLT2, gestação ou jejum, a cetoacidose pode vir com glicemia quase normal.|q-fmabc2026-014,q-sessp2023-078,q-usprp2024-045,q-usp2024-112]]

[[O potássio total do corpo está baixo pela diurese osmótica, mesmo quando o sérico vem normal ou alto (a acidose e a falta de insulina o tiram da célula); a insulina e a correção da acidose o devolvem à célula, e por isso o potássio baixo adia a insulina.|q-famerp2022-018,q-usp2022-003,q-adap23-034,q-sessp2022-006,q-usp2026-012]] [[A ordem é: volume primeiro (soro fisiológico), depois potássio conforme o nível, depois insulina regular venosa 0,1 U/kg/h; quando a glicemia chega a 200–250, entra glicose no soro, e a insulina só para quando a acidose fecha.|q-usprp2025-066,q-iamspe2022-010,q-simepm89-043,q-sirio2023-055]]`,
      fragmentos: [
        { id: "cri-diagnostico", titulo: "Diagnóstico da cetoacidose", conferir: false, diretrizes: ["ada-crises"],
          casos: ["q-usp2026-012"],
          questoes: ["q-scmsp2025-054","q-sirio2022-008","q-famerp2026-045","q-einstein2027-007","q-fmabc2026-014","q-sessp2023-078","q-usprp2024-045","q-usp2024-112","q-usp2026-012"],
          texto: `- Mecanismo: **hipoinsulinemia → lipólise descontrolada**. {q-scmsp2025-054}
- Na chegada: **ânion gap e potássio** elevados. {q-sirio2022-008}
- Acidose metabólica de **ânion gap aumentado** (Na − Cl − HCO3). {q-famerp2026-045}
- Cetona a dosar: **beta-hidroxibutirato sérico**. {q-einstein2027-007}
- Critérios (consenso de 2024): **glicemia ≥ 200** (ou diabetes conhecido), **cetonemia ≥ 3 mmol/L** (ou cetonúria ≥ 2+) e **pH < 7,3 ou HCO3 < 18**. {q-fmabc2026-014}
- Exames: **glicemia, gasometria e cetonas**. {q-sessp2023-078}
- Euglicêmica com iSGLT2: beta-hidroxibutirato sobe **precocemente**. {q-usprp2024-045}
- Gestante com vômitos e dor abdominal: **cetoacidose** (vem com glicemia menor). {q-usp2024-112}
- ECG com **onda U**: hipocalemia → **cloreto de potássio** antes da insulina. {q-usp2026-012}` },
        { id: "cri-tratamento", titulo: "Tratamento: volume, potássio e insulina", conferir: false, diretrizes: ["ada-crises"],
          figuras: [{ arquivo: "figuras/cetoacidose.svg", legenda: "Esquema autoral: a ordem do tratamento da cetoacidose no adulto e o papel do potássio." }],
          questoes: ["q-usprp2025-066","q-iamspe2022-010","q-simepm89-043","q-famerp2022-018","q-usp2022-003","q-adap23-034","q-sessp2022-006","q-famerp2025-007","q-sessp2026-012","q-tp20212-036","q-unicampdis2024-062"],
          prosa: `O consenso do adulto de 2024 adia a insulina com K < **3,5** (repondo 10 mmol/h até subir), como o pediátrico; o corte antigo de **3,3** vem do consenso de 2009 e ainda aparece em provas (ver armadilhas). O bicarbonato só entra com **pH < 7,0**. Fosfato só se repõe quando está muito baixo (< 1 mg/dL) ou há fraqueza ou insuficiência cardíaca.`,
          texto: `- Primeiro passo: **soro fisiológico 0,9%** (15–20 mL/kg na 1ª hora) e exames. {q-usprp2025-066,q-iamspe2022-010,q-simepm89-043}
- Corrigir a acidose **baixa o potássio**. {q-famerp2022-018}
- K **< 3,5** (antigo: < 3,3): **não dar insulina** ainda; repor KCl venoso. {q-usp2022-003,q-adap23-034,q-sessp2022-006,q-tp20212-036}
- Após a expansão, com K normal ou baixo: **repor potássio**. {q-famerp2025-007,q-unicampdis2024-062}
- K normal e fosfato pouco baixo: **SF, insulina IV e potássio** — sem fosfato nem bicarbonato. {q-sessp2026-012}` },
        { id: "cri-ehh", titulo: "Estado hiperglicêmico hiperosmolar", conferir: false, diretrizes: ["ada-crises"],
          questoes: ["q-iamspe2026-100","q-unesp2026-053","q-unesp2023-053","q-tp20232-053"],
          prosa: `[[No estado hiperosmolar sobra insulina para frear a lipólise, mas não para segurar a glicose: a hiperglicemia passa de 600, a osmolalidade sobe, e o rebaixamento de consciência e a desidratação dominam, sem acidose importante.|q-iamspe2026-100,q-unesp2026-053]] A hiperviscosidade favorece trombose, e o tratamento começa com volume.`,
          texto: `- EHH: **glicemia > 600 (até > 1.000)**, sem Kussmaul, cetose leve ou ausente, **sinais neurológicos**. {q-iamspe2026-100}
- Hiperosmolaridade: risco de **trombose venosa**. {q-unesp2026-053}
- Primeiro passo: **cristaloide venoso**. {q-unesp2023-053}
- Criança com glicemia de 806 e lesão renal: **soro fisiológico, reposição lenta**. {q-tp20232-053}` },
        { id: "cri-crianca", titulo: "Cetoacidose na criança e edema cerebral", conferir: true, diretrizes: ["ispad-cad"],
          casos: ["q-usp2023-114"],
          questoes: ["q-scmsp2022-038","q-amrigs2022-065","q-amrigs2025-073","q-usp2023-113","q-usp2023-114","q-usp2025-054","q-usprp2021-037","q-tp20202-058","q-tp20222-058","q-tp20251-051","q-unesp2021-016","q-uspsp5-115","q-uspsp4-111","q-uspsp3-025","q-uspsp3-032","q-uspsp3-033","q-sirio2023-055","q-sirio2027-051","q-amrigs2023-078"],
          prosa: `[[Na criança, o grande risco é o edema cerebral, mais comum abaixo de 5 anos, na abertura do diabetes e na acidose grave; aparece nas primeiras horas do tratamento com cefaleia e rebaixamento de consciência, e por isso o déficit se repõe em 24 a 48 horas e a insulina só entra depois da primeira expansão, sem bolus.|q-scmsp2022-038,q-amrigs2022-065,q-amrigs2025-073,q-usp2023-114]] [[A cetoacidose acaba com pH acima de 7,3 e bicarbonato acima de 15 e a criança aceitando dieta: aí entra insulina subcutânea e a venosa sai depois.|q-uspsp3-025,q-uspsp4-111]]`,
          texto: `- Edema cerebral: **< 5 anos**, rebaixamento e cefaleia **nas primeiras 12 h**. {q-amrigs2022-065,q-amrigs2025-073,q-usp2023-114}
- Repor o déficit em **24–48 h**. {q-scmsp2022-038}
- Ordem: **hidratação → insulina IV + potássio**. {q-usprp2021-037,q-tp20202-058,q-tp20222-058,q-tp20251-051,q-unesp2021-016,q-usp2023-113}
- Gasometria compatível: **pH 7,08, HCO3 6, pCO2 17**. {q-usp2025-054}
- K < 3,5 após a expansão: **potássio antes da insulina**. {q-uspsp5-115}
- Glicemia 250 com acidose: **manter insulina e pôr glicose no soro**. {q-sirio2023-055,q-sirio2027-051}
- Resolvida (pH > 7,3, HCO3 > 15, aceitando dieta): **NPH, dieta, potássio oral**. {q-uspsp3-025,q-uspsp4-111}
- Criança desidratada com taquicardia e TEC alto: **choque compensado**. {q-uspsp3-032}
- Vômitos e desidratação: **expandir e medir a glicemia** (pensar em CAD). {q-uspsp3-033}
- Hipofosfatemia na correção: **insulina** leva fósforo para a célula (como na realimentação). {q-amrigs2023-078}` },
      ],
    },
    {
      id: "complicacoes", titulo: "Complicações crônicas",
      introducao: `[[A hiperglicemia crônica glica proteínas e lesa a microcirculação: retina, rim e nervos; o rastreio começa no diagnóstico do tipo 2 (e 5 anos após o do tipo 1) e se repete todo ano — fundo de olho, albuminúria e creatinina, e exame dos pés.|q-usprp2022-064,q-fmabc2021-040,q-didepm-031]] [[A neuropatia periférica perde primeiro a sensibilidade protetora (monofilamento) e a vibratória, e a autonômica dá gastroparesia e hipotensão postural.|q-didepm-031,q-sessp2026-028,q-einstein2026-015]]`,
      fragmentos: [
        { id: "com-micro", titulo: "Retina, rim, nervos e pé diabético", conferir: true, diretrizes: ["sbd","ada"],
          questoes: ["q-usprp2022-064","q-fmabc2021-040","q-adap21-047","q-uspsp4-024","q-didepm-031","q-unesp2024-057","q-sessp2026-028","q-einstein2026-015","q-iamspe2026-029"],
          texto: `- Rastreio anual: **fundo de olho, albuminúria, ECG**. {q-usprp2022-064,q-fmabc2021-040}
- Edema macular central: **anti-VEGF intravítreo**. {q-adap21-047}
- Albuminúria no DM1 hipertenso: **BRA** (valsartana) ou IECA. {q-uspsp4-024}
- Monofilamento não sentido: **perda da sensibilidade protetora**, cuidado dos pés. {q-didepm-031}
- Dor neuropática: **gabapentinoide ou antidepressivo dual**. {q-unesp2024-057}
- Gastroparesia: disfunção **autonômica vagal**. {q-sessp2026-028}
- Tontura ao levantar com neuropatia: **hipotensão ortostática neurogênica**. {q-einstein2026-015}
- Pé infectado grave: **internar, antibiótico IV, cirurgia, insulina**, suspender BRA na lesão renal. {q-iamspe2026-029}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-fmabc2022-005"],
          texto: `- Meta atual: **HbA1c < 7%**, jejum 80–130, pós-prandial < 180; um gabarito usa a meta antiga da SBD (**< 6,5%**, jejum < 100, pós < 140). {q-fmabc2022-005}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A tabela resume o capítulo de crises.`,
      fragmentos: [
        { id: "comp-crises", titulo: "Cetoacidose × estado hiperosmolar", conferir: true,
          questoes: ["q-iamspe2026-100","q-unesp2026-053"],
          prosa: `| | Cetoacidose | Estado hiperosmolar |
|---|---|---|
| Quem | DM1, jovem (também DM2 e iSGLT2) | DM2, idoso |
| Instalação | horas a 1 dia | dias a semanas |
| Glicemia | > 250 (pode ser normal com iSGLT2) | **> 600** |
| pH e bicarbonato | **< 7,3 e < 15–18** | > 7,3 e > 18 |
| Cetonas | **altas** | ausentes ou leves |
| Osmolalidade | variável | **> 320** |
| Respiração | **Kussmaul** | normal |
| Consciência | preservada ou rebaixada | **rebaixada** |`,
          texto: `- EHH: glicemia muito alta, **respiração normal**, cetose leve, sinais neurológicos. {q-iamspe2026-100}
- pH 7,36 com Na 154 e confusão: **EHH**. {q-unesp2026-053}` },
      ],
    },
  ],
});
