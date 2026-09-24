/* Esc — codigo/13-admin-e-inicializacao.js  (parte 13 de 13)
   Blocos de Estudo, Configurações, versão nova/cache antigo e a INICIALIZAÇÃO da plataforma (sempre o último arquivo).
   Os arquivos de codigo/ são carregados em ordem pelo index.html (lista
   ESC_ARQUIVOS.codigo) e dividem o mesmo espaço: uma função escrita num
   arquivo é usada nos outros sem import. */

/* ==========================================================================
   27. ADMIN — Blocos de Estudo (calendário oficial) / Configurações Gerais
   ========================================================================== */
// editor de calendário reutilizável: serve tanto para o calendário oficial
// (Admin) quanto para o calendário de um grupo/turma criado por um aluno
function renderEditorCalendario(grupo, opts){
  opts = opts || {};
  const podeEditar = opts.podeEditar !== false;
  const usuario = opts.usuario || usuarioAtual();
  // o ano da turma pode ser um sem calendário próprio ("Formado(a)"); a
  // sequência mostrada é então a do ano de referência, e é o nome dela que
  // precisa aparecer — dizer "sequência de Formado(a)" seria mentira
  const ano = anoDeReferencia(anoDoGrupo(grupo, usuario));
  const atual = blocoAtualDoGrupo(grupo, usuario);
  const sequencia = sequenciaDoAno(ano);
  const blocosOrdenados = blocosDoGrupo(grupo, usuario);
  const deslocamento = normalizarDeslocamento(grupo.deslocamento, sequencia.length);
  // por onde esta turma começa o ano: pelo quadro do ano, quando ele existe
  const blocoDeInicio = conteudoDaJanela(sequencia, rotuloRodizio(ano, deslocamento), deslocamento, 0);
  const rodizios = opcoesRodizioPorLetra(ano);
  return `
  <div class="card-flat mb-2 text-sm">
    ${iconeSvg("calendar")} <strong>Sequência de ${escapeHtml(ano)}</strong> — ${sequencia.length} bloco(s).
    ${grupo.oficial
      ? "Este é o calendário oficial: cada aluno vê a sequência do ano dele, começando pelo primeiro bloco (o " + escapeHtml(nomeRodizio(ano, 0)) + "). Quem está em outra turma do rodízio precisa escolhê-la em Meu Grupo para ver o bloco certo."
      : `Esta turma é o <strong>${escapeHtml(nomeRodizio(ano, deslocamento))}</strong>: começa em <strong>${escapeHtml(blocoDeInicio?blocoDeInicio.nome:"—")}</strong> e segue daí em diante, voltando ao começo quando chega ao fim.`}
  </div>

  ${podeEditar && !grupo.oficial ? `
  <div class="card mb-2">
    <div class="card-title">Grupo do rodízio desta turma</div>
    <p class="text-sm muted">O que muda de uma turma para outra é só isto: por qual bloco da sequência ela entra. Todo mundo do mesmo ano passa pelos mesmos blocos, em rodízio — as letras são as do calendário da faculdade.</p>
    <select class="select" style="max-width:520px" onchange="mudarDeslocamentoGrupo('${grupo.id}', this.value)">
      ${rodizios.map(o=>`<option value="${o.deslocamento}" ${deslocamento===o.deslocamento?"selected":""}>Grupo ${escapeHtml(o.rotulo)} — começa em ${escapeHtml(o.bloco.nome)}</option>`).join("")}
    </select>
  </div>` : ""}

  ${podeEditar ? `
  <div class="card mb-2">
    <div class="card-title">Bloco atual</div>
    <p class="text-sm muted">Por padrão, o bloco atual é detectado pela data de hoje. Você pode fixar manualmente se o calendário sair do previsto.</p>
    <select class="select" style="max-width:420px" onchange="fixarBlocoAtual('${grupo.id}', this.value)">
      <option value="">Automático por data (hoje: ${escapeHtml(atual?atual.nome:"—")})</option>
      ${blocosOrdenados.map(b=>`<option value="${b.id}" ${grupo.blocoAtualIdManual===b.id?"selected":""}>${escapeHtml(b.nome)}</option>`).join("")}
    </select>
  </div>` : ""}

  <div class="flex justify-between items-center mb-1">
    <div class="card-title" style="margin-bottom:0">Calendário desta turma${grupo.oficial?"":" (sequência já girada)"}</div>
    ${podeEditar && opts.podeEditarSequencia ? `<button class="btn btn-primary btn-sm" onclick="abrirFormularioBloco('${escapeHtml(ano)}', null)">${iconeSvg("plus")} Adicionar bloco à sequência</button>` : ""}
  </div>
  ${blocosOrdenados.map(b=>`
    <div class="card mb-1" ${atual&&b.id===atual.id?'style="border-color:var(--accent)"':""}>
      <div class="flex justify-between items-start">
        <div>
          ${atual&&b.id===atual.id?'<span class="badge badge-accent mb-1">Bloco atual</span>':""}
          <div style="font-weight:700">${b.ordem}. ${escapeHtml(b.nome)}</div>
          <div class="text-sm muted mt-1">${formatDataBR(b.dataInicio)} – ${formatDataBR(b.dataFim)}</div>
          <div class="text-xs muted mt-1">${b.especialidadeIds.map(id=>escapeHtml(nomeEspecialidade(id))).join(", ")}</div>
        </div>
        ${podeEditar && opts.podeEditarSequencia ? `<div class="flex gap-1">
          <button class="icon-btn" title="Editar" onclick="abrirFormularioBloco('${escapeHtml(ano)}','${b.id}')">${iconeSvg("edit")}</button>
          <button class="icon-btn" title="Excluir" onclick="confirmarExcluirBloco('${escapeHtml(ano)}','${b.id}')">${iconeSvg("trash")}</button>
        </div>` : ""}
      </div>
    </div>`).join("")}
  ${podeEditar && opts.podeEditarSequencia ? `<p class="text-xs muted mt-2">Editar aqui muda a sequência do ano inteiro, para todas as turmas daquele ano <strong>neste navegador</strong> — é isso que garante que todo mundo que abre a plataforma aqui passe pela mesma matéria. Evite datas se sobrepondo: a ordem cronológica das datas de início é o que define o que é bloco passado e bloco futuro. Para o resto da turma, do celular ou de casa, ver os mesmos blocos, é preciso <strong>exportar e publicar</strong> — veja o aviso no topo desta página.</p>` : ""}`;
}
function renderBlocosConfig(){
  const anos = anosComCalendario();
  const escolhido = state.filtroRota.anoBlocos;
  const anoEscolhido = anos.includes(escolhido) ? escolhido : (anos.includes(CONFIG.anoFaculdadePadrao) ? CONFIG.anoFaculdadePadrao : anos[0]);
  const sequencia = sequenciaDoAno(anoEscolhido);
  const porLetra = opcoesRodizioPorLetra(anoEscolhido);
  const turmas = db.grupos.filter(g=>!g.oficial && anoDoGrupo(g)===anoEscolhido);
  return `
  <div class="page-header"><h2>Blocos de Estudo</h2><p>A sequência de blocos pertence ao <strong>ano da faculdade</strong>: todas as turmas daquele ano passam pelos mesmos blocos, na mesma ordem. O que muda de uma turma para outra é por qual bloco ela começa — o rodízio, os Grupos A, B, C e D.</p></div>

  ${nuvemConectado() ? `
  <div class="card mb-2">
    <div class="card-title">${iconeSvg("check")} Sincroniza sozinho pela nuvem</div>
    <p class="text-sm muted">Salvar um bloco aqui envia a sequência do ano para a nuvem em poucos segundos, e qualquer aluno com conta recebe na próxima vez que a plataforma sincronizar (ao abrir, ao voltar para a aba, ao voltar a internet e a cada 45 segundos com a aba aberta). Não precisa exportar nem publicar o site de novo para isto.</p>
    <p class="text-xs muted mt-1">Isto vale só para a <strong>sequência de blocos</strong>. Turmas (a que ano cada uma pertence, em qual grupo do rodízio está) continuam só neste navegador — ver o aviso mais abaixo, junto da tabela de turmas.</p>
    <button class="btn btn-secondary btn-sm mt-1" onclick="exportarCalendario()">${iconeSvg("archive")} Exportar mesmo assim (baixa um arquivo à parte)</button>
  </div>` : `
  <div class="card mb-2" style="border-color:var(--amber)">
    <div class="card-title">${iconeSvg("alert")} O que você edita aqui vale só neste navegador</div>
    <p class="text-sm muted">A nuvem não está ligada, então o calendário de blocos é <strong>conteúdo</strong>, igual às questões: mudanças feitas por esta tela ficam guardadas só no navegador de quem editou — os alunos não recebem a mudança sozinhos. Para toda a turma ver o mesmo calendário, é preciso <strong>exportar</strong> e colocar o arquivo no lugar do <code>dados/calendario.js</code> do site, publicando de novo. (Com a nuvem ligada — ver <code>nuvem/LEIA-ME.md</code> —, isto sobe sozinho, sem precisar exportar nada.)</p>
    <button class="btn btn-primary btn-sm mt-1" onclick="exportarCalendario()">${iconeSvg("archive")} Exportar calendário (dados/calendario.js)</button>
    <p class="text-xs muted mt-2">O arquivo baixado tem tudo o que está neste navegador — todos os anos, com as edições de agora. Troque o <code>dados/calendario.js</code> do projeto por ele e publique; veja <code>dados/LEIA-ME.md</code> para o passo a passo de publicar.</p>
  </div>`}

  <div class="card mb-2">
    <div class="card-title">Ano da faculdade</div>
    <p class="text-sm muted mb-2">Escolha de qual ano você quer editar a sequência. Cada ano tem a sua, porque a matéria é diferente.</p>
    <div class="seletor-periodo">
      ${anos.map(a=>`<button class="pill ${a===anoEscolhido?"active":""}" onclick="mudarAnoBlocos('${escapeHtml(a)}')">${escapeHtml(a)}</button>`).join("")}
    </div>
    ${(CONFIG.anosSemCalendario||[]).length ? `<p class="text-xs muted mt-2">${escapeHtml((CONFIG.anosSemCalendario||[]).join(", "))} não aparece aqui de propósito: quem já se formou não cursa calendário de faculdade. Continua podendo entrar numa turma — e aí acompanha o calendário do ano dela.</p>` : ""}
  </div>

  <div class="card mb-2">
    <div class="flex justify-between items-center mb-1" style="flex-wrap:wrap;gap:.5rem">
      <div class="card-title" style="margin-bottom:0">Sequência de ${escapeHtml(anoEscolhido)} (${sequencia.length} blocos)</div>
      <div class="flex gap-1" style="flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="abrirModalViradaDeAno('${escapeHtml(anoEscolhido)}')">${iconeSvg("calendar")} Virada de ano letivo</button>
        <button class="btn btn-primary btn-sm" onclick="abrirFormularioBloco('${escapeHtml(anoEscolhido)}', null)">${iconeSvg("plus")} Adicionar bloco</button>
      </div>
    </div>
    <p class="text-sm muted mb-2">Esta é a ordem pela qual todas as turmas deste ano passam, e as datas são as janelas do calendário. As setas mudam a ordem: o conteúdo troca de janela e o rodízio inteiro anda junto. A letra ao lado de cada bloco é a <strong>turma que começa nele</strong>.</p>
    <div class="mt-2">
    ${sequencia.map((b,i)=>`
      <div class="card-flat mb-1">
        <div class="flex justify-between items-start gap-2" style="flex-wrap:wrap">
          <div>
            <div style="font-weight:700">${b.ordem}. ${escapeHtml(b.nome)} <span class="badge badge-accent">${escapeHtml(nomeRodizio(anoEscolhido, i))} começa aqui</span></div>
            <div class="text-sm muted mt-1">${formatDataBR(b.dataInicio)} – ${formatDataBR(b.dataFim)} · ${diasEntre(b.dataInicio, b.dataFim)+1} dias</div>
            <div class="text-xs muted mt-1">${b.especialidadeIds.map(id=>escapeHtml(nomeEspecialidade(id))).join(", ")}</div>
          </div>
          <div class="flex gap-1">
            <button class="icon-btn" title="Subir na sequência" ${i===0?"disabled":""} onclick="moverBlocoNaSequencia('${escapeHtml(anoEscolhido)}','${b.id}',-1)">${iconeSvg("arrow-up")}</button>
            <button class="icon-btn" title="Descer na sequência" ${i===sequencia.length-1?"disabled":""} onclick="moverBlocoNaSequencia('${escapeHtml(anoEscolhido)}','${b.id}',1)">${iconeSvg("arrow-down")}</button>
            <button class="icon-btn" title="Editar" onclick="abrirFormularioBloco('${escapeHtml(anoEscolhido)}','${b.id}')">${iconeSvg("edit")}</button>
            <button class="icon-btn" title="Excluir" onclick="confirmarExcluirBloco('${escapeHtml(anoEscolhido)}','${b.id}')">${iconeSvg("trash")}</button>
          </div>
        </div>
      </div>`).join("") || '<p class="text-sm muted">Este ano ainda não tem nenhum bloco. Adicione o primeiro.</p>'}
    </div>
  </div>

  ${sequencia.length ? `<div class="card mb-2">
    <div class="card-title">O rodízio de ${escapeHtml(anoEscolhido)}, janela por janela</div>
    <p class="text-sm muted mb-2">A mesma tabela que a faculdade distribui no papel: cada coluna é uma turma, cada linha é uma janela de data. É o que a plataforma entrega a cada aluno conforme o grupo dele.</p>
    ${sequencia.some(b=>Array.isArray(b.turmasPorJanela) && b.turmasPorJanela.length) ? `<p class="text-xs muted mb-2">${iconeSvg("alert")} Este ano <strong>não gira em ciclo</strong>: cada estágio traz a linha do quadro da faculdade (quem está nele em cada janela), como no 5º ano. Mudar nome, datas ou especialidades de um estágio é normal por aqui; trocar quem vai para onde exige editar essa linha em <code>dados/calendario.js</code>, para o quadro continuar batendo com o papel. Um estágio acrescentado aqui entra sem linha e volta a girar em ciclo.</p>` : ""}
    <div class="table-wrap"><table>
      <thead><tr><th>Período</th>${porLetra.map(o=>`<th>Grupo ${escapeHtml(o.rotulo)}</th>`).join("")}</tr></thead>
      <tbody>
        ${sequencia.map((janela,i)=>`<tr>
          <td class="text-sm">${formatDataBR(janela.dataInicio)} – ${formatDataBR(janela.dataFim)}</td>
          ${porLetra.map(o=>`<td class="text-sm">${escapeHtml((conteudoDaJanela(sequencia, o.rotulo, o.deslocamento, i)||{}).nome||"—")}</td>`).join("")}
        </tr>`).join("")}
      </tbody>
    </table></div>
  </div>` : ""}

  <div class="card">
    <div class="card-title">Turmas de ${escapeHtml(anoEscolhido)} e em qual grupo cada uma está</div>
    <p class="text-sm muted mb-2">Aqui a coordenação corrige o grupo de uma turma sem depender de quem a criou — é a mesma escolha que o aluno vê em Meu Grupo.</p>
    <p class="text-xs muted mb-2">Diferente da sequência de blocos acima, isto <strong>não sincroniza</strong> — a turma e o grupo dela existem só neste navegador. É a mesma ressalva de <code>nuvem/LEIA-ME.md</code> sobre "as turmas".</p>
    ${turmas.length ? `<div class="table-wrap"><table><thead><tr><th>Turma</th><th>Grupo do rodízio</th><th>Bloco de hoje</th><th>Membros</th></tr></thead><tbody>
      ${turmas.map(g=>{
        const atual = blocoAtualDoGrupo(g);
        const desloc = normalizarDeslocamento(g.deslocamento, sequencia.length);
        return `<tr>
          <td class="text-sm">${escapeHtml(g.nome)}</td>
          <td><select class="select" style="padding:.3rem .5rem" onchange="mudarDeslocamentoGrupo('${g.id}', this.value)">
            ${porLetra.map(o=>`<option value="${o.deslocamento}" ${desloc===o.deslocamento?"selected":""}>Grupo ${escapeHtml(o.rotulo)} — ${escapeHtml(o.bloco.nome)}</option>`).join("")}
          </select></td>
          <td class="text-sm">${escapeHtml(atual?atual.nome:"—")}</td>
          <td class="text-sm">${(g.membrosAprovados||[]).length}</td>
        </tr>`;
      }).join("")}
    </tbody></table></div>` : '<p class="text-sm muted">Nenhuma turma deste ano ainda. Alunos criam turmas em "Meu Grupo".</p>'}
  </div>`;
}
function mudarAnoBlocos(ano){ state.filtroRota.anoBlocos = ano; render(); }

/* ---------------------------- exportar o calendário -----------------------
   O calendário de blocos é conteúdo, como as questões: o que é editado por
   esta tela fica só no navegador de quem editou (não vai para a nuvem, não
   chega aos alunos sozinho — ver nuvem/LEIA-ME.md). Isto gera o arquivo no
   formato que dados/calendario.js espera, com TUDO que está neste navegador
   agora — todos os anos, já com as edições —, pronto para substituir o
   arquivo do projeto e ser publicado. É o mesmo caminho 2 do
   dados/LEIA-ME.md, só que sem precisar copiar e colar à mão. */
function textoExportacaoCalendario(){
  const dados = {
    blocos: db.sequenciasAno[CONFIG.anoFaculdadePadrao] || [],
    sequenciasAno: db.sequenciasAno || {},
  };
  return `/* ==========================================================================
   CALENDÁRIO DE BLOCOS — a ordem em que a matéria é estudada
   ==========================================================================
   Gerado por "Exportar calendário" (Admin > Blocos de Estudo) em ${hojeISO()},
   a partir do que estava editado no navegador de quem exportou. Substitua o
   dados/calendario.js do projeto por este arquivo (mesmo nome, mesma pasta)
   e publique o site de novo: é isso que leva a mudança para todo mundo —
   editar pela tela muda o calendário só naquele navegador. Ver
   dados/LEIA-ME.md.
   ========================================================================== */
window.EscDados.registrarCalendario("calendario", ${JSON.stringify(dados, null, 2)});
`;
}
function exportarCalendario(){
  const texto = textoExportacaoCalendario();
  const blob = new Blob([texto], {type:"text/javascript"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "calendario.js";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 4000);
  toast("Baixado \"calendario.js\". Troque o dados/calendario.js do projeto por ele e publique o site de novo — só assim a mudança chega aos alunos.");
}
/* ---------------------------- a ordem da sequência ------------------------
   "Indicar a sequência do internato" (ou de qualquer ano) é dizer qual
   matéria vem antes de qual. As janelas de data são do calendário e não se
   mexem; o que troca de lugar é o CONTEÚDO dentro delas — por isso mover um
   bloco é trocar as datas entre ele e o vizinho e reordenar por data.

   A letra do rodízio (`grupoRodizio`) fica com a POSIÇÃO, não com o
   conteúdo: "o Grupo A é quem começa pelo primeiro bloco" continua valendo
   depois de reordenar, só que agora o primeiro bloco é outro. Por isso ela
   é trocada de volta junto com as datas. */
function moverBlocoNaSequencia(ano, blocoId, direcao){
  const seq = sequenciaDoAno(ano);            // já em ordem de data
  const i = seq.findIndex(b=>b.id===blocoId);
  const j = i + (direcao<0 ? -1 : 1);
  if(i<0 || j<0 || j>=seq.length) return;
  const a = seq[i], b = seq[j];
  [a.dataInicio, b.dataInicio] = [b.dataInicio, a.dataInicio];
  [a.dataFim,    b.dataFim]    = [b.dataFim,    a.dataFim];
  const rodizioA = a.grupoRodizio, rodizioB = b.grupoRodizio;
  if(rodizioB===undefined) delete a.grupoRodizio; else a.grupoRodizio = rodizioB;
  if(rodizioA===undefined) delete b.grupoRodizio; else b.grupoRodizio = rodizioA;
  renumerarBlocosPorData(ano);
  nuvemMarcarCalendarioPendente(ano);
  saveState();
  toast('"'+a.nome+'" agora é o bloco '+a.ordem+' de '+ano+'.');
  render();
}

/* ---------------------------- virada de ano letivo -----------------------
   Em 2027 as datas não são as de 2026, mas a ESTRUTURA é a mesma: mesmos
   blocos, mesma duração, mesmos intervalos entre um e outro. Reescrever oito
   pares de datas à mão para isso é onde se erra. Aqui a coordenação informa
   só a data em que o primeiro bloco começa e a sequência inteira anda junto,
   preservando a duração de cada bloco e o intervalo até o próximo (o fim de
   semana entre dois blocos, o recesso no meio do ano). Depois, se um bloco
   específico mudou de tamanho, edita-se aquele bloco. */
function previaViradaDeAno(ano, novaDataInicio){
  const seq = sequenciaDoAno(ano);
  if(!seq.length || !novaDataInicio) return [];
  const delta = diasEntre(seq[0].dataInicio, novaDataInicio);
  return seq.map(b=>({
    id: b.id, nome: b.nome,
    de: b.dataInicio, ate: b.dataFim,
    novoInicio: somarDias(b.dataInicio, delta),
    novoFim: somarDias(b.dataFim, delta),
  }));
}
function abrirModalViradaDeAno(ano){
  const seq = sequenciaDoAno(ano);
  if(!seq.length){ toast("Este ano ainda não tem blocos para deslocar.", "err"); return; }
  abrirModal(`
    <div class="modal-header"><h3>Virada de ano letivo — ${escapeHtml(ano)}</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <p class="text-sm muted mb-2">Informe quando o <strong>primeiro bloco</strong> começa no ano letivo novo. Todas as janelas andam o mesmo tanto de dias, mantendo a duração de cada bloco e os intervalos entre eles. Nada mais muda: mesmos blocos, mesma ordem, mesmos grupos do rodízio.</p>
    <div class="field" style="max-width:260px"><label class="label">Nova data de início do bloco 1</label>
      <input class="input" type="date" id="viradaInicio" value="${seq[0].dataInicio}" oninput="atualizarPreviaVirada('${escapeHtml(ano)}')">
      <div class="hint mt-1">Hoje o bloco 1 começa em ${formatDataBR(seq[0].dataInicio)}.</div>
    </div>
    <div id="viradaPrevia"></div>
    <div class="flex gap-1 mt-2"><button class="btn btn-primary" onclick="aplicarViradaDeAno('${escapeHtml(ano)}')">Aplicar as novas datas</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>
  `, "lg");
  atualizarPreviaVirada(ano);
}
function atualizarPreviaVirada(ano){
  const caixa = document.getElementById("viradaPrevia"); if(!caixa) return;
  const nova = document.getElementById("viradaInicio").value;
  const linhas = previaViradaDeAno(ano, nova);
  if(!linhas.length){ caixa.innerHTML = '<p class="text-sm muted">Escolha uma data para ver como fica.</p>'; return; }
  const delta = diasEntre(sequenciaDoAno(ano)[0].dataInicio, nova);
  caixa.innerHTML = `
    <p class="text-sm mt-1">${delta===0 ? "Nenhum deslocamento — as datas ficam como estão." : (delta>0 ? "Tudo anda <strong>"+delta+" dia(s) para a frente</strong>." : "Tudo volta <strong>"+Math.abs(delta)+" dia(s)</strong>.")}</p>
    <div class="table-wrap mt-1"><table>
      <thead><tr><th>Bloco</th><th>Hoje</th><th>Fica</th></tr></thead>
      <tbody>${linhas.map(l=>`<tr>
        <td class="text-sm">${escapeHtml(l.nome)}</td>
        <td class="text-sm muted">${formatDataBR(l.de)} – ${formatDataBR(l.ate)}</td>
        <td class="text-sm" style="font-weight:600">${formatDataBR(l.novoInicio)} – ${formatDataBR(l.novoFim)}</td>
      </tr>`).join("")}</tbody>
    </table></div>`;
}
function aplicarViradaDeAno(ano){
  const campo = document.getElementById("viradaInicio");
  const nova = campo ? campo.value : "";
  if(!nova){ toast("Escolha a data de início do primeiro bloco.", "err"); return; }
  const linhas = previaViradaDeAno(ano, nova);
  if(!linhas.length){ toast("Este ano não tem blocos para deslocar.", "err"); return; }
  const porId = {};
  linhas.forEach(l=>{ porId[l.id] = l; });
  (db.sequenciasAno[anoDeReferencia(ano)]||[]).forEach(b=>{
    const l = porId[b.id];
    if(l){ b.dataInicio = l.novoInicio; b.dataFim = l.novoFim; }
  });
  renumerarBlocosPorData(anoDeReferencia(ano));
  // turma que estava com um bloco fixado à mão volta à detecção por data:
  // num ano letivo novo, o bloco fixado é sempre do ano anterior
  db.grupos.forEach(g=>{ if(anoDoGrupo(g)===ano) g.blocoAtualIdManual = null; });
  nuvemMarcarCalendarioPendente(anoDeReferencia(ano));
  saveState();
  fecharModal();
  toast("Calendário de "+ano+" deslocado — o primeiro bloco começa em "+formatDataBR(nova)+"."+(nuvemConectado()?" Subindo para a nuvem.":""));
  render();
}
function mudarDeslocamentoGrupo(grupoId, valor){
  const grupo = getGrupo(grupoId); if(!grupo) return;
  grupo.deslocamento = parseInt(valor) || 0;
  // fixar bloco manualmente e girar a turma ao mesmo tempo dá resultado
  // confuso: ao mudar o rodízio, a detecção volta a ser pela data
  grupo.blocoAtualIdManual = null;
  saveState();
  toast("Turma movida para o " + nomeRodizio(anoDoGrupo(grupo), grupo.deslocamento) + ".");
  render();
}
function fixarBlocoAtual(grupoId, blocoId){
  const grupo = getGrupo(grupoId); if(!grupo) return;
  grupo.blocoAtualIdManual = blocoId || null;
  saveState();
  toast(blocoId ? "Bloco atual fixado manualmente." : "Voltou para detecção automática por data.");
  render();
}
function renumerarBlocosPorData(ano){
  const seq = db.sequenciasAno[anoDeReferencia(ano)] || [];
  seq.sort((a,b)=>a.dataInicio.localeCompare(b.dataInicio));
  seq.forEach((b,i)=>{ b.ordem = i+1; });
}
/* O formulário de bloco agora edita a SEQUÊNCIA DE UM ANO, não o calendário
   de um grupo: mexer aqui vale para todas as turmas daquele ano. */
function abrirFormularioBloco(ano, blocoId){
  ano = anoDeReferencia(ano);
  const seq = db.sequenciasAno[ano] || [];
  const b = blocoId ? seq.find(x=>x.id===blocoId) : null;
  const posicao = b ? sequenciaDoAno(ano).findIndex(x=>x.id===b.id) : seq.length;
  abrirModal(`
    <div class="modal-header"><h3>${b?"Editar bloco":"Adicionar bloco"} — ${escapeHtml(ano)}</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <p class="text-sm muted mb-2">Este bloco vale para <strong>todas as turmas de ${escapeHtml(ano)}</strong>. Cada turma passa por ele numa janela de data diferente, conforme o bloco em que começou.</p>
    <div class="field"><label class="label">Nome do bloco</label><input class="input" id="fbNome" value="${escapeHtml(b?b.nome:"")}" placeholder="Ex.: Cardiologia &amp; Pneumologia"></div>
    <div class="field" style="max-width:280px"><label class="label">Turma que começa neste bloco</label>
      <input class="input" id="fbRodizio" maxlength="4" value="${escapeHtml((b&&b.grupoRodizio)||"")}" placeholder="${escapeHtml(letraPadraoRodizio(posicao<0?0:posicao))}">
      <div class="hint mt-1">A letra do calendário impresso da faculdade (A, B, C, D…). É o grupo do rodízio que entra por este bloco — no 3º ano as letras não seguem a ordem alfabética, e é por isso que elas se escrevem aqui em vez de serem contadas. Em branco, vale a ordem alfabética (${escapeHtml(letraPadraoRodizio(posicao<0?0:posicao))} nesta posição).</div>
    </div>
    <div class="grid grid-2">
      <div class="field"><label class="label">Data de início</label><input class="input" type="date" id="fbInicio" value="${b?b.dataInicio:""}"></div>
      <div class="field"><label class="label">Data de fim</label><input class="input" type="date" id="fbFim" value="${b?b.dataFim:""}"></div>
    </div>
    <div class="field"><label class="label">Especialidades trabalhadas neste bloco</label>
      <div class="grid grid-2">
        ${db.taxonomia.areas.map(area=>`
          <div>
            <div class="text-xs muted" style="font-weight:700;margin:.4rem 0 .2rem">${escapeHtml(area.nome)}</div>
            ${db.taxonomia.especialidades.filter(e=>e.areaId===area.id).map(e=>`<label class="checkbox-row mb-1"><input type="checkbox" class="fbEsp" value="${e.id}" ${b&&b.especialidadeIds.includes(e.id)?"checked":""}> ${escapeHtml(e.nome)}</label>`).join("")}
          </div>`).join("")}
      </div>
    </div>
    <div class="flex gap-1 mt-1"><button class="btn btn-primary" onclick="salvarBlocoFormulario('${escapeHtml(ano)}','${blocoId||""}')">Salvar</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>
  `, "lg");
}
function salvarBlocoFormulario(ano, blocoId){
  ano = anoDeReferencia(ano);
  if(!db.sequenciasAno[ano]) db.sequenciasAno[ano] = [];
  const seq = db.sequenciasAno[ano];
  const nome = document.getElementById("fbNome").value.trim();
  const dataInicio = document.getElementById("fbInicio").value;
  const dataFim = document.getElementById("fbFim").value;
  const grupoRodizio = (document.getElementById("fbRodizio").value||"").trim().toUpperCase();
  const especialidadeIds = [...document.querySelectorAll(".fbEsp:checked")].map(el=>el.value);
  if(!nome || !dataInicio || !dataFim){ toast("Preencha nome, data de início e data de fim.", "err"); return; }
  if(dataFim < dataInicio){ toast("A data de fim não pode ser antes da data de início.", "err"); return; }
  if(!especialidadeIds.length){ toast("Selecione ao menos uma especialidade para este bloco.", "err"); return; }
  const repetida = seq.find(x=>x.id!==blocoId && x.grupoRodizio && grupoRodizio && x.grupoRodizio===grupoRodizio);
  if(repetida){ toast('O grupo "'+grupoRodizio+'" já começa em "'+repetida.nome+'". Cada turma entra por um bloco só.', "err"); return; }
  if(blocoId){
    const alvo = seq.find(x=>x.id===blocoId);
    Object.assign(alvo, {nome, dataInicio, dataFim, especialidadeIds});
    if(grupoRodizio) alvo.grupoRodizio = grupoRodizio; else delete alvo.grupoRodizio;
  }
  else{
    const novoBloco = {id:uid("bloco"), ordem:seq.length+1, nome, dataInicio, dataFim, especialidadeIds};
    if(grupoRodizio) novoBloco.grupoRodizio = grupoRodizio;
    seq.push(novoBloco);
  }
  renumerarBlocosPorData(ano);
  nuvemMarcarCalendarioPendente(ano);
  saveState();
  fecharModal();
  toast(blocoId
    ? "Bloco atualizado" + (nuvemConectado() ? " — subindo para a nuvem." : " para todas as turmas deste ano, neste navegador.")
    : "Bloco adicionado à sequência" + (nuvemConectado() ? " — subindo para a nuvem." : " deste ano, neste navegador."));
  render();
}
function confirmarExcluirBloco(ano, blocoId){
  ano = anoDeReferencia(ano);
  const seq = db.sequenciasAno[ano] || [];
  if(seq.length<=1){ toast("A sequência precisa ter pelo menos um bloco.", "err"); return; }
  abrirModal(`<div class="modal-header"><h3>Excluir bloco de ${escapeHtml(ano)}</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div><p>Isso remove o bloco da sequência de <strong>${escapeHtml(ano)}</strong>, para todas as turmas desse ano. Simulados já recomendados para ele continuam existindo, só deixam de ter um bloco de referência. Esta ação não pode ser desfeita.</p><div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="excluirBlocoConfirmado('${escapeHtml(ano)}','${blocoId}')">Excluir mesmo assim</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function excluirBlocoConfirmado(ano, blocoId){
  ano = anoDeReferencia(ano);
  if(!db.sequenciasAno[ano]) return;
  db.sequenciasAno[ano] = db.sequenciasAno[ano].filter(b=>b.id!==blocoId);
  // turma que estava fixada nesse bloco volta para a detecção por data, e
  // deslocamento maior que a sequência é trazido de volta para dentro dela
  const tamanho = db.sequenciasAno[ano].length || 1;
  db.grupos.forEach(g=>{
    if(g.blocoAtualIdManual===blocoId) g.blocoAtualIdManual = null;
    if(anoDoGrupo(g)===ano) g.deslocamento = (g.deslocamento||0) % tamanho;
  });
  renumerarBlocosPorData(ano);
  nuvemMarcarCalendarioPendente(ano);
  saveState();
  fecharModal();
  toast("Bloco excluído da sequência" + (nuvemConectado() ? " — subindo para a nuvem." : ", neste navegador."));
  render();
}
function renderConfigGeral(){
  const cg = db.configGeral;
  const pesos = cg.pesosDificuldade || CONFIG.pesosDificuldade;
  const rampa = cg.rampaRevisaoInicio || CONFIG.rampaRevisaoInicio;
  return `
  <div class="page-header"><h2>Configurações Gerais</h2><p>Ajuste os parâmetros que orientam o algoritmo de estudo para todos os alunos.</p></div>
  <div class="card mb-2"><div class="card-title">Metas de estudo</div>
    <div class="grid grid-3">
      <div class="field"><label class="label">Meta mínima recomendada (questões/dia)</label><input class="input" id="cfgMetaMinima" type="number" value="${cg.metaMinimaQuestoesDia}"></div>
      <div class="field"><label class="label">Meta ideal recomendada (questões/dia)</label><input class="input" id="cfgMetaIdeal" type="number" value="${cg.metaRecomendadaQuestoesDia}"></div>
      <div class="field"><label class="label">Meta recomendada de cartões/dia</label><input class="input" id="cfgMetaCartoes" type="number" value="${cg.metaCartoesDia || CONFIG.metaCartoesDia}"><div class="hint">Vale para quem estuda por flashcard; cada aluno pode ajustar a sua.</div></div>
    </div>
  </div>
  <div class="card mb-2"><div class="card-title">Mistura da sessão recomendada</div><p class="text-xs muted">Os três valores são normalizados para somar 100% ao salvar.</p>
    <div class="grid grid-3">
      <div class="field"><label class="label">Bloco atual (%)</label><input class="input" id="cfgMisturaAtual" type="number" value="${Math.round(cg.misturaBlocos.atual*100)}"></div>
      <div class="field"><label class="label">Revisão de passados (%)</label><input class="input" id="cfgMisturaRevisao" type="number" value="${Math.round(cg.misturaBlocos.revisaoPassados*100)}"></div>
      <div class="field"><label class="label">Prévia de futuros (%)</label><input class="input" id="cfgMisturaPrevia" type="number" value="${Math.round(cg.misturaBlocos.previaFuturos*100)}"></div>
    </div>
  </div>
  <div class="card mb-2"><div class="card-title">Revisão no começo do ano</div>
    <p class="text-xs muted">Quando o aluno tem matéria de anos anteriores (blocos de calendários passados ou questões respondidas em outro ano), a revisão roda na proporção cheia desde o primeiro bloco, usando esse material. Quando não há nada anterior, estes são os tetos de revisão dos três primeiros blocos — o que sobra vai para o bloco atual.</p>
    <div class="grid grid-3">
      <div class="field"><label class="label">1º bloco/mês (%)</label><input class="input" id="cfgRampa1" type="number" min="0" max="100" value="${Math.round((rampa[0]||0)*100)}"></div>
      <div class="field"><label class="label">2º bloco/mês (%)</label><input class="input" id="cfgRampa2" type="number" min="0" max="100" value="${Math.round((rampa[1]||0)*100)}"></div>
      <div class="field"><label class="label">3º bloco/mês (%)</label><input class="input" id="cfgRampa3" type="number" min="0" max="100" value="${Math.round((rampa[2]||0)*100)}"></div>
    </div>
  </div>
  <div class="card mb-2"><div class="card-title">Peso de cada fator na dificuldade progressiva</div><p class="text-xs muted">Também normalizados para somar 100%. Padrão: mais peso para a taxa de acerto real dos alunos.</p>
    <div class="grid grid-3">
      <div class="field"><label class="label">Taxa de acerto (%)</label><input class="input" id="cfgPesoTaxa" type="number" value="${Math.round(pesos.taxaAcerto*100)}"></div>
      <div class="field"><label class="label">Especificidade (%)</label><input class="input" id="cfgPesoEspecificidade" type="number" value="${Math.round(pesos.especificidade*100)}"></div>
      <div class="field"><label class="label">Prevalência (%)</label><input class="input" id="cfgPesoPrevalencia" type="number" value="${Math.round(pesos.prevalencia*100)}"></div>
    </div>
  </div>
  <button class="btn btn-primary" onclick="salvarConfigGeral()">Salvar configurações</button>

  <div class="card mt-3">
    <div class="card-title">${iconeSvg("star")} Livro de Ouro</div>
    <p class="text-sm muted">Doações, colaborações e apoios que sustentam a plataforma. Saiu do menu lateral — agora aparece no rodapé da tela inicial, que é onde é lido de fato, e é administrado aqui.</p>
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      <button class="btn btn-secondary btn-sm" onclick="navigate('livro-ouro')">Abrir o Livro de Ouro</button>
      ${podeAdmin("livro-ouro") ? `<button class="btn btn-primary btn-sm" onclick="abrirFormularioLivroOuro(null)">${iconeSvg("plus")} Registrar agradecimento</button>` : ""}
      ${podeAdmin("livro-ouro") && nuvemConectado() ? `<button class="btn btn-ghost btn-sm" onclick="enviarLivroOuroParaNuvem()">${iconeSvg("upload")} Enviar todos para a nuvem</button>` : ""}
    </div>
    ${nuvemLigada() ? `<p class="text-xs muted mt-1">Com a nuvem ligada, cada registro salvo ou removido sobe sozinho e aparece para toda a turma. "Enviar todos" serve para os registros feitos antes disso, que ficaram só neste navegador.</p>` : ""}
  </div>

  ${renderCardArquivosConteudo()}

  ${podeAdmin("backup") ? renderCardBackup() : ""}`;
}
/* Mostra o que veio da pasta "dados/" nesta abertura da página. Serve para
   conferir, depois de publicar o site ou de copiar a pasta para outro
   computador, se todo o conteúdo chegou junto — e é o lugar onde a falta de
   um arquivo aparece por nome, em vez de virar "sumiram questões". */
function renderCardArquivosConteudo(){
  const r = resumoArquivosDeConteudo();
  return `<div class="card mt-3">
    <div class="card-title">${iconeSvg("database")} Arquivos de conteúdo</div>
    <p class="text-sm muted">Todo o conteúdo da plataforma — taxonomia, calendário, questões, flashcards, simulados e os dados de demonstração — fica em arquivos próprios, na pasta <code>dados/</code>, ao lado do arquivo da plataforma: o código de um lado, o conteúdo do outro. Isto é o que o navegador carregou agora.</p>
    ${r.arquivos.length ? `
      <div class="table-wrap mt-2"><table>
        <thead><tr><th>Arquivo</th><th>Conteúdo</th><th style="text-align:right">Itens</th></tr></thead>
        <tbody>${r.arquivos.map(a=>`<tr><td>dados/${escapeHtml(a.nome)}.js</td><td>${escapeHtml(a.tipo)}</td><td style="text-align:right">${a.itens}</td></tr>`).join("")}</tbody>
      </table></div>
      <p class="text-xs muted mt-2">Total carregado: ${r.questoes} ${r.questoes===1?"questão":"questões"}, ${r.flashcards} ${r.flashcards===1?"cartão":"cartões"}, ${r.simulados} ${r.simulados===1?"simulado":"simulados"}, ${r.taxonomia} ${r.taxonomia===1?"assunto":"assuntos"} e ${r.blocos} ${r.blocos===1?"bloco":"blocos"} de calendário. Estes números são o conteúdo que vem nos arquivos; o que os alunos criaram (respostas, cartões pessoais, questões enviadas) fica salvo no navegador e não aparece aqui.</p>`
    : `<p class="text-sm mt-2" style="color:var(--amber);font-weight:600">Nenhum arquivo de conteúdo foi carregado. Verifique se a pasta <code>dados/</code> está junto do index.html (e se ela foi publicada, quando o site está no ar).</p>`}
  </div>`;
}
function salvarConfigGeral(){
  const cg = db.configGeral;
  cg.metaMinimaQuestoesDia = parseInt(document.getElementById("cfgMetaMinima").value) || cg.metaMinimaQuestoesDia;
  cg.metaRecomendadaQuestoesDia = parseInt(document.getElementById("cfgMetaIdeal").value) || cg.metaRecomendadaQuestoesDia;
  cg.metaCartoesDia = parseInt(document.getElementById("cfgMetaCartoes").value) || cg.metaCartoesDia || CONFIG.metaCartoesDia;
  const a = parseInt(document.getElementById("cfgMisturaAtual").value)||0, r = parseInt(document.getElementById("cfgMisturaRevisao").value)||0, p = parseInt(document.getElementById("cfgMisturaPrevia").value)||0;
  const somaMistura = a+r+p;
  if(somaMistura>0) cg.misturaBlocos = {atual:a/somaMistura, revisaoPassados:r/somaMistura, previaFuturos:p/somaMistura};
  const r1 = parseInt(document.getElementById("cfgRampa1").value), r2 = parseInt(document.getElementById("cfgRampa2").value), r3 = parseInt(document.getElementById("cfgRampa3").value);
  cg.rampaRevisaoInicio = [isNaN(r1)?0:r1/100, isNaN(r2)?0.10:r2/100, isNaN(r3)?0.20:r3/100];
  const t = parseInt(document.getElementById("cfgPesoTaxa").value)||0, e = parseInt(document.getElementById("cfgPesoEspecificidade").value)||0, pr = parseInt(document.getElementById("cfgPesoPrevalencia").value)||0;
  const somaPesos = t+e+pr;
  if(somaPesos>0) cg.pesosDificuldade = {taxaAcerto:t/somaPesos, especificidade:e/somaPesos, prevalencia:pr/somaPesos};
  saveState();
  toast("Configurações salvas.");
  render();
}
/* ==========================================================================
   27-B. VERSÃO NOVA E CACHE ANTIGO
   ==========================================================================
   "Não consigo entrar", "o calendário não mudou", "a tela está diferente da
   do meu colega": quase sempre é o navegador abrindo a cópia que guardou da
   versão anterior. Aqui a plataforma confere sozinha, sem cache, se o
   servidor tem uma versão mais nova do que a que está rodando:
     - ao ABRIR a página, se tiver, recarrega na hora (a pessoa ainda não
       começou nada) — uma vez só por versão, para nunca virar um laço;
     - ao VOLTAR para a aba (no máximo a cada 10 minutos), se tiver, mostra
       uma tarja com "Atualizar agora", sem interromper quem está no meio de
       uma questão.
   A recarga usa um endereço com ?v=<versão nova>, que nenhuma cópia antiga
   atende. O estudo não se perde: ele está salvo no navegador (e na nuvem),
   não na página. Aberta com dois cliques (file://), não há servidor para
   consultar e nada disso roda. */
const CHAVE_RECARGA_VERSAO = "esc_recarregou_para_versao";
let _ultimaConferenciaVersao = 0;
function enderecoDaVersao(versao){
  return location.pathname + "?v=" + encodeURIComponent(versao) + (location.hash || "");
}
function recarregarVersaoNova(versao){
  try{ saveState(); }catch(e){ /* o que já estava salvo continua salvo */ }
  location.replace(enderecoDaVersao(versao || (window.ESC_VERSAO + "." + Date.now())));
}
async function versaoNoServidor(){
  if(!/^https?:$/.test(location.protocol) || typeof fetch !== "function") return null;
  try{
    const r = await fetch(location.pathname + "?conferir=" + Date.now(), { cache: "no-store" });
    if(!r.ok) return null;
    const m = /window\.ESC_VERSAO\s*=\s*"([^"]+)"/.exec(await r.text());
    return m ? m[1] : null;
  }catch(e){ return null; }   // sem internet: fica a versão que está aqui
}
async function verificarVersaoNova(aoAbrir){
  const agora = Date.now();
  if(!aoAbrir && agora - _ultimaConferenciaVersao < 10*60*1000) return;
  _ultimaConferenciaVersao = agora;
  const nova = await versaoNoServidor();
  if(!nova || nova === window.ESC_VERSAO) return;
  let jaTentou = null;
  try{ jaTentou = sessionStorage.getItem(CHAVE_RECARGA_VERSAO); }catch(e){}
  if(aoAbrir && jaTentou !== nova){
    try{ sessionStorage.setItem(CHAVE_RECARGA_VERSAO, nova); }catch(e){}
    recarregarVersaoNova(nova);
    return;
  }
  mostrarTarjaVersaoNova(nova);
}
function mostrarTarjaVersaoNova(nova){
  if(document.getElementById("tarjaVersaoNova")) return;
  const tarja = document.createElement("div");
  tarja.id = "tarjaVersaoNova";
  tarja.className = "aviso-dados";
  tarja.innerHTML = `<strong>Há uma versão nova da plataforma.</strong> Esta aba ainda está com a anterior.
    Atualizar não apaga nada — o seu estudo está salvo. <button class="btn btn-primary btn-sm" style="margin-left:.5rem" onclick="recarregarVersaoNova('${escapeHtml(nova)}')">Atualizar agora</button>`;
  document.body.insertBefore(tarja, document.body.firstChild);
}
/* Para quem não consegue entrar: as duas coisas que o navegador guarda e que
   podem estar velhas — a página e o acesso salvo da nuvem —, cada uma com
   um botão. Nenhuma das duas apaga estudo: respostas, revisões, favoritos e
   a fila que ainda não subiu continuam no navegador. */
function abrirAjudaAcesso(){
  abrirModalTitulado("Problemas para entrar?", `
    <p class="text-sm">Quase sempre é o navegador usando o que guardou de uma visita anterior. Tente na ordem:</p>
    <div class="card-flat mt-2">
      <div style="font-weight:600">1. Carregar a versão mais nova</div>
      <p class="text-xs muted mt-1">Busca a plataforma de novo no servidor, ignorando a cópia guardada. Esta aba está na versão ${escapeHtml(window.ESC_VERSAO||"?")}.</p>
      <button class="btn btn-primary btn-sm mt-1" onclick="recarregarVersaoNova()">${iconeSvg("refresh")} Carregar a versão mais nova</button>
    </div>
    <div class="card-flat mt-2">
      <div style="font-weight:600">2. Esquecer o acesso salvo neste navegador</div>
      <p class="text-xs muted mt-1">Descarta o login guardado (que pode ter vencido ou ser de outra conta) e volta para a tela de entrada. O seu estudo neste navegador fica onde está, inclusive o que ainda não subiu para a nuvem — ele sobe quando você entrar de novo.</p>
      <button class="btn btn-secondary btn-sm mt-1" onclick="esquecerAcessoSalvo()">${iconeSvg("logout")} Esquecer o acesso salvo</button>
    </div>
    <p class="text-xs muted mt-2">Se nada disso resolver, abra o site numa janela anônima: se lá funcionar, o problema é mesmo o que este navegador guardou.</p>`);
}
function esquecerAcessoSalvo(){
  nuvemSair();
  limparEstadoDasTelas();
  state.usuarioAtualId = null;
  fecharModal();
  toast("Acesso salvo esquecido. Entre de novo com e-mail e senha — o seu estudo continua aqui.");
  navigate("login");
}

/* ==========================================================================
   27-C. APLICATIVO INSTALÁVEL (PWA) — service worker, avisos e instalação
   ==========================================================================
   O sw.js, na raiz do site, faz três coisas (o comentário dele explica cada
   uma): abre a plataforma sem internet, avisa a meta com o app fechado onde
   o navegador deixa, e abre o Esc ao tocar no aviso. Só roda em site de
   verdade (http/https): aberto com dois cliques, não há service worker, e
   nada muda.

   Instalar: o Chrome/Edge oferecem o botão "Instalar" (guardamos o convite
   em _conviteInstalar para oferecê-lo também no Perfil); no iPhone, é
   Compartilhar > Adicionar à Tela de Início, e o Perfil diz isso. */
let _conviteInstalar = null;
function podeTerServiceWorker(){ return /^https?:$/.test(location.protocol) && "serviceWorker" in navigator; }
function registrarServiceWorker(){
  if(!podeTerServiceWorker()) return;
  navigator.serviceWorker.register("sw.js?v=" + encodeURIComponent(window.ESC_VERSAO || "")).catch(()=>{ /* sem service worker a plataforma funciona igual, só não abre offline */ });
}
function appEstaInstalado(){
  return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true;
}
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); _conviteInstalar = e; });
window.addEventListener("appinstalled", () => { _conviteInstalar = null; toast("Esc instalado. Ele aparece junto com os seus outros aplicativos."); });
function instalarApp(){
  if(!_conviteInstalar){ abrirComoInstalar(); return; }
  _conviteInstalar.prompt();
  _conviteInstalar.userChoice.finally(() => { _conviteInstalar = null; render(); });
}
function abrirComoInstalar(){
  abrirModalTitulado("Instalar o Esc como aplicativo", `
    <p class="text-sm">Instalado, o Esc abre sozinho numa janela própria, com ícone na tela inicial, funciona sem internet com a última versão aberta e pode avisar a meta do dia com o app fechado.</p>
    <div class="card-flat mt-2 text-sm"><strong>Android (Chrome):</strong> menu ⋮ &gt; <em>Instalar app</em> (ou <em>Adicionar à tela inicial</em>).</div>
    <div class="card-flat mt-1 text-sm"><strong>iPhone e iPad (Safari):</strong> botão Compartilhar &gt; <em>Adicionar à Tela de Início</em>.</div>
    <div class="card-flat mt-1 text-sm"><strong>Computador (Chrome ou Edge):</strong> o ícone de instalar na barra de endereço, à direita.</div>
    <p class="text-xs muted mt-2">O seu estudo não muda de lugar: ele continua salvo neste navegador (e na nuvem, se você entrou com a sua conta).</p>`);
}
function renderCardInstalarApp(){
  if(appEstaInstalado() || !/^https?:$/.test(location.protocol)) return "";
  return `<div class="card mt-2" style="max-width:460px">
    <div class="card-title">${iconeSvg("download")} Instalar como aplicativo</div>
    <p class="text-sm muted">Ícone na tela inicial, abre sem internet e avisa a meta do dia mesmo com o app fechado (Chrome e Edge).</p>
    <button class="btn btn-secondary btn-sm mt-1" onclick="instalarApp()">${_conviteInstalar ? "Instalar agora" : "Como instalar"}</button>
  </div>`;
}
/* Aviso do sistema. No Android, `new Notification()` não existe fora do
   service worker — o aviso tem de sair por ele. Onde não há service worker
   (arquivo aberto com dois cliques), vai pelo jeito antigo. */
function mostrarNotificacao(titulo, corpo, rota){
  const opcoes = { body: corpo, icon: "icones/icone-192.png", tag: "meta-do-dia", data: { rota: rota || "inicio" } };
  if(podeTerServiceWorker() && navigator.serviceWorker.controller){
    navigator.serviceWorker.ready.then(reg => reg.showNotification(titulo, opcoes)).catch(()=>{});
    return;
  }
  try{ new Notification(titulo, opcoes); }catch(e){ /* sem permissão ou sem suporte: fica o aviso dentro do app */ }
}
/* O recado que o service worker lê para decidir se avisa com o app fechado.
   Vai para o Cache Storage (o service worker não enxerga o localStorage). */
function atualizarRecadoLembrete(){
  if(!podeTerServiceWorker() || typeof caches === "undefined") return;
  const u = usuarioAtual();
  const ativo = !!(u && u.papel==="aluno" && u.lembreteMetaAtivo);
  let recado = { ativo: false };
  if(ativo){
    const faltamQ = Math.max(metaDoUsuario(u) - questoesRespondidasHoje(u.id), 0);
    const faltamC = Math.max(metaCartoesDoUsuario(u) - cartoesRevisadosHoje(u.id), 0);
    const partes = [];
    if(faltamQ>0) partes.push(faltamQ+" questão(ões)");
    if(faltamC>0) partes.push(faltamC+" cartão(ões)");
    recado = { ativo: true, nome: CONFIG.nomePlataforma, horario: u.lembreteMetaHorario || "20:00", dia: hojeISO(),
      metaBatida: !partes.length, faltam: partes.join(" e "), meta: metaDoUsuario(u)+" questões",
      ultimoAviso: u.lembreteMetaUltimoEnvio || null };
  }
  caches.open("esc-lembrete").then(c => c.put("./recado-lembrete.json",
    new Response(JSON.stringify(recado), { headers: { "Content-Type": "application/json" } }))).catch(()=>{});
}
/* Pede ao navegador para acordar o app de tempos em tempos (só existe no
   Chrome/Edge, e só com o app instalado). Onde não existe, nada acontece. */
function pedirLembreteComAppFechado(){
  if(!podeTerServiceWorker()) return;
  navigator.serviceWorker.ready.then(async reg => {
    if(!reg.periodicSync) return;
    try{
      const perm = await navigator.permissions.query({ name: "periodic-background-sync" });
      if(perm.state !== "granted") return;
      await reg.periodicSync.register("lembrete-meta", { minInterval: 60*60*1000 });
    }catch(e){ /* navegador sem o recurso */ }
  }).catch(()=>{});
}

/* ==========================================================================
   28. INICIALIZAÇÃO
   ==========================================================================
   Carrega os dados salvos (ou os dados de demonstração, na primeira vez),
   restaura a rota da URL (se houver) e desenha a tela pela primeira vez. */
loadState();
(function inicializar(){
  // volta de um link de e-mail (confirmar cadastro, trocar senha): o
  // endereço traz o resultado depois do # e precisa ser lido antes do
  // roteador — ver nuvemTratarRetornoDoEmail, seção 2-C
  const voltouDoEmail = nuvemTratarRetornoDoEmail();
  const hashInicial = voltouDoEmail ? "" : (location.hash||"").replace("#/","");
  if(hashInicial) state.route = hashInicial;
  // se a pasta "dados/" não veio junto, a tarja explica antes de a pessoa
  // achar que a plataforma quebrou
  avisarSeFaltarConteudo();
  // nuvem: quem já entrou neste aparelho continua entrado (a sessão fica no
  // navegador) e o estudo feito em outro aparelho desce em segundo plano
  nuvemCarregarSessaoSalva();
  nuvemLigarGatilhos();
  if(nuvemConectado() && !voltouDoEmail){
    const eu = db.usuarios.find(x => x.id === nuvemSessao.usuarioId);
    if(eu && eu.status === "aprovado"){
      state.usuarioAtualId = eu.id;
      if(!hashInicial || state.route === "landing") state.route = "inicio";
    }
    nuvemSincronizarAgora({forcarRedesenho:true});
  }
  render();
  // lembrete de meta diária: checagem leve a cada minuto (ver função para
  // detalhes e limitação — só funciona com o navegador aberto).
  if(typeof setInterval==="function") setInterval(checarLembreteMetaDiaria, 60000);
  // cópia antiga da página: confere agora e sempre que a aba voltar a ser vista
  verificarVersaoNova(true);
  document.addEventListener("visibilitychange", ()=>{
    if(!document.hidden) verificarVersaoNova(false);
    else atualizarRecadoLembrete();     // saiu do app: o recado do lembrete fica com o andamento de agora
  });
  // aplicativo instalável: abre sem internet e avisa a meta com o app fechado
  registrarServiceWorker();
  atualizarRecadoLembrete();
  { const eu = usuarioAtual(); if(eu && eu.lembreteMetaAtivo) pedirLembreteComAppFechado(); }
})();
