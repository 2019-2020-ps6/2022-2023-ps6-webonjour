import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '@webonjour/util-interface';
import { PatientService } from '@webonjour/front-end/shared/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'webonjour-patient-edit-accommodation',
  templateUrl: './patient-edit-accommodation.component.html',
  styleUrls: ['./patient-edit-accommodation.component.scss'],
})
export class PatientEditAccommodationComponent implements AfterViewInit {
  displayedColumns: string[] = ["titre de l'aménagement", 'action'];
  dataSource = new MatTableDataSource<Patient.Accommodation>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private patientService: PatientService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.refresh();
  }

  refresh() {
    this.route.params.subscribe((params) => {
      const patientId = params['id'];

      this.patientService
        .getAllAccommodations()
        .subscribe((accommodationAll) => {
          this.patientService
            .getPatientAccommodation(patientId)
            .subscribe((accommodation) => {
              // add a boolean to each accommodation to know if it's checked or not
              this.dataSource = new MatTableDataSource<Patient.Accommodation>(
                accommodationAll.data.map((accommodationAll) => {
                  const accommodationFound = accommodation.data.find(
                    (accommodation) => accommodation.id === accommodationAll.id
                  );
                  return {
                    ...accommodationAll,
                    checked: !!accommodationFound,
                  };
                })
              );
              this.dataSource.paginator = this.paginator;
            });
        });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onCheck($event: MatCheckboxChange, element: Patient.Accommodation) {
    this.route.params
      .pipe(
        map((params) => params['id']),
        map((patientId) => {
          const s = this.patientService;
          return $event.checked
            ? s.addPatientAccommodation(patientId, element.id)
            : s.deletePatientAccommodation(patientId, element.id);
        })
      )
      .subscribe({
        error: (error) => {
          console.log(error);
          this.refresh();
        },
      });
  }
}
