import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createQuizHandler,
  getAllQuizHandler,
  getQuizByIdHandler,
} from '../controllers/quiz.controller';
import { validateSplit } from '../middleware/validate';
import { Schema } from '@webonjour/util-interface';
import { paramsParser } from '../middleware/requestPreParsers';

const quizRouter = Router();

quizRouter.get('/', asyncHandler(getAllQuizHandler));
quizRouter.get(
  '/:id',
  paramsParser(),
  validateSplit(Schema.QuizWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(getQuizByIdHandler)
);

quizRouter.post(
  '/',
  validateSplit(undefined, undefined, Schema.QuizCreateInputSchema),
  asyncHandler(createQuizHandler)
);

export default quizRouter;
