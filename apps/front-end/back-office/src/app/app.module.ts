import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { fakeBackendProvider } from '@webonjour/data-access-fake-backend';
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
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
  ],
  providers: [
    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
