import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizItemComponent } from './quiz-item.component';

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
    component.quiz = {
      id: '1',
      title: 'Test Quiz',
      imageUrl: '',
      stage: 1,
      questions: [],
    };
    expect(component.quizTitle).toEqual('Test Quiz');
  });

  it('should have a quiz image URL', () => {
    component.quiz = {
      id: '1',
      title: '',
      imageUrl: 'http://example.com/image.jpg',
      stage: 1,
      questions: [],
    };
    expect(component.quizImageUrl).toEqual('http://example.com/image.jpg');
  });

  it('should call onClick() method when quiz is clicked', () => {
    jest.spyOn(component, 'onClick');
    const quizElement =
      fixture.nativeElement.querySelector('.quiz-item-button');
    quizElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.onClick).toHaveBeenCalled();
  });
});
