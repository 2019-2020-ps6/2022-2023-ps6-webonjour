import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'webonjour-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  message =
    'Il ne faut pas avoir peur de se tromper \ud83d\ude09  N\'hésitez pas à utiliser le bouton "Aide"';
  showMessage = false;

  ngOnInit() {
    setTimeout(() => {
      this.showMessage = true;
    }, 5000);
  }
}
