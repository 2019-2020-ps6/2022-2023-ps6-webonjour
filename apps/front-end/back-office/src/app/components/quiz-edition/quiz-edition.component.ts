import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-quiz-edition',
  templateUrl: './quiz-edition.component.html',
  styleUrls: ['./quiz-edition.component.scss'],
})
export class QuizEditionComponent {
  quiz!: Quiz.Quiz;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.quiz = {
        id: params['id'],
        title: 'Test',
        questions: [],
        imageUrl: 'https://picsum.photos/200/300',
        stage: Quiz.DiseaseStage.STAGE_1,
      };
    });
  }

  onAddQuestion() {
    this.quiz.questions.push({
      title: 'Test',
      answers: [],
    });
  }
}
