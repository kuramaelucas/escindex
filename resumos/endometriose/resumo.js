/* resumos/endometriose/resumo.js — resumo adaptativo de endometriose e adenomiose: patogênese e quadro,
   diagnóstico por imagem e laparoscopia, tratamento clínico (progestagênio, contraceptivo, GnRH), cirurgia
   e infertilidade, adenomiose e tabela comparativa com a dismenorreia primária. Molde e regras:
   resumos/LEIA-ME.md. Conferência: npm run resumo -- endometriose */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "endometriose",
  titulo: "Endometriose e adenomiose",
  assunto: "ass-endometriose",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "eshre-endometriose", texto: "ESHRE — guideline: endometriosis (Becker et al., Hum Reprod Open 2022;hoac009, doi 10.1093/hropen/hoac009), PMC8951218", lidoEm: "2026-11-19" },
    { id: "febrasgo-endometriose", texto: "FEBRASGO — Protocolo de endometriose", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "doenca", titulo: "O que é e como se manifesta",
      introducao: `[[Endometriose é tecido parecido com endométrio fora do útero (peritônio, ovário, septo retovaginal, intestino); a teoria mais aceita é a da menstruação retrógrada, que só implanta quando a imunidade peritoneal falha. Os focos respondem ao estrogênio, sangram a cada ciclo e mantêm uma inflamação crônica (interleucinas, TNF, VEGF no líquido peritoneal) que causa dor, aderências e infertilidade.|q-fmabc2024-065,q-sirio2023-076,q-amrigs2022-056]] [[É a principal causa ginecológica de dor pélvica crônica: dismenorreia progressiva, dispareunia de profundidade, disquesia e disúria cíclicas; a intensidade da dor não acompanha a extensão da doença.|q-scmsp2023-069,q-iamspe2021-055,q-famema2021-046,q-uspsp2-032]] [[É profunda quando o foco penetra mais de 5 mm abaixo do peritônio.|q-iamspe2022-052,q-sessp2025-068]]

Veja também: **Ciclo menstrual** (dismenorreia primária e sangramento uterino anormal), **Contracepção** (contraceptivos e DIU como tratamento).`,
      fragmentos: [
        { id: "doe-quadro", titulo: "Patogênese, quadro e formas",
          questoes: ["q-scmsp2023-069","q-iamspe2021-055","q-iamspe2022-052","q-sessp2025-068","q-famema2021-046","q-fmabc2024-065","q-sirio2023-076","q-amrigs2022-056","q-uspsp2-032","q-uspsp2-040","q-usprp2022-053","q-famema2022-057"],
          prosa: `[[Massa anexial com dor e cisto de conteúdo achocolatado é endometrioma.|q-famema2022-057]] [[Dor localizada na parede abdominal, que piora ao tensionar o músculo e não muda com o ciclo, é miofascial, não endometriose.|q-usprp2022-053]] [[Implantes azulados no peritônio vistos antes confirmam a doença em quem volta com dor na gestação.|q-uspsp2-040]]`,
          texto: `- Principal causa ginecológica de dor pélvica crônica: **endometriose**. {q-scmsp2023-069}
- Dor **não se correlaciona** com o estádio. {q-iamspe2021-055}
- Pensar em toda mulher com **dismenorreia importante**. {q-famema2021-046}
- Profunda: **> 5 mm**. {q-iamspe2022-052,q-sessp2025-068}
- Líquido peritoneal com **interleucinas, TNF e VEGF**. {q-fmabc2024-065}
- Dor: **sangramento focal** dos implantes. {q-sirio2023-076}
- Relação com infertilidade: **aderências, inflamação, menos ovulação**. {q-amrigs2022-056}
- Virgem com dismenorreia e ultrassom normal: **endometriose primária**. {q-uspsp2-032}
- Massa anexial dolorosa de 5 cm: **endometrioma**. {q-famema2022-057}
- Implantes azulados prévios na gestante com dor: **endometriose**. {q-uspsp2-040}
- Dor de parede que irradia à coxa: **miofascial**. {q-usprp2022-053}` },
      ],
    },
    {
      id: "diagnostico", titulo: "Diagnóstico",
      introducao: `[[O primeiro exame é de imagem: ultrassom transvaginal (com preparo intestinal, por examinador treinado) ou ressonância magnética mapeiam endometrioma e doença profunda.|q-didepm-083,q-tp20202-083,q-tp20212-086,q-scmsp2023-068,q-famema2022-058,q-einstein2023-047]] [[A laparoscopia com biópsia é o padrão-ouro histórico, mas hoje fica para quem tem imagem negativa e não melhora com o tratamento empírico, ou já para tratar; imagem normal não exclui a doença superficial.|q-sessp2024-065,q-sessp2026-073,q-unesp2025-036,q-fmabc2023-074]]`,
      fragmentos: [
        { id: "dia-imagem", titulo: "Imagem e laparoscopia", conferir: false, diretrizes: ["eshre-endometriose"],
          figuras: [{ arquivo: "figuras/conduta.svg", legenda: "Esquema autoral: a suspeita de endometriose, do tratamento empírico à cirurgia." }],
          questoes: ["q-scmsp2023-068","q-sessp2024-065","q-sessp2026-073","q-tp20202-083","q-tp20212-086","q-famema2022-058","q-fmabc2023-074","q-einstein2023-047","q-didepm-083","q-famerp2026-020","q-unesp2025-036"],
          casos: ["q-famerp2026-020"],
          texto: `- Mapear doença profunda: **ultrassom com preparo intestinal ou ressonância**. {q-didepm-083,q-scmsp2023-068,q-tp20202-083,q-tp20212-086}
- Endometrioma de 3 cm: **ressonância** para buscar focos profundos. {q-einstein2023-047}
- Massa anexial: **ultrassom transvaginal**. {q-famema2022-058}
- Padrão-ouro: **videolaparoscopia** com histologia. {q-sessp2024-065,q-sessp2026-073}
- Lesões enegrecidas no fundo de saco ao especular **sugerem** a doença. {q-fmabc2023-074}
- Tratamento clínico **para controlar a dor**, mesmo sem confirmação. {q-unesp2025-036}
- Imagem: **profunda e endometrioma bilateral**. {q-famerp2026-020}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento clínico",
      introducao: `[[O tratamento clínico tira o estímulo hormonal dos focos: contraceptivo combinado contínuo ou progestagênio (dienogeste, desogestrel, DIU de levonorgestrel) são a primeira linha, empíricos, sem precisar confirmar por laparoscopia; o dienogeste age também direto no foco. Análogo ou antagonista do GnRH (com terapia de reposição, add-back, para o osso) fica para quem não responde, pelo hipoestrogenismo.|q-adap26-044,q-amrigs2025-048,q-unesp2026-032,q-usp2024-100,q-sirio2027-076,q-iamspe2023-056,q-amrigs2021-058,q-sirio2026-080]] [[Depois da cirurgia, quem não vai engravidar mantém hormônio para reduzir a recidiva.|q-usp2026-118,q-einstein2027-059]]`,
      fragmentos: [
        { id: "tra-clinico", titulo: "Hormônio de primeira linha e GnRH", conferir: false, diretrizes: ["eshre-endometriose"],
          questoes: ["q-adap26-044","q-usp2024-100","q-usp2026-118","q-amrigs2025-048","q-amrigs2021-058","q-iamspe2023-056","q-unesp2023-032","q-tp20231-094","q-unesp2021-039","q-unesp2026-032","q-sirio2026-080","q-sirio2027-076","q-einstein2025-057","q-einstein2027-059"],
          prosa: `[[Doença profunda sem desejo de gestar e sem obstrução pode ficar em tratamento clínico em serviço de referência.|q-unesp2023-032]] [[Com sintomas leves e controlados, o seguimento é clínico, sem exames repetidos.|q-tp20231-094,q-unesp2021-039]]`,
          texto: `- Endometrioma e espessamento sem desejo de gestar: **dienogeste ou combinado contínuo**. {q-adap26-044}
- Inicial, preservando fertilidade: **progestogênio contínuo empírico**. {q-amrigs2025-048}
- Dismenorreia e dispareunia aos 25: **anticoncepcional**. {q-unesp2026-032,q-usp2024-100}
- Adolescente com dor e ultrassom inespecífico: **combinado e reavaliar em 3 meses**. {q-einstein2025-057}
- Atenção primária, exame e ultrassom normais: **AINE e contraceptivo**. {q-unesp2021-039}
- Após laparoscopia: **DIU de progestagênio**. {q-usp2026-118}
- Pós-operatório sem desejo de gestar: **progestagênio ou combinado**. {q-einstein2027-059}
- DIU-LNG antes de GnRH: **sem hipoestrogenismo**. {q-amrigs2021-058}
- **Análogo e antagonista do GnRH** tratam. {q-iamspe2023-056}
- Dienogeste: **ação direta** no foco. {q-sirio2027-076}
- Retossigmoide só na serosa, sem desejo: **clínico em referência**. {q-unesp2023-032}
- Superficial com sintomas leves: **clínica e exame de rotina**. {q-tp20231-094}
- Maior eficácia para dor (banca): **agonista do GnRH**. {q-sirio2026-080}` },
      ],
    },
    {
      id: "cirurgia", titulo: "Cirurgia e infertilidade",
      introducao: `[[A cirurgia trata quem não responde ao remédio, quem tem obstrução (intestino, ureter) ou endometrioma grande, e remove os focos com o mínimo de dano ao ovário — excisar a cápsula do endometrioma reduz a recidiva, mas tira reserva ovariana.|q-scmsp2021-068,q-usprp2024-081,q-unicamp2023-049,q-einstein2024-051]] [[Na infertilidade, a endometriose leve operada com tubas pérvias pode tentar gestação natural; na doença extensa, a decisão entre cirurgia e fertilização in vitro depende da dor, da idade e da reserva ovariana.|q-sirio2022-068,q-sirio2025-074,q-unifesp2026-044,q-iamspe2025-050,q-iamspe2026-047,q-einstein2026-059]] [[A ressecção do reto pode lesar os nervos pélvicos e causar bexiga neurogênica.|q-uspsp4-029]]`,
      fragmentos: [
        { id: "cir-indicacao", titulo: "Quando operar e a fertilidade", conferir: true, diretrizes: ["eshre-endometriose","febrasgo-endometriose"],
          questoes: ["q-unifesp2026-044","q-scmsp2021-068","q-usprp2024-081","q-iamspe2025-050","q-iamspe2026-047","q-unicamp2023-049","q-uspsp4-029","q-sirio2025-074","q-sirio2022-068","q-einstein2024-051","q-einstein2026-059"],
          texto: `- Endometrioma com implantes: **drenagem, retirada da cápsula e do peritônio**. {q-scmsp2021-068}
- Dor sem resposta ao desogestrel: **laparoscopia cirúrgica**. {q-usprp2024-081}
- Dor incapacitante com contraindicação a hormônio: **cirurgia**. {q-unicamp2023-049}
- Lesão retrocervical com infertilidade: **laparoscopia**. {q-einstein2024-051}
- Infertilidade com endometrioma e foco no sigmoide: **ooforoplastia e remoção dos focos**. {q-sirio2025-074}
- Leve operada, tubas pérvias: **liberar para gestar**. {q-sirio2022-068}
- Infertilidade como causa única: indicação **relativa**. {q-einstein2026-059}
- Retossigmoidectomia: risco de **bexiga neurogênica**. {q-uspsp4-029}
- Profunda querendo gestar (banca): **cirurgia antes**. {q-unifesp2026-044,q-iamspe2026-047}
- Banca: **congelar óvulos** antes da cirurgia. {q-iamspe2025-050}` },
      ],
    },
    {
      id: "adenomiose", titulo: "Adenomiose",
      introducao: `[[Na adenomiose, glândulas do endométrio invadem o miométrio, que se hipertrofia: útero aumentado, globoso, amolecido, com sangramento volumoso e dismenorreia, sobretudo após os 35–40 anos e em multíparas. O ultrassom mostra miométrio heterogêneo, assimétrico, com cistos e zona juncional espessa; a biópsia do endométrio não diagnostica, porque a lesão está no músculo.|q-usprp2025-056,q-iamspe2022-053,q-usp2025-004]] O tratamento é hormonal (DIU de levonorgestrel, progestagênio) e, com prole completa, histerectomia.`,
      fragmentos: [
        { id: "ade-quadro", titulo: "Quadro e diagnóstico",
          questoes: ["q-usp2025-004","q-usprp2025-056","q-iamspe2022-053"],
          casos: ["q-usprp2025-056"],
          texto: `- Útero globoso com miométrio heterogêneo: **adenomiose**. {q-usprp2025-056}
- Biópsia do endométrio: **sem relevância** para adenomiose. {q-iamspe2022-053}
- Quer controlar a queixa (banca): **progesterona 10 dias pré-menstrual**. {q-usp2025-004}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `As três causas de dismenorreia que as provas fazem diferenciar.`,
      fragmentos: [
        { id: "cmp-dismenorreia", titulo: "Primária × endometriose × adenomiose",
          questoes: ["q-usp2024-100","q-unesp2026-032","q-usprp2025-056"],
          prosa: `| | Dismenorreia primária | Endometriose | Adenomiose |
|---|---|---|---|
| Início | com os primeiros ciclos ovulatórios | progressiva, jovem | após 35–40 anos, multípara |
| Dor | 1–3 dias, no fluxo | progressiva, **dispareunia de profundidade**, disquesia | com **sangramento volumoso** |
| Exame | normal | nódulo retrocervical, útero fixo | **útero aumentado e globoso** |
| Imagem | normal | endometrioma, nódulos profundos | miométrio heterogêneo, zona juncional espessa |
| Tratamento | AINE, contraceptivo | progestagênio, contraceptivo; cirurgia | DIU-LNG; histerectomia |`,
          texto: `- Útero normal com cólica: **primária/endometriose**, contraceptivo; útero globoso: **adenomiose**. {q-usp2024-100,q-unesp2026-032,q-usprp2025-056}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-sirio2026-080","q-unifesp2026-044","q-usp2025-004"],
          texto: `- Combinados, progestagênios e GnRH reduzem a dor com eficácia parecida; o GnRH fica para segunda linha pelos efeitos. A banca chamou o **agonista do GnRH** de mais eficaz. {q-sirio2026-080}
- A ESHRE não manda operar de rotina a endometriose profunda antes de tentar gestar; a prova indicou **cirurgia antes**. {q-unifesp2026-044}
- Na adenomiose, o DIU de levonorgestrel controla melhor; a prova usou **progesterona por 10 dias**. {q-usp2025-004}` },
      ],
    },
  ],
});
