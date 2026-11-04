/* ==========================================================================
   REPOSIÇÕES — saúde do trabalhador: NR-7 (monitoramento biológico) e NR-15 (ruído)
   ==========================================================================
   Versão corrigida de uma questão anulada: FAMERP 2026 nº 8, que pedia "o
   provável organofosforado" sem nenhuma alternativa que fosse um organofosforado.
   Aqui a pergunta é pelo indicador biológico previsto na NR-7. A original
   continua anulada e sem gabarito; esta é a REPOSIÇÃO (`reposicaoDe`).
   Conteúdo, não código.
   ========================================================================== */
window.EscDados.registrarQuestoes("reposicoes-saude-trabalhador-1", [
 {
  "id": "q-famerp2026-008-ia",
  "banca": "FAMERP",
  "real": false,
  "ano": 2026,
  "reposicaoDe": "q-famerp2026-008",
  "areaId": "area-mps",
  "especialidadeId": "esp-saudefamilia",
  "assuntoId": "ass-saudetrabalhador",
  "enunciado": "Um trabalhador da área rural, durante o Exame Médico Periódico previsto na NR-7, apresentou sintomas de intoxicação por inseticida organofosforado. Qual é o indicador biológico previsto no Quadro 1 do Anexo I da NR-7 para monitorar a exposição a esse tipo de inseticida?",
  "alternativas": [
   {"id": "A", "texto": "Atividade da acetilcolinesterase eritrocitária ou da butilcolinesterase plasmática."},
   {"id": "B", "texto": "Soma dos ácidos mandélico e fenilglioxílico na urina."},
   {"id": "C", "texto": "Ácido delta-aminolevulínico na urina."},
   {"id": "D", "texto": "Fluoreto urinário."}
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **trabalhador rural**, **Exame Médico Periódico da NR-7**, **sintomas de intoxicação por organofosforado**: a pergunta pede o indicador biológico de exposição. Dados objetivos: o Quadro 1 do Anexo I da NR-7 lista, para os **inseticidas inibidores da colinesterase**, a **atividade da acetilcolinesterase eritrocitária (70% da atividade basal)** ou da **butilcolinesterase no plasma ou soro (60% da atividade basal)**, coletadas **após a jornada de trabalho**; a atividade basal é a pré-ocupacional, estabelecida com o empregado afastado por pelo menos 30 dias da exposição. Os demais indicadores pertencem a outros agentes: a soma dos ácidos mandélico e fenilglioxílico na urina é do estireno e do etilbenzeno (B), o ácido delta-aminolevulínico na urina é do chumbo (C) e o fluoreto urinário é do flúor e fluoretos (D). Mecanismo: os organofosforados fosforilam e inibem a acetilcolinesterase, que deixa de degradar a acetilcolina; esta se acumula nas sinapses, causando a síndrome colinérgica (miose, sialorreia, broncorreia, bradicardia, fasciculações). A queda da atividade enzimática no sangue reflete essa inibição e é o marcador de exposição e efeito. Epidemiologia: os agrotóxicos inibidores da colinesterase estão entre as principais causas de intoxicação exógena ocupacional entre trabalhadores rurais no Brasil. Observação: a original foi anulada porque pedia \"o provável organofosforado\" e nenhuma alternativa nomeava um; esta versão pergunta pelo indicador biológico, que é o que a NR-7 permite responder.",
  "referencias": "Ministério do Trabalho e Emprego. Norma Regulamentadora nº 7 (NR-7), Programa de Controle Médico de Saúde Ocupacional (PCMSO), versão atualizada com alterações até a Portaria MTP nº 567, de 10/03/2022 (gov.br/trabalho-e-emprego; Anexo I, Quadro 1): texto lido em 03/11/2026. Não foi verificado se há versão posterior a 2022. Conferido em 03/11/2026.",
  "dificuldadeManual": "basico",
  "status": "ativa",
  "estatisticas": {"respostas": 0, "acertos": 0, "distribuicaoAlternativas": {}},
  "criadoPor": "seed",
  "criadoEm": "2026-11-03"
 },
 {
  "id": "q-amrigs2021-089-ia",
  "banca": "AMRIGS",
  "real": false,
  "ano": 2021,
  "reposicaoDe": "q-amrigs2021-089",
  "areaId": "area-mps",
  "especialidadeId": "esp-saudefamilia",
  "assuntoId": "ass-saudetrabalhador",
  "enunciado": "Em relação ao ruído ocupacional, segundo o Anexo nº 1 da NR-15 (limites de tolerância para ruído contínuo ou intermitente), assinale a alternativa correta.",
  "alternativas": [
   {"id": "A", "texto": "O limite de tolerância é de 85 dB(A) para a jornada de 8 horas, e a máxima exposição diária permissível cai para 4 horas em 90 dB(A)."},
   {"id": "B", "texto": "O limite de tolerância é de 75 dB(A) para a jornada de 8 horas."},
   {"id": "C", "texto": "A medição deve ser feita no circuito de compensação \"C\" e de resposta rápida (FAST), longe do ouvido do trabalhador."},
   {"id": "D", "texto": "Quando há exposições a níveis diferentes na mesma jornada, considera-se apenas o nível mais alto, sem somar os efeitos combinados."},
   {"id": "E", "texto": "A exposição a níveis acima de 115 dB(A) é permitida por até 7 minutos para quem não está adequadamente protegido."}
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: a pergunta cita o **Anexo nº 1 da NR-15** (ruído contínuo ou intermitente, não o de impacto). Dados objetivos: o quadro do Anexo 1 fixa **85 dB(A) para 8 horas** de exposição diária, **90 dB(A) para 4 horas**, **95 dB(A) para 2 horas**, **100 dB(A) para 1 hora** e **115 dB(A) para 7 minutos**, reduzindo o tempo permitido a cada aumento do nível; a medição é feita em **decibéis com circuito de compensação \"A\" e resposta lenta (SLOW), com as leituras próximas ao ouvido do trabalhador**; quando há dois ou mais períodos de exposição a níveis diferentes, **somam-se as frações C/T** (tempo de exposição sobre o tempo máximo permissível de cada nível), e a exposição está acima do limite se a soma exceder a unidade; e **não é permitida exposição acima de 115 dB(A) a quem não estiver adequadamente protegido**, o que, sem proteção, oferece risco grave e iminente. Mecanismo: o ruído intenso lesa as células ciliadas externas da cóclea de forma cumulativa e irreversível (perda auditiva induzida por ruído), e por isso o tempo tolerável cai com o aumento do nível de pressão sonora. Epidemiologia: a perda auditiva induzida por ruído é uma das doenças ocupacionais mais frequentes no Brasil. B está errada porque o limite para 8 horas é de 85 dB(A), não de 75. C está errada porque o circuito é o \"A\" e a resposta é lenta (SLOW), com leitura próxima ao ouvido. D está errada porque os efeitos de exposições a níveis diferentes são combinados pela soma das frações. E está errada porque 7 minutos é o tempo máximo para 115 dB(A) no quadro, mas a norma proíbe a exposição acima de 115 dB(A) sem proteção adequada; a alternativa mistura os dois dados. Observação: a original tinha três assertivas, entre elas uma sobre notificação compulsória de pneumoconioses e outra sobre exposição intermitente, cuja base eu não consegui ler; esta versão se limita ao que o Anexo 1 da NR-15 diz.",
  "referencias": "Ministério do Trabalho e Emprego. Norma Regulamentadora nº 15 (NR-15), Anexo nº 1, Limites de tolerância para ruído contínuo ou intermitente (gov.br/trabalho-e-emprego, arquivo nr-15-anexo-01.pdf): texto lido em 03/11/2026. Não foi verificado se há versão posterior. Conferido em 03/11/2026.",
  "dificuldadeManual": "basico",
  "status": "ativa",
  "estatisticas": {"respostas": 0, "acertos": 0, "distribuicaoAlternativas": {}},
  "criadoPor": "seed",
  "criadoEm": "2026-11-03"
 }
]);
