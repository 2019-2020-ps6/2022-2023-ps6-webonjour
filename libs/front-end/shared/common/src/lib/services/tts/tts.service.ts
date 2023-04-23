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
        let audio = new Audio('data:audio/mpeg;base64,' + data);
        audio.play();
      });
  }
}

/*
import { HttpClient } from "@angular/common/http";

/// Angular class that will be used to call the TTS API 
class TTS {
    constructor(private http: HttpClient) { }
    


export function sayTTS(text: string, slow: boolean=false) {

    const params = {
        // The text string to synthesize in the voice specified by voice.
        text: text,
        slow: slow,
    };

    // Construct the URL with URLSearchParams
    const searchParams = new URLSearchParams(params);
    



    let req = new XMLHttpRequest();
    // url encode the text
    text = encodeURIComponent(text);
    req.open('GET', `http://localhost:8000/api/tts/${text}/false`, true);

    req.onload = function () {
        let audio = new Audio();
        console.log(req.response);
        audio.src = window.URL.createObjectURL(new Blob([req.response], { type: 'audio/mpeg' }));
        audio.play();
    }
    req.send();
}
*/
