/* resumos/polifarmacia/resumo.js — resumo adaptativo de polifarmácia no idoso
   (ass-geriatria-polifarmacia): farmacocinética e farmacodinâmica do envelhecimento, critérios de Beers,
   anticolinérgicos e delirium, benzodiazepínicos e quedas (retirada gradual), hipotensão postural e
   diuréticos, sobretratamento do diabetes e hipoglicemia, iatrogenia comum, desprescrição e revisão
   de medicamentos, multimorbidade e isolamento social; armadilhas e tabela dos fármacos de risco.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- polifarmacia */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "polifarmacia",
  titulo: "Polifarmácia e iatrogenia no idoso",
  assunto: "ass-geriatria-polifarmacia",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "beers", texto: "American Geriatrics Society — Beers Criteria (2023) e critérios STOPP/START v3 (2023)", lidoEm: null },
    { id: "ms-idoso", texto: "Ministério da Saúde — Caderno de Atenção Básica nº 19 (Envelhecimento e saúde da pessoa idosa)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição.", questoes: ["q-sessp2023-095"] },
  ],
  doencas: [
    {
      id: "farmaco", titulo: "Por que o idoso reage diferente ao remédio",
      introducao: `[[Com a idade o corpo tem **mais gordura e menos água**, o rim **filtra menos** e o fígado metaboliza mais devagar; o cérebro tem **menos reserva colinérgica** e o barorreflexo é lento. O mesmo remédio, na mesma dose, dura mais e pesa mais. Somado à **polifarmácia** (cinco ou mais remédios), isso explica por que quedas, delirium e internações por remédio são tão comuns.|q-amrigs2024-017,q-adap21-112,q-udisc20262-020]]

Veja também: **Demência e delirium**, **Hipertensão**, **Diabetes** e **Cuidados paliativos**.`,
      fragmentos: [
        { id: "far-cinetica", titulo: "Farmacocinética no idoso", conferir: true,
          figuras: [{ arquivo: "figuras/idoso-e-remedios.svg", legenda: "Esquema autoral: mudanças do envelhecimento e o efeito sobre os remédios." }],
          questoes: ["q-adap21-112","q-amrigs2024-017","q-tp20231-013","q-udisc20262-020"],
          prosa: `[[Idosa com pouca massa muscular tem **creatinina normal** mesmo com **filtração baixa**: a digoxina, eliminada pelo rim, acumula (náusea, visão amarelada, bradicardia), sobretudo com desidratação por diarreia.|q-adap21-112]] [[O metabolismo **não** acelera com a idade; ao contrário, os remédios se acumulam, e a polifarmácia multiplica as interações. Calor, diuréticos e antiparkinsonianos aumentam o risco de internação.|q-amrigs2024-017,q-udisc20262-020]] [[O **diazepam**, lipossolúvel e com metabólitos ativos, dura dias no idoso; se um benzodiazepínico for mesmo necessário, prefere-se o de **meia-vida curta e metabólitos inativos** (lorazepam).|q-tp20231-013]]`,
          texto: `- Creatinina normal esconde **TFG baixa**: digoxina acumula. {q-adap21-112}
- Remédios **acumulam**; polifarmácia = interações; calor e diurético internam. {q-amrigs2024-017,q-udisc20262-020}
- Se precisar de BZD: **meia-vida curta, metabólitos inativos**. {q-tp20231-013}` },
        { id: "far-anticolinergicos", titulo: "Anticolinérgicos e delirium", conferir: true, diretrizes: ["beers"],
          questoes: ["q-usprp2021-112","q-tp20251-030","q-tp20261-041","q-unifesp2022-089","q-einstein2026-061"],
          prosa: `[[O cérebro do idoso tem **menos receptores colinérgicos**, por isso remédios anticolinérgicos o confundem com facilidade. Os **critérios de Beers** pedem evitar **tricíclicos** (amitriptilina), **relaxantes musculares** (ciclobenzaprina), anti-histamínicos de primeira geração (**hidroxizina**, difenidramina) e antimuscarínicos de bexiga (**oxibutinina**).|q-usprp2021-112,q-unifesp2022-089]] [[O quadro típico é **boca seca, retenção urinária, constipação e confusão**. Idosa com **delirium** após começar amitriptilina e difenidramina: **suspender os anticolinérgicos**, hidratar, tratar a constipação e reorientar; antipsicótico e benzodiazepínico não vêm primeiro.|q-tp20251-030,q-tp20261-041,q-einstein2026-061]]`,
          texto: `- Beers: evitar **tricíclico, relaxante muscular, hidroxizina, oxibutinina**. {q-usprp2021-112,q-unifesp2022-089}
- Boca seca + retenção + confusão: **anticolinérgico** → suspender, sem haloperidol de início. {q-tp20251-030,q-tp20261-041,q-einstein2026-061}` },
        { id: "far-benzodiazepinicos", titulo: "Benzodiazepínicos e quedas", conferir: true, diretrizes: ["beers"],
          questoes: ["q-adap22-089","q-adap24-045","q-sirio2027-088","q-sessp2023-062"],
          prosa: `[[O benzodiazepínico causa **sedação, quedas, fratura, declínio cognitivo e incontinência** no idoso. Com quedas, ele é o primeiro a sair.|q-sirio2027-088,q-sessp2023-062,q-adap24-045]] [[A retirada é **gradual** (reduzir 10 a 25% a cada 2 semanas), com **higiene do sono e terapia cognitivo-comportamental**; parar de uma vez causa abstinência e insônia de rebote, e trocar por zolpidem mantém o risco de queda.|q-adap22-089,q-adap24-045]]`,
          texto: `- BZD no idoso: **quedas, confusão, incontinência** → retirar. {q-sirio2027-088,q-sessp2023-062,q-adap24-045}
- Retirada **gradual** + higiene do sono e TCC. {q-adap22-089,q-adap24-045}` },
        { id: "far-hipotensao", titulo: "Hipotensão postural e diuréticos", conferir: true,
          questoes: ["q-scmsp2023-003","q-adap24-045","q-unicamp2023-077"],
          prosa: `[[Tontura ao levantar com queda da pressão em pé é **hipotensão postural**; o barorreflexo lento do idoso não compensa vasodilatadores, diuréticos e betabloqueadores. Avaliar e **trocar ou suspender** o anti-hipertensivo responsável é a primeira medida.|q-scmsp2023-003,q-adap24-045]] [[A **hidroclorotiazida** também eleva **ácido úrico, triglicérides e glicemia**: num idoso com pressão controlada e esses exames alterados, suspendê-la é melhor que acrescentar remédios.|q-unicamp2023-077]]`,
          texto: `- Tontura ao levantar: **hipotensão postural** → rever anti-hipertensivo. {q-scmsp2023-003,q-adap24-045}
- Tiazídico sobe ácido úrico, TG e glicemia: **suspender** antes de somar remédio. {q-unicamp2023-077}` },
        { id: "far-sobretratamento", titulo: "Sobretratamento e hipoglicemia", conferir: true, diretrizes: ["beers"],
          questoes: ["q-unifesp2024-065","q-sessp2024-092"],
          prosa: `[[No idoso frágil, **HbA1c de 5,9%** com sulfonilureia e insulina é **excesso**: o risco é a **hipoglicemia** (queda, arritmia, confusão). Reduzem-se os remédios do diabetes, com meta mais folgada.|q-unifesp2024-065]] [[A **sulfonilureia** acima dos 80 anos é exemplo clássico de sobretratamento; estatina no alto risco, IECA pós-infarto, tiotrópio na DPOC e antidepressivo na depressão continuam úteis.|q-sessp2024-092]]`,
          texto: `- HbA1c 5,9% com insulina e sulfonilureia: **reduzir**, risco de hipoglicemia. {q-unifesp2024-065}
- Sobretratamento típico: **sulfonilureia após 80 anos**. {q-sessp2024-092}` },
        { id: "far-iatrogenia", titulo: "Iatrogenia comum", conferir: true,
          questoes: ["q-sessp2023-062","q-einstein2022-063","q-tp20232-117"],
          prosa: `[[Quinolonas confundem o idoso; IECA dá tosse; antipsicóticos dão **parkinsonismo**; e até a **vitamina D** em excesso causa hipercalcemia: nenhum remédio tem risco nulo.|q-sessp2023-062]] [[A **hidroclorotiazida** causa hiperglicemia e câimbras (pela perda de potássio e magnésio); a levotiroxina em excesso, insônia.|q-einstein2022-063]] [[Broncoespasmo novo que não melhora com tratamento de asma, num idoso que toma **diclofenaco** por conta própria: antes de somar remédios, **avaliar interações e efeitos adversos** (o anti-inflamatório pode desencadear broncoespasmo).|q-tp20232-117]]`,
          texto: `- Nenhum remédio tem risco nulo (nem vitamina D). {q-sessp2023-062}
- Tiazídico: **hiperglicemia, câimbras**. {q-einstein2022-063}
- Sintoma novo: **pensar em efeito adverso** antes de somar remédio. {q-tp20232-117}` },
      ],
    },
    {
      id: "abordagem", titulo: "Desprescrever e cuidar da pessoa",
      introducao: `[[Cada especialista acrescenta um remédio para uma doença; ninguém olha o conjunto. A **revisão da lista inteira**, com a pergunta "este remédio ainda ajuda esta pessoa?", é o trabalho da atenção primária.|q-tp20222-108,q-tp20251-119,q-amrigs2020-095]]`,
      fragmentos: [
        { id: "abo-desprescricao", titulo: "Desprescrição", conferir: true, diretrizes: ["beers","ms-idoso"],
          questoes: ["q-tp20251-119","q-tp20222-108","q-tp20232-117"],
          prosa: `[[**Desprescrição** é reavaliar sistematicamente os remédios e **retirar ou reduzir** os que não trazem benefício ou causam dano. Paciente com várias doenças e 12 remédios chegando à UBS: o primeiro passo é **revisar cuidadosamente os medicamentos**, não encaminhar nem pedir mais exames.|q-tp20251-119,q-tp20222-108,q-tp20232-117]]`,
          texto: `- Muitos remédios: **revisar a lista** (desprescrição). {q-tp20251-119,q-tp20222-108,q-tp20232-117}` },
        { id: "abo-multimorbidade", titulo: "Multimorbidade e vida social", conferir: true, diretrizes: ["ms-idoso"],
          questoes: ["q-amrigs2020-095","q-tp20241-113"],
          prosa: `[[A **multimorbidade** aumenta a incapacidade; as condições mais comuns são cardiopatias, hipertensão e artrite. Mais que a expectativa de vida, importa a **expectativa de vida saudável**.|q-amrigs2020-095]] [[Idoso viúvo, sozinho e sedentário com insônia e pouco apetite precisa de **atividade física e convívio social**, não de benzodiazepínico.|q-tp20241-113]]`,
          texto: `- Multimorbidade → incapacidade; usar **expectativa de vida saudável**. {q-amrigs2020-095}
- Idoso isolado com insônia: **exercício e convívio**, não BZD. {q-tp20241-113}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["beers"],
          questoes: ["q-tp20231-013","q-scmsp2023-003","q-einstein2022-063","q-adap22-089"],
          prosa: `[[**Trocar ou retirar o diazepam**: o ideal é retirar gradualmente; a tp20231-013 cobrou **trocar por benzodiazepínico de meia-vida curta**, o que só reduz o dano.|q-tp20231-013,q-adap22-089]] [[**Qual anti-hipertensivo culpar** na hipotensão postural: a scmsp2023-003 pediu para avaliar a troca ou suspensão dos que causam o quadro, sem apontar o propranolol como o principal.|q-scmsp2023-003]] [[**Insônia pela olmesartana**: a einstein2022-063 associou a insônia à olmesartana; o efeito clássico de insônia é da levotiroxina em excesso.|q-einstein2022-063]]`,
          texto: `- Diazepam: regra **retirar**; a prova cobrou **trocar por meia-vida curta**. {q-tp20231-013,q-adap22-089}
- Hipotensão postural: **rever o conjunto** de anti-hipertensivos. {q-scmsp2023-003}
- A prova ligou insônia à **olmesartana**. {q-einstein2022-063}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: fármacos de risco no idoso",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-farmacos", titulo: "Remédio, dano e alternativa", conferir: true,
          questoes: ["q-sirio2027-088","q-unifesp2022-089","q-unifesp2024-065","q-adap21-112"],
          prosa: `[[Cada classe tem o seu dano típico.|q-sirio2027-088,q-unifesp2022-089,q-unifesp2024-065,q-adap21-112]]

| Classe | Dano no idoso | O que fazer |
|---|---|---|
| Benzodiazepínico | sedação, queda, confusão, incontinência | retirada gradual, higiene do sono, TCC |
| Anticolinérgico (tricíclico, hidroxizina, oxibutinina) | delirium, retenção, constipação | suspender, buscar alternativa |
| Sulfonilureia, insulina intensiva | hipoglicemia | metas folgadas, reduzir |
| Diurético e anti-hipertensivo em excesso | hipotensão postural, distúrbio de sódio | rever doses |
| Digoxina | acumula com TFG baixa | dose pelo rim, nível sérico |`,
          texto: `- BZD: **queda**. {q-sirio2027-088}
- Anticolinérgico: **delirium**. {q-unifesp2022-089}
- Sulfonilureia: **hipoglicemia**. {q-unifesp2024-065}
- Digoxina: **rim**. {q-adap21-112}` },
      ],
    },
  ],
});
