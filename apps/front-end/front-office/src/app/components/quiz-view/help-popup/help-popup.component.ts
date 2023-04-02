import { Component, Input } from '@angular/core';

@Component({
  selector: 'webonjour-help-popup',
  templateUrl: './help-popup.component.html',
  styleUrls: ['./help-popup.component.scss'],
})
export class HelpPopupComponent {
  @Input() help_message = 'This is a help message';
  @Input() show_help = false;
}
