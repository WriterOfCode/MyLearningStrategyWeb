import { TestBed } from '@angular/core/testing';

import { SubjectEditService } from './subject-edit.service';

describe('SubjectEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectEditService = TestBed.inject(SubjectEditService);
    expect(service).toBeTruthy();
  });
});
