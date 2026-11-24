/* resumos/cancer-colorretal/resumo.js — resumo adaptativo de câncer colorretal (ass-cacolorretal): sequência
   adenoma-carcinoma e pólipos, síndromes hereditárias, rastreamento e vigilância, quadro por localização e
   diagnóstico, estadiamento, tratamento do cólon (cirurgia, adjuvância, metástase hepática), urgências
   (obstrução, Hartmann, fístula anastomótica), reto, canal anal e apêndice, armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- cancer-colorretal */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "cancer-colorretal",
  titulo: "Câncer colorretal",
  assunto: "ass-cacolorretal",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "nccn", texto: "NCCN — Clinical Practice Guidelines in Oncology: Colon Cancer e Rectal Cancer (versões vigentes)", lidoEm: null },
    { id: "uspstf-ccr", texto: "USPSTF — Screening for colorectal cancer: recommendation statement (JAMA 2021;325:1965)", lidoEm: null },
    { id: "usmstf-polipos", texto: "US Multi-Society Task Force on Colorectal Cancer — Recommendations for follow-up after colonoscopy and polypectomy (Gupta et al., 2020)", lidoEm: null },
    { id: "inca-ccr", texto: "INCA — Detecção precoce do câncer colorretal e Estimativa de incidência de câncer no Brasil (edição vigente)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição", questoes: ["q-sessp2023-005","q-fmabc2026-016"] },
  ],
  doencas: [
    {
      id: "carcinogenese", titulo: "Carcinogênese, pólipos e síndromes hereditárias",
      introducao: `[[Quase todo câncer colorretal nasce de um pólipo, ao longo de anos: a via clássica começa com a perda do gene supressor APC (a mucosa prolifera e forma o adenoma), segue com a ativação do KRAS (o adenoma cresce) e termina com a perda do TP53, o "guardião do genoma" que para o ciclo celular diante de DNA lesado; sem ele, a célula acumula mutações e invade. Uma segunda via vem da falha do reparo de malpareamento do DNA (instabilidade de microssatélites) e dos pólipos serrilhados. É por esse intervalo longo que tirar o pólipo previne o câncer.|q-tp20202-003,q-sessp2025-032,q-iamspe2026-039]] [[Dos pólipos, os neoplásicos são os adenomas (tubulares, tubulovilosos e vilosos, os vilosos com mais chance de abrigar câncer) e os serrilhados; os hiperplásicos pequenos são benignos, e os juvenis e os de Peutz-Jeghers são hamartomas. O que separa o pólipo maligno é a invasão da submucosa, não o lugar onde está.|q-sessp2025-032,q-iamspe2026-037]]

Veja também: **Prevenção** (rastreamento na atenção primária), **Obstrução intestinal** (versão completa da obstrução do cólon), **Complicações cirúrgicas** (fístula de anastomose), **Fios, cicatrização e suturas** e **Anemias** (ferropriva do cólon direito).`,
      fragmentos: [
        { id: "car-sequencia", titulo: "Sequência adenoma-carcinoma e epidemiologia", conferir: true, diretrizes: ["inca-ccr"],
          figuras: [{ arquivo: "figuras/sequencia.svg", legenda: "Esquema autoral: da mucosa normal ao carcinoma, com os genes de cada passo." }],
          questoes: ["q-tp20202-003","q-sessp2025-032","q-iamspe2026-037","q-iamspe2026-039","q-sessp2026-023","q-scmsp2023-027"],
          prosa: `[[O câncer colorretal está entre os mais incidentes e é uma das principais causas de morte por câncer (em números absolutos mata mais que o de pâncreas, embora o de pâncreas seja mais letal por caso). Invasão linfovascular, perineural e brotamento tumoral pioram o prognóstico, e as metástases vão primeiro ao fígado (pela veia porta) e ao pulmão. O CEA não serve para rastrear (sobe tarde e em outras condições): serve para o prognóstico e o seguimento. O estadiamento TNM mede a extensão e orienta o tratamento.|q-sessp2026-023,q-iamspe2026-039,q-scmsp2023-027]]`,
          texto: `- TP53 mutado: perda do **controle do ciclo celular**. {q-tp20202-003}
- Errada: maligno × benigno pela **localização** (é pela invasão). {q-sessp2025-032}
- Errada: Peutz-Jeghers com pólipos **adenomatosos** (são hamartomas). {q-iamspe2026-037}
- Errada: CEA **para rastrear**. {q-iamspe2026-039}
- Mortalidade absoluta: **maior que a do pâncreas** (a prova). {q-sessp2026-023}
- TNM: **extensão da doença e tratamento**. {q-scmsp2023-027}` },
        { id: "car-sindromes", titulo: "Polipose adenomatosa familiar e síndrome de Lynch", conferir: true,
          questoes: ["q-famema2022-067","q-famema2022-071","q-famema2023-068","q-scmsp2026-022","q-amrigs2023-036","q-unicampdis2023-016","q-didepm-052","q-unicampdis2022-004"],
          prosa: `[[Na polipose adenomatosa familiar (mutação germinativa do APC, autossômica dominante) cada filho tem 50% de chance de herdar; surgem centenas a milhares de adenomas na adolescência e o câncer é certo sem colectomia. Há manifestações fora do cólon: hipertrofia congênita do epitélio pigmentar da retina, osteomas, cistos e tumores desmoides (síndrome de Gardner), tumores do sistema nervoso (Turcot, em que o meduloblastoma mata na infância) e adenomas do duodeno e da papila, segunda causa de morte, vigiados por endoscopia e graduados pela classificação de Spigelman (número, tamanho — acima de 10 mm vale 3 pontos —, histologia e displasia).|q-famema2022-067,q-famema2022-071,q-famema2023-068,q-scmsp2026-022,q-amrigs2023-036,q-unicampdis2023-016]] [[A síndrome de Lynch é falha germinativa do reparo de DNA (MLH1, MSH2, MSH6, PMS2): câncer colorretal jovem, de cólon direito, com poucos pólipos, e câncer de endométrio, estômago, ovário e vias urinárias na família. Investiga-se no próprio tumor (instabilidade de microssatélites ou perda das proteínas por imuno-histoquímica), e os familiares em risco fazem colonoscopia precoce e frequente.|q-didepm-052,q-unicampdis2022-004]]`,
          texto: `- Hipertrofia do epitélio pigmentar da retina: **polipose adenomatosa familiar**. {q-famema2022-067}
- Turcot na infância: **meduloblastoma**. {q-famema2022-071}
- Pele, partes moles e esqueleto: **Gardner**. {q-famema2023-068}
- Adenoma de papila de baixo grau na PAF: **seguimento endoscópico rigoroso**. {q-scmsp2026-022}
- Spigelman: pólipo **> 10 mm = 3 pontos**. {q-amrigs2023-036}
- Filhos de quem tem PAF: **50%**. {q-unicampdis2023-016}
- Jovem com história de Lynch: **instabilidade de microssatélites ou proteínas de reparo no tumor**. {q-didepm-052}
- Família com cólon, estômago e endométrio: **colonoscopia**. {q-unicampdis2022-004}` },
      ],
    },
    {
      id: "rastreamento", titulo: "Rastreamento e vigilância",
      introducao: `[[Rastrear funciona porque a fase de pólipo dura anos e a colonoscopia acha e retira a lesão no mesmo exame: diagnostica e trata. As opções para quem tem risco médio são o teste imunoquímico de sangue oculto anual (positivo leva à colonoscopia) ou a colonoscopia a cada 10 anos, a partir dos 45 a 50 anos (conforme a diretriz) e até 75 anos.|q-einstein2025-028,q-amrigs2023-016,q-einstein2026-004]]`,
      fragmentos: [
        { id: "ras-quem", titulo: "Quem rastrear e como; intervalo depois da polipectomia", conferir: true, diretrizes: ["uspstf-ccr","usmstf-polipos"],
          questoes: ["q-amrigs2023-016","q-einstein2025-028","q-einstein2026-004","q-sessp2023-002","q-usprp2027-091","q-011"],
          prosa: `[[Parente de primeiro grau com câncer depois dos 60 anos mantém o risco quase médio: o teste imunoquímico anual continua válido. Parente diagnosticado antes dos 60 anos, ou dois parentes, pede colonoscopia a partir dos 40 anos (ou 10 anos antes do caso mais jovem), a cada 5 anos.|q-einstein2026-004]] [[Depois da polipectomia, o intervalo segue o risco do que foi tirado: 1 a 2 adenomas tubulares menores que 10 mm, 7 a 10 anos; 3 a 4 pequenos, 3 a 5 anos; adenoma de 10 mm ou mais, viloso ou com displasia de alto grau, ou 5 a 10 adenomas, 3 anos.|q-sessp2023-002,q-usprp2027-091]] [[O pólipo com câncer restrito à submucosa (pT1), retirado inteiro com margens livres, sem invasão angiolinfática e bem diferenciado, está curado pela polipectomia: segue-se com colonoscopia.|q-011]]`,
          texto: `- Faixa da prova: **50 a 75 anos**. {q-amrigs2023-016}
- Colonoscopia **diagnostica e trata**. {q-einstein2025-028}
- Pai com câncer aos 65: **sangue oculto imunológico anual** é válido. {q-einstein2026-004}
- Dois adenomas pediculados de 1,2 e 1,5 cm: **colonoscopia em 3 anos**. {q-sessp2023-002}
- Três adenomas tubulares pequenos de baixo grau: **3 a 5 anos** (uma prova marcou 3). {q-usprp2027-091}
- pT1 favorável ressecado: **vigilância colonoscópica**. {q-011}` },
      ],
    },
    {
      id: "diagnostico", titulo: "Quadro clínico, diagnóstico e estadiamento",
      introducao: `[[O quadro depende do lado. O cólon direito tem luz larga e fezes líquidas: o tumor cresce sem obstruir e sangra devagar, e a apresentação é anemia ferropriva, fraqueza, massa em fossa ilíaca direita e perda de peso. O cólon esquerdo é estreito e as fezes são sólidas: o tumor anelar muda o hábito intestinal (constipação alternada com diarreia, fezes afiladas), sangra vivo e obstrui; é onde está a maioria das obstruções neoplásicas do cólon. O reto dá sangue vivo, tenesmo e evacuação incompleta.|q-unifesp2024-012,q-unicampdis2022-017,q-einstein2024-028,q-amrigs2024-024,q-sessp2026-030,q-tp20261-046]]`,
      fragmentos: [
        { id: "dx-quadro", titulo: "Quando suspeitar e como confirmar", conferir: true,
          casos: ["q-einstein2025-020","q-uspsp4-058"],
          questoes: ["q-unifesp2024-012","q-unicampdis2022-017","q-einstein2025-020","q-unesp2024-050","q-sessp2026-030","q-tp20251-063","q-tp20261-046","q-tp20261-089","q-unifesp2026-013","q-uspsp4-058"],
          prosa: `[[Anemia ferropriva no homem ou na mulher depois da menopausa, mudança do hábito intestinal depois dos 50 anos, sangramento retal com tenesmo ou fezes afiladas, e perda de peso pedem colonoscopia com biópsia, não sangue oculto nem tomografia: o sintoma já indica o exame que vê e biopsia. Hemorroida não explica o sangramento de quem tem sinais de alarme ou história familiar.|q-unesp2024-050,q-sessp2026-030,q-tp20251-063,q-tp20261-046,q-tp20261-089,q-unifesp2026-013,q-unifesp2024-012,q-unicampdis2022-017]] [[No pré-operatório, a anemia ferropriva com cirurgia próxima corrige-se com ferro venoso (sobe a hemoglobina em semanas, sem depender do intestino).|q-einstein2025-020]] [[Nem todo sangramento do cólon do idoso é tumor: a angiectasia, vaso ectasiado da mucosa do cólon direito, aparece na colonoscopia e trata-se com coagulação por plasma de argônio.|q-uspsp4-058]]`,
          texto: `- Anemia microcítica e dor em fossa ilíaca direita: **adenocarcinoma de cólon direito**. {q-unifesp2024-012}
- Fraqueza, fezes escuras e perda de peso: **neoplasia de cólon direito**. {q-unicampdis2022-017}
- Hematoquezia e ferropenia no pré-operatório: **ferro venoso**. {q-einstein2025-020}
- Cólica e alternância do hábito com anemia: **câncer; colonoscopia**. {q-unesp2024-050}
- Constipação alternada com diarreia no idoso: **adenocarcinoma de retossigmoide**. {q-sessp2026-030}
- Hematoquezia, tenesmo e fezes afiladas: **colonoscopia**. {q-tp20251-063,q-tp20261-089,q-tp20261-046}
- Hemorroidas com alteração do hábito: **colonoscopia**. {q-unifesp2026-013}
- Enterorragia com lesão vascular no ascendente: **angiectasia; plasma de argônio**. {q-uspsp4-058}` },
        { id: "dx-estadiamento", titulo: "Estadiamento", conferir: true, diretrizes: ["nccn"],
          questoes: ["q-uspsp1-039","q-fmabc2022-032","q-scmsp2021-024"],
          prosa: `[[Com a biópsia positiva, estadia-se antes de operar: colonoscopia completa (procura lesões sincrônicas), tomografia de tórax, abdome e pelve (fígado e pulmão) e CEA. No câncer de reto soma-se a ressonância magnética da pelve, que mede a profundidade, os linfonodos do mesorreto e a distância à fáscia mesorretal, e é ela que decide a neoadjuvância.|q-uspsp1-039,q-fmabc2022-032,q-scmsp2021-024]]`,
          texto: `- Sigmoide: **TC de tórax, abdome e pelve e CEA**. {q-uspsp1-039,q-fmabc2022-032}
- Reto: **colonoscopia, RM de pelve, TC de tórax e abdome e CEA**. {q-scmsp2021-024}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento do câncer de cólon",
      introducao: `[[A cirurgia cura a doença localizada: retira o segmento do cólon com o tumor e todo o território linfático dele, ligando a artéria na origem. Por isso o segmento ressecado segue a irrigação: o cólon direito e o transverso proximal vêm da mesentérica superior; o descendente, o sigmoide e o reto alto, da mesentérica inferior.|q-amrigs2023-038,q-fmabc2021-011,q-einstein2024-028]]`,
      fragmentos: [
        { id: "tto-cirurgia", titulo: "Cirurgia eletiva, adjuvância e estomia", conferir: true, diretrizes: ["nccn"],
          questoes: ["q-uspsp1-040","q-sirio2025-034","q-fmabc2021-011","q-einstein2024-028","q-amrigs2023-038","q-sirio2026-040","q-adap26-013","q-scmsp2025-034","q-scmsp2025-035"],
          prosa: `[[Câncer de sigmoide sem metástase: retossigmoidectomia com linfadenectomia e anastomose primária; cólon direito: colectomia direita. A anastomose depende de sangue: com a ligadura alta da mesentérica inferior, a junção retossigmoide (ponto de Sudeck) e o ângulo esplênico (ponto de Griffiths) são zonas de irrigação frágil, e o cirurgião confere a perfusão antes de anastomosar.|q-uspsp1-040,q-sirio2025-034,q-fmabc2021-011,q-einstein2024-028,q-amrigs2023-038,q-sirio2026-040]] [[Linfonodo comprometido (estádio III) significa que células já saíram: quimioterapia adjuvante com fluoropirimidina e oxaliplatina (FOLFOX ou CAPOX) por 3 a 6 meses. A colostomia de proteção só se fecha depois do tratamento complementar e do reestadiamento; o cuidado da pele em volta do estoma é água e sabão neutro, com orientação do estomaterapeuta.|q-adap26-013,q-scmsp2025-034,q-scmsp2025-035]]`,
          texto: `- Sigmoide a 17 cm sem metástase: **retossigmoidectomia com anastomose primária**. {q-uspsp1-040,q-sirio2025-034,q-fmabc2021-011}
- Massa em flanco direito: **colectomia direita**. {q-einstein2024-028}
- Cólon ascendente: **mesentérica superior**. {q-amrigs2023-038}
- Ligadura alta da mesentérica inferior: **ponto de Sudeck** em risco. {q-sirio2026-040}
- pT3 com 2 linfonodos: **FOLFOX ou CAPOX**. {q-adap26-013}
- Colostomia: fechar **após reestadiamento**. {q-scmsp2025-034}
- Pele do estoma: **água e sabão neutro**. {q-scmsp2025-035}` },
        { id: "tto-metastatico", titulo: "Doença metastática", conferir: true, diretrizes: ["nccn"],
          casos: ["q-usp2024-025","q-sirio2024-026"],
          questoes: ["q-usp2024-025","q-sirio2024-026","q-simepm89-006","q-usp2025-044"],
          prosa: `[[O fígado é o primeiro filtro das metástases. No câncer de cólon com metástases hepáticas sem sintoma do primário, o primeiro passo é a quimioterapia sistêmica; se as lesões ficam ressecáveis, resseca-se o fígado depois, com chance real de cura. Se o tumor primário obstrui ou sangra, ele é operado primeiro, com ressecção oncológica e linfadenectomia quando o paciente está estável.|q-usp2024-025,q-sirio2024-026,q-simepm89-006,q-usp2025-044]]`,
          texto: `- Sigmoide com metástases hepáticas: **quimioterapia**. {q-usp2024-025,q-sirio2024-026}
- Metástases nos dois lobos: **quimioterapia e ressecção hepática depois**. {q-simepm89-006}
- Primário obstruindo, paciente estável: **ressecção com linfadenectomia**. {q-usp2025-044}` },
        { id: "tto-urgencia", titulo: "Obstrução, perfuração e fístula", conferir: true,
          casos: ["q-usp2026-030","q-uspsp2-076","q-einstein2024-026"],
          questoes: ["q-usp2026-030","q-usp2024-032","q-usp2025-041","q-einstein2022-029","q-uspsp2-076","q-einstein2024-026","q-amrigs2024-024"],
          prosa: `[[Na obstrução do cólon esquerdo, o cirurgião escolhe entre resseca e anastomosa, resseca sem anastomose (Hartmann: colostomia terminal e coto retal fechado) ou só desvia o trânsito (colostomia em alça). Instabilidade, droga vasoativa, peritonite ou cólon muito distendido contraindicam a anastomose; com tumor irressecável na urgência ou paciente grave, a colostomia em alça desvia e resolve.|q-usp2026-030,q-usp2024-032,q-usp2025-041,q-amrigs2024-024]] [[Constipação de meses com fecaloma e sem peritonite começa pela desimpactação (lavagem retal), e depois se investiga a causa.|q-einstein2022-029]] [[A fístula da anastomose baixa aparece por volta do 5º dia com febre, dor e distensão; com instabilidade, a conduta é reoperar e desviar o trânsito, não drenar por punção. Tumor que invade órgão vizinho (útero) é ressecado em bloco com ele.|q-uspsp2-076,q-einstein2024-026]]`,
          texto: `- Obstrução com lesão intransponível: **colostomia em alça**. {q-usp2026-030}
- Sem anastomose: **instabilidade hemodinâmica**. {q-usp2024-032}
- Obstrução com ceco e transverso distendidos: **ressecção do descendente** (a prova). {q-usp2025-041}
- Fecaloma sem peritonite: **lavagem retal**. {q-einstein2022-029}
- Fístula da anastomose com instabilidade: **laparotomia e desvio**. {q-uspsp2-076}
- Tumor invadindo o útero, estenosante: **Hartmann com histerectomia**. {q-einstein2024-026}
- Obstrução neoplásica do cólon: **cólon esquerdo**. {q-amrigs2024-024}` },
      ],
    },
    {
      id: "reto-anus", titulo: "Reto, canal anal e apêndice",
      introducao: `[[O reto está na pelve estreita, abaixo do peritônio, envolto pelo mesorreto (gordura com os linfonodos) e pela fáscia mesorretal. A cirurgia certa tira o mesorreto inteiro (excisão total do mesorreto); quando a ressonância mostra tumor que atravessa a parede, linfonodos ou fáscia ameaçada, a radioquimioterapia antes da cirurgia diminui a recidiva local.|q-adap26-017,q-unifesp2026-017]]`,
      fragmentos: [
        { id: "ra-reto", titulo: "Câncer de reto", conferir: true, diretrizes: ["nccn"],
          questoes: ["q-adap26-017","q-unifesp2026-017","q-scmsp2021-024"],
          prosa: `[[Tumor de reto inicial (até a muscular própria, sem linfonodo): cirurgia direta com excisão do mesorreto. Localmente avançado (atravessa a parede, linfonodos ou fáscia comprometida): neoadjuvância com radioquimioterapia ou terapia neoadjuvante total, e depois excisão total do mesorreto. A amputação abdominoperineal fica para o tumor que invade o esfíncter, não para todo tumor abaixo de 8 cm.|q-adap26-017,q-unifesp2026-017,q-scmsp2021-024]]`,
          texto: `- Reto médio com fáscia comprometida: **neoadjuvância e excisão total do mesorreto**. {q-adap26-017}
- Reto a 7 cm sem linfonodo: **retossigmoidectomia com excisão do mesorreto**. {q-unifesp2026-017}
- Estadiamento do reto: **RM de pelve**. {q-scmsp2021-024}` },
        { id: "ra-anus-apendice", titulo: "Canal anal e apêndice", conferir: true,
          casos: ["q-usp2026-025"],
          questoes: ["q-usp2026-025","q-fmabc2022-038"],
          prosa: `[[O canal anal é revestido por epitélio escamoso, e o câncer dele é carcinoma espinocelular, ligado ao HPV (mais comum em quem tem relação anal receptiva e HIV): lesão dolorosa e sangrante que pode parecer hemorroida. Trata-se com radioquimioterapia, não com cirurgia de primeira linha.|q-usp2026-025]] [[O adenocarcinoma do apêndice achado na peça, com invasão do mesoapêndice, pede hemicolectomia direita com linfadenectomia.|q-fmabc2022-038]]`,
          texto: `- Lesão anal dolorosa em HSH: **carcinoma espinocelular**. {q-usp2026-025}
- Cistoadenocarcinoma de apêndice com invasão: **hemicolectomia direita**. {q-fmabc2022-038}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["uspstf-ccr","usmstf-polipos"],
          questoes: ["q-amrigs2023-016","q-usprp2027-091","q-usp2025-041","q-sessp2026-023","q-einstein2022-029"],
          prosa: `[[**Idade de início**: a USPSTF (2021) e a ACS começam aos 45 anos; a amrigs2023-016 cobrou 50 a 75. No Brasil o INCA não recomenda rastreamento populacional organizado.|q-amrigs2023-016]] [[**Intervalo após adenomas pequenos**: com 3 a 4 adenomas tubulares menores que 10 mm, a USMSTF 2020 dá 3 a 5 anos; a usprp2027-091 marcou 3 anos.|q-usprp2027-091]] [[**Segmento na obstrução**: a ressecção segue o local do tumor; a usp2025-041 deu o descendente com base na imagem (ceco e transverso distendidos).|q-usp2025-041]] [[**Incidência e mortalidade**: os números variam com a fonte; a sessp2026-023 comparou mortalidade absoluta com o pâncreas.|q-sessp2026-023]] [[**Obstrução por fecaloma × tumor**: em idoso que emagreceu com constipação progressiva, a desimpactação é só o começo; a colonoscopia vem logo depois.|q-einstein2022-029]]`,
          texto: `- Regra USPSTF: **45 a 75**; a prova cobrou 50 a 75. {q-amrigs2023-016}
- 3 a 4 adenomas pequenos: 3 a 5 anos; a prova deu **3 anos**. {q-usprp2027-091}
- Ressecção segue o **local do tumor**. {q-usp2025-041}
- Mortalidade: comparação depende da fonte. {q-sessp2026-023}
- Desimpactação e depois **colonoscopia**. {q-einstein2022-029}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: cólon direito, cólon esquerdo e reto",
      introducao: `Resumo dos capítulos de quadro e tratamento.`,
      fragmentos: [
        { id: "cmp-lados", titulo: "Quadro, exame e tratamento por localização", conferir: true,
          questoes: ["q-unifesp2024-012","q-sessp2026-030","q-scmsp2021-024","q-einstein2024-028","q-adap26-017"],
          prosa: `[[O lado decide o sintoma, o estadiamento e a cirurgia.|q-unifesp2024-012,q-sessp2026-030,q-scmsp2021-024,q-einstein2024-028,q-adap26-017]]

| | Cólon direito | Cólon esquerdo e sigmoide | Reto |
|---|---|---|---|
| Quadro | anemia ferropriva, massa, perda de peso | mudança do hábito, fezes afiladas, sangue, obstrução | sangue vivo, tenesmo |
| Estadiamento | colonoscopia, TC, CEA | colonoscopia, TC, CEA | + RM de pelve |
| Cirurgia | colectomia direita | retossigmoidectomia ou colectomia esquerda | excisão total do mesorreto |
| Antes da cirurgia | — | — | radioquimioterapia se localmente avançado |
| Depois | quimioterapia no estádio III | quimioterapia no estádio III | conforme o estadiamento |`,
          texto: `- Direito: **anemia**. {q-unifesp2024-012}
- Esquerdo: **hábito intestinal**. {q-sessp2026-030}
- Reto: **RM de pelve**. {q-scmsp2021-024}
- Massa em flanco direito: **colectomia direita**. {q-einstein2024-028}
- Reto avançado: **neoadjuvância**. {q-adap26-017}` },
      ],
    },
  ],
});
