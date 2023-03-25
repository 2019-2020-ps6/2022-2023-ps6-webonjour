import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


export function validateStage(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const allowed = ['3', '4', '5', '6', '7'];
    const forbidden = !allowed.includes(control.value);
    return forbidden ? { 'invalidStage': { value: control.value } } : null;
  }
}

@Component({
  selector: 'webonjour-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.scss'],
})
export class QuizCreateComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      "quiz_name": ['', [Validators.required, Validators.minLength(6)]],
      "recommended_stage": ['', [Validators.required, validateStage()]],
    });
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
  }
}
