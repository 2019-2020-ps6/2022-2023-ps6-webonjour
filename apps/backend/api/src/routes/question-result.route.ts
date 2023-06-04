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

const questionResultRouter = Router();

questionResultRouter.post(
  '/',
  validateSplit(undefined, undefined, Schema.QuestionResultCreateInputSchema),
  asyncHandler(createQuestionResultHandler)
);

questionResultRouter.get(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.QuestionResultWhereUniqueInputSchema,
    undefined,
    undefined
  ),
  asyncHandler(getQuestionResultByIdHandler)
);

questionResultRouter.put(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.QuestionResultWhereUniqueInputSchema,
    undefined,
    Schema.QuestionResultUpdateInputSchema
  ),
  asyncHandler(updateQuestionResultHandler)
);

questionResultRouter.delete(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.QuestionResultWhereUniqueInputSchema,
    undefined,
    undefined
  ),
  asyncHandler(deleteQuestionResultHandler)
);

questionResultRouter.get(
  '/',
  validateSplit(undefined, Schema.QuestionResultWhereInputSchema, undefined),
  asyncHandler(getAllQuestionResultHandler)
);

export default questionResultRouter;
