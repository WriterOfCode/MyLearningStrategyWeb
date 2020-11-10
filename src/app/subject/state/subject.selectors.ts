import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../shared/state/app.state';
import { SubjectsState, CompleteSubject } from '../../shared/models/subjects-complete';

export interface State extends AppState.State {
  subjects: SubjectsState;
}

function matchesSubject(subject: CompleteSubject, term: string) {
  if (term === null || term.length === 0) { return true; }
  if (subject.name !== null && subject.name !== undefined && subject.name.length > 0) {
    if (subject.name.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  if (subject.description !== null && subject.description !== undefined && subject.description.length > 0 ) {
    if (subject.description.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  if (subject.keywords !== null && subject.keywords !== undefined && subject.keywords.length > 0) {
    if (subject.keywords.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  return false;
}

const getSubjectFeatureState = createFeatureSelector<SubjectsState>('subject');

export const getCurrentSubjectId = createSelector(
  getSubjectFeatureState,
  state => state.currentSubjectId
);

export const getCurrentSubject = createSelector(
  getSubjectFeatureState,
  getCurrentSubjectId,
  (state, currentSubjectId) => {
    if (currentSubjectId === 0 || currentSubjectId === null ) {
      return {
        bodyOfKnowledgeId: 0,
        userProfileId: 0,
        name: '',
        description: '',
        keywords: '',
        imageDevice: '',
        imageCloud: '',
        imageHash: 0,
        isShared: false,
        hasBeenShared: false,
        tags: [],
        questions: [],
        categories: [],
        lastModifiedOffset: undefined,
        cloudRowId: undefined,
      };
    } else {
      return currentSubjectId ? state.subjects.find(s => s.bodyOfKnowledgeId === currentSubjectId) : null;
    }
  }
);

export const getSubjects = createSelector(
  getSubjectFeatureState,
  ( state ) => state.subjects
);

export const getFilteredSubjects = createSelector(
  getSubjectFeatureState,
  ( state ) => {
    if (state.searchTerm)
    { return state.subjects.filter( str => matchesSubject(str, state.searchTerm));
    } else { return state.subjects; }
  }
);

export const getSubjectCount = createSelector(
  getFilteredSubjects,
  ( state ) => state.length
);

export const getSubjectError = createSelector(
  getSubjectFeatureState,
  state => state.error
);

export const getCurrentSubjectListPage = createSelector(
  getSubjectFeatureState,
  state => state.currentPage
);

export const getSubjectListPageSize = createSelector(
  getSubjectFeatureState,
  state => state.pageSize
);

export const getSubjectListSearchTerm = createSelector(
  getSubjectFeatureState,
  state => state.searchTerm
);

export const getSubjectListSortColumn = createSelector(
  getSubjectFeatureState,
  state => state.sortColumn
);

export const getSubjectIsBusy = createSelector(
  getSubjectFeatureState,
  state => state.isBusy
);
