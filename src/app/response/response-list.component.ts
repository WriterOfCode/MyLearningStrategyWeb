import { throwError as _throw, Observable } from 'rxjs';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from '../shared/alerts.service';

import { Responses } from '../shared/models/response';
import { ResponseListService} from './response-list.service';
import { ResponseListSortDirective, SortEvent } from './response-list-sort.directive';

@Component({
  selector: 'mls-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.css'],
  providers: [ResponseListService]
})
export class ResponseListComponent implements OnInit {
  @ViewChildren(ResponseListSortDirective) headers: QueryList<ResponseListSortDirective>;

  constructor(public responseListService: ResponseListService,
              private route: ActivatedRoute,
              private alertsService: AlertsService) {
  }

  ngOnInit() {
    this.responseListService.responseList =  this.route.snapshot.data.resolvedData;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.mLSResponseListSort !== column) {
        header.direction = '';
      }
    });
    this.responseListService.sortColumn = column;
    this.responseListService.sortDirection = direction;
  }

  deleteResponse(currentResponse: Responses): void {
    if (currentResponse.responseId !== 0 &&
      confirm(`Do you realy want to detete the response:  ${currentResponse.response}`)) {
          try {
            this.responseListService.deleteResponse(currentResponse);
          } catch (error) {
            this.alertsService.add('warning', 'Could not dete response', error);
          }
    }
  }
}
