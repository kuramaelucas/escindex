/* resumos/tce/resumo.js — resumo adaptativo de traumatismo cranioencefálico: Glasgow e via aérea, hipertensão intracraniana,
   quando pedir tomografia (adulto e criança), hematomas extradural e subdural, neuroproteção e escalonamento da PIC,
   herniação, crises e trauma raquimedular (Brown-Séquard).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- tce */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "tce",
  titulo: "Traumatismo cranioencefálico",
  assunto: "ass-neurocir-tce",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "btf-4ed", texto: "Brain Trauma Foundation — diretrizes de manejo do TCE grave, 4ª edição (2016, com atualizações)", edicao: "4ª", lidoEm: null },
    { id: "atls", texto: "American College of Surgeons — ATLS, 10ª edição: trauma cranioencefálico e escala de coma de Glasgow", edicao: "10ª", lidoEm: null },
    { id: "pecarn", texto: "PECARN — regra de decisão para TCE leve em crianças (menores e maiores de 2 anos)", lidoEm: null },
    { id: "canadian-ct", texto: "Canadian CT Head Rule e regra de New Orleans — tomografia no TCE leve do adulto", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "avaliacao", titulo: "Glasgow, via aérea e hipertensão intracraniana",
      introducao: `O crânio é uma caixa rígida: o tecido cerebral, o sangue e o líquor ocupam um volume fixo (doutrina de **Monro-Kellie**). [[Quando surge um volume novo (hematoma, edema), o líquor e o sangue venoso são deslocados e a pressão **se mantém por um tempo**; esgotada essa complacência, **a pressão intracraniana (PIC) sobe de forma exponencial**, a pressão de perfusão cerebral cai (PPC = pressão arterial média − PIC) e o tronco encefálico é comprimido.|q-sirio2027-029,q-amrigs2023-063]] O objetivo de todo o tratamento é **evitar a lesão secundária**: hipóxia, hipotensão, hipercapnia, febre e PIC alta.

Veja também: **Atendimento inicial ao politraumatizado (ATLS)** (avaliação primária e cuidados com a coluna cervical), **Trauma de tórax** e **Trauma abdominal** (lesões associadas), **Distúrbios hidroeletrolíticos e ácido-base** (sódio, diabetes insípido) e **Convulsão febril** (crises na criança).`,
      fragmentos: [
        { id: "glasgow", titulo: "Escala de coma de Glasgow e gravidade do TCE", conferir: true, diretrizes: ["atls"],
          figuras: [{ arquivo: "figuras/glasgow.svg", legenda: "Esquema autoral: escala de coma de Glasgow e classificação do TCE." }],
          questoes: ["q-scmsp2022-069","q-amrigs2022-038","q-amrigs2022-040","q-sessp2025-031"],
          prosa: `A escala soma **abertura ocular (1 a 4), resposta verbal (1 a 5) e resposta motora (1 a 6)**, de 3 a 15. [[O paciente que abre os olhos à pressão (2), fala de forma confusa (4) e responde com flexão normal (4) tem Glasgow **10**; o que abre os olhos à dor (2), emite sons incompreensíveis (2) e localiza a dor (5) tem **9**.|q-scmsp2022-069,q-amrigs2022-038]] [[A **resposta motora** é o componente mais preditivo do desfecho neurológico; a **decorticação** é a **flexão anormal** (3) e a **descerebração**, a **extensão anormal** (2).|q-amrigs2022-040,q-sessp2025-031]] Pelo ATLS, o TCE é **grave com Glasgow de 8 ou menos** (indicação de via aérea definitiva), **moderado de 9 a 12** e **leve de 13 a 15**; parte dos protocolos de tomografia trata o Glasgow 13 como de risco maior.`,
          texto: `- Abertura ocular à pressão, verbal confusa e flexão normal: **Glasgow 10**. {q-scmsp2022-069}
- Abertura ocular à dor, sons incompreensíveis e localização da dor: **Glasgow 9**. {q-amrigs2022-038}
- A **resposta motora** é o componente mais preditivo do desfecho. {q-amrigs2022-040}
- **Decorticação** = flexão anormal; **descerebração** = extensão anormal. {q-sessp2025-031}` },
        { id: "via-aerea", titulo: "Via aérea, gravidade e transferência", conferir: true, diretrizes: ["atls"],
          questoes: ["q-sessp2022-026","q-sirio2025-029","q-einstein2025-022"],
          prosa: `Paciente que falava e **passa a ficar arresponsivo** após trauma craniano perdeu proteção da via aérea: [[a conduta é a **intubação orotraqueal** (com a coluna cervical protegida) e, depois, a tomografia de crânio; com Glasgow 6, respiração irregular, anisocoria e desvio da linha média, a **prioridade é a via aérea e a ventilação**, antes do manitol, da craniotomia ou dos barbitúricos.|q-sessp2022-026,q-sirio2025-029]] [[A queda de Glasgow de 14 (AO 4, RV 4, RM 6) para 8 (AO 2, RV 2, RM 4), com **midríase à direita**, é **TCE grave** com sinal de herniação: intubar e **transferir para centro de trauma com neurocirurgião**, se o hospital não os tem.|q-einstein2025-022]]`,
          texto: `- Falava e ficou arresponsivo após paulada na cabeça: **intubação orotraqueal e tomografia de crânio**. {q-sessp2022-026}
- Glasgow 6, respiração irregular, anisocoria e desvio da linha média: prioridade **intubação e ventilação**. {q-sirio2025-029}
- Glasgow de 14 para 8 com midríase direita: **TCE grave**, intubar e **transferir** ao centro com neurocirurgião. {q-einstein2025-022}` },
        { id: "hic-sinais", titulo: "Sinais de hipertensão intracraniana", conferir: true,
          questoes: ["q-amrigs2023-063","q-sirio2027-029"],
          prosa: `[[**Papiledema, depressão da consciência e déficits neurológicos focais** são evidências clínicas de hipertensão intracraniana.|q-amrigs2023-063]] [[Pela doutrina de Monro-Kellie, o aumento do volume por sangue extravascular ou edema é compensado no início e, depois do esgotamento dos mecanismos de compensação, **a pressão intracraniana sobe exponencialmente**; a pressão de perfusão cerebral cai (e não aumenta) com a elevação da PIC; e o risco de herniação cresce com o volume e a pressão.|q-sirio2027-029]]`,
          texto: `- **Papiledema, depressão da consciência e déficit focal** são sinais de hipertensão intracraniana. {q-amrigs2023-063}
- Compensação inicial e, depois, **elevação exponencial da PIC** (Monro-Kellie). {q-sirio2027-029}` },
      ],
    },
    {
      id: "tomografia", titulo: "Quando pedir tomografia de crânio",
      introducao: `[[No TCE **leve** (Glasgow 13 a 15, sobretudo 14 e 15), a pergunta é quem tem risco de lesão que muda a conduta: a **idade a partir de 65 anos**, o uso de **anticoagulante ou antiagregante**, o vômito, a perda de consciência, a amnésia e o mecanismo violento indicam **tomografia de crânio sem contraste**; a radiografia de crânio e a ressonância não são o exame inicial.|q-adap21-077,q-usp2025-027,q-iamspe2025-023]] Na criança, as regras são as do **PECARN**.`,
      fragmentos: [
        { id: "tc-adulto", titulo: "Adulto: idade, anticoagulante e mecanismo", conferir: true, diretrizes: ["canadian-ct"],
          questoes: ["q-adap21-077","q-usp2025-027","q-iamspe2025-023","q-iamspe2026-030","q-unicamp2022-023","q-sirio2023-026"],
          prosa: `[[A idosa de 72 anos em uso de AAS, com vômito e hematoma frontal; a de 78 anos que bateu a cabeça, mesmo sem perda de consciência e depois de suturado o ferimento; o de 88 anos anticoagulado após queda da própria altura; a de 63 anos em uso de **rivaroxabana** com Glasgow 15; e o de 68 anos com ferimento do supercílio têm indicação de **tomografia de crânio**: o que pesa é a **idade de 65 anos ou mais** (regra canadense) e a **anticoagulação**, não a profundidade do ferimento, o tabagismo ou o hipotireoidismo.|q-adap21-077,q-usp2025-027,q-iamspe2025-023,q-iamspe2026-030,q-unicamp2022-023]] [[A tomografia **não é necessária** quando o paciente jovem tem Glasgow 15 e a queda foi há 12 horas, sem sintomas; já o de 75 anos em clopidogrel, o de 25 anos com Glasgow 14 e álcool, a vítima de capotamento com morte no local e o lactente hipotônico por meia hora com vômitos **precisam** de tomografia.|q-sirio2023-026]]`,
          texto: `- Idosa de 72 anos em uso de AAS, queda, vômito e hematoma frontal: **tomografia de crânio**. {q-adap21-077}
- Idosa de 78 anos, Glasgow 15, sem perda de consciência, ferimento frontal suturado: **tomografia de crânio**. {q-usp2025-027}
- Idoso de 88 anos anticoagulado, hematoma subgaleal: **tomografia de crânio** (não observar nem ressonância). {q-iamspe2025-023}
- Mulher de 63 anos em uso de rivaroxabana, Glasgow 15: **tomografia de crânio**. {q-iamspe2026-030}
- Homem de 68 anos, ferimento no supercílio: a indicação decorre da **idade**. {q-unicamp2022-023}
- Não precisa de tomografia: Glasgow 15 o tempo todo, queda há 12 horas, sem sintomas. {q-sirio2023-026}` },
        { id: "tc-pediatrico", titulo: "Criança: PECARN, risco e sinais de fratura de base", conferir: true, diretrizes: ["pecarn"],
          questoes: ["q-sessp2025-058","q-unicampdis2022-036","q-uspsp1-014","q-uspsp4-098","q-sirio2027-045","q-fmabc2022-047","q-sessp2023-032","q-sessp2026-060"],
          prosa: `O PECARN separa a criança em **menor de 2 anos** e **de 2 anos ou mais**, e classifica o risco de lesão intracraniana: **muito baixo** (alta sem tomografia), **intermediário** (observação ou tomografia) e **alto** (tomografia). [[A criança de 3 anos com queda da própria altura, Glasgow 15, sem perda de consciência, vômito ou cefaleia e exame normal é de **muito baixo risco** e vai para casa, com sinais de alarme; a de 5 anos que cai de uma altura **acima de 1,5 m** (nos ombros do pai de 1,80 m) tem risco intermediário (tomografia ou observação); na menor de 2 anos, a altura de corte é **0,9 m**, e a **queda de até 50 cm não é mecanismo grave**.|q-sirio2027-045,q-unicampdis2022-036,q-sessp2023-032]]

[[A menina de 5 anos **sonolenta, irritada e com vômitos recorrentes** após queda de patinete faz **tomografia de crânio**; a de 3 anos com **equimose retroauricular (sinal de Battle) e hemotímpano** tem possível fratura de base do crânio e faz **tomografia**; o menino de 10 anos com perda de consciência, confusão e fratura de antebraço, estável, faz **tomografia de crânio e de coluna cervical**; a lactente de 1 ano e 6 meses com queda de 60 cm e hematoma occipital, sem sintomas, fica em **observação neurológica** (risco intermediário); e a de 15 meses com perda de consciência, vômitos e hematoma frontal tem TCE leve com risco moderado.|q-sessp2025-058,q-fmabc2022-047,q-sessp2026-060,q-uspsp1-014,q-uspsp4-098]]`,
          texto: `- Criança de 5 anos sonolenta e com vômitos após queda: **tomografia de crânio**. {q-sessp2025-058}
- Queda dos ombros de adulto de 1,80 m em criança de 5 anos: **risco alto/intermediário**, tomografia ou observação (altura acima de **1,5 m**). {q-unicampdis2022-036}
- Lactente de 1 ano e 6 meses, queda de 60 cm, hematoma occipital: **observação neurológica**. {q-uspsp1-014}
- Lactente de 15 meses, perda de consciência de 10 segundos e vômitos: TCE leve, **risco moderado**. {q-uspsp4-098}
- Criança de 3 anos, queda da própria altura, sem sintomas: **alta sem tomografia**. {q-sirio2027-045}
- Equimose retroauricular e hemotímpano aos 3 anos: **tomografia** (fratura de base). {q-fmabc2022-047}
- Em menores de 2 anos, a **queda de até 50 cm não é mecanismo grave**. {q-sessp2023-032}
- Criança de 10 anos com perda de consciência e fratura de antebraço: **tomografia de crânio e de coluna cervical**. {q-sessp2026-060}` },
      ],
    },
    {
      id: "lesoes", titulo: "Hematomas e lesões da tomografia",
      introducao: `A forma da coleção na tomografia identifica o vaso: [[o **extradural** é uma **lente biconvexa hiperdensa**, que **não cruza as suturas**, por sangramento arterial (**artéria meníngea média**); o **subdural agudo** é um **crescente hiperdenso** que acompanha o hemisfério e **cruza as suturas**, por ruptura de veias-ponte; o **subdural crônico** é um crescente **hipodenso**.|q-uspsp5-049,q-unicamp2022-048,q-unicampdis2023-015,q-unesp2026-079]]`,
      fragmentos: [
        { id: "extradural", titulo: "Hematoma extradural", conferir: true, diretrizes: ["btf-4ed"],
          casos: ["q-uspsp5-049"],
          questoes: ["q-adap26-041","q-scmsp2021-038","q-scmsp2022-011","q-tp20212-071","q-unicamp2022-048","q-uspsp5-049","q-unicampdis2024-013","q-unicampdis2024-014","q-einstein2023-019","q-sessp2024-032"],
          prosa: `A fratura da escama do temporal rompe a **artéria meníngea média**, que corre colada à dura-máter. [[O quadro clássico é o **intervalo lúcido**: perda de consciência breve, depois lucidez (Glasgow 14 ou 15, às vezes com confusão ou amnésia) e, em horas, **cefaleia, vômitos, sonolência, anisocoria com midríase do mesmo lado do hematoma e hemiparesia contralateral**.|q-scmsp2022-011,q-tp20212-071,q-unicampdis2024-013,q-einstein2023-019]] [[A tomografia mostra a **lente biconvexa**; o hematoma extradural **expansivo** (4,5 cm, desvio da linha média de 9 mm, anisocoria) se trata com **craniotomia de urgência**, evacuação e hemostasia, e não com observação.|q-adap26-041,q-unicamp2022-048,q-uspsp5-049,q-scmsp2021-038]] [[A **concussão** é a alteração transitória e reversível do estado mental; a lesão axonal difusa são microrrupturas de axônios; o hematoma extradural tem aspecto **biconvexo** (não côncavo-convexo) e o subdural vem de veias, não da meníngea média.|q-sessp2024-032]]`,
          texto: `- Taco na região temporal, intervalo lúcido, anisocoria e lente biconvexa de 4,5 cm: **craniotomia de urgência**. {q-adap26-041}
- Glasgow 8, midríase direita, vômito e perda de consciência breve: **extradural** por **artéria meníngea média**; craniotomia à direita. {q-scmsp2021-038}
- Glasgow 14 que cai para 11 em 6 horas, lente biconvexa: **hematoma extradural agudo**. {q-scmsp2022-011}
- Glasgow 15 com equimose periorbital, sonolência e dilatação pupilar depois de 3 horas: **extradural**. {q-tp20212-071}
- Menina de 10 anos, sonolenta, FC 56 e PA 144 x 92: **extradural com hipertensão intracraniana**. {q-unicamp2022-048}
- Colisão de carro, consciente que evolui com rebaixamento, vômitos e agitação: **extradural** (lente biconvexa). {q-uspsp5-049}
- Intervalo lúcido de 70 minutos e anisocoria: **hematoma extradural**. {q-unicampdis2024-013}
- Vaso do extradural: **artéria meníngea média**. {q-unicampdis2024-014}
- Queda de 6 metros, fala o nome e piora em 2 horas: **hematoma epidural** com intervalo lúcido. {q-einstein2023-019}
- **Concussão**: alteração transitória e reversível do estado mental, por definição com menos de 6 horas. {q-sessp2024-032}` },
        { id: "subdural-agudo", titulo: "Hematoma subdural agudo", conferir: true, diretrizes: ["btf-4ed"],
          questoes: ["q-unicampdis2023-015","q-uspsp3-038"],
          prosa: `[[O **subdural agudo** é o crescente hiperdenso da convexidade, de alta energia (queda de moto com Glasgow 7 e anisocoria); no **lactente** com queda baixa, crises e doença hemorrágica em investigação (hemofilia), a conduta é **corrigir a coagulopatia** (complexo protrombínico, na lista oferecida), tratar as crises com **fenitoína** e liberar para a **drenagem cirúrgica**.|q-unicampdis2023-015,q-uspsp3-038]]`,
          texto: `- Queda de moto, Glasgow 7, pupilas anisocóricas e crescente: **hematoma subdural agudo**. {q-unicampdis2023-015}
- Lactente com crises, hemofilia suspeita e crescente: **subdural**, corrigir a coagulopatia, fenitoína e cirurgia. {q-uspsp3-038}` },
        { id: "subdural-cronico", titulo: "Hematoma subdural crônico", conferir: true, diretrizes: ["btf-4ed"],
          questoes: ["q-unifesp2026-041","q-unesp2026-079","q-didepm-037","q-unicampdis2025-057"],
          prosa: `A atrofia do idoso (e do etilista) estica as **veias-ponte**, que se rompem com trauma mínimo, e o sangramento lento forma uma coleção que, semanas depois, comprime o cérebro. [[O quadro é **subagudo**: cefaleia, apatia, lentificação, confusão, dificuldade de falar e **hemiparesia com reflexos vivos e Babinski do lado oposto**; o idoso etilista, anticoagulado ou em uso de AAS, com queda nas semanas anteriores, é o perfil; o exame é a **tomografia de crânio** (crescente hipodenso, com apagamento dos sulcos e desvio da linha média).|q-unifesp2026-041,q-unesp2026-079,q-unicampdis2025-057]] [[O hematoma crônico **sintomático** se trata com **drenagem por trepanação (trépano)**, e no anticoagulado **reverte-se a anticoagulação** antes (INR de 3,4 na varfarina); a craniotomia com retirada de osso, o manitol com dexametasona e a espera com tomografia seriada não são o tratamento.|q-unesp2026-079,q-didepm-037,q-unicampdis2025-057]]`,
          texto: `- Idoso de 70 anos, cefaleia há 5 semanas, apatia e hemiparesia direita: **subdural esquerdo**; **tomografia de crânio**. {q-unifesp2026-041}
- Etilista de 77 anos, hemiparesia braquiocrural, crescente hipodenso: **trépano-punção**. {q-unesp2026-079}
- Varfarina, INR 3,4, queda há 5 semanas, crescente de 18 mm: **reverter a anticoagulação e drenar por trepanação**. {q-didepm-037}
- Idoso de 76 anos em AAS, desorientado e com quedas: **drenagem do hematoma**. {q-unicampdis2025-057}` },
        { id: "outras-lesoes", titulo: "Lesão axonal difusa e leitura da tomografia", conferir: true,
          questoes: ["q-unifesp2023-097","q-tp20222-017"],
          prosa: `[[A **lesão axonal difusa** é o trauma de **aceleração e desaceleração** (acidente de moto) com Glasgow baixo desproporcional à tomografia, que pode mostrar apenas uma pequena lesão hiperdensa **profunda** (cápsula interna, corpo caloso), como o motociclista com Glasgow 13, hemiplegia e lesão de 20 mm.|q-unifesp2023-097]] [[Na tomografia, o **ar vale −1.000 HU** (seio frontal), a água, 0, e o osso, cerca de +1.000; o parênquima, os ventrículos e as meninges ficam entre eles.|q-tp20222-017]]`,
          texto: `- Motociclista com Glasgow 13 e lesão profunda na cápsula interna: **lesão axonal difusa**. {q-unifesp2023-097}
- Densidade do seio frontal na tomografia: cerca de **−1.000 HU**. {q-tp20222-017}` },
      ],
    },
    {
      id: "manejo", titulo: "TCE grave: neuroproteção, PIC e herniação",
      introducao: `[[O tratamento do TCE grave é **escalonado**: primeiro as **medidas básicas** de neuroproteção (cabeceira a 30°, cabeça na linha média, normocapnia, normotermia, analgesia e sedação, evitar hipotensão e hipóxia); se a PIC persiste, a **osmoterapia**, a drenagem de líquor e o bloqueio neuromuscular; e, no resgate, a **hiperventilação breve** (ponte para a cirurgia), os **barbitúricos** e a craniectomia.|q-usp2023-010,q-sirio2023-049,q-adap24-028,q-uspsp4-050]] O **corticoide não tem papel** no TCE.`,
      fragmentos: [
        { id: "neuroprotecao", titulo: "Medidas básicas e metas", conferir: true, diretrizes: ["btf-4ed","atls"],
          questoes: ["q-usp2023-010","q-sirio2026-027","q-scmsp2022-037","q-sessp2022-029","q-einstein2023-027","q-usp2026-051"],
          prosa: `O cérebro lesado perde a autorregulação, e a hipotensão e a hipóxia duplicam a mortalidade. [[Na admissão do TCE grave (edema difuso, sem hipertensão intracraniana): **proclive (cabeceira a 30°), controle de temperatura e posição cervical neutra**; a meta é **pressão arterial sistólica de pelo menos 100 a 110 mmHg**, **normocapnia** (PaCO2 de **35 a 40**) e **sem hiperventilação profilática**; não há **hipotensão permissiva** nem hipotermia profilática.|q-usp2023-010,q-sirio2026-027,q-sessp2022-029]] [[Na criança com TCE grave e edema sem herniação, as medidas iniciais são **normotermia (temperatura central abaixo de 38 °C)**, normocapnia, sedação, analgesia e cabeceira elevada; a cetamina não é contraindicada no ventilado; a salina hipertônica é a de 3 %; e a PIC-alvo é **abaixo de 20 mmHg**.|q-scmsp2022-037]] [[Deve-se **evitar a hipercapnia** (vasodilatação cerebral eleva a PIC); o lactente com TCE grave e frequência respiratória de 8, SpO2 de 89 % tem **acidose respiratória** (pH 7,28, pCO2 55) por hipoventilação central.|q-einstein2023-027,q-usp2026-051]]`,
          texto: `- Edema difuso sem hipertensão intracraniana: **proclive, controle de temperatura, posição cervical neutra**. {q-usp2023-010}
- Glasgow 8, PA 96 x 60: manter **PAS de pelo menos 100 a 110** e normocapnia; **sem hiperventilação profilática**. {q-sirio2026-027}
- Criança de 5 anos com Glasgow 7 e edema: **normotermia** (temperatura central abaixo de 38 °C). {q-scmsp2022-037}
- Criança de 12 anos intubada com extradural: PAS acima de 100, Hb acima de 7, **PaCO2 de 35 a 40**, cabeceira elevada, **manitol se anisocoria**. {q-sessp2022-029}
- Hematoma extradural com Glasgow 8 e anisocoria: **evitar hipercapnia**, não hipotensão permissiva. {q-einstein2023-027}
- TCE grave no lactente com FR 8 e SpO2 89 %: **acidose respiratória** (pH 7,28, pCO2 55, PaO2 58). {q-usp2026-051}` },
        { id: "escalonamento-pic", titulo: "Escalonamento da PIC, barbitúricos, crises e diabetes insípido", conferir: true, diretrizes: ["btf-4ed"],
          figuras: [{ arquivo: "figuras/escalonamento-pic.svg", legenda: "Esquema autoral: degraus do tratamento da pressão intracraniana no TCE grave." }],
          questoes: ["q-adap24-028","q-sirio2023-049","q-uspsp4-050","q-famema2025-032","q-fmabc2026-015","q-sirio2025-057"],
          prosa: `[[O **primeiro passo** diante da PIC elevada é otimizar **analgesia e sedação** (fentanil contínuo), porque a dor e a agitação elevam a PIC; vêm depois a **osmoterapia** (salina hipertônica em bólus), o bloqueio neuromuscular e a cirurgia; a hiperventilação com PaCO2 abaixo de 30 reduz o fluxo cerebral e causa isquemia.|q-sirio2023-049]] [[Na PIC **refratária** (32 a 38 mmHg por mais de uma hora) a todas as medidas e com a pressão arterial mantida, a diretriz recomenda **barbitúricos em dose alta (tiopental)**, com fentanil para analgesia, e não morfina nem mais propofol.|q-adap24-028]] [[No homem com tríade de Cushing (hipertensão, bradicardia, respiração irregular) após queda de 6 metros, a prova cobrou cabeceira elevada, **hiperventilação terapêutica breve**, **salina hipertônica**, sedação e ventilação mecânica.|q-uspsp4-050]]

[[O **manitol** é contraindicado na **hipotensão arterial** (osmótico e diurético, piora a perfusão); a **profilaxia anticonvulsivante** (fenitoína ou levetiracetam por 7 dias) é indicada no TCE grave (Glasgow 8 ou menos) e no **penetrante**, e não em todo sangramento intracraniano, na hemorragia subaracnóidea traumática isolada ou no subdural com Glasgow acima de 13.|q-famema2025-032,q-fmabc2026-015]] [[Depois do TCE, a criança com irritabilidade, convulsão, desidratação e **sódio de 163 mEq/L** tem **diabetes insípido central**, e a conduta prioritária é a **desmopressina**.|q-sirio2025-057]]`,
          texto: `- PIC elevada com midazolam, cabeceira a 30°, posição neutra: **fentanil contínuo** primeiro. {q-sirio2023-049}
- PIC de 32 a 38 mmHg refratária, PAM 90: **tiopental e fentanil**. {q-adap24-028}
- Tríade de Cushing após queda de 6 metros: cabeceira, **hiperventilação terapêutica**, **salina hipertônica**, sedação (a prova). {q-uspsp4-050}
- **Contraindicação do manitol**: **hipotensão arterial**. {q-famema2025-032}
- **Profilaxia de crises** no TCE grave (Glasgow 8 ou menos) e penetrante. {q-fmabc2026-015}
- Sódio de 163 após TCE na criança: **diabetes insípido**, **desmopressina**. {q-sirio2025-057}` },
        { id: "herniacao", titulo: "Síndrome de herniação: pupila, Cushing e conduta imediata", conferir: true, diretrizes: ["btf-4ed","atls"],
          questoes: ["q-adap23-097","q-usprp2021-077","q-famema2025-097","q-scmsp2023-056","q-tp20232-052","q-tp20241-052","q-tp20252-114"],
          prosa: `A massa ou o edema empurram o uncus para a incisura do tentório e comprimem o III par (**pupila dilatada e arreativa**) e o tronco (postura de extensão, **tríade de Cushing**: hipertensão, bradicardia e respiração irregular), com queda de dois pontos ou mais no Glasgow. [[As medidas imediatas são **cabeceira a 30°, osmoterapia (manitol ou salina hipertônica) e hiperventilação breve (PaCO2 de 30 a 35 mmHg)** como ponte até a cirurgia; a hiperventilação prolongada e profilática, o corticoide, o Trendelenburg e o nitroprussiato estão errados.|q-adap23-097,q-usprp2021-077,q-famema2025-097,q-scmsp2023-056]] [[Na criança de 4 anos com Glasgow 9, vômitos, FC 80, FR 12, PA 120/90 e anisocoria (**pré-herniação**), a prova cobrou **intubação em sequência rápida com hiperventilação**, e no menino de 7 anos com Glasgow caindo de 8 para 6 e midríase direita, também; e, até a drenagem do subdural, o **manitol em bólus**.|q-tp20252-114,q-tp20241-052,q-tp20232-052]]`,
          texto: `- Glasgow 6, pupila esquerda dilatada e extensão: **cabeceira a 30°, osmoterapia e hiperventilação breve** (30 a 35). {q-adap23-097}
- Glasgow 8T, anisocoria e midríase esquerda: **solução hiperosmolar** (além da cabeceira). {q-usprp2021-077}
- Herniação uncal sem neurocirurgião: **pCO2 entre 30 e 35 mmHg**. {q-famema2025-097}
- Criança de 4 anos com FC 50, PA 150 x 100 e FR regular: **manitol ou salina hipertônica** (Cushing). {q-scmsp2023-056}
- Criança de 7 anos, Glasgow 8, anisocoria, hipertensão e bradicardia: **manitol em bólus** até a cirurgia. {q-tp20232-052}
- Criança de 7 anos, Glasgow de 8 para 6, bradicardia e bradipneia: **intubação com hiperventilação imediata** (a prova). {q-tp20241-052}
- Criança de 4 anos com Glasgow 9, FC 80, FR 12 e anisocoria: **pré-herniação**, **intubação em sequência rápida e hiperventilação**. {q-tp20252-114}` },
      ],
    },
    {
      id: "medula", titulo: "Trauma raquimedular: Brown-Séquard",
      introducao: `[[A **hemissecção medular** causa a **síndrome de Brown-Séquard**: **déficit motor e perda de tato, vibração e propriocepção do mesmo lado da lesão** (vias corticoespinal e colunas posteriores) e **perda de dor e temperatura do lado oposto**, abaixo do nível, porque a via espinotalâmica cruza na medula.|q-tp20232-079,q-tp20241-078]]`,
      fragmentos: [
        { id: "brown-sequard", titulo: "Síndrome de Brown-Séquard e nível da lesão", conferir: true, diretrizes: ["atls"],
          questoes: ["q-tp20232-079","q-tp20241-078"],
          prosa: `[[A plegia do membro inferior direito com perda da vibração à direita até a margem costal e da dor e temperatura à esquerda a partir da cicatriz umbilical é **lesão direita**, e o nível da lesão fica **mais alto** que o da perda sensitiva contralateral (T10 no umbigo), o que leva ao pedículo **direito de T6**.|q-tp20241-078]] [[A perda motora e da sensibilidade profunda à direita, com a dor e a temperatura à esquerda, é de **hemimedula espinhal**, e não de hemisfério, região central da medula ou tronco.|q-tp20232-079]]`,
          texto: `- Perda do movimento, tato, vibração e propriocepção à direita e da dor e temperatura à esquerda: **hemimedula espinhal** (Brown-Séquard). {q-tp20232-079}
- Plegia direita, vibração perdida à direita e dor perdida à esquerda do umbigo para baixo: pedículo **direito de T6**. {q-tp20241-078}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-tp20232-052","q-tp20241-052","q-tp20252-114","q-uspsp4-050","q-uspsp4-098","q-uspsp3-038","q-adap24-028","q-sirio2023-049"],
          prosa: `[[Na herniação a regra é a **via aérea e a osmoterapia com a hiperventilação breve como ponte**; o Teste de Progresso 2023 cobrou **só o manitol em bólus**, e o de 2024 e o de 2025 cobraram a **intubação com hiperventilação**.|q-tp20232-052,q-tp20241-052,q-tp20252-114]] [[No resgate, a regra é **salina hipertônica ou manitol** e hiperventilação **breve**; o simulado USP-SP 2025 cobrou a **hiperventilação terapêutica** junto com a salina, e o Sírio 2023 cobrou o **fentanil** antes de qualquer osmoterapia, enquanto a questão autoral cobrou o **tiopental** na PIC refratária.|q-uspsp4-050,q-sirio2023-049,q-adap24-028]] [[A gravidade (leve, moderado, grave pelo Glasgow) é diferente do **risco** de lesão na tomografia: o simulado USP-SP 2025 classificou certo o leve como 13 a 15 e o moderado como 9 a 12 (ATLS), e deu o lactente de 15 meses com Glasgow 14 como **risco moderado**, que é a régua do PECARN e não a da gravidade.|q-uspsp4-098]] [[No subdural do lactente com suspeita de hemofilia, o ideal é o **fator deficiente**; a prova ofereceu o **complexo protrombínico** entre as opções.|q-uspsp3-038]]`,
          texto: `- Regra: herniação pede via aérea, osmoterapia e hiperventilação breve; a prova (TP 2023) cobrou **manitol em bólus** e a (TP 2024 e 2025), **intubação com hiperventilação**. {q-tp20232-052,q-tp20241-052,q-tp20252-114}
- Regra: tríade de Cushing recebe salina ou manitol e hiperventilação breve; a prova (USP-SP 2025) cobrou **hiperventilação terapêutica e salina hipertônica**. {q-uspsp4-050}
- Regra: degrau da PIC começa por analgesia e sedação; a prova (Sírio 2023) cobrou **fentanil** e a questão autoral cobrou **tiopental** na refratária. {q-sirio2023-049,q-adap24-028}
- Regra: gravidade pelo ATLS é leve 13 a 15 e moderado 9 a 12; risco (PECARN) é outra régua; a prova (USP-SP 2025) chamou Glasgow 14 de **risco moderado**. {q-uspsp4-098}
- Regra: hemofilia pede o fator deficiente; a prova (USP-SP 2025) ofereceu o **complexo protrombínico**. {q-uspsp3-038}` },
      ],
    },
  ],
});
