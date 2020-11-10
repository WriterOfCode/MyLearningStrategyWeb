import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { StrategySortEvent, StrategySortColumn, StrategySortDirection} from '../shared/models/strategy';

export type SortDirection = 'asc' | 'desc' | '';
// tslint:disable-next-line: object-literal-key-quotes
const rotate: {[key: string]: StrategySortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

@Directive({
  selector: 'th[mLSStrategyListSort]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class StrategyListSortDirective {
  @Input() mLSStrategyListSort: StrategySortColumn = '';
  @Input() direction: StrategySortDirection = '';
  @Output() sort = new EventEmitter<StrategySortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.mLSStrategyListSort, direction: this.direction});
  }
}
