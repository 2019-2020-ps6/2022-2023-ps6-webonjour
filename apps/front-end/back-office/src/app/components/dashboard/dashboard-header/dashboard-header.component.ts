import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'webonjour-dashboard-header',
  templateUrl: './dashboard-header.component.html',
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
