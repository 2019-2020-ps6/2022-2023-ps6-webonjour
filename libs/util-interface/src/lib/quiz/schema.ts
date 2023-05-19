import { z } from 'zod';
import { DiseaseStage } from '@prisma/client';

export const getAllQuizSchema = z.object({
  query: z.object({
    id: z.optional(z.number()),
    title: z.optional(z.string()),
    isPrivate: z.optional(z.boolean()),
    stage: z.optional(z.nativeEnum(DiseaseStage)),
  }),
});

export type GetAllQuizSchema = z.infer<typeof getAllQuizSchema>;
