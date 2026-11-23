/* resumos/leptospirose/resumo.js — resumo adaptativo de leptospirose (ass-leptospirose): transmissão e
   reservatório, fases (leptospirêmica e imune), forma anictérica e síndrome de Weil, hemorragia
   pulmonar, rim (nefrite com hipocalemia), fígado (bilirrubina alta, transaminases modestas), sinais
   de alerta, diagnóstico (MAT, ELISA), tratamento e quimioprofilaxia; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- leptospirose */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "leptospirose",
  titulo: "Leptospirose",
  assunto: "ass-leptospirose",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "ms-leptospirose", texto: "Ministério da Saúde — Leptospirose: diagnóstico e manejo clínico (2014) e Guia de Vigilância em Saúde (6.ª ed., 2023/2024), capítulo de leptospirose", lidoEm: null },
    { id: "oms-lepto", texto: "OMS/ILS — Human leptospirosis: guidance for diagnosis, surveillance and control (2003)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição", questoes: ["q-gdleptospirose-003","q-gdhepatoesplenomegalias-002"] },
  ],
  doencas: [
    {
      id: "doenca", titulo: "Transmissão e quadro clínico",
      introducao: `[[A leptospira vive nos túbulos renais do **rato de esgoto** (*Rattus norvegicus*) e sai na urina; enchente espalha essa urina pela água e pelo barro. A bactéria espiralada atravessa **pele com lesão, pele íntegra imersa por muito tempo e mucosas**, cai no sangue e se espalha. Incubação de 1 a 30 dias, em geral **7 a 14**. É zoonose de distribuição mundial, sobretudo tropical, com surtos depois de chuvas fortes em populações sem saneamento; a imunidade é **sorovar-específica**, e a pessoa pode adoecer de novo com outro sorovar.|q-famema2023-008,q-amrigs2024-004,q-gdleptospirose-011,q-gdleptospirose-020,q-gdleptospirose-010,q-gdleptospirose-030,q-gdleptospirose-027,q-gdleptospirose-017,q-gdleptospirose-025]]

Veja também: **Febre amarela e hepatites**, **Hantavirose e febres hemorrágicas**, **Dengue e arboviroses**, **Lesão renal aguda** e **Vigilância e notificação** quando houver resumo.`,
      fragmentos: [
        { id: "doe-transmissao", titulo: "Rato, água e imunidade", conferir: true, diretrizes: ["ms-leptospirose","oms-lepto"],
          questoes: ["q-famema2023-008","q-amrigs2024-004","q-gdleptospirose-011","q-gdleptospirose-020","q-gdleptospirose-010","q-gdleptospirose-030","q-gdleptospirose-027","q-gdleptospirose-025"],
          prosa: `[[O reservatório principal é o **rato de esgoto**, que elimina leptospiras na urina por toda a vida; cães e animais de criação também podem ser portadores, e vacinar o cão não impede o estado de portador. A entrada é por **pele lesada, pele íntegra imersa por longo tempo ou mucosas**, não só por feridas.|q-famema2023-008,q-amrigs2024-004,q-gdleptospirose-011,q-gdleptospirose-020,q-gdleptospirose-027]] [[A incubação varia de 1 a 30 dias (em geral 7–14), o quadro vai de assintomático a grave, e a **imunidade é sorovar-específica**: reinfecção por outro sorovar é possível.|q-amrigs2024-004,q-gdleptospirose-025,q-gdleptospirose-010,q-gdleptospirose-030]]`,
          texto: `- Rato de esgoto; **pele íntegra imersa** também. {q-famema2023-008,q-gdleptospirose-011,q-gdleptospirose-020,q-gdleptospirose-027}
- Incubação **7–14 dias**; imunidade **por sorovar**. {q-amrigs2024-004,q-gdleptospirose-025,q-gdleptospirose-010,q-gdleptospirose-030}` },
        { id: "doe-fases", titulo: "Fase precoce, fase imune e Weil", conferir: true, diretrizes: ["ms-leptospirose"],
          figuras: [{ arquivo: "figuras/fases-leptospirose.svg", legenda: "Esquema autoral: as duas fases da leptospirose, o que aparece em cada uma e o exame que acerta em cada momento." }],
          casos: ["q-tp20231-005"],
          questoes: ["q-inf-25","q-scmsp2026-055","q-gdleptospirose-009","q-gdleptospirose-014","q-gdleptospirose-021","q-gdleptospirose-028","q-einstein2024-006","q-tp20231-005","q-gdleptospirose-017","q-gdleptospirose-018","q-gdleptospirose-022","q-gdleptospirose-015","q-gdleptospirose-019"],
          prosa: `[[Fase **precoce (leptospirêmica)**, primeira semana: febre súbita, cefaleia e **mialgia intensa nas panturrilhas** (miosite), com **sufusão conjuntival** — hiperemia sem secreção, pouco sensível mas muito específica —, às vezes exantema, linfonodos e hepatoesplenomegalia, depois de enchente, esgoto ou lixão. A maioria para aí (forma **anictérica**, 85–90%).|q-inf-25,q-scmsp2026-055,q-gdleptospirose-009,q-gdleptospirose-014,q-gdleptospirose-021,q-gdleptospirose-028,q-gdleptospirose-017]] [[Fase **imune**, depois de alguns dias: os anticorpos aparecem e a doença se expressa por inflamação — **meningite asséptica** (líquor linfocitário), uveíte, febre de volta.|q-einstein2024-006,q-tp20231-005,q-gdleptospirose-015]] [[Em 10–15%, a forma grave: **síndrome de Weil** — **icterícia rubínica, lesão renal aguda e hemorragia** —, e a **hemorragia pulmonar**, hoje a principal causa de morte (letalidade que chega a 50%). Na criança vale o mesmo, com mortalidade alta nas formas graves; complicações pulmonares, neurológicas e urinárias exigem vigilância.|q-inf-25,q-gdleptospirose-018,q-gdleptospirose-022,q-gdleptospirose-019,q-gdleptospirose-015]]`,
          texto: `- Enchente + **panturrilhas** + **sufusão conjuntival**. {q-inf-25,q-scmsp2026-055,q-gdleptospirose-009,q-gdleptospirose-014,q-gdleptospirose-021,q-gdleptospirose-028}
- Fase imune: **meningite asséptica**. {q-einstein2024-006,q-tp20231-005}
- **Weil = icterícia + LRA + hemorragia**; hemorragia pulmonar mata. {q-gdleptospirose-018,q-gdleptospirose-022,q-gdleptospirose-019,q-gdleptospirose-015}` },
        { id: "doe-laboratorio", titulo: "Rim, fígado e laboratório", conferir: true, diretrizes: ["ms-leptospirose"],
          questoes: ["q-gdleptospirose-002","q-gdleptospirose-023","q-gdleptospirose-007","q-gdleptospirose-005","q-gdleptospirose-012","q-gdleptospirose-016","q-gdsfiha-035","q-gdleptospirose-024","q-gdleptospirose-013","q-gdhepatoesplenomegalias-058"],
          prosa: `[[O rim da leptospirose é **nefrite intersticial com disfunção tubular**: uma proteína da leptospira inibe o cotransportador Na-K-2Cl da alça, e a lesão renal é tipicamente **não oligúrica com hipocalemia** — o contrário da maioria das lesões agudas. Com plaquetopenia, CPK alta e leucocitose com desvio.|q-gdleptospirose-002,q-gdleptospirose-023,q-gdleptospirose-007,q-gdleptospirose-005]] [[O fígado mostra o padrão inverso das hepatites: **bilirrubina muito alta** (direta) com **transaminases modestas**, raramente acima de 200, e AST pouco maior que ALT. Anemia hemolítica Coombs positivo não faz parte.|q-gdleptospirose-012,q-gdleptospirose-016,q-gdsfiha-035,q-gdleptospirose-024]] [[Sinais de alerta que pedem internação: dispneia, tosse com sangue, oligúria, icterícia, hemorragia, hipotensão, alteração de consciência, vômitos persistentes, arritmia — **hipertensão não** está entre eles. No diferencial de febre com icterícia e sangramento entram hepatites, febre amarela, hantavirose e febre tifoide.|q-gdleptospirose-013,q-gdhepatoesplenomegalias-058]]`,
          texto: `- LRA **não oligúrica com hipocalemia**. {q-gdleptospirose-002,q-gdleptospirose-023,q-gdleptospirose-007,q-gdleptospirose-005}
- **Bilirrubina alta, transaminases < 200**. {q-gdleptospirose-012,q-gdleptospirose-016,q-gdsfiha-035,q-gdleptospirose-024}
- Alerta: dispneia, hemoptise, oligúria — **não hipertensão**. {q-gdleptospirose-013,q-gdhepatoesplenomegalias-058}` },
      ],
    },
    {
      id: "manejo", titulo: "Diagnóstico, tratamento e prevenção",
      introducao: `[[Na primeira semana a bactéria está no sangue e os anticorpos ainda não subiram; na segunda, o inverso. Por isso o exame certo depende do dia: cultura e PCR no começo, sorologia (ELISA IgM, microaglutinação) depois. E o tratamento não espera o exame.|q-gdleptospirose-026,q-gdleptospirose-001]]`,
      fragmentos: [
        { id: "man-tratamento", titulo: "Exames, antibiótico e diálise", conferir: true, diretrizes: ["ms-leptospirose"],
          questoes: ["q-gdleptospirose-026","q-gdleptospirose-001","q-gdleptospirose-006","q-gdleptospirose-008","q-amrigs2024-004","q-gdleptospirose-031"],
          prosa: `[[A confirmação de referência é o **teste de microaglutinação (MAT)**, com soroconversão ou título alto; o ELISA IgM é o exame de triagem.|q-gdleptospirose-026,q-gdleptospirose-001]] [[Forma leve: **doxiciclina 100 mg 12/12 h** ou **amoxicilina** por 5–7 dias, com hidratação e sintomáticos. Forma grave: **penicilina cristalina, ceftriaxona** ou ampicilina venosa. O antibiótico funciona melhor na primeira semana, mas está indicado **em qualquer fase**.|q-gdleptospirose-001,q-gdleptospirose-006,q-gdleptospirose-008,q-amrigs2024-004]] [[Na lesão renal, a **diálise precoce** reduz mortalidade (o paciente costuma estar hipocalêmico, então o gatilho é clínico).|q-gdleptospirose-031]]`,
          texto: `- **MAT** confirma; ELISA IgM tria. {q-gdleptospirose-026,q-gdleptospirose-001}
- Leve: **doxiciclina ou amoxicilina**; grave: penicilina/ceftriaxona IV; **qualquer fase**. {q-gdleptospirose-006,q-gdleptospirose-008,q-amrigs2024-004}
- **Diálise precoce**. {q-gdleptospirose-031}` },
        { id: "man-profilaxia", titulo: "Quimioprofilaxia", conferir: true, diretrizes: ["ms-leptospirose"],
          questoes: ["q-gdleptospirose-004","q-gdleptospirose-029","q-gdleptospirose-032"],
          prosa: `[[Em exposição de alto risco e curta (trabalho em enchente, limpeza de esgoto), a profilaxia é **doxiciclina 200 mg uma vez por semana**; a medida de fundo é saneamento e controle de roedores.|q-gdleptospirose-004,q-gdleptospirose-029,q-gdleptospirose-032]]`,
          texto: `- **Doxiciclina 200 mg/semana**. {q-gdleptospirose-004,q-gdleptospirose-029,q-gdleptospirose-032}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["ms-leptospirose"],
          questoes: ["q-amrigs2024-004","q-gdleptospirose-019","q-gdleptospirose-015","q-gdleptospirose-020"],
          prosa: `[[**Antibiótico na fase tardia**: o Ministério indica antibiótico em qualquer fase (amrigs2024-004); a gdleptospirose-019 considerou falsa a ideia de antibiótico só na fase precoce.|q-amrigs2024-004,q-gdleptospirose-019]] [[**Quantos ficam graves**: a forma grave atinge cerca de 10–15%; a gdleptospirose-015 marcou como **incorreto** dizer 25%.|q-gdleptospirose-015]] [[**Aguda ou crônica, polos ou trópicos**: a gdleptospirose-020 testou detalhes de redação — doença **aguda**, sobretudo **tropical**.|q-gdleptospirose-020]]`,
          texto: `- Antibiótico em **qualquer fase**. {q-amrigs2024-004,q-gdleptospirose-019}
- Grave: **10–15%**, não 25%. {q-gdleptospirose-015}
- Aguda e tropical. {q-gdleptospirose-020}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: leptospirose e diferenciais",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-diferenciais", titulo: "Febre com icterícia", conferir: true,
          questoes: ["q-inf-25","q-gdsfiha-035","q-gdleptospirose-005","q-gdhepatoesplenomegalias-058"],
          prosa: `[[O laboratório separa as febres ictéricas.|q-inf-25,q-gdsfiha-035,q-gdleptospirose-005,q-gdhepatoesplenomegalias-058]]

| | Leptospirose | Febre amarela | Hepatite viral | Hantavirose |
| Exposição | enchente, rato | mata, sem vacina | variada | roedor silvestre, poeira |
| Transaminases | < 200 | muito altas (milhares) | muito altas | moderadas |
| Rim | LRA com **hipocalemia** | LRA | raro | LRA |
| Pista | panturrilhas, sufusão conjuntival | sinal de Faget | pródromo gripal | edema pulmonar, hemoconcentração |`,
          texto: `- Bilirrubina alta, transaminase baixa, K baixo: **leptospirose**. {q-inf-25,q-gdsfiha-035,q-gdleptospirose-005}
- Diferenciais: febre amarela, hantavirose, tifoide. {q-gdhepatoesplenomegalias-058}` },
      ],
    },
  ],
});
