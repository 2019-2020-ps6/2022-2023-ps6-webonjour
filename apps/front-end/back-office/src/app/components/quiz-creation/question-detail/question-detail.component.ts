import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent {
  question!: Quiz.Question;

  constructor(route: ActivatedRoute) {
    // TODO: get question from route params
    route.params.subscribe((params) => {
      this.question = {
        title: '',
        answers: [],
        clues: [],
      };
    });
  }
}
