/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;
import { subProcess, subProcessSync } from 'subspawn';

module.exports = async function () {
  // Start services that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  let executor = 'docker compose';

  // Check if docker compose is installed
  try {
    subProcessSync('docker compose --version', true);
  } catch (e) {
    executor = 'podman-compose';
    try {
      subProcessSync('podman-compose --version', true);
    } catch (e) {
      console.log('Please install docker compose or podman compose');
      process.exit(1);
    }
  }

  subProcessSync(`${executor} -f docker-compose.yml up -d`, true);
  // wait for the database to start
  for (let i = 0; i < 200; i++) {
    try {
      subProcessSync('npx prisma migrate dev deploy', true);
      subProcessSync('npx prisma generate', true);
      break;
    } catch (e) {
      console.log('Waiting for database to start...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  subProcess('API', 'npx nx serve backend-api', true);

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
