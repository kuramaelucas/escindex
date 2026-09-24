/* Um servidor de arquivos mínimo para os testes: entrega a pasta do projeto
   como um site de verdade (http://localhost), que é como a turma abre a
   plataforma — com service worker, conferência de versão e tudo o mais que
   não roda num arquivo aberto com dois cliques.

   semNuvem: true troca o endereço do Supabase por "" em qualquer arquivo
   entregue. É assim que o teste enxerga a plataforma com a nuvem desligada
   (contas de demonstração, telas de administração) sem ninguém precisar
   editar o CONFIG. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const TIPOS = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".md": "text/markdown; charset=utf-8",
};

export function subirServidor({ semNuvem = false } = {}){
  const servidor = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    let caminho = decodeURIComponent(url.pathname);
    if(caminho.endsWith("/")) caminho += "index.html";
    const arquivo = path.join(RAIZ, caminho);
    if(!arquivo.startsWith(RAIZ) || !fs.existsSync(arquivo) || fs.statSync(arquivo).isDirectory()){
      res.writeHead(404); res.end("não encontrado"); return;
    }
    const ext = path.extname(arquivo).toLowerCase();
    let corpo = fs.readFileSync(arquivo);
    if(semNuvem && (ext === ".html" || ext === ".js")){
      corpo = Buffer.from(corpo.toString("utf8")
        .replace(/url:\s*"https:\/\/[a-z0-9]+\.supabase\.co"/g, 'url: ""'));
    }
    res.writeHead(200, { "Content-Type": TIPOS[ext] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(corpo);
  });
  return new Promise(ok => servidor.listen(0, "127.0.0.1", () => {
    const { port } = servidor.address();
    ok({ url: `http://127.0.0.1:${port}/`, fechar: () => new Promise(f => servidor.close(f)) });
  }));
}
