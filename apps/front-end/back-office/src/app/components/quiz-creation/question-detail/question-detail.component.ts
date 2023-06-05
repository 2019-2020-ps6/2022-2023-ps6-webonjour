import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '@webonjour/front-end/shared/common';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'webonjour-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) {}

  onDelete() {
    this.route.params
      .pipe(
        map((params) => parseInt(params['questionId'])),
        mergeMap((id) => this.questionService.delete(id))
      )
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
}
