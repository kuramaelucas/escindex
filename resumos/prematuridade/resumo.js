/* resumos/prematuridade/resumo.js — resumo adaptativo de complicações da prematuridade e distúrbios
   metabólicos do recém-nascido: classificação, hemorragia peri-intraventricular, retinopatia, apneia,
   seguimento (vacina, ferro, crescimento), hipoglicemia e filho de mãe diabética, hipocalcemia e doença
   hemorrágica do RN. Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- prematuridade */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "prematuridade",
  titulo: "Prematuridade e distúrbios metabólicos do recém-nascido",
  assunto: "ass-neo-prematuridade",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "sbp-seguimento-prematuro", texto: "Sociedade Brasileira de Pediatria — Seguimento ambulatorial do prematuro de risco (manual)", lidoEm: null },
    { id: "sbp-rop", texto: "Sociedade Brasileira de Pediatria / CBO — Diretrizes de triagem da retinopatia da prematuridade", lidoEm: null },
    { id: "sbp-hipoglicemia", texto: "Sociedade Brasileira de Pediatria — Hipoglicemia neonatal (documento científico) e AAP — Postnatal glucose homeostasis (2011)", lidoEm: null },
    { id: "sbp-ferro", texto: "Sociedade Brasileira de Pediatria — Consenso sobre anemia ferropriva (2021)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada: sem gabarito para medir o erro", questoes: ["q-famerp2026-035"] },
  ],
  doencas: [
    {
      id: "complicacoes", titulo: "O prematuro e suas complicações",
      introducao: `[[Pré-termo é o recém-nascido com menos de 37 semanas de gestação.|q-iamspe2021-047]] Quanto mais cedo nasce, mais órgãos ainda estão em formação, e cada complicação é a consequência de um órgão imaturo.

[[Na hemorragia peri-intraventricular, os vasos da matriz germinativa, ao lado dos ventrículos, são frágeis e não regulam o próprio fluxo: variações de pressão os rompem, sobretudo nos primeiros dias. Corticoide antenatal, ventilação não invasiva e manuseio mínimo a previnem, e o ultrassom transfontanelar a procura.|q-unesp2023-019,q-unifesp2023-068,q-famema2021-094]] [[Na retinopatia, a retina vascularizada pela metade cresce vasos anormais quando o oxigênio oscila; a cegueira vem do descolamento da retina, e a triagem com fundo de olho começa com 4 semanas de vida.|q-fmabc2022-060,q-adap23-068]] [[A apneia da prematuridade vem do centro respiratório imaturo, pouco sensível ao gás carbônico; a cafeína aumenta essa sensibilidade e estimula o diafragma.|q-iamspe2026-063,q-didepm-029]]

Veja também: **Anemias** (profilaxia de ferro, completa lá), **Desconforto respiratório do recém-nascido** e **Reanimação neonatal**.`,
      fragmentos: [
        { id: "com-sistemas", titulo: "Pulmão, cérebro, olho e respiração", conferir: true, diretrizes: ["sbp-rop"],
          questoes: ["q-iamspe2021-047","q-uspsp1-021","q-uspsp1-022","q-unesp2023-019","q-unifesp2023-068","q-famema2021-094","q-fmabc2022-060","q-adap23-068","q-iamspe2026-063","q-didepm-029","q-unesp2025-003","q-tp20231-060"],
          casos: ["q-unesp2023-019","q-tp20231-060"],
          prosa: `Cada órgão do prematuro falha conforme a etapa em que parou: o pulmão sem surfactante colapsa; a matriz germinativa, rede de vasos frágeis junto aos ventrículos, sangra com as variações de pressão; a retina, ainda sem vasos completos, cresce vasos anormais sob oxigênio; e o centro respiratório imaturo para de comandar a respiração (apneia). O corticoide antenatal amadurece pulmão e vasos ao mesmo tempo.`,
          texto: `- Pré-termo: **< 37 semanas** (OMS). {q-iamspe2021-047}
- Prematuro extremo: **corticoide antenatal**, reanimação sem hipotermia, ventilação adequada e **surfactante precoce** previnem a **síndrome do desconforto respiratório**. {q-uspsp1-021,q-uspsp1-022}
- **Hemorragia da matriz germinativa**: vasos subependimários frágeis; pesquisar com **ultrassom transfontanelar**. {q-unesp2023-019,q-unifesp2023-068}
- Prevenção da hemorragia: **corticoide antenatal**, **ventilação não invasiva** e **manuseio mínimo**. {q-famema2021-094}
- Retinopatia: cegueira por **descolamento da retina**; triagem de quem nasceu com **≤ 32 semanas ou ≤ 1.500 g**; 1º fundo de olho entre **4 e 6 semanas de vida** (repetir a cada 1 a 2 semanas). {q-fmabc2022-060,q-adap23-068}
- Apneia da prematuridade: **citrato de cafeína** (ataque 20 mg/kg, manutenção 5 a 10 mg/kg/dia). {q-iamspe2026-063,q-didepm-029}
- Transferência: só após **vaga, consentimento e estabilização**. {q-unesp2025-003}
- Hérnia inguinal encarcerada no prematuro: **reduzir manualmente** e operar quando estiver estável. {q-tp20231-060}` },
        { id: "com-seguimento", titulo: "Seguimento: vacina, ferro e crescimento", conferir: true, diretrizes: ["sbp-seguimento-prematuro","sbp-ferro"],
          questoes: ["q-amrigs2024-063","q-fmabc2024-046","q-usp2026-052"],
          casos: ["q-usp2026-052"],
          prosa: `O sistema imune responde à idade cronológica, e por isso as vacinas não esperam a idade corrigida; já o crescimento e o desenvolvimento se comparam pela idade corrigida até cerca de 2 anos. O prematuro nasce com pouco ferro, porque a maior parte é transferida no último trimestre.`,
          texto: `- Vacinas pela **idade cronológica** (não pela corrigida), exceto a BCG pelo peso. {q-amrigs2024-063}
- Ferro (SBP) no prematuro acima de 1.500 g: **2 mg/kg/dia a partir de 30 dias** até 1 ano, depois 1 mg/kg/dia. {q-fmabc2024-046}
- Crescimento avaliado em **curvas próprias** (idade corrigida); ganho adequado, manter aleitamento e seguimento mensal. {q-usp2026-052}` },
      ],
    },
    {
      id: "metabolicos", titulo: "Hipoglicemia, cálcio e vitamina K",
      introducao: `[[No feto, a glicose vem da mãe; ao cortar o cordão, o recém-nascido precisa produzir a sua, e as primeiras horas são de queda fisiológica. O filho de mãe diabética nasce com o pâncreas acostumado a muita glicose e segue secretando insulina demais: a hipoglicemia vem do hiperinsulinismo.|q-unicamp2023-044,q-tp20231-038,q-uspsp4-105]] [[A mãe que recebeu terbutalina (beta-agonista) também estimula a insulina fetal.|q-unicamp2023-044]]

[[Os sinais de hipoglicemia são inespecíficos — tremores, palidez, cianose, hipotonia, convulsão —, e por isso se mede a glicemia nos bebês de risco desde a primeira hora; o assintomático com valor limítrofe mama e é reavaliado, e o sintomático recebe glicose na veia.|q-iamspe2021-046,q-famema2022-082,q-unicampdis2025-028,q-uspsp1-018]]`,
      fragmentos: [
        { id: "met-glicose", figuras: [{ arquivo: "figuras/hipoglicemia.svg", legenda: "Esquema autoral: o que fazer com a glicemia baixa no bebê assintomático e no sintomático." }], titulo: "Hipoglicemia neonatal", conferir: true, diretrizes: ["sbp-hipoglicemia"],
          questoes: ["q-unicamp2023-044","q-tp20231-038","q-uspsp4-105","q-iamspe2021-046","q-famema2022-082","q-unicampdis2025-028","q-uspsp1-018","q-tp20252-025","q-einstein2021-030"],
          prosa: `O feto recebe glicose contínua da mãe; ao nascer, precisa produzir a sua. O filho de mãe diabética tem insulina alta (o pâncreas respondeu à glicose materna), e o prematuro e o pequeno para a idade têm pouco glicogênio: os três fazem hipoglicemia nas primeiras horas, muitas vezes sem sintomas, e por isso a glicemia é medida desde cedo.`,
          texto: `- Filho de mãe diabética ou mãe com terbutalina: **hiperinsulinismo**. {q-unicamp2023-044}
- Bebê de risco (mãe diabética, grande ou pequeno para a idade, prematuro): **glicemia desde a 1ª hora** até o 2º dia. {q-tp20231-038}
- Sinais: **tremores e convulsões** (também palidez, cianose, hipotonia). {q-iamspe2021-046}
- **Assintomático** com valor baixo: **mamar** (ou gel de dextrose) e repetir em 30 a 60 minutos; seguindo baixa, glicose na veia. {q-uspsp4-105,q-uspsp1-018,q-tp20252-025}
- **Sintomático**: **bolus de SG 10% 2 mL/kg** e soro de manutenção. {q-famema2022-082,q-unicampdis2025-028}
- Macrossomia de mãe diabética: complicação esperada, **cardiomiopatia hipertrófica** (septal). {q-einstein2021-030}` },
        { id: "met-calcio-k", titulo: "Hipocalcemia e doença hemorrágica do RN", conferir: true,
          questoes: ["q-usp2024-014","q-scmsp2025-052"],
          prosa: `O cálcio vinha da placenta e cai depois do parto, mais no prematuro e no filho de mãe diabética. A vitamina K quase não passa pela placenta e o leite materno tem pouca: sem a dose ao nascer, os fatores dependentes dela caem e o bebê sangra.`,
          texto: `- Prematuro extremo que convulsiona com glicemia normal: **hipocalcemia**; **gluconato de cálcio 10% IV**, dose pelo peso (a questão usa 0,8 mL para 800 g). {q-usp2024-014}
- Doença hemorrágica do RN (falta de **vitamina K**): a forma **clássica** ocorre em RN saudáveis, com sangramento de pele ou digestivo; previne-se com **vitamina K ao nascer**. {q-scmsp2025-052}` },
      ],
    },
  ],
});
