import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DiseaseStage, Prisma, Question } from '@prisma/client';
import { Quiz } from '@webonjour/util-interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { QuizService } from '@webonjour/front-end/shared/common';
import { MatDialog } from '@angular/material/dialog';
import { PatientCreateComponent } from '../../dashboard/patient/patient-create/patient-create.component';
import { ActivatedRoute } from '@angular/router';
import { QuizCreateComponent } from '../quiz-create/quiz-create.component';
import { QuestionCreateComponent } from '../question-create/question-create.component';

@Component({
  selector: 'webonjour-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements AfterViewInit {
  quiz!: Prisma.QuizGetPayload<Quiz.QuizWithQuestions>;

  displayedColumns: string[] = ['Titre', 'Type'];
  dataSource = new MatTableDataSource<Question>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private quizService: QuizService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.quiz = {
      id: 0,
      title: '',
      imageUrl: '',
      isPrivate: false,
      questions: [],
      stage: DiseaseStage.STAGE_6,
    };
    this.route.params.subscribe((params) => {
      this.quizService.getById(params['id']).subscribe((quiz) => {
        this.quiz = quiz.data;
        this.refresh();
      });
    });
  }

  refresh() {
    this.quizService.getById(this.quiz.id).subscribe((questionList) => {
      this.dataSource = new MatTableDataSource<Question>(
        questionList.data.questions
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAddQuestion() {
    this.dialog.open(QuestionCreateComponent, {
      data: {
        quizId: this.quiz.id,
      },
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.refresh();
    });
  }
}
