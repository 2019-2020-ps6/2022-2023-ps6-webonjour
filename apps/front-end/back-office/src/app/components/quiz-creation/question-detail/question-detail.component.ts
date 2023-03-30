import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '@webonjour/util-interface';
import { QuizService } from '../../../services/dashboard/quiz/quiz.service';

@Component({
  selector: 'webonjour-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent {
  question!: Quiz.Question;

  constructor(route: ActivatedRoute, quizService: QuizService) {
    route.params.subscribe((params) => {
      quizService.getById(params['id']).subscribe((quiz) => {
        this.question = quiz.data.questions[params['questionId']];
      });
    });
  }
}
