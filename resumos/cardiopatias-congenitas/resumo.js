/* resumos/cardiopatias-congenitas/resumo.js — resumo adaptativo de cardiopatias congênitas
   (ass-cardiopatiascongenitas): fisiologia dos shunts e da cianose, triagem neonatal (teste do
   coraçãozinho, hiperóxia), acianóticas (CIV, CIA, DSAV, PCA, Eisenmenger), obstrutivas (coarctação),
   cianóticas (Fallot e crise hipoxêmica, hipofluxo), insuficiência cardíaca no lactente, sopro
   inocente, síndromes genéticas; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- cardiopatias-congenitas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "cardiopatias-congenitas",
  titulo: "Cardiopatias congênitas",
  assunto: "ass-cardiopatiascongenitas",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "sbp-coracaozinho", texto: "Sociedade Brasileira de Pediatria — Diagnóstico precoce de cardiopatia congênita crítica: oximetria de pulso como ferramenta de triagem neonatal (2022)", lidoEm: null },
    { id: "aha-chd", texto: "AHA/ACC 2018 Guideline for the Management of Adults With Congenital Heart Disease e Park — Pediatric Cardiology for Practitioners (7.ª ed.)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-iamspe2021-043"] },
  ],
  doencas: [
    {
      id: "fisiologia", titulo: "Shunts, fluxo pulmonar e cianose",
      introducao: `[[O lado esquerdo do coração tem pressão maior: um buraco entre as câmaras (CIV, CIA, canal arterial) desvia sangue da esquerda para a direita, **aumentando o fluxo pulmonar** — sem cianose, com cansaço, taquipneia e baixo ganho de peso. A cianose aparece quando sangue venoso chega à aorta: obstrução à saída para o pulmão com um buraco (**Fallot**, hipofluxo) ou circulações trocadas. Anos de hiperfluxo endurecem as arteríolas pulmonares, a pressão do pulmão passa a da aorta, e o shunt **inverte**: **Eisenmenger**.|q-usprp2023-003,q-unesp2022-016,q-iamspe2021-041,q-iamspe2022-040]]

Veja também: **Insuficiência cardíaca**, **Valvopatias**, **Neonatologia** e **Síndromes genéticas** quando houver resumo.`,
      fragmentos: [
        { id: "fis-cianose", titulo: "Cianose e triagem no recém-nascido", conferir: true, diretrizes: ["sbp-coracaozinho"],
          figuras: [{ arquivo: "figuras/shunts.svg", legenda: "Esquema autoral: shunt esquerda-direita (hiperfluxo), Fallot (hipofluxo e cianose) e Eisenmenger (inversão)." }],
          questoes: ["q-amrigs2024-064","q-unesp2025-010","q-iamspe2022-039","q-iamspe2025-074","q-udisc20262-047","q-fmabc2022-051","q-usprp2026-041","q-iamspe2021-041","q-iamspe2022-040","q-unicampdis2025-079"],
          prosa: `[[**Teste do coraçãozinho** entre 24 e 48 horas: oximetria no membro superior direito e num inferior. Normal: ambos ≥ 95% e diferença ≤ 3%. **Alterado** (< 95% ou diferença > 3%): repetir em 1 hora; persistindo, **ecocardiograma**. Saturação ≤ 89% já é alterado: ecocardiograma imediato.|q-amrigs2024-064,q-unesp2025-010]] [[Cianose central que **piora ao choro e não melhora com oxigênio** é cardíaca: no **teste da hiperóxia**, PaO2 que não sobe acima de 150 com O2 a 100% aponta cardiopatia cianótica (estenose pulmonar grave, Fallot); na doença pulmonar ela sobe. Cianose com pulsos cheios e taquipneia é central.|q-iamspe2022-039,q-iamspe2025-074,q-udisc20262-047,q-fmabc2022-051,q-usprp2026-041]] [[Hiperfluxo pulmonar: **B2 hiperfonética** (pressão pulmonar alta) e trama vascular aumentada na radiografia.|q-iamspe2021-041,q-iamspe2022-040,q-unicampdis2025-079]]`,
          texto: `- Coraçãozinho: **< 95% ou diferença > 3%** → repetir em 1 h → eco. {q-amrigs2024-064,q-unesp2025-010}
- Cianose que **não melhora com O2**: cardíaca (hiperóxia). {q-iamspe2022-039,q-iamspe2025-074,q-udisc20262-047,q-fmabc2022-051,q-usprp2026-041}
- Hiperfluxo: **B2 alta**, trama aumentada. {q-iamspe2021-041,q-iamspe2022-040,q-unicampdis2025-079}` },
        { id: "fis-ic", titulo: "Insuficiência cardíaca no lactente e sopro inocente", conferir: true, diretrizes: ["aha-chd"],
          questoes: ["q-iamspe2021-042","q-simepm89-100","q-fmabc2023-059","q-unesp2021-009","q-usprp2027-058","q-tp20202-053","q-iamspe2025-072"],
          prosa: `[[No lactente, a insuficiência cardíaca aparece na **mamada**: cansaço, sudorese, tempo longo, vômitos, **baixo ganho de peso**; ao exame, **taquicardia, taquipneia, hepatomegalia e cardiomegalia**. Lactente "resfriado" com estertores, fígado grande e sopro: insuficiência cardíaca, não pneumonia. A pressão se mantém por um tempo graças à resposta adrenérgica.|q-iamspe2021-042,q-simepm89-100,q-fmabc2023-059,q-unesp2021-009,q-usprp2027-058]] [[**Sopro inocente**: sistólico, suave (≤ 2/6), curto, que **muda com a posição**, sem frêmito, com criança assintomática que cresce bem. Sopro com cianose, dispneia ou déficit de crescimento não é inocente.|q-tp20202-053,q-iamspe2025-072]]`,
          texto: `- Lactente: mamada difícil, **hepatomegalia, taquicardia**. {q-iamspe2021-042,q-simepm89-100,q-fmabc2023-059,q-unesp2021-009,q-usprp2027-058}
- Sopro inocente: **suave, muda com posição, criança bem**. {q-tp20202-053,q-iamspe2025-072}` },
      ],
    },
    {
      id: "acianoticas", titulo: "Acianóticas",
      introducao: `[[A CIV é a cardiopatia mais comum sem síndrome; na síndrome de Down, o **defeito do septo atrioventricular**. Quanto maior o shunt, mais cedo os sintomas e maior o risco de hipertensão pulmonar.|q-unesp2024-007,q-tp20212-059]]`,
      fragmentos: [
        { id: "aci-shunts", titulo: "CIV, CIA e Eisenmenger", conferir: true, diretrizes: ["aha-chd"],
          questoes: ["q-unesp2024-007","q-tp20212-059","q-tp20222-056","q-tp20252-048","q-fmabc2024-002","q-usprp2021-034","q-tp20251-047","q-unesp2023-070","q-unesp2021-080","q-unesp2026-068","q-usprp2023-003"],
          prosa: `[[**CIV**: sopro **holossistólico** na **borda esternal esquerda baixa**, com frêmito; a pequena faz sopro alto e ECG normal (e costuma fechar sozinha); a grande dá insuficiência cardíaca nos primeiros meses, B2 alta e cardiomegalia.|q-unesp2024-007,q-tp20212-059,q-tp20222-056,q-tp20252-048,q-fmabc2024-002]] [[**CIA**: o sopro não vem do buraco (a diferença de pressão entre átrios é pequena), mas do **hiperfluxo na valva pulmonar** — sopro sistólico suave na borda esternal esquerda **alta** e **desdobramento fixo de B2**. A do tipo **ostium secundum** fica na fossa oval; é a de evolução mais benigna, corrigida por sutura, retalho ou prótese percutânea.|q-usprp2021-034,q-tp20251-047,q-unesp2023-070,q-unesp2021-080,q-unesp2026-068]] [[Adulto com "buraquinho que ia fechar", frêmito que sumiu, e agora cianose e dispneia: o shunt inverteu — **Eisenmenger**.|q-usprp2023-003]]`,
          texto: `- CIV: **holossistólico borda esquerda baixa**. {q-tp20212-059,q-tp20222-056,q-tp20252-048,q-fmabc2024-002}
- CIA: **desdobramento fixo de B2**, borda alta; ostium secundum benigna. {q-usprp2021-034,q-tp20251-047,q-unesp2023-070,q-unesp2021-080,q-unesp2026-068}
- Frêmito sumiu + cianose: **Eisenmenger**. {q-usprp2023-003}
- Down: **DSAV**. {q-unesp2024-007}` },
        { id: "aci-coarctacao", titulo: "Coarctação da aorta", conferir: true, diretrizes: ["aha-chd"],
          questoes: ["q-unicampdis2023-026","q-usprp2022-092","q-iamspe2021-039","q-usprp2025-001"],
          prosa: `[[Estreitamento da aorta logo depois da subclávia esquerda: **PA alta nos braços, baixa nas pernas**, pulsos femorais fracos e atrasados, mãos quentes e pés frios. Complicação típica: **hipertensão arterial**. Associa-se à **valva aórtica bicúspide**. Na forma grave do recém-nascido, a falta de fluxo para baixo causa **isquemia intestinal**.|q-unicampdis2023-026,q-usprp2022-092,q-iamspe2021-039,q-usprp2025-001]]`,
          texto: `- PA braço > perna, femorais fracos: **coarctação**; HAS; bicúspide. {q-unicampdis2023-026,q-usprp2022-092,q-iamspe2021-039,q-usprp2025-001}` },
      ],
    },
    {
      id: "cianoticas", titulo: "Tetralogia de Fallot",
      introducao: `[[Fallot = **estenose pulmonar (infundibular)**, **CIV**, aorta cavalgando e **hipertrofia do ventrículo direito**. O quanto a criança é cianótica depende do grau de estenose: o sangue que não consegue ir ao pulmão vai pela CIV para a aorta.|q-tp20252-120,q-unesp2022-016,q-amrigs2024-069]]`,
      fragmentos: [
        { id: "cia-fallot", titulo: "Radiografia, crises e cócoras", conferir: true, diretrizes: ["aha-chd"],
          questoes: ["q-tp20252-120","q-unesp2022-016","q-famerp2023-030","q-amrigs2024-069","q-adap21-034","q-usprp2027-047","q-usprp2025-001"],
          prosa: `[[Radiografia com **coração em bota** (ponta elevada pelo ventrículo direito, arco pulmonar escavado) e campos pulmonares limpos (**hipofluxo**).|q-tp20252-120,q-unesp2022-016,q-famerp2023-030]] [[**Crise hipoxêmica**: o infundíbulo contrai (choro, dor, desidratação), quase nada vai ao pulmão, e o **sopro desaparece** porque o fluxo pela estenose acaba. Tratamento: **posição genupeitoral**, oxigênio, **morfina**, volume e, se refratária, **fenilefrina** (aumenta a resistência sistêmica) ou betabloqueador (relaxa o infundíbulo). A hipóxia da crise pode lesar o cérebro.|q-amrigs2024-069,q-adap21-034,q-usprp2025-001]] [[A criança maior que se põe de **cócoras** comprime as artérias das pernas, **aumenta a resistência vascular sistêmica** e empurra o sangue para o pulmão.|q-famerp2023-030,q-usprp2027-047]]`,
          texto: `- **Coração em bota**, hipofluxo. {q-tp20252-120,q-unesp2022-016,q-famerp2023-030}
- Crise: **sopro some**; joelho-peito, O2, morfina, fenilefrina. {q-amrigs2024-069,q-adap21-034,q-usprp2025-001}
- Cócoras: **↑ resistência sistêmica**. {q-usprp2027-047}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["sbp-coracaozinho"],
          questoes: ["q-amrigs2024-064","q-fmabc2022-051","q-fmabc2023-059"],
          prosa: `[[**Coraçãozinho com 89%**: a SBP 2022 considera ≤ 89% alterado com eco imediato, e 90–94% pede repetição; a amrigs2024-064 (89% e 92%) foi direto ao **ecocardiograma**.|q-amrigs2024-064]] [[**Hiperóxia com PaO2 de 96**: abaixo de 150 é cardiopatia; a fmabc2022-051 com saturação de 93% e cianose ao choro respondeu **estenose pulmonar**.|q-fmabc2022-051]] [[**Sopro diastólico mitral**: a fmabc2023-059 descreveu sopro diastólico em foco mitral (hiperfluxo pela mitral) num lactente em insuficiência cardíaca.|q-fmabc2023-059]]`,
          texto: `- 89%: a prova pediu **eco já**. {q-amrigs2024-064}
- PaO2 96: **estenose pulmonar**. {q-fmabc2022-051}
- Diastólico mitral: hiperfluxo. {q-fmabc2023-059}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: as cardiopatias mais cobradas",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-cardiopatias", titulo: "Sopro, fluxo e sinal", conferir: true,
          questoes: ["q-tp20222-056","q-usprp2021-034","q-unicampdis2023-026","q-tp20252-120"],
          prosa: `[[O sopro e o fluxo pulmonar identificam a cardiopatia.|q-tp20222-056,q-usprp2021-034,q-unicampdis2023-026,q-tp20252-120]]

| | CIV | CIA | Coarctação | Fallot |
| Cianose | não (até Eisenmenger) | não | não | sim |
| Sopro | holossistólico, BEE baixa | sistólico suave, BEE alta | sistólico no dorso | ejetivo pulmonar (some na crise) |
| Sinal | frêmito, B2 alta | desdobramento fixo de B2 | PA braço > perna | coração em bota |
| Fluxo pulmonar | aumentado | aumentado | normal | diminuído |`,
          texto: `- Holossistólico: **CIV**. {q-tp20222-056}
- Desdobramento fixo: **CIA**. {q-usprp2021-034}
- PA braço > perna: **coarctação**. {q-unicampdis2023-026}
- Bota: **Fallot**. {q-tp20252-120}` },
      ],
    },
  ],
});
