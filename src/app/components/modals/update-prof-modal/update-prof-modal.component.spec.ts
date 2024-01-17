import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfModalComponent } from './update-prof-modal.component';

describe('UpdateProfModalComponent', () => {
  let component: UpdateProfModalComponent;
  let fixture: ComponentFixture<UpdateProfModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProfModalComponent]
    });
    fixture = TestBed.createComponent(UpdateProfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
