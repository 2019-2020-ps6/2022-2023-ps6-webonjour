import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prisma, QuizSession } from '@prisma/client';
import { RequestWrapper } from '@webonjour/util-interface';

@Injectable({
  providedIn: 'root',
})
export class QuizSessionService {
  QUIZ_SESSION_URL = 'http://localhost:8000/api/quiz-sessions/';

  constructor(private httpClient: HttpClient) {}

  getQuizSessions() {
    return this.httpClient.get<RequestWrapper<QuizSession[]>>(
      this.QUIZ_SESSION_URL
    );
  }

  getQuizSession(id: number) {
    return this.httpClient.get<RequestWrapper<QuizSession>>(
      this.QUIZ_SESSION_URL + id
    );
  }

  createQuizSession(quizSession: Prisma.QuizSessionCreateInput) {
    return this.httpClient.post<RequestWrapper<QuizSession>>(
      this.QUIZ_SESSION_URL,
      quizSession
    );
  }

  updateQuizSession(id: number, quizSession: Prisma.QuizSessionUpdateInput) {
    return this.httpClient.put<RequestWrapper<QuizSession>>(
      this.QUIZ_SESSION_URL + id,
      quizSession
    );
  }

  deleteQuizSession(id: number) {
    return this.httpClient.delete<RequestWrapper<null>>(
      this.QUIZ_SESSION_URL + id
    );
  }
}
