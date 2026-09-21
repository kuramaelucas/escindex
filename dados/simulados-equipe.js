/* ==========================================================================
   SIMULADOS DA EQUIPE — provas montadas por professor ou coordenação
   ==========================================================================
   Cada simulado é uma lista de ids de questão com um tempo, podendo ser
   recomendado para um bloco do calendário. Professores montam simulados pela
   própria plataforma (Criar Simulado), e o que nasce lá fica no navegador de
   quem montou — trazer para cá é o que torna o simulado de todo mundo.
   As questões citadas precisam existir nos arquivos de questões desta pasta.

   Este arquivo é CONTEÚDO, não código: ele só entrega dados para a
   plataforma. Quem carrega é a linha <script src="dados/simulados-equipe.js"></script>
   do index.html, que roda antes do código. Ver dados/LEIA-ME.md.
   ========================================================================== */
window.EscDados.registrarSimulados("simulados-equipe", [
  { id:"sim-1", titulo:"Simulado de Revisão — Obstetrícia", questoes:["q-019","q-020","q-021"], duracaoMin:20, recomendadoParaBlocos:["bloco-6"], tipo:"simulado_professor", criadoPor:"u-prof", criadoEm:"2026-09-01" },
]);
