import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPageHintComponent } from './help-page-hint.component';

describe('HelpPageHintComponent', () => {
  let component: HelpPageHintComponent;
  let fixture: ComponentFixture<HelpPageHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpPageHintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpPageHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
