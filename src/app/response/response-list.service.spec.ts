import { TestBed } from '@angular/core/testing';

import { ResponseListService } from './response-list.service';

describe('ResponseListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResponseListService = TestBed.inject(ResponseListService);
    expect(service).toBeTruthy();
  });
});
