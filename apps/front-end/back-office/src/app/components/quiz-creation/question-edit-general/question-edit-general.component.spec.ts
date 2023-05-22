import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEditGeneralComponent } from './question-edit-general.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuestionEditGeneralComponent', () => {
  let component: QuestionEditGeneralComponent;
  let fixture: ComponentFixture<QuestionEditGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionEditGeneralComponent],
      imports: [HttpClientTestingModule, MatDialogModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionEditGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
