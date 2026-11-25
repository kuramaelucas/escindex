/* resumos/cabeca-e-pescoco/resumo.js — resumo adaptativo de cabeça e pescoço: câncer de boca, orofaringe
   e laringe, massa cervical (no adulto e na criança), glândulas salivares, tireoide (sobrediagnóstico,
   tipos), anatomia cervical cirúrgica, trauma nasal e de face, estenose traqueal, traqueostomia e
   hemoptise maciça. Assuntos: ass-cabecapescoco (principal), ass-orl-glandulas, ass-orl-fratura,
   ass-cirtorax-viaaerea. Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- cabeca-e-pescoco */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "cabeca-e-pescoco",
  titulo: "Cabeça e pescoço, face e via aérea central",
  assunto: "ass-cabecapescoco",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "nccn-cp", texto: "NCCN — Head and Neck Cancers (2025); INCA — câncer de boca", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "tumores", titulo: "Câncer de cabeça e pescoço e massa cervical",
      introducao: `[[Quase todo câncer da boca, faringe e laringe é **carcinoma espinocelular**, causado por **tabaco e álcool** (que se potencializam). Na boca, o lugar mais comum é a **borda lateral da língua** (e o assoalho): **úlcera indolor** que não cicatriza em 2–3 semanas pede biópsia. Na **orofaringe** (amígdala, base da língua) de pessoas jovens **sem tabaco nem álcool**, a causa é o **HPV** (tipo 16), com prognóstico melhor. Rouquidão por mais de 2–3 semanas no fumante é **câncer de laringe** até a laringoscopia dizer o contrário.|q-usp2023-013,q-usprp2025-097,q-unesp2026-067]]

Veja também: **Tireoide** (nódulo), **Neoplasias hematológicas** (linfoma), **Vias aéreas superiores**, **Atendimento ao politraumatizado** (via aérea) e **Bronquiectasias** (no resumo de DPOC).`,
      fragmentos: [
        { id: "tum-boca-massa", titulo: "Boca, orofaringe e o nódulo cervical do adulto", conferir: true, diretrizes: ["nccn-cp"],
          questoes: ["q-usp2023-013","q-usprp2025-097","q-unesp2026-067","q-einstein2026-020","q-fmabc2021-015","q-usprp2026-017","q-udisc20262-080"],
          prosa: `[[Nódulo cervical **no adulto** que persiste por mais de 2–3 semanas, **cresce**, é **endurecido ou fixo**, maior que 1,5 cm, num tabagista ou com sintomas B, é **neoplasia até prova em contrário**: examinar a mucosa (procurar o primário), fazer imagem e punção. Febre, sudorese e emagrecimento com conglomerado linfonodal no jovem: **linfoma** → **biópsia excisional** do linfonodo; na região cervical **posterior**, ela arrisca o **nervo acessório** (paralisia do trapézio, ombro caído).|q-einstein2026-020,q-fmabc2021-015,q-usprp2026-017]] [[Massa **pulsátil** na borda anterior do esternocleidomastóideo, **móvel lateralmente e fixa verticalmente**, na **bifurcação da carótida**: **paraganglioma (tumor do corpo carotídeo)** — cirurgia com preservação da bifurcação; nunca biopsiar.|q-udisc20262-080]]`,
          texto: `- Mais comum na boca: **borda da língua**; úlcera em tabagista etilista. {q-usp2023-013,q-usprp2025-097}
- Orofaringe sem tabaco: **HPV**. {q-unesp2026-067}
- Nódulo que cresce no adulto: **investigar**; jovem com sintomas B: **biópsia excisional** (linfoma). {q-einstein2026-020,q-fmabc2021-015}
- Biópsia cervical posterior: risco ao **nervo acessório**. {q-usprp2026-017}
- Massa pulsátil na bifurcação: **paraganglioma** → cirurgia. {q-udisc20262-080}` },
        { id: "tum-tireoide-anatomia", titulo: "Tireoide e anatomia cirúrgica do pescoço", conferir: true,
          questoes: ["q-fmabc2025-030","q-unicampdis2024-083","q-usprp2022-027","q-amrigs2025-022","q-uspsp4-054"],
          prosa: `[[O câncer de tireoide mais comum é o **papilífero** (células foliculares), em **mulheres** em torno dos 40 anos, com ótimo prognóstico. A incidência subiu muito em 40 anos com a mortalidade estável: é **sobrediagnóstico** de microcarcinomas achados no ultrassom.|q-fmabc2025-030,q-unicampdis2024-083]] [[Anatomia que a cirurgia não pode esquecer: a **artéria tireóidea inferior** vem do **tronco tireocervical** (subclávia) e cruza o **nervo laríngeo recorrente**; a superior, da carótida externa. O recorrente **esquerdo** contorna o arco aórtico. Lesado na tireoidectomia, deixa a prega vocal **imóvel em posição paramediana** e **rouquidão**. Anterior e inferior à traqueia, na base do pescoço, cruza o **tronco braquiocefálico**.|q-usprp2022-027,q-amrigs2025-022,q-uspsp4-054]]`,
          texto: `- Mais comum: **papilífero**, mulher; incidência sobe por **sobrediagnóstico**. {q-fmabc2025-030,q-unicampdis2024-083}
- Rouquidão após tireoidectomia: **laríngeo inferior (recorrente)**. {q-usprp2022-027}
- Tireóidea inferior: **tronco tireocervical**; vaso anterior à traqueia: **tronco braquiocefálico**. {q-amrigs2025-022,q-uspsp4-054}` },
        { id: "tum-salivares-crianca", titulo: "Glândulas salivares e massas cervicais da criança", conferir: true,
          questoes: ["q-unicampdis2024-015","q-unicampdis2025-064","q-usprp2024-022","q-famema2025-022","q-unicampdis2023-014","q-fmabc2022-042"],
          prosa: `[[Na **parótida**, 80% dos tumores são benignos, e o mais comum é o **adenoma pleomórfico**: nódulo endurecido, indolor, de crescimento **lento por anos**, abaixo do lóbulo da orelha — **parotidectomia** com preservação do **nervo facial** (cuja lesão deixa o olho sem fechar). **Paralisia facial** com tumor parotídeo que cresce rápido e ulcera é **maligno**. Dor e inchaço **submandibular ao comer** com boca seca: **sialolitíase** (a submandibular tem saliva espessa e ducto ascendente) — **tomografia** mostra o cálculo.|q-unicampdis2024-015,q-unicampdis2025-064,q-usprp2024-022,q-famema2025-022]] [[Na criança, massa **na linha média**, junto ao **hioide**, que **sobe ao engolir ou pôr a língua para fora** e incha depois de uma infecção: **cisto do ducto tireoglosso**; massa superficial mediana com conteúdo gorduroso: **cisto dermoide**; lateral, na borda do esternocleidomastóideo: cisto branquial.|q-unicampdis2023-014,q-fmabc2022-042]]`,
          texto: `- Nódulo parotídeo lento, indolor: **adenoma pleomórfico**; pós-parotidectomia: **facial**. {q-unicampdis2024-015,q-unicampdis2025-064}
- Úlcera pré-auricular + paralisia facial: primário na **parótida**. {q-usprp2024-022}
- Dor submandibular ao comer: **sialolitíase** → TC. {q-famema2025-022}
- Linha média junto ao hioide: **tireoglosso**; com gordura: **dermoide**. {q-unicampdis2023-014,q-fmabc2022-042}` },
      ],
    },
    {
      id: "face", titulo: "Trauma de nariz e face",
      introducao: `[[O nariz é o osso da face que mais quebra. O que não pode passar é o **hematoma de septo**: sangue entre a cartilagem e o pericôndrio, que nutre a cartilagem; em dias ela **necrosa** (nariz em sela) ou infecta (abscesso).|q-adap22-009,q-adap26-007]]`,
      fragmentos: [
        { id: "fac-nariz-face", titulo: "Hematoma de septo, fratura nasal e Le Fort", conferir: true,
          questoes: ["q-adap22-009","q-adap26-007","q-unifesp2022-009","q-unifesp2026-007","q-tp20241-073","q-fmabc2024-023"],
          prosa: `[[Depois de trauma nasal, **obstrução nasal total** com abaulamento das duas faces do septo: **hematoma septal** → **incisão e drenagem imediatas**, tamponamento bilateral e antibiótico. A **fratura nasal** com desvio se reduz **logo** (antes do edema) ou **depois que o edema baixa** (dias, até 2 semanas, antes de consolidar).|q-adap22-009,q-adap26-007,q-unifesp2022-009]] [[Trauma na órbita com **enoftalmia** e **olho que não se move** (o músculo reto inferior preso), rebordo íntegro: **fratura da órbita interna (blow-out)**. **Le Fort I**: o **palato e a arcada superior** soltam-se da maxila (horizontal, acima dos dentes); **II**: piramidal, inclui o nariz; **III**: disjunção craniofacial. Trauma facial grave com a via aérea comprometida e intubação impossível: **cricotireoidostomia**.|q-unifesp2026-007,q-tp20241-073,q-fmabc2024-023]]`,
          texto: `- Obstrução total após trauma nasal: **hematoma septal** → **drenar já**. {q-adap22-009,q-adap26-007}
- Fratura nasal: reduzir cedo ou quando o edema baixar. {q-unifesp2022-009}
- Enoftalmia + olho imóvel: **órbita interna**. {q-unifesp2026-007}
- Maxila solta acima dos dentes: **Le Fort I**; face grave sem intubação: **cricotireoidostomia**. {q-tp20241-073,q-fmabc2024-023}` },
      ],
    },
    {
      id: "via-aerea-central", titulo: "Estenose traqueal, traqueostomia e hemoptise",
      introducao: `[[O balonete do tubo comprime a mucosa traqueal contra a cartilagem; pressão alta por dias causa isquemia, úlcera e cicatriz: a **intubação prolongada** é a principal causa de **estenose laringotraqueal** adquirida. Semanas depois da alta da UTI, aparecem **dispneia progressiva e estridor**, muitas vezes tratados como "asma" que não responde a broncodilatador.|q-udisc20262-045,q-adap25-014,q-unicampdis2022-018,q-unicampdis2024-022]]`,
      fragmentos: [
        { id: "vac-estenose", titulo: "Estenose traqueal", conferir: true,
          questoes: ["q-udisc20262-045","q-adap25-014","q-unicampdis2022-018","q-unicampdis2024-022","q-unifesp2025-014"],
          prosa: `[[Ex-intubado com dispneia progressiva e estridor "refratário à asma": **broncoscopia** (e tomografia) para ver a estenose. Estenose **cicatricial, circunferencial, curta**: **ressecção do segmento e anastomose término-terminal** (traqueoplastia), o tratamento definitivo; dilatação e órtese (tubo T) são pontes.|q-adap25-014,q-unicampdis2022-018,q-unicampdis2024-022,q-unifesp2025-014,q-udisc20262-045]]`,
          texto: `- Causa principal: **intubação**. {q-udisc20262-045}
- Ex-intubado com "asma" refratária: **estenose traqueal**. {q-unicampdis2022-018,q-unicampdis2024-022}
- Estenose cicatricial curta: **ressecção e anastomose**. {q-adap25-014,q-unifesp2025-014}` },
        { id: "vac-traqueostomia", titulo: "Traqueostomia e hemoptise maciça", conferir: true,
          questoes: ["q-adap21-078","q-usprp2021-078","q-usprp2027-062","q-usprp2021-075","q-adap21-075"],
          prosa: `[[**Traqueostomia** no paciente com desmame difícil: reduz o espaço morto, melhora o conforto e a higiene brônquica, facilita o desmame e poupa a laringe. Decanulação: cânula ocluída e tolerada por 24 h, retirada e curativo oclusivo do orifício, que fecha sozinho. Paciente **laringectomizado** tem **estoma definitivo** (a traqueia foi suturada na pele): a cânula que caiu não precisa voltar, **manter o estoma pérvio**.|q-adap21-078,q-usprp2021-078,q-usprp2027-062]] [[Sangramento de vermelho vivo pela traqueostomia semanas depois, sobretudo baixa ou com balonete hiperinsuflado: **fístula traqueoinominada** (erosão do tronco braquiocefálico) — hiperinsuflar o balonete, comprimir e cirurgia. **Hemoptise maciça** (bronquiectasia, tuberculose): **deitar com o lado que sangra para baixo** (protege o pulmão bom), proteger a via aérea, broncoscopia e **embolização das artérias brônquicas**.|q-usprp2021-075,q-adap21-075]]`,
          texto: `- Desmame difícil: **traqueostomia**. {q-adap21-078}
- Decanular: cânula ocluída **24 h** e fechar o orifício. {q-usprp2021-078}
- Laringectomizado: **estoma definitivo**, sem cânula. {q-usprp2027-062}
- Sangue pela traqueostomia: **fístula traqueoinominada**. {q-usprp2021-075}
- Hemoptise maciça: **lado que sangra para baixo**, embolização. {q-adap21-075}` },
      ],
    },
  ],
});
