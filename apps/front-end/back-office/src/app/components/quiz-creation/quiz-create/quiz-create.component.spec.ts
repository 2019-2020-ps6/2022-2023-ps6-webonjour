import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { QuizCreateComponent } from './quiz-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';

export const mockControlValueAccessor = {
  provide: NG_VALUE_ACCESSOR,
  useValue: {
    writeValue: () => {
      console.log('writeValue');
    },
    registerOnChange: () => {
      console.log('registerOnChange');
    },
    registerOnTouched: () => {
      console.log('registerOnTouched');
    },
  },
  multi: true,
};

@Component({
  selector: 'webonjour-file-field',
  template: '',
  providers: [mockControlValueAccessor],
})
export class MockCustomFieldComponent {
  public open(): void {
    console.log('open');
  }

  public close(): void {
    console.log('close');
  }
}

describe('QuizCreationComponent', () => {
  let component: QuizCreateComponent;
  let fixture: ComponentFixture<QuizCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizCreateComponent, MockCustomFieldComponent],
      imports: [MatDialogModule, ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
