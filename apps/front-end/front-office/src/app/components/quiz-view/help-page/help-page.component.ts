import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { quizMocks } from '@webonjour/data-access-fake-backend';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'webonjour-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss'],
})
export class HelpPageComponent {}
