/* resumos/cancer-de-endometrio/resumo.js — resumo adaptativo de câncer de endométrio: fatores de risco e
   proteção, investigação do sangramento pós-menopausa (eco endometrial, biópsia, histeroscopia), pólipo e
   hiperplasia, tipos histológicos e moleculares, estadiamento, cirurgia e preservação da fertilidade.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- cancer-de-endometrio */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "cancer-de-endometrio",
  titulo: "Câncer de endométrio e sangramento pós-menopausa",
  assunto: "ass-caendometrio",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "esgo-endometrio", texto: "ESGO/ESTRO/ESP — Guidelines for the management of patients with endometrial carcinoma (2025)", lidoEm: null },
    { id: "figo-endometrio", texto: "FIGO — estadiamento do câncer do endométrio (2023), com classificação molecular", lidoEm: null },
    { id: "acog-spm", texto: "ACOG — Committee Opinion nº 734: The role of transvaginal ultrasonography in evaluating the endometrium of women with postmenopausal bleeding (2018)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada pela banca, sem reposição", questoes: ["q-scmsp2022-043"] },
  ],
  doencas: [
    {
      id: "risco", titulo: "Por que acontece",
      introducao: `[[O tipo mais comum (endometrioide, tipo I) nasce do estrogênio sem a oposição da progesterona: o endométrio prolifera sem parar, passa por hiperplasia e vira câncer. Por isso os riscos são tudo que dá estrogênio sem progesterona — anovulação crônica (SOP) antes da menopausa, obesidade depois (o tecido adiposo faz estrona), estrogênio isolado com útero, tamoxifeno, diabetes, nuliparidade e síndrome de Lynch.|q-amrigs2020-052,q-uspsp1-079,q-iamspe2022-054]] [[Contraceptivo combinado, DIU hormonal, tabagismo, atividade física e multiparidade protegem, porque reduzem o estímulo estrogênico ou dão progesterona.|q-iamspe2023-050,q-sirio2021-076]]

O tipo II (seroso, células claras) não depende de estrogênio, aparece em mulheres mais velhas e magras, com p53 alterado, e se espalha cedo.

Veja também: **Climatério** (terapia hormonal e sangramento com eco fino), **Ciclo menstrual** (sangramento uterino anormal e SOP), **Câncer de mama** (tamoxifeno).`,
      fragmentos: [
        { id: "ris-fatores", titulo: "Fatores de risco e de proteção",
          questoes: ["q-amrigs2020-052","q-iamspe2022-054","q-iamspe2023-050","q-uspsp1-079","q-sirio2021-076"],
          texto: `- Estrogênio sem oposição: **SOP** antes e **obesidade** depois da menopausa. {q-amrigs2020-052}
- Riscos: **estrogênio isolado, diabetes, anovulação crônica**. {q-uspsp1-079}
- **Tamoxifeno, SOP**, história de câncer de mama ou cólon (Lynch). {q-iamspe2022-054}
- Protegem: **contraceptivo, tabagismo, atividade física**. {q-iamspe2023-050}
- O contraceptivo hormonal **protege** o endométrio. {q-sirio2021-076}` },
      ],
    },
    {
      id: "investigacao", titulo: "Sangramento pós-menopausa",
      introducao: `[[O sangramento depois da menopausa vem quase sempre de atrofia, mas cerca de 10% é câncer, e quase todo câncer de endométrio sangra: por isso todo sangramento se investiga.|q-amrigs2023-041,q-sessp2025-061,q-iamspe2025-045]] [[O ultrassom transvaginal é o primeiro exame: eco de até 4 mm, homogêneo, torna o câncer muito improvável no primeiro episódio; eco mais espesso, heterogêneo ou sangramento que persiste pede amostra do endométrio — biópsia ambulatorial (Pipelle, cureta de Novak) ou histeroscopia com biópsia dirigida, que também vê e tira pólipos.|q-unifesp2024-054,q-scmsp2023-066,q-iamspe2021-051,q-sessp2024-061,q-unicamp2022-062,q-fmabc2025-064,q-usprp2026-068]] [[No uso de tamoxifeno, o endométrio fica espesso por edema do estroma, sem doença; o ultrassom engana, e só a mulher que sangra se investiga.|q-sessp2024-063,q-uspsp3-062]]

[[Útero com pus (piometra) na idosa esconde câncer até prova em contrário: a cérvice é obstruída pelo tumor.|q-unifesp2024-043,q-unicampdis2023-047]]`,
      fragmentos: [
        { id: "inv-conduta", titulo: "Eco endometrial, biópsia e histeroscopia", conferir: true, diretrizes: ["acog-spm"],
          figuras: [{ arquivo: "figuras/sangramento.svg", legenda: "Esquema autoral: a investigação do sangramento pós-menopausa." }],
          questoes: ["q-unifesp2024-054","q-scmsp2023-066","q-usp2023-029","q-usprp2021-063","q-usprp2026-068","q-amrigs2023-041","q-iamspe2021-051","q-iamspe2025-045","q-sessp2023-045","q-sessp2024-061","q-sessp2024-063","q-sessp2025-061","q-tp20222-099","q-tp20252-111","q-unicamp2022-062","q-unicampdis2024-108","q-uspsp5-025","q-uspsp3-062","q-sirio2026-066","q-sirio2027-079","q-fmabc2025-064","q-fmabc2026-080","q-unifesp2024-043","q-unicampdis2023-047"],
          casos: ["q-usprp2021-063","q-uspsp5-025"],
          texto: `- Causa mais provável: **atrofia**. {q-sessp2025-061,q-iamspe2025-045}
- Incomuns (< 12%): **pólipo e câncer**. {q-amrigs2023-041}
- Eco de 3 mm, primeiro episódio: **observação**. {q-unifesp2024-054}
- Histeroscopia normal com atrofia: **seguimento habitual**. {q-usp2023-029}
- Eco de 8–11 mm: **histeroscopia com biópsia**. {q-scmsp2023-066,q-iamspe2021-051,q-fmabc2025-064,q-unicamp2022-062}
- Eco de 5–6 mm com sangramento: **histeroscopia com biópsia**. {q-sessp2024-061,q-sirio2027-079}
- Eco 3,5 mm com sangramento que persiste e riscos: **biópsia ambulatorial**. {q-usprp2026-068}
- Obesa com ultrassom normal e sangramento: **biópsia endometrial**. {q-tp20252-111,q-unicampdis2024-108}
- Imagem endometrial sem cânula: **histeroscopia com biópsia**. {q-sessp2023-045}
- Melhor acurácia na banca: **cureta de Novak**. {q-sirio2026-066}
- Eco de 20 mm: **curetagem diagnóstica**. {q-tp20222-099}
- Eco de 2 cm: **histeroscopia**. {q-uspsp5-025}
- Achados das figuras: **biópsia ambulatorial**. {q-usprp2021-063}
- Diabética obesa com sangramento: **câncer**, histeroscopia com biópsia. {q-fmabc2026-080}
- Tamoxifeno com sangramento e eco de 8 mm: **histeroscopia**. {q-uspsp3-062}
- Tamoxifeno, eco de 8 mm, sem sangramento: **observação**. {q-sessp2024-063}
- Piometra na idosa: investigar **câncer de endométrio**. {q-unifesp2024-043,q-unicampdis2023-047}` },
      ],
    },
    {
      id: "precursoras", titulo: "Pólipo e hiperplasia",
      introducao: `[[A hiperplasia sem atipia regride com progestagênio (de preferência o DIU de levonorgestrel), que transforma o endométrio em secretor e depois atrófico; a hiperplasia atípica é neoplasia intraepitelial, com risco alto de câncer já presente, e se trata com histerectomia — a não ser que a mulher queira gestar, quando se tenta progestagênio com biópsias seriadas.|q-adap21-063,q-amrigs2021-057,q-usprp2023-034,q-scmsp2025-080]] [[Pólipo que sangra sai por histeroscopia, que também manda a peça para análise.|q-tp20232-094,q-fmabc2021-041,q-einstein2022-055,q-didepm-028,q-usprp2026-061]]`,
      fragmentos: [
        { id: "pre-tratamento", titulo: "Tratar pólipo e hiperplasia", conferir: true, diretrizes: ["esgo-endometrio"],
          questoes: ["q-adap21-063","q-scmsp2025-080","q-usprp2023-034","q-usprp2026-061","q-amrigs2021-057","q-tp20232-094","q-fmabc2021-041","q-einstein2022-055","q-didepm-028"],
          casos: ["q-usprp2026-061"],
          texto: `- Hiperplasia sem atipia: **DIU de levonorgestrel**, perda de peso, biópsia em 6 meses. {q-adap21-063}
- Na menacme, sem atipia, DIU-LNG: o ultrassom do eco **não era necessário**. {q-amrigs2021-057}
- Atípica com tamoxifeno, sem desejo reprodutivo: **histerectomia e anexectomia**. {q-usprp2023-034}
- Atípica querendo gestar: **DIU-LNG** e controle. {q-scmsp2025-080}
- Pólipo: **histeroscopia com remoção**. {q-tp20232-094,q-fmabc2021-041,q-einstein2022-055}
- Lesão da histeroscopia na idosa: **ressecção**. {q-usprp2026-061}
- Biópsia por aspiração inconclusiva com pólipo: **polipectomia histeroscópica**. {q-didepm-028}` },
      ],
    },
    {
      id: "cancer", titulo: "Câncer: tipos, estadiamento e tratamento",
      introducao: `[[O endometrioide de baixo grau tem bom prognóstico; o seroso, o grau 3, a invasão do estroma do colo, a invasão linfovascular e o p53 anormal pioram; a mutação de POLE tem o melhor prognóstico de todos.|q-unesp2024-037,q-simepm89-040,q-uspsp3-064,q-adap25-065,q-unesp2021-038]] [[O estadiamento é cirúrgico: histerectomia total com salpingo-ooforectomia bilateral e lavado; a avaliação dos linfonodos (sentinela ou linfadenectomia) se faz quando há risco — invasão de metade ou mais do miométrio, grau alto ou tipo II; no endometrioide grau 1 restrito ao endométrio ou com invasão superficial, o risco extrauterino é baixo.|q-einstein2023-046,q-famema2023-046,q-uspsp4-026,q-unifesp2023-045,q-unifesp2025-065,q-amrigs2022-049]]

[[A jovem que quer gestar, com endometrioide grau 1 restrito ao endométrio, pode receber progestagênio em dose alta (ou DIU) com biópsias a cada 3 a 6 meses e operar depois da prole.|q-adap23-045,q-usp2023-025,q-unesp2025-035]]`,
      fragmentos: [
        { id: "can-tratamento", titulo: "Prognóstico, cirurgia e preservação da fertilidade", conferir: true, diretrizes: ["esgo-endometrio","figo-endometrio"],
          questoes: ["q-adap25-065","q-adap23-045","q-unifesp2023-045","q-unifesp2025-065","q-usp2023-025","q-amrigs2022-049","q-famema2023-046","q-unesp2021-036","q-unesp2021-038","q-unesp2024-037","q-unesp2025-035","q-uspsp4-026","q-uspsp3-064","q-simepm89-040","q-einstein2023-046"],
          casos: ["q-uspsp3-064"],
          texto: `- Mau prognóstico: **seroso, grau 3, estroma do colo, linfovascular, p53**. {q-unesp2024-037}
- Seroso grau 3: **mais agressivo**. {q-simepm89-040}
- Melhor prognóstico: **endometrioide**. {q-uspsp3-064}
- POLE mutado: **observação**, sem adjuvância. {q-adap25-065}
- Linfonodos extensos na idosa: **tipo II**. {q-unesp2021-038}
- G1 com invasão < 50%: histerectomia, **anexectomia e lavado**. {q-einstein2023-046}
- G1 restrito, na congelação: **sem linfadenectomia**. {q-famema2023-046,q-uspsp4-026}
- G1 superficial, colo livre: **nenhum outro procedimento**. {q-unifesp2023-045}
- Tipo de alto risco: histerectomia, anexos, **linfadenectomia pélvica e para-aórtica, omentectomia**. {q-unifesp2025-065}
- Pré-tratamento **não** inclui colonoscopia. {q-amrigs2022-049}
- IA G1 operada: **seguimento**. {q-unesp2021-036}
- Jovem com tumor restrito, quer gestar: **progestagênio em dose alta**. {q-adap23-045,q-usp2023-025}
- Tumor em pólipo com POLE, quer gestar: **progestágeno 6 meses** e estilo de vida. {q-unesp2025-035}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-unifesp2024-054","q-usprp2026-068","q-sirio2026-066"],
          texto: `- Eco de até 4 mm no **primeiro** sangramento permite observar; com sangramento que **persiste** e fatores de risco, a prova já pediu **biópsia**. As duas respostas convivem. {q-unifesp2024-054,q-usprp2026-068}
- A histeroscopia com biópsia dirigida tem a melhor acurácia; a banca escolheu a **cureta de Novak**. {q-sirio2026-066}` },
      ],
    },
  ],
});
