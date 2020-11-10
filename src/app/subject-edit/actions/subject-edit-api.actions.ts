import { createAction, props } from '@ngrx/store';
import { Subject } from '../../shared/models/subjects';

export const subjectLoaded = createAction(
  '[Subject API] Subject Loaded Success',
  props<{ subject: Subject }>()
);

export const subjectsLoadedAct = createAction(
  '[Subject API] Subjects Loaded Success',
  props<{ subject: Subject[] }>()
);

export const subjectCreatedAct = createAction(
  '[Subject API] Subject Created',
  props<{ subject: Subject }>()
);

export const subjectUpdatedAct = createAction(
  '[Subject API] Subject Updated',
  props<{ subject: Subject }>()
);

export const subjectDeletedAct = createAction(
  '[Subject API] Subject Deleted',
  props<{ bodyOfKnowledgeId: number }>()
);
