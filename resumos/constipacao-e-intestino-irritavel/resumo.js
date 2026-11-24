/* resumos/constipacao-e-intestino-irritavel/resumo.js — resumo adaptativo de constipação intestinal
   (ass-gastro-constipacao): constipação funcional na criança (diagnóstico clínico, escape fecal,
   desimpactação, manutenção com PEG ou lactulose, sinais de alarme, disfunção vesicointestinal),
   dor abdominal funcional, constipação no adulto (medidas, laxante osmótico, dissinergia, sinais de
   alarme, fecaloma) e síndrome do intestino irritável; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- constipacao-e-intestino-irritavel */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "constipacao-e-intestino-irritavel",
  titulo: "Constipação e intestino irritável",
  assunto: "ass-gastro-constipacao",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "espghan-constipacao", texto: "ESPGHAN/NASPGHAN — Evaluation and treatment of functional constipation in infants and children (2014); critérios de Roma IV (2016)", lidoEm: null },
    { id: "acg-constipacao", texto: "AGA/ACG — Chronic idiopathic constipation (2023) e ACG — Irritable bowel syndrome (2021)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "crianca", titulo: "Constipação funcional na criança",
      introducao: `[[Quase toda constipação da criança é **funcional**: depois de uma evacuação dolorosa (desfralde, escola, febre), a criança **segura as fezes**, que ficam secas e grossas, o reto distende e perde a sensibilidade, e a próxima evacuação dói ainda mais. Com o reto cheio, fezes líquidas **escapam em volta** do fecaloma e sujam a roupa, o que a família costuma chamar de diarreia.|q-usprp2021-011,q-unicampdis2025-072,q-adap25-088]]

Veja também: **Diarreia e desidratação**, **Doença inflamatória intestinal**, **Abdome agudo no recém-nascido** (Hirschsprung) e **Infecção urinária**.`,
      fragmentos: [
        { id: "cri-diagnostico", titulo: "Diagnóstico clínico e sinais de alarme", conferir: true, diretrizes: ["espghan-constipacao"],
          figuras: [{ arquivo: "figuras/ciclo-retencao.svg", legenda: "Esquema autoral: o ciclo de dor, retenção e escape fecal na constipação funcional da criança." }],
          questoes: ["q-usprp2021-011","q-iamspe2021-034","q-unicampdis2025-072","q-unicamp2022-043","q-fmabc2023-057"],
          prosa: `[[O diagnóstico é **clínico** (critérios de Roma IV): evacuações raras e dolorosas, fezes calibrosas que entopem o vaso, postura de retenção, fecaloma palpável e **escape fecal retentivo**. Radiografia e enema opaco não são necessários na primeira consulta.|q-usprp2021-011,q-iamspe2021-034,q-unicampdis2025-072,q-fmabc2023-057]] [[Sinais de alarme mandam investigar causa orgânica (Hirschsprung, hipotireoidismo, doença celíaca, alergia): início no primeiro mês, eliminação de mecônio após 48 horas, **déficit de crescimento**, vômitos biliosos, sangue nas fezes, alteração neurológica.|q-unicamp2022-043]]`,
          texto: `- Diagnóstico **clínico**; escape fecal é **retenção**, não diarreia. {q-usprp2021-011,q-iamspe2021-034,q-unicampdis2025-072,q-fmabc2023-057}
- Alarme: **déficit de crescimento**, mecônio tardio, vômito bilioso. {q-unicamp2022-043}` },
        { id: "cri-desimpactacao", titulo: "Desimpactação", conferir: true, diretrizes: ["espghan-constipacao"],
          questoes: ["q-unifesp2022-077","q-adap25-088","q-einstein2027-033","q-unicampdis2024-033"],
          prosa: `[[Com **fecaloma** (massa palpável, escape), o primeiro passo é **desimpactar**: **polietilenoglicol (PEG) em dose alta** (1 a 1,5 g/kg/dia) por 3 a 6 dias, ou enemas quando necessário. Começar direto pela manutenção, com o reto cheio, só aumenta o escape.|q-unifesp2022-077,q-adap25-088,q-einstein2027-033,q-unicampdis2024-033]]`,
          texto: `- Fecaloma: **desimpactar com PEG em dose alta**, depois manter. {q-unifesp2022-077,q-adap25-088,q-einstein2027-033,q-unicampdis2024-033}` },
        { id: "cri-manutencao", titulo: "Manutenção e hábito", conferir: true, diretrizes: ["espghan-constipacao"],
          questoes: ["q-amrigs2025-064","q-fmabc2023-057","q-tp20222-053","q-unifesp2025-088","q-famerp2022-028"],
          prosa: `[[A manutenção é com **laxante osmótico** (**PEG** 0,5 g/kg/dia, ou **lactulose** no lactente) **por meses**, até o reto voltar ao tamanho normal, junto com **sentar no vaso depois das refeições**, água e fibra. Fibra sozinha não basta, e probiótico e exclusão do leite não são a primeira medida.|q-amrigs2025-064,q-fmabc2023-057,q-tp20222-053,q-unifesp2025-088]] [[O reto cheio comprime a bexiga: **infecção urinária de repetição** e urgência no desfralde com fezes duras melhoram tratando a constipação com **PEG** (disfunção vesicointestinal).|q-famerp2022-028]]`,
          texto: `- Manutenção: **PEG (ou lactulose no lactente) por meses** + rotina no vaso. {q-amrigs2025-064,q-fmabc2023-057,q-tp20222-053,q-unifesp2025-088}
- ITU de repetição com constipação: **tratar a constipação (PEG)**. {q-famerp2022-028}` },
        { id: "cri-dor-funcional", titulo: "Dor abdominal funcional", conferir: true, diretrizes: ["espghan-constipacao"],
          questoes: ["q-einstein2023-043","q-unicampdis2025-023"],
          prosa: `[[Dor abdominal **periumbilical recorrente** em criança que cresce bem, sem sinais de alarme (perda de peso, sangue, febre, dor que acorda), é **dor abdominal funcional**; se vem em crises com palidez, náusea e alívio com repouso, e história familiar de enxaqueca, é **migrânea abdominal**. Exames extensos não ajudam.|q-einstein2023-043,q-unicampdis2025-023]]`,
          texto: `- Dor periumbilical recorrente sem alarme: **dor abdominal funcional** (migrânea abdominal). {q-einstein2023-043,q-unicampdis2025-023}` },
      ],
    },
    {
      id: "adulto", titulo: "Constipação no adulto",
      introducao: `[[No adulto a constipação também é quase sempre funcional (pouca fibra, pouca água, pouco movimento) ou causada por remédios. Duas exceções mudam a conduta: a **evacuação obstruída** por músculos do assoalho que não relaxam, e a constipação **nova com sinais de alarme**, que pode ser câncer.|q-adap22-077,q-famema2025-021,q-adap21-011]]`,
      fragmentos: [
        { id: "adu-funcional", titulo: "Funcional e dissinergia", conferir: true, diretrizes: ["acg-constipacao"],
          questoes: ["q-adap22-077","q-famema2025-021"],
          prosa: `[[Jovem sem sinais de alarme: **fibras, água, hábito intestinal** e, se preciso, **laxante osmótico (PEG)** como primeira escolha. Estimulante diário e enema de rotina não são manutenção, e colonoscopia não é necessária.|q-adap22-077]] [[Esforço enorme com fezes até moles, sensação de bloqueio: na **dissinergia do assoalho pélvico**, o músculo puborretal contrai em vez de relaxar na evacuação (manometria anorretal). O tratamento é **biofeedback**.|q-famema2025-021]]`,
          texto: `- Sem alarme: **fibra, água, PEG**; sem colonoscopia. {q-adap22-077}
- Dissinergia na manometria: **biofeedback**. {q-famema2025-021}` },
        { id: "adu-alarme", titulo: "Constipação nova com alarme e fecaloma", conferir: true, diretrizes: ["acg-constipacao"],
          questoes: ["q-adap21-011","q-unicampdis2025-054"],
          prosa: `[[Constipação **de início recente** depois dos 50 anos, **fezes afiladas**, **perda de peso** e **anemia ferropriva** são câncer colorretal até prova em contrário: **colonoscopia com biópsias**, não laxante e retorno.|q-adap21-011]] [[Idoso acamado ou em uso de opioide sem evacuar há dias, com distensão e gases presentes, tem **fecaloma**: **desimpactação** (retirada manual e enema).|q-unicampdis2025-054]]`,
          texto: `- Constipação nova + perda de peso + anemia: **colonoscopia**. {q-adap21-011}
- Idoso sem evacuar, gases presentes: **fecaloma → desimpactar**. {q-unicampdis2025-054}` },
      ],
    },
    {
      id: "sii", titulo: "Síndrome do intestino irritável",
      introducao: `[[O intestino irritável é um distúrbio da **interação intestino-cérebro**: o intestino é mais sensível à distensão (hipersensibilidade visceral) e tem motilidade alterada. A **dor melhora ou muda com a evacuação** e vem com mudança na frequência ou na forma das fezes; não há sangue, perda de peso nem sintoma noturno.|q-unicamp2022-005,q-usprp2027-029,q-sirio2021-018]]`,
      fragmentos: [
        { id: "sii-criterios", titulo: "Critérios de Roma e sinais de alarme", conferir: true, diretrizes: ["acg-constipacao"],
          questoes: ["q-unicamp2022-005","q-usprp2027-029","q-sirio2021-018","q-tp20241-033","q-tp20231-016"],
          prosa: `[[Dor abdominal recorrente (ao menos um dia por semana) que **se relaciona à evacuação** e **muda a frequência ou a forma das fezes**, com distensão e sensação de evacuação incompleta: **síndrome do intestino irritável**. **Acordar à noite com urgência** não é próprio dela e sugere doença orgânica.|q-unicamp2022-005,q-usprp2027-029,q-sirio2021-018]] [[Ela pode começar depois de uma **gastroenterite aguda** (forma pós-infecciosa).|q-tp20241-033]] [[Sintomas **novos depois dos 50 anos** pedem **colonoscopia** antes de rotular como intestino irritável.|q-tp20231-016]]`,
          texto: `- Dor ligada à evacuação + mudança das fezes: **SII**; urgência noturna **não** é. {q-unicamp2022-005,q-usprp2027-029,q-sirio2021-018}
- Pode começar após **gastroenterite**. {q-tp20241-033}
- Início após 50 anos: **colonoscopia**. {q-tp20231-016}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["espghan-constipacao"],
          questoes: ["q-tp20222-053","q-unifesp2022-077","q-iamspe2021-034","q-tp20231-016"],
          prosa: `[[**Desimpactar ou só manter?** Com fezes palpáveis e escape, a regra é desimpactar primeiro (unifesp2022-077); a tp20222-053, com quadro semelhante, cobrou **medidas dietéticas e laxante osmótico**.|q-tp20222-053,q-unifesp2022-077]] [[**Encoprese e psicólogo**: o escape retentivo melhora tratando a constipação; acompanhamento psicológico não é obrigatório.|q-iamspe2021-034]] [[**Intestino irritável na mulher de 60 anos**: o diagnóstico é possível, mas a idade exige **colonoscopia**, como cobrou a tp20231-016.|q-tp20231-016]]`,
          texto: `- A prova cobrou laxante e dieta sem desimpactação explícita. {q-tp20222-053,q-unifesp2022-077}
- Escape: tratar a **constipação**. {q-iamspe2021-034}
- SII após 50 anos: **colonoscopia**. {q-tp20231-016}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: constipação em cada idade",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-constipacao", titulo: "Causa típica, alarme e conduta", conferir: true,
          questoes: ["q-unifesp2025-088","q-adap25-088","q-adap22-077","q-adap21-011"],
          prosa: `[[A idade muda a causa e o que procurar.|q-unifesp2025-088,q-adap25-088,q-adap22-077,q-adap21-011]]

| Quem | Causa típica | Alarme | Conduta |
| Lactente | introdução alimentar | mecônio tardio, déficit de crescimento | lactulose |
| Criança | retenção após dor | sangue, vômito bilioso, déficit | desimpactar e PEG por meses |
| Adulto jovem | pouca fibra e água; dissinergia | perda de peso, sangue | fibra, PEG; biofeedback |
| Acima de 50 anos | câncer até prova em contrário se nova | anemia, fezes afiladas | colonoscopia |`,
          texto: `- Lactente: **lactulose**. {q-unifesp2025-088}
- Criança: **desimpactar**. {q-adap25-088}
- Adulto: **PEG**. {q-adap22-077}
- Nova após 50: **colonoscopia**. {q-adap21-011}` },
      ],
    },
  ],
});
