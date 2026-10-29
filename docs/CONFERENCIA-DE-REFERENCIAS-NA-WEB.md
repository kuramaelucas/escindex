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
| Relatório Conitec nº 1.051, PCDT de Alzheimer (gov.br/conitec) | Donepezila 5 mg/dia, subindo a 10 mg após 4–6 semanas; memantina com dose reduzida se depuração <50 mL/min | `q-adap22-095` (confirmado) |
| PCDT de fibrose cística, resumo oficial (gov.br/conitec) | Duas dosagens de TIR elevadas levam ao teste do suor | `q-adap25-091` (fluxo confirmado) |
| CDC, tratamento da gonorreia (cdc.gov) | Artrite gonocócica: ceftriaxona 1 g IM/IV a cada 24 h, ≥7 dias, doxiciclina 7 dias se clamídia não excluída | `q-adap24-027` (confirmado; drenagem não consta da página) |
| KDIGO 2024 de DRC, resumo executivo (kdigo.org) | PAS <120 mmHg quando tolerada (2B); KFRE 3–5% para encaminhamento | `q-adap22-076` (confirmado) |
| ATA, página de diretrizes (thyroid.org) | Hipertireoidismo 2016 e carcinoma medular 2015 seguem como as publicadas | `q-adap23-003`, `q-adap23-096` |
| EAU, página de urolitíase (uroweb.org) | Edição 2026 é revisão completa da de 2025 (lista das seções revisadas) | `q-adap22-004`, `q-adap26-014`, `q-adap26-091` |

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
