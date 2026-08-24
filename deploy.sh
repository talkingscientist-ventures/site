#!/usr/bin/env bash
# Deploy talkingscientistventures.com to the DreamHost VPS.
#
# Path: this machine (mediabeast) -> tsv01 -> vps.
#   - The VPS is only reachable from tsv01 (`ssh tsv01`, then the `vps` ssh
#     alias, which uses tsv01's deploy key for user `talkingscientistventures`
#     on vps66684 / 173.236.143.43).
#   - Docroot on the VPS: ~/talkingscientistventures.com/
#   - We rsync the site to a staging dir on tsv01, then rsync from tsv01 to
#     the VPS docroot with --delete so the docroot mirrors this repo exactly.
#
# Usage: ./deploy.sh
# Never touches DNS, other docroots, or any other VPS user.

set -euo pipefail

SRC="$(cd "$(dirname "$0")" && pwd)"
STAGE="/tmp/tsv-site-deploy"
DOCROOT="talkingscientistventures.com"

EXCLUDES=(--exclude '.git' --exclude 'ops' --exclude 'deploy.sh' --exclude 'README.md' --exclude '*.md')

echo "==> Staging on tsv01"
ssh tsv01 "mkdir -p $STAGE"
rsync -av --delete --delete-excluded "${EXCLUDES[@]}" "$SRC/" "tsv01:$STAGE/"

echo "==> Publishing tsv01 -> vps docroot"
ssh tsv01 "rsync -av --delete $STAGE/ vps:~/$DOCROOT/"

echo "==> Verifying"
curl -sS -o /dev/null -w 'https://talkingscientistventures.com -> %{http_code}\n' https://talkingscientistventures.com/
curl -sS -o /dev/null -w 'https://talkingscientistventures.com/terms.html -> %{http_code}\n' https://talkingscientistventures.com/terms.html
echo "Done."
