import { TestBed } from '@angular/core/testing';

import { ResponseResolverService } from './response-resolver.service';

describe('ResponseResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResponseResolverService = TestBed.inject(ResponseResolverService);
    expect(service).toBeTruthy();
  });
});
