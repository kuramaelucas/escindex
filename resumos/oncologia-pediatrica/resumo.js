/* resumos/oncologia-pediatrica/resumo.js — resumo adaptativo de tumores sólidos da infância: massa
   abdominal (Wilms × neuroblastoma), tumores ósseos (osteossarcoma), retinoblastoma, linfonodo
   cervical suspeito, e complicações do tratamento (lise tumoral, neutropenia febril) na LLA e no
   linfoma. Assunto: ass-oncopediatrica.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- oncologia-pediatrica */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "oncologia-pediatrica",
  titulo: "Tumores sólidos da infância",
  assunto: "ass-oncopediatrica",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "sobope", texto: "SOBOPE e INCA — diagnóstico precoce do câncer na criança e no adolescente; COG/SIOP — protocolos de Wilms e neuroblastoma", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "abdominais", titulo: "Massa abdominal: Wilms e neuroblastoma",
      introducao: `[[Câncer na criança é raro e se cura em mais de 70% quando descoberto cedo; a **leucemia** é o mais comum, depois os **tumores do SNC** e os sólidos extracranianos. Muitos aparecem como **massa que a mãe percebe no banho**. Os dois do abdome se separam pelo comportamento: o **Wilms** (nefroblastoma, do rim) é uma criança **bem**, de 2 a 5 anos, com massa **lisa, no flanco, que não cruza a linha média**, às vezes hematúria e **hipertensão** (renina); o **neuroblastoma** (da adrenal e da cadeia simpática) é uma criança **doente** (febre, dor óssea, irritabilidade), mais nova, com massa **irregular que cruza a linha média**, calcificações, e metástases.|q-usprp2022-082,q-famerp2022-026,q-udisc20262-058,q-usprp2026-053,q-usp2025-042,q-adap22-064]]

Veja também: **Neoplasias hematológicas** (leucemia e linfoma), **Neutropenia febril**, **Oftalmologia** (leucocoria) e **Neurocirurgia** (tumores do SNC).`,
      fragmentos: [
        { id: "abd-wilms", titulo: "Tumor de Wilms", conferir: true, diretrizes: ["sobope"],
          questoes: ["q-usprp2022-082","q-famerp2022-026","q-udisc20262-058","q-usprp2026-053","q-usp2025-042","q-unifesp2022-064","q-fmabc2023-040","q-adap23-081"],
          prosa: `[[O Wilms se associa a síndromes: **WAGR** (Wilms, aniridia, anomalias genitais, atraso), **Denys-Drash** (genitália ambígua, nefropatia) e **Beckwith-Wiedemann** (macrossomia, macroglossia, **hemi-hipertrofia**). Criança com massa no flanco, **hipospádia** e um membro maior que o outro: Wilms.|q-unifesp2022-064,q-fmabc2023-040]] [[Investigação: **ultrassonografia** (confirma origem renal e procura trombo na **veia renal e na cava**) e **tomografia de abdome e tórax** (pulmão é a metástase típica). **Não se faz biópsia percutânea** do tumor (risco de ruptura e de semear o abdome, que muda o estádio): o diagnóstico vem da nefrectomia ou da quimioterapia pré-operatória pelos achados de imagem.|q-adap23-081,q-usprp2022-082,q-usp2025-042]]`,
          texto: `- Criança bem, massa lisa no flanco que **não cruza a linha média**: **Wilms**. {q-usprp2022-082,q-famerp2022-026,q-udisc20262-058,q-usprp2026-053,q-usp2025-042}
- Com hipospádia e hemi-hipertrofia: Wilms; síndromes **WAGR, Denys-Drash, Beckwith-Wiedemann**. {q-unifesp2022-064,q-fmabc2023-040}
- USG + TC de abdome e tórax, **sem biópsia percutânea**. {q-adap23-081}` },
        { id: "abd-neuroblastoma", titulo: "Neuroblastoma", conferir: true, diretrizes: ["sobope"],
          questoes: ["q-adap22-064","q-famema2023-071"],
          prosa: `[[Pista do neuroblastoma: **equimoses periorbitárias ("olhos de guaxinim")** e proptose por **metástase na órbita** (síndrome de Hutchinson), **dor óssea** pela medula infiltrada, opsoclonia-mioclonia. Pede-se **catecolaminas urinárias (VMA e HVA)**, **cintilografia com MIBG**, **mielograma** e biópsia.|q-adap22-064,q-famema2023-071]]`,
          texto: `- Massa que cruza a linha média + olhos de guaxinim: **neuroblastoma** → **VMA/HVA, MIBG, mielograma, biópsia**. {q-adap22-064}
- Hutchinson: **metástase retro-orbitária**. {q-famema2023-071}` },
      ],
    },
    {
      id: "outros", titulo: "Osso, olho, linfonodo e as complicações do tratamento",
      introducao: `[[Dor que **acorda a criança à noite**, que não melhora em semanas e vem com aumento de volume, é tumor até prova em contrário — o trauma lembrado pela família costuma ser só o que chamou a atenção. O **osteossarcoma** é o tumor ósseo maligno do **adolescente**, na **metáfise** do fêmur distal e da tíbia proximal (joelho), com radiografia de **reação periosteal em raios de sol e triângulo de Codman**.|q-unifesp2023-081,q-usp2023-020]]`,
      fragmentos: [
        { id: "out-osso-olho-linfonodo", titulo: "Osteossarcoma, retinoblastoma e linfonodo", conferir: true, diretrizes: ["sobope"],
          questoes: ["q-unifesp2023-081","q-usp2023-020","q-sessp2024-050","q-einstein2025-035"],
          prosa: `[[O **retinoblastoma** é o tumor intraocular mais comum na infância: **leucocoria**, estrabismo; pode invadir o **nervo óptico** e chegar ao SNC. Linfonodo cervical que **cresce por semanas**, endurecido, aderido, maior que 2–3 cm, supraclavicular ou com sintomas B: **biópsia excisional** e imagem do tórax (massa mediastinal do linfoma).|q-sessp2024-050,q-einstein2025-035]]`,
          texto: `- Adolescente, dor noturna no joelho: **osteossarcoma**. {q-unifesp2023-081,q-usp2023-020}
- Retinoblastoma: **mais comum do olho**, via nervo óptico. {q-sessp2024-050}
- Linfonodo que cresce: **biópsia excisional + TC de tórax**. {q-einstein2025-035}` },
        { id: "out-complicacoes", titulo: "Lise tumoral e febre na criança com câncer", conferir: true,
          questoes: ["q-uspsp5-113","q-uspsp5-110","q-uspsp5-111","q-iamspe2023-044","q-iamspe2025-069"],
          prosa: `[[Nos tumores de **proliferação rápida** (linfoma de **Burkitt**, LLA com leucocitose), a quimioterapia rompe milhões de células: **síndrome de lise tumoral** — **hiperpotassemia, hiperfosfatemia, hipocalcemia** (o fosfato precipita o cálcio), hiperuricemia e **lesão renal**. Prevenção com hidratação vigorosa e alopurinol/rasburicase; **hipocalcemia sintomática** ou arritmia: **gluconato de cálcio** venoso.|q-uspsp5-113]] [[Criança em quimioterapia com **febre**: hemograma, PCR, **hemoculturas periférica e do cateter**, e antibiótico de amplo espectro em até 1 hora — **cefepima** (cobre *Pseudomonas*) na neutropenia febril. Na LLA, a profilaxia de **pneumocistose** é com sulfametoxazol-trimetoprima; corticoide antes do diagnóstico completo mascara a doença. Dor abdominal intensa e persistente **não** é típica do início da LLA (o típico é palidez, febre, sangramento, dor óssea, hepatoesplenomegalia).|q-uspsp5-110,q-uspsp5-111,q-iamspe2023-044,q-iamspe2025-069]]`,
          texto: `- Burkitt pós-QT, hipocalcemia: **lise tumoral** → **gluconato de cálcio**. {q-uspsp5-113}
- Febre na criança em QT: **hemoculturas e PCR**; neutropenia febril: **cefepima**. {q-uspsp5-110,q-uspsp5-111}
- LLA: profilaxia de **pneumocistose**; dor abdominal intensa não é típica. {q-iamspe2023-044,q-iamspe2025-069}` },
      ],
    },
  ],
});
