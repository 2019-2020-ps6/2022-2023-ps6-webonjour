#!/usr/bin/env sh
docker compose -f docker-compose-e2e.yml build || exit 1
docker compose -f docker-compose-e2e.yml down --remove-orphans || exit 1
docker compose -f docker-compose-e2e.yml run e2e || exit 1
docker compose -f docker-compose-e2e.yml down --remove-orphans || exit 1
