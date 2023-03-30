import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PatientService } from '@webonjour/front-end/shared/common';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '@webonjour/util-interface';

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
}
