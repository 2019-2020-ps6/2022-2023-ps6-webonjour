import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { Router } from '@angular/router';
import { GameService } from '@webonjour/front-end/shared/common';

@Component({
  selector: 'webonjour-game-answer',
  templateUrl: './game-answer.component.html',
  styleUrls: ['./game-answer.component.scss'],
})
export class GameAnswerComponent {
  @Input() diseaseStage: Quiz.DiseaseStage = Quiz.DiseaseStage.STAGE_3;
  @Input() answer: Quiz.Answer = { text: '', isCorrect: false };
  @Input() img_enabled = false;
  @Output() displayImageEvent = new EventEmitter<boolean>();
  @Output() show_modal_help = new EventEmitter<boolean>();
  hover = false;
  clicked = false;
  disabled = false;

  constructor(private router: Router, private gameService: GameService) {}

  onClick() {
    if (this.disabled) {
      return;
    }

    this.clicked = true;

    if (this.answer.isCorrect) {
      this.gameService.incrementScore();
      if (this.gameService.isLastQuestion()) {
        this.router.navigate(['/result']);
        return;
      } else {
        this.gameService.nextQuestion();
        return;
      }
    } else {
      this.handleAnswerError();
    }
  }

  onHover(hover: boolean) {
    if (this.disabled) {
      return;
    }

    this.hover = hover;
  }

  handleAnswerError() {
    if (this.diseaseStage >= Quiz.DiseaseStage.STAGE_3) {
      this.disabled = true;
    }

    if (this.diseaseStage >= Quiz.DiseaseStage.STAGE_4) {
      this.show_modal_help.emit(true);
    }

    if (this.diseaseStage >= Quiz.DiseaseStage.STAGE_5) {
      this.displayImageEvent.emit(true);
    }
  }

  setImageEnabled(enabled: boolean) {
    this.img_enabled = enabled;
  }
}
