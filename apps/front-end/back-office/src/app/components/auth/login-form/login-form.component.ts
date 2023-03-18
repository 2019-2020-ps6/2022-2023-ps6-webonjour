import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/util/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'webonjour-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit

    this.alertService.clear();
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login({
        email: this.formControls['email'].value,
        password: this.formControls['password'].value,
      })
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to dashboard
          const returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          // redirect to return url
          this.zone
            .run(() => this.router.navigateByUrl(returnUrl))
            .then((r) => console.log(r));
        },
        error: (error: HttpErrorResponse) => {
          this.alertService.error(error.error?.message);
          this.loading = false;
        },
      });
  }
}
