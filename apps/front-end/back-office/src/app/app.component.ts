import { Component } from '@angular/core';
import { fakeBackendProvider } from '@webonjour/data-access-fake-backend';
@Component({
  selector: 'webonjour-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'front-end-back-office';
}
