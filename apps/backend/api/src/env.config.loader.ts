import { config } from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
// check if there is a .env file in the current directory
// if there is, load it else load the .env file in the api directory
if (fs.existsSync(path.resolve('.env'))) {
  config();
} else if (fs.existsSync(path.resolve('apps/backend/api/.env'))) {
  config({ path: path.resolve('apps/backend/api/.env') });
}
