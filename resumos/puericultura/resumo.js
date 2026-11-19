/* resumos/puericultura/resumo.js — resumo adaptativo de Puericultura.
   Formato e condições: resumos/LEIA-ME.md. Conferência: npm run resumo -- puericultura */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "puericultura",
  titulo: "Puericultura",
  assunto: "ass-puericultura",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "ms-caderneta", texto: "Ministério da Saúde — Caderneta da Criança (edição vigente) e Caderno de Atenção Básica nº 33 (Saúde da criança: crescimento e desenvolvimento)", lidoEm: null },
    { id: "ms-guia-alimentar", texto: "Ministério da Saúde — Guia Alimentar para Crianças Brasileiras Menores de 2 Anos (2019)", lidoEm: null },
    { id: "sbp-ferro", texto: "Sociedade Brasileira de Pediatria — Diretriz nº 32: deficiência de ferro e anemia ferropriva, atualização 2026 (sbp.com.br)", lidoEm: "2026-11-18" },
    { id: "sbp-alimentacao", texto: "Sociedade Brasileira de Pediatria — Manual de Alimentação (2024)", lidoEm: null },
    { id: "oms-crescimento", texto: "OMS — Padrões de crescimento infantil (2006/2007)", lidoEm: null },
    { id: "calendario-vacinal", texto: "Ministério da Saúde — Calendário Nacional de Vacinação (PNI)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Desatualizadas pela SBP 2026 (dose de profilaxia do lactente a termo), sem reposição", questoes: ["q-tp20202-044","q-tp20212-053","q-unesp2025-005"] },
  ],
  doencas: [
    {
      id: "consulta", titulo: "A consulta de puericultura e a prevenção",
      introducao: `Puericultura é o acompanhamento da criança saudável. O objetivo não é tratar doença, mas **vigiar o crescimento e o desenvolvimento**, apoiar a alimentação, completar as vacinas e prevenir agravos. A lógica é a da janela de oportunidade: os **primeiros mil dias** (da concepção aos 2 anos) são o período em que o cérebro e o corpo crescem mais rápido e em que nutrição, afeto e estímulo deixam marcas que duram a vida toda. [[Intervir bem nesse período melhora a estatura final e reduz obesidade, hipertensão e diabetes tipo 2 na vida adulta.|q-fmabc2023-050]]

A frequência das consultas acompanha a velocidade das mudanças. [[No primeiro ano, o Ministério da Saúde recomenda consultas na **primeira semana**, com **1, 2, 4, 6, 9 e 12 meses**; depois, aos 18 e 24 meses e então uma vez por ano.|q-scmsp2023-094,q-tp20222-042,q-fmabc2026-054]] [[A primeira semana tem atenção especial: é quando a amamentação se estabelece e quando aparecem icterícia, perda de peso excessiva e dificuldades da mãe, por isso a equipe da Saúde da Família faz **visita domiciliar** nesses dias.|q-uspsp1-111,q-scmsp2026-093]]

O perfil de risco muda com a idade. [[Depois do primeiro ano, as **causas externas** (acidentes e violência) passam a ser a principal causa de morte de crianças no Brasil.|q-sirio2021-042,q-amrigs2023-070]] A criança pequena explora o mundo antes de entender o perigo, e por isso cada fase do desenvolvimento tem o seu acidente típico: queda no lactente que rola, aspiração e intoxicação no que engatinha e leva tudo à boca, afogamento e atropelamento na criança que anda.

Veja também: **Anemias** (anemia ferropriva na criança, completa lá), **Crescimento e puberdade** (baixa estatura e puberdade), **Hipertensão arterial** (pressão na criança, completa lá) e **Calendário vacinal**.`,
      fragmentos: [
        { id: "con-agenda", diretrizes: ["ms-caderneta"], titulo: "Calendário de consultas e primeira semana", conferir: true,
          questoes: ["q-scmsp2023-094","q-uspsp1-111","q-scmsp2026-093","q-unesp2021-004","q-tp20222-042","q-fmabc2026-054","q-fmabc2023-050"],
          texto: `- Consultas no 1º ano: **1ª semana, 1, 2, 4, 6, 9 e 12 meses**. Depois, 18 e 24 meses e então **anuais**. {q-scmsp2023-094,q-tp20222-042,q-fmabc2026-054}
- **Visita domiciliar na 1ª semana** de vida: binômio mãe-bebê e amamentação exclusiva. {q-uspsp1-111,q-scmsp2026-093}
- Sinais de alerta do recém-nascido para procurar atendimento: **fralda seca por mais de 12 horas**, febre ou hipotermia, recusa alimentar, icterícia que avança, letargia, desconforto respiratório. {q-unesp2021-004}
- Primeiros mil dias: melhor **estatura final** e menos **obesidade, hipertensão e diabetes** no adulto. {q-fmabc2023-050}` },
        { id: "con-acidentes", titulo: "Acidentes, sono seguro e morte súbita", conferir: true,
          prosa: `[[A síndrome da morte súbita do lactente (SMSL) é a morte inexplicada, durante o sono, de um lactente aparentemente saudável, com pico entre 2 e 4 meses.|q-scmsp2023-042,q-famema2023-088]] O modelo aceito é o do "triplo risco": um lactente vulnerável (prematuridade, exposição ao tabaco) numa fase crítica do controle autonômico, diante de um estressor externo (dormir de bruços, rosto coberto, superaquecimento). [[Na posição prona e em superfícies macias, o lactente reinala o próprio ar expirado e não desperta adequadamente com a hipercapnia; por isso a **posição supina** é a medida que mais reduziu a SMSL.|q-amrigs2021-062,q-famema2023-088]] [[O tabagismo materno e a cama compartilhada com adultos que fumam, bebem ou usam sedativos aumentam muito o risco.|q-scmsp2023-042]]`,
          questoes: ["q-scmsp2023-042","q-famema2023-088","q-amrigs2021-062","q-uspsp2-068","q-adap21-044","q-amrigs2022-069","q-sirio2021-042","q-amrigs2023-070"],
          texto: `- Dormir **de barriga para cima**, em **berço próprio**, no **quarto dos pais**, superfície firme, sem travesseiros, protetores ou bichos de pelúcia. {q-famema2023-088,q-amrigs2021-062}
- **Fatores de risco** de SMSL: prona, tabagismo (inclusive passivo), **cama compartilhada com tabagista**, superaquecimento, prematuridade. A amamentação **protege**. {q-scmsp2023-042}
- **Causas externas** são a principal causa de morte a partir de 1 ano. Os acidentes mudam com a fase do desenvolvimento. {q-sirio2021-042,q-amrigs2023-070}
- Queda é o acidente do lactente: **nunca deixá-lo sozinho em superfície elevada** (trocador, cama, sofá). {q-uspsp2-068}
- **Andador é desaconselhado**: não acelera a marcha, pode atrasar o desenvolvimento motor e causa quedas. {q-adap21-044,q-amrigs2022-069}` },
        { id: "con-triagens", diretrizes: ["ms-caderneta"], titulo: "Triagens: olhos, pressão arterial e sinais vitais", conferir: true,
          prosa: `A visão se desenvolve com o uso: o córtex visual só amadurece se receber imagens nítidas e iguais dos dois olhos. [[Por isso uma catarata, um estrabismo constante ou uma diferença grande de grau, se não forem corrigidos cedo, levam à **ambliopia**, a perda de visão de um olho que não se recupera depois do período de plasticidade (até cerca de 6 a 7 anos).|q-unicampdis2025-097,q-unicamp2022-034]] [[Nos primeiros meses, o desvio ocular **intermitente** é comum e se deve à imaturidade da fixação binocular.|q-usp2025-053]] Na pressão arterial, a regra é parecida: [[a medida de rotina começa aos **3 anos**; antes disso só se mede quando há fator de risco, como prematuridade, internação em UTI neonatal, cardiopatia ou doença renal.|q-unesp2025-011]]`,
          questoes: ["q-unicamp2022-034","q-unicampdis2025-097","q-usp2025-053","q-unesp2025-011","q-sirio2023-047","q-usp2023-095","q-amrigs2021-067","q-amrigs2022-075"],
          texto: `- **Teste do reflexo vermelho**: antes da alta da maternidade e **2 a 3 vezes por ano até os 3 anos**. {q-unicamp2022-034}
- Acuidade visual alterada: tratar a ambliopia antes de cerca de **6 a 7 anos**, enquanto há plasticidade. {q-unicampdis2025-097}
- **Estrabismo intermitente no recém-nascido** é fisiológico: observar. O constante ou que persiste após 4 a 6 meses deve ser avaliado. {q-usp2025-053}
- PA: **anual a partir dos 3 anos**. Antes, só com fator de risco. RN GIG sem outro risco não precisa. {q-unesp2025-011}
- Classificação: **≥ p90** (ou ≥ 120/80) elevada, **≥ p95** estágio 1, **≥ p95 + 12 mmHg** estágio 2, sempre em 3 ocasiões. {q-sirio2023-047,q-usp2023-095}
- FC e FR são **inversamente proporcionais** à idade. {q-amrigs2021-067}
- O ambiente (moradia, saneamento, poluição, vínculo) interfere no crescimento: é o que estuda a ecopediatria. {q-amrigs2022-075}` },
        { id: "con-habitos", titulo: "Sono, telas, dentes e controle esfincteriano", conferir: true,
          questoes: ["q-usprp2024-073","q-fmabc2025-052","q-usprp2021-044","q-fmabc2024-044","q-udisc20262-060","q-unifesp2024-093"],
          prosa: `Os hábitos da primeira infância moldam o sono, os dentes e o comportamento: tela à noite atrasa a melatonina e encurta o sono; flúor desde o primeiro dente previne cárie; e o controle dos esfíncteres depende da maturação, por isso a enurese só é diagnóstico a partir dos 5 anos.`,
          texto: `- Escolar precisa de **9 a 12 horas de sono**. Sonolência na escola com 8 h de sono: antecipar a hora de dormir. {q-usprp2024-073}
- A luz azul das telas atrasa a melatonina: **desligar telas 1 a 2 horas antes de dormir**. {q-fmabc2025-052}
- Telas: **evitar antes dos 2 anos**; de 2 a 5 anos, até 1 hora por dia, com um adulto junto. {q-unifesp2024-093}
- Dentes: **escovar com creme dental fluoretado desde o 1º dente**, 2 vezes por dia, com quantidade de um **grão de arroz** até 3 anos. {q-usprp2021-044,q-fmabc2024-044}
- **Enurese noturna primária** tem forte **componente familiar**. Só é diagnóstico a partir dos 5 anos. {q-udisc20262-060}` },
        { id: "con-vacina", diretrizes: ["calendario-vacinal"], titulo: "Vacina atrasada", conferir: true,
          questoes: ["q-adap23-067"],
          prosa: `A memória imune das doses já dadas não se perde com o atraso: por isso o esquema continua de onde parou, sem recomeçar.`,
          texto: `- Esquema atrasado **não se reinicia**: aplica-se hoje a dose devida e respeita-se o **intervalo mínimo** (em geral 30 dias) e a **idade máxima** de cada vacina. {q-adap23-067}` },
      ],
    },
    {
      id: "crescimento", titulo: "Crescimento",
      introducao: `Crescer é o sinal de saúde mais sensível da criança. Quase toda doença crônica, carência ou problema de vínculo aparece primeiro como uma curva que **muda de canal**. Por isso, mais do que um ponto isolado no gráfico, interessa a **tendência**: a criança que sempre esteve no escore z −1,5 e segue nele cresce bem; a que estava em +1 e caiu para −1 tem um problema, mesmo estando "dentro do normal". [[A **desaceleração do crescimento** pede investigar alimentação e dinâmica familiar e um retorno breve.|q-uspsp4-080]]

**A velocidade muda com a idade.** O primeiro ano é o de crescimento mais rápido fora do útero. [[O recém-nascido a termo perde até **10% do peso** nos primeiros dias, porque elimina o excesso de água extracelular e ainda mama pouco, e recupera o peso de nascimento até **10 a 15 dias**.|q-famerp2024-053]] Depois ganha **20 a 30 g por dia** no primeiro trimestre. [[Em média, **dobra o peso** de nascimento por volta dos 4 a 5 meses e o **triplica** com 1 ano; o comprimento aumenta cerca de **25 cm** no primeiro ano (50 → 75 cm).|q-famerp2023-025,q-fmabc2026-054]]

O perímetro cefálico mede, na prática, o crescimento do cérebro. [[Ele aumenta cerca de **2 cm/mês no primeiro trimestre**, **1 cm/mês no segundo** e **0,5 cm/mês no segundo semestre**, cerca de 12 cm no primeiro ano.|q-amrigs2022-078,q-famerp2025-062,q-sessp2025-051]] Por isso o PC que cresce rápido demais ou de menos é um sinal neurológico. O mesmo vale para a estatura: o crescimento depende de genética, nutrição, hormônios e afeto. [[A criança que nasceu pequena por **restrição de crescimento intrauterino** pode continuar abaixo do esperado.|q-tp20231-035]]`,
      fragmentos: [
        { id: "cre-pc", titulo: "Perímetro cefálico e fontanela", conferir: true,
          prosa: `[[Um PC que **cruza canais para cima** sugere hidrocefalia, sobretudo com sinais como o "olhar do sol poente" e fontanela tensa: pede imagem do crânio (ultrassom transfontanelar enquanto a fontanela está aberta) e avaliação neurocirúrgica.|q-adap22-071]] Já [[a criança que **sempre esteve no mesmo canal alto**, com desenvolvimento normal, costuma ter apenas uma macrocefalia familiar benigna.|q-scmsp2026-060]] No outro extremo, [[a fontanela que **fecha cedo**, com PC caindo, sugere **craniossinostose**, que se trata com cirurgia para o crânio não limitar o cérebro.|q-einstein2024-035]]`,
          questoes: ["q-adap22-071","q-scmsp2026-060","q-einstein2024-035","q-amrigs2022-078","q-famerp2025-062","q-sessp2025-051"],
          texto: `- PC: **2 cm/mês** (1º trimestre), **1 cm/mês** (2º trimestre), **0,5 cm/mês** (2º semestre), cerca de **12 cm** no 1º ano. {q-amrigs2022-078,q-famerp2025-062,q-sessp2025-051}
- PC que **acelera e cruza canais**: imagem (US transfontanelar) e neurocirurgia. {q-adap22-071}
- PC alto e **estável no canal**, com desenvolvimento normal: variante normal, seguir. {q-scmsp2026-060}
- **Fontanela fechada precocemente** com PC baixo: **craniossinostose**, cirurgia. {q-einstein2024-035}` },
        { id: "cre-ganho", casos: ["q-uspsp4-080"], titulo: "Peso e estatura: o esperado e o que preocupa", conferir: true,
          questoes: ["q-famerp2023-025","q-fmabc2026-054","q-tp20231-035","q-uspsp4-080","q-adap23-058","q-iamspe2026-077","q-famerp2024-053"],
          texto: `- Perda fisiológica até **10%**, recuperada até **10 a 15 dias**. {q-famerp2024-053}
- Com 1 ano: peso cerca de **3 vezes** o de nascimento e comprimento de cerca de **75 cm**. {q-famerp2023-025,q-fmabc2026-054}
- **RCIU** pode manter peso e estatura abaixo do esperado. {q-tp20231-035}
- **Mudança de canal para baixo** é desaceleração: investigar alimentação e família, retorno breve. {q-uspsp4-080}
- **Baixa estatura familiar**: estatura baixa compatível com os pais e **velocidade de crescimento normal**. Só acompanhar, sem exames. {q-adap23-058}
- Na transição deitado → em pé (cerca de 2 anos), medir das **duas formas**, descontar cerca de **0,7 cm** e comparar a velocidade sempre pelo mesmo método. {q-iamspe2026-077}` },
        { id: "cre-zscore", diretrizes: ["oms-crescimento"], figuras: [{ arquivo: "figuras/imc-escore-z.svg", legenda: "Esquema autoral: faixas de escore z do IMC para a idade (OMS, 0 a 5 anos)." }], casos: ["q-amrigs2022-070","q-scmsp2021-041"], titulo: "Classificação nutricional pelo escore z (OMS)", conferir: true,
          prosa: `[[A Caderneta usa os padrões da OMS. Cada índice responde a uma pergunta diferente: a **estatura para a idade** mostra a história nutricional (a desnutrição crônica achata a curva de estatura); o **peso para a estatura** e o **IMC para a idade** mostram o estado atual e são os que diagnosticam sobrepeso e obesidade.|q-sessp2026-041,q-simepm89-073]] Por isso o peso para a idade isolado engana: uma criança alta pode ter peso "alto" sem excesso de gordura. [[Uma criança pode ter estatura muito alta e IMC baixo ao mesmo tempo: é magreza com estatura adequada.|q-unifesp2023-061]]`,
          questoes: ["q-adap22-073","q-unifesp2022-073","q-unifesp2023-061","q-scmsp2021-041","q-amrigs2022-070","q-amrigs2024-073","q-famema2023-087","q-sessp2022-055","q-sessp2025-055","q-sessp2026-041","q-tp20202-045","q-tp20232-111","q-famerp2023-024","q-fmabc2022-041","q-simepm89-073","q-usp2026-059","q-usp2023-095","q-unicampdis2022-035","q-fmabc2021-088"],
          texto: `- **IMC/idade de 0 a 5 anos**: < −3 magreza acentuada; −3 a −2 magreza; −2 a +1 eutrofia; **+1 a +2 risco de sobrepeso**; **+2 a +3 sobrepeso**; **> +3 obesidade**. {q-unifesp2022-073,q-scmsp2021-041,q-amrigs2022-070,q-amrigs2024-073,q-sessp2022-055,q-sessp2025-055,q-tp20202-045,q-tp20232-111,q-famerp2023-024,q-unicampdis2022-035,q-fmabc2021-088}
- **IMC/idade de 5 a 19 anos**: +1 a +2 **sobrepeso**; **+2 a +3 obesidade**; > +3 obesidade grave. A faixa muda aos 5 anos. {q-adap22-073,q-usp2023-095,q-usp2026-059}
- **Peso/idade**: **−2 a +2 adequado**; −3 a −2 baixo; < −3 muito baixo; > +2 elevado. {q-fmabc2022-041}
- **Estatura/idade**: ≥ −2 adequada; −3 a −2 baixa; < −3 muito baixa. É o índice que mostra o **déficit crônico**. {q-sessp2026-041,q-famema2023-087}
- IMC baixo com estatura alta: **magreza com estatura adequada**. {q-unifesp2023-061}
- O **IMC para a idade** é o gráfico para avaliar sobrepeso e obesidade. {q-simepm89-073}` },
        { id: "cre-obesidade", casos: ["q-fmabc2021-089"], titulo: "Obesidade infantil", conferir: true,
          prosa: `A obesidade infantil cresce junto com o consumo de ultraprocessados e o sedentarismo. O excesso de gordura visceral libera ácidos graxos e citocinas que geram **resistência à insulina**. [[A pele mostra isso como **acantose nigricans** (manchas escuras e aveludadas em pescoço e axilas), e o fígado como **esteatose**, a complicação mais comum.|q-tp20232-041]] [[A obesidade que começa **no primeiro ano** de vida é um alerta para causas genéticas ou endócrinas e pede investigação.|q-fmabc2021-089]]`,
          questoes: ["q-sessp2023-040","q-tp20232-041","q-tp20222-046","q-fmabc2021-089","q-fmabc2021-088"],
          texto: `- **Circunferência abdominal/estatura ≤ 0,5** é adequada. Acima indica gordura visceral. {q-sessp2023-040}
- Acantose nigricans = resistência à insulina; complicação hepática = **esteatose**. {q-tp20232-041}
- Conduta: reduzir **ultraprocessados**, mais alimentos in natura, atividade física e rastrear **lipídeos, glicemia, transaminases**. {q-tp20222-046}
- Obesidade **iniciada no 1º ano**: investigar etiologia. {q-fmabc2021-089}` },
      ],
    },
    {
      id: "desenvolvimento", titulo: "Desenvolvimento neuropsicomotor",
      introducao: `O desenvolvimento segue a maturação do sistema nervoso, que se mieliniza **da cabeça para os pés** (céfalo-caudal) e **do centro para a periferia** (próximo-distal). Por isso a criança primeiro sustenta a cabeça, depois senta e só então anda, e primeiro usa o braço inteiro antes de fazer a pinça com os dedos. Os reflexos primitivos (Moro, preensão) somem à medida que o córtex assume o controle, e a persistência deles além do tempo esperado também é um sinal de alerta.

Os marcos se avaliam em quatro áreas: **motor grosso, motor fino, linguagem e pessoal-social**. Existe uma faixa de idade normal para cada marco, e é por isso que a Caderneta trabalha com faixas e não com datas exatas. [[No prematuro, usa-se a **idade corrigida** (descontando as semanas que faltaram para 40) até os 2 anos: o cérebro amadurece pela idade pós-concepção.|q-usp2022-042,q-unifesp2024-093]]

O desenvolvimento depende também de estímulo e vínculo. [[Conversar com o bebê, inclusive no "manhês" (a fala infantilizada, mais aguda e lenta), é adequado: atrai a atenção, ensina o ritmo da língua e mostra vínculo.|q-usp2022-046]] A linguagem é a área mais sensível ao ambiente e à audição: [[toda criança com atraso de fala deve fazer **avaliação auditiva**, porque a perda auditiva, inclusive a condutiva das otites de repetição, é causa tratável.|q-unifesp2023-058,q-tp20261-057,q-einstein2024-034,q-adap24-094]]`,
      fragmentos: [
        { id: "des-marcos", titulo: "Marcos do primeiro ano", conferir: true,
          questoes: ["q-usprp2024-066","q-iamspe2025-071","q-amrigs2023-075","q-amrigs2024-067","q-famema2021-087","q-sessp2022-056","q-sessp2025-050","q-usprp2023-010","q-einstein2023-037","q-famerp2023-036","q-famerp2024-063","q-usp2022-042"],
          texto: `- **2 meses**: sorriso social, segue objetos com o olhar, vocaliza. {q-iamspe2025-071}
- **4 meses**: sustenta a cabeça, **pega o objeto colocado na mão**, leva à boca, localiza o som; busca ativa de objetos entre 4 e 6 meses. {q-usprp2024-066,q-amrigs2024-067,q-amrigs2023-075}
- **6 a 9 meses**: **senta sem apoio**, **transfere objetos** de uma mão para a outra, duplica sílabas, olha quando chamado pelo nome. Não sentar aos 8 meses ainda está na faixa: seguir. {q-famema2021-087,q-sessp2025-050,q-usprp2023-010,q-famerp2024-063}
- **9 a 12 meses**: **pinça polegar-indicador** (a partir de cerca de 8 a 9 meses), engatinha, **anda com apoio**, **imita gestos**, dá tchau. {q-sessp2022-056,q-einstein2023-037,q-famerp2023-036}
- Prematuro: avaliar pela **idade corrigida** até 2 anos. {q-usp2022-042}` },
        { id: "des-depois", titulo: "Do segundo ano à idade pré-escolar", conferir: true,
          questoes: ["q-unifesp2022-071","q-sirio2026-041","q-famema2022-085","q-fmabc2024-043","q-unifesp2024-093","q-usprp2024-006"],
          texto: `- **12 a 18 meses**: anda sem apoio, primeiras palavras, aponta, come com as mãos. {q-unifesp2022-071,q-sirio2026-041}
- **2 anos**: corre, **frases de 2 palavras**, cerca de 50 palavras. Com 19 meses e só poucas palavras, é **atraso de fala**. {q-usprp2024-006}
- **30 meses**: **egocentrismo** com interesse em compartilhar; brinca ao lado de outras crianças. {q-famema2022-085}
- **4 anos**: brincadeira de faz de conta, conta histórias, pula num pé só. {q-fmabc2024-043}
- Desenvolvimento normal: estimular **brincar, ler, cantar, natureza**; sem celular. {q-unifesp2024-093}` },
        { id: "des-alerta", diretrizes: ["ms-caderneta"], titulo: "Quando é alerta e quando é atraso", conferir: true,
          prosa: `[[A Caderneta classifica assim: faltam marcos da **faixa etária anterior** = **provável atraso**; faltam marcos da **faixa atual** = **alerta para o desenvolvimento**; todos os marcos presentes, mas com fator de risco (prematuridade, infecção neonatal, baixo peso) = **adequado com fatores de risco**.|q-amrigs2020-065,q-tp20251-037,q-amrigs2024-067]] No alerta, a conduta é orientar estímulos e reavaliar em 30 dias. No provável atraso, encaminhar para avaliação. [[No atraso de linguagem, procurar também sinais de **transtorno do espectro autista**: pouco contato visual, não apontar, não atender pelo nome, interesse restrito.|q-adap24-094,q-tp20222-043]]`,
          questoes: ["q-amrigs2020-065","q-tp20251-037","q-amrigs2024-067","q-adap24-094","q-tp20222-043","q-unifesp2023-058","q-tp20261-057","q-einstein2024-034","q-usp2022-046"],
          texto: `- Faltam marcos da **faixa anterior**: provável atraso, encaminhar. Faltam marcos da **faixa atual**: alerta, estimular e reavaliar. {q-amrigs2020-065,q-amrigs2024-067}
- Fator de risco + marcos ausentes = alerta, com orientação de estímulo e retorno em 30 dias. {q-tp20251-037}
- Atraso de fala: **audiometria sempre**, investigar estímulo e telas e procurar sinais de **TEA**. {q-adap24-094,q-tp20222-043,q-unifesp2023-058,q-tp20261-057}
- Otites de repetição + atraso de fala: pensar em **perda auditiva condutiva**. {q-einstein2024-034}
- "Manhês" é **adequado**: mostra vínculo. {q-usp2022-046}` },
      ],
    },
    {
      id: "aleitamento", titulo: "Aleitamento materno",
      introducao: `O leite materno é um tecido vivo, ajustado à espécie e ao momento. [[O **colostro** dos primeiros dias tem pouco volume e muita proteína, sobretudo **IgA secretória**, além de leucócitos e fatores de crescimento: é a primeira "vacina" do bebê, que reveste o intestino imaturo.|q-tp20251-111]] [[No leite maduro, a principal proteína é a **alfa-lactoalbumina** do soro, de fácil digestão, e o principal carboidrato é a **lactose**.|q-sessp2025-048]] A gordura aumenta ao longo da mamada (o leite do fim é mais calórico), o que explica por que se deixa o bebê esvaziar uma mama antes de oferecer a outra. [[A composição é parecida entre as mulheres, mas cada leite se adapta à mãe e ao seu bebê.|q-unesp2022-004]]

**Fisiologia da produção.** A sucção estimula dois reflexos na mãe. A **prolactina** produz o leite, e quanto mais a mama é esvaziada, mais leite se produz (por isso a livre demanda). A **ocitocina** ejeta o leite e é inibida por dor, estresse e insegurança. [[A **apojadura** (a "descida do leite") acontece entre o 3º e o 5º dia e pode atrasar após cesárea ou estresse; até lá, o colostro basta para o recém-nascido saudável.|q-famerp2023-037,q-famerp2025-053]]

**Por que proteger.** O aleitamento exclusivo até 6 meses e continuado até 2 anos ou mais reduz diarreia, pneumonia, otite, alergia e obesidade, e protege a mãe de câncer de mama e ovário. [[A melhora dos indicadores no Brasil nos últimos 40 anos veio de políticas integradas: Hospital Amigo da Criança, bancos de leite, licença-maternidade e a **norma que regula a propaganda de fórmulas, mamadeiras e bicos** (NBCAL).|q-unifesp2023-067]]`,
      fragmentos: [
        { id: "ama-leite", titulo: "Composição do leite e proteção da amamentação", conferir: true,
          questoes: ["q-tp20251-111","q-sessp2025-048","q-unesp2022-004","q-unifesp2023-067"],
          texto: `- **Colostro**: rico em **imunoglobulinas (IgA secretória)**, leucócitos e proteínas. {q-tp20251-111}
- Leite maduro: proteína principal **alfa-lactoalbumina**; carboidrato principal **lactose**; gordura maior no fim da mamada. {q-sessp2025-048}
- Composição semelhante entre as mulheres, mas **individualizada** para cada dupla mãe-bebê. {q-unesp2022-004}
- Proteção por política pública: IHAC, bancos de leite, licença e a **regulação da propaganda** de fórmulas, mamadeiras e bicos (NBCAL). {q-unifesp2023-067}` },
        { id: "ama-tecnica", casos: ["q-tp20222-041"], titulo: "Pega, posição e as queixas dos primeiros dias", conferir: true,
          prosa: `[[Quase toda dificuldade de amamentar nas primeiras semanas (dor, fissura, bebê que chora e larga o peito, baixo ganho) tem a mesma raiz: **pega ou posição inadequadas**. O bebê que abocanha só o mamilo machuca a mãe e não esvazia a mama, que então produz menos.|q-unifesp2022-070,q-tp20222-041,q-tp20212-118,q-tp20252-001,q-didepm-014,q-amrigs2025-063]] Por isso a primeira conduta é observar a mamada. [[Um bebê com bom ganho de peso e pega correta não precisa de nenhuma intervenção na técnica.|q-sirio2023-050]]`,
          questoes: ["q-unifesp2022-070","q-tp20222-041","q-tp20212-118","q-tp20252-001","q-didepm-014","q-amrigs2025-063","q-sirio2023-050","q-famerp2023-037","q-famerp2025-053","q-famema2025-038","q-sirio2025-051","q-udisc20262-057"],
          texto: `- Pega boa: **boca bem aberta**, **lábio inferior virado para fora**, **queixo tocando a mama**, mais aréola visível acima que abaixo. {q-unifesp2022-070,q-tp20222-041,q-tp20252-001}
- Dor e fissura: **corrigir pega e posição**, manter a amamentação e passar o **próprio leite** nas fissuras. {q-didepm-014,q-amrigs2025-063}
- Bebê que mama "o dia todo", com ganho adequado: rever a técnica e **manter exclusivo**. {q-tp20212-118}
- Sem queixa e com bom ganho: **não interferir**. {q-sirio2023-050}
- Antes da apojadura: **orientar pega e aguardar**. Mamadas frequentes e longas são esperadas; a 1ª evacuação pode levar até **48 h**. {q-famerp2023-037,q-famerp2025-053}
- **Livre demanda** (8 a 12 mamadas/dia). Aumento súbito das mamadas por alguns dias é uma **fase de transição**: manter. {q-famema2025-038}
- Ingurgitamento: massagem, ordenha de alívio, pega, retorno em 48 h. {q-sirio2025-051}
- Fezes do bebê amamentado: **amarelas, semilíquidas e explosivas** após as mamadas são normais. {q-udisc20262-057}` },
        { id: "ama-pouco-leite", titulo: "\"Pouco leite\" e perda de peso", conferir: true,
          prosa: `A queixa de "leite fraco" quase nunca é verdadeira. [[A complementação com fórmula sem indicação reduz a sucção e, com ela, a produção: o certo é **corrigir a técnica e suspender o complemento** quando o bebê ganha peso.|q-tp20251-035]] [[Quando o bebê perde peso demais e a mama não esvazia, a ordenha manual mantém a produção e o leite ordenhado é oferecido **em copinho**, sem atrapalhar a pega.|q-famerp2024-053,q-amrigs2020-071]] [[Só quando há **perda de peso importante sem recuperação**, apesar da técnica corrigida, a suplementação é necessária.|q-uspsp3-022]]`,
          questoes: ["q-tp20251-035","q-famerp2024-053","q-amrigs2020-071","q-uspsp3-022"],
          texto: `- Bebê chorando, com ganho adequado: corrigir a técnica e **suspender o complemento**. {q-tp20251-035}
- Perda de 10% no 2º dia ou bebê que larga o peito: **ordenha manual + correção da pega**, leite ordenhado **no copinho**. {q-famerp2024-053,q-amrigs2020-071}
- Perda excessiva sem recuperação apesar da técnica: **suplementar**. {q-uspsp3-022}` },
        { id: "ama-mastite", titulo: "Mastite", conferir: true,
          questoes: ["q-adap23-061"],
          prosa: `Na mastite o leite parado inflama a mama e pode infectar; esvaziar a mama é o tratamento, e por isso a amamentação continua, inclusive do lado afetado.`,
          texto: `- Febre, calafrio e área quente e dolorosa na mama: **manter o esvaziamento** (amamentar ou ordenhar), analgesia, repouso e **cefalexina por 10 a 14 dias**. Abscesso: drenar. {q-adap23-061}` },
        { id: "ama-contra", diretrizes: ["ms-caderneta"], titulo: "Quando não amamentar (e quando pode)", conferir: true,
          prosa: `As contraindicações são poucas e têm motivo claro: um agente que passa pelo leite e causa doença grave, ou um bebê que não consegue metabolizar o leite. [[No Brasil, **HIV** e **HTLV-1/2** maternos contraindicam a amamentação; do lado do bebê, a **galactosemia** clássica, em que a lactose vira um tóxico.|q-udisc20262-056]] [[A hepatite C não contraindica: a transmissão pelo leite nunca foi documentada.|q-unesp2021-005]]`,
          questoes: ["q-udisc20262-056","q-unesp2021-005","q-scmsp2026-073","q-iamspe2022-036","q-einstein2022-037"],
          texto: `- **Contraindicam**: HIV e HTLV maternos; **galactosemia** no bebê; quimioterápicos e radiofármacos (temporariamente). {q-udisc20262-056}
- **Não contraindicam**: hepatite B (com vacina e imunoglobulina no RN), **hepatite C**, a maioria dos medicamentos. {q-unesp2021-005}
- **Varfarina** é compatível com a amamentação. {q-scmsp2026-073}
- Recomendação: **exclusivo até 6 meses** e continuado até 2 anos ou mais. {q-iamspe2022-036}
- Lactente internado (ex.: bronquiolite) que pode se alimentar: **liberar o leite materno**. {q-einstein2022-037}` },
        { id: "ama-trabalho", diretrizes: ["ms-caderneta"], titulo: "Volta ao trabalho: ordenha e armazenamento", conferir: true,
          questoes: ["q-scmsp2021-044","q-usprp2026-043","q-amrigs2021-063","q-unicampdis2022-028","q-iamspe2025-070","q-fmabc2023-052"],
          prosa: `A volta ao trabalho não precisa encerrar o aleitamento: o leite ordenhado mantém a produção e alimenta o bebê, e o copinho evita que ele desaprenda a pega.`,
          texto: `- Leite ordenhado: **12 horas na geladeira** e **15 dias no congelador/freezer**. {q-scmsp2021-044,q-usprp2026-043,q-unicampdis2022-028,q-amrigs2021-063}
- Descongelar em banho-maria, sem micro-ondas, e oferecer **em copinho**. {q-scmsp2021-044,q-amrigs2021-063}
- **Chupetas e mamadeiras são desaconselhadas**: confundem a sucção e reduzem a amamentação. {q-iamspe2025-070}
- Desmame **natural**: a criança aceita outras formas de consolo. Desmame **guiado**: a amamentação deixa de ser em livre demanda. {q-fmabc2023-052}` },
      ],
    },
    {
      id: "alimentacao", titulo: "Alimentação complementar e fórmulas",
      introducao: `Aos 6 meses o leite materno continua essencial, mas deixa de bastar sozinho: as reservas de **ferro** do nascimento acabam e as necessidades de energia, ferro e zinco crescem. Ao mesmo tempo, a criança fica pronta: senta com apoio, perde o reflexo de protrusão da língua e se interessa pela comida. [[Por isso a alimentação complementar começa **aos 6 meses**, mantendo o leite materno, com comida de verdade, **sem sal, açúcar ou mel**.|q-adap22-070,q-usprp2024-067,q-unesp2024-004]] O mel antes de 1 ano é proibido pelo risco de **botulismo**: o intestino imaturo deixa os esporos germinarem.

[[O paladar é aprendido: é comum o bebê recusar o alimento novo, e são necessárias **várias exposições** (8 a 15) até aceitar.|q-amrigs2020-068]] Oferecer de novo, sem forçar nem trocar por outro alimento, é o que forma o hábito.

**Leite de vaca antes de 1 ano.** [[O leite de vaca integral tem pouco ferro, e o pouco que tem é mal absorvido; o excesso de proteína e cálcio atrapalha a absorção do ferro dos outros alimentos e pode causar micro-hemorragias intestinais. Daí a anemia ferropriva.|q-adap21-039,q-unesp2023-007]] [[O leite materno ou uma fórmula infantil são as opções no primeiro ano; o Guia Alimentar do Ministério da Saúde admite o leite de origem animal para a criança de 6 a 11 meses que não mama no peito quando a fórmula não é possível, com orientação.|q-fmabc2026-052,q-sessp2024-055]]`,
      fragmentos: [
        { id: "ali-papa", diretrizes: ["ms-guia-alimentar"], titulo: "Como montar as refeições", conferir: true,
          questoes: ["q-adap22-070","q-usprp2024-067","q-unesp2024-004","q-amrigs2020-068","q-famema2023-094","q-tp20231-039","q-fmabc2024-045","q-fmabc2025-045","q-scmsp2025-043"],
          texto: `- Início aos **6 meses**, com aleitamento mantido até **2 anos ou mais**. {q-adap22-070,q-usprp2024-067,q-unesp2024-004}
- **Papa principal com todos os grupos**: cereal ou tubérculo, leguminosa (feijão), **carne ou ovo**, legumes e verduras. A carne entra desde o início. {q-famema2023-094,q-tp20231-039}
- **Ovo inteiro (clara e gema), peixe e carne de porco** liberados desde os 6 meses. {q-fmabc2024-045}
- Aos 6 meses: aleitamento + **3 refeições** (2 de frutas e 1 papa); aos 7 a 8 meses, 2 papas. {q-fmabc2025-045}
- Recusa inicial é normal: **várias exposições**. {q-amrigs2020-068}
- Sem sal, açúcar, mel, sucos ou ultraprocessados até 2 anos. {q-unesp2024-004}
- Distribuição de energia: **carboidratos cerca de metade**, gorduras cerca de 30 a 40% e **proteínas a menor parte** (cerca de 10%). {q-scmsp2025-043}` },
        { id: "ali-formula", diretrizes: ["sbp-alimentacao"], titulo: "Leite de vaca e fórmula infantil", conferir: true,
          questoes: ["q-adap21-039","q-unesp2023-007","q-fmabc2026-052","q-sessp2024-055","q-usprp2021-039","q-usprp2025-020","q-unesp2022-008"],
          texto: `- **Não** oferecer leite de vaca integral antes de **12 meses** (SBP): risco de **anemia ferropriva**. {q-adap21-039,q-unesp2023-007}
- O Guia do MS (2019) admite leite de origem animal de 6 a 11 meses para quem não mama, quando a fórmula não é possível. {q-fmabc2026-052}
- Fórmula infantil supre as necessidades **até a alimentação complementar** e substitui o leite materno quando ele falta. {q-sessp2024-055}
- Preparo: **1 medida para 30 mL de água** (5 medidas em 150 mL). {q-usprp2021-039}
- Necessidade energética no 1º semestre: cerca de **100 kcal/kg/dia**. {q-usprp2025-020}
- Regurgitação em quem usa fórmula, com bom ganho: pode-se usar **fórmula antirregurgitação**. {q-unesp2022-008}` },
        { id: "ali-vegana", titulo: "Criança vegana", conferir: true,
          prosa: `[[A vitamina **B12** só existe em alimentos de origem animal: na dieta vegana ela **sempre** precisa ser suplementada, porque a deficiência causa anemia e dano neurológico irreversível no cérebro em formação.|q-einstein2021-029,q-tp20252-002,q-einstein2027-034]]`,
          questoes: ["q-einstein2021-029","q-tp20252-002","q-einstein2027-034"],
          texto: `- Base: **leguminosas, cereais integrais, castanhas, verde-escuros e frutas**. {q-tp20252-002}
- Suplementar sempre **B12** e **ferro**. Avaliar cálcio, zinco, iodo e DHA. {q-einstein2021-029,q-tp20252-002,q-einstein2027-034}` },
      ],
    },
    {
      id: "ferro", titulo: "Ferro e vitaminas",
      introducao: `A anemia ferropriva é a carência nutricional mais comum na infância e acontece numa janela previsível. O bebê a termo nasce com uma reserva de ferro, recebida da mãe no terceiro trimestre, que dura cerca de **4 a 6 meses**. Depois disso o crescimento rápido consome o ferro, e o leite materno, embora tenha ferro muito bem absorvido, tem pouco. A deficiência de ferro nessa fase prejudica o desenvolvimento cerebral de forma que pode não se recuperar, e por isso se previne com suplementação **antes** da anemia aparecer.

[[O **prematuro** e o **baixo peso** nascem com reserva menor (perderam parte do terceiro trimestre) e crescem mais rápido para recuperar: precisam de dose maior e começam mais cedo, já com **30 dias** de vida.|q-unesp2022-009,q-famerp2023-032]] [[A prevenção usa dose baixa (**10 a 12,5 mg/dia** no termo; **1 a 4 mg/kg/dia** no prematuro e no de risco); o tratamento da anemia já instalada usa **3 a 6 mg/kg/dia**, por cerca de 3 meses depois de normalizar a hemoglobina, para repor os estoques.|q-sessp2022-054,q-tp20222-045]]`,
      fragmentos: [
        { id: "fer-dose", casos: ["q-usprp2025-019"], diretrizes: ["sbp-ferro"], titulo: "Prevenção: quem, quanto e até quando (SBP 2026)", conferir: true,
          prosa: `[[A SBP de 2026 passou o lactente a termo, de peso adequado, à dose fixa de **10 a 12,5 mg/dia** de ferro elementar em dois ciclos de 3 meses (começando aos 6 e aos 12 meses), como no programa do Ministério; antes era 1 mg/kg/dia dos 6 aos 24 meses.|q-famema2023-100]] O ferro se dá longe das mamadas.`,
          questoes: ["q-famema2023-100","q-sessp2023-021","q-sessp2025-056","q-unesp2022-009","q-famerp2023-032","q-usprp2025-019"],
          texto: `- **A termo com fator de risco** (ex.: mãe anêmica, clampeamento precoce): 1 mg/kg/dia **a partir dos 3 meses** até 24 meses. {q-sessp2023-021,q-sessp2025-056}
- **Prematuro ou baixo peso (1.500 a 2.500 g)**: **2 mg/kg/dia a partir de 30 dias** por 1 ano, depois 1 mg/kg/dia por mais 1 ano. Abaixo de 1.500 g, 3 a 4 mg/kg/dia. {q-unesp2022-009,q-famerp2023-032}
- Prematuro que vai bem com 6 meses em leite materno exclusivo: **manter a amamentação exclusiva** (até a introdução alimentar aos 6 meses de idade corrigida, conforme o caso). {q-usprp2025-019}
` },
        { id: "fer-tratar", diretrizes: ["sbp-ferro"], titulo: "Tratamento da anemia ferropriva", conferir: true,
          questoes: ["q-sessp2022-054","q-tp20222-045"],
          texto: `- Hb baixa, ferritina baixa, RDW alto: **3 a 6 mg/kg/dia de ferro elementar**. {q-sessp2022-054,q-tp20222-045}` },
        { id: "fer-vitd", diretrizes: ["sbp-alimentacao"], titulo: "Vitamina D e vitamina A", conferir: true,
          questoes: [],
          prosa: `O leite materno tem pouca vitamina D, e a exposição ao sol do lactente é pequena e variável: por isso a suplementação é rotina no primeiro ano. A vitamina A só se suplementa em megadose nas regiões onde a carência é comum.`,
          texto: `- Vitamina D (SBP): **400 UI/dia no 1º ano** e **600 UI/dia no 2º ano**, para todas as crianças.
- Vitamina A em megadose: programa do MS para regiões de risco, dos 6 aos 59 meses.` },
      ],
    },
    {
      id: "queixas", titulo: "Queixas comuns do lactente",
      introducao: `Boa parte das consultas do primeiro trimestre é sobre choro e regurgitação, e a maior parte é fisiológica. O que define a conduta é a criança: se ela **ganha peso e está bem**, a queixa é do amadurecimento, não de doença.

**Por que o lactente regurgita.** O esfíncter esofágico inferior é curto e imaturo, o estômago é pequeno, a dieta é líquida e o bebê passa a maior parte do tempo deitado. [[A regurgitação é comum até os 4 meses e some até 12 a 18 meses: é o **refluxo fisiológico** do "regurgitador feliz", que não precisa de exames nem de remédios.|q-fmabc2026-043,q-sessp2022-045,q-famema2023-091,q-tp20251-045]] Os sinais de alerta são outros: baixo ganho de peso, recusa alimentar, vômito em jato ou bilioso, sangue, irritabilidade intensa com arqueamento, sintomas respiratórios.

**Cólica.** É choro intenso e sem causa em um bebê saudável, mais no fim da tarde, que começa por volta de 2 semanas, tem pico com 6 semanas e acaba por volta dos 3 a 4 meses. A causa não é clara: imaturidade do intestino e da regulação do sono, em bebês mais sensíveis.`,
      fragmentos: [
        { id: "que-refluxo", titulo: "Regurgitação", conferir: true,
          questoes: ["q-fmabc2026-043","q-sessp2022-045","q-famema2023-091","q-tp20251-045","q-unesp2022-008"],
          texto: `- Regurgitação com **bom ganho de peso**: refluxo fisiológico. **Tranquilizar**, medidas posturais, manter o aleitamento. {q-fmabc2026-043,q-famema2023-091,q-tp20251-045}
- Evitar **excesso de volume** e **tabagismo passivo**; trocar a fralda **antes** da mamada. {q-sessp2022-045}
- Sem exames e sem medicação. Em fórmula: considerar **fórmula AR**. {q-unesp2022-008}` },
        { id: "que-colica", casos: ["q-usprp2022-019"], titulo: "Cólica e dermatite de fraldas", conferir: true,
          questoes: ["q-famerp2022-031","q-usprp2022-019"],
          prosa: `A cólica do lactente é choro intenso de bebê saudável, que cresce bem, com pico por volta de 6 semanas e fim por volta de 3 a 4 meses; o essencial é examinar para afastar doença e acolher a família.`,
          texto: `- Cólica (Wessel): choro por **3 h ou mais por dia**, em **3 dias ou mais por semana**, por **3 semanas ou mais**, em bebê saudável e bem alimentado. {q-famerp2022-031}
- Dermatite de fraldas: trocas frequentes, ar livre e **creme de barreira** (óxido de zinco, **dexpantenol**). Lesões satélites sugerem *Candida*. {q-usprp2022-019}` },
      ],
    },
  ],
});
