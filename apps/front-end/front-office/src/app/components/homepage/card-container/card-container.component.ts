import { Component } from '@angular/core';
import { PatientService } from '@webonjour/front-end/shared/common';
import { Patient } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss'],
})
export class CardContainerComponent {
  patientService!: PatientService;
  patients!: Patient.Patient[];

  constructor(patientService: PatientService) {
    this.patientService = patientService;
    this.patientService.getPatients().subscribe((patients) => {
      this.patients = patients.data;
    });
  }
}
