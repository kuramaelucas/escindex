/* resumos/tumores-cutaneos/resumo.js — resumo adaptativo de tumores cutâneos (ass-derm-tumores):
   radiação ultravioleta e fatores de risco, fotossensibilidade por medicamento, ceratose actínica,
   biópsia de lesão que não cicatriza, carcinoma basocelular (aspecto, margem, Mohs, superficial),
   carcinoma espinocelular (aspecto, úlcera de Marjolin, tratamento), melanoma (critérios de suspeita,
   acral e ungueal, biópsia, Breslow, margem e linfonodo sentinela); armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- tumores-cutaneos */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "tumores-cutaneos",
  titulo: "Tumores cutâneos: carcinomas e melanoma",
  assunto: "ass-derm-tumores",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "nccn", texto: "NCCN — Basal Cell Skin Cancer, Squamous Cell Skin Cancer e Melanoma: Cutaneous (versões 2026)", lidoEm: null },
    { id: "inca-pele", texto: "INCA — câncer de pele melanoma e não melanoma (prevenção e detecção); SBD — consensos de carcinoma basocelular e melanoma", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "carcinomas", titulo: "Carcinomas da pele",
      introducao: `[[O câncer de pele é o mais comum no Brasil. A **radiação ultravioleta** do sol lesa o DNA dos queratinócitos; o dano se acumula ao longo da vida, por isso os carcinomas aparecem em **idosos de pele clara**, **trabalhadores rurais** e pescadores, nas **áreas expostas** (face, orelhas, dorso das mãos). O **carcinoma basocelular** é o mais frequente e quase nunca dá metástase; o **espinocelular** é mais agressivo e pode espalhar.|q-scmsp2021-015,q-tp20231-001,q-tp20251-007]]

Veja também: **Dermatoses inflamatórias e autoimunes**, **Infecções de pele**, **Protozooses** (leishmaniose tegumentar) e **Prevenção**.`,
      fragmentos: [
        { id: "car-fatores", titulo: "Sol, fotossensibilidade e ceratose actínica", conferir: true, diretrizes: ["inca-pele"],
          questoes: ["q-scmsp2021-015","q-unifesp2026-031","q-adap23-009"],
          prosa: `[[O principal agente é a **radiação ultravioleta**; o risco é maior com pele, olhos e cabelos claros, queimaduras na infância e exposição ocupacional. A prevenção vai além do filtro solar: sombra, roupas, chapéu e evitar o sol do meio do dia.|q-scmsp2021-015]] [[Alguns remédios tornam a pele **fotossensível** e aumentam o dano solar e o risco de câncer de pele, entre eles a **hidroclorotiazida**: em idosa de pele muito clara com lesões em áreas expostas, troca-se o diurético.|q-unifesp2026-031]] [[**Ceratoses actínicas** são placas **ásperas**, mais fáceis de sentir que de ver, em áreas de sol: lesões pré-malignas que indicam um **campo cancerizável**. Trata-se o campo (fluoruracila ou imiquimode tópicos), com fotoproteção e seguimento.|q-adap23-009]]`,
          texto: `- Causa principal: **radiação UV**; prevenção não é só filtro. {q-scmsp2021-015}
- **Hidroclorotiazida** fotossensibiliza: trocar. {q-unifesp2026-031}
- Placas ásperas em área de sol: **ceratose actínica** → tratar o campo. {q-adap23-009}` },
        { id: "car-biopsia", titulo: "Ferida que não cicatriza: biópsia", conferir: true,
          questoes: ["q-unesp2023-080","q-tp20231-075","q-einstein2024-061","q-unifesp2026-004"],
          prosa: `[[Lesão em área de sol que **cresce, sangra e não cicatriza** em semanas é câncer até prova em contrário: o passo é a **biópsia**, não antibiótico, pomada ou corticoide. Lesão pequena se retira inteira (**biópsia excisional com margem**), o que já diagnostica e trata; a grande ou em área nobre recebe biópsia incisional.|q-unesp2023-080,q-tp20231-075,q-einstein2024-061,q-unifesp2026-004]]`,
          texto: `- Ferida que não cicatriza em área de sol: **biópsia** (excisional se pequena). {q-unesp2023-080,q-tp20231-075,q-einstein2024-061,q-unifesp2026-004}` },
        { id: "car-cbc", titulo: "Carcinoma basocelular: como reconhecer", conferir: true,
          casos: ["q-unesp2021-051","q-tp20231-001"],
          questoes: ["q-unifesp2023-009","q-usprp2025-088","q-tp20231-001","q-unesp2021-051","q-unicampdis2023-004"],
          prosa: `[[O basocelular é uma **pápula ou nódulo perolado** (brilho de cera), com **telangiectasias** na superfície, que cresce devagar por anos e pode ulcerar no centro (bordas peroladas elevadas), na **face** (nariz, região malar e temporal).|q-unifesp2023-009,q-usprp2025-088,q-tp20231-001,q-unesp2021-051,q-unicampdis2023-004]]`,
          texto: `- **Perolado com telangiectasias**, crescimento lento, face: **CBC**. {q-unifesp2023-009,q-usprp2025-088,q-tp20231-001,q-unesp2021-051,q-unicampdis2023-004}` },
        { id: "car-cbc-tratamento", titulo: "Carcinoma basocelular: tratamento", conferir: true, diretrizes: ["nccn"],
          casos: ["q-uspsp5-050"],
          questoes: ["q-unifesp2023-009","q-usprp2025-088","q-adap21-086","q-adap26-031","q-uspsp5-050","q-usprp2022-033"],
          prosa: `[[O padrão é a **excisão com margem de 4 a 5 mm** e exame da peça. O **superficial**, pequeno e em tronco, também responde a **imiquimode** tópico.|q-unifesp2023-009,q-usprp2025-088,q-adap21-086,q-usprp2022-033]] [[Na **face** (nariz, pálpebra, orelha, lábio), em subtipo **infiltrativo** ou recidivado, prefere-se a **cirurgia micrográfica de Mohs**, que examina toda a margem e poupa tecido.|q-adap26-031,q-uspsp5-050]]`,
          texto: `- **Excisão com margem de 4–5 mm**; superficial: imiquimode é alternativa. {q-unifesp2023-009,q-usprp2025-088,q-adap21-086,q-usprp2022-033}
- Face, infiltrativo, recidiva: **Mohs**. {q-adap26-031,q-uspsp5-050}` },
        { id: "car-cec", titulo: "Carcinoma espinocelular", conferir: true, diretrizes: ["nccn"],
          casos: ["q-usprp2021-086","q-usprp2026-009"],
          questoes: ["q-usprp2021-086","q-tp20251-007","q-usp2024-045","q-usprp2024-031","q-usprp2026-009"],
          prosa: `[[O espinocelular nasce do **queratinócito** da camada espinhosa: **nódulo ou placa queratósica**, crostosa, que **ulcera e sangra**, cresce em meses e pode **doer**; aparece no dorso das mãos, punho, lábio inferior, orelha e face de quem trabalhou ao sol.|q-usprp2021-086,q-tp20251-007,q-usprp2024-031]] [[Também nasce em **cicatriz antiga** de queimadura ou em úlcera crônica (**úlcera de Marjolin**), onde é mais agressivo.|q-usprp2026-009]] [[O tratamento é a **ressecção com margem**, fechando com **retalho local** quando a ferida é grande; o estadiamento procura linfonodos regionais.|q-usp2024-045]]`,
          texto: `- Placa queratósica que ulcera e sangra em área de sol: **CEC** (queratinócito). {q-usprp2021-086,q-tp20251-007,q-usprp2024-031}
- Tumor em cicatriz de queimadura: **úlcera de Marjolin**. {q-usprp2026-009}
- **Ressecção + retalho local**. {q-usp2024-045}` },
      ],
    },
    {
      id: "melanoma", titulo: "Melanoma",
      introducao: `[[O melanoma nasce do **melanócito**. É menos comum que os carcinomas, mas responde pela maioria das mortes por câncer de pele, porque cresce para baixo e chega cedo aos vasos. O prognóstico depende sobretudo da **espessura** do tumor (índice de **Breslow**).|q-scmsp2021-015,q-adap26-004,q-sirio2027-089]]`,
      fragmentos: [
        { id: "mel-suspeita", titulo: "Lesão pigmentada suspeita", conferir: true, diretrizes: ["inca-pele"],
          figuras: [{ arquivo: "figuras/abcde.svg", legenda: "Esquema autoral: os critérios de suspeita de melanoma numa lesão pigmentada." }],
          casos: ["q-unesp2021-059"],
          questoes: ["q-sirio2027-089","q-usprp2023-062","q-unesp2021-059","q-usprp2023-093"],
          prosa: `[[Os critérios ABCDE apontam o melanoma: **assimetria**, **bordas irregulares**, **várias cores**, **diâmetro acima de 6 mm** e **evolução** (cresce, muda, sangra, coça). Lesão pigmentada assim pede **biópsia excisional com margem estreita** (1 a 3 mm), não crioterapia, corticoide ou margem ampla antes do diagnóstico.|q-sirio2027-089]] [[Na pele mais escura e nos orientais, o melanoma aparece nas **palmas, plantas e unhas** (**lentiginoso acral**): mancha escura que cresce no dedo, ou **faixa escura na unha** que se alarga e pigmenta a pele vizinha (melanoma ungueal), não explicada por trauma.|q-unesp2021-059,q-usprp2023-062]] [[Pápula **simétrica, de borda regular, cor homogênea** e crescimento lento é nevo benigno; se o paciente quer tirar, **exérese com margem de 2 mm e anatomopatológico**, sem linfonodo sentinela.|q-usprp2023-093]]`,
          texto: `- Assimetria, borda, cor, > 6 mm, evolução: **biópsia excisional com margem estreita**. {q-sirio2027-089}
- Mancha que cresce no dedo ou na unha: **melanoma acral/ungueal**. {q-unesp2021-059,q-usprp2023-062}
- Nevo de aspecto benigno: **exérese com 2 mm e anatomopatológico**. {q-usprp2023-093}` },
        { id: "mel-tratamento", titulo: "Breslow, margem e linfonodo sentinela", conferir: true, diretrizes: ["nccn"],
          questoes: ["q-adap26-004"],
          prosa: `[[Confirmado o melanoma, a **margem é ampliada** conforme o **Breslow**: até 1 mm, 1 cm; de 1 a 2 mm, **1 a 2 cm**; acima de 2 mm, 2 cm. A partir de cerca de **0,8 mm** (ou com ulceração), faz-se a **pesquisa do linfonodo sentinela**, que estadia sem esvaziar a axila às cegas.|q-adap26-004]]`,
          texto: `- Breslow 1,4 mm: **margem de 1–2 cm + linfonodo sentinela**. {q-adap26-004}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["nccn"],
          questoes: ["q-unifesp2026-004","q-einstein2024-061","q-tp20231-075","q-scmsp2021-015"],
          prosa: `[[**Excisional ou incisional?** Com lesão de 1,5 cm na asa nasal típica de basocelular, a unifesp2026-004 cobrou **biópsia excisional com margem de 0,5 cm**; a einstein2024-061, numa ferida antiga do nariz, só pediu **biópsia**. Lesão grande em área nobre pode ser incisional primeiro.|q-unifesp2026-004,q-einstein2024-061]] [[**Úlcera de borda elevada na face de trabalhadora rural** lembra leishmaniose, mas a idade, o tempo e a pele clara pedem **biópsia excisional**; anfotericina sem diagnóstico não.|q-tp20231-075]] [[**Melanoma mais frequente que carcinoma** é falso: ele é mais letal, mas bem menos comum.|q-scmsp2021-015]]`,
          texto: `- Asa nasal 1,5 cm: a prova cobrou **excisional com 0,5 cm**. {q-unifesp2026-004,q-einstein2024-061}
- Úlcera facial: **biópsia**, não tratamento empírico. {q-tp20231-075}
- Melanoma: **mais letal, menos comum**. {q-scmsp2021-015}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: os três cânceres de pele",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-pele", titulo: "Célula, aspecto, comportamento e tratamento", conferir: true,
          questoes: ["q-unesp2021-051","q-tp20251-007","q-sirio2027-089","q-adap26-004"],
          prosa: `[[A célula de origem explica o comportamento.|q-unesp2021-051,q-tp20251-007,q-sirio2027-089,q-adap26-004]]

| Tumor | Célula | Aspecto | Comportamento | Tratamento |
|---|---|---|---|---|
| Basocelular | célula basal | pápula perolada com telangiectasias | lento, local, quase sem metástase | excisão 4–5 mm; Mohs na face |
| Espinocelular | queratinócito | placa queratósica que ulcera e sangra | meses, pode dar metástase | ressecção com margem |
| Melanoma | melanócito | lesão pigmentada assimétrica que muda | metástase precoce; Breslow decide | biópsia excisional, ampliar pela espessura, sentinela |`,
          texto: `- CBC: **perolado, lento**. {q-unesp2021-051}
- CEC: **ulcera e sangra**. {q-tp20251-007}
- Melanoma: **Breslow**. {q-sirio2027-089,q-adap26-004}` },
      ],
    },
  ],
});
