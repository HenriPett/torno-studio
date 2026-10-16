#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../public/examples/rls-multiempresa"
exec bash run-local.sh
