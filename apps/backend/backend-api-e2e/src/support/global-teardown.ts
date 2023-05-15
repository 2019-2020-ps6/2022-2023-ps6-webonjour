/* eslint-disable */

import { killSubProcesses, subProcessSync } from 'subspawn';

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.
  // stop the server
  killSubProcesses('API');
  killSubProcesses('DB');
  subProcessSync(
    'docker-compose -f apps/backend/api/docker-compose.yml down',
    true
  );

  console.log(globalThis.__TEARDOWN_MESSAGE__);
};
