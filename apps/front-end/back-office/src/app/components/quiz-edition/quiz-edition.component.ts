import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '@webonjour/util-interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { QuizService } from '@webonjour/front-end/shared/common';
import { Prisma, PrismaClient, QuestionType } from '@prisma/client';

type Question = Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>;

@Component({
  selector: 'webonjour-quiz-edition',
  templateUrl: './quiz-edition.component.html',
  styleUrls: ['./quiz-edition.component.scss'],
})
export class QuizEditionComponent implements OnInit, AfterViewInit {
  quiz!: Prisma.QuizGetPayload<Quiz.QuizWithQuestions>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['Intitulé', 'edit'];

  dataSource = new MatTableDataSource<Question>([]);

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizService.getById(params['id']).subscribe((quiz) => {
        this.quiz = quiz.data;
        this.dataSource.data = this.quiz.questions;
      });
    });
  }

  onAddQuestion() {
    const newQuestion: Prisma.QuestionCreateInput = {
      title: 'Nouvelle question',
      type: QuestionType.CHOICE,
      image: null,
      quiz: {
        connect: {
          id: this.quiz.id,
        },
      },
    };

    this.quizService
      .addQuestion(this.quiz.id, newQuestion)
      .subscribe((quiz) => {
        this.quiz = quiz.data;
        this.dataSource = new MatTableDataSource<Question>(this.quiz.questions);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
