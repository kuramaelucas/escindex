/* resumos/contracepcao/resumo.js — resumo adaptativo de contracepção: eficácia e escolha (LARC, adolescentes,
   sigilo), uso dos hormonais, critérios de elegibilidade da OMS (cardiovascular e trombose; remédios e outras
   condições), pós-parto, DIU, emergência, métodos comportamentais e laqueadura (Lei 14.443/2022).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- contracepcao */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "contracepcao",
  titulo: "Contracepção",
  assunto: "ass-contracepcao",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "oms-mec", texto: "OMS — Medical eligibility criteria for contraceptive use, 6ª edição (2025), iris.who.int", lidoEm: "2026-11-19" },
    { id: "cdc-mec", texto: "CDC — U.S. Medical Eligibility Criteria for Contraceptive Use (2024)", lidoEm: null },
    { id: "lei-14443", texto: "Lei nº 14.443, de 2 de setembro de 2022 (altera a Lei nº 9.263/1996, planejamento familiar)", lidoEm: null },
    { id: "ms-saude-sexual", texto: "Ministério da Saúde — Cadernos de Atenção Básica nº 26: Saúde Sexual e Saúde Reprodutiva", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas ou desatualizada; a de laqueadura e a de puerpério entram pelas reposições", questoes: ["q-amrigs2020-057","q-amrigs2021-056","q-sirio2025-078","q-famema2021-051"] },
  ],
  doencas: [
    {
      id: "escolha", titulo: "Eficácia e escolha do método",
      introducao: `[[A eficácia de um método depende mais de quanto ele exige de quem usa do que do mecanismo: implante e DIU não dependem de lembrar, e falham menos de 1 vez em 100 mulheres por ano, como a laqueadura; pílula, injetável e preservativo falham bem mais no uso real.|q-iamspe2023-049,q-iamspe2021-053,q-sessp2022-090]] O índice de Pearl mede isso: gestações por 100 mulheres em um ano de uso.

[[Por isso os métodos reversíveis de longa duração (implante e DIU) são a primeira escolha para adolescentes e nulíparas, sem restrição de idade nem de paridade, e se oferecem no mesmo dia.|q-tp20241-112,q-tp20261-098,q-tp20202-084,q-adap24-035,q-unifesp2024-050,q-sirio2022-061,q-sirio2025-063]] [[A adolescente tem direito a consulta e sigilo; o profissional orienta e prescreve sem revelar aos pais, salvo risco à vida ou violência — e abaixo de 14 anos a relação sexual é presumida violência, o que muda a conduta.|q-usp2024-091,q-tp20252-013]]

Veja também: **Ciclo menstrual** (SOP, sangramento e dismenorreia tratados com hormônio), **Puerpério**, **Climatério** (contracepção na perimenopausa), **IST** (preservativo e profilaxias).`,
      fragmentos: [
        { id: "esc-eficacia", titulo: "Eficácia, LARC e adolescentes", conferir: true, diretrizes: ["ms-saude-sexual"],
          questoes: ["q-iamspe2023-049","q-iamspe2021-053","q-tp20241-112","q-tp20261-098","q-tp20202-084","q-adap24-035","q-unifesp2024-050","q-unesp2023-040","q-sirio2025-063","q-sirio2022-061","q-usp2024-091","q-tp20252-013","q-iamspe2025-097","q-famerp2025-030","q-scmsp2023-091","q-sessp2022-090","q-sirio2025-073","q-usprp2021-072"],
          prosa: `[[Antes de um contraceptivo hormonal combinado, o único exame essencial é a pressão arterial; para progestagênio isolado ou DIU de cobre, nenhum exame é obrigatório.|q-usprp2021-072]] [[Quem recusa hormônio e DIU e tem mais de um parceiro fica com o preservativo, que também protege de IST.|q-sirio2025-073]] [[Educação sexual abrangente na escola, com a família, é a estratégia que mais reduz gravidez na adolescência.|q-iamspe2025-097,q-famerp2025-030]]`,
          texto: `- Baixo índice de Pearl: **implante de etonogestrel**. {q-iamspe2023-049}
- DIU-LNG: eficácia **semelhante à laqueadura**. {q-iamspe2021-053}
- Adolescente: **LARC** como primeira escolha. {q-tp20241-112,q-tp20261-098,q-tp20202-084}
- Adolescente com vários parceiros: **inserção imediata** de implante ou DIU, com preservativo. {q-unifesp2024-050,q-adap24-035}
- Aos 15 anos, sem doença: **todos os métodos** podem ser usados. {q-unesp2023-040}
- Adolescente obesa com ciclos longos: **DIU hormonal**. {q-sirio2025-063}
- DIU de cobre serve a **nuligestas de 18–20 anos**. {q-sirio2022-061}
- Médico treinado: oferecer **DIU na UBS** ou injetável. {q-scmsp2023-091}
- Sem doenças, quer muita eficácia sem hormônio: **DIU de cobre 380A**. {q-sessp2022-090}
- 15 anos com prima: **contraceptivo e PrEP** sem revelar a um adulto. {q-usp2024-091}
- 12 anos: prescrever e **informar os responsáveis** (vulnerável). {q-tp20252-013}
- Pressão arterial: único exame **antes do combinado**. {q-usprp2021-072}
- Recusa hormônio e DIU: **preservativo**. {q-sirio2025-073}
- Prevenção da gravidez na adolescência: **educação sexual** com a família. {q-iamspe2025-097}
- Queda da fecundidade: **planejamento familiar**. {q-famerp2025-030}` },
      ],
    },
    {
      id: "hormonais", titulo: "Como os hormonais funcionam e como se usam",
      introducao: `[[O contraceptivo combinado inibe o pico de LH e a ovulação (o estrogênio segura o FSH e estabiliza o endométrio); o progestagênio isolado em dose contraceptiva (desogestrel) também inibe a ovulação, enquanto o DIU de levonorgestrel age sobretudo engrossando o muco e afinando o endométrio, com a ovulação mantida.|q-usprp2026-065,q-einstein2021-031,q-famerp2024-046]] [[Na pausa da cartela, o sangramento é só privação hormonal: some com o tempo, porque o endométrio fica fino, e isso é normal.|q-unicampdis2024-045,q-amrigs2025-045]]

[[O estrogênio é o que dá trombose: aumenta fatores de coagulação no fígado. A drospirenona é derivada da espironolactona e o desogestrel é pró-fármaco (vira etonogestrel).|q-einstein2023-063,q-amrigs2022-055]]`,
      fragmentos: [
        { id: "hor-uso", titulo: "Uso, esquecimento e efeitos",
          questoes: ["q-adap21-064","q-amrigs2025-045","q-unicampdis2024-045","q-usprp2026-065","q-amrigs2022-055","q-einstein2023-063","q-einstein2021-031","q-famerp2024-046","q-usp2024-101","q-sirio2024-076","q-uspsp4-033","q-uspsp2-029"],
          prosa: `[[Esquecer **dois ou mais** comprimidos seguidos (48 h ou mais) pede tomar o último esquecido, seguir a cartela e usar preservativo por 7 dias; a emergência entra se o esquecimento foi na primeira semana (a pausa acabou de deixar os folículos crescerem) e houve relação desprotegida.|q-adap21-064]] Um só comprimido atrasado (menos de 48 h): toma-se ao lembrar e segue, sem método adicional. [[Cefaleia menstrual pela queda do estrogênio melhora com progestagênio contínuo, que tira a pausa.|q-usp2024-101]]`,
          texto: `- Dois esquecidos seguidos na 2ª semana, sem relação nesses dias: **tomar já, preservativo 7 dias**, sem emergência. {q-adap21-064}
- Escape nos primeiros meses: **adaptação**, reforçar o uso correto. {q-amrigs2025-045}
- Sem sangramento na pausa: **normal**. {q-unicampdis2024-045}
- Desogestrel: FSH, LH e estradiol **normais** na dosagem isolada. {q-usprp2026-065}
- Precisa ser bioativado: **desogestrel**. {q-amrigs2022-055}
- Menor risco trombótico entre as opções: **drospirenona** (isolada). {q-einstein2023-063}
- Dismenorreia secundária: **DIU-LNG** (muco e endométrio). {q-einstein2021-031}
- Mirena: benefício **não contraceptivo**. {q-famerp2024-046}
- Cólica e cefaleia menstruais: **pílula progestagênica contínua**. {q-usp2024-101}
- Obesa com acne, quer ciclo regular: **injetável combinado**. {q-sirio2024-076}
- Quer método não oral: **implante**. {q-uspsp4-033}
- Cefaleia com fotofobia, sem parceiro fixo: **implante**. {q-uspsp2-029}` },
      ],
    },
    {
      id: "elegibilidade", titulo: "Critérios de elegibilidade da OMS",
      introducao: `[[A OMS classifica cada método em cada condição: 1, sem restrição; 2, vantagens superam riscos; 3, riscos geralmente superam (só sem alternativa); 4, risco inaceitável.|q-usprp2025-060,q-scmsp2025-076]] Quase toda restrição nasce do estrogênio, que aumenta trombose venosa e arterial; por isso o progestagênio isolado e o DIU de cobre são a saída na maioria das contraindicações.

[[Enxaqueca com aura, em qualquer idade, é categoria 4 para o combinado: aura e estrogênio somam risco de AVC isquêmico.|q-sessp2022-065,q-adap26-043,q-tp20231-095,q-einstein2026-057,q-didepm-048]] [[Tabagismo a partir dos 35 anos é 3 (menos de 15 cigarros) ou 4 (15 ou mais) para o combinado.|q-024,q-uspsp1-077,q-famerp2022-038]] [[Trombose venosa prévia é 4 para o combinado; trombofilia conhecida também; história familiar é 2 e não se rastreia trombofilia antes de prescrever.|q-famerp2023-050,q-usp2026-018,q-sirio2021-066,q-fmabc2021-049]] [[Lúpus com antifosfolípide positivo é 4 para o combinado e 3 para os progestagênios; o DIU de cobre é 1.|q-unesp2024-039,q-usp2026-116,q-unicamp2023-053]]`,
      fragmentos: [
        { id: "ele-vascular", titulo: "Enxaqueca, tabaco, hipertensão, trombose e lúpus", conferir: false, diretrizes: ["oms-mec"],
          figuras: [{ arquivo: "figuras/categorias.svg", legenda: "Esquema autoral: as quatro categorias da OMS e as condições vasculares que mais caem." }],
          questoes: ["q-024","q-adap26-043","q-sessp2022-065","q-tp20231-095","q-einstein2026-057","q-didepm-048","q-uspsp1-077","q-famerp2022-038","q-tp20241-092","q-sirio2026-079","q-tp20251-095","q-famerp2023-050","q-unicampdis2024-104","q-usp2026-018","q-sirio2021-066","q-fmabc2021-049","q-udisc20262-099","q-usp2026-116","q-unesp2024-039","q-unicamp2023-053","q-usprp2025-060","q-unifesp2026-052"],
          casos: ["q-usprp2025-060"],
          prosa: `[[Hipertensão, mesmo controlada, é 3 para o combinado; progestagênio isolado e DIU servem.|q-tp20241-092,q-sirio2026-079,q-tp20251-095,q-udisc20262-099]] [[Diabetes com lesão de órgão alvo ou longa duração afasta o estrogênio.|q-usprp2025-060]] [[Na trombofilia (fator V de Leiden), o DIU hormonal é seguro e ainda trata endometriose.|q-unifesp2026-052]]`,
          texto: `- Tabagista: evitar o **combinado**, sobretudo após 35 anos. {q-024}
- 37 anos, 19 cigarros: **injetável trimestral**. {q-uspsp1-077}
- 38 anos, tabagista com fluxo volumoso: **medroxiprogesterona trimestral**. {q-famerp2022-038}
- Enxaqueca com aura: **categoria 4** para o combinado. {q-sessp2022-065}
- Enxaqueca com aura: **desogestrel**, pílula de progestágeno, DIU ou implante. {q-adap26-043,q-tp20231-095,q-einstein2026-057,q-didepm-048}
- Hipertensa em uso de combinado: **trocar por progestagênio**. {q-tp20241-092,q-sirio2026-079}
- 45 anos hipertensa, em amenorreia: **DIU**. {q-tp20251-095}
- TVP prévia, HAS, DM e fenitoína: **DIU de cobre**. {q-udisc20262-099}
- TVP prévia: **progestogênio oral isolado**. {q-famerp2023-050}
- História familiar não contraindica nem pede rastreio. {q-usp2026-018,q-sirio2021-066}
- Familiar com trombose (banca): **progestagênio isolado**. {q-unicampdis2024-104}
- Internação com trombose: **DIU de cobre**. {q-fmabc2021-049}
- LES com antifosfolípide: **DIU de cobre**. {q-unesp2024-039}
- LES/SAF anticoagulada: **DIU-LNG**. {q-usp2026-116,q-unicamp2023-053}
- DM1 com complicação: o método da **figura 3**. {q-usprp2025-060}
- Fator V de Leiden com endometriose, no puerpério: **DIU hormonal**. {q-unifesp2026-052}` },
        { id: "ele-outras", titulo: "Remédios, fígado, bariátrica e outras condições", conferir: false, diretrizes: ["oms-mec"],
          questoes: ["q-unifesp2022-025","q-unifesp2026-043","q-tp20212-081","q-tp20251-117","q-unicampdis2025-032","q-tp20222-084","q-amrigs2025-050","q-unicamp2022-061","q-scmsp2025-076","q-uspsp3-065","q-usprp2024-087","q-usprp2023-040","q-usprp2025-040"],
          prosa: `[[Anticonvulsivantes indutores do fígado (carbamazepina, fenitoína, topiramato) aceleram o metabolismo do estrogênio e do progestagênio: combinado e pílula de progestágeno ficam categoria 3; medroxiprogesterona e DIU não perdem efeito.|q-unifesp2022-025,q-tp20212-081,q-tp20251-117,q-unicampdis2025-032,q-tp20222-084]] [[A lamotrigina é o inverso: o estrogênio baixa o nível dela e as crises voltam.|q-unifesp2026-043]] [[Bariátrica disabsortiva tira a confiança na via oral; DIU e métodos não orais resolvem.|q-amrigs2025-050,q-unicamp2022-061]] [[Hepatite aguda é 3 ou 4 para começar o combinado e 2 para continuar; hiperplasia nodular focal não restringe nada.|q-scmsp2025-076,q-uspsp3-065]] [[Depressão não restringe métodos.|q-usprp2024-087]] [[O homem trans em testosterona pode engravidar: o estrogênio sai e fica o progestagênio ou o DIU.|q-usprp2023-040]]`,
          texto: `- Topiramato: **desogestrel** é categoria 3. {q-unifesp2022-025}
- Contraindica o combinado: **topiramato**. {q-tp20251-117}
- Aura e topiramato: **implante**. {q-tp20212-081}
- Carbamazepina: **medroxiprogesterona ou implante**. {q-unicampdis2025-032}
- Epiléptica tabagista amamentando: **progestagênio isolado ou DIU**, sem parar de amamentar. {q-tp20222-084}
- Lamotrigina: **medroxiprogesterona trimestral**. {q-unifesp2026-043}
- Bypass há 2 meses: **SIU-LNG**. {q-amrigs2025-050}
- Bariátrica disabsortiva: **injetável combinado** (não oral). {q-unicamp2022-061}
- Hepatite B na semana em que começou a pílula: banca, **suspender (categoria 3)**. {q-scmsp2025-076}
- Hiperplasia nodular focal: **sem restrição**. {q-uspsp3-065}
- Depressão: **todos** os reversíveis. {q-usprp2024-087}
- Homem trans hipertenso com combinado: **progestágeno isolado** e manter testosterona. {q-usprp2023-040}
- Não pode engravidar de jeito nenhum, amamentando: **pílula de progestágeno**. {q-usprp2025-040}` },
      ],
    },
    {
      id: "posparto", titulo: "Contracepção no pós-parto",
      introducao: `[[Nas primeiras semanas após o parto, a mulher está em estado de hipercoagulabilidade e o estrogênio aumenta a trombose; na que amamenta, ainda pode reduzir o leite: o combinado é categoria 4 antes de 21 dias; na lactação, categoria 4 antes de 6 semanas, 3 de 6 semanas a 6 meses e 2 depois (OMS 2025).|q-adap22-025,q-sirio2025-078-ia,q-sirio2027-072]] [[Progestagênio isolado (implante, pílula) pode começar logo após o parto, inclusive amamentando.|q-sessp2026-077,q-tp20231-084,q-tp20232-084,q-simepm89-029,q-einstein2022-059,q-fmabc2026-079,q-uspsp3-070]] [[O DIU entra até 48 horas após o parto (inclusive na cesárea) ou depois de 4 semanas; entre esses momentos, o risco de expulsão e perfuração é maior.|q-famema2021-052,q-tp20202-093,q-udisc20262-087]] [[A amenorreia da lactação protege enquanto houver três condições: amenorreia, amamentação exclusiva e menos de 6 meses.|q-adap21-072]]`,
      fragmentos: [
        { id: "pos-metodos", titulo: "Métodos por tempo de pós-parto", conferir: false, diretrizes: ["oms-mec"],
          questoes: ["q-adap22-025","q-adap21-072","q-famema2021-052","q-sessp2026-077","q-tp20202-093","q-tp20231-084","q-tp20232-084","q-tp20252-058","q-tp20261-032","q-udisc20262-087","q-uspsp3-070","q-simepm89-029","q-sirio2025-078-ia","q-sirio2027-072","q-fmabc2026-079","q-einstein2022-059"],
          texto: `- 15 dias, amamentando: **pílula combinada** é categoria 4. {q-adap22-025}
- 28 dias pós-parto: anel vaginal combinado **desaconselhado**. {q-sirio2025-078-ia}
- 15 dias, tabagista de 36 anos: **progesterona oral isolada**. {q-sirio2027-072}
- LAM: vale com **amenorreia, aleitamento exclusivo e < 6 meses**. {q-adap21-072}
- DIU de cobre **até 48 h** pós-parto. {q-famema2021-052}
- Primeiro dia de cesárea: **inserir DIU** agora. {q-tp20202-093}
- 3º dia, amamentando: **implante**. {q-sessp2026-077}
- Hemorragia por atonia, estável: **implante antes da alta**. {q-tp20252-058,q-tp20261-032}
- 21 dias, não volta logo: **implante**. {q-simepm89-029}
- 21 dias, útero septado: **implante**. {q-udisc20262-087}
- 1 semana amamentando: **implante**. {q-einstein2022-059}
- 35–56 dias amamentando: **implante e pílula de progestágeno**. {q-tp20231-084,q-uspsp3-070}
- 40 dias, adolescente: **DIU de cobre, pílula de progestágeno, implante**. {q-tp20232-084}
- 6 semanas: **implante** pode. {q-fmabc2026-079}` },
      ],
    },
    {
      id: "diu", titulo: "Dispositivo intrauterino",
      introducao: `[[O DIU de cobre libera íons que inflamam o endométrio e são tóxicos ao espermatozoide; o hormonal acrescenta muco espesso e endométrio fino.|q-sirio2022-061,q-iamspe2021-053]] [[O que impede o DIU é cavidade deformada (mioma submucoso, útero bicorno ou septado com distorção), gravidez possível, infecção ativa e câncer do colo ou do endométrio.|q-fmabc2022-067,q-fmabc2021-044,q-sessp2024-084]] [[A inserção pede toque bimanual (posição e tamanho do útero), pinça de Pozzi para tracionar o colo e histerômetro.|q-fmabc2021-046,q-amrigs2024-046,q-usp2022-082]]`,
      fragmentos: [
        { id: "diu-uso", titulo: "Inserção, contraindicações e gravidez com DIU", conferir: false, diretrizes: ["oms-mec"],
          questoes: ["q-usp2022-082","q-amrigs2024-046","q-usprp2021-064","q-unesp2026-033","q-famerp2023-051","q-famerp2026-019","q-fmabc2022-067","q-fmabc2021-046","q-fmabc2021-044","q-sessp2024-084"],
          casos: ["q-amrigs2024-046"],
          prosa: `[[Gravidez com DIU e fio visível: retirar, porque reduz aborto e infecção; sem fio visível, deixar a gestação seguir.|q-usprp2021-064,q-famerp2023-051,q-famerp2026-019]] [[Cólica com DIU bem posicionado melhora com anti-inflamatório.|q-unesp2026-033]]`,
          texto: `- Instrumento da inserção: **histerômetro/pinça** da figura. {q-usp2022-082}
- Apreensão do colo: **pinça de Pozzi**. {q-amrigs2024-046}
- Indispensável: **toque bimanual**. {q-fmabc2021-046}
- Contraindica o de cobre: **mioma submucoso**. {q-fmabc2022-067}
- Útero bicorno: **método de barreira**. {q-fmabc2021-044}
- Relação desprotegida há 10 dias: **não inserir** (gravidez possível). {q-sessp2024-084}
- Gestante com SIU e fio visível: **retirar**. {q-usprp2021-064}
- Sem fio visível: **deixar a gestação evoluir**. {q-famerp2023-051,q-famerp2026-019}
- Cólica com DIU bem posicionado: **manter e AINE**. {q-unesp2026-033}` },
      ],
    },
    {
      id: "emergencia", titulo: "Contracepção de emergência e métodos comportamentais",
      introducao: `[[A contracepção de emergência atrasa ou impede a ovulação (levonorgestrel até 72 horas, mais eficaz quanto antes; ulipristal até 120 horas); não interrompe gravidez implantada. O DIU de cobre até 5 dias é o mais eficaz e não perde efeito com o peso.|q-adap22-041,q-adap26-052,q-sessp2024-099,q-udisc20262-095,q-tp20222-094]] O levonorgestrel perde efeito com IMC acima de 30; nesses casos, DIU ou ulipristal. Depois do ulipristal, esperam-se **5 dias** para começar ou retomar o método hormonal (o progestagênio reduz seu efeito), com preservativo nesse intervalo.

[[Os métodos comportamentais tentam achar o período fértil: o estrogênio da fase folicular deixa o muco abundante, transparente e elástico até a ovulação; depois a progesterona o torna espesso.|q-iamspe2022-050,q-usp2026-115]] [[Pela tabela (Ogino-Knaus), o período fértil começa no dia do ciclo mais curto menos 18 e termina no dia do mais longo menos 11.|q-unifesp2022-041,q-usprp2022-058]]`,
      fragmentos: [
        { id: "eme-uso", titulo: "Emergência",
          questoes: ["q-adap22-041","q-adap26-052","q-scmsp2026-066","q-sessp2024-099","q-tp20222-094","q-udisc20262-095"],
          texto: `- 60 h, IMC 34: **DIU de cobre** ou ulipristal. {q-adap22-041}
- 4 dias, IMC 34: **DIU de cobre** até 5 dias. {q-adap26-052}
- Relação há 4 dias: **DIU de cobre**. {q-sessp2024-099}
- Indicada se usou só **espermicida**. {q-scmsp2026-066}
- Levonorgestrel **1,5 mg** (dois de 0,75) e depois método regular. {q-tp20222-094}
- Só progestagênio: **mais eficaz** e menos efeitos que Yuzpe. {q-udisc20262-095}` },
        { id: "eme-comportamental", titulo: "Muco, tabela e temperatura",
          questoes: ["q-unifesp2022-041","q-usp2026-115","q-usprp2022-058","q-iamspe2022-050"],
          texto: `- Ciclos de 29 a 32 dias: fértil do **11º ao 21º** dia. {q-unifesp2022-041}
- Ciclos de 24 a 33 dias: abstinência do **6º ao 22º**. {q-usprp2022-058}
- Billings: período fértil com muco **transparente, escorregadio**. {q-usp2026-115}
- Muco máximo na ovulação, depois **espesso** pela progesterona. {q-iamspe2022-050}` },
      ],
    },
    {
      id: "laqueadura", titulo: "Esterilização e a Lei 14.443/2022",
      introducao: `[[Desde a Lei 14.443/2022, a esterilização voluntária vale para quem tem mais de 21 anos ou pelo menos dois filhos vivos, com 60 dias entre a manifestação da vontade e a cirurgia, sem autorização do cônjuge; pode ser feita no parto se esse prazo foi cumprido.|q-adap24-086,q-unifesp2024-080,q-sessp2024-069,q-sirio2024-085,q-usp2024-089,q-famema2021-051-ia]]`,
      fragmentos: [
        { id: "laq-lei", titulo: "Quem pode e quando", conferir: true, diretrizes: ["lei-14443"],
          questoes: ["q-adap24-086","q-unifesp2024-080","q-usp2024-089","q-famema2021-051-ia","q-sessp2024-069","q-sirio2024-085"],
          texto: `- Na cesárea, 60 dias cumpridos, marido contra: **pode**. {q-adap24-086}
- 21 anos sem filhos: **pode**, sem autorização do cônjuge. {q-unifesp2024-080}
- Manifestação com 60 dias de antecedência: **pode no parto**. {q-sessp2024-069,q-sirio2024-085}
- Com 35 semanas: **não dá** no pós-parto imediato (menos de 60 dias). {q-usp2024-089,q-famema2021-051-ia}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-scmsp2025-076","q-unicampdis2024-104","q-einstein2023-063"],
          texto: `- Hepatite aguda: **3 ou 4 para iniciar**, **2 para continuar**; quem já tomava a pílula pode seguir. A banca mandou **suspender**. {q-scmsp2025-076}
- História familiar de trombose é **categoria 2** para o combinado (outra prova cobrou isso); a dissertativa só aceitou **progestagênio isolado**. {q-unicampdis2024-104}
- Entre os combinados, menor risco é com levonorgestrel; a banca deu **drospirenona**. {q-einstein2023-063}` },
      ],
    },
  ],
});
