import './env.config.loader';
import config from 'config';
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
import prisma from './utils/connectDB';
import quizRouter from './routes/quiz.route';
import { queryParser } from './middleware/requestPreParsers';
import patientRouter from './routes/patient.route';
import accommodationRouter from './routes/accommodation.route';
import answerRouter from './routes/answer.route';
import familyMemberRouter from './routes/family-member.route';
import clueRouter from './routes/clue.route';
import questionRouter from './routes/question.route';

const host = config.get<string>('host');
const port = config.get<number>('port');

const app = express();
app.disable('x-powered-by');

// Middleware
// 1. Body Parser

app.use(express.json({ limit: '10kb' }));
// 2. Cookie Parser

app.use(cookieParser());
// 3. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(queryParser());
// 4. Cors
const origin = `*`;
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
  res.send({ message: 'OK' });
});

app.get('/api/tts', ttsRouter);
app.use('/api/accommodation', accommodationRouter);
app.use('/api/answer', answerRouter);
app.use('/api/clues', clueRouter);
app.use('/api/questions', questionRouter);
app.use('/api/quizzes', quizRouter);
app.use('/api/patients', patientRouter);
app.use('/api/family-members', familyMemberRouter);

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
  prisma.$connect().then(() => {
    console.log(`[ ready ] Database connected`);
  });
});
