/* eslint-disable */
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

module.exports = async function () {
  // check if there is a .env file in the current directory
  // if there is, load it else load the .env file in the api directory
  if (fs.existsSync(path.resolve('.env'))) {
    config({
      path: path.resolve('.env'),
      debug: true,
    });
  } else {
    config({
      path: path.resolve('apps/backend/backend-api-e2e/.env'),
      debug: true,
    });
  }
  let config2 = require('config');
  const port = config2.get('port');
  const host = config2.get('host');
  axios.defaults.baseURL = `http://${host}:${port}`;

  // wait for the server to start
  while (true) {
    try {
      await axios.get(`/health`);
      break;
    } catch (e) {
      console.log('Waiting for server to start...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};
