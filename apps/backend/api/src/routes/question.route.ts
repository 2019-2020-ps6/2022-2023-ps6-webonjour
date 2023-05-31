import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createQuestionHandler,
  getQuestionByIdHandler,
  updateQuestionHandler,
  deleteQuestionHandler,
  getAllQuestionHandler,
} from '../controllers/question.controller';

import { validateSplit } from '../middleware/validate';
import { Schema } from '@webonjour/util-interface';
import { paramsParser } from '../middleware/requestPreParsers';
import { AnyZodObject, z } from 'zod';

const questionRouter = Router();

questionRouter.post(
  '/',
  validateSplit(undefined, undefined, Schema.QuestionCreateInputSchema),
  asyncHandler(createQuestionHandler)
);

questionRouter.get(
  '/:id',
  paramsParser(),
  validateSplit(Schema.QuestionWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(getQuestionByIdHandler)
);

questionRouter.put(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.QuestionWhereUniqueInputSchema,
    undefined,
    Schema.QuestionUpdateInputSchema
  ),
  asyncHandler(updateQuestionHandler)
);

questionRouter.delete(
  '/:id',
  paramsParser(),
  validateSplit(Schema.QuestionWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(deleteQuestionHandler)
);

questionRouter.get(
  '/',
  validateSplit(undefined, undefined, Schema.QuestionWhereInputSchema),
  asyncHandler(getAllQuestionHandler)
);

export default questionRouter;