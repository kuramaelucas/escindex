/* resumos/doencas-osteometabolicas/resumo.js — resumo adaptativo de doenças osteometabólicas e
   displasias (ass-orto-osteometabolicas): osteoporose (remodelação, causas secundárias, inibidor de
   aromatase, densitometria e T-score, fratura por fragilidade, bisfosfonato oral e venoso,
   osteonecrose da mandíbula, raloxifeno, denosumabe, vitamina D), osteonecrose da cabeça do fêmur,
   osteogênese imperfeita e osteocondroma; armadilhas e tabela dos tratamentos.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- doencas-osteometabolicas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "doencas-osteometabolicas",
  titulo: "Osteoporose e doenças osteometabólicas",
  assunto: "ass-orto-osteometabolicas",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "pcdt-osteoporose", texto: "Ministério da Saúde — PCDT de Osteoporose (2022/2023); FEBRASGO e SBEM — diretrizes de osteoporose pós-menopausa", lidoEm: null },
    { id: "aace-osteoporose", texto: "AACE/ACE 2020 e Endocrine Society 2019/2020 — tratamento farmacológico da osteoporose pós-menopausa", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição.", questoes: ["q-sessp2023-046"] },
  ],
  doencas: [
    {
      id: "osteoporose", titulo: "Osteoporose",
      introducao: `[[O osso se renova sempre: **osteoclastos** reabsorvem e **osteoblastos** formam. Depois da **menopausa**, sem estrogênio, a reabsorção acelera e a massa cai mais nos primeiros anos; o osso fica poroso e frágil, e a primeira manifestação costuma ser uma **fratura por queda da própria altura** (punho, vértebra, quadril).|q-iamspe2021-005,q-tp20232-020,q-usprp2027-087]]

Veja também: **Climatério**, **Fraturas e luxações**, **Câncer de mama** (inibidor de aromatase) e **Doença renal crônica** (osteodistrofia).`,
      fragmentos: [
        { id: "ost-risco", titulo: "Causas secundárias e fatores de risco", conferir: true, diretrizes: ["pcdt-osteoporose"],
          questoes: ["q-iamspe2021-005","q-usp2024-099"],
          prosa: `[[A principal causa **secundária** é o **glicocorticoide**: cerca de 30% de quem o usa por mais de seis meses tem fratura. São fatores de risco ainda sexo feminino, baixo peso, tabagismo, sedentarismo e menopausa precoce; obesidade protege.|q-iamspe2021-005]] [[O **inibidor de aromatase** (câncer de mama) zera o estrogênio e acelera a perda óssea; previne-se com **bisfosfonato**, cálcio e vitamina D.|q-usp2024-099]]`,
          texto: `- Causa secundária principal: **glicocorticoide**. {q-iamspe2021-005}
- Inibidor de aromatase: **bisfosfonato**. {q-usp2024-099}` },
        { id: "ost-diagnostico", titulo: "Densitometria e fratura por fragilidade", conferir: true, diretrizes: ["pcdt-osteoporose"],
          figuras: [{ arquivo: "figuras/t-score.svg", legenda: "Esquema autoral: classificação densitométrica e o diagnóstico clínico pela fratura por fragilidade." }],
          questoes: ["q-unifesp2022-083","q-sessp2026-079","q-tp20232-020","q-sirio2024-014","q-unesp2024-038","q-unesp2026-039"],
          prosa: `[[O **T-score** compara a densidade com a do adulto jovem e expressa **risco relativo**: cada desvio-padrão abaixo aumenta o risco de fratura. **Osteoporose**: T **≤ −2,5** em coluna lombar, colo ou fêmur total (basta um sítio); **osteopenia**: entre −1,0 e −2,5, já com risco maior que o normal.|q-sessp2026-079,q-sirio2024-014,q-unesp2024-038,q-unesp2026-039]] [[A osteoporose também se diagnostica **sem densitometria**, pela **fratura por fragilidade** de **quadril ou vértebra** (em outros sítios, como punho e úmero, com densitometria de osteopenia). Mulher com fratura por queda e cifose dolorosa faz **densitometria** para quantificar e acompanhar.|q-unifesp2022-083,q-tp20232-020]]`,
          texto: `- **T ≤ −2,5** em um sítio = osteoporose; T-score = **risco relativo**. {q-sessp2026-079,q-sirio2024-014,q-unesp2026-039}
- Osteopenia já tem risco maior. {q-unesp2024-038}
- **Fratura por fragilidade** diagnostica; densitometria quantifica. {q-unifesp2022-083,q-tp20232-020}` },
        { id: "ost-bisfosfonato", titulo: "Bisfosfonatos", conferir: true, diretrizes: ["pcdt-osteoporose","aace-osteoporose"],
          questoes: ["q-adap22-083","q-uspsp2-028","q-usprp2027-087","q-unesp2026-048","q-usp2025-008"],
          prosa: `[[O **bisfosfonato** se fixa no osso e inibe o osteoclasto: é a primeira linha (**alendronato 70 mg semanal**, com cálcio e vitamina D). Trata-se quem tem **T ≤ −2,5** ou **fratura por fragilidade**, mesmo com osteopenia.|q-adap22-083,q-uspsp2-028,q-usprp2027-087]] [[O alendronato oral irrita o esôfago; com **estenose esofágica** ou dificuldade de ficar em pé após tomar, usa-se o **ácido zoledrônico 5 mg venoso anual**.|q-unesp2026-048]] [[O bisfosfonato reduz a remodelação também na mandíbula, e procedimentos como **implante dentário** podem ter cicatrização comprometida (osteonecrose de mandíbula).|q-usp2025-008]]`,
          texto: `- T ≤ −2,5 ou fratura: **alendronato + cálcio + vitamina D**. {q-adap22-083,q-uspsp2-028,q-usprp2027-087}
- Esôfago doente: **ácido zoledrônico** anual. {q-unesp2026-048}
- Bisfosfonato compromete **implante dentário**. {q-usp2025-008}` },
        { id: "ost-outros", titulo: "Raloxifeno, denosumabe e vitamina D", conferir: true, diretrizes: ["aace-osteoporose"],
          questoes: ["q-amrigs2024-015","q-uspsp4-008","q-sessp2023-065"],
          prosa: `[[O **raloxifeno** (modulador do receptor de estrogênio) reduz fratura **vertebral**, não de quadril, e serve à mulher sem fogachos.|q-amrigs2024-015]] [[Com **clearance abaixo de 30–35**, bisfosfonato não é usado; o **denosumabe** (anticorpo contra o RANKL) não é eliminado pelo rim, mas na doença renal avançada e na diálise causa **hipocalcemia grave** (alerta da FDA, 2024): corrigir cálcio, vitamina D e PTH antes e monitorar. O romosozumabe é evitado após **infarto recente**.|q-uspsp4-008]] [[Vitamina D baixa (< 20 ng/mL) se repõe com **50.000 UI por semana por 8 semanas** e depois manutenção; dose alta para todos não é recomendada.|q-sessp2023-065,q-amrigs2024-015]]`,
          texto: `- Raloxifeno: reduz **só fratura vertebral**. {q-amrigs2024-015}
- Rim ruim ou infarto recente: **denosumabe**, com cálcio e vitamina D em dia e cálcio monitorado (hipocalcemia grave na DRC avançada). {q-uspsp4-008}
- Vitamina D < 20: **50.000 UI/semana por 8 semanas**. {q-sessp2023-065}` },
      ],
    },
    {
      id: "osteonecrose", titulo: "Osteonecrose da cabeça do fêmur",
      introducao: `[[A cabeça do fêmur depende de poucos vasos; quando a gordura do sangue (álcool, corticoide) ou microtrombos os obstruem, o osso morre, colapsa e a articulação degenera. Dor no quadril que piora ao andar em quem bebe muito ou toma corticoide em dose alta é **osteonecrose**.|q-tp20222-074,q-unesp2026-072]]`,
      fragmentos: [
        { id: "osn-quadril", titulo: "Álcool, corticoide e descompressão", conferir: true,
          casos: ["q-tp20222-074"],
          questoes: ["q-tp20222-074","q-unesp2026-072"],
          prosa: `[[Etilista crônico ou paciente com **lúpus em corticoide** com dor inguinal insidiosa que piora com a marcha: **necrose avascular da cabeça femoral**. A ressonância vê cedo; na fase inicial, a **descompressão cirúrgica** do núcleo alivia a pressão e tenta salvar a cabeça; no colapso, artroplastia.|q-tp20222-074,q-unesp2026-072]]`,
          texto: `- Álcool ou corticoide + dor no quadril: **necrose avascular** → descompressão. {q-tp20222-074,q-unesp2026-072}` },
      ],
    },
    {
      id: "displasias", titulo: "Osteogênese imperfeita e osteocondroma",
      introducao: `[[Na **osteogênese imperfeita**, uma mutação no gene do **colágeno tipo I** (COL1A1, COL1A2) faz um colágeno pouco ou defeituoso: ossos que quebram com traumas mínimos, **escleras azuladas**, baixa estatura e deformidades.|q-unesp2023-071,q-famerp2025-064,q-usprp2027-046]]`,
      fragmentos: [
        { id: "dis-oi", titulo: "Osteogênese imperfeita", conferir: true,
          casos: ["q-unesp2023-071"],
          questoes: ["q-unesp2023-071","q-famerp2025-064","q-usprp2027-046","q-adap22-017","q-unifesp2022-017"],
          prosa: `[[Fraturas de repetição com **esclera azulada** e baixo crescimento: **osteogênese imperfeita**, por colágeno deficiente; confirma-se com **sequenciamento do COL1A1/COL1A2**.|q-unesp2023-071,q-famerp2025-064,q-usprp2027-046]] [[Nas formas graves, o **pamidronato venoso cíclico** reduz fraturas e dor, com fisioterapia, **hastes intramedulares** e cálcio e vitamina D. Imobilização longa piora, porque o desuso causa **osteopenia**.|q-adap22-017,q-unifesp2022-017]]`,
          texto: `- Esclera azul + fraturas: **OI** (colágeno I) → sequenciar **COL1A1**. {q-unesp2023-071,q-famerp2025-064,q-usprp2027-046}
- Grave: **pamidronato**, hastes; evitar imobilização longa. {q-adap22-017,q-unifesp2022-017}` },
        { id: "dis-osteocondroma", titulo: "Osteocondroma", conferir: true,
          questoes: ["q-unicamp2023-074"],
          prosa: `[[O **osteocondroma** é uma exostose com capa de cartilagem perto da metáfise (tíbia proximal, fêmur distal); solitário e sem dor, o risco de virar condrossarcoma é muito baixo: **acompanhamento clínico e radiológico**, operando só se doer, crescer depois da puberdade ou comprimir algo.|q-unicamp2023-074]]`,
          texto: `- Osteocondroma solitário assintomático: **acompanhar**. {q-unicamp2023-074}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["pcdt-osteoporose"],
          questoes: ["q-unesp2026-039","q-usprp2027-087","q-iamspe2021-005","q-amrigs2024-015"],
          prosa: `[[**Basta um sítio**: com coluna −2,6 e fêmur −2,0, o diagnóstico já é osteoporose e trata-se (unesp2026-039); não é preciso esperar o FRAX.|q-unesp2026-039]] [[**Osteopenia com fratura**: a fratura de punho por queda torna a doença osteoporose clínica, e a usprp2027-087 cobrou **bisfosfonato oral**.|q-usprp2027-087]] [[**Perda óssea na menopausa** é maior nos primeiros anos, não depois dos cinco primeiros.|q-iamspe2021-005]] [[**Vitamina D em dose alta para todos** não é recomendada.|q-amrigs2024-015]]`,
          texto: `- Um sítio ≤ −2,5 basta: **tratar**. {q-unesp2026-039}
- Osteopenia + fratura: **bisfosfonato**. {q-usprp2027-087}
- Perda maior **logo** após a menopausa. {q-iamspe2021-005}
- Sem megadose de vitamina D. {q-amrigs2024-015}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: tratamentos da osteoporose",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-tratamentos", titulo: "Como age e quando escolher", conferir: true,
          questoes: ["q-adap22-083","q-unesp2026-048","q-uspsp4-008","q-amrigs2024-015"],
          prosa: `[[Mecanismo e contraindicação orientam a escolha.|q-adap22-083,q-unesp2026-048,q-uspsp4-008,q-amrigs2024-015]]

| Remédio | Como age | Quando | Cuidado |
|---|---|---|---|
| Alendronato oral | inibe osteoclasto | primeira linha | esôfago; clearance < 30–35 |
| Ácido zoledrônico | inibe osteoclasto, venoso anual | não tolera o oral, estenose de esôfago | rim |
| Denosumabe | anticorpo anti-RANKL | rim ruim, falha | não parar sem transição |
| Raloxifeno | modula receptor de estrogênio | mulher sem fogachos, fratura vertebral | trombose; não protege quadril |
| Teriparatida/romosozumabe | formam osso | muito alto risco | romosozumabe: evitar após infarto |`,
          texto: `- Primeira linha: **alendronato**. {q-adap22-083}
- Esôfago: **zoledrônico**. {q-unesp2026-048}
- Rim: **denosumabe**. {q-uspsp4-008}
- Raloxifeno: **vertebral**. {q-amrigs2024-015}` },
      ],
    },
  ],
});
