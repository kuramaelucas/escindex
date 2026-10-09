/* codigo/08d-revisao.js — a tela de Revisão (seção 12): visão por assunto e fila de erros e chutes.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   12. REVISÃO (visão por assunto + fila de erros/chutes)
   ========================================================================== */
function renderRevisao(){
  const u = usuarioAtual();
  const assuntos = assuntosParaRevisarHoje(u.id);
  const erros = questoesErroOrdenadasPorAntiguidade(u.id);
  const partesEspacada = partesDaRevisaoEspacada(u.id);
  const naoVistas = partesEspacada.novas.length;
  const porDecaimento = partesEspacada.decaimentos.length;
  const porErro = partesEspacada.erros.length;
  const totalEspacada = naoVistas + porErro + porDecaimento;
  const errosComCerteza = questoesErroComCerteza(u.id);
  const acertosNoChute = questoesAcertoNoChute(u.id);
  const errosNaDuvida = questoesErroNaDuvida(u.id);
  const falsaSeguranca = assuntosComFalsaSeguranca(u.id);
  return `
  <div class="page-header"><h2>Revisão</h2><p>Assuntos e questões que, pelo seu histórico, estão no momento certo de voltar.</p></div>
  <div class="card">
    <div class="card-title">Revisão espaçada de questões (${totalEspacada})</div>
    <p class="text-sm muted">Vem nesta ordem: primeiro as questões dos assuntos que você já estudou e <strong>ainda não viu</strong> (${naoVistas}); depois as que você <strong>errou ou acertou no chute</strong> (${porErro}); por último as que você acertou e já passou o prazo (${porDecaimento}).</p>
    <p class="text-xs muted mt-1">Questão que você acertou com segurança só volta depois de <strong>1 mês</strong> — e de 2 meses no segundo acerto seguido; em assunto em que você vai bem, o prazo cresce ainda mais. Depois de <strong>3 acertos seguidos</strong> ela sai da revisão espaçada. Errar (ou acertar no chute) zera a conta e a questão volta em <strong>1 semana</strong> — nenhuma questão reaparece antes disso.</p>
    <button class="btn btn-primary mt-2" onclick="iniciarRevisaoEspacada()" ${!totalEspacada?"disabled":""}>Revisar agora</button>
  </div>
  <div class="card mt-2">
    <div class="card-title">Assuntos vencidos (${assuntos.length})</div>
    ${assuntos.length ? `<div class="table-wrap mt-2"><table><thead><tr><th>Assunto</th><th>Taxa recente</th><th>Atraso</th><th></th></tr></thead><tbody>
      ${assuntos.map(a=>`<tr><td>${escapeHtml(nomeAssunto(a.assuntoId))}</td><td>${Math.round(a.taxa*100)}%</td><td>${a.atrasoDias} dia(s)</td><td><button class="btn btn-secondary btn-sm" onclick="praticarAssunto('${a.assuntoId}')">Praticar</button></td></tr>`).join("")}
    </tbody></table></div>` : '<p class="text-sm muted mt-1">Nenhum assunto vencido hoje — em dia com a revisão.</p>'}
  </div>
  <div class="card mt-2">
    <div class="card-title">Filas por tipo de erro</div>
    <p class="text-sm muted mb-2">Nem todo erro é igual. Errar achando que sabia é o mais caro, porque você não voltaria a esse assunto por conta própria. Acertar no chute é o oposto do que parece: conta como não sabido.</p>
    <div class="grid grid-3">
      <div class="card-flat">
        <div class="peso-600">Errou com certeza <span class="badge badge-danger">${errosComCerteza.length}</span></div>
        <p class="text-xs muted mt-1">Conceito consolidado de forma errada. Prioridade máxima.</p>
        <button class="btn btn-primary btn-sm mt-2" onclick="praticarFilaDeConfianca('certeza')" ${!errosComCerteza.length?"disabled":""}>Praticar</button>
      </div>
      <div class="card-flat">
        <div class="peso-600">Acertou no chute <span class="badge badge-amber">${acertosNoChute.length}</span></div>
        <p class="text-xs muted mt-1">A estatística diz acerto, mas você não sabia. Volta como se tivesse errado.</p>
        <button class="btn btn-secondary btn-sm mt-2" onclick="praticarFilaDeConfianca('chute')" ${!acertosNoChute.length?"disabled":""}>Praticar</button>
      </div>
      <div class="card-flat">
        <div class="peso-600">Errou na dúvida <span class="badge badge-muted">${errosNaDuvida.length}</span></div>
        <p class="text-xs muted mt-1">Você já sabia que não sabia — aqui falta conteúdo, não calibração.</p>
        <button class="btn btn-secondary btn-sm mt-2" onclick="praticarFilaDeConfianca('duvida')" ${!errosNaDuvida.length?"disabled":""}>Praticar</button>
      </div>
    </div>
    ${falsaSeguranca.length ? `<div class="mt-2">
      <div class="text-sm peso-600">Assuntos em que sua confiança não bate com o acerto</div>
      ${falsaSeguranca.slice(0,5).map(f=>`<div class="flex justify-between items-center card-flat mb-1">
        <span class="text-sm">${escapeHtml(nomeAssunto(f.assuntoId))} <span class="text-xs muted">— ${f.n} resposta(s) marcadas como "certeza"</span></span>
        <span class="flex items-center gap-1"><span class="badge badge-danger">${f.taxa}% de acerto</span><button class="btn btn-secondary btn-sm" onclick="praticarAssuntoFalsaSeguranca('${f.assuntoId}')">Praticar</button></span>
      </div>`).join("")}
    </div>` : ""}
  </div>
  <div class="card mt-2">
    <div class="card-title">Revisão rápida por flashcards (${resumoFlashcards(u.id).vencidos} vencido(s))</div>
    <p class="text-sm muted">Cartão de conceito em vez de questão: sem alternativa para eliminar, você tenta lembrar do zero e diz se sabia. Leva segundos por cartão e é o formato certo para os assuntos de falsa segurança — aqueles em que você marca "certeza" e erra.</p>
    <div class="flex gap-1 mt-2 quebra">
      <button class="btn btn-primary" onclick="iniciarSessaoFlashcards({})">${iconeSvg("cards")} Revisar cartões</button>
      ${falsaSeguranca.length ? `<button class="btn btn-secondary" onclick="iniciarSessaoFlashcards({somenteFalsaSeguranca:true})">Só onde minha confiança engana</button>` : ""}
      <button class="btn btn-ghost" onclick="navigate('flashcards')">Ver baralho e filtros</button>
    </div>
  </div>
  ${renderCartaoQuestoesErradas(u)}
  <div class="card mt-2">
    <div class="card-title">Só erros e chutes pendentes (${erros.length})</div>
    <p class="text-sm muted">Se quiser focar especificamente no que errou ou chutou, sem misturar com revisão por decaimento, use esta lista — ordenada da mais antiga para a mais recente.</p>
    <button class="btn btn-secondary mt-2" onclick="iniciarRevisaoErros()" ${!erros.length?"disabled":""}>Revisar só erros</button>
  </div>
  <div class="card-flat mt-2 text-sm">
    <strong>Como funciona:</strong> cada questão tem seu próprio intervalo de revisão, que cresce quando você acerta com confiança e encolhe quando você erra ou chuta (mesmo acertando no chute), mas nunca abaixo de 1 semana. A revisão espaçada geral, acima, respeita isso pra TODAS as questões já respondidas — não só as erradas — porque até quem acerta esquece com o tempo, mas sem repetir o que você já domina: acerto seguro espera um mês e, depois de três, a questão sai da fila. Assuntos inteiros também têm um intervalo próprio, baseado na taxa de acerto das suas últimas respostas naquele assunto.
  </div>`;
}
/* As questões que a pessoa já errou, com quantas vezes cada uma — a
   mais errada primeiro. É aqui que se esconde em lote ("já entendi essas,
   não quero mais"); o que foi escondido volta em Favoritos > Retiradas da
   revisão. */
function renderCartaoQuestoesErradas(u){
  const erradas = questoesErradasPeloUsuario(u.id);
  const escondidas = questoesRetiradasDaRevisao(u.id);
  const aberta = !!state.filtroRota.errosAbertos;
  const pag = aberta ? paginar(erradas, "revisao-erradas", {porPagina:10}) : null;
  const repetidas = erradas.filter(x=>x.erros>1).length;
  const linha = (x)=>`<div class="card-flat mb-1">
      <div class="qcard-meta mb-1">
        <span class="badge badge-danger">errada ${rotuloVezes(x.erros)}</span>
        <span class="badge badge-muted">${x.tentativas} ${x.tentativas===1?"tentativa":"tentativas"}</span>
        <span class="badge ${x.ultima.correta?"badge-accent":"badge-muted"}">última: ${x.ultima.correta?"acertou":"errou"} em ${formatDataBR(x.ultima.data)}</span>
        <span class="badge badge-muted">${escapeHtml(nomeAssunto(x.questao.assuntoId))}</span>
      </div>
      <div class="text-sm"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${x.questao.id}')">${escapeHtml(x.questao.enunciado.slice(0,160))}${x.questao.enunciado.length>160?"…":""}</span></div>
      <div class="flex gap-1 mt-1 quebra">
        <button class="btn btn-secondary btn-sm" onclick="praticarSoEstaQuestao('${x.questao.id}')">${iconeSvg("book")} Refazer</button>
        ${podeEsconderQuestao(u.id, x.questao.id) ? `<button class="btn btn-ghost btn-sm" onclick="alternarQuestaoOcultaUI('${x.questao.id}')">${iconeSvg("eye-off")} Não mostrar mais</button>` : ""}
      </div>
    </div>`;
  return `
  <div class="card mt-2">
    <div class="card-title">Questões que você errou (${erradas.length})</div>
    <p class="text-sm muted">Cada uma com quantas vezes você já errou${repetidas ? ` — ${repetidas} você errou mais de uma vez` : ""}. A mais errada vem primeiro. Se já entendeu uma e não quer mais vê-la, "Não mostrar mais" a tira das suas sessões, revisões e listas (só das suas).</p>
    ${erradas.length ? `<div class="flex gap-1 mt-2 mb-2 quebra">
      <button class="btn btn-primary btn-sm" onclick="praticarQuestoesMaisErradas()">${iconeSvg("book")} Refazer as mais erradas</button>
      <button class="btn btn-secondary btn-sm" onclick="alternarListaDeErradas()" aria-expanded="${aberta}">${aberta ? "Esconder a lista" : "Ver todas as questões erradas ("+erradas.length+")"}</button>
    </div>
    ${aberta ? pag.itens.map(linha).join("")+controlesPaginacao(pag, "questão(ões) errada(s)") : ""}` : '<p class="text-sm muted mt-1">Nenhuma questão errada fora das escondidas.</p>'}
  </div>
  <div class="card-flat mt-2 text-sm">${iconeSvg("eye-off")} As questões que você pediu para não ver mais (${escondidas.length}) ficam em <button class="link-btn" onclick="state.filtroRota.abaFavoritos='retiradas';navigate('favoritos')">Favoritos &gt; Retiradas da revisão</button>, junto do que você salvou para rever.</div>`;
}
/* A lista fica fechada até a pessoa pedir: dezenas de enunciados empurravam
   para baixo o resto da Revisão, que é o que ela veio ver. */
function alternarListaDeErradas(){
  state.filtroRota.errosAbertos = !state.filtroRota.errosAbertos;
  render();
}
function praticarQuestoesMaisErradas(){
  const u = usuarioAtual();
  const itens = questoesErradasPeloUsuario(u.id).slice(0,20)
    .map(x=>({questaoId:x.questao.id, motivo:"Você já errou esta questão "+rotuloVezes(x.erros)}));
  if(!itens.length){ toast("Nenhuma questão errada para refazer."); return; }
  iniciarSessaoComLista(itens, "pratica");
}
function mostrarTodasAsEscondidas(){
  const n = (db.questoesOcultas||[]).filter(o=>o.usuarioId===usuarioAtual().id).length;
  if(!n) return;
  abrirModalTitulado("Voltar a mostrar todas", `<p class="text-sm">As ${n} questões escondidas voltam a entrar nas suas sessões, revisões e listas.</p>
    <div class="flex gap-1 mt-3">
      <button class="btn btn-primary" onclick="fecharModal();mostrarTodasAsEscondidasConfirmado()">Voltar a mostrar</button>
      <button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button>
    </div>`);
}
function mostrarTodasAsEscondidasConfirmado(){
  const u = usuarioAtual();
  const minhas = (db.questoesOcultas||[]).filter(o=>o.usuarioId===u.id);
  if(!minhas.length) return;
  db.questoesOcultas = db.questoesOcultas.filter(o=>o.usuarioId!==u.id);
  minhas.forEach(o=>nuvemRegistrar({questaoOculta:{usuarioId:u.id, questaoId:o.questaoId, data:hojeISO(), removido:true}}));
  saveState();
  toast(minhas.length+" questões voltaram para o seu estudo.");
  render();
}
function praticarAssunto(assuntoId){
  const pool = questoesParaEstudo(usuarioAtual().id).filter(q=>q.assuntoId===assuntoId);
  const itens = embaralharSemRepetir(usuarioAtual().id, pool).slice(0,15).map(q=>({questaoId:q.id, motivo:"Revisão do assunto: "+nomeAssunto(assuntoId)}));
  iniciarSessaoComLista(itens, "pratica");
}
