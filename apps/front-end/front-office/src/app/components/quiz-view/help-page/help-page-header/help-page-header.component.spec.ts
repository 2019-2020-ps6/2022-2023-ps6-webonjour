import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPageHeaderComponent } from './help-page-header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HelpPageHeaderComponent', () => {
  let component: HelpPageHeaderComponent;
  let fixture: ComponentFixture<HelpPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpPageHeaderComponent],

      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
