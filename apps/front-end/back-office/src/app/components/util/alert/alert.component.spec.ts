import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { Alert, AlertType } from '../../../models/alert';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct alert class', () => {
    const alert = new Alert({
      type: AlertType.Success,
    });
    expect(component.cssClass(alert)).toEqual(
      'alert alert-dismissible mt-4 container alert-success'
    );
    const alert2 = new Alert({
      type: AlertType.Error,
    });
    expect(component.cssClass(alert2)).toEqual(
      'alert alert-dismissible mt-4 container alert-danger'
    );

    const alert3 = new Alert({
      type: AlertType.Success,
      fade: true,
    });
    expect(component.cssClass(alert3)).toEqual(
      'alert alert-dismissible mt-4 container alert-success fade'
    );
  });

  it('should remove alert', () => {
    const alert = new Alert({
      type: AlertType.Success,
    });
    component.fade = false;
    component.alerts.push(alert);
    component.removeAlert(alert);
    expect(component.alerts.length).toEqual(0);
  });

  it('should remove alert with fade', () => {
    const alert = new Alert({
      type: AlertType.Success,
    });
    component.alerts.push(alert);
    component.removeAlert(alert);
    // wait for fade out
    setTimeout(() => {
      expect(component.alerts.length).toEqual(0);
    }, 300);
  });
  it('should not crash when alert was not added', () => {
    const alert = new Alert({
      type: AlertType.Success,
    });
    component.removeAlert(alert);
  });
});
