import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PatientService } from '@webonjour/front-end/shared/common';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '@webonjour/util-interface';
import { PatientCreateComponent } from '../patient-create/patient-create.component';
import { Prisma } from '@prisma/client';
import { DEFAULT_IMAGE_URL } from '../../../util/file-field/file-field.component';

interface PatientWithAggregatedQuestionResults {
  patient: Prisma.PatientGetPayload<Patient.PatientFull>;
  aggregate: Patient.AggregatedQuestionResult;
}

@Component({
  selector: 'webonjour-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements AfterViewInit {
  protected readonly DEFAULT_IMAGE_URL = DEFAULT_IMAGE_URL;
  displayedColumns: string[] = [
    'Nom du Patient',
    'Taux de réussite',
    'Date du dernier quiz',
    'Stade Alzheimer',
    'Étage',
  ];

  dataSource = new MatTableDataSource<PatientWithAggregatedQuestionResults>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private patientService: PatientService,
    public dialog: MatDialog
  ) {
    this.refresh();
  }

  refresh() {
    this.patientService.getPatients().subscribe((patientList) => {
      const data: PatientWithAggregatedQuestionResults[] = [];

      for (const patient of patientList.data) {
        this.patientService
          .getPatientAggregatedQuestionResults(patient.id)
          .subscribe((aggregate) => {
            data.push({ patient, aggregate: aggregate.data });
            data.sort((a, b) => a.patient.id - b.patient.id);
            this.dataSource =
              new MatTableDataSource<PatientWithAggregatedQuestionResults>(
                data
              );
            this.dataSource.paginator = this.paginator;
          });
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAddPatient() {
    this.dialog.open(PatientCreateComponent);

    this.dialog.afterAllClosed.subscribe(() => {
      this.refresh();
    });
  }
}
