import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeBackendProvider } from '@webonjour/data-access-fake-backend';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [fakeBackendProvider],
    });
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of quiz', () => {
    service.getAll().subscribe((quizList) => {
      expect(quizList.data.length).toBe(2);
    });
  });
});
