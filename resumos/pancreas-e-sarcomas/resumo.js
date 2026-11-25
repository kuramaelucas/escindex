/* resumos/pancreas-e-sarcomas/resumo.js — resumo adaptativo de oncologia cirúrgica: câncer de pâncreas
   e tumores periampulares (icterícia obstrutiva, estadiamento, duodenopancreatectomia, paliação),
   lesões císticas e neuroendócrinas do pâncreas, GIST e sarcomas de partes moles. Assuntos:
   ass-capancreas (principal) e ass-cironco-sarcomas.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- pancreas-e-sarcomas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "pancreas-e-sarcomas",
  titulo: "Câncer de pâncreas, periampulares, GIST e sarcomas",
  assunto: "ass-capancreas",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "nccn-pancreas", texto: "NCCN — Pancreatic Adenocarcinoma (2025); consenso europeu de neoplasias císticas do pâncreas (2018)", lidoEm: null },
    { id: "esmo-sarcoma", texto: "ESMO 2021/2022 — soft tissue sarcomas e GIST", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "pancreas", titulo: "Câncer de pâncreas e tumores periampulares",
      introducao: `[[O **adenocarcinoma ductal** do pâncreas é silencioso e agressivo: fatores de risco **tabagismo**, idade, obesidade, diabetes de início recente, pancreatite crônica. Na **cabeça** (dois terços), aperta o **colédoco intrapancreático** e dá **icterícia obstrutiva progressiva e indolor** (colúria, acolia, prurido), com **emagrecimento** e às vezes vesícula palpável; no corpo e na cauda, dá **dor epigástrica que vai para o dorso** e acorda à noite, quando já é tarde. O tumor também trombosa veias (esplênica, mesentérica).|q-usprp2024-047,q-unesp2023-067,q-unicampdis2025-061,q-sirio2024-031,q-tp20222-009]] [[Os **tumores periampulares** (cabeça do pâncreas, ampola de Vater, colédoco distal, duodeno) se apresentam igual; os **ampulares** (cerca de 10% das obstruções do colédoco distal; um terço adenomas) têm melhor prognóstico porque dão icterícia cedo.|q-iamspe2022-018,q-einstein2022-026,q-fmabc2024-040]]

Veja também: **Colangite**, **Colecistite e coledocolitíase**, **Pancreatite aguda**, **Adrenal** (tumores neuroendócrinos funcionantes) e **Câncer gástrico**.`,
      fragmentos: [
        { id: "pan-diagnostico", titulo: "Icterícia obstrutiva: onde está a obstrução", conferir: true, diretrizes: ["nccn-pancreas"],
          questoes: ["q-usprp2024-047","q-unesp2023-067","q-unicampdis2025-061","q-sirio2024-031","q-tp20222-009","q-iamspe2022-018","q-einstein2022-026","q-fmabc2024-040"],
          prosa: `[[O exame inicial é a **tomografia de abdome com contraste** (protocolo de pâncreas): mostra a massa, a dilatação das vias biliares e do ducto pancreático ("duplo ducto") e a relação com os vasos, que decide a ressecabilidade. Dilatação **intra e extra-hepática** põe a obstrução **abaixo do hepático comum** — colédoco ou papila; o **ducto cístico** obstruído não dá icterícia. O marcador é o **CA 19-9**, útil para seguimento e prognóstico (não para rastrear).|q-unesp2023-067,q-unicampdis2025-061,q-tp20222-009,q-iamspe2022-018,q-einstein2022-026,q-sirio2024-031]]`,
          texto: `- Dor epigástrica para o dorso, emagrecimento: **pâncreas**. {q-usprp2024-047}
- Icterícia indolor com emagrecimento: **TC com contraste**. {q-unesp2023-067,q-unicampdis2025-061}
- Vias intra e extra dilatadas: obstrução **distal**; cístico não. {q-tp20222-009}
- Periampular: imagem e icterícia precoce; ampulares ~10%. {q-iamspe2022-018,q-einstein2022-026,q-fmabc2024-040}
- Marcador: **CA 19-9**. {q-sirio2024-031}` },
        { id: "pan-tratamento", titulo: "Ressecção ou paliação", conferir: true, diretrizes: ["nccn-pancreas"],
          questoes: ["q-fmabc2021-012","q-uspsp4-066","q-uspsp2-091","q-einstein2026-028","q-einstein2022-017"],
          prosa: `[[Tumor da cabeça **ressecável** (sem metástase, sem envolver artéria mesentérica superior e tronco celíaco): **duodenopancreatectomia (Whipple)**, a única chance de cura, cirurgia de **morbimortalidade alta** (fístula pancreática, retardo do esvaziamento), por isso feita em centros de volume.|q-fmabc2021-012,q-uspsp4-066,q-uspsp2-091]] [[Idoso frágil, irressecável ou metastático com icterícia: **paliação** — **drenagem biliar por CPRE com prótese** (ou percutânea), sem tentar ressecar. A drenagem pré-operatória só é rotina se há colangite ou a cirurgia vai demorar; com bilirrubina muito alta e sintomas, drena-se.|q-einstein2026-028,q-einstein2022-017]]`,
          texto: `- Ressecável: **duodenopancreatectomia**, morbimortalidade alta. {q-fmabc2021-012,q-uspsp4-066,q-uspsp2-091}
- Irressecável ou frágil: **CPRE com prótese**. {q-einstein2026-028}
- Bilirrubina 23 com massa periampular: **drenar a via biliar**. {q-einstein2022-017}` },
        { id: "pan-cistos-net", titulo: "Lesões císticas e neuroendócrinas", conferir: true, diretrizes: ["nccn-pancreas"],
          questoes: ["q-famerp2024-022","q-simepm89-010","q-iamspe2023-028","q-amrigs2024-033"],
          prosa: `[[Cisto no pâncreas: o líquido e a forma separam. **Cistoadenoma mucinoso**: mulher de meia-idade, **corpo e cauda**, **CEA alto** e glicose baixa no líquido — pré-maligno, **ressecar**. **IPMN** comunica com o ducto: envolvimento do **ducto principal** (avaliado por ecoendoscopia) indica cirurgia. **Tumor de Frantz** (sólido-pseudopapilar): mulher jovem, **corpo e cauda**, baixo grau. **Neuroendócrino não funcionante** pequeno (até 2 cm), achado de imagem: marcador **cromogranina A**, pode ser **acompanhado**; a maioria é esporádica.|q-famerp2024-022,q-simepm89-010,q-iamspe2023-028,q-amrigs2024-033]]`,
          texto: `- Mulher, cauda, CEA alto no cisto: **cistoadenoma mucinoso**. {q-famerp2024-022}
- Cisto com possível ducto principal: **ecoendoscopia** e ressecar se envolvido. {q-simepm89-010}
- Frantz: **corpo e cauda**, mulher jovem. {q-iamspe2023-028}
- Neuroendócrino ≤ 2 cm: **cromogranina**, pode acompanhar. {q-amrigs2024-033}` },
      ],
    },
    {
      id: "sarcomas", titulo: "GIST e sarcomas de partes moles",
      introducao: `[[O **GIST** nasce das **células intersticiais de Cajal** (marca-passo do intestino) e expressa **KIT (CD117)** e DOG1; mais no **estômago**. Cresce para fora da mucosa: lesão **submucosa** que ulcera e sangra. O prognóstico depende de **tamanho, índice mitótico, localização e ruptura**, não de linfonodos (quase não dá metástase linfática); não se faz biópsia percutânea (pode romper). Os **sarcomas de partes moles** dão massa **profunda, crescente, maior que 5 cm**, muitas vezes atribuída a um trauma; metastatizam pelo sangue para o **pulmão**.|q-sessp2024-022,q-amrigs2024-030,q-amrigs2023-037,q-usp2024-036]]`,
      fragmentos: [
        { id: "sar-conduta", titulo: "Diagnóstico e estadiamento", conferir: true, diretrizes: ["esmo-sarcoma"],
          questoes: ["q-sessp2024-022","q-amrigs2024-030","q-amrigs2023-037","q-usp2024-036"],
          prosa: `[[GIST localizado: **ressecção com margem livre** (sem linfadenectomia), imatinibe nos de alto risco. Massa de partes moles suspeita: ressonância do local, **biópsia planejada** (core, no trajeto que será ressecado) e **tomografia de tórax** para estadiar, porque o pulmão é o primeiro sítio de metástase. No TNM dos sarcomas e GIST, o T é dado pelo **tamanho** (T3 entre 5 e 10 cm).|q-sessp2024-022,q-amrigs2024-030,q-amrigs2023-037,q-usp2024-036]]`,
          texto: `- Células de Cajal, C-KIT: **GIST**. {q-sessp2024-022}
- GIST: **CD117/DOG1**; sem biópsia percutânea; prognóstico por tamanho e mitoses. {q-amrigs2024-030}
- T3: **5 a 10 cm**. {q-amrigs2023-037}
- Massa na coxa: estadiar com **TC de tórax**. {q-usp2024-036}` },
      ],
    },
  ],
});
