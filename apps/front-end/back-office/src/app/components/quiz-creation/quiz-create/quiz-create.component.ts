import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
  DEFAULT_IMAGE_URL,
  PatientService,
  QuizService,
  fileToBase64,
} from '@webonjour/front-end/shared/common';
import { Prisma } from '@prisma/client';

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
    public data: { patientId?: number }
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      image: [null],
    });
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  async getQuiz(): Promise<Prisma.QuizCreateInput> {
    return {
      title: this.form.controls['title'].value,
      imageUrl: await fileToBase64(
        this.form.controls['image'].value,
        DEFAULT_IMAGE_URL
      ),
      isPrivate: !!this.data?.patientId,
    };
  }

  async onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.quizService.create(await this.getQuiz()).subscribe((quiz) => {
      if (this.data?.patientId) {
        this.patientService
          .addPatientQuiz(this.data?.patientId, quiz.data.id)
          .subscribe(() => {
            this.matDialog.closeAll();
          });
      } else {
        this.matDialog.closeAll();
      }
    });
  }
}
