import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createPatientHandler,
  deletePatientHandler,
  getAllPatientHandler,
  getPatientByIdHandler,
  updatePatientHandler,
} from '../controllers/patient.controller';

import {
  addRelatedAccommodationHandler,
  deleteRelatedAccommodationHandler,
  getRelatedAccommodationHandler,
} from '../controllers/patient.accommodation.controller';

import { validateSplit } from '../middleware/validate';
import { Schema } from '@webonjour/util-interface';
import { paramsParser } from '../middleware/requestPreParsers';
import { AnyZodObject, z } from 'zod';
import {
  addRelatedQuizHandler,
  deleteRelatedQuizHandler,
  getAllRelatedQuizHandler,
} from '../controllers/patient.quiz.controller';
import {
  addRelatedFamilyMemberHandler,
  deleteRelatedFamilyMemberHandler,
  getRelatedFamilyMemberHandler,
} from '../controllers/patient.family-member.controller';

const patientRouter = Router();

patientRouter.get(
  '/',
  paramsParser(),
  validateSplit(undefined, Schema.PatientWhereInputSchema, undefined),
  asyncHandler(getAllPatientHandler)
);

patientRouter.get(
  '/:id',
  paramsParser(),
  validateSplit(Schema.PatientWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(getPatientByIdHandler)
);

patientRouter.post(
  '/',
  validateSplit(undefined, undefined, Schema.PatientCreateInputSchema),
  asyncHandler(createPatientHandler)
);

patientRouter.put(
  '/:id',
  paramsParser(),
  validateSplit(
    Schema.PatientWhereUniqueInputSchema,
    undefined,
    Schema.PatientUpdateInputSchema
  ),
  asyncHandler(updatePatientHandler)
);

patientRouter.delete(
  '/:id',
  paramsParser(),
  validateSplit(Schema.PatientWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(deletePatientHandler)
);

patientRouter.get(
  '/:id/accommodation',
  paramsParser(),
  validateSplit(Schema.PatientWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(getRelatedAccommodationHandler)
);

export const relatedAccommodationSchema: z.ZodType = (
  Schema.PatientWhereUniqueInputSchema as AnyZodObject
).extend({
  accommodationId: z.number(),
});

patientRouter.post(
  '/:id/accommodation/:accommodationId',
  paramsParser(),
  validateSplit(relatedAccommodationSchema, undefined, undefined),
  asyncHandler(addRelatedAccommodationHandler)
);

patientRouter.delete(
  '/:id/accommodation/:accommodationId',
  paramsParser(),
  validateSplit(relatedAccommodationSchema, undefined, undefined),
  asyncHandler(deleteRelatedAccommodationHandler)
);

export const relatedQuizSchema: z.ZodType = (
  Schema.PatientWhereUniqueInputSchema as AnyZodObject
).extend({
  quizId: z.number(),
});

patientRouter.post(
  '/:id/quiz/:quizId',
  paramsParser(),
  validateSplit(relatedQuizSchema, undefined, undefined),
  asyncHandler(addRelatedQuizHandler)
);

patientRouter.delete(
  '/:id/quiz/:quizId',
  paramsParser(),
  validateSplit(relatedQuizSchema, undefined, undefined),
  asyncHandler(deleteRelatedQuizHandler)
);

patientRouter.get(
  '/:id/quiz',
  paramsParser(),
  validateSplit(Schema.PatientWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(getAllRelatedQuizHandler)
);

export const relatedFamilyMemberSchema: z.ZodType = (
  Schema.PatientWhereUniqueInputSchema as AnyZodObject
).extend({
  familyMemberId: z.number(),
});

patientRouter.post(
  '/:id/familyMember/:familyMemberId',
  paramsParser(),
  validateSplit(relatedFamilyMemberSchema, undefined, undefined),
  asyncHandler(addRelatedFamilyMemberHandler)
);

patientRouter.delete(
  '/:id/familyMember/:familyMemberId',
  paramsParser(),
  validateSplit(relatedFamilyMemberSchema, undefined, undefined),
  asyncHandler(deleteRelatedFamilyMemberHandler)
);

patientRouter.get(
  '/:id/familyMember',
  paramsParser(),
  validateSplit(Schema.PatientWhereUniqueInputSchema, undefined, undefined),
  asyncHandler(getRelatedFamilyMemberHandler)
);

export default patientRouter;
