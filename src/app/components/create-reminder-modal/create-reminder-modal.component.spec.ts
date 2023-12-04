import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReminderModalComponent } from './create-reminder-modal.component';

describe('CreateReminderModalComponent', () => {
  let component: CreateReminderModalComponent;
  let fixture: ComponentFixture<CreateReminderModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateReminderModalComponent]
    });
    fixture = TestBed.createComponent(CreateReminderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
