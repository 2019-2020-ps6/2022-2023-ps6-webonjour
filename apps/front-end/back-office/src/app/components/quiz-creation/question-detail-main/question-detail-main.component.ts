import { Component, Input } from '@angular/core';
import { Prisma } from '@prisma/client';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-question-detail-main',
  templateUrl: './question-detail-main.component.html',
  styleUrls: ['./question-detail-main.component.scss'],
})
export class QuestionDetailMainComponent {
  @Input() question!: Prisma.QuestionCreateInput;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.question.image = e.target.result;
        localStorage.setItem('selectedImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
}
