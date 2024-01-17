import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarToggleItemComponent } from './sidebar-toggle-item.component';

describe('SidebarToggleItemComponent', () => {
  let component: SidebarToggleItemComponent;
  let fixture: ComponentFixture<SidebarToggleItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarToggleItemComponent]
    });
    fixture = TestBed.createComponent(SidebarToggleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
