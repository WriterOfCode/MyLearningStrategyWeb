import { createAction, props } from '@ngrx/store';
import { Strategy } from '../../../shared/models/strategy';

export const setCurrentStrategy = createAction(
  '[Strategy Page] Set Current Strategy',
  props<{ currentStrategyId: number }>()
);

export const clearCurrentStrategy = createAction(
  '[Strategy Page] Clear Current Strategy'
);

export const initializeCurrentStrategy = createAction(
  '[Strategy Page] Initialize Current Strategy'
);

export const loadStrategies = createAction(
  '[Strategies Page] Load'
);

export const updateStrategy = createAction(
  '[Strategy Page] Update Strategy',
  props<{ strategy: Strategy }>()
);

export const createStrategy = createAction(
  '[Strategy Page] Create Strategy',
  props<{ strategy: Strategy }>()
);

export const deleteStrategy = createAction(
  '[Strategy Page] Delete Strategy',
  props<{ strategyId: number }>()
);

export const strategyPageSizeEvent = createAction(
  '[Strategy Page] Subject Pagination Page size event',
  props<{ pageSize: number}>()
);

export const strategyCurrentPageEvent = createAction(
  '[Strategy Page] Subject Pagination Current Page event',
  props<{currentPage: number}>()
);

export const strategyFilterEvent = createAction(
  '[Strategy Page] Strategy Filter Event',
  props<{ searchTerm: string}>()
);

export const strategyIsBusy = createAction(
  '[Strategy Page] Is Strategy Busy Event',
  props<{ isBusy: boolean }>()
);

