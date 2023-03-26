import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from '../side-nav/side-nav/side-nav.component';
import { ProfileComponent } from '../side-nav/profile/profile.component';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    ProfileComponent,
    DashboardHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    MatTableModule,
    MatPaginatorModule,
    CdkOverlayOrigin,
  ],
  bootstrap: [DashboardComponent],
})
export class DashboardModule {}