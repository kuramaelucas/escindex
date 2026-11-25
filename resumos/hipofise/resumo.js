/* resumos/hipofise/resumo.js — resumo adaptativo de doenças da hipófise: fisiologia do eixo,
   prolactinoma e hiperprolactinemia, acromegalia, macroadenoma e compressão do quiasma,
   hipopituitarismo, diabetes insípido (inclusive depois da cirurgia transesfenoidal).
   Assunto: ass-hipofise. Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- hipofise */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "hipofise",
  titulo: "Doenças da hipófise",
  assunto: "ass-hipofise",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "endocrine-hipofise", texto: "Endocrine Society — diretrizes de hiperprolactinemia (2011), acromegalia (2014), hipopituitarismo (2016); Pituitary Society 2023 (prolactinomas)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "eixo", titulo: "O eixo e os adenomas",
      introducao: `[[A adeno-hipófise obedece ao hipotálamo: quase todos os seus hormônios (ACTH, TSH, GH, FSH/LH) dependem de **estímulo** hipotalâmico, menos a **prolactina**, que é **freada pela dopamina**. Por isso, quando a **haste** é comprimida (por um tumor qualquer) ou a dopamina é bloqueada (antipsicóticos, antidepressivos, metoclopramida), a **prolactina sobe** e os outros caem.|q-amrigs2023-013,q-usprp2023-035]] [[O **quiasma óptico** fica logo acima da sela: o **macroadenoma** (≥ 1 cm) que cresce para cima comprime as fibras nasais que cruzam e dá **hemianopsia bitemporal**, além de cefaleia.|q-amrigs2023-064,q-tp20252-003]]

Veja também: **Adrenal** (insuficiência adrenal e Cushing), **Tireoide**, **Ciclo menstrual** (amenorreia), **Hidroeletrolítico** (sódio e água) e **Neurocirurgia** (fístula liquórica).`,
      fragmentos: [
        { id: "hip-prolactina", titulo: "Hiperprolactinemia e prolactinoma", conferir: true, diretrizes: ["endocrine-hipofise"],
          questoes: ["q-adap21-088","q-unicamp2023-054","q-uspsp2-025","q-uspsp5-026","q-usprp2023-035","q-amrigs2023-013"],
          prosa: `[[A prolactina alta **inibe o GnRH**: **FSH e LH caem**, e vêm **amenorreia, galactorreia**, infertilidade e queda da libido (no homem, disfunção erétil). Antes de culpar um tumor, excluir **gravidez, hipotireoidismo e remédios** — com droga suspeita, **trocar e repetir a prolactina**. Prolactinoma (prolactina muito alta, adenoma na ressonância): tratamento **clínico com agonista dopaminérgico (cabergolina)**, que reduz a prolactina e o tumor e devolve os ciclos e a fertilidade; cirurgia só se não responde.|q-adap21-088,q-unicamp2023-054,q-uspsp2-025,q-uspsp5-026,q-usprp2023-035]]`,
          texto: `- Amenorreia + galactorreia + prolactina alta: **prolactinoma** → **cabergolina**. {q-adap21-088,q-unicamp2023-054,q-uspsp2-025}
- Prolactina alta **suprime FSH e LH**. {q-uspsp5-026}
- Em uso de antidepressivo: **trocar e repetir a prolactina**. {q-usprp2023-035}
- Prolactina é **inibida pela dopamina**; lesão da haste a eleva. {q-amrigs2023-013}` },
        { id: "hip-acromegalia-macro", titulo: "Acromegalia e macroadenoma", conferir: true, diretrizes: ["endocrine-hipofise"],
          questoes: ["q-adap25-024","q-tp20252-003","q-usprp2021-088","q-amrigs2023-064"],
          prosa: `[[**Acromegalia**: excesso de GH (via IGF-1) no adulto faz crescer mãos, pés (**aumento do número do calçado**), mandíbula e partes moles; sudorese, artralgia, apneia do sono, **hipertensão e diabetes**. Triagem com **IGF-1**; confirmação: **GH que não suprime no teste de tolerância oral à glicose**. Tratamento: cirurgia transesfenoidal.|q-adap25-024]] [[**Macroadenoma não secretor**: cefaleia, **perda visual** (hemianopsia bitemporal) e hipopituitarismo por compressão — **cirurgia transesfenoidal** (o prolactinoma, ao contrário, se trata com remédio mesmo grande).|q-tp20252-003,q-usprp2021-088,q-amrigs2023-064]]`,
          texto: `- Calçado e mãos crescendo + DM e HAS: **acromegalia** → **GH após sobrecarga de glicose**. {q-adap25-024}
- Baixa visual + cefaleia: **macroadenoma**; não secretor → **transesfenoidal**. {q-tp20252-003,q-usprp2021-088}
- Hemianopsia bitemporal: **quiasma**. {q-amrigs2023-064}` },
      ],
    },
    {
      id: "deficiencias", titulo: "Hipopituitarismo e diabetes insípido",
      introducao: `[[A hipófise que perde células (adenoma, cirurgia, radioterapia, apoplexia, **Sheehan** no pós-parto, trauma) falha numa ordem típica: primeiro **GH e gonadotrofinas**, depois TSH e por último ACTH. A neuro-hipófise (ADH) só falha quando a lesão pega a haste ou o hipotálamo — depois de **trauma de crânio** ou da **cirurgia transesfenoidal**.|q-usprp2024-060,q-unifesp2025-024,q-usprp2023-066,q-famema2022-023]]`,
      fragmentos: [
        { id: "def-hipopituitarismo", titulo: "Hipopituitarismo", conferir: true, diretrizes: ["endocrine-hipofise"],
          questoes: ["q-usprp2024-060","q-unifesp2025-024","q-tp20202-009","q-sirio2022-004"],
          prosa: `[[No hipopituitarismo os hormônios periféricos estão **baixos com o trófico baixo ou "normal" (inapropriado)**: testosterona baixa com LH normal, T4 livre baixo com TSH normal, cortisol baixo com ACTH baixo. Deficiência de mais de um eixo = **pan-hipopituitarismo**. Na insuficiência adrenal **central** (falta de ACTH) **não há hiperpotassemia nem hiperpigmentação**: a aldosterona depende da renina, não do ACTH, e o ACTH baixo não escurece a pele; tem fraqueza, hipotensão, hipoglicemia e hiponatremia. Repor **corticoide antes da levotiroxina**.|q-usprp2024-060,q-unifesp2025-024,q-tp20202-009,q-sirio2022-004]]`,
          texto: `- Libido baixa, astenia, hormônios baixos com tróficos não elevados: **hipopituitarismo**. {q-usprp2024-060,q-unifesp2025-024}
- Cortisol baixo + rarefação de pelos + amenorreia: **insuficiência adrenal hipofisária**. {q-tp20202-009}
- ACTH baixo **não** causa hipercalemia. {q-sirio2022-004}` },
        { id: "def-insipido", titulo: "Diabetes insípido", conferir: true, diretrizes: ["endocrine-hipofise"],
          questoes: ["q-usprp2023-066","q-famema2022-023","q-einstein2026-011","q-amrigs2025-012"],
          prosa: `[[Sem ADH, o rim não concentra: **poliúria com urina diluída (osmolaridade baixa)**, sede intensa e, se a pessoa não bebe, **hipernatremia**. Depois de cirurgia hipofisária ou de trauma de crânio, poliúria de urina diluída é **diabetes insípido central**: **desmopressina**, e a osmolaridade urinária **sobe** (no nefrogênico, não sobe). A **polidipsia primária** também dá urina diluída, mas o sódio fica baixo-normal; **ácido úrico acima de 5 mg/dL** favorece diabetes insípido (o ADH baixo reduz a depuração do urato).|q-usprp2023-066,q-famema2022-023,q-einstein2026-011,q-amrigs2025-012]]`,
          texto: `- Poliúria após TCE ou transesfenoidal: **DI central** → **desmopressina**. {q-usprp2023-066,q-einstein2026-011}
- Desmopressina **aumenta a osmolaridade urinária** no central. {q-famema2022-023}
- Ácido úrico > 5: DI × polidipsia primária. {q-amrigs2025-012}` },
      ],
    },
  ],
});
