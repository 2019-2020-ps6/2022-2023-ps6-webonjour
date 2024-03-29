import { Component } from '@angular/core';
import { PatientService } from '@webonjour/front-end/shared/common';
import { Patient } from '@webonjour/util-interface';
import { Prisma } from '@prisma/client';

@Component({
  selector: 'webonjour-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss'],
})
export class CardContainerComponent {
  patientService!: PatientService;
  patients!: Prisma.PatientGetPayload<Patient.PatientFull>[];
  floors!: number[];
  showPatients = false;

  constructor(patientService: PatientService) {
    this.patientService = patientService;
    this.patientService.getPatients().subscribe((patients) => {
      this.patients = patients.data;
      this.floors = [...new Set(this.patients.map((patient) => patient.floor))];
      this.floors.sort();
    });
  }

  selectFloor(floor: number) {
    this.patients = this.patients.filter((patient) => patient.floor === floor);
    this.showPatients = true;
  }
}
