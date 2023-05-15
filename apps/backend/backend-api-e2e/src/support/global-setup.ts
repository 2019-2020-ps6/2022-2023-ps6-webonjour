/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;
import { subProcess, subProcessSync } from 'subspawn';

module.exports = async function () {
  // Start services that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  subProcess('API', 'npx nx serve backend-api', true);
  subProcessSync(
    "npx prisma migrate dev --preview-feature --name 'init'",
    true
  );
  subProcessSync('npx prisma generate', true);

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
