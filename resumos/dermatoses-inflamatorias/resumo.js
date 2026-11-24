/* resumos/dermatoses-inflamatorias/resumo.js — resumo adaptativo de dermatoses inflamatórias e
   autoimunes (ass-derm-autoimunes): semiologia (vitropressão, onicólise), dermatite atópica (lactente,
   criança, tratamento, pitiríase alba), dermatite de contato e fitofotodermatose, teste de contato,
   urticária crônica e urticária-vasculite, pênfigos e penfigoide, acne, hidradenite supurativa,
   psoríase, pitiríase rósea e vitiligo; armadilhas e tabela dos eczemas.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- dermatoses-inflamatorias */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "dermatoses-inflamatorias",
  titulo: "Dermatoses inflamatórias e autoimunes",
  assunto: "ass-derm-autoimunes",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "sbp-atopica", texto: "SBP/ASBAI — Guia prático de atualização em dermatite atópica (2017/2019)", lidoEm: null },
    { id: "eaaci-urticaria", texto: "EAACI/GA²LEN/EuroGuiDerm/APAAACI — Guideline for urticaria (2022)", lidoEm: null },
    { id: "sbd-consensos", texto: "SBD — Consensos brasileiros de acne, hidradenite supurativa e psoríase", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "atopica", titulo: "Dermatite atópica",
      introducao: `[[A dermatite atópica começa numa **barreira cutânea defeituosa** (falta filagrina, a pele perde água e deixa alérgenos entrarem) somada a uma resposta imune **Th2**: pele seca, prurido intenso, coçadura que piora a barreira, e o ciclo se fecha. Por isso faz parte da **marcha atópica**, com rinite alérgica e asma, e a IgE costuma estar alta.|q-tp20212-051,q-usprp2021-100,q-famema2023-093]]

Veja também: **Infecções de pele**, **Anafilaxia, urticária e angioedema**, **Artrites** (artrite psoriásica) e **Lúpus**.`,
      fragmentos: [
        { id: "ato-idade", titulo: "Onde aparece em cada idade", conferir: true, diretrizes: ["sbp-atopica"],
          casos: ["q-usprp2025-008"],
          questoes: ["q-einstein2022-034","q-usprp2025-008","q-famema2023-093","q-sirio2023-054"],
          prosa: `[[No **lactente** as lesões são exsudativas (pápulas, vesículas, crostas) nas **bochechas e na fronte, poupando o maciço central** da face, e nas faces **extensoras**; começam por volta dos 3 a 6 meses.|q-einstein2022-034,q-usprp2025-008]] [[Na **criança maior** o eczema vai para as **dobras flexoras** (antecubital e poplítea), com **liquenificação** pela coçadura crônica; aparecem estigmas como a prega infraorbital de Dennie-Morgan e a rarefação do terço lateral da sobrancelha (Hertoghe).|q-famema2023-093,q-sirio2023-054]]`,
          texto: `- Lactente: **face poupando o centro**, extensoras. {q-einstein2022-034,q-usprp2025-008}
- Criança: **flexuras**, liquenificação, Dennie-Morgan. {q-famema2023-093,q-sirio2023-054}` },
        { id: "ato-atopia", titulo: "Atopia: IgE e rinite", conferir: true,
          questoes: ["q-tp20212-051","q-usprp2021-100","q-famema2023-093"],
          prosa: `[[O exame que costuma vir alterado é a **IgE sérica elevada**, mas o diagnóstico é clínico. A doença mais associada é a **rinite alérgica**, seguida da asma; a dermatite atópica costuma melhorar com a idade e piorar no inverno, quando o ar seco resseca a pele.|q-tp20212-051,q-usprp2021-100,q-famema2023-093]]`,
          texto: `- **IgE alta**; associação com **rinite alérgica** e asma. {q-tp20212-051,q-usprp2021-100,q-famema2023-093}` },
        { id: "ato-tratamento", titulo: "Tratamento: a barreira primeiro", conferir: true, diretrizes: ["sbp-atopica"],
          questoes: ["q-sessp2023-022","q-sessp2025-059","q-fmabc2021-084"],
          prosa: `[[A base do tratamento é **refazer a barreira**: **hidratante** várias vezes ao dia, banho curto e morno, sabonete suave. Nas crises, **corticoide tópico**; anti-histamínico sedante à noite ajuda quando o prurido tira o sono. Crostas não fazem impetigo por si: antibiótico só com infecção.|q-sessp2023-022,q-sessp2025-059,q-fmabc2021-084]]`,
          texto: `- **Hidratação da pele** sempre; corticoide tópico na crise; anti-histamínico para dormir. {q-sessp2023-022,q-sessp2025-059,q-fmabc2021-084}` },
        { id: "ato-pitiriase-alba", titulo: "Pitiríase alba", conferir: true,
          questoes: ["q-famema2022-098"],
          prosa: `[[Na criança atópica, **máculas hipocrômicas mal delimitadas, com descamação fina, no rosto**, sem prurido, são **pitiríase alba**: inflamação leve da pele seca que deixa a cor mais clara. Trata-se com **hidratante** e proteção solar; antifúngico não ajuda.|q-famema2022-098]]`,
          texto: `- Manchas claras e finas no rosto da criança: **pitiríase alba → hidratante**. {q-famema2022-098}` },
      ],
    },
    {
      id: "contato", titulo: "Dermatite de contato",
      introducao: `[[A dermatite de contato tem dois mecanismos. A **irritativa** é dano direto: qualquer pessoa exposta o bastante (água, sabão, cimento alcalino) lesa a pele. A **alérgica** é hipersensibilidade tardia (tipo IV): só quem se sensibilizou reage, inclusive a doses pequenas, dias depois do contato.|q-tp20252-062,q-tp20261-049,q-usprp2023-058]]`,
      fragmentos: [
        { id: "con-tipos", titulo: "Irritativa, alérgica e fitofotodermatose", conferir: true,
          casos: ["q-usprp2023-058","q-tp20252-066"],
          questoes: ["q-tp20252-062","q-tp20261-049","q-usprp2023-058","q-tp20252-066"],
          prosa: `[[O eczema **desenha o objeto**: faixa simétrica em volta do tórax (elástico, roupa de esporte), mãos fissuradas de quem mexe com cimento sem luva. O tratamento é **afastar a causa** e usar **corticoide tópico**; corticoide sistêmico é para quadro extenso e agudo.|q-tp20252-062,q-tp20261-049,q-usprp2023-058]] [[Suco de **limão** ou outro cítrico na pele, seguido de **sol**, dá queimadura com bolha e depois mancha escura (**fitofotodermatose**): a furocumarina do cítrico se ativa com a luz. Trata-se como queimadura, com **corticoide tópico**.|q-tp20252-066]]`,
          texto: `- Eczema com a forma do contato: **afastar e corticoide tópico**. {q-tp20252-062,q-tp20261-049,q-usprp2023-058}
- Cítrico + sol: **fitofotodermatose → corticoide tópico**. {q-tp20252-066}` },
        { id: "con-patch", titulo: "Teste de contato", conferir: true,
          casos: ["q-usprp2027-024"],
          questoes: ["q-usprp2026-084","q-usprp2027-024"],
          prosa: `[[Para achar o alérgeno da dermatite **alérgica** de contato, o exame é o **teste de contato (patch test)**: aplica-se a substância nas costas e lê-se em 48 e 96 horas, reproduzindo a reação tardia. Prick test e IgE medem alergia imediata (tipo I), outro mecanismo. Lesão infraumbilical que coça há anos aponta para o **níquel** da fivela; piora com perfume, para fragrância.|q-usprp2026-084,q-usprp2027-024]]`,
          texto: `- Dermatite de contato alérgica: **patch test**, não prick nem IgE. {q-usprp2026-084,q-usprp2027-024}` },
      ],
    },
    {
      id: "urticaria", titulo: "Urticária crônica",
      introducao: `[[A urtica é edema da derme causado pela histamina do mastócito: aparece, coça e some **em menos de 24 horas** sem deixar marca. Quando volta quase todo dia por **mais de 6 semanas**, é **urticária crônica**, quase sempre **espontânea** (autoimune contra o próprio mastócito), não alergia a um alimento.|q-famerp2025-049,q-uspsp5-009,q-einstein2027-031]]`,
      fragmentos: [
        { id: "urt-cronica", titulo: "Urticária crônica espontânea", conferir: true, diretrizes: ["eaaci-urticaria"],
          questoes: ["q-famerp2025-049","q-uspsp5-009","q-einstein2027-031"],
          prosa: `[[O tratamento é **anti-histamínico de segunda geração contínuo**, em dose padrão, que pode ser aumentada **até quatro vezes**; sem resposta, omalizumabe. Corticoide de manutenção e anti-histamínico de primeira geração (sedante) não são recomendados.|q-famerp2025-049,q-uspsp5-009]] [[Com história típica e exame normal, **não se investiga** com painel de IgE, autoanticorpos ou biópsia: a avaliação é clínica.|q-einstein2027-031]]`,
          texto: `- **Anti-H1 de 2ª geração contínuo**, até 4×. {q-famerp2025-049,q-uspsp5-009}
- Urticária crônica típica: **sem exames**. {q-einstein2027-031}` },
        { id: "urt-vasculite", titulo: "Quando a urtica dura demais: urticária-vasculite", conferir: true,
          questoes: ["q-udisc20262-009"],
          prosa: `[[Lesões urticariformes que **duram mais de 24 horas**, ardem mais que coçam e **deixam mancha** residual, com **VHS alta**, sugerem **urticária-vasculite** (vasculite de pequenos vasos). O diagnóstico é pela **biópsia de pele**.|q-udisc20262-009]]`,
          texto: `- Urtica que **deixa mancha** + VHS alta: **biópsia** (urticária-vasculite). {q-udisc20262-009}` },
      ],
    },
    {
      id: "bolhosas", titulo: "Doenças bolhosas autoimunes",
      introducao: `[[As células da epiderme se prendem umas às outras pelos **desmossomos** (desmogleínas) e à derme pela **membrana basal**. O autoanticorpo que ataca um desses pontos solta a pele naquele nível, e a altura da separação explica como a bolha é.|q-usprp2024-043,q-usprp2025-063,q-adap21-100]]`,
      fragmentos: [
        { id: "bol-penfigo", titulo: "Pênfigos", conferir: true,
          figuras: [{ arquivo: "figuras/nivel-da-bolha.svg", legenda: "Esquema autoral: a altura da separação na pele define o pênfigo foliáceo, o vulgar e o penfigoide bolhoso." }],
          questoes: ["q-usprp2024-043","q-usprp2025-063"],
          prosa: `[[No **pênfigo vulgar** o anticorpo atinge a **desmogleína 3**, das camadas profundas e da mucosa: a separação é **intraepidérmica suprabasal** (acantólise). Começa com **erosões na boca** e depois **bolhas flácidas** que se rompem; o **sinal de Nikolsky** é positivo.|q-usprp2024-043]] [[No **pênfigo foliáceo** o alvo é a **desmogleína 1**, da camada superficial: a bolha é **subcórnea**, tão fina que quase só se veem **crostas e erosões nas áreas seborreicas** (face, couro cabeludo, tronco), **sem mucosa**. A forma endêmica brasileira é o fogo selvagem.|q-usprp2025-063]]`,
          texto: `- Mucosa + bolha flácida + Nikolsky: **pênfigo vulgar, suprabasal**. {q-usprp2024-043}
- Crostas em áreas seborreicas, sem mucosa: **pênfigo foliáceo**. {q-usprp2025-063}` },
        { id: "bol-penfigoide", titulo: "Penfigoide bolhoso", conferir: true,
          questoes: ["q-adap21-100"],
          prosa: `[[O **penfigoide bolhoso** é a doença bolhosa do **idoso**: anticorpo contra a membrana basal, separação **subepidérmica**, teto grosso e por isso **bolhas tensas** sobre placas urticadas, com **muito prurido**, sem mucosa e com Nikolsky negativo. Trata-se com **corticoide tópico de alta potência** no corpo todo ou **prednisona em dose moderada** (0,5 mg/kg).|q-adap21-100]]`,
          texto: `- Idoso, bolhas tensas e prurido: **penfigoide → corticoide tópico potente ou prednisona 0,5 mg/kg**. {q-adap21-100}` },
      ],
    },
    {
      id: "foliculares", titulo: "Acne e hidradenite supurativa",
      introducao: `[[Acne e hidradenite começam no mesmo lugar: o **folículo piloso obstruído**. Na acne, o folículo sebáceo do rosto e do tronco, estimulado por andrógenos, se enche de sebo e de *Cutibacterium*; na hidradenite, os folículos das **dobras** (axila, virilha) se rompem na derme e formam nódulos, abscessos e fístulas.|q-tp20252-095,q-einstein2026-065,q-uspsp5-004]]`,
      fragmentos: [
        { id: "fol-acne", titulo: "Acne", conferir: true, diretrizes: ["sbd-consensos"],
          casos: ["q-einstein2026-065"],
          questoes: ["q-tp20252-095","q-einstein2026-065"],
          prosa: `[[Acne **moderada** (comedões, pápulas e pústulas em face e tronco, sem nódulos nem cicatrizes) se trata na atenção primária: **retinoide tópico + antibiótico oral** (doxiciclina ou tetraciclina) por até 3 meses, com adesão contínua. Isotretinoína e encaminhamento ficam para a acne nodular, com cicatriz ou refratária a tratamento bem feito.|q-tp20252-095,q-einstein2026-065]] [[Testosterona piora a acne. Como tetraciclina e retinoide são **teratogênicos**, quem tem útero e vida sexual precisa ter o **risco de gestação** avaliado, inclusive o homem trans.|q-tp20252-095]]`,
          texto: `- Acne moderada: **retinoide tópico + doxiciclina/tetraciclina**. {q-tp20252-095,q-einstein2026-065}
- Avaliar **risco de gestação** antes de tetraciclina e retinoide. {q-tp20252-095}` },
        { id: "fol-hidradenite", titulo: "Hidradenite supurativa", conferir: true, diretrizes: ["sbd-consensos"],
          questoes: ["q-uspsp5-004","q-unicampdis2023-008","q-amrigs2025-058"],
          prosa: `[[**"Furúnculos" que voltam sempre nos mesmos lugares** (axilas, virilhas, mamas, nádegas), não respondem a antibiótico e deixam **fístulas** e cicatrizes, em pessoa **obesa e fumante**: **hidradenite supurativa**. A cultura de *S. aureus* é só colonização.|q-uspsp5-004,q-unicampdis2023-008]] [[Doença leve (Hurley I, sem fístulas) recebe **antibiótico tópico** (clindamicina); a moderada, tetraciclina oral; a grave, cirurgia ou imunobiológico. Parar de fumar e perder peso ajudam.|q-amrigs2025-058]]`,
          texto: `- Abscessos recorrentes nas dobras com fístulas: **hidradenite**. {q-uspsp5-004,q-unicampdis2023-008}
- Leve: **clindamicina tópica**. {q-amrigs2025-058}` },
      ],
    },
    {
      id: "outras", titulo: "Psoríase, pitiríase rósea, vitiligo e semiologia",
      introducao: `[[Várias doenças de pele se reconhecem pelo desenho da lesão e por um sinal de exame simples: escama prateada e unha em dedal na psoríase, medalhão seguido de erupção na pitiríase rósea, mancha acrômica no vitiligo, e a vitropressão que separa sangue dentro do vaso de sangue fora dele.|q-uspsp1-054,q-scmsp2022-074]]`,
      fragmentos: [
        { id: "out-psoriase", titulo: "Psoríase e artrite psoriásica", conferir: true, diretrizes: ["sbd-consensos"],
          questoes: ["q-uspsp1-054"],
          prosa: `[[A psoríase é inflamação Th17 com renovação acelerada da epiderme: **placas eritematosas com escamas prateadas** em cotovelos, joelhos e couro cabeludo, **unhas em dedal** (depressões puntiformes). Pode vir com **artrite psoriásica** e com síndrome metabólica (glicemia e colesterol altos). Com artrite, grande extensão ou impacto na vida, é **moderada a grave** e pede **tratamento sistêmico**.|q-uspsp1-054]]`,
          texto: `- Placas prateadas + unha em dedal + artrite: psoríase **moderada/grave → sistêmico**. {q-uspsp1-054}` },
        { id: "out-rosea", titulo: "Pitiríase rósea", conferir: true,
          questoes: ["q-unicampdis2024-036"],
          prosa: `[[A **pitiríase rósea** começa com uma **placa-mãe** ovalada (medalhão) e, uma ou duas semanas depois, surgem várias lesões menores ovais com colarete de escama, seguindo as linhas da pele do tronco. É autolimitada (6 a 8 semanas), provavelmente viral (herpesvírus 6 e 7).|q-unicampdis2024-036]]`,
          texto: `- Medalhão e depois erupção oval no tronco: **pitiríase rósea**. {q-unicampdis2024-036}` },
        { id: "out-vitiligo", titulo: "Vitiligo", conferir: true,
          questoes: ["q-unicampdis2023-002"],
          prosa: `[[O **vitiligo** é a destruição autoimune dos melanócitos: **manchas acrômicas** (brancas como papel) que crescem e se juntam. Como outras autoimunidades, associa-se sobretudo à **tireoidite autoimune**: pede-se **TSH e anti-TPO**.|q-unicampdis2023-002]]`,
          texto: `- Vitiligo: investigar **tireoide** (TSH, anti-TPO). {q-unicampdis2023-002}` },
        { id: "out-semiologia", titulo: "Vitropressão e unha", conferir: true,
          casos: ["q-usprp2025-033"],
          questoes: ["q-scmsp2022-074","q-usprp2025-033"],
          prosa: `[[Apertar a lesão com o dedo ou com um vidro esvazia o vaso: o **eritema** (sangue dentro do vaso dilatado) **some**; a **púrpura** (sangue fora do vaso) **não some**.|q-scmsp2022-074]] [[A unha "oca", que se solta do leito a partir da ponta, é **onicólise**.|q-usprp2025-033]]`,
          texto: `- Vitropressão: **eritema some, púrpura fica**. {q-scmsp2022-074}
- Unha que se solta do leito: **onicólise**. {q-usprp2025-033}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-tp20252-062","q-tp20261-049","q-amrigs2025-058","q-fmabc2021-084"],
          prosa: `[[**Cimento: irritativa ou alérgica?** O cimento é alcalino (irritante) e contém cromo (o alérgeno mais comum do pedreiro); com quadro insidioso nas mãos, o Teste de Progresso cobrou **dermatite de contato alérgica** com corticoide tópico.|q-tp20252-062,q-tp20261-049]] [[**Comedões e pústulas na vulva**: a amrigs2025-058 chamou de **hidradenite supurativa** inicial, com antibiótico tópico; comedões sozinhos lembram acne, mas a vulva é área de hidradenite.|q-amrigs2025-058]] [[**Anti-histamínico na dermatite atópica**: não trata o eczema; a fmabc2021-084 o incluiu para o prurido que atrapalha o sono, junto com banho e hidratação.|q-fmabc2021-084]]`,
          texto: `- Cimento nas mãos: a prova cobrou **alérgica**. {q-tp20252-062,q-tp20261-049}
- Lesões foliculares vulvares: a prova cobrou **hidradenite**. {q-amrigs2025-058}
- Anti-histamínico na atópica: **só para o sono**. {q-fmabc2021-084}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: os eczemas",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-eczemas", titulo: "Mecanismo, local e exame", conferir: true,
          questoes: ["q-sirio2023-054","q-einstein2022-034","q-usprp2026-084","q-tp20252-062"],
          prosa: `[[O local e o mecanismo separam os eczemas.|q-sirio2023-054,q-einstein2022-034,q-usprp2026-084,q-tp20252-062]]

| Eczema | Mecanismo | Onde | Exame | Tratamento |
| Atópico | barreira fraca + Th2 | face no lactente, dobras na criança | IgE alta (não necessária) | hidratante, corticoide tópico |
| Contato irritativo | dano direto | onde tocou, mãos | nenhum | proteção, corticoide tópico |
| Contato alérgico | hipersensibilidade tardia | onde tocou o alérgeno | teste de contato | afastar, corticoide tópico |
| Seborreico | inflamação nas áreas oleosas | couro cabeludo, sulcos, dobras | nenhum | antifúngico, corticoide fraco |`,
          texto: `- Atópico: **dobras, hidratante**. {q-sirio2023-054,q-einstein2022-034}
- Alérgico de contato: **patch test**. {q-usprp2026-084,q-tp20252-062}` },
      ],
    },
  ],
});
