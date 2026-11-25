/* resumos/ortopedia/resumo.js — resumo adaptativo de ortopedia não traumática e esportiva: infecções
   osteoarticulares (artrite séptica, osteomielite, espondilodiscite), lombalgia e hérnia de disco
   (sinais de alarme, cauda equina, raízes), osteoartrite e osteonecrose, joelho (LCA, LCP, menisco,
   colateral) e ombro (manguito rotador, capsulite, luxação). Assuntos: ass-orto-infeccoes (principal),
   ass-orto-coluna, ass-orto-artrose, ass-orto-ombro.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- ortopedia */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "ortopedia",
  titulo: "Ortopedia: infecções, coluna, artrose e lesões do esporte",
  assunto: "ass-orto-infeccoes",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "nice-lombalgia", texto: "NICE NG59 — Low back pain and sciatica in over 16s (2016, atualizada 2020); ACP 2017 — tratamento não invasivo da lombalgia", lidoEm: null },
    { id: "oarsi", texto: "OARSI 2019 e ACR 2019 — tratamento da osteoartrite de joelho, quadril e mão", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "infeccoes", titulo: "Infecções osteoarticulares",
      introducao: `[[Na criança, a bactéria chega ao osso **pelo sangue** e se instala na **metáfise** dos ossos longos, onde os capilares fazem alças lentas; nos menores de 1–2 anos, vasos atravessam a fise e a infecção passa para a articulação. O agente mais comum em todas as idades é o ***Staphylococcus aureus***; no **neonato**, **estreptococo do grupo B e gram-negativos**; na criança **não vacinada**, ***Haemophilus influenzae* b**; na **doença falciforme**, ***Salmonella*** além do estafilococo; no jovem sexualmente ativo, o **gonococo**.|q-unifesp2022-061,q-unicamp2022-045,q-unifesp2023-078,q-adap24-027]] [[A cartilagem é destruída em dias pelas enzimas dos neutrófilos: **artrite séptica é urgência cirúrgica**.|q-adap22-061,q-unesp2023-044]]

Veja também: **Artrites** (gota e monoartrite aguda), **Fraturas**, **Ortopedia pediátrica** (quadril da criança), **Doença falciforme** e **Neurologia** (coluna e raízes no exame neurológico).`,
      fragmentos: [
        { id: "inf-artrite-septica", titulo: "Artrite séptica", conferir: true,
          questoes: ["q-adap22-061","q-unesp2021-013","q-usp2022-043","q-unesp2023-044","q-unesp2025-051","q-usp2025-095","q-adap24-027","q-einstein2027-029","q-unifesp2022-061","q-unicamp2022-045"],
          prosa: `[[Febre, **articulação quente e dolorosa a qualquer movimento**, recusa a apoiar; no quadril da criança, o membro fica em **flexão, abdução e rotação externa** (posição de maior volume da cápsula). Conduta: **punção articular** (Gram, cultura, celularidade, cristais), hemoculturas, **antibiótico venoso logo após a coleta** e **drenagem cirúrgica/lavagem** — a do quadril é urgente. Empírico: cobrir *S. aureus* (**oxacilina**; associar ceftriaxona na criança pequena e no idoso com fonte incerta).|q-adap22-061,q-unesp2021-013,q-usp2022-043,q-unesp2023-044,q-unesp2025-051,q-usp2025-095]] [[Jovem com **poliartralgia migratória**, tenossinovite e depois monoartrite: **gonococo** — **ceftriaxona** e lavagem. Ferida no dorso da mão depois de **soco na boca** de alguém: tratar como **mordedura humana** (anaeróbios, *Eikenella*: amoxicilina-clavulanato) e lavar.|q-adap24-027,q-einstein2027-029]]`,
          texto: `- Febre + articulação imóvel e dolorosa: **punção, antibiótico IV e drenagem**. {q-adap22-061,q-unesp2021-013,q-usp2022-043,q-unesp2023-044,q-unesp2025-051}
- Adulto: limpeza cirúrgica + **oxacilina**. {q-usp2025-095}
- Jovem com poliartralgia migratória: **gonococo** → ceftriaxona e lavagem. {q-adap24-027}
- Soco na boca: flora de **mordedura humana**. {q-einstein2027-029}
- Neonato: **GBS e gram-negativos**; não vacinado: ***H. influenzae* b**. {q-unifesp2022-061,q-unicamp2022-045}` },
        { id: "inf-osteomielite", titulo: "Osteomielite e espondilodiscite", conferir: true,
          questoes: ["q-uspsp2-057","q-adap23-078","q-famerp2022-029","q-unifesp2023-078","q-amrigs2021-016","q-sessp2023-069","q-unicampdis2025-071","q-usprp2026-059","q-unicamp2023-003"],
          prosa: `[[Criança com febre e **dor localizada no osso** (metáfise), recusa a apoiar, às vezes dias depois de um trauma banal: **osteomielite aguda** — hemoculturas e **antibiótico venoso empírico** contra estafilococo (**oxacilina**). A radiografia só mostra alteração depois de **10 a 14 dias**; a **ressonância** vê cedo o edema medular e a coleção subperiosteal. No diabético com ferida prévia no pé e radiografia normal, também se pede **ressonância**.|q-uspsp2-057,q-adap23-078,q-famerp2022-029,q-amrigs2021-016]] [[Osteomielite depois de **fratura exposta operada**: estafilococo (**oxacilina**). Perfuração **plantar por prego** (através do tênis): ***Pseudomonas*** — antibiótico antipseudomonas e desbridamento. Falciforme com dor óssea que não cede, febre: osteomielite por **estafilococo e *Salmonella***.|q-sessp2023-069,q-unicampdis2025-071,q-unifesp2023-078]] [[Criança pequena que **recusa a andar**, pede colo, febre baixa por semanas: **espondilodiscite** (disco e dois corpos vertebrais na ressonância). Adulto que **usa droga injetável** com lombalgia e febre: **abscesso epidural/espondilodiscite** → **ressonância**.|q-usprp2026-059,q-unicamp2023-003]]`,
          texto: `- Febre + dor óssea: **osteomielite** → hemocultura + **oxacilina**. {q-uspsp2-057,q-famerp2022-029}
- Exame precoce: **ressonância** (raio X tarda 10–14 dias). {q-adap23-078,q-amrigs2021-016}
- Pós-fratura exposta: **oxacilina**; prego no pé: ***Pseudomonas***; falciforme: **S. aureus e Salmonella**. {q-sessp2023-069,q-unicampdis2025-071,q-unifesp2023-078}
- Criança que recusa andar: **espondilodiscite**; usuário de droga com lombalgia febril: **RM**. {q-usprp2026-059,q-unicamp2023-003}` },
      ],
    },
    {
      id: "coluna", titulo: "Lombalgia e hérnia de disco",
      introducao: `[[Mais de 90% das lombalgias são **mecânicas inespecíficas** (músculo, ligamento, faceta, disco) e melhoram em semanas. O trabalho é procurar os **sinais de alarme**: **febre, câncer prévio, perda de peso, uso de droga injetável ou imunossupressão** (infecção, metástase), **trauma** importante ou osteoporose (fratura), dor noturna em repouso, idade acima de 50 com dor nova, e **déficit neurológico progressivo ou síndrome da cauda equina**. Sem alarme, **não se pede imagem nas primeiras 6 semanas**: achados degenerativos são comuns em quem não tem dor e levam a tratamentos inúteis.|q-sessp2024-095,q-usprp2023-049,q-einstein2027-072,q-usp2022-016]]`,
      fragmentos: [
        { id: "col-mecanica", titulo: "Lombalgia mecânica: orientar e manter ativo", conferir: true, diretrizes: ["nice-lombalgia"],
          questoes: ["q-sessp2024-095","q-usprp2023-049","q-uspsp5-082","q-sirio2027-095","q-tp20231-064","q-einstein2027-072","q-usp2026-039","q-fmabc2025-091","q-iamspe2023-018"],
          prosa: `[[Tratamento: explicar o **bom prognóstico**, **manter-se ativo** (repouso no leito piora), **calor local**, **AINE ou analgésico simples** por pouco tempo, reservando opioide para a dor refratária; retorno se não melhorar ou surgir sinal novo. Na dor crônica com ressonância "degenerativa", **não atribuir a dor à imagem**: educação, exercício e abordagem dos fatores psicossociais. O que mais prediz **cronificação** é **dor intensa com incapacidade** no início, junto de fatores emocionais e ocupacionais.|q-sessp2024-095,q-usprp2023-049,q-uspsp5-082,q-sirio2027-095,q-tp20231-064,q-einstein2027-072,q-usp2026-039]] [[Banda tensa no trapézio cuja pressão reproduz a dor e causa cefaleia referida: **síndrome miofascial**, tratada com alongamento e **inativação do ponto-gatilho** (agulhamento seco). A **fratura do enforcado** (pedículos de C2) costuma ter **bom prognóstico** neurológico, porque alarga o canal.|q-fmabc2025-091,q-iamspe2023-018]]`,
          texto: `- Sem alarme: **sem imagem nas primeiras 6 semanas**. {q-sessp2024-095,q-usprp2023-049}
- Analgesia simples, **manter-se ativo**, calor; opioide só se refratária. {q-uspsp5-082,q-sirio2027-095,q-tp20231-064}
- Crônica: **não culpar a ressonância**; educação e exercício. {q-einstein2027-072}
- Cronificação: **dor intensa com incapacidade**. {q-usp2026-039}
- Ponto-gatilho: **agulhamento seco**. {q-fmabc2025-091}
- Fratura do enforcado: **bom prognóstico**. {q-iamspe2023-018}` },
        { id: "col-hernia", titulo: "Hérnia de disco, raízes e cauda equina", conferir: true, diretrizes: ["nice-lombalgia"],
          questoes: ["q-usprp2022-023","q-unifesp2026-061","q-usprp2023-095","q-usprp2024-020","q-adap26-061","q-usp2022-016"],
          prosa: `[[A hérnia lombar (L4-L5, L5-S1) comprime a raiz de baixo e dá **dor ciática** que desce abaixo do joelho. **L5**: fraqueza para **estender o hálux** e fazer a **dorsiflexão** do pé, hipoestesia no dorso do pé; **S1**: flexão plantar e reflexo aquileu; **L4**: reflexo patelar e face medial da perna. Sem déficit progressivo, o tratamento é **conservador** (a maioria regride em semanas); a ressonância confirma quando se pensa em cirurgia.|q-usprp2022-023,q-unifesp2026-061,q-usprp2023-095,q-usprp2024-020]] [[**Síndrome da cauda equina**: **anestesia em sela** (nádegas, períneo, face interna das coxas), **retenção urinária** ou incontinência, fraqueza bilateral: **ressonância de urgência e descompressão cirúrgica em até 24–48 horas**.|q-adap26-061,q-usp2022-016]]`,
          texto: `- Hérnia sem déficit: **conservador**; RM mostra a extrusão. {q-usprp2022-023,q-unifesp2026-061}
- L5: **extensão do hálux, dorsiflexão**. {q-usprp2023-095,q-usprp2024-020}
- Anestesia em sela + retenção: **cauda equina** → RM e **descompressão urgente**. {q-adap26-061,q-usp2022-016}` },
      ],
    },
    {
      id: "artrose", titulo: "Osteoartrite e osteonecrose",
      introducao: `[[A osteoartrite é a falência da **cartilagem** e do osso subcondral, com inflamação de baixo grau: a cartilagem afina, o osso embaixo engrossa (**esclerose subcondral**), cria **osteófitos** e cistos, e o espaço articular diminui de forma **assimétrica**. Fatores: idade, **obesidade**, sobrecarga ocupacional, trauma prévio. A dor é **mecânica**: piora com o uso e ao fim do dia, melhora com repouso, **rigidez matinal curta** (menos de 30 minutos), crepitação; nas mãos, **nódulos de Heberden (interfalângicas distais) e Bouchard (proximais)**.|q-usprp2025-079,q-uspsp1-068,q-tp20222-033,q-uspsp2-018,q-usprp2026-099,q-tp20232-015]]`,
      fragmentos: [
        { id: "oa-diagnostico", titulo: "Diagnóstico e líquido sinovial", conferir: true, diretrizes: ["oarsi"],
          questoes: ["q-usprp2025-079","q-uspsp1-068","q-tp20222-033","q-uspsp2-018","q-usprp2026-099","q-usp2023-101","q-usprp2024-058","q-famema2023-032","q-fmabc2022-019","q-unesp2022-077"],
          prosa: `[[O líquido da osteoartrite é **não inflamatório**: claro, amarelo, **viscosidade alta**, **menos de 2.000 leucócitos/mm³** com **menos de 50% de neutrófilos** e sem cristais (inflamatório tem 2.000 a 50.000; séptico, mais de 50.000, quase todo neutrófilo).|q-usp2023-101,q-usprp2024-058,q-famema2023-032,q-fmabc2022-019]] [[Dor no quadril em **etilista** jovem (ou usuário de corticoide, falciforme): **osteonecrose da cabeça femoral** — a ressonância vê antes da radiografia.|q-unesp2022-077]]`,
          texto: `- Dor mecânica, esclerose subcondral, IFD e IFP: **osteoartrite**. {q-usprp2025-079,q-uspsp1-068,q-tp20222-033,q-uspsp2-018,q-usprp2026-099}
- Líquido: **claro, viscoso, < 2.000 leucócitos, < 50% PMN**. {q-usp2023-101,q-usprp2024-058,q-famema2023-032,q-fmabc2022-019}
- Etilista com dor nos quadris: **osteonecrose**. {q-unesp2022-077}` },
        { id: "oa-tratamento", titulo: "Tratamento: exercício, peso e prótese", conferir: true, diretrizes: ["oarsi"],
          questoes: ["q-tp20232-015","q-tp20241-005","q-einstein2026-062","q-einstein2027-022","q-adap24-065","q-unifesp2024-020"],
          prosa: `[[A base é **exercício de fortalecimento** e **perda de peso** (cada quilo a menos tira várias vezes esse peso do joelho), com **AINE tópico** como primeira linha no joelho e na mão (menos efeito sistêmico, útil no idoso e no hipertenso), AINE oral por períodos curtos se preciso; reavaliar em semanas. Quando a dor e a limitação persistem apesar disso, com dano radiográfico avançado: **artroplastia total** (quadril, joelho).|q-tp20232-015,q-tp20241-005,q-einstein2026-062,q-einstein2027-022,q-adap24-065,q-unifesp2024-020]]`,
          texto: `- **Fortalecimento + perda de peso**; AINE tópico/oral. {q-tp20232-015,q-tp20241-005,q-einstein2026-062,q-einstein2027-022}
- Quadril com limitação apesar do clínico: **artroplastia total**. {q-adap24-065,q-unifesp2024-020}` },
      ],
    },
    {
      id: "esporte", titulo: "Joelho e ombro",
      introducao: `[[As lesões do esporte se reconhecem pelo **mecanismo**. **Torção sem contato** com estalo e derrame em horas (hemartrose) = **ligamento cruzado anterior**. **Trauma direto na tíbia** com o joelho fletido (painel do carro) = **cruzado posterior**. **Valgo** (golpe na face lateral com o pé fixo) = **colateral medial**. **Torção com dor na interlinha** e bloqueio = **menisco**.|q-adap25-020,q-unifesp2025-020,q-didepm-077,q-adap21-017]]`,
      fragmentos: [
        { id: "esp-joelho", titulo: "Ligamentos e meniscos", conferir: true,
          questoes: ["q-adap25-020","q-usprp2021-017","q-unifesp2025-020","q-didepm-077","q-adap21-017","q-scmsp2023-023","q-tp20222-008"],
          prosa: `[[O teste mais sensível para o **LCA** é o de **Lachman** (joelho a 20–30°, puxar a tíbia para a frente); a gaveta posterior testa o **LCP**. **Colateral medial grau II** trata-se sem cirurgia: **órtese articulada e fisioterapia**, volta em 4 a 6 semanas. **Menisco** com **bloqueio** mecânico: ressonância e **artroscopia**; a sutura funciona na lesão **longitudinal na zona vermelha-vermelha** (periférica, vascularizada) do jovem, de preferência junto com a reconstrução do LCA.|q-adap25-020,q-usprp2021-017,q-unifesp2025-020,q-didepm-077,q-adap21-017,q-scmsp2023-023]] [[O AINE da entorse alivia dor e edema **inibindo a ciclo-oxigenase** e a síntese de prostaglandinas.|q-tp20222-008]]`,
          texto: `- LCA: **Lachman**; LCP: trauma no painel. {q-adap25-020,q-usprp2021-017,q-unifesp2025-020}
- Colateral medial grau II: **órtese e fisioterapia**. {q-didepm-077}
- Menisco com bloqueio: **artroscopia**; sutura na **zona vermelha-vermelha**. {q-adap21-017,q-scmsp2023-023}
- AINE: **inibe a COX**. {q-tp20222-008}` },
        { id: "esp-ombro", titulo: "Manguito rotador, capsulite e luxação", conferir: true,
          questoes: ["q-tp20212-068","q-unesp2022-057","q-tp20202-073","q-unifesp2026-021","q-didepm-097","q-adap26-021"],
          prosa: `[[**Doença do manguito rotador**: dor anterolateral do ombro que **piora ao elevar e abduzir o braço** (trabalho acima da cabeça), dor noturna. O **supraespinhal** abduz (o mais lesado), o **infraespinhal** faz **rotação lateral**, o subescapular, a medial. Tratamento: **fisioterapia, AINE e evitar sobrecarga acima do ombro**; ruptura traumática no jovem ou falha, cirurgia.|q-tp20212-068,q-unesp2022-057,q-tp20202-073,q-unifesp2026-021]] [[**Capsulite adesiva** ("ombro congelado"): dor e **perda de movimento ativo e passivo em todas as direções**, típica da mulher diabética; fisioterapia, analgesia e **infiltração de corticoide**. Na **luxação anterior** (queda com o braço em abdução e rotação externa), antes e depois de reduzir, testar o **nervo axilar** (sensibilidade da face lateral do ombro, contração do deltoide).|q-didepm-097,q-adap26-021]]`,
          texto: `- Dor ao abduzir, trabalho acima da cabeça: **manguito** → fisioterapia, AINE. {q-tp20212-068,q-unesp2022-057}
- Fraqueza na abdução: **supraespinhal**; na rotação lateral: **infraespinhal**. {q-tp20202-073,q-unifesp2026-021}
- Diabética com perda global do movimento: **capsulite adesiva**. {q-didepm-097}
- Luxação anterior: testar o **nervo axilar**. {q-adap26-021}` },
      ],
    },
  ],
});
