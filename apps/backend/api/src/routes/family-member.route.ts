import { Router } from 'express';
import { validateSplit } from '../middleware/validate';
import { Schema } from '@webonjour/util-interface';
import asyncHandler from 'express-async-handler';
import {
  createFamilyMemberHandler,
  deleteFamilyMemberHandler,
  getAllFamilyMemberHandler,
  getFamilyMemberByIdHandler,
  updateFamilyMemberHandler,
} from '../controllers/family-member.controller';
import { paramsParser } from '../middleware/requestPreParsers';

const familyMemberRouter = Router();
familyMemberRouter.get(
  '/',
  validateSplit(undefined, Schema.FamilyMemberWhereInputSchema, undefined),
  asyncHandler(getAllFamilyMemberHandler)
);

familyMemberRouter.get(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.FamilyMemberWhereUniqueInputSchema,
    undefined,
    undefined
  ),
  asyncHandler(getFamilyMemberByIdHandler)
);

familyMemberRouter.post(
  '/',
  validateSplit(undefined, undefined, Schema.FamilyMemberCreateInputSchema),
  asyncHandler(createFamilyMemberHandler)
);

familyMemberRouter.put(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.FamilyMemberWhereUniqueInputSchema,
    undefined,
    Schema.FamilyMemberUpdateInputSchema
  ),
  asyncHandler(updateFamilyMemberHandler)
);

familyMemberRouter.delete(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.FamilyMemberWhereUniqueInputSchema,
    undefined,
    undefined
  ),
  asyncHandler(deleteFamilyMemberHandler)
);

export default familyMemberRouter;
