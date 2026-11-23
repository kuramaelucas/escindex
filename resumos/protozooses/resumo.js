/* resumos/protozooses/resumo.js — resumo adaptativo das protozooses sistêmicas do assunto ass-leishmaniose:
   malária (ciclo, diagnóstico, tratamento por espécie, malária grave, viajante), leishmaniose visceral
   (calazar: imunologia, quadro, diagnóstico, tratamento), leishmaniose tegumentar (resumida; versão completa
   em infeccoes-de-pele), doença de Chagas (transmissão, fases, tratamento), armadilhas e tabela da febre com
   esplenomegalia. Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- protozooses */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "protozooses",
  titulo: "Malária, leishmanioses e doença de Chagas",
  assunto: "ass-leishmaniose",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "ms-malaria", texto: "Ministério da Saúde — Guia de tratamento da malária no Brasil (2ª edição, 2021) e Guia de Vigilância em Saúde (malária)", lidoEm: null },
    { id: "ms-lv", texto: "Ministério da Saúde — Manual de vigilância e controle da leishmaniose visceral (2014) e Guia de Vigilância em Saúde, 6ª ed. (2024), capítulo de leishmaniose visceral", lidoEm: null },
    { id: "ms-leishmaniose", texto: "Ministério da Saúde — Manual de vigilância da leishmaniose tegumentar (2017)", lidoEm: null },
    { id: "pcdt-chagas", texto: "Ministério da Saúde/Conitec — Protocolo Clínico e Diretrizes Terapêuticas da doença de Chagas (2018) e II Consenso Brasileiro em Doença de Chagas (2015)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição", questoes: ["q-gdmalaria-012","q-gdmalaria-013","q-gdmalaria-025","q-gdhepatoesplenomegalias-040"] },
  ],
  doencas: [
    {
      id: "malaria", titulo: "Malária",
      introducao: `[[A malária é transmitida pela fêmea do mosquito *Anopheles*, que pica do entardecer ao amanhecer. No Brasil, quase todos os casos vêm da Amazônia Legal e a espécie mais comum é o *Plasmodium vivax*, seguido do *P. falciparum* (o *P. malariae* é raro); o homem é o único reservatório que importa.|q-gdmalaria-001,q-gdmalaria-004,q-gdmalaria-010,q-gdmalaria-011,q-gdmalaria-002]] [[O esporozoíto vai ao fígado, multiplica-se e libera merozoítos que invadem as hemácias; cada ciclo dentro da hemácia termina com a ruptura sincronizada de muitas delas, e é essa ruptura que dá o calafrio, a febre e o suor. O ciclo do *vivax* dura 48 horas (febre terçã) e o do *malariae*, 72 horas (quartã); o *falciparum* é irregular.|q-gdmalaria-017,q-gdmalaria-010,q-inf-26]] [[O *vivax* (e o *ovale*) deixa formas dormentes no fígado, os hipnozoítos, que acordam meses depois e causam recaída; por isso o tratamento precisa de uma droga que os mate, a primaquina.|q-inf-26,q-gdmalaria-014]] [[O *falciparum* parasita hemácias de qualquer idade e as faz grudar no endotélio dos capilares (citoaderência): obstrui a microcirculação do cérebro, do rim e do pulmão, e por isso dá as formas graves, mas a gravidade depende também da densidade de parasitas e da imunidade de quem é infectado.|q-gdmalaria-009,q-gdmalaria-006]]

Veja também: **Arboviroses** (outras febres agudas de área endêmica), **Parasitoses intestinais** (esquistossomose, outra causa de esplenomegalia), **Infecções e infestações da pele** (leishmaniose tegumentar completa), **HIV** (calazar e reativação de Chagas no imunossuprimido) e **Vigilância em saúde** (notificação).`,
      fragmentos: [
        { id: "mal-epidemiologia", titulo: "Transmissão, epidemiologia e quando suspeitar", conferir: true,
          questoes: ["q-usprp2021-021","q-uspsp2-102","q-gdmalaria-001","q-gdmalaria-002","q-gdmalaria-004","q-gdmalaria-010","q-gdmalaria-011","q-gdmalaria-015","q-gdmalaria-017"],
          prosa: `[[Febre com calafrio em quem mora ou esteve na região amazônica é malária até prova em contrário, mesmo sem viagem recente. Fora da Amazônia a letalidade é muito maior porque ninguém pensa no diagnóstico e o tratamento atrasa.|q-gdmalaria-002,q-usprp2021-021]] [[O período de incubação vai de cerca de uma semana a meses, conforme a espécie: febre até alguns meses depois de voltar de área de *falciparum* deve levantar a suspeita.|q-gdmalaria-015,q-gdmalaria-011]] [[A malária volta onde o controle para: sem busca ativa de casos e vigilância do vetor, a transmissão reaparece.|q-uspsp2-102]]`,
          texto: `- Letalidade maior fora da Amazônia: **diagnóstico atrasado**. {q-usprp2021-021}
- Falha na sustentabilidade do controle: **reaparecimento da transmissão**. {q-uspsp2-102}
- Espécie mais prevalente no Brasil: ***P. vivax***. {q-gdmalaria-001}
- Febre e calafrio em Rondônia sem viagem: **malária**. {q-gdmalaria-002}
- Vetor: ***Anopheles***. {q-gdmalaria-004}
- Três espécies no Brasil; transmissão pela **fêmea**; a febre vem **depois** da ruptura das hemácias. {q-gdmalaria-010}
- Reservatório: **só o homem**. {q-gdmalaria-011}
- Suspeitar de *falciparum* até **2 meses** depois da volta. {q-gdmalaria-015}
- Febre a cada 48 horas: ***P. vivax***. {q-gdmalaria-017}` },
        { id: "mal-diagnostico", titulo: "Diagnóstico: gota espessa", conferir: true,
          casos: ["q-tp20222-016","q-tp20251-033"],
          questoes: ["q-amrigs2024-014","q-tp20222-016","q-tp20251-033","q-gdmalaria-016","q-gdmalaria-027"],
          prosa: `[[O diagnóstico é ver o parasita dentro da hemácia: a gota espessa (sangue de punção digital corado pelo Walker ou Giemsa) concentra o sangue, mostra a espécie e permite contar a parasitemia, o que orienta o tratamento; o teste rápido de antígeno serve onde não há microscopista. A sorologia não diagnostica a doença aguda, porque o anticorpo indica infecção passada.|q-amrigs2024-014,q-gdmalaria-016,q-gdmalaria-027]] [[No *vivax* a hemácia parasitada fica aumentada, com trofozoítos ameboides; no *falciparum* aparecem anéis finos, muitas vezes vários por hemácia, e gametócitos em forma de banana.|q-tp20222-016,q-tp20251-033]]`,
          texto: `- Gota espessa (Walker), **sem sorologia**, e sem primaquina se G6PD < 30%. {q-amrigs2024-014}
- Febre com calafrio após Rondônia: reconhecer o **plasmódio na hemácia**. {q-tp20222-016}
- Febre a cada dois dias em Porto Velho: **imagem do *vivax***. {q-tp20251-033}
- Gota espessa: **parasita dentro das hemácias**, corado. {q-gdmalaria-016}
- Teste mais confiável na crise aguda: **esfregaço de sangue (Giemsa)**. {q-gdmalaria-027}` },
        { id: "mal-tratamento", titulo: "Tratamento da malária não grave", conferir: true, diretrizes: ["ms-malaria"],
          figuras: [{ arquivo: "figuras/ciclo-malaria.svg", legenda: "Esquema autoral: ciclo do P. vivax no homem e onde agem a cloroquina e a primaquina." }],
          questoes: ["q-inf-26","q-adap21-021","q-gdmalaria-005","q-gdmalaria-007","q-gdmalaria-014","q-gdmalaria-018","q-gdmalaria-020","q-gdmalaria-024"],
          prosa: `[[O tratamento depende da espécie, da gravidade, da idade e da gestação.|q-gdmalaria-005]] [[No *vivax*, a cloroquina por 3 dias mata as formas do sangue e a primaquina por 7 dias mata os hipnozoítos; sem a primaquina, a febre volta semanas ou meses depois (recaída).|q-inf-26,q-adap21-021,q-gdmalaria-014]] [[A primaquina oxida a hemácia: sem a enzima G6PD, que a protege, ela hemolisa (icterícia, urina escura, dor abdominal nos primeiros dias); com atividade da G6PD abaixo de 30% não se usa, e com atividade intermediária usa-se o esquema de 7 dias com vigilância. Também é contraindicada na gestação e no lactente pequeno, porque a G6PD do feto não pode ser testada.|q-adap21-021,q-gdmalaria-018,q-gdmalaria-020]] [[No *falciparum* não grave usa-se uma combinação com derivado da artemisinina (artemeter com lumefantrina, ou artesunato com mefloquina), que limpa o sangue depressa e não deixa a resistência se instalar.|q-gdmalaria-007,q-gdmalaria-024]]`,
          texto: `- *Vivax*: **cloroquina + primaquina**, para os hipnozoítos. {q-inf-26}
- G6PD intermediária: **cloroquina 3 dias + primaquina 7 dias**. {q-adap21-021}
- Decide o esquema: **gravidade** (internação e esquema especial). {q-gdmalaria-005}
- Artemeter com lumefantrina: ***P. falciparum***. {q-gdmalaria-007}
- Prevenir a recaída do *vivax*: **primaquina**. {q-gdmalaria-014}
- Icterícia e dor no 4º dia de tratamento: **hemólise pela primaquina**, suspender. {q-gdmalaria-018}
- Contraindicada na gestante: **primaquina**. {q-gdmalaria-020}
- *Falciparum* não grave: **combinação com artemisinina**. {q-gdmalaria-024}` },
        { id: "mal-grave", titulo: "Malária grave", conferir: true, diretrizes: ["ms-malaria"],
          questoes: ["q-gdmalaria-003","q-gdmalaria-006","q-gdmalaria-008","q-gdmalaria-009","q-gdmalaria-021","q-gdmalaria-023","q-gdmalaria-026"],
          prosa: `[[São sinais de gravidade: rebaixamento da consciência ou convulsão (malária cerebral), insuficiência renal, icterícia, anemia grave, hipoglicemia, choque, edema pulmonar ou SDRA, sangramento e parasitemia alta. Eles existem também no *vivax*, que então é tratado como grave.|q-gdmalaria-008,q-gdmalaria-006,q-gdmalaria-003]] [[A malária grave interna e recebe artesunato venoso, que derruba a parasitemia mais rápido que o quinino e reduz a mortalidade; a clindamicina é a associada.|q-gdmalaria-021,q-gdmalaria-003,q-gdmalaria-026]] [[O quinino estimula a secreção de insulina, e o parasita consome glicose: o paciente que piora em coma durante o quinino tem de ter a glicemia medida.|q-gdmalaria-023]] [[Heparina, corticoide e manitol não ajudam; o choque recebe volume com cuidado (o pulmão encharca fácil) e a SDRA, ventilação com PEEP.|q-gdmalaria-026]]`,
          texto: `- *Vivax* com icterícia, hipotensão e creatinina 2,1: **internar, artesunato e clindamicina**. {q-gdmalaria-003}
- Não é disfunção da malária grave: **infecção bacteriana secundária** (entre as opções). {q-gdmalaria-006}
- Critério de gravidade: **insuficiência renal**. {q-gdmalaria-008}
- Gravidade = **hospedeiro + espécie + densidade parasitária**. {q-gdmalaria-009}
- *Falciparum* com parasitemia de 7% e coma: **artesunato venoso**. {q-gdmalaria-021}
- Coma durante quinino: **hipoglicemia**. {q-gdmalaria-023}
- Falso na malária grave: **heparina e corticoide** têm papel central. {q-gdmalaria-026}` },
        { id: "mal-viajante", titulo: "Prevenção no viajante", conferir: true, diretrizes: ["ms-malaria"],
          questoes: ["q-gdmalaria-019","q-gdmalaria-022"],
          prosa: `[[No Brasil a prevenção do viajante é a proteção contra a picada (evitar o entardecer e o amanhecer em área de risco, roupa de manga longa, repelente, mosquiteiro), não a quimioprofilaxia: a cura rápida com diagnóstico precoce é mais segura que dar remédio a todos. O risco cresce com transmissão alta no destino, viagem longa, dormir sem proteção e atividade noturna; acima de 1.000 metros quase não há *Anopheles*.|q-gdmalaria-019,q-gdmalaria-022]]`,
          texto: `- Viagem de 10 dias à região Norte: **proteção individual** contra a picada. {q-gdmalaria-019}
- Não aumenta o risco: **altitude acima de 1.000 m**. {q-gdmalaria-022}` },
      ],
    },
    {
      id: "visceral", titulo: "Leishmaniose visceral (calazar)",
      introducao: `[[A *Leishmania infantum* (*L. chagasi*) é transmitida pela picada do flebotomíneo *Lutzomyia longipalpis* (o mosquito-palha); no ambiente urbano o cão é o principal reservatório, e cães doentes ou mortos na vizinhança são pista do diagnóstico. A doença, antes rural e nordestina, expandiu-se para as cidades de todo o país.|q-gdhepatoesplenomegalias-007,q-gdhepatoesplenomegalias-070,q-gdhepatoesplenomegalias-077]] [[O parasita vive dentro dos macrófagos do baço, do fígado e da medula. Quem monta resposta Th1 (interferon-gama ativa o macrófago) controla a infecção sem adoecer, e é a maioria; quem tem resposta Th2 deixa o parasita se multiplicar.|q-gdhepatoesplenomegalias-046,q-gdhepatoesplenomegalias-019]] [[Os macrófagos cheios de parasitas incham o baço e o fígado e ocupam a medula; o baço grande sequestra células. Daí a pancitopenia: anemia (medula ocupada, sequestro, hemólise, sangramento), leucopenia (infecções bacterianas) e plaquetopenia (sangramento de gengiva e nariz). A ativação policlonal dos linfócitos B enche o sangue de gamaglobulina que não protege, e o fígado doente faz pouca albumina: inversão albumina/globulina e edema.|q-gdhepatoesplenomegalias-081,q-gdhepatoesplenomegalias-087,q-gdhepatoesplenomegalias-035]]`,
      fragmentos: [
        { id: "lv-quadro", titulo: "Quadro clínico e laboratório", conferir: true,
          questoes: ["q-tp20231-120","q-famema2022-024","q-gdhepatoesplenomegalias-015","q-gdhepatoesplenomegalias-017","q-gdhepatoesplenomegalias-019","q-gdhepatoesplenomegalias-027","q-gdhepatoesplenomegalias-031","q-gdhepatoesplenomegalias-033","q-gdhepatoesplenomegalias-035","q-gdhepatoesplenomegalias-043","q-gdhepatoesplenomegalias-044","q-gdhepatoesplenomegalias-046","q-gdhepatoesplenomegalias-047","q-gdhepatoesplenomegalias-052","q-gdhepatoesplenomegalias-066","q-gdhepatoesplenomegalias-080","q-gdhepatoesplenomegalias-081","q-gdhepatoesplenomegalias-087","q-gdhepatoesplenomegalias-007","q-gdhepatoesplenomegalias-070","q-gdhepatoesplenomegalias-077"],
          prosa: `[[O quadro clássico é febre irregular por semanas a meses, emagrecimento, palidez e barriga grande, com baço muito aumentado (às vezes até a fossa ilíaca) e fígado aumentado; pode haver diarreia, sangramento e icterícia na fase avançada. Todo morador de área de transmissão com febre e esplenomegalia é caso suspeito.|q-tp20231-120,q-gdhepatoesplenomegalias-015,q-gdhepatoesplenomegalias-044,q-gdhepatoesplenomegalias-052,q-gdhepatoesplenomegalias-066,q-gdhepatoesplenomegalias-080]] [[O hemograma mostra pancitopenia, sem leucocitose nem plaquetose; a VHS sobe pela gamaglobulina, a albumina cai e as transaminases podem subir.|q-gdhepatoesplenomegalias-035,q-gdhepatoesplenomegalias-087,q-famema2022-024,q-gdhepatoesplenomegalias-043]] [[O diferencial da febre prolongada com esplenomegalia inclui malária, febre tifoide, esquistossomose, linfoma e leucemia, tuberculose e doença de Chagas aguda; a procedência e a pancitopenia com inversão albumina/globulina apontam para o calazar.|q-gdhepatoesplenomegalias-017,q-gdhepatoesplenomegalias-027,q-gdhepatoesplenomegalias-031,q-gdhepatoesplenomegalias-033,q-gdhepatoesplenomegalias-047]]`,
          texto: `- Criança de Araçatuba com febre, hepatoesplenomegalia e citopenias: **teste rápido e aspirado de medula**. {q-tp20231-120}
- Febre de 8 semanas no Pantanal com pancitopenia: tratar com **anfotericina B**. {q-famema2022-024}
- Febre, emagrecimento, baço grande e pancitopenia: **leishmaniose visceral**. {q-gdhepatoesplenomegalias-015,q-gdhepatoesplenomegalias-031,q-gdhepatoesplenomegalias-033,q-gdhepatoesplenomegalias-043,q-gdhepatoesplenomegalias-044,q-gdhepatoesplenomegalias-047,q-gdhepatoesplenomegalias-052}
- Brasileiro do sertão morando fora, com baço a 7 cm e petéquias: **calazar**. {q-gdhepatoesplenomegalias-017}
- Falso: a forma assintomática é **a minoria** (é a maioria). {q-gdhepatoesplenomegalias-019}
- Indígena com febre e hepatoesplenomegalia: **calazar ou linfoma; teste rápido e medula**. {q-gdhepatoesplenomegalias-027}
- Alteração comum: **VHS elevada**. {q-gdhepatoesplenomegalias-035}
- Resolução da infecção: **interferon-gama (Th1)**. {q-gdhepatoesplenomegalias-046}
- **Hepatomegalia e esplenomegalia volumosa**. {q-gdhepatoesplenomegalias-066}
- Febre longa, emagrecimento, hepatoesplenomegalia e sangramento: **não excluir calazar**. {q-gdhepatoesplenomegalias-080}
- Anemia = **hemólise + medula ocupada + sangramento + sequestro**. {q-gdhepatoesplenomegalias-081}
- **Anemia, leucopenia e hipoalbuminemia**. {q-gdhepatoesplenomegalias-087}
- Cão é a **fonte de infecção urbana**; coleira com deltametrina reduz a doença canina. {q-gdhepatoesplenomegalias-007}
- Vetor: ***Lutzomyia longipalpis***. {q-gdhepatoesplenomegalias-070,q-gdhepatoesplenomegalias-077}` },
        { id: "lv-diagnostico", titulo: "Diagnóstico", conferir: true, diretrizes: ["ms-lv"],
          questoes: ["q-gdhepatoesplenomegalias-014","q-gdhepatoesplenomegalias-036","q-gdhepatoesplenomegalias-037","q-gdhepatoesplenomegalias-067","q-gdhepatoesplenomegalias-068","q-gdhepatoesplenomegalias-072","q-gdhepatoesplenomegalias-075","q-gdhepatoesplenomegalias-078","q-gdhepatoesplenomegalias-086","q-gdhepatoesplenomegalias-088","q-gdhepatoesplenomegalias-090","q-gdhepatoesplenomegalias-091","q-tp20231-120"],
          prosa: `[[O teste rápido imunocromatográfico com antígeno rK39 é o primeiro exame: fácil, feito na unidade e, com o quadro clínico, autoriza o tratamento; a imunofluorescência indireta com título de 1:80 ou mais também é critério.|q-gdhepatoesplenomegalias-067,q-gdhepatoesplenomegalias-068,q-gdhepatoesplenomegalias-036,q-gdhepatoesplenomegalias-088]] [[O parasitológico mostra as formas amastigotas dentro dos macrófagos: a punção do baço é a mais sensível (90 a 95%), mas sangra; o aspirado de medula óssea (mielograma) é o exame seguro e mais usado.|q-gdhepatoesplenomegalias-072,q-gdhepatoesplenomegalias-075,q-gdhepatoesplenomegalias-086,q-gdhepatoesplenomegalias-088,q-gdhepatoesplenomegalias-037,q-gdhepatoesplenomegalias-090,q-gdhepatoesplenomegalias-091]] [[A intradermorreação de Montenegro mede imunidade celular, que está deprimida no calazar ativo: fica negativa e não serve para o diagnóstico.|q-gdhepatoesplenomegalias-014,q-gdhepatoesplenomegalias-078]]`,
          texto: `- Montenegro **não confirma** calazar. {q-gdhepatoesplenomegalias-014}
- Diagnóstico: **imunofluorescência e aspirado de medula**. {q-gdhepatoesplenomegalias-036}
- Febre e esplenomegalia em Várzea Grande: **aspirado de medula; calazar**. {q-gdhepatoesplenomegalias-037}
- Conduta diagnóstica inicial: **antígeno rK39**. {q-gdhepatoesplenomegalias-067}
- **IFI 1:80** preenche critério laboratorial. {q-gdhepatoesplenomegalias-068}
- Maior chance de confirmar: **aspirado esplênico**. {q-gdhepatoesplenomegalias-072,q-gdhepatoesplenomegalias-075}
- Montenegro **não** diagnostica. {q-gdhepatoesplenomegalias-078}
- Punção do baço: **90 a 95%** de sensibilidade. {q-gdhepatoesplenomegalias-086}
- No aspirado de medula veem-se **amastigotas**, não promastigotas. {q-gdhepatoesplenomegalias-088}
- Ictérico com febre de 40 dias: **mielograma**. {q-gdhepatoesplenomegalias-090,q-gdhepatoesplenomegalias-091}
- Criança com citopenias: **teste rápido e medula**. {q-tp20231-120}` },
        { id: "lv-tratamento", titulo: "Tratamento", conferir: true, diretrizes: ["ms-lv"],
          questoes: ["q-famema2022-024","q-gdhepatoesplenomegalias-006","q-gdhepatoesplenomegalias-030","q-gdhepatoesplenomegalias-060","q-gdhepatoesplenomegalias-062","q-gdhepatoesplenomegalias-069","q-gdhepatoesplenomegalias-014","q-gdhepatoesplenomegalias-079","q-gdhepatoesplenomegalias-086","q-gdhepatoesplenomegalias-088"],
          prosa: `[[São leishmanicidas o antimonial pentavalente (antimoniato de meglumina), as anfotericinas e a pentamidina. O antimonial é cardiotóxico (prolonga o QT), nefro e pancreatotóxico e contraindicado na gestação; a anfotericina B lipossomal entra no paciente com maior risco de morrer ou de toxicidade: mais de 50 anos ou menos de 1 ano, insuficiência renal, hepática ou cardíaca, gestante, HIV e formas graves.|q-gdhepatoesplenomegalias-006,q-gdhepatoesplenomegalias-060,q-gdhepatoesplenomegalias-030,q-famema2022-024,q-gdhepatoesplenomegalias-014,q-gdhepatoesplenomegalias-086]] [[A forma grave não contraindica a anfotericina: é justamente a indicação dela. O neutropênico febril com calazar recebe antibiótico, porque a leucopenia expõe a infecções bacterianas, e o teste sorológico positivo sem quadro clínico não autoriza tratar.|q-gdhepatoesplenomegalias-014,q-gdhepatoesplenomegalias-088]] [[O benznidazol é da doença de Chagas, não do calazar.|q-gdhepatoesplenomegalias-079]]`,
          texto: `- Idoso com creatinina 2,8: **anfotericina B lipossomal**. {q-gdhepatoesplenomegalias-006,q-gdhepatoesplenomegalias-060}
- Droga indicada: **anfotericina**. {q-gdhepatoesplenomegalias-030,q-famema2022-024}
- Adolescente de Natal com quadro típico: **mielograma e antimonial pentavalente**. {q-gdhepatoesplenomegalias-062}
- Droga mais usada (prova antiga): **antimoniato de meglumina**. {q-gdhepatoesplenomegalias-069}
- Falso: anfotericina **contraindicada** na forma grave. {q-gdhepatoesplenomegalias-014}
- Calazar **não** se trata com benznidazol. {q-gdhepatoesplenomegalias-079}
- Antimonial age nas **amastigotas** e é contraindicado na gestação. {q-gdhepatoesplenomegalias-086}
- Neutropenia febril no calazar: **hemoculturas e antibiótico**. {q-gdhepatoesplenomegalias-088}` },
      ],
    },
    {
      id: "tegumentar", titulo: "Leishmaniose tegumentar",
      introducao: `[[A leishmaniose tegumentar (*L. braziliensis*, sobretudo) é transmitida por flebotomíneos em área de mata e plantação: começa como pápula que ulcera e forma uma úlcera indolor, arredondada, de bordas elevadas em moldura e fundo granuloso, nas áreas expostas. A biópsia mostra granuloma com amastigotas dentro dos macrófagos.|q-unesp2022-059,q-unesp2022-093,q-unicampdis2023-025]] A versão completa (forma mucosa, diferencial com esporotricose e paracoccidioidomicose) está no resumo **Infecções e infestações da pele**.`,
      fragmentos: [
        { id: "lt-diagnostico-tratamento", titulo: "Diagnóstico e tratamento", conferir: true, diretrizes: ["ms-leishmaniose"],
          casos: ["q-unesp2022-059","q-unicampdis2023-025"],
          questoes: ["q-unesp2022-059","q-unesp2022-093","q-unesp2025-059","q-unicampdis2023-025"],
          prosa: `[[Confirma-se com o parasitológico direto (amastigotas no esfregaço ou no imprint da borda da lesão) antes de tratar.|q-unesp2022-093]] [[O tratamento de base é o antimoniato de meglumina; quando o antimonial é perigoso (cardiopatia com distúrbio de condução, doença renal, idade, gestação), a escolha é a anfotericina B lipossomal.|q-unesp2022-059,q-unesp2025-059]]`,
          texto: `- Úlcera de bordas elevadas com granuloma e amastigotas: **leishmaniose tegumentar; antimoniato de meglumina**. {q-unesp2022-059}
- Lesão típica na UBS: **parasitológico direto da lesão**. {q-unesp2022-093}
- Chagásico com bloqueio e DRC: **anfotericina B lipossomal**. {q-unesp2025-059}
- Úlcera tibial que não cicatriza: **leishmaniose cutânea**. {q-unicampdis2023-025}` },
      ],
    },
    {
      id: "chagas", titulo: "Doença de Chagas",
      introducao: `[[O *Trypanosoma cruzi* é eliminado nas fezes do triatomíneo (barbeiro) enquanto ele pica; a pessoa coça e leva o parasita à ferida ou à conjuntiva. Com o controle do vetor e do sangue, ganharam peso as outras vias: oral (caldo de cana e açaí contaminados, em surtos), vertical, transfusional e por transplante; a reativação no imunossuprimido (transplante, HIV) é problema emergente.|q-gdhepatoesplenomegalias-082,q-gdhepatoesplenomegalias-083,q-gdhepatoesplenomegalias-005,q-gdhepatoesplenomegalias-026]] [[Na fase aguda o parasita circula em grande número (vê-se no sangue) e invade células do coração, do sistema nervoso autônomo do tubo digestivo e de outros tecidos. A resposta imune derruba a parasitemia em semanas a poucos meses, mas não elimina o parasita: na fase crônica ele persiste nos tecidos, com parasitemia baixa e intermitente, e a inflamação lenta destrói miocárdio, sistema de condução e plexos nervosos do esôfago e do cólon.|q-gdhepatoesplenomegalias-025,q-gdhepatoesplenomegalias-029,q-gdhepatoesplenomegalias-018]]`,
      fragmentos: [
        { id: "cha-aguda", titulo: "Transmissão e fase aguda", conferir: true,
          casos: ["q-usprp2027-081"],
          questoes: ["q-usprp2027-081","q-gdhepatoesplenomegalias-005","q-gdhepatoesplenomegalias-009","q-gdhepatoesplenomegalias-021","q-gdhepatoesplenomegalias-023","q-gdhepatoesplenomegalias-024","q-gdhepatoesplenomegalias-025","q-gdhepatoesplenomegalias-026","q-gdhepatoesplenomegalias-034","q-gdhepatoesplenomegalias-059","q-gdhepatoesplenomegalias-076","q-gdhepatoesplenomegalias-082","q-gdhepatoesplenomegalias-083","q-gdhepatoesplenomegalias-085"],
          prosa: `[[A porta de entrada vetorial pode deixar marca: o sinal de Romaña (edema bipalpebral unilateral, entrada pela conjuntiva) ou o chagoma de inoculação na pele; a reação à picada sozinha não confirma infecção, e na transmissão transfusional ou oral não há sinal de porta.|q-gdhepatoesplenomegalias-034,q-gdhepatoesplenomegalias-024,q-gdhepatoesplenomegalias-082,q-gdhepatoesplenomegalias-085]] [[A fase aguda dá febre prolongada, adenomegalia, hepatoesplenomegalia e edema, e a miocardite é comum, quase sempre benigna; dura semanas, não um ano. A incubação é de 4 a 15 dias na vetorial, 3 a 22 dias na oral e 30 a 40 dias ou mais na transfusional.|q-gdhepatoesplenomegalias-025,q-gdhepatoesplenomegalias-076,q-gdhepatoesplenomegalias-009]] [[Na transmissão oral o inóculo é grande: surtos familiares ou comunitários (açaí, caldo de cana) com febre, exantema, sangramento digestivo, icterícia e miocardite mais grave, e mortalidade maior que na vetorial.|q-gdhepatoesplenomegalias-023,q-usprp2027-081,q-gdhepatoesplenomegalias-083]] [[Como o parasita circula, a fase aguda se diagnostica pelo exame direto do sangue (a fresco, gota espessa ou esfregaço; melhor com febre e no primeiro mês); o exame a fresco é mais sensível que o esfregaço corado. A doença aguda é de notificação obrigatória, e a mãe com Chagas aguda não amamenta.|q-gdhepatoesplenomegalias-021,q-gdhepatoesplenomegalias-083,q-gdhepatoesplenomegalias-059]] [[A transfusão ainda importa: é a principal via nos países não endêmicos (migrantes), e por isso a triagem no banco de sangue é obrigatória.|q-gdhepatoesplenomegalias-026,q-gdhepatoesplenomegalias-005]]`,
          texto: `- Surto febril numa vila do Pará com tripomastigota no sangue: **benznidazol**. {q-usprp2027-081}
- Reativação no **transplante e na imunodeficiência** é desafio emergente. {q-gdhepatoesplenomegalias-005}
- Incubação: **4–15 dias vetorial, 3–22 oral, 30–40 transfusional**. {q-gdhepatoesplenomegalias-009}
- Falso: o exame a fresco é **menos** sensível que o esfregaço. {q-gdhepatoesplenomegalias-021}
- Transmissão oral: morbimortalidade **maior**. {q-gdhepatoesplenomegalias-023}
- Chagoma de inoculação e Romaña: **sinais de porta de entrada**. {q-gdhepatoesplenomegalias-024}
- Febre da fase aguda **não dura 12 meses**. {q-gdhepatoesplenomegalias-025}
- Transfusão **importa** nos centros urbanos. {q-gdhepatoesplenomegalias-026}
- Romaña: **porta de entrada conjuntival**. {q-gdhepatoesplenomegalias-034}
- Aleitamento suspenso: **Chagas aguda**. {q-gdhepatoesplenomegalias-059}
- Coração acometido em **90%** dos agudos, quase sempre benigno. {q-gdhepatoesplenomegalias-076}
- A reação à picada **não confirma** a infecção. {q-gdhepatoesplenomegalias-082}
- Chagas aguda: **notificação, açaí e caldo de cana, insuficiência cardíaca, benznidazol**. {q-gdhepatoesplenomegalias-083}
- Transfusional **não** tem sinal de Romaña. {q-gdhepatoesplenomegalias-085}` },
        { id: "cha-cronica", titulo: "Fase crônica: indeterminada, cardíaca e digestiva", conferir: true,
          questoes: ["q-gdhepatoesplenomegalias-018","q-gdhepatoesplenomegalias-020","q-gdhepatoesplenomegalias-022","q-gdhepatoesplenomegalias-029","q-gdhepatoesplenomegalias-039","q-gdhepatoesplenomegalias-048","q-gdhepatoesplenomegalias-050","q-gdhepatoesplenomegalias-056","q-gdhepatoesplenomegalias-057","q-gdhepatoesplenomegalias-089"],
          prosa: `[[A maioria dos infectados fica na forma indeterminada: sorologia positiva, sem sintomas, com eletrocardiograma, radiografia de tórax, esôfago e cólon normais; pode ficar assim a vida toda ou evoluir, anos depois, para a forma cardíaca, digestiva ou mista.|q-gdhepatoesplenomegalias-039,q-gdhepatoesplenomegalias-029,q-gdhepatoesplenomegalias-048]] [[A forma cardíaca (cerca de 30% dos crônicos) é a que mais mata: miocardiopatia dilatada com insuficiência cardíaca, arritmias e bloqueios (o bloqueio de ramo direito com hemibloqueio anterior esquerdo é típico, porque a inflamação atinge o sistema de condução), aneurisma de ponta, tromboembolismo e morte súbita. É uma das principais indicações de transplante cardíaco no Brasil.|q-gdhepatoesplenomegalias-022,q-gdhepatoesplenomegalias-018,q-gdhepatoesplenomegalias-050,q-gdhepatoesplenomegalias-089,q-gdhepatoesplenomegalias-020]] [[A forma digestiva vem da destruição dos plexos nervosos: megaesôfago (disfagia) e megacólon (constipação). Na fase crônica o parasita quase não circula, então o diagnóstico é sorológico (dois testes de princípios diferentes), e o megacólon se demonstra pelo enema opaco.|q-gdhepatoesplenomegalias-056,q-gdhepatoesplenomegalias-057]]`,
          texto: `- Falso: a cardiopatia chagásica **poupa o sistema de condução**. {q-gdhepatoesplenomegalias-018}
- Chagas: **terceira causa** de transplante cardíaco no Brasil (a prova). {q-gdhepatoesplenomegalias-020}
- Forma cardíaca: **miocardiopatia dilatada e insuficiência cardíaca**. {q-gdhepatoesplenomegalias-022}
- Falso: a forma indeterminada **nunca** evolui. {q-gdhepatoesplenomegalias-029}
- Forma crônica mais frequente: **indeterminada**. {q-gdhepatoesplenomegalias-039,q-gdhepatoesplenomegalias-048}
- Não é fator de pior prognóstico: **sinal de Romaña**. {q-gdhepatoesplenomegalias-050}
- Constipação crônica no chagásico: **sorologia**, não pesquisa no sangue. {q-gdhepatoesplenomegalias-056}
- Comprometimento intestinal: **exame contrastado**. {q-gdhepatoesplenomegalias-057}
- Forma cardíaca é a mais **expressiva** em prevalência e morbimortalidade. {q-gdhepatoesplenomegalias-089}` },
        { id: "cha-tratamento", titulo: "Tratamento antiparasitário", conferir: true, diretrizes: ["pcdt-chagas"],
          questoes: ["q-usprp2027-081","q-gdhepatoesplenomegalias-053","q-gdhepatoesplenomegalias-071","q-gdhepatoesplenomegalias-084","q-gdhepatoesplenomegalias-009","q-gdhepatoesplenomegalias-083"],
          prosa: `[[O benznidazol é a primeira escolha e o nifurtimox, a alternativa (dá mais polineuropatia, convulsão e sintomas digestivos). O tratamento funciona quando há muito parasita e pouca lesão: trata-se toda fase aguda (qualquer via), a congênita, a reativação, a criança e o adolescente com forma crônica e o adulto com infecção recente; não se trata a cardiopatia avançada (insuficiência cardíaca classe IV), em que o dano já está feito.|q-usprp2027-081,q-gdhepatoesplenomegalias-053,q-gdhepatoesplenomegalias-071,q-gdhepatoesplenomegalias-084,q-gdhepatoesplenomegalias-009,q-gdhepatoesplenomegalias-083]]`,
          texto: `- Chagas aguda: **benznidazol**. {q-usprp2027-081,q-gdhepatoesplenomegalias-083}
- Adolescente ou adulto com infecção crônica **recente**: tratar. {q-gdhepatoesplenomegalias-053}
- **Não** tratar na insuficiência cardíaca classe IV. {q-gdhepatoesplenomegalias-071}
- Polineuropatia e convulsão: **nifurtimox**. {q-gdhepatoesplenomegalias-084}
- Falso: nifurtimox como primeira escolha (é o **benznidazol**). {q-gdhepatoesplenomegalias-009}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["ms-malaria","ms-lv"],
          questoes: ["q-gdmalaria-024","q-gdhepatoesplenomegalias-069","q-gdhepatoesplenomegalias-062","q-gdhepatoesplenomegalias-019","q-gdhepatoesplenomegalias-086","q-gdhepatoesplenomegalias-088","q-gdhepatoesplenomegalias-020","q-gdmalaria-006"],
          prosa: `[[**Malária por *falciparum* não grave**: os esquemas do Ministério da Saúde são artemeter com lumefantrina ou artesunato com mefloquina; a prova (gdmalaria-024) marcou "artemeter e mefloquina", combinação que não existe como esquema, por ser a única com derivado da artemisinina entre as opções.|q-gdmalaria-024]] [[**Calazar**: a anfotericina B lipossomal ampliou seu espaço (risco, idade, rim, gestação, HIV); as provas antigas deram o antimoniato de meglumina como "a droga mais usada" (069) e como o tratamento do adolescente com quadro típico (062).|q-gdhepatoesplenomegalias-069,q-gdhepatoesplenomegalias-062]] [[**Formas do parasita**: no hospedeiro humano a *Leishmania* é amastigota (dentro do macrófago); promastigota é a forma do inseto. As questões 086 e 088 esconderam o erro em "promastigotas".|q-gdhepatoesplenomegalias-086,q-gdhepatoesplenomegalias-088]] [[**Negações**: na 019 a afirmação errada é dizer que a forma assintomática é a minoria (é a maioria); na gdmalaria-006 a infecção bacteriana secundária foi tratada como não sendo manifestação de disfunção orgânica, embora a bacteremia por *Salmonella* ocorra na malária grave da criança.|q-gdhepatoesplenomegalias-019,q-gdmalaria-006]] [[**Números**: a posição de Chagas entre as indicações de transplante cardíaco e a proporção (35%) variam entre séries; a prova (020) cobrou "terceira causa".|q-gdhepatoesplenomegalias-020]]`,
          texto: `- Regra: artemeter + lumefantrina ou artesunato + mefloquina; a prova marcou "artemeter e mefloquina". {q-gdmalaria-024}
- Regra: anfotericina lipossomal nos grupos de risco; provas antigas deram o antimonial como mais usado. {q-gdhepatoesplenomegalias-069,q-gdhepatoesplenomegalias-062}
- Na medula e no baço: **amastigotas**; promastigota é a forma do inseto. {q-gdhepatoesplenomegalias-086,q-gdhepatoesplenomegalias-088}
- A forma assintomática é **a maioria**. {q-gdhepatoesplenomegalias-019}
- Bacteremia secundária existe na malária grave; a prova a deu como exceção. {q-gdmalaria-006}
- Transplante por Chagas: a prova cobrou **terceira causa**. {q-gdhepatoesplenomegalias-020}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: febre com esplenomegalia",
      introducao: `Resumo dos capítulos para separar as três protozooses que as provas põem lado a lado.`,
      fragmentos: [
        { id: "cmp-esplenomegalia", titulo: "Malária, calazar e Chagas aguda", conferir: true,
          questoes: ["q-gdhepatoesplenomegalias-017","q-gdhepatoesplenomegalias-027","q-gdhepatoesplenomegalias-033","q-gdhepatoesplenomegalias-037","q-gdhepatoesplenomegalias-079","q-tp20231-120"],
          prosa: `[[A pergunta é sempre: de onde vem, há quanto tempo tem febre e o que mostra o sangue.|q-gdhepatoesplenomegalias-017,q-gdhepatoesplenomegalias-027,q-gdhepatoesplenomegalias-037,q-tp20231-120]]

| | Malária | Leishmaniose visceral | Chagas aguda |
| Vetor ou via | *Anopheles* (fêmea) | *Lutzomyia* (cão reservatório) | triatomíneo; oral (açaí), transfusão |
| Onde | Amazônia | cidades e Nordeste, em expansão | surtos na Amazônia (oral) |
| Febre | em crises (48 ou 72 horas), dias | irregular, semanas a meses | contínua, semanas |
| Baço | aumentado | muito aumentado, com pancitopenia | aumentado, com adenomegalia e miocardite |
| Diagnóstico | gota espessa | rK39 e aspirado de medula | parasita no sangue (exame direto) |
| Tratamento | cloroquina + primaquina (*vivax*); artemisinina (*falciparum*) | anfotericina B ou antimonial | benznidazol |`,
          texto: `- Febre longa com baço grande e pancitopenia em migrante do sertão: **calazar**. {q-gdhepatoesplenomegalias-017,q-gdhepatoesplenomegalias-033}
- Diferencial com linfoma: **teste rápido e medula**. {q-gdhepatoesplenomegalias-027}
- Sem viagem, baço grande: **aspirado de medula**, não gota espessa. {q-gdhepatoesplenomegalias-037}
- Benznidazol é de Chagas, **não** do calazar. {q-gdhepatoesplenomegalias-079}
- Criança urbana de Araçatuba: **calazar**, não Chagas nem esquistossomose. {q-tp20231-120}` },
      ],
    },
  ],
});
