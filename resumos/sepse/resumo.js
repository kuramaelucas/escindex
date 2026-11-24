/* resumos/sepse/resumo.js — resumo adaptativo de sepse e choque séptico: definições (Sepsis-3, SIRS, SOFA, qSOFA), fisiopatologia,
   pacote da primeira hora, vasopressor, controle do foco, sepse na criança e divergências entre diretrizes antigas e atuais.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- sepse */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "sepse",
  titulo: "Sepse e choque séptico",
  assunto: "ass-sepse",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "sepsis-3", texto: "Singer et al. — The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3), JAMA 2016", lidoEm: null },
    { id: "ssc-2021", texto: "Surviving Sepsis Campaign — International Guidelines for Management of Sepsis and Septic Shock 2021 (adultos) e Surviving Sepsis Campaign pediátrica 2020", lidoEm: null },
    { id: "phoenix-2024", texto: "Phoenix Sepsis Criteria — critérios de sepse e choque séptico pediátricos (JAMA 2024)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas pela banca (gabarito do material de origem desatualizado ou em desacordo com a literatura)", questoes: ["q-gdsepse-010","q-gdsepse-015","q-gdsepse-087","q-gdsepse-093","q-gdsepse-094"] },
  ],
  doencas: [
    {
      id: "definicoes", titulo: "Definições, triagem e reconhecimento",
      introducao: `[[A **sepse** é a **disfunção orgânica ameaçadora à vida causada por resposta desregulada do hospedeiro à infecção** (Sepsis-3); a disfunção se mede por **aumento de 2 pontos ou mais no SOFA**, e o **choque séptico** é a sepse que, apesar de volume adequado, **exige vasopressor para manter a PAM em 65 mmHg ou mais, com lactato acima de 2 mmol/L**.|q-inf-01,q-inf-02,q-unifesp2023-019,q-gdsepse-003]] A resposta inflamatória (SIRS) pode existir **sem infecção** (pancreatite, queimadura), e por isso já não define sepse.

Veja também: **Pneumonia no adulto**, **Infecção urinária** e **Infecções relacionadas à assistência**, **Neutropenia febril**, **Meningites** (meningococcemia) e **Reanimação** (choque).`,
      fragmentos: [
        { id: "def-sepsis3", titulo: "Sepsis-3, SOFA e choque séptico", conferir: true, diretrizes: ["sepsis-3"],
          questoes: ["q-inf-01","q-inf-02","q-unifesp2023-019","q-gdsepse-003","q-gdsepse-009","q-gdsepse-051","q-gdsepse-013","q-gdsepse-020","q-gdsepse-021","q-gdsepse-022","q-gdsepse-055","q-gdsepse-057","q-gdsepse-069"],
          prosa: `[[A definição **atual** é **conceitual** (disfunção orgânica por resposta desregulada à infecção) e **operacional** (infecção suspeita com **SOFA aumentado em 2 pontos ou mais**); o **SOFA** avalia seis sistemas (respiratório pela PaO2/FiO2, coagulação pelas plaquetas, fígado pela bilirrubina, cardiovascular pela PAM ou vasopressor, nervoso pelo Glasgow e renal pela creatinina ou diurese), e o **INR não faz parte**; o **choque séptico** é sepse com **vasopressor para PAM ≥ 65 e lactato > 2 mmol/L** apesar de volume; e o termo "**sepse grave**" (sepse com hipoperfusão ou disfunção) é do consenso antigo.|q-inf-01,q-inf-02,q-unifesp2023-019,q-gdsepse-003,q-gdsepse-009,q-gdsepse-051,q-gdsepse-057,q-gdsepse-020,q-gdsepse-021,q-gdsepse-022,q-gdsepse-069]] [[O Sepsis-3 usa o **SOFA para definir** e o **qSOFA como alerta de maior risco**, mais específico que os critérios antigos, mas sem bastar para o diagnóstico; e o **lactato acima de 2 mmol/L** reflete metabolismo anaeróbio por hipoperfusão.|q-gdsepse-055,q-gdsepse-013]]`,
          texto: `- Sepse (Sepsis-3): **disfunção orgânica ameaçadora à vida por resposta desregulada à infecção**. {q-inf-01,q-gdsepse-003,q-gdsepse-051}
- Choque séptico: sepse com **vasopressor para PAM ≥ 65 e lactato > 2** apesar de volume. {q-inf-02,q-gdsepse-020}
- Critério operacional: **aumento de 2 pontos no SOFA**. {q-unifesp2023-019,q-gdsepse-009}
- O SOFA avalia seis sistemas: respiratório, coagulação, hepático, cardiovascular, nervoso e renal. {q-gdsepse-021}
- **INR/TP não** é avaliado no SOFA. {q-gdsepse-057}
- Caso de pneumonia com PA 80x40, lactato de 4,5, Glasgow 12 e plaquetas de 77.000: **sepse**, com choque se persistir o vasopressor. {q-gdsepse-022}
- Sepse grave (termo antigo): sepse com hipoperfusão ou disfunção (acidose láctica, oligúria, alteração do nível de consciência). {q-gdsepse-069}
- Lactato acima de 2 mmol/L reflete metabolismo anaeróbio. {q-gdsepse-013}
- Os critérios novos são mais específicos, mas não bastam sozinhos para o diagnóstico. {q-gdsepse-055}` },
        { id: "quem-tem-sepse", titulo: "Reconhecer quem está em sepse", conferir: true, diretrizes: ["sepsis-3","ssc-2021"],
          questoes: ["q-sessp2023-007","q-gdsepse-006","q-gdsepse-031","q-gdsepse-053","q-gdsepse-062","q-gdsepse-056","q-gdsepse-014","q-gdsepse-016","q-gdsepse-036","q-gdsepse-032","q-gdsepse-058","q-gdsepse-027","q-gdsepse-039","q-gdsepse-089","q-fmabc2023-009","q-gdsepse-002","q-adap23-008","q-sirio2027-003","q-unifesp2023-015","q-tp20251-087","q-uspsp3-037"],
          prosa: `[[**Sepse é infecção mais disfunção orgânica**: a mulher que, depois de litotripsia, tem **PA de 90x40, FC de 102 e confusão, mesmo afebril**, está em sepse; o adolescente com **apendicite, PAS de 90 e FR de 24** também; a **diarreia febril com sonolência**, a **pneumonia nosocomial** com hipotensão e a **gestante de 21 semanas com disúria, hipotermia e taquicardia** (sinal de gravidade) igualmente; e **hipotermia** conta como alteração.|q-sessp2023-007,q-gdsepse-006,q-gdsepse-053,q-gdsepse-062,q-gdsepse-056,q-gdsepse-014,q-gdsepse-016,q-gdsepse-036,q-gdsepse-032,q-gdsepse-031,q-gdsepse-058,q-gdsepse-027,q-gdsepse-039,q-gdsepse-002,q-fmabc2023-009,q-tp20251-087,q-unifesp2023-015]] [[**Nem toda suspeita é igual**: no **choque ou sepse provável**, o antimicrobiano vai **na primeira hora**; na **sepse possível, sem choque** (idosa com febre, taquipneia e confusão, lactato de 1,8 e diagnóstico alternativo, como insuficiência cardíaca), **avalia-se rápido a probabilidade de infecção** e o antimicrobiano vem **em até 3 horas**; e o cirrótico com **encefalopatia, febre baixa e sem foco** pede **propedêutica rápida** de causas infecciosas e não infecciosas.|q-adap23-008,q-sirio2027-003,q-gdsepse-089]]`,
          texto: `- Mulher de 27 anos após litotripsia, afebril, PA 90x40, FC 102 e confusão: **sepse (e a de maior gravidade)**. {q-sessp2023-007,q-gdsepse-006}
- Apenas o cenário com **disfunção orgânica** (SOFA ≥ 2) é sepse (item II). {q-gdsepse-031}
- Adolescente com dor em fossa ilíaca direita, PA de 90x50 e FR de 24: **sepse** pelos critérios de 2016. {q-gdsepse-053}
- Idoso tabagista com "gripe", desorientação e hipotensão: **sepse**. {q-gdsepse-062}
- Febre e disúria com sonolência, oligúria, FR de 28 e Glasgow 13: **sepse**. {q-gdsepse-056}
- Diarreia febril com granulações tóxicas, sonolento: **sepse** (cristaloide balanceado, culturas e antibiótico precoce). {q-gdsepse-014}
- Diarreia aquosa com 35,6 °C e PA 80/40: **sepse**. {q-gdsepse-016}
- Sete dias internada com febre, tosse e crepitações: **sepse de foco pulmonar**. {q-gdsepse-036}
- Pneumonia com estertores, PA 80x60 e membros mal perfundidos: **choque séptico pulmonar**. {q-gdsepse-032}
- PAS 70, FR 28 e Glasgow 6: **qSOFA positivo (a afirmativa de que não é, é errada)**. {q-gdsepse-027}
- Febre, taquicardia, taquipneia e leucócitos alterados, desorientada: **a abertura do protocolo foi correta**. {q-gdsepse-039}
- Ferida operatória com secreção e 38,4 °C, sem disfunção: **não** é sepse (exceção). {q-gdsepse-089}
- Pneumonia de jovem com FC 112 e FR 24: sepse (a prova mandou UTI com ceftriaxona e azitromicina). {q-fmabc2023-009}
- Idosa com febre, taquipneia, confusão, lactato 1,8 e IC: **avaliar a probabilidade de infecção; antimicrobiano em até 3 horas**. {q-adap23-008}
- Cirrótico com asterixe e NEWS 6, sem foco: **propedêutica rápida antes do antimicrobiano**. {q-sirio2027-003}
- Pneumonia com PA 70/40, FR 30 e SpO2 de 80 %: **culturas, antibiótico, volume e oxigênio**. {q-unifesp2023-015}
- Gestante de 21 semanas com 34,6 °C, FC 118 e disúria: **sepse urinária; volume, ceftriaxona e culturas**. {q-tp20251-087}
- Febre 2 dias após quimioterapia (2.500 leucócitos): é **neutropenia febril até prova em contrário**; faz-se **radiografia de tórax** mesmo sem achados pulmonares. {q-uspsp3-037}
- Idoso com febre, calafrios e tosse: o que **não** é variável de perfusão é a **leucocitose**. {q-gdsepse-002}` },
        { id: "triagem", titulo: "SIRS, qSOFA, NEWS e a triagem", conferir: true, diretrizes: ["sepsis-3","ssc-2021"],
          questoes: ["q-adap23-019","q-unesp2021-046","q-gdsepse-007","q-gdsepse-012","q-gdsepse-024","q-gdsepse-028","q-gdsepse-035","q-gdsepse-041","q-gdsepse-044","q-gdsepse-047","q-gdsepse-067","q-gdsepse-072","q-gdsepse-092","q-gdsepse-100","q-amrigs2024-013"],
          prosa: `[[O **SIRS** exige **2 ou mais** de **temperatura acima de 38 ou abaixo de 36 °C, FC acima de 90, FR acima de 20 (ou PaCO2 abaixo de 32) e leucócitos acima de 12.000, abaixo de 4.000 ou 10 % de bastões**, e pode ocorrer **sem infecção** (pancreatite, queimadura); a **trombocitopenia não** é critério; e a **hiperventilação** é resposta precoce da sepse.|q-gdsepse-024,q-gdsepse-028,q-gdsepse-072,q-gdsepse-092,q-gdsepse-100,q-amrigs2024-013]] [[O **qSOFA** (1 ponto cada: **FR ≥ 22, PAS ≤ 100 e alteração da consciência, Glasgow < 15**) com **2 ou mais** indica **maior risco de óbito**, mas tem **baixa sensibilidade**: pontuação menor que 2 **não exclui** sepse, e ele **não deve ser a única triagem**; a campanha de 2021 **não encontrou superioridade do qSOFA sobre o NEWS** e **sugere o NEWS** (ou outra triagem) em vez do qSOFA isolado.|q-gdsepse-035,q-gdsepse-044,q-gdsepse-041,q-gdsepse-067,q-unesp2021-046,q-adap23-019,q-gdsepse-007,q-gdsepse-012,q-gdsepse-047]]`,
          texto: `- qSOFA de 2 não exclui sepse quando é menor que 2; baixa sensibilidade, não usar sozinho. {q-adap23-019}
- Homem com PA 80x50, FR 31 e oximetria 87 %, consciente: qSOFA de **dois** pontos. {q-unesp2021-046}
- Triagem nas diretrizes novas: **NEWS**. {q-gdsepse-007}
- A SSC 2021 mostra **ausência de superioridade do qSOFA sobre o NEWS**. {q-gdsepse-012}
- SIRS: taquipneia acima de 20 e leucograma abaixo de 4.000. {q-gdsepse-024}
- Hipotermia, taquicardia, taquipneia e leuco alterados, com 2 ou mais: **SIRS**. {q-gdsepse-028}
- qSOFA: **FR ≥ 22, PAS ≤ 100 e Glasgow < 15**. {q-gdsepse-035,q-gdsepse-044}
- qSOFA ≥ 2: **maior gravidade e risco de óbito**. {q-gdsepse-041}
- Pielonefrite com PA 80x60 e lactato de 4,2: **não rastrear pelo qSOFA; volume 30 mL/kg e antibiótico em 1 h**. {q-gdsepse-047}
- Limiares errados do qSOFA (Glasgow < 13, PAS < 100, FR < 22): o item **incorreto**. {q-gdsepse-067}
- Sepse de origem infecciosa pelo SIRS: **hipotermia e taquipneia**. {q-gdsepse-072}
- **Trombocitopenia** não é critério de SIRS. {q-gdsepse-092}
- SIRS no pós-operatório com dispneia súbita e dor na panturrilha: SIRS por **embolia** (sem infecção). {q-gdsepse-100}
- SIRS pode ocorrer **sem infecção**, como em pancreatite e queimadura. {q-amrigs2024-013}` },
      ],
    },
    {
      id: "fisiopatologia", titulo: "Fisiopatologia do choque séptico",
      introducao: `[[O LPS e as **citocinas (TNF, IL-1, IL-6)** ativam o endotélio, que libera **óxido nítrico e fator de ativação plaquetária**: o resultado é **vasodilatação (componente distributivo)**, perda de plasma, depressão miocárdica e **coagulopatia pró-trombótica**.|q-gdsepse-088,q-amrigs2022-076,q-gdsepse-068]]`,
      fragmentos: [
        { id: "fisiopatologia", titulo: "Mediadores, endotélio e coagulação", conferir: true, diretrizes: ["sepsis-3"],
          questoes: ["q-amrigs2022-076","q-amrigs2025-007","q-fmabc2025-023","q-gdsepse-042","q-gdsepse-068","q-gdsepse-084","q-gdsepse-088","q-gdsepse-095","q-gdsepse-082","q-amrigs2020-081"],
          prosa: `[[O choque séptico mistura **componentes distributivo, hipovolêmico e cardiogênico**, e o **distributivo** (vasodilatação) explica a fase hiperdinâmica inicial; a **lesão difusa do endotélio** é o mecanismo central da falência de órgãos, e o TNF e a IL-1 o fazem liberar **citocinas, fator de ativação plaquetária e óxido nítrico** (a **produção de óxido nítrico aumenta**, não diminui); a **IL-10** sobe como freio e a **IL-18** é pró-inflamatória e **aumenta**; a coagulação fica **pró-coagulante, com queda das proteínas C e S**; e a **hiperventilação** é resposta precoce.|q-amrigs2022-076,q-gdsepse-088,q-amrigs2025-007,q-gdsepse-084,q-gdsepse-042,q-gdsepse-068,q-gdsepse-095,q-fmabc2025-023]] [[São fatores de risco as **idades extremas**, imunossupressão, diabetes e procedimentos invasivos (a idade acima de 50 anos **não** entra como fator isolado na prova); e a investigação da febre inclui **contatos sexuais, viagens, traumas, doentes e próteses**.|q-gdsepse-082,q-amrigs2020-081]]`,
          texto: `- Choque séptico: componentes **distributivo, hipovolêmico e cardiogênico**; o distributivo explica a fase hiperdinâmica. {q-amrigs2022-076}
- Falência orgânica: **aumento** (não redução) do óxido nítrico. {q-amrigs2025-007}
- A IL-2 promove proliferação de linfócitos T e B ativados. {q-fmabc2025-023}
- A **IL-18** está **aumentada** na sepse (dizer que está diminuída é o erro). {q-gdsepse-042}
- O choque séptico é **pró-coagulante, com redução de proteína C e S**. {q-gdsepse-068}
- Bacteremia por Gram-negativo em pé diabético: **IL-10 aumentada** entre as respostas. {q-gdsepse-084}
- O TNF ativa o endotélio, que libera **citocinas, PAF e óxido nítrico**. {q-gdsepse-088}
- A **hiperventilação** é resposta precoce. {q-gdsepse-095}
- Fatores de risco: idades extremas; idade acima de 50 anos é a exceção. {q-gdsepse-082}
- Febre: considerar contatos sexuais, viagens, traumas, doentes e próteses. {q-amrigs2020-081}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento do adulto",
      introducao: `[[O que aumenta a sobrevida é o **antimicrobiano de amplo espectro na primeira hora**, dirigido ao foco, com **controle do foco**; cada **hora de atraso** no choque aumenta a mortalidade (cerca de **7 % por hora** na série clássica).|q-unifesp2025-030,q-gdsepse-043,q-gdsepse-045]]`,
      fragmentos: [
        { id: "pacote-primeira-hora", titulo: "Pacote da primeira hora, fluidos e metas", conferir: true, diretrizes: ["ssc-2021"],
          figuras: [{ arquivo: "figuras/pacote-primeira-hora.svg", legenda: "Esquema autoral: pacote da primeira hora na sepse com hipoperfusão." }],
          questoes: ["q-inf-03","q-unifesp2025-030","q-unesp2021-047","q-unesp2022-045","q-famerp2022-050","q-gdsepse-034","q-gdsepse-037","q-gdsepse-040","q-gdsepse-043","q-gdsepse-045","q-gdsepse-046","q-gdsepse-060","q-gdsepse-063","q-gdsepse-064","q-gdsepse-066","q-gdsepse-071","q-adap25-037","q-unifesp2022-098","q-unifesp2023-008","q-unesp2023-052","q-fmabc2025-019"],
          prosa: `[[O **pacote da primeira hora** é: **dosar lactato, colher culturas antes do antibiótico (sem atrasá-lo), iniciar antimicrobiano de amplo espectro, infundir cristaloide 30 mL/kg** se há hipotensão ou lactato elevado e **usar vasopressor** se a hipotensão persiste; o **cristaloide balanceado** (Ringer lactato) é preferido; a dose inicial é de **30 mL/kg nas primeiras 3 horas**, com **reavaliação** (a prova também cobrou "na primeira hora"); e o antibiótico se escolhe pelo **foco** (urinário, pulmonar, abdominal), com **ceftriaxona e azitromicina** na pneumonia comunitária.|q-inf-03,q-unifesp2025-030,q-gdsepse-040,q-gdsepse-043,q-gdsepse-045,q-gdsepse-046,q-gdsepse-071,q-unesp2021-047,q-unesp2022-045,q-famerp2022-050,q-gdsepse-034,q-gdsepse-037,q-gdsepse-060,q-gdsepse-066,q-gdsepse-063,q-gdsepse-064,q-adap25-037,q-unifesp2023-008]]`,
          texto: `- Pacote inicial: **lactato, culturas antes do antibiótico, amplo espectro, 30 mL/kg e vasopressor**. {q-inf-03}
- Medida que comprovadamente aumenta a sobrevida: **antimicrobiano de amplo espectro na primeira hora**. {q-unifesp2025-030}
- Primeira hora: **30 mL/kg de cristaloide e noradrenalina para PAM ≥ 65**. {q-unesp2021-047}
- Com PA 60/40 e SpO2 85 %: **hemoculturas, lactato, antibiótico, 30 mL/kg e noradrenalina se necessário**. {q-unesp2022-045}
- Dor lombar, calafrios e PA 80/50 sob antibiótico há 5 dias: **lactato, urocultura, antibiótico e Ringer 30 mL/kg**. {q-famerp2022-050}
- Síndrome gripal com PAC e sonolência: **lactato, culturas, antimicrobiano e 30 mL/kg**. {q-gdsepse-034}
- Pneumonia com PA 80x50: **amplo espectro e 30 mL/kg em 3 horas**. {q-gdsepse-037}
- Dose inicial de fluido: **30 mL/kg**. {q-gdsepse-040}
- Antibiótico no momento ideal: **na primeira hora**. {q-gdsepse-043}
- Atraso do antibiótico: **7 % de mortalidade por hora**. {q-gdsepse-045}
- Medidas que reduzem a mortalidade: **antibiótico precoce, controle glicêmico e vasopressor precoce** (texto antigo). {q-gdsepse-046}
- Infecção do cateter de diálise: **lactato, hemocultura, antibiótico, 30 mL/kg e oxigênio**. {q-gdsepse-060}
- Pneumonia pós-fratura com lactato de 5: **antibiótico em uma hora**; **20 a 30 mL/kg** de cristaloide. {q-gdsepse-063,q-gdsepse-064}
- DM1 com PAC e 26.000 leucócitos: **hemoculturas, volume e ceftriaxona com azitromicina**. {q-gdsepse-066}
- Tratamento agressivo nas primeiras 6 horas, com o pacote, influi na mortalidade. {q-gdsepse-071}
- Homem de 66 anos com ITU, lactato de 5,2: **cristaloide balanceado 30 mL/kg em 3 horas, com reavaliação**. {q-adap25-037}
- Pielonefrite com PA 80/60 e torpor: **antibiótico de amplo espectro na primeira hora, cobrindo Gram-negativos**. {q-unifesp2022-098}
- PA 80/40 e lactato de 36 mg/dL: **cristaloide até 30 mL/kg em 3 horas**. {q-unifesp2023-008}
- Pielonefrite com choque: **antibiótico idealmente em 1 hora**. {q-unesp2023-052}
- Cistite que evoluiu para pielonefrite e sepse: **antibiótico na primeira hora**. {q-fmabc2025-019}` },
        { id: "metas-e-reavaliacao", titulo: "Reavaliação, metas antigas e conduta quando o tratamento falha", conferir: true, diretrizes: ["ssc-2021"],
          questoes: ["q-gdsepse-005","q-gdsepse-052","q-gdsepse-023","q-gdsepse-004","q-gdsepse-080","q-gdsepse-050","q-gdsepse-098","q-gdsepse-025","q-gdsepse-026","q-gdsepse-099","q-gdsepse-017","q-gdsepse-076","q-sirio2027-033","q-unifesp2022-098","q-unesp2023-052","q-fmabc2025-019"],
          prosa: `[[A **reavaliação** usa lactato, **tempo de enchimento capilar** (tão eficaz quanto o lactato como guia, pelo ANDROMEDA-SHOCK) e variáveis **dinâmicas** de fluido-responsividade; as metas antigas de Rivers (**ScvO2 70 %, PVC de 8 a 12, hematócrito acima de 30 %**) **não** são mais necessárias, pois hoje se transfunde com hemoglobina abaixo de 7; e o **bicarbonato** na acidose láctica **não** melhora desfechos.|q-gdsepse-005,q-gdsepse-052,q-gdsepse-023,q-gdsepse-004,q-gdsepse-080,q-gdsepse-050,q-gdsepse-098]] [[A **primeira medida** do choque abdominal intubado é o **antimicrobiano**; o paciente que **piora sob ceftriaxona** (ITU hospitalar) ou **sob ciprofloxacina** tem choque séptico e recebe **amplo espectro (imipenem, vancomicina)**; e **lactato** se acompanha para avaliar a perfusão.|q-gdsepse-025,q-gdsepse-026,q-gdsepse-099,q-gdsepse-017,q-gdsepse-076,q-unifesp2022-098,q-unesp2023-052,q-fmabc2025-019,q-sirio2027-033]]`,
          texto: `- Choque séptico abdominal em UTI: **primeira medida é o esquema antimicrobiano**. {q-gdsepse-025}
- Pielonefrite, PA 70x40: pedir **lactato arterial** primeiro. {q-gdsepse-017}
- ITU hospitalar em falha de ceftriaxona e PA 80x54: **solicitar lactato e acompanhar**. {q-gdsepse-026}
- Diarreia febril com FC 100 e queda de PA: **sepse; hemoculturas e ciprofloxacina**. {q-gdsepse-076}
- ITU sob ciprofloxacina, PA 70x50: **choque séptico; volume, lactato, culturas, imipenem e vancomicina**. {q-gdsepse-099}
- PA 60x30 e PVC 6: **reposição volêmica com salina**. {q-gdsepse-098}
- Idoso em IC e síndrome: **tempo de enchimento capilar tão eficaz quanto o lactato**. {q-gdsepse-005}
- A SSC sugere **variáveis dinâmicas** para fluido-responsividade. {q-gdsepse-052}
- Pneumonia com enchimento lento, anúria e pH baixo: **ScvO2 de 70 %** como meta antiga. {q-gdsepse-023}
- **Lactato > 4** é o problema, não a meta. {q-gdsepse-004}
- Meta antiga de saturação venosa **mista de 65 %**. {q-gdsepse-080}
- **Hematócrito > 30 %** pode ser dispensado. {q-gdsepse-050}
- Pós-operatório complicado, febre de 39 °C e FC 115: **hemoculturas, amplo espectro, volume e lactato**. {q-sirio2027-033}` },
        { id: "vasopressor-choque", titulo: "Vasopressor, corticoide e choque refratário", conferir: true, diretrizes: ["ssc-2021"],
          casos: ["q-adap25-030","q-usp2024-064","q-usp2023-102"],
          questoes: ["q-005","q-adap25-030","q-adap23-015","q-unifesp2025-037","q-usp2024-064","q-usp2023-102","q-sessp2026-004","q-simepm89-059","q-udisc20262-001","q-unesp2026-044","q-gdsepse-030","q-gdsepse-049","q-gdsepse-054","q-gdsepse-078","q-gdsepse-019","q-gdsepse-091","q-gdsepse-097","q-gdsepse-029"],
          prosa: `[[O **vasopressor de primeira escolha é a noradrenalina**, para **PAM ≥ 65 mmHg**, e **pode ser iniciada em veia periférica**, até o acesso profundo, **sem esperar completar o volume**; depois de 30 mL/kg com PA de 80x40 (PAM de 53), inicia-se **noradrenalina** e reavalia-se o lactato; a **dopamina não** é a droga de escolha, e a **dobutamina** entra só na **disfunção miocárdica** com baixo débito, **depois** da noradrenalina (antes dela pioraria a hipotensão).|q-005,q-adap25-030,q-gdsepse-049,q-unifesp2025-037,q-usp2024-064,q-gdsepse-030,q-gdsepse-054,q-gdsepse-078,q-gdsepse-019,q-usp2023-102]] [[A **hidrocortisona 200 mg/dia (50 mg a cada 6 horas)** se indica quando a **noradrenalina chega a 0,25 µg/kg/min ou mais por pelo menos 4 horas**; no **paciente com IC e perda de tolerância a fluidos**, **para-se o volume** e inicia-se noradrenalina; o **choque já tratado com volume** pede manter a noradrenalina, **evitar expansão indiscriminada** e procurar a causa; a **intubação** do choque usa **etomidato e rocurônio**; e a **prescrição de cefepime, hidratação, noradrenalina e midazolam** é de choque séptico.|q-adap23-015,q-sessp2026-004,q-udisc20262-001,q-simepm89-059,q-unesp2026-044,q-gdsepse-091,q-gdsepse-097,q-gdsepse-029]]`,
          texto: `- Choque refratário a 30 mL/kg, lactato de 4,8: **noradrenalina como primeira escolha**. {q-005}
- PAM de 54 e lactato de 4,6 após 30 mL/kg: **noradrenalina em infusão contínua**. {q-adap25-030}
- Noradrenalina a 0,35 µg/kg/min com PAM de 62: **hidrocortisona 200 mg/dia**. {q-adap23-015}
- Pneumonia com PA 85/40: **vasopressor pode começar em veia periférica antes de completar o volume**. {q-unifesp2025-037}
- PAM de 55 e TEC de 6 s: **noradrenalina em acesso periférico proximal**. {q-usp2024-064}
- Choque urinário intubado com delta PP > 13 %: **continuar a expansão volêmica**. {q-usp2023-102}
- Hidrocortisona se noradrenalina **≥ 0,25 µg/kg/min por pelo menos 4 horas**. {q-sessp2026-004}
- Choque já tratado com 25 mL/kg e noradrenalina: **manter, evitar expansão indiscriminada e reavaliar a causa**. {q-simepm89-059}
- IC com perda de fluidotolerância: **interromper a oferta agressiva e iniciar noradrenalina**. {q-udisc20262-001}
- DPOC e choque séptico de foco pulmonar, SpO2 84 %: **IOT em sequência rápida com etomidato e rocurônio**. {q-unesp2026-044}
- PA 80x40 após 30 mL/kg: **noradrenalina para PAM ≥ 65** e reavaliar o lactato. {q-gdsepse-030}
- Primeira escolha no choque séptico: **noradrenalina**. {q-gdsepse-049}
- PA 62x40 após 2.000 mL: **infusão de noradrenalina**. {q-gdsepse-054}
- A **dobutamina** não deve **preceder** a noradrenalina no hipotenso. {q-gdsepse-078}
- **Em desacordo com a diretriz**: "não usar dobutamina na disfunção miocárdica". {q-gdsepse-019}
- Cefepime, hidratação, noradrenalina e midazolam: **choque séptico**. {q-gdsepse-091}
- **Bicarbonato** na acidose grave não melhora a mortalidade. {q-gdsepse-097}
- Choque séptico por litíase obstrutiva: **as variáveis hemodinâmicas são fundamentais** (além de desobstruir). {q-gdsepse-029}` },
        { id: "controle-foco", titulo: "Controle do foco", conferir: true, diretrizes: ["ssc-2021"],
          questoes: ["q-adap22-098","q-einstein2025-002","q-sirio2021-021","q-gdantibioticos-112","q-gdsepse-061"],
          prosa: `[[O antibiótico **não basta** quando há coleção ou obstrução: o **abscesso pélvico de 8 cm** pede **drenagem percutânea ou cirúrgica** o mais cedo possível (idealmente em até 6 horas), a **pielonefrite obstrutiva com choque** pede **ultrassom à beira-leito** para ver obstrução, e o **empiema** se reavalia para drenagem; e a **isquemia mesentérica com necrose extensa** pode ser **irressecável**, o que leva a cuidados paliativos.|q-adap22-098,q-einstein2025-002,q-gdsepse-061,q-sirio2021-021]] [[A **bacteremia por *Pseudomonas* resistente**, sensível a polipeptídeos, no choque séptico, exige o antibiótico ativo (a prova deu **meropenem**).|q-gdantibioticos-112]]`,
          texto: `- Diverticulite com abscesso de 8 cm em choque: **drenagem do foco o mais cedo possível, idealmente em até 6 horas**. {q-adap22-098}
- Pielonefrite em choque com PA 78x44: **ultrassonografia à beira-leito para obstrução urinária**. {q-einstein2025-002}
- Isquemia mesentérica com necrose do jejuno, em choque: **fechar a cavidade e cuidados paliativos**. {q-sirio2021-021}
- Bacteremia por *Pseudomonas* resistente: **meropenem** (a prova). {q-gdantibioticos-112}
- O empiema se avalia para **drenagem** (afirmar que só após 48 horas é o item incorreto). {q-gdsepse-061}` },
      ],
    },
    {
      id: "choque", titulo: "Choque: tipos, lactato e ultrassom à beira do leito",
      introducao: `[[**Choque é hipoperfusão**, não um número de pressão: a oferta de oxigênio não cobre o consumo das células. A pressão pode estar normal no início (vasoconstrição compensa) e o que denuncia é o tecido: pele fria ou moteada, enchimento capilar lento, oligúria, confusão e **lactato alto**.|q-amrigs2022-018]] [[Sem oxigênio, a mitocôndria para: a cadeia respiratória não **consome oxigênio**, o piruvato não entra no ciclo de Krebs e vira **lactato** pela glicólise anaeróbia (acidose láctica tipo A). O lactato alto do politraumatizado com lesão muscular extensa é **falta de oxigênio celular**.|q-tp20232-032,q-tp20241-030]]

[[Os quatro mecanismos se separam pela hemodinâmica: **hipovolêmico** (pouco volume: pré-carga baixa, débito baixo, resistência alta), **cardiogênico** (bomba: pré-carga alta, débito baixo, resistência alta), **obstrutivo** (tamponamento, TEP, pneumotórax hipertensivo: o sangue não chega ou não sai do coração) e **distributivo** (sepse, anafilaxia: **resistência vascular baixa**, débito normal ou alto, **diastólica baixa e pressão de pulso larga**, pele quente).|q-usprp2024-026,q-famerp2026-062,q-simepm89-060]]`,
      fragmentos: [
        { id: "choque-tipos", titulo: "Classificar o choque e tratar a causa", conferir: true, diretrizes: ["ssc-2021"],
          questoes: ["q-usprp2024-026","q-famerp2026-062","q-amrigs2022-018","q-simepm89-060","q-famerp2026-061","q-fmabc2026-003","q-sirio2027-004"],
          prosa: `[[Pelo **Swan-Ganz**: pressão capilar pulmonar e PVC baixas com débito normal ou alto e **resistência baixa** = **distributivo**; débito baixo com pressões de enchimento altas = cardiogênico; débito baixo com pressões baixas = hipovolêmico. À beira do leito, a **pressão diastólica baixa com pressão de pulso larga** já sugere vasodilatação.|q-usprp2024-026,q-famerp2026-062]] [[Choque **misto** é comum: o cardiopata com pneumonia tem componente séptico e cardiogênico; mantém-se a **noradrenalina** para a pressão de perfusão e soma-se **inotrópico (dobutamina)** se o débito estiver baixo, com volume guiado por resposta.|q-simepm89-060,q-amrigs2022-018]] [[O choque **hemorrágico** (pós-operatório com grande perda, hematêmese) se trata repondo o que se perdeu: **cristaloide e hemocomponentes**, controle do sangramento e, se o nível de consciência cai ou há hematêmese volumosa, **proteger a via aérea**.|q-famerp2026-061,q-fmabc2026-003]] [[No outro extremo, o **edema agudo de pulmão hipertensivo** não é choque: a meta é **baixar a sistólica abaixo de 140 mmHg** na primeira hora com nitrato e diurético, e ventilação não invasiva.|q-sirio2027-004]]`,
          texto: `- Choque = **hipoperfusão**, não um valor de PA. {q-amrigs2022-018}
- Resistência baixa, pressão de pulso larga, PCP e PVC baixas: **distributivo**. {q-usprp2024-026,q-famerp2026-062}
- Misto (cardiopata séptico): noradrenalina + **dobutamina** se débito baixo. {q-simepm89-060}
- Hemorrágico: **cristaloide e sangue**, via aérea se rebaixado. {q-famerp2026-061,q-fmabc2026-003}
- EAP hipertensivo: **sistólica < 140** na 1ª hora. {q-sirio2027-004}` },
        { id: "choque-lactato", titulo: "Por que o lactato sobe", conferir: true,
          questoes: ["q-tp20232-032","q-tp20241-030"],
          texto: `- Lactato no choque: **falta de O2** → glicólise anaeróbia. {q-tp20232-032}
- A mitocôndria **reduz o consumo de O2**; piruvato vira lactato. {q-tp20241-030}` },
        { id: "choque-pocus", titulo: "Ultrassom à beira do leito (RUSH, pulmão e veia cava)", conferir: true,
          casos: ["q-usp2024-054"],
          questoes: ["q-usp2024-054","q-usprp2024-034","q-unesp2025-052","q-uspsp5-018","q-uspsp3-091","q-sirio2026-022"],
          prosa: `[[O protocolo **RUSH** olha a **bomba** (contratilidade, derrame pericárdico, VD), o **tanque** (veia cava, pulmões, abdome) e os **canos** (aorta, veias profundas). **VD dilatado maior que o VE com septo retificado (sinal do D)**, VCI dilatada fixa e pulmão com linhas A = **TEP** (obstrutivo); **derrame pericárdico com colapso do VD** e VCI pletórica = **tamponamento**, tratado com **pericardiocentese**.|q-usp2024-054,q-usprp2024-034]] [[No pulmão, o normal é **deslizamento pleural com linhas A**; **sem deslizamento e com ponto pulmonar** = **pneumotórax**; **consolidação hepatizada com broncograma aéreo** = pneumonia; linhas B difusas = congestão.|q-unesp2025-052,q-uspsp5-018]] [[A **veia cava inferior pequena que colapsa mais de 50% na inspiração** indica pressão atrial direita baixa e provável resposta a volume. Mas depois dos 30 mL/kg iniciais, dar mais volume às cegas encharca: teste a resposta com a **elevação passiva das pernas** medindo o débito em tempo real, e só infunda se o débito subir.|q-uspsp3-091,q-sirio2026-022]]`,
          texto: `- VD > VE, sinal do D, VCI fixa: **TEP**; derrame com colapso do VD: **pericardiocentese**. {q-usp2024-054,q-usprp2024-034}
- Sem deslizamento + ponto pulmonar: **pneumotórax**. {q-unesp2025-052}
- Consolidação hepatizada + broncograma: **pneumonia**. {q-uspsp5-018}
- VCI colapsando > 50%: **pré-carga baixa**. {q-uspsp3-091}
- Mais volume? **Elevação passiva das pernas** com débito. {q-sirio2026-022}` },
      ],
    },
    {
      id: "pediatria", titulo: "Sepse na criança",
      introducao: `[[Na criança a sepse é mais comumente **bacteriana**, o **choque pode ser "quente" ou "frio"** e a ressuscitação usa **bolus de 20 mL/kg** com reavaliação; o antibiótico vai **em até 1 hora do reconhecimento do choque**, e as **metas** são perfusão (enchimento capilar abaixo de 2 s) e **diurese acima de 1 mL/kg/h**.|q-amrigs2022-073,q-gdsepse-011,q-uspsp5-117]]`,
      fragmentos: [
        { id: "sepse-pediatrica", titulo: "Reconhecimento, volume, drogas e metas", conferir: true, diretrizes: ["ssc-2021","phoenix-2024"],
          questoes: ["q-usp2022-053","q-usp2024-019","q-usp2026-053","q-usprp2025-011","q-amrigs2022-073","q-amrigs2023-072","q-tp20202-057","q-tp20212-052","q-tp20261-031","q-uspsp5-117","q-sirio2025-046","q-sirio2026-051","q-sirio2021-058","q-gdsepse-011","q-gdsepse-065","q-tp20251-052","q-uspsp3-039","q-uspsp3-040"],
          prosa: `[[A criança com **febre, irritabilidade alternando com letargia e vômitos** tem sepse e recebe **acesso, expansão com cristaloide e antibiótico**; o **bolus é de 20 mL/kg** (em 5 a 10 minutos, com Ringer ou Ringer lactato) e se repete conforme a reavaliação; a **hemocultura vem antes do antibiótico, sem atrasá-lo**; e a **glicemia** deve ficar **abaixo de 180**.|q-tp20202-057,q-tp20212-052,q-usp2024-019,q-sirio2021-058,q-amrigs2023-072,q-amrigs2022-073,q-gdsepse-011]] [[Se a perfusão não melhora, entram os **vasoativos**: **adrenalina no choque frio** (lactente com pneumonia e choque) e **noradrenalina no choque quente** (artrite, PA 70/20, pulsos amplos); o **neutropênico por quimioterapia** com mucosite e choque recebe **meropenem e vancomicina e epinefrina**; o paciente com refluxo vesicoureteral e sonda, de UTI há 2 dias, recebe **volume e antibiótico de espectro estendido** (infecção nosocomial); e a **meningococcemia** (sufusões hemorrágicas e confusão) pede o **lactato**.|q-tp20261-031,q-usprp2025-011,q-usp2022-053,q-usp2026-053,q-gdsepse-065,q-tp20251-052]] [[No lactente em choque com desconforto respiratório, **primeiro o volume** (20 mL/kg) e o suporte da circulação; a **intubação vem depois da estabilização cardiovascular**, porque o sedativo e a pressão positiva derrubam o retorno venoso e podem precipitar parada.|q-uspsp3-039,q-uspsp3-040]] [[Pelo **Escore de Phoenix**, a **sepse** é infecção com disfunção de pelo menos 2 pontos, e o **choque séptico** acrescenta **1 ponto cardiovascular** (lactato, vasoativo ou **hipotensão** para a idade, como **PAM ≤ 43 mmHg** no lactente de 1 ano); com Phoenix de 2 pontos inicia-se **cristaloide e antibiótico**, considerando vasopressor se não houver resposta.|q-sirio2025-046,q-sirio2026-051,q-uspsp5-117]]`,
          texto: `- Osteossarcoma, quimioterapia há 6 dias, mucosite e choque: **meropenem, vancomicina e epinefrina contínua**. {q-usp2022-053}
- Criança de 2 anos com crise, FC 158, PA 70x40 e TEC 5 s: **Ringer lactato 20 mL/kg e antimicrobianos**. {q-usp2024-019}
- Criança de 7 anos com refluxo vesicoureteral e sonda: **volume e antibiótico de espectro estendido**. {q-usp2026-053}
- Artrite de joelho e choque quente (PA 70/20): **norepinefrina**. {q-usprp2025-011}
- Sepse pediátrica: **bacteriana mais comum e glicemia < 180**; hidrocortisona só no choque refratário a catecolamina. {q-amrigs2022-073}
- Hemocultura antes do antibiótico, sem atrasá-lo; o lactato ajuda, mas não é imprescindível para iniciar; monitorar SpO2 e diurese; resposta por citocinas. {q-amrigs2023-072}
- Lactente com pneumonia em choque frio sem resposta ao volume: **adrenalina**. {q-tp20251-052}
- Lactente em choque: **20 mL/kg** primeiro; **intubar após estabilizar a circulação**. {q-uspsp3-039,q-uspsp3-040}
- Lactente de 18 meses com febre e alternância de irritabilidade e letargia: **acesso venoso e expansão com salina**. {q-tp20202-057,q-tp20212-052}
- Lactente de 10 meses com pneumonia e choque: **adrenalina**. {q-tp20261-031}
- Meta de diurese no choque pediátrico: **acima de 1 mL/kg/h**. {q-uspsp5-117}
- Phoenix de 2 pontos: **cristaloides, antibióticos e vasopressores se não responder**. {q-sirio2025-046}
- Lactente com ITU e hipotensão: choque quando a **PAM ≤ 43 mmHg**. {q-sirio2026-051}
- Lactente de 8 meses com choque: **bolus de 20 mL/kg de Ringer em 5 a 10 minutos**. {q-sirio2021-058}
- SSC pediátrica: antibiótico **em até 1 hora do reconhecimento do choque**. {q-gdsepse-011}
- Febre, sufusões hemorrágicas e confusão em criança de 10 anos: **meningococcemia; lactato**. {q-gdsepse-065}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual (provas escritas nos consensos de 1991, 2001 e 2008). Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-gdsepse-077","q-gdsepse-072","q-gdsepse-028","q-gdsepse-004","q-gdsepse-080","q-gdsepse-050","q-gdsepse-023","q-gdsepse-046","q-adap25-037","q-unesp2021-047","q-adap23-008","q-sessp2026-004","q-gdsepse-012","q-gdsepse-007"],
          prosa: `[[**Definição**: a regra atual é o **Sepsis-3** (disfunção orgânica por resposta desregulada); a prova antiga deu "**síndrome de reação inflamatória sistêmica desencadeada por infecção**" (gdsepse-077) e **sepse pelo SIRS** (hipotermia e taquipneia, gdsepse-072 e 028).|q-gdsepse-077,q-gdsepse-072,q-gdsepse-028]] [[**Metas das 6 primeiras horas**: a regra atual dispensa **ScvO2, PVC e hematócrito de 30 %**; a prova antiga cobrou **ScvO2 de 70 %** (gdsepse-023), **SvO2 de 65 %** (gdsepse-080) e tratou o **hematócrito de 30 %** como dispensável (gdsepse-050).|q-gdsepse-023,q-gdsepse-080,q-gdsepse-050,q-gdsepse-004]] [[**Fluidos**: a regra é **30 mL/kg nas primeiras 3 horas**; as provas cobraram "**na primeira hora**" (Unesp 2021) e "3 horas" (Adap 2025); e o **tempo do antibiótico** é de 1 hora no choque e de **até 3 horas** na sepse possível sem choque (Adap 2023).|q-adap25-037,q-unesp2021-047,q-adap23-008]] [[**Triagem**: a prova (gdsepse-007) pediu o **NEWS**, e a SSC 2021 não vê superioridade do qSOFA; **hidrocortisona** com noradrenalina de 0,25 por 4 horas (Sessp 2026, escrita com "mg/kg" no enunciado); e o texto antigo de **2008 a 2012** listava como medidas de mortalidade antibiótico, controle glicêmico e vasopressor (gdsepse-046).|q-gdsepse-007,q-gdsepse-012,q-sessp2026-004,q-gdsepse-046]]`,
          texto: `- Regra: Sepsis-3; a prova antiga deu sepse como SIRS por infecção. {q-gdsepse-077,q-gdsepse-072,q-gdsepse-028}
- Regra: sem ScvO2 e hematócrito alvo; a prova antiga deu ScvO2 de 70 % e SvO2 de 65 %. {q-gdsepse-023,q-gdsepse-080}
- Regra: hematócrito de 30 % é dispensável; lactato acima de 4 é o problema, não a meta. {q-gdsepse-050,q-gdsepse-004}
- Regra: 30 mL/kg em até 3 horas; a prova deu "primeira hora". {q-adap25-037,q-unesp2021-047}
- Regra: antibiótico em 1 hora no choque e até 3 horas na sepse possível. {q-adap23-008}
- Regra: NEWS na triagem; sem superioridade do qSOFA. {q-gdsepse-007,q-gdsepse-012}
- Hidrocortisona com noradrenalina ≥ 0,25 por 4 horas. {q-sessp2026-004}
- Texto de 2008 a 2012 sobre o que reduz a mortalidade. {q-gdsepse-046}` },
      ],
    },
  ],
});
