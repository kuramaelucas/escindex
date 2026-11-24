/* resumos/arboviroses/resumo.js — resumo adaptativo de arboviroses: dengue (fases, sinais de alarme, grupos A a D, hidratação,
   diagnóstico laboratorial, gestante e vacina), chikungunya, Zika e febre amarela.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- arboviroses */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "arboviroses",
  titulo: "Dengue, chikungunya, Zika e febre amarela",
  assunto: "ass-arboviroses",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "dengue-manejo-ms", texto: "Ministério da Saúde — Dengue: diagnóstico e manejo clínico, adulto e criança (5ª ed., 2016) e atualização do fluxograma de classificação de risco em grupos A, B, C e D (2023/2024)", lidoEm: null },
    { id: "chik-manejo-ms", texto: "Ministério da Saúde — Chikungunya: manejo clínico (2017) e Guia de Vigilância em Saúde (definição de caso)", lidoEm: null },
    { id: "zika-ms", texto: "Ministério da Saúde — Orientações integradas de vigilância e atenção à saúde (Zika, microcefalia, transmissão sexual e concepção)", lidoEm: null },
    { id: "fa-ms", texto: "Ministério da Saúde — Guia de Vigilância em Saúde e Manual de Vigilância da Febre Amarela; calendário vacinal vigente", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anulada pela banca (gabarito do material de origem em desacordo com a literatura)", questoes: ["q-fmabc2026-020"] },
  ],
  doencas: [
    {
      id: "dengue", titulo: "Dengue",
      introducao: `A **dengue** é causada por um flavivírus de RNA com **4 sorotipos** (DENV-1 a 4), transmitido pela **fêmea do *Aedes aegypti***, que pica de dia, e **não passa de pessoa a pessoa**; o homem é o único reservatório da dengue urbana. [[A **infecção confere imunidade duradoura ao sorotipo** e proteção cruzada **transitória** (meses) aos outros; e o **extravasamento de plasma**, e não a plaquetopenia, é o que separa as formas benignas das graves.|q-gdarboviroses-114,q-gdarboviroses-086,q-gdarboviroses-054]]

Veja também: **Exantemáticas** (diagnóstico diferencial), **Vigilância em saúde** (notificação), **Imunização** (vacina de dengue e de febre amarela), **Pré-natal** e **Sepse**.`,
      fragmentos: [
        { id: "dengue-bases", titulo: "Agente, transmissão, caso suspeito e quadro clínico", conferir: true, diretrizes: ["dengue-manejo-ms"],
          questoes: ["q-gdarboviroses-002","q-gdarboviroses-004","q-gdarboviroses-036","q-gdarboviroses-044","q-gdarboviroses-055","q-gdarboviroses-064","q-gdarboviroses-068","q-gdarboviroses-078","q-gdarboviroses-079","q-gdarboviroses-085","q-gdarboviroses-086","q-gdarboviroses-103","q-gdarboviroses-106","q-gdarboviroses-112","q-gdarboviroses-114","q-gdarboviroses-121","q-gdarboviroses-026","q-amrigs2022-001","q-amrigs2022-072","q-famema2025-077","q-tp20241-119","q-famema2021-030","q-gdarboviroses-037","q-gdarboviroses-119"],
          prosa: `[[A dengue é flavivírus de **RNA com 4 sorotipos**, de **incubação de 3 a 15 dias** (em geral 5 a 7), transmitida pelo ***Aedes aegypti*** (diurno, com picos nas horas mais frescas), e o **controle** depende de **reduzir a densidade do vetor**, não de isolar doentes, porque o homem é o único reservatório da dengue urbana; as **mudanças climáticas** favorecem dengue, Zika e febre amarela.|q-tp20241-119,q-gdarboviroses-055,q-gdarboviroses-064,q-gdarboviroses-103,q-gdarboviroses-044,q-gdarboviroses-068,q-gdarboviroses-078,q-gdarboviroses-106,q-gdarboviroses-112,q-famema2025-077]] [[O **caso suspeito** é a pessoa com **febre aguda de até 7 dias**, em área de transmissão, com **pelo menos 2 sintomas** (cefaleia, dor retro-orbital, mialgia, artralgia, prostração, exantema); na **criança**, a febre de 2 a 7 dias **sem foco** basta; o quadro é a "febre quebra-ossos", com **cefaleia retro-orbital, mialgia, artralgia e exantema**, e a **infecção primária pode ser benigna**, mas a **sequencial** (um sorotipo diferente) e o **anticorpo materno do lactente** são fatores de gravidade.|q-gdarboviroses-085,q-amrigs2022-072,q-gdarboviroses-026,q-gdarboviroses-079,q-gdarboviroses-037,q-gdarboviroses-119,q-famema2021-030,q-amrigs2022-001,q-gdarboviroses-002,q-gdarboviroses-004,q-gdarboviroses-121,q-gdarboviroses-036,q-gdarboviroses-086,q-gdarboviroses-114]]`,
          texto: `- A dengue é **flavivírus** (família Flaviviridae). {q-tp20241-119}
- Vírus de RNA com **4 sorotipos**; a infecção pode ser assintomática; infecção prévia por outro sorotipo é **fator de risco** para dengue grave. {q-gdarboviroses-055}
- Incubação de **3 a 15 dias**, em geral 5 a 7 (a prova deu 7 a 10). {q-gdarboviroses-064}
- O ***Aedes aegypti*** tem hábito **diurno**, com picos nas horas de menor temperatura. {q-gdarboviroses-103}
- O homem é o **único reservatório** do ciclo urbano. {q-gdarboviroses-078}
- Maior medida de controle: **diminuir a densidade de vetores**. {q-gdarboviroses-044,q-gdarboviroses-068}
- Caso suspeito: febre de até 7 dias com ao menos **dois** sintomas. {q-gdarboviroses-085}
- Na criança: febre aguda de 2 a 7 dias **sem foco**, em área de risco. {q-amrigs2022-072,q-gdarboviroses-026}
- "Febre quebra-ossos" pela mialgia e artralgia. {q-gdarboviroses-079}
- Adolescente com febre, cefaleia retro-orbital, mialgia e exantema macular que empalidece: **dengue**. {q-gdarboviroses-037}
- Viagem, cefaleia intensa, febre quebra-ossos e exantema: **dengue**. {q-gdarboviroses-119}
- Homem de 25 anos com febre de 40 °C, petéquias esparsas e sorologia: **dengue clássica**. {q-famema2021-030}
- Espectro da doença depende do vírus e de **infecção anterior**. {q-amrigs2022-001}
- Lactente de mãe imune pode ter **forma hemorrágica** (anticorpo materno de outro sorotipo). {q-gdarboviroses-004}
- A infecção primária **nem sempre** é benigna, e nem toda secundária é grave. {q-gdarboviroses-121}
- A fisiopatologia que diferencia as formas benignas das graves é o **extravasamento de plasma**. {q-gdarboviroses-086}
- Imunidade **sorotipo-específica** duradoura, cruzada por meses. {q-gdarboviroses-114}
- Dengue é a arbovirose mais incidente no Brasil, de distribuição ampla. {q-gdarboviroses-002}
- O *Aedes aegypti* transmite **dengue, Zika, chikungunya e febre amarela urbana**. {q-gdarboviroses-112}
- Condições ligadas ao clima, desmatamento e urbanização favorecem os arbovírus. {q-gdarboviroses-036,q-gdarboviroses-106}
- Dengue, Zika e febre amarela se relacionam às mudanças climáticas. {q-famema2025-077}` },
        { id: "dengue-fases", titulo: "Fases da doença, extravasamento, choque e prova do laço", conferir: true, diretrizes: ["dengue-manejo-ms"],
          questoes: ["q-gdarboviroses-013","q-gdarboviroses-014","q-gdarboviroses-016","q-gdarboviroses-024","q-gdarboviroses-027","q-gdarboviroses-039","q-gdarboviroses-065","q-gdarboviroses-104","q-gdarboviroses-117","q-gdarboviroses-071","q-gdarboviroses-011","q-gdarboviroses-094","q-amrigs2025-015","q-famema2023-027","q-fmabc2022-053","q-usp2025-067","q-fmabc2023-008","q-gdarboviroses-006","q-gdarboviroses-007","q-gdarboviroses-072","q-gdarboviroses-080","q-gdarboviroses-091","q-gdarboviroses-098","q-gdarboviroses-102","q-gdarboviroses-054","q-gdarboviroses-097","q-amrigs2022-094"],
          prosa: `[[A dengue tem **fase febril** (viremia), **fase crítica** e **recuperação**; a **fase crítica** começa **com a queda da febre (defervescência), entre o 3º e o 7º dia**, quando o vírus já saiu da corrente e a lesão do endotélio faz o plasma **extravasar** para o terceiro espaço (derrame pleural, ascite): o **hematócrito sobe (hemoconcentração)**, a **albumina cai** e o **choque**, que é a causa da maioria dos óbitos, se instala por volta do 4º dia, **não nas primeiras 48 horas**; a **plaquetopenia isolada não prediz o volume extravasado**, e a **transfusão profilática de plaquetas não é indicada** (só com sangramento importante).|q-gdarboviroses-014,q-gdarboviroses-024,q-gdarboviroses-117,q-gdarboviroses-013,q-gdarboviroses-071,q-gdarboviroses-011,q-amrigs2025-015,q-famema2023-027,q-gdarboviroses-054,q-gdarboviroses-094,q-gdarboviroses-102]] [[A **prova do laço** mede a fragilidade capilar: **insufla-se o manguito até a pressão média, por 5 minutos no adulto e 3 na criança**, e é **positiva com 20 ou mais petéquias em 2,5 cm** no adulto (10 ou mais na criança); faz-se em todo suspeito **sem sangramento espontâneo**, e positiva é alerta, mas **não é específica**.|q-gdarboviroses-006,q-gdarboviroses-007,q-gdarboviroses-072,q-gdarboviroses-080,q-gdarboviroses-091,q-fmabc2023-008]] [[Na **criança** o início é **inespecífico** e o quadro grave pode ser a primeira manifestação, com agravamento **mais súbito** que no adulto; o **exantema** comum não indica gravidade (só o petequial); a **insuficiência hepática aguda** da dengue exige coagulopatia não corrigível com vitamina K e RNI acima de 2; e a **NS1 negativa no 3º dia não exclui** dengue.|q-gdarboviroses-016,q-gdarboviroses-039,q-gdarboviroses-065,q-gdarboviroses-104,q-gdarboviroses-027,q-fmabc2022-053,q-gdarboviroses-097,q-usp2025-067,q-gdarboviroses-098]]`,
          texto: `- Dengue grave: **choque por extravasamento de líquidos** para o terceiro espaço, hemorragia ou comprometimento de órgãos. {q-gdarboviroses-013}
- Fase crítica: **defervescência**, entre o 3º e o 7º dia. {q-gdarboviroses-014}
- Na criança o início é **inespecífico** e o agravamento é **mais súbito** (a afirmativa de "mais arrastado" é incorreta). {q-gdarboviroses-016,q-gdarboviroses-065}
- O choque ocorre **em torno do quarto dia, quando a febre desaparece** (não nas primeiras 48 horas). {q-gdarboviroses-024,q-gdarboviroses-117}
- O exantema comum **não** tem relação com a gravidade; só o petequial. {q-gdarboviroses-027}
- Menores de 2 anos: o quadro grave pode ser a **primeira manifestação**. {q-gdarboviroses-039}
- A dengue na criança é uma síndrome febril viral **inespecífica**. {q-gdarboviroses-104}
- Hemoconcentração (**hematócrito alto**) é a marca laboratorial do extravasamento. {q-gdarboviroses-071}
- Extravasamento: **hematócrito, albumina e ultrassonografia**. {q-gdarboviroses-011}
- Plaquetas de 15.000, estável e sem sangramento: **sem transfusão** (só com sangramento importante). {q-gdarboviroses-094}
- Febre hemorrágica (classificação antiga): plaquetas abaixo de 100.000 e alargamento do tempo de protrombina; leucopenia antecede. {q-amrigs2025-015}
- Hematócrito que sobe **20 % ou mais** sobre o basal indica **extravasamento** (critério da antiga febre hemorrágica). {q-famema2023-027}
- Insuficiência hepática aguda: **coagulopatia que a vitamina K não corrige e RNI acima de 2**, sem encefalopatia. {q-fmabc2022-053}
- Criança com 5 dias de febre, exantema que já resolveu, dor abdominal depois da defervescência: **plaquetas de 70.000 com hematócrito de 48 %**. {q-usp2025-067}
- A prova do laço positiva é **frequente na dengue grave**, não específica, e serve de **alerta**. {q-fmabc2023-008}
- Prova do laço: **20 ou mais petéquias em 2,5 cm** no adulto; faz-se sem sangramento espontâneo. {q-gdarboviroses-006,q-gdarboviroses-072,q-amrigs2022-094}
- Fazer em todo suspeito sem sangramento; mais de 20 petéquias em adultos e mais de 10 em crianças. {q-gdarboviroses-007,q-gdarboviroses-091}
- Errado: o manguito vai até a **pressão média** (não a sistólica), por 5 min no adulto e 3 na criança. {q-gdarboviroses-080}
- IgM só **a partir do 6º dia** (não em 24 h); DENV-5 foi descrito na Malásia, mas **não circula** no Brasil; imunidade ao sorotipo **duradoura**. {q-gdarboviroses-098}
- Sintomas respiratórios são **pouco frequentes**; em epidemia, IgM **só em graves, óbitos e grupos de risco**; grupo C interna; quem mais mata é o **choque**, não o sangramento; derrame **em regressão** permite alta. {q-gdarboviroses-102}
- Criança de 8 anos com 9 dias de febre, plaquetas de 68.000, hematócrito de 46 % e albumina de 2,9: **extravasamento**. {q-gdarboviroses-054}
- Criança com icterícia e TGP de 280, NS1 negativo: o item "descartar dengue" é **errado**. {q-gdarboviroses-097}` },
        { id: "dengue-lab", titulo: "Diagnóstico laboratorial: NS1, RT-PCR e sorologia", conferir: true, diretrizes: ["dengue-manejo-ms"],
          questoes: ["q-simepm89-076","q-amrigs2024-002","q-einstein2027-014","q-tp20232-025","q-tp20261-003","q-tp20241-019","q-tp20222-029","q-gdarboviroses-025","q-gdarboviroses-028","q-gdarboviroses-075","q-gdarboviroses-105","q-gdarboviroses-108","q-gdarboviroses-109","q-gdarboviroses-089"],
          prosa: `[[Nos **primeiros 5 dias** o vírus está no sangue e se detecta por **NS1, RT-PCR ou isolamento viral**; os **anticorpos** só aparecem a partir do **6º dia** (IgM), por isso a **sorologia no 2º ou 3º dia** de doença é **precoce e negativa**, e se pede **NS1**; e, em epidemia, a **sorologia não é solicitada a todos**, apenas aos graves, óbitos e grupos de risco.|q-simepm89-076,q-amrigs2024-002,q-einstein2027-014,q-tp20232-025,q-tp20261-003,q-tp20241-019,q-tp20222-029,q-gdarboviroses-025,q-gdarboviroses-028,q-gdarboviroses-075,q-gdarboviroses-105,q-gdarboviroses-108,q-gdarboviroses-109]]`,
          texto: `- **RT-PCR** na fase precoce (até o 5º dia), com alta especificidade. {q-simepm89-076}
- Vírus detectável até o 5º dia; anticorpos **do 6º dia em diante**. {q-amrigs2024-002}
- Com 2 dias de febre: **NS1 positivo, IgM e IgG negativos**. {q-einstein2027-014}
- Febre alta há 3 dias e dor retro-orbitária em epidemia: **NS1 ou isolamento viral**. {q-tp20232-025,q-tp20261-003}
- Febre há 3 dias, dor retro-orbitária e abdominal: **pesquisa de antígeno**. {q-tp20241-019}
- Febre há 4 dias com sangramento gengival e hematúria: **dengue com sinais de alarme; antígeno NS1**. {q-tp20222-029}
- Quadro de 2 dias: **muito precoce para anticorpos; solicitar NS1**. {q-gdarboviroses-025,q-gdarboviroses-028}
- Confirmação por **ELISA e NS1**. {q-gdarboviroses-075}
- Pedir IgM e IgG a quem tem 3 dias de sintomas **e sinais de alarme** é item errado: o alarme manda internar e hidratar. {q-gdarboviroses-105}
- O gráfico de cinética mostra **antígeno no início e anticorpo depois**. {q-gdarboviroses-108}
- Exames específicos: **isolamento viral, RT-PCR e NS1**. {q-gdarboviroses-109}
- Dourados, gestante de 10 semanas, febre há 2 dias: **NS1, hemograma, transaminases e albumina**. {q-gdarboviroses-089}` },
        { id: "dengue-alarme", titulo: "Sinais de alarme e classificação em grupos", conferir: true, diretrizes: ["dengue-manejo-ms"],
          figuras: [{ arquivo: "figuras/dengue-grupos.svg", legenda: "Esquema autoral: grupos A a D e conduta." }],
          questoes: ["q-inf-22","q-amrigs2023-011","q-famema2025-009","q-famema2025-033","q-gdarboviroses-008","q-gdarboviroses-038","q-gdarboviroses-041","q-gdarboviroses-045","q-gdarboviroses-069","q-gdarboviroses-001","q-gdarboviroses-005","q-gdarboviroses-010","q-fmabc2025-056","q-usprp2024-071"],
          prosa: `[[Os **sinais de alarme** mostram **extravasamento de plasma ou sangramento**: **dor abdominal intensa e contínua** (do hipocôndrio direito, pela hepatomegalia), **vômitos persistentes, sangramento de mucosa, letargia ou irritabilidade, hipotensão postural, hepatomegalia dolorosa de 2 cm ou mais, derrame cavitário, redução da diurese e aumento do hematócrito com queda das plaquetas**; **queda** do hematócrito não é alarme.|q-inf-22,q-amrigs2023-011,q-gdarboviroses-045,q-gdarboviroses-069,q-gdarboviroses-038,q-gdarboviroses-041,q-gdarboviroses-001,q-gdarboviroses-005,q-gdarboviroses-010,q-fmabc2025-056]] [[Pela classificação de risco, o **grupo A** não tem sangramento nem sinais de alarme nem condição especial; o **grupo B** tem **sangramento de pele espontâneo (petéquias) ou induzido (prova do laço positiva), condição especial ou comorbidade** (por exemplo, menor de 2 anos, gestante, idoso, diabetes), sem sinais de alarme; o **grupo C** tem sinais de alarme e o **D**, choque; a prova do laço sozinha **não** define o grupo C.|q-famema2025-009,q-famema2025-033,q-gdarboviroses-008,q-usprp2024-071]]`,
          texto: `- Sinais de alarme: dor abdominal intensa e contínua, vômitos persistentes, sangramento de mucosa, letargia, hepatomegalia dolorosa, **hematócrito subindo com plaquetas caindo**. {q-inf-22}
- Exceto: **queda do hematócrito** e dor abdominal em cólica não são alarme (o alarme é o aumento). {q-amrigs2023-011}
- Grupo B: **sangramento de pele espontâneo ou induzido, sem alarme nem choque**. {q-famema2025-009}
- Criança com sangramento espontâneo de pele, sem alarme: **grupo B**, hemograma obrigatório. {q-famema2025-033}
- Grupo B inclui **petéquias**; prova do laço negativa não. {q-gdarboviroses-008}
- Adulto sem comorbidade com **derrame pleural**: internar e hidratar por via venosa. {q-gdarboviroses-038}
- Dor abdominal intensa e contínua, vômitos persistentes, derrames e redução da diurese: **alarme**. {q-gdarboviroses-041}
- **Hepatomegalia dolorosa de 2 cm ou mais** abaixo do rebordo costal. {q-gdarboviroses-045}
- A dor abdominal do alarme é no **hipocôndrio direito**. {q-gdarboviroses-069}
- Febre há 3 dias, mialgia, petéquias e dois alarmes: **sangramento de mucosa e hematócrito crescente**. {q-gdarboviroses-001}
- Adolescente falciforme com vômitos persistentes: o alarme é **vômito persistente**. {q-gdarboviroses-005}
- Florianópolis, 5º dia, dor abdominal e vômitos: **dengue com sinais de alerta** (OMS). {q-gdarboviroses-010}
- Escolar com 4 dias de febre: alarme são **hepatomegalia dolorosa, hipotensão postural e melena**. {q-fmabc2025-056}
- Criança de 7 anos com 6 dias de febre, exantema e dor abdominal: **dengue grupo C**. {q-usprp2024-071}` },
        { id: "dengue-manejo-ab", titulo: "Manejo dos grupos A e B", conferir: true, diretrizes: ["dengue-manejo-ms"],
          questoes: ["q-inf-23","q-scmsp2025-092","q-usp2022-039","q-sessp2025-041","q-unesp2025-007","q-unesp2025-060","q-famerp2026-014","q-sirio2023-048","q-gdarboviroses-009","q-gdarboviroses-118"],
          prosa: `[[O **grupo A** recebe **hidratação oral** em casa, sem hemograma na primeira avaliação, com **retorno** até 48 horas depois da queda da febre ou antes se houver alarme; o **grupo B** colhe **hemograma** e recebe **hidratação oral supervisionada**, e, se não há hemoconcentração, segue em casa com **reavaliação diária até 48 horas depois da febre**; a hidratação oral, sempre com **um terço em sais de reidratação**, é de **60 mL/kg/dia no adulto** e, na criança, cai com o peso (**130 mL/kg/dia até 10 kg, 100 de 10 a 20 kg e 80 acima de 20 kg**); e o analgésico é **paracetamol ou dipirona**, nunca AAS ou AINEs, pelo risco de sangramento.|q-gdarboviroses-009,q-gdarboviroses-118,q-famerp2026-014,q-sessp2025-041,q-scmsp2025-092,q-unesp2025-060,q-unesp2025-007,q-sirio2023-048,q-inf-23,q-usp2022-039]]`,
          texto: `- **Paracetamol ou dipirona**; evitar AAS e AINEs. {q-inf-23}
- Gengivorragia em 2 dias de febre: **grupo B**, hemograma, hidratação oral e observação até o resultado. {q-scmsp2025-092}
- Adolescente com prova do laço negativa e NS1 negativo: **RT-PCR para SARS-CoV-2, hidratação oral e notificar** dengue e COVID. {q-usp2022-039}
- Criança de 5 anos sem alarme: **repouso, 100 mL/kg/dia (um terço com sais) e paracetamol**. {q-sessp2025-041}
- Dois irmãos: a menina de menos de 2 anos é **grupo B** e o irmão **grupo A**. {q-unesp2025-007}
- Homem de 33 anos com DM1 e epistaxe mínima: **grupo B**, hemograma em até 4 horas. {q-unesp2025-060}
- Epidemia: **B com hemograma e reavaliação diária até 48 h após a febre; A sem hemograma inicial**. {q-famerp2026-014}
- Criança com 6 dias de febre e prova do laço positiva: **hidratação oral, hemograma, teste rápido; se normal, acompanhar até 48 h após a febre**. {q-sirio2023-048}
- Dengue **tipo A**: hidratação oral e retorno no primeiro dia sem febre. {q-gdarboviroses-009}
- Prova do laço negativa e sem alarme: **hidratação oral**. {q-gdarboviroses-118}` },
        { id: "dengue-manejo-cd", titulo: "Manejo dos grupos C e D: hidratação venosa", conferir: true, diretrizes: ["dengue-manejo-ms"],
          questoes: ["q-adap25-039","q-usprp2025-034","q-sessp2023-038","q-famerp2025-056","q-uspsp2-055","q-unicampdis2025-060","q-unicampdis2022-012","q-unesp2026-060","q-fmabc2024-060","q-fmabc2023-044","q-einstein2025-061","q-amrigs2024-071","q-amrigs2023-076","q-gdarboviroses-018","q-gdarboviroses-020","q-gdarboviroses-022","q-gdarboviroses-040","q-gdarboviroses-048","q-gdarboviroses-057","q-gdarboviroses-073","q-gdarboviroses-074","q-gdarboviroses-076","q-gdsepse-048"],
          prosa: `[[O **grupo C** (sinais de alarme, sem choque) é **internado** e recebe **soro fisiológico 0,9% 10 mL/kg na primeira hora**, com **hemograma e reavaliação** em 4 horas e a notificação; o **grupo D** (choque: hipotensão postural, enchimento capilar lento, pulsos fracos) recebe **cristaloide 20 mL/kg em até 20 minutos, repetido até 3 vezes**, e, se o **hematócrito segue subindo** apesar disso, indica-se **expansor plasmático (albumina)**; e o choque do **grávida** pode surgir de repente, porque a **hipervolemia fisiológica mascara a perda**.|q-adap25-039,q-usprp2025-034,q-gdarboviroses-022,q-gdarboviroses-040,q-famerp2025-056,q-uspsp2-055,q-unicampdis2025-060,q-gdarboviroses-018,q-gdarboviroses-020,q-gdarboviroses-048,q-gdarboviroses-057,q-gdarboviroses-076,q-gdarboviroses-073,q-gdarboviroses-074,q-fmabc2024-060,q-fmabc2023-044,q-einstein2025-061,q-sessp2023-038,q-unesp2026-060,q-amrigs2024-071,q-unicampdis2022-012,q-gdsepse-048]]`,
          texto: `- Febre com defervescência, dor abdominal intensa, vômitos e sangramento gengival: **internação e soro fisiológico 10 mL/kg na primeira hora**. {q-adap25-039}
- Idosa de 68 anos, prova do laço positiva e **hematócrito de 49 % (hemoconcentração)**: **hidratação venosa 10 mL/kg em 1 hora na USF**. {q-usprp2025-034}
- Viagem, vômitos persistentes, dor intensa e queda do hematócrito: **hemograma, albumina, transaminases, reposição volêmica e notificação**. {q-sessp2023-038}
- Febre 3 dias, dor abdominal contínua e vômitos de 6 episódios: **grupo C**, expansão (a prova deu 20 mL/kg em 2 horas). {q-famerp2025-056}
- Choque (hipotensão postural, TEC de 4 s, SpO2 de 90 %): **20 mL/kg em até 20 minutos, podendo repetir**. {q-uspsp2-055}
- Choque refratário a 3 expansões com hematócrito de 51 para 54 %: **expansor plasmático (albumina)**. {q-unicampdis2025-060}
- Mulher de 24 anos com exantema, febre há 4 dias e vômitos: **dengue**. {q-unicampdis2022-012}
- Mulher de 21 anos com vômitos persistentes e tontura, usando ibuprofeno: **alarme, hidratação venosa e observação**. {q-unesp2026-060}
- Criança com febre, exantema pruriginoso, dor abdominal e vômitos: **internação, notificação, NS1 e hidratação venosa**. {q-fmabc2024-060}
- Febre 6 dias, cefaleia, petéquias e prova do laço positiva: **grupo C, internação e hidratação venosa**. {q-fmabc2023-044}
- Jovem de 25 anos com tontura postural: **grupo C, reposição na UBS e transferência**. {q-einstein2025-061}
- Criança de 2 anos com petéquias, epistaxe e sonolência: **sinal de alarme; hidratação venosa**. {q-amrigs2024-071}
- Criança de 5 anos com prova do laço positiva, dor abdominal e fígado palpável: **leito de internação**. {q-amrigs2023-076}
- Diabética com dor abdominal forte: **notificar, internar por 48 h, hidratação venosa e exames**. {q-gdarboviroses-018}
- Mulher de 17 anos, caso semelhante no pai: **dengue com alerta; internar e hidratar**. {q-gdarboviroses-020}
- Escolar de 22 kg com prova do laço positiva: **exames, 10 mL/kg na 1ª hora e regulação**. {q-gdarboviroses-022}
- Criança de 6 anos com petéquias e equimoses: **10 mL/kg e reavaliar o hematócrito em 4 horas**. {q-gdarboviroses-040}
- Criança no 5º dia, sonolência após defervescência: **grupo C, internação até estabilizar**. {q-gdarboviroses-048}
- Criança de 5 anos com dor orbitária e prostração: **prova do laço, sorologias e hidratação parenteral**. {q-gdarboviroses-057,q-gdarboviroses-076}
- Escolar após a queda da febre com vômitos: o alarme é a **dor abdominal**. {q-gdarboviroses-073}
- Criança de 3 anos com desidratação e vômitos: **prova do laço e hidratação venosa**. {q-gdarboviroses-074}
- Mulher de 32 anos com mialgia, dor retro-orbitária e exantema: **instalar hidratação venosa**. {q-gdsepse-048}` },
        { id: "dengue-especiais", titulo: "Gestante, vacina e prevenção", conferir: true, diretrizes: ["dengue-manejo-ms"],
          questoes: ["q-amrigs2024-059","q-scmsp2022-030","q-usp2025-118","q-gdarboviroses-019","q-gdarboviroses-120","q-tp20251-091"],
          prosa: `[[Na **gestante** a dengue **aumenta as complicações obstétricas**, e a **hipervolemia fisiológica (40 a 50 % de plasma a mais) mascara a perda de volume** até um nível crítico, por isso se interna a grávida com sangramento e sinais de alarme, com hidratação venosa e reavaliação; o **repelente de icaridina** pode ser usado em toda a gestação; e das **vacinas**, a tetravalente de vírus vivos atenuados (Dengvaxia) serve a **9 a 45 anos já soropositivos** em área endêmica, e a **Butantan-DV** (dose única) **não tem eficácia comprovada contra todos os sorotipos**.|q-gdarboviroses-019,q-gdarboviroses-120,q-tp20251-091,q-amrigs2024-059,q-scmsp2022-030,q-usp2025-118]]`,
          texto: `- Dengue na gravidez **aumenta** as complicações obstétricas (afirmar que não é, é errado). {q-gdarboviroses-019}
- Os sinais de perda volêmica podem estar **mascarados** na gestante. {q-gdarboviroses-120}
- Gestante de 36 semanas com sangramento gengival e PA de 96/54: **internação, hidratação venosa e reavaliação**. {q-tp20251-091}
- **Icaridina** pode ser usada durante toda a gestação. {q-amrigs2024-059}
- Vacina tetravalente: de **9 a 45 anos**, em área endêmica e **soropositivos**. {q-scmsp2022-030}
- **Butantan-DV**: sem eficácia comprovada contra todos os sorotipos. {q-usp2025-118}` },
      ],
    },
    {
      id: "chik-zika", titulo: "Chikungunya e Zika",
      introducao: `[[A **chikungunya** (alphavírus) causa **febre alta com poliartralgia intensa e edema articular**, e pode **cronificar**; a **Zika** (flavivírus) causa **febre baixa ou ausente, exantema pruriginoso precoce e conjuntivite não purulenta**, e preocupa pela **síndrome congênita** e pela **transmissão sexual**.|q-gdarboviroses-003,q-gdarboviroses-034,q-gdarboviroses-035,q-gdarboviroses-101]]`,
      fragmentos: [
        { id: "chik-aguda", titulo: "Chikungunya: fase aguda, diagnóstico e tratamento", conferir: true, diretrizes: ["chik-manejo-ms"],
          questoes: ["q-usp2025-119","q-tp20251-108","q-tp20261-020","q-famerp2022-006","q-unifesp2025-039","q-gdarboviroses-003","q-gdarboviroses-012","q-gdarboviroses-017","q-gdarboviroses-031","q-gdarboviroses-033","q-gdarboviroses-047","q-gdarboviroses-050","q-gdarboviroses-051","q-gdarboviroses-052","q-gdarboviroses-053","q-gdarboviroses-058","q-gdarboviroses-067","q-gdarboviroses-084","q-gdarboviroses-099","q-gdarboviroses-111","q-gdarboviroses-113","q-gdarboviroses-115","q-gdarboviroses-116"],
          prosa: `[[A chikungunya é **alphavírus (Togaviridae)**, transmitida por ***Aedes aegypti* e *albopictus***, com **febre súbita acima de 38,5 °C e artralgia ou artrite intensa de início agudo** (caso suspeito), **poliarticular e simétrica**, com **edema de mãos e pés, exantema que surge do 2º ao 5º dia da febre**, **linfopenia** como achado mais comum e viremia de até **8 dias**; a **mialgia** é mais frequente na dengue e a **artralgia** na chikungunya; as **crianças**, sobretudo lactentes e recém-nascidos, têm formas **atípicas e graves** (encefalite, miocardite, lesões bolhosas), e a **letalidade é baixa**, com óbitos em idosos, comórbidos e recém-nascidos.|q-tp20251-108,q-tp20261-020,q-gdarboviroses-003,q-gdarboviroses-012,q-gdarboviroses-031,q-gdarboviroses-047,q-gdarboviroses-033,q-gdarboviroses-050,q-gdarboviroses-051,q-gdarboviroses-052,q-gdarboviroses-058,q-gdarboviroses-067,q-gdarboviroses-084,q-gdarboviroses-099,q-gdarboviroses-113,q-gdarboviroses-115,q-usp2025-119,q-famerp2022-006,q-unifesp2025-039,q-gdarboviroses-017]] [[Não há antiviral: trata-se com **analgesia e hidratação**, e na fase aguda **evitam-se AAS e AINEs** pela possibilidade de dengue; e a **sorologia negativa nos primeiros 5 dias não exclui** a doença.|q-gdarboviroses-053,q-gdarboviroses-116,q-gdarboviroses-111]]`,
          texto: `- Mulher com febre, poliartralgia e linfopenia, leucopenia: **chikungunya; notificar em 24 horas**. {q-famerp2022-006}
- Poliartralgia migratória há 10 dias após viagem: **ceftriaxona** (a prova). {q-unifesp2025-039}
- Letalidade **baixa**; óbitos em idosos, comórbidos e recém-nascidos. {q-usp2025-119}
- Caso suspeito: **febre súbita acima de 38,5 °C e artralgia ou artrite intensa**, em área de transmissão. {q-tp20251-108,q-tp20261-020}
- Chikungunya: **alphavírus**, dor articular forte, **pode cronificar**. {q-gdarboviroses-003}
- Adolescente com exantema e dor intensa em mãos e pés: **chikungunya**. {q-gdarboviroses-012}
- Transmitida por *Aedes aegypti* e *albopictus*; circulação no Brasil desde 2014. {q-gdarboviroses-017}
- Acampamento, edema de mãos e pés: **chikungunya e evolução para cronicidade**. {q-gdarboviroses-031}
- Febre e artralgia simétrica com edema e exantema no 2º/3º dia: **chikungunya ou dengue; NS1**. {q-gdarboviroses-033}
- Mulher com poliartralgia intensa e exantema desde o 2º dia: **chikungunya**. {q-gdarboviroses-047}
- Dor retro-ocular, **conjuntivite sem secreção**, faringite, náusea: o item "conjuntivite com secreção" é errado. {q-gdarboviroses-050}
- Exantema do **2º ao 5º dia do início da febre** (não após o fim). {q-gdarboviroses-051}
- A dor é **poliarticular e simétrica** (monoarticular é errado). {q-gdarboviroses-052}
- AINEs e AAS **devem ser evitados** na fase aguda. {q-gdarboviroses-053,q-gdarboviroses-116}
- Achado laboratorial mais comum: **linfopenia**. {q-gdarboviroses-058}
- Viremia por até **8 dias** (2 a 5 dias é errado). {q-gdarboviroses-067}
- Lactentes e recém-nascidos: **formas graves** (encefalite, miocardite, bolhas). {q-gdarboviroses-084}
- Febre baixa, exantema pruriginoso, artralgia leve e olhos vermelhos na criança: é **Zika**, não dengue. {q-gdarboviroses-099}
- Doença febril com dor articular, por *Aedes aegypti* e *albopictus*: **chikungunya**. {q-gdarboviroses-113}
- Hemorragias graves são **menos** frequentes que na dengue. {q-gdarboviroses-115}
- Sorologia negativa até o 5º dia **não descarta**. {q-gdarboviroses-111}` },
        { id: "chik-cronica", titulo: "Chikungunya: fases subaguda e crônica", conferir: true, diretrizes: ["chik-manejo-ms"],
          questoes: ["q-gdarboviroses-023","q-gdarboviroses-042","q-gdarboviroses-043","q-gdarboviroses-083","q-gdarboviroses-110"],
          prosa: `[[Na **fase subaguda** (do 15º dia até 3 meses) a **febre some e a dor articular persiste**; passados **3 meses**, a **fase crônica** é o acometimento das **mesmas articulações** da fase aguda, com dor com ou sem edema, limitação e deformidade, **sem eritema**; e **cronifica mais** em quem tem **mais de 45 anos, é mulher, tem lesão articular prévia ou teve dor muito intensa na fase aguda** (o corte de 65 anos é o item inadequado).|q-gdarboviroses-083,q-gdarboviroses-043,q-gdarboviroses-110,q-gdarboviroses-023,q-gdarboviroses-042]]`,
          texto: `- A artrite viral aguda que mais cronifica em mulheres acima de 45 anos: **chikungunya**. {q-gdarboviroses-023}
- Fator inadequado: **idade acima de 65 anos** (o corte é 45). {q-gdarboviroses-042}
- Fase crônica: **mesmas articulações**, sem eritema. {q-gdarboviroses-043,q-gdarboviroses-110}
- Fase subaguda: **dor articular persiste e a febre desaparece**. {q-gdarboviroses-083}` },
        { id: "zika", titulo: "Zika: quadro, gestação e transmissão sexual", conferir: true, diretrizes: ["zika-ms"],
          questoes: ["q-inf-24","q-gdarboviroses-029","q-gdarboviroses-034","q-gdarboviroses-035","q-gdarboviroses-049","q-gdarboviroses-056","q-gdarboviroses-059","q-gdarboviroses-060","q-gdarboviroses-061","q-gdarboviroses-062","q-gdarboviroses-063","q-gdarboviroses-070","q-gdarboviroses-077","q-gdarboviroses-081","q-gdarboviroses-082","q-gdarboviroses-087","q-gdarboviroses-088","q-gdarboviroses-090","q-gdarboviroses-092","q-gdarboviroses-093","q-gdarboviroses-095","q-gdarboviroses-096","q-gdarboviroses-100","q-gdarboviroses-101","q-gdarboviroses-107"],
          prosa: `[[A Zika dá **febre baixa (abaixo de 38,5 °C) ou ausente, exantema maculopapular pruriginoso precoce (1º ou 2º dia), conjuntivite não purulenta em 50 a 90 % dos casos, artralgia leve com edema de pequenas articulações**; o **exantema** é o achado mais frequente; a incubação é curta (de 3 a 14 dias) e há **transmissão autóctone no Brasil desde 2015**.|q-gdarboviroses-034,q-gdarboviroses-035,q-gdarboviroses-070,q-gdarboviroses-087,q-gdarboviroses-090,q-gdarboviroses-100,q-gdarboviroses-061,q-gdarboviroses-056,q-gdarboviroses-096,q-gdarboviroses-093,q-inf-24]] [[Na **gestação**, a infecção causa **síndrome congênita (microcefalia e alterações cerebrais)**; transmite-se também por **via sexual** (o RNA persiste no sêmen), por **transfusão e vertical**, **não por beijo**, e **não contraindica o aleitamento**; o homem infectado espera **3 meses** e a mulher **2 meses** antes da concepção; e a Zika se associa à **síndrome de Guillain-Barré**.|q-gdarboviroses-101,q-gdarboviroses-107,q-gdarboviroses-063,q-gdarboviroses-095,q-gdarboviroses-059,q-gdarboviroses-077,q-gdarboviroses-049,q-gdarboviroses-060,q-gdarboviroses-082,q-gdarboviroses-081,q-gdarboviroses-092,q-gdarboviroses-062,q-gdarboviroses-029,q-gdarboviroses-088]]`,
          texto: `- Febre baixa, exantema pruriginoso, conjuntivite e artralgia leve: **Zika; risco de síndrome congênita com microcefalia**. {q-inf-24}
- Gestante de 16 semanas com exantema pruriginoso e hiperemia conjuntival: **PCR para Zika e dengue** e retorno diário. {q-gdarboviroses-029}
- Zika: **febre baixa ou ausente, exantema, hiperemia conjuntival**. {q-gdarboviroses-034}
- **Conjuntivite em 50 a 90 %, rash no 1º ou 2º dia e edema articular leve**. {q-gdarboviroses-035}
- Quando o **homem** foi infectado, espera de **3 meses** (2 meses é incorreto). {q-gdarboviroses-049}
- Incubação curta (3 a 14 dias). {q-gdarboviroses-056}
- Marido com Zika e gestante de 12 semanas: **sexo só com preservativo**. {q-gdarboviroses-059}
- Zika também se transmite por via **sexual e vertical**. {q-gdarboviroses-060,q-gdarboviroses-063}
- O achado mais frequente é o **exantema**. {q-gdarboviroses-061}
- Gestante de 20 semanas com febre alta, artralgia intensa e olhos vermelhos: **chikungunya**. {q-gdarboviroses-062}
- Febre baixa, exantema craniocaudal pruriginoso, artralgia com edema: **Zika vírus**. {q-gdarboviroses-070}
- Não transmite: **beijo**. {q-gdarboviroses-077}
- Zika: associação com **Guillain-Barré**; *Aedes* não é a única via (sexual, vertical) e **não há vacina**. {q-gdarboviroses-081}
- A infecção materna **não contraindica o aleitamento**. {q-gdarboviroses-082}
- Gestante com febre baixa de 37,5 °C, exantema pruriginoso e conjuntivite não purulenta: **Zika**. {q-gdarboviroses-087}
- Exantema, febre, hiperemia, poliartralgia e edema: **notificar** (compulsória). {q-gdarboviroses-088}
- Exantema pruriginoso após viagem ao Pará: **Zika**. {q-gdarboviroses-090}
- **Guillain-Barré** pode surgir cerca de uma semana depois. {q-gdarboviroses-092}
- Exantema, artralgia, linfadenopatia, cefaleia: quadro clínico da Zika. {q-gdarboviroses-093}
- Paciente sexualmente ativo deve usar **preservativo**. {q-gdarboviroses-095}
- Há **transmissão autóctone** no Brasil. {q-gdarboviroses-096}
- Febre intermitente, exantema pruriginoso e hiperemia conjuntival. {q-gdarboviroses-100}
- A infecção na gestação pode causar **microcefalia** e alterações do sistema nervoso. {q-gdarboviroses-101}
- **Hidrocefalia fetal** não é a associação citada (a afirmação é a incorreta). {q-gdarboviroses-107}` },
        { id: "arbo-diferencial", titulo: "Diferencial entre dengue, chikungunya e Zika", conferir: true, diretrizes: ["dengue-manejo-ms","chik-manejo-ms","zika-ms"],
          questoes: ["q-gdarboviroses-015","q-gdarboviroses-021","q-gdarboviroses-030","q-gdarboviroses-032","q-gdarboviroses-066","q-simepm89-083"],
          prosa: `[[O **exantema** é frequente nas três; a **febre** da dengue é mais alta que a da Zika, e o exantema da dengue é **mais tardio** (a partir do 4º dia), enquanto o da Zika é precoce e pruriginoso; a **plaquetopenia e a hemoconcentração** são mais frequentes e intensas na **dengue**; **mialgia** predomina na dengue e **artralgia** na chikungunya; e **conjuntivite com exantema pruriginoso** é o que caracteriza a Zika.|q-gdarboviroses-021,q-gdarboviroses-032,q-gdarboviroses-030,q-gdarboviroses-066,q-simepm89-083,q-gdarboviroses-015]]`,
          texto: `- Síndromes exantemática febril, de choque, hemorrágica febril e de artrite têm **agentes distintos**. {q-gdarboviroses-015}
- O **exantema** é de alta prevalência nas arboviroses. {q-gdarboviroses-021}
- **Plaquetopenia** é mais frequente na dengue. {q-gdarboviroses-030}
- Febre mais alta e exantema mais tardio na **dengue** que na Zika. {q-gdarboviroses-032}
- **Mialgia** é mais frequente na dengue e **artralgia** na chikungunya. {q-gdarboviroses-066}
- **Conjuntivite e exantema pruriginoso** caracterizam a Zika. {q-simepm89-083}` },
      ],
    },
    {
      id: "febre-amarela", titulo: "Febre amarela",
      introducao: `A **febre amarela** é um flavivírus de **ciclo silvestre** (mosquitos *Haemagogus* e *Sabethes* e **primatas**, que amplificam o vírus) e de **ciclo urbano** (*Aedes aegypti*); [[a **doença é bifásica**: um período de infecção com febre e depois, em parte dos casos, a **fase tóxica com icterícia, hemorragia e insuficiência renal**, e a **vacina** (vírus vivo atenuado, **dose única, 10 dias antes** da viagem) é a prevenção.|q-gdsfiha-022,q-gdsfiha-012,q-gdsfiha-020,q-gdsfiha-017]]`,
      fragmentos: [
        { id: "fa-clinica", titulo: "Ciclo, quadro clínico e vacina", conferir: true, diretrizes: ["fa-ms"],
          questoes: ["q-usprp2024-014","q-gdsfiha-001","q-gdsfiha-002","q-gdsfiha-003","q-gdsfiha-004","q-gdsfiha-007","q-gdsfiha-008","q-gdsfiha-009","q-gdsfiha-012","q-gdsfiha-014","q-gdarboviroses-046","q-gdsfiha-015","q-gdsfiha-016","q-gdsfiha-017","q-gdsfiha-020","q-gdsfiha-021","q-gdsfiha-022","q-gdsfiha-024"],
          prosa: `[[Os **mosquitos são os verdadeiros reservatórios**: uma vez infectados ficam infectantes **a vida toda** e podem passar o vírus aos ovos; o **ciclo silvestre** usa *Haemagogus* e *Sabethes* e **macacos como amplificadores**, e o homem é hospedeiro acidental; o aumento de **casos e de mortes de macacos** perto das cidades alerta para a **reurbanização**, e **baixa cobertura vacinal** favorece surtos.|q-gdsfiha-015,q-gdsfiha-017,q-usprp2024-014,q-gdsfiha-008,q-gdsfiha-014,q-gdarboviroses-046]] [[A **incubação** é de **3 a 6 dias**; a forma leve e moderada dura 2 a 4 dias, e na **forma moderada** há febre, cefaleia, náuseas, vômitos, icterícia e **sinal de Faget** (pulso lento com febre alta); a **forma grave**, de **febre hemorrágica com necrose hepática, icterícia, vômito negro, anúria e delirium**, vem **depois de breve remissão**, com **leucopenia e transaminases altas**, e se diferencia da **síndrome de Weil**; e a evolução é **bifásica**.|q-gdsfiha-004,q-gdsfiha-016,q-gdsfiha-021,q-gdsfiha-002,q-gdsfiha-022,q-gdsfiha-003,q-gdsfiha-012,q-gdsfiha-007,q-gdsfiha-024]] [[A **vacina** é de vírus vivo: **uma dose, ao menos 10 dias antes da viagem**; o calendário de 2020 trazia **reforço aos 4 anos**; no **HIV**, vacina-se com **CD4 acima de 350** (a prova), mas **não** quem usa imunobiológico (imunossupressão), e a gestante só com risco epidemiológico.|q-gdsfiha-020,q-gdsfiha-001,q-gdsfiha-009]]`,
          texto: `- Febre amarela urbana: aumento de casos e **epizootias** perto das cidades indica o risco de **reurbanização**. {q-usprp2024-014}
- Calendário de 2020: **reforço aos 4 anos de idade**. {q-gdsfiha-001}
- **Leucopenia e transaminases elevadas** são frequentes. {q-gdsfiha-002}
- Trilhas em mata e cachoeira, febre há 5 dias: **febre amarela**. {q-gdsfiha-003}
- Incubação de **3 a 6 dias**. {q-gdsfiha-004}
- A forma grave se confunde com a **síndrome de Weil**. {q-gdsfiha-007}
- Surtos: **baixa cobertura vacinal** onde circula o vírus. {q-gdsfiha-008}
- Vacinar **apenas o paciente com Aids e CD4 acima de 350**; não a idosa com imunobiológico. {q-gdsfiha-009}
- Remissão seguida de **agravamento** é possível (a afirmação contrária é a inadequada). {q-gdsfiha-012}
- Flavivírus de viagem ao Espírito Santo: **dengue, Zika, febre amarela**. {q-gdsfiha-014,q-gdarboviroses-046}
- Os mosquitos são os **verdadeiros reservatórios** (chamá-los de falsos é o erro). {q-gdsfiha-015}
- Forma moderada: febre, cefaleia, vômitos, icterícia e **sinal de Faget**. {q-gdsfiha-016}
- Vetores do ciclo silvestre: ***Haemagogus* e *Sabethes***. {q-gdsfiha-017}
- Dose **ao menos 10 dias antes** da viagem. {q-gdsfiha-020}
- Febre hemorrágica com necrose hepática e vômito negro: **febre amarela**. {q-gdsfiha-021}
- Doença bifásica, com pulso lento e febre alta: **febre amarela**. {q-gdsfiha-022}
- "Acessos irregulares de febre, perda de peso e baço aumentado" **não** é febre amarela (é doença crônica). {q-gdsfiha-024}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual (textos de 2016 e normas que mudaram). Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-gdarboviroses-026","q-gdarboviroses-085","q-amrigs2022-072","q-gdarboviroses-007","q-gdarboviroses-080","q-gdarboviroses-072","q-gdarboviroses-049","q-famerp2025-056","q-gdarboviroses-064","q-adap25-039","q-gdarboviroses-008"],
          prosa: `[[**Caso suspeito na criança**: a regra é febre de **até 7 dias** com ao menos 2 sintomas; a prova cobrou "entre **2 e 5 dias**" (gdarboviroses-026) e "entre 2 e 7 dias" (AMRIGS 2022).|q-gdarboviroses-026,q-gdarboviroses-085,q-amrigs2022-072]] [[**Prova do laço**: o manguito vai à **pressão média**, e a prova cobrou o ponto de corte de **mais de 20 petéquias em adultos e mais de 10 em crianças** (gdarboviroses-007), de **20 ou mais** (gdarboviroses-072) e o manguito até a **sistólica** (gdarboviroses-080, dado como a afirmativa errada).|q-gdarboviroses-007,q-gdarboviroses-072,q-gdarboviroses-080]] [[**Hidratação no grupo C**: a regra é **10 mL/kg na primeira hora**; a prova (Famerp 2025) cobrou **20 mL/kg em 2 horas** como fase de expansão (adap25-039 deu 10 mL/kg).|q-famerp2025-056,q-adap25-039]] [[**Zika e concepção**: a espera é de **3 meses se o homem** foi infectado, e a prova (gdarboviroses-049) deu **2 meses** como a afirmativa incorreta; **incubação da dengue**: a prova deu **7 a 10 dias**, e o grupo B inclui **petéquias**, e não a prova do laço negativa.|q-gdarboviroses-049,q-gdarboviroses-064,q-gdarboviroses-008]]`,
          texto: `- Regra: febre de até 7 dias; a prova deu 2 a 5 dias na criança. {q-gdarboviroses-026,q-gdarboviroses-085,q-amrigs2022-072}
- Regra: prova do laço com pressão média; cortes diferentes entre provas. {q-gdarboviroses-007,q-gdarboviroses-072,q-gdarboviroses-080}
- Regra: grupo C com 10 mL/kg na 1ª hora; a prova deu 20 mL/kg em 2 horas. {q-famerp2025-056,q-adap25-039}
- Regra: espera de 3 meses se o homem foi infectado pelo Zika. {q-gdarboviroses-049}
- Incubação da dengue de 3 a 15 dias; a prova deu 7 a 10. {q-gdarboviroses-064}
- Grupo B inclui petéquias. {q-gdarboviroses-008}` },
      ],
    },
  ],
});
