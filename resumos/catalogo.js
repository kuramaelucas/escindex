/* resumos/catalogo.js — a lista dos resumos adaptativos (resumos/LEIA-ME.md).
   A plataforma lê este arquivo só quando o aluno abre Estudar › Resumos (Beta), e
   cada resumo só quando ele é aberto: nada disso pesa na abertura do site.
   Resumo novo: acrescente uma linha aqui (id = nome da pasta). */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).catalogo = [
  { id: "exantematicas", titulo: "Doenças exantemáticas na infância", area: "Pediatria · Infectologia", assunto: "ass-exantematicas" },
  { id: "puericultura", titulo: "Puericultura", area: "Pediatria · Crescimento e Desenvolvimento", assunto: "ass-puericultura" },
  { id: "calendario-vacinal", titulo: "Calendário vacinal", area: "Pediatria · Crescimento e Desenvolvimento", assunto: "ass-calendariovacinal" },
  { id: "pneumonia-bronquiolite", titulo: "Bronquiolite, pneumonia e coqueluche na criança", area: "Pediatria · Infectologia", assunto: "ass-infectoped-pneumonia" },
  { id: "crescimento-puberdade", titulo: "Crescimento e puberdade", area: "Pediatria · Crescimento e Desenvolvimento", assunto: "ass-crescimentopuberdade" },
  { id: "emergencias-respiratorias-pcr", titulo: "Emergências pediátricas: insuficiência respiratória e parada", area: "Pediatria · Emergências Pediátricas", assunto: "ass-emergped-respiratoria" },
  { id: "insuficiencia-cardiaca", titulo: "Insuficiência cardíaca do adulto", area: "Clínica Médica · Cardiologia", assunto: "ass-ic" },
];
