import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPageReturnComponent } from './help-page-return.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('HelpPageReturnComponent', () => {
  let component: HelpPageReturnComponent;
  let fixture: ComponentFixture<HelpPageReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpPageReturnComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpPageReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
