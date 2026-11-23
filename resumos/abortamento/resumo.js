/* resumos/abortamento/resumo.js — resumo adaptativo de abortamento (ass-abortamento): formas clínicas,
   critérios ultrassonográficos de inviabilidade, esvaziamento uterino, aborto infectado, diagnóstico
   diferencial com gestação ectópica e de localização desconhecida, perda gestacional de repetição
   (SAF, trombofilias, insuficiência istmocervical), aborto previsto em lei, armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- abortamento */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "abortamento",
  titulo: "Abortamento e sangramento do primeiro trimestre",
  assunto: "ass-abortamento",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "ms-abortamento", texto: "Ministério da Saúde — Atenção Humanizada ao Abortamento: norma técnica (2.ª ed., 2011) e Prevenção e Tratamento dos Agravos Resultantes da Violência Sexual (2012)", lidoEm: null },
    { id: "srue-viabilidade", texto: "Doubilet et al. — Diagnostic criteria for nonviable pregnancy early in the first trimester (Society of Radiologists in Ultrasound, N Engl J Med 2013) e ACOG Practice Bulletin 200 (Early pregnancy loss, 2018)", lidoEm: null },
    { id: "eshre-rpl", texto: "ESHRE Guideline — Recurrent pregnancy loss (atualização 2022) e ACOG/ISTH sobre síndrome antifosfolípide na gestação", lidoEm: null },
    { id: "acog-ectopica", texto: "ACOG Practice Bulletin 193 — Tubal ectopic pregnancy (2018) e Febrasgo — Gravidez ectópica", lidoEm: null },
    { id: "stf-adpf54", texto: "STF — ADPF 54 (anencefalia, 2012); Código Penal, arts. 128 e 217-A", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição", questoes: ["q-unifesp2025-078","q-usp2023-035","q-amrigs2021-044"] },
  ],
  doencas: [
    {
      id: "formas", titulo: "Formas clínicas do abortamento",
      introducao: `[[Abortamento é a interrupção da gestação antes de 20–22 semanas ou com feto abaixo de 500 g; a maioria das perdas precoces vem de aneuploidia do concepto, e não de algo que a mulher fez. O exame decide quase tudo: o colo (fechado ou pérvio), o tamanho do útero em relação à idade gestacional e o que a ultrassonografia mostra na cavidade. Um sangramento de primeiro trimestre começa pelo exame especular e pelo toque, que muitas vezes já bastam para a hipótese.|q-unesp2023-025,q-fmabc2024-080,q-einstein2022-053]]

Veja também: **Doença trofoblástica gestacional**, **Pré-natal** (imunoglobulina anti-D), **Trombofilias e síndrome antifosfolípide**, **Violência sexual** e **Bioética** quando houver resumo.`,
      fragmentos: [
        { id: "for-classificacao", titulo: "Ameaça, inevitável, incompleto, completo", conferir: true, diretrizes: ["ms-abortamento"],
          figuras: [{ arquivo: "figuras/formas-abortamento.svg", legenda: "Esquema autoral: o colo e a cavidade separam as formas clínicas do abortamento e a conduta de cada uma." }],
          casos: ["q-uspsp3-056","q-amrigs2024-055","q-amrigs2023-051","q-usprp2021-055"],
          questoes: ["q-unesp2023-025","q-fmabc2024-080","q-unifesp2022-039","q-scmsp2025-072","q-uspsp3-056","q-tp20252-072","q-einstein2025-055","q-amrigs2024-055","q-fmabc2025-075","q-sirio2027-066","q-unicamp2022-057","q-usprp2021-055","q-amrigs2023-051","q-einstein2022-053"],
          prosa: `[[**Ameaça de abortamento**: sangramento discreto, colo fechado, útero compatível e embrião com batimentos. Um pequeno descolamento ovular não muda a conduta: observação, analgésico para cólica, repouso relativo e seguimento do pré-natal; nenhum remédio evita a perda. Se a mulher é Rh negativo não sensibilizada, recebe **imunoglobulina anti-D**.|q-fmabc2024-080,q-unifesp2022-039,q-scmsp2025-072,q-uspsp3-056,q-tp20252-072,q-einstein2025-055]] [[**Inevitável (em curso)**: colo pérvio, cólica forte e sangramento maior; o saco já desceu ou está descendo — não há como segurar. **Incompleto**: colo pérvio ou entreaberto, sangramento e restos na cavidade (eco endometrial espesso e heterogêneo, acima de cerca de 15 mm). Com instabilidade hemodinâmica, esvaziar sem esperar exame.|q-amrigs2024-055,q-fmabc2025-075,q-sirio2027-066,q-unicamp2022-057,q-usprp2021-055]] [[**Completo**: o conteúdo saiu, o colo fecha, a dor e o sangramento cedem, o endométrio fica fino e o hCG cai rápido (mais de 50% em 48 horas) até zerar, sem tratamento. Vilosidades coriônicas no anatomopatológico com hCG negativando confirmam abortamento, mesmo com cariótipo alterado.|q-amrigs2023-051,q-einstein2022-053]]`,
          texto: `- Ameaça: colo **fechado**, embrião vivo → **expectante**; anti-D se Rh−. {q-fmabc2024-080,q-unifesp2022-039,q-scmsp2025-072,q-uspsp3-056,q-tp20252-072,q-einstein2025-055}
- Inevitável/incompleto: colo **pérvio**, restos. {q-amrigs2024-055,q-fmabc2025-075,q-sirio2027-066,q-unicamp2022-057,q-usprp2021-055}
- Completo: hCG **cai rápido**, endométrio fino. {q-amrigs2023-051,q-einstein2022-053}
- Exame especular e toque primeiro. {q-unesp2023-025}` },
        { id: "for-inviavel", titulo: "Quando a ultrassonografia fecha inviabilidade", conferir: true, diretrizes: ["srue-viabilidade"],
          casos: ["q-uspsp1-086"],
          questoes: ["q-famema2022-047","q-famema2025-061","q-uspsp1-086","q-uspsp2-039","q-adap22-039","q-sessp2024-071","q-usprp2021-068"],
          prosa: `[[Os critérios foram feitos para **nunca** interromper uma gestação viável, por isso são exigentes. Fecham inviabilidade: embrião com **CCN ≥ 7 mm sem batimento**; saco gestacional com **diâmetro médio ≥ 25 mm sem embrião** (gestação anembrionada); ausência de embrião com batimento 2 semanas depois de um saco sem vesícula, ou 11 dias depois de saco com vesícula.|q-famema2025-061,q-adap22-039,q-usprp2021-068]] [[Abaixo disso, a resposta é **repetir a ultrassonografia** em 7–14 dias: saco de 15–18 mm com vesícula e sem embrião, ou embrião pequeno sem batimento, pode ser apenas uma gestação mais nova que a data da menstruação faz crer.|q-famema2022-047,q-uspsp1-086,q-uspsp2-039]] [[Embrião com CCN de 10 mm (cerca de 7 semanas) e hCG de 28.000 com batimento é gestação normal.|q-sessp2024-071]]`,
          texto: `- **CCN ≥ 7 mm sem BCF** ou **saco ≥ 25 mm sem embrião**: inviável. {q-famema2025-061,q-adap22-039,q-usprp2021-068}
- Abaixo disso: **repetir** em 7–14 dias. {q-famema2022-047,q-uspsp1-086,q-uspsp2-039}
- CCN 10 mm com BCF: normal. {q-sessp2024-071}` },
      ],
    },
    {
      id: "conduta", titulo: "Esvaziamento e aborto infectado",
      introducao: `[[No abortamento retido ou incompleto estável, há três caminhos equivalentes em eficácia, escolhidos com a mulher: expectante, medicamentoso (misoprostol) ou aspiração. O instável e o infectado não têm escolha: esvaziar.|q-adap22-039,q-adap26-049]]`,
      fragmentos: [
        { id: "con-esvaziamento", titulo: "Misoprostol, aspiração ou curetagem", conferir: true, diretrizes: ["ms-abortamento","srue-viabilidade"],
          casos: ["q-usprp2021-068"],
          questoes: ["q-adap22-039","q-usprp2021-068","q-usprp2021-055","q-unicamp2022-057","q-famerp2026-027","q-usprp2026-064"],
          prosa: `[[Útero até 12 semanas: a **aspiração** (manual intrauterina ou elétrica) é o método de escolha, mais segura que a curetagem, com menos perfuração e sinéquia; o misoprostol 800 mcg vaginal é a alternativa para quem prefere evitar procedimento.|q-adap22-039,q-usprp2021-068,q-usprp2021-055]] [[Sangramento ativo com taquicardia e hipotensão pede esvaziamento imediato; onde não há aspiração, a prova aceitou **curetagem**.|q-unicamp2022-057]] [[Acima de 12 semanas há ossos fetais: primeiro o **misoprostol** para expulsar o feto, depois curetagem dos restos.|q-famerp2026-027]] [[Depois de uma perda única, não há intervalo obrigatório nem investigação: se a mulher está bem e deseja, está **liberada para nova gestação**.|q-usprp2026-064]]`,
          texto: `- Até 12 semanas: **aspiração** ou misoprostol. {q-adap22-039,q-usprp2021-068,q-usprp2021-055}
- Instável: esvaziar já. {q-unicamp2022-057}
- Acima de 12 semanas: **misoprostol, depois curetagem**. {q-famerp2026-027}
- Uma perda: **liberar** nova gestação. {q-usprp2026-064}` },
        { id: "con-infectado", titulo: "Aborto infectado", conferir: true, diretrizes: ["ms-abortamento"],
          questoes: ["q-adap26-049","q-unesp2024-027"],
          prosa: `[[Febre, útero doloroso, secreção purulenta pelo colo e leucocitose depois de manipulação ou perda: os restos são meio de cultura para germes polimicrobianos (anaeróbios, gram-negativos). Tratamento: **antibiótico venoso de amplo espectro** (clindamicina com gentamicina) e **esvaziamento uterino** precoce — sem tirar a fonte, a infecção não cede. Mesmo com feto ainda com batimento, a gestação é interrompida.|q-adap26-049,q-unesp2024-027]]`,
          texto: `- **Clindamicina + gentamicina** e **esvaziamento**. {q-adap26-049,q-unesp2024-027}` },
      ],
    },
    {
      id: "ectopica", titulo: "Gestação ectópica e de localização desconhecida",
      introducao: `[[Todo sangramento com dor no início da gestação obriga a pensar em ectópica, porque ela mata por hemorragia. O par beta-hCG e ultrassonografia transvaginal decide: acima da zona discriminatória (cerca de 1.500–3.500 mUI/mL) uma gestação intrauterina deveria ser vista.|q-fmabc2026-063,q-famema2021-044,q-udisc20262-086]]`,
      fragmentos: [
        { id: "ect-diagnostico", titulo: "Diagnóstico e conduta", conferir: true, diretrizes: ["acog-ectopica"],
          questoes: ["q-fmabc2026-063","q-famema2021-044","q-udisc20262-086","q-unifesp2026-049","q-einstein2025-055","q-adap21-055","q-sessp2026-066","q-tp20251-089","q-didepm-018"],
          prosa: `[[Com beta-hCG positivo e sangramento, o próximo passo é a **ultrassonografia transvaginal** para localizar a gestação.|q-fmabc2026-063,q-einstein2025-055]] [[Útero vazio sem massa anexial é **gestação de localização desconhecida**: hCG de 1.000 sozinho não fecha ectópica. Repete-se o hCG em 48 horas: numa gestação intrauterina viável ele sobe pelo menos 35–50% (o mínimo depende do valor inicial); subida menor ou platô indicam gestação inviável, com forte suspeita de ectópica; queda indica aborto em resolução.|q-famema2021-044,q-udisc20262-086,q-unifesp2026-049]] [[Ectópica íntegra, estável, sem batimento, massa pequena e hCG baixo (abaixo de cerca de 5.000) com função hepática, renal e hematológica normais: **metotrexato** intramuscular e hCG seriado.|q-adap21-055]] [[Choque, dor à descompressão, fundo de saco abaulado e líquido livre: **ectópica rota** — reposição com sangue e cirurgia de urgência, sem esperar exame.|q-sessp2026-066,q-tp20251-089,q-didepm-018]]`,
          texto: `- hCG positivo com sangramento: **USG transvaginal**. {q-fmabc2026-063,q-einstein2025-055}
- Útero vazio: localização desconhecida; **hCG em 48 h**. {q-famema2021-044,q-udisc20262-086,q-unifesp2026-049}
- Íntegra, estável, hCG baixo: **metotrexato**. {q-adap21-055}
- Instável: **cirurgia já**. {q-sessp2026-066,q-tp20251-089,q-didepm-018}` },
      ],
    },
    {
      id: "repeticao", titulo: "Perda gestacional de repetição",
      introducao: `[[Duas ou mais perdas pedem investigação; mesmo assim, em metade dos casais nada se acha, e a chance de nascido vivo na gestação seguinte continua alta com apoio e acompanhamento. As causas investigáveis são anatômicas (septo, miomas submucosos, sinéquias), síndrome antifosfolípide, endócrinas (tireoide, diabetes descontrolado) e cromossômicas do casal.|q-sessp2024-079,q-usprp2026-073]]`,
      fragmentos: [
        { id: "rep-causas", titulo: "SAF, trombofilias e investigação", conferir: true, diretrizes: ["eshre-rpl"],
          questoes: ["q-sessp2024-079","q-usprp2026-073","q-adap25-078","q-einstein2027-047","q-iamspe2023-059","q-sirio2024-074"],
          prosa: `[[Com investigação negativa (anticorpos antifosfolípides, glicemia, TSH, útero normais), a conduta é **acompanhamento regular com apoio psicológico**; não há remédio empírico que aumente a chance de nascido vivo.|q-sessp2024-079,q-usprp2026-073]] [[**Síndrome antifosfolípide obstétrica**: critério clínico (perdas) e anticorpo em título moderado ou alto, confirmado após 12 semanas. Confirmada, trata-se com **AAS em dose baixa e heparina de baixo peso molecular profilática**; sem confirmação, não se inicia, porque anticorpos transitórios aparecem após infecções e na própria gestação.|q-adap25-078,q-einstein2027-047,q-iamspe2023-059]] [[As trombofilias hereditárias não têm relação comprovada com perda precoce; quando se pesquisa, são fator V de Leiden, mutação da protrombina e deficiências de antitrombina e proteínas C e S — **MTHFR não** se pesquisa.|q-sirio2024-074]]`,
          texto: `- Investigação negativa: **apoio e acompanhamento**. {q-sessp2024-079,q-usprp2026-073}
- SAF confirmada: **AAS + HBPM profilática**; sem confirmação, aguardar. {q-adap25-078,q-einstein2027-047,q-iamspe2023-059}
- MTHFR **não** se pesquisa. {q-sirio2024-074}` },
        { id: "rep-iic", titulo: "Insuficiência istmocervical", conferir: true, diretrizes: ["eshre-rpl"],
          questoes: ["q-tp20212-087","q-amrigs2022-057","q-amrigs2023-053","q-adap21-068"],
          prosa: `[[O colo se dilata **sem dor**, no **segundo trimestre**, e expulsa um feto vivo, muitas vezes com bolsa rota antes de contração: é a fraqueza do colo, congênita ou adquirida (conização, dilatações e curetagens).|q-tp20212-087,q-amrigs2022-057]] [[Com história típica, **cerclagem eletiva (McDonald) entre 12 e 14 semanas**; a via transabdominal fica para quando a vaginal falhou ou o colo é curto demais, e cerclagem com bolsa prolapsada é situação de exceção, não indicação principal.|q-adap21-068,q-amrigs2023-053]]`,
          texto: `- Perda **indolor no 2.º trimestre**: insuficiência istmocervical. {q-tp20212-087,q-amrigs2022-057}
- **Cerclagem** 12–14 semanas. {q-adap21-068,q-amrigs2023-053}` },
      ],
    },
    {
      id: "legal", titulo: "Aborto previsto em lei",
      introducao: `[[No Brasil, a interrupção é permitida em três situações: risco de vida da gestante, gravidez resultante de estupro e anencefalia fetal (ADPF 54). Fora delas, o papel do médico é acolher, informar e reduzir danos, sem julgamento.|q-adap24-077,q-adap26-071,q-uspsp1-097]]`,
      fragmentos: [
        { id: "leg-situacoes", titulo: "Estupro, anencefalia e o que exigir", conferir: true, diretrizes: ["ms-abortamento","stf-adpf54"],
          questoes: ["q-adap24-077","q-unifesp2024-066","q-unifesp2026-071","q-adap26-071","q-uspsp1-097","q-uspsp5-095"],
          prosa: `[[Na gravidez por estupro, **não se exige boletim de ocorrência, laudo do IML nem autorização judicial**: basta a palavra da mulher, registrada em termo de consentimento livre e esclarecido e termo de responsabilidade, com o parecer da equipe.|q-adap24-077,q-unifesp2024-066]] [[Relação sexual com menor de 14 anos é **estupro de vulnerável**, mesmo consentida; a lei não fixa limite de idade gestacional para a interrupção nesse caso.|q-unifesp2026-071]] [[Anencefalia diagnosticada por ultrassonografia (laudo com duas imagens, assinado por dois médicos): a interrupção é permitida por decisão da gestante, **sem autorização judicial**.|q-adap26-071]] [[Quando a situação não está prevista em lei, acolher, esclarecer os impedimentos legais e as alternativas (adoção), informar os riscos do aborto inseguro e os sinais de alarme; com adolescente, ouvir o contexto, oferecer apoio psicológico e social qualquer que seja a decisão.|q-uspsp1-097,q-uspsp5-095]]`,
          texto: `- Estupro: **sem BO**, sem laudo, sem juiz; termos assinados. {q-adap24-077,q-unifesp2024-066}
- Menor de 14 anos: estupro de vulnerável, **qualquer idade gestacional**. {q-unifesp2026-071}
- Anencefalia: decisão da gestante. {q-adap26-071}
- Fora da lei: **acolher e reduzir danos**. {q-uspsp1-097,q-uspsp5-095}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["srue-viabilidade","acog-ectopica"],
          questoes: ["q-unifesp2026-049","q-udisc20262-086","q-unicamp2022-057","q-usprp2021-068","q-amrigs2022-057","q-unesp2024-027"],
          prosa: `[[**Subida mínima do hCG**: a regra atual usa um mínimo que depende do valor inicial (cerca de 49% abaixo de 1.500); a udisc20262-086 usou o corte de **35%**, e a unifesp2026-049, com subida de 25%, chamou o quadro de **gravidez inviável** sem decidir entre ectópica e aborto.|q-unifesp2026-049,q-udisc20262-086]] [[**Aspiração ou curetagem**: até 12 semanas a regra prefere aspiração; a unicamp2022-057 respondeu **curetagem** no sangramento com instabilidade, e a usprp2021-068, **dilatação seguida de vácuo-aspiração**.|q-unicamp2022-057,q-usprp2021-068]] [[**Insuficiência istmocervical**: a perda típica é no segundo trimestre; a amrigs2022-057 considerou errada a afirmação de perda no primeiro trimestre e certas a causa idiopática e a secundária a curetagem.|q-amrigs2022-057]] [[**Aborto infectado com feto vivo**: a unesp2024-027, com BCF de 170, manteve antibiótico **e interrupção** — a infecção intrauterina não se resolve com o concepto no útero.|q-unesp2024-027]]`,
          texto: `- hCG: a prova usou **35%** e chamou subida de 25% de **inviável**. {q-unifesp2026-049,q-udisc20262-086}
- Instável: a prova aceitou **curetagem**. {q-unicamp2022-057,q-usprp2021-068}
- IIC: perda no **2.º** trimestre. {q-amrigs2022-057}
- Infectado com BCF: **interromper**. {q-unesp2024-027}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: formas do abortamento",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-formas", titulo: "Colo, cavidade e conduta", conferir: true,
          questoes: ["q-fmabc2024-080","q-fmabc2025-075","q-amrigs2023-051","q-famema2025-061","q-adap26-049"],
          prosa: `[[O colo e a cavidade bastam para separar as formas.|q-fmabc2024-080,q-fmabc2025-075,q-amrigs2023-051,q-famema2025-061,q-adap26-049]]

| | Ameaça | Inevitável / incompleto | Completo | Retido / anembrionado | Infectado |
| Colo | fechado | pérvio | fechado | fechado | pérvio, pus |
| Útero | compatível | compatível ou menor | menor, involuindo | compatível ou menor | doloroso |
| USG | embrião vivo | restos, saco descendo | endométrio fino | CCN ≥ 7 mm sem BCF; saco ≥ 25 mm vazio | restos |
| Conduta | expectante, anti-D se Rh− | aspiração (ou misoprostol) | nada; hCG cai | expectante, misoprostol ou aspiração | antibiótico + esvaziar |`,
          texto: `- Colo fechado com embrião vivo: **ameaça**. {q-fmabc2024-080}
- Colo pérvio: **inevitável/incompleto**. {q-fmabc2025-075}
- hCG caindo: **completo**. {q-amrigs2023-051}
- Saco ≥ 25 mm vazio: **anembrionada**. {q-famema2025-061}
- Febre e pus: **infectado**. {q-adap26-049}` },
      ],
    },
  ],
});
