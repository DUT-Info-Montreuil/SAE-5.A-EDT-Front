import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonalModalComponent } from './add-personal-modal.component';

describe('AddPersonalModalComponent', () => {
  let component: AddPersonalModalComponent;
  let fixture: ComponentFixture<AddPersonalModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPersonalModalComponent]
    });
    fixture = TestBed.createComponent(AddPersonalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
