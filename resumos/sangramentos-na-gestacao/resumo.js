/* resumos/sangramentos-na-gestacao/resumo.js — resumo adaptativo de sangramentos na gestação e no parto:
   gravidez ectópica, placenta prévia, acretismo e vasa prévia, descolamento prematuro de placenta, rotura
   uterina e embolia amniótica, hemorragia pós-parto (dono do tema; o puerpério remete aqui) e tabela
   comparativa. Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- sangramentos-na-gestacao */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "sangramentos-na-gestacao",
  titulo: "Sangramentos na gestação e hemorragia pós-parto",
  assunto: "ass-sangramentos",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "oms-hpp", texto: "OMS/FIGO/ICM — Consolidated guidelines for the prevention, diagnosis and treatment of postpartum haemorrhage (2025), iris.who.int", lidoEm: "2026-11-19" },
    { id: "ms-alto-risco", texto: "Ministério da Saúde — Manual de Gestação de Alto Risco (2022)", lidoEm: null },
    { id: "rcog-placenta", texto: "RCOG — Placenta praevia and placenta accreta: diagnosis and management, Green-top Guideline nº 27a (2018)", lidoEm: null },
    { id: "acog-ectopica", texto: "ACOG — Practice Bulletin nº 193: Tubal ectopic pregnancy (2018)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "ectopica", titulo: "Gravidez ectópica",
      introducao: `[[A gravidez ectópica implanta fora da cavidade, quase sempre na tuba lesada por infecção, cirurgia ou ectópica prévia; a tuba não distende e rompe, sangrando para o peritônio.|q-sessp2022-025,q-einstein2023-049,q-scmsp2022-052]] [[Atraso, dor e sangramento com beta-hCG positivo e útero vazio é ectópica até prova em contrário: acima da zona discriminatória (cerca de 1.500 a 3.500 mUI/mL), o saco intrauterino já deveria aparecer no transvaginal; abaixo, repete-se o hCG em 48 horas.|q-021,q-unesp2024-022,q-famerp2024-033,q-unicampdis2023-048,q-scmsp2026-030]]

[[Com instabilidade ou hemoperitônio, cirurgia imediata (laparotomia na paciente chocada); estável, laparoscopia com salpingectomia; e a ectópica pequena, íntegra, sem batimento e com hCG baixo e caindo pode receber metotrexato, que mata o trofoblasto em divisão.|q-usp2025-010,q-famema2022-048,q-scmsp2025-061,q-fmabc2021-055,q-tp20212-085,q-einstein2026-054]]

Veja também: **Pré-natal**, **Trabalho de parto e parto** (manejo ativo do terceiro período), **Puerpério** (o resto do pós-parto), **Hipertensão na gestação** (dono da pré-eclâmpsia, causa de descolamento).`,
      fragmentos: [
        { id: "ect-conduta", titulo: "Diagnóstico e tratamento", conferir: true, diretrizes: ["acog-ectopica"],
          questoes: ["q-021","q-scmsp2022-052","q-scmsp2025-061","q-scmsp2026-030","q-usp2022-095","q-usp2025-010","q-usprp2023-036","q-famema2022-048","q-sessp2022-025","q-tp20212-085","q-unesp2024-022","q-famerp2024-033","q-unicampdis2023-048","q-fmabc2021-055","q-einstein2023-049","q-einstein2026-054"],
          casos: ["q-usp2022-095","q-usp2025-010"],
          prosa: `[[O metotrexato se acompanha pelo hCG do dia 4 ao dia 7: queda menor que 15% pede nova dose.|q-einstein2026-054]] [[Dor pélvica com pouco líquido livre e hCG negativo (cisto roto) se observa.|q-usprp2023-036]]`,
          texto: `- Mulher com dor e anemia: **beta-hCG** antes da tomografia. {q-scmsp2026-030}
- hCG positivo, útero vazio, sem massa: **localização indeterminada**, hCG em 48 h. {q-021}
- Sem saco tópico nem ectópico: **dosar hCG quantitativo**. {q-famerp2024-033}
- hCG 1.086 com imagem anexial pequena: **ectópica íntegra**, repetir em 48 h. {q-unesp2024-022}
- Endométrio vazio com dor: **ectópica**. {q-unicampdis2023-048,q-usp2022-095}
- Dor, choque e hCG positivo: **ectópica rota**. {q-sessp2022-025,q-einstein2023-049}
- Muito líquido livre e instável: **laparotomia**. {q-scmsp2022-052,q-usp2025-010}
- Massa vascularizada com DIU: **laparoscopia com salpingectomia**. {q-scmsp2025-061}
- Ectópica prévia com metotrexato, massa nova: **videolaparoscopia**. {q-fmabc2021-055}
- Banca: **laparotomia e salpingectomia** com embrião vivo. {q-famema2022-048}
- hCG 1.360 estável: **metotrexato 50 mg/m²**. {q-tp20212-085}
- Queda < 15% do 4º ao 7º dia: **nova dose**. {q-einstein2026-054}
- Dor e pouco líquido, sem gravidez: **observação**. {q-usprp2023-036}` },
      ],
    },
    {
      id: "placenta", titulo: "Placenta prévia, acretismo e vasa prévia",
      introducao: `[[A placenta prévia implanta no segmento inferior: quando o colo apaga e dilata, o segmento se estira e a placenta descola — sangramento vermelho vivo, indolor, de repetição, com útero relaxado e feto bem.|q-scmsp2023-074,q-sessp2026-071,q-sirio2027-064,q-fmabc2026-067,q-unesp2022-024,q-famerp2024-037]] [[Cicatriz uterina (cesárea, miomectomia, curetagem), multiparidade, idade e tabagismo são os fatores de risco.|q-sirio2023-072,q-einstein2021-032]] [[Pela nomenclatura atual, placenta que cobre o orifício interno é prévia; a que fica a menos de 2 cm dele, baixa.|q-sirio2026-073,q-unicampdis2023-037]]

[[O toque vaginal pode arrancar a placenta: o diagnóstico é pelo ultrassom transvaginal, seguro.|q-udisc20262-088,q-uspsp3-050]] [[Sobre cicatriz de cesárea, a placenta prévia pode invadir o miométrio (acretismo; percreta quando chega à bexiga): a conduta é cesárea programada e histerectomia com a placenta no lugar, sem tentar descolá-la.|q-scmsp2021-076,q-amrigs2023-058,q-famerp2026-026,q-einstein2024-054]]`,
      fragmentos: [
        { id: "pla-conduta", titulo: "Diagnóstico e conduta", conferir: true, diretrizes: ["rcog-placenta","ms-alto-risco"],
          questoes: ["q-scmsp2021-076","q-scmsp2022-054","q-scmsp2023-074","q-unifesp2023-049","q-amrigs2023-058","q-famema2023-058","q-sessp2026-071","q-tp20202-098","q-unesp2022-024","q-famerp2024-037","q-unicampdis2023-037","q-udisc20262-088","q-uspsp3-050","q-sirio2023-072","q-sirio2026-073","q-sirio2027-064","q-fmabc2026-067","q-einstein2021-032","q-einstein2024-054","q-famerp2026-026"],
          casos: ["q-scmsp2022-054","q-unicampdis2023-037"],
          prosa: `[[Pré-termo e sangramento parado: internar, corticoide e cesárea programada perto de 36–37 semanas; sangramento grave: cesárea em qualquer idade.|q-unifesp2023-049,q-tp20202-098]] [[Na marginal ou lateral, com o trabalho de parto adiantado, romper a bolsa deixa a cabeça comprimir a placenta e pode permitir o parto vaginal.|q-famema2023-058]] [[Vasa prévia é vaso fetal na membrana sobre o colo: rompe com a bolsa, e quem sangra é o feto.|q-scmsp2022-054]]`,
          texto: `- Sangramento indolor, útero normal: **placenta prévia**. {q-sessp2026-071,q-sirio2027-064,q-unesp2022-024}
- Definição: placenta no **segmento inferior** após 28 semanas. {q-scmsp2023-074}
- Bordo a 1 cm do orifício: **placenta baixa**. {q-sirio2026-073}
- Imagem cobrindo o orifício: **prévia centro-total**. {q-unicampdis2023-037}
- Fatores: **cesárea prévia, miomectomia, tabagismo, curetagem**. {q-sirio2023-072,q-einstein2021-032}
- Suspeita: **não tocar**, ultrassom transvaginal. {q-udisc20262-088,q-uspsp3-050,q-fmabc2026-067,q-famerp2024-037}
- 3 cesáreas, sangramento parado com 33 sem: **corticoide e cesárea após 36**. {q-unifesp2023-049}
- Sangramento intenso com 35 sem: **reposição e cesárea**. {q-tp20202-098}
- Marginal com dilatação: **romper a bolsa**. {q-famema2023-058}
- Invasão vesical: **centro-total com percretismo**. {q-scmsp2021-076}
- Acretismo na cesárea: incisão fora da placenta, **histerectomia com placenta in situ**. {q-amrigs2023-058,q-famerp2026-026}
- 38 semanas com suspeita de acretismo: **cesárea programada**. {q-einstein2024-054}
- Sangramento na amniotomia com vaso na membrana: **vasa prévia**. {q-scmsp2022-054}` },
      ],
    },
    {
      id: "descolamento", titulo: "Descolamento prematuro de placenta, rotura uterina e embolia",
      introducao: `[[No descolamento, um vaso da decídua sangra entre placenta e útero; o hematoma descola mais placenta, irrita o miométrio (hipertonia, dor) e corta a oxigenação fetal. O sangue é escuro e pode ficar retido, por isso o choque pode ser maior que o sangramento visível.|q-unesp2023-026,q-tp20232-089,q-tp20261-092,q-sirio2024-069,q-sirio2022-080,q-sirio2026-076]] [[A hipertensão (pré-eclâmpsia, crônica) é o principal fator de risco; também tabagismo, cocaína, trauma, descolamento prévio e idade.|q-amrigs2020-044,q-sessp2024-076,q-sirio2021-071,q-sessp2022-075]] [[O diagnóstico é clínico; não se espera ultrassom.|q-fmabc2025-078]]

[[Feto vivo: amniotomia (reduz a pressão e a passagem de tromboplastina) e cesárea, salvo parto iminente; feto morto com mãe estável: parto vaginal, porque a coagulopatia piora com a cirurgia.|q-tp20231-089,q-unesp2021-025,q-unesp2024-026,q-famema2023-059,q-unicampdis2024-105,q-uspsp1-090]] [[A coagulopatia de consumo (fibrinogênio baixo) se corrige com hemoderivados enquanto se resolve o parto.|q-adap23-049]]`,
      fragmentos: [
        { id: "des-dpp", titulo: "Descolamento prematuro de placenta", conferir: true, diretrizes: ["ms-alto-risco"],
          questoes: ["q-adap23-049","q-scmsp2026-062","q-usp2022-093","q-amrigs2020-044","q-unesp2023-026","q-famema2023-059","q-sessp2022-075","q-sessp2024-076","q-tp20212-088","q-tp20222-088","q-tp20231-089","q-tp20232-089","q-tp20241-087","q-tp20261-092","q-unesp2021-025","q-unesp2024-026","q-unicamp2022-051","q-unicampdis2024-105","q-uspsp1-090","q-uspsp5-042","q-sirio2024-069","q-sirio2026-076","q-sirio2021-071","q-sirio2022-080","q-fmabc2025-078","q-scmsp2025-029"],
          prosa: `[[Depois de trauma, mesmo sem achado no ultrassom, a gestante fica em observação com monitorização, porque o descolamento pode aparecer horas depois.|q-scmsp2025-029]]`,
          texto: `- Dor, hipertonia, sangue escuro e BCF alterado: **DPP**. {q-tp20232-089,q-tp20261-092,q-scmsp2026-062,q-sirio2022-080,q-sirio2026-076,q-tp20241-087}
- Sem BCF com hipertonia: **DPP**. {q-sirio2024-069}
- Fator mais ligado: **hipertensão**. {q-amrigs2020-044,q-sirio2021-071}
- Causas: **idade, hipertensão e cocaína**. {q-sessp2024-076}
- Tabagismo: risco **2,5×**. {q-sessp2022-075}
- Diagnóstico **clínico**. {q-fmabc2025-078}
- Feto vivo: **amniotomia e cesárea**. {q-unesp2023-026,q-tp20222-088,q-usp2022-093,q-uspsp1-090}
- Choque e bradicardia: **cesárea imediata**. {q-tp20231-089,q-tp20212-088,q-unesp2021-025,q-unesp2024-026,q-uspsp5-042}
- Feto vivo: vaginal **só se o parto estiver iminente**. {q-famema2023-059}
- Feto morto: banca, **cesárea** com instabilidade; vaginal se estável. {q-unicamp2022-051,q-unicampdis2024-105}
- Fibrinogênio 150 e bradicardia: **cesárea com hemoderivados**. {q-adap23-049}
- Trauma sem descolamento: **observar 24 h**. {q-scmsp2025-029}` },
        { id: "des-rotura", titulo: "Rotura uterina e embolia amniótica",
          questoes: ["q-scmsp2021-072","q-iamspe2021-061","q-iamspe2022-058","q-scmsp2026-075"],
          casos: ["q-scmsp2021-072"],
          prosa: `[[A rotura uterina acontece sobre cicatriz (cesárea, miomectomia) ou útero muito estimulado: dor súbita, parada das contrações, apresentação que sobe, choque e sofrimento fetal; dor no ombro pelo sangue sob o diafragma (sinal de Laffont).|q-iamspe2021-061,q-iamspe2022-058,q-scmsp2021-072]] [[Dispneia, cianose e choque súbitos no parto ou na cesárea, seguidos de coagulopatia, são embolia amniótica.|q-scmsp2026-075]]`,
          texto: `- Miomectomia prévia, dor e choque: **rotura uterina**, cesárea. {q-iamspe2021-061}
- Choque com apresentação alta e dor no ombro: **rotura com sinal de Laffont**. {q-iamspe2022-058}
- Imagem na cesárea: **rotura uterina**. {q-scmsp2021-072}
- Dispneia, cianose e hipotensão na cesárea: **embolia amniótica**. {q-scmsp2026-075}` },
      ],
    },
    {
      id: "hpp", titulo: "Hemorragia pós-parto",
      introducao: `[[O útero para de sangrar porque o miométrio se contrai e comprime os vasos do leito placentário; por isso a atonia é a causa mais comum (tônus), seguida de laceração (trauma), restos placentários (tecido) e coagulopatia (trombina). Sobredistensão (macrossomia, gemelar, polidrâmnio), trabalho de parto longo e infecção cansam o útero.|q-unesp2023-022,q-adap22-031,q-didepm-003]]

[[A OMS de 2025 aciona o tratamento com perda medida de 300 mL ou mais junto de qualquer sinal de instabilidade (pulso acima de 100, índice de choque acima de 1, sistólica abaixo de 100) ou com 500 mL, o que vier primeiro, sobretudo nas 2 primeiras horas.|q-adap24-073,q-unifesp2024-055,q-scmsp2021-080]] [[O pacote inicial é simultâneo: massagem uterina, ocitocina venosa, ácido tranexâmico 1 g em até 3 horas, cristaloide, exame do canal de parto e pedido de ajuda; sem resposta, misoprostol 800 µg ou ergometrina, balão intrauterino e, depois, cirurgia (suturas compressivas, ligaduras, histerectomia).|q-adap22-031,q-unifesp2026-050,q-unifesp2022-031,q-usp2023-031,q-usp2022-094]]`,
      fragmentos: [
        { id: "hpp-conduta", titulo: "Reconhecer, tratar e escalar", conferir: false, diretrizes: ["oms-hpp"],
          figuras: [{ arquivo: "figuras/hpp.svg", legenda: "Esquema autoral: critério de acionamento, pacote inicial e escalonamento da hemorragia pós-parto." }],
          questoes: ["q-adap24-073","q-adap22-031","q-adap26-050","q-unifesp2022-031","q-unifesp2024-055","q-unifesp2024-056","q-unifesp2026-050","q-scmsp2021-080","q-usp2022-094","q-usp2023-031","q-usp2026-105","q-unesp2023-022","q-didepm-003"],
          casos: ["q-usp2022-094"],
          prosa: `[[Útero contraído com sangramento é laceração até prova em contrário; placenta retida com útero contraído pede extração manual sob analgesia.|q-didepm-003,q-adap26-050]] [[Hemorragia grande com choque pede protocolo de transfusão maciça.|q-usp2026-105]] [[Tontura e palidez no 2º dia sem sangramento ativo é anemia pós-parto.|q-unifesp2024-056]]`,
          texto: `- Choque com 400 mL: aciona **pelos sinais**, mesmo abaixo de 500. {q-adap24-073}
- Código acionado por **instabilidade hemodinâmica**. {q-unifesp2024-055}
- Definição antiga da FIGO: **500 vaginal / 1.000 cesárea** ou instabilidade. {q-scmsp2021-080}
- Índice de choque 1,1; risco: **sobredistensão**; **ocitocina + tranexâmico**. {q-unesp2023-022}
- Útero mole acima do umbigo: **massagem, ocitocina, tranexâmico 1 g**, cristaloide, bexiga, canal. {q-adap22-031,q-unifesp2026-050}
- Ocitocina e massagem sem resposta: **misoprostol e balão**. {q-unifesp2022-031,q-usp2023-031}
- Atonia na laparotomia: **sutura compressiva**. {q-usp2022-094}
- Choque grave: **transfusão maciça**. {q-usp2026-105}
- Placenta retida, útero contraído: **remoção manual**. {q-adap26-050}
- Útero contraído após fórceps: **laceração**, revisar e suturar. {q-didepm-003}
- Tontura no 2º dia sem sangramento: **anemia pós-parto**. {q-unifesp2024-056}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `As três causas de sangramento da segunda metade lado a lado.`,
      fragmentos: [
        { id: "cmp-segunda-metade", titulo: "Prévia × descolamento × rotura",
          questoes: ["q-sessp2026-071","q-tp20232-089","q-iamspe2022-058"],
          prosa: `| | Placenta prévia | Descolamento | Rotura uterina |
|---|---|---|---|
| Dor | ausente | **forte, súbita** | **súbita, contrações param** |
| Útero | **relaxado** | **hipertônico** | apresentação sobe |
| Sangue | **vermelho vivo**, de repetição | escuro, pode ficar retido | variável, choque |
| Feto | em geral bem | sofrimento ou óbito | sofrimento |
| Risco | cicatriz, multiparidade | **hipertensão**, cocaína, trauma | **cicatriz**, ocitocina |
| Conduta | ultrassom, sem toque; cesárea | amniotomia e parto | laparotomia |`,
          texto: `- Indolor com útero normal: **prévia**; dor e hipertonia: **descolamento**; choque com apresentação alta: **rotura**. {q-sessp2026-071,q-tp20232-089,q-iamspe2022-058}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-scmsp2021-080","q-famema2022-048","q-unicamp2022-051"],
          texto: `- A OMS de 2025 aciona com **300 mL e instabilidade** ou **500 mL**; a prova cobrou a definição antiga, **500 / 1.000 mL**. {q-scmsp2021-080}
- Ectópica estável vai à **laparoscopia**; a banca respondeu **laparotomia**. {q-famema2022-048}
- No descolamento com feto morto, prefere-se o **parto vaginal** se a mãe está estável; a banca indicou **cesárea**. {q-unicamp2022-051}` },
      ],
    },
  ],
});
