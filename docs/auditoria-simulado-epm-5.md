# Auditoria do Simulado EPM 5

Gerada em 26/10/2026 a partir de `dados/banco-simulado-epm-5.js` e `dados/simulados-equipe.js` (simulado `sim-epm5`, 100 questões, 240 minutos, sem bloco recomendado). Os números são **posições no simulado**, que seguem a ordem da prova da UNIFESP-EPM 2023 (Acesso Direto, `prova-unifesp-2023`), a única prova de residência da UNIFESP-EPM que ainda não era referência de um banco adaptado (2022, 2024, 2025 e 2026 já eram; a Avaliação Discente do Internato 2026.2 é prova da graduação e não entra).

As medidas se repetem com `node ferramentas/medir-banco-adaptado.mjs banco-simulado-epm-5 prova-unifesp-2023 --direcao abaixo` (ou `npm run medir-bancos`); a conferência de números, com `npm run conferir-numeros -- banco-simulado-epm-5`.

## 1. Regra de construção

- Cada questão é **autoral** (banca "Esc — Banco Didático", `real: false`, ano 2027), no **mesmo assunto da taxonomia** e na **mesma posição** da questão da prova real de 2023, com caso clínico, dados e alternativas próprios.
- O gabarito é **a alternativa seguinte à da prova real** (A→B, B→C, C→D, D→A, como no EPM 2 e no EPM 4). As questões **32, 34, 38 e 48**, anuladas em 2023, foram escritas como questões normais, com gabaritos **D, D, D e A**, que fecham o equilíbrio das letras.
- Quatro alternativas por questão. Distribuição por área **idêntica** à da prova real: Clínica Médica 38, Cirurgia Geral 25, Medicina Preventiva e Social 15, Ginecologia e Obstetrícia 15, Pediatria 7.
- **A justificativa ensina o conceito** (pedido de 26/10/2026): além do padrão (dicas do enunciado em destaque, mecanismo, contexto epidemiológico e o motivo de cada alternativa errada), cada questão traz um trecho **«Para fixar o conceito»** com a regra geral, o raciocínio que se repete em outras provas e o que diferencia condutas parecidas (por exemplo, as doses de albumina da cirrose, as faixas do LIRAa, o quadro de escolha do teste estatístico, as cores da Portaria 344).
- Quatro questões foram trocadas durante a construção porque repetiam decisões de bancos anteriores: a 12 (dissecção de aorta, que repetia a 018 do EPM 4, virou crise de feocromocitoma), a 36 (inibidor de SGLT2 na doença renal, que repetia a 055 do EPM 2, virou hipoglicemia por sulfonilureia), a 69 (crise de asma na criança, parecida com uma questão real da USP, virou interpretação de espirometria) e a 92 (tamponamento cardíaco, que repetia a 008 do EPM 4, virou fratura pélvica instável).
- Não há figura: as questões de 2023 que dependiam de imagem ou gráfico foram escritas só com texto, com os dados no enunciado.

## 2. Medidas

| Critério | Resultado | Alvo | Situação |
|---|---|---|---|
| Letra do gabarito | A 24, B 26, C 28, D 22 | ~25% cada (± 4 pontos) | ok |
| Posição do gabarito por tamanho (1ª = mais longa) | 1ª 24, 2ª 25, 3ª 29, 4ª 22 (7 com empate) | ~25% cada | ok |
| Maior margem da alternativa mais longa sobre a 2ª | 9%; 0 posição acima do limite | no máximo 10% | ok |
| Distribuição por área | area-cg 25, area-cm 38, area-go 15, area-mps 15, area-ped 7 | idêntica à da prova real | ok |
| Gabarito = letra seguinte à da prova real | 4 posições livres (anuladas): 32, 34, 38, 48 | A→B, B→C… | ok |
| Semelhança do enunciado com a questão real correspondente | máxima 38,9% (posição 8); média 18,3%; 0 acima do limite | no máximo 50% | ok |
| Repete outra questão do banco | 0 | 0 | ok |
| Alternativas erradas comentadas na explicação | 300 de 300 | todas | — |
| Número do enunciado ≠ da explicação | 0 de 100 | 0 | ok |
| Dificuldade marcada | fundamental 18, intermediário 55, avançado 27 | alvo calibrado 15/45/40 | informativo (faltam avançadas) |

## 3. Diretrizes: o que foi e o que não foi conferido

**Nenhum texto oficial de diretriz foi aberto nesta rodada.** Todas as 100 questões estão no nível «memória», e cada referência diz isso. Pontos em que a regra muda com o tempo ou em que a versão citada pode estar velha:

- **8 e 15** (sepse): Surviving Sepsis Campaign 2021; a atualização de 2026 não foi conferida (prazos de antibiótico e hidrocortisona).
- **13 e 92** (trauma): ATLS 10ª edição; a 11ª (2025) não foi conferida. Os 1.500 mL / 200 mL por hora do hemotórax são os da 10ª.
- **53** (AVC): AHA/ASA 2019; atualização de 2026 e janelas para tenecteplase não conferidas.
- **14** (DPOC) e **69** (asma): GOLD e GINA citados sem ano, na edição vigente; os critérios usados são estáveis.
- **23** (financiamento): os pisos de 15% (municípios) e 12% (estados) são da Lei Complementar 141/2012; a regra da **União** mudou (Emenda Constitucional 95/2016, arcabouço fiscal de 2023) e não foi conferida em texto.
- **60** (vacina HPV): dose única para 9 a 14 anos, esquema de 2024 do Programa Nacional de Imunizações; a vigência atual **precisa ser confirmada** no calendário. O trecho sobre rastreamento (DNA-HPV a partir de 2025) segue o que o histórico do projeto já registra.
- **31, 66, 70 e 18** (IST e hanseníase): protocolos do Ministério da Saúde de 2022; o esquema de **70** (penicilina benzatina em dose única para recém-nascido de mãe não tratada, com exames normais) segue o cenário correspondente do protocolo, que admite também a penicilina cristalina por 10 dias se o seguimento não for garantido; texto não aberto.
- **29** (Portaria 344/1998): as cores e prazos são os clássicos; a receita digital vem mudando as regras, e a norma vigente deve ser conferida.
- **1** (fibrilação atrial): citadas a diretriz brasileira de 2023 e as de 2023-2024 (AHA/ACC e ESC); o escore CHA2DS2-VASc tem versão nova (CHA2DS2-VA, ESC 2024) que dispensa o sexo — a questão não depende dessa diferença.
- **63, 38, 82, 86**: critérios do IMWG, I2 da metanálise, critérios japoneses de ressecção endoscópica e margens do melanoma são os clássicos, sem edição mais nova conferida.

## 4. Questões com ressalva

- **70** (sífilis congênita): conduta conforme o protocolo de 2022, de memória; ver acima.
- **60** (HPV): esquema de 2024 sujeito a mudança.
- **23** (financiamento): regra da União fora do que a questão cobra, mas citada na explicação.
- **29** (receitas): a regra de validade e quantidade (30 dias e até 60 dias de tratamento para B1 e C1) deve ser conferida na versão em vigor da Portaria 344.
- **47** (fístula urogenital): o teste do tampão está descrito com azul de metileno na bexiga e índigo carmim (ou fenazopiridina) por via venosa; variações de técnica existem.
- **80** (rim): conduta do estágio T1a; limiar de 4 cm da AUA/EAU não conferido na edição mais recente.

## 5. Segunda revisão de conteúdo (27/10/2026)

Feita por **leitura cega**: as 100 questões foram relidas sem o gabarito e respondidas de novo, e depois comparadas com ele (100 de 100 iguais). Foi uma segunda leitura pela mesma autoria, e não por revisores independentes; a revisão por pessoas da equipe continua recomendada antes de dar o simulado a alunos. Ajustes feitos:

- **67**: o enunciado dizia que o lactente de 4 meses já tinha a «segunda dose» de pentavalente, VIP e pneumocócica no segundo e terceiro meses, o que não fecha com o calendário; passou a ser a primeira dose, aos 2 meses. Na explicação, a sequência vacinal foi corrigida (meningocócica C aos 3 e 5 meses).
- **89**: as áreas queimadas (tronco anterior e posterior e membro superior = 45%) não somavam os 30% do enunciado; passaram a tronco anterior, membro superior esquerdo, face e pescoço, que dão cerca de 30%.
- **70**: o motivo de errar a penicilina cristalina deixou de dizer que ela só vale com alteração; o protocolo a admite também quando o seguimento não é garantido.
- **24**: «Secretaria Estadual de Saúde do estado» era redundante; **35**: frase solta sobre outros instrumentos reescrita; **91**: concordância («discreta tiragem»).
- Dicas do enunciado conferidas contra os números dos enunciados (`conferir-numeros`: 0 divergências) e metas do medidor refeitas depois dos ajustes: todas cumpridas (posição do gabarito por tamanho 25/24/29/22).
- Pendências que a leitura não resolve: conferir em texto oficial os itens listados na seção 3 (vacina HPV, regra da União, sífilis congênita, receituário, edições de SSC e ATLS).

## 6. Conferência com fontes externas (27/10/2026)

Mesmo método da seção 6 de `docs/auditoria-simulado-epm-6.md`: só gov.br e sbp.com.br abriram nesta máquina (afya.com.br, saude.mg.gov.br, scielo.iec.gov.br e bvsms.saude.gov.br não); um PDF da Sociedade Brasileira de Pediatria foi lido no texto e a página da Society of Critical Care Medicine sobre a Surviving Sepsis Campaign 2026 foi lida; o resto veio de trechos de busca.

**Erro achado e corrigido**
- **70** (sífilis congênita): o enunciado dava VDRL do recém-nascido de 1:2 (reagente), com tudo o mais normal, e a resposta era penicilina benzatina em dose única. Pelo texto da Sociedade Brasileira de Pediatria (conduta do Ministério da Saúde de 2006) e pelo protocolo de IST de 2020 que aparece nas buscas, a benzatina vale quando o VDRL do recém-nascido é **não reagente** e todos os exames são normais; com VDRL reagente em qualquer título, o esquema é penicilina cristalina por 10 dias. O enunciado passou a VDRL não reagente, e a explicação traz a regra e o motivo de a cristalina ser a resposta quando o VDRL é reagente. O texto da edição vigente do protocolo do Ministério não foi aberto.

**Conferido sem divergência**
- **8 e 15** (sepse): a Surviving Sepsis Campaign 2026 foi publicada em março de 2026 e mantém antimicrobiano em até 1 hora no choque e na sepse provável, em até 3 horas na sepse possível sem choque, sugere corticoide venoso no choque séptico, noradrenalina como primeira escolha e vasopressina como segundo agente. As questões citam a edição de 2021 no enunciado; a conduta é a mesma na de 2026. A dose da hidrocortisona e o critério de início não constavam na página e não foram conferidos.
- **60** (vacina HPV): dose única de 9 a 14 anos e três doses em imunossuprimidos, confirmadas no portal do Ministério da Saúde (Nota Técnica nº 41/2024; calendário e instrução normativa de 2026). O trecho sobre rastreamento por DNA-HPV não foi conferido.
- **23** (financiamento): estados, 12%, e municípios, 15%, conferidos em busca em fonte oficial; a regra da União (art. 5º: empenhado do ano anterior mais a variação do PIB) continua na lei consolidada que a busca trouxe, e a explicação cita as mudanças posteriores sem que a questão dependa delas.
- **29** (Portaria 344): validade de 30 dias e quantidade para até 60 dias nas notificações B e na receita de controle especial, conferidas em busca. A receita digital exige assinatura qualificada (ICP-Brasil) para essas listas, e a questão não cobra isso.
- **18** (hanseníase): na reação tipo 2, talidomida é a primeira escolha e prednisona a alternativa (protocolo de 2022 em trecho de busca); doses e duração da poliquimioterapia não conferidas.
- **14** (DPOC): GOLD 2025 prefere LABA+LAMA e, havendo indicação de corticoide inalatório, LABA+LAMA+CI; eosinófilos de 300 ou mais favorecem o CI. Sem divergência com as questões.

**Não conferido** (continuam em «memória»): 13 e 92 (ATLS: a busca não trouxe os limiares da 11ª edição; só uma fonte secundária cita 1 litro e 200 mL por hora), 53 (AVC), 31 e 66 (protocolo de IST de 2022), 1 (CHA2DS2-VASc e CHA2DS2-VA) e as demais.

**Observação sobre o medidor:** `npm run medir-bancos` em todos os bancos aponta duas posições de bancos mais antigos (q-adap22-027 e q-adap22-083) com vocabulário parecido com as questões 46 e 48 deste simulado, que não existiam quando aqueles bancos foram medidos. Os temas são diferentes (BI-RADS 0 contra BI-RADS 4C; escolha do fármaco na osteoporose com outro caso); o alerta é de palavras em comum, e as outras falhas listadas já existiam antes do EPM 5.

## Rodada de 27/10/2026

- **8 e 15** (sepse): a Surviving Sepsis Campaign 2026 (Prescott HC, Antonelli M, Alhazzani W, et al.; Intensive Care Medicine, 23/03/2026, doi 10.1007/s00134-026-08361-1) mantém antimicrobiano em até 1 hora no choque e na sepse provável, e em até 3 horas na sepse possível sem choque (conferido em busca em 27/10/2026), o que sustenta o gabarito da 8. As questões continuam perguntando pela campanha de 2021. Referências com o DOI da versão de 2026. Na 15, dose e critério de início da hidrocortisona na versão de 2026 seguem não conferidos.
