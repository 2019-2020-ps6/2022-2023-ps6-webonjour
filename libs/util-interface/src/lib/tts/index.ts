import { boolean, object, string, TypeOf } from 'zod';

export const ttsSchema = object({
  text: string({ required_error: 'Missing text parameter' }).min(
    1,
    'Text cannot be empty'
  ),
  slow: boolean({ required_error: 'Missing slow parameter' }),
});

export interface TtsResponse {
  audio: string;
  text: string;
}

export type TtsSchema = TypeOf<typeof ttsSchema>;
