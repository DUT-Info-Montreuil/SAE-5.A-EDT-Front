import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateEventComponent } from './modal-create-event.component';

describe('ModalCreateEventComponent', () => {
  let component: ModalCreateEventComponent;
  let fixture: ComponentFixture<ModalCreateEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCreateEventComponent]
    });
    fixture = TestBed.createComponent(ModalCreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
