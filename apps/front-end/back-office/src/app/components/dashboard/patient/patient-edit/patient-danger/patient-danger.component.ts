import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '@webonjour/front-end/shared/common';

@Component({
  selector: 'webonjour-patient-danger',
  templateUrl: './patient-danger.component.html',
  styleUrls: ['./patient-danger.component.scss'],
})
export class PatientDangerComponent {
  private id: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
      }
    });
  }

  deletePatient() {
    if (this.id) {
      this.patientService.deletePatient(this.id).subscribe(() => {
        this.router.navigate(['/dashboard/patients']).then();
      });
    }
  }
}
