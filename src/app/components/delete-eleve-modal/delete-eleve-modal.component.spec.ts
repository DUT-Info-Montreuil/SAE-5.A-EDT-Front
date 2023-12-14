import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEleveModalComponent } from './delete-eleve-modal.component';

describe('DeleteEleveModalComponent', () => {
  let component: DeleteEleveModalComponent;
  let fixture: ComponentFixture<DeleteEleveModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteEleveModalComponent]
    });
    fixture = TestBed.createComponent(DeleteEleveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
