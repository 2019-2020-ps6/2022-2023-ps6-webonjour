import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { fakeBackendProvider } from '@webonjour/data-access-fake-backend';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/util/alert/alert.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { SideNavComponent } from './components/dashboard/side-nav/side-nav/side-nav.component';
import { ProfileComponent } from './components/dashboard/side-nav/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    LoginComponent,
    LoginFormComponent,
    AlertComponent,
    DashboardComponent,
    SideNavComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
