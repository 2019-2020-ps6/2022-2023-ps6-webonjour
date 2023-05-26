import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { QuizListComponent } from '../quiz/quiz-list/quiz-list.component';
import { QuizEditionComponent } from '../../quiz-edition/quiz-edition.component';
import { PatientListComponent } from '../patient/patient-list/patient-list.component';
import { PatientEditComponent } from '../patient/patient-edit/patient-edit/patient-edit.component';
import { QuestionDetailComponent } from '../../quiz-creation/question-detail/question-detail.component';
import { QuestionListComponent } from '../../quiz-creation/question-list/question-list.component';
import { QuestionEditGeneralComponent } from '../../quiz-creation/question-edit-general/question-edit-general.component';
import { QuestionAnswerComponent } from '../../quiz-creation/question-answer/question-answer.component';
import { QuestionClueComponent } from '../../quiz-creation/question-clue/question-clue.component';

export const dashboardRoutes: Route[] = [
  {
    path: 'dashboard',
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
        component: QuestionListComponent,
        title: 'Édition de quiz',
        data: { navPath: 'quiz' },
      },
      {
        path: 'quiz/:quizId/:questionId',
        component: QuestionDetailComponent,
        title: 'Édition de question',
        data: { navPath: 'quiz' },
      },
      {
        path: 'patients',
        component: PatientListComponent,
        title: 'Patients',
        data: { navPath: 'patients' },
      },
      {
        path: 'patients/:id',
        component: PatientEditComponent,
        title: 'Patients',
        data: { navPath: 'patients' },
      },
      {
        path: '',
        redirectTo: 'quiz',
        pathMatch: 'full',
      },
    ],
  },
];
