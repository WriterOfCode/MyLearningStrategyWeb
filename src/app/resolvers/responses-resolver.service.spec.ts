import { TestBed } from '@angular/core/testing';

import { ResponsesResolverService } from './responses-resolver.service';

describe('ResponsesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    // tslint:disable-next-line: deprecation
    const service: ResponsesResolverService = TestBed.inject(ResponsesResolverService);
    expect(service).toBeTruthy();
  });
});
