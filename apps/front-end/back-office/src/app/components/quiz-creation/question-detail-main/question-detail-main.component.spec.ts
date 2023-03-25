import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailMainComponent } from './question-detail-main.component';

describe('QuestionDetailMainComponent', () => {
  let component: QuestionDetailMainComponent;
  let fixture: ComponentFixture<QuestionDetailMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionDetailMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionDetailMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
