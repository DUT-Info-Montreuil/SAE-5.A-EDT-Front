import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateClassesComponent } from './modal-create-classes.component';

describe('ModalCreateClassesComponent', () => {
  let component: ModalCreateClassesComponent;
  let fixture: ComponentFixture<ModalCreateClassesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCreateClassesComponent]
    });
    fixture = TestBed.createComponent(ModalCreateClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
