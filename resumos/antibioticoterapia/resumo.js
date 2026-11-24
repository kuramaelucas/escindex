/* resumos/antibioticoterapia/resumo.js — resumo adaptativo de antibioticoterapia e resistência bacteriana:
   alvos e farmacologia (PK/PD), mecanismos de resistência e uso racional, espectro das classes, escolha pelo
   agente isolado (MRSA, enterococo, ESBL, KPC, Pseudomonas, Acinetobacter), escolha pelo sítio e pelo paciente
   (abdome, neutropenia febril, C. difficile), toxicidade e gestação, armadilhas e tabela das classes.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- antibioticoterapia */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "antibioticoterapia",
  titulo: "Antibioticoterapia e resistência bacteriana",
  assunto: "ass-atb",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "idsa-amr", texto: "IDSA — 2026 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections (AMR Guidance, versão de 30/07/2026, idsociety.org): ESBL, AmpC, CRE (KPC, NDM, OXA-48), Pseudomonas DTR e CRAB", lidoEm: "2026-11-23" },
    { id: "pcdt-ist", texto: "Ministério da Saúde — Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (PCDT-IST), 2022 (gonorreia)", lidoEm: "2026-11-19" },
    { id: "idsa-mrsa", texto: "IDSA — Clinical practice guidelines for the treatment of MRSA infections in adults and children (Liu et al., Clin Infect Dis 2011)", lidoEm: null },
    { id: "sis-intraabdominal", texto: "Surgical Infection Society — Revised guidelines on the management of intra-abdominal infection (Mazuski et al., 2017) e WSES 2017", lidoEm: null },
    { id: "idsa-neutropenia", texto: "IDSA — Clinical practice guideline for the use of antimicrobial agents in neutropenic patients with cancer (Freifeld et al., 2010) e atualização pediátrica de 2023 (Lehrnbecher et al.)", lidoEm: null },
    { id: "idsa-cdi", texto: "IDSA/SHEA — Focused update on management of Clostridioides difficile infection in adults (2021)", lidoEm: null },
    { id: "rename-aware", texto: "Ministério da Saúde — Relação Nacional de Medicamentos Essenciais (RENAME) 2022 e classificação AWaRe da OMS (acesso, alerta, reserva)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição", questoes: ["q-fmabc2025-040","q-gdantibioticos-024","q-gdantibioticos-032","q-gdantibioticos-050","q-gdantibioticos-054"] },
  ],
  doencas: [
    {
      id: "bases", titulo: "Como os antibióticos agem",
      introducao: `[[O antibiótico só funciona porque ataca uma estrutura que a bactéria tem e a célula humana não tem, ou tem muito diferente: a parede de peptidoglicano, o ribossomo 70S (subunidades 30S e 50S), as topoisomerases bacterianas (DNA-girase e topoisomerase IV), a via de síntese do ácido fólico e a membrana externa dos Gram-negativos.|q-inf-04,q-gdantibioticos-098,q-gdantibioticos-092]] [[Quem não tem parede (*Mycoplasma*, e os intracelulares como *Chlamydia* e *Legionella*, que escapam dos betalactâmicos dentro da célula) não responde a betalactâmicos nem a carbapenêmicos; para esses "atípicos" servem macrolídeos, tetraciclinas e quinolonas.|q-gdantibioticos-096]]

[[A parede do Gram-positivo é uma camada grossa de peptidoglicano, exposta; a do Gram-negativo é fina e fica escondida atrás de uma membrana externa que só deixa passar o que entra pelas porinas. Por isso o efeito do betalactâmico depende de duas coisas: chegar à PBP (atravessar a membrana externa sem ser destruído) e ter afinidade por ela.|q-gdantibioticos-060]]

Veja também: **Sepse** (antibiótico na primeira hora), **Infecções relacionadas à assistência à saúde** (profilaxia cirúrgica, cateter, pneumonia hospitalar e a versão completa da colite por *C. difficile*), **Pneumonia adquirida na comunidade**, **Meningites**, **Infecções sexualmente transmissíveis** (esquemas da gonorreia) e **Infecções de pele e partes moles**.`,
      fragmentos: [
        { id: "bas-alvos", titulo: "Alvos: parede, ribossomo, DNA, folato e membrana", conferir: true,
          figuras: [{ arquivo: "figuras/alvos.svg", legenda: "Esquema autoral: onde age cada classe de antibiótico na célula bacteriana." }],
          questoes: ["q-inf-04","q-gdantibioticos-087","q-gdantibioticos-101","q-gdantibioticos-104","q-gdantibioticos-098","q-gdantibioticos-092","q-gdantibioticos-123","q-gdantibioticos-067","q-gdantibioticos-060","q-gdantibioticos-096"],
          prosa: `[[Os betalactâmicos (penicilinas, cefalosporinas, carbapenêmicos e monobactâmico) imitam o fim da cadeia do peptidoglicano e se ligam às PBPs, as enzimas que fazem as pontes da parede; sem as pontes, a bactéria que cresce se rompe. Vancomicina (agarra o próprio peptídeo da parede), bacitracina e fosfomicina (etapas mais precoces da síntese) também agem na parede e também são bactericidas.|q-inf-04,q-gdantibioticos-087,q-gdantibioticos-101,q-gdantibioticos-104,q-gdantibioticos-123,q-gdantibioticos-067,q-gdantibioticos-098]] [[As quinolonas travam a DNA-girase e a topoisomerase IV e quebram o DNA; macrolídeos, clindamicina, cloranfenicol e linezolida param o ribossomo na subunidade 50S; aminoglicosídeos e tetraciclinas, na 30S.|q-gdantibioticos-092]] [[Os glicopeptídeos agem na parede (não no ribossomo), e as polimixinas, como detergentes, desfazem a membrana externa dos Gram-negativos.|q-gdantibioticos-098,q-gdantibioticos-060]]`,
          texto: `- Betalactâmicos: **inibem a síntese da parede** ligando-se às **PBPs**. {q-inf-04,q-gdantibioticos-098}
- Betalactâmicos = **penicilinas, cefalosporinas e carbapenêmicos**. {q-gdantibioticos-067}
- Também na parede: **vancomicina, bacitracina** (e penicilina). {q-gdantibioticos-087,q-gdantibioticos-101,q-gdantibioticos-104}
- **Fosfomicina**: bactericida, age na parede. {q-gdantibioticos-123}
- Lesão do DNA bacteriano: **quinolonas**. {q-gdantibioticos-092}
- Efeito do betalactâmico = **afinidade pela PBP + chegar até ela**. {q-gdantibioticos-060}
- Sem parede (*Mycoplasma*): **carbapenêmicos não agem**. {q-gdantibioticos-096}` },
        { id: "bas-pkpd", titulo: "Farmacocinética e farmacodinâmica: tempo ou pico", conferir: true,
          figuras: [{ arquivo: "figuras/pk-pd.svg", legenda: "Esquema autoral: curva de concentração × tempo, com pico (Cmáx), concentração inibitória mínima (CIM) e tempo acima da CIM." }],
          casos: ["q-amrigs2023-001"],
          questoes: ["q-amrigs2022-009","q-amrigs2023-001","q-gdantibioticos-003","q-gdantibioticos-097","q-gdantibioticos-064","q-gdantibioticos-051","q-gdantibioticos-108","q-gdantibioticos-109","q-gdantibioticos-083"],
          prosa: `[[A farmacocinética diz como a droga chega e sai (absorção, distribuição, eliminação); a farmacodinâmica, o que ela faz com a bactéria. Juntas, decidem dose, via e intervalo: mais efeito com menos toxicidade.|q-gdantibioticos-064]] [[Os aminoglicosídeos (e as quinolonas) matam conforme o pico: quanto maior a concentração sobre a CIM, mais rápida a morte, e o efeito pós-antibiótico segura a bactéria quando o nível cai. Por isso a amicacina e a gentamicina vão em dose única diária, que também dá tempo ao rim e ao ouvido de eliminar a droga.|q-amrigs2022-009,q-gdantibioticos-003,q-gdantibioticos-097]] [[Os betalactâmicos dependem do tempo acima da CIM: subir a dose não ajuda tanto quanto manter o nível; daí as doses frequentes e a infusão prolongada da piperacilina-tazobactam e do meropenem no paciente grave. Na curva, o betalactâmico de meia-vida curta (oxacilina) cai rápido; o aminoglicosídeo faz pico alto.|q-amrigs2022-009,q-amrigs2023-001,q-gdantibioticos-097]] [[A penicilina G cristalina tem meia-vida curta (doses a cada 4 horas), é destruída pelo ácido do estômago (só venosa) e sai pelo rim por secreção tubular na forma ativa.|q-gdantibioticos-051]] [[As quinolonas são bem absorvidas por boca e bactericidas, mas cátions (alumínio, magnésio, cálcio, ferro) e o sucralfato as quelam no intestino; o antiácido que só reduz a acidez (IBP, anti-H2) não atrapalha.|q-gdantibioticos-108,q-gdantibioticos-109]] [[No imunodeprimido prefere-se droga bactericida, porque sem defesa a morte da bactéria depende só do remédio; no idoso, a função renal e hepática menor aumenta o efeito adverso.|q-gdantibioticos-083]]`,
          texto: `- **Concentração-dependentes**: gentamicina, ciprofloxacino; **tempo-dependentes**: azitromicina, piperacilina-tazobactam, meropenem. {q-amrigs2022-009}
- Curva que cai rápido = **oxacilina**; pico alto = **amicacina**. {q-amrigs2023-001}
- Dose única diária: **amicacina**. {q-gdantibioticos-003}
- Cmáx nos aminoglicosídeos, **T > CIM** nos betalactâmicos, **infusão prolongada** da piperacilina-tazobactam. {q-gdantibioticos-097}
- PK + sensibilidade do agente ajustam **dose, via e intervalo**. {q-gdantibioticos-064}
- Penicilina G: excreção renal **na forma ativa**. {q-gdantibioticos-051}
- Quinolonas: **antiácido com cátion e sucralfato** reduzem a absorção; IBP não. {q-gdantibioticos-108}
- Quinolonas: **bactericidas**, agem no DNA. {q-gdantibioticos-109}
- Imunodeprimido: **bactericida**; idoso: **menor função renal e hepática**. {q-gdantibioticos-083}` },
      ],
    },
    {
      id: "resistencia", titulo: "Resistência bacteriana e uso racional",
      introducao: `[[A bactéria resiste de quatro jeitos: destrói a droga (betalactamases), troca o alvo (PBP ou topoisomerase mutada), impede a entrada (perda de porinas) ou bombeia a droga para fora (efluxo). Os genes vêm de mutação ou chegam prontos em plasmídeos, que passam de uma bactéria a outra.|q-gdantibioticos-016,q-gdantibioticos-091,q-gdantibioticos-126]] [[O antibiótico não cria a resistência: ele seleciona. Cada uso mata as sensíveis e deixa crescer as resistentes, no paciente e no hospital; por isso o uso indiscriminado é o principal motor da multirresistência.|q-gdantibioticos-113]]`,
      fragmentos: [
        { id: "res-gram-positivos", titulo: "Estafilococo e pneumococo: penicilinase e PBP alterada", conferir: true,
          casos: ["q-tp20231-032"],
          questoes: ["q-tp20222-019","q-tp20231-032","q-gdantibioticos-001","q-gdantibioticos-091","q-gdantibioticos-126","q-iamspe2025-011"],
          prosa: `[[Quase todo *S. aureus* produz penicilinase, a betalactamase que abre o anel da penicilina; a meticilina e a oxacilina foram feitas para resistir a ela.|q-tp20222-019]] [[O MRSA vai além: o gene **mecA**, no cromossomo, codifica a PBP2a, uma PBP que quase não se liga aos betalactâmicos. Como o alvo mudou, nenhum betalactâmico comum (nem com inibidor de betalactamase) funciona.|q-tp20231-032,q-gdantibioticos-001,q-gdantibioticos-091]] [[O pneumococo não tem betalactamase: resiste à penicilina por PBPs modificadas (mosaico), que pedem dose maior.|q-gdantibioticos-126]] [[Nas quinolonas, a resistência sobe em degraus: cada mutação nas topoisomerases (gyrA e parC) aumenta a CIM, e a soma de duas leva à resistência de alto nível.|q-iamspe2025-011]]`,
          texto: `- Coco Gram-positivo coagulase-positivo que falha à penicilina e responde à meticilina: ***S. aureus*, betalactamase**. {q-tp20222-019}
- Resistência à oxacilina: **gene mecA cromossômico**, resistência aos demais betalactâmicos. {q-tp20231-032}
- MRSA: **PBP alterada**. {q-gdantibioticos-001,q-gdantibioticos-091}
- Pneumococo resistente à penicilina: **mudança na PBP**. {q-gdantibioticos-126}
- Quinolonas: **mutações em etapas (gyrA e parC)**. {q-iamspe2025-011}` },
        { id: "res-gram-negativos", titulo: "Gram-negativos: ESBL, AmpC e carbapenemases", conferir: false, diretrizes: ["idsa-amr"],
          questoes: ["q-gdantibioticos-016","q-gdantibioticos-070","q-gdantibioticos-028","q-gdantibioticos-048","q-gdantibioticos-018"],
          prosa: `[[Nos Gram-negativos a arma principal é a betalactamase. O inibidor (clavulanato, sulbactam, tazobactam) se sacrifica pela enzima e protege o anel do antibiótico parceiro.|q-gdantibioticos-016,q-gdantibioticos-070]] [[As **ESBL** hidrolisam penicilinas e cefalosporinas até a 4ª geração, mas não os carbapenêmicos, que são o tratamento das infecções graves por elas.|q-gdantibioticos-018]] [[*Enterobacter*, *Citrobacter freundii* e *Klebsiella aerogenes* carregam uma AmpC cromossômica induzível: o teste pode mostrar sensibilidade à ceftriaxona, mas a exposição liga a enzima e a resistência aparece durante o tratamento; por isso evitam-se as cefalosporinas de 3ª geração e prefere-se cefepima.|q-gdantibioticos-028]] [[A **KPC** é uma carbapenemase: destrói até os carbapenêmicos.|q-gdantibioticos-048]]`,
          texto: `- Resistência à cefalosporina por **enzima que inativa a droga**. {q-gdantibioticos-016}
- Inibidor de betalactamase **impede a quebra do anel** do antibiótico. {q-gdantibioticos-070}
- AmpC cromossômica: **falsa sensibilidade in vitro** às cefalosporinas. {q-gdantibioticos-028}
- KPC = **carbapenemase**. {q-gdantibioticos-048}
- ESBL: **carbapenêmicos**. {q-gdantibioticos-018}` },
        { id: "res-uso-racional", titulo: "Uso racional: foco, culturas, descalonamento e AWaRe", conferir: true, diretrizes: ["rename-aware"],
          questoes: ["q-inf-06","q-gdantibioticos-031","q-gdantibioticos-113","q-gdantibioticos-062","q-gdantibioticos-047","q-fmabc2023-045","q-gdsepse-075"],
          prosa: `[[Antibiótico se escolhe pelo foco: o local da infecção diz quais agentes são prováveis. Culturas se colhem antes, porque são elas que depois permitem descalonar, isto é, trocar o esquema amplo por um estreito guiado pelo antibiograma, o que reduz pressão seletiva, toxicidade e custo.|q-inf-06,q-gdantibioticos-031]] [[No paciente séptico a lógica se inverte no começo: o esquema empírico é amplo (às vezes combinado, o que aumenta a chance de ao menos uma droga ser ativa), porque o atraso e a cobertura inadequada matam; o descalonamento vem quando a cultura chega.|q-gdsepse-075]] [[Uso racional também é não tratar o que não é infecção (bacteriúria assintomática do idoso) e não usar carbapenêmico e vancomicina onde não há indicação (apendicite comum); na sepse neonatal precoce o esquema clássico é ampicilina com aminoglicosídeo ou cefotaxima.|q-gdantibioticos-062,q-gdantibioticos-113]] [[Na neonatologia, o uso livre de cefalosporina de 3ª geração seleciona ESBL, o carbapenêmico fica restrito e a vancomicina sai quando a bactéria é sensível à oxacilina; cultura de ponta de cateter ou de sonda urinária, com hemocultura negativa, não define tratamento (é colonização).|q-gdantibioticos-047]] [[A RENAME 2022 adotou a classificação da OMS para antimicrobianos: **acesso** (primeira linha), **alerta** (maior risco de resistência) e **reserva** (último recurso).|q-fmabc2023-045]]`,
          texto: `- Descalonar = **trocar o amplo pelo estreito guiado pela cultura**. {q-inf-06}
- **O foco orienta a escolha** dos agentes prováveis. {q-gdantibioticos-031}
- Principal pressão de resistência: **uso indiscriminado**. {q-gdantibioticos-113}
- Prescrição racional: **cefotaxima e ampicilina na sepse neonatal**. {q-gdantibioticos-062}
- Cultura de ponta de cateter com hemocultura negativa **não define tratamento**. {q-gdantibioticos-047}
- Acesso, alerta e reserva: classificação dos **antimicrobianos** na RENAME. {q-fmabc2023-045}
- Sepse: empírico amplo; combinação **aumenta** a chance de cobertura. {q-gdsepse-075}` },
      ],
    },
    {
      id: "espectro", titulo: "Espectro das classes",
      introducao: `[[Cada geração de cefalosporina troca um pouco de força contra Gram-positivos por mais alcance contra Gram-negativos: a 1ª (cefalotina, cefazolina, cefalexina) é antiestafilocócica; a 2ª (cefuroxima; cefoxitina, que cobre anaeróbios) amplia para Gram-negativos comunitários; a 3ª (ceftriaxona, cefotaxima) entra no líquor e cobre enterobactérias, e a ceftazidima cobre *Pseudomonas*; a 4ª (cefepima) junta Gram-positivo e *Pseudomonas*; a 5ª (ceftarolina) é a única que alcança o MRSA.|q-gdantibioticos-046,q-gdantibioticos-100,q-gdantibioticos-105,q-gdantibioticos-019,q-gdantibioticos-065]] [[O enterococo tem PBPs de baixa afinidade e resiste por natureza a todas as cefalosporinas e à oxacilina; ampicilina e vancomicina ainda o alcançam.|q-gdantibioticos-116,q-gdantibioticos-099]]`,
      fragmentos: [
        { id: "esp-cefalosporinas", titulo: "Cefalosporinas: gerações, líquor e lacunas", conferir: true,
          questoes: ["q-gdantibioticos-046","q-gdantibioticos-081","q-gdantibioticos-100","q-gdantibioticos-105","q-gdantibioticos-095","q-gdantibioticos-116","q-gdantibioticos-099","q-gdantibioticos-019"],
          prosa: `[[As cefamicinas (cefoxitina, cefmetazol, cefotetana) são de 2ª geração e as únicas cefalosporinas com boa ação sobre *Bacteroides*, por isso entraram na profilaxia da cirurgia de cólon.|q-gdantibioticos-105,q-gdantibioticos-100]] [[A cefazolina só existe injetável (a oral de 1ª geração é a cefalexina), e a cefalexina não serve para infecção urinária de cateter, que é hospitalar.|q-gdantibioticos-100]] [[Entram no líquor as que atravessam a barreira inflamada: cefuroxima, ceftriaxona, cefotaxima, ceftazidima e cefepima; as orais antigas, como o cefaclor, não.|q-gdantibioticos-095]] [[A cefepima, de largo espectro e antipseudomonas, é de 4ª geração; a de 3ª geração antipseudomonas é a ceftazidima.|q-gdantibioticos-081]]`,
          texto: `- 2ª geração: **cefuroxima**. {q-gdantibioticos-046}
- Largo espectro e antipseudomonas entre as opções: **cefepima**. {q-gdantibioticos-081}
- **Cefoxitina**: anaeróbios, profilaxia do cólon. {q-gdantibioticos-100}
- 2ª geração ativas contra *Bacteroides*: **cefoxitina e cefmetazol**. {q-gdantibioticos-105}
- Não atravessa a barreira hematoencefálica: **cefaclor**. {q-gdantibioticos-095}
- Enterococo: **resistente às cefalosporinas** de 1ª a 3ª geração. {q-gdantibioticos-116}
- Age na parede sem cobrir enterococo: **oxacilina**. {q-gdantibioticos-099}
- Cefalosporina contra MRSA: **ceftarolina**. {q-gdantibioticos-019}` },
        { id: "esp-antipseudomonas", titulo: "Antipseudomonas, carbapenêmicos e associações com inibidor", conferir: true,
          questoes: ["q-inf-05","q-gdantibioticos-036","q-gdantibioticos-065","q-gdantibioticos-071","q-gdantibioticos-086","q-gdantibioticos-056"],
          prosa: `[[Cobrem *Pseudomonas*: piperacilina-tazobactam, ceftazidima, cefepima, imipenem e meropenem, aztreonam, ciprofloxacino e levofloxacino, aminoglicosídeos e polimixinas. Não cobrem: ceftriaxona, ampicilina-sulbactam, ertapenem e azitromicina.|q-inf-05,q-gdantibioticos-036,q-gdantibioticos-065]] [[O ertapenem é o carbapenêmico de meia-vida longa (dose única diária), útil contra enterobactérias com ESBL e contra anaeróbios, mas sem ação confiável sobre *Pseudomonas* e *Acinetobacter*: não serve para pneumonia hospitalar.|q-gdantibioticos-071,q-gdantibioticos-086]] [[O imipenem é o carbapenêmico que mais baixa o limiar convulsivo; o meropenem, menos.|q-gdantibioticos-071]] [[O sulbactam tem ação própria sobre *Acinetobacter*, por isso a ampicilina-sulbactam o alcança; a piperacilina-tazobactam fica para Gram-negativo sem ESBL, como a *Klebsiella* comum.|q-gdantibioticos-086,q-gdantibioticos-056]]`,
          texto: `- Pneumonia da ventilação com risco de *Pseudomonas*: **piperacilina-tazobactam**. {q-inf-05}
- Sem ação antipseudomonas: **ertapenem**. {q-gdantibioticos-036}
- **Ceftazidima**: Gram-negativos, sobretudo *Pseudomonas*. {q-gdantibioticos-065}
- Convulsão é **mais do imipenem** que do meropenem. {q-gdantibioticos-071}
- Ertapenem **não é antipseudomonas**; ampicilina-sulbactam age no *Acinetobacter*. {q-gdantibioticos-086}
- Piperacilina-tazobactam: ***Klebsiella* não produtora de ESBL**. {q-gdantibioticos-056}` },
        { id: "esp-outras", titulo: "Quinolonas, macrolídeos, tópicos e os novos anti-Gram-positivos", conferir: true, diretrizes: ["pcdt-ist"],
          questoes: ["q-gdantibioticos-042","q-gdantibioticos-052","q-gdantibioticos-068","q-gdantibioticos-041","q-gdantibioticos-076","q-gdantibioticos-080","q-gdantibioticos-118","q-gdantibioticos-107","q-gdantibioticos-119","q-gdantibioticos-120","q-gdantibioticos-004"],
          prosa: `[[O ciprofloxacino é forte contra Gram-negativos aeróbios (urina, próstata, infecção crônica tratada por boca) e fraco contra estreptococos; não é primeira escolha em criança, em gestante nem na cistite não complicada. O gonococo ficou resistente às quinolonas, e o PCDT trata a gonorreia com ceftriaxona e azitromicina.|q-gdantibioticos-042,q-gdantibioticos-052,q-gdantibioticos-068,q-gdantibioticos-041]] [[A coqueluche trata-se com macrolídeo (azitromicina, claritromicina ou eritromicina), e o sulfametoxazol-trimetoprima é a alternativa; a amoxicilina não age.|q-gdantibioticos-076]] [[Na pele, o tópico contra Gram-positivo é mupirocina ou ácido fusídico; a gentamicina tópica é a menos indicada (Gram-negativo e seleção de resistência).|q-gdantibioticos-080]] [[A vancomicina só alcança Gram-positivos; o aztreonam só Gram-negativos aeróbios, sem nefrotoxicidade, e substitui o aminoglicosídeo quando o rim ou o ouvido sofrem.|q-gdantibioticos-118]] [[Os novos anti-Gram-positivos: **linezolida** (oxazolidinona, só Gram-positivos, inclusive MRSA, VRE, pneumococo resistente e *M. tuberculosis*; não trata colite por *C. difficile*), **daptomicina** (bacteremia e endocardite por MRSA; é inativada pelo surfactante, então não trata pneumonia) e **tigeciclina** (glicilciclina de amplo espectro, com MRSA, enterococo, anaeróbios, ESBL, KPC e *Acinetobacter*, sem *Pseudomonas*, com nível sérico baixo, imprópria para bacteremia). A **polimixina B** fica para Gram-negativos multirresistentes.|q-gdantibioticos-107,q-gdantibioticos-119,q-gdantibioticos-120,q-gdantibioticos-004]]`,
          texto: `- Ciprofloxacino **não** é primeira escolha na ITU não complicada de menor de 18 anos e gestante. {q-gdantibioticos-042,q-gdantibioticos-052}
- Quinolonas não são indicadas em **infecções estreptocócicas**. {q-gdantibioticos-068}
- Uretrite gonocócica: as **quinolonas** deixaram de ser recomendadas. {q-gdantibioticos-041}
- Coqueluche: **amoxicilina não** é opção. {q-gdantibioticos-076}
- Tópico menos indicado contra Gram-positivos: **gentamicina**. {q-gdantibioticos-080}
- **Vancomicina não cobre Gram-negativos**; aztreonam substitui aminoglicosídeo. {q-gdantibioticos-118}
- Tigeciclina: amplo espectro **sem *Pseudomonas***; linezolida: **Gram-positivos e VRE**; ampicilina-sulbactam: ***Acinetobacter***; daptomicina: **bacteremia e endocardite por MRSA, não pneumonia**; polimixina: **Gram-negativo multirresistente**. {q-gdantibioticos-107}
- Glicilciclina = **tigeciclina**; oxazolidinona = **linezolida**; endocardite por estafilococo resistente: **vancomicina ou daptomicina**; ESBL: **carbapenêmico**; candidemia grave: **equinocandina**. {q-gdantibioticos-119}
- Daptomicina na endocardite por MRSA, amoxicilina-clavulanato no pé diabético, meropenem na pneumonia da ventilação, metronidazol no *C. difficile* (a prova; hoje, vancomicina oral ou fidaxomicina), azitromicina no atípico. {q-gdantibioticos-120}
- Oxazolidinona **não é primeira escolha na colite por *C. difficile***. {q-gdantibioticos-004}` },
      ],
    },
    {
      id: "agentes", titulo: "Escolha pelo agente isolado",
      introducao: `[[Com a cultura na mão, a escolha segue o mecanismo de resistência: para o estafilococo sensível à oxacilina, o betalactâmico antiestafilocócico (oxacilina ou cefazolina) mata mais rápido que a vancomicina; para o MRSA, vancomicina ou daptomicina; para enterobactéria com ESBL fora da urina, carbapenêmico; para carbapenemase, as associações novas com inibidor.|q-gdantibioticos-089,q-gdantibioticos-063,q-unifesp2025-027,q-adap25-027,q-fmabc2024-012]]`,
      fragmentos: [
        { id: "age-gram-positivos", titulo: "MSSA, MRSA e enterococo resistente à vancomicina", conferir: true, diretrizes: ["idsa-mrsa"],
          questoes: ["q-unifesp2025-027","q-gdantibioticos-014","q-gdantibioticos-106","q-gdantibioticos-089","q-gdantibioticos-063","q-gdantibioticos-059","q-gdantibioticos-025","q-gdantibioticos-044","q-gdantibioticos-117","q-gdantibioticos-125","q-gdantibioticos-015"],
          prosa: `[[Na bacteremia por MRSA (cateter, hemodiálise) a droga de base é a vancomicina; a daptomicina é a alternativa e serve inclusive na bacteremia complicada; teicoplanina, linezolida e sulfametoxazol-trimetoprima não são a escolha inicial da forma grave.|q-unifesp2025-027,q-gdantibioticos-014,q-gdantibioticos-106,q-gdantibioticos-059]] [[Se a cultura mostra *S. aureus* sensível à oxacilina, troca-se a vancomicina por oxacilina ou cefazolina: a ampicilina é destruída pela penicilinase e a quinolona ou o macrolídeo não tratam o MRSA.|q-gdantibioticos-089,q-gdantibioticos-063]] [[No recém-nascido com osteomielite e bacteremia por MRSA comunitário, a vancomicina é o padrão; o D-teste negativo mostra que a clindamicina funcionaria (não há resistência induzível), mas não para a doença invasiva grave.|q-gdantibioticos-025]] [[Na infecção de prótese, a bactéria vive em biofilme: a rifampicina (sempre associada, para não selecionar resistência) e a daptomicina são as que penetram nele.|q-gdantibioticos-044]] [[O *Enterococcus faecium* resistente à vancomicina trata-se com linezolida (ou daptomicina; antes, quinupristina-dalfopristina).|q-gdantibioticos-117,q-gdantibioticos-125]]`,
          texto: `- Bacteremia por MRSA na hemodiálise: **vancomicina**. {q-unifesp2025-027}
- MRSA em cateter profundo: **vancomicina**. {q-gdantibioticos-014,q-gdantibioticos-106}
- Bacteremia por MRSA complicada: **daptomicina** entre as opções. {q-gdantibioticos-059}
- *S. aureus* sensível à oxacilina: **oxacilina**. {q-gdantibioticos-089}
- MSSA: **cefazolina**. {q-gdantibioticos-063}
- Osteomielite neonatal por CA-MRSA: **vancomicina é o padrão**. {q-gdantibioticos-025}
- Biofilme de prótese: **rifampicina e daptomicina**. {q-gdantibioticos-044}
- *E. faecium* resistente à vancomicina: **linezolida e quinupristina-dalfopristina**. {q-gdantibioticos-117,q-gdantibioticos-125}
- MRSA → teicoplanina; ESBL → meropenem; *Pseudomonas* resistente a carbapenêmico → **polimixina**. {q-gdantibioticos-015}` },
        { id: "age-gram-negativos", titulo: "ESBL, KPC, Pseudomonas e Acinetobacter", conferir: false, diretrizes: ["idsa-amr"],
          casos: ["q-unifesp2026-033"],
          questoes: ["q-adap25-027","q-adap26-033","q-sirio2027-005","q-fmabc2024-012","q-gdantibioticos-013","q-gdantibioticos-022","q-gdantibioticos-103","q-unifesp2026-033"],
          prosa: `[[Na infecção fora da urina ou com bacteremia por enterobactéria com ESBL, a IDSA prefere o carbapenêmico (meropenem ou imipenem no paciente grave) e não sugere piperacilina-tazobactam nem cefepima, mesmo quando o antibiograma diz "sensível": o efeito de inóculo e o ensaio clínico mostraram pior resultado. A dose dobrada de ceftriaxona não vence uma enzima que a destrói.|q-adap25-027,q-adap26-033]] [[O paciente que já teve ESBL e chega em choque com Gram-negativo recebe carbapenêmico no empírico.|q-sirio2027-005]] [[Na enterobactéria resistente a carbapenêmico por KPC (sem metalobetalactamase), a ceftazidima-avibactam é preferida; tigeciclina e eravaciclina não servem para corrente sanguínea nem urina.|q-fmabc2024-012]] [[Com *Pseudomonas* sensível aos betalactâmicos tradicionais, eles têm preferência sobre o carbapenêmico, em dose máxima e infusão prolongada, junto do controle do foco (drenagem da coleção).|q-unifesp2026-033]] [[A polimixina B fica para o Gram-negativo multirresistente (*Pseudomonas*, *Acinetobacter*, KPC), quase sempre associada; *Serratia* e *Proteus* têm resistência natural a ela. No *Acinetobacter* resistente a carbapenêmico, o sulbactam é a base (hoje sulbactam-durlobactam; ampicilina-sulbactam em dose alta como ponte, combinada).|q-gdantibioticos-013,q-gdantibioticos-103,q-gdantibioticos-022]]`,
          texto: `- Bacteremia por *E. coli* ESBL: **meropenem**. {q-adap25-027,q-adap26-033}
- Cateter de diálise com choque e ESBL prévia: **meropenem**. {q-sirio2027-005}
- *Klebsiella* com carbapenemase sem NDM: **ceftazidima-avibactam**. {q-fmabc2024-012}
- Gram-negativo multirresistente: **polimixina B com meropenem**. {q-gdantibioticos-013}
- *Acinetobacter* após falha da piperacilina-tazobactam: **ampicilina-sulbactam**. {q-gdantibioticos-022}
- Prescrição de polimixina B: ***Pseudomonas* multirresistente** (não *Serratia*). {q-gdantibioticos-103}
- Coleção pós-operatória com *Pseudomonas*: **piperacilina-tazobactam ou meropenem, dose máxima e infusão prolongada**. {q-unifesp2026-033}` },
      ],
    },
    {
      id: "sitios", titulo: "Escolha pelo sítio e pelo paciente",
      introducao: `[[No abdome, a flora é a do intestino: enterobactérias Gram-negativas (*E. coli*, a que mais transloca) e anaeróbios (*Bacteroides fragilis*), muitas vezes juntos; o esquema empírico cobre os dois.|q-gdantibioticos-010,q-gdantibioticos-077,q-gdantibioticos-011,q-gdantibioticos-053]] [[Na neutropenia o neutrófilo, que contém a bactéria, falta: a infecção progride em horas, com poucos sinais, e o Gram-negativo (inclusive *Pseudomonas*) mata se o antibiótico atrasar.|q-unesp2025-043,q-usprp2026-100]] [[O antibiótico de amplo espectro também mata a flora do cólon que segura o *Clostridioides difficile*, cuja toxina causa a colite pseudomembranosa.|q-uspsp3-098]]`,
      fragmentos: [
        { id: "sit-abdome", titulo: "Infecção intra-abdominal", conferir: true, diretrizes: ["sis-intraabdominal"],
          questoes: ["q-uspsp4-061","q-gdantibioticos-009","q-gdantibioticos-010","q-gdantibioticos-077","q-gdantibioticos-011","q-gdantibioticos-053","q-gdantibioticos-102","q-gdantibioticos-049","q-gdantibioticos-122","q-gdantibioticos-066","q-gdantibioticos-021","q-iamspe2021-022"],
          prosa: `[[A escolha empírica depende do sítio de origem, da gravidade, de ser comunitária ou hospitalar e do antibiótico recente; a presença de pus é a que menos muda o esquema.|q-iamspe2021-022]] [[Na peritonite comunitária sem gravidade bastam Gram-negativo + anaeróbio (ceftriaxona com metronidazol, ou ciprofloxacino com metronidazol); na séptica, reoperada ou hospitalar, um betalactâmico antipseudomonas com anaeróbio e enterococo (piperacilina-tazobactam ou carbapenêmico).|q-gdantibioticos-049,q-gdantibioticos-102,q-uspsp4-061,q-gdantibioticos-122]] [[Na ferida de internação longa, o Gram-positivo que aparece é o enterococo, selecionado pelas cefalosporinas que não o cobrem.|q-gdantibioticos-009]] [[Na pancreatite com necrose extensa que piora no 7º dia, suspeita-se de necrose infectada, e o carbapenêmico (imipenem) é o que penetra no pâncreas.|q-gdantibioticos-066]] [[Na CPRE com obstrução biliar, a profilaxia mira os Gram-negativos aeróbios da bile (ciprofloxacino).|q-gdantibioticos-021]]`,
          texto: `- Peritonite fecal com choque após reoperação: **piperacilina-tazobactam**. {q-uspsp4-061}
- Ferida de internação longa: **enterococo**. {q-gdantibioticos-009}
- Peritonites: **Gram-negativos**. {q-gdantibioticos-010,q-gdantibioticos-077}
- Translocação intestinal: ***E. coli***. {q-gdantibioticos-011}
- Pneumoperitônio após dor em fossa ilíaca direita: **Gram-negativos e anaeróbios**. {q-gdantibioticos-053}
- Diverticulite perfurada: **ciprofloxacino e metronidazol**. {q-gdantibioticos-102}
- Aeróbio + anaeróbio: **ceftriaxona e metronidazol**. {q-gdantibioticos-049}
- Gram-negativo, anaeróbio e *E. faecalis*: **imipenem e piperacilina-tazobactam**. {q-gdantibioticos-122}
- Necrose pancreática que piora: **imipenem**. {q-gdantibioticos-066}
- CPRE: **Gram-negativos aeróbios, ciprofloxacino**. {q-gdantibioticos-021}
- Menos relevante na escolha empírica: **secreção purulenta**. {q-iamspe2021-022}` },
        { id: "sit-neutropenia", titulo: "Neutropenia febril", conferir: true, diretrizes: ["idsa-neutropenia"],
          casos: ["q-usprp2026-100"],
          questoes: ["q-usprp2026-100","q-unesp2025-043","q-unesp2026-046"],
          prosa: `[[Febre 7 a 10 dias depois da quimioterapia (o nadir dos neutrófilos) é neutropenia febril até prova em contrário, com neutrófilos abaixo de 500/mm³: colhem-se culturas e começa-se em até 1 hora um betalactâmico antipseudomonas (cefepima, piperacilina-tazobactam ou carbapenêmico), sem esperar o hemograma e mesmo com o paciente estável. A mucosite é porta de entrada, não o diagnóstico que muda a conduta.|q-usprp2026-100,q-unesp2025-043,q-unesp2026-046]]`,
          texto: `- Neutrófilos 240 e mucosite com febre: **cefepima venosa**. {q-usprp2026-100}
- Febre 8 dias após quimioterapia: **antibiótico antipseudomonas na admissão**. {q-unesp2025-043}
- Febre 7 dias após quimioterapia: **neutropenia febril; culturas e antibiótico empírico**. {q-unesp2026-046}` },
        { id: "sit-cdiff", titulo: "Colite por Clostridioides difficile", conferir: true, diretrizes: ["idsa-cdi"],
          casos: ["q-uspsp3-098"],
          questoes: ["q-uspsp3-098","q-gdantibioticos-029"],
          prosa: `[[Diarreia, febre e dor abdominal depois de internação com antibiótico, com leucocitose alta e cólon espessado na tomografia, é colite por *C. difficile*; o tratamento é antibiótico (vancomicina oral ou fidaxomicina), e a cirurgia fica para megacólon ou perfuração. A vancomicina oral não é absorvida, fica na luz do cólon e age na parede da bactéria.|q-uspsp3-098,q-gdantibioticos-029]] A versão completa (gravidade, recorrência, transplante de microbiota) está no resumo **Infecções relacionadas à assistência à saúde**.`,
          texto: `- Diarreia e peritonismo após internação com antibiótico: **colite pseudomembranosa e antibioticoterapia**. {q-uspsp3-098}
- Vancomicina oral age na **síntese da parede (peptidoglicano)**. {q-gdantibioticos-029}` },
        { id: "sit-agentes", titulo: "Agentes clássicos por sítio", conferir: true,
          casos: ["q-sirio2022-014"],
          questoes: ["q-sirio2022-014","q-gdantibioticos-023","q-gdantibioticos-017","q-gdantibioticos-055","q-gdantibioticos-061"],
          prosa: `[[O estafilococo forma abscesso: pele, osso e articulação, endocardite; o infiltrado apical é da tuberculose.|q-gdantibioticos-023,q-sirio2022-014]] [[A *Pseudomonas* coloniza o muco espesso da fibrose cística (mucoviscidose) e é o agente mais provável da pneumonia nesses pacientes.|q-gdantibioticos-055,q-sirio2022-014]] [[A clamídia, intracelular obrigatória, causa psitacose (*C. psittaci*) e, a *C. trachomatis*, uretrite, doença inflamatória pélvica, linfogranuloma e conjuntivite, não artrite séptica; o estreptococo se associa ao eritema nodoso.|q-gdantibioticos-017,q-sirio2022-014]] [[O gonococo aparece como diplococo Gram-negativo dentro do neutrófilo.|q-gdantibioticos-061]]`,
          texto: `- Estreptococo → eritema nodoso; estafilococo → foliculite; *Pseudomonas* → fibrose cística; clamídia → psitacose. {q-sirio2022-014}
- Não sugere estafilococo: **infiltrado pulmonar apical**. {q-gdantibioticos-023}
- *C. trachomatis* não causa **artrite séptica**. {q-gdantibioticos-017}
- Mucoviscidose: ***Pseudomonas aeruginosa***. {q-gdantibioticos-055}
- Gonorreia: **diplococo Gram-negativo intracelular**. {q-gdantibioticos-061}` },
      ],
    },
    {
      id: "toxicidade", titulo: "Toxicidade, ajuste de dose e gestação",
      introducao: `[[O efeito adverso segue o órgão onde a droga se acumula ou o alvo humano que ela imita: o aminoglicosídeo se concentra no túbulo renal e na endolinfa (rim e ouvido); a quinolona tira o magnésio do colágeno (tendão, aorta) e mexe nos canais cardíacos (QT); o carbapenêmico compete com o GABA (convulsão); o cloranfenicol atinge o ribossomo da mitocôndria (medula) e não é conjugado pelo fígado imaturo do recém-nascido.|q-gdantibioticos-057,q-gdantibioticos-069,q-gdantibioticos-007,q-gdantibioticos-037,q-gdantibioticos-084]]`,
      fragmentos: [
        { id: "tox-efeitos", titulo: "Efeitos adversos que a prova cobra", conferir: true,
          questoes: ["q-gdantibioticos-007","q-gdantibioticos-012","q-gdantibioticos-037","q-gdantibioticos-057","q-gdantibioticos-069","q-gdantibioticos-084","q-gdantibioticos-121","q-sessp2025-007","q-gdantibioticos-033"],
          prosa: `[[Quinolonas: tendinite e ruptura do tendão de Aquiles, aneurisma e dissecção de aorta, prolongamento do QT; não são ototóxicas.|q-gdantibioticos-069,q-gdantibioticos-007,q-gdantibioticos-012,q-gdantibioticos-033]] [[Aminoglicosídeos: nefrotoxicidade e ototoxicidade (surdez); cloranfenicol: aplasia de medula e síndrome do bebê cinzento; clindamicina: colite pseudomembranosa.|q-gdantibioticos-057,q-gdantibioticos-012,q-gdantibioticos-084]] [[Polimixina: nefrotoxicidade e neurotoxicidade (parestesia, neuropatia); daptomicina: miopatia e pneumonia eosinofílica; imipenem: convulsão.|q-gdantibioticos-121,q-gdantibioticos-037]] [[O metronidazol dá gosto metálico, náusea e efeito antabuse; se o quadro intestinal melhora e a náusea piora, suspende-se o metronidazol.|q-sessp2025-007]]`,
          texto: `- Quinolonas: **aneurisma e dissecção de aorta**. {q-gdantibioticos-007}
- Associação errada: **quinolona – ototoxicidade**. {q-gdantibioticos-012}
- Rebaixa o limiar convulsivo: **imipenem**. {q-gdantibioticos-037}
- Surdez: **gentamicina**. {q-gdantibioticos-057}
- Ruptura do tendão de Aquiles: **quinolona**. {q-gdantibioticos-069}
- Bebê cinzento: **cloranfenicol**. {q-gdantibioticos-084}
- Neuropatia → polimixina; ototoxicidade → gentamicina; convulsão → imipenem; pneumonite eosinofílica → daptomicina; QT → moxifloxacino. {q-gdantibioticos-121}
- Gosto metálico e náusea no 3º dia: **suspender o metronidazol**. {q-sessp2025-007}
- Fluoroquinolonas **alargam o QT**. {q-gdantibioticos-033}` },
        { id: "tox-ajuste", titulo: "Rim e fígado: quem precisa de ajuste", conferir: true,
          questoes: ["q-amrigs2023-033","q-gdantibioticos-073","q-gdantibioticos-082","q-gdantibioticos-094","q-gdantibioticos-110"],
          prosa: `[[Precisa de ajuste renal a droga que sai inteira pelo rim: vancomicina, aminoglicosídeos, carbapenêmicos, a maioria dos betalactâmicos (cefalotina, cefepima). Não precisam a ceftriaxona (eliminação biliar e renal), a clindamicina, o metronidazol (metabolizado no fígado, ajusta-se na insuficiência hepática grave), a azitromicina (biliar), a rifampicina e a eritromicina.|q-amrigs2023-033,q-gdantibioticos-073,q-gdantibioticos-082]] [[São nefrotóxicos os aminoglicosídeos, a vancomicina e a polimixina, e em menor grau algumas cefalosporinas; o metronidazol não é; as penicilinas não são teratogênicas.|q-gdantibioticos-094,q-gdantibioticos-110]]`,
          texto: `- Sem ajuste por insuficiência hepática ou renal: **azitromicina**. {q-amrigs2023-033}
- Não interage com a disfunção renal: **ceftriaxona**. {q-gdantibioticos-073}
- Reduzir a dose na insuficiência renal: **vancomicina**. {q-gdantibioticos-082}
- Não nefrotóxico: **metronidazol**. {q-gdantibioticos-094}
- Falso: **teratogenicidade das penicilinas**. {q-gdantibioticos-110}` },
        { id: "tox-gestacao", titulo: "Gestação e placenta", conferir: true,
          questoes: ["q-gdantibioticos-038","q-gdantibioticos-093","q-gdantibioticos-111"],
          prosa: `[[Na gestação são seguros os betalactâmicos (penicilinas, cefalosporinas), os macrolídeos e, fora do primeiro trimestre, o metronidazol. Evitam-se as tetraciclinas (doxiciclina: depositam-se no osso e no dente fetal), as quinolonas, os aminoglicosídeos (ototoxicidade fetal) e o sulfametoxazol-trimetoprima no primeiro trimestre (antagoniza o folato: defeito do tubo neural).|q-gdantibioticos-038,q-gdantibioticos-093]] [[A azitromicina passa pouco a placenta e não atinge nível terapêutico no feto, por isso não trata a infecção fetal (como a sífilis).|q-gdantibioticos-111]] [[O aminoglicosídeo potencializa o bloqueio neuromuscular do curare, e a cefuroxima atravessa a barreira hematoencefálica.|q-gdantibioticos-093]]`,
          texto: `- Não usar na gravidez: **doxiciclina**. {q-gdantibioticos-038}
- Falso: **penicilinas teratogênicas**; verdadeiro: cotrimoxazol e tubo neural. {q-gdantibioticos-093}
- Não atinge nível terapêutico no feto: **azitromicina**. {q-gdantibioticos-111}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["idsa-amr","pcdt-ist"],
          questoes: ["q-gdantibioticos-081","q-gdantibioticos-042","q-gdantibioticos-052","q-gdantibioticos-041","q-adap25-027","q-adap26-033","q-gdantibioticos-013","q-gdantibioticos-022","q-gdantibioticos-086","q-iamspe2025-011","q-gdantibioticos-066","q-gdantibioticos-117"],
          prosa: `[[**Gerações**: a cefepima é de 4ª geração e a ceftazidima é a de 3ª antipseudomonas; a prova (gdantibioticos-081) chamou a cefepima de "terceira geração de largo espectro e antipseudomonas" e a deu como certa por ser a única antipseudomonas entre as opções.|q-gdantibioticos-081]] [[**Gonorreia**: a regra (PCDT-IST) é ceftriaxona com azitromicina, e as quinolonas saíram por resistência (gdantibioticos-041); duas provas antigas (042 e 052) trataram o ciprofloxacino em dose única como primeira escolha, deixando a exceção só para criança e gestante.|q-gdantibioticos-041,q-gdantibioticos-042,q-gdantibioticos-052]] [[**"Sensível" no antibiograma não basta**: na bacteremia por ESBL a regra é carbapenêmico, mesmo com piperacilina-tazobactam ou cefepima "sensíveis"; a alternativa que oferece a piperacilina-tazobactam por estar sensível é a pegadinha.|q-adap25-027,q-adap26-033]] [[**Combinações para resistentes**: a IDSA 2026 não sugere combinação de rotina na enterobactéria resistente a carbapenêmico, e no *Acinetobacter* resistente prefere sulbactam-durlobactam com carbapenêmico (ampicilina-sulbactam em dose alta só como ponte, combinada); as provas deram polimixina com meropenem (013) e ampicilina-sulbactam isolada (022, 086) como opções corretas.|q-gdantibioticos-013,q-gdantibioticos-022,q-gdantibioticos-086]] [[**Pancreatite**: a regra é não dar antibiótico profilático na necrose estéril; só a suspeita de necrose infectada (piora no 7º dia) justifica o carbapenêmico, como na prova (066).|q-gdantibioticos-066]] [[**Questão discutível**: na resistência do pneumococo à quinolona, a literatura descreve parC como primeiro passo nos Gram-positivos; a banca (iamspe2025-011) deu como correta a sequência gyrA e depois parC.|q-iamspe2025-011]] [[**VRE**: a prova (117) excluiu a teicoplanina mesmo sensível no antibiograma e ficou só com linezolida e quinupristina-dalfopristina.|q-gdantibioticos-117]]`,
          texto: `- Regra: cefepima é de **4ª geração**; a prova a chamou de 3ª. {q-gdantibioticos-081}
- Regra: gonorreia com **ceftriaxona + azitromicina**; provas antigas deram o ciprofloxacino como primeira escolha. {q-gdantibioticos-041,q-gdantibioticos-042,q-gdantibioticos-052}
- Regra: ESBL invasiva → **carbapenêmico**, mesmo com piperacilina-tazobactam "sensível". {q-adap25-027,q-adap26-033}
- Regra IDSA 2026: sem combinação de rotina na CRE; sulbactam-durlobactam no *Acinetobacter*; as provas aceitaram polimixina + meropenem e ampicilina-sulbactam. {q-gdantibioticos-013,q-gdantibioticos-022,q-gdantibioticos-086}
- Regra: antibiótico só na **necrose pancreática infectada**. {q-gdantibioticos-066}
- Questão discutível: a banca deu **gyrA antes de parC** no pneumococo. {q-iamspe2025-011}
- VRE: a prova excluiu a **teicoplanina**. {q-gdantibioticos-117}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: o que cada classe cobre",
      introducao: `Resumo do capítulo de espectro e da escolha pelo agente, para comparar as drogas que as provas fazem trocar entre si.`,
      fragmentos: [
        { id: "cmp-classes", titulo: "Espectro comparado", conferir: true,
          questoes: ["q-gdantibioticos-107","q-gdantibioticos-119","q-gdantibioticos-015","q-gdantibioticos-036","q-gdantibioticos-065","q-gdantibioticos-122"],
          prosa: `[[A pergunta que separa as drogas é sempre a mesma: cobre MRSA? *Pseudomonas*? anaeróbio? enterococo? ESBL?|q-gdantibioticos-107,q-gdantibioticos-119,q-gdantibioticos-015]]

| Droga | MRSA | *Pseudomonas* | Anaeróbios | Enterococo | ESBL |
|---|---|---|---|---|---|
| Ceftriaxona | não | não | não | não | não |
| Ceftazidima / cefepima | não | sim | não | não | não (ESBL invasiva) |
| Ceftarolina | sim | não | não | não | não |
| Ampicilina-sulbactam | não | não | sim | sim | não |
| Piperacilina-tazobactam | não | sim | sim | sim (*faecalis*) | não (fora da urina) |
| Ertapenem | não | não | sim | não | sim |
| Imipenem / meropenem | não | sim | sim | imipenem (*faecalis*) | sim |
| Vancomicina / daptomicina | sim | não | não | sim (VRE: daptomicina) | não |
| Linezolida | sim | não | não | sim (inclusive VRE) | não |
| Tigeciclina | sim | não | sim | sim | sim (não na bacteremia) |
| Polimixina B | não | sim | não | não | sim (reserva) |
| Metronidazol | não | não | sim | não | não |`,
          texto: `- Tigeciclina sem *Pseudomonas*; linezolida com VRE; polimixina para Gram-negativo resistente. {q-gdantibioticos-107,q-gdantibioticos-119}
- Teicoplanina no MRSA, meropenem na ESBL, polimixina na *Pseudomonas* resistente a carbapenêmico. {q-gdantibioticos-015}
- Ertapenem: o carbapenêmico **sem *Pseudomonas***. {q-gdantibioticos-036}
- Ceftazidima: **antipseudomonas**, fraca em Gram-positivo. {q-gdantibioticos-065}
- Gram-negativo + anaeróbio + *E. faecalis*: **imipenem e piperacilina-tazobactam**. {q-gdantibioticos-122}` },
      ],
    },
  ],
});
