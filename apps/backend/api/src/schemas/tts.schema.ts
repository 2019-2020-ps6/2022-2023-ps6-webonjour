import { object, string } from 'zod';

export const ttsSchema = object({
  params: object({
    text: string({ required_error: 'Missing text parameter' }).nonempty({
      message: 'Text cannot be empty',
    }),
  }),
});
