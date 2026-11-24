/* resumos/diverticulite/resumo.js — resumo adaptativo de doença diverticular (ass-diverticulite):
   formação do pseudodivertículo, diverticulite aguda (diagnóstico por TC, Hinchey e WSES), tratamento
   escalonado (sem antibiótico, antibiótico, drenagem, cirurgia, Hartmann), colonoscopia depois, fístula
   colovesical, cirurgia eletiva, hemorragia diverticular e HDB; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- diverticulite */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "diverticulite",
  titulo: "Doença diverticular: diverticulite e sangramento",
  assunto: "ass-diverticulite",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "wses-2020", texto: "Sartelli et al. — 2020 update of the WSES guidelines for the management of acute colonic diverticulitis in the emergency setting (World J Emerg Surg 2020)", lidoEm: null },
    { id: "ascrs-2020", texto: "ASCRS — Clinical Practice Guidelines for the Management of Left-sided Colonic Diverticulitis (Dis Colon Rectum 2020) e AGA Clinical Practice Update (2021)", lidoEm: null },
    { id: "acg-hdb", texto: "ACG Clinical Guideline — Management of Patients With Acute Lower Gastrointestinal Bleeding (Am J Gastroenterol 2023)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada; entra a reposição q-amrigs2020-039-ia", questoes: ["q-amrigs2020-039"] },
  ],
  doencas: [
    {
      id: "doenca", titulo: "O divertículo e a inflamação",
      introducao: `[[O divertículo do cólon é um **pseudodivertículo**: só mucosa e submucosa herniam pela camada muscular, nos pontos fracos onde os vasos retos a atravessam. Pressão intraluminal alta (dieta pobre em fibras, segmentação vigorosa do sigmoide) empurra a mucosa por essas brechas; por isso o sigmoide, de menor calibre e maior pressão, concentra a doença no Ocidente. Ter divertículos é **diverticulose**; a maioria nunca tem sintoma.|q-amrigs2022-027,q-adap24-009]]

Veja também: **Câncer colorretal**, **Hemorragia digestiva**, **Abdome agudo** e **Cirurgia de urgência do cólon** quando houver resumo.`,
      fragmentos: [
        { id: "doe-diagnostico", titulo: "Diagnóstico da diverticulite", conferir: true, diretrizes: ["wses-2020"],
          figuras: [{ arquivo: "figuras/hinchey-conduta.svg", legenda: "Esquema autoral: da diverticulite simples à peritonite fecal, com a conduta de cada estágio." }],
          casos: ["q-einstein2024-021"],
          questoes: ["q-amrigs2022-027","q-adap24-009","q-amrigs2021-037","q-amrigs2021-038","q-unifesp2022-007","q-einstein2026-016","q-sessp2025-029","q-einstein2024-021"],
          prosa: `[[A obstrução do colo do divertículo por fezes leva a inflamação e microperfuração: dor na **fossa ilíaca esquerda** (às vezes hipogástrio ou à direita, quando o sigmoide é redundante), febre, leucocitose e PCR alta, em idoso constipado.|q-amrigs2021-037,q-unifesp2022-007,q-einstein2026-016]] [[O exame que confirma, classifica e guia a conduta é a **tomografia de abdome com contraste**: espessamento parietal, densificação da gordura, ar ou coleção.|q-amrigs2021-038,q-unifesp2022-007,q-einstein2026-016,q-sessp2025-029]] [[Divertículos também existem no delgado; a TC mostra a mesma inflamação em outra alça.|q-einstein2024-021]] [[Sangramento e dor ausentes, colonoscopia com óstios no sigmoide: apenas **doença diverticular**.|q-adap24-009,q-amrigs2022-027]]`,
          texto: `- Pseudodivertículo: só **mucosa e submucosa**. {q-amrigs2022-027}
- Dor em FIE, febre: diverticulite; confirmar com **TC com contraste**. {q-amrigs2021-037,q-amrigs2021-038,q-unifesp2022-007,q-einstein2026-016,q-sessp2025-029}
- Pode ser de **delgado**. {q-einstein2024-021}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento pela gravidade",
      introducao: `[[A conduta segue a tomografia. **Hinchey**: I abscesso pericólico; II abscesso pélvico ou à distância; III peritonite purulenta; IV peritonite fecal. A **WSES** acrescenta o estágio 0 (não complicada) e separa ar pericólico (1A), abscesso < 4–5 cm (1B), abscesso ≥ 4–5 cm (2A), ar à distância (2B), líquido difuso (3) e (4).|q-fmabc2025-035,q-fmabc2023-033,q-unesp2021-062,q-famema2022-066,q-sessp2025-022]]`,
      fragmentos: [
        { id: "tra-simples", titulo: "Não complicada", conferir: true, diretrizes: ["wses-2020","ascrs-2020"],
          casos: ["q-iamspe2025-031","q-usp2023-001","q-uspsp5-062"],
          questoes: ["q-famema2022-066","q-iamspe2025-031","q-amrigs2025-024","q-usp2023-001","q-uspsp5-062","q-scmsp2021-040","q-sessp2022-021","q-fmabc2025-012","q-amrigs2025-029","q-didepm-002"],
          prosa: `[[Diverticulite não complicada em imunocompetente sem sinais de sepse resolve sozinha na maioria: **sintomáticos e dieta, sem antibiótico obrigatório**, com seguimento ambulatorial. Antibiótico (oral ou venoso) entra para quem tem comorbidade, imunossupressão, sinais sistêmicos ou PCR muito alta, e muitas provas o incluem por rotina.|q-famema2022-066,q-iamspe2025-031,q-amrigs2025-024,q-usp2023-001,q-uspsp5-062,q-scmsp2021-040,q-sessp2022-021,q-fmabc2025-012]] [[Pequenas bolhas de ar pericólicas sem abscesso (WSES 1A) em paciente estável e comendo: **tratamento não operatório** com antibiótico e vigilância clínica e da PCR.|q-amrigs2025-029]] [[Depois do primeiro episódio, **colonoscopia em 6–8 semanas**, porque um câncer pode simular ou coexistir com a diverticulite.|q-scmsp2021-040,q-sessp2022-021,q-fmabc2025-012,q-didepm-002]]`,
          texto: `- Simples: **sintomáticos**; antibiótico se risco. {q-iamspe2025-031,q-amrigs2025-024,q-usp2023-001,q-uspsp5-062}
- Ar pericólico sem abscesso: **não operatório**. {q-amrigs2025-029}
- **Colonoscopia em 6–8 semanas**. {q-scmsp2021-040,q-sessp2022-021,q-fmabc2025-012,q-didepm-002}` },
        { id: "tra-abscesso", titulo: "Abscesso", conferir: true, diretrizes: ["wses-2020"],
          casos: ["q-scmsp2025-038","q-iamspe2025-040"],
          questoes: ["q-adap25-011","q-usp2026-037","q-unifesp2025-011","q-uspsp1-032","q-iamspe2025-040","q-scmsp2025-038","q-amrigs2020-039-ia","q-unesp2021-062","q-fmabc2023-033"],
          prosa: `[[O tamanho do abscesso decide: **até 4–5 cm, antibiótico** (gram-negativos e anaeróbios) e reavaliação, porque o antibiótico penetra bem e a coleção pequena não se drena com segurança.|q-adap25-011,q-usp2026-037,q-unesp2021-062]] [[**Acima de 4–5 cm**, a coleção não esteriliza só com antibiótico: **drenagem percutânea guiada por imagem** com antibiótico venoso. Se não há janela para punção ou falha, cirurgia.|q-unifesp2025-011,q-uspsp1-032,q-iamspe2025-040,q-scmsp2025-038,q-amrigs2020-039-ia]] [[Abscesso pélvico ou distante é Hinchey **II**.|q-fmabc2023-033]]`,
          texto: `- **< 4–5 cm: antibiótico**. {q-adap25-011,q-usp2026-037,q-unesp2021-062}
- **≥ 4–5 cm: drenagem percutânea**. {q-unifesp2025-011,q-uspsp1-032,q-iamspe2025-040,q-scmsp2025-038,q-amrigs2020-039-ia}
- Pélvico: **Hinchey II**. {q-fmabc2023-033}` },
        { id: "tra-peritonite", titulo: "Peritonite e cirurgia", conferir: true, diretrizes: ["wses-2020"],
          questoes: ["q-adap22-007","q-iamspe2026-040","q-uspsp3-102","q-fmabc2022-029","q-fmabc2025-035","q-sessp2024-027"],
          prosa: `[[Peritonite difusa (Hinchey III purulenta, IV fecal), pneumoperitônio com líquido livre: **antibiótico e cirurgia de urgência**. A operação clássica é a **retossigmoidectomia à Hartmann** (ressecção do sigmoide, colostomia terminal, fechamento do coto retal); no paciente estável, anastomose com ileostomia de proteção é alternativa.|q-adap22-007,q-iamspe2026-040,q-uspsp3-102,q-fmabc2022-029,q-fmabc2025-035]] [[O Hartmann serve para quando não é seguro anastomosar (perfuração, obstrução por tumor de sigmoide ou reto alto); tumor irressecável de reto médio obstruindo pede só **colostomia** de derivação.|q-sessp2024-027]]`,
          texto: `- Peritonite: **cirurgia**, **Hartmann** ou anastomose + ileostomia. {q-adap22-007,q-iamspe2026-040,q-uspsp3-102,q-fmabc2022-029,q-fmabc2025-035}
- Reto médio irressecável: **não é Hartmann**. {q-sessp2024-027}` },
        { id: "tra-cronica", titulo: "Fístula e cirurgia eletiva", conferir: true, diretrizes: ["ascrs-2020"],
          casos: ["q-uspsp3-111"],
          questoes: ["q-unicampdis2022-013","q-uspsp3-111","q-iamspe2021-026"],
          prosa: `[[A inflamação que cola o sigmoide na bexiga perfura para dentro dela: **fístula colovesical**, com **pneumatúria, fecalúria** e infecções urinárias de repetição em homem idoso; a causa mais comum é a diverticulite. O tratamento é **ressecção do sigmoide** com reparo ou ressecção segmentar da bexiga.|q-unicampdis2022-013,q-uspsp3-111]] [[A cirurgia eletiva não se indica pelo número de crises: indica-se por complicação (fístula, estenose), imunossupressão ou **sintomas persistentes** entre os episódios que comprometem a vida.|q-iamspe2021-026]]`,
          texto: `- Pneumatúria e fecalúria: **fístula colovesical** → ressecção. {q-unicampdis2022-013,q-uspsp3-111}
- Eletiva: **sintomas persistentes**, não número de crises. {q-iamspe2021-026}` },
      ],
    },
    {
      id: "sangramento", titulo: "Hemorragia diverticular",
      introducao: `[[O vaso reto que passa pelo colo do divertículo fica esticado sobre a cúpula; a parede fina rompe e a **arteríola sangra sem inflamação**. É a causa mais comum de hemorragia digestiva baixa volumosa no idoso: sangue vivo indolor, muitas vezes em quem usa AINE ou antiagregante — e quase sempre para sozinho.|q-einstein2027-024,q-amrigs2023-030,q-iamspe2021-032]]`,
      fragmentos: [
        { id: "san-conduta", titulo: "Abordagem da hemorragia digestiva baixa", conferir: true, diretrizes: ["acg-hdb"],
          questoes: ["q-einstein2027-024","q-amrigs2023-030","q-iamspe2021-032","q-unesp2025-066","q-unesp2026-078","q-fmabc2024-031","q-tp20232-064","q-iamspe2021-020","q-tp20202-067"],
          prosa: `[[A causa mais comum de HDB volumosa é a **doença diverticular**, não a diverticulite: a inflamação aguda raramente sangra. Cerca de 80–90% param espontaneamente; outras causas são angiodisplasia, colites, Crohn, Meckel no jovem e proctite actínica.|q-einstein2027-024,q-amrigs2023-030,q-iamspe2021-032,q-unesp2025-066,q-unesp2026-078]] [[Primeiro **estabilizar** (oxigênio, acessos calibrosos, volume, sangue); com sangramento importante, a endoscopia alta exclui fonte alta; estável, a **colonoscopia** com preparo localiza e trata.|q-fmabc2024-031,q-tp20232-064,q-unesp2025-066]] [[Sangramento ativo com instabilidade: **angiotomografia** localiza para embolização; não serve para sangramento contínuo pequeno, que vai para colonoscopia.|q-iamspe2021-020]] [[Sangramento maciço persistente, instável, sem ponto localizado: **colectomia total** (subtotal).|q-tp20202-067]]`,
          texto: `- HDB volumosa no idoso: **doença diverticular**, arteríola, sem inflamação. {q-einstein2027-024,q-amrigs2023-030,q-iamspe2021-032,q-unesp2025-066,q-unesp2026-078}
- Estabilizar → **colonoscopia**. {q-fmabc2024-031,q-tp20232-064}
- Ativo e instável: **angiotomografia**. {q-iamspe2021-020}
- Persistente sem ponto: **colectomia total**. {q-tp20202-067}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["wses-2020","ascrs-2020"],
          questoes: ["q-unesp2021-062","q-uspsp5-062","q-sessp2022-021","q-sessp2025-022","q-usp2026-037"],
          prosa: `[[**Hinchey I ambulatorial**: abscesso pericólico pequeno se trata com antibiótico, em geral internado; a unesp2021-062 aceitou **ambulatorial com antibiótico e analgésico**.|q-unesp2021-062]] [[**Antibiótico na não complicada**: as diretrizes atuais permitem omiti-lo no paciente de baixo risco; várias provas mantiveram **antibiótico** como resposta (uspsp5-062, sessp2022-021), com dieta sem resíduos.|q-uspsp5-062,q-sessp2022-021]] [[**Hinchey e a diverticulite aguda**: Hinchey classifica a diverticulite **aguda perfurada**; a sessp2025-022 marcou errado chamá-la de classificação da diverticulite "crônica".|q-sessp2025-022]] [[**Abscesso pequeno com gás**: 2 cm com focos gasosos é WSES 1B — **antibiótico**, sem drenagem (usp2026-037).|q-usp2026-037]]`,
          texto: `- Hinchey I: a prova aceitou **ambulatorial**. {q-unesp2021-062}
- Não complicada: provas dão **antibiótico**. {q-uspsp5-062,q-sessp2022-021}
- Hinchey é da **aguda**. {q-sessp2025-022}
- Abscesso 2 cm: **antibiótico**. {q-usp2026-037}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: estágio e conduta",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-estagios", titulo: "Hinchey, WSES e conduta", conferir: true,
          questoes: ["q-iamspe2025-031","q-adap25-011","q-unifesp2025-011","q-uspsp3-102","q-fmabc2022-029"],
          prosa: `[[A tomografia escolhe a conduta.|q-iamspe2025-031,q-adap25-011,q-unifesp2025-011,q-uspsp3-102,q-fmabc2022-029]]

| Tomografia | Hinchey / WSES | Conduta |
|---|---|---|
| Espessamento e gordura densificada | 0 / 0 | sintomáticos; antibiótico se risco |
| Abscesso < 4–5 cm | I / 1B | antibiótico |
| Abscesso ≥ 4–5 cm | I–II / 2A | drenagem percutânea + antibiótico |
| Peritonite purulenta | III / 3 | cirurgia (Hartmann ou anastomose + ileostomia) |
| Peritonite fecal | IV / 4 | Hartmann |`,
          texto: `- Simples: **sintomáticos**. {q-iamspe2025-031}
- Abscesso pequeno: **antibiótico**. {q-adap25-011}
- Abscesso grande: **drenagem**. {q-unifesp2025-011}
- Peritonite: **Hartmann**. {q-uspsp3-102,q-fmabc2022-029}` },
      ],
    },
  ],
});
