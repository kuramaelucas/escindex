/* resumos/puerperio/resumo.js — resumo adaptativo de puerpério: involução e lóquios, lactação, infecção
   puerperal (endometrite), mama (fissura, ingurgitamento, mastite, abscesso), transtornos psiquiátricos do
   pós-parto, hemorragia pós-parto (resumo; dono: sangramentos-na-gestacao), trombose e lacerações.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- puerperio */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "puerperio",
  titulo: "Puerpério",
  assunto: "ass-puerperio",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "oms-hpp", texto: "OMS/FIGO/ICM — Consolidated guidelines for the prevention, diagnosis and treatment of postpartum haemorrhage (2025), iris.who.int", lidoEm: "2026-11-19" },
    { id: "ms-aleitamento", texto: "Ministério da Saúde — Saúde da criança: aleitamento materno e alimentação complementar (Cadernos de Atenção Básica nº 23, 2015)", lidoEm: null },
    { id: "ms-alto-risco", texto: "Ministério da Saúde — Manual de Gestação de Alto Risco (2022): infecção puerperal", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "fisiologia", titulo: "Involução e lactação",
      introducao: `[[Depois do parto o útero involui: está na altura do umbigo logo após e deixa de ser palpável no abdome por volta de 10 a 14 dias. Os lóquios mudam com a cicatrização do leito placentário: rubros (sangue) nos primeiros dias, serosos depois e brancos (alba, com leucócitos) a partir do 10º dia.|q-sessp2023-060,q-amrigs2025-052]]

[[Na gestação, a progesterona e o lactogênio placentário bloqueiam o efeito da prolactina nos alvéolos; quando a placenta sai, a progesterona despenca e o leite desce. A sucção libera prolactina (produção) e ocitocina (ejeção).|q-sirio2022-069,q-famema2021-041]]

Veja também: **Sangramentos na gestação** (dono da hemorragia pós-parto), **Contracepção** (métodos no pós-parto), **Diabetes na gestação** (reclassificação), **Puericultura** (pediatria: aleitamento do lado do bebê).`,
      fragmentos: [
        { id: "fis-involucao", titulo: "Lóquios, útero e mama",
          questoes: ["q-sessp2023-060","q-amrigs2025-052","q-sirio2022-069","q-famema2021-041"],
          texto: `- Lóquio **alba** por volta do 10º dia, com leucócitos. {q-sessp2023-060}
- 10º dia com útero não palpável e lóquios normais: **tranquilizar**. {q-amrigs2025-052}
- Leite inibido na gestação: **progesterona e lactogênio** bloqueiam a prolactina. {q-sirio2022-069}
- Rede de Haller: **vascularização venosa** da mama na gestação. {q-famema2021-041}` },
      ],
    },
    {
      id: "infeccao", titulo: "Infecção puerperal",
      introducao: `[[A endometrite é a infecção do leito placentário por bactérias da vagina e do intestino (aeróbias e anaeróbias, polimicrobiana); a cesárea, sobretudo após trabalho de parto longo e bolsa rota, é o maior fator de risco.|q-unesp2026-028,q-amrigs2024-052,q-tp20251-084]] [[O quadro é febre a partir do 2º–3º dia, lóquios fétidos e o útero da **tríade de Bumm**: amolecido, doloroso e acima do esperado (subinvoluído), porque o miométrio inflamado não contrai.|q-iamspe2023-062,q-amrigs2021-045,q-unicampdis2023-039,q-tp20202-096]] [[O tratamento é venoso e cobre anaeróbios: clindamicina com gentamicina, compatível com a amamentação; sem melhora em 48–72 horas, pensar em abscesso, tromboflebite pélvica séptica ou restos.|q-sessp2024-074,q-unesp2022-021,q-usprp2025-043,q-scmsp2025-073,q-amrigs2025-053]]`,
      fragmentos: [
        { id: "inf-endometrite", titulo: "Endometrite: quadro e tratamento", conferir: true, diretrizes: ["ms-alto-risco"],
          figuras: [{ arquivo: "figuras/febre.svg", legenda: "Esquema autoral: as três fontes de febre e dor no puerpério e a conduta de cada uma." }],
          questoes: ["q-usp2025-021","q-usprp2025-043","q-amrigs2024-052","q-amrigs2025-053","q-amrigs2021-045","q-iamspe2023-062","q-sessp2024-074","q-tp20202-096","q-tp20251-084","q-tp20252-099","q-unesp2022-021","q-unesp2025-026","q-unesp2026-028","q-unicampdis2023-039","q-scmsp2025-073"],
          casos: ["q-usp2025-021"],
          prosa: `[[Febrícula isolada, com útero involuindo e exames normais, só pede observar a curva térmica.|q-unesp2025-026]] [[Endometrite com hipotensão é sepse: volume e antibiótico de amplo espectro.|q-tp20252-099]]`,
          texto: `- Útero doloroso, amolecido, lóquios fétidos: **endometrite**. {q-tp20251-084,q-unicampdis2023-039,q-amrigs2024-052}
- Tríade de **Bumm**: útero doloroso, amolecido, hipoinvoluído. {q-iamspe2023-062}
- Pode ter **dor, útero abaixo do umbigo e lóquios fétidos**. {q-amrigs2021-045}
- Etiologia **polimicrobiana**: **clindamicina e gentamicina**. {q-unesp2026-028,q-sessp2024-074,q-tp20202-096,q-unesp2022-021,q-usprp2025-043}
- Amamentando: **clindamicina e gentamicina** EV. {q-scmsp2025-073}
- Cobertura de **aeróbios e anaeróbios** EV. {q-amrigs2025-053}
- 8º dia de cesárea com o exame da imagem: **antibiótico EV**. {q-usp2025-021}
- Endometrite com sepse: **volume e amplo espectro**. {q-tp20252-099}
- 37,9 °C com útero normal: **curva térmica**. {q-unesp2025-026}` },
      ],
    },
    {
      id: "mama", titulo: "Amamentação e mama puerperal",
      introducao: `[[Quase toda dor e fissura no mamilo vem de pega errada: o bebê abocanha só o mamilo, que é esmagado contra o palato. Corrigir a pega e a posição resolve e previne ingurgitamento e mastite.|q-amrigs2025-054,q-unesp2026-030,q-usprp2021-059,q-sirio2027-052]] [[Leite parado vira mastite: mama vermelha, dolorosa, febre; o agente é o *Staphylococcus aureus* que entra pela fissura. O tratamento é esvaziar a mama (sem parar de amamentar), analgésico e, se não melhorar em 24 horas ou houver febre, antibiótico; abscesso se drena.|q-sessp2024-075,q-unicamp2022-055,q-udisc20262-097,q-scmsp2022-056]]`,
      fragmentos: [
        { id: "mam-problemas", titulo: "Pega, fissura, mastite e abscesso", conferir: true, diretrizes: ["ms-aleitamento"],
          questoes: ["q-usprp2021-059","q-amrigs2025-054","q-sessp2023-059","q-sessp2024-075","q-unesp2026-030","q-unicamp2022-055","q-udisc20262-097","q-sirio2025-080","q-sirio2027-052","q-sirio2022-055","q-scmsp2022-056"],
          casos: ["q-usprp2021-059","q-scmsp2022-056"],
          prosa: `[[Mamilo brilhante, dolorido, com o bebê com placas na boca é candidíase: nistatina para os dois.|q-sirio2022-055]] [[A translactação leva leite por sonda junto ao mamilo enquanto o prematuro suga, e mantém a produção.|q-sirio2025-080]] [[Na mãe com HIV, a lactação se inibe com cabergolina; enfaixar não basta.|q-sessp2023-059]]`,
          texto: `- Dor e fissura: corrigir **pega e posição**. {q-amrigs2025-054,q-unesp2026-030}
- Hiperemia e lesões no mamilo: **analgésico e ordenha**. {q-usprp2021-059}
- Começar pela **mama não afetada** e corrigir a pega. {q-sirio2027-052}
- Mastite: **esvaziar a mama, hidratar**, posicionar, analgésico. {q-sessp2024-075}
- Mastite sem abscesso: **antibiótico oral** e manter a amamentação. {q-unicamp2022-055}
- Agente: ***Staphylococcus aureus***. {q-udisc20262-097}
- Febre com coleção na mama: **abscesso**, drenagem. {q-scmsp2022-056}
- Mamilo brilhante e friável: **nistatina** mãe e bebê. {q-sirio2022-055}
- Prematuro com sucção fraca: **translactação**. {q-sirio2025-080}
- HIV: **inibir a lactação** com fármaco. {q-sessp2023-059}` },
      ],
    },
    {
      id: "psiquiatria", titulo: "Transtornos mentais do pós-parto",
      introducao: `[[A queda brusca de estrogênio e progesterona, o sono cortado e a nova responsabilidade explicam o baby blues: choro e labilidade nos primeiros dias, que somem até 2 semanas sem tratamento.|q-adap21-059,q-famema2025-087,q-amrigs2020-050]] [[Se dura mais de 2 semanas, com perda de prazer, culpa, dificuldade com o bebê ou ideias de morte, é depressão pós-parto: rede de apoio, psicoterapia e sertralina, compatível com a amamentação.|q-usp2026-096,q-uspsp5-048,q-tp20202-041]] Confusão, delírio e alucinação são psicose puerperal, emergência psiquiátrica.`,
      fragmentos: [
        { id: "psi-depressao", titulo: "Baby blues, depressão e psicose",
          questoes: ["q-adap21-059","q-usp2025-015","q-usp2026-096","q-amrigs2020-050","q-famema2025-087","q-tp20202-041","q-uspsp5-048"],
          texto: `- 10º dia, Edimburgo 8, sem ideia de morte: **baby blues**, acolher. {q-adap21-059}
- Disforia: **transitória**, primeiras semanas. {q-famema2025-087}
- Tristeza pós-parto **não leva** necessariamente à depressão. {q-amrigs2020-050}
- 4 semanas com distanciamento do bebê: **sertralina**. {q-usp2026-096}
- 7 semanas com ideação passiva, amamentando: **sertralina**. {q-uspsp5-048}
- Mãe abatida na consulta do RN: **acionar rede de apoio**. {q-tp20202-041}
- Isolamento desde a gestação com sintomas graves: **depressão psicótica**. {q-usp2025-015}` },
      ],
    },
    {
      id: "hemorragia", titulo: "Hemorragia no pós-parto imediato",
      introducao: `Este capítulo resume o que as provas de puerpério cobram; o tema completo está em **Sangramentos na gestação**. [[A causa mais comum é a atonia (útero mole, acima do umbigo); útero contraído com sangramento aponta laceração; placenta incompleta, restos; e, por último, coagulopatia.|q-sessp2026-065,q-fmabc2026-066,q-usprp2026-077,q-einstein2022-052,q-iamspe2026-054,q-fmabc2022-077]] [[O primeiro passo é medir a perda, calcular o índice de choque e pedir ajuda; o pacote inicial é massagem, ocitocina venosa, tranexâmico em até 3 horas e cristaloide.|q-einstein2025-046,q-tp20212-082,q-udisc20262-085,q-simepm89-030,q-unesp2026-026,q-uspsp1-089,q-famema2021-060]]`,
      fragmentos: [
        { id: "hem-conduta", titulo: "Causas e escalonamento", conferir: false, diretrizes: ["oms-hpp"],
          questoes: ["q-usprp2024-098","q-usprp2025-049","q-usprp2026-077","q-iamspe2025-059","q-iamspe2026-054","q-iamspe2026-059","q-famema2021-059","q-famema2021-060","q-sessp2026-065","q-tp20212-082","q-unesp2026-026","q-unicampdis2022-041","q-unicampdis2024-041","q-udisc20262-085","q-uspsp1-089","q-simepm89-030","q-fmabc2022-077","q-fmabc2026-066","q-einstein2022-052","q-einstein2023-050","q-einstein2025-046"],
          casos: ["q-iamspe2026-059"],
          prosa: `[[Sem resposta ao pacote, misoprostol e balão; depois, suturas compressivas (B-Lynch), ligadura das hipogástricas abaixo dos ramos posteriores, e histerectomia, que é a primeira escolha no acretismo.|q-usprp2024-098,q-iamspe2026-059,q-iamspe2025-059,q-unicampdis2024-041,q-einstein2023-050]] [[A ergometrina contrai o útero, mas é proibida na hipertensa.|q-usprp2025-049]]`,
          texto: `- Prevenção: **ocitocina 10 UI IM** em todo parto. {q-famema2021-059}
- Primeira conduta na atonia: **massagem uterina**. {q-sessp2026-065}
- Atonia: massagem e **ocitocina EV**. {q-tp20212-082,q-fmabc2026-066}
- Pacote: **massagem bimanual, ocitocina, tranexâmico e volume**. {q-udisc20262-085,q-unesp2026-026}
- Associar **tranexâmico 1 g EV em 10 min**. {q-simepm89-030}
- Tranexâmico **junto do primeiro uterotônico**, a qualquer momento. {q-famema2021-060,q-uspsp1-089}
- Primeiro: **estimar perda, índice de choque, pedir ajuda**. {q-einstein2025-046}
- Sem resposta: **misoprostol e balão**. {q-usprp2024-098}
- Índice de choque 1,4, útero mole: **metilergometrina e hemácias** (banca). {q-usprp2025-049}
- Útero contraído: **exame especular / revisão do canal**. {q-usprp2026-077,q-einstein2022-052}
- Útero abaixo do umbigo com sangramento: **restos, curetagem**. {q-iamspe2026-054}
- Sem resposta ao tratamento: **revisar a cavidade** antes de balão. {q-unicampdis2022-041}
- Figura: **sutura de B-Lynch**. {q-iamspe2026-059}
- Ligadura da hipogástrica preserva **glútea superior, iliolombar e sacral lateral**. {q-iamspe2025-059}
- Sem plano de clivagem: **histerectomia**. {q-unicampdis2024-041,q-einstein2023-050}
- Fatores: **macrossomia, polidrâmnio, parto taquitócico**. {q-fmabc2022-077}` },
      ],
    },
    {
      id: "outras", titulo: "Trombose e lacerações",
      introducao: `[[O puerpério é o período de maior risco de trombose: hipercoagulabilidade, estase e lesão vascular; cesárea, obesidade e idade somam risco, e panturrilha edemaciada e dolorosa com dispneia aponta trombose venosa com embolia pulmonar.|q-adap24-039]] [[As lacerações perineais se graduam pela profundidade: 3A atinge menos da metade do esfíncter externo, 3B mais da metade, 3C também o interno; 4º grau chega à mucosa retal.|q-sirio2025-070]]`,
      fragmentos: [
        { id: "out-tev", titulo: "Tromboembolismo e grau das lacerações",
          questoes: ["q-adap24-039","q-sirio2025-070"],
          texto: `- Obesa pós-cesárea com panturrilha dolorosa e dispneia: **tromboembolismo pulmonar**. {q-adap24-039}
- Laceração **3C**: esfíncter externo e interno. {q-sirio2025-070}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-usprp2025-049","q-unicamp2022-055"],
          texto: `- Atonia com choque: o pacote começa por **ocitocina, tranexâmico e massagem**; a banca pulou para **metilergometrina e hemácias**. {q-usprp2025-049}
- Mastite costuma começar por esvaziamento e analgésico, e o antibiótico entra sem melhora em 24 h; a prova já indicou **antibiótico oral**. {q-unicamp2022-055}` },
      ],
    },
  ],
});
