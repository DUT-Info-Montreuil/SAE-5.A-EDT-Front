import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseModalComponent } from './edit-course-modal.component';

describe('EditCourseModalComponent', () => {
  let component: EditCourseModalComponent;
  let fixture: ComponentFixture<EditCourseModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCourseModalComponent]
    });
    fixture = TestBed.createComponent(EditCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
