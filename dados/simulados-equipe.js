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
  { id:"sim-epm2026-1", titulo:"Simulado EPM 2026 - 1", questoes:["q-adap24-058","q-adap24-001","q-adap24-002","q-adap24-059","q-adap24-060","q-adap24-003","q-adap24-004","q-adap24-005","q-adap24-006","q-adap24-007","q-adap24-008","q-adap24-009","q-adap24-010","q-adap24-061","q-adap24-011","q-adap24-062","q-adap24-063","q-adap24-012","q-adap24-064","q-adap24-065","q-adap24-066","q-adap24-013","q-adap24-014","q-adap24-015","q-adap24-016","q-adap24-017","q-adap24-018","q-adap24-019","q-adap24-020","q-adap24-021","q-adap24-067","q-adap24-022","q-adap24-023","q-adap24-024","q-adap24-025","q-adap24-068","q-adap24-069","q-adap24-070","q-adap24-026","q-adap24-027","q-adap24-071","q-adap24-028","q-adap24-029","q-adap24-030","q-adap24-031","q-adap24-032","q-adap24-098","q-adap24-033","q-adap24-034","q-adap24-035","q-adap24-036","q-adap24-072","q-adap24-037","q-adap24-038","q-adap24-073","q-adap24-039","q-adap24-040","q-adap24-074","q-adap24-075","q-adap24-041","q-adap24-076","q-adap24-042","q-adap24-043","q-adap24-044","q-adap24-045","q-adap24-077","q-adap24-046","q-adap24-099","q-adap24-078","q-adap24-079","q-adap24-080","q-adap24-081","q-adap24-047","q-adap24-082","q-adap24-083","q-adap24-048","q-adap24-084","q-adap24-085","q-adap24-049","q-adap24-086","q-adap24-087","q-adap24-050","q-adap24-088","q-adap24-089","q-adap24-090","q-adap24-051","q-adap24-052","q-adap24-091","q-adap24-053","q-adap24-092","q-adap24-054","q-adap24-093","q-adap24-094","q-adap24-095","q-adap24-096","q-adap24-055","q-adap24-056","q-adap24-097","q-adap24-057","q-adap24-100"], duracaoMin:240, recomendadoParaBlocos:[], tipo:"simulado_professor", criadoPor:"seed", criadoEm:"2026-10-15" },
]);
