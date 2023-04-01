import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PatientService } from '@webonjour/front-end/shared/common';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '@webonjour/util-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'webonjour-patient-family',
  templateUrl: './patient-family.component.html',
  styleUrls: ['./patient-family.component.scss'],
})
export class PatientFamilyComponent implements AfterViewInit {
  patientId!: string;

  displayedColumns: string[] = ['Nom', 'Contact', 'Relation'];
  dataSource = new MatTableDataSource<Patient.FamilyMember>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe((params) => {
      this.patientId = params['id'];
    });
    this.refresh();
  }

  refresh() {
    this.patientService
      .getPatientFamily(this.patientId)
      .subscribe((familyList) => {
        this.dataSource = new MatTableDataSource<Patient.FamilyMember>(
          familyList.data
        );
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
