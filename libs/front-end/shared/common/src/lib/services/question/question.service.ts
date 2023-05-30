import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz, RequestWrapper } from '@webonjour/util-interface';
import { Answer, Clue, Prisma } from '@prisma/client';
import { environment } from '@webonjour/shared/environments';

type Question = Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>;

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  API_URL = `http://${environment.api.host}:${environment.api.port}`;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<RequestWrapper<Question[]>> {
    return this.httpClient.get<RequestWrapper<Question[]>>(
      this.API_URL + '/question'
    );
  }

  getById(id: number): Observable<RequestWrapper<Question>> {
    return this.httpClient.get<RequestWrapper<Question>>(
      this.API_URL + '/question/' + id
    );
  }

  create(
    question: Prisma.QuestionCreateInput
  ): Observable<RequestWrapper<Question>> {
    return this.httpClient.post<RequestWrapper<Question>>(
      this.API_URL + '/question',
      question
    );
  }

  delete(id: number) {
    return this.httpClient.delete<RequestWrapper<null>>(
      this.API_URL + '/question/' + id
    );
  }

  update(
    id: number,
    question: Prisma.QuestionUpdateInput
  ): Observable<RequestWrapper<Question>> {
    return this.httpClient.put<RequestWrapper<Question>>(
      this.API_URL + '/question/' + id,
      question
    );
  }

  createAnswer(
    answer: Prisma.AnswerCreateInput
  ): Observable<RequestWrapper<Answer>> {
    return this.httpClient.post<RequestWrapper<Answer>>(
      this.API_URL + '/answer',
      answer
    );
  }

  updateAnswer(
    id: number,
    answer: Prisma.AnswerUpdateInput
  ): Observable<RequestWrapper<Answer>> {
    return this.httpClient.put<RequestWrapper<Answer>>(
      this.API_URL + '/answer/' + id,
      answer
    );
  }

  deleteAnswer(id: number) {
    return this.httpClient.delete<RequestWrapper<null>>(
      this.API_URL + '/answer/' + id
    );
  }

  getAnswerById(answerId: number) {
    return this.httpClient.get<RequestWrapper<Answer>>(
      this.API_URL + '/answer/' + answerId
    );
  }

  deleteClue(id: number) {
    return this.httpClient.delete<RequestWrapper<null>>(
      this.API_URL + '/clue/' + id
    );
  }

  getClueById(clueId: number) {
    return this.httpClient.get<RequestWrapper<Clue>>(
      this.API_URL + '/clue/' + clueId
    );
  }

  createClue(clue: Prisma.ClueCreateInput): Observable<RequestWrapper<Clue>> {
    return this.httpClient.post<RequestWrapper<Clue>>(
      this.API_URL + '/clue',
      clue
    );
  }

  updateClue(
    questionId: number,
    clue: Prisma.ClueUpdateInput
  ): Observable<RequestWrapper<Clue>> {
    return this.httpClient.put<RequestWrapper<Clue>>(
      this.API_URL + '/clue/' + questionId,
      clue
    );
  }
}
