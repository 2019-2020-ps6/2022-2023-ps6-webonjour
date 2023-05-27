import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { getAllAccommodationHandler } from '../controllers/accommodation.controller';
import { Schema } from '@webonjour/util-interface';
import { validateSplit } from '../middleware/validate';

const router = Router();

router.get(
  '/',
  validateSplit(undefined, undefined, Schema.AccommodationWhereInputSchema),
  asyncHandler(getAllAccommodationHandler)
);

export default router;
