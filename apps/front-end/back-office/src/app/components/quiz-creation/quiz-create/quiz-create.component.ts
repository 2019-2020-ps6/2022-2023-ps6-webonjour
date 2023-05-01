import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Quiz } from '@webonjour/util-interface';
import { MatDialog } from '@angular/material/dialog';
import { QuizService } from '@webonjour/front-end/shared/common';

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
export class QuizCreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private quizService: QuizService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required]],
      image: [File, [Validators.required]],
      recommended_stage: [null, [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  getQuiz(): Quiz.Quiz {
    const stage = this.form.controls['recommended_stage']
      .value as Quiz.DiseaseStage;
    return {
      title: this.form.controls['title'].value,
      questions: [],
      stage: stage,
      id: '',
      imageUrl: '',
    };
  }

  onSubmit() {
    console.log('submit');
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.quizService.create(this.getQuiz()).subscribe(() => {
      this.matDialog.closeAll();
    });
  }
}
