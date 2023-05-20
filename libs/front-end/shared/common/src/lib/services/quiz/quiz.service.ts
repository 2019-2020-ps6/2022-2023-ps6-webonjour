import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestWrapper } from '@webonjour/util-interface';
import { Observable } from 'rxjs';
import { Prisma } from '@prisma/client';

type Quiz = Prisma.QuizGetPayload<{
  include: {
    questions: {
      include: {
        answers: true;
        clues: true;
      };
    };
  };
}>;

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  API_URL = 'http://localhost:3333';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<RequestWrapper<Quiz[]>> {
    return this.httpClient.get<RequestWrapper<Quiz[]>>(this.API_URL + '/quiz');
  }

  getById(id: string): Observable<RequestWrapper<Quiz>> {
    return this.httpClient.get<RequestWrapper<Quiz>>(
      this.API_URL + '/quiz/' + id
    );
  }

  addQuestion(
    id: string,
    question: Prisma.QuestionCreateInput
  ): Observable<RequestWrapper<Quiz>> {
    return this.httpClient.post<RequestWrapper<Quiz>>(
      this.API_URL + '/quiz/' + id + '/question',
      question
    );
  }

  create(quiz: Quiz): Observable<RequestWrapper<Quiz>> {
    return this.httpClient.post<RequestWrapper<Quiz>>(
      this.API_URL + '/quiz',
      quiz
    );
  }

  delete(id: string) {
    return this.httpClient.delete<RequestWrapper<null>>(
      this.API_URL + '/quiz/' + id
    );
  }
}
