import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'webonjour-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent {
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  onclick() {
    this.location.back();
  }
  get title() {
    return this.activatedRoute?.snapshot?.firstChild?.routeConfig?.title;
  }
}
