/* ferramentas/texto-oficial.mjs — baixa um documento oficial (PDF ou página) e o guarda como texto para procurar nele.

   Por que existe: conferir uma diretriz de verdade é ler o texto dela, não o resumo de um site. Isto junta os passos
   que funcionaram: baixar com curl (que usa o proxy da sessão), tratar o endereço do gov.br/Conitec (a URL do PDF
   devolve uma página; o arquivo está em "<url>/@@display-file/file"), transformar PDF em texto com pdftotext e
   mostrar só as linhas que interessam.

   Uso:
     node ferramentas/texto-oficial.mjs <url> --buscar "ceftriaxona 500|azitromicina"      baixa e mostra as linhas que casam (regex, sem diferenciar maiúsculas)
     node ferramentas/texto-oficial.mjs <url> --buscar "…" --contexto 2                    com 2 linhas antes e depois
     node ferramentas/texto-oficial.mjs <url>                                              só baixa e diz onde ficou o texto

   O texto vai para a pasta temporária do sistema (os documentos oficiais são de terceiros e não entram no git).
   Precisa de `curl` e de `pdftotext` (pacote poppler-utils). Se o site recusar (403) ou não resolver, o domínio não
   está liberado na rede da sessão: isso é limite do ambiente, não da ferramenta — diga qual domínio falta. */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export function urlDoArquivo(url){
  /* gov.br/conitec e gov.br/saude: a URL que termina em .pdf é uma página de listagem */
  if(/gov\.br\/.*\.pdf$/i.test(url) && !/@@display-file|@@download/.test(url)) return url + "/@@display-file/file";
  return url;
}

export function baixarComoTexto(url){
  const pasta = fs.mkdtempSync(path.join(os.tmpdir(), "texto-oficial-"));
  const bruto = path.join(pasta, "bruto");
  const alvo = urlDoArquivo(url);
  const r = execFileSync("curl", ["-sS", "-L", "-m", "300", "-o", bruto, "-w", "%{http_code} %{content_type}", alvo], { encoding: "utf8" }).trim();
  const [codigo] = r.split(" ");
  if(codigo !== "200") throw new Error(`HTTP ${codigo} em ${alvo} — se for 403 ou falha de conexão, o domínio não está liberado na rede da sessão`);
  const tipo = execFileSync("file", ["-b", bruto], { encoding: "utf8" });
  const texto = path.join(pasta, "texto.txt");
  if(/PDF/i.test(tipo)) execFileSync("pdftotext", ["-layout", bruto, texto]);
  else {
    const html = fs.readFileSync(bruto, "utf8").replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ");
    fs.writeFileSync(texto, html.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/[ \t]+/g, " "));
  }
  return texto;
}

function principal(){
  const args = process.argv.slice(2);
  const url = args.find((a) => /^https?:\/\//.test(a));
  if(!url){ console.error('uso: node ferramentas/texto-oficial.mjs <url> [--buscar "regex"] [--contexto N]'); process.exit(2); }
  const iB = args.indexOf("--buscar"), iC = args.indexOf("--contexto");
  const busca = iB >= 0 ? args[iB + 1] : "";
  const ctx = iC >= 0 ? Number(args[iC + 1]) || 0 : 0;
  let texto;
  try { texto = baixarComoTexto(url); } catch(e){ console.error("erro: " + e.message.split("\n")[0]); process.exit(1); }
  const linhas = fs.readFileSync(texto, "utf8").split("\n");
  console.log(`texto: ${texto} (${linhas.length} linhas)`);
  if(!busca) return;
  const re = new RegExp(busca, "i");
  let achou = 0;
  linhas.forEach((l, i) => {
    if(!re.test(l)) return;
    achou++;
    if(achou > 60) return;
    const de = Math.max(0, i - ctx), ate = Math.min(linhas.length - 1, i + ctx);
    console.log(`--- linha ${i + 1}`);
    for(let k = de; k <= ate; k++) console.log(linhas[k].slice(0, 200));
  });
  console.log(achou ? `${achou} linha(s) casam${achou > 60 ? " (mostrei 60)" : ""}.` : "nada casou — tente outra palavra, ou o texto está em outro idioma.");
}

if(import.meta.url === pathToFileURL(process.argv[1]).href) principal();
