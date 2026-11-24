/* resumos/pleura/resumo.js — resumo adaptativo de pneumotórax e doenças pleurais (ass-cirtorax-pleura):
   semiologia e líquido pleural (Light, transudato × exsudato, tuberculose, neoplasia), derrame parapneumônico e
   empiema, derrame neoplásico e pleurodese, quilotórax, pneumotórax (primário, secundário, hipertensivo,
   recidiva e fístula), drenagem torácica e selo d'água, hemotórax maciço, armadilhas e tabela do líquido.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- pleura */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "pleura",
  titulo: "Pneumotórax e doenças pleurais",
  assunto: "ass-cirtorax-pleura",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "bts-pleural", texto: "BTS — Guideline for pleural disease (Roberts et al., Thorax 2023)", lidoEm: null },
    { id: "aats-empiema", texto: "AATS — Consensus guidelines for the management of empyema (Shen et al., 2017)", lidoEm: null },
    { id: "atls", texto: "American College of Surgeons — ATLS, 10ª/11ª ed. (hemotórax maciço e pneumotórax hipertensivo)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Desatualizada, sem reposição", questoes: ["q-unesp2025-075"] },
  ],
  doencas: [
    {
      id: "derrame", titulo: "Derrame pleural",
      introducao: `[[O espaço pleural recebe líquido filtrado dos capilares da pleura parietal e o devolve pelos linfáticos. O derrame aparece por dois caminhos. Transudato: a pleura está sã e o equilíbrio de forças muda (pressão hidrostática alta na insuficiência cardíaca, pressão oncótica baixa na cirrose e na síndrome nefrótica). Exsudato: a própria pleura inflama ou é invadida, ou a drenagem linfática se obstrui (pneumonia, tuberculose, neoplasia, linfoma).|q-sessp2026-038,q-usprp2023-073,q-scmsp2023-030,q-famerp2022-072]] [[No exame, o derrame dá macicez, murmúrio e frêmito abolidos e, no limite superior, onde o pulmão está comprimido, egofonia. A dispneia pode depender do lado em que a pessoa deita (trepopneia): com derrame à esquerda, piora em decúbito lateral direito.|q-udisc20262-005,q-sessp2024-016]]

Veja também: **Pneumonia adquirida na comunidade** (derrame parapneumônico), **Tuberculose** (forma pleural), **Insuficiência cardíaca**, **Trauma de tórax** (versão completa do hemotórax e do pneumotórax traumático) e **Câncer de mama**.`,
      fragmentos: [
        { id: "der-light", titulo: "Transudato × exsudato e a etiologia", conferir: true, diretrizes: ["bts-pleural"],
          figuras: [{ arquivo: "figuras/liquido-pleural.svg", legenda: "Esquema autoral: critérios de Light e o que cada tipo de derrame sugere." }],
          casos: ["q-usprp2023-073"],
          questoes: ["q-udisc20262-005","q-sessp2024-016","q-scmsp2023-030","q-famerp2022-072","q-fmabc2021-017","q-sessp2026-038","q-simepm89-002","q-unesp2025-042","q-famema2023-026","q-unesp2024-076","q-famerp2026-053","q-usprp2023-073","q-sirio2024-002"],
          prosa: `[[Pelos critérios de Light, é exsudato se proteína do líquido/soro acima de 0,5, ou DHL do líquido/soro acima de 0,6, ou DHL do líquido acima de 2/3 do limite superior do soro; dosam-se proteínas totais e DHL. No paciente com insuficiência cardíaca típica, bilateral, trata-se a doença e não se puncionam; quando se punciona alguém em uso de diurético, o líquido pode parecer exsudato (o diurético concentra a proteína), e o gradiente de albumina (acima de 1,2 g/dL) confirma o transudato.|q-scmsp2023-030,q-famerp2022-072,q-fmabc2021-017,q-sessp2026-038,q-simepm89-002,q-unesp2025-042]] [[Exsudato linfocítico com ADA acima de 40 sugere tuberculose; com ADA baixa e citologia negativa em tabagista, a biópsia pleural (ou a videotoracoscopia) busca neoplasia. Derrame volumoso que desvia o mediastino para o lado oposto, em idoso, sugere neoplasia. Derrame em quem não melhora da pneumonia pede toracocentese.|q-famema2023-026,q-unesp2024-076,q-famerp2026-053,q-sirio2024-002]] [[Linfoma que comprime os linfáticos do mediastino causa derrame por obstrução da drenagem linfática.|q-usprp2023-073]]`,
          texto: `- Limite superior do derrame: **egofonia**. {q-udisc20262-005}
- Dispneia ao deitar sobre o lado direito: **trepopneia, derrame à esquerda**. {q-sessp2024-016}
- Proteína > 0,5 e DHL > 0,6: **exsudato** (neoplasia, infecção). {q-scmsp2023-030,q-famerp2022-072}
- Diferenciar: **proteínas totais e DHL**. {q-fmabc2021-017}
- Derrame na IC descompensada: **transudato**. {q-sessp2026-038}
- IC com derrame: **otimizar o tratamento clínico**. {q-simepm89-002}
- Cuidado na interpretação: **uso de diurético**. {q-unesp2025-042}
- Proteína alta e ADA 43: **tuberculose**. {q-famema2023-026}
- Exsudato linfocítico, ADA baixa, citologia negativa: **biópsia de pleura**. {q-unesp2024-076}
- Derrame volumoso que desvia o mediastino: **neoplasia**. {q-famerp2026-053}
- Linfoma com derrame novo: **obstrução da drenagem linfática**. {q-usprp2023-073}
- Pneumonia que não melhora com derrame: **toracocentese**. {q-sirio2024-002}` },
        { id: "der-parapneumonico", titulo: "Derrame parapneumônico e empiema", conferir: true, diretrizes: ["bts-pleural","aats-empiema"],
          casos: ["q-unesp2023-064","q-tp20252-119"],
          questoes: ["q-adap25-012","q-unifesp2023-077","q-unesp2023-064","q-tp20231-073","q-tp20252-119","q-unesp2021-070","q-unicampdis2024-021","q-didepm-007","q-unifesp2025-012","q-famema2025-020"],
          prosa: `[[A infecção passa do pulmão à pleura em três fases: exsudativa (líquido livre, estéril), fibrinopurulenta (bactéria, fibrina, lojas) e organizada (casca que encarcera o pulmão). O líquido mostra a fase: pH abaixo de 7,2, glicose abaixo de 60 mg/dL, DHL muito alto, Gram ou cultura positivos ou pus franco indicam derrame complicado ou empiema, que precisa sair (drenagem torácica); o antibiótico sozinho não esteriliza uma coleção.|q-adap25-012,q-unifesp2023-077,q-unesp2023-064,q-tp20231-073,q-tp20252-119,q-unesp2021-070,q-unicampdis2024-021]] [[Coleção loculada que não esvazia pelo dreno pede videotoracoscopia (desfazer as lojas, decorticação); empiema crônico em paciente debilitado, refratário, vai para drenagem aberta (pleurostomia, retirando segmentos curtos de costela).|q-didepm-007,q-unifesp2025-012,q-famema2025-020]]`,
          texto: `- pH 6,9 e glicose baixa: **drenagem torácica fechada**. {q-adap25-012,q-tp20252-119}
- Criança com derrame: drena se **Gram positivo**. {q-unifesp2023-077}
- pH 7,21, glicose 30, DHL 1.895: **drenagem**. {q-unesp2023-064,q-unesp2021-070}
- Indica drenagem: **pH 7,18, glicose 40, DHL 1.200, neutrófilos**. {q-tp20231-073}
- Glicose normal e líquido livre: **fase exsudativa**. {q-unicampdis2024-021}
- Coleção loculada com dreno pouco produtivo: **desbridamento por videotoracoscopia**. {q-didepm-007}
- Coleção persistente após decorticação: **pleurostomia**. {q-unifesp2025-012}
- Empiema crônico refratário: **drenagem aberta com ressecção de costela**. {q-famema2025-020}` },
        { id: "der-neoplasico", titulo: "Derrame neoplásico e quilotórax", conferir: true, diretrizes: ["bts-pleural"],
          casos: ["q-usp2022-074"],
          questoes: ["q-adap26-005","q-unifesp2022-014","q-usp2022-074","q-tp20251-066","q-udisc20262-076","q-udisc20262-077","q-adap23-077","q-unicampdis2023-021","q-fmabc2023-038"],
          prosa: `[[O primeiro passo no derrame suspeito de câncer é a toracocentese com bioquímica e citologia; citologia negativa com suspeita forte vai para videotoracoscopia, que vê a pleura e biopsia. O derrame neoplásico que volta depois da punção e com pulmão que expande trata-se com pleurodese com talco (cola as pleuras) ou cateter pleural tunelizado de demora; punções repetidas não controlam. O talco por videotoracoscopia é o mais eficaz.|q-udisc20262-076,q-tp20251-066,q-adap26-005,q-unifesp2022-014,q-usp2022-074,q-udisc20262-077]] [[Líquido leitoso com triglicerídeos acima de 110 mg/dL é quilotórax, por lesão do ducto torácico (esofagectomia, cirurgia do mediastino, linfoma): drena-se, suspende-se a gordura comum (dieta com triglicerídeos de cadeia média ou jejum com nutrição parenteral) e, se o débito continua alto, liga-se o ducto. Óleo de oliva pela sonda, antes da cirurgia, deixa o ducto visível ao ficar branco.|q-adap23-077,q-unicampdis2023-021,q-fmabc2023-038]]`,
          texto: `- Neoplásico recidivante: **cateter tunelizado ou pleurodese com talco**. {q-adap26-005}
- Implante de mama: **drenagem e pleurodese**. {q-unifesp2022-014,q-usp2022-074}
- Massa espiculada com derrame: **videotoracoscopia**. {q-tp20251-066}
- Suspeita de neoplasia: **toracocentese com citologia primeiro**. {q-udisc20262-076}
- Pleurodese mais eficaz: **talco por videotoracoscopia**. {q-udisc20262-077}
- Líquido leitoso após esofagectomia: **manter dreno e trocar a dieta (TCM)**. {q-adap23-077}
- Derrame após tumor de mediastino posterior: **quilotórax**. {q-unicampdis2023-021}
- Óleo de oliva pela sonda: **identifica o ducto torácico**. {q-fmabc2023-038}` },
      ],
    },
    {
      id: "pneumotorax", titulo: "Pneumotórax",
      introducao: `[[O pneumotórax espontâneo primário vem da ruptura de pequenas bolhas subpleurais (blebs) no ápice do pulmão de homem jovem, alto, magro e fumante; o secundário acontece em pulmão doente (DPOC, fibrose cística) e é mais grave, porque não há reserva. Dor torácica súbita, pleurítica, com murmúrio diminuído e timpanismo: radiografia confirma, e a ultrassonografia também (ausência de deslizamento pleural, sinal do código de barras no modo M).|q-fmabc2024-030,q-udisc20262-078,q-simepm89-001,q-iamspe2026-023,q-unifesp2023-013]]`,
      fragmentos: [
        { id: "ptx-conduta", titulo: "Observar, aspirar ou drenar", conferir: true, diretrizes: ["bts-pleural"],
          questoes: ["q-adap22-014","q-sirio2027-030","q-simepm89-001","q-fmabc2024-030","q-udisc20262-078","q-iamspe2026-023","q-adap23-098","q-unifesp2023-013","q-usprp2025-005"],
          prosa: `[[O primário pequeno com poucos sintomas pode ser observado com oxigênio (acelera a reabsorção do ar) e radiografia de controle; se cresce ou dá dispneia, drena-se com dreno fino ou aspira-se. O secundário, mesmo pequeno, recebe drenagem.|q-adap22-014,q-sirio2027-030,q-simepm89-001]] [[No pneumotórax hipertensivo o ar entra e não sai: o mediastino é empurrado, o retorno venoso cai e vem o choque (hipotensão, turgência jugular, desvio da traqueia, pressão alta no ventilador). O diagnóstico é clínico, e a descompressão (agulha ou toracostomia digital no 4º/5º espaço, linha axilar média) vem antes de qualquer exame, seguida de dreno.|q-adap23-098,q-unifesp2023-013,q-usprp2025-005]]`,
          texto: `- Jovem com pneumotórax pequeno e estável: **observação com oxigênio e radiografia**. {q-adap22-014}
- Aumentou e piorou a dispneia: **dreno fino**. {q-sirio2027-030}
- DPOC com pneumotórax: **secundário; drenagem**. {q-simepm89-001}
- Causa no jovem: **ruptura de blebs subpleurais**. {q-fmabc2024-030}
- Jovem sem doença com dor súbita: **pneumotórax espontâneo primário**. {q-udisc20262-078}
- Ultrassonografia: **alto valor preditivo negativo**. {q-iamspe2026-023}
- Ventilado com hipotensão e desvio da traqueia: **descompressão imediata**. {q-adap23-098}
- Choque e murmúrio abolido no ultrassom: **sinal do código de barras**. {q-unifesp2023-013}
- Criança pós-operatória com queda de saturação: **drenagem torácica** do lado do pneumotórax. {q-usprp2025-005}` },
        { id: "ptx-recidiva", titulo: "Recidiva, fístula aérea e cirurgia", conferir: true, diretrizes: ["bts-pleural"],
          casos: ["q-usprp2027-063"],
          questoes: ["q-adap23-095","q-unifesp2026-005","q-usprp2027-063","q-unifesp2023-095","q-usprp2026-004"],
          prosa: `[[O pneumotórax volta em cerca de um terço dos primários: a cirurgia (videotoracoscopia com ressecção das bolhas e pleurodese) entra no segundo episódio do mesmo lado, no primeiro episódio bilateral ou contralateral, em profissões de risco (piloto, mergulhador) e na fuga aérea persistente. Fuga aérea é borbulhamento no frasco; passando de 3 a 5 dias, opera-se.|q-adap23-095,q-unifesp2026-005,q-usprp2027-063,q-unifesp2023-095,q-usprp2026-004]]`,
          texto: `- Segundo episódio com bolhas: **videotoracoscopia, ressecção e pleurodese**. {q-adap23-095,q-usprp2027-063}
- Primeiro episódio do outro lado: **bulectomia e pleurodese bilateral**. {q-unifesp2026-005}
- Fuga aérea no 8º dia: **borbulhamento; cirurgia**. {q-unifesp2023-095}
- DPOC com fuga após 72 h: **videotoracoscopia com ressecção e pleurodese**. {q-usprp2026-004}` },
      ],
    },
    {
      id: "dreno", titulo: "Drenagem torácica",
      introducao: `[[O selo d'água funciona como válvula: a ponta do tubo no frasco fica 2 cm abaixo da água, o ar e o líquido saem a cada expiração e a água impede que voltem. A coluna oscila com a respiração (dreno pérvio) e borbulha enquanto houver ar saindo do pulmão.|q-unicamp2023-020,q-unicampdis2024-081,q-scmsp2021-029]]`,
      fragmentos: [
        { id: "dre-tecnica", titulo: "Técnica, retirada e hemotórax maciço", conferir: true, diretrizes: ["atls"],
          casos: ["q-unicamp2023-020","q-unicampdis2024-081"],
          questoes: ["q-unicamp2023-020","q-unicampdis2024-081","q-scmsp2021-029","q-scmsp2023-026","q-sirio2022-040","q-unifesp2023-098","q-adap23-013"],
          prosa: `[[O dreno entra no triângulo de segurança (4º ou 5º espaço intercostal, entre as linhas axilares anterior e média), por cima da costela de baixo, com exploração digital antes do tubo; o último orifício fica dentro da cavidade, entre as pleuras. Se o dreno é ligado à haste errada do frasco (o respiro), o sistema fica aberto e o pulmão colaba. Retira-se com o pulmão expandido e sem borbulhar à tosse, com manobra de Valsalva no fim da inspiração ou da expiração para o ar não entrar.|q-unicamp2023-020,q-unicampdis2024-081,q-scmsp2021-029,q-scmsp2023-026,q-sirio2022-040]] [[Depois de pneumonectomia, o espaço vazio enche de líquido aos poucos (nível hidroaéreo subindo), e isso é o esperado: segue-se. No trauma, drenagem inicial acima de 1.500 mL ou mais de 200 mL por hora por 2 a 4 horas é hemotórax maciço: toracotomia.|q-unifesp2023-098,q-adap23-013]]`,
          texto: `- Último orifício: **entre as pleuras visceral e parietal**. {q-unicamp2023-020}
- Frasco ligado errado: **sistema aberto**. {q-unicampdis2024-081}
- Retirar com **pulmão expandido e sem borbulhar à tosse**. {q-scmsp2021-029,q-scmsp2023-026}
- Retirada: **fim da expiração ou da inspiração com Valsalva**. {q-sirio2022-040}
- Nível hidroaéreo após pneumonectomia: **seguimento clínico**. {q-unifesp2023-098}
- Facada com mais de 1.500 mL pelo dreno: **toracotomia de urgência**. {q-adap23-013}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["bts-pleural"],
          questoes: ["q-unifesp2026-005","q-adap22-014","q-unifesp2023-077","q-scmsp2021-029"],
          prosa: `[[**Pneumotórax contralateral**: a BTS indica cirurgia no primeiro episódio contralateral; a pleurodese bilateral da unifesp2026-005 vai além (o lado já drenado não recidivou).|q-unifesp2026-005]] [[**Pneumotórax primário pequeno**: a BTS 2023 aceita até tratamento ambulatorial do primário sintomático; drenar todo pneumotórax com dor ou dispneia é a pegadinha (adap22-014).|q-adap22-014]] [[**Derrame na criança**: drena-se o complicado (pus, Gram ou cultura positivos, pH baixo, derrame grande com desconforto); a unifesp2023-077 aceitou só o Gram positivo, deixando "glicose < 60" de fora.|q-unifesp2023-077]] [[**Aspiração contínua**: não é necessária no pneumotórax espontâneo drenado; o selo d'água basta (scmsp2021-029).|q-scmsp2021-029]]`,
          texto: `- Contralateral: cirurgia; a prova deu **pleurodese bilateral**. {q-unifesp2026-005}
- Primário pequeno: **observar** é opção. {q-adap22-014}
- Criança: a prova aceitou só **Gram positivo**. {q-unifesp2023-077}
- Aspiração contínua **não** é rotina. {q-scmsp2021-029}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: o líquido pleural",
      introducao: `Resumo do capítulo de derrame.`,
      fragmentos: [
        { id: "cmp-liquido", titulo: "Aspecto e bioquímica por causa", conferir: true,
          questoes: ["q-scmsp2023-030","q-tp20231-073","q-famema2023-026","q-adap23-077","q-sessp2026-038"],
          prosa: `[[Light primeiro, depois as pistas de cada causa.|q-scmsp2023-030,q-tp20231-073,q-famema2023-026,q-adap23-077,q-sessp2026-038]]

| Causa | Tipo | Pista | Conduta |
|---|---|---|---|
| Insuficiência cardíaca, cirrose | transudato | bilateral, gradiente de albumina > 1,2 | tratar a doença |
| Parapneumônico complicado / empiema | exsudato | pH < 7,2, glicose < 60, DHL alto, pus, Gram | drenar |
| Tuberculose | exsudato linfocítico | ADA > 40 | esquema RIPE |
| Neoplasia | exsudato, às vezes hemorrágico | citologia, volumoso, recidiva | pleurodese ou cateter |
| Quilotórax | leitoso | triglicerídeos > 110 | dieta TCM, drenar, ligar o ducto |`,
          texto: `- **Light** separa transudato e exsudato. {q-scmsp2023-030}
- **pH baixo e glicose baixa**: drenar. {q-tp20231-073}
- **ADA alta**: tuberculose. {q-famema2023-026}
- **Triglicerídeos altos**: quilotórax. {q-adap23-077}
- **IC**: transudato. {q-sessp2026-038}` },
      ],
    },
  ],
});
