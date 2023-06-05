import { TestBed } from '@angular/core/testing';

import { QuizSessionService } from './quiz-session.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QuizSessionService', () => {
  let service: QuizSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(QuizSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
