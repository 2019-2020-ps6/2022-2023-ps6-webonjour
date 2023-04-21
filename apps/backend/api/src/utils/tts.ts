import * as googleTTS from 'google-tts-api';

export async function textToSpeech(
  text: string,
  slow: boolean = false
): Promise<string> {
  return await googleTTS
    .getAllAudioBase64(text, {
      lang: 'fr',
      slow: slow,
      host: 'https://translate.google.com',
      timeout: 10000,
      splitPunct: ',.?',
    })
    .then((audios) => audios.flatMap((audio) => audio.base64).join(''));
}
