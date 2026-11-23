/* resumos/infertilidade/resumo.js — resumo adaptativo de infertilidade conjugal (ass-infertilidade):
   definição e quando investigar, investigação mínima do casal, reserva ovariana, fator ovulatório
   (SOP, indução), fator tubário e uterino, fator masculino (espermograma OMS), endometriose,
   reprodução assistida (IIU, FIV, ICSI, ovodoação) e hiperestímulo; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- infertilidade */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "infertilidade",
  titulo: "Infertilidade conjugal",
  assunto: "ass-infertilidade",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "asrm-avaliacao", texto: "ASRM Practice Committee — Fertility evaluation of infertile women (2021) e Definition of infertility (2023); NICE CG156 (Fertility problems, atualizado)", lidoEm: null },
    { id: "oms-semen", texto: "OMS — Laboratory manual for the examination and processing of human semen (6.ª ed., 2021)", lidoEm: null },
    { id: "eshre-sop", texto: "International evidence-based guideline for the assessment and management of polycystic ovary syndrome (Monash/ESHRE/ASRM, 2023)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "investigacao", titulo: "Quando e como investigar",
      introducao: `[[Infertilidade é a falta de gestação após **12 meses** de relações regulares sem proteção. A fertilidade da mulher cai com a idade porque o estoque de folículos é fixo e a qualidade dos oócitos piora: por isso, a partir dos **35 anos** investiga-se após **6 meses**, e acima dos 40 ou com causa evidente, de imediato. O casal é investigado junto, porque o fator masculino responde por cerca de metade dos casos.|q-adap25-073,q-amrigs2023-044,q-famema2025-052]]

Veja também: **Endometriose**, **Síndrome dos ovários policísticos**, **Doença inflamatória pélvica**, **Miomatose uterina** e **Amenorreia** quando houver resumo.`,
      fragmentos: [
        { id: "inv-basica", titulo: "Investigação mínima do casal", conferir: true, diretrizes: ["asrm-avaliacao"],
          figuras: [{ arquivo: "figuras/fatores-infertilidade.svg", legenda: "Esquema autoral: os quatro fatores da infertilidade e o exame que avalia cada um." }],
          questoes: ["q-adap25-073","q-amrigs2023-044","q-famema2025-052","q-tp20202-085","q-unifesp2025-073","q-unifesp2026-051","q-amrigs2021-053","q-amrigs2025-044","q-usprp2027-019"],
          prosa: `[[A investigação cobre quatro fatores: **ovulação** (história menstrual, progesterona de fase lútea, TSH, prolactina), **tubas** (histerossalpingografia), **útero** (ultrassonografia transvaginal, histeroscopia) e **sêmen** (espermograma). A investigação mínima começa por **espermograma e ultrassonografia transvaginal**, e segue com histerossalpingografia.|q-famema2025-052,q-tp20202-085,q-unifesp2025-073,q-unifesp2026-051,q-amrigs2025-044]] [[A **histerossalpingografia é o padrão para a permeabilidade tubária**; a histeroscopia é o padrão para a cavidade (avalia e trata). Espermograma normal não dispensa a avaliação clínica do homem quando há suspeita.|q-amrigs2021-053,q-amrigs2025-044]] [[Antes de tudo, hábitos: IMC próximo do normal, parar maconha e cigarro, café moderado. A janela fértil é de poucos dias: relação no dia em que o **teste urinário de LH** positiva aproveita melhor um casal que se encontra pouco.|q-amrigs2023-044,q-usprp2027-019]]`,
          texto: `- **12 meses**; **6 meses** se ≥ 35 anos. {q-adap25-073,q-amrigs2023-044}
- Mínimo: **espermograma + USG transvaginal**, depois **histerossalpingografia**. {q-famema2025-052,q-tp20202-085,q-unifesp2025-073,q-unifesp2026-051}
- HSG = tubas; histeroscopia = cavidade. {q-amrigs2021-053,q-amrigs2025-044}
- Pico de LH: relação no dia. {q-usprp2027-019}` },
        { id: "inv-reserva", titulo: "Reserva ovariana", conferir: true, diretrizes: ["asrm-avaliacao"],
          questoes: ["q-famema2023-043","q-fmabc2023-080","q-famerp2026-017","q-amrigs2022-051","q-famerp2025-031","q-usprp2027-020"],
          prosa: `[[A reserva se mede pelo **FSH e estradiol no 3.º dia** do ciclo (FSH alto = ovário respondendo mal), pelo **hormônio antimülleriano**, que pode ser dosado em qualquer dia, e pela contagem de folículos antrais na ultrassonografia. Estradiol alto no 3.º dia mascara FSH elevado.|q-famema2023-043,q-fmabc2023-080,q-famerp2026-017,q-amrigs2022-051]] [[AMH muito alto (> 5 ng/mL) prevê **hiper-resposta** à estimulação, como na SOP.|q-famerp2025-031]] [[Reserva baixa prediz **resposta** ao tratamento, não a chance de engravidar espontaneamente: a quem quer filhos e tem reserva baixa, o conselho é **tentar logo**, não congelar óvulos por rotina.|q-usprp2027-020]]`,
          texto: `- **FSH e estradiol no D3**; **AMH em qualquer dia**. {q-famema2023-043,q-fmabc2023-080,q-famerp2026-017,q-amrigs2022-051}
- AMH alto: risco de **hiper-resposta**. {q-famerp2025-031}
- Reserva baixa: **tentar já**. {q-usprp2027-020}` },
      ],
    },
    {
      id: "fatores", titulo: "Os fatores e seu tratamento",
      introducao: `[[Cada fator tem um mecanismo e um tratamento: sem ovulação não há oócito; sem tuba pérvia o óvulo não encontra o espermatozoide; cavidade deformada não implanta; sêmen pobre não fecunda.|q-einstein2022-056,q-uspsp4-028,q-famema2021-043,q-scmsp2022-049]]`,
      fragmentos: [
        { id: "fat-ovulatorio", titulo: "Fator ovulatório e SOP", conferir: true, diretrizes: ["eshre-sop"],
          questoes: ["q-uspsp2-034","q-adap26-051","q-sessp2024-062","q-einstein2022-056","q-usprp2022-057","q-usp2024-103","q-usp2023-027","q-simepm89-039","q-unesp2025-038"],
          prosa: `[[Ovulação se confirma com **progesterona na fase lútea** (> 3 ng/mL); abaixo disso, anovulação.|q-uspsp2-034,q-adap26-051]] [[Na SOP com sobrepeso, a primeira linha é **perder peso** (5–10% já restaura ovulação); para induzir, o **letrozol** é o de primeira escolha, por gerar mais nascidos vivos que o clomifeno.|q-sessp2024-062,q-einstein2022-056,q-usprp2022-057,q-adap26-051]] [[O **clomifeno** bloqueia o receptor de estrogênio no hipotálamo, que lê "falta de estrogênio" e libera FSH; dado do 3.º ao 7.º ou 5.º ao 9.º dia, produz folículo e, perto do 14.º dia, **muco abundante, transparente e elástico** (embora possa afinar o endométrio e espessar o muco em parte das mulheres).|q-usp2024-103,q-usp2023-027]] [[Sem resposta a 6 ciclos de clomifeno: **gonadotrofinas** (FSH recombinante) em dose baixa.|q-simepm89-039]] [[Antes de engravidar, suspender ACO e **espironolactona** (antiandrogênico, feminiza o feto masculino), iniciar ácido fólico e fazer TOTG.|q-unesp2025-038]]`,
          texto: `- **Progesterona de fase lútea**. {q-uspsp2-034,q-adap26-051}
- SOP: **peso**, depois **letrozol**. {q-sessp2024-062,q-einstein2022-056,q-usprp2022-057}
- Clomifeno: muco **transparente e elástico**. {q-usp2024-103,q-usp2023-027}
- Falha: **gonadotrofinas**. {q-simepm89-039}
- Suspender **espironolactona**, ácido fólico. {q-unesp2025-038}` },
        { id: "fat-tubouterino", titulo: "Fator tubário e uterino", conferir: true, diretrizes: ["asrm-avaliacao"],
          casos: ["q-unifesp2024-045","q-usp2023-106"],
          questoes: ["q-uspsp4-028","q-unifesp2024-045","q-usp2023-106","q-unicampdis2023-045","q-adap21-070","q-udisc20262-094","q-usprp2023-038","q-sessp2022-070","q-adap24-031","q-famema2021-043","q-fmabc2026-072","q-famerp2022-035"],
          prosa: `[[A **doença inflamatória pélvica** (clamídia, gonococo) cicatriza a tuba de dentro para fora: obstrução distal e **hidrossalpinge**. Um quadro de DIP antes de tentar engravidar aponta para fator tubário.|q-uspsp4-028,q-unifesp2024-045,q-usp2023-106,q-unicampdis2023-045]] [[Obstrução bilateral irreversível vai para **FIV**. A hidrossalpinge derrama líquido tóxico na cavidade e reduz a implantação pela metade: antes da FIV, **salpingectomia** (ou oclusão proximal).|q-adap21-070,q-udisc20262-094,q-usprp2023-038,q-sessp2022-070]] [[Aborto infectado ou curetagem podem deixar **sinéquias** (síndrome de Asherman): falhas de enchimento angulares na histerossalpingografia, amenorreia sem resposta ao teste de estrogênio e progesterona; a **histeroscopia** confirma e trata com lise. Pólipo ou mioma submucoso também se tiram por histeroscopia.|q-adap24-031,q-famema2021-043,q-fmabc2026-072,q-famerp2022-035]]`,
          texto: `- DIP → **hidrossalpinge**. {q-uspsp4-028,q-unifesp2024-045,q-usp2023-106,q-unicampdis2023-045}
- Tubas obstruídas: **FIV**, com **salpingectomia** antes se hidrossalpinge. {q-adap21-070,q-udisc20262-094,q-usprp2023-038,q-sessp2022-070}
- Sinéquias/pólipo: **histeroscopia**. {q-adap24-031,q-famema2021-043,q-fmabc2026-072,q-famerp2022-035}` },
        { id: "fat-masculino", titulo: "Fator masculino", conferir: true, diretrizes: ["oms-semen"],
          questoes: ["q-scmsp2022-049","q-tp20202-005","q-famerp2022-039","q-fmabc2024-066","q-didepm-043","q-famerp2023-049","q-usprp2025-058"],
          prosa: `[[Limites inferiores da OMS (6.ª edição, 2021): volume **1,4 mL**, concentração **16 milhões/mL**, motilidade progressiva **30%**, morfologia estrita de Kruger **4%** (a edição de 2010, usada em muitas provas, trazia 1,5 mL, 15 milhões e 32%). Abaixo da concentração = oligozoospermia; da motilidade = astenozoospermia; da morfologia = teratozoospermia (Kruger de 6% é normal).|q-scmsp2022-049,q-tp20202-005,q-famerp2022-039,q-fmabc2024-066]] [[Espermograma alterado se repete em 2–3 meses (o ciclo do espermatozoide dura ~74 dias), com urologista, FSH e testosterona; abaixo de 5 milhões, **cariótipo e microdeleção do Y**.|q-didepm-043]] [[Alteração grave e persistente vai para **ICSI** (injeção do espermatozoide no oócito), que contorna concentração e motilidade baixas.|q-famerp2023-049,q-usprp2025-058]]`,
          texto: `- OMS 2021: **1,4 mL; 16 mi/mL; 30% progressiva; Kruger 4%** (2010: 1,5 mL; 15 mi; 32%). {q-scmsp2022-049,q-tp20202-005,q-famerp2022-039,q-fmabc2024-066}
- Repetir em 2–3 meses; < 5 mi: genética. {q-didepm-043}
- Grave: **ICSI**. {q-famerp2023-049,q-usprp2025-058}` },
      ],
    },
    {
      id: "assistida", titulo: "Reprodução assistida",
      introducao: `[[A técnica escala conforme o obstáculo: **coito programado** quando só falta ovular; **inseminação intrauterina** quando as tubas estão boas e o sêmen é pouco alterado ou a causa é leve; **FIV** quando as tubas não servem, a endometriose é grave ou a idade aperta; **ICSI** quando o sêmen é muito ruim; **ovodoação** quando não há oócito.|q-usprp2026-063,q-famerp2024-048,q-usprp2021-070]]`,
      fragmentos: [
        { id: "ass-tecnicas", titulo: "Escolha da técnica e complicações", conferir: true, diretrizes: ["asrm-avaliacao"],
          questoes: ["q-usprp2026-063","q-famerp2024-048","q-usprp2021-070","q-usp2022-090"],
          prosa: `[[Endometriose leve com tubas pérvias e ressonância normal: **indução com gonadotrofinas e inseminação intrauterina**. Endometriose profunda com fator masculino associado: **FIV**.|q-usprp2026-063,q-famerp2024-048]] [[Insuficiência ovariana prematura (mosaico de Turner, útero pequeno, ovários atróficos): sem oócitos próprios, **FIV com oócitos doados**.|q-usprp2021-070]] [[A estimulação com muitos folículos pode causar **síndrome de hiperestímulo ovariano**: o VEGF dos ovários aumenta a permeabilidade capilar e o líquido vai para o terceiro espaço — **ascite e derrame pleural**, hemoconcentração e trombose.|q-usp2022-090]]`,
          texto: `- Endometriose leve: **IIU**; profunda + homem: **FIV**. {q-usprp2026-063,q-famerp2024-048}
- Sem oócitos: **ovodoação**. {q-usprp2021-070}
- Hiperestímulo: **ascite e derrame pleural**. {q-usp2022-090}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["oms-semen","eshre-sop"],
          questoes: ["q-tp20202-005","q-famerp2022-039","q-usp2024-103","q-famerp2026-017","q-amrigs2023-044"],
          prosa: `[[**Limites do espermograma**: pela OMS (2021) a concentração mínima é 16 milhões/mL (15 na edição de 2010) e a morfologia estrita, 4%; a tp20202-005 usou **> 40 milhões e morfologia > 70%** (critérios antigos) e chamou de oligoastenospermia. A famerp2022-039, com 1,5 mL, 14 milhões e 24% progressiva, nomeou "normospermia, normozoospermia, astenozoospermia".|q-tp20202-005,q-famerp2022-039]] [[**Indutor na anovulação**: hoje o letrozol é a primeira escolha; a usp2024-103 respondeu **clomifeno**.|q-usp2024-103]] [[**AMH no 3.º dia**: o AMH pode ser dosado em qualquer dia; a famerp2026-017 pediu FSH e **AMH no 3.º dia**.|q-famerp2026-017]] [[**Esperar um ano**: aos menos de 35 anos isso está certo, mas a amrigs2023-044 considerou a conduta **parcialmente correta** por faltar orientação de hábitos (peso, maconha, café).|q-amrigs2023-044]]`,
          texto: `- Espermograma: a prova usou **critérios antigos**. {q-tp20202-005,q-famerp2022-039}
- Indução: a prova deu **clomifeno**. {q-usp2024-103}
- AMH: a prova pediu **no D3**. {q-famerp2026-017}
- Esperar 1 ano: faltou orientar **hábitos**. {q-amrigs2023-044}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: fator, exame e tratamento",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-fatores", titulo: "Os quatro fatores", conferir: true,
          questoes: ["q-adap26-051","q-adap21-070","q-adap24-031","q-didepm-043","q-usprp2021-070"],
          prosa: `[[Cada fator tem um exame e um tratamento.|q-adap26-051,q-adap21-070,q-adap24-031,q-didepm-043,q-usprp2021-070]]

| Fator | Exame | Causa típica | Tratamento |
|---|---|---|---|
| Ovulatório | progesterona de fase lútea, TSH, prolactina | SOP | peso, letrozol, gonadotrofinas |
| Tubário | histerossalpingografia | DIP, hidrossalpinge | FIV (salpingectomia antes) |
| Uterino | USG, histeroscopia | sinéquia, pólipo, submucoso | histeroscopia |
| Masculino | espermograma (repetido) | oligo/asteno/teratozoospermia | IIU se leve; ICSI se grave |
| Reserva | FSH D3, AMH, folículos antrais | idade, insuficiência ovariana | tentar logo; ovodoação |`,
          texto: `- Anovulação: **letrozol**. {q-adap26-051}
- Tubas: **FIV**. {q-adap21-070}
- Cavidade: **histeroscopia**. {q-adap24-031}
- Sêmen: repetir; **ICSI** se grave. {q-didepm-043}
- Sem oócito: **ovodoação**. {q-usprp2021-070}` },
      ],
    },
  ],
});
