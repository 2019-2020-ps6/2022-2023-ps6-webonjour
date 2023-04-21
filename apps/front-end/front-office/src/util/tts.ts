import * as googleTTS from 'google-tts-api';

export function sayTTS(text: string, slow: boolean = false) {
  /*
    googleTTS
        .getAllAudioBase64(text, {
            lang: 'fr',
            slow: slow,
            host: 'https://translate.google.com',
            timeout: 10000,
            splitPunct: ',.?',
        })
        .then(audios => { console.log(audios) })
        .catch(console.error);*/

  const urls = googleTTS.getAllAudioUrls(text, {
    lang: 'fr',
    slow: slow,
    host: 'https://translate.google.com',
    splitPunct: ',.?',
  });

  for (let url of urls) {
    fetch(url.url, {
      headers: {
        Referer: 'https://translate.google.com/',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299',
      },
    })
      .then((response) => response.arrayBuffer())
      .then((audioData) => {
        const audioContext = new AudioContext();
        audioContext.decodeAudioData(audioData, (decodedData) => {
          const audioSource = audioContext.createBufferSource();
          audioSource.buffer = decodedData;
          audioSource.connect(audioContext.destination);
          audioSource.start();
        });
      })
      .catch((error) => console.error(error));
  }
}
