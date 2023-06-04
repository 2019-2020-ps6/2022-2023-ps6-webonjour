import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GameQuestionComponent } from './components/quiz-view/game-question/game-question.component';
import { QuizItemComponent } from './components/quiz/quiz-item/quiz-item.component';
import { QuizListItemComponent } from './components/quiz/quiz-list-item/quiz-list-item.component';
import { HelpPageComponent } from './components/quiz-view/help-page/help-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CardContainerComponent } from './components/homepage/card-container/card-container.component';
import { CardComponent } from './components/homepage/card/card.component';
import { QuizResultsComponent } from './components/quiz-view/quiz-results/quiz-results.component';
import { MessageComponent } from './components/quiz-view/message/message.component';
import { HelpPopupComponent } from './components/quiz-view/help-popup/help-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromGame from './reducers/game/game.reducer';
import { GameEffects } from './reducers/game/game.effects';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { ChoiceComponent } from './components/learning/choice/choice.component';
import { OrderComponent } from './components/learning/order/order.component';
import { LearningComponent } from './components/learning/learning.component';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    GameQuestionComponent,
    QuizItemComponent,
    QuizListItemComponent,
    HelpPageComponent,
    HeaderComponent,
    CardContainerComponent,
    CardComponent,
    QuizResultsComponent,
    MessageComponent,
    HelpPopupComponent,
    DragAndDropComponent,
    ChoiceComponent,
    OrderComponent,
    LearningComponent,
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      useHash: true,
    }),
    HttpClientModule,
    CdkDrag,
    CdkDropList,
    StoreModule.forFeature(fromGame.GAME_FEATURE_KEY, fromGame.gameReducer),
    EffectsModule.forFeature([GameEffects]),
    StoreDevtoolsModule.instrument({
      trace: true,
    }),
    NgOptimizedImage,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
