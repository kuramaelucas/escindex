/* resumos/maus-tratos/resumo.js — resumo adaptativo de suspeita de maus-tratos na infância: sinais de
   alerta, investigação (inquérito esquelético, fundo de olho, tomografia), bebê sacudido, violência sexual
   na criança e no adolescente (profilaxias), negligência, Munchausen por procuração e notificação.
   Violência contra o idoso e violência sexual na mulher adulta são outros assuntos da taxonomia.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- maus-tratos */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "maus-tratos",
  titulo: "Maus-tratos na infância",
  assunto: "ass-emergped-maustratos",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "eca", texto: "Estatuto da Criança e do Adolescente (Lei 8.069/1990, art. 13 e 245) e Lei 13.010/2014 (Lei Menino Bernardo)", lidoEm: null },
    { id: "ms-violencia-sexual", texto: "Ministério da Saúde — Norma técnica de prevenção e tratamento dos agravos resultantes da violência sexual e PCDT de Profilaxia Pós-Exposição (PEP)", lidoEm: null },
    { id: "sbp-maus-tratos", texto: "Sociedade Brasileira de Pediatria — Manual de atendimento às crianças e adolescentes vítimas de violência", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada: sem gabarito para medir o erro", questoes: ["q-sessp2024-042"] },
  ],
  doencas: [
    {
      id: "fisico", titulo: "Abuso físico: reconhecer e investigar",
      introducao: `[[O que denuncia o abuso físico é a lesão que não combina com a história: o mecanismo descrito é impossível para a idade, a versão muda, a família demora a procurar ajuda ou tem pressa em ir embora, ou a lesão fica onde quedas não batem.|q-usp2026-050,q-adap22-063,q-unifesp2022-063]] Quedas acidentais atingem saliências ósseas (testa, cotovelos, joelhos); nádegas, costas, orelhas e pescoço são protegidos e, machucados, levantam suspeita.

[[Certas fraturas quase nunca são acidentais no lactente: costelas posteriores, que se quebram quando o tórax é apertado entre as mãos, lesões metafisárias por tração e torção, e fraturas em espiral em quem ainda não anda.|q-adap24-090,q-famerp2025-058,q-famema2022-100]] [[Na queimadura por imersão, a água quente forma bordas nítidas e simétricas, sem respingos, porque a criança foi segurada dentro dela.|q-unifesp2024-085]]

Veja também: **Infecções sexualmente transmissíveis** (profilaxias após violência sexual).`,
      fragmentos: [
        { id: "fis-sinais", titulo: "Sinais de alerta", conferir: true, diretrizes: ["sbp-maus-tratos"],
          figuras: [{ arquivo: "figuras/sinais-alerta.svg", legenda: "Esquema autoral: os sinais de alerta na história, na pele e nos ossos, e o que fazer diante da suspeita." }],
          questoes: ["q-usp2026-050","q-adap22-063","q-unifesp2022-063","q-adap24-090","q-famerp2025-058","q-famema2022-100","q-unifesp2024-085","q-tp20251-053","q-fmabc2024-093"],
          casos: ["q-usp2026-050","q-fmabc2024-093"],
          prosa: `O que denuncia o abuso é a **discordância**: lesão que o mecanismo contado não explica, que a idade não permite (bebê que não rola não cai da cama) ou história que muda a cada relato. Lesões em fases diferentes de cicatrização, em áreas protegidas (nádegas, costas, orelhas) e fraturas de costelas posteriores ou metafisárias, que exigem torção ou compressão, falam contra acidente.`,
          texto: `- Mecanismo **incompatível com a idade** (bebê de 1 mês que "rolou"): suspeita justificada. {q-usp2026-050}
- História vaga que muda + **fratura em espiral do úmero**: internar para proteção, notificar e investigar. {q-adap22-063,q-famema2022-100}
- Hematomas em **nádegas** com explicação de queda: **buscar outras lesões** antes de concluir. {q-unifesp2022-063}
- Mais sugestivo de abuso: **fraturas de costelas posteriores em diferentes fases** de consolidação. {q-adap24-090}
- Lesão **metafisária** e costelas com calo: **internar** e investigar. {q-famerp2025-058}
- Queimadura com **bordas definidas**: imersão intencional. {q-unifesp2024-085}
- Lesões em fases diferentes e "criança que se machuca muito": **notificar** e pedir visita domiciliar. {q-tp20251-053}
- Nem toda lesão é abuso: no lactente que recebeu cuidado intensivo, a lesão pode ser **iatrogênica**. {q-fmabc2024-093}` },
        { id: "fis-sacudido", titulo: "Síndrome do bebê sacudido", conferir: true,
          questoes: ["q-scmsp2023-046","q-iamspe2022-033","q-famema2023-085","q-tp20202-060","q-simepm89-092","q-adap21-045","q-unifesp2023-066","q-uspsp5-118"],
          prosa: `Ao ser sacudido, o lactente, de cabeça grande e pescoço fraco, sofre aceleração e desaceleração que rompem as veias pontes (hematoma subdural) e os vasos da retina, muitas vezes sem marca externa. O quadro é neurológico (sonolência, vômitos, convulsão) e por isso a investigação inclui imagem do crânio, fundo de olho e inquérito esquelético.`,
          texto: `- Lactente com sonolência, vômitos, convulsão e pouca lesão externa: **bebê sacudido**. {q-scmsp2023-046,q-famema2023-085}
- Lesões típicas: **hemorragias retinianas**, **subdural** e subaracnoide. {q-iamspe2022-033,q-tp20202-060}
- Hemorragia retiniana + calo ósseo em costelas: **abuso físico**. {q-simepm89-092}
- Investigar: **tomografia de crânio, fundo de olho e inquérito esquelético**; internar e notificar. {q-adap21-045,q-unifesp2023-066}
- Lesão craniana grave com história de queda da cama: **internar** e acionar o Conselho Tutelar. {q-uspsp5-118}` },
      ],
    },
    {
      id: "sexual", titulo: "Violência sexual na criança e no adolescente",
      introducao: `[[A violência sexual na criança raramente deixa lesão; ela aparece como mudança de comportamento (isolamento, medo de uma pessoa, regressão, pesadelos) ou como queixas genitais e urinárias que não melhoram com o tratamento.|q-uspsp3-014,q-uspsp1-102,q-usprp2021-045]] O agressor costuma ser alguém próximo, e o abuso costuma ser repetido.

[[As profilaxias dependem do tempo: a do HIV só funciona se começar em até 72 horas da última exposição, e a contracepção de emergência pode ser dada até 5 dias. No abuso crônico, com última exposição antiga, não há profilaxia a oferecer, mas há investigação e proteção.|q-adap23-066,q-unicamp2022-040]]`,
      fragmentos: [
        { id: "sex-reconhecer", titulo: "Reconhecer e conduzir", conferir: true, diretrizes: ["ms-violencia-sexual","eca"],
          questoes: ["q-uspsp3-014","q-uspsp1-102","q-usprp2021-045","q-adap25-097","q-adap23-066","q-unicamp2022-040","q-uspsp3-030"],
          prosa: `A criança abusada raramente conta: o que aparece é mudança de comportamento, sintomas genitais ou urinários sem causa, ou uma IST. As profilaxias têm prazo (HIV em até 72 horas, contracepção em até 5 dias), e a notificação não depende de confirmação.`,
          texto: `- Criança retraída, que evita atividades ou uma pessoa: avaliar **violência sexual**. {q-uspsp3-014}
- **Disúria e dor ao evacuar** sem infecção, que não melhoram: investigar **violência sexual**. {q-uspsp1-102}
- Úlcera genital e mudança de comportamento: **atendimento multidisciplinar** com profilaxia ou tratamento de IST. {q-usprp2021-045}
- Suspeita: **notificar Conselho Tutelar e SINAN** sem esperar confirmação nem autorização. {q-adap25-097}
- **PEP do HIV em até 72 h** (melhor nas primeiras 2 h); **contracepção de emergência em até 5 dias**. {q-adap23-066}
- Abuso crônico com última exposição há mais de 72 h: **sem PEP**. {q-unicamp2022-040}
- Profilaxia das IST bacterianas: **ceftriaxona** (gonococo) e **azitromicina** (clamídia). {q-uspsp3-030}` },
      ],
    },
    {
      id: "outras", titulo: "Negligência, Munchausen, intoxicação e notificação",
      introducao: `[[Negligência é deixar de prover o que a criança precisa — cuidado de saúde, alimentação, supervisão — e muitas vezes vem de uma família adoecida (depressão, álcool), que precisa da rede tanto quanto a criança.|q-didepm-039]] [[Na síndrome de Munchausen por procuração, o cuidador inventa ou provoca sintomas na criança para obter atenção médica: os sintomas só aparecem na presença dele e somem quando a criança fica longe.|q-sirio2027-059]]

[[A notificação de suspeita de maus-tratos é obrigatória: o ECA obriga o profissional de saúde a comunicar ao Conselho Tutelar, e a ficha de violência do SINAN é compulsória; a lei proíbe também o castigo físico.|q-iamspe2022-047,q-famema2025-037,q-einstein2022-065,q-einstein2025-034]]`,
      fragmentos: [
        { id: "out-negligencia", titulo: "Negligência, Munchausen e intoxicação", conferir: true, diretrizes: ["sbp-maus-tratos"],
          questoes: ["q-didepm-039","q-sirio2027-059","q-scmsp2023-059","q-unifesp2025-097"],
          prosa: `A negligência é a forma mais comum de maus-tratos e se mostra pela falta: consultas perdidas, vacinas atrasadas, desnutrição, higiene. No Munchausen por procuração, o cuidador produz ou inventa os sintomas, que somem quando a criança fica sem ele.`,
          texto: `- Faltas a consultas, mãe deprimida e usuária de álcool, sem lesões: **negligência**; notificar e articular a rede (visita domiciliar). {q-didepm-039}
- Sintomas que só aparecem com o cuidador presente: **Munchausen por procuração**; comunicar ao Conselho Tutelar e proteger. {q-sirio2027-059}
- Sonolência súbita após descongestionante nasal: **intoxicação por nafazolina**, tratamento de suporte. {q-scmsp2023-059}
- Criança exposta à violência em casa: reunir informações, avaliar a família, acompanhamento social e psicológico e **comunicar ao Conselho Tutelar**. {q-unifesp2025-097}` },
        { id: "out-notificar", titulo: "Notificação", conferir: true, diretrizes: ["eca"],
          questoes: ["q-iamspe2022-047","q-famema2025-037","q-einstein2022-065","q-einstein2025-034","q-adap25-097"],
          prosa: `A notificação ao Conselho Tutelar é obrigação legal do profissional diante da **suspeita**, não da certeza; ela aciona a rede de proteção, e não é uma denúncia policial.`,
          texto: `- Notificação de violência doméstica: **obrigatória e compulsória**. {q-iamspe2022-047}
- Castigo físico ("tapas e chacoalhões"): comunicar ao **Conselho Tutelar** e à Secretaria de Saúde (Lei Menino Bernardo). {q-famema2025-037}
- Suspeita de violência doméstica: **notificar às autoridades competentes**, sem precisar de confirmação. {q-einstein2022-065,q-einstein2025-034,q-adap25-097}` },
      ],
    },
    {
      id: "idoso", titulo: "Violência contra a pessoa idosa",
      introducao: `[[A violência contra o idoso costuma vir de **dentro de casa**, de quem cuida: o **cuidador esgotado** (idoso com demência, agitação, dependência) é o principal fator de risco. As formas: física, **psicológica** (humilhação, ameaça: o idoso calado, de olhar baixo, inseguro na frente do familiar), financeira, sexual, **negligência** e abandono.|q-unifesp2024-021,q-tp20252-027]]`,
      fragmentos: [
        { id: "idoso-conduta", titulo: "Reconhecer e notificar", conferir: true,
          questoes: ["q-unifesp2024-021","q-tp20252-027","q-adap24-066","q-famerp2024-004"],
          prosa: `[[Como na criança, a **suspeita basta**: notificação compulsória no **Sinan** (Estatuto da Pessoa Idosa) e comunicação aos órgãos de proteção (Conselho do Idoso, Ministério Público, delegacia), **sem exigir confirmação nem consentimento** da vítima, ao mesmo tempo em que se trata e protege. Ao cuidador sobrecarregado se oferece apoio, sem que isso substitua a notificação.|q-adap24-066,q-famerp2024-004]]`,
          texto: `- Fator de risco: **estresse do cuidador**. {q-unifesp2024-021}
- Idoso calado e inseguro diante do filho: violência **psicológica**. {q-tp20252-027}
- **Suspeita → notificar** (Sinan), sem confirmação ou consentimento. {q-adap24-066,q-famerp2024-004}` },
      ],
    },
  ],
});
