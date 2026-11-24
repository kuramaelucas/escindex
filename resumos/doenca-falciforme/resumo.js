/* resumos/doenca-falciforme/resumo.js — resumo adaptativo de doença falciforme e hemoglobinopatias
   (ass-hemato-hemoglobinopatias): mecanismo da falcização, herança, triagem neonatal e traço,
   eletroforese (SS, SC, Sβ), talassemia menor, crise de dor, síndrome torácica aguda (diagnóstico e
   tratamento), sequestro esplênico, crise aplástica, hidroxiureia, transfusão e cálculo biliar;
   armadilhas e tabela das crises agudas.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- doenca-falciforme */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "doenca-falciforme",
  titulo: "Doença falciforme e hemoglobinopatias",
  assunto: "ass-hemato-hemoglobinopatias",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "ms-falciforme", texto: "Ministério da Saúde — Doença falciforme: condutas básicas para tratamento (2012) e PCDT da doença falciforme (hidroxiureia)", lidoEm: null },
    { id: "ash-falciforme", texto: "American Society of Hematology — diretrizes de doença falciforme: dor aguda e crônica (2020) e transfusão (2020)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada; a questão autoral q-adap24-100, com o mesmo caso refeito, está no resumo.", questoes: ["q-unifesp2024-100"] },
  ],
  doencas: [
    {
      id: "base", titulo: "Hemoglobina S, herança e diagnóstico",
      introducao: `[[A doença falciforme é uma das doenças genéticas mais comuns do Brasil. Uma troca de aminoácido na cadeia beta forma a **hemoglobina S**, que, **sem oxigênio, polimeriza**: a hemácia vira foice, fica rígida, entope a microcirculação (**vaso-oclusão**) e é destruída cedo (**hemólise**). Frio, desidratação, infecção e hipóxia aumentam a falcização. É **autossômica recessiva**: doente quem herda HbS dos dois pais (SS) ou HbS com outra alteração (SC, S-beta-talassemia).|q-iamspe2023-041,q-sessp2024-047,q-tp20212-024]]

Veja também: **Anemias**, **Triagem neonatal**, **Calendário vacinal** e **Colecistite e coledocolitíase**.`,
      fragmentos: [
        { id: "bas-mecanismo", titulo: "Vaso-oclusão e hemólise", conferir: true,
          figuras: [{ arquivo: "figuras/falcizacao.svg", legenda: "Esquema autoral: a hemoglobina S polimeriza sem oxigênio; daí as complicações por vaso-oclusão e por hemólise." }],
          questoes: ["q-iamspe2023-041","q-sessp2024-047","q-tp20212-024","q-sessp2022-059"],
          prosa: `[[A vaso-oclusão causa a **crise de dor**, a complicação mais frequente e o principal motivo de ida à emergência; o primeiro sinal no lactente costuma ser a **dactilite** (mãos e pés inchados e doloridos). A hemólise crônica dá anemia com reticulócitos altos e icterícia. O baço se infarta nos primeiros anos (**autoesplenectomia**), e a criança fica exposta a bactérias encapsuladas.|q-iamspe2023-041,q-sessp2024-047,q-sessp2022-059]] [[Dor forte e recorrente nos membros desde a infância, com palidez e icterícia, é crise vaso-oclusiva até prova em contrário.|q-tp20212-024]]`,
          texto: `- Crise de dor: **a complicação mais frequente**; dactilite no lactente. {q-iamspe2023-041,q-sessp2024-047,q-sessp2022-059}
- Dor recorrente + palidez + icterícia: **vaso-oclusão**. {q-tp20212-024}` },
        { id: "bas-triagem", titulo: "Triagem neonatal e traço falciforme", conferir: true, diretrizes: ["ms-falciforme"],
          questoes: ["q-fmabc2021-093","q-sessp2022-059","q-iamspe2023-041","q-usprp2026-093"],
          prosa: `[[O **teste do pezinho** detecta a doença: o recém-nascido tem muita HbF; resultado **FS** (HbF e HbS, sem HbA) é **doença falciforme**; **FAS** é traço. Na criança não triada, dactilite com irmão em hidroxiureia pede **eletroforese de hemoglobina**.|q-fmabc2021-093,q-sessp2022-059,q-iamspe2023-041]] [[O **traço falciforme** (AS, cerca de 40% de HbS com HbA predominante) não dá anemia nem crises; a conduta é **aconselhamento genético**, porque dois portadores têm 25% de chance de filho doente.|q-usprp2026-093]]`,
          texto: `- Pezinho **FS** = doença falciforme. {q-fmabc2021-093,q-sessp2022-059,q-iamspe2023-041}
- Traço **AS**: sem anemia; **aconselhamento genético**. {q-usprp2026-093}` },
        { id: "bas-eletroforese", titulo: "Ler a eletroforese", conferir: true,
          questoes: ["q-simepm89-098","q-einstein2023-041","q-udisc20262-064"],
          prosa: `[[Na **S-beta+ talassemia** a HbS predomina, ainda há **um pouco de HbA**, a **HbA2 sobe** (acima de 3,5%) e as hemácias são **microcíticas**; na SS não há HbA e o VCM é normal; na SC, HbS e HbC em partes iguais.|q-simepm89-098]] [[Anemia hemolítica com hemácias em alvo e **corpos de Howell-Jolly** (sinal de baço que não funciona) numa criança pequena, ou uma adolescente com cálculo biliar que piora da icterícia e da dor depois de cirurgia, pedem **eletroforese de hemoglobina**.|q-einstein2023-041,q-udisc20262-064]]`,
          texto: `- HbS + pouca HbA + **HbA2 alta + microcitose**: **Sβ+**. {q-simepm89-098}
- Hemólise com Howell-Jolly; icterícia e dor após cirurgia: **eletroforese**. {q-einstein2023-041,q-udisc20262-064}` },
        { id: "bas-talassemia", titulo: "Microcitose com ferro normal: talassemia menor", conferir: true,
          questoes: ["q-scmsp2026-011","q-einstein2024-002","q-usprp2022-096"],
          prosa: `[[Na talassemia, falta cadeia de globina: as hemácias saem **muito pequenas** (VCM 55–65) com anemia leve ou ausente e **ferro e ferritina normais**. Microcitose desproporcional à anemia, sem ferropenia, se esclarece com **eletroforese de hemoglobina** (HbA2 alta na beta-talassemia menor). Ferro empírico não corrige e sobrecarrega.|q-scmsp2026-011,q-einstein2024-002,q-usprp2022-096]]`,
          texto: `- Microcitose com **ferro normal**: **eletroforese** (talassemia). {q-scmsp2026-011,q-einstein2024-002,q-usprp2022-096}` },
      ],
    },
    {
      id: "agudas", titulo: "Complicações agudas",
      introducao: `[[Cada crise aguda tem um mecanismo próprio, e o hemograma comparado com a **hemoglobina basal** e os **reticulócitos** os separa: na dor e na síndrome torácica a vaso-oclusão domina; no sequestro o sangue fica preso no baço (Hb cai, baço cresce, reticulócitos sobem); na crise aplástica a medula para (Hb cai, reticulócitos quase zero).|q-usprp2023-011,q-scmsp2023-048,q-sirio2024-042]]`,
      fragmentos: [
        { id: "agu-dor", titulo: "Crise de dor", conferir: true, diretrizes: ["ash-falciforme"],
          questoes: ["q-fmabc2024-054","q-tp20212-024","q-usp2023-099","q-iamspe2023-041"],
          prosa: `[[A dor da vaso-oclusão é isquêmica e intensa: se não cede com dipirona em casa, recebe **opioide (morfina) venoso** em horário, com reavaliação frequente, associado a dipirona; hidratação **de manutenção**, ácido fólico e aquecimento (frio desencadeia). Excesso de soro e anti-inflamatório não substituem o opioide.|q-fmabc2024-054,q-tp20212-024,q-iamspe2023-041]] [[Dor forte em tórax e membros com piora respiratória num internado é sinal de alerta: **opioide** e **nova imagem do tórax**, porque a síndrome torácica pode estar começando.|q-usp2023-099]]`,
          texto: `- Dor que não cede: **morfina venosa** + dipirona, hidratação de manutenção. {q-fmabc2024-054,q-tp20212-024,q-iamspe2023-041}
- Dor torácica nova no internado: **opioide e repetir imagem**. {q-usp2023-099}` },
        { id: "agu-sta-diagnostico", titulo: "Síndrome torácica aguda: diagnóstico", conferir: true, diretrizes: ["ash-falciforme"],
          questoes: ["q-sessp2023-079","q-scmsp2022-031","q-adap24-100","q-usp2023-099"],
          prosa: `[[A síndrome torácica aguda é a principal causa de morte: infecção, embolia de gordura da medula infartada e hipoventilação por dor somam-se no pulmão. O diagnóstico é **infiltrado novo** na radiografia **mais** um de: **dor torácica**, **febre > 38,5 °C**, taquipneia, tosse, sibilos, estertores ou **hipoxemia**. Sinais de isquemia no eletrocardiograma não fazem parte; hipoxemia não é obrigatória.|q-sessp2023-079,q-scmsp2022-031,q-adap24-100,q-usp2023-099]]`,
          texto: `- **Infiltrado novo** + dor torácica, febre, sinais respiratórios ou hipoxemia. {q-sessp2023-079,q-scmsp2022-031,q-adap24-100,q-usp2023-099}` },
        { id: "agu-sta-tratamento", titulo: "Síndrome torácica aguda: tratamento", conferir: true, diretrizes: ["ash-falciforme"],
          casos: ["q-scmsp2021-052"],
          questoes: ["q-scmsp2021-052","q-einstein2027-043","q-einstein2026-031","q-adap24-100","q-scmsp2022-031"],
          prosa: `[[O tratamento cobre os germes típicos e atípicos: **ceftriaxona + macrolídeo**, oxigênio, **morfina**, hidratação de manutenção (não em excesso) e **espirometria de incentivo**, que reabre os alvéolos.|q-einstein2027-043,q-adap24-100,q-scmsp2022-031]] [[A **transfusão** entra quando a hemoglobina **caiu abaixo da basal** (1 g/dL ou mais) ou há **hipoxemia** que piora: ela dilui a HbS e melhora a oxigenação; nos graves, **exsanguineotransfusão**. Com Hb na basal e saturação boa, não se transfunde.|q-scmsp2021-052,q-einstein2026-031,q-einstein2027-043]]`,
          texto: `- **Ceftriaxona + macrolídeo**, O2, morfina, espirometria de incentivo. {q-einstein2027-043,q-adap24-100,q-scmsp2022-031}
- Hb abaixo da basal ou hipoxemia: **transfundir** (simples ou troca). {q-scmsp2021-052,q-einstein2026-031,q-einstein2027-043}` },
        { id: "agu-sequestro", titulo: "Sequestro esplênico", conferir: true, diretrizes: ["ms-falciforme"],
          casos: ["q-fmabc2021-094"],
          questoes: ["q-usprp2023-011","q-sessp2026-053","q-sessp2025-057","q-sirio2024-042","q-fmabc2021-094","q-sessp2024-047"],
          prosa: `[[Antes da autoesplenectomia (até uns 5 anos), o baço ainda cresce e pode **represar o sangue** de repente: **palidez súbita**, **baço aumentado** a vários centímetros do rebordo, **queda da Hb ≥ 2 g/dL** abaixo da basal, reticulócitos altos e, às vezes, choque. É emergência: **transfusão de hemácias** urgente (em volume pequeno, porque o baço devolve sangue ao melhorar) e monitorização. Os pais aprendem a palpar o baço.|q-usprp2023-011,q-sessp2026-053,q-sessp2025-057,q-sirio2024-042,q-fmabc2021-094,q-sessp2024-047]]`,
          texto: `- Palidez súbita + **baço grande** + Hb caindo: **sequestro**. {q-usprp2023-011,q-sessp2026-053,q-sirio2024-042,q-fmabc2021-094,q-sessp2024-047}
- **Transfusão urgente**; esplenectomia não é a conduta aguda. {q-sessp2025-057}` },
        { id: "agu-aplastica", titulo: "Crise aplástica (parvovírus B19)", conferir: true,
          questoes: ["q-scmsp2023-048","q-usp2026-065","q-uspsp5-112"],
          prosa: `[[O **parvovírus B19** infecta os precursores das hemácias e para a medula por uma ou duas semanas. Quem não tem doença hemolítica nem percebe; na falciforme, com hemácias que vivem pouco, a Hb despenca com **reticulócitos quase zero** e baço do tamanho habitual. Pede-se **sorologia para parvovírus**; o tratamento é **suporte e transfusão** se sintomático, até os reticulócitos voltarem.|q-scmsp2023-048,q-usp2026-065,q-uspsp5-112]]`,
          texto: `- Hb despenca com **reticulócitos baixos**: **crise aplástica** (parvovírus). {q-scmsp2023-048,q-usp2026-065,q-uspsp5-112}` },
      ],
    },
    {
      id: "cronico", titulo: "Seguimento: hidroxiureia, transfusão e vesícula",
      introducao: `[[O seguimento tenta evitar as crises: **penicilina profilática** e vacinas contra encapsulados na infância, **Doppler transcraniano** para prever AVC, **hidroxiureia** para quem tem doença grave e transfusão quando necessário, com cuidado para não aloimunizar.|q-sirio2023-003,q-usp2025-077]]`,
      fragmentos: [
        { id: "cro-hidroxiureia", titulo: "Hidroxiureia", conferir: true, diretrizes: ["ms-falciforme"],
          questoes: ["q-sirio2023-003"],
          prosa: `[[A **hidroxiureia** aumenta a **hemoglobina fetal**, que não polimeriza, e diminui as crises. Indicação típica: crises de dor repetidas, **síndrome torácica aguda**, **necrose da cabeça do fêmur**, priapismo ou anemia grave.|q-sirio2023-003]]`,
          texto: `- Síndrome torácica, necrose óssea, crises repetidas: **hidroxiureia** (sobe HbF). {q-sirio2023-003}` },
        { id: "cro-transfusao", titulo: "Transfusão na doença falciforme", conferir: true, diretrizes: ["ash-falciforme"],
          questoes: ["q-usp2025-077","q-fmabc2022-058"],
          prosa: `[[Quem recebe muito sangue forma anticorpos contra antígenos das hemácias doadas: por isso o concentrado é **leucorreduzido** e com **fenotipagem estendida** (Rh e Kell, entre outros).|q-usp2025-077]] [[Antes de cirurgia com anestesia geral, a meta é Hb perto de 10 g/dL com menos HbS. Se a Hb **já está perto de 10** e a HbS é alta, transfusão simples aumentaria a viscosidade: faz-se **exsanguineotransfusão parcial**.|q-fmabc2022-058]]`,
          texto: `- Concentrado **fenotipado** e leucorreduzido. {q-usp2025-077}
- Hb ~10 com HbS alta antes de cirurgia: **exsanguineotransfusão parcial**. {q-fmabc2022-058}` },
        { id: "cro-vesicula", titulo: "Cálculo biliar", conferir: true,
          questoes: ["q-famema2022-091","q-udisc20262-064"],
          prosa: `[[A hemólise contínua joga bilirrubina na bile e forma **cálculos de bilirrubinato** já na infância. Cólica no hipocôndrio direito em adolescente falciforme é **colelitíase**, vista na **ultrassonografia**; a colecistectomia eletiva evita colecistite.|q-famema2022-091,q-udisc20262-064]]`,
          texto: `- Cólica biliar no falciforme: **cálculo** na ultrassonografia. {q-famema2022-091,q-udisc20262-064}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["ash-falciforme"],
          questoes: ["q-scmsp2021-052","q-einstein2027-043","q-scmsp2022-031","q-sessp2024-047"],
          prosa: `[[**Transfundir ou não na síndrome torácica**: depende da Hb e da oxigenação. Na scmsp2021-052 a Hb era 6 (bem abaixo da basal) com saturação de 91%: transfusão; na einstein2027-043 a Hb estava na basal: sem transfusão.|q-scmsp2021-052,q-einstein2027-043]] [[**Hipoxemia não é obrigatória** para o diagnóstico de síndrome torácica, e soro **acima** da manutenção piora o edema pulmonar.|q-scmsp2022-031]] [[**Herança**: a doença é autossômica **recessiva**; a alternativa que diz "dominante" está errada.|q-sessp2024-047]]`,
          texto: `- Transfusão na STA: **Hb abaixo da basal ou hipoxemia**. {q-scmsp2021-052,q-einstein2027-043}
- STA **sem** hipoxemia existe; soro em excesso piora. {q-scmsp2022-031}
- Herança **recessiva**. {q-sessp2024-047}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: crises agudas",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-crises", titulo: "Hemoglobina, reticulócitos, baço e conduta", conferir: true,
          questoes: ["q-tp20212-024","q-sessp2023-079","q-usprp2023-011","q-scmsp2023-048"],
          prosa: `[[Hb, reticulócitos e baço separam as crises.|q-tp20212-024,q-sessp2023-079,q-usprp2023-011,q-scmsp2023-048]]

| Crise | Hb | Reticulócitos | Baço | Conduta |
|---|---|---|---|---|
| Dor (vaso-oclusiva) | perto da basal | altos | habitual | morfina, hidratação de manutenção |
| Síndrome torácica aguda | basal ou caindo | altos | habitual | ceftriaxona + macrolídeo, O2, transfundir se cair ou hipoxemia |
| Sequestro esplênico | cai ≥ 2 g/dL | altos | cresce de repente | transfusão urgente |
| Aplástica | cai muito | quase zero | habitual | parvovírus; suporte e transfusão |`,
          texto: `- Dor: **morfina**. {q-tp20212-024}
- STA: **infiltrado novo**. {q-sessp2023-079}
- Sequestro: **baço cresce**. {q-usprp2023-011}
- Aplástica: **reticulócitos zero**. {q-scmsp2023-048}` },
      ],
    },
  ],
});
