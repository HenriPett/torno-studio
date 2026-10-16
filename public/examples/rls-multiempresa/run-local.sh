#!/usr/bin/env bash
# Creates its OWN ephemeral cluster. Never connects to an existing DB.
set -euo pipefail
cd "$(dirname "$0")"
for bin in initdb pg_ctl psql; do
  command -v "$bin" >/dev/null || { echo "Missing PostgreSQL binary: $bin" >&2; exit 1; }
done
work=$(mktemp -d /tmp/rls-guide.XXXXXX)
cleanup() {
  pg_ctl -D "$work/data" -m immediate stop >/dev/null 2>&1 || true
  rm -rf "$work"
}
trap cleanup EXIT
mkdir "$work/socket"
initdb -D "$work/data" -U demo_admin -A trust --no-locale >/dev/null
# Unix socket inside a mode-700 temporary directory; no TCP listener.
pg_ctl -D "$work/data" -l "$work/server.log" -o "-F -k $work/socket -c listen_addresses=''" -w start >/dev/null
psql -X -h "$work/socket" -U demo_admin -d postgres -v ON_ERROR_STOP=1 \
  -f bootstrap-local.sql -f schema.sql -f tests.sql
