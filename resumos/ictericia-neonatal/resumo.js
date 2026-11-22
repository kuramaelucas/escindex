/* resumos/ictericia-neonatal/resumo.js — resumo adaptativo de icterícia neonatal: metabolismo da
   bilirrubina, icterícia fisiológica e do aleitamento, fatores de risco, doença hemolítica, fototerapia
   e exsanguineotransfusão, encefalopatia bilirrubínica e colestase (atresia biliar).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- ictericia-neonatal */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "ictericia-neonatal",
  titulo: "Icterícia neonatal",
  assunto: "ass-ictericia",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "aap-hiperbilirrubinemia", texto: "American Academy of Pediatrics — Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant ≥ 35 Weeks (2022)", lidoEm: null },
    { id: "sbp-ictericia", texto: "Sociedade Brasileira de Pediatria — Hiperbilirrubinemia indireta no período neonatal (Documento científico nº 10, Departamento de Neonatologia, 2021), sbp.com.br", lidoEm: "2026-11-19" },
    { id: "sbp-colestase", texto: "Sociedade Brasileira de Pediatria — Colestase neonatal e alerta amarelo (documento científico)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada: sem gabarito para medir o erro", questoes: ["q-usp2023-092"] },
  ],
  doencas: [
    {
      id: "fisiologia", titulo: "Por que o recém-nascido fica amarelo",
      introducao: `[[O recém-nascido produz mais bilirrubina porque tem mais hemácias e elas vivem menos; ao mesmo tempo, o fígado conjuga devagar, porque a glicuroniltransferase ainda é imatura.|q-scmsp2026-050,q-usp2025-066,q-uspsp2-064]] Por isso quase todo bebê fica ictérico, a partir das 24 horas, com pico entre o 3º e o 5º dia: é a **icterícia fisiológica**, de bilirrubina **indireta**.

[[No intestino do recém-nascido, a β-glicuronidase desconjuga a bilirrubina e ela é reabsorvida: quanto menos o bebê mama e evacua, mais bilirrubina volta ao sangue por essa circulação êntero-hepática.|q-iamspe2026-065,q-uspsp1-016,q-unesp2025-002]] [[A icterícia que começa antes de 24 horas nunca é fisiológica: indica produção excessiva, quase sempre hemólise.|q-scmsp2026-041,q-famerp2024-052,q-unicampdis2022-027]]

Veja também: **Abdome agudo do recém-nascido** e **Cirrose e complicações**, onde a atresia de vias biliares reaparece; a investigação da colestase está completa neste resumo.`,
      fragmentos: [
        { id: "fis-mecanismo", titulo: "Fisiológica e ligada ao aleitamento", conferir: true,
          figuras: [{ arquivo: "figuras/metabolismo.svg", legenda: "Esquema autoral: o caminho da bilirrubina e o ponto em que cada causa de icterícia atua." }],
          questoes: ["q-scmsp2026-050","q-usp2025-066","q-uspsp2-064","q-iamspe2026-065","q-uspsp1-016","q-unesp2025-002","q-adap23-073","q-unicampdis2025-077","q-famerp2026-033","q-tp20231-037"],
          prosa: `O recém-nascido produz mais bilirrubina (mais hemácias, de vida mais curta) e a elimina pior (a enzima de conjugação ainda está imatura, e a circulação êntero-hepática reabsorve parte do que chega ao intestino). A icterícia do aleitamento ineficaz vem da pouca ingestão, que lentifica o trânsito; a do leite materno é tardia, em bebê que mama bem, e não pede interrupção do aleitamento.`,
          texto: `- Causas fisiológicas: **massa eritrocitária maior**, hemácias de **vida mais curta** e **glicuroniltransferase imatura**. {q-scmsp2026-050,q-usp2025-066,q-uspsp2-064}
- Pouca mamada: **aumenta a circulação êntero-hepática** (icterícia do aleitamento ineficaz); corrigir a técnica e aumentar as mamadas. {q-iamspe2026-065,q-uspsp1-016,q-unesp2025-002}
- **Icterícia do leite materno**: tardia e prolongada, bebê ganhando bem peso, só indireta; **manter a amamentação** e acompanhar. {q-adap23-073,q-unicampdis2025-077,q-famerp2026-033}
- Icterícia leve, bebê bem: **acompanhamento de puericultura**. {q-tp20231-037}` },
      ],
    },
    {
      id: "avaliar", titulo: "Avaliar: zonas de Kramer, dosagem e fatores de risco",
      introducao: `[[A icterícia avança da cabeça para os pés à medida que a bilirrubina sobe, e as zonas de Kramer estimam o nível; mas a estimativa visual erra, e por isso, havendo dúvida, dosa-se a bilirrubina.|q-iamspe2021-045,q-unifesp2025-094,q-tp20241-036]] [[O valor só se interpreta pela idade em horas: o mesmo número é normal com 4 dias e alto com 30 horas, e é o nomograma que diz o risco.|q-013,q-usp2022-048,q-sirio2022-059]]`,
      fragmentos: [
        { id: "ava-kramer", titulo: "Kramer e quando dosar", conferir: false, diretrizes: ["aap-hiperbilirrubinemia","sbp-ictericia"],
          figuras: [{ arquivo: "figuras/kramer.svg", legenda: "Esquema autoral: zonas de Kramer e a bilirrubina aproximada de cada uma." }],
          questoes: ["q-iamspe2021-045","q-unifesp2025-094","q-tp20241-036","q-einstein2024-036","q-013","q-usp2022-048","q-sirio2022-059"],
          casos: ["q-einstein2024-036"],
          prosa: `A icterícia avança da cabeça para os pés à medida que a bilirrubina sobe, e por isso as zonas de Kramer estimam o nível; mas a avaliação visual erra, sobretudo em pele escura, e qualquer icterícia que preocupe se mede. O valor só tem sentido comparado à idade em horas, no nomograma.`,
          texto: `- Zonas de Kramer (progressão **cefalocaudal**): **I** cabeça e pescoço (~6 mg/dL), **II** até o umbigo (~9), **III** até os joelhos (~12), **IV** até tornozelos e punhos (~15) e **V** palmas e plantas (acima de ~15 mg/dL). {q-iamspe2021-045}
- Zona II de Kramer: bilirrubina em torno de **9 mg/dL**. {q-iamspe2021-045}
- Icterícia visível que preocupa: **dosar a bilirrubina** (sérica ou transcutânea). {q-unifesp2025-094,q-tp20241-036}
- Icterícia persistente após 2 semanas: **investigar** (frações, tireoide), mantendo o aleitamento. {q-einstein2024-036}
- Interpretar pelo **nomograma por horas de vida**; fototerapia só acima do limiar. {q-013}
- Abaixo do limiar e bebê bem: **mamadas mais frequentes** e reavaliar em 48 a 72 h, ou alta com orientações. {q-usp2022-048,q-sirio2022-059}` },
        { id: "ava-risco", titulo: "Fatores de risco para hiperbilirrubinemia", conferir: false, diretrizes: ["aap-hiperbilirrubinemia"],
          questoes: ["q-amrigs2023-067","q-unesp2023-005","q-fmabc2025-059","q-iamspe2023-038"],
          prosa: `Os fatores de risco apontam mais produção (hemólise, céfalo-hematoma), menos eliminação (prematuridade, pouca ingestão) ou precocidade, e por isso mudam o limiar da fototerapia.`,
          texto: `- **Irmão que precisou de fototerapia**. {q-amrigs2023-067,q-unesp2023-005,q-fmabc2025-059}
- **Icterícia nas primeiras 24 horas** e **mãe diabética**. {q-fmabc2025-059}
- **Perda de peso acima de 7%** (SBP; a prova citou 10%) ou aleitamento ineficaz na primeira semana. {q-iamspe2023-038}
- Sexo **masculino**. {q-unesp2023-005}` },
      ],
    },
    {
      id: "hemolise", titulo: "Doença hemolítica",
      introducao: `[[Na incompatibilidade ABO, a mãe O tem anticorpos anti-A e anti-B da classe IgG, que atravessam a placenta e destroem hemácias A ou B do bebê; a hemólise costuma ser leve, com Coombs direto às vezes negativo, esferócitos e reticulócitos altos.|q-unifesp2023-073,q-amrigs2021-074,q-usprp2022-087]] [[Na doença Rh, a mãe Rh negativo sensibilizada em gestação anterior produz anti-D: a hemólise é mais grave e começa nas primeiras horas, com Coombs direto positivo.|q-famerp2024-052,q-unicampdis2022-027,q-didepm-024]]`,
      fragmentos: [
        { id: "hem-abo-rh", titulo: "ABO, Rh e G6PD", conferir: true,
          questoes: ["q-unifesp2023-073","q-amrigs2021-074","q-usprp2022-087","q-famema2023-082","q-unesp2022-003","q-scmsp2026-041","q-famerp2024-052","q-unicampdis2022-027","q-didepm-024","q-uspsp1-024","q-sirio2027-058","q-tp20222-044"],
          prosa: `Na doença hemolítica, anticorpos da mãe atravessam a placenta e destroem as hemácias do bebê: Rh na mãe sensibilizada, ABO quando a mãe é O. A hemólise faz a icterícia aparecer nas primeiras 24 horas, com reticulócitos altos e Coombs direto positivo. Na deficiência de G6PD a hemácia não resiste ao estresse oxidativo, e o Coombs é negativo. Outras causas de excesso de produção: **esferocitose** e sangue reabsorvido de **céfalo-hematoma**.`,
          texto: `- Mãe **O**, RN **A ou B**, reticulócitos altos e **esferócitos**: **incompatibilidade ABO**. {q-unifesp2023-073,q-amrigs2021-074,q-usprp2022-087}
- ABO com icterícia precoce: bilirrubinas, **eluato/Coombs** e **fototerapia**. {q-famema2023-082,q-unesp2022-003}
- Icterícia **antes de 24 h**: hemólise até prova em contrário; coletar exames e iniciar fototerapia. {q-scmsp2026-041}
- Mãe **Rh negativo**, RN Rh positivo, icterícia nas primeiras horas: **doença Rh**; fototerapia intensiva já. {q-famerp2024-052,q-unicampdis2022-027}
- Coombs direto positivo e reticulócitos altos, sem encefalopatia: **fototerapia intensiva**, bilirrubina e hemoglobina seriadas. {q-didepm-024}
- Hemácias fragmentadas e **G6PD baixa**: fototerapia e nova bilirrubina em 6 h. {q-uspsp1-024}
- Hemólise ABO com letargia e sucção débil: sinais de **encefalopatia aguda**; monitorar a bilirrubina total sérica. {q-sirio2027-058}
- Icterícia até palmas e plantas com 48 h em mãe O e RN B: **bilirrubinas já** e considerar **exsanguineotransfusão**. {q-tp20222-044}` },
      ],
    },
    {
      id: "tratamento", titulo: "Fototerapia, exsanguineotransfusão e encefalopatia",
      introducao: `[[A luz azul transforma a bilirrubina da pele em isômeros solúveis em água, que saem pela urina e pela bile sem precisar do fígado; por isso a eficácia depende da irradiância e da superfície exposta.|q-einstein2022-044,q-sessp2022-041]] [[A bilirrubina indireta livre atravessa a barreira hematoencefálica e se deposita nos núcleos da base: a encefalopatia começa com hipotonia, sonolência e sucção débil e evolui para hipertonia, opistótono e convulsões.|q-sessp2024-056,q-unesp2024-001]]`,
      fragmentos: [
        { id: "tra-foto", titulo: "Fototerapia", conferir: true, diretrizes: ["aap-hiperbilirrubinemia","sbp-ictericia"],
          questoes: ["q-scmsp2023-049","q-einstein2024-045","q-sessp2022-041","q-usprp2024-063","q-usp2026-071","q-einstein2022-044"],
          casos: ["q-scmsp2023-049","q-usprp2024-063"],
          prosa: `A luz azul transforma a bilirrubina da pele em isômeros solúveis, eliminados sem conjugação pela bile e pela urina. A eficácia depende da irradiância e da área exposta, e por isso a fototerapia intensiva usa luz alta em cima e embaixo.`,
          texto: `- Bilirrubina acima da linha do nomograma: **iniciar fototerapia** e **reavaliar em 4 a 8 h**. {q-scmsp2023-049,q-einstein2024-045}
- Fototerapia com **irradiância medida**. {q-sessp2022-041}
- Em queda e abaixo do limiar intensivo: **manter** a fototerapia como está. {q-usprp2024-063}
- Abaixo do limiar com 48 h e perda de peso: manter internado, reavaliar **icterícia, peso e diurese em 6 h**. {q-usp2026-071}
- Nível alto: fototerapia **de alta irradiância (> 30 µW/cm²/nm), superior e inferior**. {q-einstein2022-044}` },
        { id: "tra-encefalopatia", titulo: "Encefalopatia bilirrubínica", conferir: true,
          questoes: ["q-sessp2024-056","q-unesp2024-001"],
          prosa: `A bilirrubina indireta livre atravessa a barreira hematoencefálica e se deposita nos núcleos da base: começa com hipotonia e sucção débil e evolui para hipertonia e opistótono. É a lesão que a fototerapia e a exsanguineotransfusão existem para evitar.`,
          texto: `- Início: **hipotonia e sucção débil**, depois **hipertonia, opistótono** e febre. {q-sessp2024-056}
- RN muito ictérico com hipertonia e movimentos de pedalar: **acesso, fenobarbital, hidratação** e transferência para centro terciário (exsanguineotransfusão). {q-unesp2024-001}` },
      ],
    },
    {
      id: "colestase", titulo: "Colestase neonatal e atresia biliar",
      introducao: `[[Quando a bilirrubina direta sobe, o problema está na saída: a bile não chega ao intestino, as fezes ficam claras (acolia) e a urina escura (colúria); bilirrubina direta acima de 1 mg/dL (ou mais de 20% da total) nunca é fisiológica.|q-tp20232-039,q-simepm89-097,q-udisc20262-048]] [[A atresia biliar oblitera as vias biliares extra-hepáticas e leva à cirrose em semanas; a cirurgia de Kasai funciona melhor antes de 60 dias, e por isso a criança com acolia vai ao especialista com urgência.|q-adap25-094,q-tp20231-044,q-fmabc2026-042]]`,
      fragmentos: [
        { id: "col-atresia", titulo: "Reconhecer e encaminhar", conferir: true, diretrizes: ["sbp-colestase"],
          questoes: ["q-tp20232-039","q-simepm89-097","q-udisc20262-048","q-adap25-094","q-tp20231-044","q-fmabc2026-042","q-usprp2023-016"],
          prosa: `Quando a bilirrubina que sobe é a **direta**, o problema é a saída da bile, e não o excesso de produção. A atresia de vias biliares é a causa que tem prazo: a cirurgia de Kasai funciona muito melhor antes de 60 dias, e por isso toda icterícia que passa de 2 semanas pede a fração direta.`,
          texto: `- Icterícia prolongada com **fezes acólicas** ou hepatomegalia: **bilirrubina total e frações com urgência**. {q-tp20232-039,q-simepm89-097}
- Colestase confirmada: **encaminhar com urgência** ao gastroenterologista. {q-udisc20262-048,q-simepm89-097}
- Direta alta, fígado firme: **atresia biliar**; operar **antes de 60 dias**. {q-adap25-094,q-tp20231-044}
- GGT muito alta: atresia de vias extra-hepáticas; primeiro exame, **US de fígado e vias biliares**. {q-fmabc2026-042}
- Cirrose biliar estabelecida (biópsia com fibrose e proliferação ductal) após falha: **transplante hepático**. {q-usprp2023-016}` },
      ],
    },
  ],
});
