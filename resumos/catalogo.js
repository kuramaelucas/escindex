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
  { id: "diarreia-desidratacao", titulo: "Diarreia aguda e desidratação", area: "Pediatria · Infectologia", assunto: "ass-dda" },
  { id: "infeccoes-congenitas", titulo: "Infecções congênitas e perinatais", area: "Pediatria · Neonatologia", assunto: "ass-neo-infeccoescongenitas" },
  { id: "reanimacao-neonatal", titulo: "Reanimação neonatal", area: "Pediatria · Neonatologia", assunto: "ass-reanimacao" },
  { id: "vias-aereas-superiores", titulo: "Infecções de vias aéreas superiores", area: "Pediatria · Infectologia", assunto: "ass-ivas" },
  { id: "ictericia-neonatal", titulo: "Icterícia neonatal", area: "Pediatria · Neonatologia", assunto: "ass-ictericia" },
  { id: "triagem-neonatal", titulo: "Triagem neonatal", area: "Pediatria · Neonatologia", assunto: "ass-neo-triagemneonatal" },
  { id: "abdome-agudo-rn", titulo: "Abdome agudo e malformações digestivas do recém-nascido", area: "Pediatria · Neonatologia", assunto: "ass-neo-malformacoesdigestivas" },
  { id: "maus-tratos", titulo: "Maus-tratos na infância", area: "Pediatria · Emergências Pediátricas", assunto: "ass-emergped-maustratos" },
  { id: "convulsao-febril", titulo: "Convulsão febril", area: "Pediatria · Emergências Pediátricas", assunto: "ass-convulsaofebril" },
  { id: "prematuridade", titulo: "Prematuridade e distúrbios metabólicos do recém-nascido", area: "Pediatria · Neonatologia", assunto: "ass-neo-prematuridade" },
  { id: "insuficiencia-cardiaca", titulo: "Insuficiência cardíaca do adulto", area: "Clínica Médica · Cardiologia", assunto: "ass-ic" },
];
