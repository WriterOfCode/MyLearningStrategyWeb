import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import * as AppState from '../../shared/state/app.state';
import { StrategyState, Strategy } from '../../shared/models/strategy';

export interface State extends AppState.State {
  strategies: StrategyState;
}

const getStrategyFeatureState = createFeatureSelector<StrategyState>('strategy');

function matchesStrategy(strategy: Strategy, term: string) {
  if (term === null || term.length === 0) { return true; }
  if (strategy.name !== null && strategy.name !== undefined && strategy.name.length > 0 ) {
    if (strategy.name.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  if (strategy.description  !== null && strategy.description !== undefined && strategy.description.length > 0 ) {
    if (strategy.description.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  return false;
}

export const getCurrentStrategyId = createSelector(
  getStrategyFeatureState,
  state => state.currentStrategyId
);

export const getCurrentStrategy = createSelector(
  getStrategyFeatureState,
  getCurrentStrategyId,
  (state, currentStrategyId) => {
    if (currentStrategyId === 0 || currentStrategyId === null ) {
      return {
        originator: Guid.createEmpty(),
        strategyId: 0,
        userProfileId: 0,
        name: '',
        description: '',
        sortRuleId: 0,
        questionSelection: 0,
        responseSelection: 0,
        onlyCorrect:	false,
        recycleIncorrectlyAnswered:	true,
        lastModifiedOffset: undefined,
        cloudRowId: undefined,
        Summary: '',
      };
    } else {
      return currentStrategyId ? state.strategies.find(s => s.strategyId === currentStrategyId) : null;
    }
  }
);

export const getFilteredStrategies = createSelector(
  getStrategyFeatureState,
  ( state ) => {
    if (state.searchTerm)
    { return state.strategies.filter( str => matchesStrategy(str, state.searchTerm));
    } else { return state.strategies; }
  }
);

export const getStrategiesCount = createSelector(
  getStrategyFeatureState,
  ( state ) => {
    if (state.searchTerm)
    { return state.strategies
      .filter( str => matchesStrategy(str, state.searchTerm)).length;
    }
    else
    { return state.strategies.length;
    }
  }
);

export const getStrategyError = createSelector(
  getStrategyFeatureState,
  state => state.error
);

export const getCurrentStratagyListPage = createSelector(
  getStrategyFeatureState,
  state => state.currentPage
);

export const getStratagyListPageSize = createSelector(
  getStrategyFeatureState,
  state => state.pageSize
);

export const getStratagyListSearchTerm = createSelector(
  getStrategyFeatureState,
  state => state.searchTerm
);

export const getStratagyListSortColumn = createSelector(
  getStrategyFeatureState,
  state => state.sortColumn
);

export const getStrategyIsBusy = createSelector(
  getStrategyFeatureState,
  state => state.isBusy
);

