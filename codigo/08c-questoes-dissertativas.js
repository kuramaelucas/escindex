/* codigo/08c-questoes-dissertativas.js — Questão dissertativa na sessão (seção 11-C): escrever a resposta, dizer a confiança, ver a resposta esperada e se autoavaliar.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   11-C. QUESTÃO DISSERTATIVA — o fluxo da resposta aberta
   ==========================================================================
   Na múltipla escolha a plataforma corrige. Na dissertativa não há como
   corrigir texto livre, então o caminho tem quatro passos e a nota é da
   pessoa:

     1. escreve a resposta (o rascunho vive na sessão, por questão, e volta
        se ela sair e retomar);
     2. diz a confiança (certeza, dúvida, chute) — é ela que confirma: só aí
        a resposta esperada aparece, para ninguém ler antes de se
        comprometer com o que escreveu;
     3. vê a resposta esperada pela banca e a justificativa, ao lado do que
        escreveu;
     4. avalia a si mesma: acertei ou errei. Só neste ponto a resposta é
        registrada (registrarResposta), com o texto escrito, e entra na
        revisão espaçada como qualquer outra.

   O texto de cada tentativa fica guardado na resposta (`textoResposta`, sobe
   para a nuvem), e quando a mesma questão volta a tela mostra as tentativas
   anteriores — comparar o que se escreveu antes com o que se escreve agora é
   o motivo de guardar. Entre o passo 2 e o 4 a questão está "em andamento"
   (`s.dissertativas`) e sobrevive a sair da sessão. */
function rascunhoDaDissertativa(questaoId){
  const s = state.sessaoAtual;
  return (s && s.rascunhos && s.rascunhos[questaoId]) || "";
}
// a resposta já confirmada com a confiança, que espera a autoavaliação
function dissertativaConfirmada(questaoId){
  const s = state.sessaoAtual;
  return (s && s.dissertativas && s.dissertativas[questaoId]) || null;
}
// a cada tecla só a memória muda (gravar o banco a cada letra travaria a
// digitação); quem grava é o fim da edição (guardarRascunhoDissertativa)
function digitarRespostaDissertativa(questaoId, texto){
  const s = state.sessaoAtual; if(!s || s.somenteLeitura) return;
  if(!s.rascunhos) s.rascunhos = {};
  s.rascunhos[questaoId] = texto;
  document.querySelectorAll("#confiancaDissertativa .confidence-btn").forEach(b => { b.disabled = !texto.trim(); });
}
function guardarRascunhoDissertativa(){ salvarSessaoEmAndamento(); }
function confirmarDissertativa(confianca){
  const s = state.sessaoAtual; if(!s || s.somenteLeitura) return;
  const item = s.itens[s.indiceAtual]; if(!item) return;
  if(respostaDoIndice(s, s.indiceAtual) || dissertativaConfirmada(item.questaoId)) return;
  const texto = rascunhoDaDissertativa(item.questaoId).trim();
  if(!texto){ toast("Escreva a sua resposta antes de dizer a confiança.", "err"); return; }
  const tempoSeg = s.tsQuestao ? (Date.now() - s.tsQuestao) / 1000 : null;
  if(!s.dissertativas) s.dissertativas = {};
  s.dissertativas[item.questaoId] = { texto, confianca, tempoSeg };
  salvarSessaoEmAndamento();
  redesenharQuestaoDaSessao();
}
function autoavaliarDissertativa(correta){
  const s = state.sessaoAtual; if(!s || s.somenteLeitura) return;
  const item = s.itens[s.indiceAtual]; if(!item) return;
  if(respostaDoIndice(s, s.indiceAtual)) return;
  const c = dissertativaConfirmada(item.questaoId); if(!c) return;
  const resp = registrarResposta(usuarioAtual().id, item.questaoId, null, c.confianca, c.tempoSeg, origemDoItem(s, item), { texto: c.texto, correta: !!correta });
  s.respostasSessao[s.indiceAtual] = resp;
  delete s.dissertativas[item.questaoId];
  if(s.rascunhos) delete s.rascunhos[item.questaoId];
  salvarSessaoEmAndamento();
  render();
}

/* As tentativas anteriores da pessoa nesta questão, para comparar com a de
   agora. `resp` é a que está na tela (a de uma sessão do histórico não traz
   id: aí vale texto e dia). */
function tentativasAnterioresDaDissertativa(usuarioId, questaoId, resp){
  const eEsta = r => resp.id ? r.id === resp.id : (r.textoResposta === resp.textoResposta && r.data === resp.data);
  return respostasDaQuestao(usuarioId, questaoId).filter(r => !eEsta(r) && r.textoResposta);
}
function htmlTentativasAnterioresDaDissertativa(lista){
  if(!lista.length) return "";
  return `<div class="mt-2">
    <div class="nota-pessoal-titulo">${iconeSvg("clock")} O que você escreveu antes</div>
    ${lista.map((r, i) => `<details class="card-flat mt-1">
      <summary class="text-sm">Tentativa ${i+1} · ${formatDataBR(r.data)} · ${r.correta ? "você avaliou: acertou" : "você avaliou: errou"} · ${escapeHtml(rotuloConfianca(r.confianca))}</summary>
      <div class="resposta-escrita mt-1">${escapeHtml(r.textoResposta)}</div>
    </details>`).join("")}
  </div>`;
}

function renderCartaoDissertativa(q, opts){
  opts = opts || {};
  const eu = usuarioAtual();
  const resp = opts.resposta || null;
  const confirmada = resp ? null : dissertativaConfirmada(q.id);
  const emAberto = !resp && !confirmada;
  const esp = getEspecialidade(q.especialidadeId), area = getArea(q.areaId);
  // como na múltipla escolha, o que entrega o diagnóstico só aparece depois da resposta
  const classificacao = !emAberto ? `
      <span class="badge badge-accent">${escapeHtml(area?area.nome:"")}</span>
      <span class="qcard-trilha">${escapeHtml(esp?esp.nome:"")} › ${escapeHtml(nomeAssunto(q.assuntoId))}</span>` : "";
  let html = `<div class="qcard">
    <div class="qcard-meta">${classificacao}
      <span class="qcard-trilha">${escapeHtml(q.banca)} · ${q.ano}${q.numeroNaProva ? ` · questão ${q.numeroNaProva}` : ""}</span>
      ${badgeAutoriaQuestao(q)}
      <span class="badge badge-amber" title="Você escreve a resposta e se avalia depois de ver a esperada pela banca">Dissertativa</span>
    </div>
    <div class="qcard-enunciado" ${atributoDestacavel(alvoDeQuestao(q.id,"enunciado"))}>${htmlComDestaques(q.enunciado, alvoDeQuestao(q.id,"enunciado"))}</div>
    ${renderImagemQuestao(q)}`;

  if(emAberto){
    const rascunho = rascunhoDaDissertativa(q.id);
    html += `<label class="label" for="respostaDissertativa">Sua resposta</label>
    <textarea class="textarea" id="respostaDissertativa" rows="8" ${opts.somenteLeitura ? "disabled" : ""} placeholder="Escreva aqui a sua resposta, como numa prova — com suas palavras, antes de ver a esperada."
      oninput="digitarRespostaDissertativa('${q.id}', this.value)" onchange="guardarRascunhoDissertativa()">${escapeHtml(rascunho)}</textarea>`;
    if(!opts.somenteLeitura) html += `
      <div class="confidence-row" id="confiancaDissertativa">
        <button class="confidence-btn" onclick="confirmarDissertativa('certeza')" ${rascunho.trim() ? "" : "disabled"}>Certeza</button>
        <button class="confidence-btn" onclick="confirmarDissertativa('duvida')" ${rascunho.trim() ? "" : "disabled"}>Na dúvida</button>
        <button class="confidence-btn" onclick="confirmarDissertativa('chute')" ${rascunho.trim() ? "" : "disabled"}>Chute</button>
      </div>
      <div class="text-xs muted mt-1">Dizer a confiança confirma a resposta e mostra a esperada pela banca, com a justificativa. Aí você se avalia: acertei ou errei.</div>
      <div class="text-xs muted mt-2">${iconeSvg("eye-off")} Assunto, especialidade e dificuldade aparecem depois que você responder, para não entregar o diagnóstico.</div>`;
    return html + "</div>";
  }

  // a partir daqui a resposta esperada está à vista: a pessoa já se comprometeu
  const meuTexto = resp ? resp.textoResposta : confirmada.texto;
  const minhaConfianca = resp ? resp.confianca : confirmada.confianca;
  html += `<div class="mt-2">
      <div class="nota-pessoal-titulo">${iconeSvg("message")} Sua resposta · ${escapeHtml(rotuloConfianca(minhaConfianca))}</div>
      <div class="resposta-escrita">${escapeHtml(meuTexto || "(resposta sem texto guardado)")}</div>
    </div>
    <div class="feedback-box" style="background:var(--surface-2);border:1px solid var(--border-strong)">
      <div class="nota-pessoal-titulo">${iconeSvg("check")} Resposta esperada pela banca</div>
      <span ${atributoDestacavel(alvoDeQuestao(q.id,"resposta-esperada"))}>${htmlComDestaques(q.respostaEsperada || "A banca não publicou uma resposta esperada para esta questão.", alvoDeQuestao(q.id,"resposta-esperada"))}</span>
    </div>
    <div class="feedback-box" style="background:var(--surface-2);border:1px solid var(--border)">
      <div class="nota-pessoal-titulo">${iconeSvg("book")} Justificativa</div>
      <span ${atributoDestacavel(alvoDeQuestao(q.id,"explicacao"))}>${htmlComDestaques(q.explicacaoGeral, alvoDeQuestao(q.id,"explicacao"), true)}</span>
    </div>`;

  if(confirmada){
    html += `<div class="text-sm mt-2"><strong>Compare as duas respostas e diga com honestidade como foi.</strong> É a sua avaliação que decide quando a questão volta na revisão.</div>
      <div class="confidence-row">
        <button class="confidence-btn" onclick="autoavaliarDissertativa(true)">${iconeSvg("check")} Acertei</button>
        <button class="confidence-btn" onclick="autoavaliarDissertativa(false)">${iconeSvg("x")} Errei</button>
      </div>`;
    return html + "</div>";
  }

  html += `<div class="feedback-box ${resp.correta?"ok":"no"}"><strong>Você avaliou: ${resp.correta?"acertou":"errou"}.</strong>${resp.confianca==="chute" && resp.correta ? " Acerto no chute volta cedo na revisão." : ""}${!resp.correta && resp.confianca==="certeza" ? " Errou com certeza: vale reler a justificativa com calma." : ""}</div>`;
  html += htmlTentativasAnterioresDaDissertativa(tentativasAnterioresDaDissertativa(eu.id, q.id, resp));
  html += renderRodapeDaQuestaoRespondida(q);
  return html + "</div>";
}
