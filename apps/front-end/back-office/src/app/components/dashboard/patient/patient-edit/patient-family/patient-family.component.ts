import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PatientService } from '@webonjour/front-end/shared/common';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '@webonjour/util-interface';
import { ActivatedRoute } from '@angular/router';
import { PatientFamilyAddPopupComponent } from '../patient-family-add-popup/patient-family-add-popup.component';

@Component({
  selector: 'webonjour-patient-family',
  templateUrl: './patient-family.component.html',
  styleUrls: ['./patient-family.component.scss'],
})
export class PatientFamilyComponent implements AfterViewInit {
  patientId!: string;

  displayedColumns: string[] = ['Nom', 'Contact', 'Relation', 'action'];
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

  onAddFamilyMember() {
    this.dialog.open(PatientFamilyAddPopupComponent, {
      data: { patientId: this.patientId },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.refresh();
    });
  }

  onEditFamilyMember(family: Patient.FamilyMember) {
    this.dialog.open(PatientFamilyAddPopupComponent, {
      data: { patientId: this.patientId, familyId: family.id },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.refresh();
    });
  }

  onDeleteFamilyMember(family: Patient.FamilyMember) {
    this.patientService
      .deletePatientFamily(this.patientId, family.id)
      .subscribe(() => {
        this.refresh();
      });
  }
}
