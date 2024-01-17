import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEleveModalComponent } from './add-eleve-modal.component';

describe('AddEleveModalComponent', () => {
  let component: AddEleveModalComponent;
  let fixture: ComponentFixture<AddEleveModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEleveModalComponent]
    });
    fixture = TestBed.createComponent(AddEleveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
