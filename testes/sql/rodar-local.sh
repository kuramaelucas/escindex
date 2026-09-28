#!/usr/bin/env bash
# ============================================================================
# Os testes do nuvem/esquema.sql num PostgreSQL de verdade, fora do GitHub —
# os mesmos passos do job "esquema-da-nuvem" (.github/workflows/testes.yml):
# Supabase de mentira, o esquema num banco novo, o esquema de novo por cima e
# as regras de segurança.
#
#   npm run testar-sql
#
# Usa o PostgreSQL de PGHOST/PGPORT/PGUSER, se estiverem definidos. Senão,
# sobe um temporário (initdb + pg_ctl, num diretório em /tmp), que é
# desligado e apagado no fim. Precisa do PostgreSQL instalado (psql, initdb).
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")/../.."
export PGOPTIONS="-c client_min_messages=warning"

rodar(){
  psql -v ON_ERROR_STOP=1 -q -f testes/sql/supabase-de-mentira.sql
  psql -v ON_ERROR_STOP=1 -q -f nuvem/esquema.sql
  psql -v ON_ERROR_STOP=1 -q -f nuvem/esquema.sql
  local saida; saida="$(psql -q -f testes/sql/regras.sql 2>&1)" || { echo "$saida" | grep -E "ERROR|ERRO" >&2; return 1; }
  echo "$saida" | grep -q "tudo como esperado" || { echo "$saida" | tail -5 >&2; return 1; }
  echo "Esquema e regras de segurança: tudo como esperado."
}

if [ -n "${PGHOST:-}" ]; then
  BANCO="esc_teste_$$"
  psql -d "${PGDATABASE:-postgres}" -q -c "create database $BANCO"
  trap 'psql -d "${PGDATABASE:-postgres}" -q -c "drop database if exists $BANCO"' EXIT
  PGDATABASE="$BANCO" rodar
  exit
fi

INITDB="$(command -v initdb || ls /usr/lib/postgresql/*/bin/initdb 2>/dev/null | sort -V | tail -1 || true)"
if [ -z "$INITDB" ] || ! command -v psql >/dev/null; then
  echo "PostgreSQL não encontrado (psql/initdb). Instale-o, defina PGHOST/PGUSER de um banco de teste, ou confie no job esquema-da-nuvem do GitHub." >&2
  exit 2
fi
BIN="$(dirname "$INITDB")"
DIR="$(mktemp -d /tmp/esc-pg.XXXXXX)"
PORTA=$((54000 + RANDOM % 900))
comoPostgres(){ "$@"; }
if [ "$(id -u)" = "0" ]; then          # o initdb não roda como root
  chown postgres "$DIR"
  comoPostgres(){ su postgres -s /bin/bash -c "$(printf '%q ' "$@")"; }
fi
parar(){ comoPostgres "$BIN/pg_ctl" -D "$DIR/dados" stop -m fast >/dev/null 2>&1 || true; rm -rf "$DIR"; }
trap parar EXIT
comoPostgres "$BIN/initdb" -D "$DIR/dados" -A trust -U postgres >/dev/null
comoPostgres "$BIN/pg_ctl" -D "$DIR/dados" -o "-p $PORTA -k $DIR -c listen_addresses=''" -l "$DIR/log" -w start >/dev/null
export PGHOST="$DIR" PGPORT="$PORTA" PGUSER=postgres PGDATABASE=postgres
rodar
