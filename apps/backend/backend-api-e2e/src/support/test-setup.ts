/* eslint-disable */
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { config as dotenv } from 'dotenv';
if (fs.existsSync(path.resolve('.env'))) {
  dotenv({
    path: path.resolve('.env'),
    debug: true,
  });
} else {
  dotenv({
    path: path.resolve('apps/backend/backend-api-e2e/.env'),
    debug: true,
  });
}
import config from 'config';

module.exports = async function () {
  // check if there is a .env file in the current directory
  // if there is, load it else load the .env file in the api directory

  const port = config.get('port');
  const host = config.get('host');
  axios.defaults.baseURL = `http://${host}:${port}`;

  // wait for the server to start
  while (200) {
    try {
      await axios.get(`/health`);
      break;
    } catch (e) {
      console.log('Waiting for server to start...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};
