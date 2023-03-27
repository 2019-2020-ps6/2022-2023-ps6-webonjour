import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz, RequestWrapper } from '@webonjour/util-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  API_URL = 'http://localhost:3333';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<RequestWrapper<Quiz.Quiz[]>> {
    return this.httpClient.get<RequestWrapper<Quiz.Quiz[]>>(
      this.API_URL + '/quiz'
    );
  }
}
