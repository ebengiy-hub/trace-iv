#!/usr/bin/env bash
# Build and publish dist/ to the gh-pages branch (GitHub Pages). Requires `gh auth login`.
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
REMOTE=$(git remote get-url origin)
TMP=$(mktemp -d)
cp -R dist/. "$TMP"/
touch "$TMP/.nojekyll"
cp "$TMP/index.html" "$TMP/404.html"
cd "$TMP"
git init -q -b gh-pages
git add -A
git -c user.name="${GIT_AUTHOR_NAME:-deploy}" -c user.email="${GIT_AUTHOR_EMAIL:-deploy@example.invalid}" commit -q -m "Deploy $(date -u +%FT%TZ)"
git push -f "$REMOTE" gh-pages
echo "Deployed. Live at: $(cd - >/dev/null && node -p "require('./package.json').homepage")"
