import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '@webonjour/util-interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  QuestionService,
  QuizService,
} from '@webonjour/front-end/shared/common';
import { Prisma, PrismaClient, QuestionType } from '@prisma/client';
import { map, mergeMap } from 'rxjs';

type Question = Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>;

@Component({
  selector: 'webonjour-quiz-edition',
  templateUrl: './quiz-edition.component.html',
  styleUrls: ['./quiz-edition.component.scss'],
})
export class QuizEditionComponent {
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onDelete() {
    this.route.params
      .pipe(
        map((params) => parseInt(params['id'])),
        mergeMap((id) => this.quizService.delete(id))
      )
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
}
