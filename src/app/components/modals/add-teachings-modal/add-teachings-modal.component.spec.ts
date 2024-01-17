import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeachingsModalComponent } from './add-teachings-modal.component';

describe('AddTeachingsModalComponent', () => {
  let component: AddTeachingsModalComponent;
  let fixture: ComponentFixture<AddTeachingsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTeachingsModalComponent]
    });
    fixture = TestBed.createComponent(AddTeachingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
