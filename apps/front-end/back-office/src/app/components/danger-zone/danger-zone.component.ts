import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '@webonjour/front-end/shared/common';

@Component({
  selector: 'webonjour-danger-zone',
  templateUrl: './danger-zone.component.html',
})
export class DangerZoneComponent {
  @Input() elementName: string = 'cet élément';
  // callback provided by parent component
  @Input() deleteCallback: Function = () => {};
}
