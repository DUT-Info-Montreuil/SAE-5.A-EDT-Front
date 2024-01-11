import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCalendarComponent } from './gestion-calendar.component';

describe('GestionCalendarComponent', () => {
  let component: GestionCalendarComponent;
  let fixture: ComponentFixture<GestionCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCalendarComponent]
    });
    fixture = TestBed.createComponent(GestionCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
