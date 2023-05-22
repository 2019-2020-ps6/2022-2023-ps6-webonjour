import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuestionService } from '@webonjour/front-end/shared/common';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Prisma, QuestionType } from '@prisma/client';

@Component({
  selector: 'webonjour-question-edit-general',
  templateUrl: './question-edit-general.component.html',
  styleUrls: ['./question-edit-general.component.scss'],
})
export class QuestionEditGeneralComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  question!: Prisma.QuestionUpdateInput;
  questionId!: number;
  quizId!: number;
  questionTypes = Object.values(QuestionType);

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: {
      quizId: number;
    }
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      image: [null],
      questionType: new FormControl(this.questionTypes[0], Validators.required),
    });
    this.activatedRoute.params.subscribe((params) => {
      if (params['questionId']) {
        this.questionId = params['questionId'];
        this.questionService
          .getById(params['questionId'])
          .subscribe((question) => {
            console.log(question);
            this.form.patchValue(
              {
                title: question.data.title,
                questionType: question.data.type,
                image: question.data.image,
              },
              {
                emitEvent: true,
              }
            );

            this.form.controls['image'].setValue(question.data.image);
            console.log(this.form);
          });
      }
      if (params['quizId']) {
        this.quizId = params['quizId'];
      }
    });

    if (this.data && this.data.quizId) {
      this.quizId = this.data.quizId;
    }
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      if (!this.questionId) {
        this.questionService
          .create({
            title: this.formControls['title'].value as string,
            image: this.formControls['image'].value as string,
            type: this.formControls['questionType'].value as QuestionType,
            quiz: {
              connect: {
                id: this.quizId,
              },
            },
          })
          .subscribe((question) => {
            this.form.patchValue({
              title: question.data.title,
              image: question.data.image,
              questionType: question.data.type,
            });
            this.dialog.closeAll();
          });
      } else {
        this.questionService
          .update(this.questionId, this.question)
          .subscribe((question) => {
            this.form.patchValue({
              title: question.data.title,
              image: question.data.image,
              questionType: question.data.type,
            });
            this.dialog.closeAll();
          });
      }
    }
  }

  get profilePictureUrl() {
    return this.form.get('profilePictureUrl')?.value;
  }
}
