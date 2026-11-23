/* resumos/neutropenia-febril/resumo.js — resumo adaptativo do assunto ass-neutropeniafebril: neutropenia febril
   (definição, nadir, agentes, risco MASCC, tratamento empírico, fungos), febre e hipertermia (mecanismo,
   antitérmicos), febre de origem indeterminada (adulto e criança), síndrome de lise tumoral, armadilhas e
   tabela de alto × baixo risco. Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- neutropenia-febril */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "neutropenia-febril",
  titulo: "Neutropenia febril, febre e febre de origem indeterminada",
  assunto: "ass-neutropeniafebril",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "idsa-neutropenia", texto: "IDSA — Clinical practice guideline for the use of antimicrobial agents in neutropenic patients with cancer (Freifeld et al., Clin Infect Dis 2011)", lidoEm: null },
    { id: "asco-idsa-ambulatorial", texto: "ASCO/IDSA — Outpatient management of fever and neutropenia in adults treated for malignancy (Taplitz et al., J Clin Oncol 2018)", lidoEm: null },
    { id: "neutropenia-pediatria", texto: "Lehrnbecher T et al. — Guideline for the management of fever and neutropenia in pediatric patients with cancer and hematopoietic cell transplantation recipients: 2023 update (J Clin Oncol 2023)", lidoEm: null },
    { id: "sbp-febre", texto: "Sociedade Brasileira de Pediatria — Febre na criança e no adolescente (documento científico, Departamento de Pediatria Ambulatorial)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição", questoes: ["q-gdneutropenia-014","q-gdneutropenia-046","q-gdneutropenia-049","q-gdneutropenia-054"] },
  ],
  doencas: [
    {
      id: "neutropenia", titulo: "Neutropenia febril",
      introducao: `[[O neutrófilo é a primeira barreira contra bactérias e fungos. A quimioterapia mata as células que se dividem depressa, as da medula e as da mucosa: os neutrófilos caem ao mínimo (o nadir) cerca de 7 a 14 dias depois do ciclo, e a mucosite abre a porta para a flora do intestino e da boca. Febre nesse período é infecção até prova em contrário.|q-gdneutropenia-021,q-gdneutropenia-045,q-gdneutropenia-003]] [[Sem neutrófilo não há pus nem infiltrado: a infecção quase não mostra sinal local, a febre pode ser o único achado, e um Gram-negativo como a *Pseudomonas* mata em horas. O risco cresce com a profundidade da neutropenia (abaixo de 500, e sobretudo de 100/mm³), com a rapidez da queda e com a duração.|q-gdneutropenia-012,q-gdneutropenia-047,q-gdneutropenia-015]]

Veja também: **Antibioticoterapia e resistência bacteriana** (espectro dos antipseudomonas), **Micoses invasivas** (aspergilose e candidíase), **Sepse**, **Infecções relacionadas à assistência à saúde** (cateter) e **Neoplasias hematológicas** (leucemias e linfomas).`,
      fragmentos: [
        { id: "nf-definicao", titulo: "Definição, nadir e agentes", conferir: true, diretrizes: ["idsa-neutropenia"],
          figuras: [{ arquivo: "figuras/nadir.svg", legenda: "Esquema autoral: queda dos neutrófilos depois do ciclo de quimioterapia e a conduta diante da febre no nadir." }],
          questoes: ["q-gdneutropenia-012","q-gdneutropenia-047","q-gdneutropenia-021","q-gdneutropenia-045","q-gdneutropenia-015","q-gdneutropenia-003","q-gdneutropenia-043"],
          prosa: `[[Neutropenia febril é febre (uma medida de 38,3 °C ou 38 °C mantidos por 1 hora) com neutrófilos abaixo de 500/mm³, ou abaixo de 1.000 com queda esperada para menos de 500 nas 48 horas seguintes. A contagem de 885 ou 1.185 com sintoma viral não autoriza observar sem antibiótico se a queda ainda vem.|q-gdneutropenia-012,q-gdneutropenia-047,q-gdneutropenia-043]] [[Como o paciente está no nadir, não se espera o hemograma para dar o antibiótico: colhem-se culturas e começa-se logo, e só depois se decide pelo resultado.|q-gdneutropenia-003,q-gdneutropenia-021]] [[Os Gram-negativos mais isolados são *Pseudomonas aeruginosa*, *Klebsiella* e *E. coli*; os Gram-positivos (estafilococos coagulase-negativos, do cateter) são frequentes, mas menos letais.|q-gdneutropenia-015]]`,
          texto: `- Risco ligado ao **número de neutrófilos e à velocidade e duração** da queda. {q-gdneutropenia-012,q-gdneutropenia-047}
- 9º dia do ciclo: **nadir; cefepima**. {q-gdneutropenia-021}
- Neutropenia febril é **complicação da quimioterapia**. {q-gdneutropenia-045}
- Gram-negativos: ***Pseudomonas*, *Klebsiella* e *E. coli***. {q-gdneutropenia-015}
- Febre 7 dias após o ciclo: **colher sangue e iniciar antibiótico venoso** antes do resultado. {q-gdneutropenia-003}
- Febre no 12º dia do ciclo: **neutropenia febril até o hemograma afastar**. {q-gdneutropenia-043}` },
        { id: "nf-risco", titulo: "Alto e baixo risco: quem pode ir para casa", conferir: true, diretrizes: ["asco-idsa-ambulatorial"],
          questoes: ["q-gdneutropenia-017","q-gdneutropenia-007","q-gdneutropenia-006","q-gdneutropenia-008","q-gdneutropenia-010","q-gdneutropenia-026","q-gdneutropenia-030","q-gdneutropenia-035","q-gdneutropenia-002","q-gdneutropenia-013","q-gdneutropenia-039","q-gdneutropenia-061"],
          prosa: `[[O risco decide onde tratar. Alto risco: neutropenia prevista para mais de 7 dias ou abaixo de 100/mm³, leucemia aguda e transplante, linfoma de alto grau em tratamento intenso, instabilidade, mucosite que impede engolir, pneumonia, comorbidade, alteração neurológica, insuficiência renal ou hepática, idade avançada. Esses internam e recebem antibiótico venoso.|q-gdneutropenia-017,q-gdneutropenia-007,q-gdneutropenia-002,q-gdneutropenia-013,q-gdneutropenia-039]] [[Baixo risco: tumor sólido, neutropenia curta, paciente bem, sem comorbidade e com acesso rápido ao hospital (índice MASCC de 21 ou mais). Depois da primeira avaliação e das culturas, podem tratar em casa com amoxicilina-clavulanato mais ciprofloxacino por via oral, com retorno marcado.|q-gdneutropenia-006,q-gdneutropenia-008,q-gdneutropenia-010,q-gdneutropenia-026,q-gdneutropenia-030,q-gdneutropenia-035,q-gdneutropenia-061]]`,
          texto: `- Instabilidade e comorbidade: **alto risco** quando a neutropenia passa de 7 dias. {q-gdneutropenia-017}
- Linfoma de alto grau: **alto risco; hemoculturas e monoterapia**. {q-gdneutropenia-007}
- Câncer de reto, bem, exames normais: **alta com amoxicilina-clavulanato e ciprofloxacino**. {q-gdneutropenia-006}
- Mama com paclitaxel, bem: **tratamento domiciliar oral**. {q-gdneutropenia-008,q-gdneutropenia-010,q-gdneutropenia-026,q-gdneutropenia-035}
- MASCC 22, mora perto: **amoxicilina-clavulanato + ciprofloxacino**. {q-gdneutropenia-030}
- Linfoma de alto grau no 10º dia: **internar e antibiótico venoso**. {q-gdneutropenia-002}
- Leucemia linfoide crônica e DPOC: **internar**. {q-gdneutropenia-013}
- Úlcera de palato e 498 leucócitos: **internar, culturas, monoterapia de largo espectro**. {q-gdneutropenia-039}
- Neutrófilos 600, estável (a prova): **quinolona**. {q-gdneutropenia-061}` },
        { id: "nf-tratamento", titulo: "Antibiótico empírico: monoterapia antipseudomonas e quando somar vancomicina", conferir: true, diretrizes: ["idsa-neutropenia","neutropenia-pediatria"],
          questoes: ["q-gdneutropenia-001","q-gdneutropenia-011","q-gdneutropenia-023","q-gdneutropenia-025","q-gdneutropenia-031","q-gdneutropenia-032","q-gdneutropenia-034","q-gdneutropenia-036","q-gdneutropenia-037","q-gdneutropenia-038","q-gdneutropenia-041","q-gdneutropenia-042","q-gdneutropenia-053","q-gdneutropenia-055","q-gdneutropenia-059"],
          prosa: `[[O esquema inicial do alto risco é um betalactâmico antipseudomonas em monoterapia (cefepima 2 g de 8 em 8 horas, piperacilina-tazobactam ou carbapenêmico), na primeira hora, depois de hemoculturas (periférica e do cateter) e urocultura, mesmo sem foco e com o paciente estável. Ceftriaxona e macrolídeo não cobrem *Pseudomonas*; esperar o antibiograma ou procurar o foco antes de tratar perde as horas que importam.|q-gdneutropenia-031,q-gdneutropenia-032,q-gdneutropenia-053,q-gdneutropenia-055,q-gdneutropenia-059,q-gdneutropenia-011,q-gdneutropenia-034,q-gdneutropenia-036,q-gdneutropenia-042]] [[A vancomicina não entra de rotina: soma-se quando há suspeita de Gram-positivo resistente, ou seja, instabilidade hemodinâmica, infecção de cateter (hiperemia, febre com calafrio na infusão), pele e partes moles, pneumonia, colonização por MRSA ou hemocultura com Gram-positivo.|q-gdneutropenia-001,q-gdneutropenia-023,q-gdneutropenia-025,q-gdneutropenia-037,q-gdneutropenia-038,q-gdneutropenia-041]]`,
          texto: `- Hipotensão no nadir da LMA: **cefepima e vancomicina**. {q-gdneutropenia-001}
- Criança com LLA estável: **cefepima**. {q-gdneutropenia-011,q-gdneutropenia-034}
- Cateter, hipotensão e saturação baixa: **cefepima e vancomicina**. {q-gdneutropenia-023}
- Celulite no antebraço e estertores: **cefepima + vancomicina**. {q-gdneutropenia-025}
- Alto risco estável sem foco: **largo espectro imediato**. {q-gdneutropenia-031}
- 250 neutrófilos sem foco: **hemoculturas, urocultura e cefepima**. {q-gdneutropenia-032,q-gdneutropenia-059}
- Neutrófilos abaixo de 500 há 7 dias: **hemoculturas, radiografia e urina, e antibiótico empírico**. {q-gdneutropenia-036}
- Febre e calafrio com cateter: **vancomicina e cefepima; foco provável no cateter**. {q-gdneutropenia-037,q-gdneutropenia-038}
- Indicações de vancomicina: **instabilidade, cateter, pele, pneumonia, MRSA**. {q-gdneutropenia-041}
- Esquema: **cefepima 2 g 8/8 h na primeira hora**. {q-gdneutropenia-042,q-gdneutropenia-053}
- Testículo em quimioterapia, estável: **cefepima**. {q-gdneutropenia-055}` },
        { id: "nf-fungos", titulo: "Febre que persiste: fungos", conferir: true, diretrizes: ["idsa-neutropenia"],
          questoes: ["q-gdneutropenia-016","q-gdneutropenia-019","q-gdneutropenia-022","q-gdneutropenia-048"],
          prosa: `[[Se a febre persiste depois de 4 a 7 dias de antibiótico adequado numa neutropenia longa, o fungo filamentoso entra na conta. O *Aspergillus* invade os vasos do pulmão e faz nódulos com halo de vidro fosco (sangramento ao redor do infarto); o galactomanana no sangue reforça o diagnóstico. Ele escapa do fluconazol da profilaxia, e o tratamento é o voriconazol.|q-gdneutropenia-016,q-gdneutropenia-019,q-gdneutropenia-022,q-gdneutropenia-048]]`,
          texto: `- Febre após 5 dias de cefepima: **vancomicina e voriconazol**. {q-gdneutropenia-016}
- Nódulos com halo e galactomanana positiva: ***Aspergillus***. {q-gdneutropenia-019}
- Infecção fúngica mais encontrada no neutropênico (a prova): **aspergilose**. {q-gdneutropenia-022}
- Tosse e dor pleurítica com fluconazol profilático: **aspergilose invasiva**. {q-gdneutropenia-048}` },
      ],
    },
    {
      id: "febre", titulo: "Febre e hipertermia",
      introducao: `[[Na febre, pirógenos (toxinas do agente e citocinas do hospedeiro, como IL-1, IL-6 e TNF) induzem prostaglandina E2 no hipotálamo e sobem o ponto de ajuste do termostato: o corpo passa a se sentir frio e produz calor (tremor, piloereção, vasoconstrição) até chegar ao novo valor. O antitérmico bloqueia a síntese de prostaglandina e devolve o ponto de ajuste ao normal.|q-gdneutropenia-020,q-gdneutropenia-009]] [[Na hipertermia o termostato está normal: o corpo é que ganha mais calor do que consegue perder (sol, calor, esforço, droga). Por isso o antitérmico não funciona e o tratamento é resfriar.|q-gdneutropenia-050,q-gdneutropenia-051,q-gdneutropenia-062,q-gdneutropenia-063]]`,
      fragmentos: [
        { id: "feb-conceitos", titulo: "Febre, hipertermia e quem não faz febre", conferir: true,
          questoes: ["q-gdneutropenia-020","q-gdneutropenia-009","q-gdneutropenia-005","q-gdneutropenia-040","q-gdneutropenia-073","q-gdneutropenia-050","q-gdneutropenia-051","q-gdneutropenia-062","q-gdneutropenia-063","q-gdneutropenia-066","q-gdneutropenia-064"],
          prosa: `[[Na criança, febre é temperatura axilar acima de 37,8 °C.|q-gdneutropenia-005]] [[Idosos, imunodeprimidos e desnutridos produzem pouca citocina e podem não fazer febre mesmo com bacteremia; no idoso, a confusão mental costuma ser o primeiro sinal.|q-gdneutropenia-040,q-gdneutropenia-073]] [[A criança que ficou horas perto da brasa, com 39 °C e nada mais, tem hipertermia, e o que resolve é banho com água fria. A hipertermia maligna é doença hereditária do músculo, disparada por anestésico inalatório ou succinilcolina.|q-gdneutropenia-062,q-gdneutropenia-063,q-gdneutropenia-066]] [[Temperatura de 37,2 °C sem outro achado não é febre: orientação e sintomático, sem exames.|q-gdneutropenia-064]]`,
          texto: `- Pirógeno **sobe o ponto de ajuste**; antitérmico **o devolve ao normal**. {q-gdneutropenia-020}
- Antitérmico **não previne** convulsão febril. {q-gdneutropenia-009}
- Febre na criança: axilar acima de **37,8 °C**. {q-gdneutropenia-005}
- Idoso e imunodeprimido podem **não ter febre**. {q-gdneutropenia-040}
- Falso no idoso: **febre sempre presente**. {q-gdneutropenia-073}
- Hipertermia: **aumento descontrolado com termostato normal**. {q-gdneutropenia-050,q-gdneutropenia-051}
- Criança perto da churrasqueira: **hipertermia; banho frio**. {q-gdneutropenia-062,q-gdneutropenia-063}
- Hipertermia maligna: **doença hereditária**. {q-gdneutropenia-066}
- 37,2 °C sem achados: **paracetamol e orientações**. {q-gdneutropenia-064}` },
        { id: "feb-tratamento", titulo: "Antitérmicos na criança", conferir: true, diretrizes: ["sbp-febre"],
          questoes: ["q-gdneutropenia-024","q-gdneutropenia-033","q-gdneutropenia-057","q-gdneutropenia-044","q-gdneutropenia-027"],
          prosa: `[[A febre em si não faz mal na maioria das crianças, e a maior parte vem de infecção viral; o antitérmico serve ao conforto, não ao número. Não se alternam dois antitérmicos, e banho e compressa não baixam o ponto de ajuste (só causam tremor e desconforto).|q-gdneutropenia-024,q-gdneutropenia-033,q-gdneutropenia-057,q-gdneutropenia-027]] [[Cada antitérmico tem seu risco: ácido acetilsalicílico, síndrome de Reye na virose; dipirona, agranulocitose e aplasia; paracetamol em dose alta, necrose hepática; ibuprofeno, retenção de sódio e água e lesão renal.|q-gdneutropenia-044]]`,
          texto: `- Compressas e banhos **não** devem ser feitos na febre. {q-gdneutropenia-024}
- Antitérmico para **desconforto**. {q-gdneutropenia-033}
- **Não** intercalar dois antitérmicos. {q-gdneutropenia-057}
- AAS → Reye; dipirona → aplasia; paracetamol → necrose hepática; ibuprofeno → retenção hidrossalina. {q-gdneutropenia-044}
- Causa mais comum: **infecção**; a infecção bacteriana grave inclui bacteremia oculta e meningite. {q-gdneutropenia-027}` },
      ],
    },
    {
      id: "foi", titulo: "Febre de origem indeterminada",
      introducao: `[[Febre de origem indeterminada não é febre sem foco de poucos dias: é febre documentada que dura semanas e resiste a uma investigação completa. Quanto mais tempo a febre dura sem diagnóstico, menor a chance de ser infecção comum e maior a de doença inflamatória ou neoplasia; ainda assim, infecção (tuberculose extrapulmonar à frente), neoplasia (linfoma) e doença inflamatória (doença de Still, arterites) são os três grandes grupos, e as drogas entram sempre na lista.|q-gdneutropenia-060,q-gdneutropenia-067,q-gdneutropenia-028]]`,
      fragmentos: [
        { id: "foi-adulto", titulo: "No adulto", conferir: true,
          questoes: ["q-gdneutropenia-018","q-gdneutropenia-052","q-gdneutropenia-058","q-gdneutropenia-060","q-gdneutropenia-065","q-gdneutropenia-067","q-gdneutropenia-068","q-gdneutropenia-070","q-gdneutropenia-071","q-gdneutropenia-072","q-gdneutropenia-074","q-gdneutropenia-075"],
          prosa: `[[A definição clássica (Petersdorf) é temperatura acima de 38,3 °C em várias medidas, por mais de 3 semanas, sem diagnóstico após uma semana de investigação; versões mais novas trocam a semana de internação por 3 dias de hospital ou 3 consultas. Leucograma normal não faz parte.|q-gdneutropenia-065,q-gdneutropenia-068,q-gdneutropenia-070,q-gdneutropenia-074,q-gdneutropenia-075,q-gdneutropenia-052]] [[A investigação começa simples (radiografia de tórax e ultrassonografia de abdome). A tuberculose é a infecção mais comum na febre de origem indeterminada, quase sempre fora do pulmão; o PPD pode ser negativo na miliar, na AIDS, na sarcoidose, no linfoma e na desnutrição, porque a imunidade celular está deprimida.|q-gdneutropenia-018,q-gdneutropenia-067,q-gdneutropenia-052]] [[A cirrose pode dar febre (endotoxemia), e a febre por droga vem de betalactâmicos, sulfas, fenitoína e quinidina, não de IECA. Entre 10 e 30% ficam sem diagnóstico, e esses costumam evoluir bem, com a febre sumindo em semanas ou meses.|q-gdneutropenia-058,q-gdneutropenia-072,q-gdneutropenia-060,q-gdneutropenia-071]]`,
          texto: `- Imagem inicial: **radiografia de tórax e ultrassonografia de abdome**. {q-gdneutropenia-018}
- PPD pode ser **negativo** na miliar, sarcoidose, Hodgkin, desnutrição e AIDS. {q-gdneutropenia-052}
- **Cirrose** é causa de febre de origem obscura. {q-gdneutropenia-058}
- Febre longa: **menos infecção**; 10 a 30% sem diagnóstico. {q-gdneutropenia-060}
- Definição clássica: 3 semanas, após **uma semana de investigação**. {q-gdneutropenia-065}
- Infecção mais comum: **tuberculose**. {q-gdneutropenia-067}
- Adulto: **mais de 3 semanas e acima de 38,3 °C**. {q-gdneutropenia-068,q-gdneutropenia-070,q-gdneutropenia-074}
- Sem diagnóstico após investigação completa: **prognóstico bom**. {q-gdneutropenia-071}
- Não é causa comum de febre por droga: **IECA**. {q-gdneutropenia-072}
- Não é critério: **leucograma normal**. {q-gdneutropenia-075}` },
        { id: "foi-crianca", titulo: "Na criança", conferir: true,
          questoes: ["q-gdneutropenia-004","q-gdneutropenia-028","q-gdneutropenia-029","q-gdneutropenia-056","q-gdneutropenia-069"],
          prosa: `[[Na criança a febre de origem indeterminada é febre acima de 38 °C por 8 a 14 dias sem causa após história, exame e exames iniciais, não 48 horas. As causas são as mesmas três famílias (infecção, doença do tecido conjuntivo, neoplasia), com infecções comuns de apresentação atípica à frente; quanto mais longa, maior a chance de causa não infecciosa. Os achados físicos costumam ser poucos, e por isso o exame se repete.|q-gdneutropenia-029,q-gdneutropenia-056,q-gdneutropenia-069,q-gdneutropenia-028]] [[As febres periódicas hereditárias (febre familiar do Mediterrâneo, hiper-IgD) são em geral autossômicas recessivas; a afirmação que as chama de dominantes é a errada.|q-gdneutropenia-004]]`,
          texto: `- Errada: febres periódicas **todas autossômicas dominantes**. {q-gdneutropenia-004}
- Mais tempo de febre, **mais chance de causa não infecciosa**. {q-gdneutropenia-028}
- Falso: achados físicos **exuberantes**. {q-gdneutropenia-029}
- Falso: **48 horas** bastam. {q-gdneutropenia-056}
- Criança: **14 dias** (a prova). {q-gdneutropenia-069}` },
      ],
    },
    {
      id: "lise", titulo: "Síndrome de lise tumoral",
      introducao: `[[Quando um tumor de crescimento rápido e muito sensível (leucemia aguda, linfoma de Burkitt) é destruído pela quimioterapia, as células mortas despejam no sangue o que tinham dentro: potássio, fosfato e ácidos nucleicos, que viram ácido úrico. O fosfato precipita com o cálcio (hipocalcemia), e ácido úrico e fosfato de cálcio cristalizam no túbulo renal.|q-sirio2021-009,q-sirio2022-057]]`,
      fragmentos: [
        { id: "lise-quadro", titulo: "Alterações e tratamento", conferir: true,
          questoes: ["q-sirio2021-009","q-sirio2022-057"],
          prosa: `[[O laboratório mostra hiperuricemia, hipercalemia, hiperfosfatemia e hipocalcemia. A prevenção e o tratamento são hidratação venosa vigorosa (para lavar o túbulo) e redução do ácido úrico: alopurinol, que impede a formação, ou rasburicase, que o destrói, nos casos de maior risco.|q-sirio2021-009,q-sirio2022-057]]`,
          texto: `- **Hiperuricemia, hipercalemia, hiperfosfatemia e hipocalcemia**; hidratação e alopurinol. {q-sirio2021-009}
- Alterações comuns: **ácido úrico, potássio e fosfato altos**. {q-sirio2022-057}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["asco-idsa-ambulatorial"],
          questoes: ["q-gdneutropenia-061","q-gdneutropenia-065","q-gdneutropenia-052","q-gdneutropenia-069","q-gdneutropenia-068","q-gdneutropenia-005","q-gdneutropenia-022"],
          prosa: `[[**Baixo risco**: a regra é amoxicilina-clavulanato com ciprofloxacino, depois de culturas e avaliação; a prova (061) marcou "quinolona" isolada para um paciente com 600 neutrófilos, antes de reencaminhar ao oncologista.|q-gdneutropenia-061]] [[**Definição de febre de origem indeterminada**: a clássica pede uma semana de investigação; a revisada aceita 3 dias de internação ou 3 consultas. A 065 cobrou a semana; o enunciado da 052 usou a revisada. Na criança, os livros variam entre 8 e 14 dias; a 069 cobrou 14, e a 068 os 38,3 °C e 3 semanas do adulto.|q-gdneutropenia-065,q-gdneutropenia-052,q-gdneutropenia-069,q-gdneutropenia-068]] [[**Ponto de corte da febre na criança**: varia entre 37,5 e 37,8 °C axilar conforme a fonte; a 005 cobrou 37,8 °C.|q-gdneutropenia-005]] [[**Fungo no neutropênico**: a *Candida* é a causa mais comum de fungemia (fungo no sangue), e o *Aspergillus* a infecção fúngica invasiva mais temida da neutropenia prolongada; a 022 perguntou "fungemia" e deu aspergilose.|q-gdneutropenia-022]]`,
          texto: `- Regra: amoxicilina-clavulanato + ciprofloxacino; a prova deu **quinolona** isolada. {q-gdneutropenia-061}
- Clássica: **uma semana** de investigação; revisada: 3 dias ou 3 consultas. {q-gdneutropenia-065,q-gdneutropenia-052}
- Criança: **14 dias** na prova; adulto: 3 semanas e 38,3 °C. {q-gdneutropenia-069,q-gdneutropenia-068}
- Febre na criança: a prova usou **37,8 °C**. {q-gdneutropenia-005}
- "Fungemia" no neutropênico: a prova deu **aspergilose**; no sangue, a mais comum é *Candida*. {q-gdneutropenia-022}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: alto × baixo risco",
      introducao: `Resumo do capítulo de neutropenia febril, para decidir onde e com o que tratar.`,
      fragmentos: [
        { id: "cmp-risco", titulo: "Onde tratar e com o quê", conferir: true,
          questoes: ["q-gdneutropenia-017","q-gdneutropenia-007","q-gdneutropenia-030","q-gdneutropenia-001","q-gdneutropenia-053"],
          prosa: `[[A conduta segue o risco e a estabilidade.|q-gdneutropenia-017,q-gdneutropenia-007,q-gdneutropenia-030,q-gdneutropenia-001,q-gdneutropenia-053]]

| | Baixo risco | Alto risco estável | Alto risco instável ou com foco de Gram-positivo |
| Quem | tumor sólido, neutropenia curta, bem, MASCC ≥ 21, mora perto | leucemia aguda, linfoma em tratamento intenso, neutropenia longa, comorbidade | hipotensão, cateter infectado, pele, pneumonia, MRSA |
| Onde | casa, com retorno | internação | internação ou UTI |
| Antibiótico | amoxicilina-clavulanato + ciprofloxacino oral | cefepima (ou piperacilina-tazobactam, carbapenêmico) | betalactâmico antipseudomonas + vancomicina |
| Se a febre persiste | reavaliar e internar | pensar em fungo: voriconazol | pensar em fungo: voriconazol |`,
          texto: `- Instabilidade e comorbidade: **alto risco**. {q-gdneutropenia-017,q-gdneutropenia-007}
- MASCC ≥ 21: **oral em casa**. {q-gdneutropenia-030}
- Hipotensão: **somar vancomicina**. {q-gdneutropenia-001}
- Estável sem foco: **cefepima isolada**. {q-gdneutropenia-053}` },
      ],
    },
  ],
});
