import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createQuestionHandler,
  deleteQuestionHandler,
  getAllQuestionHandler,
  getQuestionByIdHandler,
  updateQuestionHandler,
} from '../controllers/question.controller';

import { validateSplit } from '../middleware/validate';
import { Schema } from '@webonjour/util-interface';
import { paramsParser } from '../middleware/requestPreParsers';

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
  validateSplit(undefined, Schema.QuestionWhereInputSchema, undefined),
  asyncHandler(getAllQuestionHandler)
);

export default questionRouter;
