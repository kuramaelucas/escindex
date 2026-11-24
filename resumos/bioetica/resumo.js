/* resumos/bioetica/resumo.js — resumo adaptativo de princípios bioéticos e ética médica (ass-principiosbioetica):
   os quatro princípios e a deliberação, autonomia e consentimento (recusa de transfusão, gestante, capacidade),
   sigilo médico (adolescente, prontuário, autoridade), documentos e atestados, publicidade e responsabilidade
   no Código de Ética Médica, telemedicina, pesquisa e alocação de recursos, armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- bioetica */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "bioetica",
  titulo: "Princípios bioéticos e ética médica",
  assunto: "ass-principiosbioetica",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "cem", texto: "Conselho Federal de Medicina — Código de Ética Médica (Resolução CFM 2.217/2018, com as alterações 2.222/2018 e 2.226/2019)", lidoEm: null },
    { id: "cfm-publicidade", texto: "CFM — Resolução 2.336/2023 (publicidade médica) e Parecer CFM 40/2019 (carimbo)", lidoEm: null },
    { id: "telemedicina", texto: "Lei 14.510/2022 (telessaúde) e Resolução CFM 2.314/2022 (telemedicina)", lidoEm: null },
    { id: "cns-466", texto: "Conselho Nacional de Saúde — Resoluções 466/2012 e 510/2016 (ética em pesquisa)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-unifesp2023-032"] },
  ],
  doencas: [
    {
      id: "principios", titulo: "Princípios e deliberação",
      introducao: `[[Beauchamp e Childress resumiram a ética clínica em quatro princípios: respeito à autonomia (a pessoa capaz decide sobre o próprio corpo), beneficência (agir para o bem dela), não maleficência (não causar dano) e justiça (distribuir recursos e cuidados com equidade). Nenhum vale sempre acima dos outros; quando colidem, pondera-se o caso. O método deliberativo de Diego Gracia propõe olhar os fatos, os valores em jogo e os deveres, e buscar o curso de ação mais prudente.|q-unesp2021-057,q-028,q-unicampdis2024-115]]

Veja também: **Comunicação clínica** (más notícias, decisão compartilhada), **Contracepção** (prescrição na adolescência), **Maus-tratos** (notificação), **Vigilância em saúde** (declaração de óbito) e **Desenhos de estudo** (ensaio clínico).`,
      fragmentos: [
        { id: "pri-quatro", titulo: "Os quatro princípios na prática", conferir: true,
          figuras: [{ arquivo: "figuras/principios.svg", legenda: "Esquema autoral: os quatro princípios e um exemplo de cada, tirado das questões." }],
          questoes: ["q-unesp2021-057","q-028","q-unicampdis2024-115","q-sessp2023-085","q-unicamp2022-079","q-tp20231-118","q-tp20202-120"],
          prosa: `[[Prescrever tratamento sem evidência porque há pressão pública fere a não maleficência: a intervenção pode causar dano. Trabalhar numa clínica que promete resultados estéticos imediatos põe o mesmo princípio em risco. O paciente que não aceita o diagnóstico e pede uma segunda opinião exerce autonomia, e o médico a aceita.|q-unicamp2022-079,q-sessp2023-085,q-tp20202-120]] [[Para pessoas vulneráveis (crianças, idosos, doentes mentais ou terminais), o primeiro mecanismo de proteção é o acolhimento.|q-tp20231-118]]`,
          texto: `- Quatro princípios: **não maleficência, beneficência, autonomia e justiça**. {q-unesp2021-057}
- Recusa de transfusão por paciente capaz: **autonomia**. {q-028}
- Método de Gracia: **fatos, valores e deveres**. {q-unicampdis2024-115}
- Clínica de resultados imediatos: **não maleficência**. {q-sessp2023-085}
- Hidroxicloroquina sem evidência: **pode causar dano**. {q-unicamp2022-079}
- Proteção do vulnerável: **acolhimento**. {q-tp20231-118}
- Paciente pede segunda opinião: **aceitar**. {q-tp20202-120}` },
        { id: "pri-justica", titulo: "Justiça e alocação de recursos", conferir: true,
          questoes: ["q-sirio2025-092","q-fmabc2021-079"],
          prosa: `[[Quando o recurso é escasso (vacinas, leitos de UTI), a justiça pede critérios públicos que priorizem os mais vulneráveis e de maior risco, nunca poder aquisitivo; e o direito ao cuidado vale em todos os níveis, da atenção primária aos cuidados intensivos e paliativos.|q-sirio2025-092,q-fmabc2021-079]]`,
          texto: `- Vacina escassa: **priorizar os mais vulneráveis**. {q-sirio2025-092}
- Direito ao cuidado: **em todos os níveis, inclusive paliativo**. {q-fmabc2021-079}` },
      ],
    },
    {
      id: "autonomia", titulo: "Autonomia, consentimento e recusa",
      introducao: `[[Consentir exige capacidade: compreender a informação sobre o problema e as alternativas, apreciar o que ela significa para si, raciocinar e comunicar uma escolha. O termo de consentimento traz o procedimento, os riscos, as complicações e as sequelas possíveis; não substitui a conversa, e não autoriza prometer resultado.|q-unicamp2023-080,q-amrigs2021-026,q-amrigs2025-091]]`,
      fragmentos: [
        { id: "aut-recusa", titulo: "Recusa de tratamento e consentimento", conferir: true, diretrizes: ["cem"],
          questoes: ["q-adap26-073","q-unifesp2026-073","q-unicamp2023-080","q-amrigs2021-026","q-amrigs2025-091","q-usp2022-027","q-fmabc2023-096","q-unifesp2026-067"],
          prosa: `[[A recusa informada e registrada de um adulto capaz se respeita: a testemunha de Jeová que recusou transfusão recebe todas as alternativas (recuperação de sangue, agentes hemostáticos), não sangue; a parturiente que recusou episiotomia não a recebe, e a equipe que respeitou e registrou agiu bem mesmo diante de uma laceração. Sem a decisão prévia da pessoa e com risco iminente de morte, o médico age para salvar.|q-adap26-073,q-unifesp2026-073]] [[A mulher que quer interromper a gestação fora das situações legais é acolhida, ouvida e orientada sobre os riscos, sem julgamento e com sigilo. O médico não pode fazer exame de gravidez para fins admissionais (prática discriminatória vedada por lei): recusa e orienta a paciente sobre seus direitos.|q-usp2022-027,q-unifesp2026-067]] [[A criança que recusa o exame da garganta não justifica abandonar a avaliação: deixar de examinar e de decidir é conflito ético.|q-fmabc2023-096]]`,
          texto: `- Testemunha de Jeová com recusa registrada: **respeitar e usar as alternativas**. {q-adap26-073}
- Recusa de episiotomia registrada: **conduta ética e legal**. {q-unifesp2026-073}
- Capacidade: **compreender informação e alternativas**. {q-unicamp2023-080}
- Termo: **complicações e sequelas possíveis**. {q-amrigs2021-026}
- Prometer resultado: **infração ética**. {q-amrigs2025-091}
- Deseja interromper a gestação: **respeitar e orientar sobre riscos**. {q-usp2022-027}
- Criança que recusa o exame: **conflito ético**. {q-fmabc2023-096}
- Teste de gravidez para emprego: **recusar e orientar sobre direitos**. {q-unifesp2026-067}` },
      ],
    },
    {
      id: "sigilo", titulo: "Sigilo médico",
      introducao: `[[O sigilo protege a confiança que faz o paciente contar tudo. O médico só revela o que soube na profissão por motivo justo, dever legal (doença de notificação compulsória, maus-tratos, violência contra a mulher) ou consentimento por escrito do paciente. Morte do paciente, fato público ou depoimento como testemunha não liberam: diante do juiz, o médico declara o impedimento.|q-unesp2023-083,q-unesp2021-095,q-fmabc2026-094]]`,
      fragmentos: [
        { id: "sig-adolescente", titulo: "Adolescente", conferir: true, diretrizes: ["cem"],
          questoes: ["q-adap26-067","q-scmsp2023-041","q-scmsp2025-047","q-amrigs2025-061","q-iamspe2022-079","q-tp20212-045","q-famerp2023-020","q-uspsp2-070","q-sirio2026-060","q-einstein2023-067","q-usprp2027-059"],
          prosa: `[[O adolescente capaz de discernimento tem direito a ser atendido sozinho e ao sigilo: iniciação sexual, contracepção, IST e gravidez ficam entre ele e o médico, que pode prescrever o método e iniciar o pré-natal. O sigilo se quebra quando a não revelação pode trazer dano ao próprio paciente ou a terceiros: risco de vida, uso escalonado de drogas, transtorno alimentar grave, ideação suicida, abuso. Menina com menos de 14 anos grávida ou com vida sexual é presumidamente vítima de estupro de vulnerável: notifica-se e aciona-se a proteção.|q-adap26-067,q-scmsp2023-041,q-scmsp2025-047,q-famerp2023-020,q-sirio2026-060,q-einstein2023-067,q-usprp2027-059,q-uspsp2-070,q-amrigs2025-061,q-tp20212-045,q-iamspe2022-079]]`,
          texto: `- 15 anos pede contraceptivo, capaz: **atender, prescrever e manter sigilo**. {q-adap26-067,q-usprp2027-059,q-famerp2023-020}
- Sigilo mantido: **iniciação sexual, contracepção e IST**. {q-scmsp2023-041}
- 14 anos com namorado de 17: **orientar e manter o sigilo**. {q-scmsp2025-047}
- Quebra imperativa: **uso escalonado de álcool**. {q-amrigs2025-061}
- Autoriza quebra: **13 anos grávida**. {q-iamspe2022-079}
- Bulimia com desidratação grave: **revelar aos pais o transtorno alimentar**. {q-tp20212-045}
- Justifica revelar: **risco de dano ao próprio paciente**. {q-uspsp2-070}
- 14 anos com disúria e vida sexual: **manter o sigilo**. {q-sirio2026-060}
- 15 anos possivelmente grávida: **atendimento e pré-natal na UBS**. {q-einstein2023-067}` },
        { id: "sig-prontuario", titulo: "Prontuário, autoridade e imprensa", conferir: true, diretrizes: ["cem"],
          questoes: ["q-scmsp2022-086","q-usp2022-023","q-usp2022-050","q-fmabc2026-094","q-unesp2023-083","q-unesp2021-095"],
          prosa: `[[O prontuário pertence ao paciente quanto às informações e fica guardado pela instituição: o original não sai, mas o paciente tem direito a cópia ou relatório. Prontuário de outra pessoa (o do ex-cônjuge, por exemplo) só com autorização dela ou ordem judicial; o dos filhos, pelo representante legal. Delegado não recebe prontuário: só com ordem judicial. A instituição não divulga dados do paciente sem autorização, mesmo que a família exponha a doença nas redes.|q-scmsp2022-086,q-usp2022-023,q-fmabc2026-094,q-usp2022-050]]`,
          texto: `- Pedido do prontuário: **o original fica; fornece-se cópia ou relatório**. {q-scmsp2022-086}
- Guarda dos filhos: **cópias só com autorização escrita** (a prova). {q-usp2022-023}
- Paciente famosa nas redes: **sem divulgar dados sem autorização**. {q-usp2022-050}
- Delegado pede prontuário: **só com mandado judicial**. {q-fmabc2026-094}
- Pode revelar: **por dever legal**. {q-unesp2023-083}
- Exceção: **consentimento por escrito do paciente**. {q-unesp2021-095}` },
      ],
    },
    {
      id: "cem", titulo: "Código de Ética Médica: documentos, publicidade e responsabilidade",
      introducao: `[[O Código de Ética Médica proíbe, entre outros, atos desnecessários, prometer resultado, delegar atos médicos, atestar o que não viu e fazer publicidade sensacionalista ou autopromocional; e obriga o médico a assumir a responsabilidade pelo que indicou ou fez e a comunicar ao Conselho, com discrição, infrações de que saiba.|q-amrigs2022-084,q-amrigs2023-099,q-unesp2024-090,q-amrigs2020-084]]`,
      fragmentos: [
        { id: "cem-documentos", titulo: "Atestados, declaração de óbito e carimbo", conferir: true, diretrizes: ["cem","cfm-publicidade"],
          questoes: ["q-iamspe2022-068","q-unesp2022-084","q-unicampdis2025-096","q-unesp2026-088"],
          prosa: `[[O atestado para esporte raramente exige exames (a avaliação clínica basta na maioria), não leva CID sem autorização do paciente e é entregue ao próprio paciente. O médico não atesta óbito que não verificou pessoalmente; morte por causa externa (afogamento, acidente, violência), mesmo depois de dias de UTI, vai para o Instituto Médico-Legal, cujo legista assina a declaração. Carimbo não é obrigatório: basta identificação legível e número do CRM.|q-iamspe2022-068,q-unesp2022-084,q-unicampdis2025-096,q-unesp2026-088]]`,
          texto: `- Atestado para esporte: **raramente precisa de exames**. {q-iamspe2022-068}
- Vedado: **atestar óbito que não verificou**. {q-unesp2022-084}
- Afogado que morreu na UTI: **IML (legista)**. {q-unicampdis2025-096}
- Carimbo: **não obrigatório**. {q-unesp2026-088}` },
        { id: "cem-conduta", titulo: "Responsabilidade, publicidade, relação entre colegas e telemedicina", conferir: true, diretrizes: ["cem","telemedicina","cfm-publicidade"],
          questoes: ["q-amrigs2022-084","q-amrigs2023-099","q-unesp2024-090","q-amrigs2020-084","q-amrigs2021-088","q-iamspe2022-075","q-iamspe2023-068","q-unicampdis2025-044","q-unicampdis2025-100","q-uspsp5-077","q-einstein2026-075"],
          prosa: `[[Atender o paciente de outro médico numa intercorrência, registrar e comunicar o colega é correto. O médico pode recusar transcrever pedido de exames de outro profissional sem indicação (não é obrigado a prescrever o que não julga necessário). Omitir cuidados no transporte de um paciente grave é negligência. Na publicidade, a regra de 2023 permite mostrar o dia a dia do trabalho, mas proíbe conteúdo sensacionalista, autopromocional ou pejorativo.|q-amrigs2021-088,q-iamspe2023-068,q-unicampdis2025-100,q-unicampdis2025-044,q-amrigs2023-099]] [[Na telemedicina vale o mesmo código: consentimento, registro e guarda dos dados; no acompanhamento de doenças crônicas, recomenda-se consulta presencial periódica. O médico local e o especialista que orienta a distância respondem juntos pela conduta.|q-uspsp5-077,q-einstein2026-075]]`,
          texto: `- Vedado pelo código: **atos desnecessários**, condutas contra movimentos legítimos da categoria **para obter vantagem**, divulgação **sensacionalista** e divulgação leiga de tratamento **sem reconhecimento científico**. {q-amrigs2022-084}
- Publicidade vedada: aparição na mídia que **não seja só educativa**, conteúdo **sensacionalista**, divulgação leiga de tratamento **sem reconhecimento científico** e **anúncio de empresas comerciais**. {q-amrigs2023-099}
- Vedado: **não assumir procedimento que indicou ou de que participou**. {q-unesp2024-090}
- Deontologia: o médico **comunica ao CRM**, com discrição, infrações de que saiba; o código se **revisa periodicamente** e trata do **sumário de alta** e das comissões de ética. {q-amrigs2020-084}
- Atendeu o paciente do colega e comunicou: **adequado**. {q-amrigs2021-088}
- Argumento que não ajuda a defesa do "kit": **respeito aos colegas**. {q-iamspe2022-075}
- Pedido de exames do nutricionista: **pode não acatar**. {q-iamspe2023-068}
- Publicidade proibida: **sensacionalista ou autopromocional**. {q-unicampdis2025-044}
- Broncoaspiração no transporte sem proteção: **negligência**. {q-unicampdis2025-100}
- Doença crônica: **presencial periódico**. {q-uspsp5-077}
- Teleconsultoria: **responsabilidade solidária**. {q-einstein2026-075}` },
      ],
    },
    {
      id: "pesquisa", titulo: "Ética em pesquisa e doação de órgãos",
      introducao: `[[Pesquisa com seres humanos passa por comitê de ética e exige consentimento livre e esclarecido; o adolescente assina o assentimento e o responsável, o consentimento. O controle com placebo, em regra, só é ético quando não existe tratamento eficaz (Helsinque 2024 admite exceção por razão metodológica forte, sem risco de dano grave ou irreversível): privar o grupo de metformina num diabético é inaceitável.|q-adap23-032,q-sirio2026-059,q-didepm-085]]`,
      fragmentos: [
        { id: "pes-regras", titulo: "Pesquisa e doação", conferir: true, diretrizes: ["cns-466"],
          questoes: ["q-adap23-032","q-sirio2026-059","q-didepm-085","q-einstein2021-019"],
          prosa: `[[Estudo retrospectivo com prontuários também vai ao comitê, que pode dispensar o consentimento quando contatar os pacientes é inviável e os dados são anonimizados. Doador vivo precisa ter 18 anos ou mais e não pode receber pagamento.|q-didepm-085,q-einstein2021-019]]`,
          texto: `- Placebo contra hipoglicemiante: **inaceitável**. {q-adap23-032}
- Adolescente em pesquisa: **assentimento dele e consentimento do responsável**. {q-sirio2026-059}
- Prontuários antigos: **comitê, pedindo dispensa justificada do TCLE**. {q-didepm-085}
- Doador vivo: **18 anos no mínimo**. {q-einstein2021-019}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["cem"],
          questoes: ["q-iamspe2022-079","q-usp2022-023","q-adap26-073","q-unesp2023-083"],
          prosa: `[[**Menor de 14 anos**: a lei presume violência na relação sexual (estupro de vulnerável), e a gravidez de uma menina de 13 anos é motivo para quebrar o sigilo e notificar (iamspe2022-079); entre 14 e 18, a capacidade de discernimento orienta o sigilo.|q-iamspe2022-079]] [[**Prontuário dos filhos**: o representante legal tem acesso; na disputa de guarda, a usp2022-023 exigiu autorização por escrito de cada um.|q-usp2022-023]] [[**Recusa de transfusão**: com recusa prévia e documentada de adulto capaz, respeita-se mesmo em risco de vida; sem ela, em risco iminente, o médico transfunde. A diferença está no registro da decisão (adap26-073).|q-adap26-073]] [[**Depoimento**: o médico intimado comparece, mas não revela o segredo; "quando der depoimento como testemunha" não é exceção ao sigilo (unesp2023-083).|q-unesp2023-083]]`,
          texto: `- Menor de 14 com gravidez: **quebra e notificação**. {q-iamspe2022-079}
- Prontuário dos filhos: a prova pediu **autorização escrita**. {q-usp2022-023}
- Recusa **documentada** se respeita. {q-adap26-073}
- Testemunha **não** libera o sigilo. {q-unesp2023-083}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: sigilo do adolescente",
      introducao: `Resumo do capítulo de sigilo.`,
      fragmentos: [
        { id: "cmp-sigilo", titulo: "Mantém × quebra", conferir: true,
          questoes: ["q-scmsp2023-041","q-amrigs2025-061","q-tp20212-045","q-iamspe2022-079"],
          prosa: `[[O que separa é o risco de dano.|q-scmsp2023-041,q-amrigs2025-061,q-tp20212-045,q-iamspe2022-079]]

| Mantém o sigilo | Quebra o sigilo |
|---|---|
| iniciação sexual | risco de vida (ideação suicida, autoagressão) |
| contracepção | uso escalonado de álcool e drogas |
| IST tratável | transtorno alimentar grave |
| gravidez (14 anos ou mais) | gravidez ou relação abaixo de 14 anos; abuso |
| identidade de gênero, orientação | recusa de tratamento com risco grave |`,
          texto: `- Mantém: **sexo, contracepção, IST**. {q-scmsp2023-041}
- Quebra: **álcool escalonado**. {q-amrigs2025-061}
- Quebra: **transtorno alimentar grave**. {q-tp20212-045}
- Quebra: **menor de 14 grávida**. {q-iamspe2022-079}` },
      ],
    },
  ],
});
