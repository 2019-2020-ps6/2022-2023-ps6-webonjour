import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  fileToBase64,
  QuestionService,
} from '@webonjour/front-end/shared/common';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Answer } from '@prisma/client';

@Component({
  selector: 'webonjour-question-answer-add-popup',
  templateUrl: './question-answer-add-popup.component.html',
  styleUrls: ['./question-answer-add-popup.component.scss'],
})
export class QuestionAnswerAddPopupComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  answer?: Answer;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { answerId?: number; questionId: number }
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      text: [''],
      image: [null],
      isCorrect: [false, [Validators.required]],
    });
    if (this.data.answerId) {
      this.questionService
        .getAnswerById(this.data.answerId)
        .subscribe((answer) => {
          this.form.patchValue({
            text: answer.data.text,
            image: answer.data.image,
            isCorrect: answer.data.isCorrect,
          });
        });
    }
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  async onSubmit() {
    if (!this.data.answerId) {
      this.questionService
        .createAnswer({
          text: (this.formControls['text'].value as string) || '',
          image: this.formControls['image'].value
            ? await fileToBase64(this.formControls['image'].value)
            : undefined,
          question: {
            connect: {
              id: this.data.questionId,
            },
          },
          isCorrect: this.formControls['isCorrect'].value as boolean,
        })
        .subscribe((answer) => {
          this.form.patchValue({
            text: answer.data.text,
            image: answer.data.image,
            isCorrect: answer.data.isCorrect,
          });
          this.dialog.closeAll();
        });
    } else {
      this.questionService
        .updateAnswer(this.data.answerId, {
          text: (this.formControls['text'].value as string) || '',
          image: this.formControls['image'].value
            ? await fileToBase64(this.formControls['image'].value)
            : undefined,
          isCorrect: this.formControls['isCorrect'].value as boolean,
        })
        .subscribe((answer) => {
          this.form.patchValue({
            text: answer.data.text,
            image: answer.data.image,
            isCorrect: answer.data.isCorrect,
          });
          this.dialog.closeAll();
        });
    }
  }
}
