# Conferência das referências dos simulados autorais (PubMed e web, 29/10/2026)

Pedido: revisar os simulados autorais já criados com acesso ao PubMed e à web, **exceto `banco-simulado-epm-6`** (já realizado pelos alunos). Bancos revisados: `banco-simulado-epm-2`, `banco-unifesp-2024-adaptado`, `banco-simulado-epm-3`, `banco-simulado-epm-4` e `banco-simulado-epm-5` (500 questões).

## Método e limites

- **PubMed** (busca por título, metadados e texto completo do PMC): confirma que a diretriz existe e qual é a citação. Para diretrizes o PubMed quase só traz resumo, e muitas não estão no PMC. Texto completo só foi aberto para a ACG 2024 de pancreatite.
- **Web** (resumos de busca): usada para edições novas, notícias e documentos do Ministério da Saúde. Os sites das diretrizes (ahajournals.org, gov.br e outros) estão bloqueados na rede da sessão, então **nenhuma conferência de conteúdo veio do texto oficial**, exceto a ACG 2024. As fontes são secundárias e cada nota nas referências diz isso, com a data.
- Regra seguida: **não mudar gabarito nem explicação clínica por resumo de fonte secundária.** Só se registra, na própria `referencias` da questão, o que foi confirmado e o que ficou em aberto. Exceções, quando o fato era inequívoco, estão em "Textos alterados".
- As notas ficam no campo `referencias` de cada questão (busque por `29/10/2026` em `dados/banco-*.js`). A lista do que **ainda** não foi conferido está em `docs/REFERENCIAS-A-CONFERIR.md`.


## Conferências feitas no texto oficial (após a liberação de rede, 29/10/2026)

Depois que a rede da sessão foi liberada em parte, foram lidos os textos oficiais abaixo. **Esses são os únicos itens conferidos contra a fonte primária** (além da ACG 2024 de pancreatite, lida no PMC).

| Fonte (site) | O que foi lido | Questões |
|---|---|---|
| PCDT-IST, Portaria SCTIE/MS nº 12/2021 (gov.br/conitec) | Ceftriaxona 500 mg IM com azitromicina 1 g VO na gonorreia não complicada; benzatina 2,4 milhões UI na sífilis recente e 7,2 milhões na tardia; aciclovir 400 mg 3x/dia a partir da 36ª semana na gestante com herpes | `q-adap22-056`, `q-adap24-041`, `q-adap22-036` |
| PCDT de transmissão vertical (gov.br/conitec) | TDF+3TC+DTG preferencial na gestante, início o mais cedo possível sem aguardar genotipagem; recém-nascido de mãe adequadamente tratada com VDRL não reagente só em seguimento | `q-adap22-060`, `q-adap24-088` |
| PCDT de hanseníase 2022 (gov.br/conitec) | Talidomida de 100 a 400 mg/dia | `q-adap23-018` |
| Nota Técnica 193/2024 (gov.br) | Rotavírus: D1 de 1 mês e 15 dias a 11 meses e 29 dias; D2 de 3 meses e 15 dias a 23 meses e 29 dias | `q-adap25-083`, `q-adap24-089` |
| SBP, Diretriz nº 32, 2026 (sbp.com.br) | Ferro: tratamento 3 a 6 mg/kg/dia; hemograma em 30 a 45 dias; profilaxia fixa de 10 a 12,5 mg/dia em dois ciclos | `q-adap26-087` (texto corrigido: 3 a 5 virou 3 a 6 mg/kg/dia) |
| IDSA 2026 AMR Guidance, publicada em 30/07/2026 (idsociety.org) | Carbapenêmico preferido na ESBL fora do trato urinário; piperacilina-tazobactam não sugerida nesses sítios | `q-adap26-033` (gabarito confirmado) |
| KDIGO 2026 de anemia, resumo executivo (kdigo.org) | Limiares de ferro na DRC: ferritina <100 e TSAT <40%, ou ferritina 100–300 e TSAT <25% | `q-adap26-034` (confirmado) |
| US MEC 2024, CDC (PMC11315372) | Combinados em categoria 4 com <21 dias de pós-parto; categoria 4 na enxaqueca com aura | `q-adap22-025` (parcial), `q-adap26-043` |
| OMS/FIGO/ICM, diretrizes consolidadas de HPP, 2025 (iris.who.int) | Recomendação 22: gatilho de ação com perda objetiva ≥300 mL e sinal hemodinâmico alterado, ou ≥500 mL; pacote com massagem, ocitócico, ácido tranexâmico, fluidos, exame do trato genital e escalonamento | `q-adap22-031`, `q-adap26-050` (confirmados) |
| OMS MEC 6ª edição, 2025 (iris.who.int) | Combinados: lactação <6 semanas = 4, 6 semanas a <6 meses = 3, ≥6 meses = 2; enxaqueca com aura = 4 em qualquer idade | `q-adap22-025`, `q-adap26-043` (confirmados) |
| OMS SPR 4ª edição, 2025 (iris.who.int) | Cu-IUD >99% em até 120 h; pílulas de emergência em até 120 h, com menor eficácia por tempo, peso ou IMC altos; ulipristal possivelmente melhor entre 72 e 120 h; LNG 1,5 mg em dose única preferido | `q-adap26-052`, `q-adap22-041` (confirmados; superioridade do ulipristal em IMC ≥30 não consta do texto) |
| OMS, Abortion care guideline, 2ª edição (iris.who.int) | Aborto retido <14 semanas: mifepristona + misoprostol 800 µg preferido; alternativa misoprostol 800 µg por qualquer via | `q-adap22-039` |
| OMS, Intrapartum care, 2018 (iris.who.int) | Fase ativa a partir de 5 cm; segundo período até 3 h (primípara) e 2 h (multípara); recs. 28–32 sobre prevenção de atraso | `q-adap22-032` (conduta de tratamento não abordada) |
| OMS, Therapeutics and COVID-19, ago/2025 (iris.who.int) | Corticosteroide sistêmico: recomendação forte na covid grave ou crítica; dexametasona 6 mg/dia por até 10 dias | `q-adap22-097` (confirmado) |
| GOLD 2026, relatório completo v1.3 (goldcopd.org) | Oxigenoterapia domiciliar: PaO2 ≤55 mmHg ou SaO2 ≤88%, ou 55–60 com hipertensão pulmonar, edema ou policitemia (Ht >55%); mais de 15 h/dia, mas estudo recente mostra que 24 h não superou 15 h; VNI com pH <7,35 e PaCO2 >45 | `q-adap26-040`, `q-adap23-014` (confirmados) |
| GINA 2026, relatório (ginasthma.org) | Trilha 1 (ICS-formoterol como aliviador) preferida; SABA isolado não recomendado; dobrar ICS em ≤5 anos; magnésio IV 40–50 mg/kg (máx. 2 g) | `q-adap25-087`, `q-adap22-086`, `q-adap26-095`, `q-adap22-069`, `q-adap22-065` (confirmados) |
| GOLD 2026, relatório completo v1.3 (goldcopd.org), relido em 02/11/2026 para as provas do Einstein | Exacerbação com eosinófilos ≥ 100/µL: escalar para LABA+LAMA+ICS (como inicial no grupo E com ≥ 300); acidose respiratória = PaCO2 > 45 mmHg e pH < 7,35 | `q-einstein2023-013`, `q-einstein2024-013` a `015` (confirmados) |
| Relatório Conitec nº 1.051, PCDT de Alzheimer (gov.br/conitec) | Donepezila 5 mg/dia, subindo a 10 mg após 4–6 semanas; memantina com dose reduzida se depuração <50 mL/min | `q-adap22-095` (confirmado) |
| PCDT de fibrose cística, resumo oficial (gov.br/conitec) | Duas dosagens de TIR elevadas levam ao teste do suor | `q-adap25-091` (fluxo confirmado) |
| CDC, tratamento da gonorreia (cdc.gov) | Artrite gonocócica: ceftriaxona 1 g IM/IV a cada 24 h, ≥7 dias, doxiciclina 7 dias se clamídia não excluída | `q-adap24-027` (confirmado; drenagem não consta da página) |
| KDIGO 2024 de DRC, resumo executivo (kdigo.org) | PAS <120 mmHg quando tolerada (2B); KFRE 3–5% para encaminhamento | `q-adap22-076` (confirmado) |
| ATA, página de diretrizes (thyroid.org) | Hipertireoidismo 2016 e carcinoma medular 2015 seguem como as publicadas | `q-adap23-003`, `q-adap23-096` |
| EAU, página de urolitíase (uroweb.org) | Edição 2026 é revisão completa da de 2025 (lista das seções revisadas) | `q-adap22-004`, `q-adap26-014`, `q-adap26-091` |
| Surviving Sepsis Campaign 2026, PDF integral enviado pela equipe, lido em 08/11/2026 | Recs. 4 (não usar qSOFA como triagem única), 7 (hemoculturas antes do antibiótico), 10 (pelo menos 30 mL/kg em 3 h, condicional), 11–12 (vasopressor junto ou por veia periférica), 16–18 (antibiótico em 1 h no choque e na sepse provável; 3 h só na sepse possível), 39 (duração menor), 49 (medidas dinâmicas), 52 (TEC), 55–56 (noradrenalina; vasopressina), 79 (corticoide no choque: RR 0,92, IC 0,83–1,01; reversão do choque RR 1,29), 90 (transfusão restritiva) | `q-unifesp2022-098`, `q-unifesp2023-008`, `q-unifesp2023-015`, `q-unifesp2025-030`, `q-unifesp2025-037`, `q-udisc20262-001` |
| Sepsis-3, apresentação ACEP (Slesinger) que reproduz Singer, JAMA 2016, lida em 08/11/2026 (fonte secundária; texto do JAMA não aberto) | SOFA ≥ 2 com basal zero, qSOFA, choque séptico (vasopressor + lactato > 2 mmol/L), mortalidade ~10% e > 40% | `q-unifesp2023-019` (PENDENTE: reler Singer 2016) |
| GOLD 2026 v1.3, relido em 08/11/2026 para a UNIFESP | Grupo E (C+D fundidos desde 2023); LABA+LAMA inicial no E, tríplice com eosinófilos ≥ 300/µL; LABA+ICS não estimulado; em LABA+ICS com sintomas, mudar para LABA+LAMA ou tríplice conforme resposta ao ICS; oxigênio com PaO2 ≤ 55 mmHg ou SaO2 ≤ 88% | `q-unifesp2023-014`, `q-unifesp2026-040`, `q-udisc20262-004` |
| GINA 2026, relatório de maio/2026, relido em 08/11/2026 para a UNIFESP | ≤ 5 anos: ICS diário em dose baixa (BDP HFA 100 mcg/dia), degrau 3 dobra a dose; Box 12-1 (crise grave: FR > 40/min, palavras, SpO2 < 92%); Box 12-4 (SABA, ipratrópio, corticoide oral, O2 ≥ 92%); adultos: LABA+ICS melhora o controle mais depressa que dobrar o ICS, MART preferida | `q-unifesp2022-069`, `q-unifesp2022-086`, `q-unifesp2023-069`, `q-unifesp2026-095` |

**Abrem, mas sem texto útil** (JavaScript ou pagamento): páginas das diretrizes ESMO (`esmo.org`), ACOG (`acog.org`, HTTP 402) e o PMC raspado em HTML (retornou só o resumo). Para ESMO e ACOG, o conteúdo continua sem conferência.

**Liberados em seguida:** `iris.who.int` (PDFs da OMS). `cpr.heart.org`, `cdn.who.int` e `academic.oup.com` passaram a resolver, mas recusam o acesso (HTTP 403, bloqueio anti-robô do próprio site); `ahajournals.org`, o CloudFront da EAU e os demais seguem sem resolver.

**Ainda bloqueados na rede da sessão** (não resolvem ou o proxy recusa): `ahajournals.org`, `cpr.heart.org`, `professional.heart.org`, `iris.who.int`, `cdn.who.int`, `apps.who.int`, o CloudFront da EAU (`d56bochluxqnz.cloudfront.net`), `academic.oup.com`, `diabetesjournals.org`, `sbim.org.br`, `easl.eu`, `asra.com`, `asam.org`, `scielo.br`, `sbc.org.br` e os sites de periódicos (NEJM, Lancet, JAMA, Wolters Kluwer, AAP). Abrem: `gov.br`, `who.int` (páginas, não os PDFs), `kdigo.org`, `ginasthma.org`, `goldcopd.org`, `escardio.org`, `nccn.org`, `acog.org`, `esmo.org`, `idsociety.org`, `sbp.com.br`, `cdc.gov`, `thyroid.org`, `uroweb.org` e o PMC.

## Textos alterados (o único conteúdo mexido)

| Questão | O que mudou | Por quê |
|---|---|---|
| `q-adap22-074` | A explicação diz 40 a 60 ventilações/min (SBP 2022) e cita que a AHA/AAP 2025 ampliou a faixa para 30 a 60 | Fontes secundárias da AHA/AAP 2025 |
| `q-adap22-031` | "OMS (2023)" passou a "OMS (2023, mantido nas recomendações consolidadas OMS/FIGO/ICM de 2025)" | Diretrizes de HPP de out/2025 |
| `q-adap24-033` | Alternativa C: a citologia trienal é descrita como das diretrizes de 2016; acrescenta o HPV-DNA de 2025 | Portaria Conjunta SAES/SECTICS nº 13/2025 |
| `q-adap24-080` | Enunciado: "mulheres de 50 a 69 anos" virou "na faixa etária-alvo" | Mamografia de 40 a 74 anos anunciada em set/2025; faixa oficial não confirmada |
| `q-adap26-023` | Explicação: "TAVI a partir dos 70 anos" passou a "...na estenose aórtica com valva tricúspide" | ESC/EACTS 2025 (doi 10.1093/eurheartj/ehaf194), fontes secundárias |

Nenhum gabarito foi alterado.

## Diretrizes confirmadas e o que foi anotado

### Cardiologia, emergência e terapia intensiva
- **Surviving Sepsis Campaign 2026**: existe (Intensive Care Med 2026;52:863-936, doi 10.1007/s00134-026-08361-1; PubMed 41870560). Questões `q-adap25-030`, `q-adap25-037`, `q-adap22-098`, `q-adap23-008`, `q-adap23-015`.
- **AHA/ASA 2026 de AVC** (doi 10.1161/STR.0000000000000513): 185/110 mmHg antes da trombólise e tenecteplase 0,25 mg/kg confirmados em resumos. O alvo <180/105 por 24 h após trombólise **não** foi confirmado (explícito só pós-trombectomia). `q-adap25-041`, `q-adap22-020`, `q-adap23-053`: conferir no texto.
- **ACG 2024 de pancreatite aguda**: texto completo (PMC) confirma colecistectomia precoce na biliar leve, de preferência antes da alta. `q-adap25-005`.
- **ESVS 2024 de aneurisma de aorta** (PubMed 38307694, doi 10.1016/j.ejvs.2023.11.002): citação correta, sem texto no PMC. `q-adap25-009`, `q-adap26-010`.
- **DAS 2025** (Br J Anaesth, PubMed 41203471): mantém Plano A–D e cricotireoidostomia por bisturi, bougie e tubo. `q-adap22-003`.
- **ACC/AHA 2025 de SCA** (Circulation 2025;151): não apareceu no PubMed com o título; resumos web divergem sobre fibrinólise (10 min na ESC × 30 min porta-agulha na ACC/AHA) e sobre a angiografia após fibrinólise (2 × 3 h). `q-adap25-021`, `q-adap22-080`.
- **ESC/EACTS 2025 de valvopatias**, **ESC 2024** (SCC ehae177, FA ehae176, arterial ehae179), **ESC 2026 de insuficiência cardíaca** (só dois fenótipos, FEVE <50% e ≥50%): existem.
- **ATLS 11ª edição (2025)**: existe; controle de hemorragia exsanguinante antes da via aérea (xABCDE) segundo fontes secundárias; tabela de classes de hemorragia não conferida.
- **AHA 2025 de cuidados pós-parada** (Parte 11): oxigênio 100% até estabilizar e depois SpO2 de 90 a 98%, PAM ≥65 mmHg, temperatura constante de 32 a 37,5 °C por ≥36 h (fontes divergem na classe) e prognóstico multimodal só após 72 h. `q-adap25-023`.
- **ESC/EACTS 2025 de valvopatias** (Praz et al., doi 10.1093/eurheartj/ehaf194): TAVI recomendado a partir dos 70 anos (antes 75) na estenose aórtica com valva tricúspide e via transfemoral. `q-adap26-023`.
- **ACC/AHA/HRS 2015 de TSV**: sem substituição localizada. **ATA 2015 de carcinoma medular**: rascunho de atualização sobre terapia sistêmica ainda não publicado.
- **AHA/ACC 2024 de manejo perioperatório**: registros compatíveis no PubMed. **ACC/AHA 2024 de DAP de membros inferiores**: não encontrada por título no PubMed.
- **Hipertensão**: nova Diretriz Brasileira de Hipertensão 2025 (SBC, SBN, SBH; meta <130/80 mmHg; pré-hipertensão 120–139/80–89). Condutas das questões não contestadas, mas classificação por estágios e definição de crise devem ser conferidas. `q-adap23-005`, `q-adap23-012`, `q-adap22-090`.

### Pneumologia, nefrologia, endocrinologia, reumatologia
- **GINA 2025** (maio/2025; correção menor em 14/11/2025: salbutamol nebulizado em ≤5 anos, 2,5 mg). **GOLD 2026** (critérios A/B/E ajustados). **ATS 2025 de pneumonia** (corticoide sugerido na grave, desaconselhado na não grave; IDSA não endossou). **ERS 2025 de bronquiectasia** (doi 10.1183/13993003.01126-2025).
- **KDIGO**: anemia na DRC 2026 (Kidney Int 109:1); glomerulopatias atualizadas por capítulos; **AKI/AKD 2026 só em rascunho** (consulta pública até 11/05/2026).
- **ADA Standards 2026** (Diabetes Care 2026;49 Suppl 1, dez/2025). **ATA 2025 de câncer diferenciado de tireoide** (doi 10.1177/10507256251363120). Critérios de **Jones 2015** seguem vigentes. **IDSA 2025 de ITU complicada** (CID, 17/07/2025).

### Oncologia, reumatologia, alergia e pneumologia
- **NCCN**: versão 1.2026 de pulmão não pequenas células alinhada ao TNM 9ª edição (AJCC); o estudo ATOMIC apoia imunoterapia mais cedo no cólon com instabilidade de microssatélites. Melanoma, cólon, reto e basocelular: versões vigentes **não** conferidas. `q-adap26-004`, `q-adap26-006`, `q-adap26-013`, `q-adap26-017`, `q-adap26-031`, `q-adap23-086`.
- **ESMO 2025 de pulmão inicial e localmente avançado** (Ann Oncol): existe (imunoterapia perioperatória; segmentectomia em periféricos até 2 cm). `q-adap22-015`.
- **IMWG**: sem revisão posterior a 2014 localizada. `q-adap23-063`.
- **Gota**: sem diretriz EULAR posterior a 2016 confirmada nem atualização da ACR 2020. `q-adap22-082`, `q-adap26-035`, `q-adap23-075`.
- **Vasculites**: sem atualização da ACR/Vasculitis Foundation 2021 localizada; upadacitinibe aprovado pela FDA para arterite de células gigantes em abril/2025 (SELECT-GCA). `q-adap26-037`, `q-adap23-016`, `q-adap23-010`.
- **Anafilaxia**: atualizações da AAAAI/ACAAI (2022–2024) desaconselham corticoide e anti-histamínico de rotina e relativizam a ida ao pronto-socorro após adrenalina precoce. `q-adap22-092`, `q-adap26-097`.
- **BTS 2023 de doença pleural**: registros compatíveis no PubMed. `q-adap22-014`, `q-adap23-095`.

### Endocrinologia, neurologia, nefrologia, infectologia, gastro e anestesia
- **IDSA 2026** (bactérias gram-negativas resistentes; Healio, 26/08/2026): piperacilina-tazobactam deixou de ser desaconselhada em ITU por ESBL e passou a alternativa. A `q-adap26-033` (bacteremia grave, MERINO, carbapenêmico) não foi conferida na versão de 2026.
- **PCDT de Alzheimer** atualizado pela Conitec em 2025 (relatório nº 1.051; donepezila com ou sem memantina na forma grave); sem decisão sobre lecanemabe ou donanemabe localizada. `q-adap22-095`.
- **Sarna**: BASHH 2025 (permetrina 5% ou ivermectina 200 mcg/kg, segunda dose em 7 a 14 dias); versão europeia IUSTI de 2026 em rascunho. `q-adap22-078`.
- **Hipersensibilidade perioperatória**: diretriz francesa (70 recomendações, 2025 ou 2026). `q-adap22-006`.
- **KDIGO**: nefrite lúpica 2024 publicada; DMO-DRC mantém a versão de 2017 (conferência de controvérsias, Kidney Int, mar/2025). `q-adap26-086`, `q-adap23-064`.
- **Sem atualização localizada**: ATA 2016 de tireotoxicose, AACE/ACE 2020 de osteoporose (revisão chamada em 2024), consenso DLB 2017, APA 2020 de esquizofrenia, diretrizes europeias de hiponatremia (2014), AASLD 2021 e EASL 2018 de cirrose, ASRA 2020 de toxicidade por anestésico local, ASA/ASRA 2016 de opioide neuraxial, orientação da OMS de corticosteroides na covid-19 (só a de 2020).
- **ADA/EASD/JBDS/AACE/DTS 2024 de crises hiperglicêmicas** (Diabetes Care 2024;47(8)): beta-hidroxibutirato à beira do leito, insulina subcutânea na CAD leve. O limiar de potássio da `q-adap23-034` não foi conferido. **Beers 2023** confirmado (JAGS 2023;71:2052-2081). **World Falls Guidelines 2022**, **ASAM 2020** de abstinência alcoólica e **WFH 3ª ed. 2020** de hemofilia (ISTH 2024 também existe) sem edição nova.
- **Câncer gástrico**: ESMO recomenda FLOT perioperatório (IB ou maior); durvalumabe com FLOT apontado como novo padrão; diretriz ESMO de out/2026 relatada por fonte secundária e não verificada. `q-adap23-082`.
- **CRIE**: 6ª edição do manual (2023) e Portaria GM/MS nº 6.623/2025 (RIE); a `q-adap26-096` cita a 5ª edição.
- **SJS/NET**: diretriz alemã S3 (2024), protocolo francês (2024) e diretriz latino-americana (WAO J, 2025). `q-adap26-039`.
- **KDIGO 2026 de anemia na DRC**: resumo executivo em Kidney Int 2026;109(1).
- **Surviving Sepsis Campaign 2026** passou a constar também nas notas de `q-adap25-030`, `q-adap25-037` e `q-adap23-015`.

### Ginecologia e obstetrícia
- **ESGO/ESTRO/ESP 2025** de endométrio (Lancet Oncol 2025;26:e423-e435). **OMS/FIGO/ICM 2025 de HPP** (51 recomendações; ação com 300 mL ou sinais vitais alterados). **OMS MEC 6ª ed. (2025)** e **OMS SPR 4ª ed. (nov/2025)** existem; categorias dos combinados e ulipristal/IMC **não** conferidas. **FDA, nov/2025**: retirada do alerta de caixa preta de terapia hormonal. **ACOG, jul/2024**: não rastrear diabetes gestacional antes de 24 semanas. Sem substituição localizada: PB 222, PB 217, corticoides antenatais, corioamnionite, ASCCP 2019. ESHRE endometriose 2022 tinha revisão prevista para 2025 (não confirmada).

### Pediatria
- **AHA/AAP 2025**: neonatal (ventilação 30–60/min, clampeamento tardio ≥60 s) e pediátrica. **SBP, 17/03/2026, Diretriz nº 32** (ferro: profilaxia fixa de 10–12,5 mg/dia em ciclos aos 6 e 12 meses). **IDSA/PIDS 2026**: primeira parte da revisão de pneumonia pediátrica (derrame parapneumônico); tratamento ambulatorial segue em 2011. **AAP**: hiperbilirrubinemia 2022 (vigente até ago/2027), TDAH 2019 e bronquiolite 2014 sem substituição localizada; calculadora de sepse precoce atualizada em 2024 (Kaiser).

### Ministério da Saúde
- **Rastreamento do colo do útero**: Portaria Conjunta SAES/SECTICS nº 13, de 29/07/2025 (DOU 18/08/2025): HPV-DNA prioritário (início aos 25 anos, repetição em 5 anos se negativo, segundo fonte secundária); revoga a Portaria SAS/MS nº 497/2016. Implantação gradual até o fim de 2026.
- **Mamografia**: anúncio de 23/09/2025 (40 a 49 anos por decisão compartilhada; bienal ampliada até 74 anos). Ato normativo não aberto.
- **Lista de notificação compulsória**: Portarias GM/MS nº 6.734/2025, nº 10.175/2026 e nº 11.211/2026 (inclui caxumba e febre oropouche, retira covid-19).
- **Vacinação**: Nota Técnica 193/2024 (rotavírus: D1 de 1 mês e 15 dias a 11 meses e 29 dias; D2 de 3 meses e 15 dias a 23 meses e 29 dias), dose única de HPV (NT 41/2024), dTpa a partir da 20ª semana no Calendário 2026. Um quadro estadual de jun/2026 lista pneumocócica **20-valente**; `q-adap25-083` (alternativa D) cita a 10-valente.
- **PCDT**: Parkinson (Portaria Conjunta SAES/SECTICS nº 16, de 01/08/2025); fibrose cística (nº 5, de 30/04/2024); HIV pediátrico em módulos (Portarias SECTICS nº 75 e nº 76, de 28/12/2023); doxiciclina como profilaxia pós-exposição (portaria de 11/03/2026). Sem edição posterior localizada: IST 2022, transmissão vertical 2022, hanseníase 2022, dengue 6ª ed. (2024), parto normal 2017, Manual de Gestação de Alto Risco 2022. Esclerose múltipla: atualização estava em consulta pública. Triagem neonatal: Lei 14.154/2021 em etapas e Portaria GM/MS nº 7.293/2025.
- **Tuberculose**: sem novo manual em 2025; 3HP preferencial para infecção latente desde a NI nº 1/2022.

### Cirurgia, trauma e gastroenterologia
- **WSES 2025 de apendicite** (JAMA Surg, 28/01/2026, doi 10.1001/jamasurg.2025.6218): existe. `q-adap26-011`, `q-adap23-057`.
- **HerniaSurge**: atualização de 2023 (BJS Open, PMC10588975) substitui a de 2018. `q-adap26-015`, `q-adap23-085`.
- **EAU**: urolitíase com atualização limitada em 2025 e revisão completa em 2026. `q-adap22-004`, `q-adap26-014`, `q-adap26-091`; as outras diretrizes EAU (LUTS, carcinoma renal, urologia pediátrica) não foram conferidas.
- **Critérios de Roma V** publicados em 2026 (Gastroenterology 2026;170(6), doi 10.1053/j.gastro.2026.02.003), com "constipação crônica" no lugar de "funcional". `q-adap22-077` usa Roma IV.
- **Receituário de controle especial**: RDC 873/2024 (Sistema Nacional de Controle de Receituários) e RDC 1.000/2025; a validade de 30 dias da Notificação B não foi reconfirmada. `q-adap23-029`.
- Sem atualização localizada: WSES de obstrução de delgado por bridas (2017) e de trauma pélvico (2017), ASCRS de diverticulite (2020; ACP 2022 semelhante), Tóquio 2018, USPSTF colorretal/pulmão (2021) e próstata (2018).

## O que falta

Ver `docs/REFERENCIAS-A-CONFERIR.md` (agrupado por diretriz). Para conferir conteúdo, e não só edição, é preciso abrir o texto oficial: liberar `gov.br`, `ahajournals.org` e os sites das sociedades nas configurações de rede da sessão, ou conferir manualmente.

Quando uma pendência for resolvida, escreva a conferência no campo `referencias` da questão com a data e rode `npm run publicar`.

**FMABC 2021–2026: dupla checagem parcial (02/11/2026).** Textos oficiais lidos: PCDT de IST 2022 (gov.br/aids: uretrite sem agente, DIP ambulatorial, critério de tratamento adequado da sífilis na gestação, teste do RN em sangue periférico), manejo clínico da dengue (gov.br/saude: grupo B, idade acima de 65 anos e hipertensão, hemograma obrigatório) e Instrução Normativa do Calendário Nacional de Vacinação 2026 (gov.br/saude: reforços aos 4 anos, influenza em 2 doses). Achado: na questão FMABC 2026 nº 46 o critério escrito do PCDT enquadra a mãe como adequadamente tratada, contra o gabarito oficial; mantido o gabarito, com a divergência explicada. Não abertos (domínio bloqueado ou texto não localizado): portarias de notificação compulsória, regras de receituário, textos da SBP, ACOG, AHA e demais diretrizes citadas nas outras questões das provas FMABC, que seguem "de memória, com data".


## Einstein 2021–2026 (02/11/2026)

As 425 questões das provas `prova-einstein-*` entraram com `referencias` sem conferência. Nesta rodada só o GOLD 2026 foi lido (linha acima). GINA 2026 e OMS MEC 6ª edição constam lidos na rodada de 29/10 e foram citados, não relidos. Todas as demais citações (livros-texto, PCDT, SBC, SBP, FEBRASGO, NCCN, AHA/ASA, calendário, Portaria SAES/SECTICS 13/2025 do rastreamento do colo) foram registradas como **texto não aberto**, com data, e continuam na fila de `npm run referencias-a-conferir`. As 42 questões que citavam edição superada estão em `docs/REFERENCIAS-COM-EDICAO-ANTERIOR.md`.

## `banco-didatico`: fase 3 do projeto de adequação (13/11/2026)

As 135 questões do `banco-didatico` não tinham `referencias`. Nesta rodada foram lidos os textos oficiais abaixo e gravada a nota datada (campo novo, via `atualizar-dados`, porque `anotar-conferencia` exige o campo já existente). **Cada nota diz o que foi confirmado e o que não foi.** Depois da terceira rodada faltam 102 questões do arquivo (ver `docs/PENDENCIAS-DE-REFERENCIAS.md`, seção 6-B).

| Fonte (site) | O que foi lido | Questões |
|---|---|---|
| GOLD 2026, relatório v1.3 (goldcopd.org) | Antibiótico com ≥ 2 de dispneia, febre, volume e purulência (com purulência entre eles) ou ventilação mecânica; 5 dias; corticoide sistêmico até 5 dias. Anthonisen não é nomeado. Meta de SpO2 88–92% não localizada | `q-002` |
| OMS MEC 6ª edição, 2025 (iris.who.int) | Tabagismo: < 35 anos = 2 para combinados; ≥ 35 anos = 3 (< 15 cig/dia) ou 4 (≥ 15); progestagênio, DIU e barreira = 1 | `q-024` |
| SBP, Manual de Orientação nº 10, 2021, hiperbilirrubinemia (sbp.com.br) | Seguimento de RN ≥ 35 semanas pelo nomograma de Bhutani; otimizar o aleitamento; tabelas de fototerapia e exsanguineotransfusão. Limiar às 36 h e AAP 2022 não conferidos; fenobarbital não aparece | `q-013` |
| MS, Manual de Recomendações para o Controle da TB, 2ª ed. atualizada, 2019 (gov.br/aids) | 2RHZE/4RH; 2RHZE/10RH (meningoencefálica e osteoarticular); neurite óptica por etambutol, dose dependente; PT ≥ 5 mm como infecção latente. Esquemas preventivos (4R, 3HP) não constam do manual | `q-inf-14`, `q-inf-15`, `q-inf-16` |
| MS, PCDT HIV em adultos, módulo 1, 2024 (gov.br/aids) | TARV para todos, independentemente do CD4; tenofovir/lamivudina + dolutegravir preferencial; I = I | `q-inf-17` |
| MS, PCDT HIV em adultos, módulo 2, 2024 (gov.br/aids) | Quadro 29: PCP com CD4 < 200 (ou < 14%), candidíase oral ou febre; toxoplasmose < 100; MAC < 50 sem TARV; sem profilaxia primária para criptococose, CMV e herpes simples. IgG para toxoplasma não consta do quadro | `q-inf-18` |
| MS, Dengue: diagnóstico e manejo clínico, 6ª ed., 2024 (gov.br/saude) | Quadro 1 de sinais de alarme (7 itens); aumento progressivo do hematócrito no fluxograma; início na defervescência (3º a 7º dia); paracetamol e/ou dipirona, sem salicilatos nem AINEs | `q-inf-22`, `q-inf-23` |
| MS, Calendário Técnico Nacional de Vacinação da Criança (gov.br/saude) | Penta e VIP aos 2, 4 e 6 meses (VIP: reforço aos 15 m); pneumo 10 aos 2 e 4 m + reforço aos 12 m; rotavírus aos 2 e 4 m; SCR a partir de 12 m; HPV a partir de 9 anos | `q-015` |
| MS, Calendário Técnico Nacional de Vacinação do Adulto (gov.br/saude) | dT a cada 10 anos; antecipado para 5 anos em exposição a risco de tétano ou difteria | `q-inf-29` |
| SBC/SBH/SBN, Diretriz Brasileira de Hipertensão Arterial 2025 (abccardiol.org) | Consultório ≥ 140/90; MAPA 24 h e média do MRPA ≥ 130/80 (vigília 135/85, sono 120/70); fenótipos; Quadro 7.1 de classes; crise hipertensiva (sem LOA: reavaliação em 1 a 7 dias; EH: UTI, 25% na 1ª hora; nifedipina rápida proscrita); HAR e aldosterona. Relação aldosterona/renina e hipocalemia espontânea não conferidas | `q-card-13` a `q-card-17` |

**Segunda rodada (13/11/2026, mesmo dia):**

| Fonte (site) | O que foi lido | Questões |
|---|---|---|
| MS, Nota Técnica Conjunta nº 154/2024-DPNI/SVSA/MS (gov.br/saude) | Contato próximo (10 dias antes do início dos sintomas do caso até 24 h após o tratamento); quimioprofilaxia idealmente nas primeiras 24 h do início dos sintomas, valor limitado após 10 dias da exposição; rifampicina de primeira escolha, ceftriaxona e ciprofloxacino em dose única como alternativas, azitromicina 500 mg; gestante: ceftriaxona. Esquema de 2 dias da rifampicina (Guia de Vigilância) não conferido | `q-inf-12` (explicação corrigida) |
| MS, PCDT de IST 2022 (gov.br/aids) | Cancro duro (única, indolor, base endurecida, fundo limpo, linfadenopatia regional); benzatina 2,4 milhões UI IM em dose única na sífilis recente (alternativa doxiciclina 15 dias); cancro mole (dolorosas, múltiplas); seção 5.7: queda de duas diluições em 6 meses (recente) ou 12 meses (tardia), retratamento por ausência de queda ou aumento de duas diluições; cicatriz sorológica | `q-inf-20`, `q-inf-21` |
| MS, Guia de tratamento da malária, 3ª ed., 2026, e edição de 2021 (gov.br/saude) | Hipnozoítos e recaídas do P. vivax; cloroquina + primaquina 0,5 mg/kg/dia por 7 dias; tafenoquina em dose única com G6PD quantitativo; hemólise na deficiência de G6PD; gestantes e < 6 meses não usam primaquina nem tafenoquina | `q-inf-26` (explicação ganhou a tafenoquina) |
| MS, Manejo do paciente com diarreia: avaliação da hidratação (gov.br/saude) | Quadro dos planos A, B e C (sinais por plano e regra de dois ou mais sinais); Plano A: mais líquidos após cada evacuação, manter a alimentação, zinco por 10 a 14 dias | `q-018` |
| MS, Nota Técnica nº 16/2024-CGZV/DEDT/SVSA/MS, leptospirose (gov.br/saude) | Febre alta, mialgia de panturrilha e congestão conjuntival na fase precoce; síndrome de Weil com hemorragia pulmonar, insuficiência renal e icterícia rubínica; exposição a enchente nos 30 dias anteriores; IRA oligúrica e não oligúrica no fluxograma | `q-inf-25` |

**Terceira rodada (13/11/2026, mesmo dia):**

| Fonte (site) | O que foi lido | Questões |
|---|---|---|
| SBC, Diretriz Brasileira de Dislipidemias 2025 (abccardiol.org) | LDL-c < 50 mg/dL no muito alto risco e < 40 no risco extremo (múltiplos eventos ou 1 evento + ≥ 2 condições de alto risco); estatina de alta intensidade + ezetimiba como terapia inicial, anti-PCSK9 no extremo ou se a meta não for atingida. Meta de 55 mg/dL da ESC não conferida | `q-card-30` (explicação atualizada) |
| SOBRAC/SBC, Diretriz Brasileira de Fibrilação Atrial 2025 (abccardiol.org) | RR irregulares, ausência de ondas P, ondas f; instabilidade hemodinâmica: cardioversão elétrica imediata | `q-card-18`, `q-card-19` |
| SBP, reanimação do RN ≥ 34 semanas, maio/2022 e junho/2026 (sbp.com.br) | VPP com apneia, respiração irregular e/ou FC < 100; massagem se FC < 60 após 30 s de VPP com técnica adequada. Adrenalina não conferida | `q-014` |
| OMS, Global guidelines for the prevention of SSI, 2018 (iris.who.int) | Álcool + clorexidina no preparo da pele; pelos não removidos ou só com clipper (barbear desencorajado); profilaxia em até 120 min antes da incisão, sem prolongar após a operação | `q-toce-11`, `q-toce-12`, `q-toce-13` (explicação ajustada) |
| IDSA, Bacteriúria assintomática, 2019 (idsociety.org) | Tratar em gestantes e antes de procedimento urológico com trauma de mucosa (fortes, moderada) | `q-inf-08` |
| MS, Manual dos CRIE, 6ª ed. (gov.br/saude) | Vacinas vivas não devem ser dadas na imunodepressão; inativadas se necessário; vacinar contatos; atualizar o esquema até 14 dias antes. Transplantados e lista de vacinas vivas não conferidos | `q-inf-28` |
| OMS, Hand Hygiene Technical Reference Manual (guideline 2009, iris.who.int) | Os cinco momentos, com categorias IA/IB | `q-inf-30` |

**Textos alterados na terceira rodada:** `q-card-30` (metas de LDL e terapia inicial combinada) e `q-toce-13` (janela de 120 minutos da OMS; a de 30 a 60 minutos passou a ser dita como prática de protocolos). Nenhum gabarito foi alterado.

**Textos alterados na segunda rodada:** `q-inf-12` (janela de 24 h do início dos sintomas em vez de 24 a 48 h; ceftriaxona como primeira escolha na gestante) e `q-inf-26` (tafenoquina e contraindicação abaixo de 6 meses). Nenhum gabarito foi alterado.

**Texto alterado na primeira rodada:** `q-card-13` (a explicação dizia 135/85 para a medida residencial; a diretriz brasileira de 2020 e a de 2025 usam 130/80 na média do MRPA). Nenhum gabarito foi alterado.

**Não abriram nesta rodada:** `cfbm.gov.br` e `prefeitura.pbh.gov.br` (o proxy recusa; eram cópias da Portaria SAES/SECTICS nº 13/2025 e da Portaria GM/MS nº 10.175/2026), `atencaoprimaria.rs.gov.br` (403, PNAB), a página do Conitec da Portaria 13/2025 (só índice), `pmc.ncbi.nlm.nih.gov/articles/PMC4968574/` (Sepsis-3, a página raspada devolveu só uma linha), `planalto.gov.br` (Lei 8.080, 403), `bvsms.saude.gov.br` (403), `saude.curitiba.pr.gov.br` (403), `antigo-conitec.saude.gov.br` (não resolve), `ginasthma.org` (403), `kdigo.org` (406), `ahajournals.org` (não resolve). Os PDFs do `gov.br` às vezes devolvem reset de conexão: repetir resolve. Tentativas de adivinhar endereço do PCDT de IST e do PCDT de PEP devolveram 404; o endereço certo precisa vir de uma busca.

**Ainda sem leitura (priorizar):** sepse (Sepsis-3 e SSC 2026), colecistite (Tokyo), pré-eclâmpsia e diabetes gestacional, profilaxia pós-exposição ao HIV (PCDT de PEP), Zika, notificação compulsória (Portaria GM/MS), Lei 8.080 e ESF (PNAB), rastreamento do colo do útero (Portaria 13/2025), climatério, técnicas cirúrgicas (TOCE) e oftalmologia.

