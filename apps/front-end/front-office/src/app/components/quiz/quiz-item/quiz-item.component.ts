import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss'],
})
export class QuizItemComponent {
  @Input() quiz!: Quiz.Quiz;

  get quizTitle(): string {
    return this.quiz.title;
  }

  get quizImageUrl(): string {
    return this.quiz.imageUrl;
  }

  selectQuiz(): void {
    console.log('selectQuiz', this.quiz);
  }

  constructor() {
    this.quiz = {
      id: '1',
      title: 'Les Chevaux Célèbres',
      imageUrl:
        'https://images.unsplash.com/photo-1589985851119-8e1f2e1b2e1c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hldmF4fGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80',
      stage: 1,
    };
  }
}
