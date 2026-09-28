# `dados/imagens/` — as figuras das provas

Algumas questões reais dependem de uma figura da prova original — um ECG, uma
tabela 2×2, uma radiografia, um antibiograma. Essas questões trazem o campo
`imagemPendente` (a descrição do que a prova mostrava) e, enquanto ele existir,
**não aparecem para os alunos**: ficam fora do estudo, da revisão, das provas
antigas e dos simulados. Continuam no banco, separadas para a equipe em
*Banco de Questões > Status > Aguardando imagem*.

## Como anexar

1. Recorte a figura do PDF oficial da prova (um print da região basta).
2. Salve aqui com o **nome da questão**: `q-unifesp2026-036.png`.
   `.jpg`, `.jpeg` e `.webp` também servem — a plataforma tenta as quatro.
3. Apague a linha `imagemPendente` da questão no arquivo `dados/prova-*.js`
   (e, se quiser, acrescente `imagemLegenda`). É isso que a devolve aos alunos.
   `npm run conferir` avisa toda questão cuja figura já está aqui mas que
   continua marcada como pendente.
4. Publique o site de novo (com a pasta `dados/` junto).

Sem mexer em arquivo: em **Questões para Atualizar** (ou Banco de Questões >
editar), enviar a imagem ali mesmo — ou marcar "a imagem já foi salva em
dados/imagens/" — libera a questão na hora. Com a nuvem ligada, o conserto sobe
(a figura vai para o Storage) e chega a toda a turma. Para trazer de vez para
esta pasta: **Baixar as atualizações** na mesma tela e, na pasta do projeto,

    npm run atualizar-dados -- atualizacoes-questoes-AAAA-MM-DD.json

que salva cada figura aqui com o nome da questão, apaga a linha
`imagemPendente` e grava o resto do conserto no arquivo da prova (só as
questões consertadas, só os campos que mudaram).

Prefira imagens com até ~1600 px de largura e até ~400 KB: elas descem para o
celular de cada aluno.

## O que falta hoje

A lista sempre atualizada sai do conferidor: `npm run conferir` (ou
`node testes/conferir-dados.mjs`) lista cada questão que ainda espera figura e
o nome exato do arquivo. Em 27/09/2026 eram 233 — 13 da UNIFESP, 32 da Santa Casa, 30 da USP-SP
e 158 da USP-RP (estas duas últimas listadas em tabelas à parte, mais abaixo):

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

### USP-SP (FMUSP) 2022–2026 — 30 figuras

O arquivo de origem das provas da USP-SP trouxe só o texto. As figuras de
**2022, 2024, 2025 e 2026** e as das questões 1 a 55 de **2023** foram recortadas depois dos cadernos de questões
em PDF (edições da Medway só com a prova, sem comentários) e já estão nesta
pasta, em `.png` (tabelas, traçados, esquemas) ou `.jpg` (fotos e exames de
imagem). Quando a figura era só texto — tabela de prescrições, quadro de
vacinas, tabela de razões de verossimilhança —, ela foi transcrita nas
alternativas e a questão ficou sem imagem.

Ainda faltam:

- **29 figuras de 2023** — a questão 30 e as da 56 em diante, que não estavam
  na parte 1 do caderno recebida — na tabela abaixo;
- **`q-usp2026-063.png`** — fotografia do exame físico de uma criança, que a
  edição consultada substituiu pelo aviso "imagem removida nos termos do
  Estatuto da Criança e do Adolescente". Só o caderno oficial a tem.

Nas questões de 2023 com **alternativas que são só imagem**, as alternativas
aparecem como "Alternativa A (ver figura)" e a explicação termina com o
lembrete "(Descrição ... a completar pela equipe quando a figura original for
acrescentada)". Ao anexar a figura, vale relê-la e completar a explicação.

<details><summary>USP-SP 2023 — 29 figuras</summary>

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-usp2023-030.png` | Tabela de exames laboratoriais |
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

### USP-RP (FMRP) 2021–2026 — 158 figuras

A prova de **2026** veio no caderno oficial em PDF, e as 35 figuras dela já
estão nesta pasta (`q-usprp2026-*`), recortadas do caderno e conferidas a olho:
`.png` para tabelas (exames, espirometria, monitorização glicêmica) e `.jpg`
para fotos, exames de imagem, gráficos e traçados.

As provas de **2021 a 2025** vieram numa edição comentada só em texto
(sem nenhuma figura; dos comentários, nada foi aproveitado). As 158 questões
que dependiam de figura apontam para `q-usprp20AA-NNN.png` e descrevem em
`imagemPendente` o que a prova mostrava; as explicações já descrevem o achado
esperado pelo texto e pelo gabarito, e valem ser relidas quando a figura
chegar. Algumas têm alternativas que só fazem sentido com a figura (2023-65,
esquema do néfron; 2024-42, fonogramas; 2025-60, figuras 1 a 4; 2025-61,
imagens A a D). Os cadernos oficiais de 2021 a 2025 resolvem tudo de uma vez.

<details><summary>USP-RP 2021 — 44 figuras</summary>

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-usprp2021-015.png` | Tabela com a sorologia (IgG) contra o Zika vírus nas crianças com e sem microcefalia |
| `q-usprp2021-016.png` | Gráfico do tétano acidental no Brasil — casos/incidência e cobertura vacinal ao longo dos anos |
| `q-usprp2021-017.png` | Foto da manobra realizada no exame do joelho |
| `q-usprp2021-019.png` | Foto do olho direito |
| `q-usprp2021-024.png` | Figura do iceberg — casos notificados e confirmados de Covid-19 em relação às infecções estimadas pelo inquérito |
| `q-usprp2021-027.png` | Radiografia de tórax |
| `q-usprp2021-031.png` | Foto dos sinais do polegar e do punho |
| `q-usprp2021-038.png` | Foto das lesões de pele |
| `q-usprp2021-043.png` | Traçado do monitor cardíaco |
| `q-usprp2021-046.png` | Curva de crescimento da paciente |
| `q-usprp2021-047.png` | Tabela do esquema de insulina e gráfico do perfil glicêmico da última semana |
| `q-usprp2021-053.png` | Quadro do perfil glicêmico da última semana |
| `q-usprp2021-055.png` | Resultado do teste imunológico de gravidez |
| `q-usprp2021-056.png` | Partograma (Figura 1) e cardiotocografia intraparto das 20h (Figura 2) |
| `q-usprp2021-059.png` | Exame das mamas — hiperemia e fissuras no complexo areolomamilar |
| `q-usprp2021-062.png` | Mamografias no tempo zero, com 6 e com 12 meses |
| `q-usprp2021-063.png` | Exame especular e ultrassonografia transvaginal |
| `q-usprp2021-065.png` | Imagem da lesão vulvar |
| `q-usprp2021-066.png` | Ultrassonografia transvaginal |
| `q-usprp2021-067.png` | Grade do POP-Q com as medidas da paciente |
| `q-usprp2021-068.png` | Ultrassonografias transvaginais (imagens 1 e 2) |
| `q-usprp2021-076.png` | Radiografia de tórax |
| `q-usprp2021-077.png` | Tomografia computadorizada de crânio |
| `q-usprp2021-079.png` | Foto do pé direito |
| `q-usprp2021-082.png` | Ultrassonografia abdominal e foto da peça cirúrgica |
| `q-usprp2021-083.png` | Tomografia de abdome |
| `q-usprp2021-084.png` | Foto da ferida operatória |
| `q-usprp2021-085.png` | Foto do paciente (queimaduras na face) |
| `q-usprp2021-086.png` | Foto do tumor no punho |
| `q-usprp2021-088.png` | Ressonância magnética da sela túrcica (cortes sagital e coronal) |
| `q-usprp2021-089.png` | Foto da fralda com fezes com muco e sangue |
| `q-usprp2021-092.png` | Radiografia simples (prego ingerido) |
| `q-usprp2021-095.png` | Radiografia simples do abdome |
| `q-usprp2021-097.png` | Fonogramas (figuras a, b, c e d) |
| `q-usprp2021-099.png` | Radiografias de tórax (figuras A a D) |
| `q-usprp2021-100.png` | Foto das lesões de pele |
| `q-usprp2021-101.png` | Foto das lesões cutâneas |
| `q-usprp2021-102.png` | Foto das lesões no membro superior |
| `q-usprp2021-106.png` | Fotos da paciente (bócio e olhos) |
| `q-usprp2021-108.png` | Tomografia de crânio sem contraste |
| `q-usprp2021-109.png` | Foto do dispositivo de oxigênio (máscara com reservatório) |
| `q-usprp2021-115.png` | Esfregaço do sangue periférico |
| `q-usprp2021-116.png` | Mielograma (macrófago com pequenas estruturas ovaladas) |
| `q-usprp2021-119.png` | Eletrocardiograma e ventriculografia |

</details>

<details><summary>USP-RP 2022 — 32 figuras</summary>

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-usprp2022-004.png` | Gráfico da temperatura média da superfície terrestre nos últimos 170 anos |
| `q-usprp2022-005.png` | Gráfico 1 — cobertura por planos de assistência médica e odontológica nos estados do Sudeste em três períodos |
| `q-usprp2022-007.png` | Figura dos 5 momentos para higienização das mãos (OMS) |
| `q-usprp2022-010.png` | Figura do artigo sobre a efetividade da CoronaVac no Chile |
| `q-usprp2022-017.png` | Fotos da orofaringe e do tronco do paciente |
| `q-usprp2022-019.png` | Foto da região da fralda (a descrição da lesão está incompleta no material de origem) |
| `q-usprp2022-021.png` | Radiografia após a drenagem (figura A) e tomografias de tórax (figuras B e C) |
| `q-usprp2022-023.png` | Ressonância magnética da coluna lombar |
| `q-usprp2022-025.png` | Foto da ferida esternal após três ciclos de terapia por pressão negativa |
| `q-usprp2022-026.png` | Tomografia de crânio sem contraste |
| `q-usprp2022-030.png` | Foto do ferimento da orelha |
| `q-usprp2022-033.png` | Foto da lesão no nariz |
| `q-usprp2022-038.png` | Exames laboratoriais do 4º pós-operatório |
| `q-usprp2022-040.png` | Radiografias do quadril |
| `q-usprp2022-047.png` | Figura 1 — lesões vulvares |
| `q-usprp2022-050.png` | Monitorização intraparto (figura 1) e partograma até às 14h (figura 2) |
| `q-usprp2022-051.png` | Gráfico do desenvolvimento pondero-estatural |
| `q-usprp2022-056.png` | Curva de evolução do hCG após o esvaziamento |
| `q-usprp2022-060.png` | Exame ginecológico (prolapso genital) |
| `q-usprp2022-062.png` | Foto da lesão na língua |
| `q-usprp2022-066.png` | Figura 1 (língua) e figura 2 (esfregaço de sangue periférico) |
| `q-usprp2022-069.png` | Foto da urina do paciente (urina escura, cor de "coca-cola") |
| `q-usprp2022-070.png` | Radiografia de tórax (PA) e eletrocardiograma |
| `q-usprp2022-071.png` | Lesão pruriginosa no antebraço |
| `q-usprp2022-073.png` | Foto da oroscopia (úlcera em palato) |
| `q-usprp2022-077.png` | Foto da mão esquerda com nódulos (tofos) |
| `q-usprp2022-080.png` | Eletrocardiograma |
| `q-usprp2022-089.png` | Foto da pele da criança (lesões eritematosas) |
| `q-usprp2022-090.png` | Tabela de percentis de pressão arterial para meninos, segundo idade e percentil de estatura |
| `q-usprp2022-093.png` | Radiografia do cotovelo esquerdo |
| `q-usprp2022-094.png` | Curvas de estatura e peso do paciente |
| `q-usprp2022-098.png` | Curva de crescimento com estaturas anteriores do paciente |

</details>

<details><summary>USP-RP 2023 — 32 figuras</summary>

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-usprp2023-005.png` | Foto das lesões cutâneas em membros inferiores e nádegas |
| `q-usprp2023-006.png` | Radiografia de controle após a passagem da sonda nasogástrica |
| `q-usprp2023-007.png` | Foto da genitália do recém-nascido |
| `q-usprp2023-012.png` | Radiografia após a ingestão do objeto |
| `q-usprp2023-014.png` | Quadro do cartão vacinal da criança |
| `q-usprp2023-021.png` | Inspeção vulvar com as lesões genitais |
| `q-usprp2023-026.png` | Cardiotocografia (com marcação dos movimentos fetais) |
| `q-usprp2023-027.png` | Partograma da evolução do trabalho de parto |
| `q-usprp2023-032.png` | Inspeção vulvar (foto da lesão) |
| `q-usprp2023-037.png` | Grade do POP-Q com as medidas da paciente |
| `q-usprp2023-042.png` | Registro do teste de sensibilidade com estesiômetro (monofilamentos) nos pés |
| `q-usprp2023-043.png` | Cartão vacinal da criança de 5 meses |
| `q-usprp2023-050.png` | Gráfico de riscos relativos ajustados (com intervalos de confiança) por meio de transporte |
| `q-usprp2023-053.png` | Curva ROC do teste diagnóstico |
| `q-usprp2023-058.png` | Fotos das lesões no tronco e no antebraço |
| `q-usprp2023-059.png` | Gráfico de crescimento do paciente (com a altura-alvo) |
| `q-usprp2023-060.png` | Foto da lesão no braço |
| `q-usprp2023-061.png` | Eletrocardiograma de 12 derivações |
| `q-usprp2023-062.png` | Foto da unha do primeiro quirodáctilo esquerdo |
| `q-usprp2023-065.png` | Esquema do néfron com os segmentos marcados de A a D |
| `q-usprp2023-070.png` | Foto do olho com o arco esbranquiçado na periferia da córnea |
| `q-usprp2023-071.png` | Esfregaço de sangue periférico |
| `q-usprp2023-073.png` | Radiografias de tórax da admissão (A) e após 20 dias (B) |
| `q-usprp2023-077.png` | Eletrocardiograma do terceiro dia de internação |
| `q-usprp2023-079.png` | Foto dos pés |
| `q-usprp2023-080.png` | Mãos após o teste de contato com gelo |
| `q-usprp2023-082.png` | Exames de imagem da aorta dos pacientes 1 e 2 |
| `q-usprp2023-084.png` | Fotos dos cálculos numerados de 1 a 4, retirados na cirurgia |
| `q-usprp2023-086.png` | Tomografia de crânio sem contraste (A) e com contraste (B) |
| `q-usprp2023-087.png` | Ultrassonografia transfontanelar |
| `q-usprp2023-095.png` | Ressonância magnética da coluna lombar |
| `q-usprp2023-100.png` | Tomografia de abdome |

</details>

<details><summary>USP-RP 2024 — 25 figuras</summary>

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-usprp2024-002.png` | Resultado da série vermelha do hemograma |
| `q-usprp2024-004.png` | Laudo da citologia oncótica |
| `q-usprp2024-010.png` | Gráfico da associação entre concentração de PM10/PM2,5 e mortalidade, com os limites das agências |
| `q-usprp2024-011.png` | Gráfico do risco relativo de óbito conforme a temperatura média em algumas cidades (Bangcoc, Madri, Taipei, Chicago) |
| `q-usprp2024-019.png` | Gráfico da participação (%) da receita própria aplicada em saúde pelos três municípios e pelo estado |
| `q-usprp2024-021.png` | Ressonância magnética do encéfalo |
| `q-usprp2024-022.png` | Foto da lesão pré-auricular com linfonodos cervicais |
| `q-usprp2024-024.png` | Resultado da gasometria arterial do paciente em ventilação mecânica |
| `q-usprp2024-031.png` | Foto da lesão ulcerada no pavilhão auricular |
| `q-usprp2024-034.png` | Imagem da ultrassonografia à beira do leito |
| `q-usprp2024-035.png` | Tomografia de abdome realizada no pronto-socorro |
| `q-usprp2024-038.png` | Tomografia de crânio |
| `q-usprp2024-041.png` | Eletrocardiograma de 12 derivações |
| `q-usprp2024-042.png` | Fonogramas (diagramas 1 a 4) da ausculta cardíaca |
| `q-usprp2024-044.png` | Foto das lesões de pele |
| `q-usprp2024-063.png` | Gráfico com os níveis de bilirrubina para indicação de fototerapia conforme a idade em horas |
| `q-usprp2024-068.png` | Registro do desenvolvimento na Caderneta da Criança |
| `q-usprp2024-076.png` | Traçado eletrocardiográfico |
| `q-usprp2024-078.png` | Curva ponderal do paciente |
| `q-usprp2024-080.png` | Foto da genitália e tabela dos exames hormonais |
| `q-usprp2024-082.png` | Ultrassonografia transvaginal |
| `q-usprp2024-083.png` | Traçado do estudo urodinâmico |
| `q-usprp2024-089.png` | Mamografia — incidências craniocaudal e mediolateral oblíqua |
| `q-usprp2024-093.png` | Cardiotocografia do dia |
| `q-usprp2024-096.png` | Resultado do teste de gravidez na urina |

</details>

<details><summary>USP-RP 2025 — 25 figuras</summary>

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-usprp2025-005.png` | Radiografia de tórax |
| `q-usprp2025-008.png` | Foto das lesões cutâneas do lactente |
| `q-usprp2025-012.png` | Tabela com os exames da primeira avaliação e os atuais (perfil lipídico e outros) |
| `q-usprp2025-019.png` | Curva de crescimento com os pesos do lactente nos primeiros 6 meses |
| `q-usprp2025-023.png` | Genograma da família |
| `q-usprp2025-035.png` | Figura 1 do estudo — curvas de incidência do desfecho primário por presença ou ausência de micro e nanoplásticos |
| `q-usprp2025-036.png` | Figura do risco relativo de insuficiência renal aguda conforme a temperatura média diária |
| `q-usprp2025-037.png` | Mapa do SEEG com as emissões de gases de efeito estufa por município e setor |
| `q-usprp2025-038.png` | Figura do impacto acumulado do Programa Expandido de Imunizações por vacina |
| `q-usprp2025-043.png` | Quadro do escore MEOWS (sinais vitais em negrito) |
| `q-usprp2025-044.png` | Quadro do perfil glicêmico da última semana |
| `q-usprp2025-045.png` | Cardiotocografias antes (Figura 1) e após as medidas de reanimação intrauterina (Figura 2) |
| `q-usprp2025-047.png` | Partograma da evolução do trabalho de parto |
| `q-usprp2025-053.png` | Foto da mama (inspeção estática) |
| `q-usprp2025-054.png` | Exame físico e estudo urodinâmico |
| `q-usprp2025-056.png` | Ultrassonografia transvaginal |
| `q-usprp2025-060.png` | Figuras 1 a 4 com opções de orientação contraceptiva |
| `q-usprp2025-061.png` | Imagens A a D (achados de exame físico) |
| `q-usprp2025-062.png` | Eletrocardiograma |
| `q-usprp2025-064.png` | Foto das lesões do abdome |
| `q-usprp2025-072.png` | Fotos das lesões de pele |
| `q-usprp2025-074.png` | Resultado da monitorização ambulatorial da pressão arterial (MAPA) |
| `q-usprp2025-079.png` | Foto dos joelhos |
| `q-usprp2025-080.png` | Foto da pele do paciente |
| `q-usprp2025-097.png` | Foto do nódulo cervical em nível II |

</details>

As provas da Santa Casa de 2022 a 2026 chegaram sem as figuras (o arquivo de
origem só tinha o texto); as 7 figuras da prova de 2021 já estão aqui
(`q-scmsp2021-*`), recortadas do caderno de questões.

### AMRIGS 2022–2025 — nenhuma pendente

As quatro provas vieram no caderno oficial, e as 23 figuras (5 de 2022, 9 de
2023, 7 de 2024 e 2 de 2025) já estão nesta pasta (`q-amrigs*`), recortadas do caderno e conferidas a
olho: `.jpg` para fotos, radiografia, ECG e ilustrações; `.png` para gráficos,
esquemas e tabelas. Na 2023-54, na 2024-46 e na 2024-60, as quatro
alternativas são as próprias ilustrações (A a D), reunidas numa figura só.

## Questão nova com imagem

No arquivo da prova, acrescente à questão:

```js
imagemUrl:"dados/imagens/q-usp2027-012.png", imagemLegenda:"ECG de 12 derivações",
```

Se a figura ainda não estiver pronta, acrescente também
`imagemPendente:"o que a prova mostrava"` — é o texto do aviso, e é o que faz o
conferidor listar a questão como pendência em vez de acusar erro.
