/* resumos/dor-pelvica/resumo.js — resumo adaptativo de dor pélvica aguda e massas pélvicas na mulher:
   ordem do raciocínio (gravidez primeiro), ectópica rota, torção anexial, cisto hemorrágico ou roto,
   DIP e abscesso tubo-ovariano, cistos funcionais e dermoide, avaliação de risco (IOTA/O-RADS), e dor
   pélvica crônica/dispareunia (vulvodínia, miofascial). Assunto: ass-dorpelvica.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- dor-pelvica */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "dor-pelvica",
  titulo: "Dor pélvica aguda e massas pélvicas",
  assunto: "ass-dorpelvica",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "cdc-dip", texto: "CDC 2021 — Sexually Transmitted Infections Treatment Guidelines (doença inflamatória pélvica); PCDT IST do Ministério da Saúde", lidoEm: null },
    { id: "iota", texto: "IOTA Simple Rules/ADNEX e ACR O-RADS US (2020/2022) — avaliação de massas anexiais", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "aguda", titulo: "Dor pélvica aguda",
      introducao: `[[Na mulher em idade fértil com dor pélvica aguda, a ordem é sempre: **é gravidez?** (beta-hCG), **está instável?**, e só então o resto. **Ectópica rota** com hemoperitônio dá dor súbita, síncope, **taquicardia e hipotensão**; na instável, o exame é o **ultrassom à beira do leito** (líquido livre) e a conduta, **cirurgia**. Sem gravidez, os grandes diagnósticos são **torção anexial**, **cisto hemorrágico ou roto** e **doença inflamatória pélvica** — e apendicite, que não é ginecológica.|q-famerp2025-070,q-uspsp2-042,q-famema2022-055]]

Veja também: **Sangramentos na gestação** (gravidez ectópica), **IST** (cervicite), **Endometriose**, **Câncer de ovário**, **Apendicite aguda** e **Ginecologia infantojuvenil**.`,
      fragmentos: [
        { id: "agu-torcao-cisto", titulo: "Torção anexial e cisto roto", conferir: true,
          questoes: ["q-famerp2025-070","q-uspsp2-042","q-famema2022-055","q-einstein2022-046","q-einstein2024-046","q-fmabc2026-073","q-tp20261-034","q-tp20241-097"],
          prosa: `[[**Torção anexial**: o ovário aumentado (cisto, tumor, gestação) gira sobre o pedículo, primeiro trava a veia, depois a artéria. Dor **súbita, intensa, unilateral**, muitas vezes depois de **esforço**, com **náuseas e vômitos**; no ultrassom, ovário grande e edemaciado, às vezes sem fluxo (o Doppler normal **não exclui**). Conduta: **laparoscopia de emergência para distorcer** e avaliar a viabilidade — o ovário escuro em geral se recupera, e a ooforectomia não é a regra. Na gestante, a torção é do corpo lúteo.|q-famema2022-055,q-einstein2022-046,q-einstein2024-046,q-fmabc2026-073]] [[**Cisto roto ou hemorrágico**: dor súbita no meio ou fim do ciclo, frequentemente depois do **coito** ou de esforço; com a paciente **estável**, **analgesia e acompanhamento do hematócrito**; instável, cirurgia. Na menina pré-púbere, dor intermitente com piora súbita também pode ser **cisto que rompeu** ou torceu.|q-tp20241-097,q-tp20261-034]]`,
          texto: `- Atraso, dor e choque: **ectópica rota** → **USG à beira do leito**. {q-famerp2025-070,q-uspsp2-042}
- Dor súbita + vômitos + ovário aumentado: **torção** → **laparoscopia para distorcer**. {q-famema2022-055,q-einstein2022-046,q-einstein2024-046,q-fmabc2026-073}
- Dor após o coito, estável: **cisto hemorrágico** → analgesia e hematócrito. {q-tp20241-097,q-tp20261-034}` },
        { id: "agu-dip", titulo: "Doença inflamatória pélvica e abscesso tubo-ovariano", conferir: true, diretrizes: ["cdc-dip"],
          questoes: ["q-fmabc2024-064","q-unicampdis2023-042","q-unicampdis2025-090","q-fmabc2021-045","q-famema2021-045"],
          prosa: `[[A DIP é a infecção que **sobe do colo** (clamídia, gonococo, depois flora mista e anaeróbios) para útero, trompas e ovários. Diagnóstico **clínico**: mulher sexualmente ativa com dor no baixo ventre e **dor à mobilização do colo**, do útero ou dos anexos, com ou sem febre e **cervicite**. Tratar sem esperar exames: ambulatorial com **ceftriaxona IM + doxiciclina** (e metronidazol) por 14 dias.|q-fmabc2024-064,q-unicampdis2023-042,q-famema2021-045]] [[**Massa anexial com febre**, leucocitose e PCR alta: **abscesso tubo-ovariano** — internar e antibiótico venoso; drenagem se não melhora em 48–72 h ou se é grande. Abscesso **roto** (peritonite difusa, abaulamento do fundo de saco, sepse): **cirurgia** (laparotomia).|q-unicampdis2025-090,q-fmabc2021-045]]`,
          texto: `- Dor + dor à mobilização do colo: **DIP** → **ceftriaxona + doxiciclina**. {q-fmabc2024-064,q-unicampdis2023-042,q-famema2021-045}
- Massa anexial com febre: **abscesso tubo-ovariano** → internar; roto → **laparotomia**. {q-unicampdis2025-090,q-fmabc2021-045}` },
      ],
    },
    {
      id: "massas-cronica", titulo: "Massa anexial e dor pélvica crônica",
      introducao: `[[A maioria das massas anexiais da mulher jovem é **funcional**: o **cisto folicular** (folículo que não rompeu, **simples**, anecoico, até 5–8 cm) e o do **corpo lúteo** regridem em 1 a 3 ciclos. O tumor benigno mais comum da jovem é o **teratoma maduro (cisto dermoide)**: cisto complexo com **gordura, calcificação (dente) e cabelo**, e é o que mais torce.|q-sirio2026-061,q-unicampdis2024-048,q-sirio2024-062]]`,
      fragmentos: [
        { id: "mas-avaliacao", titulo: "Cistos funcionais, dermoide e risco de câncer", conferir: true, diretrizes: ["iota"],
          questoes: ["q-sirio2026-061","q-unicampdis2024-048","q-sirio2024-062","q-einstein2027-060","q-sessp2022-066"],
          prosa: `[[Cisto simples no meio do ciclo, sem dor importante, beta-hCG negativo: **expectante** e repetir o ultrassom depois da menstruação. O risco oncológico de um cisto se avalia **antes da cirurgia**, com regras padronizadas de ultrassom (**IOTA, O-RADS**), não pela abertura do cisto na cirurgia. Os linfáticos do corpo e do colo do útero drenam para os **ilíacos internos e externos**.|q-sirio2026-061,q-unicampdis2024-048,q-einstein2027-060,q-sessp2022-066]]`,
          texto: `- Cisto simples no 12º dia: **folicular**, regride. {q-sirio2026-061,q-unicampdis2024-048}
- Cisto complexo com gordura: **dermoide**. {q-sirio2024-062}
- Risco oncológico: **IOTA/O-RADS no pré-operatório**. {q-einstein2027-060}
- Linfáticos do útero: **ilíacos internos e externos**. {q-sessp2022-066}` },
        { id: "mas-cronica", titulo: "Dor pélvica crônica e dispareunia", conferir: true,
          questoes: ["q-sirio2025-071","q-unesp2024-036","q-famema2021-045","q-fmabc2023-024"],
          prosa: `[[**Vulvodínia**: dor ou queimação vulvar há mais de 3 meses, **ao toque do vestíbulo** e na penetração (dispareunia de entrada), sem lesão visível — diagnóstico pelo **teste do cotonete**; tratamento com fisioterapia pélvica, apoio psicológico e moduladores da dor. O **vaginismo** também causa dispareunia de penetração. Dor crônica em fossa ilíaca em queimação, com irradiação para a coxa, em mulher com **várias cesáreas**: **dor miofascial** da parede ou neuropatia (ilio-hipogástrico, ilioinguinal). O **ureter** refere a dor para a **região inguinal, escroto ou grandes lábios**.|q-sirio2025-071,q-unesp2024-036,q-famema2021-045,q-fmabc2023-024]]`,
          texto: `- Queimação vestibular + dispareunia de entrada: **vulvodínia**. {q-sirio2025-071,q-famema2021-045}
- Dor crônica após várias cesáreas: **miofascial**. {q-unesp2024-036}
- Dor referida do ureter: **escroto/grandes lábios**. {q-fmabc2023-024}` },
      ],
    },
  ],
});
