#!/usr/bin/env bash
# Rodada completa de QA da fase 4 (docs/qa/CHECKLIST.md). Uso: bash tests/qa/run-qa.sh [etapa...]
# Etapas: check base brands lhci links  (padrão: todas, nesta ordem)
# Rebuilda dist/ várias vezes: avise no maestri antes (o Ritmo usa o mesmo dist/).
set -uo pipefail
cd "$(dirname "$0")/../.."

# O Playwright reaproveita um servidor já aberto na 4321: se for o `astro dev` de alguém, testaríamos o dev, não o dist/.
if lsof -iTCP:4321 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Porta 4321 ocupada (astro dev/preview de alguém?). Feche antes da rodada de QA."; exit 2
fi

OUT=".lighthouseci/qa-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$OUT"
STEPS=("${@:-check base brands lhci links}")
STEPS=(${STEPS[@]})
FAIL=0
run() { echo "▶ $*" | tee -a "$OUT/summary.txt"; "$@" 2>&1 | tee -a "$OUT/full.log"; local rc=${PIPESTATUS[0]}; echo "  exit=$rc" | tee -a "$OUT/summary.txt"; [ "$rc" -eq 0 ] || FAIL=1; return 0; }
build() { run env "$@" npx astro build; }

for step in "${STEPS[@]}"; do
  case "$step" in
    check) run npm run check ;;
    base)
      # Build padrão = preview: noindex, marca placeholder.
      build PUBLIC_ALLOW_INDEXING=false
      run npx playwright test --reporter=list
      ;;
    brands)
      for b in "Torno Studio" "Ox" "[Marca]" "Northbridge Product Engineering"; do
        build PUBLIC_SITE_BRAND="$b" PUBLIC_ALLOW_INDEXING=false
        run env QA_BRAND="$b" npx playwright test tests/qa/brand.spec.ts tests/qa/responsive.spec.ts --reporter=list
      done
      ;;
    lhci)
      build PUBLIC_ALLOW_INDEXING=true
      run env QA_INDEXING=true npx playwright test tests/qa/seo.spec.ts --reporter=list
      run npx lhci autorun                                             # mobile (lighthouserc.json da raiz)
      run npx lhci autorun --config=tests/qa/lighthouserc.desktop.json # desktop
      ;;
    links)
      build PUBLIC_ALLOW_INDEXING=false
      run npm run links
      ;;
    *) echo "etapa desconhecida: $step"; exit 2 ;;
  esac
done

# Deixa dist/ no estado padrão (noindex, marca placeholder) para o resto do time.
npx astro build >/dev/null 2>&1

echo "Resumo: $OUT/summary.txt  (log completo: $OUT/full.log)"
exit $FAIL
