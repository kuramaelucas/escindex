/* resumos/doencas-da-aorta/resumo.js — resumo adaptativo de doenças da aorta: aneurisma de aorta
   abdominal (rastreio, vigilância, indicação de reparo, rotura) e síndrome aórtica aguda (dissecção:
   Stanford, tratamento clínico e cirúrgico), com Marfan. Assuntos: ass-cirvasc-aneurisma (principal)
   e ass-cirvasc-disseccao (incorporado).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- doencas-da-aorta */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "doencas-da-aorta",
  titulo: "Doenças da aorta: aneurisma e dissecção",
  assunto: "ass-cirvasc-aneurisma",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "svs-aaa", texto: "Society for Vascular Surgery — practice guidelines on the care of patients with an abdominal aortic aneurysm (2018) e ESVS 2024 (aneurismas aorto-ilíacos)", lidoEm: null },
    { id: "acc-aha-aorta", texto: "ACC/AHA 2022 — Guideline for the diagnosis and management of aortic disease; ESC 2024 — peripheral arterial and aortic diseases", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "aneurisma", titulo: "Aneurisma de aorta abdominal",
      introducao: `[[Aneurisma é a dilatação **permanente** da artéria a mais de 1,5 vez o normal; na aorta abdominal, **acima de 3 cm**. A parede que cede é a **túnica média**: a inflamação crônica destrói **elastina e colágeno**, e a pressão faz o resto. Os fatores de risco são os da aterosclerose, com destaque para **tabagismo** (o mais forte), sexo masculino, idade acima de 65 anos e hipertensão; quase todos são **infrarrenais** e **fusiformes**.|q-tp20222-007,q-adap24-058,q-adap25-009]] [[Pela **lei de Laplace**, a tensão na parede aumenta com o raio: quanto maior o aneurisma, mais rápido cresce e maior o risco de **romper**. Por isso a conduta se decide pelo **diâmetro** e pela velocidade de crescimento.|q-sirio2027-037,q-fmabc2024-029]]

Veja também: **Isquemia arterial aguda e crônica**, **Doença coronariana** (dor torácica) e **Hipertensão** (emergência hipertensiva).`,
      fragmentos: [
        { id: "aaa-indicacao", titulo: "Vigiar ou operar: o diâmetro decide", conferir: true, diretrizes: ["svs-aaa"],
          questoes: ["q-unifesp2023-084","q-unifesp2025-009","q-fmabc2024-029","q-usprp2022-037","q-sirio2027-037","q-adap24-058","q-adap25-009","q-unicamp2022-032","q-unifesp2024-001","q-einstein2023-016","q-fmabc2023-039","q-tp20222-007"],
          prosa: `[[Aneurisma **assintomático abaixo de 5,5 cm** (homem): **vigilância com ultrassom** (de 4 a 5,4 cm, a cada 6 a 12 meses) e controle de risco — **parar de fumar**, estatina, pressão. Achado incidental num paciente com cólica renal não muda isso.|q-unifesp2023-084,q-unifesp2025-009,q-fmabc2024-029,q-usprp2022-037]] [[Indicações de **reparo eletivo**: **≥ 5,5 cm no homem**, **≥ 5,0 cm na mulher** (rompe com diâmetro menor), crescimento **> 1 cm/ano** (ou > 0,5 cm em 6 meses), aneurisma **sintomático** de qualquer tamanho e **sacular** (forma de maior risco). A via **endovascular** é preferida quando a anatomia permite (colo adequado); a aberta, no jovem com boa reserva ou anatomia desfavorável. Aneurisma grande que doeu e parou, sem rotura na imagem, vai para cirurgia **eletiva breve** depois de estratificar o risco.|q-sirio2027-037,q-adap24-058,q-adap25-009,q-unicamp2022-032,q-unifesp2024-001,q-einstein2023-016]] [[O risco de rotura sobe com diâmetro, crescimento rápido, sexo feminino, tabagismo ativo, hipertensão e **DPOC em uso de corticoide**.|q-fmabc2023-039]]`,
          texto: `- < 5,5 cm assintomático: **ultrassom a cada 6–12 meses** e controle de risco. {q-unifesp2023-084,q-unifesp2025-009,q-fmabc2024-029,q-usprp2022-037}
- Reparo: **≥ 5,5 cm (homem)**, **≥ 5,0 cm (mulher)**, sintomático ou sacular. {q-sirio2027-037,q-adap25-009,q-unicamp2022-032,q-unifesp2024-001}
- Anatomia favorável: **endovascular** + estatina. {q-adap24-058}
- Grande que doeu e parou, sem rotura: **cirurgia eletiva** após estratificar. {q-einstein2023-016}
- Risco de rotura: **DPOC com corticoide**. {q-fmabc2023-039}
- Camada que cede no aneurisma: **túnica média**. {q-tp20222-007}` },
        { id: "aaa-rotura", titulo: "Rotura: dor, síncope e centro cirúrgico", conferir: true, diretrizes: ["svs-aaa"],
          questoes: ["q-usp2022-077","q-unesp2023-075","q-sirio2023-022","q-unesp2025-080","q-adap23-084","q-usprp2024-035","q-uspsp3-108","q-usprp2022-038","q-sirio2026-031"],
          prosa: `[[A tríade da rotura: **dor abdominal ou lombar súbita**, **hipotensão/síncope** e **massa pulsátil**. A rotura costuma ser **retroperitoneal** e se **tampona** por horas, o que dá tempo. Paciente **instável** com diagnóstico clínico vai **direto ao centro cirúrgico, sem tomografia**, com **hipotensão permissiva** (PAS 70–90 mmHg, para não deslocar o coágulo) e sangue precoce. **Estável** com suspeita: **angiotomografia de urgência**, que define a anatomia para o reparo endovascular.|q-usp2022-077,q-unesp2023-075,q-sirio2023-022,q-unesp2025-080,q-adap23-084,q-usprp2024-035,q-uspsp3-108]] [[Complicações do reparo: depois do clampeamento e da reposição maciça, **colite isquêmica** do sigmoide (a artéria mesentérica inferior é sacrificada); ao **desclampear**, **hipotensão** pela reperfusão súbita dos membros, com liberação de mediadores vasodilatadores e ácido.|q-usprp2022-038,q-sirio2026-031]]`,
          texto: `- Dor lombar súbita + síncope + massa pulsátil: **rotura** (às vezes tamponada). {q-usp2022-077,q-unesp2023-075,q-sirio2023-022}
- Instável: **centro cirúrgico sem tomografia**, hipotensão permissiva. {q-adap23-084,q-unesp2025-080,q-usprp2024-035}
- Estável com suspeita: **angiotomografia**. {q-uspsp3-108}
- Pós-operatório com diarreia sanguinolenta: **colite isquêmica**. {q-usprp2022-038}
- Hipotensão ao desclampear: **reperfusão**. {q-sirio2026-031}` },
      ],
    },
    {
      id: "disseccao", titulo: "Dissecção de aorta",
      introducao: `[[Na dissecção, a **íntima rasga** e o sangue entra na **camada média**, abrindo um **falso lúmen** que avança ao longo da aorta. O terreno é a média enfraquecida: **hipertensão** (o principal fator), **Marfan** e outras doenças do colágeno, valva bicúspide, cocaína. O quadro é a **dor torácica súbita, lancinante, "rasgando", irradiada para o dorso** e que migra conforme a dissecção avança; **diferença de pressão entre os braços**, déficit de pulso, sopro de insuficiência aórtica, AVC ou isquemia mesentérica aparecem quando o falso lúmen fecha ramos.|q-einstein2022-008,q-adap26-018,q-sessp2022-001,q-sirio2026-010]]`,
      fragmentos: [
        { id: "dis-diagnostico", titulo: "Suspeitar e classificar (Stanford)", conferir: true, diretrizes: ["acc-aha-aorta"],
          questoes: ["q-einstein2022-008","q-sirio2026-010","q-unicampdis2024-019","q-usprp2023-082","q-unifesp2025-004"],
          prosa: `[[Confirma-se com **angiotomografia de aorta** (ou ecocardiograma transesofágico no instável). A classificação de **Stanford** decide a conduta: **tipo A** pega a **aorta ascendente** (qualquer que seja a extensão) e mata por tamponamento, insuficiência aórtica e coronária — **cirurgia de emergência**; **tipo B** começa **depois da subclávia esquerda** — tratamento **clínico**, salvo complicação.|q-einstein2022-008,q-sirio2026-010,q-unicampdis2024-019,q-usprp2023-082,q-unifesp2025-004]]`,
          texto: `- Dor rasgante para o dorso + assimetria de pulso/PA: **dissecção** → **angiotomografia**. {q-einstein2022-008,q-sirio2026-010,q-unicampdis2024-019}
- **Tipo A** (ascendente): **cirurgia**; **tipo B**: clínico. {q-usprp2023-082,q-unifesp2025-004}` },
        { id: "dis-tratamento", titulo: "Tratamento: betabloqueador primeiro", conferir: true, diretrizes: ["acc-aha-aorta"],
          questoes: ["q-adap25-004","q-adap26-018","q-einstein2022-009","q-usp2025-086","q-uspsp3-077","q-scmsp2023-019","q-einstein2024-017","q-usprp2027-067","q-sessp2022-001","q-uspsp4-053","q-unifesp2026-018"],
          prosa: `[[Para frear o rasgo, reduz-se a força com que o sangue bate na parede (dP/dt): **betabloqueador venoso primeiro** (**esmolol**, metoprolol) até **FC ≤ 60 bpm**, depois **vasodilatador** (nitroprussiato) se a **PAS** continuar acima de **100–120 mmHg**, e **morfina** para a dor, em **UTI**. Vasodilatador antes do betabloqueador provoca taquicardia reflexa e piora a dissecção.|q-adap25-004,q-adap26-018,q-einstein2022-009,q-usp2025-086,q-uspsp3-077,q-scmsp2023-019,q-einstein2024-017]] [[**Tipo B não complicada**: manter o **tratamento medicamentoso**. **Tipo B complicada** (rotura, hemotórax, isquemia de órgão, dor ou hipertensão refratárias): **endovascular**. Tipo A, ou dissecção com **choque hemorrágico**: **cirurgia de emergência**.|q-usprp2027-067,q-unifesp2026-018,q-sessp2022-001,q-uspsp4-053]]`,
          texto: `- **Betabloqueador IV** (FC ≤ 60) → vasodilatador se PAS alta; morfina; UTI. {q-adap25-004,q-einstein2022-009,q-usp2025-086,q-uspsp3-077,q-scmsp2023-019,q-einstein2024-017}
- Tipo A: betabloqueador e **cirurgia de emergência**. {q-adap26-018,q-sessp2022-001}
- Tipo B estável: **clínico**; complicada: **endovascular**. {q-usprp2027-067,q-unifesp2026-018}
- Choque hemorrágico: **cirurgia já**. {q-uspsp4-053}` },
        { id: "dis-marfan", titulo: "Marfan e a aorta ascendente", conferir: true, diretrizes: ["acc-aha-aorta"],
          questoes: ["q-scmsp2026-004","q-didepm-062"],
          prosa: `[[No **Marfan** (fibrilina defeituosa: alto, magro, aracnodactilia, luxação do cristalino), a raiz da aorta dilata e disseca com diâmetro menor. Acompanha-se com **ecocardiograma anual**, **betabloqueador ou losartana** para frear a dilatação, e **cirurgia eletiva da raiz** com cerca de **5 cm**, ou antes (≥ 4,5 cm) se **cresce ≥ 0,5 cm/ano** ou há **história familiar de dissecção**.|q-scmsp2026-004,q-didepm-062]]`,
          texto: `- Marfan: **betabloqueador**; cirurgia da raiz com 5 cm, ou antes se cresce 0,5 cm/ano ou há dissecção na família. {q-scmsp2026-004,q-didepm-062}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-scmsp2025-018"],
          prosa: `[[O **D-dímero** tem alta sensibilidade para dissecção: **normal ajuda a afastar**, mas **elevado não confirma** (valor preditivo positivo baixo, sobe em muitas doenças). A prova perguntou qual achado **não** faz parte do quadro, e a resposta era justamente "D-dímero com VPP acima de 90%".|q-scmsp2025-018]]`,
          texto: `- D-dímero: bom para **excluir**, não para confirmar. {q-scmsp2025-018}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: aneurisma roto × dissecção",
      introducao: `Os dois são dor súbita e intensa num hipertenso tabagista; o lugar da dor e o exame separam.`,
      fragmentos: [
        { id: "cmp-aorta", titulo: "Dor, exame e conduta", conferir: true,
          questoes: ["q-usp2022-077","q-einstein2022-008"],
          prosa: `| | Aneurisma abdominal roto | Dissecção de aorta |
| --- | --- | --- |
| Dor | Abdominal ou lombar súbita | Torácica rasgante, para o dorso, migra |
| Exame | Massa pulsátil, hipotensão, síncope | PA diferente entre os braços, déficit de pulso |
| Instável | Centro cirúrgico sem tomografia | Tipo A: cirurgia |
| Estável | Angiotomografia e reparo | Betabloqueador; tipo B clínico |`,
          texto: `- Lombar + massa pulsátil: **aneurisma roto**; torácica para o dorso + assimetria: **dissecção**. {q-usp2022-077,q-einstein2022-008}` },
      ],
    },
  ],
});
