import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEleveModalComponent } from './update-eleve-modal.component';

describe('UpdateEleveModalComponent', () => {
  let component: UpdateEleveModalComponent;
  let fixture: ComponentFixture<UpdateEleveModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEleveModalComponent]
    });
    fixture = TestBed.createComponent(UpdateEleveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
