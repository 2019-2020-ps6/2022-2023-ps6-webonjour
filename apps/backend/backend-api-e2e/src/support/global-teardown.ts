/* eslint-disable */

import { killSubProcesses } from 'subspawn';

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.
  // stop the server
  killSubProcesses('API');
  console.log(globalThis.__TEARDOWN_MESSAGE__);
};
