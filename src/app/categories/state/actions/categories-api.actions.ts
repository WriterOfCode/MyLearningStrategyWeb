import { Category } from '../../../shared/models/category';
import { createAction, props } from '@ngrx/store';

export const loadCategoriesSuccess = createAction(
  '[Categories API] Categories Load Success',
  props<{ Category: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories API] Categories Load Fail',
  props<{ error: string }>()
);

export const updateCategorySuccess = createAction(
  '[Category API] Update Category Success',
  props<{ Category: Category }>()
);

export const updateCategoryFailure = createAction(
    '[Category API] Update Category Fail',
    props<{ error: string }>()
);

export const createCategorySuccess = createAction(
    '[Category API] Create Category Success',
    props<{ Category: Category }>()
);

export const createCategoryFailure = createAction(
    '[Category API] Create Category Fail',
    props<{ error: string }>()
);

export const deleteCategorySuccess = createAction(
    '[Category API] Delete Category Success',
    props<{ CategoryId: number }>()
);

export const deleteCategoryFailure = createAction(
    '[Category API] Delete Category Fail',
    props<{ error: string }>()
);
