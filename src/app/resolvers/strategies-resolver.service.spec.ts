import { TestBed } from '@angular/core/testing';

import { StrategiesResolverService } from './strategies-resolver.service';

describe('StrategiesResolverService', () => {
  let service: StrategiesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrategiesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
