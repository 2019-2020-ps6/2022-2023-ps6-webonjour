import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FamilyMemberService,
  PatientService,
} from '@webonjour/front-end/shared/common';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Patient } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-patient-family-add-popup',
  templateUrl: './patient-family-add-popup.component.html',
  styleUrls: ['./patient-family-add-popup.component.scss'],
})
export class PatientFamilyAddPopupComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  familyMember?: Patient.FamilyMember;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private familyMemberService: FamilyMemberService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { familyId?: number; patientId: number }
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      description: [''],
      image: [null],
      phone: [''],
      email: [''],
      relation: ['', [Validators.required]],
    });
    if (this.data.familyId) {
      this.familyMemberService
        .getFamilyMember(this.data.familyId)
        .subscribe((familyMember) => {
          this.form.patchValue({
            first_name: familyMember.data.firstName,
            last_name: familyMember.data.lastName,
            age: familyMember.data.age,
            description: familyMember.data.description,
            image: familyMember.data.profilePictureUrl,
            relation: familyMember.data.relation,
            email: familyMember.data.email,
            phone: familyMember.data.phone,
          });
        });
    }
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    if (!this.data.familyId) {
      this.familyMemberService
        .createFamilyMember({
          ...this.form.value,
          patients: {
            connect: {
              id: this.data.patientId,
            },
          },
        })
        .subscribe((familyMember) => {
          this.form.patchValue({
            first_name: familyMember.data.firstName,
            last_name: familyMember.data.lastName,
            age: familyMember.data.age,
            description: familyMember.data.description,
            image: familyMember.data.profilePictureUrl,
            relation: familyMember.data.relation,
            phone: familyMember.data.phone,
            email: familyMember.data.email,
          });
          this.dialog.closeAll();
        });
    } else {
      this.patientService
        .updateFamilyPatient(this.data.familyId, {
          ...this.form.value,
        })
        .subscribe((familyMember) => {
          this.form.patchValue({
            first_name: familyMember.data.firstName,
            last_name: familyMember.data.lastName,
            age: familyMember.data.age,
            description: familyMember.data.description,
            image: familyMember.data.profilePictureUrl,
            relation: familyMember.data.relation,
            phone: familyMember.data.phone,
            email: familyMember.data.email,
          });
          this.dialog.closeAll();
        });
    }
  }

  get profilePictureUrl() {
    return this.form.get('image')?.value;
  }
}
