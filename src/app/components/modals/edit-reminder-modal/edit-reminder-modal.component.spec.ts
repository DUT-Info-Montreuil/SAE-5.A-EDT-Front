import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReminderModalComponent } from './edit-reminder-modal.component';

describe('EditReminderModalComponent', () => {
  let component: EditReminderModalComponent;
  let fixture: ComponentFixture<EditReminderModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditReminderModalComponent]
    });
    fixture = TestBed.createComponent(EditReminderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
