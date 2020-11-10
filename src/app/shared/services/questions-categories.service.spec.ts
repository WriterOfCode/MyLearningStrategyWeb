import { TestBed } from '@angular/core/testing';

import { QuestionsCategoriesService } from './questions-categories.service';

describe('QuestionsCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionsCategoriesService = TestBed.inject(QuestionsCategoriesService);
    expect(service).toBeTruthy();
  });
});
