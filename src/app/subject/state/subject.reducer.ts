import { SubjectApiActions, SubjectPageActions } from './actions/subject-actions-index';
import { SubjectsState } from '../../shared/models/subjects-complete';
import { createReducer, on } from '@ngrx/store';

const initialSubjectState: SubjectsState = {
  currentSubjectId:  0,
  subjects: [],
  error:  '',
  currentPage:  1,
  pageSize:  5,
  searchTerm:  '',
  sortColumn:  '',
  sortDirection:  '',
  isBusy:  true,
};


export const SubjectReducer = createReducer<SubjectsState>(
  initialSubjectState,
  on(SubjectPageActions.setCurrentSubject, (state, action): SubjectsState => {
    return {
      ...state,
      currentSubjectId: action.currentSubjectId,
    };
  }),
  on(SubjectPageActions.clearCurrentSubject, (state): SubjectsState => {
    return {
      ...state,
      currentSubjectId: null
    };
  }),
  on(SubjectPageActions.initializeCurrentSubject, (state): SubjectsState => {
    return {
      ...state,
      currentSubjectId: 0
    };
  }),
  on(SubjectPageActions.subjectFilterEvent , (state, action): SubjectsState => {
    return {
      ...state,
      searchTerm: action.searchTerm,
    };
  }),
  on(SubjectPageActions.subjectPageSizeEvent , (state, action): SubjectsState => {
    return {
      ...state,
      pageSize: action.pageSize,
      currentPage: 1
    };
  }),
  on(SubjectPageActions.subjectCurrentPageEvent , (state, action): SubjectsState => {
    return {
      ...state,
      currentPage: action.currentPage,
    };
  }),
  on(SubjectPageActions.subjectIsBusy , (state, action): SubjectsState => {
    return {
      ...state,
      isBusy: action.isBusy,
    };
  }),
  on(SubjectApiActions.loadSubjectsSuccess, (state, action): SubjectsState => {
    return {
      ...state,
      subjects: action.subjects,
      error: ''
    };
  }),
  on(SubjectApiActions.loadSubjectsFailure, (state, action): SubjectsState => {
    return {
      ...state,
      subjects: [],
      error: action.error
    };
  }),
  on(SubjectApiActions.updateSubjectSuccess, (state, action): SubjectsState => {
    const updatedProducts = state.subjects.map(
      item => action.subject.bodyOfKnowledgeId === item.bodyOfKnowledgeId ? action.subject : item);
    return {
      ...state,
      subjects: updatedProducts,
      currentSubjectId: action.subject.bodyOfKnowledgeId,
      error: ''
    };
  }),
  on(SubjectApiActions.updateSubjectFailure, (state, action): SubjectsState => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(SubjectApiActions.createSubjectSuccess, (state, action): SubjectsState => {
    return {
      ...state,
      subjects: [...state.subjects, action.subject],
      currentSubjectId: action.subject.bodyOfKnowledgeId,
      error: ''
    };
  }),
  on(SubjectApiActions.createSubjectFailure, (state, action): SubjectsState => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(SubjectApiActions.deleteSubjectSuccess, (state, action): SubjectsState => {
    return {
      ...state,
      subjects: state.subjects.filter(Subject => Subject.bodyOfKnowledgeId !== action.bodyOfKnowledgeId),
      currentSubjectId: null,
      error: ''
    };
  }),
  on(SubjectApiActions.deleteSubjectFailure, (state, action): SubjectsState => {
    return {
      ...state,
      error: action.error
    };
  }),
  );
