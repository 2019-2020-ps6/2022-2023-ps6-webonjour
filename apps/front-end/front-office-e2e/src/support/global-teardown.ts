/* eslint-disable */

import { killSubProcesses, subProcessSync } from 'subspawn';

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.
  // stop the server

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

  killSubProcesses('API');
  subProcessSync(`${executor} -f docker-compose.yml down`, true);
  console.log(globalThis.__TEARDOWN_MESSAGE__);
};
