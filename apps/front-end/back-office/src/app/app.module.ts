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
import { QuestionDetailComponent } from './components/quiz-creation/question-detail/question-detail.component';
import { QuestionDetailMainComponent } from './components/quiz-creation/question-detail-main/question-detail-main.component';
import { QuestionDetailAnswersComponent } from './components/quiz-creation/question-detail-answers/question-detail-answers.component';
import { QuestionDetailCluesComponent } from './components/quiz-creation/question-detail-clues/question-detail-clues.component';
import { QuestionDetailClueComponent } from './components/quiz-creation/question-detail-clue/question-detail-clue.component';
import { QuestionDetailAnswerComponent } from './components/quiz-creation/question-detail-answer/question-detail-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    LoginComponent,
    LoginFormComponent,
    AlertComponent,
    QuizCreateComponent,
    QuestionDetailComponent,
    QuestionDetailMainComponent,
    QuestionDetailAnswersComponent,
    QuestionDetailCluesComponent,
    QuestionDetailClueComponent,
    QuestionDetailAnswerComponent,
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
  ],
  providers: [
    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
