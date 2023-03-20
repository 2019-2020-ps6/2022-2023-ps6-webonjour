import { Component, Input } from '@angular/core';

@Component({
  selector: 'webonjour-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent {
  @Input()
  title!: string;
}
