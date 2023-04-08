import './env.config.loader';
import config from 'config';
import express from 'express';
import connectDB from './utils/connectDB';
import mongoose from 'mongoose';

const host = config.get<string>('host');
const port = config.get<number>('port');

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/health', (req, res) => {
  // check if the database is connected
  if (mongoose.connection.readyState !== 1) {
    res.status(500).send({ message: 'Database not connected' });
    return;
  }
  res.send({ message: 'OK' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
  connectDB().catch((error: Error) => {
    console.log(error.message);
  });
});
