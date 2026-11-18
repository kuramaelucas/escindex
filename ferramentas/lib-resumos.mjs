/* ferramentas/lib-resumos.mjs — lê os resumos adaptativos (resumos/<tema>/resumo.js) fora do navegador
   e liga cada seção às diretrizes de que depende (campo `diretrizes`, ids de `fontes`).
   Serve a `npm run resumo` e a `npm run auditoria-padrao -- diretriz`: quando sai edição nova
   de uma diretriz, a lista diz quais seções reescrever (docs/PROJETO-RESUMOS.md, seção 4). */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

export function carregarResumo(tema){
  const contexto = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(RAIZ, "resumos", tema, "resumo.js"), "utf8"), contexto);
  return contexto.window.EscResumos.lista[0];
}

export function temasDeResumo(){
  const dir = path.join(RAIZ, "resumos");
  return fs.readdirSync(dir).filter(t => fs.existsSync(path.join(dir, t, "resumo.js"))).sort();
}

// erros de forma das diretrizes: fonte sem id ou repetida, seção citando id que não está em fontes
export function errosDeDiretrizes(r){
  const erros = [], ids = new Set();
  for(const f of r.fontes || []){
    if(!f.id) erros.push(`fonte sem id: ${f.texto}`);
    else if(ids.has(f.id)) erros.push(`fonte com id repetido: ${f.id}`);
    ids.add(f.id);
  }
  for(const d of r.doencas) for(const s of d.fragmentos) for(const id of s.diretrizes || [])
    if(!ids.has(id)) erros.push(`${d.id}/${s.id}: diretriz ${id} não está em fontes`);
  return erros;
}

// [{ tema, resumo, fonte: {id, texto, lidoEm}, secoes: [{ capitulo, id, titulo }] }], uma linha por fonte usada
export function secoesPorDiretriz(temas = temasDeResumo()){
  const linhas = [];
  for(const tema of temas){
    const r = carregarResumo(tema);
    for(const fonte of r.fontes || []){
      const secoes = r.doencas.flatMap(d => d.fragmentos.filter(s => (s.diretrizes || []).includes(fonte.id))
        .map(s => ({ capitulo: d.id, id: s.id, titulo: s.titulo })));
      linhas.push({ tema, resumo: r.titulo, fonte, secoes });
    }
  }
  return linhas;
}
