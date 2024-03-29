import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestWrapper } from '@webonjour/util-interface';
import { Observable } from 'rxjs';
import { Prisma } from '@prisma/client';
import { Quiz } from '@webonjour/util-interface';
import { environment, api_root } from '@webonjour/shared/environments';

type Quiz = Prisma.QuizGetPayload<Quiz.QuizWithQuestions>;

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  QUIZ_URL = api_root(environment) + '/quizzes/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<RequestWrapper<Quiz[]>> {
    return this.httpClient.get<RequestWrapper<Quiz[]>>(this.QUIZ_URL);
  }

  getById(id: number): Observable<RequestWrapper<Quiz>> {
    return this.httpClient.get<RequestWrapper<Quiz>>(this.QUIZ_URL + id);
  }

  addQuestion(
    id: number,
    questionId: number
  ): Observable<RequestWrapper<Quiz>> {
    const input: Prisma.QuizUpdateInput = {
      questions: {
        connect: {
          id: questionId,
        },
      },
    };

    return this.httpClient.put<RequestWrapper<Quiz>>(this.QUIZ_URL + id, input);
  }

  create(quiz: Prisma.QuizCreateInput): Observable<RequestWrapper<Quiz>> {
    return this.httpClient.post<RequestWrapper<Quiz>>(this.QUIZ_URL, quiz);
  }

  update(
    id: number,
    quiz: Prisma.QuizUpdateInput
  ): Observable<RequestWrapper<Quiz>> {
    return this.httpClient.put<RequestWrapper<Quiz>>(this.QUIZ_URL + id, quiz);
  }

  delete(id: number) {
    return this.httpClient.delete<RequestWrapper<null>>(this.QUIZ_URL + id);
  }
}
