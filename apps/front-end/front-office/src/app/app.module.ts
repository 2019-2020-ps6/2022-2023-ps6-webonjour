import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

import { GameQuestionComponent } from './components/quiz-view/game-question/game-question.component';
import { GameAnswerComponent } from './components/quiz-view/game-answer/game-answer.component';
import { QuizItemComponent } from './components/quiz/quiz-item/quiz-item.component';
import { QuizListItemComponent } from './components/quiz/quiz-list-item/quiz-list-item.component';
import { HelpPageComponent } from './components/quiz-view/help-page/help-page.component';
import { HelpPageHeaderComponent } from './components/quiz-view/help-page/help-page-header/help-page-header.component';
import { HelpPageHintComponent } from './components/quiz-view/help-page/help-page-hint/help-page-hint.component';
import { HelpPageReturnComponent } from './components/quiz-view/help-page/help-page-return/help-page-return.component';
import { HeaderComponent } from './components/header/header.component';
import { CardContainerComponent } from './components/homepage/card-container/card-container.component';
import { CardComponent } from './components/homepage/card/card.component';
import { QuizResultsComponent } from './components/quiz-view/quiz-results/quiz-results.component';
import { MessageComponent } from './components/quiz-view/message/message.component';
import { HelpPopupComponent } from './components/quiz-view/help-popup/help-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from '@webonjour/data-access-fake-backend';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    GameQuestionComponent,
    GameAnswerComponent,
    QuizItemComponent,
    QuizListItemComponent,
    HelpPageComponent,
    HelpPageHeaderComponent,
    HelpPageHintComponent,
    HelpPageReturnComponent,
    HeaderComponent,
    CardContainerComponent,
    CardComponent,
    QuizResultsComponent,
    MessageComponent,
    HelpPopupComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
