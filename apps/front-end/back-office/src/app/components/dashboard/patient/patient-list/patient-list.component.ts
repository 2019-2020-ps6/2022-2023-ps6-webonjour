import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PatientService } from '@webonjour/front-end/shared/common';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '@webonjour/util-interface';
import { PatientEditGeneralComponent } from '../patient-edit/patient-edit-general/patient-edit-general.component';
import { PatientCreateComponent } from '../patient-create/patient-create.component';

@Component({
  selector: 'webonjour-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'Nom du Patient',
    'Taux de réussite',
    'Date du dernier quiz',
    'Stade Alzheimer',
  ];
  dataSource = new MatTableDataSource<Patient.Patient>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private patientService: PatientService,
    public dialog: MatDialog
  ) {
    this.refresh();
  }

  refresh() {
    this.patientService.getPatients().subscribe((patientList) => {
      this.dataSource = new MatTableDataSource<Patient.Patient>(
        patientList.data
      );
      this.dataSource.paginator = this.paginator;
      console.log(patientList.data);
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
