import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkipButtonComponent } from './skip-button.component';
import { StoreModule } from '@ngrx/store';
import { fakeBackendProvider } from '@webonjour/data-access-fake-backend';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SkipButtonComponent', () => {
  let component: SkipButtonComponent;
  let fixture: ComponentFixture<SkipButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkipButtonComponent],
      imports: [HttpClientTestingModule],
      providers: [fakeBackendProvider, provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // test the Store
});
