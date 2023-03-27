import { Route } from '@angular/router';
import { QuizListItemComponent } from './components/quiz/quiz-list-item/quiz-list-item.component';
import { GamePageComponent } from './components/quiz-view/game-page/game-page.component';
import { CardContainerComponent } from './components/homepage/card-container/card-container.component';

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
    component: GamePageComponent,
  },
];
