import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  FamilyMemberService,
  PatientService,
} from '@webonjour/front-end/shared/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PatientFamilyAddPopupComponent } from '../patient-family-add-popup/patient-family-add-popup.component';
import { FamilyMember } from '@prisma/client';
import { DEFAULT_IMAGE_URL } from '@webonjour/front-end/shared/common';

@Component({
  selector: 'webonjour-patient-family',
  templateUrl: './patient-family.component.html',
  styleUrls: ['./patient-family.component.scss'],
})
export class PatientFamilyComponent implements AfterViewInit {
  protected readonly DEFAULT_IMAGE_URL = DEFAULT_IMAGE_URL;
  patientId!: number;
  displayedColumns: string[] = ['Nom', 'Contact', 'Relation', 'action'];
  dataSource = new MatTableDataSource<FamilyMember>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private patientService: PatientService,
    private familyMemberService: FamilyMemberService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe((params) => {
      this.patientId = parseInt(params['id']);
    });
    this.refresh();
  }

  refresh() {
    this.patientService
      .getPatientFamily(this.patientId)
      .subscribe((familyList) => {
        this.dataSource = new MatTableDataSource<FamilyMember>(familyList.data);
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

  onEditFamilyMember(family: FamilyMember) {
    this.dialog.open(PatientFamilyAddPopupComponent, {
      data: { patientId: this.patientId, familyId: family.id },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.refresh();
    });
  }

  onDeleteFamilyMember(family: FamilyMember) {
    this.familyMemberService
      .deleteFamilyMember(family.id)
      .subscribe(() => this.refresh());
  }
}
