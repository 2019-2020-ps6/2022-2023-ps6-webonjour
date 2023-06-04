import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '@webonjour/front-end/shared/common';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'webonjour-patient-edit',
  templateUrl: './patient-edit.component.html',
})
export class PatientEditComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  deletePatient() {
    this.route.params
      .pipe(
        map((params) => parseInt(params['id'])),
        mergeMap((id) => this.patientService.deletePatient(id))
      )
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
}
