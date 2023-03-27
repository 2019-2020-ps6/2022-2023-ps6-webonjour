import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { QuizListComponent } from '../quiz/quiz-list/quiz-list.component';
import { LoginComponent } from '../../auth/login/login.component';
import { QuizEditionComponent } from '../../quiz-edition/quiz-edition.component';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'quiz',
        component: QuizListComponent,
        title: 'Les Quiz',
        data: { navPath: 'quiz' },
      },
      {
        path: 'quiz/:id',
        component: QuizEditionComponent,
        title: 'Edition Quiz',
        data: { navPath: 'quiz' },
      },
      {
        path: 'patients',
        component: LoginComponent,
        title: 'Patients',
        data: { navPath: 'patients' },
      },
    ],
  },
];
