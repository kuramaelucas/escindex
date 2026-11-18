/* resumos/diarreia-desidratacao/resumo.js — resumo adaptativo de diarreia aguda e desidratação na criança:
   mecanismos da diarreia, avaliação do estado de hidratação, planos A, B e C, zinco e coadjuvantes,
   disenteria, distúrbios de sódio e potássio e hidratação venosa (manutenção, expansão).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- diarreia-desidratacao */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "diarreia-desidratacao",
  titulo: "Diarreia aguda e desidratação",
  assunto: "ass-dda",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "ms-diarreia", texto: "Ministério da Saúde — Manejo do paciente com diarreia (cartaz e manual dos planos A, B e C)", lidoEm: null },
    { id: "oms-diarreia", texto: "OMS — The treatment of diarrhoea: a manual for physicians and other senior health workers", lidoEm: null },
    { id: "espghan-gea", texto: "ESPGHAN/ESPID — Guidelines for the management of acute gastroenteritis in children in Europe", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas: sem gabarito para medir o erro", questoes: ["q-scmsp2021-054","q-usp2026-054","q-amrigs2021-068"] },
  ],
  doencas: [
    {
      id: "mecanismos", titulo: "Por que a criança tem diarreia",
      introducao: `A diarreia aguda é a eliminação de fezes amolecidas três ou mais vezes por dia, por menos de 14 dias. A maior parte é **viral** (rotavírus, norovírus) e se resolve sozinha; o que mata é a **desidratação**.

**Fisiopatologia.** [[Na diarreia secretora, toxinas ou vírus fazem o intestino secretar cloreto e água: as fezes são muito volumosas e aquosas e continuam mesmo em jejum.|q-unesp2021-015]] [[Na osmótica, um soluto que não é absorvido, como a lactose quando falta lactase, puxa água para a luz; as bactérias o fermentam e as fezes ficam ácidas, com gases e assaduras.|q-famerp2022-019,q-unesp2021-015]] [[Na inflamatória, o agente invade a mucosa: as fezes são pouco volumosas, com sangue, muco e pus, e há febre e cólica.|q-usprp2023-069,q-unesp2021-015,q-fmabc2023-019]]

[[O soro de reidratação oral funciona mesmo na diarreia mais intensa porque o transportador intestinal que absorve sódio junto com glicose continua íntegro, e a água segue o sódio.|q-fmabc2026-051]]`,
      fragmentos: [
        { id: "mec-tipos", titulo: "Secretora, osmótica e inflamatória", conferir: true,
          questoes: ["q-unesp2021-015","q-famerp2022-019","q-usprp2023-069","q-fmabc2026-051","q-tp20241-037"],
          texto: `- **Inflamatória**: pouco volume, sangue e muco; **osmótica**: odor ácido, gases; **secretora**: muito volumosa. {q-unesp2021-015}
- Fezes explosivas, flatulência e assadura após leite: **osmótica**. {q-famerp2022-019}
- Febre, cólica, ruídos aumentados: **inflamatória**. {q-usprp2023-069}
- O que reduz a mortalidade, segundo a OMS: **soro de reidratação oral**. {q-fmabc2026-051}
- Diarreia aguda aquosa em criança hidratada: **manter a alimentação habitual**; probióticos e restrições não são necessários. {q-tp20241-037}` },
      ],
    },
    {
      id: "avaliacao", titulo: "Avaliar a hidratação e escolher o plano",
      introducao: `[[O Ministério da Saúde classifica a hidratação pelo que se vê à beira do leito: estado geral, olhos, lágrimas, sede, sinal da prega e pulso. Dois ou mais sinais de desidratação levam ao plano B; incapacidade de beber, letargia, pulso fraco ou enchimento capilar lento levam ao plano C.|q-018,q-uspsp1-013,q-famema2021-088,q-iamspe2026-070]]

A lógica é fisiológica. [[A criança com desidratação moderada ainda tem a circulação preservada e intestino funcionando, e por isso se reidrata pela boca; a que está em choque ou não consegue beber precisa de volume na veia.|q-sessp2023-039,q-famerp2023-031,q-sessp2024-057]]`,
      fragmentos: [
        { id: "ava-classificar", figuras: [{ arquivo: "figuras/planos-abc.svg", legenda: "Esquema autoral: os sinais que levam a cada plano e o que se faz em cada um." }], titulo: "Sem desidratação, desidratação, desidratação grave", conferir: true, diretrizes: ["ms-diarreia"],
          questoes: ["q-018","q-uspsp1-013","q-famerp2022-030","q-tp20212-043","q-sirio2021-049","q-famema2021-088","q-iamspe2026-070","q-famerp2023-031","q-unicampdis2023-033","q-sessp2024-057","q-einstein2027-040","q-fmabc2023-060"],
          texto: `- **Sem desidratação** (bem alerta, olhos normais, bebe normalmente, prega normal): **plano A**. {q-018}
- **Desidratação** (irritado, **olhos fundos**, **sede**, sem lágrimas, **prega desaparece lentamente**, pulso cheio ou rápido): **plano B**. {q-uspsp1-013,q-famerp2022-030,q-tp20212-043,q-sirio2021-049,q-einstein2027-040}
- **Desidratação grave** (letárgico, **não consegue beber**, prega muito lenta, **pulso fraco ou ausente**, enchimento capilar > 5 s): **plano C**. {q-famema2021-088,q-iamspe2026-070,q-famerp2023-031}
- Desidratação moderada corresponde a perda de **3 a 9%** do peso. {q-sessp2024-057,q-unicampdis2023-033}
- Enchimento capilar de 4 s isolado com a criança bebendo: as provas aceitam **plano B supervisionado**. {q-fmabc2023-060}` },
      ],
    },
    {
      id: "planos", titulo: "Planos A, B e C",
      introducao: `[[O plano A trata em casa: mais líquidos e soro oral após cada evacuação, alimentação mantida, zinco e sinais de alarme.|q-unifesp2024-095,q-unifesp2026-088,q-sirio2021-043]] [[O plano B reidrata pela boca, na unidade, com 50 a 100 mL/kg em 4 a 6 horas, reavaliando ao fim.|q-adap26-088,q-einstein2023-033,q-adap24-096]] [[O plano C dá volume na veia, porque a criança em choque não absorve o soro oral a tempo.|q-adap23-076,q-sirio2027-044,q-famerp2023-031]]`,
      fragmentos: [
        { id: "pla-a", titulo: "Plano A e zinco", conferir: true, diretrizes: ["ms-diarreia","oms-diarreia"],
          questoes: ["q-unifesp2024-095","q-unifesp2026-088","q-sirio2021-043","q-unifesp2022-066","q-sessp2024-041","q-famema2025-039","q-sirio2026-046","q-fmabc2024-057","q-udisc20262-049"],
          texto: `- Plano A: **soro após cada evacuação**, mais líquidos, **alimentação habitual sem alimentos novos**, sinais de alarme. {q-sirio2021-043,q-unifesp2024-095}
- **Zinco** para todo menor de 5 anos com diarreia: **10 mg/dia abaixo de 6 meses** e **20 mg/dia a partir de 6 meses**, por **10 a 14 dias**. {q-unifesp2022-066,q-sessp2024-041,q-famema2025-039,q-sirio2026-046,q-unifesp2026-088}
- Soro oral em excesso no menor de 10 anos pode causar **hipernatremia**. {q-fmabc2024-057}
- Surto de diarreia aquosa na creche, criança hidratada: **reidratação oral**. {q-udisc20262-049}` },
        { id: "pla-b", titulo: "Plano B", conferir: true, diretrizes: ["ms-diarreia"],
          questoes: ["q-adap26-088","q-einstein2023-033","q-adap24-096","q-sessp2023-039","q-einstein2025-033","q-uspsp5-097","q-amrigs2025-070","q-tp20212-043","q-sirio2021-049","q-fmabc2023-060","q-einstein2027-040"],
          texto: `- **50 a 100 mL/kg de soro oral em 4 a 6 horas**, na unidade, com reavaliação. {q-adap26-088,q-einstein2023-033,q-adap24-096,q-einstein2027-040,q-fmabc2023-060}
- Oferecer **em livre demanda** até desaparecerem os sinais de desidratação. {q-tp20212-043,q-sirio2021-049}
- Se piorar ou não conseguir beber durante o plano B: passar ao **plano C**. {q-sessp2023-039}
- Desidratação com pulsos cheios: **começar pela via oral** e monitorar. {q-einstein2025-033,q-uspsp5-097}
- Lactente com vômitos: o soro oral é oferecido **na sala de observação/emergência**, em pequenos volumes. {q-amrigs2025-070}` },
        { id: "pla-c", titulo: "Plano C", conferir: true, diretrizes: ["ms-diarreia","oms-diarreia"],
          questoes: ["q-adap23-076","q-sirio2027-044","q-sirio2026-050","q-famerp2023-031","q-famema2021-088","q-iamspe2026-070","q-usp2024-016","q-iamspe2021-037"],
          texto: `- OMS: **100 mL/kg** de solução isotônica; **menor de 1 ano: 30 mL/kg em 1 h + 70 mL/kg em 5 h**; **1 ano ou mais: 30 mL/kg em 30 min + 70 mL/kg em 2 h 30**. {q-adap23-076,q-sirio2027-044}
- As provas recentes também cobram **SF 30 mL/kg em 30 minutos** como fase inicial: confira o cartaz vigente do Ministério. {q-sirio2026-050}
- Plano C é hospitalar, com **hidratação venosa imediata**. {q-famerp2023-031,q-famema2021-088,q-iamspe2026-070}
- Persistem sinais de choque após a expansão: **seguir expandindo com isotônico**. {q-usp2024-016}
- Expansão de emergência: **soro fisiológico 20 mL/kg**. {q-iamspe2021-037}` },
      ],
    },
    {
      id: "coadjuvantes", titulo: "Antieméticos, antibióticos e disenteria",
      introducao: `[[A maior parte das diarreias é viral e autolimitada: antibiótico só ajuda quando há disenteria (sangue nas fezes, pensando em Shigella) ou uma infecção específica comprovada.|q-iamspe2026-073,q-fmabc2023-019,q-didepm-034]] [[A Escherichia coli O157:H7 é a exceção que se teme: a toxina Shiga lesa o endotélio renal e pode causar a síndrome hemolítico-urêmica.|q-scmsp2026-048]]`,
      fragmentos: [
        { id: "coa-antiemetico", titulo: "Antieméticos", conferir: true, diretrizes: ["espghan-gea"],
          questoes: ["q-iamspe2026-071","q-adap22-066","q-sessp2026-059"],
          texto: `- **Ondansetrona**: não é recomendada pela OMS, mas a ESPGHAN aceita dose única para vômitos que impedem a reidratação oral. {q-iamspe2026-071,q-adap22-066}
- Liberação extrapiramidal após antiemético: **metoclopramida** (não usar em criança). {q-sessp2026-059}` },
        { id: "coa-disenteria", titulo: "Disenteria e antibiótico", conferir: true, diretrizes: ["ms-diarreia"],
          questoes: ["q-iamspe2026-073","q-fmabc2023-019","q-didepm-034","q-tp20212-060","q-unifesp2023-076","q-sirio2024-047","q-sirio2024-046","q-scmsp2026-048"],
          texto: `- Antibiótico: **disenteria** ou infecção comprovada (ex.: Giardia). {q-iamspe2026-073}
- Diarreia com sangue: mais provável **Shigella**; tratar com **azitromicina ou ciprofloxacino**, mais reidratação e zinco. {q-fmabc2023-019,q-didepm-034,q-tp20212-060}
- Disenteria com desidratação: **reidratar na unidade e dar antibiótico**. {q-unifesp2023-076,q-sirio2024-047}
- **Surto em creche**: coletar pesquisa do agente nas fezes (vigilância). {q-sirio2024-046}
- *E. coli* O157:H7 + anemia hemolítica, plaquetopenia e insuficiência renal: **síndrome hemolítico-urêmica**. {q-scmsp2026-048}` },
      ],
    },
    {
      id: "eletrolitos", titulo: "Sódio, potássio, acidose e soro venoso",
      introducao: `[[Na hipernatremia, a água sai das células para o plasma: a circulação se mantém (pulso cheio, turgor normal ou pastoso) e a desidratação parece menor do que é, mas o cérebro murcha.|q-tp20252-020,q-tp20261-074,q-unicampdis2023-033]] [[Corrigir o sódio rápido demais faz a água voltar de uma vez para o neurônio adaptado, causando edema cerebral; por isso a correção é lenta, em 48 a 72 horas.|q-usp2024-017]]

[[A diarreia perde potássio e bicarbonato: a hipopotassemia causa fraqueza e íleo paralítico, e a acidose metabólica com ânion gap normal vem da perda de bicarbonato nas fezes.|q-amrigs2022-066,q-usprp2023-002,q-scmsp2022-024]]`,
      fragmentos: [
        { id: "ele-sodio", titulo: "Hipernatremia e hipopotassemia", conferir: true,
          questoes: ["q-tp20252-020","q-tp20261-074","q-usp2024-017","q-unicampdis2023-033","q-amrigs2022-066","q-usprp2023-002","q-scmsp2022-024"],
          texto: `- Desidratação hipernatrêmica: expandir com **solução isotônica**. {q-tp20252-020,q-tp20261-074}
- Turgor **pastoso** e sinais mais leves que a perda: pensar em **hipernatremia**. {q-unicampdis2023-033}
- Após estabilizar: recolher o sódio, calcular o **déficit de água livre** e repor em **48 a 72 h**, de preferência **enteral**. {q-usp2024-017}
- Hipopotassemia na diarreia é esperada; causa **íleo paralítico** (distensão, ruídos diminuídos). {q-amrigs2022-066,q-usprp2023-002}
- Acidose metabólica com desidratação: **SF 0,9%** na expansão, não bicarbonato. {q-scmsp2022-024}` },
        { id: "ele-manutencao", titulo: "Soro de manutenção e expansão em outras situações", conferir: true,
          questoes: ["q-sirio2021-047","q-usprp2025-002","q-usp2025-056","q-uspsp3-046","q-sessp2026-055","q-tp20231-042","q-tp20231-045"],
          casos: ["q-usp2025-056"],
          texto: `- **Holliday-Segar**: 100 mL/kg até 10 kg; +50 mL/kg de 10 a 20 kg; +20 mL/kg acima de 20 kg (17 kg = **1.350 mL**). {q-sirio2021-047,q-usprp2025-002}
- Manutenção hoje é **isotônica** (glicose com sódio próximo do plasma) e com potássio. {q-usp2025-056,q-uspsp3-046}
- Hidratada após expansão, com K baixo: **manutenção com potássio**, liberar a dieta. {q-uspsp3-046}
- Cetoacidose diabética: as provas cobram **SF ou Ringer 20 mL/kg** na expansão inicial. {q-sessp2026-055,q-tp20231-042,q-tp20231-045}` },
      ],
    },
  ],
});
