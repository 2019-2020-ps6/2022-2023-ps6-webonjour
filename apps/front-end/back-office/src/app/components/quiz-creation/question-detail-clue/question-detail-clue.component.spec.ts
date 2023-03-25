import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailClueComponent } from './question-detail-clue.component';

describe('QuestionDetailClueComponent', () => {
  let component: QuestionDetailClueComponent;
  let fixture: ComponentFixture<QuestionDetailClueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionDetailClueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionDetailClueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
