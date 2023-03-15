import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { fakeBackendProvider } from '@webonjour/data-access-fake-backend';
@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'webonjour-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    // provider used to create fake backend
    fakeBackendProvider,
  ],
})
export class AppComponent {
  title = 'front-end-back-office';
}
