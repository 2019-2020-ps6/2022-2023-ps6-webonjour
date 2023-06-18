#!/usr/bin/env sh

npx nx run front-end-back-office-e2e:e2e:docker || exit 1
npx nx run front-end-front-office-e2e:e2e:docker || exit 1
npx nx run front-end-cross-office-e2e:e2e:docker || exit 1
