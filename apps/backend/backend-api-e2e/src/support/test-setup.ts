import axios from 'axios';
import { environment, protocol } from '@webonjour/shared/environments';

module.exports = async function () {
  // check if there is a .env file in the current directory
  // if there is, load it else load the .env file in the api directory

  axios.defaults.baseURL = `${protocol(environment.api.secure)}://${
    environment.api.domain
  }`;
  // wait for the server to start
  for (let i = 0; i < 200; i++) {
    try {
      await axios.get(`/health`);
      break;
    } catch (e) {
      console.log('Waiting for server to start...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};
