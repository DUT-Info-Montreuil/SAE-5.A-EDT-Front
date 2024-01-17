import { TestBed } from '@angular/core/testing';

import { ServicePartagerGestionService } from './service-partager-gestion.service';

describe('ServicePartagerGestionService', () => {
  let service: ServicePartagerGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePartagerGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
