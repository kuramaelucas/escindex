/* ==========================================================================
   ESC — SERVICE WORKER (o que faz a plataforma virar aplicativo)
   ==========================================================================
   Três trabalhos, nada mais:

   1. SEM INTERNET, A PLATAFORMA ABRE. Todo arquivo do próprio site (a
      página, codigo/, dados/, ícones) é buscado NA REDE PRIMEIRO; a cópia
      guardada só é usada quando a rede falha. É a ordem certa para quem
      publica versão nova com frequência: com internet, nunca se vê a
      versão velha (a regra "a versão velha não pode ficar presa no
      navegador" continua valendo); sem internet, estuda-se com a última
      versão que abriu. O estudo em si já mora no navegador (e a fila da
      nuvem sobe quando a internet volta).

   2. LEMBRETE DE META COM O APP FECHADO, onde o navegador deixa. No Chrome
      e no Edge com o Esc INSTALADO, o navegador acorda este arquivo de
      tempos em tempos ("periodic background sync"); ele lê o recado que a
      página deixou (horário do lembrete, se a meta de hoje já foi batida) e
      avisa se for a hora. Nos outros navegadores o lembrete continua
      funcionando com o Esc aberto em alguma aba, como antes.

   3. TOCAR NO AVISO ABRE O ESC na tela de Estudar.

   O que ele NÃO toca: a nuvem (Supabase) e qualquer outro endereço de fora,
   exceto as fontes do Google, que são guardadas para o visual não mudar sem
   internet.

   A versão vem no endereço (sw.js?v=AAAA-MM-DD, ver registrarServiceWorker
   em codigo/13-admin-e-inicializacao.js): versão nova é um service worker
   novo, que apaga as cópias da versão anterior ao assumir.
   ========================================================================== */
const VERSAO = new URL(self.location.href).searchParams.get("v") || "sem-versao";
const CACHE = "esc-" + VERSAO;
const CACHE_FONTES = "esc-fontes";
const RECADO_LEMBRETE = "esc-lembrete";   // cache onde a página deixa o recado do lembrete

self.addEventListener("install", evento => {
  // a página e a moldura já ficam guardadas na instalação; o resto entra
  // conforme é usado (na primeira abertura, tudo é usado)
  evento.waitUntil(caches.open(CACHE).then(c => c.addAll(["./", "./index.html", "./manifest.webmanifest"]).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener("activate", evento => {
  evento.waitUntil((async () => {
    const nomes = await caches.keys();
    await Promise.all(nomes.filter(n => n.startsWith("esc-") && n !== CACHE && n !== CACHE_FONTES && n !== RECADO_LEMBRETE)
      .map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", evento => {
  const req = evento.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  if(/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)){
    evento.respondWith(guardadoPrimeiro(req));
    return;
  }
  if(url.origin !== self.location.origin) return;   // nuvem e o resto de fora: direto, sem passar por aqui
  evento.respondWith(redePrimeiro(req));
});

async function redePrimeiro(req){
  const cache = await caches.open(CACHE);
  try{
    const resp = await fetch(req);
    if(resp && resp.ok && resp.type === "basic") cache.put(req, resp.clone());
    return resp;
  }catch(erro){
    const guardada = await cache.match(req, { ignoreSearch: false }) || await cache.match(req, { ignoreSearch: true });
    if(guardada) return guardada;
    // abriu o site sem internet por um endereço com ?v= ou #/rota: a página
    // guardada serve para qualquer um deles
    if(req.mode === "navigate"){
      const pagina = await cache.match("./index.html") || await cache.match("./");
      if(pagina) return pagina;
    }
    throw erro;
  }
}
async function guardadoPrimeiro(req){
  const cache = await caches.open(CACHE_FONTES);
  const guardada = await cache.match(req);
  if(guardada) return guardada;
  const resp = await fetch(req);
  if(resp && (resp.ok || resp.type === "opaque")) cache.put(req, resp.clone());
  return resp;
}

/* ---------- lembrete de meta com o app fechado ---------------------------- */
async function lerRecado(){
  try{
    const c = await caches.open(RECADO_LEMBRETE);
    const r = await c.match("./recado-lembrete.json");
    return r ? await r.json() : null;
  }catch(e){ return null; }
}
async function gravarRecado(recado){
  const c = await caches.open(RECADO_LEMBRETE);
  await c.put("./recado-lembrete.json", new Response(JSON.stringify(recado), { headers: { "Content-Type": "application/json" } }));
}
function hojeLocal(){
  const d = new Date(), p = n => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}
async function talvezLembrar(){
  const r = await lerRecado();
  if(!r || !r.ativo) return;
  const agora = new Date();
  const hhmm = String(agora.getHours()).padStart(2, "0") + ":" + String(agora.getMinutes()).padStart(2, "0");
  const hoje = hojeLocal();
  if(hhmm < (r.horario || "20:00")) return;
  if(r.ultimoAviso === hoje) return;                 // já avisou hoje (aqui ou na página)
  if(r.dia === hoje && r.metaBatida) return;         // a página disse que a meta de hoje foi batida
  const corpo = r.dia === hoje && r.faltam
    ? "Faltam " + r.faltam + " para bater sua meta de hoje."
    : "Você ainda não estudou hoje. " + (r.meta ? "Sua meta é de " + r.meta + "." : "");
  await self.registration.showNotification((r.nome || "Esc") + " — meta do dia", {
    body: corpo, icon: "icones/icone-192.png", badge: "icones/icone-192.png", tag: "meta-do-dia", data: { rota: "estudar" },
  });
  r.ultimoAviso = hoje;
  await gravarRecado(r);
}
self.addEventListener("periodicsync", evento => {
  if(evento.tag === "lembrete-meta") evento.waitUntil(talvezLembrar());
});

self.addEventListener("notificationclick", evento => {
  evento.notification.close();
  const rota = (evento.notification.data && evento.notification.data.rota) || "inicio";
  evento.waitUntil((async () => {
    const janelas = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for(const j of janelas){
      if(new URL(j.url).origin === self.location.origin){ await j.focus(); j.navigate && j.navigate("./index.html#/" + rota).catch(() => {}); return; }
    }
    await self.clients.openWindow("./index.html#/" + rota);
  })());
});
