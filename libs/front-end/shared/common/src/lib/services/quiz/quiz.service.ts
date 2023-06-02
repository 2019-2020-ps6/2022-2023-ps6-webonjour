import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestWrapper } from '@webonjour/util-interface';
import { Observable } from 'rxjs';
import { Prisma } from '@prisma/client';
import { Quiz } from '@webonjour/util-interface';

type Quiz = Prisma.QuizGetPayload<Quiz.QuizWithQuestions>;

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  API_URL = 'http://localhost:8000/api';
  QUIZ_URL = this.API_URL + '/quizzes/';

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

  delete(id: number) {
    return this.httpClient.delete<RequestWrapper<null>>(this.QUIZ_URL + id);
  }
}
