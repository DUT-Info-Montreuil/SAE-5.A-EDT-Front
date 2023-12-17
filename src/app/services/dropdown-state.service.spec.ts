import { TestBed } from '@angular/core/testing';

import { DropdownStateService } from './dropdown-state.service';

describe('DropdownStateService', () => {
  let service: DropdownStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropdownStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
