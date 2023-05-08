import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestWrapper, Tts } from '@webonjour/util-interface';

// Note: we might be able to use the Web Speech API instead of Google TTS
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

@Injectable({
  providedIn: 'root',
})
export class TtsService {
  API_URL = 'http://localhost:8000';
  private audio = new Audio();

  constructor(private http: HttpClient) {}

  sayTTS(text: string, slow: boolean = false) {
    this.http
      .get<RequestWrapper<Tts.TtsResponse>>(
        `${this.API_URL}/api/tts?text=${text}&slow=${slow}`
      )
      .subscribe((res) => {
        console.log('test: ', text);
        this.audio.pause();
        this.audio = new Audio('data:audio/mpeg;base64,' + res.data.audio);
        this.audio.play().then(() => {
          console.log('Audio started');
        });
      });
  }
}
