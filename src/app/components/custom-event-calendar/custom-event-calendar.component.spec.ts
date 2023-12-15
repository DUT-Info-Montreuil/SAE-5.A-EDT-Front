import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomEventCalendarComponent } from './custom-event-calendar.component';

describe('CustomEventCalendarComponent', () => {
  let component: CustomEventCalendarComponent;
  let fixture: ComponentFixture<CustomEventCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomEventCalendarComponent]
    });
    fixture = TestBed.createComponent(CustomEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
