import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  fileToBase64,
  PatientService,
} from '@webonjour/front-end/shared/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DiseaseStage } from '@prisma/client';
import { DEFAULT_IMAGE_URL } from '@webonjour/front-end/shared/common';

@Component({
  selector: 'webonjour-patient-edit-general',
  templateUrl: './patient-edit-general.component.html',
})
export class PatientEditGeneralComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  patientId?: number;
  diseaseStages = Object.values(DiseaseStage);

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
        this.diseaseStages[0],
        [Validators.required, Validators.min(0), Validators.max(7)],
      ],
      description: [''],
      image: [null],
      floor: [0, [Validators.required, Validators.min(0)]],
    });
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.patientId = params['id'];
        this.patientService.getPatient(params['id']).subscribe((patient) => {
          this.form.patchValue({
            first_name: patient.data.firstName,
            last_name: patient.data.lastName,
            age: patient.data.age,
            disease_stage: patient.data.diseaseStage,
            description: patient.data.description,
            floor: patient.data.floor,
          });
          this.form.controls['image'].setValue(patient.data.profilePictureUrl);
          console.log(this.form);
        });
      }
    });
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  async onSubmit() {
    const img = await fileToBase64(
      this.formControls['image'].value,
      DEFAULT_IMAGE_URL
    );

    if (!this.patientId) {
      this.patientService
        .createPatient({
          firstName: this.formControls['first_name'].value,
          lastName: this.formControls['last_name'].value,
          age: this.formControls['age'].value,
          diseaseStage: this.formControls['disease_stage'].value,
          description: this.formControls['description'].value,
          profilePictureUrl: img,
          floor: this.formControls['floor'].value,
        })
        .subscribe((patient) => {
          this.form.patchValue({
            first_name: patient.data.firstName,
            last_name: patient.data.lastName,
            age: patient.data.age,
            disease_stage: patient.data.diseaseStage,
            description: patient.data.description,
            floor: patient.data.floor,
          });
          this.dialog.closeAll();
        });
    } else {
      this.patientService
        .updatePatient(this.patientId, {
          firstName: this.formControls['first_name'].value,
          lastName: this.formControls['last_name'].value,
          age: this.formControls['age'].value,
          diseaseStage: this.formControls['disease_stage'].value,
          description: this.formControls['description'].value,
          profilePictureUrl: img,
          floor: this.formControls['floor'].value,
        })
        .subscribe((patient) => {
          this.form.patchValue({
            first_name: patient.data.firstName,
            last_name: patient.data.lastName,
            age: patient.data.age,
            disease_stage: patient.data.diseaseStage,
            description: patient.data.description,
            floor: patient.data.floor,
          });
          this.dialog.closeAll();
        });
    }
  }

  get profilePictureUrl() {
    return this.form.get('profilePictureUrl')?.value;
  }
}
