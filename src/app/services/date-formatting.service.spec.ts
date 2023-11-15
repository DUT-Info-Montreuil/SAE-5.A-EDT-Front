import { TestBed } from '@angular/core/testing';

import { DateFormattingService } from './date-formatting.service';

describe('DateFormattingService', () => {
  let service: DateFormattingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateFormattingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
