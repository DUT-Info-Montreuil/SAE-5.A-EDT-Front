import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledIconInputComponent } from './labeled-icon-input.component';

describe('LabeledIconInputComponent', () => {
  let component: LabeledIconInputComponent;
  let fixture: ComponentFixture<LabeledIconInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabeledIconInputComponent]
    });
    fixture = TestBed.createComponent(LabeledIconInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
