import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizEditGeneralComponent } from './quiz-edit-general.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuestionEditGeneralComponent', () => {
  let component: QuizEditGeneralComponent;
  let fixture: ComponentFixture<QuizEditGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizEditGeneralComponent],
      imports: [HttpClientTestingModule, MatDialogModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizEditGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
