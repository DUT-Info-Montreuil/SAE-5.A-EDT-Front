import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRessourceModalComponent } from './update-ressource-modal.component';

describe('UpdateRessourceModalComponent', () => {
  let component: UpdateRessourceModalComponent;
  let fixture: ComponentFixture<UpdateRessourceModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRessourceModalComponent]
    });
    fixture = TestBed.createComponent(UpdateRessourceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
