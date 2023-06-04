import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerZoneComponent } from './danger-zone.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PatientDangerComponent', () => {
  let component: DangerZoneComponent;
  let fixture: ComponentFixture<DangerZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [DangerZoneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DangerZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
