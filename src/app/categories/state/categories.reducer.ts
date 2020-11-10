import { CategoriesApiActions, CategoriesPageActions } from './actions/categories-actions-index';
import { CategoryState } from '../../shared/models/category';
import { createReducer, on } from '@ngrx/store';


const initialCategoryState: CategoryState = {
  currentCategoryId: 0,
  categories: [],
  error: '',
  currentPage: 1,
  pageSize: 5,
  searchTerm: '',
  sortColumn: '',
  sortDirection: '',
  isBusy: true
};

export const CategoriesReducer = createReducer<CategoryState>(
  initialCategoryState,
  on(CategoriesPageActions.setCurrentCategory, (state, action): CategoryState => {
    return {
      ...state,
      currentCategoryId: action.currentCategoryId,
    };
  }),
  on(CategoriesPageActions.clearCurrentCategory, (state): CategoryState => {
    return {
      ...state,
      currentCategoryId: null
    };
  }),
  on(CategoriesPageActions.initializeCurrentCategory, (state): CategoryState => {
    return {
      ...state,
      currentCategoryId: 0
    };
  }),
  on(CategoriesApiActions.loadCategoriesSuccess, (state, action): CategoryState => {
    return {
      ...state,
      categories: action.Category,
      error: ''
    };
  }),
  on(CategoriesApiActions.loadCategoriesFailure, (state, action): CategoryState => {
    return {
      ...state,
      categories: [],
      error: action.error
    };
  }),
  on(CategoriesApiActions.updateCategorySuccess, (state, action): CategoryState => {
    const updatedProducts = state.categories.map(
      item => action.Category.categoryId === item.categoryId ? action.Category : item);
    return {
      ...state,
      categories: updatedProducts,
      currentCategoryId: action.Category.categoryId,
      error: ''
    };
  }),
  on(CategoriesApiActions.updateCategoryFailure, (state, action): CategoryState => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a create, the currentProduct is the new product.
  on(CategoriesApiActions.createCategorySuccess, (state, action): CategoryState => {
    return {
      ...state,
      categories: [...state.categories, action.Category],
      currentCategoryId: action.Category.categoryId,
      error: ''
    };
  }),
  on(CategoriesApiActions.createCategoryFailure, (state, action): CategoryState => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a delete, the currentProduct is null.
  on(CategoriesApiActions.deleteCategorySuccess, (state, action): CategoryState => {
    return {
      ...state,
      categories: state.categories.filter(category => category.categoryId !== action.CategoryId),
      currentCategoryId: null,
      error: ''
    };
  }),
  on(CategoriesApiActions.deleteCategoryFailure, (state, action): CategoryState => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(CategoriesPageActions.categoryFilterEvent , (state, action): CategoryState => {
    return {
      ...state,
      searchTerm: action.searchTerm,
    };
  }),
  on(CategoriesPageActions.categoryPageSizeEvent , (state, action): CategoryState => {
    return {
      ...state,
      pageSize: action.pageSize,
      currentPage: 1
    };
  }),
  on(CategoriesPageActions.categoryCurrentPageEvent , (state, action): CategoryState => {
    return {
      ...state,
      currentPage: action.currentPage,
    };
  }),
  on(CategoriesPageActions.categoryIsBusy , (state, action): CategoryState => {
    return {
      ...state,
      isBusy: action.isBusy,
    };
  }),
);
