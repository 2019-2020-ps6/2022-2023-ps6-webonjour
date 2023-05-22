import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionClueAddPopupComponent } from './question-clue-add-popup.component';

describe('QuestionClueAddPopupComponent', () => {
  let component: QuestionClueAddPopupComponent;
  let fixture: ComponentFixture<QuestionClueAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionClueAddPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionClueAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
