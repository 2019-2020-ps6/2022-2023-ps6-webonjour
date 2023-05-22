import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionClueComponent } from './question-clue.component';

describe('QuestionClueComponent', () => {
  let component: QuestionClueComponent;
  let fixture: ComponentFixture<QuestionClueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionClueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionClueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
