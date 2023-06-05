import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import {
  createAccommodationHandler,
  deleteAccommodationHandler,
  getAccommodationByIdHandler,
  getAllAccommodationHandler,
  updateAccommodationHandler,
} from '../controllers/accommodation.controller';
import { Schema } from '@webonjour/util-interface';
import { validateSplit } from '../middleware/validate';
import { paramsParser } from '../middleware/requestPreParsers';

const accommodationRouter = Router();

accommodationRouter.get(
  '/',
  validateSplit(undefined, Schema.AccommodationWhereInputSchema, undefined),
  asyncHandler(getAllAccommodationHandler)
);

accommodationRouter.delete(
  '/:id',
  paramsParser(),
  validateSplit(Schema.AccommodationWhereUniqueInputSchema),
  asyncHandler(deleteAccommodationHandler)
);

accommodationRouter.put(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.AccommodationWhereUniqueInputSchema,
    undefined,
    Schema.AccommodationUpdateInputSchema
  ),
  asyncHandler(updateAccommodationHandler)
);

accommodationRouter.get(
  '/:id',
  paramsParser(),
  validateSplit(Schema.AccommodationWhereUniqueInputSchema),
  asyncHandler(getAccommodationByIdHandler)
);

accommodationRouter.post(
  '/',
  validateSplit(undefined, undefined, Schema.AccommodationCreateInputSchema),
  asyncHandler(createAccommodationHandler)
);

export default accommodationRouter;
