/* resumos/insuficiencia-cardiaca/resumo.js — resumo adaptativo de Insuficiência Cardíaca do adulto.
   Formato e condições: resumos/LEIA-ME.md. Conferência: npm run resumo -- insuficiencia-cardiaca */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "insuficiencia-cardiaca",
  titulo: "Insuficiência cardíaca do adulto",
  assunto: "ass-ic",
  criadoEm: "2026-11-18",
  fontes: [
    { texto: "Sociedade Brasileira de Cardiologia — Diretriz Brasileira de Insuficiência Cardíaca Crônica e Aguda (2018) e Atualização (2021)", lidoEm: null },
    { texto: "European Society of Cardiology — Guidelines for heart failure (2021) e Focused Update (2023)", lidoEm: null },
    { texto: "AHA/ACC/HFSA — Guideline for the Management of Heart Failure (2022)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Miocardite viral na criança: está no assunto de IC, mas o resumo é do adulto — entra num resumo de cardiologia pediátrica",
      questoes: ["q-scmsp2022-040","q-usp2025-050","q-famema2022-094","q-tp20261-052","q-einstein2023-045","q-einstein2024-041"] },
    { motivo: "Anuladas (a reposição corrigida, q-unifesp2025-025-ia, está no resumo)",
      questoes: ["q-unifesp2025-025","q-amrigs2020-004"] },
  ],
  doencas: [
    {
      id: "definicao", titulo: "Definição, classificação e causas",
      introducao: `Insuficiência cardíaca (IC) é uma **síndrome**, não uma doença: o coração não consegue bombear o sangue que os tecidos precisam, ou só consegue à custa de **pressões de enchimento elevadas**. Essa segunda parte é a mais importante para entender os sintomas. A maior parte do sofrimento do paciente (dispneia, ortopneia, edema) vem da **congestão**, isto é, do sangue represado atrás de um coração que não o recebe ou não o ejeta direito, e não da falta de débito.

A IC é o caminho final de quase todas as doenças do coração e uma das principais causas de internação de idosos. No Brasil, as causas mais comuns são a **cardiopatia isquêmica** e a **hipertensiva**, e a **doença de Chagas** tem peso próprio nas regiões onde foi endêmica. [[A cada internação, a pergunta é por que o paciente descompensou: a causa mais comum é a **má adesão** ao tratamento e à dieta (cerca de 3 em cada 10 casos), seguida de infecção, arritmia (sobretudo fibrilação atrial), isquemia e hipertensão descontrolada.|q-famema2025-014]]

[[A **fração de ejeção (FE)** do ventrículo esquerdo divide a IC em grupos que respondem de formas diferentes ao tratamento: **reduzida (≤ 40%)**, **levemente reduzida (41 a 49%)** e **preservada (≥ 50%)**.|q-card-09]] A divisão importa porque as drogas que reduzem mortalidade foram testadas, e funcionam, sobretudo na FE reduzida. Na FE preservada o problema é o enchimento: um ventrículo rígido e hipertrofiado, geralmente de idoso hipertenso, obeso e diabético.`,
      fragmentos: [
        { id: "def-fe", titulo: "Fração de ejeção, estágios e classe funcional", conferir: true,
          questoes: ["q-card-09","q-unesp2021-048","q-unesp2023-056","q-unesp2025-054","q-famema2025-014"],
          texto: `- **ICFEr ≤ 40%**; levemente reduzida **41 a 49%**; preservada **≥ 50%**; **IC com FE melhorada**: era ≤ 40% e subiu acima de 40%. {q-card-09,q-unesp2021-048}
- FE melhorada **não é cura**: **manter as medicações**, porque suspender faz a disfunção voltar. {q-unesp2023-056}
- **ICFEp**: tratar as **comorbidades** (pressão, obesidade, diabetes, FA) e a congestão. {q-unesp2025-054}
- Estágios (ACC/AHA): **A** risco, sem doença estrutural; **B** doença estrutural sem sintomas; **C** sintomas; **D** refratária.
- Classe funcional NYHA: **I** sem limitação; **II** grandes esforços; **III** pequenos esforços; **IV** em repouso.
- Descompensação: a causa mais comum é a **má adesão**. {q-famema2025-014}` },
        { id: "def-causas", titulo: "Causas que a prova cobra", conferir: true,
          prosa: `Algumas causas têm pistas específicas. [[A **cardiotoxicidade por quimioterapia** (antraciclinas, trastuzumabe) aparece semanas a meses depois do tratamento.|q-tp20212-030]] [[O **álcool** causa miocardiopatia dilatada no etilista de longa data, sem doença coronariana.|q-usp2026-004]] [[A **cardiomiopatia periparto** surge no fim da gestação ou nos meses após o parto.|q-unesp2022-042]] [[A **amiloidose** deposita proteína entre as fibras do miocárdio e o torna rígido e espesso. Pistas: **síndrome do túnel do carpo** bilateral, parede espessa com ECG de baixa voltagem e realce tardio difuso na ressonância. A forma **AL** (de cadeias leves) se investiga com **imunofixação e cadeias leves livres**; a forma por **transtirretina** é tratada com **tafamidis**, que estabiliza a proteína.|q-famerp2026-060,q-famema2021-038,q-famema2021-037,q-fmabc2024-019]]`,
          questoes: ["q-adap24-021","q-tp20212-030","q-usp2026-004","q-unesp2022-042","q-famerp2026-060","q-famema2021-037","q-famema2021-038","q-fmabc2024-019","q-tp20241-026","q-sessp2026-016","q-iamspe2022-003"],
          texto: `- **Chagas**: miocardiopatia dilatada com arritmias, bloqueios e aneurisma apical, em quem viveu em casa de pau a pique. {q-adap24-021}
- **Isquêmica**: investigar coronárias (**cineangiocoronariografia**) quando há angina ou alto risco. {q-iamspe2022-003}
- **Quimioterapia** (antraciclina, trastuzumabe), **álcool**, **periparto**. {q-tp20212-030,q-usp2026-004,q-unesp2022-042,q-tp20241-026}
- **Amiloidose**: túnel do carpo, parede espessa, realce tardio difuso. AL: **imunofixação e cadeias leves**. TTR hereditária: mutação mais comum **Val30Met**; tratamento **tafamidis**. {q-famerp2026-060,q-famema2021-037,q-famema2021-038,q-fmabc2024-019}
- **Cardiomiopatia hipertrófica obstrutiva** (sopro sistólico aórtico, gradiente na via de saída): **betabloqueador**. {q-sessp2026-016}` },
        { id: "def-alto-debito", titulo: "IC de alto débito", conferir: true,
          prosa: `Na IC de alto débito o coração é normal, mas a demanda é maior do que ele consegue manter: a resistência vascular cai e o débito sobe. [[Anemia, tireotoxicose, fístula arteriovenosa, obesidade e beribéri fazem isso.|q-sirio2021-006]] [[No **beribéri**, a falta de **tiamina** (vitamina B1), típica do etilista desnutrido, bloqueia o metabolismo aeróbio: o paciente tem congestão com **FE normal ou alta** e **acidose lática**.|q-usprp2023-076]]`,
          questoes: ["q-sirio2021-006","q-usprp2023-076"],
          texto: `- Causas: **anemia, tireotoxicose, fístula AV, obesidade, beribéri**. {q-sirio2021-006}
- Etilista com congestão, FE alta e acidose lática: **deficiência de tiamina**. {q-usprp2023-076}` },
      ],
    },
    {
      id: "fisiopatologia", titulo: "Fisiopatologia",
      introducao: `Quando o coração falha, o organismo "lê" a queda do débito como se fosse uma hemorragia e ativa os mesmos mecanismos de defesa: o **sistema nervoso simpático** (taquicardia, vasoconstrição), o **sistema renina-angiotensina-aldosterona** (retenção de sal e água, vasoconstrição) e o **hormônio antidiurético**. No curto prazo isso mantém a pressão. No longo prazo é o que destrói o coração: a angiotensina II, a aldosterona e a noradrenalina estimulam **hipertrofia, apoptose e fibrose** do miocárdio. [[Ao microscópio, o miocárdio da IC crônica mostra **aumento de colágeno entre as fibras musculares**.|q-tp20202-010]] O ventrículo muda de forma, dilata e fica mais esférico: é o **remodelamento**.

[[Por isso o tratamento que aumenta a sobrevida não é o que "fortalece" o coração, e sim o que **bloqueia essa ativação neuro-hormonal** e o remodelamento: IECA/BRA/sacubitril-valsartana, betabloqueador e antagonista mineralocorticoide.|q-iamspe2023-004]] Os inotrópicos melhoram o débito no curto prazo, mas aumentam a mortalidade no uso crônico.

**De onde vem a congestão.** O ventrículo esquerdo que não esvazia, ou que é rígido, enche sob pressão alta. [[A **pressão diastólica final do VE** sobe e se transmite para trás: átrio esquerdo, veias pulmonares e capilares. Quando a pressão capilar passa de cerca de 18 a 25 mmHg, o líquido sai para o interstício e para os alvéolos.|q-usprp2026-011]] [[Com o tempo, a pressão alta nas veias pulmonares eleva a **pressão na artéria pulmonar** e sobrecarrega o ventrículo direito, que então congestiona o fígado, as jugulares e as pernas.|q-usprp2024-055]] O coração dilatado também libera os **peptídeos natriuréticos** (BNP), em resposta ao estiramento da parede: são a tentativa do próprio coração de eliminar sal e água, e por isso servem como marcador da pressão de enchimento.`,
      fragmentos: [
        { id: "fis-neuro", titulo: "Neuro-hormônios e remodelamento", conferir: true,
          questoes: ["q-iamspe2023-004","q-tp20202-010","q-sirio2022-012"],
          texto: `- Simpático + SRAA + ADH: úteis no início, **tóxicos no longo prazo** (fibrose, hipertrofia, apoptose). {q-iamspe2023-004}
- Histologia: **colágeno entre as fibras** (fibrose intersticial). {q-tp20202-010}
- iSGLT2: natriurese e diurese osmótica, menos pré e pós-carga, melhor metabolismo energético do miocárdio. **Não** atuam aumentando o sódio e o cálcio citoplasmático. {q-sirio2022-012}` },
        { id: "fis-congestao", titulo: "Congestão: da pressão do VE ao edema", conferir: true,
          questoes: ["q-usprp2026-011","q-usprp2024-055"],
          texto: `- Congestão pulmonar = **aumento da pressão diastólica do VE**, transmitida aos capilares. {q-usprp2026-011}
- Congestão crônica eleva a **pressão na artéria pulmonar**: derrame pleural, edema, fígado congesto. {q-usprp2024-055}` },
      ],
    },
    {
      id: "diagnostico", titulo: "Diagnóstico",
      introducao: `O diagnóstico de IC é clínico e se confirma com exames que mostram a doença estrutural e a pressão de enchimento elevada. Nenhum sintoma isolado basta, porque dispneia e edema têm muitas causas. [[Os **critérios de Framingham** organizam isso: o diagnóstico exige **2 critérios maiores** ou **1 maior e 2 menores**.|q-iamspe2026-010,q-iamspe2026-017]]

Os achados mais específicos são os que medem diretamente a pressão nas veias. [[O **refluxo hepatojugular** (a jugular sobe e se mantém ao comprimir o abdome) tem sensibilidade baixa, mas **especificidade alta**: quando presente, aumenta muito a chance de IC.|q-usp2026-013,q-famerp2023-070,q-usprp2026-090]] [[A **dispneia paroxística noturna** também é muito específica: deitado, o sangue das pernas volta ao tórax e o pulmão congestiona horas depois.|q-uspsp4-021]]

[[O **BNP** e o **NT-proBNP** sobem com o estiramento do coração. A grande utilidade é **excluir**: valores baixos tornam a IC improvável como causa da dispneia.|q-card-12,q-iamspe2025-005]] [[Mas outros fatores alteram o valor: **idade, fibrilação atrial e doença renal** aumentam o BNP sem IC, e a **obesidade** o reduz.|q-uspsp2-001]] [[O **ecocardiograma** é o exame inicial para confirmar e classificar a IC: mede a FE, as câmaras, as valvas e as pressões.|q-sessp2022-020]]`,
      fragmentos: [
        { id: "dia-framingham", titulo: "Critérios de Framingham e exame físico", conferir: true,
          questoes: ["q-iamspe2026-010","q-iamspe2026-017","q-fmabc2025-002","q-sessp2022-012","q-usp2026-013","q-famerp2023-070","q-usprp2026-090","q-uspsp4-021","q-scmsp2023-002","q-sessp2023-071","q-unesp2021-048","q-tp20241-026"],
          texto: `- **Maiores**: **DPN**, **turgência jugular**, estertores, **cardiomegalia**, edema agudo de pulmão, **B3**, PVC > 16 cmH2O, **refluxo hepatojugular**, perda de mais de 4,5 kg em 5 dias com o tratamento. {q-fmabc2025-002,q-sessp2022-012,q-iamspe2026-017}
- **Menores**: edema de tornozelos, tosse noturna, dispneia aos esforços, hepatomegalia, derrame pleural, FC > 120, queda da capacidade vital. {q-iamspe2026-010}
- Diagnóstico: **2 maiores** ou **1 maior + 2 menores**. {q-iamspe2026-010,q-iamspe2026-017}
- Achado mais **específico**: **refluxo hepatojugular**; sintoma que mais ajuda: **DPN**. {q-usp2026-013,q-famerp2023-070,q-usprp2026-090,q-uspsp4-021}
- Congestão sistêmica pode imitar doença hepática ou renal (ascite, icterícia, proteinúria). {q-tp20241-026,q-unesp2021-048,q-scmsp2023-002,q-sessp2023-071}` },
        { id: "dia-bnp", titulo: "Peptídeos natriuréticos", conferir: true,
          questoes: ["q-card-12","q-iamspe2025-005","q-amrigs2020-002","q-famema2021-031","q-uspsp2-001","q-uspsp5-024"],
          texto: `- Agudo: **BNP < 100 pg/mL** (NT-proBNP < 300) praticamente **exclui** IC. Crônico: BNP < 35, NT-proBNP < 125. {q-card-12,q-iamspe2025-005}
- Ajuda no diagnóstico e mostra **gravidade e prognóstico**. {q-amrigs2020-002,q-uspsp5-024}
- IC descompensada com FE reduzida: BNP costuma ser **> 400**. {q-famema2021-031}
- **Limitações**: idade, **FA**, **doença renal** (aumentam); obesidade (reduz). {q-uspsp2-001}` },
        { id: "dia-imagem", titulo: "Ecocardiograma, imagem e exames da etiologia", conferir: true,
          prosa: `[[No ecocardiograma, a disfunção diastólica aparece como **relação E/e' elevada**, átrio esquerdo aumentado e pressão pulmonar alta: são esses achados que sustentam a IC quando a FE é normal.|q-sessp2025-013]] Na radiografia, a congestão se vê como redistribuição do fluxo para os ápices, linhas B de Kerley e derrame pleural. [[O **ultrassom pulmonar à beira do leito** mostra as mesmas linhas B e ajuda a decidir pelo diurético.|q-usp2026-001]]`,
          questoes: ["q-sessp2022-020","q-sessp2025-012","q-sessp2025-013","q-usp2026-001","q-usp2023-054","q-uspsp4-015"],
          texto: `- Primeiro exame para investigar: **ecocardiograma transtorácico**. {q-sessp2022-020}
- Rx de congestão: cardiomegalia, **cefalização**, **linhas B de Kerley**, derrame pleural. {q-sessp2025-012}
- Eco na FE preservada: **E/e' alto**, átrio esquerdo grande, hipertensão pulmonar. {q-sessp2025-013}
- US pulmonar com **linhas B**: congestão, **furosemida**. {q-usp2026-001}
- FA nova ou IC que piora: **TSH**. {q-usp2023-054}
- Ronco, cefaleia matinal e obesidade: **polissonografia** (apneia do sono). {q-uspsp4-015}` },
      ],
    },
    {
      id: "cronico", titulo: "Tratamento da IC crônica com FE reduzida",
      introducao: `O tratamento moderno se apoia em **quatro pilares**, cada um bloqueando uma parte da resposta neuro-hormonal ou atuando no metabolismo do coração e do rim. [[Os quatro reduzem mortalidade e devem ser iniciados cedo e juntos, sem esperar um chegar à dose máxima para começar o outro: **IECA, BRA ou sacubitril-valsartana**; **betabloqueador**; **antagonista mineralocorticoide**; e **inibidor de SGLT2**.|q-card-10,q-unifesp2024-030,q-adap25-025]]

O **sacubitril-valsartana** soma ao bloqueio da angiotensina a inibição da neprilisina, a enzima que degrada os peptídeos natriuréticos: o paciente passa a ter mais do próprio "diurético e vasodilatador" natural. [[Ele é superior ao IECA e o substitui no paciente que continua sintomático.|q-uspsp5-024,q-famema2021-032,q-unesp2022-042,q-usp2024-051]] [[Como a neprilisina também degrada a bradicinina, juntar o IECA com o sacubitril causaria **angioedema**: na troca, é preciso suspender o IECA e esperar **36 horas**.|q-didepm-046]]

[[Os **inibidores de SGLT2** (dapagliflozina, empagliflozina) foram criados para o diabetes, mas o benefício na IC **independe da glicemia**: reduzem morte e internação com ou sem diabetes.|q-adap26-024]] [[Já os **diuréticos de alça** aliviam a congestão e são indispensáveis para os sintomas, mas **não reduzem mortalidade**.|q-udisc20262-006]]`,
      fragmentos: [
        { id: "cro-pilares", titulo: "Os quatro pilares", conferir: true,
          questoes: ["q-card-10","q-unifesp2024-030","q-adap25-025","q-adap26-024","q-scmsp2021-001","q-tp20252-042","q-unesp2026-054","q-usp2024-051","q-uspsp3-096","q-adap24-021"],
          texto: `- **IECA/BRA/INRA + betabloqueador + espironolactona + iSGLT2**: todos reduzem mortalidade. {q-card-10,q-unifesp2024-030,q-scmsp2021-001}
- Faltando um pilar, **acrescentar**: espironolactona e/ou iSGLT2 mesmo com o paciente estável. {q-adap25-025,q-adap26-024,q-tp20252-042,q-usp2024-051,q-uspsp3-096}
- Betabloqueadores com benefício provado: **carvedilol, bisoprolol, succinato de metoprolol** (atenolol não). {q-tp20252-042,q-unifesp2024-030}
- iSGLT2 também na FE levemente reduzida e preservada (ESC 2023). {q-unesp2026-054}
- **K > 5,0** (ex.: 5,8): não iniciar espironolactona. {q-adap24-021}` },
        { id: "cro-inra", titulo: "Sacubitril-valsartana", conferir: true,
          questoes: ["q-uspsp5-024","q-famema2021-032","q-unesp2022-042","q-uspsp1-057","q-didepm-046","q-usp2024-051"],
          texto: `- Continua sintomático com IECA ou BRA: **trocar por sacubitril-valsartana**. {q-uspsp5-024,q-famema2021-032,q-unesp2022-042,q-uspsp1-057,q-usp2024-051}
- Troca a partir do IECA: **suspender e esperar 36 h** (angioedema). Do BRA, não é preciso esperar. {q-didepm-046}` },
        { id: "cro-ajustes", titulo: "Ajustes, efeitos adversos e dispositivos", conferir: true,
          prosa: `[[Um aumento pequeno e estável da creatinina depois de iniciar os bloqueadores do SRAA é esperado (a pressão de filtração cai um pouco) e **não é motivo para suspender** os remédios, desde que o potássio esteja controlado.|q-usp2025-084]] [[A **espironolactona** bloqueia também o receptor de andrógeno e pode causar **ginecomastia** dolorosa; a troca é pela **eplerenona**.|q-fmabc2026-012]] [[No paciente que segue em classe funcional II a IV apesar do tratamento otimizado, com **FE ≤ 35%** e **bloqueio de ramo esquerdo com QRS ≥ 150 ms**, a **terapia de ressincronização** faz os dois ventrículos contraírem juntos de novo.|q-sessp2026-019]]`,
          questoes: ["q-usp2025-084","q-fmabc2026-012","q-sessp2026-019","q-udisc20262-006","q-uspsp1-107","q-sessp2023-068","q-uspsp3-096","q-uspsp4-015"],
          texto: `- Creatinina com leve aumento estável e K aceitável: **manter** as doses. {q-usp2025-084}
- Ginecomastia: **espironolactona** (trocar por eplerenona). {q-fmabc2026-012}
- **Ressincronização**: FE ≤ 35%, **BRE com QRS ≥ 150 ms**, sintomático apesar do tratamento. {q-sessp2026-019}
- **Furosemida** alivia sintomas, **não** reduz mortalidade. {q-udisc20262-006}
- Edema por **anlodipino** e tosse por IECA não são IC: rever os remédios antes de rotular. {q-uspsp1-107}
- **FA + IC**: anticoagular (ex.: **rivaroxabana**) pelo CHA2DS2-VASc. {q-uspsp3-096,q-uspsp4-015}
- **Vacina anual contra influenza** para todos com IC. {q-sessp2023-068}` },
      ],
    },
    {
      id: "aguda", titulo: "IC aguda e descompensada",
      introducao: `Na IC descompensada, a primeira pergunta à beira do leito tem duas partes: o paciente está **congesto** (úmido) ou não (seco)? E está **perfundido** (quente) ou não (frio)? [[Essa classificação de **Stevenson** cabe no exame físico (estertores, jugulares, edema e ortopneia para a congestão; extremidades frias, pressão de pulso estreita, confusão e oligúria para a má perfusão) e já indica o tratamento.|q-card-11,q-fmabc2023-011,q-iamspe2023-002]]

[[O **perfil B (quente e úmido)** é o mais comum: o problema é o excesso de volume, e o tratamento é **diurético de alça endovenoso**, com vasodilatador se a pressão permitir.|q-card-11,q-fmabc2023-011,q-sessp2025-011]] [[O **perfil C (frio e úmido)** soma congestão e baixo débito: o rim e os tecidos estão mal perfundidos, e o diurético sozinho não funciona; é preciso um **inotrópico**, em geral a **dobutamina**, que aumenta a contratilidade sem contrair os vasos.|q-iamspe2023-002,q-adap26-028,q-unifesp2025-025-ia,q-iamspe2026-009]]

[[No **edema agudo de pulmão hipertensivo**, o problema principal é a pós-carga: a pressão muito alta impede o VE de esvaziar e o líquido é redistribuído para o pulmão em minutos. O tratamento é **vasodilatador (nitrato) endovenoso**, **ventilação não invasiva** e furosemida.|q-unifesp2026-028,q-sessp2022-008,q-udisc20262-034]]`,
      fragmentos: [
        { id: "agu-perfis", titulo: "Perfis hemodinâmicos e o que fazer em cada um", conferir: true,
          questoes: ["q-card-11","q-fmabc2023-011","q-iamspe2023-002","q-sessp2025-011","q-adap26-028","q-unifesp2025-025-ia","q-iamspe2026-009","q-unifesp2025-032"],
          texto: `- **A (quente e seco)**: compensado, ajustar o tratamento oral.
- **B (quente e úmido)**: **diurético EV** ± vasodilatador. {q-card-11,q-fmabc2023-011,q-sessp2025-011}
- **C (frio e úmido)**: **dobutamina + diurético**, em terapia intensiva. {q-iamspe2023-002,q-adap26-028,q-unifesp2025-025-ia}
- **L (frio e seco)**: hipovolêmico, prova cautelosa de **volume**.
- Dobutamina: **inotrópico puro**, sem vasoconstrição significativa. {q-iamspe2026-009,q-unifesp2025-032}` },
        { id: "agu-diuretico", titulo: "Diurético na descompensação", conferir: true,
          questoes: ["q-adap25-032","q-famerp2022-052","q-unesp2024-042","q-uspsp1-057","q-iamspe2021-016"],
          texto: `- Furosemida **EV em bolus**, dose **não inferior à oral** que já usava (1 a 2,5 vezes), **reavaliando em 2 horas** (diurese e sódio urinário). {q-adap25-032}
- Internado: furosemida + **profilaxia de TEV (enoxaparina)**. {q-famerp2022-052}
- Ambulatório congesto: aumentar o diurético; diagnóstico novo: diurético + IECA, Rx e eco. {q-unesp2024-042,q-uspsp1-057,q-iamspe2021-016}` },
        { id: "agu-eap", titulo: "Edema agudo hipertensivo e choque cardiogênico", conferir: true,
          prosa: `[[No **choque cardiogênico do infarto**, com pressão muito baixa, a primeira droga é a **noradrenalina**, para restabelecer a pressão de perfusão; a dobutamina entra quando a pressão já permite.|q-unifesp2026-024]]`,
          questoes: ["q-unifesp2026-028","q-sessp2022-008","q-udisc20262-034","q-unifesp2026-024","q-unifesp2025-032"],
          texto: `- EAP hipertensivo: **VNI + nitrato EV + furosemida EV**. {q-unifesp2026-028,q-sessp2022-008,q-udisc20262-034}
- Choque cardiogênico com PA muito baixa: **noradrenalina** primeiro. {q-unifesp2026-024}
- Baixo débito com PA aceitável: **dobutamina**. {q-unifesp2025-032}` },
      ],
    },
  ],
});
