/* resumos/avc/resumo.js — resumo adaptativo de acidente vascular cerebral (ass-neuro-avc): mecanismo, topografia
   e síndromes vasculares, atendimento agudo e trombólise, trombectomia e janela, prevenção secundária (AIT,
   carótida, fibrilação atrial, forame oval), hemorragia intraparenquimatosa, hemorragia subaracnoide, PRES,
   armadilhas e tabela dos subtipos. Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- avc */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "avc",
  titulo: "Acidente vascular cerebral",
  assunto: "ass-neuro-avc",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "aha-avc", texto: "AHA/ASA — Guideline for the early management of patients with acute ischemic stroke (2019 update) e Guideline for the management of acute ischemic stroke (2026)", lidoEm: null },
    { id: "aha-avc-secundaria", texto: "AHA/ASA — Guideline for the prevention of stroke in patients with stroke and transient ischemic attack (Kleindorfer et al., Stroke 2021)", lidoEm: null },
    { id: "aha-hic", texto: "AHA/ASA — Guideline for the management of patients with spontaneous intracerebral hemorrhage (Greenberg et al., Stroke 2022)", lidoEm: null },
    { id: "aha-hsa", texto: "AHA/ASA — Guideline for the management of patients with aneurysmal subarachnoid hemorrhage (Hoh et al., Stroke 2023)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-unifesp2025-041"] },
  ],
  doencas: [
    {
      id: "isquemico", titulo: "AVC isquêmico",
      introducao: `[[O neurônio não guarda energia: sem fluxo, para de funcionar em segundos e morre em minutos. No AVC isquêmico há um centro já infartado e, em volta, a penumbra, tecido que não funciona mas ainda vive, sustentado por colaterais. Todo o tratamento agudo existe para salvar a penumbra: abrir a artéria rápido (trombólise, trombectomia) e manter a pressão e a glicose que a nutrem. O tecido morto se liquefaz (necrose liquefativa) e vira cavidade cística meses depois.|q-tp20212-021,q-adap23-053,q-tp20212-012]] [[As causas são três famílias: aterosclerose de grande artéria (carótida, que solta êmbolos ou estreita), cardioembolia (fibrilação atrial, a principal) e doença de pequenas artérias perfurantes pela hipertensão (lacunas). No jovem, pense em dissecção arterial e embolia paradoxal pelo forame oval.|q-uspsp3-083,q-unesp2022-063,q-famerp2022-063]]

Veja também: **Hipertensão arterial** (emergência hipertensiva), **Arritmias** (fibrilação atrial e anticoagulação), **Doença coronariana** (estatina e antiagregação), **TCE** (hematomas traumáticos) e **Diabetes**.`,
      fragmentos: [
        { id: "avci-topografia", titulo: "Reconhecer: síndromes vasculares e diferenciais", conferir: true,
          casos: ["q-usp2026-011","q-sirio2021-014"],
          questoes: ["q-amrigs2021-013","q-tp20202-019","q-tp20251-020","q-tp20252-104","q-usp2026-011","q-sirio2021-014","q-tp20212-012","q-sirio2023-009","q-usprp2026-094"],
          prosa: `[[A cerebral média irriga a face lateral do hemisfério: hemiparesia e hipoestesia contralaterais de face e braço maiores que a perna, afasia se o hemisfério é o dominante, e negligência e anosognosia se é o não dominante (a paciente lê só um lado da página). A cerebral anterior dá fraqueza da perna, abulia e incontinência; a posterior, hemianopsia.|q-amrigs2021-013,q-usp2026-011]] [[A circulação posterior (vertebrais e basilar) dá vertigem, diplopia, disartria, ataxia e sinais cruzados (nervo craniano de um lado, membros do outro), que localizam no tronco. A síndrome de Wallenberg (bulbo lateral, artéria cerebelar inferior posterior) junta Horner e perda de dor e temperatura na hemiface do mesmo lado e no corpo do lado oposto, com tato e vibração preservados. Vertigem com ataxia, nistagmo e disartria é central, não labirinto.|q-tp20202-019,q-tp20251-020,q-tp20252-104]] [[A paralisia facial periférica (do nervo facial) pega a testa inteira; a central, do AVC, poupa a testa porque a parte superior do núcleo recebe fibras dos dois hemisférios. Hipoglicemia e encefalopatia hepática imitam AVC, por isso glicemia e tomografia vêm antes de tudo. A cefaleia é rara no isquêmico e quase constante na hemorragia subaracnoide.|q-sirio2021-014,q-usprp2026-094,q-sirio2023-009]]`,
          texto: `- Hemiparesia contralateral e anosognosia: **cerebral média**. {q-amrigs2021-013}
- Horner e dissociação cruzada da sensibilidade: **cerebelar inferior posterior**. {q-tp20202-019}
- Diplopia, ptose e hemiparesia oposta: **tronco encefálico**. {q-tp20251-020}
- Vertigem, nistagmo, disartria e dismetria: **AVC da circulação posterior**. {q-tp20252-104}
- Negligência do lado esquerdo: **lesão no hemisfério direito**. {q-usp2026-011}
- Desvio da rima com testa paralisada e força normal: **paralisia facial periférica**. {q-sirio2021-014}
- Cistos meses depois do infarto: **necrose liquefativa**. {q-tp20212-012}
- Frequência de sintomas: **II, III e I** (intraparenquimatosa, isquêmico, subaracnoide). {q-sirio2023-009}
- Cirrótico com hemiparesia súbita: **tomografia de crânio**. {q-usprp2026-094}` },
        { id: "avci-trombolise", titulo: "Atendimento agudo e trombólise", conferir: true, diretrizes: ["aha-avc"],
          figuras: [{ arquivo: "figuras/avc-agudo.svg", legenda: "Esquema autoral: as decisões das primeiras horas no AVC isquêmico." }],
          casos: ["q-einstein2021-006","q-fmabc2023-013"],
          questoes: ["q-unifesp2022-020","q-iamspe2022-011","q-adap25-041","q-adap22-020","q-einstein2023-002","q-unifesp2023-053","q-sessp2022-005","q-sessp2024-007","q-famema2025-010","q-fmabc2022-013","q-fmabc2023-013","q-einstein2021-006","q-tp20212-021","q-sirio2026-005","q-einstein2025-012"],
          prosa: `[[Déficit súbito pede glicemia capilar (hipoglicemia imita AVC) e tomografia sem contraste imediata, que é o padrão-ouro para afastar sangue; a angiotomografia procura oclusão de grande vaso.|q-unifesp2022-020,q-iamspe2022-011]] [[Sem sangue na tomografia e até 4,5 horas do último momento visto bem, dá-se o trombolítico venoso (alteplase 0,9 mg/kg, 10% em bolus e o resto em 1 hora). A pressão precisa estar abaixo de 185/110 mmHg para começar (baixa-se com anti-hipertensivo venoso, como nitroprussiato, labetalol ou nicardipina, e então se trombolisa) e abaixo de 180/105 durante e 24 horas depois. Déficit pequeno mas incapacitante (afasia) também tem indicação.|q-adap25-041,q-adap22-020,q-einstein2023-002,q-famema2025-010,q-fmabc2022-013,q-sessp2024-007,q-tp20212-021,q-einstein2021-006,q-fmabc2023-013]] [[Contraindicações vêm do sangramento: hemorragia na imagem, sangramento gastrointestinal nos últimos 21 dias, anticoagulação efetiva (varfarina com RNI acima de 1,7), plaquetas baixas, cirurgia ou trauma grave recente, AVC ou TCE grave nos últimos 3 meses. Idade, parto recente e convulsão no início não são contraindicações absolutas, e não se espera o coagulograma de quem não usa anticoagulante. Piora no 2º dia com rebaixamento é transformação hemorrágica.|q-unifesp2023-053,q-sessp2022-005,q-fmabc2023-013,q-einstein2025-012]] [[Quem acordou com o déficit tem hora desconhecida: a ressonância com difusão positiva e FLAIR ainda negativo mostra infarto de menos de 4,5 horas e permite trombolisar.|q-sirio2026-005]]`,
          texto: `- Déficit há 2 horas: **glicemia, tomografia e angiotomografia**. {q-unifesp2022-020}
- Padrão-ouro para sangue agudo: **tomografia**. {q-iamspe2022-011}
- PA 192/108 na janela: **baixar para < 185/110 e trombolisar**. {q-adap25-041,q-adap22-020}
- PA 198/130 com hemiplegia: **nitroprussiato venoso**. {q-einstein2023-002}
- Contraindicação absoluta (a prova): **varfarina com RNI 1,9**. {q-unifesp2023-053}
- Contraindica: **hemorragia digestiva nos últimos 21 dias**. {q-sessp2022-005}
- Afasia com NIHSS < 3 e PA 175/100: **trombólise**. {q-sessp2024-007}
- Trombólise exige **PA ≤ 185/110**. {q-famema2025-010,q-fmabc2023-013}
- Durante e após: **< 180/105**. {q-fmabc2022-013}
- Tomografia sem sangue em 2 horas: **AVC isquêmico, trombólise**. {q-einstein2021-006}
- NIHSS 19 em 1 hora com TC normal: **trombolítico venoso**. {q-tp20212-021}
- Acordou com o déficit: **RM com difusão e FLAIR**. {q-sirio2026-005}
- Piora no 2º dia após rtPA: **transformação hemorrágica**. {q-einstein2025-012}` },
        { id: "avci-trombectomia", titulo: "Trombectomia e o tecido já perdido", conferir: true, diretrizes: ["aha-avc"],
          casos: ["q-tp20222-034","q-usprp2024-038"],
          questoes: ["q-adap23-053","q-usp2022-004","q-uspsp3-083","q-tp20222-034","q-usprp2024-038"],
          prosa: `[[Oclusão de grande artéria proximal (carótida interna, M1) quase não abre com trombolítico: a trombectomia mecânica tira o trombo e é indicada até 6 horas, e até 24 horas quando a imagem mostra penumbra a salvar (infarto pequeno, ASPECTS alto). Quem está na janela recebe o trombolítico e vai para a trombectomia sem esperar a resposta; a dissecção carotídea não impede.|q-adap23-053,q-usp2022-004,q-uspsp3-083]] [[Quando a tomografia já mostra hipodensidade extensa (infarto estabelecido), não há o que salvar: reperfundir só arrisca sangramento, e o tratamento é suporte. A craniectomia descompressiva do infarto maligno da cerebral média serve nas primeiras 48 horas; passado esse prazo, não se indica.|q-tp20222-034,q-usprp2024-038]]`,
          texto: `- Oclusão de M1 em 2h30: **trombólise e trombectomia sem esperar**. {q-adap23-053}
- 5h30 com ASPECTS 8: **angiotomografia e trombectomia se oclusão**. {q-usp2022-004}
- Dissecção carotídea com oclusão de M1: **alteplase e trombectomia**. {q-uspsp3-083}
- Hipodensidade extensa ao acordar: **suporte clínico**. {q-tp20222-034}
- Craniectomia não indicada: **tempo de início dos sintomas**. {q-usprp2024-038}` },
        { id: "avci-secundaria", titulo: "AIT e prevenção secundária", conferir: true, diretrizes: ["aha-avc-secundaria"],
          casos: ["q-tp20252-068","q-famerp2022-063"],
          questoes: ["q-adap21-108","q-scmsp2022-072","q-simepm89-049","q-simepm89-004","q-tp20252-068","q-usprp2022-035","q-unesp2022-063","q-famerp2023-073","q-famerp2022-063","q-uspsp5-011","q-amrigs2025-016","q-amrigs2020-013"],
          prosa: `[[O ataque isquêmico transitório é déficit que passa sem infarto na imagem; o risco de AVC é maior nos primeiros dias. AIT de alto risco (ABCD2 ≥ 4) e AVC menor recebem dupla antiagregação (AAS e clopidogrel) por 21 dias, começando em 24 horas, mais estatina de alta potência; depois, um antiagregante só. Anticoagulante não é tratamento do AVC aterotrombótico.|q-adap21-108,q-scmsp2022-072,q-amrigs2025-016,q-amrigs2020-013]] [[Estenose da carótida sintomática de 70 a 99% (e 50 a 69% em casos escolhidos) pede endarterectomia, de preferência nas 2 primeiras semanas; a estenose assintomática fica no tratamento clínico otimizado.|q-simepm89-049,q-simepm89-004,q-tp20252-068,q-usprp2022-035]] [[A fibrilação atrial pede anticoagulação, sem AAS junto; com varfarina, o alvo é RNI entre 2 e 3 (abaixo de 2 o risco de embolia sobe). O início depende do tamanho do infarto (dias, para não sangrar). O jovem sem outra causa e com forame oval patente recebe o fechamento do forame.|q-famerp2023-073,q-famerp2022-063,q-uspsp5-011,q-unesp2022-063]]`,
          texto: `- AIT com ABCD2 de 5: **AAS + clopidogrel por 21 dias e estatina**. {q-adap21-108}
- AIT (a prova): duração **< 2 horas**. {q-scmsp2022-072}
- AIT com estenose > 70%: **endarterectomia ou angioplastia**. {q-simepm89-049}
- AVC há 7 dias com estenose de 75%: **endarterectomia precoce**. {q-simepm89-004}
- AITs repetidos com estenose: **endarterectomia urgente**. {q-tp20252-068}
- Estenose assintomática: **tratamento clínico otimizado**. {q-usprp2022-035}
- Jovem com forame oval: **fechamento**. {q-unesp2022-063}
- Varfarina: **menor risco de embolia com RNI > 2**. {q-famerp2023-073}
- AVC com FA: **varfarina sem AAS**. {q-famerp2022-063}
- AVC com FA na janela (a prova): **alteplase e anticoagular após 48 h**. {q-uspsp5-011}
- Fase aguda (provas antigas): **AAS o único antitrombótico eficaz**. {q-amrigs2025-016,q-amrigs2020-013}` },
      ],
    },
    {
      id: "hemorragico", titulo: "AVC hemorrágico",
      introducao: `[[A hipertensão crônica enfraquece as pequenas artérias perfurantes, que se rompem nos núcleos da base (putâmen, tálamo), na ponte e no cerebelo: o hematoma cresce nas primeiras horas, e por isso cefaleia, vômitos e rebaixamento acompanham o déficit. Na hemorragia subaracnoide, quase sempre um aneurisma sacular do polígono de Willis se rompe e o sangue enche as cisternas: cefaleia súbita, a pior da vida, com vômito, perda de consciência e rigidez de nuca.|q-usprp2021-090,q-adap21-090,q-usprp2022-026,q-tp20231-009,q-unifesp2025-064]]`,
      fragmentos: [
        { id: "hem-intraparenquimatoso", titulo: "Hemorragia intraparenquimatosa", conferir: true, diretrizes: ["aha-hic"],
          casos: ["q-unesp2022-079","q-unesp2023-073"],
          questoes: ["q-adap21-090","q-usprp2021-090","q-unesp2022-079","q-unesp2023-073"],
          prosa: `[[O tratamento tenta impedir o hematoma de crescer: reduzir a pressão sistólica para 130 a 150 mmHg e reverter qualquer anticoagulação na hora (varfarina com complexo protrombínico de quatro fatores e vitamina K venosa).|q-adap21-090]] [[Hemorragia na ponte dá coma, tetraplegia, pupilas puntiformes e respiração anormal. Sangue que invade os ventrículos bloqueia o líquor e causa hidrocefalia, tratada com derivação ventricular externa.|q-usprp2021-090,q-unesp2023-073,q-unesp2022-079]]`,
          texto: `- Hematoma com RNI 3,8: **complexo protrombínico, vitamina K e PAS 130–150**. {q-adap21-090}
- Coma, tetraplegia e respiração apnêustica: **ponte**. {q-usprp2021-090}
- Cefaleia, vômitos e rebaixamento: **tomografia com hematoma**. {q-unesp2022-079}
- Hemorragia com hidrocefalia e Glasgow 7: **derivação ventricular externa**. {q-unesp2023-073}` },
        { id: "hem-hsa", titulo: "Hemorragia subaracnoide", conferir: true, diretrizes: ["aha-hsa"],
          casos: ["q-usp2025-076","q-sessp2025-010","q-unesp2021-072"],
          questoes: ["q-adap25-064","q-unifesp2025-064","q-scmsp2022-010","q-usp2025-076","q-usprp2021-108","q-usprp2022-026","q-usprp2023-088","q-tp20231-009","q-unesp2021-072","q-sessp2025-010","q-sirio2026-006"],
          prosa: `[[Cefaleia em trovoada pede tomografia sem contraste; se ela vem normal (a sensibilidade cai depois de horas), faz-se punção lombar: o líquor que continua vermelho nos três tubos e a xantocromia indicam sangue antigo, enquanto o que clareia do primeiro ao terceiro tubo sugere acidente de punção. Confirmado o sangue, a angiotomografia ou a angiografia acha o aneurisma.|q-usprp2023-088,q-unesp2021-072,q-usprp2021-108]] [[O aneurisma da comunicante posterior comprime o nervo oculomotor: ptose, midríase e olho desviado. Hemorragia sub-hialoide no fundo de olho também aponta para hemorragia subaracnoide. A escala de Fisher gradua o sangue na tomografia (IV com sangue nos ventrículos ou no parênquima) e prevê vasoespasmo.|q-scmsp2022-010,q-unifesp2025-064,q-sessp2025-010,q-usprp2022-026,q-tp20231-009]] [[Até o aneurisma ser ocluído (clipe ou mola), a pressão sistólica fica abaixo de 160 mmHg para não ressangrar. Entre o 3º e o 14º dia vem o vasoespasmo e a isquemia tardia: a nimodipina oral (60 mg de 4/4 horas por 21 dias) melhora o resultado.|q-sirio2026-006,q-adap25-064,q-usp2025-076]]`,
          texto: `- Aneurisma de comunicante anterior: **nimodipina 60 mg 4/4 h por 21 dias**. {q-adap25-064}
- Hemorragia sub-hialoide e rebaixamento: **hemorragia subaracnoide**. {q-unifesp2025-064}
- Ptose unilateral após cefaleia súbita: **nervo oculomotor**. {q-scmsp2022-010}
- Lesão sacular na angiotomografia: **nimodipino**. {q-usp2025-076}
- Cefaleia explosiva com diplopia e sangue na TC: **angiografia**. {q-usprp2021-108}
- Cefaleia súbita com síncope no esforço: **ruptura de aneurisma**. {q-usprp2022-026,q-tp20231-009}
- Cefaleia súbita com Glasgow 13: **tomografia primeiro**. {q-usprp2023-088}
- TC normal e três tubos: **acidente de punção sugerido; HSA não afastada**. {q-unesp2021-072}
- Sangue com inundação ventricular: **Fisher IV**. {q-sessp2025-010}
- Antes de ocluir o aneurisma: **PAS < 160 mmHg**. {q-sirio2026-006}` },
        { id: "hem-pres", titulo: "Encefalopatia posterior reversível", conferir: true,
          casos: ["q-sessp2025-017"],
          questoes: ["q-sessp2025-017"],
          prosa: `[[Pressão muito alta (ou eclâmpsia, imunossupressores) vence a autorregulação da circulação posterior, menos inervada, e causa edema vasogênico occipital: cefaleia, vômitos, alteração visual e convulsão, com imagem de edema na substância branca posterior que regride com o controle da pressão.|q-sessp2025-017]]`,
          texto: `- Cefaleia, escotomas e edema occipital na hipertensa: **síndrome da encefalopatia posterior reversível**. {q-sessp2025-017}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["aha-avc","aha-avc-secundaria"],
          questoes: ["q-amrigs2025-016","q-amrigs2020-013","q-scmsp2022-072","q-einstein2023-002","q-uspsp5-011","q-famerp2022-063"],
          prosa: `[[**Antiagregação aguda**: desde CHANCE e POINT, AIT de alto risco e AVC menor recebem AAS e clopidogrel por 21 dias; as provas amrigs2025-016 e amrigs2020-013 ainda deram o AAS como o único antiplaquetário eficaz na fase aguda.|q-amrigs2025-016,q-amrigs2020-013]] [[**Definição de AIT**: hoje ela é pelo tecido (déficit transitório sem infarto na imagem), não pelo relógio; a antiga dizia 24 horas, e a scmsp2022-072 cobrou "menos de 2 horas".|q-scmsp2022-072]] [[**Anti-hipertensivo antes da trombólise**: as diretrizes citam labetalol e nicardipina como primeira escolha e nitroprussiato como alternativa; a einstein2023-002 deu nitroprussiato.|q-einstein2023-002]] [[**Anticoagulação na fibrilação atrial depois do AVC**: os anticoagulantes diretos são preferidos à varfarina, e o início vai de 1 a 14 dias conforme o tamanho do infarto (estudo ELAN apoia início precoce); a famerp2022-063 deu varfarina e a uspsp5-011 fixou "após 48 h".|q-famerp2022-063,q-uspsp5-011]]`,
          texto: `- Regra: **AAS + clopidogrel** no AVC menor; provas antigas deram o AAS sozinho. {q-amrigs2025-016,q-amrigs2020-013}
- AIT definido pelo tecido; a prova cobrou **< 2 horas**. {q-scmsp2022-072}
- Labetalol ou nicardipina primeiro; a prova deu **nitroprussiato**. {q-einstein2023-002}
- DOAC preferido e início pelo tamanho do infarto; as provas deram **varfarina** e **48 h**. {q-famerp2022-063,q-uspsp5-011}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: os subtipos de AVC",
      introducao: `Resumo dos capítulos para separar os três subtipos que as provas comparam.`,
      fragmentos: [
        { id: "cmp-subtipos", titulo: "Isquêmico, intraparenquimatoso e subaracnoide", conferir: true,
          questoes: ["q-sirio2023-009","q-einstein2021-006","q-adap21-090","q-adap25-064"],
          prosa: `[[O início, a cefaleia e a tomografia separam os subtipos.|q-sirio2023-009,q-einstein2021-006,q-adap21-090,q-adap25-064]]

| | Isquêmico | Hemorragia intraparenquimatosa | Hemorragia subaracnoide |
|---|---|---|---|
| Causa | aterosclerose, cardioembolia, pequenas artérias | hipertensão (núcleos da base, ponte, cerebelo) | aneurisma sacular roto |
| Quadro | déficit focal súbito, pouca cefaleia | déficit com cefaleia, vômito e rebaixamento | cefaleia em trovoada, rigidez de nuca, síncope |
| Tomografia | normal nas primeiras horas | hematoma | sangue nas cisternas (Fisher) |
| Pressão | < 185/110 para trombolisar | sistólica 130 a 150 | sistólica < 160 até ocluir o aneurisma |
| Tratamento | trombólise até 4,5 h; trombectomia até 24 h | reverter anticoagulação; derivar hidrocefalia | ocluir o aneurisma; nimodipina 21 dias |`,
          texto: `- Cefaleia é mais da **hemorragia subaracnoide**. {q-sirio2023-009}
- TC normal na janela: **trombólise**. {q-einstein2021-006}
- Hematoma com varfarina: **reverter**. {q-adap21-090}
- Aneurisma roto: **nimodipina**. {q-adap25-064}` },
      ],
    },
  ],
});
