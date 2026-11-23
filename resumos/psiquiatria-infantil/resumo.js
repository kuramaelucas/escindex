/* resumos/psiquiatria-infantil/resumo.js — resumo adaptativo de psiquiatria da infância e adolescência
   (ass-psiq-infantil): TDAH (critérios, apresentações, avaliação em dois ambientes, metilfenidato),
   transtorno específico da aprendizagem e dislexia, TEA (sinais, triagem M-CHAT, diagnóstico clínico),
   ansiedade, enurese, autolesão, telas e estresse psicossocial, conduta; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- psiquiatria-infantil */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "psiquiatria-infantil",
  titulo: "Psiquiatria da infância e adolescência",
  assunto: "ass-psiq-infantil",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "dsm5tr-infantil", texto: "APA — DSM-5-TR (2022), transtornos do neurodesenvolvimento", lidoEm: null },
    { id: "aap-tdah", texto: "AAP — Clinical Practice Guideline for ADHD in Children and Adolescents (Pediatrics 2019) e NICE NG87", lidoEm: null },
    { id: "sbp-tea", texto: "Sociedade Brasileira de Pediatria — Manual de Orientação: Transtorno do Espectro do Autismo (2019/2023) e Manual de Orientação sobre saúde de crianças e adolescentes na era digital (2019)", lidoEm: null },
    { id: "ics-enurese", texto: "International Children's Continence Society — management of enuresis (2020)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "tdah", titulo: "TDAH",
      introducao: `[[O TDAH é um transtorno do neurodesenvolvimento: as redes frontoestriatais que regulam atenção, controle inibitório e planejamento amadurecem mais devagar, com forte herdabilidade e ambiente que modula a expressão. Por isso os sintomas começam **antes dos 12 anos**, aparecem em **dois ou mais ambientes** e causam **prejuízo** — e podem persistir na vida adulta.|q-adap21-036,q-amrigs2021-080,q-amrigs2022-020,q-amrigs2023-062]]

Veja também: **Transtornos do humor**, **Desenvolvimento neuropsicomotor**, **Adolescência** e **Violência contra a criança** quando houver resumo.`,
      fragmentos: [
        { id: "tdah-diagnostico", titulo: "Diagnóstico e avaliação", conferir: true, diretrizes: ["dsm5tr-infantil","aap-tdah"],
          figuras: [{ arquivo: "figuras/neurodesenvolvimento.svg", legenda: "Esquema autoral: o que separa TDAH, transtorno da aprendizagem e TEA, e o que fazer antes de diagnosticar." }],
          casos: ["q-usprp2024-068"],
          questoes: ["q-adap21-036","q-amrigs2021-080","q-amrigs2022-020","q-famema2025-045","q-amrigs2024-080","q-famema2025-083","q-sirio2025-059","q-uspsp5-098","q-einstein2027-065","q-usprp2024-068","q-usprp2025-007","q-amrigs2025-080"],
          prosa: `[[Critério: **seis ou mais sintomas** de desatenção e/ou de hiperatividade-impulsividade por **mais de 6 meses**, iniciados **antes dos 12 anos**, em **dois ambientes**, com prejuízo. A apresentação é **desatenta**, **hiperativa-impulsiva** ou **combinada**; QI normal não afasta.|q-adap21-036,q-famema2025-045,q-amrigs2024-080,q-famema2025-083,q-sirio2025-059]] [[O diagnóstico é clínico, mas exige informação de mais de um lugar: entrevista com os pais, **relatório da escola** e escala padronizada (**SNAP-IV** em dois cenários). Criança agitada só na consulta ou só em casa não fecha TDAH; antes, avaliar visão, audição, sono e telas.|q-uspsp5-098,q-einstein2027-065,q-usprp2024-068,q-usprp2025-007]] [[Sintomas em vários contextos indicam gravidade; o humor irritável é o principal preditor de transtorno da conduta.|q-amrigs2025-080,q-amrigs2022-020]]`,
          texto: `- **≥ 6 sintomas, > 6 meses, antes dos 12 anos, 2 ambientes, prejuízo**. {q-adap21-036,q-famema2025-045,q-amrigs2024-080,q-famema2025-083,q-sirio2025-059}
- **Relatório da escola + SNAP-IV** antes de confirmar. {q-uspsp5-098,q-einstein2027-065,q-usprp2024-068,q-usprp2025-007}
- Neurobiológico, persiste no adulto. {q-amrigs2021-080,q-amrigs2022-020,q-amrigs2025-080}` },
        { id: "tdah-tratamento", titulo: "Tratamento", conferir: true, diretrizes: ["aap-tdah"],
          questoes: ["q-adap26-092","q-amrigs2023-062","q-amrigs2025-079","q-amrigs2020-062","q-tp20251-113"],
          prosa: `[[Em idade escolar: **metilfenidato** (primeira linha) com **orientação aos pais, à escola** e intervenção comportamental; benzodiazepínico não trata TDAH. O estimulante melhora atenção, impulsividade e também irritabilidade, autoestima e relações.|q-adap26-092,q-amrigs2023-062,q-amrigs2025-079]] [[Estimulante é contraindicado em cardiopatia ou arritmia conhecida; na atenção primária, o **relato dos professores** monitora a resposta.|q-amrigs2020-062,q-tp20251-113]]`,
          texto: `- **Metilfenidato + pais + escola**. {q-adap26-092,q-amrigs2023-062,q-amrigs2025-079}
- Cardiopatia: contraindicação; monitorar pela escola. {q-amrigs2020-062,q-tp20251-113}` },
      ],
    },
    {
      id: "aprendizagem", titulo: "Transtorno específico da aprendizagem",
      introducao: `[[A dificuldade fica numa habilidade — ler, escrever ou calcular — e não na inteligência nem na atenção: a criança compreende bem o que escuta e se expressa bem oralmente, mas lê de forma lenta e silabada.|q-unifesp2026-092,q-usprp2021-040]]`,
      fragmentos: [
        { id: "apr-dislexia", titulo: "Dislexia e avaliação", conferir: true, diretrizes: ["dsm5tr-infantil"],
          questoes: ["q-unifesp2026-092","q-usprp2021-040","q-tp20251-049","q-simepm89-087"],
          prosa: `[[Bom desempenho oral, pouco rendimento em provas escritas e SNAP-IV baixo: **transtorno específico da aprendizagem**, não TDAH. Dificuldade em copiar, confusão esquerda-direita e leitura lenta: **dislexia** — avaliação multidisciplinar e **adaptações escolares**. A **avaliação neuropsicológica** confirma o perfil.|q-unifesp2026-092,q-usprp2021-040,q-tp20251-049,q-simepm89-087]]`,
          texto: `- Oral bom, escrita ruim: **aprendizagem**; multidisciplinar e adaptação. {q-unifesp2026-092,q-usprp2021-040,q-tp20251-049,q-simepm89-087}` },
      ],
    },
    {
      id: "tea", titulo: "Transtorno do espectro autista",
      introducao: `[[O TEA é definido por dois domínios: **déficit persistente de comunicação e interação social** (pouco contato ocular, não apontar para compartilhar, dificuldade com ironia e metáfora) e **padrões restritos e repetitivos** (estereotipias, rigidez com rotina, interesses intensos, hipo ou hipersensibilidade sensorial).|q-usprp2021-036,q-famerp2022-020,q-tp20252-110]]`,
      fragmentos: [
        { id: "tea-diagnostico", titulo: "Sinais, triagem e diagnóstico", conferir: true, diretrizes: ["sbp-tea","dsm5tr-infantil"],
          casos: ["q-sessp2024-087"],
          questoes: ["q-usprp2021-036","q-famerp2022-020","q-tp20252-110","q-usprp2023-017","q-amrigs2022-080","q-sirio2027-057","q-fmabc2024-042","q-amrigs2024-068","q-amrigs2023-091","q-sessp2024-087"],
          prosa: `[[Isolamento, estereotipias, hipersensibilidade auditiva, irritação com mudança de rotina e interesse restrito (sabe 30 nomes de animais, não olha para o examinador): **TEA**. Pode ser leve, sem atraso de linguagem (comunicação pouco flexível, sem entender metáfora), e é comorbidade comum em deficiência intelectual e síndrome de Down.|q-usprp2021-036,q-famerp2022-020,q-tp20252-110,q-usprp2023-017,q-amrigs2022-080]] [[Sinal precoce: **não apontar para compartilhar interesse**. A SBP recomenda triar **todas** as crianças com **M-CHAT-R entre 16 e 30 meses**, e investigar sempre quem tem irmão ou pai com TEA ou atraso em comunicação e socialização.|q-sirio2027-057,q-fmabc2024-042,q-amrigs2024-068]] [[O diagnóstico é **clínico** (observação, entrevista, instrumentos); não há exame laboratorial. O aumento dos diagnósticos nas coortes vem de **mais informação e rastreamento**.|q-amrigs2023-091,q-sessp2024-087]] [[Tratamento: avaliação multidisciplinar, apoio escolar e treino de habilidades sociais.|q-amrigs2022-080]]`,
          texto: `- Social + repetitivo/sensorial: **TEA**. {q-usprp2021-036,q-famerp2022-020,q-tp20252-110,q-usprp2023-017}
- **M-CHAT-R 16–30 meses** para todos; não apontar. {q-sirio2027-057,q-fmabc2024-042,q-amrigs2024-068}
- Diagnóstico **clínico**; aumento por rastreio. {q-amrigs2023-091,q-sessp2024-087}
- Multidisciplinar, habilidades sociais. {q-amrigs2022-080}` },
      ],
    },
    {
      id: "outros", titulo: "Ansiedade, enurese, autolesão e telas",
      introducao: `[[Muitas queixas da infância são respostas a ambiente e fase do desenvolvimento: medo de dormir só, regressão quando nasce um irmão, sono e humor piores com excesso de telas. Antes de rotular, olhar o contexto.|q-sessp2026-051,q-unesp2026-006,q-sessp2022-060]]`,
      fragmentos: [
        { id: "out-quadros", titulo: "Quadros e conduta", conferir: true, diretrizes: ["ics-enurese","sbp-tea"],
          casos: ["q-tp20232-035"],
          questoes: ["q-sessp2026-051","q-amrigs2021-079","q-unesp2026-006","q-sessp2022-060","q-adap21-040","q-tp20232-035"],
          prosa: `[[Criança que não se adapta a atividades, precisa da mãe para dormir e vai à cama dos pais: **ansiedade**. Na **ansiedade social**, o que mais aparece é **inibição** com os pares.|q-sessp2026-051,q-amrigs2021-079]] [[Regressão e desatenção depois do nascimento de um irmão, com 4 horas de tela por dia: **estresse psicossocial e uso disfuncional de telas** — orientar hábitos e apoiar a família. Adolescente com mais tempo de tela, sono ruim e queda escolar pede limite de telas.|q-unesp2026-006,q-sessp2022-060]] [[**Enurese noturna** monossintomática (sem sintomas diurnos, urina normal): primeira linha é **orientação comportamental e alarme**, mais eficaz a longo prazo; desmopressina para situações específicas.|q-adap21-040]] [[Cortes no antebraço escondidos sob roupas: **acolher com empatia**, avaliar risco e envolver a família no plano.|q-tp20232-035]]`,
          texto: `- Ansiedade; social = **inibição**. {q-sessp2026-051,q-amrigs2021-079}
- Irmão novo + telas: **estresse**, orientar. {q-unesp2026-006,q-sessp2022-060}
- Enurese: **alarme + comportamental**. {q-adap21-040}
- Autolesão: **acolher, envolver a família**. {q-tp20232-035}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["sbp-tea"],
          questoes: ["q-sessp2022-060","q-sirio2027-057","q-amrigs2020-062"],
          prosa: `[[**Limite de telas no adolescente**: a SBP sugere 2–3 horas de lazer por dia de 11 a 18 anos; a sessp2022-060 marcou como recomendação limitar a **6 horas/dia**.|q-sessp2022-060]] [[**Apontar aos 4 anos**: a ausência de apontar é marco precoce desde os 12–18 meses; a sirio2027-057 o descreveu num menino de 4 anos como **preditivo e específico**.|q-sirio2027-057]] [[**Estimulante e coração**: contraindicação relativa, com avaliação cardiológica; a amrigs2020-062 marcou como **contraindicados** em crianças com riscos cardíacos conhecidos.|q-amrigs2020-062]]`,
          texto: `- Telas: a prova disse **6 h/dia**. {q-sessp2022-060}
- Apontar aos 4 anos. {q-sirio2027-057}
- Estimulante **contraindicado** na cardiopatia. {q-amrigs2020-062}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: TDAH, aprendizagem e TEA",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-neurodesenvolvimento", titulo: "Como separar", conferir: true,
          questoes: ["q-adap21-036","q-unifesp2026-092","q-usprp2021-036","q-sessp2026-051"],
          prosa: `[[O núcleo do problema separa os quadros.|q-adap21-036,q-unifesp2026-092,q-usprp2021-036,q-sessp2026-051]]

| | TDAH | Aprendizagem | TEA | Ansiedade |
|---|---|---|---|---|
| Núcleo | atenção e impulsividade | ler, escrever, calcular | interação social, repetição | medo, evitação |
| Onde aparece | 2+ ambientes | escola, tarefas escritas | todos, desde cedo | situações temidas |
| Avaliação | pais + escola + SNAP-IV | neuropsicológica | M-CHAT-R, clínica | entrevista |
| Tratamento | metilfenidato + comportamental | adaptação escolar | multidisciplinar | psicoterapia (TCC) |`,
          texto: `- Atenção em 2 ambientes: **TDAH**. {q-adap21-036}
- Só escrita: **aprendizagem**. {q-unifesp2026-092}
- Social e repetitivo: **TEA**. {q-usprp2021-036}
- Medo e dependência: **ansiedade**. {q-sessp2026-051}` },
      ],
    },
  ],
});
