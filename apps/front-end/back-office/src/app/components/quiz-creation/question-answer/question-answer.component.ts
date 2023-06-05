import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { QuestionService } from '@webonjour/front-end/shared/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Answer } from '@prisma/client';
import { QuestionAnswerAddPopupComponent } from '../question-answer-add-popup/question-answer-add-popup.component';

@Component({
  selector: 'webonjour-question-answer',
  templateUrl: './question-answer.component.html',
})
export class QuestionAnswerComponent implements AfterViewInit {
  questionId!: number;

  displayedColumns: string[] = ['text', 'image', 'isCorrect', 'action'];
  dataSource = new MatTableDataSource<Answer>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe((params) => {
      this.questionId = parseInt(params['questionId']);
      this.refresh();
    });
  }

  refresh() {
    this.questionService.getById(this.questionId).subscribe((question) => {
      question.data.answers.sort((a, b) => a.id - b.id);
      this.dataSource = new MatTableDataSource<Answer>(question.data.answers);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAddAnswer() {
    this.dialog.open(QuestionAnswerAddPopupComponent, {
      data: { questionId: this.questionId },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.refresh();
    });
  }

  onEditAnswer(answer: Answer) {
    this.dialog.open(QuestionAnswerAddPopupComponent, {
      data: { answerId: answer.id, questionId: this.questionId },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.refresh();
    });
  }

  onDeleteAnswer(answer: Answer) {
    this.questionService.deleteAnswer(answer.id).subscribe(() => {
      this.refresh();
    });
  }
}
