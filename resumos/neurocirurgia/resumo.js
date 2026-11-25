/* resumos/neurocirurgia/resumo.js — resumo adaptativo de neurocirurgia não traumática: tumores do SNC
   no adulto e na criança (glioblastoma, metástase, meningioma, fossa posterior), hipertensão
   intracraniana e edema, compressão medular, hidrocefalia (DVP e sua disfunção, hidrocefalia de
   pressão normal), disrafismos (meningomielocele, Chiari, medula presa) e lesões de plexo e nervos
   periféricos. Assuntos: ass-neurocir-tumores (principal), ass-neurocir-hidrocefalia,
   ass-neurocir-plexobraquial. Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- neurocirurgia */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "neurocirurgia",
  titulo: "Neurocirurgia: tumores, hidrocefalia e nervos periféricos",
  assunto: "ass-neurocir-tumores",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "eano-gliomas", texto: "EANO 2021 — diagnosis and treatment of adult diffuse gliomas; OMS 2021 — classificação dos tumores do SNC; protocolo de Stupp", lidoEm: null },
    { id: "eano-meningioma", texto: "EANO 2021 — guideline on meningiomas", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "tumores", titulo: "Tumores do sistema nervoso central",
      introducao: `[[O tumor cerebral se manifesta de três jeitos: **hipertensão intracraniana** (cefaleia **matinal ou noturna que acorda**, vômitos "em jato", papiledema, diplopia pelo VI nervo), **crise epiléptica inédita** (sobretudo focal, num adulto) e **déficit focal progressivo** em semanas (hemiparesia, afasia). Cefaleia que muda de padrão, piora deitado, acorda a criança com vômitos ou vem com sinal neurológico pede **imagem**.|q-usprp2021-041,q-tp20212-050,q-uspsp3-048,q-tp20222-075,q-usprp2024-079]] [[No adulto, a maioria dos tumores cerebrais é **metástase** (pulmão, mama, melanoma, rim, cólon); entre os primários, o **glioblastoma** (o mais comum e agressivo, lesão com **realce em anel e necrose central**, edema e efeito de massa) e o **meningioma** (extra-axial, **cauda dural**, benigno, mais em mulheres). Na criança, os tumores sólidos mais comuns depois das leucemias são os do SNC, e mais da metade fica na **fossa posterior** (meduloblastoma, **astrocitoma pilocítico**, ependimoma).|q-tp20252-085,q-usprp2023-086,q-tp20261-069,q-tp20251-071,q-unifesp2022-075]]

Veja também: **Neurologia** (crise epiléptica, coma), **Traumatismo cranioencefálico**, **Meningites** e **Infecções congênitas** (toxoplasmose).`,
      fragmentos: [
        { id: "tum-adulto", titulo: "Adulto: glioblastoma, metástase e meningioma", conferir: true, diretrizes: ["eano-gliomas","eano-meningioma"],
          questoes: ["q-usprp2023-086","q-usprp2024-021","q-tp20261-069","q-adap22-075","q-tp20252-085","q-tp20251-071","q-adap21-041","q-fmabc2024-027"],
          prosa: `[[Idoso com crise inédita, cefaleia progressiva e déficit, com lesão de **realce anelar, necrose e edema**: **glioblastoma**. Tratamento: **ressecção máxima segura**, depois **radioterapia com temozolomida** e temozolomida adjuvante (protocolo de Stupp). Lesão sólida única num paciente com câncer conhecido, ou cuja histologia mostra glândulas com mucina: **metástase** (o adenocarcinoma de cólon é um exemplo).|q-usprp2023-086,q-usprp2024-021,q-tp20261-069,q-adap22-075,q-tp20252-085]] [[**Meningioma** cresce devagar e comprime: hemiparesia de instalação lenta, predomínio crural no da foice. Pequeno, **assintomático e sem edema**: **observação com ressonância seriada**; sintomático ou crescendo: cirurgia ou radiocirurgia. O **schwannoma vestibular** (ângulo pontocerebelar) dá hipoacusia unilateral e zumbido; grande, comprime o nervo **facial** e o trigêmeo.|q-tp20251-071,q-adap21-041,q-fmabc2024-027]]`,
          texto: `- Idoso, crise inédita, realce anelar: **glioblastoma** → ressecção + RT/temozolomida. {q-usprp2023-086,q-usprp2024-021,q-tp20261-069,q-adap22-075}
- Histologia com mucina: **metástase de cólon**. {q-tp20252-085}
- Déficit lento, extra-axial: **meningioma**; pequeno assintomático: **observar**. {q-tp20251-071,q-adap21-041}
- Schwannoma grande: compressão do **facial**. {q-fmabc2024-027}` },
        { id: "tum-crianca", titulo: "Criança: fossa posterior", conferir: true,
          questoes: ["q-unifesp2022-075","q-usprp2021-041","q-tp20241-071","q-unesp2025-018","q-unesp2026-018","q-tp20212-050","q-uspsp3-048","q-usprp2024-079"],
          prosa: `[[Criança com **cefaleia matinal e vômitos** há semanas, **ataxia de marcha, dismetria** e decomposição dos movimentos: **tumor de fossa posterior** (cerebelo), que também obstrui o IV ventrículo e causa hidrocefalia. O **astrocitoma pilocítico** (cístico, com nódulo mural, no hemisfério cerebelar) é o de melhor prognóstico; o **meduloblastoma** fica na linha média e é maligno. Investigar com **tomografia ou ressonância** e encaminhar ao serviço terciário depois de estabilizar. Crise focal com sonolência pós-ictal numa criança pode ser **tumor supratentorial**.|q-unifesp2022-075,q-usprp2021-041,q-tp20241-071,q-unesp2025-018,q-unesp2026-018,q-tp20212-050,q-uspsp3-048,q-usprp2024-079]]`,
          texto: `- Cefaleia matinal + vômitos + ataxia: **fossa posterior**; pilocítico. {q-unifesp2022-075,q-usprp2021-041,q-tp20241-071,q-unesp2025-018,q-unesp2026-018}
- Cefaleia progressiva na criança: **tomografia**; encaminhar. {q-tp20212-050,q-uspsp3-048}
- Crise focal: **tumor parietal**. {q-usprp2024-079}` },
        { id: "tum-urgencias", titulo: "Edema, hipertensão intracraniana e compressão medular", conferir: true,
          questoes: ["q-tp20222-075","q-unesp2024-080","q-scmsp2025-032","q-scmsp2023-011"],
          prosa: `[[O edema em volta do tumor é **vasogênico** (a barreira hematoencefálica vaza): responde a **corticoide — dexametasona**, que melhora o déficit e a hipertensão intracraniana em horas; se houve crise, **anticonvulsivante** (fenitoína, levetiracetam).|q-tp20222-075,q-unesp2024-080]] [[Paciente com câncer, **dor lombar** e **fraqueza nas pernas com retenção urinária**: **compressão medular neoplásica** — urgência: dexametasona e **radioterapia imediata** (ou cirurgia descompressiva) para preservar a marcha. Depois de cirurgia **transesfenoidal**, **rinorreia clara** com febre é **fístula liquórica** com meningite: antibiótico e reduzir a produção de líquor (**acetazolamida**), reparo se persiste.|q-scmsp2025-032,q-scmsp2023-011]]`,
          texto: `- Edema peritumoral: **dexametasona**; crise: **fenitoína**. {q-tp20222-075,q-unesp2024-080}
- Câncer + dor lombar + paraparesia + retenção: **compressão medular** → **radioterapia já**. {q-scmsp2025-032}
- Rinorreia clara após transesfenoidal: **fístula** → acetazolamida. {q-scmsp2023-011}` },
      ],
    },
    {
      id: "hidrocefalia", titulo: "Hidrocefalia e disrafismos",
      introducao: `[[O líquor é produzido nos plexos coroides, circula pelos ventrículos e é absorvido nas granulações aracnoides. **Hidrocefalia obstrutiva** (não comunicante): algo bloqueia o caminho (tumor de fossa posterior, estenose do aqueduto); **comunicante**: a absorção falha (depois de **meningite** ou hemorragia). No **lactente**, as suturas abertas deixam a cabeça crescer: **perímetro cefálico que cruza percentis**, fontanela abaulada, veias do couro cabeludo dilatadas, **olhar em sol poente**, irritabilidade.|q-unesp2021-019,q-unifesp2023-100,q-tp20232-072,q-tp20202-074]]`,
      fragmentos: [
        { id: "hid-conduta", titulo: "Diagnóstico, derivação e disfunção da válvula", conferir: true,
          questoes: ["q-unesp2021-019","q-unifesp2023-100","q-usprp2023-087","q-tp20232-072","q-tp20202-074","q-adap23-100","q-usp2024-010","q-simepm89-019"],
          prosa: `[[No lactente com fontanela aberta, o primeiro exame é a **ultrassonografia transfontanelar**; depois, tomografia ou ressonância. Tratamento definitivo: **derivação ventriculoperitoneal** (DVP), por exemplo na hidrocefalia da toxoplasmose congênita; na hidrocefalia aguda depois de meningite, com infecção ativa, **derivação ventricular externa** (temporária). Criança com cefaleia, vômitos e **diplopia** (VI nervo) e ventrículos grandes: **hidrocefalia obstrutiva**.|q-unesp2021-019,q-unifesp2023-100,q-usprp2023-087,q-tp20232-072,q-tp20202-074]] [[Criança com DVP que volta com **cefaleia, vômitos, sonolência, irritabilidade** ou olhar fixo: **mau funcionamento da derivação** até prova em contrário — **imagem urgente comparada com a anterior** e neurocirurgião. Drenagem excessiva no adulto (válvula de pressão baixa demais) colapsa o cérebro e rompe veias: **hematoma subdural**; trocar por válvula de **pressão mais alta** e drenar.|q-adap23-100,q-usp2024-010,q-simepm89-019]]`,
          texto: `- PC cruzando percentis, fontanela abaulada: **hidrocefalia** → **USG transfontanelar**. {q-unesp2021-019,q-unifesp2023-100}
- Toxoplasmose congênita com hidrocefalia: **DVP**; pós-meningite: **DVE**. {q-usprp2023-087,q-tp20202-074}
- Cefaleia, vômitos, diplopia: **hidrocefalia obstrutiva**. {q-tp20232-072}
- Portador de DVP com vômitos e sonolência: **disfunção da válvula** → imagem urgente. {q-adap23-100,q-usp2024-010}
- Subdural por hiperdrenagem: **válvula de pressão alta**. {q-simepm89-019}` },
        { id: "hid-pressao-normal", titulo: "Hidrocefalia de pressão normal", conferir: true,
          questoes: ["q-usp2022-008","q-tp20261-076"],
          prosa: `[[Idoso com a tríade **marcha** (apráxica, passos curtos, "pés colados ao chão") + **incontinência urinária** + **demência**, nessa ordem, e **ventrículos dilatados desproporcionais** à atrofia: **hidrocefalia de pressão normal** — uma das poucas demências tratáveis. A **punção lombar de alívio (tap test)** que melhora a marcha prevê boa resposta à **DVP**.|q-usp2022-008,q-tp20261-076]]`,
          texto: `- Marcha + incontinência + demência, ventrículos grandes: **hidrocefalia de pressão normal**. {q-usp2022-008,q-tp20261-076}` },
        { id: "hid-disrafismos", titulo: "Meningomielocele, Chiari e medula presa", conferir: true,
          questoes: ["q-unesp2024-020","q-unesp2023-017","q-unesp2022-020"],
          prosa: `[[A **meningomielocele** (falha no fechamento do tubo neural, prevenida com ácido fólico) vem quase sempre com **Chiari tipo II** (cerebelo e tronco descem pelo forame magno) e hidrocefalia: disfagia, estridor, fraqueza nos braços. Depois da correção, a criança que cresce e passa a ter **dor nas pernas, piora da marcha e escape urinário** tem **medula presa** (a medula, fixa pela cicatriz, é estirada). Na **cefalocele**, o prognóstico depende de **haver ou não malformação do encéfalo** associada e de quanto tecido cerebral está no saco.|q-unesp2024-020,q-unesp2023-017,q-unesp2022-020]]`,
          texto: `- Meningomielocele + disfagia e fraqueza: **Chiari II**. {q-unesp2024-020}
- Operada, piora da marcha e escape urinário: **medula presa**. {q-unesp2023-017}
- Cefalocele: prognóstico pelas **outras malformações** encefálicas. {q-unesp2022-020}` },
      ],
    },
    {
      id: "nervos", titulo: "Plexo braquial e nervos periféricos",
      introducao: `[[Cada raiz tem seu território. **C5–C6** (tronco superior): ombro e flexão do cotovelo, sensibilidade da **face lateral** do braço e antebraço e do polegar, **extensores do punho** (C6). **C8–T1** (tronco inferior): **flexores do punho e dedos, músculos intrínsecos da mão**, sensibilidade da **face medial** do antebraço. Tração com o braço em **hiperabdução** arranca as raízes de baixo; queda com o ombro empurrado para baixo, as de cima.|q-adap24-012,q-unifesp2024-018]]`,
      fragmentos: [
        { id: "ner-lesoes", titulo: "Raízes, plexo e nervo ulnar", conferir: true,
          questoes: ["q-adap24-012","q-unifesp2024-018","q-tp20241-012","q-unicampdis2025-018"],
          prosa: `[[Posição **prona prolongada** na UTI com o braço em hiperextensão e abdução estira o **plexo braquial**: fraqueza para abduzir o ombro e fletir o cotovelo, choques no braço. Ferimento no **cotovelo** com perda de sensibilidade na **metade medial da mão** (5º dedo e metade do 4º) e fraqueza dos intrínsecos: **nervo ulnar**, que passa atrás do epicôndilo medial.|q-tp20241-012,q-unicampdis2025-018]]`,
          texto: `- C8–T1: **face medial do antebraço e flexores do punho**. {q-adap24-012}
- C6: **face lateral do antebraço e extensores do punho**. {q-unifesp2024-018}
- Prona prolongada: **plexo braquial por hiperextensão**. {q-tp20241-012}
- Corte no cotovelo, metade medial da mão: **ulnar**. {q-unicampdis2025-018}` },
      ],
    },
  ],
});
