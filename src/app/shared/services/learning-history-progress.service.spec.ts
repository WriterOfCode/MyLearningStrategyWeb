import { TestBed } from '@angular/core/testing';
import { LearningHistoryProgressService } from './learning-history-progress.service';

describe('LearningHistoryProgressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    // tslint:disable-next-line: deprecation
    const service: LearningHistoryProgressService = TestBed.inject(LearningHistoryProgressService);
    expect(service).toBeTruthy();
  });
});
