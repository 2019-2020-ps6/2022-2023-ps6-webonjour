import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createAnswerHandler,
  getAnswerByIdHandler,
  updateAnswerHandler,
  deleteAnswerHandler,
  getAllAnswerHandler,
} from '../controllers/answer.controller';

import { validateSplit } from '../middleware/validate';
import { Schema } from '@webonjour/util-interface';
import { paramsParser } from '../middleware/requestPreParsers';
import { AnyZodObject, z } from 'zod';

const answerRouter = Router();

answerRouter.post(
  '/',
  validateSplit(undefined, undefined, Schema.AnswerCreateInputSchema),
  asyncHandler(createAnswerHandler)
);

answerRouter.get(
  '/:id',
  paramsParser(),
  validateSplit(Schema.AnswerWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(getAnswerByIdHandler)
);

answerRouter.put(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.AnswerWhereUniqueInputSchema,
    undefined,
    Schema.AnswerUpdateInputSchema
  ),
  asyncHandler(updateAnswerHandler)
);

answerRouter.delete(
  '/:id',
  paramsParser(),
  validateSplit(Schema.AnswerWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(deleteAnswerHandler)
);

answerRouter.get(
  '/',
  validateSplit(undefined, undefined, Schema.AnswerWhereInputSchema),
  asyncHandler(getAllAnswerHandler)
);

export default answerRouter;
