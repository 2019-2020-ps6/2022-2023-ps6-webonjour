/* eslint-disable */
import { subProcess } from 'subspawn';

var __TEARDOWN_MESSAGE__: string;

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');
  subProcess('API', 'npx nx serve backend-api', true);

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';

  // wait for the server to start
  while (true) {
    try {
      await fetch(`http://${host}:${port}/api`);
      break;
    } catch (e) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
