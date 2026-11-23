/* resumos/vasculites/resumo.js — resumo adaptativo de vasculites (ass-reumato-vasculites): classificação
   por calibre (Chapel Hill), arterite de células gigantes e polimialgia, Takayasu, poliarterite nodosa,
   Kawasaki, vasculite por IgA, vasculites ANCA (GPA, MPA, EGPA), crioglobulinemia, e as questões de
   síndrome antifosfolípide e esclerose sistêmica do mesmo assunto; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- vasculites */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "vasculites",
  titulo: "Vasculites",
  assunto: "ass-reumato-vasculites",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "chapel-hill", texto: "Jennette et al. — 2012 Revised International Chapel Hill Consensus Conference Nomenclature of Vasculitides (Arthritis Rheum 2013)", lidoEm: null },
    { id: "eular-vgv", texto: "EULAR 2018 — recommendations for the management of large vessel vasculitis; ACR/EULAR 2022 — classification criteria for GCA e Takayasu", lidoEm: null },
    { id: "eular-aav", texto: "EULAR 2022 — recommendations for the management of ANCA-associated vasculitis (Ann Rheum Dis 2024) e KDIGO 2024 (vasculite ANCA)", lidoEm: null },
    { id: "aha-kawasaki", texto: "American Heart Association — Diagnosis, Treatment, and Long-Term Management of Kawasaki Disease (Circulation 2017; atualização 2024)", lidoEm: null },
    { id: "share-iga", texto: "SHARE — European consensus-based recommendations for IgA vasculitis (Rheumatology 2019)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "visao", titulo: "Como pensar em vasculite",
      introducao: `[[Vasculite é inflamação da parede do vaso. O que define o quadro é o **calibre** do vaso atingido: grandes vasos (aorta e ramos) dão claudicação, pulsos assimétricos e sopros; médios vasos dão infarto de órgão, microaneurismas e mononeurite; pequenos vasos dão púrpura palpável, glomerulonefrite e hemorragia alveolar. Todas têm sintomas gerais (febre, perda de peso) e provas inflamatórias altas.|q-iamspe2022-013,q-adap24-016,q-sirio2026-014,q-adap23-016]]

Veja também: **Endocardite** (simula vasculite), **Glomerulopatias**, **Lúpus**, **Doenças exantemáticas** (diferencial de Kawasaki) e **Hepatites virais** quando houver resumo.`,
      fragmentos: [
        { id: "vis-calibre", titulo: "Classificação por calibre", conferir: true, diretrizes: ["chapel-hill"],
          figuras: [{ arquivo: "figuras/calibre-vasculites.svg", legenda: "Esquema autoral: as vasculites pelo calibre do vaso e o que cada calibre produz." }],
          questoes: ["q-iamspe2022-013","q-adap24-016","q-sirio2026-014","q-adap23-016","q-unicampdis2023-006"],
          prosa: `[[Grandes vasos: **arterite de células gigantes** e **Takayasu**. Médios: **poliarterite nodosa** e **Kawasaki**. Pequenos: as associadas ao ANCA (granulomatose com poliangeíte, poliangeíte microscópica, granulomatose eosinofílica) e as por imunocomplexos (**vasculite por IgA**, crioglobulinemia).|q-iamspe2022-013,q-adap24-016,q-sirio2026-014,q-adap23-016]] [[Antes de fechar vasculite com púrpura, febre e lesão renal, descartar o que a imita: **endocardite infecciosa** (hemoculturas, ecocardiograma) e crioglobulinemia.|q-unicampdis2023-006]]`,
          texto: `- Grandes: **ACG, Takayasu**; médios: **PAN, Kawasaki**; pequenos: **ANCA, IgA, crio**. {q-iamspe2022-013,q-adap24-016,q-sirio2026-014,q-adap23-016}
- Descartar **endocardite**. {q-unicampdis2023-006}` },
      ],
    },
    {
      id: "grandes", titulo: "Grandes vasos",
      introducao: `[[As duas vasculites de grandes vasos têm a mesma histologia (granulomas na parede, células gigantes) e se separam pela idade: acima de 50 anos é arterite de células gigantes; abaixo de 40, Takayasu.|q-tp20232-017,q-adap23-016]]`,
      fragmentos: [
        { id: "gra-acg", titulo: "Arterite de células gigantes e polimialgia reumática", conferir: true, diretrizes: ["eular-vgv"],
          questoes: ["q-tp20232-017","q-tp20261-107","q-adap26-037","q-scmsp2025-015","q-unifesp2023-016","q-unifesp2026-037","q-usprp2021-114"],
          prosa: `[[Acima de 50 anos, cefaleia nova, **claudicação de mandíbula** (dor ao mastigar que cessa ao parar), artéria temporal dolorosa ou endurecida e VHS muito alta: **arterite de células gigantes**. Pode atingir aorta e ramos, não só as artérias do crânio.|q-tp20232-017,q-tp20261-107,q-scmsp2025-015]] [[O risco é a **cegueira** por neuropatia óptica isquêmica: **prednisona em dose alta imediatamente**, e biópsia da temporal (ou ultrassonografia) depois, sem esperar o resultado — a biópsia continua positiva por semanas.|q-adap26-037]] [[A **polimialgia reumática** é a mesma doença em outro lugar: dor e rigidez matinal em cinturas escapular e pélvica, acima de 50 anos, VHS alta, força preservada, bursite subacromial na ultrassonografia, FR e FAN negativos. Responde rápido a corticoide em dose baixa. As duas coexistem: PET com captação em aorta e cinturas sugere ambas.|q-unifesp2023-016,q-unifesp2026-037,q-usprp2021-114]]`,
          texto: `- > 50 anos, **claudicação de mandíbula**, VHS alta: **ACG**. {q-tp20232-017,q-tp20261-107,q-scmsp2025-015}
- **Corticoide já**, biópsia depois. {q-adap26-037}
- Cinturas, rigidez, força normal: **polimialgia**. {q-unifesp2023-016,q-unifesp2026-037,q-usprp2021-114}` },
        { id: "gra-takayasu", titulo: "Arterite de Takayasu", conferir: true, diretrizes: ["eular-vgv"],
          questoes: ["q-adap23-016","q-unesp2023-076","q-tp20241-056","q-tp20261-045","q-fmabc2024-015"],
          prosa: `[[Mulher jovem com pulsos diminuídos ou ausentes num braço, diferença de pressão entre os membros, claudicação de membro superior, sopros e provas inflamatórias altas: **Takayasu** (a "doença sem pulso"). A estenose de renal causa hipertensão grave; a de carótidas e vertebrais, amaurose e AVC.|q-adap23-016,q-unesp2023-076,q-tp20241-056,q-tp20261-045,q-fmabc2024-015]] [[Tratamento clínico: **glicocorticoide em dose alta com poupador** (metotrexato, azatioprina); nos refratários, anti-TNF (infliximabe) ou tocilizumabe. Revascularização só na fase inativa e para isquemia crítica — não se desobstrui artéria inflamada.|q-adap23-016,q-unesp2023-076,q-fmabc2024-015]]`,
          texto: `- Jovem, **pulso ausente**, PA assimétrica: **Takayasu**. {q-adap23-016,q-unesp2023-076,q-tp20241-056,q-tp20261-045}
- **Corticoide + poupador**; anti-TNF se refratária. {q-adap23-016,q-fmabc2024-015}` },
      ],
    },
    {
      id: "medios", titulo: "Médios vasos",
      introducao: `[[Nos vasos médios, a inflamação necrosa a parede e forma **aneurismas**: na poliarterite nodosa, microaneurismas mesentéricos e renais; no Kawasaki, aneurismas de coronária.|q-didepm-036,q-iamspe2021-040]]`,
      fragmentos: [
        { id: "med-pan", titulo: "Poliarterite nodosa", conferir: true, diretrizes: ["chapel-hill"],
          questoes: ["q-sirio2026-014","q-didepm-036","q-einstein2021-005","q-simepm89-047"],
          prosa: `[[Perda de peso, dor abdominal pós-prandial, **mononeurite múltipla** (pé caído), dor testicular, hipertensão e livedo: **poliarterite nodosa**. Poupa o glomérulo e o pulmão (por isso não há hemácias dismórficas nem hemorragia alveolar) e é **ANCA negativa**; a biópsia mostra necrose fibrinoide transmural de artéria média, e a angiografia, microaneurismas.|q-sirio2026-014,q-didepm-036,q-einstein2021-005]] [[A associação clássica é com a **hepatite B**: imunocomplexos com o antígeno viral. Tratamento: corticoide curto, **antiviral** e, nos graves, plasmaférese — imunossupressão longa piora a hepatite.|q-didepm-036,q-einstein2021-005,q-simepm89-047]]`,
          texto: `- Mononeurite, dor abdominal, **ANCA negativo**: PAN. {q-sirio2026-014,q-didepm-036,q-einstein2021-005}
- **Hepatite B**: antiviral + corticoide. {q-didepm-036,q-simepm89-047}` },
        { id: "med-kawasaki", titulo: "Doença de Kawasaki", conferir: true, diretrizes: ["aha-kawasaki"],
          casos: ["q-usprp2021-038"],
          questoes: ["q-adap21-114","q-usprp2021-038","q-fmabc2021-095","q-iamspe2021-040","q-iamspe2023-046","q-uspsp5-100","q-usprp2027-049","q-einstein2026-038","q-usprp2024-069"],
          prosa: `[[Criança pequena com **febre por 5 dias ou mais** e quatro de cinco critérios: conjuntivite sem secreção, alterações de lábios e boca (língua em framboesa), exantema polimorfo, alterações de extremidades (edema, eritema, depois descamação) e linfonodo cervical acima de 1,5 cm, em geral único. Reação na cicatriz do BCG é pista no lactente.|q-adap21-114,q-usprp2021-038,q-fmabc2021-095]] [[No **Kawasaki incompleto** os critérios são poucos e os exames sustentam: PCR e VHS altas, **leucocitose, plaquetose** (a partir da segunda semana), anemia, **ALT elevada**, albumina baixa e piúria estéril.|q-uspsp5-100,q-usprp2027-049]] [[O tratamento visa a evitar **aneurisma de coronária**: **imunoglobulina 2 g/kg** em dose única, nos primeiros 10 dias, e AAS (dose moderada a alta na fase febril, depois 3–5 mg/kg até o eco normalizar). Alto risco (aneurisma já no início, idade < 6 meses, choque) recebe imunoglobulina **mais corticoide** ou biológico.|q-adap21-114,q-usprp2021-038,q-iamspe2021-040,q-iamspe2023-046,q-einstein2026-038]] [[Infarto em criança ou adulto jovem por trombose de aneurisma coronariano: perguntar por **febre prolongada com conjuntivite e exantema** no passado.|q-usprp2024-069]]`,
          texto: `- Febre ≥ 5 dias + 4 de 5 critérios: **Kawasaki**. {q-adap21-114,q-usprp2021-038,q-fmabc2021-095}
- Incompleto: **plaquetose**, ALT alta, PCR alta. {q-uspsp5-100,q-usprp2027-049}
- **Imunoglobulina 2 g/kg + AAS**; alto risco + corticoide. {q-iamspe2021-040,q-iamspe2023-046,q-einstein2026-038}
- Infarto jovem com aneurisma: **Kawasaki prévio**. {q-usprp2024-069}` },
      ],
    },
    {
      id: "pequenos", titulo: "Pequenos vasos",
      introducao: `[[A púrpura palpável é o sinal dos pequenos vasos: a inflamação da vênula deixa sangue sair e o infiltrado faz relevo. Na biópsia, **vasculite leucocitoclástica** (neutrófilos com restos nucleares na parede).|q-einstein2024-033,q-scmsp2025-048]]`,
      fragmentos: [
        { id: "peq-iga", titulo: "Vasculite por IgA (Henoch-Schönlein)", conferir: true, diretrizes: ["share-iga"],
          casos: ["q-usp2024-011","q-usprp2023-005","q-usprp2026-042","q-unicamp2023-038"],
          questoes: ["q-usprp2025-009","q-unicamp2023-038","q-scmsp2025-048","q-sirio2022-054","q-einstein2024-033","q-famerp2024-054","q-unesp2024-009","q-tp20252-032","q-famerp2026-039","q-usp2024-011","q-adap21-038","q-usprp2023-005","q-usprp2026-042"],
          prosa: `[[A vasculite mais comum da infância: criança de 3 a 10 anos, dias após infecção de vias aéreas, com **púrpura palpável em membros inferiores e nádegas** e plaquetas normais, **artrite ou artralgia** de tornozelos e joelhos, **dor abdominal** e, em parte dos casos, hematúria. Abaixo de 5 anos pode haver edema de couro cabeludo e púrpura em face e orelhas.|q-usprp2025-009,q-unicamp2023-038,q-famerp2024-054,q-unesp2024-009,q-tp20252-032]] [[A fisiopatologia é o depósito de **imunocomplexos com IgA** na parede de pequenos vasos; a biópsia mostra vasculite leucocitoclástica com IgA à imunofluorescência.|q-scmsp2025-048,q-sirio2022-054,q-einstein2024-033]] [[Na apresentação pede-se hemograma (plaquetas normais separam de púrpura trombocitopênica), provas inflamatórias e **urina e função renal**; o **seguimento com urina e pressão por 6 meses** é obrigatório, porque a nefrite pode aparecer semanas depois.|q-tp20252-032,q-famerp2026-039,q-usp2024-011,q-adap21-038]] [[O tratamento é de suporte: **analgesia**, hidratação e repouso; corticoide só para dor abdominal intensa ou orquite, e não previne nefrite. Dor abdominal forte pede **ultrassonografia** atrás da **intussuscepção** ileoileal.|q-adap21-038,q-usprp2023-005,q-usprp2026-042]]`,
          texto: `- Criança, púrpura em MMII, artralgia, dor abdominal, **plaquetas normais**: IgA. {q-usprp2025-009,q-unicamp2023-038,q-famerp2024-054,q-unesp2024-009,q-tp20252-032}
- **Imunocomplexos IgA**, leucocitoclástica. {q-scmsp2025-048,q-sirio2022-054,q-einstein2024-033}
- **Urina e função renal** na entrada e por 6 meses. {q-famerp2026-039,q-usp2024-011,q-adap21-038}
- **Suporte**; dor forte: USG (intussuscepção). {q-usprp2023-005,q-usprp2026-042}` },
        { id: "peq-anca", titulo: "Vasculites associadas ao ANCA", conferir: true, diretrizes: ["eular-aav"],
          questoes: ["q-adap24-016","q-adap23-010","q-scmsp2021-009"],
          prosa: `[[Glomerulonefrite rapidamente progressiva (creatinina dobrando em semanas, hemácias dismórficas, cilindros hemáticos) com complemento normal e ANCA positivo é **vasculite de pequenos vasos pauci-imune**. **p-ANCA/anti-MPO** aponta para poliangeíte microscópica; **c-ANCA/anti-PR3** com nódulos escavados no pulmão e sinusite, para granulomatose com poliangeíte.|q-adap24-016,q-adap23-010]] [[Asma de difícil controle, eosinofilia e infiltrado pulmonar: **granulomatose eosinofílica com poliangeíte**, com granulomas ricos em eosinófilos.|q-scmsp2021-009]] [[A forma grave (rim, pulmão) se induz com **pulso de metilprednisolona seguido de prednisona, mais rituximabe ou ciclofosfamida**; plasmaférese fica para casos selecionados.|q-adap23-010]]`,
          texto: `- GNRP + **anti-MPO**: poliangeíte microscópica; **anti-PR3** + nódulos: GPA. {q-adap24-016,q-adap23-010}
- Asma + eosinofilia: **EGPA**. {q-scmsp2021-009}
- Grave: **pulso + rituximabe ou ciclofosfamida**. {q-adap23-010}` },
        { id: "peq-crio", titulo: "Crioglobulinemia", conferir: true, diretrizes: ["chapel-hill"],
          questoes: ["q-sirio2023-014","q-amrigs2025-013","q-unicampdis2023-006"],
          prosa: `[[Púrpura, artralgia e fraqueza (tríade de Meltzer), com complemento C4 baixo e fator reumatoide positivo: **crioglobulinemia mista**, cuja causa mais comum é a **hepatite C**. O tipo I é monoclonal, sem atividade de fator reumatoide, ligado a mieloma e Waldenström; os tipos II e III (mistos) causam vasculite de pequenos vasos.|q-sirio2023-014,q-amrigs2025-013,q-unicampdis2023-006]]`,
          texto: `- Crio mista: **hepatite C**; tipo I: neoplasia hematológica. {q-sirio2023-014,q-amrigs2025-013,q-unicampdis2023-006}` },
      ],
    },
    {
      id: "outras", titulo: "Outras doenças do mesmo assunto",
      introducao: `[[O assunto também reúne questões de síndrome antifosfolípide e de esclerose sistêmica, doenças em que o vaso é o alvo sem inflamação clássica da parede: trombose na primeira, vasculopatia obliterante na segunda.|q-unifesp2023-052,q-unifesp2023-010]]`,
      fragmentos: [
        { id: "out-saf-es", titulo: "SAF e esclerose sistêmica", conferir: true, diretrizes: ["chapel-hill"],
          questoes: ["q-unifesp2023-052","q-adap23-052","q-unifesp2023-010"],
          prosa: `[[**SAF** exige critério clínico (trombose, perda fetal a partir de 10 semanas, perdas precoces repetidas, parto prematuro por pré-eclâmpsia) e anticorpo persistente (anticoagulante lúpico, anticardiolipina ou **anti-β2-glicoproteína I** em título moderado a alto, repetido após 12 semanas).|q-unifesp2023-052]] [[Na SAF trombótica que engravida, a **varfarina é teratogênica** entre 6 e 12 semanas: trocar já por **heparina de baixo peso molecular em dose terapêutica com AAS** em dose baixa.|q-adap23-052]] [[Raynaud recente em adulto, com refluxo que não melhora com inibidor de bomba (dismotilidade esofágica), sugere **esclerose sistêmica**.|q-unifesp2023-010]]`,
          texto: `- SAF: clínica + **anticorpo repetido em 12 semanas**. {q-unifesp2023-052}
- Gestante com SAF trombótica: **HBPM terapêutica + AAS**. {q-adap23-052}
- Raynaud + refluxo: **esclerose sistêmica**. {q-unifesp2023-010}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["chapel-hill","aha-kawasaki"],
          questoes: ["q-simepm89-047","q-scmsp2025-015","q-usprp2027-049","q-fmabc2024-015","q-unicampdis2023-006"],
          prosa: `[[**PAN e ANCA**: a poliarterite nodosa é ANCA negativa; a simepm89-047, com hepatite B, mononeurite e dor testicular, respondeu **poliarterite nodosa mesmo com anti-MPO positivo**.|q-simepm89-047]] [[**ACG não é só craniana**: a scmsp2025-015 pediu a exceção e marcou errada a ideia de inflamação **restrita** aos ramos do arco aórtico.|q-scmsp2025-015]] [[**Plaquetose no Kawasaki** é achado da segunda semana e não confirma o diagnóstico; a usprp2027-049, no 6.º dia, escolheu **leucocitose e plaquetose** como os achados que confirmam.|q-usprp2027-049]] [[**Takayasu refratário**: o biológico mais citado hoje é o tocilizumabe ou o anti-TNF; a fmabc2024-015 aceitou **infliximabe** quando a ciclofosfamida foi recusada.|q-fmabc2024-015]] [[**Púrpura com hemoptise e nefrite** parece vasculite, mas a unicampdis2023-006 pediu como diagnóstico a descartar a **endocardite infecciosa** (aceitando também crioglobulinemia).|q-unicampdis2023-006]]`,
          texto: `- PAN com **anti-MPO**: a prova manteve PAN. {q-simepm89-047}
- ACG **não é restrita** ao arco. {q-scmsp2025-015}
- Kawasaki: a prova usou **plaquetose** para confirmar. {q-usprp2027-049}
- Takayasu: **infliximabe**. {q-fmabc2024-015}
- Descartar **endocardite**. {q-unicampdis2023-006}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: as vasculites lado a lado",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-vasculites", titulo: "Quem, onde e como tratar", conferir: true,
          questoes: ["q-tp20232-017","q-tp20241-056","q-sirio2026-014","q-adap21-114","q-usprp2025-009","q-adap24-016"],
          prosa: `[[Idade, calibre e o órgão atingido separam as vasculites.|q-tp20232-017,q-tp20241-056,q-sirio2026-014,q-adap21-114,q-usprp2025-009,q-adap24-016]]

| | ACG | Takayasu | PAN | Kawasaki | IgA | ANCA |
|---|---|---|---|---|---|---|
| Quem | > 50 anos | mulher < 40 | adulto, hepatite B | < 5 anos | criança 3–10 | adulto |
| Calibre | grande | grande | médio | médio | pequeno | pequeno |
| Marca | claudicação de mandíbula, cegueira | pulso ausente, PA assimétrica | mononeurite, microaneurisma, ANCA − | febre ≥ 5 dias, coronária | púrpura, plaquetas normais | GNRP, hemorragia alveolar |
| Tratamento | corticoide já | corticoide + poupador | corticoide + antiviral | imunoglobulina + AAS | suporte; urina 6 meses | pulso + rituximabe/ciclofosfamida |`,
          texto: `- Idoso, mandíbula: **ACG**. {q-tp20232-017}
- Jovem sem pulso: **Takayasu**. {q-tp20241-056}
- Mononeurite e hepatite B: **PAN**. {q-sirio2026-014}
- Febre e coronária: **Kawasaki**. {q-adap21-114}
- Púrpura infantil: **IgA**. {q-usprp2025-009}
- GNRP com ANCA: **pequenos vasos**. {q-adap24-016}` },
      ],
    },
  ],
});
