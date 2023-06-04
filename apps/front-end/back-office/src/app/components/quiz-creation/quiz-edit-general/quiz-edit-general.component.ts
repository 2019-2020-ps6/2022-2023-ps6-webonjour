import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  QuestionService,
  QuizService,
  fileToBase64,
} from '@webonjour/front-end/shared/common';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Prisma, QuestionType } from '@prisma/client';
import { DEFAULT_IMAGE_URL } from '@webonjour/front-end/shared/common';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'webonjour-quiz-edit-general',
  templateUrl: './quiz-edit-general.component.html',
})
export class QuizEditGeneralComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  loading = false;
  quizId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
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
    });

    this.activatedRoute.params
      .pipe(
        map((params) => parseInt(params['id'])),
        mergeMap((id) => this.quizService.getById(id))
      )
      .subscribe((quiz) => {
        this.quizId = quiz.data.id;
        this.form.patchValue({
          title: quiz.data.title,
          image: quiz.data.imageUrl,
        });
      });
  }

  get formControls() {
    return this.form.controls;
  }

  async quiz(): Promise<Prisma.QuizCreateInput> {
    return {
      title: this.formControls['title'].value as string,
      imageUrl: await fileToBase64(
        this.formControls['image'].value,
        DEFAULT_IMAGE_URL
      ),
      isPrivate: false,
    };
  }

  async onSubmit() {
    this.submitted = true;
    if (!this.form.valid) return;

    this.loading = true;

    const quiz = await this.quiz();
    const res = this.quizId
      ? this.quizService.update(this.quizId, quiz)
      : this.quizService.create(quiz);

    res.subscribe((question) => {
      this.dialog.closeAll();
      this.loading = false;
      this.form.patchValue({
        title: question.data.title,
        image: question.data.imageUrl,
      });
    });
  }
}
