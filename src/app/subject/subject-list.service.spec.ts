import { TestBed } from '@angular/core/testing';
import { SubjectListService } from './subject-list.service';

describe('SubjectListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectListService = TestBed.inject(SubjectListService);
    expect(service).toBeTruthy();
  });
});
