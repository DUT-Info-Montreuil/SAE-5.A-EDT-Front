import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalleModalComponent } from './update-salle-modal.component';

describe('UpdateSalleModalComponent', () => {
  let component: UpdateSalleModalComponent;
  let fixture: ComponentFixture<UpdateSalleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSalleModalComponent]
    });
    fixture = TestBed.createComponent(UpdateSalleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
