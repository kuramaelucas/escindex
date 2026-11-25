/* resumos/pericardio/resumo.js — resumo adaptativo das doenças do pericárdio: pericardite aguda
   (diagnóstico, ECG, tratamento, quando investigar), miopericardite, derrame e tamponamento
   (Beck, pulso paradoxal, pericardiocentese) e pericardite constritiva. Assunto: ass-pericardio.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- pericardio */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "pericardio",
  titulo: "Doenças do pericárdio",
  assunto: "ass-pericardio",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "esc-pericardio", texto: "ESC 2015 — Guidelines for the diagnosis and management of pericardial diseases; ESC 2025 — myocarditis and pericarditis", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "pericardite", titulo: "Pericardite aguda",
      introducao: `[[O pericárdio é um saco de duas folhas com poucos mililitros de líquido. Inflamado, as folhas atritam: daí a **dor torácica pleurítica** (piora ao inspirar e **ao deitar**, **melhora sentado e inclinado para a frente**), o **atrito pericárdico** e, no ECG, a lesão do epicárdio vizinho — **supradesnivelamento do ST difuso e côncavo** (sem imagem em espelho, salvo aVR e V1) e **infradesnivelamento do PR** (supra de PR em aVR). A causa mais comum é **viral/idiopática**, dias depois de um resfriado; outras são uremia, lúpus, tuberculose, neoplasia e pós-infarto.|q-card-28,q-iamspe2022-009,q-fmabc2025-004,q-usp2022-018,q-unicampdis2024-010,q-sirio2023-017]]

Veja também: **Doença coronariana** (o supra de ST do infarto), **Insuficiência cardíaca**, **Sepse** (tamponamento no choque e ultrassom à beira do leito) e **Lúpus**.`,
      fragmentos: [
        { id: "per-diagnostico", titulo: "Diagnóstico: dor, atrito, ECG e derrame", conferir: true, diretrizes: ["esc-pericardio"],
          questoes: ["q-card-28","q-iamspe2022-009","q-fmabc2025-004","q-usp2022-018","q-unicampdis2024-010","q-sirio2023-017","q-usprp2024-041","q-uspsp4-007"],
          prosa: `[[O diagnóstico pede **2 de 4**: dor típica, atrito, alterações difusas do ECG, **derrame pericárdico**. Por isso o **ecocardiograma** entra na avaliação (procura derrame e função do ventrículo). Troponina elevada indica que o miocárdio também inflamou: **miopericardite**. No jovem com quadro típico pós-viral, sem sinais de risco, o tratamento empírico começa sem investigação extensa.|q-card-28,q-iamspe2022-009,q-fmabc2025-004,q-usp2022-018,q-unicampdis2024-010,q-sirio2023-017,q-usprp2024-041,q-uspsp4-007]]`,
          texto: `- Dor que melhora inclinado, **ST difuso côncavo + PR infra**: **pericardite**. {q-card-28,q-iamspe2022-009,q-fmabc2025-004,q-usp2022-018,q-unicampdis2024-010}
- Lúpus com dor precordial: **pericardite**. {q-sirio2023-017}
- Pedir **ecocardiograma**; troponina alta = **miopericardite**. {q-usprp2024-041,q-fmabc2025-004}
- Jovem típico pós-viral: tratar **sem mais exames**. {q-uspsp4-007}` },
        { id: "per-tratamento", titulo: "Tratamento: AINE + colchicina", conferir: true, diretrizes: ["esc-pericardio"],
          questoes: ["q-card-28","q-famema2022-022","q-sessp2026-020","q-uspsp4-007","q-usp2025-089","q-iamspe2022-009"],
          prosa: `[[Primeira linha: **AINE em dose alta** (ibuprofeno, AAS) por 1–2 semanas **associado a colchicina** por 3 meses, que **reduz a recorrência à metade**; restrição de esforço até melhorar. **Corticoide** é segunda linha — aumenta a recorrência — e fica para quem **não pode usar AINE** (doença renal crônica, anticoagulação), doença autoimune ou gestação.|q-card-28,q-famema2022-022,q-sessp2026-020,q-uspsp4-007,q-usp2025-089,q-iamspe2022-009]] Sinais de mau prognóstico que mandam internar e investigar: febre alta, início subagudo, derrame volumoso ou tamponamento, falha do AINE, imunossupressão, trauma, anticoagulação.`,
          texto: `- **AINE + colchicina**. {q-card-28,q-famema2022-022,q-sessp2026-020,q-uspsp4-007}
- Doença renal crônica: **prednisona**. {q-usp2025-089}
- AINE ou corticoide e **reavaliar**. {q-iamspe2022-009}` },
      ],
    },
    {
      id: "tamponamento", titulo: "Derrame, tamponamento e constrição",
      introducao: `[[O pericárdio é pouco elástico: o líquido que acumula **rápido** comprime o coração mesmo em pequeno volume (o crônico distende o saco e tolera litros). Quando a pressão no pericárdio iguala a das câmaras direitas, elas não enchem — o débito cai. A **tríade de Beck**: **hipotensão, turgência jugular e bulhas abafadas**; o **pulso paradoxal** (queda da sistólica **> 10 mmHg na inspiração**, porque o VD que enche empurra o septo e rouba espaço do VE); taquicardia e **alternância elétrica** no ECG (o coração balança no líquido).|q-card-29,q-amrigs2022-004,q-scmsp2026-016,q-scmsp2023-017]]`,
      fragmentos: [
        { id: "tam-conduta", titulo: "Tamponamento: pericardiocentese", conferir: true, diretrizes: ["esc-pericardio"],
          questoes: ["q-card-29","q-amrigs2022-004","q-scmsp2026-016","q-scmsp2023-017","q-usp2023-047","q-fmabc2021-022","q-unicampdis2025-007","q-sessp2024-008"],
          prosa: `[[Causas: neoplasia (pulmão, mama), **uremia** (o paciente sem diálise eficiente), tuberculose, viral evoluindo mal, trauma e dissecção. O ecocardiograma mostra o derrame com **colapso diastólico do átrio e do ventrículo direito** e veia cava pletórica.|q-scmsp2026-016,q-scmsp2023-017,q-usp2023-047,q-unicampdis2025-007]] [[Tratamento: **pericardiocentese** de alívio (guiada por ultrassom); volume ajuda a ganhar tempo, mas **diurético e vasodilatador pioram** (o coração depende da pré-carga). Na **AESP** de um paciente com derrame, a punção é parte da busca da causa reversível: **punção subxifoide (de Marfan)**.|q-card-29,q-amrigs2022-004,q-usp2023-047,q-fmabc2021-022,q-sessp2024-008]]`,
          texto: `- Hipotensão + jugular + bulhas abafadas: **tamponamento**. {q-card-29,q-amrigs2022-004}
- **Pulso paradoxal** (> 10 mmHg), alternância elétrica. {q-scmsp2026-016,q-scmsp2023-017}
- Conduta: **pericardiocentese**. {q-usp2023-047,q-fmabc2021-022,q-unicampdis2025-007}
- AESP com derrame: **punção de Marfan**. {q-sessp2024-008}` },
        { id: "tam-constritiva", titulo: "Pericardite constritiva", conferir: true, diretrizes: ["esc-pericardio"],
          questoes: ["q-usprp2022-070"],
          prosa: `[[Na constritiva, o pericárdio fibrosa e calcifica (tuberculose, radioterapia, cirurgia cardíaca) e vira uma casca rígida: o enchimento para de repente no início da diástole (**knock pericárdico**), a pressão venosa sobe e **a jugular sobe na inspiração (sinal de Kussmaul)**, com ascite e edema desproporcionais ao coração pequeno. Tratamento definitivo: **pericardiectomia**.|q-usprp2022-070]]`,
          texto: `- Dispneia, **Kussmaul** (jugular sobe na inspiração): **constritiva**. {q-usprp2022-070}` },
      ],
    },
  ],
});
