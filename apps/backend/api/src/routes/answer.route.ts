import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createAnswerHandler,
  getAnswerByIdHandler,
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
