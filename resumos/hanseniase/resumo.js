/* resumos/hanseniase/resumo.js — resumo adaptativo de hanseníase (ass-hanseniase): agente e
   transmissão, espectro imunológico (indeterminada, tuberculoide, dimorfa, virchowiana), biópsia,
   comprometimento neural e neural pura, sinais cardinais e testes de sensibilidade, provas
   autonômicas, baciloscopia e classificação operacional, PQT-U, síndrome da sulfona, reações tipo 1
   e tipo 2, neurite, contatos e BCG; armadilhas e tabela das formas.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- hanseniase */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "hanseniase",
  titulo: "Hanseníase",
  assunto: "ass-hanseniase",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "pcdt-hanseniase", texto: "Ministério da Saúde — Protocolo Clínico e Diretrizes Terapêuticas da Hanseníase (2022): sinais cardinais, classificação operacional, formas clínicas, PQT-U, reações, contatos e BCG", lidoEm: "2026-11-23" },
  ],
  foraDoEscopo: [
    { motivo: "Anulada; a reposição (q-sessp2023-098-ia) está no resumo.", questoes: ["q-sessp2023-098"] },
  ],
  doencas: [
    {
      id: "espectro", titulo: "Agente e espectro clínico",
      introducao: `A hanseníase é causada pelo *Mycobacterium leprae*, bacilo intracelular obrigatório que se multiplica muito devagar e prefere as áreas mais frias do corpo (orelhas, face, extremidades). O Brasil é o segundo país do mundo em número de casos. A transmissão é pelas vias aéreas superiores, a partir do doente **multibacilar sem tratamento**, depois de convívio prolongado; a incubação dura em média **cinco anos**, e a maioria das pessoas expostas não adoece.

[[O bacilo tem tropismo pela **célula de Schwann** e pelo macrófago da pele. Por isso a doença é, ao mesmo tempo, dermatológica e neurológica: a mancha perde sensibilidade porque os filetes nervosos da derme foram lesados, e o nervo periférico engrossa e para de conduzir.|q-usprp2023-042,q-sirio2027-009,q-unesp2022-099]]

[[O que decide a forma clínica não é o bacilo, é a **imunidade celular** de quem se infecta. Imunidade celular forte (Th1) contém o bacilo num granuloma: poucas lesões, bem delimitadas, sem bacilo visível. Imunidade celular fraca (Th2) deixa o bacilo se multiplicar dentro de macrófagos: lesões difusas, cheias de bacilos, e o doente transmite.|q-uspsp1-053,q-scmsp2021-020]]

Veja também: **Infecções de pele**, **Tuberculose**, **Doenças neuromusculares** e **Vigilância em saúde**.`,
      fragmentos: [
        { id: "esp-imunidade", titulo: "Polo tuberculoide e polo virchowiano", conferir: true,
          figuras: [{ arquivo: "figuras/hanseniase-espectro.svg", legenda: "Esquema autoral: as formas clínicas seguem a imunidade celular; a classificação operacional (paucibacilar × multibacilar) e o tipo de reação acompanham o polo." }],
          questoes: ["q-uspsp1-053","q-scmsp2021-020"],
          prosa: `[[No **polo tuberculoide** a resposta Th1 forma granuloma epitelioide, a **reação de Mitsuda é positiva** (a pessoa reage ao antígeno do bacilo) e a baciloscopia é negativa; trata-se como paucibacilar, por **6 meses**.|q-uspsp1-053]] [[No **polo virchowiano** a resposta é Th2, a Mitsuda é negativa e a pele fica cheia de bacilos: é a forma **mais contagiosa**. Imunidade fraca não poupa o nervo; o bacilo se espalha por todos eles, devagar e simetricamente.|q-scmsp2021-020]] A Mitsuda não diagnostica infecção; mostra só para que polo a pessoa tende.`,
          texto: `- Tuberculoide: **Th1, Mitsuda +, baciloscopia −**, granuloma. {q-uspsp1-053}
- Virchowiana: **Th2, Mitsuda −**, a mais contagiosa, nervos também lesados. {q-scmsp2021-020}` },
        { id: "esp-paucibacilar", titulo: "Indeterminada e tuberculoide", conferir: true,
          casos: ["q-usp2024-059","q-tp20212-027"],
          questoes: ["q-unesp2023-060","q-tp20212-027","q-usp2024-059","q-scmsp2021-020"],
          prosa: `[[A forma **indeterminada** é o começo: uma ou poucas **máculas hipocrômicas de bordas imprecisas**, com perda da sensibilidade térmica, menos pelos e menos suor no local. A baciloscopia é negativa. Nem todos passam por ela, e muitos casos curam sozinhos ou evoluem para um dos polos.|q-unesp2023-060,q-scmsp2021-020]] [[A **tuberculoide** é a resposta organizada: **placa eritematosa bem delimitada**, de borda elevada (às vezes com pequenos tubérculos), centro mais claro e **anestesia** dentro da lesão; poucas lesões, às vezes um nervo espessado perto delas. Baciloscopia negativa. Lesão que não responde a antifúngico e perde sensibilidade não é tinha.|q-tp20212-027,q-usp2024-059]]`,
          texto: `- Indeterminada: **mácula hipocrômica mal delimitada**, térmica alterada, menos pelos. {q-unesp2023-060,q-scmsp2021-020}
- Tuberculoide: **placa bem delimitada, anestésica**, baciloscopia −. {q-tp20212-027,q-usp2024-059}` },
        { id: "esp-multibacilar", titulo: "Dimorfa e virchowiana", conferir: true,
          casos: ["q-einstein2027-069","q-usp2023-044"],
          questoes: ["q-usp2023-044","q-einstein2027-069","q-scmsp2021-020"],
          prosa: `[[A **dimorfa** fica no meio do espectro e é instável: **muitas placas** eritemato-acastanhadas, assimétricas, com **borda interna nítida e externa imprecisa** (aspecto "em queijo suíço", centro poupado) e vários nervos espessados. É multibacilar e é a forma que mais faz reação tipo 1.|q-einstein2027-069]] [[A **virchowiana** quase não tem mancha: a pele fica **infiltrada de modo difuso**, avermelhada e brilhante, com **madarose** (perda das sobrancelhas), orelhas espessas, pápulas e nódulos (hansenomas). Poupa as áreas quentes (couro cabeludo, axilas, meio da coluna lombar). A biópsia mostra macrófagos espumosos cheios de bacilos e a **baciloscopia é positiva**.|q-usp2023-044,q-scmsp2021-020]]`,
          texto: `- Dimorfa: **muitas placas, borda interna nítida e externa imprecisa**, multibacilar. {q-einstein2027-069}
- Virchowiana: **infiltração difusa, madarose, baciloscopia +**; poupa áreas quentes. {q-usp2023-044,q-scmsp2021-020}` },
        { id: "esp-biopsia", titulo: "O que a biópsia mostra", conferir: true,
          casos: ["q-usprp2027-023","q-tp20202-012"],
          questoes: ["q-tp20202-012","q-usprp2027-023","q-usp2023-044"],
          prosa: `[[A histologia repete o espectro. No polo tuberculoide há **dermatite granulomatosa**: granulomas epitelioides com células gigantes ao redor dos filetes nervosos, sem bacilo visível.|q-usprp2027-023]] [[No polo virchowiano não há granuloma organizado, e sim **infiltrado de macrófagos espumosos** (células de Virchow) com **bacilos isolados e em globias** (aglomerados), BAAR positivo. Necrose caseosa é da tuberculose, não da hanseníase.|q-tp20202-012,q-usp2023-044]]`,
          texto: `- Tuberculoide: **granuloma epitelioide**, sem bacilo. {q-usprp2027-023}
- Virchowiana: **macrófagos espumosos, bacilos em globias**, BAAR +. {q-tp20202-012,q-usp2023-044}` },
        { id: "esp-nervo", titulo: "O nervo: neural pura e incapacidade", conferir: true,
          casos: ["q-usprp2023-042","q-unesp2022-099"],
          questoes: ["q-usprp2023-042","q-sirio2027-009","q-unesp2022-099","q-unicampdis2025-008"],
          prosa: `[[O nervo mais atingido é o **ulnar** (no cotovelo); seguem o mediano, o **fibular comum** (pé caído) e o tibial posterior. Nervo **espessado e doloroso** com perda de sensibilidade ou força no seu território é sinal cardinal, mesmo sem mancha: é a **forma neural pura**, cerca de um em cada dez casos.|q-usprp2023-042,q-sirio2027-009]] [[Como as lesões atingem nervos diferentes e assimétricos, o quadro é de **mononeuropatia múltipla**; a **eletroneuromiografia** mostra a topografia, e a ultrassonografia do nervo ajuda no diagnóstico.|q-unicampdis2025-008]] [[O pé sem sensibilidade não sente a pressão do calçado: vêm o calo, a **úlcera plantar indolor** e as deformidades. É a incapacidade que a doença deixa quando o diagnóstico atrasa.|q-unesp2022-099]]`,
          texto: `- Nervo espessado + alteração no território = **hanseníase**, mesmo sem mancha (**neural pura**). {q-usprp2023-042,q-sirio2027-009}
- Mononeuropatia múltipla: **eletroneuromiografia** mostra a topografia. {q-unicampdis2025-008}
- Pé anestésico: **úlcera plantar indolor** e deformidade. {q-unesp2022-099}` },
      ],
    },
    {
      id: "diagnostico", titulo: "Diagnóstico e classificação",
      introducao: `[[O diagnóstico é **clínico** e se faz na unidade básica. Basta um dos três **sinais cardinais**: lesão de pele com alteração de sensibilidade térmica, dolorosa ou tátil; nervo periférico espessado com alteração sensitiva, motora ou autonômica; ou bacilo demonstrado na baciloscopia ou na biópsia. Exame complementar ajuda, mas o resultado negativo não afasta a doença.|q-sirio2027-009,q-usprp2022-018,q-sessp2023-098-ia]]`,
      fragmentos: [
        { id: "dx-sensibilidade", titulo: "Sinais cardinais e teste de sensibilidade", conferir: false, diretrizes: ["pcdt-hanseniase"],
          questoes: ["q-sirio2027-009","q-einstein2027-069","q-iamspe2025-089","q-usprp2022-018"],
          prosa: `[[A fibra fina, que leva temperatura, é a primeira a sofrer. Por isso a perda segue uma ordem: **térmica primeiro, depois dolorosa e por último tátil**. Uma mácula com só a sensibilidade térmica diminuída já é suspeita e deve ser investigada.|q-sirio2027-009,q-einstein2027-069,q-iamspe2025-089]] [[O teste térmico se faz com tubos de água quente e fria; o doloroso, com a ponta de uma agulha; o tátil, com algodão ou com os **monofilamentos** (que também mapeiam a área do nervo). Mancha com perda de sensibilidade e nervo espessado fecham o diagnóstico ali mesmo: trata-se na atenção primária, sem encaminhar para confirmar.|q-usprp2022-018,q-iamspe2025-089]]`,
          texto: `- Ordem da perda: **térmica → dolorosa → tátil**. {q-sirio2027-009,q-einstein2027-069,q-iamspe2025-089}
- Sinal cardinal presente: **tratar na atenção primária**. {q-usprp2022-018}` },
        { id: "dx-autonomico", titulo: "Provas autonômicas: histamina e suor", conferir: true,
          questoes: ["q-unesp2022-092","q-iamspe2025-089","q-sirio2024-081"],
          prosa: `[[A histamina injetada na pele normal produz a **tríplice resposta**: eritema no ponto da puntura, **eritema reflexo secundário** em volta e pápula. O eritema secundário depende do reflexo do axônio; com o filete nervoso lesado ele **não aparece**, e a prova fica **incompleta**. Serve na mácula em que a sensibilidade é difícil de testar (criança, forma indeterminada).|q-unesp2022-092,q-iamspe2025-089]] [[A fibra autonômica também cuida da glândula sudorípara: a lesão **não transpira** (prova da pilocarpina negativa na mancha) e perde pelos.|q-sirio2024-081,q-iamspe2025-089]]`,
          texto: `- Prova incompleta: falta o **eritema reflexo secundário**. {q-unesp2022-092,q-iamspe2025-089}
- Lesão **sem suor** e sem pelos. {q-sirio2024-081}` },
        { id: "dx-baciloscopia", titulo: "Baciloscopia e classificação operacional", conferir: false, diretrizes: ["pcdt-hanseniase"],
          casos: ["q-uspsp2-020"],
          questoes: ["q-scmsp2021-017","q-uspsp2-020","q-usp2024-059","q-didepm-076","q-sessp2023-098-ia","q-sirio2024-081"],
          prosa: `[[A **baciloscopia** se faz em raspado intradérmico dos **lóbulos das orelhas, dos cotovelos** e de uma lesão. É o exame complementar de rotina: positiva, classifica o caso como **multibacilar**; negativa, não exclui hanseníase.|q-uspsp2-020,q-scmsp2021-017]] [[A **classificação operacional** decide o tratamento: **paucibacilar** = **1 a 5 lesões** com baciloscopia obrigatoriamente negativa; **multibacilar** = **mais de 5 lesões** e/ou baciloscopia positiva. Mais de um nervo comprometido também conta como multibacilar, e caso duvidoso se trata como multibacilar.|q-scmsp2021-017,q-usp2024-059,q-didepm-076,q-sessp2023-098-ia,q-sirio2024-081]]`,
          texto: `- Baciloscopia: **lóbulos, cotovelos e lesão**; positiva = MB, negativa não exclui. {q-uspsp2-020,q-scmsp2021-017}
- PB: **1–5 lesões e baciloscopia −**; MB: **> 5 lesões ou baciloscopia +**. {q-scmsp2021-017,q-usp2024-059,q-didepm-076,q-sessp2023-098-ia,q-sirio2024-081}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento: PQT-U",
      introducao: `[[Desde 2021 o Brasil usa a **poliquimioterapia única (PQT-U)**, com as **três drogas** para todos: rifampicina (bactericida), dapsona e clofazimina. Três drogas juntas evitam a seleção de bacilo resistente. O que muda entre paucibacilar e multibacilar é só a **duração**.|q-sirio2025-099,q-usprp2022-018,q-sirio2024-081,q-sessp2023-098-ia]]`,
      fragmentos: [
        { id: "tra-pqtu", titulo: "Esquema e duração", conferir: false, diretrizes: ["pcdt-hanseniase"],
          questoes: ["q-sirio2025-099","q-usprp2022-018","q-sirio2024-081","q-sessp2023-098-ia","q-uspsp1-053"],
          prosa: `[[Adulto acima de 50 kg: **dose mensal supervisionada** de **rifampicina 600 mg + clofazimina 300 mg + dapsona 100 mg**, e **dose diária autoadministrada** de **clofazimina 50 mg + dapsona 100 mg**.|q-sirio2025-099,q-sirio2024-081,q-sessp2023-098-ia]] [[**Paucibacilar: 6 doses** mensais, em até 9 meses. **Multibacilar: 12 doses**, em até 18 meses. Ao completar as doses, alta por cura, mesmo que as lesões ainda não tenham sumido.|q-usprp2022-018,q-sirio2024-081,q-sessp2023-098-ia,q-uspsp1-053]]`,
          texto: `- PQT-U: **rifampicina + clofazimina + dapsona** para todos. {q-sirio2025-099,q-sessp2023-098-ia}
- PB **6 doses**; MB **12 doses**. {q-usprp2022-018,q-sirio2024-081,q-uspsp1-053}` },
        { id: "tra-adversos", titulo: "Efeito adverso: síndrome da sulfona", conferir: true,
          questoes: ["q-fmabc2024-092"],
          prosa: `[[A dapsona é uma sulfona. Poucas semanas depois de começar, alguns pacientes fazem a **síndrome da sulfona**, uma reação de hipersensibilidade grave: **febre, exantema, linfonodos aumentados, hepatite e eosinofilia**. Suspende-se a dapsona. A mesma droga pode causar anemia hemolítica (pior na deficiência de G6PD) e meta-hemoglobinemia. Reação hansênica, ao contrário, não dá eosinofilia nem hepatite.|q-fmabc2024-092]]`,
          texto: `- Febre, exantema, linfonodos, hepatite e **eosinofilia** semanas após a dapsona: **síndrome da sulfona**. {q-fmabc2024-092}` },
      ],
    },
    {
      id: "reacoes", titulo: "Reações hansênicas",
      introducao: `[[As reações são episódios **inflamatórios agudos**, causados pela resposta imune contra o antígeno do bacilo, não pela multiplicação dele. Podem surgir **antes, durante ou depois** da PQT-U e são a **maior causa de dano neural** e de incapacidade. A regra comum aos dois tipos: **a PQT-U continua**; reação não é falha de tratamento nem resistência.|q-scmsp2021-019,q-adap25-035,q-usprp2023-063,q-adap21-101,q-unifesp2025-035]]`,
      fragmentos: [
        { id: "rea-tipo1", titulo: "Reação tipo 1 (reversa)", conferir: false, diretrizes: ["pcdt-hanseniase"],
          casos: ["q-usprp2021-101"],
          questoes: ["q-adap25-035","q-usprp2021-101","q-usprp2023-063","q-scmsp2021-019"],
          prosa: `[[A reação tipo 1 é um aumento súbito da **imunidade celular**, mais comum nos **dimorfos**: as **lesões antigas ficam vermelhas, inchadas e dolorosas**, aparecem lesões novas e o nervo próximo inflama. O tratamento é **prednisona 1 mg/kg/dia**, com redução lenta guiada pela avaliação neurológica, **mantendo a PQT-U**. Anti-inflamatório comum não protege o nervo.|q-adap25-035,q-usprp2021-101,q-usprp2023-063,q-scmsp2021-019]]`,
          texto: `- Lesões antigas inflamadas e novas: **tipo 1 → prednisona 1 mg/kg/dia**, mantendo a PQT-U. {q-adap25-035,q-usprp2021-101,q-usprp2023-063,q-scmsp2021-019}` },
        { id: "rea-tipo2", titulo: "Reação tipo 2 (eritema nodoso hansênico)", conferir: false, diretrizes: ["pcdt-hanseniase"],
          casos: ["q-usprp2026-081"],
          questoes: ["q-adap21-101","q-usprp2026-081","q-scmsp2021-019","q-uspsp4-004"],
          prosa: `[[A reação tipo 2 é mediada por **imunocomplexos** e acontece **só nos multibacilares** (virchowianos e dimorfos com muitos bacilos). Surgem **nódulos subcutâneos dolorosos** em qualquer lugar do corpo (não sobre as lesões antigas), com **febre, artralgia, mal-estar e leucocitose com neutrofilia**; pode atingir olho, testículo e rim.|q-adap21-101,q-usprp2026-081,q-uspsp4-004]] [[O tratamento é a **talidomida** (ou pentoxifilina, quando ela não pode ser usada), mantendo a PQT-U. A talidomida causa **malformação grave**: mulher em idade fértil só a recebe com gravidez excluída e **dois métodos** contraceptivos, um deles de barreira; o uso longo também dá neuropatia periférica.|q-adap21-101,q-scmsp2021-019]]`,
          texto: `- Nódulos dolorosos + febre em **multibacilar**: **eritema nodoso hansênico**. {q-adap21-101,q-usprp2026-081,q-uspsp4-004}
- **Talidomida**, mantendo a PQT-U; na mulher fértil, **dois métodos**. {q-adap21-101,q-scmsp2021-019}` },
        { id: "rea-neurite", titulo: "Neurite: quando o corticoide entra", conferir: false, diretrizes: ["pcdt-hanseniase"],
          questoes: ["q-unifesp2025-035","q-unicampdis2025-009","q-usprp2021-101","q-adap25-035"],
          prosa: `[[O nervo inflamado dentro do seu túnel (o ulnar no cotovelo) é comprimido e morre em semanas. Por isso, **qualquer reação com neurite** (dor no trajeto do nervo, perda de sensibilidade ou de força), com acometimento do olho ou do testículo, recebe **prednisona**. No eritema nodoso com neurite, entra **prednisona junto da talidomida**. É o corticoide que previne a sequela.|q-unifesp2025-035,q-unicampdis2025-009,q-usprp2021-101,q-adap25-035]]`,
          texto: `- Neurite em qualquer reação: **prednisona**; tipo 2 com neurite: **prednisona + talidomida**. {q-unifesp2025-035,q-unicampdis2025-009,q-usprp2021-101,q-adap25-035}` },
      ],
    },
    {
      id: "contatos", titulo: "Vigilância de contatos",
      introducao: `[[O doente multibacilar sem tratamento infecta quem dorme sob o mesmo teto. A **investigação dos contatos** é a estratégia com melhor evidência para achar casos cedo e cortar a transmissão.|q-tp20222-104,q-usp2024-060]]`,
      fragmentos: [
        { id: "con-exame", titulo: "Quem examinar, como e a BCG", conferir: false, diretrizes: ["pcdt-hanseniase"],
          questoes: ["q-usp2024-060","q-tp20222-104","q-einstein2027-069","q-sirio2027-009"],
          prosa: `[[Contato é quem **mora ou morou com o doente nos últimos 5 anos**, parente ou não. Todos recebem **exame dermatoneurológico** (pele e nervos), qualquer que seja a forma do caso índice; baciloscopia não é exame de triagem de contato.|q-usp2024-060,q-tp20222-104,q-einstein2027-069]] [[O **teste rápido** (anticorpo **IgM anti-PGL-1**) está aprovado no SUS só para investigar contatos: positivo sem sinal da doença, a pessoa é reavaliada a cada ano.|q-sirio2027-009]] [[O contato **sem sinal da doença**, com mais de 1 ano e sem BCG ou com uma só dose, recebe **BCG**. O contato com sinal da doença é caso: começa a PQT-U.|q-tp20222-104]]`,
          texto: `- Contatos dos **últimos 5 anos**: **exame dermatoneurológico** de todos. {q-usp2024-060,q-tp20222-104,q-einstein2027-069}
- Teste rápido **IgM anti-PGL-1**: só para contatos. {q-sirio2027-009}
- **BCG** no contato **sem** sinal da doença. {q-tp20222-104}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["pcdt-hanseniase"],
          questoes: ["q-didepm-076","q-fmabc2024-092","q-uspsp4-004","q-scmsp2021-019","q-sirio2027-009"],
          prosa: `[[**Esquema paucibacilar**: desde 2021 o paucibacilar recebe as três drogas da PQT-U por 6 doses; a didepm-076 deu como certo o esquema antigo, **rifampicina e dapsona** por 6 doses, e a fmabc2024-092 descreve o paciente paucibacilar com as mesmas duas drogas (o ponto cobrado ali é a síndrome da sulfona, que não muda).|q-didepm-076,q-fmabc2024-092]] [[**Eritema nodoso em paciente paucibacilar**: a reação tipo 2 só acontece em multibacilar; na tuberculoide com baciloscopia negativa, nódulos dolorosos são eritema nodoso de **outra causa** (na uspsp4-004, o anticoncepcional).|q-uspsp4-004]] [[**"Reação nunca antes do tratamento"** é falso: a reação pode ser a primeira manifestação da doença.|q-scmsp2021-019]] [[**Ordem da perda de sensibilidade**: térmica, depois dolorosa, depois tátil; a alternativa que põe a tátil primeiro está errada.|q-sirio2027-009]]`,
          texto: `- PB com **duas drogas**: esquema anterior a 2021; a prova cobrou o antigo. {q-didepm-076,q-fmabc2024-092}
- Nódulos em **paucibacilar** não são reação tipo 2. {q-uspsp4-004}
- Reação pode vir **antes** da PQT-U. {q-scmsp2021-019}
- **Térmica** é a primeira a cair. {q-sirio2027-009}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: as formas clínicas",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-formas", titulo: "Lesão, baciloscopia, Mitsuda e classificação", conferir: true,
          questoes: ["q-unesp2023-060","q-tp20212-027","q-einstein2027-069","q-usp2023-044"],
          prosa: `[[A forma é a imunidade vista na pele.|q-unesp2023-060,q-tp20212-027,q-einstein2027-069,q-usp2023-044]]

| Forma | Lesão | Baciloscopia | Mitsuda | Classificação |
|---|---|---|---|---|
| Indeterminada | mácula hipocrômica mal delimitada | negativa | variável | paucibacilar |
| Tuberculoide | placa bem delimitada, anestésica, poucas | negativa | positiva | paucibacilar |
| Dimorfa | muitas placas, borda externa imprecisa | positiva ou negativa | variável | multibacilar |
| Virchowiana | infiltração difusa, madarose, hansenomas | positiva | negativa | multibacilar |`,
          texto: `- Indeterminada: **mácula**. {q-unesp2023-060}
- Tuberculoide: **placa anestésica**. {q-tp20212-027}
- Dimorfa: **muitas placas**. {q-einstein2027-069}
- Virchowiana: **infiltração, baciloscopia +**. {q-usp2023-044}` },
      ],
    },
  ],
});
