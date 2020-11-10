import { TestBed } from '@angular/core/testing';

import { SubjectsCategoriesService } from './subjects-categories.service';

describe('SubjectsCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectsCategoriesService = TestBed.inject(SubjectsCategoriesService);
    expect(service).toBeTruthy();
  });
});
