import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Quiz } from '@webonjour/util-interface';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PatientService,
  QuizService,
} from '@webonjour/front-end/shared/common';
import { PatientEditQuizAddPopupComponent } from '../patient-edit-quiz-add-popup/patient-edit-quiz-add-popup.component';
import { QuizCreateComponent } from '../../../../quiz-creation/quiz-create/quiz-create.component';
import { Prisma } from '@prisma/client';

type Quiz = Prisma.QuizGetPayload<Quiz.QuizWithQuestions>;

@Component({
  selector: 'webonjour-patient-edit-quiz',
  templateUrl: './patient-edit-quiz.component.html',
  styleUrls: ['./patient-edit-quiz.component.scss'],
})
export class PatientEditQuizComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'Nom du Quiz',
    'Nombre de questions',
    'stage',
    'isPrivate',
    'actions',
  ];
  dataSource = new MatTableDataSource<Quiz>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private quizService: QuizService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) {
    this.refresh();
  }

  refresh() {
    // get patient id from url
    this.route.params.subscribe((params) => {
      const patientId = params['id'];

      // get patient quiz list
      this.patientService
        .getPatientQuiz(patientId)
        .subscribe((patientQuizList) => {
          this.dataSource = new MatTableDataSource<Quiz>(patientQuizList.data);
          this.dataSource.paginator = this.paginator;
        });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAddQuiz() {
    this.dialog
      .open(PatientEditQuizAddPopupComponent, {
        data: {
          patientId: this.route.snapshot.params['id'],
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.refresh();
      });
  }

  onDeleteQuiz(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.route.params.subscribe((params) => {
      const patientId = params['id'];
      this.quizService.getById(id).subscribe((quiz) => {
        if (quiz.data.isPrivate) {
          this.quizService.delete(id).subscribe(() => {
            this.refresh();
          });
        }
        this.patientService.deletePatientQuiz(patientId, id).subscribe(() => {
          this.refresh();
        });
      });
    });
  }

  onAddPersonalQuiz() {
    this.dialog
      .open(QuizCreateComponent, {
        data: {
          patientId: this.route.snapshot.params['id'],
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.refresh();
      });
  }

  onQuizClicked(row: Quiz, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/dashboard/quiz', row.id]);
  }
}
