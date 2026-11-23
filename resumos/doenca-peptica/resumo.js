/* resumos/doenca-peptica/resumo.js — resumo adaptativo de doença péptica (ass-doencapeptica): mucosa e secreção
   ácida, dispepsia e H. pylori (diagnóstico e erradicação), úlcera (classificações, biópsia, complicações),
   hemorragia digestiva alta (atendimento, Forrest, hemostasia, cirurgia), úlcera perfurada, armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- doenca-peptica */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "doenca-peptica",
  titulo: "Doença péptica e hemorragia digestiva alta",
  assunto: "ass-doencapeptica",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "consenso-hp", texto: "IV Consenso Brasileiro sobre a infecção por Helicobacter pylori (Coelho et al., Arq Gastroenterol 2018) e Maastricht VI/Florence (Gut 2022)", lidoEm: null },
    { id: "acg-ulcera", texto: "ACG — Clinical guideline: upper gastrointestinal and ulcer bleeding (Laine et al., Am J Gastroenterol 2021)", lidoEm: null },
    { id: "esge-hda", texto: "ESGE — Endoscopic diagnosis and management of nonvariceal upper gastrointestinal hemorrhage: guideline update 2021", lidoEm: null },
    { id: "roma", texto: "Critérios de Roma IV — dispepsia funcional", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-sessp2023-015"] },
  ],
  doencas: [
    {
      id: "acido-hp", titulo: "Mucosa gástrica, dispepsia e Helicobacter pylori",
      introducao: `[[A glândula do corpo gástrico tem células mucosas na superfície (muco e bicarbonato que protegem), células parietais (ácido clorídrico e fator intrínseco) e, no fundo, células principais (pepsinogênio, que o ácido ativa em pepsina). A úlcera é o desequilíbrio entre a agressão (ácido e pepsina) e a defesa (muco, bicarbonato, fluxo de sangue, prostaglandinas). As duas grandes causas são o *H. pylori*, que inflama a mucosa e, no antro, aumenta a gastrina e o ácido (úlcera duodenal), e os anti-inflamatórios, que cortam as prostaglandinas que defendem a mucosa.|q-tp20202-007,q-tp20212-018,q-adap25-018,q-tp20222-032,q-famema2021-015]] [[Gastrina alta nem sempre faz úlcera: na gastrite atrófica autoimune (anemia perniciosa) as células parietais morreram, o ácido some e o antro produz gastrina sem parar, sem úlcera; no Zollinger-Ellison o tumor faz gastrina e o ácido sobra.|q-fmabc2023-028]]

Veja também: **Cirrose** (varizes de esôfago, outra causa de hemorragia alta), **Abdome agudo e perfurações** nos resumos de cirurgia, **Pancreatite aguda** (diferencial da dor epigástrica súbita) e **Antibioticoterapia e resistência bacteriana** (claritromicina).`,
      fragmentos: [
        { id: "hp-histologia", titulo: "A glândula gástrica", conferir: true,
          casos: ["q-tp20202-007","q-tp20212-018"],
          questoes: ["q-tp20202-007","q-tp20212-018","q-fmabc2023-028"],
          prosa: `[[A célula principal, que faz proteína para exportar, tem citoplasma basal basofílico (retículo rugoso) e grânulos de pepsinogênio no ápice; a parietal é grande e eosinofílica, cheia de mitocôndrias para bombear ácido.|q-tp20202-007,q-tp20212-018]]`,
          texto: `- Estômago: **células mucosas, parietais e principais**. {q-tp20202-007}
- Célula principal: **citoplasma basal basofílico** e grânulos de **pepsinogênio** no ápice. {q-tp20212-018}
- Hipergastrinemia sem úlcera: **anemia perniciosa**. {q-fmabc2023-028}` },
        { id: "hp-dispepsia", titulo: "Dispepsia: testar e tratar ou endoscopia", conferir: true, diretrizes: ["consenso-hp","roma"],
          questoes: ["q-usprp2024-046","q-sirio2026-012","q-uspsp5-022","q-usp2024-052","q-usp2025-080","q-sirio2021-060"],
          prosa: `[[Dispepsia em adulto jovem sem sinal de alarme (perda de peso, sangramento, anemia, disfagia, vômitos, massa, idade acima de 40 a 45 anos) começa com teste não invasivo para *H. pylori* (respiratório com ureia ou antígeno fecal) e tratamento se positivo. A sorologia não serve para isso: o anticorpo fica positivo por anos depois da cura. Quem não melhora com inibidor de bomba de prótons, ou tem alarme, faz endoscopia.|q-usprp2024-046,q-sirio2026-012,q-uspsp5-022,q-usp2024-052]] [[Endoscopia normal, *H. pylori* negativo e falha de 12 semanas de inibidor de bomba é dispepsia funcional (hipersensibilidade visceral): antidepressivo tricíclico em dose baixa ajuda. Na criança, dor epigástrica intensa sem outra causa também pode ser úlcera duodenal.|q-usp2025-080,q-sirio2021-060]]`,
          texto: `- Jovem com dispepsia sem alarme: **teste não invasivo para *H. pylori***. {q-usprp2024-046}
- Teste respiratório positivo: **terapia tripla com claritromicina**. {q-sirio2026-012}
- Sorologia positiva com teste respiratório negativo após tratamento: **IBP e reavaliar**. {q-uspsp5-022}
- Melhora parcial após 4 semanas de omeprazol, anemia microcítica: **endoscopia**. {q-usp2024-052}
- Endoscopia normal e falha de IBP: **amitriptilina**. {q-usp2025-080}
- Criança com dor epigástrica intensa: **úlcera duodenal**. {q-sirio2021-060}` },
        { id: "hp-tratamento", titulo: "Erradicação do H. pylori", conferir: true, diretrizes: ["consenso-hp"],
          questoes: ["q-adap25-018","q-iamspe2025-017","q-unesp2021-049","q-tp20222-032"],
          prosa: `[[O esquema de primeira linha no Brasil é inibidor de bomba de prótons, amoxicilina 1 g e claritromicina 500 mg, todos de 12 em 12 horas, por 14 dias (mais dias, mais cura). O inibidor de bomba sobe o pH e deixa a amoxicilina agir. Na alergia grave à penicilina, usa-se a quádrupla com bismuto (inibidor de bomba, bismuto, tetraciclina e metronidazol). Na úlcera, a erradicação vem com o inibidor de bomba mantido até a cicatrização, e a cura se confirma com teste depois.|q-adap25-018,q-iamspe2025-017,q-unesp2021-049,q-tp20222-032]]`,
          texto: `- Anafilaxia à amoxicilina: **IBP, bismuto, tetraciclina e metronidazol por 14 dias**. {q-adap25-018}
- Gastrite com *H. pylori*: **amoxicilina, claritromicina e omeprazol por 14 dias**. {q-iamspe2025-017,q-unesp2021-049}
- Úlcera gástrica com urease positiva: **erradicar por 14 dias e IBP depois**. {q-tp20222-032}` },
      ],
    },
    {
      id: "ulcera", titulo: "Úlcera péptica: classificação e acompanhamento",
      introducao: `[[A úlcera duodenal é sempre benigna e vem do excesso de ácido; a gástrica pode ser câncer ulcerado, e por isso a gástrica é biopsiada e reavaliada até cicatrizar, mesmo sem sintomas.|q-unifesp2025-018,q-unicamp2023-011]]`,
      fragmentos: [
        { id: "ulc-classificacao", titulo: "Johnson, Sakita e complicações crônicas", conferir: true,
          questoes: ["q-amrigs2022-023","q-amrigs2023-024","q-famema2022-064","q-fmabc2026-004","q-unifesp2025-018","q-unicamp2023-011","q-amrigs2024-025","q-amrigs2022-024"],
          prosa: `[[A classificação de Johnson une lugar e ácido: tipo I na pequena curvatura (incisura), com ácido normal ou baixo; II, gástrica com duodenal; III, pré-pilórica (as duas com hipercloridria, como a duodenal); IV, alta, perto da cárdia, com ácido baixo; V, em qualquer lugar, causada por anti-inflamatório ou AAS.|q-amrigs2022-023,q-amrigs2023-024,q-famema2022-064]] [[Sakita dá a fase: A (ativa, fundo com fibrina e bordas edemaciadas), H (cicatrizando) e S (cicatriz).|q-fmabc2026-004]] [[A úlcera gástrica com biópsia benigna é repetida na endoscopia depois do tratamento, com novas biópsias, até cicatrizar.|q-unifesp2025-018,q-unicamp2023-011]] [[No adulto, a estenose pilórica vem da úlcera duodenal ou pré-pilórica que cicatriza com fibrose. Depois de gastrectomia parcial com Billroth II, a bile reflui para o estômago (gastrite alcalina), mas nem todos têm sintomas; quem não melhora vai para a reconstrução em Y de Roux.|q-amrigs2024-025,q-amrigs2022-024]]`,
          texto: `- Johnson tipo V: por **AINE ou AAS, em qualquer lugar** do estômago (a prova o pôs perto da cárdia, que é o IV). {q-amrigs2022-023}
- Tipo III: **pré-pilórica, hipercloridria**. {q-amrigs2023-024}
- Úlceras na cárdia e parede anterior com AAS e clopidogrel: **tipo V**. {q-famema2022-064}
- Fundo com fibrina e vaso visível: **Sakita A1, Forrest IIa**. {q-fmabc2026-004}
- Úlcera gástrica com biópsia benigna: **nova endoscopia com biópsia**. {q-unifesp2025-018,q-unicamp2023-011}
- Estenose pilórica no adulto: **úlcera duodenal**. {q-amrigs2024-025}
- Falso: refluxo alcalino **sempre sintomático**. {q-amrigs2022-024}` },
      ],
    },
    {
      id: "hda", titulo: "Hemorragia digestiva alta por úlcera",
      introducao: `[[A úlcera é a causa mais comum de hemorragia digestiva alta (acima do ângulo de Treitz), cerca de metade a 60% dos casos. Ela sangra quando corrói a parede de uma artéria; a da parede posterior do bulbo duodenal fica sobre a artéria gastroduodenal, grossa, e é a que mais ressangra. Melena é sangue digerido (alta, em geral), hematêmese é vômito com sangue.|q-iamspe2025-036,q-amrigs2024-037,q-iamspe2026-031]]`,
      fragmentos: [
        { id: "hda-inicial", titulo: "Atendimento inicial e estratificação", conferir: true, diretrizes: ["acg-ulcera"],
          questoes: ["q-tp20222-067","q-tp20241-064","q-iamspe2026-031","q-iamspe2026-025","q-iamspe2025-036","q-fmabc2023-026","q-famerp2026-065"],
          prosa: `[[Primeiro a vida: via aérea (proteger se há hematêmese volumosa e rebaixamento), dois acessos calibrosos e volume com cuidado; transfusão restritiva (hemoglobina abaixo de 7, ou 8 no cardiopata). Depois, toque retal, jejum, inibidor de bomba venoso em dose de ataque e endoscopia em até 24 horas. Antibiótico profilático e octreotida são do sangramento varicoso do cirrótico, não da úlcera.|q-tp20222-067,q-tp20241-064,q-iamspe2026-031,q-iamspe2026-025]] [[O índice de choque (frequência ÷ sistólica, alterado acima de 0,9 a 1) e o escore de Glasgow-Blatchford (ureia, hemoglobina, pressão, pulso, melena, síncope, doença hepática e cardíaca) estimam quem precisa de intervenção: escore 0 a 1 pode ir para casa, valores altos internam. Insuficiência renal, transfusão e ressangramento na internação pioram o prognóstico.|q-famerp2026-065,q-fmabc2023-026,q-iamspe2025-036]]`,
          texto: `- Hematêmese com choque: **via aérea e volume**. {q-tp20222-067}
- Enterorragia com AAS e hipotensão: **reposição volêmica cautelosa**. {q-tp20241-064}
- Melena estável: **toque retal, jejum, IBP em ataque e endoscopia**. {q-iamspe2026-031}
- Antibiótico reduz ressangramento **nas varizes** (a prova). {q-iamspe2026-025}
- Úlcera: **cerca de 60%** das hemorragias digestivas. {q-iamspe2025-036}
- Risco: **insuficiência renal, transfusão e hematêmese na internação**. {q-fmabc2023-026}
- Índice de choque 1,6 e **Blatchford ≥ 7**: intervenção. {q-famerp2026-065}` },
        { id: "hda-forrest", titulo: "Forrest, hemostasia endoscópica e cirurgia", conferir: true, diretrizes: ["esge-hda","acg-ulcera"],
          figuras: [{ arquivo: "figuras/forrest.svg", legenda: "Esquema autoral: classificação de Forrest, risco de ressangramento e conduta endoscópica." }],
          casos: ["q-uspsp5-061"],
          questoes: ["q-scmsp2022-015","q-amrigs2023-029","q-amrigs2024-037","q-sessp2023-014","q-famema2021-015","q-fmabc2023-027","q-uspsp5-061","q-sessp2026-024","q-famerp2023-056","q-didepm-061","q-sessp2026-025","q-sessp2022-040"],
          prosa: `[[O que a endoscopia vê prevê o ressangramento: Ia, sangramento em jato; Ib, em babação; IIa, vaso visível; IIb, coágulo aderido; IIc, base com hematina; III, fundo limpo. Ia, Ib e IIa são de alto risco e recebem hemostasia; IIb pede lavar e retirar o coágulo para tratar o que estiver embaixo; IIc e III não precisam e podem ter alta precoce.|q-scmsp2022-015,q-amrigs2023-029,q-sessp2023-014,q-amrigs2024-037,q-uspsp5-061,q-sessp2026-024]] [[A hemostasia é combinada: adrenalina diluída (1:10.000) sozinha não basta, junta-se clipe ou método térmico (eletrocoagulação bipolar, heater probe). Depois, inibidor de bomba em dose alta venosa por 72 horas, observação próxima e suspensão do anti-inflamatório.|q-famema2021-015,q-fmabc2023-027,q-famerp2023-056,q-didepm-061]] [[Se ressangra, tenta-se nova endoscopia; se falha ou o sangramento continua exigindo muitas transfusões (mais de 3 unidades por dia), embolização ou cirurgia. Jovem com hematêmese maciça, mucosa normal e um vaso pulsátil sem úlcera tem lesão de Dieulafoy (artéria da submucosa anormalmente calibrosa).|q-sessp2026-025,q-sessp2022-040]]`,
          texto: `- Sangramento em jato: **maior chance de ressangrar**. {q-scmsp2022-015}
- IIb: **coágulo aderente, risco intermediário**. {q-amrigs2023-029}
- Alto risco: **parede posterior do bulbo**. {q-amrigs2024-037}
- Ia: **sangramento em jato**. {q-sessp2023-014}
- Melena com diclofenaco e vaso visível (a prova): **IIa, adrenalina 1:10.000**. {q-famema2021-015}
- IIa: **vaso visível; eletrocoagulação bipolar; alto risco**. {q-fmabc2023-027}
- Coágulo aderido: **IIb, irrigar para remover e tratar**. {q-uspsp5-061}
- IIa com adrenalina e clipe: **conduta adequada**. {q-sessp2026-024}
- Após hemostasia: **UTI, hemoglobina seriada e IBP venoso**. {q-famerp2023-056}
- Úlcera de alto risco com AINE: **hemostasia e IBP em dose alta venosa**. {q-didepm-061}
- 8 concentrados e sangramento contínuo: **cirurgia**. {q-sessp2026-025}
- Hematêmese maciça com mucosa normal: **malformação vascular da submucosa (Dieulafoy)**. {q-sessp2022-040}` },
      ],
    },
    {
      id: "perfuracao", titulo: "Úlcera perfurada",
      introducao: `[[A úlcera da parede anterior do duodeno ou do estômago, sem nada atrás, perfura para a cavidade: o ácido derrama no peritônio e causa dor súbita, lancinante, em epigástrio, que se espalha (peritonite química que vira bacteriana depois de horas). O ar livre sobe sob o diafragma e apaga a macicez hepática (sinal de Jobert). O suco pode escorrer pela goteira parietocólica e doer na fossa ilíaca direita, imitando apendicite (síndrome de Valentino).|q-tp20251-061,q-fmabc2022-033,q-usprp2027-073]]`,
      fragmentos: [
        { id: "perf-diagnostico", titulo: "Diagnóstico", conferir: true,
          casos: ["q-unicampdis2024-082","q-famema2025-025","q-usp2023-003"],
          questoes: ["q-tp20232-077","q-tp20261-053","q-tp20251-061","q-unicampdis2024-082","q-famema2025-025","q-usp2023-003","q-usp2026-040","q-scmsp2025-025","q-usprp2027-073"],
          prosa: `[[Dor epigástrica súbita em quem teve úlcera ou usa anti-inflamatório: o primeiro exame é a radiografia de tórax e de abdome em pé, que mostra o pneumoperitônio. Quando a radiografia é duvidosa e o paciente está estável, a tomografia com contraste confirma o ar livre e o local. Amilase pouco elevada não muda o diagnóstico.|q-tp20232-077,q-tp20261-053,q-tp20251-061,q-unicampdis2024-082,q-famema2025-025,q-usp2023-003,q-usp2026-040,q-scmsp2025-025]] [[Dor que começou no epigástrio e migrou para a fossa ilíaca direita, com ar livre, é úlcera duodenal perfurada.|q-usprp2027-073]]`,
          texto: `- Dor súbita com úlcera prévia: **radiografia de tórax e abdome em pé**. {q-tp20232-077,q-tp20261-053}
- Hipertimpanismo hepático: **sinal de Jobert**. {q-tp20251-061}
- Radiografia com ar livre após AINE: **abdome agudo perfurativo**. {q-unicampdis2024-082}
- Dor súbita em andar superior: **perfuração de úlcera**. {q-famema2025-025}
- Imunossuprimida com cetoprofeno: **tomografia com pneumoperitônio**. {q-usp2023-003}
- Achado operatório esperado: **perfuração** da úlcera. {q-usp2026-040}
- Pouco ar e paciente estável: **tomografia com contraste**. {q-scmsp2025-025}
- Dor que migrou para a fossa ilíaca direita: **úlcera duodenal perfurada**. {q-usprp2027-073}` },
        { id: "perf-tratamento", titulo: "Tratamento", conferir: true,
          casos: ["q-famerp2025-068","q-tp20241-076","q-scmsp2026-034"],
          questoes: ["q-fmabc2022-033","q-famerp2025-068","q-tp20241-076","q-einstein2026-017","q-scmsp2026-034","q-famema2023-078","q-famema2023-079","q-einstein2024-029"],
          prosa: `[[Perfuração com peritonite ou instabilidade: ressuscitação e cirurgia (laparotomia ou laparoscopia). No paciente estável, sem peritonite difusa, a videolaparoscopia trata e confirma ao mesmo tempo. A correção habitual é a rafia da úlcera coberta por um retalho de omento (Cellan-Jones), com lavagem, antibiótico contra a flora intestinal (*E. coli* e *Bacteroides*) e erradicação do *H. pylori* depois.|q-fmabc2022-033,q-famerp2025-068,q-tp20241-076,q-einstein2026-017,q-scmsp2026-034,q-famema2023-078,q-famema2023-079]] [[Úlcera grande (4 cm), com fibrose e estenose do piloro, não fecha com rafia: resseca-se (gastrectomia subtotal).|q-einstein2024-029]]`,
          texto: `- Pneumoperitônio com choque e peritonite: **estabilizar e laparotomia**. {q-fmabc2022-033,q-famerp2025-068,q-tp20241-076}
- Piora após a imagem, com hipotensão: **laparotomia**. {q-einstein2026-017}
- Estável sem peritonite difusa: **videolaparoscopia**. {q-scmsp2026-034}
- Omento sobre a sutura: **Cellan-Jones**. {q-famema2023-078}
- Flora da perfuração: ***E. coli* e *Bacteroides***. {q-famema2023-079}
- Úlcera pré-pilórica de 4 cm com estenose: **gastrectomia subtotal**. {q-einstein2024-029}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["esge-hda"],
          questoes: ["q-amrigs2022-023","q-famema2021-015","q-iamspe2026-025","q-famerp2026-065"],
          prosa: `[[**Johnson tipo V**: é a úlcera por anti-inflamatório ou AAS em qualquer lugar do estômago; a amrigs2022-023 deu "somente próximo à cárdia" (que é o tipo IV).|q-amrigs2022-023]] [[**Adrenalina isolada**: a regra é terapia combinada (adrenalina com clipe ou térmico); a famema2021-015 deu injetoterapia com adrenalina como tratamento do Forrest IIa.|q-famema2021-015]] [[**Antibiótico na hemorragia alta**: reduz ressangramento e infecção no cirrótico com varizes; a iamspe2026-025, num caso de melena sem cirrose, cobrou essa afirmação como a correta.|q-iamspe2026-025]] [[**Glasgow-Blatchford**: o ponto que separa alta de internação é 0 a 1; os cortes de "necessidade de intervenção" variam entre os estudos (7 ou mais na famerp2026-065).|q-famerp2026-065]]`,
          texto: `- Johnson V: **qualquer lugar**, por AINE; a prova pôs perto da cárdia. {q-amrigs2022-023}
- Regra: hemostasia **combinada**; a prova deu adrenalina isolada. {q-famema2021-015}
- Antibiótico é das **varizes**; a prova o cobrou na melena. {q-iamspe2026-025}
- Blatchford 0–1 alta; a prova usou **≥ 7**. {q-famerp2026-065}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: as complicações da úlcera",
      introducao: `Resumo dos capítulos de complicações.`,
      fragmentos: [
        { id: "cmp-complicacoes", titulo: "Sangramento, perfuração e obstrução", conferir: true,
          questoes: ["q-amrigs2024-037","q-fmabc2022-033","q-amrigs2024-025","q-didepm-061"],
          prosa: `[[Cada complicação tem sua parede e sua conduta.|q-amrigs2024-037,q-fmabc2022-033,q-amrigs2024-025,q-didepm-061]]

| | Sangramento | Perfuração | Obstrução |
|---|---|---|---|
| Onde | parede posterior do bulbo (gastroduodenal) | parede anterior | pré-pilórica ou duodenal |
| Quadro | melena, hematêmese, choque | dor súbita, peritonite, Jobert | vômitos pós-prandiais, estômago dilatado |
| Exame | endoscopia em 24 h | radiografia em pé; tomografia | endoscopia |
| Tratamento | hemostasia combinada + IBP venoso; cirurgia se falha | rafia com omento; ressecção se grande e fibrosada | dilatação ou cirurgia |`,
          texto: `- Sangra: **parede posterior do bulbo**. {q-amrigs2024-037}
- Perfura: **laparotomia**. {q-fmabc2022-033}
- Obstrui: **estenose pilórica**. {q-amrigs2024-025}
- Úlcera sangrante: **hemostasia e IBP**. {q-didepm-061}` },
      ],
    },
  ],
});
