import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestWrapper } from '@webonjour/util-interface';
import { Prisma, QuestionResult } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class QuestionResultService {
  QUESTION_RESULT_URL = 'http://localhost:8000/api/question-results/';

  constructor(private httpClient: HttpClient) {}

  getQuestionResults() {
    return this.httpClient.get<RequestWrapper<QuestionResult[]>>(
      this.QUESTION_RESULT_URL
    );
  }

  getQuestionResult(id: number) {
    return this.httpClient.get<RequestWrapper<QuestionResult>>(
      this.QUESTION_RESULT_URL + id
    );
  }

  createQuestionResult(questionResult: Prisma.QuestionResultCreateInput) {
    return this.httpClient.post<RequestWrapper<QuestionResult>>(
      this.QUESTION_RESULT_URL,
      questionResult
    );
  }

  updateQuestionResult(
    id: number,
    questionResult: Prisma.QuestionResultUpdateInput
  ) {
    return this.httpClient.put<RequestWrapper<QuestionResult>>(
      this.QUESTION_RESULT_URL + id,
      questionResult
    );
  }

  deleteQuestionResult(id: number) {
    return this.httpClient.delete<RequestWrapper<null>>(
      this.QUESTION_RESULT_URL + id
    );
  }
}
