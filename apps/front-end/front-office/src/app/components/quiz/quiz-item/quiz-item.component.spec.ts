import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizItemComponent } from './quiz-item.component';

import { Quiz } from '@webonjour/util-interface';

describe('QuizItemComponent', () => {
  let component: QuizItemComponent;
  let fixture: ComponentFixture<QuizItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a quiz input', () => {
    expect(component.quiz).toBeDefined();
  });

  it('should have a quiz title', () => {
    const quiz: Quiz.Quiz = {
      id: '1',
      title: 'Test Quiz',
      imageUrl: '',
      stage: 1
    };
    component.quiz = quiz;
    expect(component.quizTitle).toEqual('Test Quiz');
  });

  it('should have a quiz image URL', () => {
    const quiz: Quiz.Quiz = {
      id: '1',
      title: '',
      imageUrl: 'http://example.com/image.jpg',
      stage: 1
    };
    component.quiz = quiz;
    expect(component.quizImageUrl).toEqual('http://example.com/image.jpg');
  });

  it('should call selectQuiz() method when quiz is clicked', () => {
    spyOn(component, 'selectQuiz');
    const quizElement = fixture.nativeElement.querySelector('.quiz-item');
    quizElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.selectQuiz).toHaveBeenCalled();
  });
});
