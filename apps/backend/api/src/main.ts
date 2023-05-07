import './env.config.loader';
import config from 'config';
import connectDB from './utils/connectDB';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import AppError from './utils/appError';
import cookieParser from 'cookie-parser';
import ttsRouter from './routes/tts.route';

const host = config.get<string>('host');
const port = config.get<number>('port');

const app = express();

// Middleware
// 1. Body Parser

app.use(express.json({ limit: '10kb' }));
// 2. Cookie Parser

app.use(cookieParser());
// 3. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// 4. Cors
const origin = `http://${host}:${port}`;
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);

// 5. Routes
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

app.get('/api/tts', ttsRouter);

// Unknown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (err.status == null) {
    err.status = 'error';
  }
  if (err.statusCode == null) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  next();
});
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
  connectDB().catch((error: Error) => {
    console.log(error.message);
  });
});
