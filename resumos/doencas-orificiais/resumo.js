/* resumos/doencas-orificiais/resumo.js — resumo adaptativo de doenças orificiais
   (ass-coloprocto-orificiais): exame proctológico, hemorroidas (graus, tratamento, sangramento que
   pede colonoscopia, trombose externa, complicações da hemorroidectomia), fissura anal, abscesso e
   fasceíte perianal, fístula anal (Goodsall, Parks, Crohn, retovaginal), doença pilonidal e condiloma;
   armadilhas e tabela da dor anal.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- doencas-orificiais */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "doencas-orificiais",
  titulo: "Doenças orificiais",
  assunto: "ass-coloprocto-orificiais",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "ascrs-orificiais", texto: "ASCRS — Clinical Practice Guidelines: hemorrhoids (2018), anal fissures (2023), anorectal abscess, fistula-in-ano and rectovaginal fistula (2022), pilonidal disease (2019)", lidoEm: null },
    { id: "pcdt-ist", texto: "Ministério da Saúde — PCDT de Infecções Sexualmente Transmissíveis (2022): HPV e verrugas anogenitais", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "hemorroidas", titulo: "Doença hemorroidária",
      introducao: `[[Hemorroidas são **coxins vasculares** normais do canal anal; viram doença quando o esforço evacuatório e as fezes duras os empurram para baixo e eles ingurgitam. A **linha pectínea** divide os dois tipos: acima dela a **interna**, coberta por mucosa sem dor somática, que **sangra e prolapsa**; abaixo a **externa**, coberta por pele com nervos, que **dói e trombosa**.|q-iamspe2026-038,q-unesp2023-069,q-uspsp2-089]]

Veja também: **Doença inflamatória intestinal**, **Câncer colorretal**, **IST** e **Infecções de pele**.`,
      fragmentos: [
        { id: "hem-exame", titulo: "O exame proctológico", conferir: true,
          questoes: ["q-sessp2024-037","q-sessp2025-025"],
          prosa: `[[O exame proctológico tem quatro tempos: **inspeção estática e dinâmica** (pedindo esforço, que mostra o prolapso), **palpação**, **toque retal** e **anuscopia**, que vê os mamilos internos. Colonoscopia não é necessária para diagnosticar hemorroida.|q-sessp2024-037]] [[O toque alcança a **próstata**, o **fecaloma** e a **retocele**; não alcança a transição retossigmoide, e a hemorroida interna de grau I, mole, não se palpa.|q-sessp2025-025]]`,
          texto: `- **Inspeção estática e dinâmica, palpação, toque e anuscopia**. {q-sessp2024-037}
- Toque palpa próstata, fecaloma, retocele; **não** a hemorroida grau I. {q-sessp2025-025}` },
        { id: "hem-graus", titulo: "Graus da hemorroida interna", conferir: true, diretrizes: ["ascrs-orificiais"],
          figuras: [{ arquivo: "figuras/graus-hemorroida.svg", legenda: "Esquema autoral: graus de Goligher da hemorroida interna e o tratamento de cada um." }],
          casos: ["q-uspsp5-069"],
          questoes: ["q-fmabc2026-022","q-iamspe2026-038","q-unesp2023-069","q-uspsp5-069"],
          prosa: `[[A classificação de **Goligher** gradua o prolapso da interna: **I** sangra sem prolapsar; **II** prolapsa e **volta sozinha**; **III** prolapsa e **só volta com a mão**; **IV** fica prolapsada, **sem redução**. Os sintomas da interna são **sangramento e prolapso**.|q-fmabc2026-022,q-iamspe2026-038,q-uspsp5-069]] [[Mamilo nascido acima da linha pectínea que não se consegue reduzir é **interno de grau IV**: **hemorroidectomia**.|q-unesp2023-069]]`,
          texto: `- **III = redução manual**; IV = irredutível. {q-fmabc2026-022,q-uspsp5-069}
- Interna: **sangramento e prolapso**; grau IV → hemorroidectomia. {q-iamspe2026-038,q-unesp2023-069}` },
        { id: "hem-tratamento", titulo: "Tratamento: fibra, ligadura ou cirurgia", conferir: true, diretrizes: ["ascrs-orificiais"],
          casos: ["q-usprp2026-020"],
          questoes: ["q-sessp2026-031","q-tp20212-069","q-usprp2026-020","q-usp2023-016","q-sessp2022-033"],
          prosa: `[[Para todos, **fibra, água e evacuação sem esforço**, que tiram a força que empurra o coxim; sangramento discreto sem prolapso importante fica só nisso. Pomada não muda a doença.|q-usp2023-016,q-sessp2022-033]] [[Interna que **prolapsa e reduz** (graus II e III selecionados): **ligadura elástica** no consultório, que necrosa o mamilo acima da linha pectínea sem dor.|q-sessp2026-031,q-tp20212-069]] [[Volumosa, irredutível, mista ou que falhou ao tratamento clínico: **hemorroidectomia excisional** (Milligan-Morgan), com menos recidiva que grampeamento e desarterialização.|q-usprp2026-020]]`,
          texto: `- Todos: **fibra e água**; sangramento leve, só isso. {q-usp2023-016,q-sessp2022-033}
- Prolapso que reduz: **ligadura elástica**. {q-sessp2026-031,q-tp20212-069}
- Volumosa/irredutível: **hemorroidectomia excisional**. {q-usprp2026-020}` },
        { id: "hem-sangramento", titulo: "Sangue vivo: quando investigar o cólon", conferir: true,
          questoes: ["q-uspsp1-042","q-usp2023-016","q-sessp2022-033"],
          prosa: `[[Sangue vivo no papel não é sempre hemorroida. Acima de **45–50 anos**, com mudança do hábito intestinal, anemia ou história familiar, ou quando o exame anal não explica o sangramento, faz-se **colonoscopia** antes de operar. Mulher jovem com um episódio e sem sinais de alarme não precisa.|q-uspsp1-042,q-sessp2022-033]] Colonoscopia recente normal dispensa repetir. [[Por isso o homem de 61 anos com colonoscopia de 2 anos atrás e hemorroida no exame só precisa de **dieta e higiene**.|q-usp2023-016]]`,
          texto: `- ≥ 45–50 anos ou alarme: **colonoscopia** antes de operar. {q-uspsp1-042}
- Jovem sem alarme ou colonoscopia recente: **tratar sem novo exame**. {q-sessp2022-033,q-usp2023-016}` },
        { id: "hem-trombose", titulo: "Trombose hemorroidária externa", conferir: true,
          casos: ["q-uspsp2-089"],
          questoes: ["q-uspsp2-089","q-famema2025-024"],
          prosa: `[[Um coágulo no plexo **externo** dá **dor súbita e intensa** com **nódulo violáceo e duro** na borda anal, às vezes com sangramento quando o coágulo rompe a pele; a gestação e o esforço favorecem. Nas primeiras 72 horas pode-se excisar o trombo; depois, analgesia, banho de assento e fibra, porque a dor já está cedendo.|q-uspsp2-089,q-famema2025-024]]`,
          texto: `- Dor súbita + nódulo violáceo na borda: **trombose externa**. {q-uspsp2-089,q-famema2025-024}` },
        { id: "hem-complicacoes", titulo: "Complicações da hemorroidectomia", conferir: true,
          questoes: ["q-einstein2021-016","q-einstein2026-026"],
          prosa: `[[A complicação mais comum logo após a operação é a **retenção urinária**: dor, raquianestesia e opioide inibem a bexiga. Massa dolorosa no hipogástrio é **bexigoma**: **sondagem de alívio**.|q-einstein2021-016]] [[Semanas depois, fezes afiladas e dificuldade para evacuar sugerem **estenose anal** por **ressecção excessiva de pele e mucosa** (faltaram pontes cutâneas entre as feridas).|q-einstein2026-026]]`,
          texto: `- Pós-operatório imediato: **bexigoma → sondagem de alívio**. {q-einstein2021-016}
- Semanas depois, fezes finas: **estenose** por ressecção excessiva. {q-einstein2026-026}` },
      ],
    },
    {
      id: "fissura", titulo: "Fissura anal",
      introducao: `[[A fissura é um rasgo do anoderma, quase sempre na **linha média posterior** (na mulher também anterior), onde a irrigação é mais pobre. A dor faz o **esfíncter interno contrair** (hipertonia), o que reduz ainda mais o fluxo e impede a cicatrização: um ciclo de isquemia.|q-sessp2023-001,q-sessp2024-038]]`,
      fragmentos: [
        { id: "fis-tratamento", titulo: "Crônica e tratamento", conferir: true, diretrizes: ["ascrs-orificiais"],
          questoes: ["q-sessp2023-001","q-sessp2024-038"],
          prosa: `[[A fissura **crônica** (mais de 6 a 8 semanas) tem **plicoma sentinela**, **papila hipertrófica**, bordas elevadas e fibras do esfíncter no fundo. O tratamento começa por **diltiazem 2%** (ou nitrato) tópico, que **relaxa o esfíncter interno** e devolve o fluxo; sem resposta, toxina botulínica ou **esfincterotomia lateral interna**.|q-sessp2023-001,q-sessp2024-038]]`,
          texto: `- Crônica: **plicoma sentinela, papila hipertrófica, hipertonia**. {q-sessp2023-001}
- **Diltiazem tópico relaxa o esfíncter interno**; depois esfincterotomia. {q-sessp2023-001,q-sessp2024-038}` },
      ],
    },
    {
      id: "supuracoes", titulo: "Abscesso e fístula anal",
      introducao: `[[O abscesso anorretal nasce numa das **glândulas anais** que se abrem nas criptas da linha pectínea: obstruída, ela infecciona e o pus caminha entre os esfíncteres. Drenado, cerca de um terço deixa um trajeto epitelizado entre a cripta e a pele: a **fístula**.|q-usp2023-004,q-sirio2021-036]]`,
      fragmentos: [
        { id: "sup-abscesso", titulo: "Abscesso e fasceíte perianal", conferir: true, diretrizes: ["ascrs-orificiais"],
          questoes: ["q-usp2023-004","q-unesp2026-076"],
          prosa: `[[Dor perianal progressiva, pior ao sentar e evacuar, com **febre**: **abscesso** pela inflamação das **glândulas do canal anal**. O tratamento é **drenagem**; antibiótico sozinho não basta.|q-usp2023-004]] [[No diabético descompensado, área perianal **enegrecida com bolhas**, crepitação e toxemia é **fasceíte necrotizante** (Fournier): desbridamento cirúrgico urgente e antibiótico de amplo espectro.|q-unesp2026-076]]`,
          texto: `- Dor perianal + febre: **abscesso criptoglandular → drenar**. {q-usp2023-004}
- Pele enegrecida, bolhas, diabético: **fasceíte necrotizante (Fournier)**. {q-unesp2026-076}` },
        { id: "sup-fistula", titulo: "Fístula anal", conferir: true, diretrizes: ["ascrs-orificiais"],
          casos: ["q-iamspe2022-022","q-uspsp2-088"],
          questoes: ["q-sirio2021-036","q-iamspe2022-022","q-uspsp1-041","q-uspsp2-088","q-udisc20262-074"],
          prosa: `[[Pus que volta a sair perto do ânus semanas depois de drenar um abscesso é **fístula**, não falha de drenagem. A **regra de Goodsall** orienta a busca do orifício interno: orifício externo **anterior** tem trajeto **reto** até a cripta; **posterior**, trajeto **curvo** até a linha média posterior.|q-sirio2021-036,q-iamspe2022-022,q-uspsp1-041]] [[A classificação de Parks diz quanto esfíncter o trajeto cruza. **Interesfincteriana** baixa: **fistulotomia**. **Transesfincteriana**: cortar seria arriscar incontinência (a baixa, selecionada, ainda admite fistulotomia); usa-se sedenho (seton), retalho ou **LIFT** (ligadura do trajeto no espaço interesfincteriano).|q-uspsp2-088]] [[A fístula **retovaginal** tem como causa mais comum o **trauma obstétrico** (laceração perineal).|q-udisc20262-074]]`,
          texto: `- Pus após drenagem: **fístula**; Goodsall: anterior reto, posterior curvo. {q-sirio2021-036,q-iamspe2022-022,q-uspsp1-041}
- Transesfincteriana: **LIFT**, seton ou retalho; interesfincteriana: fistulotomia. {q-uspsp2-088}
- Retovaginal: **trauma obstétrico**. {q-udisc20262-074}` },
      ],
    },
    {
      id: "pilonidal", titulo: "Doença pilonidal",
      introducao: `[[Na **fenda interglútea**, pelos soltos são empurrados para dentro da pele pelo atrito e pela pressão de ficar sentado, formando um seio que infecciona: a doença **pilonidal**, de jovens, com episódios que melhoram e voltam.|q-sessp2026-032,q-usp2024-042]]`,
      fragmentos: [
        { id: "pil-conduta", titulo: "Abscesso pilonidal: drenar", conferir: true, diretrizes: ["ascrs-orificiais"],
          casos: ["q-usp2024-042"],
          questoes: ["q-sessp2026-032","q-usp2024-042","q-sirio2023-040","q-sirio2022-035"],
          prosa: `[[Dor, abaulamento e secreção fétida **na região sacrococcígea, na linha média**, com episódios prévios: **cisto pilonidal infectado**.|q-sessp2026-032]] [[O abscesso agudo se trata com **drenagem incisional** (aberta), à **beira-leito sob anestesia local**; a ressecção do seio fica para depois, eletiva, com a inflamação resolvida. Antibiótico sozinho ou punção não resolvem.|q-usp2024-042,q-sirio2023-040,q-sirio2022-035]]`,
          texto: `- Linha média sacrococcígea com secreção: **pilonidal**. {q-sessp2026-032}
- Abscesso agudo: **drenagem à beira-leito**; ressecção depois. {q-usp2024-042,q-sirio2023-040,q-sirio2022-035}` },
      ],
    },
    {
      id: "condiloma", titulo: "Condiloma perianal",
      introducao: `[[O condiloma acuminado é proliferação da pele causada pelo **HPV** (tipos 6 e 11), transmitida pelo sexo. Quem tem uma IST tem risco das outras: o tratamento da lesão vem junto com o **rastreio de HIV, sífilis e hepatites**.|q-sessp2025-023,q-sessp2026-033]]`,
      fragmentos: [
        { id: "con-tratamento", titulo: "Tratar e rastrear", conferir: true, diretrizes: ["pcdt-ist"],
          questoes: ["q-sessp2025-023","q-sessp2026-033"],
          prosa: `[[Lesão **única e pequena**: **excisão a frio** sob anestesia local, com **anatomopatológico** e sorologias.|q-sessp2025-023]] [[Lesões **múltiplas**: **ácido tricloroacético** e eletrocoagulação programada, com **anuscopia** para ver o canal e rastreio de HIV e das outras IST.|q-sessp2026-033]]`,
          texto: `- Única: **excisão + anatomopatológico + sorologias**. {q-sessp2025-023}
- Múltiplas: **ATA + eletrocoagulação**, rastrear HIV. {q-sessp2026-033}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["ascrs-orificiais"],
          questoes: ["q-tp20212-069","q-uspsp2-088","q-sessp2023-001","q-sessp2025-025"],
          prosa: `[[**Nódulo azulado redutível**: dor e cor violácea lembram trombose externa, mas o mamilo que **reduz** e sangra é interno; a tp20212-069 cobrou **ligadura elástica**.|q-tp20212-069]] [[**Fístula no Crohn**: muitos começam pelo **seton** com tratamento clínico; a uspsp2-088, com doença tratada e sem inflamação ativa, cobrou **LIFT**.|q-uspsp2-088]] [[**Fissura anterior**: a posterior é a mais comum; a sessp2023-001 descreveu a crônica na **linha média anterior**, que também ocorre, sobretudo na mulher.|q-sessp2023-001]] [[**Toque retal** não diagnostica hemorroida grau I nem tumor da transição retossigmoide.|q-sessp2025-025]]`,
          texto: `- Mamilo azulado **redutível**: a prova cobrou ligadura. {q-tp20212-069}
- Crohn sem atividade: a prova cobrou **LIFT**. {q-uspsp2-088}
- Fissura pode ser **anterior**. {q-sessp2023-001}
- Toque não palpa grau I. {q-sessp2025-025}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: dor anal",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-dor", titulo: "Causa, achado e conduta", conferir: true,
          questoes: ["q-uspsp2-089","q-sessp2023-001","q-usp2023-004","q-sessp2026-032"],
          prosa: `[[O exame da borda anal separa as causas de dor.|q-uspsp2-089,q-sessp2023-001,q-usp2023-004,q-sessp2026-032]]

| Causa | Dor | Achado | Conduta |
|---|---|---|---|
| Trombose externa | súbita, constante | nódulo violáceo na borda | excisão até 72 h; depois clínico |
| Fissura | ao evacuar, dura horas | rasgo na linha média, plicoma | diltiazem; esfincterotomia |
| Abscesso perianal | progressiva, com febre | abaulamento doloroso | drenagem |
| Pilonidal | sacrococcígea | abscesso na linha média da fenda | drenagem; ressecção eletiva |`,
          texto: `- Trombose: **nódulo violáceo**. {q-uspsp2-089}
- Fissura: **diltiazem**. {q-sessp2023-001}
- Abscesso: **drenar**. {q-usp2023-004}
- Pilonidal: **fenda interglútea**. {q-sessp2026-032}` },
      ],
    },
  ],
});
