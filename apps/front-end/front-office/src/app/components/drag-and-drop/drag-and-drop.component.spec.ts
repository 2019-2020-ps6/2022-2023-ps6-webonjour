import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragAndDropComponent } from './drag-and-drop.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

interface Action {
  name: string;
  order: number;
}

describe('DragAndDropComponent', () => {
  let component: DragAndDropComponent;
  let fixture: ComponentFixture<DragAndDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragAndDropComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should shuffle', () => {
    component.shuffle();
    expect(component.actions.length).toBe(4);
  });
});
