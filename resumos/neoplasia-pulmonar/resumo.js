/* resumos/neoplasia-pulmonar/resumo.js — resumo adaptativo de neoplasia pulmonar cirúrgica
   (ass-cirtorax-neoplasia): nódulo pulmonar (risco e seguimento), como obter o diagnóstico, tumor
   que imita infecção, Pancoast e Horner, síndrome da veia cava superior e massa mediastinal,
   localização pelo sinal da silhueta, estadiamento do mediastino (PET-CT, EBUS, mediastinoscopia),
   N2 e pequenas células, cirurgia, inoperável (radioterapia estereotáxica, ablação), carcinoide,
   mesotelioma e cisto broncogênico; armadilhas e tabela dos tipos histológicos.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- neoplasia-pulmonar */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "neoplasia-pulmonar",
  titulo: "Neoplasia pulmonar cirúrgica",
  assunto: "ass-cirtorax-neoplasia",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "fleischner", texto: "Fleischner Society — Guidelines for Management of Incidental Pulmonary Nodules (Radiology, 2017) e ACR Lung-RADS v2022", lidoEm: null },
    { id: "esmo-pulmao", texto: "ESMO — Early and locally advanced non-small-cell lung cancer (Ann Oncol 2025)", lidoEm: null },
    { id: "nccn", texto: "NCCN — Non-Small Cell Lung Cancer e Small Cell Lung Cancer (versões 2026)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição.", questoes: ["q-amrigs2020-031"] },
    { motivo: "Desatualizada (neoadjuvância no N2 em várias cadeias), sem reposição.", questoes: ["q-tp20222-070"] },
  ],
  doencas: [
    {
      id: "nodulo", titulo: "Nódulo pulmonar e diagnóstico",
      introducao: `[[O câncer de pulmão é a principal causa de morte por câncer, e o **tabagismo** responde pela grande maioria dos casos. Quase sempre é descoberto tarde, porque o pulmão não dói; por isso o nódulo achado ao acaso, ou no rastreamento com tomografia de baixa dose, é a chance de cura. A pergunta diante de todo nódulo é a mesma: qual a **probabilidade de ser câncer**, e qual o próximo passo que muda a conduta.|q-adap21-076,q-einstein2027-018,q-scmsp2026-008]]

Veja também: **Pleura**, **Tuberculose**, **DPOC** e **Neoplasias hematológicas**.`,
      fragmentos: [
        { id: "nod-risco", titulo: "O que torna um nódulo suspeito", conferir: true, diretrizes: ["fleischner"],
          questoes: ["q-scmsp2026-008","q-einstein2027-018"],
          prosa: `[[Aumentam a chance de câncer: idade, carga tabágica, enfisema, nódulo **maior**, **espiculado** e no **lobo superior**. A **calcificação** tranquiliza só nos padrões benignos (central, difusa, em camadas ou em "pipoca"); a **excêntrica** não exclui câncer. Gordura no nódulo sugere hamartoma.|q-scmsp2026-008,q-einstein2027-018]] [[O tempo de duplicação também conta: câncer dobra de volume em meses; o que dobra em **menos de 30 dias** costuma ser inflamação ou infecção, e o que fica igual por dois anos é benigno.|q-scmsp2026-008]]`,
          texto: `- Suspeito: **grande, espiculado, lobo superior**, fumante, enfisema; calcificação **excêntrica** não tranquiliza. {q-scmsp2026-008,q-einstein2027-018}
- Duplica em **< 30 dias**: pensar em processo benigno. {q-scmsp2026-008}` },
        { id: "nod-conduta", titulo: "Seguir, PET-CT ou biopsiar", conferir: true, diretrizes: ["fleischner"],
          casos: ["q-einstein2027-018"],
          questoes: ["q-adap21-076","q-einstein2027-018","q-einstein2023-023"],
          prosa: `[[Nódulo sólido pequeno se **acompanha com tomografia**: de **6 a 8 mm** em pessoa de alto risco, nova tomografia em **6 a 12 meses**; menor que 6 mm, pouco ou nada.|q-adap21-076]] [[Acima de **8 mm**, sobretudo com morfologia suspeita (espiculado, lobo superior, enfisema), considera-se **PET-CT, biópsia ou ambos** em vez de só esperar; nódulo periférico de **1,2 cm** em fumante pesado se esclarece com **biópsia percutânea**.|q-einstein2027-018,q-einstein2023-023]]`,
          texto: `- Sólido **6–8 mm**, alto risco: **tomografia em 6–12 meses**. {q-adap21-076}
- **> 8 mm** suspeito: **PET-CT e/ou biópsia**. {q-einstein2027-018,q-einstein2023-023}` },
        { id: "nod-biopsia", titulo: "Como obter o diagnóstico", conferir: true,
          questoes: ["q-usprp2021-076","q-amrigs2020-005","q-einstein2023-023"],
          prosa: `[[O caminho da biópsia depende de onde está a lesão: **periférica**, **punção transtorácica** guiada por tomografia; **central**, broncoscopia. Broncoscopia normal num nódulo periférico **não afasta** câncer: o broncoscópio não chega lá.|q-usprp2021-076,q-einstein2023-023]] [[Massa suspeita precisa de **diagnóstico histológico** antes de qualquer tratamento: o tipo (não pequenas células ou pequenas células) e os marcadores mudam a conduta. Não se começa quimioterapia, imunoterapia ou prova terapêutica para tuberculose sem biópsia.|q-amrigs2020-005,q-usprp2021-076]]`,
          texto: `- Periférico: **punção transtorácica**; broncoscopia negativa não afasta. {q-usprp2021-076,q-einstein2023-023}
- **Biópsia antes** de tratar. {q-amrigs2020-005,q-usprp2021-076}` },
        { id: "nod-mascara", titulo: "Câncer que se disfarça de infecção", conferir: true,
          casos: ["q-unesp2024-075","q-tp20261-102"],
          questoes: ["q-unesp2024-075","q-tp20232-067","q-tp20261-102"],
          prosa: `[[O tumor que obstrui um brônquio causa **pneumonia sempre no mesmo lugar**, que melhora e volta. Em fumante idoso com emagrecimento, **pneumonia de repetição na mesma localização** é câncer até prova em contrário: biópsia da lesão.|q-unesp2024-075]] [[Da mesma forma, lesão cavitada tratada como infecção (aspergilose, tuberculose) que **não regride** com o tratamento em fumante pesado com hemoptise e perda de peso deve ser biopsiada: a **neoplasia** escava e coloniza.|q-tp20232-067,q-tp20261-102]]`,
          texto: `- Pneumonia de repetição **no mesmo lobo**: **biópsia**. {q-unesp2024-075}
- Lesão "infecciosa" que **não regride** em fumante: **neoplasia**. {q-tp20232-067,q-tp20261-102}` },
      ],
    },
    {
      id: "clinica", titulo: "Onde o tumor está e o que ele comprime",
      introducao: `[[Os sintomas de câncer de pulmão vêm menos do tumor e mais do que ele invade ao lado: o ápice do pulmão encosta no plexo braquial e na cadeia simpática; o mediastino abriga a veia cava superior; um tumor no brônquio apaga a silhueta do coração na radiografia.|q-usprp2025-076,q-usprp2024-054,q-unicamp2023-022]]`,
      fragmentos: [
        { id: "cli-pancoast", titulo: "Tumor do sulco superior (Pancoast) e Horner", conferir: true,
          questoes: ["q-usprp2025-076","q-famema2022-035","q-udisc20262-010","q-usprp2027-035"],
          prosa: `[[O **tumor do sulco superior** (Pancoast) cresce no ápice e invade o **plexo braquial inferior** (C8–T1): **dor no ombro** que desce pela face medial do braço, que costuma ser tratada como bursite, e **atrofia dos músculos intrínsecos da mão**. Invadindo a **cadeia simpática**, dá **síndrome de Horner**: ptose, miose e anidrose do mesmo lado. Na imagem, um espessamento pleural apical com aspecto de massa.|q-usprp2025-076,q-famema2022-035,q-udisc20262-010]] [[Quase sempre é carcinoma **de não pequenas células**. A dor de invasão óssea e nervosa responde à **radioterapia**.|q-famema2022-035,q-usprp2027-035]]`,
          texto: `- Dor no ombro + mão atrófica + **Horner**: **Pancoast**. {q-usprp2025-076,q-famema2022-035,q-udisc20262-010}
- Não pequenas células; dor: **radioterapia**. {q-famema2022-035,q-usprp2027-035}` },
        { id: "cli-cava", titulo: "Síndrome da veia cava superior e massa mediastinal", conferir: true,
          questoes: ["q-usprp2024-054","q-unifesp2024-014","q-adap24-061","q-unicampdis2025-014"],
          prosa: `[[A veia cava superior tem parede fina e pressão baixa: uma massa ao lado a comprime e o sangue da cabeça não desce. Surgem **edema de face e pescoço pior ao acordar** (deitado o sangue acumula), **circulação colateral** no tórax, cefaleia e tontura ao se curvar.|q-usprp2024-054,q-unifesp2024-014,q-adap24-061]] [[No idoso fumante a causa mais comum é o câncer de pulmão; no **jovem**, uma massa do **mediastino anterior**, sobretudo **linfoma** (com febre, perda de peso e prurido). O primeiro passo é a **biópsia**, porque o tratamento depende do tipo; no linfoma, o tratamento é a **quimioterapia**, que desfaz a massa.|q-unifesp2024-014,q-adap24-061,q-unicampdis2025-014]]`,
          texto: `- Edema facial matinal + colaterais: **síndrome da veia cava superior**. {q-usprp2024-054,q-unifesp2024-014,q-adap24-061}
- Jovem com massa mediastinal anterior: **linfoma**; **biópsia** e depois quimioterapia. {q-unifesp2024-014,q-adap24-061,q-unicampdis2025-014}` },
        { id: "cli-silhueta", titulo: "Localizar pela radiografia", conferir: true,
          casos: ["q-unicamp2022-020"],
          questoes: ["q-unicamp2022-020","q-unicamp2023-022"],
          prosa: `[[Duas estruturas de mesma densidade encostadas perdem o contorno entre elas (**sinal da silhueta**). Opacidade que **apaga a borda direita do coração** está no **lobo médio**, que encosta no átrio direito; a do lobo inferior apaga o diafragma. O tumor obstrutivo à direita com esse padrão está no **brônquio do lobo médio**.|q-unicamp2022-020,q-unicamp2023-022]]`,
          texto: `- Apaga a **borda cardíaca direita**: **lobo médio**. {q-unicamp2022-020,q-unicamp2023-022}` },
      ],
    },
    {
      id: "estadiamento", titulo: "Estadiamento e quem vai para cirurgia",
      introducao: `[[O que decide se o paciente opera é o **mediastino**. Tumor sem metástase e sem linfonodo mediastinal tomado (N0 ou N1) é ressecável; com linfonodos mediastinais tomados (N2), a doença já é sistêmica, e a cirurgia sozinha não cura.|q-adap25-013,q-unifesp2025-013,q-usprp2022-036]]`,
      fragmentos: [
        { id: "est-mediastino", titulo: "PET-CT, EBUS e mediastinoscopia", conferir: true, diretrizes: ["esmo-pulmao","nccn"],
          figuras: [{ arquivo: "figuras/estadiamento-mediastino.svg", legenda: "Esquema autoral: no câncer de não pequenas células, o estado do mediastino decide entre cirurgia e tratamento não cirúrgico." }],
          casos: ["q-usprp2022-036"],
          questoes: ["q-adap25-013","q-usprp2022-036","q-unifesp2026-006","q-unifesp2024-013"],
          prosa: `[[O estadiamento começa com **PET-CT** e **ressonância do crânio**. Captação no linfonodo ao PET **não é prova**: inflamação também capta. Linfonodo aumentado ou captante, tumor **central** ou **maior que 3 cm** pedem **confirmação histológica do mediastino** antes de operar.|q-adap25-013,q-usprp2022-036,q-unifesp2024-013]] [[O primeiro método é a **punção por ultrassom endobrônquico (EBUS)**, minimamente invasiva; se vier **negativa** com suspeita alta, faz-se **mediastinoscopia**, que tira mais tecido. Só com tumor periférico pequeno e mediastino normal ao PET se opera sem essa etapa.|q-unifesp2026-006,q-usprp2022-036]]`,
          texto: `- PET captante no linfonodo: **confirmar por EBUS**, não operar nem tratar como N2 ainda. {q-adap25-013,q-unifesp2024-013}
- Tumor **> 3 cm ou central**: estadiar o mediastino. {q-usprp2022-036}
- EBUS negativo com suspeita: **mediastinoscopia**. {q-unifesp2026-006}` },
        { id: "est-n2", titulo: "N2 em várias cadeias: tratamento não cirúrgico", conferir: true, diretrizes: ["esmo-pulmao","nccn"],
          questoes: ["q-unifesp2025-013"],
          prosa: `[[Linfonodos mediastinais tomados em **mais de uma cadeia** do mesmo lado (por exemplo 4 e 7) caracterizam doença **localmente avançada**: o tratamento é **não cirúrgico** (quimiorradioterapia, seguida de imunoterapia de consolidação), não lobectomia nem pneumonectomia.|q-unifesp2025-013]]`,
          texto: `- N2 em várias cadeias: **tratamento não cirúrgico**. {q-unifesp2025-013}` },
        { id: "est-pequenas", titulo: "Pequenas células: doença sistêmica", conferir: true, diretrizes: ["nccn"],
          questoes: ["q-sirio2025-032","q-udisc20262-010"],
          prosa: `[[O carcinoma de **pequenas células** é neuroendócrino, central, cresce rápido e quase sempre já se espalhou ao diagnóstico; dá síndromes paraneoplásicas (secreção inapropriada de ADH, Lambert-Eaton por anticorpo contra canal de cálcio). O tratamento é **quimioterapia com radioterapia**; cirurgia só no tumor pequeno sem linfonodo, que é raro.|q-sirio2025-032,q-udisc20262-010]]`,
          texto: `- Pequenas células: **quimioterapia + radioterapia**, não cirurgia. {q-sirio2025-032,q-udisc20262-010}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento cirúrgico e alternativas",
      introducao: `[[No câncer de não pequenas células sem N2 e com pulmão que aguenta, a cirurgia é o tratamento com maior chance de cura. Quando o pulmão não aguenta, a radioterapia de alta precisão ou a ablação tratam o tumor sem tirar parênquima.|q-adap26-006,q-adap22-015,q-adap24-010]]`,
      fragmentos: [
        { id: "tra-ressecao", titulo: "Lobectomia com linfadenectomia", conferir: true, diretrizes: ["esmo-pulmao"],
          questoes: ["q-adap26-006","q-unifesp2022-015","q-scmsp2026-029"],
          prosa: `[[O padrão é a **lobectomia com linfadenectomia mediastinal sistemática**, por videotoracoscopia ou toracotomia, quando a função pulmonar permite (VEF1 e DLCO acima de 80% liberam). Pneumonectomia só quando o tumor exige; nódulo pequeno periférico **não** precisa de quimioterapia antes.|q-adap26-006]] [[Metástase **cerebral única já ressecada**, com tumor pulmonar ressecável e mediastino livre, ainda permite **lobectomia** com intenção curativa, seguida de tratamento adjuvante.|q-unifesp2022-015]] [[O **carcinoide** típico é de baixo grau: ressecção cirúrgica **poupando pulmão** (ressecção em manga quando central) com linfadenectomia; não se faz quimioterapia adjuvante.|q-scmsp2026-029]]`,
          texto: `- Operável, sem N2: **lobectomia + linfadenectomia mediastinal**. {q-adap26-006}
- Metástase cerebral única ressecada: ainda **lobectomia**. {q-unifesp2022-015}
- Carcinoide: **ressecção poupadora de pulmão**. {q-scmsp2026-029}` },
        { id: "tra-inoperavel", titulo: "Paciente inoperável: radioterapia estereotáxica e ablação", conferir: true, diretrizes: ["esmo-pulmao"],
          questoes: ["q-adap22-015","q-adap24-010"],
          prosa: `[[Com DPOC grave (VEF1 e DLCO perto de 30%), tirar um lobo deixaria o paciente sem fôlego. No tumor inicial (sem linfonodo), a **radioterapia estereotáxica corporal** trata com intenção curativa; a **ablação por radiofrequência** é alternativa no nódulo periférico pequeno. Quimioterapia isolada não é tratamento local.|q-adap22-015,q-adap24-010]]`,
          texto: `- Inoperável, N0: **radioterapia estereotáxica** ou **ablação**. {q-adap22-015,q-adap24-010}` },
      ],
    },
    {
      id: "outros", titulo: "Mesotelioma e lesões congênitas",
      introducao: `[[Nem toda massa no tórax é carcinoma brônquico. O mesotelioma nasce da pleura e tem uma causa ocupacional clara; o cisto broncogênico é um resto do desenvolvimento do intestino anterior.|q-scmsp2025-019,q-einstein2022-006,q-usp2023-012]]`,
      fragmentos: [
        { id: "out-mesotelioma", titulo: "Mesotelioma e amianto", conferir: true,
          questoes: ["q-scmsp2025-019","q-einstein2022-006"],
          prosa: `[[O **mesotelioma pleural** está ligado à exposição ao **amianto (asbesto)**, mesmo antiga: as fibras ficam na pleura e o tumor aparece **décadas** depois. O tabagismo soma risco ao câncer de pulmão do exposto, mas não causa mesotelioma; sílica e carvão causam outras pneumoconioses.|q-scmsp2025-019,q-einstein2022-006]]`,
          texto: `- Mesotelioma: **asbesto**, latência de décadas. {q-scmsp2025-019,q-einstein2022-006}` },
        { id: "out-cisto", titulo: "Cisto broncogênico", conferir: true,
          casos: ["q-usp2023-012"],
          questoes: ["q-usp2023-012"],
          prosa: `[[O **cisto broncogênico** é um broto anormal da árvore traqueobrônquica: imagem **arredondada, homogênea**, no mediastino médio perto da carina, em criança pouco sintomática. A malformação adenomatoide, ao contrário, fica dentro do pulmão e tem vários cistos com ar.|q-usp2023-012]]`,
          texto: `- Imagem redonda e homogênea perto da carina: **cisto broncogênico**. {q-usp2023-012}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["esmo-pulmao"],
          questoes: ["q-adap24-061","q-unifesp2024-014","q-adap24-010","q-unifesp2024-013","q-scmsp2026-008"],
          prosa: `[[**Veia cava superior no jovem**: a sequência é biópsia e depois quimioterapia. A adap24-061 perguntou o primeiro passo (**biópsia**); a unifesp2024-014, o tratamento do linfoma (**quimioterapia**).|q-adap24-061,q-unifesp2024-014]] [[**O mesmo nódulo de 15 mm, duas respostas**: com linfonodo captante ao PET, primeiro **biopsiar o mediastino** (unifesp2024-013); com mediastino limpo e paciente inoperável, tratar o tumor por **ablação** (adap24-010).|q-adap24-010,q-unifesp2024-013]] [[**Duplicação rápida**: nódulo que dobra em menos de 30 dias não é o mais suspeito; a prova (scmsp2026-008) escolheu lobo superior com calcificação excêntrica.|q-scmsp2026-008]]`,
          texto: `- VCS no jovem: **biópsia** primeiro, quimioterapia depois. {q-adap24-061,q-unifesp2024-014}
- Linfonodo captante muda a conduta: **biopsiar** × **ablação**. {q-adap24-010,q-unifesp2024-013}
- Dobrar em < 30 dias **não** é o mais suspeito. {q-scmsp2026-008}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: tipos de câncer de pulmão",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-tipos", titulo: "Onde nasce, como se comporta, como se trata", conferir: true,
          questoes: ["q-adap26-006","q-unifesp2026-006","q-sirio2025-032","q-scmsp2026-029"],
          prosa: `[[O tipo histológico decide o tratamento.|q-adap26-006,q-unifesp2026-006,q-sirio2025-032,q-scmsp2026-029]]

| Tipo | Onde | Comportamento | Tratamento do inicial |
|---|---|---|---|
| Adenocarcinoma | periferia | o mais comum, também em não fumante | lobectomia + linfadenectomia |
| Escamoso (espinocelular) | central, perto do brônquio | ligado ao fumo, pode escavar | estadiar mediastino; cirurgia se N0–N1 |
| Pequenas células | central | rápido, paraneoplásico, já disseminado | quimioterapia + radioterapia |
| Carcinoide típico | central, endobrônquico | baixo grau | ressecção poupadora de pulmão |`,
          texto: `- Adenocarcinoma: **lobectomia**. {q-adap26-006}
- Escamoso central: **estadiar o mediastino**. {q-unifesp2026-006}
- Pequenas células: **quimiorradioterapia**. {q-sirio2025-032}
- Carcinoide: **ressecção poupadora**. {q-scmsp2026-029}` },
      ],
    },
  ],
});
