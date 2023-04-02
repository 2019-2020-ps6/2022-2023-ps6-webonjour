import { Route } from '@angular/router';
import { QuizListItemComponent } from './components/quiz/quiz-list-item/quiz-list-item.component';
import { HelpPageComponent } from './components/quiz-view/help-page/help-page.component';
import { CardContainerComponent } from './components/homepage/card-container/card-container.component';
import { QuizResultsComponent } from './components/quiz-view/quiz-results/quiz-results.component';
import { GameQuestionComponent } from './components/quiz-view/game-question/game-question.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: CardContainerComponent,
  },
  {
    path: 'list-quiz/:diseaseStage',
    component: QuizListItemComponent,
  },
  {
    path: 'quiz-answer/:diseaseStage',
    component: GameQuestionComponent,
  },
  {
    path: 'result',
    component: QuizResultsComponent,
  },
  {
    path: 'help-page/:diseaseStage',
    component: HelpPageComponent,
  },
];
