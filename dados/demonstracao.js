/* ==========================================================================
   DEMONSTRAÇÃO — contas, comentários e livro de ouro de exemplo
   ==========================================================================
   Tudo o que existe só para a plataforma nascer com algo na tela. Este é o
   arquivo para ESVAZIAR quando a turma real entrar: apague os itens das três
   listas (deixando `[]`) e a plataforma abre limpa, sem perder questão,
   cartão nem calendário.

   ATENÇÃO às contas: login e senha aqui são de demonstração e ficam à vista
   de quem abrir o arquivo. Conta de verdade é a da nuvem (ver nuvem/LEIA-ME.md),
   com senha guardada no servidor.

   As contas de teste foram reduzidas ao mínimo: UMA de administrador (a da
   coordenação que mantém a plataforma) mais professor, residente e aluno,
   que existem só para conferir como cada papel enxerga as telas. As contas
   extras de administrador (coordenação e moderador) e a segunda aluna de
   exemplo saíram. Na tela de entrada, o único acesso rápido oferecido ao
   público é o de ALUNO — os outros três entram por e-mail e senha.

   Este arquivo é CONTEÚDO, não código: ele só entrega dados para a
   plataforma. Quem carrega é a linha <script src="dados/demonstracao.js"></script>
   do index.html, que roda antes do código. Ver dados/LEIA-ME.md.
   ========================================================================== */
window.EscDados.registrarDemonstracao("demonstracao", {
  usuarios: [
    /* A única conta de administrador. É o administrador máster da plataforma —
       troque nome, e-mail e senha por dados reais antes de publicar, ou entre
       pela conta da nuvem, que é a de verdade. */
    { id: "u-admin", nome: "Coordenação do Esc", email: "admin@esc.demo", matricula: "ADM001", senha: "admin123", papel: "admin", nivelAdmin: "master", status: "aprovado", criadoEm: "2026-01-10" },
    { id: "u-prof", nome: "Dr. Ricardo Nakamura", email: "professor@esc.demo", matricula: "PROF001", senha: "prof123", papel: "professor", status: "aprovado", criadoEm: "2026-01-10" },
    { id: "u-res", nome: "Dra. Juliana Prado (R2)", email: "residente@esc.demo", matricula: "RES001", senha: "res123", papel: "residente", status: "aprovado", criadoEm: "2026-01-12" },
    { id: "u-aluno1", nome: "Marcos Vinícius Silva", email: "aluno@esc.demo", matricula: "2026001234", senha: "aluno123", papel: "aluno", status: "aprovado", blocoAtualId: "bloco-6", metaQuestoesDia: 30, criadoEm: "2026-02-01" },
  ],
  livroOuro: [
    { id:"lo-1", nome:"Turma de Medicina 2025", tipo:"doacao", valor:"R$ 1.200", descricao:"Rifa da turma para custear o domínio e a hospedagem do primeiro ano da plataforma.", mensagem:"Que sirva para quem vem depois da gente.", data:"2026-01-15", destaque:true },
    { id:"lo-2", nome:"Dr. Ricardo Nakamura", tipo:"colaboracao", valor:"", descricao:"Revisão clínica das questões de Clínica Médica e Cirurgia e escrita das explicações de gabarito.", mensagem:"", data:"2026-02-02", destaque:true },
    { id:"lo-3", nome:"Dra. Juliana Prado (R2)", tipo:"colaboracao", valor:"", descricao:"Plantão voluntário na fila de dúvidas dos alunos, com resposta em até 24 horas.", mensagem:"", data:"2026-03-10", destaque:false },
    { id:"lo-4", nome:"Livraria Acadêmica (apoio local)", tipo:"apoio", valor:"", descricao:"Impressão gratuita dos cadernos de questões usados nos simulados presenciais.", mensagem:"", data:"2026-04-20", destaque:false },
  ],
  comentarios: [
    { id:"com-1", questaoId:"q-001", usuarioId:"u-aluno1", papelAutor:"aluno", texto:"Fiquei em dúvida: não seria necessário confirmar com troponina antes de indicar a reperfusão? Ou isso só vale para angina instável?", data:"2026-09-10", respostaOficial:false },
    { id:"com-2", questaoId:"q-001", usuarioId:"u-res", papelAutor:"residente", texto:"Boa pergunta! A troponina confirma necrose miocárdica, mas no IAMCSST o ECG já basta para indicar reperfusão de urgência — esperar o resultado só atrasaria o tratamento. Ela é mais usada quando o ECG não é tão claro, por exemplo infra de ST ou ECG normal com dor torácica.", data:"2026-09-10", respostaOficial:true },
    { id:"com-3", questaoId:"q-011", usuarioId:"u-aluno1", papelAutor:"aluno", texto:"Essa foi difícil! Fiquei confuso sobre quando o pT1 precisa de cirurgia complementar.", data:"2026-09-08", respostaOficial:false },
    { id:"com-4", questaoId:"q-011", usuarioId:"u-prof", papelAutor:"professor", texto:"É um ponto que realmente confunde. Regra prática: havendo invasão angiolinfática, margem comprometida ou tumor pouco diferenciado, aí sim indica colectomia complementar com linfadenectomia. Sem esses fatores, a polipectomia já resolve.", data:"2026-09-09", respostaOficial:true },
    { id:"com-5", questaoId:"q-021", usuarioId:"u-aluno1", papelAutor:"aluno", texto:"Não entendi por que ainda não dá pra fechar gestação ectópica com esse valor de beta-hCG.", data:"2026-09-14", respostaOficial:false },
  ],
});
