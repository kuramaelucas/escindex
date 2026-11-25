/* resumos/intersticiais/resumo.js — resumo adaptativo das doenças pulmonares intersticiais: quadro
   (estertor em velcro, baqueteamento, distúrbio restritivo), fibrose pulmonar idiopática e antifibróticos,
   sarcoidose, pneumoconioses, doença do colágeno e pneumonite por imunoterapia. Assunto:
   ass-pneumo-intersticiais. Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- intersticiais */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "intersticiais",
  titulo: "Doenças pulmonares intersticiais",
  assunto: "ass-pneumo-intersticiais",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "ats-fpi", texto: "ATS/ERS/JRS/ALAT 2022 — idiopathic pulmonary fibrosis and progressive pulmonary fibrosis; SBPT — diretrizes de doenças pulmonares intersticiais", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "fibrose", titulo: "Fibrose pulmonar e o padrão restritivo",
      introducao: `[[Nas doenças intersticiais, a inflamação e a fibrose engrossam o espaço entre o alvéolo e o capilar: o pulmão fica **rígido (complacência baixa)** e pequeno, e o oxigênio difunde mal. Daí a **dispneia progressiva** com **tosse seca**, os **estertores finos "em velcro"** nas bases, o **baqueteamento digital** e a **dessaturação ao esforço**. A espirometria mostra **distúrbio restritivo**: **CVF reduzida com VEF1/CVF normal ou alta** (acima de 0,7), e a difusão de CO cai; a expansibilidade do tórax diminui.|q-usprp2022-068,q-usprp2026-098,q-tp20241-010,q-famerp2024-066,q-unicampdis2024-006]]

Veja também: **DPOC** (bronquiectasias), **Lúpus** e **Vasculites** (pulmão nas colagenoses), **Tuberculose** (silicose) e **Saúde do trabalhador** (pneumoconioses).`,
      fragmentos: [
        { id: "fib-fpi", titulo: "Fibrose pulmonar idiopática e outras causas", conferir: true, diretrizes: ["ats-fpi"],
          questoes: ["q-usprp2022-068","q-usprp2026-098","q-famerp2024-066","q-unicampdis2024-006","q-tp20232-005","q-sessp2026-015","q-tp20252-024","q-tp20241-010","q-unicampdis2022-007","q-sessp2025-009"],
          prosa: `[[**Fibrose pulmonar idiopática**: idoso, homem, **ex-tabagista**, refluxo, com velcro e baqueteamento; tomografia com padrão de **pneumonia intersticial usual** (reticulado e **faveolamento subpleural basal**, bronquiectasias de tração). Antes de chamar de idiopática, procurar **exposição** (pássaros, mofo, sílica, asbesto) e **doença do colágeno** (esclerodermia: pele endurecida, Raynaud). Tratamento: **antifibrótico** (**nintedanibe** ou **pirfenidona**), que **retarda a queda da função** — corticoide não ajuda e piora; oxigênio e reabilitação.|q-usprp2022-068,q-usprp2026-098,q-famerp2024-066,q-unicampdis2024-006,q-tp20232-005,q-sessp2026-015,q-tp20252-024,q-tp20241-010,q-sessp2025-009]] [[Trabalhador de **cerâmica, pedreira ou jateamento** com fibrose: **silicose**, que aumenta muito o risco de **tuberculose** e evolui para cor pulmonale (edema de membros inferiores).|q-unicampdis2022-007]]`,
          texto: `- Velcro + baqueteamento + dispneia progressiva: **intersticial**. {q-usprp2022-068,q-usprp2026-098,q-unicampdis2024-006}
- Restritivo: **CVF baixa, VEF1/CVF normal**; complacência baixa. {q-famerp2024-066,q-tp20241-010}
- FPI → **antifibrótico (nintedanibe)**. {q-tp20232-005,q-sessp2026-015,q-tp20252-024}
- Cerâmica + tuberculose prévia: **silicose**. {q-unicampdis2022-007}
- Tomografia: fibrose × enfisema × congestão. {q-sessp2025-009}` },
      ],
    },
    {
      id: "sarcoidose-pneumonite", titulo: "Sarcoidose e pneumonites",
      introducao: `[[A **sarcoidose** forma **granulomas não caseosos** em vários órgãos; no pulmão, começa nos linfonodos: **adenomegalia hilar bilateral simétrica** (com paratraqueal direita: **sinal do 1-2-3**) num adulto jovem, muitas vezes negro, com pouca tosse e ausculta normal. Pele (eritema nodoso, lesões infiltradas), olho (uveíte) e hipercalcemia completam o quadro.|q-tp20202-038,q-tp20212-002]]`,
      fragmentos: [
        { id: "sar-conduta", titulo: "Sarcoidose e pneumonite por drogas", conferir: true, diretrizes: ["ats-fpi"],
          questoes: ["q-tp20202-038","q-tp20212-002","q-amrigs2025-018","q-usp2023-055"],
          prosa: `[[A biópsia (pele, linfonodo) mostra **granuloma epitelioide sem necrose caseosa**. Muitos casos regridem sozinhos; quando é preciso tratar, a sarcoidose é a intersticial que **responde bem a corticoide sistêmico** isolado.|q-tp20212-002,q-amrigs2025-018]] [[Dispneia e hipoxemia num paciente em **imunoterapia** (anti-PD-1/PD-L1) para câncer: **pneumonite imunomediada** — grave: **UTI, corticoide em dose alta**, suspender a imunoterapia, e cobrir infecção (pesquisa viral, antibiótico) até excluí-la.|q-usp2023-055]]`,
          texto: `- Adenomegalia hilar bilateral (**1-2-3**) no jovem: **sarcoidose**. {q-tp20202-038,q-tp20212-002}
- Responde a **corticoide** isolado: sarcoidose. {q-amrigs2025-018}
- Imunoterapia + dispneia: **pneumonite** → corticoide em dose alta. {q-usp2023-055}` },
      ],
    },
  ],
});
