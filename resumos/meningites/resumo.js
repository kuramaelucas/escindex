/* resumos/meningites/resumo.js — resumo adaptativo de meningites e encefalites: síndrome meníngea, líquor, primeira conduta,
   meningite bacteriana (etiologia por idade, antibiótico, complicações), doença meningocócica e quimioprofilaxia,
   meningite viral, encefalite herpética, meningite tuberculosa, criptococose, abscesso e neurocisticercose.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- meningites */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "meningites",
  titulo: "Meningites e encefalites",
  assunto: "ass-meningites",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "guia-vigilancia-meningites", texto: "Ministério da Saúde — Guia de Vigilância em Saúde (doença meningocócica e outras meningites): definição de caso, quimioprofilaxia, notificação", lidoEm: null },
    { id: "idsa-meningite-bacteriana", texto: "IDSA — Practice Guidelines for Bacterial Meningitis (2004) e diretrizes europeias ESCMID (2016): antibiótico empírico por idade, corticoide, tomografia antes da punção", lidoEm: null },
    { id: "sbp-meningites", texto: "Sociedade Brasileira de Pediatria e Sociedade Brasileira de Infectologia — documentos de meningite bacteriana e viral na infância", lidoEm: null },
    { id: "pcdt-hiv-adultos", texto: "Ministério da Saúde — PCDT para Manejo da Infecção pelo HIV em Adultos e Manual de Infecções Oportunistas (criptococose)", lidoEm: null },
    { id: "idsa-encefalite", texto: "IDSA — Management of Encephalitis (2008): encefalite herpética, PCR do líquor e aciclovir", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas pela banca (gabarito do material de origem em desacordo com a literatura ou mais de uma alternativa correta)", questoes: ["q-gdmeningites-017","q-gdmeningites-035","q-gdmeningites-090","q-gdmeningites-091","q-gdmeningites-092","q-gdmeningites-095","q-gdmeningites-098","q-gdmeningites-104","q-gdmeningites-113","q-gdmeningites-130","q-gdmeningites-162","q-gdmeningites-176"] },
  ],
  doencas: [
    {
      id: "sindrome", titulo: "Síndrome meníngea, líquor e primeira conduta",
      introducao: `A **meningite** é a inflamação das meninges, e o **líquor** mostra qual agente a causa. [[A inflamação das meninges irrita as raízes e dá **rigidez de nuca, sinais de Kernig e de Brudzinski**, com cefaleia, febre e vômitos; mas esses sinais **faltam em muitos casos e idades** (principalmente no recém-nascido), e por isso o diagnóstico depende do **líquor**.|q-gdmeningites-001,q-gdmeningites-079,q-gdmeningites-115]] Em toda suspeita de meningite bacteriana a regra é a mesma: **o antibiótico não espera o exame**.

Veja também: **Convulsão febril** (quando a crise com febre exige punção), **HIV/aids** (criptococose e neurotoxoplasmose), **Tuberculose** (forma meníngea), **Infecções congênitas e perinatais** (meningite neonatal), **Sepse** e **Imunização** (vacinas conjugadas).`,
      fragmentos: [
        { id: "sind-clinica", titulo: "Quadro clínico, sinais meníngeos e diagnósticos diferenciais", conferir: true, diretrizes: ["guia-vigilancia-meningites"],
          questoes: ["q-amrigs2023-069","q-gdmeningites-001","q-gdmeningites-079","q-gdmeningites-127","q-gdmeningites-115","q-gdmeningites-015","q-gdmeningites-110","q-gdmeningites-128","q-usp2024-020","q-gdmeningites-148"],
          prosa: `[[**Kernig, Brudzinski e rigidez de nuca** são os sinais de **irritação meningorradicular** (o **sinal de Lázaro** é reflexo espinhal de morte encefálica e não pertence ao grupo); eles têm **alta especificidade**, mas **não aparecem na maioria dos casos em todas as idades**, e o diagnóstico **não é só clínico**: exige a análise do líquor.|q-amrigs2023-069,q-gdmeningites-001,q-gdmeningites-127,q-gdmeningites-079]] [[No **recém-nascido** a rigidez de nuca é pouco frequente: o quadro é **inespecífico** (vômitos, letargia, recusa alimentar e **abaulamento da fontanela**), porque a fontanela aberta e a imaturidade neurológica atenuam a rigidez.|q-gdmeningites-115,q-amrigs2023-071]] [[A **cefaleia de início súbito, em minutos**, com fotofobia e rigidez de nuca é **hemorragia subaracnóidea**, e não meningite; a **criança com febre e crise convulsiva** que fica **sonolenta, com crise prolongada ou nova crise** ou com comprometimento do estado geral depois da crise **não tem convulsão febril simples** e precisa de líquor.|q-gdmeningites-015,q-usp2024-020,q-gdmeningites-148]]`,
          texto: `- Sinais de irritação meningorradicular: Kernig, Brudzinski, rigidez de nuca; **Lázaro não** (reflexo de morte encefálica). {q-amrigs2023-069}
- Kernig, Brudzinski e rigidez **não estão presentes na maioria** dos casos em todas as faixas etárias. {q-gdmeningites-001}
- Kernig e Brudzinski têm **alta especificidade** (baixa sensibilidade). {q-gdmeningites-127}
- O diagnóstico **não é exclusivamente clínico**: exige o líquor. {q-gdmeningites-079}
- Recém-nascido: **rigidez de nuca é o sinal menos provável**; vômito, letargia e fontanela abaulada são comuns. {q-gdmeningites-115}
- Cefaleia de início súbito em 15 minutos, fotofobia e rigidez: **hemorragia subaracnóidea**. {q-gdmeningites-015}
- Escolar com febre, vômitos, cefaleia, sonolência e rigidez de nuca, líquor com 1.290 células (92 % polimorfonucleares): **meningite**. {q-gdmeningites-110}
- Criança vacinada com febre, cefaleia, prostração, fotofobia e sinais meníngeos: **exame de líquor**. {q-gdmeningites-128}
- Criança de 2 anos com febre alta, prostração, crise de 10 minutos e nova crise: **coletar líquor**. {q-usp2024-020}
- Contra convulsão febril: **sonolência persistente e mau estado geral** depois da crise. {q-gdmeningites-148}` },
        { id: "liquor", titulo: "O líquor por causa: bacteriana, viral e outras", conferir: true, diretrizes: ["guia-vigilancia-meningites"],
          questoes: ["q-inf-13","q-scmsp2025-060","q-amrigs2023-061","q-amrigs2024-076","q-sessp2024-043","q-gdmeningites-013","q-gdmeningites-037","q-gdmeningites-041","q-gdmeningites-067","q-gdmeningites-089","q-gdmeningites-114","q-gdmeningites-118","q-gdmeningites-140","q-gdmeningites-164","q-gdmeningites-170","q-gdmeningites-156","q-fmabc2023-001"],
          prosa: `[[Na **meningite bacteriana** o líquor é **turvo**, com **pressão de abertura aumentada, centenas a milhares de células com predomínio de neutrófilos, glicose baixa e proteína alta**: a bactéria e os leucócitos consomem glicose e o transporte pela barreira cai (**hipoglicorraquia**), e a inflamação rompe a barreira hematoencefálica e eleva a proteína; a prova das globulinas (Pandy) é positiva, e o **lactato fica alto**.|q-scmsp2025-060,q-amrigs2023-061,q-amrigs2024-076,q-sessp2024-043,q-gdmeningites-013,q-gdmeningites-037,q-gdmeningites-114,q-gdmeningites-118,q-gdmeningites-140,q-gdmeningites-164,q-fmabc2023-001]] [[A **glicose baixa** também aparece na tuberculose e nas micoses, mas **não na encefalite herpética**, em que ela é normal; no **vírus**, o líquor tem **pleocitose com linfócitos, glicose normal e proteína normal ou pouco elevada**; e o **lactente** com meningite tem proteína **aumentada**, e não diminuída.|q-inf-13,q-gdmeningites-041,q-gdmeningites-156,q-gdmeningites-170]] [[Na **meningite pneumocócica** o líquor é turvo, com centenas de células e neutrófilos, e o Gram mostra diplococos Gram-positivos; no **imunodeprimido** o padrão purulento (1.200 células, 93 % de neutrófilos, glicose 20) segue sendo bacteriano.|q-gdmeningites-067,q-gdmeningites-089]]`,
          texto: `- Meningite viral: **pleocitose linfocitária, glicose normal e proteína normal ou pouco aumentada**. {q-inf-13}
- Bacteriana: **pleocitose neutrofílica e hipoglicorraquia** (proteína alta). {q-scmsp2025-060}
- Pressão de abertura de 210 mmH2O, 1.100 células com neutrófilos, glicose e proteína alterada: **bacteriana aguda**. {q-amrigs2023-061}
- Líquor típico com glicemia de 90: **1.000 células (80 % de neutrófilos), glicose de 10 e proteína de 180**. {q-amrigs2024-076}
- 1.120 leucócitos com sinais meníngeos: **meningite bacteriana**. {q-sessp2024-043}
- 300 células com 70 % de polimorfonucleares e glicose de 20: **bacteriana**. {q-gdmeningites-013}
- 330 células, 88 % de neutrófilos, glicose baixa e lactato elevado: **bacteriana**. {q-gdmeningites-037}
- **Glicose baixa** na bacteriana, na tuberculosa e na fúngica; a **encefalite herpética** é a exceção (glicose normal). {q-gdmeningites-041}
- Meningite pneumocócica: líquor turvo, 600 células, 90 % de neutrófilos, **diplococos Gram-positivos**. {q-gdmeningites-067}
- Imunodeprimido com líquor turvo, 1.200 células (93 % de neutrófilos), proteína de 200 e glicose de 20: **bacteriana**. {q-gdmeningites-089}
- Na meningite bacteriana: **proteína elevada**, glicose baixa e pressão aumentada. {q-gdmeningites-114}
- **Globulinas positivas** (Pandy) na bacteriana. {q-gdmeningites-118}
- Proteína aumentada, glicose diminuída e **celularidade à custa de neutrófilos**. {q-gdmeningites-140}
- Glicorraquia baixa, proteinorraquia aumentada, leucócitos aumentados com **polimorfonucleares**. {q-gdmeningites-164}
- Lactente com febre, fontanela abaulada e prostração: o que **não** se espera é **proteína diminuída**. {q-gdmeningites-170}
- 400 células, glicose de 60 e proteína de 51: **herpes simples** (viral). {q-gdmeningites-156}
- Meningocócica: mais de 1.000 células com neutrófilos, **glicose abaixo de 40 e proteína acima de 100**. {q-fmabc2023-001}` },
        { id: "conduta-inicial", titulo: "Primeira conduta: antibiótico, tomografia e punção", conferir: true, diretrizes: ["idsa-meningite-bacteriana"],
          figuras: [{ arquivo: "figuras/conduta-inicial.svg", legenda: "Esquema autoral: quando o antibiótico vai antes da tomografia e da punção." }],
          questoes: ["q-famema2022-093","q-fmabc2025-020","q-gdmeningites-006","q-gdmeningites-007","q-gdmeningites-039","q-gdmeningites-051","q-gdmeningites-052","q-gdmeningites-054","q-gdmeningites-074"],
          prosa: `A meningite bacteriana mata e deixa sequela em proporção ao **tempo até o antibiótico**: a mortalidade sobe a cada hora de atraso. [[Sem sinais de hipertensão intracraniana, colhe-se a **hemocultura e o líquor** e o **antibiótico vem logo em seguida**; com **edema de papila, crise convulsiva, déficit focal, rebaixamento ou choque**, o certo é **colher hemocultura, dar o antibiótico venoso e fazer a tomografia depois**, e só puncionar se a tomografia liberar, porque a punção com massa ou edema pode causar herniação.|q-gdmeningites-039,q-gdmeningites-052,q-gdmeningites-051,q-gdmeningites-074,q-fmabc2025-020,q-famema2022-093]] [[O paciente com **rebaixamento e febre** recebe o esquema empírico completo na hora, com a **dexametasona** junto ou antes da primeira dose; o adulto jovem com **sepse** (taquicardia, taquipneia, hipotensão) recebe suporte, corticoide e ceftriaxona; e a **agitação e a febre alta com petéquias** não são surto psiquiátrico: pedem tomografia, líquor e ceftriaxona em dose de meningite com aciclovir.|q-gdmeningites-006,q-gdmeningites-054,q-gdmeningites-007]]`,
          texto: `- Antibiótico **logo após a punção lombar e a hemocultura**, o mais cedo possível. {q-gdmeningites-039,q-gdmeningites-052}
- Edema de papila: **antibiótico imediato**, transferir para tomografia e puncionar se não houver hipertensão intracraniana. {q-gdmeningites-051}
- Crise, torpor, hipotensão e rigidez: **hemocultura e antibiótico venoso antes da tomografia**. {q-gdmeningites-074}
- Idoso com cefaleia, febre, rigidez e crise convulsiva: **tomografia, depois punção e antibiótico**. {q-fmabc2025-020}
- Sinusites de repetição, letargia, bradicardia relativa e rigidez: **tomografia de crânio** antes do líquor. {q-famema2022-093}
- Rebaixamento com rigidez e tomografia normal: **ceftriaxona, vancomicina, aciclovir e dexametasona** imediatamente. {q-gdmeningites-006}
- Adulto jovem com sinais de sepse: **suporte, corticoide e ceftriaxona**. {q-gdmeningites-054}
- Agitação, febre de 39,7 °C e petéquias: **tomografia, líquor, ceftriaxona 4 g/dia e aciclovir**. {q-gdmeningites-007}` },
      ],
    },
    {
      id: "bacteriana", titulo: "Meningite bacteriana",
      introducao: `[[A **idade** e o **estado imune** definem o agente e, portanto, o antibiótico: no **recém-nascido** vêm da flora materna (estreptococo do grupo B, *E. coli*, *Listeria*); depois de 3 meses predominam **meningococo, pneumococo e *Haemophilus***; no **idoso e no imunossuprimido** entra a ***Listeria***.|q-unesp2021-020,q-gdmeningites-055,q-gdmeningites-058,q-gdmeningites-008]]`,
      fragmentos: [
        { id: "etiologia", titulo: "Agente por idade, Gram e situação clínica", conferir: true, diretrizes: ["idsa-meningite-bacteriana"],
          questoes: ["q-unesp2021-020","q-amrigs2023-071","q-gdmeningites-055","q-gdmeningites-058","q-gdmeningites-019","q-gdmeningites-048","q-gdmeningites-121","q-gdmeningites-139","q-gdmeningites-144","q-gdmeningites-165","q-gdmeningites-004","q-gdmeningites-008","q-gdmeningites-064","q-gdmeningites-066","q-gdmeningites-014","q-gdmeningites-169","q-fmabc2024-056","q-unicamp2022-016","q-unicampdis2025-056","q-sessp2022-058","q-gdmeningites-005","q-gdmeningites-022","q-gdmeningites-160","q-tp20252-090","q-gdmeningites-030","q-gdmeningites-125"],
          prosa: `[[No **período neonatal** o agente vem do **trato genital materno** (estreptococo do grupo B, *E. coli*, *Listeria*); acima de 3 meses são **meningococo, pneumococo e *Haemophilus influenzae***, e no Brasil, **fora do período neonatal, o meningococo** é o agente mais citado; o pneumococo é a causa mais comum **adquirida na comunidade** em adultos e idosos.|q-unesp2021-020,q-amrigs2023-071,q-gdmeningites-055,q-gdmeningites-058,q-gdmeningites-144,q-gdmeningites-165,q-gdmeningites-019,q-gdmeningites-048]] [[**Esplenectomizado** (esferocitose) tem meningite pneumocócica, porque o baço retira as bactérias encapsuladas; **derivação ventriculoperitoneal** traz **estafilococos** (coagulase-negativo e *aureus*); e a **Listeria** é a causa do **idoso institucionalizado**, do imunossuprimido e do paciente com câncer em quimioterapia, com líquor purulento e **bacilos Gram-positivos**.|q-gdmeningites-121,q-gdmeningites-139,q-gdmeningites-004,q-gdmeningites-008,q-gdmeningites-064,q-gdmeningites-066,q-gdmeningites-014]] [[O **Gram** orienta: **diplococos Gram-negativos** são meningococo (petéquias, choque) e **diplococos Gram-positivos** são pneumococo (sinusite, otite, antibiótico prévio, idoso, diabético).|q-gdmeningites-005,q-gdmeningites-022,q-gdmeningites-160,q-gdmeningites-169,q-fmabc2024-056,q-unicamp2022-016,q-unicampdis2025-056,q-sessp2022-058,q-tp20252-090]]`,
          texto: `- Neonatos: **E. coli, Listeria e estreptococo do grupo B**. {q-unesp2021-020}
- Lactente de 2 meses com 340 células e fontanela abaulada: ***E. coli***. {q-amrigs2023-071}
- De 0 a 2 meses o mais provável é o **estreptococo do grupo B**. {q-gdmeningites-055}
- Acima de 3 meses: **N. meningitidis**, pneumococo e *H. influenzae*. {q-gdmeningites-058}
- Causa mais comum da meningite bacteriana comunitária: **Streptococcus pneumoniae**. {q-gdmeningites-019}
- Idoso com meningite aguda comunitária: **pneumococo**. {q-gdmeningites-048}
- Esplenectomizado por esferocitose: **pneumococo**. {q-gdmeningites-121}
- Derivação ventriculoperitoneal: **estafilococo coagulase-negativo e *aureus***. {q-gdmeningites-139}
- No período neonatal, os agentes vêm do **trato genital materno**. {q-gdmeningites-144}
- No Brasil, fora do período neonatal, **N. meningitidis**. {q-gdmeningites-165}
- Idoso institucionalizado, líquor purulento e glicose 16: ***Listeria***; **ampicilina**. {q-gdmeningites-004}
- Bacilos Gram-positivos em idosa: **Listeria**. {q-gdmeningites-008}
- Idoso com câncer em quimioterapia e Gram com bacilos: **Listeria e ampicilina**. {q-gdmeningites-064}
- Idosa diabética com doença renal e abscesso temporal: **ampicilina** (Listeria). {q-gdmeningites-066}
- A ampicilina entra pela **idade acima de 50 anos** (Listeria). {q-gdmeningites-014}
- **Diplococos Gram-negativos** no líquor: **Neisseria meningitidis**. {q-gdmeningites-005,q-gdmeningites-160}
- Diplococos Gram-positivos com 1.500 células: **pneumococo** (sem profilaxia). {q-gdmeningites-169}
- Jovem com 27 mil células e glicose de 8, diplococos Gram-negativos: **meningococo**. {q-gdmeningites-022}
- Pré-escolar com 1.250 células: **Streptococcus pneumoniae**. {q-fmabc2024-056}
- Adulto hígido com sinusite e otite prévias: **S. pneumoniae**. {q-unicamp2022-016}
- Mulher de 63 anos diabética com Kernig e sonolência: **pneumococo**. {q-unicampdis2025-056}
- Líquor purulento com diplococos: **sorogrupos A, B, C, Y e W** causam a maioria das doenças meningocócicas invasivas. {q-sessp2022-058}
- Criança com início súbito, fotofobia e vômito em jato; Gram: ***Neisseria***. {q-tp20252-090}
- Adulto jovem com 5.050 células, 85 % de polimorfonucleares e glicose de 26: **meningite bacteriana aguda**, por **meningococo ou pneumococo**. {q-gdmeningites-030}
- Escolar com 500 leucócitos (90 % de neutrófilos): ***Neisseria meningitidis*, penicilina cristalina** (a prova). {q-gdmeningites-125}` },
        { id: "tratamento", titulo: "Antibiótico empírico, dexametasona e duração", conferir: true, diretrizes: ["idsa-meningite-bacteriana"],
          casos: ["q-tp20232-024"],
          questoes: ["q-inf-11","q-famema2025-001","q-sirio2024-015","q-sirio2026-020","q-tp20232-024","q-unicampdis2024-069","q-tp20241-018","q-gdmeningites-029","q-gdmeningites-053","q-gdmeningites-057","q-gdmeningites-062","q-gdmeningites-082","q-gdmeningites-102","q-gdmeningites-157","q-gdmeningites-173","q-gdmeningites-175","q-gdmeningites-178","q-gdmeningites-010","q-gdmeningites-021","q-gdmeningites-093","q-gdmeningites-077","q-gdmeningites-109","q-gdmeningites-146","q-gdmeningites-034","q-gdmeningites-024","q-gdmeningites-132","q-gdmeningites-163","q-gdmeningites-117","q-gdantibioticos-085"],
          prosa: `[[O esquema empírico depende da idade: **abaixo de 2 meses**, **cefotaxima mais ampicilina** (ou ampicilina com gentamicina), que cobre grupo B, *E. coli* e *Listeria*; **de 1 a 3 meses**, ceftriaxona com ampicilina; **de 3 meses até 50 anos**, **ceftriaxona** (2 g de 12 em 12 horas no adulto), com **vancomicina** quando há risco de pneumococo resistente (mais de 30 % das amostras não são suscetíveis à penicilina); **acima de 50 anos ou imunossuprimido**, soma-se **ampicilina** (a *Listeria* é intracelular e resistente à cefalosporina); com CIM muito alta aos betalactâmicos, a **vancomicina** é a droga que não depende das proteínas ligadoras alteradas.|q-gdmeningites-010,q-gdmeningites-021,q-gdmeningites-077,q-gdmeningites-093,q-gdmeningites-029,q-gdmeningites-053,q-gdmeningites-057,q-gdmeningites-082,q-gdmeningites-102,q-gdmeningites-157,q-gdmeningites-173,q-gdmeningites-178,q-gdmeningites-163,q-gdmeningites-175,q-sirio2024-015,q-sirio2026-020,q-gdmeningites-132,q-tp20232-024]] [[A **ceftriaxona** é o padrão da meningite comunitária; a **penicilina cristalina** é a escolha histórica para o meningococo e, na alergia grave a betalactâmicos, o **cloranfenicol** substitui; os **aminoglicosídeos** não se usam na criança acima de 3 meses, porque **atravessam mal a barreira hematoencefálica** (só no período neonatal, com ampicilina); e a **Listeria** se trata com **ampicilina ou penicilina com gentamicina por 21 dias**.|q-gdmeningites-062,q-gdmeningites-034,q-gdmeningites-109,q-gdmeningites-146,q-gdmeningites-117,q-gdantibioticos-085]] [[A **dexametasona** é dada **antes ou junto da primeira dose** do antibiótico (0,15 mg/kg a cada 6 horas) porque reduz a inflamação liberada com a lise bacteriana e as sequelas, sobretudo a **perda auditiva**, e benefício comprovado é na meningite **pneumocócica** (e por *Haemophilus*); na meningocócica ela é **suspensa**; e a duração do antibiótico depende do agente (pneumococo de 10 a 14 dias, meningococo de 5 a 7, *Listeria* 21).|q-inf-11,q-famema2025-001,q-unicampdis2024-069,q-tp20241-018,q-gdmeningites-024]]`,
          texto: `- Meningite bacteriana com líquor de neutrófilos e glicose baixa: **antibiótico venoso imediato, com dexametasona** antes ou junto da primeira dose. {q-inf-11}
- Idoso de 62 anos com Kernig e Brudzinski: **ceftriaxona 2 g de 12/12 horas com dexametasona**. {q-famema2025-001}
- Homem de 70 anos com neutrófilos e glicose baixa: **ceftriaxona e ampicilina**. {q-sirio2024-015}
- Mulher de 68 anos com Glasgow 13: **ceftriaxona, ampicilina, vancomicina e dexametasona**. {q-sirio2026-020}
- Sinusopatia, rebaixamento e déficit focal: **ceftriaxona, vancomicina e corticoide**. {q-tp20232-024}
- Meningite com diabetes e confusão: **dexametasona** além do antibiótico. {q-unicampdis2024-069}
- Diplococos Gram-negativos já em ceftriaxona e dexametasona: **suspender a dexametasona** (meningocócica). {q-tp20241-018}
- Adulto jovem: **ceftriaxona 2 g a cada 12 horas mais dexametasona**. {q-gdmeningites-029}
- Diplococos Gram-positivos com 7.000 leucócitos: **ceftriaxona e vancomicina**. {q-gdmeningites-053}
- Pneumococo não suscetível à penicilina em mais de 30 %: **ceftriaxona (com vancomicina)**. {q-gdmeningites-057}
- Padrão do tratamento da meningite bacteriana aguda: **ceftriaxona**. {q-gdmeningites-062}
- Associar à cefalosporina de terceira geração a **vancomicina**. {q-gdmeningites-082}
- Pneumococo com CIM muito elevada: **vancomicina**. {q-gdmeningites-102}
- Esquema empírico para meningococo, pneumococo e *H. influenzae* em criança: **ceftriaxona**. {q-gdmeningites-157,q-gdantibioticos-085}
- Adulto hígido: **ceftriaxona (ou cefotaxima) mais vancomicina**. {q-gdmeningites-173}
- Acima de 65 anos: acrescentar **aminopenicilina** (Listeria). {q-gdmeningites-175}
- Jovem em uso de amoxicilina, líquor com glicose 22: **ceftriaxona**. {q-gdmeningites-178}
- Menor de 2 meses: **cefotaxima mais ampicilina**. {q-gdmeningites-010,q-gdmeningites-021}
- De 1 a menos de 3 meses: **ceftriaxona mais ampicilina**. {q-gdmeningites-093}
- Recém-nascido de 12 dias com líquor purulento: **ampicilina e gentamicina**. {q-gdmeningites-077}
- Meningite meningocócica com anafilaxia a betalactâmicos: **cloranfenicol**. {q-gdmeningites-109}
- **Aminoglicosídeos** não são usados na meningite bacteriana da criança acima de 3 meses. {q-gdmeningites-146}
- Penicilina cristalina é o fármaco de escolha na suspeita de meningite meningocócica (referência antiga). {q-gdmeningites-034}
- Duração mínima do antibiótico na meningite sem complicação: **14 dias** (referência adotada). {q-gdmeningites-024}
- Homem de 58 anos com sinusite prévia: **ceftriaxona e ampicilina**. {q-gdmeningites-132}
- Adolescente com Brudzinski e 1.000 células: **meningite bacteriana e ceftriaxona**. {q-gdmeningites-163}
- Líquor purulento com bacilos Gram-positivos: **ampicilina (ou penicilina) com gentamicina por 21 dias**. {q-gdmeningites-117}` },
        { id: "complicacoes", titulo: "Complicações e seguimento", conferir: true, diretrizes: ["idsa-meningite-bacteriana"],
          questoes: ["q-gdmeningites-009","q-gdmeningites-036","q-gdmeningites-105","q-gdmeningites-136","q-gdmeningites-159","q-gdmeningites-177","q-gdmeningites-149"],
          prosa: `[[A complicação neurológica **mais frequente** depois da meningite bacteriana é a **perda auditiva neurossensorial** (a inflamação lesa a cóclea); **hidrocefalia** por exsudato que bloqueia a reabsorção do líquor aparece com cefaleia e vômitos no curso do tratamento e se resolve com **derivação ventricular**; a **coleção subdural** é a explicação da **febre persistente com bom estado geral e líquor esterilizado** no lactente com meningite pneumocócica, confirmada por imagem; e a **febre tardia da meningite meningocócica com líquor normal** é **imunomediada** (artrite, pericardite) e **não pede troca de antibiótico**.|q-gdmeningites-177,q-gdmeningites-036,q-gdmeningites-159,q-gdmeningites-105,q-gdmeningites-149]] [[Uma **segunda punção** com 48 horas só se justifica quando **não há melhora clínica**; e a **pneumonia com empiema não é complicação** da meningite.|q-gdmeningites-136,q-gdmeningites-009]]`,
          texto: `- A pneumonia com empiema **não** é complicação típica da meningite. {q-gdmeningites-009}
- Cefaleia e vômitos no 5º dia com ventrículos dilatados: **derivação ventricular**. {q-gdmeningites-036}
- Febre no 5º dia com líquor normal e cultura negativa na meningocócica: **considerar curado** (febre imunomediada). {q-gdmeningites-105}
- Nova punção após 48 horas: **ausência de melhora clínica**. {q-gdmeningites-136}
- Lactente pneumocócico com febre diária e líquor melhorando: **coleção subdural**, tomografia. {q-gdmeningites-159}
- Complicação neurológica mais frequente após meningite: **perda auditiva**. {q-gdmeningites-177}
- Complicações a citar: hidrocefalia, coleção subdural, perda auditiva, convulsões recorrentes e epilepsia. {q-gdmeningites-149}` },
      ],
    },
    {
      id: "meningococica", titulo: "Doença meningocócica e quimioprofilaxia",
      introducao: `O **meningococo** (*Neisseria meningitidis*, diplococo Gram-negativo) coloniza a nasofaringe e passa **por gotículas**: [[o portador assintomático pode transmitir e adoecer; a doença invasiva vai da **febre transitória e bacteremia** à **meningococcemia fulminante com morte em horas**, e a meningite é a forma mais frequente; o risco de quem mora com o doente é cerca de **500 a 800 vezes maior** que o da população.|q-gdmeningites-040,q-gdmeningites-042,q-gdmeningites-063]] A **quimioprofilaxia** erradica o meningococo da nasofaringe do contato e previne **casos secundários**, que são raros e ocorrem sobretudo nas **primeiras 48 horas**.`,
      fragmentos: [
        { id: "doenca-meningococica", titulo: "Meningococcemia, Waterhouse-Friderichsen e diagnóstico", conferir: true, diretrizes: ["guia-vigilancia-meningites"],
          questoes: ["q-gdmeningites-031","q-gdmeningites-032","q-gdmeningites-134","q-gdmeningites-063","q-gdmeningites-040","q-gdmeningites-042","q-gdmeningites-075","q-gdmeningites-076","q-gdmeningites-126","q-gdmeningites-122","q-gdmeningites-116","q-gdmeningites-147","q-gdmeningites-119","q-gdmeningites-155","q-gdmeningites-123","q-amrigs2022-068","q-gdmeningites-087"],
          prosa: `[[A **meningococcemia** é a forma mais grave: febre alta com **petéquias e equimoses extensas, choque e coagulopatia**, em horas, às vezes depois de uma faringite; a **síndrome de Waterhouse-Friderichsen** é a **septicemia meningocócica, com ou sem meningite, que cursa com choque, coagulação intravascular disseminada e falência aguda das suprarrenais** (hemorragia da adrenal).|q-gdmeningites-075,q-gdmeningites-122,q-gdmeningites-116,q-gdmeningites-031,q-gdmeningites-087,q-gdmeningites-032,q-gdmeningites-134]] [[O risco aumenta com **asplenia (anatômica ou funcional) e deficiências do complemento** (properdina, C3, C5 a C9), e a doença é mais frequente no **outono e no inverno**; o tratamento do doente com alguns antibióticos (como a penicilina) **não elimina o meningococo da nasofaringe**, e por isso o próprio paciente recebe quimioprofilaxia antes da alta, a menos que tenha usado ceftriaxona.|q-gdmeningites-040,q-gdmeningites-063,q-gdmeningites-123,q-gdmeningites-042]] [[O diagnóstico se confirma por **cultura** (padrão de referência), **aglutinação pelo látex** e **PCR**; o **Doppler transcraniano não é exame diagnóstico**; o tratamento é **ceftriaxona (ou penicilina cristalina)** e a **dexametasona** não se mantém quando o agente é o meningococo; e a **vacinação incompleta** (bactéria capsulada e imunoprevenível) é fator importante.|q-gdmeningites-119,q-gdmeningites-147,q-gdmeningites-155,q-gdmeningites-076,q-gdmeningites-126,q-amrigs2022-068]]`,
          texto: `- Febre, rigidez, petéquias difusas, PA 85x50 e diplococos: ***Neisseria meningitidis*, ceftriaxona 2 g de 12/12 horas**. {q-gdmeningites-031}
- Waterhouse-Friderichsen é **septicemia meningocócica**, com ou sem meningite, com choque, CIVD e hemorragia das suprarrenais. {q-gdmeningites-032}
- Falência aguda das suprarrenais (Waterhouse-Friderichsen): **meningococcemia**. {q-gdmeningites-134}
- **Asplenia anatômica ou funcional** e deficiências do complemento aumentam o risco (não só a asplenia anatômica). {q-gdmeningites-040,q-gdmeningites-063}
- A afirmativa de que o antibiótico elimina a bactéria da nasofaringe em 72 horas é a que **não** se aceita: o doente também recebe profilaxia antes da alta, salvo se usou ceftriaxona. {q-gdmeningites-042}
- Faringite não exsudativa que evolui em 6 horas para choque, petéquias e equimoses: **meningococcemia**. {q-gdmeningites-075}
- Se a CIM da penicilina é menor que 0,1, **manter ceftriaxona** é a afirmativa incorreta (a penicilina cristalina é eficaz). {q-gdmeningites-076,q-gdmeningites-126}
- Calafrios, queda do estado geral, petéquias e leucocitose de 18.300: **meningococcemia**. {q-gdmeningites-122}
- Febre alta de 6 horas, vômitos, petéquias em criança: **meningococcemia e líquor**. {q-gdmeningites-116}
- Menor de 15 anos com petéquias e diplococos Gram-negativos: **cefalosporina de terceira geração** precoce. {q-gdmeningites-147}
- Exames: **PCR, látex e cultura**; Doppler transcraniano não. {q-gdmeningites-119}
- Meningite por meningococo: **penicilina**. {q-gdmeningites-155}
- A doença tem **maior incidência no outono e no inverno**. {q-gdmeningites-123}
- Pré-escolar com Kernig, hipotensão e púrpura, vacina desatualizada: **N. meningitidis** (imunoprevenível), diplococos Gram-**negativos**. {q-amrigs2022-068}
- Criança de 11 anos com purpúra, choque e líquor purulento: ***Neisseria meningitidis***. {q-gdmeningites-087}` },
        { id: "isolamento", titulo: "Isolamento e notificação", conferir: true, diretrizes: ["guia-vigilancia-meningites"],
          questoes: ["q-gdmeningites-056","q-gdmeningites-081","q-gdsepse-001","q-gdmeningites-107"],
          prosa: `[[A meningite bacteriana (meningococo e *Haemophilus b*) se transmite por gotículas respiratórias, por isso a **precaução é respiratória por gotículas**, mantida **nas primeiras 24 horas do antibiótico efetivo**; a doença é de **notificação compulsória**, com **vigilância dos contatos por 10 dias**.|q-gdmeningites-056,q-gdmeningites-081,q-gdsepse-001,q-gdmeningites-107]]`,
          texto: `- Meningite bacteriana aguda: **precaução respiratória por gotículas**. {q-gdmeningites-056}
- Criança com petéquias e Brudzinski: **isolamento respiratório nas primeiras 24 horas**. {q-gdmeningites-081}
- Suspender o isolamento respiratório **24 horas depois do início do antibiótico**. {q-gdsepse-001}
- Isolamento só nas primeiras 24 horas, notificação compulsória e vigilância por 10 dias; a quimioprofilaxia é só para contatos íntimos (com rifampicina). {q-gdmeningites-107}` },
        { id: "quimio-quem", titulo: "Quimioprofilaxia: quem recebe", conferir: true, diretrizes: ["guia-vigilancia-meningites"],
          figuras: [{ arquivo: "figuras/quimioprofilaxia.svg", legenda: "Esquema autoral: quem recebe, quem não recebe e com quê." }],
          questoes: ["q-unifesp2023-072","q-usp2022-029","q-famema2021-097","q-unicamp2023-006","q-fmabc2024-095","q-usprp2027-082","q-inf-12","q-gdmeningites-002","q-gdmeningites-020","q-gdmeningites-043","q-gdmeningites-049","q-gdmeningites-083","q-gdmeningites-088","q-gdmeningites-097","q-gdmeningites-108","q-gdmeningites-124","q-gdmeningites-133","q-gdmeningites-153","q-gdmeningites-168","q-gdmeningites-174","q-gdmeningites-027","q-gdmeningites-086"],
          prosa: `[[A quimioprofilaxia vai aos **contatos íntimos e prolongados**: **moradores do mesmo domicílio** (vacinados ou não, adultos e crianças), quem **divide o dormitório**, **crianças e professora da mesma sala de creche ou escola**, e quem teve **contato direto com secreção da boca ou do nariz sem proteção** (o médico que intubou, ou quem fez respiração boca a boca); **não** vai a quem só dividiu a sala de espera, ao colega da escola fora da sala, à equipe que examinou com máscara, nem aos contatos de meningite **pneumocócica**.|q-unifesp2023-072,q-usp2022-029,q-famema2021-097,q-unicamp2023-006,q-fmabc2024-095,q-usprp2027-082,q-gdmeningites-049,q-gdmeningites-097,q-gdmeningites-133,q-gdmeningites-168,q-gdmeningites-174,q-gdmeningites-020,q-gdmeningites-083]] [[A indicação é **mais precoce possível** (ideal em 24 a 48 horas), vale até **14 dias** do caso índice, e o objetivo é **tratar o portador**, e não tratar doença; ela é para **meningococo e *Haemophilus influenzae b***; os **casos secundários são raros e se concentram nas primeiras 48 horas**.|q-inf-12,q-gdmeningites-002,q-gdmeningites-043,q-gdmeningites-088,q-gdmeningites-108,q-gdmeningites-124,q-gdmeningites-153,q-gdmeningites-027,q-gdmeningites-086]]`,
          texto: `- Contatos domiciliares próximos de caso confirmado: **quimioprofilaxia o mais precocemente possível**. {q-inf-12}
- Quimioprofilaxia: previne **casos secundários**, raros, nas primeiras 48 horas. {q-gdmeningites-002}
- Lactente, pais, irmão, **creche (alunos e professoras)** e madrinha, **rifampicina por 2 dias**. {q-unifesp2023-072}
- Morador de casa (adultos e crianças): **rifampicina**; colegas de trabalho não. {q-usp2022-029}
- Criança que faltou à creche há uma semana: **só os pais e o irmão** (sem o médico com EPI). {q-famema2021-097}
- Quatro estudantes na casa: **todos recebem** ceftriaxona, iniciada até 14 dias do caso. {q-unicamp2023-006}
- **Médico que intubou** por 5 minutos é quem mais se beneficia. {q-fmabc2024-095}
- Creche com 3 salas: **crianças e professora da sala do paciente**. {q-usprp2027-082}
- Idosos que dividiram a sala de espera **não** recebem. {q-gdmeningites-020}
- Rifampicina é indicada nos contatos de meningite **meningocócica e por Haemophilus tipo b**. {q-gdmeningites-043,q-gdmeningites-124,q-gdmeningites-153}
- Escolar: **contactantes domiciliares e crianças e professora da mesma sala**. {q-gdmeningites-049}
- Contatos de meningite **pneumocócica** não precisam; após 14 dias do contato não há mais indicação (a afirmativa de 72 horas é falsa). {q-gdmeningites-083}
- Assertiva: contato de creche em meio período indiscriminado é **falso**; o objetivo é erradicar o portador (verdadeiro). {q-gdmeningites-088}
- Criança de 18 meses com petéquias: **rifampicina por 2 dias** para pais, irmã, cuidadora e colegas da sala. {q-gdmeningites-097}
- Na meningite por *H. influenzae* **todos os domiciliados** (adultos e crianças) recebem. {q-gdmeningites-108}
- Criança de 3 anos com petéquias: **todos os contatos domiciliares**. {q-gdmeningites-133}
- Jovem de 16 anos estável: **rifampicina por 2 dias para todos os familiares**. {q-gdmeningites-168}
- Esposa de quem morreu de meningococcemia: **ceftriaxona em dose única**. {q-gdmeningites-174}
- Criança de 2 anos com petéquias: **rifampicina por 2 dias** para todos os contactantes intradomiciliares. {q-gdmeningites-027}
- Menina com diplococos Gram-negativos: **meningococo e rifampicina**. {q-gdmeningites-086}` },
        { id: "quimio-drogas", titulo: "Quimioprofilaxia: com quê", conferir: true, diretrizes: ["guia-vigilancia-meningites"],
          questoes: ["q-gdmeningites-018","q-gdmeningites-025","q-gdmeningites-026","q-gdmeningites-028","q-gdmeningites-069","q-gdmeningites-071","q-gdmeningites-072","q-gdmeningites-100","q-gdmeningites-120","q-gdmeningites-129","q-gdmeningites-135","q-gdmeningites-145","q-gdmeningites-154","q-gdmeningites-167"],
          prosa: `[[A droga preferencial é a **rifampicina** (600 mg de 12 em 12 horas **por 2 dias** no adulto; 10 mg/kg a cada 12 horas na criança), que atinge a nasofaringe e erradica o portador; a alternativa de **dose única** é a **ceftriaxona intramuscular** (125 mg na criança, 250 mg no adulto e **na gestante**) ou o **ciprofloxacino** 500 mg por via oral no adulto; no ***Haemophilus influenzae b*** a rifampicina dura **4 dias**; e a **ampicilina não serve** (não elimina o meningococo da nasofaringe).|q-gdmeningites-100,q-gdmeningites-167,q-gdmeningites-135,q-gdmeningites-069,q-gdmeningites-026,q-gdmeningites-120,q-gdmeningites-025,q-gdmeningites-071,q-gdmeningites-129,q-gdmeningites-145,q-gdmeningites-154,q-gdmeningites-018,q-gdmeningites-072,q-gdmeningites-028]]`,
          texto: `- Drogas **não** indicadas para a profilaxia: **ampicilina**. {q-gdmeningites-018}
- Contactantes adultos em 24 horas: **ciprofloxacino**. {q-gdmeningites-025,q-gdmeningites-071}
- Lactentes comunicantes, sem rifampicina: **ceftriaxona intramuscular em dose única**, independentemente da vacina. {q-gdmeningites-026}
- Adulto jovem: **rifampicina 600 mg de 12/12 horas por 2 dias**, nas primeiras 24 horas; alternativa em dose única. {q-gdmeningites-028}
- Menor de 12 anos: **ceftriaxona 125 mg em dose única**. {q-gdmeningites-069}
- Colegas de creche: **rifampicina por 2 dias**. {q-gdmeningites-072}
- Droga preferencial: **rifampicina**. {q-gdmeningites-100}
- Gestante com contato domiciliar: **ceftriaxona**. {q-gdmeningites-120}
- Via oral e dose única: **ciprofloxacino**. {q-gdmeningites-129}
- **Rifampicina 20 mg/kg/dia em 2 doses por 2 dias**, ou ceftriaxona 125 mg (menores de 15 anos) e 250 mg (maiores). {q-gdmeningites-135}
- *Haemophilus* e meningococo: rifampicina por **4 e 2 dias**. {q-gdmeningites-145}
- Droga de escolha para *H. influenzae b*: **rifampicina**. {q-gdmeningites-154}
- Rifampicina **oral por dois dias**. {q-gdmeningites-167}` },
      ],
    },
    {
      id: "viral-herpes", titulo: "Meningite viral e encefalite herpética",
      introducao: `[[Na **meningite viral** (asséptica) a resposta é **linfocitária** e a glicose fica preservada, e o **enterovírus** causa cerca de 85 a 90 % dos casos da criança; na **encefalite**, o parênquima é que está inflamado, com **alteração do comportamento, crise e déficit focal**, e o agente tratável é o **herpes simples**.|q-inf-13,q-gdmeningites-171,q-gdmeningites-038]]`,
      fragmentos: [
        { id: "viral", titulo: "Meningite viral (asséptica)", conferir: true, diretrizes: ["sbp-meningites"],
          questoes: ["q-tp20222-028","q-tp20222-028-ia","q-sessp2025-047","q-scmsp2023-050","q-einstein2026-009","q-gdmeningites-142","q-gdmeningites-171"],
          prosa: `[[A meningite viral tem **cefaleia frontal ou retro-orbitária com fotofobia**, **líquor linfocitário com glicose normal**, e o **enterovírus** é o agente mais comum; o tratamento é de **suporte, com observação e sintomáticos**; e o antibiótico só se mantém por **48 horas, aguardando culturas e painel molecular**, quando há dúvida com meningite bacteriana parcialmente tratada.|q-gdmeningites-142,q-gdmeningites-171,q-tp20222-028,q-tp20222-028-ia,q-sessp2025-047,q-scmsp2023-050,q-einstein2026-009]]`,
          texto: `- Adulta hígida com cefaleia, vômitos, rigidez de nuca e líquor citrino de linfócitos: ***Enterovirus***. {q-tp20222-028,q-tp20222-028-ia}
- Lactente de 9 meses com 300 células (85 % de linfócitos) e glicose preservada: **enterovírus**, observação e sintomáticos. {q-sessp2025-047}
- Criança de 6 anos com 270 células (70 % de linfócitos), proteína 55 e glicose 60: **internação com sintomáticos**. {q-scmsp2023-050}
- Jovem de 26 anos com 153 leucócitos e bioquímica normal: provável meningite viral, **manter antibiótico por 48 horas** aguardando cultura. {q-einstein2026-009}
- **Cefaleia frontal ou retro-orbitária** com fotofobia. {q-gdmeningites-142}
- **Enterovírus**: até 90 % da meningite asséptica da criança. {q-gdmeningites-171}` },
        { id: "herpes", titulo: "Encefalite herpética", conferir: true, diretrizes: ["idsa-encefalite"],
          casos: ["q-unicamp2023-007","q-scmsp2021-055"],
          questoes: ["q-usp2022-005","q-usp2023-057","q-famema2022-031","q-udisc20262-021","q-unicamp2023-007","q-scmsp2021-055","q-gdmeningites-003","q-gdmeningites-016","q-gdmeningites-038","q-gdmeningites-045","q-gdmeningites-050","q-gdmeningites-059","q-gdmeningites-060","q-gdmeningites-061","q-gdmeningites-068","q-gdmeningites-070","q-gdmeningites-073","q-gdmeningites-101","q-gdmeningites-141","q-gdmeningites-143","q-gdmeningites-166","q-gdmeningites-179","q-gdmeningites-180"],
          prosa: `[[O herpes simples afeta o **lobo temporal medial e o sistema límbico**, e por isso o quadro é **febre, cefaleia, confusão, alterações de comportamento (agressividade, desinibição, alucinações, afasia), crises focais com automatismos oromastigatórios e déficit focal**; a ressonância mostra **hipersinal em T2 e FLAIR no lobo temporal** (com edema), e o líquor tem **linfócitos, hemácias, glicose normal e proteína discretamente alta**.|q-usp2022-005,q-usp2023-057,q-gdmeningites-016,q-gdmeningites-050,q-gdmeningites-070,q-gdmeningites-073,q-gdmeningites-141,q-gdmeningites-143,q-gdmeningites-180,q-gdmeningites-003,q-unicamp2023-007]] [[O diagnóstico se confirma por **PCR do líquor** para o DNA viral, mas o **aciclovir venoso** se inicia **imediatamente**, sem esperar o resultado, por 14 a 21 dias; a **possibilidade de agente bacteriano não pode ser descartada** de saída, e a **associação meningoencefalite** é comum.|q-gdmeningites-061,q-gdmeningites-166,q-gdmeningites-101,q-gdmeningites-059,q-gdmeningites-038,q-famema2022-031,q-udisc20262-021,q-gdmeningites-045,q-gdmeningites-179,q-scmsp2021-055]] [[A glicose **não é baixa** na encefalite herpética, ao contrário da meningite bacteriana, e a doença aguda com crises e confusão em jovem sem lesão em tomografia segue sendo herpes até prova em contrário.|q-gdmeningites-060,q-gdmeningites-068]]`,
          texto: `- Febre, confusão, crises com automatismos e edema temporal direito: **encefalite herpética; PCR no líquor**. {q-usp2022-005}
- Cefaleia, febre, confusão e lesão temporal: líquor com **30 células, linfócitos, proteína 50, glicose 70**. {q-usp2023-057}
- Febre, alteração de comportamento, crise e hemiparesia: **aciclovir e PCR para herpes**. {q-famema2022-031}
- Febre, cefaleia e confusão crescente por 1 semana, TC sem lesão: **aciclovir empírico**. {q-udisc20262-021}
- Crise generalizada, febre, mudança comportamental; RM em FLAIR com hipersinal temporal: **líquor com linfócitos e glicose normal**. {q-unicamp2023-007}
- Lactente com crise de 30 minutos: **aciclovir endovenoso imediato**, coletar líquor. {q-scmsp2021-055}
- Alteração aguda de comportamento, nudez e febre: **encefalite herpética e aciclovir**. {q-gdmeningites-003}
- Febre, agressividade e rebaixamento com RM alterada: **encefalite aguda por herpes simples**. {q-gdmeningites-016}
- Parênquima e meninges inflamados juntos (**meningoencefalite**) são comuns; a causa fica indefinida na maioria e, quando definida, **vírus** são a principal. {q-gdmeningites-038}
- 250 células linfocíticas, febre e letargia por uma semana: **aciclovir venoso**. {q-gdmeningites-045}
- RM com lesão unilateral em **amígdala e hipocampo**, hiperintensa em T2 e FLAIR. {q-gdmeningites-050}
- Conduta correta: **o agente bacteriano não pode ser descartado** de imediato. {q-gdmeningites-059}
- Afirmação incorreta: **baixos níveis de glicose** são comuns na encefalite herpética. {q-gdmeningites-060}
- Confirmação: **PCR**. {q-gdmeningites-061}
- Cefaleia, crises e confusão com hipersinal temporal: **encefalite herpética** (não esclerose mesial nem abscesso); **PCR do HSV no líquor** é o padrão de referência; a **dengue** neuroinvasiva entra no diferencial. {q-gdmeningites-068}
- Criança de 8 anos com crise, alucinação e perda de memória: **encefalite herpética**. {q-gdmeningites-070}
- Febre, confusão, hemiparesia e lesão temporal: **PCR e aciclovir**. {q-gdmeningites-073}
- Duração do aciclovir: **14 a 21 dias**. {q-gdmeningites-101}
- Homem de 60 anos com sintomas gripais, crise e distúrbio da fala: **encefalite pelo herpes simples**. {q-gdmeningites-141}
- Febre, confusão, convulsão e lesão temporal mesial: **iniciar aciclovir**. {q-gdmeningites-143}
- O aciclovir trata a encefalite pelo **herpes simples**. {q-gdmeningites-166}
- Diabético com 4 dias de febre e confusão, líquor linfocitário: **aciclovir**. {q-gdmeningites-179}
- Na encefalite herpética: **alucinações, afasia e comportamento bizarro**. {q-gdmeningites-180}` },
      ],
    },
    {
      id: "cronicas", titulo: "Meningites crônicas e lesões do sistema nervoso",
      introducao: `[[A **meningite que dura mais de 4 semanas** com líquor linfocitário é, na maioria, **tuberculosa**; no paciente com HIV ou diabético entram a **criptococose** e a toxoplasmose; e a **lesão focal** com febre depois de sinusite, otite ou infecção dentária é **abscesso cerebral**.|q-gdmeningites-137,q-gdmeningites-012,q-gdmeningites-138,q-gdmeningites-046]]`,
      fragmentos: [
        { id: "tb-meningea", titulo: "Meningite tuberculosa", conferir: true, diretrizes: ["sbp-meningites"],
          questoes: ["q-adap23-072","q-famema2021-022","q-famema2021-100","q-sessp2023-029","q-sessp2026-008","q-unicamp2022-047","q-gdmeningites-011","q-gdmeningites-023","q-gdmeningites-033","q-gdmeningites-044","q-gdmeningites-065","q-gdmeningites-085","q-gdmeningites-094","q-gdmeningites-099","q-gdmeningites-103","q-gdmeningites-106","q-gdmeningites-137","q-gdmeningites-150","q-gdmeningites-158","q-gdmeningites-161"],
          prosa: `[[A meningite tuberculosa é **subaguda** (semanas de febre baixa, cefaleia e emagrecimento) e o exsudato fica na **base do crânio**, por isso aparecem a **paralisia de pares cranianos (VI par)**, a **hidrocefalia** e o **realce meníngeo basal**; o líquor é **opalescente, com pressão alta, menos de 500 células com linfócitos, proteína muito alta e glicose baixa**.|q-adap23-072,q-unicamp2022-047,q-gdmeningites-099,q-gdmeningites-106,q-gdmeningites-158,q-gdmeningites-011,q-gdmeningites-065,q-gdmeningites-094,q-famema2021-022,q-famema2021-100,q-sessp2026-008,q-sessp2023-029]] [[O tratamento é o **esquema RIPE** (rifampicina, isoniazida, pirazinamida e etambutol) **com corticoide, sem esperar a cultura**, por 12 meses; a meningite tuberculosa **não é transmissível**, mas a **pesquisa de tuberculose pulmonar** e o isolamento respiratório entram no caso; e a **proteína diminuída** fala contra o diagnóstico.|q-gdmeningites-150,q-adap23-072,q-gdmeningites-023,q-gdmeningites-033,q-gdmeningites-085,q-gdmeningites-103,q-gdmeningites-161,q-gdmeningites-137,q-gdmeningites-044]]`,
          texto: `- Cefaleia por 3 semanas, febre vespertina, emagrecimento e paralisia do VI par: **RIPE com dexametasona sem aguardar a cultura**. {q-adap23-072}
- Linfócitos, proteína alta e glicose de 20: **meningite tuberculosa**. {q-famema2021-022}
- Líquor límpido e xantocrômico, 300 células, glicose 20: ***Mycobacterium tuberculosis***. {q-famema2021-100}
- Evolução arrastada, depois coma e convulsão: ***Mycobacterium tuberculosis***. {q-sessp2023-029}
- 300 células linfomononucleares, proteína de 450 e glicose muito baixa: **tuberculose**. {q-sessp2026-008}
- Lactente de 2 meses com irritabilidade há 8 dias e paralisia do VI par: **tuberculose**. {q-unicamp2022-047}
- Líquor: **pressão alta, turvação, menos de 500 células, linfócitos, proteína alta**. {q-gdmeningites-011}
- HIV com febre baixa, hidrocefalia: **tuberculose meníngea, RIPE por 12 meses**. {q-gdmeningites-023}
- Cefaleia por 5 semanas, turvação visual, sudorese vespertina: **meningite tuberculosa, isolamento respiratório e baciloscopia de escarro**. {q-gdmeningites-033}
- Alcoólatra com 3 semanas de confusão, paralisia do VI par, linfócitos e glicose baixa: meningite tuberculosa em prova terapêutica; **repetir a punção** para acompanhar a celularidade. {q-gdmeningites-044}
- **Pleocitose linfomononuclear, proteína alta e glicose baixa**. {q-gdmeningites-065,q-gdmeningites-094}
- A meningite tuberculosa em si **não é transmissível**. {q-gdmeningites-085}
- Menino de 3 anos com hemiparesia e hidrocefalia: **meningoencefalite tuberculosa**. {q-gdmeningites-099}
- **Proteína diminuída** fala contra tuberculose. {q-gdmeningites-103}
- Febre baixa por 20 dias e líquor com 40 células: **realce meníngeo basal intenso com hidrocefalia**. {q-gdmeningites-106}
- Meningite crônica (mais de 4 semanas) com linfocitose: **Mycobacterium tuberculosis**. {q-gdmeningites-137}
- Meningite crônica de 6 semanas com paralisia do abducente: **RIPE e corticoide**. {q-gdmeningites-150}
- Tuberculose do SNC: **base de crânio, glicose baixa, proteína alta**. {q-gdmeningites-158}
- No HIV, tuberculosa: **glicose de 50** é o que não se espera. {q-gdmeningites-161}` },
        { id: "cripto", titulo: "Meningite criptocócica", conferir: true, diretrizes: ["pcdt-hiv-adultos"],
          questoes: ["q-fmabc2024-003","q-gdmeningites-012","q-gdmeningites-047","q-gdmeningites-080","q-gdmeningites-084","q-gdmeningites-138"],
          prosa: `[[A *Cryptococcus* vem das **fezes de pombos** e causa meningite subaguda com **cefaleia intensa, febre e hipertensão intracraniana**, que dá **perda visual** por papiledema; o **líquor** mostra **tinta nanquim** e **antígeno criptocócico**, e o tratamento é a **anfotericina B**; a hipertensão intracraniana (cerca de metade dos casos) pede **punções de alívio**; e a indução é **anfotericina B com flucitosina**, com **punção lombar de controle ao fim de 2 semanas** para medir a pressão e documentar a esterilização do líquor antes do fluconazol.|q-gdmeningites-080,q-gdmeningites-047,q-gdmeningites-012,q-gdmeningites-138,q-fmabc2024-003,q-gdmeningites-084]]`,
          texto: `- HIV com CD4 de 156, no fim da indução de 2 semanas com anfotericina lipossomal e flucitosina: **punção lombar de controle** (pressão de abertura e cultura). {q-fmabc2024-003}
- HIV abandonado, cefaleia há 1 semana e TC sem lesão: **análise de líquor** (criptococo). {q-gdmeningites-012}
- A meningite que mais se associa à perda visual: **criptocócica**. {q-gdmeningites-047}
- Excesso de pombos: **histoplasmose e criptococose**. {q-gdmeningites-080}
- *C. neoformans* é oportunista (aids) e associa-se a fezes de pombos; *C. gattii* acomete imunocompetentes e associa-se a árvores como o eucalipto; diagnóstico por tinta da China, cultura, látex e teste rápido; a indução é anfotericina B com flucitosina (não fluconazol isolado). {q-gdmeningites-084}
- Diabético com 3 semanas de meningite, tinta nanquim positiva: **anfotericina B**. {q-gdmeningites-138}` },
        { id: "abscesso-outras", titulo: "Abscesso cerebral, neurocisticercose e neurotoxoplasmose", conferir: true, diretrizes: ["sbp-meningites"],
          questoes: ["q-gdmeningites-046","q-gdmeningites-111","q-gdmeningites-151","q-gdmeningites-078","q-gdmeningites-131","q-gdmeningites-096","q-gdmeningites-112","q-gdmeningites-152","q-gdmeningites-172"],
          prosa: `[[O **abscesso cerebral** nasce por extensão de **sinusite, otite, mastoidite ou infecção dentária** e dá febre, cefaleia e **déficit focal sem sinais meníngeos**; o exame que define é a **tomografia com contraste** (lesão com realce em anel), e o tratamento empírico é **ceftriaxona (ou cefotaxima) com metronidazol**, com anticonvulsivante por pelo menos 3 meses depois da resolução.|q-gdmeningites-046,q-gdmeningites-151,q-gdmeningites-111]] [[A **neurocisticercose** (larva da *Taenia solium*) causa **crises** e se trata com **albendazol** (o mebendazol não é a droga principal); as **microcalcificações** difusas na tomografia são a forma calcificada, e a **compressão medular** é a manifestação menos prevalente; e a **neurotoxoplasmose** com lesão em anel e anti-HIV positivo é o diagnóstico do HIV com CD4 baixo.|q-gdmeningites-112,q-gdmeningites-096,q-gdmeningites-172,q-gdmeningites-152,q-gdmeningites-078,q-gdmeningites-131]]`,
          texto: `- Sinusite purulenta, confusão e monoparesia sem sinais meníngeos: **TC de crânio com contraste** (abscesso). {q-gdmeningites-046}
- Anticonvulsivante no abscesso: **pelo menos 3 meses** após a resolução. {q-gdmeningites-111}
- Abscesso comunitário: **ceftriaxona (ou cefotaxima) mais metronidazol**. {q-gdmeningites-151}
- Garimpeiro com emagrecimento, febre, adenopatia e crise: **neurotoxoplasmose** (AIDS provável). {q-gdmeningites-078}
- Declínio por meses com lesão em anel e edema: **neurotoxoplasmose, anti-HIV**. {q-gdmeningites-131}
- O **mebendazol não** é a principal opção na neurocisticercose com epilepsia. {q-gdmeningites-096}
- Crises de repetição e lesões císticas com escólex: **albendazol**. {q-gdmeningites-112}
- Manifestação **menos prevalente** da neurocisticercose: **compressão medular**. {q-gdmeningites-152}
- Crises e **microcalcificações** difusas na tomografia: **neurocisticercose**. {q-gdmeningites-172}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente do que a regra atual manda (referências antigas, textos que se contradizem entre si). Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-gdmeningites-024","q-gdmeningites-034","q-famema2025-001","q-gdmeningites-006","q-gdmeningites-083","q-gdmeningites-069","q-gdmeningites-135","q-gdmeningites-175","q-einstein2026-009","q-gdmeningites-088","q-gdmeningites-145"],
          prosa: `[[**Antibiótico empírico**: a regra é **ceftriaxona** (com vancomicina e, se houver risco, ampicilina); a prova deu **penicilina cristalina** como escolha na suspeita de meningite meningocócica (referência antiga, gdmeningites-034) e **amoxicilina 8 g/dia** como adicional da ceftriaxona acima de 65 anos (gdmeningites-175, em vez da ampicilina).|q-gdmeningites-034,q-gdmeningites-175]] [[**Duração**: o antibiótico depende do agente (meningococo de 5 a 7 dias, pneumococo de 10 a 14, *Listeria* 21); a prova cobrou **14 dias** como duração mínima (gdmeningites-024) e a **dexametasona por 10 a 14 dias** (famema2025-001), quando a regra é de **2 a 4 dias** (0,15 mg/kg a cada 6 horas).|q-gdmeningites-024,q-famema2025-001]] [[**Tomografia antes da punção**: a regra é fazer só quando há sinal de hipertensão intracraniana; a prova (gdmeningites-006) manteve a tomografia normal e deu **ceftriaxona, vancomicina, aciclovir e dexametasona** ao mesmo tempo, e o **Einstein 2026** cobrou manter antibiótico por **48 horas** na meningite viral provável.|q-gdmeningites-006,q-einstein2026-009]] [[**Quimioprofilaxia**: a idade-limite da ceftriaxona de 125 mg varia (**menores de 12 anos** em gdmeningites-069, **menores de 15** em gdmeningites-135); a prova cobrou o prazo de **72 horas** como errado (o limite é de 14 dias) e a **rifampicina de 4 e 2 dias** (*Haemophilus* e meningococo).|q-gdmeningites-069,q-gdmeningites-135,q-gdmeningites-083,q-gdmeningites-145,q-gdmeningites-088]]`,
          texto: `- Regra: ceftriaxona; a prova deu **penicilina cristalina** e **amoxicilina 8 g/dia**. {q-gdmeningites-034,q-gdmeningites-175}
- Regra: dexametasona de 2 a 4 dias; a prova deu **10 a 14 dias**; antibiótico mínimo de **14 dias**. {q-famema2025-001,q-gdmeningites-024}
- Regra: tomografia só com sinais de hipertensão intracraniana; a prova mandou **tratar com tudo mesmo com tomografia normal**. {q-gdmeningites-006}
- Regra: dose única de ceftriaxona de 125 mg abaixo de 12 anos (ou 15, segundo outra prova). {q-gdmeningites-069,q-gdmeningites-135}
- Regra: profilaxia até 14 dias do contato; a afirmativa de **72 horas** é falsa. {q-gdmeningites-083}
- Regra: rifampicina por 2 dias (meningococo) e 4 dias (*Haemophilus*). {q-gdmeningites-145,q-gdmeningites-088}
- Prova: manter antibiótico por **48 horas** na viral provável. {q-einstein2026-009}` },
      ],
    },
    {
      id: "comparativo", titulo: "Quadro comparativo do líquor",
      introducao: `O líquor é a prova que separa as meningites: o que muda é a **célula predominante** e a **glicose**.`,
      fragmentos: [
        { id: "tabela-liquor", titulo: "Padrão do líquor por causa", conferir: true, diretrizes: ["guia-vigilancia-meningites"],
          questoes: ["q-inf-13","q-gdmeningites-140","q-gdmeningites-011","q-gdmeningites-138","q-gdmeningites-156"],
          prosa: `[[Cada causa deixa o seu padrão: a **bactéria** atrai neutrófilos e consome a glicose; o **vírus** e o herpes atraem linfócitos e preservam a glicose; a **tuberculose** e o **criptococo** dão linfócitos com glicose baixa por inflamação crônica da base do crânio ou do espaço subaracnóideo.|q-inf-13,q-gdmeningites-140,q-gdmeningites-011,q-gdmeningites-138,q-gdmeningites-156]]

| Causa | Células | Glicose | Proteína | Outros achados |
|---|---|---|---|---|
| Bacteriana | Centenas a milhares, **neutrófilos** | **Baixa** | **Alta** | Turvo, pressão alta, Gram positivo |
| Viral | Dezenas a centenas, **linfócitos** | Normal | Normal ou pouco alta | Enterovírus o mais comum |
| Herpes simples | **Linfócitos** e hemácias | Normal | Pouco alta | PCR positivo, lobo temporal |
| Tuberculosa | Menos de 500, **linfócitos** | **Baixa** | **Muito alta** | Base do crânio, VI par, hidrocefalia |
| Criptocócica | Poucas, **linfócitos** | Baixa | Alta | Tinta nanquim e antígeno |`,
          texto: `- Viral: **linfócitos, glicose normal e proteína normal ou pouco alta**. {q-inf-13}
- Bacteriana: **neutrófilos, glicose baixa e proteína alta**. {q-gdmeningites-140}
- Tuberculosa: **linfócitos, proteína alta e glicose baixa**. {q-gdmeningites-011}
- Criptocócica: tinta nanquim e antígeno; tratar com **anfotericina B**. {q-gdmeningites-138}
- Herpes simples: 400 células, glicose normal e proteína pouco alta. {q-gdmeningites-156}` },
      ],
    },
  ],
});
