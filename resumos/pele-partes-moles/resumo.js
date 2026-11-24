/* resumos/pele-partes-moles/resumo.js — resumo adaptativo de infecções bacterianas da pele e partes moles: impetigo e ectima, erisipela e celulite,
   síndrome da pele escaldada, infecções necrosantes (fasceíte, Fournier), piomiosite, pé diabético, mordeduras e ectima gangrenoso.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- pele-partes-moles */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "pele-partes-moles",
  titulo: "Infecções de pele e partes moles",
  assunto: "ass-peleparte",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "idsa-pele", texto: "IDSA — Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections (2014)", lidoEm: null },
    { id: "sbp-dermato", texto: "Sociedade Brasileira de Pediatria e Sociedade Brasileira de Dermatologia — piodermites e síndrome da pele escaldada na infância", lidoEm: null },
    { id: "ms-raiva", texto: "Ministério da Saúde — Protocolo de profilaxia da raiva humana (mordedura por animais)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas pela banca (duas alternativas corretas ou gabarito do material de origem em desacordo com a literatura)", questoes: ["q-gdparasitoses-073","q-gdparasitoses-172","q-gdparasitoses-196","q-gdpiodermites-020","q-gdpiodermites-071","q-gdpiodermites-093"] },
    { motivo: "de outro assunto (obstetrícia: inversão uterina), classificada aqui por engano", questoes: ["q-unicampdis2025-036"] },
  ],
  doencas: [
    {
      id: "superficiais", titulo: "Piodermites superficiais: impetigo e ectima",
      introducao: `[[As **piodermites** são causadas por **estafilococo e estreptococo**: o **impetigo** é infecção **superficial** (pústula que rompe e forma **crosta cor de mel**), o **mais comum da infância**, e o **ectima** é um impetigo que **aprofunda até a derme**, formando **úlcera com bordas elevadas e crosta**, em geral por **estreptococo beta-hemolítico do grupo A**.|q-gdparasitoses-073,q-gdparasitoses-009,q-gdpiodermites-009,q-gdparasitoses-147,q-gdpiodermites-060,q-gdpiodermites-010]]

Veja também: **Infecções e infestações da pele** (escabiose, tinea), **Glomerulopatias** (pós-estreptocócica), **Sepse**, **Maus-tratos** e **Infecções relacionadas à assistência**.`,
      fragmentos: [
        { id: "impetigo-clinica", titulo: "Impetigo bolhoso e não bolhoso: quadro e agentes", conferir: true, diretrizes: ["sbp-dermato"],
          questoes: ["q-gdparasitoses-075","q-gdpiodermites-033","q-gdparasitoses-173","q-gdpiodermites-072","q-gdpiodermites-001","q-gdpiodermites-002","q-gdparasitoses-104","q-gdpiodermites-040","q-gdparasitoses-121","q-gdpiodermites-047","q-gdparasitoses-129","q-gdpiodermites-051","q-gdparasitoses-136","q-gdpiodermites-054","q-gdparasitoses-146","q-gdpiodermites-059","q-gdparasitoses-147","q-gdpiodermites-060"],
          prosa: `[[O **impetigo bolhoso** vem do ***S. aureus*** e da **toxina esfoliativa** (que ataca a **desmogleína 1**), forma **bolhas flácidas** e é **mais frequente em lactentes e neonatos**; o **não bolhoso** tem **crostas melicéricas** por estafilococo e estreptococo; nenhum dói, e o diagnóstico é **clínico**.|q-gdparasitoses-075,q-gdpiodermites-033,q-gdparasitoses-173,q-gdpiodermites-072,q-gdpiodermites-001,q-gdpiodermites-002,q-gdparasitoses-104,q-gdpiodermites-040,q-gdparasitoses-121,q-gdpiodermites-047,q-gdparasitoses-129,q-gdpiodermites-051]]`,
          texto: `- O impetigo bolhoso é causado pelo ***Staphylococcus aureus***. {q-gdparasitoses-075,q-gdpiodermites-033,q-gdparasitoses-173,q-gdpiodermites-072,q-gdpiodermites-001,q-gdpiodermites-002}
- Vesículas que viram bolhas flácidas de até 2 cm e se rompem: **impetigo bolhoso**. {q-gdparasitoses-104,q-gdpiodermites-040,q-gdpiodermites-040}
- O impetigo bolhoso é **sempre** causado por *S. aureus* produtor de toxina. {q-gdparasitoses-121,q-gdpiodermites-047}
- Estafilococos causam o bolhoso; no não bolhoso há **mistura de estafilococos e estreptococos**. {q-gdparasitoses-129,q-gdpiodermites-051}
- **"O bolhoso não costuma acometer neonatos"** é o erro: acomete sobretudo neonatos e lactentes. {q-gdparasitoses-136,q-gdpiodermites-054}
- Arranhadura, lesões pustulosas não dolorosas e crostas cor de mel ao redor da boca e do nariz: **impetigo**. {q-gdparasitoses-146,q-gdpiodermites-059}
- Ectima: **estreptococo beta-hemolítico do grupo A**; impetigo que aprofunda até a derme. {q-gdparasitoses-147,q-gdpiodermites-060}` },
        { id: "impetigo-clinica-3", titulo: "Ectima e impetigo em situações especiais", conferir: true, diretrizes: ["sbp-dermato"],
          questoes: ["q-gdparasitoses-161","q-gdpiodermites-063","q-gdparasitoses-159","q-gdpiodermites-062","q-gdparasitoses-174","q-gdpiodermites-073","q-gdparasitoses-175","q-gdpiodermites-074","q-gdparasitoses-182","q-gdpiodermites-081","q-gdparasitoses-191","q-gdpiodermites-089"],
          prosa: `[[O **ectima** é o impetigo que **aprofunda até a derme** (úlcera com crosta e margem endurecida) por **estreptococo do grupo A**; o impetigo também **complica a escabiose** e aparece no **atópico**, no **recém-nascido** e na criança que **se arranha**, sempre **sem dor nem febre**.|q-gdparasitoses-161,q-gdpiodermites-063,q-gdparasitoses-159,q-gdpiodermites-062,q-gdparasitoses-174,q-gdpiodermites-073,q-gdparasitoses-175,q-gdpiodermites-074,q-gdparasitoses-182,q-gdpiodermites-081,q-gdparasitoses-191,q-gdpiodermites-089]]`,
          texto: `- Pústulas centrofaciais com crostas amareladas, sem febre: **impetigo crostoso**, hoje com predomínio do *S. aureus*. {q-gdparasitoses-161,q-gdpiodermites-063,q-gdpiodermites-063}
- O impetigo é infecção superficial; o impetigo bolhoso é por *S. aureus*; o tratamento é com cefalexina. {q-gdparasitoses-159,q-gdpiodermites-062}
- Piodermites primárias: **S. pyogenes e S. aureus**. {q-gdparasitoses-174,q-gdpiodermites-073}
- **Prurido noturno por 30 dias** e lesões bolhosas: **escabiose com impetigo bolhoso**. {q-gdparasitoses-175,q-gdpiodermites-074}
- A toxina esfoliativa atua sobre a **desmogleína 1**. {q-gdparasitoses-182,q-gdpiodermites-081}
- A principal infecção de pele de lactentes e crianças pequenas: **impetigo** (a prova marcou o bolhoso, que predomina no lactente pequeno; no todo, o não bolhoso é mais comum). {q-gdparasitoses-191,q-gdpiodermites-089}` },
        { id: "impetigo-clinica-2", titulo: "Impetigo bolhoso e não bolhoso, ectima: quadro e agentes: parte 2", conferir: true, diretrizes: ["sbp-dermato"],
          questoes: ["q-gdparasitoses-146","q-gdpiodermites-059","q-gdparasitoses-192","q-gdpiodermites-090","q-gdparasitoses-193","q-gdpiodermites-091","q-gdparasitoses-195","q-gdpiodermites-092","q-gdparasitoses-198","q-gdpiodermites-095","q-gdparasitoses-147","q-gdpiodermites-060","q-gdparasitoses-175","q-gdpiodermites-074","q-sirio2022-060","q-gdpiodermites-004","q-gdpiodermites-005","q-gdpiodermites-006","q-gdpiodermites-009","q-gdpiodermites-010","q-gdpiodermites-011","q-gdpiodermites-021","q-gdpiodermites-023","q-gdpiodermites-098","q-gdparasitoses-189","q-gdpiodermites-087"],
          prosa: `[[O **ectima** começa como vesícula ou pústula com base eritematosa que **erode e forma úlcera rasa com crosta e margem endurecida**, causada pelo **estreptococo beta-hemolítico do grupo A**; o impetigo pode aparecer em **atópico** (*S. aureus*), em **recém-nascidos** (bolhas e colarete) e junto de **escabiose** (impetigo bolhoso secundário ao prurido); e a **criança que se arranha** após o contato com outra desenvolve lesões não dolorosas perioral e perinasais.|q-gdparasitoses-147,q-gdpiodermites-060,q-gdpiodermites-010,q-gdparasitoses-175,q-gdpiodermites-074,q-gdparasitoses-146,q-gdpiodermites-059,q-gdpiodermites-004,q-gdpiodermites-005,q-gdpiodermites-006]]`,
          texto: `- Profundidade: impetigo (crostoso ou bolhoso) é **superficial**; ectima atinge a **derme**; celulite é **profunda**. {q-gdparasitoses-192,q-gdpiodermites-090}
- Cancro duro **não é piodermite**; foliculite é quase sempre **estafilocócica**; erisipela dá **febre alta e sintomas gerais**; ectima tem **úlcera** como lesão elementar; impetigo estreptocócico pode dar **glomerulonefrite**. {q-gdparasitoses-193,q-gdpiodermites-091}
- Crostas melicéricas perioral e perianal com linfonodomegalia cervical: **impetigo**. {q-gdparasitoses-195,q-gdpiodermites-092}
- Criança de 4 anos com vesicopústulas e erosões crostosas perinasais, no mento e na fronte: **impetigo**. {q-gdpiodermites-098}
- Menino com bolhas purulentas e crostas melicéricas por toda a face: **impetigo bolhoso estafilocócico**. {q-gdparasitoses-198,q-gdpiodermites-095,q-gdpiodermites-023}
- Vesículas e bolhas de líquido amarelo, pústulas, lesão úmida e que não dói: **impetigo bolhoso**. {q-sirio2022-060}
- Úlcera rasa com crosta e margem violácea elevada: **ectima**; vesículas e pústulas que viram crosta melicérica: **impetigo**; placa endurada, brilhante, de bordas nítidas: **erisipela**. {q-gdparasitoses-189,q-gdpiodermites-087}
- Recém-nascido com lesões em nádegas de centro úmido e colarete e bolha flácida: **impetigo bolhoso**. {q-gdpiodermites-006}
- Impetigo é infecção bacteriana superficial; lesão primária é a pústula que forma crosta melicérica. {q-gdpiodermites-009}
- Úlcera com bordas elevadas e crosta que aprofundou: **ectima**. {q-gdpiodermites-010}
- Lesões papulares com crostas melicéricas em área exposta: **impetigo**, antibiótico tópico. {q-gdpiodermites-011}
- Placas com crosta melicérica circinada perinasal: **impetigo**. {q-gdpiodermites-021}
- "Caroço" no pescoço de criança (linfonodo) com crostas no couro cabeludo: o impetigo crostoso é **estreptocócico clássico** (item certo). {q-gdpiodermites-004,q-gdpiodermites-005}` },
        { id: "impetigo-tratamento", titulo: "Tratamento do impetigo e complicações", conferir: true, diretrizes: ["sbp-dermato"],
          questoes: ["q-gdparasitoses-065","q-gdpiodermites-028","q-gdparasitoses-071","q-gdpiodermites-030","q-gdparasitoses-093","q-gdpiodermites-036","q-gdparasitoses-109","q-gdpiodermites-042","q-gdparasitoses-114","q-gdpiodermites-043","q-gdparasitoses-122","q-gdpiodermites-048","q-gdparasitoses-181","q-gdpiodermites-080","q-gdpiodermites-018","q-gdpiodermites-025","q-gdparasitoses-189","q-gdpiodermites-087","q-gdparasitoses-081","q-gdpiodermites-034"],
          prosa: `[[No **impetigo localizado** a **primeira escolha é a mupirocina (ou ácido fusídico) tópica**, e o **antibiótico oral (cefalexina)** entra no **extenso, com febre, recorrente ou com muitas lesões**; a **penicilina benzatina não** é droga de escolha (não cobre o *S. aureus*); o diagnóstico e o tratamento dos casos típicos dispensam cultura; e o **antibiótico não previne a glomerulonefrite pós-estreptocócica**.|q-gdparasitoses-065,q-gdpiodermites-028,q-gdparasitoses-122,q-gdpiodermites-048,q-gdparasitoses-093,q-gdpiodermites-036,q-gdparasitoses-109,q-gdpiodermites-042,q-gdparasitoses-114,q-gdpiodermites-043,q-gdparasitoses-071,q-gdpiodermites-030,q-gdpiodermites-018]] [[O **atópico** com crostas nas fossas tem ***S. aureus***; e a **recorrência** pede **mupirocina nas lesões e nos reservatórios (narinas, axilas, virilhas, entre os dedos) mais cefalexina**.|q-gdpiodermites-025,q-gdparasitoses-109,q-gdpiodermites-042]]`,
          texto: `- Tratamento tópico: **mupirocina ou ácido fusídico** como primeira escolha. {q-gdparasitoses-065,q-gdpiodermites-028}
- Lactente de 15 meses com bolhas purulentas em períneo e nádegas e febre: **cefalexina oral 50 mg/kg/dia por 7 a 10 dias**. {q-gdparasitoses-071,q-gdpiodermites-030}
- Nos casos típicos trata-se **sem pesquisar o agente**. {q-gdparasitoses-093,q-gdpiodermites-036}
- Terceiro episódio em criança: **mupirocina em lesões, introito nasal, axilas, virilhas e dedos, mais cefalexina oral**. {q-gdparasitoses-109,q-gdpiodermites-042}
- A **penicilina benzatina** não é droga de escolha no impetigo. {q-gdparasitoses-114,q-gdpiodermites-043}
- Coriza e lesões periorais disseminadas: **mupirocina 2 vezes ao dia por 5 a 10 dias**. {q-gdparasitoses-122,q-gdpiodermites-048}
- Antibiótico não previne a **glomerulonefrite pós-estreptocócica**. {q-gdpiodermites-018}
- Atópico de 5 anos com crostas em fossas: ***S. aureus***. {q-gdpiodermites-025}
- Mácula, vesícula, pústula e crosta: impetigo por estafilococo e estreptococo, **cefalexina 30 a 50 mg/kg/dia por 5 a 7 dias**. {q-gdparasitoses-189,q-gdpiodermites-087,q-gdpiodermites-087}
- Crostas melicéricas nas mãos que viram vesículas e pústulas em criança de 16 kg: **impetigo; *S. aureus* e *S. pyogenes*; cefalexina 30 a 50 mg/kg/dia por 5 a 7 dias**. {q-gdparasitoses-081,q-gdpiodermites-034}
- Neutropênico com lesão necrótica em região pubiana: **ectima gangrenoso**. {q-gdparasitoses-181,q-gdpiodermites-080}` },
      ],
    },
    {
      id: "erisipela-celulite", titulo: "Erisipela e celulite",
      introducao: `[[A **erisipela** acomete a **derme superficial e os linfáticos**, com **placa francamente eritematosa, bordas bem delimitadas e elevadas**, dor, calor, **febre e calafrios que podem preceder a lesão**, e é causada pelo **estreptococo beta-hemolítico do grupo A**; a **celulite** é mais profunda, de **limites imprecisos**, mais por ***S. aureus***; e a **porta de entrada** (micose interdigital, ferida) deve ser tratada.|q-inf-09,q-gdparasitoses-185,q-gdpiodermites-083,q-gdpiodermites-013,q-gdpiodermites-024,q-gdparasitoses-171,q-gdpiodermites-070]]`,
      fragmentos: [
        { id: "erisipela-diagnostico", titulo: "Reconhecer erisipela e celulite: parte 1", conferir: true, diretrizes: ["idsa-pele"],
          casos: ["q-uspsp1-007","q-tp20202-026"],
          questoes: ["q-inf-09","q-uspsp1-007","q-tp20202-026","q-gdparasitoses-089","q-gdpiodermites-035","q-gdparasitoses-095","q-gdpiodermites-037","q-gdparasitoses-127","q-gdpiodermites-050","q-gdparasitoses-141","q-gdpiodermites-056","q-gdparasitoses-171","q-gdpiodermites-070","q-gdparasitoses-185","q-gdpiodermites-083","q-gdparasitoses-190","q-gdpiodermites-088","q-gdparasitoses-197","q-gdpiodermites-094","q-gdparasitoses-166","q-gdpiodermites-066","q-gdpiodermites-013","q-gdpiodermites-024","q-gdpiodermites-026","q-gdpiodermites-055","q-gdpiodermites-056","q-gdpiodermites-083","q-gdpiodermites-088","q-gdpiodermites-094","q-gdsepse-085"],
          prosa: `[[A erisipela tem **lesão elevada, brilhante, vermelho-viva e de limite nítido com a pele sã**, febre alta que às vezes **precede** o eritema, **adenite satélite** e **linfangite**; o **fator de entrada** pode ser **tinea pedis**, ferida perfurante ou queimadura; o diagnóstico é **eminentemente clínico**; a celulite **não tem borda delimitada** e é mais profunda; e a **celulite extensa com FC alta, febre e FR alterada** (diabética, 20 cm de coxa) pede **lactato** e avaliação de gravidade.|q-gdparasitoses-171,q-gdpiodermites-070,q-gdparasitoses-089,q-gdpiodermites-035,q-gdparasitoses-095,q-gdpiodermites-037,q-gdparasitoses-127,q-gdpiodermites-050,q-gdparasitoses-141,q-gdpiodermites-056,q-gdparasitoses-185,q-gdpiodermites-083,q-gdparasitoses-190,q-gdpiodermites-088,q-gdparasitoses-197,q-gdpiodermites-094,q-gdparasitoses-166,q-gdpiodermites-066,q-inf-09,q-gdpiodermites-024,q-gdpiodermites-026,q-gdpiodermites-055,q-gdpiodermites-056,q-gdsepse-085]]`,
          texto: `- A erisipela atinge derme superficial e linfáticos, com bordas delimitadas e elevadas; a celulite é mais profunda e imprecisa. {q-inf-09}
- Escolar com lesão corto-contusa há 3 dias, febre e placa vermelho-viva de limite nítido: **erisipela; *S. pyogenes***. {q-uspsp1-007}
- Diabético com febre, dor, edema e vermelhidão no membro: **erisipela; antibiótico venoso**. {q-tp20202-026}
- "Forma de celulite superficial": na erisipela a **borda é bem delimitada**. {q-gdparasitoses-089,q-gdpiodermites-035,q-gdpiodermites-035}
- Febre, anorexia, calafrios, leucocitose e placa dolorosa na derme: **erisipela**. {q-gdparasitoses-095,q-gdpiodermites-037}
- Tinea pedis, febre e lesão no dorso do pé de limite nítido: **erisipela; estreptococos beta-hemolíticos**. {q-gdparasitoses-127,q-gdpiodermites-050,q-gdpiodermites-050}
- Febre alta seguida de eritema em perna, calor e linfadenomegalia: **erisipela**. {q-gdparasitoses-141,q-gdpiodermites-056}
- Achados característicos: **eritema franco, bordos delimitados e elevados**. {q-gdparasitoses-171,q-gdpiodermites-070}
- A erisipela é muito comum e causada pelo **estreptococo beta-hemolítico do grupo A**. {q-gdparasitoses-185,q-gdpiodermites-083,q-gdpiodermites-013}` },
        { id: "erisipela-diagnostico-2", titulo: "Reconhecer erisipela e celulite: parte 2", conferir: true, diretrizes: ["idsa-pele"],
          questoes: ["q-uspsp1-007","q-tp20202-026","q-gdpiodermites-083","q-gdparasitoses-190","q-gdpiodermites-088","q-gdparasitoses-197","q-gdpiodermites-094","q-gdparasitoses-134","q-gdpiodermites-053","q-gdparasitoses-166","q-gdpiodermites-066","q-gdpiodermites-024","q-gdpiodermites-026","q-gdpiodermites-053","q-gdpiodermites-055","q-gdpiodermites-083","q-gdpiodermites-088","q-gdpiodermites-094","q-gdpiodermites-031","q-gdpiodermites-065","q-gdsepse-085"],
          prosa: `[[A **imagem** mostra a erisipela como placa de perna, e a celulite, a **dermatite herpética e o impetigo** têm aspectos próprios (eritema difuso, vesículas agrupadas, crostas melicéricas); o **sinal de gravidade em criança com perna edemaciada, bolhas e más condições de higiene** inclui suspeitar de **maus-tratos** e acionar o Conselho Tutelar.|q-gdparasitoses-134,q-gdpiodermites-053,q-gdpiodermites-053,q-gdparasitoses-166,q-gdpiodermites-066,q-uspsp1-007,q-tp20202-026,q-gdpiodermites-088,q-gdpiodermites-094,q-gdpiodermites-083]]`,
          texto: `- Obesa diabética com dor, calor e eritema na perna: **erisipela**. {q-gdparasitoses-190,q-gdpiodermites-088}
- Paciente com **tinea pedis** tem fator de risco para a dermatose bacteriana (afirmar que não tem é o erro). {q-gdparasitoses-197,q-gdpiodermites-094}
- Nas imagens: eritema difuso sem borda = **celulite**; vesículas agrupadas = **herpes simples**; crostas melicéricas = **impetigo**. {q-gdparasitoses-134,q-gdpiodermites-053}
- Criança com perna edemaciada, bolhas e más condições de higiene: **erisipela; suspeita de maus-tratos, internação e Conselho Tutelar**. {q-gdparasitoses-166,q-gdpiodermites-066}
- Área eritematosa, edemaciada, rugosa, quente, dolorosa e delimitada: **erisipela**. {q-gdpiodermites-024}
- O diagnóstico da celulite é **eminentemente clínico**. {q-gdpiodermites-026}
- Celulite em diabética de 20 cm de coxa, FC de 110 e 38,9 °C: **dosar lactato**. {q-gdsepse-085}
- Homem de 35 anos, ferida perfurante da coxa, febre e eritema de limite nítido: **erisipela** por estreptococo do grupo A. {q-gdpiodermites-055}
- Diabético tipo 1 com lesão brilhante de bordas elevadas e febre: a doença **pode levar a linfangite**. {q-gdpiodermites-031}
- Mulher de 62 anos diabética, eritema delimitado, febre: **erisipela; betalactâmico**. {q-gdpiodermites-065}` },
        { id: "erisipela-tratamento", titulo: "Tratamento da erisipela e da celulite: parte 1", conferir: true, diretrizes: ["idsa-pele"],
          questoes: ["q-adap21-020","q-sessp2022-018","q-gdantibioticos-058","q-gdparasitoses-060","q-gdpiodermites-027","q-gdparasitoses-067","q-gdpiodermites-029","q-gdparasitoses-074","q-gdpiodermites-032","q-gdparasitoses-101","q-gdpiodermites-039","q-gdparasitoses-116","q-gdpiodermites-044","q-gdparasitoses-132","q-gdpiodermites-052","q-gdparasitoses-139","q-gdpiodermites-055","q-gdparasitoses-142","q-gdpiodermites-057","q-gdparasitoses-143","q-gdpiodermites-058","q-gdparasitoses-163","q-gdpiodermites-065","q-gdpiodermites-003","q-gdpiodermites-015","q-gdpiodermites-016","q-gdpiodermites-057"],
          prosa: `[[A **erisipela** se trata com **penicilina** (cristalina venosa na internação; procaína por 10 dias; ou **cefalexina**, cefalosporina de 1ª geração em monoterapia), com **elevação do membro e tratamento da porta de entrada** (micose); em **alérgico à penicilina**, **clindamicina ou macrolídeo**; e a **criança** com febre súbita, placa de bordas nítidas e linfonodomegalia recebe **penicilina cristalina**.|q-gdparasitoses-060,q-gdpiodermites-027,q-gdparasitoses-101,q-gdpiodermites-039,q-gdparasitoses-116,q-gdpiodermites-044,q-gdparasitoses-132,q-gdpiodermites-052,q-gdparasitoses-139,q-gdpiodermites-055,q-gdparasitoses-142,q-gdpiodermites-057,q-gdparasitoses-163,q-gdpiodermites-065,q-gdparasitoses-074,q-gdpiodermites-032,q-adap21-020,q-gdpiodermites-003,q-gdpiodermites-015,q-gdpiodermites-016,q-gdpiodermites-057]]`,
          texto: `- Diabética com eritema delimitado e febre: **internação, penicilina cristalina ou cefazolina, elevação do membro e tratar a micose interdigital**. {q-adap21-020}
- Celulite sem melhora ambulatorial, 39,5 °C: **internação com ceftriaxona**. {q-sessp2022-018}
- Dor e hiperemia no dorso da mão após picada: **S. pyogenes e S. aureus; cefalexina**. {q-gdantibioticos-058}
- **Cefalosporina de 1ª geração** em monoterapia é opção na erisipela. {q-gdparasitoses-060,q-gdpiodermites-027}
- Celulite por MSSA em internação: **oxacilina**. {q-gdparasitoses-067,q-gdpiodermites-029}
- Placa com edema, febre e adenite satélite: **penicilina procaína 400.000 UI de 12/12 horas por 10 dias**. {q-gdparasitoses-074,q-gdpiodermites-032}
- Tratamento de eleição da erisipela: **penicilina** (ou eritromicina). {q-gdparasitoses-101,q-gdpiodermites-039}
- Pré-escolar com febre súbita, placa de bordas nítidas e linfonodomegalia: **penicilina cristalina**. {q-gdparasitoses-116,q-gdpiodermites-044}
- Febre, calafrios, flictena e tinea pedis: **repouso, elevação, penicilina G venosa e miconazol**. {q-gdparasitoses-132,q-gdpiodermites-052}
- Perfurante da coxa que recusou penicilina: **erisipela, estreptococo do grupo A, cefalosporina**. {q-gdparasitoses-139,q-gdpiodermites-055}
- Placa de bordas definidas sem comorbidade: **penicilina**. {q-gdparasitoses-142,q-gdpiodermites-057}
- Atleta com celulite que piorou sob cefalexina: **sulfametoxazol-trimetoprim** (MRSA). {q-gdparasitoses-143,q-gdpiodermites-058}` },
        { id: "erisipela-tratamento-2", titulo: "Tratamento da erisipela e da celulite: parte 2", conferir: true, diretrizes: ["idsa-pele"],
          questoes: ["q-sessp2022-018","q-gdantibioticos-058","q-gdparasitoses-067","q-gdpiodermites-029","q-gdpiodermites-057","q-gdparasitoses-143","q-gdpiodermites-058","q-gdparasitoses-163","q-gdpiodermites-065","q-gdparasitoses-177","q-gdpiodermites-076","q-gdparasitoses-178","q-gdpiodermites-077","q-gdparasitoses-184","q-gdpiodermites-082","q-gdpiodermites-003","q-gdpiodermites-007","q-gdpiodermites-008","q-gdpiodermites-015","q-gdpiodermites-016","q-gdpiodermites-057","q-gdpiodermites-076","q-gdpiodermites-077","q-gdpiodermites-082"],
          prosa: `[[Na **celulite** o agente é o ***S. aureus***: a extensa por **MSSA** da comunidade se trata com **oxacilina**, a de **mão após picada** cobre ***S. pyogenes* e *S. aureus*** com **cefalexina**, e a **celulite que piora sob cefalexina** em atleta de contato é **MRSA da comunidade** e se trata com **sulfametoxazol-trimetoprim** (nas leves e moderadas em imunocompetente); as **fluoroquinolonas não** servem contra MRSA; a **celulite que falha ao tratamento ambulatorial** (febre de 39,5 °C) vai a **internação com ceftriaxona**; e o **empiema** na celulite com bacteremia **não** sugere etiologia estreptocócica.|q-gdparasitoses-067,q-gdpiodermites-029,q-gdparasitoses-178,q-gdpiodermites-077,q-gdantibioticos-058,q-gdparasitoses-143,q-gdpiodermites-058,q-gdparasitoses-184,q-gdpiodermites-082,q-gdpiodermites-008,q-gdpiodermites-007,q-gdpiodermites-076,q-gdpiodermites-082,q-sessp2022-018,q-gdpiodermites-077]]`,
          texto: `- Erisipela: **antibiótico betalactâmico**. {q-gdparasitoses-163,q-gdpiodermites-065}
- Celulite com derrame pleural: o **empiema não sugere estreptococo** (afirmativa incorreta). {q-gdparasitoses-177,q-gdpiodermites-076}
- Eritema em casca de laranja, febre alta, dor: **oxacilina**. {q-gdparasitoses-178,q-gdpiodermites-077}
- Celulite leve ou moderada por **CA-MRSA** em imunocompetente: **sulfametoxazol-trimetoprim**. {q-gdparasitoses-184,q-gdpiodermites-082}
- Homem de 65 anos com eritema delimitado e linfadenopatia: **erisipela; cefalexina e acompanhamento**. {q-gdpiodermites-003}
- Erisipela: o edema pode **piorar nas primeiras 24–48 h** de tratamento sem ser falha, e a pele **descama em 5 a 10 dias**. {q-gdpiodermites-007}
- Trauma contuso com eritema extenso sem delimitação: **celulite; *S. aureus***. {q-gdpiodermites-008}
- Mulher de 57 anos obesa com placa bem delimitada: **estreptococo; tratamento ambulatorial com cefalosporina de 1ª geração ou penicilina**. {q-gdpiodermites-015}
- Jovem sem comorbidade: **clindamicina ou macrolídeo em alérgico à penicilina**. {q-gdpiodermites-016}
- Mulher de 45 anos com lesão de bordas definidas sem fator de risco: **penicilina**. {q-gdpiodermites-057}
- Celulite extensa: item incorreto sobre o empiema estreptocócico. {q-gdpiodermites-076}
- Homem de 45 anos com eritema que sobe a perna, febre alta: **oxacilina**. {q-gdpiodermites-077}
- Celulite leve em imunocompetente por CA-MRSA: **SMX-TMP**. {q-gdpiodermites-082}` },
      ],
    },
    {
      id: "graves", titulo: "Infecções graves: necrosantes, escaldada e outras",
      introducao: `[[A **fasceíte necrosante** é infecção **destrutiva e rapidamente progressiva** do subcutâneo e da fáscia, e o sinal de alarme é a **dor desproporcional ao exame cutâneo**, com toxemia, **bolhas hemorrágicas, crepitação** e evolução em horas, sobretudo em **diabéticos e imunossuprimidos**; o tratamento é **desbridamento cirúrgico de urgência com antibiótico de amplo espectro**.|q-inf-10,q-gdparasitoses-169,q-gdpiodermites-068,q-gdparasitoses-179,q-gdpiodermites-078,q-scmsp2025-027]]`,
      fragmentos: [
        { id: "necrosantes", titulo: "Fasceíte, gangrena de Fournier e piomiosite: parte 1", conferir: true, diretrizes: ["idsa-pele"],
          casos: ["q-scmsp2026-036","q-usp2024-029","q-usprp2026-018","q-famerp2025-069"],
          questoes: ["q-inf-10","q-scmsp2025-027","q-scmsp2026-036","q-usp2024-029","q-usprp2026-018","q-famerp2025-069","q-sirio2023-036","q-gdparasitoses-048","q-gdparasitoses-118","q-gdpiodermites-045","q-gdparasitoses-169","q-gdpiodermites-068","q-gdparasitoses-176","q-gdpiodermites-075","q-gdparasitoses-179","q-gdpiodermites-078","q-gdpiodermites-045","q-gdpiodermites-068","q-gdpiodermites-075","q-gdpiodermites-078"],
          prosa: `[[A fasceíte necrosante **tipo I** é de **flora mista** (anaeróbios e enterobactérias, como a **gangrena de Fournier** perineal do diabético e obeso, que é polimicrobiana por *Bacteroides*, *Clostridium* e enterobactérias) e a **tipo II** é **estreptocócica**; ela é a infecção **profunda** da classificação; o tratamento é **desbridamento extenso e amplo, antibiótico de amplo espectro e novo desbridamento com cultura** se piora no 3º dia, **sem amputação** como abordagem de escolha (que cabe à gangrena gasosa), e a **oxigenoterapia hiperbárica não** é primeira linha; e a **clindamicina** associada à penicilina é superior por **inibir a produção de toxina** do estreptococo.|q-inf-10,q-scmsp2025-027,q-scmsp2026-036,q-usp2024-029,q-usprp2026-018,q-famerp2025-069,q-gdparasitoses-169,q-gdpiodermites-068,q-gdparasitoses-176,q-gdpiodermites-075,q-gdparasitoses-048,q-gdparasitoses-118,q-gdpiodermites-045,q-gdparasitoses-179,q-gdpiodermites-078,q-sirio2023-036]]`,
          texto: `- Diabético com dor desproporcional, toxemia, bolhas hemorrágicas e crepitação: **desbridamento de urgência, amplo espectro e suporte**. {q-inf-10}
- Infecção extensa da coxa com toxemia após lesão pequena: **fasceíte necrosante**. {q-scmsp2025-027}
- Obeso grau III, dor anal, lesões ulceradas: **desbridamento extenso** (Fournier). {q-scmsp2026-036}
- Ferida perineal desbridada com evolução: **colostomia em alça**. {q-usp2024-029}
- Fournier no 3º dia com piora: **novo desbridamento e cultura**. {q-usprp2026-018}
- Vulva dolorosa em obesa diabética: infecção **polimicrobiana por anaeróbios e enterobactérias**. {q-famerp2025-069}
- Diabético obeso, necrose e crepitação após inguinotomia: **desbridamento amplo de toda a área**. {q-sirio2023-036}
- A **amputação não** é a abordagem de escolha na fasceíte (item incorreto). {q-gdparasitoses-048}` },
        { id: "necrosantes-2", titulo: "Fasceíte, gangrena de Fournier e piomiosite: parte 2", conferir: true, diretrizes: ["idsa-pele"],
          questoes: ["q-gdparasitoses-118","q-gdpiodermites-045","q-gdparasitoses-169","q-gdpiodermites-068","q-gdparasitoses-176","q-gdpiodermites-075","q-gdparasitoses-179","q-gdpiodermites-078","q-gdparasitoses-123","q-gdpiodermites-049","q-gdparasitoses-006","q-gdparasitoses-099","q-gdpiodermites-038","q-gdparasitoses-187","q-gdpiodermites-085","q-gdparasitoses-188","q-gdpiodermites-086","q-gdpiodermites-019","q-gdpiodermites-045","q-gdpiodermites-049","q-gdpiodermites-068","q-gdpiodermites-075","q-gdpiodermites-078","q-gdpiodermites-014","q-gdpiodermites-038","q-gdpiodermites-085","q-gdpiodermites-086","q-gdpiodermites-022"],
          prosa: `[[A **dor desproporcional em coxa de paciente em choque tratada como celulite** muda para **piperacilina-tazobactam e vancomicina**; o **abscesso com várias drenagens de secreção cremosa** (furúnculo/antraz) pede **excisão**, e o **abscesso de coxa com vários pontos de drenagem** recebe **drenagem cirúrgica e oxacilina**; e a **piomiosite tropical** é **abscesso muscular primário por *S. aureus***, em jovem de zona rural com febre, dor na coxa, **posição antálgica** e massa endurecida, tratada com **drenagem ampla**.|q-gdparasitoses-123,q-gdpiodermites-049,q-gdpiodermites-019,q-gdpiodermites-049,q-gdparasitoses-006,q-gdparasitoses-099,q-gdpiodermites-038,q-gdparasitoses-187,q-gdpiodermites-085,q-gdparasitoses-188,q-gdpiodermites-086]]`,
          texto: `- Fasceíte tipo I: flora mista; tipo II: estreptococo; **clindamicina inibe a toxina**. {q-gdparasitoses-118,q-gdpiodermites-045,q-gdpiodermites-045}
- A infecção **profunda** da classificação: **fasceíte necrotizante**. {q-gdparasitoses-169,q-gdpiodermites-068,q-gdpiodermites-068}
- **Hiperbárica não** é primeira linha na gangrena de Fournier. {q-gdparasitoses-176,q-gdpiodermites-075,q-gdpiodermites-075}
- Diabético após vasectomia com febre e crepitação: **fasceíte; desbridamento e amplo espectro**. {q-gdparasitoses-179,q-gdpiodermites-078,q-gdpiodermites-078}
- Lesão de 8 cm com enduração e três pontos de drenagem cremosa: **excisão da área infectada**. {q-gdparasitoses-123,q-gdpiodermites-049,q-gdpiodermites-049}
- Lesão de coxa com vários pontos de drenagem purulenta após pápula: **drenagem cirúrgica e oxacilina por 7 dias**. {q-gdpiodermites-022}
- Dor desproporcional, choque e CIVD sob oxacilina: **trocar por piperacilina-tazobactam e vancomicina**. {q-gdpiodermites-019}
- Principal agente da **piomiosite**: ***Staphylococcus aureus***. {q-gdparasitoses-006,q-gdparasitoses-099,q-gdpiodermites-038,q-gdpiodermites-014,q-gdpiodermites-038}
- Jovem rural com febre, dor na coxa e posição antálgica: **piomiosite tropical; drenagem ampla**. {q-gdparasitoses-187,q-gdpiodermites-085,q-gdparasitoses-188,q-gdpiodermites-086,q-gdpiodermites-085,q-gdpiodermites-086}` },
        { id: "escaldada", titulo: "Síndrome da pele escaldada estafilocócica", conferir: true, diretrizes: ["sbp-dermato"],
          questoes: ["q-gdparasitoses-119","q-gdpiodermites-046","q-gdparasitoses-162","q-gdpiodermites-064","q-gdparasitoses-167","q-gdpiodermites-067","q-gdparasitoses-170","q-gdpiodermites-069","q-gdparasitoses-180","q-gdpiodermites-079","q-gdpiodermites-012","q-gdpiodermites-017","q-gdpiodermites-046","q-gdpiodermites-064","q-gdpiodermites-067","q-gdpiodermites-069","q-gdpiodermites-079","q-gdpiodermites-097"],
          prosa: `[[Na **síndrome da pele escaldada** (doença de Ritter) a **toxina esfoliativa do *S. aureus*** age **a distância, a partir de um foco** (às vezes só a conjuntiva ou o umbigo): **febre, irritabilidade, eritema escarlatiniforme doloroso começando ao redor da boca, do nariz e nas dobras, fissuras periorais, bolhas flácidas estéreis, descolamento ao toque (sinal de Nikolsky) e superfície úmida e vermelha**; é de **lactentes e neonatos**, tem **hemoculturas e lesões estéreis**, e se trata com **antibiótico antiestafilocócico venoso**.|q-gdparasitoses-119,q-gdpiodermites-046,q-gdparasitoses-162,q-gdpiodermites-064,q-gdparasitoses-167,q-gdpiodermites-067,q-gdparasitoses-170,q-gdpiodermites-069,q-gdparasitoses-180,q-gdpiodermites-079,q-gdpiodermites-017,q-gdpiodermites-046,q-gdpiodermites-064,q-gdpiodermites-067,q-gdpiodermites-069,q-gdpiodermites-079,q-gdpiodermites-097,q-gdpiodermites-012]]`,
          texto: `- Lactente de 10 meses com fissuras periorais, eritema escarlatiniforme e bolhas estéreis: **doença de Ritter**. {q-gdparasitoses-119,q-gdpiodermites-046,q-gdpiodermites-046}
- Criança que, após infecção de vias aéreas, tem eritema perioral e em dobras com descolamento: **síndrome da pele escaldada**. {q-gdparasitoses-162,q-gdpiodermites-064,q-gdpiodermites-064}
- Recém-nascido de 2 semanas com eritema generalizado e depois bolhas e perda cutânea: **pele escaldada**. {q-gdparasitoses-167,q-gdpiodermites-067,q-gdpiodermites-012,q-gdpiodermites-067}
- Recém-nascido com pele eritematosa e dolorosa e **sinal de Nikolsky positivo**: **pele escaldada**. {q-gdparasitoses-170,q-gdpiodermites-069,q-gdpiodermites-069}
- Lactente com eritrodermia, bolhas flácidas e superfície úmida: **pele escaldada**. {q-gdparasitoses-180,q-gdpiodermites-079,q-gdpiodermites-079}
- Criança de 4 anos, febril, com máculas vermelho-vivas e descamação: **pele escaldada; antibiótico venoso**. {q-gdpiodermites-017}
- Neonato de 28 dias com eritema que começa ao redor dos lábios e narinas: **síndrome da pele escaldada**. {q-gdpiodermites-097}` },
        { id: "outras-pele", titulo: "Pé diabético, mordeduras, ectima gangrenoso e outras lesões", conferir: true, diretrizes: ["idsa-pele","ms-raiva"],
          casos: ["q-usp2023-017","q-usprp2022-030"],
          questoes: ["q-scmsp2025-026","q-usp2023-017","q-fmabc2021-018","q-usprp2025-091","q-usprp2021-020","q-usprp2022-030","q-amrigs2023-026","q-unicampdis2024-003","q-unicampdis2024-004","q-sirio2025-038","q-gdparasitoses-153","q-gdpiodermites-061","q-gdparasitoses-186","q-gdpiodermites-084","q-gdparasitoses-181","q-gdpiodermites-080","q-gdpiodermites-061","q-gdpiodermites-084","q-gdpiodermites-080","q-gdpiodermites-096","q-gdpiodermites-041","q-gdparasitoses-108","q-gdpiodermites-041","q-gdpiodermites-052"],
          prosa: `[[O **pé diabético infectado** com **necrose, secreção purulenta e eritema até a panturrilha** pede **desbridamento cirúrgico e antibiótico venoso**; a **úlcera extensa fétida** recebe antibiótico venoso e depois desbridamento; o **abscesso pré-auricular em diabética descompensada** (glicemia 450) pede **drenagem, antibiótico e controle glicêmico**; as infecções complicadas em comorbidades **não** se tratam com fluoroquinolona contra MRSA; e a **ferida de esternotomia** infectada tem o ***S. aureus***.|q-scmsp2025-026,q-usp2023-017,q-fmabc2021-018,q-usprp2025-091,q-gdparasitoses-108,q-gdpiodermites-041,q-gdpiodermites-041,q-sirio2025-038]] [[A **unha encravada com supuração** recebe **antissepsia, sulfametoxazol-trimetoprim por 7 dias e reforço da dT**; a **mordedura de cão** infectada na orelha pede **desbridamento, sutura e antibiótico** e a recente, em ferimento puntiforme, **amoxicilina-clavulanato**, e se o **cão desaparece** em 7 dias, faz-se **soro e vacina antirrábica**; entre os **fatores de risco de infecção por mordedura** não estão idade menor que 14 anos, hiperesplenismo e hipocolesterolemia; o **neutropênico** com lesão necrótica de halo eritematoso tem **ectima gangrenoso** (por *Pseudomonas*), tratado com **aminoglicosídeo** associado; e a **tinea corporis** (lesão anular com borda elevada e clareamento central) se trata com **miconazol ou ciclopirox**.|q-usprp2021-020,q-usprp2022-030,q-unicampdis2024-003,q-unicampdis2024-004,q-amrigs2023-026,q-gdparasitoses-181,q-gdpiodermites-080,q-gdpiodermites-080,q-gdpiodermites-096,q-gdparasitoses-153,q-gdpiodermites-061,q-gdparasitoses-186,q-gdpiodermites-084,q-gdpiodermites-061,q-gdpiodermites-084]]`,
          texto: `- Diabético com úlcera, necrose, secreção purulenta e eritema até a panturrilha: **desbridamento cirúrgico e antibiótico venoso**. {q-scmsp2025-026}
- Diabético com lesão no pé após sapato novo e pulsos presentes: **desbridamento e antibioticoterapia**. {q-usp2023-017}
- Úlcera extensa fétida em diabética: **antibiótico venoso, depois desbridamento**. {q-fmabc2021-018}
- Abscesso pré-auricular em diabética com glicemia de 450: **drenar, antibiótico e controle glicêmico**. {q-usprp2025-091}
- Unha encravada com flogose até o metatarso: **clorexidina, SMX-TMP por 7 dias e dT**. {q-usprp2021-020}
- Mordedura de cão na orelha há 48 horas: **desbridamento, sutura e antibiótico**. {q-usprp2022-030}
- **Não** são fatores de risco de infecção por mordedura: idade < 14 anos, hiperesplenismo e hipocolesterolemia. {q-amrigs2023-026}
- Mordedura de cão há 30 minutos: **amoxicilina-clavulanato**. {q-unicampdis2024-003}
- Cão desaparecido 7 dias depois: **soro e vacina antirrábica**. {q-unicampdis2024-004}
- Esternotomia infectada em diabético: ***S. aureus***. {q-sirio2025-038}
- Eritematodescamativa de borda elevada e clareamento central: **tinea corporis; miconazol ou ciclopirox**. {q-gdparasitoses-153,q-gdpiodermites-061,q-gdparasitoses-186,q-gdpiodermites-084,q-gdpiodermites-061,q-gdpiodermites-084}
- Neutropenia febril com lesão necrótica de escara central: **ectima gangrenoso**. {q-gdparasitoses-181,q-gdpiodermites-080,q-gdpiodermites-080}
- Lactente de 5 meses sob amoxicilina com lesões úlcero-necróticas: **ectima gangrenoso; aminoglicosídeos**. {q-gdpiodermites-096}
- Infecções complicadas em comorbidades: fluoroquinolonas **não** são opção para MRSA. {q-gdparasitoses-108,q-gdpiodermites-041,q-gdpiodermites-041}
- Febre, calafrios e erisipela com tinea pedis: miconazol para a micose. {q-gdpiodermites-052}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-gdparasitoses-146","q-gdpiodermites-059","q-gdparasitoses-101","q-gdpiodermites-039","q-gdparasitoses-074","q-gdpiodermites-032","q-gdparasitoses-132","q-gdpiodermites-052","q-gdparasitoses-147","q-gdpiodermites-060","q-gdparasitoses-136","q-gdpiodermites-054","q-gdparasitoses-121","q-gdpiodermites-047","q-gdparasitoses-129","q-gdpiodermites-051","q-gdpiodermites-018"],
          prosa: `[[**Impetigo bolhoso**: a regra é a toxina esfoliativa do *S. aureus*; a prova (gdparasitoses-146) chamou de "**impetigo bolhoso**" o quadro de **crostas melicéricas** periorais por arranhadura (que é o não bolhoso), e disse que o bolhoso "é **sempre**" estafilocócico (gdparasitoses-121) e que "**acomete neonatos**" (gdparasitoses-136, o item incorreto diz que não).|q-gdparasitoses-146,q-gdpiodermites-059,q-gdparasitoses-121,q-gdpiodermites-047,q-gdparasitoses-136,q-gdpiodermites-054,q-gdparasitoses-129,q-gdpiodermites-051]] [[**Erisipela**: a regra atual é a **penicilina** ou cefalexina por via oral nos casos não complicados; a prova deu **penicilina procaína por 10 dias** (gdparasitoses-074), **penicilina G venosa 1 a 2 milhões a cada 4 horas** (gdparasitoses-132) e **eritromicina** (gdparasitoses-101); o **ectima** é estreptocócico (gdparasitoses-147); e o antibiótico **não previne a glomerulonefrite** (gdpiodermites-018).|q-gdparasitoses-074,q-gdpiodermites-032,q-gdparasitoses-132,q-gdpiodermites-052,q-gdparasitoses-101,q-gdpiodermites-039,q-gdparasitoses-147,q-gdpiodermites-060,q-gdpiodermites-018]]`,
          texto: `- Regra: crostas melicéricas são o impetigo não bolhoso; a prova usou "impetigo bolhoso" para esse quadro. {q-gdparasitoses-146,q-gdpiodermites-059}
- Regra: penicilina ou cefalexina na erisipela; as provas deram procaína 10 dias, G venosa 4/4 h e eritromicina. {q-gdparasitoses-074,q-gdpiodermites-032,q-gdparasitoses-132,q-gdpiodermites-052,q-gdparasitoses-101,q-gdpiodermites-039}
- O ectima é estreptocócico. {q-gdparasitoses-147,q-gdpiodermites-060}
- O antibiótico não previne a glomerulonefrite. {q-gdpiodermites-018}
- Bolhoso: sempre *S. aureus* e acomete neonatos. {q-gdparasitoses-121,q-gdpiodermites-047,q-gdparasitoses-136,q-gdpiodermites-054,q-gdparasitoses-129,q-gdpiodermites-051}` },
      ],
    },
  ],
});
