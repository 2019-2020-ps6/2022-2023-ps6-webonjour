import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageComponent } from './message.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the message when showMessage is true', () => {
    component.showMessage = true;
    fixture.detectChanges();
    const messageElement = fixture.nativeElement.querySelector('.message');
    expect(messageElement).not.toBeNull();
    expect(messageElement.textContent).toContain(component.message);
  });
});
