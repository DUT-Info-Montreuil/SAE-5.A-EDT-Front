import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCohorteModalComponent } from './add-cohorte-modal.component';

describe('AddCohorteModalComponent', () => {
  let component: AddCohorteModalComponent;
  let fixture: ComponentFixture<AddCohorteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCohorteModalComponent]
    });
    fixture = TestBed.createComponent(AddCohorteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
