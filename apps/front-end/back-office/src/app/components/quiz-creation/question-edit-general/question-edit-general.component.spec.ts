import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEditGeneralComponent } from './question-edit-general.component';

describe('QuestionEditGeneralComponent', () => {
  let component: QuestionEditGeneralComponent;
  let fixture: ComponentFixture<QuestionEditGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionEditGeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionEditGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
