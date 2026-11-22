/* resumos/trauma-abdominal/resumo.js — resumo adaptativo de trauma abdominal: decisão por estabilidade e mecanismo
   (FAST, tomografia, laparotomia, tratamento não operatório), ferimentos penetrantes, baço, fígado, rim e vias
   urinárias, vísceras ocas, duodeno e pâncreas, controle de danos e hipertensão abdominal.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- trauma-abdominal */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "trauma-abdominal",
  titulo: "Trauma abdominal",
  assunto: "ass-traumaabd",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "atls", texto: "American College of Surgeons — Advanced Trauma Life Support (ATLS), 10ª edição: capítulo de trauma abdominal e pélvico", edicao: "10ª", lidoEm: null },
    { id: "wses-abdominal", texto: "WSES — diretrizes de trauma abdominal (baço, fígado, trauma penetrante e controle de danos)", lidoEm: null },
    { id: "aast", texto: "AAST — escalas de lesão de órgãos (baço, fígado, rim, duodeno, pâncreas)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "decisao", titulo: "Decidir: estabilidade, mecanismo e o exame certo",
      introducao: `[[A decisão no trauma abdominal depende de duas perguntas: o paciente está **hemodinamicamente estável** e o trauma é **fechado ou penetrante**? Paciente **instável** com FAST positivo (ou lavado peritoneal) vai à **laparotomia sem tomografia**, porque o tempo que o exame consome é tempo de hemorragia; paciente **estável** pode ser estudado e, se a lesão permitir, tratado de forma **não operatória**.|q-tp20212-017,q-tp20232-078,q-tp20241-077,q-famerp2023-067]]

Veja também: **ATLS** (choque, transfusão e pelve), **Trauma de tórax** (transição toracoabdominal e diafragma), **Hérnias** e **Obstrução intestinal** (complicações pós-trauma).`,
      fragmentos: [
        { id: "ta-fechado", titulo: "Trauma fechado: FAST, tomografia, laparotomia e tratamento não operatório", conferir: true, diretrizes: ["atls","wses-abdominal"],
          figuras: [{ arquivo: "figuras/decisao-trauma-abdominal.svg", legenda: "Esquema autoral: decisão no trauma abdominal pela estabilidade e pelo mecanismo." }],
          questoes: ["q-tp20212-017","q-scmsp2022-007","q-tp20232-078","q-tp20241-077","q-famerp2023-067","q-famerp2024-025","q-famerp2022-066","q-sirio2022-023","q-sirio2026-025","q-einstein2022-028","q-scmsp2022-005","q-scmsp2023-033","q-iamspe2026-028","q-sessp2023-019","q-sirio2022-037","q-tp20261-109","q-unicampdis2022-020","q-uspsp5-052","q-uspsp3-114","q-usp2023-120","q-einstein2022-018","q-usp2026-045","q-usp2026-027","q-sirio2022-033"],
          prosa: `O **FAST** pesquisa líquido livre (pericárdio, Morrison, esplenorrenal e pelve) e é a ferramenta da sala de trauma: [[o líquido é **anecoico** (preto); no paciente **instável**, o FAST positivo manda **operar** (laparotomia exploradora imediata); não se repete o FAST nem se pede tomografia, nem laparoscopia diagnóstica, nem angiotomografia.|q-tp20212-017,q-tp20232-078,q-tp20241-077,q-famerp2024-025,q-famerp2022-066,q-sirio2026-025]] Com o paciente instável e FAST positivo, **inicia-se a transfusão e leva-se ao centro cirúrgico**, com tipagem colhida e reposição volêmica em andamento.

[[Se o paciente está **estável**, a **tomografia de abdome com contraste** é o exame: o ciclista de 18 anos estável e a mulher agredida, com abdome doloroso, vão à tomografia; um exame físico normal **não exclui** lesão. Nos traumas de alta energia, solicita-se tomografia de coluna cervical, tórax e abdome total.|q-scmsp2022-005,q-scmsp2023-033,q-iamspe2026-028]] [[O **tratamento não operatório (TNO)** é possível em pacientes **estáveis**, com diagnóstico de lesão de **víscera parenquimatosa** (baço, fígado, rim), e o grau da lesão **não** é o determinante: a estabilidade é. O fígado grau III em paciente estável e o baço grau III estável (com pequeno líquido peri-hepático) ficam em observação.|q-sessp2023-019,q-einstein2022-018,q-tp20261-109]]

[[Nem todo paciente "estável" pode esperar: o **abdome em tábua com descompressão brusca positiva e choque** vai à laparotomia **sem tomografia**; o **TCE grave com líquido livre na pelve** e sem lesão de víscera maciça (o exame abdominal é inconfiável) tem lesão de víscera oca até prova em contrário e é explorado; a **ruptura diafragmática** (estômago herniado no tórax) se trata por via cirúrgica.|q-sirio2022-023,q-sirio2022-037,q-uspsp5-052]] [[O **sinal do cinto de segurança** (marca na parede abdominal) associa-se a lesão de **víscera oca e mesentério** (delgado e cólon), e a lesão de mesentério e de víscera oca não tem tratamento não operatório.|q-usp2026-045,q-usp2026-027]]

[[O que o FAST não vê (pâncreas, duodeno, retroperitônio) exige a tomografia no estável; o **pneumoperitônio** na imagem indica perfuração de víscera oca.|q-unicampdis2022-020]]`,
          texto: `- **FAST** com líquido **anecoico**; instável + FAST positivo: **laparotomia exploradora**, sem tomografia. {q-tp20212-017,q-tp20232-078,q-tp20241-077,q-famerp2024-025,q-famerp2022-066}
- Colher tipagem e levar ao centro cirúrgico com reanimação volêmica (instável e dor abdominal). {q-scmsp2022-007,q-famerp2023-067}
- FAST positivo em quatro quadrantes com hipotensão e hematoma de parede: **laparotomia emergencial** (e fixação pélvica se preciso). {q-sirio2026-025,q-einstein2022-028}
- **Estável**: **tomografia de abdome com contraste**; o exame físico normal **não exclui** lesão. {q-scmsp2022-005,q-scmsp2023-033}
- Alta energia: tomografia de coluna cervical, tórax e abdome total. {q-iamspe2026-028}
- **TNO**: estável, lesão de víscera parenquimatosa; o grau **não** é o determinante. {q-sessp2023-019}
- Fígado grau III estável com líquido livre: **tratamento não operatório**. {q-einstein2022-018}
- Baço grau III estável com pequeno líquido peri-hepático: **tratamento não operatório**. {q-tp20261-109}
- Abdome em tábua e choque: **cirurgia sem tomografia**. {q-sirio2022-023}
- TCE grave com líquido livre na pelve: **laparotomia** (lesão de víscera oca possível). {q-sirio2022-037}
- Estômago herniado no hemitórax esquerdo (rotura de diafragma): **abordagem cirúrgica**. {q-uspsp5-052}
- **Cinto de segurança** com líquido livre: lesão de **víscera oca e mesentério**. {q-usp2026-045}
- FAST positivo com alteração de mesentério em paciente estável: **laparotomia**. {q-usp2026-027}
- Atropelamento e dor abdominal com pressão normal: pesquisar lesão de **vias urinárias** (**laparoscopia** na prova). {q-uspsp3-114}
- **Pneumoperitônio** na tomografia: perfuração de víscera oca. {q-unicampdis2022-020}
- Queda de altura com tomografia: a prova pede a ilustração D da figura. {q-usp2023-120}
- Garota de 19 anos com pelve estável e dolorosa e sangramento arterial pélvico: **embolização arterial pélvica**. {q-sirio2022-033}` },
      ],
    },
    {
      id: "penetrante", titulo: "Trauma penetrante",
      introducao: `[[No ferimento **por arma de fogo** no abdome, a chance de lesão visceral é tão alta que a conduta é **laparotomia** (se há peritonite, hipotensão, evisceração). No ferimento por **arma branca**, o trajeto é de menor energia e **muitos pacientes estáveis, sem peritonite, podem ser observados**, com exames seriados.|q-fmabc2021-001,q-didepm-057,q-sessp2022-035]]`,
      fragmentos: [
        { id: "pen-conduta", titulo: "Arma branca, arma de fogo, transição toracoabdominal e incisões", conferir: true, diretrizes: ["atls","wses-abdominal"],
          questoes: ["q-usp2022-068","q-usp2024-030","q-scmsp2023-035","q-sessp2022-035","q-uspsp3-110","q-uspsp3-115","q-sirio2024-024","q-sirio2022-036","q-didepm-057","q-amrigs2020-035","q-famerp2025-080","q-famerp2022-069","q-famerp2023-065","q-fmabc2021-001","q-usprp2024-037","q-usprp2025-087","q-uspsp3-097","q-sirio2022-027","q-uspsp5-054"],
          prosa: `O **ferimento por arma branca estável**, sem peritonite: [[exploração da ferida (em campo estéril, sob anestesia local) para ver se violou a fáscia, ou **observação com exames seriados**, operando se surgirem peritonite ou instabilidade; no dorso e no flanco, a **tomografia** estuda o retroperitônio; se a tomografia mostra lesão, a **laparoscopia** é opção no paciente estável.|q-sessp2022-035,q-didepm-057,q-usp2022-068,q-amrigs2020-035,q-sirio2024-024,q-uspsp3-115]] [[A **evisceração** ou a saída de alça pela ferida (3 cm em fossa ilíaca) pede **laparotomia**, assim como a instabilidade ou a peritonite.|q-scmsp2023-035,q-famerp2025-080]]

[[Na **transição toracoabdominal** esquerda ou direita, o risco é de lesão do **diafragma**: o paciente estável faz **drenagem torácica** na emergência e a **videolaparoscopia** para pesquisar a lesão diafragmática na internação.|q-famerp2022-069,q-famerp2023-065,q-uspsp3-110]]

[[Na **laparotomia de urgência** no instável, a incisão **mediana ampla** (xifopúbica) dá acesso a todo o abdome; no choque hipovolêmico grave com ferimento por arma de fogo ou faca, a incisão é a **mediana supraumbilical**, não a transversa, subcostal ou paramediana. O **tamponamento com compressas** controla o sangramento de lesão extensa de períneo ou de parede quando a pressão é baixa.|q-uspsp5-054,q-usprp2024-037,q-usprp2025-087,q-uspsp3-097]]

[[A tomografia que mostra **hematoma de mesentério** com densificação da gordura junto ao ceco em paciente estável pode ser acompanhada de **laparoscopia** para afastar lesão de alça ou vaso, mesmo quando ele vai ao centro cirúrgico por outro motivo (fratura).|q-sirio2022-027]]`,
          texto: `- **Arma branca estável** sem peritonite: **exploração local** ou observação seriada; opera se peritonite ou instabilidade. {q-sessp2022-035,q-didepm-057}
- Ferimento no dorso estável: **tomografia de abdome**; lombar alta: tomografia com contraste IV e oral. {q-usp2022-068,q-amrigs2020-035}
- Ferimento em flanco com tomografia alterada e estabilidade: **laparoscopia**. {q-sirio2024-024}
- Periumbilical estável: **laparoscopia diagnóstica**. {q-uspsp3-115}
- **Evisceração** e saída de alça: **laparotomia**. {q-scmsp2023-035,q-famerp2025-080}
- Ferimento por arma de fogo com defesa abdominal e taquicardia: **laparotomia imediata**. {q-fmabc2021-001}
- Transição toracoabdominal com pneumotórax: **drenagem torácica** e depois **videolaparoscopia** (ou laparotomia no instável). {q-famerp2022-069,q-famerp2023-065}
- Ferida no 7º espaço intercostal esquerdo, estável: **laparoscopia** (pesquisa de lesão diafragmática). {q-uspsp3-110}
- Choque hipovolêmico grave com ferimento abdominal: incisão **mediana supraumbilical**. {q-usprp2024-037,q-usprp2025-087}
- Instável e FAST positivo: incisão **mediana xifopúbica** ampla. {q-uspsp5-054}
- Lesão perineal com sangramento ativo e choque: **tamponamento com compressas**. {q-uspsp3-097}
- Hematoma de mesentério em estável levado ao centro cirúrgico: **laparoscopia**. {q-sirio2022-027}` },
      ],
    },
    {
      id: "orgaos", titulo: "Lesões por órgão",
      introducao: `[[O **baço** e o **fígado** são vísceras parenquimatosas que sangram, mas **sangram até parar**: com estabilidade, o **tratamento não operatório** é o padrão, com **angioembolização** quando a tomografia mostra **extravasamento de contraste (blush)**; a **laparotomia** é para quem está instável ou tem lesão que a embolização não resolve.|q-tp20251-077,q-famerp2025-079,q-usprp2023-090]]`,
      fragmentos: [
        { id: "org-baco", titulo: "Baço: observação, angioembolização e esplenectomia", conferir: true, diretrizes: ["aast","wses-abdominal"],
          questoes: ["q-adap24-011","q-adap22-008","q-unifesp2024-015","q-scmsp2021-037","q-tp20251-077","q-famerp2024-031","q-famerp2025-079","q-famerp2026-074","q-sirio2021-039","q-fmabc2022-027","q-sirio2021-028","q-amrigs2022-036","q-amrigs2024-031","q-uspsp3-119","q-sirio2025-030","q-famerp2023-063","q-uspsp4-055","q-usprp2023-090"],
          prosa: `A conduta no baço depende do **estado hemodinâmico**, e não só do grau. [[**Instável sem resposta** (PA 80/50, índice de choque de 1,5 mesmo após 2 L de cristaloide e transfusão) e hilo avulsionado grau V: **esplenectomia total**; paciente que **estabilizou** com laceração grau III a IV: **observação em UTI** ou **angioembolização** se há blush.|q-adap24-011,q-unifesp2024-015,q-scmsp2021-037]]

[[A **lesão grau IV** pela AAST sem alteração vascular e estável pode ser tratada de modo **não operatório**, com a **angioembolização profilática**; o que define a conduta é a condição hemodinâmica, não o grau nem a idade; a lesão **grau I a II** (hematoma peri-esplênico, laceração pequena) com estabilidade fica em **observação** com abdome e hemograma seriados.|q-famerp2025-079,q-sirio2021-039,q-fmabc2022-027,q-adap22-008,q-sirio2021-028]] [[A **arteriografia com embolização** de ramos esplênicos preserva o baço e sustenta o TNO no jovem que melhora; a presença de blush na tomografia indica embolização, e a queda de pontos do hematócrito se acompanha com exames seriados.|q-tp20251-077,q-famerp2026-074,q-famerp2024-031]]

O **sinal de Kehr** (dor no ombro esquerdo à palpação do hipocôndrio esquerdo) indica **hemoperitônio por lesão esplênica**, por irritação do diafragma. [[A queda do hematócrito, a peritonite e o choque em briga com trauma fechado sugerem **ruptura do baço**.|q-amrigs2022-036,q-sirio2025-030]] Quem foi **esplenectomizado** deve receber as vacinas antipneumocócica, antimeningocócica e anti-Hib e o risco de infecção fulminante se explica pela perda da filtração de bactérias encapsuladas.|q-amrigs2024-031]]`,
          texto: `- Instável com avulsão do hilo esplênico (grau V): **esplenectomia total**. {q-adap24-011}
- Estabilizado após volume: **observação em UTI** (grau II a III) ou **angioembolização** se blush. {q-unifesp2024-015,q-scmsp2021-037}
- Baço grau I a II com estabilidade: **tratamento não operatório** com exames seriados. {q-adap22-008,q-fmabc2022-027,q-sirio2021-028}
- Baço **grau IV** estável sem alteração vascular: **angioembolização profilática**. {q-famerp2025-079}
- A conduta se define pela **condição hemodinâmica**, não pelo grau nem pela idade. {q-sirio2021-039}
- Epigastro e hipocôndrio esquerdo, estável, com tomografia: **arteriografia e angioembolização**. {q-tp20251-077,q-famerp2026-074}
- Presença de **blush** indica embolização; a laparotomia não é obrigatória. {q-famerp2024-031,q-usprp2023-090}
- **Sinal de Kehr**: dor no ombro esquerdo = hemoperitônio por lesão esplênica. {q-amrigs2022-036}
- Queda do hematócrito, distensão e peritonite: **ruptura do baço**. {q-sirio2025-030}
- Guidão ou queda de bicicleta e dor no ombro: a tomografia mostra a lesão esplênica (imagem D). {q-uspsp3-119}
- Pós-esplenectomia: vacinas contra **pneumococo, meningococo e Hib**. {q-amrigs2024-031}
- Estável com lesão hepática grau V e blush: **embolização**. {q-usprp2023-090,q-uspsp4-055}
- Estável e dor abdominal com hemodinâmica normal: arteriografia e embolização hepática antes da laparotomia. {q-famerp2023-063}` },
        { id: "org-figado", titulo: "Fígado: manobra de Pringle, tamponamento e lesões complexas", conferir: true, diretrizes: ["aast","wses-abdominal"],
          questoes: ["q-famema2022-075","q-sirio2023-037","q-uspsp3-120","q-fmabc2026-028","q-fmabc2026-031","q-tp20222-059"],
          prosa: `O **fígado** é parcialmente protegido pelas costelas, que dão pouco suporte em alta energia; é um dos órgãos mais lesados no trauma. [[A **manobra de Pringle** pinça o **ligamento hepatoduodenal** (artéria hepática, colédoco e veia porta): se o sangramento **não cessa** com ela, o foco é **venoso retro-hepático ou das veias hepáticas**, e a opção extrema é o **shunt átrio-cava**.|q-fmabc2026-031,q-famema2022-075]]

[[No paciente **instável** com FAST positivo e lesão hepática complexa, o **tamponamento (packing) hepático com compressas** é a medida de controle de danos; na lesão **transfixante por projétil**, tampona-se o **trajeto com balão** (dreno enrolado em torno de sonda). Na criança com choque, lesão hepática **grau IV** e instabilidade vai à cirurgia imediata, sem observação em UTI.|q-sirio2023-037,q-uspsp3-120,q-tp20222-059]]`,
          texto: `- **Pringle**: pinça o **ligamento hepatoduodenal** (artéria hepática, colédoco, veia porta). {q-fmabc2026-031}
- Sangramento que **não cessa** com Pringle: **shunt átrio-cava** (lesão venosa retro-hepática). {q-famema2022-075}
- Instável com FAST positivo e lesão hepática: **tamponamento com compressas**. {q-sirio2023-037}
- Lesão transfixante por projétil com sangramento ativo: **tamponamento do trajeto com balão**. {q-uspsp3-120}
- O fígado é parcialmente protegido pela caixa torácica, que dá pouco suporte em alta energia. {q-fmabc2026-028}
- Criança instável com lesão hepática **grau IV**: **cirurgia abdominal imediata**. {q-tp20222-059}` },
        { id: "org-urogenital", titulo: "Rim, bexiga e uretra", conferir: true, diretrizes: ["aast"],
          questoes: ["q-scmsp2021-026","q-usp2023-018","q-unicamp2022-017","q-famerp2025-065","q-sirio2021-024","q-famema2023-080"],
          prosa: `[[A **hematúria microscópica** sem choque **não exige imagem**, mas o exame físico alterado, o mecanismo de alta energia ou a hematúria macroscópica pedem **tomografia**. A lesão renal estável fica em **observação com monitorização hemodinâmica**, sem cateter duplo J, nefrostomia ou nefrectomia; o grau II é a laceração **< 1 cm** com hematoma perirrenal contido.|q-scmsp2021-026,q-usp2023-018,q-famema2023-080]]

[[A **uretra posterior** (membranosa) rompe-se nas fraturas de bacia: **uretrorragia, retenção e bexiga alta** mandam fazer **uretrografia retrógrada antes de qualquer sonda** e **cistostomia**; o paciente com queda "a cavaleiro" e hematoma perineal tem lesão da **uretra bulbar** (anterior).|q-unicamp2022-017,q-famerp2025-065]] [[A **bexiga intraperitoneal** (líquido livre na pelve, hematúria e dor hipogástrica, com cistografia ou fase tardia da tomografia) é **cirúrgica**, e a **extraperitoneal** costuma ser tratada com sonda.|q-sirio2021-024]]`,
          texto: `- **Hematúria microscópica** sem choque: não exige imagem se o exame físico é normal. {q-scmsp2021-026}
- Lesão renal estável: **observação com monitorização hemodinâmica**. {q-usp2023-018}
- Laceração renal **< 1 cm** com hematoma: **grau II**. {q-famema2023-080}
- Fratura de bacia, retenção e uretrorragia: **uretra posterior**, **uretrocistografia** e **cistostomia**. {q-unicamp2022-017}
- Queda "a cavaleiro" com hematoma perineal: lesão de **uretra**. {q-famerp2025-065}
- Líquido livre na pelve e hematúria, com cistografia: **bexiga intraperitoneal**, exploração cirúrgica. {q-sirio2021-024}` },
        { id: "org-oca-duodeno", titulo: "Vísceras ocas, duodeno, pâncreas e reto", conferir: true, diretrizes: ["aast"],
          questoes: ["q-unifesp2022-008","q-famema2023-063","q-tp20212-079","q-usprp2026-007","q-unicampdis2023-023","q-einstein2024-020"],
          prosa: `O **duodeno** e o **pâncreas** são **retroperitoneais**, e a lesão deles é silenciosa: [[o **gás no retroperitônio** na tomografia de um trauma fechado sem peritonite indica **perfuração do duodeno (segunda porção)**; o hematoma que atinge **duas porções** duodenais é **grau II** da AAST; na criança que cai de bicicleta com guidão no abdome, pensa-se em **pâncreas ou duodeno**.|q-tp20212-079,q-famema2023-063,q-unicampdis2023-023]]

[[A lesão do **corpo ou cauda do pâncreas** com dor epigástrica e estabilidade, depois de colisão, trata-se por **pancreatectomia distal**; o **reto** com laceração de mais de 50% da parede posterior e espículas ósseas é tratado com **laparotomia, sigmoidostomia derivativa, drenagem do espaço pré-sacral e lavagem do reto distal**; a **mangueira de ar comprimido** (barotrauma colônico) com distensão e taquicardia é **laparotomia**, e não colonoscopia ou enema.|q-usprp2026-007,q-unifesp2022-008,q-einstein2024-020]]`,
          texto: `- **Gás no retroperitônio** em trauma fechado: **perfuração da segunda porção do duodeno**. {q-tp20212-079}
- Hematoma em **duas porções** do duodeno: **grau II** (AAST). {q-famema2023-063}
- Criança com queda de bicicleta e dor abdominal: **pâncreas e/ou duodeno**. {q-unicampdis2023-023}
- Dor epigástrica estável após colisão com lesão pancreática do corpo: **pancreatectomia distal**. {q-usprp2026-007}
- Reto com laceração > 50% e espículas ósseas: **laparotomia, sigmoidostomia, drenagem pré-sacral, lavagem do reto**. {q-unifesp2022-008}
- Barotrauma por ar comprimido no ânus: **laparotomia**. {q-einstein2024-020}` },
      ],
    },
    {
      id: "danos", titulo: "Controle de danos, hipertensão abdominal e retroperitônio",
      introducao: `[[O **controle de danos** abandona a cirurgia completa na primeira ida ao centro cirúrgico quando o paciente está em **hipotermia, acidose e coagulopatia**: faz-se só o que salva (parar a hemorragia e a contaminação), **deixa-se o abdome aberto** (peritoniostomia) e corrige-se o ciclo na UTI para retornar ao tratamento definitivo.|q-udisc20262-062,q-famema2021-006,q-famerp2025-080]]`,
      fragmentos: [
        { id: "dan-conduta", titulo: "Controle de danos, ácido tranexâmico, hipertensão e síndrome compartimental", conferir: true, diretrizes: ["atls","wses-abdominal"],
          questoes: ["q-famema2021-006","q-udisc20262-062","q-amrigs2025-033","q-amrigs2025-040","q-famema2022-079","q-famema2023-066","q-amrigs2023-034","q-famerp2025-080"],
          prosa: `[[Nas **lesões intestinais múltiplas** em paciente em choque, o cirurgião **limita-se à contenção do extravasamento** com reparo rápido e ressecção com grampeamento, sem anastomose definitiva, e fecha depois; no instável com esplenectomia e lesão vascular retroperitoneal de difícil controle, a conduta é a **cirurgia de controle de danos, correção da hipotermia, acidose e coagulopatia e retorno**. No jovem em laparotomia por evisceração que desenvolve coagulopatia, faz-se controle de danos, peritoniostomia e plasma fresco.|q-famema2021-006,q-udisc20262-062,q-famerp2025-080]]

[[O **ácido tranexâmico** reduz a mortalidade quando dado **precocemente**; a tromboelastografia identifica o tipo de coagulopatia; a reposição com muito cristaloide é contraindicada.|q-amrigs2025-033]]

[[A **pressão intra-abdominal** se afere pela sonda vesical, instilando **25 mL** de solução salina; a hipertensão abdominal tem graus: o **grau II** vai de **21 a 26 cmH₂O** (cerca de 16 a 20 mmHg), e a pressão acima de **20 mmHg** com disfunção orgânica nova (oligúria, lactato alto, hipercapnia) é a **síndrome compartimental**, tratada por **laparotomia descompressiva**, como no paciente de 36 cmH₂O.|q-famema2022-079,q-famema2023-066,q-amrigs2025-040]] [[O **retroperitônio** tem três zonas na laparotomia: a **zona 1** é central, com as estruturas vasculares centrais (aorta, cava, duodeno e pâncreas); a **zona 2** é lateral, com o rim; a **zona 3** é a pelve.|q-amrigs2023-034]]`,
          texto: `- Lesões intestinais múltiplas e choque: **conter o extravasamento** e ressecar com grampeamento, sem anastomose. {q-famema2021-006}
- Esplenectomia com lesão vascular retroperitoneal de difícil controle: **controle de danos**, corrigir hipotermia, acidose e coagulopatia, **retornar**. {q-udisc20262-062}
- Coagulopatia na laparotomia: **controle de danos, peritoniostomia e plasma fresco**. {q-famerp2025-080}
- **Ácido tranexâmico** precoce reduz a mortalidade. {q-amrigs2025-033}
- **Pressão intra-abdominal**: sonda vesical com **25 mL** de salina. {q-famema2022-079}
- **Hipertensão abdominal grau II**: **21 a 26 cmH₂O**. {q-famema2023-066}
- PIA de 36 cmH₂O com oligúria e lactato elevado: **laparotomia descompressiva**. {q-amrigs2025-040}
- Retroperitônio: **zona 1** = estruturas vasculares centrais. {q-amrigs2023-034}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-uspsp3-114","q-uspsp5-052","q-famerp2023-063","q-sirio2022-036","q-usp2024-030"],
          prosa: `[[A regra para lesão de vias urinárias no trauma fechado é investigar com imagem (cistografia, tomografia); a USP 2020 cobrou **laparoscopia** no atropelado estável com dor abdominal e hematúria.|q-uspsp3-114]] [[A **ruptura diafragmática** se trata cirurgicamente; a USP cobrou **laparoscopia** para o esmagado com estômago herniado e estável.|q-uspsp5-052]] [[Lesão esplênica grau I em ferimento por arma branca nas costas, sem blush, com pouco líquido: a regra de lesão baixa é observação, mas a Sírio de 2022 cobrou **laparoscopia**.|q-sirio2022-036]] [[Em ferida por faca no 7º espaço intercostal direito com hemotórax maciço e choque, a USP 2024 deu como correta a alternativa de que **lesões abdominais podem ser descartadas**, ao contrário da regra de que a transição toracoabdominal exige pesquisar o diafragma e o abdome.|q-usp2024-030]] [[No paciente estável com dor abdominal, a FAMERP 2023 cobrou **arteriografia e embolização hepática e, em seguida, laparotomia**.|q-famerp2023-063]]`,
          texto: `- Regra: vias urinárias e peritônio se estudam por imagem; a prova (USP) cobrou **laparoscopia** no atropelado estável. {q-uspsp3-114}
- Regra: rotura de diafragma é cirúrgica; a prova (USP) cobrou **laparoscopia**. {q-uspsp5-052}
- Regra: lesão esplênica de baixo grau estável é observação; a prova (Sírio 2022) cobrou **laparoscopia** em ferimento de dorso. {q-sirio2022-036}
- Regra: a transição toracoabdominal exige pesquisar o diafragma e o abdome; a prova (USP 2024) cobrou que as **lesões abdominais podem ser descartadas** no hemotórax maciço com choque. {q-usp2024-030}
- Regra: o estável com hemoperitônio pode ser embolizado; a prova (FAMERP 2023) cobrou **arteriografia e embolização hepática e, em seguida, laparotomia**. {q-famerp2023-063}` },
      ],
    },
  ],
});
