import { CompleteSubject } from '../../../shared/models/subjects-complete';
import { createAction, props } from '@ngrx/store';

export const loadSubjectsSuccess = createAction(
  '[Subject API] Subject Load Success',
  props<{ subjects: CompleteSubject[] }>()
);

export const loadSubjectsFailure = createAction(
  '[Subject API] Subject Load Failed',
  props<{ error: string }>()
);

export const updateSubjectSuccess = createAction(
  '[Subject API] Update Subject Success',
  props<{ subject: CompleteSubject }>()
);

export const updateSubjectFailure = createAction(
  '[Subject API] Update Subject Failed',
  props<{ error: string }>()
);

export const createSubjectSuccess = createAction(
  '[Subject API] Create Subject Success',
  props<{ subject: CompleteSubject }>()
);

export const createSubjectFailure = createAction(
  '[Subject API] Create Subject Failed',
  props<{ error: string }>()
);

export const deleteSubjectSuccess = createAction(
    '[Subject API] Delete Subject Success',
    props<{ bodyOfKnowledgeId: number }>()
);

export const deleteSubjectFailure = createAction(
    '[Subject API] Delete Subject Failed',
    props<{ error: string }>()
);
