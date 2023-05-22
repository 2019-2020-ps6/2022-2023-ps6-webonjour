import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { Clue } from '@prisma/client';

@Component({
  selector: 'webonjour-question-detail-clue',
  templateUrl: './question-detail-clue.component.html',
  styleUrls: ['./question-detail-clue.component.scss'],
})
export class QuestionDetailClueComponent {
  @Input() clue!: Clue;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.clue.image = e.target.result;
        localStorage.setItem(
          'selectedImage' + this.clue.image,
          e.target.result
        );
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImage() {
    this.clue.image = '';
  }
}
