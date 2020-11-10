import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../shared/state/app.state';
import { CategoryState, Category } from '../../shared/models/category';

export interface State extends AppState.State {
  categories: CategoryState;
}

const getCategoryFeatureState = createFeatureSelector<CategoryState>('category');

function matchesCategory(category: Category, term: string) {
  if (term === null || term.length === 0) { return true; }
  if (category.categoryName !== null && category.categoryName !== undefined && category.categoryName.length > 0 ) {
    if (category.categoryName.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  return false;
}

export const getCurrentCategoryId = createSelector(
  getCategoryFeatureState,
  state => state.currentCategoryId
);

export const getCurrentCategory = createSelector(
  getCategoryFeatureState,
  getCurrentCategoryId,
  (state, currentCategoryId) => {
    if (currentCategoryId === 0 || currentCategoryId === null ) {
      return {
        categoryId: 0,
        userProfileId: 0,
        categoryName: '',
        imageDevice: undefined,
        imageCloud: undefined,
        imageHash: 0,
        lastModifiedOffset: undefined,
        cloudRowId: undefined,
      };
    } else {
      return currentCategoryId ? state.categories.find(s => s.categoryId === currentCategoryId) : null;
    }
  }
);

export const getCategories = createSelector(
  getCategoryFeatureState,
  ( state ) => {
    return state.categories;
  }
);

export const getFilteredCategories = createSelector(
  getCategoryFeatureState,
  ( state ) => {
    if (state.searchTerm)
    { return state.categories.filter( str => matchesCategory(str, state.searchTerm));
    } else { return state.categories; }
  }
);

export const getCategoryCount = createSelector(
  getCategoryFeatureState,
  ( state ) => {
    if (state.searchTerm)
    { return state.categories
      .filter( str => matchesCategory(str, state.searchTerm)).length;
    }
    else
    { return state.categories.length;
    }
  }
);

export const getCategoryListError = createSelector(
  getCategoryFeatureState,
  state => state.error
);


export const getCategoryListCurrentPage = createSelector(
  getCategoryFeatureState,
  state => state.currentPage
);

export const getCategoryListPageSize = createSelector(
  getCategoryFeatureState,
  state => state.pageSize
);

export const getCategoryListSearchTerm = createSelector(
  getCategoryFeatureState,
  state => state.searchTerm
);

export const getCategoryListSortColumn = createSelector(
  getCategoryFeatureState,
  state => state.sortColumn
);

export const getCategoryIsBusy = createSelector(
  getCategoryFeatureState,
  state => state.isBusy
);

