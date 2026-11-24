/* resumos/emergencias-ambientais/resumo.js — resumo adaptativo de emergências ambientais
   (ass-emerg-ambientais): serpentes (botrópico, crotálico, elapídico, laquético, conduta e soro),
   escorpião (quadro, gravidade, soro, edema pulmonar), aranha-marrom, afogamento (graus, conduta,
   prevenção) e hipotermia; armadilhas e tabela dos acidentes ofídicos. Dono do tema "animais
   peçonhentos" (o resumo de intoxicações traz só a síntese).
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- emergencias-ambientais */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "emergencias-ambientais",
  titulo: "Emergências ambientais: peçonhentos, afogamento e hipotermia",
  assunto: "ass-emerg-ambientais",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "ms-peconhentos", texto: "Ministério da Saúde — Guia de animais peçonhentos do Brasil (2024) e Manual de diagnóstico e tratamento de acidentes por animais peçonhentos", lidoEm: "2026-11-19" },
    { id: "sobrasa-afogamento", texto: "SOBRASA/Szpilman — classificação e tratamento do afogamento; AHA 2025 (circunstâncias especiais: afogamento e hipotermia)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "serpentes", titulo: "Acidentes por serpentes",
      introducao: `[[Cada gênero de serpente tem um veneno com ações diferentes, e é pelas ações que se reconhece o acidente quando ninguém viu a cobra. **Jararaca** (botrópico, cerca de 9 em cada 10 acidentes): veneno **proteolítico, coagulante e hemorrágico**, com muita lesão local. **Cascavel** (crotálico): **neurotóxico e miotóxico**, com pouca lesão local. **Coral verdadeira** (elapídico): **neurotóxico** puro.|q-famema2023-023,q-famema2023-097,q-fmabc2023-007,q-unesp2024-099]]

Veja também: **Intoxicações** (síntese dos peçonhentos), **Vigilância em saúde** (notificação), **Emergências respiratórias e PCR na criança** e **Ventilação mecânica**.`,
      fragmentos: [
        { id: "ser-botropico", titulo: "Botrópico (jararaca)", conferir: true, diretrizes: ["ms-peconhentos"],
          questoes: ["q-amrigs2020-080","q-famema2023-023","q-famema2023-097","q-fmabc2023-007","q-uspsp3-076"],
          prosa: `[[A ação **proteolítica** dá **dor imediata e intensa**, **edema** que sobe pelo membro em horas, equimose, bolhas e necrose; a ação **coagulante** consome fibrinogênio e deixa o sangue **incoagulável** (tempo de coagulação alterado), com sangramento.|q-amrigs2020-080,q-famema2023-023,q-famema2023-097,q-fmabc2023-007]] [[As complicações locais são **abscesso, necrose e síndrome compartimental**; a sistêmica mais grave é a lesão renal aguda.|q-uspsp3-076]]`,
          texto: `- Dor intensa + edema que progride + sangramento: **botrópico** (proteolítico, coagulante, hemorrágico). {q-amrigs2020-080,q-famema2023-023,q-famema2023-097,q-fmabc2023-007}
- Complicações: **abscesso, necrose, compartimental**. {q-uspsp3-076}` },
        { id: "ser-crotalico", titulo: "Crotálico (cascavel)", conferir: true, diretrizes: ["ms-peconhentos"],
          questoes: ["q-unesp2024-099","q-famema2021-091","q-unicampdis2024-027"],
          prosa: `[[Quase **sem dor nem edema** no local (às vezes só parestesia). A ação **neurotóxica** dá **ptose palpebral, oftalmoplegia e visão turva** (fácies miastênica); a **miotóxica** destrói músculo: **mialgia** e **urina escura** (mioglobinúria), que leva à **lesão renal aguda**.|q-unesp2024-099,q-famema2021-091,q-unicampdis2024-027]]`,
          texto: `- Pouca dor local + **ptose** + **urina escura**: **crotálico**. {q-unesp2024-099,q-famema2021-091,q-unicampdis2024-027}` },
        { id: "ser-elapidico", titulo: "Elapídico (coral)", conferir: true, diretrizes: ["ms-peconhentos"],
          questoes: ["q-einstein2021-023","q-tp20202-059"],
          prosa: `[[A coral verdadeira tem **anéis coloridos** e **não tem fosseta loreal**. O veneno é **neurotóxico** (bloqueia a junção neuromuscular): ptose, paralisia que desce e **insuficiência respiratória**.|q-einstein2021-023]] [[O veneno elapídico **não altera a coagulação**: tempo de protrombina ou fibrinogênio alterados **excluem** acidente por coral.|q-tp20202-059]]`,
          texto: `- Anéis coloridos, sem fosseta: **coral, neurotóxica**. {q-einstein2021-023}
- Coagulação alterada **exclui elapídico**. {q-tp20202-059}` },
        { id: "ser-conduta", titulo: "Conduta e soro", conferir: true, diretrizes: ["ms-peconhentos"],
          casos: ["q-sessp2025-046"],
          questoes: ["q-sessp2025-046","q-famerp2024-003","q-famerp2025-044"],
          prosa: `[[Nada de **torniquete**, incisão, sucção ou produtos no local: pioram a necrose. O membro fica em repouso e o paciente vai **o quanto antes** ao serviço que tem o **soro específico**, aplicado **por via venosa** e em dose conforme a **gravidade** (não o peso), com **notificação** do acidente.|q-sessp2025-046,q-famerp2024-003,q-famerp2025-044]] [[No botrópico, o soro antibotrópico tem doses crescentes: **leve 3 ampolas**, **moderado 6**, grave 12; a UBS sem soro encaminha **imediatamente** ao ponto estratégico.|q-famerp2025-044,q-famerp2024-003]]`,
          texto: `- **Sem torniquete**; soro **venoso** precoce, dose pela **gravidade**; notificar. {q-sessp2025-046,q-famerp2024-003,q-famerp2025-044}
- Botrópico: **leve 3, moderado 6** ampolas. {q-famerp2025-044,q-famerp2024-003}` },
      ],
    },
    {
      id: "escorpiao", titulo: "Acidente escorpiônico",
      introducao: `[[O veneno do escorpião amarelo (*Tityus serrulatus*) abre canais de sódio das terminações nervosas e descarrega **catecolaminas e acetilcolina**. No adulto, quase sempre só dor local; na **criança pequena** (e no idoso), a descarga autonômica pode causar **vômitos repetidos, sudorese, agitação, taquicardia e hipertensão** e, no extremo, **miocardite com choque e edema pulmonar**.|q-fmabc2022-003,q-unicamp2023-045,q-tp20212-044]]`,
      fragmentos: [
        { id: "esc-quadro", titulo: "Quadro e complicações", conferir: true, diretrizes: ["ms-peconhentos"],
          questoes: ["q-unicamp2023-045","q-tp20212-044","q-fmabc2022-003","q-usprp2027-041","q-sessp2026-045"],
          prosa: `[[Lactente com **choro intenso, sudorese fria, vômitos e taquicardia** de início súbito, sem febre, sugere **escorpião** mesmo sem a picada vista; os casos graves e as mortes concentram-se **abaixo dos 10 anos**.|q-unicamp2023-045,q-fmabc2022-003,q-tp20212-044]] [[O que mata é o coração e o pulmão: com **dispneia, sonolência e vômitos**, procura-se **insuficiência respiratória por edema pulmonar** (oximetria, gasometria, radiografia), que no ultrassom aparece como **linhas B** bilaterais.|q-sessp2026-045,q-usprp2027-041]]`,
          texto: `- Criança com vômitos, sudorese, taquicardia súbitos: **escorpião**; grave < 10 anos. {q-unicamp2023-045,q-fmabc2022-003,q-tp20212-044}
- Grave: **edema pulmonar** (linhas B no ultrassom). {q-sessp2026-045,q-usprp2027-041}` },
        { id: "esc-conduta", titulo: "Gravidade e soro", conferir: true, diretrizes: ["ms-peconhentos"],
          questoes: ["q-tp20222-060","q-tp20231-043","q-tp20251-054","q-tp20261-088"],
          prosa: `[[**Leve**: só dor local, tratada com analgesia (inclusive anestésico local) e observação de 6 horas. **Moderado**: dor intensa com manifestações sistêmicas isoladas (sudorese, vômitos ocasionais, taquicardia, agitação): **soro antiescorpiônico**. **Grave**: vômitos profusos, sonolência, choque ou edema pulmonar: soro em dose maior e terapia intensiva.|q-tp20231-043,q-tp20222-060]] [[Criança com vômitos profusos e dispneia vai para a **sala de emergência**: monitorização, ECG, oxigênio, analgesia, antieméticos e **soro sem esperar exame**.|q-tp20251-054,q-tp20261-088,q-tp20222-060]]`,
          texto: `- Leve: **analgesia e observação**; moderado e grave: **soro antiescorpiônico**. {q-tp20231-043,q-tp20222-060}
- Grave: **sala de emergência, soro já**, monitorização. {q-tp20251-054,q-tp20261-088}` },
      ],
    },
    {
      id: "aranhas", titulo: "Aranha-marrom",
      introducao: `[[A *Loxosceles* vive dentro de casa (atrás de móveis, em roupas guardadas). A picada quase não dói, mas o veneno (esfingomielinase D) lesa o endotélio e a pele morre nas horas seguintes.|q-unicampdis2022-005]]`,
      fragmentos: [
        { id: "ara-loxosceles", titulo: "Placa marmórea", conferir: true, diretrizes: ["ms-peconhentos"],
          questoes: ["q-unicampdis2022-005"],
          prosa: `[[Picada **pouco dolorosa** ao vestir uma roupa guardada; em 8 a 12 horas, dor em queimação e **placa marmórea** (áreas pálidas e violáceas) que evolui para **necrose**. Pode haver forma cutâneo-visceral com **hemólise** e lesão renal. Agente: **aranha-marrom**.|q-unicampdis2022-005]]`,
          texto: `- Picada pouco dolorosa em roupa guardada → placa marmórea: **aranha-marrom**. {q-unicampdis2022-005}` },
      ],
    },
    {
      id: "afogamento", titulo: "Afogamento e hipotermia",
      introducao: `[[No afogamento, a água aspirada lava o surfactante e inunda alvéolos: o problema central é a **hipoxemia**. Por isso a classificação acompanha o pulmão (tosse, estertores, edema pulmonar) e a circulação, e o tratamento começa por **ventilar e oxigenar**.|q-famema2023-024,q-fmabc2022-007,q-fmabc2023-003]]`,
      fragmentos: [
        { id: "afo-graus", titulo: "Graus e conduta", conferir: true, diretrizes: ["sobrasa-afogamento"],
          figuras: [{ arquivo: "figuras/afogamento-graus.svg", legenda: "Esquema autoral: graus do afogamento e a conduta de cada um." }],
          questoes: ["q-famema2023-024","q-fmabc2022-007","q-fmabc2023-003"],
          prosa: `[[**Grau 1**: tosse com ausculta normal (pode ser liberado). **Grau 2**: estertores em alguns campos (O2 em baixo fluxo). **Grau 3**: **edema pulmonar** com pressão normal. **Grau 4**: edema pulmonar **com hipotensão**. **Grau 5**: parada respiratória com pulso. **Grau 6**: parada cardiorrespiratória. **Do grau 2 ao 6, hospitalizar.**|q-fmabc2022-007,q-fmabc2023-003]] [[Consciente com **estertores difusos** e pressão normal é edema pulmonar (grau 3): **UTI**, **oxigênio em alto fluxo** (ventilação se não bastar) e expansão volêmica se precisar. **pH < 7,1** na chegada indica pior prognóstico.|q-famema2023-024,q-fmabc2023-003]]`,
          texto: `- **Graus 2–6 internam**; grau 3 = edema pulmonar sem hipotensão. {q-fmabc2022-007,q-fmabc2023-003}
- Estertores difusos: **UTI, O2 alto fluxo**; pH < 7,1 = pior prognóstico. {q-famema2023-024,q-fmabc2023-003}` },
        { id: "afo-prevencao", titulo: "Prevenção na criança", conferir: true,
          questoes: ["q-einstein2027-042"],
          prosa: `[[A criança pequena se afoga em segundos e em silêncio. A medida que mais reduz o afogamento em **piscina de casa** é a **cerca isolando a piscina, com portão de fechamento automático**; supervisão e aula de natação ajudam, mas falham.|q-einstein2027-042]]`,
          texto: `- Piscina em casa: **cerca com portão automático**. {q-einstein2027-042}` },
        { id: "afo-hipotermia", titulo: "Hipotermia", conferir: true, diretrizes: ["sobrasa-afogamento"],
          questoes: ["q-famema2025-100","q-uspsp4-109"],
          prosa: `[[Na hipotermia **leve** (grau 1, consciente e tremendo), o aquecimento é **passivo**: ambiente aquecido, cobertores e **retirada da roupa molhada**. Nas mais graves, aquecimento **ativo** (fluidos venosos aquecidos a cerca de 40 °C, ar aquecido) e, na parada, circulação extracorpórea.|q-famema2025-100,q-uspsp4-109]] [[A criança em parada com 29 °C recebe **reanimação completa**, com **roupas molhadas retiradas e fluidos aquecidos**; ninguém é declarado morto antes de aquecido.|q-uspsp4-109]]`,
          texto: `- Leve: **aquecimento passivo**, tirar roupa molhada. {q-famema2025-100}
- Grave/parada: **fluidos aquecidos**, reanimar até aquecer. {q-uspsp4-109}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["ms-peconhentos"],
          questoes: ["q-tp20231-043","q-sessp2025-046","q-fmabc2022-003","q-tp20212-044"],
          prosa: `[[**Ampolas no escorpiônico moderado**: o manual do Ministério indica 2 a 3 ampolas; a tp20231-043 deu **1 a 2**. O que se cobra com certeza é que o moderado **recebe soro** e o leve, não.|q-tp20231-043]] [[**Torniquete e soro no local**: são contraindicados; o soro é **venoso**.|q-sessp2025-046]] [[**Notificação**: todo acidente por animal peçonhento é de notificação compulsória, mas semanal, não nas primeiras 24 horas.|q-fmabc2022-003]] [[**Picada dolorosa e sinais autonômicos à noite, perto de trilhos**: é escorpião, não serpente nem lagarta.|q-tp20212-044]]`,
          texto: `- Moderado: a prova cobrou **1–2 ampolas**; o essencial é **dar soro**. {q-tp20231-043}
- **Sem torniquete**; soro venoso. {q-sessp2025-046}
- Notificação **semanal**. {q-fmabc2022-003}
- Dor intensa + sinais autonômicos: **escorpião**. {q-tp20212-044}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: acidentes por serpentes",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-serpentes", titulo: "Veneno, local, sistêmico e soro", conferir: true,
          questoes: ["q-amrigs2020-080","q-unesp2024-099","q-einstein2021-023","q-tp20202-059"],
          prosa: `[[Dor local e coagulação separam os acidentes.|q-amrigs2020-080,q-unesp2024-099,q-einstein2021-023,q-tp20202-059]]

| Acidente | Ações do veneno | Local | Sistêmico | Coagulação |
|---|---|---|---|---|
| Botrópico (jararaca) | proteolítica, coagulante, hemorrágica | dor, edema, bolhas, necrose | sangramento, lesão renal | alterada |
| Crotálico (cascavel) | neurotóxica, miotóxica, coagulante | pouca dor, parestesia | ptose, mialgia, urina escura, lesão renal | pode alterar |
| Elapídico (coral) | neurotóxica | quase nada | ptose, paralisia, insuficiência respiratória | normal |
| Laquético (surucucu) | como o botrópico + vagal | dor, edema | bradicardia, diarreia, hipotensão | alterada |`,
          texto: `- Botrópico: **dor e edema**. {q-amrigs2020-080}
- Crotálico: **ptose, urina escura**. {q-unesp2024-099}
- Elapídico: **neurotóxico, coagulação normal**. {q-einstein2021-023,q-tp20202-059}` },
      ],
    },
  ],
});
