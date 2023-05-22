import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswerAddPopupComponent } from './question-answer-add-popup.component';

describe('QuestionAnswerAddPopupComponent', () => {
  let component: QuestionAnswerAddPopupComponent;
  let fixture: ComponentFixture<QuestionAnswerAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionAnswerAddPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionAnswerAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
