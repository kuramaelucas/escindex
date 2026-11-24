/* resumos/complicacoes-cirurgicas/resumo.js — resumo adaptativo de complicações cirúrgicas: infecção de sítio cirúrgico,
   deiscência e evisceração, febre e problemas do pós-operatório, íleo, hemorragia, dumping e estomas, deiscência de
   anastomose e abscesso, fístulas, síndrome compartimental, lesões iatrogênicas, corpo estranho e Clavien-Dindo.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- complicacoes-cirurgicas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "complicacoes-cirurgicas",
  titulo: "Complicações cirúrgicas",
  assunto: "ass-complicacoescir",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "cdc-nhsn", texto: "CDC/NHSN — definição e classificação da infecção de sítio cirúrgico (superficial, profunda e de órgão/espaço)", lidoEm: null },
    { id: "clavien-dindo", texto: "Clavien-Dindo — classificação das complicações cirúrgicas (2004, revisada em 2009)", lidoEm: null },
    { id: "wses-iai", texto: "WSES / SIS — infecção intra-abdominal (antibiótico e controle do foco; estudo STOP-IT)", lidoEm: null },
    { id: "wsacs", texto: "WSACS — hipertensão intra-abdominal e síndrome compartimental abdominal (2013)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anulada pela banca", questoes: ["q-amrigs2025-039"] },
  ],
  doencas: [
    {
      id: "ferida", titulo: "Ferida operatória: infecção, deiscência e evisceração",
      introducao: `[[A ferida operatória conta a história do pós-operatório: o **dia** em que o problema aparece e o **aspecto** da secreção indicam a causa. A secreção **purulenta** entre o 5º e o 7º dia é infecção da incisão; o líquido **serossanguinolento em grande volume** ("água de carne") entre o 6º e o 8º dia é deiscência da aponeurose.|q-adap21-084,q-uspsp1-031,q-usprp2021-084,q-uspsp4-068]] O tratamento do primeiro é **abrir e drenar**; o do segundo é **reoperar a parede**.

Veja também: **Hérnias da parede abdominal** (hérnia incisional e tela), **Obstrução intestinal** (íleo e bridas), **Trauma abdominal** (controle de danos e hipertensão abdominal), **Atendimento inicial ao politraumatizado (ATLS)** e, quando escritos, **Cuidados perioperatórios** e **Apendicite**.`,
      fragmentos: [
        { id: "isc-classificacao", titulo: "Classificação da cirurgia e agentes da infecção de sítio cirúrgico", conferir: true, diretrizes: ["cdc-nhsn"],
          questoes: ["q-iamspe2023-021","q-iamspe2021-030","q-tp20232-080","q-tp20241-080"],
          prosa: `[[A cirurgia é **limpa** quando não penetra os tratos respiratório, digestivo, genital ou urinário e é feita em tecido sem inflamação: a **herniorrafia inguinal** é o exemplo; gastrectomia, RTU de próstata, traqueoplastia e cistectomia são limpo-contaminadas.|q-iamspe2023-021]] A infecção de sítio cirúrgico é **superficial, profunda ou de órgão/espaço**, e a fonte das bactérias é a flora do próprio paciente, na maior parte, e não a contaminação exógena. [[O seroma é coleção de soro, linfa e gordura liquefeita sob a incisão e **não se trata com antibiótico**; o hematoma se relaciona ao uso de ticlopidina e varfarina; e os fatores de risco da deiscência são **idade avançada, operação de emergência, desnutrição e erro técnico no fechamento da fáscia**.|q-iamspe2021-030]]

O agente depende do campo. [[Na infecção da incisão de uma prótese (artroplastia do joelho), o agente mais comum é ***Staphylococcus aureus***; na ferida com tela de polipropileno, a prova cobrou o ***Staphylococcus epidermidis***, o estafilococo coagulase-negativo que forma biofilme na prótese.|q-tp20232-080,q-tp20241-080]]`,
          texto: `- **Herniorrafia inguinal** é cirurgia **limpa**; gastrectomia, RTU e cistectomia são limpo-contaminadas. {q-iamspe2023-021}
- **Seroma** não se trata com antibiótico; infecção pode ser superficial, profunda ou de órgão/espaço. {q-iamspe2021-030}
- Fatores de risco da **deiscência**: idade avançada, emergência, desnutrição e erro técnico no fechamento da fáscia. {q-iamspe2021-030}
- Infecção da incisão de artroplastia de joelho: ***Staphylococcus aureus***. {q-tp20232-080}
- Infecção de ferida com tela de marlex em obesa diabética: ***Staphylococcus epidermidis***. {q-tp20241-080}` },
        { id: "isc-conduta", titulo: "Infecção da incisão: abrir, drenar e quando usar antibiótico", conferir: true, diretrizes: ["cdc-nhsn"],
          casos: ["q-usp2023-006"],
          figuras: [{ arquivo: "figuras/pos-operatorio-por-dia.svg", legenda: "Esquema autoral: o que pensar em cada fase do pós-operatório, pelo dia e pelo aspecto do paciente." }],
          questoes: ["q-adap21-084","q-usp2023-006","q-uspsp1-031","q-usprp2025-082","q-tp20222-080","q-uspsp2-077","q-einstein2026-022"],
          prosa: `A coleção purulenta sob a pele não drena sozinha e o antibiótico não alcança o pus: o **tratamento é a drenagem**. [[No paciente **estável, afebril ou com febre baixa e sem celulite extensa**, a conduta é **retirar os pontos, desbridar e fazer curativo diário**; o antibiótico fica para a celulite extensa ou os sinais sistêmicos; não se tomografa, não se leva à lavagem em centro cirúrgico e não se ampliam antibióticos.|q-adap21-084,q-usp2023-006,q-uspsp1-031,q-usprp2025-082]] Isso vale mesmo com tela: na infecção superficial da incisão de hérnia incisional com tela onlay, **mantém-se a tela** e abre-se a incisão.

[[Quando há **hiperemia além das bordas, febre** e secreção (gastroplastia em Y de Roux no 6º dia), explora-se a ferida, lava-se abundantemente, coleta-se a secreção para cultura e inicia-se antibiótico venoso.|q-tp20222-080]] [[O diabético tabagista com febre persistente de 38,5 a 39 °C, flutuação e **piora sistêmica após a abertura parcial** precisa de **desbridamento cirúrgico amplo** e antibiótico venoso, e a diabética descompensada, em corticoide, com necrose superficial e deiscência parcial, também: o tratamento é desbridamento e antibiótico venoso, sem aumentar o corticoide.|q-uspsp2-077,q-einstein2026-022]]`,
          texto: `- 6º dia de hernioplastia incisional, abscesso de parede, estável: **abrir, drenar e curativo diário**, sem retirar a tela. {q-adap21-084}
- Tela onlay com secreção purulenta, afebril: **retirada de pontos, desbridamento e curativo diário**. {q-usp2023-006}
- 7º dia de apendicectomia aberta com secreção purulenta, estável: **abertura de pontos**. {q-uspsp1-031}
- 6º dia de apendicectomia, febre baixa e abaulamento hiperemiado: **retirada de pontos**, sem ampliar antibiótico. {q-usprp2025-082}
- Hiperemia além das bordas e secreção purulenta com febre: **exploração, lavagem, cultura e antibiótico venoso**. {q-tp20222-080}
- Piora sistêmica após abertura parcial: **desbridamento amplo e antibiótico venoso**. {q-uspsp2-077}
- Diabética descompensada com corticoide, necrose superficial: **desbridamento e antibiótico venoso**. {q-einstein2026-022}` },
        { id: "deiscencia", titulo: "Deiscência da aponeurose, evisceração e prevenção", conferir: true, diretrizes: ["cdc-nhsn"],
          casos: ["q-sirio2022-031"],
          questoes: ["q-usp2022-066","q-usprp2021-084","q-uspsp4-068","q-sirio2022-031","q-einstein2022-021","q-famema2021-011","q-iamspe2025-038","q-einstein2021-014"],
          prosa: `A aponeurose cicatriza devagar e depende da sutura nos primeiros dias; tosse, esforço e distensão sobem a pressão abdominal e a rompem. [[O sinal de alerta é a **saída súbita de grande volume de líquido serossanguinolento (água de carne)** pela incisão, entre o 6º e o 8º dia, geralmente após esforço; o diagnóstico é de **deiscência da aponeurose**, e a conduta é **palpar e explorar a ferida e ressuturar a parede abdominal em centro cirúrgico**.|q-usprp2021-084,q-uspsp4-068]] [[Os fatores de risco são **cirurgia de urgência, doença neoplásica e tabagismo**, além de desnutrição e diabetes.|q-usp2022-066]] [[Na **evisceração** parcial (omento pela deiscência de 2 cm na incisão mediana, após tosse), o paciente estável é reoperado e a parede é refeita; as vísceras expostas se cobrem com compressa úmida até a reabordagem.|q-sirio2022-031,q-iamspe2025-038]]

Prevenir é questão de técnica. [[O fechamento com pontos **curtos** (*small bites*, 5 a 8 mm da borda e entre si) tem menos hérnia incisional que o de pontos longos (*large bites*, 10 mm), e o comprimento do fio deve ser de **quatro vezes** o da incisão; a **tela profilática** é a melhor prevenção no paciente de risco; a cinta abdominal dá conforto, mas **não reduz** deiscência nem hérnia.|q-famema2021-011,q-einstein2022-021,q-iamspe2025-038]] [[Em reoperação com tela de polipropileno e dreno, o débito que cai e se torna seroso é o esperado, e o dreno sai com **menos de 50 mL por dia**.|q-einstein2021-014]]`,
          texto: `- Líquido em **água de carne** no 7º dia, após levantar: **deiscência**; **exploração digital e ressutura**. {q-usprp2021-084}
- Idoso desnutrido operado de urgência por neoplasia, água de carne no 8º dia: **reabordagem da parede abdominal**. {q-uspsp4-068}
- Fatores de risco: **cirurgia de urgência, neoplasia e tabagismo**. {q-usp2022-066}
- Evisceração parcial de omento no 10º dia: **laparotomia e fechamento da parede**; a prova cobrou **tela onlay** (ver Armadilhas). {q-sirio2022-031}
- Cinta abdominal não reduz eventração nem evisceração; vísceras expostas se cobrem com compressa úmida. {q-iamspe2025-038}
- Melhor prevenção da deiscência no paciente de risco: **tela profilática**. {q-einstein2022-021}
- **Small bites** têm menos hérnia incisional que large bites; tração excessiva não previne. {q-famema2021-011}
- Dreno sobre a tela com débito caindo e seroso: **esperado**; retirar com menos de **50 mL/dia**. {q-einstein2021-014}` },
      ],
    },
    {
      id: "posoperatorio", titulo: "Pós-operatório: febre, pulmão, íleo, hemorragia, dumping e estomas",
      introducao: `Metade das perguntas é reconhecer o que **não** é complicação. [[A **febre** nas primeiras 24 a 48 horas é, na maioria, resposta inflamatória ao trauma cirúrgico, e a conduta é **sintomático**, sem exames nem antibiótico.|q-usprp2025-081,q-sirio2022-038,q-usprp2024-032]] A outra metade é reconhecer o que **alarma**: o choque nas primeiras 24 horas é hemorragia, e o paciente com sepse e íleo persistente tem deiscência até prova em contrário.`,
      fragmentos: [
        { id: "pos-febre", titulo: "Febre precoce do pós-operatório", conferir: true,
          questoes: ["q-usprp2024-032","q-usprp2025-081","q-sirio2022-038"],
          prosa: `A cirurgia libera citocinas, e a febre baixa nos primeiros dois dias reflete essa resposta. [[No 2º dia de colecistectomia eletiva, com até 37,8 °C, sem taquicardia, ferida normal e abdome sem irritação, a conduta é **antipirético e analgésico**; no 1º dia de Hartmann, com 37,8 °C, pulso de 90 e ferida limpa, a causa mais provável é a **inflamação pós-operatória**.|q-usprp2025-081,q-sirio2022-038]] [[Febre de 38,2 °C em 24 horas após herniorrafia limpa, sem sinais locais, ainda **não permite descartar totalmente uma causa infecciosa**; não é atelectasia nem se explica por falta de antibiótico profilático.|q-usprp2024-032]]`,
          texto: `- 2º dia de colecistectomia eletiva, até 37,8 °C, sem sinais de complicação: **sintomáticos**. {q-usprp2025-081}
- 1º dia de Hartmann, 37,8 °C em um pico: **inflamação pós-operatória**. {q-sirio2022-038}
- Febre de 38,2 °C em 24 horas de cirurgia limpa: **não se descarta causa infecciosa**. {q-usprp2024-032}` },
        { id: "pos-pulmao-volume", titulo: "Atelectasia e desidratação no pós-operatório", conferir: true,
          questoes: ["q-scmsp2022-014","q-tp20222-061","q-tp20212-064","q-tp20231-066","q-tp20232-058","q-tp20241-058"],
          prosa: `[[A complicação pulmonar mais comum depois de cirurgia abdominal é a **atelectasia**: dispneia nos primeiros dias, radiografia com **opacidade e perda de volume com desvio do mediastino para o mesmo lado**, seios livres; o tratamento é **analgesia, fisioterapia respiratória** e, se preciso, pressão positiva não invasiva, e não antibiótico nem angiotomografia.|q-scmsp2022-014,q-tp20222-061]]

Depois, a **desidratação**: [[a criança no 1º dia de apendicectomia por apendicite perfurada, em jejum, com vômitos biliosos volumosos, oligúria, urina escura e turgor pastoso, sem peritonite, tem desidratação, não abdome obstrutivo nem choque séptico; e o idoso a partir do 13º ou 15º dia de pós-operatório de fratura de colo de fêmur, com prostração, urina escura, mucosas secas, taquicardia ou hipotensão, e em uso de diurético e bloqueador de angiotensina, também.|q-tp20212-064,q-tp20231-066,q-tp20232-058,q-tp20241-058]]`,
          texto: `- 2º dia de gastrectomia, dispneia, hemitórax opaco com desvio ipsilateral: **atelectasia**. {q-scmsp2022-014}
- 1º dia de hemicolectomia, febre baixa, SaO2 93 % e perda de volume do lobo inferior: **analgesia, fisioterapia e pressão positiva**. {q-tp20222-061}
- 1º dia de apendicectomia perfurada, vômitos biliosos e oligúria: **desidratação aguda**. {q-tp20212-064,q-tp20231-066}
- Idosa no 13º dia de fratura de fêmur, urina escura e confusão: **desidratação**. {q-tp20232-058}
- Idoso de 78 anos com losartana, furosemida e metformina, hipotenso no 15º dia: **desidratação**. {q-tp20241-058}` },
        { id: "pos-ileo", titulo: "Íleo adinâmico pós-operatório", conferir: true,
          questoes: ["q-usp2025-030","q-sirio2021-023","q-sirio2022-029"],
          prosa: `[[O **íleo paralítico** é a paralisia temporária do intestino após a cirurgia: distensão, náuseas, ruídos diminuídos, sem peritonite, afebril, com sinais vitais normais; a radiografia mostra distensão de alças, mais acentuada nos cólons, e no 2º dia isso é **evolução esperada**.|q-sirio2022-029,q-usp2025-030]] [[O tratamento é **jejum, hidratação, procinéticos (metoclopramida), simeticona, deambulação** e, se o débito gástrico for grande (acima de 1.000 mL por dia), **sonda nasogástrica**, e não tomografia, opioides ou dieta laxativa.|q-sirio2021-023,q-usp2025-030]]`,
          texto: `- 2º dia de gastrectomia com distensão, FC 90, 37,5 °C e leucócitos normais: **evolução esperada** (íleo fisiológico). {q-sirio2022-029}
- Reconstrução do trânsito com 6 horas de cirurgia, sonda com mais de 1.000 mL no 6º dia, sinais vitais normais: **íleo paralítico**. {q-usp2025-030}
- 5º dia de sutura de úlcera, distensão, sem peritonite, dreno seroso: **jejum, metoclopramida, simeticona, deambulação**. {q-sirio2021-023}` },
        { id: "pos-hemorragia", titulo: "Hemorragia, hematoma cervical e transfusão maciça", conferir: true,
          casos: ["q-usp2022-071"],
          questoes: ["q-sirio2025-026","q-fmabc2024-025","q-usp2022-071","q-sirio2024-036","q-usp2026-029"],
          prosa: `[[A causa mais comum de **choque nas primeiras 24 horas** depois de cirurgia abdominal é a **hemorragia** (falha de hemostasia, ligadura que escapa, sangramento da anastomose): dor intensa, pré-síncope, abdome tenso, hipotensão, taquicardia e tempo de enchimento capilar prolongado, sem febre, no 2º dia de gastrectomia.|q-fmabc2024-025,q-sirio2025-026]]

[[Após tireoidectomia, a dispneia progressiva, a agitação e o abaulamento cervical crescente em horas são **hematoma cervical** comprimindo a via aérea, e a conduta é **abrir imediatamente a sutura de pele e fáscio-muscular no leito**, antes da traqueostomia ou da punção cricotireóidea.|q-usp2022-071]] [[Depois de **dez concentrados de hemácias** e plasma, o citrato quela o cálcio e o armazenamento libera potássio: monitorizam-se o **cálcio e o potássio**.|q-sirio2024-036]] [[Em lactente 24 horas após esofagocoloplastia, o choque com débito vinhoso e fétido pela gastrostomia é **necrose do enxerto de cólon**, por isquemia do pedículo.|q-usp2026-029]]`,
          texto: `- 2º dia de gastrectomia subtotal com abdome tenso, PA 90 x 50 e FC 120: **hemorragia intra-abdominal**. {q-sirio2025-026}
- Causa mais comum de choque nas primeiras 24 horas: **hemorragia (hemoperitônio)**. {q-fmabc2024-025}
- Tireoidectomia há 6 horas com dispneia e abaulamento cervical: **abrir a sutura no leito**. {q-usp2022-071}
- Após 10 concentrados de hemácias e plasma: monitorizar **cálcio e potássio**. {q-sirio2024-036}
- 24 horas após esofagocoloplastia, choque e débito vinhoso fétido: **necrose do cólon**. {q-usp2026-029}` },
        { id: "pos-dumping-estomas", titulo: "Dumping e complicações dos estomas", conferir: true,
          questoes: ["q-famema2025-027","q-fmabc2023-029","q-unesp2026-077","q-fmabc2026-025"],
          prosa: `A gastrectomia remove o piloro e o reservatório, e o alimento hiperosmolar passa rápido ao jejuno, puxa líquido para a luz e dilata a alça. [[A **síndrome de dumping precoce**, minutos após a refeição, com cólicas, taquicardia, sudorese, rubor e diarreia explosiva, é mais frequente depois de **gastrectomia parcial com Billroth II**, e o manejo inicial é **dietético: refeições fracionadas, pequenas e pobres em carboidratos simples**.|q-famema2025-027,q-fmabc2023-029]]

[[A **ileostomia em alça** é um estoma **derivativo** (temporário), e a dor e a queimação com hiperemia da pele ao redor, que dificultam acoplar a bolsa, são **dermatite periostomal**; o abscesso periestomal precoce vem da colonização pré-operatória da pele e da semeadura no sítio.|q-unesp2026-077,q-fmabc2026-025]]`,
          texto: `- Dor em cólica, tontura, sudorese e taquicardia após refeições em Billroth II: **dumping**, **refeições fracionadas pobres em carboidratos simples**. {q-famema2025-027}
- Sintomas minutos após a refeição, úlcera operada: **Billroth II**. {q-fmabc2023-029}
- Ileostomia em alça com pele hiperemiada e dor: estoma **derivativo**, **dermatite periostomal**. {q-unesp2026-077}
- Abscesso periestomal precoce: **colonização da pele** e semeadura perioperatória. {q-fmabc2026-025}` },
      ],
    },
    {
      id: "intra", titulo: "Complicações intra-abdominais",
      introducao: `[[O **vazamento de uma anastomose** derrama conteúdo entérico na cavidade e causa peritonite ou abscesso: o paciente com taquicardia, febre e íleo persistente no 5º ao 7º dia tem deiscência até prova em contrário, e a conduta depende de a coleção estar **contida** (drenar) ou de haver **peritonite ou sepse** (reoperar).|q-sirio2023-028,q-sirio2026-029,q-sirio2026-033]] Com o foco controlado, o antibiótico é curto.`,
      fragmentos: [
        { id: "anastomose", titulo: "Deiscência de anastomose, peritonite e abscesso", conferir: true, diretrizes: ["wses-iai"],
          questoes: ["q-usp2023-002","q-sirio2023-028","q-sirio2026-029","q-sirio2026-033","q-einstein2021-011","q-usprp2024-028","q-famema2021-004","q-sirio2022-021"],
          prosa: `[[A **peritonite difusa** com descompressão brusca positiva e pneumoperitônio no 5º dia de colectomia, e a **sepse** com íleo persistente após Hartmann com tomografia que mostra a coleção, são indicação de **reoperação** (controle da fonte, lavagem e drenagem); o dreno que sai **bile** em volume de 600 mL por dia depois de sutura de úlcera também.|q-sirio2026-033,q-sirio2023-028,q-einstein2021-011]] [[A **coleção loculada de 6 cm** junto da anastomose, sem extravasamento difuso, em paciente **estável**, é abscesso por deiscência contida: **drenagem percutânea guiada por imagem e antibiótico venoso**, o mesmo que se faz na coleção bloqueada da goteira parietocólica em fibrose cística.|q-sirio2026-029,q-sirio2022-021]]

[[Depois da apendicite perfurada, o **abscesso de cavidade** é a complicação mais comum, e se manifesta tardiamente (10º dia) com febre, íleo e dor; o abscesso hepático piogênico de 6 cm, no 21º dia, é **drenado por via percutânea** com antibiótico.|q-usprp2024-028,q-famema2021-004]] [[Na peritonite secundária pós-operatória, com foco controlado cirurgicamente, usa-se **piperacilina-tazobactam por cerca de cinco dias**, porque a flora é de infecção associada à assistência, com gram-negativos resistentes, enterococos e anaeróbios.|q-usp2023-002]]`,
          texto: `- 5º dia de ressecção colônica, peritonite e pneumoperitônio: **reexploração** com controle da fonte e lavagem. {q-sirio2026-033}
- 5º dia de Hartmann, sepse e íleo, suspeita de deiscência do coto retal: **reoperação**. {q-sirio2023-028}
- 2º dia de sutura de úlcera com 600 mL bilioso no dreno: **nova abordagem cirúrgica**. {q-einstein2021-011}
- Coleção de 6 cm junto da anastomose, estável: **antibiótico venoso e drenagem percutânea**. {q-sirio2026-029}
- Fibrose cística com coleção bloqueada na goteira parietocólica: **drenagem por radiologia intervencionista**. {q-sirio2022-021}
- 10º dia de apendicectomia perfurada, febre e íleo: **abscesso de cavidade**. {q-usprp2024-028}
- Abscesso hepático de 6 cm no 21º dia de apendicite: **drenagem percutânea e antibiótico**. {q-famema2021-004}
- Peritonite por deiscência de anastomose controlada: **piperacilina-tazobactam por 5 dias**. {q-usp2023-002}` },
        { id: "fistulas", titulo: "Fístula enterocutânea", conferir: true,
          figuras: [{ arquivo: "figuras/fistula-enterocutanea.svg", legenda: "Esquema autoral: o que favorece e o que impede o fechamento espontâneo da fístula enterocutânea." }],
          questoes: ["q-amrigs2022-031","q-famema2025-023","q-sessp2025-034","q-fmabc2025-026","q-fmabc2022-022","q-fmabc2023-032"],
          prosa: `A fístula é a comunicação anormal entre o intestino e a pele, e a maioria é **pós-operatória** (deiscência de anastomose, lesão intestinal). Ela fecha quando o trajeto pode cicatrizar e não fecha quando a mucosa se continua com a pele ou o fluxo e a infecção impedem a granulação. [[Têm **bom prognóstico** a fístula de **jejuno com trajeto longo** (mais de 2 cm), de orifício pequeno, baixo débito e lateral; **impedem o fechamento** o corpo estranho, a enterite por radiação, a infecção ou doença inflamatória, a neoplasia, a **obstrução a jusante**, o trajeto epitelizado ou curto, o **débito alto** (acima de 500 mL por dia), a anemia e a cronicidade.|q-amrigs2022-031,q-fmabc2023-032,q-sessp2025-034]]

[[O paciente desnutrido que evolui com débito entérico pela incisão perde líquido e eletrólitos, desnutre e septiza, e **sem tratamento imediato** evolui para falência de órgãos; o tratamento inicial é **conservador** (reposição, controle da sepse, nutrição, proteção da pele), e a cirurgia fica para meses depois, se a fístula não fechar.|q-famema2025-023]] [[Na fístula de **cólon, de baixo débito**, a dieta enteral **pobre em resíduos** nutre sem aumentar o débito; não se indica albumina de rotina.|q-fmabc2022-022]]`,
          texto: `- Bom prognóstico: **fístula de jejuno com trajeto longo**. {q-amrigs2022-031}
- Impedem o fechamento: **enterite por radiação** e **débito acima de 500 mL por dia**. {q-fmabc2023-032}
- Perpetuam a fístula: **anemia, alto débito, obstrução a jusante e cronicidade**. {q-sessp2025-034}
- Fístulas com tratos múltiplos, internas e de duodeno, íleo lateral, estômago e cólon: **desfavoráveis**. {q-fmabc2025-026}
- Fístula de cólon de baixo débito: **dieta enteral com baixo teor de resíduos**. {q-fmabc2022-022}
- Paciente desnutrido com fístula pós-operatória: perdas, desnutrição e sepse levam à **falência de órgãos** sem tratamento imediato. {q-famema2025-023}` },
        { id: "compartimental", titulo: "Hipertensão intra-abdominal e síndrome compartimental", conferir: true, diretrizes: ["wsacs"],
          questoes: ["q-sirio2024-028","q-sirio2027-040","q-fmabc2026-040"],
          prosa: `O abdome é uma caixa fechada: quando a pressão sobe, comprime a veia cava e o diafragma, reduz o retorno venoso, o débito cardíaco e o volume corrente, e dá oligúria e acidose. [[A **síndrome compartimental** aparece depois de laparotomia por trauma ou de hernioplastia gigante, com **distensão, aumento da resistência das vias aéreas ou dos parâmetros ventilatórios, hipotensão refratária, oligúria e acidose com retenção de CO2**, e a conduta é a **descompressão cirúrgica** (laparotomia), não a espera, a antibioticoterapia nem a reposição volêmica isolada.|q-sirio2027-040,q-sirio2024-028]] [[A pressão é medida **pela sonda vesical**, com instilação de **25 mL de soro fisiológico**, no fim da expiração, em decúbito dorsal; a síndrome compartimental é a pressão sustentada acima de **20 mmHg** com **falência de órgão nova**, e é ela, e não o número isolado, que indica a descompressão cirúrgica: o grau III (21 a 25 mmHg) ou o IV (acima de 25) sem disfunção começam pelo tratamento clínico (sonda, sedação, balanço hídrico).|q-sirio2024-028,q-fmabc2026-040]]`,
          texto: `- Hernioplastia gigante em obesa, vias aéreas mais resistentes, hipotensão e oligúria: suspeita de **síndrome compartimental**. {q-sirio2024-028}
- Medir a pressão intra-abdominal por **sonda vesical** com **25 mL** de soro. {q-sirio2024-028}
- Pós-laparotomia de trauma com distensão, ventilação pior, hipotensão e acidose: **síndrome compartimental**, **descompressão**. {q-sirio2027-040}
- Pressão acima de 20 mmHg **com disfunção de órgão** (grau III ou IV): **descompressão cirúrgica**. {q-fmabc2026-040}` },
        { id: "lesoes", titulo: "Lesões iatrogênicas e complicações de procedimentos", conferir: true,
          questoes: ["q-sirio2023-030","q-sirio2025-025","q-sirio2022-025","q-sirio2022-022","q-sirio2023-034"],
          prosa: `[[Depois de **cesariana com sondagem vesical**, a dor e a distensão com **ureia e creatinina elevadas** sem infecção grave e com líquido livre na tomografia sugerem **lesão de bexiga intraperitoneal**: a urina cai na cavidade e é reabsorvida pelo peritônio.|q-sirio2023-030]] [[No 1º dia de colecistectomia laparoscópica em paciente com várias laparotomias e pneumoperitônio por agulha de Veress, dor intensa, distensão e tomografia com **líquido livre e gás fora de alça** indicam **lesão de víscera oca**.|q-sirio2025-025]]

[[Na lesão superficial do polo do baço (2,5 cm) durante o descolamento do ângulo esplênico, **aplicam-se hemostáticos e, se preciso, sutura**, preservando o órgão; a embolização pré-operatória da artéria esplênica provoca dor de difícil controle por isquemia do baço; e o **aneurisma de artéria esplênica roto** em puérpera que estabiliza com ressuscitação é tratado por **embolização arterial**.|q-sirio2022-025,q-sirio2022-022,q-sirio2023-034]]`,
          texto: `- 5º dia de cesariana, dor, distensão, ureia 76 e creatinina 4,14: **lesão de bexiga intraperitoneal**. {q-sirio2023-030}
- 1º dia de colecistectomia laparoscópica, líquido livre e gás fora de alça: **lesão de víscera oca**. {q-sirio2025-025}
- Lesão de 2,5 cm no polo do baço: **hemostáticos e, se preciso, sutura**. {q-sirio2022-025}
- Embolização esplênica pré-esplenectomia: **dor de difícil controle** pelo infarto. {q-sirio2022-022}
- Aneurisma esplênico roto em puérpera estável: **embolização arterial**. {q-sirio2023-034}` },
        { id: "corpo-estranho", titulo: "Corpo estranho, compressa retida e abdome agudo no imunossuprimido", conferir: true,
          casos: ["q-uspsp4-062"],
          questoes: ["q-scmsp2026-035","q-scmsp2026-038","q-uspsp4-062","q-scmsp2026-026"],
          prosa: `[[O **corpo estranho linear** na porção distal do duodeno, sem peritonite ou sepse, é retirado por **endoscopia urgente**; o corpo estranho no retossigmoide, inserido há seis dias, sem peritonite nem pneumoperitônio, com o paciente estável, tem como primeira opção a **extração transanal**.|q-scmsp2026-035,q-scmsp2026-038]] [[A massa pélvica com gás e um componente radiopaco na tomografia, depois de laparotomia por peritonite, é **compressa cirúrgica retida (gossipiboma)**, e o tratamento é a **reabordagem cirúrgica**; a drenagem percutânea e o tratamento não operatório não resolvem.|q-uspsp4-062]] [[Na transplantada renal com imunossupressores e espessamento circunferencial do íleo distal, a prova cobrou **enterocolite neutropênica**.|q-scmsp2026-026]]`,
          texto: `- Corpo estranho linear no duodeno distal, sem peritonite: **endoscopia urgente**. {q-scmsp2026-035}
- Corpo estranho no retossigmoide, estável, sem peritonite: **extração transanal**. {q-scmsp2026-038}
- Massa pélvica com componente radiopaco após laparotomia: **gossipiboma**, **reabordagem**. {q-uspsp4-062}
- Transplantada renal em imunossupressão, espessamento do íleo distal: **enterocolite neutropênica**. {q-scmsp2026-026}` },
      ],
    },
    {
      id: "classificacoes", titulo: "Classificação das complicações: Clavien-Dindo",
      introducao: `A classificação de **Clavien-Dindo** gradua a complicação pelo **tratamento que ela exige**, e não pelo diagnóstico.`,
      fragmentos: [
        { id: "clavien", titulo: "Graus de Clavien-Dindo", conferir: true, diretrizes: ["clavien-dindo"],
          questoes: ["q-iamspe2023-030","q-famema2023-072"],
          prosa: `[[O **grau I** é qualquer desvio do curso normal sem tratamento específico; o **II**, tratamento medicamentoso (inclusive transfusão e nutrição parenteral); o **III**, intervenção cirúrgica, endoscópica ou radiológica; o **IV**, complicação com risco de vida que exige terapia intensiva; e o **grau V** é o **óbito**. Não existem graus VI e VII.|q-iamspe2023-030,q-famema2023-072]]`,
          texto: `- O **óbito** é o grau **V** de Clavien-Dindo. {q-iamspe2023-030,q-famema2023-072}
- O grau **IV** é complicação com risco de vida em terapia intensiva; **VI e VII não existem**. {q-famema2023-072}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-sirio2022-031","q-fmabc2025-026","q-fmabc2023-032","q-amrigs2022-031","q-fmabc2026-040","q-tp20241-080"],
          prosa: `[[Na evisceração, a regra é refazer o fechamento da parede, e o uso de tela em campo contaminado é discutido; a Sírio 2022 cobrou **laparotomia com tela de polipropileno onlay** em toda a incisão.|q-sirio2022-031]] [[Entre os fatores de fístula, a origem no **cólon** é descrita como desfavorável pela FMABC 2025 e a fístula de jejum com trajeto longo como favorável pela AMRIGS 2022; a FMABC 2023 cobrou **radiação e débito acima de 500 mL**.|q-fmabc2025-026,q-fmabc2023-032,q-amrigs2022-031]] [[A graduação da hipertensão intra-abdominal começa em 12 mmHg (grau I: 12 a 15); a FMABC 2026 cobrou o **grau III (21 a 25 mmHg)** com descompressão cirúrgica, e o texto da própria questão chama de síndrome compartimental a pressão acima de 20 mmHg.|q-fmabc2026-040]] [[Na infecção de ferida com tela de polipropileno, o agente mais comum em prótese é o *S. aureus*; a Teste de Progresso 2024 cobrou o ***S. epidermidis***.|q-tp20241-080]]`,
          texto: `- Regra: evisceração se reopera e refaz a parede; a prova (Sírio 2022) cobrou **tela de polipropileno onlay** em toda a incisão. {q-sirio2022-031}
- Regra: jejuno com trajeto longo favorece o fechamento; a prova (FMABC 2025) listou **cólon** entre as origens desfavoráveis, e a (FMABC 2023) cobrou **radiação e débito alto**. {q-fmabc2025-026,q-fmabc2023-032,q-amrigs2022-031}
- Regra: hipertensão grau I é 12 a 15 mmHg; a prova (FMABC 2026) cobrou o **grau III** com descompressão cirúrgica. {q-fmabc2026-040}
- Regra: infecção de prótese tem *S. aureus* como agente mais comum; a prova (Teste de Progresso 2024) cobrou *S. epidermidis* em ferida com tela. {q-tp20241-080}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A tabela resume a decisão de cada complicação do pós-operatório, sem dado novo.`,
      fragmentos: [
        { id: "comp-pos", titulo: "Complicação × dia × conduta",
          conferir: true,
          questoes: ["q-uspsp1-031","q-uspsp4-068","q-sirio2026-029","q-sirio2023-028","q-usprp2025-081","q-fmabc2024-025"],
          prosa: `| Complicação | Quando | Sinal | Conduta |
|---|---|---|---|
| Febre inflamatória | 1º e 2º dia | até 37,8 °C, sem outros achados | **sintomáticos** |
| Hemorragia | primeiras 24 horas | choque, abdome tenso | **reoperar** |
| Infecção da incisão | 5º ao 7º dia | secreção purulenta, estável | **abrir e drenar** |
| Deiscência da aponeurose | 6º ao 8º dia | líquido em água de carne | **ressuturar a parede** |
| Abscesso contido | 3º ao 10º dia | coleção loculada, estável | **drenagem percutânea e antibiótico** |
| Peritonite por deiscência | 5º ao 7º dia | sepse, íleo, pneumoperitônio | **reoperar** |`,
          texto: `- Infecção da incisão: **abrir pontos**; deiscência da aponeurose: **reabordar a parede**. {q-uspsp1-031,q-uspsp4-068}
- Coleção contida e estável: **drenagem percutânea**; sepse: **reoperação**. {q-sirio2026-029,q-sirio2023-028}
- Febre baixa precoce: **sintomáticos**; choque precoce: **hemorragia**. {q-usprp2025-081,q-fmabc2024-025}` },
      ],
    },
  ],
});
