import { type NextFunction, type Request, type Response } from 'express';
import * as googleTTS from 'google-tts-api';
import { TtsSchema } from '../schemas/tts.schema';

export async function textToSpeech(
  req: Request<unknown, unknown, unknown, TtsSchema['query']>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const text = req.query.text;
  const slow = req.query.slow === 'true';

  try {
    const audio = await googleTTS
      .getAllAudioBase64(text, {
        lang: 'fr',
        slow: slow,
        host: 'https://translate.google.com',
        timeout: 10000,
        splitPunct: ',.?',
      })
      .then((audios) => audios.flatMap((audio) => audio.base64).join(''));

    res.send({ message: audio, text: text });
  } catch (err) {
    next(err);
  }
}
