import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Answer, Clue } from '@prisma/client';
import { MatPaginator } from '@angular/material/paginator';
import { QuestionService } from '@webonjour/front-end/shared/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuestionAnswerAddPopupComponent } from '../question-answer-add-popup/question-answer-add-popup.component';
import { QuestionClueAddPopupComponent } from '../question-clue-add-popup/question-clue-add-popup.component';

@Component({
  selector: 'webonjour-question-clue',
  templateUrl: './question-clue.component.html',
  styleUrls: ['./question-clue.component.scss'],
})
export class QuestionClueComponent implements AfterViewInit {
  questionId!: number;

  displayedColumns: string[] = ['text', 'image', 'action'];
  dataSource = new MatTableDataSource<Clue>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe((params) => {
      this.questionId = params['questionId'];
    });
    this.refresh();
  }

  refresh() {
    this.questionService.getById(this.questionId).subscribe((question) => {
      this.dataSource = new MatTableDataSource<Clue>(question.data.clues);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAddClue() {
    this.dialog.open(QuestionClueAddPopupComponent, {
      data: { questionId: this.questionId },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.refresh();
    });
  }

  onEditClue(clue: Clue) {
    this.dialog.open(QuestionClueAddPopupComponent, {
      data: { clueId: clue.id, questionId: this.questionId },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.refresh();
    });
  }

  onDeleteClue(clue: Clue) {
    this.questionService.deleteClue(clue.id).subscribe(() => {
      this.refresh();
    });
  }
}
