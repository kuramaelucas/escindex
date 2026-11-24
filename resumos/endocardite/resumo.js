/* resumos/endocardite/resumo.js — resumo adaptativo de endocardite infecciosa: mecanismo e agentes (por porta
   de entrada, valva nativa × prótese, usuário de drogas, S. gallolyticus), quadro e fenômenos periféricos,
   critérios de Duke, hemoculturas e ecocardiograma, cultura negativa, tratamento por agente, complicações e
   cirurgia, profilaxia (quem e como), armadilhas e tabela das formas clínicas.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- endocardite */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "endocardite",
  titulo: "Endocardite infecciosa",
  assunto: "ass-endocardite",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "esc-endocardite", texto: "ESC — 2023 Guidelines for the management of endocarditis (Delgado et al., Eur Heart J 2023;44:3948)", lidoEm: null },
    { id: "duke-iscvid", texto: "Fowler VG et al. — The 2023 Duke-International Society for Cardiovascular Infectious Diseases Criteria for Infective Endocarditis (Clin Infect Dis 2023)", lidoEm: null },
    { id: "aha-profilaxia", texto: "AHA — Prevention of viridans group streptococcal infective endocarditis: a scientific statement (Wilson et al., Circulation 2021;143:e963)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição", questoes: ["q-iamspe2023-016","q-gdendocardite-005","q-gdendocardite-006","q-gdendocardite-029","q-gdendocardite-041"] },
  ],
  doencas: [
    {
      id: "mecanismo", titulo: "Mecanismo e agentes",
      introducao: `[[O endotélio valvar íntegro não deixa bactéria grudar. Quando um jato turbulento (valvopatia reumática, valva bicúspide, prolapso com regurgitação, prótese) lesa o endotélio, formam-se plaquetas e fibrina (endocardite trombótica não bacteriana); a bactéria que passa pelo sangue numa bacteremia (dente, cateter, agulha) adere ali, multiplica-se protegida da defesa e forma a vegetação.|q-gdendocardite-023,q-einstein2027-013,q-gdendocardite-030]] [[A vegetação causa a doença de três jeitos: destrói a valva (regurgitação nova, insuficiência cardíaca, abscesso), solta pedaços (embolias para cérebro, baço, rim, pulmão) e lança antígeno no sangue, formando imunocomplexos (glomerulonefrite, nódulos de Osler, manchas de Roth, fator reumatoide positivo).|q-gdendocardite-010,q-gdendocardite-053,q-gdendocardite-022]] [[O agente acompanha a porta de entrada e o terreno: estreptococos do grupo viridans da boca (subaguda, em valva já doente); *Staphylococcus aureus* da pele e dos cateteres (aguda, destrói até valva normal); enterococo do trato urinário e intestinal; *Streptococcus gallolyticus* (*S. bovis*) do cólon.|q-gdendocardite-023,q-gdendocardite-013,q-gdendocardite-035,q-udisc20262-022]]

Veja também: **Antibioticoterapia e resistência bacteriana** (MRSA, enterococo, biofilme), **Infecções relacionadas à assistência à saúde** (infecção de cateter), **Sepse**, **Arritmias** (bloqueios), **Insuficiência cardíaca** (regurgitação aguda) e **Glomerulopatias** (glomerulonefrite por imunocomplexos).`,
      fragmentos: [
        { id: "mec-agentes", titulo: "Agente pela porta de entrada e pelo tipo de valva", conferir: true,
          questoes: ["q-gdendocardite-013","q-gdendocardite-023","q-gdendocardite-030","q-gdantibioticos-043","q-gdendocardite-035","q-gdendocardite-037","q-gdendocardite-042","q-gdendocardite-054","q-gdendocardite-047","q-inf-27","q-gdendocardite-028","q-gdendocardite-039","q-gdendocardite-046","q-gdendocardite-059","q-gdendocardite-020","q-einstein2027-013","q-gdendocardite-007"],
          prosa: `[[O *S. aureus* é o agente mais comum hoje e o da forma aguda: febre alta, toxemia, destruição rápida, inclusive em valva sem doença prévia, muitas vezes depois de um furúnculo ou de um cateter.|q-gdendocardite-013,q-gdendocardite-035,q-gdendocardite-037]] [[No usuário de drogas injetáveis a bactéria da pele entra na veia e chega primeiro à tricúspide: *S. aureus* na valva tricúspide, com sopro sistólico que aumenta na inspiração e êmbolos sépticos no pulmão (nódulos que escavam).|q-gdendocardite-042,q-gdendocardite-054,q-gdendocardite-047,q-inf-27,q-gdendocardite-028]] [[Depois de dente ou boca, em valva já lesada, o quadro é subagudo (semanas de febre baixa, emagrecimento) e o agente é estreptococo do grupo viridans (*S. mitis*, *S. sanguinis*).|q-einstein2027-013,q-gdendocardite-023]] [[Coco Gram-positivo em cadeia, catalase-negativo e sem hemólise na placa é enterococo (o viridans faz hemólise alfa, esverdeada).|q-gdendocardite-030,q-gdantibioticos-043]] [[Na prótese o tempo conta: até 12 meses da cirurgia (sobretudo nos 2 primeiros) a infecção veio do hospital (estafilococos coagulase-negativos, *S. aureus*, Gram-negativos, fungos); depois de 1 ano o perfil volta a ser o da valva nativa, com estreptococos à frente. O viridans é o agente menos esperado na prótese precoce, e *Klebsiella* não é o germe esperado na prótese de 6 meses.|q-gdendocardite-039,q-gdendocardite-046,q-gdendocardite-059,q-gdendocardite-020,q-gdendocardite-007]]`,
          texto: `- Febre aguda com manchas de Roth sem valvopatia: ***S. aureus***. {q-gdendocardite-013}
- Dente → **viridans**; urológico e intestinal → **enterococo**; droga EV → **estafilococo**; neoplasia intestinal → ***S. bovis***. {q-gdendocardite-023}
- Coco em cadeia, catalase-negativo, sem hemólise: **enterococo**. {q-gdendocardite-030,q-gdantibioticos-043}
- Furúnculo antes do quadro agudo com petéquias: **endocardite aguda por *S. aureus***. {q-gdendocardite-035}
- Usuário de drogas com Osler e Janeway: ***S. aureus***. {q-gdendocardite-037,q-gdendocardite-054}
- Usuário de drogas: ***S. aureus* na tricúspide**. {q-gdendocardite-042}
- Sopro que aumenta na inspiração e tosse: **tricúspide com embolia pulmonar séptica**. {q-gdendocardite-047,q-gdendocardite-028}
- Usuário de drogas com êmbolos pulmonares: **hemoculturas seriadas e ecocardiograma**. {q-inf-27}
- Prótese há mais de 1 ano: **estreptococo**. {q-gdendocardite-039,q-gdendocardite-020}
- Prótese entre 2 e 12 meses: **estafilococos coagulase-negativos**. {q-gdendocardite-046}
- Menos esperado na prótese precoce: ***S. viridans***. {q-gdendocardite-059}
- Subaguda 35 dias depois de dente: ***S. mitis*, ceftriaxona**. {q-einstein2027-013}
- Prótese de 6 meses com deiscência: **não** é *Klebsiella*. {q-gdendocardite-007}` },
        { id: "mec-gallolyticus", titulo: "Streptococcus gallolyticus (bovis) e o cólon", conferir: true,
          questoes: ["q-udisc20262-022","q-gdendocardite-017","q-gdendocardite-025","q-gdendocardite-045","q-gdendocardite-051"],
          prosa: `[[O *S. gallolyticus* (antigo *S. bovis* biótipo I) vive no intestino e entra no sangue pela mucosa doente do cólon: pólipo ou câncer. Por isso toda endocardite ou bacteremia por ele pede colonoscopia, mesmo depois da cura, mesmo sem sintoma intestinal.|q-udisc20262-022,q-gdendocardite-017,q-gdendocardite-025,q-gdendocardite-045,q-gdendocardite-051]]`,
          texto: `- Curado de endocardite por *S. bovis*: **colonoscopia**. {q-udisc20262-022,q-gdendocardite-025}
- Hemocultura com *S. bovis* e vegetação mitral: **colonoscopia**. {q-gdendocardite-017,q-gdendocardite-051}
- *S. gallolyticus*: **pesquisar tumor de cólon**. {q-gdendocardite-045}` },
      ],
    },
    {
      id: "diagnostico", titulo: "Quadro clínico e diagnóstico",
      introducao: `[[Febre com sopro é endocardite até prova em contrário. O resto do quadro vem dos três mecanismos: embolia (fenômenos vasculares: petéquias, hemorragias em lasca nas unhas, lesões de Janeway indolores nas palmas e plantas, infarto e abscesso esplênico, AVC) e imunocomplexos (fenômenos imunológicos: nódulos de Osler dolorosos nas polpas, manchas de Roth na retina, glomerulonefrite); a inflamação crônica dá anemia normocítica, esplenomegalia e baqueteamento.|q-sirio2023-005,q-sirio2023-013,q-gdendocardite-010,q-gdendocardite-034,q-gdendocardite-044]]`,
      fragmentos: [
        { id: "dx-quadro", titulo: "Quadro e fenômenos periféricos", conferir: true,
          casos: ["q-scmsp2026-033"],
          questoes: ["q-sirio2023-005","q-sirio2023-013","q-gdendocardite-010","q-gdendocardite-034","q-gdendocardite-044","q-gdendocardite-015","q-gdendocardite-022","q-gdendocardite-038","q-gdendocardite-016","q-scmsp2026-033","q-sirio2027-016"],
          prosa: `[[Manchas de Roth no fundo de olho levam a pedir ecocardiograma e hemoculturas.|q-sirio2023-005,q-sirio2027-016]] [[As máculas rosadas evanescentes do tronco não são de endocardite (são da febre reumática ou da doença de Still); as manchas de Bitot são de deficiência de vitamina A.|q-sirio2023-013,q-gdendocardite-034]] [[O êmbolo segue o fluxo: da mitral e da aórtica vai para a circulação sistêmica (cérebro, baço, rim); a mitral é a mais ligada a AVC, e quanto maior e mais móvel a vegetação (mais de 10 mm), maior o risco. Da tricúspide vai para o pulmão.|q-gdendocardite-038,q-gdendocardite-016]] [[O abscesso esplênico de quem tem endocardite (ou fibrilação atrial e bacteremia) é embolia séptica; quando não melhora com antibiótico, tira-se o baço.|q-scmsp2026-033]] [[A endocardite aguda pode abrir o quadro pelo cérebro (microembolia que imita meningite, com líquor estéril) e piorar com regurgitação mitral aguda e edema pulmonar.|q-gdendocardite-015]] [[Glomerulonefrite com consumo de complemento, Osler e petéquias na prótese mecânica: endocardite subaguda com fenômenos imunológicos e vasculares.|q-gdendocardite-022]]`,
          texto: `- Manchas de Roth: **ecocardiograma e hemoculturas**. {q-sirio2023-005}
- Não é sinal de endocardite: **máculas róseas evanescentes no tronco**. {q-sirio2023-013}
- Roth = **fenômeno imunológico**; Janeway = **fenômeno vascular**. {q-gdendocardite-010}
- Baqueteamento, petéquias e Osler, **sem** manchas de Bitot. {q-gdendocardite-034}
- Achado mais provável: **anemia normocítica**. {q-gdendocardite-044}
- Rigidez de nuca, líquor estéril e *S. aureus*: **microembolia para o SNC e insuficiência mitral aguda**. {q-gdendocardite-015}
- Prótese mecânica com hematúria dismórfica e Osler: **endocardite subaguda com fenômenos imunológicos**. {q-gdendocardite-022}
- Valva mais ligada à embolia cerebral: **mitral**. {q-gdendocardite-038}
- Maior chance de embolizar: **vegetação de 11 mm na mitral**. {q-gdendocardite-016}
- Abscesso esplênico em paciente com FA e bacteremia: **embolia séptica, esplenectomia**. {q-scmsp2026-033}
- Lesões retinianas de centro pálido: **vasculite imunomediada** que reforça a infecção intravascular. {q-sirio2027-016}` },
        { id: "dx-duke", titulo: "Critérios de Duke", conferir: true, diretrizes: ["duke-iscvid"],
          figuras: [{ arquivo: "figuras/duke.svg", legenda: "Esquema autoral: critérios de Duke (maiores, menores e a combinação que define a endocardite)." }],
          questoes: ["q-gdendocardite-014","q-gdendocardite-032","q-gdendocardite-048","q-gdendocardite-053","q-gdendocardite-058","q-gdendocardite-063","q-gdendocardite-008","q-gdendocardite-052","q-usprp2025-061"],
          casos: ["q-usprp2025-061"],
          prosa: `[[Os critérios de Duke juntam as duas provas da infecção na valva: a bactéria típica no sangue (hemoculturas positivas em amostras separadas) e a lesão na imagem (vegetação, abscesso, regurgitação nova, deiscência nova de prótese). Essas são os critérios **maiores**.|q-gdendocardite-058,q-gdendocardite-032,q-gdendocardite-008,q-gdendocardite-052]] [[Os **menores** são o terreno e os sinais indiretos: condição predisponente (valvopatia, prótese, droga injetável), febre de 38 °C ou mais, fenômenos vasculares (embolia arterial, infarto séptico pulmonar, Janeway, hemorragias) e imunológicos (glomerulonefrite, Osler, Roth, fator reumatoide), e hemocultura que não preenche o critério maior. VHS alta não é critério.|q-gdendocardite-048,q-gdendocardite-053,q-gdendocardite-063,q-usprp2025-061]] [[Endocardite definida: dois maiores, ou um maior e três menores, ou cinco menores. O êmbolo que aparece durante ou depois do tratamento eficaz não prova falha do antibiótico: a vegetação ainda pode se soltar.|q-gdendocardite-032,q-gdendocardite-014]]`,
          texto: `- Êmbolo tardio durante tratamento eficaz **não** é por si falha. {q-gdendocardite-014}
- Confirma: **viridans em duas hemoculturas + vegetação**. {q-gdendocardite-032}
- Não é critério menor: **regurgitação nova no eco** (é maior). {q-gdendocardite-048}
- Não é critério: **VHS aumentada**. {q-gdendocardite-053}
- Critério maior: **regurgitação valvar nova**. {q-gdendocardite-058}
- Falso: embolia e glomerulonefrite são critério **maior** (são menores). {q-gdendocardite-063}
- Deiscência de prótese **é** evidência de endocardite. {q-gdendocardite-008}
- Hemoculturas seriadas e eco com vegetação: **critérios maiores**. {q-gdendocardite-052}
- Bicúspide com vegetação e hemocultura negativa: o achado periférico **completa os critérios menores**. {q-usprp2025-061}` },
        { id: "dx-exames", titulo: "Hemoculturas e ecocardiograma", conferir: true, diretrizes: ["esc-endocardite"],
          casos: ["q-iamspe2022-005","q-scmsp2026-017"],
          questoes: ["q-gdendocardite-021","q-gdendocardite-027","q-gdendocardite-055","q-gdendocardite-056","q-scmsp2023-001","q-gdantibioticos-079","q-iamspe2022-005","q-scmsp2026-017","q-famerp2022-049"],
          prosa: `[[Antes do antibiótico colhem-se ao menos três pares de hemoculturas, de punções e horários diferentes: a bacteremia da endocardite é contínua, e várias amostras positivas para o mesmo germe separam infecção de contaminação.|q-gdendocardite-021,q-gdendocardite-055]] [[O ecocardiograma transtorácico é o primeiro; o transesofágico, com o transdutor atrás do átrio esquerdo, vê vegetações pequenas, abscessos e a prótese (onde o metal faz sombra no transtorácico). Por isso o transesofágico é o exame na prótese e quando o transtorácico é negativo e a suspeita continua, como na bacteremia por *S. aureus*. A tricúspide, que é anterior, aparece bem no transtorácico.|q-gdendocardite-056,q-gdendocardite-027,q-scmsp2023-001]] [[Toda bacteremia por *S. aureus* pede ecocardiograma, e a que persiste depois de dias de antibiótico adequado é endocardite (ou outro foco profundo) até prova em contrário.|q-gdantibioticos-079,q-famerp2022-049]] [[Nódulos pulmonares múltiplos, às vezes escavados, em quem dialisa por cateter ou injeta drogas, são êmbolos sépticos: o exame que confirma é hemocultura com ecocardiograma, não a pesquisa de tuberculose ou fungo.|q-iamspe2022-005,q-scmsp2026-017]]`,
          texto: `- Hemoculturas seriadas **antes do antibiótico** e ecocardiograma. {q-gdendocardite-021}
- Tricúspide: **transtorácico** basta. {q-gdendocardite-027}
- Febre de 2 meses sem foco: **hemoculturas e eco transesofágico**. {q-gdendocardite-055}
- Prótese com febre: **transesofágico**. {q-gdendocardite-056}
- MRSA no cateter de diálise com transtorácico normal: **vancomicina e transesofágico**. {q-scmsp2023-001}
- *S. aureus* com hemocultura ainda positiva: **ecocardiograma**. {q-gdantibioticos-079}
- Nódulos pulmonares após internação com cateter: **ecocardiograma**. {q-iamspe2022-005}
- Dialítica com nódulos pulmonares e febre: **hemocultura e ecocardiograma**. {q-scmsp2026-017}
- Artrite séptica por *S. aureus* sensível: **oxacilina e ecocardiograma transtorácico**. {q-famerp2022-049}` },
        { id: "dx-cultura-negativa", titulo: "Endocardite com cultura negativa", conferir: true, diretrizes: ["esc-endocardite"],
          questoes: ["q-tp20252-092","q-gdendocardite-011","q-gdendocardite-060","q-sirio2027-016"],
          prosa: `[[A causa mais comum de hemocultura negativa é antibiótico dado antes da coleta. Sem isso, pensa-se em germes que não crescem nos meios comuns: *Coxiella burnetii* (febre Q: contato com cabra, ovelha, gado), *Bartonella* (gato, moradores de rua com piolho), *Brucella* (leite cru, criação), que se diagnosticam por sorologia ou PCR, e o grupo HACEK (bacilos Gram-negativos da boca, de crescimento lento), que hoje a cultura automatizada costuma achar. O esquema empírico com ampicilina, gentamicina e vancomicina não cobre bem o HACEK, que produz betalactamase: a ceftriaxona cobre.|q-tp20252-092,q-gdendocardite-011,q-gdendocardite-060,q-sirio2027-016]]`,
          texto: `- Contato com cabras e hemoculturas negativas: **sorologias para *Coxiella*, *Bartonella* e *Brucella***. {q-tp20252-092}
- Cultura negativa: **suspeitar de HACEK**. {q-gdendocardite-011}
- Não coberto por ampicilina + gentamicina + vancomicina: **HACEK**. {q-gdendocardite-060}
- Pedreiro com febre de 5 semanas e culturas negativas: **infecção intravascular de cultura negativa**. {q-sirio2027-016}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento",
      introducao: `[[A bactéria dentro da vegetação está em densidade enorme, quieta (crescendo devagar) e longe dos neutrófilos: só cura antibiótico bactericida, venoso, em dose alta e por muito tempo (em geral 4 semanas na valva nativa e 6 na prótese, variando com o germe e o esquema: 2 semanas no estreptococo sensível com aminoglicosídeo). Na prótese há biofilme, e a rifampicina é a droga que alcança o estafilococo aderido ao material.|q-gdendocardite-019,q-gdendocardite-002,q-gdantibioticos-002]]`,
      fragmentos: [
        { id: "tto-estreptococo", titulo: "Estreptococo e empírico da valva nativa", conferir: true, diretrizes: ["esc-endocardite"],
          questoes: ["q-tp20231-003","q-einstein2027-013","q-gdendocardite-001","q-gdendocardite-019","q-gdendocardite-050","q-gdantibioticos-072","q-gdendocardite-060"],
          prosa: `[[O estreptococo sensível à penicilina trata-se com penicilina G cristalina ou ceftriaxona (2 g ao dia, cômoda e sem toxicidade renal) por 4 semanas; o aminoglicosídeo pode encurtar o curso para 2 semanas na valva nativa sem complicação, mas pesa no rim. Escolhe-se o aminoglicosídeo a que o germe é sensível.|q-einstein2027-013,q-gdendocardite-001,q-gdendocardite-019,q-gdendocardite-050]] [[O empírico da endocardite subaguda comunitária em valva nativa cobre estreptococo e enterococo (penicilina ou ampicilina com gentamicina); na aguda ou com risco de estafilococo, entra o antiestafilocócico (a ESC 2023 já cobre o estafilococo no empírico comunitário).|q-tp20231-003,q-gdendocardite-060]] [[Urticária depois da primeira dose de penicilina: troca-se por vancomicina (a cefalosporina tem reação cruzada pequena, mas não se arrisca na alergia imediata).|q-gdantibioticos-072]]`,
          texto: `- Coco Gram-positivo com dentes ruins e vegetação: **penicilina cristalina e gentamicina** (empírico da prova). {q-tp20231-003}
- *S. mitis* após dente: **ceftriaxona**. {q-einstein2027-013}
- Viridans sensível à penicilina e à amicacina: **penicilina G cristalina + amicacina**. {q-gdendocardite-001}
- Prótese mecânica por viridans: **ceftriaxona 2 g/dia por 6 semanas**. {q-gdendocardite-019}
- *S. bovis* com creatinina 2,2: **penicilina ou ceftriaxona por 4 semanas**, sem aminoglicosídeo. {q-gdendocardite-050}
- Urticária com penicilina: **vancomicina**. {q-gdantibioticos-072}` },
        { id: "tto-estafilococo", titulo: "Estafilococo, cateter e prótese", conferir: true, diretrizes: ["esc-endocardite"],
          questoes: ["q-gdendocardite-002","q-gdantibioticos-002","q-gdendocardite-009","q-gdendocardite-031","q-gdendocardite-026","q-gdendocardite-033","q-gdendocardite-040","q-sirio2024-020","q-usprp2027-033","q-scmsp2023-001","q-famerp2022-049"],
          prosa: `[[*S. aureus* sensível à oxacilina: oxacilina (ou cefazolina), que mata mais rápido que a vancomicina; MRSA: vancomicina ou daptomicina. A penicilina não serve, porque quase todo *S. aureus* tem penicilinase.|q-gdendocardite-026,q-gdendocardite-040,q-gdendocardite-033,q-famerp2022-049]] [[Na prótese o empírico é vancomicina com gentamicina e rifampicina (cobre estafilococo coagulase-negativo, quase sempre resistente à oxacilina); a rifampicina entra depois de o sangue negativar, para não selecionar resistência.|q-gdendocardite-009,q-gdendocardite-031,q-gdendocardite-002,q-gdantibioticos-002]] [[Na infecção de cateter de diálise com endocardite, tira-se o cateter (é o foco) e completa-se o tempo de tratamento no hospital; o empírico do dialítico com êmbolos pulmonares cobre *S. aureus* resistente e Gram-negativo do ambiente (vancomicina com ceftazidima).|q-sirio2024-020,q-usprp2027-033,q-scmsp2023-001]]`,
          texto: `- Prótese por *S. aureus*: **rifampicina** pelo biofilme. {q-gdendocardite-002,q-gdantibioticos-002}
- Prótese com deiscência: **vancomicina, gentamicina e rifampicina**. {q-gdendocardite-009}
- *S. epidermidis* na prótese: **vancomicina**. {q-gdendocardite-031}
- Tricúspide em usuário de drogas: **oxacilina** (vancomicina se risco de MRSA). {q-gdendocardite-026}
- Falso: *S. aureus* com **penicilina + gentamicina**. {q-gdendocardite-033}
- Endocardite por MSSA: **oxacilina**. {q-gdendocardite-040}
- Cateter de diálise com vegetação: **mais 7 dias no hospital e trocar o cateter**. {q-sirio2024-020}
- Dialítico com pneumatoceles e Osler: **ceftazidima + vancomicina**. {q-usprp2027-033}` },
        { id: "tto-complicacoes", titulo: "Complicações e cirurgia", conferir: true, diretrizes: ["esc-endocardite"],
          casos: ["q-famerp2026-064"],
          questoes: ["q-famerp2026-064","q-fmabc2024-017","q-gdendocardite-049","q-gdendocardite-061","q-gdendocardite-014"],
          prosa: `[[A cirurgia entra por três motivos: insuficiência cardíaca por destruição valvar (regurgitação aguda grave), infecção que o antibiótico não controla (abscesso perivalvar, fístula, bacteremia que persiste, fungo ou germe multirresistente) e prevenção de embolia (vegetação grande, sobretudo acima de 10 mm com embolia). *S. aureus* sozinho não é indicação absoluta: na valva nativa sem complicação o antibiótico cura.|q-gdendocardite-049,q-fmabc2024-017]] [[O abscesso da raiz aórtica cresce para o septo e corta o sistema de condução: bloqueio atrioventricular novo na endocardite aórtica é abscesso até prova em contrário e pede marcapasso temporário e cirurgia de urgência.|q-famerp2026-064]] [[Anticoagulante e antiagregante não previnem a embolia da endocardite e aumentam o sangramento cerebral; não se anticoagula pela endocardite (nem na tricúspide).|q-gdendocardite-061]]`,
          texto: `- Bradicardia e BAVT em endocardite mitral/aórtica: **abscesso; marcapasso temporário e cirurgia**. {q-famerp2026-064}
- *S. aureus* em valva nativa com vegetação de 0,5 cm: **antibiótico costuma curar**. {q-fmabc2024-017}
- Indicações de cirurgia: **insuficiência cardíaca, infecção não controlada, embolia**. {q-gdendocardite-049}
- Falso: **anticoagular** a endocardite tricúspide. {q-gdendocardite-061}
- Êmbolo durante tratamento eficaz **não** é falha por si. {q-gdendocardite-014}` },
      ],
    },
    {
      id: "profilaxia", titulo: "Profilaxia",
      introducao: `[[A bacteremia que causa endocardite vem muito mais da escovação e da mastigação do dia a dia que de um procedimento isolado: por isso a profilaxia antibiótica ficou restrita a quem teria a pior evolução, e a higiene bucal é a principal prevenção.|q-gdendocardite-057,q-gdendocardite-062,q-famerp2025-013]]`,
      fragmentos: [
        { id: "pro-quem", titulo: "Quem recebe e em quais procedimentos", conferir: true, diretrizes: ["aha-profilaxia","esc-endocardite"],
          questoes: ["q-gdendocardite-003","q-gdendocardite-004","q-gdendocardite-043","q-gdendocardite-057","q-gdendocardite-062","q-famerp2025-013","q-gdendocardite-012","q-gdendocardite-036"],
          prosa: `[[Recebem profilaxia só os de alto risco: prótese valvar (ou material protético de reparo), endocardite prévia, cardiopatia congênita cianótica não corrigida ou corrigida com material e defeito residual (e nos primeiros 6 meses após a correção com material). Prolapso mitral, valvopatia reumática, CIV corrigida há anos, revascularização e marcapasso não recebem.|q-gdendocardite-003,q-gdendocardite-004,q-gdendocardite-057,q-gdendocardite-062,q-famerp2025-013,q-gdendocardite-036]] [[O procedimento de risco é o dentário que manipula gengiva ou região periapical ou perfura a mucosa (extração, tratamento de canal, raspagem, limpeza com sangramento), e os da via respiratória com incisão de mucosa (amigdalectomia); endoscopia digestiva e urológica não pedem profilaxia para endocardite.|q-gdendocardite-043,q-gdendocardite-012,q-gdendocardite-003]]`,
          texto: `- Prótese aórtica antes de cirurgia de traqueia: **profilaxia**. {q-gdendocardite-003}
- Só a **prótese metálica** (não a estenose reumática nem a CIV operada há 2 anos). {q-gdendocardite-004}
- Endocardite prévia e limpeza dentária: **profilaxia**. {q-gdendocardite-043}
- Prolapso mitral: só com **endocardite prévia**. {q-gdendocardite-057}
- Alto risco: **endocardite prévia**. {q-gdendocardite-062}
- Prolapso sem regurgitação, alérgica: **sem profilaxia**. {q-famerp2025-013}
- Prótese biológica e amigdalectomia: **amoxicilina 2 g dose única**. {q-gdendocardite-012}
- Cardiopatia cianótica e extração: **amoxicilina**. {q-gdendocardite-036}` },
        { id: "pro-esquema", titulo: "O esquema", conferir: true, diretrizes: ["aha-profilaxia"],
          questoes: ["q-unesp2023-054","q-famema2023-030","q-sessp2022-013","q-gdendocardite-024","q-gdendocardite-018","q-gdendocardite-012","q-gdendocardite-036"],
          prosa: `[[O alvo é o estreptococo viridans da boca: dose única de amoxicilina 2 g por via oral, 30 a 60 minutos antes, para que o nível esteja alto no momento da bacteremia. Sem via oral, ampicilina ou ceftriaxona; na alergia à penicilina, a AHA 2021 indica azitromicina, claritromicina ou doxiciclina (e cefalexina se a alergia não for grave) e deixou de recomendar a clindamicina, pelos efeitos adversos.|q-unesp2023-054,q-famema2023-030,q-sessp2022-013,q-gdendocardite-024,q-gdendocardite-012,q-gdendocardite-036,q-gdendocardite-018]]`,
          texto: `- Droga de escolha: **amoxicilina**. {q-unesp2023-054,q-gdendocardite-036}
- **Amoxicilina oral uma hora antes**. {q-famema2023-030}
- AHA: **amoxicilina 2 g, dose única**. {q-sessp2022-013,q-gdendocardite-024,q-gdendocardite-012}
- Alergia à penicilina com prótese (a prova): **clindamicina 600 mg**. {q-gdendocardite-018}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["aha-profilaxia","esc-endocardite"],
          questoes: ["q-gdendocardite-018","q-famerp2025-013","q-tp20231-003","q-gdendocardite-001","q-gdendocardite-063","q-gdendocardite-010","q-gdendocardite-033"],
          prosa: `[[**Alergia na profilaxia**: a AHA 2021 tirou a clindamicina e usa azitromicina, claritromicina ou doxiciclina; a prova (gdendocardite-018) deu clindamicina 600 mg uma hora antes, e a famerp2025-013 trouxe clindamicina como distrator num caso sem indicação.|q-gdendocardite-018,q-famerp2025-013]] [[**Empírico da valva nativa**: a ESC 2023 usa ampicilina com oxacilina (ou cefazolina), com ou sem gentamicina, para cobrir estreptococo, enterococo e *S. aureus*; a prova (tp20231-003) deu penicilina cristalina com gentamicina, que cobre estreptococo e enterococo mas deixa o estafilococo descoberto.|q-tp20231-003]] [[**Aminoglicosídeo no estreptococo**: a regra é usar o aminoglicosídeo a que a cepa é sensível, ou dispensá-lo; na gdendocardite-001 a gentamicina "intermediária" levou à amicacina, embora o sinergismo clássico seja medido com gentamicina.|q-gdendocardite-001]] [[**Maior × menor**: regurgitação nova e deiscência de prótese são maiores; embolia e glomerulonefrite são menores (gdendocardite-063). Roth é imunológico e Janeway é vascular (gdendocardite-010).|q-gdendocardite-063,q-gdendocardite-010]] [[**Penicilina no *S. aureus***: tratar *S. aureus* com penicilina e gentamicina é o erro (gdendocardite-033), pela penicilinase.|q-gdendocardite-033]]`,
          texto: `- Regra AHA 2021: alergia → azitromicina, claritromicina ou doxiciclina; a prova deu **clindamicina**. {q-gdendocardite-018,q-famerp2025-013}
- Regra ESC 2023: empírico com antiestafilocócico; a prova deu **penicilina + gentamicina**. {q-tp20231-003}
- Aminoglicosídeo conforme a sensibilidade: a prova trocou por **amicacina**. {q-gdendocardite-001}
- Embolia e glomerulonefrite são **menores**; Roth imunológico, Janeway vascular. {q-gdendocardite-063,q-gdendocardite-010}
- *S. aureus* **não** se trata com penicilina. {q-gdendocardite-033}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: as formas de endocardite",
      introducao: `Resumo do capítulo de agentes, para comparar as formas que as provas fazem diferenciar.`,
      fragmentos: [
        { id: "cmp-formas", titulo: "Aguda, subaguda, usuário de drogas e prótese", conferir: true,
          questoes: ["q-gdendocardite-013","q-gdendocardite-035","q-gdendocardite-042","q-gdendocardite-039","q-gdendocardite-046","q-gdendocardite-059"],
          prosa: `[[O tempo de doença e o terreno apontam o agente.|q-gdendocardite-013,q-gdendocardite-035,q-gdendocardite-042,q-gdendocardite-039,q-gdendocardite-046,q-gdendocardite-059]]

| Forma | Terreno | Agente | Curso | Valva |
|---|---|---|---|---|
| Aguda | qualquer valva, pele, cateter | *S. aureus* | dias, toxemia, destruição | mitral ou aórtica |
| Subaguda | valva lesada, dente | estreptococo viridans | semanas, febre baixa, emagrecimento | mitral ou aórtica |
| Usuário de drogas | agulha | *S. aureus* | aguda, êmbolos pulmonares | tricúspide |
| Prótese precoce (até 12 meses) | infecção hospitalar | coagulase-negativo, *S. aureus*, Gram-negativo | variável | prótese |
| Prótese tardia (após 1 ano) | como na nativa | estreptococo | subagudo | prótese |
| Cólon | pólipo ou câncer | *S. gallolyticus* | subagudo | mitral ou aórtica |`,
          texto: `- Aguda sem valvopatia: ***S. aureus***. {q-gdendocardite-013,q-gdendocardite-035}
- Usuário de drogas: ***S. aureus*, tricúspide**. {q-gdendocardite-042}
- Prótese tardia: **estreptococo**; precoce: **coagulase-negativo** (não viridans). {q-gdendocardite-039,q-gdendocardite-046,q-gdendocardite-059}` },
      ],
    },
  ],
});
