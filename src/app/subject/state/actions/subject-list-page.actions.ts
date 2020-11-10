import { CompleteSubject } from '../../../shared/models/subjects-complete';
import { createAction, props } from "@ngrx/store";

export const setCurrentSubject = createAction(
  '[Subject Page] Set Current Subject',
  props<{ currentSubjectId: number }>()
);

export const clearCurrentSubject = createAction(
  '[Subject Page] Clear Current Subject'
);

export const initializeCurrentSubject = createAction(
  '[Subject Page] Initialize Current Subject'
);

export const loadSubjects = createAction(
  '[Strategies Page] Load Subjects'
);

export const updateSubject = createAction(
  '[Subject Page] Update Subject',
  props<{ Subject: CompleteSubject }>()
);

export const createSubject = createAction(
  '[Subject Page] Create Subject',
  props<{ Subject: CompleteSubject }>()
);

export const deleteSubject = createAction(
  '[Subject Page] Delete Subject',
  props<{ SubjectId: number }>()
);

export const subjectPageSizeEvent = createAction(
  '[Subject Page] Subject Pagination Page size event',
  props<{ pageSize: number}>()
);

export const subjectCurrentPageEvent = createAction(
  '[Subject Page] Subject Pagination Current Page event',
  props<{currentPage: number}>()
);

export const subjectFilterEvent = createAction(
  '[Subject Page] Subject Filter Event',
  props<{ searchTerm: string}>()
);

export const subjectIsBusy = createAction(
  '[Subject Page] Is Subject Busy Event',
  props<{ isBusy: boolean }>()
);
