/* resumos/atls/resumo.js — resumo adaptativo do atendimento inicial ao politraumatizado (ATLS): avaliação
   primária (ABCDE), via aérea, choque hemorrágico e reposição, transfusão e coagulopatia, trauma pélvico, coluna e
   medula, pescoço, trauma na criança e na gestante. Molde e regras: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- atls */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "atls",
  titulo: "Atendimento inicial ao politraumatizado (ATLS)",
  assunto: "ass-atls",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "atls", texto: "American College of Surgeons — Advanced Trauma Life Support (ATLS), 10ª edição (as questões seguem a 10ª; a 11ª está na tabela de edições a atualizar, `PENDENCIAS.md` item 11)", edicao: "10ª", lidoEm: null },
    { id: "wses-trauma", texto: "WSES — diretrizes de trauma: controle de danos, transfusão maciça, ácido tranexâmico e trauma pélvico", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição.", questoes: ["q-008"] },
  ],
  doencas: [
    {
      id: "primaria", titulo: "Avaliação primária: ABCDE, prioridades e adjuntos",
      introducao: `[[O atendimento ao politraumatizado segue uma **ordem que mata menos**: o que mata primeiro se trata primeiro. **A** (via aérea com proteção da coluna cervical), **B** (respiração e ventilação), **C** (circulação com controle de hemorragia), **D** (avaliação neurológica) e **E** (exposição e controle do ambiente, prevenindo hipotermia).|q-fmabc2021-002,q-sessp2022-030]] A cada achado que ameaça a vida, trata-se **antes de seguir**, e depois se reavalia.

[[A lógica da ordem é a do tempo até a morte: a obstrução de via aérea mata em minutos, o pneumotórax hipertensivo em minutos, a hemorragia em minutos a horas e a lesão cerebral em horas; por isso nenhum exame de imagem vem antes de resolver o A, o B e o C.|q-usp2022-069,q-usp2024-034]]

Veja também: **Trauma abdominal** (FAST, laparotomia), **Trauma de tórax** (drenagem, toracotomia), **TCE** (Glasgow, hipertensão intracraniana) e **Cuidados perioperatórios** (reposição e transfusão).`,
      fragmentos: [
        { id: "prim-sequencia", titulo: "A sequência certa, o que tratar primeiro e os achados que mudam a conduta", conferir: true, diretrizes: ["atls"],
          figuras: [{ arquivo: "figuras/abcde-atls.svg", legenda: "Esquema autoral: avaliação primária ABCDE, o que cada letra procura e a conduta que não espera exame." }],
          questoes: ["q-fmabc2021-002","q-sessp2022-030","q-sessp2022-028","q-scmsp2025-030","q-scmsp2026-031","q-usp2022-069","q-usp2024-034","q-unifesp2024-008","q-famerp2026-073","q-einstein2025-021","q-adap24-005","q-tp20222-078","q-unesp2024-061","q-unicampdis2025-066","q-uspsp4-052","q-usp2025-037","q-scmsp2026-032","q-simepm89-009","q-fmabc2022-006","q-amrigs2020-024","q-fmabc2026-027","q-unesp2022-069","q-unicampdis2022-021","q-tp20251-070","q-amrigs2022-039","q-usprp2021-030","q-uspsp5-053","q-unifesp2022-010"],
          prosa: `A avaliação começa pela **inspeção da via aérea, da sua perviedade e da capacidade de oxigenação**. [[Se o paciente fala, a via aérea está pérvia e a perfusão cerebral é razoável; o paciente "consciente, que fala frases curtas" ainda mantém A, mas a taquipneia pede olhar o B.|q-adap24-005,q-fmabc2021-002]] **Murmúrio vesicular abolido com hipertimpanismo e choque** é **pneumotórax hipertensivo**: **descompressão torácica imediata, sem radiografia** (toracocentese de alívio no quinto espaço intercostal, linha axilar anterior, e depois drenagem), mesmo antes da intubação, porque a pressão positiva piora a tensão.|q-unifesp2024-008,q-famerp2026-073,q-einstein2025-021,q-unicampdis2025-066,q-usp2022-069]]

[[O paciente com **choque** na avaliação primária recebe, **na ordem**: drenagem do tórax (se pneumo ou hemotórax), **torniquete** em membro com hemorragia externa exanguinante, laparotomia se FAST positivo e instável, e **tomografia de crânio por último**, pois o cérebro espera. Em trauma com TCE e tórax, a craniotomia, a laparotomia e a drenagem torácica se ordenam conforme a instabilidade: drenar primeiro, controlar o abdome em seguida.|q-usp2022-069,q-usp2024-034]]

[[A **hemorragia externa** controla-se primeiro por **compressão direta**; o **torniquete** entra quando a compressão falha ou há lesão exanguinante de membro, e é a primeira medida junto da intubação e do transporte rápido no politrauma grave.|q-amrigs2022-039,q-scmsp2026-032]] [[O **choque no trauma é hemorrágico até prova em contrário**; o choque **neurogênico** (hipotensão com bradicardia e déficit) e o **obstrutivo** (pneumotórax hipertensivo, tamponamento) vêm depois na lista, e o **RUSH** (ultrassom à beira do leito) procura a causa do choque quando não há hemorragia evidente.|q-scmsp2026-031,q-usprp2021-030]]

A **escala de coma de Glasgow** soma abertura ocular (1 a 4), resposta verbal (1 a 5) e motora (1 a 6): abertura ao comando de voz (3), verbal confusa (4) e localiza a dor (5) dão **12**; sem abertura ocular (1), verbal incompreensível (2) e flexão anormal (3) ou retirada somam **8**. **Glasgow ≤ 8** indica via aérea definitiva. [[Na **exposição**, retira-se toda a roupa, rola-se o paciente em bloco e **evita-se a hipotermia em qualquer clima**, porque a hipotermia agrava a coagulopatia; nos ferimentos por projétil, procura-se o orifício de saída.|q-sessp2022-030]]

[[Nos **adjuntos**, a radiografia de tórax e a de pelve e o FAST se fazem na sala de trauma. As fontes de choque de uma paciente intubada com tórax expandindo bilateralmente e fraturas de fêmur e perna são **abdome, pelve e ossos longos**.|q-sessp2022-028,q-sirio2024-025]] No **triagem em desastre**, a classificação START vê respiração, perfusão e nível de consciência; a vítima **preta** é a que está em óbito ou agônica.|q-fmabc2022-006]]`,
          texto: `- Sequência: **A** (via aérea + coluna cervical), **B**, **C** (hemorragia), **D** (neurológico), **E** (exposição, hipotermia). {q-fmabc2021-002,q-sessp2022-030}
- A avaliação inicia-se pela **perviedade da via aérea** e pela capacidade de oxigenação. {q-fmabc2021-002}
- **Pneumotórax hipertensivo** (murmúrio abolido, hipertimpanismo, choque): **descompressão imediata**, sem radiografia. {q-unifesp2024-008,q-famerp2026-073,q-unicampdis2025-066}
- Colisão com Glasgow baixo e choque: **drenagem torácica, torniquete, laparotomia e só depois tomografia de crânio**. {q-usp2022-069,q-usp2024-034}
- **Hemorragia externa**: primeiro **compressão** do local; torniquete na falha ou lesão exanguinante. {q-amrigs2022-039,q-scmsp2026-032}
- Choque em trauma: **hemorrágico até prova em contrário**; o **RUSH** busca a causa quando é obscura. {q-scmsp2026-031}
- Criança intubada que piora subitamente com murmúrio reduzido e hipertimpanismo: **choque obstrutivo**. {q-usprp2021-030}
- **Glasgow**: voz (3) + confusa (4) + localiza (5) = **12**; sem abertura ocular, sons incompreensíveis, flexão: **8**. {q-amrigs2020-024,q-fmabc2026-027}
- Paciente com Glasgow de 8 ou menos e via aérea comprometida: **via aérea definitiva**. {q-unesp2022-069,q-unicampdis2022-021}
- Exposição: retirar toda a roupa, rolar em bloco; a prevenção de hipotermia vale **em qualquer clima**. {q-sessp2022-030}
- Fontes de choque em paciente intubada com tórax normal: **abdome, pelve e ossos longos**. {q-sessp2022-028}
- Colisão com sofrimento respiratório e dor torácica à direita: choque obstrutivo associado a hemotórax possível. {q-unesp2024-061}
- Paciente grave que responde à reanimação: manter o monitoramento e **tromboprofilaxia** na fase hospitalar. {q-uspsp4-052}
- FAST positivo e hipotensão justificam a reanimação com **hemocomponentes**. {q-usp2025-037}
- Paciente em apneia sem obstrução de via aérea e sem trauma torácico: **ausência de drive respiratório**. {q-uspsp5-053}
- Politrauma com pelve e coluna: **cinta pélvica na altura do trocânter maior** como primeira medida. {q-tp20251-070}
- Idosa de 82 anos consciente (Glasgow 15) com fraturas de pelve e costelas: **ventilação e circulação, depois o controle da dor**. {q-scmsp2025-030}
- Glasgow 6 em colar e prancha, intubado e hipotenso após volume: **iniciar noradrenalina** (choque neurogênico). {q-tp20222-078}
- Ferimento penetrante no tórax com choque e sem estase jugular: **ultrassonografia point-of-care expandida** (eFAST). {q-unifesp2022-010}
- Hemotórax com pneumotórax (macicez, enfisema, SatO2 88%): **drenagem torácica** depois de assegurar a via aérea. {q-simepm89-009}
- **START**: a vítima preta é a em óbito ou agônica. {q-fmabc2022-006}` },
      ],
    },
    {
      id: "via-aerea", titulo: "Via aérea no trauma",
      introducao: `[[A via aérea é a **primeira prioridade** porque a hipóxia mata em minutos e lesiona o cérebro. O trauma de face, o sangue na boca, o estridor e a rouquidão são sinais de via aérea em risco; a coluna cervical é **presumida lesada** até prova em contrário, e todo procedimento é feito com **estabilização manual alinhada** da coluna.|q-scmsp2021-035,q-famema2021-010,q-adap21-030]]`,
      fragmentos: [
        { id: "va-definitiva", titulo: "Quando intubar e quando fazer a cricotireoidostomia cirúrgica", conferir: true, diretrizes: ["atls"],
          questoes: ["q-adap21-030","q-scmsp2021-035","q-scmsp2022-001","q-famema2021-010","q-tp20231-071","q-sirio2026-026","q-fmabc2022-037","q-famerp2022-073","q-unicampdis2023-013","q-sirio2026-028","q-sessp2023-020","q-sessp2026-040","q-usprp2021-091","q-unesp2025-063","q-unesp2026-010","q-amrigs2025-074","q-unifesp2023-092","q-tp20232-074","q-unicampdis2022-021"],
          prosa: `A **via aérea cirúrgica pela cricotireoidostomia** é indicada quando **não se consegue intubar nem ventilar** (a "via aérea cirúrgica": trauma facial grave com sangramento, estridor, saturação de 78% e queda de consciência após tentativas falhas). [[A cricotireoidostomia **cirúrgica** se faz **pela membrana cricotireóidea**; a **por punção** é a opção em crianças pequenas; a **traqueostomia** de emergência não é a primeira escolha, e a **intubação nasotraqueal às cegas** é contraindicada no trauma de face e de base de crânio.|q-unicampdis2023-013,q-tp20231-071,q-sirio2026-026,q-fmabc2022-037]] [[No trauma de face com **sangramento oral intenso**, dispneia e perda de substância (arma de fogo de grande calibre, avulsão), a via aérea cirúrgica é a que garante; o paciente de capotamento, Glasgow 7, equimose periorbitária bilateral e sangramento é o mesmo caso.|q-famema2021-010,q-tp20231-071,q-fmabc2022-037]]

[[Quando a via aérea **está pérvia e o paciente tolera**, a conduta é **intubação orotraqueal** com estabilização manual (com a cânula orofaríngea e máscara de oxigênio a 15 L/min, sem escoar); no trauma cervical com sinais de lesão laríngea (rouquidão, enfisema subcutâneo, crepitação), a **traqueostomia** é a via mais segura.|q-scmsp2021-035,q-unicampdis2022-021,q-famerp2022-073]] [[No ferimento penetrante cervical que **ainda não** compromete a via aérea, garante-se a via aérea **de forma controlada**, em ambiente com equipe cirúrgica presente (preferencialmente intubação), antes de ela se perder pelo hematoma.|q-sirio2026-028]]

[[A **elevação do queixo** (chin-lift) movimenta a coluna cervical; no trauma, usa-se a **tração da mandíbula (jaw-thrust)** com estabilização manual. O **capacete** fechado é retirado **por duas pessoas**, sem movimentar a coluna, para abordar a via aérea; no sangramento oral, aspira-se, oxigena-se a 12 a 15 L/min e se obtêm acessos antes de decidir a via.|q-sessp2026-040,q-unesp2025-063,q-sessp2023-020]]

**Na criança**, o pneumotórax e a rotura de brônquio são suspeitos quando o pulmão não expande apesar de dreno bem posicionado e há pneumomediastino; a **sequência rápida** de intubação com estabilização cervical é a conduta no menino de 6 anos inconsciente após colisão de bicicleta. [[No trauma raquimedular cervical alto, a insuficiência respiratória é a principal preocupação, e a falta de **drive respiratório** (apneia sem trauma torácico) exige via aérea definitiva.|q-usprp2021-091,q-unifesp2023-092,q-unesp2026-010]]`,
          texto: `- Trauma facial grave, estridor e hipóxia após tentativas falhas: **cricotireoidostomia cirúrgica**. {q-adap21-030,q-sirio2026-026}
- A cricotireoidostomia cirúrgica é feita pela **membrana cricotireóidea**. {q-unicampdis2023-013}
- Sangramento facial intenso com fraturas de maxila e mandíbula e avulsão: **cricotireoidostomia cirúrgica**. {q-fmabc2022-037,q-famema2021-010}
- Capotamento, Glasgow 7 e trauma facial com sangramento: **cricotireoidostomia** (conduta imediata). {q-tp20231-071}
- Rouquidão, enfisema subcutâneo e crepitação cervical: **traqueostomia**. {q-famerp2022-073}
- Via aérea comprometida em colar e prancha: **intubação orotraqueal**; a nasotraqueal e a punção não são as escolhas. {q-scmsp2021-035,q-scmsp2022-001}
- Cânula de Guedel e máscara com Glasgow baixo na sala: **via aérea definitiva** (intubação orotraqueal). {q-unicampdis2022-021}
- Ferida cervical estável: garantir a via aérea **de forma controlada** com equipe cirúrgica. {q-sirio2026-028}
- **Jaw-thrust** (e não chin-lift) no trauma, com estabilização manual. {q-sessp2026-040}
- **Capacete**: retirar com um segundo socorrista, sem mover a coluna cervical. {q-unesp2025-063}
- Sangramento oral: **aspirar**, oxigênio a 12 L/min e acessos venosos. {q-sessp2023-020}
- Menino de 6 anos inconsciente: **IOT em sequência rápida** com estabilização manual. {q-unesp2026-010}
- **Lesão da coluna cervical**: a principal preocupação é a insuficiência respiratória. {q-usprp2021-091}
- Pulmão que não expande com dreno bem locado e pneumomediastino: pensar em **rotura de brônquio**. {q-unifesp2023-092}
- Fratura de face de Le Fort III, afundamento frontal e fratura de mandíbula: padrão em trauma de crânio e face. {q-tp20232-074}
- Na triagem pediátrica, a lesão de menor mortalidade: concussão com crise convulsiva (comparada a ruptura de laringe e pneumotórax aberto). {q-amrigs2025-074}` },
      ],
    },
    {
      id: "choque", titulo: "Choque hemorrágico e reposição",
      introducao: `[[O **choque hemorrágico** é a causa mais comum e evitável de morte no trauma: a perda de volume reduz o retorno venoso e o débito, e o corpo compensa com **taquicardia** e **vasoconstrição** até não conseguir. Por isso a **pressão arterial cai tarde**; a taquicardia, a pele fria e o enchimento capilar lento aparecem antes.|q-fmabc2025-021,q-amrigs2022-037]] O ATLS classifica em quatro classes pela perda de volume.`,
      fragmentos: [
        { id: "choque-classes", titulo: "Classes do choque, resposta à reposição e condutas iniciais", conferir: true, diretrizes: ["atls"],
          questoes: ["q-adap22-010","q-scmsp2022-008","q-amrigs2022-037","q-fmabc2025-021","q-unicampdis2024-020","q-famerp2024-020","q-sirio2021-031","q-sirio2027-027","q-sirio2024-025","q-tp20231-074","q-einstein2026-024","q-einstein2023-021","q-famerp2023-061","q-usprp2025-017","q-sirio2026-023","q-adap21-091","q-unicampdis2025-068","q-sessp2024-039","q-sirio2027-025","q-unicamp2023-017","q-usprp2023-085"],
          prosa: `**Classe I**: perda < 15% (sem alteração relevante); **II**: 15 a 30% (taquicardia, pressão de pulso diminuída); **III**: 30 a 40% (taquicardia > 120, taquipneia, **hipotensão**, diurese de 5 a 15 mL/h, confusão); **IV**: > 40% (letargia, anúria, risco imediato de morte). [[O paciente com FC 135, FR 30 e diurese de 10 mL/h perdeu cerca de **35%** (classe III); com PA 84/58, FC 128, FR 34 e diurese 10 mL/h, o quadro é classe III; a hematêmese com perda de 40% ou mais é classe IV.|q-amrigs2022-037,q-adap22-010,q-famerp2024-020]]

[[A **resposta à reposição** guia a conduta: o paciente que **melhora** com cristaloide é "respondedor"; o que **melhora transitoriamente ou não responde** (PA 70/50 depois de 1 L) é **não respondedor** e precisa de hemorragia controlada e **hemoderivados**, não de mais cristaloide.|q-tp20231-074,q-sirio2024-025]] [[A reposição **inicial** é de **até 1 litro de cristaloide aquecido** no adulto (20 mL/kg na criança), com **hemoderivados precoces em proporção balanceada**; após 1 litro de Ringer lactato e FAST positivo, **inicia-se prontamente a transfusão**, sem aguardar gasometria, coagulograma ou "resposta". Com resposta parcial (classe II a III, hematoma em flanco, FAST positivo), usa-se **500 mL de cristaloide aquecido** e solicitam-se tipagem, gasometria com lactato e avaliação cirúrgica.|q-adap22-010,q-sirio2021-031,q-sirio2024-025,q-einstein2026-024,q-usprp2025-017]]

[[A **hipotensão permissiva** (PAS 80 a 90 mmHg até a hemostasia, com mínimo de cristaloide e transfusão balanceada) vale no trauma **penetrante** abdominal ou torácico até a hemostasia; no TCE, a hipotensão piora a perfusão cerebral, por isso a meta é maior.|q-sirio2027-027]] **Acesso**: dois cateteres periféricos **curtos e calibrosos** (14 a 18G); na criança sem acesso, o intraósseo.|q-unicampdis2025-068]]

O **índice de choque** é **FC ÷ PAS**: 140/80 = 1,75, e acima de 1 já indica gravidade; o **escore ABC** (mecanismo penetrante, PAS ≤ 90, FC ≥ 120, FAST positivo; ≥ 2 pontos) indica o **protocolo de transfusão maciça**. [[Paciente com FAST positivo, instável, em trauma abdominal fechado ou penetrante: **laparotomia exploradora imediata, sem tomografia**; o ferimento toracoabdominal por projétil com choque exige o protocolo de transfusão maciça antes da toracotomia.|q-famerp2023-061,q-scmsp2022-008,q-adap21-091,q-unicamp2023-017]]

[[A diurese esperada no adulto é de **0,5 mL/kg/h**; a **gestante** de 34 semanas em decúbito dorsal tem hipotensão por compressão da veia cava: posiciona-se em **decúbito lateral esquerdo** e a hipovolemia relativa se soma à hemorragia.|q-sessp2024-039,q-sirio2027-025]]`,
          texto: `- **Classes**: I < 15%; II 15 a 30%; **III 30 a 40%** (hipotensão, diurese 5 a 15 mL/h); IV > 40%. {q-fmabc2025-021}
- FC 135, FR 30 e diurese 10 mL/h: perda de **35%** (classe III). {q-amrigs2022-037}
- PA 84/58, FC 128, FR 34 e diurese 10 mL/h: **classe III**; até 1 L de cristaloide aquecido e hemoderivados precoces. {q-adap22-010}
- Hematêmese com **40% ou mais** de perda: **classe IV**. {q-famerp2024-020}
- Fratura exposta de fêmur com dor torácica e PA 84/63: **classe III**. {q-unicampdis2024-020}
- Falta de resposta a 1 litro de cristaloide: **choque hemorrágico classe III ou IV não respondedor**; procurar sangramento em tórax, abdome e retroperitônio. {q-tp20231-074}
- Após 1 L de Ringer lactato com FAST positivo: **iniciar prontamente a transfusão**. {q-sirio2024-025,q-sirio2021-031}
- Resposta parcial (classe II a III) e FAST positivo: **500 mL de cristaloide aquecido**, tipagem, lactato e cirurgia. {q-einstein2026-024}
- Criança com choque e dor abdominal após reposição: **concentrado de hemácias**. {q-usprp2025-017}
- **Hipotensão permissiva** (PAS 80 a 90) até a hemostasia no penetrante, com transfusão balanceada. {q-sirio2027-027}
- Trauma de crânio intubado com choque: **hemácias e plasma em proporções altas**, sem aguardar exames, e buscar o foco de sangramento. {q-usprp2023-085}
- **Acesso**: dois cateteres periféricos curtos e calibrosos (14, 16 ou 18G). {q-unicampdis2025-068}
- **Índice de choque** = FC ÷ PAS (140/80 = 1,75); **escore ABC** ≥ 2 → **transfusão maciça**. {q-scmsp2022-008,q-famerp2023-061}
- Instável com FAST positivo: **laparotomia exploradora imediata**, sem tomografia. {q-adap21-091}
- Toracoabdominal por projétil com choque e Glasgow 8: **protocolo de transfusão maciça**. {q-unicamp2023-017}
- Controlar hemorragia externa, oxigenar, acessos e **transfusão balanceada**, depois reavaliar. {q-sirio2026-023}
- Diurese esperada do adulto: **0,5 mL/kg/h**. {q-sessp2024-039}
- **Gestante** de 34 semanas hipotensa: **decúbito lateral esquerdo**. {q-sirio2027-025}` },
        { id: "choque-transfusao", titulo: "Transfusão maciça, ácido tranexâmico e a tríade letal", conferir: true, diretrizes: ["atls","wses-trauma"],
          questoes: ["q-famerp2023-066","q-famerp2024-027","q-famerp2022-067","q-unicampdis2024-075","q-sirio2024-029","q-sirio2024-038","q-sirio2027-021","q-usp2025-038","q-fmabc2025-024","q-fmabc2026-021","q-usprp2023-085","q-einstein2023-021"],
          prosa: `A **tríade letal** é a espiral que vem da hemorragia: **acidose, hipotermia e coagulopatia**. [[A hipoperfusão produz **lactato e acidose metabólica**; o frio e a acidose inibem a coagulação; a coagulopatia aumenta o sangramento, que aprofunda a hipoperfusão. Quebra-se o ciclo **controlando a hemorragia**, aquecendo, e repondo com **hemoderivados**, não com cristaloide.|q-fmabc2025-024,q-fmabc2026-021,q-sirio2027-021]]

[[O **protocolo de transfusão maciça** repõe hemácias, plasma e plaquetas em **proporções altas** (balanceadas, como 1:1:1), **sem aguardar exames laboratoriais**. Na transfusão maciça, o **fibrinogênio (fator I)** é o fator mais depletado e a **hipocalcemia** (o citrato do sangue quela o cálcio) é o distúrbio eletrolítico esperado; as metas são **hemoglobina de 8 a 12 g/dL, INR < 1,8 e plaquetas > 50.000/mm³**.|q-usprp2023-085,q-sirio2024-029,q-usp2025-038,q-sirio2024-038]]

[[O **ácido tranexâmico** (antifibrinolítico) reduz a mortalidade no trauma com hemorragia **quando dado até 3 horas** do evento: 1 g em 10 minutos e depois 1 g em 8 horas; se o sangramento persiste (retroperitônio, zona II), repete-se a dose.|q-unicampdis2024-075,q-famerp2023-066,q-famerp2022-067,q-famerp2024-027]] Na queda de 5 m com FC 133 e PA 80/60, o conjunto é **ácido tranexâmico, transfusão maciça e hipotensão permissiva**.|q-einstein2023-021]]`,
          texto: `- **Tríade letal**: **acidose, hipotermia e coagulopatia**. {q-fmabc2025-024,q-fmabc2026-021}
- Lactato e acidose resultam da **hipoperfusão**; o ciclo se interrompe controlando a hemorragia. {q-sirio2027-021}
- **Transfusão maciça**: hemácias, plasma e plaquetas em proporções altas, sem aguardar exames. {q-usprp2023-085}
- Fator mais depletado na transfusão maciça e no tamponamento pélvico: **fibrinogênio (fator I)**. {q-sirio2024-029}
- Distúrbio da transfusão maciça: **hipocalcemia**. {q-usp2025-038}
- Metas: **Hb 8 a 12 g/dL, INR < 1,8, plaquetas > 50.000**. {q-sirio2024-038}
- **Ácido tranexâmico**: primeira dose em até **3 horas**. {q-unicampdis2024-075}
- Sangramento retroperitoneal ativo em zona II: **repetir o ácido tranexâmico (1 g)**. {q-famerp2023-066}
- Choque e Glasgow 7 em ventilação mecânica: entre plasma, plaqueta, crioprecipitado e ácido tranexâmico, a prova deu o **ácido tranexâmico**. {q-famerp2022-067}
- Instável com cinta pélvica e fratura aberta: ácido tranexâmico (1 g), **transfusão maciça** e cinta. {q-famerp2024-027}
- Queda de 5 m com FC 133 e PA 80/60: **ácido tranexâmico, transfusão maciça e hipotensão permissiva**. {q-einstein2023-021}` },
      ],
    },
    {
      id: "pelve", titulo: "Trauma pélvico e urogenital",
      introducao: `[[A pelve é um **anel**: quando se rompe, o volume de sangue que ela comporta aumenta e a hemorragia se solta no retroperitônio. Por isso o tratamento é **reduzir o volume** da pelve (fechar o anel) e **tamponar**, e não explorar de cara.|q-adap23-092,q-famema2021-007,q-sirio2025-031]]`,
      fragmentos: [
        { id: "pelve-conduta", titulo: "Cinta pélvica, tamponamento, angioembolização e lesões associadas", conferir: true, diretrizes: ["atls","wses-trauma"],
          questoes: ["q-adap23-092","q-famema2021-007","q-usp2024-035","q-usp2023-119","q-sirio2025-031","q-einstein2024-027","q-einstein2022-027","q-uspsp3-106","q-sirio2023-021","q-unicamp2023-019","q-adap25-003","q-unifesp2025-003","q-tp20251-070"],
          prosa: `A pelve **instável à compressão** das cristas ilíacas, com hipotensão e hematoma em flancos, é tratada com **cinta pélvica** (na altura dos **trocânteres maiores**, e não nas cristas), **ressuscitação com hemoderivados** e, depois, **angioembolização ou tamponamento pré-peritoneal**. [[Evita-se a **compressão repetida** da bacia (que solta o coágulo) e a **sondagem vesical** antes de excluir lesão uretral; a cinta é a primeira medida mesmo antes da radiografia.|q-adap23-092,q-tp20251-070,q-unicamp2023-019,q-sirio2025-031]]

[[Se o **FAST é negativo** e a pelve instável não responde à cinta, o passo é o **tamponamento pré-peritoneal** (ou extraperitoneal), que controla o sangramento venoso da pelve em instáveis; a **laparotomia** é para quem tem FAST ou lavado peritoneal positivo, e a **fixação externa** estabiliza em seguida. No instável com **lavado peritoneal positivo**, estabiliza-se o anel e **só depois** faz-se a laparotomia.|q-einstein2024-027,q-einstein2022-027,q-famema2021-007]]

[[A **laceração perineal** que comunica com o foco de fratura caracteriza **fratura exposta da pelve**: controla-se o sangramento e a **contaminação** no centro cirúrgico, com **fixação externa e colostomia** (derivação fecal) e curativos; é grave e precisa de controle de danos.|q-uspsp3-106,q-sirio2023-021]]

[[A **lesão de uretra** suspeita (impacto no períneo, dor suprapúbica, retenção urinária) exige **uretrografia retrógrada antes de qualquer sonda**, e a **cistostomia suprapúbica** se há lesão; em fratura vertebral com bexiga neurogênica sem suspeita de uretra, a **sondagem vesical de demora** é adequada.|q-adap25-003,q-unifesp2025-003]]`,
          texto: `- Pelve instável com choque: **cinta pélvica**, hemoderivados e depois **angioembolização ou tamponamento**. {q-adap23-092}
- A cinta vai na altura dos **trocânteres maiores**. {q-unicamp2023-019,q-tp20251-070}
- Fratura de pelve deslocada com rotação externa: **cinta pélvica** primeiro. {q-sirio2025-031}
- Choque, FAST negativo e pelve instável sem resposta à cinta: **tamponamento pré-peritoneal**. {q-einstein2024-027,q-einstein2022-027}
- Diástase de sínfise > 3 cm e lavado peritoneal positivo: **estabilizar o anel e depois laparotomia**. {q-famema2021-007}
- Pelve e laceração perineal extensa: controle de sangramento e **contaminação** no centro cirúrgico; **fixação externa e colostomia**. {q-uspsp3-106,q-sirio2023-021}
- Queda de 8 m com instabilidade da bacia: a figura da prova pede a **posição correta da cinta pélvica** (posição 3, nos trocânteres maiores). {q-usp2024-035}
- Queda do terceiro andar com FC 120 e PAS 100: a figura da prova pede a **imagem C**. {q-usp2023-119}
- Impacto no períneo e retenção urinária: **uretrografia retrógrada antes da sonda**; cistostomia se houver lesão. {q-adap25-003}
- Fratura de coluna com pneumotórax e bexiga: **sondagem vesical de demora**. {q-unifesp2025-003}` },
      ],
    },
    {
      id: "coluna", titulo: "Coluna, medula e choque neurogênico",
      introducao: `[[A **lesão medular** muda o choque: perde-se o **tônus simpático** abaixo da lesão, e o resultado é **hipotensão com bradicardia** (choque neurogênico), em vez da taquicardia do choque hemorrágico. Mas o trauma é hemorrágico até prova em contrário, e o diagnóstico de choque neurogênico se faz depois de afastar o sangramento.|q-unesp2022-072,q-sirio2023-027,q-unicampdis2024-078]]`,
      fragmentos: [
        { id: "coluna-conduta", titulo: "Choque neurogênico × medular, síndromes medulares e retirada do colar", conferir: true, diretrizes: ["atls"],
          questoes: ["q-scmsp2023-031","q-sessp2022-037","q-sirio2027-032","q-sirio2021-026","q-usprp2021-091","q-usprp2022-032","q-sessp2023-010","q-sessp2025-040","q-unesp2022-072","q-unesp2025-064","q-sirio2023-027","q-unicampdis2024-078","q-sirio2025-028","q-einstein2027-028"],
          prosa: `A **perda do tônus simpático** no choque neurogênico dá hipotensão com **bradicardia** e pele quente. [[O **choque medular** (arreflexia transitória) é outra coisa: a **volta do reflexo bulbocavernoso** marca o fim; a **ausência** do reflexo não define "choque neurogênico". A fisiopatologia do choque neurogênico é a **perda do tônus simpático**.|q-sessp2023-010,q-unesp2022-072,q-unicampdis2024-078,q-sirio2023-027]]

[[**Hemissecção medular** (Brown-Séquard) é a lesão de um lado: perda motora e proprioceptiva do mesmo lado e da dor e temperatura do lado oposto, típica do ferimento penetrante cervical unilateral; a síndrome medular central e a anterior têm padrões próprios.|q-usprp2022-032,q-sirio2023-027]] [[No mergulho em lago, com hipotensão, FC baixa e déficit, a causa do choque e do déficit é a lesão ou compressão da medula cervical; o paciente com **nível T10**, hipotonia do esfíncter e dor intensa na coluna tem lesão medular com instabilidade.|q-unesp2025-064,q-sirio2021-026]]

[[Na **retirada do colar cervical**, o critério clínico (**NEXUS**) dispensa imagem: sem dor na linha média, sem déficit neurológico, sem intoxicação, sem alteração de consciência **e sem lesão distrativa**. Quando há **fratura exposta** ou lesão distrativa, o colar só sai **depois do exame de imagem**; já o paciente de colisão de baixa energia, consciente e sem dor, pode ter o colar retirado por critérios clínicos.|q-scmsp2023-031,q-sessp2022-037,q-sirio2027-032]]

[[A **prancha rígida** só serve ao transporte: o paciente com lesão medular tem a prancha **retirada prontamente**, rolando-o em monobloco e movimentando-o o mínimo possível; a queda de 4 m com ABCDE normal é retirada da prancha mantendo o alinhamento, com avaliação ortopédica no leito. Na dor lombar com queda de 6 m, a **tomografia de corpo inteiro** é a avaliação.|q-sirio2021-026,q-einstein2027-028,q-sirio2025-028]] A paraplegia completa não é por lesão de qualquer segmento: depende do nível.`,
          texto: `- **Choque neurogênico**: perda do tônus simpático; hipotensão com **bradicardia**. {q-unicampdis2024-078,q-sirio2023-027}
- Choque medular: **reflexo bulbocavernoso** volta no fim; a ausência dele não define choque neurogênico. {q-unesp2022-072,q-sessp2023-010}
- **Hemissecção medular** (Brown-Séquard) em ferimento penetrante cervical. {q-usprp2022-032}
- Mergulho em lago com sonolência, hipotensão e FC baixa: **lesão ou compressão medular cervical**. {q-unesp2025-064}
- Nível T10 com hipotonia do esfíncter: lesão medular; **prancha retirada prontamente**, em monobloco. {q-sirio2021-026}
- Colar: retirar por **critérios clínicos** (sem dor, sem déficit, sem intoxicação, sem lesão distrativa) em baixa energia. {q-sirio2027-032}
- **Fratura exposta** é lesão distrativa: o colar só sai **após imagem**. {q-scmsp2023-031,q-sessp2022-037}
- Queda de 6 m com dor lombar: **tomografia de corpo inteiro**. {q-sirio2025-028}
- ABCDE normal e queda de 4 m: retirar da prancha mantendo o alinhamento. {q-einstein2027-028}
- Trauma cervical com lesão da coluna: a principal preocupação é a **insuficiência respiratória**. {q-sessp2025-040,q-usprp2021-091}` },
      ],
    },
    {
      id: "pescoco", titulo: "Ferimentos cervicais e casos de organização do atendimento",
      introducao: `[[O pescoço é dividido em **zonas**: a **zona II** (entre a cartilagem cricóidea e o ângulo da mandíbula) é a mais comum e a mais acessível; a **zona III** (acima do ângulo da mandíbula) e a **zona I** (abaixo da cricoide) são de difícil acesso cirúrgico. O que decide é a **estabilidade hemodinâmica** e os **sinais duros** (hematoma expansivo, sangramento ativo, enfisema, perda de via aérea).|q-sessp2023-018,q-usp2024-031,q-famerp2025-077]]`,
      fragmentos: [
        { id: "pescoco-ferimentos", titulo: "Zonas do pescoço, platisma, angioTC e tratamento endovascular", conferir: true, diretrizes: ["atls"],
          questoes: ["q-usp2024-031","q-usprp2026-006","q-famema2021-013","q-sessp2023-018","q-famerp2025-077","q-scmsp2026-021","q-uspsp3-117"],
          prosa: `[[No **ferimento cervical estável** sem sinais duros, a conduta é **tomografia com contraste** (angiotomografia) para pesquisar lesão vascular e aerodigestiva, e não exploração às cegas: com suspeita de lesão vascular, o exame de escolha é a **angio-TC**; o **platisma** violado define um ferimento penetrante, mas **estável** e sem sangramento ativo pode ser observado ou investigado por imagem.|q-usp2024-031,q-famema2021-013,q-sessp2023-018]]

[[Na **zona III** com lesão vascular confirmada em paciente estável, a melhor opção é **endovascular** (tratamento aberto nessa zona é difícil); o paciente instável ou com sinais duros vai à **exploração cirúrgica**.|q-famerp2025-077]] [[O ferimento por vidro, estável, em zona lateral, sem sinais de lesão, recebe **curativo** e é encaminhado a centro especializado; o **objeto empalado** (vergalhão no pescoço) **não se retira** no pronto-socorro: leva-se o paciente **ao centro cirúrgico**, mantendo o corpo estranho fixo até a retirada controlada.|q-usprp2026-006,q-scmsp2026-021]]

[[Nas vítimas idosas, o trauma craniano com extenso AVC na tomografia, sangramento do couro cabeludo e queda dentro de casa tem **causa externa**; em caso de óbito, a **declaração é do IML**.|q-uspsp3-117]]`,
          texto: `- Ferimento cervical estável: **tomografia (angio-TC) com contraste**. {q-usp2024-031,q-famema2021-013}
- **Platisma** violado e paciente estável sem sangramento: manejo conforme a imagem, sem exploração obrigatória. {q-sessp2023-018}
- Zona III com lesão vascular confirmada: tratamento **endovascular**. {q-famerp2025-077}
- Ferimento por vidro, estável: **curativo** e encaminhar a centro especializado. {q-usprp2026-006}
- Vergalhão transfixando o pescoço: **centro cirúrgico, mantendo o corpo estranho fixo**. {q-scmsp2026-021}
- Queda em idosa com ferimento e AVC isquêmico: causa externa; óbito, **IML**. {q-uspsp3-117}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-sessp2022-037","q-sirio2027-032","q-sessp2022-030","q-famerp2022-067","q-usp2025-037"],
          prosa: `[[A regra mais recente (NEXUS) permite retirar o colar por **critérios clínicos**; as provas da SES-SP de 2022 e da Santa Casa de 2023 cobraram que ele só sai depois do exame de imagem, e a Sírio de 2027 cobrou a retirada pelos critérios clínicos.|q-sessp2022-037,q-sirio2027-032]] [[A prevenção de hipotermia vale em qualquer clima; a SES-SP 2022 pediu a alternativa incorreta e a resposta era a que a limitava aos locais frios.|q-sessp2022-030]] [[No choque com TCE e Glasgow 7, a FAMERP 2022 cobrou o **ácido tranexâmico** como primeira escolha, e a USP 2025 justificou a transfusão por FAST positivo e pressão arterial.|q-famerp2022-067,q-usp2025-037]]`,
          texto: `- Regra: colar sai por critérios clínicos (NEXUS); a prova (SES-SP 2022) cobrou que só sai **após imagem**, e a (Sírio 2027), que sai pelos **critérios clínicos**. {q-sessp2022-037,q-sirio2027-032}
- Regra: prevenir hipotermia **sempre**; a prova (SES-SP 2022) pediu a incorreta, a que só valoriza em clima frio. {q-sessp2022-030}
- Regra: transfusão balanceada no choque grave; a prova (FAMERP 2022) cobrou o **ácido tranexâmico** em TCE com choque. {q-famerp2022-067}
- Regra: transfusão justificada pelo conjunto; a prova (USP 2025) cobrou **FAST positivo e pressão arterial**. {q-usp2025-037}` },
      ],
    },
  ],
});
