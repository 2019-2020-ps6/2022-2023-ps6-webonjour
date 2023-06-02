import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz, RequestWrapper } from '@webonjour/util-interface';
import { Answer, Clue, Prisma } from '@prisma/client';
import { environment, protocol } from '@webonjour/shared/environments';

type Question = Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>;

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  BASE_URL = `${protocol(environment.api.secure)}://${
    environment.api.domain
  }/api/`;
  QUESTION_URL = this.BASE_URL + 'questions/';
  CLUE_URL = this.BASE_URL + 'clues/';
  ANSWER_URL = this.BASE_URL + 'answers/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<RequestWrapper<Question[]>> {
    return this.httpClient.get<RequestWrapper<Question[]>>(this.QUESTION_URL);
  }

  getById(id: number): Observable<RequestWrapper<Question>> {
    return this.httpClient.get<RequestWrapper<Question>>(
      this.QUESTION_URL + id
    );
  }

  create(
    question: Prisma.QuestionCreateInput
  ): Observable<RequestWrapper<Question>> {
    return this.httpClient.post<RequestWrapper<Question>>(
      this.QUESTION_URL,
      question
    );
  }

  delete(id: number) {
    return this.httpClient.delete<RequestWrapper<null>>(this.QUESTION_URL + id);
  }

  update(
    id: number,
    question: Prisma.QuestionUpdateInput
  ): Observable<RequestWrapper<Question>> {
    return this.httpClient.put<RequestWrapper<Question>>(
      this.QUESTION_URL + id,
      question
    );
  }

  createAnswer(
    answer: Prisma.AnswerCreateInput
  ): Observable<RequestWrapper<Answer>> {
    return this.httpClient.post<RequestWrapper<Answer>>(
      this.ANSWER_URL,
      answer
    );
  }

  updateAnswer(
    id: number,
    answer: Prisma.AnswerUpdateInput
  ): Observable<RequestWrapper<Answer>> {
    return this.httpClient.put<RequestWrapper<Answer>>(
      this.ANSWER_URL + id,
      answer
    );
  }

  deleteAnswer(id: number) {
    return this.httpClient.delete<RequestWrapper<null>>(this.ANSWER_URL + id);
  }

  getAnswerById(answerId: number) {
    return this.httpClient.get<RequestWrapper<Answer>>(
      this.ANSWER_URL + answerId
    );
  }

  deleteClue(id: number) {
    return this.httpClient.delete<RequestWrapper<null>>(this.CLUE_URL + id);
  }

  getClueById(clueId: number) {
    return this.httpClient.get<RequestWrapper<Clue>>(this.CLUE_URL + clueId);
  }

  createClue(clue: Prisma.ClueCreateInput): Observable<RequestWrapper<Clue>> {
    return this.httpClient.post<RequestWrapper<Clue>>(this.CLUE_URL, clue);
  }

  updateClue(
    questionId: number,
    clue: Prisma.ClueUpdateInput
  ): Observable<RequestWrapper<Clue>> {
    return this.httpClient.put<RequestWrapper<Clue>>(
      this.CLUE_URL + questionId,
      clue
    );
  }
}
