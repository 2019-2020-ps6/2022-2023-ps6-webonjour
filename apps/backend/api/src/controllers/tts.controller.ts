import { type NextFunction, type Request, Response } from 'express';
import * as googleTTS from 'google-tts-api';
import { RequestStatus, RequestWrapper, Tts } from '@webonjour/util-interface';

export async function textToSpeech(
  req: Request<unknown, unknown, Tts.TtsSchema, unknown>,
  res: Response<RequestWrapper<Tts.TtsResponse>>,
  next: NextFunction
): Promise<void> {
  const text = req.body.text;
  const slow = req.body.slow;

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
    res.status(200).send({
      data: {
        audio: audio,
        text: text,
      },
      message: 'Text to speech successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
}
