import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailMainComponent } from './question-detail-main.component';
import { Quiz } from '@webonjour/util-interface';

describe('QuestionDetailMainComponent', () => {
  let component: QuestionDetailMainComponent;
  let fixture: ComponentFixture<QuestionDetailMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionDetailMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionDetailMainComponent);
    component = fixture.componentInstance;
    component.question = {
      title: 'test',
      type: Quiz.QuestionType.CHOICE,
      quiz: {
        connect: {
          id: 1,
        },
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
