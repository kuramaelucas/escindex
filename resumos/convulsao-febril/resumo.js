/* resumos/convulsao-febril/resumo.js — resumo adaptativo de convulsão febril: definição, simples ×
   complexa, quando investigar (punção lombar), recorrência, orientação aos pais e o que fazer na crise
   (benzodiazepínico, estado de mal). Molde e regras: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- convulsao-febril */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "convulsao-febril",
  titulo: "Convulsão febril",
  assunto: "ass-convulsaofebril",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "aap-crise-febril", texto: "American Academy of Pediatrics — Febrile Seizures: Guideline for the Neurodiagnostic Evaluation of the Child With a Simple Febrile Seizure (2011)", lidoEm: null },
    { id: "sbp-crise-febril", texto: "Sociedade Brasileira de Pediatria — Crise febril (documento científico)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "definicao", titulo: "O que é e por que acontece",
      introducao: `[[A convulsão febril é a crise convulsiva mais comum da infância: acontece entre 6 meses e 5 anos, com febre, sem infecção do sistema nervoso central e sem crise sem febre antes.|q-amrigs2020-074,q-amrigs2024-078,q-scmsp2025-058]] [[O cérebro imaturo tem um limiar de crise mais baixo, que a subida rápida da temperatura e as citocinas da infecção ultrapassam; há forte componente familiar.|q-uspsp1-001,q-fmabc2021-081]]

[[A crise simples é generalizada, dura menos de 15 minutos e não se repete em 24 horas; basta uma dessas condições falhar (crise focal, longa ou repetida) para ela ser complexa.|q-amrigs2024-078,q-usp2023-093,q-sirio2023-060]] [[O diagnóstico é clínico: a criança que acorda bem, sem sinais meníngeos, não precisa de eletroencefalograma, neuroimagem nem anticonvulsivante.|q-amrigs2021-076,q-017,q-tp20252-087]]`,
      fragmentos: [
        { id: "def-simples", titulo: "Simples × complexa", conferir: true, diretrizes: ["aap-crise-febril","sbp-crise-febril"],
          questoes: ["q-amrigs2020-074","q-amrigs2024-078","q-scmsp2025-058","q-amrigs2021-076","q-usp2023-093","q-sirio2023-060","q-sessp2026-044"],
          prosa: `| | Simples | Complexa |
|---|---|---|
| Tipo de crise | **generalizada** | **focal** |
| Duração | **< 15 minutos** | **≥ 15 minutos** |
| Repetição | **uma** em 24 horas | **mais de uma** em 24 horas |
| Depois da crise | volta ao normal | sonolência prolongada ou déficit |`,
          texto: `- Crise convulsiva mais comum da infância: **crise febril**. {q-amrigs2020-074}
- Simples: **generalizada, < 15 minutos, sem recorrência em 24 h**, sem infecção do SNC e sem déficit. {q-amrigs2024-078,q-scmsp2025-058,q-usp2023-093}
- Diagnóstico **clínico**. {q-amrigs2021-076}
- Crise de **20 minutos** no lactente: **complexa** e pede investigação. {q-sirio2023-060}
- Crises com febre que continuam **depois dos 5 anos**, prolongadas: pensar em **epilepsia** (o gabarito indica valproato até a avaliação neurológica). {q-sessp2026-044}` },
      ],
    },
    {
      id: "conduta", titulo: "O que investigar e o que dizer aos pais",
      introducao: `[[Na crise simples, o que se investiga é a causa da febre, não a convulsão: otite, infecção urinária, virose.|q-tp20231-040,q-udisc20262-051,q-usp2026-058]] [[A punção lombar entra quando a meningite é possível: sinais meníngeos, sonolência que não melhora, crise complexa, e no lactente de 6 a 12 meses com vacinação para Haemophilus e pneumococo incompleta ou desconhecida.|q-uspsp1-005,q-uspsp3-028,q-iamspe2026-066,q-scmsp2022-026]]

[[Os pais precisam ouvir que a crise febril é benigna e não lesa o cérebro, mas pode se repetir — cerca de um terço das crianças tem outra —, e que o antitérmico melhora o conforto mas não previne a próxima crise.|q-famema2022-092,q-uspsp1-001,q-sirio2025-041]] O risco de repetir é maior com **história familiar**, primeira crise **antes de 18 meses** e crise com **febre não muito alta**.`,
      fragmentos: [
        { id: "con-investigar", titulo: "Investigar a febre e quando puncionar", conferir: true, diretrizes: ["aap-crise-febril"],
          figuras: [{ arquivo: "figuras/quando-investigar.svg", legenda: "Esquema autoral: a criança que convulsionou com febre, da crise simples à suspeita de meningite." }],
          questoes: ["q-017","q-tp20252-087","q-tp20231-040","q-udisc20262-051","q-usp2026-058","q-sessp2023-030","q-sirio2024-059","q-famema2025-044","q-sirio2027-050","q-uspsp1-005","q-uspsp3-028","q-iamspe2026-066","q-scmsp2022-026","q-einstein2026-040"],
          texto: `- Simples, criança bem: **sem neuroimagem nem EEG**; observar, controlar a febre e orientar. {q-017,q-tp20252-087,q-famema2025-044}
- **Procurar o foco** da febre e observar. {q-tp20231-040,q-sirio2027-050}
- Foco encontrado (**otite**): tratar e dar alta após observação. {q-udisc20262-051}
- Febre sem foco no lactente: **urina tipo 1 e urocultura por sondagem**. {q-usp2026-058}
- Virose, criança bem após a crise: **alta com sintomáticos** e sinais de alarme (ou observação de algumas horas). {q-sessp2023-030,q-sirio2024-059}
- **Sonolência que não passa** após 45 minutos: **punção lombar**. {q-uspsp1-005}
- **Brudzinski positivo** com tomografia normal: **punção lombar**. {q-uspsp3-028}
- Entre **6 e 12 meses** com vacina incompleta ou desconhecida, ou que já recebia antibiótico (pode mascarar meningite): considerar punção mesmo na simples. {q-iamspe2026-066,q-scmsp2022-026}
- Febre com confusão, sonolência progressiva e **crise focal**: **meningoencefalite** com crise sintomática. {q-einstein2026-040}` },
        { id: "con-orientar", titulo: "Recorrência e orientação", conferir: true, diretrizes: ["sbp-crise-febril"],
          questoes: ["q-usprp2022-081","q-uspsp1-001","q-fmabc2021-081","q-fmabc2026-058","q-famema2022-092","q-usp2023-093","q-sirio2025-041"],
          texto: `- Fator de risco de recorrência: **história familiar** de crise febril. {q-usprp2022-081,q-fmabc2026-058}
- Primeiro episódio com pai que teve crises: **tranquilizar** e avisar que **pode repetir** com febre. {q-uspsp1-001,q-fmabc2021-081}
- Evolução **benigna**: orientar o manejo dos episódios febris. {q-famema2022-092}
- Após uma crise simples: **sem anticonvulsivante**, seguimento de rotina. {q-usp2023-093,q-sirio2025-041}` },
      ],
    },
    {
      id: "crise", titulo: "Durante a crise",
      introducao: `[[A maioria das crises febris para sozinha em poucos minutos; a que passa de 5 minutos tende a não parar e recebe benzodiazepínico, porque ele reforça a inibição GABAérgica que a crise rompeu.|q-sirio2026-052,q-sessp2026-044]] Sem acesso venoso, o **midazolam** pode ir pelo nariz ou pela boca; com acesso, **diazepam** ou midazolam na veia.`,
      fragmentos: [
        { id: "cri-benzo", titulo: "Benzodiazepínico e estado de mal", conferir: true,
          questoes: ["q-sirio2026-052","q-sessp2026-044"],
          texto: `- Crise prolongada com acesso venoso: **diazepam IV** (primeira linha). {q-sirio2026-052}
- Sem acesso: **midazolam intranasal**. {q-sessp2026-044}` },
      ],
    },
  ],
});
