# Provas para o grupo "Lucas G1"

Arquivos no formato do importador da plataforma (`.txt`, um bloco por questão,
gabarito e explicação no padrão da casa). **Não estão em `dados/`** de propósito:
tudo que está lá é público para todos. Importadas pela tela, as questões ficam
só no grupo.

| Arquivo | Prova | Questões | Gabarito |
|---|---|---|---|
| `simulado-5ano-01-2025.txt` | Simulado MSP5210/MSP6210 01/2025 — 5º ano | 120 | gabarito oficial (PDF "Simulado 05/04") |
| `simulado-4-todo-conteudo-04-2025.txt` | Simulado MSP6210 04/2025 — todo o conteúdo | 120 | gabarito comentado oficial (PDF) |
| `simulado-5-todo-conteudo-05-2025.txt` | Simulado MSP6210 05/2025 — todo o conteúdo | 120 | gabarito comentado oficial (PDF); explicações reescritas no padrão |
| `simulado-6ano-03-2025.txt` | Simulado MSP6210 03/2025 — 6º ano | 120 | gabarito comentado oficial (PDF); explicações reescritas no padrão |
| `simulado-6ano-03-2025.html` | o mesmo simulado, para estudar no navegador | 120 | arquivo único, sem internet: abre com dois cliques, mostra gabarito e explicação e guarda o progresso só no navegador |
| `simulado-5ano-02-07-06-2025.txt` | Simulado 2 do 5º ano (07/06/2025) | 120 | gabarito oficial (PDF só com as letras); explicações autorais |

## Como importar (logado como Lucas Kuramae)

1. Importar Questões → modo "Prova inteira" → enviar o `.txt`.
2. Em "Destino", escolher **Questões do grupo Lucas G1**.
3. Conferir a pré-visualização e confirmar.

O destino "grupo" só aparece para o papel **aluno** (`opcoesDestinoImportacao`,
`codigo/12a-importacao.js`), e o grupo precisa estar ativo como grupo de
questões da conta. Se a conta for de professor/administrador, a opção não
aparece: use uma conta de aluno que seja membro do grupo.

## Figuras

Recortadas dos PDFs e guardadas em `figuras/<nome-do-arquivo-sem-extensão>/qNNN.jpg`
(`qNNN-a`, `-b`… quando a questão tem mais de uma imagem), com o número da questão
do `.txt`. Na pré-visualização do importador, anexe a figura de mesmo número à
questão marcada com `IMAGEM: sim`. Por serem material do grupo, o repositório
precisa ficar privado.

- Simulado 6º ano (03/2025), Simulado 5 (05/2025), Simulado 2 do 5º ano (07/06) e
  Simulado 4 (04/2025): figuras extraídas. O HTML do Simulado 6º ano já traz as suas.
- Simulado 5º ano (01/2025): sem figuras, o PDF dessa prova não foi reenviado.
- Questões marcadas que não têm imagem no PDF (a descrição estava só no enunciado)
  tiveram a marca retirada (6º ano Q62, Simulado 5 Q36, 07/06 Q3 e Q96). No Simulado 4
  as Q63 e Q72 continuam marcadas e sem figura recortada: confira no caderno.
- Q50 e Q51 do 6º ano usam a mesma cardiotocografia (`q050.jpg`, `q051.jpg`).
- Os recortes são automáticos: dê uma olhada em cada um ao anexar, pois um pode
  trazer um pedaço de texto na borda.

## O que ficou de fora e por quê

- **Figuras** (ECG, tomografia, fotos, gráficos), ver acima: os blocos marcam `IMAGEM: sim —
  <descrição>`; o arquivo da figura é anexado na pré-visualização, questão por
  questão. As questões de alternativas em imagem (68, 93 do 5º ano; 49, 71, 115
  do Simulado 4) trazem "figura do caderno" no lugar do texto da alternativa.
- **Duplicadas do banco público**: o importador as desmarca sozinho (5º ano:
  23, 24, 35; Simulado 4: 75, 100; Simulado 5: 6 questões; as do 07/06 não repetem o banco); marque à mão se quiser a versão com a
  explicação nova.
- **UNIFESP — avaliação discente 2026.2**: falta o gabarito (a tabela de
  respostas do `.docx` está em branco). Entra assim que o gabarito chegar.

## Pontos que merecem conferência

- Os trechos "Dicas da imagem" foram escritos a partir das figuras dos PDFs; vale
  conferir cada um ao anexar a figura.
- Gabarito discutível ou com divergência no próprio material (está dito na
  explicação de cada uma):
  - 5º ano: Q10 (lactente de 50 dias, critérios de Rochester), Q24, Q27, Q65,
    Q70, Q88 (partograma com ocitocina em dose baixa; B também é defensável),
    Q91 (a alternativa A parece inconsistente), Q93, Q95.
  - Simulado 5 (05/2025): Q24 (ARNI contra espironolactona/dapagliflozina:
    hoje os quatro pilares entram juntos), Q25 (comentário fala em
    sangramento, que o enunciado não traz), Q46 (dose de levotiroxina e
    corte de TSH do gabarito diferem das diretrizes atuais), Q107 (BCG em
    prematuro: critério do gabarito é o apresentado no enunciado).
    A questão de alternativas em imagem (18, 49, 54) traz descrição da figura.
  - Simulado 2 do 5º ano (07/06): Q29 (implante de etonogestrel com cefaleia
    com fotofobia), Q32 (endometriose primária × dismenorreia), Q40, Q74
    (suspender AAS 5-7 dias em prevenção secundária, contra as diretrizes
    atuais), Q88 (fístula em Crohn: LIFT × sedenho), Q94, Q98 (justificativa
    de notificar esterilização), Q112 (conduta para contatos de 12 e 16 anos).
  - Simulado 3 (6º ano, 03/2025): Q14 (a resposta "violência sexual" vem de sinais
    comportamentais, as outras hipóteses também cabem), Q63 (cabeçalho aponta B e
    o comentário descreve a histerectomia), Q70 (gabarito D; B também vale pelo
    tempo de puerpério), Q84 (gabarito sem comentário), Q98 (tratamento de
    colite por C. difficile hoje é vancomicina ou fidaxomicina), Q109 (gabarito
    sem comentário; CPRE também seria defensável), Q112 (drenagem endoscópica
    também é opção inicial), Q116 (a D também descreve conduta possível).
  - Simulado 4: Q4 (cabeçalho do PDF diz B, comentário aponta C), Q44, Q59
    (comentário fala de apendagite, mas o enunciado indica colecistite), Q106
    (cabeçalho diz C, comentário descreve a alternativa B), Q113.
