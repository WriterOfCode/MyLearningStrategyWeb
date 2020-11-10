import { TestBed } from '@angular/core/testing';

import { QuestionListService } from './question-list.service';

describe('QuestionListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    // tslint:disable-next-line: deprecation
    const service: QuestionListService = TestBed.inject(QuestionListService);
    expect(service).toBeTruthy();
  });
});
