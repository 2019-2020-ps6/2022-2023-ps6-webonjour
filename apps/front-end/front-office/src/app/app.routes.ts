import { Route } from '@angular/router';
import {QuizListItemComponent} from "./components/quiz/quiz-list-item/quiz-list-item.component";
import {GamePageComponent} from "./components/quiz-view/game-page/game-page.component";

export const appRoutes: Route[] = [
  {
    path: 'list-quiz',
    component: QuizListItemComponent,
  },
  {
    path: 'quiz-answer',
    component: GamePageComponent
  },
];
