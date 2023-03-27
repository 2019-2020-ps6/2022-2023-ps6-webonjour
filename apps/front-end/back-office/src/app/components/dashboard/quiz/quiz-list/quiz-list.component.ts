import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { QuizService } from '../../../../services/dashboard/quiz/quiz.service';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements AfterViewInit {
  displayedColumns: string[] = ['Nom du Quiz', 'Nombre de questions', 'stage'];
  dataSource = new MatTableDataSource<Quiz.Quiz>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private quizService: QuizService) {
    this.refresh();
  }

  refresh() {
    this.quizService.getAll().subscribe((quizList) => {
      this.dataSource = new MatTableDataSource<Quiz.Quiz>(quizList.data);
      console.log(quizList.data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  goToQuiz(quiz: Quiz.Quiz) {
    console.log(quiz);
  }
}
