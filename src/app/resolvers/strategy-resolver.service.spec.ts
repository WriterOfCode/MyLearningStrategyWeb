import { TestBed } from '@angular/core/testing';

import { StrategyResolverService } from './strategy-resolver.service';

describe('StrategyResolverService', () => {
  let service: StrategyResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrategyResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
