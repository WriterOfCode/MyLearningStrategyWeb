import { Category } from '../../../shared/models/category';
import { createAction, props } from '@ngrx/store';

export const setCurrentCategory = createAction(
  '[Category Page] Set Current Category',
  props<{ currentCategoryId: number }>()
);

export const clearCurrentCategory = createAction(
  '[Category Page] Clear Current Category'
);

export const initializeCurrentCategory = createAction(
  '[Category Page] Initialize Current Category'
);

export const loadCategories = createAction(
  '[Categories Page] Category Load'
);

export const updateCategory = createAction(
  '[Category Page] Update Category',
  props<{ Category: Category }>()
);

export const createCategory = createAction(
  '[Category Page] Create Category',
  props<{ Category: Category }>()
);

export const deleteCategory = createAction(
  '[Category Page] Delete Category',
  props<{ CategoryId: number }>()
);

export const categoryPageSizeEvent = createAction(
  '[Category Page] Category Pagination Page size event',
  props<{ pageSize: number}>()
);

export const categoryCurrentPageEvent = createAction(
  '[Category Page] Category Pagination Current Page event',
  props<{currentPage: number}>()
);

export const categoryFilterEvent = createAction(
  '[Category Page] Category Filter Event',
  props<{ searchTerm: string}>()
);

export const categoryIsBusy = createAction(
  '[Category Page] Is Category Busy Event',
  props<{ isBusy: boolean }>()
);

