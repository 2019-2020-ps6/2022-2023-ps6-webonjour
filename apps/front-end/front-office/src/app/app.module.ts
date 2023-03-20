import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { GamePageComponent } from './components/quiz-view/game-page/game-page.component';
import { GameQuestionComponent } from './components/quiz-view/game-question/game-question.component';
import { GameAnswerComponent } from './components/quiz-view/game-answer/game-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    GamePageComponent,
    GameQuestionComponent,
    GameAnswerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
