/* ==========================================================================
   REPOSIÇÕES — sensibilidade e especificidade (D-dímero na suspeita de TEP)
   ==========================================================================
   Versão corrigida de uma questão anulada: Santa Casa de São Paulo 2023 nº 99,
   que listava cinco exames com afirmações discutíveis. Aqui a pergunta fica
   restrita ao D-dímero, com uma única afirmação correta, a partir da revisão
   sistemática da Cochrane sobre o D-dímero para excluir embolia pulmonar. A
   original continua anulada e sem gabarito; esta é a REPOSIÇÃO (`reposicaoDe`).
   Conteúdo, não código.
   ========================================================================== */
window.EscDados.registrarQuestoes("reposicoes-bioestatistica-1", [
 {
  "id": "q-scmsp2023-099-ia",
  "banca": "Santa Casa de São Paulo (FCMSCSP)",
  "real": false,
  "ano": 2023,
  "reposicaoDe": "q-scmsp2023-099",
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-bioestatistica",
  "enunciado": "Uma mulher de 45 anos chega ao pronto-socorro com dispneia e dor torácica de início recente. A probabilidade clínica pré-teste de embolia pulmonar, calculada por uma regra de predição, é baixa. O médico solicita o D-dímero. Quanto à sensibilidade e à especificidade desse exame na suspeita de embolia pulmonar, assinale a alternativa correta.",
  "alternativas": [
   {"id": "A", "texto": "O D-dímero tem sensibilidade alta e especificidade baixa; um resultado negativo ajuda a excluir embolia pulmonar quando a probabilidade pré-teste é baixa, e um resultado positivo exige exame de imagem."},
   {"id": "B", "texto": "O D-dímero tem sensibilidade e especificidade altas; por isso um resultado positivo confirma o diagnóstico de embolia pulmonar."},
   {"id": "C", "texto": "O D-dímero tem sensibilidade baixa e especificidade alta; por isso serve para confirmar, mas não para excluir, a embolia pulmonar."},
   {"id": "D", "texto": "Em pessoas com mais de 65 anos, o D-dímero tem especificidade ainda maior, porque há menos resultados falso-positivos."},
   {"id": "E", "texto": "Um D-dímero negativo exclui embolia pulmonar mesmo quando a probabilidade pré-teste é alta, dispensando a imagem."}
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **dispneia e dor torácica**, **probabilidade pré-teste baixa** por regra de predição, e a pergunta sobre **sensibilidade e especificidade do D-dímero**. Dados objetivos: na revisão sistemática da Cochrane sobre o D-dímero para excluir embolia pulmonar (4 estudos, 1.585 pacientes), os ensaios do D-dímero tiveram **sensibilidade de 80% a 100%** e **especificidade de 23% a 63%**, com **muitos falso-positivos**, sobretudo **acima de 65 anos**; a conclusão é que o **D-dímero negativo é valioso para excluir a embolia pulmonar em quem tem probabilidade pré-teste baixa**, e que o **resultado positivo precisa ser seguido de exame de imagem**. Mecanismo: o D-dímero é um fragmento de degradação da fibrina, liberado sempre que há coágulo sendo lisado; como também sobe em cirurgia, infecção, câncer, gestação e idade avançada, ele quase nunca falha em quem tem trombo (sensibilidade alta, poucos falso-negativos), mas se eleva em muitas outras situações (especificidade baixa, muitos falso-positivos). Em termos de estatística de testes, a sensibilidade alta torna o resultado negativo muito informativo (alto valor preditivo negativo quando a prevalência é baixa), e a especificidade baixa torna o resultado positivo pouco informativo. Epidemiologia: a embolia pulmonar é uma causa importante de morte hospitalar evitável, e a regra de predição pré-teste define a quem se aplica o D-dímero; quanto maior a probabilidade, menos útil é o teste de exclusão. B e C estão erradas porque invertem ou misturam os perfis: o exame é sensível, mas pouco específico, então não confirma. D está errada porque a especificidade cai com a idade (mais falso-positivos acima de 65 anos). E está errada porque, com probabilidade alta, o paciente segue direto para imagem, e o D-dímero negativo não é usado para excluir. Observação: a original misturava PSA, D-dímero, PCR, percussão e translucência nucal e foi anulada; esta versão trata de um só exame e tem uma só afirmação correta. A afirmação de que a alta probabilidade vai direto à imagem está no resumo em linguagem simples da revisão.",
  "referencias": "Crawford F, Andras A, Welch K, Sheares K, Keeling D, Chappell FM. D-dimer test for excluding the diagnosis of pulmonary embolism. Cochrane Database Syst Rev 2016;(8):CD010864 (resumo e resumo em linguagem simples, texto do PMC6457638): lidos em 03/11/2026. Texto completo com tabelas não lido; revisão de 2016, sem verificação de atualização posterior. Conferido em 03/11/2026.",
  "dificuldadeManual": "basico",
  "status": "ativa",
  "estatisticas": {"respostas": 0, "acertos": 0, "distribuicaoAlternativas": {}},
  "criadoPor": "seed",
  "criadoEm": "2026-11-03"
 }
]);
