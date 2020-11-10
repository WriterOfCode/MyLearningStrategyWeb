import { throwError as _throw} from 'rxjs';
import { Component, ViewChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Strategy, StrategySortColumn, StrategySortDirection } from '../shared/models/strategy';
import { StrategyListSortDirective } from './strategy-list-sort.directive';
import { StrategySortEvent } from '../shared/models/strategy';


const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sortStrategy(strategy: Strategy[], column: StrategySortColumn, direction: StrategySortDirection): Strategy[] {
  if (direction === '' || column === '') {
    return strategy;
  } else {
    return [...strategy].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

@Component({
  selector: 'mls-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.css'],
})
export class StrategyListComponent {
  @ViewChildren(StrategyListSortDirective) headers: QueryList<StrategyListSortDirective>;

  @Output() search = new EventEmitter<string>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() strategySelected = new EventEmitter<Strategy>();
  @Output() deleteStrategy = new EventEmitter<number>();
  @Output() editStrategy = new EventEmitter<Strategy>();
  @Output() addStrategy = new EventEmitter<void>();

  @Input() errorMessage: string;
  @Input() strategies: Strategy[];
  @Input() selectedStrategy: Strategy;
  @Input() isBusy: boolean;
  @Input() pageSize: number;
  @Input() strategiesCount: number;
  @Input() currentPage: number;

  constructor( private router: Router ) { }


  onSort({column, direction}: StrategySortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.mLSStrategyListSort !== column) {
        header.direction = '';
      }
    });
    this.strategies = sortStrategy(this.strategies, column, direction);
  }

  onPageSizeChange(pagesize: number)
  {
    this.pageSizeChange.emit(pagesize);
  }

  onDeleteStrategy(selectedStrategy: Strategy): void {
    if (selectedStrategy && selectedStrategy.strategyId !== 0){
      if (confirm(`Do you realy want to detete the Strategy:  ${selectedStrategy.name}?`)) {
        this.deleteStrategy.emit(selectedStrategy.strategyId);
      }
    } else {
      // No need to delete, it was never saved
      this.deleteStrategy.emit(0);
    }
  }

  onEditStrategy(selectedStrategy: Strategy): void {
    this.editStrategy.emit(selectedStrategy);
    this.router.navigate(['/strategies', 'edit']);
  }

  onAdd(): void {
    this.addStrategy.emit();
    this.router.navigate(['/strategies', 'edit']);
  }

  onStrategySelected(strategy: Strategy): void {
    this.strategySelected.emit(strategy);
  }

  set searchTerm(search: string) {
    this.search.emit(search);
  }
}
