/* resumos/cuidados-perioperatorios/resumo.js — resumo adaptativo de cuidados perioperatórios: risco (ASA, cardíaco, pulmonar),
   exames, jejum e recuperação acelerada, medicações, anticoagulação e tromboprofilaxia, transfusão, antibioticoprofilaxia,
   resposta metabólica ao trauma, líquidos e eletrólitos e terapia nutricional.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- cuidados-perioperatorios */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "cuidados-perioperatorios",
  titulo: "Cuidados perioperatórios",
  assunto: "ass-cuidadosperi",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "asa", texto: "American Society of Anesthesiologists — classificação do estado físico (ASA) e orientação de jejum pré-operatório (2023); orientação multissocietária sobre agonistas de GLP-1 no perioperatório (2024)", lidoEm: null },
    { id: "cardio-periop", texto: "ACC/AHA (2024) e ESC (2022) — avaliação cardíaca pré-operatória em cirurgia não cardíaca; índice de risco cardíaco revisado", lidoEm: null },
    { id: "acerto", texto: "Projeto ACERTO e ERAS — recuperação acelerada em cirurgia (jejum, dieta e hidratação)", lidoEm: null },
    { id: "espen", texto: "ESPEN e BRASPEN — terapia nutricional perioperatória e síndrome de realimentação", lidoEm: null },
    { id: "profilaxia-atb", texto: "Antibioticoprofilaxia cirúrgica (ASHP/IDSA/SIS e consensos brasileiros): momento, dose única e repetição", lidoEm: null },
    { id: "tev-periop", texto: "ACCP/CHEST e escore de Caprini — profilaxia de tromboembolismo venoso e manejo perioperatório de anticoagulantes", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "semiologia do abdome (sinais eponímicos), fora do tema", questoes: ["q-fmabc2025-039"] },
    { motivo: "priorização de cirurgias durante a pandemia de Covid-19 (gestão), fora do tema", questoes: ["q-usprp2021-073"] },
    { motivo: "pergunta genérica sobre fundamentos da cirurgia, sem conceito cobrável do perioperatório", questoes: ["q-amrigs2021-028"] },
    { motivo: "anulada pela banca (a reposição, q-sessp2024-028-ia, entra no resumo)", questoes: ["q-sessp2024-028"] },
  ],
  doencas: [
    {
      id: "risco", titulo: "Avaliação pré-operatória: risco, exames e jejum",
      introducao: `[[A avaliação pré-operatória existe para **reduzir a morbidade e a mortalidade** e para estratificar o risco, não para liberar a cirurgia com uma pilha de exames: ela é guiada pela **idade, pelas doenças e pelo porte da operação**, e o paciente jovem e saudável em cirurgia pequena **não precisa de exame nenhum**.|q-simepm89-017,q-uspsp1-034]] O risco do doente (ASA, risco cardíaco, risco pulmonar) e o risco da operação decidem o que pedir, o que manter e o que suspender.

Veja também: **Complicações cirúrgicas** (febre, íleo, deiscência, hemorragia), **Hérnias da parede abdominal**, **Diabetes mellitus** e **Insuficiência cardíaca do adulto** (doenças de base do paciente cirúrgico) e **Atendimento inicial ao politraumatizado (ATLS)** (transfusão no trauma).`,
      fragmentos: [
        { id: "asa", titulo: "Classificação ASA do estado físico", conferir: true, diretrizes: ["asa"],
          questoes: ["q-usprp2025-083","q-famema2025-018","q-tp20251-075"],
          prosa: `A classificação da ASA mede o **estado físico**, e não o porte da operação.

| ASA | Paciente |
|---|---|
| I | hígido |
| II | doença sistêmica **leve**, sem limitação funcional |
| III | doença sistêmica **grave**, com limitação funcional |
| IV | doença sistêmica grave que é **ameaça constante à vida** |
| V | moribundo, que não sobrevive sem a operação |

[[A hipertensão e o diabetes **controlados** em homem de 52 anos são **ASA II**; a hipertensão de **difícil controle**, com PA de 180/115, aumento da área cardíaca e sobrecarga ventricular esquerda (lesão de órgão-alvo), é **ASA III**; e a insuficiência cardíaca **sintomática e pouco controlada**, com hipertensão não tratada, é **ASA IV**.|q-usprp2025-083,q-tp20251-075,q-famema2025-018]]`,
          texto: `- HAS e DM **controlados**, sem limitação: **ASA II**. {q-usprp2025-083}
- HAS de difícil controle com PA 180/115 e lesão de órgão-alvo: **ASA III**. {q-tp20251-075}
- ICC sintomática e pouco controlada com HAS sem tratamento: **ASA IV** (a prova não traz resposta oficial nesta transcrição). {q-famema2025-018}` },
        { id: "exames-preop", titulo: "Exames pré-operatórios e capacidade funcional", conferir: true, diretrizes: ["cardio-periop"],
          questoes: ["q-uspsp1-034","q-simepm89-017","q-amrigs2022-035","q-amrigs2021-025","q-sirio2027-014"],
          prosa: `Exame só entra quando **muda a conduta**. [[O homem de 25 anos, sem comorbidades, para hernioplastia umbilical pequena, **não faz nenhum exame**; em geral, o paciente saudável com menos de 40 anos não precisa de exame complementar; a idade, o sexo e o tipo de operação ditam a necessidade, e o exame normal feito até um ano antes vale se o quadro clínico não mudou.|q-uspsp1-034,q-simepm89-017]] [[Na avaliação do paciente de 68 anos com cardiopatia isquêmica estável, o **Duke Activity Status Index (DASI)** é preferível à estimativa subjetiva do clínico para estratificar a capacidade funcional; a radiografia de tórax não é rotina, a aspirina e o betabloqueador não se suspendem por regra, e o inibidor de bomba não se inicia em todo usuário de aspirina.|q-sirio2027-014]]`,
          texto: `- Jovem, sem comorbidades, hernioplastia umbilical: **nenhum exame**. {q-uspsp1-034}
- Saudáveis com menos de 40 anos em geral **não precisam** de exame; exame de até um ano vale se o quadro não mudou. {q-simepm89-017}
- Capacidade funcional: o **DASI** é preferível à estimativa subjetiva. {q-sirio2027-014}
- Homem de 53 anos, fumante e hipertenso, hernioplastia videolaparoscópica: a prova cobrou **hemograma, radiografia de tórax e ECG** (ver Armadilhas). {q-amrigs2022-035}
- Homem hígido de 40 anos, hernioplastia inguinal: a prova cobrou **creatinina** (ver Armadilhas). {q-amrigs2021-025}` },
        { id: "risco-cardiopulmonar", titulo: "Risco cardíaco e pulmonar", conferir: true, diretrizes: ["cardio-periop"],
          questoes: ["q-adap26-001","q-fmabc2024-024","q-unifesp2026-001","q-amrigs2020-023","q-amrigs2023-032"],
          prosa: `No **risco cardíaco**, o índice revisado (RCRI) conta cirurgia de alto risco (intraperitoneal), insulina, doença coronariana, insuficiência cardíaca, doença cerebrovascular e creatinina acima de 2 mg/dL, um ponto cada. [[O paciente de 68 anos, diabético em uso de insulina, para colectomia (dois pontos), mas **sem sintomas e com capacidade de 4 METs ou mais** (sobe dois lances de escada), **prossegue sem testes adicionais**, porque ecocardiograma, teste ergométrico e cintilografia não mudariam a conduta.|q-adap26-001]] [[A **revascularização** antes de cirurgia não cardíaca só se indica quando já há indicação independente (**tronco da coronária esquerda** ou **três vasos com angina estável**); o betabloqueador **não se interrompe**; e suspender a dupla antiagregação em stent recente **aumenta o risco de trombose**.|q-fmabc2024-024]]

No **risco pulmonar**, [[o DPOC estável (GOLD II, sem exacerbação em seis meses) segue para a cirurgia eletiva, de preferência com **anestesia regional**, **otimização broncodilatadora e fisioterapia respiratória**, sem exames adicionais; são fatores de risco de complicação pulmonar a idade acima de 60 anos, a cirurgia de emergência e a creatinina acima de 1,5 mg/dL, e a hipoalbuminemia grave é fator de ventilação mecânica pós-operatória.|q-unifesp2026-001,q-amrigs2020-023,q-amrigs2023-032]]`,
          texto: `- RCRI de 2 pontos com 4 METs ou mais e sem sintomas: **prosseguir sem testes**. {q-adap26-001}
- Revascularização pré-operatória só se **tronco de coronária esquerda** ou **três vasos com angina estável**; betabloqueador **mantido**. {q-fmabc2024-024}
- DPOC GOLD II estável em artroplastia: **seguir**, anestesia regional, broncodilatador e fisioterapia. {q-unifesp2026-001}
- Risco de complicação pulmonar: **idade acima de 60 anos, cirurgia de emergência, creatinina acima de 1,5**. {q-amrigs2020-023}
- Fator de risco de ventilação mecânica pós-operatória: **hipoalbuminemia** (albumina abaixo de 2,2). {q-amrigs2023-032}` },
        { id: "jejum-acerto", titulo: "Jejum e recuperação acelerada (ACERTO e ERAS)", conferir: true, diretrizes: ["asa","acerto"],
          figuras: [{ arquivo: "figuras/jejum-acerto.svg", legenda: "Esquema autoral: jejum curto e recuperação acelerada em cirurgia eletiva." }],
          questoes: ["q-012","q-adap21-073","q-sessp2024-028-ia","q-iamspe2021-029","q-scmsp2021-023"],
          prosa: `O jejum longo piora o catabolismo e a resistência à insulina e não diminui a aspiração no paciente sem retardo do esvaziamento gástrico. [[O paciente hígido e a cirurgia abdominal eletiva seguem o **jejum curto**: **sólidos até 6 horas** (6 a 8 horas, na versão ERAS) antes da anestesia e **líquidos claros, sem resíduos, até 2 horas**, com **bebida de carboidrato** (maltodextrina, cerca de 200 mL) duas horas antes; o jejum de 12 horas, a partir da meia-noite, e a refeição gordurosa pouco antes estão errados; o leite não é líquido claro.|q-012,q-adap21-073,q-sessp2024-028-ia]]

[[Depois de colecistectomia videolaparoscópica curta, em paciente sem comorbidades, a recuperação acelerada é **dieta líquida no mesmo dia** (5 a 12 horas), **retirada da hidratação venosa em 12 horas** e **sentar fora do leito** no mesmo dia.|q-scmsp2021-023]] [[A **tricotomia** não se faz no quarto, o jejum não é de 8 horas para a água (nem proíbe os remédios de uso contínuo) e o **estrogênio** é suspenso cerca de **quatro semanas** antes, pelo risco de tromboembolismo.|q-iamspe2021-029]]`,
          texto: `- Paciente hígido em colecistectomia eletiva: **sólidos até 6 a 8 horas** e **líquidos claros até 2 horas** antes da indução. {q-012}
- ASA I em protocolo de recuperação acelerada: **refeição leve até 6 horas**, **líquidos claros até 2 horas**, bebida de carboidrato. {q-adap21-073}
- ACERTO: **sólidos 6 horas** e **maltodextrina** até 2 horas antes da indução. {q-sessp2024-028-ia}
- Colecistectomia curta sem comorbidades: **dieta líquida no mesmo dia**, tirar a hidratação em 12 horas, sentar fora do leito. {q-scmsp2021-023}
- **Estrogênio** suspenso cerca de 4 semanas antes; tricotomia no quarto e jejum de 8 horas para água estão errados. {q-iamspe2021-029}` },
      ],
    },
    {
      id: "medicacoes", titulo: "Medicações, anticoagulação, tromboprofilaxia e transfusão",
      introducao: `[[A decisão de manter ou suspender um remédio pesa o **risco de sangramento** contra o **risco de trombose** (ou de descompensação): o clopidogrel se suspende cinco dias antes, a aspirina em prevenção secundária em geral **se mantém**, o betabloqueador **nunca se interrompe de repente**, e os inibidores de SGLT2 se suspendem de três a quatro dias antes.|q-usp2025-043,q-famema2021-014,q-usprp2025-067,q-einstein2026-012]]`,
      fragmentos: [
        { id: "antiagregantes-dm", titulo: "Antiagregantes, metformina e antidiabéticos", conferir: true, diretrizes: ["cardio-periop","asa"],
          figuras: [{ arquivo: "figuras/medicacoes-preop.svg", legenda: "Esquema autoral: medicações a manter e a suspender antes de cirurgia eletiva." }],
          questoes: ["q-usp2023-118","q-usp2025-043","q-iamspe2022-032","q-famema2021-014","q-uspsp2-074","q-usprp2025-067","q-einstein2026-012","q-amrigs2021-024"],
          prosa: `[[O **clopidogrel** inibe de forma irreversível o receptor P2Y12 das plaquetas e o efeito dura de 5 a 7 dias: suspende-se **5 dias antes** da cirurgia eletiva; o stent farmacológico com mais de seis meses permite suspender o clopidogrel e **manter a aspirina**, retomando o clopidogrel no 1º dia de pós-operatório.|q-usp2023-118,q-usp2025-043,q-famema2021-014]] [[A **metformina** se interrompe antes do procedimento pelo risco de acidose láctica com jejum e hipoperfusão; as provas variaram entre **24 horas, 2 dias e até a véspera**.|q-usp2023-118,q-usp2025-043,q-usprp2025-067]] [[Os **inibidores de SGLT2** (empagliflozina, dapagliflozina) se suspendem **3 a 4 dias antes**, pelo risco de **cetoacidose diabética euglicêmica**, e a linagliptina se mantém.|q-usprp2025-067,q-einstein2026-012]]

[[O diabetes **compensado** não é fator de risco independente para infecção pós-operatória: o que aumenta o risco é a **hiperglicemia**, acima de cerca de 180 mg/dL no perioperatório.|q-amrigs2021-024]] [[Na lista com atenolol, bromoprida, pantoprazol, levotiroxina, AAS infantil, clopidogrel, clonazepam e semaglutida, o betabloqueador e o benzodiazepínico se mantêm e os antiagregantes se suspendem; a semaglutida semanal, que a ASA de 2023 mandava suspender uma semana antes, pela orientação multissocietária de 2024 **se mantém** na maioria dos pacientes, com dieta líquida nas 24 horas anteriores quando há risco de estase gástrica (início recente, escalonamento de dose, sintomas digestivos).|q-iamspe2022-032]]`,
          texto: `- Stent há 7 meses, cirurgia de grande porte: **clopidogrel 5 dias antes** e **metformina 2 dias antes**. {q-usp2023-118}
- Hérnia incisional eletiva: **AAS mantido**, **clopidogrel 5 dias antes**, **metformina 24 horas antes**. {q-usp2025-043}
- Stent farmacológico há 6 meses: **AAS mantido** e **clopidogrel suspenso 5 dias antes**, retomado no 1º dia. {q-famema2021-014}
- Colecistectomia com empagliflozina, linagliptina e metformina: **suspender o iSGLT2 4 dias antes**, manter metformina até a véspera e linagliptina. {q-usprp2025-067}
- Dapagliflozina em artroplastia: **suspender o iSGLT2 pelo menos 3 dias antes**. {q-einstein2026-012}
- Diabetes compensado **não** é fator independente de infecção; hiperglicemia é. {q-amrigs2021-024}
- Atenolol e clonazepam **mantidos**, antiagregantes suspensos (a prova cobrou duas medicações). {q-iamspe2022-032}
- AAS em prevenção secundária em herniorrafia com risco hemorrágico moderado a alto: a prova cobrou **suspender 5 a 7 dias** (ver Armadilhas). {q-uspsp2-074}` },
        { id: "anticoag-tev", titulo: "Anticoagulantes e tromboprofilaxia", conferir: true, diretrizes: ["tev-periop"],
          questoes: ["q-tp20202-061","q-uspsp1-029","q-einstein2021-015"],
          prosa: `[[O paciente com **tromboembolismo pulmonar há dois meses** em uso de varfarina (risco trombótico alto) e cirurgia inadiável tem a varfarina suspensa cerca de cinco dias antes, até **INR abaixo de 1,25 a 1,5**, com **ponte de heparina de baixo peso molecular** em dose terapêutica e retomada da anticoagulação no pós-operatório.|q-tp20202-061]] [[Na **doença renal dialítica**, a heparina de baixo peso molecular (enoxaparina) se acumula, e a profilaxia é com **heparina não fracionada** subcutânea; no obeso tabagista após cirurgia abdominal aberta (risco moderado a alto), combinam-se **meias elásticas, deambulação e enoxaparina**.|q-uspsp1-029,q-einstein2021-015]]`,
          texto: `- TEP há 60 dias, varfarina e cirurgia: **ponte com heparina de baixo peso** e cirurgia com INR abaixo de 1,25. {q-tp20202-061}
- Colectomia por neoplasia perfurada em dialítico: **heparina não fracionada**. {q-uspsp1-029}
- Obeso tabagista, laparotomia: **meias elásticas, deambulação e enoxaparina**. {q-einstein2021-015}` },
        { id: "transfusao", titulo: "Transfusão e poupança de sangue", conferir: true,
          questoes: ["q-famema2023-077","q-fmabc2024-035","q-usprp2027-075"],
          prosa: `[[O **recuperador de células (Cell Saver)** aspira o sangue do campo e devolve ao paciente as próprias hemácias, poupando hemocomponentes no intraoperatório.|q-famema2023-077]] [[O **plasma fresco congelado** repõe fatores de coagulação e se indica no **sangramento ativo** ou no risco de sangramento em procedimento de emergência, e não para repor volume, dar suporte nutricional ou imunoglobulinas.|q-fmabc2024-035]] [[Na transfusão de concentrado de hemácias em quem estava com hemoglobina de 6,2 g/dL, quando a oferta supera o consumo, aumenta a **concentração de oxigênio no sangue venoso misto**.|q-usprp2027-075]]`,
          texto: `- Estratégia para reduzir hemocomponentes no intraoperatório: **Cell Saver**. {q-famema2023-077}
- **Plasma fresco congelado**: sangramento ativo ou risco em procedimento de emergência. {q-fmabc2024-035}
- Após transfusão com oferta maior que o consumo: **aumenta o oxigênio no sangue venoso misto**. {q-usprp2027-075}` },
      ],
    },
    {
      id: "profilaxia", titulo: "Antibioticoprofilaxia e cirurgia segura",
      introducao: `[[A antibioticoprofilaxia é **dose única**, dada **até 60 minutos antes da incisão**, para que o tecido tenha nível máximo de antibiótico quando o bisturi corta; ela **não é tratamento**, e prolongá-la no pós-operatório não diminui infecção.|q-einstein2026-023,q-famerp2023-052,q-amrigs2021-032]]`,
      fragmentos: [
        { id: "profilaxia-atb", titulo: "Quando, quanto e em que cirurgia", conferir: true, diretrizes: ["profilaxia-atb"],
          questoes: ["q-amrigs2020-026","q-amrigs2021-032","q-uspsp2-073","q-famerp2023-052","q-einstein2026-023"],
          prosa: `[[A dose se **repete** na cirurgia longa (passa de duas meias-vidas do antibiótico, em geral 3 a 4 horas, ou o sangramento ultrapassa cerca de 1.500 mL), e não se mantém por 7 dias em cirurgia grande.|q-amrigs2020-026]] [[A cirurgia **limpa** em geral não pede profilaxia, **exceto com prótese**, imunodeprimido ou grande descolamento; a reconstrução arterial infrainguinal com prótese sintética leva **dose única 30 a 60 minutos antes da incisão**; a cirurgia potencialmente contaminada recebe **profilaxia**, e não antibioticoterapia, que é tratamento da infecção estabelecida; na cirurgia infectada, usa-se antibiótico terapêutico.|q-amrigs2021-032,q-uspsp2-073]] [[A **apendicite não complicada** recebe **cefazolina em dose única** até uma hora antes da incisão, sem continuar depois; na cistectomia com conduto ileal, o antibiótico vai **até uma hora antes da incisão** (não antes da intubação nem ao entrar na sala).|q-famerp2023-052,q-einstein2026-023]]`,
          texto: `- Cirurgia longa: **repetir a dose**; não manter 7 dias. {q-amrigs2020-026}
- Cirurgia potencialmente contaminada: **profilaxia**, não antibioticoterapia (a incorreta pedia isso). {q-amrigs2021-032}
- Reconstrução arterial com prótese: **dose única 30 a 60 minutos antes da incisão**. {q-uspsp2-073}
- Apendicite aguda não complicada: **cefazolina 1 g em dose única** até 1 hora antes. {q-famerp2023-052}
- Cistectomia com Bricker: antibiótico **até 1 hora antes da incisão**. {q-einstein2026-023}` },
        { id: "seguranca", titulo: "Checklist de cirurgia segura (OMS)", conferir: true,
          questoes: ["q-amrigs2025-038"],
          prosa: `O checklist da OMS tem três momentos: antes da indução (identidade, via aérea difícil, risco de sangramento), **antes da incisão** e antes de o paciente sair da sala (contagem de compressas e instrumentos). [[O **time-out** é a pausa feita imediatamente antes da incisão, em que toda a equipe **confirma a identidade, o procedimento e o local**; a avaliação de via aérea e a contagem de compressas são de outras etapas.|q-amrigs2025-038]]`,
          texto: `- No **time-out** (antes da incisão), a equipe **confirma o procedimento**. {q-amrigs2025-038}` },
      ],
    },
    {
      id: "metabolismo", titulo: "Resposta metabólica ao trauma, líquidos e eletrólitos",
      introducao: `[[A cirurgia grande é um trauma, e o organismo responde com uma **fase catabólica** nos primeiros dias: cortisol, catecolaminas, glucagon e ADH sobem, a insulina fica relativamente reduzida com resistência periférica, a glicose sobe por **gliconeogênese hepática**, e o rim retém água e sódio, com **oligúria e urina concentrada**.|q-amrigs2023-031,q-simepm89-013,q-famerp2023-068]] Dessa resposta nasce o raciocínio dos líquidos no pós-operatório: o paciente no 1º dia está retendo água, o potássio é liberado pela lesão, e a perda para o terceiro espaço e pela sonda precisa ser reposta.`,
      fragmentos: [
        { id: "remit", titulo: "Fases e hormônios da resposta ao trauma", conferir: true,
          questoes: ["q-amrigs2023-031","q-amrigs2021-023","q-amrigs2020-025","q-simepm89-013","q-fmabc2022-026","q-famerp2023-068","q-famerp2024-028","q-famerp2022-070"],
          prosa: `[[**Cortisol, glucagon, catecolaminas e ADH aumentam**; a insulina fica reduzida (inibida pelas catecolaminas) e há resistência periférica à insulina; o **ADH pode subir até 50 vezes** o valor basal, retém água livre e provoca vasoconstrição esplâncnica; as citocinas pró-inflamatórias aumentam.|q-amrigs2023-031,q-amrigs2021-023,q-fmabc2022-026]] [[No 1º dia de pós-operatório de cirurgia grande, o paciente sonolento ou apático, com oligúria, urina concentrada e íleo, está na **fase catabólica**, por ação do **ADH e do sistema renina-angiotensina-aldosterona**; a gliconeogênese hepática aumenta, a captação muscular de glicose cai.|q-famerp2023-068,q-famerp2024-028,q-famerp2022-070,q-simepm89-013]]

[[A **febrícula** de até 37,8 °C nas primeiras 24 horas é normal; o **íleo adinâmico** é esperado após **qualquer** cirurgia abdominal (e outras cirurgias grandes), não apenas com anastomose; a **atelectasia** melhora com fisioterapia respiratória; e o cortisol sobe da incisão até 5 a 7 dias.|q-amrigs2020-025]]`,
          texto: `- A resposta ao trauma **reduz a insulina** (relativamente) e aumenta cortisol, glucagon e ADH. {q-amrigs2023-031}
- Cortisol circulante **aumentado** após cirurgia grande. {q-amrigs2021-023}
- Febrícula até 37,8 °C em 24 horas é normal; íleo adinâmico **não** é só com anastomose. {q-amrigs2020-025}
- Principal alteração da glicose: **gliconeogênese hepática** aumentada. {q-simepm89-013}
- **ADH** pode subir até 50 vezes e retém água. {q-fmabc2022-026}
- 1º dia, gastrectomia total, diurese concentrada: **fase catabólica**, ADH e renina-angiotensina. {q-famerp2023-068}
- 1º dia de gastrectomia parcial, sonolento: **fase catabólica**, ADH e aldosterona. {q-famerp2024-028}
- 1º dia de colectomia, apático, oligúrico, sem ruídos: **fase catabólica**. {q-famerp2022-070}` },
        { id: "liquidos", titulo: "Hidratação e eletrólitos no pós-operatório", conferir: true,
          questoes: ["q-amrigs2024-021","q-usprp2025-096","q-famerp2024-030","q-tp20252-018","q-einstein2022-022","q-tp20261-050"],
          prosa: `A necessidade basal do adulto em jejum é de cerca de **25 a 35 mL/kg/dia** de água, **1 a 2 mEq/kg/dia de sódio e 0,5 a 1 mEq/kg/dia de potássio**; a prova cobrou **2,0 e 1,0**. [[No pós-operatório imediato, o trauma libera potássio e a função renal ainda é incerta, por isso o **potássio** é o item que se **retira** do soro de manutenção nas primeiras 24 horas.|q-usprp2025-096,q-amrigs2024-021]] [[Em cirurgia abdominal de grande porte, a reposição de perdas insensíveis é de cerca de **5 mL/kg/h** (50 kg por 3 horas, 750 mL); e o cálculo da velocidade (2.500 mL em 24 horas, equipo comum de 20 gotas por mL) dá **cerca de 35 gotas por minuto**.|q-einstein2022-022,q-famerp2024-030]]

[[No 1º dia depois de laparotomia por obstrução, com FC 105, sonda nasogástrica a 900 mL e diurese de 500 mL, há **hipovolemia por perdas** para o terceiro espaço e pela sonda: **aumenta-se a oferta parenteral** de líquidos, sem furosemida, sem dieta líquida e sem apenas água.|q-tp20252-018]] [[O idoso com fratura de colo de fêmur, tardiamente (15º dia), com mal-estar, sonolência e **PA 95/40** em uso de losartana, furosemida e metformina, tem **desidratação**.|q-tp20261-050]]`,
          texto: `- Necessidades basais em NPO: sódio **2,0** e potássio **1,0** mEq/kg/dia (a prova). {q-amrigs2024-021}
- Pós-operatório imediato de salpingectomia: **retirar o potássio** do soro de manutenção. {q-usprp2025-096}
- 2.500 mL em 24 horas: **35 gotas por minuto**. {q-famerp2024-030}
- 1º dia de laparotomia por bridas, FC 105, sonda a 900 mL, diurese 500 mL: **aumentar a oferta parenteral**. {q-tp20252-018}
- Laparotomia de 3 horas em paciente de 50 kg: cristaloide de **750 mL** para as perdas insensíveis. {q-einstein2022-022}
- Idoso no 15º dia de fratura de fêmur, hipotenso, com diurético e losartana: **desidratação**. {q-tp20261-050}` },
      ],
    },
    {
      id: "nutricao", titulo: "Terapia nutricional do paciente cirúrgico",
      introducao: `[[A terapia nutricional no paciente cirúrgico serve para **melhorar os desfechos clínicos** (preservar massa magra e imunidade, reduzir complicações), e a regra é: **via digestiva sempre que o intestino funciona**; parenteral quando ele não pode ser usado.|q-famema2025-030,q-unifesp2024-051,q-adap24-036]] A desnutrição grave é a condição que mais muda a conduta, porque traz o risco de **síndrome de realimentação**.`,
      fragmentos: [
        { id: "nut-indicacao", titulo: "Quando, quanto e por qual via nutrir", conferir: true, diretrizes: ["espen"],
          questoes: ["q-usp2026-035","q-iamspe2022-019","q-iamspe2025-025","q-amrigs2023-008","q-famema2025-030","q-adap24-036","q-unifesp2024-051","q-fmabc2022-030","q-uspsp1-030"],
          prosa: `[[A meta do paciente oncológico a ser operado é de **25 a 30 kcal/kg/dia e 1,2 a 1,5 g/kg/dia de proteína** (para peso ideal de 70 kg: 2.000 kcal e 100 g); o politraumatizado e o grande queimado, hipermetabólicos, precisam de cerca de **35 a 40 kcal/kg** na fase aguda; a albumina **não** é o marcador nutricional ideal na inflamação prolongada, e o polivitamínico não se incentiva em todos os idosos.|q-usp2026-035,q-amrigs2023-008]] [[O paciente com **risco nutricional grave** antes de grande cirurgia (esofagectomia por neoplasia) recebe terapia nutricional **pré-operatória por 7 a 14 dias**, de preferência enteral, mesmo adiando a operação; o NRS-2002 de 5 pontos (perda de peso, cirurgia grande e idade) é **alto risco**; no íleo se hidrata com parcimônia, deambula-se cedo e reduzem-se opioides.|q-iamspe2022-019,q-iamspe2025-025]]

[[No crítico politraumatizado estável, a **nutrição enteral precoce** começa com **15 a 20 kcal/kg/dia**; se a enteral é inviável (ressecção intestinal extensa, íleo refratário) em **desnutrido grave**, inicia-se a **parenteral o mais cedo possível**; e com **apenas 15 cm de jejuno** e ileostomia terminal, a nutrição é **parenteral total**.|q-unifesp2024-051,q-adap24-036,q-uspsp1-030]] [[Não se libera dieta enteral em quem está **instável, com vasopressor em dose alta** (risco de isquemia intestinal); não se espera 7 a 10 dias após gastrectomia total estável; e a terapia nutricional pré-operatória do câncer digestivo não é proscrita.|q-fmabc2022-030]]`,
          texto: `- Neoplasia de pâncreas com perda de 10 %, peso ideal 70 kg: **2.000 kcal e 100 g de proteína**. {q-usp2026-035}
- Risco nutricional grave, esofagectomia: **nutrição enteral pré-operatória por 7 a 14 dias**. {q-iamspe2022-019}
- NRS-2002 de 5 pontos em idosa com perda de 7 % e cirurgia grande: **alto risco nutricional**. {q-iamspe2025-025}
- Politraumatizado e grande queimado: **35 a 40 kcal/kg**; albumina **não** é bom marcador. {q-amrigs2023-008}
- Suporte nutricional no cirúrgico grave: **melhora os desfechos clínicos**. {q-famema2025-030}
- Desnutrida grave com íleo refratário e enteral inviável: **nutrição parenteral precoce**. {q-adap24-036}
- Politraumatizada estável com ventilação por 48 a 72 horas: **enteral, 15 a 20 kcal/kg/dia**. {q-unifesp2024-051}
- Vasopressor em dose alta: **não liberar dieta enteral**. {q-fmabc2022-030}
- Apenas 15 cm de jejuno e ileostomia terminal: **nutrição parenteral total**. {q-uspsp1-030}` },
        { id: "nut-vias", titulo: "Vias de acesso, sonda e composição da nutrição", conferir: true, diretrizes: ["espen"],
          casos: ["q-usprp2023-006"],
          questoes: ["q-udisc20262-066","q-iamspe2026-035","q-usprp2023-006","q-iamspe2022-031","q-sessp2026-029"],
          prosa: `[[Em paciente **comatoso** ou com **refluxo gastroesofágico**, a via **pós-pilórica** é preferível pelo risco de broncoaspiração; a **gastrostomia** se indica para dar via de alimentação prolongada em **obstrução alta** ou **disfagia neurológica**.|q-udisc20262-066,q-iamspe2026-035]] [[A **radiografia de controle** após a passagem da sonda nasogástrica é que confirma a posição: se a sonda está no trajeto da via aérea, a conduta imediata é **retirá-la**, e não introduzi-la mais, nem testar com ar, nem usá-la.|q-usprp2023-006]] [[O **ômega-3** na nutrição parenteral total tem como maior benefício a **modulação inflamatória**.|q-iamspe2022-031]]

[[No crítico com **ventilação mecânica há mais de 48 horas e coagulopatia** (INR 2,2, plaquetas de 58.000), a profilaxia de úlcera de estresse com **inibidor de bomba de prótons** está indicada.|q-sessp2026-029]]`,
          texto: `- Coma ou refluxo: via **pós-pilórica** preferível. {q-udisc20262-066}
- **Gastrostomia**: via de alimentação prolongada em obstrução alta ou disfagia neurológica. {q-iamspe2026-035}
- Sonda nasogástrica no trajeto da via aérea na radiografia: **retirar**. {q-usprp2023-006}
- **Ômega-3** na NPT: melhor **modulação inflamatória**. {q-iamspe2022-031}
- Choque séptico, ventilação há 3 dias, INR 2,2 e plaquetas 58.000: **profilaxia com IBP**. {q-sessp2026-029}` },
        { id: "nut-realimentacao", titulo: "Síndrome de realimentação", conferir: true, diretrizes: ["espen"],
          questoes: ["q-scmsp2025-028","q-uspsp3-105"],
          prosa: `Na desnutrição grave a oferta de glicose estimula a insulina e **desloca fósforo, potássio e magnésio para dentro das células**, com arritmia e insuficiência respiratória e cardíaca. [[O desnutrido grave (IMC de 11,8 com fístulas de alto débito) começa a nutrição parenteral com cerca de **30 % da meta** (450 kcal de 1.500) e os distúrbios esperados são **hipofosfatemia e hipopotassemia**; na transição da parenteral para a enteral e oral, **monitorizam-se rigorosamente fósforo, magnésio e potássio** (e repõe-se tiamina), sem suspender a NPT de uma vez nem mantê-la indefinidamente.|q-uspsp3-105,q-scmsp2025-028]]`,
          texto: `- IMC 11,8 e fístulas de alto débito: iniciar com **450 kcal** (cerca de 30 % da meta); hipofosfatemia e hipopotassemia. {q-uspsp3-105}
- Desnutrido grave na transição da NPT: **monitorizar fósforo, magnésio e potássio**. {q-scmsp2025-028}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-amrigs2022-035","q-amrigs2021-025","q-uspsp2-074","q-iamspe2022-032","q-usp2023-118","q-usp2025-043","q-usprp2025-067","q-amrigs2023-032","q-famema2025-018"],
          prosa: `[[Em cirurgia de baixo risco em paciente sem doença cardiopulmonar sintomática, as diretrizes atuais **não** pedem radiografia de tórax nem exames de rotina; a AMRIGS 2022 cobrou **hemograma, radiografia de tórax e ECG** no homem de 53 anos fumante e hipertenso, e a AMRIGS 2021 cobrou a **creatinina** no hígido de 40 anos, ambas com gabarito discutível.|q-amrigs2022-035,q-amrigs2021-025]] [[A aspirina em prevenção secundária em geral **se mantém**; o simulado USP-SP 2025 cobrou **suspender 5 a 7 dias** em herniorrafia de risco hemorrágico moderado a alto, e o IAMSPE 2022 contou o AAS entre as duas medicações a suspender; a semaglutida, cuja suspensão mudou de regra (ASA 2023 suspendia; o consenso de 2024 mantém), não entrava na conta.|q-uspsp2-074,q-iamspe2022-032]] [[A **metformina** variou: 2 dias (USP-SP 2023), 24 horas (USP-SP 2025) e até a véspera (USP-RP 2025).|q-usp2023-118,q-usp2025-043,q-usprp2025-067]] [[A albumina de risco foi dada como "menor que 2,2 **mg/dL**" (a unidade correta é g/dL), e a ICC sintomática como ASA 4, sem gabarito oficial na transcrição.|q-amrigs2023-032,q-famema2025-018]]`,
          texto: `- Regra: cirurgia de baixo risco dispensa exames de rotina; a prova (AMRIGS 2022) cobrou **hemograma, radiografia e ECG** e a (AMRIGS 2021), a **creatinina**. {q-amrigs2022-035,q-amrigs2021-025}
- Regra: aspirina em prevenção secundária se **mantém**; a prova (USP-SP 2025) cobrou **suspender 5 a 7 dias** e a (IAMSPE 2022) contou **duas** medicações a suspender. {q-uspsp2-074,q-iamspe2022-032}
- Regra: metformina se interrompe antes da cirurgia; a prova cobrou **2 dias** (USP-SP 2023), **24 horas** (USP-SP 2025) e **até a véspera** (USP-RP 2025). {q-usp2023-118,q-usp2025-043,q-usprp2025-067}
- Regra: albumina se mede em g/dL; a prova (AMRIGS 2023) escreveu **mg/dL**. {q-amrigs2023-032}
- Regra: ICC sintomática e mal controlada é **ASA IV**; a prova (FAMEMA 2025) não traz gabarito oficial nesta transcrição. {q-famema2025-018}` },
      ],
    },
  ],
});
