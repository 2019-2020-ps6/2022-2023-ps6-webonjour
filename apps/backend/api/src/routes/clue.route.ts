import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createClueHandler,
  getClueByIdHandler,
  updateClueHandler,
  deleteClueHandler,
  getAllClueHandler,
} from '../controllers/clue.controller';

import { validateSplit } from '../middleware/validate';
import { Schema } from '@webonjour/util-interface';
import { paramsParser } from '../middleware/requestPreParsers';
import { AnyZodObject, z } from 'zod';

const clueRouter = Router();

clueRouter.post(
  '/',
  validateSplit(undefined, undefined, Schema.ClueCreateInputSchema),
  asyncHandler(createClueHandler)
);

clueRouter.get(
  '/:id',
  paramsParser(),
  validateSplit(Schema.ClueWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(getClueByIdHandler)
);

clueRouter.put(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.ClueWhereUniqueInputSchema,
    undefined,
    Schema.ClueUpdateInputSchema
  ),
  asyncHandler(updateClueHandler)
);

clueRouter.delete(
  '/:id',
  paramsParser(),
  validateSplit(Schema.ClueWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(deleteClueHandler)
);

clueRouter.get(
  '/',
  validateSplit(undefined, undefined, Schema.ClueWhereInputSchema),
  asyncHandler(getAllClueHandler)
);

export default clueRouter;
