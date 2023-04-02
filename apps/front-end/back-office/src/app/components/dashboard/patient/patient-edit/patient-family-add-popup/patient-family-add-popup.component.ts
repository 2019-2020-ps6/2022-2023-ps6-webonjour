import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '@webonjour/front-end/shared/common';
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
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { familyId: string; patientId: string }
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      description: [''],
      profilePictureUrl: [''],
      phone: [''],
      email: [''],
      relation: ['', [Validators.required]],
    });
    this.patientService
      .getPatientFamily(this.data.patientId)
      .subscribe((familyMembers) => {
        this.familyMember = familyMembers.data.find(
          (familyMember) => familyMember.id === this.data.familyId
        );
        if (this.familyMember) {
          this.form.patchValue({
            first_name: this.familyMember.firstName,
            last_name: this.familyMember.lastName,
            age: this.familyMember.age,
            description: this.familyMember.description,
            profilePictureUrl: this.familyMember.profilePictureUrl,
            relation: this.familyMember.relation,
            email: this.familyMember.email,
            phone: this.familyMember.phone,
          });
        }
      });
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    this.familyMember = {
      id: this.familyMember?.id || '',
      firstName: this.form.controls['first_name'].value,
      lastName: this.form.controls['last_name'].value,
      age: this.form.controls['age'].value,
      description: this.form.controls['description'].value,
      profilePictureUrl: this.form.controls['profilePictureUrl'].value,
      relation: this.form.controls['relation'].value,
      phone: this.form.controls['phone'].value,
      email: this.form.controls['email'].value,
    };

    if (this.familyMember.id === '') {
      this.patientService
        .addPatientFamily(this.data.patientId, this.familyMember)
        .subscribe((familyMember) => {
          this.familyMember = familyMember.data;
          this.form.patchValue({
            first_name: this.familyMember.firstName,
            last_name: this.familyMember.lastName,
            age: this.familyMember.age,
            description: this.familyMember.description,
            profilePictureUrl: this.familyMember.profilePictureUrl,
            phone: this.familyMember.phone,
            email: this.familyMember.email,
          });
          this.dialog.closeAll();
        });
    } else {
      this.patientService
        .updateFamilyPatient(this.data.patientId, this.familyMember)
        .subscribe((familyMember) => {
          this.form.patchValue({
            first_name: familyMember.data.firstName,
            last_name: familyMember.data.lastName,
            age: familyMember.data.age,
            description: familyMember.data.description,
            profilePictureUrl: familyMember.data.profilePictureUrl,
            relation: familyMember.data.relation,
            phone: familyMember.data.phone,
            email: familyMember.data.email,
          });
          this.dialog.closeAll();
        });
    }
  }

  get profilePictureUrl() {
    return this.form.get('profilePictureUrl')?.value;
  }
}
