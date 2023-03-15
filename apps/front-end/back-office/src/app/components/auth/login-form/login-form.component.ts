import { Component, Input } from '@angular/core';
import { Auth } from '@webonjour/util-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'webonjour-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input() credentials?: Auth.LoginSchema;
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [this.credentials?.email, Validators.required],
      password: [this.credentials?.password, Validators.required],
    });
  }

  public submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
