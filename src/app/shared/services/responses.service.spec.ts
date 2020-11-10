import { TestBed } from '@angular/core/testing';

import { ResponsesService } from './responses.service';

describe('ResponsesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResponsesService = TestBed.inject(ResponsesService);
    expect(service).toBeTruthy();
  });
});
