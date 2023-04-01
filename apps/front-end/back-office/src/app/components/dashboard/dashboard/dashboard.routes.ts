import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { QuizListComponent } from '../quiz/quiz-list/quiz-list.component';
import { QuizEditionComponent } from '../../quiz-edition/quiz-edition.component';
import { PatientListComponent } from '../patient/patient-list/patient-list.component';
import { PatientEditGeneralComponent } from '../patient/patient-edit/patient-edit-general/patient-edit-general.component';
import { PatientEditComponent } from '../patient/patient-edit/patient-edit/patient-edit.component';

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
    ],
  },
];
