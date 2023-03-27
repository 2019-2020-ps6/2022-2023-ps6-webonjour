import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { QuizListComponent } from '../quiz/quiz-list/quiz-list.component';
import { LoginComponent } from '../../auth/login/login.component';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'quiz',
        component: QuizListComponent,
        title: 'Les Quiz',
      },
      {
        path: 'patients',
        component: LoginComponent,
        title: 'Patients',
      },
    ],
  },
];
