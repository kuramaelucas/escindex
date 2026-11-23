/* resumos/litiase-urinaria/resumo.js — resumo adaptativo de litíase urinária (ass-uro-litiase):
   cólica nefrética e diagnóstico (TC sem contraste, US), analgesia, terapia expulsiva, obstrução
   infectada (desobstrução urgente), rim único, tratamento intervencionista pelo tamanho e local
   (LECO, ureteroscopia, nefrolitotripsia percutânea), tipos de cálculo (cálcio, estruvita, ácido úrico)
   e investigação metabólica (hipercalciúria, hiperparatireoidismo, acidose tubular); armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- litiase-urinaria */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "litiase-urinaria",
  titulo: "Litíase urinária",
  assunto: "ass-uro-litiase",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "eau-litiase", texto: "EAU Guidelines on Urolithiasis (2024)", lidoEm: null },
    { id: "aua-litiase", texto: "AUA/Endourological Society — Surgical Management of Stones (2016, atualização 2026) e AUA Medical Management of Kidney Stones (2014/2019)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "colica", titulo: "Cólica nefrética",
      introducao: `[[O cálculo que desce pelo ureter distende a via acima dele: a cápsula renal e o ureter doem em cólica, do flanco para a virilha e o testículo ou a vulva, com náuseas e hematúria. O cálculo pequeno passa sozinho; o que muda a conduta é **obstrução com infecção**, rim único, dor que não cede ou cálculo grande.|q-tp20261-016,q-amrigs2020-093,q-uspsp2-056]]

Veja também: **Infecção urinária**, **Lesão renal aguda**, **Hiperparatireoidismo** e **Abdome agudo** quando houver resumo.`,
      fragmentos: [
        { id: "col-diagnostico", titulo: "Diagnóstico e analgesia", conferir: true, diretrizes: ["eau-litiase"],
          figuras: [{ arquivo: "figuras/litiase-conduta.svg", legenda: "Esquema autoral: a decisão diante do cálculo ureteral pelo tamanho, pela infecção e pelo rim." }],
          casos: ["q-iamspe2025-039"],
          questoes: ["q-tp20261-016","q-amrigs2020-093","q-uspsp2-056","q-tp20231-076","q-usprp2027-080","q-unesp2025-070","q-amrigs2021-009","q-unifesp2022-004","q-unesp2026-064","q-einstein2026-021","q-unicamp2022-018","q-iamspe2025-039","q-adap26-014"],
          prosa: `[[O exame de escolha é a **tomografia sem contraste** (vê quase todos os cálculos, tamanho e posição); o **ultrassom** é alternativa inicial sem radiação (gestante, criança, quadro típico), mostrando hidronefrose.|q-tp20231-076,q-usprp2027-080,q-unesp2025-070,q-uspsp2-056]] [[Analgesia: **AINE** é a primeira escolha (reduz a pressão na via e a dor), com hidratação e antiemético.|q-tp20261-016,q-amrigs2021-009,q-amrigs2020-093]] [[Cálculo ureteral **≤ 10 mm**, sem infecção, dor controlada e rim funcionante: **terapia expulsiva** com **alfabloqueador** (tansulosina), que relaxa a musculatura do ureter distal, e vigilância; duplo J só se falhar ou infectar.|q-unifesp2022-004,q-unesp2026-064,q-einstein2026-021,q-unicamp2022-018,q-iamspe2025-039,q-adap26-014]]`,
          texto: `- **TC sem contraste**; US como alternativa. {q-tp20231-076,q-usprp2027-080,q-unesp2025-070,q-uspsp2-056}
- **AINE** primeiro. {q-tp20261-016,q-amrigs2021-009,q-amrigs2020-093}
- ≤ 10 mm sem infecção: **alfabloqueador** e esperar. {q-unifesp2022-004,q-unesp2026-064,q-einstein2026-021,q-unicamp2022-018,q-iamspe2025-039,q-adap26-014}` },
        { id: "col-urgencia", titulo: "Obstrução infectada e rim único", conferir: true, diretrizes: ["eau-litiase"],
          casos: ["q-famerp2023-080"],
          questoes: ["q-adap22-004","q-tp20212-073","q-tp20232-068","q-tp20241-068","q-famerp2023-080","q-tp20202-070","q-tp20251-067","q-sessp2024-033","q-unesp2024-069","q-tp20222-071"],
          prosa: `[[Febre, leucocitose ou nitrito com **cálculo obstrutivo** é pus sob pressão: **descompressão urgente** (duplo J ou nefrostomia), hemoculturas e antibiótico venoso; o cálculo se trata depois. Antibiótico sozinho não resolve.|q-adap22-004,q-tp20212-073,q-tp20232-068,q-tp20241-068,q-famerp2023-080,q-tp20202-070,q-tp20251-067,q-sessp2024-033]] [[**Rim único** obstruído também pede desobstrução, mesmo sem dor. Cálculo grande demais para passar (1,8 cm) com dor persistente: duplo J e tratamento definitivo.|q-unesp2024-069,q-tp20222-071]]`,
          texto: `- Obstrução + infecção: **duplo J/nefrostomia + antibiótico**. {q-adap22-004,q-tp20212-073,q-tp20232-068,q-tp20241-068,q-famerp2023-080,q-tp20202-070,q-tp20251-067,q-sessp2024-033}
- Rim único; cálculo grande: **desobstruir**. {q-unesp2024-069,q-tp20222-071}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento do cálculo e prevenção",
      introducao: `[[O método é escolhido pelo tamanho e lugar: até 2 cm no rim, litotripsia extracorpórea ou ureteroscopia flexível; acima de 2 cm, **nefrolitotripsia percutânea**. E todo paciente com cálculos de repetição merece entender por que os forma.|q-unifesp2026-014,q-sirio2027-024,q-tp20252-079]]`,
      fragmentos: [
        { id: "tra-intervencao", titulo: "Qual procedimento", conferir: true, diretrizes: ["aua-litiase"],
          questoes: ["q-unifesp2026-014","q-sirio2027-024","q-simepm89-003"],
          prosa: `[[Cálculo renal **≥ 2 cm** (ou coraliforme): **nefrolitotripsia percutânea**. Até 2 cm no polo inferior, onde os fragmentos da LECO não descem bem: **ureteroscopia flexível com laser**.|q-unifesp2026-014,q-sirio2027-024,q-simepm89-003]]`,
          texto: `- ≥ 2 cm: **percutânea**; polo inferior até 2 cm: **ureteroscopia flexível**. {q-unifesp2026-014,q-sirio2027-024,q-simepm89-003}` },
        { id: "tra-metabolico", titulo: "Tipos de cálculo e investigação metabólica", conferir: true, diretrizes: ["aua-litiase"],
          casos: ["q-einstein2024-016"],
          questoes: ["q-tp20252-079","q-fmabc2021-014","q-adap26-091","q-unifesp2024-035","q-adap24-025","q-sirio2022-002","q-einstein2024-016","q-unifesp2026-091","q-didepm-017"],
          prosa: `[[Recorrência pede **imagem, análise do cálculo e urina de 24 horas**. Fatores comuns: pouca água, **muito sódio e proteína** (aumentam o cálcio urinário).|q-tp20252-079,q-fmabc2021-014]] [[**Hipercalciúria idiopática** (cálcio urinário alto, calcemia normal): **tiazídico** (aumenta a reabsorção de cálcio), menos sódio, mais água e **cálcio normal na dieta** — restringir cálcio aumenta o oxalato absorvido. Com **calcemia alta e fósforo baixo**: **hiperparatireoidismo primário**.|q-adap26-091,q-unifesp2024-035]] [[pH urinário alto fixo, citrato baixo, fosfato de cálcio e nefrocalcinose: **acidose tubular renal distal**.|q-adap24-025]] [[Bactéria produtora de **urease** (Proteus) alcaliniza a urina e precipita **estruvita** (fosfato de amônio e magnésio), formando **coraliforme**.|q-sirio2022-002,q-einstein2024-016,q-unifesp2026-091]] [[Cálculo radiotransparente com pH urinário ácido persistente: **ácido úrico** — dissolve com **citrato de potássio** (pH 6,5–7) e muita água.|q-didepm-017]]`,
          texto: `- Recorrente: **urina de 24 h**; sódio e proteína aumentam cálcio. {q-tp20252-079,q-fmabc2021-014}
- Hipercalciúria: **tiazídico, pouco sódio, cálcio normal**; Ca sérico alto: **hiperparatireoidismo**. {q-adap26-091,q-unifesp2024-035}
- pH alto fixo e nefrocalcinose: **ATR distal**. {q-adap24-025}
- **Proteus → estruvita, coraliforme**. {q-sirio2022-002,q-einstein2024-016,q-unifesp2026-091}
- Ácido úrico: **alcalinizar**. {q-didepm-017}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["eau-litiase"],
          questoes: ["q-iamspe2025-039","q-unesp2025-070","q-unicamp2022-018"],
          prosa: `[[**Corticoide na terapia expulsiva**: as diretrizes atuais recomendam só o alfabloqueador; a iamspe2025-039 incluiu **corticoide** junto do alfabloqueador e antiespasmódico.|q-iamspe2025-039]] [[**Primeiro exame**: a TC sem contraste é o padrão; a unesp2025-070, num homem com quadro típico, escolheu o **ultrassom**.|q-unesp2025-070]] [[**Internar para terapia expulsiva**: cálculo de 6 mm com dor controlada pode ir para casa; a unicamp2022-018 internou com analgesia venosa e alfabloqueador.|q-unicamp2022-018]]`,
          texto: `- A prova incluiu **corticoide**. {q-iamspe2025-039}
- A prova escolheu **US**. {q-unesp2025-070}
- Internação. {q-unicamp2022-018}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: tipos de cálculo",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-calculos", titulo: "Composição, causa e prevenção", conferir: true,
          questoes: ["q-adap26-091","q-einstein2024-016","q-didepm-017","q-adap24-025"],
          prosa: `[[A composição diz a causa.|q-adap26-091,q-einstein2024-016,q-didepm-017,q-adap24-025]]

| Cálculo | Radiografia | Causa | Prevenção |
| Oxalato de cálcio | opaco | hipercalciúria, pouca água, sódio | água, tiazídico, pouco sódio, cálcio normal |
| Fosfato de cálcio | opaco | acidose tubular distal, hiperparatireoidismo | citrato, tratar a causa |
| Estruvita | opaco, coraliforme | urease (Proteus) | remover todo o cálculo, tratar infecção |
| Ácido úrico | transparente | urina ácida, gota | alcalinizar (citrato de potássio) |`,
          texto: `- Oxalato: **tiazídico**. {q-adap26-091}
- Estruvita: **Proteus**. {q-einstein2024-016}
- Ácido úrico: **transparente, alcalinizar**. {q-didepm-017}
- Fosfato: **ATR**. {q-adap24-025}` },
      ],
    },
  ],
});
