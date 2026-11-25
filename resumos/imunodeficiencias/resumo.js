/* resumos/imunodeficiencias/resumo.js — resumo adaptativo de imunodeficiências primárias (erros inatos
   da imunidade): sinais de alerta, investigação por imunoglobulinas, deficiências de anticorpos,
   imunodeficiência combinada grave (triagem neonatal, vacinas vivas, transplante), complemento e
   imunologia básica (MHC, Th2 no lactente). Assunto: ass-imunodeficiencias.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- imunodeficiencias */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "imunodeficiencias",
  titulo: "Imunodeficiências primárias",
  assunto: "ass-imunodeficiencias",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "iuis", texto: "IUIS 2022 — classificação dos erros inatos da imunidade; ASBAI/BRAGID — 10 sinais de alerta", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "suspeita", titulo: "Quando suspeitar e como investigar",
      introducao: `[[Criança que vai à creche pega 6 a 10 resfriados por ano e cresce bem: isso é normal. Os **sinais de alerta** de erro inato da imunidade são outros: infecções **graves, de repetição, por germes incomuns** ou que exigem antibiótico venoso (**duas ou mais pneumonias**, várias sinusites, otites que não acabam, abscessos profundos), **meningite** ou sepse de repetição, **candidíase persistente**, **diarreia crônica e falta de ganho de peso**, reação a vacina viva (BCG) e **história familiar** ou consanguinidade.|q-usprp2022-006,q-usp2022-057,q-usp2025-085,q-uspsp4-118,q-fmabc2022-057]] [[No lactente de poucos meses, a resposta imune ainda pende para o padrão **Th2** (herança da gestação) e o Th1 antiviral é fraco: é a época de maior suscetibilidade a vírus, protegida pelos anticorpos da mãe.|q-sirio2024-054]]

Veja também: **Calendário vacinal** (vacinas vivas), **Triagem neonatal**, **HIV** (imunodeficiência adquirida), **Neutropenia febril** e **Meningites**.`,
      fragmentos: [
        { id: "sus-investigar", titulo: "Investigar: imunoglobulinas primeiro", conferir: true, diretrizes: ["iuis"],
          questoes: ["q-usprp2022-006","q-usp2022-057","q-usp2025-085","q-uspsp4-118","q-einstein2025-037","q-usprp2024-064","q-sirio2024-054"],
          prosa: `[[As infecções **sinopulmonares bacterianas** de repetição (otite, sinusite, pneumonia por pneumococo e *Haemophilus*) apontam para **deficiência de anticorpos**, a mais comum das imunodeficiências primárias. A investigação começa por **hemograma** (linfócitos, neutrófilos) e **dosagem de IgG, IgA, IgM** (e IgE), depois **resposta vacinal a polissacarídeos** (pneumococo), complemento e imunofenotipagem de linfócitos; HIV sempre excluído.|q-usprp2022-006,q-usp2022-057,q-usp2025-085,q-uspsp4-118,q-einstein2025-037]] [[IgG e IgA baixas com IgM normal num pré-escolar com otites que **está melhorando** e cresce bem: **hipogamaglobulinemia transitória da infância**, que se corrige até os 4–5 anos (a IgG materna acabou e a dele ainda não chegou).|q-usprp2024-064]]`,
          texto: `- Infecções bacterianas sinopulmonares de repetição: **erro inato da imunidade**. {q-usprp2022-006}
- Investigar: **hemograma, IgG/IgA/IgM, complemento**, resposta a polissacarídeo. {q-usp2022-057,q-usp2025-085,q-uspsp4-118,q-einstein2025-037}
- IgG e IgA baixas transitórias no pré-escolar: **hipogamaglobulinemia transitória**. {q-usprp2024-064}
- Lactente pequeno: padrão **Th2**. {q-sirio2024-054}` },
      ],
    },
    {
      id: "doencas", titulo: "Imunodeficiência combinada, complemento e MHC",
      introducao: `[[Na **imunodeficiência combinada grave (SCID)** faltam linfócitos T (e a função B): nos primeiros meses aparecem **pneumocistose**, **candidíase oral persistente**, **diarreia crônica**, **falta de ganho de peso** e infecção disseminada por vacina viva (BCG). É fatal no primeiro ano sem transplante, por isso entrou na **triagem neonatal ampliada** por biologia molecular (TREC).|q-adap23-071,q-unifesp2023-071,q-fmabc2022-057]]`,
      fragmentos: [
        { id: "doe-scid-complemento", titulo: "SCID, complemento e apresentação de antígenos", conferir: true, diretrizes: ["iuis"],
          questoes: ["q-adap23-071","q-unifesp2023-071","q-usprp2022-097","q-fmabc2022-057","q-usprp2022-088","q-tp20202-013","q-udisc20262-008"],
          prosa: `[[SCID confirmada: **suspender todas as vacinas de agentes vivos** (BCG, rotavírus, sarampo, febre amarela, varicela) — as inativadas podem ser dadas —, **isolar**, profilaxia de *Pneumocystis* e **transplante de células-tronco hematopoéticas** com urgência. Lactente com sepse e meningite de repetição, diarreia e eritrodermia: **imunodeficiência primária**.|q-adap23-071,q-unifesp2023-071,q-usprp2022-097,q-fmabc2022-057]] [[Meningite meningocócica (*Neisseria*) **de repetição**: deficiência dos **componentes terminais do complemento** (C5–C9, o complexo de ataque à membrana). As moléculas do **MHC** ligam muitos peptídeos diferentes, de forma pouco específica, e os apresentam aos linfócitos T: **classe I** (peptídeos de dentro da célula) aos **CD8**, **classe II** (de fora, fagocitados) aos **CD4**.|q-usprp2022-088,q-tp20202-013,q-udisc20262-008]]`,
          texto: `- Lactente com pneumocistose, candidíase e diarreia: **SCID** → **sem vacina viva, transplante**. {q-adap23-071,q-fmabc2022-057}
- Triagem neonatal molecular: **imunodeficiências**; SCID no teste: **contraindicar vacinas vivas**, manter as demais. {q-unifesp2023-071,q-usprp2022-097}
- Meningite de repetição: **complemento**. {q-usprp2022-088}
- MHC: liga muitos peptídeos; classe I → CD8, classe II → CD4. {q-tp20202-013,q-udisc20262-008}` },
      ],
    },
  ],
});
