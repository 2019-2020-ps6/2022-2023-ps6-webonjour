import { TestBed } from '@angular/core/testing';

import { QuestionResultService } from './question-result.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QuestionResultService', () => {
  let service: QuestionResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(QuestionResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
