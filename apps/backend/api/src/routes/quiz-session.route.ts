import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createQuizSessionHandler,
  deleteQuizSessionHandler,
  getAllQuizSessionHandler,
  getQuizSessionByIdHandler,
  updateQuizSessionHandler,
} from '../controllers/quiz-session.controller';

import { validateSplit } from '../middleware/validate';
import { Schema } from '@webonjour/util-interface';
import { paramsParser } from '../middleware/requestPreParsers';

const quizSessionRouter = Router();

quizSessionRouter.post(
  '/',
  validateSplit(undefined, undefined, Schema.QuizSessionCreateInputSchema),
  asyncHandler(createQuizSessionHandler)
);

quizSessionRouter.get(
  '/:id',
  paramsParser(),
  validateSplit(Schema.QuizSessionWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(getQuizSessionByIdHandler)
);

quizSessionRouter.put(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.QuizSessionWhereUniqueInputSchema,
    undefined,
    Schema.QuizSessionUpdateInputSchema
  ),
  asyncHandler(updateQuizSessionHandler)
);

quizSessionRouter.delete(
  '/:id',
  paramsParser(),
  validateSplit(Schema.QuizSessionWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(deleteQuizSessionHandler)
);

quizSessionRouter.get(
  '/',
  validateSplit(undefined, Schema.QuizSessionWhereInputSchema, undefined),
  asyncHandler(getAllQuizSessionHandler)
);

export default quizSessionRouter;
