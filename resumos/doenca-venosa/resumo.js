/* resumos/doenca-venosa/resumo.js — resumo adaptativo de doença venosa (ass-cirvasc-venosa):
   tríade de Virchow e fatores de risco, quadro e escore de Wells, D-dímero e Doppler,
   anticoagulação (heparina, varfarina, anticoagulantes diretos), TVP no câncer, filtro de veia cava,
   profilaxia, tromboflebite superficial; varizes e CEAP, tratamento do refluxo e úlcera venosa;
   armadilhas e tabela das úlceras de perna.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- doenca-venosa */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "doenca-venosa",
  titulo: "Doença venosa: TVP e varizes",
  assunto: "ass-cirvasc-venosa",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "chest-tev", texto: "CHEST — Antithrombotic Therapy for VTE Disease, 2ª atualização (Chest 2021)", lidoEm: null },
    { id: "ash-tev", texto: "American Society of Hematology 2020 — tratamento do TEV (Blood Adv 2020) e 2021 — TEV no câncer", lidoEm: null },
    { id: "esvs-venosa", texto: "ESVS — Chronic Venous Disease of the Lower Limbs (2022) e Venous Thrombosis (2021)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "tvp", titulo: "Trombose venosa profunda",
      introducao: `[[O trombo venoso nasce da **tríade de Virchow**: sangue parado (imobilidade, viagem, pós-operatório), parede lesada (cirurgia, trauma) e sangue que coagula demais (câncer, estrogênio, gravidez, trombofilia). Ele começa nas veias da panturrilha e cresce para cima; quando chega às veias proximais (poplítea, femoral, ilíaca), solta pedaços que vão pela veia cava, atravessam o coração direito e param no **pulmão**. Um êmbolo do coração esquerdo, ao contrário, vai para a circulação sistêmica (cérebro, membros).|q-tp20231-078,q-sessp2025-037]]

Veja também: **Tromboembolismo pulmonar**, **Isquemia arterial**, **Cuidados perioperatórios** e **Hemostasia**.`,
      fragmentos: [
        { id: "tvp-fatores", titulo: "Fatores de risco: herdados e adquiridos", conferir: true,
          questoes: ["q-famema2023-069","q-sessp2025-037","q-tp20231-078","q-fmabc2021-019"],
          prosa: `[[Os fatores **hereditários** mexem na coagulação: fator V de Leiden, mutação da protrombina, deficiência de proteína C, proteína S ou antitrombina, **disfibrinogenemia**. Câncer, policitemia vera e doença inflamatória intestinal são **adquiridos**.|q-famema2023-069,q-sessp2025-037]] [[Pós-operatório recente (como o da bariátrica), anticoncepcional com estrogênio e obesidade se somam no mesmo paciente.|q-fmabc2021-019]] [[O trombo da veia femoral embola para o **pulmão**; o do ventrículo esquerdo, para uma artéria sistêmica, como a **cerebral média**.|q-tp20231-078]]`,
          texto: `- Hereditários: **Leiden, protrombina, proteínas C e S, antitrombina, disfibrinogenemia**. {q-famema2023-069,q-sessp2025-037}
- Somam-se: cirurgia, estrogênio, obesidade. {q-fmabc2021-019}
- Veia → **pulmão**; coração esquerdo → **cérebro**. {q-tp20231-078}` },
        { id: "tvp-clinica", titulo: "Quadro clínico e escore de Wells", conferir: true,
          questoes: ["q-amrigs2024-007","q-amrigs2024-023","q-adap23-083","q-sessp2025-037"],
          prosa: `[[O membro com TVP fica **inchado** (às vezes inteiro), com **panturrilha empastada** e dolorosa, principalmente na dorsiflexão do pé. Nenhum sinal isolado basta: Homans e bandeira não são patognomônicos, e o exame sozinho não confirma nem afasta.|q-amrigs2024-023,q-sessp2025-037]] [[O **escore de Wells** junta os achados: câncer ativo, imobilização ou cirurgia recente, dor no trajeto das veias profundas, edema do membro inteiro, panturrilha 3 cm maior, edema depressível, **veias colaterais não varicosas**; e **subtrai** pontos quando um diagnóstico alternativo (celulite, distensão muscular, cisto de Baker) é tão provável quanto. Por isso **celulite não aumenta** a suspeita.|q-amrigs2024-007,q-adap23-083]]`,
          texto: `- Edema, panturrilha empastada, dor à dorsiflexão: **suspeitar**; sinal isolado não confirma. {q-amrigs2024-023,q-sessp2025-037}
- Wells: diagnóstico alternativo (**celulite**) **tira** pontos. {q-amrigs2024-007,q-adap23-083}` },
        { id: "tvp-exames", titulo: "D-dímero e ultrassom com Doppler", conferir: true, diretrizes: ["chest-tev"],
          figuras: [{ arquivo: "figuras/tvp-diagnostico.svg", legenda: "Esquema autoral: a probabilidade clínica decide se começa pelo D-dímero ou pelo Doppler." }],
          questoes: ["q-unifesp2023-083","q-famema2023-065","q-adap23-083","q-sessp2025-037"],
          prosa: `[[O **D-dímero** sobe em qualquer coágulo que se desfaz (cirurgia, câncer, gravidez), então só serve para **afastar**: probabilidade **baixa** com D-dímero **normal** encerra a investigação, sem ultrassom.|q-adap23-083,q-sessp2025-037]] [[Na probabilidade alta, ou com D-dímero alto, faz-se o **ultrassom com Doppler**. O critério mais acurado é a **veia que não se deixa comprimir** pelo transdutor no corte transversal. A **flebografia** (venografia) foi o padrão-ouro histórico, mas é invasiva e saiu da rotina.|q-unifesp2023-083,q-famema2023-065,q-sessp2025-037]]`,
          texto: `- Probabilidade baixa + **D-dímero normal**: TVP afastada. {q-adap23-083,q-sessp2025-037}
- Doppler: **perda da compressibilidade**; flebografia = padrão-ouro histórico. {q-unifesp2023-083,q-famema2023-065}` },
        { id: "tvp-tratamento", titulo: "Anticoagulação", conferir: true, diretrizes: ["chest-tev","ash-tev"],
          questoes: ["q-unicamp2022-031","q-unesp2023-077","q-unicamp2023-032","q-iamspe2025-032","q-scmsp2021-027"],
          prosa: `[[O anticoagulante **não dissolve** o trombo; ele impede que cresça e embolize enquanto a fibrinólise do próprio corpo o reabsorve. Antiagregante não serve.|q-unicamp2022-031,q-unesp2023-077]] [[Hoje a maioria trata em casa com **anticoagulante oral direto** (rivaroxabana, apixabana) ou heparina de baixo peso. Se a escolha for **varfarina**, ela demora dias para agir e no início ainda causa um estado pró-trombótico: começa-se **junto com a heparina**, que só sai quando o **RNI fica entre 2 e 3**.|q-unesp2023-077,q-unicamp2023-032,q-scmsp2021-027]] [[Com suspeita **alta**, exame que vai demorar e baixo risco de sangrar, **anticoagula-se antes da confirmação**.|q-iamspe2025-032]] O membro elevado alivia o edema. O tempo mínimo é de 3 meses.`,
          texto: `- Anticoagulante: **impede o crescimento**, não lisa o trombo. {q-unicamp2022-031,q-unesp2023-077}
- Varfarina: **heparina junto** até **RNI 2–3**. {q-unesp2023-077,q-unicamp2023-032,q-scmsp2021-027}
- Suspeita alta, exame demorado: **anticoagular já**. {q-iamspe2025-032}` },
        { id: "tvp-cancer", titulo: "TVP no paciente com câncer", conferir: true, diretrizes: ["ash-tev"],
          questoes: ["q-usprp2024-036","q-usprp2025-092"],
          prosa: `[[O câncer é o maior fator de risco adquirido e recorre mais. O tratamento é **heparina de baixo peso em dose plena** ou **anticoagulante oral direto** (apixabana, rivaroxabana), por pelo menos 6 meses e enquanto o câncer estiver ativo. AAS não previne e não trata TVP.|q-usprp2024-036,q-usprp2025-092]]`,
          texto: `- Câncer: **HBPM plena** ou **apixabana/rivaroxabana**. {q-usprp2024-036,q-usprp2025-092}` },
        { id: "tvp-filtro", titulo: "Filtro de veia cava: quando não dá para anticoagular", conferir: true, diretrizes: ["chest-tev"],
          questoes: ["q-usp2025-047","q-unesp2024-077","q-unesp2025-078","q-sirio2027-039"],
          prosa: `[[O filtro só segura o êmbolo; não trata a trombose e aumenta a trombose local. Por isso entra **apenas** quando há TVP **proximal** e a anticoagulação é **contraindicada**: **sangramento ativo** ou recente (hemorragia digestiva), **neurocirurgia recente**, **plaquetas muito baixas** (pancitopenia da quimioterapia). Assim que o risco passar, anticoagula-se e retira-se o filtro.|q-usp2025-047,q-unesp2024-077,q-unesp2025-078,q-sirio2027-039]]`,
          texto: `- TVP proximal + **contraindicação à anticoagulação** (sangramento, neurocirurgia, plaquetopenia): **filtro**. {q-usp2025-047,q-unesp2024-077,q-unesp2025-078,q-sirio2027-039}` },
        { id: "tvp-profilaxia", titulo: "Profilaxia depois de artroplastia", conferir: true, diretrizes: ["chest-tev"],
          questoes: ["q-usprp2021-081"],
          prosa: `[[A artroplastia de quadril e de joelho é das cirurgias de maior risco, e o risco dura semanas, mesmo com o paciente andando. A profilaxia é **farmacológica**, com **heparina de baixo peso ou anticoagulante oral direto**, por **4 a 6 semanas** no quadril.|q-usprp2021-081]]`,
          texto: `- Prótese de quadril: **HBPM ou DOAC por 4–6 semanas**. {q-usprp2021-081}` },
        { id: "tvp-superficial", titulo: "Tromboflebite superficial", conferir: true, diretrizes: ["chest-tev"],
          questoes: ["q-adap21-081"],
          prosa: `[[O cordão vermelho e doloroso na safena é trombo **superficial**, mas pode crescer para a junção com a veia femoral. Com **5 cm ou mais** de extensão e longe da junção (mais de 3 cm), usa-se **fondaparinux 2,5 mg/dia por 45 dias** (ou heparina de baixo peso em dose profilática), com compressão e analgesia. Perto da junção, trata-se como TVP.|q-adap21-081]]`,
          texto: `- Safena ≥ 5 cm, longe da junção: **fondaparinux 2,5 mg por 45 dias**. {q-adap21-081}` },
      ],
    },
    {
      id: "cronica", titulo: "Doença venosa crônica: varizes e úlcera",
      introducao: `[[Em pé, as válvulas das veias impedem que o sangue volte para baixo, e a contração da panturrilha o empurra para cima. Com válvulas insuficientes (por herança, gestações, obesidade, ficar muito em pé) há **refluxo** e **hipertensão venosa** no tornozelo: veias dilatam (varizes), plasma sai para o tecido (**edema vespertino**, que melhora deitado), hemácias saem e deixam hemossiderina (**pigmentação ocre**), a pele inflama, endurece e, no fim, **ulcera**.|q-adap21-096,q-unifesp2022-019,q-usp2023-045,q-adap22-019]]`,
      fragmentos: [
        { id: "cro-ceap", titulo: "Classificação CEAP", conferir: true, diretrizes: ["esvs-venosa"],
          casos: ["q-usp2023-045"],
          questoes: ["q-unifesp2022-019","q-einstein2025-029","q-einstein2027-021","q-usp2023-045"],
          prosa: `[[O **C** da CEAP gradua o que se vê: **C1** telangiectasias, **C2** varizes, **C3 edema**, **C4a** pigmentação ou **eczema**, **C4b** **lipodermatoesclerose** ou atrofia branca, **C5** úlcera cicatrizada, **C6** úlcera aberta. Vale o achado **mais grave**. O **E** diz a causa: **primária** (idiopática) ou secundária (pós-trombótica).|q-unifesp2022-019,q-einstein2025-029,q-einstein2027-021]] [[Na perna com varizes antigas, eritema com crostas é **eczema de estase**, a cor acastanhada é **dermatite ocre** e a pele dura é **dermatoesclerose**.|q-usp2023-045]]`,
          texto: `- **C2** varizes · **C3** edema · **C4a** pigmento/eczema · **C4b** lipodermatoesclerose · **C6** úlcera. {q-unifesp2022-019,q-einstein2025-029,q-einstein2027-021}
- Eczema de estase, **dermatite ocre**, dermatoesclerose. {q-usp2023-045}` },
        { id: "cro-tratamento", titulo: "Tratamento das varizes", conferir: true, diretrizes: ["esvs-venosa"],
          casos: ["q-tp20251-065"],
          questoes: ["q-adap21-096","q-einstein2025-029","q-einstein2027-021","q-tp20251-065","q-usprp2021-096"],
          prosa: `[[Varizes sintomáticas recebem **meia elástica**, perda de peso, exercício e elevação das pernas. Antes de operar, o **Doppler venoso mapeia** onde está o refluxo; varizes não são urgência e não pedem anticoagulante.|q-tp20251-065,q-usprp2021-096]] [[Com refluxo de safena e sintomas que atrapalham a vida, **corrigir o refluxo** dá melhor resultado que só a meia: o método preferido é a **ablação endovenosa térmica** (laser ou radiofrequência), mantendo as medidas de alívio.|q-adap21-096,q-einstein2025-029,q-einstein2027-021]]`,
          texto: `- Meia, peso, exercício; **Doppler mapeia** antes da cirurgia. {q-tp20251-065,q-usprp2021-096}
- Refluxo de safena sintomático: **ablação endovenosa** + medidas conservadoras. {q-adap21-096,q-einstein2025-029,q-einstein2027-021}` },
        { id: "cro-ulcera", titulo: "Úlcera venosa: compressão", conferir: true, diretrizes: ["esvs-venosa"],
          casos: ["q-tp20232-116","q-tp20261-040"],
          questoes: ["q-adap22-019","q-tp20212-065","q-tp20232-116","q-tp20241-116","q-tp20261-058","q-tp20261-040","q-usprp2021-096"],
          prosa: `[[A úlcera venosa fica perto do **maléolo medial**, é rasa, de bordas irregulares, com granulação no fundo e pele pigmentada e endurecida em volta; dói pouco e os **pulsos estão presentes**.|q-tp20232-116,q-tp20212-065,q-tp20241-116,q-tp20261-058]] [[Ela só fecha se a hipertensão venosa cair: o tratamento é a **compressão** (**bota de Unna** ou bandagem multicamadas), depois de confirmar que a circulação arterial permite (pulsos ou índice tornozelo-braquial normal), com curativo simples. Antibiótico só com infecção. Depois, o **Doppler** e a correção do refluxo reduzem a recidiva.|q-adap22-019,q-tp20212-065,q-tp20241-116,q-tp20261-058,q-tp20261-040,q-usprp2021-096]]`,
          texto: `- Maléolo medial, rasa, pigmento em volta, **pulsos presentes**: venosa. {q-tp20232-116,q-tp20212-065}
- **Compressão** (bota de Unna), curativo; depois **tratar o refluxo**. {q-adap22-019,q-tp20241-116,q-tp20261-058,q-tp20261-040,q-usprp2021-096}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["chest-tev"],
          questoes: ["q-scmsp2021-027","q-unicamp2023-032","q-famema2023-065","q-fmabc2021-019","q-iamspe2025-032"],
          prosa: `[[**Internar e usar heparina venosa**: a TVP sem gravidade se trata em casa com anticoagulante oral direto ou heparina de baixo peso; a scmsp2021-027 deu como conduta-padrão internação, heparina não fracionada venosa e varfarina, e a unicamp2023-032, heparina de baixo peso com varfarina (válidas, mas não a primeira escolha atual).|q-scmsp2021-027,q-unicamp2023-032]] [[**Padrão-ouro**: a flebografia é a referência histórica e foi a resposta da famema2023-065; na prática, o exame de escolha é o Doppler.|q-famema2023-065]] [[**Anticoagular antes do Doppler**: só com suspeita alta e exame demorado. A iamspe2025-032 (pós-operatório de câncer, exame não imediato) anticoagulou primeiro; a fmabc2021-019 preferiu o Doppler antes.|q-fmabc2021-019,q-iamspe2025-032]]`,
          texto: `- A prova cobrou **internação e heparina venosa**/varfarina; hoje, oral direto em casa. {q-scmsp2021-027,q-unicamp2023-032}
- A prova cobrou **flebografia** como padrão-ouro. {q-famema2023-065}
- Anticoagular antes do exame: **depende da espera**. {q-fmabc2021-019,q-iamspe2025-032}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: úlceras de perna",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-ulceras", titulo: "Venosa, arterial e neuropática", conferir: true,
          questoes: ["q-tp20232-116","q-tp20212-065","q-adap22-019"],
          prosa: `[[Local, dor e pulso separam as três.|q-tp20232-116,q-tp20212-065,q-adap22-019]]

| Úlcera | Onde | Como é | Pulsos | Tratamento |
| Venosa | maléolo medial | rasa, bordas irregulares, pele pigmentada e endurecida | presentes | compressão, tratar o refluxo |
| Arterial | dedos, calcanhar, pontos de pressão | dolorosa, bordas regulares, pele fria e sem pelos | ausentes | revascularizar; sem compressão |
| Neuropática | planta, sob calosidade | indolor, profunda, com calo em volta | presentes | aliviar a pressão |`,
          texto: `- Venosa: **maléolo medial, pulsos presentes**. {q-tp20232-116,q-tp20212-065}
- Compressão só com **circulação arterial boa**. {q-adap22-019}` },
      ],
    },
  ],
});
