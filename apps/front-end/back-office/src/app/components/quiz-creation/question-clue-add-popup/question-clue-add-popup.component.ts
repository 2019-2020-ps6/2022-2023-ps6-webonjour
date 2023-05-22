import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clue } from '@prisma/client';
import { QuestionService } from '@webonjour/front-end/shared/common';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'webonjour-question-clue-add-popup',
  templateUrl: './question-clue-add-popup.component.html',
})
export class QuestionClueAddPopupComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  clue?: Clue;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { clueId?: number; questionId: number }
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      text: [''],
      image: [null],
      isCorrect: [false, [Validators.required]],
    });
    if (this.data.clueId) {
      this.questionService.getClueById(this.data.clueId).subscribe((clue) => {
        this.form.patchValue({
          text: clue.data.text,
          image: clue.data.image,
        });
      });
    }
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    if (!this.data.clueId) {
      this.questionService
        .createClue({
          text: (this.formControls['text'].value as string) || '',
          image: (this.formControls['image'].value as string) || '',
          question: {
            connect: {
              id: this.data.questionId,
            },
          },
        })
        .subscribe((clue) => {
          this.form.patchValue({
            text: clue.data.text,
            image: clue.data.image,
          });
          this.dialog.closeAll();
        });
    } else {
      this.questionService
        .updateClue(this.data.questionId, {
          text: (this.formControls['text'].value as string) || '',
          image: (this.formControls['image'].value as string) || '',
        })
        .subscribe((clue) => {
          this.form.patchValue({
            text: clue.data.text,
            image: clue.data.image,
          });
          this.dialog.closeAll();
        });
    }
  }
}
