/* resumos/parto-pretermo-e-rotura/resumo.js — resumo adaptativo de parto pré-termo e rotura prematura de
   membranas (dono do tema; trabalho-de-parto só resume): risco e prevenção (colo curto, progesterona,
   cerclagem), diagnóstico e conduta no trabalho de parto prematuro (corticoide, tocólise, magnésio,
   estreptococo), rotura de membranas (diagnóstico, latência, quando nascer) e corioamnionite.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- parto-pretermo-e-rotura */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "parto-pretermo-e-rotura",
  titulo: "Parto pré-termo e rotura prematura de membranas",
  assunto: "ass-partopretermo",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "oms-corticoide-2022", texto: "OMS — WHO recommendations on antenatal corticosteroids for improving preterm birth outcomes (2022), iris.who.int", lidoEm: "2026-11-19" },
    { id: "oms-tocolise-2022", texto: "OMS — WHO recommendation on tocolytic therapy for improving preterm birth outcomes (2022), iris.who.int", lidoEm: "2026-11-19" },
    { id: "acog-rpmo", texto: "ACOG — Practice Bulletin nº 217: Prelabor rupture of membranes (2020)", lidoEm: null },
    { id: "febrasgo-prematuridade", texto: "FEBRASGO — Protocolos de prematuridade, colo curto e rotura prematura de membranas", lidoEm: null },
    { id: "acog-gbs", texto: "ACOG — Committee Opinion nº 797: Prevention of Group B Streptococcal Early-Onset Disease in Newborns (2020)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Desatualizadas (entram pelas reposições)", questoes: ["q-tp20231-087","q-sirio2021-074"] },
  ],
  doencas: [
    {
      id: "prevencao", titulo: "Risco e prevenção",
      introducao: `[[O parto prematuro espontâneo é o fim comum de inflamação ou infecção, distensão uterina, sangramento decidual e insuficiência do colo; o maior fator de risco é um parto prematuro anterior.|q-amrigs2021-050,q-famema2022-046]] [[O colo que encurta no segundo trimestre (abaixo de 25 mm no ultrassom transvaginal) mostra o processo antes das contrações; a progesterona vaginal mantém o colo e reduz o parto prematuro em quem tem colo curto ou prematuro anterior.|q-tp20241-085,q-fmabc2025-071,q-fmabc2024-073,q-uspsp3-059,q-unesp2022-025]] [[A cerclagem fecha mecanicamente o colo: indicada pela história (perdas indolores no segundo trimestre), pelo ultrassom (colo < 25 mm **antes de 24 semanas** em quem já teve parto prematuro antes de 34 semanas) ou pelo exame (colo já dilatando sem contração).|q-tp20232-087,q-unicampdis2025-081,q-sessp2026-064,q-tp20222-087,q-unicampdis2022-038]]

Veja também: **Trabalho de parto e parto** (assistência ao parto), **Pré-natal** (colo curto no rastreio), **Prematuridade** e **Desconforto respiratório do RN** (pediatria: o recém-nascido).`,
      fragmentos: [
        { id: "pre-colo", titulo: "Colo curto, progesterona e cerclagem", conferir: true, diretrizes: ["febrasgo-prematuridade"],
          figuras: [{ arquivo: "figuras/conduta.svg", legenda: "Esquema autoral: o que muda com a idade gestacional no trabalho de parto prematuro e na rotura de membranas." }],
          questoes: ["q-amrigs2021-050","q-famema2022-046","q-sessp2026-064","q-tp20222-087","q-tp20232-087","q-tp20241-085","q-unesp2022-025","q-unicampdis2022-038","q-unicampdis2025-081","q-uspsp3-059","q-fmabc2025-071","q-fmabc2024-073"],
          casos: ["q-uspsp3-059"],
          prosa: `[[O eco glandular endocervical visível ao ultrassom é sinal de colo preservado.|q-famema2022-046]]`,
          texto: `- Maior fator de risco: **parto pré-termo anterior**. {q-amrigs2021-050}
- Eco glandular endocervical: **menos** parto prematuro. {q-famema2022-046}
- Prematuro anterior: **progesterona** desde o início. {q-fmabc2025-071,q-fmabc2024-073,q-tp20241-085}
- Colo curto que não foi visto no pré-natal: devia ter usado **progesterona**. {q-uspsp3-059}
- Em progesterona, colo de 35 mm: **manter e seguir com ultrassom**. {q-unesp2022-025}
- Perdas indolores no 2º trimestre: **cerclagem** pela história. {q-tp20232-087,q-unicampdis2025-081}
- Colo < 25 mm antes de 24 semanas e prematuro anterior < 34 sem: **cerclagem**. {q-sessp2026-064,q-tp20222-087}
- Colo afunilado com membranas no canal: **cerclagem** (ou pessário). {q-unicampdis2022-038}` },
      ],
    },
    {
      id: "tpp", titulo: "Trabalho de parto prematuro",
      introducao: `[[O diagnóstico exige contrações regulares que modificam o colo; contrações sem mudança, com colo longo no ultrassom ou fibronectina negativa, são falso trabalho de parto, e a gestante volta para casa.|q-famema2025-060,q-sessp2024-077,q-tp20251-090,q-unesp2025-025,q-sirio2021-074-ia]]

[[Entre 24 e 34 semanas, o corticoide (betametasona 12 mg IM, 2 doses em 24 horas) amadurece o pulmão e reduz hemorragia intraventricular e morte; a tocólise com nifedipino segura 48 horas para ele agir e para transferir, e não serve para levar a gestação ao termo.|q-tp20202-099,q-tp20212-091,q-tp20222-089,q-tp20231-090,q-tp20232-090,q-famerp2025-022,q-uspsp4-046]] [[Abaixo de 32 semanas, o sulfato de magnésio antes do parto protege o cérebro contra paralisia cerebral; e, sem cultura, faz-se a profilaxia do estreptococo do grupo B.|q-einstein2027-053,q-uspsp4-043]] [[Não se inibe o parto avançado (dilatação de 6–8 cm), nem com infecção, sofrimento fetal ou acima de 34 semanas.|q-famerp2026-029,q-unicamp2022-049,q-tp20231-087-ia]]`,
      fragmentos: [
        { id: "tpp-conduta", titulo: "Corticoide, tocólise e magnésio", conferir: false, diretrizes: ["oms-corticoide-2022","oms-tocolise-2022"],
          questoes: ["q-sirio2021-074-ia","q-famema2025-060","q-sessp2024-077","q-tp20202-099","q-tp20212-091","q-tp20222-089","q-tp20231-090","q-tp20232-090","q-tp20251-090","q-unesp2025-025","q-famerp2025-022","q-uspsp4-046","q-unicamp2022-049","q-tp20231-087-ia","q-uspsp4-043","q-famerp2026-029","q-einstein2027-053"],
          texto: `- Contrações sem mudança do colo: **medir o colo ou fibronectina** antes de tocolisar. {q-sirio2021-074-ia,q-sessp2024-077}
- Contrações ritmadas com colo modificando: **trabalho de parto prematuro**, internar. {q-famema2025-060}
- Contrações fracas, colo 1–1,5 cm: **observação e alta** se não progride. {q-tp20251-090,q-unesp2025-025}
- 30–33 semanas com 3–4 cm: **nifedipino e corticoide**. {q-tp20202-099,q-tp20222-089,q-tp20232-090,q-tp20231-090,q-uspsp4-046}
- Tocolítico de escolha: **bloqueador de canal de cálcio**. {q-tp20212-091}
- Tocólise: ganhar **48 horas** para o corticoide e a transferência. {q-famerp2025-022}
- 29 semanas, 3 cm sem contrações: **corticoide e acompanhamento**. {q-tp20231-087-ia}
- Dilatação de 8 cm: **ausculta intermitente e parto vaginal**. {q-famerp2026-029}
- Covid com 33 sem e 3 cm: **dexametasona** e assistência ao parto. {q-unicamp2022-049}
- 6 cm, bolsa íntegra: **assistir o parto e ampicilina**. {q-uspsp4-043}
- Cultura desconhecida: **coletar sem atrasar a penicilina**. {q-einstein2027-053}` },
      ],
    },
    {
      id: "rotura", titulo: "Rotura prematura de membranas",
      introducao: `[[O diagnóstico é clínico: líquido saindo pelo colo ao exame especular (com tosse ou Valsalva); pH alcalino (nitrazina), cristalização em folha de samambaia e ultrassom com pouco líquido ajudam na dúvida. O toque vaginal se evita, porque leva bactérias e encurta a latência.|q-famerp2024-040,q-famema2023-056,q-amrigs2020-042]]

[[Antes de 34 semanas, sem infecção nem trabalho de parto, a conduta é expectante: internar, corticoide, antibiótico de latência (ampicilina e azitromicina), que prolonga a gestação e reduz infecção neonatal, e vigilância de infecção; magnésio se o parto vier antes de 32. A partir de 34 semanas, induz-se o parto com profilaxia do estreptococo.|q-simepm89-026,q-einstein2023-057,q-tp20212-092,q-tp20251-088,q-famerp2023-040,q-fmabc2022-075,q-uspsp2-043,q-tp20202-097,q-tp20231-088]] [[Quanto menor a idade gestacional, maior o tempo até o parto (latência).|q-fmabc2023-070]]`,
      fragmentos: [
        { id: "rot-diagnostico", titulo: "Confirmar a rotura",
          questoes: ["q-amrigs2020-042","q-famema2023-056","q-famerp2024-040"],
          texto: `- Confirmação: **exame especular** e inspeção. {q-famerp2024-040,q-famema2023-056}
- O pH da vagina é **4 a 4,5** e o do líquido amniótico, **7 a 7,5**: a nitrazina fica azul acima de **6,5**. Um pH "maior que 3" não separa um do outro e **não ajuda**. {q-amrigs2020-042}` },
        { id: "rot-conduta", titulo: "Expectante ou nascer", conferir: false, diretrizes: ["oms-corticoide-2022","acog-rpmo"],
          questoes: ["q-tp20202-097","q-tp20212-092","q-tp20231-088","q-tp20232-088","q-tp20241-086","q-tp20251-088","q-tp20252-060","q-tp20261-104","q-unesp2021-021","q-unesp2024-023","q-famerp2023-040","q-famerp2022-048","q-unicamp2023-052","q-unicampdis2024-103","q-uspsp2-043","q-simepm89-026","q-fmabc2022-075","q-fmabc2023-070","q-einstein2023-057"],
          texto: `- 29–32 sem sem infecção: **internar, corticoide, antibiótico de latência**. {q-simepm89-026,q-tp20212-092,q-tp20251-088,q-famerp2023-040,q-unicamp2023-052}
- Latência: **ampicilina e azitromicina**. {q-einstein2023-057,q-fmabc2022-075}
- Latência **inversamente proporcional** à idade gestacional. {q-fmabc2023-070}
- Antes do corticoide, afastar **corioamnionite**. {q-famerp2022-048}
- 30–31 sem em trabalho de parto: **magnésio, corticoide e profilaxia**. {q-tp20252-060,q-unesp2021-021,q-unicampdis2024-103}
- 32 sem em trabalho de parto: **corticoide e profilaxia do estreptococo**. {q-unesp2024-023}
- 32 sem com 4 cm e pouco líquido: **evolução espontânea e penicilina**. {q-tp20232-088}
- ≥ 34–36 sem: **indução e penicilina**. {q-tp20202-097,q-tp20231-088,q-uspsp2-043}
- 33 sem, multípara com 4 cm: banca, **indução**. {q-tp20241-086,q-tp20261-104}` },
        { id: "rot-corio", titulo: "Corioamnionite",
          questoes: ["q-uspsp5-047","q-sirio2026-071","q-fmabc2021-058"],
          prosa: `[[Febre, taquicardia materna ou fetal, útero doloroso, líquido fétido e leucocitose são infecção intra-amniótica: antibiótico e nascimento, em qualquer idade gestacional, de preferência por via vaginal; não se dá tocólise.|q-uspsp5-047,q-sirio2026-071,q-fmabc2021-058]]`,
          texto: `- Útero doloroso e secreção fétida: **antibiótico e resolução imediata**. {q-uspsp5-047}
- Leucocitose e PCR alta com 29 sem: **antibiótico, magnésio e indução**. {q-sirio2026-071}
- Secreção purulenta com 5 cm: **antibiótico e assistência ao parto**. {q-fmabc2021-058}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-tp20241-086","q-tp20261-104","q-sirio2021-074-ia"],
          texto: `- Rotura sem infecção abaixo de 34 semanas: **expectante com corticoide e latência**; a prova induziu com **33 semanas**. {q-tp20241-086,q-tp20261-104}
- A questão original indicava atosibana e magnésio sem confirmar trabalho de parto; o certo é **medir o colo antes**. {q-sirio2021-074-ia}` },
      ],
    },
  ],
});
