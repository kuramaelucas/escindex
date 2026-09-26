# `dados/imagens/` — as figuras das provas

Algumas questões reais dependem de uma figura da prova original — um ECG, uma
tabela 2×2, uma radiografia, um antibiograma. Enquanto a figura não está aqui,
a questão mostra um aviso ("esta questão tinha uma imagem na prova original,
que ainda não foi anexada") com a descrição do que a prova mostrava, em vez de
uma imagem quebrada.

## Como anexar

1. Recorte a figura do PDF oficial da prova (um print da região basta).
2. Salve aqui com o **nome da questão**: `q-unifesp2026-036.png`.
   `.jpg`, `.jpeg` e `.webp` também servem — a plataforma tenta as quatro.
3. Publique o site de novo (com a pasta `dados/` junto). Nada mais precisa mudar:
   a questão já aponta para esse arquivo.

Prefira imagens com até ~1600 px de largura e até ~400 KB: elas descem para o
celular de cada aluno.

## O que falta hoje

A lista sempre atualizada sai do conferidor: `npm run conferir` (ou
`node testes/conferir-dados.mjs`) lista cada questão que ainda espera figura e
o nome exato do arquivo. Em 26/09/2026 eram 298 — 13 da UNIFESP, 32 da Santa Casa e 253 da USP-SP
(estas listadas numa tabela à parte, mais abaixo):

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-unifesp2022-046.png` | Tabela 2×2 do estudo de coorte (exposição × doença em 5 anos) |
| `q-unifesp2022-048.png` | Tabela 2×2 do ensaio clínico (para o cálculo do NNT) |
| `q-unifesp2022-081.png` | ECG de 12 derivações da admissão |
| `q-unifesp2023-023.png` | Gráfico da projeção do orçamento federal para ASPS |
| `q-unifesp2024-045.png` | Exame de imagem da pelve (achado tubário) |
| `q-unifesp2024-047.png` | Mamografia, complemento e ultrassonografia (questão anulada) |
| `q-unifesp2025-053.png` | Curva ROC com os pontos I a IV |
| `q-unifesp2026-033.png` | Resultado da cultura com antibiograma |
| `q-unifesp2026-036.png` | Radiografia de tórax |
| `q-unifesp2026-040.png` | Tabela da espirometria |
| `q-unifesp2026-060.png` | Ultrassonografia abdominal (vesícula, com setas) |
| `q-unifesp2026-061.png` | Imagens do exame da coluna lombar |
| `q-unifesp2026-074.png` | Quadro do estudo de fratura de fêmur por sexo e idade |
| `q-scmsp2022-011.png` | Cortes axiais de TC de crânio sem contraste |
| `q-scmsp2022-013.png` | Diagrama corporal das áreas queimadas (anulada) |
| `q-scmsp2022-023.png` | Curva de IMC para idade (meninas, OMS) |
| `q-scmsp2022-025.png` | Radiografia de tórax na sala de emergência |
| `q-scmsp2022-054.png` | Foto da placenta após a dequitação |
| `q-scmsp2022-056.png` | Foto do exame físico da mama da puérpera |
| `q-scmsp2023-010.png` | Eletrocardiograma |
| `q-scmsp2023-015.png` | Curvas de pressão e fluxo do ventilador |
| `q-scmsp2023-017.png` | Ultrassonografia à beira do leito (quatro câmaras) |
| `q-scmsp2023-018.png` | Tomografia de crânio |
| `q-scmsp2023-019.png` | Radiografia de tórax |
| `q-scmsp2023-045.png` | Cartão de vacinas |
| `q-scmsp2023-049.png` | Nomograma de Bhutani |
| `q-scmsp2023-075.png` | Polo cefálico fetal (fontanelas e suturas) |
| `q-scmsp2023-076.png` | Pelvimetria interna |
| `q-scmsp2025-038.png` | Tomografia de abdome (diverticulite) |
| `q-scmsp2025-040.png` | Tomografia de abdome (pancreatite) |
| `q-scmsp2025-044.png` | Gráfico de coqueluche × cobertura vacinal |
| `q-scmsp2025-063.png` | Urocultura com antibiograma |
| `q-scmsp2025-064.png` | Tabela dos controles glicêmicos |
| `q-scmsp2026-010.png` | Eletrocardiograma |
| `q-scmsp2026-017.png` | Tomografia de tórax |
| `q-scmsp2026-021.png` | Angiotomografia cervical |
| `q-scmsp2026-023.png` | Tomografia de abdome (íleo biliar) |
| `q-scmsp2026-029.png` | Tomografia de tórax (massa central) |
| `q-scmsp2026-033.png` | Tomografia de abdome (abscesso esplênico) |
| `q-scmsp2026-034.png` | Tomografia de abdome |
| `q-scmsp2026-035.png` | Tomografia de abdome (corpo estranho no duodeno) |
| `q-scmsp2026-036.png` | Tomografia do períneo/pelve |
| `q-scmsp2026-039.png` | Tomografia de abdome (vesícula) |
| `q-scmsp2026-040.png` | Tomografia de abdome (via biliar) |
| `q-scmsp2026-042.png` | Gráfico da mortalidade infantil 2006–2023 |

### USP-SP (FMUSP) 2022–2026 — 253 figuras

O arquivo de origem das provas da USP-SP trouxe só o texto: nenhuma figura
veio junto. Além de exames e traçados, várias questões têm **alternativas
que são só imagem** ("qual das imagens a seguir...") — nelas as alternativas
aparecem como "Alternativa A (ver figura)" até a figura ser anexada, e a
explicação termina com o lembrete "(Descrição ... a completar pela equipe
quando a figura original for acrescentada)". Ao anexar a figura, vale
relê-la e completar a explicação.

<details><summary>USP-SP 2022 — 45 figuras</summary>

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-usp2022-001.png` | Retinografia (fotografia do fundo de olho) |
| `q-usp2022-007.png` | Eletrocardiograma de repouso e traçado do Holter durante a crise |
| `q-usp2022-008.png` | Tomografia de crânio |
| `q-usp2022-011.png` | Ultrassom pulmonar (imagem repetida nos seis pontos do protocolo BLUE) |
| `q-usp2022-013.png` | Curva de capnografia após a intubação |
| `q-usp2022-017.png` | Tomografia computadorizada (seios da face / crânio) |
| `q-usp2022-018.png` | Eletrocardiograma de 12 derivações |
| `q-usp2022-019.png` | Eletrocardiograma de 12 derivações |
| `q-usp2022-020.png` | Radiografia de tórax |
| `q-usp2022-028.png` | Fotografia da lesão peniana |
| `q-usp2022-038.png` | Tabela com os riscos relativos (IC 95%) de demência segundo a vacinação contra influenza |
| `q-usp2022-040.png` | Mapas de São Paulo: renda, raça, mortalidade por COVID-19 e cobertura vacinal por distrito (maio de 2021) |
| `q-usp2022-043.png` | Fotografia da criança com o membro inferior esquerdo em flexão, abdução e rotação externa |
| `q-usp2022-045.png` | Fotografias da região retroauricular esquerda (abaulamento e deslocamento do pavilhão) |
| `q-usp2022-047.png` | Fotografia das lesões de pele e traçado do ritmo cardíaco |
| `q-usp2022-049.png` | Fotografia das fezes eliminadas após o toque retal |
| `q-usp2022-052.png` | Figura A (local escolhido para a punção intraóssea) e Figura B (material que refluiu pela agulha) |
| `q-usp2022-053.png` | Fotografia das lesões da cavidade oral |
| `q-usp2022-055.png` | Tabela da evolução dos exames laboratoriais e balanço hídrico das últimas 24 horas |
| `q-usp2022-057.png` | Radiografia de tórax da internação e curvas antropométricas |
| `q-usp2022-059.png` | Figura A (abaulamento no crânio) e Figura B (esquema dos seus limites anatômicos) |
| `q-usp2022-060.png` | Fotografias de achados do exame físico do recém-nascido |
| `q-usp2022-061.png` | As quatro alternativas são desenhos com linhas de incisão no antebraço (A, B, C e D) |
| `q-usp2022-062.png` | Tomografia de abdome |
| `q-usp2022-066.png` | Fotografia da ferida operatória no 7º pós-operatório |
| `q-usp2022-067.png` | Fotografia intraoperatória do descolamento do subcutâneo e da tela onlay |
| `q-usp2022-068.png` | Fotografia do ferimento no dorso |
| `q-usp2022-070.png` | Tomografia de abdome |
| `q-usp2022-071.png` | Fotografias da região cervical ao chegar (A) e minutos depois (B) |
| `q-usp2022-074.png` | Radiografia de tórax atual |
| `q-usp2022-076.png` | Radiografia contrastada de esôfago, estômago e duodeno |
| `q-usp2022-079.png` | Radiografia do cotovelo |
| `q-usp2022-080.png` | Fotografia com a demarcação das margens da ressecção no couro cabeludo |
| `q-usp2022-082.png` | As quatro alternativas são fotografias de instrumentais (A, B, C e D) |
| `q-usp2022-085.png` | Mamografia |
| `q-usp2022-086.png` | As quatro alternativas são imagens (A, B, C e D) |
| `q-usp2022-091.png` | Eletrocardiograma da paciente |
| `q-usp2022-092.png` | Eletrocardiograma da paciente |
| `q-usp2022-094.png` | Fotografia do achado operatório (útero) |
| `q-usp2022-095.png` | Imagem da ultrassonografia |
| `q-usp2022-096.png` | Fotografia do momento do parto (desprendimento do polo cefálico) |
| `q-usp2022-097.png` | Traçado de cardiotocografia |
| `q-usp2022-098.png` | Partograma; as quatro alternativas são esquemas da pelve com diâmetros marcados (A, B, C e D) |
| `q-usp2022-099.png` | Traçado de cardiotocografia |
| `q-usp2022-100.png` | Fotografia do abdome da parturiente à inspeção |

</details>

<details><summary>USP-SP 2023 — 60 figuras</summary>

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-usp2023-001.png` | Tomografia de abdome |
| `q-usp2023-003.png` | As quatro alternativas são cortes de tomografia de abdome (A, B, C e D) |
| `q-usp2023-004.png` | Fotografia da região perianal e cortes de tomografia de pelve |
| `q-usp2023-005.png` | Fotografia dos achados operatórios |
| `q-usp2023-006.png` | Fotografia do abdome (incisão com secreção purulenta) |
| `q-usp2023-007.png` | Ultrassonografia da parede abdominal |
| `q-usp2023-008.png` | Fotografia intraoperatória da tela sobre a aponeurose |
| `q-usp2023-011.png` | Imagem da endoscopia digestiva alta (lesão no corpo gástrico) |
| `q-usp2023-012.png` | Radiografia de tórax |
| `q-usp2023-013.png` | As quatro alternativas são fotografias de regiões da cavidade oral (A, B, C e D) |
| `q-usp2023-015.png` | Tomografia de abdome |
| `q-usp2023-016.png` | Fotografias do exame proctológico e da anuscopia (figuras 1 a 3) |
| `q-usp2023-017.png` | Fotografia da lesão no pé |
| `q-usp2023-018.png` | Tomografia de abdome |
| `q-usp2023-019.png` | Radiografia do quadril |
| `q-usp2023-020.png` | Radiografia do joelho |
| `q-usp2023-021.png` | Ultrassonografia da mama e fotografia do líquido aspirado |
| `q-usp2023-030.png` | Tabela de exames laboratoriais |
| `q-usp2023-034.png` | Imagens da ultrassonografia de 12 semanas |
| `q-usp2023-035.png` | Fotografia do achado no canal vaginal e imagem da ultrassonografia transvaginal |
| `q-usp2023-036.png` | Fotografia da lesão gengival |
| `q-usp2023-037.png` | Traçado de cardiotocografia |
| `q-usp2023-038.png` | Traçado de cardiotocografia |
| `q-usp2023-039.png` | Figura da variedade de posição percebida ao toque |
| `q-usp2023-040.png` | Gráfico de dispersão da taxa de mortalidade materna segundo a taxa de cesárea (193 países) |
| `q-usp2023-043.png` | As quatro alternativas são fotografias de olhos (A, B, C e D) |
| `q-usp2023-044.png` | Fotografia das lesões de face e orelhas |
| `q-usp2023-045.png` | Fotografia das pernas |
| `q-usp2023-047.png` | Radiografia de tórax e imagem da ultrassonografia cardíaca à beira do leito |
| `q-usp2023-050.png` | Eletrocardiograma de 12 derivações |
| `q-usp2023-051.png` | Eletrocardiograma |
| `q-usp2023-055.png` | Tomografia de tórax |
| `q-usp2023-056.png` | Fotografia do joelho direito |
| `q-usp2023-061.png` | Figura com a cascata de cuidado contínuo do HIV por faixa etária (Relatório de Monitoramento Clínico do HIV 2021) |
| `q-usp2023-073.png` | Gráfico da incidência e da mortalidade por câncer de tireoide ao longo do tempo |
| `q-usp2023-077.png` | Tabela com as associações entre as variantes genéticas e o câncer de mama (OR e IC 95%) |
| `q-usp2023-078.png` | Tabela com os desfechos do ensaio clínico (ivermectina versus controle) |
| `q-usp2023-079.png` | Tabela da associação entre tipos de bullying e transtorno alimentar (OR e IC 95%) |
| `q-usp2023-081.png` | Fotografia da lesão no braço (local da picada) |
| `q-usp2023-082.png` | Radiografia de tórax (moeda no esôfago) |
| `q-usp2023-083.png` | As quatro alternativas são fotografias de ventilação com bolsa-válvula-máscara (A, B, C e D) |
| `q-usp2023-085.png` | Radiografias de tórax atual (figura 1) e da alta anterior (figura 2) |
| `q-usp2023-086.png` | Tabela dos exames iniciais |
| `q-usp2023-087.png` | Tabela dos exames iniciais |
| `q-usp2023-088.png` | Figura A (fezes) e fotografia do abdome distendido |
| `q-usp2023-095.png` | Tabelas de referência (curvas da OMS de IMC e estatura e tabela de pressão arterial da 7ª Diretriz Brasileira) |
| `q-usp2023-097.png` | As quatro alternativas são radiografias de tórax (A, B, C e D) |
| `q-usp2023-098.png` | Fotografia das lesões de pele |
| `q-usp2023-102.png` | Eletrocardiograma e tela da monitorização invasiva (curva de pressão arterial) |
| `q-usp2023-104.png` | Tela da monitorização da ventilação mecânica (curvas de pressão e fluxo) |
| `q-usp2023-105.png` | Imagens da ultrassonografia pélvica; as quatro alternativas são fotografias do exame especular (A, B, C e D) |
| `q-usp2023-106.png` | As quatro alternativas são imagens de exames (A, B, C e D) |
| `q-usp2023-112.png` | Tabela com os casos de doença meningocócica no município por ano |
| `q-usp2023-113.png` | As quatro alternativas são tabelas com as intervenções por horário (A, B, C e D) |
| `q-usp2023-114.png` | As quatro alternativas são imagens de tomografia de crânio (A, B, C e D) |
| `q-usp2023-115.png` | Radiografia de tórax |
| `q-usp2023-116.png` | Radiografia de tórax; as quatro alternativas são imagens de ultrassom pulmonar (A, B, C e D) |
| `q-usp2023-117.png` | As quatro alternativas são fotografias de dispositivos de nutrição (A, B, C e D) |
| `q-usp2023-119.png` | As quatro alternativas são imagens de FAST (A, B, C e D) |
| `q-usp2023-120.png` | Figura da lesão hepática; as quatro alternativas são ilustrações de condutas operatórias (A, B, C e D) |

</details>

<details><summary>USP-SP 2024 — 53 figuras</summary>

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-usp2024-001.png` | Controles de enfermagem, radiografia de tórax e prescrição atual |
| `q-usp2024-002.png` | As quatro alternativas são fotografias de dispositivos de oxigenoterapia com o fluxo indicado (A, B, C e D) |
| `q-usp2024-009.png` | Fotografia da face da criança (rubor) |
| `q-usp2024-010.png` | Fotografias da paciente, radiografia do trajeto da derivação e tomografia de crânio |
| `q-usp2024-011.png` | Fotografia das lesões residuais em membros inferiores |
| `q-usp2024-012.png` | As quatro alternativas são imagens de procedimentos de reanimação (A, B, C e D) |
| `q-usp2024-015.png` | Radiografia de ossos longos do recém-nascido |
| `q-usp2024-024.png` | As quatro alternativas são quadros com as idades de indicação das vacinas (A, B, C e D) |
| `q-usp2024-025.png` | Tomografia de abdome |
| `q-usp2024-026.png` | Tomografia de abdome |
| `q-usp2024-028.png` | Tomografia de abdome |
| `q-usp2024-029.png` | Fotografias da lesão perineal na admissão e após o desbridamento |
| `q-usp2024-031.png` | Fotografia do ferimento cervical |
| `q-usp2024-033.png` | Fotografia da fratura exposta da perna |
| `q-usp2024-034.png` | Fotografia da fratura exposta e cortes da tomografia de corpo inteiro |
| `q-usp2024-035.png` | Radiografia de bacia e ilustração com as posições 1 a 4 para o lençol |
| `q-usp2024-036.png` | Fotografia da massa na coxa |
| `q-usp2024-037.png` | Fotografia do sítio de inserção do cateter |
| `q-usp2024-038.png` | Tomografia de abdome |
| `q-usp2024-039.png` | As quatro alternativas são prescrições pós-operatórias (A, B, C e D) |
| `q-usp2024-040.png` | Tomografia de abdome (corte coronal) |
| `q-usp2024-042.png` | Fotografia da região sacrococcígea |
| `q-usp2024-044.png` | As quatro alternativas são cortes de tomografia de abdome (A, B, C e D) |
| `q-usp2024-045.png` | Fotografia da lesão malar |
| `q-usp2024-049.png` | Fotografias do líquido sinovial puncionado |
| `q-usp2024-054.png` | Tabela com os achados cardíacos, torácicos e da veia cava dos pacientes 1, 2 e 3 no protocolo RUSH |
| `q-usp2024-055.png` | Eletrocardiograma de entrada |
| `q-usp2024-058.png` | Fotografia do rash facial |
| `q-usp2024-059.png` | Fotografia da lesão no antebraço |
| `q-usp2024-060.png` | Fotografia da lesão no antebraço |
| `q-usp2024-061.png` | Fotografias da lesão suprapúbica e da microscopia do raspado |
| `q-usp2024-062.png` | Fotografias da lesão suprapúbica e da microscopia do raspado |
| `q-usp2024-063.png` | Imagens do ultrassom pulmonar (POCUS) |
| `q-usp2024-064.png` | Imagem da veia cava inferior ao ultrassom |
| `q-usp2024-067.png` | As quatro alternativas são curvas de capnografia (A, B, C e D) |
| `q-usp2024-077.png` | Gráfico das notificações de violência contra a mulher no Brasil ao longo do tempo |
| `q-usp2024-078.png` | Quadro com as seis dimensões de indicadores (Coluna 1) e os exemplos (Coluna 2) |
| `q-usp2024-083.png` | Tabela 2×2 (violência por parceiro íntimo × depressão pós-parto) |
| `q-usp2024-085.png` | Tabela com os resultados da metanálise por localização do câncer (RR e IC 95%) |
| `q-usp2024-087.png` | Fluxograma da assistência na UPA |
| `q-usp2024-093.png` | Tabela com os resultados da metanálise (medida de associação e IC 95% por subgrupos) |
| `q-usp2024-106.png` | Fotografia do exame especular do colo uterino |
| `q-usp2024-108.png` | Figura com estruturas anatômicas numeradas de I a IV |
| `q-usp2024-110.png` | As quatro alternativas são figuras (A, B, C e D) |
| `q-usp2024-111.png` | Fotografia do período expulsivo (retração do polo cefálico); as quatro alternativas são ilustrações de manobras (A, B, C e D) |
| `q-usp2024-112.png` | Tabela dos exames do início do pré-natal |
| `q-usp2024-114.png` | Fotografia do exame especular; as quatro alternativas são imagens de bacterioscopia (A, B, C e D) |
| `q-usp2024-115.png` | Tabela com os exames da primeira consulta de pré-natal |
| `q-usp2024-116.png` | Tabela com os exames da primeira consulta de pré-natal |
| `q-usp2024-117.png` | Tabela com os exames da primeira consulta de pré-natal |
| `q-usp2024-118.png` | Tabela com os exames da primeira consulta de pré-natal |
| `q-usp2024-119.png` | Fotografia do exame especular (saída de líquido pelo orifício do colo) |
| `q-usp2024-120.png` | Fotografia do exame especular (saída de líquido pelo orifício do colo) |

</details>

<details><summary>USP-SP 2025 — 50 figuras</summary>

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-usp2025-001.png` | Fotografia da face; as quatro alternativas são imagens de ultrassonografia ovariana (A, B, C e D) |
| `q-usp2025-002.png` | Fotografia da face |
| `q-usp2025-003.png` | Fotografia da face |
| `q-usp2025-004.png` | Ultrassonografia transvaginal (corte longitudinal do útero) |
| `q-usp2025-009.png` | As quatro alternativas são figuras de procedimentos no colo uterino (A, B, C e D) |
| `q-usp2025-010.png` | Imagem da ultrassonografia |
| `q-usp2025-011.png` | Partograma; as quatro alternativas são desenhos de tipos de pelve (A, B, C e D) |
| `q-usp2025-012.png` | Partograma e traçado de cardiotocografia |
| `q-usp2025-013.png` | Tabela com o perfil glicêmico |
| `q-usp2025-017.png` | Traçado de cardiotocografia |
| `q-usp2025-018.png` | Dopplervelocimetria da artéria umbilical e da artéria cerebral média |
| `q-usp2025-020.png` | Figura com o local de ausculta dos batimentos cardíacos fetais no abdome materno |
| `q-usp2025-021.png` | Fotografias do exame físico (mamas e abdome) |
| `q-usp2025-023.png` | Fotografias do material (fita/sling) e da técnica de inserção |
| `q-usp2025-026.png` | Fotografia da faca empalada na parede anterior do tórax |
| `q-usp2025-036.png` | Tomografia de abdome do 10º dia |
| `q-usp2025-040.png` | Fotografia do tornozelo e pé (edema e flictenas) e radiografia do tornozelo |
| `q-usp2025-041.png` | Cortes da tomografia de abdome; as quatro alternativas são esquemas do segmento a ressecar (A, B, C e D) |
| `q-usp2025-042.png` | Ressonância de abdome |
| `q-usp2025-043.png` | As quatro alternativas são quadros com a orientação sobre cada medicamento (A, B, C e D) |
| `q-usp2025-048.png` | Cortes da tomografia de abdome |
| `q-usp2025-049.png` | Imagens da otoscopia e da oroscopia |
| `q-usp2025-050.png` | Imagem da ultrassonografia pulmonar (padrão observado em todos os campos) |
| `q-usp2025-051.png` | Resultados dos exames laboratoriais (hemograma) |
| `q-usp2025-054.png` | As quatro alternativas são resultados de exames (A, B, C e D) |
| `q-usp2025-055.png` | Fotografia do conteúdo da lavagem gástrica |
| `q-usp2025-056.png` | Traçado eletrocardiográfico; as quatro alternativas são prescrições (A, B, C e D) |
| `q-usp2025-059.png` | Radiografias de tórax da admissão e do 3º dia de internação |
| `q-usp2025-060.png` | Fotografia das unhas dos háluxes |
| `q-usp2025-062.png` | Dados de monitorização (frequência cardíaca, saturação e traçado) |
| `q-usp2025-064.png` | As quatro alternativas são fotografias de lesões de pele (A, B, C e D) |
| `q-usp2025-067.png` | Fotografia das petéquias na fossa antecubital após o torniquete |
| `q-usp2025-069.png` | Imagens do teste do coraçãozinho; as quatro alternativas são esquemas de estruturas cardiovasculares (A, B, C e D) |
| `q-usp2025-070.png` | Imagens do teste do coraçãozinho (saturação pré e pós-ductal) |
| `q-usp2025-076.png` | Tomografia de crânio sem contraste |
| `q-usp2025-082.png` | Fotografia das lesões na nádega e imagem do raspado (citodiagnóstico de Tzanck) |
| `q-usp2025-083.png` | Eletrocardiograma de 12 derivações |
| `q-usp2025-086.png` | Exames complementares apresentados (imagem) |
| `q-usp2025-087.png` | As quatro alternativas são radiografias de tórax (A, B, C e D) |
| `q-usp2025-088.png` | As quatro alternativas são imagens de ultrassonografia torácica (A, B, C e D) |
| `q-usp2025-089.png` | Eletrocardiograma de 12 derivações |
| `q-usp2025-091.png` | Eletrocardiograma |
| `q-usp2025-093.png` | Tabela com a prova de função pulmonar (espirometria pré e pós-broncodilatador) |
| `q-usp2025-094.png` | Tabela com a prova de função pulmonar; as quatro alternativas são quadros com parâmetros de ventilação (A, B, C e D) |
| `q-usp2025-099.png` | Tabela com as taxas padronizadas de mortalidade por aids por estado |
| `q-usp2025-102.png` | Tabela com a ocorrência de depressão por sexo |
| `q-usp2025-103.png` | Tabela com a ocorrência de depressão por sexo |
| `q-usp2025-110.png` | Figura da cascata de cuidado contínuo do HIV |
| `q-usp2025-114.png` | Tabela com os desfechos da gestação segundo o uso de Cannabis (medidas de associação e IC 95%) |
| `q-usp2025-115.png` | Tabela com os atendimentos das pessoas cadastradas (medidas de pressão arterial no ano) |

</details>

<details><summary>USP-SP 2026 — 45 figuras</summary>

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-usp2026-001.png` | Imagens da ultrassonografia à beira do leito |
| `q-usp2026-006.png` | Eletrocardiograma de 12 derivações |
| `q-usp2026-007.png` | Eletroforese de proteínas séricas (pico monoclonal) |
| `q-usp2026-011.png` | As quatro alternativas são imagens de ressonância magnética de crânio (A, B, C e D) |
| `q-usp2026-012.png` | Eletrocardiograma |
| `q-usp2026-013.png` | Tabela com os achados clínicos e suas razões de verossimilhança; as quatro alternativas são linhas da tabela (A, B, C e D) |
| `q-usp2026-014.png` | As quatro alternativas são radiografias de tórax (A, B, C e D) |
| `q-usp2026-018.png` | Tabela de prevalência das trombofilias hereditárias e risco de tromboembolismo com contraceptivo oral |
| `q-usp2026-021.png` | Eletrocardiograma |
| `q-usp2026-025.png` | Fotografia da lesão anal |
| `q-usp2026-026.png` | Cortes da tomografia de abdome |
| `q-usp2026-027.png` | Corte da tomografia de abdome com os achados relevantes |
| `q-usp2026-030.png` | Tomografia de abdome |
| `q-usp2026-033.png` | As quatro alternativas são imagens de tomografia de abdome (A, B, C e D) |
| `q-usp2026-038.png` | Fotografia da lesão no membro inferior |
| `q-usp2026-040.png` | Imagens da tomografia de abdome; as quatro alternativas são fotografias de achados operatórios (A, B, C e D) |
| `q-usp2026-041.png` | Fotografia do campo operatório com estruturas numeradas de 1 a 4 |
| `q-usp2026-044.png` | Radiografia de tórax |
| `q-usp2026-045.png` | Imagem do FAST |
| `q-usp2026-046.png` | Imagem do exame contrastado do esôfago (hérnia hiatal tipo III) |
| `q-usp2026-048.png` | Radiografia do fêmur esquerdo |
| `q-usp2026-049.png` | As quatro alternativas são imagens de dispositivos de suporte respiratório (A, B, C e D) |
| `q-usp2026-050.png` | Tomografia de crânio |
| `q-usp2026-052.png` | Gráficos de crescimento da caderneta da criança |
| `q-usp2026-054.png` | As quatro alternativas são traçados eletrocardiográficos (A, B, C e D) |
| `q-usp2026-055.png` | Tabela com o antibiograma do Staphylococcus aureus |
| `q-usp2026-056.png` | Fotografias da carteira de vacinação da criança e da caderneta da gestante/parto |
| `q-usp2026-059.png` | Tabelas de IMC por idade da OMS (meninos) |
| `q-usp2026-060.png` | Resultado do teste de Snellen (acuidade visual de cada olho) |
| `q-usp2026-062.png` | Fotografias da região perineal do bebê e da mama da mãe |
| `q-usp2026-063.png` | Imagem da técnica de uso do inalador |
| `q-usp2026-064.png` | Fotografia da região umbilical da recém-nascida |
| `q-usp2026-066.png` | Imagem da ultrassonografia renal/vias urinárias; as quatro alternativas são imagens de exames (A, B, C e D) |
| `q-usp2026-069.png` | As quatro alternativas são ilustrações da via aérea e de curvas fluxo-volume (A, B, C e D) |
| `q-usp2026-070.png` | Dados de monitorização (prévio e atual); as quatro alternativas são ilustrações de procedimentos (A, B, C e D) |
| `q-usp2026-071.png` | Gráfico da icterícia (zona de Kramer) e da evolução do peso |
| `q-usp2026-072.png` | As quatro alternativas são imagens de dispositivos de via aérea (A, B, C e D) |
| `q-usp2026-073.png` | Tabela com os óbitos, a população e as taxas das populações 1 e 2 |
| `q-usp2026-076.png` | Gráfico da mortalidade por COVID-19 ajustada por idade, segundo raça e sexo (São Paulo, 2020) |
| `q-usp2026-081.png` | Tabela de casos e controles por nível de exposição solar (participantes de pele mais escura) |
| `q-usp2026-082.png` | Tabela com os óbitos nos grupos sotatercept e placebo |
| `q-usp2026-087.png` | Tabela/gráfico com o risco relativo de leptospirose por faixa de residências atingidas pelas inundações |
| `q-usp2026-100.png` | Fotografia/ilustração da avaliação abdominal da parturiente |
| `q-usp2026-104.png` | Achados da avaliação fetal (Doppler/perfil biofísico/cardiotocografia) |
| `q-usp2026-111.png` | Imagens da avaliação do colo uterino por via transvaginal |

</details>

As provas da Santa Casa de 2022 a 2026 chegaram sem as figuras (o arquivo de
origem só tinha o texto); as 7 figuras da prova de 2021 já estão aqui
(`q-scmsp2021-*`), recortadas do caderno de questões.

## Questão nova com imagem

No arquivo da prova, acrescente à questão:

```js
imagemUrl:"dados/imagens/q-usp2027-012.png", imagemLegenda:"ECG de 12 derivações",
```

Se a figura ainda não estiver pronta, acrescente também
`imagemPendente:"o que a prova mostrava"` — é o texto do aviso, e é o que faz o
conferidor listar a questão como pendência em vez de acusar erro.
