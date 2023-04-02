import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { QuizService } from '../../../../../services/dashboard/quiz/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { Quiz } from '@webonjour/util-interface';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '@webonjour/front-end/shared/common';
import { PatientEditQuizAddPopupComponent } from '../patient-edit-quiz-add-popup/patient-edit-quiz-add-popup.component';

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
    'actions',
  ];
  dataSource = new MatTableDataSource<Quiz.Quiz>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private quizService: QuizService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private patientService: PatientService
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
          this.dataSource = new MatTableDataSource<Quiz.Quiz>(
            patientQuizList.data
          );
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

  onDeleteQuiz(id: string) {
    this.route.params.subscribe((params) => {
      const patientId = params['id'];

      this.patientService.deletePatientQuiz(patientId, id).subscribe(() => {
        this.refresh();
      });
    });
  }
}
