/* ==========================================================================
   CONFERIDOR DA PASTA dados/
   ==========================================================================
   Lê todos os arquivos de conteúdo do jeito que o navegador lê (na ordem da
   lista ESC_ARQUIVOS do index.html) e confere o que ninguém confere de olho
   em 635 questões:

     ERROS (fazem o teste falhar — algo está quebrado):
       - id de questão, cartão, assunto ou simulado repetido;
       - gabarito que não é uma das alternativas (fora das anuladas);
       - assunto, especialidade ou área que não existe na taxonomia, ou
         assunto pendurado na especialidade errada;
       - questão real (real: true) sem banca, ano ou número na prova;
       - imagem apontando para um arquivo de dados/imagens/ que não existe;
       - simulado com questão que não existe; bloco com especialidade que
         não existe; cartão sem frente ou sem verso.

     AVISOS (não falham — é a lista do que falta fazer):
       - prova com número faltando (ex.: "UNIFESP-EPM 2024: faltam 17, 43");
       - questão que depende de imagem/tabela da prova e ainda não tem;
       - enunciado que fala em imagem sem estar marcado como tal.

   Para rodar:  node testes/conferir-dados.mjs      (ou  npm run conferir)
   Com --json, imprime o relatório em JSON (usado pelo teste automático).
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* O enunciado fala de algo que o aluno precisa VER? Só as expressões que
   apareceram de verdade nas provas — "abaixo das artérias renais" não conta. */
export const MENCIONA_IMAGEM = /(imagem anexa|\(imagem a seguir\)|\(figura\)|figura anexa|representad[ao] na (imagem|tabela)|gráfico abaixo|quadro abaixo|tabela do tipo|ECG de admissão a seguir|imagens do exame abaixo|ultrassonografia abdominal anexo)/i;

export function arquivosDeConteudo(){
  const html = fs.readFileSync(path.join(RAIZ, "index.html"), "utf8");
  const lista = /dados:\s*\[([^\]]*)\]/.exec(html);
  if(lista) return [...lista[1].matchAll(/"([^"]+)"/g)].map(m => "dados/" + m[1] + ".js");
  return [...html.matchAll(/<script src="(dados\/[a-z0-9-]+\.js)/g)].map(m => m[1]);
}

/* A plataforma tenta a extensão escrita e, se não achar, as outras (ver
   imagemDaQuestaoFalhou) — então .jpg no lugar de .png também vale aqui. */
function imagemExiste(rel){
  const base = rel.replace(/\.(png|jpe?g|webp)$/i, "");
  return [rel, base + ".png", base + ".jpg", base + ".jpeg", base + ".webp"].some(r => fs.existsSync(path.join(RAIZ, r)));
}

export function carregarConteudo(){
  const html = fs.readFileSync(path.join(RAIZ, "index.html"), "utf8");
  const ponte = /window\.EscDados\s*=\s*\{[\s\S]*?\n\};/.exec(html);
  if(!ponte) throw new Error("não achei a ponte window.EscDados no index.html");
  const ctx = { console };
  ctx.window = ctx;
  vm.createContext(ctx);
  vm.runInContext(ponte[0], ctx);
  const faltando = [];
  for(const rel of arquivosDeConteudo()){
    const arq = path.join(RAIZ, rel);
    if(!fs.existsSync(arq)){ faltando.push(rel); continue; }
    vm.runInContext(fs.readFileSync(arq, "utf8"), ctx, { filename: rel });
  }
  return { dados: ctx.EscDados, faltando };
}

export function resumirNumeros(nums){
  const ord = [...new Set(nums)].sort((a, b) => a - b), partes = [];
  for(let i = 0; i < ord.length; i++){
    let j = i;
    while(j + 1 < ord.length && ord[j + 1] === ord[j] + 1) j++;
    partes.push(j > i + 1 ? `${ord[i]}–${ord[j]}` : (j === i + 1 ? `${ord[i]}, ${ord[j]}` : `${ord[i]}`));
    i = j;
  }
  return partes.join(", ");
}

export function conferir(){
  const { dados: D, faltando } = carregarConteudo();
  const erros = [], avisos = [], pendenciasImagem = [];
  faltando.forEach(f => erros.push(`arquivo da lista não existe: ${f}`));

  const repetidos = (lista, nome) => {
    const vistos = new Set();
    lista.forEach(x => { if(vistos.has(x.id)) erros.push(`${nome} com id repetido: ${x.id}`); vistos.add(x.id); });
  };
  const tax = D.taxonomia || { areas: [], especialidades: [], assuntos: [] };
  const areas = new Map(tax.areas.map(a => [a.id, a]));
  const esps = new Map(tax.especialidades.map(e => [e.id, e]));
  const asss = new Map(tax.assuntos.map(a => [a.id, a]));
  repetidos(tax.areas, "área"); repetidos(tax.especialidades, "especialidade"); repetidos(tax.assuntos, "assunto");
  tax.especialidades.forEach(e => { if(!areas.has(e.areaId)) erros.push(`especialidade ${e.id} aponta para área inexistente ${e.areaId}`); });
  tax.assuntos.forEach(a => { if(!esps.has(a.especialidadeId)) erros.push(`assunto ${a.id} aponta para especialidade inexistente ${a.especialidadeId}`); });

  // questões
  repetidos(D.questoes, "questão");
  const provas = new Map();
  for(const q of D.questoes){
    const onde = `questão ${q.id}`;
    if(!areas.has(q.areaId)) erros.push(`${onde}: área inexistente ${q.areaId}`);
    if(!esps.has(q.especialidadeId)) erros.push(`${onde}: especialidade inexistente ${q.especialidadeId}`);
    else if(esps.get(q.especialidadeId).areaId !== q.areaId && !q.areaIdPropria) avisos.push(`${onde}: a especialidade ${q.especialidadeId} é de outra área (${esps.get(q.especialidadeId).areaId}), a questão diz ${q.areaId}`);
    if(!asss.has(q.assuntoId)) erros.push(`${onde}: assunto inexistente ${q.assuntoId}`);
    else if(asss.get(q.assuntoId).especialidadeId !== q.especialidadeId) erros.push(`${onde}: o assunto ${q.assuntoId} não é da especialidade ${q.especialidadeId}`);
    const alts = (q.alternativas || []).map(a => a.id);
    if(alts.length < 2) erros.push(`${onde}: menos de duas alternativas`);
    if(new Set(alts).size !== alts.length) erros.push(`${onde}: alternativa repetida`);
    if(q.status !== "anulada" && !alts.includes(q.gabarito)) erros.push(`${onde}: gabarito "${q.gabarito}" não é uma das alternativas (${alts.join(", ")})`);
    if(!String(q.enunciado || "").trim()) erros.push(`${onde}: enunciado vazio`);
    if(q.real){
      if(!q.banca || !q.ano) erros.push(`${onde}: questão real sem banca ou ano`);
      if(!Number.isInteger(q.numeroNaProva)) erros.push(`${onde}: questão real sem numeroNaProva`);
      const chave = `${q.banca} ${q.ano}`;
      if(!provas.has(chave)) provas.set(chave, []);
      provas.get(chave).push(q);
    }
    if(q.imagemUrl && !/^(https?:|data:)/.test(q.imagemUrl)){
      if(!imagemExiste(q.imagemUrl)){
        if(q.imagemPendente) pendenciasImagem.push({ id: q.id, falta: q.imagemPendente, arquivo: q.imagemUrl });
        else erros.push(`${onde}: a imagem ${q.imagemUrl} não existe`);
      }
    } else if(q.imagemPendente && !q.imagemUrl){
      pendenciasImagem.push({ id: q.id, falta: q.imagemPendente, arquivo: null });
    }
    if(!q.imagemUrl && !q.imagemPendente && MENCIONA_IMAGEM.test(q.enunciado || "")){
      avisos.push(`${onde}: o enunciado fala de imagem/tabela, mas a questão não tem imagem nem "imagemPendente"`);
    }
  }
  // provas com buraco na numeração
  for(const [chave, qs] of provas){
    const nums = qs.map(q => q.numeroNaProva).filter(Number.isInteger);
    const repetidosNum = nums.filter((n, i) => nums.indexOf(n) !== i);
    if(repetidosNum.length) erros.push(`${chave}: número na prova repetido: ${resumirNumeros(repetidosNum)}`);
    const maior = Math.max(...nums, 0), falta = [];
    for(let n = 1; n <= maior; n++) if(!nums.includes(n)) falta.push(n);
    if(falta.length) avisos.push(`${chave}: faltam as questões ${resumirNumeros(falta)} (a prova vai até a ${maior})`);
  }

  // flashcards
  repetidos(D.flashcards, "cartão");
  D.flashcards.forEach(c => {
    if(!asss.has(c.assuntoId)) erros.push(`cartão ${c.id}: assunto inexistente ${c.assuntoId}`);
    if(!String(c.frente || "").trim() || !String(c.verso || "").trim()) erros.push(`cartão ${c.id}: frente ou verso vazio`);
  });

  // simulados e calendário
  const idsQuestoes = new Set(D.questoes.map(q => q.id));
  repetidos(D.simulados, "simulado");
  D.simulados.forEach(s => (s.questoes || []).forEach(id => { if(!idsQuestoes.has(id)) erros.push(`simulado ${s.id}: questão inexistente ${id}`); }));
  const blocos = [...D.blocos, ...Object.values(D.sequenciasAno || {}).flat()];
  blocos.forEach(b => (b.especialidadeIds || []).forEach(e => { if(!esps.has(e)) erros.push(`bloco ${b.id}: especialidade inexistente ${e}`); }));

  // cobertura de cartões da equipe por assunto (é o que diz onde escrever mais)
  const comCartao = new Set(D.flashcards.map(c => c.assuntoId));
  const semCartao = tax.assuntos.filter(a => !comCartao.has(a.id));

  return {
    erros, avisos, pendenciasImagem,
    totais: { questoes: D.questoes.length, reais: D.questoes.filter(q => q.real).length, cartoes: D.flashcards.length, assuntos: tax.assuntos.length, assuntosSemCartao: semCartao.length, provas: provas.size },
  };
}

if(process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])){
  const r = conferir();
  if(process.argv.includes("--json")){ console.log(JSON.stringify(r, null, 2)); }
  else {
    const t = r.totais;
    console.log(`Conteúdo: ${t.questoes} questões (${t.reais} reais, ${t.provas} provas), ${t.cartoes} cartões, ${t.assuntos} assuntos (${t.assuntosSemCartao} sem cartão da equipe).\n`);
    if(r.pendenciasImagem.length){
      console.log(`Questões esperando imagem ou tabela da prova original (${r.pendenciasImagem.length}):`);
      r.pendenciasImagem.forEach(p => console.log(`  - ${p.id}: ${p.falta}${p.arquivo ? `  → salvar como ${p.arquivo}` : ""}`));
      console.log("");
    }
    if(r.avisos.length){ console.log(`Avisos (${r.avisos.length}):`); r.avisos.forEach(a => console.log("  - " + a)); console.log(""); }
    if(r.erros.length){ console.log(`ERROS (${r.erros.length}):`); r.erros.forEach(e => console.log("  ✗ " + e)); }
    else console.log("Nenhum erro. ✓");
  }
  process.exit(r.erros.length ? 1 : 0);
}
