/* ==========================================================================
   DEMONSTRAÇÃO — contas, comentários e livro de ouro de exemplo
   ==========================================================================
   Vazio de propósito: a plataforma abre limpa, sem conta, comentário nem
   livro de ouro de exemplo. Conta de verdade é a da nuvem (nuvem/LEIA-ME.md),
   com a senha guardada no servidor; a primeira conta administradora se faz
   pela própria nuvem.

   As contas e os exemplos antigos (admin, professor, residente e aluno
   @esc.demo) moram agora em testes/fixtures/demonstracao.js, que o servidor
   dos testes entrega no lugar deste arquivo — é o que mantém os testes de
   ponta a ponta funcionando sem deixar senha à vista no site.

   Este arquivo é CONTEÚDO, não código: quem carrega é a linha
   <script src="dados/demonstracao.js"></script> do index.html.
   Ver dados/LEIA-ME.md.
   ========================================================================== */
window.EscDados.registrarDemonstracao("demonstracao", { usuarios: [], livroOuro: [], comentarios: [] });
