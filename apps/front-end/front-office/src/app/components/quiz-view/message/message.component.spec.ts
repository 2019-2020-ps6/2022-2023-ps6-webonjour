import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set showMessage to true after 5 seconds', () => {
    jasmine.clock().install();
    expect(component.showMessage).toBeFalsy();
    fixture.detectChanges();
    jasmine.clock().tick(5000);
    expect(component.showMessage).toBeTruthy();
    jasmine.clock().uninstall();
  });

  it('should display the message when showMessage is true', () => {
    component.showMessage = true;
    fixture.detectChanges();
    const messageElement = fixture.nativeElement.querySelector('.message');
    expect(messageElement).not.toBeNull();
    expect(messageElement.textContent).toContain(component.message);
  });
});
