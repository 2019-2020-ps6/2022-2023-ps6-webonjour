import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
  PatientService,
  QuizService,
} from '@webonjour/front-end/shared/common';
import { DiseaseStage, Prisma } from '@prisma/client';

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
    private quizService: QuizService,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA)
    public data: { patientId?: string }
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        title: ['', [Validators.required, Validators.minLength(6)]],
        description: ['', [Validators.required]],
        image23: [null, [Validators.required]],
        recommended_stage: [null, [Validators.required]],
      },
      {}
    );

    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  getQuiz(): Prisma.QuizCreateInput {
    const stage = this.form.controls['recommended_stage'].value as DiseaseStage;
    return {
      title: this.form.controls['title'].value,
      stage: stage,
      imageUrl: '',
      isPrivate: !!this.data.patientId,
    };
  }

  onSubmit() {
    console.log('submit');
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.quizService.create(this.getQuiz()).subscribe((quiz) => {
      if (this.data.patientId) {
        this.patientService
          .addPatientQuiz(this.data.patientId, quiz.data.id)
          .subscribe(() => {
            this.matDialog.closeAll();
          });
      } else {
        this.matDialog.closeAll();
      }
    });
  }
}
