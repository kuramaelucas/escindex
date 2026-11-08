/* codigo/05c-cronogramas-de-sessao.js — Motor de estudos (seção 4), parte 3: a sessão de quem não segue calendário, o cronograma de Formados e o do 6º ano (dificuldade por assunto, sessão do dia).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* SESSÃO SEM CALENDÁRIO. Quem não segue bloco nenhum (o formado sem grupo, ou
   quem está num grupo que existe só para dividir questões) não tem "matéria
   do momento": a sessão é 40% revisão espaçada (o que errou e o que já
   venceu, sem repetir o que domina) e o resto é questão que a pessoa ainda
   não viu, com os assuntos de maior prioridade (o que mais cai e ela mais
   erra) vindo antes. */
/* CRONOGRAMA DE FORMADOS (CONFIG.cronogramaFormado). A sessão de quem é
   Formado(a): cada assunto anda sozinho por três FASES, cada uma com mais
   questão difícil que a anterior (`fases`: 50/35/15, 35/50/15 e 15/50/35 de
   fácil/média/difícil). Nenhuma fase é "só fácil": quem sabe o assunto vê
   questão difícil desde o começo e sobe rápido; quem não sabe fica na
   mistura mais leve até acertar. As questões novas se dividem entre as
   grandes áreas numa cota fixa (metade igual, metade pela incidência nas
   provas), para nenhuma matéria ficar para trás. */
function cronogramaDeFormado(usuario){
  const c = CONFIG.cronogramaFormado;
  return c && usuario && c.anos.includes(usuario.anoFaculdade) ? c : null;
}
const ROTULO_NIVEL_FORMADO = ["fácil", "média", "difícil"];
let _cacheFasesFormado = null;
/* FASE DE CADA ASSUNTO, refeita do histórico (nada a guardar, nada a
   sincronizar). Só a PRIMEIRA resposta de cada questão conta: a revisão traz
   de volta justamente o que a pessoa errou e puxaria a fase para baixo por
   construção. Acerto no chute conta como erro (é lacuna, não domínio). Sobe
   de fase quem acerta as `amostraRapida` primeiras daquela fase (100%) ou,
   com `amostraMinima` respostas, quem acerta a régua do ritmo escolhido das
   últimas `janela`. Passou da última: assunto concluído, sai das questões
   novas (os erros dele seguem na revisão espaçada). */
function fasesDosAssuntosFormado(usuarioId){
  const regua = reguaDoFormado(getUsuario(usuarioId));
  const chave = usuarioId+"|"+_geracaoDb+"|"+db.respostas.length+"|"+regua.join(",");
  if(_cacheFasesFormado && _cacheFasesFormado.chave === chave) return _cacheFasesFormado.mapa;
  const c = CONFIG.cronogramaFormado, mapa = {}, vistas = new Set();
  const quando = r => r.respondidaEm || ((r.data || "")+"T12");
  // a ordem do histórico decide a fase; a nuvem pode trazer respostas antigas depois das novas
  const minhas = db.respostas.filter(r=>r.usuarioId===usuarioId && r.assuntoId).sort((a,b)=>quando(a).localeCompare(quando(b)));
  minhas.forEach(r=>{
    if(vistas.has(r.questaoId)) return;
    vistas.add(r.questaoId);
    const e = mapa[r.assuntoId] || (mapa[r.assuntoId] = faseVaziaFormado());
    e.total++; e.ultimaData = r.data || e.ultimaData;
    if(e.fase >= c.fases.length) return;
    const q = getQuestao(r.questaoId);
    e.naFase.push(!!r.correta && r.confianca !== "chute");
    if(q) e.porNivel[nivelProprioDaQuestao(q)]++;
    if(passouDaFaseFormado(e.naFase, e.fase, regua)){ e.fase++; e.naFase = []; e.porNivel = [0,0,0]; }
  });
  Object.values(mapa).forEach(e=>{ e.concluido = e.fase >= c.fases.length; e.acertosNaFase = e.naFase.filter(Boolean).length; });
  _cacheFasesFormado = { chave, mapa };
  return mapa;
}
function faseVaziaFormado(){ return { fase:0, total:0, naFase:[], porNivel:[0,0,0], acertosNaFase:0, concluido:false, ultimaData:"" }; }
/* Ritmo escolhido pelo aluno (Estudar > Ritmo das fases) e a régua de cada fase. */
function ritmoDoFormado(usuario){
  const r = usuario && usuario.reguaFormado;
  return CONFIG.cronogramaFormado.reguas[r] ? r : "padrao";
}
function reguaDoFormado(usuario){
  const c = CONFIG.cronogramaFormado, base = c.reguas[ritmoDoFormado(usuario)].acerto;
  return c.ajusteDaReguaPorFase.map(a => Math.round((base + a)*100)/100);
}
function passouDaFaseFormado(lista, fase, regua){
  const c = CONFIG.cronogramaFormado, n = lista.length;
  if(n === c.amostraRapida && lista.every(Boolean)) return true;      // 100% de saída: não precisa esperar a amostra
  if(n < c.amostraMinima) return false;
  const ultimas = lista.slice(-c.janela);
  return ultimas.filter(Boolean).length / ultimas.length >= regua[fase];
}
/* MENOS RETORNO (Formado). Quem faz ~200 questões por semana acumula revisão
   mais rápido do que consegue fazer: medido no simulador, a fila vencida era
   toda de ACERTOS antigos voltando em 30 e 60 dias — os erros a sessão dava
   conta — e era ela que empurrava a fatia de revisão para cima, tirando
   questão nova. Para o formado, que precisa cobrir o banco: acerto COM
   CERTEZA sai da revisão (é a melhor prova de que sabe); num assunto
   concluído (passou das três fases), sai qualquer acerto. Erro e chute
   sempre voltam; acerto na dúvida volta enquanto o assunto não está concluído. */
function dispensadaDaRevisaoFormado(usuarioId, questaoId){
  if(!cronogramaDeFormado(getUsuario(usuarioId))) return false;
  const rs = respostasDaQuestao(usuarioId, questaoId), ultima = rs[rs.length-1];
  if(!ultima || !acertoFirme(ultima)) return false;
  if(ultima.confianca === "certeza") return true;
  const q = getQuestao(questaoId);
  return !!q && faseDoAssuntoFormado(usuarioId, q.assuntoId).concluido;
}
function faseDoAssuntoFormado(usuarioId, assuntoId){ return fasesDosAssuntosFormado(usuarioId)[assuntoId] || faseVaziaFormado(); }
/* Qual dificuldade vem agora num assunto: sorteada com peso igual ao que
   falta para cada nível chegar à mistura da fase (fácil/média/difícil já
   respondidas nesta fase + as já postas nesta sessão). A primeira questão da
   fase sai na proporção exata da mistura e as seguintes corrigem o desvio —
   se fosse sempre "a mais atrasada", toda fase começaria pelo mesmo nível e,
   com poucas questões por assunto, a proporção nunca fecharia. Nível sem
   questão nova disponível fica de fora. */
function proximoNivelDaFase(fase, jaFeitas, disponiveis, sorteio){
  const mistura = CONFIG.cronogramaFormado.fases[fase];
  const n = jaFeitas.reduce((s,x)=>s+x, 0) + 1;
  const pesos = [0,1,2].map(l => disponiveis[l] ? Math.max(0, mistura[l]*n - jaFeitas[l]) : 0);
  let total = pesos.reduce((s,x)=>s+x, 0);
  if(!total){   // só sobrou nível acima da cota: vai o de mistura maior entre os disponíveis
    [0,1,2].forEach(l=>{ pesos[l] = disponiveis[l] ? mistura[l] : 0; });
    total = pesos.reduce((s,x)=>s+x, 0);
    if(!total) return null;
  }
  let r = (sorteio || Math.random)() * total;
  for(const l of [0,1,2]){ if(pesos[l] > 0 && (r -= pesos[l]) < 0) return l; }
  return [2,1,0].find(l => pesos[l] > 0);
}
/* Fatia de cada grande área nas questões novas: metade igual para todas,
   metade pela incidência nas provas reais do banco (`areaIgual`). */
function alvoDasAreasFormado(areaIds){
  const c = CONFIG.cronogramaFormado, inc = incidenciaNaBanca(TODAS_AS_PROVAS);
  const somaInc = areaIds.reduce((s,a)=>s+(inc.porArea[a]||0), 0);
  const alvo = {};
  areaIds.forEach(a=>{ alvo[a] = c.areaIgual/areaIds.length + (1-c.areaIgual)*(somaInc ? (inc.porArea[a]||0)/somaInc : 1/areaIds.length); });
  return alvo;
}
/* Fatia da sessão que é revisão: pouca no começo (quem acabou de chegar tem
   pouco a rever). Quem faz muitas questões por semana acumula revisões
   vencidas mais rápido do que a fatia fixa as devolve; com a fila grande
   (`filaVencida`) a fatia sobe, e a tela diz isso. */
function fracaoRevisaoFormado(usuarioId, filaVencida){
  const c = CONFIG.cronogramaFormado;
  const feitas = db.respostas.filter(r=>r.usuarioId===usuarioId).length;
  const degrau = c.revisaoPorRespostas.find(([ate]) => feitas < ate);
  if(degrau) return degrau[1];
  return filaVencida >= c.filaQueAceleraRevisao ? c.revisaoComFilaGrande : CONFIG.revisaoSemCalendario;
}
function montarSessaoDeFormado(usuario, tamanho){
  const usuarioId = usuario.id, c = CONFIG.cronogramaFormado;
  const partes = partesDaRevisaoEspacada(usuarioId);
  const nRevisao = Math.round(tamanho * fracaoRevisaoFormado(usuarioId, partes.erros.length + partes.decaimentos.length));
  const itens = [...partes.erros, ...partes.decaimentos].slice(0, nRevisao).map(v=>({questaoId:v.questao.id,
    origem: v.motivo==="erro" ? "revisao_erro" : "revisao_decaimento",
    motivo: v.motivo==="erro" ? "Revisão espaçada — erro/chute anterior" : "Revisão espaçada — já faz tempo desde o último acerto"}));
  const usados = new Set(itens.map(it=>it.questaoId));
  const fases = fasesDosAssuntosFormado(usuarioId);
  const faseDe = a => fases[a] || faseVaziaFormado();
  // questões novas, por assunto e dificuldade; assunto concluído não entra
  const assuntos = {};
  questoesParaEstudo(usuarioId).forEach(q=>{
    if(usados.has(q.id) || jaFoiRespondida(usuarioId, q.id) || faseDe(q.assuntoId).concluido) return;
    const a = assuntos[q.assuntoId] || (assuntos[q.assuntoId] = { id:q.assuntoId, areaId:q.areaId, niveis:[[],[],[]], naSessao:[0,0,0], postas:0 });
    a.niveis[nivelProprioDaQuestao(q)].push(q);
  });
  Object.values(assuntos).forEach(a=>{ a.niveis = a.niveis.map(l=>embaralhar(l)); });
  // ordem dos assuntos em cada área: o novo, o que mais cai e a pessoa erra, e o que ela não vê há tempo vêm antes
  const pesoInc = pesosDeIncidencia(usuarioId), hoje = hojeISO();
  const peso = a => { const e = faseDe(a.id);
    const espera = e.ultimaData ? Math.min(c.esperaMaxima, 1 + diasEntre(e.ultimaData, hoje)/7) : 1;
    return (e.total ? 1 : c.pesoAssuntoNovo) * (pesoInc[a.id] || 1) * espera; };
  const porArea = {};
  Object.values(assuntos).forEach(a=>{ (porArea[a.areaId] = porArea[a.areaId] || []).push(a); });
  Object.keys(porArea).forEach(k=>{ porArea[k] = sortearComPeso(porArea[k], porArea[k].length, peso); });
  const tirar = a => {
    const e = faseDe(a.id), feitas = e.porNivel.map((n,l)=>n + a.naSessao[l]);
    const nivel = proximoNivelDaFase(e.fase, feitas, a.niveis.map(l=>l.length));
    if(nivel === null) return false;
    const q = a.niveis[nivel].pop();
    a.naSessao[nivel]++; a.postas++; usados.add(q.id);
    itens.push({questaoId:q.id, origem:"nao_vista", motivo: motivoFormado(e, a.id, nivel)});
    return true;
  };
  const temQuestao = a => a.niveis.some(l=>l.length);
  // cota por área pelo que falta: o alvo de cada uma contra as questões novas que a pessoa fez nela há pouco
  const alvo = alvoDasAreasFormado(Object.keys(porArea));
  const recentes = {};
  const primeiras = new Set(), lista = [];
  db.respostas.forEach(r=>{ if(r.usuarioId===usuarioId && !primeiras.has(r.questaoId)){ primeiras.add(r.questaoId); lista.push(r); } });
  lista.slice(-c.janelaDeCobertura).forEach(r=>{ if(r.areaId in alvo) recentes[r.areaId] = (recentes[r.areaId]||0) + 1; });
  let base = Object.values(recentes).reduce((s,x)=>s+x, 0);
  const cursor = {};
  const proximoDaArea = (k, teto) => {
    const fila = porArea[k];
    for(let volta = 0; volta < fila.length; volta++){
      const i = ((cursor[k]||0) + volta) % fila.length, a = fila[i];
      if(a.postas < teto && temQuestao(a) && tirar(a)){ cursor[k] = i + 1; return true; }
    }
    return false;
  };
  // teto por assunto: primeiro o de `maxPorAssunto`; banco quase todo respondido, o teto some
  for(const teto of [c.maxPorAssunto, Infinity]){
    let areasAbertas = Object.keys(porArea);
    while(itens.length < tamanho && areasAbertas.length){
      base++;
      const k = areasAbertas.reduce((m,x)=> (alvo[x]*base - (recentes[x]||0)) > (alvo[m]*base - (recentes[m]||0)) ? x : m);
      if(proximoDaArea(k, teto)) recentes[k] = (recentes[k]||0) + 1;
      else { areasAbertas = areasAbertas.filter(x=>x!==k); base--; }
    }
  }
  if(itens.length < tamanho){
    const sobra = questoesParaEstudo(usuarioId).filter(q=>!usados.has(q.id));
    embaralharSemRepetir(usuarioId, sobra).slice(0, tamanho - itens.length).forEach(q=>itens.push({questaoId:q.id, origem:"complemento", motivo:"Complemento — os assuntos já foram concluídos ou não têm questão nova"}));
  }
  return embaralhar(itens);
}
function motivoFormado(e, assuntoId, nivel){
  const total = CONFIG.cronogramaFormado.fases.length, rotulo = " · questão "+ROTULO_NIVEL_FORMADO[nivel];
  if(!e.total) return "Exploração — "+nomeAssunto(assuntoId)+" é novo para você · fase 1 de "+total+rotulo;
  return "Fase "+(e.fase+1)+" de "+total+" — "+nomeAssunto(assuntoId)+": "+e.acertosNaFase+" acerto(s) em "+e.naFase.length+" nesta fase"+rotulo;
}
const pctFormado = x => Math.round(x*100)+"%";
/* O que a tela diz: a regra (com os números do CONFIG) e em que ponto a pessoa está. */
function explicacaoCronogramaFormado(usuario){
  const c = cronogramaDeFormado(usuario); if(!c) return "";
  // um conjunto só: chamar questoesParaEstudo por assunto custava ~300 ms a cada abertura do Estudar
  const naoVistas = new Set(), comQuestao = new Set(), areas = new Set(), areaDoAssunto = {};
  questoesParaEstudo(usuario.id).forEach(q=>{ comQuestao.add(q.assuntoId); areas.add(q.areaId); areaDoAssunto[q.assuntoId] = q.areaId; if(!jaFoiRespondida(usuario.id, q.id)) naoVistas.add(q.assuntoId); });
  const fases = fasesDosAssuntosFormado(usuario.id);
  const ids = [...comQuestao], porFase = c.fases.map(()=>0);
  let explorados = 0, concluidos = 0, esgotados = 0;
  // por área: onde cada matéria está ("CM: 12 na fase 2, 3 concluídos"), para a pessoa ver o que ficou para trás
  const daArea = {};
  ids.forEach(a=>{ const e = fases[a], d = daArea[areaDoAssunto[a]] = daArea[areaDoAssunto[a]] || { fases: c.fases.map(()=>0), concluidos: 0, novos: 0 };
    if(e && e.total) explorados++; else d.novos++;
    if(e && e.concluido){ concluidos++; d.concluidos++; }
    else if(!naoVistas.has(a)) esgotados++;
    else if(e && e.total){ porFase[e.fase]++; d.fases[e.fase]++; } });
  const textoDasAreas = [...areas].map(k=>{ const d = daArea[k] || { fases:[], concluidos:0, novos:0 };
    return nomeArea(k)+" — "+[...d.fases.map((n,i)=> n ? "fase "+(i+1)+": "+n : ""), d.concluidos ? "concluídos: "+d.concluidos : "", d.novos ? "ainda não vistos: "+d.novos : ""].filter(Boolean).join(", "); }).join("; ");
  const partes = partesDaRevisaoEspacada(usuario.id);
  const fila = partes.erros.length + partes.decaimentos.length;
  const fracao = fracaoRevisaoFormado(usuario.id, fila);
  const aviso = fracao > CONFIG.revisaoSemCalendario ? " Como há "+fila+" revisões vencidas, a fatia subiu para "+pctFormado(fracao)+" até a fila baixar." : "";
  const alvo = alvoDasAreasFormado([...areas]);
  const misturas = c.fases.map((m,i)=>"fase "+(i+1)+": "+m.map(pctFormado).join("/")).join(", ");
  return "Cronograma de formado(a): cada assunto passa por "+c.fases.length+" fases, com cada vez mais questão difícil ("+misturas+" de fácil/média/difícil). "+
    "O assunto sobe de fase pela sua taxa de acerto nas questões novas dele: acertar as "+c.amostraRapida+" primeiras já sobe; senão, com "+c.amostraMinima+" respostas, sobe quem acerta "+reguaDoFormado(usuario).map(pctFormado).join(", ")+" (fase 1, 2, 3) das últimas "+c.janela+" — ritmo "+c.reguas[ritmoDoFormado(usuario)].nome+" ("+c.reguas[ritmoDoFormado(usuario)].como+"), que você muda em Ritmo das fases. "+
    "Acerto no chute conta como erro e a revisão não muda a fase. Depois da última fase o assunto está concluído e sai das questões novas; o mesmo vale quando as questões novas dele acabam. "+
    "Para sobrar tempo para o banco inteiro, a revisão traz de volta só o que você errou, chutou ou acertou na dúvida: acerto com certeza não volta, e no assunto concluído nenhum acerto volta. "+
    "As questões novas se dividem entre as áreas na proporção das provas ("+[...areas].map(a=>nomeArea(a)+" "+pctFormado(alvo[a])).join(", ")+"). "+
    "Hoje: "+explorados+" de "+ids.length+" assuntos explorados · "+porFase.map((n,i)=>"fase "+(i+1)+": "+n).join(" · ")+" · concluídos: "+concluidos+(esgotados ? " · sem questão nova: "+esgotados : "")+". Por área: "+textoDasAreas+". "+
    "A fatia de revisão cresce com o que você já respondeu ("+pctFormado(fracao)+" agora)."+aviso;
}
/* RITMO DAS FASES. A janela explica, para o aluno, o que é uma fase, o que
   vale em qualquer ritmo e, para cada ritmo, como funciona, quando escolher e
   o cuidado — e quantas subidas de fase a troca causaria agora (a fase é
   refeita do histórico, então trocar o ritmo vale também para o passado). */
function abrirRitmoDoFormado(){
  const u = usuarioAtual(), c = CONFIG.cronogramaFormado, atual = ritmoDoFormado(u);
  const contar = ritmo => { const antes = u.reguaFormado; u.reguaFormado = ritmo;
    const m = fasesDosAssuntosFormado(u.id), n = Object.values(m).filter(e=>e.total).reduce((s,e)=>s + e.fase, 0);
    if(antes === undefined) delete u.reguaFormado; else u.reguaFormado = antes; return n; };
  const agora = contar(atual);
  const nomes = ["fácil", "média", "difícil"];
  const fases = c.fases.map((m,i)=>`<li><strong>Fase ${i+1}</strong>: ${m.map((x,l)=>pctFormado(x)+" "+nomes[l]).join(", ")}</li>`).join("");
  abrirModalTitulado("Ritmo das fases", `
    <p class="text-sm">Cada assunto passa por ${c.fases.length} fases, e cada uma traz mais questão difícil que a anterior:</p>
    <ul class="text-sm">${fases}</ul>
    <p class="text-sm">O <strong>ritmo</strong> decide quanto você precisa acertar nas questões novas de um assunto para ele mudar de fase. Depois da última, o assunto está concluído e sai das questões novas.</p>
    <p class="text-xs muted">Em qualquer ritmo: acertar as ${c.amostraRapida} primeiras da fase já sobe; fora isso, vale a taxa das últimas ${c.janela}, a partir de ${c.amostraMinima} respostas na fase; acerto no chute conta como erro; a revisão não muda a fase; um assunto não mexe nos outros; e a fase ${c.fases.length}, por ter mais difícil, pede 5 pontos a menos.</p>
    ${Object.entries(c.reguas).map(([id, r])=>{ const regua = c.ajusteDaReguaPorFase.map(a=>pctFormado(r.acerto+a)).join(", ");
      const dif = contar(id) - agora;
      return `<label class="card-flat mt-1 flex gap-1" style="align-items:flex-start"><input type="radio" name="ritmoFormado" value="${id}" ${id===atual?"checked":""} style="margin-top:.3em">
        <span class="text-sm"><strong>${escapeHtml(r.nome)}</strong> — ${regua} (fase 1, 2, 3)${id===atual ? ` <span class="badge badge-accent">seu ritmo</span>` : ""}<br>
        <span><strong>Como funciona:</strong> ${escapeHtml(r.como)}.</span><br>
        <span><strong>Quando escolher:</strong> ${escapeHtml(r.quando)}.</span><br>
        <span class="muted"><strong>Cuidado:</strong> ${escapeHtml(r.cuidado)}.</span>
        ${dif ? `<br><span class="text-xs muted">Com o que você já respondeu, ${Math.abs(dif)} ${dif>0?"subida(s)":"descida(s)"} de fase na hora.</span>` : ""}</span></label>`; }).join("")}
    <p class="text-xs muted mt-2">Trocar recalcula as fases com o que você já respondeu, sem perder nada. A escolha fica guardada e vale nos outros aparelhos em que você entrar.</p>
    <div class="flex gap-1 mt-3 quebra"><button class="btn btn-primary" onclick="salvarRitmoDoFormado()">Salvar</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function salvarRitmoDoFormado(){
  const marcado = document.querySelector('input[name="ritmoFormado"]:checked');
  if(!marcado) return;
  const u = usuarioAtual();
  // o padrão não se grava: acompanha o padrão se ele mudar
  if(marcado.value === "padrao") delete u.reguaFormado; else u.reguaFormado = marcado.value;
  saveState(); fecharModal();
  toast("Ritmo das fases: "+CONFIG.cronogramaFormado.reguas[ritmoDoFormado(u)].nome+".");
  render();
}
function montarSessaoSemCalendario(usuario, tamanho){
  if(cronogramaDeFormado(usuario)) return montarSessaoDeFormado(usuario, tamanho);
  const usuarioId = usuario.id;
  const rotulo = q => rotuloProgressao(q, usuario);
  const pesos = pesosDeIncidencia(usuarioId);
  const partes = partesDaRevisaoEspacada(usuarioId);
  const nRevisao = Math.round(tamanho * CONFIG.revisaoSemCalendario);
  const itens = [...partes.erros, ...partes.decaimentos].slice(0, nRevisao).map(v=>({questaoId:v.questao.id,
    origem: v.motivo==="erro" ? "revisao_erro" : "revisao_decaimento",
    motivo: v.motivo==="erro" ? "Revisão espaçada — erro/chute anterior" : "Revisão espaçada — já faz tempo desde o último acerto"}));
  const usados = new Set(itens.map(it=>it.questaoId));
  const naoVistas = questoesParaEstudo(usuarioId).filter(q=>!usados.has(q.id) && !jaFoiRespondida(usuarioId, q.id));
  selecionarComProgressao(naoVistas, tamanho - itens.length, usuario, (p,k)=>selecionarComInterleaving(p, k, pesos))
    .forEach(q=>{ itens.push({questaoId:q.id, origem:"nao_vista", motivo:"Questão que você ainda não viu"+rotulo(q)}); usados.add(q.id); });
  if(itens.length < tamanho){
    // banco quase todo respondido: completa com o que já venceu e, por fim, com qualquer questão
    const sobra = questoesParaEstudo(usuarioId).filter(q=>!usados.has(q.id));
    embaralharSemRepetir(usuarioId, sobra).slice(0, tamanho - itens.length).forEach(q=>itens.push({questaoId:q.id, origem:"complemento", motivo:"Complemento — você já respondeu quase tudo do banco"}));
  }
  return embaralhar(itens);
}

/* CRONOGRAMA DO 6º ANO (CONFIG.cronogramaDoSextoAno). Só vale para quem está
   no ano listado lá; sem ele, a sessão do dia é a recomendada de sempre. */
function cronogramaDoUsuario(usuario){
  const c = CONFIG.cronogramaDoSextoAno;
  const ano = (usuario && usuario.anoFaculdade) || CONFIG.anoFaculdadePadrao;
  return c && c.anos.includes(ano) ? c : null;
}
/* A sessão do dia: as primeiras questões do cronograma pelo sistema atual e,
   passada a cota, as extras de prova de residência. `feitasHoje` é o que a
   pessoa já respondeu hoje; a cota que falta cabe numa sessão só em parte
   (a sessão que cruza a 30ª questão sai metade de cada). */
function montarSessaoDoDia(usuarioId, tamanho, feitasHoje){
  const crono = cronogramaDoUsuario(getUsuario(usuarioId));
  if(!crono) return montarSessaoRecomendada(usuarioId, tamanho);
  const noSistema = Math.min(tamanho, Math.max(0, crono.questoesNoSistema - feitasHoje));
  const doSistema = noSistema ? montarSessaoRecomendada(usuarioId, noSistema) : [];
  const usadas = new Set(doSistema.map(it=>it.questaoId));
  // o sistema atual vem primeiro e as extras depois: a ordem é a do cronograma
  const extras = montarSessaoDeProvaReal(usuarioId, tamanho - doSistema.length, usadas);
  return [...doSistema, ...extras];
}
/* Sorteio ponderado sem repetição: cada questão recebe a chave sorteio^(1/peso)
   e vão as de maior chave (peso 11 quase sempre passa na frente de peso 1).
   Diferente do interleaving, que dá uma questão por assunto e dilui a
   prioridade: aqui o assunto que mais cai e em que a pessoa mais erra pode
   trazer várias questões da mesma sessão. */
function sortearComPeso(pool, n, pesoDe){
  return pool.map(q=>({q, chave: Math.pow(Math.random(), 1/Math.max(pesoDe(q), 1e-6))}))
    .sort((a,b)=>b.chave-a.chave).slice(0, n).map(x=>x.q);
}
/* As extras: só questão real de residência, dos assuntos que mais caem nas
   provas do banco e em que a pessoa mais erra (a nota de prioridade de
   prioridadesDeEstudo, que já cruza as duas coisas), sem repetir o que ela
   respondeu há pouco. Se faltar questão desses assuntos, completa com
   qualquer outra de prova real; faltando ainda, com o resto do banco. */
function montarSessaoDeProvaReal(usuarioId, n, excluidas){
  if(n <= 0) return [];
  const crono = cronogramaDoUsuario(getUsuario(usuarioId)) || CONFIG.cronogramaDoSextoAno;
  const prior = {}, pesos = {};
  prioridadesDeEstudo(usuarioId, TODAS_AS_PROVAS).forEach(p=>{ prior[p.assuntoId] = p; pesos[p.assuntoId] = 1 + crono.pesoExtras*p.prioridadeRelativa; });
  const livres = questoesParaEstudo(usuarioId).filter(q=>!excluidas.has(q.id));
  const reais = livres.filter(q=>!ehConsolidacao(q));
  const motivo = q => {
    const p = prior[q.assuntoId];
    return "Extra do cronograma — prova de residência" + (p ? ": "+nomeAssunto(q.assuntoId)+" tem "+p.questoesNaProva+" questão(ões) nas provas do banco"+(p.taxa!==null ? " e você acerta "+p.taxa+"%" : " e você ainda não o respondeu") : "");
  };
  const itens = sortearComPeso(semRepeticaoPrematura(usuarioId, reais), n, q=>pesos[q.assuntoId] || 1)
    .map(q=>({questaoId:q.id, origem:"extra_prova", motivo:motivo(q)}));
  if(itens.length < n){
    const ja = new Set(itens.map(it=>it.questaoId));
    const resto = livres.filter(q=>!ja.has(q.id));
    [...embaralharSemRepetir(usuarioId, resto.filter(q=>!ehConsolidacao(q))), ...embaralharSemRepetir(usuarioId, resto.filter(ehConsolidacao))]
      .slice(0, n - itens.length)
      .forEach(q=>itens.push({questaoId:q.id, origem:"extra_prova", motivo:"Extra do cronograma — as provas de residência do banco já foram quase todas respondidas"}));
  }
  return itens;
}
/* O que a tela diz sobre o cronograma e em que ponto do dia a pessoa está. */
function explicacaoCronograma(usuario, feitasHoje){
  const crono = cronogramaDoUsuario(usuario);
  if(!crono) return "";
  const cota = crono.questoesNoSistema;
  return "Cronograma do 6º ano: as primeiras "+cota+" questões do dia seguem o sistema (bloco, revisão e prévia); da "+(cota+1)+"ª em diante só entram questões de prova real de residência, nos assuntos que mais caem no banco e em que você mais erra. "+
    (feitasHoje >= cota ? "Hoje você já passou das "+cota+": o que vier agora é de prova." : "Hoje: "+feitasHoje+" de "+cota+" no sistema.");
}

function montarSessaoRecomendada(usuarioId, tamanho){
  const usuario = getUsuario(usuarioId);
  const grupo = getGrupoDoUsuario(usuario);
  const blocoAtual = getBlocoAtual(usuario);
  if(!blocoAtual) return montarSessaoSemCalendario(usuario, tamanho);
  const blocosGrupo = blocosDoGrupo(grupo);
  const proximo = getProximoBloco(blocoAtual, blocosGrupo);
  const mistura = misturaEfetiva(usuario);

  const assuntosAtual = assuntoIdsDoBloco(blocoAtual);
  // a revisão considera os blocos já vencidos DESTE ano e também o que o aluno
  // estudou em anos anteriores (essencial no começo do ano letivo)
  const assuntosPassados = assuntosParaRevisao(usuario);
  const assuntosFuturos = proximo ? assuntoIdsDoBloco(proximo) : [];

  const nAtual = Math.round(tamanho*mistura.atual);
  const nRevisao = Math.round(tamanho*mistura.revisaoPassados);
  const nPrevia = Math.max(0, tamanho - nAtual - nRevisao);

  const poolAtual = semRepeticaoPrematura(usuarioId, questoesParaEstudo(usuarioId).filter(q=>assuntosAtual.includes(q.assuntoId)));
  const pesos = pesosDeIncidencia(usuarioId);
  const destaque = assuntosQueMaisCaem(usuarioId);
  /* A proporção consolidação/residência do ano do aluno (CONFIG.progressaoConsolidacao)
     vale para o que é matéria NOVA da sessão: bloco atual, assunto de bloco
     anterior ainda não visto, prévia e complemento. A revisão espaçada
     vencida não entra na conta — é questão que a pessoa já fez, e o prazo
     dela não muda porque o ano mudou. */
  const rotulo = q => rotuloProgressao(q, usuario);
  const itensAtual = selecionarComProgressao(poolAtual, nAtual, usuario, (p,k)=>selecionarComInterleaving(p, k, pesos)).map(q=>({questaoId:q.id, origem:"bloco_atual",
    motivo:"Bloco atual — "+blocoAtual.nome + (destaque.has(q.assuntoId) ? " · prioridade: cai muito na "+bancaDeReferencia() : "") + rotulo(q)}));

  /* Ordem da revisão: primeiro o que a pessoa AINDA NÃO VIU, depois o que
     ela ERROU (ou acertou no chute), e só por último o que acertou e já
     passou o prazo — ver partesDaRevisaoEspacada. */
  const partesRevisao = partesDaRevisaoEspacada(usuarioId, assuntosPassados);
  const itensRevisao = selecionarComProgressao(partesRevisao.novas, nRevisao, usuario, (p,k)=>selecionarComInterleaving(p, k, pesos))
    .map(q=>({questaoId:q.id, origem:"revisao_nova", motivo:"Revisão — assunto de bloco anterior que você ainda não viu"+rotulo(q)}));
  const atrasoDe = v => diasEntre(proximaRevisaoEfetiva(v.entry), hojeISO());
  [...partesRevisao.erros, ...partesRevisao.decaimentos].slice(0, Math.max(0, nRevisao - itensRevisao.length)).forEach(v=>{
    const atraso = atrasoDe(v);
    const porErro = partesRevisao.erros.includes(v);
    itensRevisao.push({questaoId:v.questao.id, origem: porErro ? "revisao_erro" : "revisao_decaimento", motivo: (porErro ? "Revisão espaçada — erro/chute anterior" : "Revisão espaçada — já faz tempo desde o último acerto") + (atraso>0 ? ", vencida há "+atraso+" dia(s)" : ", no prazo")});
  });

  const poolPrevia = semRepeticaoPrematura(usuarioId, questoesParaEstudo(usuarioId).filter(q=>assuntosFuturos.includes(q.assuntoId) && q.dificuldadeManual==="fundamental"));
  const itensPrevia = selecionarComProgressao(poolPrevia, nPrevia, usuario, (p,k)=>embaralhar(p).slice(0,k)).map(q=>({questaoId:q.id, origem:"previa", motivo: (proximo ? "Prévia do próximo bloco — "+proximo.nome : "Prévia")+rotulo(q)}));

  let todos = semQuestoesRepetidas([...itensAtual, ...itensRevisao, ...itensPrevia]);
  // se o banco de demonstração não tiver questões suficientes para preencher a
  // meta, completamos com quaisquer questões ativas ainda não usadas nesta sessão
  if(todos.length < tamanho){
    const usados = new Set(todos.map(t=>t.questaoId));
    const extras = selecionarComProgressao(questoesParaEstudo(usuarioId).filter(q=>!usados.has(q.id)), tamanho-todos.length, usuario, (p,k)=>embaralharSemRepetir(usuarioId, p).slice(0,k))
      .map(q=>({questaoId:q.id, origem:"complemento", motivo:"Complemento — banco de demonstração ainda é pequeno"+rotulo(q)}));
    todos = [...todos, ...extras];
  }
  return embaralhar(todos);
}

/* `filtros.incluirRecentes` recoloca na lista o que a pessoa respondeu há
   pouco e ainda não venceu na revisão espaçada: por padrão a lista que ela
   monta também não repete questão prematuramente (ver semRepeticaoPrematura),
   e a tela diz quantas ficaram de fora e deixa trazê-las de volta
   (contagemDaListaPersonalizada). */
function buscarQuestoesPorFiltro(usuarioId, filtros){
  // telas de equipe (PDF) pedem o banco inteiro; as de estudo, só o que a
  // pessoa não escondeu
  let pool = filtros.incluirInativas ? db.questoes.slice() : questoesParaEstudo(usuarioId, filtros.incluirGrupoId);
  if(filtros.areaIds && filtros.areaIds.length) pool = pool.filter(q=>filtros.areaIds.includes(q.areaId));
  if(filtros.especialidadeIds && filtros.especialidadeIds.length) pool = pool.filter(q=>filtros.especialidadeIds.includes(q.especialidadeId));
  if(filtros.assuntoIds && filtros.assuntoIds.length) pool = pool.filter(q=>filtros.assuntoIds.includes(q.assuntoId));
  if(filtros.bancas && filtros.bancas.length) pool = pool.filter(q=>filtros.bancas.includes(q.banca));
  if(filtros.tiposProva && filtros.tiposProva.length) pool = pool.filter(q=>filtros.tiposProva.includes(tipoProvaDe(q)));
  if(filtros.anos && filtros.anos.length) pool = pool.filter(q=>filtros.anos.includes(q.ano));
  if(filtros.apenasErros) pool = pool.filter(q=>{ const u=ultimaResposta(usuarioId,q.id); return u && (!u.correta || u.confianca==="chute"); });
  if(filtros.apenasFavoritas) pool = pool.filter(q=>isFavorita(usuarioId,q.id));
  if(filtros.apenasNaoRespondidas) pool = pool.filter(q=>!jaFoiRespondida(usuarioId,q.id));
  if(!filtros.incluirRecentes && !filtros.incluirInativas) pool = semRepeticaoPrematura(usuarioId, pool);
  return pool;
}
/* Quantas questões os filtros dão, quantas delas foram respondidas há pouco
   (`recentes`) e se estão dentro da conta (`incluidas`) — o que a tela mostra,
   em letra pequena, com o botão de tirá-las ou recolocá-las. */
function contagemDaListaPersonalizada(usuarioId, filtros){
  const todas = buscarQuestoesPorFiltro(usuarioId, Object.assign({}, filtros, {incluirRecentes:true}));
  const recentes = todas.length - semRepeticaoPrematura(usuarioId, todas).length;
  const incluidas = !!filtros.incluirRecentes;
  return { total: incluidas ? todas.length : todas.length - recentes, recentes, incluidas };
}

function questoesErroOrdenadasPorAntiguidade(usuarioId){
  const pool = questoesParaEstudo(usuarioId).filter(q=>{
    const u = ultimaResposta(usuarioId,q.id);
    return u && (!u.correta || u.confianca==="chute") && diasEntre(u.data, hojeISO()) >= CONFIG.intervaloMinimoRevisao;
  });
  return pool.map(q=>({questao:q, ultima:ultimaResposta(usuarioId,q.id)}))
    .sort((a,b)=>a.ultima.data.localeCompare(b.ultima.data)); // mais antigas primeiro
}

/* A revisão não pode se basear só em erro: mesmo quem acertou com certeza
   esquece com o tempo. Esta função junta as questões já respondidas cujo
   prazo de revisão espaçada já venceu — acertos e erros — e mostra, pra
   transparência, se cada uma volta por erro/chute recente ou por decaimento
   natural (fazia tempo que não via, mesmo tendo acertado). Questão dominada
   (mais de dois acertos firmes seguidos) já não vence — ver questaoDominada. */
function questoesRevisaoEspacadaVencidas(usuarioId){
  const revisoesDoUsuario = db.revisoes[usuarioId] || {};
  const pool = questoesParaEstudo(usuarioId).filter(q => revisaoVencida(usuarioId, q.id));
  return pool.map(q=>{
    const entry = revisoesDoUsuario[q.id];
    const motivo = (!entry.ultimaCorreta || entry.ultimaConfianca==="chute") ? "erro" : "decaimento";
    return {questao:q, entry, motivo};
  }).sort((a,b)=>{
    // mais atrasada em relação ao próprio prazo primeiro (ver urgenciaDeRevisao);
    // empate: a de vencimento mais antigo
    const ua = urgenciaDeRevisao(proximaRevisaoEfetiva(a.entry), a.entry.intervalo), ub = urgenciaDeRevisao(proximaRevisaoEfetiva(b.entry), b.entry.intervalo);
    return ub-ua || proximaRevisaoEfetiva(a.entry).localeCompare(proximaRevisaoEfetiva(b.entry));
  });
}
/* Os assuntos de que a revisão espaçada pode trazer questão que a pessoa
   nunca viu: os dos blocos já passados e os de anos anteriores. Sem bloco
   nenhum (quem não segue calendário, como o formado sem grupo), valem os
   assuntos em que ela já respondeu alguma coisa — não há "passado" no
   calendário para olhar. */
function assuntosParaRevisao(usuario){
  const blocoAtual = getBlocoAtual(usuario);
  const passados = blocoAtual ? getBlocosPassados(blocoAtual, blocosDoGrupo(getGrupoDoUsuario(usuario), usuario)) : [];
  const conjunto = new Set([...passados.flatMap(assuntoIdsDoBloco), ...assuntosDeAnosAnteriores(usuario.id)]);
  if(!blocoAtual) db.respostas.forEach(r=>{ if(r.usuarioId===usuario.id && r.assuntoId) conjunto.add(r.assuntoId); });
  return [...conjunto];
}
