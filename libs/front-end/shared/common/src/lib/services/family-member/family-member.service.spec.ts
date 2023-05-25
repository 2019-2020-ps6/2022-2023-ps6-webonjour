import { TestBed } from '@angular/core/testing';

import { FamilyMemberService } from './family-member.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FamilyMemberService', () => {
  let service: FamilyMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FamilyMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
