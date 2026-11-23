/* resumos/neuromuscular/resumo.js — resumo adaptativo de doenças neuromusculares e desmielinizantes
   (ass-neuro-neuromuscular): topografia (neurônio motor superior × inferior, medula, cauda equina),
   Guillain-Barré e Miller Fisher, miastenia gravis, ELA, neuropatias (túnel do carpo, alcoólica),
   miopatia mitocondrial, esclerose múltipla, neurite óptica, neuromielite óptica, mielite transversa,
   HTLV, encefalite anti-NMDA; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- neuromuscular */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "neuromuscular",
  titulo: "Doenças neuromusculares e desmielinizantes",
  assunto: "ass-neuro-neuromuscular",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "ean-gbs", texto: "EAN/PNS 2023 — guideline on diagnosis and treatment of Guillain-Barré syndrome", lidoEm: null },
    { id: "miastenia", texto: "International consensus guidance for management of myasthenia gravis (Neurology 2021 update)", lidoEm: null },
    { id: "mcdonald", texto: "Thompson et al. — Diagnosis of multiple sclerosis: 2017 revisions of the McDonald criteria (Lancet Neurol 2018); critérios de NMOSD (Wingerchuk 2015)", lidoEm: null },
    { id: "ela", texto: "EFNS/EAN — guidelines on the clinical management of amyotrophic lateral sclerosis", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-fmabc2026-009"] },
  ],
  doencas: [
    {
      id: "topografia", titulo: "Onde está a lesão",
      introducao: `[[O primeiro passo é localizar. O **neurônio motor superior** (córtex, via piramidal) inibe o reflexo: lesado, dá fraqueza com **hipertonia, hiper-reflexia e Babinski**. O **inferior** (corno anterior, raiz, nervo) é a via final: lesado, dá fraqueza **flácida, arreflexa, com atrofia e fasciculações**. Junção neuromuscular e músculo não mexem na sensibilidade.|q-unesp2021-055,q-famerp2025-015]]

Veja também: **AVC**, **Demência e delirium**, **Cefaleias**, **Infecções do SNC** e **Insuficiência respiratória** quando houver resumo.`,
      fragmentos: [
        { id: "top-sindromes", titulo: "Síndromes medulares e periféricas", conferir: true, diretrizes: ["ela"],
          figuras: [{ arquivo: "figuras/topografia-motora.svg", legenda: "Esquema autoral: os níveis da via motora e o sinal que cada um produz." }],
          questoes: ["q-unesp2021-055","q-famerp2025-015","q-tp20261-019","q-usp2023-058","q-einstein2024-011","q-usprp2021-008","q-sirio2025-003","q-unifesp2024-086"],
          prosa: `[[**Hemissecção medular (Brown-Séquard)**: do lado da lesão, perde força e sensibilidade profunda (tato, vibração, propriocepção — via que só cruza no bulbo); do outro lado, dor e temperatura (o trato espinotalâmico cruza logo na entrada).|q-tp20261-019]] [[**Mielite transversa**: paraparesia com Babinski e **nível sensitivo** — ressonância da coluna na altura do nível. Lombalgia que evolui para retenção urinária e perda de fezes, com fraqueza assimétrica: **cauda equina**, urgência cirúrgica.|q-usp2023-058,q-einstein2024-011]] [[Neuropatia alcoólica: sensitivo-motora, distal, com reflexos **abolidos nos membros inferiores**. Parestesia nos três primeiros dedos que acorda à noite, **Phalen e Tinel**: **túnel do carpo** (nervo mediano).|q-famerp2025-015,q-usprp2021-008,q-sirio2025-003]] [[Intolerância ao exercício com queimação muscular e diabetes: miopatia mitocondrial, com **lactato** alto.|q-unifesp2024-086]]`,
          texto: `- NMS: **hiper-reflexia, Babinski**; NMI: **flácida, arreflexa**. {q-unesp2021-055,q-famerp2025-015}
- **Brown-Séquard**: profunda do mesmo lado, dor e temperatura do outro. {q-tp20261-019}
- Nível sensitivo: **mielite** → RM; esfíncteres + lombalgia: **cauda equina**. {q-usp2023-058,q-einstein2024-011}
- Phalen/Tinel: **túnel do carpo**; mitocondrial: lactato. {q-usprp2021-008,q-sirio2025-003,q-unifesp2024-086}` },
      ],
    },
    {
      id: "gbs", titulo: "Guillain-Barré",
      introducao: `[[Uma infecção (Campylobacter, vírus, zika, covid) gera anticorpos que reconhecem por engano a mielina ou o axônio dos nervos periféricos (mimetismo molecular). Dias a semanas depois, **fraqueza ascendente, simétrica, flácida e arreflexa**, que atinge o pico em até 4 semanas.|q-amrigs2022-003,q-tp20232-012,q-sirio2021-046]]`,
      fragmentos: [
        { id: "gbs-manejo", titulo: "Diagnóstico, gravidade e tratamento", conferir: true, diretrizes: ["ean-gbs"],
          casos: ["q-sirio2025-084"],
          questoes: ["q-amrigs2022-003","q-tp20232-012","q-tp20261-007","q-sirio2021-046","q-fmabc2022-052","q-usp2022-058","q-usp2025-078","q-unicamp2023-008","q-sessp2026-014","q-uspsp4-010","q-amrigs2021-077","q-sirio2025-084","q-fmabc2023-058"],
          prosa: `[[O exame é o **líquor**: **dissociação proteinocitológica** — proteína alta (> 45, às vezes > 150) com poucas células —, que aparece a partir da 1.ª–2.ª semana; a eletroneuromiografia confirma a polirradiculoneuropatia. Pode haver diparesia facial.|q-sirio2021-046,q-fmabc2022-052,q-usp2022-058,q-unicamp2023-008]] [[As complicações que matam são **insuficiência respiratória** (diafragma fraco: hipoventilação, PaO2 baixa com **PaCO2 alta**) e **disautonomia** (arritmias, PA instável). Por isso **internar** e monitorar capacidade vital.|q-usp2025-078,q-sessp2026-014,q-uspsp4-010]] [[Tratamento: **imunoglobulina IV 0,4 g/kg/dia por 5 dias** ou **plasmaférese**, equivalentes em eficácia; **corticoide não** funciona.|q-tp20232-012,q-tp20261-007,q-uspsp4-010,q-amrigs2021-077,q-sirio2025-084]] [[Oftalmoplegia, ataxia e arreflexia: **Miller Fisher**, com anticorpo **anti-GQ1b**.|q-fmabc2023-058]]`,
          texto: `- Ascendente, flácida, arreflexa após infecção. {q-amrigs2022-003,q-tp20232-012,q-tp20261-007}
- Líquor: **proteína alta, poucas células**. {q-sirio2021-046,q-fmabc2022-052,q-usp2022-058,q-unicamp2023-008}
- Riscos: **respiratório e disautonomia**; internar. {q-usp2025-078,q-sessp2026-014,q-uspsp4-010}
- **Imunoglobulina ou plasmaférese**; corticoide não. {q-amrigs2021-077,q-sirio2025-084}
- Miller Fisher: **anti-GQ1b**. {q-fmabc2023-058}` },
      ],
    },
    {
      id: "jnm", titulo: "Miastenia e ELA",
      introducao: `[[Na **miastenia**, anticorpos contra o receptor de acetilcolina diminuem os receptores disponíveis: cada contração gasta a reserva e a força cai com o uso — **fatigabilidade**, pior no fim do dia, que melhora com repouso. Começa nos olhos (ptose, diplopia) e pode chegar à deglutição e à respiração. Na **ELA**, os neurônios motores superiores e inferiores morrem juntos.|q-unifesp2024-063,q-unifesp2025-062,q-uspsp5-010]]`,
      fragmentos: [
        { id: "jnm-miastenia", titulo: "Miastenia gravis", conferir: true, diretrizes: ["miastenia"],
          questoes: ["q-unifesp2024-063","q-unifesp2025-062","q-unicampdis2024-066","q-usp2023-060","q-adap25-062"],
          prosa: `[[Ptose e diplopia que pioram no fim do dia, fraqueza proximal com fadiga: pedir **anti-receptor de acetilcolina**, **eletroneuromiografia** (decremento na estimulação repetitiva) e **tomografia de tórax**, porque o **timoma** é a neoplasia associada.|q-unifesp2024-063,q-unifesp2025-062,q-unicampdis2024-066]] [[**Crise miastênica**: voz anasalada, disfagia, broncoaspiração, hipercapnia, capacidade vital < 15–20 mL/kg ou PImax pior que −20/−30: **intubação** e **imunoglobulina ou plasmaférese**.|q-usp2023-060,q-adap25-062]]`,
          texto: `- Fatigabilidade ocular: **anti-AChR, ENMG, TC de tórax (timoma)**. {q-unifesp2024-063,q-unifesp2025-062,q-unicampdis2024-066}
- Crise: **intubar** + imunoglobulina/plasmaférese. {q-usp2023-060,q-adap25-062}` },
        { id: "jnm-ela", titulo: "Esclerose lateral amiotrófica", conferir: true, diretrizes: ["ela"],
          questoes: ["q-uspsp5-010","q-unifesp2024-062","q-simepm89-048","q-adap21-008"],
          prosa: `[[Fraqueza assimétrica progressiva com **atrofia e fasciculações** (neurônio inferior) junto de **hiper-reflexia e Babinski** (superior), **sem alteração sensitiva nem esfincteriana**, às vezes com disfagia e disartria bulbar: **ELA**. A ENMG mostra desnervação em várias regiões.|q-uspsp5-010,q-unifesp2024-062,q-simepm89-048]] [[O **riluzol** prolonga a sobrevida por alguns meses; a **ventilação não invasiva** e o suporte multidisciplinar prolongam mais e melhoram a vida.|q-adap21-008]]`,
          texto: `- Superior + inferior, **sensibilidade normal**: ELA. {q-uspsp5-010,q-unifesp2024-062,q-simepm89-048}
- **Riluzol + VNI**. {q-adap21-008}` },
      ],
    },
    {
      id: "desmielinizantes", titulo: "Doenças desmielinizantes do SNC",
      introducao: `[[Na esclerose múltipla, linfócitos atravessam a barreira e atacam a mielina em placas, em lugares e tempos diferentes; cada surto é uma placa nova, e a recuperação vem da remielinização parcial. A neuromielite óptica é outra doença: anticorpo contra a **aquaporina-4** dos astrócitos, com lesões longas e graves.|q-didepm-051,q-adap24-071]]`,
      fragmentos: [
        { id: "des-em", titulo: "Esclerose múltipla, neurite óptica e NMO", conferir: true, diretrizes: ["mcdonald"],
          questoes: ["q-didepm-051","q-uspsp3-090","q-amrigs2024-009","q-iamspe2023-015","q-unifesp2024-041","q-adap24-071","q-fmabc2024-018","q-fmabc2024-011"],
          prosa: `[[Mulher jovem com surto neurológico e lesões **ovais periventriculares e justacorticais**, algumas captando gadolínio e outras não (**disseminação no espaço e no tempo**), com **bandas oligoclonais** no líquor: **esclerose múltipla remitente-recorrente** — surto com **pulso de metilprednisolona**, e terapia modificadora da doença cedo.|q-didepm-051,q-uspsp3-090,q-amrigs2024-009]] [[**Neurite óptica** em mulher jovem: dor à movimentação do olho, baixa visual, discromatopsia, **defeito pupilar aferente**, papila normal (retrobulbar). A causa mais comum é **desmielinizante**; ressonância de crânio para buscar EM e pulsoterapia.|q-iamspe2023-015,q-unifesp2024-041]] [[Mielite **longitudinalmente extensa** (≥ 3 segmentos) com neurite óptica e crânio sem lesões típicas: **neuromielite óptica** — pulso de corticoide e **anti-AQP4**.|q-adap24-071]] [[Queixa cognitiva na EM sem depressão ativa: **reabilitação cognitiva**. Paraparesia espástica progressiva com bandas e ressonância normal: pensar em **HTLV-1**.|q-fmabc2024-018,q-fmabc2024-011]]`,
          texto: `- Espaço + tempo + **bandas oligoclonais**: EM → pulso + modificador. {q-didepm-051,q-uspsp3-090,q-amrigs2024-009}
- Neurite óptica: **desmielinizante**; RM e pulso. {q-iamspe2023-015,q-unifesp2024-041}
- Mielite extensa + óptico: **NMO**, anti-AQP4. {q-adap24-071}
- Paraparesia espástica: **HTLV**; cognição: reabilitação. {q-fmabc2024-011,q-fmabc2024-018}` },
        { id: "des-encefalite", titulo: "Encefalite autoimune", conferir: true, diretrizes: ["mcdonald"],
          casos: ["q-adap24-043"],
          questoes: ["q-adap24-043"],
          prosa: `[[Mulher jovem com sintomas psiquiátricos, crises, discinesias e líquor linfocitário com ressonância normal: **encefalite anti-NMDA**, muitas vezes paraneoplásica por **teratoma de ovário** — pedir anticorpo e imagem da pelve.|q-adap24-043]]`,
          texto: `- Psiquiátrico + crises: **anti-NMDAR**, procurar **teratoma**. {q-adap24-043}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["ela","ean-gbs"],
          questoes: ["q-unifesp2024-062","q-amrigs2022-003","q-uspsp4-010"],
          prosa: `[[**ELA e "segundo neurônio"**: a ELA atinge os dois neurônios; a unifesp2024-062 descreveu hiper-reflexia com ENMG de **segundo neurônio** e respondeu **ELA**.|q-unifesp2024-062]] [[**Gatilho do Guillain-Barré**: o mais clássico é o Campylobacter; a amrigs2022-003 aceitou como correto o início após infecção viral (zika, entéricos, covid).|q-amrigs2022-003]] [[**Quem tratar**: imunoglobulina é para quem não anda sozinho ou piora; a uspsp4-010, com marcha cautelosa e ainda deambulando, já **internou e iniciou imunoglobulina**.|q-uspsp4-010]]`,
          texto: `- ELA com "segundo neurônio": a prova manteve **ELA**. {q-unifesp2024-062}
- Gatilho **viral** aceito. {q-amrigs2022-003}
- Imunoglobulina **já** com marcha preservada. {q-uspsp4-010}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: fraqueza aguda e subaguda",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-fraqueza", titulo: "Como separar", conferir: true,
          questoes: ["q-tp20232-012","q-unifesp2025-062","q-simepm89-048","q-usp2023-058","q-didepm-051"],
          prosa: `[[Reflexos, sensibilidade e curso separam as causas.|q-tp20232-012,q-unifesp2025-062,q-simepm89-048,q-usp2023-058,q-didepm-051]]

| | Guillain-Barré | Miastenia | ELA | Mielite | Esclerose múltipla |
| Reflexos | abolidos | normais | aumentados e atrofia | aumentados (depois) | aumentados |
| Sensibilidade | parestesias leves | normal | normal | nível sensitivo | variável |
| Marca | ascendente pós-infecção | fatigabilidade, ptose | fasciculações | esfíncteres | surtos, bandas |
| Exame | líquor: proteína alta | anti-AChR, ENMG | ENMG | RM medular | RM + líquor |`,
          texto: `- Arreflexia ascendente: **GBS**. {q-tp20232-012}
- Fatigabilidade: **miastenia**. {q-unifesp2025-062}
- Fasciculação + Babinski: **ELA**. {q-simepm89-048}
- Nível sensitivo: **mielite**. {q-usp2023-058}
- Surtos + bandas: **EM**. {q-didepm-051}` },
      ],
    },
  ],
});
