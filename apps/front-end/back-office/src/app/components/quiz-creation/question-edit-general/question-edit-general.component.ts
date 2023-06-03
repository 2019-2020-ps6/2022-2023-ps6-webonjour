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
import { Observable, ReplaySubject, map, merge, mergeMap } from 'rxjs';

@Component({
  selector: 'webonjour-question-edit-general',
  templateUrl: './question-edit-general.component.html',
})
export class QuestionEditGeneralComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
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
      type: new FormControl(this.questionTypes[0], Validators.required),
    });
    this.activatedRoute.params.subscribe((params) => {
      if (params['questionId']) {
        this.questionId = parseInt(params['questionId']);
        this.questionService.getById(this.questionId).subscribe((question) => {
          this.form.patchValue(
            {
              title: question.data.title,
              type: question.data.type,
              image: question.data.image,
            },
            {
              emitEvent: true,
            }
          );

          this.form.controls['image'].setValue(question.data.image);
        });
      }
      if (params['quizId']) {
        this.quizId = parseInt(params['quizId']);
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

  get imageUrl(): Observable<string | null> {
    const result = new ReplaySubject<string | null>(1);
    const file = this.formControls['image'].value;

    if (file === null) {
      result.next(null);
    } else if (typeof file === 'string') {
      result.next(file);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        result.next(reader.result as string);
      };
    }
    return result;
  }

  get question(): Observable<Prisma.QuestionUpdateInput> {
    return this.imageUrl.pipe(
      map((url) => {
        return {
          title: this.formControls['title'].value as string,
          image: url,
          type: this.formControls['type'].value as QuestionType,
          quiz: {
            connect: {
              id: this.quizId,
            },
          },
        };
      })
    );
  }

  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) return;

    this.question
      .pipe(
        mergeMap((question) => {
          return this.questionId
            ? this.questionService.update(this.questionId, question)
            : this.questionService.create(
                question as Prisma.QuestionCreateInput
              );
        })
      )
      .subscribe((question) => {
        this.dialog.closeAll();
        this.form.patchValue({
          title: question.data.title,
          image: question.data.image,
          type: question.data.type,
        });
      });
  }

  get profilePictureUrl() {
    return this.form.get('profilePictureUrl')?.value;
  }
}
