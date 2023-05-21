import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Quiz } from '@webonjour/util-interface';
import { QuizCreateComponent } from '../../../quiz-creation/quiz-create/quiz-create.component';
import { QuizService } from '@webonjour/front-end/shared/common';
import { Prisma } from '@prisma/client';

type Quiz = Prisma.QuizGetPayload<Quiz.QuizWithQuestions>;

@Component({
  selector: 'webonjour-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'Nom du Quiz',
    'Nombre de questions',
    'stage',
    'isPrivate',
  ];
  dataSource = new MatTableDataSource<Quiz>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private quizService: QuizService, public dialog: MatDialog) {
    this.refresh();
  }

  refresh() {
    this.quizService.getAll().subscribe((quizList) => {
      this.dataSource = new MatTableDataSource<Quiz>(quizList.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAddQuiz() {
    this.dialog.open(QuizCreateComponent, {});
    this.dialog.afterAllClosed.subscribe(() => {
      this.refresh();
    });
  }

  onDeleteQuiz(id: number) {
    this.quizService.delete(id).subscribe(() => {
      this.refresh();
    });
  }
}
