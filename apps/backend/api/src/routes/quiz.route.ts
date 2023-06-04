import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createQuizHandler,
  deleteQuizHandler,
  getAllQuizHandler,
  getQuizByIdHandler,
  updateQuizHandler,
} from '../controllers/quiz.controller';
import { validateSplit } from '../middleware/validate';
import { Schema } from '@webonjour/util-interface';
import { paramsParser } from '../middleware/requestPreParsers';

const quizRouter = Router();

quizRouter.get(
  '/',
  validateSplit(undefined, Schema.QuizWhereInputSchema, undefined),
  asyncHandler(getAllQuizHandler)
);
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

quizRouter.put(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.QuizWhereUniqueInputSchema,
    undefined,
    Schema.QuizUpdateInputSchema
  ),
  asyncHandler(updateQuizHandler)
);

export default quizRouter;
