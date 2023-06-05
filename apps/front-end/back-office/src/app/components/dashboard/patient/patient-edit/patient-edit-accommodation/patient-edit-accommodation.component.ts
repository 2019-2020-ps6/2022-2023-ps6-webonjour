import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from '@webonjour/front-end/shared/common';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { Accommodation } from '@prisma/client';

@Component({
  selector: 'webonjour-patient-edit-accommodation',
  templateUrl: './patient-edit-accommodation.component.html',
})
export class PatientEditAccommodationComponent implements AfterViewInit {
  displayedColumns: string[] = ["titre de l'aménagement", 'action'];
  dataSource = new MatTableDataSource<Accommodation>([]);

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
      const patientId = parseInt(params['id']);

      this.patientService
        .getAllAccommodations()
        .subscribe((accommodationAll) => {
          this.patientService
            .getPatientAccommodation(patientId)
            .subscribe((accommodation) => {
              // add a boolean to each accommodation to know if it's checked or not
              this.dataSource = new MatTableDataSource<Accommodation>(
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

  onCheck($event: MatCheckboxChange, element: Accommodation) {
    this.route.params
      .pipe(
        map((params) => parseInt(params['id'])),
        mergeMap((patientId) => {
          const s = this.patientService;
          return $event.checked
            ? s.addPatientAccommodation(patientId, element.id)
            : s.deletePatientAccommodation(patientId, element.id);
        })
      )
      .subscribe({
        error: (err) => {
          console.error(err);
          this.refresh();
        },
      });
  }
}
