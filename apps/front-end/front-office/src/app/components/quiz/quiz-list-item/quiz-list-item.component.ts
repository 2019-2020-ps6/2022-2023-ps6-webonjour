import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-quiz-list-item',
  templateUrl: './quiz-list-item.component.html',
  styleUrls: ['./quiz-list-item.component.scss'],
})
export class QuizListItemComponent {
  listQuizzes: Quiz.Quiz[];

  constructor() {
    this.listQuizzes = [
      {
        id: '1',
        title: 'Les Chevaux Célèbres',
        imageUrl:
          'https://images.unsplash.com/photo-1589985851119-8e1f2e1b2e1c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hldmF4fGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80',
        stage: 1,
        questions: [],
      },
      {
        id: '2',
        title: 'Les Chevaux pas Célèbres',
        imageUrl:
          'https://images.unsplash.com/photo-1589985851119-8e1f2e1b2e1c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hldmF4fGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80',
        stage: 2,
        questions: [],
      },
      {
        id: '3',
        title: 'Les Grands peintres',
        imageUrl:
          'https://images.unsplash.com/photo-1589985851119-8e1f2e1b2e1c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hldmF4fGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80',
        stage: 3,
        questions: [],
      },
    ];
  }
}
