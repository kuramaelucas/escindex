/* Esc — codigo/04-utilitarios.js  (parte 4 de 13)
   Utilidades gerais: datas, paginação, gráficos SVG, janelas, avisos, sequência de blocos e rodízio, permissões de administrador.
   Os arquivos de codigo/ são carregados em ordem pelo index.html (lista
   ESC_ARQUIVOS.codigo) e dividem o mesmo espaço: uma função escrita num
   arquivo é usada nos outros sem import. */

/* ==========================================================================
   3. UTILITÁRIOS GERAIS
   ========================================================================== */
function uid(prefixo){ return prefixo+"-"+Date.now().toString(36)+Math.random().toString(36).slice(2,7); }

function escapeHtml(str){
  if(str===undefined || str===null) return "";
  return String(str).replace(/[&<>"']/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
  });
}

function iconeSvg(nome, cls){ return '<svg class="icon '+(cls||'')+'"><use href="#i-'+nome+'"></use></svg>'; }

/* ---------- paginação de listas longas -------------------------------------
   Toda tela que lista conteúdo (banco de questões, usuários, favoritos,
   histórico, controle de qualidade, flashcards) desenhava a lista inteira de
   uma vez. Com 135 questões isso não incomoda; com as provas reais carregadas
   (milhares de questões) a tela demoraria a abrir e ninguém rolaria até o fim
   mesmo. Aqui a lista é cortada em páginas.

   Como usar numa tela:
     const p = paginar(lista, "banco", {assinatura: JSON.stringify(filtros)});
     ... desenhe p.itens ...
     ${controlesPaginacao(p, "questão(ões)")}

   A "assinatura" é o que faz a página voltar para a 1 sozinha quando os
   filtros mudam — sem isso, filtrar estando na página 7 mostraria uma lista
   vazia e pareceria um erro. */
const ITENS_POR_PAGINA = 25;
function estadoPaginas(){
  if(!state.filtroRota.paginas) state.filtroRota.paginas = {};
  return state.filtroRota.paginas;
}
function paginar(lista, chave, opts){
  opts = opts || {};
  const tamanho = opts.porPagina || ITENS_POR_PAGINA;
  const assinatura = opts.assinatura!==undefined ? String(opts.assinatura) : String(lista.length);
  const guardado = estadoPaginas()[chave];
  let pagina = (guardado && guardado.assinatura===assinatura) ? guardado.pagina : 1;
  const paginas = Math.max(1, Math.ceil(lista.length/tamanho));
  if(pagina > paginas) pagina = paginas;
  if(pagina < 1) pagina = 1;
  estadoPaginas()[chave] = {pagina, assinatura};
  const inicio = (pagina-1)*tamanho;
  return {
    chave, pagina, paginas, tamanho,
    total: lista.length,
    primeiro: lista.length ? inicio+1 : 0,
    ultimo: Math.min(inicio+tamanho, lista.length),
    itens: lista.slice(inicio, inicio+tamanho),
  };
}
function irParaPagina(chave, numero){
  const guardado = estadoPaginas()[chave];
  if(!guardado) return;
  guardado.pagina = numero;
  render();
  window.scrollTo(0,0);
}
/* Uma página só não precisa de controle nenhum: a barra some sozinha. */
function controlesPaginacao(p, rotulo){
  if(p.paginas<=1) return p.total ? `<div class="paginacao-resumo">${p.total} ${rotulo||"item(ns)"}</div>` : "";
  return `<div class="paginacao">
    <div class="paginacao-resumo">Mostrando ${p.primeiro}–${p.ultimo} de ${p.total} ${rotulo||"item(ns)"}</div>
    <div class="flex gap-1 items-center">
      <button class="btn btn-secondary btn-sm" onclick="irParaPagina('${p.chave}',${p.pagina-1})" ${p.pagina<=1?"disabled":""}>Anterior</button>
      <span class="text-sm nowrap">Página ${p.pagina} de ${p.paginas}</span>
      <button class="btn btn-secondary btn-sm" onclick="irParaPagina('${p.chave}',${p.pagina+1})" ${p.pagina>=p.paginas?"disabled":""}>Próxima</button>
    </div>
  </div>`;
}

/* A data "AAAA-MM-DD" do DIA DE QUEM ESTÁ USANDO, no relógio local.
   toISOString() dá a data em UTC — no Brasil (UTC−3), a partir das 21h ela
   já é a de amanhã: a meta do dia zerava às nove da noite, a sequência de
   dias pulava e a "sessão do dia" virava antes da meia-noite. Toda data de
   calendário da plataforma passa por aqui. */
function dataLocalISO(d){
  const p = n => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth()+1) + "-" + p(d.getDate());
}
function hojeISO(){ return dataLocalISO(CONFIG.hoje()); }

function formatDataBR(iso){
  if(!iso) return "—";
  const [a,m,d] = iso.slice(0,10).split("-");
  return d+"/"+m+"/"+a;
}

function diasEntre(isoInicio, isoFim){
  const d1 = new Date(isoInicio+"T00:00:00");
  const d2 = new Date(isoFim+"T00:00:00");
  return Math.round((d2-d1)/86400000);
}

function somarDias(iso, dias){
  const d = new Date(iso+"T00:00:00");
  d.setDate(d.getDate()+dias);
  return dataLocalISO(d);
}

function formatarDuracao(segundos){
  segundos = Math.max(0, Math.round(segundos||0));
  const h = Math.floor(segundos/3600), m = Math.floor((segundos%3600)/60), seg = segundos%60;
  const dois = (n)=>String(n).padStart(2,"0");
  return h ? h+":"+dois(m)+":"+dois(seg) : m+":"+dois(seg);
}
function pct(numerador, denominador){
  if(!denominador) return 0;
  return Math.round((numerador/denominador)*100);
}

function toast(msg, tipo){
  const cont = document.getElementById("toastContainer");
  const el = document.createElement("div");
  el.className = "toast"+(tipo==="err" ? " err" : "");
  el.textContent = msg;
  cont.appendChild(el);
  setTimeout(()=>{ el.style.opacity="0"; el.style.transition="opacity .25s"; setTimeout(()=>el.remove(),260); }, 3200);
}

function abrirModal(innerHtml, tamanho){
  fecharModal();
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "modalOverlayAtivo";
  overlay.onclick = function(e){ if(e.target===overlay) fecharModal(); };
  overlay.innerHTML = '<div class="modal '+(tamanho==="lg"?"modal-lg":"")+'">'+innerHtml+'</div>';
  document.body.appendChild(overlay);
}
function fecharModal(){
  const el = document.getElementById("modalOverlayAtivo");
  if(el) el.remove();
}

/* Janela com cabeçalho padrão. Existe porque abrirModal recebe o HTML
   inteiro num argumento só: quem chamava abrirModal("Título", corpo) via a
   janela abrir com o título e NADA do corpo — o segundo argumento ia para o
   lugar do tamanho e o corpo era descartado. Era o que acontecia ao sair da
   conta com fila pendente (a janela aparecia sem os botões "Sincronizar e
   sair" / "Sair mesmo assim") e ao trazer para a conta o estudo guardado
   neste navegador. */
function abrirModalTitulado(titulo, corpoHtml, tamanho){
  abrirModal(
    '<div class="modal-header"><h3>' + escapeHtml(titulo) + '</h3>' +
    '<button class="icon-btn" onclick="fecharModal()">' + iconeSvg("x") + '</button></div>' +
    (corpoHtml || ""), tamanho);
}

function copiarTexto(texto, mensagem){
  const fazer = () => toast(mensagem || "Copiado para a área de transferência.");
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(texto).then(fazer).catch(()=>{
      window.prompt("Copie o texto abaixo (Ctrl+C):", texto);
    });
  }else{
    window.prompt("Copie o texto abaixo (Ctrl+C):", texto);
  }
}

// pequeno gráfico de linha (sparkline) em SVG puro, sem bibliotecas externas
function sparklineSvg(valores, opts){
  opts = opts || {};
  const w = opts.width || 220, h = opts.height || 56, pad = 6;
  if(!valores || valores.length < 2){
    return '<div class="text-xs muted">Ainda não há histórico suficiente para exibir a evolução.</div>';
  }
  const min = 0, max = 100;
  const stepX = (w-2*pad)/(valores.length-1);
  const pontos = valores.map((v,i)=>{
    const x = pad + i*stepX;
    const y = h-pad - ((v-min)/(max-min))*(h-2*pad);
    return x.toFixed(1)+","+y.toFixed(1);
  }).join(" ");
  const corLinha = (valores[valores.length-1] >= valores[0]) ? "var(--accent)" : "var(--danger)";
  return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="'+h+'" preserveAspectRatio="none">'+
    '<polyline points="'+pontos+'" fill="none" stroke="'+corLinha+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'+
    '</svg>';
}

// gráfico de barras horizontal (SVG puro) — usado para comparar taxas de
// acerto entre categorias, por exemplo as 5 grandes áreas
function graficoBarrasSvg(itens){
  // itens: [{label, valor (0-100 ou null se sem dados), n}]
  const w = 640, alturaBarra = 26, gap = 12, padEsq = 230, padDir = 90;
  const larguraUtil = w - padEsq - padDir;
  const h = itens.length*(alturaBarra+gap) + gap;
  const barras = itens.map((it,i)=>{
    const y = gap + i*(alturaBarra+gap);
    const valor = it.valor==null ? 0 : it.valor;
    const largura = Math.max(2, (valor/100)*larguraUtil);
    const cor = it.valor==null ? "var(--border-strong)" : (valor<50 ? "var(--danger)" : valor<70 ? "var(--amber)" : "var(--accent)");
    const rotulo = it.valor==null ? "sem dados" : it.valor+"% ("+it.n+")";
    return '<text x="'+(padEsq-12)+'" y="'+(y+alturaBarra/2+4)+'" text-anchor="end" font-size="13" fill="var(--ink-2)">'+escapeHtml(it.label)+'</text>'+
      '<rect x="'+padEsq+'" y="'+y+'" width="'+larguraUtil+'" height="'+alturaBarra+'" rx="5" fill="var(--surface-2)"/>'+
      '<rect x="'+padEsq+'" y="'+y+'" width="'+largura+'" height="'+alturaBarra+'" rx="5" fill="'+cor+'"/>'+
      '<text x="'+(padEsq+larguraUtil+10)+'" y="'+(y+alturaBarra/2+4)+'" font-size="12" fill="var(--ink-2)">'+rotulo+'</text>';
  }).join("");
  return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="'+h+'">'+barras+'</svg>';
}

/* Gráfico de barras VERTICAIS empilhadas (SVG puro).
   Cada barra representa 100% das questões respondidas naquele período ou
   categoria. A parte de baixo, em verde claro, é a fatia de ACERTOS; o que
   sobra em cima, em cinza claro, são os ERROS. Assim 65% de acerto aparece
   como 65% da barra em verde e 35% em cinza, e a leitura é imediata: barra
   mais verde é dia melhor, sem precisar decorar escala.

   itens: [{label, taxa (0-100 ou null), total, acertos}]
   opts:  {altura, larguraMax, rotuloRotacionado} */
function graficoBarrasVerticaisSvg(itens, opts){
  opts = opts || {};
  if(!itens || !itens.length) return '<div class="text-xs muted">Sem dados no período.</div>';
  const comDados = itens.filter(i=>i.taxa!==null && i.total>0);
  if(!comDados.length) return '<div class="text-xs muted">Você ainda não respondeu questões neste período.</div>';

  const alturaPlot = opts.altura || 170;
  const padTopo = 22, padBaixo = opts.rotuloRotacionado ? 52 : 30, padEsq = 34, padDir = 8;
  // barras finas quando há muitos dias, largas quando são poucas categorias
  const larguraBarra = Math.min(opts.larguraMax || 46, Math.max(8, 620/itens.length - 6));
  const gap = Math.max(3, larguraBarra*0.28);
  const larguraUtil = itens.length*(larguraBarra+gap) + gap;
  const w = padEsq + larguraUtil + padDir;
  const h = alturaPlot + padTopo + padBaixo;
  // mostra o número dentro/acima da barra só quando cabe sem embolar
  const mostrarPct = larguraBarra >= 22;

  const grade = [0,25,50,75,100].map(v=>{
    const y = padTopo + alturaPlot - (v/100)*alturaPlot;
    return '<line x1="'+padEsq+'" y1="'+y+'" x2="'+(w-padDir)+'" y2="'+y+'" stroke="var(--border)" stroke-width="1"'+(v===0?'':' stroke-dasharray="2 3"')+'/>'+
      '<text x="'+(padEsq-7)+'" y="'+(y+3.5)+'" text-anchor="end" font-size="9.5" fill="var(--muted)">'+v+'</text>';
  }).join("");

  const barras = itens.map((it,i)=>{
    const x = padEsq + gap + i*(larguraBarra+gap);
    const semDados = it.taxa===null || !it.total;
    const rotulo = '<text x="'+(x+larguraBarra/2)+'" y="'+(padTopo+alturaPlot+(opts.rotuloRotacionado?14:15))+'" text-anchor="'+(opts.rotuloRotacionado?"end":"middle")+'" font-size="10" fill="var(--muted)"'+
      (opts.rotuloRotacionado?' transform="rotate(-40 '+(x+larguraBarra/2)+' '+(padTopo+alturaPlot+14)+')"':'')+'>'+escapeHtml(it.label)+'</text>';
    if(semDados){
      // dia/mês sem estudo: risco sutil na linha de base, não uma barra vazia
      return '<line x1="'+x+'" y1="'+(padTopo+alturaPlot)+'" x2="'+(x+larguraBarra)+'" y2="'+(padTopo+alturaPlot)+'" stroke="var(--border-strong)" stroke-width="2"/>'+rotulo;
    }
    const alturaAcerto = (it.taxa/100)*alturaPlot;
    const alturaErro = alturaPlot - alturaAcerto;
    const yAcerto = padTopo + alturaPlot - alturaAcerto;
    const titulo = escapeHtml(it.label)+": "+it.taxa+"% de acerto ("+it.acertos+" de "+it.total+")";
    // em 0% de acerto a barra fica inteiramente cinza: nenhum resquício de
    // verde, senão o gráfico sugere um acerto que não houve
    const verde = it.taxa>0 ? Math.max(2, alturaAcerto) : 0;
    return '<g><title>'+titulo+'</title>'+
      '<rect x="'+x+'" y="'+padTopo+'" width="'+larguraBarra+'" height="'+Math.max(0,alturaErro)+'" fill="var(--barra-erro)" rx="3"/>'+
      (verde ? '<rect x="'+x+'" y="'+yAcerto+'" width="'+larguraBarra+'" height="'+verde+'" fill="var(--barra-acerto)" rx="3"/>' : "")+
      (mostrarPct ? '<text x="'+(x+larguraBarra/2)+'" y="'+(padTopo-6)+'" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--ink-2)">'+it.taxa+'%</text>' : "")+
      '</g>'+rotulo;
  }).join("");

  // sem altura fixa: o viewBox governa a proporção, para o gráfico encolher
  // junto com a tela em vez de deixar um vão embaixo no celular. Mas ele
  // ENCOLHE e não CRESCE além de ~15% do tamanho desenhado: com width 100%
  // e nada mais, num monitor largo o gráfico das 5 áreas esticava até quase
  // 600 px de altura, com letras de título. O teto é max-width.
  return '<div style="overflow-x:auto"><svg class="grafico-barras" viewBox="0 0 '+w+' '+h+'" width="100%" style="height:auto;display:block;max-width:'+Math.round(w*(opts.escalaMax||1.15))+'px;min-width:'+Math.min(w,300)+'px">'+grade+barras+'</svg></div>'+
    '<div class="legenda-barras">'+
      '<span><i style="background:var(--barra-acerto)"></i>acertos</span>'+
      '<span><i style="background:var(--barra-erro)"></i>erros</span>'+
      (mostrarPct?'':'<span class="muted">passe o dedo ou o mouse numa barra para ver o número</span>')+
    '</div>';
}

// evolução da taxa de acerto ao longo do tempo, agrupada por semana
function progressaoAoLongoDoTempo(usuarioId){
  const respostas = db.respostas.filter(r=>r.usuarioId===usuarioId).sort((a,b)=>a.data.localeCompare(b.data));
  if(!respostas.length) return [];
  const porSemana = {};
  respostas.forEach(r=>{
    const d = new Date(r.data+"T00:00:00");
    const diaSemana = d.getDay();
    const offsetSegunda = diaSemana===0 ? -6 : 1-diaSemana;
    const inicio = new Date(d); inicio.setDate(d.getDate()+offsetSegunda);
    const chave = dataLocalISO(inicio);
    if(!porSemana[chave]) porSemana[chave] = {total:0, acertos:0};
    porSemana[chave].total++;
    if(r.correta) porSemana[chave].acertos++;
  });
  return Object.keys(porSemana).sort().map(s=>({semana:s, taxa:pct(porSemana[s].acertos,porSemana[s].total), n:porSemana[s].total}));
}
function graficoLinhaComEixoSvg(pontos){
  if(pontos.length<2) return '<div class="text-xs muted">Ainda não há histórico suficiente — responda questões em pelo menos duas semanas diferentes para ver a evolução.</div>';
  const w=640, h=180, padEsq=42, padDir=20, padTopo=16, padBaixo=28;
  const larguraUtil=w-padEsq-padDir, alturaUtil=h-padTopo-padBaixo;
  const passo = larguraUtil/(pontos.length-1);
  const coords = pontos.map((p,i)=>({x:padEsq+i*passo, y:padTopo+alturaUtil-(p.taxa/100)*alturaUtil}));
  const linha = coords.map(c=>c.x.toFixed(1)+","+c.y.toFixed(1)).join(" ");
  const pontosSvg = coords.map(c=>'<circle cx="'+c.x+'" cy="'+c.y+'" r="3.5" fill="var(--accent)"/>').join("");
  const grade = [0,50,100].map(v=>{
    const y = padTopo+alturaUtil-(v/100)*alturaUtil;
    return '<line x1="'+padEsq+'" y1="'+y+'" x2="'+(w-padDir)+'" y2="'+y+'" stroke="var(--border)" stroke-width="1"/><text x="'+(padEsq-8)+'" y="'+(y+4)+'" text-anchor="end" font-size="10" fill="var(--muted)">'+v+'%</text>';
  }).join("");
  return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="'+h+'">'+grade+
    '<polyline points="'+linha+'" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'+pontosSvg+
    '<text x="'+padEsq+'" y="'+(h-6)+'" font-size="10" fill="var(--muted)">'+formatDataBR(pontos[0].semana)+'</text>'+
    '<text x="'+(w-padDir)+'" y="'+(h-6)+'" text-anchor="end" font-size="10" fill="var(--muted)">'+formatDataBR(pontos[pontos.length-1].semana)+'</text>'+
    '</svg>';
}

// histograma simples (curva de notas) — usado no ranking anônimo de simulados
function graficoHistogramaSvg(buckets, bucketAtual, labels){
  const w=480, h=170, padBaixo=28, padTopo=22, gap=14;
  const maxV = Math.max(1, ...buckets);
  const larguraBarra = (w - gap*(buckets.length+1))/buckets.length;
  const barras = buckets.map((v,i)=>{
    const altura = (v/maxV)*(h-padBaixo-padTopo);
    const x = gap + i*(larguraBarra+gap);
    const y = h-padBaixo-altura;
    const cor = i===bucketAtual ? "var(--accent)" : "var(--border-strong)";
    return (i===bucketAtual ? '<text x="'+(x+larguraBarra/2)+'" y="14" text-anchor="middle" font-size="11" font-weight="700" fill="var(--accent-dark)">você</text>' : "") +
      '<rect x="'+x+'" y="'+y+'" width="'+larguraBarra+'" height="'+Math.max(2,altura)+'" rx="4" fill="'+cor+'"/>'+
      (v>0 ? '<text x="'+(x+larguraBarra/2)+'" y="'+(y-6)+'" text-anchor="middle" font-size="11" fill="var(--ink-2)">'+v+'</text>' : "")+
      '<text x="'+(x+larguraBarra/2)+'" y="'+(h-padBaixo+16)+'" text-anchor="middle" font-size="11" fill="var(--ink-2)">'+labels[i]+'</text>';
  }).join("");
  return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="'+h+'">'+barras+'</svg>';
}
// ranking anônimo: compara a nota do usuário com todas as tentativas já
// registradas do MESMO simulado (por id, ou por título quando é uma "prova
// antiga" avulsa), sem expor quem são as outras pessoas — só a posição.
function estatisticasRankingSimulado(chave, notaAtual){
  const todos = db.resultadosSimulados.filter(r => (r.simuladoId || r.titulo) === chave);
  const notas = todos.map(r=>r.nota).sort((a,b)=>a-b);
  const n = notas.length;
  if(n < 3) return null; // amostra pequena demais pra um percentil fazer sentido
  const abaixoOuIgual = notas.filter(x=>x<=notaAtual).length;
  const percentil = Math.round((abaixoOuIgual/n)*100);
  const mediana = n%2===0 ? (notas[n/2-1]+notas[n/2])/2 : notas[Math.floor(n/2)];
  const buckets = [0,0,0,0,0];
  notas.forEach(nt=>{ buckets[Math.min(4, Math.floor(nt/20))]++; });
  const bucketAtual = Math.min(4, Math.floor(notaAtual/20));
  return {n, percentil, mediana, buckets, bucketAtual};
}

/* ---------------------------- consultas rápidas --------------------------- */
function getUsuario(id){ return db.usuarios.find(u=>u.id===id); }
function getArea(id){ return db.taxonomia.areas.find(a=>a.id===id); }
function getEspecialidade(id){ return db.taxonomia.especialidades.find(e=>e.id===id); }
function getAssunto(id){ return db.taxonomia.assuntos.find(a=>a.id===id); }
function getQuestao(id){ return db.questoes.find(q=>q.id===id); }
function getGrupo(id){ return db.grupos.find(g=>g.id===id); }
function getGrupoOficial(){ return getGrupo(db.grupoOficialId); }
// cada aluno pertence a um grupo/turma (calendário de blocos próprio ou
// compartilhado); quem não tiver grupoId definido usa o calendário oficial
function getGrupoDoUsuario(usuario){
  if(usuario && usuario.grupoId){
    const g = getGrupo(usuario.grupoId) || recriarTurmaDoRodizio(usuario.grupoId);
    if(g) return g;
  }
  return getGrupoOficial();
}
/* TURMAS DO RODÍZIO. Uma por ano e por letra ("4º ano — Grupo C"), abertas:
   entra quem quiser, sem pedir a ninguém — ao contrário das turmas criadas
   por alunos, que têm dono e aprovação. É o que a tela de primeiro acesso
   oferece, porque quem acabou de chegar sabe a própria letra, mas não sabe
   se algum colega já criou a turma dela neste navegador.

   O id diz o ano e o grupo (rodizio-<índice do ano>-<deslocamento>). As
   turmas ainda não sobem para a nuvem, mas o grupo_id da pessoa sobe: em
   outro aparelho, a turma que falta é recriada a partir do id, e a pessoa
   continua no mesmo grupo. */
function idTurmaDoRodizio(ano, deslocamento){
  return "rodizio-" + CONFIG.anosFaculdade.indexOf(ano) + "-" + (parseInt(deslocamento)||0);
}
function turmaDoRodizio(ano, deslocamento){
  const id = idTurmaDoRodizio(ano, deslocamento);
  return getGrupo(id) || recriarTurmaDoRodizio(id);
}
function recriarTurmaDoRodizio(id){
  const m = /^rodizio-(\d+)-(\d+)$/.exec(id || "");
  if(!m) return null;
  const ano = CONFIG.anosFaculdade[parseInt(m[1])];
  const deslocamento = parseInt(m[2]);
  if(!ano || !temCalendarioProprio(ano) || deslocamento >= sequenciaDoAno(ano).length) return null;
  const turma = { id, nome: ano + " — " + nomeRodizio(ano, deslocamento), criadoPor:null, oficial:false, doRodizio:true,
                  publico:true, criadoEm:hojeISO(), anoFaculdade:ano, deslocamento,
                  blocoAtualIdManual:null, membrosAprovados:[], solicitacoesPendentes:[] };
  if(!db.grupos) db.grupos = [];
  db.grupos.push(turma);
  return turma;
}
/* ---------- sequência de blocos do ano + rodízio das turmas ----------------
   A sequência pertence ao ANO DA FACULDADE; o grupo escolhe só onde começa.
   blocosDoGrupo() devolve a lista já girada, no mesmo formato de antes
   ({id, ordem, nome, dataInicio, dataFim, especialidadeIds}), então todo o
   resto da plataforma continua funcionando sem saber do rodízio. */
function anoDoGrupo(grupo, usuario){
  // o calendário oficial serve a todos os anos: nele, o ano é o de quem olha
  if(grupo && grupo.anoFaculdade) return grupo.anoFaculdade;
  usuario = usuario || usuarioAtual();
  return (usuario && usuario.anoFaculdade) || CONFIG.anoFaculdadePadrao;
}
/* Anos sem calendário próprio (hoje só "Formado(a)"): quem está neles não
   tem sequência de blocos para chamar de sua, então empresta a do ano de
   referência. Isso é o que permite a uma pessoa já formada participar de um
   grupo normalmente — ela acompanha o calendário do ano da turma — sem que a
   coordenação precise manter um calendário de formados que ninguém cursa. */
function temCalendarioProprio(ano){
  return !!ano && !(CONFIG.anosSemCalendario||[]).includes(ano);
}
function anosComCalendario(){
  return CONFIG.anosFaculdade.filter(temCalendarioProprio);
}
function anoDeReferencia(ano){
  return temCalendarioProprio(ano) ? ano : CONFIG.anoFaculdadePadrao;
}
function sequenciaDoAno(ano){
  const seqs = db.sequenciasAno || {};
  const alvo = anoDeReferencia(ano);
  const lista = seqs[alvo] || seqs[CONFIG.anoFaculdadePadrao] || Object.values(seqs)[0] || [];
  return lista.slice().sort((a,b)=>a.ordem-b.ordem);
}
/* ---------- as turmas do rodízio: "Grupo A", "Grupo B"… -------------------
   Uma turma é identificada pelo bloco em que entra na sequência — é o
   `deslocamento`. Pedir esse número à pessoa seria pedir que ela traduzisse
   o calendário impresso da faculdade; ela sabe é que está "no grupo B".

   A ponte entre as duas coisas fica no próprio bloco: `grupoRodizio` na
   posição i da sequência é a letra da turma que COMEÇA ali, ou seja, a turma
   de deslocamento i. No 3º ano a ordem das letras não é alfabética
   (A, D, C, B) porque o calendário real da faculdade é assim — por isso a
   letra é um dado editável, e não uma conta feita a partir do índice. Onde a
   coordenação não tiver preenchido nada, vale a ordem alfabética. */
function letraPadraoRodizio(i){ return String.fromCharCode(65 + (((i%26)+26)%26)); }
function normalizarDeslocamento(deslocamento, tamanho){
  const n = tamanho || 1;
  return (((deslocamento||0) % n) + n) % n;
}

/* ---------- quando o rodízio NÃO é um ciclo ------------------------------
   O 3º ano gira em ciclo: quem entra no segundo bloco segue para o terceiro,
   o quarto, e volta ao primeiro. O 5º ano não — o quadro da faculdade
   emparelha os estágios dois a dois (quem faz Clínica Cirúrgica 1 na
   primeira janela faz a 2 na segunda, e vice-versa) e troca as duas metades
   do ano no meio do caminho. Nenhuma conta a partir do índice reproduz isso.

   Então um bloco pode trazer a LINHA do quadro impresso em `turmasPorJanela`:
   a turma que está NELE em cada janela de data, na ordem das janelas. Onde
   essa linha existe, ela manda; onde não existe, vale o ciclo de sempre.
   As duas formas convivem no mesmo formato de sequência, e nenhuma tela
   precisa saber qual delas o ano usa — todas passam por aqui. */
function turmaDoBlocoNaJanela(bloco, i){
  const linha = bloco && bloco.turmasPorJanela;
  if(!Array.isArray(linha) || !linha[i]) return null;
  return String(linha[i]).trim().toUpperCase();
}
/* O conteúdo que a turma `rotulo` cursa na janela `i`. */
function conteudoDaJanela(seq, rotulo, deslocamento, i){
  const n = seq.length;
  if(!n) return null;
  const doQuadro = seq.find(b => turmaDoBlocoNaJanela(b, i) === rotulo);
  return doQuadro || seq[(i + normalizarDeslocamento(deslocamento, n)) % n];
}
// as turmas possíveis daquele ano, na ordem em que entram na sequência
function opcoesRodizio(ano){
  const seq = sequenciaDoAno(ano);
  return seq.map((b,i)=>{
    const rotulo = b.grupoRodizio || letraPadraoRodizio(i);
    return {
      deslocamento: i,
      rotulo,
      // por qual estágio essa turma começa o ano — pelo quadro, quando ele
      // existe, e não pela posição na lista
      bloco: conteudoDaJanela(seq, rotulo, i, 0) || b,
    };
  });
}
/* As mesmas opções em ordem alfabética de letra — que é como o calendário
   impresso lista as turmas (A, B, C, D) e como a pessoa procura a sua. A
   ordem de deslocamento (a da sequência) continua valendo onde o que importa
   é o calendário, não a turma. */
function opcoesRodizioPorLetra(ano){
  return opcoesRodizio(ano).slice().sort((a,b)=>a.rotulo.localeCompare(b.rotulo, "pt-BR"));
}
function rotuloRodizio(ano, deslocamento){
  const opcoes = opcoesRodizio(ano);
  if(!opcoes.length) return letraPadraoRodizio(deslocamento||0);
  return opcoes[normalizarDeslocamento(deslocamento, opcoes.length)].rotulo;
}
// "Grupo A" por extenso — usado nos textos de tela
function nomeRodizio(ano, deslocamento){ return "Grupo " + rotuloRodizio(ano, deslocamento); }
function deslocamentoDoRotulo(ano, rotulo){
  const achado = opcoesRodizio(ano).find(o => o.rotulo === rotulo);
  return achado ? achado.deslocamento : 0;
}
// o rótulo de uma turma existente, já resolvido pelo ano dela
function rodizioDoGrupo(grupo, usuario){
  return rotuloRodizio(anoDoGrupo(grupo, usuario), grupo && grupo.deslocamento);
}
function blocosDoGrupo(grupo, usuario){
  const ano = anoDoGrupo(grupo, usuario);
  const seq = sequenciaDoAno(ano);
  const n = seq.length;
  if(!n) return [];
  const deslocamento = normalizarDeslocamento(grupo && grupo.deslocamento, n);
  const rotulo = rotuloRodizio(ano, deslocamento);
  // cada janela de data recebe o conteúdo que o quadro do ano põe nela para
  // esta turma — ou, onde não há quadro, o bloco que está "deslocamento"
  // posições à frente: é o rodízio em ciclo, mesma sequência, começos diferentes
  return seq.map((janela, i) => {
    const conteudo = conteudoDaJanela(seq, rotulo, deslocamento, i);
    return {
      id: conteudo.id, nome: conteudo.nome, especialidadeIds: conteudo.especialidadeIds,
      ordem: i+1, dataInicio: janela.dataInicio, dataFim: janela.dataFim,
    };
  });
}
/* UMA TURMA POR PESSOA. O aluno pertence a um grupo só — é o que a turma da
   vida real é. Entrar num grupo, portanto, é também SAIR do anterior: sem
   isso a pessoa ficava listada como membro de três turmas ao mesmo tempo e
   ninguém sabia mais quem estava em qual. O calendário oficial é a ausência
   de turma, então não tem lista de membros. */
function entrarNoGrupo(usuario, grupoId){
  if(!usuario) return;
  (db.grupos||[]).forEach(g => {
    if(g.id === grupoId || g.oficial) return;
    g.membrosAprovados = (g.membrosAprovados||[]).filter(id => id !== usuario.id);
    g.solicitacoesPendentes = (g.solicitacoesPendentes||[]).filter(id => id !== usuario.id);
  });
  const destino = getGrupo(grupoId);
  if(destino && !destino.oficial){
    if(!destino.membrosAprovados) destino.membrosAprovados = [];
    if(!destino.membrosAprovados.includes(usuario.id)) destino.membrosAprovados.push(usuario.id);
    destino.solicitacoesPendentes = (destino.solicitacoesPendentes||[]).filter(id => id !== usuario.id);
  }
  usuario.grupoId = destino ? destino.id : db.grupoOficialId;
}
function blocosDoUsuario(usuario){
  usuario = usuario || usuarioAtual();
  return blocosDoGrupo(getGrupoDoUsuario(usuario), usuario);
}
function getBloco(id){
  for(const ano of Object.keys(db.sequenciasAno || {})){
    const b = (db.sequenciasAno[ano] || []).find(x=>x.id===id);
    if(b) return b;
  }
  return null;
}
function especialidadeDeAssunto(assuntoId){ const a=getAssunto(assuntoId); return a ? getEspecialidade(a.especialidadeId) : null; }
function areaDeAssunto(assuntoId){ const e=especialidadeDeAssunto(assuntoId); return e ? getArea(e.areaId) : null; }
function nomeAssunto(id){ const a=getAssunto(id); return a ? a.nome : "—"; }
function nomeEspecialidade(id){ const e=getEspecialidade(id); return e ? e.nome : "—"; }
function nomeArea(id){ const a=getArea(id); return a ? a.nome : "—"; }
/* ---------------------------- PERMISSÕES DE ADMIN -------------------------
   Cada nível de administrador enxerga e altera apenas o que lhe cabe. Para
   mudar o que um nível pode fazer, basta acrescentar ou remover chaves aqui. */
const PERMISSOES_ADMIN = {
  master:      ["conteudo","cadastros","usuarios","blocos","config","livro-ouro","backup","taxonomia"],
  coordenacao: ["conteudo","cadastros","blocos","livro-ouro","taxonomia"],
  moderador:   ["conteudo","taxonomia"],
};
// rotas que exigem uma permissão específica de administrador
const PERMISSAO_DA_ROTA = {
  "usuarios":"usuarios", "config-geral":"config", "blocos":"blocos",
  "aprovar-cadastros":"cadastros", "feedback-usuarios":"cadastros", "taxonomia":"taxonomia",
  "material-pdf":"conteudo", "central-provas":"conteudo",
};
function nivelAdminDe(usuario){
  if(!usuario || usuario.papel!=="admin") return null;
  return usuario.nivelAdmin || "coordenacao";
}
function rotuloNivelAdmin(nivel){
  const n = CONFIG.niveisAdmin.find(x=>x.id===nivel);
  return n ? n.nome : "Administrador";
}
function podeAdmin(chave, usuario){
  usuario = usuario || usuarioAtual();
  if(!usuario) return false;
  if(usuario.papel!=="admin") return false;
  return (PERMISSOES_ADMIN[nivelAdminDe(usuario)] || []).includes(chave);
}
// professores também mexem em conteúdo e taxonomia; admins dependem do nível
function podeGerirConteudo(usuario){
  usuario = usuario || usuarioAtual();
  if(!usuario) return false;
  if(usuario.papel==="professor") return true;
  return podeAdmin("conteudo", usuario);
}
function usuarioAtual(){ return state.usuarioAtualId ? getUsuario(state.usuarioAtualId) : null; }
function blocoDoAssunto(assuntoId, grupo){
  const esp = especialidadeDeAssunto(assuntoId);
  if(!esp) return null;
  const blocos = blocosDoGrupo(grupo || getGrupoOficial());
  return blocos.find(b => b.especialidadeIds.includes(esp.id)) || null;
}
