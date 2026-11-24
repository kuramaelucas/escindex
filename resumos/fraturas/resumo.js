/* resumos/fraturas/resumo.js — resumo adaptativo de fraturas e luxações (ass-orto-fraturas):
   consolidação e calo, estabilidade absoluta × relativa, controle de danos no politraumatizado e
   embolia gordurosa, fratura exposta (Gustilo, antibiótico, desbridamento, cobertura), síndrome
   compartimental e gesso apertado, lesão vascular e nervosa, quadril (colo no jovem e no idoso,
   transtrocantérica), Colles, supracondiliana na criança e fratura-luxação do tornozelo;
   armadilhas e tabela das fraturas do quadril.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- fraturas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "fraturas",
  titulo: "Fraturas e luxações",
  assunto: "ass-orto-fraturas",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "aaos-quadril", texto: "AAOS — Management of Hip Fractures in Older Adults (2021)", lidoEm: null },
    { id: "atls", texto: "ATLS, 10ª e 11ª edições — trauma musculoesquelético", lidoEm: null },
    { id: "bapras-exposta", texto: "BOA/BAPRAS — Standards for the management of open fractures (2020)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição.", questoes: ["q-fmabc2025-022"] },
  ],
  doencas: [
    {
      id: "principios", titulo: "Consolidação e princípios",
      introducao: `[[O osso fraturado se repara formando um **calo**: hematoma, depois cartilagem e osso imaturo, e por fim osso lamelar remodelado. Quanto o foco se move decide o tipo de consolidação: com **estabilidade absoluta** (compressão, sem movimento) o osso consolida direto, sem calo; com **estabilidade relativa** (haste, fixador, gesso), forma calo.|q-simepm89-018,q-scmsp2023-024]]

Veja também: **ATLS**, **Trauma abdominal**, **Isquemia arterial** e **Doença venosa** (profilaxia de trombose).`,
      fragmentos: [
        { id: "pri-consolidacao", titulo: "Calo e estabilidade", conferir: true,
          questoes: ["q-simepm89-018","q-scmsp2023-024"],
          prosa: `[[O calo jovem é cheio de células que fazem osso e cartilagem, com mitoses: na biópsia pode ser confundido com **osteossarcoma**.|q-simepm89-018]] [[No **antebraço** do adulto, o rádio e a ulna funcionam como uma articulação (pronação e supinação): exigem **redução anatômica** e **estabilidade absoluta** com compressão interfragmentária (placa), como uma fratura articular.|q-scmsp2023-024]]`,
          texto: `- Calo jovem pode imitar **osteossarcoma**. {q-simepm89-018}
- Antebraço do adulto: **redução anatômica, estabilidade absoluta**. {q-scmsp2023-024}` },
        { id: "pri-politrauma", titulo: "Politraumatizado: controle de danos e embolia gordurosa", conferir: true, diretrizes: ["atls"],
          questoes: ["q-unifesp2026-019","q-scmsp2021-032"],
          prosa: `[[No politraumatizado grave (TCE, tórax), a cirurgia longa de fixação definitiva soma um segundo trauma. Faz-se **controle de danos**: **fixadores externos** estabilizam as fraturas rápido, e a fixação definitiva vem depois, com o paciente estável.|q-unifesp2026-019]] [[Um a três dias depois de fratura de **ossos longos** (fêmur, tíbia), **hipoxemia, confusão e petéquias** (tórax, axilas, conjuntiva) formam a **síndrome da embolia gordurosa**: gordura da medula chega ao pulmão e ao cérebro. Fixar cedo as fraturas reduz o risco.|q-scmsp2021-032]]`,
          texto: `- Politrauma grave: **fixador externo** (controle de danos). {q-unifesp2026-019}
- Ossos longos + hipoxemia + confusão + petéquias: **embolia gordurosa**. {q-scmsp2021-032}` },
      ],
    },
    {
      id: "exposta", titulo: "Fratura exposta",
      introducao: `[[Fratura exposta é fratura contaminada: a pele rompida põe o foco em contato com o ambiente, e o que decide o desfecho é evitar **infecção** do osso. O risco cresce com a energia do trauma e o dano às partes moles, que a classificação de Gustilo mede.|q-fmabc2025-028,q-usp2024-033,q-adap26-019]]`,
      fragmentos: [
        { id: "exp-conduta", titulo: "Gustilo e conduta", conferir: true, diretrizes: ["bapras-exposta","atls"],
          casos: ["q-usp2024-033"],
          questoes: ["q-fmabc2025-028","q-usp2024-033","q-adap26-019","q-tp20231-063"],
          prosa: `[[**Gustilo**: tipo I, ferida < 1 cm e limpa; tipo II, 1 a 10 cm sem dano extenso; tipo **III**, dano extenso de partes moles ou alta energia: **IIIA** tem **cobertura óssea adequada**, IIIB precisa de retalho (osso exposto sem cobertura), IIIC tem **lesão vascular** que exige reparo.|q-fmabc2025-028,q-usp2024-033]] [[A conduta: **antibiótico venoso imediato**, **profilaxia do tétano**, foto e curativo estéril, alinhamento e imobilização, e **desbridamento cirúrgico precoce** com estabilização (fixador externo ou haste). Não se fecha a ferida no pronto-socorro nem se lava na sala de trauma.|q-adap26-019,q-usp2024-033]] [[Na unidade básica: analgesia, **limpeza com soro**, curativo estéril, tala, tétano e antibiótico, e transferência.|q-tp20231-063]]`,
          texto: `- IIIA: dano extenso **com cobertura óssea**; IIIC: lesão vascular. {q-fmabc2025-028,q-usp2024-033}
- **Antibiótico IV + tétano + desbridamento precoce + estabilização**. {q-adap26-019,q-usp2024-033}
- UBS: limpar, curativo estéril, tala, transferir. {q-tp20231-063}` },
        { id: "exp-cobertura", titulo: "Cobertura de partes moles", conferir: true, diretrizes: ["bapras-exposta"],
          questoes: ["q-usprp2027-065"],
          prosa: `[[Tíbia exposta sem partes moles por cima (IIIB) não aceita enxerto de pele, que precisa de leito vascularizado: o osso é coberto por **retalho muscular**, e o enxerto de pele vai sobre o músculo.|q-usprp2027-065]]`,
          texto: `- Tíbia exposta sem cobertura: **retalho muscular + enxerto de pele**. {q-usprp2027-065}` },
      ],
    },
    {
      id: "compartimento", titulo: "Síndrome compartimental e lesões associadas",
      introducao: `[[Os músculos da perna e do antebraço ficam em compartimentos de fáscia que não se distendem. Edema ou sangramento dentro deles sobe a pressão até **acima da pressão de perfusão capilar**: o sangue para de passar pela microcirculação, o músculo e o nervo isquemiam, **mesmo com pulso distal presente**.|q-einstein2027-026,q-scmsp2022-020]]`,
      fragmentos: [
        { id: "com-sindrome", titulo: "Síndrome compartimental", conferir: true, diretrizes: ["atls"],
          casos: ["q-einstein2027-026"],
          questoes: ["q-adap23-079","q-scmsp2022-020","q-usprp2022-029","q-einstein2027-026"],
          prosa: `[[O primeiro sinal é **dor desproporcional**, que **não cede com opioide** e **piora com o estiramento passivo** dos dedos; depois vêm parestesia e edema tenso. O pulso costuma estar presente.|q-adap23-079,q-scmsp2022-020]] [[Com gesso ou tala, o primeiro passo é **retirar toda a imobilização** até a pele e deixar o membro **na altura do coração** (elevar mais reduz a perfusão); se a dor persiste, mede-se a pressão ou opera-se.|q-adap23-079,q-usprp2022-029]] [[Síndrome instalada é **fasciotomia** de todos os compartimentos (dermatofasciotomia), estabilizando a fratura, em geral com **fixador externo**.|q-scmsp2022-020,q-einstein2027-026]]`,
          texto: `- Dor desproporcional, pior ao estiramento passivo, com pulso: **compartimental**. {q-adap23-079,q-scmsp2022-020}
- Gesso: **retirar tudo**, membro à altura do coração. {q-adap23-079,q-usprp2022-029}
- Instalada: **fasciotomia + fixador externo**. {q-scmsp2022-020,q-einstein2027-026}` },
        { id: "com-vasculonervosa", titulo: "Lesão vascular e nervosa", conferir: true, diretrizes: ["atls"],
          questoes: ["q-usp2026-048","q-unicampdis2024-077","q-scmsp2022-019"],
          prosa: `[[Fratura com **membro frio, pálido e sem pulso** é lesão arterial: tempo de isquemia conta. Na fratura de fêmur ou do joelho, a artéria em risco é a **poplítea**.|q-usp2026-048,q-unicampdis2024-077]] [[A fratura da **diáfise do úmero** pode lesar o **nervo radial**, que contorna o osso no sulco espiral: **mão caída** (sem extensão do punho e dos dedos).|q-scmsp2022-019]]`,
          texto: `- Membro frio sem pulso: lesão arterial (**poplítea** no joelho/fêmur). {q-usp2026-048,q-unicampdis2024-077}
- Diáfise do úmero: **nervo radial**, mão caída. {q-scmsp2022-019}` },
      ],
    },
    {
      id: "quadril", titulo: "Fratura do quadril",
      introducao: `[[A fratura do quadril do idoso vem de queda da própria altura sobre osso osteoporótico. O membro fica **encurtado e em rotação externa**: o **iliopsoas** puxa o fêmur para cima e para fora, e o **glúteo médio** encurta. Operar em **até 48 horas** reduz a mortalidade, porque deixa o idoso sentar e andar logo.|q-usp2023-019,q-unifesp2023-079,q-uspsp3-113]]`,
      fragmentos: [
        { id: "qua-clinica", titulo: "Como o membro fica", conferir: true,
          casos: ["q-usp2023-019"],
          questoes: ["q-usp2023-019","q-unifesp2023-079"],
          prosa: `[[Idoso que caiu sobre o quadril e não anda: **membro inferior encurtado e em rotação externa**, pela tração do **iliopsoas** e do **glúteo médio** sobre o fragmento distal.|q-usp2023-019,q-unifesp2023-079]]`,
          texto: `- **Encurtamento + rotação externa** (iliopsoas, glúteo médio). {q-usp2023-019,q-unifesp2023-079}` },
        { id: "qua-colo-idoso", titulo: "Colo do fêmur no idoso: artroplastia", conferir: true, diretrizes: ["aaos-quadril"],
          figuras: [{ arquivo: "figuras/fratura-quadril.svg", legenda: "Esquema autoral: conduta na fratura do quadril pela localização e pelo paciente." }],
          casos: ["q-tp20232-071"],
          questoes: ["q-unifesp2025-059","q-unifesp2026-020","q-scmsp2021-031","q-tp20232-071","q-tp20261-036"],
          prosa: `[[O colo do fêmur é **intracapsular**: a fratura desviada rompe os vasos que nutrem a cabeça, que tende a necrosar e não consolidar. No idoso com fratura **desviada**, por isso, **troca-se a cabeça**: **artroplastia**. Tratamento conservador condena ao leito e não é opção.|q-scmsp2021-031,q-tp20232-071,q-tp20261-036]] [[Paciente **ativo e independente**: **artroplastia total**; **dependente, com demência**, pouca expectativa de marcha: **artroplastia parcial** (só a cabeça), mais curta.|q-unifesp2025-059,q-unifesp2026-020]]`,
          texto: `- Idoso, colo desviado: **artroplastia**, não fixação nem conservador. {q-scmsp2021-031,q-tp20232-071,q-tp20261-036}
- Ativo: **total**; dependente/demência: **parcial**. {q-unifesp2025-059,q-unifesp2026-020}` },
        { id: "qua-colo-jovem", titulo: "Colo do fêmur no jovem: salvar a cabeça", conferir: true, diretrizes: ["aaos-quadril"],
          questoes: ["q-adap25-059"],
          prosa: `[[No **jovem** (trauma de alta energia), a cabeça vale ser preservada: **redução anatômica e fixação com parafusos canulados em urgência**, para restaurar logo o fluxo e diminuir a necrose.|q-adap25-059]]`,
          texto: `- Jovem: **redução anatômica + parafusos canulados, urgente**. {q-adap25-059}` },
        { id: "qua-transtrocanterica", titulo: "Transtrocantérica: fixar", conferir: true, diretrizes: ["aaos-quadril"],
          casos: ["q-uspsp3-113"],
          questoes: ["q-uspsp3-113"],
          prosa: `[[A fratura **transtrocantérica** é **extracapsular**, em osso esponjoso bem irrigado, que consolida: **fixação interna** (haste cefalomedular ou placa), de preferência **nas primeiras 48 horas**, mesmo na idosa de 84 anos apta para cirurgia.|q-uspsp3-113]]`,
          texto: `- Transtrocantérica: **fixação interna em até 48 h**. {q-uspsp3-113}` },
      ],
    },
    {
      id: "outras", titulo: "Punho, cotovelo e tornozelo",
      introducao: `[[A queda com a mão espalmada transmite a força pelo punho e pelo cotovelo: no idoso quebra o rádio distal, na criança o úmero acima do cotovelo. No tornozelo, a torção que luxa a articulação estira a pele e os vasos, e o edema decide quando operar.|q-tp20252-006,q-adap26-020,q-usp2025-040]]`,
      fragmentos: [
        { id: "out-colles", titulo: "Fratura de Colles", conferir: true,
          questoes: ["q-tp20252-006"],
          prosa: `[[Queda com a mão espalmada em idosa osteoporótica quebra o **rádio distal** com o fragmento **desviado para trás**: deformidade em **dorso de garfo**, é a **fratura de Colles**. Smith é o desvio para a frente; Barton, a fratura que entra na articulação.|q-tp20252-006]]`,
          texto: `- Dorso de garfo: **Colles** (desvio dorsal). {q-tp20252-006}` },
        { id: "out-supracondiliana", titulo: "Supracondiliana do úmero na criança", conferir: true,
          casos: ["q-usp2022-079"],
          questoes: ["q-adap26-020","q-usp2022-079"],
          prosa: `[[A criança que cai com o braço estendido quebra o úmero logo acima do cotovelo. O fragmento proximal pode ferir o **nervo interósseo anterior** (ramo do mediano), o mais lesado: não consegue fazer o "OK" com polegar e indicador.|q-usp2022-079]] [[A fratura **desviada** se trata com **redução fechada sob anestesia e fios de Kirschner percutâneos**, com urgência, pelo risco de lesão da artéria braquial e de síndrome compartimental.|q-adap26-020]]`,
          texto: `- Nervo mais lesado: **interósseo anterior**. {q-usp2022-079}
- Desviada: **redução fechada + fios de Kirschner**, urgente. {q-adap26-020}` },
        { id: "out-tornozelo", titulo: "Fratura-luxação do tornozelo com edema", conferir: true,
          casos: ["q-usp2025-040"],
          questoes: ["q-usp2025-040"],
          prosa: `[[Fratura-luxação do tornozelo com **edema importante e flictenas** não aceita placa logo: a pele necrosaria. Faz-se **redução e fixador externo**, e a osteossíntese definitiva quando o edema baixa.|q-usp2025-040]]`,
          texto: `- Tornozelo luxado com edema/flictenas: **redução + fixador externo**. {q-usp2025-040}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["atls"],
          questoes: ["q-usp2026-048","q-usp2024-033","q-adap23-079","q-scmsp2022-020"],
          prosa: `[[**Fixar ou revascularizar primeiro?** Com isquemia longa, muitos fazem antes um **shunt** arterial temporário; a usp2026-048 cobrou **fixar a fratura e depois revascularizar**, para não romper a sutura arterial ao manipular o osso.|q-usp2026-048]] [[**Lavar a ferida na sala de trauma**: a limpeza real é o desbridamento no centro cirúrgico; a usp2024-033 marcou só **alinhamento e imobilização** na sala de trauma.|q-usp2024-033]] [[**Elevar o membro**: no edema comum, eleva-se; na suspeita de síndrome compartimental, o membro fica **na altura do coração**.|q-adap23-079,q-scmsp2022-020]]`,
          texto: `- A prova cobrou **fixar antes de revascularizar**. {q-usp2026-048}
- Sala de trauma: **alinhar e imobilizar**, sem lavar. {q-usp2024-033}
- Compartimental: membro **na altura do coração**. {q-adap23-079,q-scmsp2022-020}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: fraturas do quadril",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-quadril", titulo: "Local, irrigação e conduta", conferir: true,
          questoes: ["q-adap25-059","q-unifesp2025-059","q-unifesp2026-020","q-uspsp3-113"],
          prosa: `[[A irrigação da cabeça decide entre fixar e trocar.|q-adap25-059,q-unifesp2025-059,q-unifesp2026-020,q-uspsp3-113]]

| Fratura | Irrigação da cabeça | Paciente | Conduta |
|---|---|---|---|
| Colo desviado | comprometida | jovem | redução anatômica + parafusos, urgente |
| Colo desviado | comprometida | idoso ativo | artroplastia total |
| Colo desviado | comprometida | idoso dependente | artroplastia parcial |
| Transtrocantérica | preservada | qualquer | fixação interna (haste) em até 48 h |`,
          texto: `- Jovem: **parafusos**. {q-adap25-059}
- Idoso ativo: **total**; dependente: **parcial**. {q-unifesp2025-059,q-unifesp2026-020}
- Transtrocantérica: **haste**. {q-uspsp3-113}` },
      ],
    },
  ],
});
