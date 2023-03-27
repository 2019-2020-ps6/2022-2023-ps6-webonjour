import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Quiz } from '@webonjour/util-interface';

export function validateStage(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const allowed = ['3', '4', '5', '6', '7'];
    const forbidden = !allowed.includes(control.value);
    return forbidden ? { invalidStage: { value: control.value } } : null;
  };
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
  quiz?: Quiz.Quiz;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      quiz_name: ['', [Validators.required, Validators.minLength(6)]],
      recommended_stage: ['', [Validators.required, validateStage()]],
    });
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    this.quiz = {
      title: this.form.controls['quiz_name'].value,
      questions: [],
      stage: this.form.controls['recommended_stage'].value,
      id: '1',
      imageUrl: '',
    };
  }
}
