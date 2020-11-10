import { throwError as _throw, Observable} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Strategy } from '../shared/models/strategy';
/* NgRx */
import { Store } from '@ngrx/store';
import { State,
  getCurrentStrategy,
  getStrategyError,
  getFilteredStrategies,
  getStratagyListPageSize,
  getStrategyIsBusy,
  getCurrentStratagyListPage,
  getStrategiesCount } from './state/strategy.selectors';
import { StrategyPageActions } from './state/actions/strategy-actions-index';


@Component({
  selector: 'mls-strategy-shell',
  templateUrl: './strategy-shell.component.html',
  styleUrls: ['./strategy-shell.component.css']
})
export class StrategyShellComponent implements OnInit {

  errorMessage$: Observable<string>;
  strategies$: Observable<Strategy[]>;
  selectedStrategy$: Observable<Strategy>;
  isBusy$: Observable<boolean>;
  strategiesCount$: Observable<number>;
  pageSize$: Observable<number>;
  currentPage$: Observable<number>;

  constructor(  private store: Store<State>) {
                this.strategies$ = this.store.select(getFilteredStrategies);
                this.errorMessage$ = this.store.select(getStrategyError);
                this.selectedStrategy$ = this.store.select(getCurrentStrategy);
                this.isBusy$ = this.store.select(getStrategyIsBusy);
                this.strategiesCount$ = this.store.select(getStrategiesCount);
                this.pageSize$ = this.store.select(getStratagyListPageSize);
                this.currentPage$ = this.store.select(getCurrentStratagyListPage);
              }

  ngOnInit() {
    this.store.dispatch(StrategyPageActions.strategyIsBusy({isBusy: true}));
    this.store.dispatch(StrategyPageActions.loadStrategies());
    this.store.dispatch(StrategyPageActions.strategyIsBusy({isBusy: false}));
  }
  filter(search: string) {
    this.store.dispatch(StrategyPageActions.strategyFilterEvent({searchTerm: search}));
  }
  pageSizeChange(pagesize: number)
  {
    this.store.dispatch(StrategyPageActions.strategyPageSizeEvent({ pageSize: pagesize}));
  }
  deleteStrategy(selectedStrategy: Strategy): void {
    if (selectedStrategy && selectedStrategy.strategyId !== 0){
      this.store.dispatch(StrategyPageActions.deleteStrategy({strategyId: selectedStrategy.strategyId}));
    } else {
      this.store.dispatch(StrategyPageActions.clearCurrentStrategy());
    }
  }
  editStrategy(selectedStrategy: Strategy): void {
    this.store.dispatch(StrategyPageActions.setCurrentStrategy({ currentStrategyId: selectedStrategy.strategyId }));
  }
  addStrategy(): void {
    console.log('shell add strategy');
    this.store.dispatch(StrategyPageActions.initializeCurrentStrategy());
  }
  strategySelected(strategy: Strategy): void {
    this.store.dispatch(StrategyPageActions.setCurrentStrategy({ currentStrategyId: strategy.strategyId }));
  }
}
