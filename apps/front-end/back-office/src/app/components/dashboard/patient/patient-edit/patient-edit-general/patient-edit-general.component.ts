import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '@webonjour/util-interface';
import { PatientService } from '@webonjour/front-end/shared/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'webonjour-patient-edit-general',
  templateUrl: './patient-edit-general.component.html',
  styleUrls: ['./patient-edit-general.component.scss'],
})
export class PatientEditGeneralComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  patient!: Patient.Patient;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      disease_stage: [
        '',
        [Validators.required, Validators.min(0), Validators.max(7)],
      ],
      description: [''],
      profilePictureUrl: [''],
    });
    this.activatedRoute.params.subscribe((params) => {
      this.patientService.getPatient(params['id']).subscribe((patient) => {
        this.patient = patient.data;
        console.log(this.patient);
        this.form.patchValue({
          first_name: this.patient.firstName,
          last_name: this.patient.lastName,
          age: this.patient.age,
          disease_stage: this.patient.diseaseStage,
          description: this.patient.description,
          profilePictureUrl: this.patient.profilePictureUrl,
        });
      });
    });
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    this.patient = {
      id: this.patient?.id || '',
      firstName: this.form.controls['first_name'].value,
      lastName: this.form.controls['last_name'].value,
      age: this.form.controls['age'].value,
      diseaseStage: this.form.controls['disease_stage'].value,
      description: this.form.controls['description'].value,
      profilePictureUrl: this.form.controls['profilePictureUrl'].value,
      lastQuizDate: this.patient?.lastQuizDate || new Date(),
      successRate: this.patient?.successRate || 0,
    };

    if (this.patient.id === '') {
      this.patientService.createPatient(this.patient).subscribe((patient) => {
        this.patient = patient.data;
        console.log(this.patient);
        this.form.patchValue({
          first_name: this.patient.firstName,
          last_name: this.patient.lastName,
          age: this.patient.age,
          disease_stage: this.patient.diseaseStage,
          description: this.patient.description,
          profilePictureUrl: this.patient.profilePictureUrl,
        });
        this.dialog.closeAll();
      });
    } else {
      this.patientService.updatePatient(this.patient).subscribe((patient) => {
        this.patient = patient.data;
        console.log(this.patient);
        this.form.patchValue({
          first_name: this.patient.firstName,
          last_name: this.patient.lastName,
          age: this.patient.age,
          disease_stage: this.patient.diseaseStage,
          description: this.patient.description,
          profilePictureUrl: this.patient.profilePictureUrl,
        });
        this.dialog.closeAll();
      });
    }
  }

  get profilePictureUrl() {
    return this.form.get('profilePictureUrl')?.value;
  }
}
