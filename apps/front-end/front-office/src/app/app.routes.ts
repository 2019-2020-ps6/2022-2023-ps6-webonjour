import { Route } from '@angular/router';
import { QuizListItemComponent } from './components/quiz/quiz-list-item/quiz-list-item.component';
import { HelpPageComponent } from './components/quiz-view/help-page/help-page.component';
import { CardContainerComponent } from './components/homepage/card-container/card-container.component';
import { QuizResultsComponent } from './components/quiz-view/quiz-results/quiz-results.component';
import { GameQuestionComponent } from './components/quiz-view/game-question/game-question.component';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: CardContainerComponent,
  },
  {
    path: 'list-quiz',
    component: QuizListItemComponent,
  },
  {
    path: 'quiz-answer',
    component: GameQuestionComponent,
  },
  {
    path: 'result',
    component: QuizResultsComponent,
  },
  {
    path: 'help-page',
    component: HelpPageComponent,
  },
  {
    path: 'drag-and-drop',
    component: DragAndDropComponent,
  },
];
