import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quiz } from '@webonjour/util-interface';
import { ActivatedRoute } from '@angular/router';
import {
  PatientService,
  QuizService,
} from '@webonjour/front-end/shared/common';
@Component({
  selector: 'webonjour-patient-edit-quiz-add-popup',
  templateUrl: './patient-edit-quiz-add-popup.component.html',
  styleUrls: ['./patient-edit-quiz-add-popup.component.scss'],
})
export class PatientEditQuizAddPopupComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'Nom du Quiz',
    'Nombre de questions',
    'stage',
    'action',
  ];
  dataSource = new MatTableDataSource<Quiz.Quiz>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private quizService: QuizService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: { patientId: string }
  ) {
    this.refresh();
  }

  refresh() {
    this.patientService
      .getPatientQuiz(this.data.patientId)
      .subscribe((patientQuizList) => {
        this.quizService.getAll().subscribe((quizList) => {
          const quizListFiltered = quizList.data.filter((quiz) => {
            return !patientQuizList.data.some((patientQuiz) => {
              return patientQuiz.id === quiz.id;
            });
          });
          this.dataSource = new MatTableDataSource<Quiz.Quiz>(quizListFiltered);
          this.dataSource.paginator = this.paginator;
        });
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAddQuiz(id: string) {
    this.patientService
      .addPatientQuiz(this.data.patientId, id)
      .subscribe(() => {
        this.refresh();
      });
  }
}
