/* resumos/infeccoes-de-pele/resumo.js — resumo adaptativo de infecções e infestações da pele: bacterianas (impetigo,
   pele escaldada, erisipela, dermatite atópica infectada), virais (herpes, zóster, molusco, mpox), micoses superficiais,
   micoses profundas (esporotricose, paracoccidioidomicose, nocardiose), leishmaniose tegumentar, hanseníase,
   escabiose e larva migrans, armadilhas e tabela das micoses. Molde: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- infeccoes-de-pele */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "infeccoes-de-pele",
  titulo: "Infecções e infestações da pele",
  assunto: "ass-derm-infeccoes",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "idsa-pele", texto: "IDSA — Practice guidelines for the diagnosis and management of skin and soft tissue infections (2014)", lidoEm: null },
    { id: "pcdt-hanseniase", texto: "Ministério da Saúde — PCDT de Hanseníase (Portaria SCTIE/MS nº 67/2022, gov.br/conitec) e Guia prático sobre a hanseníase", lidoEm: "2026-11-19" },
    { id: "ms-leishmaniose", texto: "Ministério da Saúde — Manual de vigilância da leishmaniose tegumentar (2017)", lidoEm: null },
    { id: "consenso-pcm", texto: "II Consenso Brasileiro de Paracoccidioidomicose (2017)", lidoEm: null },
    { id: "ms-escabiose", texto: "Ministério da Saúde/SBD — orientações de tratamento da escabiose e da larva migrans", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "bacterianas", titulo: "Infecções bacterianas",
      introducao: `[[A pele íntegra resiste às bactérias; elas entram por uma porta (picada, fissura, micose interdigital, eczema). O *Staphylococcus aureus* invade a epiderme superficial e produz toxinas esfoliativas que clivam a desmogleína 1: no impetigo bolhoso a toxina age no local; na síndrome da pele escaldada ela circula e descola a pele à distância.|q-usp2023-098,q-einstein2027-032,q-tp20252-063]] [[A erisipela é infecção da derme superficial e dos linfáticos, quase sempre pelo *Streptococcus pyogenes*: placa vermelha, quente, de borda nítida e elevada, com febre alta e calafrios, linfangite e adenite; a porta de entrada típica é a micose entre os dedos.|q-unicampdis2025-069]]

[[A pele da dermatite atópica tem barreira defeituosa e pouca defesa antimicrobiana: o *S. aureus* coloniza e infecta (crostas melicéricas, pústulas), e o herpes simples pode se espalhar sobre o eczema (eczema herpético), com vesículas agrupadas que viram erosões em saca-bocado.|q-usprp2025-064,q-tp20232-022,q-tp20261-056,q-tp20241-016,q-tp20222-026]]

Veja também: **Doenças exantemáticas na infância** (varicela, escarlatina), **Infecções sexualmente transmissíveis** (herpes genital, molusco e mpox na região genital), **Tuberculose** (forma cutânea) e **Puericultura** (dermatite das fraldas).`,
      fragmentos: [
        { id: "bac-impetigo", titulo: "Impetigo, pele escaldada e erisipela", conferir: true, diretrizes: ["idsa-pele"],
          casos: ["q-usp2023-098"],
          questoes: ["q-usp2023-098","q-einstein2027-032","q-tp20252-063","q-unicampdis2025-069","q-sessp2022-086"],
          prosa: `[[Impetigo localizado e pouco extenso trata-se com antibiótico tópico (mupirocina); o extenso, com bolhas numerosas ou em paciente frágil, com antibiótico sistêmico antiestafilocócico (cefalexina).|q-einstein2027-032,q-tp20252-063]] [[O cisto epidérmico é um nódulo com ponto central escuro e conteúdo caseoso fétido, não infeccioso de origem: retira-se na própria UBS, com a cápsula, para não recidivar.|q-sessp2022-086]]`,
          texto: `- Lactente com bolhas que rompem: *S. aureus*, o mesmo da **pele escaldada**. {q-usp2023-098}
- Impetigo pouco extenso: **mupirocina**. {q-einstein2027-032}
- Bolhas purulentas em idosa diabética internada: **antibiótico sistêmico**. {q-tp20252-063}
- Erisipela com micose interdigital: ***Streptococcus pyogenes***. {q-unicampdis2025-069}
- Nódulo com ponto central e material caseoso: **cisto epidérmico**, exérese na UBS. {q-sessp2022-086}` },
        { id: "bac-atopica", titulo: "Dermatite atópica infectada", conferir: true,
          casos: ["q-usprp2025-064"],
          questoes: ["q-usprp2025-064","q-tp20232-022","q-tp20261-056","q-tp20241-016"],
          prosa: `[[Piora do eczema com crostas amareladas e pústulas é infecção pelo *S. aureus* e pede cefalexina oral; o corticoide sozinho não resolve.|q-tp20232-022,q-tp20261-056,q-tp20241-016]]`,
          texto: `- Lesões novas e crostosas no atópico: ***S. aureus***. {q-usprp2025-064}
- Eczema infectado: **cefalexina**. {q-tp20232-022,q-tp20261-056,q-tp20241-016}` },
      ],
    },
    {
      id: "virais", titulo: "Infecções virais",
      introducao: `[[O vírus varicela-zóster fica latente no gânglio sensitivo depois da varicela; quando a imunidade celular cai (idade, imunossupressão), ele desce pelo nervo e dá dor e vesículas agrupadas sobre base eritematosa num dermátomo, sem cruzar a linha média.|q-einstein2022-002,q-unifesp2024-082,q-unesp2025-049]] [[O herpes simples também é latente e recorre no mesmo lugar (lábio, glúteo, genital), com ardor antes das vesículas.|q-usp2025-082,q-unesp2023-058]]

[[O molusco contagioso é um poxvírus que forma pápulas peroladas, firmes e umbilicadas, comuns na criança e que somem sozinhas em meses.|q-usp2025-064,q-sessp2026-042,q-unicamp2023-039]] [[O mpox, outro poxvírus, dá lesões que evoluem juntas de pápula a pústula umbilicada, com febre e linfonodo; confirma-se por PCR da lesão.|q-uspsp2-008]]`,
      fragmentos: [
        { id: "vir-zoster", titulo: "Herpes-zóster e herpes simples", conferir: true,
          casos: ["q-unesp2025-049","q-usp2025-082"],
          questoes: ["q-einstein2022-002","q-unifesp2024-082","q-unesp2025-049","q-adap24-050","q-unicampdis2022-008","q-usp2025-082","q-unesp2023-058","q-tp20222-026"],
          prosa: `[[Zóster em adulto jovem, sobretudo extenso ou no trigêmeo, sugere imunodepressão: pede-se sorologia para HIV.|q-unifesp2024-082]] [[No imunossuprimido (transplantado) o zóster pode disseminar, e o aciclovir é venoso, 10 mg/kg a cada 8 horas.|q-unesp2025-049]] [[Na síndrome de Ramsay Hunt o vírus acomete o gânglio geniculado: vesículas na orelha e no conduto, otalgia e paralisia facial; ao aciclovir associa-se corticoide para proteger o nervo.|q-adap24-050,q-unicampdis2022-008]] [[O citodiagnóstico de Tzanck mostra células gigantes multinucleadas, mas não separa herpes simples de zóster.|q-unesp2023-058]] [[No eczema herpético, o tratamento é aciclovir sistêmico.|q-tp20222-026]]`,
          texto: `- Vesículas dolorosas num dermátomo: **herpes-zóster**. {q-einstein2022-002}
- Zóster em jovem: **sorologia para HIV**. {q-unifesp2024-082}
- Transplantado: **aciclovir EV 10 mg/kg 8/8 h**. {q-unesp2025-049}
- Ramsay Hunt: aciclovir **+ corticoide oral**. {q-adap24-050,q-unicampdis2022-008}
- Recorrência no mesmo lugar: **herpes simples**, aciclovir. {q-usp2025-082}
- Vesículas no glúteo: herpes, **Tzanck**. {q-unesp2023-058}
- Eczema com vesículas e crostas na face: **aciclovir**. {q-tp20222-026}` },
        { id: "vir-pox", titulo: "Molusco contagioso e mpox", conferir: true,
          casos: ["q-unicamp2023-039"],
          questoes: ["q-usp2025-064","q-sessp2026-042","q-unicamp2023-039","q-uspsp2-008"],
          texto: `- Pápulas umbilicadas em criança: **molusco**, acompanhar. {q-usp2025-064,q-sessp2026-042}
- Agente do molusco: **poxvírus**. {q-unicamp2023-039}
- Mpox: **PCR** da lesão. {q-uspsp2-008}` },
      ],
    },
    {
      id: "micoses-superficiais", titulo: "Micoses superficiais",
      introducao: `[[Os dermatófitos digerem queratina e vivem só na camada córnea, no pelo e na unha: crescem para fora e fazem placas anulares com borda descamativa ativa e centro mais claro; o exame direto com KOH mostra hifas septadas e artrosporadas.|q-usp2022-009,q-simepm89-086,q-usprp2022-071]] [[O tratamento acompanha o lugar: na pele, antifúngico tópico; no couro cabeludo e na unha o tópico não penetra, e o tratamento é oral (griseofulvina ou terbinafina por 6 a 8 semanas na tinha do couro cabeludo; terbinafina por 12 semanas na unha do pé).|q-adap21-102,q-usp2025-060,q-uspsp5-092,q-unicampdis2022-052,q-unicampdis2025-093]]

[[A *Candida* prefere calor e umidade (dobras, fralda, mucosa, prótese dentária, diabetes): placa vermelho-viva, úmida, com lesões satélites, e pseudo-hifas e leveduras no exame direto.|q-usp2024-061,q-usp2024-062,q-usprp2026-085,q-tp20231-113,q-famerp2026-038,q-usp2026-062,q-uspsp2-016]] [[A *Malassezia*, levedura da pele normal, cresce na oleosidade e faz a pitiríase versicolor: manchas hipo ou hipercrômicas com descamação fina no tronco, e hifas curtas com esporos no exame direto.|q-unesp2025-016,q-unicampdis2025-024]]`,
      fragmentos: [
        { id: "mic-dermatofitos", titulo: "Dermatofitoses: pele, couro cabeludo e unha", conferir: true,
          casos: ["q-usp2022-009","q-usp2025-060"],
          questoes: ["q-usp2022-009","q-adap21-102","q-unicampdis2022-052","q-unicampdis2025-093","q-simepm89-086","q-usprp2022-071","q-usp2025-060","q-uspsp5-092"],
          prosa: `[[Corticoide tópico sobre dermatofitose apaga a inflamação e deixa o fungo crescer (tinha incógnita); a associação de antifúngico com corticoide não é o tratamento.|q-simepm89-086]] [[A tinha do couro cabeludo da criança vem de cães e gatos e de ambiente úmido e escuro, com placa de alopecia e cabelos quebrados.|q-unicampdis2022-052,q-unicampdis2025-093,q-adap21-102]]`,
          texto: `- Virilha com hifas artrosporadas: **tinha crural**. {q-usp2022-009}
- Lesão anular: diagnóstico **clínico, confirmado por micológico**. {q-simepm89-086}
- Exame direto da tinha do corpo: **hifas septadas**. {q-usprp2022-071}
- Tinha do couro cabeludo: **griseofulvina ou terbinafina oral 6–8 semanas**. {q-adap21-102,q-unicampdis2022-052,q-unicampdis2025-093}
- Onicomicose: **terbinafina 250 mg/dia por 12 semanas**. {q-usp2025-060,q-uspsp5-092}` },
        { id: "mic-candida", titulo: "Candidíase e pitiríase versicolor", conferir: true,
          casos: ["q-usp2024-061","q-unesp2025-016"],
          questoes: ["q-usp2024-061","q-usp2024-062","q-usprp2026-085","q-tp20231-113","q-famerp2026-038","q-usp2026-062","q-uspsp2-016","q-unesp2025-016","q-unicampdis2025-024"],
          prosa: `[[Na dermatite da fralda, a irritante poupa as dobras; a candidíase as acomete, tem pústulas satélites e se trata com nistatina tópica; quando a mãe tem dor nos mamilos, trata-se a mama junto.|q-tp20231-113,q-famerp2026-038,q-usp2026-062]] [[Queilite angular no idoso com prótese é candidíase: exame micológico direto e cultura.|q-uspsp2-016]] [[Os diferenciais da candidíase das dobras são intertrigo, dermatite seborreica e eritrasma.|q-usp2024-062]]`,
          texto: `- Placa suprapúbica com pseudo-hifas: **candidose**. {q-usp2024-061}
- Diferenciais: **intertrigo e dermatite seborreica**. {q-usp2024-062}
- Diabética com placa inguinal: **pseudo-hifas no KOH**. {q-usprp2026-085}
- Fralda com satélites e dobras acometidas: ***Candida***, **nistatina**. {q-tp20231-113,q-famerp2026-038}
- Fralda e mamilo doloroso: **antifúngico no períneo e na mama**. {q-usp2026-062}
- Queilite angular com prótese: **micológico direto**. {q-uspsp2-016}
- Manchas descamativas no tronco: ***Malassezia***; exame direto com **hifas curtas e esporos**. {q-unesp2025-016,q-unicampdis2025-024}` },
      ],
    },
    {
      id: "micoses-profundas", titulo: "Micoses profundas e infecções granulomatosas",
      introducao: `[[O *Sporothrix* vive em plantas e, no Brasil, sobretudo no gato doente: entra por arranhadura ou espinho e sobe pelos linfáticos, deixando nódulos que ulceram em fila (forma linfocutânea); trata-se com itraconazol, e o gato doente é tratado, não abandonado.|q-unifesp2023-018,q-scmsp2021-016,q-usprp2021-102,q-tp20222-015]] [[A *Nocardia brasiliensis* também entra por trauma com vegetal e dá nódulos e abscessos; a tuberculose cutânea por inoculação (verrucosa) aparece em quem se fere com material de paciente bacilífero.|q-unifesp2024-026,q-adap24-017]]

[[O *Paracoccidioides* é inalado no trabalho rural com terra (café, por exemplo), sobretudo por homens fumantes: a forma crônica do adulto acomete pulmão e mucosa oral (estomatite moriforme, pontilhado hemorrágico); a forma juvenil acomete linfonodos, fígado e baço, com febre, anemia e eosinofilia. No exame direto, leveduras grandes de parede dupla com brotamentos múltiplos ("roda de leme").|q-usprp2022-067,q-tp20251-011,q-famerp2025-012,q-unesp2024-098,q-unicampdis2023-027,q-usprp2026-092]]`,
      fragmentos: [
        { id: "pro-esporotricose", titulo: "Esporotricose, nocardiose e tuberculose cutânea", conferir: true,
          casos: ["q-usprp2021-102"],
          questoes: ["q-unifesp2023-018","q-scmsp2021-016","q-usprp2021-102","q-tp20222-015","q-unifesp2024-026","q-adap24-017"],
          texto: `- Arranhadura de gato e nódulos em fila: **esporotricose**. {q-unifesp2023-018,q-tp20222-015}
- Esporotricose: **itraconazol**; o gato é tratado. {q-usprp2021-102,q-scmsp2021-016}
- Graveto e nódulos na mão: ***Nocardia brasiliensis***. {q-unifesp2024-026}
- Corte em necropsia, placa verrucosa: ***M. tuberculosis***. {q-adap24-017}` },
        { id: "pro-paracoco", titulo: "Paracoccidioidomicose", conferir: true, diretrizes: ["consenso-pcm"],
          casos: ["q-tp20251-011"],
          questoes: ["q-usprp2022-067","q-tp20251-011","q-famerp2025-012","q-unesp2024-098","q-unicampdis2023-027","q-usprp2026-092"],
          prosa: `[[Como a porta é o pulmão, toda lesão oral de paracoccidioidomicose pede radiografia de tórax; o tratamento é itraconazol por meses (sulfametoxazol-trimetoprim é alternativa).|q-unesp2024-098,q-usprp2026-092]]`,
          texto: `- Lavrador com tosse e úlcera oral: **paracoccidioidomicose**. {q-famerp2025-012,q-tp20251-011}
- Exame direto: **leveduras com brotamentos múltiplos**. {q-usprp2022-067}
- Lesão de lábio: **radiografia de tórax obrigatória**. {q-unesp2024-098}
- Criança com linfonodos e eosinofilia: **forma juvenil**. {q-unicampdis2023-027}
- Tratamento: **itraconazol**. {q-usprp2026-092}` },
      ],
    },
    {
      id: "leishmaniose", titulo: "Leishmaniose tegumentar",
      introducao: `[[A *Leishmania* é inoculada pelo flebotomíneo em área rural e de mata e se multiplica no macrófago: no ponto da picada forma-se uma úlcera indolor de borda elevada (em moldura) e fundo granuloso. A *L. braziliensis*, principal agente no Brasil, pode alcançar as mucosas do nariz e da boca anos depois, por via hematogênica, e destruir o septo.|q-scmsp2021-018,q-unesp2023-098,q-usprp2022-062]] [[O diagnóstico junta a epidemiologia, a úlcera, o parasita (amastigotas no macrófago à biópsia) e a intradermorreação de Montenegro, que mostra a resposta celular.|q-usprp2024-044]]`,
      fragmentos: [
        { id: "lei-quadro", titulo: "Úlcera cutânea e forma mucosa", conferir: true, diretrizes: ["ms-leishmaniose"],
          casos: ["q-usprp2024-044"],
          questoes: ["q-scmsp2021-018","q-unesp2023-098","q-usprp2022-062","q-usprp2024-044"],
          prosa: `[[O tratamento de primeira linha é o antimoniato de meglumina; a forma cutânea difusa (*L. amazonensis*, anergia) responde mal a ele.|q-scmsp2021-018]]`,
          texto: `- Úlcera antiga cicatrizada e lesão nasal: **leishmaniose mucosa**. {q-unesp2023-098}
- Agente principal: ***L. braziliensis***. {q-scmsp2021-018}
- Lesão crônica de língua em lavrador: **leishmaniose mucosa** entre os diferenciais. {q-usprp2022-062}
- Amastigotas na biópsia: **Montenegro**. {q-usprp2024-044}` },
      ],
    },
    {
      id: "hanseniase", titulo: "Hanseníase",
      introducao: `[[O *Mycobacterium leprae* tem tropismo por nervo periférico e pele fria: lesões com perda de sensibilidade térmica, dolorosa e tátil e espessamento de nervos (ulnar, fibular). Mais de 5 lesões ou nervo acometido classificam como multibacilar.|q-adap23-018]] [[As reações são inflamação imune durante o tratamento: a tipo 1 (celular) inflama lesões e nervos antigos; a tipo 2 (eritema nodoso hansênico, imunocomplexos) é do multibacilar, com nódulos dolorosos, febre e mal-estar, e não é falha nem efeito colateral.|q-tp20231-002]]`,
      fragmentos: [
        { id: "han-tratamento", titulo: "Classificação, tratamento e reações", conferir: false, diretrizes: ["pcdt-hanseniase"],
          questoes: ["q-adap23-018","q-tp20231-002"],
          prosa: `[[Desde 2021, o PCDT usa a poliquimioterapia única (rifampicina, dapsona e clofazimina) para todos: 6 doses no paucibacilar e 12 no multibacilar.|q-adap23-018]]`,
          texto: `- Multibacilar: **rifampicina, dapsona e clofazimina, 12 doses**. {q-adap23-018}
- Nódulos dolorosos e febre durante o tratamento: **reação tipo 2**. {q-tp20231-002}` },
      ],
    },
    {
      id: "parasitoses", titulo: "Escabiose e larva migrans",
      introducao: `[[O *Sarcoptes scabiei* cava túneis na camada córnea, e a reação imune aos ovos e fezes do ácaro dá prurido intenso, pior à noite, em quem convive junto: entre os dedos, punhos, umbigo e genitais; no lactente, acomete palmas, plantas e couro cabeludo.|q-adap22-078,q-amrigs2020-064,q-tp20212-028,q-unicampdis2022-034,q-fmabc2021-085]] [[A larva do ancilóstomo de cão e gato penetra na pele (praia, areia) mas não consegue atravessar a derme humana: anda sob a pele traçando um trilho serpiginoso e muito pruriginoso, restrito à pele.|q-unifesp2022-078,q-scmsp2025-051,q-usprp2023-060]]`,
      fragmentos: [
        { id: "par-escabiose", titulo: "Tratar a escabiose", conferir: true, diretrizes: ["ms-escabiose"],
          questoes: ["q-adap22-078","q-amrigs2020-064","q-iamspe2025-068","q-tp20212-028","q-fmabc2021-085","q-unicampdis2022-034"],
          prosa: `[[Permetrina a 5% do pescoço para baixo, repetida em 7 dias, e todos os contactantes tratados ao mesmo tempo, com roupas lavadas; ivermectina oral é alternativa a partir de 15 kg. Abaixo de 2 meses (e em gestantes) usa-se enxofre precipitado em vaselina.|q-adap22-078,q-tp20212-028,q-iamspe2025-068,q-fmabc2021-085]] [[O prurido pode durar semanas depois da cura, por reação aos restos do ácaro: não é falha.|q-amrigs2020-064]]`,
          texto: `- Família toda com prurido noturno: **permetrina 5%**, repetir em 7 dias, tratar contactantes. {q-adap22-078}
- Alternativa oral: **ivermectina**. {q-tp20212-028}
- Lactente pequeno: **enxofre precipitado**. {q-iamspe2025-068,q-fmabc2021-085}
- Lactente irritado com pápulas em palmas: **escabiose**. {q-unicampdis2022-034}
- Prurido que persiste não é falha; lactente tem **palmas e plantas**. {q-amrigs2020-064}` },
        { id: "par-larva", titulo: "Larva migrans cutânea", conferir: true, diretrizes: ["ms-escabiose"],
          questoes: ["q-unifesp2022-078","q-scmsp2025-051","q-usprp2023-060"],
          prosa: `[[O tratamento é albendazol oral ou tiabendazol tópico; a infestação fica na pele.|q-scmsp2025-051,q-usprp2023-060]]`,
          texto: `- Trilho serpiginoso no pé: **ancilostomíase cutânea**. {q-unifesp2022-078}
- Restrita à pele: **albendazol**. {q-scmsp2025-051,q-usprp2023-060}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Nas parasitoses e na boca, as provas variam a concentração do remédio e a hipótese mais provável.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-fmabc2021-085","q-iamspe2025-068","q-usprp2022-062"],
          prosa: `[[O enxofre precipitado para lactente aparece a 5–10% nos manuais; uma prova cobrou 6% e outra 10%.|q-fmabc2021-085,q-iamspe2025-068]] [[Lesão crônica de língua em lavrador etilista tem como diferenciais carcinoma espinocelular, paracoccidioidomicose e leishmaniose mucosa; a prova escolheu a leishmaniose pela imagem.|q-usprp2022-062]]`,
          texto: `- Enxofre no lactente: **5–10%**; provas pediram **6%** e **10%**. {q-fmabc2021-085,q-iamspe2025-068}
- Lesão de língua: a prova quis **leishmaniose mucosa**. {q-usprp2022-062}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `As micoses que a prova manda separar, resumidas pelos capítulos acima.`,
      fragmentos: [
        { id: "comp-micoses", titulo: "Micoses: lesão, exame direto e tratamento", conferir: true,
          figuras: [{ arquivo: "figuras/exame-direto.svg", legenda: "Esquema autoral: o que o exame direto mostra em cada micose." }],
          questoes: ["q-usp2022-009","q-usp2024-061","q-unesp2025-016","q-usprp2022-067"],
          prosa: `| Micose | Lesão | Exame direto | Tratamento |
| --- | --- | --- | --- |
| Dermatofitose | placa anular, borda ativa | hifas septadas artrosporadas | tópico; oral no couro cabeludo e na unha |
| Candidíase | placa vermelho-viva, úmida, satélites | pseudo-hifas e leveduras | nistatina ou azol tópico |
| Pitiríase versicolor | manchas com descamação fina no tronco | hifas curtas e esporos | azol tópico |
| Paracoccidioidomicose | úlcera oral, pulmão | leveduras com brotamentos múltiplos | itraconazol |

[[O exame direto separa as micoses pela forma do fungo, e cada forma tem seu tratamento.|q-usp2022-009,q-usp2024-061,q-unesp2025-016,q-usprp2022-067]]`,
          texto: `- Hifas artrosporadas: **dermatófito**. {q-usp2022-009}
- Pseudo-hifas: ***Candida***. {q-usp2024-061}
- Hifas curtas e esporos: ***Malassezia***. {q-unesp2025-016}
- Brotamentos múltiplos: ***Paracoccidioides***. {q-usprp2022-067}` },
      ],
    },
  ],
});
