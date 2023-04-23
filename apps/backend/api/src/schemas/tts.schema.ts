import { boolean, object, string, TypeOf } from 'zod';

export const ttsSchema = object({
  query: object({
    text: string({ required_error: 'Missing text parameter' }).nonempty({
      message: 'Text cannot be empty',
    }),
    slow: string({ required_error: 'Missing slow parameter' }),
  }),
});

export type TtsSchema = TypeOf<typeof ttsSchema>;
