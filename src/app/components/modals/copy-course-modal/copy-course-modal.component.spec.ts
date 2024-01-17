import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyCourseModalComponent } from './copy-course-modal.component';

describe('CopyCourseModalComponent', () => {
  let component: CopyCourseModalComponent;
  let fixture: ComponentFixture<CopyCourseModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CopyCourseModalComponent]
    });
    fixture = TestBed.createComponent(CopyCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
