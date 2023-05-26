import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createQuizHandler,
  getAllQuizHandler,
  getQuizByIdHandler,
  updateQuizHandler,
  deleteQuizHandler,
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

quizRouter.delete(
  '/:id',
  paramsParser(),
  validateSplit(Schema.QuizWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(deleteQuizHandler)
);

quizRouter.post(
  '/',
  validateSplit(undefined, undefined, Schema.QuizCreateInputSchema),
  asyncHandler(createQuizHandler)
);

const combinedMiddleware = [
  paramsParser(),
  validateSplit(Schema.QuizWhereUniqueInputSchema, undefined, undefined),
];

quizRouter.put(
  '/:id',
  combinedMiddleware,
  validateSplit(undefined, undefined, Schema.QuizUpdateInputSchema),
  asyncHandler(updateQuizHandler)
);

export default quizRouter;
