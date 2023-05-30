import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { createAnswerHandler } from '../controllers/answer.controller';

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
