/* resumos/exantematicas/resumo.js — resumo adaptativo de doenças exantemáticas.
   Cada fragmento lista as questões de dados/ que ele ajuda a responder: é por elas
   que o visualizador mede o erro do aluno e decide o destaque (resumos/LEIA-ME.md).
   introducao (capítulo) e prosa (seção) são o texto de livro: parágrafos separados
   por linha em branco; [[frase|q-a,q-b]] marca a frase que justifica um ponto-chave
   (sublinhada quando o aluno erra aquelas questões; o ponto-chave leva até ela). texto = pontos-chave: "- " vira tópico, **x** vira destaque, {q-a,q-b} no fim do tópico liga aquele tópico às questões
   (o visualizador fragmenta o trecho tópico a tópico quando o aluno erra ali). Conferência: npm run resumo -- exantematicas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "exantematicas",
  titulo: "Doenças exantemáticas na infância",
  assunto: "ass-exantematicas",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "ms-guia-vigilancia", texto: "Ministério da Saúde — Guia de Vigilância em Saúde (sarampo, rubéola, varicela)", lidoEm: null },
    { id: "aha-kawasaki", texto: "American Heart Association — Diagnosis and Management of Kawasaki Disease (2024)", lidoEm: null },
    { id: "calendario-vacinal", texto: "SBP / Calendário Nacional de Vacinação (PNI)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Coqueluche: está no mesmo assunto da taxonomia, mas não é exantemática — está no resumo pneumonia-bronquiolite",
      questoes: ["q-tp20252-069","q-unesp2025-014","q-unicampdis2023-030","q-unicampdis2024-096","q-uspsp1-006","q-fmabc2024-055","q-einstein2027-039"] },
  ],
  doencas: [
    {
      id: "raciocinio", titulo: "Como raciocinar diante de febre + exantema",
      introducao: `Exantema é a erupção cutânea difusa que acompanha uma doença sistêmica. Ele não é uma doença em si: é a pele mostrando o que acontece no resto do corpo. Por trás de um exantema há quatro mecanismos. O primeiro é o **dano direto do vírus** ao endotélio e à epiderme, como nas vesículas da varicela e dos enterovírus. O segundo é a **resposta imune** contra as células infectadas, como no sarampo e no eritema infeccioso. O terceiro são as **toxinas bacterianas** que dilatam os capilares ou separam camadas da pele, como na escarlatina e na pele escaldada. O quarto é a **vasculite**, como na doença de Kawasaki.

Por isso o tempo importa tanto. Quando o exantema é imunomediado, ele aparece no momento em que o organismo já reage ao agente. Às vezes isso coincide com o fim da febre (exantema súbito), às vezes com o fim da transmissão (parvovírus). Saber o mecanismo de cada doença permite deduzir o quadro, em vez de decorar listas.`,
      fragmentos: [
        { id: "rac-chaves", figuras: [{ arquivo: "figuras/febre-exantema.svg", legenda: "Esquema autoral: a curva da febre e o momento do exantema em três doenças." }], titulo: "As quatro perguntas que separam as doenças", conferir: true,
          questoes: ["q-famema2025-042","q-tp20222-047","q-amrigs2021-070"],
          texto: `- **Qual a relação febre × exantema?** O exantema aparece quando a febre cede: **exantema súbito**. O exantema vem no auge da febre: **sarampo**. Febre há 5 dias ou mais sem foco: pense em **Kawasaki**. {q-amrigs2021-070,q-famema2025-042}
- **Que pródromo veio antes?** Tosse, coriza e conjuntivite: **sarampo**. Dor de garganta: **escarlatina** ou **mononucleose**. Pródromo pobre ou ausente: **rubéola** ou **eritema infeccioso**. {q-tp20222-047,q-famema2025-042}
- **Que cara tem a lesão?** Lesão **áspera em lixa**: escarlatina. Lesões **em vários estágios e pruriginosas**: varicela. **Vesículas em mãos, pés e boca**: enterovírus. Face **esbofeteada** e **rendilhado**: parvovírus B19.
- **Há sinal patognomônico ou de localização?** **Koplik** (sarampo), **adenopatia retroauricular/occipital** (rubéola), **Pastia e Filatov** (escarlatina), **esplenomegalia** (mononucleose). {q-famema2025-042}
- A **faixa etária** ajuda: o exantema súbito aparece **entre 6 meses e 2 anos**, e escarlatina e eritema infeccioso, em pré-escolares e escolares. {q-famema2025-042}` },
      ],
    },
    {
      id: "sarampo", titulo: "Sarampo",
      introducao: `O sarampo é uma das doenças mais contagiosas conhecidas. [[Um caso gera de **12 a 18 casos secundários** numa população suscetível, e o ser humano é o único reservatório.|q-simepm89-061]] Antes da vacinação em massa, o sarampo matava mais de 2 milhões de crianças por ano no mundo. Ainda é causa importante de morte infantil onde a cobertura vacinal é baixa e a desnutrição é comum. O Brasil foi certificado como livre da circulação endêmica em 2016. Perdeu a certificação em 2019, depois de surtos iniciados em 2018 com casos importados, e voltou a ser certificado em 2024. [[A lição é que a eliminação depende de manter a cobertura alta, todos os anos.|q-iamspe2021-072,q-famerp2023-027,q-fmabc2026-089]]

**Fisiopatologia.** O vírus entra pelo trato respiratório e infecta primeiro macrófagos alveolares, células dendríticas e linfócitos que expressam o receptor **CD150 (SLAM)**. Essas células o levam aos linfonodos, onde ele se multiplica e cai na corrente sanguínea. Na segunda viremia, o vírus chega aos epitélios pelo receptor **nectina-4** e volta a sair pelas vias aéreas. É essa fase que produz a tosse, a coriza e a conjuntivite do pródromo e a enorme transmissibilidade. [[O exantema e o Koplik refletem a **resposta das células T** contra o endotélio infectado dos capilares da pele e da mucosa.|q-amrigs2025-014]] Por isso a criança com imunodeficiência celular pode ter sarampo grave **sem exantema**.

Há ainda um efeito que explica boa parte da mortalidade: a **"amnésia imune"**. Como o vírus infecta e destrói linfócitos de memória, a criança perde parte da proteção que já tinha contra outros agentes. [[Fica vulnerável por meses a pneumonias bacterianas, otites e diarreias.|q-einstein2021-021,q-tp20222-047]] A **deficiência de vitamina A**, comum em desnutridos e agravada pelo próprio sarampo, piora a integridade dos epitélios e a resposta imune. [[Isso explica por que a vitamina A reduz a mortalidade.|q-usprp2026-032,q-uspsp4-101,q-amrigs2025-014]]`,
      fragmentos: [
        { id: "sar-agente", titulo: "Agente e transmissão", conferir: true,
          questoes: ["q-amrigs2025-014","q-simepm89-061"],
          texto: `- Vírus RNA do gênero **Morbillivirus** (família Paramyxoviridae). {q-amrigs2025-014}
- Transmissão **respiratória por aerossol**: é das doenças mais contagiosas que existem. Pense em sarampo em quem volta de **área com surto** sem vacina comprovada. {q-simepm89-061}
- Transmite de **4 dias antes a 4 dias depois do início do exantema**.
- Quem elimina o vírus e leva à recuperação é a **resposta imune celular** do hospedeiro. Não há antiviral específico. {q-amrigs2025-014}` },
        { id: "sar-clinica", casos: ["q-usprp2026-032","q-uspsp4-101"], titulo: "Quadro clínico e Koplik",
          prosa: `Depois de 10 a 14 dias de incubação vem o **pródromo**. A febre sobe progressivamente e aparecem tosse seca, coriza e conjuntivite com fotofobia, que refletem a infecção dos epitélios respiratório e conjuntival. [[No fim do pródromo surgem as **manchas de Koplik** na mucosa jugal, que costumam desaparecer quando o exantema se estabelece.|q-iamspe2025-065,q-fmabc2026-089,q-famerp2023-027,q-sirio2022-053,q-unicampdis2025-026,q-famerp2026-009,q-famema2025-042]] O exantema começa na linha do cabelo e atrás das orelhas e desce ao longo de três dias. As lesões confluem nas áreas que apareceram primeiro. [[Ao contrário do exantema súbito, a febre atinge o pico **junto** com o exantema, porque é a fase de maior atividade imune contra o vírus.|q-famerp2023-027,q-famerp2022-014,q-famerp2026-009,q-sirio2022-053,q-fmabc2025-096]]`, conferir: true,
          questoes: ["q-famema2025-042","q-iamspe2025-065","q-fmabc2025-047","q-fmabc2025-096","q-unicampdis2025-026","q-simepm89-061","q-uspsp4-101","q-sirio2022-053","q-famerp2023-027","q-famerp2022-014","q-famerp2026-009","q-fmabc2026-089","q-einstein2025-043","q-tp20222-047"],
          texto: `- **Pródromo de 3 a 5 dias**: febre alta, com os **3 Cs**: **tosse, coriza e conjuntivite** (pode haver fotofobia). {q-famema2025-042,q-fmabc2025-047,q-fmabc2025-096,q-unicampdis2025-026,q-simepm89-061,q-uspsp4-101,q-famerp2022-014,q-famerp2026-009,q-einstein2025-043,q-tp20222-047}
- **Sinal de Koplik**: **pontos branco-azulados sobre halo vermelho na mucosa jugal, na altura dos (pré-)molares**. Aparece **antes do exantema** e é **patognomônico**. {q-iamspe2025-065,q-fmabc2026-089,q-famerp2023-027,q-sirio2022-053,q-unicampdis2025-026,q-famerp2026-009,q-famema2025-042}
- **Exantema morbiliforme**, maculopapular e **confluente**, que começa **atrás das orelhas e na linha do cabelo** e desce em sentido **craniocaudal**. A **febre continua alta** quando o exantema surge. {q-famerp2023-027,q-famerp2022-014,q-famerp2026-009,q-sirio2022-053,q-fmabc2025-096}
- O exantema evolui com **descamação furfurácea** (fina, "em farelo").
- Exantema morbiliforme quer dizer **manchas**, não **equimoses**. {q-fmabc2026-089}` },
        { id: "sar-diag", diretrizes: ["ms-guia-vigilancia"], titulo: "Diagnóstico laboratorial", conferir: true,
          questoes: ["q-uspsp4-101","q-amrigs2025-014"],
          texto: `- **Sorologia IgM** (positiva a partir do exantema) e **RT-PCR** em **secreção nasofaríngea/orofaríngea e urina**. Colha as duas amostras na primeira consulta. {q-uspsp4-101}
- A **IgM marca a infecção primária**: costuma **não aparecer na reexposição nem na revacinação**, quando sobe a IgG. {q-amrigs2025-014}` },
        { id: "sar-compl", casos: ["q-tp20222-047"], titulo: "Complicações",
          prosa: `As complicações seguem a fisiopatologia. [[A lesão do epitélio respiratório e a "amnésia imune" abrem caminho para **pneumonia** viral ou bacteriana e **otite média**.|q-einstein2021-021,q-tp20222-047]] A lesão do epitélio intestinal causa diarreia, que agrava a desnutrição. No sistema nervoso há três quadros diferentes. A **encefalite aguda pós-infecciosa** é imunomediada e surge dias depois do exantema. A **encefalite por corpos de inclusão** ocorre em imunodeprimidos. A **PEES** é uma infecção persistente por vírus mutado, que se manifesta 7 a 10 anos depois e é mais comum quando o sarampo ocorreu antes dos 2 anos.`, conferir: true,
          questoes: ["q-einstein2021-021","q-tp20222-047","q-sirio2022-053"],
          texto: `- A **pneumonia** é a complicação mais frequente e a **principal causa de morte**. Pode ser viral ou bacteriana secundária. {q-einstein2021-021,q-tp20222-047}
- Outras: **otite média aguda**, **diarreia**, laringotraqueobronquite e **encefalite aguda**. {q-einstein2021-021}
- No **imunodeprimido**: **pneumonia de células gigantes** (de Hecht), muitas vezes sem exantema. {q-sirio2022-053}
- Complicação tardia, anos depois: **panencefalite esclerosante subaguda (PEES)**.` },
        { id: "sar-trat", diretrizes: ["ms-guia-vigilancia"], titulo: "Tratamento: suporte + vitamina A", conferir: true,
          questoes: ["q-usprp2026-032","q-amrigs2025-014","q-uspsp4-101"],
          texto: `- O tratamento é **de suporte** (antitérmico, hidratação, nutrição). {q-amrigs2025-014}
- Dê **vitamina A a todo caso suspeito**, em **2 doses** (dia 1 e dia 2), com dose conforme a idade. A vitamina A reduz complicações e mortalidade. {q-usprp2026-032,q-uspsp4-101,q-amrigs2025-014}
- **Antibiótico não trata o sarampo.** Use só se houver **complicação bacteriana**, como pneumonia ou otite. {q-amrigs2025-014}` },
        { id: "sar-vigil", diretrizes: ["ms-guia-vigilancia","calendario-vacinal"], titulo: "Notificação, bloqueio e vacina",
          prosa: `Toda a estratégia de controle parte de dois fatos: o sarampo é muito contagioso e a vacina é muito eficaz. A vacina de vírus vivo atenuado induz imunidade mais rápido que o vírus selvagem. [[Por isso, aplicada até 72 horas após a exposição, ela ainda pode impedir a doença.|q-famerp2026-009,q-famerp2022-014,q-famerp2023-027]] [[Quem não pode receber vírus vivo recebe anticorpos prontos (imunoglobulina) até o 6º dia.|q-famerp2023-027]] [[Por ser tão contagiosa, a doença só deixa de circular quando mais de 95% da população está imune.|q-famerp2023-027,q-iamspe2021-072]]`, conferir: true,
          questoes: ["q-einstein2025-043","q-famerp2026-009","q-famerp2022-014","q-famerp2023-027","q-iamspe2021-072","q-fmabc2026-089"],
          texto: `- **Notificação compulsória imediata, em até 24 h**, já na **suspeita**. Não espere a confirmação. {q-einstein2025-043,q-fmabc2026-089}
- **Bloqueio vacinal seletivo** dos contatos suscetíveis em **até 72 h** da exposição. A vacina dada a tempo **pode prevenir** a doença. {q-famerp2026-009,q-famerp2022-014,q-famerp2023-027}
- **Imunoglobulina humana em até 6 dias** para contatos que **não podem receber a vacina**: gestantes, menores de 6 meses e imunodeprimidos. {q-famerp2023-027}
- Calendário: **tríplice viral aos 12 meses** e **segunda dose aos 15 meses** (tetra viral ou tríplice + varicela). São **duas doses**, não uma. {q-fmabc2026-089,q-famerp2023-027}
- A **cobertura vacinal de 95% ou mais** garante a proteção da população. A queda da cobertura explica a volta dos casos depois da certificação de 2016. A medida que mais reduz a incidência é **aumentar a cobertura vacinal**. {q-famerp2023-027,q-iamspe2021-072}` },
      ],
    },
    {
      id: "rubeola", titulo: "Rubéola",
      introducao: `A rubéola, na criança, é uma doença tão leve que muitas vezes passa despercebida. Sua importância vem quase toda da **gestação**. O vírus é transmitido por gotículas, incuba por 14 a 21 dias e é eliminado de 7 dias antes até 7 dias depois do exantema, inclusive por quem tem infecção subclínica. O Brasil eliminou a circulação endêmica e foi certificado em 2015. A vigilância é integrada à do sarampo, porque o exantema das duas doenças se confunde e a vacina é a mesma (tríplice viral).

**Por que é teratogênica.** Na gestante, o vírus atravessa a placenta e infecta tecidos embrionários em formação. Ali ele **inibe a divisão celular** e causa **dano vascular**. O risco e a gravidade dependem da idade gestacional: a infecção nas **primeiras 12 semanas** atinge a maioria dos fetos e é a que causa a síndrome completa. Depois de 20 semanas, os defeitos são raros. Os órgãos atingidos são os que estão em organogênese naquele momento: o cristalino (**catarata**), a cóclea (**surdez neurossensorial**, o achado mais frequente), o coração e o canal arterial (**persistência do canal arterial**, estenose pulmonar) e o sistema nervoso central (microcefalia, atraso).`,
      fragmentos: [
        { id: "rub-tudo", diretrizes: ["ms-guia-vigilancia"], titulo: "Agente, quadro e forma congênita", conferir: true,
          questoes: ["q-famema2025-042"],
          texto: `- Agente: **Rubivirus (vírus da rubéola)**, família Matonaviridae, antes classificada como Togaviridae.
- Pródromo **leve**. A pista mais cobrada é a **linfadenopatia retroauricular, occipital e cervical posterior**.
- Exantema **róseo, discreto**, craniocaudal, que dura cerca de **3 dias**. Pode haver **manchas de Forchheimer** no palato e **artralgia** em adolescentes e mulheres.
- **Síndrome da rubéola congênita**: **catarata**, **surdez neurossensorial** e **cardiopatia (PCA)**. Por isso a vigilância é a mesma do sarampo: notificação imediata e bloqueio.` },
      ],
    },
    {
      id: "subito", titulo: "Exantema súbito (roséola infantum)",
      introducao: `O exantema súbito é a manifestação clássica da **primeira infecção pelo herpes-vírus humano 6 (HHV-6B)**. Quase todas as crianças se infectam até os 2 ou 3 anos. [[A faixa etária típica, **6 meses a 2 anos**, não é coincidência: corresponde ao período em que os **anticorpos maternos** recebidos pela placenta já desapareceram.|q-famema2023-081,q-sirio2021-057,q-fmabc2021-098,q-einstein2022-038]] O vírus é passado pela **saliva** de adultos e irmãos que o eliminam sem sintomas, porque, como todo herpes-vírus, ele **fica latente** a vida toda e se reativa de tempos em tempos.

**Por que a febre some e só então surge o exantema.** O HHV-6 infecta linfócitos T CD4 e provoca uma viremia com febre alta. [[O exantema surge quando a resposta imune controla essa viremia: é a marca da resolução, não da piora.|q-scmsp2025-053,q-uspsp1-004,q-fmabc2021-098,q-sirio2021-057,q-famema2023-081,q-unicampdis2023-035,q-einstein2022-038]] Por isso a criança melhora no dia em que aparecem as manchas. O vírus também é **neurotrópico**: alcança o sistema nervoso central e permanece latente ali. [[Isso, somado à febre alta de subida rápida, explica por que o HHV-6 responde por uma parcela importante das **primeiras crises febris** em lactentes.|q-uspsp5-120]]`,
      fragmentos: [
        { id: "sub-agente", titulo: "Agente: herpes-vírus humano 6 (e 7)", conferir: true,
          questoes: ["q-famema2023-081","q-sirio2021-057","q-fmabc2021-098","q-einstein2022-038"],
          texto: `- Agente: **herpes-vírus humano 6 (HHV-6B)**. Menos vezes, o **HHV-7**. {q-famema2023-081,q-sirio2021-057,q-fmabc2021-098,q-einstein2022-038}
- Idade típica: **6 meses a 2 anos**. Não é doença do escolar.` },
        { id: "sub-clinica", casos: ["q-uspsp1-004"], titulo: "Febre alta que some → aí aparece o exantema",
          prosa: `O exame físico normal, apesar da febre alta, é o que distingue o quadro. Pode haver pequenas pápulas no palato mole (manchas de Nagayama), edema palpebral discreto e abaulamento da fontanela. No hemograma, a leucopenia com linfocitose relativa é comum. Mas o diagnóstico é clínico e quase sempre retrospectivo: só se confirma quando o exantema aparece após a defervescência.`, conferir: true,
          questoes: ["q-scmsp2025-053","q-uspsp1-004","q-fmabc2021-098","q-einstein2022-038","q-sirio2021-057","q-famema2023-081","q-unicampdis2023-035","q-famema2025-042"],
          texto: `- **3 a 5 dias de febre alta** em lactente em **bom estado geral**. {q-scmsp2025-053,q-uspsp1-004,q-einstein2022-038,q-sirio2021-057,q-unicampdis2023-035}
- A **febre cai em crise** e **só então** surge o exantema **maculopapular róseo**, que começa no **tronco** e vai para pescoço, face e membros. Dura de 1 a 2 dias. {q-scmsp2025-053,q-uspsp1-004,q-fmabc2021-098,q-sirio2021-057,q-famema2023-081,q-unicampdis2023-035,q-einstein2022-038}
- Não há pródromo respiratório marcante, e o exame fora o exantema é **normal**. {q-famema2023-081}` },
        { id: "sub-compl", titulo: "Complicação e conduta", conferir: true,
          questoes: ["q-uspsp5-120","q-amrigs2021-070"],
          texto: `- A complicação mais associada é a **crise convulsiva febril**, durante a fase de febre alta. {q-uspsp5-120}
- Conduta **expectante**: antitérmico, observação e retorno se a febre voltar ou surgir sinal de alarme. {q-amrigs2021-070}` },
        { id: "sub-armadilha", titulo: "Armadilha: \"alergia à amoxicilina\"", conferir: true,
          questoes: ["q-amrigs2021-070"],
          texto: `- O lactente com febre recebe **amoxicilina**, a febre cede e aparecem manchas. A família atribui o quadro a **alergia ao antibiótico**, mas o mais provável é **exantema súbito**.
- Como a febre era viral, **suspenda o antimicrobiano** sem indicação. **Não rotule** a criança como alérgica sem necessidade.` },
      ],
    },
    {
      id: "eritema", titulo: "Eritema infeccioso (quinta doença)",
      introducao: `O eritema infeccioso, a "quinta doença", é causado pelo **parvovírus B19**. É um vírus pequeno de DNA que só se multiplica em células em divisão, e tem um alvo preciso: os **precursores eritroides da medula**. [[Ele entra por meio do **antígeno P (globosídeo)** da membrana dessas células.|q-scmsp2026-054,q-sessp2025-042,q-tp20202-046,q-fmabc2024-058,q-einstein2021-027]] A transmissão é respiratória, com surtos em escolas no fim do inverno e na primavera, sobretudo em crianças de 5 a 15 anos.

**Fisiopatologia em duas fases.** Na primeira semana há viremia: o vírus destrói os precursores eritroides e **a produção de hemácias para por 5 a 7 dias**. Nessa fase a criança tem febre baixa, mal-estar e é **contagiosa**. Numa pessoa saudável a parada passa despercebida, porque a hemácia vive cerca de 120 dias e a hemoglobina mal se move. Uma a duas semanas depois, os anticorpos formam **imunocomplexos**, que produzem o exantema e a artralgia. [[Quando o exantema aparece, a viremia já acabou e a criança **não transmite mais**.|q-scmsp2026-054,q-einstein2021-027,q-tp20202-046]]

O mesmo mecanismo explica as formas graves. [[Na **anemia hemolítica crônica** (doença falciforme, esferocitose), a hemácia vive poucos dias, e uma semana sem produção causa uma **crise aplásica** com reticulócitos zerados.|q-sessp2025-042]] No **feto**, a eritropoiese é intensa e a hemácia vive pouco, por isso a anemia grave leva a insuficiência cardíaca e **hidropisia**. O risco é maior antes de 20 semanas.`,
      fragmentos: [
        { id: "eri-agente", casos: ["q-tp20202-046"], titulo: "Agente: parvovírus B19", conferir: true,
          questoes: ["q-scmsp2026-054","q-sessp2025-042","q-tp20202-046","q-fmabc2024-058","q-einstein2021-027"],
          texto: `- Agente: **parvovírus B19**, vírus de DNA com **tropismo pelo precursor eritroide**.
- Contato com caso de "quinta doença" ou face esbofeteada aponta para **parvovírus B19**. {q-scmsp2026-054,q-sessp2025-042,q-tp20202-046,q-fmabc2024-058,q-einstein2021-027}` },
        { id: "eri-clinica", titulo: "As três fases do exantema",
          prosa: `[[A sequência de três fases é imunomediada, e o calor faz o exantema voltar porque dilata os capilares da derme, onde estão os imunocomplexos.|q-unicampdis2023-035]] No adulto, sobretudo na mulher, o exantema é discreto e predomina a **poliartralgia simétrica** de mãos, punhos e joelhos, que pode durar semanas e imitar artrite reumatoide.`, conferir: true,
          questoes: ["q-scmsp2026-054","q-sessp2025-042","q-tp20202-046","q-fmabc2024-058","q-einstein2021-027","q-einstein2024-040","q-unicampdis2023-035"],
          texto: `- **1ª fase:** eritema intenso nas bochechas, a **face esbofeteada** ("asa de borboleta"), poupando a região perioral. {q-scmsp2026-054,q-sessp2025-042,q-tp20202-046,q-einstein2021-027}
- **2ª fase:** exantema **rendilhado (reticulado)** em tronco e na **face extensora dos membros**. {q-einstein2024-040,q-fmabc2024-058,q-tp20202-046}
- **3ª fase:** o exantema **reaparece com calor, sol, banho quente e exercício** por semanas. {q-unicampdis2023-035}
- Febre baixa ou ausente e bom estado geral. **Artralgia** pode aparecer, sobretudo em adolescentes e adultos. {q-scmsp2026-054,q-einstein2024-040}
- Quando o exantema aparece, a criança **já não transmite** e pode ir à escola.` },
        { id: "eri-risco", titulo: "Quando o B19 é grave", conferir: true,
          questoes: ["q-sessp2025-042"],
          texto: `- **Crise aplásica transitória** em quem tem **anemia hemolítica crônica**, como a **doença falciforme** e a esferocitose.
- **Anemia crônica** no **imunodeprimido**.
- Na **gestante**: **hidropisia fetal** por anemia fetal.` },
      ],
    },
    {
      id: "escarlatina", titulo: "Escarlatina",
      introducao: `A escarlatina é uma **faringoamigdalite estreptocócica acompanhada de exantema**. Para que ela aconteça, duas condições precisam coincidir. [[A cepa de *Streptococcus pyogenes* tem de carregar o gene das **exotoxinas pirogênicas** (SpeA, SpeC), adquirido de bacteriófagos.|q-unesp2025-009,q-sirio2026-055,q-uspsp2-050]] E a criança não pode ter anticorpos contra aquela toxina. Como existem várias toxinas diferentes, a escarlatina **pode se repetir**. [[A faringite estreptocócica predomina dos **5 aos 15 anos**, no inverno e na primavera, e é incomum antes dos 3 anos, quando as faringites são quase sempre virais.|q-famema2025-042]]

**Fisiopatologia.** As toxinas agem como **superantígenos**: ativam um grande número de linfócitos T de forma inespecífica e liberam citocinas. Também lesam diretamente os capilares da pele. [[Isso produz eritema difuso com micropápulas, mais intenso onde a pele é dobrada e os capilares são mais frágeis (**sinal de Pastia**).|q-usprp2026-046,q-sirio2026-055,q-uspsp2-050]] A lesão da camada superficial da pele explica a **descamação** da convalescença.

**Por que sempre tratar.** O antibiótico encurta a doença e a transmissão. [[O motivo principal, porém, é evitar a **febre reumática**: anticorpos contra a proteína M do estreptococo reagem de forma cruzada com tecidos do coração, das articulações e do cérebro, por **mimetismo molecular**.|q-usprp2026-046,q-unesp2025-009]] O tratamento iniciado até cerca de **9 dias** após o início da faringite previne essa complicação. Ele não previne a glomerulonefrite pós-estreptocócica.`,
      fragmentos: [
        { id: "esc-agente", titulo: "Agente e faixa etária", conferir: true,
          questoes: ["q-unesp2025-009","q-sirio2026-055","q-uspsp2-050","q-famema2025-042"],
          texto: `- Agente: **Streptococcus pyogenes (estreptococo β-hemolítico do grupo A)**, que produz **toxina pirogênica (eritrogênica)**. {q-unesp2025-009,q-sirio2026-055,q-uspsp2-050}
- Faixa etária: **escolares (5 a 15 anos)**. É **rara antes dos 3 anos**. {q-famema2025-042}` },
        { id: "esc-clinica", casos: ["q-uspsp2-050"], titulo: "Quadro: faringite + exantema em lixa",
          prosa: `O exantema surge 12 a 48 horas depois da febre. Começa no pescoço e nas dobras e se generaliza em um a dois dias, poupando a região ao redor da boca. A língua passa por duas fases: primeiro saburrosa, com papilas vermelhas salientes (framboesa branca); depois a capa se desprende e ela fica vermelha (framboesa vermelha). A descamação aparece na segunda semana e começa pelas pontas dos dedos.`, conferir: true,
          questoes: ["q-usprp2026-046","q-unesp2025-009","q-sirio2026-055","q-uspsp2-050"],
          texto: `- **Febre, odinofagia e faringite exsudativa**. Pode haver vômitos e cefaleia. **Sem tosse nem coriza**. {q-usprp2026-046,q-unesp2025-009,q-sirio2026-055}
- O exantema é **micropapular e áspero ("em lixa")** e começa em **pescoço, axilas e virilhas**. {q-usprp2026-046,q-sirio2026-055,q-uspsp2-050}
- **Sinal de Pastia**: o exantema fica mais intenso nas dobras. {q-sirio2026-055}
- **Sinal de Filatov**: rubor facial com **palidez perioral**. {q-sirio2026-055}
- **Língua em framboesa**: primeiro saburrosa, depois vermelha. {q-unesp2025-009,q-sirio2026-055}
- Evolui com **descamação lamelar** em mãos e pés.` },
        { id: "esc-diag-trat", titulo: "Diagnóstico e tratamento", conferir: true,
          questoes: ["q-uspsp2-050","q-usprp2026-046","q-unesp2025-009","q-famema2025-042"],
          texto: `- **Padrão-ouro: cultura de orofaringe.** O teste rápido de antígeno também serve. {q-uspsp2-050}
- **Trate sempre com antibiótico**: **penicilina G benzatina IM em dose única** ou **amoxicilina VO por 10 dias**. O tratamento previne a **febre reumática**. {q-usprp2026-046,q-unesp2025-009}
- "É doença de toxina, não precisa de antibiótico" é **falso**. {q-famema2025-042}` },
      ],
    },
    {
      id: "varicela", titulo: "Varicela",
      introducao: `A varicela é a primoinfecção pelo **vírus varicela-zóster (VZV)**. A transmissão ocorre por aerossol e pelo contato com o líquido das vesículas, de **1 a 2 dias antes do exantema até todas as lesões virarem crosta**. A incubação é de 10 a 21 dias. Antes da vacina, praticamente toda criança tinha varicela. Hoje a vacina faz parte do calendário (tetra viral aos 15 meses e varicela aos 4 anos), e os casos caíram muito, mas surtos em creches continuam.

**Fisiopatologia.** O vírus se multiplica na mucosa respiratória e nos linfonodos. Depois chega à pele em **ondas sucessivas de viremia**. [[Cada onda forma uma nova leva de lesões, e é por isso que coexistem mácula, pápula, vesícula e crosta.|q-einstein2027-062]] Na epiderme, o vírus funde as células e forma vesículas intraepidérmicas. Depois da doença, o vírus sobe pelos nervos sensitivos e fica **latente nos gânglios das raízes dorsais**. A reativação décadas depois, quando a imunidade celular cai, é o **herpes-zóster**.

A doença é mais grave em adolescentes, adultos, gestantes, recém-nascidos e imunodeprimidos, nos quais a pneumonia e a forma disseminada são mais comuns. Na criança, a complicação mais frequente é a **infecção bacteriana das lesões** coçadas. O **AAS é contraindicado**: o salicilato, junto com a infecção viral, causa a **síndrome de Reye**, com disfunção mitocondrial, insuficiência hepática e edema cerebral.`,
      fragmentos: [
        { id: "var-tudo", diretrizes: ["ms-guia-vigilancia","calendario-vacinal"], figuras: [{ arquivo: "figuras/varicela-estagios.svg", legenda: "Esquema autoral: os quatro estágios da lesão, que coexistem no mesmo paciente." }], titulo: "Quadro e conduta com contatos", conferir: true,
          questoes: ["q-einstein2027-062"],
          texto: `- Agente: **vírus varicela-zóster**. As lesões são **pruriginosas** e aparecem **em diferentes estágios ao mesmo tempo** (mácula, pápula, vesícula e crosta). A distribuição é **centrípeta**, mais no tronco.
- A complicação mais comum é a **infecção bacteriana da pele** (estreptococo ou estafilococo). **Não use AAS**, pelo risco de **síndrome de Reye**.
- Contato suscetível e imunocompetente: **vacina contra varicela pós-exposição**, idealmente em **até 3 a 5 dias**.
- **Imunoglobulina específica (VZIG)** para quem não pode receber vacina: imunodeprimidos, gestantes suscetíveis e alguns recém-nascidos.` },
      ],
    },
    {
      id: "enterovirus", titulo: "Enteroviroses: mão-pé-boca e herpangina",
      introducao: `Os enterovírus (Coxsackie A e B, echovírus, enterovírus 71) são vírus de RNA transmitidos pela via **fecal-oral** e por secreções respiratórias. Predominam no **verão e no outono** e circulam muito em creches, onde a higiene das mãos e das fraldas é difícil. Eles se multiplicam primeiro na orofaringe e no intestino, causam viremia e atingem os órgãos-alvo: a mucosa oral, a pele das extremidades, as meninges e, menos vezes, o coração e o tronco cerebral. A eliminação pelas fezes continua por semanas depois da melhora, o que explica por que os surtos são difíceis de conter.

A mesma família de vírus produz quadros que se distinguem pelo **lugar das lesões**. [[Na **herpangina**, as vesículas ficam na parte posterior da boca, sem lesões na pele.|q-sessp2022-052]] [[Na **mão-pé-boca**, as lesões aparecem na boca e na pele das extremidades.|q-amrigs2021-090,q-iamspe2025-078,q-tp20222-048,q-amrigs2020-078]] O **enterovírus 71** merece atenção pela capacidade de atingir o tronco cerebral (rombencefalite). O **Coxsackie A6** causa formas mais extensas, com lesões em tronco e face e queda das unhas semanas depois (onicomadese).`,
      fragmentos: [
        { id: "ent-agente", titulo: "Agente: Coxsackie A (e enterovírus 71)", conferir: true,
          questoes: ["q-amrigs2021-090","q-sessp2022-052"],
          texto: `- Agente: **vírus Coxsackie A** (sobretudo **A16** na mão-pé-boca) e **enterovírus 71**, que se associa às formas neurológicas.
- Transmissão **fecal-oral** e respiratória, mais comum em creches.` },
        { id: "ent-clinica", casos: ["q-tp20222-048"], titulo: "Mão-pé-boca × herpangina",
          prosa: `O quadro é benigno e se resolve em 7 a 10 dias. [[O maior risco é a **desidratação**: a dor das úlceras orais faz a criança recusar líquidos.|q-tp20222-048,q-amrigs2020-078]] Por isso o tratamento se concentra em analgesia, líquidos frios e alimentos pastosos. Sinais neurológicos (mioclonias, ataxia, sonolência) ou cardiorrespiratórios, sobretudo com enterovírus 71, mudam o quadro e exigem internação.`, conferir: true,
          questoes: ["q-amrigs2021-090","q-sessp2022-052","q-iamspe2025-078","q-tp20222-048","q-amrigs2020-078"],
          texto: `- **Mão-pé-boca:** úlceras dolorosas na **boca** e lesões **pápulo-vesiculares em mãos, pés** (e nádegas). Febre **baixa e curta**. **Febre alta por mais de 7 dias não é típica.** {q-amrigs2021-090,q-iamspe2025-078,q-tp20222-048,q-amrigs2020-078}
- **Herpangina:** **febre alta súbita** com **vesículas e úlceras com halo eritematoso em pilares anteriores, palato mole e úvula**, **sem lesões na pele**. {q-sessp2022-052}
- Conduta: **suporte** com **analgesia, hidratação oral e dieta fria e pastosa**. A criança com sinais vitais normais **vai para casa**, sem exames e sem antibiótico. {q-tp20222-048,q-amrigs2020-078}` },
      ],
    },
    {
      id: "mono", titulo: "Mononucleose infecciosa",
      introducao: `A mononucleose infecciosa é a primoinfecção sintomática pelo **vírus Epstein-Barr (EBV)**, um herpes-vírus transmitido pela **saliva**. A epidemiologia depende das condições de vida. Onde há aglomeração, a maioria das crianças se infecta nos primeiros anos, quase sempre sem sintomas ou com um quadro inespecífico. Onde a infecção é adiada para a adolescência, ela causa a síndrome clássica, a "doença do beijo".

**Fisiopatologia.** O EBV infecta o epitélio da orofaringe e os **linfócitos B**, nos quais entra pelo receptor **CD21**, e faz essas células proliferarem. O organismo responde com uma expansão maciça de **linfócitos T CD8 citotóxicos**. [[São essas células T ativadas que aparecem no hemograma como **linfócitos atípicos**, e é essa proliferação que aumenta linfonodos, amígdalas, fígado e **baço**.|q-amrigs2020-073,q-einstein2026-035]] O baço aumentado e com a cápsula distendida pode romper com trauma pequeno. Por isso se evita esporte de contato por 3 a 4 semanas.

O exantema depois de **amoxicilina ou ampicilina** acontece na maioria dos pacientes que recebem esses antibióticos. É uma reação imune transitória ligada à ativação policlonal de linfócitos, não uma alergia verdadeira e duradoura.`,
      fragmentos: [
        { id: "mon-tudo", titulo: "EBV: faringite + linfonodos + baço", conferir: true,
          questoes: ["q-amrigs2020-073","q-einstein2026-035","q-usprp2026-045"],
          texto: `- Agente: **vírus Epstein-Barr (EBV)**. Quadro típico em **adolescentes**. {q-amrigs2020-073,q-einstein2026-035}
- Tríade: **febre, faringite exsudativa e linfadenopatia generalizada**, sobretudo cervical posterior. Somam-se **esplenomegalia** e edema palpebral. {q-amrigs2020-073,q-einstein2026-035}
- Hemograma: **linfocitose com linfócitos atípicos**. Confirme com **anticorpo heterófilo** ou **sorologia VCA-IgM**. {q-einstein2026-035}
- O **exantema aparece sobretudo depois de amoxicilina ou ampicilina** e não indica alergia verdadeira.
- Diante de **linfonodomegalia generalizada que persiste** após febre, investigue **EBV, toxoplasmose e HIV**. {q-usprp2026-045}` },
      ],
    },
    {
      id: "kawasaki", titulo: "Diferencial grave: Kawasaki e SIM-P",
      introducao: `A doença de Kawasaki é uma **vasculite aguda de vasos de médio calibre**, com predileção pelas **artérias coronárias**. A causa não é conhecida. O modelo aceito é o de um **gatilho infeccioso** (ou ambiental) que desencadeia resposta inflamatória exagerada em crianças geneticamente predispostas. Isso explica a maior incidência em descendentes de asiáticos e a sazonalidade. Afeta sobretudo **menores de 5 anos** e é a principal causa de **cardiopatia adquirida** na infância nos países desenvolvidos.

**Por que é urgente.** A inflamação da parede arterial destrói a lâmina elástica e a camada muscular, e a artéria se dilata em **aneurisma**. Sem tratamento, cerca de **1 em cada 4 crianças** desenvolve aneurisma coronariano. [[Com imunoglobulina nos primeiros 10 dias, a proporção cai para **menos de 5%**.|q-scmsp2021-056]] Os aneurismas podem trombosar e causar infarto na infância. [[Os **lactentes** têm mais formas incompletas e mais aneurismas, por isso a suspeita neles precisa ser mais baixa.|q-scmsp2021-056,q-scmsp2022-039]]

A **síndrome inflamatória multissistêmica pediátrica (SIM-P)** surgiu na pandemia de covid-19. [[É uma resposta imune desregulada que aparece **2 a 6 semanas depois da infecção** pelo SARS-CoV-2, não durante ela.|q-sirio2024-043]] Lembra Kawasaki, mas atinge crianças maiores e escolares, com sintomas gastrintestinais marcantes e, com frequência, **choque** por disfunção miocárdica e vasodilatação.`,
      fragmentos: [
        { id: "kaw-crit", diretrizes: ["aha-kawasaki"], figuras: [{ arquivo: "figuras/kawasaki-criterios.svg", legenda: "Esquema autoral: o critério obrigatório e os cinco critérios clínicos." }], titulo: "Critérios de Kawasaki",
          prosa: `[[Como não existe exame que confirme Kawasaki, o diagnóstico é clínico e se apoia num conjunto de critérios.|q-scmsp2025-057,q-sirio2025-045,q-sirio2024-050]] Os sinais refletem inflamação vascular difusa: a hiperemia conjuntival sem secreção, o edema endurado das extremidades e a descamação periungueal tardia (2ª a 3ª semana). Na fase subaguda, a **plaquetose** é típica. VHS e PCR elevadas, piúria estéril e elevação de transaminases reforçam a suspeita.`, conferir: true,
          questoes: ["q-scmsp2025-057","q-sirio2025-045","q-sirio2024-050","q-scmsp2022-039","q-famema2025-042"],
          texto: `- Critério obrigatório: **febre por 5 dias ou mais**. Some **4 dos 5 critérios**: {q-scmsp2025-057,q-sirio2025-045}
- **Conjuntivite bilateral NÃO exsudativa**, que poupa o limbo. {q-famema2025-042,q-sirio2025-045,q-scmsp2025-057}
- **Alterações de lábios e boca**: lábios secos e fissurados, língua em framboesa, hiperemia. {q-scmsp2025-057}
- **Exantema polimorfo**, que **não é vesicular nem bolhoso**. {q-famema2025-042}
- **Alterações de extremidades**: edema e eritema de mãos e pés, e depois **descamação periungueal**. {q-scmsp2025-057}
- **Linfonodo cervical de 1,5 cm ou mais**, em geral unilateral. {q-sirio2025-045,q-scmsp2025-057}
- **Miocardite não é critério**: é complicação. Febre que não cede com antibiótico é uma pista. {q-sirio2024-050,q-scmsp2022-039}` },
        { id: "kaw-trat", diretrizes: ["aha-kawasaki"], titulo: "Tratamento e Kawasaki incompleta",
          prosa: `A imunoglobulina neutraliza o processo inflamatório e reduz drasticamente a formação de aneurismas. O AAS tem papel anti-inflamatório na fase aguda e antiagregante em dose baixa nas semanas seguintes. Crianças que seguem febris 36 horas após a imunoglobulina são consideradas resistentes e recebem nova dose ou outros imunomoduladores. O ecocardiograma no diagnóstico e em 1 a 2 e 4 a 6 semanas acompanha as coronárias.`, conferir: true,
          questoes: ["q-scmsp2021-056","q-scmsp2022-039","q-sirio2025-045"],
          texto: `- Tratamento: **imunoglobulina IV 2 g/kg** de imediato, idealmente **até o 10º dia**, junto com **AAS**. {q-scmsp2021-056}
- No **lactente** com febre prolongada e poucos critérios, pense em **Kawasaki incompleta** e faça **ecocardiograma**, PCR e VHS. Não espere completar os critérios. {q-scmsp2021-056}
- Nos casos de **alto risco de aneurisma coronariano**, a **AHA sugere associar corticoide** ao tratamento inicial. {q-scmsp2022-039}` },
        { id: "kaw-simp", titulo: "SIM-P (síndrome inflamatória multissistêmica pós-covid)", conferir: true,
          questoes: ["q-sirio2024-043"],
          texto: `- Quadro: **febre, sintomas gastrintestinais, exantema e choque** (hipotensão, taquicardia), com **PCR, dímero-D e transaminases muito altos** e plaquetopenia. Há **contato com covid** de 2 a 6 semanas antes.
- Tratamento: **IGIV 2 g/kg + metilprednisolona 2 mg/kg/dia**. Use **antibiótico empírico (ceftriaxona)** enquanto não se afasta sepse em criança chocada.
- **Não dê AAS antiagregante** se as plaquetas estiverem baixas.` },
      ],
    },
    {
      id: "ssse", titulo: "Síndrome da pele escaldada estafilocócica",
      introducao: `A síndrome da pele escaldada estafilocócica é causada pelas **toxinas esfoliativas A e B** do *Staphylococcus aureus*. A infecção que produz a toxina costuma ser pequena e distante (conjuntiva, nasofaringe, coto umbilical, uma lesão de pele). A toxina viaja pelo sangue e age na pele toda. Predomina em **recém-nascidos e menores de 5 anos** por dois motivos: eles ainda não têm anticorpos contra a toxina e os rins imaturos a eliminam mais devagar. Em adultos ocorre quase só na insuficiência renal.

**Fisiopatologia.** A toxina é uma protease que corta a **desmogleína-1**, a proteína que une as células da **camada granulosa**, bem na superfície da epiderme. A pele se descola num plano superficial, o que explica as bolhas flácidas, o **sinal de Nikolsky** e a cicatrização sem marcas. [[As **mucosas** expressam sobretudo desmogleína-3, que a toxina não corta, e por isso **ficam poupadas**.|q-sessp2026-050]] É isso que diferencia a síndrome da necrólise epidérmica tóxica, que é por medicamento, atinge toda a epiderme e as mucosas.`,
      fragmentos: [
        { id: "sse-tudo", titulo: "Toxina esfoliativa do S. aureus", conferir: true,
          questoes: ["q-sessp2026-050"],
          texto: `- Toxina **esfoliativa do Staphylococcus aureus**, que **cliva a desmogleína-1**. É mais comum em menores de 5 anos.
- Quadro: eritema doloroso **periorificial**, com **bolhas flácidas que se rompem** e crostas e **ragádias periorais**. **Nikolsky positivo** e **mucosas poupadas**, ao contrário da síndrome de Stevens-Johnson.
- Tratamento: **oxacilina IV** (antiestafilocócico), hidratação e cuidados com a pele.` },
      ],
    },
    {
      // Último capítulo de propósito: só reúne o que os capítulos já explicaram, sem dado novo
      // (docs/PROJETO-RESUMOS.md, seção 5). As questões são as de diferencial entre as doenças.
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A banca raramente pergunta uma doença isolada: ela descreve um quadro e pede que você a separe das vizinhas. A tabela abaixo junta, lado a lado, o que os capítulos anteriores explicaram. Leia-a por coluna: cada coluna é uma das perguntas do capítulo 1.`,
      fragmentos: [
        { id: "cmp-tabela", titulo: "As exantemáticas lado a lado", conferir: true,
          questoes: ["q-famema2025-042","q-tp20222-047","q-amrigs2021-070","q-uspsp1-004","q-tp20222-048","q-einstein2026-035"],
          prosa: `| Doença | Agente | Idade típica | Pródromo | Exantema: início e progressão | Sinal característico | Complicação clássica | Notificação e isolamento | Prevenção |
|---|---|---|---|---|---|---|---|---|
| **Sarampo** | *Morbillivirus* | não vacinados, qualquer idade | 3 a 5 dias: febre alta, **tosse, coriza e conjuntivite** | maculopapular, começa na face e atrás das orelhas e **desce**; vem no **auge da febre** | **manchas de Koplik** | **pneumonia** (principal causa de morte) | **notificação imediata** na suspeita; isolamento respiratório | tríplice viral |
| **Rubéola** | vírus da rubéola (*Rubivirus*) | criança e adulto jovem | pobre ou ausente | maculopapular rósea, face → corpo, some em poucos dias | **adenopatia retroauricular e occipital** | **rubéola congênita** (infecção na gestação) | notificação imediata | tríplice viral |
| **Eritema infeccioso** | **parvovírus B19** | escolar | pobre | três fases: **face esbofeteada** → rendilhado em tronco e membros → reaparece com calor e sol | face esbofeteada | **crise aplásica** na anemia hemolítica crônica | não transmite mais quando o exantema aparece | sem vacina |
| **Exantema súbito** | **HHV-6** (e HHV-7) | **6 meses a 2 anos** | 3 a 5 dias de **febre alta** com bom estado geral | surge **quando a febre cede**, no tronco | exantema depois da febre | **convulsão febril** | — | sem vacina |
| **Varicela** | vírus varicela-zóster | pré-escolar e escolar | curto | vesículas **pruriginosas**, **centrípetas**, em **vários estágios ao mesmo tempo** | polimorfismo das lesões | **infecção bacteriana da pele**; Reye com AAS | isolamento até todas virarem crosta | vacina; contato: vacina pós-exposição ou VZIG |
| **Escarlatina** | *Streptococcus pyogenes* (toxina) | pré-escolar e escolar | **faringite** e febre, **sem tosse nem coriza** | **áspero, em lixa**, mais forte nas dobras | **Pastia**, **Filatov**, língua em framboesa | febre reumática e glomerulonefrite | — | sem vacina; tratar a faringite |
| **Mão-pé-boca** | **Coxsackie A16**, enterovírus 71 | menor de 5 anos, creche | febre **baixa e curta** | **úlceras na boca** + pápulo-vesículas em **mãos, pés** e nádegas | a distribuição das lesões | formas neurológicas (enterovírus 71) | — | higiene |
| **Kawasaki** | desconhecido (imunomediado) | menor de 5 anos | **febre por 5 dias ou mais** | polimorfo, **sem vesículas**, com alterações de extremidades | conjuntivite sem secreção, lábios fissurados, linfonodo cervical | **aneurisma coronariano** | — | — (tratamento: IGIV + AAS) |
| **Mononucleose** | **vírus Epstein-Barr** | **adolescente** | febre, **faringite exsudativa**, linfonodos | surge sobretudo **depois de amoxicilina** | **esplenomegalia**, linfócitos atípicos | — | — | sem vacina |`,
          texto: `- Exantema que aparece **quando a febre cede**: exantema súbito; **no auge da febre**: sarampo. {q-uspsp1-004,q-famema2025-042}
- Pródromo com **tosse, coriza e conjuntivite** separa o sarampo; **faringite sem tosse** aponta escarlatina ou mononucleose. {q-tp20222-047,q-einstein2026-035}
- Febre por **5 dias ou mais** sem foco: pense em **Kawasaki** antes de uma virose. {q-amrigs2021-070}
- Vesículas em **mãos, pés e boca** com febre baixa e criança bem: mão-pé-boca, conduta de suporte. {q-tp20222-048}` },
      ],
    },
  ],
});
