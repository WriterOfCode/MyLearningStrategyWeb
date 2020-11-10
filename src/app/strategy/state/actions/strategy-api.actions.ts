import { Strategy } from '../../../shared/models/strategy';
import { createAction, props } from '@ngrx/store';

export const loadStrategiesSuccess = createAction(
  '[Strategies API] Load Strategies Success',
  props<{ strategy: Strategy[] }>()
);

export const loadStrategiesFailure = createAction(
  '[Strategies API] Load Strategies Fail',
  props<{ error: string }>()
);

export const loadStrategySuccess = createAction(
  '[Strategy API] Load Strategy Success',
  props<{ strategy: Strategy }>()
);

export const loadStrategyFailure = createAction(
  '[Strategy API] Load Fail',
  props<{ error: string }>()
);

export const updateStrategySuccess = createAction(
  '[Strategy API] Update Strategy Success',
  props<{ strategy: Strategy }>()
);

export const updateStrategyFailure = createAction(
    '[Strategy API] Update Strategy Fail',
    props<{ error: string }>()
);

export const createStrategySuccess = createAction(
    '[Strategy API] Create Strategy Success',
    props<{ strategy: Strategy }>()
);

export const createStrategyFailure = createAction(
    '[Strategy API] Create Strategy Fail',
    props<{ error: string }>()
);

export const deleteStrategySuccess = createAction(
    '[Strategy API] Delete Strategy Success',
    props<{ strategyId: number }>()
);

export const deleteStrategyFailure = createAction(
    '[Strategy API] Delete Strategy Fail',
    props<{ error: string }>()
);
