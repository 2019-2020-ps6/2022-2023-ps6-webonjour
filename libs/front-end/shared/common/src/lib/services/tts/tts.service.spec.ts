import { TestBed } from '@angular/core/testing';

import { TtsService } from './tts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TtsService', () => {
  let service: TtsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TtsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
