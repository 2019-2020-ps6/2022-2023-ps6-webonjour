import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { QuizService } from '../../../../services/dashboard/quiz/quiz.service';
import { Quiz } from '@webonjour/util-interface';
import { QuizCreateComponent } from '../../../quiz-creation/quiz-create/quiz-create.component';
import { mergeMap } from 'rxjs';

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
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<Quiz.Quiz>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private quizService: QuizService, public dialog: MatDialog) {
    this.refresh();
  }

  refresh() {
    this.quizService.getAll().subscribe((quizList) => {
      this.dataSource = new MatTableDataSource<Quiz.Quiz>(quizList.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAddQuiz() {
    const dialogRef = this.dialog.open(QuizCreateComponent, {
      disableClose: true,
    });
    dialogRef.componentInstance.id = (
      this.dataSource.data.length + 1
    ).toString();

    dialogRef
      .afterClosed()
      .pipe(mergeMap((quiz) => this.quizService.create(quiz)))
      .subscribe(() => this.refresh());
  }

  onDeleteQuiz(id: string) {
    this.quizService.delete(id).subscribe(() => {
      this.refresh();
    });
  }
}
