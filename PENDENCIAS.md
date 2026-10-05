# Pendências do banco de questões

Situação em 04/10/2026: 5.455 questões, das quais 5.320 reais, de 51 provas, e 943 cartões da equipe (32 assuntos ainda sem cartão, seção 5).
Estão divididas em quatro grupos, do mais urgente ao que só completa o que já funciona.

A lista de figuras se atualiza sozinha com `npm run conferir`.
Este arquivo é a foto do dia; ao resolver um item, apague-o daqui.

---

## 1. Provas ou questões que faltam

Nenhuma prova inteira espera caderno ou gabarito no momento. Entraram em 04/10/2026: AMRIGS 2020 e 2021 e o Teste de Progresso 2025/1. O "IAMSPE 2024" (Edital 02/2024) é a prova que o banco já tinha como IAMSPE 2025: caderno e gabarito conferem, nada a acrescentar. Faltam apenas os anos que ainda não chegaram (por exemplo, a Santa Casa 2024 e novos anos da UNESP).

### FAMERP 2022 a 2026: caderno incompleto em 2024 e 2026, gabarito de 2023 não oficial

Entraram em 05/10/2026 as cinco provas da FAMERP (385 questões). Pendências:

- **FAMERP 2024**: o PDF não traz as questões 58 a 61 e 65, e a 64 está cortada (faltam as alternativas C e D). **FAMERP 2026**: faltam 69 a 71 e 76 a 79, e as 68 e 75 estão cortadas. As lacunas estão listadas em `LACUNAS_CONHECIDAS` (`testes/conferir-dados.mjs`) e no cabeçalho de cada prova, com o gabarito de cada uma. Entram quando o caderno completo chegar.
- **FAMERP 2023**: o gabarito é a lista "Respostas" do PDF compartilhado, não o definitivo da banca. A 34 (teste do coraçãozinho com 89%) parece errada no arquivo; conferir com o definitivo.
- Respostas da banca que a explicação marca como discutíveis: 2022-68; 2024-6 e 74; 2025-8, 28 e 38; 2026-45.

### Teste de Progresso 2025/1, AMRIGS 2020 e 2021: gabarito oficial discutível

**Teste de Progresso 2025/1** (comentário oficial do NIEPAEM; sem anuladas conhecidas): a nº 97 (ASC-US aos 30 anos) está marcada como **desatualizada**, porque o rastreamento brasileiro passou ao teste de DNA-HPV em 18/08/2025. A explicação avisa onde a letra da banca é discutível: 51 (cetoacidose com potássio de 2,8 mEq/L: a reposição do potássio precede a insulina), 66 (derrame pleural com massa: o primeiro passo costuma ser a toracocentese, não a videotoracoscopia), 68 (Gleason 6 com PI-RADS 4: a vigilância ativa também seria defensável), 113 (o metilfenidato é de primeira escolha, mas a banca elegeu a alternativa do relato dos professores) e 117 (a PA de 158/97 mmHg, se confirmada, também contraindicaria o combinado); e a **nº 28** (hidrocefalia de pressão normal: na figura, o aspecto típico, com ventrículos dilatados e sulcos apagados, está na imagem A, e a banca marcou a B, que mostra uma lesão frontal; conferir a letra com o caderno original).

**AMRIGS 2021** (edital definitivo; anuladas 1, 40, 44, 54, 56, 68 e 89): a explicação avisa nas nº 17 (IECA no infarto também é verdadeira), 25 (creatinina de rotina em hígido jovem), 33 (pela regra dos nove, tronco mais membro superior dão 45%, e a conta de Parkland da afirmativa II está certa) e 46 (a categoria da cardiotocografia depende da variabilidade, que a imagem não permite avaliar). A nº 83 chama de "viés de memória" o que é viés de aferição.

**AMRIGS 2020** (edital definitivo; anuladas 4, 19, 20, 31, 39, 49, 53, 55, 57, 75, 87 e 92): discutíveis a nº 13 (a aspirina como "único" antitrombótico), 14, 38 (o sinal de Dunphy também é de apendicite) e 61. Os motivos das anulações não constam do edital, e as explicações das anuladas dizem isso.

### Teste de Progresso 2025/2 e 2026/1: questões de gabarito discutível e cartões dos assuntos novos

O gabarito é o oficial do NIEPAEM. As explicações já avisam onde a letra da banca é discutível: 2025/2 nº 13 (contracepção aos 12 anos e comunicação aos responsáveis), 70 (pneumonia necrosante: C ou D) e 80 (tumor testicular: o seminoma puro também tem AFP normal); 2026/1 nº 22 (o enunciado não descreve o sorteio, mas a banca chama de ensaio clínico), 30 (a citologia inflamatória com metaplasia imatura é benigna, mas o gabarito a trata como ASC-US), 38 (Gleason 6 com PI-RADS 4: a vigilância ativa seria defensável), 87 (urodinâmica na incontinência mista), 97 (cirurgia primária em vez de quimioterapia neoadjuvante no câncer de ovário avançado) e 116 (isquemia aguda grau III: amputação primária). Os 12 assuntos abertos por essas provas (`ass-geriatria-perdapeso`, `ass-alergia-rinite`, `ass-psiq-personalidade`, `ass-infectoped-coqueluche`, `ass-derm-acne`, `ass-saudeplanetaria`, `ass-pneumo-hp`, `ass-neuro-medula`, `ass-psiq-toc`, `ass-genetica-teratogenese`, `ass-genetica-erros-inatos` e `ass-oft-orbita`) ainda não têm cartão da equipe. Quando o NIEPAEM publicar um gabarito definitivo diferente (anulações), conferir as letras.

### Teste de Progresso 2023/1 e 2023/2: revisão pelas diretrizes

O gabarito é o oficial (comentado). O caderno de 2023/1 ("versão gabaritada") marca a letra A em todas as questões, em ordem de redação da banca, e na 42 a marcação não bate com o comentário (a correta é a do cristaloide); por isso as alternativas de 2023/1 foram embaralhadas e a resposta de cada uma conferida pelo texto do comentário. Duas questões ficaram **desatualizadas** por divergirem da diretriz atual: 2023/1 nº 87 (insuficiência istmocervical com 29 semanas: a diretriz indica corticoide antenatal e não repouso absoluto) e 2023/2 nº 95 (ASC-US: o rastreamento brasileiro passou ao teste de DNA-HPV em 18/08/2025). Também marcada como desatualizada a 2026/1 nº 30 (citologia inflamatória tratada como atípica). Ficam com aviso, sem mudar a letra: 2023/1 nº 3 e 63 e 71 (conduta de via aérea, antibiótico precoce na fratura exposta), 2023/2 nº 36 (complicação da displasia do quadril), 85 (convulsão em diabética: glicemia capilar), 88 (corticoide na rotura pré-termo), 98, 107 e 114.

### Teste de Progresso 2020, 2021 e 2022: letras a conferir e comentário que falta

**2022 (04/10/2022):** o caderno veio sem comentário oficial e com a alternativa certa sempre em A; a explicação é toda da equipe e as alternativas foram embaralhadas. Quando a banca divulgar o gabarito comentado, enviar para conferir as 120 letras. Três questões estão como *desatualizadas*, com o motivo na questão: **28** (líquor com glicose de 26 mg/dL e o gabarito "enterovírus"), **70** (estágio IV, gabarito "quimioterapia neoadjuvante") e **117** (a marcação do caderno, "afastar dengue", contradiz a sensibilidade do teste: o gabarito aqui é "manter sob suspeita"). Também vale conferir a **7** (a peça da figura 1 foi lida como aneurisma, segundo a marcação do caderno: túnica média) e a **112** (a alternativa D, vulnerabilidades individual e social de ambas, também é defensável). **2020:** 91 e 105 foram anuladas pela banca; 81 e 90 estão *desatualizadas*. **2021:** 19 e 35 estão *desatualizadas*; a 120 não tem comentário oficial, só as referências.

### SES-SP 2026: gabarito da cópia do caderno, não o definitivo

As 100 letras vêm da lista de respostas da cópia do caderno; nenhuma questão está marcada como anulada. Enviar o **gabarito definitivo da seleção 2026** para conferir e marcar as anuladas. As explicações que dizem "foi a indicada no gabarito usado" apontam as letras mais duvidosas (por exemplo 12, 27, 44, 48, 70 e 92). A questão 48 (profilaxia da tuberculose em criança) segue o esquema de 270 doses, anterior ao protocolo atual do Ministério da Saúde (isoniazida por 6 meses).

## 2. Texto incompleto

Todas estas questões são da USP-RP e vieram de PDFs comentados que chegaram cortados.
O caderno oficial de cada ano resolve.

| Prova | Questão | O que falta |
| --- | --- | --- |
| USP-RP 2022 | 19 | Descrição da lesão da região da fralda. O caderno oficial também veio sem esse trecho (e sem a foto): precisa do original |
| USP-RP 2022 | 75 | Trecho do exame físico ("consciente, … difusos"). O caderno oficial também veio sem ele |
| USP-RP 2022 | 8 e 23 | A pergunta final não consta nem no caderno oficial; foi completada pela equipe. Conferir no original |

Os trechos cortados aparecem marcados no próprio texto como "[texto incompleto no material de origem]".

## 3. Gabaritos para conferir

### UNESP 2023: gabarito da edição usada, não da folha oficial

Conferir as 100 questões contra o gabarito definitivo da banca e marcar as anuladas (a edição não informa nenhuma).
A explicação já avisa onde a alternativa dada como certa tem imprecisão: 2023-8 (a adrenalina intramuscular é a de 1:1.000, não 1:10.000) e 2023-59 (tratamento do HIV "na fase de contágio").

### UNIFESP 2024 nº 1 e nº 88: gabarito que depende da leitura da banca

Na **nº 1** (aneurisma sacular de aorta infrarrenal de 3 cm) o gabarito é o tratamento endovascular (C), e a explicação diz que ele só se sustenta pela forma sacular: pelo diâmetro isolado, a vigilância (A) seria a conduta. Na **nº 88** (triagem de fenilcetonúria que não se confirmou) o gabarito é a hiperfenilalaninemia materna (C), mas o enunciado não traz história materna. Conferir as duas letras com a folha oficial da banca.

### UNIFESP 2023 nº 30: gabarito que não combina com o enunciado

O banco marca a letra A (teste t para duas populações independentes), mas o enunciado relaciona a mortalidade a quatro variáveis contínuas (leitos de UTI, Gini, IDH e analfabetismo), o que pede regressão múltipla ou, entre as opções, a correlação de Pearson (B). Conferir a letra com a folha oficial da banca; a explicação já avisa.

### FAMEMA 2021, 2022, 2023 e 2025

- **2021**: gabarito da folha oficial definitiva (95 anulada). A 51 (laqueadura) está marcada como desatualizada, porque a Lei 14.443/2022 mudou a regra, e a 17 (hérnia femoral) tem enunciado discutível.

- **2022**: gabarito da folha oficial. A explicação avisa onde ele é discutível: 18 (coorte), 65 (classificação laparoscópica de Gomes), 68 (espaço do Rives-Stoppa) e 69 (sutura de Halsted).
- **2023**: gabarito da edição em texto usada (como na UNESP), não da folha oficial; a edição não informa anuladas. Conferir com o definitivo, em especial 22, 25, 39, 45, 62 e 77, onde a explicação já avisa que o gabarito parece discutível.
- **2025**: as 100 letras são as do gabarito divulgado pela banca no dia da prova (as 15 que antes eram só da equipe coincidem com ele). A 39 (diarreia) tem duas alternativas defensáveis, a A (zinco) e a D (ciprofloxacina na disenteria). Falta o gabarito definitivo (14/01/2025) para marcar as anuladas.

### USP-RP 2021 a 2025: gabarito vindo do PDF comentado, não da folha oficial

Em 03/10/2026 os cadernos de 2021, 2022 e 2023 foram comparados com o banco: em **2021** os 118 gabaritos batem com o do caderno (comparando pelo conteúdo, porque a numeração das versões é outra); em **2022** só diverge a 100 (banco B, caderno D); em **2023** o caderno traz a folha em branco nas questões 31–34 e 37–40 e diverge em 36 (banco C, caderno D), 59 (banco anulada, caderno C) e 95 (banco B, caderno C). Nada foi mudado: as explicações atuais sustentam o gabarito do banco e não há como saber, sem a folha oficial da banca, qual das duas fontes está certa. Falta só a folha oficial para decidir 2022-100 e 2023-36, 59 e 95; 2024 e 2025 seguem sem conferência.

Vale conferir **todos** os gabaritos desses cinco anos contra a folha oficial.
Nas questões abaixo, a explicação já avisa que o gabarito é discutível:

| Questão | Ponto de dúvida |
| --- | --- |
| 2021-87 | Na cloaca, a hidrocolpia também explica a massa no hipogástrio; o gabarito dá hidronefrose |
| 2022-14 | O gabarito aceita só o IECA; o bloqueador de canal de cálcio também seria opção aceitável |
| 2022-15 | Família com filhos adotivos: o gabarito chama de "funcional", muitos autores chamam de nuclear |
| 2024-45 | Cetoacidose euglicêmica: a alternativa sobre as gliflozinas também é verdadeira |
| 2024-60 | TSH alto com T4 baixo é hipotireoidismo primário, mas o gabarito dá hipopituitarismo |
| 2025-40 | O DIU de cobre é categoria 1 da OMS; o gabarito prefere a pílula de progestágeno |
| 2025-50 | A OMS recomenda cálcio a partir de 20 semanas; o gabarito diz que nenhuma profilaxia deve ser prescrita |

### AMRIGS 2022 a 2025: gabarito definitivo oficial, mas discutível pela literatura

O gabarito é o da banca e fica como está. A explicação diz onde ele diverge das fontes:

| Questão | Ponto de dúvida |
| --- | --- |
| 2022-22 | A desnutrição foi dada como a exceção, mas ela prejudica a cicatrização |
| 2022-23 | Classificação de Johnson: a alternativa C erra no tipo V, e a B descreve corretamente o tipo I |
| 2022-24 | A pergunta pede a INCORRETA, e a D também está incorreta (Y de Roux é o tratamento dos refratários) |
| 2022-32 | Enunciado curto; a diverticulite complicada também entra no diferencial |
| 2022-35 | Radiografia de tórax pré-operatória de rotina não é recomendada pelas diretrizes atuais |
| 2022-42 | PIG entre os percentis 3 e 10: a SMFM sugere parto com 38 a 39 semanas; o gabarito diz a partir de 39 |
| 2022-58 | O esquema da alternativa D é o recomendado para doença inflamatória pélvica em internação |
| 2023-3 | "Hipercalcemia é o distúrbio mais frequente nas síndromes paraneoplásicas" depende da definição usada |
| 2023-16 | Rastreamento colorretal: a banca trocou de 45 para 50 anos; USPSTF e ACS recomendam começar aos 45 |
| 2023-21 | A alternativa D (Chagas como causa mais comum no Brasil) também é defensável |
| 2023-30 | Na hemorragia do delgado, a causa mais comum no geral é a angiodisplasia, não Crohn (alternativa C) |
| 2023-32 | Idade avançada e disfunção renal também são fatores de risco nos índices usados |
| 2023-37 | O T por tamanho vale para o GIST; no adenocarcinoma de delgado, o T é pela profundidade |
| 2023-67 | Idade gestacional abaixo de 38 semanas (alternativa C) também é fator de risco |
| 2023-71 | Aos 2 meses, estreptococo do grupo B e pneumococo também são prováveis |
| 2024-25 | Estenose pilórica no adulto: a banca dá úlcera, mas hoje a neoplasia responde por boa parte dos casos |
| 2024-27 | Pólipo de vesícula: o gabarito usa 8 mm; o limiar mais aceito para cirurgia é 10 mm |
| 2024-36 | A alternativa B (reparo das hérnias paraesofágicas decidido pelos sintomas) também é defensável |
| 2025-6 | "Apenas enterobactérias reduzem nitrato" é excessivo; foi a alternativa escolhida por exclusão |
| 2025-16 | A dupla antiagregação após AVC menor também é eficaz, o que relativiza o "único" da alternativa B |
| 2025-29 | Diverticulite com ar pericólico: as diretrizes indicam antibiótico, e a alternativa D não o menciona |
| 2025-51 | Chamar 10 horas de trabalho de parto com 4 cm de "fase latente prolongada" é impreciso |
| 2025-65 | Refluxo vesicoureteral grau II com ITU febril de repetição: há diretrizes que manteriam a profilaxia |

### Outras bancas

| Questão | Ponto de dúvida |
| --- | --- |
| USP-SP 2025-114 | A alternativa D também seria defensável pelos dados da tabela |
| IAMSPE 2021-8 | Os valores da gasometria não fecham entre si (pH, pCO2, bicarbonato e BE) |
| IAMSPE 2021-29 | O preparo intestinal com antibiótico oral (E) é hoje recomendado na cirurgia colorretal eletiva |
| IAMSPE 2021-31 | O item "jejum oral" foi dado como certo; as diretrizes atuais preferem a dieta oral precoce |
| IAMSPE 2021-78 | Estudo ecológico: "conclusões generalizáveis com maior facilidade" é a resposta da banca, mas é discutível |
| IAMSPE 2022-25 | Marcadores: a banca deu fígado–CEA/alfafetoproteína (D); estômago–CEA/CA 19-9 (A) também é verdadeira |
| IAMSPE 2022-32 | Pela recomendação atual, a semaglutida também seria suspensa (seriam três medicações, não duas) |
| IAMSPE 2023-18 | Fratura do enforcado: a banca deu "bom prognóstico" (B), mas "fratura do áxis" (A) também é verdadeira |
| IAMSPE 2025-11 | Resistência do pneumococo às quinolonas: a banca começa por gyrA; para a levofloxacina, a literatura aponta parC |
| IAMSPE 2025-61 | Moro: a banca deu a ausência bilateral (E); a assimetria (B) também é anormal |
| IAMSPE 2025-64 | Rotavírus: A e C estão ambas corretas |
| IAMSPE 2025-71 | Marcos até 6 meses: a banca deu E; D (controle cefálico) também é marco do período |
| IAMSPE 2025-77 | Tuberculose na criança: a banca deu D; A também é incorreta (sem etambutol abaixo de 10 anos) |
| IAMSPE 2025-89 | Hanseníase: a banca aceitou a especificidade de 95% da A; a B descreve achado real da forma indeterminada |
| IAMSPE 2026-74 | Vacinas dos 4 meses: a alternativa inclui a meningocócica C, que é dos 3 e 5 meses |
| IAMSPE 2026-91 | Psicopatologia: o quadro é de ideias de referência e delírio; a banca deu pseudoalucinação (C) |

## 4. Figuras para anexar (86)

É só recortar do caderno oficial e salvar em `dados/imagens/` com o nome indicado.
Depois, apague a linha `imagemPendente` da questão no arquivo `dados/prova-*.js`: enquanto ela existir, a questão fica fora do estudo dos alunos (`npm run conferir` avisa quando a figura já chegou e a linha ficou para trás).
Pela plataforma: **Questões para Atualizar › Enviar a figura** libera a questão na hora (com a nuvem, para toda a turma), e **Baixar as atualizações** + `npm run atualizar-dados -- arquivo.json` traz as figuras e os consertos para cá.
O nome exato de cada arquivo e a descrição do que a prova mostrava estão em `dados/imagens/LEIA-ME.md`.
As provas da AMRIGS (2022 a 2025), a USP-RP 2025 e 2026, a UNIFESP (2022 a 2026), as do IAMSPE (2021 a 2026) e a UNESP 2023 já têm todas as figuras.

| Prova | Qtd | Questões |
| --- | --- | --- |
| USP-RP 2022 | 3 | 19, 21, 23 (o caderno veio sem as imagens destas) |
| USP-RP 2024 | 25 | 2, 4, 10, 11, 19, 21, 22, 24, 31, 34, 35, 38, 41, 42, 44, 63, 68, 76, 78, 80, 82, 83, 89, 93, 96 |
| USP-SP 2023 | 25 | 77–79, 81–83, 85–88, 95, 97, 98, 102, 104–106, 112–117, 119, 120 |
| USP-SP 2026 | 1 | 63 |
| Santa Casa 2022 | 6 | 11, 13, 23, 25, 54, 56 |
| Santa Casa 2023 | 9 | 10, 15, 17–19, 45, 49, 75, 76 |
| Santa Casa 2025 | 5 | 38, 40, 44, 63, 64 |
| Santa Casa 2026 | 12 | 10, 17, 21, 23, 29, 33–36, 39, 40, 42 |

Quando a figura chegar, vale reler a explicação.
Ela foi escrita a partir do texto e do gabarito, sem ver a imagem.
Isso pesa principalmente nas questões cujas alternativas só fazem sentido com a figura:

- USP-RP 2021-97 (fonogramas)
- USP-RP 2023-65 (esquema do néfron)
- USP-RP 2024-42 (fonogramas)

### Os cadernos que resolvem quase tudo de uma vez

- **USP-RP 2024**, caderno com a folha de gabarito. Resolve 25 figuras e a conferência do gabarito. (Os cadernos de 2021 a 2023 foram aplicados em 03/10/2026; o de 2025 já foi aplicado em 01/10/2026: as 27 figuras e a 2025-99 saíram daqui, mas a folha de gabarito veio em branco, então o gabarito de 2025 ainda precisa da folha oficial.)
- **USP-SP 2023**: 25 figuras.
- **Santa Casa 2022, 2023, 2025 e 2026**: 32 figuras.
- **UNESP 2023**: o gabarito definitivo oficial.

## 5. Assuntos sem cartão da equipe (32)

O banco tem 943 cartões em 238 dos 270 assuntos. Faltam cartões (três por assunto é o piso) para: `ass-politicasnacionais`, `ass-leishmaniose`, `ass-restricaocrescimento`, `ass-partopretermo`, `ass-vitalidadefetal`, `ass-ddsmalformacoes`, `ass-dorpelvica`, `ass-neuroendocrinos`, `ass-divertmeckel`, `ass-hipoglicemianeo`, `ass-intussuscepcao`, `ass-emerg-ambientais`, `ass-marcadorestumorais`, `ass-toxinfeccao`, `ass-anatomiacirurgica`, `ass-febrelactente`, `ass-orl-glandulas`, `ass-caesofago`, `ass-sincope`, `ass-psiq-alimentar` e os 12 do Teste de Progresso listados na seção 1. Em *Revisão Rápida › Cobrir os assuntos sem cartão — em lote* dá para gerar tudo numa tarde; os 376 cartões de `flashcards-assuntos-novos.js` ainda esperam a conferência de um professor (`revisao: "pendente"`).
