/* resumos/complicacoes-anestesicas/resumo.js — resumo adaptativo de complicações anestésicas
   (ass-anestesio-complicacoes): hipertermia maligna, hiperpotassemia por succinilcolina, anafilaxia
   perioperatória, capnografia e emergências respiratórias (broncoespasmo, hipotensão, pneumotórax),
   náusea e vômito pós-operatório, farmacocinética do propofol e sedação, despertar intraoperatório,
   vasoplegia, toxicidade dos anestésicos locais e emulsão lipídica, cefaleia pós-raqui, depressão
   respiratória por morfina intratecal, bloqueio neuraxial e anticoagulante, fitoterápicos; armadilhas.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- complicacoes-anestesicas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "complicacoes-anestesicas",
  titulo: "Complicações anestésicas",
  assunto: "ass-anestesio-complicacoes",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "asra", texto: "ASRA — Local Anesthetic Systemic Toxicity (2020) e Regional anesthesia in the patient receiving antithrombotic therapy (5ª ed., 2025)", lidoEm: null },
    { id: "nvpo", texto: "Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting (2020)", lidoEm: null },
    { id: "mhaus", texto: "MHAUS/EMHG — tratamento da hipertermia maligna; diretrizes de anafilaxia perioperatória (2019/2021)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "geral", titulo: "Anestesia geral: emergências e efeitos",
      introducao: `[[A anestesia geral tira do paciente as defesas que ele usaria para avisar que algo vai mal. Por isso o anestesista lê o corpo pelos monitores: a **capnografia** (CO2 expirado), a pressão de via aérea, a temperatura e a pressão arterial contam o que está acontecendo antes da parada.|q-adap24-001,q-unifesp2024-002,q-amrigs2024-070]]

Veja também: **Cuidados perioperatórios**, **Anafilaxia**, **Ventilação mecânica** e **Hidroeletrolítico** (hiperpotassemia).`,
      fragmentos: [
        { id: "ger-hipertermia", titulo: "Hipertermia maligna", conferir: true, diretrizes: ["mhaus"],
          questoes: ["q-amrigs2024-070","q-unifesp2022-001"],
          prosa: `[[Em quem tem mutação do receptor de rianodina, **anestésicos inalatórios** e **succinilcolina** liberam cálcio sem controle no músculo: contração contínua, consumo enorme de oxigênio, **hipercarbia** (primeiro sinal), taquicardia, **rigidez**, **hipertermia** e rabdomiólise. O antídoto é o **dantrolene**, que bloqueia a saída de cálcio, com suspensão do gatilho e resfriamento.|q-amrigs2024-070,q-unifesp2022-001]] [[Depois do dantrolene, tratam-se as consequências: **hiperpotassemia e acidose** (bicarbonato, insulina com glicose) e **rabdomiólise** (soro e diurese com furosemida).|q-unifesp2022-001]]`,
          texto: `- Hipercarbia + rigidez + hipertermia após inalatório/succinilcolina: **hipertermia maligna → dantrolene**. {q-amrigs2024-070,q-unifesp2022-001}
- Depois: **tratar hiperpotassemia, acidose e rabdomiólise**. {q-unifesp2022-001}` },
        { id: "ger-succinilcolina", titulo: "Succinilcolina e hiperpotassemia", conferir: true,
          questoes: ["q-usp2024-066"],
          prosa: `[[Depois de alguns dias de **desnervação** (lesão medular, AVC), queimadura extensa ou imobilização, o músculo espalha receptores de acetilcolina por toda a membrana. A **succinilcolina** abre todos eles e o potássio sai em massa: **hiperpotassemia** com arritmia e **assistolia** logo após a intubação.|q-usp2024-066]]`,
          texto: `- Tetraplégico há dias + succinilcolina: **hiperpotassemia → assistolia**. {q-usp2024-066}` },
        { id: "ger-anafilaxia", titulo: "Anafilaxia perioperatória", conferir: true, diretrizes: ["mhaus"],
          questoes: ["q-adap22-006"],
          prosa: `[[Minutos depois da indução (bloqueador neuromuscular, antibiótico, látex), **eritema, urticária, broncoespasmo e hipotensão**: anafilaxia. A conduta é **adrenalina intravenosa em bolus pequenos (50 a 100 mcg)**, tituladas, com cristaloide, oxigênio a 100% e suspensão dos suspeitos; corticoide e anti-histamínico são complementos.|q-adap22-006]]`,
          texto: `- Anafilaxia na indução: **adrenalina IV 50–100 mcg**, volume, O2. {q-adap22-006}` },
        { id: "ger-capnografia", titulo: "Capnografia e pressão de via aérea", conferir: true,
          figuras: [{ arquivo: "figuras/capnografia.svg", legenda: "Esquema autoral: padrões da curva de CO2 expirado e o que significam." }],
          casos: ["q-adap24-001"],
          questoes: ["q-adap24-001","q-unifesp2024-002","q-sirio2026-032"],
          prosa: `[[A curva normal tem platô retangular. Curva com subida lenta, em "barbatana de tubarão", com **pressão de pico alta e sibilos**, é **broncoespasmo** (resistência aumentada na via aérea).|q-adap24-001]] [[**Queda progressiva do CO2 expirado com curva de forma normal** significa que menos sangue chega ao pulmão para trazer CO2: **queda do débito cardíaco ou da pressão arterial**.|q-unifesp2024-002]] [[Queda súbita da saturação, **pressão de pico que sobe**, queda do débito e expansão assimétrica do tórax: **pneumotórax hipertensivo** → descompressão com agulha e dreno.|q-sirio2026-032]]`,
          texto: `- Barbatana + pico alto + sibilos: **broncoespasmo**. {q-adap24-001}
- EtCO2 caindo com curva normal: **hipotensão/baixo débito**. {q-unifesp2024-002}
- Pico alto + hipoxemia + choque: **pneumotórax hipertensivo**. {q-sirio2026-032}` },
        { id: "ger-nvpo", titulo: "Náusea e vômito pós-operatório", conferir: true, diretrizes: ["nvpo"],
          questoes: ["q-adap25-001","q-unifesp2025-001"],
          prosa: `[[O risco de náusea e vômito sobe em **mulheres**, **não fumantes**, com **cinetose** ou episódio prévio e com **opioide** no pós-operatório. Com risco alto: **anestesia venosa total com propofol** (sem inalatório nem óxido nitroso, que provocam vômito) e **profilaxia com dois ou mais antieméticos** (dexametasona na indução e ondansetron no fim).|q-adap25-001,q-unifesp2025-001]]`,
          texto: `- Risco alto de NVPO: **propofol venoso total + dexametasona + ondansetron**. {q-adap25-001,q-unifesp2025-001}` },
        { id: "ger-farmaco", titulo: "Propofol, sedação e despertar", conferir: true,
          questoes: ["q-tp20252-039","q-unifesp2024-042","q-famema2025-017"],
          prosa: `[[O **propofol** é lipossolúvel: no **obeso**, dose calculada pelo peso total enche o **tecido adiposo**, que devolve a droga devagar e **atrasa o despertar**.|q-tp20252-039]] [[Para sedar até a manhã seguinte um paciente neurocirúrgico que precisará ser avaliado, usa-se **propofol e fentanil**, de ação curta, que deixam acordar rápido para o exame neurológico.|q-unifesp2024-042]] [[O **despertar intraoperatório** (consciência durante a anestesia geral) é raro, mas pode deixar **sequelas psicológicas** importantes; o relato do paciente deve ser acolhido e registrado.|q-famema2025-017]]`,
          texto: `- Obeso com propofol pelo peso total: **reservatório na gordura**, despertar lento. {q-tp20252-039}
- Sedação neurológica reavaliável: **propofol + fentanil**. {q-unifesp2024-042}
- Despertar intraoperatório: raro, **sequela psicológica**. {q-famema2025-017}` },
        { id: "ger-vasoplegia", titulo: "Vasoplegia depois da circulação extracorpórea", conferir: true,
          questoes: ["q-unifesp2022-006"],
          prosa: `[[Depois de cirurgia cardíaca com circulação extracorpórea, a inflamação dilata os vasos: **hipotensão com débito cardíaco normal ou alto e resistência vascular baixa**, sem tamponamento nem hipovolemia. É a **vasoplegia**, tratada com **noradrenalina**.|q-unifesp2022-006]]`,
          texto: `- Hipotensão com débito normal após CEC: **vasoplegia → noradrenalina**. {q-unifesp2022-006}` },
      ],
    },
    {
      id: "regional", titulo: "Anestesia local e regional",
      introducao: `[[O anestésico local bloqueia canais de sódio do nervo; quando chega em excesso ao sangue (dose alta, injeção num vaso), bloqueia os canais do **cérebro** e do **coração**. Nos bloqueios do neuroeixo, a agulha atravessa a dura-máter, e o furo deixa vazar líquor; e o espaço peridural sangra fácil em quem está anticoagulado.|q-adap22-001,q-tp20231-077,q-tp20202-077]]`,
      fragmentos: [
        { id: "reg-toxicidade", titulo: "Intoxicação por anestésico local", conferir: true, diretrizes: ["asra"],
          questoes: ["q-adap22-001","q-tp20212-063","q-tp20231-077","q-einstein2026-030"],
          prosa: `[[A intoxicação começa no **cérebro**: gosto metálico, zumbido, formigamento na boca, **confusão e convulsão**; depois o **coração** (arritmia, colapso). Muitas suturas com lidocaína sem vasoconstritor somam dose tóxica.|q-tp20212-063,q-tp20231-077]] [[Primeiro **oxigenar e ventilar** (a hipóxia e a acidose pioram a toxicidade); na toxicidade grave, sobretudo por **bupivacaína**, **emulsão lipídica a 20%** (1,5 mL/kg em bolus e infusão), que captura a droga, junto com o suporte de vida.|q-tp20231-077,q-adap22-001]] [[A **adrenalina** com lidocaína prolonga o efeito e reduz o sangramento, mas deve ser evitada em áreas de **circulação terminal** com risco de isquemia (dedos, pênis).|q-einstein2026-030]]`,
          texto: `- Muitas suturas, confusão e convulsão: **sobredose de anestésico local**. {q-tp20212-063,q-tp20231-077}
- **Oxigenar e ventilar**; grave: **emulsão lipídica 20%**. {q-tp20231-077,q-adap22-001}
- Adrenalina: evitar em **circulação terminal**. {q-einstein2026-030}` },
        { id: "reg-cefaleia", titulo: "Cefaleia pós-punção", conferir: true,
          questoes: ["q-tp20202-077","q-tp20232-076","q-tp20241-075","q-unifesp2022-002"],
          prosa: `[[O furo na dura deixa vazar líquor; o cérebro desce e estira as meninges quando a pessoa **fica em pé**: **cefaleia postural** frontal e occipital, que **melhora deitado**, um a três dias depois da raqui.|q-tp20202-077,q-tp20232-076,q-tp20241-075]] [[A maioria cede em dias com **repouso, hidratação, analgésicos e cafeína**; o **tampão sanguíneo peridural** fica para a dor forte que não cede. Náusea e prurido no mesmo paciente vêm da **morfina** intratecal.|q-tp20241-075,q-tp20232-076,q-unifesp2022-002]]`,
          texto: `- Cefaleia que piora em pé após raqui: **pós-punção**. {q-tp20202-077,q-tp20232-076,q-tp20241-075}
- **Repouso, hidratação, analgésico, cafeína**; tampão se refratária. {q-tp20241-075,q-tp20232-076,q-unifesp2022-002}` },
        { id: "reg-morfina", titulo: "Morfina intratecal e depressão respiratória", conferir: true,
          questoes: ["q-adap22-002"],
          prosa: `[[A **morfina** intratecal é hidrossolúvel e sobe devagar pelo líquor até o tronco: a **depressão respiratória é tardia** (6 a 12 horas ou mais). Sonolência com bradipneia na enfermaria: **naloxona em doses pequenas e tituladas** e monitorização contínua, porque a morfina dura mais que a naloxona.|q-adap22-002]]`,
          texto: `- Bradipneia horas após morfina intratecal: **naloxona titulada** e monitorar 24 h. {q-adap22-002}` },
        { id: "reg-anticoagulacao", titulo: "Bloqueio do neuroeixo e anticoagulante", conferir: true, diretrizes: ["asra"],
          questoes: ["q-unifesp2024-057"],
          prosa: `[[Com **enoxaparina profilática** (40 mg/dia), o bloqueio do neuroeixo é seguro depois de **12 horas** da última dose (24 horas na dose plena), pelo risco de hematoma espinhal. Gestante com última dose há 14 horas e cesárea de urgência: **raquianestesia** (punção única, rápida); evita-se o cateter peridural.|q-unifesp2024-057]]`,
          texto: `- Enoxaparina profilática há > 12 h: **raquianestesia** possível. {q-unifesp2024-057}` },
      ],
    },
    {
      id: "preop", titulo: "Avaliação pré-anestésica",
      introducao: `[[A avaliação pré-anestésica pergunta pelo que o paciente toma por conta própria, inclusive fitoterápicos, que mexem na coagulação, na glicemia e na anestesia.|q-fmabc2024-028]]`,
      fragmentos: [
        { id: "pre-fitoterapicos", titulo: "Fitoterápicos", conferir: true,
          questoes: ["q-fmabc2024-028"],
          prosa: `[[O **ginkgo biloba** inibe o fator de ativação plaquetária e aumenta o sangramento; suspende-se ao menos **36 horas** antes. Ginseng, alho e erva-de-são-joão também interferem (sangramento, glicemia, metabolismo de remédios).|q-fmabc2024-028]]`,
          texto: `- **Ginkgo**: antiplaquetário, suspender 36 h antes. {q-fmabc2024-028}` },
      ],
    },
    {
      id: "via-aerea", titulo: "Via aérea e intubação",
      introducao: `[[Intubar um doente grave é o momento mais perigoso do atendimento: o paciente está **hipoxêmico**, muitas vezes **sem jejum**, e os sedativos tiram de uma vez o tônus vascular e o impulso respiratório que o mantinham. As complicações mais frequentes são **aspiração**, **hipotensão**, **hipoxemia** e **intubação esofágica**; quase todo o protocolo existe para evitá-las.|q-einstein2021-020,q-uspsp5-020]]`,
      fragmentos: [
        { id: "va-sequencia", titulo: "Sequência rápida e a escolha das drogas", conferir: true,
          questoes: ["q-usp2022-070","q-einstein2023-022","q-unesp2024-079","q-unicamp2023-018","q-uspsp3-118","q-sessp2025-030","q-usp2022-012","q-unifesp2024-003","q-famema2025-091","q-adap24-002","q-sirio2027-006","q-unifesp2022-003","q-fmabc2023-017","q-fmabc2022-002","q-einstein2021-020","q-uspsp5-020","q-usp2022-013"],
          prosa: `[[**Sequência rápida** é para o **estômago cheio** (abdome obstrutivo, trauma, jejum desconhecido): **pré-oxigenação com O2 a 100%**, hipnótico e bloqueador neuromuscular **em sequência, sem ventilar** com máscara até intubar, e pressão cricoide (**Sellick**) quando se usa. A pressão na cartilagem **tireoide para trás, para cima e para a direita (BURP)** é outra coisa: melhora a **visão das cordas vocais**. O agitado que não deixa pré-oxigenar recebe **sequência atrasada**: cetamina primeiro, oxigênio, depois o bloqueador.|q-usp2022-070,q-einstein2023-022,q-unesp2024-079,q-unicamp2023-018,q-uspsp3-118]] [[Hipnótico conforme a hemodinâmica: **etomidato** (0,3 mg/kg, início em 15–45 s) **não deprime o coração** — cardiopata, politrauma, insuficiência respiratória (pode dar mioclonias); **cetamina** mantém a pressão e **broncodilata** — **asma grave**, sepse com hipotensão (cerca de 1 mg/kg). Bloqueador: **succinilcolina** (1–1,5 mg/kg, rápida e curta) ou **rocurônio**; a succinilcolina **sobe o potássio** e é contraindicada em **hipercalemia, doença renal com potássio alto, miopatias, hipertermia maligna** e queimado/imobilizado depois de 24–48 h.|q-sessp2025-030,q-usp2022-012,q-unifesp2024-003,q-famema2025-091,q-adap24-002,q-sirio2027-006,q-unifesp2022-003,q-fmabc2023-017,q-fmabc2022-002]] [[Depois de intubar, **confirme pela capnografia**: sem curva de CO2, é **intubação esofágica**. O paciente com **acidose metabólica grave** (cetoacidose) depende da hiperventilação para compensar; se o ventilador não repete essa ventilação, o pH despenca e ele para.|q-usp2022-013,q-uspsp5-020,q-einstein2021-020]]`,
          texto: `- Estômago cheio: **O2 100% e sequência rápida** (Sellick). {q-usp2022-070,q-einstein2023-022,q-unesp2024-079}
- BURP: **melhora a visão** das cordas. {q-unicamp2023-018}
- Agitado: **sequência atrasada**. {q-uspsp3-118}
- Trauma/cardiopata: **etomidato + succinilcolina**. {q-sessp2025-030,q-usp2022-012,q-unifesp2024-003,q-famema2025-091}
- Asma grave e sepse hipotensa: **cetamina**. {q-adap24-002,q-sirio2027-006}
- Succinilcolina contraindicada: **hiperK, miopatia, hipertermia maligna**; alternativa rocurônio. {q-unifesp2022-003,q-fmabc2023-017}
- Etomidato: início em **15–45 s**. {q-fmabc2022-002}
- Sem CO2 na capnografia: **esofágica**; cetoacidose intubada: **acidose piora**. {q-usp2022-013,q-uspsp5-020}
- Complicação mais frequente (a prova): **aspiração**. {q-einstein2021-020}` },
        { id: "va-dificil", titulo: "Via aérea difícil e plano de resgate", conferir: true,
          questoes: ["q-tp20252-101","q-tp20261-008","q-unesp2022-080","q-sessp2024-040","q-adap22-003","q-adap24-040"],
          prosa: `[[Via aérea **difícil prevista** (abertura de boca e pescoço limitados, obeso com apneia do sono, massa cervical): **intubação acordado com fibroscópio flexível** e anestesia tópica, mantendo a respiração e os reflexos.|q-tp20252-101,q-tp20261-008,q-unesp2022-080]] [[Não se consegue intubar: **dispositivo supraglótico** (máscara laríngea, combitubo) para oxigenar. **Não intuba e não oxigena**: **cricotireoidostomia cirúrgica** (bisturi, bougie e tubo). Na gestante com plaquetopenia grave, o neuroeixo é proibido (hematoma espinhal): **anestesia geral**.|q-sessp2024-040,q-adap22-003,q-adap24-040]]`,
          texto: `- Difícil prevista: **intubação acordado com fibroscópio**. {q-tp20252-101,q-tp20261-008,q-unesp2022-080}
- Falhou a intubação: **supraglótico**; não oxigena: **cricotireoidostomia**. {q-sessp2024-040,q-adap22-003}
- Plaquetas 48 mil: **geral**, não raqui. {q-adap24-040}` },
      ],
    },
    {
      id: "farmacos-analgesia", titulo: "Anestésicos e analgesia",
      introducao: `[[O anestésico local **bloqueia o canal de sódio** do axônio e impede o potencial de ação. Ele entra no nervo na forma **não ionizada**; no tecido **inflamado ou infectado, o pH é ácido**, mais droga fica ionizada e o bloqueio falha. O propofol age no receptor **GABA-A** (abre o canal de cloreto e hiperpolariza o neurônio); o **sevoflurano** tem **baixa solubilidade no sangue**, por isso indução e despertar rápidos.|q-amrigs2021-031,q-tp20251-079,q-tp20261-071,q-iamspe2025-004,q-fmabc2026-026]]`,
      fragmentos: [
        { id: "an-local", titulo: "Anestesia local: dose e onde usar", conferir: true,
          questoes: ["q-adap23-093","q-unesp2023-072","q-unicampdis2024-079","q-unesp2024-018","q-usp2024-047","q-amrigs2021-036","q-amrigs2021-031","q-tp20251-079","q-tp20261-071","q-unifesp2023-093"],
          prosa: `[[**Lidocaína**: até **4,5 mg/kg sem vasoconstritor** (máximo 300 mg) e **7 mg/kg com** (máximo 500 mg). Para calcular o volume: a solução a **1% tem 10 mg/mL**, a **2%, 20 mg/mL** — 70 kg × 4,5 = 315 mg = cerca de 15 mL a 2%. Em **dedo**, o ensino clássico é **bloqueio troncular sem vasoconstritor**.|q-adap23-093,q-unesp2023-072,q-unicampdis2024-079,q-unesp2024-018,q-usp2024-047,q-amrigs2021-036]] [[No idoso frágil, raquianestesia com **dose baixa de bupivacaína isobárica** (que não migra com a posição) evita a hipotensão.|q-unifesp2023-093]]`,
          texto: `- Lidocaína: **4,5 mg/kg sem**, 7 com vasoconstritor; 2% = 20 mg/mL. {q-adap23-093,q-unesp2023-072,q-unicampdis2024-079}
- Dedo: **troncular sem vasoconstritor**. {q-unesp2024-018,q-usp2024-047,q-amrigs2021-036}
- Ação: **canal de sódio**; falha no **pH ácido** da infecção. {q-amrigs2021-031,q-tp20251-079,q-tp20261-071}
- Idoso: **bupivacaína isobárica em dose baixa**. {q-unifesp2023-093}` },
        { id: "an-analgesia", titulo: "Sedação para procedimento e analgesia pós-operatória", conferir: true,
          questoes: ["q-usprp2022-093","q-unicamp2022-033","q-iamspe2025-004","q-fmabc2026-026","q-amrigs2023-049","q-usprp2021-029","q-einstein2025-030","q-usprp2025-055","q-einstein2026-005","q-adap21-029"],
          prosa: `[[Na criança que precisa de sutura ou redução, a **cetamina** dá **sedação dissociativa** com analgesia, preservando a respiração e os reflexos.|q-usprp2022-093,q-unicamp2022-033]] [[Analgesia pós-operatória é **multimodal**: dipirona ou paracetamol, anti-inflamatório (cetorolaco), cetamina em dose baixa, e **opioide** quando a dor é intensa (a criança com dor forte depois de fratura recebe opioide; o alérgico à dipirona, tramadol). **Dor neuropática** depois de cirurgia (queimação, choque, alodínia) responde a **gabapentina**; o uso crônico de opioide que perdeu efeito sugere tolerância ou hiperalgesia: **reduzir o opioide** e associar gabapentina.|q-amrigs2023-049,q-usprp2021-029,q-einstein2025-030,q-usprp2025-055,q-einstein2026-005]] [[A **cefaleia pós-raqui** é postural (piora sentada, melhora deitada): começa com **repouso, hidratação, analgésicos e cafeína**; persiste → **tampão sanguíneo peridural**.|q-adap21-029]]`,
          texto: `- Sedação na criança: **cetamina**. {q-usprp2022-093,q-unicamp2022-033}
- Propofol: **GABA-A**; sevoflurano: **baixa solubilidade**. {q-iamspe2025-004,q-fmabc2026-026}
- Multimodal; dor intensa: **opioide**. {q-amrigs2023-049,q-usprp2021-029,q-einstein2025-030}
- Dor neuropática pós-op: **gabapentina**; opioide sem efeito: **reduzir**. {q-usprp2025-055,q-einstein2026-005}
- Cefaleia pós-raqui: conservador, **tampão** se persistir. {q-adap21-029}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-adap24-001","q-unifesp2024-002","q-tp20202-077","q-amrigs2024-070"],
          prosa: `[[**O mesmo caso, duas curvas**: na colecistectomia laparoscópica, a curva em barbatana com sibilos é **broncoespasmo** (adap24-001); a queda progressiva com forma normal é **hipotensão** (unifesp2024-002).|q-adap24-001,q-unifesp2024-002]] [[**Tampão sanguíneo na cefaleia pós-raqui**: é eficaz, mas não é a primeira medida; a tp20202-077 cobrou **repouso, hidratação e analgésicos**.|q-tp20202-077]] [[**Gatilho da hipertermia maligna**: inalatórios halogenados e succinilcolina; a amrigs2024-070 citou só a succinilcolina.|q-amrigs2024-070]]`,
          texto: `- Barbatana: **broncoespasmo**; queda com forma normal: **hipotensão**. {q-adap24-001,q-unifesp2024-002}
- Cefaleia pós-raqui: tampão **não** é primeiro. {q-tp20202-077}
- Gatilhos: **inalatórios e succinilcolina**. {q-amrigs2024-070}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: emergências na sala de cirurgia",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-emergencias", titulo: "Sinal, causa e conduta", conferir: true,
          questoes: ["q-unifesp2022-001","q-adap22-006","q-adap22-001","q-usp2024-066"],
          prosa: `[[O primeiro sinal aponta a emergência.|q-unifesp2022-001,q-adap22-006,q-adap22-001,q-usp2024-066]]

| Emergência | Primeiro sinal | Causa | Conduta |
|---|---|---|---|
| Hipertermia maligna | CO2 subindo, rigidez | inalatório, succinilcolina | dantrolene, parar o gatilho, resfriar |
| Anafilaxia | urticária, broncoespasmo, hipotensão | bloqueador, antibiótico, látex | adrenalina IV titulada |
| Toxicidade de anestésico local | gosto metálico, convulsão, arritmia | dose alta, injeção no vaso | ventilar; emulsão lipídica |
| Hiperpotassemia por succinilcolina | arritmia, assistolia | desnervação, queimado, imóvel | cálcio, insulina; evitar succinilcolina |`,
          texto: `- Hipertermia: **dantrolene**. {q-unifesp2022-001}
- Anafilaxia: **adrenalina**. {q-adap22-006}
- Anestésico local: **lipídio**. {q-adap22-001}
- Succinilcolina: **potássio**. {q-usp2024-066}` },
      ],
    },
  ],
});
