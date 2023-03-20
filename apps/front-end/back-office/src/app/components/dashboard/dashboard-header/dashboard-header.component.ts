import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'webonjour-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent {
  @Input()
  title!: string;

  constructor(private location: Location) {}

  onclick() {
    this.location.back();
  }
}
