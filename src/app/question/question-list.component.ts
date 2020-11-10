import { throwError as _throw, Observable } from 'rxjs';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from '../shared/alerts.service';
import { Questions } from '../shared/models/questions';
import { QuestionListService } from './question-list.service';
import { QuesitonListSortDirective, SortEvent } from './quesiton-list-sort.directive';

@Component({
  selector: 'mls-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit {
  @ViewChildren(QuesitonListSortDirective) headers: QueryList<QuesitonListSortDirective>;

  constructor(public questionListService: QuestionListService,
              private route: ActivatedRoute,
              private alertsService: AlertsService) { }

  ngOnInit() {
      this.questionListService.quesitonList = this.route.snapshot.data.resolvedData;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.mLSQuesitonListSort  !== column) {
        header.direction = '';
      }
    });
    this.questionListService.sortColumn = column;
    this.questionListService.sortDirection = direction;
  }

  deleteQuestion(currentQuestions: Questions): void {
    if (currentQuestions.bodyOfKnowledgeId !== 0 &&
        currentQuestions.questionId !== 0 &&
       confirm(`Do you realy want to detete the question:  ${currentQuestions.question}`)) {
          try {
            this.questionListService.deleteQuestion(currentQuestions);
          } catch (error) {
            this.alertsService.add('warning', 'Could not dete quesiton:', error);
          }
    }
  }
}




