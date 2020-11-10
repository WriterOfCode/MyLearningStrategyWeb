import { StrategyApiActions, StrategyPageActions } from './actions/strategy-actions-index';
import { StrategyState } from '../../shared/models/strategy';
import { createReducer, on } from '@ngrx/store';


const initialStrategyState: StrategyState = {
  currentStrategyId: null,
  strategies: [],
  error: '',
  currentPage: 1,
  pageSize: 5,
  searchTerm: '',
  sortColumn: '',
  sortDirection: '',
  isBusy: true
};

export const StrategyReducer = createReducer<StrategyState>(
  initialStrategyState,
  on(StrategyPageActions.setCurrentStrategy, (state, action): StrategyState => {
    return {
      ...state,
      currentStrategyId: action.currentStrategyId,
    };
  }),
  on(StrategyPageActions.clearCurrentStrategy, (state): StrategyState => {
    return {
      ...state,
      currentStrategyId: null
    };
  }),
  on(StrategyPageActions.initializeCurrentStrategy, (state): StrategyState => {
    return {
      ...state,
      currentStrategyId: 0
    };
  }),
  on(StrategyPageActions.strategyFilterEvent , (state, action): StrategyState => {
    return {
      ...state,
      searchTerm: action.searchTerm,
    };
  }),
  on(StrategyPageActions.strategyPageSizeEvent , (state, action): StrategyState => {
    return {
      ...state,
      pageSize: action.pageSize,
      currentPage: 1
    };
  }),
  on(StrategyPageActions.strategyCurrentPageEvent , (state, action): StrategyState => {
    return {
      ...state,
      currentPage: action.currentPage,
    };
  }),
  on(StrategyPageActions.strategyIsBusy , (state, action): StrategyState => {
    return {
      ...state,
      isBusy: action.isBusy,
    };
  }),
  on(StrategyApiActions.loadStrategiesSuccess, (state, action): StrategyState => {
    return {
      ...state,
      strategies: action.strategy,
      error: ''
    };
  }),
  on(StrategyApiActions.loadStrategiesFailure, (state, action): StrategyState => {
    return {
      ...state,
      strategies: [],
      error: action.error
    };
  }),
  on(StrategyApiActions.updateStrategySuccess, (state, action): StrategyState => {
    const updatedProducts = state.strategies.map(
      item => action.strategy.strategyId === item.strategyId ? action.strategy : item);
    return {
      ...state,
      strategies: updatedProducts,
      currentStrategyId: action.strategy.strategyId,
      error: ''
    };
  }),
  on(StrategyApiActions.updateStrategyFailure, (state, action): StrategyState => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(StrategyApiActions.createStrategySuccess, (state, action): StrategyState => {
    return {
      ...state,
      strategies: [...state.strategies, action.strategy],
      currentStrategyId: action.strategy.strategyId,
      error: ''
    };
  }),
  on(StrategyApiActions.createStrategyFailure, (state, action): StrategyState => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(StrategyApiActions.deleteStrategySuccess, (state, action): StrategyState => {
    return {
      ...state,
      strategies: state.strategies.filter(strategy => strategy.strategyId !== action.strategyId),
      currentStrategyId: null,
      error: ''
    };
  }),
  on(StrategyApiActions.deleteStrategyFailure, (state, action): StrategyState => {
    return {
      ...state,
      error: action.error
    };
  }),
);
