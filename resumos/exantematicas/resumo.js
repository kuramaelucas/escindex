/* resumos/exantematicas/resumo.js — resumo adaptativo de doenças exantemáticas.
   Cada fragmento lista as questões de dados/ que ele ajuda a responder: é por elas
   que o visualizador mede o erro do aluno e decide o destaque (resumos/LEIA-ME.md).
   Texto: "- " vira tópico, **x** vira destaque, {q-a,q-b} no fim do tópico liga aquele tópico às questões
   (o visualizador fragmenta o trecho tópico a tópico quando o aluno erra ali). Conferência: npm run resumo -- exantematicas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "exantematicas",
  titulo: "Doenças exantemáticas na infância",
  assunto: "ass-exantematicas",
  criadoEm: "2026-11-18",
  fontes: [
    { texto: "Ministério da Saúde — Guia de Vigilância em Saúde (sarampo, rubéola, varicela)", lidoEm: null },
    { texto: "American Heart Association — Diagnosis and Management of Kawasaki Disease (2024)", lidoEm: null },
    { texto: "SBP / Calendário Nacional de Vacinação (PNI)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Coqueluche: está no mesmo assunto da taxonomia, mas não é exantemática — terá resumo próprio",
      questoes: ["q-tp20252-069","q-unesp2025-014","q-unicampdis2023-030","q-unicampdis2024-096","q-uspsp1-006","q-fmabc2024-055","q-einstein2027-039"] },
  ],
  doencas: [
    {
      id: "raciocinio", titulo: "Como raciocinar diante de febre + exantema",
      fragmentos: [
        { id: "rac-chaves", titulo: "As quatro perguntas que separam as doenças", conferir: true,
          questoes: ["q-famema2025-042","q-tp20222-047","q-amrigs2021-070"],
          texto: `- **Qual a relação febre × exantema?** O exantema aparece quando a febre cede: **exantema súbito**. O exantema vem no auge da febre: **sarampo**. Febre há 5 dias ou mais sem foco: pense em **Kawasaki**. {q-amrigs2021-070,q-famema2025-042}
- **Que pródromo veio antes?** Tosse, coriza e conjuntivite: **sarampo**. Dor de garganta: **escarlatina** ou **mononucleose**. Pródromo pobre ou ausente: **rubéola** ou **eritema infeccioso**. {q-tp20222-047,q-famema2025-042}
- **Que cara tem a lesão?** Lesão **áspera em lixa**: escarlatina. Lesões **em vários estágios e pruriginosas**: varicela. **Vesículas em mãos, pés e boca**: enterovírus. Face **esbofeteada** e **rendilhado**: parvovírus B19.
- **Há sinal patognomônico ou de localização?** **Koplik** (sarampo), **adenopatia retroauricular/occipital** (rubéola), **Pastia e Filatov** (escarlatina), **esplenomegalia** (mononucleose). {q-famema2025-042}
- A **faixa etária** ajuda: o exantema súbito aparece **entre 6 meses e 2 anos**, e escarlatina e eritema infeccioso, em pré-escolares e escolares. {q-famema2025-042}` },
      ],
    },
    {
      id: "sarampo", titulo: "Sarampo",
      fragmentos: [
        { id: "sar-agente", titulo: "Agente e transmissão", conferir: true,
          questoes: ["q-amrigs2025-014","q-simepm89-061"],
          texto: `- Vírus RNA do gênero **Morbillivirus** (família Paramyxoviridae). {q-amrigs2025-014}
- Transmissão **respiratória por aerossol**: é das doenças mais contagiosas que existem. Pense em sarampo em quem volta de **área com surto** sem vacina comprovada. {q-simepm89-061}
- Transmite de **4 dias antes a 4 dias depois do início do exantema**.
- Quem elimina o vírus e leva à recuperação é a **resposta imune celular** do hospedeiro. Não há antiviral específico. {q-amrigs2025-014}` },
        { id: "sar-clinica", titulo: "Quadro clínico e Koplik", conferir: true,
          questoes: ["q-famema2025-042","q-iamspe2025-065","q-fmabc2025-047","q-fmabc2025-096","q-unicampdis2025-026","q-simepm89-061","q-uspsp4-101","q-sirio2022-053","q-famerp2023-027","q-famerp2022-014","q-famerp2026-009","q-fmabc2026-089","q-einstein2025-043","q-tp20222-047"],
          texto: `- **Pródromo de 3 a 5 dias**: febre alta, com os **3 Cs**: **tosse, coriza e conjuntivite** (pode haver fotofobia). {q-famema2025-042,q-fmabc2025-047,q-fmabc2025-096,q-unicampdis2025-026,q-simepm89-061,q-uspsp4-101,q-famerp2022-014,q-famerp2026-009,q-einstein2025-043,q-tp20222-047}
- **Sinal de Koplik**: **pontos branco-azulados sobre halo vermelho na mucosa jugal, na altura dos (pré-)molares**. Aparece **antes do exantema** e é **patognomônico**. {q-iamspe2025-065,q-fmabc2026-089,q-famerp2023-027,q-sirio2022-053,q-unicampdis2025-026,q-famerp2026-009,q-famema2025-042}
- **Exantema morbiliforme**, maculopapular e **confluente**, que começa **atrás das orelhas e na linha do cabelo** e desce em sentido **craniocaudal**. A **febre continua alta** quando o exantema surge. {q-famerp2023-027,q-famerp2022-014,q-famerp2026-009,q-sirio2022-053,q-fmabc2025-096}
- O exantema evolui com **descamação furfurácea** (fina, "em farelo").
- Exantema morbiliforme quer dizer **manchas**, não **equimoses**. {q-fmabc2026-089}` },
        { id: "sar-diag", titulo: "Diagnóstico laboratorial", conferir: true,
          questoes: ["q-uspsp4-101","q-amrigs2025-014"],
          texto: `- **Sorologia IgM** (positiva a partir do exantema) e **RT-PCR** em **secreção nasofaríngea/orofaríngea e urina**. Colha as duas amostras na primeira consulta. {q-uspsp4-101}
- A **IgM marca a infecção primária**: costuma **não aparecer na reexposição nem na revacinação**, quando sobe a IgG. {q-amrigs2025-014}` },
        { id: "sar-compl", titulo: "Complicações", conferir: true,
          questoes: ["q-einstein2021-021","q-tp20222-047","q-sirio2022-053"],
          texto: `- A **pneumonia** é a complicação mais frequente e a **principal causa de morte**. Pode ser viral ou bacteriana secundária. {q-einstein2021-021,q-tp20222-047}
- Outras: **otite média aguda**, **diarreia**, laringotraqueobronquite e **encefalite aguda**. {q-einstein2021-021}
- No **imunodeprimido**: **pneumonia de células gigantes** (de Hecht), muitas vezes sem exantema. {q-sirio2022-053}
- Complicação tardia, anos depois: **panencefalite esclerosante subaguda (PEES)**.` },
        { id: "sar-trat", titulo: "Tratamento: suporte + vitamina A", conferir: true,
          questoes: ["q-usprp2026-032","q-amrigs2025-014","q-uspsp4-101"],
          texto: `- O tratamento é **de suporte** (antitérmico, hidratação, nutrição). {q-amrigs2025-014}
- Dê **vitamina A a todo caso suspeito**, em **2 doses** (dia 1 e dia 2), com dose conforme a idade. A vitamina A reduz complicações e mortalidade. {q-usprp2026-032,q-uspsp4-101,q-amrigs2025-014}
- **Antibiótico não trata o sarampo.** Use só se houver **complicação bacteriana**, como pneumonia ou otite. {q-amrigs2025-014}` },
        { id: "sar-vigil", titulo: "Notificação, bloqueio e vacina", conferir: true,
          questoes: ["q-einstein2025-043","q-famerp2026-009","q-famerp2022-014","q-famerp2023-027","q-iamspe2021-072","q-fmabc2026-089"],
          texto: `- **Notificação compulsória imediata, em até 24 h**, já na **suspeita**. Não espere a confirmação. {q-einstein2025-043,q-fmabc2026-089}
- **Bloqueio vacinal seletivo** dos contatos suscetíveis em **até 72 h** da exposição. A vacina dada a tempo **pode prevenir** a doença. {q-famerp2026-009,q-famerp2022-014,q-famerp2023-027}
- **Imunoglobulina humana em até 6 dias** para contatos que **não podem receber a vacina**: gestantes, menores de 6 meses e imunodeprimidos. {q-famerp2023-027}
- Calendário: **tríplice viral aos 12 meses** e **segunda dose aos 15 meses** (tetra viral ou tríplice + varicela). São **duas doses**, não uma. {q-fmabc2026-089,q-famerp2023-027}
- A **cobertura vacinal de 95% ou mais** garante a proteção da população. A queda da cobertura explica a volta dos casos depois da certificação de 2016. A medida que mais reduz a incidência é **aumentar a cobertura vacinal**. {q-famerp2023-027,q-iamspe2021-072}` },
      ],
    },
    {
      id: "rubeola", titulo: "Rubéola",
      fragmentos: [
        { id: "rub-tudo", titulo: "Agente, quadro e forma congênita", conferir: true,
          questoes: ["q-famema2025-042"],
          texto: `- Agente: **Rubivirus (vírus da rubéola)**, família Matonaviridae, antes classificada como Togaviridae.
- Pródromo **leve**. A pista mais cobrada é a **linfadenopatia retroauricular, occipital e cervical posterior**.
- Exantema **róseo, discreto**, craniocaudal, que dura cerca de **3 dias**. Pode haver **manchas de Forchheimer** no palato e **artralgia** em adolescentes e mulheres.
- **Síndrome da rubéola congênita**: **catarata**, **surdez neurossensorial** e **cardiopatia (PCA)**. Por isso a vigilância é a mesma do sarampo: notificação imediata e bloqueio.` },
      ],
    },
    {
      id: "subito", titulo: "Exantema súbito (roséola infantum)",
      fragmentos: [
        { id: "sub-agente", titulo: "Agente: herpes-vírus humano 6 (e 7)", conferir: true,
          questoes: ["q-famema2023-081","q-sirio2021-057","q-fmabc2021-098","q-einstein2022-038"],
          texto: `- Agente: **herpes-vírus humano 6 (HHV-6B)**. Menos vezes, o **HHV-7**. {q-famema2023-081,q-sirio2021-057,q-fmabc2021-098,q-einstein2022-038}
- Idade típica: **6 meses a 2 anos**. Não é doença do escolar.` },
        { id: "sub-clinica", titulo: "Febre alta que some → aí aparece o exantema", conferir: true,
          questoes: ["q-scmsp2025-053","q-uspsp1-004","q-fmabc2021-098","q-einstein2022-038","q-sirio2021-057","q-famema2023-081","q-unicampdis2023-035","q-famema2025-042"],
          texto: `- **3 a 5 dias de febre alta** em lactente em **bom estado geral**. {q-scmsp2025-053,q-uspsp1-004,q-einstein2022-038,q-sirio2021-057,q-unicampdis2023-035}
- A **febre cai em crise** e **só então** surge o exantema **maculopapular róseo**, que começa no **tronco** e vai para pescoço, face e membros. Dura de 1 a 2 dias. {q-scmsp2025-053,q-uspsp1-004,q-fmabc2021-098,q-sirio2021-057,q-famema2023-081,q-unicampdis2023-035,q-einstein2022-038}
- Não há pródromo respiratório marcante, e o exame fora o exantema é **normal**. {q-famema2023-081}` },
        { id: "sub-compl", titulo: "Complicação e conduta", conferir: true,
          questoes: ["q-uspsp5-120","q-amrigs2021-070"],
          texto: `- A complicação mais associada é a **crise convulsiva febril**, durante a fase de febre alta. {q-uspsp5-120}
- Conduta **expectante**: antitérmico, observação e retorno se a febre voltar ou surgir sinal de alarme. {q-amrigs2021-070}` },
        { id: "sub-armadilha", titulo: "Armadilha: \"alergia à amoxicilina\"", conferir: true,
          questoes: ["q-amrigs2021-070"],
          texto: `- O lactente com febre recebe **amoxicilina**, a febre cede e aparecem manchas. A família atribui o quadro a **alergia ao antibiótico**, mas o mais provável é **exantema súbito**.
- Como a febre era viral, **suspenda o antimicrobiano** sem indicação. **Não rotule** a criança como alérgica sem necessidade.` },
      ],
    },
    {
      id: "eritema", titulo: "Eritema infeccioso (quinta doença)",
      fragmentos: [
        { id: "eri-agente", titulo: "Agente: parvovírus B19", conferir: true,
          questoes: ["q-scmsp2026-054","q-sessp2025-042","q-tp20202-046","q-fmabc2024-058","q-einstein2021-027"],
          texto: `- Agente: **parvovírus B19**, vírus de DNA com **tropismo pelo precursor eritroide**.
- Contato com caso de "quinta doença" ou face esbofeteada aponta para **parvovírus B19**. {q-scmsp2026-054,q-sessp2025-042,q-tp20202-046,q-fmabc2024-058,q-einstein2021-027}` },
        { id: "eri-clinica", titulo: "As três fases do exantema", conferir: true,
          questoes: ["q-scmsp2026-054","q-sessp2025-042","q-tp20202-046","q-fmabc2024-058","q-einstein2021-027","q-einstein2024-040","q-unicampdis2023-035"],
          texto: `- **1ª fase:** eritema intenso nas bochechas, a **face esbofeteada** ("asa de borboleta"), poupando a região perioral. {q-scmsp2026-054,q-sessp2025-042,q-tp20202-046,q-einstein2021-027}
- **2ª fase:** exantema **rendilhado (reticulado)** em tronco e na **face extensora dos membros**. {q-einstein2024-040,q-fmabc2024-058,q-tp20202-046}
- **3ª fase:** o exantema **reaparece com calor, sol, banho quente e exercício** por semanas. {q-unicampdis2023-035}
- Febre baixa ou ausente e bom estado geral. **Artralgia** pode aparecer, sobretudo em adolescentes e adultos. {q-scmsp2026-054,q-einstein2024-040}
- Quando o exantema aparece, a criança **já não transmite** e pode ir à escola.` },
        { id: "eri-risco", titulo: "Quando o B19 é grave", conferir: true,
          questoes: ["q-sessp2025-042"],
          texto: `- **Crise aplásica transitória** em quem tem **anemia hemolítica crônica**, como a **doença falciforme** e a esferocitose.
- **Anemia crônica** no **imunodeprimido**.
- Na **gestante**: **hidropisia fetal** por anemia fetal.` },
      ],
    },
    {
      id: "escarlatina", titulo: "Escarlatina",
      fragmentos: [
        { id: "esc-agente", titulo: "Agente e faixa etária", conferir: true,
          questoes: ["q-unesp2025-009","q-sirio2026-055","q-uspsp2-050","q-famema2025-042"],
          texto: `- Agente: **Streptococcus pyogenes (estreptococo β-hemolítico do grupo A)**, que produz **toxina pirogênica (eritrogênica)**. {q-unesp2025-009,q-sirio2026-055,q-uspsp2-050}
- Faixa etária: **escolares (5 a 15 anos)**. É **rara antes dos 3 anos**. {q-famema2025-042}` },
        { id: "esc-clinica", titulo: "Quadro: faringite + exantema em lixa", conferir: true,
          questoes: ["q-usprp2026-046","q-unesp2025-009","q-sirio2026-055","q-uspsp2-050"],
          texto: `- **Febre, odinofagia e faringite exsudativa**. Pode haver vômitos e cefaleia. **Sem tosse nem coriza**. {q-usprp2026-046,q-unesp2025-009,q-sirio2026-055}
- O exantema é **micropapular e áspero ("em lixa")** e começa em **pescoço, axilas e virilhas**. {q-usprp2026-046,q-sirio2026-055,q-uspsp2-050}
- **Sinal de Pastia**: o exantema fica mais intenso nas dobras. {q-sirio2026-055}
- **Sinal de Filatov**: rubor facial com **palidez perioral**. {q-sirio2026-055}
- **Língua em framboesa**: primeiro saburrosa, depois vermelha. {q-unesp2025-009,q-sirio2026-055}
- Evolui com **descamação lamelar** em mãos e pés.` },
        { id: "esc-diag-trat", titulo: "Diagnóstico e tratamento", conferir: true,
          questoes: ["q-uspsp2-050","q-usprp2026-046","q-unesp2025-009","q-famema2025-042"],
          texto: `- **Padrão-ouro: cultura de orofaringe.** O teste rápido de antígeno também serve. {q-uspsp2-050}
- **Trate sempre com antibiótico**: **penicilina G benzatina IM em dose única** ou **amoxicilina VO por 10 dias**. O tratamento previne a **febre reumática**. {q-usprp2026-046,q-unesp2025-009}
- "É doença de toxina, não precisa de antibiótico" é **falso**. {q-famema2025-042}` },
      ],
    },
    {
      id: "varicela", titulo: "Varicela",
      fragmentos: [
        { id: "var-tudo", titulo: "Quadro e conduta com contatos", conferir: true,
          questoes: ["q-einstein2027-062"],
          texto: `- Agente: **vírus varicela-zóster**. As lesões são **pruriginosas** e aparecem **em diferentes estágios ao mesmo tempo** (mácula, pápula, vesícula e crosta). A distribuição é **centrípeta**, mais no tronco.
- A complicação mais comum é a **infecção bacteriana da pele** (estreptococo ou estafilococo). **Não use AAS**, pelo risco de **síndrome de Reye**.
- Contato suscetível e imunocompetente: **vacina contra varicela pós-exposição**, idealmente em **até 3 a 5 dias**.
- **Imunoglobulina específica (VZIG)** para quem não pode receber vacina: imunodeprimidos, gestantes suscetíveis e alguns recém-nascidos.` },
      ],
    },
    {
      id: "enterovirus", titulo: "Enteroviroses: mão-pé-boca e herpangina",
      fragmentos: [
        { id: "ent-agente", titulo: "Agente: Coxsackie A (e enterovírus 71)", conferir: true,
          questoes: ["q-amrigs2021-090","q-sessp2022-052"],
          texto: `- Agente: **vírus Coxsackie A** (sobretudo **A16** na mão-pé-boca) e **enterovírus 71**, que se associa às formas neurológicas.
- Transmissão **fecal-oral** e respiratória, mais comum em creches.` },
        { id: "ent-clinica", titulo: "Mão-pé-boca × herpangina", conferir: true,
          questoes: ["q-amrigs2021-090","q-sessp2022-052","q-iamspe2025-078","q-tp20222-048","q-amrigs2020-078"],
          texto: `- **Mão-pé-boca:** úlceras dolorosas na **boca** e lesões **pápulo-vesiculares em mãos, pés** (e nádegas). Febre **baixa e curta**. **Febre alta por mais de 7 dias não é típica.** {q-amrigs2021-090,q-iamspe2025-078,q-tp20222-048,q-amrigs2020-078}
- **Herpangina:** **febre alta súbita** com **vesículas e úlceras com halo eritematoso em pilares anteriores, palato mole e úvula**, **sem lesões na pele**. {q-sessp2022-052}
- Conduta: **suporte** com **analgesia, hidratação oral e dieta fria e pastosa**. A criança com sinais vitais normais **vai para casa**, sem exames e sem antibiótico. {q-tp20222-048,q-amrigs2020-078}` },
      ],
    },
    {
      id: "mono", titulo: "Mononucleose infecciosa",
      fragmentos: [
        { id: "mon-tudo", titulo: "EBV: faringite + linfonodos + baço", conferir: true,
          questoes: ["q-amrigs2020-073","q-einstein2026-035","q-usprp2026-045"],
          texto: `- Agente: **vírus Epstein-Barr (EBV)**. Quadro típico em **adolescentes**. {q-amrigs2020-073,q-einstein2026-035}
- Tríade: **febre, faringite exsudativa e linfadenopatia generalizada**, sobretudo cervical posterior. Somam-se **esplenomegalia** e edema palpebral. {q-amrigs2020-073,q-einstein2026-035}
- Hemograma: **linfocitose com linfócitos atípicos**. Confirme com **anticorpo heterófilo** ou **sorologia VCA-IgM**. {q-einstein2026-035}
- O **exantema aparece sobretudo depois de amoxicilina ou ampicilina** e não indica alergia verdadeira.
- Diante de **linfonodomegalia generalizada que persiste** após febre, investigue **EBV, toxoplasmose e HIV**. {q-usprp2026-045}` },
      ],
    },
    {
      id: "kawasaki", titulo: "Diferencial grave: Kawasaki e SIM-P",
      fragmentos: [
        { id: "kaw-crit", titulo: "Critérios de Kawasaki", conferir: true,
          questoes: ["q-scmsp2025-057","q-sirio2025-045","q-sirio2024-050","q-scmsp2022-039","q-famema2025-042"],
          texto: `- Critério obrigatório: **febre por 5 dias ou mais**. Some **4 dos 5 critérios**: {q-scmsp2025-057,q-sirio2025-045}
- **Conjuntivite bilateral NÃO exsudativa**, que poupa o limbo. {q-famema2025-042,q-sirio2025-045,q-scmsp2025-057}
- **Alterações de lábios e boca**: lábios secos e fissurados, língua em framboesa, hiperemia. {q-scmsp2025-057}
- **Exantema polimorfo**, que **não é vesicular nem bolhoso**. {q-famema2025-042}
- **Alterações de extremidades**: edema e eritema de mãos e pés, e depois **descamação periungueal**. {q-scmsp2025-057}
- **Linfonodo cervical de 1,5 cm ou mais**, em geral unilateral. {q-sirio2025-045,q-scmsp2025-057}
- **Miocardite não é critério**: é complicação. Febre que não cede com antibiótico é uma pista. {q-sirio2024-050,q-scmsp2022-039}` },
        { id: "kaw-trat", titulo: "Tratamento e Kawasaki incompleta", conferir: true,
          questoes: ["q-scmsp2021-056","q-scmsp2022-039","q-sirio2025-045"],
          texto: `- Tratamento: **imunoglobulina IV 2 g/kg** de imediato, idealmente **até o 10º dia**, junto com **AAS**. {q-scmsp2021-056}
- No **lactente** com febre prolongada e poucos critérios, pense em **Kawasaki incompleta** e faça **ecocardiograma**, PCR e VHS. Não espere completar os critérios. {q-scmsp2021-056}
- Nos casos de **alto risco de aneurisma coronariano**, a **AHA sugere associar corticoide** ao tratamento inicial. {q-scmsp2022-039}` },
        { id: "kaw-simp", titulo: "SIM-P (síndrome inflamatória multissistêmica pós-covid)", conferir: true,
          questoes: ["q-sirio2024-043"],
          texto: `- Quadro: **febre, sintomas gastrintestinais, exantema e choque** (hipotensão, taquicardia), com **PCR, dímero-D e transaminases muito altos** e plaquetopenia. Há **contato com covid** de 2 a 6 semanas antes.
- Tratamento: **IGIV 2 g/kg + metilprednisolona 2 mg/kg/dia**. Use **antibiótico empírico (ceftriaxona)** enquanto não se afasta sepse em criança chocada.
- **Não dê AAS antiagregante** se as plaquetas estiverem baixas.` },
      ],
    },
    {
      id: "ssse", titulo: "Síndrome da pele escaldada estafilocócica",
      fragmentos: [
        { id: "sse-tudo", titulo: "Toxina esfoliativa do S. aureus", conferir: true,
          questoes: ["q-sessp2026-050"],
          texto: `- Toxina **esfoliativa do Staphylococcus aureus**, que **cliva a desmogleína-1**. É mais comum em menores de 5 anos.
- Quadro: eritema doloroso **periorificial**, com **bolhas flácidas que se rompem** e crostas e **ragádias periorais**. **Nikolsky positivo** e **mucosas poupadas**, ao contrário da síndrome de Stevens-Johnson.
- Tratamento: **oxacilina IV** (antiestafilocócico), hidratação e cuidados com a pele.` },
      ],
    },
  ],
});
