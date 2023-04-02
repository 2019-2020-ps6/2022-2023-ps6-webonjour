import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPageHeaderComponent } from './help-page-header.component';

describe('HelpPageHeaderComponent', () => {
  let component: HelpPageHeaderComponent;
  let fixture: ComponentFixture<HelpPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpPageHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
