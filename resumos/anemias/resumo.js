/* resumos/anemias/resumo.js — resumo adaptativo de anemias: abordagem (reticulócitos e VCM),
   ferropriva no adulto e na criança (com profilaxia), doença crônica e renal, megaloblástica,
   hemolíticas (autoimune, G6PD, talassemia, microangiopática), transfusão e porfiria, e tabela
   comparativa no fim. Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- anemias */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "anemias",
  titulo: "Anemias",
  assunto: "ass-hemato-anemias",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "sbp-ferro", texto: "SBP — Diretriz nº 32: Deficiência de ferro e anemia ferropriva, atualização 2026 (sbp.com.br)", lidoEm: "2026-11-18" },
    { id: "kdigo-anemia", texto: "KDIGO 2026 — Anemia in chronic kidney disease (Kidney Int 2026;109), resumo executivo em kdigo.org", lidoEm: "2026-11-18" },
    { id: "bsg-ferro", texto: "British Society of Gastroenterology — Guidelines for the management of iron deficiency anaemia in adults (2021)", lidoEm: null },
    { id: "bsh-b12", texto: "BSH — Guidelines for the diagnosis and treatment of cobalamin and folate disorders (2014)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "abordagem", titulo: "Abordagem: reticulócitos e VCM",
      introducao: `[[A primeira pergunta é se a medula está respondendo: reticulócitos altos indicam perda ou destruição (sangramento agudo, hemólise); baixos indicam produção falha (ferro, B12, inflamação, rim, quimioterapia).|q-adap24-023,q-unifesp2024-033,q-usp2023-053,q-amrigs2025-009,q-usprp2026-095]] [[A segunda é o tamanho da hemácia: microcítica (ferro, talassemia, às vezes doença crônica), normocítica (doença crônica, renal, hemorragia aguda, hemólise) e macrocítica (B12, folato, álcool, drogas, hipotireoidismo, reticulocitose).|q-scmsp2021-002,q-sirio2021-004,q-tp20252-089]]

Veja também: **Puericultura** e **Prematuridade** (onde a profilaxia de ferro aparece no contexto da consulta) e **Síndromes glomerulares** (anemia da doença renal).`,
      fragmentos: [
        { id: "abo-classificar", titulo: "Classificar a anemia", conferir: true,
          figuras: [{ arquivo: "figuras/classificar.svg", legenda: "Esquema autoral: reticulócitos e VCM separam as causas de anemia." }],
          questoes: ["q-adap24-023","q-unifesp2024-033","q-usp2023-053","q-amrigs2025-009","q-usprp2026-095","q-scmsp2021-002","q-sirio2021-004","q-tp20252-089","q-fmabc2022-009","q-unesp2026-050"],
          prosa: `Classificar a anemia é procurar o mecanismo antes da causa: a medula responde (reticulócitos) ou não? E as hemácias saem pequenas, normais ou grandes? Cada combinação reduz a lista de causas a poucas, e só então se pede o exame específico. Quando outras linhagens também caem, o problema está na medula, e o mielograma entra.`,
          texto: `- Sangramento há 7 dias com reticulócitos 10%: **normocítica, hiper-regenerativa**. {q-adap24-023}
- Pós-quimioterapia: **normocítica, hiporregenerativa**. {q-unifesp2024-033}
- **Reticulócitos altos** indicam hemólise. {q-usp2023-053}
- Anemia com produção aumentada = reticulocitose; o índice de reticulócitos **corrige pelo grau** de anemia. {q-amrigs2025-009}
- Artrite inflamatória: **reticulócitos baixos**. {q-usprp2026-095}
- Hemogramas: hemólise (reticulócitos), doença crônica (ferritina alta), álcool (VCM alto), ferro (VCM baixo). {q-scmsp2021-002}
- Macrocítica: **anemia perniciosa, bariátrica, intestino curto**. {q-sirio2021-004}
- Normocítica sem sangramento: **creatinina, tireoide, inflamação**. {q-tp20252-089}
- Anemia com **plaquetopenia**: **mielograma**. {q-fmabc2022-009}
- Eritroblastos e formas jovens no sangue: **reação leucoeritroblástica**. {q-unesp2026-050}` },
      ],
    },
    {
      id: "ferropriva", titulo: "Anemia ferropriva",
      introducao: `[[O ferro some primeiro dos depósitos (ferritina baixa, o melhor exame), depois do transporte (saturação da transferrina abaixo de 16–20%, capacidade de ligação alta) e só então a hemácia sai pequena, pálida e de tamanhos variados (VCM baixo, RDW alto), muitas vezes com plaquetas altas.|q-unifesp2022-088,q-usprp2024-050,q-iamspe2025-075,q-amrigs2022-071,q-famema2022-095,q-tp20222-023]] [[No adulto, ferropenia é sangramento até prova em contrário: na mulher fértil, o fluxo menstrual; no homem e na mulher após a menopausa, o tubo digestivo, que se investiga com endoscopia e colonoscopia.|q-usprp2025-027,q-sessp2024-003,q-tp20231-015,q-usprp2025-071,q-einstein2023-073]]

[[Na criança, a falta de ferro vem da reserva pequena (prematuro, baixo peso), do crescimento rápido e da dieta (leite de vaca, pouca carne), e a profilaxia começa cedo; o tratamento é 3 a 6 mg/kg/dia de ferro elementar (SBP 2026) por 3 a 4 meses, e a resposta aparece em reticulócitos na primeira semana e em hemoglobina em 4 semanas.|q-tp20241-111,q-tp20251-039,q-tp20261-105,q-iamspe2026-080,q-scmsp2023-043,q-iamspe2026-079]]`,
      fragmentos: [
        { id: "fer-adulto", titulo: "Diagnóstico e causa no adulto", conferir: true, diretrizes: ["bsg-ferro"],
          questoes: ["q-unifesp2022-088","q-usprp2024-050","q-tp20222-023","q-usprp2025-027","q-sessp2024-003","q-tp20231-015","q-usprp2025-071","q-einstein2023-073","q-sessp2025-014","q-usp2024-041","q-uspsp5-016","q-einstein2025-015"],
          prosa: `O corpo recicla quase todo o ferro e perde pouco: no adulto, a ferropenia significa sangue saindo de algum lugar (menstruação, tubo digestivo) ou ferro que não entra (bariátrica, doença celíaca). Encontrar a anemia ferropriva é só metade do trabalho; a outra metade é achar o sangramento, que pode ser um câncer de cólon.`,
          texto: `- Multípara com saturação 6% e plaquetas altas: **ferropriva**. {q-unifesp2022-088}
- Anemia com trombocitose no idoso: **ferritina**. {q-usprp2024-050}
- Microcítica com anisocitose: **ferrodeficiência**. {q-tp20222-023}
- Mulher de 47 anos: perguntar o **fluxo menstrual**. {q-usprp2025-027}
- Idoso: **sangramento digestivo**. {q-sessp2024-003,q-tp20231-015,q-sessp2025-014}
- Idosa com ferropenia: **endoscopia**; com sangue oculto, **colonoscopia**. {q-usprp2025-071,q-einstein2023-073}
- Bariátrica: **ferro endovenoso** (não absorve oral). {q-usp2024-041}
- Ferropenia com DRC: **EDA e colonoscopia** e ferro EV. {q-uspsp5-016}
- Idosa hipertensa e diabética: **ferropriva**. {q-einstein2025-015}` },
        { id: "fer-crianca", titulo: "Criança: profilaxia, diagnóstico e tratamento", conferir: false, diretrizes: ["sbp-ferro"],
          questoes: ["q-iamspe2025-075","q-amrigs2022-071","q-famema2022-095","q-unesp2021-008","q-adap26-087","q-tp20231-052","q-tp20241-111","q-tp20251-039","q-tp20261-105","q-iamspe2026-080","q-scmsp2023-043","q-iamspe2026-079","q-usp2024-007","q-unesp2024-005","q-famerp2024-062","q-famerp2025-052","q-sirio2024-048"],
          prosa: `A SBP de 2026 não pede exames de rotina no lactente saudável; nos de risco, **hemograma, ferritina e PCR entre 9 e 12 meses** (a ferritina sobe na inflamação). A profilaxia do lactente a termo passou a dose fixa de **10 a 12,5 mg/dia** em dois ciclos de 3 meses (aos 6 e aos 12 meses), como no programa do Ministério. [[A queda da hemoglobina por volta dos 2 meses é a anemia fisiológica do lactente e não se trata.|q-usp2024-007]]`,
          texto: `- Esperado: **microcitose, hipocromia, RDW alto**, ferritina baixa. {q-iamspe2025-075,q-amrigs2022-071,q-famema2022-095,q-unesp2021-008}
- Tratamento: **3 a 6 mg/kg/dia** de ferro elementar (antes 3 a 5), **3–4 meses** ou até normalizar. {q-adap26-087,q-tp20231-052,q-tp20241-111,q-tp20251-039,q-tp20261-105}
- Resposta: **reticulócitos** e **+1 g/dL** de hemoglobina. {q-iamspe2026-080}
- RN de 2.300 g: **2 mg/kg/dia a partir de 30 dias**. {q-scmsp2023-043}
- RN < 1.000 g: **4 mg/kg/dia por 1 ano**, depois 1 mg/kg/dia. {q-iamspe2026-079}
- Lactente de 2 meses com Hb baixa: **acompanhar** (fisiológica). {q-usp2024-007}
- Investigar profilaxia e dieta; pedir **hemograma, ferro, ferritina**. {q-unesp2024-005}
- Lactente de risco: **hemograma, PCR e ferritina** entre 9 e 12 meses (as provas falam em 12 meses). {q-famerp2024-062,q-famerp2025-052}
- Criança com otite e microcitose: **ferropriva**. {q-sirio2024-048}` },
      ],
    },
    {
      id: "cronica", titulo: "Doença crônica e doença renal",
      introducao: `[[Na inflamação, a IL-6 faz o fígado produzir hepcidina, que tranca o ferro nos macrófagos e no enterócito: o ferro sérico e a capacidade de ligação caem, mas a ferritina fica normal ou alta.|q-famerp2026-052,q-udisc20262-036,q-fmabc2025-015,q-simepm89-053]] [[Na doença renal, falta eritropoetina: anemia normocítica, hiporregenerativa, com ferritina alta.|q-einstein2021-004]] Na criança com inflamação, a ferritina tem corte mais alto para falar em falta de ferro.`,
      fragmentos: [
        { id: "cro-diagnostico", titulo: "Hepcidina, ferritina e eritropoetina", conferir: false, diretrizes: ["kdigo-anemia"],
          questoes: ["q-famerp2026-052","q-udisc20262-036","q-fmabc2025-015","q-simepm89-053","q-einstein2021-004","q-sirio2027-043"],
          prosa: `Na anemia da inflamação o ferro existe, mas está preso: a hepcidina bloqueia a ferroportina do macrófago e do enterócito, e o ferro não chega à medula. Por isso o ferro sérico cai, mas a ferritina (o ferro guardado) fica normal ou alta, e o ferro oral pouco ajuda. Na doença renal falta eritropoetina.`,
          texto: `- Mecanismo: **aumento da hepcidina**. {q-famerp2026-052}
- Colite com ferritina 250: **inflamação**. {q-udisc20262-036}
- DIP crônica sem resposta ao ferro: **doença crônica**. {q-fmabc2025-015}
- Doença crônica: **ferritina normal ou alta**. {q-simepm89-053}
- Normocítica, reticulócitos 1%, ferritina 410: **nefropatia diabética**. {q-einstein2021-004}
- AIJ com ferritina 45: **doença crônica** (corte ajustado à inflamação). {q-sirio2027-043}` },
      ],
    },
    {
      id: "megaloblastica", titulo: "Anemia megaloblástica",
      introducao: `[[B12 e folato são necessários para fazer DNA: sem eles, o núcleo atrasa e a célula cresce — macrocitose, neutrófilos hipersegmentados, pancitopenia e hemólise intramedular (DHL e bilirrubina indireta altos).|q-unesp2022-052,q-tp20261-095,q-unesp2024-048,q-famema2022-040]] [[Só a falta de B12 lesa o nervo (degeneração combinada da medula: perda da vibração, parestesias, demência) e eleva o ácido metilmalônico; o folato baixo eleva só a homocisteína.|q-famema2022-040,q-unicampdis2024-008,q-unifesp2024-067,q-simepm89-053]]

[[A anemia perniciosa é autoimune (anti-fator intrínseco, gastrite atrófica) e se associa a outras autoimunes; também faltam B12 o vegetariano estrito, o operado de estômago e quem usa metformina ou inibidor de bomba por anos.|q-adap22-088,q-unesp2024-048,q-famerp2022-056,q-unifesp2024-067]]`,
      fragmentos: [
        { id: "meg-b12", titulo: "Causas, diagnóstico e tratamento", conferir: true, diretrizes: ["bsh-b12"],
          casos: ["q-tp20202-023","q-tp20231-019"],
          questoes: ["q-unesp2022-052","q-tp20261-095","q-unesp2024-048","q-famema2022-040","q-unicampdis2024-008","q-unifesp2024-067","q-adap22-088","q-famerp2022-056","q-usprp2022-066","q-tp20202-023","q-tp20231-019","q-sirio2025-012","q-famerp2023-071"],
          prosa: `Sem B12 ou folato a célula não sintetiza DNA, mas o citoplasma continua crescendo: as células da medula ficam grandes e morrem antes de sair (eritropoese ineficaz), o que explica DHL e bilirrubina indireta altos. A B12 também participa da mielina, e por isso só a sua falta dá a lesão da medula espinhal e dos nervos; dar folato a quem falta B12 melhora o sangue e deixa o nervo piorar.`,
          texto: `- Macrocitose com plaquetopenia: **megaloblastose**. {q-unesp2022-052}
- B12: **ácido metilmalônico alto**, DHL alto. {q-famema2022-040}
- Neuropatia com macrocitose: **degeneração combinada**, B12. {q-unicampdis2024-008,q-usprp2022-066}
- Metformina e omeprazol: **deficiência de B12**. {q-unifesp2024-067,q-famerp2022-056}
- Perniciosa: **anti-fator intrínseco e gastrite atrófica**. {q-unesp2024-048,q-tp20202-023}
- Tratamento: **B12 IM** em ataque e mensal por toda a vida. {q-adap22-088,q-tp20231-019,q-famerp2023-071}
- Criança com hipersegmentação: **hidroxicobalamina 1.000 mcg IM** dias alternados, depois semanal. {q-tp20261-095}
- Esfregaço macrocítico: **B12**. {q-sirio2025-012}` },
      ],
    },
    {
      id: "hemoliticas", titulo: "Anemias hemolíticas",
      introducao: `[[Hemólise é anemia com reticulócitos altos, bilirrubina indireta e DHL elevados e haptoglobina consumida; o VCM sobe um pouco pelos reticulócitos.|q-amrigs2024-086,q-scmsp2025-006,q-usprp2024-049]] [[O Coombs direto separa a autoimune (anticorpo IgG na hemácia, reação tipo II, esferócitos) das outras; drogas como a metildopa podem causá-la.|q-usprp2024-049,q-unesp2023-049,q-tp20231-033,q-unicampdis2022-009]]

[[Na deficiência de G6PD, ligada ao X, a hemácia não resiste a oxidantes (infecções, fava, primaquina, sulfas): corpúsculos de Heinz e células mordidas, Coombs negativo; por isso se pesquisa a G6PD antes de dar **primaquina** (que cura a malária vivax) ou dapsona, e se evitam oxidantes.|q-adap24-053,q-sessp2023-023,q-scmsp2026-049]] [[A talassemia faz hemácias pequenas com ferro normal e número de hemácias alto; a eletroforese mostra HbA2 elevada no traço beta.|q-adap21-025,q-unifesp2024-089,q-unifesp2026-087,q-usprp2024-002]]`,
      fragmentos: [
        { id: "hem-tipos", titulo: "Autoimune, G6PD, talassemia e microangiopática", conferir: true,
          questoes: ["q-amrigs2024-086","q-scmsp2025-006","q-usprp2024-049","q-unesp2023-049","q-tp20231-033","q-unicampdis2022-009","q-adap24-053","q-sessp2023-023","q-scmsp2026-049","q-adap21-025","q-unifesp2024-089","q-unifesp2026-087","q-usprp2024-002","q-usprp2021-025"],
          prosa: `Hemólise é hemácia destruída antes do tempo: sai hemoglobina, que vira bilirrubina indireta e consome a haptoglobina, e a medula responde com reticulócitos. A causa pode estar na própria hemácia (enzima, membrana, hemoglobina) ou fora dela (anticorpo, microangiopatia), e o Coombs direto separa a autoimune das outras.`,
          texto: `- Mais indicativo de hemólise: **bilirrubina indireta alta**. {q-amrigs2024-086}
- Hemólise: **VCM aumentado e haptoglobina reduzida**. {q-scmsp2025-006}
- Jovem com hemólise: **Coombs direto**. {q-usprp2024-049,q-unesp2023-049}
- Autoimune: **anticorpos antieritrócitos (tipo II)**. {q-tp20231-033}
- Coombs + após troca de anti-hipertensivo: **hemólise por droga** (metildopa). {q-unicampdis2022-009}
- Heinz, células mordidas, tio afetado: **G6PD**. {q-adap24-053,q-sessp2023-023}
- G6PD: cuidado com oxidantes, sobretudo a **primaquina** do tratamento da malária. {q-scmsp2026-049}
- Microcitose sem ferropenia: **eletroforese**, HbA2 alta, suspender ferro. {q-adap21-025,q-unifesp2026-087}
- Sem resposta ao ferro com ferritina normal: **talassemia minor**. {q-unifesp2024-089,q-usprp2024-002}
- Diarreia com sangue e esquizócitos: **microangiopática** (SHU). {q-usprp2021-025}` },
      ],
    },
    {
      id: "outros", titulo: "Transfusão e porfiria",
      introducao: `[[A transfusão tem complicações próprias: a sobrecarga circulatória (TACO) dá congestão pulmonar com hipertensão em quem tem coração ou rim frágil; o transplantado de medula recebe sangue leucorreduzido e irradiado, para evitar a doença do enxerto contra o hospedeiro transfusional.|q-sessp2026-017,q-uspsp4-013]] [[A porfiria aguda intermitente dá crises de dor abdominal intensa sem sinais peritoneais, com neuropatia e alterações psiquiátricas, desencadeadas por drogas e jejum.|q-amrigs2022-005]]`,
      fragmentos: [
        { id: "out-transfusao", titulo: "Reações transfusionais e porfiria", conferir: true,
          questoes: ["q-sessp2026-017","q-uspsp4-013","q-amrigs2022-005"],
          prosa: `A transfusão é um transplante de tecido: tem reações imunes (febre, hemólise, enxerto contra hospedeiro) e não imunes (sobrecarga de volume, infecções). Quem tem coração ou rim frágil recebe devagar e é vigiado para sobrecarga.`,
          texto: `- IC e congestão após transfusão: **TACO**. {q-sessp2026-017}
- Candidata a transplante de medula: bolsa **leucorreduzida e irradiada**. {q-uspsp4-013}
- Dor abdominal recorrente sem peritonite, precisando de opioide: **porfiria aguda**. {q-amrigs2022-005}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A tabela resume as anemias microcíticas.`,
      fragmentos: [
        { id: "comp-micro", titulo: "Ferropriva × doença crônica × talassemia", conferir: true,
          questoes: ["q-unifesp2022-088","q-famerp2026-052","q-adap21-025"],
          prosa: `| | Ferropriva | Doença crônica | Traço talassêmico |
|---|---|---|---|
| VCM | baixo | normal ou pouco baixo | **muito baixo** para a Hb |
| RDW | **alto** | normal | normal |
| Ferritina | **baixa** | **normal ou alta** | normal |
| Ferro sérico | baixo | baixo | normal |
| Capacidade de ligação | **alta** | **baixa** | normal |
| Hemácias | baixas | baixas | **normais ou altas** |
| Confirma | ferritina | contexto inflamatório | **eletroforese** (HbA2) |`,
          texto: `- Saturação baixa e plaquetas altas: **ferropriva**. {q-unifesp2022-088}
- Ferro e capacidade de ligação baixos: **doença crônica**. {q-famerp2026-052}
- Microcitose sem ferropenia: **talassemia**. {q-adap21-025}` },
      ],
    },
  ],
});
