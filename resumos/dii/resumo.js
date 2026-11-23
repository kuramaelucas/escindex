/* resumos/dii/resumo.js — resumo adaptativo de doença inflamatória intestinal (ass-dii): Crohn e
   retocolite (distribuição, profundidade, histologia, imunologia), manifestações extraintestinais e
   sorologia, calprotectina e síndrome do intestino irritável, investigação na criança, tratamento
   da retocolite (mesalazina, corticoide, colite grave) e do Crohn (abscesso, biológico), megacólon
   tóxico e cirurgia; armadilhas e tabela Crohn × retocolite.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- dii */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "dii",
  titulo: "Doença inflamatória intestinal",
  assunto: "ass-dii",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "ecco-dii", texto: "ECCO — Guidelines on therapeutics in Crohn's disease (2024) e in ulcerative colitis (2022)", lidoEm: null },
    { id: "acg-dii", texto: "ACG — Clinical Guidelines: Ulcerative Colitis (2025) e Crohn's Disease (2025)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Desatualizada (sulfassalazina no Crohn ileal com massa); a reposição q-tp20212-035-ia está no resumo.", questoes: ["q-tp20212-035"] },
  ],
  doencas: [
    {
      id: "conceitos", titulo: "Crohn e retocolite: duas doenças",
      introducao: `[[As duas doenças nascem de uma resposta imune exagerada contra a flora do próprio intestino em quem tem predisposição genética. A **doença de Crohn** é dirigida por linfócitos **Th1/Th17**, com **IL-12 e TNF-alfa**, forma granulomas e atinge **toda a espessura** da parede (transmural), em qualquer ponto da boca ao ânus. A **retocolite ulcerativa** fica na **mucosa** do cólon, começa no reto e sobe de forma contínua.|q-amrigs2024-022,q-tp20241-079,q-usprp2026-019]]

Veja também: **Diarreia e desidratação**, **Câncer colorretal**, **Artrites** (espondiloartrites) e **Obstrução intestinal**.`,
      fragmentos: [
        { id: "con-crohn", titulo: "Doença de Crohn: transmural e salteada", conferir: true,
          questoes: ["q-amrigs2024-022","q-famema2022-039","q-unifesp2024-023","q-unesp2021-014","q-tp20241-079","q-unicampdis2023-031"],
          prosa: `[[Por ser **transmural**, o Crohn perfura e cicatriza: dá **fístulas** (perianais, enteroentéricas), **abscessos** e **estenoses**. As úlceras longitudinais e transversais entre mucosa sã dão o aspecto em **pedra de calçamento**, com áreas doentes salteadas, mais no **íleo terminal**.|q-amrigs2024-022,q-famema2022-039]] [[Diarreia crônica com dor, **perda de peso**, anemia e **doença perianal** (fístula com secreção, plicomas grandes) num jovem é Crohn até prova em contrário. Fístulas perianais que voltam sempre não são falha de técnica: refletem a ativação crônica de **linfócitos T, IL-12 e TNF-alfa**.|q-unifesp2024-023,q-unesp2021-014,q-tp20241-079,q-unicampdis2023-031]]`,
          texto: `- **Transmural**, salteado, pedra de calçamento: **Crohn**. {q-amrigs2024-022,q-famema2022-039}
- Jovem emagrecido com **doença perianal**: Crohn (Th1, IL-12, TNF). {q-unifesp2024-023,q-unesp2021-014,q-tp20241-079,q-unicampdis2023-031}` },
        { id: "con-rcu", titulo: "Retocolite: mucosa, contínua, a partir do reto", conferir: true,
          figuras: [{ arquivo: "figuras/crohn-rcu.svg", legenda: "Esquema autoral: distribuição e profundidade da inflamação no Crohn e na retocolite." }],
          casos: ["q-usprp2026-019"],
          questoes: ["q-usprp2026-019","q-uspsp4-063","q-scmsp2021-008","q-sessp2024-026"],
          prosa: `[[A retocolite é **contínua a partir do reto**, com **diarreia com sangue e muco**, perda do padrão vascular, friabilidade e **pseudopólipos**. A histologia mostra inflamação **restrita à mucosa e submucosa**, com **abscessos de cripta** e distorção da arquitetura das criptas, sem granuloma.|q-usprp2026-019,q-uspsp4-063]] [[O Crohn que atinge **todo o cólon** (pancolônico) é o que mais se confunde com a retocolite.|q-sessp2024-026,q-scmsp2021-008]]`,
          texto: `- Contínua desde o reto, **só mucosa**, abscessos de cripta: **retocolite**. {q-usprp2026-019,q-uspsp4-063}
- Crohn **pancolônico** imita retocolite. {q-sessp2024-026,q-scmsp2021-008}` },
        { id: "con-extra", titulo: "Manifestações extraintestinais e sorologia", conferir: true,
          questoes: ["q-scmsp2021-008","q-fmabc2023-020"],
          prosa: `[[A manifestação extraintestinal mais comum é a **artropatia** (artrite periférica que acompanha a atividade intestinal, ou espondiloartrite que segue curso próprio); há ainda eritema nodoso, uveíte e colangite esclerosante.|q-scmsp2021-008]] [[Na sorologia, **ASCA** (anti-*Saccharomyces*) é mais típico do Crohn e **p-ANCA** da retocolite, mas nenhum basta para o diagnóstico, que é endoscópico e histológico.|q-fmabc2023-020,q-scmsp2021-008]]`,
          texto: `- Extraintestinal mais comum: **artropatia**. {q-scmsp2021-008}
- **ASCA → Crohn**, p-ANCA → retocolite; não diagnosticam sozinhos. {q-fmabc2023-020}` },
      ],
    },
    {
      id: "diagnostico", titulo: "Investigação",
      introducao: `[[A neutrófila que invade a mucosa inflamada libera **calprotectina** nas fezes: é por isso que esse exame separa intestino inflamado (DII, infecção) de intestino só funcional (síndrome do intestino irritável). O diagnóstico de DII, porém, é sempre **endoscópico com biópsia**.|q-scmsp2026-006,q-usprp2026-052,q-unesp2024-046]]`,
      fragmentos: [
        { id: "dx-calprotectina", titulo: "Calprotectina e intestino irritável", conferir: true,
          questoes: ["q-scmsp2026-006","q-usprp2026-052","q-unesp2024-046"],
          prosa: `[[A **calprotectina fecal** é o melhor marcador **não invasivo** de atividade da retocolite (melhor que PCR e VHS). Alta numa diarreia crônica, leva à **colonoscopia com biópsias**.|q-scmsp2026-006,q-usprp2026-052]] [[Diarreia alternada com períodos normais, dor que **melhora com a evacuação**, estufamento, **sem perda de peso, sangue ou anemia**: **síndrome do intestino irritável**; a calprotectina normal ajuda a afastar DII.|q-unesp2024-046]]`,
          texto: `- Atividade da retocolite: **calprotectina fecal**; alta → **colonoscopia**. {q-scmsp2026-006,q-usprp2026-052}
- Dor que alivia ao evacuar, sem sinal de alarme: **intestino irritável**; calprotectina. {q-unesp2024-046}` },
        { id: "dx-crianca", titulo: "DII na criança", conferir: true,
          questoes: ["q-tp20232-046","q-tp20252-112","q-tp20261-077","q-tp20251-060"],
          prosa: `[[Na criança, dor abdominal com **perda de peso, anemia, plaquetose, VHS e PCR altos** e sangue nas fezes não é funcional nem parasitose: é **doença inflamatória intestinal**, mesmo com desencadeante emocional na história.|q-tp20232-046]] [[A investigação é **endoscopia digestiva alta e colonoscopia** (o Crohn pediátrico atinge muito o tubo alto). Dor em quadrante inferior direito com perda de peso começa pela **ultrassonografia**, que mostra o espessamento do íleo sem radiação.|q-tp20252-112,q-tp20261-077,q-tp20251-060]]`,
          texto: `- Dor + perda de peso + anemia + VHS alta: **DII**. {q-tp20232-046}
- **EDA e colonoscopia**; ultrassonografia como primeira imagem. {q-tp20252-112,q-tp20261-077,q-tp20251-060}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento clínico",
      introducao: `[[O tratamento tem duas fases: **induzir** a remissão (apagar o surto) e **mantê-la**. A força do remédio segue a gravidade: aminossalicilato na retocolite leve a moderada, corticoide no surto que não responde, imunossupressor e biológico na doença grave ou no Crohn de alto risco.|q-amrigs2024-012,q-uspsp4-063,q-einstein2021-003]]`,
      fragmentos: [
        { id: "tra-rcu", titulo: "Retocolite: mesalazina, corticoide e colite grave", conferir: true, diretrizes: ["ecco-dii","acg-dii"],
          questoes: ["q-uspsp4-063","q-amrigs2024-012","q-didepm-041"],
          prosa: `[[Retocolite **leve a moderada** distal: **mesalazina oral e retal** (supositório ou enema), que age na mucosa; sem resposta, **corticoide**.|q-uspsp4-063,q-amrigs2024-012]] [[**Colite grave** (seis ou mais evacuações com sangue, taquicardia, febre, anemia, PCR alta): **internar**, afastar *C. difficile* e citomegalovírus, **corticoide venoso** (metilprednisolona 60 mg/dia) e profilaxia de trombose, com reavaliação em 3 a 5 dias; sem resposta, **ciclosporina ou infliximabe** de resgate, ou colectomia.|q-didepm-041,q-amrigs2024-012]]`,
          texto: `- Leve/moderada distal: **mesalazina oral + retal**. {q-uspsp4-063,q-amrigs2024-012}
- Grave: **metilprednisolona IV**, reavaliar em 3–5 dias; resgate com **ciclosporina**/infliximabe. {q-didepm-041,q-amrigs2024-012}` },
        { id: "tra-crohn", titulo: "Crohn: corticoide, biológico e abscesso", conferir: true, diretrizes: ["ecco-dii","acg-dii"],
          casos: ["q-einstein2021-003"],
          questoes: ["q-tp20212-035-ia","q-einstein2021-003","q-usprp2027-070"],
          prosa: `[[Crohn ileal ativo com **massa em fossa ilíaca direita**: antes de dar **corticoide**, uma **imagem precisa afastar abscesso**, porque o corticoide sobre um abscesso piora a sepse. Mesalazina e sulfassalazina quase não funcionam no Crohn do intestino delgado.|q-tp20212-035-ia]] [[Doença extensa e grave (anemia, PCR alta, perda de peso, jovem): **anti-TNF combinado com imunossupressor** desde cedo.|q-einstein2021-003]] [[**Abscesso** em paciente estável: **antibiótico e drenagem percutânea**; a cirurgia fica para depois, eletiva. Não se intensifica imunossupressão com infecção ativa.|q-usprp2027-070]]`,
          texto: `- Massa em FID: **imagem afasta abscesso, depois prednisona**. {q-tp20212-035-ia}
- Grave: **biológico + imunossupressor**. {q-einstein2021-003}
- Abscesso estável: **antibiótico + drenagem percutânea**. {q-usprp2027-070}` },
      ],
    },
    {
      id: "cirurgia", titulo: "Complicações e cirurgia",
      introducao: `[[A cirurgia tem papéis opostos nas duas doenças. Na retocolite, tirar o cólon e o reto **cura** a doença intestinal. No Crohn, que volta em outro segmento, a cirurgia trata só a complicação e deve **poupar intestino**.|q-fmabc2022-039,q-amrigs2023-039,q-einstein2024-025]]`,
      fragmentos: [
        { id: "cir-megacolon", titulo: "Megacólon tóxico", conferir: true, diretrizes: ["ecco-dii"],
          questoes: ["q-usprp2027-071","q-einstein2026-029","q-uspsp2-092","q-fmabc2022-039","q-famerp2022-075"],
          prosa: `[[No **megacólon tóxico** a inflamação passa da mucosa para a camada muscular: a produção de **óxido nítrico** e de mediadores inflamatórios **paralisa a musculatura lisa**, e o cólon dilata (mais de 6 cm) com febre, taquicardia e toxemia.|q-usprp2027-071]] [[Sem melhora rápida com corticoide e antibiótico, ou com sinais de **sepse, peritonite ou perfuração**, o tratamento é **colectomia subtotal com ileostomia terminal**, deixando o coto retal fechado; a bolsa ileal fica para outro tempo. Colostomia em alça e descompressão por colonoscopia não resolvem.|q-einstein2026-029,q-uspsp2-092,q-fmabc2022-039,q-famerp2022-075]]`,
          texto: `- Mecanismo: inflamação e **óxido nítrico paralisam o músculo liso**. {q-usprp2027-071}
- Megacólon com sepse: **colectomia subtotal + ileostomia terminal**. {q-einstein2026-029,q-uspsp2-092,q-fmabc2022-039,q-famerp2022-075}` },
        { id: "cir-crohn", titulo: "Cirurgia no Crohn", conferir: true,
          questoes: ["q-amrigs2023-039","q-einstein2024-025"],
          prosa: `[[O Crohn é operado nas complicações: **obstrução** por estenose, **fístula** que não fecha, **abscesso**, **perfuração**, **megacólon**, sangramento que não para. Sangramento controlado clinicamente não é indicação.|q-amrigs2023-039]] [[Perfuração de delgado com peritonite em paciente estável: **ressecção do segmento** com **anastomose**, retirando o mínimo de intestino.|q-einstein2024-025]]`,
          texto: `- Indicações: **obstrução, fístula, abscesso, perfuração**; não hemorragia controlada. {q-amrigs2023-039}
- Perfuração estável: **enterectomia segmentar com anastomose**. {q-einstein2024-025}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["ecco-dii"],
          questoes: ["q-famerp2022-075","q-einstein2024-025","q-tp20212-035-ia","q-fmabc2023-020"],
          prosa: `[[**Megacólon: operar já ou tentar 24–72 horas?** Sem sepse grave, tenta-se corticoide e antibiótico antes; com sepse franca, como na famerp2022-075, a prova cobrou **cirurgia**.|q-famerp2022-075]] [[**Anastomose ou estoma na perfuração do Crohn**: com peritonite purulenta, desnutrição e corticoide, muitos preferem estoma; a einstein2024-025, com paciente estável e albumina normal, cobrou **anastomose**.|q-einstein2024-025]] [[**Sulfassalazina no Crohn ileal**: a versão antiga da questão a dava como tratamento; a reposição corrige para **prednisona depois de afastar abscesso**.|q-tp20212-035-ia]] [[**Sorologia** não diagnostica DII: ASCA e p-ANCA só sugerem.|q-fmabc2023-020]]`,
          texto: `- Megacólon com sepse: a prova cobrou **cirurgia**. {q-famerp2022-075}
- Perfuração estável: a prova cobrou **anastomose**. {q-einstein2024-025}
- Crohn ileal: **prednisona**, não sulfassalazina. {q-tp20212-035-ia}
- Sorologia **não diagnostica**. {q-fmabc2023-020}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: Crohn × retocolite",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-dii", titulo: "Distribuição, profundidade, clínica e cirurgia", conferir: true,
          questoes: ["q-amrigs2024-022","q-famema2022-039","q-usprp2026-019","q-uspsp4-063"],
          prosa: `[[Profundidade e distribuição explicam tudo o resto.|q-amrigs2024-022,q-famema2022-039,q-usprp2026-019,q-uspsp4-063]]

| | Doença de Crohn | Retocolite ulcerativa |
| Onde | boca ao ânus, mais íleo terminal, salteado | reto e cólon, contínuo |
| Profundidade | transmural, granulomas | mucosa e submucosa, abscessos de cripta |
| Clínica típica | dor, perda de peso, massa, fístula perianal | diarreia com sangue e muco |
| Complicações | fístula, estenose, abscesso | megacólon tóxico, sangramento, câncer |
| Sorologia | ASCA | p-ANCA |
| Cirurgia | trata a complicação, poupando intestino | colectomia cura o intestino |`,
          texto: `- Crohn: **transmural, salteado**. {q-amrigs2024-022,q-famema2022-039}
- Retocolite: **mucosa, contínua**. {q-usprp2026-019,q-uspsp4-063}` },
      ],
    },
  ],
});
