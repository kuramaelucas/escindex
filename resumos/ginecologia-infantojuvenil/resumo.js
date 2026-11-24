/* resumos/ginecologia-infantojuvenil/resumo.js — resumo adaptativo de ginecologia da infância e
   adolescência (ass-ginecoinfantil): vulvovaginite inespecífica, sangramento genital na menina
   (higiene, corpo estranho), sinéquia de pequenos lábios, puberdade precoce, amenorreia primária
   (quando investigar, hiper e hipogonadotrófica, Rokitansky, hímen imperfurado, insensibilidade
   androgênica), malformações uterinas, ciclo da adolescente, sigilo e contracepção; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- ginecologia-infantojuvenil */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "ginecologia-infantojuvenil",
  titulo: "Ginecologia da infância e adolescência",
  assunto: "ass-ginecoinfantil",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "febrasgo-infanto", texto: "FEBRASGO — Manual de Ginecologia da Infância e Adolescência (2017) e protocolos de amenorreia (2021)", lidoEm: null },
    { id: "asrm-amenorreia", texto: "ASRM — Current evaluation of amenorrhea (2008/2024) e ASRM 2016 (classificação das anomalias müllerianas)", lidoEm: null },
    { id: "eca-sigilo", texto: "Estatuto da Criança e do Adolescente e Código de Ética Médica (sigilo no atendimento ao adolescente)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "prepubere", titulo: "A menina antes da puberdade",
      introducao: `[[Antes da puberdade a vulva e a vagina não têm estrogênio: a mucosa é **fina**, o pH é neutro, faltam lactobacilos e os pequenos lábios são finos. Por isso pequenas agressões (higiene inadequada, roupas sintéticas, resíduos) causam vulvovaginite e os lábios podem colar.|q-unifesp2023-042,q-famema2021-049,q-adap23-042]]

Veja também: **Crescimento e puberdade**, **Síndromes genéticas e teratógenos** (Turner, insensibilidade androgênica), **Ciclo menstrual** e **Maus-tratos**.`,
      fragmentos: [
        { id: "pre-vulvovaginite", titulo: "Vulvovaginite inespecífica", conferir: true, diretrizes: ["febrasgo-infanto"],
          questoes: ["q-unifesp2023-042","q-famema2021-049","q-usprp2025-059"],
          prosa: `[[A vulvovaginite da menina é quase sempre **inespecífica**, por higiene e irritação; trata-se com **higiene com água e sabonete neutro**, **calcinha de algodão** e evitar irritantes. Corrimento sem odor e sem lesão, sozinho, não é indício de abuso — mas hímen íntegro e exame normal **não excluem** abuso: a história e o contexto mandam.|q-unifesp2023-042,q-famema2021-049]] [[Sangramento pequeno, com irritação vulvar e sem outros achados, também começa por **orientação de higiene**.|q-usprp2025-059]]`,
          texto: `- Vulvovaginite inespecífica: **higiene e roupa de algodão**. {q-unifesp2023-042,q-famema2021-049}
- Sangramento discreto com irritação: **higiene**. {q-usprp2025-059}` },
        { id: "pre-corpo-estranho", titulo: "Sangramento e odor: corpo estranho", conferir: true,
          questoes: ["q-unesp2021-031"],
          prosa: `[[Menina pequena com **sangramento vaginal e odor fétido** persistentes: **corpo estranho** (papel higiênico é o mais comum), retirado por lavagem ou vaginoscopia. Tumor (sarcoma botrioide) é raro.|q-unesp2021-031]]`,
          texto: `- Sangramento + odor fétido: **corpo estranho**. {q-unesp2021-031}` },
        { id: "pre-sinequia", titulo: "Sinéquia de pequenos lábios", conferir: true,
          questoes: ["q-adap23-042"],
          prosa: `[[Sem estrogênio e com irritação, os pequenos lábios colam na linha média (linha fina translúcida), desviando o jato urinário. Trata-se com **creme de estrogênio** por poucas semanas e higiene; separar à força ou operar causa dor e recidiva.|q-adap23-042]]`,
          texto: `- Sinéquia: assintomática, **observar** e higiene; com sintoma (jato urinário desviado, infecção), **estrogênio tópico**; não separar à força. {q-adap23-042}` },
        { id: "pre-puberdade", titulo: "Puberdade precoce", conferir: true,
          questoes: ["q-sessp2022-061","q-sessp2026-072","q-uspsp1-081"],
          prosa: `[[Puberdade antes dos **8 anos** na menina. Quando o eixo hipotálamo-hipófise acorda cedo (**central**, quase sempre **idiopática** na menina), há telarca, pelos, aceleração do crescimento e menarca; o tratamento é o **análogo de GnRH**, que dessensibiliza a hipófise e interrompe a puberdade.|q-sessp2022-061,q-sessp2026-072]] [[Só a mama aumentada (M2), sem outros sinais e com **FSH e estradiol normais**, é **telarca precoce isolada** ou variante normal: observar.|q-uspsp1-081]]`,
          texto: `- Central na menina: quase sempre **idiopática** → **análogo de GnRH**. {q-sessp2022-061,q-sessp2026-072}
- M2 isolado com hormônios normais: **idiopático**, observar. {q-uspsp1-081}` },
      ],
    },
    {
      id: "amenorreia", titulo: "Amenorreia primária",
      introducao: `[[A menstruação exige quatro coisas: hipotálamo e hipófise que comandam, ovário que responde, útero com endométrio e um caminho aberto para fora. Pergunte primeiro **se há mamas** (sinal de que houve estrogênio, isto é, ovário funcionando) e **se há útero**: as respostas separam as causas.|q-amrigs2023-042,q-scmsp2025-069,q-scmsp2026-078]]`,
      fragmentos: [
        { id: "ame-quando", titulo: "Quando investigar", conferir: true, diretrizes: ["asrm-amenorreia"],
          figuras: [{ arquivo: "figuras/amenorreia-primaria.svg", legenda: "Esquema autoral: amenorreia primária organizada por mamas, FSH e útero." }],
          questoes: ["q-amrigs2023-042","q-unesp2025-037","q-usprp2021-071"],
          prosa: `[[Investiga-se a amenorreia primária com **13 anos sem caracteres sexuais**, **15 anos com caracteres** e sem menarca, ou **5 anos depois da telarca** sem menstruar. Menina de 13 anos sem mamas nem pelos **não espera**: investiga o eixo hipotálamo-hipófise-ovário.|q-amrigs2023-042,q-unesp2025-037]] [[Pelos sem mamas significam **andrógeno da adrenal** presente e **estrogênio** ausente: o ovário não funciona (disgenesia) ou não recebe comando (hipogonadismo hipogonadotrófico).|q-usprp2021-071]]`,
          texto: `- Investigar: **13 sem caracteres, 15 com, ou 5 anos após a telarca**. {q-amrigs2023-042,q-unesp2025-037}
- Pelos sem mamas: **disgenesia ou hipogonadotrófico**. {q-usprp2021-071}` },
        { id: "ame-hiper", titulo: "FSH alto: o ovário falhou", conferir: true, diretrizes: ["asrm-amenorreia"],
          questoes: ["q-scmsp2025-069","q-usp2025-022","q-famema2022-052","q-sessp2022-062","q-fmabc2023-079"],
          prosa: `[[Sem mamas e com **FSH alto**, a hipófise está chamando um ovário que não responde: **hipogonadismo hipergonadotrófico**, cuja causa principal é a **síndrome de Turner** (45,X), com **baixa estatura**; o exame é o **cariótipo**.|q-scmsp2025-069,q-usp2025-022]]`,
          texto: `- FSH alto + baixa estatura: **Turner (45,X)** → cariótipo. {q-scmsp2025-069,q-usp2025-022}
- Sem mamas, útero presente, **46,XX** e FSH alto: **disgenesia gonadal pura**; com baixa estatura e 45,X: **Turner**. {q-sessp2022-062,q-fmabc2023-079,q-famema2022-052}` },
        { id: "ame-hipo", titulo: "FSH baixo: falta o comando", conferir: true, diretrizes: ["asrm-amenorreia"],
          questoes: ["q-usp2026-107","q-usprp2021-071"],
          prosa: `[[**LH e FSH baixos** com estradiol indetectável: o problema é **hipotálamo ou hipófise** (atraso constitucional, desnutrição, exercício, Kallmann, tumor, **hiperprolactinemia**, que inibe o GnRH).|q-usp2026-107,q-usprp2021-071]]`,
          texto: `- LH/FSH baixos: **hipotálamo/hipófise** (prolactina, atraso, Kallmann). {q-usp2026-107,q-usprp2021-071}` },
        { id: "ame-anatomica", titulo: "Mamas presentes: útero e caminho", conferir: true, diretrizes: ["asrm-amenorreia"],
          casos: ["q-uspsp3-066"],
          questoes: ["q-adap21-071","q-einstein2026-047","q-uspsp3-066","q-usprp2024-085","q-unesp2022-029","q-unicamp2022-058","q-sirio2024-061","q-sirio2022-071","q-sessp2023-047"],
          prosa: `[[Com mamas e hormônios normais, o próximo exame é a **ultrassonografia pélvica**: procura o útero e a vagina.|q-einstein2026-047]] [[**Dor pélvica cíclica** sem menstruar, com membrana abaulada azulada no introito: **hímen imperfurado** com hematocolpo → **secção (himenotomia)**.|q-uspsp3-066]] [[Vagina curta em fundo cego, **sem útero**, com mamas e **pelos normais** e ovários funcionantes: **síndrome de Mayer-Rokitansky-Küster-Hauser** (46,XX); trata-se com dilatação vaginal, sem hormônio. Vagina curta pede **cariótipo** para separar da insensibilidade.|q-adap21-071,q-usprp2024-085]]`,
          texto: `- Mamas e hormônios normais: **ultrassom pélvico**. {q-einstein2026-047}
- Dor cíclica + membrana abaulada: **hímen imperfurado → secção**. {q-uspsp3-066}
- Sem útero, pelos normais: **Rokitansky**; vagina curta → **cariótipo**. {q-adap21-071,q-usprp2024-085}
- Mamas e pelos normais (Tanner 5), 46,XX, sem útero: **agenesia mülleriana (Rokitansky)**; o teste da progesterona não sangra porque não há endométrio. {q-unesp2022-029,q-unicamp2022-058,q-sirio2024-061}
- Rokitansky é malformação **não obstrutiva** (não há endométrio retido para doer). {q-sirio2022-071}
- Vagina curta sem útero: **cariótipo** separa Rokitansky (46,XX) de Morris (46,XY). {q-sessp2023-047}` },
        { id: "ame-insensibilidade", titulo: "Insensibilidade androgênica", conferir: true,
          questoes: ["q-scmsp2026-078","q-amrigs2022-052","q-uspsp4-036","q-famema2022-051","q-famerp2024-042"],
          prosa: `[[Cariótipo **46,XY** com testículos e receptor de andrógeno que não funciona: a testosterona vira estradiol e forma **mamas**, mas **não há pelos pubianos e axilares**. O testículo faz **hormônio antimülleriano** (células de Sertoli), então **não há útero** e a vagina é curta.|q-scmsp2026-078,q-amrigs2022-052,q-uspsp4-036]] [[Os testículos têm risco de tumor: **gonadectomia** (em geral depois da puberdade) e reposição de estrogênio.|q-uspsp4-036]]`,
          texto: `- Mamas **sem pelos**, sem útero: **insensibilidade androgênica (46,XY)**; AMH presente. {q-scmsp2026-078,q-amrigs2022-052,q-uspsp4-036}
- **Gonadectomia** pelo risco de tumor. {q-uspsp4-036}
- Alta, mamas M5, **P0**, sem útero e sem 2/3 superiores da vagina: **Morris**; XY sem receptor androgênico funcionante. {q-famerp2024-042,q-famema2022-051}` },
      ],
    },
    {
      id: "malformacoes", titulo: "Malformações uterinas",
      introducao: `[[O útero nasce da fusão dos dois ductos de Müller e da reabsorção do septo entre eles. Falha na fusão dá útero **bicorno** ou **didelfo** (dois úteros); falha na reabsorção dá útero **septado** ou **arqueado**.|q-iamspe2026-041,q-scmsp2025-079]]`,
      fragmentos: [
        { id: "mal-uterinas", titulo: "Septado, arqueado, bicorno e didelfo", conferir: true, diretrizes: ["asrm-amenorreia"],
          casos: ["q-iamspe2026-041"],
          questoes: ["q-iamspe2026-041","q-scmsp2025-079","q-famema2023-041","q-sessp2025-063","q-uspsp1-074","q-uspsp3-071","q-famema2022-053","q-sirio2021-063"],
          prosa: `[[O contorno **externo** do fundo separa as falhas: liso no **septado** e no arqueado (só o interior está dividido); com reentrância no **bicorno**; dois úteros e dois colos no **didelfo**.|q-iamspe2026-041]] [[A reentrância interna **pequena** do fundo, sem dividir a cavidade, é **útero arqueado**, variante quase sem importância; o septo profundo é **septado**, que se trata por histeroscopia.|q-scmsp2025-079]]`,
          texto: `- Fundo externo liso: **septado/arqueado**; reentrante: **bicorno**; dois colos: **didelfo**. {q-iamspe2026-041}
- Reentrância interna pequena: **arqueado**. {q-scmsp2025-079}
- Dos **ductos de Müller (paramesonéfricos)**: trompas, útero, colo e **1/3 superior da vagina**; o ovário vem da crista gonadal (os três folhetos), por isso é normal no Rokitansky. {q-famema2023-041,q-sirio2021-063}
- **Dois corpos e dois colos + septo vaginal longitudinal**: útero didelfo, defeito de **fusão** dos ductos paramesonéfricos; septo vaginal dá dispareunia; procurar **agenesia renal** do mesmo lado (rim e Müller nascem juntos). {q-sessp2025-063,q-uspsp3-071,q-uspsp1-074}
- Útero **bicorno**: resultado obstétrico próximo ao da população geral. {q-famema2022-053}` },
      ],
    },
    {
      id: "adolescente", titulo: "A adolescente na consulta",
      introducao: `[[Nos primeiros anos depois da menarca o eixo ainda amadurece: muitos ciclos são anovulatórios e irregulares. E a adolescente tem direito a **consulta sozinha e sigilo**, que se quebra diante de risco à vida dela ou de terceiros, de suspeita de violência ou abuso e de dever legal (notificação).|q-famerp2024-047,q-sirio2023-082,q-scmsp2022-094]]`,
      fragmentos: [
        { id: "ado-ciclo", titulo: "Ciclo irregular depois da menarca", conferir: true,
          questoes: ["q-famerp2024-047"],
          prosa: `[[Ciclos de **21 a 45 dias** nos primeiros anos após a menarca, com cólica leve e ultrassom normal, são **normais**: não é ovário policístico nem doença.|q-famerp2024-047]]`,
          texto: `- Ciclos de 35 dias aos 15 anos: **normal**. {q-famerp2024-047}` },
        { id: "ado-sigilo", titulo: "Sigilo e contracepção", conferir: true, diretrizes: ["eca-sigilo"],
          questoes: ["q-sirio2023-082","q-scmsp2022-094"],
          prosa: `[[A adolescente pode ser atendida **sem os pais**, com **sigilo**, e receber orientação e **prescrição de contraceptivo**, inclusive de longa ação (DIU, implante), sem presença de responsável ou parceiro.|q-sirio2023-082]] [[Suspeita de gravidez em adolescente retraída: **teste na UBS** e construir **com ela** o momento e o modo de contar aos pais.|q-scmsp2022-094]]`,
          texto: `- Contracepção à adolescente **sem os pais**, com sigilo. {q-sirio2023-082}
- Suspeita de gravidez: **teste e combinar com ela** como contar. {q-scmsp2022-094}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-scmsp2025-079","q-usp2026-107","q-scmsp2026-078","q-unifesp2023-042"],
          prosa: `[[**Septo de 12 mm**: pela ASRM de 2016 o arqueado tem reentrância menor que 1 cm e o septado, maior que 1,5 cm (valor intermediário ambíguo); a classificação ASRM de 2021 chama de septado o septo maior que 1 cm com ângulo menor que 90°, o que faria do septo de 12 mm um septado, e a scmsp2025-079 marcou **arqueado**.|q-scmsp2025-079]] [[**Hipogonadotrófico com baixa estatura**: a causa mais comum é o atraso constitucional; entre as alternativas, a usp2026-107 cobrou **hiperprolactinemia**.|q-usp2026-107]] [[**Mamas sem pelos** é a pista da insensibilidade; Rokitansky tem pelos normais.|q-scmsp2026-078]] [[**Corrimento na menina**: sem lesão nem outros sinais, não justifica acionar o conselho tutelar.|q-unifesp2023-042]]`,
          texto: `- Septo de 12 mm: a prova cobrou **arqueado**. {q-scmsp2025-079}
- Hipogonadotrófico: a prova cobrou **hiperprolactinemia**. {q-usp2026-107}
- **Sem pelos** = insensibilidade. {q-scmsp2026-078}
- Corrimento inespecífico **não é abuso**. {q-unifesp2023-042}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: amenorreia primária",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-amenorreia", titulo: "Mamas, pelos, útero e cariótipo", conferir: true,
          questoes: ["q-usp2025-022","q-adap21-071","q-scmsp2026-078","q-uspsp3-066"],
          prosa: `[[Mamas, pelos e útero apontam a causa.|q-usp2025-022,q-adap21-071,q-scmsp2026-078,q-uspsp3-066]]

| Causa | Mamas | Pelos | Útero | Cariótipo | FSH |
|---|---|---|---|---|---|
| Turner | ausentes | presentes, escassos | presente (pequeno) | 45,X | alto |
| Rokitansky | presentes | normais | ausente | 46,XX | normal |
| Insensibilidade androgênica | presentes | ausentes | ausente | 46,XY | normal |
| Hímen imperfurado | presentes | normais | presente | 46,XX | normal |`,
          texto: `- Turner: **FSH alto, 45,X**. {q-usp2025-022}
- Rokitansky: **sem útero, pelos normais**. {q-adap21-071}
- Insensibilidade: **sem pelos**. {q-scmsp2026-078}
- Hímen: **dor cíclica**. {q-uspsp3-066}` },
      ],
    },
  ],
});
