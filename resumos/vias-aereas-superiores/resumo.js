/* resumos/vias-aereas-superiores/resumo.js — resumo adaptativo de infecções de vias aéreas superiores
   na criança: resfriado e influenza, faringoamigdalite (e mononucleose, PFAPA, abscesso), otite média e
   suas complicações, rinossinusite e celulite orbitária, e o estridor (crupe × epiglotite × traqueíte).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- vias-aereas-superiores */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "vias-aereas-superiores",
  titulo: "Infecções de vias aéreas superiores",
  assunto: "ass-ivas",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "sbp-ivas", texto: "Sociedade Brasileira de Pediatria — documentos científicos sobre otite média aguda, faringotonsilite e rinossinusite", lidoEm: null },
    { id: "aap-oma", texto: "American Academy of Pediatrics — The Diagnosis and Management of Acute Otitis Media (2013)", lidoEm: null },
    { id: "ms-influenza", texto: "Ministério da Saúde — Guia de manejo e tratamento de influenza 2023 (gov.br)", lidoEm: "2026-11-19" },
  ],
  foraDoEscopo: [
    { motivo: "Desatualizada, sem reposição", questoes: ["q-016"] },
  ],
  doencas: [
    {
      id: "viroses", titulo: "Resfriado, influenza e o que não dar",
      introducao: `A criança tem de seis a oito resfriados por ano, mais quando começa a frequentar a creche. [[O resfriado comum é viral e autolimitado: congestão, coriza e febre baixa melhoram em uma semana, e o tratamento é lavar o nariz, hidratar e tratar a febre.|q-sessp2023-031,q-fmabc2022-048,q-fmabc2023-095]]

[[A influenza se distingue pelo início abrupto, febre alta, mialgia e prostração; a criança menor de 5 anos é do grupo de risco para complicações, e por isso o Ministério indica oseltamivir mesmo sem sinal de gravidade.|q-tp20232-040,q-tp20241-044,q-tp20261-021,q-tp20251-041]] [[Infecções de repetição na criança que entrou na escola ou na creche costumam ser só exposição a vírus novos, não imunodeficiência.|q-usprp2021-009]]

Veja também: **Doenças exantemáticas** (mononucleose e escarlatina) e **Bronquiolite, pneumonia e coqueluche**.`,
      fragmentos: [
        { id: "vir-resfriado", titulo: "Resfriado e medicamentos sintomáticos", conferir: true,
          questoes: ["q-sessp2023-031","q-fmabc2022-048","q-fmabc2023-095","q-iamspe2025-062","q-iamspe2025-063","q-iamspe2025-076","q-amrigs2023-080","q-usprp2021-009"],
          texto: `- Resfriado em bom estado: **lavagem nasal, hidratação, sinais de alarme**; alta. {q-sessp2023-031,q-fmabc2022-048}
- Congestão persistente: **solução salina**, analgésico e, se houver componente alérgico, **corticoide tópico nasal**. {q-fmabc2023-095}
- Lavagem com **baixo volume e alta pressão**: remove secreção e melhora a permeabilidade nasal. {q-iamspe2025-063}
- **Ibuprofeno**: febre e dor leve a moderada. {q-iamspe2025-076}
- **Ambroxol**: só faz sentido para reduzir a viscosidade do muco; não trata a infecção. {q-iamspe2025-062}
- Febre sem foco em criança vacinada e bem: **antitérmico** e sinais de alerta. {q-amrigs2023-080}
- Infecções de repetição ao entrar na escola: **exposição**, não imunodeficiência. {q-usprp2021-009}` },
        { id: "vir-influenza", titulo: "Influenza", conferir: false, diretrizes: ["ms-influenza"],
          questoes: ["q-tp20232-040","q-tp20241-044","q-tp20261-021","q-tp20251-041","q-fmabc2026-049"],
          texto: `- Síndrome gripal em **menor de 5 anos**: **oseltamivir**, sintomáticos, afastar da escola e sinais de alerta. {q-tp20232-040,q-tp20241-044,q-tp20261-021}
- Dose cobrada: **30 mg de 12/12 h por 5 dias** (faixa de peso da criança pequena). {q-tp20251-041}` },
      ],
    },
    {
      id: "faringe", titulo: "Faringoamigdalite e diagnósticos vizinhos",
      introducao: `[[A maior parte das faringites é viral; a estreptocócica (Streptococcus pyogenes) é a que importa tratar, porque o antibiótico previne a febre reumática e a supuração local.|q-famerp2023-028,q-famema2023-092,q-adap21-009]] Ela aparece em escolares, com febre, exsudato, petéquias no palato, linfonodos cervicais **anteriores** dolorosos e **sem** tosse ou coriza.

[[Quando a "amigdalite" tem linfonodos posteriores, esplenomegalia e teste para estreptococo negativo, é mononucleose, e a amoxicilina provoca um exantema que não é alergia.|q-scmsp2026-053,q-usprp2025-016,q-usprp2022-017,q-tp20212-057]] [[Febre com faringite, aftas e adenite cervical que voltam a cada poucas semanas em criança que fica bem entre as crises é PFAPA.|q-unesp2026-011,q-fmabc2026-056]]`,
      fragmentos: [
        { id: "far-estrepto", titulo: "Faringite estreptocócica", conferir: true, diretrizes: ["sbp-ivas"],
          questoes: ["q-adap21-009","q-famema2023-092","q-famema2025-041","q-famerp2023-028","q-usprp2023-072","q-usp2025-049"],
          casos: ["q-usp2025-049"],
          texto: `- Tratamento: **penicilina benzatina IM dose única** (1.200.000 UI acima de 27 kg) ou **amoxicilina por 10 dias**. {q-adap21-009,q-famema2023-092}
- Amoxicilina **em dose única diária** também é aceita. {q-famema2025-041}
- Preferência: **betalactâmico**. {q-famerp2023-028}
- **Anafilaxia à penicilina**: **azitromicina**. {q-usprp2023-072}
- Lactente com vesículas no palato e bom estado: **faringite viral (herpangina)**, só analgésico. {q-usp2025-049}` },
        { id: "far-mono-pfapa", titulo: "Mononucleose, PFAPA e abscesso", conferir: true,
          questoes: ["q-scmsp2026-053","q-usprp2025-016","q-usprp2022-017","q-tp20212-057","q-amrigs2023-079","q-unesp2026-011","q-fmabc2026-056","q-uspsp5-101","q-uspsp4-119"],
          casos: ["q-usprp2022-017","q-uspsp4-119"],
          texto: `- Exsudato, linfonodos **posteriores**, **esplenomegalia**, teste rápido negativo: **mononucleose** (EBV). {q-scmsp2026-053,q-tp20212-057}
- Exantema após amoxicilina na mononucleose: **suspender o antibiótico**, sintomáticos. {q-usprp2025-016,q-usprp2022-017}
- Insuficiência respiratória no EBV: **obstrução** da via aérea por linfonodos e amígdalas. {q-amrigs2023-079}
- Febre a cada poucas semanas com **aftas, faringite e adenite**, bem entre as crises: **PFAPA**; corticoide em dose única aborta a crise. {q-unesp2026-011,q-fmabc2026-056}
- Amígdala abaulada com **desvio da úvula**: **abscesso periamigdaliano**; antibiótico parenteral e tomografia. {q-uspsp5-101}
- Febre, toxemia e alargamento do espaço retrofaríngeo: **antibiótico IV, internação e tomografia**. {q-uspsp4-119}` },
      ],
    },
    {
      id: "ouvido", titulo: "Otite média, mastoidite e rinossinusite",
      introducao: `[[A tuba auditiva da criança é curta e horizontal: uma infecção viral do nariz a obstrui, o ouvido médio acumula secreção e as bactérias da nasofaringe (pneumococo, Haemophilus, Moraxella) a infectam.|q-uspsp2-059]] O diagnóstico exige **abaulamento da membrana timpânica**; hiperemia isolada não basta.

[[A mastoidite é a infecção que passa do ouvido médio às células da mastoide: a orelha fica deslocada para a frente e para baixo, com dor e abaulamento atrás dela.|q-sirio2023-057,q-unicamp2023-040,q-usp2022-045]] [[O seio paranasal infectado pode invadir a órbita; a celulite pré-septal fica à frente do septo orbitário, sem dor ao mover o olho nem proptose, e a pós-septal tem os dois.|q-amrigs2020-076]]`,
      fragmentos: [
        { id: "ouv-oma", titulo: "Otite média aguda", conferir: true, diretrizes: ["aap-oma","sbp-ivas"],
          questoes: ["q-uspsp2-059","q-sessp2026-054"],
          casos: ["q-uspsp2-059"],
          texto: `- **Menor de 2 anos** com febre alta e irritabilidade, mesmo unilateral: **amoxicilina**. {q-uspsp2-059}
- **Otorreia** no 2º dia de amoxicilina: perfuração drenando, **manter o tratamento** e reavaliar. {q-sessp2026-054}` },
        { id: "ouv-complicacoes", titulo: "Mastoidite, celulite orbitária e rinossinusite", conferir: true,
          questoes: ["q-sirio2023-057","q-unicamp2023-040","q-usp2022-045","q-amrigs2020-076","q-amrigs2021-065"],
          casos: ["q-sirio2023-057","q-usp2022-045"],
          texto: `- Abaulamento **retroauricular** com orelha deslocada: **mastoidite aguda**. {q-sirio2023-057}
- Tratamento: **antibiótico IV** (ex.: **oxacilina + ceftriaxona**). {q-unicamp2023-040}
- Mastoidite que não melhora com antibiótico oral: **ceftriaxona + clindamicina IV** e **tomografia de mastoide e crânio**. {q-usp2022-045}
- Edema palpebral após resfriado, **sem dor à movimentação ocular e sem proptose**: **celulite pré-septal**. {q-amrigs2020-076}
- Secreção nasal **unilateral** e fétida: pensar em **corpo estranho**. {q-amrigs2021-065}` },
      ],
    },
    {
      id: "estridor", titulo: "Estridor: crupe, epiglotite e traqueíte",
      introducao: `[[O estridor é o ruído do ar passando por uma via aérea alta estreitada; na criança pequena basta pouco edema para reduzir muito o calibre, porque a região subglótica é a parte mais estreita.|q-usp2026-069,q-tp20252-007]]

[[No crupe, mais comum entre 6 meses e 3 anos, um vírus (parainfluenza) inflama a laringe e a traqueia: a tosse fica ladrante, a voz rouca, e o estridor piora à noite. O corticoide reduz o edema em horas, e a adrenalina inalatória contrai os vasos da mucosa em minutos quando há estridor em repouso.|q-tp20212-048,q-unesp2024-013,q-uspsp2-061,q-uspsp4-120]] [[A epiglotite e a traqueíte bacteriana são as emergências que imitam o crupe: toxemia, salivação, ou crupe que não melhora e piora com febre alta pedem via aérea garantida.|q-sirio2021-056,q-famerp2023-023,q-amrigs2020-077]]`,
      fragmentos: [
        { id: "est-crupe", titulo: "Crupe viral", conferir: true, diretrizes: ["sbp-ivas"],
          figuras: [{ arquivo: "figuras/estridor.svg", legenda: "Esquema autoral: as três causas de estridor que a prova compara." }],
          questoes: ["q-usp2026-069","q-tp20252-007","q-tp20212-048","q-unesp2024-013","q-uspsp2-061","q-uspsp4-120","q-unicampdis2022-026","q-iamspe2025-067","q-sessp2025-045","q-adap23-091"],
          casos: ["q-usp2026-069"],
          texto: `- Coriza, tosse ladrante, rouquidão e estridor: **laringotraqueobronquite (crupe)**, edema **subglótico**. {q-usp2026-069,q-unicampdis2022-026}
- **Estridor em repouso**: **adrenalina inalatória + dexametasona** e observação. {q-tp20252-007,q-unesp2024-013,q-uspsp2-061,q-uspsp4-120,q-tp20212-048}
- O "guincho" da **coqueluche** é diferente: inspiração ruidosa **depois** do acesso de tosse. {q-iamspe2025-067}
- Tosse paroxística com guincho: **coqueluche**, azitromicina. {q-sessp2025-045}
- Crupe com estridor em repouso: **dexametasona 0,6 mg/kg + adrenalina nebulizada**, observar 2–4 h. {q-adap23-091}` },
        { id: "est-bacterianas", titulo: "Epiglotite e traqueíte bacteriana", conferir: true,
          questoes: ["q-sirio2021-056","q-famerp2023-023","q-amrigs2020-077"],
          prosa: `| | Crupe | Epiglotite | Traqueíte bacteriana |
|---|---|---|---|
| Agente | **parainfluenza** | *Haemophilus* b (raro com a vacina), estreptococo | ***Staphylococcus aureus*** |
| Início | gradual, após coriza | **súbito**, toxemia | crupe que **piora** com febre alta |
| Sinais | tosse **ladrante**, rouquidão | **salivação**, voz abafada, sentada inclinada | secreção purulenta, sem resposta à adrenalina |
| Conduta | dexametasona ± adrenalina | **não examinar**; via aérea no centro cirúrgico | antibiótico IV e via aérea garantida |`,
          texto: `- Salivação, prostração e **pescoço em hiperextensão**: **epiglotite**. {q-sirio2021-056}
- Secreção purulenta na traqueia e **cânula menor que a calculada**: **traqueíte bacteriana**. {q-famerp2023-023}
- Agente mais frequente da traqueíte: ***Staphylococcus aureus***. {q-amrigs2020-077}` },
      ],
    },
    {
      id: "orl", titulo: "Otorrino além da infecção: sono, estridor, audição e sinusite do adulto",
      introducao: `[[Na **apneia obstrutiva do sono**, a faringe colapsa durante o sono e a respiração para; o cérebro desperta brevemente para reabrir, o sono vira fragmentos e o sistema simpático dispara a noite toda. Daí o **ronco com pausas**, a **sonolência diurna** e os esquecimentos no adulto, e **agitação, desatenção e alteração de comportamento**, enurese e sudorese na criança. A apneia é **fator de risco independente** para hipertensão (inclusive **resistente**), diabetes e síndrome metabólica.|q-unesp2023-074,q-unesp2022-055,q-unifesp2026-093]] [[**Estridor** é o som da obstrução da via aérea **superior**; inspiratório e presente **desde as primeiras semanas**, pior ao choro e deitado de costas, num lactente que cresce bem, é **laringomalácia** (a supraglote colapsa na inspiração), que melhora sozinha até 1–2 anos.|q-iamspe2022-038,q-unifesp2022-059,q-einstein2023-036]]`,
      fragmentos: [
        { id: "orl-sono", titulo: "Apneia do sono e insônia", conferir: true,
          questoes: ["q-unesp2023-074","q-unesp2022-055","q-usp2023-041","q-unifesp2026-093","q-adap26-093","q-tp20252-082","q-amrigs2022-097"],
          prosa: `[[O diagnóstico é a **polissonografia**. No **adulto**, o tratamento da apneia moderada a grave é o **CPAP** (pressão positiva que mantém a faringe aberta), com perda de peso. Na **criança**, a causa é a **hipertrofia de adenoide e amígdalas**: **adenoamigdalectomia** é a primeira linha.|q-unesp2022-055,q-usp2023-041,q-adap26-093,q-tp20252-082]] [[**Insônia** é mais comum em **mulheres**; trata-se primeiro com **higiene do sono** e terapia cognitivo-comportamental, e sonolência diurna manda investigar apneia.|q-amrigs2022-097]]`,
          texto: `- Apneia: fator de risco para **HAS, DM** e síndrome metabólica; criança: **comportamento**. {q-unesp2023-074,q-unifesp2026-093}
- Diagnóstico: **polissonografia**; adulto: **CPAP**. {q-unesp2022-055,q-usp2023-041}
- Criança com hipertrofia: **adenoamigdalectomia**. {q-adap26-093,q-tp20252-082}
- Insônia: mais em **mulheres**; higiene do sono. {q-amrigs2022-097}` },
        { id: "orl-estridor-audicao", titulo: "Estridor do lactente, obstrução no adulto e audição", conferir: true,
          questoes: ["q-iamspe2022-038","q-unifesp2022-059","q-einstein2023-036","q-unifesp2023-091","q-unesp2021-018","q-sirio2023-058"],
          prosa: `[[Adulto com **cornagem** (estridor) e dispneia, sem resposta ao oxigênio: obstrução da via aérea central (tumor, estenose, corpo estranho), investigada e tratada por **broncoscopia**.|q-unifesp2023-091]] [[Criança com **atraso de fala**, trocas fonêmicas e desatenção, ou adolescente que aumenta o volume da TV: primeiro **avaliar a audição** (audiometria). A **surdez neurossensorial bilateral** da criança pede investigação genética, de infecções congênitas e imagem.|q-unesp2021-018,q-sirio2023-058]]`,
          texto: `- Obstrução de via aérea superior: **estridor**. {q-iamspe2022-038}
- Estridor desde o nascimento, bem: **laringomalácia**. {q-unifesp2022-059,q-einstein2023-036}
- Adulto com cornagem: **broncoscopia**. {q-unifesp2023-091}
- Atraso de fala ou volume alto: **avaliação audiológica**; neurossensorial: genética, sorologias, imagem. {q-unesp2021-018,q-sirio2023-058}` },
        { id: "orl-sinusite-complicacoes", titulo: "Sinusite do adulto e infecções profundas", conferir: true,
          questoes: ["q-usp2022-017","q-unesp2021-074","q-sirio2027-015","q-fmabc2024-005","q-einstein2023-020"],
          prosa: `[[Cefaleia e febre por dias com dor facial e secreção: **sinusite**. Unilateral, fétida, depois de **extração de molar superior**: **sinusite maxilar odontogênica** (a raiz do molar fica no assoalho do seio). **Rinossinusite crônica** (mais de 12 semanas de obstrução, perda de olfato, peso facial): **lavagem nasal de alto volume e corticoide tópico** contínuo.|q-usp2022-017,q-unesp2021-074,q-sirio2027-015]] [[Complicações graves: otite no diabético que evolui com **dor retro-orbitária e paralisia do VI nervo (abducente)** é **síndrome de Gradenigo** (petrosite); abscesso cervical com **gás e necrose** no etilista é **infecção cervical profunda necrosante**, que exige **desbridamento cirúrgico amplo** e procurar a origem dentária.|q-fmabc2024-005,q-einstein2023-020]]`,
          texto: `- Febre, cefaleia e dor facial: **sinusite**; após extração de molar: **odontogênica**. {q-usp2022-017,q-unesp2021-074}
- Crônica: **lavagem nasal + corticoide tópico**. {q-sirio2027-015}
- Otite + paralisia do VI: **Gradenigo**. {q-fmabc2024-005}
- Abscesso cervical com gás: **desbridamento amplo**. {q-einstein2023-020}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-fmabc2026-049"],
          texto: `- Influenza em escolar saudável fora do grupo de risco: **sintomáticos**; oseltamivir é para grupo de risco ou quadro grave (algumas provas o dão a todos nas primeiras 48 h). {q-fmabc2026-049}` },
      ],
    },
  ],
});
