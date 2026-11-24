/* resumos/apendicite-aguda/resumo.js — resumo adaptativo de apendicite aguda: fisiopatologia e sinais, quadro clínico, escore de
   Alvarado e imagem, tratamento (não complicada, abscesso, peritonite), pós-operatório, criança e gestante.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- apendicite-aguda */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "apendicite-aguda",
  titulo: "Apendicite aguda",
  assunto: "ass-apendicite",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "wses-apendicite", texto: "WSES — diretriz de Jerusalém para apendicite aguda (atualização de 2025; versões anteriores de 2016 e 2020)", edicao: "2025", lidoEm: null },
    { id: "alvarado", texto: "Escore de Alvarado (MANTRELS) e escore AIR/RIPASA — probabilidade de apendicite", lidoEm: null },
    { id: "sabiston-apendicite", texto: "Sabiston — Tratado de Cirurgia: apendicite na gestação e na criança", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anulada pela banca", questoes: ["q-amrigs2024-074"] },
  ],
  doencas: [
    {
      id: "fisiopatologia", titulo: "Fisiopatologia e sinais semiológicos",
      introducao: `[[A apendicite começa pela **obstrução da luz do apêndice**: no adulto, o **fecalito** (apendicolito) é a causa mais comum; na criança, a hiperplasia linfoide; a neoplasia de ceco e os parasitas (Ascaris) são causas menos comuns, e a dieta rica em fibras **protege**.|q-iamspe2023-017,q-amrigs2020-030]] A obstrução faz **acumular muco e subir a pressão** na luz; a pressão comprime a drenagem venosa e linfática, a parede fica isquêmica, as bactérias proliferam e, em 24 a 72 horas, vêm a necrose e a perfuração. [[A dor **visceral** começa difusa, periumbilical (o apêndice é inervado pelo plexo mesentérico), e **migra para a fossa ilíaca direita** quando a inflamação atinge o peritônio parietal.|q-fmabc2022-025,q-007]]

Veja também: **Obstrução intestinal** e **Hérnias da parede abdominal** (apêndice no saco herniário: Amyand e Garengeot), **Complicações cirúrgicas** (infecção de ferida e abscesso no pós-operatório), **Cuidados perioperatórios** (profilaxia antibiótica) e **Pré-natal** (dor abdominal na gestação).`,
      fragmentos: [
        { id: "fp-causa", titulo: "Causa, flora e classificação intraoperatória", conferir: true,
          questoes: ["q-amrigs2020-030","q-iamspe2023-017","q-fmabc2022-025","q-amrigs2022-026","q-famema2022-065"],
          prosa: `[[A causa mais comum no adulto é a **obstrução por fecalito**; a apendicite **não** se relaciona com a ingestão de fibras, ao contrário do fecalito, do adenocarcinoma de ceco e do *Ascaris*; a **artéria apendicular** é ramo da ileocólica (da mesentérica superior), e não da mesentérica inferior; a febre alta é incomum na apendicite não complicada e a **anorexia** é um sintoma comum; a ultrassonografia normal **não exclui** o diagnóstico.|q-iamspe2023-017,q-amrigs2020-030,q-fmabc2022-025]] [[A flora é **polimicrobiana** (*E. coli*, *Bacteroides fragilis*, estreptococos, enterococos), e a *Candida albicans* dificilmente é encontrada.|q-amrigs2022-026]] [[Na classificação laparoscópica de Gomes, os graus sobem com a lesão: inflamação, **necrose** (segmentar ou da base), abscesso ou massa inflamatória e, no topo, peritonite e perfuração. A necrose da base preocupa porque deixa o coto frágil, mas fica abaixo do abscesso e da peritonite; a questão da prova marcou **4c** e merece revisão.|q-famema2022-065]]`,
          texto: `- Causa mais comum no adulto: **obstrução por fecalito**. {q-iamspe2023-017}
- A dieta rica em fibras **não** causa apendicite; fecalito, neoplasia de ceco e *Ascaris* sim. {q-amrigs2020-030}
- Depois da obstrução: **muco acumulado e aumento da pressão** na luz; a ultrassonografia normal não exclui. {q-fmabc2022-025}
- Flora **polimicrobiana**; a *Candida* dificilmente é encontrada. {q-amrigs2022-026}
- Necrose na base do apêndice: grau de **necrose** na escala de Gomes (coto frágil); a prova marcou **4c**, a revisar. {q-famema2022-065}` },
        { id: "fp-sinais", titulo: "Sinais do exame físico e diferenciais por sinal", conferir: true,
          questoes: ["q-amrigs2020-038","q-fmabc2023-025","q-fmabc2026-023","q-fmabc2026-036","q-famerp2024-021"],
          prosa: `São sinais de apendicite o de **McBurney** (dor no ponto de McBurney), o de **Rovsing** (compressão da fossa ilíaca esquerda dói à direita), o do **obturador** (apêndice pélvico) e o do **iliopsoas** (elevação e extensão dolorosa da perna contra resistência, **apêndice retrocecal** ou abscesso); a prova deu o **sinal de Dunphy** como o que não é da apendicite. [[O sinal de **Fothergill** é a massa que **continua palpável com a contração do reto abdominal**, o que a põe na parede: **hematoma da bainha do reto**, e não apendicite, como na jovem que sente dor após treino intenso, sem febre e com massa endurecida.|q-fmabc2026-036,q-famerp2024-021]] [[O sinal de **Chandelier** é a dor à mobilização do colo uterino (doença inflamatória pélvica); o de **Cullen** é o hematoma periumbilical da pancreatite necro-hemorrágica.|q-fmabc2026-023]]`,
          texto: `- Sinais de apendicite: **McBurney, Rovsing, obturador, iliopsoas**; a prova deu **Dunphy** como exceção. {q-amrigs2020-038}
- **Iliopsoas**: elevação e extensão dolorosa da perna contra resistência, **abscesso retrocecal**. {q-fmabc2023-025}
- **Chandelier**: dor à mobilização do colo, DIP; **Cullen**: periumbilical, pancreatite. {q-fmabc2026-023}
- **Fothergill**: massa que persiste à contração do reto, **hematoma da bainha do reto**. {q-fmabc2026-036}
- Dor após treino, massa endurecida imóvel e sem febre: **hematoma da bainha do reto**, não apendicite. {q-famerp2024-021}` },
      ],
    },
    {
      id: "diagnostico", titulo: "Diagnóstico: quadro clínico, escore e imagem",
      introducao: `[[O diagnóstico é **clínico**: dor periumbilical que **migra para a fossa ilíaca direita**, anorexia, náuseas, febre baixa, defesa e **descompressão brusca dolorosa (Blumberg)**, com leucocitose e desvio à esquerda; o que decide levar o paciente à operação é o **conjunto**, e o escore de Alvarado dá a probabilidade.|q-007,q-scmsp2025-021,q-unicamp2022-028]]`,
      fragmentos: [
        { id: "dx-quadro", titulo: "Quadro típico e os erros diagnósticos", conferir: true,
          questoes: ["q-007","q-scmsp2025-021","q-amrigs2024-026","q-sirio2025-035","q-tp20231-072","q-sessp2023-013","q-iamspe2025-029","q-usprp2026-008","q-unicamp2022-028"],
          prosa: `[[O jovem com dor periumbilical ou epigástrica que migra para a fossa ilíaca direita, com anorexia, náuseas, febre baixa, defesa localizada, Blumberg positivo e leucocitose (13.500 a 15.000, com desvio) tem **apendicite aguda**; o que **indica a cirurgia** é a **descompressão brusca dolorosa** na fossa ilíaca direita, e não o hemograma nem uma imagem.|q-007,q-scmsp2025-021,q-amrigs2024-026,q-sirio2025-035,q-tp20231-072,q-unicamp2022-028]] [[Na mulher em idade fértil, a dúvida com a infecção urinária, a doença inflamatória pélvica e o cisto roto se resolve com a **tomografia**, que confirma a apendicite com leucocitúria; e a jovem que recebeu ciprofloxacino por "infecção urinária" **sem melhora**, com leucocitose, PCR alta e dor em fossa ilíaca direita, tem apendicite, erro diagnóstico comum, que pode chegar à peritonite.|q-sessp2023-013,q-iamspe2025-029,q-usprp2026-008]]`,
          texto: `- Dor periumbilical que migrou para a fossa ilíaca direita, Blumberg e 13.500 leucócitos: **apendicite aguda**. {q-007}
- Dor hipogástrica migratória, anorexia, febre leve, defesa e leucocitose acima de 15.000: **apendicite aguda**. {q-scmsp2025-021}
- Fibrilação atrial, dor epigástrica que migra, 37,5 °C e Blumberg: **apendicite aguda**. {q-amrigs2024-026}
- Dor difusa que localizou na fossa ilíaca direita, defesa e Blumberg: **apendicite aguda**. {q-sirio2025-035}
- Dor difusa que se localiza em 6 horas, 37,8 °C e Blumberg: **apendicite aguda**. {q-tp20231-072}
- Dor migratória, febre, defesa e leucocitúria: **apendicite**, confirmar com **tomografia**. {q-sessp2023-013}
- Jovem tratada com ciprofloxacino sem melhora: **apendicite aguda**. {q-iamspe2025-029}
- Mulher obesa com dor difusa, 38,5 °C, ciprofloxacino e descompressão difusa: **videolaparoscopia**. {q-usprp2026-008}
- Para indicar a cirurgia é necessária a **dor à descompressão brusca** na fossa ilíaca direita. {q-unicamp2022-028}` },
        { id: "dx-escore-imagem", titulo: "Escore de Alvarado, observação e exames de imagem", conferir: true, diretrizes: ["wses-apendicite","alvarado"],
          figuras: [{ arquivo: "figuras/alvarado.svg", legenda: "Esquema autoral: pontos do escore de Alvarado e a conduta por faixa." }],
          casos: ["q-usprp2023-091"],
          questoes: ["q-adap23-057","q-famerp2022-078","q-famema2021-020","q-iamspe2022-027","q-scmsp2023-039","q-unifesp2026-011","q-usp2025-048","q-einstein2025-017"],
          prosa: `O **escore de Alvarado** soma **migração da dor, anorexia, náuseas ou vômitos, dor e defesa na fossa ilíaca direita (2), descompressão dolorosa, febre, leucocitose (2) e desvio à esquerda**, de 0 a 10. [[**1 a 4** é improvável (baixo risco: **observação e reavaliação em 6 a 8 horas**, sem cirurgia nem antibiótico), **5 a 6** é possível (**imagem** ou observação seriada) e **7 a 10** é provável, e o diagnóstico clínico basta para operar; o jovem afebril com leucocitose, migração, anorexia, náuseas, dor e descompressão soma 8 (**alto risco**).|q-adap23-057,q-famerp2022-078,q-famema2021-020,q-iamspe2022-027]]

[[No Alvarado intermediário (dor migratória e defesa, **sem leucocitose**), o exame de imagem é a **tomografia**; se a tomografia for **inconclusiva** e a suspeita clínica continuar alta (dor migratória, defesa, leucocitose e PCR), faz-se **videolaparoscopia diagnóstica**, com apendicectomia se não houver outra doença; a tomografia com apêndice espessado e densificação da gordura confirma a apendicite, mesmo com disúria, e indica o **tratamento operatório**.|q-scmsp2023-039,q-unifesp2026-011,q-usp2025-048,q-einstein2025-017]]`,
          texto: `- Alvarado de 5 (náuseas, sensibilidade, leucocitose) em dor há 18 horas: **possível**; **imagem ou observação seriada**. {q-adap23-057}
- Dor migratória, anorexia, descompressão e leucocitose de 14.000, afebril: **Alvarado 8**, alto risco. {q-famerp2022-078}
- Dor migratória, vômitos, defesa e desvio à esquerda aos 18 anos: pelo Alvarado, **cirurgia**. {q-famema2021-020}
- Dor em fossa ilíaca direita sem migração, sem defesa, leucócitos 9.000, ultrassom normal: **observação e reavaliação em 6 a 8 horas**. {q-iamspe2022-027}
- Dor migratória com defesa, sem leucocitose, aos 18 anos: **tomografia**. {q-scmsp2023-039}
- Dor migratória, defesa, leucocitose e PCR, tomografia inconclusiva: **videolaparoscopia diagnóstica**. {q-unifesp2026-011}
- Dor hipogástrica há 48 horas e tomografia com apendicite: **tratamento operatório** (a cólica renal prévia distrai). {q-usp2025-048}
- Mulher de 26 anos com disúria e tomografia de apêndice espessado sem coleção: **apendicite aguda não complicada**. {q-einstein2025-017}` },
        { id: "dx-diferencial", titulo: "Diferenciais e abdome agudo", conferir: true,
          questoes: ["q-uspsp5-057","q-sessp2022-024","q-sessp2025-028"],
          prosa: `[[A **apendagite epiploica** é a dor focal (aqui na fossa ilíaca esquerda) de um apêndice epiploico inflamado ou torcido: a tomografia mostra **lesão oval de gordura com halo hiperdenso** junto do cólon sigmoide, o paciente está bem, e o tratamento é **analgésico e seguimento ambulatorial**.|q-uspsp5-057]] [[A **lâmina de ar entre o fígado e o diafragma** na radiografia, com dor difusa súbita, é **pneumoperitônio** (úlcera perfurada) e vai à **laparotomia**, sem outros exames; e o abdome agudo obstrutivo **pode evoluir** para o perfurativo.|q-sessp2022-024,q-sessp2025-028]]`,
          texto: `- Lesão oval de gordura com halo e dor em fossa ilíaca esquerda, afebril: **apendagite epiploica**; **analgésicos e seguimento**. {q-uspsp5-057}
- Dor difusa súbita e **lâmina de ar sob o diafragma**: **laparotomia exploradora**. {q-sessp2022-024}
- O abdome agudo **obstrutivo pode evoluir para perfurativo**. {q-sessp2025-028}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento: não complicada, abscesso e peritonite",
      introducao: `[[O tratamento padrão é a **apendicectomia** (de preferência por videolaparoscopia), com **antibiótico em dose única antes da incisão** quando a apendicite é não complicada; o antibiótico isolado trata, mas **recorre** (cerca de 25 a 30 % em um ano); e o **abscesso bem delimitado** em paciente estável se trata primeiro com drenagem percutânea e antibiótico.|q-scmsp2021-039,q-sirio2021-037,q-adap26-011]]`,
      fragmentos: [
        { id: "trat-nao-complicada", titulo: "Apendicite não complicada: cirurgia, profilaxia e pós-operatório", conferir: true, diretrizes: ["wses-apendicite"],
          figuras: [{ arquivo: "figuras/conduta-apendicite.svg", legenda: "Esquema autoral: o tratamento da apendicite pela fase (não complicada, abscesso, peritonite)." }],
          casos: ["q-uspsp1-035"],
          questoes: ["q-scmsp2021-039","q-usp2023-005","q-uspsp1-035","q-scmsp2022-006","q-unesp2021-065","q-unesp2024-064","q-amrigs2021-035","q-simepm89-014","q-sirio2021-037"],
          prosa: `[[O jovem com diagnóstico clínico claro (36 horas de dor, defesa, dor à percussão) faz **apendicectomia por incisão de McBurney** (ou videolaparoscopia), e não laparotomia mediana nem alta com antibiótico; o uso crônico de AAS 500 mg **não adia** a operação.|q-scmsp2021-039,q-amrigs2021-035]] [[O **antibiótico profilático** começa **na indicação cirúrgica** (30 a 60 minutos antes da incisão, mesmo por laparoscopia) e, na apendicite não complicada (apêndice edemaciado, com fibrina e pouco líquido), **uma dose na indução basta**, sem antibiótico depois, e a peça vai para a histopatologia; a cefazolina não se mantém por sete dias.|q-unesp2021-065,q-unesp2024-064,q-scmsp2022-006]] [[Sem intercorrências, o jovem recebe **dieta leve e alta no 1º pós-operatório**.|q-usp2023-005,q-uspsp1-035]]

[[O **tratamento clínico** (antibiótico) da apendicite não complicada tem como maior problema a **recorrência**, mesmo a curto prazo; e a dor recorrente em fossa ilíaca direita, de horas, por dois meses, com fecalito de 8 mm no apêndice, é apendicite recorrente, que se opera de forma **eletiva**.|q-sirio2021-037,q-simepm89-014]]`,
          texto: `- 15 anos, 36 horas de dor, defesa e dor à percussão: **apendicectomia por incisão de McBurney**. {q-scmsp2021-039}
- Jovem de 19 anos sem intercorrências: **dieta leve e alta no 1º pós-operatório**. {q-usp2023-005}
- Apêndice hiperemiado e edemaciado à videolaparoscopia: **dieta leve e alta no 1º pós-operatório**. {q-uspsp1-035}
- Apêndice com fibrina e pouco líquido: **dose única** de antibiótico na indução; peça para a histopatologia. {q-scmsp2022-006}
- O antibiótico começa **na indicação cirúrgica**. {q-unesp2021-065}
- Profilaxia **30 a 60 minutos antes** da cirurgia, mesmo por laparoscopia. {q-unesp2024-064}
- Apendicite em usuário crônico de AAS 500 mg: **cirurgia imediata** (a prova). {q-amrigs2021-035}
- Dor recorrente por 2 meses com fecalito de 8 mm: **apendicectomia eletiva**. {q-simepm89-014}
- Maior problema do tratamento clínico: **recorrência**, mesmo a curto prazo. {q-sirio2021-037}` },
        { id: "trat-complicada", titulo: "Abscesso, peritonite e complicações do pós-operatório", conferir: true, diretrizes: ["wses-apendicite"],
          questoes: ["q-adap26-011","q-uspsp2-082","q-usprp2023-091","q-tp20202-063","q-usp2025-032","q-iamspe2021-023","q-iamspe2022-026"],
          prosa: `[[O **abscesso periapendicular bem delimitado** (coleção de 6 a 8 cm, massa palpável, dor há 5 a 8 dias, febre e leucocitose), em paciente **estável e sem peritonite difusa**, trata-se com **drenagem percutânea guiada por imagem e antibiótico venoso de amplo espectro**: a operação precoce, em tecido inflamado e friável, tem mais complicações; a idosa com coleção com gás e fecalito até o psoas também; e depois, em quem tem mais de 40 a 50 anos, a colonoscopia afasta neoplasia.|q-adap26-011,q-uspsp2-082,q-usprp2023-091]] [[A **peritonite difusa** com sepse (adolescente com taquicardia, hipotensão e várias coleções) exige **ressuscitação, hemoculturas, antibiótico de largo espectro e cirurgia** com lavagem e drenagem, sem esperar a sorologia nem a drenagem isolada; na peritonite secundária comunitária, sem internação nem antibiótico recentes, a flora é de **enterobactérias e anaeróbios**, e a prova aceitou **ceftriaxona com metronidazol** mesmo com choque; as diretrizes (SIS e WSES 2017) admitem ampliar para **piperacilina-tazobactam** na forma grave, e carbapenêmicos e glicopeptídeos ficam para flora resistente.|q-tp20202-063,q-usp2025-032]]

[[No pós-operatório de apendicite complicada, a **febre com leucocitose e PCR em ascensão** (5º ou 7º dia, dor que piora, dreno seroso) é **abscesso intra-abdominal** até prova em contrário e pede **tomografia**, e não troca de antibiótico, laparotomia ou ultrassonografia.|q-iamspe2021-023,q-iamspe2022-026]]`,
          texto: `- Abscesso periapendicular de 6 cm, estável: **drenagem percutânea e antibiótico venoso**. {q-adap26-011}
- Massa de 8 cm em fossa ilíaca direita, sem peritonite difusa: **drenagem percutânea guiada por imagem e antibiótico**. {q-uspsp2-082}
- Idosa com coleção com gás e fecalito até o psoas: **drenagem percutânea**. {q-usprp2023-091}
- Adolescente com sepse e várias coleções na tomografia: **cirurgia, antibiótico e hemocultura** (o RT-PCR de covid não adia). {q-tp20202-063}
- Peritonite por apendicite perfurada com choque: **ceftriaxona e metronidazol**. {q-usp2025-032}
- 5º dia de apendicectomia complicada com febre de 38,2 °C e PCR alta: **tomografia** (abscesso). {q-iamspe2021-023}
- 7º dia, dor piorando, dreno seroso, leucócitos de 13 para 16 mil: **tomografia**. {q-iamspe2022-026}` },
      ],
    },
    {
      id: "especiais", titulo: "Apendicite na criança e na gestante",
      introducao: `A criança e a gestante têm quadros menos típicos e, por isso, **mais perfuração**; a escolha do exame muda: na criança e na gestante, a **ultrassonografia** vem primeiro (e a ressonância na gestação), para poupar a radiação.`,
      fragmentos: [
        { id: "crianca", titulo: "Criança e adolescente", conferir: true, diretrizes: ["sabiston-apendicite"],
          questoes: ["q-famema2023-084","q-unesp2022-062","q-unesp2025-068","q-tp20222-063","q-tp20252-051","q-unicampdis2025-016","q-tp20232-060","q-tp20241-060"],
          prosa: `[[O menino de 12 anos com anorexia, náuseas, migração da dor, febre, descompressão dolorosa e leucocitose de 14.000 com desvio tem Alvarado alto e vai à **cirurgia**; o diagnóstico clínico basta.|q-tp20232-060,q-tp20241-060]] [[Na **criança pequena** o quadro é de dor há dois ou três dias, vômitos (biliosos), febre, desidratação, distensão e **peritonite**, com diarreia que confunde com gastroenterite: a menina de 3 anos com reação peritoneal em hipogástrio e a de 6 anos com Blumberg positivo são operadas; a de 4 anos com febre baixa, distensão e dor em fossa ilíaca direita tem apendicite.|q-famema2023-084,q-unesp2022-062,q-unesp2025-068]]

[[Quando o quadro é **duvidoso**, a **ultrassonografia** é o exame: criança de 8 anos com febre, faringite e constipação (confundidores) e dor com descompressão em fossa ilíaca direita; adolescente de 14 anos com vida sexual (diferencial ginecológico); e a menina de 10 anos pré-púbere, afebril, com leucócitos de 8.300 e dor em cólica, que precisa de **imagem e urina tipo I**, e não de cirurgia ou antibiótico imediatos.|q-unicampdis2025-016,q-tp20252-051,q-tp20222-063]]`,
          texto: `- Menino de 12 anos, dor migratória, febre e Blumberg: Alvarado alto, **diagnóstico clínico basta**. {q-tp20232-060}
- Menino de 12 anos com anorexia, descompressão e leucocitose de 14.000 com desvio: **tratamento cirúrgico**. {q-tp20241-060}
- Menina de 4 anos, dor em fossa ilíaca direita, febre baixa e distensão: **apendicite aguda**. {q-famema2023-084}
- Menina de 3 anos com vômitos esverdeados e reação peritoneal em hipogástrio: **apendicite**; **apendicectomia**. {q-unesp2022-062}
- Menina de 6 anos com Blumberg positivo e disúria: **apendicectomia de urgência**. {q-unesp2025-068}
- Criança de 8 anos com faringite e constipação, dor e descompressão em FID: **ultrassonografia**. {q-unicampdis2025-016}
- Adolescente de 14 anos, febre 38,2 °C e Blumberg: **ultrassonografia de urgência** (diferencial ginecológico). {q-tp20252-051}
- Menina de 10 anos pré-púbere, afebril e leucócitos de 8.300: **imagem e urina tipo I**. {q-tp20222-063}` },
        { id: "gestante", titulo: "Gestante: ultrassonografia, ressonância e cirurgia", conferir: true, diretrizes: ["sabiston-apendicite","wses-apendicite"],
          questoes: ["q-unifesp2023-057","q-amrigs2025-027","q-didepm-092","q-amrigs2025-026"],
          prosa: `[[A apendicite é a **causa mais comum de abdome agudo cirúrgico não obstétrico na gestação**; o útero desloca o ceco, a leucocitose fisiológica chega a 16.000 e a taquicardia é comum, e **a perfuração é a maior causa de perda fetal**, de modo que **não se atrasa o diagnóstico**.|q-amrigs2025-026,q-amrigs2025-027]] [[A ordem dos exames é **ultrassonografia, ressonância sem gadolínio e, sem ressonância e com ultrassom inconclusivo, tomografia com protocolo de baixa dose** (dose fetal abaixo de 50 mGy); a confirmação leva à **apendicectomia, preferencialmente laparoscópica**; e a gestante de 10 semanas com febre, vômitos, parada de eliminação, 18.800 leucócitos e líquido livre, sem ressonância e sem transferência, vai à **cirurgia de urgência**, sem tomografia, antibiótico com reavaliação ou enteroclisma.|q-didepm-092,q-amrigs2025-027,q-unifesp2023-057]]`,
          texto: `- Gestante de 10 semanas com sinais de apendicite complicada, sem ressonância: **cirurgia de urgência**, de preferência laparoscópica. {q-unifesp2023-057}
- Gestante de 30 semanas, ultrassom inconclusivo e sem ressonância: **tomografia de baixa dose**. {q-amrigs2025-027}
- Gestante de 22 semanas, ultrassom sem visualizar o apêndice: **ressonância sem gadolínio** e apendicectomia laparoscópica. {q-didepm-092}
- A apendicite é a causa mais frequente de abdome agudo **não obstétrico** na gestação. {q-amrigs2025-026}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-amrigs2020-038","q-amrigs2021-035","q-simepm89-014","q-tp20202-063","q-usp2025-032","q-unifesp2026-011"],
          prosa: `[[O sinal de Dunphy (dor na fossa ilíaca direita à tosse) costuma ser descrito como sinal de apendicite; a AMRIGS 2020 o deu como o que **não** é.|q-amrigs2020-038]] [[A regra é operar o diagnóstico de apendicite sem adiar por medicação de rotina; a AMRIGS 2021 cobrou a **cirurgia imediata** no usuário de AAS 500 mg.|q-amrigs2021-035]] [[A **apendicite recorrente** com fecalito, afebril e sem dor, se opera de forma **eletiva**; o item é discutível, porque parte dos serviços pediria antes a tomografia.|q-simepm89-014]] [[Na peritonite comunitária com choque, a regra é o **controle do foco** e a cobertura de enterobactérias e anaeróbios, que as diretrizes admitem ampliar para piperacilina-tazobactam na forma grave; a USP 2025 aceitou **ceftriaxona e metronidazol**; no adolescente com várias coleções, a regra é a cirurgia sem esperar o resultado da covid.|q-usp2025-032,q-tp20202-063]] [[Com tomografia inconclusiva e quadro forte, a UNIFESP 2026 cobrou a **videolaparoscopia diagnóstica**, e não a ressonância nem a antibioticoterapia com reavaliação.|q-unifesp2026-011]]`,
          texto: `- Regra: Dunphy costuma ser tido como sinal de apendicite; a prova (AMRIGS 2020) o deu como exceção. {q-amrigs2020-038}
- Regra: operar sem adiar; a prova (AMRIGS 2021) cobrou **cirurgia imediata** no usuário de AAS 500 mg. {q-amrigs2021-035}
- Regra: apendicite recorrente com fecalito se opera eletivamente; item discutível (parte pediria tomografia). {q-simepm89-014}
- Regra: peritonite comunitária com choque cobre enterobactérias e anaeróbios; a prova (USP 2025) cobrou **ceftriaxona e metronidazol**. {q-usp2025-032}
- Regra: sepse com coleções difusas vai à cirurgia; a prova (Teste de Progresso 2020) cobrou **RT-PCR, cirurgia, antibiótico e hemocultura**. {q-tp20202-063}
- Regra: tomografia inconclusiva e suspeita alta; a prova (UNIFESP 2026) cobrou **videolaparoscopia diagnóstica**. {q-unifesp2026-011}` },
      ],
    },
  ],
});
