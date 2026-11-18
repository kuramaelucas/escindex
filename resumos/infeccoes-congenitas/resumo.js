/* resumos/infeccoes-congenitas/resumo.js — resumo adaptativo de infecções congênitas e perinatais:
   sífilis, toxoplasmose, citomegalovírus, rubéola, herpes, hepatite B, HTLV, varicela e o recém-nascido
   exposto à tuberculose. Fecha com a tabela comparativa (TORCHS), como pede docs/PROJETO-RESUMOS.md.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- infeccoes-congenitas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "infeccoes-congenitas",
  titulo: "Infecções congênitas e perinatais",
  assunto: "ass-neo-infeccoescongenitas",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "pcdt-ist", texto: "Ministério da Saúde — PCDT para Atenção Integral às Pessoas com IST (sífilis congênita e criança exposta) e PCDT de Prevenção da Transmissão Vertical", lidoEm: null },
    { id: "ms-tuberculose", texto: "Ministério da Saúde — Manual de Recomendações para o Controle da Tuberculose no Brasil e notas técnicas sobre o tratamento da infecção latente", lidoEm: null },
    { id: "ms-toxoplasmose", texto: "Ministério da Saúde — Protocolo de Notificação e Investigação: Toxoplasmose gestacional e congênita", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada: sem gabarito para medir o erro", questoes: ["q-sessp2023-024"] },
  ],
  doencas: [
    {
      id: "sifilis", titulo: "Sífilis congênita",
      introducao: `O *Treponema pallidum* atravessa a placenta em qualquer fase da gestação, e a transmissão é maior quanto mais recente a infecção materna. [[A espiroqueta se espalha pelo sangue fetal e inflama ossos, fígado, pele e sistema nervoso: daí a periostite e a osteocondrite dos ossos longos, a hepatoesplenomegalia, o pênfigo palmoplantar, a anemia e a meningite que a prova descreve.|q-uspsp2-062,q-uspsp4-102,q-usprp2021-028]]

[[O raciocínio inteiro gira em torno de uma pergunta: a mãe foi adequadamente tratada? Tratamento adequado é penicilina benzatina completa para o estágio, iniciada pelo menos 30 dias antes do parto, com queda do título não treponêmico.|q-famema2023-095,q-amrigs2022-063,q-fmabc2025-048,q-fmabc2026-046]] [[O VDRL do recém-nascido pode vir de anticorpos maternos que atravessaram a placenta; só um título pelo menos 4 vezes maior que o da mãe aponta infecção do próprio bebê.|q-tp20212-041,q-famerp2026-036,q-unicampdis2024-034]]`,
      fragmentos: [
        { id: "sif-mae", titulo: "Mãe adequadamente tratada e criança exposta", conferir: true, diretrizes: ["pcdt-ist"],
          questoes: ["q-famema2023-095","q-amrigs2022-063","q-fmabc2025-048","q-adap24-088","q-famerp2026-036","q-unicampdis2024-034","q-einstein2023-034","q-einstein2024-043","q-famerp2025-050","q-usprp2021-028"],
          texto: `- Mãe adequadamente tratada: **benzatina completa**, iniciada **≥ 30 dias antes do parto**, com **queda do título**. {q-famema2023-095,q-amrigs2022-063,q-fmabc2025-048}
- Mãe adequada, RN assintomático, VDRL **não reagente ou não maior que 4× o materno**: **criança exposta**, sem tratamento, **VDRL seriado**. {q-adap24-088,q-famerp2026-036,q-unicampdis2024-034}
- Seguimento da exposta: **VDRL com 1, 3, 6, 12 e 18 meses**. {q-einstein2023-034}
- Teste rápido positivo no parto: colher **VDRL periférico do binômio**. {q-einstein2024-043}
- Mãe diz que "tomou injeções doloridas": confirmar no **cartão** e colher VDRL de mãe e RN. {q-famerp2025-050}
- RN com hepatoesplenomegalia e exantema: primeiro **ver os VDRL do pré-natal**. {q-usprp2021-028}` },
        { id: "sif-tratar", titulo: "Investigar e tratar a sífilis congênita", conferir: true, diretrizes: ["pcdt-ist"],
          questoes: ["q-fmabc2026-046","q-tp20212-041","q-tp20231-091","q-sirio2022-052","q-fmabc2024-050","q-famerp2024-056","q-unifesp2024-083","q-usp2024-015","q-sirio2027-060","q-uspsp2-062","q-uspsp4-102","q-sirio2024-058","q-amrigs2025-078","q-scmsp2026-045","q-famerp2022-032","q-tp20252-034"],
          casos: ["q-usp2024-015"],
          texto: `- Mãe **não adequadamente tratada** ou VDRL do RN **≥ 4× o materno**: **hemograma, radiografia de ossos longos e líquor** (com VDRL) e tratar. {q-fmabc2026-046,q-tp20212-041,q-sirio2022-052,q-fmabc2024-050}
- Lactente com VDRL reagente sem acompanhamento: **internar** e investigar. {q-famerp2024-056}
- **Neurossífilis** (líquor alterado, mesmo com VDRL do líquor negativo) ou líquor não colhido: **penicilina cristalina IV por 10 dias**. {q-usp2024-015,q-unifesp2024-083,q-tp20231-091}
- Líquor normal: **penicilina cristalina ou procaína por 10 dias**. {q-fmabc2024-050,q-sirio2024-058,q-tp20212-041}
- Sintomática (periostite, osteocondrite, anemia): **cristalina 50.000 UI/kg/dose**, a cada 12 h na 1ª semana. {q-sirio2027-060,q-uspsp2-062,q-uspsp4-102}
- Perdeu o acesso venoso: **completar com procaína IM** até o 10º dia. {q-amrigs2025-078}
- Título que não cai no seguimento: **falha** — novo líquor e **10 dias de penicilina parenteral**. {q-scmsp2026-045,q-famerp2022-032}
- Sífilis congênita com **síndrome nefrótica**: penicilina cristalina e **albumina**. {q-tp20252-034}` },
      ],
    },
    {
      id: "toxo", titulo: "Toxoplasmose congênita",
      introducao: `O *Toxoplasma gondii* só passa ao feto quando a mãe se infecta **durante** a gestação. [[A infecção no início da gestação transmite menos, mas lesa mais; no fim transmite mais, porém com doença mais leve, muitas vezes subclínica ao nascer.|q-einstein2027-054,q-famerp2023-033]] [[O parasita tem tropismo por cérebro e retina: a tríade clássica é coriorretinite, hidrocefalia e calcificações cerebrais difusas.|q-famerp2023-033,q-unesp2023-003]]

[[A avidez da IgG data a infecção: avidez alta antes de 12 a 16 semanas de gestação significa que a infecção é anterior à concepção, e o bebê não está em risco.|q-usp2023-090,q-uspsp1-020,q-einstein2022-043,q-fmabc2025-053,q-sessp2026-043]]`,
      fragmentos: [
        { id: "tox-diag", titulo: "Quando investigar", conferir: true, diretrizes: ["ms-toxoplasmose"],
          questoes: ["q-usp2023-090","q-uspsp1-020","q-einstein2022-043","q-fmabc2025-053","q-sessp2026-043","q-famerp2024-050","q-unifesp2024-097","q-famerp2023-033","q-einstein2027-054"],
          texto: `- IgM e IgG positivas com **avidez alta no 1º trimestre**: infecção antiga, **cuidados de rotina** para o RN. {q-usp2023-090,q-uspsp1-020,q-einstein2022-043,q-fmabc2025-053,q-sessp2026-043}
- Sorologia materna desconhecida ou suspeita: **sorologias de mãe e RN, fundo de olho, US transfontanela e hemograma**. {q-famerp2024-050}
- Teste do pezinho positivo com mãe negativa no pré-natal: **repetir sorologias** de mãe e RN; se positivas, tratar. {q-unifesp2024-097}
- Coriorretinite + **calcificações difusas**: **toxoplasmose**. {q-famerp2023-033}
- PCR positiva no líquido amniótico: trocar espiramicina por **pirimetamina, sulfadiazina e ácido folínico** até o parto. {q-einstein2027-054}` },
        { id: "tox-trat", titulo: "Tratamento do recém-nascido", conferir: true, diretrizes: ["ms-toxoplasmose"],
          questoes: ["q-adap24-056","q-adap25-099","q-unifesp2025-099","q-unesp2023-003","q-unesp2024-002"],
          texto: `- RN infectado (IgM ou IgA positiva, ou lesões), **com ou sem sintomas**: **pirimetamina + sulfadiazina + ácido folínico por 12 meses**. {q-adap24-056,q-adap25-099,q-unifesp2025-099,q-unesp2024-002}
- **Corticoide** associado se coriorretinite ativa ou proteína alta no líquor. {q-unesp2023-003}
- Controlar o **hemograma** (a pirimetamina é antifólica). {q-adap25-099}` },
      ],
    },
    {
      id: "virais", titulo: "Citomegalovírus, rubéola, herpes e varicela",
      introducao: `[[O citomegalovírus é a infecção congênita mais comum e a principal causa infecciosa de surdez neurossensorial: lesa o tecido cerebral em torno dos ventrículos, onde ficam as calcificações periventriculares.|q-unesp2022-019,q-einstein2023-035,q-scmsp2021-047]] [[Como o vírus é eliminado na urina, a PCR na urina nas primeiras 3 semanas separa a infecção congênita da adquirida depois do parto.|q-scmsp2021-047,q-unifesp2025-100,q-adap25-100]]

[[A rubéola no primeiro trimestre interrompe a divisão celular dos órgãos em formação: catarata, surdez e cardiopatia (canal arterial) formam a síndrome.|q-adap21-028]] [[O herpes neonatal é adquirido quase sempre no parto, pelo contato com lesões genitais, e aparece nas primeiras semanas como vesículas, sepse ou encefalite.|q-usprp2026-058,q-didepm-074]]`,
      fragmentos: [
        { id: "vir-cmv", titulo: "Citomegalovírus", conferir: true,
          questoes: ["q-unesp2022-019","q-einstein2023-035","q-scmsp2021-047","q-unifesp2025-100","q-adap25-100","q-usprp2023-019","q-famema2025-057"],
          texto: `- Principal causa infecciosa de **surdez congênita**. {q-unesp2022-019}
- Microcefalia, icterícia e **calcificações periventriculares**: **CMV**. {q-einstein2023-035,q-unifesp2025-100}
- Diagnóstico: **PCR na urina (ou saliva) nas primeiras 2 a 3 semanas**. {q-scmsp2021-047,q-unifesp2025-100}
- Sintomático com SNC ou surdez: **ganciclovir IV / valganciclovir oral por 6 meses**, controlando neutrófilos. {q-adap25-100,q-usprp2023-019}
- Feto com RCF, ventriculomegalia e placenta calcificada: pensar em **CMV** e pedir sorologias maternas. {q-famema2025-057}` },
        { id: "vir-outros", titulo: "Rubéola, herpes e varicela", conferir: true,
          questoes: ["q-adap21-028","q-usprp2026-058","q-didepm-074","q-amrigs2020-072"],
          casos: ["q-usprp2026-058"],
          texto: `- **Catarata, surdez e canal arterial**: **rubéola congênita**. {q-adap21-028}
- RN de 1 a 3 semanas com **vesículas agrupadas**, febre e apneia: **herpes neonatal**; perguntar por **lesões genitais**. {q-usprp2026-058}
- Encefalite herpética neonatal: **aciclovir IV 20 mg/kg de 8/8 h por 21 dias**. {q-didepm-074}
- Varicela materna **dias depois do parto**, RN de termo bem: **cuidados de rotina**, amamentação mantida. {q-amrigs2020-072}` },
      ],
    },
    {
      id: "vertical", titulo: "Hepatite B, HTLV e tuberculose",
      introducao: `[[A hepatite B passa ao bebê sobretudo no parto; vacina e imunoglobulina nas primeiras 12 horas impedem a infecção crônica na grande maioria.|q-fmabc2025-060,q-fmabc2024-097]] [[O HTLV passa principalmente pelos linfócitos do leite materno, e por isso a medida mais eficaz é não amamentar.|q-amrigs2025-077]]

[[O recém-nascido exposto a um adulto bacilífero não tem como se defender do bacilo: recebe tratamento preventivo antes da BCG, porque a vacina não protege quem já se infectou.|q-tp20231-114,q-unifesp2024-094,q-adap24-095]]`,
      fragmentos: [
        { id: "ver-hepb", titulo: "Hepatite B e HTLV", conferir: true, diretrizes: ["pcdt-ist"],
          questoes: ["q-fmabc2025-060","q-fmabc2024-097","q-amrigs2025-077"],
          texto: `- Mãe **HBsAg+**: **vacina + imunoglobulina** no RN, idealmente **em até 12 h**. {q-fmabc2025-060,q-fmabc2024-097}
- HTLV materno: **contraindicar o aleitamento**. {q-amrigs2025-077}` },
        { id: "ver-tb", titulo: "Recém-nascido exposto à tuberculose", conferir: true, diretrizes: ["ms-tuberculose"],
          questoes: ["q-tp20231-114","q-unifesp2024-094","q-adap24-095","q-uspsp4-113","q-unesp2021-089","q-unicamp2023-036","q-unesp2026-093","q-usp2026-088"],
          texto: `- RN que convive com bacilífero: **não vacinar com BCG ainda**; tratar a infecção latente e depois fazer a **prova tuberculínica**. {q-tp20231-114,q-unifesp2024-094,q-adap24-095}
- Esquema das provas até 2024 (Manual 2019): **isoniazida por 3 meses**; PPD < 5 mm → suspender e **vacinar**; ≥ 5 mm → completar o tratamento. {q-adap24-095,q-unifesp2024-094,q-uspsp4-113}
- Provas recentes cobram **rifampicina** (3 a 4 meses) e depois BCG. {q-unicamp2023-036,q-unesp2026-093}
- Já vacinado com BCG e exposto: **tratar a infecção latente** (as provas trazem isoniazida por 6 meses, sem PPD). {q-unesp2021-089,q-usp2026-088}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A banca descreve um recém-nascido e pede o agente. A tabela junta o que os capítulos explicaram: leia-a pela coluna do achado.`,
      fragmentos: [
        { id: "cmp-torchs", titulo: "TORCHS lado a lado", conferir: true,
          questoes: ["q-famerp2023-033","q-einstein2023-035","q-adap21-028","q-uspsp4-102","q-usprp2026-058"],
          prosa: `| Agente | Achado do SNC | Olho | Outros achados | Diagnóstico no RN | Tratamento |
|---|---|---|---|---|---|
| **Toxoplasma** | hidrocefalia, calcificações **difusas** | **coriorretinite** | icterícia, hepatoesplenomegalia | IgM/IgA, exame de imagem e fundo de olho | **pirimetamina + sulfadiazina + ácido folínico**, 12 meses |
| **Citomegalovírus** | microcefalia, calcificações **periventriculares** | coriorretinite | **surdez**, petéquias, PIG | **PCR na urina** nas primeiras semanas | **ganciclovir / valganciclovir**, 6 meses |
| **Rubéola** | microcefalia | **catarata** | **surdez, canal arterial** | IgM | suporte |
| **Herpes simples** | encefalite | ceratoconjuntivite | **vesículas agrupadas**, sepse | PCR | **aciclovir IV** |
| **Sífilis** | meningite | — | **periostite**, hepatoesplenomegalia, pênfigo palmoplantar, anemia | VDRL comparado ao materno, líquor, ossos longos | **penicilina** 10 dias |`,
          texto: `- Calcificações **difusas** + coriorretinite: toxoplasmose. {q-famerp2023-033}
- Calcificações **periventriculares** + surdez: CMV. {q-einstein2023-035}
- Catarata + surdez + canal arterial: rubéola. {q-adap21-028}
- Lesão óssea e anemia: sífilis; vesículas: herpes. {q-uspsp4-102,q-usprp2026-058}` },
      ],
    },
  ],
});
