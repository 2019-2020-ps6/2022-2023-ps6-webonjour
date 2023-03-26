import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListComponent } from './quiz-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

describe('QuizListComponent', () => {
  let component: QuizListComponent;
  let fixture: ComponentFixture<QuizListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizListComponent],
      imports: [HttpClientTestingModule, MatPaginatorModule, MatTableModule],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
