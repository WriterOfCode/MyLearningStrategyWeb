import { throwError as _throw } from 'rxjs';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from '../shared/alerts.service';
import { Subject } from '../shared/models/subjects';
import { SubjectListService } from './subject-list.service';
import { SubjectListSortDirective, SortEvent } from './subject-list-sort.directive';
import { Store } from '@ngrx/store';
import { State } from './state/subject.selectors';
import { SubjectPageActions } from './state/actions/subject-actions-index';

@Component({
  selector: 'mls-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
})
export class SubjectListComponent implements OnInit {
  @ViewChildren(SubjectListSortDirective) headers: QueryList<SubjectListSortDirective>;

  constructor( public subjectListService: SubjectListService,
               private route: ActivatedRoute,
               private alertsService: AlertsService,
               private store: Store<State>
              ) {
  }

  ngOnInit() {
    this.subjectListService.subjectList = this.route.snapshot.data.resolvedData;
    this.store.dispatch(SubjectPageActions.loadSubjects());
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.mLSSubjectList !== column) {
        header.direction = '';
      }
    });
    this.subjectListService.sortColumn = column;
    this.subjectListService.sortDirection = direction;
  }

  deleteSubject(currentSubject: Subject): void {
    if (currentSubject.bodyOfKnowledgeId !== 0 &&
       confirm(`Do you realy want to detete the subject:  ${currentSubject.name}`)) {
          try {
            this.subjectListService.deleteSubject(currentSubject);
          } catch (error) {
            this.alertsService.add('warning', 'Could not dete Subject', error);
          }
    }
  }
}
