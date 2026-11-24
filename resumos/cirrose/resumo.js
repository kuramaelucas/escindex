/* resumos/cirrose/resumo.js — resumo adaptativo de cirrose e complicações: diagnóstico, etiologias
   (álcool, hepatite alcoólica, esteatose, hemocromatose, Wilson, colestáticas, Budd-Chiari),
   gravidade (Child-Pugh, MELD), ascite e GASA, peritonite bacteriana espontânea, lesão renal e
   síndrome hepatorrenal, encefalopatia, hemorragia varicosa, rastreio de CHC, atresia biliar e
   tabela comparativa no fim. Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- cirrose */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "cirrose",
  titulo: "Cirrose e complicações",
  assunto: "ass-cirrose",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "baveno", texto: "Baveno VII — Renewing consensus in portal hypertension (J Hepatol 2022;76:959-974, PMC11090185)", lidoEm: "2026-11-19" },
    { id: "aasld-ascite", texto: "AASLD Practice Guidance — Diagnosis, evaluation, and management of ascites, SBP and hepatorenal syndrome (2021)", lidoEm: null },
    { id: "easl-cirrose", texto: "EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis (2018)", lidoEm: null },
    { id: "aasld-ee", texto: "AASLD/EASL — Hepatic encephalopathy in chronic liver disease (2014)", lidoEm: null },
    { id: "acg-alcool", texto: "ACG Clinical Guideline — Alcohol-associated liver disease (2024)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anulada, sem reposição", questoes: ["q-fmabc2025-017"] },
  ],
  doencas: [
    {
      id: "diagnostico", titulo: "Cirrose: o que é, causas e gravidade",
      introducao: `[[A cirrose é o fim comum da agressão crônica ao fígado: a inflamação ativa as células estreladas, que depositam colágeno em septos (fibrose) ao redor de nódulos de regeneração, e a arquitetura se perde.|q-tp20252-093,q-sirio2021-008]] [[Daí vêm os dois grupos de sinais: insuficiência hepatocelular (icterícia, albumina baixa, TP alargado, aranhas vasculares, ginecomastia e atrofia testicular pelo estrogênio não metabolizado, flapping) e hipertensão portal (esplenomegalia com plaquetopenia, ascite, varizes).|q-sirio2021-008,q-tp20232-027]]

[[A gravidade se mede pela função que sobra: Child-Pugh soma bilirrubina, albumina, tempo de protrombina, ascite e encefalopatia; o MELD usa bilirrubina, INR e creatinina (o MELD-Na acrescenta o sódio; o MELD 3.0, também albumina e sexo) e ordena a fila do transplante.|q-amrigs2022-029,q-iamspe2023-012,q-fmabc2026-030,q-unicamp2023-024]] [[O tempo de protrombina é a medida direta da síntese hepática, porque os fatores de coagulação têm meia-vida de horas.|q-iamspe2025-016]]

Veja também: **Icterícia neonatal** (atresia biliar no recém-nascido) e **Insuficiência cardíaca** (ascite cardíaca).`,
      fragmentos: [
        { id: "dia-clinica", titulo: "Quadro clínico, Child-Pugh e MELD", conferir: true,
          casos: ["q-tp20252-093"],
          questoes: ["q-tp20252-093","q-sirio2021-008","q-tp20232-027","q-tp20261-113","q-amrigs2022-029","q-iamspe2023-012","q-fmabc2026-030","q-unicamp2023-024","q-iamspe2025-016","q-fmabc2023-036"],
          texto: `- Septos fibrosos e nódulos (tricrômico): **cirrose**. {q-tp20252-093}
- Etilista com ginecomastia, atrofia testicular, esplenomegalia, flapping e plaquetopenia: **todos** achados da cirrose. {q-sirio2021-008}
- Edema e ascite com melena: **hemograma e endoscopia** (função e varizes). {q-tp20232-027,q-tp20261-113}
- Child-Pugh: **encefalopatia, ascite, bilirrubina, albumina (normal > 3,5) e TP**. {q-amrigs2022-029,q-iamspe2023-012,q-fmabc2026-030}
- MELD clássico: **bilirrubina, INR e creatinina**; MELD-Na soma o sódio, e o MELD 3.0, albumina e sexo. {q-unicamp2023-024}
- Síntese hepática: **TP/INR**. {q-iamspe2025-016}
- **TIPS** é ponte para o transplante quando o sangramento não controla. {q-fmabc2023-036}` },
        { id: "dia-causas", titulo: "Etiologias: álcool, esteatose, metabólicas, colestáticas e vasculares", conferir: true, diretrizes: ["acg-alcool"],
          questoes: ["q-sirio2024-007","q-sirio2024-008","q-simepm89-054","q-usprp2022-072","q-amrigs2025-017","q-famerp2024-067","q-sessp2024-014","q-einstein2022-015","q-didepm-011","q-unifesp2022-079","q-unifesp2023-006","q-fmabc2026-010"],
          prosa: `[[O álcool lesa mais a mitocôndria e consome o piridoxal de que a ALT depende, por isso na doença alcoólica a AST passa a ALT (razão acima de 2) e raramente passa de 300; a hepatite alcoólica grave (Maddrey ≥ 32) recebe prednisolona.|q-sirio2024-007,q-sirio2024-008,q-simepm89-054]] [[Na esteatose metabólica, ferritina discretamente alta e autoanticorpos em título baixo são comuns e não mudam o diagnóstico; o tratamento é perda de peso e exercício.|q-amrigs2025-017,q-famerp2024-067]]`,
          texto: `- Álcool: **AST/ALT > 2**. {q-sirio2024-007}
- Hepatite alcoólica grave: **prednisolona**. {q-sirio2024-008,q-simepm89-054}
- Icterícia no etilista: antes de tudo, **ultrassom** das vias biliares. {q-usprp2022-072}
- Esteatose: **ferritina e FAN/antimúsculo liso** podem vir positivos; **dieta e exercício**. {q-amrigs2025-017,q-famerp2024-067}
- Diabetes, artrite e pele bronzeada: **hemocromatose** — pedir **ecocardiograma** (miocardiopatia). {q-sessp2024-014}
- Mutação **ATP7B** (Wilson): **trientina** (ou penicilamina). {q-einstein2022-015}
- Prurido com **antimitocondrial**: colangite biliar primária, **ácido ursodesoxicólico**. {q-didepm-011}
- Fosfatase alcalina alta com **retocolite**: **colangite esclerosante primária**. {q-unifesp2022-079,q-unifesp2023-006}
- Ascite com dor em mulher usando anticoncepcional: **Budd-Chiari**. {q-fmabc2026-010}` },
      ],
    },
    {
      id: "ascite", titulo: "Ascite, peritonite e rim",
      introducao: `[[A ascite nasce da hipertensão portal: o fígado fibrosado resiste ao fluxo, o óxido nítrico dilata as arteríolas esplâncnicas, o volume arterial efetivo cai, e o rim responde ativando renina-angiotensina-aldosterona, simpático e ADH — retém sódio e água, que extravasam para o peritônio.|q-unesp2023-045,q-sessp2026-009,q-einstein2027-003]] [[A mesma vasodilatação, levada ao extremo, contrai a artéria renal e produz a síndrome hepatorrenal, uma lesão renal funcional, sem lesão estrutural, que só reverte com vasoconstritor e albumina ou transplante.|q-sessp2025-003,q-sirio2024-013,q-einstein2027-003]]

[[O líquido ascítico pobre em proteína tem pouca opsonina, e as bactérias que atravessam a parede do intestino o infectam: é a peritonite bacteriana espontânea, monobacteriana (*E. coli*, *Klebsiella*), diagnosticada por 250 ou mais neutrófilos/mm³.|q-fmabc2023-022,q-sessp2023-080,q-tp20252-038,q-scmsp2025-017]]`,
      fragmentos: [
        { id: "asc-gasa", titulo: "Paracentese diagnóstica e GASA", conferir: true, diretrizes: ["aasld-ascite"],
          questoes: ["q-uspsp2-006","q-fmabc2023-023","q-uspsp3-095","q-einstein2025-004","q-fmabc2021-028","q-sirio2024-009"],
          prosa: `O gradiente soro-ascite de albumina mede a pressão hidrostática que empurra o líquido: na hipertensão portal a pressão nos sinusoides é alta e o líquido sai pobre em albumina, e o gradiente passa de 1,1. Quando a causa é do peritônio (câncer, tuberculose) ou da albumina baixa (nefrótica), o gradiente é baixo. Toda ascite nova, que piora ou que dói pede paracentese, porque a infecção do líquido pode não ter sintoma.`,
          texto: `- GASA = albumina sérica − albumina da ascite; **≥ 1,1 g/dL = hipertensão portal**. {q-uspsp2-006}
- GASA alto: **cirrose, cardíaca, Budd-Chiari**; baixo: carcinomatose, tuberculose, nefrótica. {q-fmabc2023-023}
- Três causas possíveis (cirrose, IC, nefrótica): **ecocardiograma** e GASA. {q-uspsp3-095}
- Ascite nova, piora ou dor abdominal: **paracentese diagnóstica**. {q-einstein2025-004,q-fmabc2021-028,q-sirio2024-009}` },
        { id: "asc-tratamento", titulo: "Tratamento da ascite", conferir: true, diretrizes: ["aasld-ascite","easl-cirrose"],
          figuras: [{ arquivo: "figuras/ascite.svg", legenda: "Esquema autoral: da hipertensão portal à retenção de sódio, à ascite e à síndrome hepatorrenal." }],
          questoes: ["q-amrigs2023-012","q-usprp2023-065","q-unesp2023-045","q-adap23-006","q-sirio2024-018"],
          prosa: `[[O tratamento é restrição de sódio (cerca de 2 g/dia; água só se o sódio sérico cair muito) e diuréticos, espironolactona com furosemida na proporção de 100:40; a ascite volumosa ou refratária sai por paracentese de alívio, com albumina 6–8 g por litro quando se retiram mais de 5 litros.|q-amrigs2023-012,q-usprp2023-065,q-unesp2023-045,q-adap23-006]]`,
          texto: `- Restringir **sal**, não água de rotina; albumina se paracentese **> 5 L**. {q-amrigs2023-012}
- Diurético de escolha: **espironolactona** (ducto coletor). {q-usprp2023-065}
- Ascite tensa com sódio urinário baixo: **paracentese de alívio** e albumina. {q-unesp2023-045}
- Retirada de 7 L: **albumina 8 g/L** (≈ 56 g). {q-adap23-006}
- Hipercalemia com espironolactona e IC: **furosemida IV, suspender espironolactona**. {q-sirio2024-018}` },
        { id: "asc-pbe", titulo: "Peritonite bacteriana espontânea", conferir: true, diretrizes: ["aasld-ascite","easl-cirrose"],
          questoes: ["q-fmabc2023-022","q-sessp2023-080","q-tp20252-038","q-scmsp2025-017","q-adap22-079","q-usprp2021-104","q-sirio2024-010","q-unesp2026-051","q-tp20212-022","q-unicampdis2022-011","q-sessp2025-005","q-einstein2023-004","q-famema2022-033","q-uspsp4-108"],
          prosa: `[[O tratamento é cefalosporina de terceira geração venosa com albumina 1,5 g/kg no primeiro dia e 1 g/kg no terceiro, que reduz a síndrome hepatorrenal e a mortalidade; o betabloqueador se suspende na PBE com hipotensão ou lesão renal.|q-adap22-079,q-usprp2021-104,q-sirio2024-010,q-unesp2026-051]] Neutrófilos ≥ 250 com cultura negativa (ascite neutrocítica) tratam-se igual.`,
          texto: `- Mecanismo: **translocação bacteriana**. {q-fmabc2023-022}
- Fatores: proteína baixa na ascite, sangramento, PBE prévia — **não** hipertensão arterial. {q-sessp2023-080}
- Neutrófilos ≥ 250 e cultura com *E. coli*: **PBE**. {q-tp20252-038}
- 900 células com 30% PMN (270): **cefalosporina de 3ª geração IV**. {q-scmsp2025-017,q-unicampdis2022-011}
- **Ceftriaxona + albumina 1,5 g/kg (D1) e 1 g/kg (D3)**. {q-adap22-079,q-usprp2021-104}
- Com betabloqueador e hipotensão: **suspender o atenolol**. {q-sirio2024-010}
- Paciente de 60 kg: **90 g de albumina** no D1. {q-unesp2026-051}
- Confusão com PBE: **lactulose e cefalosporina**. {q-tp20212-022}
- Cultura negativa com PMN ≥ 250: **ascite neutrocítica**, mesmo antibiótico. {q-sessp2025-005}
- Ascite com 250+ neutrófilos e sonolência leve: **encefalopatia grau I e PBE**. {q-einstein2023-004}
- Confusão no cirrótico: **paracentese** para afastar infecção. {q-famema2022-033}
- Criança com atresia e ascite febril: **antibiótico sem esperar** o líquido. {q-uspsp4-108}` },
        { id: "asc-rim", titulo: "Lesão renal e síndrome hepatorrenal", conferir: true, diretrizes: ["aasld-ascite","easl-cirrose"],
          questoes: ["q-sessp2026-009","q-sirio2024-013","q-einstein2027-003","q-sessp2025-003","q-fmabc2021-021"],
          prosa: `[[Diante de lesão renal no cirrótico, suspendem-se diuréticos e nefrotóxicos e expande-se com albumina 1 g/kg por 2 dias (critério clássico; o consenso ADQI–ICA de 2024 dispensa as 48 h fixas e pede só a falta de resposta à expansão volêmica adequada, reavaliada em cerca de 24 h); se a creatinina não cai e não há choque, nefrotóxico nem lesão estrutural (urina e ultrassom normais), é síndrome hepatorrenal, tratada com terlipressina e albumina.|q-sessp2026-009,q-sirio2024-013,q-einstein2027-003,q-fmabc2021-021]]`,
          texto: `- Creatinina subindo com diurético: **albumina**. {q-sessp2026-009}
- Dose: **1 g/kg por 2 dias**. {q-sirio2024-013}
- Lesão renal sem outra causa: **expansão com albumina 24–48 h**. {q-einstein2027-003}
- Excluir **causa pós-renal** e estrutural antes de chamar de hepatorrenal. {q-sessp2025-003,q-fmabc2021-021}` },
      ],
    },
    {
      id: "encefalopatia", titulo: "Encefalopatia hepática",
      introducao: `[[A amônia das bactérias do cólon, que o fígado doente não transforma em ureia e que passa por shunts portossistêmicos, atravessa a barreira hematoencefálica; nos astrócitos vira glutamina, que puxa água (edema) e perturba a neurotransmissão.|q-tp20202-011,q-sirio2023-010]] [[Quase sempre há um gatilho que aumenta a amônia: sangramento digestivo, infecção (PBE), constipação, hipocalemia e alcalose (o rim produz mais amônia), desidratação por diurético, sedativos e trombose da porta.|q-sirio2021-010,q-sirio2023-010,q-famerp2026-055,q-adap21-104,q-usp2024-056]]`,
      fragmentos: [
        { id: "enc-conduta", titulo: "Graus, gatilhos e tratamento", conferir: true, diretrizes: ["aasld-ee"],
          questoes: ["q-tp20202-011","q-sirio2023-010","q-sirio2021-010","q-famerp2026-055","q-adap21-104","q-usp2024-056","q-tp20252-028","q-famema2021-024","q-famema2025-005","q-famema2023-021","q-sirio2026-011","q-fmabc2021-029"],
          prosa: `West-Haven: **I** desatenção e inversão do sono; **II** letargia, desorientação, flapping; **III** sonolência profunda e confusão grave; **IV** coma. [[O tratamento é corrigir o gatilho e dar lactulose até 2 a 3 evacuações pastosas por dia; a rifaximina entra na recorrência, e a dieta não deve restringir proteína.|q-adap21-104,q-famema2023-021,q-sirio2026-011]]`,
          texto: `- Mecanismo: **amônia** atravessa a barreira e causa **edema** e disfunção. {q-tp20202-011}
- Precipitantes: **hemorragia, PBE, constipação, trombose porta**; **hipocalemia e alcalose**. {q-sirio2021-010,q-sirio2023-010,q-famerp2026-055}
- Benzodiazepínico e constipação: **suspender, laxar, lactulose**. {q-adap21-104,q-fmabc2021-029}
- Hipocalemia: **corrigir o K**, investigar infecção, lactulose. {q-usp2024-056,q-tp20252-028}
- Achado que reforça encefalopatia: **disartria** (e flapping). {q-famema2021-024}
- Desorientação e flapping: **grau II**. {q-famema2025-005}
- Profilaxia secundária: **lactulose ± rifaximina**. {q-famema2023-021}
- Nutrição: **35–40 kcal/kg e 1,2–1,5 g/kg de proteína**. {q-sirio2026-011}` },
      ],
    },
    {
      id: "varizes", titulo: "Varizes e hemorragia digestiva",
      introducao: `[[A pressão portal acima de 10–12 mmHg abre colaterais para a circulação sistêmica, e as do esôfago distal, sob a mucosa fina, crescem e rompem; o álcool continuado é o maior preditor de crescimento.|q-fmabc2024-001,q-tp20231-069,q-tp20241-024]] [[Na hemorragia varicosa, a ordem é: via aérea e volume com alvo de hemoglobina em torno de 7, vasoconstritor esplâncnico (terlipressina, octreotida ou somatostatina) já na chegada, antibiótico profilático (ceftriaxona), e endoscopia com ligadura em até 12 horas.|q-amrigs2020-015,q-unesp2023-046,q-unesp2024-045,q-unesp2025-041]] [[Se a endoscopia falha ou não existe, o balão de Sengstaken-Blakemore segura o sangramento por até 24 horas como ponte para TIPS, com o paciente intubado.|q-tp20252-115,q-sirio2024-027,q-sessp2026-035]]`,
      fragmentos: [
        { id: "var-aguda", titulo: "Hemorragia varicosa aguda e profilaxia", conferir: false, diretrizes: ["baveno"],
          questoes: ["q-fmabc2024-001","q-tp20231-069","q-tp20241-024","q-amrigs2020-015","q-unesp2023-046","q-unesp2024-045","q-unesp2025-041","q-unicamp2022-007","q-unicampdis2023-020","q-tp20252-115","q-sirio2024-027","q-sessp2026-035","q-fmabc2023-035","q-einstein2025-023"],
          prosa: `[[Passado o sangramento, o vasoconstritor fica por 2 a 5 dias (Baveno VII) e depois a profilaxia secundária é betabloqueador não seletivo (propranolol, carvedilol) com ligadura seriada.|q-unesp2025-041,q-unicamp2022-007,q-unicampdis2023-020]]`,
          texto: `- Maior preditor de progressão das varizes: **etiologia alcoólica**. {q-fmabc2024-001}
- Melena ou hematêmese no etilista: **endoscopia digestiva alta**. {q-tp20231-069,q-tp20241-024}
- Primeiro: **via aérea e volume**. {q-amrigs2020-015}
- Choque: **cristaloide, vasoconstritor e antibiótico**. {q-unesp2023-046}
- Já com SF, antibiótico e octreotida: **manter** até a endoscopia. {q-unesp2024-045}
- Após ligadura: **vasoconstritor por 2–5 dias** (Baveno VII), depois **betabloqueador não seletivo**. {q-unesp2025-041,q-unicamp2022-007,q-unicampdis2023-020}
- Sem endoscopia terapêutica ou sangramento refratário: **balão de Sengstaken-Blakemore** (ou prótese metálica) como ponte para o TIPS. {q-tp20252-115}
- Balão: **intubar**, gástrico com cerca de 200 mL, esofágico a 40 mmHg; controla > 85%. {q-sirio2024-027,q-sessp2026-035}
- Complicações do balão: **necrose de asa nasal, isquemia e perfuração esofágica**. {q-fmabc2023-035,q-einstein2025-023}` },
      ],
    },
    {
      id: "chc-crianca", titulo: "Rastreio de hepatocarcinoma e cirrose na criança",
      introducao: `[[Todo cirrótico tem risco de carcinoma hepatocelular e faz ultrassom a cada 6 meses, com ou sem alfafetoproteína.|q-uspsp2-002]] [[Na criança, a causa mais comum de cirrose é a atresia de vias biliares: icterícia colestática com acolia depois de 2 semanas de vida; a portoenterostomia de Kasai precisa ser precoce, e quem evolui com cirrose vai para o transplante.|q-usp2025-035,q-usp2023-088]]`,
      fragmentos: [
        { id: "chc-rastreio", titulo: "Rastreio do CHC e atresia biliar", conferir: true, diretrizes: ["baveno"],
          questoes: ["q-uspsp2-002","q-usp2025-035","q-usp2023-088"],
          texto: `- Rastreio semestral: **ultrassom**, com ou sem **alfafetoproteína** (a AASLD associa a AFP). {q-uspsp2-002}
- Lactente de 4 meses com fibrose portal e trombos biliares: **atresia, transplante**. {q-usp2025-035}
- Atresia com melena e ascite: **vasoconstritor esplâncnico**. {q-usp2023-088}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A tabela resume o líquido ascítico.`,
      fragmentos: [
        { id: "comp-liquido", titulo: "Líquido ascítico lado a lado", conferir: true,
          questoes: ["q-uspsp2-006","q-tp20252-038","q-fmabc2021-021"],
          prosa: `| | Cirrose sem infecção | PBE | Peritonite secundária | Carcinomatose/tuberculose |
|---|---|---|---|---|
| GASA | **≥ 1,1** | ≥ 1,1 | geralmente < 1,1 | **< 1,1** |
| Neutrófilos/mm³ | < 250 | **≥ 250** | muito altos | linfócitos (TB) |
| Proteína | < 2,5 | baixa | **> 1 g/dL** | **> 2,5** |
| Glicose e DHL | normais | normais | **glicose < 50, DHL alta** | variáveis |
| Germes | — | **um** | **vários** | — |`,
          texto: `- GASA 2,0: **hipertensão portal**. {q-uspsp2-006}
- PMN ≥ 250 e *E. coli*: **PBE**. {q-tp20252-038}
- 150 PMN: **não é PBE**; procurar outra causa da lesão renal. {q-fmabc2021-021}` },
      ],
    },
  ],
});
