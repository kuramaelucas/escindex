/* resumos/fios-e-cicatrizacao/resumo.js — resumo adaptativo de técnica operatória (ass-toce-fios): fases e
   fatores da cicatrização, tipos de fechamento e feridas, lesão por pressão, cicatriz hipertrófica e queloide,
   fios cirúrgicos, pontos e nós, enxertos e retalhos, armadilhas e tabela dos fios.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- fios-e-cicatrizacao */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "fios-e-cicatrizacao",
  titulo: "Cicatrização, fios e suturas",
  assunto: "ass-toce-fios",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "sabiston", texto: "Sabiston — Tratado de Cirurgia, 21ª ed. (2022): cicatrização de feridas, materiais de sutura e cirurgia plástica", lidoEm: null },
    { id: "npiap", texto: "NPIAP/EPUAP/PPPIA — Prevention and treatment of pressure ulcers/injuries: clinical practice guideline (2019)", lidoEm: null },
    { id: "esh-laparotomia", texto: "European Hernia Society — Guidelines on the closure of abdominal wall incisions (Muysoms et al., Hernia 2015)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição", questoes: ["q-scmsp2022-012","q-iamspe2025-028"] },
    { motivo: "Doença orificial (fissura, abscesso e fístula perianal), classificada neste assunto por engano; cabe num resumo de proctologia", questoes: ["q-adap23-090","q-unifesp2023-090","q-scmsp2021-022","q-scmsp2023-025"] },
  ],
  doencas: [
    {
      id: "cicatrizacao", titulo: "Cicatrização",
      introducao: `[[A ferida fecha em três fases que se sobrepõem. Na inflamatória (primeiros dias), o coágulo de plaquetas e fibrina estanca o sangue e solta sinais; os vasos ficam mais permeáveis; chegam neutrófilos e depois macrófagos, e o macrófago é a célula-chave: limpa a ferida e secreta citocinas e fatores de crescimento. Na proliferativa (do 4º dia a cerca de 3 semanas) acontecem angiogênese, fibroplasia (fibroblastos fazem colágeno, primeiro o tipo III) e epitelização, com contração pelos miofibroblastos. Na de remodelação (meses a 1 ano), o colágeno III é trocado pelo I, mais organizado e forte.|q-toce-25,q-unicamp2023-025,q-amrigs2022-021,q-unesp2022-066,q-fmabc2022-023,q-udisc20262-065,q-fmabc2024-026]] [[A força da cicatriz cresce devagar: cerca de 20% da pele original em 3 semanas, e nunca passa de 70 a 80%. É por isso que o tempo de retirar pontos e de voltar ao esforço depende da região e da tensão.|q-toce-26,q-usprp2024-023]]

Veja também: **Complicações cirúrgicas** (deiscência e infecção de sítio cirúrgico), **Infecções relacionadas à assistência à saúde** (classificação da ferida e profilaxia), **Hérnias** (fechamento da parede e telas), **Infecções de pele e partes moles** (pé diabético) e **Cuidados perioperatórios** (nutrição e tabagismo).`,
      fragmentos: [
        { id: "cic-fases", titulo: "Fases e força tênsil", conferir: true, diretrizes: ["sabiston"],
          figuras: [{ arquivo: "figuras/fases.svg", legenda: "Esquema autoral: fases da cicatrização no tempo e a força tênsil da cicatriz." }],
          questoes: ["q-toce-25","q-unicamp2023-025","q-amrigs2022-021","q-unesp2022-066","q-fmabc2022-023","q-tp20231-080","q-udisc20262-065","q-fmabc2024-026","q-amrigs2021-021","q-toce-26","q-usprp2024-023"],
          prosa: `[[A incisão suturada se cobre de epitélio em cerca de 24 a 48 horas: as células da borda migram até se tocarem (inibição por contato). A duração de cada fase muda com infecção, desnutrição e outros fatores.|q-amrigs2021-021,q-tp20231-080]]`,
          texto: `- Ordem: **inflamatória, proliferativa, remodelação**. {q-toce-25,q-unicamp2023-025}
- Errada: colágeno **tipo I na fase inflamatória** (primeiro vem o III). {q-amrigs2022-021}
- Maturação: **colágeno III substituído pelo I**. {q-unesp2022-066}
- Fase proliferativa: **angiogênese, fibroplasia e epitelização**. {q-fmabc2022-023}
- Duração das fases **varia** com infecção e desnutrição. {q-tp20231-080}
- Macrófago: **desbridamento, citocinas e fatores de crescimento**. {q-udisc20262-065}
- A ferida aguda precisa **passar pelas fases** para reparar de forma duradoura. {q-fmabc2024-026}
- Epitelização da incisão suturada: **1 dia**. {q-amrigs2021-021}
- Força tênsil: **20% em 3 semanas; 70 a 80% no fim**. {q-toce-26}
- Retirada de pontos conforme a **força tênsil**. {q-usprp2024-023}` },
        { id: "cic-fatores", titulo: "O que atrapalha a cicatrização", conferir: true,
          questoes: ["q-amrigs2022-022","q-famema2025-029","q-sessp2023-008","q-sirio2027-022","q-unesp2026-070"],
          prosa: `[[Cicatrizar gasta oxigênio, proteína e vitaminas: hipóxia (diabetes, tabagismo, doença vascular), infecção, desnutrição, deficiência de vitaminas A e C e de zinco, corticoide e quimioterapia atrasam a ferida. No diabético, o fator mais nocivo é a hipóxia tecidual, pela microangiopatia.|q-amrigs2022-022,q-famema2025-029,q-sirio2027-022]] [[A radiação lesa os pequenos vasos e deixa o tecido isquêmico e fibrosado para sempre; por isso a pele irradiada não serve para expansão tecidual e cicatriza mal.|q-sessp2023-008,q-unesp2026-070]]`,
          texto: `- Desnutrição, deficiência de vitaminas, drogas e infecção **atrapalham** (a prova excetuou a desnutrição). {q-amrigs2022-022}
- Diabético: **hipóxia tecidual**. {q-famema2025-029}
- Irradiação: **isquemia tecidual**. {q-sessp2023-008}
- Deiscência após mamoplastia com prótese: **infecção**. {q-sirio2027-022}
- Contraindica expansão tecidual: **irradiação prévia**. {q-unesp2026-070}` },
        { id: "cic-feridas", titulo: "Tipos de fechamento, feridas e lesão por pressão", conferir: true, diretrizes: ["npiap"],
          casos: ["q-tp20202-079","q-usp2026-038"],
          questoes: ["q-toce-27","q-tp20202-079","q-tp20212-066","q-iamspe2026-022","q-amrigs2021-030","q-usp2026-038","q-tp20252-096","q-usprp2025-084","q-sessp2025-021"],
          prosa: `[[Primeira intenção é a ferida limpa fechada logo; segunda intenção, a ferida deixada aberta que se enche de granulação e contrai; terceira intenção (fechamento primário tardio), a ferida contaminada deixada aberta alguns dias e suturada quando a granulação está limpa. Deiscência com granulação vermelha e sem secreção está cicatrizando por segunda intenção e só pede curativo.|q-toce-27,q-tp20202-079,q-tp20212-066]] [[O curativo oclusivo mantém a ferida úmida, com pH levemente ácido e pouco oxigênio na superfície, o que acelera a epitelização.|q-iamspe2026-022]] [[O agente define o ferimento: objeto cortante dá ferida incisa; objeto rombo com força (pedra), cortocontusa. No ferimento descolante oculto (desenluvamento fechado), a pele separada do plano profundo morre e o hematoma se acumula: resseca-se a pele inviável e usa-se pressão negativa.|q-amrigs2021-030,q-usp2026-038]] [[A lesão por pressão é isquemia da pele e do subcutâneo esmagados contra o osso; aparece em 24 horas a 5 dias. A de grau 4 com tecido morto pede desbridamento cirúrgico, alívio da pressão (decúbito ventral), pressão negativa e retalho local; tratar só com limpeza é a afirmação errada. Com granulação limpa e exsudato, a espuma de poliuretano é a cobertura.|q-usprp2025-084,q-sessp2025-021,q-tp20252-096]]`,
          texto: `- Ferida contaminada suturada no 5º dia: **terceira intenção**. {q-toce-27}
- Deiscência granulando sem infecção: **segunda intenção, só curativo**. {q-tp20202-079,q-tp20212-066}
- Curativo oclusivo: **pH levemente ácido e baixa tensão de O2**. {q-iamspe2026-022}
- Pedra: **cortocontuso**. {q-amrigs2021-030}
- Escara descolada com hematoma: **ferimento descolante oculto; ressecção e pressão negativa**. {q-usp2026-038}
- Lesão por pressão granulando: **espuma de poliuretano**. {q-tp20252-096}
- Grau 4 sacral: **decúbito ventral, desbridamento, pressão negativa e retalho**. {q-usprp2025-084}
- Falso: lesão por pressão tem tratamento **só clínico**. {q-sessp2025-021}` },
        { id: "cic-anormal", titulo: "Cicatriz hipertrófica e queloide", conferir: true,
          questoes: ["q-adap23-088","q-tp20251-072","q-fmabc2026-024"],
          prosa: `[[A cicatriz hipertrófica fica elevada mas dentro da incisão e melhora com o tempo; tem colágeno III organizado. O queloide cresce além dos limites da ferida, é mais comum em pele negra e em lóbulo de orelha, e tem colágeno I e III desorganizados. Ambos se tratam com compressão e corticoide intralesional (triancinolona); a exérese isolada do queloide recidiva, e por isso vem associada a corticoide ou radiação.|q-adap23-088,q-tp20251-072,q-fmabc2026-024]]`,
          texto: `- Queloide de lóbulo: **triancinolona intralesional**. {q-adap23-088}
- Elevada dentro da incisão: **hipertrófica; compressão e corticoide**. {q-tp20251-072}
- Hipertrófica: **colágeno III organizado**; queloide: **I e III desorganizados**. {q-fmabc2026-024}` },
      ],
    },
    {
      id: "fios", titulo: "Fios e técnica de sutura",
      introducao: `[[O fio se escolhe por três propriedades. Absorção: os absorvíveis são degradados (os sintéticos por hidrólise, pouco reativos; o categute, de origem animal, por proteólise, muito reativo) e servem para tecido que cicatriza rápido; os inabsorvíveis ficam (náilon, polipropileno, poliéster, seda, algodão). Estrutura: o monofilamentar desliza e não abriga bactéria; o multifilamentar (trançado) dá bom nó, mas seus espaços escondem bactérias das defesas. Calibre: quanto mais zeros, mais fino.|q-toce-06,q-toce-07,q-toce-08,q-toce-10,q-iamspe2023-019]]`,
      fragmentos: [
        { id: "fio-escolha", titulo: "Os fios e onde usar", conferir: true, diretrizes: ["esh-laparotomia"],
          casos: ["q-unicampdis2025-067"],
          questoes: ["q-toce-06","q-toce-07","q-toce-08","q-toce-10","q-iamspe2023-019","q-unesp2024-066","q-famerp2024-026","q-fmabc2025-037","q-usp2023-022","q-tp20222-062","q-tp20202-062","q-toce-09","q-unicampdis2025-067"],
          prosa: `[[A poliglactina 910 (Vicryl) é absorvível, sintética e trançada, e perde a força em 3 a 4 semanas: serve para planos profundos, subcutâneo, útero e cúpula vaginal. O poliglecaprone (Monocryl) é absorvível monofilamentar, pouco reativo, com força perdida em cerca de 3 semanas (bom para intradérmica). A polidioxanona (PDS) é monofilamentar de absorção lenta. Náilon e polipropileno são inabsorvíveis monofilamentares, pouco reativos: pele, ferida contaminada ou infectada e vasos.|q-toce-10,q-unesp2024-066,q-famerp2024-026,q-fmabc2025-037,q-usp2023-022,q-tp20222-062,q-toce-06,q-tp20202-062]] [[A seda vem do casulo do bicho-da-seda (*Bombyx mori*); o categute, do intestino de carneiro ou boi.|q-iamspe2023-019]] [[A aponeurose da laparotomia fecha-se com sutura contínua, fio de absorção lenta ou inabsorvível, pontos pequenos e próximos e comprimento de fio de cerca de 4 vezes o da ferida: assim a tensão se distribui e a hérnia incisional diminui.|q-toce-09]] [[Agulha cortante (ponta triangular, traumática) atravessa pele; a cilíndrica (atraumática) afasta as fibras e serve para víscera e vaso.|q-unicampdis2025-067]]`,
          texto: `- Pele: **náilon** (monofilamentar, inabsorvível, pouco reativo). {q-toce-06}
- Trançado infecta mais: **bactérias nos interstícios**. {q-toce-07}
- Mais zeros, **mais fino**. {q-toce-08}
- Poliglactina: **absorvível, sintética, multifilamentar**, 3 a 4 semanas. {q-toce-10,q-unesp2024-066,q-famerp2024-026}
- Seda: ***Bombyx mori***. {q-iamspe2023-019}
- Poliglecaprone: **monofilamentar absorvível**, pouco reativo. {q-fmabc2025-037}
- Cúpula vaginal: **poliglactina**. {q-usp2023-022}
- Subcutâneo do obeso: **poliglactina, pontos simples**. {q-tp20222-062}
- Ferida infectada: **náilon**. {q-tp20202-062}
- Aponeurose: **contínua, absorção lenta, relação fio:ferida 4:1**. {q-toce-09}
- Agulha da figura: **traumática (triangular)**. {q-unicampdis2025-067}` },
        { id: "fio-pontos", titulo: "Pontos e nós", conferir: true,
          casos: ["q-tp20232-059"],
          questoes: ["q-iamspe2023-024","q-famema2022-069","q-tp20232-059","q-tp20241-059","q-tp20261-013","q-fmabc2024-022","q-sessp2024-034","q-sessp2025-027"],
          prosa: `[[O ponto de Donati (vertical em U, longe-longe-perto-perto) everte as bordas e aguenta tensão; reconhece-se pelos dois pares de furos alinhados perpendiculares à incisão. Na víscera, a sutura de Lembert é seromuscular e invaginante (a de Connell é total e invaginante), e a de Halsted (colchoeiro) é preferida em tecido friável.|q-tp20232-059,q-tp20241-059,q-tp20261-013,q-iamspe2023-024,q-famema2022-069]] [[O nó de cirurgião (primeira laçada dupla) segura sob tensão grande.|q-fmabc2024-022]] [[Na face, ferida limpa recente fecha-se no pronto-socorro com pontos simples separados de fio inabsorvível fino (náilon 5-0 ou 6-0) na pele, perto da borda, e absorvível (Monocryl 4-0) nos planos profundos.|q-sessp2024-034,q-sessp2025-027]]`,
          texto: `- Lembert: **invaginante**. {q-iamspe2023-024}
- Halsted: **tecidos inflamados e friáveis**. {q-famema2022-069}
- Ponto da figura: **Donati**. {q-tp20232-059,q-tp20241-059,q-tp20261-013}
- Nó de cirurgião: **tensão tecidual grande**. {q-fmabc2024-022}
- Ferida na face: **pontos simples, mononáilon 5-0**. {q-sessp2024-034}
- Pele da face: **mononáilon 5-0 ou 6-0**. {q-sessp2025-027}` },
      ],
    },
    {
      id: "reconstrucao", titulo: "Enxertos e retalhos",
      introducao: `[[O enxerto é pele sem vasos próprios: sobrevive bebendo do leito (embebição nos primeiros dias, depois os vasos crescem para dentro dele). Por isso só pega em leito vascularizado (músculo, granulação, gordura bem perfundida), nunca em osso sem periósteo, tendão sem paratendão ou cartilagem exposta. O retalho leva o próprio suprimento de sangue e cobre o que o enxerto não consegue.|q-unifesp2025-008,q-adap25-008,q-unifesp2023-088]]`,
      fragmentos: [
        { id: "rec-escolha", titulo: "Escolha da cobertura", conferir: true,
          casos: ["q-usp2022-080","q-usprp2022-025"],
          questoes: ["q-unifesp2023-088","q-unifesp2025-008","q-scmsp2021-030","q-usp2022-080","q-usprp2022-025","q-adap25-008","q-einstein2026-018","q-udisc20262-075"],
          prosa: `[[A escada da reconstrução vai do mais simples ao mais complexo: fechamento primário, segunda intenção, enxerto, retalho local, retalho à distância e microcirúrgico. Área grande com músculo e gordura expostos, sem osso: enxerto de pele parcial. Osso, tendão ou polpa digital expostos: retalho (V-Y na ponta do dedo, retalho muscular na tíbia, retalho miocutâneo no esterno infectado depois do preparo com pressão negativa, transposição no couro cabeludo).|q-unifesp2025-008,q-unifesp2023-088,q-einstein2026-018,q-adap25-008,q-usprp2022-025,q-usp2022-080]] [[O retalho ao acaso vive do plexo subdérmico e por isso tem limite de comprimento; o axial leva uma artéria nomeada. O grande dorsal pode servir como cobertura ou como músculo funcional.|q-scmsp2021-030,q-udisc20262-075]]`,
          texto: `- Ponta do polegar com osso exposto: **retalho local**. {q-unifesp2023-088}
- Grande área sem estruturas nobres: **enxerto de pele parcial**. {q-unifesp2025-008}
- Retalho ao acaso: **plexo subdérmico**. {q-scmsp2021-030}
- Defeito no couro cabeludo do idoso: **retalho de transposição**. {q-usp2022-080}
- Esterno infectado após pressão negativa: **retalho miocutâneo**. {q-usprp2022-025}
- Tíbia com osso sem periósteo: **retalho muscular com enxerto**. {q-adap25-008}
- Polpa digital sem osso exposto (a prova): **retalho V-Y**. {q-einstein2026-018}
- Grande dorsal: **cobertura ou músculo funcional**. {q-udisc20262-075}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-amrigs2022-022","q-einstein2026-018","q-amrigs2021-021","q-iamspe2023-019"],
          prosa: `[[**Desnutrição**: atrapalha a cicatrização (falta proteína para o colágeno); a amrigs2022-022 a deu como exceção entre os fatores negativos.|q-amrigs2022-022]] [[**Polpa digital sem exposição óssea**: o defeito pequeno de polpa costuma cicatrizar bem por segunda intenção, e o retalho V-Y é indicado sobretudo quando há osso exposto; a einstein2026-018 deu o V-Y sem osso exposto.|q-einstein2026-018]] [[**Epitelização**: ocorre em 24 a 48 horas; a amrigs2021-021 cobrou "1 dia".|q-amrigs2021-021]] [[**Origem dos fios**: o categute vem do intestino de carneiro ou boi, não de gato (o nome engana); a seda, do *Bombyx mori*.|q-iamspe2023-019]]`,
          texto: `- Desnutrição **prejudica**; a prova a excetuou. {q-amrigs2022-022}
- Polpa sem osso: segunda intenção é opção; a prova deu **V-Y**. {q-einstein2026-018}
- Epitelização: 24 a 48 h; a prova cobrou **1 dia**. {q-amrigs2021-021}
- Categute **não** vem de gato. {q-iamspe2023-019}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: os fios",
      introducao: `Resumo do capítulo de fios, para comparar os que as provas trocam entre si.`,
      fragmentos: [
        { id: "cmp-fios", titulo: "Absorção, estrutura e uso", conferir: true,
          questoes: ["q-toce-06","q-toce-10","q-fmabc2025-037","q-iamspe2023-019","q-famerp2024-026"],
          prosa: `[[Absorção, estrutura e reatividade definem o uso.|q-toce-06,q-toce-10,q-fmabc2025-037,q-iamspe2023-019,q-famerp2024-026]]

| Fio | Absorção | Estrutura | Uso típico |
|---|---|---|---|
| Categute | absorvível, animal (proteólise, reativo) | torcido | pouco usado hoje |
| Poliglactina 910 (Vicryl) | absorvível, sintético, 3 a 4 semanas | trançado | subcutâneo, útero, cúpula vaginal |
| Poliglecaprone (Monocryl) | absorvível, sintético, cerca de 3 semanas | monofilamentar | intradérmica, planos profundos da face |
| Polidioxanona (PDS) | absorvível lento | monofilamentar | aponeurose |
| Náilon | inabsorvível | monofilamentar | pele, ferida infectada |
| Polipropileno | inabsorvível | monofilamentar | vasos, aponeurose, telas |
| Seda e algodão | inabsorvíveis, naturais | trançados | ligaduras |`,
          texto: `- Pele: **náilon**. {q-toce-06}
- Vicryl: **absorvível trançado**. {q-toce-10,q-famerp2024-026}
- Monocryl: **absorvível monofilamentar**. {q-fmabc2025-037}
- Seda: **natural**. {q-iamspe2023-019}` },
      ],
    },
  ],
});
