import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestWrapper } from '@webonjour/util-interface';
import { Observable } from 'rxjs';
import { Prisma } from '@prisma/client';
import { Quiz } from '@webonjour/util-interface';
import { environment } from '@webonjour/shared/environments';

type Quiz = Prisma.QuizGetPayload<Quiz.QuizWithQuestions>;

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  API_URL = `http://${environment.api.host}:${environment.api.port}`;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<RequestWrapper<Quiz[]>> {
    return this.httpClient.get<RequestWrapper<Quiz[]>>(this.API_URL + '/quiz');
  }

  getById(id: number): Observable<RequestWrapper<Quiz>> {
    return this.httpClient.get<RequestWrapper<Quiz>>(
      this.API_URL + '/quiz/' + id
    );
  }

  addQuestion(
    id: number,
    question: Prisma.QuestionCreateInput
  ): Observable<RequestWrapper<Quiz>> {
    return this.httpClient.post<RequestWrapper<Quiz>>(
      this.API_URL + '/quiz/' + id + '/question',
      question
    );
  }

  create(quiz: Prisma.QuizCreateInput): Observable<RequestWrapper<Quiz>> {
    return this.httpClient.post<RequestWrapper<Quiz>>(
      this.API_URL + '/quiz',
      quiz
    );
  }

  delete(id: number) {
    return this.httpClient.delete<RequestWrapper<null>>(
      this.API_URL + '/quiz/' + id
    );
  }
}
