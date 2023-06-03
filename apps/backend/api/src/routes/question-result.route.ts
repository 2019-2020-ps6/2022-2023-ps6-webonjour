import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createQuestionResultHandler,
  deleteQuestionResultHandler,
  getAllQuestionResultHandler,
  getQuestionResultByIdHandler,
  updateQuestionResultHandler,
} from '../controllers/question-result.controller';

import { validateSplit } from '../middleware/validate';
import { Schema } from '@webonjour/util-interface';
import { paramsParser } from '../middleware/requestPreParsers';

const clueRouter = Router();

clueRouter.post(
  '/',
  validateSplit(undefined, undefined, Schema.QuestionResultCreateInputSchema),
  asyncHandler(createQuestionResultHandler)
);

clueRouter.get(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.QuestionResultWhereUniqueInputSchema,
    undefined,
    undefined
  ),
  asyncHandler(getQuestionResultByIdHandler)
);

clueRouter.put(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.QuestionResultWhereUniqueInputSchema,
    undefined,
    Schema.QuestionResultUpdateInputSchema
  ),
  asyncHandler(updateQuestionResultHandler)
);

clueRouter.delete(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.QuestionResultWhereUniqueInputSchema,
    undefined,
    undefined
  ),
  asyncHandler(deleteQuestionResultHandler)
);

clueRouter.get(
  '/',
  validateSplit(undefined, Schema.QuestionResultWhereInputSchema, undefined),
  asyncHandler(getAllQuestionResultHandler)
);

export default clueRouter;
