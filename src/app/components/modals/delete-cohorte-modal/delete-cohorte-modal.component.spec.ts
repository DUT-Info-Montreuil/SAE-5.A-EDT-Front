import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCohorteModalComponent } from './delete-cohorte-modal.component';

describe('DeleteCohorteModalComponent', () => {
  let component: DeleteCohorteModalComponent;
  let fixture: ComponentFixture<DeleteCohorteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCohorteModalComponent]
    });
    fixture = TestBed.createComponent(DeleteCohorteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
