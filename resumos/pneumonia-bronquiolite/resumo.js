/* resumos/pneumonia-bronquiolite/resumo.js — resumo adaptativo de infecções respiratórias baixas
   na criança: bronquiolite, pneumonia comunitária e suas complicações, pneumonias atípicas e
   coqueluche (que saiu do resumo de exantemáticas: é tosse do lactente, não exantema).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- pneumonia-bronquiolite */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "pneumonia-bronquiolite",
  titulo: "Bronquiolite, pneumonia e coqueluche na criança",
  assunto: "ass-infectoped-pneumonia",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "sbp-bronquiolite", texto: "Sociedade Brasileira de Pediatria — Diretrizes para o manejo da infecção causada pelo vírus sincicial respiratório (VSR) e bronquiolite viral aguda", lidoEm: null },
    { id: "aap-bronquiolite", texto: "American Academy of Pediatrics — Clinical Practice Guideline: Diagnosis, Management, and Prevention of Bronchiolitis (2014)", lidoEm: null },
    { id: "ms-aidpi", texto: "Ministério da Saúde — AIDPI (Atenção Integrada às Doenças Prevalentes na Infância) e manejo das infecções respiratórias", lidoEm: null },
    { id: "sbp-pac", texto: "Sociedade Brasileira de Pediatria — Pneumonia adquirida na comunidade na infância (documento científico)", lidoEm: null },
    { id: "ms-guia-vigilancia", texto: "Ministério da Saúde — Guia de Vigilância em Saúde (coqueluche)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Escarlatina classificada neste assunto: está no resumo de exantemáticas", questoes: ["q-einstein2022-040"] },
    { motivo: "Anulada: sem gabarito para medir o erro", questoes: ["q-amrigs2025-075"] },
  ],
  doencas: [
    {
      id: "bronquiolite", titulo: "Bronquiolite viral aguda",
      introducao: `A bronquiolite é a **primeira infecção do trato respiratório inferior** do lactente, quase sempre pelo **vírus sincicial respiratório (VSR)**, em surtos no outono e no inverno. Atinge sobretudo os **menores de 2 anos**, com o pior risco nos primeiros meses de vida, em prematuros e em cardiopatas.

**Fisiopatologia.** O vírus infecta o epitélio dos bronquíolos e o destrói. [[O bronquíolo do lactente é tão fino que o edema da parede, a necrose do epitélio e os tampões de muco e restos celulares bastam para obstruí-lo: daí a sibilância, o aprisionamento de ar e as áreas de atelectasia.|q-unesp2023-009,q-famerp2022-022,q-uspsp2-067]] Não há broncoespasmo verdadeiro na maioria dos casos, e é por isso que broncodilatador e corticoide não mudam a evolução.

[[A bronquiolite é um diagnóstico clínico: um lactente com alguns dias de coriza que evolui com taquipneia, tiragem, sibilos e crepitações não precisa de radiografia nem de exames para ser diagnosticado.|q-uspsp1-008,q-uspsp2-067,q-unesp2023-009]] A imunidade ao VSR não é duradoura: [[reinfecções ao longo da vida são a regra, mais leves a cada vez.|q-iamspe2025-066]]

Veja também: **Infecções de vias aéreas superiores** (crupe e o guincho da coqueluche), **Asma** e **Calendário vacinal** (dTpa da gestante).`,
      fragmentos: [
        { id: "bva-quadro", casos: ["q-uspsp4-115"], titulo: "Quadro e diagnóstico", conferir: true,
          questoes: ["q-unesp2023-009","q-iamspe2025-066","q-uspsp1-008","q-uspsp2-067","q-famerp2022-022","q-uspsp4-115","q-unicampdis2025-030","q-tp20222-049"],
          casos: ["q-unicampdis2025-030"],
          texto: `- Começa com **pródromo viral alto** (coriza, tosse) e, dias depois, **taquipneia, tiragem, sibilos e crepitações**. {q-unesp2023-009,q-uspsp2-067}
- **Diagnóstico clínico**: radiografia e exames **não são necessários** no caso típico. {q-uspsp1-008,q-uspsp2-067}
- Radiografia, quando feita: **hiperinsuflação**, retificação das cúpulas e atelectasias. {q-unicampdis2025-030}
- POCUS: linhas B e pequenas consolidações subpleurais, sem consolidação lobar. {q-uspsp4-115}
- **Acidose respiratória** (pCO2 alta) com fadiga: risco de **insuficiência respiratória**. {q-famerp2022-022}
- O VSR **não** confere imunidade permanente: reinfecção é comum. {q-iamspe2025-066}
- Piora depois do 5º a 7º dia, quando deveria melhorar: investigar **atelectasia ou coinfecção bacteriana**. {q-tp20222-049}` },
        { id: "bva-trat", titulo: "Tratamento: o que funciona e o que não", conferir: true, diretrizes: ["sbp-bronquiolite","aap-bronquiolite"],
          questoes: ["q-adap26-089","q-unifesp2026-089","q-sessp2023-037","q-amrigs2025-069","q-sirio2026-043","q-einstein2022-036","q-einstein2024-037","q-udisc20262-046","q-scmsp2022-033","q-iamspe2026-067","q-didepm-084","q-usp2024-001"],
          casos: ["q-usp2024-001"],
          prosa: `[[O tratamento é de suporte porque não há o que reverter: a obstrução é mecânica e se resolve com a regeneração do epitélio, em uma a duas semanas.|q-adap26-089,q-udisc20262-046]] O que muda o desfecho é manter a oxigenação, a hidratação e o nariz desobstruído, já que o lactente respira pelo nariz.`,
          texto: `- Bom estado, SpO2 normal, mamando: **casa**, com **aspiração nasal, dieta fracionada, hidratação e sinais de alarme**. Sem bombinha, sem corticoide. {q-adap26-089}
- Única medida com eficácia comprovada no lactente hipoxêmico: **oxigênio**. {q-udisc20262-046}
- **SpO2 abaixo de 90 a 92%**, desidratação ou recusa alimentar: **internar com oxigênio**, hidratação (sonda, se preciso) e aspiração. {q-iamspe2026-067,q-didepm-084,q-amrigs2025-069}
- **Lavagem nasal com soro fisiológico** e inalação com soro são as medidas de suporte esperadas. {q-sirio2026-043,q-einstein2022-036,q-einstein2024-037,q-amrigs2025-069}
- SBP: **salina hipertônica 3%** pode ser usada no internado. {q-unifesp2026-089}
- Broncodilatador: só como teste, e **mantido apenas se houver resposta** clínica. {q-sessp2023-037}
- **Oximetria contínua não é recomendada** no lactente estável (AAP). {q-scmsp2022-033}
- Internado com ingestão baixa: **soro de manutenção**. {q-usp2024-001}` },
        { id: "bva-suporte", casos: ["q-usp2024-002"], titulo: "Escalonar o suporte: alto fluxo e CPAP", conferir: true, diretrizes: ["sbp-bronquiolite"],
          questoes: ["q-tp20202-047","q-usp2024-002","q-sirio2027-046","q-fmabc2026-048"],
          prosa: `Quando o cateter comum não basta, o alto fluxo umidificado gera uma pressão positiva leve, lava o gás carbônico do espaço morto e poupa o esforço do lactente; o CPAP vai além e mantém os alvéolos abertos. Os dois evitam boa parte das intubações.`,
          texto: `- Falha do cateter nasal comum: **cateter nasal de alto fluxo (CNAF)**, iniciando com **2 L/kg/min**. {q-usp2024-002,q-tp20202-047}
- O CNAF gera **pressão positiva (efeito CPAP)**, lava o espaço morto e reduz o trabalho respiratório. {q-sirio2027-046}
- Refratário ao oxigênio: **CPAP nasal** pode evitar a intubação. {q-fmabc2026-048}` },
      ],
    },
    {
      id: "pac", titulo: "Pneumonia adquirida na comunidade",
      introducao: `A pneumonia é a principal causa infecciosa de morte em menores de 5 anos no mundo. [[O pulmão se defende com a tosse e o transporte mucociliar, que retiram partículas e germes; quando essas defesas falham, o agente chega ao alvéolo e a resposta inflamatória enche o espaço aéreo de exsudato.|q-unesp2021-007]]

**Fisiopatologia dos sinais.** [[Alvéolo cheio de exsudato não troca gás: por isso surgem taquipneia, hipoxemia e, no exame, estertores crepitantes e aumento da transmissão da voz sobre a área consolidada.|q-fmabc2021-096,q-unifesp2024-087]] [[O gemido expiratório é o lactente fechando a glote no fim da expiração para manter pressão positiva e evitar que os alvéolos colapsem.|q-adap24-057,q-unifesp2024-099]]

[[A frequência respiratória é o melhor sinal isolado de pneumonia na criança: a OMS e o AIDPI usam os pontos de corte por idade para diagnosticar sem radiografia onde ela não existe.|q-famema2025-043,q-fmabc2021-097]]`,
      fragmentos: [
        { id: "pac-diag", casos: ["q-uspsp2-069"], titulo: "Diagnóstico: clínica, oximetria e imagem", conferir: true, diretrizes: ["ms-aidpi","sbp-pac"],
          questoes: ["q-unesp2021-007","q-fmabc2021-096","q-fmabc2021-097","q-famema2022-087","q-uspsp2-069","q-unifesp2024-087","q-adap24-057","q-unifesp2024-099","q-usp2023-116","q-famema2025-043"],
          casos: ["q-usp2023-116"],
          texto: `- Defesas que falham na pneumonia: **reflexo da tosse** e **transporte mucociliar**. {q-unesp2021-007}
- Pneumonia: **febre, tosse, taquipneia e estertores finos** localizados. {q-fmabc2021-096}
- **Taquipneia (OMS)**: **≥ 60** irpm abaixo de 2 meses, **≥ 50** de 2 a 11 meses, **≥ 40** de 1 a 4 anos. {q-famema2025-043}
- Bom estado geral: **radiografia não é necessária** para diagnosticar nem para tratar. {q-fmabc2021-097}
- Criança com desconforto: o primeiro passo é a **oximetria de pulso**. {q-famema2022-087}
- Toxemia: **estabilizar e iniciar antibiótico**; não atrasar por exames de imagem. {q-uspsp2-069}
- Pneumonia bacteriana típica na radiografia: **opacidade densa, homogênea e localizada**. {q-unifesp2024-087}
- **Gemido expiratório**: mantém pressão no fim da expiração e evita o colapso alveolar. {q-adap24-057,q-unifesp2024-099}
- Ultrassom pulmonar: consolidação com **broncograma aéreo** na área da imagem radiológica. {q-usp2023-116}` },
        { id: "pac-agentes", casos: ["q-famerp2026-046"], titulo: "Agentes por idade e por contexto", conferir: true,
          questoes: ["q-scmsp2026-052","q-famema2021-099","q-iamspe2021-048","q-sessp2022-057","q-sessp2023-028","q-adap24-052","q-famerp2026-046"],
          prosa: `[[O pneumococo é o agente bacteriano mais comum da pneumonia lobar em todas as idades depois do período neonatal, inclusive na criança com HIV.|q-scmsp2026-052,q-famema2021-099,q-iamspe2021-048]] [[A resistência dele à penicilina não vem de betalactamase: vem de proteínas ligadoras de penicilina alteradas, e por isso se vence com dose maior, não com inibidor de betalactamase.|q-sessp2022-057]]`,
          texto: `- Febre alta, toxemia, dor torácica e **consolidação lobar**: **Streptococcus pneumoniae**. {q-scmsp2026-052,q-famema2021-099,q-famerp2026-046}
- Criança com **HIV** e pneumonia lobar: ainda o **pneumococo**. {q-iamspe2021-048}
- Resistência do pneumococo: **proteínas ligadoras de penicilina alteradas**. {q-sessp2022-057}
- Contexto aponta o agente: **varicela → S. aureus/estreptococo**; **fibrose cística → Pseudomonas**; **HIV sem tratamento → Pneumocystis**; tosse prolongada e emagrecimento → **tuberculose**. {q-sessp2023-028}
- Lactente com HIV, hipoxemia desproporcional à ausculta e LDH alta (Pneumocystis): **opacidade em vidro fosco**, que deixa ver os vasos. {q-adap24-052}` },
        { id: "pac-amb", titulo: "Tratamento ambulatorial", conferir: true, diretrizes: ["ms-aidpi","sbp-pac"],
          questoes: ["q-usprp2023-013","q-iamspe2026-069","q-famema2023-099","q-famema2025-043","q-fmabc2023-053","q-fmabc2025-041","q-sirio2026-044","q-usprp2021-027"],
          casos: ["q-usprp2021-027"],
          texto: `- Sem sinal de gravidade: **amoxicilina oral 50 mg/kg/dia** (de 8/8 h ou 12/12 h). {q-iamspe2026-069,q-usprp2021-027,q-sirio2026-044}
- Duração cobrada: **7 dias** nas provas recentes; questões antigas trazem **10 dias**. {q-fmabc2025-041,q-usprp2021-027}
- **Reavaliar em 48 horas** (algumas provas pedem 24 h); sem melhora, pensar em complicação. {q-usprp2023-013,q-famema2025-043,q-famema2023-099,q-fmabc2023-053}` },
        { id: "pac-grave", titulo: "Quando internar e como tratar a grave", conferir: true, diretrizes: ["ms-aidpi","sbp-pac"],
          questoes: ["q-adap21-027","q-famema2021-084","q-unesp2024-016","q-fmabc2026-045","q-usp2025-072"],
          casos: ["q-unesp2024-016"],
          prosa: `A pneumonia grave é a que já compromete a oxigenação ou o estado geral: hipoxemia, tiragem subcostal, gemência, incapacidade de beber, letargia. Ela pede antibiótico venoso e oxigênio; a gemência é o lactente fechando a glote para manter o alvéolo aberto, sinal de fadiga próxima.`,
          texto: `- Internar: **SpO2 < 90 a 92%**, tiragem subcostal, gemência, **vômitos que impedem a via oral**, toxemia, idade abaixo de 2 meses ou falha do tratamento oral. {q-adap21-027,q-famema2021-084,q-fmabc2026-045}
- Pneumonia grave: **oxigênio + penicilina cristalina ou ampicilina IV** (ampicilina **200 mg/kg/dia**). {q-adap21-027,q-unesp2024-016}
- Falha da amoxicilina com derrame provável: internação, oxigênio e ampicilina IV. {q-unesp2024-016}
- Gemência, letargia e hipoxemia com máscara: **intubar**, mantendo a máscara até o preparo. {q-usp2025-072}` },
      ],
    },
    {
      id: "complicacoes", titulo: "Complicações: derrame, empiema e necrose",
      introducao: `[[A pneumonia que não melhora em 48 a 72 horas de antibiótico adequado quase sempre tem uma complicação, e a mais comum é o derrame parapneumônico.|q-famema2021-083,q-fmabc2025-050,q-usp2023-097]] A inflamação do pulmão vizinho aumenta a permeabilidade da pleura; o líquido, de início livre e estéril, pode se infectar, formar septos de fibrina e virar empiema.

[[O derrame se reconhece no exame porque o líquido afasta o pulmão da parede: a expansibilidade cai, o frêmito some, a percussão fica maciça e o murmúrio desaparece na base.|q-famerp2026-040,q-tp20232-043,q-tp20241-045]]`,
      fragmentos: [
        { id: "com-derrame", titulo: "Derrame pleural e empiema", conferir: true, diretrizes: ["sbp-pac"],
          questoes: ["q-famema2021-083","q-fmabc2025-050","q-usp2023-097","q-famerp2026-040","q-tp20232-043","q-tp20241-045","q-tp20261-061","q-sirio2025-047","q-usp2026-068","q-unicampdis2025-021"],
          casos: ["q-usp2023-097","q-unicampdis2025-021"],
          texto: `- Febre que volta ou persiste, **murmúrio abolido e macicez na base**: **derrame pleural**. {q-famema2021-083,q-fmabc2025-050,q-usp2023-097}
- Exame do derrame: **expansibilidade, frêmito e murmúrio diminuídos**, macicez; radiografia com **sinal do menisco**. {q-famerp2026-040}
- Próximo exame: **ultrassonografia de tórax**, que confirma o líquido, vê septos e guia a punção. {q-tp20241-045,q-tp20261-061,q-tp20232-043}
- Derrame septado, criança estável: **toracocentese guiada por US** com análise microbiológica. {q-sirio2025-047,q-tp20232-043}
- Pneumococo sensível na cultura, criança melhorando: **manter o antibiótico e o suporte**. {q-usp2026-068}
- Febre persistente após drenagem: procurar **loculação residual, empiema ou abscesso** na nova imagem. {q-unicampdis2025-021}` },
        { id: "com-necrose", titulo: "Pneumonia necrosante e estafilocócica", conferir: true,
          questoes: ["q-tp20252-070","q-fmabc2022-059"],
          casos: ["q-tp20252-070"],
          prosa: `Quando a criança não melhora com o antibiótico certo, procura-se complicação: derrame, empiema, abscesso ou necrose do parênquima. O *S. aureus* é o agente que mais necrosa e forma pneumatoceles, sobretudo depois de lesão de pele ou varicela.`,
          texto: `- Falha da amoxicilina, mau estado e cavitações na tomografia: **pneumonia necrosante**; cobrir **pneumococo e S. aureus**. {q-tp20252-070}
- Lesão de pele recente (porta de entrada), focos em vários lobos e derrame: **S. aureus**, internar e dar **oxacilina**. {q-fmabc2022-059}` },
      ],
    },
    {
      id: "atipicas", titulo: "Pneumonias atípicas: Mycoplasma e Chlamydia",
      introducao: `"Atípica" quer dizer que o quadro não é o da pneumonia lobar: a febre é baixa, o estado geral é bom e a radiografia mostra mais do que a ausculta sugere. [[Os dois agentes atípicos da prova dividem as idades: Chlamydia trachomatis no lactente de 1 a 3 meses, que a adquiriu no canal de parto, e Mycoplasma pneumoniae no escolar e no adolescente.|q-iamspe2022-043,q-unicamp2023-048,q-didepm-054,q-uspsp2-060]]

[[Nenhum dos dois tem parede celular de peptidoglicano acessível aos betalactâmicos, e por isso o tratamento é com macrolídeo.|q-iamspe2022-044,q-scmsp2026-046,q-uspsp2-060]]`,
      fragmentos: [
        { id: "ati-mycoplasma", casos: ["q-unicampdis2025-073"], titulo: "Mycoplasma pneumoniae", conferir: true,
          questoes: ["q-scmsp2026-046","q-uspsp2-060","q-didepm-054","q-unicampdis2025-073"],
          casos: ["q-uspsp2-060"],
          texto: `- **Escolar ou adolescente**, febre baixa, tosse seca persistente, cefaleia, bom estado; surto na escola. {q-didepm-054,q-unicampdis2025-073}
- Radiografia com **infiltrado intersticial** peribrônquico, mais exuberante que a ausculta. {q-didepm-054,q-uspsp2-060}
- Manifestação extrapulmonar clássica: **eritema multiforme** (também anemia hemolítica). {q-scmsp2026-046}
- Tratamento: **macrolídeo** (azitromicina por 5 dias), ambulatorial. {q-scmsp2026-046,q-uspsp2-060,q-didepm-054}` },
        { id: "ati-chlamydia", titulo: "Chlamydia trachomatis do lactente", conferir: true,
          questoes: ["q-iamspe2022-043","q-iamspe2022-044","q-unesp2024-015","q-unicamp2023-048"],
          casos: ["q-unesp2024-015"],
          texto: `- Lactente de **1 a 3 meses**, **afebril**, taquipneico, tosse em staccato, com **conjuntivite** prévia. {q-iamspe2022-043,q-unicamp2023-048}
- **Eosinofilia** e radiografia com hiperinsuflação e infiltrado intersticial. {q-iamspe2022-043,q-unesp2024-015}
- Tratamento: **macrolídeo** (eritromicina ou azitromicina). {q-iamspe2022-044,q-unesp2024-015}` },
      ],
    },
    {
      id: "coqueluche", titulo: "Coqueluche",
      introducao: `A coqueluche é causada pela *Bordetella pertussis*, bactéria que adere ao epitélio ciliado e produz **toxinas** que paralisam os cílios e inflamam a mucosa. [[A tosse em acessos vem das toxinas, não da invasão do pulmão: por isso a ausculta é normal entre as crises e o antibiótico tardio pouco muda a tosse, mas corta a transmissão.|q-uspsp1-006,q-tp20252-069,q-unicampdis2024-096]]

[[A toxina pertussis faz os linfócitos não saírem do sangue para os tecidos, o que explica a leucocitose com linfocitose típica.|q-unicampdis2023-030,q-fmabc2024-055]] [[O lactente pequeno, ainda sem as três doses da pentavalente e sem anticorpos se a mãe não recebeu dTpa, é quem tem a forma grave: em vez dos acessos clássicos, faz apneia e cianose.|q-tp20252-069,q-unicampdis2023-030,q-einstein2027-039]]`,
      fragmentos: [
        { id: "coq-quadro", titulo: "Quadro, diagnóstico e tratamento", conferir: true, diretrizes: ["ms-guia-vigilancia"],
          questoes: ["q-tp20252-069","q-unicampdis2023-030","q-unicampdis2024-096","q-uspsp1-006","q-fmabc2024-055","q-einstein2027-039","q-unesp2025-014"],
          casos: ["q-fmabc2024-055"],
          texto: `- Três fases: **catarral** (1 a 2 semanas, como um resfriado), **paroxística** (acessos de tosse, guincho, vômito pós-tosse) e **convalescença**. {q-unicampdis2024-096,q-uspsp1-006}
- Lactente pequeno: **apneia e cianose** após a tosse, afebril, ausculta normal. {q-tp20252-069,q-unicampdis2023-030}
- **Leucocitose com linfocitose** no hemograma. {q-unicampdis2023-030,q-fmabc2024-055}
- Caso suspeito no lactente: **tosse há 10 dias ou mais** com cianose, engasgo ou apneia (SBP). {q-einstein2027-039}
- Tratamento: **macrolídeo (azitromicina)**; **notificar**. {q-uspsp1-006,q-tp20252-069,q-fmabc2024-055}
- Prevenção: **pentavalente aos 2, 4 e 6 meses**, reforços de DTP e **dTpa na gestante**. {q-unesp2025-014}` },
      ],
    },
    {
      id: "diferenciais", titulo: "Outros diferenciais e a tabela comparativa",
      introducao: `Nem todo infiltrado é infecção. [[Larvas de Ascaris, Strongyloides e ancilostomídeos atravessam o pulmão no ciclo e causam infiltrado transitório com eosinofilia, a síndrome de Löffler.|q-famema2021-086]] [[A criança com encefalopatia que aspira saliva repetidamente tem pneumonias de repetição, e a medida que reduz a recorrência é diminuir a saliva, por exemplo com atropina via oral.|q-usp2023-100]]`,
      fragmentos: [
        { id: "dif-outros", titulo: "Löffler e aspiração", conferir: true,
          questoes: ["q-famema2021-086","q-usp2023-100"],
          texto: `- Infiltrado peri-hilar com **eosinofilia alta**: **síndrome de Löffler** (ciclo pulmonar de helmintos). {q-famema2021-086}
- Pneumonias de repetição por aspiração com **sialorreia**: reduzir a saliva (**atropina** colírio por via oral). {q-usp2023-100}` },
        { id: "dif-tabela", titulo: "Bronquiolite, pneumonias e coqueluche lado a lado", conferir: true,
          questoes: ["q-uspsp2-067","q-scmsp2026-052","q-didepm-054","q-iamspe2022-043","q-tp20252-069"],
          prosa: `| Quadro | Idade típica | Febre | Ausculta | Radiografia | Hemograma | Tratamento |
|---|---|---|---|---|---|---|
| **Bronquiolite** | menor de 2 anos | baixa ou ausente | **sibilos e crepitações** difusos | não precisa; hiperinsuflação | não precisa | **suporte** e oxigênio |
| **Pneumonia pneumocócica** | qualquer idade | **alta**, toxemia | crepitações **localizadas** | **consolidação lobar** | leucocitose com desvio | **amoxicilina**; grave: penicilina/ampicilina IV |
| **Mycoplasma** | **escolar** | baixa | pobre | infiltrado **intersticial** | normal | **macrolídeo** |
| **Chlamydia** | **1 a 3 meses** | **ausente** | crepitações | hiperinsuflação e intersticial | **eosinofilia** | **macrolídeo** |
| **Coqueluche** | lactente pequeno (grave) | ausente | **normal** entre os acessos | normal | **linfocitose** | **azitromicina** e notificar |`,
          texto: `- Sibilos difusos em lactente com coriza: bronquiolite, suporte. {q-uspsp2-067}
- Febre alta e consolidação lobar: pneumococo. {q-scmsp2026-052}
- Escolar com infiltrado intersticial e bom estado: Mycoplasma. {q-didepm-054}
- Lactente afebril com eosinofilia: Chlamydia; com linfocitose e apneia: coqueluche. {q-iamspe2022-043,q-tp20252-069}` },
      ],
    },
  ],
});
