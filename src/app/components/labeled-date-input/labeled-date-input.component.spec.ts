import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledDateInputComponent } from './labeled-date-input.component';

describe('LabeledDateInputComponent', () => {
  let component: LabeledDateInputComponent;
  let fixture: ComponentFixture<LabeledDateInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabeledDateInputComponent]
    });
    fixture = TestBed.createComponent(LabeledDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
