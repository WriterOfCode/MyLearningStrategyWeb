import {Guid} from 'guid-typescript';

export interface Strategy {
  originator: Guid;
  strategyId: number;
  userProfileId: number;
  name: string;
  description: string;
  sortRuleId: number;
  questionSelection: number;
  responseSelection: number;
  onlyCorrect:	boolean;
  recycleIncorrectlyAnswered:	boolean;
  lastModifiedOffset: string;
  cloudRowId: Guid;
  Summary: string;
}

export interface StrategyState {
  currentStrategyId: number | null;
  strategies: Strategy[];
  error?: any;
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: StrategySortColumn;
  sortDirection: StrategySortDirection;
  isBusy: boolean;
}

export interface StrategyResolved {
  strategy: Strategy;
  error?: any;
}

export interface StrategiesResolved {
  strategy: Strategy[];
  count: number;
  error?: any;
}

export interface StrategySortEvent {
  column: StrategySortColumn;
  direction: StrategySortDirection;
}

export type StrategySortColumn = keyof Strategy | '';
export type StrategySortDirection = 'asc' | 'desc' | '';
