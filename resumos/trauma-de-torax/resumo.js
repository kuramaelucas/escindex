/* resumos/trauma-de-torax/resumo.js — resumo adaptativo de trauma de tórax: pneumotórax hipertensivo, aberto, simples e oculto,
   drenagem torácica (retirada e falhas), hemotórax e hemotórax retido, transição toracoabdominal e diafragma, costelas e
   tórax instável, contusão pulmonar, tamponamento cardíaco, toracotomia de reanimação e lesão de aorta.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- trauma-de-torax */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "trauma-de-torax",
  titulo: "Trauma de tórax",
  assunto: "ass-traumatorax",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "atls", texto: "American College of Surgeons — ATLS, 10ª edição: trauma torácico (pneumotórax hipertensivo, aberto, hemotórax, tórax instável, tamponamento)", edicao: "10ª", lidoEm: null },
    { id: "wses-torax", texto: "WSES — diretrizes de trauma torácico (hemotórax retido, VATS, fixação de costelas)", lidoEm: null },
    { id: "east-toracotomia", texto: "EAST — toracotomia de reanimação (indicações e sinais de vida)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "ameacas", titulo: "Pneumotórax: hipertensivo, aberto, simples e oculto",
      introducao: `[[As lesões torácicas que **matam em minutos** (pneumotórax hipertensivo, pneumotórax aberto, hemotórax maciço, tórax instável com contusão, tamponamento cardíaco) são **diagnósticas pelo exame clínico** e tratadas **na avaliação primária (B e C do ABCDE)**, antes da radiografia e da tomografia.|q-sessp2026-039,q-tp20212-078,q-sessp2022-027]] O **pneumotórax hipertensivo** é o exemplo: o ar entra na pleura e não sai, o pulmão colapsa, o mediastino é empurrado e o **retorno venoso cai**, com choque obstrutivo.

Veja também: **Atendimento inicial ao politraumatizado (ATLS)** (avaliação primária e choque), **Trauma abdominal** (transição toracoabdominal, diafragma), **Traumatismo cranioencefálico** e **Emergências pediátricas: insuficiência respiratória e parada** (ventilação).`,
      fragmentos: [
        { id: "ptx-hipertensivo", titulo: "Pneumotórax hipertensivo: diagnóstico clínico e descompressão", conferir: true, diretrizes: ["atls"],
          figuras: [{ arquivo: "figuras/ameacas-primarias.svg", legenda: "Esquema autoral: ameaças imediatas à vida no trauma de tórax e a conduta." }],
          questoes: ["q-scmsp2022-002","q-scmsp2023-032","q-sessp2022-027","q-sessp2026-039","q-tp20212-078","q-tp20252-030","q-unicamp2023-021","q-unesp2025-076","q-sirio2025-027","q-fmabc2022-031","q-uspsp5-014"],
          prosa: `[[O quadro é **dispneia intensa, hipotensão e taquicardia, turgência jugular, desvio da traqueia para o lado oposto, assimetria torácica, murmúrio vesicular abolido e hipertimpanismo** do lado afetado, com hipoxemia que não melhora com oxigênio; o diagnóstico é **clínico**, e a conduta é **descomprimir antes da radiografia, da tomografia, da reposição volêmica ou da intubação**, porque a pressão positiva agrava o pneumotórax.|q-scmsp2022-002,q-tp20212-078,q-tp20252-030,q-unicamp2023-021,q-sirio2025-027,q-fmabc2022-031]] [[A descompressão se faz com **agulha ou cateter calibroso** no **5º espaço intercostal, anterior à linha axilar média** (o 2º espaço na linha hemiclavicular é a alternativa descrita), seguida de **toracostomia com drenagem em selo d'água**; identificada e tratada a ameaça à vida, prossegue-se com a avaliação das demais lesões.|q-scmsp2023-032,q-sessp2022-027,q-unesp2025-076,q-sessp2026-039]]

[[Antes de drenar o "pneumotórax" do paciente intubado, confira o tubo: o que parece pneumotórax pode ser **intubação seletiva do brônquio principal direito**, que ventila só um pulmão e causa murmúrio ausente e hipoxemia à esquerda; o ultrassom sem **lung point** (sinal do pneumotórax) mostra pulmão não ventilado, e a conduta é **tracionar o tubo** e reavaliar.|q-uspsp5-014]]`,
          texto: `- Atropelamento com intubação, murmúrio abolido e hipertimpanismo à direita, SpO2 81 % e PA 90 x 50: **toracocentese de alívio e drenagem**. {q-scmsp2022-002}
- Arma de fogo no 4º espaço, SpO2 78 %, murmúrio ausente e timpanismo: **toracocentese no 5º espaço, imediatamente anterior à linha axilar média**. {q-scmsp2023-032}
- Facada sobre o mamilo, FR 50 e SpO2 72 %: **punção do 5º espaço entre as linhas axilares média e anterior**, antes da radiografia e da intubação. {q-sessp2022-027}
- Desvio da traqueia, turgência jugular, hipotensão e murmúrio abolido: **punção de alívio** seguida de drenagem; foi a conduta adequada. {q-sessp2026-039}
- Motorista com turgência jugular, desvio da traqueia e hipertimpanismo à direita: **punção torácica descompressiva**. {q-tp20212-078}
- PA 82/61, SaO2 90 % com 13 L/min, desvio da traqueia e hemitórax esquerdo timpânico: **toracocentese de alívio**. {q-tp20252-030}
- Enfisema subcutâneo, turgência jugular e desvio da traqueia: **punção do espaço pleural**. {q-unicamp2023-021}
- Hipotensão, turgência jugular, crepitação costal e murmúrio abolido à esquerda: **toracocentese de alívio**. {q-unesp2025-076}
- Desvio da traqueia, jugulares ingurgitadas e murmúrio ausente à direita: **pneumotórax hipertensivo**. {q-sirio2025-027}
- SatO2 81 %, PA 80 x 40 e murmúrio ausente à esquerda: **punção descompressiva e toracostomia com drenagem**. {q-fmabc2022-031}
- Intubado em cena com bougie, murmúrio ausente à esquerda e sem lung point: **tração do tubo endotraqueal**. {q-uspsp5-014}` },
        { id: "ptx-outros", titulo: "Pneumotórax aberto, simples, oculto e a drenagem depois da descompressão", conferir: true, diretrizes: ["atls"],
          casos: ["q-uspsp4-051"],
          questoes: ["q-uspsp4-051","q-sirio2026-024","q-didepm-082","q-unesp2026-080","q-sirio2021-029","q-famerp2024-029","q-sirio2021-038"],
          prosa: `No **pneumotórax aberto** (ferida da parede maior que cerca de dois terços do diâmetro da traqueia), o ar passa pela ferida em vez de pela via aérea e há **ruído de sucção, dispneia e hipoxemia**. [[A conduta é o **curativo oclusivo fixado em três lados**, que funciona como válvula (deixa o ar sair e não entrar), seguido de **drenagem torácica em outro local**; o curativo hermético em quatro lados, sem dreno, transformaria o pneumotórax aberto em hipertensivo.|q-uspsp4-051,q-sirio2026-024,q-didepm-082]] [[O pneumotórax **pequeno, achado só na tomografia** (oculto), em paciente estável (SpO2 98 %, sem dispneia) que não será ventilado, **observa-se**; o **grande** (4 cm da parede) e sintomático, com SpO2 de 93 %, **drena-se**.|q-sirio2021-029,q-famerp2024-029]] [[Após a descompressão digital ou com agulha, o tratamento definitivo é **drenar o tórax pelo mesmo orifício** com dreno tubular e fazer a radiografia depois.|q-sirio2021-038]]`,
          texto: `- Ferimento aberto de 2 cm com escape de ar, SpO2 91 %: **curativo de 3 pontas**. {q-uspsp4-051}
- Ferida de 6 cm com traumatopneia e expansibilidade reduzida: **curativo de 3 pontas e drenagem torácica**. {q-sirio2026-024}
- Ferida de 3 cm com ruído de sucção, SaO2 86 %: **curativo fixado em três lados e dreno em outro local**. {q-didepm-082}
- Ferida aspirativa torácica posterior com SatO2 de 88 a 90 %: a prova cobrou o **curativo em quatro pontas, com o tórax drenado** (ver Armadilhas). {q-unesp2026-080}
- Fratura do 8º arco e pneumotórax laminar só na tomografia, sinais normais: **pneumotórax oculto, observação**. {q-sirio2021-029}
- Pneumotórax de 4 cm de distância e SpO2 93 %: **drenagem torácica**. {q-famerp2024-029}
- Descompressão digital no 4º espaço: **drenar pelo mesmo orifício** e fazer a radiografia depois. {q-sirio2021-038}` },
      ],
    },
    {
      id: "drenagem", titulo: "Drenagem torácica: retirada, falhas e fístula",
      introducao: `[[O dreno cumpre seu papel quando o pulmão está expandido, não há escape aéreo e o débito é **seroso e baixo**; quando o pneumotórax **persiste**, a primeira pergunta é se o **dreno está bem posicionado** e funcionando.|q-usp2026-044,q-uspsp3-099,q-einstein2025-018]]`,
      fragmentos: [
        { id: "dreno-retirada", titulo: "Quando retirar o dreno e o selo d'água", conferir: true, diretrizes: ["atls"],
          figuras: [{ arquivo: "figuras/dreno-toracico.svg", legenda: "Esquema autoral: critérios de retirada do dreno de tórax e causas de pneumotórax persistente." }],
          questoes: ["q-usp2026-044","q-famerp2023-062","q-einstein2022-025","q-unesp2022-070"],
          prosa: `[[Retira-se o dreno quando há **pulmão expandido na radiografia, ausência de escape aéreo** (mesmo com manobra de Valsalva) e **débito seroso abaixo de 100 a 200 mL por dia** (40 mL, 65 mL e 90 mL nos casos), sem esperar o débito ser nulo nem aspiração, videotoracoscopia ou tomografia; a retirada é feita **com manobra de Valsalva** (não durante a inspiração) e a **radiografia de controle** vem depois.|q-usp2026-044,q-famerp2023-062,q-einstein2022-025]] [[No selo d'água, o tubo imerso reflete a pressão pleural: na **expiração**, o volume da caixa diminui, a pressão pleural **aumenta** e a coluna de líquido **desce**; na inspiração, o volume aumenta, a pressão cai e a coluna sobe.|q-unesp2022-070]]`,
          texto: `- Hemopneumotórax drenado há 5 dias, débito seroso de 40 mL/dia, sem borbulhar e pulmão expandido: **retirar o dreno com manobra de Valsalva**. {q-usp2026-044}
- 5º dia, débito de 65 mL em 24 horas e sem escape de ar: **retirar o dreno e fazer radiografia de controle**. {q-famerp2023-062}
- Débitos de 400, 300, 300, 150 e 90 mL, seroso, sem escape: **retirar já**, pois o débito é menor que 100 mL/dia. {q-einstein2022-025}
- Na **expiração**: volume da caixa diminui, pressão pleural aumenta e a coluna do selo d'água **desce**. {q-unesp2022-070}` },
        { id: "dreno-falha", titulo: "Pneumotórax que persiste: dreno mal posicionado, segundo dreno e lesão brônquica", conferir: true, diretrizes: ["atls"],
          questoes: ["q-usprp2023-092","q-unesp2023-063","q-uspsp3-099","q-einstein2025-018","q-unicampdis2025-062"],
          prosa: `Quando o pulmão não reexpande, há duas explicações: o dreno **não está funcionando** (fora do espaço pleural ou mal posicionado) ou há um **escape de ar maior que a capacidade de um dreno**. [[Se o dreno está **bem posicionado** e o pneumotórax persiste com **grande escape aéreo** (o frasco borbulha muito) e enfisema subcutâneo crescente, **coloca-se um segundo dreno**; se o dreno está **mal posicionado**, retira-se e **drena-se de novo**; na dúvida (grande pneumotórax, pulmão colapsado e enfisema à tomografia), a primeira conduta é **reavaliar o dreno**.|q-usprp2023-092,q-unesp2023-063,q-uspsp3-099,q-einstein2025-018]] [[A **fuga aérea que se mantém por dias**, mesmo com o sistema de aspiração revisado e adequado, num pneumotórax volumoso do trauma de alta energia, é **lesão brônquica com fístula broncopleural**.|q-unicampdis2025-062]]`,
          texto: `- Dreno bem posicionado, pneumotórax persistente, coletor borbulhando muito (SpO2 90 %): **segundo dreno**. {q-usprp2023-092}
- Pneumotórax hipertensivo drenado, grande escape e enfisema crescente: **segundo dreno torácico**. {q-unesp2023-063}
- Grande pneumotórax ainda presente à tomografia apesar do dreno: **reavaliar o dreno**. {q-uspsp3-099}
- Dor, taquipneia, SatO2 93 % e dreno fora do espaço pleural na radiografia: **retirar e drenar de novo**. {q-einstein2025-018}
- Fuga aérea no 3º dia, com drenagem adequada em aspiração: **lesão brônquica, fístula broncopleural**. {q-unicampdis2025-062}` },
      ],
    },
    {
      id: "hemotorax", titulo: "Hemotórax e transição toracoabdominal",
      introducao: `[[O **hemotórax** (murmúrio diminuído e macicez, sem turgência jugular) se trata com **drenagem torácica**, e a decisão de operar depende do **débito inicial** e da **estabilidade**; o hemotórax que fica na pleura **coagula**, infecta e vira empiema.|q-tp20202-078,q-usprp2021-074,q-uspsp5-051]]`,
      fragmentos: [
        { id: "hemotorax-retido", titulo: "Hemotórax maciço e hemotórax retido", conferir: true, diretrizes: ["atls","wses-torax"],
          questoes: ["q-tp20202-078","q-usprp2021-074","q-usprp2022-021","q-uspsp5-051"],
          prosa: `[[No choque hemorrágico com **dor torácica, murmúrio diminuído e percussão maciça sem estase jugular**, a conduta é **drenagem torácica** (o hemotórax é o que explica o choque; FAST positivo abdominal não muda a ordem no tórax); e depois da drenagem, o **hemotórax retido** (dreno retirado em 24 a 48 horas, dor pleurítica e febre, tomografia com coleção organizada ou coagulada, ou piora ventilatória com opacidade persistente) trata-se com **videotoracoscopia (VATS)** precoce, e não com novo dreno calibroso, fibrinolítico, toracotomia com decorticação ou antibiótico isolado.|q-tp20202-078,q-usprp2021-074,q-usprp2022-021,q-uspsp5-051]]`,
          texto: `- Motorista com PA 80 x 50, murmúrio diminuído e macicez à direita, sem estase jugular: **drenagem torácica**. {q-tp20202-078}
- Dreno retirado em 24 horas, 5 dias depois dor pleurítica, febre e coagulado na tomografia: **videotoracoscopia (VATS)**. {q-usprp2021-074}
- Dreno retirado em 48 horas, 14 dias depois febre e coleção organizada: **VATS**. {q-usprp2022-021}
- Hemotórax drenado que, em 72 horas, mostra loculação e piora ventilatória: **videotoracoscopia**. {q-uspsp5-051}` },
        { id: "toracoabdominal", titulo: "Transição toracoabdominal e hérnia diafragmática", conferir: true, diretrizes: ["atls"],
          questoes: ["q-famerp2025-078","q-sirio2024-039","q-famerp2022-068","q-sirio2025-021"],
          prosa: `A zona **toracoabdominal** (do mamilo ao rebordo costal) tem tórax e abdome no mesmo ferimento, e o **diafragma** pode estar lesado. [[No ferimento por arma branca estável, com pequeno hemopneumotórax no 7º espaço, faz-se **laparoscopia** (diagnóstica e terapêutica) com **drenagem torácica por pigtail** guiada por ultrassom; no **instável**, com 2 L no dreno e FAST positivo em hepatorrenal e pelve, a próxima conduta é a **laparotomia exploradora**, porque o sangramento é também abdominal.|q-sirio2024-039,q-famerp2025-078]] [[A **hérnia diafragmática traumática** mostra no raio X **vísceras abdominais no hemitórax** (sonda gástrica ascendendo, perda da silhueta diafragmática) e se trata **cirurgicamente**; se, durante a drenagem torácica, o dedo encontra vísceras, a prova cobrou **manter a drenagem na mesma incisão, protegendo as vísceras** (ver Armadilhas).|q-sirio2025-021,q-famerp2022-068]]`,
          texto: `- Arma branca no 7º espaço esquerdo, estável, pequeno hemopneumotórax: **laparoscopia e drenagem com pigtail** guiada por ultrassom. {q-sirio2024-039}
- Transição toracoabdominal direita, instável, 2 L no dreno e FAST positivo: **laparotomia exploradora**. {q-famerp2025-078}
- Vísceras abdominais encontradas na drenagem do hemitórax esquerdo: a prova cobrou **manter o dreno na mesma incisão**. {q-famerp2022-068}
- Radiografia com vísceras no tórax após colisão com Glasgow 4: **hérnia diafragmática traumática**, cirurgia. {q-sirio2025-021}` },
      ],
    },
    {
      id: "parede", titulo: "Costelas, tórax instável e contusão pulmonar",
      introducao: `[[A principal causa de hipoxemia no tórax instável **não é o movimento paradoxal**, e sim a **contusão pulmonar** subjacente (hemorragia e edema alveolar) e a **dor**, que impede a respiração profunda e a tosse e leva à atelectasia e à pneumonia: por isso o tratamento é **analgesia eficaz, oxigênio, fluidos criteriosos e suporte ventilatório se a hipoxemia persistir**.|q-adap21-074,q-iamspe2021-027,q-scmsp2022-003]]`,
      fragmentos: [
        { id: "costelas-instavel", titulo: "Fraturas de costelas, tórax instável e contusão", conferir: true, diretrizes: ["atls","wses-torax"],
          questoes: ["q-adap21-074","q-iamspe2021-027","q-scmsp2023-034","q-scmsp2021-036","q-iamspe2025-037","q-udisc20262-079","q-famema2022-077","q-scmsp2022-003","q-usp2023-009"],
          prosa: `O **tórax instável** é o segmento da parede que se move de forma **paradoxal** (para dentro na inspiração) por fraturas de **dois ou mais arcos em dois pontos cada**. [[O paciente com cinco ou três arcos fraturados em dois pontos, movimento paradoxal, FR 28 e SpO2 88 % recebe **analgesia com bloqueio regional, oxigênio, fluidos criteriosos e ventilação não invasiva ou intubação** se a hipoxemia persistir, e não hidratação vigorosa, atadura circular compressiva ou fixação cirúrgica de rotina; o paciente com quatro arcos em dois pontos que está **eupneico**, com expansibilidade preservada, faz **só analgesia e fisioterapia respiratória**.|q-adap21-074,q-iamspe2021-027,q-scmsp2023-034]] [[A **contusão pulmonar** piora em **24 a 72 horas**: o atropelado que no terceiro dia fica com dispneia, rebaixamento, crepitações e PaO2 de 55 mmHg precisa de **intubação e higiene brônquica**; no politrauma intubado com SpO2 de 85 %, sem pneumotórax, sem enfisema e com FAST negativo, trata-se com **ventilação mecânica protetora** (FiO2 e PEEP).|q-scmsp2022-003,q-usp2023-009]]

[[As fraturas de costelas inferiores direitas com pequeno velamento do seio costofrênico, no paciente estável, recebem **analgesia e fisioterapia respiratória**, sem antibiótico nem fixação; no idoso com fratura de 6º arco isolada, a **ultrassonografia point-of-care** detecta fratura, pneumotórax e hemotórax pequenos; na idosa com três costelas fraturadas sem desvio, o tratamento é **analgesia potente (inclusive opioides), fisioterapia, deambulação e radiografias de controle**, e a fixação não é mandatória.|q-scmsp2021-036,q-iamspe2025-037,q-udisc20262-079]] [[A principal complicação do **bloqueio intercostal** é o **pneumotórax**.|q-famema2022-077]]`,
          texto: `- Cinco arcos em dois pontos, movimento paradoxal, SpO2 88 %: **analgesia regional, oxigênio, fluidos criteriosos e VNI ou intubação**. {q-adap21-074}
- Guindaste, 8ª a 10ª costelas com movimento paradoxal: **tórax instável**; oxigenação adequada, de máscara à intubação. {q-iamspe2021-027}
- Quatro arcos em dois pontos, contusão e mínimo derrame, eupneico: **analgesia e fisioterapia respiratória apenas**. {q-scmsp2023-034}
- Fraturas da 9ª à 12ª costela direitas com pequeno velamento do seio: **analgesia e fisioterapia respiratória**. {q-scmsp2021-036}
- Idosa com fratura isolada do 6º arco, estável: **ultrassonografia point-of-care** é útil. {q-iamspe2025-037}
- Fraturas sem desvio do 6º ao 8º arco em idosa: **analgesia, fisioterapia, deambulação e radiografias de controle**. {q-udisc20262-079}
- Complicação principal do bloqueio intercostal: **pneumotórax**. {q-famema2022-077}
- 3º dia, dispneia, rebaixamento, PaO2 de 55: **contusão pulmonar**, intubação e higiene brônquica. {q-scmsp2022-003}
- Intubado, SpO2 85 %, ausculta diminuída à direita, FAST negativo, opacidades alveolares: **ventilação mecânica**. {q-usp2023-009}` },
      ],
    },
    {
      id: "cardio", titulo: "Tamponamento cardíaco, toracotomia de reanimação e aorta",
      introducao: `[[O **tamponamento cardíaco** é o sangue no pericárdio, que **não distende de forma aguda** e comprime as câmaras: **hipotensão, turgência jugular e bulhas hipofonéticas** (tríade de Beck), com líquido no pericárdio ao e-FAST; o tratamento definitivo é **cirúrgico**.|q-adap26-008,q-sessp2022-038,q-tp20222-079]]`,
      fragmentos: [
        { id: "tamponamento", titulo: "Tamponamento, janela pericárdica e toracotomia de reanimação", conferir: true, diretrizes: ["atls","east-toracotomia"],
          casos: ["q-usp2025-026"],
          questoes: ["q-adap26-008","q-sessp2022-038","q-tp20222-079","q-amrigs2020-034","q-sirio2027-026","q-usprp2027-072","q-sirio2026-030","q-einstein2024-018","q-sirio2027-038","q-usp2025-026","q-sirio2021-033"],
          prosa: `[[O ferimento **penetrante precordial** com hipotensão que não responde ao volume, estase jugular, bulhas hipofonéticas e líquido no pericárdio vai à **toracotomia ou esternotomia imediata** em centro cirúrgico, com reparo da lesão; não se pede ecocardiograma, angiotomografia, tomografia nem pericardiocentese como tratamento; no paciente **estável** com ferimento subxifóideo e líquido moderado no pericárdio, a conduta é a **esternotomia mediana exploradora**; e se o **FAST é inconclusivo** em ferimento precordial instável, faz-se a **janela pericárdica subxifoide**.|q-adap26-008,q-sessp2022-038,q-usprp2027-072,q-sirio2027-026]] [[A **mediastinoscopia** não é conduta no hemopericárdio (é procedimento de estadiamento mediastinal); aceitam-se a pericardiocentese subxifoidea, a janela pericárdica e a toracotomia; no trauma **fechado** com tríade de Beck e alargamento do mediastino, a prova cobrou a **pericardiocentese** (ver Armadilhas); e a queda súbita da pressão com aumento da PVC e do débito reduzido numa laparotomia por trauma contuso é **tamponamento por hemopericárdio**.|q-amrigs2020-034,q-tp20222-079,q-sirio2026-030]]

[[Quando o ferimento penetrante evolui para **AESP** ou parada, com **sinais de vida** (pupilas reativas, pulso carotídeo débil), a conduta é a **toracotomia de reanimação (anterolateral esquerda) na sala de emergência**, que libera o tamponamento, controla o sangramento cardíaco e permite a massagem aberta; a massagem externa, o REBOA e a esternotomia (opção em ambiente controlado) não substituem.|q-sirio2027-038,q-einstein2024-018]] [[O **objeto empalado** (faca) **não se retira** na emergência: com o paciente estável e o e-FAST negativo, faz-se a **tomografia de tórax** para planejar a retirada no centro cirúrgico; e o ferimento da **zona I do pescoço** com choque e sangramento retroclavicular sem controle por compressão se tampona, por ora, com **sonda de Foley calibrosa e balão insuflado** pelo ferimento.|q-usp2025-026,q-sirio2021-033]]`,
          texto: `- Facada paraesternal, PA 70 x 40, estase jugular e líquido no pericárdio: **toracotomia ou esternotomia imediata**. {q-adap26-008}
- Facada no precórdio, FAST positivo no pericárdio, 90 x 70 e abafamento de bulhas: **centro cirúrgico, toracotomia esquerda**. {q-sessp2022-038}
- Colisão frontal, abafamento de bulhas, estase jugular e alargamento do mediastino: a prova cobrou **pericardiocentese**. {q-tp20222-079}
- Conduta **não aceita** no tamponamento: **mediastinoscopia** (pericardiocentese, janela e toracotomia são aceitas). {q-amrigs2020-034}
- Facada precordial, FAST inconclusivo e instabilidade: **janela pericárdica subxifoide**. {q-sirio2027-026}
- Facada subxifóidea há 12 horas, estável, FAST com líquido moderado: **esternotomia mediana exploradora**. {q-usprp2027-072}
- Queda da pressão, PVC alta e débito baixo em laparotomia por trauma: **tamponamento por hemopericárdio**. {q-sirio2026-030}
- Facada precordial que evolui para AESP: **toracotomia anterolateral esquerda de reanimação**. {q-einstein2024-018}
- Ferimento torácico com AESP, pupilas reativas e pulso carotídeo débil: **toracotomia de reanimação na sala de emergência**. {q-sirio2027-038}
- Faca empalada no tórax, estável e e-FAST negativo: **tomografia de tórax**; não retirar a faca. {q-usp2025-026}
- Ferimento cervical da zona I com choque e sangramento retroclavicular: **sonda de Foley com balão insuflado**. {q-sirio2021-033}` },
        { id: "aorta", titulo: "Lesão traumática de aorta", conferir: true, diretrizes: ["atls"],
          questoes: ["q-unifesp2026-008","q-unicamp2022-021","q-unesp2023-065","q-unicampdis2024-076"],
          prosa: `A **lesão da aorta** é do trauma de **desaceleração** (colisão frontal, queda de altura), com ruptura do istmo, onde a aorta é fixa. [[O raio X mostra **alargamento do mediastino** (acima de 8 cm ou 25 % da largura do tórax), **apagamento do botão aórtico**, **rebaixamento do brônquio principal esquerdo**, fratura dos primeiros arcos costais e o **capuz apical (derrame extrapleural apical)**, o achado mais sugestivo; o exame que confirma é a **angiotomografia de tórax** (a tomografia sem contraste não é aceita).|q-unifesp2026-008,q-unicamp2022-021,q-unesp2023-065,q-unicampdis2024-076]]`,
          texto: `- Fratura dos primeiros arcos, alargamento do mediastino e rebaixamento do brônquio esquerdo: **lesão de aorta**. {q-unifesp2026-008}
- Mediastino superior alargado e botão aórtico apagado após colisão frontal: **lesão traumática de aorta**. {q-unicamp2022-021}
- Achado radiológico mais sugestivo: **derrame extrapleural apical** (capuz apical). {q-unesp2023-065}
- Colisão frontal em alta velocidade e mediastino alargado: **angiotomografia de tórax** confirma. {q-unicampdis2024-076}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-unesp2026-080","q-tp20222-079","q-famerp2022-068","q-sessp2026-039","q-scmsp2023-032","q-sessp2022-027"],
          prosa: `[[No pneumotórax aberto a regra é o **curativo fixado em três lados**, com a drenagem em outro local; a Unesp 2026 cobrou o **curativo em quatro pontas, desde que o tórax esteja drenado**.|q-unesp2026-080]] [[No tamponamento a regra é a **cirurgia** (ou a janela pericárdica); o Teste de Progresso 2022 cobrou a **pericardiocentese** no trauma fechado com mediastino alargado.|q-tp20222-079]] [[Ao encontrar vísceras no dedo durante a drenagem, muitos serviços interrompem o dreno; a FAMERP 2022 cobrou **manter a drenagem na mesma incisão, protegendo as vísceras**, e a banca tem ressalvas.|q-famerp2022-068]] [[O local da agulha: o **5º espaço intercostal anterior à linha axilar média** (ATLS 10ª) foi cobrado pela Santa Casa 2023 e pela SES-SP 2022; o **2º espaço** na linha hemiclavicular é o sítio clássico e continua descrito, e a prova da SES-SP 2026 o citou ao aceitar a conduta.|q-scmsp2023-032,q-sessp2022-027,q-sessp2026-039]]`,
          texto: `- Regra: aberto = curativo de **três lados** e dreno em outro local; a prova (Unesp 2026) cobrou **quatro pontas com o tórax drenado**. {q-unesp2026-080}
- Regra: tamponamento pede cirurgia ou janela; a prova (TP 2022) cobrou **pericardiocentese** no trauma fechado. {q-tp20222-079}
- Regra: muitos serviços interrompem o dreno ao achar vísceras; a prova (FAMERP 2022) cobrou **manter a drenagem na mesma incisão**. {q-famerp2022-068}
- Regra: agulha no **5º espaço anterior à linha axilar média**; o **2º espaço hemiclavicular** aparece em provas e continua descrito. {q-scmsp2023-032,q-sessp2022-027,q-sessp2026-039}` },
      ],
    },
  ],
});
