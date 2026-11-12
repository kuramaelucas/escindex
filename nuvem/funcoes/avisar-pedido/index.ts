// Função do Supabase (Edge Function): avisa por push quem aprova cadastros
// assim que alguém pede acesso — e avisa quem revisa quando um aluno sinaliza uma questão. Passo a passo em nuvem/LEIA-ME.md.
//
// Quem chama: um Database Webhook em INSERT na tabela `perfis`, com o
// cabeçalho `x-esc-segredo` igual ao segredo AVISO_SEGREDO. Quem recebe:
// perfis aprovados com permissão "cadastros" (administrador máster ou
// coordenação — a mesma regra de PERMISSOES_ADMIN no site) que ligaram a
// notificação e têm inscrição em `push_inscricoes`.
import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3";

const NIVEIS_QUE_APROVAM = ["master", "coordenacao"];

Deno.serve(async (req) => {
  if (req.headers.get("x-esc-segredo") !== Deno.env.get("AVISO_SEGREDO")) {
    return new Response("não autorizado", { status: 401 });
  }
  const { type, record, table } = await req.json().catch(() => ({}));
  if (type !== "INSERT" || !record) return new Response("nada a avisar");

  // Dois assuntos, a mesma função: pedido de acesso (tabela perfis → quem aprova cadastros) e sinalização de questão
  // (tabela sinalizacoes_questoes → quem revisa: professor, administrador, residente).
  const sinalizacao = table === "sinalizacoes_questoes";
  // só pedido novo e ainda pendente: o perfil criado por um admin já nasce decidido
  if (!sinalizacao && record.status !== "pendente") return new Response("nada a avisar");
  if (sinalizacao && record.descartada) return new Response("nada a avisar");

  const banco = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  webpush.setVapidDetails(
    Deno.env.get("VAPID_ASSUNTO") || "mailto:contato@exemplo.com",
    Deno.env.get("VAPID_PUBLICA")!,
    Deno.env.get("VAPID_PRIVADA")!,
  );

  const consulta = banco.from("perfis").select("id").eq("status", "aprovado");
  const { data: quem } = await (sinalizacao
    ? consulta.in("papel", ["professor", "admin", "residente"])
    : consulta.eq("papel", "admin").in("nivel_admin", NIVEIS_QUE_APROVAM));
  const ids = (quem || []).map((p: { id: string }) => p.id).filter((id: string) => id !== record.usuario_id);
  if (!ids.length) return new Response("ninguém para avisar");
  const { data: inscricoes } = await banco.from("push_inscricoes").select("*").in("usuario_id", ids);

  const nome = record.nome || "Alguém";
  const aviso = JSON.stringify(sinalizacao ? {
    titulo: "Esc — questão sinalizada",
    corpo: (record.autor_nome || "Um aluno") + " sinalizou uma questão" + (record.comentario ? ": " + String(record.comentario).slice(0, 90) : "."),
    rota: "revisao-dificeis",
    tag: "questao-sinalizada",
  } : {
    titulo: "Esc — pedido de acesso",
    corpo: "Novo pedido de acesso: " + nome + (record.ano_faculdade ? " (" + record.ano_faculdade + ")" : "") + ".",
    rota: "painel-turma",
    tag: "pedido-de-acesso",
  });

  let enviados = 0;
  await Promise.all((inscricoes || []).map(async (i: { usuario_id: string; endpoint: string; p256dh: string; auth: string }) => {
    try {
      await webpush.sendNotification({ endpoint: i.endpoint, keys: { p256dh: i.p256dh, auth: i.auth } }, aviso);
      enviados++;
    } catch (e) {
      // 404/410: o aparelho desinstalou ou revogou — a inscrição não serve mais
      if (e && (e.statusCode === 404 || e.statusCode === 410)) {
        await banco.from("push_inscricoes").delete().eq("usuario_id", i.usuario_id).eq("endpoint", i.endpoint);
      }
    }
  }));
  return new Response("avisos enviados: " + enviados + " de " + (inscricoes || []).length);
});
