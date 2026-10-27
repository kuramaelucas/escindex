# Auditoria do Simulado EPM 6

Gerada em 27/10/2026 a partir de `dados/banco-simulado-epm-6.js` e `dados/simulados-equipe.js` (simulado `sim-epm6`, 120 questões, 300 minutos, sem bloco recomendado). Os números são **posições no simulado**, que seguem a ordem da prova **USP-RP 2021** (`prova-usprp-2021`, 120 questões). Foi a única prova de 2021 da USP que existe na plataforma (não há `prova-usp-2021` da capital); a plataforma já tinha o banco adaptado da USP-SP de outros anos, mas nenhum da USP-RP 2021.

As medidas se repetem com `node ferramentas/medir-banco-adaptado.mjs banco-simulado-epm-6 prova-usprp-2021 --direcao acima` (ou `npm run medir-bancos`); a conferência de números, com `npm run conferir-numeros -- banco-simulado-epm-6`.

## 1. Regra de construção

- Cada questão é **autoral** (banca "Esc — Banco Didático", `real: false`, ano 2027), no **mesmo assunto da taxonomia** e na **mesma posição** da questão da USP-RP 2021, com caso clínico, dados e alternativas próprios.
- O gabarito é **a alternativa anterior à da prova real** (B→A, C→B, D→C, A→D), o inverso do EPM 5. A questão **120**, anulada em 2021, foi escrita como questão normal, com gabarito **A**, que fecha o equilíbrio das letras.
- Quatro alternativas por questão. Distribuição por área **idêntica** à da prova real: Clínica Médica 53, Ginecologia e Obstetrícia 23, Cirurgia Geral 21, Pediatria 14, Medicina Preventiva e Social 9.
- **A justificativa ensina o conceito** (padrão pedido em 26/10/2026): dicas do enunciado em destaque, mecanismo, contexto epidemiológico, o motivo de cada alternativa errada e o trecho «Para fixar o conceito».
- Duas questões foram trocadas durante a construção por repetirem decisões de bancos anteriores: a 65 (doença inflamatória pélvica, parecida com uma questão do simulado da USP, virou vaginose bacteriana) e a 87 (atresia de esôfago, que repetia a 007 do banco da USP 2025, virou doença de Hirschsprung). Na reta final, as 117, 118 e 120 também foram refeitas por semelhança de vocabulário com questões de outros bancos (nefropatia por IgA, preparo do acesso vascular na doença renal crônica, ponto de corte e acurácia do teste).
- Não há figura: as questões de 2021 que dependiam de imagem foram escritas só com texto, com os dados no enunciado.

## 2. Medidas

| Critério | Resultado | Alvo | Situação |
|---|---|---|---|
| Letra do gabarito | A 28, B 29, C 33, D 30 | ~25% cada (± 4 pontos) | ok |
| Posição do gabarito por tamanho (1ª = mais longa) | 1ª 33, 2ª 27, 3ª 28, 4ª 32 (10 com empate) | ~25% cada (± 4 pontos) | ok, nas bordas (26 a 34 por posição) |
| Maior margem da alternativa mais longa sobre a 2ª | 9,7%; 0 posição acima do limite | no máximo 10% | ok |
| Distribuição por área | idêntica à da prova real | idêntica | ok |
| Gabarito = letra anterior à da prova real | 1 posição livre (anulada): 120 | B→A, C→B… | ok |
| Semelhança do enunciado com a questão real correspondente | máxima 46,2% (posição 70); 0 acima do limite | no máximo 50% | ok |
| Repete outra questão do banco | 0 | 0 | ok |
| Alternativas erradas comentadas na explicação | 360 de 360 | todas | ok |
| Número do enunciado ≠ da explicação | 0 de 120 | 0 | ok |
| Dificuldade marcada | fundamental 34, intermediário 59, avançado 27 | alvo calibrado 15/45/40 | informativo (faltam avançadas) |

## 3. Diretrizes: o que foi e o que não foi conferido

**Nenhum texto oficial de diretriz foi aberto nesta rodada.** Todas as 120 questões estão no nível «memória», e cada referência diz isso. Pontos em que a regra muda com o tempo ou em que a versão citada pode estar velha:

- **1, 16, 12, 23, 103** (raiva, sarampo, hepatite B do recém-nascido, contraindicações de vacina, infecção latente da tuberculose): protocolos e calendário do Ministério da Saúde e do Programa Nacional de Imunizações, que mudam com frequência; esquemas e prazos devem ser conferidos na versão vigente.
- **2** (Lei Complementar 141/2012): prazos do Relatório Detalhado do Quadrimestre Anterior conforme a lei; a regra de financiamento da União não é cobrada.
- **9** (faringoamigdalite): doses de penicilina benzatina pelo corte de 20 kg, como no protocolo brasileiro; a edição citada não foi aberta.
- **21** (malária por vivax): esquema de cloroquina e primaquina de 7 dias do Ministério da Saúde; a vigência (incluindo a tafenoquina) deve ser conferida.
- **26** (teste do coraçãozinho): limiares de saturação do protocolo brasileiro de triagem; conferir o fluxo atual.
- **33** (reanimação neonatal): Programa de Reanimação Neonatal da Sociedade Brasileira de Pediatria; a edição vigente deve ser conferida.
- **61** (citologia glandular), **64** (pílula esquecida), **65** (vaginose bacteriana), **50** (herpes genital): diretrizes brasileiras de 2016 a 2022, de memória.
- **76** (nódulo pulmonar): critérios de Fleischner de 2017; **90** (hemorragia intracerebral com varfarina): metas pressóricas e reversão da AHA/ASA, edição não conferida.
- **98** (DPOC) e **32** (asma): GOLD e GINA citados sem ano, na edição vigente; os critérios usados são estáveis.
- **108** (ataque isquêmico transitório): dupla antiagregação por 21 dias a partir de ABCD2 de 4 ou mais; critérios dos estudos CHANCE e POINT, sem a edição mais nova da diretriz.
- **106, 107, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120**: critérios de livros-texto e consensos citados em «memória»; a edição citada em cada referência pode ter sido atualizada (KDIGO, ASH, AHA/ACC, AHA 2017 para Kawasaki).

## 4. Questões com ressalva

- **9**: as doses de penicilina benzatina dependem do corte de peso adotado no protocolo.
- **26**: o fluxograma da triagem tem variações entre o protocolo do Ministério da Saúde e o da Sociedade Brasileira de Pediatria.
- **103**: o esquema de tratamento da infecção latente (isoniazida por 6 meses ou rifampicina por 4 meses) e o limiar da prova tuberculínica em crianças devem ser conferidos no manual em vigor.
- **105**: a indicação de cirurgia antirrefluxo segue critérios de consenso; a pHmetria depende do ponto de corte adotado pelo serviço.
- **116**: a dose e a duração da ivermectina variam entre protocolos (200 mcg/kg em 1 ou 2 dias).

## 5. Revisão de conteúdo (27/10/2026)

Feita por **leitura cega**: as 120 questões foram relidas sem o gabarito e respondidas de novo, e depois comparadas com ele. Foi uma releitura pela mesma autoria, e não por revisores independentes; a revisão por pessoas da equipe continua recomendada antes de dar o simulado a alunos. Ajustes feitos:

- **108**: o enunciado dava ABCD2 de 6 pontos, mas os dados do caso (idade 67, pressão 168/94, déficit motor, 30 minutos, sem diabetes) somam **5**; o enunciado e a explicação foram corrigidos (a conduta, dupla antiagregação, não muda, pois vale a partir de 4).
- **112**: a frase sobre a filtração real escondida pela creatinina normal foi reescrita (o número anterior era incoerente).
- **111**: a porcentagem de mutações genéticas na demência frontotemporal virou «cerca de 40% têm história familiar», que é o dado seguro.
- **118**: uma estatística nacional de início de diálise por cateter foi retirada por não ter fonte conferida.
- Dicas do enunciado conferidas contra os números dos enunciados (`conferir-numeros`: 0 divergências) e metas do medidor refeitas depois dos ajustes: todas cumpridas.
- Pendências que a leitura não resolve: conferir em texto oficial os itens da seção 3.

## 6. Conferência com fontes externas (27/10/2026)

Ferramentas: busca na web e leitura de páginas. **Só alguns domínios responderam** (gov.br e sbp.com.br abriram; portais como afya.com.br e saude.mg.gov.br não resolveram nesta máquina). Dois PDFs oficiais foram lidos no texto; os demais itens vieram de trechos de busca de fontes oficiais ou secundárias, e estão marcados como tal.

**Conferido em texto oficial**
- **21** (malária por vivax): PDF «Esquemas recomendados para o tratamento da malária no Brasil» (Ministério da Saúde). O esquema atual depende da G6PD: 6,1 UI/gHb ou mais, cloroquina por 3 dias e tafenoquina em dose única; de 4,1 a 6,0, cloroquina por 3 dias e primaquina por 7 dias; 4,0 ou menos, primaquina semanal. **Erro achado:** o enunciado dizia «G6PD normal», caso em que hoje a resposta seria tafenoquina, e não primaquina por 7 dias. O enunciado passou a 5,2 UI/gHb (intermediária) e a explicação traz as três faixas. As doses de primaquina por peso não foram conferidas.
- **33** (líquido meconial): diretrizes da Sociedade Brasileira de Pediatria (atualização de maio de 2021), seção 7. A resposta está certa, mas a explicação dizia que a boca e o nariz só se aspiram «se houver secreção»; o texto oficial diz que é prudente aspirá-los suavemente com sonda nº 10 nos passos iniciais do não vigoroso, em até 30 segundos, com ventilação por máscara em ar ambiente no primeiro minuto, e que a aspiração traqueal só vale com forte suspeita de obstrução após 30 segundos de ventilação efetiva. A explicação foi corrigida. A versão de 2022 não foi aberta.

**Conferido em trecho de busca (fonte oficial ou que a cita)**
- **1** (raiva): esquema de 4 doses (dias 0, 3, 7 e 14), Nota Informativa nº 26/2017 do Ministério da Saúde, e soro mais vacina quando o animal não pode ser observado. Sem divergência.
- **2** (Lei Complementar 141/2012): art. 36, §5º, audiência pública até o final de maio, setembro e fevereiro; relatório ao conselho de saúde. Sem divergência.
- **16** (sarampo): notificação em até 24 horas e bloqueio vacinal oportuno em até 72 horas; coleta de IgM e RT-PCR. Sem divergência.
- **26** (teste do coraçãozinho): Portaria GM/MS nº 1.940/2018 (oximetria entre 24 e 48 horas; alteração, nova medida em 1 hora; alteração confirmada, ecocardiograma em 24 horas). A resposta está de acordo. Há relato, em fonte secundária, de uma revisão de 2022 da Sociedade Brasileira de Pediatria com outros limiares (89% ou menos positivo; 90 a 94% ou diferença de 4 pontos ou mais, repetir até duas vezes), **não confirmado em texto**; a referência da questão diz isso.
- **9** (faringoamigdalite): os cortes de peso da penicilina benzatina variam entre protocolos (20, 25 e 27 kg). O caso tinha 22 kg e podia dar 600.000 UI conforme o protocolo; passou a **30 kg** (9 anos), acima de todos os cortes, e a explicação diz que o corte varia.
- **103** (infecção latente da tuberculose): nota informativa de 2024 do Ministério da Saúde acrescenta 3 meses de rifampicina com isoniazida (3RH) para menores de 10 anos. A resposta (6H ou 4R) continua entre os esquemas válidos; a explicação cita o 3RH. Texto da nota não aberto.
- **50 e 65** (herpes genital e vaginose bacteriana): aciclovir 400 mg a cada 8 horas por 7 a 10 dias e metronidazol 250 mg, 2 comprimidos, duas vezes ao dia por 7 dias constam em guias e protocolos que reproduzem o protocolo do Ministério da Saúde de 2020; o texto da edição vigente não foi aberto.
- **61** (citologia com atipia glandular): colposcopia com avaliação do canal endocervical e investigação do endométrio acima de 35 anos, segundo estudo brasileiro que cita as diretrizes do INCA de 2016; o PDF do INCA não foi lido por inteiro.

**Não conferido** (continuam em «memória»): 64, 76, 90, 98, 108 e as demais questões. A leitura de PDFs grandes depende de baixá-los e extraí-los; ficou para uma próxima rodada.
