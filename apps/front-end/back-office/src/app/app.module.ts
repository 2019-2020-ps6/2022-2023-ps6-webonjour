import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/util/alert/alert.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { QuizCreateComponent } from './components/quiz-creation/quiz-create/quiz-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PatientListComponent } from './components/dashboard/patient/patient-list/patient-list.component';
import { PatientEditGeneralComponent } from './components/dashboard/patient/patient-edit/patient-edit-general/patient-edit-general.component';
import { NgOptimizedImage } from '@angular/common';
import { PatientCreateComponent } from './components/dashboard/patient/patient-create/patient-create.component';
import { PatientEditComponent } from './components/dashboard/patient/patient-edit/patient-edit/patient-edit.component';
import { DashboardModule } from './components/dashboard/dashboard/dashboard.module';
import { PatientEditQuizComponent } from './components/dashboard/patient/patient-edit/patient-edit-quiz/patient-edit-quiz.component';
import { PatientEditQuizAddPopupComponent } from './components/dashboard/patient/patient-edit/patient-edit-quiz-add-popup/patient-edit-quiz-add-popup.component';
import { PatientEditAccommodationComponent } from './components/dashboard/patient/patient-edit/patient-edit-accommodation/patient-edit-accommodation.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PatientEditStatsComponent } from './components/dashboard/patient/patient-edit/patient-edit-stats/patient-edit-stats.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { QuestionDetailComponent } from './components/quiz-creation/question-detail/question-detail.component';

import { PatientFamilyAddPopupComponent } from './components/dashboard/patient/patient-edit/patient-family-add-popup/patient-family-add-popup.component';
import { FileFieldComponent } from './components/util/file-field/file-field.component';
import { DangerZoneComponent } from './components/danger-zone/danger-zone.component';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { QuestionListComponent } from './components/quiz-creation/question-list/question-list.component';
import { QuestionEditGeneralComponent } from './components/quiz-creation/question-edit-general/question-edit-general.component';
import { QuestionCreateComponent } from './components/quiz-creation/question-create/question-create.component';
import { QuestionAnswerComponent } from './components/quiz-creation/question-answer/question-answer.component';
import { QuestionAnswerAddPopupComponent } from './components/quiz-creation/question-answer-add-popup/question-answer-add-popup.component';
import { QuestionClueComponent } from './components/quiz-creation/question-clue/question-clue.component';
import { QuestionClueAddPopupComponent } from './components/quiz-creation/question-clue-add-popup/question-clue-add-popup.component';
import { QuizEditionComponent } from './components/quiz-edition/quiz-edition.component';
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    LoginComponent,
    LoginFormComponent,
    AlertComponent,
    QuizCreateComponent,
    PatientListComponent,
    PatientEditGeneralComponent,
    PatientCreateComponent,
    PatientEditComponent,
    PatientEditQuizComponent,
    PatientEditQuizAddPopupComponent,
    PatientEditAccommodationComponent,
    PatientEditStatsComponent,
    QuestionDetailComponent,
    PatientFamilyAddPopupComponent,
    FileFieldComponent,
    DangerZoneComponent,
    PatientEditQuizAddPopupComponent,
    QuestionListComponent,
    QuestionEditGeneralComponent,
    QuestionCreateComponent,
    QuizEditionComponent,
    QuestionAnswerComponent,
    QuestionAnswerAddPopupComponent,
    QuestionClueComponent,
    QuestionClueAddPopupComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      useHash: true,
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    CdkAccordionModule,
    MatDialogModule,
    NgOptimizedImage,
    DashboardModule,
    MatCheckboxModule,
    NgApexchartsModule,
    NgxBootstrapIconsModule.pick(allIcons),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
