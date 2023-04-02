import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'webonjour-help-page-return',
  templateUrl: './help-page-return.component.html',
  styleUrls: ['./help-page-return.component.scss'],
})
export class HelpPageReturnComponent {
  constructor(private router: Router) {}
  onClick() {
    this.router.navigate(['/quiz-answer']);
  }
}
