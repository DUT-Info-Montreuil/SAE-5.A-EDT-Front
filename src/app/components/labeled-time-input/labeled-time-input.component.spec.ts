import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledTimeInputComponent } from './labeled-time-input.component';

describe('LabeledTimeInputComponent', () => {
  let component: LabeledTimeInputComponent;
  let fixture: ComponentFixture<LabeledTimeInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabeledTimeInputComponent]
    });
    fixture = TestBed.createComponent(LabeledTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
