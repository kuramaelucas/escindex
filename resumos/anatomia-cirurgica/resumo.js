/* resumos/anatomia-cirurgica/resumo.js — resumo adaptativo de anatomia cirúrgica cobrada nas provas:
   aorta e seus ramos, vasos do intestino e do fígado (porta, celíaco, artéria cística, Calot,
   Riolan), duodeno e retroperitônio, parede abdominal e região inguinal, pelve feminina, membros
   (nervos radial e torácico longo, canal dos adutores, poplítea) e radiografia de tórax.
   Assunto: ass-anatomiacirurgica. Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- anatomia-cirurgica */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "anatomia-cirurgica",
  titulo: "Anatomia cirúrgica",
  assunto: "ass-anatomiacirurgica",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "anatomia", texto: "Netter — Atlas de anatomia humana; Moore — Anatomia orientada para a clínica; Skandalakis — Surgical anatomy", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "dor referida do ureter: ligada no resumo de dor pélvica (dor-pelvica)", questoes: ["q-fmabc2023-024"] },
  ],
  doencas: [
    {
      id: "vasos", titulo: "Aorta, vísceras e fígado",
      introducao: `[[Do **arco aórtico** saem, nesta ordem, o **tronco braquiocefálico**, a **carótida comum esquerda** e a **subclávia esquerda**. A **aorta abdominal** dá ramos **viscerais** (tronco celíaco, mesentérica superior, renais, suprarrenais médias, gonadais e mesentérica inferior) e parietais (frênicas inferiores, lombares). A **mesentérica superior** sai à frente da aorta e passa **anterior à veia renal esquerda** — que fica presa entre as duas (pinça aortomesentérica).|q-amrigs2020-032,q-sessp2025-038,q-fmabc2026-033]]

Veja também: **Técnica operatória** (no resumo de cuidados perioperatórios), **Hérnias**, **Colecistite e coledocolitíase**, **Doenças da aorta** e **Trauma abdominal**.`,
      fragmentos: [
        { id: "vas-abdome", titulo: "Ramos da aorta, porta, vias biliares e cólon", conferir: true,
          questoes: ["q-amrigs2020-032","q-sessp2025-038","q-fmabc2026-033","q-unesp2026-075","q-sessp2026-034","q-sirio2026-036","q-fmabc2025-032","q-sirio2026-039","q-amrigs2020-022","q-famema2023-062"],
          prosa: `[[Fígado: aorta → **tronco celíaco** → **hepática comum** → **hepática própria** → **hepática direita** (segmentos V a VIII) e esquerda. A **artéria cística** nasce em geral da **hepática direita**, dentro do **triângulo de Calot** (limites: **ducto cístico, ducto hepático comum e borda inferior do fígado**), que se disseca na colecistectomia antes de cortar qualquer coisa. A **veia porta** se forma **atrás do colo do pâncreas**, da junção da **mesentérica superior com a esplênica**.|q-unesp2026-075,q-sirio2026-036,q-fmabc2025-032,q-sessp2026-034]] [[Na esplenectomia, preservar a **gastroepiploica esquerda** (e as gástricas curtas) mantém o sangue da grande curvatura. A **arcada de Riolan** liga a **cólica média** (mesentérica superior) à **cólica esquerda** (mesentérica inferior) e salva o cólon quando uma das duas fecha. O duodeno descendente se relaciona lateralmente com o **ureter e o rim direitos**.|q-sirio2026-039,q-amrigs2020-022,q-famema2023-062]]`,
          texto: `- Arco: **braquiocefálico, carótida esquerda, subclávia esquerda**; mesentérica superior **anterior à renal esquerda**. {q-amrigs2020-032,q-sessp2025-038,q-fmabc2026-033}
- Até o segmento VI: **celíaco → hepática comum → própria → direita**. {q-unesp2026-075}
- Porta: **atrás do colo do pâncreas**, mesentérica superior + esplênica. {q-sessp2026-034}
- Calot: **cístico, hepático comum, fígado**; cística da **hepática direita**. {q-sirio2026-036,q-fmabc2025-032}
- Esplenectomia: preservar a **gastroepiploica esquerda**; Riolan: **cólica média + esquerda**. {q-sirio2026-039,q-amrigs2020-022}
- Duodeno lateral ao **ureter direito**. {q-famema2023-062}` },
      ],
    },
    {
      id: "parede-membros", titulo: "Parede abdominal, pelve, membros e tórax",
      introducao: `[[A parede anterolateral do abdome tem três músculos planos em camadas: de fora para dentro, **oblíquo externo, oblíquo interno e transverso**, depois a **fáscia transversal** (parietal) e o **peritônio**. Na **região inguinal** vista por dentro (laparoscopia), os marcos são os **vasos epigástricos inferiores** (separam hérnia direta, medial, da indireta, lateral), o **ligamento inguinal** e o **trato iliopúbico**, e os vasos espermáticos e o ducto deferente entrando no anel interno.|q-tp20251-080,q-tp20261-011,q-unesp2021-066,q-unesp2022-076]]`,
      fragmentos: [
        { id: "par-abdome-pelve", titulo: "Parede, região inguinal e pelve feminina", conferir: true,
          questoes: ["q-tp20251-080","q-tp20261-011","q-unesp2021-066","q-unesp2022-076","q-amrigs2020-051","q-uspsp1-076"],
          prosa: `[[A **artéria uterina** é ramo da **ilíaca interna** e cruza **acima do ureter** ("a água passa debaixo da ponte") perto do colo — por isso o ureter corre risco na sua ligadura. Mesmo na **histerectomia subtotal**, as artérias uterinas precisam ser ligadas.|q-amrigs2020-051,q-uspsp1-076]]`,
          texto: `- Facada na parede lateral: **oblíquo externo, interno, transverso, fáscia, peritônio, omento**. {q-tp20251-080,q-tp20261-011}
- Região inguinal por dentro: **epigástricos inferiores, ligamento inguinal, trato iliopúbico**. {q-unesp2021-066,q-unesp2022-076}
- Uterina: ramo da **ilíaca interna**; ligar também na subtotal. {q-amrigs2020-051,q-uspsp1-076}` },
        { id: "par-membros-torax", titulo: "Nervos e vasos dos membros; radiografia de tórax", conferir: true,
          questoes: ["q-unesp2024-074","q-tp20212-004","q-einstein2021-018","q-tp20252-011","q-unesp2021-071"],
          prosa: `[[O **nervo radial** passa no **sulco do radial** do úmero, colado ao osso: fratura da diáfise do úmero (inclusive na "queda de braço") o lesa — **mão caída**. O **nervo torácico longo** desce na parede lateral do tórax inervando o serrátil anterior; lesado no esvaziamento axilar, dá **escápula alada**. O **canal dos adutores** (de Hunter), por onde passam artéria e veia femorais, é limitado pelo **sartório, vasto medial, adutor longo e adutor magno**. Luxação do joelho ou fratura em volta dele com pé frio e sem pulso: **artéria poplítea**.|q-unesp2024-074,q-tp20212-004,q-einstein2021-018,q-tp20252-011]] [[Na radiografia de tórax em PA, a borda direita do coração é o **átrio direito**, a esquerda é o **ventrículo esquerdo**; o brônquio principal esquerdo é mais longo e horizontal.|q-unesp2021-071]]`,
          texto: `- Fratura de úmero: **radial**; escápula alada: **torácico longo**. {q-unesp2024-074,q-tp20212-004}
- Canal dos adutores: **sartório, vasto medial, adutores longo e magno**. {q-einstein2021-018}
- Trauma no joelho com pé frio: **poplítea**. {q-tp20252-011}
- Radiografia: borda direita = **átrio direito**; esquerda = **ventrículo esquerdo**. {q-unesp2021-071}` },
      ],
    },
  ],
});
