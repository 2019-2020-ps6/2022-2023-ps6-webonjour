import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Note: we might be able to use the Web Speech API instead of Google TTS
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

interface TTSResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class TtsService {
  API_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  sayTTS(text: string, slow: boolean = false) {
    this.http
      .get<TTSResponse>(`${this.API_URL}/api/tts?text=${text}&slow=${slow}`)
      .subscribe((res) => {
        const data = res['message']; // base64 encoded mp3

        console.log('test: ', text);
        const audio = new Audio('data:audio/mpeg;base64,' + data);
        audio.play();
      });
  }
}
