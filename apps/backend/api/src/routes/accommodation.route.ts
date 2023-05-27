import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import {
  getAllAccommodationHandler,
  deleteAccommodationHandler,
} from '../controllers/accommodation.controller';
import { Schema } from '@webonjour/util-interface';
import { validateSplit } from '../middleware/validate';
import { paramsParser } from '../middleware/requestPreParsers';

const accommodationRouter = Router();

accommodationRouter.get(
  '/',
  validateSplit(undefined, undefined, Schema.AccommodationWhereInputSchema),
  asyncHandler(getAllAccommodationHandler)
);

accommodationRouter.delete(
  '/:id',
  paramsParser(),
  validateSplit(Schema.AccommodationWhereUniqueInputSchema),
  asyncHandler(deleteAccommodationHandler)
);

export default accommodationRouter;
