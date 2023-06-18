#!/usr/bin/env sh
docker-compose -f docker-compose-e2e.yml run e2e --build --force-recreate --remove-orphans || exit 1
