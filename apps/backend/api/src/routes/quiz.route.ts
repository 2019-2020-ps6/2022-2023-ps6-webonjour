import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createQuizHandler,
  getAllQuizHandler,
  getQuizByIdHandler,
} from '../controllers/quiz.controller';
import { validate, validateSplit } from '../middleware/validate';
import { Schema } from '@webonjour/util-interface';
import { z } from 'zod';
import { paramsParser } from '../utils/requestPreParsers';

const quizRouter = Router();

quizRouter.get('/', asyncHandler(getAllQuizHandler));
quizRouter.get(
  '/:id',
  paramsParser(),
  (req, res, next) => {
    console.log('req.params.id', req.params.id);
    console.log('type', typeof req.params.id);
    next();
  },

  validateSplit(Schema.QuizWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(getQuizByIdHandler)
);

quizRouter.post(
  '/',
  validate(
    z.object({
      body: Schema.QuizCreateInputSchema,
    })
  ),
  asyncHandler(createQuizHandler)
);

export default quizRouter;
