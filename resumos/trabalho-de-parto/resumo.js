/* resumos/trabalho-de-parto/resumo.js — resumo adaptativo de trabalho de parto: estática fetal, bacia e mecanismo,
   fases e assistência (OMS 2018 e diretriz nacional), Robson, partograma e distocias, vitalidade intraparto,
   parto operatório, distocia de ombro, pélvica, indução e pós-datismo, e o essencial de prematuro, rotura e
   estreptococo do grupo B (dono: parto-pretermo-e-rotura). Molde e regras: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- trabalho-de-parto */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "trabalho-de-parto",
  titulo: "Trabalho de parto e parto",
  assunto: "ass-trabalhoparto",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "oms-intraparto", texto: "OMS — WHO recommendations: intrapartum care for a positive childbirth experience (2018), iris.who.int", lidoEm: "2026-11-19" },
    { id: "ms-parto-normal", texto: "Ministério da Saúde/Conitec — Diretrizes Nacionais de Assistência ao Parto Normal (2017)", lidoEm: null },
    { id: "ms-alto-risco", texto: "Ministério da Saúde — Manual de Gestação de Alto Risco (2022)", lidoEm: null },
    { id: "rcog-ombro", texto: "RCOG — Shoulder Dystocia, Green-top Guideline nº 42 (3ª edição; a 2ª é de 2012)", lidoEm: null },
    { id: "acog-gbs", texto: "ACOG — Committee Opinion nº 797: Prevention of Group B Streptococcal Early-Onset Disease in Newborns (2020)", lidoEm: null },
    { id: "acog-inducao", texto: "ACOG — Practice Bulletin nº 107 (indução do trabalho de parto) e nº 205 (parto vaginal após cesárea, 2019)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas pela banca, sem reposição", questoes: ["q-scmsp2022-060","q-usp2024-110","q-iamspe2021-064","q-sessp2025-078","q-fmabc2021-053"] },
  ],
  doencas: [
    {
      id: "mecanismo", titulo: "Estática fetal, bacia e mecanismo do parto",
      introducao: `O parto é a passagem de um objeto (o feto) por um canal (a bacia) movido por um motor (o útero). [[A estática fetal descreve como o feto ocupa o útero: situação (longitudinal ou transversa), apresentação (a parte que ocupa o estreito superior), posição (lado do dorso) e variedade de posição (onde está o ponto de referência fetal em relação à pelve materna).|q-amrigs2020-045,q-iamspe2026-057,q-unifesp2026-054,q-usp2025-020]] O nome da variedade junta três letras: o ponto de referência (O = occipício, S = sacro, M = mento, N = naso, B = bregma), o lado materno (E ou D) e a posição na pelve (A, T ou P); OET é occipito-esquerda-transversa.

[[Quanto mais a cabeça deflete, maior o diâmetro que tenta passar: fletida, o occipício (lambda) guia e passa o suboccipitobregmático de 9,5 cm; na 1º grau (bregmática) a referência é o bregma; na 2º grau (fronte) é a glabela/raiz do nariz, com o maior diâmetro (occipitomentoniano, ~13,5 cm), que não passa em feto de termo; na 3º grau (face) é o mento, e o parto vaginal só acontece com o mento anterior.|q-scmsp2021-077,q-iamspe2025-052,q-scmsp2023-075,q-usp2023-039,q-sessp2025-077]]

[[A bacia tem três estreitos; o superior se avalia pela conjugata diagonal (promontório à borda inferior da sínfise, medida ao toque), da qual se estima a conjugata vera obstétrica subtraindo cerca de 1,5 cm.|q-scmsp2023-076,q-usp2022-098]] [[A altura da apresentação se mede pelos planos de DeLee, em centímetros acima (−) ou abaixo (+) das espinhas isquiáticas: plano 0 significa insinuação (o diâmetro biparietal passou o estreito superior).|q-sessp2025-075,q-famema2023-052,q-sirio2025-066,q-fmabc2023-067]]

[[O mecanismo é a sequência de movimentos com que o feto se adapta à bacia: insinuação, descida, rotação interna (o occipício gira para baixo da sínfise), desprendimento por deflexão, rotação externa e desprendimento dos ombros.|q-sessp2022-079,q-unesp2022-028,q-usprp2021-052,q-sirio2023-075]] A rotação é de 45° nas anteriores, 90° nas transversas e 135° nas posteriores (ou 180° para OS, que só roda ao púbis invertendo o sentido).

Veja também: **Pré-natal** (idade gestacional e vitalidade), **Sangramentos na gestação** (descolamento, rotura uterina, hemorragia pós-parto e atonia), **Puerpério**, **Parto pré-termo e rotura de membranas** (dono da tocólise e da rotura), **Reanimação neonatal**.`,
      fragmentos: [
        { id: "mec-estatica", titulo: "Situação, apresentação, variedade e deflexões",
          figuras: [{ arquivo: "figuras/deflexoes.svg", legenda: "Esquema autoral: graus de deflexão da cabeça, ponto de referência e diâmetro que se apresenta." }],
          questoes: ["q-amrigs2020-045","q-iamspe2025-052","q-iamspe2026-057","q-scmsp2021-077","q-scmsp2023-075","q-usp2023-039","q-usp2025-020","q-unifesp2026-054","q-sessp2025-077","q-famerp2023-043","q-einstein2026-052","q-sirio2023-064","q-udisc20262-083","q-famema2023-052"],
          casos: ["q-usp2025-020","q-iamspe2026-057"],
          prosa: `A palpação (manobras de Leopold) acha o dorso e o polo que ocupa a pelve; o foco de ausculta fica do lado do dorso, abaixo do umbigo na cefálica e acima na pélvica. [[No toque, a fontanela menor (lambda, triangular) indica o occipício; a maior (bregma, losangular) fica do lado oposto: lambda à direita e posterior é occipito-direita-posterior.|q-unifesp2026-054,q-sirio2023-064,q-udisc20262-083]] [[Útero com fundo baixo para a idade, polo cefálico num flanco e nada na pelve sugerem situação transversa: o ponto de referência é o acrômio e, a termo, o parto é cesárea.|q-famerp2023-043]] [[Na pélvica, o polo volumoso e mole na pelve é a nádega; sem pés palpáveis, a pélvica é incompleta (modo de nádegas).|q-einstein2026-052]]`,
          texto: `- Na nomenclatura OET, o **T** indica a **variedade de posição** (transversa). {q-amrigs2020-045}
- Foco de ausculta no quadrante **inferior esquerdo**: **cefálico, dorso à esquerda**. {q-usp2025-020}
- Fontanela maior à esquerda junto à sínfise e menor à direita posterior: **ODP**. {q-unifesp2026-054}
- ODT: lambda às **9 h** no relógio da pelve. {q-sirio2023-064}
- Lambda voltado para a sínfise, sutura sagital no diâmetro anteroposterior: **occipito-púbica**, rotação interna já feita. {q-udisc20262-083}
- Defletida de 1º grau: referência **bregma**, linha de orientação **sagitometópica**. {q-scmsp2021-077,q-scmsp2023-075,q-sessp2025-077}
- Defletida de 2º grau (fronte): referência **glabela/raiz do nariz**; a termo, **cesárea**. {q-iamspe2025-052,q-usp2023-039}
- Variedade pela figura: **sacro direita posterior**. {q-iamspe2026-057}
- Situação transversa: referência **acrômio**, conduta **cesárea**. {q-famerp2023-043}
- Polo mole na pelve sem pés: **pélvica incompleta**. {q-einstein2026-052}
- Ponto mais baixo abaixo das espinhas (+1): apresentação **insinuada**. {q-famema2023-052}` },
        { id: "mec-bacia", titulo: "Bacia, estreitos e planos de DeLee",
          questoes: ["q-scmsp2023-076","q-usp2022-098","q-usp2025-011","q-einstein2025-047","q-sessp2025-075","q-sirio2025-066"],
          casos: ["q-scmsp2023-076"],
          prosa: `[[Os tipos de bacia (Caldwell-Moloy) explicam as distocias: a ginecoide é arredondada e favorável; a androide é triangular (em coração), com espinhas proeminentes, e favorece parada em variedades posteriores; a antropoide é ovalada no sentido anteroposterior; a platipeloide é achatada no anteroposterior, e a cabeça se insinua no diâmetro transverso.|q-usp2025-011,q-einstein2025-047]] [[Cabeça alta e fixa com colo dilatado e contrações eficazes aponta um estreito superior estreito, e o diâmetro que conta é a conjugata vera obstétrica (promontório à face posterior da sínfise).|q-usp2022-098]]`,
          texto: `- Toque do promontório à borda inferior da sínfise: **estreito superior**, mede a **conjugata diagonal** e estima a **vera obstétrica** de forma **indireta**. {q-scmsp2023-076}
- Diâmetro que impede a descida no estreito superior: **promontório à face posterior da sínfise** (conjugata vera obstétrica). {q-usp2022-098}
- Parada da descida no plano 0 com dilatação total: pelve **androide** (em coração). {q-usp2025-011}
- Pelve achatada no anteroposterior, insinuação transversa: **platipeloide**. {q-einstein2025-047}
- Ponto mais baixo na altura das espinhas: **plano 0**. {q-sessp2025-075}
- Plano **+3**: parto próximo. {q-sirio2025-066}` },
        { id: "mec-tempos", titulo: "Tempos do mecanismo e rotações",
          questoes: ["q-usprp2021-052","q-sessp2022-079","q-sessp2025-073","q-sessp2025-074","q-sessp2025-076","q-sessp2025-079","q-unesp2022-028","q-unesp2026-027","q-fmabc2023-067","q-sirio2023-075","q-fmabc2022-076"],
          prosa: `[[O sentido da rotação interna é o que leva o occipício pelo caminho mais curto até a sínfise: das variedades esquerdas, anti-horário; das direitas, horário.|q-unesp2022-028,q-unesp2026-027,q-usprp2021-052]] [[No assinclitismo a cabeça desce inclinada: no posterior, o parietal posterior desce primeiro e a sutura sagital fica perto da sínfise; no anterior, o parietal anterior.|q-sessp2025-074]] [[Na defletida de 1º grau, a cabeça se desprende por flexão e depois deflexão, porque a glabela apoia sob a sínfise.|q-sessp2025-076]] [[A descida mais rápida acontece na fase final da dilatação (desaceleração) e no período expulsivo.|q-sirio2023-075]]`,
          texto: `- Insinuação na cefálica fletida: passagem do **biparietal** pelo estreito superior; na pélvica, do **bitrocantérico**. {q-fmabc2023-067,q-sessp2025-073}
- OEA: occipício roda **45° anti-horário**. {q-unesp2022-028}
- OEP: **135° anti-horário**. {q-unesp2026-027}
- ODP: rotação interna de **135° horária**, desprendimento e rotação externa **anti-horária**. {q-usprp2021-052}
- OS: rotação de **180°**. {q-sessp2025-079}
- OET em +2/+3: rotação de **90°** (com fórcipe, se preciso). {q-fmabc2022-076}
- Na pélvica, a rotação interna é de **45°**. {q-sessp2022-079}
- Assinclitismo posterior: **parietal posterior desce primeiro**. {q-sessp2025-074}
- Defletida de 1º grau: desprendimento por **flexão e deflexão**. {q-sessp2025-076}
- Descida mais rápida na **fase de desaceleração** da dilatação. {q-sirio2023-075}` },
      ],
    },
    {
      id: "assistencia", titulo: "Fases do parto e assistência",
      introducao: `[[O primeiro período (dilatação) tem uma fase latente, com contrações dolorosas e dilatação lenta e variável até 5 cm, e uma fase ativa, de 5 cm até a dilatação total, com dilatação mais rápida; a fase latente não tem duração padrão, e a ativa costuma durar até 12 horas na primeira gestação e até 10 nas seguintes.|q-amrigs2025-051,q-fmabc2024-071,q-einstein2021-037,q-sirio2023-063]] O colo dilata porque cada contração encurta as fibras do corpo e puxa o segmento e o colo para cima, enquanto a bolsa e a apresentação forçam o orifício.

[[A gestante em fase latente, com feto bem, pode voltar para casa ou ficar em observação e ser reavaliada; internar cedo leva a mais intervenção sem benefício.|q-tp20252-055,q-uspsp1-087,q-fmabc2024-072]] [[O segundo período vai da dilatação total ao nascimento e costuma durar até 3 horas na primeira gestação e até 2 nas seguintes; a mulher faz força quando sente vontade, na posição que escolher.|q-usprp2026-075,q-udisc20262-082,q-adap24-074]] O terceiro período é a dequitação; o quarto, a primeira hora depois dela.`,
      fragmentos: [
        { id: "ast-diagnostico", titulo: "Trabalho de parto ou não: latente, ativa e quando internar", conferir: false, diretrizes: ["oms-intraparto"],
          questoes: ["q-amrigs2025-051","q-tp20252-055","q-fmabc2024-071","q-fmabc2024-072","q-uspsp1-087","q-einstein2021-037","q-sirio2023-063","q-iamspe2026-052","q-usp2023-038","q-unifesp2022-035","q-fmabc2026-061","q-uspsp2-045"],
          casos: ["q-iamspe2026-052"],
          prosa: `O diagnóstico de trabalho de parto é clínico: contrações regulares e dolorosas que **modificam o colo**. [[Contrações sem mudança do colo, que somem com analgesia, são falso trabalho de parto, também no pré-termo: a gestante recebe alta com sinais de alarme, sem tocólise.|q-usp2023-038,q-unifesp2022-035]] [[Com 5 cm ou mais e contrações regulares, ela está na fase ativa: interna, abre o partograma e acompanha com ausculta intermitente.|q-sirio2023-063,q-fmabc2026-061,q-uspsp2-045,q-iamspe2026-052]]`,
          texto: `- 2 cm, contrações irregulares: **fase latente**; cardiotocografia e reavaliação em **1–2 h**. {q-fmabc2024-071,q-fmabc2024-072,q-uspsp1-087}
- 3 cm, plano −2, feto bem: **alta** com medidas não farmacológicas e sinais de alerta. {q-tp20252-055}
- 4 cm sem mudança em 4 h: **fase latente prolongada**, aguardar. {q-amrigs2025-051}
- Trabalho de parto estabelecido: dilatação de **4 a 6 cm** com contrações regulares (OMS: **5 cm**). {q-einstein2021-037}
- 5 cm com contrações regulares: **internar e abrir o partograma**. {q-sirio2023-063,q-fmabc2026-061,q-uspsp2-045}
- Feto bem na admissão: **ausculta intermitente**. {q-iamspe2026-052}
- Pré-termo com contrações fracas e colo que não muda: **alta** com orientação. {q-usp2023-038,q-unifesp2022-035}` },
        { id: "ast-primeiro", titulo: "Cuidados no primeiro período", conferir: true, diretrizes: ["oms-intraparto","ms-parto-normal"],
          questoes: ["q-unifesp2024-058","q-sessp2022-080","q-famerp2026-025","q-einstein2023-059","q-usprp2022-048","q-usprp2023-025","q-sirio2027-061","q-sirio2027-062","q-fmabc2023-066","q-einstein2021-040","q-sessp2023-054","q-usprp2022-050"],
          casos: ["q-usprp2022-050"],
          prosa: `[[No risco habitual, o toque vaginal se faz a cada 4 horas na fase ativa, e a vitalidade se avalia por ausculta intermitente, não por cardiotocografia contínua; com ocitocina, a vigilância fica mais frequente.|q-sessp2022-080,q-famerp2026-025,q-einstein2023-059,q-unifesp2024-058]] [[Amniotomia e ocitocina não se usam para prevenir atraso; entram quando há falha de progressão.|q-unifesp2024-058]] [[A dor tem alívio não farmacológico (água, massagem, relaxamento) e farmacológico; quando a mulher pede analgesia, ela é feita em qualquer dilatação.|q-usprp2022-048,q-sirio2027-061,q-sirio2027-062]] [[Acompanhante de escolha e doula podem ficar juntos; mobilidade e posições verticais ajudam a progressão.|q-usprp2023-025,q-sessp2023-054]] [[Na maioria das cardiopatias, e na covid, a via de parto não muda: o parto vaginal com analgesia precoce reduz a sobrecarga cardíaca; as exceções (aorta muito dilatada, insuficiência cardíaca refratária, anticoagulante oral no trabalho de parto, hipertensão pulmonar grave) se decidem em equipe.|q-fmabc2023-066,q-einstein2021-040]] A cesárea anterior, por si só, também não muda a assistência quando o trabalho de parto evolui bem.`,
          texto: `- Amniotomia: indicada na **falha de progressão**, não de rotina. {q-unifesp2024-058}
- Toque a cada **4 horas** no primeiro período fisiológico. {q-sessp2022-080,q-famerp2026-025}
- Com ocitocina, ausculta mais frequente (a cada **15 minutos**). {q-einstein2023-059}
- Pediu analgesia: **fazer**, mesmo com plano de parto que não a previa. {q-usprp2022-048}
- Cólica intensa em trabalho de parto: **analgesia peridural** (bupivacaína). {q-sirio2027-062}
- Imersão em água, relaxamento, acupuntura e TENS têm evidência de alívio. {q-sirio2027-061}
- Esposa e doula juntas: **permitir**. {q-usprp2023-025}
- Sem progressão com feto bem: ausculta intermitente, **caminhada e posições verticais**. {q-sessp2023-054}
- Prótese valvar em classe I: **analgesia precoce**, monitorização e profilaxia de endocardite. {q-fmabc2023-066}
- Covid sem gravidade: **monitorar e aguardar** a evolução. {q-einstein2021-040}
- Cesárea anterior com evolução normal: **assistência habitual**. {q-usprp2022-050}` },
        { id: "ast-segundo", titulo: "Período expulsivo", conferir: true, diretrizes: ["oms-intraparto","ms-parto-normal"],
          questoes: ["q-adap24-074","q-udisc20262-082","q-unesp2023-029","q-sessp2023-058","q-usprp2026-075","q-usprp2023-027","q-uspsp1-096","q-einstein2021-035","q-sirio2022-065","q-fmabc2025-074"],
          prosa: `[[Kristeller (pressão no fundo do útero) e episiotomia de rotina não se fazem: aumentam lesão sem benefício; puxos dirigidos com apneia também não.|q-adap24-074,q-fmabc2025-074]] [[As posições verticais usam a gravidade, comprimem menos a aorta e a cava e deixam a contração mais eficiente.|q-sessp2023-058]] [[Enquanto a descida progride e o feto está bem, o tempo do expulsivo se respeita; com analgesia, ele pode durar mais.|q-usprp2026-075,q-usprp2023-027,q-uspsp1-096,q-unesp2023-029]] [[A episiotomia mediolateral corta o bulbocavernoso e o transverso superficial do períneo; o bloqueio do pudendo se faz palpando a espinha isquiática.|q-einstein2021-035,q-sirio2022-065]]`,
          texto: `- Diretriz nacional: **posição escolhida pela mulher e puxos espontâneos**. {q-adap24-074,q-udisc20262-082}
- Kristeller, episiotomia de rotina: **não**; fórcipe só com **dilatação total**. {q-fmabc2025-074}
- Posições verticais: gravidade, **menos compressão aortocava**, contração mais eficiente. {q-sessp2023-058}
- Expulsivo de 30 min, OEA em +2, feto bem: **aguardar**. {q-unesp2023-029}
- Expulsivo arrastado com feto bem: **respeitar o tempo fisiológico**. {q-usprp2026-075}
- 41 semanas, expulsivo dentro do limite: **mais 1 hora**. {q-usprp2023-027}
- 2 h de expulsivo com analgesia, desacelerações precoces: **mais 1 hora** com cardiotocografia contínua. {q-uspsp1-096}
- Episiotomia mediolateral: **bulbocavernoso e transverso superficial**. {q-einstein2021-035}
- Bloqueio do pudendo: palpar a **espinha isquiática**. {q-sirio2022-065}` },
        { id: "ast-terceiro", titulo: "Dequitação, clampeamento e inversão uterina", conferir: true, diretrizes: ["oms-intraparto"],
          questoes: ["q-amrigs2023-047","q-amrigs2024-049","q-famerp2025-024","q-sirio2023-078","q-uspsp4-042","q-famerp2025-017","q-famerp2022-041"],
          prosa: `[[O manejo ativo do terceiro período é a ocitocina para todas (10 UI IM ou IV) logo após o nascimento, porque a contração firme fecha os vasos do leito placentário; a tração controlada do cordão é opcional e só com profissional treinado.|q-amrigs2024-049,q-famerp2025-024,q-sirio2023-078]] [[O clampeamento tardio (não antes de 1 minuto) passa sangue da placenta ao recém-nascido e reduz anemia.|q-amrigs2023-047]] [[Placenta que não sai em 30–60 minutos após ocitocina pede extração manual sob anestesia.|q-uspsp4-042]] [[Na inversão uterina, o fundo some à palpação, há dor e choque desproporcional ao sangramento; tenta-se repor manualmente (Taxe) e, se falhar, Huntington por laparotomia.|q-famerp2022-041,q-famerp2025-017]]`,
          texto: `- Ocitocina **10 UI** IM ou IV para prevenir hemorragia, em todo parto. {q-amrigs2024-049,q-famerp2025-024}
- Conduta ativa: **uterotônico de rotina**. {q-sirio2023-078}
- Clampeamento **tardio** no recém-nascido vigoroso, a termo e pré-termo. {q-amrigs2023-047}
- Placenta retida **40 minutos** sem laceração: **bloqueio espinhal e extração manual**. {q-uspsp4-042}
- Choque, dor e "fuga da matriz": **inversão uterina aguda**. {q-famerp2022-041}
- Inversão sem resposta a Taxe: **operação de Huntington**. {q-famerp2025-017}` },
        { id: "ast-robson", titulo: "Classificação de Robson",
          questoes: ["q-scmsp2022-051","q-sessp2022-072","q-sessp2023-051"],
          prosa: `[[Robson divide as gestantes em 10 grupos mutuamente exclusivos por paridade, cesárea anterior, número de fetos, apresentação, idade gestacional e início do trabalho de parto, para comparar taxas de cesárea entre serviços.|q-scmsp2022-051,q-sessp2022-072,q-sessp2023-051]] Os grupos 1 e 2 são nulíparas a termo, cefálicas, em trabalho espontâneo (1) ou induzido/cesárea antes do trabalho (2); 3 e 4 são o mesmo para multíparas sem cesárea; 5 é qualquer multípara com cesárea anterior; 6 e 7 são pélvicas; 8 é gemelar; 9, situação transversa ou oblíqua; 10, pré-termo cefálico.`,
          texto: `- Multípara com **uma cesárea anterior**, a termo, cefálica: **grupo 5**. {q-scmsp2022-051}
- Grupo 4: multípara sem cesárea, termo, cefálica, **induzida ou cesárea antes do trabalho**. {q-sessp2022-072}
- **Gemelar**: grupo 8. {q-sessp2023-051}` },
      ],
    },
    {
      id: "partograma", titulo: "Partograma e distocias",
      introducao: `[[O partograma registra dilatação e descida contra o tempo na fase ativa; a linha de alerta marca a dilatação esperada de 1 cm por hora, e a de ação fica 4 horas à direita.|q-fmabc2023-068,q-sirio2021-080,q-uspsp1-093,q-unicampdis2022-048]] Cruzar a linha de alerta pede atenção, não intervenção automática: a OMS de 2018 deixou de usar 1 cm/h como limite para agir.

[[A distocia funcional é do motor: contrações poucas, fracas ou incoordenadas; corrige-se com amniotomia, ocitocina e analgesia.|q-famerp2022-046,q-famema2022-045,q-amrigs2023-060]] [[A distocia mecânica é do canal ou do feto: com contrações eficazes, a cabeça não desce, forma bossa e cavalga suturas; a ocitocina não resolve, e insistir leva à rotura uterina.|q-adap24-075,q-unifesp2024-059,q-famema2022-044]]`,
      fragmentos: [
        { id: "par-leitura", titulo: "Ler o partograma",
          figuras: [{ arquivo: "figuras/partograma.svg", legenda: "Esquema autoral: linhas de alerta e de ação e o desenho de cada distocia." }],
          questoes: ["q-fmabc2023-068","q-sirio2021-080","q-uspsp1-093","q-unicampdis2022-048","q-usprp2021-056"],
          casos: ["q-sirio2021-080","q-usprp2021-056"],
          prosa: `[[A dilatação que segue à esquerda da linha de alerta, com descida progressiva, é trabalho de parto eutócico; o que muda a conduta, mesmo assim, é a vitalidade fetal.|q-sirio2021-080,q-unicampdis2022-048,q-usprp2021-056,q-uspsp1-093]]`,
          texto: `- Partograma: preenchido em trabalho de parto, linhas de alerta e ação **só na fase ativa**. {q-fmabc2023-068}
- Triângulos subindo de forma progressiva: **dilatação fisiológica**. {q-sirio2021-080}
- Evolução dentro das linhas: **trabalho de parto eutócico**. {q-unicampdis2022-048,q-uspsp1-093}
- Partograma normal com cardiotocografia alterada: eutócico com **suspeita de sofrimento fetal**. {q-usprp2021-056}` },
        { id: "par-dilatacao", titulo: "Distocias da dilatação",
          questoes: ["q-adap22-032","q-adap26-054","q-famema2022-045","q-famema2023-051","q-tp20231-083","q-tp20232-083","q-tp20261-083","q-tp20241-082","q-tp20251-083","q-famerp2022-046","q-famerp2022-043","q-famerp2023-044","q-fmabc2023-069","q-uspsp1-088","q-amrigs2023-060","q-usprp2025-047","q-unicampdis2024-101"],
          casos: ["q-tp20232-083","q-uspsp1-088"],
          prosa: `[[Fase ativa prolongada é dilatação mais lenta que o esperado, cruzando a linha de alerta; a causa costuma ser contração ineficaz, e a conduta é corrigir o motor: amniotomia se a bolsa está íntegra, ocitocina, analgesia e posição.|q-adap22-032,q-famerp2022-046,q-tp20241-082,q-tp20251-083,q-usprp2025-047,q-unicampdis2024-101,q-fmabc2023-069,q-uspsp1-088]] [[Parada secundária da dilatação é a mesma dilatação em dois toques com 2 horas de intervalo na fase ativa: com bolsa íntegra, amniotomia; com bolsa rota e contrações boas, é desproporção e a saída é cesárea.|q-tp20232-083,q-tp20261-083,q-famema2022-045,q-adap26-054,q-tp20231-083]] [[A ocitocina encurta o trabalho de parto, mas não muda o tipo de parto.|q-famerp2022-043]] [[A amniotomia se faz entre contrações, com a apresentação apoiada, perfurando a bolsa às 12 horas do relógio.|q-famema2023-051]]`,
          texto: `- Dilatação lenta com contrações fracas: **amniotomia e ocitocina**, com vigilância. {q-adap22-032,q-tp20241-082,q-tp20251-083,q-usprp2025-047}
- Fase ativa prolongada: causa típica, **contrações ineficazes**. {q-famerp2022-046}
- Parada secundária da dilatação com bolsa íntegra: **amniotomia**. {q-tp20232-083,q-tp20261-083,q-famema2022-045}
- Parada com bolsa rota, boas contrações e bossa: **cesárea**. {q-adap26-054,q-tp20231-083}
- Distocia funcional na multípara (41 sem, cesárea prévia por pélvica): **ocitocina EV**. {q-unicampdis2024-101}
- Distocia de dilatação: **analgesia** e ocitocina se preciso. {q-fmabc2023-069,q-uspsp1-088}
- Ocitocina: encurta, **não decide a via**. {q-famerp2022-043}
- Amniotomia: perfurar às **12 horas**. {q-famema2023-051}
- Incoordenação e inversão do gradiente: **decúbito lateral, ocitocina/amniotomia, analgesia e sedação**. {q-amrigs2023-060}
- Partograma da banca: "desproporção relativa" corrigida com **ocitocina**. {q-famerp2023-044}` },
        { id: "par-descida", titulo: "Distocias da descida e parto precipitado",
          questoes: ["q-iamspe2025-056","q-tp20202-092","q-tp20222-083","q-famema2022-044","q-famerp2026-032","q-fmabc2021-056","q-famerp2024-035","q-unicampdis2023-040","q-unesp2024-024","q-amrigs2021-043"],
          casos: ["q-tp20202-092"],
          prosa: `[[Parada secundária da descida é a apresentação no mesmo plano em dois toques com 1 hora de intervalo, com dilatação total; a pergunta é se há desproporção: com cabeça alta, bossa e contrações boas, cesárea; com a cabeça baixa e só a rotação faltando (occipito-transversa), rotação manual ou fórcipe.|q-iamspe2025-056,q-famema2022-044,q-famerp2026-032,q-tp20202-092,q-tp20222-083,q-unicampdis2023-040,q-famerp2024-035,q-fmabc2021-056]] [[O parto precipitado (menos de 4 horas) traz contrações fortes demais: lacera o trajeto, causa atonia depois e hipóxia fetal.|q-unesp2024-024,q-amrigs2021-043]]`,
          texto: `- Mesmo plano em toques seguidos com dilatação total: **parada secundária da descida**. {q-iamspe2025-056,q-fmabc2021-056}
- Diante dela: avaliar **desproporção cefalopélvica**. {q-famema2022-044}
- Parada da descida, parturiente exausta, plano alto: **cesárea**. {q-tp20202-092,q-tp20222-083,q-famerp2026-032,q-unicampdis2023-040}
- Parada em **occipito-transversa** baixa: **rotação manual**. {q-famerp2024-035}
- Parto precipitado: **hipotonia uterina e laceração**, sofrimento fetal. {q-unesp2024-024,q-amrigs2021-043}` },
        { id: "par-dcp", titulo: "Desproporção, iminência de rotura e rotura uterina",
          questoes: ["q-adap24-075","q-unifesp2024-059","q-usp2022-100","q-usp2026-100","q-famerp2025-019","q-einstein2022-051","q-iamspe2023-063"],
          casos: ["q-usp2026-100","q-usp2022-100"],
          prosa: `[[O útero que contrai contra um obstáculo afina o segmento inferior e engrossa o corpo; o anel entre os dois sobe (sinal de Bandl), os ligamentos redondos ficam tensos (Frommel) e o útero toma forma de ampulheta: é a iminência de rotura, e a conduta é parar a ocitocina e fazer cesárea.|q-famerp2025-019,q-einstein2022-051,q-usp2026-100,q-usp2022-100]] [[Na rotura consumada, as contrações param, a apresentação sobe, a dor muda e o feto sofre ou morre; cesárea/laparotomia imediata.|q-iamspe2023-063]] [[Bossa volumosa e cavalgamento de suturas são o sinal ao toque da desproporção cefalopélvica.|q-adap24-075,q-unifesp2024-059]]`,
          texto: `- Bossa serossanguínea e cavalgamento: **desproporção cefalopélvica**. {q-adap24-075,q-unifesp2024-059}
- Parada em 8 cm com 5 contrações fortes e o abdome da figura: **cesárea**. {q-usp2022-100}
- Dilatação total, plano 0, anel de Bandl: **iminência de rotura, cesárea**. {q-usp2026-100,q-famerp2025-019}
- Útero em ampulheta: **parar a ocitocina**. {q-einstein2022-051}
- Cesárea prévia, dor, sangramento e parada das contrações: **rotura uterina**, cesárea. {q-iamspe2023-063}` },
      ],
    },
    {
      id: "vitalidade", titulo: "Vitalidade fetal no parto",
      introducao: `[[A cardiotocografia intraparto lê a oxigenação do feto pela frequência: linha de base de 110 a 160 bpm, variabilidade moderada (6–25 bpm) e acelerações indicam feto bem oxigenado.|q-adap25-080,q-famema2022-042]] [[As desacelerações contam a causa: a precoce espelha a contração e vem da compressão da cabeça (reflexo vagal), benigna; a tardia começa depois do pico e indica insuficiência uteroplacentária; a variável, em V, é compressão do cordão.|q-usp2025-012,q-adap25-080,q-usprp2025-045]]

Traçado suspeito (categoria II) pede ressuscitação intrauterina: decúbito lateral esquerdo, hidratação, suspender a ocitocina e, se preciso, tocólise aguda. Patológico que não melhora, ou bradicardia prolongada, pede nascimento pela via mais rápida.`,
      fragmentos: [
        { id: "vit-ctg", titulo: "Cardiotocografia, ressuscitação e prolapso de cordão", conferir: true, diretrizes: ["ms-parto-normal"],
          questoes: ["q-adap25-080","q-famema2022-042","q-usp2025-012","q-usprp2025-045","q-adap21-056","q-fmabc2026-069"],
          casos: ["q-usp2025-012","q-adap25-080"],
          prosa: `[[No prolapso de cordão, o cordão preso entre a apresentação e a pelve deixa o feto sem sangue: eleva-se a apresentação com a mão e se faz cesárea de emergência, sem tentar recolocar o cordão.|q-adap21-056,q-fmabc2026-069]]`,
          texto: `- Variabilidade mínima e desacelerações com ocitocina: **ressuscitação intrauterina** antes de decidir. {q-adap25-080}
- Traçado suspeito: **ressuscitação intrauterina e repetir**. {q-famema2022-042}
- Desaceleração precoce: **reflexo vagal** (compressão do polo cefálico). {q-usp2025-012}
- Traçado patológico com 7 cm em indução: **cesárea**. {q-usprp2025-045}
- Cordão pulsátil na vagina com bradicardia: **elevar a apresentação** e cesárea. {q-adap21-056,q-fmabc2026-069}` },
      ],
    },
    {
      id: "operatorio", titulo: "Parto operatório, distocia de ombro e pélvica",
      introducao: `[[O parto vaginal operatório (fórcipe ou vácuo) abrevia o expulsivo quando o feto sofre ou a mãe não consegue fazer força; exige dilatação total, bolsa rota, cabeça insinuada (plano +2 ou mais), variedade conhecida e ausência de desproporção.|q-adap21-052,q-unifesp2022-034,q-uspsp1-094,q-uspsp5-039,q-einstein2026-053]] [[O fórcipe de Simpson é de tração (e rotação até 45°); o de Kielland, reto, faz rotações largas e corrige assinclitismo; o de Piper serve à cabeça derradeira da pélvica.|q-amrigs2023-056,q-famema2023-053,q-sessp2022-073,q-fmabc2025-079]]

[[Na distocia de ombro, o ombro anterior prende atrás da sínfise; a cabeça sai e volta contra o períneo (sinal da tartaruga). Tração forte lesa o plexo braquial; o que resolve é mudar a relação da bacia com o ombro.|q-usp2024-111,q-adap22-034,q-simepm89-028]]`,
      fragmentos: [
        { id: "ope-forcipe", titulo: "Fórcipe e vácuo",
          questoes: ["q-adap21-052","q-unifesp2022-034","q-unifesp2025-080","q-scmsp2021-073","q-scmsp2022-053","q-amrigs2023-056","q-iamspe2022-060","q-famema2023-053","q-sessp2023-055","q-uspsp1-094","q-uspsp5-039","q-einstein2026-053","q-unicampdis2024-102"],
          casos: ["q-unicampdis2024-102"],
          prosa: `[[Com a cabeça baixa, a via mais rápida é a vaginal: em +2/+3, bradicardia ou desacelerações tardias pedem fórcipe ou vácuo, não cesárea.|q-unifesp2022-034,q-einstein2026-053,q-adap21-052,q-unifesp2025-080]] [[A escolha do fórcipe depende da rotação: OEA pede Simpson com 45°; transversas pedem Kielland com 90°.|q-scmsp2021-073,q-scmsp2022-053,q-unicampdis2024-102]] [[Nas posteriores oblíquas, rodar 135° com Simpson exige a dupla pega de Scanzoni.|q-iamspe2022-060]]`,
          texto: `- Expulsivo prolongado com sofrimento fetal, +3: **fórcipe ou vácuo**. {q-adap21-052,q-unifesp2022-034,q-einstein2026-053}
- Exaustão materna em +3 após 4 h: **vácuo ou fórcipe**. {q-unifesp2025-080}
- Expulsivo prolongado em multípara analgesiada, +2: avaliar **fórcipe de alívio ou vácuo**. {q-uspsp5-039,q-uspsp1-094}
- OEA em +2 com bradicardia: **Simpson, 45° anti-horário**. {q-scmsp2021-073}
- OET com bradicardia: **Kielland**. {q-scmsp2022-053}
- ODT fixa em +2 com traçado patológico: **Kielland**. {q-unicampdis2024-102}
- Assinclitismo: **Kielland**, reto, ideal para rotações. {q-amrigs2023-056,q-famema2023-053}
- Dupla pega de **Scanzoni**: posteriores oblíquas, 135° com Simpson. {q-iamspe2022-060}
- Fórcipe também na **pélvica** (cabeça derradeira). {q-sessp2023-055}` },
        { id: "ope-ombro", titulo: "Distocia de ombro", conferir: true, diretrizes: ["rcog-ombro"],
          figuras: [{ arquivo: "figuras/distocia-ombro.svg", legenda: "Esquema autoral: a sequência de manobras na distocia de ombro." }],
          questoes: ["q-adap22-034","q-usp2022-096","q-usp2024-111","q-famema2022-041","q-famerp2022-044","q-simepm89-028","q-sirio2025-077","q-fmabc2024-074","q-fmabc2026-065","q-einstein2027-051"],
          casos: ["q-usp2024-111","q-usp2022-096"],
          prosa: `[[O risco vem da macrossomia, sobretudo no diabetes, mas a maioria acontece em fetos de peso normal.|q-adap22-034,q-famema2022-041,q-usp2022-096]] Reconhecida a distocia, chama-se ajuda e não se traciona com força nem se empurra o fundo do útero. [[A primeira manobra é McRoberts (hiperflexão das coxas, que retifica o sacro e gira a sínfise) com pressão suprapúbica, nunca no fundo do útero; se falhar, retirar o braço posterior ou fazer as rotações internas (Rubin, Woods), e a posição de quatro apoios (Gaskin).|q-simepm89-028,q-sirio2025-077,q-einstein2027-051,q-fmabc2024-074,q-fmabc2026-065,q-famerp2022-044]]`,
          texto: `- Cabeça que sai e retrai contra o períneo: **distocia de ombro**. {q-usp2024-111,q-famema2022-041}
- Primeira manobra: **McRoberts com pressão suprapúbica**. {q-adap22-034,q-usp2022-096,q-simepm89-028,q-sirio2025-077}
- McRoberts e suprapúbica falharam: **braço posterior**. {q-einstein2027-051}
- Woods: rotação do **ombro posterior**. {q-fmabc2026-065}
- Manobras aceitas: McRoberts, Rubin, Jacquemier, **Gaskin**. {q-fmabc2024-074}
- Opção imediata citada pela banca: **quatro apoios**. {q-famerp2022-044}` },
        { id: "ope-pelvica", titulo: "Apresentação pélvica e córmica",
          questoes: ["q-amrigs2020-046","q-sessp2022-073","q-sessp2022-074","q-sessp2025-080","q-fmabc2025-079","q-usprp2025-046","q-uspsp2-046","q-sirio2025-067","q-didepm-053","q-sirio2024-066"],
          prosa: `[[Na pélvica, o polo mais volumoso (a cabeça) sai por último, sem tempo de moldar; por isso a mortalidade perinatal é maior e, em primigesta, feto grande ou prematuro extremo, indica-se cesárea.|q-amrigs2020-046,q-usprp2025-046,q-uspsp2-046]] [[A versão cefálica externa, a partir de 37 semanas, dá certo em cerca de dois terços e reduz cesárea; se falha, cesárea eletiva com 39 semanas.|q-sessp2022-074,q-didepm-053]] [[No parto pélvico, Bracht desprende ombros e cabeça; a cabeça derradeira retida pede o fórcipe de Piper.|q-sessp2025-080,q-sessp2022-073,q-fmabc2025-079]] [[Braço prolapsado com dilatação avançada é apresentação córmica: cesárea.|q-sirio2025-067]] [[A incisão uterina segmentar transversa é a padrão, mesmo em cesárea iterativa de feto pélvico.|q-sirio2024-066]]`,
          texto: `- Pélvica: maior mortalidade; **primigesta, feto grande, prematuro extremo** = cesárea. {q-amrigs2020-046}
- Primigesta pélvica a termo: **cesárea**. {q-usprp2025-046}
- Pélvica completa em fase ativa: **cesárea**. {q-uspsp2-046}
- Versão externa: sucesso em **2/3**, metade menos cesárea. {q-sessp2022-074}
- Pélvica com 37 sem, sem contraindicação: **oferecer versão**; falhou, cesárea com 39 sem. {q-didepm-053}
- Bracht: **ombros e cabeça**. {q-sessp2025-080}
- Cabeça derradeira: **Piper**. {q-sessp2022-073,q-fmabc2025-079}
- Braço insinuado: **cesárea**. {q-sirio2025-067}
- Incisão uterina: **segmentar transversa**. {q-sirio2024-066}` },
      ],
    },
    {
      id: "inducao", titulo: "Indução, pós-datismo e cesárea anterior",
      introducao: `[[Induzir é provocar o trabalho de parto quando continuar a gestação é pior que nascer; o índice de Bishop (dilatação, apagamento, altura, consistência e posição do colo) prediz o sucesso: colo desfavorável primeiro amadurece (prostaglandina ou sonda de Foley), colo favorável vai direto à ocitocina.|q-iamspe2022-063,q-usp2023-108,q-usp2022-099,q-usp2025-019]] [[Na cesárea anterior, prostaglandina eleva o risco de rotura; prepara-se o colo com sonda de Foley e se acompanha com monitorização contínua.|q-adap23-059,q-tp20261-055,q-fmabc2026-070]]

[[A vitalidade se vigia a partir de 40 semanas e se oferece indução a partir de 41, porque a placenta envelhece e o oligodrâmnio aparece.|q-scmsp2022-059,q-unifesp2022-032]]`,
      fragmentos: [
        { id: "ind-metodos", titulo: "Métodos e contraindicações", conferir: true, diretrizes: ["acog-inducao","ms-alto-risco"],
          questoes: ["q-adap23-059","q-iamspe2022-063","q-usp2023-108","q-tp20261-055","q-fmabc2025-076","q-amrigs2025-056","q-fmabc2026-070","q-sirio2027-068"],
          prosa: `[[O que contraindica o parto vaginal contraindica a indução: herpes genital ativo, placenta prévia, duas ou mais cesáreas (para muitas bancas), cicatriz corporal.|q-fmabc2025-076,q-sirio2027-068]] [[No óbito fetal, sem cicatriz uterina, induz-se com misoprostol.|q-amrigs2025-056]]`,
          texto: `- Cesárea anterior, 41 sem, Bishop 3: **sonda de Foley**. {q-adap23-059,q-tp20261-055}
- Dinoprostona: remover o pessário em **taquissistolia ou hipertonia**. {q-iamspe2022-063}
- Hipertensa com feto pequeno, colo desfavorável: **prostaglandina**. {q-usp2023-108}
- Herpes com lesões: **não induzir** (cesárea). {q-fmabc2025-076}
- Duas cesáreas, em trabalho de parto: **cesárea**. {q-sirio2027-068}
- Feto sem movimentos, Bishop 4, sem cicatriz: **misoprostol vaginal**. {q-amrigs2025-056}
- Trabalho de parto após cesárea: **monitorização contínua** e cesárea disponível. {q-fmabc2026-070}` },
        { id: "ind-posdatismo", titulo: "Pós-datismo", conferir: true, diretrizes: ["ms-alto-risco"],
          questoes: ["q-unifesp2022-032","q-scmsp2022-059","q-usp2022-099","q-usp2025-019"],
          casos: ["q-usp2022-099"],
          prosa: `[[Oligodrâmnio ou cardiotocografia não reativa no pós-datismo pedem resolver a gestação; o colo decide o método.|q-usp2022-099,q-unifesp2022-032,q-usp2025-019]]`,
          texto: `- Vigilância de vitalidade a partir de **40 semanas**. {q-scmsp2022-059}
- 41 sem, traçado não reativo: prolongar o traçado e **preparar o colo com misoprostol**. {q-unifesp2022-032}
- ILA 4,6 cm com colo desfavorável: **prostaglandina**. {q-usp2022-099}
- Colo com 4 cm na multípara pós-data: **ocitocina**. {q-usp2025-019}` },
      ],
    },
    {
      id: "prematuro", titulo: "Prematuro, rotura de membranas e estreptococo do grupo B",
      introducao: `Este capítulo traz o essencial; o dono do tema é **Parto pré-termo e rotura de membranas**. [[Entre 24 e 34 semanas, o trabalho de parto prematuro recebe corticoide (amadurece o pulmão), tocólise por 48 horas para dar tempo ao corticoide, sulfato de magnésio abaixo de 32 semanas (neuroproteção) e profilaxia para estreptococo do grupo B.|q-adap21-058,q-unesp2023-028,q-usprp2025-048]] [[Na rotura prematura sem infecção, a conduta é expectante com corticoide e antibiótico de latência, que prolonga a gestação.|q-adap22-035,q-scmsp2025-075,q-scmsp2026-065]]

[[A febre com taquicardia fetal, útero doloroso e líquido fétido é infecção intra-amniótica: antibiótico de largo espectro e nascimento, de preferência vaginal; não se inibe o parto.|q-adap26-056,q-fmabc2026-068,q-usprp2023-028,q-usp2024-120]] [[O estreptococo do grupo B, colonizando a vagina, contamina o recém-nascido na passagem; a penicilina intraparto, por 4 horas antes do nascimento, protege.|q-unifesp2026-056,q-uspsp1-092]]`,
      fragmentos: [
        { id: "pre-tpp", titulo: "Trabalho de parto prematuro", conferir: true, diretrizes: ["ms-alto-risco"],
          questoes: ["q-adap21-058","q-unesp2023-028","q-usprp2025-048","q-amrigs2022-047","q-iamspe2025-053","q-iamspe2023-060","q-usprp2021-058"],
          texto: `- 30 sem em trabalho de parto: **nifedipino 48 h, corticoide, magnésio** e profilaxia do estreptococo. {q-adap21-058}
- 32–33 sem com 4 cm: **corticoide, tocólise e antibioticoprofilaxia**. {q-unesp2023-028,q-usprp2025-048}
- Tocolíticos: **beta-2 e inibidores da COX** (magnésio não). {q-amrigs2022-047}
- Multiparidade **não** é fator de risco. {q-iamspe2025-053}
- 22 sem, colo curto e dilatando com antecedente de prematuro: **cerclagem de urgência**. {q-iamspe2023-060}
- 29 sem, pélvico com 6 cm após corticoide: **penicilina, magnésio e cesárea**. {q-usprp2021-058}` },
        { id: "pre-rpmo", titulo: "Rotura prematura e infecção intra-amniótica", conferir: true, diretrizes: ["ms-alto-risco"],
          questoes: ["q-adap22-035","q-scmsp2025-075","q-scmsp2026-065","q-unifesp2023-059","q-usp2024-119","q-usp2024-120","q-usprp2023-028","q-adap26-056","q-fmabc2026-068"],
          texto: `- Rotura com 32–33 sem: **expectante, corticoide e antibiótico**. {q-adap22-035,q-scmsp2025-075,q-scmsp2026-065}
- Ampicilina: **48 horas**; reiniciar se entrar em trabalho de parto. {q-usp2024-119}
- Rotura com dor, leucocitose e PCR alta: **parto imediato**. {q-usp2024-120}
- 27 sem, pélvico, em trabalho de parto com EGB positivo: **ampicilina e magnésio** e parto. {q-unifesp2023-059}
- Infecção com EGB positivo: **clindamicina, penicilina e indução**. {q-usprp2023-028}
- Corioamnionite a termo: **ampicilina e gentamicina** e parto vaginal. {q-adap26-056}
- Latente longa com líquido turvo e taquicardia fetal: **indução e antibiótico**. {q-fmabc2026-068}` },
        { id: "pre-egb", titulo: "Profilaxia do estreptococo do grupo B", conferir: true, diretrizes: ["acog-gbs"],
          questoes: ["q-unifesp2026-056","q-usp2026-112","q-usprp2022-045","q-usprp2026-078","q-unicamp2022-052","q-uspsp1-092","q-unesp2026-021"],
          prosa: `[[A profilaxia vale para cultura positiva, bacteriúria pelo estreptococo na gestação, filho anterior com doença, ou cultura desconhecida com prematuridade, bolsa rota há 18 horas ou febre; a bacteriúria indica profilaxia mesmo com cultura vaginal negativa.|q-unifesp2026-056,q-uspsp1-092,q-usp2026-112,q-usprp2022-045,q-unesp2026-021]] A droga de escolha é a penicilina cristalina (5 milhões UI e depois 2,5 a 3 milhões a cada 4 horas).`,
          texto: `- Infecção urinária pelo estreptococo na gestação: **penicilina cristalina**, mesmo com cultura negativa. {q-unifesp2026-056}
- Filho anterior com sepse por EGB: **profilaxia**. {q-uspsp1-092}
- Pré-termo em trabalho de parto, cultura desconhecida: **profilaxia**. {q-usp2026-112,q-usprp2022-045,q-unesp2026-021}
- Cultura colhida há **mais de 5 semanas**: perde validade; profilaxia. {q-usprp2026-078}
- Bolsa rota a termo, cultura desconhecida: iniciar profilaxia se a rotura chegar a **18 h** (a banca: iniciar em 6 h). {q-unicamp2022-052}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-amrigs2023-047","q-amrigs2024-049","q-famerp2025-024","q-einstein2021-037","q-famerp2023-044","q-unicamp2022-052","q-famerp2022-044"],
          texto: `- Clampeamento: a OMS 2018 pede **não antes de 1 minuto**; o gabarito aceitou **30 a 60 segundos**. {q-amrigs2023-047}
- Ocitocina: a OMS fala em **após o nascimento**; as bancas usaram **ombro anterior** e **ombro posterior**. {q-amrigs2024-049,q-famerp2025-024}
- Fase ativa: **5 cm** (OMS 2018); a prova aceitou **4 a 6 cm**. {q-einstein2021-037}
- Desproporção absoluta não se trata com ocitocina; o gabarito chamou de **"relativa"** e indicou ocitocina. {q-famerp2023-044}
- Bolsa rota a termo com cultura desconhecida: profilaxia aos **18 h** de rotura; o gabarito antecipou para **6 h**. {q-unicamp2022-052}
- Distocia de ombro: a sequência começa por **McRoberts**; o gabarito pôs **quatro apoios** como primeira. {q-famerp2022-044}` },
      ],
    },
  ],
});
