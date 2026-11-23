/* resumos/isquemia-arterial/resumo.js — resumo adaptativo de isquemia arterial (ass-cirvasc-arterial): oclusão
   arterial aguda (embolia × trombose, Rutherford, revascularização, reperfusão e compartimento), doença arterial
   obstrutiva periférica (claudicação, ITB, isquemia crítica, pé diabético, Buerger), isquemia mesentérica aguda,
   não oclusiva e crônica, colite isquêmica, trauma vascular, aneurisma de aorta e anatomia, armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- isquemia-arterial */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "isquemia-arterial",
  titulo: "Isquemia arterial aguda e crônica",
  assunto: "ass-cirvasc-arterial",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "esvs-isquemia-aguda", texto: "ESVS — Clinical practice guidelines on the management of acute limb ischaemia (Björck et al., Eur J Vasc Endovasc Surg 2020)", lidoEm: null },
    { id: "aha-daop", texto: "ACC/AHA — Guideline for the management of lower extremity peripheral artery disease (Gornik et al., 2024)", lidoEm: null },
    { id: "esvs-mesenterica", texto: "ESVS — Clinical practice guidelines on the management of diseases of mesenteric arteries and veins (2017; atualização 2025)", lidoEm: null },
    { id: "esvs-aaa", texto: "ESVS — Clinical practice guidelines on the management of abdominal aorto-iliac artery aneurysms (Wanhainen et al., 2024)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "aguda", titulo: "Oclusão arterial aguda do membro",
      introducao: `[[O membro tolera poucas horas sem sangue: nervo e músculo morrem primeiro (por isso a perda de sensibilidade e de força marca a gravidade), a pele por último. A oclusão aguda vem de embolia ou de trombose. A embolia sai quase sempre do coração (fibrilação atrial, prótese mal anticoagulada) e para onde a artéria se estreita, nas bifurcações, sobretudo na femoral comum; chega num membro sem colaterais, de forma súbita e grave, com o outro membro normal. A trombose acontece sobre placa antiga, em quem já claudicava, com colaterais que amortecem o quadro e doença no outro membro.|q-tp20241-066,q-unesp2022-064,q-unesp2024-078,q-usprp2026-002,q-adap22-018]] [[Os sinais são os seis P: dor, palidez, ausência de pulso, parestesia, paralisia e frialdade; tempo de enchimento venoso longo (mais de 60 segundos) e veias superficiais vazias ou trombosadas também denunciam a falta de fluxo.|q-tp20202-069,q-unicampdis2022-015]]

Veja também: **AVC** (embolia de origem cardíaca e carótida), **Arritmias** (fibrilação atrial e anticoagulação), **Infecções de pele e partes moles** (pé diabético infectado), **Trauma abdominal** e **ATLS** (lesões vasculares) e **Abdome agudo** nos resumos de cirurgia.`,
      fragmentos: [
        { id: "oaa-conduta", titulo: "Diagnóstico e conduta no membro viável", conferir: true, diretrizes: ["esvs-isquemia-aguda"],
          figuras: [{ arquivo: "figuras/rutherford.svg", legenda: "Esquema autoral: classificação de Rutherford da isquemia aguda e a conduta em cada grau." }],
          questoes: ["q-tp20202-069","q-tp20241-066","q-unesp2024-078","q-unesp2022-064","q-usprp2026-002","q-unicampdis2022-015","q-adap22-018","q-usprp2021-080"],
          prosa: `[[A classificação de Rutherford separa o que se salva: I (viável, sem perda de sensibilidade nem de força, Doppler arterial audível); IIa (ameaçado marginalmente, perda de sensibilidade só nos dedos, força normal, Doppler arterial em geral inaudível); IIb (ameaçado imediatamente, perda de sensibilidade além dos dedos e alguma fraqueza, Doppler arterial inaudível); III (irreversível, anestesia, paralisia e rigidez, sem Doppler arterial nem venoso).|q-adap22-018,q-tp20202-069,q-tp20241-066]] [[Diante da suspeita, heparina não fracionada venosa em dose plena imediatamente, para o trombo não crescer, analgesia e membro protegido, levemente pendente e sem compressão. No membro ameaçado, revascularização urgente: na embolia, embolectomia com cateter de Fogarty; na trombose sobre placa, imagem e tratamento da lesão (endovascular, trombólise dirigida ou ponte).|q-adap22-018,q-tp20241-066,q-unesp2024-078,q-usprp2021-080,q-usprp2026-002]]`,
          texto: `- Arritmia e dor com pulsos ausentes: **oclusão arterial aguda**. {q-tp20202-069}
- FA com perna fria há 3 horas: **embolectomia**. {q-tp20241-066,q-unesp2024-078}
- Local mais comum da embolia: **bifurcação femoral**. {q-unesp2022-064}
- Claudicante com piora súbita: **trombose arterial aguda**. {q-usprp2026-002}
- Enchimento venoso > 60 s e veias trombosadas: **oclusão arterial aguda**. {q-unicampdis2022-015}
- FA, pé frio, hipoestesia só nos dedos: **heparina venosa e revascularização urgente**. {q-adap22-018}
- Até a cirurgia: **heparina plena, analgesia e membro pendente sem compressão**. {q-usprp2021-080}` },
        { id: "oaa-irreversivel", titulo: "Isquemia irreversível", conferir: true, diretrizes: ["esvs-isquemia-aguda"],
          casos: ["q-unesp2021-079"],
          questoes: ["q-adap21-080","q-unifesp2022-018","q-tp20232-066","q-tp20261-116","q-unesp2021-079"],
          prosa: `[[Cianose fixa (que não clareia à pressão), paralisia, anestesia e rigidez muscular, muitas horas ou dias depois do início, são membro morto (Rutherford III). Reabrir a artéria só lançaria potássio, ácido e mioglobina na circulação (risco de parada e de insuficiência renal) sem salvar nada: a conduta é amputação primária, com anticoagulação e correção dos distúrbios. A dor que melhorou e a perna que não se move mais é piora, não melhora.|q-adap21-080,q-unifesp2022-018,q-tp20232-066,q-tp20261-116,q-unesp2021-079]]`,
          texto: `- 14 horas com cianose fixa, paralisia e rigidez: **amputação primária (Rutherford III)**. {q-adap21-080}
- Embolia há 8 dias: **amputação primária**. {q-unifesp2022-018}
- Dor que melhorou e perna parada sem fluxo arterial nem venoso: **grau III, amputação**. {q-tp20232-066,q-tp20261-116}
- Cianose fixa há 36 horas com FA: **embólica, Rutherford III, amputação e anticoagulação**. {q-unesp2021-079}` },
        { id: "oaa-reperfusao", titulo: "Depois da revascularização: reperfusão e compartimento", conferir: true,
          questoes: ["q-usprp2023-099","q-einstein2023-017","q-unesp2026-062"],
          prosa: `[[Quando o sangue volta ao músculo isquêmico, o oxigênio reage com a hipoxantina acumulada e forma radicais livres, que atraem leucócitos e destroem membranas (lipoperoxidação): o músculo incha. Dentro dos compartimentos fechados por fáscia da perna, o inchaço sobe a pressão até fechar os capilares de novo (síndrome compartimental): dor desproporcional, edema tenso, parestesia. A conduta é fasciotomia dos quatro compartimentos, sem esperar a perda de pulso.|q-unesp2026-062,q-einstein2023-017,q-usprp2023-099]]`,
          texto: `- Após embolectomia, dor e perna tensa: **síndrome compartimental**. {q-usprp2023-099}
- Edema tenso 2 horas depois: **fasciotomia**. {q-einstein2023-017}
- Reperfusão: **radicais livres, leucócitos e lipoperoxidação**. {q-unesp2026-062}` },
      ],
    },
    {
      id: "cronica", titulo: "Doença arterial obstrutiva periférica",
      introducao: `[[A aterosclerose estreita a artéria aos poucos e o fluxo basta em repouso mas não no esforço: o músculo abaixo da lesão dói ao andar e melhora parado (claudicação intermitente). A panturrilha dói na doença femoropoplítea, a nádega e a coxa na aortoilíaca. O índice tornozelo-braquial (pressão sistólica do tornozelo ÷ a do braço) mede a gravidade: normal de 1 a 1,4, doença abaixo de 0,9, isquemia grave abaixo de 0,4; acima de 1,4 a artéria está calcificada e não comprime (diabetes, doença renal), e o índice é falsamente normal.|q-amrigs2021-039,q-unicampdis2023-024,q-didepm-012,q-adap21-079]] [[Quando nem o repouso basta, vem a isquemia crítica: dor em repouso que acorda à noite e melhora com a perna pendente, úlcera e gangrena. O claudicante raramente perde a perna, mas morre do coração: o tratamento é antes de tudo o do risco cardiovascular.|q-adap26-009,q-usprp2027-079]]`,
      fragmentos: [
        { id: "dao-claudicacao", titulo: "Claudicação intermitente", conferir: true, diretrizes: ["aha-daop"],
          questoes: ["q-adap21-079","q-unifesp2026-009","q-tp20231-061","q-usprp2027-079","q-amrigs2021-039","q-unicampdis2025-070","q-unicampdis2023-024","q-didepm-012","q-unesp2025-079"],
          prosa: `[[A claudicação se trata clinicamente: parar de fumar, exercício supervisionado (caminhar até a dor, descansar e repetir, que abre colaterais), antiagregante, estatina de alta potência e controle da pressão e do diabetes; cilostazol aumenta a distância. Anticoagulação plena não é tratamento; a rivaroxabana em dose baixa com AAS é opção em casos escolhidos.|q-adap21-079,q-unifesp2026-009,q-tp20231-061,q-usprp2027-079,q-unicampdis2025-070]] [[A revascularização da claudicação fica para quem é limitado no dia a dia apesar do tratamento clínico (piora para 30 metros, por exemplo).|q-unesp2025-079]] [[Com índice falsamente alto pela calcificação, mede-se o índice hálux-braquial ou faz-se Doppler.|q-didepm-012]]`,
          texto: `- Claudicação a 400 m: **tratamento clínico**. {q-adap21-079,q-unifesp2026-009}
- Claudicação a 300 m: **vasodilatador, antiagregante e estatina**. {q-tp20231-061}
- Claudicação com sinvastatina: **atorvastatina, AAS e exercício estruturado**. {q-usprp2027-079}
- Panturrilha com pulso pedioso fraco: **oclusão femoropoplítea**. {q-amrigs2021-039}
- Primeiro passo: **caminhadas diárias supervisionadas**. {q-unicampdis2025-070}
- ITB pela pior pressão do tornozelo ÷ braquial: **0,34**. {q-unicampdis2023-024}
- ITB 1,6 no diabético renal: **falso-normal; índice hálux-braquial**. {q-didepm-012}
- Piora para 30 m: **angiografia e revascularização**. {q-unesp2025-079}` },
        { id: "dao-critica", titulo: "Isquemia crítica, úlcera e pé diabético", conferir: true, diretrizes: ["aha-daop"],
          casos: ["q-usprp2021-079"],
          questoes: ["q-adap26-009","q-usprp2021-079","q-usprp2022-039","q-usprp2024-029","q-famema2023-074","q-sirio2023-023","q-unicampdis2025-020","q-usprp2023-081","q-unesp2021-078","q-sessp2024-023"],
          prosa: `[[Dor em repouso ou necrose com pulsos distais ausentes é isquemia crítica e pede imagem (angiografia, angiotomografia) para revascularizar: sem sangue, nenhuma ferida fecha e nenhuma amputação pequena cicatriza. A ordem é revascularizar primeiro e depois desbridar ou amputar o que estiver morto. Fontaine IV e Rutherford 6 são gangrena e perda tecidual extensa. Úlcera de perna que não melhora com bota de Unna e índice baixo é arterial, e a investigação é arterial.|q-adap26-009,q-usprp2021-079,q-usprp2022-039,q-usprp2024-029,q-famema2023-074,q-sirio2023-023,q-usprp2023-081]] [[No pé diabético somam-se a neuropatia (o paciente anda sobre a úlcera sem dor), a doença das pequenas artérias e a doença das artérias da perna; pulso palpável não afasta isquemia. A necrose do hálux com pulsos distais ausentes pede arteriografia, revascularização e então a amputação do dedo.|q-unesp2021-078,q-sessp2024-023]] [[No homem jovem e fumante, isquemia de pequenas artérias das mãos e dos pés, com úlcera de dedo, é tromboangeíte obliterante (doença de Buerger): o tratamento é parar de fumar.|q-unicampdis2025-020]]`,
          texto: `- Dor em repouso e úlcera no hálux: **imagem e revascularização**. {q-adap26-009}
- Claudicação antiga com escurecimento do hálux: **arteriografia para revascularizar**. {q-usprp2021-079,q-usprp2022-039,q-usprp2024-029}
- Úlcera profunda com gangrena do pé: **Fontaine IV, Rutherford 6**. {q-famema2023-074}
- Úlcera que não melhora com bota de Unna e ITB baixo: **angiotomografia arterial**. {q-sirio2023-023}
- Jovem fumante com úlcera no dedo: **tromboangeíte obliterante**. {q-unicampdis2025-020}
- Úlcera plantar com osteomielite e ITB 0,5: **revascularizar e depois desbridar**. {q-usprp2023-081}
- Necrose do hálux com pulsos distais ausentes: **macro e microvascular; arteriografia, revascularização e amputação**. {q-unesp2021-078}
- Anda sobre a úlcera sem dor: **neuropatia sensitiva**. {q-sessp2024-023}` },
      ],
    },
    {
      id: "mesenterica", titulo: "Isquemia mesentérica e colite isquêmica",
      introducao: `[[O intestino morre de dentro para fora: a mucosa, que mais gasta oxigênio, sofre primeiro, e a dor é visceral, intensa e desproporcional ao exame (abdome ainda mole); o peritonismo só aparece quando a parede inteira necrosa. A mesentérica superior irriga do jejuno até o terço proximal do transverso, e o êmbolo para logo depois da origem dela, poupando o primeiro jejuno.|q-tp20212-070,q-unesp2024-062,q-simepm89-008,q-udisc20262-069]]`,
      fragmentos: [
        { id: "mes-aguda", titulo: "Isquemia mesentérica aguda", conferir: true, diretrizes: ["esvs-mesenterica"],
          casos: ["q-uspsp4-049","q-usp2024-038"],
          questoes: ["q-tp20212-070","q-unesp2024-062","q-simepm89-007","q-simepm89-008","q-udisc20262-069","q-uspsp4-049","q-usprp2027-078","q-scmsp2023-037","q-usp2024-038","q-fmabc2023-034"],
          prosa: `[[Idoso com fibrilação atrial e dor abdominal súbita, intensa, com exame pobre e lactato alto é isquemia mesentérica até prova em contrário; a angiotomografia é o exame de escolha. Sem sinais de necrose, revasculariza-se (endovascular ou embolectomia) e a laparotomia fica para avaliar e ressecar o intestino morto.|q-tp20212-070,q-simepm89-007,q-simepm89-008,q-udisc20262-069,q-uspsp4-049,q-usprp2027-078,q-unesp2024-062]] [[A forma não oclusiva vem do baixo fluxo com vasoconstrição esplâncnica: choque cardiogênico, vasopressores, diálise. A colite isquêmica, a isquemia intestinal mais comum, atinge as zonas de fronteira entre territórios (ângulo esplênico, junção retossigmoide) e costuma ser transitória.|q-scmsp2023-037,q-usp2024-038,q-fmabc2023-034]]`,
          texto: `- Dor súbita desproporcional com antiarrítmico: **isquemia mesentérica**. {q-tp20212-070}
- Oclusão na origem da AMS: **jejuno, íleo, ceco, ascendente e transverso proximal**. {q-unesp2024-062}
- Dor súbita sem peritonismo: **tomografia**; abdome agudo **vascular**. {q-simepm89-007,q-simepm89-008}
- Exame de escolha: **angiotomografia**. {q-udisc20262-069}
- Imagem compatível: **B**. {q-uspsp4-049}
- Êmbolo na AMS sem necrose: **revascularização endovascular**. {q-usprp2027-078}
- Causa mais frequente (a prova): **isquemia não oclusiva**. {q-scmsp2023-037}
- Coronariopata com dobutamina e noradrenalina: **isquemia não oclusiva**. {q-usp2024-038}
- Colite isquêmica: **ângulo esplênico**. {q-fmabc2023-034}` },
        { id: "mes-cronica", titulo: "Isquemia mesentérica crônica", conferir: true, diretrizes: ["esvs-mesenterica"],
          casos: ["q-usprp2023-100"],
          questoes: ["q-usprp2023-100","q-famerp2024-032","q-unicamp2022-026","q-unicamp2023-031"],
          prosa: `[[A aterosclerose das artérias do intestino faz a "angina abdominal": dor depois de comer (quando o intestino pede mais sangue), medo de comer e emagrecimento importante, em fumante com doença vascular. Investiga-se com angiotomografia, e a dor que fica contínua e forte pode ser a trombose aguda sobre essa placa.|q-usprp2023-100,q-famerp2024-032,q-unicamp2022-026,q-unicamp2023-031]]`,
          texto: `- Dor pós-prandial e perda de 20 kg: **isquemia mesentérica crônica**. {q-usprp2023-100}
- Idoso com dor após refeições: **investigar angina abdominal**. {q-famerp2024-032}
- Dor pós-prandial que ficou contínua: **angiotomografia**. {q-unicamp2022-026}
- Cólica pós-prandial com aterosclerose: **angina mesentérica**. {q-unicamp2023-031}` },
      ],
    },
    {
      id: "outros", titulo: "Trauma vascular, aneurisma e anatomia",
      introducao: `[[Lesão de artéria com sinais "duros" (sangramento pulsátil, hematoma expansivo, pulso ausente, frêmito) não pede exame: comprime-se e leva-se ao centro cirúrgico. Na reconstrução, o melhor substituto é a veia safena do membro oposto (a do lado lesado pode ser a drenagem que sobrou).|q-unifesp2026-010,q-usprp2026-016,q-simepm89-005,q-unesp2026-061]]`,
      fragmentos: [
        { id: "out-trauma", titulo: "Trauma vascular", conferir: true,
          questoes: ["q-unifesp2026-010","q-usprp2026-016","q-simepm89-005","q-unesp2026-061"],
          prosa: `[[O sangramento ativo com membro sem pulso se controla por compressão direta enquanto se vai à cirurgia; o reparo é direto (sutura, enxerto ou ponte), não embolização nem observação. A anticoagulação do paciente não muda a indicação.|q-unifesp2026-010,q-usprp2026-016,q-simepm89-005]]`,
          texto: `- Facada na coxa com sangramento e pulso ausente: **compressão e centro cirúrgico**. {q-unifesp2026-010}
- Tiro na coxa sem pulso distal: **exploração e reparo da femoral**. {q-usprp2026-016}
- Hematoma expansivo inguinal: **exploração imediata**. {q-simepm89-005}
- Ponte na luxação do joelho: **safena contralateral**. {q-unesp2026-061}` },
        { id: "out-aneurisma-anatomia", titulo: "Aneurisma de aorta e anatomia", conferir: true, diretrizes: ["esvs-aaa"],
          questoes: ["q-adap26-010","q-amrigs2020-040","q-unesp2023-066","q-sirio2026-037"],
          prosa: `[[O aneurisma de aorta abdominal cresce em silêncio e rompe; o risco de ruptura passa o da cirurgia a partir de 5,5 cm no homem (5 cm na mulher) ou com crescimento rápido: reparo eletivo, endovascular ou aberto, depois da avaliação de risco. Abaixo disso, seguimento com imagem e controle do fumo e da pressão.|q-adap26-010]] [[No desfiladeiro torácico, a costela cervical ou os escalenos comprimem a artéria, a veia subclávia ou o plexo braquial. A veia mesentérica inferior costuma drenar na esplênica. Na endarterectomia de carótida, o nervo hipoglosso cruza o campo e, lesado, desvia a língua.|q-amrigs2020-040,q-unesp2023-066,q-sirio2026-037]]`,
          texto: `- Aneurisma de 5,8 cm assintomático: **reparo eletivo**. {q-adap26-010}
- Desfiladeiro torácico: **artéria, veia subclávia ou plexo braquial**. {q-amrigs2020-040}
- Mesentérica inferior **drena na esplênica**. {q-unesp2023-066}
- Língua na endarterectomia: **hipoglosso**. {q-sirio2026-037}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["esvs-mesenterica"],
          questoes: ["q-scmsp2023-037","q-usprp2021-080","q-tp20231-061","q-tp20232-066"],
          prosa: `[[**Causa da isquemia mesentérica aguda**: nas séries, a embolia arterial é a causa mais comum (40 a 50%), seguida da trombose; a não oclusiva fica perto de 20%. A scmsp2023-037 deu a não oclusiva como a mais frequente.|q-scmsp2023-037]] [[**Posição do membro**: a orientação é deixá-lo levemente pendente (a gravidade ajuda a perfusão); a usprp2021-080 falou em "proclive", que se lê como a mesma ideia de pés abaixo do tronco.|q-usprp2021-080]] [[**Vasodilatador na claudicação**: o que tem evidência é o cilostazol; outros vasodilatadores não melhoram a marcha. A tp20231-061 falou genericamente em "vasodilatador".|q-tp20231-061]] [[**Melhora da dor na isquemia aguda**: é sinal de morte do nervo; a tp20232-066 usou essa pegadinha.|q-tp20232-066]]`,
          texto: `- Regra: **embolia** é a causa mais comum; a prova deu a não oclusiva. {q-scmsp2023-037}
- Membro **pendente**, sem compressão. {q-usprp2021-080}
- O vasodilatador com evidência é o **cilostazol**. {q-tp20231-061}
- Dor que melhora com paralisia = **nervo morto**. {q-tp20232-066}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: embolia × trombose",
      introducao: `Resumo do capítulo de oclusão aguda.`,
      fragmentos: [
        { id: "cmp-embolia-trombose", titulo: "Como separar e tratar", conferir: true,
          questoes: ["q-unesp2024-078","q-usprp2026-002","q-unesp2022-064","q-adap22-018"],
          prosa: `[[A história e o outro membro separam as duas.|q-unesp2024-078,q-usprp2026-002,q-unesp2022-064,q-adap22-018]]

| | Embolia | Trombose |
|---|---|---|
| Origem | coração (FA, prótese) | placa aterosclerótica |
| História | sem claudicação prévia | claudicação antiga |
| Início | súbito e grave | mais lento (colaterais) |
| Outro membro | pulsos normais | pulsos diminuídos |
| Onde para | bifurcações (femoral comum) | sobre a placa |
| Tratamento | heparina + embolectomia com Fogarty | heparina + imagem e revascularização da lesão |`,
          texto: `- FA, sem claudicação, outro membro normal: **embolia; Fogarty**. {q-unesp2024-078}
- Claudicante com piora aguda: **trombose**. {q-usprp2026-002}
- Embolia para na **bifurcação femoral**. {q-unesp2022-064}
- Em todas: **heparina venosa já**. {q-adap22-018}` },
      ],
    },
  ],
});
