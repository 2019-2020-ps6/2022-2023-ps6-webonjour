import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PatientService } from '@webonjour/front-end/shared/common';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '@webonjour/util-interface';
import { PatientCreateComponent } from '../patient-create/patient-create.component';
import { Prisma } from '@prisma/client';
import { DEFAULT_IMAGE_URL } from '@webonjour/front-end/shared/common';

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

  dataSource = new MatTableDataSource<
    Prisma.PatientGetPayload<Patient.PatientFull>
  >([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private patientService: PatientService,
    public dialog: MatDialog
  ) {
    this.refresh();
  }

  refresh() {
    this.patientService.getPatients().subscribe((patientList) => {
      this.dataSource = new MatTableDataSource<
        Prisma.PatientGetPayload<Patient.PatientFull>
      >(patientList.data);
      this.dataSource.paginator = this.paginator;
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
