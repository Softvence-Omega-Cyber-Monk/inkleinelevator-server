#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/inkleinelevator-server}"
BRANCH="${DEPLOY_BRANCH:-main}"

cd "$APP_DIR"

echo "==> Deploying inkleinelevator-server ($(date -u +%Y-%m-%dT%H:%M:%SZ))"
echo "==> Fetching ${BRANCH}"
git fetch --prune origin "$BRANCH"
git checkout "$BRANCH"
git reset --hard "origin/${BRANCH}"

if [[ ! -f .env ]]; then
  echo "ERROR: missing ${APP_DIR}/.env" >&2
  exit 1
fi

echo "==> Building and starting containers"
docker compose up -d --build --remove-orphans app

echo "==> Pruning dangling images"
docker image prune -f >/dev/null

echo "==> Container status"
docker compose ps
echo "==> Deploy complete"
