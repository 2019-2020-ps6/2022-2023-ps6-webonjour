import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-question-detail-answer',
  templateUrl: './question-detail-answer.component.html',
  styleUrls: ['./question-detail-answer.component.scss'],
})
export class QuestionDetailAnswerComponent {
  @Input() answer!: Quiz.Answer;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.answer.image = e.target.result;
        localStorage.setItem(
          'selectedImage' + this.answer.image,
          e.target.result
        );
      };
      reader.readAsDataURL(file);
    }
  }
}
